# GRAMMAR — Block Composition

| key | value |
|---|---|
| id | GRAMMAR-block-composition |
| type | governance |
| era | atlas |
| version | 3.8.0 |
| owner | derick |
| updated | 2026-06-28 |

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
6. **Apply density budget (G-9)** — count the beat's anchor and content blocks so far. If adding the candidate would violate the 1:2–1:4 anchor-to-content ratio, or exceed 2 same-type consecutive anchors, or exceed 4 consecutive content blocks, recast or swap. When the limit is 4 content blocks and a switch isn't warranted, split the beat (the mid-beat asterism rest is retired in V3.6 — G-10 / R-24).
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
6. **Editorial structural** — dividers, loft-cards, footnotes. These are *furniture*, not content; resort to them only when their structural job is the point. (The asterism rest was retired in V3.6 — G-10 / R-24.)
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

Defined in full at PRINCIPLES § 9 — run it on every block at draft completion:
if a block adds no unique element (or just restates the thesis), cut it. The mode
sets how hard it runs (aggressive for `summary`, hardest for `deep-dive`).

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

1. **Anchor-to-content ratio.** When a beat carries **both** at least one anchor and at least one content block, keep the ratio between **1:2** and **1:4**. The check applies only to mixed beats: an all-anchor or all-content beat — common at the 1–2-block beats of a Mini — is *not* ratio-checked (a 1:2 ratio needs at least three blocks), and its density is instead governed at the **card level** by the per-length anchor budget (LENGTHS § L-5). The per-beat ratio is a validator **warning** (R-12), never a render-blocking error.
2. No more than **2 consecutive anchors of the same type**. The third anchor MUST switch type or be re-cast as content.
3. No more than **4 consecutive content blocks**. The fifth MUST be an anchor, or the beat splits (the mid-beat asterism rest is retired — see G-10).

## G-10. Mid-beat asterism rest (V3.1 — RETIRED in V3.6 by R-24)

> **Retired.** The asterism rest is gone. **R-24 (V3.6) supersedes G-10 and
> R-11** — no `⁂` (and no literal `* * *`) renders on the canvas. A long content
> run now breaks to an anchor or splits the beat (G-9, rule 3); the 64pt beat gap
> (R-15) does the rest-the-eye work the asterism used to. The original rule is
> retained in the canonical source for genealogy (P10); do not author it.

<!-- llms:exclude -->
~~Beats containing **≥ 5 blocks** MUST insert a centered asterism (`⁂`, U+2042) after the 4th block, and again after every additional 4 blocks within the same beat. The asterism is a literal text glyph at body size and body weight, with a 32pt vertical band above and below; it does not count as a block for density-budget purposes (G-9), and beats of ≤ 4 blocks must not use one.~~
<!-- /llms:exclude -->

## G-11. Table takeaway-row requirement (V3.1+)

Any `table` block with **≥ 4 data rows** MUST end with a bolded **Takeaway** row stating the comparison's verdict in one clause.

- The takeaway row is what promotes a `table` from content block to anchor block (G-9).
- Tables with < 4 data rows MAY omit the takeaway row if the block's title or surrounding text already states the verdict.
- Visually: weight 600, no top border on the row, bottom border present.

## G-12. Paragraph mobile cap (V3.4+)

Every `standard-text`, `faq` answer, and `code` gloss SHOULD stay at or below **3 sentences and 60 words** for cards intended to be read on a mobile canvas. The existing G-8 ceiling of **4 sentences and 75 words** remains the hard maximum; blocks between 60–75 words emit a validator warning. Above 75 words is an error and forces a split, identical to G-8.

**Why.** NN/g eye-tracking research and CDC plain-language guidance converge on 2–3 sentences / 40–60 words as the optimal paragraph length for mobile comprehension. The F-pattern scan means the first 1–2 sentences carry the load; longer paragraphs collapse into walls. The 75-word ceiling worked on desktop reading distances; the 60-word soft cap calibrates to mobile.

**Interaction with G-8.** G-12 is a SHOULD, G-8 is a MUST. A V3.4 card may have a block between 60 and 75 words if breaking it would harm the argument; the validator will warn but not error. Above 75 the rule is the same as it always was: split into two `standard-text` blocks, each carrying its own bolded lead-clause.

## G-13. Readability target (V3.4+)

Every prose block in a V3.4+ card SHOULD test at **Flesch–Kincaid grade ≤ 9**, **Flesch Reading Ease ≥ 60**, and **average sentence length ≤ 20 words** (hard limit 25–30). The validator computes these per-block and surfaces a warning when any threshold is breached. Two warnings in a single card promote to an error and block the render.

**Why.** WCAG 3.1.5 (AAA) asks for content at or below lower-secondary reading level. Apple's HIG Writing guide, The Economist Style Guide, and the CDC plain-language standard converge on the same envelope. The target is *measured*, not vibes: a grade-level reading on the prose tells you whether the writing landed where Principle 13 says it should.

**What to do when a block fails.** Shorten sentences; replace polysyllabic words with shorter equivalents; cut adverbs; use active voice; spell out abbreviations on first use; define jargon. If a passage genuinely cannot be simplified — a technical term that has no shorter equivalent — keep the block but tighten the surrounding sentences enough to pull the grade level down to compensate.

## G-14. Connective-flow vocabulary (V3.4+)

Bridges between beats use one of the five Apple-validated patterns. Position-language and meta-language are forbidden anywhere on the rendered canvas.

**The five patterns** (any of these counts as a beat bridge; combinations are fine):

1. **Eyebrow + tagline pair.** A short uppercase eyebrow names the topic (≤ 4 words, per R-14; distinct from its neighbours and from the heading it pairs with, per R-25); a tile-sized headline (28/32, semibold) lands the claim. The dominant pattern. Example: *"THE EVIDENCE / It cuts both ways."*
2. **Two-sentence haiku.** One headline holding two clipped sentences. Example: *"M5. The chip that zips."* The break is a period or colon (the em dash is banned in card content — R-24); both halves live in one Display-sized block.
3. **"Built to / Designed to / Engineered for" imperative.** Three-to-six-word imperative headlines. Example: *"Built for AI. From the silicon up."*
4. **Inline "Now you can…" kicker.** A bridging sentence inside a `standard-text` block, never as a section break. Example: *"All-new heart rate sensing. Now you can track your heart rate and calories burned during workouts."*
5. **Single-word eyebrow.** Sometimes the entire section bridge is one uppercase word. Example: *"PERFORMANCE."* The eyebrow is the bridge; the headline supplies the claim; the body supplies the proof.

**Forbidden** (each adds a row to the anti-patterns table below):

- Position-language: "Section 4", "Now we move to…", "In Beat 3", "Next up".
- Meta-language: "In the following section…", "Let's look at…", "We'll cover…", "As mentioned above…", "As we'll see…".
- Restatement bridges: an eyebrow or tagline that paraphrases the body below it (P9 redundancy filter applies).

## G-15. Chart and numeric block authoring (V3.7+)

The V3.7 numeric/chart blocks are authored as **plain markdown tables** — the
block id selects the visual, so no new syntax enters the card (RENDERING § R-30 /
R-31). Each opens with the usual `` `BLOCK-xxx` · Eyebrow `` annotation and an
optional `### ` subhead.

| Block | Markdown shape | Focal element |
|---|---|---|
| `bar-chart` | header row + `\| label \| value \|` data rows | the one **bolded** value cell goes full-ink (`\| Editorial \| **11** \|`) |
| `line-chart` | header row + `\| point \| value \|` data rows | the one **bolded** value's point goes full-ink |
| `stat-grid` | headerless `\| value \| caption \|` rows (2–6) | none — parallel metrics are the adjacency exception |
| `stat-callout` | `### ` subhead, optional intro, a standalone `**number**` line, then the verbal-anchor sentence | the number (`.stat`) |

Rules that still apply: exactly **one** focal element per chart (single emphasis,
P2); a `stat-callout` MUST carry its verbal-anchor sentence (a bare number is
forbidden); charts and stat-grids stay on the gray ramp (no color). A chart earns
its scroll only when *magnitude* or *shape* is the point — forcing a chart where
one number would do is the "false precision" anti-pattern.

## G-16. Flashcard-list authoring (V3.8+)

The `flashcard-list` block distills a topic into a short, scannable set of
**question and answer pairs** the reader can self-test against. It is the
Application-beat (Beat 6) recall companion to the checklist: where a checklist
lists *actions*, a flashcard list lists *the things worth remembering*.

- **Q/A pairs, nothing else.** Each row is one question and one answer. No
  multi-part questions, no answer that needs its own sub-list.
- **Few words per side.** The question is ≤ 12 words; the answer is ≤ 20 words
  and one sentence. A flashcard that needs a paragraph is a `definition` or a
  `faq`, not a flashcard. (This is tighter than the G-12 prose cap by design:
  the block earns its density from brevity.)
- **Pick the ten best.** A flashcard list holds **5–10** pairs — the
  highest-yield recall items for the topic, not every fact. Above ten, the set
  stops being a study list and becomes a glossary dump; split the beat or cut to
  the ten that matter. (5–10 is the same "parallel set" envelope as stat-grid's
  2–6 metrics, sized up for text rows.)
- **Single emphasis is the question.** The question is the row's one near-black
  element (the `dt`); the answer is secondary ink (the `dd`). The parallel
  questions down the list are the **adjacency exception** (like stat-grid's
  parallel numbers or a checklist's repeated rows), *not* multi-emphasis — the
  block carries no markdown `**bold**`, so a 10-row list never trips the
  single-emphasis gate. The eyebrow (and an optional `### ` subhead) names the
  deck's topic and is the block's screenshot anchor.
- **Authored as a headerless `| question | answer |` table.** The block id, not
  new syntax, selects the `<dl>` render (the R-30 convention shared with the
  charts and stat-grid). Render contract: RENDERING § R-32.

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
| Three consecutive `standard-text` blocks in one beat (V3.1+) | Wall-of-text collapse — interrupt with an anchor (the asterism is retired; G-10 / R-24) |
| Table of ≥ 4 rows without a takeaway row (V3.1+) | Readers extract no thesis from raw rows under scan — close with a bolded verdict |
| Italics used for emphasis (V3.1+) | Italics are worst-performing for dyslexic/ADHD readers — emphasis is bold-only |
| All-caps body runs longer than 4 words (V3.1+) | Disables word-shape recognition — restrict to ≤ 4-word kickers and eyebrows |
| Justified text (V3.1+) | Uneven word-spacing rivers disrupt tracking — body MUST be left-aligned, ragged-right |
| Two or more bolded runs in one block (V3.1+) | Destroys the single-emphasis signal — one bold per block, renderer errors |
| An em dash (—) in card prose (V3.6+) | Banned in reader-visible content — recast as a comma, colon, parentheses, or two sentences (R-24) |
| Stacking ≥ 3 anchor blocks of the same type (V3.1+) | Checkerboard fatigue — the third anchor MUST switch type |
| `standard-text` block exceeding 75 words (V3.1+) | Crosses chunk-collapse threshold — split into two blocks with their own lead-clauses |
| Cover header elements outside R-13 (top-edge folios, running brand-mark, mode badge, date eyebrow, context-chip strip, a *second* top-edge label) (V3.1+, revised V3.3, revised V3.7) | Random labels load the cover with chrome instead of meaning — the cover permits the title, dek, hero, and (V3.7+) **one** optional editorial eyebrow above the title (R-27); see RENDERING § R-13 |
| Beat label, beat number, or position counter rendered to the reader anywhere on the card (`BEAT 3`, `4 / 7`, `MECHANISM · 4 / 7`) (V3.3) | Author scaffolding leaking into the reader's view — R-10 (V3.3) and I7 prohibit emitting structural-outline labels to the reader |
| Reader-visible footer carrying renderer version, era, mode, or render date (`SUPERCARD V3.3 · ATLAS · BRIEFING · 2026-05-16`) (V3.3) | Production stamp belongs in the `<meta>` block, not on the canvas — R-10 (V3.3) moves bottom-folio metadata to dev-only |
| A label longer than 4 words anywhere on the card (V3.1+) | A label that needs five words is a sentence pretending to be a label — promote to the dek/lead-clause or cut (R-14) |
| A label whose only function is to "balance" another label (V3.1+) | Symmetry isn't a reason; load-bearing is — if the second label answers no question the reader is asking, cut it (R-14) |
| A context-chip strip (`A · B · C` of three or more orphan chips) used where one dek/lead-clause sentence would integrate the same facts (V3.1+) | Three orphan chips force three parses; prose forces one — labels integrate facts, they don't list them (R-14) |
| A label nested inside an already-labeled container (eyebrow under a kicker under a section header) (V3.1+) | Three labels, one job — the typographic hierarchy alone should resolve it (R-14) |
| Inconsistent labeling — a label kind that appears on some sections and not others without a structural reason (V3.1+) | Inconsistency reads as bug, not intent; either every comparable section earns the label or none do (R-14) |
| `standard-text` block exceeding 60 words on a V3.4+ card (V3.4+, warning) | Crosses mobile paragraph cap — NN/g and CDC research point to 2–3 sentences / 40–60 words as the comprehension floor |
| Prose block testing above Flesch–Kincaid grade 9 (V3.4+, warning) | Substance comes from real reasoning, not vocabulary — Hemingway's prose tests at Grade 5, The Economist enforces Grade 8 |
| Position-language transition between beats (`Next up`, `Section 4`, `Now we move to…`) (V3.4+) | Author-outline scaffolding leaking into the reader's view — same family as R-10/I7 violations, just at the seam |
| Meta-language transition between beats (`In the following section`, `Let's look at…`, `As mentioned above`) (V3.4+) | The reader doesn't need to be told that the author is about to make a point — they need the point |
| Transition eyebrow or tagline that paraphrases the body below it (V3.4+) | Redundancy filter (P9) at the section seam — the bridge must add a frame, not restate the claim |
| Flashcard list longer than ten pairs, or with paragraph-length answers (V3.8+) | A study list is the ten highest-yield recall items in few words each — past ten, or once an answer needs a paragraph, it is a glossary dump or a `faq`, not a flashcard (G-16) |
