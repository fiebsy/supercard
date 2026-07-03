# Rendered as Written

| key | value |
|---|---|
| id | CARD-2026-07-03-v39-rendering-robustness |
| type | card |
| length | standard |
| era | atlas |
| version | 3.9.0 |
| frozen_at_version | 3.9.0 |
| lifecycle | sample |
| owner | derick |
| created | 2026-07-03 |
| status | draft |
| research_report | 10-GOVERNANCE/ADR/ADR-0016-v39-rendering-robustness--accepted.md |
| render | docs/cards/CARD-2026-07-03-v39-rendering-robustness.html |
| tags | v39, robustness, charts, lists, mobile-fit, sample |
| summary | First card declaring frozen_at_version 3.9.0. Exercises the robustness cut: the R-33 faithful-markdown treatments (real quotes with attribution, checkmark checklists, numbered process flows), the R-34 measured fit and rhythm, and the R-35 column and area charts drawn from the shared geometry module. Strict grayscale, hairline surface, 64pt beats. |
| apple_register | false |
| beat_gap | 64 |
| surface | hairline |
| supersedes | |
| related | CARD-2026-06-27-v37-data-and-alignment |

> **V3.9 reference sample.** First card declaring `frozen_at_version: 3.9.0`.
> Exercises the robustness cut end to end: the R-35 column + area charts, the
> R-33 list, quote, and divider treatments, and the R-34 fit guarantees.
> Strict grayscale, SF Pro Rounded, no color.

---

## Beat 1 — Hook (loft-card)

`BLOCK-loft-card` · The robustness release

### Every catalogued block now renders as catalogued, and every card fits the canvas it ships on.

> **Rendered as written.** The grammar always had the variety; the render layer was quietly flattening it into prose and fine print. V3.9 makes the renderer keep the catalogue's promises.

Checklists, quotes, equations, timelines, and all four charts now draw as designed, in both render paths, and a browser measures the result on every card.

---

## Beat 2 — Evidence (stat-callout)

`BLOCK-stat-callout` · The width that holds

### One number, checked on every card.

**393**

Every published card now measures exactly 393 pixels wide in a headless browser: no table, chart label, or long token escapes the column on any phone.

---

## Beat 2 — Evidence (column-chart)

`BLOCK-column-chart` · Defects fixed by rule

### Fourteen fixes, three rules.

| rule | fixes |
|---|---|
| R-33 | **6** |
| R-34 | 6 |
| R-35 | 2 |

R-33 makes markdown render faithfully, R-34 makes the canvas fit and the rhythm uniform, and R-35 finishes the chart family.

---

## Beat 2 — Evidence (area-chart)

`BLOCK-area-chart` · The catalogue, honoured

### Chart blocks that actually render.

| version | built |
|---|---|
| v3.6 | 0 |
| v3.7 | 2 |
| v3.8 | 2 |
| v3.9 | **4** |

Four catalogued chart ids, four render contracts: the gap between what the library advertises and what the renderer draws is closed.

---

## Beat 3 — Mechanism (standard-text)

`BLOCK-standard-text` · How defects get found

**Measured, not eyeballed.** A headless browser loads each published card at mobile width and measures scroll width, box edges, chart text, and the gap between beats. A defect is a number that disagrees with the spec.

---

## Beat 3 — Mechanism (process-flow)

`BLOCK-process-flow` · From defect to rule

### Five steps, one loop.

- Measure the published renders in a real browser.
- Name each failure as a numbered rule.
- Fix it once, at the base of the stylesheet.
- Re-render every card from its frozen source.
- Measure again: the number is the proof.

---

## Beat 4 — Comparison (table)

`BLOCK-table` · The same markdown, twice

### What a block used to become.

| block | through v3.8 | v3.9 |
|---|---|---|
| Quote | a literal ">" paragraph | a real blockquote |
| Checklist | 13px fine print | body-size check rows |
| Equation | mangled fragments | a code panel |
| Author notes | printed on the card | never rendered |
| **Takeaway** | The catalogue was already written; the renderer now honours it. | |

---

## Beat 5 — Counter (quote-as-evidence)

`BLOCK-quote-as-evidence` · The archive objection

> "They would look better under the new rules" is exactly the rationalization that corrupts an archive.

Stewards' log, June 2026

**The line V3.9 respects.** Retroactive repair is allowed only for defects: broken markup, overflow, a wobbling gap. The reading layer and every card's authored content stay frozen at their version.

---

## Beat 6 — Application (checklist)

`BLOCK-checklist` · Before a render ships

- [ ] Crop any section: one idea, corner glyph in frame
- [ ] Read only the bold: the thesis assembles
- [ ] Width is 393 and nothing escapes it
- [ ] Every beat gap measures the same height
- [ ] No scaffold: no beat names, no version chrome

---

## Beat 7 — Close (key-takeaway)

`BLOCK-key-takeaway` · The bottom line

**A grammar is only as good as its renderer.**

Variety returns not by adding rules, but by honouring the ones already written and proving it with a measurement.

---

## Sources

- ADR-0016: V3.9 rendering robustness (10-GOVERNANCE/ADR/)
- Headless Chromium audit, 2026-07-03: scroll width, box edges, SVG text, beat-gap deltas
- STEWARDS-LOG-2026: entries of 2026-06-25 and 2026-07-03
- CHANGELOG-supercard: [3.9.0]

---

## Authoring notes

- Mode `briefing` → Standard. 10 blocks across all 7 beats, one to three per
  beat, inside the 10 to 14 budget (G1).
- Anchors: hero, stat-callout, table-with-takeaway, key-takeaway = 4, inside
  the Standard 3 to 5 band (L-5). The Evidence beat runs one anchor to two
  content charts (1:2, G-9).
- Self-demonstrating by design: every block added or repaired in V3.9 appears
  once (column-chart, area-chart, checklist with check markers, process-flow
  numerals, quote with attribution line, fixed-grid table). The redundancy
  filter was run against the ADR text, not padded to reach length.
- The quote is a verbatim lift from the stewards' log 2026-06-25 entry, used
  as the honest steelman against retroactive change; the commentary paragraph
  states the boundary the release observed.
- No em dash anywhere in card content (R-24); the ">" in the comparison table
  is quoted inline text, not a blockquote marker.
