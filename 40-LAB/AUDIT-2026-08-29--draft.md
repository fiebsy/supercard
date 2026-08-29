# AUDIT — 2026-08-29 — the post-skills pass: mobile fit, type inventory, flow

| key | value |
|---|---|
| id | AUDIT-2026-08-29 |
| type | audit |
| era | atlas |
| version | 3.11.0 |
| owner | derick |
| created | 2026-08-29 |
| status | draft |
| scope | V3.10 / V3.10.1 (the interface-skills cut and its patch) vs. pre-skills baseline 627e853 |
| method | headless Chromium mobile emulation (393/375/360/320 CSS px), computed-style walk of every published render, git diff of stylesheet and render paths |
| outcome | v3.10.2 (ADR-0019) shipped; V3.11 (ADR-0020) shipped; skills cut cleared of the type-proliferation charge with measurements |

The steward reported three things after the `jakubkrehel/skills` integration
(V3.10): cards violating the mobile viewport, a proliferation of text weights
and sizes that reads as less scannable and less ADHD-optimized, and — apart
from the skills — cards that land thin, coin headline terms they never define,
and flow less smoothly than they should. This audit measured all three rather
than eyeballing them. One report was confirmed but predates the skills; one
was a genuine V3.10 regression on the site pages; one is measurably false on
the canvas and traceable to real causes elsewhere; and the flow complaints
were a gap in the grammar, not a regression.

---

## Method

Every published render (`docs/cards/*.html`, `docs/index.html`) was opened in
headless Chromium under mobile emulation at four device widths (393, 375, 360,
320 CSS px), for both HEAD and the pre-skills baseline `627e853`. Measured per
page: layout-viewport width, `scrollWidth`, **visual**-viewport width and
scale, per-element overflow past the viewport, and the full inventory of
distinct rendered type styles (computed `font-size` / `line-height` /
`font-weight` / `font-style` over every visible text node). The stylesheet and
both render paths were diffed across the same range.

## Finding 1 — CONFIRMED, but older than the skills: the pinned viewport scale

**Every card clipped on every phone narrower than 393 CSS px.** Not because of
anything V3.10 drew — because every page emitted
`<meta name="viewport" content="width=393, initial-scale=1">`, and the pinned
scale defeats exactly the fit-to-width behavior R-34 (V3.9) prescribes in its
own text ("`width=393` scales the whole canvas to the device instead").

| device width | as shipped (`initial-scale=1`) | fixed (`width=393` alone) |
|---|---|---|
| 393 (iPhone 14/15/16) | fits | fits, scale 1.000 |
| 375 (iPhone SE, 13 mini) | **18px of every card offscreen** | fits, scale 0.954 |
| 360 (typical Android) | **33px offscreen** | fits, scale 0.916 |
| 320 (small/older phones) | **74px offscreen** | fits, scale 0.814 |

Genealogy: the tag entered with the V3.9 render path and the spec's no-tools
lead section — so **every card an LLM builds from a paste of `llms.txt`
inherited the clip**, which is why "recent cards" kept showing the violation.
V3.10's R-43 commit then copied the same tag onto the lander and gallery
(replacing `device-width`, which had the opposite defect: overflow with a
scrollbar) and verified only the *layout* viewport, institutionalizing the
defect on all four surfaces. This is V3.10's own defect class — a rule stated,
recorded as done, never carried out — found by V3.10's own method, measurement.

**Disposition: system-level, fixed.** v3.10.2 (ADR-0019): the pinned scale is
dropped everywhere, R-34 now says "never pin `initial-scale`" explicitly, all
eight renders regenerated (one `<meta>` line changes per card), `llms.txt`
regenerated, fit re-measured at all four widths. The 1px of layout-viewport
rounding Chromium reports at 320 is recorded in the ADR so nobody chases it.

## Finding 2 — CLEARED by measurement: "the skills added weights and sizes"

**No frozen card's type changed.** The distinct-style inventory per card is
identical between the pre-skills baseline and HEAD — same sizes, same weights,
same counts — and the frozen sources were untouched (the V3.10 promise held:
R-36's heading change carries the *version-correct* metric, so a V3.0 card's
tile still renders 24/30 while a V3.5+ card's renders 26/32).

| render | distinct styles, pre-skills | distinct styles, HEAD |
|---|---|---|
| gallery (`index.html`) | 10 | 10 |
| gestalt-principles (3.0) | 20 | 20 |
| musk-altman (3.0) | 10 | 11 |
| spaced-repetition (3.0) | 14 | 14 |
| v34-sample | 14 | 14 |
| v35-reading-layer | 16 | 16 |
| v37-data-and-alignment | 20 | 20 |
| v39-rendering-robustness | 20 | 20 |
| v310-outside-eyes | — (new) | 21 |

(musk-altman's +1 is the R-33 code chip on its footer path line, a V3.9-era
render repair, not a skills change.)

**Where the perception comes from.** Three real sources, none a V3.10 type
change:

1. **The archive's busiest cards are the newest ones**, and the reasons
   predate the skills: the chart blocks (V3.7/V3.9) render their labels at
   11px in three weights (400/600/700 — context labels, focal label, axis),
   and every card since V3.7 that carries a chart carries those. The V3.10
   sample card has them; so does the V3.7 one, identically.
2. **A card's full inventory was never three sizes.** R-21's "three-size
   reading core" governs the *reading* layer (40 header / 26 subhead / 17
   body); the sanctioned periphery (19 hook, 15 tables, 13 footnotes, 11
   eyebrows and chart labels, 10 corner glyph, 56 stat) has been stable since
   V3.5. Twenty distinct computed styles on a chart-bearing card is the
   steady state, not drift. The one size V3.10 did add is the inline-code
   chip at `max(13px, 0.9em)` (15.3px in body) — sanctioned, R-33's chip
   made em-relative.
3. **The site chrome around the cards changed a lot in V3.10/V3.10.1** —
   focus rings, 44pt controls, press states, meta lines, the archive reveal.
   The reader meets the gallery before any card, and "the site feels busier"
   reads as "the cards got busier." The card canvas did not.

**Disposition: no type change warranted.** The reading core holds; the ADHD
gate's Q10 (17/26 body) passes on every gated card. Documented here so the
next "too many weights" report starts from the inventory table.

## Finding 3 — CONFIRMED, grammar gap: thin cards, undefined coinages, staccato flow

The scannability MUSTs all still pass — single emphasis, bold lead-clauses,
the bold-only read, the 60-word cap. What the gates never covered:

- **Headline coinages are never cashed out.** The format rewards coined
  headlines (*Outside Eyes*, *Rendered as Written*) and no rule obliged the
  section beneath one to say what it meant. P13 requires jargon defined on
  first use *in prose only* — the headline layer, where coinages
  concentrate, was uncovered.
- **The recent register is anchor-heavy and prose-light.** The V3.10 sample
  card runs nine blocks with one `standard-text` among them. Every block
  survives alone (P1 works); nothing makes adjacent blocks add up, so a
  scroll reads as captioned exhibits. Fourteen body paragraphs, three bold
  lead-clauses — the bold-only scan is thin not because bolds are missing
  from prose blocks but because there is almost no prose.
- **"Not enough information" had no sanctioned response.** The mode ladder
  was always the answer (the breakdown has no length budget; depth belongs to
  the view) but no doc said "re-run deeper" was the fix, so the pressure
  lands on padding — which P7/P9 rightly refuse.

**Disposition: system-level, fixed.** V3.11 (ADR-0020): G-17 define-what-you-
name (ADHD-gate Q13), G-18 the through-line (SHOULD: content-echo handoffs
between beats, claim → proof → consequence within one), `deep-dive` made
explicitly prose-led, the re-run rule written into the pipeline, mode
inference extended ("analyze", "in depth", "the full story", "more
information" → deeper mode). Content layer only; existing cards exempt.

## Finding 4 — WATCH: spec growth

`llms.txt` grew ~15% in the V3.10 cut (role tokens, heading semantics, the
skills map) and again slightly with V3.11. Each addition is load-bearing, but
the file is the product (ADR-0012) and `MAINTAINING-llms-txt.md` § invariants
is the budget discipline. No action now; re-check the line count at the next
minor.

## What this audit did not do

- No card was re-authored. The V3.10 sample card's anchor-heavy register is
  legal under its frozen version; the first `deep-dive` authored under 3.11.0
  is the right vehicle to exercise the prose-led register (stewards' log
  follow-up).
- The site pages stay on the shared 393 canvas (scaled, not reflowed). A
  responsive rebuild of lander + gallery is real scope and its own ADR if
  ever wanted — ADR-0019 records the trade.
