# Plain Language as Substance

| key | value |
|---|---|
| id | CARD-2026-05-16-v34-sample |
| type | card |
| length | mini |
| era | atlas |
| version | 3.4.0 |
| frozen_at_version | 3.4.0 |
| lifecycle | sample |
| owner | derick |
| created | 2026-05-16 |
| status | draft |
| research_report | 60-RESEARCH/BREAKDOWN-v34-sample.md |
| render | docs/cards/CARD-2026-05-16-v34-sample.html |
| tags | v34, readability, apple-calibration, sample |
| apple_register | false |
| beat_gap | 64 |
| surface | tinted |
| supersedes | |
| related | |

> **V3.4 reference sample.** First card declaring `frozen_at_version: 3.4.0`.
> Exercises the V3.4 cut end to end: the 28/32 Tile head step on each
> tagline, 64pt beat gaps (R-15), the surface-tinted callout (R-16),
> eyebrow + tagline pairs as the bridge between sections (G-14 Pattern
> 1), the G-12 mobile paragraph cap (≤ 3 sentences, ≤ 60 words), and the
> G-13 readability target (Flesch–Kincaid ≤ 9). An Apple-register twin
> ships alongside to validate R-18.

---

## Beat 1 — Hook (card-in-hero)

`BLOCK-loft-card` · *the one elevated element on this card*

HERO-CARD: **Plain Language as Substance**

> **The substance survives the simplicity.** A reader with no context should still get the gist of the card.

Short words carry real reasoning when the thinking is clear. That is the V3.4 readability cut in one line.

---

## Beat 2 — Evidence

`BLOCK-stat-callout` · single focal number, surface-tinted per R-16

Most mobile readers stop reading at the third sentence. The research is consistent:

**60 words**

is the soft cap a paragraph should target on a phone. Past sixty, eye-tracking studies show the reader gives up before the period.

---

## Beat 3 — Mechanism

`BLOCK-standard-text` · the bridge vocabulary, opening

**Five bridge patterns.** A V3.4 card bridges its sections with one of five named shapes. The dominant form is an eyebrow plus tagline pair, in which the eyebrow names the topic and the tagline lands the claim.

## Beat 3 — Mechanism

`BLOCK-standard-text` · the bridge vocabulary, the other four

**The other four shapes.** They are the two-sentence haiku, the "Built / Designed / Engineered" imperative, the inline "Now you can…" kicker, and the single-word eyebrow. All five name the content; none of them name the position.

---

## Beat 4 — Comparison

`BLOCK-comparison` · two things on the same axis

| | Before V3.4 | After V3.4 |
|---|---|---|
| Paragraph cap | 75 words, 4 sentences (G-8) | 60 words, 3 sentences (G-12) |
| Grade target | (unspecified) | Flesch–Kincaid ≤ 9 (G-13) |
| Section bridge | (unspecified) | Five-pattern vocabulary (G-14) |
| **Takeaway** | Walls of valid prose | Beats that breathe |

The cap drops from seventy-five to sixty words. The grade target moves from implicit to measured.

---

## Beat 5 — Counter

`BLOCK-standard-text` · the honest steelman

**Plain is not thin.** Hemingway's prose tests at grade five because it carries real weight in plain words, not because the words are plain. The discipline is shorter words for the same reasoning — never shorter reasoning for shorter words.

---

## Beat 6 — Application

`BLOCK-checklist` · so what / how to act

- [ ] Draft each block's content first; ignore the bolded lead-clause until the prose is real
- [ ] Run the validator's readability check on every prose block (grade level, reading ease)
- [ ] Count sentences (≤ 3) and words (≤ 60) per block; split when you are over
- [ ] Add the bolded lead-clause last — 2–6 words, noun phrase or imperative
- [ ] For each section bridge, pick one of the five patterns in G-14; never write "In the next section"

---

## Beat 7 — Close

`BLOCK-key-takeaway` · bottom line

**Clarity of writing follows clarity of thought.** Same hours, same material; the difference is whether the reader still has it in six months.

---

## Sources

- Apple HIG — Writing guidelines (Choose simple, plain language. Prioritize clarity.)
- The Economist Style Guide — five rules for plain English (Orwell heritage)
- Nielsen Norman Group — Eye-tracking studies on mobile paragraph length (2018, 2021)
- CDC Plain Language standard — paragraph length recommendations
- WCAG 2.2 SC 1.4.12 and 3.1.5 — line-height and reading-level floors

---

## Authoring notes

(End-of-card notes are authoring-only and live below the close.)

- Chose Mini over Standard because the card is a discipline demo, not an exhaustive treatment.
- Evidence section declares the surface-tinted variant (R-16) because its single stat is the page's one elevated moment.
- Section gaps run at sixty-four points (R-15) because the card's Display moment earns marketing-scale breathing room.
- Every prose block sits at grade seven or lower on the F-K scale; mean sentence length holds at twelve to fifteen words.
- No transition uses position-language or meta-language. Each section eyebrow names the content; the first block's lead-clause does the bridge.
