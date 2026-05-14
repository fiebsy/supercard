---
name: supercard
description: Build a Supercard from a topic — runs the dynamic assembly pipeline (deep research → breakdown MD → Supercard MD) in one of four modes (summary, briefing, deep-dive, reference). Use when the user wants to research, summarize, break down, deep-dive, or build a reference on a topic, book, or event in the Supercard format.
---

# Supercard build

Runs the card assembly pipeline defined in `10-GOVERNANCE/PIPELINE-card-assembly.md`.
The pipeline shape: **Request → Mode → Deep research → Breakdown MD → Supercard MD → (Render)**.

The breakdown MD is the uncompressed source of truth; the card is a constrained
*view* of it. Re-running the conversion with a different mode produces a
different card from the same research.

## Before you start

Read, in order:

1. `00-INDEX/INDEX-supercard-v3.md`
2. `10-GOVERNANCE/PRINCIPLES-supercard-v3.md`
3. `10-GOVERNANCE/GRAMMAR-block-composition.md`
4. `10-GOVERNANCE/PIPELINE-card-assembly.md`

Keep handy: `10-GOVERNANCE/LENGTHS-mini-standard-xl.md`,
`10-GOVERNANCE/RENDERING-spec.md`, `00-INDEX/INDEX-block-library.md`.

If this skill runs outside the Supercard repo, clone or fetch those docs first
from the `fiebsy/supercard` repository.

## Modes

| Mode | Intent | Length bias |
|---|---|---|
| `summary` | The gist — reductive breakdown of an event/book/concept | Mini |
| `briefing` | Complete, balanced understanding (default) | Standard |
| `deep-dive` | Full mastery — exhaustive but never repetitive | XL or multi-part |
| `reference` | A navigable doc you return to | XL or multi-part |

If the user doesn't name a mode, infer it from the request verb and state your
choice in one line before proceeding.

## Steps

1. **Parse** — identify topic, mode, and source posture (user supplies sources vs. research from scratch). Confirm the mode in one line.
2. **Research** — deep research first, always, even in `summary` mode. User sources → web → prior cards in `30-CARDS/` and `90-ARCHIVE/`. Every fact carries its source.
3. **Breakdown** — write `40-LAB/BREAKDOWN-{slug}.md` from `50-TEMPLATES/TEMPLATE-breakdown.md`: the full uncompressed report, organized by the 7 beats, sources inline, no length budget.
4. **Convert** — for each content unit: run the GRAMMAR decision tree → block type; check `length_variants` + `lifecycle` in `INDEX-block-library`; apply the mode's length bias; author each block with single emphasis. Write `30-CARDS/CARD-{YYYY-MM-DD}-{slug}--draft.md` (or `-part-N` if a `deep-dive` exceeds 25 blocks) from the matching `TEMPLATE-supercard-*`.
5. **Gates** — run all seven constraint gates (length, single emphasis, loft, redundancy, screenshot test, grayscale/type, frozen-at-version). Fix and re-run any failure.
6. **Offer to render** — per `RENDERING-spec`: standalone scrollable HTML at 393pt mobile width.

## Notes

- Use Core/Stable blocks only unless the user explicitly asks for Experimental.
- `deep-dive` must be long *without* being repetitive — length comes from breadth of distinct content, never restatement. The redundancy filter runs hardest here.
- The breakdown is kept, not discarded — it is the genealogy of the card (PRINCIPLES 10).
- See `30-CARDS/CARD-2026-05-14-spaced-repetition--draft.md` for a worked sample of a finished card.
