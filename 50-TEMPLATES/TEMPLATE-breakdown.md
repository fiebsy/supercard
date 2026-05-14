# BREAKDOWN — {{TITLE}}

| key | value |
|---|---|
| id | BREAKDOWN-{{SLUG}} |
| type | breakdown |
| topic | {{TOPIC}} |
| slug | {{SLUG}} |
| era | atlas |
| owner | {{OWNER}} |
| created | {{CREATED}} |
| updated | {{UPDATED}} |
| status | active |
| modes_derived | {{MODES}} |
| derived_cards | {{CARD-IDS}} |
| source_count | {{N}} |
| confidence | {{high \| mixed \| low}} |
| supersedes | |
| related_reports | |

> **What this file is.** The deep research report for `{{TOPIC}}` — the
> uncompressed source of truth every Supercard on this topic is derived from
> (ADR-0005, ADR-0006). It lives in `60-RESEARCH/` and is registered in
> `INDEX-research-reports.md`.
>
> **Author it for completeness, not for a card.** There is **no length budget**
> here. The card in `30-CARDS/` is a *constrained view* of this file; this file
> is the superset. Capture more than any one card will use — a future
> `deep-dive` or `reference` card, or a drafting agent you will never meet,
> draws only from what is written here. If a fact is not in this report, it
> cannot reach a card. **When in doubt, include it.**
>
> **Every claim carries its source and its confidence.** Unsourced claims do
> not survive to a card. See `10-GOVERNANCE/PIPELINE-card-assembly.md`.

---

## 0. Research brief

*Fill this before researching. It frames the whole report.*

- **Question.** [The single question this report answers. One sentence.]
- **Why now.** [What triggered the request — the user's actual ask, verbatim if useful.]
- **Mode(s) anticipated.** [Which card modes this report is likely to feed: summary / briefing / deep-dive / reference. A report can feed several.]
- **In scope.** [What this report covers.]
- **Out of scope.** [What it deliberately does not cover — name it so a later pass knows the boundary was a choice, not an oversight.]
- **Audience posture.** [What the eventual reader already knows; what they must not be assumed to know.]
- **Source posture.** [User-supplied sources / web research / prior cards + reports / a mix. Name it.]

## 1. Research log

*The methodology trail. How the research was actually done — so a reader can
judge and a later pass can extend it without re-treading ground.*

- [Pass 1 — what was searched, where, what was found, what was ruled out.]
- [Pass 2 — follow-ups, contradictions chased, gaps that opened.]
- [Searches that returned nothing useful — record them so the next pass doesn't repeat them.]
- [Prior `60-RESEARCH/` reports and `30-CARDS/` / `90-ARCHIVE/` cards consulted.]

## 2. Executive synthesis

*The whole report in one tight pass — written last, read first. A drafting
agent should be able to read only this section and the beats it needs.*

[3–6 sentences. The defensible position this research lands on. Not a teaser —
the actual answer, compressed.]

---

# The seven beats

> Dump **all** relevant content under each beat — every fact, every number,
> every quote, every mechanism, every counter. Sources inline as `[S1]`,
> `[S2]`, … keyed to the Source register. Mark confidence where it is not
> obviously high: `[S3, low]`, `[S4, contested — see §Contested claims]`.
> A beat may run long; that is correct. A beat may also be thin if the topic
> genuinely lacks that beat — say so explicitly rather than padding.

## Beat 1 — Hook

*The single essence. The one screenshot-worth idea the whole topic reduces to.*

- [The essence, stated plainly.]
- [2–4 candidate framings of the hook — let the card author pick. Each one self-contained.]
- [Why this is the hook and not something adjacent.]

## Beat 2 — Evidence

*Every relevant number, stat, finding, and result — each with its source, its
units, and the date or population it describes.*

- [Stat — value, units, what it measures, source, date/population, confidence.]
- [Stat — …]
- [Findings that are qualitative but load-bearing.]
- [Note any stat that is an approximation, a popularization, or a single-study result — flag it so a card doesn't over-claim.]

## Beat 3 — Mechanism

*How it works. Every structural detail — the moving parts, the sequence, the
causal chain.*

- [Step / component — what it is, what it does, how it connects to the next.]
- [The actual lever — the part that does the real work, distinguished from the parts that are scaffolding.]
- [Edge conditions in the mechanism: where it speeds up, slows down, breaks.]

## Beat 4 — Comparison

*What it sits against. Every relevant contrast, alternative, or competing
approach — on a shared axis so the comparison is fair.*

- [Alternative / contrast — the shared dimension, where each option wins, where each loses.]
- [What the topic is commonly confused with, and the distinction.]
- [If there is no real comparison, say so — but check hard first; most topics have one.]

## Beat 5 — Counter

*The honest steelman. Every counter-argument, limitation, failure mode, edge
case, and condition under which the topic's claim weakens or fails.*

- [Counter-argument — stated at full strength, with its source.]
- [Failure mode — when/why the thing breaks.]
- [Limitation / scope condition — where the claim simply doesn't apply.]
- [The strongest objection a smart skeptic would raise — and the honest response, if there is one.]

## Beat 6 — Application

*So what. Every actionable takeaway a reader could actually use — concrete
enough to act on.*

- [Action — specific, doable, with the reasoning that makes it non-obvious.]
- [Action — …]
- [What to avoid doing (the anti-patterns), if the topic has well-known traps.]

## Beat 7 — Close

*The bottom line. Candidate one-sentence takeaways the card might end on.*

- [Candidate takeaway 1 — the sharpest one-sentence version.]
- [Candidate takeaway 2 — an alternate framing.]
- [What the reader should remember if they remember nothing else.]

---

# Research apparatus

> These sections are not beats — they are the scaffolding that makes the beats
> trustworthy and re-usable. A drafting agent leans on them to source claims,
> avoid contested ground, and know what is *not* yet known.

## Source register

*Every source, numbered, keyed to the inline `[S#]` markers above. Rate each one
so a card author knows how much weight a claim can bear.*

| key | source (author, title, publisher/year, URL) | type | reliability | what it supports |
|---|---|---|---|---|
| S1 | [Author, Title, Publisher/Year, URL] | [primary research / review / book / news / docs / expert blog] | [high / medium / low] | [the claims it backs] |
| S2 | | | | |

Reliability guide: **high** = peer-reviewed primary research, authoritative
reference, or primary document. **medium** = reputable secondary reporting,
practitioner writing with a track record. **low** = single source, popularization,
or anything you could not corroborate.

## Key quotes bank

*Verbatim quotes, exactly as written, for possible use in `quote-as-evidence` or
`pull-quote` blocks. A pull-quote must be a true lift — never a paraphrase
(GRAMMAR anti-patterns).*

- > "[Exact quote.]" — [Speaker / author, source key]

## Numbers & data bank

*Every quantitative claim in one place, so a card author can build a
`stat-callout` / `stat-grid` / chart block without re-reading the beats.*

| value | units | what it measures | source | date / population | confidence |
|---|---|---|---|---|---|
| | | | | | |

## Contested claims

*Where sources disagree, or where the evidence is genuinely unsettled. A card
must not present a contested claim as settled — this section is the guardrail.*

- **[Claim].** [Side A, source] vs. [Side B, source]. [Where the weight of
  evidence currently sits, if anywhere.]

## Open questions & gaps

*What this research could not resolve. Honest gaps — not failures. They tell a
later extending pass exactly where to dig, and they tell a card author what
not to over-claim.*

- [Question the research left open, and why it couldn't be closed here.]

## Confidence assessment

[One short paragraph. Overall: how solid is the position in §2? Which beats rest
on `high` sources and which on `low`? What would change the conclusion?]

---

## Card derivation log

*Append one entry per card derived from this report. This is the genealogy
ADR-0006 makes navigable — it must match `derived_cards` in the frontmatter and
the registry row in `INDEX-research-reports.md`.*

### {{CARD-ID}} — {{MODE}} — {{DATE}}

- **Mode → length variant:** {{MODE}} → {{VARIANT}}
- **Admitted:** [which beats / facts made it into the card.]
- **Dropped:** [what the mode's constraints cut, and why — so a future re-derivation under a different mode knows what is available to pull back in.]
- **Split:** [if multi-part: how the report was divided across cards.]
- **Render:** [path under `docs/cards/` once published.]
