# tegel-ui-skills

> **Branch: `feat/figma-traton-skill`** - This branch extends the [official tegel-ui-skills](https://github.com/scania-digital-design-system/tegel-ui-skills) with Figma and TRATON Component Library support. See [Known gaps](#known-gaps) for what still needs work.

Tegel design-system skills for AI coding agents (Claude Code and Codex). Drop these into any project that uses `@scania/tegel-lite` and your agent will know how to pick the right component, apply the right tokens, and avoid the well-known gotchas.

## What this branch adds

- **Figma workflow** - use the TRATON Component Library as the component source; never draw lookalike frames when an official component exists
- **Brand switching in Figma** - guidance on using the Figma Plugin API (`setExplicitVariableModeForCollection`) to switch between Scania and Traton themes correctly
- **Flat reference structure** - all guidance lives in `references/` and is loaded on demand; no sub-skill chain calls
- **Typography** - `references/typography.md` with the full Inferno type scale, functional vs expressive guidance, and font combinations (see [Known gaps](#known-gaps))

## Install

In the project where you want the agent to know Tegel:

```sh
npx github:scania-digital-design-system/tegel-ui-skills
```

That's it. The installer:

- Writes the skill to `.claude/skills/tegel-ui-skills/` (Claude Code picks it up automatically).
- Writes or updates `AGENTS.md` (Codex and other agents that follow the AGENTS.md convention read this).
- Is **idempotent** - safe to re-run any time to pull the latest skill.

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

## Use

Once installed, in Claude Code or any AGENTS.md-aware agent:

- Ask naturally: _"Build me a Tegel header with a search field and a user menu."_
- Or invoke the skill directly: `/tegel-ui-skills Button`, `/tegel-ui-skills Header`.

The agent will read `SKILL.md`, follow the reference map to load only what the task needs, and use the correct tokens, BEM classes, and Figma component instances.

## When the agent gets it wrong

When the agent generates Tegel UI that drifts from the design system:

1. Fix the code or Figma design by hand.
2. Tell the agent: _"the Tegel UI you generated was wrong, I fixed it - update the skill"_.
3. The agent will read `references/improvement-loop.md`, diff your fix, and edit the relevant reference file.

## What's in here

| File                                | What it covers                                                            |
| ----------------------------------- | ------------------------------------------------------------------------- |
| `SKILL.md`                          | Entry point - component workflow, Figma workflow, reference map           |
| `references/components-overview.md` | Component catalogue and token namespace                                   |
| `references/components/<Name>.md`   | Per-component BEM classes, modifiers, states, tokens (32 components)      |
| `references/setup.md`               | Installing `@scania/tegel-lite`, CSS loading, brand/mode classes, gotchas |
| `references/colors.md`              | Brand-themed color tokens, light/dark, brand switching                    |
| `references/spacing.md`             | Layout (macro) and element (micro) spacing scales, radius tokens          |
| `references/typography.md`          | Type scale, functional vs expressive guidance, font combinations          |
| `references/motion.md`              | Durations, easings, transition / animation tokens                         |
| `references/form-layout.md`         | Form row layouts, prefix/suffix icons                                     |
| `references/improvement-loop.md`    | How to teach the skill from a corrected example                           |

## Known gaps

- `tegel-layout` - page-level grid and column placement is not yet documented
- `references/typography.md` - the type scale is documented but the agent does not yet consistently apply the correct Figma **variable style names** (e.g. `Text/Body/Regular`). The reference needs an explicit column mapping each style to its Figma variable style path. Source: the _Expanding on the Tegel UI Skill_ page in the Inferno Figma file.

## Contributing

Contributions to this branch are welcome - especially fixes to the known gaps above. Edit the relevant file in `references/` and open a PR against `feat/figma-traton-skill`.
