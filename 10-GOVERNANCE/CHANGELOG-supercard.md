# CHANGELOG — Supercard

| key | value |
|---|---|
| id | CHANGELOG-supercard |
| type | governance |
| era | atlas |
| version | 3.0.0 |
| owner | derick |
| updated | 2026-04-29 |

All notable changes to the Supercard system. Format adapted from Keep a Changelog 1.1.0. Versioning: SemVer with named eras.

---

## [Unreleased]

### Added

- PIPELINE doc — the dynamic card assembly pipeline (research → breakdown → card) with four request modes: summary, briefing, deep-dive, reference
- `TEMPLATE-breakdown` — the uncompressed-report intermediate artifact
- `supercard` Claude Code skill — runs the assembly pipeline end to end

### Experimental

- (none yet)

### Considered & rejected

- (none yet — log decisions to *not* change here, per stewards' log convention)

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
