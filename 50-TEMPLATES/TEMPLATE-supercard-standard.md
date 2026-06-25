# {{TITLE}}

| key | value |
|---|---|
| id | {{ID}} |
| type | card |
| length | standard |
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
| supersedes | |
| related | |

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

> [Postcard inheritance — capture the entire essence in one screenshot. Card-in-hero with one focal visual or stat. ≤ 40 words including title and takeaway. The bolded phrase inside the hero is the card's thesis.]

**Lede.** [One self-contained sentence that, with the hero card, conveys the whole topic. The bolded lead-clause IS the block's single emphasis — no further bold runs.]

---

## Beat 2 — Evidence

STAT-CALLOUT or BAR-CHART or STAT-GRID

**[focal number].** [One sentence naming what the stat means and its direction — verbal anchor (V3.1 § stat-callout). Bare numbers are forbidden.]

---

## Beat 3 — Mechanism

PROCESS or DEFINITION or NUMBERED-PRINCIPLE

**[Mechanism opens with a bolded 2–6-word lead-clause.]** [How it works — one or two short sentences. Keep `standard-text` blocks ≤ 75 words and ≤ 4 sentences. Use the thought-group ramp (8pt between thought-groups, 16pt between sub-paragraphs) when splitting prose.]

---

## Beat 4 — Comparison

COMPARISON or SLOPE-CHART or TABLE

[Two or three things on the same axis. If using TABLE with ≥ 4 data rows, close with a `**Takeaway**` row stating the verdict in one bolded clause (V3.1 § G-11).]

---

## Beat 5 — Counter

ANTI-PATTERN or QUOTE-AS-EVIDENCE (opposing) or DISTRIBUTION

**[Counter's bolded lead-clause names the steel-manned view.]** [The honest steelman. At least one pull-quote OR key-takeaway must state the opposing view in one sentence (L-6).]

---

## Beat 6 — Application

CHECKLIST or NUMBERED-PRINCIPLE or FAQ

[So what. End the beat with a numbered-principle or application-checklist (L-6).]

---

## Beat 7 — Close

KEY-TAKEAWAY or PULL-QUOTE

**[The one phrase a reader remembers.]** [Optional one-sentence elaboration. The bolded clause is the card's thesis; reading only the bolded clauses across all beats should yield this same thesis (V3.1 first-pass extraction test).]

---

## Sources

- [Source 1 — Author, Title, Publisher/Year, URL]
- [Source 2]
- [Source 3]

---

## Authoring notes

- [Anything Claude or future-Derick should know about why decisions in this card were made]
- [Edge cases considered]
- [Alternatives rejected]

---

## V3.1 authoring checklist (run before publishing)

The 10-item ADHD scan-ability gate from PRINCIPLES — any "no" blocks the render.

- [ ] Every `standard-text` block opens with a bolded 2–6-word lead-clause
- [ ] No block contains more than one bolded run
- [ ] Reading only the bold clauses yields the card's thesis (first-pass extraction)
- [ ] No `standard-text` block exceeds 75 words or 4 sentences
- [ ] Anchor-to-content ratio per beat is between 1:2 and 1:4
- [ ] No beat has > 4 consecutive content blocks without an asterism or anchor
- [ ] Every beat with ≥ 5 blocks has a centered `⁂` after block 4
- [ ] Rendered canvas is free of scaffold chrome — no `BEAT N`, no `N / TOTAL` counters, no renderer-version footer (R-10 V3.3)
- [ ] Every stat-callout has a verbal-anchor sentence; every ≥ 4-row table has a `**Takeaway**` row
- [ ] Body renders at 17pt SF Pro Rounded, 26pt leading, ragged-right, no italic-for-emphasis
