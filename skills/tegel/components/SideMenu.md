# SideMenu

A vertical navigation drawer. Behaves as a 272px persistent rail on desktop (≥ 992px) and as an overlay drawer on mobile, controlled by an `__wrapper--open` / `--closed` class. The `--collapsed` modifier shrinks the rail to an icon-only column on desktop. Tegel hides the overlay and close button automatically on desktop, so you don't have to.

**Root class:** `tl-side-menu`
**Compound:** yes
**Theme-aware:** yes (sizing, fonts, radius, divider treatment all flip per `.scania` / `.traton`)
**CSS file:** `tl-side-menu.css` (in `components.css` bundle)

## Markup

```html
<div class="tl-side-menu tl-side-menu--persistent">
  <div class="tl-side-menu__wrapper tl-side-menu__wrapper--open">
    <!-- Mobile-only overlay backdrop. Hidden on desktop by Tegel. -->
    <div class="tl-side-menu__overlay"></div>

    <aside class="tl-side-menu__aside">
      <div class="tl-side-menu__navigation">
        <div class="tl-side-menu__close">
          <button class="tl-side-menu__item" aria-label="Close side menu">
            <span class="tl-icon tl-icon--cross tl-icon--20" aria-hidden="true"></span>
          </button>
        </div>

        <div class="tl-side-menu__list-wrapper">
          <ul class="tl-side-menu__upper-list">
            <li>
              <a class="tl-side-menu__item tl-side-menu__item--selected" href="/">
                <span class="tl-icon tl-icon--home tl-icon--24" aria-hidden="true"></span>
                <span class="tl-side-menu__label">Home</span>
              </a>
            </li>
            <li>
              <a class="tl-side-menu__item" href="/fleet">
                <span class="tl-icon tl-icon--truck tl-icon--24" aria-hidden="true"></span>
                <span class="tl-side-menu__label">Fleet</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Optional: pinned items at the bottom of the rail -->
      <ul class="tl-side-menu__end-list">
        <li class="tl-side-menu__item"><!-- e.g. theme toggle --></li>
      </ul>

      <!-- Optional: collapse toggle (desktop only — auto-hidden on mobile) -->
      <button class="tl-side-menu__collapse tl-side-menu__item" aria-label="Collapse side menu">
        <span class="tl-icon tl-icon--chevron_left tl-icon--20" aria-hidden="true"></span>
        <span class="tl-side-menu__collapse-text">Collapse</span>
      </button>
    </aside>
  </div>
</div>
```

## Modifiers

| Class | Effect |
|---|---|
| `tl-side-menu--persistent` | At ≥ 992px the menu becomes a fixed 272px rail; overlay + close button auto-hidden. Without this, the menu disappears entirely on desktop. |
| `tl-side-menu--collapsed` | Desktop only — shrinks the rail to `--side-menu-collapsed-button-size` (~68–72px), hides item labels. |
| `tl-side-menu__wrapper--open` | Reveals the menu (mobile overlay shows; desktop persistent layout already visible). |
| `tl-side-menu__wrapper--closed` | Hides the menu on mobile (`display: none`). On desktop persistent it stays visible. |
| `tl-side-menu__wrapper--empty` | Hides the upper list and joins `__end-list` to the close-row spacing. |
| `tl-side-menu__item--selected` | Active state — accent left bar + selected surface. |
| `tl-side-menu__dropdown--open` | Rotates the `__item` chevron 180° and reveals `__dropdown-menu`. |
| `tl-side-menu__dropdown-item--selected` | Active state for sub-items inside a dropdown. |

## Sub-elements (compound)

| Class | Where it goes | Notes |
|---|---|---|
| `tl-side-menu__wrapper` | direct child of `tl-side-menu` | Pair with `--open` / `--closed`. Required. |
| `tl-side-menu__overlay` | inside `__wrapper` | Mobile backdrop. Click target for "tap outside to close". Hidden ≥ 992px on persistent. |
| `tl-side-menu__aside` | inside `__wrapper` | The actual rail/drawer surface. 80% width mobile, 272px desktop. |
| `tl-side-menu__navigation` | inside `__aside` | Holds close button + scrollable list. |
| `tl-side-menu__close` | inside `__navigation` | Mobile-only close-button row. Tegel hides this on desktop persistent. |
| `tl-side-menu__list-wrapper` | inside `__navigation` | Scrollable container for the lists. |
| `tl-side-menu__upper-list` | inside `__list-wrapper` | Top-level nav `<ul>`. Items are 1px-divided. |
| `tl-side-menu__end-list` | inside `__aside`, after `__navigation` | Pinned items at the bottom (toggles, profile, etc.). |
| `tl-side-menu__item` | child of any list (or used standalone) | Single row — fixed height, icon + `__label`. |
| `tl-side-menu__label` | inside `__item` | Text label. Hide via site CSS in `--collapsed` mode. |
| `tl-side-menu__dropdown` | wrapper around an `__item` + `__dropdown-menu` | Expandable group. Pair with `--open` to show. |
| `tl-side-menu__dropdown-menu` | inside `__dropdown` | The expandable submenu list. |
| `tl-side-menu__dropdown-list` | inside `__dropdown-menu` | The `<ul>` of sub-items. |
| `tl-side-menu__dropdown-item` | inside `__dropdown-list` | Single sub-item. |
| `tl-side-menu__dropdown-header` | inside collapsed-mode submenu | Visible only in `--collapsed` flyout. |
| `tl-side-menu__user`, `__user-image`, `__user-label` | profile-cell parts | Used in account-row variants. Hidden on desktop ≥ 992px. |
| `tl-side-menu__collapse` | direct child of `__aside` | Bottom collapse-toggle button. Auto-hidden on mobile. |
| `tl-side-menu__collapse-text` | inside `__collapse` | "Collapse" label — auto-hidden when `--collapsed` is on. |

## States

| State | How |
|---|---|
| Hover | `:hover` on `__item` — `--side-menu-item-state-hover` surface. |
| Active | `:active` — `--side-menu-item-state-active` surface. |
| Focus | `:focus-visible` — 2px inset accent-focus outline. |
| Selected | `--selected` modifier — 4px accent bar on the left. |
| Open dropdown | `__dropdown--open` — chevron rotates, `__dropdown-menu` becomes `display: block`. |
| Collapsed (desktop) | Add `--collapsed` to root — labels hidden via site CSS, hover-flyout reveals submenus. |

## Tokens consumed

- Surface: `--side-menu-background-cover` → `--color-background-base`
- Hover / active / selected: `--side-menu-item-state-hover`, `--side-menu-item-state-active`, `--side-menu-item-state-selected`
- Selected accent: `--side-menu-single-subitem-selected-border-color` → `--component--focus-ring-color-strong`
- Bottom divider: `--side-menu-bottom-menu-border-top` → `--component-side-menu-color-divider`
- Collapsed sizing: `--side-menu-collapsed-button-size` (68px Scania, 72px Traton)
- Width: 272px persistent; collapsed = `--side-menu-collapsed-button-size`
- Typography: `--side-menu-text-item-*` (font family, size, weight differ Scania vs Traton)
- Stacking: hard-coded `z-index: 500`. Pair with header z-index ≥ 600 if header is sticky.

## Examples

### Plain HTML

```html
<div class="tl-side-menu tl-side-menu--persistent">
  <div class="tl-side-menu__wrapper tl-side-menu__wrapper--open">
    <div class="tl-side-menu__overlay"></div>
    <aside class="tl-side-menu__aside">
      <div class="tl-side-menu__navigation">
        <div class="tl-side-menu__close">
          <button class="tl-side-menu__item" aria-label="Close side menu">
            <span class="tl-icon tl-icon--cross tl-icon--20" aria-hidden="true"></span>
          </button>
        </div>
        <div class="tl-side-menu__list-wrapper">
          <ul class="tl-side-menu__upper-list">
            <li><a class="tl-side-menu__item tl-side-menu__item--selected" href="/">
              <span class="tl-icon tl-icon--home tl-icon--24" aria-hidden="true"></span>
              <span class="tl-side-menu__label">Home</span>
            </a></li>
            <li><a class="tl-side-menu__item" href="/fleet">
              <span class="tl-icon tl-icon--truck tl-icon--24" aria-hidden="true"></span>
              <span class="tl-side-menu__label">Fleet</span>
            </a></li>
          </ul>
        </div>
      </div>
    </aside>
  </div>
</div>
```

### React binding (this project)

```tsx
import SideMenu from '@/src/tegel-components/SideMenu'

<SideMenu
  isOpen={sideMenuOpen}
  onClose={() => setSideMenuOpen(false)}
  collapsed={collapsed}
  onCollapseToggle={() => setCollapsed(c => !c)}
  navItems={[{ href: '/', label: 'Home', icon: 'home' }]}
/>
```

`src/tegel-components/SideMenu.tsx` is built on `--persistent` + `usePathname()` for active-state detection. Auto-closes on mobile when an item is clicked. Includes a Scania ↔ Traton brand toggle in `__end-list`.

### Companion site CSS (typical)

```css
/* Hide the menu entirely when closed on mobile (Tegel keeps it visible on desktop persistent) */
@media (max-width: 991.98px) {
  .site-shell--menu-closed > .tl-side-menu { display: none; }
}

/* Hide labels and pinned items in collapsed (icon-rail) mode */
.tl-side-menu--collapsed .tl-side-menu__label,
.tl-side-menu--collapsed .tl-side-menu__end-list { display: none; }
.tl-side-menu--collapsed .tl-side-menu__item { justify-content: center; }
```

## Rules

- **`--persistent` is required if you want a desktop rail.** Without it, Tegel hides the side menu at ≥ 992px (`display: none`).
- **Mobile vs desktop are different worlds.** On mobile the menu is a `position: fixed` overlay you toggle via `__wrapper--open` / `--closed`. On desktop persistent it's a static 272px column whose width changes only when `--collapsed` is added. Don't try to manage close-button or overlay visibility from JS — Tegel CSS already hides them on desktop.
- **`--collapsed` is a desktop-only effect.** Tegel scopes the `width` rules to `min-width: 992px`. Toggling it on mobile is a no-op visually.
- **Always wrap label text in `<span class="tl-side-menu__label">`.** Site CSS hides this exact selector in collapsed mode; bare text or other wrappers won't get hidden.
- **`tl-side-menu__collapse` only renders on desktop persistent.** It's `display: none` by default and only flips to `display: flex` at ≥ 992px under `--persistent`. Don't expect it to do anything on mobile.
- **`z-index: 500` is hard-coded on the root.** If you have a sticky header that uses `--tds-z-index-header`, make sure that variable resolves to ≥ 600 so the header stacks above the side menu.
- **The overlay's click handler must call your close logic.** Tegel doesn't ship behaviour — only styling.
