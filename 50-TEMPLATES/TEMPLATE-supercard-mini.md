# {{TITLE}}

| key | value |
|---|---|
| id | {{ID}} |
| type | card |
| length | mini |
| era | atlas |
| version | {{VERSION}} |
| frozen_at_version | {{VERSION}} |
| lifecycle | {{LIFECYCLE}} |
| owner | {{OWNER}} |
| created | {{CREATED}} |
| status | draft |
| research_report | 60-RESEARCH/BREAKDOWN-{{SLUG}}.md |
| render | docs/cards/{{ID}}.html |
| tags | {{TAGS}} |
| summary | {{ONE-LINE GALLERY BLURB}} |

---

<!--
RENDERER GRAMMAR (ADR-0010) — the card is the complete reader-visible source;
`npm --prefix app run render -- <this file>` turns it into the HTML. Parsed as:

  ## Beat N — Name (block-id)     section header; "Name (block-id)" is scaffold,
                                  never rendered. The `(block-id)` is a hint only.
  `BLOCK-xxx` · Eyebrow           REQUIRED first line. xxx = block type; the text
                                  after `·` IS the section eyebrow (≤ 4 words,
                                  names the content, never the position — R-14).
  ### Subhead                     optional 26/32 .tile (table / stat sections).
                                  Do NOT add to standard-text — its bold
                                  lead-clause is the anchor (R-14: one label/job).
  > **Lead.** rest                blockquote → the lofted hero hook (Beat 1 only).
  **−0.01em**                     a standalone bold line → focal .stat (in a
                                  stat-callout) or .takeaway (in a key-takeaway).
  **Lead.** rest of sentence…     prose; the opening **bold** is the lead-clause.
  | a | b |                       markdown table; a row whose first cell is
                                  **Takeaway** becomes the verdict row (G-11).
  - item                          list (sources in a footnote-source block).

Nothing visible is invented at render time. If you want an eyebrow/subhead, write
it here. Supported block ids: loft-card, stat-callout, table, standard-text,
key-takeaway, footnote-source, definition (others flow through the prose path).
-->

## Beat 1 — Hook (loft-card)

`BLOCK-loft-card` · {{EYEBROW ≤ 4 WORDS}}

### {{Dek — one sentence thesis, renders at body size + secondary ink}}

> **{{Lead clause.}}** {{One-sentence elaboration of the hook.}}

{{Optional lede paragraph below the hero.}}

---

## Beat 2 — Evidence (stat-callout)

`BLOCK-stat-callout` · {{EYEBROW}}

{{One sentence setting up the number.}}

**{{focal number}}**

{{One sentence naming what the stat means.}}

---

## Beat 3 — Mechanism (standard-text)

`BLOCK-standard-text` · {{EYEBROW}}

**{{Bold lead-clause.}}** {{One sentence elaboration. ≤ 60 words.}}

---

## Beat 7 — Close (key-takeaway)

`BLOCK-key-takeaway` · {{EYEBROW}}

**{{The one phrase a reader remembers.}}**

{{Optional one-line closer.}}

---

**Mini variant: 5 blocks total. Don't pad to Standard.**

If a topic naturally demands Beats 4 or 5, promote to Standard.

V3.1 notes for Mini (revised V3.3):

- Anchor budget: 2–3 anchors (L-5)
- No asterism rests (retired system-wide in V3.6 — R-24) and no em dash in prose (R-24)
- Bolded lead-clause still required on every prose block
- No `BEAT N`, no `N / TOTAL`, no renderer-version footer on the canvas (R-10 V3.3, I7)
