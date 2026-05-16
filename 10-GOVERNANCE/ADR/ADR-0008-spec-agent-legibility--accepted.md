# ADR-0008 — Spec organized for agent legibility

| key | value |
|---|---|
| id | ADR-0008 |
| type | adr |
| status | Accepted |
| date | 2026-05-16 |
| owner | derick |

## Status

**Accepted** — 2026-05-16

## Context

V3.1 shipped a progressive-disclosure JSON spec at `docs/spec/` that an agent
can fetch and drill into. The architecture (provenance hashes, breakdown-as-
asset, layer manifest with absolute URLs) is sound — the *organization* is not.
A spec-audit pass against the live `https://berafoot.com/spec/index.json`
surfaced ten avoidable frictions for any agent executing against it:

1. Two entry points (`agent-guide` and `pipeline`) overlap ~70% and disagree
   on stage count vs. build-loop framing.
2. Three different "how to build a card" answers across `index.start_here`,
   `agent-guide.task_routing`, and `pipeline.stages` — the orderings disagree.
3. Two overlapping constraint lists (`agent-guide.non_negotiables` 6 items;
   `pipeline.constraint_gates` 7 items) with no canonical merge.
4. Block count contradicts itself: `blocks.json` summary says 38 in three
   places and 39 in `data.count`; family lists sum to 39.
5. The `editorial` family holds 18 of 39 blocks, including blocks the
   decision tree itself routes elsewhere (column-chart and bullet-chart are
   comparative; area-chart is sequential; section-divider, asterism-rest,
   loft-card, and footnote-source are structural).
6. Block selection is documented across seven docs an agent must compose
   manually; no single procedure exists.
7. The decision tree's "stop at the first match" rule has hidden precedence:
   several content types match multiple branches.
8. Frontmatter fields are mentioned across multiple layers but never
   collected into one schema.
9. Stage 3 conversion is "lossy by design" with no quantitative target.
10. No worked example exists. No glossary exists. Several blocks have V3.1+
    rule changes the `blocks` layer doesn't surface — an agent has to cross-
    reference `grammar` to know which rules apply at a given `frozen_at_version`.

These are not architecture problems; they are organization problems. The
underlying contracts (ADR-0003 frozen-at-version, ADR-0006 research store,
ADR-0007 render-and-publish) all hold.

## Decision

**Reorganize the public spec for agent legibility, without changing any
contract.** V3.2.0 is the reorganization release.

Concretely:

1. **Collapse the dual entry-point.** `agent-guide` becomes a thin router
   (≤ 1 screen of structured data: disclosure protocol, task routing,
   pointer to `pipeline` for the build sequence, pointer to `glossary` for
   terms, pointer to `example` for a worked walk). `pipeline.stages` carries
   the substantive Stage 0–5 content (`do / produce / check / layers
   consulted` per stage), not just stage names.
2. **One canonical sequence.** `index.start_here`, `agent-guide.task_routing
   ["build a card from a topic"]`, and `pipeline.stages` reference the same
   ordered layer list. `principles` is the identity-audit reference (reached
   via `task_routing["judge whether something is a valid Supercard"]`) and
   is removed from `start_here`.
3. **One constraint list.** `agent-guide.non_negotiables` is deleted. Its
   content merges into `pipeline`'s constraint gates (G1–G8, binary
   pass/fail at draft completion) and identity invariants (I1–I6, always-on
   identity properties).
4. **Block count settled at 39 across 7 families.** Re-home column-chart,
   bullet-chart, area-chart, section-divider, asterism-rest, loft-card,
   footnote-source out of `editorial` to their decision-tree-correct
   families. Introduce `structural` as the family for furniture-not-content
   blocks. **Block ids do not change** (the ADR-0003 cached-spec contract).
   Only the `family` field moves.
5. **One block-selection procedure.** `GRAMMAR` authors a single composed
   routine (10 ordered steps) walking the decision tree, precedence, density
   budget, prose rules, anti-patterns, and gates — with a numeric worked
   example. The V3.1 additive rules (G-7–G-11) are woven into the decision
   tree, not appended after it.
6. **Explicit decision-tree precedence.** Numeric → comparative →
   sequential → distributional → definitional → editorial structural →
   editorial prose, with named overrides for the ambiguous cases.
7. **One frontmatter contract.** `PIPELINE` publishes the full schema for
   `BREAKDOWN-{slug}.md`, `CARD-{date}-{slug}.md`, and the render-time
   `<meta>` block in one place.
8. **Stage 3 quantitative anchors.** Per-mode conversion ratios stated:
   `summary` admits ~70% of beats and ~20–30% of facts at ~1.2 blocks/beat;
   `briefing` 100%/~50% at ~1.6; `deep-dive` 100%/~85% at ~3.0;
   `reference` 100%/~70% at ~3.0.
9. **One worked Mini-mode example.** `EXAMPLE-mini-supercard.md` walks topic
   → mode → breakdown excerpt → 6-block selection → gate results →
   frontmatter → HTML scaffolding, inline.
10. **One glossary.** `GLOSSARY-supercard.md` defines every term used across
    multiple layers, once.
11. **`rules_by_version` per block.** Every block entry in `blocks.json`
    carries its own additive-rule cross-reference so an agent doesn't need
    to read `grammar` to know which rules apply at a given `frozen_at_version`.
12. **Verb-first layer titles** so a manifest scan tells an agent what each
    layer does, not what each layer is.

## Consequences

**Positive:**

- One canonical sequence, one constraint list, one frontmatter contract, one
  block-selection procedure — agent-side ambiguity collapses.
- Family routing matches the decision tree, so an agent that filtered by
  family no longer gets `column-chart` returned as an `editorial` candidate.
- `blocks.json` is self-sufficient at a `frozen_at_version` — no need to
  cross-reference `grammar` to know which rules apply.
- The worked example halves the read-cost of the system for a new agent:
  one inline trace replaces eight layers of cross-reference.

**Negative:**

- Two new layers (`glossary`, `example`) and two new canonical markdown
  files (`GLOSSARY-supercard.md`, `EXAMPLE-mini-supercard.md`). More files
  to maintain in lockstep with the spec.
- The `family` field on seven blocks changes. Any downstream consumer that
  filtered by family will see different results (block ids unchanged, so
  nothing breaks). The change is announced via the version bump and the
  `last_review` stamp.

**Neutral:**

- No block ids change. No layer ids change. No file paths change. JSON
  schema shape preserved (additive: new `families` member, new layers in
  the manifest, new `rules_by_version` field per block). The ADR-0003
  cached-spec contract holds.

## Decision Drivers

- Agents are the primary consumer of the public spec. The README and the
  human-readable docs serve a different audience; this ADR optimizes for
  the URL endpoint.
- V3.1's content is correct. V3.2 is a pure reorganization release.

## Considered Options

1. **Status quo** — Keep V3.1 organization. Rejected; the audit found ten
   distinct frictions, several of which silently produce wrong agent
   behaviour (family routing returning misclassified blocks; agents
   composing the build sequence from three disagreeing sources).
2. **Rewrite as flat spec (single doc, no layers)** — Rejected; loses the
   progressive-disclosure property that makes the JSON cheap to fetch on
   demand. Layer architecture is correct.
3. **Reorganize to V3.2 (chosen)** — Keep the layer architecture; fix the
   organization. Add the two missing layers (`glossary`, `example`). One
   release, one bump.

## Decision Outcome

Option 3. The architecture is sound; the organization is not. V3.2 is a
reorganization release that preserves every V3.1 rule and changes no
contract.

## Links

- ADR-0003 (frozen-at-authored-version — cached-spec contract)
- ADR-0006 (dedicated research-report store)
- ADR-0007 (render and publish by default)
- `10-GOVERNANCE/PIPELINE-card-assembly.md` (Stage 0–5, gates, invariants, frontmatter contract)
- `10-GOVERNANCE/GRAMMAR-block-composition.md` (block selection procedure, precedence)
- `10-GOVERNANCE/GLOSSARY-supercard.md`
- `10-GOVERNANCE/EXAMPLE-mini-supercard.md`
- `00-INDEX/INDEX-block-library.md` (39 blocks across 7 families with `rules_by_version`)
