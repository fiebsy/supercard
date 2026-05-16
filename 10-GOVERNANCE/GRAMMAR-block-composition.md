# GRAMMAR — Block Composition

| key | value |
|---|---|
| id | GRAMMAR-block-composition |
| type | governance |
| era | atlas |
| version | 3.3.0 |
| owner | derick |
| updated | 2026-05-16 |

How blocks combine into a Supercard. PRINCIPLES says *what we're doing*; this doc says *how to assemble it*. The block-selection procedure (below) is the single composed routine an agent walks for every section.

---

## The seven-beat narrative spine

Every Supercard moves through some subset of these beats, in order:

1. **Hook** — card-in-hero. The Postcard inheritance. One screenshot conveys the entire essence.
2. **Evidence** — why this matters. Stat callout, stat grid, bar chart.
3. **Mechanism** — how it works. Process, diagram, definition, code.
4. **Comparison** — what it's NOT. Comparison block, slope chart, table.
5. **Counter** — honest steelman. Anti-pattern, opposing quote, distribution.
6. **Application** — so what / how to act. Checklist, principle, FAQ.
7. **Close** — bottom line. Key takeaway or pull-quote.

**Length scaling:**

- **Mini (5–8 blocks)** — Beats 1, 2, 3, 6, 7 only. One block per beat.
- **Standard (10–14 blocks)** — All 7 beats, mostly single block per beat.
- **XL (18–25 blocks)** — All 7 beats, multi-block per beat with internal rhythm.

Never run more than 3 long sections in a row. Section dividers mark beat boundaries only — chapter breaks, not paragraph breaks. Above 25 blocks → split into a multi-part Supercard.

**Beats are authoring scaffolding, not public labels.** The markdown card names each section by beat *and* block type (`Beat 7 · Close` / `BLOCK-pull-quote`) — that is authoring metadata, and it stays in the markdown. The *rendered* card emits **no** beat number, position counter, or block-type label (R-10 V3.3, I7 — no scaffold leakage). A beat boundary in the rendered card is whitespace and the first block's own anchor; a single short editorial eyebrow (`The medical study`) is permitted only when that anchor doesn't name the content. A render is a shareable artifact — see `RENDERING-spec` § Output contract.

## Block selection procedure (the one routine)

For each unit of content the breakdown produces, walk these steps **in order**. Each step is either a filter (eliminates candidates) or a transform (rewrites the unit). Don't skip; the steps depend on each other.

1. **Shape-first match** — run the decision tree below; record the first branch that matches (subject to precedence).
2. **Apply precedence** — if the unit matched multiple branches, use the precedence list to pick one and only one block.
3. **Apply length-variant filter** — drop candidates whose `length_variants` (in `INDEX-block-library`) don't include the card's target length.
4. **Apply lifecycle filter** — Core/Stable only. Experimental requires an explicit ask from the user.
5. **Apply mode's block bias** — favour the modes table's `block_bias` blocks where the choice is otherwise a tie.
6. **Apply density budget (G-9)** — count the beat's anchor and content blocks so far. If adding the candidate would violate the 1:2–1:4 anchor-to-content ratio, or exceed 2 same-type consecutive anchors, or exceed 4 consecutive content blocks, recast or swap. Insert a mid-beat asterism rest (G-10) instead when the limit is 4 content blocks and a switch isn't warranted.
7. **Apply prose rules (G-7, G-8)** if the result is a prose block — every `standard-text`, `faq` answer, and `code` block opens with a 2–6-word bolded lead-clause (that bolded run *is* the block's one emphasis). Split at 75 words or 4 sentences.
8. **Apply block-specific V3.1 rules** — `stat-callout` requires a verbal anchor; `table` with ≥ 4 data rows requires a `**Takeaway**` row (G-11); `pull-quote` requires attribution; `code` requires a bolded gloss.
9. **Apply anti-pattern check** — run the unit against the anti-patterns table below. Any match → re-cast.
10. **Run constraint gates** — at draft completion, the card runs the gates in `PIPELINE § Stage 4`. Block selection inputs to gates G1, G2, G7, G8.

A worked numeric walk of this procedure on a Mini-mode card is in `EXAMPLE-mini-supercard`.

## The decision tree (shape-first, text last)

For each section's content, run this in order. Stop at the first match, **subject to the precedence rules below**.

Is the content primarily a NUMBER?

- 1 number → Stat callout *(requires a verbal anchor sentence — V3.1+)*
- 2-6 parallel → Stat grid
- number over time → Sparkline (inline) or Line chart (full)
- number vs threshold → Gauge / Bullet chart
- number + context → Annotated single data point

Is the content a COMPARISON of 2-3 things?

- text comparison → Comparison block
- numeric magnitude (vertical bars) → Column chart
- numeric magnitude (horizontal bars) → Bar chart
- change between two → Slope chart
- 2D positioning → Scatter / quadrant
- ranking → Dot plot

Is the content a SERIES OF STEPS?

- undated → Process / flow
- dated → Timeline
- continuous trend → Line chart
- cumulative trend (under-curve volume matters) → Area chart

Is the content a DISTRIBUTION?

- frequency by bucket → Histogram
- two-axis density → Heatmap
- part-of-whole at fixed granularity → Waffle
- repeated parallel patterns → Small multiples

- Is the content a DEFINITION? → Definition block
- Is the content a NUMBERED RULE? → Numbered principle
- Is the content TECHNICAL/CODE? → Code *(requires a bolded gloss above the `<pre>` — V3.1+)*
- Is the content MATHEMATICAL? → Equation

Is the content STRUCTURAL FURNITURE (navigation/rest, not content)?

- beat boundary → Section divider
- mid-beat rest after every 4 content blocks in a beat of ≥ 5 → Asterism rest *(V3.1+; see G-10)*
- elevated callout earning loft → Loft-card
- aggregated sources → Footnote / source aggregator

Is the content EDITORIAL PROSE (the residuals)?

- Is the content a LIST OF DON'Ts? → Anti-pattern
- Is the content a CHECKLIST of actions? → Checklist
- Is the content a flashcard-style Q/A list? → Flashcard list
- Is the content a FAQ-style question? → FAQ *(answer takes a bolded lead-clause — V3.1+)*
- Is the content a verbatim lift from a source? → Pull quote / Quote-as-evidence
- Is the content STRUCTURED ROWS/COLS? → Table (sparingly) *(≥ 4 rows requires a `**Takeaway**` row — V3.1+)*
- Is the content an image with explanatory marks? → Annotated visual / Image with caption
- Is the content a SYNTHESIS/TAKEAWAY? → Key takeaway

(Default fallback) → Standard text block *(opens with a 2–6-word bolded lead-clause; ≤ 75 words, ≤ 4 sentences — V3.1+)*

Text is the **residual** category, not the first choice. The inverse of how most synthesis is drafted.

## Decision tree precedence (when a unit matches more than one branch)

The tree says "stop at the first match" — but a dated list of don'ts hits SERIES OF STEPS, COMPARISON (don't vs. do), and the editorial anti-pattern branch all at once. Use this order when ambiguity remains. Higher branches win.

1. **Numeric** — if the unit has a focal number, treat it as numeric. (A "list of don'ts" with a count is still anti-pattern, not stat-grid; numbers are *load-bearing* iff the number itself is the takeaway.)
2. **Comparative** — if the unit is fundamentally A-vs-B (parallel items on a shared axis), treat it as comparative.
3. **Sequential** — if order matters (dated, stepwise, causal chain), treat it as sequential.
4. **Distributional** — if the unit shows shape across a population, treat it as distributional.
5. **Definitional** — if the unit names a term, a numbered rule, code, or an equation.
6. **Editorial structural** — dividers, asterism rests, loft-cards, footnotes. These are *furniture*, not content; resort to them only when their structural job is the point.
7. **Editorial prose** — anti-pattern, checklist, FAQ, pull-quote, table, key-takeaway. The catalogued prose containers.
8. **Standard text** — the residual fallback.

**Explicit overrides:**

- **List-of-don'ts → Anti-pattern**, even when sequential-looking — the editorial framing carries the load, not the order.
- **Dated stat → Stat callout + caption** in Mini; **Sparkline / Line chart** in Standard/XL — Mini's density budget cannot afford a chart, so the time dimension goes into the caption.
- **Numbered principle vs. Numbered rule list → Numbered principle** when the principles are independent and each is the single emphasis of its block; **Checklist** when the items are subordinate actions on one shared verb.
- **Verbatim quote → Quote-as-evidence** in Beat 2 (Evidence) or Beat 5 (Counter); **Pull-quote** in Beat 7 (Close). Same shape, different anchoring role.
- **Table → Key takeaway** when the table is < 4 rows and its verdict fits in one sentence — the table's furniture overhead isn't earned.
- **Standard text** is *never* a tie-breaker. If two non-text branches matched, pick the higher one in the precedence list, even if standard-text would feel "safer." Standard text is residual.

## Adjacency rules

**Default: no two adjacent blocks are identical.** Prevents monotony.

**Two principled exceptions:**

1. **Parallel comparison** — three stat callouts showing three metrics on the same dimension is small multiples, not duplication
2. **Beat consistency** — three anti-patterns in a row inside Beat 5 is honest; varying the block type would be disingenuous

Test for the exceptions: identical-block runs are OK only if they present parallel information the reader is meant to compare. If there's no comparative payoff, vary the type.

## The redundancy filter

Before any block ships, ask: *what unique element does this add that's not in any other block on this Supercard?*

If the answer is "nothing" or "restates the thesis," cut the block.

## G-7. Bolded lead-clause on prose blocks (V3.1+)

Every `standard-text`, `faq` answer, and `code` block opens with a 2–6-word **bolded clause** that names the block's thesis.

- The lead-clause MUST be a noun phrase or imperative — never a hedge, never an interjection ("Well,", "So,", "It turns out").
- The lead-clause **is** the block's single emphasis (principle 2). No second bold run may appear in the same block.
- Italics are reserved for titles of works and foreign terms; never for emphasis (Rello & Baeza-Yates 2016 — italics are the worst-performing style for dyslexic and ADHD readers).
- `code` blocks satisfy this rule via a one-line bolded gloss above the `<pre>` (e.g., **`What this snippet does.`**), not by bolding inside the code itself.

## G-8. Thought-group ramp inside prose blocks (V3.1+)

`standard-text` blocks MUST NOT exceed **75 words** or **4 sentences**. Inside a block, sentences group into thought-groups (1–3 sentences each) separated by whitespace alone — never by rules, bullets, or chrome.

| Spacing token | Use |
|---|---|
| default line-height (26pt at 17pt body) | within a thought-group |
| 8pt margin-block | between thought-groups |
| 16pt margin-block | between sub-paragraphs |

A block that needs more than 75 words MUST be split into two `standard-text` blocks separated by a 24pt inter-block gap; each block carries its own bolded lead-clause.

## G-9. Density budget per beat (V3.1+)

Every beat balances **anchor blocks** against **content blocks**:

- **Anchor blocks** — stat-callout, pull-quote, key-takeaway, numbered-principle, table-with-takeaway-row.
- **Content blocks** — standard-text, faq, code, table-without-takeaway.

Rules:

1. Anchor-to-content ratio per beat MUST sit between **1:2** and **1:4**.
2. No more than **2 consecutive anchors of the same type**. The third anchor MUST switch type or be re-cast as content.
3. No more than **4 consecutive content blocks**. The fifth MUST be an anchor OR a mid-beat asterism rest (G-10).

## G-10. Mid-beat asterism rest (V3.1+)

Beats containing **≥ 5 blocks** MUST insert a centered asterism (`⁂`, U+2042) after the 4th block, and again after every additional 4 blocks within the same beat.

- The asterism is a literal text glyph at body size and body weight. No rule, no box, no tint, no transform.
- Vertical band: **32pt above, 32pt below** the glyph.
- Asterisms do NOT count as blocks for density-budget purposes (G-9).
- Beats with **≤ 4 blocks** MUST NOT use an asterism — inter-beat dividers do that work.
- Why a glyph and not deep whitespace alone: whitespace by itself is ambiguous to ADHD readers and can read as "the page didn't finish loading" (Wichary on dinkus typography). A glyph signals intent.

## G-11. Table takeaway-row requirement (V3.1+)

Any `table` block with **≥ 4 data rows** MUST end with a bolded **Takeaway** row stating the comparison's verdict in one clause.

- The takeaway row is what promotes a `table` from content block to anchor block (G-9).
- Tables with < 4 data rows MAY omit the takeaway row if the block's title or surrounding text already states the verdict.
- Visually: weight 600, no top border on the row, bottom border present.

## Length budgets

| Variant | Total blocks | Total scroll | Block height (typ.) | Hero card height |
|---|---|---|---|---|
| Mini | 5–8 | 3,000–5,000pt | 200–300pt | 600pt |
| Standard | 10–14 | 5,000–8,000pt | 200–350pt | 700pt |
| XL | 18–25 | 9,000–15,000pt | 200–400pt | 700pt |
| (split above) | 25+ | — | — | — |

## Loft / elevation budget

Hard cap: **1–3 elevated elements per Supercard.** The hero card is always one. Reserve the other 1–2 for the most important elevated callout and at most one mid-card breath. Everything else is flat.

## Pre-publication screenshot test

Run on every section, including the header. Five questions per section. Any "no" fails the section.

1. Does the screenshot convey **one complete idea** alone?
2. Can a stranger trace it back via the **corner glyph**?
3. Does the first sentence stand **without prior context**?
4. Is there **exactly one emphasized phrase** visible?
5. Does the chosen **block variant earn its scroll**?

## Anti-patterns (forbidden)

| Anti-pattern | Why |
|---|---|
| Every block in a card shell | Chrome becomes noise |
| Heavy drop shadows ≥15% opacity | Reads web-app, not editorial |
| Color used for emphasis | Violates strict grayscale |
| Charts where every bar is solid black | No signaling |
| Pull quotes that paraphrase body | Must be verbatim lift |
| Definition for context-obvious term | Filler — cut |
| Padding sections that don't synthesize | Fail redundancy filter |
| Forcing a chart when prose would do | False precision |
| Comparison block for non-parallel items | Category error |
| Process block for non-sequential steps | Implies false causality |
| Section divider between every section | Should mark beats only |
| Above 25 blocks in one Supercard | Split into multi-part |
| Stat-callout without a verbal anchor (V3.1+) | A bare number can't be parsed under cognitive load — frame it in one sentence |
| Three consecutive `standard-text` blocks in one beat (V3.1+) | Wall-of-text collapse — interrupt with an anchor or asterism |
| Table of ≥ 4 rows without a takeaway row (V3.1+) | Readers extract no thesis from raw rows under scan — close with a bolded verdict |
| Italics used for emphasis (V3.1+) | Italics are worst-performing for dyslexic/ADHD readers — emphasis is bold-only |
| All-caps body runs longer than 4 words (V3.1+) | Disables word-shape recognition — restrict to ≤ 4-word kickers and eyebrows |
| Justified text (V3.1+) | Uneven word-spacing rivers disrupt tracking — body MUST be left-aligned, ragged-right |
| Two or more bolded runs in one block (V3.1+) | Destroys the single-emphasis signal — one bold per block, renderer errors |
| Deep whitespace alone as a section break (V3.1+) | Reads as "page didn't finish loading" — mid-beat rests use the asterism, not raw whitespace |
| Stacking ≥ 3 anchor blocks of the same type (V3.1+) | Checkerboard fatigue — the third anchor MUST switch type |
| `standard-text` block exceeding 75 words (V3.1+) | Crosses chunk-collapse threshold — split into two blocks with their own lead-clauses |
| Cover header elements outside R-13 (top-edge folios, running brand-mark, mode badge, date eyebrow, context-chip strip, kicker above the title) (V3.1+, revised V3.3) | Random labels load the cover with chrome instead of meaning — the cover permits exactly three elements (title, dek, hero), see RENDERING § R-13 |
| Beat label, beat number, or position counter rendered to the reader anywhere on the card (`BEAT 3`, `4 / 7`, `MECHANISM · 4 / 7`) (V3.3) | Author scaffolding leaking into the reader's view — R-10 (V3.3) and I7 prohibit emitting structural-outline labels to the reader |
| Reader-visible footer carrying renderer version, era, mode, or render date (`SUPERCARD V3.3 · ATLAS · BRIEFING · 2026-05-16`) (V3.3) | Production stamp belongs in the `<meta>` block, not on the canvas — R-10 (V3.3) moves bottom-folio metadata to dev-only |
| A label longer than 4 words anywhere on the card (V3.1+) | A label that needs five words is a sentence pretending to be a label — promote to the dek/lead-clause or cut (R-14) |
| A label whose only function is to "balance" another label (V3.1+) | Symmetry isn't a reason; load-bearing is — if the second label answers no question the reader is asking, cut it (R-14) |
| A context-chip strip (`A · B · C` of three or more orphan chips) used where one dek/lead-clause sentence would integrate the same facts (V3.1+) | Three orphan chips force three parses; prose forces one — labels integrate facts, they don't list them (R-14) |
| A label nested inside an already-labeled container (eyebrow under a kicker under a section header) (V3.1+) | Three labels, one job — the typographic hierarchy alone should resolve it (R-14) |
| Inconsistent labeling — a label kind that appears on some sections and not others without a structural reason (V3.1+) | Inconsistency reads as bug, not intent; either every comparable section earns the label or none do (R-14) |
