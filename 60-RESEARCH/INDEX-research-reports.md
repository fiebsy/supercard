# INDEX — Research Reports

| key | value |
|---|---|
| id | INDEX-research-reports |
| type | index |
| era | atlas |
| version | 3.0.0 |
| owner | derick |
| updated | 2026-05-14 |

The registry of every deep-research report in `60-RESEARCH/`. This is the lookup
table that makes the research store a database, not a pile of files (ADR-0006).

**Before researching any topic, grep this file first.** If a report already
covers it, extend or re-view that report — do not re-research from scratch.

**After creating or updating a report, update its row here** — and list the
cards derived from it in the report's own frontmatter. The registry and the
breakdowns must agree.

---

## Registry

| id | topic | slug | mode(s) | status | sources | cards derived | created | updated |
|---|---|---|---|---|---|---|---|---|
| BREAKDOWN-spaced-repetition | Spaced repetition as a learning method | spaced-repetition | briefing | active | 6 | CARD-2026-05-14-spaced-repetition | 2026-05-14 | 2026-05-14 |
| BREAKDOWN-gestalt-principles | The Gestalt principles of perceptual organization | gestalt-principles | deep-dive | active | 10 | CARD-2026-05-14-gestalt-principles | 2026-05-14 | 2026-05-14 |

---

## Status values

| status | meaning |
|---|---|
| `active` | Current; safe to derive new cards from |
| `extending` | Open research pass in progress — coordinate before deriving |
| `superseded` | Replaced by a newer report (note which in the report's frontmatter) |
| `archived` | Topic retired; kept for genealogy only |

## Field notes

- **mode(s)** — every mode a card has been derived under from this report. One
  report can carry `summary`, `briefing`, `deep-dive`, and `reference` at once.
- **sources** — count of entries in the report's Source register.
- **cards derived** — comma-separated card ids. Must match the `derived_cards`
  field in the report's frontmatter and the `research_report` field in each
  card's frontmatter.

## Search recipes

```
# Has a topic already been researched?
grep -i '<topic-keyword>' 60-RESEARCH/INDEX-research-reports.md

# All reports a given card descends from
grep -l 'CARD-2026-05-14-spaced-repetition' 60-RESEARCH/BREAKDOWN-*.md

# Reports with an open extending pass
grep 'extending' 60-RESEARCH/INDEX-research-reports.md
```
