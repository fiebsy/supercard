# ADR-0017 — V3.10: the interface-skills cut — structure, legibility, roles

| key | value |
|---|---|
| id | ADR-0017 |
| type | adr |
| status | Accepted |
| date | 2026-08-29 |
| owner | derick |

## Status

**Accepted** — 2026-08-29. Ships as spec version `3.10.0`.

## Context

Every prior version cut was written from inside the system: a steward read the
cards, noticed a defect, and named a rule for it. That works, and it has a
known blind spot. A system audited only against its own principles cannot find
the questions those principles never thought to ask.

V3.10 audits the system against an outside standard. The
[`jakubkrehel/skills`](https://github.com/jakubkrehel/skills) collection is
eleven agent skills covering typography, colour, layout, UI polish, product
writing and accessibility, each one a set of prescriptive rules with exact
values. They are vendored into `.claude/skills/` at commit `267330e` and
documented in `.claude/skills/README.md`. Each domain skill was run against the
whole system — the stylesheet, both render paths, the published renders, the
governance docs and the gallery — and every finding was verified against the
source before it was allowed to become a rule.

The audit was not a rubber stamp in either direction. Where a skill rule and a
Supercard rule genuinely disagreed, the Supercard rule usually won, and
`10-GOVERNANCE/SKILLS-interface-map.md` records each of those rulings and why.
Shadows stay retired. The measure stays under the skill's 60–75 character
target, because a fixed 393pt screenshot canvas cannot reach it without
dropping body text below the size floor. The canvas stays light-only. No hue
enters anywhere.

What the audit did find is that **the system's worst defects were all failures
to keep its own promises**, and that most of them were invisible to a steward
reading a screenshot, because they lived in the layer under the picture.

### What the audit found

1. **A card had no structure under the picture.** The renderer emitted a
   subhead as `<div class="tile">`, so every published card presented one
   `<h1>` and no other heading. A twenty-thousand-pixel card with twenty beats
   and eight subheads was, to a screen reader, to in-page navigation and to any
   agent parsing the HTML, one undifferentiated run. On a card frozen below
   3.4.0 the subhead had no styling at all: it rendered as 16px browser-default
   text with `line-height: normal`, indistinguishable from the prose around it.
   The gallery had the same shape, offering one heading for a list of seven
   cards.

2. **Meaningful glyphs were drawn below the contrast floor.** R-20 classifies
   `--g-30` as non-text; the list marker, the source-list bullet, the divider
   label, the gallery meta line and the corner mark were all drawn in it, at a
   measured 2.10:1 on white. The ✓, the ✗ and the numeral are the difference
   between a checklist, an anti-pattern list and a numbered process. The corner
   mark exists so a stranger holding a cropped screenshot can trace it back to
   the system, which it cannot do if it cannot be read.

3. **A chart's accessible name was the shape, not the data.** Four chart types
   shipped `aria-label="column chart"`. The numbers, which are the block's
   entire content, were unreachable.

4. **Rules that existed only as CSS.** R-29's `td.num` / `th.num` styling has
   shipped since V3.7, and no render path ever emitted the class, so every
   comparison table's figures went out proportional and left-aligned. R-24's
   em-dash ban was made retroactive to every card by ADR-0011 and the V3.6
   changelog records the sources as cleaned, but the validator returns early on
   any card frozen below 3.1.0, so the gate never ran on the three V3.0 cards
   and one of them shipped eighteen reader-visible em dashes.

5. **A gate reading scaffold as content.** `parseBlocks` ran the last beat to
   end-of-file, folding `## Sources` and `## Authoring notes` into the final
   block. Every gate had been scanning production notes the renderer explicitly
   never emits.

6. **The ramp had no vocabulary.** `--g-12` names a value. Nothing in the
   system said where it belonged, which is how one ramp came to carry both
   hairlines and text, and how a token classified as non-text ended up on five
   `color` declarations.

7. **Drift between the spec and the code it describes.** `--s-0` documented and
   never declared. `--ink-4` / `--ink-5` named as tokens and never emitted. The
   internal card pad given as 24pt where the stylesheet uses 32. The 19pt step
   called retired while two blocks still render at it. The gray-ramp table
   still calling `--g-60` a text colour after R-20 demoted it. The canonical
   INDEX describing R-25 as "sentence-case labels, tracking returns to 0" when
   R-25 says the opposite in its own text. The documented render command,
   repeated in the spec, the skill and the pipeline, failing with ENOENT as
   written.

## Decision

Ship V3.10 as eight rules, split by what the frozen-at-version guarantee will
bear.

**Base level, retroactive** (the ADR-0011 precedent: defect repair, not design
drift). R-36 subheads are headings. R-37 every rendered glyph clears 4.5:1.
R-38 a chart names its data. R-39 role tokens name the job. R-40 the card is a
document. Plus the fit and cue repairs in R-43.

**`.canvas.v3-10`, forward only** (it changes where lines break and where space
falls, which is a design decision an older card is entitled to keep). R-41
balanced display wrapping. R-42 smart punctuation. The grouping corrections in
R-43.

Full statements in `RENDERING-spec.md`.

### Why R-36 and R-37 are retroactive

The test this repo uses for a retroactive repair, set by ADR-0011 and restated
on the V3.9 card, is: broken markup, overflow, a wobbling gap. A subhead
rendering as unstyled body text is broken markup by any reading. A glyph at
2.10:1 is not a design choice about how quiet a marker should be; it is a
marker the reader cannot resolve, on a system whose first principle is that
every visible region must be self-sufficient.

R-36 costs nothing to the archive precisely because the class carries the
metric and the element carries the structure: base `h2` is the V3.0
section-header step, `.canvas.v3-4 .tile` is the Tile head, `.canvas.v3-5
h2, .tile` is the Subhead. The V3.7 and V3.9 renders screenshot **byte-identical**
before and after. The pre-3.4 cards change, and they change into what they were
authored to be.

R-37 does change the archive's pixels, in five small places, and that is the
point: the alternative is an archive of cards with markers nobody can read.

## Consequences

- Every published card gains a real heading outline and a `<main>` landmark.
  The renders are re-run from their frozen sources; no card source changes
  except the one carrying em dashes R-24 already banned.
- The gallery becomes a document: headings per card, landmarks, focus rings,
  44pt controls, `prefers-reduced-motion`, an unclipped spec URL, and the white
  ground the cards have used since V3.6 in place of an off-ramp `#E8E8E8` moat.
- `.canvas.v3-10` joins the cascade chain and the renderer emits it for cards
  frozen at 3.10.0 or later.
- The validator enforces R-24 on every card, not only the ones it was already
  scanning, and stops reading authoring notes as card content.
- The eleven skills are vendored in the repo, so an agent building a card can
  reach them, and `SKILLS-interface-map.md` records what each one owns here.
- `PIPELINE-card-assembly.md` gains a design-review step between the gates and
  the render, so the audit that produced this version is a stage, not an event.

## Alternatives considered

**Apply the skills wholesale.** Rejected, and the reasons are in the map doc.
`better-ui` wants shadows for elevation; R-22 retired them deliberately in V3.6
and a flat surface is now part of what a Supercard looks like. `better-colors`
wants an accent ramp; there is no hue here and never will be. `better-layout`
wants breakpoints from content; the canvas is a fixed 393pt by design. A skill
that cannot lose an argument is not a standard, it is a template.

**Put everything in `.canvas.v3-10` and leave the archive alone.** Rejected.
It would leave every published card with one heading and unreadable markers, on
the reasoning that a defect becomes a design decision once it has shipped. The
V3.9 card argues against exactly this: "Retroactive repair is allowed only for
defects." The line held here, in both directions.

**`text-box: trim-both` on the display numerals.** Considered and rejected.
R-13 specifies the cover joins optically, in cap-height and baseline terms, and
`text-box` would implement them honestly. But it is Chromium 133+ and Safari
18.2+ only, so the beat rhythm would depend on the reader's browser. The system
trades that for determinism everywhere else and should here too.

## References

- `10-GOVERNANCE/RENDERING-spec.md` § R-36 through R-43
- `10-GOVERNANCE/SKILLS-interface-map.md` — the skill-to-rule map and the rulings
- `.claude/skills/README.md` — what is vendored, from where, at which commit
- ADR-0011 — the retroactive-repair precedent this cut leans on
- ADR-0016 — V3.9, the previous defect-repair cut
