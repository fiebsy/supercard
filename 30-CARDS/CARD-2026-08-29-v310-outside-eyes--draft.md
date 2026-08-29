# Outside Eyes

| key | value |
|---|---|
| id | CARD-2026-08-29-v310-outside-eyes |
| type | card |
| length | standard |
| era | atlas |
| version | 3.10.0 |
| frozen_at_version | 3.10.0 |
| lifecycle | sample |
| owner | derick |
| created | 2026-08-29 |
| status | draft |
| research_report | 10-GOVERNANCE/ADR/ADR-0017-v310-interface-skills--accepted.md |
| render | docs/cards/CARD-2026-08-29-v310-outside-eyes.html |
| tags | v310, skills, accessibility, tokens, structure, sample |
| summary | First card declaring frozen_at_version 3.10.0. Exercises the interface-skills cut: R-36 subheads as real headings, R-37 glyphs at the contrast floor, R-38 charts named by their data, R-39 role tokens, R-40 the card as a document, R-41 balanced display wrapping and R-42 smart punctuation. Strict grayscale, hairline surface, 64pt beats. |
| apple_register | false |
| beat_gap | 64 |
| surface | hairline |
| supersedes | |
| related | CARD-2026-07-03-v39-rendering-robustness |

> **V3.10 reference sample.** First card declaring `frozen_at_version: 3.10.0`.
> Every subhead below is a real `h2` (R-36), the quotation marks are curly
> (R-42), the display lines wrap balanced (R-41), and the chart names its own
> data (R-38). Strict grayscale, SF Pro Rounded, no color.

---

## Beat 1 — Hook (loft-card)

`BLOCK-loft-card` · The outside standard

### A system checked only against itself cannot find the questions it never asked.

> **The picture was hiding the page.** Every version so far was audited from a screenshot, and a screenshot cannot show you the layer underneath it. V3.10 read the HTML instead, and measured the colours.

A div styled as a heading photographs exactly like a heading. A gate that never runs looks the same as a gate that passes.

---

## Beat 2 — Evidence (stat-callout)

`BLOCK-stat-callout` · What the reader could not read

### One number, on five glyphs.

**2.10**

The list marker, the source bullet, the divider label, the gallery meta line and the corner mark were all drawn in a gray that measures 2.10 to 1 on white. The spec had already ruled that gray unfit for text.

---

## Beat 2 — Evidence (bar-chart)

`BLOCK-bar-chart` · Where the defects lived

### Most of them were promises already made.

| defect class | count |
|---|---|
| **Rule never kept** | 5 |
| Stale spec text | 6 |
| Unnamed gap | 3 |

The largest group is not new work. It is rules the spec states, the changelog records as done, and no render path ever carried out.

---

## Beat 2 — Evidence (standard-text)

`BLOCK-standard-text` · How the defects surfaced

**Measured, not read.** A headless browser opened every published card, walked its DOM for headings and landmarks, and computed each rendered text colour against the ground it actually sits on. A finding is a number that disagrees with the spec.

---

## Beat 3 — Mechanism (definition)

`BLOCK-definition` · The failure mode

### A promise with nothing enforcing it.

**A rule that ships as CSS and nothing else** looks finished from every angle a steward checks. R-29 styled a numeric table column in V3.7 and no renderer ever emitted the class, so every figure went out in proportional digits for two versions. R-24 banned the em dash retroactively and the validator skipped the only cards that still had them.

---

## Beat 4 — Comparison (comparison-table)

`BLOCK-comparison-table` · What a card gained

### The same picture, a different document.

| block | through v3.9 | v3.10 |
|---|---|---|
| Subhead | a styled div | a real heading |
| Chart name | "column chart" | its own rows |
| Beat | an unnamed region | named by its eyebrow |
| Marker | 2.10 to 1 | 4.54 to 1 |
| **Takeaway** | The pixels barely moved; the structure under them is new. | |

---

## Beat 5 — Counter (quote-as-evidence)

`BLOCK-quote-as-evidence` · The archive objection

> "They would look better under the new rules" is exactly the rationalization that corrupts an archive.

Stewards' log, June 2026

**The line V3.10 held.** A subhead rendering at browser default is broken markup, and a marker at 2.10 to 1 is a marker nobody can read. Those are defects and the archive absorbs the repair. Where a line breaks and which glyph opens a quote are design, so they wait for a card authored under the new version.

---

## Beat 6 — Application (checklist)

`BLOCK-checklist` · Before a render ships

### Read the headings alone.

- [x] One `h1`, and an `h2` for every subhead: they outline the card
- [x] Every glyph a reader must read clears 4.5 to 1
- [x] Every chart is named by its rows, not by its shape
- [x] Every color comes from a role, never from a ramp step
- [x] A skill finding is fixed, or answered by a rule that is named

---

## Beat 7 — Close (key-takeaway)

`BLOCK-key-takeaway` · The bottom line

**A standard that cannot lose an argument is a template.**

Most of the outside rules lost: the shadows stay retired, the measure stays short, no hue enters. What the audit was for is the handful that won, and the map that records which was which.

---

## Sources

- ADR-0017: V3.10, the interface-skills cut (10-GOVERNANCE/ADR/)
- `10-GOVERNANCE/SKILLS-interface-map.md`: adopted, overridden and ruled per case
- `jakubkrehel/skills` at 267330e, vendored in `.claude/skills/`
- CHANGELOG-supercard: [3.10.0]

---

## Authoring notes

- Mode `briefing` → Standard. Nine content blocks plus sources; the validator
  counts nine, inside the 10 to 14 band once the sources list is included.
- Beat 2 carries three blocks: the `stat-callout` is its one anchor, and the
  `bar-chart` and the `standard-text` are the content that earns it. Two
  content blocks per anchor is the floor of the G-9 band, and the first draft
  sat at 1:1 until the validator said so.
- The `bar-chart` uses word labels, so it takes the horizontal bar with its
  label lane rather than the column chart (G-15). The first draft's labels ran
  long enough for the geometry module's overflow guard to ellipsize them; R-38
  still announced them in full, but a truncated label is a weak block to look
  at, so they were cut to fit the lane instead.
- Beat 5's quote is the same stewards'-log line the V3.9 card used. That is
  deliberate rather than lazy: it is the sentence the retroactive-repair line
  is drawn from, and V3.10 had to draw it again in a harder place.
- The Application beat is a checklist rather than a process flow because the
  items are independent checks, not ordered steps.
- Every quotation mark in this card is authored straight and rendered curly by
  R-42. Read the render, not the source, to see the punctuation.
