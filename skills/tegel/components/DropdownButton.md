# DropdownButton

A custom (non-native) dropdown that uses a `<button>` as the trigger and a `<ul>` listbox below. Supports single- and multi-select. Same root and styling as Dropdown — they share `tl-dropdown.css` — but with `tl-dropdown__button` + `tl-dropdown__text` + `tl-dropdown__list` + `tl-dropdown__option` instead of a native `<select>`.

**Root class:** `tl-dropdown` (yes — same root as `Dropdown`)
**Compound:** yes
**Theme-aware:** yes (Scania bottom-bar / Traton outline differ via brand class on `<html>`)
**CSS file:** `tl-dropdown.css` (in `components.css` bundle). Shared with Dropdown and DropdownFilter

## Markup

```html
<div class="tl-dropdown tl-dropdown--primary tl-dropdown--lg">
  <label class="tl-dropdown__label" for="role">Role</label>
  <button class="tl-dropdown__button" id="role" type="button" aria-expanded="false">
    <span class="tl-dropdown__text" data-placeholder="Select…"></span>
  </button>
  <ul class="tl-dropdown__list" role="listbox">
    <li class="tl-dropdown__option" role="option" tabindex="0">Admin</li>
    <li class="tl-dropdown__option tl-dropdown__option--selected" role="option" tabindex="0">User</li>
    <li class="tl-dropdown__option tl-dropdown__option--disabled" role="option" tabindex="-1">Locked</li>
  </ul>
  <div class="tl-dropdown__helper">Helper text</div>
</div>
```

The list is shown when the button has `aria-expanded="true"` — the open/close state is JS-managed; the CSS uses `:has(.tl-dropdown__button[aria-expanded=true]) .tl-dropdown__list` to drive the transition.

## Modifiers

Root modifiers are identical to `Dropdown`:

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
| `tl-dropdown__option--selected` | Highlight + tick icon (or check the inner checkbox in multi-select) |
| `tl-dropdown__option--disabled` | Faded, cursor not-allowed, `tabindex="-1"` |
| `tl-dropdown__option--no-result` | "No matches" placeholder row (DropdownFilter) |

## Sub-elements (compound)

| Class | Where it goes | Notes |
|---|---|---|
| `tl-dropdown__label` | inside root | Pair with `for="…"` matching button's `id` |
| `tl-dropdown__button` | inside root | The trigger. Toggle `aria-expanded` to open/close the list |
| `tl-dropdown__text` | inside `__button` | Holds selected label. `data-placeholder` shows when empty |
| `tl-dropdown__list` | inside root | `<ul role="listbox">`. Anchored absolute below the button |
| `tl-dropdown__option` | inside `__list` | `<li role="option">`. For multi-select, contains a `tl-checkbox` |
| `tl-dropdown__helper` | inside root | Helper / error text |

## States

| State | How |
|---|---|
| Hover (button) | `:hover` → border-hover box-shadow |
| Focus (button) | `:focus-visible` → accent box-shadow |
| Open | `[aria-expanded=true]` on the button → list visible, chevron rotated 180° |
| Hover (option) | `.tl-dropdown__option:hover` → highlighted background |
| Selected option | `--selected` modifier → background tint + tick icon (inserted via `::after`) |
| Disabled (button) | `:disabled` on button → desaturated, cursor not-allowed |

## Tokens consumed

Same as Dropdown:

- `--dropdown-background`, `--dropdown-text`, `--dropdown-placeholder`, `--dropdown-disabled`
- `--dropdown-icon`, `--dropdown-error`, `--dropdown-error-focus`
- `--dropdown-helper-text`
- `--dropdown-border*` (default / hover / focus / active / error)
- `--dropdown-option-background`, `--dropdown-option-background-hover`, `--dropdown-option-background-selected`, `--dropdown-option-border`
- Typography: `--detail-02-*`, `--detail-05-*`

## Examples

### Plain HTML

```html
<div class="tl-dropdown tl-dropdown--primary tl-dropdown--lg">
  <label class="tl-dropdown__label" for="role">Role</label>
  <button class="tl-dropdown__button" id="role" type="button" aria-expanded="false">
    <span class="tl-dropdown__text" data-placeholder="Select an option"></span>
  </button>
  <ul class="tl-dropdown__list" role="listbox">
    <li class="tl-dropdown__option" role="option" tabindex="0">Admin</li>
    <li class="tl-dropdown__option" role="option" tabindex="0">User</li>
    <li class="tl-dropdown__option tl-dropdown__option--disabled" role="option" tabindex="-1">Locked</li>
  </ul>
</div>

<!-- Multi-select: each option contains a tl-checkbox -->
<div class="tl-dropdown tl-dropdown--primary tl-dropdown--lg">
  <label class="tl-dropdown__label" for="tags">Tags</label>
  <button class="tl-dropdown__button" id="tags" type="button" aria-expanded="false">
    <span class="tl-dropdown__text" data-placeholder="Pick tags"></span>
  </button>
  <ul class="tl-dropdown__list" role="listbox" aria-multiselectable="true">
    <li class="tl-dropdown__option tl-dropdown__option--selected" role="option" tabindex="0">
      <div class="tl-checkbox">
        <input class="tl-checkbox__input" id="t-a" type="checkbox" checked tabindex="-1">
        <label class="tl-checkbox__label" for="t-a">Alpha</label>
      </div>
    </li>
    <li class="tl-dropdown__option" role="option" tabindex="0">
      <div class="tl-checkbox">
        <input class="tl-checkbox__input" id="t-b" type="checkbox" tabindex="-1">
        <label class="tl-checkbox__label" for="t-b">Beta</label>
      </div>
    </li>
  </ul>
</div>
```

### React binding (this project)

```tsx
import DropdownButton from '@/src/tegel-components/DropdownButton'

// Single
<DropdownButton id="role" label="Role" options={roles} onChange={(v) => setRole(v as string)} />

// Multi
<DropdownButton id="tags" label="Tags" multiselect options={tags} onChange={(v) => setTags(v as string[])} />
```

Props: `id`, `label`, `labelPosition`, `options` (required `{value,label,disabled?}[]`), `placeholder` (default `'Select an option'`), `size`, `variant`, `state`, `helper`, `disabled`, `multiselect`, `onChange` (returns `string` for single, `string[]` for multi), `className`. Manages its own open/close state and closes on click-outside.

## Rules

- **Drive the list visibility via `aria-expanded` on the button** — the CSS reacts to it, you don't add an `--open` modifier.
- **`tl-dropdown__text:empty::before` shows `data-placeholder`** as the placeholder string.
- **For multi-select**, render a `.tl-checkbox` inside each `.tl-dropdown__option`; the `.tl-dropdown__option--selected` class on the `<li>` is what flips the inner check.
- **Tick icon is auto-rendered** on `.tl-dropdown__option--selected:not(:has(.tl-checkbox))::after` — don't add your own.
- **Variant + size are required.**
- **`onChange` returns `string | string[]`** depending on `multiselect`. Type-narrow at the call site.
