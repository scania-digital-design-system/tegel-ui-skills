# Tooltip

A small fixed-position label revealed on hover/focus near a trigger. Inverse-colored background (always dark for contrast), max width 204px, 12 placement modifiers that adjust the corner radius for a subtle "tail" effect.

**Root class:** `tl-tooltip`
**Compound:** no
**Theme-aware:** no (always rendered on inverse background); line-height differs per brand
**CSS file:** `tl-tooltip.css` (in `components.css` bundle)

## Markup

```html
<button id="trigger" aria-describedby="tip-1">Hover me</button>

<div id="tip-1" role="tooltip" class="tl-tooltip tl-tooltip--top tl-tooltip--visible" style="top: 0; left: 0;">
  Helpful description.
</div>
```

`tl-tooltip` is `position: fixed` and starts hidden (`opacity: 0; visibility: hidden`). Coordinates are your responsibility — typically computed from `getBoundingClientRect()` on the trigger and the tooltip after measurement.

## Modifiers

### Placement (one — primarily affects the corner-radius "tail")

| Class | Notch corner | Where to place tooltip |
|---|---|---|
| `tl-tooltip--top-start` | bottom-left squared | Above trigger, left-aligned |
| `tl-tooltip--top-end` | bottom-right squared | Above trigger, right-aligned |
| `tl-tooltip--bottom-start` | top-left squared | Below trigger, left-aligned |
| `tl-tooltip--bottom-end` | top-right squared | Below trigger, right-aligned |
| `tl-tooltip--left-start` | top-right squared | Left of trigger, top-aligned |
| `tl-tooltip--left-end` | bottom-right squared | Left of trigger, bottom-aligned |
| `tl-tooltip--right-start` | top-left squared | Right of trigger, top-aligned |
| `tl-tooltip--right-end` | bottom-left squared | Right of trigger, bottom-aligned |

The 4 cardinal `--top` / `--bottom` / `--left` / `--right` placements (without `-start`/`-end`) are valid in bindings but get the default rounded corners (no tail).

### Visibility

| Class | Effect |
|---|---|
| `tl-tooltip--visible` | Required to show. Toggles `opacity: 1; visibility: visible; pointer-events: auto`. Animates over 200ms. |

## States

| State | How |
|---|---|
| Hidden | Default — `opacity: 0; visibility: hidden; pointer-events: none`. |
| Visible | Add `tl-tooltip--visible`. |
| Transition | `opacity 0.2s ease, visibility 0.2s ease`. |

## Tokens consumed

- Text: `--tooltip-text` → `--color-foreground-text-inverse-strong`
- Surface: `--tooltip-background` → `--color-background-inverse-layer-03`
- Typography: `--detail-05-*`
- Line height: `--tl-tooltip-line-height` (17px Scania, 16px Traton)
- Z-index: `var(--tds-z-index-tooltip, 1000)`
- Max width: `204px` (hardcoded)
- Radius: `4px` (with one corner squared per placement modifier)

## Examples

### Plain HTML

```html
<!-- Trigger and tooltip; show/hide handled by JS -->
<button id="t1" aria-describedby="tip-1" class="tl-button tl-button--ghost tl-button--md tl-button--only-icon" aria-label="Delete">
  <span class="tl-icon tl-icon--bin tl-icon--20" aria-hidden="true"></span>
</button>

<div id="tip-1" role="tooltip" class="tl-tooltip tl-tooltip--top">
  Delete this item
</div>

<script>
  const trigger = document.getElementById('t1');
  const tip = document.getElementById('tip-1');
  function show() {
    const tr = trigger.getBoundingClientRect();
    tip.classList.add('tl-tooltip--visible');
    const tt = tip.getBoundingClientRect();
    tip.style.top = `${tr.top - tt.height - 8}px`;
    tip.style.left = `${tr.left + tr.width / 2 - tt.width / 2}px`;
  }
  function hide() { tip.classList.remove('tl-tooltip--visible'); }
  trigger.addEventListener('mouseenter', show);
  trigger.addEventListener('mouseleave', hide);
  trigger.addEventListener('focus', show);
  trigger.addEventListener('blur', hide);
</script>
```

### React binding (this project)

```tsx
import Tooltip from '@/src/tegel-components/Tooltip'

<Tooltip text="Delete this item" position="top">
  <Button variant="ghost" onlyIcon icon="bin" aria-label="Delete" />
</Tooltip>
```

Props: `text` (required), `position` (default `top-start`; one of 12), `offset` (default 8), `children` (the trigger). The wrapper measures with `getBoundingClientRect()` and positions itself in fixed coordinates; trigger gets `aria-describedby`, tooltip gets `role="tooltip"`.

## Rules

- **Always link with `aria-describedby`** from the trigger to the tooltip's `id`. The CSS sets visual styling only; without ARIA, screen readers won't announce it.
- **`role="tooltip"`** belongs on the tooltip element. Don't use `role="alert"` — tooltips are descriptive, not interrupting.
- **Show on focus, not just hover.** Keyboard users need it too — wire `focus`/`blur` events alongside `mouseenter`/`mouseleave`.
- **Position is fixed** — coordinates are viewport-relative, immune to parent overflow. Recompute on scroll/resize if the trigger moves.
- **Tooltip is always dark.** It does not respond to light/dark mode — by design for cross-mode legibility.
- **Don't put interactive controls in a tooltip.** It's text-only. For richer popups use `PopoverCanvas`; for actions use `PopoverMenu`.
- **Max width is 204px.** Long copy wraps; keep tooltips short. For long form, use Banner or Modal.
- **z-index is 1000** (same as PopoverCanvas, below Modal at 1001). Override `--tds-z-index-tooltip` if you need to clear a modal.
