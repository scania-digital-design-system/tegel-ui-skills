# Message

An inline status block with a left-side colored stripe and an automatic icon. Used to call out information, success, warnings, or errors next to related content. Theme-aware via mode-variant primary/secondary.

**Root class:** `tl-message`
**Compound:** yes (single nested wrapper plus text children)
**Theme-aware:** yes (`tl-message--primary` / `--secondary` align with `tds-mode-variant-{primary,secondary}` on body)
**CSS file:** `tl-message.css` (in `components.css` bundle)

## Markup

```html
<div class="tl-message tl-message--primary tl-message--information">
  <div class="tl-message__wrapper">
    <!-- The icon is rendered by ::before on .tl-message__wrapper based on the variant; no <img> needed -->
    <div class="tl-message__content">
      <div class="tl-message__header">Heads up</div>
      <div class="tl-message__extended-message">Optional supporting copy.</div>
    </div>
  </div>
</div>
```

The icon glyph (`info`, `tick`, `warning`, `error`) is drawn from `--icon-{name}-svg` token via CSS `mask-image`. You don't render an icon element; the wrapper does it.

## Modifiers

### Surface mode (one)

| Class | Effect |
|---|---|
| `tl-message--primary` | Layer-01 background. Pair with `body.tds-mode-variant-primary`. |
| `tl-message--secondary` | Layer-02 background. Pair with `body.tds-mode-variant-secondary`. |

### Severity (one — drives stripe color + icon)

| Class | Stripe + icon | Notes |
|---|---|---|
| `tl-message--information` | Info blue | Informational tone |
| `tl-message--success` | Success green | Positive confirmation |
| `tl-message--warning` | Warning amber | Caution |
| `tl-message--error` | Danger red | Also tints the wrapper background red |

### Optional

| Class | Effect |
|---|---|
| `tl-message--minimal` | Strips wrapper background, padding, and border; icon margin shrinks; hides `__extended-message`. Header uses detail typography. Good for inline form-field hints. |
| `tl-message--no-icon` | Hides the auto-generated icon. |

## Sub-elements (compound)

| Class | Where it goes | Notes |
|---|---|---|
| `tl-message__wrapper` | direct child of `tl-message` | Required. Carries padding, background, left-border stripe, and the `::before` icon. |
| `tl-message__content` | inside `tl-message__wrapper` | Flex column wrapper for text. |
| `tl-message__header` | inside `tl-message__content` | Headline — `--headline-07-*` (or `--detail-02-*` under `--minimal`). |
| `tl-message__extended-message` | inside `tl-message__content`, after header | Body copy — `--detail-02-*`. Hidden under `--minimal`. |

Note: the React wrapper uses `tl-message__text` / `tl-message__subheader` — these are NOT in the upstream CSS. Prefer `__content` / `__extended-message` for new code.

## Tokens consumed

- Surface: `--message-main-background` (resolves through `--message-mode-{primary,secondary}-background` to `--color-background-layer-{01,02}`)
- Stripe color: `--message-{info,success,warning,error}-border-color` (`--color-system-{info,success,warning,danger}-subtle`)
- Icon color: `--message-{info,success,warning,error}-icon-color` (`--color-system-{info,success,warning,danger}-default`)
- Error wrapper tint: `--message-error-background` (`--color-system-danger-discrete`)
- Error header text (minimal only): `--message-error-header-text-color`
- Icon glyph: `--icon-info-svg` / `--icon-tick-svg` / `--icon-warning-svg` / `--icon-error-svg` (used as `mask-image`)
- Typography: `--headline-07-*` (header), `--detail-02-*` (extended message + minimal header)

## Examples

### Plain HTML

```html
<!-- Information with extended message -->
<div class="tl-message tl-message--primary tl-message--information">
  <div class="tl-message__wrapper">
    <div class="tl-message__content">
      <div class="tl-message__header">Maintenance window scheduled</div>
      <div class="tl-message__extended-message">
        Service will be unavailable Saturday 02:00–04:00 UTC.
      </div>
    </div>
  </div>
</div>

<!-- Error on a secondary surface -->
<div class="tl-message tl-message--secondary tl-message--error">
  <div class="tl-message__wrapper">
    <div class="tl-message__content">
      <div class="tl-message__header">Failed to save</div>
      <div class="tl-message__extended-message">Check your connection and try again.</div>
    </div>
  </div>
</div>

<!-- Minimal inline (e.g. under a form field) -->
<div class="tl-message tl-message--primary tl-message--error tl-message--minimal">
  <div class="tl-message__wrapper">
    <div class="tl-message__content">
      <div class="tl-message__header">Email is required</div>
    </div>
  </div>
</div>

<!-- Success without the icon -->
<div class="tl-message tl-message--primary tl-message--success tl-message--no-icon">
  <div class="tl-message__wrapper">
    <div class="tl-message__content">
      <div class="tl-message__header">Saved</div>
    </div>
  </div>
</div>
```

### React binding (this project)

```tsx
import Message from '@/src/tegel-components/Message'

<Message variant="information" header="Heads up" subheader="Optional supporting copy." />
<Message variant="error" header="Email is required" minimal />
```

Props: `variant` (required: information / success / warning / error), `header` (required), `subheader`, `mode` (`primary` | `secondary`, default `primary`), `minimal`, `noIcon`. The wrapper currently uses non-canonical sub-element classes (`__text`, `__subheader`) — visually equivalent in this CSS but writing canonical markup is preferred.

## Rules

- **`tl-message__wrapper` is required.** It owns the padding, stripe border, and ::before icon. Without it, you'll see no styling at all.
- **Pick exactly one severity modifier** — without it the wrapper has no left stripe and no icon glyph (the `::before` element renders empty).
- **The icon is drawn via `mask-image`, not an `<img>` or icon element.** Do not nest an icon in the markup; toggle `--no-icon` if you don't want one.
- **`--minimal` hides `__extended-message`.** Don't rely on the body line in minimal layouts.
- **`role="status"` (success/info) or `role="alert"` (error/warning)** on the root improves SR announcements when a message appears dynamically. The CSS does not add ARIA for you.
- **Surface mode must match the page mode-variant.** Putting `tl-message--primary` on a `tds-mode-variant-secondary` body produces low contrast.
