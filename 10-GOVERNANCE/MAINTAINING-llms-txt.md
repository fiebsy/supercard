# MAINTAINING — how to keep llms.txt optimal as the system evolves

| key | value |
|---|---|
| id | MAINTAINING-llms-txt |
| type | governance |
| era | atlas |
| owner | derick |
| updated | 2026-06-27 |

This doc is **repo-only** — it is *not* one of the guides inlined into
`docs/llms.txt` (it is absent from the `GUIDES` array in `app/scripts/build-spec.mjs`).
It is the contract for whoever edits the spec, so the published file stays optimal
for its primary reader as the design system and beat structure grow.

---

## The one rule that explains all the others

**`docs/llms.txt` is a generated view. Never edit it by hand.** Edit the canonical
markdown in `00-INDEX/` and `10-GOVERNANCE/`, then run `npm --prefix app run spec`
to regenerate, and commit the regenerated `docs/llms.txt` with your source change.
CI fails on drift (`build-spec.mjs --check`).

## Two readers, two layers

The published spec serves the reader Derick actually uses; the source serves the
maintainer and the in-repo agent. Keep the layers separated:

1. **The paste-and-go LLM** (no repo, no tools) is the primary reader. It gets a
   lean, self-contained build recipe. *Build a card with no tools*
   (`BUILD-card-no-tools.md`) is the lead section and must stay able to produce a
   correct card from `llms.txt` alone.
2. **The maintainer / in-repo agent** gets everything, including repo mechanics and
   genealogy — but those are **fenced out of `llms.txt`** so they never reach
   reader 1.

The fence is an HTML comment pair:

```
<!-- llms:exclude -->
…content kept in source, omitted from the public spec…
<!-- /llms:exclude -->
```

Put behind it: retired/superseded rules, frozen-version (pre-current) detail, and
repo-only mechanics (the renderer command, validator, git/publish, the
file-writing pipeline, the file-frontmatter contract). Always leave a **one-line
visible stub** above the fence so cross-references (`see R-9`, "the frontmatter
contract") still resolve and the "never emit this" signal survives.

## The invariants that define "optimal" — never break these

- **The build recipe leads and is self-contained.** A topic + `llms.txt` must be
  enough for a tool-less LLM to emit one correct self-contained HTML card.
- **One canonical home per live rule.** State each current rule once where the
  agent acts on it; reference it elsewhere. Do not add a fourth restatement. (The
  master anti-patterns table, validator-severity table, and glossary are
  *different lookup surfaces* — that's allowed; a verbatim re-paragraph is not.)
- **Current values only, up front; frozen detail fenced.** The lead recipe and the
  primary token tables carry the current version's values. Old frozen-version
  metrics live behind a fence, not inline.
- **Genealogy and repo mechanics are fenced, never deleted.** The audit trail stays
  in source (and in `CHANGELOG-supercard.md` + the ADRs).
- **The worked card obeys every rule it teaches** (single emphasis, no em dash,
  grayscale, ≤ the length band, classes that exist in the stylesheet).

## Edit playbooks

### Change a design token or CSS rule
The flat stylesheet in `BUILD-card-no-tools.md` is the *effective* cascade of
`app/src/supercard.css` (base + the current `v3-*` scopes), flattened. When you
change a token, color, type metric, or block style:
1. Edit `app/src/supercard.css` (the real renderer source).
2. Mirror the change into the flat stylesheet in `BUILD-card-no-tools.md` so the
   two stay in sync. Drop site-chrome rules (gallery, landing, icon-btn).
3. If it changes block markup, update the matching **per-block HTML pattern** and
   the **worked card**.
4. Re-render the worked card and eyeball it (see Verification loop).

### Add or revise a rule (R-NN / G-NN / a principle)
1. State the **live** rule once, in its home doc, in plain language — strip the
   `(R-NN / ADR-NNNN)` citation chains from the operative sentence (keep them for
   the maintainer, not the builder).
2. If it supersedes an older rule, **fence the superseded version** with a one-line
   "retired/superseded — use X instead" stub. Do not leave two live versions.
3. If it is a hard rule a tool-less LLM should check, add it to the **self-check**
   in `BUILD-card-no-tools.md` (and the validator if a card file can be linted).

### Add, retire, or re-home a block
1. Update the 39-row table in `INDEX-block-library.md` (family / lifecycle /
   `length_variants`) — Steps 3–4 of the selection procedure read it, so it MUST
   stay in `llms.txt` (keep the `---` after the metadata table; the generator
   strips only the *contiguous* leading metadata table).
2. Update the **decision tree** and **precedence** in `GRAMMAR`.
3. Add/adjust a **per-block HTML pattern** in `BUILD-card-no-tools.md` for any block
   a paste reader will emit; add its class(es) to the flat stylesheet.
4. Retiring a block: mark it `deprecated` in the table and fence its detail; never
   delete the id (ADR-0003 contract).

### Change the beat structure
Keep these three in lock-step or the spine drifts:
1. `GRAMMAR` — the seven-beat spine and length scaling.
2. `BUILD-card-no-tools.md` — the build-sequence step that lists the beats, and the
   skeleton's section comments.
3. `LENGTHS` — the beat-coverage table per length and L-6 beat anchor weighting.
The rendered card shows **no** beat labels (R-10/I7) — a beat is whitespace + the
first block's own eyebrow. A beat-structure change must never reintroduce a visible
"Beat N" or position counter.

### Add repo-only tooling (a new script, gate, or publish step)
Keep it behind `<!-- llms:exclude -->` with a stub. It must not reach the
paste-and-go reader, who has none of it.

## Scaling guidance

As the system grows, length pressure lands on `llms.txt`. Resist it:
- **The lead recipe stays short.** Push *rationale* and *edge cases* down into the
  reference sections (Principles, Grammar, Rendering); keep the lead a build recipe,
  not an essay.
- **Don't grow a parallel index.** New rules attach to an existing home; they don't
  spawn a fourth table of the same thing.
- **Genealogy goes behind the fence the moment it's superseded**, so the live
  surface never carries two versions of a rule.
- A good smell test: if the spec stopped passing its own gates — redundant
  restatements (P9), a section you can't act on without chasing a "superseded by"
  pointer (P1) — it has drifted. Fix it the way you'd fix a card.

## Verification loop — run before every spec change ships

1. `npm --prefix app run spec` — regenerate `docs/llms.txt`.
2. `node app/scripts/build-spec.mjs --check` — drift must be clean; commit the
   regenerated file with the source change.
3. **Render the worked card.** Extract the stylesheet + worked-card HTML from
   `BUILD-card-no-tools.md`, combine, open in a browser (or headless screenshot).
   Confirm: strict grayscale, single emphasis per block, corner glyph present, **no
   em dash**, every class used is defined. (`build-spec` now hard-fails on an em
   dash inside a card example — see the `assertNoEmDashInCardExamples` guard.)
4. Skim the lead section: could a fresh chat LLM build a correct card from it alone?
   If a step now depends on something only the repo has, fence or inline it.
