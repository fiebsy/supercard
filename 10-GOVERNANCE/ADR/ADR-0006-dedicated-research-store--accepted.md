# ADR-0006 — Dedicated research-report store

| key | value |
|---|---|
| id | ADR-0006 |
| type | adr |
| status | Accepted |
| date | 2026-05-14 |
| owner | derick |

## Status

**Accepted** — 2026-05-14

## Context

ADR-0005 made the breakdown MD the uncompressed source of truth: every Supercard
sequence begins with a deep research report, and the card is a constrained
*view* of it. But the pipeline parked that report in `40-LAB/` — the same folder
as RFCs, audits, and experimental blocks.

That created three concrete problems:

- **No home.** The single most valuable durable artifact in the system — the
  research — lived in a drawer labelled "experiments." There was nowhere
  authoritative to *look* for prior research.
- **No registry.** Nothing tracked which topics had already been researched.
  Two sessions could research the same topic from scratch and never know the
  other report existed — pure duplication of the most expensive step.
- **No sequence legibility.** Genealogy-as-asset (PRINCIPLES 10) wants the chain
  *research → breakdown → card(s) → render* to be inspectable. With breakdowns
  scattered in the lab and cards in `30-CARDS/`, the chain was implicit, not
  navigable.

Research is not an experiment. It is the asset every card is derived from. It
needs a real address.

## Decision

Adopt a **dedicated research-report store** at `60-RESEARCH/`.

- Every deep research report (`BREAKDOWN-{slug}.md`) lives in `60-RESEARCH/`,
  not `40-LAB/`. It is authored from the expanded `TEMPLATE-breakdown`.
- `60-RESEARCH/INDEX-research-reports.md` is the **registry** — one row per
  report: id, topic, slug, mode, status, created/updated, source count, and the
  cards derived from it. It is the lookup table that makes the store a database,
  not a pile of files.
- **De-duplication is a pipeline gate.** Before Stage 1 (Deep research), the
  pipeline checks the registry for an existing report on the topic. If one
  exists, the sequence *extends or re-views* it rather than re-researching.
- Each report records, in its own frontmatter, the cards derived from it; each
  card records, in its frontmatter, the `research_report` it was derived from.
  The chain is navigable in both directions.
- `40-LAB/` keeps RFCs, audits, and experimental blocks. It no longer holds
  breakdowns.

## Consequences

**Positive:**

- One authoritative place to find prior research; the registry makes "has this
  been researched?" a one-grep question.
- The expensive step (research) is never silently duplicated.
- The full sequence — research → breakdown → cards → render — is navigable from
  either end.
- Reinforces ADR-0005's breakdown-as-source-of-truth by giving the source of
  truth a real home.

**Negative:**

- A new top-level folder and a registry to keep current. The registry is a
  hand-maintained index and can drift if the pipeline skips its update step —
  so updating it is a named, non-optional pipeline action.

**Neutral:**

- `40-LAB/`'s scope narrows to what it was always really for: in-flight
  experiments and proposals.

## Decision Drivers

- Genealogy-as-asset (PRINCIPLES 10): the research chain must be legible.
- The research step is the most expensive one — duplication is the costliest
  failure mode.
- ADR-0005 named the breakdown the source of truth; a source of truth needs an
  address.

## Considered Options

1. **Leave breakdowns in `40-LAB/`, add an index** — the index helps, but the
   research still has no authoritative home and reads as an experiment.
2. **Put breakdowns next to their cards in `30-CARDS/`** — couples one report to
   one card; breaks the ADR-0005 model where one report yields many cards.
3. **Dedicated `60-RESEARCH/` store with a registry (chosen)** — gives research
   a real address and a lookup table, keeps the one-report-many-cards model.

## Decision Outcome

Option 3. Option 1 treats the system's most valuable artifact as a side effect.
Option 2 silently re-couples research to a single card, undoing ADR-0005.
A dedicated store with a registry makes research a first-class, addressable,
de-duplicated asset.

## Links

- ADR-0005 (mode-driven assembly — breakdown as source of truth)
- ADR-0003 (frozen-at-authored-version)
- `10-GOVERNANCE/PIPELINE-card-assembly.md`
- `50-TEMPLATES/TEMPLATE-breakdown.md`
- `60-RESEARCH/INDEX-research-reports.md`
- PRINCIPLES 10 (genealogy-as-asset)
