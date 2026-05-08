# Accordion

A vertical stack of collapsible items, each with a header button and a content panel. Compound — items are children of the root and manage their own expanded state via a class toggle. Theme-aware via mode-variant primary/secondary.

**Root class:** `tl-accordion`
**Compound:** yes
**Theme-aware:** yes (variant interacts with `tds-mode-light` / `tds-mode-dark` to swap surface vs hover tones)
**CSS file:** `tl-accordion.css` (in `components.css` bundle)

## Markup

```html
<div class="tl-accordion tl-accordion--primary">
  <div class="tl-accordion__item">
    <button class="tl-accordion__header-icon-end" type="button" aria-expanded="false">
      <span class="tl-accordion__title">Section title</span>
    </button>
    <div class="tl-accordion__panel">
      <p>Panel content.</p>
    </div>
  </div>
  <!-- additional items… -->
</div>
```

The chevron is rendered as a CSS pseudo-element (`::after`) on the header element — you don't add an icon node manually. To open an item, add `tl-accordion__item--expanded` to its `__item` wrapper (and update `aria-expanded` on the button).

## Modifiers

### Variant on root (one)

| Class | Effect |
|---|---|
| `tl-accordion--primary` | Primary surface — pairs with `body.tds-mode-variant-primary`. |
| `tl-accordion--secondary` | Secondary surface — pairs with `body.tds-mode-variant-secondary`. |

### Optional on root

| Class | Effect |
|---|---|
| `tl-accordion--hide-last-border` | Removes the bottom border on the last item. |

### On `tl-accordion__item`

| Class | Effect |
|---|---|
| `tl-accordion__item--expanded` | Item is open — reveals `tl-accordion__panel`, rotates chevron 180°, tints header. |
| `tl-accordion__item--disabled` | Greys out text, disables hover, sets `cursor: not-allowed` on panel. |
| `tl-accordion__item--icon-start` | Chevron renders before the title instead of after. **Use with `tl-accordion__header-icon-start` button class — see Rules.** |
| `tl-accordion__item--less-padding` | Reduces panel right padding from layout-64 to element-16. |

### Header element

The button class chooses which side the chevron sits on:

| Class | Where the chevron renders |
|---|---|
| `tl-accordion__header-icon-end` | trailing (default style) |
| `tl-accordion__header-icon-start` | leading |

## Sub-elements (compound)

| Class | Where it goes | Notes |
|---|---|---|
| `tl-accordion__item` | direct child of `tl-accordion` | Wraps one collapsible row. Use `<div>` (NOT `<li>` — there's no `<ul>`/`<ol>` wrapper). |
| `tl-accordion__header-icon-end` / `tl-accordion__header-icon-start` | direct child of `__item` | Use a `<button>` element for keyboard accessibility. The CSS resets button styling. |
| `tl-accordion__title` | inside the header button | Title text. `flex-grow: 2` so it pushes the chevron to the edge. |
| `tl-accordion__panel` | direct child of `__item` (sibling of header) | Hidden by default (`display: none`); shown when item has `--expanded`. |

## States

| State | How |
|---|---|
| Hover (item, not disabled, not expanded) | Tints `--accordion-background-hover` on the header |
| Active | Tints `--accordion-background-active` on the header |
| Focus (keyboard, on header) | 2px accent-focus outline on the `__item`, via `:has(...:focus-visible)` |
| Expanded | Item carries `tl-accordion__item--expanded`; chevron rotates 180°; header tints to surface-100; panel becomes `display: block` |
| Disabled | Item carries `--disabled`; text fades, hover suppressed, panel cursor becomes not-allowed |

## Tokens consumed

- `--color-foreground-border-discrete` — separators between items
- `--color-foreground-border-strong` / `--color-foreground-border-accent-focus` — focus outline
- `--color-foreground-text-strong`, `--color-foreground-text-disabled` — title/body text
- `--color-foreground-icon-strong` — chevron color (via mask + `background-color`)
- `--color-background-layer-01`, `--color-background-layer-02`, `--color-background-surface-100` — surface variants for hover / focus / expanded
- Typography: `--headline-07-*` (title), `--detail-03-*` (panel)
- Spacing: `--tds-spacing-element-{8,16,32}`, `--tds-spacing-layout-64`
- The chevron uses `--icon-chevron_down-svg` as a mask image — supplied by `scania-variables.css`

## Examples

### Plain HTML

```html
<!-- Two items, second one open -->
<div class="tl-accordion tl-accordion--primary">
  <div class="tl-accordion__item">
    <button class="tl-accordion__header-icon-end" type="button" aria-expanded="false">
      <span class="tl-accordion__title">What is Tegel?</span>
    </button>
    <div class="tl-accordion__panel">
      <p>Tegel is the Scania design system.</p>
    </div>
  </div>

  <div class="tl-accordion__item tl-accordion__item--expanded">
    <button class="tl-accordion__header-icon-end" type="button" aria-expanded="true">
      <span class="tl-accordion__title">How do I install it?</span>
    </button>
    <div class="tl-accordion__panel">
      <p>Run <code>pnpm install @scania/tegel-lite</code></p>
    </div>
  </div>

  <div class="tl-accordion__item tl-accordion__item--disabled">
    <button class="tl-accordion__header-icon-end" type="button" disabled aria-expanded="false">
      <span class="tl-accordion__title">Disabled section</span>
    </button>
    <div class="tl-accordion__panel">
      <p>This can't be opened.</p>
    </div>
  </div>
</div>

<!-- Chevron on the leading edge -->
<div class="tl-accordion__item tl-accordion__item--icon-start">
  <button class="tl-accordion__header-icon-start" type="button" aria-expanded="false">
    <span class="tl-accordion__title">Leading chevron</span>
  </button>
  <div class="tl-accordion__panel">…</div>
</div>
```

You toggle each item by adding/removing `tl-accordion__item--expanded` and updating `aria-expanded` on the button — typically with whatever interaction layer your stack provides (vanilla JS, Alpine, Vue, React state, etc.).

### React binding (this project)

```tsx
import Accordion from '@/src/tegel-components/Accordion'

<Accordion>
  <Accordion.Item title="What is Tegel?">
    <p>Tegel is the Scania design system.</p>
  </Accordion.Item>
  <Accordion.Item title="How do I install it?" defaultOpen>
    <p>Run pnpm install @scania/tegel-lite</p>
  </Accordion.Item>
  <Accordion.Item title="Disabled section" disabled>
    <p>Can&apos;t open.</p>
  </Accordion.Item>
</Accordion>
```

`Accordion.Item` props: `title`, `defaultOpen`, `disabled`, `lessPadding`, `iconPosition` (`'start' | 'end'`). The wrapper reads `modeVariant` from `useTheme()` — only pass `variant` to override.

## Rules

- **Compound + RSC (Next.js).** `Accordion.Item` is `undefined` when imported across a server-component boundary. Keep accordion markup inside a `"use client"` component or use the plain HTML pattern.
- **Header must be a `<button>`.** The CSS depends on focus-visible / hover / active behaviour that real buttons provide. A `<div>` is not keyboard-accessible.
- **Only one chevron class on the header at a time** — `tl-accordion__header-icon-start` OR `--end`. The chevron is `::after`; mixing classes leads to weird spacing.
- **Pair the icon-start modifier with the matching button class.** `tl-accordion__item--icon-start` only re-orders content correctly when the header is `tl-accordion__header-icon-start`.
- **Each item manages its own state.** There's no built-in single-open-at-a-time behaviour — implement it in your interaction layer if you need it.
- **Keep `aria-expanded` in sync with `tl-accordion__item--expanded`.** The class drives the visuals; the attribute drives screen readers.
- **Don't override the chevron with an `<Icon>` element** — it's drawn via `mask-image` in `::after`. Adding a real icon child renders a duplicate.
