# Divider

A 1px-thick visual separator. Renders as an empty element styled as a hairline rule via background-colour. Two variants control the colour weight; orientation modifiers swap which dimension expands to fill the parent.

**Root class:** `tl-divider`
**Compound:** no
**Theme-aware:** yes (resolves to `--color-foreground-border-*` which flips with light / dark mode)
**CSS file:** `tl-divider.css` (in `components.css` bundle)

## Markup

```html
<!-- Horizontal hairline -->
<div class="tl-divider tl-divider--discrete tl-divider--horizontal"></div>

<!-- Vertical hairline (parent must have a fixed height for the line to be visible) -->
<div class="tl-divider tl-divider--expressive tl-divider--vertical"></div>
```

The element is intentionally empty — there are no children, no labels, no slots. It's a pure surface.

`<hr class="tl-divider …">` works too; Tegel's CSS doesn't care about the tag, so use `<hr>` for semantic horizontal rules and `<div>`/`<span role="separator">` for visual-only or vertical dividers.

## Modifiers

### Variant (one required)

| Class | Effect |
|---|---|
| `tl-divider--discrete` | Subtle line — `--color-foreground-border-discrete`. Use between rows/list items. |
| `tl-divider--expressive` | Stronger line — `--color-foreground-border-strong`. Use to separate page sections. |

### Orientation (one required)

| Class | Effect |
|---|---|
| `tl-divider--horizontal` | `width: 100%; height: 1px;` — fills the parent's inline width. |
| `tl-divider--vertical` | `width: 1px; height: 100%;` — fills the parent's block height. The parent must have a defined height. |

## States

Divider is non-interactive. No hover/focus/active styling.

## Tokens consumed

- `--divider-background` (default base) → `--color-foreground-border-discrete`
- `--divider-background-discrete` → `--color-foreground-border-discrete`
- `--divider-background-strong` → `--color-foreground-border-strong`

The orientation modifiers don't read tokens — they set fixed `width: 100%; height: 1px` (or vice versa).

## Examples

### Plain HTML

```html
<!-- Discrete horizontal rule between list items -->
<ul class="tl-list">
  <li>First</li>
  <div class="tl-divider tl-divider--discrete tl-divider--horizontal"></div>
  <li>Second</li>
</ul>

<!-- Expressive section break -->
<section>
  <h2>Settings</h2>
  <div class="tl-divider tl-divider--expressive tl-divider--horizontal"></div>
  <p>...</p>
</section>

<!-- Vertical separator inside a flex row -->
<div style="display:flex; height:24px; align-items:center; gap:12px;">
  <span>Edit</span>
  <div class="tl-divider tl-divider--discrete tl-divider--vertical"></div>
  <span>Delete</span>
</div>
```

### React binding (this project)

```tsx
import Divider from '@/src/tegel-components/Divider'

<Divider />                                          // discrete horizontal
<Divider variant="expressive" />                     // expressive horizontal
<Divider orientation="vertical" variant="discrete" /> // vertical
```

`src/tegel-components/Divider.tsx` is a server component. Defaults: `orientation='horizontal'`, `variant='discrete'`. Renders an empty `<div>` with the matching class string.

## Rules

- **Both variant and orientation are required.** The element class on its own has no dimensions — without an orientation modifier the divider is 0×0 and won't be visible.
- **Vertical dividers need a sized parent.** `height: 100%` only works when the parent has a height set (flex row, grid cell, fixed block).
- **Don't put content inside.** The element is empty by design — children inherit no useful layout, and you'll fight `height: 1px`.
- **Use `<hr>` for true semantic horizontal rules.** It's announced by screen readers as a separator. For vertical dividers, prefer `<div role="separator" aria-orientation="vertical">` if the divider has semantic meaning, otherwise leave it as a styled `<div>`.
- **Don't override the colour locally** — both variants pick up the brand-aware foreground-border tokens. Use `--expressive` for stronger weight rather than custom CSS.
