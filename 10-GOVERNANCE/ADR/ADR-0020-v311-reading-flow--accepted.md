# ADR-0020 — V3.11: the reading-flow cut — define what you name, keep the through-line, go deeper instead of padding

| key | value |
|---|---|
| id | ADR-0020 |
| type | adr |
| status | Accepted |
| date | 2026-08-29 |
| owner | derick |

## Status

**Accepted** — 2026-08-29. Ships as spec version `3.11.0`, a minor. Two new
grammar rules (G-17, G-18), a thirteenth ADHD-gate question, and pipeline
amendments to the `deep-dive` mode and mode inference. Content-layer only: no
token, class, or render path changes, no re-render, and every existing card is
exempt (frozen at its authored version, ADR-0003).

## Context

The steward's read on the recent cards came down to three complaints that are
really one:

1. **"It doesn't produce enough information."** Cards land tight and correct
   but thin — the reader gets the skeleton of the topic and wants the flesh.
2. **"I can't define the things it creates in the headlines."** The format's
   headline layer rewards coinages — *Outside Eyes*, *The Reading Layer,
   Refined*, *Rendered as Written* — and nothing anywhere obliged the section
   under a coinage to say what it meant. P13 requires jargon defined on first
   use *in prose*; the headline layer, where coinages actually concentrate,
   was never covered.
3. **"I wish the information flowed more smoothly."** The block grammar is
   good at making every block survive alone (P1) and nothing made adjacent
   blocks *add up*. The recent sample cards are anchor-heavy and prose-light
   — the V3.10 card runs nine blocks with a single `standard-text` among them
   — so a scroll reads as a deck of captioned exhibits: correct, scannable,
   and staccato.

Each complaint had a tempting wrong fix, and the wrong fixes are what this ADR
exists to refuse. "More information" is not padding blocks into the current
card (P7, P9). "Smoother flow" is not connective scaffold between sections
("as we saw", "next up") — P14 banned that vocabulary and stays banned.
"Define the headline" is not a glossary block under every title (the
context-obvious-definition anti-pattern).

## Decision

Three moves, all in the content layer.

**G-17 — Define what you name.** Whatever a headline surface (title, dek,
subhead, eyebrow) *introduces* — a coinage, a metaphor, a term of art — the
section under it cashes out before arguing with it: the first sentence states
a figurative headline literally; a term of art gets an appositive or an
opening `definition` block. Enforced as ADHD-gate question 13 (V3.11+ cards
only). The redundancy filter bounds it on both sides: defining the obvious is
still filler, and restating a literal headline still fails P9 — the rule fires
only on *introduced* terms.

**G-18 — The through-line.** Two SHOULD-strength ordering rules. Between
beats: the final sentence plants the specific noun, number, or question the
next beat's eyebrow picks up — a content echo that reads complete on both
sides of the seam, so a screenshot loses nothing (P1) and a scroller feels
pull (P14). Within a beat: claim → proof → consequence; a beat whose blocks
could be shuffled without loss is a pile, not an argument.

**The mode ladder is the length control.** `deep-dive` becomes explicitly
**prose-led**: multi-block beats open on their anchor and are carried by two
or three consecutive `standard-text` blocks (each with its own G-7
lead-clause), so an XL card reads as a flowing long-form essay that happens to
be scannable. And the pipeline now states the re-run rule: when a delivered
card "doesn't say enough," the fix is re-running Stage 3 from the same
breakdown one mode deeper — never padding the card in place. The breakdown has
no length budget; depth is a property of the view. Mode inference gains the
verbs that were falling through ("analyze", "the full story", "in depth",
"long form") and the feedback route ("more information" → same topic, deeper
mode).

## Consequences

- GRAMMAR moves to 3.11.0 with G-17, G-18, and two anti-pattern rows (a
  headline term never cashed out; a shuffle-proof beat). PRINCIPLES carries
  the thirteen-question gate; PIPELINE the mode amendments; the no-tools build
  section teaches both rules in step 5 and self-check 13, so paste-built cards
  inherit them.
- Scannability is untouched by design: G-17's cash-out lands *after* the
  headline (the scan layer is unchanged), G-18's echo is ordinary content
  prose, and every existing MUST — single emphasis, lead-clauses, the 60-word
  cap, the bold-only read — still gates the render. The fluid register is
  built out of already-legal material, ordered.
- Existing cards are exempt and un-re-rendered; the first card authored under
  3.11.0 is the first the new gate question touches.
- `llms.txt` regenerated; CI drift check green.

## Alternatives considered

- **A new `narrative` mode.** The four modes already span the depth axis;
  "fluid" is not a fifth intent, it is what `deep-dive` should have read like
  all along. A mode would fork the grammar; a posture amends it.
- **Raising the block caps.** Length was never the complaint — a 25-block
  staccato card is *more* tiring, not more informative. The caps hold; the
  ladder and the prose-led posture supply the depth.
- **A mandatory glossary/definition block per card.** Mechanical, and
  collides with the redundancy filter on every card whose headlines are
  literal. G-17 fires only where a headline introduces something.
- **MUST-strength G-18.** Ordering quality is not machine-checkable, and a
  MUST the validator cannot test invites exactly the "rule never kept" class
  V3.10 was cut to kill. SHOULD, held by the steward at review.
