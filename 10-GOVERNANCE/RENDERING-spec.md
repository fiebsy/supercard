# RENDERING — Spec

| key | value |
|---|---|
| id | RENDERING-spec |
| type | governance |
| era | atlas |
| version | 3.0.0 |
| owner | derick |
| updated | 2026-05-14 |

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
