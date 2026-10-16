# PopoverCanvas

A free-form floating panel anchored near a trigger, used for richer controls (forms, settings, multi-line copy) than fit a tooltip or menu. Compound — header, body content, and actions row. Theme-aware via mode-variant primary/secondary.

**Root class:** `tl-popover-canvas`
**Compound:** yes
**Theme-aware:** yes (`tl-popover-canvas--primary` / `--secondary`); shadow differs per brand (Scania has soft shadow, Traton none)
**CSS file:** `tl-popover-canvas.css` (in `components.css` bundle)

## Markup

```html
<div class="tl-popover-canvas tl-popover-canvas--primary tl-popover-canvas--animation-fade tl-popover-canvas--visible">
  <div class="tl-popover-canvas__content">
    <h3 class="tl-popover-canvas__header">Settings</h3>
    <p>Choose your preferences.</p>
    <div class="tl-popover-canvas__actions">
      <button class="tl-button tl-button--ghost tl-button--sm">Cancel</button>
      <button class="tl-button tl-button--primary tl-button--sm">Save</button>
    </div>
  </div>
</div>
```

The root is `display: inline-block` with `visibility: hidden` until `--visible` is added. Position it yourself (a `position: relative` parent + `position: absolute` on the canvas, or a floating-ui-style fixed strategy).

## Modifiers

### Mode (one)

| Class | Effect |
|---|---|
| `tl-popover-canvas--primary` | Layer-01 background. Pair with `body.tds-mode-variant-primary`. |
| `tl-popover-canvas--secondary` | Layer-02 background. Pair with `body.tds-mode-variant-secondary`. |

### Visibility

| Class | Effect |
|---|---|
| `tl-popover-canvas--visible` | Required to show. Without it the canvas is `visibility: hidden; pointer-events: none`. |

### Animation (optional)

| Class | Effect |
|---|---|
| `tl-popover-canvas--animation-fade` | 120ms fade + 4px slide-up on enter. Combine with `--visible` to trigger. |

## Sub-elements (compound)

| Class | Where it goes | Notes |
|---|---|---|
| `tl-popover-canvas__content` | direct child of `tl-popover-canvas` | Required wrapper. Provides 16px padding and `--body-01-*` typography. |
| `tl-popover-canvas__header` | inside `tl-popover-canvas__content` | Optional. `--headline-05-*` typography, 8px bottom margin. Use `<h3>` (or appropriate heading level). |
| `tl-popover-canvas__actions` | inside `tl-popover-canvas__content` | Optional. Flex row, 8px gap, space-between. Holds buttons. |

## States

| State | How |
|---|---|
| Hidden | Default — `visibility: hidden; pointer-events: none`. |
| Visible | Add `tl-popover-canvas--visible`. |
| Animating in | Combine `--animation-fade` + `--visible` — fades opacity 0→1 and translates Y 4px→0 over 120ms. |

## Tokens consumed

- Text: `--popover-canvas-text` → `--color-text-strong`
- Surface: `--popover-canvas-background` → `--color-background-layer-01` or `--color-background-layer-02`
- Shadow: `--popover-canvas-box-shadow` (Scania-only — Traton sets `none`)
- Typography: `--body-01-*` (content), `--headline-05-*` (header)
- Z-index: `1000`
- Radius: `4px` (hardcoded in CSS, not token-driven)

## Examples

### Plain HTML

```html
<div style="position: relative; display: inline-block;">
  <button class="tl-button tl-button--secondary tl-button--md" aria-haspopup="dialog" aria-expanded="true">
    Settings
  </button>

  <div
    class="tl-popover-canvas tl-popover-canvas--primary tl-popover-canvas--animation-fade tl-popover-canvas--visible"
    role="dialog"
    aria-label="Settings"
    style="position: absolute; top: calc(100% + 8px); left: 0; min-width: 280px;"
  >
    <div class="tl-popover-canvas__content">
      <h3 class="tl-popover-canvas__header">Settings</h3>
      <p>Toggle features below.</p>
      <div class="tl-popover-canvas__actions">
        <button class="tl-button tl-button--ghost tl-button--sm">Cancel</button>
        <button class="tl-button tl-button--primary tl-button--sm">Save</button>
      </div>
    </div>
  </div>
</div>
```

To toggle: add/remove `tl-popover-canvas--visible` on the canvas. Outside-click and Escape handling are yours.

### React binding (this project)

```tsx
import PopoverCanvas from '@/src/tegel-components/PopoverCanvas'

<div style={{ position: 'relative' }}>
  <Button onClick={() => setOpen(true)}>Settings</Button>
  <PopoverCanvas isOpen={open} onClose={() => setOpen(false)}>
    <PopoverCanvas.Header>Settings</PopoverCanvas.Header>
    <p>Choose your preferences.</p>
    <PopoverCanvas.Actions>
      <Button variant="primary" size="sm" onClick={() => setOpen(false)}>Save</Button>
    </PopoverCanvas.Actions>
  </PopoverCanvas>
</div>
```

Props: `isOpen`, `onClose` (Escape + outside-click), `mode` (default `primary`), `animate` (default `true`). Sub-components: `PopoverCanvas.Header`, `PopoverCanvas.Actions`. The wrapper does NOT portal; place it in a positioned ancestor.

## Rules

- **Position it yourself.** The CSS only handles surface, padding, and visibility — anchoring relative to a trigger is your job (relative-parent + absolute-child, or a positioning library).
- **`tl-popover-canvas__content` is required.** Without it, header/actions get no padding or typography.
- **Outside-click and Escape close logic is yours.** The CSS just toggles via `--visible`; bindings must wire keyboard + pointer dismissal.
- **Use `role="dialog"` + `aria-label`** (or `aria-labelledby` to the `__header`). The CSS does not set ARIA.
- **Mode must match the page mode-variant** to keep contrast on theme switches.
- **z-index is `1000`** — same as Tooltip and below Modal. If used inside a modal, raise it explicitly.
- **No portal in the wrapper.** Inside transformed or `overflow: hidden` ancestors the canvas will clip; portal manually if needed.
