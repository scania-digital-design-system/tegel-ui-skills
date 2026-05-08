# Dropdown

A dropdown built on a native `<select>`. Comes in three sizes × two variants, with optional outside or floating label, helper text, and error state. The chevron icon is rendered via the wrapper's `::after` pseudo-element. For a custom button-based dropdown see DropdownButton; for type-to-filter see DropdownFilter — they all share `tl-dropdown.css`.

**Root class:** `tl-dropdown`
**Compound:** yes
**Theme-aware:** yes (Scania bottom-bar / Traton outline differ via brand class on `<html>`)
**CSS file:** `tl-dropdown.css` (in `components.css` bundle). Shared with DropdownButton and DropdownFilter

## Markup

```html
<div class="tl-dropdown tl-dropdown--primary tl-dropdown--lg">
  <label class="tl-dropdown__label" for="country">Country</label>
  <select class="tl-dropdown__select" id="country">
    <option value="" disabled selected>Select…</option>
    <option value="se">Sweden</option>
    <option value="no">Norway</option>
  </select>
  <div class="tl-dropdown__helper">Optional helper text</div>
</div>
```

## Modifiers

### Variant (one required)

| Class | Effect |
|---|---|
| `tl-dropdown--primary` | Layer-01 background |
| `tl-dropdown--secondary` | Layer-02 background |

### Size (one required)

| Class | Effect |
|---|---|
| `tl-dropdown--lg` | 56px tall |
| `tl-dropdown--md` | 48px tall |
| `tl-dropdown--sm` | 40px tall |

### State (optional)

| Class | Effect |
|---|---|
| `tl-dropdown--error` | Red border + error icon prefix on `.tl-dropdown__helper` |

### Optional

| Class | Effect |
|---|---|
| `tl-dropdown--label-inside` | Floating-label pattern (label sits inside) |
| `tl-dropdown--dropup` | List opens upward instead of downward (relevant for DropdownButton/Filter) |

## Sub-elements (compound)

| Class | Where it goes | Notes |
|---|---|---|
| `tl-dropdown__label` | inside root | Pair with `for="…"` matching the select's `id` |
| `tl-dropdown__select` | inside root | Native `<select>`. Use `option[value=""]` for the placeholder row |
| `tl-dropdown__helper` | inside root | Helper / error text. Auto-prepends an info icon when root has `--error` |

## States

Driven by native pseudo-classes on `.tl-dropdown__select`:

| State | How |
|---|---|
| Hover | `:hover` → border-hover box-shadow |
| Focus | `:focus-visible` → accent box-shadow |
| Disabled | `:disabled` → desaturated, cursor not-allowed |
| Open (Traton/Scania visual) | `:has([aria-expanded=true])` rotates the chevron 180° (used by Button/Filter variants) |

## Tokens consumed

- `--dropdown-background` (resolves to `--color-background-layer-01` / `layer-02`)
- `--dropdown-text`, `--dropdown-helper-text`, `--dropdown-placeholder`, `--dropdown-disabled`
- `--dropdown-icon`, `--dropdown-clear-icon`, `--dropdown-error`, `--dropdown-error-focus`
- `--dropdown-border*` (default / hover / focus / active / error variants)
- `--dropdown-border-radius`, `--dropdown-list-border-radius-down`, `--dropdown-list-border-radius-up`
- Typography: `--detail-02-*` (button/select/option), `--detail-05-*` (label/helper)

## Examples

### Plain HTML

```html
<!-- Outside label -->
<div class="tl-dropdown tl-dropdown--primary tl-dropdown--lg">
  <label class="tl-dropdown__label" for="country">Country</label>
  <select class="tl-dropdown__select" id="country">
    <option value="" disabled selected>Select…</option>
    <option value="se">Sweden</option>
    <option value="no">Norway</option>
  </select>
</div>

<!-- Floating label, error state -->
<div class="tl-dropdown tl-dropdown--primary tl-dropdown--md tl-dropdown--label-inside tl-dropdown--error">
  <label class="tl-dropdown__label" for="role">Role</label>
  <select class="tl-dropdown__select" id="role">
    <option value="" hidden></option>
    <option value="admin">Admin</option>
    <option value="user">User</option>
  </select>
  <div class="tl-dropdown__helper">Please select a role</div>
</div>

<!-- Disabled -->
<div class="tl-dropdown tl-dropdown--primary tl-dropdown--sm">
  <select class="tl-dropdown__select" disabled>
    <option value="locked">Locked</option>
  </select>
</div>
```

### React binding (this project)

```tsx
import Dropdown from '@/src/tegel-components/Dropdown'

<Dropdown
  id="country"
  label="Country"
  placeholder="Select…"
  options={[
    { value: 'se', label: 'Sweden' },
    { value: 'no', label: 'Norway' },
  ]}
  onChange={(v) => setCountry(v)}
/>
```

Props: `id` (required), `label`, `labelPosition`, `options` (required `{value,label,disabled?}[]`), `placeholder`, `size`, `variant`, `state`, `helper`, `disabled`, `value`, `onChange` (returns `string`), `className`.

## Rules

- **Native `<select>` is the trigger** — appearance of the open list is controlled by the browser, not by Tegel CSS. For a fully styled list use DropdownButton or DropdownFilter.
- **Use `<option value="" disabled selected>` for an outside-label placeholder** — for floating-label, use `<option value="" hidden></option>` so the empty value doesn't display. The React wrapper picks the right form based on `labelPosition`.
- **Variant + size are required.**
- **Don't add `tl-dropdown__list` / `__option`** to the native select-based variant — those are for the Button/Filter variants. The browser draws the option list itself.
- **`onChange` in the React wrapper returns the string value**, not a React event.
