# ADR-0011 — V3.6 surface refinement

| key | value |
|---|---|
| id | ADR-0011 |
| type | adr |
| status | Accepted |
| date | 2026-06-25 |
| owner | derick |

## Status

**Accepted** — 2026-06-25. Ships as spec version `3.6.0`.

## Context

Four surface-level defaults, reviewed against a working render, were ones the
steward rejected outright. Unlike the V3.5 reading-layer drifts (which were
measured against external references), these are direct taste calls by the spec
owner — and three of the four are corrections to *defaults the system shipped on
purpose* rather than accidents.

1. **The asterism rest (R-11 / G-10).** V3.1 introduced a centered `⁂` after the
   4th block of any long beat as a "rest the eye" device, and made it
   *mandatory* for beats of ≥ 5 blocks. In practice it reads as orphaned
   punctuation floating in whitespace — and when a generator emits the literal
   `* * *` form, it reads as a Markdown artifact that leaked into the render.
   Macro-spacing between beats (R-15, now 64pt) already does the rest-the-eye
   work; the glyph is redundant furniture.

2. **Em dashes in prose.** The card voice leaned on the em dash the way the
   governance docs do. On a 393pt mobile canvas a dash-heavy line reads as
   run-on; the steward wants the em dash gone from reader-visible card content
   entirely, recast as commas, colons, parentheses, or two sentences.

3. **Shadows (Principle 4, the "loft").** The hero and up to two anchor moments
   were elevated with a soft `box-shadow`. Elevation on a flat grayscale poster
   reads as faux-depth chrome — the exact "chrome becomes the design" failure
   Principle 4 warns about, reintroduced by the principle's own mechanism. A
   border + radius + padding sets an anchor card apart without faking a light
   source.

4. **Hairlines too faint.** Borders sat at `--g-06` (6% black) 0.5px. At mobile
   density on white they were nearly invisible — card edges and separators read
   as accidental gaps rather than deliberate structure.

## Decision

Ship four changes as a single version `3.6.0`. **Unlike every prior version,
V3.6's visual rules apply retroactively to every card regardless of
`frozen_at_version`** (see "Retroactive by design" below).

- **R-22 (V3.6) — flat surfaces, no shadow.** No `box-shadow` exists anywhere in
  the system; the `--shadow-*` tokens are deleted. The hero and any anchor card
  are set apart by border + radius + padding, never elevation. Principle 4 is
  amended: "lofted" now means *bounded* (a hairline-bordered, rounded, padded
  surface), not *elevated*. The 1–3-anchor hard cap is unchanged — it now counts
  bounded cards, not shadowed ones.

- **R-23 (V3.6) — heavier hairline.** Hairline separators (section, list-item,
  divider bottoms) step from `--g-06` to `--g-12`. Anchor card boxes (hero,
  `pre`, gallery card / spec links, corner glyph) go from 0.5px `--g-06` to 1px
  `--g-12`. `--g-12` was already the table-rule and hover-border tone, so this
  unifies on one hairline tone rather than inventing a value.

- **R-24 (V3.6) — no em dash, no asterism.** No em dash (U+2014) renders in
  reader-visible card content; the list marker for `.sources` becomes a middle
  dot. The asterism is retired: **R-24 supersedes R-11 and G-10.** En dashes
  (ranges) and the minus sign are unaffected, and the `## Beat N — Name`
  authoring heading is scaffold (never reaches the render), so neither is
  touched. The validator escalates both an em dash and an asterism in card
  content to errors.

## Evidence

- **Principle 4** ("chrome is noise") — the loft mechanism (shadow) was itself a
  source of the chrome the principle exists to suppress. (Change 3.)
- **Gestalt proximity / R-15** — 64pt macro-spacing already separates ideas; the
  asterism rest is redundant once the beat gap carries that load. (Change 1.)
- **Mobile legibility** — at 393pt on white, a 6% hairline is below the
  reliable-perception threshold; 12% reads as a deliberate edge. (Change 4.)
- The steward's direct review of a working render is the change-prompt this ADR
  records; the re-rendered cards in `docs/cards/` are the live proof.

## Retroactive by design (departure from ADR-0003 / P8)

ADR-0009 *resisted* retro-applying V3.5 to older cards, and ADR-0003 makes
frozen-at-version a guarantee. V3.6 deliberately breaks that for its visual
rules, by the owner's call: shadows, faint hairlines, the asterism, and em
dashes are defaults the steward now rejects, not period-authentic choices worth
preserving. So R-22 / R-23 / R-24's CSS lives at the **base** level of
`supercard.css` (not scoped under `.canvas.v3-6`), and **every card re-renders
flat, with heavier hairlines and no asterism**, whatever version it was frozen
at. Em-dash removal is a per-card content edit applied to all existing sources
in the same pass.

This is the narrow exception, not a new norm: the *reading-layer* rules
(R-9/R-19, R-20, R-21) remain frozen-at-version and are untouched here. A `.v3-6`
class is still emitted on 3.6.0+ cards for forward extensibility; it carries no
overrides today.

## R-11 / G-10 retirement

R-11 (asterism rendering) and G-10 (mid-beat asterism rest) are **retired**, not
deleted — they stay in `RENDERING-spec` and `GRAMMAR` with a retirement banner
pointing to R-24, so the genealogy stays legible (P10). The difference from a
normal supersession is that no card may keep using them: the asterism is gone
from all renders, not just new ones.

## Consequences

- **Positive:** the canvas reads as flat, structured, and dash-free — closer to
  print than to app chrome. One hairline tone, no faux-depth, no orphaned
  glyphs.
- **Cost:** the frozen-at-version archive is no longer byte-stable across the
  V3.6 boundary — re-rendered older cards differ from their pre-V3.6 renders.
  This is accepted and recorded here so the change is legible rather than silent.
- **Resisted:** stripping em dashes from the governance corpus too. R-24 scopes
  to *reader-visible card content*; the spec docs are authoring tooling and keep
  the house voice.
- **Why one version, not four:** the four are one coherent "flatten and quiet the
  surface" pass, validated as a single re-render of the whole gallery.
