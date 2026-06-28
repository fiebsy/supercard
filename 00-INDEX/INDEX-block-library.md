# INDEX — Block Library

| key | value |
|---|---|
| id | INDEX-block-library |
| type | index |
| era | atlas |
| version | 3.8.0 |
| owner | derick |
| updated | 2026-06-28 |

---

The **39** V3 blocks across **7 families** (Numeric, Comparative, Sequential,
Definitional, Distributional, Editorial, Structural). Source of truth for block
lifecycle and length compatibility. Each block has (or will have) a full spec
doc in `20-BLOCKS/`.

**V3.2 re-homing.** Editorial used to hold 18 of 39 blocks, including blocks
the decision tree routes elsewhere. In V3.2 the family field is brought into
line with the decision tree's own logic:

- `BLOCK-column-chart` and `BLOCK-bullet-chart` are now **comparative**.
- `BLOCK-area-chart` is now **sequential**.
- `BLOCK-section-divider`, `BLOCK-asterism-rest`, `BLOCK-loft-card`, and `BLOCK-footnote-source` move to a new **structural** family.

Block ids are unchanged (ADR-0003 contract). Only the family field — used for
decision-tree routing — moves.

| id | name | family | lifecycle | version | length_variants | supersedes | last_review |
|---|---|---|---|---|---|---|---|
| BLOCK-stat-callout | Stat callout | numeric | core | 3.0.0 | mini,standard,xl | | 2026-04-29 |
| BLOCK-stat-grid | Stat grid | numeric | stable | 3.0.0 | standard,xl | | 2026-04-29 |
| BLOCK-sparkline | Sparkline | numeric | stable | 3.0.0 | mini,standard,xl | | 2026-04-29 |
| BLOCK-gauge-progress | Gauge / progress | numeric | stable | 3.0.0 | standard,xl | | 2026-04-29 |
| BLOCK-annotated-data-point | Annotated single data point | numeric | stable | 3.0.0 | standard,xl | | 2026-04-29 |
| BLOCK-comparison | Comparison block | comparative | core | 3.0.0 | standard,xl | | 2026-04-29 |
| BLOCK-bar-chart | Bar chart | comparative | stable | 3.0.0 | standard,xl | | 2026-04-29 |
| BLOCK-column-chart | Column chart | comparative | stable | 3.0.0 | standard,xl | | 2026-05-16 |
| BLOCK-slope-chart | Slope / bump chart | comparative | stable | 3.0.0 | standard,xl | | 2026-04-29 |
| BLOCK-scatter-quadrant | Scatter / quadrant | comparative | stable | 3.0.0 | standard,xl | | 2026-04-29 |
| BLOCK-dot-plot | Dot plot | comparative | stable | 3.0.0 | standard,xl | | 2026-04-29 |
| BLOCK-bullet-chart | Bullet chart | comparative | stable | 3.0.0 | standard,xl | | 2026-05-16 |
| BLOCK-timeline | Timeline | sequential | stable | 3.0.0 | standard,xl | | 2026-04-29 |
| BLOCK-process-flow | Process / flow | sequential | core | 3.0.0 | mini,standard,xl | | 2026-04-29 |
| BLOCK-line-chart | Line chart | sequential | stable | 3.0.0 | standard,xl | | 2026-04-29 |
| BLOCK-area-chart | Area chart | sequential | stable | 3.0.0 | standard,xl | | 2026-05-16 |
| BLOCK-definition | Definition | definitional | core | 3.0.0 | mini,standard,xl | | 2026-04-29 |
| BLOCK-numbered-principle | Numbered principle | definitional | core | 3.0.0 | mini,standard,xl | | 2026-04-29 |
| BLOCK-equation | Equation | definitional | stable | 3.0.0 | standard,xl | | 2026-04-29 |
| BLOCK-code | Code | definitional | stable | 3.0.0 | standard,xl | | 2026-04-29 |
| BLOCK-histogram | Histogram / distribution | distributional | stable | 3.0.0 | standard,xl | | 2026-04-29 |
| BLOCK-heatmap | Heatmap | distributional | stable | 3.0.0 | standard,xl | | 2026-04-29 |
| BLOCK-waffle | Waffle | distributional | stable | 3.0.0 | standard,xl | | 2026-04-29 |
| BLOCK-small-multiples | Small multiples | distributional | stable | 3.0.0 | standard,xl | | 2026-04-29 |
| BLOCK-standard-text | Standard text | editorial | core | 3.0.0 | mini,standard,xl | | 2026-04-29 |
| BLOCK-pull-quote | Pull quote | editorial | stable | 3.0.0 | standard,xl | | 2026-04-29 |
| BLOCK-quote-as-evidence | Quote-as-evidence | editorial | stable | 3.0.0 | standard,xl | | 2026-04-29 |
| BLOCK-flashcard-list | Flashcard list | editorial | stable | 3.0.0 | standard,xl | | 2026-04-29 |
| BLOCK-anti-pattern | Anti-pattern | editorial | core | 3.0.0 | mini,standard,xl | | 2026-04-29 |
| BLOCK-checklist | Checklist | editorial | core | 3.0.0 | mini,standard,xl | | 2026-04-29 |
| BLOCK-annotated-visual | Annotated visual | editorial | stable | 3.0.0 | standard,xl | | 2026-04-29 |
| BLOCK-image-caption | Image with caption | editorial | stable | 3.0.0 | mini,standard,xl | | 2026-04-29 |
| BLOCK-table | Table | editorial | stable | 3.0.0 | standard,xl | | 2026-04-29 |
| BLOCK-faq | FAQ | editorial | stable | 3.0.0 | standard,xl | | 2026-04-29 |
| BLOCK-key-takeaway | Key takeaway / TL;DR | editorial | core | 3.0.0 | mini,standard,xl | | 2026-04-29 |
| BLOCK-section-divider | Section divider | structural | stable | 3.0.0 | standard,xl | | 2026-05-16 |
| BLOCK-footnote-source | Footnote / source aggregator | structural | stable | 3.0.0 | standard,xl | | 2026-05-16 |
| BLOCK-loft-card | Loft-card | structural | core | 3.0.0 | standard,xl | | 2026-05-16 |
| BLOCK-asterism-rest | Asterism rest (mid-beat) | structural | deprecated | 3.1.0 | — | **Retired in V3.6 (R-24, supersedes R-11/G-10)** — never renders | 2026-06-25 |

## Rules by version (per block)

Additive rules that apply to cards with `frozen_at_version: 3.1.0` or higher.
V3.0 cards remain on V3.0 rules per ADR-0003. The `rules_by_version` field
emitted into the `blocks` layer carries one entry per affected version so an
agent reading `blocks.json` does not need to cross-reference grammar to know
which rules apply to which `frozen_at_version`.

### BLOCK-standard-text (revised V3.1)

- Word cap: **75** (a block exceeding this MUST be split into two)
- Sentence cap: **4**
- Lead-clause: **REQUIRED** — bolded 2–6-word noun phrase or imperative
- Internal spacing: 8pt between thought-groups, 16pt between sub-paragraphs
- Additional bold runs: **FORBIDDEN** (single emphasis per block; the lead-clause is it)
- Italics: permitted **only** for titles of works and foreign terms (never for emphasis)

### BLOCK-stat-callout (clarified V3.1)

- Verbal anchor: **REQUIRED** — one sentence naming what the stat means and its direction
- Bare numbers without a verbal frame are forbidden (cognitive-load failure per Sanchez & Wiley 2006)

### BLOCK-pull-quote (clarified V3.1)

- Chrome: forbidden — no rules, no quotemark boxes
- Emphasis: a single oversized opening quotation glyph (U+201C) at 1.5× body size, weight 500
- Attribution: **REQUIRED** at 11pt, 60% gray, weight 400

### BLOCK-table (revised V3.1)

- Takeaway row: **REQUIRED** for tables with ≥ 4 data rows (see GRAMMAR § G-11)
- Visual: bolded bottom row, weight 600, no top border on the row
- Tables with the takeaway row count as **anchor blocks** in density budgets (G-9); tables without it count as content

### BLOCK-code (clarified V3.1)

- Bolded gloss above the `<pre>`: **REQUIRED** — one-line bolded clause stating what the code does
- The gloss is the block's single emphasis; no bold runs inside the code itself
- Body weight inside `<pre>` is regular SF Mono; comments stay at body weight, not italic

### BLOCK-flashcard-list (built V3.8)

- Render contract: **REQUIRED** as of V3.8 — `stable` in the library since 3.0.0 but unbuilt until now (R-32, ADR-0015), the same path the charts took at V3.7
- Authored as a headerless `| question | answer |` markdown table; the block id selects the `<dl class="flashcards">` render (no new syntax — the R-30 convention)
- Q/A discipline: question ≤ 12 words, answer ≤ 20 words / one sentence; **5–10 pairs** ("the ten best"), not a glossary dump (GRAMMAR § G-16)
- Single emphasis is the question (`dt`, primary ink); the answer (`dd`) is secondary ink. **No markdown bold** — the parallel questions are the adjacency exception, not multi-emphasis, so a 10-row list never trips R-12
- Counts as a **content block** in the density budget (G-9), like a checklist

### BLOCK-asterism-rest (V3.1 — RETIRED in V3.6)

> **Retired by R-24 (supersedes R-11 / G-10).** The asterism rest never renders.
> The block id is kept (ADR-0003 contract) but is `deprecated` and emits nothing.
> A long content run breaks to an anchor or splits the beat (G-9); the 64pt beat
> gap (R-15) does the rest-the-eye work. Original spec, for genealogy: a centered
> `⁂` at body size/weight with a 32pt vertical band, not counted in density
> budgets (G-9) or total-block counts (L-5).

## V3.7 — first chart/numeric blocks implemented (R-30 / R-31)

Through V3.6, four numeric/comparative blocks were catalogued `stable` here but
**never built** in either render path. V3.7 implements them for real (ADR-0014):

- **`bar-chart`** and **`line-chart`** (R-30) — inline-SVG, strict grayscale, one
  focal element. Authored as a plain `| label | value |` table; the bolded value
  cell is focal.
- **`stat-grid`** and **`stat-callout`** (R-31) — parallel metrics on a CSS grid,
  and the reserved 56pt hero number with its required verbal anchor.

Lifecycle is unchanged (`stable`) — these were always meant to exist; V3.7 just
makes the renderer honour the catalogue. `column-chart` and `area-chart` remain
catalogued-but-unbuilt (out of R-30's scope). Authoring grammar: GRAMMAR § G-15.

## V3.8 — flashcard-list built (R-32)

Through V3.7, `BLOCK-flashcard-list` was catalogued `stable` (since 3.0.0) and
routed by the decision tree ("flashcard-style Q/A list → Flashcard list") but
**never built** in either render path — exactly the state the chart blocks were
in before V3.7. V3.8 implements it for real (ADR-0015):

- **`flashcard-list`** (R-32) — a compact Q/A study list rendered as a
  `<dl class="flashcards">`, strict grayscale, hairline-separated rows. The
  question is the row's single emphasis; the answer is secondary ink. Authored
  as a headerless `| question | answer |` table. Authoring grammar: GRAMMAR
  § G-16.

Lifecycle is unchanged (`stable`) — it was always meant to exist; V3.8 makes the
renderer honour the catalogue. Length compatibility is unchanged
(`standard,xl`): ten Q/A pairs is a Standard/XL-scale section, not a Mini one.

## V3.4 backwards compatibility

No blocks were added, removed, deprecated, or had their length-compatibility changed in V3.4. The cut was entirely typography, spacing, and writing-discipline. Every block at every lifecycle tier renders identically under V3.4 as it did under V3.3, with the optional tinted-surface affordance (R-16) and optional Apple register (R-18) available to cards that opt in.
