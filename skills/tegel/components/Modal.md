# Modal

A blocking overlay dialog with a backdrop, sticky header, scrollable body, and optional sticky action footer. Compound — use `__header`, `__body`, `__actions` children plus a sibling `__overlay` for the backdrop. Sized via four responsive width modifiers.

**Root class:** `tl-modal`
**Compound:** yes
**Theme-aware:** no (uses inverse-agnostic surface tokens)
**CSS file:** `tl-modal.css` (in `components.css` bundle)

## Markup

```html
<!-- Backdrop is a SIBLING of the modal, not a parent -->
<div class="tl-modal__overlay tl-modal--visible"></div>

<div
  class="tl-modal tl-modal--md tl-modal--visible"
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
>
  <div class="tl-modal__header">
    <h2 class="tl-modal__title" id="modal-title">Confirm action</h2>
    <button class="tl-modal__close" aria-label="Close">
      <!-- 20px cross icon -->
    </button>
  </div>

  <div class="tl-modal__body">
    <p>Are you sure you want to proceed?</p>
  </div>

  <div class="tl-modal__actions">
    <button class="tl-button tl-button--secondary tl-button--md">Cancel</button>
    <button class="tl-button tl-button--primary tl-button--md">Confirm</button>
  </div>
</div>
```

The overlay and modal both default to `display: none`. Toggle `tl-modal--visible` on each to show.

## Modifiers

### Size (one required)

| Class | Width @ ≥672px | @ ≥1056px | @ ≥1312px | @ ≥1584px |
|---|---|---|---|---|
| `tl-modal--xs` | 50% | 31.25% | 31.25% | 25% |
| `tl-modal--sm` | 62.5% | 43.75% | 37.5% | 37.5% |
| `tl-modal--md` | 75% | 62.5% | 62.5% | 50% |
| `tl-modal--lg` | 100% | 75% | 75% | 75% |

Below 672px all sizes are 100% width. Below 320px, sm/md/lg also become full-height.

### State / behavior

| Class | Effect |
|---|---|
| `tl-modal--visible` | Required to show. Without it, both modal and overlay are `display: none`. Apply on both elements. |
| `tl-modal--sticky` | Modal becomes a flex column; `__body` scrolls within `calc(85vh - 36px)`; `__actions` stick to the bottom. Without this, the entire modal scrolls as one block. |

## Sub-elements (compound)

| Class | Where it goes | Notes |
|---|---|---|
| `tl-modal__overlay` | sibling of `tl-modal` | The backdrop. `position: fixed`, full viewport, `z-index: 1000`. Click handling is yours. |
| `tl-modal__header` | first child of `tl-modal` | Sticky to top of modal. Holds title + close. |
| `tl-modal__title` | inside `tl-modal__header` | `--headline-05-*` typography. Use `<h2>` and link via `aria-labelledby`. |
| `tl-modal__close` | inside `tl-modal__header` | Margin-left auto pushes it to the right. Real `<button>` required. |
| `tl-modal__body` | child of `tl-modal` | `--body-01-*` content area. Scrolls when `--sticky` is set. |
| `tl-modal__actions` | child of `tl-modal` | Footer row, 16px gap, sticky to bottom under `--sticky`. |

## States

| State | How |
|---|---|
| Hidden | Default — `display: none` on both `tl-modal` and `tl-modal__overlay`. |
| Visible | Add `tl-modal--visible` to both. |
| Focus on close | `:focus` — outline + box-shadow ring. |

## Tokens consumed

- Surface: `--modal-background` → `--color-background-layer-02`
- Backdrop: `--modal-backdrop` → `--color-background-overlay`
- Text: `--modal-text` → `--color-foreground-text-strong`
- Shadow: `--modal-shadow` (composed from `--component-shadow-base-modifier`)
- Scrollbar: `--tl-scrollbar-thumb-color`, `--tl-scrollbar-track-color`, `--tl-scrollbar-width`
- Typography: `--headline-05-*` (title), `--body-01-*` (body)
- Z-index: backdrop `1000`, modal `1001`
- Max height: `85vh`

## Examples

### Plain HTML

```html
<!-- Standard medium modal with sticky footer -->
<div class="tl-modal__overlay tl-modal--visible" data-action="close-modal"></div>

<div
  class="tl-modal tl-modal--md tl-modal--sticky tl-modal--visible"
  role="dialog"
  aria-modal="true"
  aria-labelledby="confirm-title"
>
  <div class="tl-modal__header">
    <h2 class="tl-modal__title" id="confirm-title">Delete project?</h2>
    <button class="tl-modal__close" aria-label="Close" data-action="close-modal">
      <span class="tl-icon tl-icon--cross tl-icon--20" aria-hidden="true"></span>
    </button>
  </div>

  <div class="tl-modal__body">
    <p>This action cannot be undone. All associated data will be permanently removed.</p>
  </div>

  <div class="tl-modal__actions">
    <button class="tl-button tl-button--secondary tl-button--md" data-action="close-modal">Cancel</button>
    <button class="tl-button tl-button--danger tl-button--md">Delete</button>
  </div>
</div>
```

To show: add `tl-modal--visible` to both elements; to hide, remove it. Trap focus inside the dialog and listen for Escape — neither is in the CSS.

### React binding (this project)

```tsx
import Modal from '@/src/tegel-components/Modal'

<Modal
  isOpen={open}
  onClose={() => setOpen(false)}
  title="Delete project?"
  size="md"
  sticky
>
  <Modal.Body>
    <p>This action cannot be undone.</p>
  </Modal.Body>
  <Modal.Actions>
    <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
    <Button variant="danger" onClick={confirm}>Delete</Button>
  </Modal.Actions>
</Modal>
```

The wrapper portals into `document.body`, locks page scroll while open, listens for Escape, and renders the header + close button itself. Sub-components: `Modal.Body`, `Modal.Actions`. Don't add your own header inside `Modal.Body`.

## Rules

- **The overlay is a sibling, not a parent.** `tl-modal__overlay` and `tl-modal` are independent elements that both need `tl-modal--visible` to show.
- **Pick a size.** Without `--xs|sm|md|lg` the modal has no width constraints below the inline-size of its content.
- **Render in a portal.** Modals nested inside transformed/overflow:hidden parents will be clipped; portal to `<body>` to escape stacking contexts.
- **Trap focus and listen for Escape.** The CSS does neither — your binding must implement both for keyboard accessibility.
- **Use `role="dialog"` + `aria-modal="true"` + `aria-labelledby`** linking to the `__title` id. Without these, screen readers won't treat the surface as a modal.
- **Lock body scroll** while the modal is open (`document.body.style.overflow = 'hidden'`) — the CSS doesn't.
- **z-index hierarchy.** Backdrop is 1000, modal is 1001. Tooltips render at 1000 too — if a tooltip must appear above the modal, bump it (e.g. via `--tds-z-index-tooltip`).
- **Use `--sticky` for tall content.** Without it, the entire modal scrolls and the action row scrolls out of view.
- **`max-height: 85vh`** — content beyond that scrolls; design with the constraint in mind.
