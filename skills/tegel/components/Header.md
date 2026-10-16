# Header

A full-width application bar pinned to the top of the viewport. Compound — combines a hamburger / nav-item toggle list (left), a title, a flexible middle spacer, and a right-aligned cluster of nav items + brand logo. Items are styled via interchangeable `tl-header__item-wrapper` cells separated by 1px dividers.

**Root class:** `tl-header`
**Compound:** yes
**Theme-aware:** yes (background and brand-logo SVG flip per `.scania` / `.traton` and `.tds-mode-{light,dark}`)
**CSS file:** `tl-header.css` (in `components.css` bundle)

## Markup

```html
<header class="tl-header">
  <nav class="tl-header__nav">
    <ul class="tl-header__list">
      <!-- Hamburger (always visible — including mobile) -->
      <li class="tl-header__item">
        <button class="tl-header__item-wrapper" aria-label="Toggle side menu">
          <span class="tl-icon tl-icon--burger tl-icon--20" aria-hidden="true"></span>
        </button>
      </li>

      <!-- Title -->
      <li class="tl-header__title">
        <h4 class="tl-header__title-text">My Application</h4>
      </li>

      <!-- Flexible spacer pushes the rest right -->
      <li class="tl-header__middle-spacer"></li>

      <!-- Optional nav cells (one per "bento" slot) -->
      <li class="tl-header__item">
        <button class="tl-header__item-wrapper" aria-label="User menu">
          <span class="tl-icon tl-icon--profile tl-icon--20" aria-hidden="true"></span>
        </button>
      </li>

      <!-- Brand logo (right-most) -->
      <li class="tl-header__item">
        <a class="tl-header__item-wrapper" href="/">
          <div class="tl-header__brand"></div>
        </a>
      </li>
    </ul>
  </nav>
</header>
```

## Modifiers

`.tl-header` itself takes no variant. State modifiers attach to individual items / dropdown wrappers:

| Class | Effect |
|---|---|
| `tl-header__item--pressed` | Cell shows pressed/active inset border + selected surface. |
| `tl-header__item--selected` | Cell shows a 4px bottom border accent. |
| `tl-header__dropdown-wrapper--open` | Dropdown trigger surface flips to "open" tone, raises z-index. |
| `tl-header__dropdown-wrapper--selected` | 4px bottom accent. |
| `tl-header__dropdown-wrapper--pressed` | Inset accent border. |
| `tl-header__dropdown-icon--rotated` | Rotates the chevron 180°. |
| `tl-header__dropdown-menu--open` | Reveals the dropdown panel (default `display: none`). |
| `tl-header__user-menu--open` | Same for the user-avatar panel. |
| `tl-header__launcher-menu--open` / `…--grid--open` | Same for app-launcher panels. |

## Sub-elements (compound)

| Class | Where it goes | Notes |
|---|---|---|
| `tl-header__nav` | child of `tl-header` | `<nav>` wrapper. |
| `tl-header__list` | inside `tl-header__nav` | `<ul>` flex row at `--tds-header-height`. |
| `tl-header__item` | `<li>` inside `tl-header__list` | One bento cell. Hidden by default below 992px **except** items that contain a `tl-icon--burger` or `tl-header__brand`. |
| `tl-header__item-wrapper` | inside `tl-header__item` | The clickable surface (use `<button>` or `<a>`). Renders the divider, hover, and focus ring. |
| `tl-header__title` | `<li>` inside list | Title cell — has the right-divider. |
| `tl-header__title-text` | inside `tl-header__title` | The title text node (`<h4>` recommended). |
| `tl-header__middle-spacer` | `<li>` inside list | `flex-grow: 1` divider that pushes following items right. |
| `tl-header__brand` | inside an `__item-wrapper` | 30px-tall slot painted with the brand SVG via `--header-logotype-*`. |
| `tl-header__dropdown` | `<li>` inside list | Container for a trigger + popover panel; auto-hides below 992px unless it carries `tl-icon--bento`. `position: relative` — the popover anchors here. |
| `tl-header__dropdown-wrapper` | inside `tl-header__dropdown` | Trigger button (same hover/focus rules as `__item-wrapper`). Has `display: flex; align-items: center; gap: 8px; padding: 0 24px` built in — do **not** add custom margin/padding to its children. |
| `tl-header__dropdown-icon` | chevron `<span>` inside the trigger | Holds the `transition: transform 0.2s ease`. **Must be present alongside `tl-icon` / `tl-icon--chevron_down` / `tl-icon--16`** — without it, `--rotated` snaps without animating. |
| `tl-header__dropdown-menu` | inside `tl-header__dropdown` | Absolute popover panel (default hidden — see `--open`). |
| `tl-header__dropdown-menu-item` | wrapper element inside `tl-header__dropdown-menu` | **Wrapper, not the link.** The clickable `<a>` or `<button>` is a CHILD of this `<div>`. Tegel CSS targets `.tl-header__dropdown-menu-item a` and `… button` for the row's height (`--tds-header-list-item-md-height`), 24px horizontal padding, detail-02 typography, hover surface, and focus ring. Putting classes on the link directly leaves it unstyled. Add `--selected` to the wrapper for the active row's left accent. |
| `tl-header__user-menu`, `__user-menu-item`, `__user-menu-image`, `__user-menu-content`, `__user-menu-header`, `__user-menu-subheader` | account-panel parts | Profile-flyout structure. |
| `tl-header__launcher-menu`, `__launcher-menu-list`, `__launcher-menu-item`, `__launcher-menu-title`, `__launcher-menu-grid` | app-launcher parts | Bento-grid app picker. |

## States

State styling uses standard pseudo-classes on the inner wrappers:

| State | How |
|---|---|
| Hover | `:hover` on `__item-wrapper` / `__dropdown-wrapper` — flips to `--header-item-hover`. |
| Focus | `:focus-visible` — 2px inset accent-focus shadow. |
| Open | `--open` modifier on the dropdown wrapper raises z-index above `--tds-z-index-header`. |

## Tokens consumed

- Surface: `--header-background` → `--component-header-color-background` (brand-coloured)
- Foreground: `--header-nav-item`, `--header-nav-item-dropdown-opened`
- Hover / pressed / selected: `--header-item-hover`, `--header-basic-element-background-{pressed,selected}`
- Dividers: `--header-basic-element-border`
- Brand logo: `--header-logotype-local`, `--header-logotype-cdn`, `--header-brand-item-width`, `--header-brand-logo-size`
- Typography: `--headline-07-*` (item-wrapper), `--header-font-family-headline` / `--header-font-weight` / `--header-text-transform` (title)
- Layout: `--tds-header-height`
- Stacking: `--tds-z-index-header` — **Tegel references it but never defines it.** This boilerplate sets `--tds-z-index-header: 600` in site CSS so dropdown panels and the header itself stack correctly. Without that override, sticky headers + popovers will fight other layers.

## Examples

### Plain HTML

```html
<header class="tl-header">
  <nav class="tl-header__nav">
    <ul class="tl-header__list">
      <li class="tl-header__item">
        <button class="tl-header__item-wrapper" aria-label="Toggle menu">
          <span class="tl-icon tl-icon--burger tl-icon--20" aria-hidden="true"></span>
        </button>
      </li>
      <li class="tl-header__title">
        <h4 class="tl-header__title-text">Fleet Manager</h4>
      </li>
      <li class="tl-header__middle-spacer"></li>
      <li class="tl-header__item">
        <button class="tl-header__item-wrapper" aria-label="User menu">
          <span class="tl-icon tl-icon--profile tl-icon--20" aria-hidden="true"></span>
        </button>
      </li>
      <li class="tl-header__item">
        <a class="tl-header__item-wrapper" href="/"><div class="tl-header__brand"></div></a>
      </li>
    </ul>
  </nav>
</header>
```

### Dropdown panel (canonical structure)

The dropdown is the most common shape to get wrong because the menu-item is a **wrapper**, not the link itself. Keep the structure exactly like this — Tegel's selectors won't match otherwise:

```html
<li class="tl-header__dropdown">
  <!-- Trigger -->
  <button
    class="tl-header__dropdown-wrapper tl-header__dropdown-wrapper--open"
    type="button"
    aria-expanded="true"
    aria-haspopup="menu"
  >
    <span>Operations</span>
    <!-- Chevron MUST carry tl-header__dropdown-icon for the rotation
         transition. Add tl-header__dropdown-icon--rotated on open. -->
    <span
      class="tl-header__dropdown-icon tl-header__dropdown-icon--rotated tl-icon tl-icon--chevron_down tl-icon--16"
      aria-hidden="true"
    ></span>
  </button>

  <!-- Popover panel — flip --open to show -->
  <div class="tl-header__dropdown-menu tl-header__dropdown-menu--open" role="menu">
    <!-- Each row: WRAPPER div with the menu-item class, link/button is a CHILD -->
    <div class="tl-header__dropdown-menu-item tl-header__dropdown-menu-item--selected">
      <a role="menuitem" href="/">Fleet</a>
    </div>
    <div class="tl-header__dropdown-menu-item">
      <a role="menuitem" href="/routes">Routes</a>
    </div>
    <div class="tl-header__dropdown-menu-item">
      <button role="menuitem" type="button">Sign out</button>
    </div>
  </div>
</li>
```

The bare link form (`<a class="tl-header__dropdown-menu-item">…</a>`) is what most authors reach for and is silently wrong — the row will render with no padding, default typography, no hover, no divider, no fixed height.

State to manage in JS (Tegel only ships the styling):

| Toggle | When |
|---|---|
| `tl-header__dropdown-wrapper--open` on the trigger | While the panel is open (raises z-index above `--tds-z-index-header`). |
| `tl-header__dropdown-icon--rotated` on the chevron | While the panel is open (rotates 180°). |
| `tl-header__dropdown-menu--open` on the panel | While the panel is open (`display: block`; default is `display: none`). |
| `tl-header__dropdown-menu-item--selected` on the row wrapper | For the active route. |

Close the panel on outside click and on `Escape` — Tegel doesn't ship that behaviour.

### Theme-toggle in a header cell (boilerplate pattern)

The boilerplate places a Toggle inside a `tl-header__item-wrapper`. The off-state slider blends into the dark brand-coloured surface, so site CSS retunes a few `inverse-*` tokens:

```css
.header-theme-toggle .tl-header__item-wrapper { cursor: default; padding: 0 var(--tds-spacing-element-16); }
.header-theme-toggle .tl-header__item-wrapper:hover { background-color: var(--header-background); }
.header-theme-toggle .tl-toggle {
  --toggle-background-off: var(--color-icon-inverse-subtle);
  --toggle-switch:         var(--color-text-inverse-strong);
  --toggle-text:           var(--color-text-inverse-strong);
}
```

### React binding (this project)

```tsx
import Header from '@/src/tegel-components/Header'

<Header title="Fleet Manager" onHamburgerClick={() => setSideMenuOpen(v => !v)} />
```

`src/tegel-components/Header.tsx` is a pre-wired demo: hamburger + title + theme toggle + profile `PopoverMenu` + brand logo. Props: `title`, `onHamburgerClick`. Customise by editing the file directly.

## Rules

- **Items below 992px are hidden by default.** Tegel only shows items containing `tl-icon--burger` or `tl-header__brand` on mobile. Either keep mobile-relevant actions in the side menu, or write site CSS to override per-item.
- **The header is `position: static` by default.** For sticky behaviour, add site CSS (`position: sticky; top: 0;`) and ensure `--tds-z-index-header` is defined (Tegel doesn't ship a value).
- **Dropdown panels need `--open` to be visible** — the base `tl-header__dropdown-menu` is `display: none`. Toggle the modifier from JS.
- **`tl-header__dropdown-menu-item` is a wrapper, NOT the link.** Put the class on a `<div>` and nest the `<a>` or `<button>` inside. Tegel's row styling lives on `.tl-header__dropdown-menu-item a` / `… button`, so a self-classed `<a class="tl-header__dropdown-menu-item">` will render unstyled — no fixed height, no padding, no hover, no divider. This is the most common dropdown bug.
- **Chevron rotation needs the base `tl-header__dropdown-icon` class.** That selector holds `transition: transform 0.2s ease`. Adding only `tl-header__dropdown-icon--rotated` will snap; the icon should always carry both `tl-header__dropdown-icon` and the `tl-icon` / `tl-icon--chevron_down` / size classes, with `--rotated` toggled on open.
- **Don't add margin to children of `tl-header__dropdown-wrapper`.** The wrapper has `display: flex; gap: 8px` — the spacing between the label and the chevron is already correct. Custom margins double-space.
- **Trigger and panel both need `--open` synced.** The wrapper's `--open` raises z-index above the header so the panel can hover over the page; the panel's `--open` is what makes it visible. Toggle them together — one without the other looks visually broken.
- **Brand logo is a CSS background, not an `<img>`.** Width/height are token-driven; don't put markup inside `tl-header__brand`.
- **`tl-header__item-wrapper` resets `all: unset`.** That includes `cursor`, so an `<a>` won't get pointer; the rule sets `cursor: pointer` for you. Don't override unless intentional.
- **Pair with SideMenu** — the boilerplate wires the hamburger to flip side-menu open/collapsed depending on viewport. See `tegel-lite-setup` for the sticky-header + sticky-side-menu z-index recipe.
