# Data, Aligned

| key | value |
|---|---|
| id | CARD-2026-06-27-v37-data-and-alignment |
| type | card |
| length | standard |
| era | atlas |
| version | 3.7.0 |
| frozen_at_version | 3.7.0 |
| lifecycle | sample |
| owner | derick |
| created | 2026-06-27 |
| status | draft |
| research_report | 10-GOVERNANCE/ADR/ADR-0014-v37-header-eyebrow-alignment-dataviz--accepted.md |
| render | docs/cards/CARD-2026-06-27-v37-data-and-alignment.html |
| tags | v37, data-viz, charts, alignment, eyebrow, sample |
| summary | First card declaring frozen_at_version 3.7.0. Exercises the V3.7 cut: the R-27 cover eyebrow above the title, the R-30 grayscale bar and line charts, the R-31 stat-grid and stat-callout numeric anchors, and the R-28/R-29 alignment fixes (no doubled header rule, fixed-grid columns). Strict grayscale, hairline surface, 64pt beats. |
| apple_register | false |
| beat_gap | 64 |
| surface | hairline |
| supersedes | |
| related | |

> **V3.7 reference sample.** First card declaring `frozen_at_version: 3.7.0`.
> Exercises the variety cut end to end: the R-27 cover eyebrow, the R-30
> grayscale bar + line charts, the R-31 stat-grid and stat-callout, and the
> R-28/R-29 alignment fixes. Strict grayscale, SF Pro Rounded, no color.

---

## Beat 1 — Hook (loft-card)

`BLOCK-loft-card` · The variety release

### V3.7 gives every card more ways to fill the same grid: charts, numbers, and a cover that can open with an eyebrow.

> **Range, without breaking the system.** The shape held; v3.7 just widened what can sit inside it.

The chart blocks were catalogued for a year. Now they actually render, in both paths, on the same gray ramp as everything else.

---

## Beat 2 — Evidence (stat-grid)

`BLOCK-stat-grid` · The system in four numbers

### One grammar, many parts.

| 39 | blocks |
| 7 | families |
| 14 | ADRs |
| 2 | render paths |

---

## Beat 2 — Evidence (bar-chart)

`BLOCK-bar-chart` · Where the blocks live

### Editorial carries the most weight.

| family | blocks |
|---|---|
| Editorial | **11** |
| Comparative | 7 |
| Numeric | 5 |
| Sequential | 4 |
| Definitional | 4 |
| Distributional | 4 |
| Structural | 4 |

One bar goes full-ink: the family a card reaches for most.

---

## Beat 3 — Mechanism (standard-text)

`BLOCK-standard-text` · How a chart stays on brand

**Grayscale, single emphasis.** A chart obeys the same rules as prose: every bar and line sits on the gray ramp, and exactly one element goes full-ink to carry the focus. No color, no second highlight.

---

## Beat 3 — Mechanism (line-chart)

`BLOCK-line-chart` · Rules per release

### The spec grows in small, deliberate cuts.

| version | rules |
|---|---|
| v3.1 | 6 |
| v3.4 | 4 |
| v3.5 | 3 |
| v3.6 | 3 |
| v3.6.1 | 2 |
| v3.7 | **5** |

---

## Beat 4 — Comparison (comparison)

`BLOCK-comparison` · Table or chart

### Pick by what the reader extracts.

| | Table | Chart |
|---|---|---|
| Reads as | values | shape |
| Best for | exact figures | magnitude at a glance |
| Carries focus with | a bold cell | **one full-ink bar** |

---

## Beat 5 — Counter (stat-callout)

`BLOCK-stat-callout` · Colors on the canvas

### The ramp is the whole palette.

Charts changed nothing about the rule that has held since v3.0:

**0**

colors. Every bar, line, and number stays on the gray ramp, and one focal element per chart carries the emphasis.

---

## Beat 6 — Application (table)

`BLOCK-table` · Reach for the right one

### What you have decides the block.

| You have | Reach for |
|---|---|
| One number that matters | stat-callout |
| A few parallel metrics | stat-grid |
| Magnitudes to compare | bar chart |
| A trend over time | line chart |
| **Takeaway** | Shape first, text last: the data picks the block. |

---

## Beat 7 — Close (key-takeaway)

`BLOCK-key-takeaway` · Bottom line

**More range, one grammar.**

V3.7 adds charts, numbers, and a cover eyebrow without a single color or a broken grid. The system gets more expressive the same way it got quieter: by rule, on the ramp, one emphasis at a time.

---

## Sources

- Supercard `RENDERING-spec` § R-27 to R-31 (V3.7 rules)
- Supercard `ADR-0014`: V3.7 header eyebrow, alignment, data-viz
- Supercard `INDEX-block-library`: 39 blocks across 7 families
- Supercard `CHANGELOG-supercard`: version cadence
