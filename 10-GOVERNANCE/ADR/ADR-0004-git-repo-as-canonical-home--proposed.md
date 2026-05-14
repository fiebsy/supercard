# ADR-0004 — Git repository as the canonical home

| key | value |
|---|---|
| id | ADR-0004 |
| type | adr |
| status | Proposed |
| date | 2026-05-14 |
| owner | derick |

## Status

**Proposed** — 2026-05-14

(One of: Proposed, Accepted, Rejected, Superseded by ADR-NNNN, Deprecated)

## Context

V3 was originally authored as a folder hierarchy in a hosted document store, with
a Claude project pinning the governance docs for context. That origin carried
real costs:

- No diffs — a governance change was invisible unless you remembered the prior wording.
- No atomic commits — related edits across PRINCIPLES, GRAMMAR, and an ADR couldn't land as one reviewable unit.
- No branches or pull-request review for proposals.
- No CI — the constraint gates, validators, and rendering pipeline had nowhere to run.
- "Search" meant a proprietary query syntax, and document IDs leaked into the docs themselves.

The system now lives in the `fiebsy/supercard` git repository. The hosted-store
origin is no longer the source of truth, but references to it linger across the
docs (query recipes, document IDs, hosted-store search instructions).

## Decision

Adopt **the git repository as the single canonical home** of the Supercard system.

- All governance, blocks, cards, templates, breakdowns, and the assembly pipeline live in version control.
- Remove hosted-store-specific references and query syntax; replace with repo-native equivalents (`git log`, `grep`, `ls`, relative paths).
- Rendered cards are published as pages from the repo (`docs/`).
- The hosted-store hierarchy is retired, not mirrored. A one-way export may be kept as a historical snapshot, but it is not authoritative.

## Consequences

**Positive:**

- Diffs, history, branches, and PR review for every change — governance included.
- CI can run the constraint gates, validators, and the renderer.
- `frozen_at_version` (ADR-0003) becomes literally expressible as a commit or tag.
- No proprietary IDs embedded in content.

**Negative:**

- Loses zero-friction browser editing for non-technical edits.
- Loses the automatic project-context pull a pinned document set provided; a session must now be pointed at the repo (see `00-SETUP`).

**Neutral:**

- The rendering and pipeline specs already assumed a filesystem; this ratifies what they implied.

## Decision Drivers

- Genealogy-as-asset (PRINCIPLES 10) is far better served by git history than by a document store.
- Governance changes need real review.
- The renderer and pipeline need somewhere to execute.

## Considered Options

1. **Keep the hosted store canonical, repo as a mirror** — the weaker tool stays in charge; the mirror drifts.
2. **Dual-home (sync both)** — guarantees divergence and doubles the maintenance surface.
3. **Repo canonical, hosted store retired (chosen)** — accepts the loss of browser editing in exchange for history, review, and CI.

## Decision Outcome

Option 3. A mirror (1) leaves authority with the tool that caused the original
drift problem. Dual-homing (2) trades one source of truth for two that will
disagree. Repo-canonical names the trade-off explicitly: browser-editing
convenience is given up for version control's guarantees.

## Links

- ADR-0001 (named eras + SemVer)
- ADR-0003 (frozen-at-authored-version — now expressible as commits/tags)
- `10-GOVERNANCE/PIPELINE-card-assembly.md`
- `10-GOVERNANCE/RENDERING-spec.md`
- `00-INDEX/00-SETUP.md`
