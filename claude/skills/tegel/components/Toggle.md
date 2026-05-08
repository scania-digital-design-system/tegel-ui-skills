# Toggle

An on/off switch. The visible track + knob is a styled native `<input type="checkbox">` (NOT a radio) — both shapes are drawn via `::before` (track) and `::after` (knob) pseudo-elements. Comes in two sizes; supports an optional bold "headline" above the row and a label next to the switch.

**Root class:** `tl-toggle`
**Compound:** yes (headline + input + label, all flat children)
**Theme-aware:** no directly — but the off/on/disabled colors of the track and knob can be overridden globally on dark surfaces (see Rules)
**CSS file:** `tl-toggle.css` (in `components.css` bundle)

## Markup

```html
<div class="tl-toggle">
  <div class="tl-toggle__headline">Notifications</div>
  <label>
    <input class="tl-toggle__input" type="checkbox" />
    <span class="tl-toggle__label">Enable email alerts</span>
  </label>
</div>
```

The wrapping `<label>` makes both the switch and the text clickable; placing the `<input>` and `.tl-toggle__label` as siblings inside it is what `input[type=checkbox]:disabled ~ .tl-toggle__label` selectors rely on.

## Modifiers

The root has no modifiers. Sizing is on the input element:

| Class | Where | Effect |
|---|---|---|
| `tl-toggle__input--sm` | on `<input>` | Small variant (28×16 track, 8×8 knob). Default is the unmodified large 44×24 / 16×16 |

## Sub-elements (compound)

| Class | Where it goes | Notes |
|---|---|---|
| `tl-toggle__headline` | direct child of root | Bold caption above the toggle row (optional) |
| `tl-toggle__input` | inside `<label>` inside root | Native `<input type="checkbox">` |
| `tl-toggle__label` | sibling of `__input`, inside `<label>` | Text next to the switch (optional) |

## States

Driven by native pseudo-classes on `.tl-toggle__input`:

| State | How |
|---|---|
| Hover | `:hover::before` |
| Focus | `:focus-visible` → 2px focus outline + 1px white box-shadow |
| Checked | `:checked::before` flips track to success-green; `:checked::after` slides knob right |
| Disabled | `:disabled` → grey track + grey knob, cursor not-allowed; `:disabled ~ .tl-toggle__label` greys out |

## Tokens consumed

- `--toggle-switch` — knob color (defaults to brand-neutral white)
- `--toggle-text` — headline / label color
- `--toggle-disabled` — track + label color when disabled
- `--toggle-background-on` — track color when checked (defaults to `--color-system-success-default` — green)
- `--toggle-background-off` — track color when off
- `--toggle-border-focus` — focus outline color
- Motion: `--tds-motion-duration-moderate-01`, `--tds-motion-easing-scania`
- Typography: `--detail-02-*`

## Examples

### Plain HTML

```html
<!-- Basic toggle with label only -->
<div class="tl-toggle">
  <label>
    <input class="tl-toggle__input" type="checkbox" checked />
    <span class="tl-toggle__label">Dark mode</span>
  </label>
</div>

<!-- Headline + small toggle -->
<div class="tl-toggle">
  <div class="tl-toggle__headline">Notifications</div>
  <label>
    <input class="tl-toggle__input tl-toggle__input--sm" type="checkbox" />
    <span class="tl-toggle__label">Enable email alerts</span>
  </label>
</div>

<!-- Disabled -->
<div class="tl-toggle">
  <label>
    <input class="tl-toggle__input" type="checkbox" disabled checked />
    <span class="tl-toggle__label">Locked option</span>
  </label>
</div>
```

### React binding (this project)

```tsx
import Toggle from '@/src/tegel-components/Toggle'

<Toggle label="Dark mode" checked={isDarkMode} onChange={(e) => setDarkMode(e.target.checked)} />
<Toggle size="sm" headline="Notifications" label="Enable email alerts" />
```

Props: `size` (`'sm' | 'lg'`, default `'lg'`), `headline`, `label`, `className`, plus all native `InputHTMLAttributes<HTMLInputElement>` (passed through to the `<input>`) — `checked`, `defaultChecked`, `onChange`, `disabled`, etc.

## Rules

- **The input is a checkbox**, not a radio — pass standard checkbox props (`checked`, `onChange`, `disabled`).
- **Use the wrapping `<label>` pattern.** The CSS sibling selectors (`input ~ .tl-toggle__label`) and the disabled-bubbling depend on `__input` and `__label` being siblings inside an outer `<label>`. Don't move the label outside.
- **`size` prop on the wrapper** is the visual size — it does NOT correspond to the native HTML `size` attribute (which is `Omit`-ed from the React type).
- **Dark-surface override:** when placing a Toggle on a dark filled card, the default `--toggle-background-off` may be too low-contrast. Override the four toggle color tokens on a parent class — the design system docs (`tegel-lite-setup.md`) call out this pattern.
- **Don't free-base track/knob colors** — override the `--toggle-*` variables instead.
