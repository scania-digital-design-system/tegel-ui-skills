# tegel-ui-skills

Tegel design-system skills for AI coding agents (Claude Code and Codex). Drop these into any project that uses `@scania/tegel-lite` and your agent will know how to pick the right component, apply the right tokens, and avoid the well-known gotchas.

Maintained by the Scania Digital Design System team — but anyone in the org can contribute, regardless of role or tool.

## Install

In the project where you want the agent to know Tegel:

```sh
npx github:scania-digital-design-system/tegel-ui-skills
```

That's it. The installer:

- Writes the skills to `.claude/skills/` (Claude Code picks them up automatically).
- Writes or updates `AGENTS.md` (Codex and other agents that follow the AGENTS.md convention read this).
- Is **idempotent** — safe to re-run any time to pull the latest skills.

### Options

```sh
# Only set up Codex (don't touch .claude/)
npx github:scania-digital-design-system/tegel-ui-skills --target codex

# Only set up Claude Code (don't touch AGENTS.md)
npx github:scania-digital-design-system/tegel-ui-skills --target claude

# See what would change, don't write anything
npx github:scania-digital-design-system/tegel-ui-skills --check

# Install into a different directory
npx github:scania-digital-design-system/tegel-ui-skills --dest path/to/project

# Overwrite locally-modified skill files without prompting
npx github:scania-digital-design-system/tegel-ui-skills --force
```

Run `npx github:scania-digital-design-system/tegel-ui-skills --help` for the full list.

### Requirements

- Node 18 or newer (`node --version` to check). The installer has zero dependencies and uses only Node's standard library.
- For the feedback-loop skill (`/tegel-skill-fix`): the GitHub CLI (`gh`) installed and authenticated. Without it, the skill writes a patch file instead of opening a PR.

## Use

Once installed, in Claude Code or any AGENTS.md-aware agent:

- Ask naturally: *"Build me a Tegel header with a search field and a user menu."*
- Or invoke a specific skill: `/tegel Button`, `/tegel Card`, `/tegel-colors`, `/tegel-spacing`.

The agent will read the relevant skill(s) before writing code, follow the 6-step chain in `tegel/SKILL.md` (component → layout → spacing → typography → colors → motion), and use the correct tokens and class names.

## When the agent gets it wrong

When the agent generates Tegel UI that drifts from the design system:

1. Fix the code by hand in your project.
2. Invoke `/tegel-skill-fix` (or just tell the agent: *"the Tegel UI you generated was wrong, I fixed it — update the skill"*).
3. The agent will diff your fix, locate the responsible skill, propose an edit to it, and open a PR against this repo.
4. Review and merge the PR. The next time anyone runs the installer, the lesson is live.

You don't need git fluency or design-system insider knowledge to do this — the meta-skill walks you through it. See [CONTRIBUTING.md](CONTRIBUTING.md) for the full contribution guide.

## What's in here

| Skill | What it covers |
|---|---|
| `tegel` | Pick a component; per-component reference in `skills/tegel/components/<Name>.md` (32 components) |
| `tegel-lite-setup` | Installing `@scania/tegel-lite`, CSS loading, brand/mode classes, gotchas |
| `tegel-colors` | Brand-themed color tokens, light/dark, brand switching |
| `tegel-spacing` | Layout (macro) and element (micro) spacing scales, radius tokens |
| `tegel-motion` | Durations, easings, transition / animation tokens |
| `tegel-form-layout` | Form row layouts, prefix/suffix icons |
| `tegel-skill-fix` | The feedback loop — turns a manual correction into an upstream PR |

## Known gaps

The `tegel/SKILL.md` chain references two skills that don't exist yet — they're tracked as follow-up:

- `tegel-layout` — page-level grid and column placement
- `tegel-typography` — type hierarchy and styles

Until they exist, the chain skips them. Contributions welcome (see [CONTRIBUTING.md](CONTRIBUTING.md)).

## Contributing

Anyone — dev, designer, project manager — can contribute, using whichever AI tool they prefer. See [CONTRIBUTING.md](CONTRIBUTING.md) for the two contribution paths (easy: `/tegel-skill-fix`; direct: clone + edit + PR).
