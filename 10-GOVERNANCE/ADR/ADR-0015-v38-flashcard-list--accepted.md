# ADR-0015 — V3.8: build the catalogued flashcard-list block

| key | value |
|---|---|
| id | ADR-0015 |
| type | adr |
| status | Accepted |
| date | 2026-06-28 |
| owner | derick |

## Status

**Accepted** — 2026-06-28. Ships as spec version `3.8.0`.

## Context

`BLOCK-flashcard-list` has been catalogued `stable` in `INDEX-block-library`
since 3.0.0, and the GRAMMAR decision tree has routed Q/A content to it
("flashcard-style Q/A list → Flashcard list") the whole time — but, like the
chart family before V3.7, it was **never actually built** in either render path.
There was no CSS, no `render-card.mjs` emitter, and no `blocks.tsx` component, so
a card could route content to a flashcard list and then have nowhere to render
it. The capability the library advertised did not exist.

The block is wanted for a specific, recurring job: at the Application beat, distil
a topic into a short set of question/answer pairs the reader can self-test
against — the recall companion to the checklist. The format is deliberately
small: a question and an answer, a few words each, the ten best items, listed
simply.

This is a framework gap, not a card mistake, so it is fixed in the framework —
the same way V3.7 (ADR-0014) built the catalogued-but-unbuilt charts.

## Decision

Ship one minor version, `3.8.0`, implementing `flashcard-list` for real in
**both** render paths, behind two numbered rules.

- **R-32 — flashcard list (render contract).** The block renders as a
  hairline-separated `<dl class="flashcards">` of Q/A pairs, each pair a
  `<div class="fc"><dt>question</dt><dd>answer</dd></div>`. The question (`dt`)
  is the row's single emphasis at primary ink (`--ink`), semibold; the answer
  (`dd`) is secondary ink (`--ink-2`), regular weight. The weight + ink contrast
  carries the emphasis, so the block contains **no markdown bold** — a 10-row
  list therefore never trips the single-emphasis gate (R-12). The parallel
  questions are the adjacency exception (like stat-grid's parallel numbers).
  Scoped to `.canvas.v3-8` so every V3.0–V3.7 card stays pixel-identical.

- **G-16 — flashcard-list authoring.** Q/A pairs only; question ≤ 12 words,
  answer ≤ 20 words / one sentence; **5–10 pairs** ("the ten best"), not a
  glossary dump. Authored as a headerless `| question | answer |` markdown table
  — **the block id, not new syntax, selects the `<dl>`**, the same convention the
  charts use (R-30). It counts as a content block in the density budget (G-9).

The markup is duplicated verbatim between `render-card.mjs` (`emitFlashcards`,
plus `v3-8` in the canvas class chain) and `blocks.tsx` (`Flashcards`) so a React
card and its standalone HTML twin stay pixel-identical (the parity contract). The
flat stylesheet and a per-block HTML pattern in `BUILD-card-no-tools.md` are kept
in sync so a tool-less LLM can emit the block from `llms.txt` alone. The
validator adds `flashcard-list` to its data-table set, exempting its Q/A rows
from the G-11 takeaway-row requirement (charts and stat-grid already were).

## Consequences

**Positive:**

- The block library stops advertising a block it could not render.
- Cards gain a dedicated, scannable recall section without leaving the grayscale
  ramp, the 393pt grid, or the single-emphasis discipline.
- A tool-less LLM can build the block from the published spec alone (flat CSS +
  per-block pattern + worked snippet are all in the lead section).

**Negative:**

- Both render paths now carry one more pair of duplicated markup to keep in sync
  (mitigated: the markup is small and commented as a parity pair).

**Neutral:**

- Length compatibility is unchanged (`standard,xl`): ten Q/A pairs is a
  Standard/XL-scale section, not a Mini one.

## Decision Drivers

- Honour the catalogue: build the block that already exists, do not invent a new id.
- Keep single-emphasis intact: the questions are a parallel set, not ten emphases.
- LLM legibility: authored as a plain table, no new card syntax.
- Pixel parity between the two render paths.

## Considered Options

1. **Author each Q/A as a bolded `faq`-style pair.** Rejected: ten bolded
   questions would trip the single-emphasis gate, and the `<dl>` reads denser and
   more scannable than ten prose blocks.
2. **Add the styles at base level (retroactive).** Rejected: a new block is an
   addition, not a defect fix — the retroactive base-level exception (ADR-0011) is
   reserved for corrections. Scope to `.canvas.v3-8` like every other new block.
3. **Build `flashcard-list` under R-32 + G-16, scoped to V3.8 (chosen).** Mirrors
   the V3.7 chart build exactly.

## Decision Outcome

Option 3. It closes the gap between what the library claims and what the renderer
does, gives the steward the wanted recall section, and stays inside the existing
grayscale, single-emphasis, frozen-at-version grammar.

## Links

- Builds on ADR-0014 (V3.7 — built the catalogued chart family the same way) and
  ADR-0010 (deterministic renderer).
- RENDERING-spec § R-32; GRAMMAR § G-16; `INDEX-block-library` — `flashcard-list`.
