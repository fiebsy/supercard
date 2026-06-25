# CHANGELOG — Supercard

| key | value |
|---|---|
| id | CHANGELOG-supercard |
| type | governance |
| era | atlas |
| version | 3.5.0 |
| owner | derick |
| updated | 2026-06-25 |

All notable changes to the Supercard system. Format adapted from Keep a Changelog 1.1.0. Versioning: SemVer with named eras.

---

## [Unreleased]

---

## [3.5.0] — "Atlas" — 2026-06-25

Reading-layer refinement. Three new rendering rules tighten how prose is set,
inked, and sized, validated against Apple's SF Pro tracking table, WCAG 2.2
SC 1.4.3 / 1.4.12, Vignelli, Müller-Brockmann, Butterick, Bringhurst, and
NN/g. Backwards-compatible: every V3.0–V3.4 card renders identically. New
constraints apply only to cards declaring `frozen_at_version: 3.5.0`.
Strict grayscale (P5) and SF Pro Rounded (P6) are unchanged — no color.

### Added

- RENDERING § R-19 — Body type metrics (V3.5+). Supersedes R-9. Body renders at 17/26 with letter-spacing **−0.01em** and **word-spacing normal**; the positive lowercase tracking R-9 introduced is retired (it breaks word-shape recognition — Goudy / Spiekermann / Butterick). 26pt leading is kept (1.53, above the WCAG 1.5 floor). The eyebrow (+0.08em, UPPERCASE) is the only positively-tracked role.
- RENDERING § R-20 — Text-ink ladder (V3.5+). A 3-step text family that clears the contrast floor: `--ink` #1A1A1A (≈17.6:1), `--ink-2` #595959 (≈7:1), `--ink-3` #767676 (=4.54:1). `#888` / `#BBB` / `--g-30` are demoted to non-text only (hairlines, gridlines, disabled, decorative rules); permitted for large text ≥ 24px at 3:1 only. The validator computes contrast (unrounded) and re-checks against `--surface-tint`.
- RENDERING § R-21 — Three-size reading core (V3.5+). Collapses nine roles to header 40/44 · subhead 26/32 · body 17/26, with weight + ink + space doing the differentiation. The dek stops being a size (renders at body-size + secondary ink). Authoring note: differentiate by weight or ink before adding a size (the Vignelli test).
- `app/scripts/validate-v3-1.mjs` — WCAG contrast self-check on the R-20 ink ladder (errors on any text token under 4.5:1, or 3:1 for ≥ 24px); V3.5 card gate (no `apple_register`, no positive body tracking overrides).
- `app/src/supercard.css` — `.canvas.v3-5` scope: R-20 ink ladder, R-19 body metrics (−0.01em / word-spacing normal), 64pt default beat gap, −0.020em display tightening.
- `renderer/v3.5/` — versioned rule-library note for the V3.5 reading layer.

### Changed

- RENDERING § R-15 — V3.5 default beat gap is **64pt** (`--s-7`), up from 48pt. 48pt becomes the opt-*down* for dense `reference` cards; 96–120pt stays for poster / XL. Micro-spacing does **not** scale with the beat gap.
- RENDERING § R-13 — The cover dek points at body-size (17/26) + secondary ink for V3.5, not a 19pt subtitle step.
- RENDERING § R-9 — Marked superseded by R-19 for `frozen_at_version ≥ 3.5.0`; retained unchanged for V3.1–V3.4 cards.
- RENDERING § R-18 — Apple register's display tightening is folded into the V3.5 default by R-19; the sub-1.5 line-height variant and its `data-wcag-note` warning are dropped for V3.5. R-18 stays in force for V3.4 cards.
- PRINCIPLES § 5 / § 11 — One-line cross-references added pointing to R-19 / R-20 / R-21.

### Guardrails

- Frozen-at-version (P8 / ADR-0003): no V3.0–V3.4 card or published render is migrated or reflowed. All four changes shipped together as one validated render (ADR-0009).

---

## [3.4.0] — "Atlas" — 2026-05-16

Apple-calibrated readability cut. Two new principles (plain language as
substance; connective flow without scaffold), three new grammar rules
(mobile paragraph cap, readability target, connective-flow vocabulary),
four new rendering rules (section spacing scale, surface-tinted card
affordance, screenshot-autonomy enforcement, Apple register opt-in), and
two new tokens (`--s-9: 120pt`, `--surface-tint: rgba(0,0,0,0.025)`)
plus a 28/32 Tile head step on the type ramp. Backwards-compatible: every
V3.3 card renders identically under V3.4. New constraints apply only to
cards declaring `frozen_at_version: 3.4.0`.

### Added

- PRINCIPLES #13 — Plain language as substance (V3.4+). Targets Flesch–Kincaid grade 6–9, average sentence length 15–20 words, complex-word rate < 15%. The reader-with-no-prior-context test.
- PRINCIPLES #14 — Connective flow without scaffold (V3.4+). Bridges between beats are named by content, never by position. Five Apple-validated bridge patterns are the canonical vocabulary; meta-language and position-language are forbidden.
- PRINCIPLES — The ADHD scan-ability gate grows from ten to twelve questions on V3.4+ cards (adds readability floor and mobile paragraph-cap checks). V3.1–V3.3 cards stay on the ten-question form.
- GRAMMAR § G-12 — Paragraph mobile cap (V3.4+). Prose blocks SHOULD stay ≤ 3 sentences / ≤ 60 words on a mobile canvas. The G-8 hard ceiling (4 sentences / 75 words) is unchanged; blocks between 60–75 words emit a warning.
- GRAMMAR § G-13 — Readability target (V3.4+). Prose blocks SHOULD test at Flesch–Kincaid grade ≤ 9, Flesch Reading Ease ≥ 60, and average sentence ≤ 20 words. Two warnings in a single card escalate to an error.
- GRAMMAR § G-14 — Connective-flow vocabulary (V3.4+). The five canonical patterns: eyebrow + tagline pair, two-sentence haiku, "Built/Designed/Engineered" imperative, inline "Now you can…" kicker, single-word eyebrow.
- GRAMMAR — Five new anti-patterns mirroring G-12 / G-13 / G-14 (over-cap paragraphs, above-grade-9 prose, position-language bridges, meta-language bridges, restatement bridges).
- RENDERING § R-15 — Section spacing scale (V3.4+). Beat boundaries snap to one of three uniform values per card — 48pt (V3.3 default), 64pt (mobile-marketing), or 120pt (desktop-marketing). Mixed gaps emit a warning.
- RENDERING § R-16 — Surface-tinted card affordance (V3.4+). Cards MAY use `--surface-tint` + 18pt radius + no border in place of the V3.3 hairline-bordered variant. Mutually exclusive on any given card.
- RENDERING § R-17 — Screenshot-autonomy enforcement (V3.4+). The validator verifies every block has its own anchor (lead-clause, focal stat, definition term, takeaway row, or attribution) and the corner glyph is fixed-position.
- RENDERING § R-18 — Apple register opt-in (V3.4+). Cards MAY declare `apple_register: true` to opt into Apple's exact body typography (−0.022em letter-spacing, 25pt line-height, 56–80pt Display clamp). Emits a WCAG-note data-attribute because the 1.47 line-height sits below SC 1.4.12's 1.5 floor; cards needing AA stay on R-9.
- RENDERING — Type-scale gains a Tile head step at 28/32 semibold, −0.012em. New canonical size for the tagline half of an eyebrow + tagline pair (G-14 Pattern 1).
- RENDERING — Spacing tokens gain `--s-9: 120px` (marketing-scale). Tokens layer gains `--surface-tint: rgba(0,0,0,0.025)` as a single off-white permitted as card background (NOT a seventh step in the gray ramp).
- RENDERING — Output contract adds a corner-glyph viewport-persistent bullet: cards over 2,000pt height MUST be tested with an automated scroll-screenshot pass before publish.
- PIPELINE — I8 (Plain-language readability) added to the identity invariants. Total invariants: 8.
- PIPELINE — G9 (Readability gate) added to the constraint gates. Total gates: 9.
- VALIDATOR (`app/scripts/validate-v3-1.mjs`) — Six new error triggers and four new warnings, all version-gated to `frozen_at_version: 3.4.0` or higher. Internal header comment clarifies the validator covers V3.1 through V3.4 despite the filename.
- APP — `app/src/supercard.css` gains `--s-9`, `--surface-tint`, `--t-tile`, `--lh-tile`, and the `.tint-card` variant class.
- AGENT-GUIDE — New `writing_register` block documents the V3.4 readability targets, paragraph caps, and the five-pattern transition vocabulary so an agent authoring a V3.4 card sees the rules before drafting prose.

### Changed

- RENDERING — Type-scale eyebrow tracking corrected from +0.07em to +0.08em, removing the inconsistency with R-10 / R-14 (which always specified +0.08).
- RENDERING — `--s-6` use-row clarified to "Beat boundaries (V3.3 default)" — R-15 (V3.4+) adds 64pt and 120pt as opt-in alternatives.
- INDEX-supercard-v3 — `spec_revision` bumps with V3.4.
- INDEX-block-library — version stamp bumps to 3.4.0; new V3.4 backwards-compatibility note. No block ID, family, or length-variant changes.

### Considered & rejected

- Renaming `validate-v3-1.mjs` to `validate.mjs` now that it serves V3.1 through V3.4. Rejected — every call site (`package.json`, CI config, project docs) would break. Kept the filename; added an internal comment that explains the scope.
- Making R-9 the default and R-18 the toggle, vs. keeping R-9 as default and adding R-18 as the opt-in. Stayed with R-9 default — its 1.53 line-height is WCAG SC 1.4.12 compliant out of the box; R-18 ships the more compressed Apple typography only when the author asks for it.
- Adding `--surface-tint` as a seventh step in the gray ramp. Rejected — it is a single off-white for a single purpose (card surface in place of a hairline border), not a new ramp step. The strict-grayscale principle (P5) stays unchanged.

---

## [3.3.0] — "Atlas" — 2026-05-16

Removed renderer chrome that leaked the author's production scaffold into the
reader's view. R-10 inverted: beat folios prohibited, replaced with optional
editorial eyebrow. Bottom folio moved to dev-only metadata. New invariant I7
prohibits scaffold leakage broadly.

### Changed

- RENDERING § R-10 — Inverted: the V3.1 beat micro-folio (`BEAT N · BEAT-NAME · POSITION / TOTAL` at the top of every beat and the bottom of every card) is prohibited on the rendered canvas. Beat boundaries render as whitespace and the first block's own anchor. A single short editorial eyebrow (e.g., `The medical study`) is permitted when the beat's first block doesn't carry a sufficient anchor; it names the *content*, never the position. Position counters are never permitted under any circumstance.
- RENDERING § R-10 — Bottom-folio metadata (`SUPERCARD V3.X · ATLAS · {MODE} · YYYY-MM-DD`) moved to dev-only: an HTML comment or `data-*` attribute. Production renders MUST NOT show renderer version, era, mode, or render date in any reader-visible chrome. The five `sc:*` `<meta>` tags remain mandatory.
- RENDERING § R-13 — Cover discipline revised: the cover stack drops the top-edge micro-folio. Permitted elements reduce to three (title, dek, hero). Spacing stack reduces to four joins (32 / 12 / 24 / 48pt).
- RENDERING § R-12 — Validator triggers updated: removed the R-10 micro-folio enforcement rows; added two errors (any `BEAT N` / `N / TOTAL` counter on the canvas; reader-visible renderer-version footer).
- RENDERING § R-9 — Dropped the "300-weight reserved for the micro-folio" carve-out; 300 is now reserved for the dek alone.
- GRAMMAR — "Beats are authoring scaffolding" note rewritten: the rendered card emits no beat number, position counter, or block-type label (I7). Anti-patterns table updated to mirror the new R-10 / R-13: removed the row about a section eyebrow duplicating the micro-folio; added two rows for beat-label leakage and renderer-version footer leakage.
- PIPELINE § Identity invariants — I4 reconciled with the new R-10: rendered card never shows the `Beat N` index or `BLOCK-*` ids; beat NAMES may appear only as the optional editorial eyebrow, never with a position counter.
- PIPELINE § Identity invariants — Added **I7: No scaffold leakage**. The author's production structure (beats, block IDs, render metadata, version strings) does not appear in the reader's view. Renderer chrome that exists to help the author is not part of the rendered card.
- PRINCIPLES — Principle 11 MUST-rule (c) re-grounded on the corner glyph (system identity, always present) rather than the now-deprecated micro-folio. ADHD scan-ability gate item 8 rewritten to verify the canvas is free of scaffold chrome.
- GLOSSARY — `Micro-folio` marked deprecated in V3.3 (dev-only CSS/component). `Eyebrow` redefined as the optional editorial label permitted by R-10 (V3.3), never carrying a position counter.
- LENGTHS § L-5 — Anchor-count exclusion list swaps `micro-folio` for `optional editorial eyebrow (R-10 V3.3)`.
- AGENT-GUIDE — First-layer guidance surfaces R-10 (V3.3) and I7 so a renderer or card author calling the spec sees the new scaffold-leakage prohibition without drilling. The pre-V3.3 instruction to "emit top-edge micro-folio at each beat boundary" is removed from any quick-reference, checklist, or example block.
- INDEX — `spec_revision` bump to 3.3.0.
- Templates (mini / standard / xl) — Removed the "micro-folio still required at top and bottom edges" reminders; the ADHD-gate checklist item now verifies the canvas is free of scaffold chrome.
- App — `MicroFolio` React component marked dev-only and not emitted in production cards. `.micro-folio` CSS classes preserved as reference but display defaults to `none`; show only under a `.dev-mode` gate on the canvas root.
- Validator (`app/scripts/validate-v3-1.mjs`) — `BEAT N` micro-folio is no longer a recognized exception to the context-chip strip rule; on V3.3+ cards, a `BEAT N` line on the rendered canvas is itself an error.

### Considered & rejected

- Keeping the micro-folio as an opt-in for `reference`-mode cards (the long-form cheat-sheet shape). Rejected — the rule is about the leak, not the mode. A reference card's navigation comes from a real table of contents block, not from a beat counter; once we permit the counter for one mode, it creeps back into briefings.
- Keeping the bottom-folio as a "tiny footer" credit line. Rejected — the same metadata is already in `<head>` `<meta>` tags, where it does not steal a line from the reader. Print-style "issue / date" credit is a magazine pattern that translates to the cover dek, not to a footer.

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
