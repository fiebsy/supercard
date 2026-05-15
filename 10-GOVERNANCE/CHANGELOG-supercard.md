# CHANGELOG — Supercard

| key | value |
|---|---|
| id | CHANGELOG-supercard |
| type | governance |
| era | atlas |
| version | 3.1.0 |
| owner | derick |
| updated | 2026-05-15 |

All notable changes to the Supercard system. Format adapted from Keep a Changelog 1.1.0. Versioning: SemVer with named eras.

---

## [Unreleased]

### Added

- (none yet)

### Considered & rejected

- (none yet — log decisions to *not* change here, per stewards' log convention)

---

## [3.1.0] — "Atlas" — 2026-05-15

ADHD scan-ability pass. Translates the cognitive-prosthesis framing into concrete authoring and rendering rules without breaking V3.0's identity constraints. Additive under frozen-at-version (ADR-0003) — V3.0 cards keep V3.0 rules; only cards declaring `frozen_at_version: 3.1.0` opt in.

### Added

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
