# Tegel Skill Improvement Loop

Use this reference when a generated Tegel UI was wrong, the user corrected it, and the correction should improve this personal skill.

## Goal

Turn a real correction into a small, reusable skill update. Prefer editing the most specific reference file that would have prevented the mistake.

## Capture The Evidence

Ask for or inspect:

- The file or files the user corrected.
- The diff between the generated version and the corrected version.
- A short explanation of what was wrong visually, semantically, or technically.
- Any relevant Figma, brand, or Tegel Lite source-of-truth context.

If the project is a git repository, inspect the diff for the corrected files. Treat the before side as the generated output and the after side as the desired result.

## Locate The Right Reference

Use this triage:

| Symptom | Update |
|---|---|
| Wrong component class names, missing BEM sub-elements, or broken nesting | `references/components/{Component}.md` |
| Wrong component choice or general component workflow | `references/components-overview.md` or `SKILL.md` |
| Broken CSS loading, missing fonts/assets, bad brand/mode cascade, or incomplete `components.css` | `references/setup.md` |
| Wrong spacing, padding, margin, gap, radius, or unit token | `references/spacing.md` |
| Wrong colors, dark mode, brand mode, status color, text/border/icon token | `references/colors.md` and sometimes `references/setup.md` |
| Wrong type scale, font pairing, text hierarchy, Super type use, or typography color rule | `references/typography.md` |
| Wrong transition, duration, easing, or keyframe | `references/motion.md` |
| TextField, Dropdown, outside-label, icon, or form row alignment issue | `references/form-layout.md` |

## Verify Before Editing

When possible, check the consuming project's `node_modules/@scania/tegel-lite/dist/` CSS before changing the skill. If the user's correction uses a class or token that does not exist, flag the mismatch instead of teaching the skill the wrong rule.

## Edit Pattern

Prefer one of these small edits:

- Add a row to an existing gotcha or diagnostic table.
- Correct a code example.
- Add a short rule with a one-line reason.
- Add a missing token or class mapping.
- Add a "do not" note only when there is a concrete repeated failure mode.

Avoid broad rewrites, generic taste commentary, or project-only naming unless labeled as an example.

## Validate

After changing `SKILL.md`, run the skill validator. For reference-only edits, review the changed file for stale paths, accidental upstream-only instructions, and contradictions with the main reference map.
