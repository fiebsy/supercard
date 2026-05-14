# ADR-0007 — Render and publish by default

| key | value |
|---|---|
| id | ADR-0007 |
| type | adr |
| status | Accepted |
| date | 2026-05-14 |
| owner | derick |

## Status

**Accepted** — 2026-05-14

## Context

The pipeline treated rendering as Stage 5, *optional*. The markdown card was the
deliverable; the HTML was a nice-to-have you could "offer to render."

But a Supercard is a *visual* artifact. Screenshot autonomy (PRINCIPLES 1), the
gray ramp, the loft budget, the 393pt canvas — none of those are checkable in
markdown. The markdown is the portable source; the **render is the thing you
actually look at and react to**. Shipping a card without rendering it is
shipping something nobody has seen.

And once rendered, the HTML had nowhere to go. `docs/index.html` held exactly
one card (the spaced-repetition sample). There was no structure for a second
card, no gallery, no answer to "where do I open the card I just asked for?"

ADR-0004 already committed to "rendered cards are published as pages from the
repo (`docs/`)" — but the pipeline and the docs folder never implemented it.

## Decision

**Every card request renders and publishes by default.**

- Rendering is no longer optional. The pipeline's render stage runs on every
  sequence; the user gets an HTML view of every card they ask for, without
  having to ask for it.
- Rendered HTML is published into the repo's `docs/` site:
  - `docs/cards/CARD-{YYYY-MM-DD}-{slug}.html` — one standalone file per card.
  - `docs/index.html` — a **gallery** that lists every published render and
    links to it.
- `docs/` is served as the project's pages site. "Push it so I can view it
  online" = commit the render into `docs/` and push; the gallery and the card
  page are then live URLs.
- The render carries `<meta>` provenance back to its `source_file` and the
  `research_report` it descends from, closing the genealogy loop in the
  artifact a reader actually opens.

The markdown card stays the canonical, frozen-at-version source (ADR-0003). The
render is a *view* of it — regenerated, never hand-edited.

## Consequences

**Positive:**

- The user always gets the visual artifact, not just its source.
- A single, predictable place to open any card online; the gallery scales past
  one card.
- Closes ADR-0004's `docs/` publishing commitment with real structure.
- The screenshot test and the visual principles are checked against the thing
  that's actually published.

**Negative:**

- Every sequence now ends with a commit/push to `docs/`. That is the cost of
  "viewable online" and is accepted.
- The gallery is a hand-maintained index that must be updated when a card is
  added — a named pipeline action, like the research registry.

**Neutral:**

- Formalizes what ADR-0004 already implied; the renderer spec already assumed a
  filesystem target.

## Decision Drivers

- A Supercard is a visual artifact; the render is the deliverable, not an extra.
- "Push it so I can view it online" needs a concrete, repeatable mechanism.
- ADR-0004 committed to `docs/` publishing; this implements it.

## Considered Options

1. **Keep render optional (status quo)** — cards ship unseen; no home for HTML.
2. **Render by default, but leave HTML local** — solves "unseen" but not
   "viewable online"; nothing to open from another device.
3. **Render and publish to `docs/` by default (chosen)** — the card is always
   rendered and always has a live URL.

## Decision Outcome

Option 3. Option 1 ships artifacts nobody has looked at. Option 2 renders but
strands the file. Render-and-publish makes the visual artifact the default
deliverable and gives it a durable, shareable address.

## Links

- ADR-0004 (git repo as canonical home — `docs/` publishing)
- ADR-0003 (frozen-at-authored-version — markdown stays canonical source)
- ADR-0005 (mode-driven assembly pipeline)
- `10-GOVERNANCE/RENDERING-spec.md`
- `10-GOVERNANCE/PIPELINE-card-assembly.md`
- `docs/README.md`
- PRINCIPLES 1 (screenshot autonomy)
