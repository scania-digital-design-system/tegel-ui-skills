# Table

A data table built on a real `<table>` element. Compound — header / body / footer / row / cell sub-elements all carry distinct classes. Supports sortable columns, row selection, expandable rows, zebra striping, vertical dividers, horizontal scroll, a caption-based toolbar, and a compact density.

**Root class:** `tl-table`
**Compound:** yes
**Theme-aware:** yes (variant interacts with `tds-mode-dark` for `--secondary` hover)
**CSS file:** `tl-table.css` (in `components.css` bundle)

## Markup

```html
<table class="tl-table tl-table--primary tl-table--responsive">
  <caption class="tl-table__toolbar"><!-- optional toolbar / title --></caption>

  <thead class="tl-table__header">
    <tr class="tl-table__row">
      <th class="tl-table__header-cell tl-table__header-cell--checkbox"></th>
      <th class="tl-table__header-cell tl-table__header-cell--sortable">
        <button class="tl-table__header-button" type="button">
          <span class="tl-table__header-button-text">Name</span>
          <span class="tl-table__header-button-icon tl-icon tl-icon--sorting tl-icon--16" aria-hidden="true"></span>
        </button>
      </th>
      <th class="tl-table__header-cell">Email</th>
    </tr>
  </thead>

  <tbody class="tl-table__body">
    <tr class="tl-table__row">
      <td class="tl-table__body-cell tl-table__body-cell--checkbox"><!-- checkbox --></td>
      <td class="tl-table__body-cell">Alice</td>
      <td class="tl-table__body-cell">alice@example.com</td>
    </tr>
  </tbody>

  <tfoot class="tl-table__footer">
    <tr class="tl-table__footer-row">
      <td class="tl-table__footer-cell" colspan="3">Total: 1 row</td>
    </tr>
  </tfoot>
</table>
```

## Modifiers

### Variant (one)

| Class | Effect |
|---|---|
| `tl-table--primary` | Default surface. |
| `tl-table--secondary` | Inverted zebra base — `--secondary` cells are surface-200; zebra rows take the primary tint. |

### Density / Sizing

| Class | Effect |
|---|---|
| `tl-table--compact` | Reduced cell height + padding (32px row, 8px vertical pad). |
| `tl-table--responsive` | `width: 100%` — fills container. |
| `tl-table--no-min-width` | Removes the 192px min-width on header/body cells. |
| `tl-table--no-padding` | Removes padding from body cells. |
| `tl-table--no-header-padding` | Removes padding from header cells. |

### Visual styling

| Class | Effect |
|---|---|
| `tl-table--vertical-dividers` | Adds vertical 1px dividers between body cells. |
| `tl-table--zebra-rows-odd` | Stripe odd `<tr>` in body. |
| `tl-table--zebra-rows-even` | Stripe even `<tr>`. |
| `tl-table--zebra-columns-odd` | Stripe odd cells in each row. |
| `tl-table--zebra-columns-even` | Stripe even cells. |

### Behavior

| Class | Effect |
|---|---|
| `tl-table--clickable` | All body rows get pointer cursor. |
| `tl-table--horizontal-scroll` | `display: block; overflow-x: auto` — pair with explicit `width` for the scroll container. |

### Text alignment (apply on root)

`tl-table--header-text-align-{left\|start\|center\|right\|end}` — header cells.
`tl-table--cell-text-align-{left\|start\|center\|right\|end}` — body cells.

## Sub-elements (compound)

| Class | Where it goes | Notes |
|---|---|---|
| `tl-table__toolbar` | `<caption>` direct child of `tl-table` | Renders as a `display: table-caption` row at the top. Contains `__upper-bar`, `__title`, action bars. |
| `tl-table__upper-bar` | inside `tl-table__toolbar` | Flex row containing left + right action bars. |
| `tl-table__actionbar-left` / `__actionbar-right` | inside `tl-table__upper-bar` | |
| `tl-table__title` | inside `tl-table__actionbar-left` | Toolbar title text. |
| `tl-table__header` | `<thead>` | |
| `tl-table__body` | `<tbody>` | |
| `tl-table__footer` | `<tfoot>` | Used for the pagination row. |
| `tl-table__row` | `<tr>` | Apply to every row (header, body, footer all share base styling). |
| `tl-table__header-cell` | `<th>` | Min-width 192px unless overridden. |
| `tl-table__header-cell--checkbox` / `--expand` | `<th>` | 48px-wide fixed-size header cells. |
| `tl-table__header-cell--sortable` | `<th>` | Removes padding so the inner `<button>` fills the cell. |
| `tl-table__header-cell--is-sorted` | `<th>` | Tints background when this column is the active sort. |
| `tl-table__header-button` | `<button>` inside sortable header | Reset button styled as the cell. |
| `tl-table__header-button-icon` | `<span>` inside header-button | Sort indicator. Add `tl-table__header-button-icon--rotate` for asc. |
| `tl-table__header-input-wrapper` | inside `<th>` | For column search inputs. |
| `tl-table__header-input` | `<input>` | Search/filter input style. |
| `tl-table__body-cell` | `<td>` | |
| `tl-table__body-cell--checkbox` / `--expand` | `<td>` | Match header equivalent. |
| `tl-table__body-cell--column-highlight` | `<td>` | Toggled by JS on header hover for column highlighting. |
| `tl-table__expand-control-container` | `<label>` inside expand cell | |
| `tl-table__expand-input` | `<input type="checkbox">` | Hidden input that drives expansion state. |
| `tl-table__expand-icon` | `<span>` inside expand cell | The chevron — rotates when row has `--expanded`. |
| `tl-table__expand-row` | `<tr>` immediately after parent `tl-table__row` | Hidden by default; show with `--expanded`. |
| `tl-table__expand-row-cell` | `<td colspan="N">` inside expand row | |
| `tl-table__footer-row`, `__footer-cell` | inside `<tfoot>` | |
| `tl-table__pagination` | inside footer cell | Flex row with rows-per-page + page selector. |
| `tl-table__rows-per-page`, `__page-selector`, `__rows-per-page-select`, `__page-selector-input`, `__footer-button`, `__footer-text` | pagination internals | See CSS for exact use. |

## States

| Modifier / pseudo | Effect |
|---|---|
| `:hover` on `tl-table__row` (not expanded) | Row hover tint |
| `tl-table__row--clickable` | Pointer cursor + focus outline (alternative to root-level `--clickable`) |
| `tl-table__row--selected` | Persistent selected tint (with hover-on-selected) |
| `tl-table__row--expanded` | Used together with following `tl-table__expand-row--expanded` to reveal expand content |
| `tl-table__expand-row--expanded` | Reveals the expand row (`display: table-row`) |

## Tokens consumed

- `--component-table-cell`, `--component-table-cell-hover`, `--component-table-secondary-cell`, `--component-table-pagination-base`, `--component-table-pagination-dropdown` — base surfaces
- `--color-background-surface-{200,300,400}` — header / hover / selected surfaces
- `--color-foreground-text-strong`, `--color-foreground-icon-strong`, `--color-foreground-icon-soft`, `--color-foreground-text-subtle` — text & icon
- `--color-foreground-border-{discrete,accent-focus}` — dividers & focus outline
- Typography: `--headline-07-*` (header & title), `--detail-02-*` (body cells, footer, inputs)
- Spacing: `--tds-spacing-element-{4,8,16,24,32,48}`

## Examples

### Plain HTML

```html
<table class="tl-table tl-table--primary tl-table--responsive tl-table--zebra-rows-odd">
  <thead class="tl-table__header">
    <tr class="tl-table__row">
      <th class="tl-table__header-cell">Name</th>
      <th class="tl-table__header-cell">Email</th>
      <th class="tl-table__header-cell">Role</th>
    </tr>
  </thead>
  <tbody class="tl-table__body">
    <tr class="tl-table__row">
      <td class="tl-table__body-cell">Alice</td>
      <td class="tl-table__body-cell">alice@example.com</td>
      <td class="tl-table__body-cell">Admin</td>
    </tr>
    <tr class="tl-table__row">
      <td class="tl-table__body-cell">Bob</td>
      <td class="tl-table__body-cell">bob@example.com</td>
      <td class="tl-table__body-cell">Editor</td>
    </tr>
  </tbody>
</table>

<!-- Sortable header cell -->
<th class="tl-table__header-cell tl-table__header-cell--sortable tl-table__header-cell--is-sorted">
  <button class="tl-table__header-button" type="button">
    <span class="tl-table__header-button-text">Name</span>
    <span class="tl-table__header-button-icon tl-table__header-button-icon--rotate tl-icon tl-icon--arrow_down tl-icon--16" aria-hidden="true"></span>
  </button>
</th>

<!-- Expandable row pair -->
<tr class="tl-table__row tl-table__row--expanded">
  <td class="tl-table__body-cell tl-table__body-cell--expand">
    <label class="tl-table__expand-control-container">
      <input class="tl-table__expand-input" type="checkbox" checked aria-expanded="true">
      <span class="tl-table__expand-icon">
        <span class="tl-icon tl-icon--chevron_down tl-icon--16" aria-hidden="true"></span>
      </span>
    </label>
  </td>
  <td class="tl-table__body-cell">Alice</td>
</tr>
<tr class="tl-table__expand-row tl-table__expand-row--expanded">
  <td class="tl-table__expand-row-cell" colspan="2">Expanded details for Alice</td>
</tr>
```

### React binding (this project)

```tsx
import Table from '@/src/tegel-components/Table'

<Table title="Users" zebra="rows-odd">
  <Table.Head>
    <Table.Row>
      <Table.HeaderCell>Name</Table.HeaderCell>
      <Table.HeaderCell>Email</Table.HeaderCell>
    </Table.Row>
  </Table.Head>
  <Table.Body>
    <Table.Row>
      <Table.BodyCell>Alice</Table.BodyCell>
      <Table.BodyCell>alice@example.com</Table.BodyCell>
    </Table.Row>
  </Table.Body>
</Table>
```

The wrapper is a client component (it wires column-highlight on header hover via `useEffect`). Compound parts: `Table.Head`, `Table.Body`, `Table.Row`, `Table.HeaderCell`, `Table.BodyCell`, `Table.ExpandCell`, `Table.ExpandRow`, `Table.Footer`, `Table.FooterRow`, `Table.FooterCell`.

## Rules

- **Apply `tl-table__row` to every `<tr>`** (header, body, expand, footer rows). Without it the cell layout uses the wrong row background.
- **`tl-table__expand-row` must immediately follow its parent `tl-table__row`.** They're a pair — both need to flip to `--expanded` together.
- **Match `colspan` on the expand row to total column count** (including any checkbox / expand columns).
- **The toolbar lives in `<caption>`**, not a wrapping `<div>`. Tegel uses `display: table-caption` so it renders above the header without breaking table layout. Wrapping the table in a `<div>` and putting a custom toolbar there will not get the rounded-corner / surface treatment.
- **Header cells default to `min-width: 192px`.** For dense layouts add `tl-table--no-min-width`.
- **Sortable cells need the `<button class="tl-table__header-button">` inside `<th>`** — clicking the cell directly won't trigger sort, and CSS removes padding so the button can fill.
- **For horizontal scroll:** add `tl-table--horizontal-scroll` AND set an explicit width (otherwise the table collapses to content). The scrollbar styling is built-in via webkit + standard properties.
- **Variant + dark mode interaction:** `tl-table--secondary` swaps body-row hover tones under `tds-mode-dark` — don't override `--table-body-cell-hover` unless you intend to break that.
