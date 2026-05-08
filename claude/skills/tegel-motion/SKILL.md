---
name: tegel-motion
description: Reference for Tegel design system motion tokens — durations, easings, keyframes, and pre-composed transition/animation CSS variables. Use when adding, tweaking, or reviewing animations and transitions in any Tegel-based UI so the result stays on-brand instead of hardcoding ms/cubic-bezier values.
---

# Motion & Animation System

The Tegel motion system is exposed as CSS custom properties under the `--tds-motion-*` namespace. It separates concerns into three layers: **primitive tokens** (durations and easings), **single-axis transitions** (one keyframe + one duration + one easing), and **compound animations** (two or three transitions composed for richer entrance/exit effects). All keyframes live under the `tds-*` prefix.

**Always reach for these tokens before writing raw `transition`, `animation`, or `cubic-bezier(...)` values.** If nothing fits, raise it as a gap rather than inventing a one-off. Variables and keyframes are exposed globally on `:root, html`.

## Duration Tokens

| Token | Value | When to Use |
| :--- | :--- | :--- |
| `--tds-motion-duration-instant` | 0ms | State changes that must not be animated (focus jumps, programmatic scroll resets, reduced-motion fallbacks) |
| `--tds-motion-duration-fast-01` | 100ms | Hover affordances, micro-feedback on tap |
| `--tds-motion-duration-fast-02` | 150ms | Small visual changes — icon swaps, zoom on tooltips |
| `--tds-motion-duration-moderate-01` | 200ms | Most exits (dismiss, fade-out) — leave fast so the user can move on |
| `--tds-motion-duration-moderate-02` | 300ms | Mid-weight UI changes — accordion toggles in dense layouts |
| `--tds-motion-duration-slow-01` | 400ms | Larger surface transitions — drawers, sheets |
| `--tds-motion-duration-slow-02` | 500ms | Entrances of significant surfaces (modals, banners), looping animations base |

Heuristic: enters use `slow-02`; exits use `moderate-01` (Tegel's pattern in the pre-composed vars).

## Easing Tokens

| Token | Bezier | Curve Shape | When to Use |
| :--- | :--- | :--- | :--- |
| `--tds-motion-easing-scania` | `cubic-bezier(0.4, 0, 0, 1)` | Strong start, soft tail | Brand-default; loops (blink, pulse) and compound elevate steps |
| `--tds-motion-easing-enter` | `cubic-bezier(0.1, 0.9, 0.2, 1)` | Fast peek, gentle settle | Anything entering the screen (fade-in, slide-in, zoom-in) |
| `--tds-motion-easing-exit` | `cubic-bezier(0.7, 0, 1, 0.5)` | Slow start, hard finish | Anything leaving the screen (fade-out, slide-out, dismiss) |
| `--tds-motion-easing-easy` | `cubic-bezier(0.33, 0, 0.67, 1)` | Symmetric, gentle | General-purpose smooth animation; default fallback |
| `--tds-motion-easing-linear` | `cubic-bezier(0, 0, 1, 1)` | No acceleration | Continuous motion (rotate, shake) where ease would feel unnatural |
| `--tds-motion-ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | Material standard | Reusable two-way curve for state changes that play forwards and backwards |

Rule of thumb: enter ≠ exit. Pair `easing-enter` with `slow-02` and `easing-exit` with `moderate-01` unless you have a specific reason.

## Transitions

Each transition is `keyframe duration easing forwards`. Apply with e.g. `animation: var(--tds-motion-fade-in);`. Looping ones (`blink`, `pulse`) use `infinite` instead of `forwards` and double the slow-02 duration.

### Fade

| Token | Keyframe | Duration | Easing |
| :--- | :--- | :--- | :--- |
| `--tds-motion-fade-in` | `tds-fade-in` | slow-02 (500ms) | enter |
| `--tds-motion-fade-out` | `tds-fade-out` | moderate-01 (200ms) | exit |

### Zoom

| Token | Keyframe | Duration | Easing |
| :--- | :--- | :--- | :--- |
| `--tds-motion-zoom-in` | `tds-zoom-in` | fast-02 (150ms) | enter |
| `--tds-motion-zoom-out` | `tds-zoom-out` | fast-02 (150ms) | exit |

### Slide (full 100%)

| Token | Keyframe | Duration | Easing |
| :--- | :--- | :--- | :--- |
| `--tds-motion-slide-in-top` | `tds-slide-in-top` | slow-02 | enter |
| `--tds-motion-slide-in-bottom` | `tds-slide-in-bottom` | slow-02 | enter |
| `--tds-motion-slide-in-left` | `tds-slide-in-left` | slow-02 | enter |
| `--tds-motion-slide-in-right` | `tds-slide-in-right` | slow-02 | enter |
| `--tds-motion-slide-out-top` | `tds-slide-out-top` | slow-02 | exit |
| `--tds-motion-slide-out-bottom` | `tds-slide-out-bottom` | slow-02 | exit |
| `--tds-motion-slide-out-left` | `tds-slide-out-left` | slow-02 | exit |
| `--tds-motion-slide-out-right` | `tds-slide-out-right` | slow-02 | exit |

### Slide Short (16px)

| Token | Keyframe | Duration | Easing |
| :--- | :--- | :--- | :--- |
| `--tds-motion-slide-in-short-top` | `tds-slide-top-short` | slow-02 | enter |
| `--tds-motion-slide-in-short-right` | `tds-slide-right-short` | slow-02 | enter |
| `--tds-motion-slide-in-short-bottom` | `tds-slide-bottom-short` | slow-02 | enter |
| `--tds-motion-slide-in-short-left` | `tds-slide-left-short` | slow-02 | enter |
| `--tds-motion-slide-out-short-top` | `tds-slide-out-top-short` | slow-02 | exit |
| `--tds-motion-slide-out-short-bottom` | `tds-slide-out-bottom-short` | slow-02 | exit |
| `--tds-motion-slide-out-short-left` | `tds-slide-out-left-short` | slow-02 | exit |
| `--tds-motion-slide-out-short-right` | `tds-slide-out-right-short` | slow-02 | exit |

### Collapse / Rotate / Shake / Loop

| Token | Keyframe | Duration | Easing | Iteration |
| :--- | :--- | :--- | :--- | :--- |
| `--tds-motion-collapse-in` | `tds-collapse-in` | slow-02 | enter | once |
| `--tds-motion-collapse-out` | `tds-collapse-out` | slow-02 | exit | once |
| `--tds-motion-rotate` | `tds-rotate` | slow-02 | linear | once |
| `--tds-motion-shake` | `tds-shake` | slow-02 | linear | once |
| `--tds-motion-blink` | `tds-blink` | 1000ms (slow-02 × 2) | scania | infinite |
| `--tds-motion-pulse` | `tds-pulse` | 1000ms (slow-02 × 2) | scania | infinite |

## Compound Animations

These tokens stack two or three keyframes to create richer effects. They're meant for surfaces that need both opacity and transform feedback (modals, popovers, sheets).

| Token | Composition |
| :--- | :--- |
| `--tds-motion-zoom-enter` | `tds-fade-in` (slow-02, enter) + `tds-zoom-in` (fast-02, scania) |
| `--tds-motion-zoom-exit` | `tds-fade-out` (fast-02, exit) + `tds-zoom-out` (fast-02, exit) |
| `--tds-motion-collapse-enter` | `tds-fade-in` (slow-02, linear) + `tds-collapse-in-hidden` (slow-02, scania) |
| `--tds-motion-collapse-exit` | `tds-fade-out` (slow-02, exit) + `tds-collapse-out` (slow-02, exit) |
| `--tds-motion-slide-enter` | `tds-fade-in` (slow-02, enter) + `tds-slide-bottom-short` (slow-02, enter) |
| `--tds-motion-slide-exit` | `tds-fade-out` (slow-02, exit) + `tds-slide-out-bottom-short` (slow-02, exit) |
| `--tds-motion-elevate-enter` | `tds-fade-in` (slow-02, enter) + `tds-slide-in-bottom-hidden` (slow-02, scania) + `tds-zoom-in` (slow-02, scania) |
| `--tds-motion-elevate-exit` | `tds-fade-out` (moderate-01, exit) + `tds-zoom-out` (slow-02, scania) |

## Keyframes

Defined globally (no scope) so they're available wherever the motion stylesheet is imported. Reach for these only when composing your own `animation` shorthand — most of the time prefer the pre-composed tokens above.

| Keyframe | From → To |
| :--- | :--- |
| `tds-fade-in` | `opacity: 0` → `opacity: 1; visibility: visible` |
| `tds-fade-out` | `opacity: 1` → `opacity: 0; visibility: hidden` |
| `tds-zoom-in` | `scale(0.9)` → `scale(1)` |
| `tds-zoom-out` | `scale(1)` → `scale(0.9)` |
| `tds-slide-in-top` | `translateY(-100%)` → `translateY(0)` |
| `tds-slide-in-bottom` | `translateY(100%)` → `translateY(0)` |
| `tds-slide-in-left` | `translateX(-100%)` → `translateX(0)` |
| `tds-slide-in-right` | `translateX(100%)` → `translateX(0)` |
| `tds-slide-out-top` | `translateY(0)` → `translateY(-100%)` |
| `tds-slide-out-bottom` | `translateY(0)` → `translateY(100%)` |
| `tds-slide-out-left` | `translateX(0)` → `translateX(-100%)` |
| `tds-slide-out-right` | `translateX(0)` → `translateX(100%)` |
| `tds-slide-top-short` | `translateY(-16px)` → `translateY(0)` |
| `tds-slide-bottom-short` | `translateY(16px)` → `translateY(0)` |
| `tds-slide-left-short` | `translateX(-16px)` → `translateX(0)` |
| `tds-slide-right-short` | `translateX(16px)` → `translateX(0)` |
| `tds-slide-out-top-short` | `translateY(0)` → `translateY(-16px)` |
| `tds-slide-out-bottom-short` | `translateY(0)` → `translateY(16px)` |
| `tds-slide-out-left-short` | `translateX(0)` → `translateX(-16px)` |
| `tds-slide-out-right-short` | `translateX(0)` → `translateX(16px)` |
| `tds-rotate` | `rotate(0deg)` → `rotate(180deg)` |
| `tds-rotate-back` | `rotate(180deg)` → `rotate(0deg)` |
| `tds-shake` | Damped horizontal oscillation: ±9px → ±1px over 10 stops |
| `tds-blink` | `opacity: 1` → `0.25` → `1` |
| `tds-pulse` | `scale: 1` → `0.9` → `1` |
| `tds-pulse-2` | Heart-style: 1 → 0.9 → 1 → 0.9 → 1 |
| `tds-stroke` | `stroke-dashoffset: 2%` → `0` |
| `tds-collapse-in` | `scaleY(0)` → `scaleY(1)` (origin top) |
| `tds-collapse-in-hidden` | `scaleY(0)` → `scaleY(1)` (origin top) — paired with fade |
| `tds-collapse-out` | `scaleY(1)` → `scaleY(0)` (origin top) |
| `tds-collapse-width-in` | `scaleX(0)` → `scaleX(1)` |
| `tds-collapse-width-out` | `scaleX(1)` → `scaleX(0)` |
| `collapse-in` | `height: var(--collapse-size)` → `var(--ui-transition-height)` (uses `@property` height interpolation) |
| `collapse-out` | `var(--ui-transition-height)` → `var(--collapse-size)` |
| `collapse-width-in` | `width: var(--collapse-width-size)` → `var(--ui-transition-width)` |
| `collapse-width-out` | `var(--ui-transition-width)` → `var(--collapse-width-size)` |
| `animate-svg-stroke-1` | `stroke-dashoffset: 2230px` → `0` (logo/illustration reveal) |

## Decision guide

When the user says… → reach for…

- "open a modal/dialog/sheet" → `--tds-motion-elevate-enter` / `-exit`
- "show a toast / popover / tooltip" → `--tds-motion-zoom-enter` / `-exit`
- "expand/collapse an accordion or details" → `--tds-motion-collapse-enter` / `-exit`
- "reveal inline contextual content" → `--tds-motion-slide-enter` / `-exit`
- "fade something in/out only" → `--tds-motion-fade-in` / `-out`
- "slide a drawer in from the side" → `--tds-motion-slide-in-left` / `-right` (full)
- "drop a banner/toast in from the top edge" → `--tds-motion-slide-in-top`
- "indicate loading/attention" → `--tds-motion-blink` or `--tds-motion-pulse`
- "shake an invalid input" → `--tds-motion-shake`
- "rotate a chevron on expand" → `--tds-motion-rotate` / build with `tds-rotate` + `tds-rotate-back` keyframes
- "draw an SVG check/path on success" → keyframes `tds-stroke` or `animate-svg-stroke-1`

## Pattern recipes

### Mount/unmount surfaces (modal, popover, toast)

A surface that conditionally renders (`{open && <Modal />}`) cannot play an exit animation — the DOM node is gone before the keyframes can run. Keep the node mounted for the duration of the exit animation, then unmount.

Pattern: track an internal `closing` flag separate from the external `isOpen` prop. When `isOpen` flips to false, set `closing=true` and start a `setTimeout` matching the exit duration; only after the timer fires do you actually unmount.

```tsx
const [rendered, setRendered] = useState(isOpen);
const [closing, setClosing] = useState(false);

useEffect(() => {
  if (isOpen) { setRendered(true); setClosing(false); return; }
  if (!rendered) return;
  setClosing(true);
  const t = setTimeout(() => { setRendered(false); setClosing(false); }, EXIT_DURATION);
  return () => clearTimeout(t);
}, [isOpen, rendered]);
```

Then toggle `--opening` / `--closing` classes that select the matching enter/exit animation tokens. `EXIT_DURATION` must equal the longest duration in the compound (e.g. 150ms for `--tds-motion-zoom-exit`, 500ms for `--tds-motion-elevate-exit`).

### Layout-reflow collapse (accordion, expandable card)

**The `--tds-motion-collapse-*` compounds animate `scaleY` — the element visually shrinks but still occupies its full height in the layout, so content below stays put and then jumps when `display:none` kicks in.** That is correct for "reveal in place" motion, but wrong for accordions where the user expects surrounding content to reflow smoothly.

For an accordion-style collapse where the actual height should animate, use `grid-template-rows: 0fr ↔ 1fr` on the panel with an inner overflow-clipping wrapper. Pure CSS, no JS height measurement, no keep-alive timer needed.

```css
.panel {
  display: grid;
  grid-template-rows: 0fr;
  padding-block: 0;
  opacity: 0;
  transition:
    grid-template-rows var(--tds-motion-duration-moderate-02) var(--tds-motion-ease-in-out),
    padding var(--tds-motion-duration-moderate-02) var(--tds-motion-ease-in-out),
    opacity var(--tds-motion-duration-moderate-02) var(--tds-motion-ease-in-out);
}
.panel--open {
  grid-template-rows: 1fr;
  padding-block: var(--tds-spacing-element-8) var(--tds-spacing-element-32);
  opacity: 1;
}
.panel > .inner { overflow: hidden; min-height: 0; }
```

Notes:
- The inner wrapper with `overflow: hidden; min-height: 0` is required — the grid track sizes to content otherwise.
- Vertical padding must transition alongside `grid-template-rows`, or the panel keeps reserving padding space when collapsed.
- Keep the existing tegel `display: none/block` toggle out of the way by using a `.site-*` selector that overrides `display` to `grid` in both states.
- Use `moderate-02` (300ms) with `ease-in-out` — the compound enter/exit tokens (`slow-02`, asymmetric easing) feel sluggish for in-place height changes.

The tegel `collapse-in` / `collapse-out` keyframes (no `tds-` prefix) animate real height via `@property` + `--ui-transition-height`, but they require per-element measurement and have a `@supports not` fallback. Reach for them only if `grid-template-rows` is unsuitable.

## Authoring rules

- **Don't override** the duration or easing inside a `--tds-motion-*` shorthand — pick a different shorthand, or compose your own with the duration + easing tokens.
- **Don't hardcode** `cubic-bezier(...)` or `ms` values. If the spec really doesn't fit any token, flag it as a missing token rather than inventing one.
- **Reduced motion:** wrap any non-essential animation in `@media (prefers-reduced-motion: reduce)` and either remove it or swap to `--tds-motion-duration-instant`.
- **Pair enter with exit.** If you add an enter animation to a state, add the matching exit. Mismatched pairs feel jarring.
- **Custom collapses (height/width):** the modern `collapse-in` / `collapse-out` keyframes need `--ui-transition-height` / `--ui-transition-width` set on the element to the target size, plus `--collapse-size` / `--collapse-width-size` for the start. The `@supports not` block disables them on browsers that lack `@property` + `lh` units, so a JS/transform fallback is automatically what runs there — keep that in mind when debugging.

## Rationale

**Asymmetry between enter and exit is deliberate.** Entering surfaces use `slow-02` (500ms) with `easing-enter` so they feel deliberate and reveal hierarchy. Exits run shorter — `moderate-01` (200ms) for fades, `fast-02` (150ms) for zooms — with `easing-exit` (slow-start, hard-finish) to get out of the way. Keeping users waiting on a dismissal feels broken; making an entrance too fast feels jarring.

**Two slide vocabularies for two purposes.** Full `100%` slides are for surface-level transitions (drawers, sheets, full-screen modals) where the element comes from offscreen. The 16px short slides are for in-context UI changes (popovers, dropdowns, toasts) where the element materializes near its target — short translation paired with fade reads as "appear" rather than "fly in."

**Compound animations stack opacity + transform.** Pure transforms feel mechanical; pure fades feel weightless. The `*-enter` / `*-exit` compounds always include `tds-fade-*` alongside the transform so the element gains/loses physical presence and visual presence simultaneously. `elevate-enter` triple-stacks (fade + slide + zoom) for the highest-emphasis surfaces — modals, primary CTAs.

**Loops use the brand `scania` curve at 1000ms.** `blink` and `pulse` are calculated as `slow-02 × 2`. Linear would feel mechanical; the `easing-enter`/`exit` curves are unsuitable for loops because they're directional. The `scania` curve has a strong start and soft tail, which reads as "breathing" when reversed each cycle.

**Linear easing is reserved for continuous motion.** `rotate` and `shake` use `easing-linear` because rotational or oscillating motion with eased timing reads as glitchy — the eye expects constant angular velocity.

**Keyframes are global, tokens scoped to `:root, html`.** This lets any consumer reference `--tds-motion-*` without importing the keyframes separately, but keyframes always resolve via the global stylesheet at `motion/_animation.scss`.

Source files: `motion/_motion.scss`, `motion/_animation.scss`, `motion/index.scss`.
