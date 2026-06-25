# RENDERING — Spec

| key | value |
|---|---|
| id | RENDERING-spec |
| type | governance |
| era | atlas |
| version | 3.5.0 |
| owner | derick |
| updated | 2026-06-25 |

How a Supercard source becomes a rendered HTML artifact, and how that artifact is published so it can be viewed online. Tokens, type scale, spacing, shadows, canvas, publishing.

---

## Render quickstart (read this first)

You do **not** hand-write the HTML. The render is a pure function over the
markdown card, produced by one command (ADR-0010). Everything below this section
is the *why* — the rule library the renderer applies — not a manual build recipe.

```sh
# 1. render the card → docs/cards/{slug}.html + gallery entry
npm --prefix app run render -- 30-CARDS/CARD-2026-06-25-v35-reading-layer--draft.md

# 2. verify it (G10 render-freshness must pass)
npm --prefix app run validate
```

The renderer (`app/scripts/render-card.mjs`):

- inlines `app/src/supercard.css` **verbatim** — the single source of truth for
  every token, type metric, and colour. Never re-state a value in the HTML.
- resolves the card's `frozen_at_version` to the `.canvas` class chain
  (`canvas v3-1 v3-5 …`); the cascade applies the right rule library (R-9 vs
  R-19, etc.) automatically — you never reason about which rule is live.
- emits the five `sc:` `<meta>` tags plus `sc:content_hash`, the fixed corner
  glyph, and upserts `docs/index.html`.

**The card carries all reader-visible text.** Eyebrows = the text after `·` on
the `` `BLOCK-xxx` · eyebrow `` line; subheads = a `### ` line; dek/hook/stat/
table/takeaway/sources = ordinary markdown. Nothing visible is invented at
render time. Grammar reference: `50-TEMPLATES/TEMPLATE-supercard-*.md`.

If you are reading this spec to *build* a card, you are done after the two
commands above. The rest of this document defines the rules the stylesheet and
validator already encode.

---

## Canvas

**Full-bleed page surface (V3.6) — the page *is* the card.** The render has **no
outer wrapper**: `html`, `body`, and the single `.canvas` column all paint flat
white (`--w`). There is **no grey page moat, no rounded device frame, and no
outer rounded/shadowed card boxing the content**. The 393pt figure is the
*content column width* (centered with `margin: 0 auto`), not a phone-shaped card
floating on a backdrop — the column's edges are marked by faint dotted designer
guides, not by tonal contrast. If you are generating a card by hand from this
spec, render the body **edge-to-edge white and let the content fill the
viewport**; do **not** wrap it in a rounded, shadowed, or grey-backed container.
The `Card radius: 16pt` below applies **only** to the 1–3 bounded anchor cards
*inside* the column (Principle 4 / R-22) — never to the page itself.

- **Mobile portrait:** 393 × 852pt (iPhone 15/16 Pro)
- **Outer gutter:** 16pt
- **Content width:** 361pt
- **Internal card pad:** 24pt
- **Card radius:** 16pt (concentric with iOS 26) — *bounded anchor cards only, not the page*
- **Hairline:** 0.5px solid rgba(0,0,0,0.06)

## Gray ramp (the only ramp)

| Step | Token | Value | Use |
|---|---|---|---|
| 0% | --w | #FFFFFF | Page, card surface |
| 6% | --g-06 | rgba(0,0,0,0.06) | Code-chip fills, faint backgrounds (V3.6 R-23: **no longer used for borders** — too faint at mobile density) |
| 12% | --g-12 | rgba(0,0,0,0.12) | **Hairline borders and card outlines** (V3.6 R-23, stepped up from --g-06), gridlines, subtle backgrounds |
| 30% | --g-30 | rgba(0,0,0,0.30) | Deemphasized data, gridlines (V3.5+ R-20: **non-text only**) |
| 60% | --g-60 | rgba(0,0,0,0.60) | Secondary text, axis labels, footnotes |
| 100% | --k | #000000 | Body text, primary, focal data |

**Text vs. non-text split (read with R-20).** The ramp serves two jobs — *text ink* and *non-text rules/fills* — and the contrast floor differs. Body text uses #111111 (`--ink`), never pure black. The per-block ink layers `--ink-2` (#333), `--ink-3` (#555), `--ink-4` (#888), `--ink-5` (#BBB) are the **V3.0–V3.4** ramp and stay frozen for those cards. **V3.5+ cards render text from the R-20 three-step ink ladder** (`--ink` #1A1A1A, `--ink-2` #595959, `--ink-3` #767676 — every step clears WCAG 2.2 SC 1.4.3); `#888` / `#BBB` / `--g-30` are demoted to **non-text only** (hairlines, gridlines, disabled, decorative rules) and are permitted for *large* text (≥ 24px, 3:1 floor) only. See R-20.

**Surface tint (V3.4+, optional).** A `--surface-tint: rgba(0,0,0,0.025)` (alternately `#F7F7F7`) is permitted as a card background under R-16. It is **not** a seventh step in the ramp; it is a single off-white that sits between `--w` and `--g-06` for the specific purpose of replacing a hairline border with a tonal-contrast affordance. Cards using `--surface-tint` MUST omit the hairline; cards using the hairline MUST use `--w`. Mixing both on the same card is forbidden.

The canvas is light-only. The renderer declares `color-scheme: light` on `:root` and emits `<meta name="color-scheme" content="light">` in `<head>` so iOS Safari's automatic dark-mode (and equivalents in other webviews) does not partially invert the page — that inversion leaves `--ink-2` / `--ink-3` text as low-contrast gray on near-black. A theme-aware dark variant, if ever introduced, ships as a parallel ink ramp under `@media (prefers-color-scheme: dark)`, never as an auto-inversion.

## Type scale (SF Pro Rounded)

| Role | Size / leading | Weight | Tracking (em) |
|---|---|---|---|
| Hero number | 56 / 60 | Bold (700) + tnum | −0.022 |
| Display title | 40 / 44 | Semibold (600) | −0.018 |
| Tile head (V3.4+) | 28 / 32 | Semibold (600) | −0.012 |
| Section header | 24 / 30 | Semibold (600) | −0.012 |
| Subtitle | 19 / 26 | Medium (500) | −0.005 |
| Body | 17 / 24 | Regular (400) | −0.008 |
| Caption | 13 / 18 | Regular | +0.008 |
| Eyebrow | 11 / 14 | Semibold UPPERCASE | +0.08 |
| Code / equations | 14 / 22 | SF Mono Regular | 0 |

**Note on the body row.** The token table lists Body as 17/24 with tracking −0.008. **R-9 (V3.1–V3.4) supersedes that row** for cards frozen at V3.1.0–V3.4.x — body renders at 17/26 with +0.03em letter-spacing and +0.06em word-spacing, left-aligned ragged, weights 400/500/700 only. **R-19 (V3.5+) supersedes R-9 in turn** for cards frozen at V3.5.0 or later — body renders at 17/26 with letter-spacing **−0.01em** and **word-spacing normal** (the positive tracking is retired; see R-19 for the why). The token row remains as the V3.0 reference. **R-18 (V3.4)** added an opt-in "Apple register" variant; **R-19 folds R-18's display tightening in as the V3.5 default** and drops the sub-1.5 line-height variant (V3.5 body stays at 26pt, ≥ 1.5).

**Note on the eyebrow row.** The eyebrow stays UPPERCASE — the one positively-tracked role (+0.08em), because caps have no word-shape to break and the tracking opens their tight default fit. The earlier +0.07 figure was a stale token-table value; cards and CSS that still emit +0.07 render visibly the same and are accepted, but new renders snap to +0.08. **R-25 (V3.6.1, ADR-0013) governs the eyebrow's *content*, not its case:** an eyebrow names the block's content/topic and must be distinct from its neighbours — never the beat name, never repeated down a beat. Casing is unchanged.

**Note on the Tile head row (V3.4+).** The 28/32 Tile head step is new in V3.4 and is the canonical size for the tagline half of an eyebrow + tagline pair (see G-14 Pattern 1). It sits between Display title (40/44) and Section header (24/30). V3.1–V3.3 cards do not use the Tile step.

CSS stack:

```css
--rounded: ui-rounded, "SF Pro Rounded", "SF Pro", -apple-system, BlinkMacSystemFont, system-ui, "Segoe UI", Roboto, sans-serif;
--mono: ui-monospace, "SF Mono", Menlo, Monaco, Consolas, monospace;
```

`ui-rounded` first — standardized CSS keyword that resolves to SF Pro Rounded on Apple platforms.

## Spacing tokens (8pt baseline)

| Token | px | Use |
|---|---|---|
| --s-0 | 4 | Tightest (sub-element gaps) |
| --s-1 | 8 | Tight |
| --s-2 | 12 | Comfortable |
| --s-3 | 16 | Default block padding |
| --s-4 | 24 | Card internal pad |
| --s-5 | 32 | Section internal spacing |
| --s-6 | 48 | Beat boundaries (V3.3–V3.4 default; V3.5 opt-*down* for dense `reference` cards — R-15) |
| --s-7 | 64 | Beat boundaries (**V3.5 default** — R-15); major section breaks |
| --s-8 | 96 | Hero / footer; poster moments (R-15) |
| --s-9 | 120 | Marketing-scale section gap (V3.4+ opt-in; poster / XL deep-dive — R-15) |

## Shadow system — RETIRED in V3.6 (R-22)

> **Retired.** The shadow system below was the V3.0–V3.5 elevation model. **R-22
> (V3.6) retires it entirely** — no `box-shadow` and no `--shadow-*` token exist
> in the system. An anchor card is now set apart by border + radius + padding,
> never elevation. This applies to **every card on re-render**, regardless of
> `frozen_at_version` (ADR-0011 — the V3.6 retroactive exception). The
> superseded model is kept below for genealogy (P10); do not emit it.

```css
/* RETIRED — superseded by R-22. Kept for genealogy; not emitted. */
--shadow-flat: none;
--shadow-subtle: 0 1px 2px rgba(0,0,0,0.03), 0 4px 12px rgba(0,0,0,0.04);
--shadow-lofted: 0 2px 4px rgba(0,0,0,0.04), 0 12px 32px rgba(0,0,0,0.06), 0 32px 80px rgba(0,0,0,0.04);
```

| Token | Use (pre-V3.6) | Lift |
|---|---|---|
| flat | Body text, dividers, footnotes, inline charts (most blocks) | 0 dp |
| subtle | Secondary cards, callouts beside the hero | ~2 dp |
| lofted | Hero card, key-stat anchor, loft-card block | ~8 dp |

The **1–3-anchor hard cap survives** (it always was the point), but it now counts
*bounded* cards (hairline-bordered, rounded, padded), not shadowed ones — see R-22
and Principle 4.

## R-9. Type metrics (V3.1–V3.4 — superseded by R-19 for V3.5+)

> **Superseded by R-19 for `frozen_at_version ≥ 3.5.0`.** R-9 stays in force for
> cards frozen at V3.1.0–V3.4.x; V3.5+ cards render body type from R-19, which
> retires the positive letter-spacing and word-spacing this rule introduced.
> R-9 is preserved here unchanged for those older frozen cards (ADR-0003).

The base type scale above is V3.0's authoritative reference. V3.1–V3.4 cards (those declaring `frozen_at_version: 3.1.0`–`3.4.x`) render with the following overrides on prose-bearing roles. Older cards remain on the V3.0 table per ADR-0003.

| Role | V3.0 | V3.1+ |
|---|---|---|
| Body line-height | 24pt | **26pt** |
| Body letter-spacing | −0.008em | **+0.03em** (≈ +0.5pt) |
| Body word-spacing | (default) | **+0.06em** (≈ +1pt) |
| Body alignment | (renderer default) | **left, ragged-right (never justified)** |
| Italics for emphasis | (silent allow) | **forbidden** (italics only for titles / foreign terms) |
| Weights permitted in body | 300–700 | **400 / 500 / 700 only** in prose; 300 reserved for the dek |

Rationale: WCAG 2.2 SC 1.4.12 requires line-height ≥ 1.5× font-size — at 17pt body that's ≥ 25.5pt. The V3.0 24pt setting was a hair under spec. SF Pro Rounded uses Display-cut glyphs at all sizes; Apple's default Display tracking (−0.43pt at 17pt) compresses Rounded's apertures at body size — the +0.5pt override restores aperture clarity. Measure stays 55–66 CPL preferred, 75 CPL maximum.

## R-10. No scaffold chrome in the rendered card (V3.3+ supersedes V3.1)

Beat boundaries render as whitespace and the first block's own anchor. Renderers MUST NOT emit beat labels, beat numbers, position counters (`N / TOTAL`), or any other label whose purpose is to communicate the author's structural outline to the reader. The seven-beat structure is a production scaffold; it does not appear in the rendered output.

**Permitted exception — the editorial eyebrow (R-25).** A short editorial eyebrow label (e.g., `THE FOUNDING EXPERIMENT`) is allowed on any content block — the rule governs its *content*, not whether the block has a heading. The discipline is **one label per *job*, and every eyebrow distinct**:

- It names the block's **content or topic**, never the beat. A column of identical `MECHANISM` eyebrows is the author's outline leaking onto the canvas (R-10 / I7), not a label — every eyebrow must differ from its neighbours.
- On a **headingless** block (a bare standard-text, definition, quote, takeaway) the eyebrow is the block's only label.
- On a **headed** block the eyebrow and the `h2`/Subhead split the work as a G-14 eyebrow + tagline pair: the eyebrow names the *topic* (`MODERN ADDITIONS`), the heading lands the *claim* ("The set is open, not fixed"). They must not restate each other — an eyebrow that paraphrases its heading, or a beat-name eyebrow stacked above one, is the R-14 "two labels, one job" failure.
- Position counters (`4 / 7`, `BEAT 3`, etc.) are never permitted under any circumstance.

The eyebrow uses the existing label micro-type spec (11/14pt SF Pro Rounded, weight 600, UPPERCASE, +0.08em tracking, tertiary ink) so labels stay typographically uniform across the card. It is still subject to R-14: a label that doesn't earn its existence must be cut.

**Bottom edge — dev-only metadata.** The pre-V3.3 footer (`SUPERCARD V3.X · ATLAS · {MODE} · YYYY-MM-DD`) is moved to dev-only. The renderer MAY emit this stamp as an HTML comment or a `data-*` attribute on the canvas root, but production renders MUST NOT show renderer version, era name, mode, or render date in any reader-visible chrome. The five `sc:*` `<meta>` tags in `<head>` (see Output contract) remain mandatory — they carry the same metadata in a place the reader cannot see.

**Why.** A reader holding a screenshot of the rendered card never asked "which beat of the author's outline is this?" — that question only exists for the author. Anything in the rendered card that exists to help the author keep track of structure (beat names, position counters, block-type labels, version metadata visible above the fold) is a leak from the production scaffold into the reader's interface. The reader gets one continuous argument; the scaffolding stays in the source file, in `<meta>` tags, and in the breakdown document.

## R-11. Asterism rendering (V3.1+ — RETIRED in V3.6 by R-24)

> **Retired.** The asterism rest is gone from the system. **R-24 (V3.6)
> supersedes R-11 and G-10** — the `⁂` glyph (and the literal `* * *` form) never
> render on the canvas; macro-spacing between beats (R-15, 64pt) does the
> rest-the-eye work. Removed from **every card on re-render**, not just new ones
> (ADR-0011). The original rule is kept below for genealogy (P10).

~~Glyph: `⁂` (U+2042). Centered horizontally within the content column. Set at body size (17pt) and body weight (400), default ink (100% opacity). No rule above or below, no box, no background tint, no transformation. Vertical band: 32pt above and 32pt below the glyph. Use is governed by GRAMMAR § G-10.~~

## R-12. Anti-pattern enforcement at validation time (V3.1+)

V3.1+ cards are validated by `app/scripts/validate-v3-1.mjs` (invoked as `npm --prefix app run validate`). The validator parses the markdown card and surfaces:

| Severity | Trigger |
|---|---|
| **Error** (exit 1) | A block contains ≥ 2 bolded runs |
| **Error** (exit 1) | A `standard-text` block does not open with a bolded clause |
| **Error** (exit 1) | A `table` with ≥ 4 data rows lacks a `**Takeaway**` row |
| **Error** (exit 1) | The cover declares any header element other than the three named in R-13 (title, dek, hero) |
| **Error** (exit 1) | The rendered card emits a `BEAT N`, `N / TOTAL`, or any position-counter label anywhere on the canvas (R-10) |
| **Error** (exit 1) | The rendered card emits a reader-visible footer carrying renderer version, era, mode, or render date — that stamp is dev-only metadata, `<meta>`-tag or comment only (R-10) |
| **Error** (exit 1) | A label (eyebrow, kicker, folio, badge, chip, micro-label) runs longer than 4 words (R-14) |
| **Error** (exit 1) | A context-chip strip (`A · B · C` of three or more orphan chips) appears anywhere a single dek/lead-clause sentence would integrate the same facts (R-14) |
| **Error** (exit 1) | An em dash (—) appears in reader-visible card content (R-24, V3.6) |
| **Error** (exit 1) | An asterism rest (`⁂` or a literal `* * *` line) appears in card content (R-24, V3.6 — supersedes R-11/G-10) |
| **Warning** | A `standard-text` block exceeds 75 words or 4 sentences |
| **Warning** | A beat has > 4 consecutive content blocks without an anchor (G-9) |
| **Warning** | Per-beat anchor-to-content ratio falls outside the 1:2–1:4 band |
| **Warning** | The cover stack departs from R-13 spacing (32 / 12 / 24 / 48pt) by more than 4pt at any join |
| **Warning** | A label appears on some sections of a card and not others without a structural reason (R-14 — inconsistency reads as bug) |

The validator is opt-in for V3.1+ cards only (it inspects `frozen_at_version` and skips older cards). It does not block `npm --prefix app run build`.

## R-13. Cover discipline (V3.1+, revised V3.3)

The cover is the card's title block — the first ~200pt of vertical space. It sets every label discipline that follows. Apple's restraint applies here first: no element appears unless its absence would lose meaning, and every detail is on the spec.

**Permitted elements, in this exact stacking order — no others:**

1. **Title** — display title role (40 / 44pt, semibold). 5 words preferred, 8 words hard cap; never a complete sentence.
2. **Dek** — subtitle role. **V3.1–V3.4:** 19 / 26pt, medium. **V3.5+ (R-21):** the dek stops being its own size — render it at **body size (17 / 26)** in a lighter weight (400/500) or `--ink-2` (secondary ink), so weight + ink, not a fourth size step, set it apart from the title. 1 sentence preferred, 2 sentences hard cap either way. Carries the load that mode badges and context chips would otherwise carry — a briefing's date, jurisdiction, or status belongs *in* the dek prose, not in a label strip beside it.
3. **Hero block** — the Beat 1 anchor (loft-card / hook), a bounded card (border + radius + padding, no shadow — R-22).

**Forbidden in the cover (each is a common renderer drift):**

| Anti-pattern | Why it fails |
|---|---|
| Top-edge `BEAT 1 · HOOK · 1 / 7` folio (the V3.1 micro-folio) | Position counters and beat indices are author scaffolding — R-10 (V3.3) prohibits emitting them anywhere on the rendered canvas. |
| Running brand-mark folio (`SC · BRIEFING · 1 / 7`-style) at the top edge | Restates identity already carried by the corner glyph and the URL — chrome instead of meaning. |
| Mode badge above or below the title (`BRIEFING`, `DEEP-DIVE`, `REFERENCE`) | The mode is carried by the corner glyph and by the URL — repeating it as cover chrome is restating identity, not adding meaning. |
| Date eyebrow as a separate label (`BRIEFING · MAY 15, 2026`) | A bare date floating above the title gives a reader nothing to hold. If the card's claim is time-sensitive, write the date *into* the dek's first clause where it modifies a verb. |
| Context-chip strip below the dek (`SUBJECT · JURISDICTION · STATUS`) | Three orphan chips force three separate parses; a single dek sentence integrates the same facts in one breath and earns its scroll. |
| Any label at the top edge of the cover | The cover opens on the title; the top edge carries no chrome. |

**Cover spacing stack — exact, not "around":**

| Join | Distance |
|---|---|
| Canvas top → title cap-height | 32pt |
| Title baseline → dek cap-height | 12pt |
| Dek baseline → hero card top edge | 24pt |
| Hero card bottom edge → first content section | 48pt (`--s-6`, beat boundary) |

These four values are the cover. Any deviation greater than 4pt at a join is a warning (R-12); the renderer should snap to the canonical stack.

**Why every item is justified:** the title is the topic; the dek is the thesis; the hero is the one bounded anchor (principle 4, R-22). Three elements, each load-bearing, each on the spec — and no fourth.

## R-14. Labels earn their existence (V3.1+)

R-13 set the discipline for the cover. R-14 generalizes it to every label that appears anywhere on the card. A label is any short, non-prose mark that names what something *is* — eyebrows, kickers, folios, badges, chips, micro-labels, section names, mode tags. Labels are the highest-density, lowest-information element on the canvas. They must justify themselves the way magazine furniture does, or be cut.

**The test for every label, asked in order:**

1. **Does removing it lose meaning?** If the surrounding prose, position, or hierarchy already says what the label says, the label is restating, not adding. Cut it.
2. **Does it answer a question the reader is actually asking at that point on the page?** A reader at the top of a block asks *"what is this section about?"* — an editorial eyebrow (`The medical study`) answers that. A reader does **not** ask *"which beat of the author's outline is this?"* — that question only exists for the author, so position labels (`BEAT 3`, `4 / 7`) answer no question on the canvas and are prohibited by R-10. A label that answers no reader question is decoration.
3. **Is it the only element doing that job?** If two labels carry the same signal (corner glyph + eyebrow + section header all naming the same thing), only the one closest to the reader's current focus survives. The others are duplication.

If a label fails any of the three, it's a renderer drift and must be cut. No exceptions for "consistency," "balance," or "the template has a slot for it."

**When labels do appear, they read as magazine furniture — not UI chrome:**

- **Hierarchy is set by typography, not by adding labels.** Display title, dek, body, caption — that's the ladder. A label is a fifth tier only when the four typographic tiers can't carry the load.
- **Each label sits in exactly one canonical position** for its kind: editorial eyebrow above a beat's first block, kicker above the title, byline below it. Position itself is half the label's meaning; floating labels read as chips.
- **Labels use the same micro-type spec everywhere they appear:** 11/14pt SF Pro Rounded, weight 600, UPPERCASE, +0.08em tracking, `--g-60`/tertiary ink, middle-dot separators. One typographic register for all labels means a reader recognizes "this is a label" without parsing the content.
- **Labels integrate facts, they don't list them.** A magazine doesn't strip its dateline into `MAGAZINE · ISSUE · DATE · SECTION` chips above an article — it writes "In the May issue of Harper's, ..." into the dek. Time, jurisdiction, status, mode, and any other context-setting fact lives *inside* the prose where it can modify a verb, not in a label strip beside it.
- **No label runs longer than four words.** A label that needs five words is a sentence pretending to be a label; promote it to the dek or cut it.

**Forbidden patterns** (each one an R-12 Error if a renderer emits it; the validator catches the structurally checkable ones — the rest are renderer-discipline reviews before publish):

| Drift | Why it fails |
|---|---|
| Two labels carrying the same signal in the same visual region | Duplication; the reader parses both and learns nothing extra |
| A label that paraphrases the title or dek below it | The prose already does the work; the label is throat-clearing |
| A label whose only function is to "balance" another label | Symmetry isn't a reason; load-bearing is |
| A context-chip strip (`A · B · C`) used where one dek sentence would integrate the same facts | Strips force three parses; prose forces one |
| A label that appears on some sections and not others without a structural reason | Inconsistency reads as bug, not intent |
| A label nested inside an already-labeled container (eyebrow under a kicker under a section header) | Three labels, one job — the typographic hierarchy alone should resolve it |
| A label longer than four words | A sentence pretending to be a label — promote to the dek or cut |
| Any position counter or beat label rendered to the reader (`BEAT N`, `N / TOTAL`, `MECHANISM · 4 / 7`) | Author scaffolding leaking into the reader's view — prohibited by R-10 and by I7 (no scaffold leakage) |

**The label-occlusion test, run on the rendered card before publish:** cover the labels with your thumb. If the card still tells you what each section is and where you are in it, the labels were doing real work — keep them. If you suddenly can't navigate, the labels were the whole navigation system and the typographic hierarchy needs strengthening. If nothing changes, the labels were decoration — cut them.

R-13 is the cover-specific application of R-14. The only labels a V3.3 card earns are the editorial eyebrow (content-naming and distinct, R-25) and the corner glyph (system identity, screenshot autonomy). Everything else fails the three-question test.

## R-15. Section spacing scale (V3.4; default revised in V3.5)

**V3.4 cards (unchanged):** beat boundaries default to **48pt (`--s-6`)**; a card MAY opt up to **64pt (`--s-7`) or 120pt (`--s-9`)** when its mode and length warrant marketing-scale breathing room.

**V3.5+ cards (revised default):** the default beat boundary becomes **64pt (`--s-7`)**. The opt-*down* to **48pt (`--s-6`)** is reserved for dense `reference`-mode cards; **96–120pt (`--s-8` / `--s-9`)** stays for poster / hero moments and XL deep-dives. More macro-spacing reads as "separate ideas" (Gestalt proximity), aids scannability, and raises perceived quality — Apple's marketing pages run 60–80pt mobile / 120–140pt desktop, so 64pt matches mobile-scale Apple and 120pt matches desktop-scale.

The renderer MUST snap to **one** value per card — 48, 64, 96, or 120 pt — and apply it to every beat boundary uniformly. Mixed gap sizes within a single card emit a warning.

**Caveat (both versions).** Scale only the *between-section* gap. Do **not** inflate micro-spacing (line-height, intra-block gaps, cover-stack joins) to match — the beat gap grows; the reading rhythm inside a block does not.

## R-16. Surface-tinted card affordance (V3.4+)

A card MAY use the **tinted-surface variant** in place of the default hairline-bordered variant. The two are mutually exclusive on any given card; the choice is per-card, not per-block.

**Default (V3.3 baseline, unchanged):** white surface (`--w`), 0.5px hairline at `--g-06`, 16pt corner radius.

**Tinted variant (V3.4+):** `--surface-tint` (`rgba(0,0,0,0.025)`) surface, no border, **18pt corner radius**. Cards using this variant inherit the Apple marketing-page affordance pattern: contrast comes from the surface tint against the white page, not from a hairline stroke that can compress out in screenshots.

**The screenshot-survival test for R-16.** Render the card, take a JPEG screenshot at 70% quality, view it at 50% size. The hairline must remain visible OR the surface tint must clearly differentiate the card from the page. If neither holds, the card fails R-17 below.

## R-17. Screenshot-autonomy enforcement (V3.4+)

The validator (`app/scripts/validate-v3-1.mjs`) MUST verify two structural conditions on every V3.4+ card:

1. **Every block has its own anchor.** An anchor is one of: a bolded lead-clause (G-7), a focal stat (numeric anchor), a definition term (definition block), a takeaway row (table with ≥ 4 rows, G-11), or an attribution (pull-quote). Blocks without anchors fail R-17 with an error.

2. **The corner glyph is present on every screenshot region.** The renderer MUST emit the corner glyph as a fixed-position element with `position: fixed` so that it appears on every viewport-sized capture of the card. Cards that scroll past 2,000pt MUST verify the glyph remains in the viewport at every scroll position via the test in `RENDERING-spec § Output contract`.

R-17 is the operationalization of Principle 1 (screenshot autonomy) at validation time. P1 was the goal; R-17 is the gate.

## R-18. Apple register opt-in (V3.4 — folded into the V3.5 default by R-19)

> **Superseded for V3.5+ by R-19.** V3.5 folds R-18's *display* tightening in as
> the default (no opt-in needed) and **drops the sub-1.5 body line-height
> variant** along with its `data-wcag-note="apple-register-below-1.5"` warning —
> V3.5 body stays at 26pt (1.53), above the WCAG floor, so no card carries the
> accessibility caveat. R-18 remains in force only for cards frozen at V3.4.x;
> `apple_register: true` is **not** a valid declaration on a V3.5 card.

A V3.4 card MAY declare `apple_register: true` in its frontmatter to opt into Apple's exact body typography in place of R-9's defaults. The Apple register applies these overrides on prose-bearing roles:

| Role | R-9 default (V3.1+) | Apple register (V3.4+ opt-in) |
|---|---|---|
| Body letter-spacing | +0.03em | **−0.022em** |
| Body word-spacing | +0.06em | (default) |
| Body line-height | 26pt (1.53) | **25pt (1.47)** |
| Display tracking | −0.018em | **−0.024em** |
| Display headline ramp | 40 → 56pt | **56 → 80pt** with `clamp()` |

**When to use it.** The Apple register is for marketing-mode cards — content that prioritizes the screenshotable poster aesthetic over the cognitive-prosthesis dense-reading aesthetic. A card carrying a single hero number, a few lofted stats, and short tile-headed beats reads better in the Apple register. A card carrying long prose, three multi-block beats, and dense rationale reads better in R-9.

**WCAG note.** R-9's 26pt body line-height (1.53) sits above the WCAG 2.2 SC 1.4.12 floor of 1.5. The Apple register's 25pt (1.47) sits **below** that floor. The render MUST emit a `data-wcag-note="apple-register-below-1.5"` attribute on the canvas root when `apple_register: true` is set, so downstream consumers know about the accessibility implication. Cards needing strict WCAG AA conformance stay on R-9.

**Mutual exclusion.** A card declares either Apple register or R-9, not both. Mixing within a single card emits an error.

## R-19. Body type metrics (V3.5+ — supersedes R-9)

V3.5+ cards (those declaring `frozen_at_version: 3.5.0` or higher) render prose-bearing roles from this rule. It supersedes R-9 (which stays in force for V3.1–V3.4 cards) and folds R-18's display tightening in as the default.

| Role | V3.1–V3.4 (R-9 / R-18) | V3.5+ (R-19) |
|---|---|---|
| Body size / leading | 17 / 26 | **17 / 26** (unchanged — 1.53, above the WCAG 1.5 floor) |
| Body letter-spacing | +0.03em (R-9) | **−0.01em** |
| Body word-spacing | +0.06em (R-9) | **normal** |
| Body alignment | left, ragged-right | left, ragged-right (unchanged) |
| Weights permitted in body | 400 / 500 / 700 | 400 / 500 / 700 (unchanged) |
| Italics for emphasis | forbidden | forbidden (italics only for titles / foreign terms) |
| Display tracking | −0.018em (R-9) / −0.024em (R-18 opt-in) | **−0.020em** (R-18's tightening, now default) |

**Why.** R-9 set body to +0.03em letter-spacing and +0.06em word-spacing. Apple tracks 17pt body *negative* (≈ −0.024em), and Goudy, Spiekermann, and Butterick are unanimous that lowercase body text is never positively tracked — positive tracking breaks word-shape recognition, the very thing fast scanning relies on. R-9's *good* parts are kept: 26pt leading stays above the WCAG 2.2 SC 1.4.12 floor (1.5 × 17 = 25.5pt); only the positive letter-spacing and word-spacing are removed, and the default tightens to −0.01em. R-18's "Apple register" already pointed this way but was opt-in; R-19 makes the correct default the only default and drops the sub-1.5 line-height variant.

**Tracking ladder by role (V3.5+).** This replaces R-9's body row and the type-scale tracking column for V3.5 cards:

| Role | Size / leading | Weight | Tracking |
|---|---|---|---|
| Hero number (reserved) | 56 / 60 | 700 + tnum | −0.025em |
| Display title | 40 / 44 | 600 | −0.020em |
| Subhead | 26 / 32 | 600 | −0.012em |
| Body | 17 / 26 | 400 | **−0.01em** (word-spacing normal) |
| Caption | 13 / 18 | 400 | 0 to +0.005em |
| Eyebrow (UPPERCASE) | 11 / 14 | 600 | **+0.08em** — the *only* positively-tracked role |

The eyebrow is the single exception: UPPERCASE letterforms have no word-shape to break, so positive tracking (which opens the caps' tight default fit) is correct there and nowhere else.

## R-20. Text-ink ladder (V3.5+)

`--ink-4` #888 (≈ 3.5:1), `--ink-5` #BBB (≈ 1.9:1), and `--g-30` (≈ 2:1) fail WCAG 2.2 SC 1.4.3 (4.5:1) for body text — yet `--g-30` was assigned to "tertiary text" through V3.4. Muted text cannot mean *unreadable*: de-emphasis must be a tonal step **between two passing inks**, not a drop below the floor. V3.5+ cards render all text from this three-step ladder:

| Layer | Token | Value | Contrast on white | Role |
|---|---|---|---|---|
| Primary (essence) | `--ink` | #1A1A1A | ≈ 17.6:1 | Bold lead-clauses, headers, focal stats |
| Secondary (dive-deeper) | `--ink-2` | #595959 | ≈ 7:1 | Body prose readers drop into |
| Tertiary (support) | `--ink-3` | #767676 | = 4.54:1 | Captions, footnotes, axis labels, eyebrows |

- **Demote `#888` / `#BBB` / `--g-30` to non-text only** — hairlines, gridlines, disabled, decorative rules. They are permitted for *large* text (≥ 24px) only, at the 3:1 large-text floor, and only above #949494.
- **WCAG values are not rounded.** A token computing 4.499:1 fails; the validator (R-12 / `validate-v3-1.mjs`) computes contrast and errors on any text token under floor.
- **Re-check against the surface.** On tinted-surface cards (R-16) the background is `--surface-tint` (rgba(0,0,0,0.025) over white, ≈ #F8F8F8), not pure white. Tertiary `--ink-3` #767676 clears 4.5:1 on white but only ≈ 4.3:1 on the tint — so **on tinted cards, tertiary text must step up to a tint-safe ink** (≥ #6E6E6E) or the card uses the hairline (white) surface. The validator re-runs the contrast check against `--surface-tint` for cards declaring `surface: tinted`.

The ramp's two jobs — text ink vs. non-text rules/fills — now have an explicit split (see "Gray ramp" above): the R-20 ladder is the only source of text ink on V3.5 cards.

## R-21. Three-size reading core (V3.5+)

The canon builds deep hierarchy from few sizes — Vignelli's "A Few Basic Typefaces," Müller-Brockmann's grid work, and Apple's HIG ("use one font and just a few styles and sizes"). Nine roles is too many. V3.5+ collapses the reading core to **three sizes**, with **weight + ink + space** doing the differentiation:

| Tier | Size / leading | Differentiation lever | Replaces |
|---|---|---|---|
| Header | 40 / 44 | weight 600, −0.020em | Display title (Hero 56 → opt-in poster only) |
| Subhead / large card | 26 / 32 | weight 600 + size | **merges Tile 28 + Section 24 + Subtitle 19** |
| Body | 17 / 26 | weight (400 / 500 / 700) + ink (#1A1A1A vs #595959) | Body |
| Utility (sparing) | 13 caption · 11 eyebrow | used rarely, always well-spaced | Caption, Eyebrow (kept, restricted) |
| Reserved | 56 hero · 14 mono | poster / code only | Hero, Code |

- **The dek / subtitle stops being a size.** Render it at **body size (17/26)** in a lighter weight or `--ink-2` (R-13, updated). The 19pt step is retired for V3.5.
- **The Vignelli test (authoring note).** If a beat "needs" a fourth size, differentiate by **weight or ink first** before adding a size. A size is the last lever, not the first — most apparent "need for a new size" is really a need for a heavier weight or a darker ink at an existing size.

## R-22. Flat surfaces — no shadow (V3.6+)

No `box-shadow` and no `--shadow-*` token exist in the system. The Shadow system above is retired (ADR-0011). An anchor card — the Beat 1 hero, a key-stat callout, a loft-card — is set apart from flat body blocks by **border + radius + padding**, never by elevation:

- **Bounded card:** white surface, 1px `--g-12` hairline (R-23), 16pt radius, `--s-4` padding. This is the new meaning of "lofted" in Principle 4 and R-13: *bounded*, not *elevated*.
- **Tinted card (R-16):** `--surface-tint` surface, no border, 18pt radius. Unchanged — it was already shadowless.
- **The 1–3-anchor hard cap stands.** It counts bounded (or tinted) cards now, not shadowed ones. Everything else stays flat with no card shell at all.

**Why.** A soft shadow on a flat grayscale poster fakes a light source the rest of the system doesn't have, and it is exactly the "chrome becomes the design" failure Principle 4 exists to suppress — reintroduced by the principle's own elevation mechanism. A border does the bounding job honestly and survives screenshot recompression better than a 4–6%-opacity shadow.

## R-23. Heavier hairline (V3.6+)

Hairlines step from `--g-06` (6%) to `--g-12` (12%); `--g-06` is no longer used for any border. At 393pt on white, a 6% stroke sits below reliable perception — card edges read as accidental gaps. `--g-12` was already the table-rule and hover-border tone, so this unifies on one hairline tone rather than adding a value.

- **Separators** (section / list-item / divider bottoms): 0.5px `--g-12`.
- **Card outlines** (hero, `pre`, gallery card / spec links, corner glyph): 1px `--g-12`.
- The tinted-surface variant (R-16) still omits the border entirely.

## R-24. No em dash, no asterism (V3.6+)

**No em dash (U+2014) renders in reader-visible card content.** Recast each one as a comma, colon, parentheses, or two sentences. En dashes (numeric ranges) and the minus sign are unaffected, and the `## Beat N — Name` authoring heading is scaffold that never reaches the render, so neither is touched. The `.sources` list marker is a middle dot (`·`), not an em dash.

**The asterism rest is retired** — R-24 supersedes R-11 and G-10. The `⁂` glyph and the literal `* * *` form never render; macro-spacing between beats (R-15, 64pt) carries the rest-the-eye load. A long content run breaks to an anchor or splits the beat (G-9); the asterism is no longer an escape hatch.

The validator escalates both an em dash and an asterism in card content to **errors** (R-12). **Retroactive (ADR-0011):** R-22 / R-23 / R-24 apply to every card on re-render regardless of `frozen_at_version` — the visual rules live at the base level of `supercard.css`, and em-dash removal is a content edit applied to all existing sources. This is the deliberate exception to the frozen-at-version guarantee (ADR-0003 / P8); the reading-layer rules (R-9/R-19, R-20, R-21) remain frozen and untouched.

## R-25. Distinct editorial eyebrows (V3.6.1+)

**An eyebrow names content, never the beat — and no two are alike.** Through V3.6.0 the render paths could stamp the *beat name* on every block, producing a rail of `EVIDENCE · EVIDENCE · MECHANISM · MECHANISM …` that leaked the author's seven-beat outline onto the canvas (the R-10 / I7 failure) and carried no information. R-25 makes the eyebrow an **editorial label** that names the block's content or topic, distinct from its neighbours and from the section divider above it:

- **Headingless block** → the eyebrow is its only label (e.g., `THE FOUNDING EXPERIMENT`).
- **Headed block** → the eyebrow + `h2` are a G-14 eyebrow + tagline pair: eyebrow = topic (`MODERN ADDITIONS`), heading = claim ("The set is open, not fixed"). They never restate each other.
- **Casing is unchanged** — eyebrows stay UPPERCASE (+0.08em); R-25 governs content, not case.

The validator flags a repeated eyebrow, a beat-name eyebrow, and an eyebrow that paraphrases its own heading. Retroactive like R-22–R-24: the React `Section`/`Eyebrow` primitives no longer derive the label from the beat, and the markdown source carries the editorial labels directly (ADR-0013).

## R-26. Centered separators (V3.6.1+)

**Each section's bottom hairline is evenly gapped between the two beats it divides** — it no longer hugs the section above. `section` vertical padding is symmetric (48/48); `section.divider` is symmetric and breathier (64/64); the V3.4/V3.5 `beat-gap-*` variants set top *and* bottom. Micro-spacing inside a block is unchanged. Base-level and retroactive (ADR-0013).

## Block compatibility

Every block in `20-BLOCKS/` declares:

- family — numeric / comparative / sequential / definitional / distributional / editorial
- lifecycle — core / stable / experimental / deprecated
- length_variants — subset of [mini, standard, xl]

Renderer reads these from each block's frontmatter and selects the appropriate render path.

## Frozen-at-authored-version

Every Supercard's frontmatter declares `frozen_at_version: 3.X.Y`. The renderer applies that version's rules. New blocks added in V3.1+ are unknown to V3.0 cards and the renderer skips them with a warning, never auto-migrates.

The renderer keeps a versioned rule library at `/renderer/v3.0/`, `/renderer/v3.1/`, etc. When loading a card, it resolves to the matching rule library.

## Output contract

Rendered HTML must:

- Be **standalone** — `--embed-resources --standalone` in Pandoc, all CSS/JS/fonts/images inlined as `data:` URIs
- Declare `color-scheme: light` on `:root` and emit `<meta name="color-scheme" content="light">` in `<head>` (see "Gray ramp")
- Render at 393pt mobile width as the canonical view
- Pass the screenshot test on every section
- Carry the corner glyph on every section as a fixed-position element
- **Emit no scaffold chrome.** Beat numbers (`BEAT 3`), position counters (`4 / 7`), block-type ids (`BLOCK-pull-quote`), and renderer-version / mode / date footers are **authoring metadata**: they live in the markdown card (`30-CARDS/`), in the breakdown, and in the HTML `<meta>` tags below — never in the reader-visible canvas (R-10, I7). A content block MAY carry a single editorial eyebrow (e.g., `THE FOUNDING EXPERIMENT`) that names its content/topic; the eyebrow is the *only* permitted section label, must be distinct from its neighbours (never the beat name, never repeated down a beat), pairs with a heading as topic-to-claim where one is present (R-25), and never carries a position counter. The cover (R-13) declares which header elements are permitted; any other label is a renderer drift.
- Embed provenance as `<meta>` tags in the HTML `<head>`: `sc:source_file`, `sc:research_report`, `sc:renderer_version`, `sc:frozen_at_version`, `sc:rendered_at` (and `sc:source_commit`, `sc:content_hash` where available). These five are mandatory and reader-invisible — they carry the production-metadata stamp that R-10 (V3.3) moves out of the rendered chrome. `sc:research_report` closes the genealogy loop — the render points back through the card to the `60-RESEARCH/` report it descends from.
- **Corner glyph viewport-persistent (V3.4+).** The corner glyph element renders with `position: fixed` and remains in the viewport at every scroll position. Cards over 2,000pt total height MUST be tested with an automated scroll-screenshot pass before publish — every 800pt slice must capture the glyph.

## Publishing (mandatory — ADR-0007)

Rendering is not optional. Every card request renders **and publishes**:

- The render is written to `docs/cards/CARD-{YYYY-MM-DD}-{slug}.html` — one standalone file per card. Multi-part `deep-dive` cards each get `...-part-N.html`.
- An entry is added to the `docs/index.html` **gallery** (newest at top), linking the new render.
- The `docs/` changes are committed and pushed. `docs/` is served as the pages site, so the card becomes a live URL — this is the "view it online" deliverable.
- Renders are **views, never sources** — never hand-edited. Re-render from the markdown card (the frozen-at-version canonical source, ADR-0003) instead.

See `docs/README.md` for the published-site structure.

## Two render paths

A card has one canonical source — the markdown in `30-CARDS/` — and **two**
render paths. Both are views; both are re-derived from the markdown, never
hand-edited.

| | HTML path | React path |
|---|---|---|
| Artifact | `docs/cards/CARD-{date}-{slug}.html` — one standalone file, all resources inlined | `app/src/cards/{slug}.tsx` — a component composed from block primitives |
| Needs the codebase? | **No.** Reproducible from this spec alone — an agent working from read-only guidance can produce it without a checkout. | **Yes.** Requires the `app/` Vite project. |
| Hosted on | GitHub Pages (`docs/`) | Vercel (`app/dist`, via `vercel.json`) |
| Gallery | `docs/index.html` | `app/src/cards/registry.tsx` + `app/src/Gallery.tsx` |

**The HTML path is the floor.** It is mandatory on every card request (ADR-0007)
and is the one that must stay reproducible from the spec with no codebase. The
React path is the bonus an agent *with* repo access can also produce.

**Pixel parity is the contract.** `app/src/supercard.css` is ported verbatim
from this spec's tokens and from the HTML renders, so a React-rendered card and
its standalone HTML twin are the same card at the same pixels. The block
components in `app/src/blocks.tsx` are keyed one-to-one to `INDEX-block-library`
ids and emit the same markup the HTML renderer does.

**Both paths ship from one deployment.** The `app/` build copies `docs/` into
`app/dist/html/`, so the Vercel deployment serves the React gallery at `/` and
the canonical standalone HTML twins at `/html/cards/CARD-...html`. See
`app/README.md`.
