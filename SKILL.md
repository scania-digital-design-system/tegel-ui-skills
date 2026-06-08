---
name: tegel-ui-skills
description: Build, debug, refine, or document Scania or Traton UI using @scania/tegel-lite or official multibrand TRATON Component Library components in Figma. Use when working with Tegel, Scania or Traton branded interfaces, Figma TRATON Component Library instances, Tegel Lite setup, CSS token usage, BEM component classes, component markup, forms, spacing, colors, typography hierarchy, motion, dark or light mode, brand switching, or when the user wants to improve this personal Tegel skill from a corrected UI example.
---

# Tegel UI Skills

Use this skill as the front door for Tegel Lite UI work. Keep the main context lean, then load only the reference files needed for the current task.

## First Steps

1. Identify whether the task is setup, component markup, styling tokens, typography, motion, form layout, or skill improvement.
2. Load the relevant reference files from the map below before writing or changing UI code.
3. Check the consuming project for existing Tegel wrappers, imports, and naming conventions; follow those local patterns.
4. Prefer Tegel Lite classes and CSS variables over invented class names, hard-coded colors, hard-coded spacing, or inline styles.
5. When something is unclear, verify against `node_modules/@scania/tegel-lite/dist/` in the consuming project if it exists.

## Figma Workflow

When designing in Figma, first locate the multibrand TRATON Component Library, import official component instances, and never draw lookalike frames when a Tegel (or Traton, when designing for Traton) component exists.

Use the TRATON Component Library source file when needed: https://www.figma.com/design/6osYTOfd4MgDq7LO6BCoUO/TRATON-Component-Library?m=auto&node-id=0-1&t=fZhOvr6K6wHcVlMq-1

Use Figma library discovery and component search before creating local frames, cards, controls, navigation, tables, chips, messages, inputs, or buttons. When designing for Scania, use the Scania theme. When designing for Traton, use the Traton theme. Never mix Scania and Traton themes in the same design unless the user explicitly asks for a brand-comparison artifact. If a needed component cannot be found in the TRATON Component Library, compose from the closest official component in the correct brand theme or document the gap instead of silently creating a custom clone.

For Scania light-mode Figma screens, prefer white (`color/background/base`, Scania grey 00) for the primary page/canvas background. Grey 50 is the secondary background colour and can be used for secondary blocks or canvases, but then components on that surface should use their Secondary mode variant when the library provides one. Do not recolour official component instances to solve contrast. Scania Card components always keep their official white background in light mode; never replace them with local frames or manually change their fills.

In Figma, brand appearance is controlled through the right-panel Appearance variable mode on the actual imported component instance or nested component level. If changing the outer frame appearance does not update the component visuals, drill into the frame with Enter until the official component instance/container level is selected, then set Appearance to Scania or Traton there. Do not simulate brand switching by editing component properties, drawing replacement layers, or manually toggling hidden Scania/Traton implementation layers inside components.

When placing official Figma component instances, preserve the component's intended auto-layout sizing. For text-bearing components such as Message, Banner, Card, Dropdown, TextField, Textarea, Tabs, and Buttons, do not force a fixed height after changing text unless the library component explicitly requires it. Keep the width fixed when the layout needs a defined column, but let the content axis hug/auto-size so labels, helper text, and extended messages remain fully visible. In Plugin API terms, for horizontal auto-layout instances this usually means keeping `primaryAxisSizingMode = "FIXED"` for width and setting `counterAxisSizingMode = "AUTO"` for height; for vertical input-like instances such as Dropdown, TextField, and Textarea, keep `counterAxisSizingMode = "FIXED"` for width and set `primaryAxisSizingMode = "AUTO"` for height. Then check that `layoutSizingVertical` reports `HUG`. Avoid `clipsContent: true` on resized text-bearing components unless clipping is part of the official component behavior.

When input controls sit in the same form row, keep their label-position variant consistent. For example, a Date dropdown with `Label position=Outside` should be paired with a Hours TextField using `Label position=Outside`, not an inside-label 56px field offset downward. After changing label position, re-check the instance height because Large outside-label inputs should typically hug to 76px.

When working through MCP/`use_figma`, use the Figma Plugin API variable mode methods carefully and verify the result with a screenshot. Inspect official imported instances and their ancestors for `resolvedVariableModes`/`explicitVariableModes`, fetch each collection with `figma.variables.getVariableCollectionByIdAsync(collectionId)`, and set the intended brand/mode with `node.setExplicitVariableModeForCollection(collection, modeId)` only when that collection is the exact user-facing Appearance control a designer would set in the right panel. Do not bulk-apply every collection visible in `resolvedVariableModes`; lower-level or implementation collections such as `component`, `semantic`, helper `Scania theme` collections, or a generic `TRATON` Light/Dark collection can surface extra Appearance rows and may not represent the brand switch. If a mode operation exposes technical rows or conflicting Appearance controls, undo it with `node.clearExplicitVariableModeForCollection(collection)` on the affected subtree and inspect the official component again. For the multibrand TRATON Component Library, prefer a published Scania/Traton brand mode, variant, or brand-specific official component instance. Do not force hidden implementation variables, edit internal visibility layers, draw replacement logos, or use manual color overrides to fake a missing brand mode. Mode IDs are file/library-instance specific, so always choose modes by name at runtime instead of hard-coding IDs.

## Reference Map

- New project setup, broken-looking UI, missing CSS, brand/mode cascade, or bundler issues: read `references/setup.md`.
- Component choice, BEM root classes, modifiers, required nesting, states, and token use: read `references/components-overview.md`, then the specific file in `references/components/{Component}.md`.
- Colors, theme classes, semantic color decisions, dark mode, or brand switching: read `references/colors.md`; for Tegel Lite package token names, cross-check `references/setup.md`.
- Typography, current Inferno type hierarchy, font combinations, type color rules, display/headline/paragraph/body/title/label/text choices, or text outside components: read `references/typography.md`.
- Padding, margin, gaps, layout-vs-element scale, radius, or collapsed unit tokens: read `references/spacing.md`.
- Transitions, animations, durations, easing, keyframes, or reduced-motion choices: read `references/motion.md`.
- TextField, Dropdown, Message, toolbar input rows, outside labels, or prefix/suffix icon alignment: read `references/form-layout.md`.
- A user-corrected Tegel UI should teach the skill: read `references/improvement-loop.md`.

## Component Workflow

For any Tegel component request:

1. Pick the component from the catalogue or, in Figma, from the official multibrand TRATON Component Library.
2. Read its component reference before writing markup.
3. Use the documented root class, elements, modifiers, state classes, and nesting exactly.
4. Use project-specific wrapper classes only for consumer styling, preferably with a local prefix such as `site-`.
5. Apply Tegel tokens for color, spacing, typography, radius, z-index, and motion.

Component references currently include:

- Form and input: Button, TextField, Textarea, Checkbox, RadioButton, Toggle, Dropdown, DropdownButton, DropdownFilter, Datetime, Slider.
- Feedback and overlay: Banner, Message, Toast, Modal, PopoverCanvas, PopoverMenu, Tooltip, Spinner.
- Layout and navigation: Header, Footer, SideMenu, Breadcrumbs, Tabs, Stepper, Divider, Block.
- Data display: Card, Table, Accordion, Badge, Chip, Icon, Link.

## Tegel Lite Invariants

- Tegel Lite is CSS-first: write HTML or framework markup and apply BEM classes. There is no required JS runtime or web component layer.
- Load Tegel Lite CSS through static `<link>` tags when bundlers reject package CSS. The setup reference explains the copy-and-link pattern.
- Brand classes belong on a root ancestor, usually `<html>`; mode classes belong on a descendant, usually `<body>`.
- For Tegel Lite package tokens, text, border, and icon color variables use `--color-foreground-text-*`, `--color-foreground-border-*`, and `--color-foreground-icon-*`.
- Do not assume `components.css` contains every per-component style; the setup reference lists files that may need to be appended or linked separately.

## Refining This Skill

When improving the skill itself, make the smallest durable edit:

- Add component-specific lessons to `references/components/{Component}.md`.
- Add setup or package-loading lessons to `references/setup.md`.
- Add token lessons to `references/colors.md`, `references/typography.md`, `references/spacing.md`, or `references/motion.md`.
- Add form-control layout lessons to `references/form-layout.md`.
- Edit this `SKILL.md` only when the trigger description, workflow, or reference map needs to change.

Avoid baking one project's naming, routes, or layout quirks into universal guidance unless the example is clearly labeled as project-specific.
