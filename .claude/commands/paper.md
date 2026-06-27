---
description: Paper MCP operator for Supercard — pull the real grayscale system onto the canvas, explore landing + card directions visually, round-trip back to React/CSS with real tokens (never raw hex).
argument-hint: "[inspect | tokens | pull <target> | variant <target> [direction] | to-code [<target>] | figma | refresh] — target is landing | card <slug> | a file path (e.g. \"pull landing\", \"variant landing calmer\", \"to-code\")"
allowed-tools: Read, Write, Edit, Glob, Grep, Bash, Agent, mcp__plugin_paper-desktop_paper__get_guide, mcp__plugin_paper-desktop_paper__get_basic_info, mcp__plugin_paper-desktop_paper__get_selection, mcp__plugin_paper-desktop_paper__get_node_info, mcp__plugin_paper-desktop_paper__get_children, mcp__plugin_paper-desktop_paper__get_tree_summary, mcp__plugin_paper-desktop_paper__get_screenshot, mcp__plugin_paper-desktop_paper__get_jsx, mcp__plugin_paper-desktop_paper__get_computed_styles, mcp__plugin_paper-desktop_paper__get_fill_image, mcp__plugin_paper-desktop_paper__get_font_family_info, mcp__plugin_paper-desktop_paper__create_artboard, mcp__plugin_paper-desktop_paper__write_html, mcp__plugin_paper-desktop_paper__set_text_content, mcp__plugin_paper-desktop_paper__update_styles, mcp__plugin_paper-desktop_paper__rename_nodes, mcp__plugin_paper-desktop_paper__duplicate_nodes, mcp__plugin_paper-desktop_paper__move_nodes, mcp__plugin_paper-desktop_paper__delete_nodes, mcp__plugin_paper-desktop_paper__finish_working_on_nodes, mcp__plugin_paper-desktop_paper__export
---

# Paper: **$ARGUMENTS**

> Supercard's design canvas. Three principles: (1) pull the **real grayscale
> system** onto the canvas — never approximate it, (2) explore landing + card
> directions visually before committing, (3) round-trip back to React/CSS with
> **real tokens, never raw hex**. The whole design system is one file —
> [`app/src/supercard.css`](../../app/src/supercard.css) `:root` — plus the
> governance docs. There is **no external DS and no icon library**: icons are
> inline SVG. Upstream: [paper.design/docs/mcp](https://paper.design/docs/mcp).

---

## Mandatory session prelude

Run once at the start of any `/paper` session, in order, before any other Paper tool:

1. `mcp__plugin_paper-desktop_paper__get_guide({ topic: "paper-mcp-instructions" })` — Paper's design-quality + review-checkpoint rules
2. `mcp__plugin_paper-desktop_paper__get_basic_info()` — file, artboards, loaded fonts
3. `mcp__plugin_paper-desktop_paper__get_selection()` — what the user has focused

Skip only if you already ran them this same session and the user told you what's on the canvas.

---

## The non-negotiable house rules

These hold in **every** mode. They are what make a Paper composition translate cleanly back to Supercard code.

| Rule | What it means on the canvas |
|---|---|
| **Strict grayscale (P-5)** | Black/white + the 6-step gray ramp only: `--w` #fff, `--g-06`, `--g-12`, `--g-30`, `--g-60`, `--k` #000, with the `--ink`/`--ink-2`/`--ink-3` text ladder. **No color, ever** — no accent, no tint other than `--surface-tint` (rgba(0,0,0,0.025)). The lone exception is the copy button's transient success check (`#34c759`) — UI feedback chrome, not content; keep variants grayscale. |
| **SF Pro Rounded** | `--rounded` (ui-rounded / SF Pro Rounded) for everything; `--mono` (SF Mono) for code, URLs, meta, badges, back-links. Run `get_font_family_info` before first typographic styling; if the rounded face isn't loaded, pick the closest and note the CSS var is the truth. |
| **393pt mobile canvas** | The site renders at a **393px** column, 16px gutter (361px content). Match it for landing + card work. Designer column guides are `border-left/right: 1px dotted var(--g-12)`. |
| **8pt spacing scale** | `--s-1` 8 · `--s-2` 12 · `--s-3` 16 · `--s-4` 24 · `--s-5` 32 · `--s-6` 48 · `--s-7` 64 · `--s-8` 96 · `--s-9` 120. Use the steps; don't invent gaps. |
| **No shadows (R-22)** | Retired in V3.6. Set a surface apart with border + radius + padding, never elevation. There is no `--shadow-*` token. |
| **`color-scheme: only light`** | The canvas is light-only by design — never build a dark variant. |
| **Inline SVG icons** | No Hugeicons, no icon font. The icon set lives in [`app/src/ui.tsx`](../../app/src/ui.tsx): lucide-style, `viewBox 0 0 24 24`, `stroke: currentColor`, `strokeWidth 2`, round caps. One button shape `.icon-btn` (black circle, white glyph, `ICON_BTN_SIZE = 40`). Reuse it; don't draw new chrome shapes. |
| **Plain, sentence-case copy** | Sentence case throughout. **No em dash** in reader-visible content (R-24); use a period or a comma. Plain language (P-13, FK grade 6–9). |
| **Frozen-at-version cascade** | Cards carry their version on the canvas class (`.canvas.v3-7`, `.canvas.v3-5`, …) so older cards stay pixel-identical. The **landing/gallery uses the base `.canvas`**. When you pull or round-trip a card, respect its frozen version. |

---

## Sources of truth

| Source | Path | Role |
|---|---|---|
| **Design tokens (the only source)** | [`app/src/supercard.css`](../../app/src/supercard.css) `:root` | grayscale ramp, type scale, spacing, fonts, per-version overrides |
| Rendering spec (normative) | [`10-GOVERNANCE/RENDERING-spec.md`](../../10-GOVERNANCE/RENDERING-spec.md) | canvas, ramp, type scale, output contract, R-rules |
| Principles | [`10-GOVERNANCE/PRINCIPLES-supercard-v3.md`](../../10-GOVERNANCE/PRINCIPLES-supercard-v3.md) | the 14 principles (grayscale, single emphasis, plain language) |
| Block grammar | [`10-GOVERNANCE/GRAMMAR-block-composition.md`](../../10-GOVERNANCE/GRAMMAR-block-composition.md) | block families, seven-beat spine, density budget |
| Block library | [`00-INDEX/INDEX-block-library.md`](../../00-INDEX/INDEX-block-library.md) | 39 blocks, lifecycle + length variants |
| **Landing component** | [`app/src/Gallery.tsx`](../../app/src/Gallery.tsx) | the landing view — primary `pull` / `variant` / `to-code` target |
| Shared chrome | [`app/src/ui.tsx`](../../app/src/ui.tsx) | `IconButton` + the inline-SVG icon set |
| Card block components | [`app/src/blocks.tsx`](../../app/src/blocks.tsx) | Canvas, Section, Hero, charts, editorial blocks |
| Card registry | [`app/src/cards/registry.tsx`](../../app/src/cards/registry.tsx) | how a card is registered for the React path |
| Published twins | [`docs/index.html`](../../docs/index.html) · `docs/cards/*.html` | the deployed static site (keep in sync on `to-code`) |
| Canonical entry index | [`00-INDEX/INDEX-supercard-v3.md`](../../00-INDEX/INDEX-supercard-v3.md) | start-here map for the whole system |

---

## Modes

| Pattern | Mode |
|---|---|
| `inspect` | **Inspect** — read the canvas, summarize, mutate nothing |
| `tokens` | **Tokens** — write the grayscale ramp + type scale + spacing onto a reference artboard |
| `pull <target>` | **Pull** — faithful, code-driven copy of a real surface (`landing`, `card <slug>`, or a file path); every distinct state its own artboard |
| `variant <target> [direction]` | **Variant** — explore alternative directions off a pulled baseline (the landing-redesign workhorse) |
| `to-code [<target>]` | **To code** — translate the Paper selection back to React/CSS with real tokens |
| `figma` | **Figma** — run Paper's `figma-import` guide |
| `refresh` | **Refresh** — note tool drift against Paper's documented tool list |
| *(empty)* | **Default** — print the map + state, ask what to work on |

---

## ▶ Landing-page redesign flow (the main event)

The string of modes to improve the landing. This is principles 1 → 2 → 3 in order:

1. **`/paper tokens`** *(once)* — drop the real ramp, type scale, and spacing onto a reference artboard so every later choice is anchored to a real value, not a guess.
2. **`/paper pull landing`** — bring the **current** Gallery onto the canvas, faithful to `Gallery.tsx` + `ui.tsx` + the resolved `supercard.css` values, at 393px. This is your known-good baseline.
3. **`/paper variant landing <direction>`** — post a brief, then `duplicate_nodes` the baseline and restyle the clone. Do 2–3 directions as separate frames so they sit side by side for comparison. Stay grayscale; vary rhythm, hierarchy, density, and the spec/sample framing — not the palette.
4. Review with the user, pick a winner, refine it in place (`update_styles` / `set_text_content` on the chosen frame — never delete-and-restart).
5. **`/paper to-code`** — translate the chosen frame back into `Gallery.tsx` (and `ui.tsx` / `supercard.css` if shapes or tokens changed), mapping every literal to a token. Then **sync the twin** `docs/index.html`, and verify with `cd app && npm run dev` (or `npm run build`).

---

## Inspect mode

Tell the user what's on the canvas without touching it.

1. Session prelude.
2. For each artboard in `get_basic_info`, `get_tree_summary({ nodeId, depth: 2 })`.
3. If there's a selection, `get_node_info` on it.
4. Summarize: file · artboards (name · dimensions · brief content) · selection · loaded fonts.
5. No mutations. No `finish_working_on_nodes`.

---

## Tokens mode

Make Supercard's foundations visible on the canvas so design choices stay anchored to real values.

1. Session prelude.
2. Read `app/src/supercard.css` `:root` for the canonical token list, and `RENDERING-spec.md` for the normative type scale.
3. `create_artboard({ name: "Supercard tokens — <YYYY-MM-DD>", style: { width: 393, height: "fit-content" } })`.
4. Build sections one at a time (each its own `write_html`), screenshotting between:
   - **Gray ramp** — `--w`, `--g-06`, `--g-12`, `--g-30`, `--g-60`, `--k`, then the `--ink` / `--ink-2` / `--ink-3` text ladder. Each swatch labeled with token name **and** resolved value.
   - **Type scale** — Hero 56/60, Display (h1) 40/44, Tile 28/32, Section (h2) 24/30, Subtitle 19/26, Body 17/24, Caption/desc 15/21, Meta/eyebrow 11/14, Mono 14/22. Honor weights from the CSS (h1/h2 are `font-semibold` 600; body is 400; `strong` is 700 `--k`).
   - **Spacing** — `--s-1`…`--s-9` as bars.
   - **Surfaces** — bordered card (`1px solid --g-12`, radius 16), `--surface-tint` card, the `.icon-btn` black circle, a `--mono` pill. No shadow row (retired).
5. Run Paper's six review checkpoints. `finish_working_on_nodes`.

---

## Pull mode — `pull <target>`

Faithful, code-driven copy of a real Supercard surface onto the canvas. **Principle 1.** The baseline you branch variants off. Source of truth is always the code, **never a screenshot**.

**Targets:** `landing` (the Gallery) · `card <slug>` (a registered card) · a file path · the current selection.

1. Session prelude.
2. **Resolve the target & build the source map.** Read every file it renders from:
   - `landing` → `Gallery.tsx` + `ui.tsx` + the landing classes in `supercard.css` (`.canvas`, `.gallery-lede`, `.spec-link*`, `.sample-*`, `.card-*`, `.icon-btn`, `.back-link`).
   - `card <slug>` → the registry entry, `app/src/cards/<slug>.tsx`, the blocks it uses in `blocks.tsx`, and the matching `.canvas.v3-N` overrides in `supercard.css`.
   - Resolve **every** token used to its real value from `supercard.css` (hex/px, not "approximately gray").
3. **Enumerate distinct states** (the step a quick copy skips) — gallery vs. card-view, the copy button's resting vs. copied state, sample-card resting vs. hover, empty/loading if any. Post the list before building so the user can prune.
4. **One artboard per state**, each self-contained, at **393px**, height `"fit-content"`, with the dotted column guides so it reads in isolation.
5. **Build** — `create_artboard`, then `write_html` one visual group at a time using the **resolved** values. Duplicate + mutate repeating rows (sample cards, action rows). Screenshot + run the six checkpoints after each group.
6. **Footer caption** on every artboard naming its source files (`src: app/src/Gallery.tsx, app/src/ui.tsx`) — this is what makes a later refine or `to-code` cheap.
7. Cross-state continuity — when two states share structure, `duplicate_nodes` the first and mutate only what changes.
8. `finish_working_on_nodes`; say which artboards landed, offer a variant pass.

> A pull that shows only the resting state isn't faithful. Each distinct UI state earns its own artboard.

---

## Variant mode — `variant <target> [direction]`

Explore alternative directions off a pulled baseline. **Principle 2.** This is the landing-redesign workhorse.

1. Session prelude. If the baseline isn't on the canvas, run `pull <target>` first.
2. **Post a design brief in chat BEFORE any mutation** (Paper's rule). Because the palette is locked to grayscale, the brief explores *structure*, not color:
   - **Mood candidates** (3–5) and the one chosen (one sentence; pick something past your first instinct)
   - **Hierarchy** — what leads, what recedes, where the single emphasis lands (P-2)
   - **Rhythm** — section gaps from the 8pt scale, density of the spec/sample framing
   - **Type** — sizes/weights from the real scale; where mono vs. rounded is used
   - **Direction** — one sentence on what this version argues
3. `duplicate_nodes` the baseline composition — don't rewrite HTML.
4. `update_styles` + `set_text_content` on the clone for the new direction.
5. Rename the new top-level frame `<target> / <direction>` (kebab-case) so intent shows in the layer list.
6. Screenshot, run the six checkpoints, fix targeted issues — don't delete and restart.
7. Repeat for additional directions in the same session; each is its own duplicated tree, sitting side by side for comparison.
8. `finish_working_on_nodes`.

**Supercard variant guardrails:** strict grayscale (no accent, no second tint) · sentence case, no em dash · one emphasis per block · inline-SVG icons reusing `.icon-btn` · no shadows · `only light`.

---

## To-code mode — `to-code [<target>]`

Translate the selected Paper composition back to React/CSS with real tokens. **Principle 3.**

1. Session prelude. Confirm a selection with `get_selection`; if empty, ask the user to select the target frame.
2. **Pull ground truth — never read values off a screenshot:**
   - `get_jsx({ nodeId, mode: "tailwind" })` for structure
   - `get_computed_styles({ nodeIds: [...] })` for exact CSS
   - `get_fill_image` only if a real image fill must be extracted
3. **Map every literal to a token.** Gray → the ramp (`--w`/`--g-*`/`--k`) or ink ladder (`--ink*`); spacing → `--s-*`; type → the scale's sizes/line-heights/weights; mono runs → `--mono`. If a value has no token match, **stop and flag it** — either the value is wrong or grayscale is being broken.
4. **Where it lands:**
   - Landing changes → `app/src/Gallery.tsx`; shared chrome → `app/src/ui.tsx`; new/changed tokens or classes → `app/src/supercard.css`.
   - Card changes → `app/src/cards/<slug>.tsx`; new shared block → `app/src/blocks.tsx`; register via `app/src/cards/registry.tsx`.
5. **Conventions** (global): kebab-case filenames, PascalCase components, **named exports only**, camelCase vars. Match the surrounding file's style.
6. **Icons** — reuse the existing inline-SVG components / `IconButton` from `ui.tsx`. New glyph → add a small lucide-style SVG component there (24×24, `currentColor`, `strokeWidth 2`); don't pull in a library.
7. **Forbidden in committed code:** raw hex, arbitrary px, color outside the ramp, `box-shadow`, a dark-mode branch, em dashes in copy.
8. **Sync the published twin** — a landing edit means updating `docs/index.html` to match; a card edit means re-rendering its `docs/cards/*.html` twin (`cd app && npm run render -- <card>` / `npm run build`). The deploy is `docs/`; the twins must not drift from the React render (RENDERING-spec parity).
9. **Verify:** `cd app && npm run dev` (live) or `npm run build` (full build → typecheck → copy renders).

---

## Figma mode

1. `mcp__plugin_paper-desktop_paper__get_guide({ topic: "figma-import" })`.
2. Confirm the Figma file is open in Figma desktop and the Figma MCP is connected.
3. Follow the guide. Then switch into `tokens` / `pull` / `variant` as needed.

---

## Refresh mode

1. WebFetch [paper.design/docs/mcp#tools-and-capabilities](https://paper.design/docs/mcp#tools-and-capabilities).
2. Compare against the Paper tools in this command's `allowed-tools`. Report any new / removed / renamed tools so the front-matter can be updated. (No separate tools doc to maintain — this command is self-contained.)

---

## Default (no args)

Run the prelude (if needed) and print:

```
Paper · Supercard design canvas (strict grayscale · SF Pro Rounded · 393pt mobile)

Inspect:   /paper inspect              → read canvas state
Tokens:    /paper tokens               → drop the ramp + type scale + spacing
Pull:      /paper pull landing         → faithful copy of a surface (landing | card <slug> | path)
Variant:   /paper variant landing ...  → explore directions off a pulled baseline
To code:   /paper to-code              → selection → React/CSS with real tokens
Utility:   /paper figma · /paper refresh

State:
  File:       <filename>
  Artboards:  <count>
  Fonts:      <comma list>
  Selection:  <name or "none">

Landing redesign: tokens → pull landing → variant landing <dir> → to-code → sync docs/index.html
```

Ask: **"Inspect, set tokens, pull a baseline, vary it, or round-trip?"**

---

## Common pitfalls

| Symptom | Fix |
|---|---|
| Introduced an accent color | **Grayscale only (P-5).** Ramp + ink ladder, plus `--surface-tint`. Nothing else. |
| Wrote a whole surface in one `write_html` | One visual group per call. Watching it build piece-by-piece is the point. |
| Pasted hex from `get_computed_styles` into code | Map every literal to a token first; flag any value with no token. |
| Read sizes/colors off a screenshot | Use `get_jsx` + `get_computed_styles`. Screenshots are review-only. |
| Built at desktop width | The site is **393px** mobile. Match it, with the dotted column guides. |
| Added a `box-shadow` | Retired (R-22). Border + radius + padding instead. |
| Reached for an icon library | Inline SVG only — reuse / extend the set in `ui.tsx`. |
| Em dash in landing/card copy | Period or comma (R-24). Sentence case. |
| Edited `Gallery.tsx` but not `docs/index.html` | The twin must stay in sync — `docs/` is the published site. |
| Forgot `finish_working_on_nodes` | Mandatory at the end of any mutating run. |
| Put node IDs in user-facing text | Refer to layers by name ("the spec block", "first sample card"). |
