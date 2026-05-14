# 60-RESEARCH

The deep-research-report store. Every Supercard sequence begins here.

Per ADR-0006, this is the **dedicated home** of the research reports
(breakdowns) that cards are derived from. The breakdown is the uncompressed
source of truth (ADR-0005); this folder is its address.

## What lives here

- **Research reports** — `BREAKDOWN-{slug}.md`, one per researched topic,
  authored from [`50-TEMPLATES/TEMPLATE-breakdown.md`](../50-TEMPLATES/TEMPLATE-breakdown.md).
  The full, uncompressed deep-research report: every fact, stat, quote,
  mechanism, counter-argument, and open question, organized by the 7 beats,
  with sources inline and rated. **No length budget — maximize completeness.**
- **The registry** — [`INDEX-research-reports.md`](INDEX-research-reports.md),
  the lookup table for the whole store: one row per report, with the cards
  derived from each.

## The two rules

1. **Check the registry before researching.** Before Stage 1 of the pipeline,
   grep `INDEX-research-reports.md` for the topic. If a report already exists,
   *extend or re-view it* — never re-research from scratch. Research is the most
   expensive step; duplicating it is the costliest mistake.
2. **Register every report.** When a breakdown is created or updated, add or
   update its row in `INDEX-research-reports.md`, and list the cards derived
   from it in the breakdown's own frontmatter. The chain
   `research → breakdown → card(s) → render` must be navigable from either end.

## The report is the asset

A breakdown outlives any single card. One report can yield a `summary` card, a
`deep-dive` series, and a `reference` card — re-running the conversion under a
different mode produces a different card from the *same* research (ADR-0005).
The cards are views; the report is the asset. Author it for completeness, not
for any one card's length budget.

## Naming

`BREAKDOWN-{slug}.md` — slug in kebab-case lowercase, matching the slug used by
the cards derived from it. No status suffix: a report is a living document that
accretes research over time, not a draft that gets published.

## Worked example

[`BREAKDOWN-spaced-repetition.md`](BREAKDOWN-spaced-repetition.md) is a
fully-authored research report — the genealogy of
[`30-CARDS/CARD-2026-05-14-spaced-repetition--draft.md`](../30-CARDS/CARD-2026-05-14-spaced-repetition--draft.md).
Read it alongside the card to see how a constrained `briefing` view is drawn
from an uncompressed report.

See [`10-GOVERNANCE/PIPELINE-card-assembly.md`](../10-GOVERNANCE/PIPELINE-card-assembly.md)
for how reports are produced and consumed.
