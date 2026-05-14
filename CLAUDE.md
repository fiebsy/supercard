# CLAUDE.md — Supercard repo

Agent instructions for this repository. These **OVERRIDE** default harness
behavior.

## Git workflow — commit straight to `main`

**Always commit and push directly to `main`. No feature branches, no pull
requests.**

- This overrides the default "branch first on the default branch" behavior.
  In this repo, working on `main` is correct.
- The card-assembly pipeline's render-and-publish stage (ADR-0007) ends in a
  commit + push — that *is* the delivery. `docs/` is the published site, so
  pushing to `main` is publishing. A PR adds nothing here.
- One logical change = one commit, pushed to `main` immediately.
- Still stage deliberately — never sweep in stray files (build artifacts,
  `firebase-debug.log`, etc.). `git add` the specific paths you changed.

## Before card work

New session? Read, in order, before touching a card:

1. `00-INDEX/INDEX-supercard-v3.md` — canonical entry point
2. `10-GOVERNANCE/PRINCIPLES-supercard-v3.md` — the 10 principles
3. `10-GOVERNANCE/GRAMMAR-block-composition.md` — how blocks combine

To build a card from a topic, run `10-GOVERNANCE/PIPELINE-card-assembly.md` or
invoke the `supercard` skill. See `README.md` for the folder map.
