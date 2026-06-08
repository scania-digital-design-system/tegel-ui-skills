#!/usr/bin/env node
// tegel-ui-skills installer — zero deps, Node 18+.
// Usage:
//   npx github:scania-digital-design-system/tegel-ui-skills [--dest .] [--target claude|codex|both] [--force] [--check]
// See README.md for details.

import { mkdir, readdir, readFile, stat, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createInterface } from 'node:readline/promises';
import { argv, exit, stderr, stdin, stdout } from 'node:process';

const SOURCE_ROOT = resolve(fileURLToPath(import.meta.url), '..', '..');
const SKILL_MD_PATH = join(SOURCE_ROOT, 'SKILL.md');
// Files/dirs copied into .claude/skills/{name}/ — agents/ is Codex-only, not needed in Claude.
const SKILL_INSTALL_ENTRIES = ['SKILL.md', 'references', 'assets'];

const AGENTS_BEGIN = '<!-- BEGIN tegel-ui-skills -->';
const AGENTS_END = '<!-- END tegel-ui-skills -->';

const HELP = `tegel-ui-skills — install Tegel design-system skills into a project.

Usage:
  npx github:scania-digital-design-system/tegel-ui-skills [options]

Options:
  --dest <path>            Where to install (default: current directory).
  --target <claude|codex|both>
                           Which tool to set up (default: both).
                             claude → writes .claude/skills/*
                             codex  → writes/updates AGENTS.md
                             both   → does both
  --force                  Overwrite locally-modified files without prompting.
  --check                  Dry-run; print what would change, exit 1 if any diffs.
  -h, --help               Show this help.

Examples:
  npx github:scania-digital-design-system/tegel-ui-skills
  npx github:scania-digital-design-system/tegel-ui-skills --target codex
  npx github:scania-digital-design-system/tegel-ui-skills --check
`;

main().catch((err) => {
  stderr.write(`\nerror: ${err?.message ?? err}\n`);
  exit(2);
});

async function main() {
  const args = parseArgs(argv.slice(2));
  if (args.help) {
    stdout.write(HELP);
    return;
  }

  const dest = resolve(args.dest ?? '.');
  const target = args.target ?? 'both';
  if (!['claude', 'codex', 'both'].includes(target)) {
    throw new Error(`--target must be one of: claude, codex, both (got: ${target})`);
  }
  const force = !!args.force;
  const check = !!args.check;

  if (!existsSync(SKILL_MD_PATH)) {
    throw new Error(`SKILL.md not found at ${SKILL_MD_PATH}. Is the package laid out correctly?`);
  }

  const skill = await loadSkill(SOURCE_ROOT);

  const summary = {
    filesInstalled: 0,
    filesUpdated: 0,
    filesUnchanged: 0,
    filesSkipped: 0,
    skillsTouched: new Set(),
    agentsMd: 'unchanged',
  };

  const ctx = { dest, force, check, summary, overwriteAll: force, skipAll: false };

  if (target === 'claude' || target === 'both') {
    await installSkillToClaude(skill, ctx);
  }
  if (target === 'codex' || target === 'both') {
    await updateAgentsMd(skill, ctx);
  }

  printSummary(summary, { check, dest, target });
  if (check && hasPendingChanges(summary)) exit(1);
}

// ---------- arg parsing ----------

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '-h' || a === '--help') out.help = true;
    else if (a === '--force') out.force = true;
    else if (a === '--check') out.check = true;
    else if (a === '--dest') out.dest = argv[++i];
    else if (a.startsWith('--dest=')) out.dest = a.slice('--dest='.length);
    else if (a === '--target') out.target = argv[++i];
    else if (a.startsWith('--target=')) out.target = a.slice('--target='.length);
    else throw new Error(`Unknown argument: ${a}. Run with --help for usage.`);
  }
  return out;
}

// ---------- skill loading ----------

async function loadSkill(sourceRoot) {
  const source = await readFile(join(sourceRoot, 'SKILL.md'), 'utf8');
  const { name, description } = parseFrontmatter(source);
  return { name: name ?? 'tegel-ui-skills', description: description ?? '', path: sourceRoot };
}

function parseFrontmatter(source) {
  const match = source.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const body = match[1];
  const out = {};
  // Very small YAML-ish parser: top-level `key: value` lines only.
  for (const line of body.split('\n')) {
    const kv = line.match(/^([a-zA-Z_][\w-]*)\s*:\s*(.*)$/);
    if (!kv) continue;
    let value = kv[2].trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    out[kv[1]] = value;
  }
  return out;
}

// ---------- claude install ----------

async function installSkillToClaude(skill, ctx) {
  const destSkillDir = join(ctx.dest, '.claude', 'skills', skill.name);
  for (const entry of SKILL_INSTALL_ENTRIES) {
    const sourcePath = join(skill.path, entry);
    if (!existsSync(sourcePath)) continue;
    const info = await stat(sourcePath);
    if (info.isDirectory()) {
      const files = await walkFiles(sourcePath);
      for (const file of files) {
        const destFile = join(destSkillDir, relative(skill.path, file));
        await copyOne(file, destFile, skill.name, ctx);
      }
    } else {
      await copyOne(sourcePath, join(destSkillDir, entry), skill.name, ctx);
    }
  }
}

async function walkFiles(root) {
  const out = [];
  async function visit(dir) {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) await visit(full);
      else if (entry.isFile()) out.push(full);
    }
  }
  await visit(root);
  return out;
}

async function copyOne(sourceFile, destFile, skillName, ctx) {
  const sourceContent = await readFile(sourceFile);
  if (existsSync(destFile)) {
    const existing = await readFile(destFile);
    if (existing.equals(sourceContent)) {
      ctx.summary.filesUnchanged++;
      return;
    }
    // Differs.
    if (ctx.check) {
      ctx.summary.filesUpdated++;
      ctx.summary.skillsTouched.add(skillName);
      stdout.write(`  would update: ${relative(ctx.dest, destFile)}\n`);
      return;
    }
    const decision = await resolveConflict(destFile, ctx);
    if (decision === 'skip') {
      ctx.summary.filesSkipped++;
      stdout.write(`  skipped: ${relative(ctx.dest, destFile)}\n`);
      return;
    }
    await mkdir(dirname(destFile), { recursive: true });
    await writeFile(destFile, sourceContent);
    ctx.summary.filesUpdated++;
    ctx.summary.skillsTouched.add(skillName);
    stdout.write(`  updated: ${relative(ctx.dest, destFile)}\n`);
    return;
  }
  // New file.
  if (ctx.check) {
    ctx.summary.filesInstalled++;
    ctx.summary.skillsTouched.add(skillName);
    stdout.write(`  would install: ${relative(ctx.dest, destFile)}\n`);
    return;
  }
  await mkdir(dirname(destFile), { recursive: true });
  await writeFile(destFile, sourceContent);
  ctx.summary.filesInstalled++;
  ctx.summary.skillsTouched.add(skillName);
  stdout.write(`  installed: ${relative(ctx.dest, destFile)}\n`);
}

async function resolveConflict(destFile, ctx) {
  if (ctx.overwriteAll) return 'overwrite';
  if (ctx.skipAll) return 'skip';
  if (!stdin.isTTY) return 'skip'; // CI / piped: never destroy without --force.
  const rl = createInterface({ input: stdin, output: stdout });
  try {
    const answer = (await rl.question(
      `  conflict: ${relative(ctx.dest, destFile)} differs from source.\n    overwrite? [y]es / [n]o / [a]ll / [s]kip-all: `,
    )).trim().toLowerCase();
    if (answer === 'a' || answer === 'all') {
      ctx.overwriteAll = true;
      return 'overwrite';
    }
    if (answer === 's' || answer === 'skip-all') {
      ctx.skipAll = true;
      return 'skip';
    }
    if (answer === 'y' || answer === 'yes') return 'overwrite';
    return 'skip';
  } finally {
    rl.close();
  }
}

// ---------- codex / AGENTS.md ----------

async function updateAgentsMd(skill, ctx) {
  const agentsPath = join(ctx.dest, 'AGENTS.md');
  const block = renderAgentsBlock(skill);
  let nextContent;
  let pastTense;
  let wouldForm;
  if (!existsSync(agentsPath)) {
    nextContent = block + '\n';
    pastTense = 'created';
    wouldForm = 'would create';
  } else {
    const existing = await readFile(agentsPath, 'utf8');
    const beginMatch = existing.match(/(^|\n)<!-- BEGIN tegel-ui-skills -->(\n|$)/);
    const endMatch = existing.match(/(^|\n)<!-- END tegel-ui-skills -->(\n|$)/);
    if (beginMatch && endMatch && endMatch.index > beginMatch.index) {
      const beginIdx = beginMatch.index + (beginMatch[1] === '\n' ? 1 : 0);
      const endIdx = endMatch.index + (endMatch[1] === '\n' ? 1 : 0) + AGENTS_END.length;
      const before = existing.slice(0, beginIdx);
      const after = existing.slice(endIdx);
      nextContent = before + block + after;
      pastTense = 'updated managed block';
      wouldForm = 'would update managed block';
    } else {
      nextContent = existing.replace(/\s*$/, '') + '\n\n' + block + '\n';
      pastTense = 'appended managed block';
      wouldForm = 'would append managed block';
    }
    if (nextContent === existing) {
      ctx.summary.agentsMd = 'unchanged';
      return;
    }
  }
  if (ctx.check) {
    ctx.summary.agentsMd = wouldForm;
  } else {
    await writeFile(agentsPath, nextContent);
    ctx.summary.agentsMd = pastTense;
  }
  stdout.write(`  AGENTS.md: ${ctx.summary.agentsMd} at ${relative(ctx.dest, agentsPath)}\n`);
}

function renderAgentsBlock(skill) {
  const file = `.claude/skills/${skill.name}/SKILL.md`;
  const desc = (skill.description || '').replace(/\|/g, '\\|').replace(/\s+/g, ' ').trim();
  const lines = [AGENTS_BEGIN, ''];
  lines.push('## Tegel UI skill (managed — re-run the installer to refresh)');
  lines.push('');
  lines.push(
    'This project uses the Scania/TRATON Tegel design system. The skill file below is the source of truth for Tegel UI work in code and Figma. **Before generating any Tegel UI, read the skill file** and follow its reference map to load only what the current task needs.',
  );
  lines.push('');
  lines.push('| Skill | When to use it | File |');
  lines.push('|---|---|---|');
  lines.push(`| \`${skill.name}\` | ${desc || '(no description)'} | [\`${file}\`](${file}) |`);
  lines.push('');
  lines.push('When the user asks to build, style, theme, or fix Tegel UI (code or Figma), read the skill before writing. If the agent generates Tegel UI that drifts from the design system and the user corrects it by hand, read `references/improvement-loop.md` to update the skill.');
  lines.push('');
  lines.push(AGENTS_END);
  return lines.join('\n');
}

// ---------- output ----------

function printSummary(s, { check, dest, target }) {
  const verb = check ? 'Would change' : 'Done';
  stdout.write(`\n${verb} (dest: ${dest}, target: ${target}):\n`);
  stdout.write(`  files installed: ${s.filesInstalled}\n`);
  stdout.write(`  files updated:   ${s.filesUpdated}\n`);
  stdout.write(`  files unchanged: ${s.filesUnchanged}\n`);
  stdout.write(`  files skipped:   ${s.filesSkipped}\n`);
  stdout.write(`  skill touched:   ${s.skillsTouched.size > 0 ? 'yes' : 'no'}\n`);
  stdout.write(`  AGENTS.md:       ${s.agentsMd}\n`);
  if (!check && (s.filesInstalled || s.filesUpdated || s.agentsMd !== 'unchanged')) {
    stdout.write(`\nNext: open this project in Claude Code (skill auto-loads from .claude/skills/) or in Codex (it reads AGENTS.md). Try: "build me a Tegel header with search and user menu".\n`);
  }
}

function hasPendingChanges(s) {
  return s.filesInstalled > 0 || s.filesUpdated > 0 || s.agentsMd !== 'unchanged';
}
