# PopoverMenu

A floating action menu anchored near a trigger. Fixed 160px width by default (or fluid). Compound — items, optional disabled items, and dividers. Theme-aware via mode-variant primary/secondary.

**Root class:** `tl-popover-menu`
**Compound:** yes
**Theme-aware:** yes (`tl-popover-menu--primary` / `--secondary`); shadow differs per brand (Scania soft shadow, Traton none)
**CSS file:** `tl-popover-menu.css` (in `components.css` bundle)

## Markup

```html
<div class="tl-popover-menu tl-popover-menu--primary tl-popover-menu--visible">
  <div class="tl-popover-menu__item-wrapper">
    <button class="tl-popover-menu__item">Edit</button>
    <button class="tl-popover-menu__item">Duplicate</button>
    <hr class="tl-divider tl-divider--horizontal">
    <button class="tl-popover-menu__item--disabled" aria-disabled="true">Archive</button>
    <button class="tl-popover-menu__item">Delete</button>
  </div>
</div>
```

The root is `visibility: hidden` until `--visible` is added. Position it yourself — `tl-popover-menu` has `z-index: 900` and no built-in placement.

## Modifiers

### Mode (one)

| Class | Effect |
|---|---|
| `tl-popover-menu--primary` | Layer-01 background, hover Layer-02. Pair with `body.tds-mode-variant-primary`. |
| `tl-popover-menu--secondary` | Layer-02 background, hover Layer-01. Pair with `body.tds-mode-variant-secondary`. |

### Visibility

| Class | Effect |
|---|---|
| `tl-popover-menu--visible` | Required to show. Without it the menu is `visibility: hidden; pointer-events: none`. |

### Sizing

| Class | Effect |
|---|---|
| *(default)* | Fixed `width: 160px`. |
| `tl-popover-menu--fluid` | `width: max-content`, sized to its widest item. Becomes `display: inline-block`. |

### Animation (optional)

| Class | Effect |
|---|---|
| `tl-popover-menu--animation-fade` | 120ms fade + 4px slide-up on enter. Combine with `--visible` to trigger. |

## Sub-elements (compound)

| Class | Where it goes | Notes |
|---|---|---|
| `tl-popover-menu__item-wrapper` | direct child of `tl-popover-menu` | Required. Provides 16px vertical padding around the item list. |
| `tl-popover-menu__item` | inside `tl-popover-menu__item-wrapper` | Standard menu item. Use `<button>` (the CSS uses `all: unset` then re-styles). |
| `tl-popover-menu__item--disabled` | inside `tl-popover-menu__item-wrapper` | Disabled item — `pointer-events: none`, dimmed text + icon. Use a separate class, not `:disabled`. |
| `tl-divider tl-divider--horizontal` | between items | Use the Divider classes; the menu CSS auto-trims its width by 12px and adds 6px margin. |

Items can include a leading or trailing icon — `gap: 10px` is built into `__item`.

## States

| State | How |
|---|---|
| Hover | `:hover` on `__item` — switches to `--popover-menu-background-hover` |
| Focus (keyboard) | `:focus-visible` on `__item` — 1px accent-focus outline, inset |
| Disabled | Use `tl-popover-menu__item--disabled` class — `:disabled` is NOT the trigger |
| Hidden | Default. Add `--visible` to show. |

## Tokens consumed

- Text: `--popover-menu-text` → `--color-text-strong`
- Background: `--popover-menu-background`, hover `--popover-menu-background-hover` (resolve to `--color-background-layer-{01,02}`)
- Disabled text: `--popover-menu-item-disabled` → `--color-text-disabled`
- Disabled icon: `--popover-menu-item-icon-disabled` → `--color-icon-disabled`
- Focus outline: `--popover-menu-item-outline-focus` → `--component--focus-ring-color-strong`
- Shadow: `--popover-menu-box-shadow` (Scania only)
- Typography: `--detail-02-*`
- Motion: `--tds-motion-duration-fast-02`, `--tds-motion-easing-easy` (item hover transition)
- Z-index: `900`

## Examples

### Plain HTML

```html
<div style="position: relative; display: inline-block;">
  <button
    class="tl-button tl-button--ghost tl-button--md tl-button--only-icon"
    aria-haspopup="menu"
    aria-expanded="true"
    aria-label="Row actions"
  >
    <span class="tl-icon tl-icon--more tl-icon--20" aria-hidden="true"></span>
  </button>

  <div
    class="tl-popover-menu tl-popover-menu--primary tl-popover-menu--animation-fade tl-popover-menu--visible"
    role="menu"
    style="position: absolute; top: calc(100% + 4px); right: 0;"
  >
    <div class="tl-popover-menu__item-wrapper">
      <button class="tl-popover-menu__item" role="menuitem">Edit</button>
      <button class="tl-popover-menu__item" role="menuitem">Duplicate</button>
      <hr class="tl-divider tl-divider--horizontal">
      <button class="tl-popover-menu__item--disabled" role="menuitem" aria-disabled="true">Archive</button>
      <button class="tl-popover-menu__item" role="menuitem">Delete</button>
    </div>
  </div>
</div>
```

### React binding (this project)

```tsx
import PopoverMenu from '@/src/tegel-components/PopoverMenu'

<div style={{ position: 'relative' }}>
  <Button onlyIcon icon="more" aria-label="Row actions" onClick={() => setOpen(!open)} />
  <PopoverMenu isOpen={open} onClose={() => setOpen(false)} animate>
    <PopoverMenu.Item onClick={edit}>Edit</PopoverMenu.Item>
    <PopoverMenu.Item onClick={duplicate}>Duplicate</PopoverMenu.Item>
    <PopoverMenu.Separator />
    <PopoverMenu.Item disabled>Archive</PopoverMenu.Item>
    <PopoverMenu.Item onClick={remove}>Delete</PopoverMenu.Item>
  </PopoverMenu>
</div>
```

Props: `isOpen`, `onClose` (Escape + outside-click), `mode`, `animate`, `fluid`. Sub-components: `PopoverMenu.Item`, `PopoverMenu.Separator`. Disabled items render as `__item--disabled` (a class, not `:disabled`).

## Rules

- **Position it yourself.** The CSS does not anchor; use `position: absolute` in a relative parent or a positioning library.
- **`tl-popover-menu__item-wrapper` is required.** Without it, items lose vertical padding and the menu collapses.
- **Use a separate `--disabled` class, not the `:disabled` attribute.** The CSS targets `.tl-popover-menu__item--disabled` explicitly.
- **Use `<button>` for items.** The CSS resets via `all: unset` and re-styles — works on any focusable element, but `<button>` carries activate semantics for free.
- **Add `role="menu"` + `role="menuitem"`** for screen readers, plus `aria-haspopup="menu"` + `aria-expanded` on the trigger.
- **Outside-click and Escape are yours** — bindings must wire dismissal; the CSS only handles visual states.
- **z-index is `900`** — below Modal (1001), Tooltip (1000), and PopoverCanvas (1000). Raise if it must overlay a modal.
- **Use `--fluid` for variable-width items.** Default 160px will truncate or wrap longer labels.
