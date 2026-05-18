# RadioButton

A single radio in a radio group. The visible circle is a styled native `<input type="radio">` — outer ring, inner fill, focus pulse and hover outline are drawn via `::before` / `::after` pseudo-elements.

**Root class:** `tl-radio-button`
**Compound:** yes (input + label)
**Theme-aware:** yes (focus outline width differs via `.scania` 2px / `.traton` 4px)
**CSS file:** `tl-radio-button.css` (in `components.css` bundle)

## Markup

```html
<div class="tl-radio-button">
  <input class="tl-radio-button__input" id="opt-free" name="plan" value="free" type="radio" />
  <label class="tl-radio-button__label" for="opt-free">Free plan</label>
</div>
```

## Modifiers

No root-level modifiers — RadioButton is intentionally minimal.

## Sub-elements (compound)

| Class | Where it goes | Notes |
|---|---|---|
| `tl-radio-button__input` | inside root | Native `<input type="radio">`. Group via shared `name`, unique `id` and `value` |
| `tl-radio-button__label` | inside root | Pair with `for="…"` matching input's `id` |

## States

Driven by native pseudo-classes on `.tl-radio-button__input`:

| State | How |
|---|---|
| Hover (group) | `.tl-radio-button:not(:has(:disabled)):hover` → ring outline appears around the inner circle |
| Focus | `:focus` → focus pulse animation (`@keyframes rb-focus`) plus accent outline |
| Checked | `:checked` → 4px solid border collapses inner circle to dot |
| Disabled | `:disabled` → discrete border, faded fill, cursor not-allowed |

## Tokens consumed

- `--radio-button-label`, `--radio-button-label-disabled`
- `--radio-button-border`, `--radio-button-border-disabled`
- `--radio-button-background-hover`, `--radio-button-background-inverse`, `--radio-button-background-disabled`
- `--radio-button-focus`, `--radio-button-focus-outline-color`, `--radio-button-focus-outline-width` (2px Scania / 4px Traton)
- `--radio-button-checked-disabled`
- Typography: `--detail-02-*`

## Examples

### Plain HTML

```html
<!-- Group of three radios; same `name`, unique `id` + `value` -->
<div class="tl-radio-button">
  <input class="tl-radio-button__input" id="plan-free" name="plan" type="radio" value="free" checked />
  <label class="tl-radio-button__label" for="plan-free">Free</label>
</div>
<div class="tl-radio-button">
  <input class="tl-radio-button__input" id="plan-pro" name="plan" type="radio" value="pro" />
  <label class="tl-radio-button__label" for="plan-pro">Pro</label>
</div>
<div class="tl-radio-button">
  <input class="tl-radio-button__input" id="plan-ent" name="plan" type="radio" value="enterprise" disabled />
  <label class="tl-radio-button__label" for="plan-ent">Enterprise (locked)</label>
</div>
```

### React binding (this project)

```tsx
import RadioButton from '@/src/tegel-components/RadioButton'

<RadioButton id="plan-free" name="plan" value="free" label="Free" checked={plan === 'free'} onChange={() => setPlan('free')} />
<RadioButton id="plan-pro"  name="plan" value="pro"  label="Pro"  checked={plan === 'pro'}  onChange={() => setPlan('pro')} />
```

Props: `id`, `name`, `value`, `label` (all required), `checked`, `disabled`, `onChange` (receives the standard React `ChangeEvent`, NOT a boolean — unlike Checkbox).

## Rules

- **All radios in a group share the same `name`** with unique `id` + `value` — that is what enforces single-selection at the browser level.
- **Pair label with input** via `for="…"` matching the input's `id` — without it, clicking the label won't toggle.
- **Disabled** uses the native `disabled` attribute. There's no `--disabled` modifier class.
- **`onChange` returns a React event** in the wrapper (different from Checkbox/TextField/Toggle which return primitives).
- **Don't override the focus outline width** — the brand class on `<html>` sets `--radio-button-focus-outline-width` to keep brand consistency.
