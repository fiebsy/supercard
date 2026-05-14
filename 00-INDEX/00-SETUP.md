# 00-SETUP

How to point a Claude session at this repo so that "supercard" prompts always
resolve to the canonical V3 (Atlas) system.

---

## The one rule

This repository **is** the Supercard system. "Supercard" (unqualified) always
means the current canonical V3 system that lives here — there is no other
version to disambiguate. Prior eras (V1, V2), if ever needed, live only under
`90-ARCHIVE/`.

## Reading order

Before any card work, read in this order:

1. `00-INDEX/INDEX-supercard-v3.md` — the canonical entry point
2. `10-GOVERNANCE/PRINCIPLES-supercard-v3.md` — the 10 cognitive-prosthesis principles
3. `10-GOVERNANCE/GRAMMAR-block-composition.md` — how blocks combine

For deeper questions: `LENGTHS`, `RENDERING`, `PIPELINE-card-assembly`, the ADRs,
`CHANGELOG`. Block reference: `00-INDEX/INDEX-block-library.md`, then the
individual specs in `20-BLOCKS/`.

## Custom instructions (for a Claude project or session)

If you maintain a persistent Claude project for Supercard work, set its custom
instructions to:

```
"Supercard" (unqualified) ALWAYS refers to the canonical V3 system in the
fiebsy/supercard repository. There is one canonical Supercard; prior eras live
only under 90-ARCHIVE/.

Default reading order before any card work: INDEX -> PRINCIPLES -> GRAMMAR.
For deeper questions: LENGTHS, RENDERING, PIPELINE, ADRs, CHANGELOG.
Block reference: 00-INDEX/INDEX-block-library.md, then 20-BLOCKS/.
Past cards: 30-CARDS/. Deep-research reports: 60-RESEARCH/ (registry:
INDEX-research-reports.md) -- check it before researching any topic.
RFCs, audits, experiments: 40-LAB/. Published renders: docs/.
Archive (read-only, do not author into): 90-ARCHIVE/.

Authoring rules (V3 = Atlas era, current):
- Strict grayscale only (#000, #FFF, --g-06/12/30/60)
- SF Pro Rounded body, SF Mono code, 393pt mobile canvas
- Single emphasis per block (one bold phrase max)
- Screenshot test on every section
- 1-3 lofted elements per card max
- 7-beat narrative spine: Hook, Evidence, Mechanism, Comparison, Counter,
  Application, Close
- Mini = 5-8 blocks, Standard = 10-14, XL = 18-25
- Frozen at authored version (declare frozen_at_version in frontmatter)
- Use Core/Stable blocks unless asked for Experimental

To build a card, run the pipeline in 10-GOVERNANCE/PIPELINE-card-assembly.md
(or invoke the supercard skill): Request -> Mode -> Check research store ->
Deep research -> Breakdown MD (in 60-RESEARCH/) -> Supercard MD ->
Render -> Publish to docs/. Rendering and publishing are mandatory.
```

## Build a card

The fast path is the assembly pipeline — see
`10-GOVERNANCE/PIPELINE-card-assembly.md`, or invoke the `supercard` skill
(`.claude/skills/supercard/`). It runs: parse request and mode, check the
research store for an existing report, deep research, write the breakdown MD to
`60-RESEARCH/` (and register it), convert to a Supercard MD in `30-CARDS/`, run
the constraint gates, then render and publish the HTML to `docs/`.

## Smoke test

In a fresh session with this repo available:

```
Build me a Standard-length Supercard about [topic]. Render the HTML when done.
```

Expect:

1. Claude reads INDEX -> PRINCIPLES -> GRAMMAR first
2. Claude checks `60-RESEARCH/INDEX-research-reports.md` before researching
3. A deep-research report lands at `60-RESEARCH/BREAKDOWN-{slug}.md` and is registered
4. The card lands at `30-CARDS/CARD-{YYYY-MM-DD}-{slug}--draft.md`, opening with a Metadata table that names its `research_report`
5. Every section passes the screenshot test (one complete idea, one emphasis, corner glyph)
6. The render is standalone HTML at 393pt mobile width, published to `docs/cards/` and listed in `docs/index.html`

See `30-CARDS/CARD-2026-05-14-spaced-repetition--draft.md`, its deep-research
report `60-RESEARCH/BREAKDOWN-spaced-repetition.md`, and its render at
`docs/cards/CARD-2026-05-14-spaced-repetition.html` for a worked example.
