# DropdownFilter

A custom dropdown that uses a text `<input>` as the trigger so the user can type to filter the option list. Same root and styling as Dropdown / DropdownButton — they share `tl-dropdown.css`. The trigger lives inside a `tl-dropdown__input-wrapper` (which positions the chevron and a clear button), and supports a "No result" row when filtering yields nothing.

**Root class:** `tl-dropdown` (yes — same root as Dropdown / DropdownButton)
**Compound:** yes
**Theme-aware:** yes (Scania bottom-bar / Traton outline differ via brand class on `<html>`)
**CSS file:** `tl-dropdown.css` (in `components.css` bundle). Shared with Dropdown and DropdownButton

## Markup

```html
<div class="tl-dropdown tl-dropdown--primary tl-dropdown--lg">
  <label class="tl-dropdown__label" for="city">City</label>
  <div class="tl-dropdown__input-wrapper">
    <input class="tl-dropdown__input" id="city" type="text" placeholder="Type to filter…" aria-expanded="false" />
    <button class="tl-dropdown__input-clear" type="button" tabindex="-1" aria-label="Clear"></button>
  </div>
  <ul class="tl-dropdown__list" role="listbox">
    <li class="tl-dropdown__option" role="option" tabindex="0">Stockholm</li>
    <li class="tl-dropdown__option" role="option" tabindex="0">Oslo</li>
  </ul>
  <div class="tl-dropdown__helper">Optional helper text</div>
</div>
```

The chevron is auto-rendered from `tl-dropdown__input-wrapper::after`. The clear button is hidden by default; it appears via the CSS rule `:has(.tl-dropdown__input[aria-expanded=true]:not(:placeholder-shown))`.

## Modifiers

Identical root modifiers to Dropdown / DropdownButton:

| Class | Category | Effect |
|---|---|---|
| `tl-dropdown--primary` / `--secondary` | Variant (required) | Layer-01 / Layer-02 background |
| `tl-dropdown--lg` / `--md` / `--sm` | Size (required) | 56 / 48 / 40 px |
| `tl-dropdown--error` | State | Red border + error icon on helper |
| `tl-dropdown--label-inside` | Optional | Floating label |
| `tl-dropdown--dropup` | Optional | List opens upward |

Option modifiers (on `<li class="tl-dropdown__option">`):

| Class | Effect |
|---|---|
| `tl-dropdown__option--selected` | Tinted background + tick icon |
| `tl-dropdown__option--disabled` | Faded, cursor not-allowed |
| `tl-dropdown__option--no-result` | "No matches" placeholder row |

## Sub-elements (compound)

| Class | Where it goes | Notes |
|---|---|---|
| `tl-dropdown__label` | inside root | Pair with `for="…"` matching the input's `id` |
| `tl-dropdown__input-wrapper` | inside root | Holds input + clear button. Renders chevron via `::after` |
| `tl-dropdown__input` | inside `__input-wrapper` | Native `<input type="text">`. Drives open/close via `aria-expanded` |
| `tl-dropdown__input-clear` | inside `__input-wrapper` | Clear button (cross icon). Auto-shown when expanded + non-empty |
| `tl-dropdown__list` | inside root | `<ul role="listbox">` of filtered options |
| `tl-dropdown__option` | inside `__list` | `<li role="option">` |
| `tl-dropdown__helper` | inside root | Helper / error text |

## States

| State | How |
|---|---|
| Hover (input) | `:hover` → border-hover box-shadow |
| Focus (input) | `:focus-visible` → accent box-shadow |
| Open | `[aria-expanded=true]` on the input → list visible, chevron rotated 180° |
| Clear button visible | `__input-wrapper:has(__input[aria-expanded=true]:not(:placeholder-shown))` → clear button shown |

## Tokens consumed

Same as Dropdown / DropdownButton:

- `--dropdown-background`, `--dropdown-text`, `--dropdown-placeholder`, `--dropdown-disabled`
- `--dropdown-icon`, `--dropdown-clear-icon`, `--dropdown-error`, `--dropdown-error-focus`
- `--dropdown-helper-text`
- `--dropdown-border*` (default / hover / focus / active / error)
- `--dropdown-option-background`, `--dropdown-option-background-hover`, `--dropdown-option-background-selected`, `--dropdown-option-border`
- Typography: `--detail-02-*`, `--detail-05-*`

## Examples

### Plain HTML

```html
<!-- Single-select with filter -->
<div class="tl-dropdown tl-dropdown--primary tl-dropdown--lg">
  <label class="tl-dropdown__label" for="city">City</label>
  <div class="tl-dropdown__input-wrapper">
    <input class="tl-dropdown__input" id="city" type="text" placeholder="Type to filter…" aria-expanded="false" />
    <button class="tl-dropdown__input-clear" type="button" tabindex="-1" aria-label="Clear"></button>
  </div>
  <ul class="tl-dropdown__list" role="listbox">
    <li class="tl-dropdown__option" role="option" tabindex="0">Stockholm</li>
    <li class="tl-dropdown__option" role="option" tabindex="0">Oslo</li>
    <li class="tl-dropdown__option tl-dropdown__option--no-result" role="option" tabindex="-1">No result</li>
  </ul>
</div>

<!-- Multi-select with filter (options host a checkbox each) -->
<div class="tl-dropdown tl-dropdown--primary tl-dropdown--lg">
  <label class="tl-dropdown__label" for="tags">Tags</label>
  <div class="tl-dropdown__input-wrapper">
    <input class="tl-dropdown__input" id="tags" type="text" placeholder="Filter tags…" aria-expanded="false" />
    <button class="tl-dropdown__input-clear" type="button" tabindex="-1" aria-label="Clear"></button>
  </div>
  <ul class="tl-dropdown__list" role="listbox" aria-multiselectable="true">
    <li class="tl-dropdown__option tl-dropdown__option--selected" role="option" tabindex="0">
      <div class="tl-checkbox">
        <input class="tl-checkbox__input" id="t-design" type="checkbox" checked tabindex="-1">
        <label class="tl-checkbox__label" for="t-design">Design</label>
      </div>
    </li>
    <li class="tl-dropdown__option" role="option" tabindex="0">
      <div class="tl-checkbox">
        <input class="tl-checkbox__input" id="t-eng" type="checkbox" tabindex="-1">
        <label class="tl-checkbox__label" for="t-eng">Engineering</label>
      </div>
    </li>
  </ul>
</div>
```

### React binding (this project)

```tsx
import DropdownFilter from '@/src/tegel-components/DropdownFilter'

<DropdownFilter id="city" label="City" options={cities} onChange={(v) => setCity(v as string)} />
<DropdownFilter id="tags" label="Tags" multiselect options={tags} onChange={(v) => setTags(v as string[])} />
```

Props: `id`, `label`, `labelPosition`, `options` (required `{value,label,disabled?}[]`), `placeholder` (default `'Type to filter...'`), `size`, `variant`, `state`, `helper`, `disabled`, `multiselect`, `onChange` (returns `string | string[]`), `className`. Manages filter text, selection, and open/close state internally.

## Rules

- **Use `tl-dropdown__input` (text input)**, not `tl-dropdown__select` or `tl-dropdown__button` — that's the marker that switches CSS into "filter" mode.
- **Wrap input + clear button in `tl-dropdown__input-wrapper`.** The chevron and clear-button positioning depend on this wrapper.
- **Drive open/close via `aria-expanded` on the input.** The CSS uses `[aria-expanded=true]` to reveal the list and the clear button.
- **Clear button is hidden when `:placeholder-shown`** — i.e., empty input. You don't toggle a class.
- **Render `tl-dropdown__option--no-result` as the only `<li>`** when filtering yields nothing. The wrapper does this for single-select only (multi-select keeps the picked items visible).
- **Variant + size are required.**
- **`onChange` returns `string | string[]`** depending on `multiselect`. Type-narrow at the call site.
