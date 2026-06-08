---
name: tegel-spacing
description: Reference for Tegel design system spacing tokens — the layout scale (macro, between sections), the element scale (micro, inside components), the intent-named `--space-*` aliases, and the `--unit-*` primitives. Use when adding, tweaking, or reviewing padding, margin, or gap in any Tegel-based UI so token names stay on-brand instead of hardcoding px values.
---

# Tegel Spacing — Reference

## Setup (one-time, per project)

The current `@scania/tegel-lite` beta ships brand-namespaced units (`--scania-unit-*`, `--traton-unit-*`) but **does not** define the un-namespaced `--unit-*` tokens that this reference — and Tegel's own `--space-*` / `--radius-*` definitions — uses. Without the shim below, `var(--unit-8)` resolves to nothing and any element sized with it collapses.

Drop this block once at the project's CSS root (e.g. `app/styles/site.css` or `src/styles/tokens.css`). It re-exports the active brand's units under the un-namespaced names the rest of the skill assumes:

```css
.scania,
.scania * {
  --unit-1: var(--scania-unit-1);
  --unit-2: var(--scania-unit-2);
  --unit-4: var(--scania-unit-4);
  --unit-8: var(--scania-unit-8);
  --unit-12: var(--scania-unit-12);
  --unit-16: var(--scania-unit-16);
  --unit-20: var(--scania-unit-20);
  --unit-24: var(--scania-unit-24);
  --unit-32: var(--scania-unit-32);
  --unit-40: var(--scania-unit-40);
  --unit-48: var(--scania-unit-48);
  --unit-56: var(--scania-unit-56);
  --unit-64: var(--scania-unit-64);
  --unit-80: var(--scania-unit-80);
  --unit-96: var(--scania-unit-96);
  --unit-120: var(--scania-unit-120);
}

.traton,
.traton * {
  --unit-1: var(--traton-unit-1);
  --unit-2: var(--traton-unit-2);
  --unit-4: var(--traton-unit-4);
  --unit-8: var(--traton-unit-8);
  --unit-12: var(--traton-unit-12);
  --unit-16: var(--traton-unit-16);
  --unit-20: var(--traton-unit-20);
  --unit-24: var(--traton-unit-24);
  --unit-32: var(--traton-unit-32);
  --unit-40: var(--traton-unit-40);
  --unit-48: var(--traton-unit-48);
  --unit-56: var(--traton-unit-56);
  --unit-64: var(--traton-unit-64);
  --unit-80: var(--traton-unit-80);
  --unit-96: var(--traton-unit-96);
  --unit-120: var(--traton-unit-120);
}
```

**Verify before using `--unit-*`:** open DevTools, inspect any element under `.scania` (or `.traton`), and confirm `--unit-8` resolves to `8px`. If it doesn't, the shim isn't being loaded — check import order, not the rule itself.

When the upstream package starts shipping `--unit-*` at the root (likely post-beta), this shim becomes a no-op and can be removed.

## The Two Spacing Scales

Tegel splits spacing into two purpose-named scales. **Use the right scale for the right job — never mix them.**

| Scale | Token prefix | Available steps (px) | Use for |
| :--- | :--- | :--- | :--- |
| **Layout** (macro) | `--tds-spacing-layout-*` | 8, 16, 24, 32, 48, 64, 72, 96, 128, 160 | Distance between sections, page padding, hero margins, gaps in page-level grids |
| **Element** (micro) | `--tds-spacing-element-*` | 2, 4, 8, 12, 16, 20, 24, 32, 40, 48 | Padding inside a component, gap between an icon and label, gutters inside a card |

## Layout Scale — When to Use

Use `--tds-spacing-layout-*` **only** for distance between large blocks on a page.

| Token | Value | Use for |
| :--- | :--- | :--- |
| `--tds-spacing-layout-8` | 8px | Tight section separation |
| `--tds-spacing-layout-16` | 16px | Compact stacked sections |
| `--tds-spacing-layout-24` | 24px | Default sub-section gap |
| `--tds-spacing-layout-32` | 32px | Standard section gap |
| `--tds-spacing-layout-48` | 48px | Between-block gap |
| `--tds-spacing-layout-64` | 64px | Major section padding |
| `--tds-spacing-layout-72` | 72px | Wide section padding |
| `--tds-spacing-layout-96` | 96px | Page-level section padding (block) |
| `--tds-spacing-layout-128` | 128px | Hero / large feature spacing |
| `--tds-spacing-layout-160` | 160px | Maximum page-level spacing |

## Element Scale — When to Use

Use `--tds-spacing-element-*` **only** inside components.

| Token | Value | Use for |
| :--- | :--- | :--- |
| `--tds-spacing-element-2` | 2px | Hairline offsets |
| `--tds-spacing-element-4` | 4px | Icon-to-label gap, tightest internal gap |
| `--tds-spacing-element-8` | 8px | Tight component padding |
| `--tds-spacing-element-12` | 12px | Button vertical padding, small gaps |
| `--tds-spacing-element-16` | 16px | Standard component padding |
| `--tds-spacing-element-20` | 20px | Medium internal padding |
| `--tds-spacing-element-24` | 24px | Card padding, panel gutters |
| `--tds-spacing-element-32` | 32px | Large card padding |
| `--tds-spacing-element-40` | 40px | Extra-large component padding |
| `--tds-spacing-element-48` | 48px | Maximum element padding |

## Intent-Named Shorthand (`--space-*`)

Brand-aware aliases. Identical across Scania and Traton today, but reserved to diverge. Use when you want intent-named spacing without committing to a numeric step.

| Token | Value | Use for |
| :--- | :--- | :--- |
| `--space-tiny` | 4px | Icon-to-label gap, hairline margin |
| `--space-small` | 16px | Standard component padding |
| `--space-medium` | 24px | Card padding, section gap inside a panel |
| `--space-large` | 48px | Section padding, between-block gap |
| `--space-huge` | 80px | Page-level section gaps, hero spacing |

## Unit Primitives (`--unit-*`)

The base scale spacing tokens are built from. **Do not use for padding/margin/gap.** Use only for non-spacing dimensions (icon size, image height, max-width, hairline borders).

`--unit-1` (1px), `--unit-2`, `--unit-4`, `--unit-8`, `--unit-12`, `--unit-16`, `--unit-20`, `--unit-24`, `--unit-32`, `--unit-40`, `--unit-48`, `--unit-56`, `--unit-64`, `--unit-80`, `--unit-96`, `--unit-120`.

## Common Pitfalls

- **JSX `style` props count as raw px.** `style={{ marginLeft: 8 }}` is the same violation as `margin-left: 8px` in CSS — React just appends `px` to the number. Grepping CSS files for raw px will miss these. Move the rule to a CSS class with a token. (If you must keep it inline: `style={{ marginLeft: "var(--tds-spacing-element-8)" }}` works as a string, but a class is preferred for reuse and consistency.)

- **Top-level page blocks have no built-in bottom-margin.** Tegel components (`Banner`, `Block`, `Card`, etc.) ship without outer margin so the consuming page controls the rhythm. If you place a `<Banner>` directly between two sections, it will sit flush against the next block — neither component knows about the other. Apply a layout-scale bottom-margin to *every* top-level page child (typically via a `.section` utility — `margin-bottom: var(--tds-spacing-layout-24)`), or pass that class through the component's `className` prop. Audit a page by walking its top-level children and confirming each one carries spacing to its successor.

## Decision Rules — No Interpretation

1. **Spacing inside a component** (padding, internal gaps, margin between a component's own children) → `--tds-spacing-element-*`.
2. **Spacing between sections / page-level blocks** → `--tds-spacing-layout-*`.
3. **Same px value, different role** → pick by *role*, not by *number*. `padding: 24px` inside a card is `--tds-spacing-element-24`. `margin-bottom: 24px` between two sections is `--tds-spacing-layout-24`.
4. **Want intent naming, no number** → `--space-tiny | -small | -medium | -large | -huge`.
5. **Non-spacing dimension** (icon size, hairline border, fixed max-width) → `--unit-*`.
6. **Never write a raw px value** for spacing. If no token fits, propose adding one — do not hard-code.
7. **Never use `--unit-*` for padding/margin/gap.** Use the spacing scale.
8. **Grid gutters are fixed at 16px** (one element-scale step) — do not override.
