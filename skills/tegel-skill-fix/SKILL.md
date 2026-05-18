---
name: tegel-skill-fix
description: Use when the user says the Tegel UI an agent generated is wrong, off-brand, or drifted from the design system — especially after the user manually corrected the code. Captures the lesson as an edit to the responsible Tegel skill and opens a PR upstream against scania-digital-design-system/tegel-ui-skills. Invoke explicitly as `/tegel-skill-fix`, or when the user says "the tegel button styling was wrong, I fixed it — update the skill", "this doesn't match Figma, the skill made it up", "teach the tegel skill not to do that again", or similar.
---

# tegel-skill-fix — Teach the Tegel skills from a real correction

Use when the user has just fixed Tegel UI that an agent generated incorrectly, and wants the lesson to propagate back to the upstream skill so future runs don't repeat the mistake. This skill turns a one-off correction into a proposed edit on the canonical skill in `scania-digital-design-system/tegel-ui-skills`.

This is the **feedback loop** for the whole Tegel skill set. Without it, every consumer relearns the same lesson individually. With it, one careful correction improves the skill for everyone.

## What this skill does

1. **Capture** what the agent generated, what the user changed it to, and why the original was wrong.
2. **Locate** the Tegel skill responsible (component pick, layout, spacing, typography, colors, motion, lite-setup, or form-layout) using the chain in `tegel/SKILL.md`.
3. **Propose** a concrete edit to that skill's `SKILL.md` — a new gotcha, a corrected example, a clarified rule, an updated token mapping — that would have prevented the bad output.
4. **Open a PR** upstream with the proposed edit, including the bad output, the user's fix, and the rationale.

The user stays in control: nothing is pushed without explicit approval.

## Steps

### 1 / Gather the evidence

Ask the user, in this order:

- Which file(s) did you correct by hand?
- What specifically was wrong with what the agent originally produced? (one short paragraph)
- Which Tegel skill (if any) do you suspect — or should I figure it out?

Then:

```sh
git diff HEAD -- <files-the-user-named>
```

Read the diff. The "before" side is what the agent produced; the "after" side is what's correct.

### 2 / Identify the responsible skill

Map the diff to a skill. Use this triage:

| Symptom in the diff | Likely responsible skill |
|---|---|
| Wrong component class names, missing BEM sub-elements, broken nesting | `tegel` (or the relevant `tegel/components/<Name>.md`) |
| Wrong grid columns, page-level placement, macro spacing between sections | `tegel-layout` *(if present)* |
| Wrong padding/margin/gap inside or between components | `tegel-spacing` |
| Wrong font sizes, font families, letter-spacing, heading levels | `tegel-typography` *(if present)* |
| Wrong colors, missing brand/mode switching, fallback-to-black symptoms | `tegel-colors` (or `tegel-lite-setup` for the namespace divergence) |
| Wrong transitions, durations, easings | `tegel-motion` |
| Bad install / loading / cascade / missing CSS file symptoms | `tegel-lite-setup` |
| Form row layout, prefix/suffix icon positioning | `tegel-form-layout` |

Read the suspected skill at `.claude/skills/<name>/SKILL.md`. Confirm the rule that should have prevented the bug is missing or wrong.

If the user's "fix" uses a token / class name that **does not exist** in `@scania/tegel-lite`, stop and flag it — the user's correction is probably the bug, not the skill. Verify against `node_modules/@scania/tegel-lite/dist/` before continuing.

### 3 / Draft the proposed edit

Propose the smallest edit that prevents the bug. Show it inline as a unified diff (just the affected lines, with a few lines of context). Good edits look like:

- A new row in an existing "common mistakes" or "diagnostic" table.
- A corrected example block.
- A clarified rule with a one-line rationale.
- An added entry in a token mapping table.

Bad edits to avoid:

- Wholesale rewrites of the skill.
- Adding the user's specific project naming as if it were universal.
- Editing files outside `skills/` in the upstream tree.

### 4 / Confirm with the user

Show the user:

- The bad output (before).
- Their fix (after).
- The proposed SKILL.md diff.
- The PR title and body that would be opened.

Ask: "Open the PR now?" Do not proceed without explicit "yes".

### 5 / Open the PR

Pre-flight:

```sh
gh auth status
```

If `gh` is not installed or not authenticated, fall back to the patch-file path (step 7).

Then (in a tmp working directory, not the consumer's project):

```sh
WORK=$(mktemp -d)
git clone --depth=1 https://github.com/scania-digital-design-system/tegel-ui-skills "$WORK/tegel-ui-skills"
cd "$WORK/tegel-ui-skills"
git checkout -b skill-fix/<short-slug>
# apply the edit to skills/<name>/SKILL.md
git add skills/<name>/SKILL.md
git commit -m "tegel-skill-fix: <one-line summary>"
git push -u origin skill-fix/<short-slug>
gh pr create --title "tegel-skill-fix: <one-line summary>" --body "$(cat <<'EOF'
## What went wrong

<one paragraph: what the agent generated, why it was wrong>

## The fix the user applied

\`\`\`diff
<user's git diff, trimmed to the relevant hunks>
\`\`\`

## Why this skill edit prevents it next time

<one paragraph: rule/example/gotcha being added and why>

🤖 Proposed via /tegel-skill-fix
EOF
)"
```

Print the PR URL to the user. Do not push anything else.

### 6 / On success

Tell the user:

- Where the PR was opened.
- That the upstream skill will only be live for them after the PR is merged and they re-run `npx github:scania-digital-design-system/tegel-ui-skills` to pull the update.
- That they can edit the PR description on GitHub to add screenshots / Figma links if useful.

### 7 / Fallback: no `gh` available

Write two files into the consumer's working directory:

- `tegel-skill-fix.patch` — the proposed `SKILL.md` edit as a unified diff against the upstream skill.
- `tegel-skill-fix.md` — a markdown summary with the bad output, the user's fix, and the rationale, plus a copy-pastable PR body.

Then print: "Open https://github.com/scania-digital-design-system/tegel-ui-skills/compare , attach the patch, and paste the summary."

## Guardrails

- Never edit anything outside `skills/<name>/SKILL.md` in the upstream tree.
- Never push or open a PR without explicit user approval.
- Never assume the user's correction is right — if it uses tokens or classes that don't exist in `@scania/tegel-lite`, surface that first.
- Never overwrite the consumer's local `.claude/skills/<name>/SKILL.md`. The local file is downstream of upstream; it updates next time the consumer re-runs the installer.

## When NOT to use this skill

- The user is asking for a one-off fix in their own code, not asking to update the skill.
- The fix is purely about the consumer project's CSS or wrappers, not about Tegel itself.
- The bad UI was generated without consulting any Tegel skill (in which case the fix is to invoke the right skill next time, not to edit it).
