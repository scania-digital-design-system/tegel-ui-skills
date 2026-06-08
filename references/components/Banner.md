# Banner

A full-width inline notification strip for page-level messages. Compound — combines a leading icon, a text block (header + subheader), an actions slot, and an optional close button. Three variants signal severity.

**Root class:** `tl-banner`
**Compound:** yes
**Theme-aware:** no (uses neutral / semantic system tokens, identical in light + dark)
**CSS file:** `tl-banner.css` (in `components.css` bundle)

## Markup

```html
<div class="tl-banner tl-banner--information" role="alert">
  <span class="tl-banner__icon">
    <!-- 20px icon here, e.g. <span class="tl-icon tl-icon--info tl-icon--20" aria-hidden="true"></span> -->
  </span>

  <div class="tl-banner__content">
    <div class="tl-banner__text">
      <div class="tl-banner__header">Update available</div>
      <div class="tl-banner__subheader">Optional secondary line.</div>
    </div>

    <div class="tl-banner__actions">
      <!-- one or more <button class="tl-button …"> -->
    </div>
  </div>

  <button class="tl-banner__close" aria-label="Close">
    <!-- 20px cross icon -->
  </button>
</div>
```

## Modifiers

### Variant (optional — default has no class)

| Class | Effect |
|---|---|
| *(none)* | Neutral default — `--banner-background-default`, neutral icon tint |
| `tl-banner--information` | Info-blue surface, info-blue icon |
| `tl-banner--error` | Danger-red surface, danger-red icon |

There is no `--success` or `--warning` variant; for those use `Message` instead.

## Sub-elements (compound)

| Class | Where it goes | Notes |
|---|---|---|
| `tl-banner__icon` | direct child of `tl-banner` | Wraps a 20px icon. Color is set by the variant modifier on the root. |
| `tl-banner__content` | direct child of `tl-banner` | Flex column wrapper for text + actions. Required. |
| `tl-banner__text` | inside `tl-banner__content` | Wraps header + subheader, gap 4px. |
| `tl-banner__header` | inside `tl-banner__text` | Headline — uses `--headline-06-*`. |
| `tl-banner__subheader` | inside `tl-banner__text` | Optional supporting copy — `--detail-02-*`. |
| `tl-banner__actions` | inside `tl-banner__content`, after `__text` | Optional row holding action buttons (12px top padding). |
| `tl-banner__close` | direct child of `tl-banner` | Optional 20×20 close affordance. Use a real `<button>`. |

## Tokens consumed

- Surface: `--banner-background-default`, `--banner-background-info`, `--banner-background-error` (resolve to `--color-background-layer-01` and `--color-system-{info,danger}-discrete`)
- Icon tint: `--banner-prefix-{default,info,error}`
- Text: `--banner-text` → `--color-foreground-text-strong`
- Close icon: `--banner-close-icon` → `--color-foreground-icon-strong`
- Typography: `--headline-06-*` (header), `--detail-02-*` (subheader)
- Focus: `--tds-focus-outline-color` on `.tl-banner__close:focus-visible`

## Examples

### Plain HTML

```html
<!-- Neutral default -->
<div class="tl-banner" role="status">
  <span class="tl-banner__icon">
    <span class="tl-icon tl-icon--placeholder tl-icon--20" aria-hidden="true"></span>
  </span>
  <div class="tl-banner__content">
    <div class="tl-banner__text">
      <div class="tl-banner__header">Changes saved</div>
    </div>
  </div>
</div>

<!-- Information with action + close -->
<div class="tl-banner tl-banner--information" role="alert">
  <span class="tl-banner__icon">
    <span class="tl-icon tl-icon--info tl-icon--20" aria-hidden="true"></span>
  </span>
  <div class="tl-banner__content">
    <div class="tl-banner__text">
      <div class="tl-banner__header">Update available</div>
      <div class="tl-banner__subheader">Version 1.2 includes critical fixes.</div>
    </div>
    <div class="tl-banner__actions">
      <button class="tl-button tl-button--secondary tl-button--sm">Update now</button>
    </div>
  </div>
  <button class="tl-banner__close" aria-label="Close">
    <span class="tl-icon tl-icon--cross tl-icon--20" aria-hidden="true"></span>
  </button>
</div>

<!-- Error -->
<div class="tl-banner tl-banner--error" role="alert">
  <span class="tl-banner__icon">
    <span class="tl-icon tl-icon--error tl-icon--20" aria-hidden="true"></span>
  </span>
  <div class="tl-banner__content">
    <div class="tl-banner__text">
      <div class="tl-banner__header">Connection lost</div>
      <div class="tl-banner__subheader">Retrying automatically&hellip;</div>
    </div>
  </div>
</div>
```

### React binding (this project)

```tsx
import Banner from '@/src/tegel-components/Banner'

<Banner header="Changes saved" />
<Banner
  variant="error"
  header="Connection lost"
  subheader="Retrying automatically..."
  onClose={() => dismiss()}
/>
```

Props: `variant`, `header`, `subheader`, `actions`, `onClose`. The wrapper auto-picks the icon (`placeholder` / `info` / `error`) per variant and renders a close button only when `onClose` is provided.

## Rules

- **Always supply a `role`.** Use `role="alert"` for `error` / `information`; `role="status"` for the neutral default. Without it, screen readers will not announce the banner when it appears.
- **Include the icon wrapper even if empty** — `tl-banner__icon` reserves layout space and carries the variant tint.
- **`tl-banner__actions` lives inside `__content`**, not as a direct child of `tl-banner`. The CSS targets `.tl-banner__content > *`.
- **There is no success/warning Banner.** For those severities use `Message` (`tl-message--success`, `tl-message--warning`).
- **Close button is a `<button>`.** The CSS uses `:focus-visible` for keyboard focus — a `<div>` won't be focusable without `tabindex` and won't fire activate semantics.
- **Banners take full container width.** They have no max-width and `padding: 16px 20px` baked in — pin them inside the layout container, not the viewport edge.
