# Toast

A floating notification card for transient feedback. Fixed 348px width, dark inverse background, severity-coded left stripe, with header / subheader / actions / close button. Stacking order is `z-index: 800`.

**Root class:** `tl-toast`
**Compound:** yes
**Theme-aware:** no (always rendered on inverse background regardless of light/dark mode)
**CSS file:** `tl-toast.css` (in `components.css` bundle)

## Markup

```html
<div class="tl-toast tl-toast--success" role="alert">
  <span class="tl-toast__icon">
    <!-- 20px icon, e.g. <span class="tl-icon tl-icon--tick tl-icon--20" aria-hidden="true"></span> -->
  </span>

  <div class="tl-toast__content">
    <div class="tl-toast__text">
      <div class="tl-toast__header">Saved</div>
      <div class="tl-toast__subheader">Your changes are live.</div>
    </div>
    <div class="tl-toast__actions">
      <!-- optional <button class="tl-button …"> -->
    </div>
  </div>

  <button class="tl-toast__close" aria-label="Dismiss">
    <!-- 20px cross icon -->
  </button>
</div>
```

## Modifiers

### Severity (one — drives the left stripe and icon tint)

| Class | Stripe color |
|---|---|
| `tl-toast--information` | Info blue |
| `tl-toast--success` | Success green |
| `tl-toast--warning` | Warning amber |
| `tl-toast--error` | Danger red |

### Visibility

| Class | Effect |
|---|---|
| `tl-toast--hide` | `display: none; visibility: hidden`. Apply to remove from layout (alternative to unmounting). |

There are no built-in positioning modifiers — placement is your responsibility (typically a fixed-position container in the corner of the viewport).

## Sub-elements (compound)

| Class | Where it goes | Notes |
|---|---|---|
| `tl-toast__icon` | direct child of `tl-toast` | 20px icon slot. Color follows the severity modifier. |
| `tl-toast__content` | direct child of `tl-toast` | Flex column wrapper. Caps text at 250px with `word-break: break-word`. |
| `tl-toast__text` | inside `tl-toast__content` | Wraps header + subheader with 4px gap. |
| `tl-toast__header` | inside `tl-toast__text` | `--headline-07-*` typography, inverse strong text. |
| `tl-toast__subheader` | inside `tl-toast__text` | `--detail-02-*` typography, inverse soft text. |
| `tl-toast__actions` | inside `tl-toast__content`, after `__text` | Optional row for buttons (12px top padding). |
| `tl-toast__close` | direct child of `tl-toast` | 20×20 dismiss button, native `<button>` recommended. |

## Tokens consumed

- Surface: `--toast-background` → `--color-background-inverse-base`
- Headline text: `--toast-headline` → `--color-text-inverse-strong`
- Subheader text: `--toast-subheadline` → `--color-text-inverse-soft`
- Close icon: `--toast-dismiss` → `--color-text-inverse-strong`
- Stripe + icon color per severity: `--toast-icon-{info,success,warning,error}` → `--color-system-{info,success,warning,danger}-default`
- Typography: `--headline-07-*` (header), `--detail-02-*` (subheader)
- Focus: `--tds-focus-outline-color` on `.tl-toast__close:focus-visible`

## Examples

### Plain HTML

```html
<!-- Success toast in a fixed-position container -->
<div style="position: fixed; bottom: 24px; right: 24px;">
  <div class="tl-toast tl-toast--success" role="status">
    <span class="tl-toast__icon">
      <span class="tl-icon tl-icon--tick tl-icon--20" aria-hidden="true"></span>
    </span>
    <div class="tl-toast__content">
      <div class="tl-toast__text">
        <div class="tl-toast__header">Saved</div>
        <div class="tl-toast__subheader">Your changes are live.</div>
      </div>
    </div>
    <button class="tl-toast__close" aria-label="Dismiss">
      <span class="tl-icon tl-icon--cross tl-icon--20" aria-hidden="true"></span>
    </button>
  </div>
</div>

<!-- Error toast with retry action -->
<div class="tl-toast tl-toast--error" role="alert">
  <span class="tl-toast__icon">
    <span class="tl-icon tl-icon--error tl-icon--20" aria-hidden="true"></span>
  </span>
  <div class="tl-toast__content">
    <div class="tl-toast__text">
      <div class="tl-toast__header">Failed to save</div>
      <div class="tl-toast__subheader">Check your connection and try again.</div>
    </div>
    <div class="tl-toast__actions">
      <button class="tl-button tl-button--secondary tl-button--sm">Retry</button>
    </div>
  </div>
  <button class="tl-toast__close" aria-label="Dismiss">
    <span class="tl-icon tl-icon--cross tl-icon--20" aria-hidden="true"></span>
  </button>
</div>
```

### React binding (this project)

```tsx
import Toast from '@/src/tegel-components/Toast'

<Toast variant="success" header="Saved" subheader="Your changes are live." onClose={hide} />
<Toast
  variant="error"
  header="Failed to save"
  actions={<Button size="sm">Retry</Button>}
  onClose={hide}
/>
```

Props: `variant` (default `information`), `header`, `subheader`, `actions`, `closable` (default `true`), `onClose`. The wrapper picks the icon (`info` / `tick` / `warning` / `error`) per variant. Positioning is the caller's responsibility.

## Rules

- **Positioning is yours.** The CSS only sizes (348px wide) and styles the toast — it doesn't place it. Wrap in a fixed-position container or stacking manager.
- **Auto-dismiss is yours too.** No timeout logic in the CSS or wrapper; remove the element (or add `tl-toast--hide`) on a timer.
- **z-index is `800`** — below Modal (1001) and Tooltip (1000). If a toast must appear above a modal, raise it explicitly.
- **`role="alert"` for errors/warnings, `role="status"` for success/info.** Otherwise screen readers won't announce.
- **The toast is always dark.** It does not flip colors with light/dark mode — by design, for cross-mode contrast.
- **Width is fixed at 348px.** Don't try to widen by overriding — break long messages into `header` + `subheader`, or use a `Modal`.
- **Keep messages short.** The CSS caps `__content` width at 250px and breaks long words; long-form copy belongs in a Banner or Modal.
