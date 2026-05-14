# ADR-0005 — Mode-driven card assembly pipeline

| key | value |
|---|---|
| id | ADR-0005 |
| type | adr |
| status | Proposed |
| date | 2026-05-14 |
| owner | derick |

## Status

**Proposed** — 2026-05-14

(One of: Proposed, Accepted, Rejected, Superseded by ADR-NNNN, Deprecated)

## Context

The system could describe a *finished* card but not the *act of building one*.
The steps lived as fragments — a 10-step list in INDEX, the decision tree in
GRAMMAR, the "when to choose which" rules in LENGTHS — with no single repeatable
path from a request to a card.

Worse, **length conflated two independent things**: how deep the research goes,
and how the output is shaped. "Standard" meant both "a moderate amount of
research" and "10–14 blocks." But a user might want an exhaustively-researched
topic delivered as a reductive gist, or a quick event recap that still runs long
because the event had many beats. Length alone cannot express that.

## Decision

Adopt a **mode-driven assembly pipeline**:

```
Request → Mode → Deep research → Breakdown MD → Supercard MD → (Render)
```

Two structural commitments:

1. **Modes** — a request carries a *mode* (`summary`, `briefing`, `deep-dive`,
   `reference`) that captures *intent*, separate from length. A mode biases
   research depth, length variant, block selection, and redundancy posture. The
   set is extensible.

2. **Breakdown-as-source-of-truth** — research is captured in an uncompressed
   `BREAKDOWN-{slug}.md` (all facts, all content, organized by the 7 beats, no
   length budget). The card is a *constrained view* of the breakdown. One
   research pass can therefore yield multiple cards, and re-running the
   conversion under a different mode produces a different card from the same
   research.

Specified in full in `PIPELINE-card-assembly`. Tooling: `TEMPLATE-breakdown` and
the `supercard` skill.

## Consequences

**Positive:**

- A repeatable, inspectable topic-to-card path.
- Research depth and output shape are now independent knobs.
- The breakdown preserves research as genealogy (PRINCIPLES 10).
- `deep-dive` can go multi-part past the 25-block cap without becoming repetitive — length comes from breadth, not restatement.

**Negative:**

- Two artifacts per card to keep coherent (breakdown + card).
- An open-ended mode set invites scope creep; each new mode is a small standardization cost.

**Neutral:**

- Formalizes process that INDEX, GRAMMAR, and LENGTHS already implied.

## Decision Drivers

- Adapt to the *nature* of a request, not just its desired length.
- Separate research depth from output shape.
- Preserve research rather than discarding it after the card ships (PRINCIPLES 10).
- Keep long cards non-redundant (PRINCIPLES 9).

## Considered Options

1. **Length variants only (status quo)** — cannot express "deep research, short output" or vice versa.
2. **Free-form per-request prompting** — flexible but not repeatable; no shared vocabulary, no inspectable intermediate.
3. **Named modes + breakdown-as-source-of-truth (chosen)** — predictable adaptation plus a cheap-to-re-derive intermediate.

## Decision Outcome

Option 3. Length alone (1) is the conflation this ADR exists to undo. Free-form
prompting (2) gives up repeatability and leaves no genealogy. Named modes give
predictable, nameable adaptation; the breakdown intermediate makes cards cheap to
re-derive and preserves the research as an asset.

## Links

- `10-GOVERNANCE/PIPELINE-card-assembly.md`
- `10-GOVERNANCE/GRAMMAR-block-composition.md` (decision tree, length budgets)
- `10-GOVERNANCE/LENGTHS-mini-standard-xl.md`
- `50-TEMPLATES/TEMPLATE-breakdown.md`
- `.claude/skills/supercard/SKILL.md`
- `STEWARDS-LOG-2026` entry 2026-05-14
