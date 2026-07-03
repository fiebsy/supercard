# ADR-0016 — V3.9: rendering robustness — faithful markdown, mobile fit, completed charts

| key | value |
|---|---|
| id | ADR-0016 |
| type | adr |
| status | Accepted |
| date | 2026-07-03 |
| owner | derick |

## Status

**Accepted** — 2026-07-03. Ships as spec version `3.9.0`.

## Context

An audit of the published renders (headless Chromium at the 393px canvas,
scroll-width and bounding-box measurements, plus source-vs-render diffs) found
that the HTML renderer's generic path silently mis-rendered a large slice of
the catalogued grammar, and that the canvas leaked at the edges:

1. **Blind spots in the generic emitter.** Quote blocks rendered as literal
   `>` paragraphs; fenced code (the `equation` block) was shredded into
   mangled `<p>` runs; *every* list — checklists included — was stamped
   `class="sources"` and rendered as 13px footnote fine print with literal
   `[ ]` markers; wrapped list items were truncated mid-sentence;
   `section-divider` blocks lost their divider treatment; `timeline` tables
   never received their catalogued styling.
2. **Scaffold leakage (I7).** The renderer rendered *every* `## ` section, so
   four published cards carried their **Authoring notes** on the reader-visible
   canvas, and the template's `HERO-CARD:` line rendered as body text. The
   corner glyph itself carried `vN.N atlas` — version-and-era chrome R-10
   prohibits.
3. **Mobile-fit and rhythm defects.** `width=device-width` plus a fixed 393px
   canvas horizontally overflowed 375px phones; a four-column table under auto
   layout overflowed the content column on the V3.5 card; line-chart edge
   labels escaped the SVG viewBox into the gutter; sections ending in a
   list/table/chart ran 12–16px taller than prose sections (the "one beat gap
   per card" rule, R-15, was not actually true); the cover opened at 48–64px
   instead of R-13's exact 32pt.
4. **The chart catalogue was still incomplete**, and the bar/line math was
   duplicated between the two render paths — the exact condition the stewards'
   log said should trigger extraction when a third chart type landed.

The block library kept advertising treatments the renderer could not produce,
and "every Supercard looks great" failed at precisely the blocks that create
variety. These are framework defects, not card mistakes, so they are fixed in
the framework — the ADR-0011/ADR-0014 pattern.

## Decision

Ship one minor version, `3.9.0`, as three numbered rules:

- **R-33 — faithful markdown rendering (base level, retroactive).** Real
  blockquotes (`.pull` on pull-quote) with a caption-sized `<p class="attrib">`
  attribution; fenced code → `<pre>`; list treatment selected by block id
  (`.sources` only for `footnote-source`; ✓ checklist rows; ✗ anti-pattern
  rows; `<ol>` numerals for numbered-principle/process-flow; continuation
  lines folded); `section.divider` and `table.timeline` emitted; only
  beat/Sources/divider (or `BLOCK-`-annotated) sections render — Authoring
  notes, Metadata, and `HERO-CARD:` scaffold never reach the canvas; the
  corner glyph becomes identity-only (`✦ berafoot.com`).
- **R-34 — mobile-fit and rhythm hardening (base level, retroactive).**
  Viewport `width=393`; `table-layout: fixed` + cell wrapping promoted to base
  (R-29's defect half); `overflow-wrap` on the canvas; `section > :last-child`
  margins zeroed so the beat gap is one value for real; the cover stack snaps
  to R-13's 32/12/24 joins; chart text is clamped/anchored inside the viewBox.
- **R-35 — completed chart family.** `column-chart` and `area-chart` enter
  both render paths, authored as plain `| label | value |` tables (G-15, one
  bolded focal value). All four charts' math is extracted to
  **`app/src/chart-geometry.mjs`**, imported by `render-card.mjs` *and*
  `blocks.tsx` — the parity contract becomes structural instead of
  copy-discipline.

R-33/R-34 live at the base level of `supercard.css` / the renderer and apply
to **every card on re-render regardless of `frozen_at_version`** — the
ADR-0011 retroactive exception, invoked for the same reason: these correct
defaults the steward rejected (broken markup, overflow, wobbling rhythm), not
period-authentic design choices. The reading-layer rules (R-9/R-19, R-20,
R-21) stay frozen and untouched.

The same cut repairs the spec's own stale surfaces: the PRINCIPLES ADHD gate
questions that still *required* the retired asterism (contradicting R-24 in
the same published file), the R-9 tracking figure in gate question 10, the
decision-tree branch that still routed to the asterism rest, and the
glossary's "shadowed" loft definition.

## Consequences

**Positive:**

- Every catalogued block now renders as catalogued — checklists, anti-patterns,
  numbered principles, quotes, equations, timelines, dividers, and all four
  charts. Card-to-card variety stops collapsing into "prose, a list, a table."
- No published card overflows any mobile viewport; the beat rhythm is
  measurably uniform (97px at the 48pt gap, 129px at 64pt, across all cards).
- The published spec no longer instructs a builder to emit a glyph R-24 bans.

**Negative:**

- All published renders change on re-render (retroactive by design). The
  markdown sources are untouched, so the frozen-at-version *content* guarantee
  holds; what changes is defect repair in the view layer.
- `!important` enters the stylesheet in two places (cover join, last-child
  margin reset) — deliberate, commented, and preferable to per-scope override
  matrices, but a thing to watch.

**Neutral:**

- The `.v3-9` canvas class is emitted for forward extensibility; the new
  charts reuse the `.canvas.v3-7 .chart` contract through the class chain.

## Considered Options

1. **Scope the list/quote/pre fixes to `.canvas.v3-9`.** Rejected: a checklist
   rendering as truncated fine print is not a period-authentic design choice
   to preserve — it is a defect on every card that has one (ADR-0011
   precedent).
2. **Copy the chart math a third and fourth time.** Rejected: the stewards'
   log explicitly named a third chart type as the extraction trigger.
3. **Fix cards by hand-editing the published HTML.** Rejected outright:
   renders are views, never sources (ADR-0007/ADR-0010).
4. **Base-level R-33/R-34 + scoped-by-chain R-35, one shared geometry module
   (chosen).**

## Links

- Builds on ADR-0010 (deterministic renderer), ADR-0011 (retroactive
  base-level exception), ADR-0014 (V3.7 charts), ADR-0015 (V3.8 flashcards).
- RENDERING-spec § R-33 / R-34 / R-35; GRAMMAR § G-15 (column/area rows);
  `INDEX-block-library` § V3.9.
