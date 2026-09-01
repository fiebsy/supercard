# GOV — The Superdoc engine

| key | value |
|---|---|
| id | GOV-superdoc-engine |
| type | governance |
| era | atlas |
| version | 0.1.0 |
| owner | derick |
| updated | 2026-09-01 |
| status | draft |

The Supercard design soul, made injectable into any document-shaped artifact —
super PDFs, super dashboards, super one-pagers. This doc defines what carries
over from the card system verbatim, what re-derives per format, and the recipe
for standing up a new format. The first format built on it is the invoice
(`GOV-invoice-format--draft.md`). Decision record: ADR-0021.

---

## What a Superdoc is

A Superdoc is any non-card artifact that carries the Supercard identity: strict
grayscale, one typeface family, hierarchy from weight + ink + space rather than
size proliferation, hairlines instead of boxes, flat surfaces, and content so
scannable the reader's first question is answered before their eye finishes the
first pass. The card is one format on the engine; an invoice is another; the
engine is the part they share.

## D-1. The soul is canvas-independent; the canvas is not

Two layers, cleanly split:

**Carried verbatim from the card system** (same tokens, same values, same
rule numbers govern):

| What | Rule it comes from |
|---|---|
| The gray ramp (`--w`, `--g-06`, `--g-12`, `--g-30`, `--g-60`, `--k`) — the only ramp, no accent hue | P5 |
| The three-step text-ink ladder (#1A1A1A / #595959 / #767676, every step ≥ 4.5:1 on white) | R-20 |
| Role tokens over the ramp: ink carries glyphs, the ramp draws rules and fills; a rule token is never a `color` | R-39 |
| The `ui-rounded` / SF Mono stacks | P6 |
| Flat surfaces — no shadow anywhere; a bounded surface is border + radius + padding | R-22 |
| The hairline is `--g-12` (0.5pt separators, 1pt outlines) | R-23 |
| Labels earn their existence; micro-labels are UPPERCASE, +0.08em, the one positively-tracked role, ≤ 4 words | R-14, R-25 |
| Single emphasis per region — one loudest element, everything else steps back | P2 |
| Plain language as substance | P13 |
| Light-only: `color-scheme: only light`, page and `<meta>` | Gray ramp § |
| No em dash in reader-visible content | R-24 |

**Re-derived per format** (each format states its own values, on the same
logic the card used to derive its):

- The canvas (dimensions, margins, medium).
- The type scale (sizes and leadings for that reading distance).
- The spacing grid (the 8pt logic, restated in the canvas's units).
- The structural vocabulary (a card has blocks and beats; an invoice has
  zones and a field set).

A format never re-decides the first table. If a format seems to need an
accent color or a shadow, that is the format asking to leave the system.

## D-2. The canvas is the terminal medium

Each format names its canvas from the artifact's terminal form, the way the
card's 393pt column is "the thing being screenshotted." A print-destined
Superdoc is authored in **pt** and its canvas is the sheet: US Letter is
612 × 792pt with a 56pt margin (on the grid, D-4). The render carries a
`@media print` path in which the sheet is the paper — no viewer chrome
reaches the PDF.

## D-3. Three sizes per document

The card's three-size reading core (R-21) restated for a page held at arm's
length. A document's whole surface is set in **three sizes**:

| Role | Job | Differentiation inside the size |
|---|---|---|
| Display | the title and the one hero figure | — (it is the emphasis) |
| Body | everything that is content | weight 400/500/600 + the ink ladder |
| Micro-label | the eyebrow role at page scale | UPPERCASE, +0.08em, tertiary ink |

A mono role at body scale is permitted for identifiers only (D-5 of the
invoice: numbers a human transcribes digit by digit). The Vignelli test
carries over: if a zone seems to need a fourth size, reach for weight or ink
first — a size is the last lever.

## D-4. The 8pt grid, restated in the canvas's units

Print formats state the card's spacing logic in pt: 4 / 8 / 12 / 16 / 24 /
32 / 48. One gap value per boundary kind, applied uniformly — the R-15
"snap to one value" discipline at page scale.

## D-5. Alignment first, hairlines second, boxes never

Structure comes from alignment and whitespace; a 0.5pt `--g-12` hairline
appears only where whitespace alone cannot carry the boundary (a table
header, a totals rule, a footer). One hairline per boundary (R-28). No cell
boxes, no vertical rules, no zebra striping, no tinted panels behind text.

## D-6. One bounded card per page

Principle 4 at page scale: at most **one** bounded surface (1pt hairline,
radius, padding — no shadow, R-22) per page, reserved for the page's single
anchor moment. Everything else is flat. On the invoice it is the amount-due
card; a format that cannot say what its one card anchors uses none.

## D-7. Deterministic render, derived values computed

A Superdoc is rendered, never hand-laid-out (ADR-0010's contract): a source
file (JSON or markdown) → a pure-function renderer that inlines the format's
token CSS verbatim → one standalone HTML page in `docs/` → a PDF twin
printed from that HTML by Chromium. No wall-clock timestamps; a re-render of
an unchanged source is byte-identical. **Every derived value is computed at
render time, never copied from the source** — on an invoice, a stated total
that could drift from its own line items is the defect this rule exists to
prevent.

## D-8. The document is a document

Real, selectable, tagged text — never outlined type or a flattened image.
Semantic markup (`<main>`, one `<h1>`, real tables with `scope`, captions
for non-visual readers), logical reading order, document language and title
set, and the PDF exported tagged. And the print test the research reduces
to one sentence: **the artifact must survive a 1-bit photocopy** — no
meaning in color alone, no text on tints, no rules under 0.5pt, no
essential glyph lighter than the ink ladder allows.

## Standing up a new format (the recipe)

1. **Research the artifact**, not the aesthetic: who reads it, in what
   order, and what fields make it *work* (for the invoice: the AP clerk's
   five-field scan). Store the report in `60-RESEARCH/` and register it —
   ADR-0006 applies to formats too.
2. **Write the format spec** in `70-SUPERDOCS/` as `GOV-{format}-format`:
   the canvas (D-2), the reading order, the field set, and numbered format
   rules distilled from the research.
3. **Derive the token CSS** from `supercard.css` under D-1's split — copy
   the soul, restate the scale — as `app/src/super{format}.css` or a shared
   layer.
4. **Build the renderer** under D-7's contract, and a PDF step where the
   format is print-destined.
5. **Publish to `docs/`** and list the artifact in the gallery's Documents
   section — render-and-publish by default (ADR-0007) holds for documents.
6. **Run the design review** (`better-interface`) against the rendered
   artifact, checking findings against the Overridden table in
   `SKILLS-interface-map.md` — the card canvas's rulings (no shadow, no
   accent, light-only) bind Superdocs identically.
