# Button

A clickable button. Comes in four variants × four sizes, with optional trailing icon and an icon-only mode.

**Root class:** `tl-button`
**Compound:** no
**Theme-aware:** yes (via brand class on root for outline width)
**CSS file:** `tl-button.css` (in `components.css` bundle)

## Markup

```html
<button class="tl-button tl-button--primary tl-button--md">
  Save
</button>
```

The element is your call — `<button>` for actions, `<a>` styled as button for navigation. All focus / hover / disabled selectors target `:disabled`, `:hover`, `:focus-visible` so they work on either.

## Modifiers

### Variant (one required)

| Class | Effect |
|---|---|
| `tl-button--primary` | Filled brand-coloured. Primary action. |
| `tl-button--secondary` | Outlined. Secondary action. |
| `tl-button--ghost` | Transparent until hover. Tertiary action. |
| `tl-button--danger` | Filled red. Destructive action. |

### Size (one required)

| Class | Effect |
|---|---|
| `tl-button--xs` | Extra small |
| `tl-button--sm` | Small |
| `tl-button--md` | Medium (the default size in most bindings) |
| `tl-button--lg` | Large |

### Optional

| Class | Effect |
|---|---|
| `tl-button--full-width` | Stretches to container width (`width: 100%`). |
| `tl-button--icon` | Add when there's a *trailing* `<span class="tl-icon …"></span>` after the label. Provides correct icon spacing. |
| `tl-button--only-icon` | Icon-only button (no text). Pair with `tl-button--{size}` for correct padding. **Always provide `aria-label`** for screen readers. |

## States

State styling is applied via standard pseudo-classes — the CSS targets them directly, no extra classes:

| State | How |
|---|---|
| Hover | `:hover:not(:disabled)` — variant-specific background change |
| Focus (keyboard) | `:focus-visible` — 2px (Scania) / 4px (Traton) accent-focus outline |
| Active | `:active:not(:disabled)` |
| Disabled | `:disabled` — desaturated, `cursor: not-allowed` |

## Tokens consumed

Variant-specific tokens (set per `tl-button--{variant}`):

- `--color-background-accent-{primary|danger}-{default|hover|pressed|focus|disabled}`
- `--color-text-strong`, `--color-text-disabled`
- `--color-border-{soft|subtle|strong|discrete}`, `--component--focus-ring-color-strong`

Typography: `--detail-02-*` (font family, size, line-height, weight, letter-spacing).
Radius: `--dimension-radius-for-surface-clickable` (resolves to `--radius-surface-clickable` — pill-shaped under Traton, rounded under Scania).
Outline width on focus: `--button-outline-width` (2px Scania, 4px Traton — set automatically by brand class).

## Examples

### Plain HTML

```html
<!-- Standard primary button -->
<button class="tl-button tl-button--primary tl-button--md">Save</button>

<!-- Secondary with trailing icon -->
<button class="tl-button tl-button--secondary tl-button--sm tl-button--icon">
  Next
  <span class="tl-icon tl-icon--arrow_right tl-icon--16" aria-hidden="true"></span>
</button>

<!-- Icon-only ghost button (always include aria-label) -->
<button class="tl-button tl-button--ghost tl-button--md tl-button--only-icon" aria-label="Close">
  <span class="tl-icon tl-icon--cross tl-icon--20" aria-hidden="true"></span>
</button>

<!-- Full-width danger -->
<button class="tl-button tl-button--danger tl-button--lg tl-button--full-width">
  Delete account
</button>

<!-- Disabled (use the native attribute, not a class) -->
<button class="tl-button tl-button--primary tl-button--md" disabled>Save</button>
```

### React binding (this project)

The boilerplate ships a wrapper at `src/tegel-components/Button.tsx`:

```tsx
import Button from '@/src/tegel-components/Button'

<Button variant="primary" size="md" icon="arrow_right">Next</Button>
<Button variant="ghost" size="md" onlyIcon icon="cross" aria-label="Close" />
```

Props: `variant`, `size`, `fullWidth`, `onlyIcon`, `icon`, plus all native `ButtonHTMLAttributes`.

## Rules

- **Always include a variant and size class** — there are no defaults at the CSS layer; only bindings supply them.
- **`tl-button--only-icon` requires `aria-label`** — accessible name is mandatory.
- **Trailing-icon spacing requires `tl-button--icon`** — without it, the icon sits flush against the label.
- **Outline width differs by brand** — don't override `--button-outline-width` unless you have a reason; the brand class handles it.
- **Don't free-base styling** with raw `font-family` / `padding` / `background`. Override Tegel's own variables (`--button-primary-background`, etc.) if you need a one-off tweak.
