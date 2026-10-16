---
name: tegel-lite-setup
description: Install, integrate, and avoid the gotchas of @scania/tegel-lite. Use when adopting tegel-lite in a new project, debugging "why does this look broken?" symptoms, or porting Tegel-Lite conventions. Covers the <link>-tag CSS loading pattern (bundlers like Lightning CSS / Turbopack reject the package's CSS), the copy-tegel.mjs script, the brand/mode class structure, the six CSS files missing from components.css, and the token-namespace divergence vs the tegel-colors skill.
---

# tegel-lite-setup — Install, integrate, and avoid the gotchas

Use when adopting `@scania/tegel-lite` in a new project, debugging a "why does this look broken?" symptom, or porting Tegel-Lite conventions into another codebase. Stack-agnostic — every section that touches a framework calls out its assumption explicitly and points to the equivalent for plain HTML / Vue / Svelte / Astro.

This skill assumes the design tokens, type scale, layout grid, and motion tokens described in the `tegel-colors`, `tegel-typography`, `tegel-layout`, and `tegel-motion` skills — but flags one important divergence in the colours mapping (see "Token namespace").

---

## 1 / The Tegel-Lite invariants

Most surprises on this stack come from one of these. Internalise them before troubleshooting:

1. **CSS is loaded via `<link>` tags, not via a JS / bundler import.** Several bundlers (Lightning CSS, Turbopack, esbuild's CSS pipeline) reject the SVG `url()` in `scania-variables.css` and `var(--name with space)` references in `global.css`. The browser's CSS parser is happy with both. Always copy the dist files to a static directory and load with raw `<link>` tags.
2. **The bundle (`components.css`) is incomplete.** Six per-element files are *not* concatenated into it: `tl-folder-tab.css`, `tl-inline-tab.css`, `tl-navigation-tab.css`, `tl-step.css`, `tl-checkbox-vars.css`, `tl-textarea-mixins.css`. Without those files, tabs/steppers render as native unstyled buttons. Either link them individually or run a copy script that appends them to `components.css` (recipe below).
3. **Token names match the `tegel-colors` skill.** Since 1.0.0, Tegel Lite uses `--color-text-*` / `--color-border-*` / `--color-icon-*`, the same as the colors skill, along with `--color-background-*` and `--color-system-*`. The `--color-foreground-*` names only existed in 0.1.0 — if you find them in older code, rename them (see section 4); undefined names silently fall back to inherited or browser default colours.
4. **Tegel hard-codes a Scania font on `body`.** `global.css` sets `body { font-family: "Scania Sans Semi Condensed", ... }` literally — it does not switch when you toggle to Traton. Override with the brand-aware `--body-01-font-family` token using a higher-specificity selector (recipe below).
5. **Brand classes go on `<html>`, mode classes go on `<body>`.** Tegel's selectors expect this exact split — the cascade is `.traton .tds-mode-dark` (descendant combinator), not `.traton.tds-mode-dark` (compound).
6. **`--tds-z-index-header` is referenced but never defined.** Tegel uses it for header sub-elements (dropdowns, popovers) but ships no default. Set it once or those elements stack inconsistently.

---

## 2 / Install and serve the CSS

```sh
npm i @scania/tegel-lite
# or pnpm / yarn / bun
```

`@scania/tegel-lite/dist/` contains:

```
scania-variables.css        ← tokens for Scania (always loaded)
traton-variables.css        ← tokens for Traton (always loaded — both brands coexist)
global.css                  ← resets, body font, .tds-grid, motion utilities
components.css              ← bundle of most component styles
tl-{component}.css          ← per-component style files (some not in the bundle)
assets/fonts/               ← Scania font files (latin + cyrillic)
assets/icons/               ← Tegel icon SVGs / sprites
assets/logos/               ← Brand logos
```

Copy the entire `dist/` directory to a static path served at, say, `/tegel/`. Load four files at the top of every page:

```html
<link rel="stylesheet" href="/tegel/scania-variables.css">
<link rel="stylesheet" href="/tegel/traton-variables.css">
<link rel="stylesheet" href="/tegel/global.css">
<link rel="stylesheet" href="/tegel/components.css">
```

### The unbundled-CSS recipe

Run this once at install time and on every dependency update. It appends the unbundled per-element CSS to `components.css` so a single file load covers everything.

```js
// scripts/copy-tegel.mjs
import { cpSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const src  = join(root, 'node_modules/@scania/tegel-lite/dist')
const dest = join(root, 'public/tegel')           // adjust to your static path

mkdirSync(dest, { recursive: true })
cpSync(src, dest, { recursive: true })

const componentsPath = join(dest, 'components.css')
let bundle = readFileSync(componentsPath, 'utf8')

const missing = readdirSync(dest)
  .filter((f) => f.startsWith('tl-') && f.endsWith('.css'))
  .filter((f) => {
    const cls = `.${f.replace(/\.css$/, '')}`
    return !new RegExp(`(^|\\n)${cls.replace('.', '\\.')}(\\s|\\{)`).test(bundle)
  })

for (const f of missing) {
  bundle += `\n/* appended from ${f} */\n` + readFileSync(join(dest, f), 'utf8')
}
if (missing.length) writeFileSync(componentsPath, bundle)
```

Run it as a `predev` / `prebuild` hook (npm scripts) or any equivalent in your build system. If you can't run a script, link the six unbundled files explicitly after `components.css`.

### Stack notes

- **Plain HTML**: copy the dist directory next to your HTML and link as above.
- **Next.js**: copy script writes into `public/tegel/`; load via `<link>` in your layout's `<head>`. Don't `import "tegel-lite/components.css"` — Turbopack rejects the package as noted.
- **Vite / SvelteKit / Astro / Nuxt**: copy script writes into the public/static directory; same `<link>` pattern in the root document. Don't import via JS.
- **Webpack with css-loader**: same — disable parsing for these files (`css-loader` `import: false`) or copy them out and link.

---

## 3 / Brand and theme application

```html
<!-- Default: Scania, light -->
<html class="scania">
  <body class="scania tds-mode-light tds-mode-variant-primary">

<!-- Scania, dark -->
<html class="scania">
  <body class="scania tds-mode-dark tds-mode-variant-primary">

<!-- Traton, light -->
<html class="traton">
  <body class="scania tds-mode-light tds-mode-variant-primary">

<!-- Traton, dark -->
<html class="traton">
  <body class="scania tds-mode-dark tds-mode-variant-primary">
```

**Yes, `class="scania"` stays on body even under Traton.** Tegel's Traton dark selector is `.traton .tds-mode-dark` — html is the `.traton` ancestor; body just needs `.tds-mode-dark`. The `scania` class on body is harmless there. Mirroring the original `body class="scania ..."` keeps Tegel's component CSS happy across brand toggles.

To toggle live, mutate these classes via whatever client-side runtime you use:

```js
// brand toggle
document.documentElement.classList.toggle('scania', brand === 'scania')
document.documentElement.classList.toggle('traton', brand === 'traton')

// dark/light toggle
document.body.classList.toggle('tds-mode-dark', isDark)
document.body.classList.toggle('tds-mode-light', !isDark)

// optional variant toggle (primary/secondary)
document.body.classList.toggle('tds-mode-variant-primary', variant === 'primary')
document.body.classList.toggle('tds-mode-variant-secondary', variant === 'secondary')
```

Persist with `localStorage` if you want preference to survive reloads.

---

## 4 / Token namespace mapping

Since 1.0.0, Tegel Lite and the `tegel-colors` skill use the same token names. Tegel Lite 0.1.0 used a `--color-foreground-*` namespace instead, and those names are **not defined** in 1.x: any reference silently falls back, which shows up as black-on-black text in dark mode. If you find them in older code, rename them:

| Old name (Tegel Lite 0.1.0) | Current name (1.x) |
|---|---|
| `--color-foreground-text-*` | `--color-text-*` (`strong`, `defined`, `soft`, `subtle`, `disabled`, `discrete`, `brand`, `inverse-*`) |
| `--color-foreground-border-*` | `--color-border-*` (`strong`, `defined`, `soft`, `subtle`, `disabled`, `discrete`, `none`, `inverse-*`) |
| `--color-foreground-icon-*` | `--color-icon-*` (`strong`, `defined`, `soft`, `subtle`, `disabled`, `discrete`, `brand`, `inverse-*`) |
| `--color-foreground-border-accent-focus` | `--component--focus-ring-color-strong` |
| `--color-foreground-text-accent-default` / `-visited` | `--component-link-text-accent-default` / `-visited` |

Note: Tegel Lite 1.8.0's own `tl-button.css` and `tl-datetime.css` (and the bundled `components.css`) still reference `--color-foreground-border-accent-focus`, which isn't defined, so their focus outline colour falls back.

**Background and system tokens:**

- `--color-background-{base, layer-01, layer-02, layer-03, top, overlay, none}` plus `inverse-*` variants
- `--color-system-{info, success, warning, danger}-{strong, defined, default, subtle, discrete}`

---

## 5 / Body font override

Tegel's `global.css` ships:

```css
body {
  font-family: "Scania Sans Semi Condensed", "Scania Sans Condensed", Arial, ...;
  font-size: 14px;
  margin: 0;
  flex: 1;
}
```

That literal value never changes when `.traton` is added. Inherited fonts on descendants stay Scania even in Traton mode. Override at higher specificity (CSS load order is unreliable in many bundlers — same-specificity overrides may lose):

```css
/* Specificity 0,0,0,2 vs Tegel's `body` at 0,0,0,1. Wins regardless of order. */
html body {
  font-family: var(--body-01-font-family);
}
```

Elements that explicitly set their own `font-family` from a typography token (`var(--headline-04-font-family)` etc.) already swap correctly — only inherited fonts need this override.

**Traton fonts are CDN-only** — `cdn.digitaldesign.scania.com/fonts/traton/...`. Scania fonts are bundled locally in `assets/fonts/` plus CDN fallback. If the toggle "looks like nothing happened," check DevTools Network for failing Traton woff2 requests. Self-hosting Traton fonts means downloading the four `.woff2` files into your `assets/fonts/` and updating the `@font-face` `src` URLs (currently in `traton-variables.css`).

---

## 6 / Page surface (background) and scroll

```css
/* Apply background ONLY to body — leaving <html> with no opaque background
 * lets the browser propagate body's background across the canvas. Without
 * this, when content is short and body is shorter than the viewport, html's
 * default colour shows around the body. */
body {
  background: var(--color-background-base);
  color: var(--color-text-strong);
  min-height: 100vh;
}
```

Don't put a background on `<html>` — it disables body propagation.

---

## 7 / Sticky header + sticky side menu pattern

A common app-shell pattern: header pinned at top, side menu pinned to the left and filling viewport height below the header.

```css
/* Tegel references but doesn't define this — set it once. */
:root { --tds-z-index-header: 600; }

.tl-header {
  position: sticky;
  top: 0;
  z-index: var(--tds-z-index-header);
}

.site-shell {                                 /* your shell wrapper */
  display: flex;
  min-height: calc(100vh - var(--tds-header-height, 64px));
}

@media (min-width: 992px) {
  .site-shell > .tl-side-menu {
    position: sticky;
    top: var(--tds-header-height, 64px);
    align-self: flex-start;
    height: calc(100vh - var(--tds-header-height, 64px));
  }
}
```

### Z-index hierarchy (Tegel defaults + this override)

| Layer | Z-index | Source |
|---|---|---|
| Side menu (`.tl-side-menu`) | 500 | Tegel default |
| Header (`.tl-header`) | 600 | Set via `--tds-z-index-header` |
| Tooltip | 1000 | Tegel default |
| Modal | 1001 | Tegel default |

Defining `--tds-z-index-header: 600` also makes Tegel's in-header dropdowns (computed as `calc(var(--tds-z-index-header) + 1)`) stack above the side menu.

---

## 8 / Card content max-width override

Tegel constrains `.tl-card__content` to `max-inline-size: 336px` — that's a marketing-card constraint. For docs/dashboard cards, override:

```css
/* Higher-specificity selector (0,0,2,0) beats Tegel's `.tl-card__content` (0,0,1,0) */
.tl-card__body .tl-card__content {
  max-inline-size: unset;
}
```

If you want the constraint removed only on specific cards, Tegel ships a `tl-card--stretch` modifier that has the same effect locally.

---

## 9 / Cascade order matters

Many bundlers inject project CSS *before* the link-tagged Tegel files in the rendered `<head>`. For overrides at the same specificity, this means **Tegel wins**. Strategies, in order of preference:

1. **Use a higher-specificity selector** — `html body`, `.tl-card__body .tl-card__content`, `.scope > .tl-…`. Specificity always beats order, regardless of injection.
2. **Scope by adding a project class** — `.site-shell--menu-closed > .tl-side-menu { ... }`. Same effect, often more semantic.
3. **`!important`** — last resort. None of the patterns in this skill need it.

Don't try to fix this by reordering imports unless your bundler exposes a stable mechanism. In practice it's whack-a-mole.

---

## 10 / Iconography

Tegel ships ~190 icons covering UI + vehicle/telematics themes (`acceleration`, `adblue`, `cab_door`, `mileage`, `coolant_level`, …). It does **not** include brand logos — no `facebook`, `twitter`, `linkedin`, `youtube`. For social link icons, map platforms to the closest semantic icon:

| Platform | Reasonable Tegel icon |
|---|---|
| LinkedIn | `profile` |
| Instagram | `camera` |
| YouTube | `audio` |
| Twitter / X | `export` |
| GitHub | `document` |
| (fallback) | `export` |

To list the full set: `grep -oE "\.tl-icon--[a-z0-9_]+" node_modules/@scania/tegel-lite/dist/tl-icon.css | sort -u`. Apply with `<span class="tl-icon tl-icon--burger tl-icon--20"></span>` (icon name + size class).

---

## 11 / Toggle on dark surfaces

Tegel's `Toggle` defaults the off-state slider to `--color-icon-subtle` — a transparent dark grey tuned for *light* surfaces. On a dark brand-coloured surface (e.g. inside the header), it blends in. Retune locally:

```css
.scope-where-bg-is-dark .tl-toggle {
  --toggle-background-off: var(--color-icon-inverse-subtle);
  --toggle-switch:         var(--color-text-inverse-strong);
  --toggle-text:           var(--color-text-inverse-strong);
}
```

The on-state stays `--color-system-success-default` (green) — already high contrast everywhere.

---

## 12 / Compound components — don't break them up

Some Tegel components require a specific nesting (Card, Modal, Accordion, Stepper, Header, Footer, SideMenu, Table, Tabs). The component CSS targets sub-element classes via descendant selectors that assume their parent — skip the parent and the styling collapses.

Example: `.tl-card__body .tl-card__content { ... }` only matches when `.tl-card__content` is a descendant of `.tl-card__body`. If you put `.tl-card__content` directly under `.tl-card`, half the rules don't apply.

In React (or any component framework), if you're wrapping the compound parts as separate components, **keep them as a parent + sub-component family** (e.g. `Card.Body`, `Card.Header`). If those sub-components are imported across an RSC boundary in Next.js, they'll be `undefined` — wrap the compound usage in a `"use client"` component.

---

## 13 / Quick diagnostic checklist

When the site "doesn't look right," run through these in order:

| Symptom | Probable cause |
|---|---|
| Tabs / steppers render as native browser buttons | Per-element CSS files (`tl-folder-tab.css`, `tl-inline-tab.css`, `tl-step.css`) not loaded. Run the copy script with the append step or link them explicitly. |
| Text stays black in dark mode | Used `--color-foreground-text-*` (only existed in Lite 0.1.0). Switch to `--color-text-*`. |
| Font doesn't change on brand toggle | Body font override missing or losing the cascade. Use `html body { font-family: var(--body-01-font-family) }`. |
| Side menu rendering above header on desktop | `--tds-z-index-header` not defined. Set to 600 in `:root`. |
| Card content cuts off at 336px | Override `.tl-card__body .tl-card__content { max-inline-size: unset }` or add `tl-card--stretch` to that card. |
| Page background doesn't follow theme | Background applied to `<html>` instead of `<body>`. Move it to body so propagation works. |
| Compound component prints `undefined` (React/Next) | Compound parent imported in a server component. Wrap in a `"use client"` component. |
| Brand class not theming descendants | Brand class on body instead of html. Tegel's selector is `.traton .tds-mode-dark` (descendant). |
| Override appears in DevTools but is crossed out | Same-specificity CSS load order — bump specificity (`html body`, parent selector chain). |
| Toggle off-state invisible on a dark surface | Retune `--toggle-background-off` to the `inverse-*` token in that scope. |
| Header dropdown rows look unstyled (no padding / no hover / wrong height) | `tl-header__dropdown-menu-item` is a **wrapper**, not the link. Put the class on a `<div>` and nest `<a>` or `<button>` inside — Tegel's row CSS targets `.tl-header__dropdown-menu-item a` / `… button`, not the menu-item itself. See the Header skill's "Dropdown panel (canonical structure)" example. |
| Header dropdown chevron snaps instead of animating on open | Chevron icon is missing the base `tl-header__dropdown-icon` class. The transition lives there; `--rotated` only sets the angle. Add both: `class="tl-header__dropdown-icon tl-icon tl-icon--chevron_down tl-icon--16"`, then toggle `--rotated`. |

---

## 14 / Stack-binding notes

These docs treat Tegel Lite as pure CSS. Bindings are your call:

- **Plain HTML**: ship the markup directly. No build step needed beyond the copy script.
- **React** (the boilerplate this skill ships with): wrap each component in a thin `.tsx` that builds the class string from props. See `src/tegel-components/` for ready-made wrappers.
- **Vue / Svelte**: ditto — a `<script setup>` or `<script>` block with class-string composition.
- **Astro / Hugo / Jekyll**: server-rendered, same HTML; the only stack concern is loading the four CSS files in your layout template.
- **Web components**: Scania ships `@scania/tegel` (the full version with `<tds-*>` web components). This skill is for *Lite* (CSS-only); if you're using `@scania/tegel`, refer to its own docs.

The component skill docs (`tegel-components/{Name}.md`) are written stack-agnostic — markup + classes + states. If your project ships React wrappers (or any other binding), the docs note where to find them.
