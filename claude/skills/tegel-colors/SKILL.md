---
name: tegel-colors
description: Use Tegel brand-themed color tokens when working in a project that has adopted Tegel colors. Apply when the user asks to style components, theme the app, switch between Scania/Traton brands or light/dark mode, or pick a color. Two brands (scania, traton) and two modes (light, dark) toggled via root classes. Always prefer semantic tokens (`--color-*`) over brand primitives (`--scania-color-*`, `--traton-color-*`).
---

# Tegel Colors

This skill ships brand-themed color tokens from the Scania Tegel design system, packaged for use in any project. Two brands (Scania, Traton) × two modes (light, dark) = four themes, all reachable by adding classes to a root element.

The companion CSS file is **[`tegel-colors.css`](./tegel-colors.css)** — a sibling of this SKILL.md. When initializing the skill in a new project, copy that file directly (don't try to extract it from this markdown).

## When to invoke

Apply this skill whenever the user, in a project that has adopted Tegel colors:

- styles a new component or redesigns an existing one
- asks for a color, background, border, text color, or status color
- sets up theming, dark mode, or a brand switch
- mentions Tegel, Scania, Traton, or design tokens
- pastes a hex value and asks what to use instead

Do **not** invoke this skill for projects that don't use Tegel — check for the presence of `tegel-colors.css`, `@scania/tegel`, or `tegel-styles` first. If none exist, ask the user before initializing.

## Setup (one-time, per project)

If the project does not yet have Tegel colors installed, do the following:

1. Check whether the project already imports `@scania/tegel` or `tegel-styles`. If yes, skip to "Selecting brand and mode" — the tokens are already available.
2. If not, copy the sibling file [`tegel-colors.css`](./tegel-colors.css) to `src/styles/tegel-colors.css` (or the equivalent location for the project's stack — `app/styles/`, `assets/css/`, `public/`, etc.). Read it with the Read tool and Write it to the destination — do not paraphrase or hand-edit the contents.
3. Add a single import at the root entry point. Pick the form that matches the stack:

   ```ts
   // Vite, Next, CRA, Remix, etc.
   import "./styles/tegel-colors.css";
   ```

   ```html
   <!-- Plain HTML or Astro -->
   <link rel="stylesheet" href="/tegel-colors.css">
   ```

4. Confirm the import location with the user before adding — it must load **once**, before any component styles.

## Selecting brand and mode

Add classes to `<html>` (or any subtree). Default with no class is **Scania, light**.

| Combination | Class on `<html>` |
| :--- | :--- |
| Scania, light | _(none)_ or `scania` |
| Scania, dark | `scania tds-mode-dark` (or just `tds-mode-dark`) |
| Traton, light | `traton` |
| Traton, dark | `traton tds-mode-dark` |

For nested themes (a dark callout inside a light page), apply `tds-mode-dark` to a wrapper element. Do not add inline styles for theming — it defeats the cascade.

## Token-use rules

These rules are firm. Follow them when generating or reviewing CSS:

1. **In components, use semantic tokens (`--color-*`), never primitives.** Components must read identically under all four brand × mode combinations. A component that hard-codes `var(--scania-color-blue-400)` breaks under Traton.

2. **Reach for primitives (`--scania-color-*`, `--traton-color-*`) only for brand-specific accents** that semantic tokens cannot express (e.g. a "Scania-only" marketing module). Wrap such usage in a brand scope: `.scania .marketing-banner { background: var(--scania-color-blue-800); }`.

3. **Never write a hex value in a component.** If the user asks for `#041e42`, recognize it as `--scania-color-blue-800` and propose the *semantic* token instead (`--color-text-brand` or similar, depending on intent).

4. **Borders, dimmed text, and dimmed icons use the transparent scale, not solid greys.** The semantic tokens already do this — `--color-border-defined` resolves to a transparent value so it tints correctly over any layered background. Do not "improve" by swapping in a solid grey.

5. **Inverse pairs (`--color-*-inverse-*`) are for inverted regions.** Use them when placing dark UI inside a light scope (or vice versa) without remounting the subtree under a flipped mode class.

## Picking the right semantic token

When you need a color, work top-down through these decisions:

| Need | Token group |
| :--- | :--- |
| A surface to put content on | `--color-background-base` (root surface), `-layer-01`/`-02`/`-03` (elevated cards/panels), `-top` (highest elevation: popovers, menus), `-overlay` (modal scrim), `-none` (transparent surface) |
| A line dividing or outlining content | `--color-border-strong` (high-emphasis), `-defined` (default border), `-soft`, `-subtle`, `-disabled`, `-discrete` (faintest), `-none` (transparent) |
| Text | `--color-text-base` (default body), `-brand` (brand-tinted), `-strong` (high-emphasis), `-defined`, `-soft` (secondary), `-subtle`, `-disabled`, `-discrete` (faintest) |
| An icon | Mirror the text scale: `--color-icon-base`, `-brand`, `-strong`, `-defined`, `-soft`, `-subtle`, `-disabled`, `-discrete` |
| Status feedback | `--color-system-{info,success,warning,danger}-{strong,defined,default,subtle,discrete}` — use `default` for the canonical solid colour, `discrete` for tinted backgrounds (alert panels), `strong` for foreground text on a tinted background |

For inverted regions, append `-inverse` before the variant: `--color-text-inverse-base`, `--color-background-inverse-layer-01`, etc.

## Example: status alert

```css
.alert--danger {
  background: var(--color-system-danger-discrete);
  color: var(--color-system-danger-strong);
  border-left: 4px solid var(--color-system-danger-default);
}

.alert--danger__icon {
  color: var(--color-system-danger-default);
}
```

This works correctly under all four themes without any conditional logic.

## Example: card with inverted footer

```css
.card {
  background: var(--color-background-layer-01);
  color: var(--color-text-base);
  border: 1px solid var(--color-border-discrete);
}

.card__footer {
  background: var(--color-background-inverse-layer-01);
  color: var(--color-text-inverse-base);
}
```

## App-shell layouts: paint the canvas, not just `<body>`

Setting `background: var(--color-background-base)` on `<body>` alone is necessary but often not sufficient. In layouts with a flex/grid shell wrapping content (header + sidebar + `<main>`), the surface the user perceives as "the page background" is the inner canvas wrapper, not body. If that wrapper has no background, dark mode looks broken — typically reported as "the background stays white when I toggle dark mode" — even though body's token is switching correctly.

Apply the same token to the inner canvas:

```css
body,
.site-shell__main {        /* or whatever the inner main wrapper is */
  background: var(--color-background-base);
}
```

The token resolves correctly under all four themes — the inner element inherits body's `tds-mode-*` class via the cascade, so no per-mode override is needed.

## What this skill does NOT cover

- **Typography, motion, spacing tokens** — colors only. Other foundations are separate skills.
- **Brand fonts** — *Scania Sans*, *TRATON Type Display*, etc. are not bundled. Token references include system fallbacks.
- **Web components** — to use the `<tds-*>` components, install `@scania/tegel` separately. This skill works with or without them.

If the user asks for typography, motion, or component help, say so and stop — don't guess at the right values.

## Namespace note for projects that also use `@scania/tegel-lite`

`@scania/tegel-lite` exposes a parallel namespace (`--color-foreground-text-*`, `--color-foreground-border-*`, `--color-foreground-icon-*`, plus `--color-background-surface-*`). The `--color-text-*` / `--color-border-*` / `--color-icon-*` names in **this** skill are different tokens — they will not silently shadow the tegel-lite ones, but they also won't pick up tegel-lite's brand wiring.

In a project that already has `@scania/tegel-lite` set up, prefer that package's namespace and treat this skill as supplementary. Only reach for this skill's tokens (and CSS file) when the project is *not* using tegel-lite — for example, a standalone landing page or a tool that wants Tegel colors without the rest of the system.

## Compatibility

Plain CSS custom properties. Works in every evergreen browser, every framework (React, Vue, Svelte, Angular, Astro, plain HTML), every bundler. No JavaScript runtime, no build step.

## Installation summary for the agent

When invoked in a fresh project, the typical flow is:

1. Confirm the project has not already adopted Tegel (search for `tegel-colors.css`, `@scania/tegel`, `tegel-styles`).
2. Ask the user where to place the CSS file (suggest `src/styles/tegel-colors.css` or framework-equivalent).
3. Read the sibling file [`tegel-colors.css`](./tegel-colors.css) and write it to that location verbatim.
4. Add the import to the project's root entry file.
5. Confirm the default theme (Scania, light) renders, then offer to wire up a brand/mode toggle if requested.

Do not generate component CSS until the file is in place and importing — otherwise `var(--color-*)` references resolve to nothing.
