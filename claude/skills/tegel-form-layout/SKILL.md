---
name: tegel-form-layout
description: Workarounds for laying out Tegel Lite form components (TextField, Dropdown, Message) when their default CSS fights you. Use when aligning inputs in a row (toolbar/filter cluster), mixing TextField + Dropdown, repositioning prefix/suffix icons, or vertically centering message contents. The Tegel Lite beta is built around `labelPosition="inside"` — outside labels at sm/md sizes ship with quirks documented here.
---

# Tegel Form Layout — Gotchas & Fixes

This skill captures hard-won fixes for laying out Tegel Lite form controls in this project. Each section explains the root cause first, then the override — copy with confidence, but understand *why* before tweaking.

## 1. TextField + Dropdown side-by-side in a flex row

### Symptoms
- TextField pushes Dropdown to a new line ("inputs stack instead of aligning side-by-side").
- Even with `align-items: flex-end`, the underlines don't line up — Dropdown's underline sits lower than TextField's.

### Root cause
Two Tegel CSS quirks fight you:

- `.tl-text-field` wrapper has `width: 100%; min-width: 208px` — so as a flex item it tries to fill the row and shoves siblings to wrap.
- `.tl-text-field--{sm,md,lg}` sets `height: {40,48,56}px` on the **wrapper** itself. With `display: block` and an outside label having `margin-bottom: 8px`, the label visually overflows *above* the wrapper. The wrapper bottom = bottom of the input only.
- `.tl-dropdown` wrapper has no height set — it grows to `label + 8px + select`. So its visual bottom is the underline.

When you set `align-items: flex-end`, the **wrapper** bottoms align — but TextField's wrapper bottom is the underline, while Dropdown's wrapper bottom is also the underline. They *should* match. They don't, because TextField's wrapper has `padding-bottom: 1px` and the label position drifts (~22px label height that's outside the wrapper visually).

### Fix
Force TextField's wrapper to grow to its natural `label + input` height (matching Dropdown), and let both flex items size to content:

```css
.site-toolbar__actions {
  display: flex;
  align-items: flex-end;
  gap: var(--tds-spacing-element-12);
  flex-wrap: wrap;
}

.site-toolbar__actions > .tl-text-field,
.site-toolbar__actions > .tl-dropdown {
  width: auto;
}

.site-toolbar__actions > .tl-text-field {
  height: auto;
  padding-bottom: 0;
}
```

Why `align-items: flex-end` and not `center`: in mixed rows where one item has a label-on-top and another doesn't (e.g. a Button next to a TextField), `flex-end` aligns the input row of each to the same baseline. Buttons (no label) bottom-align with the input boxes, which reads correctly.

## 2. Prefix/suffix icons drift after fixing #1

### Symptoms
After freeing the TextField wrapper height (#1), the search-icon prefix appears in the gap between the label and the input, or below the placeholder.

### Root cause
Prefix/suffix icons are `position: absolute` with `top: 50%` (relative to the wrapper). Tegel calibrates an offset for outside labels:

```css
.tl-text-field:has(.tl-text-field__label):not(.tl-text-field--label-inside) .tl-text-field__prefix--icon {
  transform: translateY(calc(-50% + 24px));
}
```

That `+ 24px` only matches the **lg** size. For sm/md it's wrong, and once your wrapper is `height: auto` the assumption that the wrapper is exactly the input's height breaks.

### Specificity gotcha
The Tegel selector above has specificity **(0,4,0)** — class + `:has(class)` + `:not(class)` + class. Naive overrides like `.toolbar > .tl-text-field .tl-text-field__prefix--icon` are (0,3,0) and lose the cascade. Match Tegel's `:has`/`:not` pattern and add a size class to bump to (0,5,0).

### Fix
Re-anchor the icon to the bottom of the wrapper — the input always sits at the bottom, so `bottom: {half-input-height}px; transform: translateY(50%)` puts the icon's center exactly on the input's vertical center, regardless of label height.

```css
/* Beats Tegel's (0,4,0) with (0,5,0). */
.site-toolbar__actions > .tl-text-field:has(.tl-text-field__label):not(.tl-text-field--label-inside) .tl-text-field__prefix--icon,
.site-toolbar__actions > .tl-text-field:has(.tl-text-field__label):not(.tl-text-field--label-inside) .tl-text-field__suffix--icon {
  top: auto;
  transform: translateY(50%);
}

.site-toolbar__actions > .tl-text-field--sm:has(.tl-text-field__label):not(.tl-text-field--label-inside) .tl-text-field__prefix--icon,
.site-toolbar__actions > .tl-text-field--sm:has(.tl-text-field__label):not(.tl-text-field--label-inside) .tl-text-field__suffix--icon {
  bottom: 20px; /* half of sm input height (40px) */
}

.site-toolbar__actions > .tl-text-field--md:has(.tl-text-field__label):not(.tl-text-field--label-inside) .tl-text-field__prefix--icon,
.site-toolbar__actions > .tl-text-field--md:has(.tl-text-field__label):not(.tl-text-field--label-inside) .tl-text-field__suffix--icon {
  bottom: 24px; /* half of 48px */
}

.site-toolbar__actions > .tl-text-field--lg:has(.tl-text-field__label):not(.tl-text-field--label-inside) .tl-text-field__prefix--icon,
.site-toolbar__actions > .tl-text-field--lg:has(.tl-text-field__label):not(.tl-text-field--label-inside) .tl-text-field__suffix--icon {
  bottom: 28px; /* half of 56px */
}
```

### Math sanity check (sm)
- `bottom: 20px` → icon's bottom edge at `wrapper_height − 20px` from top. For a 20px icon, its top edge is at `wrapper_height − 40`, center at `wrapper_height − 30` (= 30px from bottom).
- `transform: translateY(50%)` → shifts icon DOWN by 10px (50% of own height).
- Final center = 20px from wrapper bottom = vertical center of the 40px input box anchored at the wrapper bottom. ✓

## 3. `.tl-message__wrapper` icon and content not vertically centered

### Symptom
The status icon (info/success/warning/error) sits at the top of the message while the header + extended-message stretch below it.

### Root cause
`.tl-message__wrapper` is `display: flex` with no `align-items` set. Default `stretch` doesn't help because the icon is a fixed-size `::before` (20×20). Net result: icon at top, content fills downward.

### Fix
```css
.tl-message__wrapper {
  align-items: center;
}
```

Single-line messages now center cleanly; multi-line messages have the icon visually balanced against the text block. Apply globally — there's no Tegel use-case where top-anchored icon-vs-content is preferable.

## 4. General principles when fighting Tegel form CSS

- **Tegel Lite beta is built for `labelPosition="inside"`.** Outside labels at sm/md sizes regularly have wrapper-height bugs. If a layout fight gets messy, ask whether `labelPosition="inside"` gives the same UX without the hacks.
- **Wrapper height ≠ visual height.** TextField's wrapper is the input box only; the outside label visually overflows above. Account for this when computing offsets — anchor relative to the *input* (the bottom of the wrapper), not the visual top.
- **Dropdown grows; TextField is locked.** When mixing them, the Dropdown is the "honest" baseline — make TextField match it (`height: auto`).
- **`.tl-text-field` widths:** `width: 100%; min-width: 208px`. Always override to `width: auto` in flex contexts unless you genuinely want the field to consume the row.
- **Specificity floor for prefix/suffix icon overrides:** the Tegel rule is (0,4,0). Match its `:has(.tl-text-field__label):not(.tl-text-field--label-inside)` pattern and add one more class (e.g. a size class or a parent context class) to win.
- **Cross-axis alignment in toolbars:** prefer `align-items: flex-end` over `center` when the row mixes labeled inputs and label-less buttons — this lines up input-bottoms and button-bottoms on the same baseline.

## File reference

The fixes above live in [app/styles/site.css](../../../app/styles/site.css) under `.site-toolbar__actions` and `.tl-message__wrapper`. Use that file as the canonical home for any new Tegel layout overrides — keep them grouped so the specificity pattern stays consistent.
