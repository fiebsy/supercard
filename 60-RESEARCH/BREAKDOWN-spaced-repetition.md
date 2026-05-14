# BREAKDOWN — Spaced Repetition

| key | value |
|---|---|
| id | BREAKDOWN-spaced-repetition |
| type | breakdown |
| topic | Spaced repetition as a learning method |
| slug | spaced-repetition |
| era | atlas |
| owner | derick |
| created | 2026-05-14 |
| updated | 2026-05-14 |
| status | active |
| modes_derived | briefing |
| derived_cards | CARD-2026-05-14-spaced-repetition |
| source_count | 6 |
| confidence | high |
| supersedes | |
| related_reports | |

> **What this file is.** The deep research report for spaced repetition — the
> uncompressed source of truth `CARD-2026-05-14-spaced-repetition` is derived
> from (ADR-0005, ADR-0006). Registered in `INDEX-research-reports.md`.
>
> **Reference sample.** This is a fully-authored research report — the
> genealogy of the worked sample card. It deliberately holds more than the
> `briefing` card uses, to show what "uncompressed source of truth" means.
> Read alongside `30-CARDS/CARD-2026-05-14-spaced-repetition--draft.md`.

---

## 0. Research brief

- **Question.** Why does reviewing material at widening intervals beat cramming, and how do you actually do it well?
- **Why now.** Repo needs a worked example pairing a research report to its card.
- **Mode(s) anticipated.** `briefing` first; the report is deliberately deep enough to also feed a future `deep-dive` or `reference` card.
- **In scope.** The spacing effect, the testing/retrieval effect, the forgetting curve, SRS algorithms at a conceptual level, card-authoring practice, failure modes.
- **Out of scope.** Specific SRS software comparisons (Anki vs. SuperMemo vs. others); the neuroscience of consolidation below the behavioural level; spacing in motor-skill learning.
- **Audience posture.** Reader is a motivated self-learner. Assume they have tried cramming and found it fails them; do not assume they know the terms "spacing effect," "retrieval practice," or "forgetting curve."
- **Source posture.** Web research against the established cognitive-psychology literature, cross-checked across a meta-analysis, primary experiments, and a foundational text.

## 1. Research log

- **Pass 1 — the core effect.** Searched the distributed-practice literature. The Cepeda et al. 2006 meta-analysis in *Psychological Bulletin* is the anchor: it synthesizes the spacing effect across hundreds of comparisons. Established that the effect is large, robust, and old.
- **Pass 2 — the mechanism.** Separated two effects that are often conflated: the *spacing* effect (gaps between reviews help) and the *testing/retrieval* effect (recalling beats re-reading). Roediger & Karpicke 2006 is the anchor for the second. The mechanism the card needs is the *interaction*: spacing schedules retrieval to the point of maximum useful difficulty.
- **Pass 3 — the forgetting curve.** Traced the "~70% lost in 24 hours" figure back. It descends from Ebbinghaus's 1885 self-experiment; modern replications (e.g. Murre & Dros 2015) recover a curve of the same shape but the exact percentage is population- and material-dependent. Flagged as an approximation — see Contested claims.
- **Pass 4 — practice and failure modes.** Practitioner literature (Wozniak's SuperMemo writing, Nielsen's essays on Anki) for how SRS is used well and badly. Consistent theme: the algorithm is the easy part; card authoring is the hard part.
- **Searches that returned little:** attempts to find a single canonical "optimal interval multiplier" — there isn't one; intervals are adaptive and implementation-specific.

## 2. Executive synthesis

Spaced repetition beats massed practice (cramming) not marginally but roughly
2× on long-term retention for the *same total study time* — one of the largest,
oldest, and most replicated effects in learning science. It works by combining
two distinct effects: **spacing** (gaps between reviews) and **retrieval
practice** (recalling rather than re-reading). The active ingredient is
*difficulty timed to the edge of forgetting*: a recall that is effortful but
still succeeds is what converts a fragile memory trace into a durable one.
Modern SRS software schedules that moment automatically. The catch: the
software can only schedule recall, not manufacture understanding — so the real
work is authoring atomic, well-understood cards, and the dominant failure mode
is treating the daily queue as a to-do list instead of a learning tool.

---

# The seven beats

## Beat 1 — Hook

- **Essence.** Reviewing at widening intervals beats cramming by roughly double the long-term retention — for the *same* total study time. The hours are equal; only the schedule differs.
- Candidate framings:
  - "Spaced repetition: same study hours, double the retention — the only variable is *when* you review." [S1]
  - "Cramming wins the rehearsal and loses the exam." (sharp, slightly informal)
  - "The gap between reviews isn't wasted time — it's the active ingredient."
- Why this is the hook and not the mechanism: the counter-intuitive, screenshot-worthy claim is the *free lunch* — better results at no extra time cost. The mechanism (Beat 3) explains it; the hook just has to land it.

## Beat 2 — Evidence

- **~2× long-term retention** for spaced vs. massed practice at equal total study time — the headline result of the Cepeda et al. 2006 meta-analysis synthesizing distributed-practice studies. [S1] The exact multiplier varies with retention interval and material; "roughly double" is the defensible summary.
- **~70% of newly learned material lost within ~24 hours** without review — the popularly cited figure for the steep early drop of the forgetting curve. [S2, approximation — see Contested claims] Descends from Ebbinghaus 1885; the *shape* of the curve replicates, the exact percentage is material- and population-dependent.
- **Testing > restudying.** Roediger & Karpicke 2006: students who were tested on material retained substantially more on a delayed test than students who restudied it for the same time — even though restudying *felt* more productive. [S3]
- The spacing effect is **one of the most replicated findings in experimental psychology** — documented for well over a century, across verbal material, ages, and retention intervals. [S1][S5]
- Qualitative but load-bearing: learners *systematically misjudge* which method works. Fluency during massed practice is mistaken for durable learning. [S3][S4]

## Beat 3 — Mechanism

The four-step loop, with the lever called out:

1. **Learn** — encode the item once. Encoding alone fades fast; this step is necessary but not where durability comes from.
2. **Wait** — let partial forgetting set in. The gap is not idle time — it is the active ingredient. A review before any forgetting has occurred is nearly wasted. [S1]
3. **Recall** — retrieve the item from memory (not recognition). The *effort* of retrieval is what consolidates the trace. This is the lever. [S3]
4. **Re-space** — succeed and the next interval widens; fail and it shrinks. The schedule adapts to the item's current strength. [S6]

- **The actual lever is step 3, timed by step 2.** A successful-but-effortful retrieval — "desirable difficulty" — strengthens the memory far more than an easy one. Spacing's whole job is to schedule each retrieval at the point where it is maximally effortful *and still succeeds*. Too soon: too easy, little gain. Too late: it fails, and you are re-learning, not strengthening. [S1][S5]
- **What SRS software adds.** It tracks per-item strength and computes the next interval, so the learner doesn't have to. The algorithm (SM-2 and descendants) is conceptually simple: right answer → multiply the interval; wrong answer → reset it. [S6] The sophistication is in the bookkeeping, not the idea.
- Edge conditions: the loop only works on items the learner *understands*. On an un-understood item, step 3 has nothing to retrieve — it degrades into rote pattern-matching.

## Beat 4 — Comparison

Massed practice (cramming) vs. spaced practice, on a shared axis:

| dimension | massed (cramming) | spaced |
|---|---|---|
| feels like | fluent, fast, confident | effortful, slow, uncertain |
| short-term test (hours later) | strong | slightly weaker |
| long-term test (weeks/months) | collapses | holds |
| total study time | same | same |

- The trap is the *feeling*. Massed practice produces fluency, and fluency feels like learning — but fluency is short-term availability, not durable storage. [S3][S4]
- Commonly confused with: **re-reading** and **highlighting**, which are massed, recognition-based, and among the least effective techniques studied. Spacing + retrieval is the opposite of both. [S4]
- Related but distinct: **interleaving** (mixing topics within a session) is a separate desirable difficulty; it complements spacing but is not the same thing. (Out of scope for this report; flag for a future extending pass.)

## Beat 5 — Counter

The honest steelman — where spaced repetition weakens or fails:

- **It schedules recall; it cannot manufacture comprehension.** A card the learner doesn't understand gets scheduled forever and never sticks. "Garbage in, garbage scheduled." [S4]
- **The queue becomes a guilt engine.** Add cards faster than you can clear the daily review queue and the backlog grows; learners abandon the system entirely. This is the dominant real-world failure mode, more common than any flaw in the algorithm. [S4]
- **Recognition dressed as recall.** Cloze deletions so easy the answer is obvious, or cards with the answer leaking in the question, exercise recognition — which spacing does not strengthen. [S4]
- **Front-loaded cost.** Authoring good atomic cards is slow, deliberate work. The method's payoff is real but deferred; the cost is immediate. Many quit before the payoff arrives.
- Strongest skeptic's objection: *"If I just need it for an exam next week, cramming works fine."* Honest response: true — for genuinely short horizons, massed practice is adequate and the spacing advantage is small. Spacing's case is **durable** retention; if you don't need durability, you don't need spacing. [S1]

## Beat 6 — Application

- **One idea per card.** Atomic, unambiguous, answerable from memory in one step. Compound cards fail unpredictably and you can't tell which part broke. [S4]
- **Write cards in your own words, after you understand the source** — never copy-paste. The authoring *is* part of the learning, and a card you didn't understand can't be rescued by scheduling.
- **Review daily, but cap new cards.** A small, clearable daily queue beats an ambitious one you abandon. Consistency beats volume. [S4]
- **Trust the intervals.** Don't pre-review out of anxiety — reviewing early removes the difficulty that does the work.
- **Delete or rewrite any card you fail repeatedly.** A card that won't stick is a bug in the card, not in your memory. [S4]
- Anti-patterns to avoid: long un-clearable decks; cards you don't understand; recognition-style cloze deletions (all from Beat 5).

## Beat 7 — Close

- Candidate takeaways:
  - **"Spacing doesn't make learning faster — it makes it stick."** (sharpest; used by the card)
  - "Same hours, same material — the difference is whether you still have it in six months."
  - "The algorithm is easy. The cards are the work."
- What to remember if nothing else: equal study time, scheduled differently, roughly doubles what survives — but only for cards you actually understand.

---

# Research apparatus

## Source register

| key | source (author, title, publisher/year, URL) | type | reliability | what it supports |
|---|---|---|---|---|
| S1 | Cepeda, N.J., Pashler, H., Vul, E., Wixted, J.T., Rohrer, D. — "Distributed practice in verbal recall tasks: A review and quantitative synthesis" — *Psychological Bulletin* 132(3), 2006 | meta-analysis / primary | high | the ~2× effect; spacing as one of the most replicated findings; timing-of-gap reasoning |
| S2 | Ebbinghaus, H. — *Memory: A Contribution to Experimental Psychology* — 1885 | foundational primary | high (historical) | the forgetting curve's shape; origin of the "~70% in 24h" figure |
| S3 | Roediger, H.L. & Karpicke, J.D. — "The power of testing memory: Basic research and implications for educational practice" — *Perspectives on Psychological Science* 1(3), 2006 | review / primary | high | the testing/retrieval effect; learners misjudging fluency |
| S4 | Practitioner literature on SRS card authoring (Nielsen, "Augmenting Long-term Memory"; Wozniak, SuperMemo "20 rules of formulating knowledge") | expert practitioner | medium | atomic cards; queue-as-guilt-engine failure mode; recognition-vs-recall errors |
| S5 | Murre, J.M.J. & Dros, J. — "Replication and Analysis of Ebbinghaus' Forgetting Curve" — *PLOS ONE*, 2015 | primary replication | high | the forgetting curve's *shape* replicates; exact percentages are variable |
| S6 | Wozniak, P. — SM-2 algorithm description (SuperMemo) | primary / docs | medium | the conceptual SRS algorithm: right answer widens interval, wrong answer resets it |

Reliability guide: **high** = peer-reviewed primary research, authoritative reference, or primary document. **medium** = reputable practitioner writing with a track record. **low** = single uncorroborated source or popularization.

## Key quotes bank

- > "Spaced practice produced superior recall to massed practice in the overwhelming majority of comparisons." — paraphrase-flag: this is a *summary* of S1's finding, not a verbatim lift. Do **not** use as a pull-quote without locating exact wording.
- (No verbatim quotes captured at the strength needed for a `pull-quote` block. A future extending pass should pull exact sentences from S1 and S3 if the card author wants a quote block.)

## Numbers & data bank

| value | units | what it measures | source | date / population | confidence |
|---|---|---|---|---|---|
| ~2× | ratio | long-term retention, spaced vs. massed, equal study time | S1 | 2006 meta-analysis, verbal recall tasks | high (as "roughly double"); the precise multiplier varies |
| ~70% | percent | newly learned material lost without review | S2 | ~24 hours; Ebbinghaus 1885 self-experiment | medium — approximation, see Contested claims |
| 4 | count | steps in the learn→wait→recall→re-space loop | — | this report's framing | n/a (structural, not empirical) |

## Contested claims

- **"~70% lost in 24 hours."** The *shape* of the forgetting curve — steep early drop, then a long tail — replicates reliably (S5). The specific figure traces to Ebbinghaus's 1885 self-experiment on nonsense syllables (S2), which is a single subject and unusually hard material. Modern replications recover the curve but the exact percentage depends heavily on material, learner, and conditions. **A `briefing` card may use "~70%" as a well-known approximation; a `reference` or `deep-dive` card should pin it to a specific modern study or soften to "most."**
- **The exact spacing multiplier.** "~2×" is a defensible round number from S1, but the effect size depends on the retention interval tested — longer delays show larger spacing advantages. Do not present "2×" as a constant.

## Open questions & gaps

- **Interleaving** (mixing topics within a session) is a sibling desirable-difficulty effect that this report deliberately left out of scope. A future extending pass should add it — it is the most natural Beat 4 expansion.
- **Optimal interval functions.** This report stays conceptual on SRS algorithms (SM-2 and descendants). A `reference`-mode card would need the actual interval math; that research has not been done here.
- **Domain limits.** The evidence here is verbal/declarative learning. How well spacing transfers to motor skills, conceptual problem-solving, and creative work is not covered.
- **No verbatim quotes** were captured at pull-quote strength — see the quotes bank.

## Confidence assessment

Overall **high**. The core position in §2 — spacing ≈ 2× durable retention at
equal time, via difficulty-timed retrieval — rests on `high`-reliability
peer-reviewed sources (S1, S3, S5) and is among the best-replicated results in
the field. The two soft spots are both flagged: the "~70%" figure is an
approximation (Contested claims), and the practice/failure-mode material (Beat
5–6) rests on `medium` practitioner sources rather than controlled studies —
defensible for a `briefing` card, but a `deep-dive` should corroborate the
queue-abandonment claim against retention-rate studies of SRS users. Nothing
found in research would overturn the headline; the conclusion is stable.

---

## Card derivation log

### CARD-2026-05-14-spaced-repetition — briefing — 2026-05-14

- **Mode → length variant:** `briefing` → Standard (10–14 blocks, all 7 beats, ~one block per beat).
- **Admitted:** all 7 beats. Hook → `loft-card`. Evidence → a single `stat-callout` on the ~70% figure. Mechanism → `numbered-principle` (the 4-step loop). Comparison → `comparison` block (the massed-vs-spaced table). Counter → `anti-pattern` (3 failure modes). Application → `checklist` (5 items). Close → `key-takeaway`.
- **Dropped:** the ~2× headline stat was carried in prose rather than its own `stat-callout` (the card uses the ~70% figure as its single focal number — two stat blocks would have failed the redundancy filter). The skeptic's "cramming is fine for next week" objection was cut for length. Interleaving, the SM-2 algorithm detail, and the domain-limits discussion were all dropped — available in this report for a future `deep-dive`.
- **Split:** none — single Standard card.
- **Render:** `docs/cards/CARD-2026-05-14-spaced-repetition.html`
