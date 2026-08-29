# Skills installed in this repo

| Skill | Source | Purpose |
|---|---|---|
| `supercard` | this repo | Build a Supercard from a topic (runs the assembly pipeline) |
| `better-interface` | `jakubkrehel/skills` | Cross-discipline interface review, routes to every `better-*` skill |
| `better-typography` | `jakubkrehel/skills` | Type scale, spacing, wrapping, OpenType, punctuation |
| `better-colors` | `jakubkrehel/skills` | Palette structure, token naming, notation, measured contrast |
| `better-layout` | `jakubkrehel/skills` | Grouping, alignment, spacing, responsive structure, logical properties |
| `better-ui` | `jakubkrehel/skills` | Surfaces, radius, optical alignment, icons, motion |
| `better-writing` | `jakubkrehel/skills` | Product copy, terminology, voice, labels |
| `better-accessibility` | `jakubkrehel/skills` | Semantics, keyboard, focus, names, assistive technology |
| `interface-review` | `jakubkrehel/skills` | Change-scoped review of a diff or branch (user-invoked) |
| `variant` | `jakubkrehel/skills` | Build several deliberate variants of one component (user-invoked) |
| `break` | `jakubkrehel/skills` | Render one component in every state and stress it (user-invoked) |
| `explain-interface` | `jakubkrehel/skills` | Work out how an interface elsewhere was built (user-invoked) |

## Provenance

The `better-*` and verb skills are vendored verbatim from
[`jakubkrehel/skills`](https://github.com/jakubkrehel/skills) at commit
`267330e1adfc66a718fb65fa6918c1f06d0a689e`. They are vendored rather than
installed as a plugin so every agent working in this repo gets them without a
marketplace step, and so the Supercard rules that cite them cite a fixed
version.

To refresh, re-clone upstream and copy `skills/*` over these directories, then
re-run the design audit: a Supercard rule may cite a skill rule that moved.

## How they relate to the Supercard spec

The `better-*` skills are general interface knowledge. The Supercard spec is
narrower and, where the two disagree, the spec wins on the card canvas: strict
grayscale, single emphasis per block, flat surfaces, a fixed 393pt light-only
page. `10-GOVERNANCE/RENDERING-spec.md` records which skill rule each R-rule
adopts, adapts or overrides.

The landing page and gallery around the cards are ordinary web UI, and the
skills apply there without exception.
