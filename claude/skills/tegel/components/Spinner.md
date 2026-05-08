# Spinner

An indeterminate loading indicator rendered as an SVG with a single animated stroked circle. Four sizes and a default/inverted color pair for dark backgrounds.

**Root class:** `tl-spinner`
**Compound:** yes (one required `<circle>` child)
**Theme-aware:** no (color swaps via `--default` / `--inverted` modifier, not via brand class)
**CSS file:** `tl-spinner.css` (in `components.css` bundle)

## Markup

```html
<svg class="tl-spinner tl-spinner--md tl-spinner--default" role="img" aria-label="Loading">
  <circle class="tl-spinner__circle"></circle>
</svg>
```

The `<circle>` does NOT need `cx` / `cy` / `r` attributes — the CSS sets them via the `cx`/`cy`/`r` SVG presentation attributes through CSS variables driven by the size modifier.

## Modifiers

### Size (one required)

| Class | Radius | Stroke width | Animation period |
|---|---|---|---|
| `tl-spinner--xs` | 8px | 3px | 1.8s |
| `tl-spinner--sm` | 12px | 4px | 1.8s |
| `tl-spinner--md` | 26px | 6px | 1.8s |
| `tl-spinner--lg` | 42px | 8px | 2s (default) |

The rendered SVG box is `2 × radius` square (so `lg` = 84×84, `md` = 52×52, etc.).

### Color (one required)

| Class | Stroke |
|---|---|
| `tl-spinner--default` | `--component-spinner-color` (brand-dependent) |
| `tl-spinner--inverted` | `--color-brand-neutral-white` — for dark surfaces |

## Sub-elements (compound)

| Class | Where it goes | Notes |
|---|---|---|
| `tl-spinner__circle` | one `<circle>` child of the `<svg>` root | Required. The CSS computes `cx`/`cy`/`r` and runs the dash-offset animation. |

## States

The spinner is always animating; there are no on/off classes. To stop the animation, unmount the element.

## Tokens consumed

- Stroke (default): `--tl-spinner-background` → `--component-spinner-color`
- Stroke (inverted): `--tl-spinner-background-inverted` → `--color-brand-neutral-white`
- Sizing: `--tl-spinner-radius-{xs,sm,md,lg}`, `--tl-spinner-stroke-width-{xs,sm,md,lg}`
- Speed: `--tl-spinner-speed` (1.8s), `--tl-spinner-speed-lg` (2s)
- Easing: `cubic-bezier(0.55, 0.15, 0.45, 0.85)` (hardcoded)
- Animation: `@keyframes tl-spinner-dash` (defined in this file)

## Examples

### Plain HTML

```html
<!-- Default large spinner (the default size) -->
<svg class="tl-spinner tl-spinner--lg tl-spinner--default" role="img" aria-label="Loading">
  <circle class="tl-spinner__circle"></circle>
</svg>

<!-- Small inverted spinner inside a dark surface (e.g. a primary button) -->
<button class="tl-button tl-button--primary tl-button--md" disabled>
  <svg class="tl-spinner tl-spinner--xs tl-spinner--inverted" role="img" aria-label="Submitting">
    <circle class="tl-spinner__circle"></circle>
  </svg>
  Submitting…
</button>

<!-- Page-level loader, centered -->
<div style="display: grid; place-items: center; min-height: 240px;">
  <svg class="tl-spinner tl-spinner--md tl-spinner--default" role="img" aria-label="Loading">
    <circle class="tl-spinner__circle"></circle>
  </svg>
</div>
```

### React binding (this project)

```tsx
import Spinner from '@/src/tegel-components/Spinner'

<Spinner />                                  {/* lg / default */}
<Spinner size="sm" variant="inverted" />     {/* in a dark button or banner */}
```

Props: `size` (`xs`|`sm`|`md`|`lg`, default `lg`), `variant` (`default`|`inverted`, default `default`). Renders `<svg role="img" aria-label="Loading">` with the required `<circle>` child.

## Rules

- **The `<circle>` is required.** The CSS animates `tl-spinner__circle` via `stroke-dashoffset` — no circle, no spinner.
- **Don't set `cx`/`cy`/`r` attributes.** The CSS already does it through SVG presentation attributes (`cx: var(--tl-spinner-radius)` etc.). Setting them in HTML overrides the size modifier.
- **Always pair size + color.** Without a size modifier the spinner falls back to `lg`; without `--default`/`--inverted` the stroke has no color and is invisible.
- **Use `role="img"` + `aria-label`** (or `aria-labelledby`) so screen readers announce the loading state. Empty `<svg>` is silent to assistive tech.
- **Inverted is for dark surfaces only.** Using it on a light layer makes the spinner invisible (white on white).
- **Animation is GPU-cheap** but unbounded — long-running spinners can drain battery. If you have a known duration prefer a determinate progress indicator.
- **No `prefers-reduced-motion` handling in the CSS.** If accessibility audits require it, override the `animation` shorthand on `tl-spinner__circle` in your own stylesheet.
