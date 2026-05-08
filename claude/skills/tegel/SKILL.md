---
name: tegel
description: Use a Tegel Lite design system component. Invoke when the user asks to build UI with Tegel, references a Tegel component (Button, Card, Header, Table, etc.), or asks what classes/props a component accepts. Tegel Lite is a CSS-first design system (no JS runtime) — components are BEM-named classes (tl-{block}__{element}--{modifier}). Before writing any UI, READ the component reference at .claude/skills/tegel/components/{Name}.md for the exact root class, modifiers, sub-elements, states, and tokens.
---

# tegel — Use a Tegel Lite design system component

Use when the user asks to build UI with Tegel, references a Tegel component, or asks what classes/props a component accepts. Invoke as `/tegel ComponentName` (e.g. `/tegel Button`, `/tegel Card`).

## What `@scania/tegel-lite` is

A **CSS-first** design system. The package ships:

- **Tokens** (`scania-variables.css`, `traton-variables.css`) — brand-themed CSS custom properties for colour, typography, spacing, motion, radius, and z-index.
- **Reset / globals** (`global.css`) — base resets, body font, the `.tds-grid-*` responsive grid, motion utility classes.
- **Component styles** (`components.css` + per-element `tl-*.css` files) — every component is a set of BEM-named classes (`tl-{block}`, `tl-{block}__{element}`, `tl-{block}--{modifier}`). No JavaScript runtime.

You write the HTML, you apply the classes. There are no compiled web components, no shadow DOM, no required framework. Bindings (React, Vue, Astro, plain HTML) are a **consumer** concern — write whichever wrapper your stack needs.

## Brand and theme model

Two brands × two modes = four themes. Switch by adding classes to a root element (typically `<html>` for brand, `<body>` for mode):

| Combination | Brand class | Mode class |
|---|---|---|
| Scania, light (default) | `scania` (or none) | `tds-mode-light` (or none) |
| Scania, dark | `scania` | `tds-mode-dark` |
| Traton, light | `traton` | `tds-mode-light` |
| Traton, dark | `traton` | `tds-mode-dark` |

Both files (`scania-variables.css` *and* `traton-variables.css`) must be loaded — the `.traton` selectors only kick in when that class is present, and tokens cascade via the descendant selector `.traton .tds-mode-dark`. The mode class sits on a descendant of the brand class, not on the same element.

## Steps when the user asks for a component

1. **Identify the component** from the user's request or the slash-command argument.
2. **Read the component doc** at `.claude/skills/tegel/components/{Name}.md`. It documents the root class, modifiers, sub-elements, states, and the tokens it consumes — all stack-agnostic.
3. **Check the source CSS file** if anything is unclear: `node_modules/@scania/tegel-lite/dist/tl-{name}.css`. The CSS is the source of truth.
4. **Check existing usage** in the consuming project (if any) — there's almost always a stack-specific binding to follow (e.g. a React wrapper at `src/tegel-components/{Name}.tsx`). Match its conventions.
5. **Write the markup** following these rules:
   - Use only documented classes and modifiers — never invent class names.
   - For compound components (Card, Modal, Accordion, Stepper, Table, Tabs, Header, SideMenu, Footer), follow the exact nesting from the doc. Skipping a wrapper class breaks layout.
   - Theme-aware classes (e.g. `tl-card--primary` / `tl-card--secondary`) refer to the *mode variant*, not the brand. They flip with `tds-mode-variant-{primary,secondary}` on body.
   - Custom styling goes in your project's stylesheet using `site-{block}__{element}--{modifier}` (or your own scheme). Never inline-style. Always use Tegel tokens for colour, spacing, radius, and typography.

## Token namespaces (read first if unfamiliar)

`@scania/tegel-lite` has its own naming. The companion `tegel-colors` skill describes a parallel `--color-text-*` / `--color-border-*` namespace that **does not exist** in this package — token references silently fall back if you use those names. Use:

| Group | Tegel Lite token prefix |
|---|---|
| Backgrounds | `--color-background-*` (`base`, `layer-01..03`, `surface-100..1000`, `top`, `overlay`, `none`, `inverse-*`) |
| Text | `--color-foreground-text-*` (`strong`, `defined`, `soft`, `subtle`, `disabled`, `discrete`, `brand`, `inverse-*`) |
| Borders | `--color-foreground-border-*` (`strong`, `defined`, `soft`, `subtle`, `disabled`, `discrete`, `inverse-*`, `accent-focus`, `accent-link`) |
| Icons | `--color-foreground-icon-*` (mirrors text scale) |
| System (status) | `--color-system-{info,success,warning,danger}-{strong,defined,default,subtle,discrete}` — same as the colors skill |
| Spacing | `--tds-spacing-{layout,element}-*` |
| Radius | `--radius-{narrow,soft,rounded,circle,surface-clickable,surface-field,area-large,area-small}` |
| Typography | `--{level}-font-{family,size,weight,line-height,letter-spacing,text-transform}` where level is `super-type-01..03`, `expressive-headline-01..02`, `headline-01..07`, `paragraph-01..02`, `body-01..02`, `body-link-01..02`, `detail-01..07` |
| Motion | `--tds-motion-duration-*` and `--tds-motion-easing-*` |

See `tegel-lite-setup` for the full mapping table and the cascade-order rules that govern overriding any of these.

## Component catalogue

**Form / Input:** Button, TextField, Textarea, Checkbox, RadioButton, Toggle, Dropdown, DropdownButton, DropdownFilter, Datetime, Slider
**Feedback / Overlay:** Banner, Message, Toast, Modal, PopoverCanvas, PopoverMenu, Tooltip, Spinner
**Layout / Navigation:** Header, Footer, SideMenu, Breadcrumbs, Tabs, Stepper, Divider, Block
**Data Display:** Card, Table, Accordion, Badge, Chip, Icon, Link

## Skill orchestration — what to consult next

This skill is step **1 of 6** in the Tegel UI build chain. After picking the component(s) here, walk the rest in order. Skip a step only if it doesn't apply — never invert the order.

| Step | Skill | Purpose |
|---|---|---|
| 1 | **tegel** (here) | Pick the component, read `components/{Name}.md` |
| 2 | [`tegel-layout`](../tegel-layout/SKILL.md) | Page-level placement: grid, columns, macro spacing |
| 3 | [`tegel-spacing`](../tegel-spacing/SKILL.md) | Micro padding/margin/gap inside and between components |
| 4 | [`tegel-typography`](../tegel-typography/SKILL.md) | Text hierarchy and styles |
| 5 | [`tegel-colors`](../tegel-colors/SKILL.md) | Semantic color tokens, brand/mode |
| 6 | [`tegel-motion`](../tegel-motion/SKILL.md) | Transitions and animations |

**Sidecar skills (consult only when relevant):**

- [`tegel-lite-setup`](../tegel-lite-setup/SKILL.md) — read first when adopting Tegel in a new project, or when debugging "why does this look broken?" symptoms. Covers installation, the `<link>`-tag CSS loading pattern, the brand/mode class structure, and every integration gotcha.
- [`tegel-form-layout`](../tegel-form-layout/SKILL.md) — read only when laying out form components in a row (TextField + Dropdown), or when sm/md outside-label sizing fights you.
- [`components/{Name}`](components/) — per-component CSS reference (root class, markup, modifiers, sub-elements, states, tokens, examples).

> **Token namespace note:** the `tegel-colors` skill describes a `--color-text-*` / `--color-border-*` namespace that **does not exist** in `@scania/tegel-lite`. Use the table above (`--color-foreground-text-*`, `--color-foreground-border-*`) — `tegel-lite-setup` documents the full divergence.
