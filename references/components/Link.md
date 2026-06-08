# Link

A styled inline `<a>` (or `<span>` when disabled). Inherits `font` from its parent by default — drop it into body copy and it becomes an accent-colored, optionally-underlined inline link. Pair with `tl-link--standalone` to give it the detail-02 type style on its own line. An optional trailing icon is supported.

**Root class:** `tl-link`
**Compound:** has one optional `__icon` child
**Theme-aware:** yes (focus outline width changes between Scania 2px and Traton 4px; surfaces inside `tl-banner` / `tl-toast` recolor the link automatically)
**CSS file:** `tl-link.css` (in `components.css` bundle)

## Markup

```html
<!-- Inline link inside copy -->
<p>
  Read the <a class="tl-link tl-link--underline" href="/docs">documentation</a>.
</p>

<!-- Standalone link with trailing icon -->
<a class="tl-link tl-link--standalone" href="/docs">
  Documentation
  <span class="tl-link__icon">
    <span class="tl-icon tl-icon--arrow_right tl-icon--16" aria-hidden="true"></span>
  </span>
</a>

<!-- Disabled — render a <span>, not <a> -->
<span class="tl-link tl-link--disabled">Coming soon</span>
```

## Modifiers

| Class | Effect |
|---|---|
| `tl-link--underline` | Adds and keeps `text-decoration: underline` (default link has no underline). |
| `tl-link--standalone` | Applies detail-02 typography (`font-family/size/weight/letter-spacing`) so the link reads correctly outside body copy. |
| `tl-link--disabled` | Greys color, sets `cursor: not-allowed`, blocks `pointer-events`. **Use on a `<span>`** — disabled `<a>` isn't a real concept. |

There's also automatic styling when nested:
- Inside `.tl-banner` → uses info color
- Inside `.tl-toast` → uses info color, with hover reverting to accent color

There is **no** size variant. There is no left-icon variant — the icon slot only sits trailing.

## Sub-elements

| Class | Where it goes | Notes |
|---|---|---|
| `tl-link__icon` | last child of `tl-link` | Wraps a single `tl-icon` and adds `margin-left: 8px` plus inherits link color on hover/visited/active. |

## States

| State | How |
|---|---|
| Hover | `:hover` — color shifts to `--link-hover` (same as default but the rule explicitly sets `text-decoration-color`). |
| Focus (keyboard) | `:focus-visible` — outline (2px Scania, 4px Traton) using `--link-focus-outline-color`, offset 1px. |
| Active | `:active` — sets `text-decoration-color: var(--link)`. |
| Visited | `:visited` — uses `--link-visited`. |
| Disabled | `tl-link--disabled` — uses `--link-disabled`, blocks pointer events. |

## Tokens consumed

- `--color-foreground-text-accent-default` → `--link`
- `--color-foreground-text-accent-default` → `--link-hover` (intentionally same as default)
- `--color-foreground-text-accent-visited` → `--link-visited`
- `--color-foreground-text-disabled` → `--link-disabled`
- `--color-foreground-border-accent-focus` → `--link-focus-outline-color`
- `--link-focus-outline-width` — 2px Scania / 4px Traton (set by brand class)
- Typography (when `--standalone`): `--detail-02-*`

## Examples

### Plain HTML

```html
<!-- Inline within text -->
<p>Visit our <a class="tl-link tl-link--underline" href="/help">help center</a> for more.</p>

<!-- Standalone -->
<a class="tl-link tl-link--standalone" href="/about">About us</a>

<!-- With trailing arrow -->
<a class="tl-link tl-link--standalone" href="/docs">
  Documentation
  <span class="tl-link__icon">
    <span class="tl-icon tl-icon--arrow_right tl-icon--16" aria-hidden="true"></span>
  </span>
</a>

<!-- External — pair `target="_blank"` with `rel="noopener"` and an external icon -->
<a class="tl-link tl-link--standalone" href="https://example.com" target="_blank" rel="noopener noreferrer">
  External resource
  <span class="tl-link__icon">
    <span class="tl-icon tl-icon--export tl-icon--16" aria-hidden="true"></span>
  </span>
</a>

<!-- Disabled -->
<span class="tl-link tl-link--disabled">Currently unavailable</span>
```

### React binding (this project)

```tsx
import Link from '@/src/tegel-components/Link'

<Link href="/about" underline>About us</Link>
<Link href="/docs" standalone icon="arrow_right">Documentation</Link>
<Link href="https://example.com" target="_blank" icon="export">External</Link>
<Link disabled>Coming soon</Link>
```

Props: `href` (default `'#'`), `children`, `underline`, `standalone`, `disabled`, `icon` (string, trailing position), `target`. The wrapper renders `<a>` normally, or `<span>` when `disabled`. Server-renderable.

> **This is NOT Next.js `<Link>`.** It's a styled `<a>`. For client-side navigation in Next.js, either:
>
> - Use Next.js `<Link>` directly and apply Tegel classes manually:
>   ```tsx
>   import NextLink from 'next/link'
>   <NextLink href="/about" className="tl-link tl-link--underline">About</NextLink>
>   ```
> - Or wrap Tegel's Link with a Next.js `<Link>`'s `legacyBehavior` pattern.
>
> The Tegel wrapper's `href` triggers a full-page navigation, not Next.js routing.

## Rules

- **Disabled renders as `<span>`.** Don't wrap a disabled `<a>` — browsers don't honour `disabled` on anchors. The Tegel wrapper handles this automatically.
- **`tl-link__icon` only sits at the trailing edge.** There's no leading-icon variant in the CSS.
- **Set `rel="noopener noreferrer"` on external `target="_blank"` links.** Tegel doesn't add this for you — it's a security/perf best practice.
- **Inside Banner / Toast the link recolors automatically.** Don't override `--link` locally inside those surfaces — the parent rule sets info color and a different hover.
- **`tl-link--standalone` is for outside body copy.** Inside a paragraph, use no modifier (or `--underline`) so the link inherits the surrounding text size.
- **For Next.js client-side navigation, don't use this wrapper directly.** Compose with `next/link` (see note above) or visit URLs via the wrapper expecting a hard navigation.
