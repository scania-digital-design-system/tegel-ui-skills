# Icon

A pure-CSS icon: a single `<span>` whose silhouette is drawn by a CSS mask image. Pick the icon by adding `tl-icon--{name}`, set the box size with `tl-icon--{size}`. Color follows `currentcolor`, so the icon inherits text color from its parent.

**Root class:** `tl-icon`
**Compound:** no
**Theme-aware:** no (color follows whatever `color` is on the parent)
**CSS file:** `tl-icon.css` (in `components.css` bundle). Mask SVG variables (`--icon-{name}-svg`) are defined in `scania-variables.css` / `traton-variables.css`.

## Markup

```html
<span class="tl-icon tl-icon--{name} tl-icon--{size}" aria-hidden="true"></span>
```

The element is empty — the icon is rendered as a CSS mask, with `background-color: currentcolor` filling the masked area.

## Modifiers

### Name (one required) — selects the icon

`tl-icon--{name}` references `var(--icon-{name}-svg)` from the brand variables file.

A few common names:

| Class | Icon |
|---|---|
| `tl-icon--home` | home |
| `tl-icon--burger` | hamburger menu |
| `tl-icon--profile` | person |
| `tl-icon--arrow_left` / `--arrow_right` / `--arrow_up` / `--arrow_down` | directional arrows |
| `tl-icon--chevron_left` / `--chevron_right` / `--chevron_up` / `--chevron_down` | chevrons |
| `tl-icon--cross` | close × |
| `tl-icon--tick` | check ✓ |
| `tl-icon--plus` / `--minus` | plus / minus |
| `tl-icon--search` / `--settings` / `--info` / `--warning` / `--error` | utility |
| `tl-icon--download` / `--upload` / `--export` / `--share` | transfer |
| `tl-icon--sorting` | sort indicator (used in tables) |

Tegel ships ~190 icons. To list all of them:

```bash
grep -oE "\.tl-icon--[a-z0-9_]+" node_modules/@scania/tegel-lite/dist/tl-icon.css | sort -u
```

> **Tegel does NOT include brand logos** (Facebook, Twitter/X, LinkedIn, GitHub, etc.). Inline an SVG yourself for those.

### Size (one required) — sets `width` and `height`

`tl-icon--{N}` where N is an even pixel value from **12** to **96** (inclusive): `12`, `14`, `16`, `18`, `20`, `22`, `24`, `26`, `28`, `30`, `32`, … `96`.

Without a size class, the base `.tl-icon` rule sets `width: 20px; height: 20px` as default.

## Tokens consumed

- `--icon-{name}-svg` — the mask image, supplied by `scania-variables.css` / `traton-variables.css`
- `currentcolor` — fill color is inherited from the parent's `color`

The icon has no its own theme tokens. To recolor: set `color` on the parent (or on the icon directly via inline style or a class). For destructive UI: `color: var(--color-system-danger-default)`. For success: `color: var(--color-system-success-default)`.

## Examples

### Plain HTML

```html
<!-- Standalone icon, default 20px -->
<span class="tl-icon tl-icon--home" aria-hidden="true"></span>

<!-- 16px icon inside a button -->
<button class="tl-button tl-button--secondary tl-button--sm tl-button--icon" type="button">
  Next
  <span class="tl-icon tl-icon--arrow_right tl-icon--16" aria-hidden="true"></span>
</button>

<!-- Icon-only button — accessible name on the button, hidden on the icon -->
<button class="tl-button tl-button--ghost tl-button--md tl-button--only-icon" type="button" aria-label="Close">
  <span class="tl-icon tl-icon--cross tl-icon--20" aria-hidden="true"></span>
</button>

<!-- Recolored icon (inherits red from the wrapper) -->
<span style="color: var(--color-system-danger-default);">
  <span class="tl-icon tl-icon--warning tl-icon--24" aria-hidden="true"></span>
</span>
```

### React binding (this project)

```tsx
import Icon from '@/src/tegel-components/Icon'

<Icon name="home" />
<Icon name="arrow_right" size="16" />
<Icon name="settings" size="24" />
```

Props: `name` (string, required), `size` (`'16' | '20' | '24'`, default `'20'`). Renders `<span className="tl-icon tl-icon--{name} tl-icon--{size}" aria-hidden="true" />`. The wrapper is a server component — safe to use anywhere, including from RSC.

> The wrapper only types three sizes. The CSS supports every even value 12-96 — use raw classes if you need 12/18/22/32/etc.

## Rules

- **Always set `aria-hidden="true"`.** Icons are decorative; the accessible name belongs on the parent (button, link, etc.). If an icon is the only label, give the parent an `aria-label`.
- **Size class is the only way to size an icon.** The base class is 20×20 — no class smaller or larger means the icon is 20px regardless of font size.
- **Color via `color` on the parent.** The mask uses `background-color: currentcolor`; never set `background-color` on the icon directly (it'd repaint the box and obliterate the silhouette).
- **No brand logos.** Tegel's icon set is product/UI-focused. For social or partner logos, inline an `<svg>` instead.
- **Names use `snake_case`.** It's `arrow_right`, not `arrow-right`. Wrong case = no mask = invisible icon.
- **One name modifier at a time.** Multiple `tl-icon--{name}` classes leave only the last-defined `mask-image` active.
