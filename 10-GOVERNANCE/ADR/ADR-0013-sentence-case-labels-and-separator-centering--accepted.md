# ADR-0013 — Sentence-case labels, centered separators, editorial eyebrows

| key | value |
|---|---|
| id | ADR-0013 |
| type | adr |
| status | Accepted |
| date | 2026-06-25 |
| owner | derick |

## Status

**Accepted** — 2026-06-25. Ships as spec version `3.6.1`.

## Context

A review of the published `gestalt-principles` card against its **deployed React
render** surfaced three defects. Investigation showed each one reaches past the
sample card into the framework, and one of the three is a divergence *between the
two render paths* the system maintains.

1. **Eyebrows repeated and collided.** The React render path
   (`app/src/blocks.tsx`) stamped the **beat name** on every block — `EVIDENCE`
   ×3, `MECHANISM` ×6 — and a beat-name eyebrow stacked directly above a section
   divider of the same name (`COUNTER` / `COUNTER`). That is the R-14 "two
   labels, one job" failure, and a column of identical beat-name labels is the
   author's outline leaking onto the canvas (R-10 / I7). The **markdown source
   already authors distinct, content-naming eyebrows** ("the founding
   experiment", "the master law"), and the deterministic HTML renderer
   (`render-card.mjs`, ADR-0010) already emits them. Only the React path never
   adopted that model — it derived the eyebrow from the beat name instead.

2. **Labels were UPPERCASE.** Every micro-label — eyebrow, table `th`, section
   divider rule, gallery section-label — rendered UPPERCASE with +0.08em
   positive tracking (R-19/R-364). The steward rejects the all-caps register for
   labels.

3. **Separators hugged the section above.** `section` padding was asymmetric
   (48px top / 16px bottom), so every hairline sat 16px below its own content and
   48px before the next — reading as an uneven, top-weighted gap rather than a
   boundary evenly placed between two beats.

## Decision

Ship three changes as a single version `3.6.1`. Like V3.6.0 (ADR-0011), the
visual rules **apply at the base CSS level and re-render every card regardless
of `frozen_at_version`** — these are corrections to defaults the steward rejects,
not period-authentic choices worth preserving (see "Retroactive by design",
ADR-0011).

- **R-25 (V3.6.1) — sentence-case labels.** Every micro-label (eyebrow, table
  `th`, divider rule, gallery section-label) renders **sentence case**, not
  UPPERCASE: `text-transform: uppercase` is removed and only the first letter is
  forced up via `::first-letter`, so the source string's interior casing
  (proper nouns, acronyms) is preserved. The **+0.08em positive tracking is
  dropped to 0** — its sole justification was that UPPERCASE letterforms have no
  word-shape to break; sentence-case labels carry word-shape, so opening their
  fit is wrong. R-25 supersedes the UPPERCASE/+0.08em eyebrow rule in the R-1
  type ramp, the R-19 type-and-tracking table, and the R-14 label micro-type
  spec.

- **R-26 (V3.6.1) — centered separators.** `section` and `section.divider`
  vertical padding is **symmetric** (regular 48/48, divider 64/64; the V3.4/V3.5
  beat-gap variants set top *and* bottom), so each bottom hairline is evenly
  gapped between the two beats it divides instead of hugging the section above.
  Micro-spacing inside a block is unchanged.

- **Editorial eyebrows in the React path (R-10 / R-14 clarified).** The React
  `Eyebrow`/`Section` primitives stop deriving the label from the beat name. A
  block carries a short editorial eyebrow **only when it lacks its own heading
  anchor**; a block with an `h2`/Subhead takes none (the heading is the label).
  The eyebrow names content, is distinct from its neighbours, and is never the
  beat name or a position counter. R-14's "one label per *job*" replaces the
  earlier "one editorial eyebrow per *beat* (first block)" framing, which the
  multi-block beats of a deep-dive card outgrew.

## Evidence

- **R-14** ("a label that answers no reader question is decoration") — a column
  of identical `MECHANISM` eyebrows, and a beat-name eyebrow above a same-named
  divider, are the canonical two-labels-one-job and scaffold-leak failures the
  rule exists to catch. (Change 1, 3.)
- **The markdown + `render-card.mjs` already did it right** — the HTML twins in
  `docs/cards/` carry distinct editorial eyebrows. This ADR brings the React
  path to parity with the source of truth, not the other way round. (Change 1.)
- **The steward's direct review of the deployed render** is the change-prompt;
  the re-rendered `docs/cards/` and the rebuilt React card are the live proof.

## Consequences

- **Positive:** labels read as quiet editorial furniture, not shouted chrome;
  every separator is evenly placed; the React render path no longer leaks the
  seven-beat scaffold and matches the markdown's content-naming eyebrows.
- **Cost:** as with ADR-0011, the frozen-at-version archive is not byte-stable
  across the V3.6.1 boundary — every re-rendered card differs from its pre-3.6.1
  render (labels lose their caps, hairlines re-center).
- **Known residual (follow-up).** The React card still uses `h2` section
  headings where the markdown uses an eyebrow for the same label, so the two
  paths differ structurally (not just in label casing) for those blocks. This is
  pre-existing drift; unifying the renderer's heading model (`h2` vs `###` tile)
  is tracked separately and is out of scope here.
- **Resisted:** sentence-casing the governance corpus or the `## Beat N — Name`
  authoring headings. R-25 scopes to reader-visible card *labels* only.
- **Why one version, not three:** the three are one coherent "quiet and even out
  the label/separator layer" pass, validated as a single re-render of the
  gallery plus a React rebuild.
