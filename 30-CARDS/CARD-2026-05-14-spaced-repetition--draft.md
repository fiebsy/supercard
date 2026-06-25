# Spaced Repetition

| key | value |
|---|---|
| id | CARD-2026-05-14-spaced-repetition |
| type | card |
| length | standard |
| era | atlas |
| version | 3.0.0 |
| frozen_at_version | 3.0.0 |
| lifecycle | sample |
| owner | derick |
| created | 2026-05-14 |
| status | draft |
| research_report | 60-RESEARCH/BREAKDOWN-spaced-repetition.md |
| render | docs/cards/CARD-2026-05-14-spaced-repetition.html |
| tags | learning, memory, study-methods |
| supersedes | |
| related | |

> **Reference sample.** This is a fully-authored Standard Supercard, a worked
> example of the V3 grammar, not a template. Each beat names the block type it
> uses (from `INDEX-block-library`) and carries exactly one emphasized phrase.
> Read alongside `GRAMMAR-block-composition` to see the rules in practice, and
> alongside `60-RESEARCH/BREAKDOWN-spaced-repetition.md`, the deep-research
> report this card is a constrained `briefing` *view* of, to see the genealogy
> end to end.

---

## Beat 1 — Hook (card-in-hero)

`BLOCK-loft-card` · *the one elevated element on this card*

HERO-CARD: **Spaced Repetition**

> Reviewing material at widening intervals beats cramming: not by a little, by **roughly double the long-term retention** for the same total study time.

**Lede.** Spaced repetition schedules each review just before you'd forget, so every recall is effortful enough to strengthen the memory and cheap enough to be worth doing.

---

## Beat 2 — Evidence

`BLOCK-stat-callout` · single focal number

Without review, the forgetting curve is steep: people lose an estimated

**~70%**

of newly learned material within 24 hours. Spacing is the cheapest known intervention against that decay.

---

## Beat 3 — Mechanism

`BLOCK-numbered-principle` · how it works

1. **Learn**: encode the item once. Encoding alone fades fast.
2. **Wait**: let partial forgetting set in. The gap is the active ingredient.
3. **Recall**: retrieve from memory, not recognition. The effort is what consolidates.
4. **Re-space**: succeed, and the next interval widens; fail, and it shrinks.

The lever is step 3: **retrieval difficulty, timed to the edge of forgetting**, is what converts a fragile trace into a durable one.

---

## Beat 4 — Comparison

`BLOCK-comparison` · two things on the same axis

| | Massed practice (cramming) | Spaced practice |
|---|---|---|
| Feels like | Fluent, fast, confident | Effortful, slow, uncertain |
| Short-term test | Strong | Slightly weaker |
| **Long-term test** | **Collapses** | **Holds** |
| Total study time | Same | Same |

Cramming wins the rehearsal and loses the exam. The feeling of fluency is the trap: it is **not** evidence of durable learning.

---

## Beat 5 — Counter

`BLOCK-anti-pattern` · the honest steelman

Spaced repetition fails when it is run as a to-do list instead of a learning tool:

- **Cards you don't understand**: SRS schedules recall, it can't manufacture comprehension. Garbage in, garbage scheduled forever.
- **Over-long decks**: a daily queue you can't clear becomes a guilt engine, and you quit.
- **Recognition dressed as recall**: cloze deletions so easy the answer is obvious teach nothing.

The system is **only as good as the cards you feed it**: authoring is the real work.

---

## Beat 6 — Application

`BLOCK-checklist` · so what / how to act

- [ ] One idea per card: atomic, unambiguous, answerable from memory
- [ ] Write cards in your own words, after you understand the source
- [ ] Review daily, but cap new cards so the queue stays clearable
- [ ] Trust the algorithm's intervals: don't pre-review out of anxiety
- [ ] Delete or rewrite any card you fail repeatedly: the card is the bug

---

## Beat 7 — Close

`BLOCK-key-takeaway` · bottom line

**Spacing doesn't make learning faster. It makes it stick.** Same hours, same material; the difference is whether you still have it in six months.

---

## Sources

- Cepeda, N.J. et al. "Distributed practice in verbal recall tasks: A review and quantitative synthesis." *Psychological Bulletin*, 2006
- Ebbinghaus, H. *Memory: A Contribution to Experimental Psychology.* 1885
- Roediger, H.L. & Karpicke, J.D. "The power of testing memory." *Perspectives on Psychological Science*, 2006

---

## Authoring notes

- Chose Standard over Mini because the topic genuinely needs the Comparison and Counter beats: cramming-vs-spacing and the failure modes are load-bearing, not padding.
- Beat 2 uses a single `stat-callout` rather than a `stat-grid`: there is one anchoring number (the forgetting rate), and inventing parallel stats would fail the redundancy filter.
- Only the hero is lofted. Beats 4 and 5 use tables/lists kept deliberately flat to stay within the 1 to 3 elevation budget.
- The "~70%" figure is a commonly-cited approximation of Ebbinghaus-style decay; a published card should pin it to a specific replication rather than the original 1885 self-experiment.
