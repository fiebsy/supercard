# ADR-0009 — V3.5 reading-layer refinement

| key | value |
|---|---|
| id | ADR-0009 |
| type | adr |
| status | Accepted |
| date | 2026-06-25 |
| owner | derick |

## Status

**Accepted** — 2026-06-25. Ships as spec version `3.5.0`.

## Context

Four reading-layer drifts surfaced when a working V3.4 render was measured
against Apple's SF Pro tracking table, WCAG 2.2 (SC 1.4.3 / 1.4.12),
Bringhurst, Vignelli, Müller-Brockmann, Butterick, and NN/g. Each is small in
isolation; together they were the difference between "reads like a careful
document" and "reads like a template."

1. **Positive body tracking (R-9).** R-9 set body to +0.03em letter-spacing
   and +0.06em word-spacing. Apple tracks 17pt body *negative* (≈ −0.024em),
   and Goudy, Spiekermann, and Butterick are unanimous that lowercase body text
   is never positively tracked — positive tracking breaks word-shape
   recognition, the exact mechanism fast scanning relies on. R-18's opt-in
   "Apple register" already pointed the right way but was never the default.

2. **Beat gap too tight.** R-15 cited the Apple benchmark (60–80pt mobile) but
   defaulted to 48pt and treated 64pt as opt-in. More macro-spacing reads as
   "separate ideas" (Gestalt proximity), aids scannability, and raises
   perceived quality.

3. **Sub-floor text inks.** `--ink-4` #888 (≈3.5:1), `--ink-5` #BBB (≈1.9:1),
   and `--g-30` (≈2:1) fail WCAG 2.2 SC 1.4.3 (4.5:1) for body text — yet
   `--g-30` was assigned to "tertiary text" through V3.4. Muted text was meaning
   *unreadable* rather than *one tonal step down*.

4. **Too many sizes.** Nine type roles, where the canon (Vignelli's "A Few
   Basic Typefaces," Müller-Brockmann, Apple's HIG "use one font and just a few
   styles and sizes") builds deep hierarchy from a handful of sizes plus weight,
   ink, and space. The user's stated ideal is ~3 reading sizes.

## Decision

Ship four changes as a single version `3.5.0`, gated on
`frozen_at_version: 3.5.0`.

- **R-19 (V3.5+) — body type metrics.** Supersedes R-9. Body renders at 17/26,
  letter-spacing **−0.01em**, **word-spacing normal**, left-aligned ragged-right,
  weights 400/500/700, no italics for emphasis. R-9's good parts are kept (26pt
  leading stays at 1.53, above the WCAG 1.5 floor); only the positive
  letter-spacing and word-spacing are removed. R-18's display tightening
  (−0.020em) is folded in as the default and the sub-1.5 line-height variant is
  dropped. The eyebrow (+0.08em, UPPERCASE) is the only positively-tracked role.

- **R-15 amended — beat gap default 48pt → 64pt (`--s-7`).** 48pt (`--s-6`)
  becomes the opt-*down* for dense `reference` cards; 96–120pt stays for poster /
  hero / XL. The renderer still snaps to one uniform value per card. Only the
  between-section gap scales — micro-spacing (line-height, intra-block gaps,
  cover-stack joins) does not.

- **R-20 (V3.5+) — text-ink ladder.** Three passing steps: `--ink` #1A1A1A
  (≈17.6:1), `--ink-2` #595959 (≈7:1), `--ink-3` #767676 (=4.54:1). `#888` /
  `#BBB` / `--g-30` are demoted to non-text only and permitted for large text
  (≥ 24px, 3:1) only, above #949494. The validator computes contrast (unrounded
  — 4.499:1 fails) and re-checks against `--surface-tint` for tinted cards
  (tertiary #767676 clears 4.5:1 on white but only ≈4.3:1 on the tint, so tinted
  cards step tertiary up to a tint-safe ink or use the hairline surface).

- **R-21 (V3.5+) — three-size reading core.** Header 40/44 · subhead 26/32 ·
  body 17/26, with weight + ink + space doing the differentiation. The
  Tile 28 + Section 24 + Subtitle 19 roles merge into the 26pt subhead; Hero 56
  and Code 14 are reserved for poster / code. The dek stops being a size and
  renders at body-size + secondary ink (R-13, updated). Authoring note: a beat
  that "needs" a fourth size differentiates by weight or ink first (the Vignelli
  test).

## Evidence

- **Apple SF Pro tracking table** — 17pt body tracks ≈ −0.024em; HIG Writing
  guide "use one font and just a few styles and sizes." (Changes 1, 4.)
- **WCAG 2.2 SC 1.4.3** (4.5:1 text contrast, 3:1 large text ≥ 24px) and
  **SC 1.4.12** (line-height ≥ 1.5). (Changes 1, 3.)
- **Bringhurst, Goudy, Spiekermann, Butterick** — lowercase body is never
  positively tracked. (Change 1.)
- **Vignelli "A Few Basic Typefaces," Müller-Brockmann** — depth from few sizes
  + weight/ink/space. (Change 4.)
- **NN/g (Pernice eye-tracking)** — scanners enter at the leftmost 1–3 words;
  word-shape integrity and macro-spacing both serve the first-pass scan.
  (Changes 1, 2.)

Descends from the V3.5 reading-layer research synthesis (the change-prompt diff
this ADR records); the validated render is the live proof in `docs/cards/`.

## R-9 → R-19 supersession

R-9 is **not** edited or deleted — it stays in `RENDERING-spec` verbatim and in
force for cards frozen at V3.1.0–V3.4.x. R-19 supersedes it only for
`frozen_at_version ≥ 3.5.0`. The same holds for R-18: folded into the V3.5
default but unchanged for V3.4 cards. This is genealogy-as-asset (P10): the
superseded rule remains legible next to the rule that replaced it.

## Frozen-at-version guarantee

Per P8 / ADR-0003, no V3.0–V3.4 card or its published render is migrated,
reflowed, or re-inked. The four changes apply only to cards declaring
`frozen_at_version: 3.5.0`. The CSS port scopes every V3.5 metric under
`.canvas.v3-5`, so V3.1–V3.4 cards stay pixel-identical, and the base `:root`
ink tokens (#111111 / #333 / #555) are untouched for them.

## Consequences

- **Positive:** body text recovers word-shape integrity and clears the contrast
  floor; the page reads as fewer, better-spaced ideas; the type system is small
  enough to hold in one's head.
- **Cost:** a fourth back-compat scope (`.canvas.v3-5`) in the CSS, and a
  tinted-surface caveat authors must respect (tertiary ink steps up on tint).
- **Resisted:** the temptation to retro-apply the new inks and tracking to the
  three published V3.x cards — that would corrupt the archive the same way
  Notion's silent block migration does (P8). They keep their authored render.
- **Why one version, not four:** the four changes were validated as a single
  render. Shipping them piecemeal would mean three intermediate renders no one
  validated, and a reader comparing a +0.03em-tracked body against a 64pt gap
  would see an incoherent half-migration. One render, one version.
