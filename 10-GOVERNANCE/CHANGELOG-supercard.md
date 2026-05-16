# CHANGELOG — Supercard

| key | value |
|---|---|
| id | CHANGELOG-supercard |
| type | governance |
| era | atlas |
| version | 3.2.0 |
| owner | derick |
| updated | 2026-05-16 |

All notable changes to the Supercard system. Format adapted from Keep a Changelog 1.1.0. Versioning: SemVer with named eras.

---

## [Unreleased]

---

## [3.2.0] — "Atlas" — 2026-05-16

Reorganization for agent legibility. V3.2 is a pure restructure of how the
canonical markdown surfaces through `docs/spec/`: no new authoring rules, no
new blocks, no changed render output. V3.1 cards keep V3.1 rules (ADR-0003).
The work is sourced from a spec-audit pass on the V3.1 public spec and lands
as ADR-0008.

### Added

- `10-GOVERNANCE/GLOSSARY-supercard.md` — single-place definitions of every term that appears across multiple layers (loft, anchor block, content block, hero, micro-folio, corner glyph, asterism rest, lead-clause, dek, eyebrow, thought-group, frozen-at-version, breakdown vs card vs render)
- `10-GOVERNANCE/EXAMPLE-mini-supercard.md` — one inline worked Mini-mode build, end to end: topic → mode inference → breakdown excerpt → 6-block selection (with the procedure walked numerically per beat) → constraint-gate results → frontmatter → 5 lines of rendered HTML scaffolding
- New `structural` block family — `BLOCK-section-divider`, `BLOCK-footnote-source`, `BLOCK-loft-card`, `BLOCK-asterism-rest` move out of `editorial` to align family with the decision tree's routing (option (b) from the V3.2 audit)
- `BLOCK-column-chart`, `BLOCK-bullet-chart` re-homed from `editorial` to `comparative`; `BLOCK-area-chart` re-homed from `editorial` to `sequential`
- PIPELINE — explicit Stage 0–5 structured content with `Do / Produce / Check / Layers consulted` per stage (so `pipeline.stages` carries the substantive content, not just stage names)
- PIPELINE — Stage 3 quantitative anchors: per-mode conversion ratios (beats admitted, blocks per beat, % facts kept) so an agent has a target to converge on
- PIPELINE — Frontmatter contract: full schemas for `BREAKDOWN-{slug}.md`, `CARD-{date}-{slug}.md`, and the render-time `<meta>` block, in one place
- PIPELINE — Constraint gates and identity invariants split: 8 gates (binary pass/fail at draft completion) vs. 6 invariants (always-on identity properties)
- GRAMMAR — Single composed `Block selection procedure` (10 steps walking the decision tree, precedence, density budget, prose rules, anti-patterns, gates) with a numeric worked example referenced
- GRAMMAR — Decision tree precedence: explicit numeric → comparative → sequential → distributional → definitional → editorial structural → editorial prose order, plus enumerated overrides for ambiguous cases (list-of-don'ts, dated stat, principle vs. checklist, quote routing, small-table → key-takeaway)
- GRAMMAR — V3.1 additive rules (G-7–G-11) woven into the decision tree itself, not appended after it
- INDEX-block-library — `rules_by_version` field on every affected block entry so `blocks.json` carries its own rule cross-reference
- Layer titles updated to verb-first / task-first (e.g. "Render tokens" → "Style values to render any block", "Grammar" → "Pick a block and compose the card")
- ADR-0008 — Spec organized for agent legibility (3.2.0)

### Changed

- `agent-guide` layer collapsed to a thin router (≤ 1 screen of structured content): disclosure protocol, task routing keyed by goal, pointer to `pipeline` for the build sequence, pointer to `glossary` for terms, pointer to `example` for a worked walk. The substantive Stage 0–5 detail lives in `pipeline.stages` now
- `index.start_here` reduced to `["agent-guide"]` (drop `principles`, `grammar`) — the agent-guide routes from there. `principles` is the identity-audit reference and is reached via `task_routing["judge whether something is a valid Supercard"]`, not as required reading for a build
- Block count settled at **39** across **7 families** (was inconsistently reported as 38/39 across blocks.json count vs. summary)
- `non_negotiables` array removed from `agent-guide` — its content merged into PIPELINE's constraint gates (G1–G8) and identity invariants (I1–I6) so there is one canonical list

### Considered & rejected

- Re-homing each editorial-misclassified block individually without introducing a `structural` family (option (a) from the audit). Rejected — `structural` is a load-bearing concept (furniture, not content) and giving it a family makes that legible in the family routing
- Killing the `agent-guide` layer entirely and routing from `index` directly into `pipeline`. Rejected — the disclosure-protocol guidance and task routing are layer-shaped work; collapsing them into a manifest would bloat the manifest and lose the per-task layer maps

---
- RENDERING § R-12 — Two new error triggers (label > 4 words; context-chip strip of ≥ 3 orphan chips) and one new warning (label kind appearing inconsistently across comparable sections), all sourced from R-14
- GRAMMAR — Five new anti-patterns mirroring R-14 (over-long labels, balance-only labels, context-chip strips, nested labels, inconsistent labeling across comparable sections)
- RENDERING § R-13 — Cover discipline (V3.1+): the cover permits exactly four elements (top-edge micro-folio, title, dek, hero) and pins their five spacing joins (16 / 32 / 12 / 24 / 48pt). Forbidden anti-patterns enumerated explicitly: running brand-mark folios (`SC · BRIEFING · 1 / 7`-style), mode badges, date eyebrows, context-chip strips, second eyebrows restating the micro-folio's beat name
- RENDERING § R-10 — Strengthened: the top-edge micro-folio replaces the section eyebrow on a beat's first block (the folio already names the beat, with position — restating it 12pt below is duplication). Sole-tenancy at the top edge re-declared
- RENDERING § R-12 — Two new error triggers (cover header outside R-13; section eyebrow duplicating the micro-folio) and one new warning (cover spacing departing from R-13 by > 4pt)
- GRAMMAR — Two new anti-patterns mirroring R-13 / R-10 (cover header drift; first-block eyebrow duplicating the folio)

### Considered & rejected

- Adding a "mode badge" slot to the cover (one of `BRIEFING` / `DEEP-DIVE` / `REFERENCE`). Rejected — mode is already carried by the corner glyph and the URL; a third surface restates identity instead of adding meaning, and the cover already has the dek to carry timeliness or scope
- Restricting R-14 to V3.1+ cover-only (i.e. just renaming R-13). Rejected — the same label-justification failure shows up mid-card too (eyebrows duplicating folios, kickers paraphrasing titles, chip strips below stat callouts). R-13 stays as the cover specialization; R-14 covers the rest of the canvas with one rule

---

## [3.1.0] — "Atlas" — 2026-05-15

Two bodies of work ship together in V3.1: the dynamic card-assembly pipeline (research → breakdown → card → render → publish) and the ADHD scan-ability pass that translates the cognitive-prosthesis framing into concrete authoring and rendering rules. Both are additive under frozen-at-version (ADR-0003) — V3.0 cards keep V3.0 rules; only cards declaring `frozen_at_version: 3.1.0` opt in.

### Added — pipeline and research store

- PIPELINE doc — the dynamic card assembly pipeline (research → breakdown → card) with four request modes: summary, briefing, deep-dive, reference
- `TEMPLATE-breakdown` — the uncompressed-report intermediate artifact
- `supercard` Claude Code skill — runs the assembly pipeline end to end
- ADR-0006 — dedicated research-report store: `60-RESEARCH/` folder + `INDEX-research-reports` registry. Breakdowns move out of `40-LAB/`; the pipeline checks the registry before researching, so a topic is never researched twice
- ADR-0007 — render and publish by default: every card request renders to `docs/cards/` and is listed in the `docs/index.html` gallery; "view it online" is now a pipeline deliverable, not an optional last step
- `60-RESEARCH/` — the research store, with `README`, the registry, and a worked-example `BREAKDOWN-spaced-repetition` (the genealogy of the sample card)
- `docs/` restructured into a published-pages site — gallery `index.html` + `cards/` subfolder + `docs/README.md`

### Added — ADHD scan-ability rules

- PRINCIPLES #11 — Cognitive prosthesis, made operational: four MUST rules (4-second block scan, beat re-entry, screenshot beat-identity, bolded lead-clause)
- PRINCIPLES #12 — First-pass extraction test: bold-only read must yield the card's thesis
- PRINCIPLES — The ADHD scan-ability gate (10-item Y/N checklist, runs alongside the screenshot test)
- GRAMMAR § G-7 — Bolded lead-clause required on every prose block (`standard-text`, `faq`, `code` via gloss); single-emphasis discipline unchanged
- GRAMMAR § G-8 — Thought-group ramp inside prose: 75-word and 4-sentence cap on `standard-text`; 8pt between thought-groups, 16pt between sub-paragraphs
- GRAMMAR § G-9 — Density budget per beat: anchor-to-content ratio between 1:2 and 1:4; no more than 2 consecutive same-type anchors; no more than 4 consecutive content blocks
- GRAMMAR § G-10 — Mid-beat asterism rest (⁂, U+2042): mandatory after every 4 blocks in beats of ≥ 5 blocks; 32pt vertical bands
- GRAMMAR § G-11 — Table takeaway-row required for tables with ≥ 4 data rows; takeaway-bearing tables count as anchor blocks
- GRAMMAR — 10 new anti-patterns (italics-for-emphasis, all-caps body, justified text, multi-bold, deep-whitespace breaks, etc.)
- RENDERING § R-9 — V3.1 type metrics: body leading 26pt (was 24pt; meets WCAG 2.2 SC 1.4.12), letter-spacing +0.5pt, word-spacing +0.06em, ragged-right, italics-only-for-titles/foreign-terms, weights restricted to 400/500/700 in body
- RENDERING § R-10 — Beat micro-folio at top and bottom edges of every card: `BEAT N · NAME · n / total`, 11pt small-caps, tabular-nums, 60% gray
- RENDERING § R-11 — Asterism rendering contract
- RENDERING § R-12 — Validator contract: `npm --prefix app run validate` checks V3.1+ cards; errors on multi-bold, missing lead-clause, missing takeaway row; warns on word/sentence overrun, beat density violations, anchor:content ratio
- LENGTHS § L-5 — Per-length anchor budgets: Mini 2–3 anchors, Standard 3–5, XL 5–8; XL requires 2–4 asterism rests; Mini forbids asterisms
- LENGTHS § L-6 — Beat anchor weighting: Hook and Close anchor-first, Mechanism may tolerate prose, Counter requires a pull-quote or key-takeaway
- INDEX-block-library — register `BLOCK-asterism-rest` (core, V3.1.0, standard+xl); per-block V3.1 rules section for `standard-text`, `stat-callout`, `pull-quote`, `table`, `code`

### Changed

- `TEMPLATE-breakdown` rewritten as an extensive deep-research-report spec: research brief, research log, executive synthesis, the 7 beats, and a full research apparatus (source register with reliability ratings, key quotes bank, numbers & data bank, contested claims, open questions, confidence assessment, card derivation log)
- PIPELINE, RENDERING-spec, the `supercard` skill, INDEX, README, `00-SETUP`, and the `40-LAB/` / `30-CARDS/` READMEs updated to the `60-RESEARCH/` store and the mandatory render-and-publish stage
- Card templates and the sample card now carry `research_report` and `render` frontmatter, making the `research → breakdown → card → render` genealogy navigable from either end
- Card templates (`TEMPLATE-supercard-{mini,standard,xl}.md`) updated to model the new authoring rules; default `frozen_at_version` bumps to 3.1.0 for new cards
- App rendering (`app/src/supercard.css`, `app/src/blocks.tsx`) gains `<Asterism />`, `<MicroFolio />`, lead-clause-aware `<StandardText>`, takeaway-row-aware `<DataTable>`; CSS adds the V3.1 type metrics
- Validator script (`app/scripts/validate-v3-1.mjs`) wired into `npm --prefix app run validate`

### Stewards' note

V3.1 is the first MINOR bump on V3.0. It's additive — no V3.0 card breaks. Existing draft cards in `30-CARDS/` stay at `frozen_at_version: 3.0.0` and render under V3.0 rules; new cards opt into V3.1 by declaring it in their frontmatter. The boundary is enforced by the renderer's versioned rule library.

---

## [3.0.0] — "Atlas" — 2026-04-29

Initial V3 release. Generational rebrand from V2.

### Added

- PRINCIPLES doc — 10 cognitive-prosthesis principles
- GRAMMAR doc — block composition rules, decision tree, screenshot test
- LENGTHS doc — Mini / Standard / XL spec
- RENDERING doc — type scale, gray ramp, shadow tokens, frozen-at-authored-version
- Block library: 38 variants across 6 families (Numeric, Comparative, Sequential, Definitional, Distributional, Editorial)
- Four-tier lifecycle: Core / Stable / Experimental / Deprecated
- Card-in-hero header pattern (Postcard inheritance)
- Loft shadow system (flat / subtle / lofted) with 1–3 elevated elements cap
- SF Pro Rounded as primary typeface, SF Mono for code/equations
- Strict grayscale six-step ramp (0%, 6%, 12%, 30%, 60%, 100%)
- Repository-resident governance: ADRs, stewards' log, RFCs, CHANGELOG
- SupercardOps tooling (template generation, validators, archival, indexing)
- GitHub Actions + Pandoc rendering pipeline (planned, not yet built)
- Screenshot test as publication gate

### Removed (from V2)

- Multi-emphasis-per-block discipline failure
- Long-form prose drift
- Pronoun-first sentences breaking screenshot autonomy
- Variable section structure between blocks
- Color accents
- Card chrome on every block

### Migration

- All V1 cards moved to `90-ARCHIVE/2024-V1/` with `--archived` suffix
- All V2 cards moved to `90-ARCHIVE/2025-V2/` with `--archived` suffix
- Frozen-at-authored-version policy means V1 and V2 cards remain valid in their own era; V3 does not retroactively reformat them

### Stewards' note

This is the foundational era. Every block in V3.0 is provisional in the sense that the system has only existed for one revision — expect early MINOR bumps as we learn what's missing.
