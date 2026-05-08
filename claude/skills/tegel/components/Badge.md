# Badge

A small status indicator. Two sizes: `sm` is a fixed 8×8 dot, `lg` is a 20-tall pill that holds a count or short label. Renders as an inline element you place inside a positioned container.

**Root class:** `tl-badge`
**Compound:** no (one optional `__text` child)
**Theme-aware:** no (uses semantic component tokens that follow brand/mode automatically)
**CSS file:** `tl-badge.css` (in `components.css` bundle)

## Markup

```html
<!-- Dot indicator (no text) -->
<span class="tl-badge tl-badge--sm"></span>

<!-- Numeric / labeled badge -->
<span class="tl-badge tl-badge--lg">
  <span class="tl-badge__text" aria-hidden="true">5</span>
</span>

<!-- Pill (wider) — typically when label is >1 character -->
<span class="tl-badge tl-badge--lg tl-badge--pill">
  <span class="tl-badge__text" aria-hidden="true">99+</span>
</span>
```

## Modifiers

### Size (one required)

| Class | Effect |
|---|---|
| `tl-badge--sm` | 8×8 dot. Renders no text. |
| `tl-badge--lg` | 20×20 (square) by default — pair with `--pill` to widen for multi-character text. |

### Optional

| Class | Effect |
|---|---|
| `tl-badge--pill` | `display: inline-block`; removes fixed width and adds 8px horizontal padding. Use whenever text is wider than one character. |
| `tl-badge--hidden` | `display: none` — for toggling visibility while keeping the node mounted. |

## Sub-elements

| Class | Where it goes | Notes |
|---|---|---|
| `tl-badge__text` | child of `tl-badge` (only on `--lg`) | 12px bold detail-01 typography. Mark `aria-hidden="true"` and rely on the parent's accessible label, since badges are visual indicators. |

## Tokens consumed

- `--component-badge-background` → `--badge-background-color`
- `--component-badge-text` → `--badge-color-text`
- Typography: `--detail-01-font-family`; size hardcoded to 12px, weight bold

## Examples

### Plain HTML

```html
<!-- Notification dot beside a button -->
<span style="position: relative; display: inline-block;">
  <button class="tl-button tl-button--ghost tl-button--md tl-button--only-icon" aria-label="Notifications">
    <span class="tl-icon tl-icon--notification tl-icon--20" aria-hidden="true"></span>
  </button>
  <span class="tl-badge tl-badge--sm" style="position: absolute; top: 4px; right: 4px;"></span>
</span>

<!-- Numeric counter -->
<span class="tl-badge tl-badge--lg">
  <span class="tl-badge__text" aria-hidden="true">9</span>
</span>

<!-- Capped numeric counter (you cap the value yourself) -->
<span class="tl-badge tl-badge--lg tl-badge--pill">
  <span class="tl-badge__text" aria-hidden="true">99+</span>
</span>

<!-- Text label -->
<span class="tl-badge tl-badge--lg tl-badge--pill">
  <span class="tl-badge__text" aria-hidden="true">New</span>
</span>
```

### React binding (this project)

```tsx
import Badge from '@/src/tegel-components/Badge'

<Badge size="sm" />            {/* dot */}
<Badge value={5} />            {/* numeric, fits in square */}
<Badge value={150} />          {/* renders as "99+" pill */}
<Badge value="New" />          {/* string → pill */}
```

The wrapper auto-applies `--pill` when `value` is a string or `>= 10`, and caps numeric values at `99+`.

## Rules

- **Always include a size class.** There's no default — without `--sm` or `--lg` the badge has no dimensions.
- **`--sm` is dot-only.** Don't put a `__text` child inside; it has line-height 8px and will overflow.
- **Cap the value yourself.** The CSS doesn't truncate — pass `"99+"` (or whatever cap you want) when the count exceeds your threshold.
- **Use `--pill` for multi-character text.** A two-digit number or word in `--lg` without `--pill` will overflow the 20px square.
- **Mark text `aria-hidden="true"`.** Badges are decorative — give the wrapping interactive element a real accessible name.
- **Position via the parent.** The badge is plain `inline-block`; place it inside a `position: relative` container and use `position: absolute` on the badge to anchor it.
