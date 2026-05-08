# Textarea

A multi-line text input. Same shape as TextField but with a `<textarea>`, no size variants (height is driven by `rows`), and no prefix/suffix slots. Supports floating label, helper, character counter, and error/success states.

**Root class:** `tl-textarea`
**Compound:** yes
**Theme-aware:** yes (Scania bottom-bar / Traton outline differ via brand class on `<html>`)
**CSS file:** `tl-textarea.css` (in `components.css` bundle)

## Markup

```html
<div class="tl-textarea tl-textarea--primary">
  <label class="tl-textarea__label" for="notes">Notes</label>
  <textarea class="tl-textarea__input" id="notes" rows="5" placeholder="Type something..."></textarea>

  <!-- Optional bottom row -->
  <div class="tl-textarea__bottom">
    <div class="tl-textarea__helper">Helper text</div>
    <span class="tl-textarea__charcounter">
      0<span class="tl-textarea__charcounter-divider">/</span>500
    </span>
  </div>
</div>
```

## Modifiers

### Variant (one required)

| Class | Effect |
|---|---|
| `tl-textarea--primary` | Layer-01 background |
| `tl-textarea--secondary` | Layer-02 background |

### State (optional)

| Class | Effect |
|---|---|
| `tl-textarea--error` | Red border + error icon prefix on `.tl-textarea__helper` |
| `tl-textarea--success` | Strong border (no icon) |

### Optional

| Class | Effect |
|---|---|
| `tl-textarea--label-inside` | Floating-label pattern |
| `tl-textarea--no-min-width` | Removes the 208px `min-width` |
| `tl-textarea--hide-readonly-icon` | Hides the auto-rendered read-only edit icon |

## Sub-elements (compound)

| Class | Where it goes | Notes |
|---|---|---|
| `tl-textarea__label` | inside root | Floats inside when `--label-inside` |
| `tl-textarea__input` | inside root | Use the `<textarea>` element. Size via `rows` attribute |
| `tl-textarea__bottom` | inside root | Flex row; container for helper + charcounter |
| `tl-textarea__helper` | inside `__bottom` | Helper / error message |
| `tl-textarea__charcounter` | inside `__bottom` | Right-aligned counter |
| `tl-textarea__charcounter-divider` | inside `__charcounter` | The `/` between current and max |

## States

| State | How |
|---|---|
| Hover | `:hover` on root + `__input:not(:focus):not(:disabled)` |
| Focus | `:focus` on input → accent box-shadow |
| Disabled | `:disabled` on textarea → desaturated, cursor not-allowed |
| Read-only | `[readonly]` on textarea → edit-inactive icon at top-right |

## Tokens consumed

- `--textarea-background` (resolves to `--color-background-layer-01` / `layer-02`)
- `--textarea-text`, `--textarea-placeholder`, `--textarea-label`
- `--textarea-helper`, `--textarea-error`, `--textarea-textcounter`, `--textarea-resize-icon`
- `--textarea-box-shadow*` (hover / focus / error / success variants)
- `--textarea-border-radius` (Scania top-only, Traton full)
- Typography: `--detail-02-*` (input), `--detail-05-*` (label/helper), `--detail-07-*` (floated label)

## Examples

### Plain HTML

```html
<!-- Basic with outside label -->
<div class="tl-textarea tl-textarea--primary">
  <label class="tl-textarea__label" for="desc">Description</label>
  <textarea class="tl-textarea__input" id="desc" rows="5"></textarea>
</div>

<!-- Floating label, success, with character counter -->
<div class="tl-textarea tl-textarea--primary tl-textarea--success tl-textarea--label-inside">
  <label class="tl-textarea__label" for="notes">Notes</label>
  <textarea class="tl-textarea__input" id="notes" rows="5" placeholder=" " maxlength="500"></textarea>
  <div class="tl-textarea__bottom">
    <div class="tl-textarea__helper">Saved</div>
    <span class="tl-textarea__charcounter">12<span class="tl-textarea__charcounter-divider">/</span>500</span>
  </div>
</div>

<!-- Error -->
<div class="tl-textarea tl-textarea--primary tl-textarea--error">
  <label class="tl-textarea__label" for="reason">Reason</label>
  <textarea class="tl-textarea__input" id="reason" rows="3"></textarea>
  <div class="tl-textarea__bottom">
    <div class="tl-textarea__helper">Required field</div>
  </div>
</div>
```

### React binding (this project)

```tsx
import Textarea from '@/src/tegel-components/Textarea'

<Textarea id="desc" label="Description" rows={5} />
<Textarea id="notes" label="Notes" state="success" helper="Saved" maxLength={500} />
```

Props: `id` (required), `label`, `labelPosition`, `placeholder`, `helper`, `rows`, `variant`, `state`, `maxLength`, `disabled`, `readOnly`, `defaultValue`, `onChange` (returns `string`).

## Rules

- **Variant is required**, but there is no `--{size}` modifier — height is controlled by the `rows` attribute on the `<textarea>`.
- **Floating label needs a placeholder.** Pass `placeholder=" "` (a single space) so `:placeholder-shown` can flip; the React wrapper handles this automatically.
- **No prefix/suffix slots** — unlike TextField, Textarea has no affix sub-elements.
- **Resize handle is restyled** via a `::after` pseudo-element with a custom SVG; the native WebKit resizer is hidden.
- **`onChange` in the React wrapper returns the string value**, not the React event.
