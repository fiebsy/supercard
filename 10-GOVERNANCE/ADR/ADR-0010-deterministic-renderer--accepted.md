# ADR-0010 — Deterministic renderer; the markdown card is the complete source

| key | value |
|---|---|
| id | ADR-0010 |
| type | adr |
| status | Accepted |
| date | 2026-06-25 |
| owner | derick |

## Status

**Accepted** — 2026-06-25

## Context

ADR-0007 made rendering mandatory on every card request. But *how* the HTML got
produced was left to prose: an agent read `RENDERING-spec` (400+ lines, with
version-supersession logic — R-9 vs R-19, R-18 folded into R-19) and the
`renderer/v3.5/` deltas, then **hand-reconstructed the entire standalone HTML
file** — doctype, `<head>`, the five `sc:` `<meta>` tags, the inlined CSS, the
fixed corner glyph, the canvas classes, and every block's markup — from scratch,
every time. Two failure modes followed directly from that:

1. **The render got forgotten.** It is the last stage of a long pipeline
   (research → breakdown → card → gates → render). Nothing failed if it was
   skipped — there was no command to run and no gate that checked the HTML
   existed. By the time an agent reached Stage 5 its context was exhausted, and
   the one stage with no artifact behind it is the one that silently dropped.

2. **The layout drifted.** Hand-porting hundreds of lines of CSS rules into a
   fresh file is the most error-prone way to produce HTML. Worse, the render
   step was doing **editorial authoring, not formatting**: the reader-visible
   eyebrows (`The cut`, `The tracking`), the subhead tiles (`Body tracking flips
   negative.`), and even the dek existed *only in the HTML* — they were invented
   at render time and never written back to the markdown card. That is a
   genealogy leak: reader-visible content that lives outside the canonical
   frozen-at-version source (violates I7 "no scaffold leakage" and ADR-0003).

A third, quieter problem made both worse: the three notional "sources of truth"
had drifted apart. `app/src/supercard.css` (the React path), the inline `<style>`
in each hand-rendered HTML file, and `RENDERING-spec` prose disagreed on real
values — e.g. the V3.5 eyebrow is `0.08em / --ink-3` in the HTML renders but was
`0.07em / --g-60` in `supercard.css`; the `.stat` focal-number primitive existed
in *neither* `supercard.css` nor `blocks.tsx`, only in hand-written HTML. There
was no single artifact an agent could trust.

## Decision

**The markdown card is the complete reader-visible source, and the HTML render
is a pure, deterministic function over it — produced by one command, backed by
one stylesheet, and enforced by one gate.**

1. **One renderer.** `app/scripts/render-card.mjs` (`npm --prefix app run render
   -- <card.md>`) parses the markdown card and emits its standalone
   `docs/cards/{slug}.html` plus the `docs/index.html` gallery entry. Hand-
   authoring an HTML render is no longer a supported path.

2. **One stylesheet.** The renderer inlines `app/src/supercard.css` **verbatim**
   and never re-states a token. It selects the card's rule library by resolving
   `frozen_at_version` to the `.canvas` class chain (`.canvas .v3-1 .v3-5 …`) —
   the *same* cascade the React path uses — so an HTML twin and its React card
   are pixel-identical by construction (the RENDERING-spec parity contract is
   now mechanical, not aspirational). `supercard.css` is corrected to be fully
   V3.5-accurate (adds `.stat`; re-inks the V5 eyebrow / table key column to the
   R-20 tertiary ink) so the single source is also the *correct* source.

3. **The card carries all reader-visible text.** Section eyebrows come from the
   `` `BLOCK-xxx` · eyebrow `` annotation line (the text after the middle dot,
   ≤ 4 words, R-14); subheads come from a `### ` line; the dek, hook, stat,
   table, takeaway, and sources come from ordinary markdown. Nothing visible is
   invented at render time. The grammar is documented in the
   `TEMPLATE-supercard-*` templates.

4. **One gate.** `validate-v3-1.mjs` gains **G10 (render-freshness)**: every card
   in `30-CARDS/` must have a current `docs/cards/{slug}.html` carrying
   `sc:content_hash = sha256(markdown)` and a gallery link. If the card was
   edited since its last render, the hashes diverge and the gate **errors**.
   Forgetting Stage 5 — or editing the card without re-rendering — is now a loud
   failure, not a silent omission.

The markdown card stays the canonical, frozen-at-version source (ADR-0003); the
render remains a *view*, never hand-edited (ADR-0007). This ADR fixes *how* the
view is produced.

## Consequences

**Positive:**

- The render can no longer be silently skipped (G10) or hand-drifted (one
  command, one stylesheet).
- Reader-visible content lives in the canonical source — the genealogy leak is
  closed; `content_hash` ties each render to the exact card bytes.
- HTML and React paths are pixel-identical by construction.
- G10 immediately surfaced real pre-existing gaps (a card in `30-CARDS/` with no
  render at all; legacy hand-renders missing `sc:content_hash`).

**Negative:**

- Legacy hand-rendered cards (gestalt, spaced-repetition, v34-sample) predate the
  content-hash and read as G10 *warnings* until re-rendered through the script.
  They are not auto-migrated — re-render is a deliberate per-card action so their
  frozen appearance is reviewed, not silently changed.
- The renderer currently supports the canonical block set (loft-card,
  stat-callout, table, standard-text, key-takeaway, footnote-source, and the
  generic prose/definition/list path). New or exotic blocks need an emitter
  added — by design: an unsupported block is a visible gap, not a silent
  mis-render.

**Neutral:**

- A new optional `summary` frontmatter field feeds the gallery description (so
  the gallery blurb is authored in the source, not the HTML).

## Decision Drivers

- The two reported failures (forgotten render, wrong layout) both trace to
  hand-reconstruction from prose; remove the hand step and both go away.
- A pure function needs a complete input — the card must carry all visible text.
- Pixel parity between render paths should be mechanical, not a discipline.

## Considered Options

1. **Keep hand-authoring, add a golden HTML skeleton template** — reduces but
   does not remove the hand step; layout still drifts block-by-block.
2. **A render command + a freshness gate, markdown stays the complete source
   (chosen)** — removes the hand step entirely and makes skipping it loud.
3. **Generate HTML from the React components (`blocks.tsx`)** — couples the
   mandatory HTML floor to the `app/` build; RENDERING-spec requires the HTML
   path stay reproducible from the spec with no codebase. Rejected as the floor;
   the React path remains the bonus for agents *with* repo access.

## Decision Outcome

Option 2. The renderer is a small, dependency-free Node script that reads the
same `supercard.css` the React path reads; the card grammar is extended only
enough to carry the eyebrows/subheads that were previously invented at render
time; and G10 makes the whole loop self-checking.

## Links

- ADR-0007 (render and publish by default — render is mandatory)
- ADR-0003 (frozen-at-authored-version — markdown stays canonical source)
- ADR-0008 (spec agent legibility)
- `10-GOVERNANCE/RENDERING-spec.md` (§ Render quickstart, § Two render paths)
- `10-GOVERNANCE/PIPELINE-card-assembly.md` (Stage 5)
- `app/scripts/render-card.mjs`, `app/scripts/validate-v3-1.mjs` (G10)
- I7 (no scaffold leakage), PRINCIPLES 1 (screenshot autonomy)
