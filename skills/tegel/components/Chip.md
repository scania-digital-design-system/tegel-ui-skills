# Chip

A compact, always-interactive label — typically used for filters, tags, and selectable categories. Two sizes, an optional selected state, and an optional leading or trailing icon. Renders as a real `<button>` so disabled / hover / focus / selected states all work via standard pseudo-classes.

**Root class:** `tl-chip`
**Compound:** no
**Theme-aware:** yes (radius and surfaces shift between Scania/Traton and light/dark)
**CSS file:** `tl-chip.css` (in `components.css` bundle)

## Markup

```html
<!-- Plain chip -->
<button class="tl-chip tl-chip--lg" type="button">React</button>

<!-- Selected chip with leading icon -->
<button class="tl-chip tl-chip--lg tl-chip--prefix tl-chip--selected" type="button">
  <span class="tl-icon tl-icon--tick tl-icon--16" aria-hidden="true"></span>
  Selected
</button>

<!-- Small chip with trailing icon -->
<button class="tl-chip tl-chip--sm tl-chip--suffix" type="button">
  Download
  <span class="tl-icon tl-icon--download tl-icon--16" aria-hidden="true"></span>
</button>
```

## Modifiers

### Size (one required)

| Class | Effect |
|---|---|
| `tl-chip--sm` | 24px tall, 12px horizontal pad, 6px gap |
| `tl-chip--lg` | 32px tall, 16px horizontal pad, 8px gap |

### Icon-slot padding (apply when an icon is present)

| Class | Effect |
|---|---|
| `tl-chip--prefix` | Tightens the leading padding so a leading icon sits with the right inset (`8px` for `lg`, `6px` for `sm`). |
| `tl-chip--suffix` | Tightens the trailing padding for a trailing icon. |
| both `--prefix` and `--suffix` | Symmetric tight padding on both sides. |

### State

| Class | Effect |
|---|---|
| `tl-chip--selected` | Inverted/active fill (`--chip-background-active`) and inverse text. Hover state uses a separate `--chip-background-active-hover`. |

Disabled is handled by the native `disabled` attribute on `<button>` — don't use a class.

## States

| State | How |
|---|---|
| Hover | `:hover` — `--chip-background-hover` |
| Focus (keyboard) | `:focus-visible` — focus outline (4px on Traton, 2px elsewhere) + 1px white halo |
| Selected | `tl-chip--selected` |
| Selected + hover | `tl-chip--selected:hover` — info color |
| Selected + focus | `tl-chip--selected:focus-visible` — `--chip-focused-on-selected` |
| Disabled | `:disabled` — desaturated, `cursor: not-allowed`, `pointer-events: none` |
| Disabled + selected | preserves selected fill but uses dim text token |

## Tokens consumed

- `--component-chip-color-default` / `--component-chip-color-selected` / `--component-chip-color-hover` / `--component-chip-color-hover-on-selected` / `--component-chip-color-focused` / `--component-chip-color-focused-on-selected` / `--component-chip-color-disabled`
- `--component-chip-foreground-inverse`, `--component-chip-foreground-foreground-disabled-selected`
- `--color-text-strong`, `--color-text-disabled`, `--component--focus-ring-color-strong`
- `--component-chip-border-radius` — 16px on Scania, 2px on Traton
- `--dimension-radius-focus-width`
- Typography: `--detail-02-*`

## Examples

### Plain HTML

```html
<!-- Filter group -->
<div style="display: flex; gap: 8px;">
  <button class="tl-chip tl-chip--lg tl-chip--selected" type="button">All</button>
  <button class="tl-chip tl-chip--lg" type="button">Trucks</button>
  <button class="tl-chip tl-chip--lg" type="button">Buses</button>
  <button class="tl-chip tl-chip--lg" type="button">Engines</button>
</div>

<!-- Removable tag (handle close-click yourself) -->
<button class="tl-chip tl-chip--sm tl-chip--suffix" type="button" aria-label="Remove tag">
  Frontend
  <span class="tl-icon tl-icon--cross tl-icon--16" aria-hidden="true"></span>
</button>

<!-- Disabled -->
<button class="tl-chip tl-chip--lg" type="button" disabled>Coming soon</button>
```

### React binding (this project)

```tsx
import Chip from '@/src/tegel-components/Chip'

<Chip label="React" selected onClick={() => toggleTag('react')} />
<Chip label="Download" icon="download" iconPosition="suffix" size="sm" />
<Chip label="Coming soon" disabled />
```

Props: `label`, `size` (`'sm' | 'lg'`, default `'lg'`), `selected`, `disabled`, `icon`, `iconPosition` (`'prefix' | 'suffix'`, default `'prefix'`), `onClick`. The wrapper auto-applies `tl-chip--prefix` / `--suffix` when an icon is set.

## Rules

- **Chips are always buttons.** There's no read-only chip variant — if you need a non-interactive tag, use a different component (Badge for counters/labels, or build a static element).
- **Add `tl-chip--prefix` / `--suffix` when (and only when) an icon is present.** They tweak padding to match the icon — applying them without an icon leaves an asymmetric gap.
- **Use the `disabled` attribute, not a class.** The CSS targets `:disabled` directly.
- **Selected disabled chips keep the selected fill** with a dimmed text token — that's intentional, don't override it.
- **Brand affects radius:** Scania chips are 16px-rounded; Traton chips are nearly square (2px). Don't override `border-radius` locally — it would break the brand contract.
- **Focus halo needs the parent surface.** The selected `:focus-visible` state uses a 1px white box-shadow as a halo; on dark surfaces this looks correct, but on a near-white panel the halo may be invisible.
