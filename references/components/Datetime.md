# Datetime

A wrapper around the native `<input type="date|datetime-local|time|month|week">` that gives it Tegel's typography, sizing, focus styling and an inline calendar/clock icon. The icon swaps between calendar and clock based on input type.

**Root class:** `tl-datetime`
**Compound:** yes
**Theme-aware:** yes (Scania bottom-bar / Traton outline differ via brand class on `<html>`)
**CSS file:** `tl-datetime.css` (in `components.css` bundle)

## Markup

```html
<div class="tl-datetime tl-datetime--primary tl-datetime--lg">
  <label class="tl-datetime__label" for="dob">Date of birth</label>
  <div class="tl-datetime__wrapper">
    <input class="tl-datetime__input" id="dob" type="date" />
  </div>
  <div class="tl-datetime__helper">Optional helper text</div>
</div>
```

The `__wrapper` is **mandatory** — the calendar/clock icon and disabled cursor are positioned via `tl-datetime__wrapper::after`. Inputs of type `time` automatically get a clock icon instead of calendar.

## Modifiers

### Variant (one required)

| Class | Effect |
|---|---|
| `tl-datetime--primary` | Layer-01 background |
| `tl-datetime--secondary` | Layer-02 background |

### Size (one required)

| Class | Effect |
|---|---|
| `tl-datetime--lg` | 56px tall |
| `tl-datetime--md` | 48px tall |
| `tl-datetime--sm` | 40px tall (no inside-label support — label is hidden) |

### State (optional)

| Class | Effect |
|---|---|
| `tl-datetime--error` | Red border + error icon prefix on `.tl-datetime__helper` |

### Optional

| Class | Effect |
|---|---|
| `tl-datetime--label-inside` | Floating-label pattern (uses `tl-datetime__label-inside` element) |
| `tl-datetime--label-outside` | Default label position (the wrapper applies this when `labelPosition='outside'` — purely informational) |
| `tl-datetime--no-min-width` | Removes the 208px `min-width` |

## Sub-elements (compound)

| Class | Where it goes | Notes |
|---|---|---|
| `tl-datetime__label` | inside root, above `__wrapper` | Outside label. Pair with `for="…"` matching input's `id` |
| `tl-datetime__wrapper` | inside root | **Required.** Contains the input and provides positioning context for the icon |
| `tl-datetime__input` | inside `__wrapper` | Native `<input type="date|datetime-local|time|month|week">` |
| `tl-datetime__label-inside` | inside `__wrapper` | Floating label (used only when root has `--label-inside`) |
| `tl-datetime__helper` | inside root, below `__wrapper` | Helper / error text. Auto-prepends an error icon when root has `--error` |

## States

Driven by native pseudo-classes on `.tl-datetime__input`:

| State | How |
|---|---|
| Hover | `:hover` on root + input box-shadow change |
| Focus | `:focus` on input → accent box-shadow |
| Disabled | `:disabled` on input → desaturated, cursor not-allowed; icon goes grey too |
| Error icon color | `--error` on root → calendar/clock icon turns red |

## Tokens consumed

- `--datetime-background` (resolves to `--color-background-layer-01` / `layer-02`)
- `--datetime-text`, `--datetime-placeholder`, `--datetime-label`, `--datetime-label-inside`
- `--datetime-icon`, `--datetime-icon-error`, `--datetime-icon-disabled`
- `--datetime-helper`, `--datetime-helper-error`
- `--datetime-box-shadow*` (hover / focus / error variants)
- `--datetime-border*` (per-side colors for Traton outline)
- `--datetime-border-radius` (Scania top-only, Traton full)
- Typography: `--detail-02-*` (input), `--detail-05-*` (label/helper), `--detail-07-*` (floated label)

## Examples

### Plain HTML

```html
<!-- Date with outside label -->
<div class="tl-datetime tl-datetime--primary tl-datetime--lg">
  <label class="tl-datetime__label" for="dob">Date of birth</label>
  <div class="tl-datetime__wrapper">
    <input class="tl-datetime__input" id="dob" type="date" />
  </div>
</div>

<!-- Time input (auto-uses clock icon) -->
<div class="tl-datetime tl-datetime--primary tl-datetime--md">
  <label class="tl-datetime__label" for="start">Start time</label>
  <div class="tl-datetime__wrapper">
    <input class="tl-datetime__input" id="start" type="time" />
  </div>
</div>

<!-- Floating label, datetime-local -->
<div class="tl-datetime tl-datetime--primary tl-datetime--lg tl-datetime--label-inside">
  <div class="tl-datetime__wrapper">
    <input class="tl-datetime__input" id="meet" type="datetime-local" />
    <label class="tl-datetime__label-inside" for="meet">Meeting</label>
  </div>
</div>

<!-- Error -->
<div class="tl-datetime tl-datetime--primary tl-datetime--lg tl-datetime--error">
  <label class="tl-datetime__label" for="due">Due date</label>
  <div class="tl-datetime__wrapper">
    <input class="tl-datetime__input" id="due" type="date" />
  </div>
  <div class="tl-datetime__helper">Date must be in the future</div>
</div>
```

### React binding (this project)

```tsx
import Datetime from '@/src/tegel-components/Datetime'

<Datetime id="dob" label="Date of birth" type="date" />
<Datetime id="meet" label="Meeting" type="datetime-local" labelPosition="inside" size="md" />
```

Props: `id` (required), `label`, `labelPosition` (`'outside' | 'inside' | 'none'`), `type` (`'date' | 'datetime-local' | 'time' | 'month' | 'week'`, default `'date'`), `size`, `variant`, `state`, `helper`, `disabled`, `value`, `onChange` (returns `string`), `className`.

## Rules

- **`tl-datetime__wrapper` is required.** It hosts the icon `::after` pseudo-element and the inside label; without it, no calendar icon will render.
- **Inside label uses `tl-datetime__label-inside`**, NOT `tl-datetime__label`. The two classes are distinct, unlike TextField/Textarea/Dropdown which reuse the same label class.
- **Small size doesn't support inside label** — `.tl-datetime--sm .tl-datetime__label-inside { display: none }`.
- **Native picker UI is browser-controlled.** WebKit's calendar/spin button indicator is hidden via `opacity: 0`; Firefox shows its own picker (the custom Tegel icon hides under `@supports (-moz-appearance: none)`).
- **`onChange` in the React wrapper returns the string value**, not a React event.
- **Variant + size are required.**
