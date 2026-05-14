# GRAMMAR — Block Composition

| key | value |
|---|---|
| id | GRAMMAR-block-composition |
| type | governance |
| era | atlas |
| version | 3.0.0 |
| owner | derick |
| updated | 2026-04-29 |

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
