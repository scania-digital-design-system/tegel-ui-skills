---
name: tegel-aesthetic
description: Set the aesthetic direction BEFORE building Tegel UI. Use at the
  start of any new screen, page, or section — or any restyle, relayout, or
  "make it look more X / modern / editorial" change to an existing one. First
  decide the register — Expressive (storytelling, landing, communicative surfaces) 
  or Functional (guidelines, tools, dashboards, AI service UI) — then tune space, 
  type, color, motion, and composition to it. Directional, not prohibitive — it
  pushes the Scania aesthetic. The foundation skills (colors, spacing, motion)
  still enforce the rules; this decides which way to push within them.
---

# tegel-aesthetic — Pick a register, then push it

Read this **before** `tegel` — it is step 0 of the build chain. It does not
pick components or tokens; it sets the direction that governs every choice the
rest of the chain makes. It never overrides the foundation skills — it tells
you which way to lean inside their rules.

## The Scania thesis

Scania looks like **precision engineering made calm**. Confident, Scandinavian,
premium-industrial. Order *is* the aesthetic: strict alignment, a clear grid,
simple divisions. Every element earns its place by communicating something —
there is no decoration, ever. It reads equally well in light or dark; neither
is home. Type and space do the work; blue anchors but never wallpapers. Nothing
is loud, but the important thing is unmistakable.

## The precision spine (both registers obey — non-negotiable)

These hold regardless of register. They are *why* Scania doesn't look like
generic generated UI.

1. **Align everything to a real grid.** Precision is a core Scania principle.
   Shared edges, consistent gutters, a visible underlying structure. Use the
   `.tds-grid-*` columns; don't free-float elements. If two things don't need to
   align, question whether one of them belongs on the page.
2. **Compose in simple fractions.** Blocks are full / half / third / quarter
   width. Pick a division and commit — never a bespoke 37% column. Simple
   divisions read as engineered; arbitrary ones read as accidental.
3. **Decoration is forbidden.** Every element must carry communicative worth.
   No gradient fills for mood, no glows, no blobs or mesh backgrounds, no
   borders-as-ornament, no icon-per-label garnish. If you can delete it and lose
   no meaning, delete it.
4. **Be mode-agnostic.** Design for the semantic token, not the appearance in
   one mode. Choose the token whose *meaning* is right, then verify it in BOTH
   light and dark. A composition that only works in one mode is broken — fix the
   composition, not the mode.
5. **Earn contrast with space and type, not effects.** Hierarchy comes from
   scale, weight, and whitespace — never from drop shadows, faux-depth, or
   colored panels added "to make it pop."
6. **Headlines are uppercase by default; small text is sentence case.** Scania
   headlines and super-types are set in uppercase and contain no lowercase
   letters — never lowercase a headline or super-type to make it feel softer.
   The rule against uppercase applies *only* to text below 40px that is not a
   headline or super-type (body, paragraphs, labels, captions, buttons): set
   that in sentence case, never uppercase it for emphasis.
7. **Cards and surfaces separate by elevation and space — never by an outline.
   This is a hard NO.** A card is a fill on a higher surface token
   (`--color-background-layer-01` and up) against the page ground, set apart by
   the gutter around it — *not* by a border drawn around its edge. Never put a
   border on a card, panel, tile, or KPI block to make it feel "contained": the
   outlined-box-on-a-page look is the single clearest tell of dated, generated
   UI, and it is forbidden here regardless of register. Separation comes from the
   surface stepping up a layer and from the whitespace between blocks — if two
   cards aren't telling apart, increase the gutter or step the surface, do not
   reach for a border. Borders exist only for genuine *functional* separation —
   the edge of an input field, the row rules inside a dense table, one real
   divider between two distinct groups — and even then use the faintest token,
   `--color-border-discrete`. The heavier border tokens (`-subtle`, `-soft`,
   `-defined`, `-strong`) are never used to fence a surface or fill space; a
   hairline at `-subtle` or above around a card is a bug. Default to no border
   and delete any you can remove without the layout breaking.
8. **Commit to scale on the one focal element.** Rule 5 says hierarchy comes
   from scale — this is its affirmative half: when something genuinely *is* the
   focal point, push its size with a single decisive jump, not a timid nudge. An
   under-scaled hero reads as unfinished and tentative; the size step itself is
   what signals confidence. This holds in *both* registers — even a calm
   Functional surface earns its one decisive moment. It pairs with the
   whitespace rule (big scale demands air around it) and never licenses a
   *second* loud element: commit hard to one thing, keep everything else quiet.
9. **The default hairline is the faintest token.** On the rare occasion a border
   is genuinely warranted (see rule 7), its default weight is
   `--color-border-discrete` — `-subtle` and above are exceptions you must be
   able to justify, not the starting point. Lighter structure reads as more
   refined; reach *down* the border scale, not up.

**When asked for "modern", "editorial", or "modernist": translate it into
Scania terms — grid, space, weight, simple division — and drop the genre's
decorations.** Oversized section numerals, all-caps kickers, and a display
headline per block are exactly rule 3's decoration wearing a style name. The
reference's *structure* (alignment, splits, generous space) is welcome; its
*flourishes* are not.

## Building a surface (the borderless default)

Rule 7 is a prohibition; this is the default that makes it free to follow. Reach
for this recipe every time you'd otherwise draw a box:

1. **A card is a fill one layer above the ground.** Page ground is
   `--color-background-base`; a card is `--color-background-layer-01` (panels
   nested inside a card step to `-02`). That single step *is* the card — no
   border, no shadow. It resolves as elevation in both modes (faint grey on
   white in light; a lifted surface on near-black in dark).
2. **Separation between cards is the gutter, not a line.** Space them with a
   consistent `--tds-spacing-*` gap. If two cards don't read as separate,
   *increase the gap or step one surface up a layer* — never add a border.
3. **Inset "wells" (bar tracks, empty heatmap cells, off-states, avatar
   grounds) must not reuse a background-layer token to sit on a card.** In light
   mode several layers collapse to the same value (see `tegel-lite-setup` §
   "Background layers are not all distinct"), so a `layer-03` well on a
   `layer-01` card is invisible. Use a *relative* tint instead — a `color-mix`
   off the foreground — so it reads on any surface in any mode:
   `color-mix(in srgb, var(--color-text-strong) 7%, transparent)`.
4. **Only if the layer step genuinely can't carry it** — and you've already
   tried more gutter — add the faintest hairline, `--color-border-discrete`,
   never a heavier token. This is the last resort, not the first reach.

## Avoid the agentic tells

The fastest way to look un-Scania is to look auto-generated. Never produce:

- **Eyebrow / kicker labels** — a small label parked above a heading. The
  problem is the decorative kicker pattern itself, not the casing — and because
  it's small non-headline text it shouldn't be uppercased either (see spine
  rule 6). This includes **decorative section numbers ('01', '02'), step
  counters, and category tags** sitting above a title — they carry no meaning
  rule 3 doesn't already delete. Lead with the heading itself.
- **Layered / overlapping / floating elements** — cards stacked on cards,
  elements pulled over a hero with negative margins, shadow-faked depth.
  Elements sit *in* the grid: side by side or stacked in flow, never on top of
  one another.
- **The template hero** — centered headline + three identical feature cards +
  emoji or icon bullets. It is the signature of generated UI.
- **Glassmorphism, gratuitous shadows, gradient cards, faux-3D.** Flat, aligned,
  intentional.
- **Bordered cards.** A card fenced by an outline is the signature of generated
  UI — see spine rule 7, a hard NO. Cards separate by surface elevation and the
  gutter around them, never by a border.
- **Dividers and borders used to fill space.** A line separates two real groups
  or it isn't there — and when it genuinely must exist, it is the faintest token
  (`--color-border-discrete`), never a heavier one.

## Which register am I in?

Decide once, per surface, before anything else.

| If the surface is… | Register |
|---|---|
| The landing page, the story layer, a communicative / marketing moment, anything whose job is to make someone *feel* something | **Expressive** |
| The brand-guidelines section, the AI service layer, a tool, a dashboard, anything whose job is to let someone *do* or *find* something | **Functional** |

In this app: **story → Expressive**, **guidelines + service → Functional**.
When a surface mixes both, default to Functional and let one Expressive moment
earn its place.

## Expressive — how to push it

For communicative surfaces. The goal is impact through restraint.

- **Spend space generously — one idea per viewport.** Let a single statement own
  the screen. *Why:* room around an element is what makes it read as important;
  crowding it makes everything average.
- **Let type be the hero.** Reach into the display sizes (`--type-display-*`),
  with a decisive jump from headline to body. *Why:* Scania expresses confidence
  through typographic scale, not ornament — a large, quiet line says more than a
  decorated small one.
- **Hold the type to about three sizes.** One hero (`--type-display-*`), one
  supporting (`--type-headline-*`), one for body. *Why:* a
  tight size set reads as composed and deliberate; every extra size is a small
  crack that makes the page feel messy. Resist adding a fourth "just for this
  one element."
- **A large display-font title demands the space around it.** Whenever a title
  is set in the display font at hero scale (`--type-display-*`),
  surround it with generous whitespace — `layout`-scale
  margins above and below (`--tds-spacing-layout-*`), never the tight `element`
  steps. The bigger the type, the more air it needs. *Why:* large display type is
  a statement; crammed against neighbouring content it reads as cramped and loud
  instead of confident — the whitespace is what makes the scale feel deliberate
  rather than oversized. This holds wherever the display font appears large,
  including the single display headline a Functional page is allowed: give that
  one room even though the rest of that page runs tight.
- **Commit to contrast and brand presence** using semantic surface tokens
  (`--color-background-base` / `-inverse-*`, `--color-text-strong`).
  *Why:* committed contrast reads as deliberate; timid mid-greys read as
  unfinished. Keep it mode-agnostic — commit via tokens that flip, not via a
  hand-picked dark panel.
- **Choreograph motion to reveal hierarchy.** Scroll-driven reveals, `elevate`
  and compound enter tokens, sequencing that introduces ideas in order. *Why:*
  on a story surface, motion *is* the narration — but it still has to be
  purposeful, never decorative. (See `tegel-motion`.)
- **Imagery may go full-bleed, but only as a full or half division.** *Why:*
  full-bleed product photography is legitimate Scania impact; an image cropped
  to an arbitrary shape is decoration. Full / half / quarter — same grid as
  everything else.
- **Earn exactly one focal moment, then stop.** *Why:* if two things shout,
  nothing does. Expressive is loud once, on purpose. A scroll-story is a
  *sequence* of single-idea viewports, not one crowded screen.

## Functional — how to push it

For tools, guidelines, and service UI. The goal is clarity that still feels
premium.

- **Be efficient, and keep internal padding tight.** Dense enough to scan in one
  pass, with consistent `--tds-spacing-*` rhythm between groups. *Inside*
  functional components (cards, panels, list rows) reach for the lower element
  steps — around `--tds-spacing-element-12` to `-16` for card padding, not `-24`
  / `-32`. Padding should frame content, not float it. *Why:* Scania-premium in
  a tool means calm and uncramped, not airy — generous internal padding pushes
  content apart, drops information density, and makes a tool read like a
  marketing card. (Reserve the larger element steps for Expressive surfaces.)
- **Keep the type spread discrete — separate by weight and color, not size.** On
  functional surfaces the step from a title to the copy beneath it should be
  *small*: a card or section title sits roughly one step above its body — a
  small `--type-headline-*`, or even a strong/large `--type-body-*` — never a dramatic jump to
  a large headline. Let weight and color
  (`--color-text-strong` for the title vs `-soft` / `-defined` for
  copy) carry the hierarchy. *Why:* a large title-to-body size jump is an
  Expressive device — on a dense, scannable surface it shouts, wastes vertical
  space, and fractures the calm. A title close in size to its copy still reads
  clearly as the title when it's heavier and higher-contrast. Big size contrast
  is how you say "this is a moment"; a tool has few moments.
- **At most one Scania Headline Font headline per page.** Use the uppercase
  Scania Headline Font for a single headline only — the page H1, and only if one
  is genuinely needed. Every smaller title (title sizes and below) is set in the
  sentence-case font, not the headline font. *Why:* the headline face is a
  strong, brand-loud instrument; one of it reads as a clear anchor, several turn
  a working page into a shouting match and break the calm, scannable hierarchy a
  tool depends on. Casing still follows spine rule 6 — the lone headline is
  uppercase, the sentence-case titles are not.
- **A wider type range is allowed here — keep it on the scale.** The
  ~three-size discipline that keeps an Expressive screen clean is impractical in
  dense tooling (tables, forms, detail views legitimately need more steps).
  That's expected — but pull every size from the working scale (`--type-headline-*`,
  `--type-paragraph-*`, `--type-body-*`, `--type-system-*`) and reuse the same steps consistently
  rather than inventing in-betweens. *Why:* in a functional surface, consistency
  of scale matters more than count; what looks messy is arbitrary sizes, not
  many of them.
- **Restrain color; let it mean something.** Neutrals carry structure, blue is an
  accent for the primary path, `--color-system-*` reserved for genuine status.
  *Why:* when color is rare it's informative; when it's everywhere it's wallpaper.
- **Keep motion utilitarian.** Fast/moderate tokens, used only to clarify a
  state change (open, validate, load). No choreography. Honor
  `prefers-reduced-motion` aggressively. *Why:* in a tool, motion that doesn't
  explain a state is friction.
- **Let real imagery be content, but never garnish.** Brand photography and
  diagrams that *are* the information (a guideline showing the logo, a service
  result) belong here, placed on the grid as full / half / quarter divisions.
  Decorative or mood imagery does not. *Why:* functional surfaces earn trust by
  being clear; an image that teaches is clarity, an image that fills space is
  decoration.
- **No single thing shouts.** Even, calm emphasis across the surface. *Why:*
  scannability depends on a predictable field; a hero element breaks the scan.

## How this composes with the rest of the chain

This skill sets *direction*; the foundation skills set *rules*. They never
conflict — when in doubt, the foundation skill wins on specifics:

- Register chosen here → then walk `tegel` and the 6-step chain as normal.
- Token *names*, spacing scales, motion shorthands: defer entirely to
  `tegel-colors`, `tegel-spacing`, `tegel-motion`, `tegel-lite-setup`.
- This skill only ever tells you *which* tokens to lean on and *how much* — not
  to invent new ones. Inventing is still forbidden.
- Type tokens (`--type-*`) hold plain numbers, so wrap sizes in `calc()`:
  `calc(var(--type-display-01-font-size) * 1px)`. The older names
  (`super-type-*`, `expressive-headline-*`, `detail-*`, `--tds-headline-*`)
  still ship for backwards compatibility only — don't use them.

## Before you call it done — render and verify in both modes

A surface is not finished when the markup is written; it's finished when you've
*looked* at it rendered, in **both** light and dark. Most of the gap between a
first draft and a polished result is caught here, not in the writing. Run this
pass every time:

1. **Render light AND dark, and actually look.** Token choices that seem right
   in the abstract routinely fail in one mode — a card that vanishes into the
   ground, a "well" with no contrast, text that drops out. A composition that
   only works in one mode is broken (spine rule 4). Fix the composition, not the
   mode. Take a screenshot of each; don't trust the markup.
2. **Confirm every surface separates without a border.** If a card, panel, or
   well only reads because of an outline, that's the bug rule 7 names — step the
   surface or widen the gutter instead. Scan specifically for any
   `--color-border-{subtle,soft,defined,strong}` around a card and delete it.
3. **Check casing on every heading.** Tegel's element rules uppercase `h1`–`h6`
   by default. On a Functional surface, small working titles (section labels,
   card titles, the page greeting) must be sentence case — set
   `text-transform: none` on them explicitly; a class that doesn't set it loses
   to Tegel's element rule and renders uppercase. (See the type-cascade gotcha:
   class selectors win, but only for the properties they actually declare.)
4. **Count display-font headlines.** Exactly one per page — the H1 in the
   Scania Headline face (Expressive: ≤ one hero per viewport). Any section or
   card title set in the Headline display font (`--type-display-*-font-family`
   or `--type-headline-01-*`) is a bug — those use the sentence-case working
   scale (`--type-headline-02-*` and below). Grep your styles for the display font and
   confirm it appears once.
5. **Scan for kickers and section numbers.** No number, step counter, kicker,
   or tag parked above a heading — decorative section indices ('01', '02')
   included. Lead with the heading.
6. **Verify reduced-motion.** Any enter/transition you added must collapse under
   `prefers-reduced-motion: reduce`.
