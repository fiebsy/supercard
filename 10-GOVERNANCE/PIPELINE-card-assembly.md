# PIPELINE — Card Assembly

| key | value |
|---|---|
| id | PIPELINE-card-assembly |
| type | governance |
| era | atlas |
| version | 3.4.0 |
| owner | derick |
| updated | 2026-05-16 |

The dynamic assembly pipeline. PRINCIPLES says *what we're doing*; GRAMMAR says *how to assemble blocks*; this doc says *how to get from a request to a finished card* — research, the intermediate breakdown, mode-driven adaptation, and the published render. This is the **operational manual**; `agent-guide` is a thin router that points here for the build sequence.

---

## The shape of the pipeline

```
Request → Mode → Check research store → Deep research → Breakdown MD
        → Supercard MD → Render → Publish
```

Three durable artifacts:

1. **`BREAKDOWN-{slug}.md`** — the full uncompressed deep-research report. All research, all content, organized by the 7 beats, sources inline and rated, **no length budget**. The source of truth. Lives in **`60-RESEARCH/`** and is registered in `60-RESEARCH/INDEX-research-reports.md` (ADR-0006).
2. **`CARD-{YYYY-MM-DD}-{slug}--draft.md`** — the Supercard. A constrained *view* of the breakdown, shaped by the mode. Lives in `30-CARDS/`. Its frontmatter records the `research_report` it descends from.
3. **`docs/cards/CARD-{YYYY-MM-DD}-{slug}.html`** — the rendered, published HTML. Produced on **every** request, not optionally (ADR-0007), and listed in the `docs/index.html` gallery so it can be viewed online.

**The card is a view, not the source.** The breakdown holds everything; the card applies the mode's constraints to it. Re-run the conversion with a different mode and you get a different card from the same research — the breakdown is the asset, cards are views of it (PRINCIPLES 10, genealogy-as-asset).

## Modes — the adaptability dimension

A **mode** is the *intent* of the request. It is not a length — it *biases* research depth, length variant, block selection, and how hard the redundancy filter runs. The four below are the V3.0 set; the system is extensible — add a mode when a request shape recurs that none of these serve.

| Mode | Intent | Research depth | Length bias | Block bias | Redundancy posture |
|---|---|---|---|---|---|
| `summary` | "Give me the gist." Reductive quick breakdown of an event, book, or concept. | Light | Mini (5–8), sometimes Standard | key-takeaway, stat-callout, definition, checklist | Aggressive — cut anything not load-bearing |
| `briefing` | "Give me a complete, balanced understanding." The default. | Moderate | Standard (10–14) | Full 7-beat, ~one block per beat | Standard |
| `deep-dive` | "I want to fully understand this." Exhaustive but never repetitive. | Heavy | XL (18–25) or multi-part | All beats multi-block; Comparison + Counter mandatory | Hardest — length comes from breadth of distinct content, never restatement |
| `reference` | "Something I'll return to and navigate." | Heavy | XL or multi-part | table, FAQ, numbered-principle, section-divider, definition | Standard, but parallel structural repetition is allowed where it aids navigation |

**On `deep-dive` and length.** GRAMMAR caps a single card at 25 blocks. `deep-dive` is the mode most likely to exceed that — when it does, **split into a multi-part series** (`CARD-...-part-1`, `-part-2`) sharing one breakdown. A longer card is never an excuse for a repetitive one: the defining property of `deep-dive` is *full understanding without redundancy or restatement*.

**Inferring the mode.** If the user doesn't name one, infer it from the request verb:

- "summarize / TL;DR / quick / gist" → `summary`
- "explain / brief me / break down" → `briefing`
- "deep dive / fully understand / master / everything about" → `deep-dive`
- "reference / cheat sheet / I'll come back to this" → `reference`

State the chosen mode back to the user in one line before proceeding.

## Stage 0 — Parse the request

- **Do.** Identify the topic. Identify the mode (named or inferred from the request verb table above). Identify the source posture (user-supplied sources vs. research from scratch). Confirm the mode back to the user in one line before proceeding.
- **Produce.** A one-line confirmation: `Mode → {mode}; topic → {topic}; source posture → {user-supplied | research-from-scratch}.`
- **Check.** Mode names exactly one of `summary | briefing | deep-dive | reference`. Topic is concrete enough to research (not "AI" but "transformer attention masking").
- **Layers consulted.** `pipeline` (this doc).

## Stage 1 — Check the research store, then research

- **Do.** Grep `60-RESEARCH/INDEX-research-reports.md` for the topic. If a report exists and is sufficient, skip to Stage 3 under the requested mode. If it exists but needs more, open an extending pass (set `status` to `extending`, add research, return to `active`). Otherwise, research from scratch — depth scales with mode (Light / Moderate / Heavy per the modes table).
- **Produce.** Either a re-use decision (point at the existing report) or a fresh source set: user-supplied sources first, then web research, then prior `60-RESEARCH/` reports and `30-CARDS/` / `90-ARCHIVE/` cards. Every fact carries its source **and its confidence**.
- **Check.** Registry searched before any new research begins. Unsourced claims are flagged and not allowed to leave this stage. Confidence assigned to every fact.
- **Layers consulted.** `pipeline`.

## Stage 2 — The breakdown MD (the deep research report)

- **Do.** Produce `BREAKDOWN-{slug}.md` in **`60-RESEARCH/`** from `TEMPLATE-breakdown` (ADR-0006). Fill §0 research brief, §1 research log, §2 executive synthesis, then the 7 beats (Hook, Evidence, Mechanism, Comparison, Counter, Application, Close). Under each beat, dump **all** relevant content — every fact, stat, quote, mechanism, counter-argument — with sources inline as `[S#]` and confidence flagged where it is not high. Complete the research apparatus: Source register (every source rated for reliability), Key quotes bank, Numbers & data bank, Contested claims, Open questions & gaps, Confidence assessment.
- **Produce.** `60-RESEARCH/BREAKDOWN-{slug}.md` (no length budget) and a new or updated row in `60-RESEARCH/INDEX-research-reports.md`.
- **Check.** No length budget. Maximize completeness. If a fact is not in the report, it cannot reach a card. Registry row matches the file. The breakdown's frontmatter passes the frontmatter schema below.
- **Layers consulted.** `pipeline`.

## Stage 3 — Convert breakdown → Supercard MD

The conversion is **lossy by design** — the breakdown holds everything, the card holds what the mode admits. `summary` drops most of the breakdown; `deep-dive` admits nearly all of it, across multiple cards if needed.

- **Do.** For each beat, for each unit of content: run the **GRAMMAR block selection procedure** (decision tree with precedence, density budget, prose rules, lifecycle filter — see `GRAMMAR § Block selection procedure`). Apply the mode's length bias to decide how many blocks survive per beat. Author each block with single emphasis (one bolded lead-clause).
- **Produce.** `30-CARDS/CARD-{YYYY-MM-DD}-{slug}--draft.md` (or `-part-N` for a multi-part `deep-dive`), from the matching `TEMPLATE-supercard-*`. Frontmatter sets `research_report` to the breakdown it descends from. The breakdown's **card derivation log** gets a new entry (admitted / dropped / why).
- **Check.** Card's frontmatter passes the frontmatter schema below. Card's block count sits inside the mode's length budget. Conversion ratios (below) are within tolerance for the chosen mode.
- **Layers consulted.** `grammar`, `lengths`, `blocks`.

**Stage 3 quantitative anchors — what conversion ratios each mode targets.** These are not soft suggestions; they are the convergence target an agent should aim for and re-mix toward when out of band.

| Mode | Beats admitted (of 7) | Blocks per admitted beat | Total blocks | % of breakdown beats kept | % of breakdown facts kept |
|---|---|---|---|---|---|
| `summary` | 5 (Hook, Evidence, Mechanism, Application, Close) | ≈ 1.2 | 5–8 (Mini) | ≈ 70% | ≈ 20–30% |
| `briefing` | 7 (all) | ≈ 1.6 | 10–14 (Standard) | 100% | ≈ 50% |
| `deep-dive` | 7 (all) | ≈ 3.0 | 18–25 (XL) | 100% | ≈ 85% (split to multi-part if higher) |
| `reference` | 7 (all) | ≈ 3.0 | 18–25 (XL) | 100% | ≈ 70%, organized for return-and-navigate (table, FAQ, numbered-principle) |

The "facts kept" column is approximate — what matters is monotone progression across modes (`summary < briefing < deep-dive`). If your `summary` admits more than ~30% of breakdown facts, the redundancy filter is not running hard enough; re-mix. If your `deep-dive` admits less than ~80%, you are compressing — either split into multi-part or relax the cut.

## Stage 4 — Constraint gates and identity invariants

- **Do.** Run the 9 constraint gates (G1–G9) below at draft completion. Then verify the 8 identity invariants (I1–I8) hold. Re-run any failed gate after a fix; restart from the violated layer if any invariant is broken.
- **Produce.** A gate-results table (`id`, `result`, `note`) and an invariant-check confirmation. Both attach to the card's `Authoring notes`.
- **Check.** Every gate returns pass. Every invariant holds.
- **Layers consulted.** `principles`, `grammar`, `lengths`, `rendering`.

Two categories of check, both must pass. **Gates** are binary pass/fail rules an agent runs at draft completion. **Identity invariants** are always-on properties that define what *is* and *is not* a Supercard — they don't get "run," they get violated or not.

### Constraint gates (binary pass/fail, run at draft completion)

| id | Gate | Rule | Source |
|---|---|---|---|
| G1 | Length budget | Block count within the mode's variant (Mini 5–8 / Standard 10–14 / XL 18–25) | GRAMMAR length budgets, LENGTHS |
| G2 | Single emphasis | Exactly one emphasized phrase per block | PRINCIPLES 2 |
| G3 | Loft budget | 1–3 elevated elements per Supercard; hero is one | PRINCIPLES 4, GRAMMAR |
| G4 | Redundancy filter | Run at the mode's posture; hardest in `deep-dive` | PRINCIPLES 9 |
| G5 | Screenshot test | Five questions on every section, including the header | GRAMMAR pre-publication test |
| G6 | Frozen-at-version | Frontmatter declares `frozen_at_version` | ADR-0003 |
| G7 | Density budget (V3.1+) | Anchor-to-content ratio per beat between 1:2 and 1:4; ≤ 2 same-type consecutive anchors; ≤ 4 consecutive content blocks | GRAMMAR § G-9 |
| G8 | ADHD scan-ability gate (V3.1+) | The 10-item Y/N checklist in PRINCIPLES; any "no" blocks the render. V3.4+ cards run the twelve-question form. | PRINCIPLES § ADHD gate |
| G9 | Readability gate (V3.4+) | Computes Flesch–Kincaid grade level and Flesch Reading Ease across every prose block. Fails when grade level exceeds 9 on more than 30% of prose blocks or when reading ease drops below 60 on any single block. | GRAMMAR § G-13, PRINCIPLES 13 |

### Identity invariants (always on; not "passed" — held)

| id | Invariant | Source |
|---|---|---|
| I1 | Screenshot autonomy — every visible region conveys one complete idea on its own | PRINCIPLES 1 |
| I2 | Strict grayscale — black, white, and the six-step gray ramp; no color, ever | PRINCIPLES 5 |
| I3 | SF Pro Rounded canonical typeface; SF Mono for code and equations | PRINCIPLES 6 |
| I4 | Rendered card never shows the `Beat N` index or `BLOCK-*` ids. Beat names may appear only as the optional editorial eyebrow permitted by R-10 (V3.3) — never with a position counter | RENDERING output contract |
| I5 | Format-as-grammar, not length — Mini / Standard / XL are presentation variants of one grammar | PRINCIPLES 3 |
| I6 | Genealogy-as-asset — every card declares `version`, `frozen_at_version`, `research_report` | PRINCIPLES 10, ADR-0003, ADR-0006 |
| I7 | No scaffold leakage — the author's production structure (beats, block IDs, render metadata, version strings) does not appear in the reader's view. Renderer chrome that exists to help the author is not part of the rendered card | RENDERING § R-10 (V3.3) |
| I8 | Plain-language readability (V3.4+) — every prose block in a V3.4+ card targets Flesch–Kincaid grade ≤ 9 and Flesch Reading Ease ≥ 60. The validator enforces this with a warning at the per-block level and an error at the per-card level (two warnings escalate). Inherits from PRINCIPLES 13. | PRINCIPLES 13, GRAMMAR § G-13 |

Any gate failure → fix, then re-run the gate. Any invariant violation → the artifact is by definition not a Supercard; restart from the violated layer.

## Stage 5 — Render and publish (mandatory)

Rendering is **not optional** (ADR-0007). Every card request produces a published HTML view — the user always gets the visual artifact, not just its markdown source.

- **Do.** Render per `RENDERING-spec`: standalone HTML, 393pt mobile canvas, corner glyph on every section, all resources inlined. Embed the `<meta>` provenance (see frontmatter schema below — render frontmatter). Add an entry to `docs/index.html` (newest at top) linking the new render. Commit the breakdown, the card, the registry update, and the `docs/` changes; push **directly to `main`** (no feature branch, no PR; see `CLAUDE.md`).
- **Produce.** `docs/cards/CARD-{YYYY-MM-DD}-{slug}.html`, a gallery entry in `docs/index.html`, a push to `main`.
- **Check.** Standalone HTML opens with no network. `<meta name="sc:frozen_at_version">` matches the card's `frozen_at_version`. The card's URL resolves on the live deployment.
- **Layers consulted.** `rendering`, `tokens`.

The markdown card stays the canonical, frozen-at-version source (ADR-0003); the HTML is a *view* of it — regenerated, never hand-edited.

## Frontmatter contract — BREAKDOWN and CARD and RENDER

Frontmatter is how the genealogy stays navigable. Every breakdown, card, and render carries the fields below. This is one contract, published in one place — agents do not need to reconstruct it across multiple docs.

### `BREAKDOWN-{slug}.md` frontmatter (in `60-RESEARCH/`)

| Field | Required | Source / form | Notes |
|---|---|---|---|
| `id` | ✓ | `BREAKDOWN-{slug}` | Matches filename. |
| `type` | ✓ | `breakdown` | Constant. |
| `topic` | ✓ | free text | The plain-English topic, one phrase. |
| `slug` | ✓ | kebab-case | Used to derive `id` and card filenames. |
| `era` | ✓ | `atlas` | Era name (ADR-0001). |
| `owner` | ✓ | author handle | One person. |
| `created` | ✓ | `YYYY-MM-DD` | First write. |
| `updated` | ✓ | `YYYY-MM-DD` | Stamp on every extend-pass. |
| `status` | ✓ | one of `active`, `extending`, `superseded` | `extending` is the lock during a re-research pass. |
| `modes_derived` | ✓ | csv of mode names | Which modes have produced a card from this report. |
| `derived_cards` | ✓ | csv of CARD ids | Closes the loop — every card descended from this report. |
| `source_count` | ✓ | integer | Source register row count. |
| `confidence` | ✓ | one of `high`, `mixed`, `low` | Aggregate of §Confidence assessment. |
| `supersedes` |  | id | Set when this extends an earlier report. |
| `related_reports` |  | csv of ids | Adjacent topics. |

### `CARD-{YYYY-MM-DD}-{slug}--{status}.md` frontmatter (in `30-CARDS/`)

| Field | Required | Source / form | Notes |
|---|---|---|---|
| `id` | ✓ | `CARD-{YYYY-MM-DD}-{slug}` | Matches filename minus the `--{status}` suffix. |
| `type` | ✓ | `card` | Constant. |
| `length` | ✓ | one of `mini`, `standard`, `xl` | Drives the template; must match the block count budget. |
| `era` | ✓ | `atlas` | Era name. |
| `version` | ✓ | SemVer | Spec version this card was authored against. |
| `frozen_at_version` | ✓ | SemVer | Render-time rule library; renderer applies *this* version's rules forever (ADR-0003). |
| `lifecycle` | ✓ | one of `core`, `stable`, `experimental`, `deprecated` | Card-level lifecycle. |
| `owner` | ✓ | author handle | One person. |
| `created` | ✓ | `YYYY-MM-DD` | First write. |
| `status` | ✓ | one of `draft`, `published`, `archived` | Mirrors the filename `--{status}` suffix. |
| `research_report` | ✓ | path to `60-RESEARCH/BREAKDOWN-{slug}.md` | The breakdown this card descends from (ADR-0006). |
| `render` | ✓ | path to `docs/cards/{id}.html` | The published render. |
| `tags` |  | csv | Topic tags for the gallery. |
| `supersedes` |  | id | Set when this replaces an earlier card. |
| `related` |  | csv of ids | Adjacent cards. |
| `source_file` | rendered | path | Filled by the renderer into HTML `<meta>`. |
| `renderer_version` | rendered | SemVer | Filled by the renderer. |
| `rendered_at` | rendered | ISO datetime | Filled by the renderer. |
| `source_commit` | rendered | sha | Filled when available. |
| `content_hash` | rendered | sha256 | Filled when available. |

### Render `<meta>` block (in HTML `<head>`)

Every published HTML render embeds the rendering provenance as `<meta>` tags. These are the `sc:`-prefixed names referenced by `RENDERING § Output contract`:

| Meta name | Source field | Required |
|---|---|---|
| `sc:source_file` | card's `source_file` (the markdown path) | ✓ |
| `sc:research_report` | card's `research_report` | ✓ |
| `sc:renderer_version` | renderer's own version | ✓ |
| `sc:frozen_at_version` | card's `frozen_at_version` | ✓ |
| `sc:rendered_at` | render-time ISO datetime | ✓ |
| `sc:source_commit` | git sha at render time |  |
| `sc:content_hash` | sha256 of the markdown card | |

Together: the breakdown's frontmatter is the genealogy *root*, the card's frontmatter points back at it, and the render's `<meta>` closes the loop pointing back through both. An agent reading any of the three artifacts can navigate to the others.

## What you end up with

- `60-RESEARCH/BREAKDOWN-{slug}.md` — the deep research report, kept and registered.
- `60-RESEARCH/INDEX-research-reports.md` — registry row updated.
- `30-CARDS/CARD-{date}-{slug}--draft.md` (or `-part-N`) — the card(s).
- `docs/cards/CARD-{date}-{slug}.html` — the published render, in the gallery, viewable online.

Same research, re-runnable: change the mode, re-run Stages 3–5, get a different card and render from the same report. The breakdown is the asset; cards are views; renders are how the views are seen.
