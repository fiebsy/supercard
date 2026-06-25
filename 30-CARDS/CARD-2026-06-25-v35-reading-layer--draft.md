# The Reading Layer, Refined

| key | value |
|---|---|
| id | CARD-2026-06-25-v35-reading-layer |
| type | card |
| length | mini |
| era | atlas |
| version | 3.5.0 |
| frozen_at_version | 3.5.0 |
| lifecycle | sample |
| owner | derick |
| created | 2026-06-25 |
| status | draft |
| research_report | 10-GOVERNANCE/ADR/ADR-0009-v35-reading-layer--accepted.md |
| render | docs/cards/CARD-2026-06-25-v35-reading-layer.html |
| tags | v35, reading-layer, typography, wcag, sample |
| summary | First card declaring frozen_at_version 3.5.0. Exercises the reading-layer cut: R-19 body metrics (17/26, −0.01em, word-spacing normal), the R-20 three-step text-ink ladder (every step clears WCAG 4.5:1), the R-21 three-size reading core, and the R-15 64pt default beat gap. Hairline surface, strict grayscale. |
| apple_register | false |
| beat_gap | 64 |
| surface | hairline |
| supersedes | |
| related | |

> **V3.5 reference sample.** First card declaring `frozen_at_version: 3.5.0`.
> Exercises the reading-layer cut end to end: R-19 body metrics (17/26,
> −0.01em, word-spacing normal), the R-20 three-step text-ink ladder
> (every step clears WCAG 4.5:1), the R-21 three-size reading core, and
> the R-15 64pt default beat gap. Hairline surface so tertiary ink reads
> on white. Strict grayscale, SF Pro Rounded: no color.

---

## Beat 1 — Hook (loft-card)

`BLOCK-loft-card` · The cut

### V3.5 tunes how a card reads: strict grayscale, SF Pro Rounded, no color.

> **Fewer sizes, darker ink, calmer tracking.** V3.5 tunes how a card reads, never what it says.

The words stay the same. The page just reads easier.

---

## Beat 2 — Evidence (stat-callout)

`BLOCK-stat-callout` · The tracking

### Body tracking flips negative.

R-9 spaced body text out with positive tracking. That broke the word shapes fast readers rely on. V3.5 retunes body letter-spacing to:

**−0.01em**

with word spacing back to normal. The UPPERCASE eyebrow stays the only positively-tracked role.

---

## Beat 3 — Ink ladder (table)

`BLOCK-table` · The ink

### Three steps, all readable.

| Layer | Ink | Contrast | Role |
|---|---|---|---|
| Primary | #1A1A1A | 17.4:1 | Headers, focal stats |
| Secondary | #595959 | 7.0:1 | Body prose |
| Tertiary | #767676 | 4.54:1 | Captions, labels |
| **Takeaway** | #888 and below | drop to non-text | hairlines, gridlines |

Every text step clears the WCAG 4.5:1 floor. De-emphasis is a tonal step down, never a step below readable.

---

## Beat 4 — Three sizes (standard-text)

`BLOCK-standard-text` · The sizes

**Three sizes carry the whole card.** Header, subhead, and body do the work. Weight, ink, and space set the rest, not a fourth size.

---

## Beat 5 — Wider beats (standard-text)

`BLOCK-standard-text` · The spacing

**Beats sit further apart now.** The default gap grows from 48 to 64 points. More space between ideas reads as more separate ideas.

---

## Beat 6 — The guarantee (standard-text)

`BLOCK-standard-text` · The guarantee

**Old cards never change.** Every card built before this keeps its first look. The new rules touch only the newest cards.

---

## Beat 7 — Close (key-takeaway)

`BLOCK-key-takeaway` · The bottom line

**Hierarchy from weight, ink, and space, not from more sizes.**

Read it once, and the system fits in your head.

---

## Beat 8 — Sources (footnote-source)

`BLOCK-footnote-source` · Sources

- Apple: SF Pro tracking table and HIG Writing guidelines
- WCAG 2.2: SC 1.4.3 (contrast) and SC 1.4.12 (text spacing)
- Vignelli, "A Few Basic Typefaces"; Müller-Brockmann, grid systems
- Butterick, "Practical Typography"; Bringhurst, "The Elements of Typographic Style"
- Nielsen Norman Group: first-pass scanning and word-shape recognition
