# Stepper

A horizontal or vertical progress indicator for multi-step flows. Each step is a labelled circular node ("the bullet") connected by a 1px divider line. Steps carry one of four states — `success`, `error`, `current`, or `upcoming` — which control the bullet's colour and content (number for current/upcoming, tick/warning icon for success/error).

**Root class:** `tl-stepper`
**Compound:** yes
**Theme-aware:** no (uses neutral + system tokens; identical light / dark)
**CSS files:**
- `tl-stepper.css` — container layout (orientation, label position, list spacing). **Bundled in `components.css`.**
- `tl-step.css` — individual step rendering (node circle, label, divider, state-specific colours, icon masks). **NOT bundled in `components.css`.** Without it the steps render as unstyled `<li>`s with no visible bullets.
- The boilerplate's `scripts/copy-tegel.mjs` appends every `tl-*.css` whose root class is missing from `components.css`, so `tl-step.css` lands automatically. See `tegel-lite-setup`.

## Markup

```html
<div class="tl-stepper tl-stepper--horizontal tl-stepper--lg tl-stepper--label-below">
  <ol class="tl-stepper__list">
    <li class="tl-stepper__step tl-stepper__step--success">
      <div class="tl-stepper__node"></div>
      <div class="tl-stepper__label">Account</div>
    </li>
    <li class="tl-stepper__step tl-stepper__step--current">
      <div class="tl-stepper__node">2</div>
      <div class="tl-stepper__label">Details</div>
    </li>
    <li class="tl-stepper__step tl-stepper__step--upcoming">
      <div class="tl-stepper__node">3</div>
      <div class="tl-stepper__label">Review</div>
    </li>
  </ol>
</div>
```

For `--success` and `--error` steps the node text content is irrelevant — Tegel paints a tick or warning icon as a `::after` pseudo-mask. For `--current` and `--upcoming` the number you put inside `__node` is what's shown.

## Modifiers

### Container

| Class | Effect |
|---|---|
| `tl-stepper--horizontal` | Steps laid out left-to-right. |
| `tl-stepper--vertical` | Steps stacked. Always uses label-aside layout. |
| `tl-stepper--lg` | Larger size — 30px node, 14px label (`--detail-01-*`). |
| `tl-stepper--sm` | Smaller size — 24px node (`--detail-05-*`). |
| `tl-stepper--label-below` | Horizontal only — label sits **under** the node. |
| `tl-stepper--label-aside` | Horizontal only — label sits **next to** the node (default for vertical). |
| `tl-stepper--hide-labels` | Visually hides labels (clipped to 1px) but keeps them readable for screen readers. |

### Step state (one required per `__step`)

| Class | Effect |
|---|---|
| `tl-stepper__step--success` | Filled accent-success node, white tick icon. |
| `tl-stepper__step--error` | Outlined danger-red node, danger-red warning icon. |
| `tl-stepper__step--current` | Outlined node with strong text — shows the number you provide. |
| `tl-stepper__step--upcoming` | Discrete-grey outlined node with disabled label tone — shows the number you provide. |

## Sub-elements (compound)

| Class | Where it goes | Notes |
|---|---|---|
| `tl-stepper__list` | direct child of `tl-stepper` | `<ol>` flex/list container. |
| `tl-stepper__step` | `<li>` inside `__list` | One step. Pair with a state modifier. The connecting divider is drawn as `::after` on the step (suppressed on the last). |
| `tl-stepper__node` | inside `__step` | Circular bullet. Width/height comes from size modifier. Number content shown for current/upcoming, ignored for success/error. |
| `tl-stepper__label` | inside `__step` | Text label. Position is controlled by `--label-below` / `--label-aside`. |

## States

State is set explicitly via the `__step--{name}` modifier. There is no hover / focus interaction — Stepper is a status display, not interactive.

## Tokens consumed

- Success node: `--stepper-icon-step-border-success` → `--component-stepper-success`
- Error node: `--stepper-icon-step-border-warning` → `--color-system-danger-default`
- Success/error icon: `--stepper-icon-step-checkmark` → `--color-foreground-icon-inverse-strong`
- Current node text + border: `--stepper-current-number-with-border` → `--color-foreground-border-strong`
- Upcoming node + label: `--stepper-label-border-upcoming`, `--stepper-label-text-upcoming`
- Connecting line: `--stepper-divider-line` → `--color-foreground-icon-disabled`
- Icon masks: `--icon-tick-svg`, `--icon-warning-svg`
- Typography: `--detail-01-*` (`--lg`), `--detail-05-*` (`--sm`)

## Examples

### Plain HTML — vertical small

```html
<div class="tl-stepper tl-stepper--vertical tl-stepper--sm">
  <ol class="tl-stepper__list">
    <li class="tl-stepper__step tl-stepper__step--success">
      <div class="tl-stepper__node"></div>
      <div class="tl-stepper__label">Sign in</div>
    </li>
    <li class="tl-stepper__step tl-stepper__step--error">
      <div class="tl-stepper__node"></div>
      <div class="tl-stepper__label">Verify email</div>
    </li>
    <li class="tl-stepper__step tl-stepper__step--current">
      <div class="tl-stepper__node">3</div>
      <div class="tl-stepper__label">Set password</div>
    </li>
    <li class="tl-stepper__step tl-stepper__step--upcoming">
      <div class="tl-stepper__node">4</div>
      <div class="tl-stepper__label">Done</div>
    </li>
  </ol>
</div>
```

### React binding (this project)

```tsx
import Stepper from '@/src/tegel-components/Stepper'

<Stepper steps={[
  { label: 'Account', state: 'success' },
  { label: 'Details', state: 'current' },
  { label: 'Review',  state: 'upcoming' },
]} />

<Stepper orientation="vertical" size="sm" steps={steps} />
```

`src/tegel-components/Stepper.tsx` is a server component. Step numbers are auto-generated from index (1-based) and only render for `current` / `upcoming` states. `labelPosition` is ignored when `orientation='vertical'`.

## Rules

- **`tl-step.css` is NOT in `components.css`.** Run the copy-tegel script (it appends missing `tl-*.css` automatically) or import `tl-step.css` directly. Without it, the bullets render as flat boxes.
- **Always include orientation + size.** Both modifiers are required — Tegel scopes node sizing rules to `--lg .tl-stepper__node` and `--sm .tl-stepper__node`. Without one, the node has no dimensions.
- **`--label-below` / `--label-aside` only apply to horizontal.** Vertical steppers are always label-aside (the rule is in `tl-step.css`).
- **Don't put text inside `__node` for success/error states.** It's overwritten by the `::after` icon mask, but leaving it empty avoids visual confusion in `--hide-labels` mode (some assistive tooling reads the bullet content).
- **Step numbers are 1-based.** When mapping from a 0-based array index, add 1 (the React wrapper does this for you).
- **The connecting line is `::after` on the step.** Last step's `::after` is suppressed; don't add your own divider element.
- **Stepper is non-interactive.** No hover/focus styles. If you need a clickable wizard, wrap each step in a `<button>` yourself and style the focus state via site CSS.
