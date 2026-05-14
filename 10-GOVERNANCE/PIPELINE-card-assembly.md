# PIPELINE — Card Assembly

| key | value |
|---|---|
| id | PIPELINE-card-assembly |
| type | governance |
| era | atlas |
| version | 3.0.0 |
| owner | derick |
| updated | 2026-05-14 |

The dynamic assembly pipeline. PRINCIPLES says *what we're doing*; GRAMMAR says *how to assemble blocks*; this doc says *how to get from a request to a finished card* — research, the intermediate breakdown, mode-driven adaptation, and the published render.

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

- Identify the **topic** and the **mode** (named or inferred).
- Identify the **source posture**: does the user supply sources, or should the pipeline research from scratch?
- Confirm the mode with the user in one line.

## Stage 1 — Check the research store, then research

**First, check for an existing report.** Grep `60-RESEARCH/INDEX-research-reports.md` for the topic (ADR-0006). If a report already covers it:

- **Extend or re-view it** — never re-research from scratch. Research is the most expensive step; silent duplication is the costliest failure.
- If the existing report is sufficient, skip to Stage 3 and derive a new card from it under the requested mode.
- If it needs more, open an extending pass: set the report's `status` to `extending`, add the new research, then return its `status` to `active`.

**Otherwise, research.** Always research first — even in `summary` mode. `summary` means a reductive *output*, not a shallow *input*.

- Gather in order: user-supplied sources first, then web research, then prior `60-RESEARCH/` reports and `30-CARDS/` / `90-ARCHIVE/` cards.
- Depth scales with mode (see table), but the floor is always: enough to be correct and to hold a defensible position.
- Every fact carries its source **and its confidence**. Unsourced claims do not survive to the breakdown.

## Stage 2 — The breakdown MD (the deep research report)

Produce `BREAKDOWN-{slug}.md` in **`60-RESEARCH/`** from `TEMPLATE-breakdown` (ADR-0006). This is the full deep-research report — uncompressed, and the most valuable durable artifact in the system.

- Fill the **research brief** (§0) and **research log** (§1) so the methodology is inspectable and a later pass can extend it.
- Organize the body by the 7 beats: Hook, Evidence, Mechanism, Comparison, Counter, Application, Close. Under each beat, dump **all** relevant content — every fact, stat, quote, mechanism, counter-argument — with sources inline as `[S#]` and confidence flagged where it is not high.
- Complete the **research apparatus**: Source register (every source rated for reliability), Key quotes bank, Numbers & data bank, Contested claims, Open questions & gaps, Confidence assessment.
- **No length budget. Maximize completeness.** No block decisions yet. This is the superset every card — and every drafting agent — draws from. If a fact is not in the report, it cannot reach a card. When in doubt, include it.
- **Register it.** Add or update the report's row in `60-RESEARCH/INDEX-research-reports.md`. The registry and the breakdowns must agree.
- This artifact is the genealogy: it is *why* the card says what it says.

## Stage 3 — Convert breakdown → Supercard MD

This is where blocks get fetched. For each beat, for each unit of content:

1. Run the **GRAMMAR decision tree** (shape-first, text last) → block type.
2. Confirm the block supports the target length variant — check `length_variants` in `INDEX-block-library`.
3. Confirm **lifecycle**: Core/Stable only, unless the user explicitly asked for Experimental.
4. Apply the **mode's length bias** to decide how many blocks survive per beat.
5. Author each block with **single emphasis** (one bold phrase).

The conversion is **lossy by design** — the breakdown holds everything, the card holds what the mode admits. `summary` drops most of the breakdown; `deep-dive` admits nearly all of it, across multiple cards if needed.

Write the result to `30-CARDS/CARD-{YYYY-MM-DD}-{slug}--draft.md` (or `-part-N` for a multi-part `deep-dive`), from the matching `TEMPLATE-supercard-*`. Set the card's `research_report` frontmatter to the breakdown it descends from, and append a **card derivation log** entry to that breakdown (what was admitted, what was dropped, why) — so the genealogy is navigable from both ends.

## Stage 4 — Constraint gates

Before the card is done, every gate must pass. Any failure → fix, then re-run the gate.

| Gate | Rule | Source |
|---|---|---|
| Length budget | Block count within the mode's variant | GRAMMAR length budgets |
| Single emphasis | Exactly one emphasized phrase per block | PRINCIPLES 2 |
| Loft budget | 1–3 elevated elements; hero is one | PRINCIPLES 4, GRAMMAR |
| Redundancy filter | Run at the mode's posture; hardest in `deep-dive` | PRINCIPLES 9 |
| Screenshot test | Five questions on every section, including the header | GRAMMAR |
| Grayscale + type | Strict gray ramp, SF Pro Rounded stack | PRINCIPLES 5–6, RENDERING |
| Frozen-at-version | Frontmatter declares `frozen_at_version` | ADR-0003 |

## Stage 5 — Render and publish (mandatory)

Rendering is **not optional** (ADR-0007). Every card request produces a published HTML view — the user always gets the visual artifact, not just its markdown source.

1. **Render** per `RENDERING-spec`: standalone HTML, 393pt mobile canvas, corner glyph on every section, all resources inlined. Write it to `docs/cards/CARD-{YYYY-MM-DD}-{slug}.html`. Embed the `<meta>` provenance — `source_file`, `research_report`, `renderer_version`, `frozen_at_version`, `rendered_at`.
2. **Publish to the gallery.** Add an entry to `docs/index.html` (newest at top) linking the new render.
3. **Push.** Commit the breakdown, the card, the registry update, and the `docs/` changes, then push. `docs/` is served as the pages site — the card is now a live URL. This is the "view it online" step.

The markdown card stays the canonical, frozen-at-version source (ADR-0003); the HTML is a *view* of it — regenerated, never hand-edited.

## What you end up with

- `60-RESEARCH/BREAKDOWN-{slug}.md` — the deep research report, kept and registered.
- `60-RESEARCH/INDEX-research-reports.md` — registry row updated.
- `30-CARDS/CARD-{date}-{slug}--draft.md` (or `-part-N`) — the card(s).
- `docs/cards/CARD-{date}-{slug}.html` — the published render, in the gallery, viewable online.

Same research, re-runnable: change the mode, re-run Stages 3–5, get a different card and render from the same report. The breakdown is the asset; cards are views; renders are how the views are seen.
