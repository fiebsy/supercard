# ADR-0013 — Distinct editorial eyebrows + centered separators

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
render** surfaced two defects, both of which reach past the sample card into the
framework.

1. **The eyebrow rail repeated and said nothing.** The React render path
   (`app/src/blocks.tsx`) stamped the **beat name** on every block, producing a
   rail of `EVIDENCE · EVIDENCE · EVIDENCE · MECHANISM · MECHANISM · MECHANISM …`
   — the author's seven-beat outline leaking onto the canvas (the R-10 / I7
   failure) — and a `COUNTER` divider immediately followed by a `COUNTER`
   eyebrow (the R-14 "two labels, one job" failure). The eyebrows carried no
   information beyond the beat, and they repeated.

2. **Separators hugged the section above.** `section` padding was asymmetric
   (48px top / 16px bottom), so each hairline sat 16px below its own content and
   48px before the next — reading as an uneven, top-weighted gap rather than a
   boundary placed evenly between two beats.

> Note: an earlier draft of this work also flipped every micro-label from
> UPPERCASE to sentence case. The steward reversed that call — **the eyebrow
> stays UPPERCASE**. This ADR keeps the casing untouched and changes only the
> eyebrow's *content* (and the separator spacing).

## Decision

Ship two changes as a single version `3.6.1`. Like V3.6.0 (ADR-0011), the rules
**apply at the base level and re-render every card regardless of
`frozen_at_version`** — corrections to defaults the steward rejects, not
period-authentic choices worth preserving.

- **R-25 (V3.6.1) — distinct editorial eyebrows.** The eyebrow names the block's
  **content or topic**, never the beat, and is **distinct from its neighbours**.
  Casing is unchanged (UPPERCASE, +0.08em). The React `Eyebrow`/`Section`
  primitives stop deriving the label from the beat name; `Section` takes an
  optional `eyebrow` string. A headingless block's eyebrow is its only label; a
  **headed** block's eyebrow pairs with its `h2` as a G-14 eyebrow + tagline
  (eyebrow = topic, heading = claim, never restating each other). The markdown
  source carries the editorial labels directly — headed blocks are authored as a
  topic eyebrow plus a `### ` heading so the deterministic renderer
  (`render-card.mjs`, ADR-0010) emits the same pair.

- **R-26 (V3.6.1) — centered separators.** `section` and `section.divider`
  vertical padding is **symmetric** (regular 48/48, divider 64/64; the V3.4/V3.5
  beat-gap variants set top *and* bottom), so each bottom hairline is evenly
  gapped between the two beats it divides. Micro-spacing inside a block is
  unchanged.

## Evidence

- **R-14** ("a label that answers no reader question is decoration") — a column
  of identical `MECHANISM` eyebrows, and a beat-name eyebrow above a same-named
  divider, are the canonical scaffold-leak and two-labels-one-job failures the
  rule exists to catch.
- **G-14 Pattern 1** (eyebrow + tagline pair) is the system's dominant section
  bridge; R-25 makes the React path actually produce it instead of a beat label.
- **The steward's direct review of the deployed render** is the change-prompt;
  the rebuilt React card and re-rendered `docs/cards/` twins are the live proof.

## Consequences

- **Positive:** the eyebrow rail reads as quiet, scannable editorial furniture —
  a distinct label per section, paired topic-to-claim where a heading is present
  — and every separator sits evenly between its beats. The React path no longer
  leaks the seven-beat scaffold.
- **Cost:** as with ADR-0011, the frozen-at-version archive is not byte-stable
  across the V3.6.1 boundary — re-rendered cards differ from their pre-3.6.1
  renders (separators re-center; the gestalt eyebrows change content).
- **Resisted:** the sentence-case experiment (reverted by the steward) and
  unifying the renderer's heading model (`h2` vs `### ` tile) — the React path
  emits `<h2>` while the deterministic renderer emits a `.tile` for the same
  paired heading; the eyebrow rail matches across paths, the heading tag does
  not yet. Tracked separately.
- **Why one version, not two:** the two are one coherent "make the eyebrow rail
  mean something and even out the seams" pass.
