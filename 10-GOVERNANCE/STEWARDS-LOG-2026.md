# STEWARDS' LOG — 2026

| key | value |
|---|---|
| id | STEWARDS-LOG-2026 |
| type | governance |
| era | atlas |
| version | 3.0.0 |
| owner | derick |
| updated | 2026-04-29 |

The design diary. Append-only, newest at top. Captures **the noticing** — patterns observed, temptations resisted, blocks that almost made it in, shifts in taste. Distinct from the CHANGELOG (what changed) and ADRs (why a single thing was decided).

Append entries via SupercardOps `logStewardEntry()` or directly.

---

## 2026-05-14 — derick — [foundation]

**Context.** The system could describe a finished card but not the *act of building one* — research, structure, and block selection lived as fragments across INDEX, GRAMMAR, and LENGTHS. A request to "research X" or "summarize this book" had no single repeatable path.

**Action.** Added the assembly pipeline (`PIPELINE-card-assembly`): Request → Mode → Deep research → Breakdown MD → Supercard MD. Introduced **modes** as the adaptability dimension — `summary` / `briefing` / `deep-dive` / `reference` — distinct from length; a mode biases research depth, length, block selection, and redundancy posture. Made the **breakdown MD** the uncompressed source of truth and the card a constrained *view* of it, so the same research can yield different cards. Shipped `TEMPLATE-breakdown` and a `supercard` skill.

**Follow-up.** `deep-dive` deliberately allows multi-part cards past the 25-block cap — watch the first few to confirm splitting doesn't become an excuse for redundancy. If a fifth mode is needed, that's signal for an ADR formalizing the mode system.

---

## 2026-04-29 — derick — [foundation]

**Context.** V3 system goes live today. Three foundational ADRs accepted (named eras, four-tier lifecycle, frozen-at-authored-version). Folder structure created in Drive. SupercardOps Apps Script installed. INDEX pinned to a Claude Project.

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
