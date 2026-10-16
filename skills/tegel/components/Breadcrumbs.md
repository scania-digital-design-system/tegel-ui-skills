# Breadcrumbs

A horizontal trail of links indicating the user's location in the page hierarchy. Renders as an ordered list (`<ol>`) with a CSS-generated `›` separator between items. The current page is marked with `aria-current="page"` — its separator is suppressed and the link is non-interactive.

**Root class:** `tl-breadcrumbs`
**Compound:** no
**Theme-aware:** no (uses neutral text-foreground tokens)
**CSS file:** `tl-breadcrumbs.css` (in `components.css` bundle)

## Markup

```html
<nav class="tl-breadcrumbs" aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/products">Products</a></li>
    <li><a href="/products/widget-pro" aria-current="page">Widget Pro</a></li>
  </ol>
</nav>
```

The element is a regular `<nav>` containing a single `<ol>` with `<li>` children — no extra classes on the inner elements. All styling is selector-driven from the root.

## Modifiers

Breadcrumbs has **no modifier classes**. Active-state is conveyed exclusively via `aria-current="page"` on the final `<a>`.

## States

| State | How |
|---|---|
| Hover | `:hover` on the link — strong text, underline. |
| Focus (keyboard) | `:focus-visible` — `--breadcrumb-focus-outline-width` (2px) accent-focus outline. |
| Current page | `[aria-current="page"]` — subtle text colour, `pointer-events: none`, no separator after. |

## Tokens consumed

- Text: `--breadcrumb-label` → `--color-text-strong`
- Hover: `--breadcrumb-hover` → `--color-text-strong`
- Current page: `--breadcrumb-current` → `--color-text-subtle`
- Separator: `--breadcrumb-separator-color`, `--breadcrumb-separator-margin` (4px), `--breadcrumb-separator-width` (4px), `--breadcrumb-separator-height` (8px)
- Focus: `--breadcrumb-focus-outline-color`, `--breadcrumb-focus-outline-width`
- Typography: `--detail-02-*` (font family, size, line-height, weight, letter-spacing)

## Examples

### Plain HTML

```html
<nav class="tl-breadcrumbs" aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/docs">Docs</a></li>
    <li><a href="/docs/components" aria-current="page">Components</a></li>
  </ol>
</nav>
```

### React binding (this project)

```tsx
import Breadcrumbs from '@/src/tegel-components/Breadcrumbs'

<Breadcrumbs items={[
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Widget Pro', href: '/products/widget-pro' },
]} />
```

`src/tegel-components/Breadcrumbs.tsx` is a server component. The last item automatically gets `aria-current="page"`. Uses native `<a>` — swap for your framework's link primitive (Next `<Link>`, Astro `<a>`, etc.) if you need client-side navigation.

## Rules

- **Mark the final item with `aria-current="page"`.** Without it the trailing `›` separator will still render and the colour stays in the active-link tone — both wrong for the current page.
- **Use an `<ol>`, not `<ul>`.** Order is meaningful (the trail goes left-to-right) and Tegel's CSS targets `.tl-breadcrumbs ol`.
- **Don't add classes to `<li>` or `<a>`.** All styling cascades from the root and from `[aria-current]`.
- **Wrap with `<nav aria-label="Breadcrumb">`** for screen readers — the root is a `<nav>` already, but the label is your responsibility.
- **`pointer-events: none` is enforced on the current page.** That makes the link unclickable; if you also need it visually disabled, `[aria-current="page"]:hover` is wired to `cursor: not-allowed`.
