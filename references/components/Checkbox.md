# Checkbox

A binary input with optional indeterminate state. The visible square is a styled native `<input type="checkbox">` — checkmark, indeterminate dash, hover halo and focus ring are drawn via `::before` / `::after` pseudo-elements on the input itself.

**Root class:** `tl-checkbox`
**Compound:** yes (input + label)
**Theme-aware:** yes (focus halo dimensions differ via `.scania` / `.traton`; checkmark stroke flips in `.tds-mode-dark`)
**CSS file:** `tl-checkbox.css` (in `components.css` bundle). Checkbox CSS variables are defined separately in `tl-checkbox-vars.css`, also bundled

## Markup

```html
<div class="tl-checkbox">
  <input class="tl-checkbox__input" id="agree" type="checkbox" />
  <label class="tl-checkbox__label" for="agree">I agree to the terms</label>
</div>
```

## Modifiers

The Checkbox itself has no root-level modifiers. The only modifier is on the input element:

| Class | Where | Effect |
|---|---|---|
| `tl-checkbox__input--indeterminate` | on `<input>` | Shows the horizontal dash instead of the checkmark. Visual only — you still control the input's `checked` state |

## Sub-elements (compound)

| Class | Where it goes | Notes |
|---|---|---|
| `tl-checkbox__input` | inside root | Native `<input type="checkbox">`. `:checked` / `:disabled` drive visuals |
| `tl-checkbox__label` | inside root | Pair with `for="…"` matching input's `id` |

## States

Driven by native pseudo-classes on `.tl-checkbox__input`:

| State | How |
|---|---|
| Hover | `:hover:not(:disabled)` → border-hover halo via `::before` |
| Focus (keyboard) | `:focus-visible` → focus halo (size differs Scania 20×20 / Traton 22×22) |
| Checked | `:checked` → tinted fill + SVG checkmark |
| Indeterminate | `.tl-checkbox__input--indeterminate` → tinted fill + dash SVG |
| Disabled | `:disabled` → discrete border, disabled fill, cursor not-allowed |

## Tokens consumed

- `--checkbox-label`, `--checkbox-label-disabled`
- `--checkbox-icon`, `--checkbox-fill`, `--checkbox-fill-disabled`
- `--checkbox-border`, `--checkbox-border-hover`, `--checkbox-border-focus`, `--checkbox-border-disabled`
- `--checkbox-background-img`, `--checkbox-background-img-indeterminate` (and disabled / dark-mode variants — embedded SVG data URLs)
- `--checkbox-focus-{width,height,left,top}` (set per brand)
- Typography: `--detail-02-*`

## Examples

### Plain HTML

```html
<!-- Basic -->
<div class="tl-checkbox">
  <input class="tl-checkbox__input" id="agree" type="checkbox" />
  <label class="tl-checkbox__label" for="agree">I agree to terms</label>
</div>

<!-- Pre-checked -->
<div class="tl-checkbox">
  <input class="tl-checkbox__input" id="news" type="checkbox" checked />
  <label class="tl-checkbox__label" for="news">Subscribe to newsletter</label>
</div>

<!-- Indeterminate (e.g. "select all" with mixed children) -->
<div class="tl-checkbox">
  <input class="tl-checkbox__input tl-checkbox__input--indeterminate" id="all" type="checkbox" />
  <label class="tl-checkbox__label" for="all">Select all</label>
</div>

<!-- Disabled -->
<div class="tl-checkbox">
  <input class="tl-checkbox__input" id="locked" type="checkbox" disabled checked />
  <label class="tl-checkbox__label" for="locked">Locked option</label>
</div>
```

### React binding (this project)

```tsx
import Checkbox from '@/src/tegel-components/Checkbox'

<Checkbox id="agree" label="I agree to terms" checked={agreed} onChange={setAgreed} />
<Checkbox id="all" label="Select all" indeterminate />
```

Props: `id` (required), `label` (required), `checked`, `disabled`, `indeterminate`, `onChange` (returns `boolean`, not the event).

## Rules

- **`indeterminate` is purely visual.** It adds the modifier class — the underlying input `checked` value is independent. Manage logical state in your code.
- **Always pair `label` with `id`** via `for="…"` so the label is clickable.
- **Use the native `disabled` attribute** on the `<input>` — there is no disabled modifier class.
- **`onChange` in the React wrapper returns a boolean**, not the React event.
- **Dark mode** flips the checkmark stroke color automatically via `.tds-mode-dark .tl-checkbox` variables.
