# ADR-0001 — Adopt named eras with SemVer (V3 = Atlas)

| key | value |
|---|---|
| id | ADR-0001 |
| type | adr |
| status | Accepted |
| date | 2026-04-29 |
| owner | derick |

## Status

**Accepted** — 2026-04-29

## Context

V1 and V2 of the Supercard system drifted because there was no anchor — each version was a moving target with no written principles doc, no changelog, and no clear identity. By the time V2 was "done," it had silently lost the screenshot autonomy and single-emphasis discipline that made V1 work.

A new system needs to support evolution (new blocks, new lengths, new patterns Derick discovers) without repeating the V2 drift problem.

Three options were considered for versioning:

1. **CalVer (date-based, e.g. 2026-04)** — good for "when," weak for "what changed for me." A reader can't tell if a card written under 2026-04 is still valid under 2026-08.
2. **Pure SemVer (3.0.0)** — strong contract signal but feels engineering-y; doesn't capture identity changes.
3. **Named eras + SemVer (V3 "Atlas" = 3.MINOR.PATCH)** — eras anchor identity; SemVer gives fine-grained change signal.

## Decision

Adopt **named eras with SemVer** — Supercard V3.MINOR.PATCH — "Atlas".

- **Era** changes only when redefining what a Supercard fundamentally *is*. V3 → V4 is a generational rebrand, like Material 2 → Material 3.
- **MINOR** bumps when a Stable block is added, or a Stable block gains a non-breaking variant.
- **PATCH** bumps for typo fixes, clarifications, refined examples.
- **Pre-release** suffix `-alpha.N` for experimental work.
- **Era codename** (Atlas, then a future name for V4) gives each generation a memorable handle.

## Consequences

**Positive:**

- Identity is anchored — V3 is V3 until generationally redefined
- Change signal is fine-grained — readers know what "3.2.0 → 3.3.0" means
- Named eras give the system a memorable identity beyond a version number
- Prevents silent drift (V2's failure mode)

**Negative:**

- Slightly more ceremony than pure CalVer
- Era transitions (V3 → V4) require a thoughtful generational decision, not a casual bump

**Neutral:**

- Borrows Material Design's named-eras convention; familiar pattern

## Decision Drivers

- Identity anchoring (the V2 drift problem)
- Reader's question: "is my old card still valid?" — answered by `frozen_at_version`
- Author's question: "should this be a new era?" — answered by "does this redefine what a Supercard *is*?"

## Links

- Cognitect ADR convention: https://www.cognitect.com/blog/2011/11/15/documenting-architecture-decisions
- Material Design eras: M1 → M2 → M3
- SemVer 2.0.0: https://semver.org/
