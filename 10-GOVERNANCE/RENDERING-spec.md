# RENDERING — Spec

| key | value |
|---|---|
| id | RENDERING-spec |
| type | governance |
| era | atlas |
| version | 3.3.0 |
| owner | derick |
| updated | 2026-05-16 |

How a Supercard source becomes a rendered HTML artifact, and how that artifact is published so it can be viewed online. Tokens, type scale, spacing, shadows, canvas, publishing.

---

## Canvas

- **Mobile portrait:** 393 × 852pt (iPhone 15/16 Pro)
- **Outer gutter:** 16pt
- **Content width:** 361pt
- **Internal card pad:** 24pt
- **Card radius:** 16pt (concentric with iOS 26)
- **Hairline:** 0.5px solid rgba(0,0,0,0.06)

## Gray ramp (the only ramp)

| Step | Token | Value | Use |
|---|---|---|---|
| 0% | --w | #FFFFFF | Page, card surface |
| 6% | --g-06 | rgba(0,0,0,0.06) | Hairline borders, card outlines |
| 12% | --g-12 | rgba(0,0,0,0.12) | Gridlines, subtle backgrounds |
| 30% | --g-30 | rgba(0,0,0,0.30) | Tertiary text, deemphasized data |
| 60% | --g-60 | rgba(0,0,0,0.60) | Secondary text, axis labels, footnotes |
| 100% | --k | #000000 | Body text, primary, focal data |

Body text uses #111111 (--ink), never pure black. Per-block layers use --ink-2 (#333), --ink-3 (#555), --ink-4 (#888), --ink-5 (#BBB).

The canvas is light-only. The renderer declares `color-scheme: light` on `:root` and emits `<meta name="color-scheme" content="light">` in `<head>` so iOS Safari's automatic dark-mode (and equivalents in other webviews) does not partially invert the page — that inversion leaves `--ink-2` / `--ink-3` text as low-contrast gray on near-black. A theme-aware dark variant, if ever introduced, ships as a parallel ink ramp under `@media (prefers-color-scheme: dark)`, never as an auto-inversion.

## Type scale (SF Pro Rounded)

| Role | Size / leading | Weight | Tracking (em) |
|---|---|---|---|
| Hero number | 56 / 60 | Bold (700) + tnum | −0.022 |
| Display title | 40 / 44 | Semibold (600) | −0.018 |
| Section header | 24 / 30 | Semibold (600) | −0.012 |
| Subtitle | 19 / 26 | Medium (500) | −0.005 |
| Body | 17 / 24 | Regular (400) | −0.008 |
| Caption | 13 / 18 | Regular | +0.008 |
| Eyebrow | 11 / 14 | Semibold UPPERCASE | +0.07 |
| Code / equations | 14 / 22 | SF Mono Regular | 0 |

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
| --s-6 | 48 | Beat boundaries |
| --s-7 | 64 | Major section breaks |
| --s-8 | 96 | Hero / footer |

## Shadow system

```css
--shadow-flat: none;
--shadow-subtle: 0 1px 2px rgba(0,0,0,0.03), 0 4px 12px rgba(0,0,0,0.04);
--shadow-lofted: 0 2px 4px rgba(0,0,0,0.04), 0 12px 32px rgba(0,0,0,0.06), 0 32px 80px rgba(0,0,0,0.04);
```

| Token | Use | Lift |
|---|---|---|
| flat | Body text, dividers, footnotes, inline charts (most blocks) | 0 dp |
| subtle | Secondary cards, callouts beside the hero | ~2 dp |
| lofted | Hero card, key-stat anchor, loft-card block | ~8 dp |

**Hard cap: 1–3 elevated elements per Supercard.** All opacity ≤ 6% per stop. Y-offset ⅓ of blur. Pure black at low opacity — never warm or cool gray (tinted shadows leak hue and break grayscale).

## R-9. Type metrics (V3.1+)

The base type scale above is V3.0's authoritative reference. V3.1+ cards (those declaring `frozen_at_version: 3.1.0` or higher) render with the following overrides on prose-bearing roles. Older cards remain on the V3.0 table per ADR-0003.

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

**Permitted exception — the editorial eyebrow.** A single short editorial eyebrow label per beat (e.g., `The medical study`) is allowed when the beat's first block does not carry a sufficient anchor on its own. The eyebrow names the *content*, never the position. Position counters (`4 / 7`, `BEAT 3`, etc.) are never permitted under any circumstance.

The eyebrow, when present, uses the existing label micro-type spec (11/14pt SF Pro Rounded, weight 500, UPPERCASE, +0.08em tracking, `--g-60`) so labels stay typographically uniform across the card. It is still subject to R-14: a label that doesn't earn its existence must be cut.

**Bottom edge — dev-only metadata.** The pre-V3.3 footer (`SUPERCARD V3.X · ATLAS · {MODE} · YYYY-MM-DD`) is moved to dev-only. The renderer MAY emit this stamp as an HTML comment or a `data-*` attribute on the canvas root, but production renders MUST NOT show renderer version, era name, mode, or render date in any reader-visible chrome. The five `sc:*` `<meta>` tags in `<head>` (see Output contract) remain mandatory — they carry the same metadata in a place the reader cannot see.

**Why.** A reader holding a screenshot of the rendered card never asked "which beat of the author's outline is this?" — that question only exists for the author. Anything in the rendered card that exists to help the author keep track of structure (beat names, position counters, block-type labels, version metadata visible above the fold) is a leak from the production scaffold into the reader's interface. The reader gets one continuous argument; the scaffolding stays in the source file, in `<meta>` tags, and in the breakdown document.

## R-11. Asterism rendering (V3.1+)

Glyph: `⁂` (U+2042). Centered horizontally within the content column. Set at body size (17pt) and body weight (400), default ink (100% opacity). No rule above or below, no box, no background tint, no transformation. Vertical band: 32pt above and 32pt below the glyph. Use is governed by GRAMMAR § G-10.

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
| **Warning** | A `standard-text` block exceeds 75 words or 4 sentences |
| **Warning** | A beat has > 4 consecutive content blocks without an asterism or anchor |
| **Warning** | A beat of ≥ 5 blocks is missing the `⁂` asterism after block 4 |
| **Warning** | Per-beat anchor-to-content ratio falls outside the 1:2–1:4 band |
| **Warning** | The cover stack departs from R-13 spacing (32 / 12 / 24 / 48pt) by more than 4pt at any join |
| **Warning** | A label appears on some sections of a card and not others without a structural reason (R-14 — inconsistency reads as bug) |

The validator is opt-in for V3.1+ cards only (it inspects `frozen_at_version` and skips older cards). It does not block `npm --prefix app run build`.

## R-13. Cover discipline (V3.1+, revised V3.3)

The cover is the card's title block — the first ~200pt of vertical space. It sets every label discipline that follows. Apple's restraint applies here first: no element appears unless its absence would lose meaning, and every detail is on the spec.

**Permitted elements, in this exact stacking order — no others:**

1. **Title** — display title role (40 / 44pt, semibold). 5 words preferred, 8 words hard cap; never a complete sentence.
2. **Dek** — subtitle role (19 / 26pt, medium). 1 sentence preferred, 2 sentences hard cap. Carries the load that mode badges and context chips would otherwise carry — a briefing's date, jurisdiction, or status belongs *in* the dek prose, not in a label strip beside it.
3. **Hero block** — the lofted Beat 1 anchor (loft-card / hook).

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

**Why every item is justified:** the title is the topic; the dek is the thesis; the hero is the one elevated anchor (principle 4). Three elements, each load-bearing, each on the spec — and no fourth.

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
- **Labels use the same micro-type spec everywhere they appear:** 11/14pt SF Pro Rounded, weight 500, UPPERCASE, +0.08em tracking, `--g-60`, middle-dot separators. One typographic register for all labels means a reader recognizes "this is a label" without parsing the content.
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

R-13 is the cover-specific application of R-14. The only labels a V3.3 card earns are the editorial eyebrow (when a beat's first block doesn't carry its own anchor) and the corner glyph (system identity, screenshot autonomy). Everything else fails the three-question test.

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
- **Emit no scaffold chrome.** Beat numbers (`BEAT 3`), position counters (`4 / 7`), block-type ids (`BLOCK-pull-quote`), and renderer-version / mode / date footers are **authoring metadata**: they live in the markdown card (`30-CARDS/`), in the breakdown, and in the HTML `<meta>` tags below — never in the reader-visible canvas (R-10, I7). A beat's first block MAY carry a single editorial eyebrow (e.g., `The medical study`) when its own anchor doesn't name the content; the eyebrow is the *only* permitted section label and never carries a position counter. The cover (R-13) declares which header elements are permitted; any other label is a renderer drift.
- Embed provenance as `<meta>` tags in the HTML `<head>`: `sc:source_file`, `sc:research_report`, `sc:renderer_version`, `sc:frozen_at_version`, `sc:rendered_at` (and `sc:source_commit`, `sc:content_hash` where available). These five are mandatory and reader-invisible — they carry the production-metadata stamp that R-10 (V3.3) moves out of the rendered chrome. `sc:research_report` closes the genealogy loop — the render points back through the card to the `60-RESEARCH/` report it descends from.

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
