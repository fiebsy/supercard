# Supercard

The Supercard system — V3, "Atlas" era (3.0.0).

A Supercard is a screenshot-shareable, single-emphasis-per-block knowledge
artifact built as a cognitive prosthesis for ADHD readers. Every visible region
must be self-sufficient: a stranger seeing only a cropped screenshot should
still get one complete idea, traceable back to the system via the corner glyph.
The format is a grammar, not a length — identity holds from a 5-block summary to
a 25-block synthesis because the type scale, gray ramp, 16pt grid, and
header/footer pattern stay pixel-identical.

This repo is the canonical home of the Supercard system — the place it is built,
versioned, and rendered.

## Folder map

| Folder | Contents |
|---|---|
| `00-INDEX/` | Canonical entry point, block library index, session setup |
| `10-GOVERNANCE/` | Principles, grammar, lengths, rendering, changelog, stewards' log, ADRs |
| `20-BLOCKS/` | The 38 individual block specs (one file each) — to be authored |
| `30-CARDS/` | Active V3 Supercards |
| `40-LAB/` | Experiments, RFC proposals, audit reports |
| `50-TEMPLATES/` | Golden templates for new artifacts |
| `90-ARCHIVE/` | Frozen V1/V2 era + retired V3 minor versions |

## Start here

If you're a new Claude session, read in this order before any card work:

1. [`00-INDEX/INDEX-supercard-v3.md`](00-INDEX/INDEX-supercard-v3.md) — the canonical entry point
2. [`10-GOVERNANCE/PRINCIPLES-supercard-v3.md`](10-GOVERNANCE/PRINCIPLES-supercard-v3.md) — the 10 cognitive-prosthesis principles
3. [`10-GOVERNANCE/GRAMMAR-block-composition.md`](10-GOVERNANCE/GRAMMAR-block-composition.md) — how blocks combine

For deeper questions: `LENGTHS`, `RENDERING`, the ADRs, `CHANGELOG`.

To see the grammar in practice, read the worked sample card:
[`30-CARDS/CARD-2026-05-14-spaced-repetition--draft.md`](30-CARDS/CARD-2026-05-14-spaced-repetition--draft.md).

## Naming grammar (non-negotiable)

`{TYPE}-{slug-or-id}--{status}`

- TYPE in ALL CAPS: `ADR`, `BLOCK`, `CARD`, `RFC`, `LAB`, `INDEX`, `TEMPLATE`, `GOV`, `AUDIT`
- Slug in kebab-case lowercase
- `--` (double dash) separates status: `--draft`, `--published`, `--accepted`, `--proposed`, `--archived`, `--exploring`
