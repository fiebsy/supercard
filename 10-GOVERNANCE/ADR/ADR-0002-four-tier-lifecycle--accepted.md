# ADR-0002 — Four-tier lifecycle: Core / Stable / Experimental / Deprecated

| key | value |
|---|---|
| id | ADR-0002 |
| type | adr |
| status | Accepted |
| date | 2026-04-29 |
| owner | derick |

## Status

**Accepted** — 2026-04-29

## Context

The block library will grow over time as new patterns are discovered. Without a lifecycle system, every new block competes for canonical status with mature blocks, and the library drifts toward incoherence.

Reference systems handle this in different ways:

- React: stable / experimental channels
- Material Design: stable / in-development
- IBM Carbon: stable / experimental / deprecated
- Shopify Polaris: alpha / beta / stable / legacy / deprecated
- GitHub Primer: lifecycle in import path (`Primer::Alpha::*`, `Primer::Beta::*`)

Two questions: how many tiers, and how to express tier in the system?

## Decision

Adopt a **four-tier lifecycle**: Core / Stable / Experimental / Deprecated.

- **Core** — defines what a Supercard *is*. Removing one requires a generational era bump. Must have been Stable for ≥1 full minor cycle.
- **Stable** — production-ready, safe for any new card, API will not break within V3.
- **Experimental** — trial blocks, may change shape, may be promoted, may be killed. Lives in `40-LAB/`. Pre-release tag `V3.next-alpha.N`. Trial budget: ≥3 real Supercards must use it; sunsets at 90 days if not promoted.
- **Deprecated** — still works for old cards, should not be used in new cards. Removal only at era bump (V3 → V4), with ≥90-day soak period.

Tier is expressed three ways:

1. In the block doc's frontmatter `lifecycle: core|stable|experimental|deprecated`
2. In the block doc's filename status suffix `--core`, `--stable`, etc.
3. As an `sc_lifecycle` check enforced by the SupercardOps validator in CI

## Consequences

**Positive:**

- Library can grow without diluting canonical blocks
- Experimental tier provides a sandbox for new ideas without committing
- Core tier explicitly protects what defines the format
- Deprecation has a forced graceful path (no surprise removals mid-era)

**Negative:**

- More state to track per block
- Promotion gate ("≥3 uses, ≥30 days") requires honesty about whether a block is actually load-bearing

**Neutral:**

- Mirrors React, Carbon, and Polaris conventions; familiar to engineering audiences

## Decision Drivers

- Need to grow the library without drift
- Need to prevent silent canonization of half-baked blocks
- Need to protect the format's identity (Core tier)
- Need a graceful path for retiring blocks

## Promotion criteria (Experimental → Stable)

- Used in ≥5 real Supercards by Derick
- API unchanged for ≥30 days / one full review cycle
- Complete spec entry (purpose, anatomy, examples, anti-patterns, length variants)
- ≥1 ADR explaining why it exists and what it replaces (if anything)
- A "frozen" reference render committed alongside the spec

## Promotion criteria (Stable → Core)

- Used in essentially every Supercard (or every Supercard of its archetype)
- Removing it would mean the artifact is no longer recognizably a Supercard
- Has been Stable for ≥1 full minor cycle
- Requires explicit ADR

## Links

- ADR-0001 (named eras + SemVer) — supersedes nothing; foundational
- React experimental channel: https://react.dev/community/versioning-policy
- IBM Carbon component status: https://carbondesignsystem.com/all-about-carbon/component-status
