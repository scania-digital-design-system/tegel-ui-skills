# Tabs

Three sibling components share this file. They are visually and structurally distinct, but each follows the same pattern: a horizontal scrolling container of tab buttons, with one selected at a time. Selection state is yours to manage — Tegel only ships the styling.

| Component | Look | Container class | Tab class |
|---|---|---|---|
| `InlineTabs` | Underline-style — text-only buttons with an animated bottom indicator | `tl-inline-tabs` | `tl-inline-tabs__tab` |
| `FolderTabs` | Folder/card-style — surface-tinted buttons with a top accent bar | `tl-folder-tabs` (+ `--primary` / `--secondary`) | `tl-folder-tabs__tab` |
| `NavigationTabs` | Page-level nav — same shape as InlineTabs but with deeper vertical padding | `tl-navigation-tabs` | `tl-navigation-tabs__tab` |

**Compound:** no (flat container + buttons)
**Theme-aware:** yes (variants and indicator colours are token-driven; brand class adjusts the transparent/dark backgrounds)
**CSS files:**
- Container CSS: `tl-inline-tabs.css`, `tl-folder-tabs.css`, `tl-navigation-tabs.css` — **all bundled in `components.css`** (token blocks + scroll-button rules).
- Per-tab button CSS: `tl-inline-tab.css`, `tl-folder-tab.css`, `tl-navigation-tab.css` (singular) — **NOT bundled in `components.css`**. Without these, the visual states (`--selected`, `--disabled`, hover indicators, focus rings) don't render and tabs look like native `<button>`s.
- The boilerplate's `scripts/copy-tegel.mjs` appends every `tl-*.css` file whose root class is missing from `components.css` — so InlineTab / FolderTab / NavigationTab styling lands automatically. See `tegel-lite-setup`.

## Markup

### InlineTabs

```html
<div class="tl-inline-tabs">
  <button class="tl-inline-tabs__tab tl-inline-tabs__tab--selected">Overview</button>
  <button class="tl-inline-tabs__tab">Specs</button>
  <button class="tl-inline-tabs__tab tl-inline-tabs__tab--disabled" disabled>Reviews</button>
</div>
```

### FolderTabs

```html
<div class="tl-folder-tabs tl-folder-tabs--primary">
  <button class="tl-folder-tabs__tab tl-folder-tabs__tab--selected">Files</button>
  <button class="tl-folder-tabs__tab">History</button>
</div>
```

### NavigationTabs

```html
<div class="tl-navigation-tabs">
  <button class="tl-navigation-tabs__tab tl-navigation-tabs__tab--selected">Home</button>
  <button class="tl-navigation-tabs__tab">Reports</button>
</div>
```

Containers also accept optional `__scroll-button` children for keyboard/desktop scroll affordance:

```html
<button class="tl-inline-tabs__scroll-button tl-inline-tabs__scroll-button--left">…</button>
<button class="tl-inline-tabs__scroll-button tl-inline-tabs__scroll-button--right">…</button>
```

## Modifiers

### Container

| Class | Effect |
|---|---|
| `tl-inline-tabs--primary` / `--secondary` | Background uses `--{...}-tab-background-{primary,secondary}` (transparent-light vs transparent-dark). |
| `tl-folder-tabs--primary` / `--secondary` | Selected tab surface is `--color-background-layer-01` (primary) or `--layer-02` (secondary). |
| `tl-navigation-tabs--primary` / `--secondary` | Same pattern as InlineTabs. |
| `tl-inline-tabs__scroll-button--left` / `--right` | Sticks the scroll button to the left or right edge with `z-index: 1`. Same suffix on `tl-folder-tabs__scroll-button` and `tl-navigation-tabs__scroll-button`. |

### Tab buttons

| Class | Effect |
|---|---|
| `tl-{inline,folder,navigation}-tabs__tab--selected` | Active tab. Inline/Navigation: bottom indicator at full width + strong text. Folder: surface flips to `--folder-tab-surface-selected` + 2px accent top border. |
| `tl-{inline,folder,navigation}-tabs__tab--disabled` | Disabled tone, `pointer-events: none`, no indicator/focus ring. |

## States

State styling on tab buttons uses pseudo-classes plus modifier classes:

| State | How |
|---|---|
| Hover (inline / navigation) | `:hover` — text colour shifts to strong; bottom indicator slides to 100% width. |
| Hover (folder) | `:hover:not(--disabled):not(--selected)` — surface flips to `--folder-tab-surface-hover`. |
| Focus (keyboard) | `:focus-visible` — Inline/Navigation: 2px inset focus ring drawn via `::before`. Folder: 2px outline at `-4px` offset. |
| Selected | `--selected` modifier — colour + indicator. |
| Disabled | `--disabled` modifier (or native `disabled` attribute) — disabled text colour, no pointer events. |

## Tokens consumed

### InlineTabs / NavigationTabs (shared shape, distinct namespaces)

- `--inline-tabs-tab` / `--navigation-tabs-tab` — text colour
- `--{ns}-tab-selected`, `--{ns}-tab-hover`, `--{ns}-tab-disabled`
- `--{ns}-tab-indicator-active`, `--{ns}-tab-indicator-hover` — bottom-bar colours
- `--{ns}-horizontal-divider` — bottom 1px line on the container
- `--{ns}-tab-background-{primary,secondary}` — transparent-light vs transparent-dark; brand-aware
- Typography: `--headline-07-*`
- Padding: 20px (Inline) / 26px (Navigation) vertical, 4px horizontal

### FolderTabs

- `--folder-tab-surface`, `--folder-tab-surface-hover`, `--folder-tab-surface-selected`
- `--folder-tab-text`, `--folder-tab-text-disabled`
- `--folder-tab-border-selected` (2px top accent)
- `--folder-tab-divider` (1px left divider between tabs)
- Typography: `--headline-07-*`
- Layout: `min-inline-size: 142px`, padding 16px

## Examples

### Plain HTML — controlled selection (vanilla JS)

```html
<div id="tabs" class="tl-inline-tabs">
  <button data-i="0" class="tl-inline-tabs__tab tl-inline-tabs__tab--selected">Overview</button>
  <button data-i="1" class="tl-inline-tabs__tab">Specs</button>
  <button data-i="2" class="tl-inline-tabs__tab">Reviews</button>
</div>
<script>
  document.getElementById('tabs').addEventListener('click', (e) => {
    const btn = e.target.closest('.tl-inline-tabs__tab')
    if (!btn || btn.classList.contains('tl-inline-tabs__tab--disabled')) return
    document.querySelectorAll('.tl-inline-tabs__tab--selected')
      .forEach(el => el.classList.remove('tl-inline-tabs__tab--selected'))
    btn.classList.add('tl-inline-tabs__tab--selected')
  })
</script>
```

### React binding (this project)

```tsx
import { InlineTabs, FolderTabs, NavigationTabs } from '@/src/tegel-components/Tabs'

// Uncontrolled
<InlineTabs tabs={[{ label: 'Overview' }, { label: 'Specs' }]} defaultSelected={0} />

// Controlled — pair with conditional content
const [tab, setTab] = useState(0)
<FolderTabs tabs={items} variant="secondary" selected={tab} onChange={setTab} />
{contents[tab]}
```

`src/tegel-components/Tabs.tsx` exports three named components. `InlineTabs` / `NavigationTabs` accept `tabs`, `defaultSelected`, `selected`, `onChange`. `FolderTabs` adds `variant: 'primary' | 'secondary'`.

## Rules

- **Per-tab CSS is in singular files (`tl-inline-tab.css`, etc.) which are NOT in `components.css`.** Without the copy-tegel append step, tabs render as bare native buttons. Run `pnpm dev` / `pnpm build` (which run `copy-tegel.mjs`) — see `tegel-lite-setup` for details.
- **Selection is your job.** Tegel ships no JS — toggling `--selected` is the framework / vanilla logic's responsibility.
- **Always include the container class.** The tab `__tab` class assumes the container's flex layout, indicator positioning, and scroll behaviour.
- **Disabled tabs need both the modifier and `pointer-events: none`.** The CSS sets `pointer-events: none` for `--disabled` already; just don't wire your click handler against it.
- **InlineTabs and NavigationTabs differ mostly in vertical padding** (20px vs 26px) — pick by IA: inline tabs sit above content within a section; navigation tabs sit at the page top.
- **FolderTabs needs a variant.** The `--primary` / `--secondary` selector is what sets the selected-surface colour; without it the selected state has no contrast.
- **Scroll buttons are optional.** They're sticky-positioned overlays — only include if you expect overflow on small screens.
