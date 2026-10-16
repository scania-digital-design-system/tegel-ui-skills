# Card

A surface for grouped content. Compound — sub-elements are children of `tl-card__body`. Theme-aware via mode-variant primary/secondary.

**Root class:** `tl-card`
**Compound:** yes
**Theme-aware:** yes (variant follows `tds-mode-variant-{primary,secondary}` on body)
**CSS file:** `tl-card.css` (in `components.css` bundle)

## Markup (canonical structure)

```html
<div class="tl-card tl-card--primary">
  <!-- Image is OPTIONAL and goes outside Body -->
  <img class="tl-card__image" src="…" alt="…">

  <div class="tl-card__body">
    <div class="tl-card__header">
      <img class="tl-card__thumbnail" src="…" alt=""><!-- optional -->
      <div class="tl-card__headings">
        <span class="tl-card__title">Title</span>
        <span class="tl-card__subtitle">Subtitle</span><!-- optional -->
      </div>
    </div>

    <div class="tl-card__content">Body copy</div>

    <div class="tl-card__bottom-row"><!-- optional -->
      <div class="tl-card__actions">
        <!-- buttons / links -->
      </div>
    </div>
  </div>
</div>
```

## Modifiers

| Class | Effect |
|---|---|
| `tl-card--primary` | Primary surface variant. Pair with `body.tds-mode-variant-primary`. |
| `tl-card--secondary` | Secondary surface variant. Pair with `body.tds-mode-variant-secondary`. |
| `tl-card--clickable` | Renders as an interactive surface — adds hover / focus / active states. **Use a `<button>` element, not `<div>`**, for accessibility. |
| `tl-card--stretch` | Removes the 336px `max-inline-size` cap on `.tl-card__content`. Useful for docs/dashboard cards (see Rules). |
| `tl-card--expandable` | Enables expand/collapse — `.tl-card__content` is hidden until the card also has `tl-card--expanded`. Toggle the second class to show. |
| `tl-card--expanded` | Companion to `tl-card--expandable` — present only when expanded. |

There's also `tl-card__header--below` if you want the header *under* `.tl-card__image` instead of above. Apply on the header element.

## Sub-elements (compound)

| Class | Where it goes | Notes |
|---|---|---|
| `tl-card__image` | direct child of `tl-card` (NOT inside body) | Hero/cover image |
| `tl-card__body` | direct child of `tl-card` | Required wrapper for header/content/bottom-row |
| `tl-card__header` | inside `tl-card__body` | Holds thumbnail + headings |
| `tl-card__thumbnail` | inside `tl-card__header` | Small avatar/logo |
| `tl-card__headings` | inside `tl-card__header` | Wraps title + subtitle |
| `tl-card__title` | inside `tl-card__headings` | Card title (use `<span>` or `<h3>`) |
| `tl-card__subtitle` | inside `tl-card__headings` | Optional |
| `tl-card__content` | inside `tl-card__body` | Body copy. Default `max-inline-size: 336px` (see Rules) |
| `tl-card__bottom-row` | inside `tl-card__body` | Optional row at the bottom |
| `tl-card__actions` | inside `tl-card__bottom-row` | Holds buttons/links |
| `tl-card__divider` | anywhere within body | Horizontal rule using card-tinted border |

## States (`tl-card--clickable` only)

| State | How |
|---|---|
| Hover | `:hover` — surface tint |
| Focus (keyboard) | `:focus-visible` — accent-focus outline |
| Active | `:active` — pressed surface |

## Tokens consumed

- `--color-background-layer-01` / `layer-02` (depending on variant) for surface
- `--color-text-strong`, `--color-text-defined`, `--color-text-soft` for title / subtitle / body
- `--color-border-discrete` for dividers
- `--radius-area-large` for corner radius (8px Traton, 16px Scania)
- `--card-body-padding`, `--card-slotted-padding` for internal spacing
- `--detail-03-*` typography for body copy

## Examples

### Plain HTML

```html
<!-- Basic card with title + body copy -->
<div class="tl-card tl-card--primary">
  <div class="tl-card__body">
    <div class="tl-card__header">
      <div class="tl-card__headings">
        <span class="tl-card__title">Project Alpha</span>
        <span class="tl-card__subtitle">In progress</span>
      </div>
    </div>
    <div class="tl-card__content">
      <p>Description of the project goes here.</p>
    </div>
  </div>
</div>

<!-- Clickable card with image, thumbnail, and bottom action -->
<button class="tl-card tl-card--primary tl-card--clickable">
  <img class="tl-card__image" src="/photo.jpg" alt="Project photo">
  <div class="tl-card__body">
    <div class="tl-card__header">
      <img class="tl-card__thumbnail" src="/icon.svg" alt="">
      <div class="tl-card__headings">
        <span class="tl-card__title">Click me</span>
      </div>
    </div>
    <div class="tl-card__content">Tap to open details.</div>
    <div class="tl-card__bottom-row">
      <div class="tl-card__actions">
        <span class="tl-icon tl-icon--arrow_right tl-icon--16" aria-hidden="true"></span>
      </div>
    </div>
  </div>
</button>

<!-- Stretch variant — content fills full card width (no 336px cap) -->
<div class="tl-card tl-card--primary tl-card--stretch">
  <div class="tl-card__body">
    <div class="tl-card__header">
      <div class="tl-card__headings">
        <span class="tl-card__title">Diagnostic</span>
      </div>
    </div>
    <div class="tl-card__content"><pre>{ "wide": "JSON dump or table" }</pre></div>
  </div>
</div>
```

### React binding (this project)

```tsx
import Card from '@/src/tegel-components/Card'

<Card variant="primary">
  <Card.Body>
    <Card.Header>
      <Card.Headings title="Project Alpha" subtitle="In progress" />
    </Card.Header>
    <Card.Content>Description here</Card.Content>
  </Card.Body>
</Card>
```

The wrapper exposes `Card.Body`, `Card.Header`, `Card.Headings`, `Card.Content`, `Card.Image`, `Card.Thumbnail`, `Card.BottomRow`, `Card.Actions`. Variant defaults to the theme's `modeVariant` from `useTheme()` — only pass `variant` to override.

## Rules

- **`tl-card__body` is required.** Header / Content / BottomRow are children of `body`, not direct children of `tl-card`. The CSS uses `.tl-card__body .tl-card__content` selectors that don't match if you flatten the structure.
- **`tl-card__image` is the only sub-element outside `tl-card__body`.** Place it as a direct child of `tl-card`.
- **`tl-card__content` defaults to `max-inline-size: 336px`** (a marketing-card constraint). For docs/dashboard layouts, either add `tl-card--stretch` to the card or override globally with `.tl-card__body .tl-card__content { max-inline-size: unset }`.
- **Use `<button>` for `tl-card--clickable`.** `<div>` won't be focusable.
- **Compound + RSC (Next.js).** Card sub-components imported across a server-component boundary will be `undefined` — wrap card markup in a `"use client"` component.
- **Don't override the radius locally.** It's brand-aware (`--radius-area-large` is 8px under Traton, 16px under Scania). Changing it in one place breaks brand consistency.
