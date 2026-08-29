# SKILLS — the interface-skill map

| key | value |
|---|---|
| id | SKILLS-interface-map |
| type | governance |
| era | atlas |
| version | 3.10.0 |
| owner | derick |
| updated | 2026-08-29 |

What the vendored interface skills own on a Supercard, what the Supercard spec
overrides, and how an agent uses both without arguing with itself.

<!-- llms:exclude -->
The skills are vendored in `.claude/skills/` from
[`jakubkrehel/skills`](https://github.com/jakubkrehel/skills) at commit
`267330e`. `.claude/skills/README.md` carries the provenance and the refresh
procedure. ADR-0017 records the audit that produced this map.
<!-- /llms:exclude -->

---

## The two surfaces

Supercard has two surfaces and they take the skills differently.

**The card canvas** is a fixed 393pt light-only page, strict grayscale, one
emphasis per block, built to be screenshotted. It is closer to a printed page
than an app screen and it has almost no interactive chrome. Here the spec wins
any argument, and the rulings below say where those arguments are.

**The gallery and landing** are ordinary web UI. Here the skills apply without
exception and no print-artifact reasoning is available. R-40 states the floor:
landmarks, a heading per card, one visible focus ring per control, a 44pt
minimum control height, `prefers-reduced-motion`, and no truncation that hides
a value.

## Which skill answers which question

| Question | Skill | Supercard rule it lands in |
|---|---|---|
| What size, weight and leading is this? | `better-typography` | R-19, R-21, the type scale |
| Where does this line break? | `better-typography` | R-41 |
| Which gray is this? | `better-colors` | R-20, R-39 |
| Does this pair clear the floor? | `better-accessibility` decides, `better-colors` measures | R-20, R-37 |
| How far apart do these sit? | `better-layout` | R-15, R-43 |
| Is this a group or a list of things? | `better-layout` | R-43 |
| Is this radius, surface or motion right? | `better-ui` | R-16, R-22, R-23 |
| Does a reader who never sees pixels get this? | `better-accessibility` | R-36, R-38, R-40 |
| Is this the right word for it? | `better-writing` | R-14, R-25, G-14 |
| Review the whole thing | `better-interface` | the design review in PIPELINE Stage 4b |
| Review a change | `interface-review` | the same, scoped to a diff |

`variant`, `break` and `explain-interface` are user-invoked and sit outside the
pipeline. Reach for `variant` when a block's treatment is genuinely undecided
and you want three real candidates rather than one argued position; `break`
when a block needs to be seen under content it was not authored against.

## Adopted

Rules the skills own and the spec now states in its own terms.

| Skill rule | Supercard rule | What changed |
|---|---|---|
| Semantic heading structure (`better-accessibility`) | R-36 | A `### ` subhead renders as `<h2>`, so a card has an outline |
| Heading sizes descend with level (`better-typography`) | R-36 | The `.tile` class carries the version-correct metric; the element carries the structure |
| Name primitives by hue, semantics by role (`better-colors`) | R-39 | A role tier over the ramp: a block references `--rule-hairline`, not `--g-12` |
| Use a token only in its role (`better-colors`) | R-37, R-39 | A rule token is never a `color`; five glyphs drawn at 2.10:1 moved to the ink ladder |
| Measure the rendered pair (`better-colors`) | R-20, R-37 | The validator computes and prints every ink step's contrast on white and on the tint |
| Accessible names (`better-accessibility`) | R-38 | A chart is named by its rows, not by the shape it draws |
| Native elements first (`better-accessibility`) | R-40 | `<main>`, `<h1>`/`<h2>`, `th scope`, `<footer>` |
| Wrap deliberately (`better-typography`) | R-41 | `balance` on display type, `pretty` on prose |
| Write copy naturally, style with CSS (`better-typography`) | R-42 | Curly quotes, real apostrophes, the ellipsis character; code keeps ASCII |
| Group with space, not lines (`better-layout`) | R-43 | The gap around a group beats the gap inside it; the footnote list drops its inherited hairline |
| Hint at hidden content (`better-layout`) | R-43 | A scrollable code panel carries a trailing mask |
| Plan for growth and clipping (`better-layout`) | R-40, R-43 | `width=393` on the site pages; the corner mark clamps to the viewport |
| Use logical properties (`better-layout`) | R-40 | `text-align: start`, `margin-inline-end`, `border-inline-start` |
| Truncate without losing content (`better-typography`) | R-40 | The spec URL wraps rather than ellipsizing |
| Font smoothing on the root (`better-typography`) | R-40 | Both halves of the pair, once |
| Keep useful text selectable (`better-typography`) | R-40 | `::selection` is on the ramp; the corner mark drops `user-select: none` |
| Breathing room between targets (`better-layout`) | R-40 | 44pt minimum control height in the gallery |
| Reduced motion (`better-accessibility`) | R-40 | Honoured on the gallery; the card canvas has no motion to reduce |

## Overridden

Skill rules the card canvas declines, and the reason. **Do not report these as
findings.** Each is a decision with a rule number behind it.

| Skill rule | Supercard rule | Why the spec wins |
|---|---|---|
| Shadows instead of borders for depth (`better-ui`) | R-22 | V3.6 retired every shadow deliberately. An anchor card is bounded by border, radius and padding. Flatness is part of what a Supercard looks like, and a shadow does not survive a screenshot crop the way a border does |
| A system is ramps, including an accent (`better-colors`) | P2, the gray ramp | There is one ramp and it has no hue. Emphasis is carried by weight, ink and space, one per block. An accent would give a card a second way to say "look here" and the whole grammar rests on there being only one |
| Cap the measure at 60–75 characters (`better-typography`) | R-9, the canvas | The 361pt column at 17px lands near 40–45. Reaching 60 means dropping body text below the size floor on a canvas whose width is the format. The cap exists and is deliberate |
| Breakpoints come from the content (`better-layout`) | The canvas | The canvas is 393pt because that is the thing being screenshotted. There are no breakpoints to derive |
| Serve `.woff2` (`better-typography`) | The output contract | A render is one standalone file with no network. The `ui-rounded` system stack is the only correct answer |
| An em dash for an aside (`better-typography` punctuation) | R-24 | Banned in reader-visible card content since V3.6, in prose and as furniture. Recast as a comma, a colon, parentheses or two sentences |
| Dark mode as a parallel palette (`better-colors`) | The canvas | `color-scheme: only light` is load-bearing: it stops a webview force-darkening a page whose ink ladder is tuned for white. A dark variant, if ever built, ships as a parallel ramp, never as an inversion |
| Scale on press, staged entrances, icon transitions (`better-ui` motion) | R-10, the output contract | A card has no interactive chrome to animate, and motion does not survive a screenshot. The gallery's controls take the skill's motion rules in full |

## Ruled per case

Neither adopted nor overridden: it depends, and here is the test.

- **Text below 12px.** The skill floors UI text near 12–13px. The card's
  eyebrow (11/14) and chart labels (11px) sit under it deliberately, and both
  clear 4.5:1 in tertiary ink. The floor to hold is the contrast one, not the
  size one; a label that is small and legible is fine, and a label that is
  small and gray is the defect R-37 repaired.
- **Line-height in fixed units.** The skill prefers unitless so leading scales
  with size. The canvas fixes both, because the beat gap is measured and the
  rhythm is a promise the renderer checks. Keep px here; use unitless anywhere
  the type scale is not fixed.
- **`text-box` trimming.** Correct in principle for R-13's optically specified
  cover joins, and rejected in V3.10 because it is Chromium 133+ and Safari
  18.2+ only, which would make the beat rhythm depend on the reader's browser.
  Revisit when it is baseline.
- **Concentric radius.** Applies wherever surfaces genuinely nest. On the card
  they rarely do, and the skill's own escape applies past 24px of padding: the
  hero is 16px radius with 32pt of pad, so its contents are independent
  surfaces, not concentric ones. Do not report the hero as a violation.

## Using this in a build

`PIPELINE-card-assembly.md` Stage 4b runs the design review, after the
constraint gates and before the render. The short version:

1. Run the seven constraint gates first. They are Supercard's own identity
   checks and nothing in a skill supersedes them.
2. Then read the card against `better-typography`, `better-layout`,
   `better-colors`, `better-writing` and `better-accessibility` — or invoke
   `better-interface`, which routes to all of them and returns one ranked
   verdict.
3. Check every finding against **Overridden** above before acting on it. A
   finding that lands in that table is answered, not open.
4. A finding that survives is either a card-level fix (make it and re-run the
   gates) or a system-level one. A system-level finding does not get patched
   into one card: it becomes a numbered R-rule, in an ADR, applied in the
   stylesheet or a render path, with every card re-rendered from its frozen
   source. That is how V3.10 happened and it is the only way a rule stays true
   of the archive.

A finding with no `path:line` is not a finding. A fix that cannot be pasted in
as written is not a fix. Both are the skills' own calibration and they hold
here.
