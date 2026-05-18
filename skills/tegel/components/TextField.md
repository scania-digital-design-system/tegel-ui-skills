# TextField

A single-line text input with optional inline/outside label, helper text, character counter, prefix/suffix slot (icon or text), and validation states. The wrapper element holds the size/variant/state, and the input itself carries the typography and focus styling via inset box-shadow.

**Root class:** `tl-text-field`
**Compound:** yes
**Theme-aware:** yes (Scania underline / Traton outline differ via brand class on `<html>`)
**CSS file:** `tl-text-field.css` (in `components.css` bundle)

## Markup

```html
<div class="tl-text-field tl-text-field--primary tl-text-field--lg">
  <label class="tl-text-field__label" for="name">Full name</label>
  <input class="tl-text-field__input" id="name" type="text" placeholder="Enter your name" />

  <!-- Optional prefix/suffix (icon OR text on each side, not both) -->
  <span class="tl-icon tl-icon--search tl-icon--20 tl-text-field__prefix--icon" aria-hidden="true"></span>
  <span class="tl-text-field__suffix--text">.com</span>

  <!-- Optional bottom row: helper text + character counter -->
  <div class="tl-text-field__bottom">
    <span class="tl-text-field__helper">Helper text</span>
    <span class="tl-text-field__charcounter">
      0<span class="tl-text-field__charcounter-divider">/</span>50
    </span>
  </div>
</div>
```

## Modifiers

### Variant (one required)

| Class | Effect |
|---|---|
| `tl-text-field--primary` | Layer-01 background |
| `tl-text-field--secondary` | Layer-02 background (use on a primary surface) |

### Size (one required)

| Class | Effect |
|---|---|
| `tl-text-field--lg` | 56px tall (default) |
| `tl-text-field--md` | 48px tall |
| `tl-text-field--sm` | 40px tall |

### State (optional, mutually exclusive)

| Class | Effect |
|---|---|
| `tl-text-field--error` | Red border + error icon prefix on `.tl-text-field__helper` |
| `tl-text-field--success` | Strong border (no icon) |

### Optional

| Class | Effect |
|---|---|
| `tl-text-field--label-inside` | Floating-label pattern. Label sits inside, animates up on focus / non-empty |
| `tl-text-field--no-min-width` | Removes the 208px `min-width` |
| `tl-text-field--hide-readonly-icon` | Hides the auto-rendered "edit_inactive" icon when input is `readonly` |

## Sub-elements (compound)

| Class | Where it goes | Notes |
|---|---|---|
| `tl-text-field__label` | inside root | Floats inside when `--label-inside` |
| `tl-text-field__input` | inside root | Apply native `disabled` / `readonly` here |
| `tl-text-field__prefix--icon` | inside root | Pair with `tl-icon tl-icon--{name} tl-icon--20` |
| `tl-text-field__prefix--text` | inside root | Plain text affix (e.g. `https://`) |
| `tl-text-field__suffix--icon` | inside root | Trailing icon affix |
| `tl-text-field__suffix--text` | inside root | Trailing text affix |
| `tl-text-field__bottom` | inside root | Container for helper + charcounter (flex row) |
| `tl-text-field__helper` | inside `__bottom` | Helper / error message |
| `tl-text-field__charcounter` | inside `__bottom` | Right-aligned counter |
| `tl-text-field__charcounter-divider` | inside `__charcounter` | The `/` between current and max |

## States

State styling is driven by native input pseudo-classes — no extra classes needed:

| State | How |
|---|---|
| Hover | `:hover` on root → `:not(:focus):not(:disabled)` input box-shadow |
| Focus | `:focus` on input → 2px accent box-shadow |
| Disabled | `:disabled` on input → cursor not-allowed, desaturated text |
| Read-only | `[readonly]` on input → renders edit-inactive icon at right (unless `--hide-readonly-icon`) |

## Tokens consumed

- `--text-field-background` (resolves to `--color-background-layer-01` / `layer-02`)
- `--text-field-text`, `--text-field-placeholder`, `--text-field-label`, `--text-field-affix`
- `--text-field-helper`, `--text-field-error`, `--text-field-textcounter`
- `--text-field-box-shadow*` (hover / focus / error / success variants)
- `--text-field-border-radius` (Scania top-radius only, Traton all-four)
- Typography: `--detail-02-*` (input), `--detail-05-*` (label/helper), `--detail-07-*` (floated label)

## Examples

### Plain HTML

```html
<!-- Basic with outside label -->
<div class="tl-text-field tl-text-field--primary tl-text-field--lg">
  <label class="tl-text-field__label" for="name">Full name</label>
  <input class="tl-text-field__input" id="name" type="text" placeholder="Jane Doe" />
</div>

<!-- Floating label, with helper + counter -->
<div class="tl-text-field tl-text-field--primary tl-text-field--md tl-text-field--label-inside">
  <label class="tl-text-field__label" for="bio">Short bio</label>
  <input class="tl-text-field__input" id="bio" type="text" placeholder=" " maxlength="50" />
  <div class="tl-text-field__bottom">
    <span class="tl-text-field__helper">Up to 50 characters</span>
    <span class="tl-text-field__charcounter">12<span class="tl-text-field__charcounter-divider">/</span>50</span>
  </div>
</div>

<!-- Error state with prefix icon -->
<div class="tl-text-field tl-text-field--primary tl-text-field--lg tl-text-field--error">
  <label class="tl-text-field__label" for="email">Email</label>
  <input class="tl-text-field__input" id="email" type="email" />
  <span class="tl-icon tl-icon--email tl-icon--20 tl-text-field__prefix--icon" aria-hidden="true"></span>
  <div class="tl-text-field__bottom">
    <span class="tl-text-field__helper">Invalid email address</span>
  </div>
</div>

<!-- Text prefix + suffix -->
<div class="tl-text-field tl-text-field--primary tl-text-field--lg">
  <label class="tl-text-field__label" for="url">Website</label>
  <input class="tl-text-field__input" id="url" type="text" />
  <span class="tl-text-field__prefix--text">https://</span>
  <span class="tl-text-field__suffix--text">.com</span>
</div>
```

### React binding (this project)

```tsx
import TextField from '@/src/tegel-components/TextField'

<TextField id="name" label="Full name" placeholder="Jane Doe" />
<TextField id="email" label="Email" state="error" helper="Invalid email" prefixIcon="email" />
<TextField id="url" label="Website" prefixText="https://" suffixText=".com" />
```

Props: `id` (required), `label`, `labelPosition`, `type`, `placeholder`, `helper`, `size`, `variant`, `state`, `prefixIcon`/`prefixText`, `suffixIcon`/`suffixText`, `maxLength`, `disabled`, `readOnly`, `defaultValue`, `onChange` (returns `string`, not the event).

## Rules

- **Always supply `--{variant}` and `--{size}`** — no defaults at the CSS layer.
- **Floating label requires a non-empty placeholder.** The CSS detects `:placeholder-shown` to decide whether the label is floated; pass `placeholder=" "` (a single space) when using `tl-text-field--label-inside` so the label can animate up. The React wrapper does this automatically.
- **Affixes are mutually exclusive per side.** Use `__prefix--icon` OR `__prefix--text`, not both. Same for suffix.
- **Read-only icon** is rendered automatically via `::before` pseudo-element. Add `tl-text-field--hide-readonly-icon` to suppress.
- **`onChange` in the React wrapper returns the string value**, not the React event.
- **Disabled vs. readonly**: use the native HTML attributes — there is no `--disabled` modifier class.
