# STEWARDS' LOG — 2026

| key | value |
|---|---|
| id | STEWARDS-LOG-2026 |
| type | governance |
| era | atlas |
| version | 3.0.0 |
| owner | derick |
| updated | 2026-06-25 |

The design diary. Append-only, newest at top. Captures **the noticing** — patterns observed, temptations resisted, blocks that almost made it in, shifts in taste. Distinct from the CHANGELOG (what changed) and ADRs (why a single thing was decided).

Append entries via SupercardOps `logStewardEntry()` or directly.

---

## 2026-06-27 — derick — [foundation]

**Context.** Looking at the published cards side by side, they all read the same:
prose, a list, a table, repeat. The screenshots that prompted this were two
comparison tables and a mapping table — competent, but interchangeable. Three
things were wrong under the surface. The block library had been *advertising* a
whole chart family (`bar-chart`, `line-chart`, `stat-grid`, `stat-callout`) as
`stable` for a year, and not one of them was ever wired into a render path — the
catalogue was writing checks the renderer couldn't cash. A table's last-row
hairline stacked with the section divider into a visible double line. And the
cover couldn't open with an eyebrow, because R-13 forbade the kicker slot
outright.

**Action.** Shipped V3.7 (ADR-0014). Built the four numeric/chart blocks for real
in *both* paths, with the SVG geometry duplicated verbatim so the HTML twin and
the React card stay pixel-identical. Chose to author charts as a plain `| label |
value |` table — the block id picks chart-vs-table — so no new syntax enters a
card and an LLM reading the spec still sees legible markdown. Permitted exactly
**one** cover eyebrow (R-27) under the same discipline as any other eyebrow,
rather than re-opening the cover to chrome. Fixed the double line at base level
(R-28, retroactive) and the ragged mobile columns with a fixed grid (R-29).

**Follow-up.** Two render paths now carry duplicated chart geometry — the first
real DRY violation in the system. It's small and commented as a parity pair, but
if a third chart type lands, that's the signal to extract a shared geometry
module both paths import, not to copy the math a third time. `column-chart` and
`area-chart` are still catalogued-but-unbuilt; same trap as before — watch that
the gap between catalogue and renderer doesn't silently reopen.

---

## 2026-06-25 — derick — [temptation]

**Context.** The V3.5 reading-layer pass (ADR-0009) measured a working render
against Apple's tracking table and WCAG and found four small drifts: R-9's
positive body tracking, a 48pt beat gap where Apple runs 60–80, three text inks
below the 4.5:1 floor, and nine type sizes where the canon wants three. The
obvious move — and the one I had to talk myself out of — was to *fix the three
published V3.x cards too*. They sit right there in `docs/cards/`; re-inking them
to #1A1A1A and re-tracking the body to −0.01em is a five-minute script. And they
would look better.

**Action.** Didn't. The whole point of frozen-at-version (P8 / ADR-0003) is that
"they would look better under the new rules" is exactly the rationalization that
corrupts an archive — it's how you end up unable to reconstruct what V3.4
actually shipped. The four changes apply only to `frozen_at_version: 3.5.0`; the
CSS scopes every new metric under `.canvas.v3-5` and leaves the base `:root` ink
tokens alone; R-9 and R-18 stay verbatim in the spec, superseded-not-deleted,
next to R-19 that replaces them. The old cards keep their authored render. If a
V3.x card ever deserves the V3.5 treatment, it gets *re-authored* under 3.5.0
with a migration note — voluntarily, visibly — not silently rewritten.

**Follow-up.** Shipped all four as one version because they were validated as
one render — a half-migration (new inks, old tracking) is a render nobody
checked. Watch the tinted-surface caveat: tertiary `--ink-3` #767676 clears
4.5:1 on white but only ≈4.3:1 on `--surface-tint`. The validator now re-checks
against the tint, but if authors keep tripping it, that's signal the tinted
variant should carry its own darker tertiary token rather than leaning on author
discipline.

---

## 2026-05-14 — derick — [foundation]

**Context.** The pipeline named the breakdown the source of truth (ADR-0005) but parked it in `40-LAB/`, the drawer labelled "experiments" — no home, no registry, no way to know a topic had already been researched. And rendering was Stage 5, *optional*: cards shipped as markdown nobody had looked at, and the one render in `docs/` had nowhere for a second card to go. Two gaps in the most-used path: where research *lives*, and how the user actually *sees* the result.

**Action.** Gave research a real address — `60-RESEARCH/`, with a registry (`INDEX-research-reports`) that makes "has this been researched?" a one-grep question and makes duplication a pipeline-gated mistake (ADR-0006). Rewrote `TEMPLATE-breakdown` from a thin 7-beat stub into an extensive deep-research-report spec — research brief, research log, full apparatus (rated source register, quotes bank, numbers bank, contested claims, open questions, confidence) — so the report can inform a drafting agent it will never meet. Made render-and-publish mandatory (ADR-0007): every request now ends with an HTML card in `docs/cards/` and a gallery entry, viewable online. Wrote `BREAKDOWN-spaced-repetition` as the worked-example genealogy of the sample card.

**Follow-up.** The registry and the gallery are both hand-maintained indexes — watch for drift; if it recurs, that's signal for a validator (or CI) rather than more discipline. The breakdown template is deliberately heavy — if authors start skipping its apparatus sections, that's signal the floor is set too high for `summary`-mode requests and the template may need a tiered "light vs. full" split.

---

## 2026-05-14 — derick — [foundation]

**Context.** The system could describe a finished card but not the *act of building one* — research, structure, and block selection lived as fragments across INDEX, GRAMMAR, and LENGTHS. A request to "research X" or "summarize this book" had no single repeatable path.

**Action.** Added the assembly pipeline (`PIPELINE-card-assembly`): Request → Mode → Deep research → Breakdown MD → Supercard MD. Introduced **modes** as the adaptability dimension — `summary` / `briefing` / `deep-dive` / `reference` — distinct from length; a mode biases research depth, length, block selection, and redundancy posture. Made the **breakdown MD** the uncompressed source of truth and the card a constrained *view* of it, so the same research can yield different cards. Shipped `TEMPLATE-breakdown` and a `supercard` skill.

**Follow-up.** `deep-dive` deliberately allows multi-part cards past the 25-block cap — watch the first few to confirm splitting doesn't become an excuse for redundancy. If a fifth mode is needed, that's signal for an ADR formalizing the mode system.

---

## 2026-04-29 — derick — [foundation]

**Context.** V3 system goes live today. Three foundational ADRs accepted (named eras, four-tier lifecycle, frozen-at-authored-version). Folder structure created. SupercardOps tooling stubbed. INDEX established as the canonical entry point.

**Action.** Day-1 setup complete. Beginning the 38-block authoring pass. Will document each block as a separate doc in `20-BLOCKS/` with full Composition / Rationale / Precedents / Common Mistakes / Shape Test sections.

**Follow-up.** First real V3 Supercard expected by end of Week 1. Will run audit workflow against it to validate the system actually catches drift.

---

*(future entries will append above this line)*

---

## How to use this log

**When to write an entry.** When you notice something worth remembering: a pattern across cards, a block that's not pulling its weight, a temptation to add complexity, a shift in how you read your own work, a small judgment call that doesn't merit an ADR.

**Entry shape.**

```
## YYYY-MM-DD — author — [tag]

**Context.** What you noticed, where you were, what triggered it.

**Action.** What you did, or didn't do, in response.

**Follow-up.** (optional) What to revisit later.
```

**Common tags.**

- `[foundation]` — system-level design moments
- `[block]` — observations about a specific block
- `[card]` — observations about a specific card
- `[drift]` — caught yourself drifting from principles
- `[temptation]` — almost added something; resisted
- `[promotion]` — promoted a block from Experimental → Stable
- `[rejection]` — rejected an idea (and why)
- `[review]` — quarterly review notes

**When to escalate.** If a log entry recurs across multiple weeks (the same temptation, the same drift, the same gap), it's signal that an ADR or block change is needed. Escalate to RFC in `40-LAB/`.
