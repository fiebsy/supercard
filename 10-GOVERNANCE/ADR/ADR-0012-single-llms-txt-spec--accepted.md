# ADR-0012 — Single self-contained `llms.txt` spec

| key | value |
|---|---|
| id | ADR-0012 |
| type | adr |
| status | Accepted |
| date | 2026-06-25 |
| owner | derick |
| supersedes | ADR-0008 |

## Status

**Accepted** — 2026-06-25. Supersedes ADR-0008 (spec organized for agent
legibility). The content discipline ADR-0008 introduced — one canonical
sequence, one constraint list, one frontmatter contract, one block-selection
procedure, a glossary, a worked example — is **kept**. What changes is the
*delivery format*, not the content.

## Context

ADR-0008 (V3.2.0) shipped the public spec as a progressive-disclosure JSON
tree: `docs/spec/index.json` (a manifest) plus ten layer files
(`agent-guide`, `tokens`, `principles`, `grammar`, `lengths`, `blocks`,
`pipeline`, `rendering`, `glossary`, `example`). An agent fetched the
manifest, then chained into the layers its task needed.

The architecture worked, but the surface it presents is a sprawl of URLs.
The public face of the spec became eleven JSON files plus a `PROMPT.md`, an
`agent-guide` router whose only job was to point at other layers, a
`bootstrap_urls` array, and a `mirror_urls.by_layer` map — all of it
machinery for *chaining between URLs*. The mainstream pattern that emerged
for exposing docs to agents is different and simpler: a single
[`llms.txt`](https://llmstxt.org) file at the site root — the "navigation
form" a documentation site publishes for LLMs. Proper docs sites (Silk and
others) lead with one URL.

The frictions:

1. **Eleven URLs to advertise where one would do.** The landing page, the
   README, the sitemap, the spec-discovery block, and `PROMPT.md` each had to
   explain the manifest-then-drill protocol. That protocol is overhead an
   agent pays before it reads a single rule.
2. **Chaining is a failure surface.** Every "fetch the manifest, then fetch
   the layer" hop is a place a fetch can fail, a relative URL can mis-resolve,
   or an environment can block a host. A self-contained file has zero hops.
3. **The progressive-disclosure win is small here.** The whole spec is ~1700
   lines of markdown. Splitting it across ten JSON files to save an agent from
   reading the parts it doesn't need optimizes a cost (a single fetch of a
   modest file) that was never the bottleneck.
4. **JSON is a lossy view of prose governance docs.** The canonical sources
   are markdown; rendering them as structured JSON dropped the connective
   prose and forced a bespoke parser per layer. The markdown *is* the spec —
   serving it as markdown is more faithful than re-deriving JSON from it.

## Decision

**Serve the entire public spec as one self-contained `docs/llms.txt`, and
retire the `docs/spec/` JSON tree.**

1. **One URL.** The canonical endpoint becomes `https://berafoot.com/llms.txt`
   (Vercel-app fallback `…vercel.app/llms.txt`). It is the only URL the
   landing page, README, sitemap, and spec-discovery block advertise.
2. **Self-contained.** `llms.txt` inlines every guide — principles, grammar,
   lengths, block library, pipeline, rendering + tokens, glossary, worked
   example — under one H1 with a Contents index. Nothing to chain; an agent
   fetches one file and has the complete spec.
3. **Still generated, still drift-checked.** `app/scripts/build-spec.mjs` now
   renders `llms.txt` by normalizing and inlining the canonical markdown
   (strip each doc's H1 + metadata table, demote headings one level so the
   file has a single hierarchy). The markdown stays the source of truth
   (ADR-0003); `npm --prefix app run spec:check` and the `spec-drift` GitHub
   Action still fail CI on divergence. Output is deterministic; `spec_revision`
   is the hash of the source markdown.
4. **Graceful retirement.** `docs/spec/*.json` and `docs/spec/PROMPT.md` are
   deleted. `vercel.json` 301-redirects `/spec/:path*` to `/llms.txt` so any
   agent holding a cached `…/spec/index.json` URL still lands on the spec. The
   drop-in agent prompt moves into a section of `llms.txt` itself.

ADR-0008's content decisions are unchanged: 39 blocks across 7 families,
`rules_by_version` per block, the one block-selection procedure, the one
frontmatter contract, the Stage-3 conversion anchors, the glossary, and the
worked example all remain — they are simply delivered inline instead of as
separate JSON layers.

## Consequences

**Positive:**

- One URL to advertise, fetch, and cache. No manifest, no `bootstrap_urls`,
  no `mirror_urls.by_layer`, no `agent-guide` router-of-routers.
- Zero chaining: no inter-layer fetch can fail or mis-resolve.
- The served spec is the canonical markdown itself (normalized), so it is
  faithful by construction — no JSON re-derivation, no per-layer parser to
  keep in sync with prose.
- Matches the `llms.txt` convention agents and crawlers already expect.

**Negative:**

- A consumer that fetched a single JSON layer (e.g. only `tokens.json`) now
  fetches the whole file and scans to the section. Acceptable: the file is
  one modest markdown doc, and the Contents index makes the section jump cheap.
- Structured fields the JSON exposed (e.g. `type_scale[].font_size_px` as a
  number) are now markdown tables, not parsed objects. Any downstream consumer
  that read those fields programmatically must parse the table. No known
  consumer does; the spec's audience is LLMs reading prose.
- Old `/spec/*.json` deep links 301 to `/llms.txt` rather than to a matching
  section — a redirect, not a perfect remap. Acceptable for retirement.

**Neutral:**

- No content rule changes. No principle, grammar, block, token, or gate is
  added, removed, or altered. This is a delivery-format ADR.
- The canonical markdown, the renderer, and the frozen-at-version contract
  (ADR-0003) are untouched.

## Decision Drivers

- Agents are the primary consumer of the public spec. One self-contained URL
  is the lowest-friction thing to hand an agent.
- The spec is small enough that progressive disclosure buys little and costs
  a sprawl of URLs and a chaining protocol.
- Faithfulness: serve the markdown, don't re-derive JSON from it.

## Considered Options

1. **Keep the JSON tree (status quo, ADR-0008).** Rejected — the eleven-URL
   surface and the manifest-then-drill protocol are overhead the spec's small
   size doesn't justify.
2. **`llms.txt` as a navigation index that links out to per-guide markdown
   files.** This is the literal Silk pattern (an index plus linked `.md`
   docs). Rejected — it reintroduces chaining; the goal was one URL with
   nothing to fetch after it.
3. **Self-contained `llms.txt`, retire JSON (chosen).** One URL, the whole
   spec inlined, generated and drift-checked from the same markdown. Keeps
   every ADR-0008 content decision; changes only the delivery.

## Decision Outcome

Option 3. The spec is delivered as one self-contained `llms.txt`, generated
from the canonical markdown and drift-checked in CI. ADR-0008's organization
work is preserved; its JSON-tree delivery is retired.

## Links

- ADR-0008 (spec organized for agent legibility — superseded; content kept)
- ADR-0003 (frozen-at-authored-version — markdown is the source of truth)
- ADR-0007 (render and publish by default)
- `app/scripts/build-spec.mjs` (now renders `docs/llms.txt`)
- `.github/workflows/spec-drift.yml` (drift check)
- `vercel.json` (`/llms.txt` rewrite + `/spec/*` → `/llms.txt` redirect)
- https://llmstxt.org (the `llms.txt` convention)
