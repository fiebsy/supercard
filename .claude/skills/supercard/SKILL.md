---
name: supercard
description: Build a Supercard from a topic — runs the dynamic assembly pipeline (deep research → breakdown MD → Supercard MD) in one of four modes (summary, briefing, deep-dive, reference). Use when the user wants to research, summarize, break down, deep-dive, or build a reference on a topic, book, or event in the Supercard format.
---

# Supercard build

Runs the card assembly pipeline defined in `10-GOVERNANCE/PIPELINE-card-assembly.md`.
The pipeline shape: **Request → Mode → Check research store → Deep research →
Breakdown MD → Supercard MD → Render → Publish**.

The breakdown MD is the uncompressed deep-research report and source of truth;
it lives in `60-RESEARCH/` and is registered in `INDEX-research-reports.md`. The
card is a constrained *view* of it. Re-running the conversion with a different
mode produces a different card from the same research. Every request ends with a
rendered HTML card published to `docs/` so the user can view it online.

## Before you start

Read, in order:

1. `00-INDEX/INDEX-supercard-v3.md`
2. `10-GOVERNANCE/PRINCIPLES-supercard-v3.md`
3. `10-GOVERNANCE/GRAMMAR-block-composition.md`
4. `10-GOVERNANCE/PIPELINE-card-assembly.md`

Keep handy: `10-GOVERNANCE/LENGTHS-mini-standard-xl.md`,
`10-GOVERNANCE/RENDERING-spec.md`, `00-INDEX/INDEX-block-library.md`,
`50-TEMPLATES/TEMPLATE-breakdown.md`, `60-RESEARCH/INDEX-research-reports.md`,
`docs/README.md`.

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
2. **Check the research store** — grep `60-RESEARCH/INDEX-research-reports.md` for the topic. If a report exists, extend or re-view it instead of re-researching; if it is sufficient, skip to step 4 and derive a new card from it under the requested mode.
3. **Research → breakdown** — deep research first, always, even in `summary` mode. User sources → web → prior `60-RESEARCH/` reports and `30-CARDS/` / `90-ARCHIVE/` cards. Every fact carries its source and confidence. Write `60-RESEARCH/BREAKDOWN-{slug}.md` from `50-TEMPLATES/TEMPLATE-breakdown.md`: the full uncompressed deep-research report — research brief, research log, all 7 beats, and the full research apparatus (source register, quotes bank, numbers bank, contested claims, open questions, confidence). **No length budget — maximize completeness.** Then register it: add/update its row in `60-RESEARCH/INDEX-research-reports.md`.
4. **Convert** — for each content unit: run the GRAMMAR decision tree → block type; check `length_variants` + `lifecycle` in `INDEX-block-library`; apply the mode's length bias; author each block with single emphasis. Write `30-CARDS/CARD-{YYYY-MM-DD}-{slug}--draft.md` (or `-part-N` if a `deep-dive` exceeds 25 blocks) from the matching `TEMPLATE-supercard-*`. Set the card's `research_report` frontmatter, and append a card derivation log entry to the breakdown.
5. **Gates** — run all seven constraint gates (length, single emphasis, loft, redundancy, screenshot test, grayscale/type, frozen-at-version). Fix and re-run any failure.
6. **Render and publish** — mandatory, per `RENDERING-spec` (ADR-0007). Render standalone HTML at 393pt mobile width to `docs/cards/CARD-{YYYY-MM-DD}-{slug}.html` with `<meta>` provenance, add a gallery entry to `docs/index.html`, then commit and push so the card is viewable online.

## Notes

- Use Core/Stable blocks only unless the user explicitly asks for Experimental.
- `deep-dive` must be long *without* being repetitive — length comes from breadth of distinct content, never restatement. The redundancy filter runs hardest here.
- The breakdown is kept, not discarded — it is the genealogy of the card (PRINCIPLES 10) and lives in the dedicated `60-RESEARCH/` store (ADR-0006).
- Never re-research a topic that already has a report — that is the costliest duplication. Check the registry first.
- See `30-CARDS/CARD-2026-05-14-spaced-repetition--draft.md` for a worked sample card, and `60-RESEARCH/BREAKDOWN-spaced-repetition.md` for the research report it was derived from.
