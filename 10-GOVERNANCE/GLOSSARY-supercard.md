# GLOSSARY — Supercard

| key | value |
|---|---|
| id | GLOSSARY-supercard |
| type | governance |
| era | atlas |
| version | 3.2.0 |
| owner | derick |
| updated | 2026-05-16 |

One place to disambiguate the system's nouns. Every term that appears across
multiple layers is defined here, with its canonical source layer cited.

---

## Artifacts

| Term | Definition | Source |
|---|---|---|
| Breakdown | The full uncompressed deep-research report for a topic. Lives in `60-RESEARCH/BREAKDOWN-{slug}.md`. Registered in `INDEX-research-reports.md`. No length budget — the superset every card on the topic is derived from. | PIPELINE, ADR-0006 |
| Card | A constrained *view* of a breakdown, shaped by the mode. Lives in `30-CARDS/CARD-{YYYY-MM-DD}-{slug}--{status}.md`. The canonical, frozen-at-version source. | PIPELINE, ADR-0003 |
| Render | The published HTML artifact derived from a card. Lives in `docs/cards/CARD-{YYYY-MM-DD}-{slug}.html`. A *view* of the card, regenerated, never hand-edited. | RENDERING, ADR-0007 |

## Composition primitives

| Term | Definition | Source |
|---|---|---|
| Block | The composable unit of a card. Every block is one of the 39 entries in `INDEX-block-library`. Each block is one *single-emphasis* idea (PRINCIPLES 2). | INDEX-block-library |
| Anchor block | A structurally emphatic block: stat-callout, pull-quote, key-takeaway, numbered-principle, or table-with-takeaway-row. Anchors give the reader re-entry landings. Counted in the per-length anchor budget (LENGTHS § L-5). | GRAMMAR § G-9 |
| Content block | A non-anchor block carrying body content: standard-text, faq, code, or table-without-takeaway. | GRAMMAR § G-9 |
| Hero | The Beat 1 lofted anchor — card-in-hero. Always one of the 1–3 elevated elements. | GRAMMAR (Hook beat), LENGTHS |
| Loft / lofted element | A block that sits in an elevated card shell (rounded, padded, shadowed). Hard cap of 1–3 lofted elements per Supercard; the hero is always one. | PRINCIPLES 4, RENDERING shadow system |
| Beat | One of the seven narrative spine sections: Hook, Evidence, Mechanism, Comparison, Counter, Application, Close. Authoring scaffolding — the rendered card shows the beat name only. | GRAMMAR seven-beat spine |
| Mode | The intent of a card request: `summary`, `briefing`, `deep-dive`, `reference`. Biases research depth, length variant, block selection, and redundancy posture. | PIPELINE modes |

## Editorial micro-units

| Term | Definition | Source |
|---|---|---|
| Lead-clause | The 2–6-word bolded phrase that opens every prose block (`standard-text`, `faq` answer, `code` via gloss). IS the block's single emphasis — no further bold runs. | GRAMMAR § G-7 |
| Thought-group | 1–3 sentences inside a prose block, separated from adjacent groups by 8pt whitespace alone. Caps: 75 words and 4 sentences per `standard-text` block. | GRAMMAR § G-8 |
| Verbal anchor | One sentence accompanying a `stat-callout` that names what the stat means and its direction. Bare numbers without a verbal anchor are forbidden in V3.1+ cards. | INDEX-block-library, stat-callout rules |
| Takeaway row | The bolded bottom row on a `table` with ≥ 4 data rows that states the comparison's verdict in one clause. Promotes a `table` from content to anchor for density-budget purposes. | GRAMMAR § G-11 |

## Render-time furniture

| Term | Definition | Source |
|---|---|---|
| Corner glyph | The system mark on every section of every rendered card. The one element that makes a cropped screenshot traceable to the system. | PRINCIPLES 1 (screenshot autonomy), RENDERING |
| Micro-folio | The 11pt small-caps label at the top edge of every beat and bottom edge of every card: `BEAT N · BEAT-NAME · POSITION / TOTAL`. The only top/bottom-edge label permitted on a V3.1+ card. | RENDERING § R-10 |
| Eyebrow | A short label above a section heading (typically the beat name). V3.1+: omitted on a beat's first block when the top-edge micro-folio is present (the folio carries the same signal). | RENDERING § R-10, R-14 |
| Dek | The subtitle below the title on the cover — the thesis sentence. Carries the load that mode badges and context chips would otherwise carry. 1 sentence preferred, 2 sentences hard cap. | RENDERING § R-13 |
| Kicker | A short editorial label above the title or a section heading. Bound by R-14 (must earn its existence; ≤ 4 words). | RENDERING § R-14 |
| Asterism rest | A centered `⁂` (U+2042) glyph at body size/weight inside a beat of ≥ 5 blocks, after every 4th block. Mid-beat breath. Doesn't count as a block for budget purposes. | GRAMMAR § G-10, RENDERING § R-11 |
| Section divider | The block that marks a beat boundary. Chapter break, not paragraph break. Never used between every section. | INDEX-block-library, GRAMMAR anti-patterns |

## Versioning

| Term | Definition | Source |
|---|---|---|
| Frozen-at-version | The SemVer the renderer applies forever to a card. A card authored at V3.0 stays under V3.0 rules even when the spec moves to V3.5. New blocks added in later versions are unknown to older cards and skipped, not auto-migrated. | PRINCIPLES 8, ADR-0003 |
| Era | The named V3 generation (`atlas`). Era changes require a generational bump (V3 → V4). | ADR-0001 |
| `spec_revision` | The 12-character SHA-256 prefix of the canonical markdown sources. Changes iff a source doc changes. Surface on every layer; agents compare to detect a moved source. | build-spec.mjs |
