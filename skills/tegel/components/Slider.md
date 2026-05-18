# Slider

A horizontal range slider with a thumb, fill track, optional tick markers, optional value tooltip on the thumb, and optional ±controls or a numeric input + min/max labels. Composed of many small sub-elements; the thumb position and the fill width are driven inline (`left`, `width`) by the host code, while everything else is plain CSS.

**Root class:** `tl-slider`
**Compound:** yes (many sub-elements)
**Theme-aware:** no
**CSS file:** `tl-slider.css` (in `components.css` bundle)

## Markup

```html
<div class="tl-slider">
  <label class="tl-slider__label">Volume</label>

  <!-- Hidden native input for accessibility / form value -->
  <input class="tl-slider__native-input" type="range" min="0" max="100" step="1" value="50" />

  <div class="tl-slider__track-wrapper">
    <div class="tl-slider__track">
      <!-- Optional tick dividers -->
      <div class="tl-slider__value-dividers">
        <div class="tl-slider__value-divider">
          <span class="tl-slider__value-divider-label">0</span>
          <div class="tl-slider__value-divider-line"></div>
        </div>
        <!-- …more dividers… -->
      </div>

      <!-- Filled portion (inline width) -->
      <div class="tl-slider__track-fill" style="width: 50%"></div>

      <!-- Thumb (inline left) -->
      <div class="tl-slider__thumb" style="left: 50%">
        <div class="tl-slider__thumb-inner" tabindex="-1">
          <!-- Optional tooltip showing current value -->
          <div class="tl-slider__value-tooltip">50</div>
        </div>
      </div>
    </div>
  </div>
</div>
```

## Modifiers

| Class | Effect |
|---|---|
| `tl-slider--small` | Smaller track + smaller thumb (16×16 inner, 8×8 pressed=20×20) |

Thumb-inner state modifier:

| Class | Where | Effect |
|---|---|---|
| `tl-slider__thumb-inner--pressed` | on `.tl-slider__thumb-inner` | Visually enlarges thumb while dragging |

## Sub-elements (compound)

| Class | Where it goes | Notes |
|---|---|---|
| `tl-slider__label` | direct child of root | Caption above the track |
| `tl-slider__native-input` | direct child of root | `<input type="range">`. Hidden via `display: none` — used for form value / a11y only |
| `tl-slider__track-wrapper` | direct child of root | Flex row that holds optional ±controls / inputs and the track |
| `tl-slider__track` | inside `__track-wrapper` | The actual interactive track (host code handles click/drag) |
| `tl-slider__track-fill` | inside `__track` | The filled portion. **Width set inline** (e.g. `style="width: 60%"`) |
| `tl-slider__thumb` | inside `__track` | The draggable handle. **Left set inline** (e.g. `style="left: 60%"`) |
| `tl-slider__thumb-inner` | inside `__thumb` | The visible round dot. Add `--pressed` while dragging |
| `tl-slider__value-tooltip` | inside `__thumb-inner` | Optional pill above thumb showing current value |
| `tl-slider__value-dividers` | inside `__track` | Container for tick marks |
| `tl-slider__value-divider` | inside `__value-dividers` | Single tick |
| `tl-slider__value-divider-label` | inside `__value-divider` | Tick label (text above the line) |
| `tl-slider__value-divider-line` | inside `__value-divider` | The vertical line itself |
| `tl-slider__control-minus` / `tl-slider__control-plus` | inside `__track-wrapper` | ± step buttons (use a `tl-button` here) |
| `tl-slider__value` | inside `__track-wrapper` | Min/Max value labels (modifiers `--min`, `--max`) |
| `tl-slider__input-wrapper` | inside `__track-wrapper` | Numeric input cell (uses `tl-text-field` styles internally) |
| `tl-slider__input-field` | inside `__input-wrapper` | The actual `<input type="number">` |

## States

| State | How |
|---|---|
| Hover (track) | `:hover` shows tooltip via `.tl-slider__thumb:hover .tl-slider__value-tooltip` |
| Focus (track) | `:focus`, `:focus-within` on `__track` styles the inner thumb |
| Pressed | `.tl-slider__thumb-inner--pressed` modifier (apply on mousedown, remove on mouseup) |
| Read-only | `:has(input[type=range][readonly])` → blocks pointer events |
| Disabled | `:disabled` on the native range input → all sub-elements grey (track-fill, thumb, dividers) |

## Tokens consumed

- `--slider-label`, `--slider-thumb`, `--slider-track`, `--slider-track-fill`
- `--slider-divider`, `--slider-divider-values`
- `--slider-input-focused`, `--slider-input-value`
- `--slider-disabled`, `--slider-disabled-text`
- `--slider-value-tooltip-background`, `--slider-value-tooltip`
- `--slider-border-radius` (Scania top-only, Traton full)
- `--slider-input-width` (default 56px, override per use)
- Typography: `--detail-01-*` (tooltip), `--detail-02-*` (input/value), `--detail-05-*` (label/divider-label)

## Examples

### Plain HTML

```html
<!-- Basic 0–100 slider with tooltip on thumb -->
<div class="tl-slider">
  <label class="tl-slider__label">Volume</label>
  <input class="tl-slider__native-input" type="range" min="0" max="100" step="1" value="50">
  <div class="tl-slider__track-wrapper">
    <div class="tl-slider__track">
      <div class="tl-slider__track-fill" style="width: 50%"></div>
      <div class="tl-slider__thumb" style="left: 50%">
        <div class="tl-slider__thumb-inner">
          <div class="tl-slider__value-tooltip">50</div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- With tick dividers + labels -->
<div class="tl-slider">
  <label class="tl-slider__label">Quality</label>
  <input class="tl-slider__native-input" type="range" min="0" max="10" step="1" value="5">
  <div class="tl-slider__track-wrapper">
    <div class="tl-slider__track">
      <div class="tl-slider__value-dividers">
        <div class="tl-slider__value-divider"><span class="tl-slider__value-divider-label">0</span><div class="tl-slider__value-divider-line"></div></div>
        <div class="tl-slider__value-divider"><span class="tl-slider__value-divider-label">5</span><div class="tl-slider__value-divider-line"></div></div>
        <div class="tl-slider__value-divider"><span class="tl-slider__value-divider-label">10</span><div class="tl-slider__value-divider-line"></div></div>
      </div>
      <div class="tl-slider__track-fill" style="width: 50%"></div>
      <div class="tl-slider__thumb" style="left: 50%">
        <div class="tl-slider__thumb-inner"></div>
      </div>
    </div>
  </div>
</div>

<!-- Small slider with min/max labels and a numeric input -->
<div class="tl-slider tl-slider--small">
  <input class="tl-slider__native-input" type="range" min="0" max="100" value="25">
  <div class="tl-slider__track-wrapper">
    <span class="tl-slider__value tl-slider__value--min">0</span>
    <div class="tl-slider__track">
      <div class="tl-slider__track-fill" style="width: 25%"></div>
      <div class="tl-slider__thumb" style="left: 25%">
        <div class="tl-slider__thumb-inner"></div>
      </div>
    </div>
    <span class="tl-slider__value tl-slider__value--max">100</span>
    <div class="tl-slider__input-wrapper">
      <input class="tl-slider__input-field" type="number" min="0" max="100" value="25">
    </div>
  </div>
</div>
```

### React binding (this project)

```tsx
import Slider from '@/src/tegel-components/Slider'

// Basic
<Slider label="Volume" min={0} max={100} step={1} defaultValue={50} />

// With ticks + tooltip
<Slider min={0} max={10} step={0.5} showTicks numTicks={5} showTickNumbers showTooltip />

// With number input + min/max labels
<Slider min={0} max={100} showInput />
```

Props: `min`, `max`, `step`, `defaultValue`, `label`, `showTicks`, `numTicks`, `showTickNumbers`, `showTooltip`, `showControls` (renders ± `Button`s), `showInput`, `small`, `disabled`, `readOnly`, `onChange` (returns `number`). The wrapper handles dragging, snapping to `step`, clamping to `min/max`, and decimal precision.

## Rules

- **Position is host-controlled.** The CSS does NOT compute thumb position from the native range value. You must set `style="left: X%"` on `.tl-slider__thumb` and `style="width: X%"` on `.tl-slider__track-fill`. The React wrapper does this.
- **The native `<input type="range">` is hidden** (`display: none`) — it exists for form submission and screen readers, not visuals. Pointer interaction is wired up by JS to the `__track` element.
- **Tooltip visibility:** the tooltip's box exists in DOM only when you choose to render it. CSS reveals it on `__thumb:hover`, but the wrapper renders the inner `__value-tooltip` element only when `showTooltip` is true.
- **`showControls` and `showInput` are mutually exclusive in the wrapper** — `showInput` wins and hides the ± buttons. Tick numbers are also suppressed when `showInput` is set.
- **`tl-slider--small`** is the only size modifier. Default thumb is 20×20; small is 16×16.
- **`onChange` in the React wrapper returns a number**, not a string or event.
