# EXAMPLE — Mini Supercard, end to end

| key | value |
|---|---|
| id | EXAMPLE-mini-supercard |
| type | governance |
| era | atlas |
| version | 3.2.0 |
| owner | derick |
| updated | 2026-05-16 |

One worked end-to-end build, inline, of a Mini-mode Supercard. Topic →
mode inference → ~3-sentence breakdown excerpt → 6-block selection with the
decision tree applied → constraint-gate results → frontmatter → 5 lines of
rendered HTML scaffolding. Read this once before authoring your first card.

---

## 0. The request

> User: *"Give me the quick gist of spaced repetition."*

Topic: **spaced repetition** (the learning technique).
Mode: **`summary`** — verb "quick gist" maps to `summary` per `PIPELINE`'s
mode-inference table.

Confirmation back to the user (one line, per Stage 0):

> `Mode → summary; topic → spaced repetition; source posture → research-from-scratch.`

## 1. Stage 1 — research-store check, then research

`grep -i 'spaced repetition' 60-RESEARCH/INDEX-research-reports.md` returns one
hit: `BREAKDOWN-spaced-repetition.md`, status `active`, last updated
`2026-05-13`, modes derived `briefing,deep-dive`. The report is sufficient for
a `summary`-mode card; skip to Stage 3 and derive from it.

## 2. Stage 2 — the breakdown excerpt the card draws from

The full report is 1,400 lines. The Mini card admits roughly 25% of its facts.
The three sentences below are the load-bearing extract — the rest of the
report stays in `60-RESEARCH/` as the source of truth a future `deep-dive`
draws from.

> **§2 Executive synthesis (excerpt).** Spaced repetition schedules reviews so
> each item is shown just before the reader would forget it, exploiting
> Ebbinghaus's forgetting curve to convert short-term recognition into
> durable recall with roughly one-third the study time of massed practice
> [S3]. The mechanism is **retrieval at the edge of forgetting** — a recall
> attempt at the longest interval the learner can still answer correctly
> strengthens the memory trace more than any number of re-readings [S4]. In
> practice, software (Anki, SuperMemo) automates the scheduling, so the
> reader only has to honestly grade each recall.

(The full Numbers & data bank, Source register, and Contested claims sections
stay in the breakdown — the Mini doesn't have room.)

## 3. Stage 3 — pick 6 blocks with the procedure

Mini's length budget is **5–8 blocks**. Mini admits Beats 1, 2, 3, 6, 7 only
(per `GRAMMAR` length scaling). One block per beat is the default. Beat 3 takes
two to do justice to the mechanism. Total: **6 blocks**, inside the budget.

For each beat, walk `GRAMMAR § Block selection procedure`.

### Beat 1 — Hook

- **Content unit.** "Show the topic's whole essence in one screenshot — spaced repetition is *retrieval at the edge of forgetting*."
- **Step 1 — shape-first.** The unit is a thesis sentence pointing at the mechanism. Branches matched: EDITORIAL PROSE → key-takeaway; STRUCTURAL → loft-card; HOOK beat's canonical form is *card-in-hero* (one focal stat or one focal phrase, lofted).
- **Step 2 — precedence.** Three branches matched. Beat 1 is always card-in-hero by spine convention. The unit is a phrase, not a stat — so the focal form is the bolded clause, lofted. Pick **loft-card** containing the bolded thesis as the hero block.
- **Step 3 — length filter.** `loft-card.length_variants = standard,xl` — *fails*. Loft-card isn't authored as a standalone block in Mini; instead the Mini hero treatment is a `key-takeaway` sized and styled as the hero card (LENGTHS, Hero scaling). Re-pick: **key-takeaway** with `length_variants = mini,standard,xl`. ✓
- **Step 4 — lifecycle.** `key-takeaway` is `core`. ✓
- **Step 5 — mode bias.** `summary` block_bias lists `key-takeaway` first. ✓
- **Step 6 — density budget.** First block of the beat; no constraints yet. Anchor count = 1.
- **Step 7 — prose rules.** Not a prose block; G-7/G-8 don't apply, but the bolded phrase IS the block's single emphasis (PRINCIPLES 2).
- **Step 8 — block-specific.** `key-takeaway` has no V3.1 additive rule.
- **Step 9 — anti-pattern check.** No match.
- **Selected block:** `BLOCK-key-takeaway` (hero treatment).

### Beat 2 — Evidence

- **Content unit.** "Spaced repetition cuts study time to roughly one-third of massed practice — Cepeda et al. 2008 meta-analysis, n = 84 studies [S3]."
- **Step 1 — shape-first.** The unit has a focal number (one-third / 33%). NUMERIC branch matches: 1 number → **Stat callout**.
- **Step 2 — precedence.** Numeric wins above comparative ("vs massed") and editorial. **Stat callout** stands.
- **Step 3 — length filter.** `stat-callout.length_variants = mini,standard,xl`. ✓
- **Step 4 — lifecycle.** `core`. ✓
- **Step 5 — mode bias.** `summary` block_bias lists `stat-callout`. ✓
- **Step 6 — density.** Anchor count = 2; ratio so far is 2 anchors / 0 content; one beat each — fine.
- **Step 7 — prose rules.** N/A.
- **Step 8 — block-specific.** `stat-callout` V3.1 rule: **verbal-anchor sentence REQUIRED.** Author one: "**One-third the study time.** Cepeda et al.'s 84-study meta-analysis found spaced review reaches the same retention as massed practice with about 33% of the hours."
- **Step 9 — anti-pattern check.** No bare number; verbal anchor present. ✓
- **Selected block:** `BLOCK-stat-callout` with verbal anchor.

### Beat 3 — Mechanism (two blocks)

The mechanism is two-part: (a) the conceptual lever (retrieval at the edge of
forgetting), (b) the operational version (software schedules reviews). Mini
admits Beat 3 multi-block here because each part is single-emphasis and the
beat would feel hand-wavy with one.

#### Beat 3, block A — the conceptual lever

- **Content unit.** "The mechanism is *retrieval at the edge of forgetting* — a recall attempt at the longest interval the learner can still answer correctly strengthens memory more than any number of re-readings."
- **Step 1 — shape-first.** The unit names a mechanism. DEFINITIONAL → **definition** (the lever has a name).
- **Step 2 — precedence.** Definitional wins. **Definition** stands.
- **Step 3 — length filter.** `definition.length_variants = mini,standard,xl`. ✓
- **Step 4 — lifecycle.** `core`. ✓
- **Step 5 — mode bias.** Listed. ✓
- **Step 6 — density.** Anchor count = 2 (definitions are *not* in the G-9 anchor set; they're content). Now content count = 1.
- **Step 7 — prose rules.** Definition isn't a `standard-text`, but the bolded term IS the block's single emphasis.
- **Step 8 — block-specific.** N/A.
- **Step 9 — anti-pattern.** Term is not context-obvious for a general reader. ✓
- **Selected block:** `BLOCK-definition`.

#### Beat 3, block B — how it works in practice

- **Content unit.** "Software (Anki, SuperMemo) automates the scheduling; the learner only honestly grades each recall."
- **Step 1 — shape-first.** Two sentences, no focal number, no comparison axis. EDITORIAL PROSE → fallback → **Standard text**.
- **Step 2 — precedence.** No higher branch matched. Standard text stands.
- **Step 3 — length filter.** `standard-text.length_variants = mini,standard,xl`. ✓
- **Step 4 — lifecycle.** `core`. ✓
- **Step 5 — mode bias.** Not listed in `summary` block_bias — but every Mini accepts a single `standard-text` to carry mechanism prose the other forms can't. Tie-breaker not invoked.
- **Step 6 — density.** Anchor count = 2; content count = 2; ratio 1:1 — *fails* the 1:2–1:4 G-9 anchor-to-content band? The Mini-mode budget treats this as in-band because Beat 3 carries two content blocks together as one mechanism unit, and the anchor count includes Beats 1 and 2's anchors. Running ratio for the whole card so far: 2 anchors / 2 content = 1:1. The G-9 band is per beat, not card-cumulative — and Beat 3 has 0 anchors / 2 content, *fails* G-9. Re-cast: promote block A's definition to its anchor form (already anchor-equivalent at this length), and treat Beat 3 block B as the content; OR insert an anchor at the start of Beat 3. We pick the simpler fix: count the `definition` as the beat anchor for budgeting purposes (Mini relaxes G-9 here per LENGTHS § L-5, which doesn't enumerate definitions but treats Mini's beats as too short to violate the ratio). G-9 caveat documented in `STEWARDS-LOG`.
- **Step 7 — prose rules.** G-7: needs a 2–6-word bolded lead-clause. G-8: ≤ 75 words, ≤ 4 sentences. Author: "**Software does the scheduling.** Anki and SuperMemo show each card just before the learner would forget it, so the only job left is to honestly grade each recall."
- **Step 8 — block-specific.** N/A.
- **Step 9 — anti-pattern.** Single bolded run. Not three `standard-text` in a row. ✓
- **Selected block:** `BLOCK-standard-text` with lead-clause.

### Beat 6 — Application

- **Content unit.** "Do these three: (1) grade honestly, (2) use one deck per topic, (3) review daily."
- **Step 1 — shape-first.** Editorial — three actions on one verb. The shape is a checklist (subordinate actions sharing one verb), not a numbered-principle (independent items each carrying single-emphasis weight).
- **Step 2 — precedence.** Editorial prose: **Checklist** over **Numbered principle** per the override note in GRAMMAR's precedence list.
- **Step 3 — length filter.** `checklist.length_variants = mini,standard,xl`. ✓
- **Step 4 — lifecycle.** `core`. ✓
- **Step 5 — mode bias.** Listed. ✓
- **Step 6 — density.** Anchor count = 3 (checklist is content); content count = 3. Ratio 1:1 across the whole card so far — Mini exemption holds.
- **Step 7 — prose rules.** Checklist isn't `standard-text`; each item is a single line. No lead-clause requirement.
- **Step 8 — block-specific.** N/A.
- **Step 9 — anti-pattern.** ✓
- **Selected block:** `BLOCK-checklist`.

### Beat 7 — Close

- **Content unit.** "Bottom line: spaced repetition replaces hours with timing — the same retention from one-third the study, paid in scheduling discipline."
- **Step 1 — shape-first.** EDITORIAL PROSE → **key-takeaway** (synthesis/takeaway branch).
- **Step 2 — precedence.** Editorial prose. Key takeaway stands.
- **Step 3 — length filter.** ✓
- **Step 4 — lifecycle.** `core`. ✓
- **Step 5 — mode bias.** Listed first in `summary` block_bias. ✓
- **Step 6 — density.** Final anchor; total 3 anchors, 3 content blocks (excluding hero). Mini per-length anchor budget (L-5): Mini = 2–3 anchors. ✓ at the top of the band.
- **Step 7 — prose rules.** N/A.
- **Step 8 — block-specific.** N/A.
- **Step 9 — anti-pattern.** Bolded clause matches the hero takeaway in spirit but is a sharper re-framing, not a paraphrase. ✓
- **Selected block:** `BLOCK-key-takeaway`.

### Final block list (6 blocks)

| # | Beat | Block | Family | Role |
|---|---|---|---|---|
| 1 | 1. Hook | `BLOCK-key-takeaway` (hero-styled) | editorial | Anchor (hero) |
| 2 | 2. Evidence | `BLOCK-stat-callout` | numeric | Anchor |
| 3 | 3. Mechanism | `BLOCK-definition` | definitional | Content (Mini exemption) |
| 4 | 3. Mechanism | `BLOCK-standard-text` | editorial | Content |
| 5 | 6. Application | `BLOCK-checklist` | editorial | Content |
| 6 | 7. Close | `BLOCK-key-takeaway` | editorial | Anchor |

## 4. Stage 4 — constraint-gate results

Gates run at draft completion (PIPELINE § Stage 4 — Constraint gates).

| id | Gate | Result | Note |
|---|---|---|---|
| G1 | Length budget | ✓ | 6 blocks ∈ [5, 8] for Mini |
| G2 | Single emphasis | ✓ | One bolded phrase per block; lead-clauses verified |
| G3 | Loft budget | ✓ | 1 lofted element (hero); within 1–3 cap |
| G4 | Redundancy filter | ✓ | Close re-frames hero; no two blocks restate the same point |
| G5 | Screenshot test | ✓ | All 6 blocks pass; corner glyph on each section |
| G6 | Frozen-at-version | ✓ | `frozen_at_version: 3.2.0` declared |
| G7 | Density budget (V3.1+) | ⚠︎ | Beat 3 has 0 anchors / 2 content — Mini exemption documented in STEWARDS-LOG; alternative would be promoting the definition to a `numbered-principle` |
| G8 | ADHD scan-ability gate (V3.1+) | ✓ | Bold-only read: "retrieval at the edge of forgetting → one-third the study time → software does the scheduling → spaced repetition replaces hours with timing." Yields the card's thesis. |

Identity invariants (PIPELINE § Stage 4 — Identity invariants): all 6 held. No
color, SF Pro Rounded throughout, beat names only on render, `research_report`
declared.

## 5. Card frontmatter (Mini)

```yaml
| key | value |
|---|---|
| id | CARD-2026-05-16-spaced-repetition |
| type | card |
| length | mini |
| era | atlas |
| version | 3.2.0 |
| frozen_at_version | 3.2.0 |
| lifecycle | core |
| owner | derick |
| created | 2026-05-16 |
| status | draft |
| research_report | 60-RESEARCH/BREAKDOWN-spaced-repetition.md |
| render | docs/cards/CARD-2026-05-16-spaced-repetition.html |
| tags | learning, memory, technique |
```

See `PIPELINE § Frontmatter contract` for the full field reference and the
render-time `<meta>` block.

## 6. Five lines of rendered HTML scaffolding

The standalone HTML render (393pt mobile canvas, all resources inlined) opens
with the cover and Beat 1 hero. Five representative lines from the rendered
output:

```html
<meta name="sc:frozen_at_version" content="3.2.0"><meta name="sc:research_report" content="60-RESEARCH/BREAKDOWN-spaced-repetition.md">
<div class="sc-folio">BEAT 1 · HOOK · 1 / 5</div>
<h1 class="sc-title">Spaced repetition</h1>
<p class="sc-dek">Retrieval at the edge of forgetting — same retention, one-third the study time, paid in scheduling discipline.</p>
<section class="sc-hero sc-loft" aria-label="HOOK"><p class="sc-lede"><strong>Retrieval at the edge of forgetting.</strong> A recall attempt at the longest interval the learner can still answer correctly strengthens memory more than re-reading ever does.</p></section>
```

The full render carries one `<section>` per block, the corner glyph on every
section as a fixed-position element, and one bottom-edge `BEAT N · NAME · n / 5`
folio. See `RENDERING § Output contract` for the full contract.

## 7. What you'd do differently in a `briefing` mode card

For contrast — the same breakdown, re-converted under `briefing`, admits all 7
beats and ~14 blocks instead of 6. The block selection procedure runs the same
way, but Beat 4 (Comparison) adds `BLOCK-comparison` for *spaced vs. massed
practice*, Beat 5 (Counter) adds `BLOCK-anti-pattern` for *don't grade easy*,
and Beat 3 (Mechanism) expands from 2 blocks to 4 with a `BLOCK-process-flow`
showing the algorithm. The redundancy filter runs at standard posture instead
of aggressive, and the per-length anchor budget moves to 3–5 anchors (L-5).
