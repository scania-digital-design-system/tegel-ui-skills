# Footer

A two-section page footer. The top section holds collapsible link groups (1–4 columns, auto-laid out by count). The main section below carries legal links on the left, social-icon links on the right, and a copyright + brand-logotype row at the very bottom.

**Root class:** `tl-footer`
**Compound:** yes
**Theme-aware:** yes (background flips per `--component-footer-primary` / brand logo SVG)
**CSS file:** `tl-footer.css` (in `components.css` bundle)

## Markup

```html
<footer class="tl-footer tl-footer--primary">
  <!-- Optional top section: collapsible link groups -->
  <div class="tl-footer__top">
    <div class="tl-footer__group" role="list">
      <button class="tl-footer__top-title" type="button">Documentation</button>
      <a href="/components" class="tl-footer__link">Components</a>
      <a href="/tokens"     class="tl-footer__link">Tokens</a>
    </div>
    <!-- repeat .tl-footer__group … -->
  </div>

  <!-- Required main section -->
  <div class="tl-footer__main">
    <div class="tl-footer__main-top">
      <div class="tl-footer__main-top--start">
        <div class="tl-footer__group" role="list">
          <a href="/privacy" class="tl-footer__link">Privacy</a>
          <a href="/cookies" class="tl-footer__link">Cookies</a>
        </div>
      </div>
      <div class="tl-footer__main-top--end">
        <div class="tl-footer__group" role="list">
          <a href="https://…" class="tl-footer__link" aria-label="LinkedIn"
             target="_blank" rel="noreferrer noopener">
            <span class="tl-icon tl-icon--profile tl-icon--16" aria-hidden="true"></span>
          </a>
        </div>
      </div>
    </div>
    <div class="tl-footer__main-bottom">
      <small class="tl-footer__copyright">© 2026 Scania CV AB. All rights reserved.</small>
      <p class="tl-footer__brand">Scania</p>
    </div>
  </div>
</footer>
```

## Modifiers

| Class | Effect |
|---|---|
| `tl-footer--primary` | Top section uses `--color-background-layer-01`. Default for most layouts. |
| `tl-footer--secondary` | Top section uses `--color-background-base` (sits flatter against the page). |
| `tl-footer__group--expanded` | Mobile only — reveals the group's links beneath the title (default collapsed below 992px). |

## Sub-elements (compound)

| Class | Where it goes | Notes |
|---|---|---|
| `tl-footer__top` | direct child of `tl-footer` | Optional top band. Auto-flexes 1–4 groups. Hidden when omitted. |
| `tl-footer__group` | inside `__top` or inside `__main-top--start` / `--end` | Holds a title + links (top) or just links (main). |
| `tl-footer__top-title` | first child of `__top` `__group` | Section heading. **`<button>` is required** — it is the click target on mobile. |
| `tl-footer__link` | inside any `__group` | `<a>` link. Treat as inline-block. |
| `tl-footer__main` | direct child of `tl-footer` | Required. Holds the divider row + copyright row. |
| `tl-footer__main-top` | inside `__main` | Flex row of `--start` (legal) and `--end` (social). |
| `tl-footer__main-top--start` | inside `__main-top` | Left side. Flex row of links. |
| `tl-footer__main-top--end` | inside `__main-top` | Right side. `margin-left: auto` pushes it right on desktop. |
| `tl-footer__main-bottom` | inside `__main` | Bottom row separated by 1px top border. |
| `tl-footer__copyright` | inside `__main-bottom` | `<small>` with `--detail-02-*`. |
| `tl-footer__brand` | inside `__main-bottom` | Brand-logotype slot — painted via `--component-footer-logotype-*` (background image, no `<img>`). |

## States

State styling on links uses standard pseudo-classes:

| State | How |
|---|---|
| Hover | `:hover` — underline. |
| Focus (keyboard) | `:focus-visible` — `--dimension-radius-focus-width` accent outline + 1px white halo. |
| Mobile collapse | `__group--expanded` exposes the links; the `::after` chevron rotates 180°. |

## Tokens consumed

- Top surface: `--footer-top-background` (variant-driven), `--footer-top-divider`, `--footer-top-button-active`
- Top links: `--footer-top-links`, `--footer-top-links-desktop`, `--footer-top-links-background-hover`
- Main surface: `--footer-main-background` → `--component-footer-primary`
- Main links + divider: `--footer-main-links`, `--footer-main-divider`
- Copyright text: `--footer-main-copyright` → `--component-footer-text-color-copyright`
- Typography: `--headline-07-*` (titles + links), `--detail-02-*` (copyright)
- Brand logo: `--component-footer-logotype-cdn`, `--component-footer-logotype-local` (117px wide × 20px tall)

## Examples

### Plain HTML (full)

```html
<footer class="tl-footer tl-footer--primary">
  <div class="tl-footer__top">
    <div class="tl-footer__group" role="list">
      <button class="tl-footer__top-title" type="button">Components</button>
      <a class="tl-footer__link" href="/button">Button</a>
      <a class="tl-footer__link" href="/card">Card</a>
    </div>
    <div class="tl-footer__group" role="list">
      <button class="tl-footer__top-title" type="button">Resources</button>
      <a class="tl-footer__link" href="https://figma.com" target="_blank" rel="noreferrer noopener">Figma</a>
    </div>
  </div>
  <div class="tl-footer__main">
    <div class="tl-footer__main-top">
      <div class="tl-footer__main-top--start">
        <div class="tl-footer__group" role="list">
          <a class="tl-footer__link" href="/privacy">Privacy</a>
          <a class="tl-footer__link" href="/terms">Terms</a>
        </div>
      </div>
      <div class="tl-footer__main-top--end">
        <div class="tl-footer__group" role="list">
          <a class="tl-footer__link" aria-label="LinkedIn" href="#" target="_blank" rel="noreferrer noopener">
            <span class="tl-icon tl-icon--profile tl-icon--16" aria-hidden="true"></span>
          </a>
        </div>
      </div>
    </div>
    <div class="tl-footer__main-bottom">
      <small class="tl-footer__copyright">© 2026 Scania CV AB.</small>
      <p class="tl-footer__brand">Scania</p>
    </div>
  </div>
</footer>
```

### React binding (this project)

```tsx
import Footer from '@/src/tegel-components/Footer'

<Footer
  groups={[{ title: 'Docs', links: [{ label: 'Components', href: '/components' }] }]}
  legalLinks={[{ label: 'Privacy', href: '/privacy' }]}
  socialLinks={[{ platform: 'LinkedIn', href: '#', iconName: 'profile' }]}
  copyright="© 2026 Scania CV AB"
  brand="Scania"
/>
```

`src/tegel-components/Footer.tsx` exposes `groups`, `legalLinks`, `socialLinks`, `copyright`, `brand`. Pass `groups={[]}` to suppress the top section. The `external` flag toggles `target="_blank"` + `rel`.

## Rules

- **`tl-footer__top-title` must be a `<button>`.** Below 992px Tegel turns it into the click target that toggles `--expanded` — a `<div>` won't be focusable or interactive.
- **Top groups are auto-laid-out by count.** 1, 2, 3, or 4+ groups switch between `100%`, `50%`, `33%`, `25%` widths via `:nth-last-child` rules. Don't override widths.
- **Tegel ships no brand-logo icons** (no facebook/twitter/linkedin/youtube). Map social platforms to the closest semantic Tegel icon (`profile`, `audio`, `camera`, `export`).
- **Social links should always be `target="_blank"`** with a real `aria-label` — they're icon-only.
- **`tl-footer__brand` is a CSS background.** Width/height are fixed (117×20). The text inside is hidden with `text-indent: -9999px` for SR-only readout.
- **The bottom-bar copyright clamps to `calc(100% - 117px - 16px)`.** Long strings wrap rather than overlap the brand mark.
