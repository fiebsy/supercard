# {{TITLE}}

| key | value |
|---|---|
| id | {{ID}} |
| type | card |
| length | xl |
| era | atlas |
| version | {{VERSION}} |
| frozen_at_version | {{VERSION}} |
| lifecycle | {{LIFECYCLE}} |
| owner | {{OWNER}} |
| created | {{CREATED}} |
| status | draft |
| research_report | 60-RESEARCH/BREAKDOWN-{{SLUG}}.md |
| render | docs/cards/{{ID}}.html |
| tags | |
| summary | {{ONE-LINE GALLERY BLURB}} |

---

<!--
RENDERER GRAMMAR (ADR-0010): this card is rendered by
`npm --prefix app run render -- <this file>` — never hand-authored HTML. Each
section must open with a `` `BLOCK-xxx` · Eyebrow `` annotation line (text after
`·` is the reader eyebrow, ≤ 4 words); `### ` is an optional subhead; the bold
lead-clause opens prose; `**standalone bold**` is a focal stat/takeaway; a
table row whose first cell is **Takeaway** is the verdict row. The block sketches
below are illustrative — follow the exact grammar in TEMPLATE-supercard-mini.md.
-->

## Beat 1 — Hook (card-in-hero)

HERO-CARD: {{TITLE}}

## Beat 2 — Evidence (multi-block)

- STAT-CALLOUT
- STAT-GRID or BAR-CHART
- SPARKLINE or LINE-CHART

## Beat 3 — Mechanism (multi-block)

- PROCESS or TIMELINE
- DEFINITION
- NUMBERED-PRINCIPLE
- ANNOTATED-VISUAL or CODE or EQUATION
- ASTERISM-REST (if beat carries a 5th block; see G-10)
- STANDARD-TEXT or further detail

## Beat 4 — Comparison

- COMPARISON or SLOPE-CHART
- TABLE (close with `**Takeaway**` row if ≥ 4 data rows)
- DOT-PLOT (optional)

## Beat 5 — Counter

- ANTI-PATTERN
- QUOTE-AS-EVIDENCE
- DISTRIBUTION or SCATTER

## Beat 6 — Application

- CHECKLIST
- NUMBERED-PRINCIPLE
- FAQ

## Beat 7 — Close

- KEY-TAKEAWAY
- PULL-QUOTE or STEWARDS-NOTE

---

**XL variant: 18-25 blocks total. Don't compress to Standard.**

- Run the redundancy filter on every block — XL is where padding hides.
- Section dividers mark beat boundaries only, not every section.

V3.1 notes for XL (revised V3.3):

- Anchor budget: 5–8 anchors (L-5)
- No asterism rests (retired system-wide in V3.6 — R-24). A long multi-block beat (Evidence, Mechanism) breaks to an anchor or splits into beats; the 64pt gap carries the rest. No em dash in prose (R-24)
- Every prose block opens with a bolded 2–6-word lead-clause
- Every ≥ 4-row table closes with a `**Takeaway**` row
- No `BEAT N`, no `N / TOTAL`, no renderer-version footer on the canvas (R-10 V3.3, I7)
