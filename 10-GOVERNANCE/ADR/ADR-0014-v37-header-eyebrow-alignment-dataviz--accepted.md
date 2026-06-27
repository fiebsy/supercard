# ADR-0014 — V3.7: cover eyebrow, alignment hygiene, real data-viz blocks

| key | value |
|---|---|
| id | ADR-0014 |
| type | adr |
| status | Accepted |
| date | 2026-06-27 |
| owner | derick |

## Status

**Accepted** — 2026-06-27. Ships as spec version `3.7.0`.

> Note: an earlier accidental duplicate of ADR-0013 was committed under the
> `ADR-0014` id (byte-identical, never entered in the ledger). It is removed in
> this change; `0014` now carries the V3.7 cut below.

## Context

A review of the published cards against the screenshots surfaced four gaps, all
reaching past any one card into the framework:

1. **Every card looks the same.** The render paths only ever emit prose, lists,
   and tables. The block library advertises a full numeric/comparative chart
   family (`bar-chart`, `line-chart`, `stat-grid`, `stat-callout`, …) as
   `stable`, but **none of it was ever built** in either render path — the ids
   were catalogued and then never wired into `render-card.mjs` or `blocks.tsx`.
   There is no way to add a chart or a stat block, so there is no variety.

2. **A doubled hairline at table boundaries.** A table's final-row 0.5px rule
   and the `section` divider below it stack into two parallel lines separated
   only by the section's padding — the "double line in the header" defect.

3. **Tabular columns wrap raggedly on mobile.** With `table-layout: auto`, a
   three-column comparison on the 393pt canvas crowds and breaks inconsistently
   row to row, so the grid reads as accidental rather than aligned.

4. **The cover cannot open with an eyebrow.** R-13 permits exactly three cover
   elements (title, dek, hero) and lists a "kicker above the title" as a
   forbidden anti-pattern — but a single, disciplined editorial eyebrow above
   the title is exactly the magazine furniture the rest of the system already
   trusts (R-25), and it is wanted.

These are framework gaps, not card mistakes, so they are fixed in the framework.

## Decision

Ship one minor version, `3.7.0`, adding five numbered rules and implementing the
catalogued numeric/chart blocks for real in **both** render paths.

- **R-27 — cover eyebrow.** A single editorial eyebrow is now permitted in the
  kicker slot of the cover, **above** the title. It is content-naming, ≤ 4 words,
  distinct from the dek, and otherwise bound by R-14/R-25. The cover stack gains
  one join: canvas-top → eyebrow 32pt, eyebrow → title 8pt, then the existing
  12 / 24 / 48. R-13's "kicker above the title" anti-pattern row is replaced by
  this governed allowance. The renderer already emits the cover eyebrow above the
  `h1`; this rule makes it legal and styles its gap to the title.

- **R-28 — hairline hygiene.** A table's final-row rule no longer stacks with the
  section divider below it: `table tr:last-child td { border-bottom: 0 }`. One
  hairline per boundary. **Base-level and retroactive** (like R-22–R-24,
  ADR-0011) — it corrects a rendering defect, not a frozen design choice.

- **R-29 — tabular alignment.** V3.7 tables use a fixed column grid: the label
  column takes a fixed share, data columns split the rest evenly, numeric cells
  are tabular and right-aligned. Scoped to `.canvas.v3-7` so older cards stay
  pixel-identical.

- **R-30 — grayscale chart primitives.** `bar-chart` and `line-chart` render as
  inline SVG in strict grayscale: axes/gridlines at `--g-12`, the series at
  `--ink-3`, and **exactly one focal element** (bar or point) at `--ink` — the
  block's single emphasis (P2). Authored from a plain two-column `label | value`
  markdown table: the **block id, not new syntax, selects chart-vs-table**, so
  authoring stays legible markdown. The single bolded value cell is the focal one.

- **R-31 — numeric anchors.** `stat-grid` (2–6 parallel metrics, each a big
  tabular number + caption on a CSS grid) and `stat-callout` (one 56pt hero
  number + a required verbal-anchor sentence) enter the render contract.

The SVG geometry is duplicated verbatim between `render-card.mjs` and
`blocks.tsx` so a React card and its standalone HTML twin stay pixel-identical
(the parity contract, RENDERING-spec § Two render paths).

A first card, `CARD-2026-06-27-v37-data-and-alignment`, declares
`frozen_at_version: 3.7.0` and exercises every new rule.

Separately, the landing/sample chrome (three divergent button shapes with
duplicated SVG) is unified behind one `IconButton` primitive (`app/src/ui.tsx`)
— a perfect circle, even height and width — and the sample card gains a version
badge. This is renderer-app hygiene, not a spec rule.

## Consequences

**Positive:**

- Cards gain real visual range (charts, big numbers) without leaving the
  grayscale ramp or the 393pt grid.
- The "double line" and ragged-column defects are fixed; the double-line fix
  reaches every card on re-render.
- The block library stops advertising capability it never had.

**Negative:**

- Two render paths now carry duplicated SVG geometry that must be kept in sync
  (mitigated: the math is small and commented as a parity pair).
- R-28 changes the rendered pixels of older cards (a deliberate retroactive
  exception, consistent with ADR-0011).

**Neutral:**

- `column-chart` / `area-chart` remain catalogued-but-unbuilt; R-30 covers bar
  and line only, by scope.

## Decision Drivers

- Variety without breaking identity (the screenshots all looked the same).
- LLM legibility: charts authored as plain tables, the spec stays self-describing.
- Pixel parity between the two render paths.

## Considered Options

1. **CSS-only tweak** — fix the hairline and alignment, skip charts. Rejected:
   leaves the core "every card looks the same" complaint unaddressed.
2. **New block ids for charts** — invent fresh ids. Rejected: the ids already
   exist in the library (catalogued `stable`); they were just never built.
3. **Implement the catalogued blocks + governed eyebrow (chosen)** — honours the
   existing catalogue, adds the wanted cover eyebrow under discipline.

## Decision Outcome

Option 3. It closes the gap between what the library claims and what the renderer
does, adds the one cover element the steward wants, and fixes the two alignment
defects — all inside the existing grayscale, single-emphasis, frozen-at-version
grammar.

## Links

- Builds on ADR-0010 (deterministic renderer), ADR-0011 (retroactive base rules),
  ADR-0013 (R-25 editorial eyebrows — R-27 extends the eyebrow to the cover).
- RENDERING-spec § R-27–R-31; GRAMMAR § block selection (chart/stat grammar).
- `INDEX-block-library` — `bar-chart`, `line-chart`, `stat-grid`, `stat-callout`.
