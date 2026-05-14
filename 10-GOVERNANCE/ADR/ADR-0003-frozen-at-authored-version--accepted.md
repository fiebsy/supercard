# ADR-0003 — Content frozen at authored version

| key | value |
|---|---|
| id | ADR-0003 |
| type | adr |
| status | Accepted |
| date | 2026-04-29 |
| owner | derick |

## Status

**Accepted** — 2026-04-29

## Context

As Supercard V3 evolves through minor versions (3.0 → 3.1 → 3.2), existing cards face a choice:

1. **Auto-migrate forward** — every card always renders under the current spec
2. **Frozen at authored version** — every card renders under the spec it was authored against

Notion's block format auto-migrates; you can never fully reconstruct what you wrote in 2019. Stripe's API uses version pinning — a request authored against `2024-09-30.acacia` always behaves as if the API were that version, forever. LaTeX `\documentclass{article}[2021/10/04]` does the same.

Auto-migration is simpler operationally but corrupts the archive — the historical record of what V3.0 looked like becomes unrecoverable. Frozen-at-authored preserves the genealogy at the cost of maintaining versioned rule libraries.

## Decision

**Adopt frozen-at-authored-version** for content.

Every Supercard's frontmatter declares `frozen_at_version: 3.X.Y`. The renderer applies that version's rules. New blocks added in V3.1+ are unknown to V3.0 cards and the renderer skips them with a warning, never auto-migrates.

The renderer maintains versioned rule libraries at `/renderer/v3.0/`, `/renderer/v3.1/`, etc. When loading a card, it resolves to the matching library.

**Forward migration is allowed only voluntarily** — Derick can re-author a card under a newer version with a migration note in the card's history. This produces a *new* card that supersedes the old one; the old one stays frozen.

Generational bumps (V3 → V4) are explicit breaks. Old cards may need migration *or* simply remain "V3 cards" — both V3 and V4 specs stay published. Material Design pattern: m2.material.io is still live.

## Consequences

**Positive:**

- Archive is preserved as a true historical record
- V3.0's design choices become consequential (you can't quietly fix them later)
- Reader's question "is my V3.0 card still valid?" has a stable answer: yes, forever, in V3.0's rules
- Prevents silent corruption that destroys archives

**Negative:**

- Renderer must maintain versioned rule libraries (small ongoing cost)
- "Bug fix" patches don't propagate to old cards automatically — they require voluntary migration
- Mental overhead: which version did I author this under?

**Neutral:**

- Matches Stripe, LaTeX, AWS API versioning conventions

## Decision Drivers

- Preserve the genealogy as the asset (per PRINCIPLES principle 10)
- Force consequential design choices in V3.0 (no escape via "we'll fix it in 3.1")
- Allow the system to evolve without breaking existing work

## Exceptions

Patch-level fixes (typos in the spec, clarifications) **may apply universally** — they don't change semantics. PATCH-only fixes can opt into universal application by tagging the changelog entry `[universal]`.

## Mechanism

```
card.frontmatter.frozen_at_version = "3.0.0"
                ↓
renderer.load("/renderer/v3.0/")  →  applies V3.0 rules
                ↓
output: HTML rendered with V3.0 grammar
```

When a card uses a block introduced in V3.1+, the renderer logs:

```
[V3.0 renderer] Skipping unknown block 'NEW-BLOCK-NAME' (introduced V3.1.0). Card was authored as V3.0. To use this block, voluntarily migrate the card.
```

## Links

- Stripe API versioning: https://docs.stripe.com/api/versioning
- LaTeX class versioning
- ADR-0001 (named eras + SemVer)
- PRINCIPLES principle 8 (frozen at authored version)
