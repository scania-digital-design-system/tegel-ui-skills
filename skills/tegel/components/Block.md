# Block

A neutral surface container. Use it to wrap a section of content with theme-aware background, padding, and corner radius — analogous to a "panel" or "well" in other systems. Nesting blocks alternates surface tones automatically (odd / even depths) up to 5 levels deep.

**Root class:** `tl-block`
**Compound:** no (single element; nesting is structural, not via sub-element classes)
**Theme-aware:** yes (background and content text scale via mode tokens; nested headings auto-resize)
**CSS file:** `tl-block.css` (in `components.css` bundle)

## Markup

```html
<!-- Default surface -->
<div class="tl-block">
  <h2>Section title</h2>
  <p>Body copy.</p>
</div>

<!-- Variant — primary or secondary mode background -->
<section class="tl-block tl-block--primary">
  <h2>Hero</h2>
  <p>Pinned content.</p>
</section>
```

The element can be any tag — `<div>`, `<section>`, `<article>`, `<aside>` — Tegel only targets the class. The component also styles common children (`h2`, `h3`, `h4`, `p`) so semantic markup gets the right typography for free.

## Modifiers

| Class | Effect |
|---|---|
| *(none)* | Base surface — `--color-background-layer-01`. |
| `tl-block--primary` | Sets `--block-background` to the primary mode background. Top-level "primary" surface. |
| `tl-block--secondary` | Sets `--block-background` to the secondary mode background. Top-level "secondary" surface. |

### Nesting behaviour (no extra classes needed)

When `.tl-block`s are nested inside `.tl-block--primary` or `.tl-block--secondary`, alternate surfaces auto-rotate:

| Depth | Inside `--primary` | Inside `--secondary` |
|---|---|---|
| 1st child | odd (`--block-background-odd`) | even (`--block-background-even`) |
| 2nd nested | even | odd |
| 3rd nested | odd | even |
| 4th nested | even | odd |

Heading typography also auto-scales: `h2` (root) → `h3` (1 level deep) → `h4` (2 levels deep), with paragraph typography shrinking to `--detail-03-*` at depth.

## Sub-elements

Block has **no sub-element classes**. Children are styled by tag selector (`tl-block h2`, `tl-block p`, etc.).

## States

Block is non-interactive. No hover/focus/active styling.

## Tokens consumed

- Surface: `--block-background`, `--block-background-mode-primary`, `--block-background-mode-secondary`, `--block-background-odd`, `--block-background-even`
- Text: `--block-text-color` → `--color-foreground-text-strong`
- Layout: `--block-padding` (16px), `--block-border-radius` (4px)
- Typography (root):
  - Body: `--detail-01-*`
  - `h2`: `--headline-02-*`
  - `p`: `--body-01-*`
- Typography (nested 1 deep): `h3` → `--headline-04-*`, `p` → `--detail-03-*`
- Typography (nested 2 deep): `h4` → `--headline-06-*`, `p` → `--detail-03-*`

## Examples

### Plain HTML — nested blocks alternate tones

```html
<section class="tl-block tl-block--primary">
  <h2>Vehicle dashboard</h2>
  <p>Overview metrics for the active fleet.</p>

  <article class="tl-block">
    <h3>Trucks online</h3>
    <p>34 of 36 reporting.</p>

    <div class="tl-block">
      <h4>Last update</h4>
      <p>2 minutes ago</p>
    </div>
  </article>
</section>
```

### Plain HTML — using a real semantic tag

```html
<aside class="tl-block tl-block--secondary site-callout">
  <h2>Heads up</h2>
  <p>Maintenance window starts tonight at 22:00 UTC.</p>
</aside>
```

### React binding (this project)

```tsx
import Block from '@/src/tegel-components/Block'

<Block variant="primary">
  <h2>Section title</h2>
  <p>Content here</p>
</Block>

// Polymorphic — render as a section/article/etc.
<Block as="section" variant="secondary" className="site-hero">
  <h2>Hero</h2>
  <p>Tagline goes here.</p>
</Block>
```

`src/tegel-components/Block.tsx` is a server component. Props: `variant` (`'primary' | 'secondary'`, optional — no default), `as` (any element type, defaults to `'div'`), `className`, `children`. Unlike Card/Accordion, it does **not** read `useTheme()` — pass `variant` explicitly when you want a tinted surface.

## Rules

- **Variant is optional.** Without `--primary` / `--secondary` the block uses the base layer-01 background. Add a variant when you want the tone to shift with `tds-mode-variant`.
- **Nesting auto-alternates surfaces.** Don't manually alternate `--primary` / `--secondary` on nested blocks — Tegel does it via descendant selectors. Doing both will fight the cascade.
- **Heading typography is depth-aware.** Don't add manual font-size overrides on `h2`/`h3`/`h4` inside a block — Tegel scopes the right scale per nesting level.
- **The component supports any element via `as` (React) or any HTML tag (plain HTML).** Use the most semantic option (`<section>`, `<aside>`, `<article>`).
- **Default padding is 16px and radius is 4px.** Override via `--block-padding` / `--block-border-radius` on a parent if you need a different spacing scale, rather than wrapping in another container.
