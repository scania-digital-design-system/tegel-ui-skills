# Tegel Typography

Use this reference when choosing type styles outside defined Tegel components, combining type levels, creating text hierarchy, or reviewing typography in a Scania interface.

Source understanding comes from the Inferno Figma frames for current text styles and font-combination standards:

- Text styles and descriptions: `Inferno`, node `545:20471`
- Combining fonts: `Inferno`, node `541:16349`

## First Rule

Never modify fonts inside defined components. Buttons, tables, form fields, notifications, navigation, and other Tegel components own their internal type through their component CSS. Use the component API, BEM classes, slots, and documented variants instead of overriding `font-family`, `font-size`, `line-height`, `font-weight`, or `letter-spacing`.

For text outside components, use the current Inferno naming: `display`, `headline`, `paragraph`, `body`, `body-link`, `title`, `label`, and `text`.

The old names that appear in older Tegel references are not style-selection guidance for new work. Only preserve package-level typography variables from old component CSS when reading or debugging an existing Tegel Lite component.

## Core Workflow

1. Decide whether the context is functional or expressive.
2. Choose one base text size for the main reading level.
3. Add only the headline, paragraph, title, label, or display styles the composition truly needs.
4. Use spacing, grouping, weight, and semantic text color before adding extra type sizes.
5. Keep local compositions restrained. Aim for no more than three different sizes; use more only when the content structure clearly needs it.
6. Use typography tokens from the project or token export instead of hard-coded font values.

## Functional vs Expressive

Functional type is for non-branded communication, information, documentation, and task-focused product UI. Its main use is Scania applications, except in-vehicle applications. In functional contexts, typography should help the user understand information and complete tasks, so the hierarchy should feel calm, legible, and efficient.

Expressive type is for more branded communication and public websites, such as Scania.com. Display styles belong to this expressive category. These contexts can use more dynamic headlines, stronger size contrast, and a more editorial rhythm when that helps users identify the most important information first.

## Color Rules

Use semantic typography color variables, not hard-coded colors.

| Text role | Color rule |
|---|---|
| Display text | `Strong` by default; Blue 800 is also allowed for brand-led display moments |
| Headlines and titles | `Strong` |
| Paragraph, body, and custom component-like text | `Strong`, `Defined`, or `Soft`, depending on hierarchy |
| Disabled text | `Disabled` only |

Do not use `Disabled` to create low-emphasis hierarchy. Use `Soft` for secondary readable text instead.

In Tegel Lite code, text color variables usually use the `--color-foreground-text-*` namespace, such as `--color-foreground-text-strong`, `--color-foreground-text-defined`, `--color-foreground-text-soft`, and `--color-foreground-text-disabled`. In Figma or token exports, the same decisions may appear as slash-style variables such as `color/foreground/text/strong`. Follow the consuming project's active token namespace.

## Current Style Scale

Use the token name when communicating design intent. Use the project-exported CSS variable names when implementing.

| Style | Token | Font | Size / line | Weight | Letter | Transform | Use |
|---|---|---|---:|---|---:|---|---|
| Display 01 | `$display-01` | Scania Sans CY Headline | 216 / 227 | Medium 500 | 1.08px | uppercase | Numbers or very short words only; it quickly dominates a layout |
| Display 02 | `$display-02` | Scania Sans CY Headline | 156 / 164 | Medium 500 | 0.78px | uppercase | Large numbers, especially statistics |
| Display 03 | `$display-03` | Scania Sans CY Headline | 112 / 118 | Medium 500 | 0.56px | uppercase | Very bold expressive headlines |
| Display 04 | `$display-04` | Scania Sans CY Headline | 80 / 84 | Medium 500 | 0.4px | uppercase | Expressive page-layout display text |
| Display 05 | `$display-05` | Scania Sans CY Headline | 56 / 59 | Medium 500 | 0.28px | uppercase | Smaller expressive page-layout display text |
| Headline 01 | `$headline-01` | Scania Sans CY Headline | 40 / 42 | Medium 500 | 0px | none | Large page-layout headline |
| Headline 02 | `$headline-02` | Scania Sans CY | 32 / 40 | Medium 500 | 0px | none | Main functional page or section headline |
| Headline 03 | `$headline-03` | Scania Sans CY | 24 / 30 | Medium 500 | 0px | none | Page-layout headline with controlled emphasis |
| Headline 04 | `$headline-04` | Scania Sans CY | 20 / 25 | Medium 500 | 0px | none | Section headline or compact page heading |
| Headline 05 | `$headline-05` | Scania Sans CY | 16 / 22 | SemiBold 600 | 0px | none | Subheadline, commonly paired with Body 01 |
| Headline 06 | `$headline-06` | Scania Sans CY | 14 / 20 | SemiBold 600 | 0px | none | Subheadline, commonly paired with Body 02 |
| Paragraph 01 | `$paragraph-01` | Scania Sans CY | 24 / 30 | Medium 500 | 0px | none | Large introduction text on page layouts |
| Paragraph 02 | `$paragraph-02` | Scania Sans CY | 20 / 25 | Medium 500 | 0px | none | Smaller introduction text, mainly for mobile breakpoints |
| Body 01 | `$body-01` | Scania Sans CY | 16 / 22 | Regular 400 | 0px | none | Larger body text, usually for paragraphs longer than three lines |
| Body 02 | `$body-02` | Scania Sans CY | 14 / 20 | Regular 400 | 0px | none | Smaller body text for paragraphs under three lines; can also fit certain compact contexts |
| Link 01 | `$body-link-01` | Scania Sans CY | 16 / 22 | Regular 400 | 0px | none | Larger inline link, usually paired with Body 01 |
| Link 02 | `$body-link-02` | Scania Sans CY | 14 / 20 | Regular 400 | 0px | none | Smaller inline link, usually paired with Body 02 |
| Title 01 | `$title-01` | Scania Sans CY Semi Condensed | 14 / 18 | SemiBold 600 | 0px | none | Component subheadline, commonly paired with Text 01 |
| Title 02 | `$title-02` | Scania Sans CY | 10 / 14 | SemiBold 600 | 0.4px | uppercase | Labels and selected compact component contexts |
| Label 01 | `$label-01` | Scania Sans CY Semi Condensed | 12 / 17 | Medium 500 | 0px | none | Form component labels and some notification messages |
| Label 02 | `$label-02` | Scania Sans CY Semi Condensed | 10 / 14 | Medium 500 | 0px | none | Very small labels, for example inside a text field |
| Text 01 | `$text-01` | Scania Sans CY Semi Condensed | 14 / 16 | Regular 400 | 0px | none | Component-like text such as data-table and button text; commonly paired with Title 01 |
| Text 02 | `$text-02` | Scania Sans CY Semi Condensed | 14 / 20 | Regular 400 | 0px | none | Longer detailed text exceeding three lines in functional applications |

## Choosing A Base Size

Start with the main reading level:

- Use Body 01 for general written content and longer paragraphs.
- Use Body 02 for shorter supporting copy, compact layouts, and smaller breakpoints.
- Use Text 02 when a functional application needs denser detailed text outside a defined component.
- Use Text 01 only for custom component-like text. If the text is inside an official component, let the component style it.
- Use Paragraph 01 or Paragraph 02 for introduction text, not for ordinary body copy.

After choosing the base size, add only the headers or titles needed to explain the structure. Do not solve hierarchy by adding many sizes first.

## Functional Combinations

Functional products are usually denser and should use lower contrast between type sizes. Choose styles that sit close together, with emphasis coming from structure as much as from size.

Good starting combinations:

- `headline-02`, `headline-04`, `headline-06`, `body-02`: compact hierarchy where Headline 06 and Body 02 share size but differ in weight.
- `headline-02`, `headline-03`, `headline-04`, `headline-05`, `body-01`: controlled hierarchy for pages with several heading levels.
- `headline-03`, `headline-04`, `headline-05`, `headline-06`, `body-02`: compact hierarchy for dense task-focused screens.

Use these patterns for dashboards, settings, forms, data-heavy tools, operational workflows, and internal documentation.

## Expressive Combinations

Expressive contexts can use higher contrast between type levels. Use display styles carefully and only for selected copy, because they quickly become the dominant visual signal.

Good starting combinations:

- `display-04`, `headline-01`, `headline-05`, `body-01`: strong display lead with a clear supporting text scale.
- `display-04`, `display-05`, `headline-01`, `headline-02`, `headline-05`, `body-01`: high contrast for editorial, brand, or campaign-like layouts.
- `display-05`, `headline-01`, `headline-02`, `headline-03`, `headline-05`, `body-01`: expressive hierarchy with a slightly smaller display lead.

Use these patterns for public websites, launch pages, campaign sections, brand storytelling, and other layouts where typography is part of the expression.

## Practical Selection

| Situation | Start with |
|---|---|
| Large statistic | Display 01 or Display 02 |
| Bold expressive page headline | Display 03, Display 04, or Display 05 |
| Functional page title | Headline 02 or Headline 03 |
| Functional section title | Headline 04 or Headline 05 |
| Compact subheading above Body 02 | Headline 06 |
| Intro copy on a page | Paragraph 01 or Paragraph 02 |
| Long reading text | Body 01 |
| Short supporting copy | Body 02 |
| Inline link in body copy | Link 01 with Body 01, Link 02 with Body 02 |
| Custom component-like title | Title 01 |
| Custom component-like text | Text 01 or Text 02 |
| Form label outside official component styling | Label 01 |
| Very small internal label | Label 02 |

## Avoid

- Do not override fonts inside official Tegel components.
- Do not use display styles in normal application chrome, forms, tables, sidebars, or dense cards.
- Do not use Display 01 for sentences or long headlines.
- Do not mix expressive display styles into functional screens unless there is a deliberate brand-led moment.
- Do not use more type sizes than the local hierarchy needs.
- Do not create hierarchy with disabled color.
- Do not manually tune letter spacing; use the token.
- Do not hard-code Scania Blue 800 if the project has a Blue 800 token.
