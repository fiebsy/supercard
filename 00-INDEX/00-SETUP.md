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
Past cards: 30-CARDS/. Drafts, breakdowns, experiments: 40-LAB/.
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
(or invoke the supercard skill): Request -> Mode -> Deep research ->
Breakdown MD -> Supercard MD -> (Render).
```

## Build a card

The fast path is the assembly pipeline — see
`10-GOVERNANCE/PIPELINE-card-assembly.md`, or invoke the `supercard` skill
(`.claude/skills/supercard/`). It runs: parse request and mode, deep research,
write the breakdown MD to `40-LAB/`, convert to a Supercard MD in `30-CARDS/`,
run the constraint gates, then optionally render.

## Smoke test

In a fresh session with this repo available:

```
Build me a Standard-length Supercard about [topic]. Render the HTML when done.
```

Expect:

1. Claude reads INDEX -> PRINCIPLES -> GRAMMAR first
2. A breakdown lands at `40-LAB/BREAKDOWN-{slug}.md`
3. The card lands at `30-CARDS/CARD-{YYYY-MM-DD}-{slug}--draft.md`, opening with a Metadata table
4. Every section passes the screenshot test (one complete idea, one emphasis, corner glyph)
5. The render is standalone HTML at 393pt mobile width

See `30-CARDS/CARD-2026-05-14-spaced-repetition--draft.md` and its render at
`docs/index.html` for a worked example.
