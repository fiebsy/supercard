# Renderer rule library — v3.5

The renderer resolves a card to its `frozen_at_version` rule library (RENDERING-spec
§ "Frozen-at-authored-version"). This directory holds the **v3.5 reading-layer
deltas** over v3.4. v3.0–v3.4 libraries are untouched; a card frozen below 3.5.0
never loads these rules.

A v3.5 card's canvas carries the inherited structural classes plus `v3-5`
(e.g. `class="canvas v3-1 v3-5"`); the `.canvas.v3-5` block in
`app/src/supercard.css` is the executable form of the rules below and comes last
in the file so its reading-layer overrides win.

## Deltas over v3.4

| Rule | Change | Token / CSS |
|---|---|---|
| **R-19** body type metrics (supersedes R-9) | Body 17/26, letter-spacing **−0.01em**, **word-spacing normal**; positive lowercase tracking retired. Display tracking −0.020em (R-18's tightening, now default). 26pt leading kept (1.53 ≥ WCAG 1.5). | `.canvas.v3-5 p, li`; `.canvas.v3-5 h1` |
| **R-20** text-ink ladder | `--ink` #1A1A1A (≈17.4:1), `--ink-2` #595959 (≈7:1), `--ink-3` #767676 (=4.54:1) — all clear WCAG 4.5:1. `#888` / `#BBB` / `--g-30` demoted to non-text only (large text ≥ 24px at 3:1 only). | `.canvas.v3-5 { --ink; --ink-2; --ink-3 }` |
| **R-21** three-size reading core | Header 40/44 · subhead 26/32 · body 17/26. Tile 28 + Section 24 + Subtitle 19 merge into the 26pt subhead. Dek renders at body-size + secondary ink. Hero 56 / Code 14 reserved. | `.canvas.v3-5 h2, .tile, .dek` |
| **R-15** (amended) | Default beat gap **64pt** (`--s-7`), up from 48pt. Opt down to 48pt for dense `reference` cards (`.beat-gap-48`); 96/120 for poster / XL. Micro-spacing unchanged. | `.canvas.v3-5 section` |

## Guardrails

- **Tinted surface (R-16 + R-20).** Tertiary `--ink-3` #767676 clears 4.5:1 on
  white but only ≈4.3:1 on `--surface-tint`. On tinted v3.5 cards, step tertiary
  text up to a tint-safe ink (≥ #6E6E6E) or use the hairline surface. The
  validator warns on tinted v3.5 cards.
- **No `apple_register`.** R-18 is superseded for v3.5; its display tightening is
  the default and the sub-1.5 line-height variant is dropped.

See `10-GOVERNANCE/RENDERING-spec.md` (R-19/R-20/R-21) and ADR-0009 for the why.
