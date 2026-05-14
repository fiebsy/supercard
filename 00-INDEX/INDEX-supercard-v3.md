# INDEX — Supercard V3

| key | value |
|---|---|
| id | INDEX-supercard-v3 |
| type | index |
| era | atlas |
| version | 3.0.0 |
| owner | derick |
| updated | 2026-04-29 |

The canonical entry point. If you're a new Claude session reading this, start here.

---

## What is a Supercard

A Supercard is a screenshot-shareable, single-emphasis-per-block knowledge artifact built as a cognitive prosthesis for ADHD readers. Every visible region must be self-sufficient: a stranger seeing only a cropped screenshot should still get one complete idea, traceable back to the system via the corner glyph. The format is a grammar, not a length — identity holds from a 5-block summary to a 25-block synthesis because the type scale, gray ramp, 16pt grid, and header/footer pattern stay pixel-identical.

## How Claude should use this system

**To build a new Supercard on topic X:**

1. Read `PRINCIPLES-supercard-v3` (the cognitive-prosthesis principles)
2. Read `GRAMMAR-block-composition` (the rules for composing blocks)
3. Read `LENGTHS-mini-standard-xl` (which length variant fits the topic)
4. Open `INDEX-block-library` — survey the 38 blocks by family + lifecycle
5. For each block you'll use, read its individual `BLOCK-*` spec in `20-BLOCKS/`
6. Search `30-CARDS/` and `90-ARCHIVE/` for related prior cards
7. Read the most-recent 5 entries of `STEWARDS-LOG-2026` for current direction
8. Compose the card using only Core/Stable blocks (Experimental requires explicit ask)
9. Save to `30-CARDS/` as `CARD-{YYYY}-{slug}--draft` with a Metadata table at the top
10. Render HTML as a Claude artifact for immediate screenshot

**To migrate a V2 card to V3:**

1. Read the V2 source from `90-ARCHIVE/2025-V2/`
2. Read `PRINCIPLES`, `GRAMMAR`, and any "Accepted" ADRs whose tags overlap
3. Map V2 patterns that violate V3 (multi-emphasis blocks, non-self-sufficient regions) to V3 blocks
4. Produce new V3 card in `30-CARDS/` with frontmatter `supersedes: <V2-id>`

**To audit cards for drift:**

1. List `'30-CARDS-folder-id' in parents and modifiedTime > '<N-days-ago>'`
2. Grade each against PRINCIPLES + last 10 stewards' log entries
3. Save report as `AUDIT-{date}--draft` in `40-LAB/`

**To propose a new block:**

1. Create RFC in `40-LAB/` named `RFC-{NNNN}-{slug}--proposed` from `TEMPLATE-rfc`
2. Draft a corresponding ADR-stub in `10-GOVERNANCE/ADR/` with status `Proposed`

## Folder map

- **`00-INDEX/`** — this doc + block library index
- **`10-GOVERNANCE/`** — principles, grammar, lengths, rendering, changelog, stewards' log, ADRs
- **`20-BLOCKS/`** — 38 individual block specs (one doc each)
- **`30-CARDS/`** — active V3 Supercards
- **`40-LAB/`** — experiments + RFC proposals + audit reports
- **`50-TEMPLATES/`** — golden templates for new artifacts
- **`90-ARCHIVE/`** — frozen V1/V2 era + retired V3 minor versions

## Naming grammar (non-negotiable)

`{TYPE}-{slug-or-id}--{status}`

- TYPE ALL CAPS: `ADR`, `BLOCK`, `CARD`, `RFC`, `LAB`, `INDEX`, `TEMPLATE`, `GOV`, `AUDIT`
- Slug kebab-case lowercase
- `--` (double dash) separates status: `--draft`, `--published`, `--accepted`, `--proposed`, `--archived`, `--exploring`

## Search recipes Claude should use

```
# All Core blocks
mimeType = 'application/vnd.google-apps.document'
  and name contains 'BLOCK-'
  and name contains '--core'
  and trashed = false

# Recent governance changes
'<governance-folder-id>' in parents
  and modifiedTime > '2026-04-01T00:00:00'

# Accepted ADRs
name contains 'ADR-' and fullText contains 'Status: Accepted'

# Related prior cards by topic
fullText contains '<topic-keyword>'
  and ('<cards-folder-id>' in parents or '<archive-folder-id>' in parents)

# Published cards only
name contains 'CARD-' and name contains '--published'
```

## ADR ledger

(Updated by SupercardOps. Manually mirror new ADRs here for at-a-glance lookup.)

| # | Title | Status | Date |
|---|---|---|---|
| 0001 | Adopt named eras with SemVer (V3 = Atlas) | Accepted | 2026-04-29 |
| 0002 | Four-tier lifecycle: Core / Stable / Experimental / Deprecated | Accepted | 2026-04-29 |
| 0003 | Content frozen at authored version | Accepted | 2026-04-29 |

## Versioning at a glance

- **Era** (named): `Atlas` is V3.x. Era changes require a generational bump (V3 → V4)
- **MINOR** bumps: new Stable block promoted, length variant added to existing block
- **PATCH** bumps: spec text clarifications, typo fixes
- **Pre-release**: experimental work tagged `V3.next-alpha.N`
- **Frozen-at-authored**: a card written under V3.0 stays valid forever; V3.5 doesn't retroactively reformat it

## Quick links

- Principles → `10-GOVERNANCE/PRINCIPLES-supercard-v3`
- Grammar → `10-GOVERNANCE/GRAMMAR-block-composition`
- Lengths → `10-GOVERNANCE/LENGTHS-mini-standard-xl`
- Rendering → `10-GOVERNANCE/RENDERING-spec`
- Changelog → `10-GOVERNANCE/CHANGELOG-supercard`
- Stewards' log → `10-GOVERNANCE/STEWARDS-LOG-2026`
- Block library → `00-INDEX/INDEX-block-library`
- ADRs → `10-GOVERNANCE/ADR/`
- Templates → `50-TEMPLATES/`
