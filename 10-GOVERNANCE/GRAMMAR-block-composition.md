# GRAMMAR — Block Composition

| key | value |
|---|---|
| id | GRAMMAR-block-composition |
| type | governance |
| era | atlas |
| version | 3.1.0 |
| owner | derick |
| updated | 2026-05-15 |

How blocks combine into a Supercard. PRINCIPLES says *what we're doing*; this doc says *how to assemble it*.

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

**Beats are authoring scaffolding, not public labels.** The markdown card names each section by beat *and* block type (`Beat 7 · Close` / `BLOCK-pull-quote`) — that is authoring metadata, and it stays in the markdown. The *rendered* card labels each section with the beat **name only** (`CLOSE`); it never shows the `Beat N` index or the `BLOCK-*` id. A render is a shareable artifact — see `RENDERING-spec` § Output contract.

## The decision tree (shape-first, text last)

For each section's content, run this in order. Stop at the first match.

Is the content primarily a NUMBER?

- 1 number → Stat callout
- 2-6 parallel → Stat grid
- number over time → Sparkline (inline) or Line chart (full)
- number vs threshold → Gauge / Bullet chart
- number + context → Annotated single data point

Is the content a COMPARISON of 2-3 things?

- text comparison → Comparison block
- numeric magnitude → Bar chart
- change between two → Slope chart
- 2D positioning → Scatter / quadrant

Is the content a SERIES OF STEPS?

- undated → Process / flow
- dated → Timeline

- Is the content a DEFINITION? → Definition block
- Is the content a NUMBERED RULE? → Numbered principle
- Is the content a LIST OF DON'Ts? → Anti-pattern
- Is the content a TREND OVER TIME? → Line chart or Sparkline
- Is the content a DISTRIBUTION? → Histogram / Distribution
- Is the content REPEATED PATTERNS? → Small multiples
- Is the content STRUCTURED ROWS/COLS? → Table (sparingly)
- Is the content TECHNICAL/CODE? → Code
- Is the content MATHEMATICAL? → Equation
- Is the content a FAQ-style question? → FAQ
- Is the content a SYNTHESIS/TAKEAWAY? → Key takeaway

(Default fallback) → Standard text block

Text is the **residual** category, not the first choice. The inverse of how most synthesis is drafted.

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
| All-caps body runs longer than 4 words (V3.1+) | Disables word-shape recognition — restrict to micro-folio and ≤ 4-word kickers |
| Justified text (V3.1+) | Uneven word-spacing rivers disrupt tracking — body MUST be left-aligned, ragged-right |
| Two or more bolded runs in one block (V3.1+) | Destroys the single-emphasis signal — one bold per block, renderer errors |
| Deep whitespace alone as a section break (V3.1+) | Reads as "page didn't finish loading" — mid-beat rests use the asterism, not raw whitespace |
| Stacking ≥ 3 anchor blocks of the same type (V3.1+) | Checkerboard fatigue — the third anchor MUST switch type |
| `standard-text` block exceeding 75 words (V3.1+) | Crosses chunk-collapse threshold — split into two blocks with their own lead-clauses |
| Cover header elements outside R-13 (running brand-mark folio, mode badge, date eyebrow, context-chip strip, second eyebrow restating the micro-folio's beat name) (V3.1+) | Random labels load the cover with chrome instead of meaning — the cover permits exactly four elements (micro-folio, title, dek, hero), see RENDERING § R-13 |
| Section eyebrow on a beat's first block when the top-edge micro-folio is present (V3.1+) | Pure duplication — the folio already says `BEAT 3 · MECHANISM · 4 / 7`; a separate `MECHANISM` eyebrow 12pt below adds no information (R-10) |
