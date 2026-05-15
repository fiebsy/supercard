# RENDERING — Spec

| key | value |
|---|---|
| id | RENDERING-spec |
| type | governance |
| era | atlas |
| version | 3.1.0 |
| owner | derick |
| updated | 2026-05-15 |

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
| Weights permitted in body | 300–700 | **400 / 500 / 700 only** in prose; 300 reserved for the micro-folio (R-10) and dek |

Rationale: WCAG 2.2 SC 1.4.12 requires line-height ≥ 1.5× font-size — at 17pt body that's ≥ 25.5pt. The V3.0 24pt setting was a hair under spec. SF Pro Rounded uses Display-cut glyphs at all sizes; Apple's default Display tracking (−0.43pt at 17pt) compresses Rounded's apertures at body size — the +0.5pt override restores aperture clarity. Measure stays 55–66 CPL preferred, 75 CPL maximum.

## R-10. Beat micro-folio (V3.1+)

Every V3.1+ card MUST render a beat micro-folio at the **top edge** (12pt below the title) AND at the **bottom edge** (24pt above the card's bottom margin).

Format: `BEAT N · BEAT-NAME · POSITION / TOTAL` — e.g., `BEAT 3 · MECHANISM · 4 / 7`.

| Property | Value |
|---|---|
| Typeface | SF Pro Rounded |
| Size / line-height | 11 / 14pt |
| Weight | 500 |
| Case | UPPERCASE |
| Letter-spacing | +0.08em |
| Numerals | `font-variant-numeric: tabular-nums` |
| Color | gray at 60% opacity (`--g-60`) |
| Separator | middle-dot `·` (U+00B7) |

The micro-folio is the only element permitted at the top and bottom edges of the card and does NOT count against the 1–3 elevated-element cap — it is flat type, not chrome.

## R-11. Asterism rendering (V3.1+)

Glyph: `⁂` (U+2042). Centered horizontally within the content column. Set at body size (17pt) and body weight (400), default ink (100% opacity). No rule above or below, no box, no background tint, no transformation. Vertical band: 32pt above and 32pt below the glyph. Use is governed by GRAMMAR § G-10.

## R-12. Anti-pattern enforcement at validation time (V3.1+)

V3.1+ cards are validated by `app/scripts/validate-v3-1.mjs` (invoked as `npm --prefix app run validate`). The validator parses the markdown card and surfaces:

| Severity | Trigger |
|---|---|
| **Error** (exit 1) | A block contains ≥ 2 bolded runs |
| **Error** (exit 1) | A `standard-text` block does not open with a bolded clause |
| **Error** (exit 1) | A `table` with ≥ 4 data rows lacks a `**Takeaway**` row |
| **Warning** | A `standard-text` block exceeds 75 words or 4 sentences |
| **Warning** | A beat has > 4 consecutive content blocks without an asterism or anchor |
| **Warning** | A beat of ≥ 5 blocks is missing the `⁂` asterism after block 4 |
| **Warning** | Per-beat anchor-to-content ratio falls outside the 1:2–1:4 band |

The validator is opt-in for V3.1+ cards only (it inspects `frozen_at_version` and skips older cards). It does not block `npm --prefix app run build`.

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
- **Label each section with the beat NAME only** — `HOOK`, `EVIDENCE`, `MECHANISM`, `COMPARISON`, `COUNTER`, `APPLICATION`, `CLOSE` (and `SOURCES`). The `Beat N` index and the `BLOCK-*` id are **authoring metadata**: they live in the markdown card (`30-CARDS/`) and are never rendered. A rendered card is a public, shareable artifact — it must not show the scaffolding it was built on.
- Embed provenance as `<meta>` tags in the HTML `<head>`: `sc:source_file`, `sc:research_report`, `sc:renderer_version`, `sc:frozen_at_version`, `sc:rendered_at` (and `sc:source_commit`, `sc:content_hash` where available). `sc:research_report` closes the genealogy loop — the render points back through the card to the `60-RESEARCH/` report it descends from.

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
