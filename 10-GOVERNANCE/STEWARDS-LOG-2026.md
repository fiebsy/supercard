# STEWARDS' LOG — 2026

| key | value |
|---|---|
| id | STEWARDS-LOG-2026 |
| type | governance |
| era | atlas |
| version | 3.0.0 |
| owner | derick |
| updated | 2026-08-29 |

The design diary. Append-only, newest at top. Captures **the noticing** — patterns observed, temptations resisted, blocks that almost made it in, shifts in taste. Distinct from the CHANGELOG (what changed) and ADRs (why a single thing was decided).

Append entries via SupercardOps `logStewardEntry()` or directly.

---

## 2026-09-01 — claude (for derick) — [foundation]

**Context.** The system left the card for the first time. Derick's intent was
always bigger than the 393pt canvas: the same soul — grayscale, weight-and-ink
hierarchy, hairlines, few sizes — injected into any artifact he needs. The
working need arrived as an invoice for Payba (a company billing a customer
for a creator membership product), and the temptation was to just design one
in place: copy some styles, tweak by eye, ship a PDF.

**Action.** Resisted the one-off and built the extension the way the system
builds anything: researched first (`BREAKDOWN-financial-invoice-design`,
registered under a new `format-engine` mode), then split the system into
what is canvas-independent and what is not (`70-SUPERDOCS/`, engine D-rules),
then specified the invoice as twelve N-rules distilled from the research,
then rendered it deterministically (source JSON → inlined-token HTML →
tagged-PDF twin, every number computed in integer cents). ADR-0021 records
the decision; the gallery gained a Documents section. The card spec is
untouched — no version bump, because no card rule moved. One taste note
worth keeping: the invoice reads as three sizes (22 display / 10 body /
8 label), and every moment it seemed to need a fourth, weight or ink turned
out to be the right lever — R-21's claim, proven on a second canvas.

**Follow-up.** Next formats (statement, receipt, one-pager) should stand up
via the engine recipe, not by copying the invoice. And Chromium's tagged PDF
is not certified PDF/UA; revisit if Payba needs conformance.

## 2026-08-29 — claude (for derick) — [foundation]

**Context.** Derick's read on the recent cards, in his own register: they
break things down well but don't say enough; the headlines coin phrases the
card never defines; and the whole reads less fluid than it should — he wanted
"a more fluid and longer form breakdown" without losing the scannability that
is the format's entire point. The tempting fixes were all wrong in familiar
ways: pad the card (P7/P9 say no), add connective scaffold (P14 banned the
vocabulary), bolt a glossary under every title (the context-obvious-definition
anti-pattern).

**The noticing.** All three complaints are the depth axis showing up in
different clothes. The format's MUSTs guarantee every block survives *alone* —
that is P1 and it works — but nothing ever obliged adjacent blocks to *add
up*, and nothing obliged a headline to cash out what it coins. Meanwhile the
mode ladder already held the honest answer to "not enough information": the
breakdown has no length budget, so depth belongs to the view, and the re-run
at a deeper mode was always the design — it was just never written down as
the response to that exact complaint.

**Action.** V3.11 (ADR-0020): G-17 define-what-you-name (gate Q13), G-18 the
through-line (SHOULD — deliberately, so it cannot become another rule that
ships as text and is never kept), deep-dive goes prose-led, and the pipeline
states the re-run rule. Content layer only; no card re-rendered.

**Follow-up.** The next card authored should be a `deep-dive` under 3.11.0 —
the prose-led register has a spec now and zero cards exercising it.

## 2026-08-29 — claude (for derick) — [drift]

**Context.** Derick reported cards clipping on phones after the V3.10 cut, and
an audit pass confirmed it — but not where the report pointed. The skills cut
did not break the canvas: every frozen card renders byte-identical, the type
inventory per card is unchanged (measured, pre and post), and the three-size
reading core holds. The clip was older and quieter. R-34 (V3.9) prescribes
`width=393` *so the canvas scales to the device*; every page since V3.9 has
emitted `width=393, initial-scale=1`, and the pinned scale defeats the fit —
18px of every card offscreen at 375, 33px at 360. V3.10's R-43 commit then
copied the same tag onto the site pages and verified only the layout viewport,
so the "fix" institutionalized the defect. Worst of all, the no-tools build
section teaches the tag, so every card built from a paste of `llms.txt`
inherits the clip.

**Action.** v3.10.2 (ADR-0019): the pinned scale is dropped on all four
surfaces, R-34 now says "never pin `initial-scale`" in as many words, all
eight renders regenerated, `llms.txt` regenerated, and the fit is *measured*
at 393/375/360/320 under mobile emulation — the V3.10 lesson applied to
V3.10's own patch: verify the visual viewport, not the layout one.

**Follow-up.** The full audit is in `40-LAB/AUDIT-2026-08-29--draft.md`,
including the type-inventory measurements that clear the skills cut of the
weight-proliferation charge, and where the perception actually comes from.

## 2026-08-29 — claude (for derick) — [outside eyes]

**Context.** Every version cut so far was written from inside: read the cards,
notice a defect, name a rule. V3.10 pointed a standard from outside the system
at it — the eleven `jakubkrehel/skills` interface skills — and the interesting
result is not the list of findings. It is that nearly every finding was the
system failing a promise it had already made in writing.

R-20 says `--g-30` is non-text. Five glyphs a reader has to read were drawn in
it, at 2.10:1. ADR-0011 made the em-dash ban retroactive to every card and the
V3.6 changelog recorded the sources as cleaned; the validator skipped every
V3.0 card, so one of them shipped eighteen of them. R-29's `td.num` styling has
been in the stylesheet since V3.7 and no render path ever emitted the class.
The subhead was catalogued, styled, authored as `### ` in every card, and
rendered as a `<div>`.

**The noticing.** These are all the same failure, and it is a specific one: the
spec is checked against the *screenshot*, and the screenshot cannot show you
the layer underneath it. A `<div>` styled as a heading photographs exactly like
a heading. A gate that never runs looks identical to a gate that passes. A
token used out of role renders the colour it was borrowed for. V3.9 caught the
defects a camera could see, because it used a camera. V3.10 caught the ones it
could not, because it read the HTML and measured the pairs.

**The temptation resisted.** The obvious move, holding eleven skills full of
exact values, is to apply them. Concentric radius everywhere, shadows for
elevation, an accent ramp, a 60-character measure, `text-box` trimming. Most of
that would have made the cards worse, and `SKILLS-interface-map.md` exists so
the next steward does not have to relitigate it: shadows were retired on
purpose in V3.6, there is no hue and never will be, the measure is a
consequence of the canvas being the format. A standard that cannot lose an
argument is a template, not a standard.

**The line that held.** R-36 and R-37 change the archive, and they were argued
hard both ways. The test from ADR-0011 is: broken markup, overflow, a wobbling
gap. A subhead rendering at 16px browser default is broken markup. A marker at
2.10:1 is a marker nobody can read. Neither is a period design choice, and
calling them one would be the rationalization the V3.9 card warned about. R-41
and R-42 change where lines break and which glyph a quote opens with — those
*are* design, so they went in `.canvas.v3-10` and the archive keeps its rag.

**What to watch.** The design review is Stage 4b now, which means the next
card's authoring notes will carry a findings list. If those lists start reading
the same way every time — the same three nits, no system-level findings — the
stage has become a ritual and should be either sharpened or dropped. The signal
to watch for the opposite failure: a system-level finding getting patched into
one card instead of becoming a rule. That is how an archive stops being true.

---

## 2026-07-03 — claude (for derick) — [drift]

**Context.** The request was "more variety, but every card keeps looking
great" — and the published renders showed why both halves were failing.
Measured in headless Chromium at 393px, not eyeballed: a checklist rendering
as 13px footnote fine print with literal `[ ]` markers, a Koffka quote
rendering as a literal `>` paragraph, the one equation in the archive
shredded into `<p>``<code>` fragments, four cards with their **Authoring
notes** printed on the reader-visible canvas, a 370px table in a 359px
column, and a "uniform" beat gap that measured 97px after prose but 109–145px
after a list or chart. The deeper pattern: the generic emitter was a silent
default — anything it didn't recognize *became prose or fine print* rather
than failing loudly, so the catalogue's variety collapsed to "prose, a list,
a table" not because authors chose that but because the renderer did. And the
corner glyph was carrying `v3.8 atlas` — version chrome R-10 itself bans.

**Action.** Shipped V3.9 (ADR-0016): R-33 makes every catalogued block render
as catalogued (quotes, code, ✓/✗/numbered lists, dividers, timelines, and
scaffold-section skipping — logged loudly); R-34 makes the fit and rhythm
*measured* properties (width=393 viewport, base-level fixed tables,
overflow-wrap, last-child margin reset, R-13-exact cover joins, viewBox-safe
chart text); R-35 builds `column-chart` + `area-chart` and extracts all chart
math into `chart-geometry.mjs` — the extraction trigger my 06-27 entry set
("a third chart type lands") fired exactly as predicted. Also repaired the
spec teaching against itself: the ADHD gate still *required* asterisms two
versions after R-24 banned them.

**Follow-up.** Two `!important`s entered the stylesheet (cover join,
last-child reset) — each commented, each cheaper than a per-scope override
matrix, but if a third lands, restructure the beat-gap scoping instead. The
audit script lives on as a pattern: gap deltas and bbox checks caught what six
version reviews of reading the CSS did not — consider promoting a headless
measurement pass into the validator (G-gate) rather than trusting discipline.
Watch `gauge-progress`, `waffle`, `heatmap`, `slope-chart`, `scatter-quadrant`,
`dot-plot`, `histogram`, `small-multiples`, `sparkline`, `annotated-data-point`:
still catalogued with no dedicated render treatment (they degrade to tables /
prose gracefully now, but the catalogue-vs-renderer gap is not fully closed).

---

## 2026-06-27 — derick — [foundation]

**Context.** Looking at the published cards side by side, they all read the same:
prose, a list, a table, repeat. The screenshots that prompted this were two
comparison tables and a mapping table — competent, but interchangeable. Three
things were wrong under the surface. The block library had been *advertising* a
whole chart family (`bar-chart`, `line-chart`, `stat-grid`, `stat-callout`) as
`stable` for a year, and not one of them was ever wired into a render path — the
catalogue was writing checks the renderer couldn't cash. A table's last-row
hairline stacked with the section divider into a visible double line. And the
cover couldn't open with an eyebrow, because R-13 forbade the kicker slot
outright.

**Action.** Shipped V3.7 (ADR-0014). Built the four numeric/chart blocks for real
in *both* paths, with the SVG geometry duplicated verbatim so the HTML twin and
the React card stay pixel-identical. Chose to author charts as a plain `| label |
value |` table — the block id picks chart-vs-table — so no new syntax enters a
card and an LLM reading the spec still sees legible markdown. Permitted exactly
**one** cover eyebrow (R-27) under the same discipline as any other eyebrow,
rather than re-opening the cover to chrome. Fixed the double line at base level
(R-28, retroactive) and the ragged mobile columns with a fixed grid (R-29).

**Follow-up.** Two render paths now carry duplicated chart geometry — the first
real DRY violation in the system. It's small and commented as a parity pair, but
if a third chart type lands, that's the signal to extract a shared geometry
module both paths import, not to copy the math a third time. `column-chart` and
`area-chart` are still catalogued-but-unbuilt; same trap as before — watch that
the gap between catalogue and renderer doesn't silently reopen.

---

## 2026-06-25 — derick — [temptation]

**Context.** The V3.5 reading-layer pass (ADR-0009) measured a working render
against Apple's tracking table and WCAG and found four small drifts: R-9's
positive body tracking, a 48pt beat gap where Apple runs 60–80, three text inks
below the 4.5:1 floor, and nine type sizes where the canon wants three. The
obvious move — and the one I had to talk myself out of — was to *fix the three
published V3.x cards too*. They sit right there in `docs/cards/`; re-inking them
to #1A1A1A and re-tracking the body to −0.01em is a five-minute script. And they
would look better.

**Action.** Didn't. The whole point of frozen-at-version (P8 / ADR-0003) is that
"they would look better under the new rules" is exactly the rationalization that
corrupts an archive — it's how you end up unable to reconstruct what V3.4
actually shipped. The four changes apply only to `frozen_at_version: 3.5.0`; the
CSS scopes every new metric under `.canvas.v3-5` and leaves the base `:root` ink
tokens alone; R-9 and R-18 stay verbatim in the spec, superseded-not-deleted,
next to R-19 that replaces them. The old cards keep their authored render. If a
V3.x card ever deserves the V3.5 treatment, it gets *re-authored* under 3.5.0
with a migration note — voluntarily, visibly — not silently rewritten.

**Follow-up.** Shipped all four as one version because they were validated as
one render — a half-migration (new inks, old tracking) is a render nobody
checked. Watch the tinted-surface caveat: tertiary `--ink-3` #767676 clears
4.5:1 on white but only ≈4.3:1 on `--surface-tint`. The validator now re-checks
against the tint, but if authors keep tripping it, that's signal the tinted
variant should carry its own darker tertiary token rather than leaning on author
discipline.

---

## 2026-05-14 — derick — [foundation]

**Context.** The pipeline named the breakdown the source of truth (ADR-0005) but parked it in `40-LAB/`, the drawer labelled "experiments" — no home, no registry, no way to know a topic had already been researched. And rendering was Stage 5, *optional*: cards shipped as markdown nobody had looked at, and the one render in `docs/` had nowhere for a second card to go. Two gaps in the most-used path: where research *lives*, and how the user actually *sees* the result.

**Action.** Gave research a real address — `60-RESEARCH/`, with a registry (`INDEX-research-reports`) that makes "has this been researched?" a one-grep question and makes duplication a pipeline-gated mistake (ADR-0006). Rewrote `TEMPLATE-breakdown` from a thin 7-beat stub into an extensive deep-research-report spec — research brief, research log, full apparatus (rated source register, quotes bank, numbers bank, contested claims, open questions, confidence) — so the report can inform a drafting agent it will never meet. Made render-and-publish mandatory (ADR-0007): every request now ends with an HTML card in `docs/cards/` and a gallery entry, viewable online. Wrote `BREAKDOWN-spaced-repetition` as the worked-example genealogy of the sample card.

**Follow-up.** The registry and the gallery are both hand-maintained indexes — watch for drift; if it recurs, that's signal for a validator (or CI) rather than more discipline. The breakdown template is deliberately heavy — if authors start skipping its apparatus sections, that's signal the floor is set too high for `summary`-mode requests and the template may need a tiered "light vs. full" split.

---

## 2026-05-14 — derick — [foundation]

**Context.** The system could describe a finished card but not the *act of building one* — research, structure, and block selection lived as fragments across INDEX, GRAMMAR, and LENGTHS. A request to "research X" or "summarize this book" had no single repeatable path.

**Action.** Added the assembly pipeline (`PIPELINE-card-assembly`): Request → Mode → Deep research → Breakdown MD → Supercard MD. Introduced **modes** as the adaptability dimension — `summary` / `briefing` / `deep-dive` / `reference` — distinct from length; a mode biases research depth, length, block selection, and redundancy posture. Made the **breakdown MD** the uncompressed source of truth and the card a constrained *view* of it, so the same research can yield different cards. Shipped `TEMPLATE-breakdown` and a `supercard` skill.

**Follow-up.** `deep-dive` deliberately allows multi-part cards past the 25-block cap — watch the first few to confirm splitting doesn't become an excuse for redundancy. If a fifth mode is needed, that's signal for an ADR formalizing the mode system.

---

## 2026-04-29 — derick — [foundation]

**Context.** V3 system goes live today. Three foundational ADRs accepted (named eras, four-tier lifecycle, frozen-at-authored-version). Folder structure created. SupercardOps tooling stubbed. INDEX established as the canonical entry point.

**Action.** Day-1 setup complete. Beginning the 38-block authoring pass. Will document each block as a separate doc in `20-BLOCKS/` with full Composition / Rationale / Precedents / Common Mistakes / Shape Test sections.

**Follow-up.** First real V3 Supercard expected by end of Week 1. Will run audit workflow against it to validate the system actually catches drift.

---

*(future entries will append above this line)*

---

## How to use this log

**When to write an entry.** When you notice something worth remembering: a pattern across cards, a block that's not pulling its weight, a temptation to add complexity, a shift in how you read your own work, a small judgment call that doesn't merit an ADR.

**Entry shape.**

```
## YYYY-MM-DD — author — [tag]

**Context.** What you noticed, where you were, what triggered it.

**Action.** What you did, or didn't do, in response.

**Follow-up.** (optional) What to revisit later.
```

**Common tags.**

- `[foundation]` — system-level design moments
- `[block]` — observations about a specific block
- `[card]` — observations about a specific card
- `[drift]` — caught yourself drifting from principles
- `[temptation]` — almost added something; resisted
- `[promotion]` — promoted a block from Experimental → Stable
- `[rejection]` — rejected an idea (and why)
- `[review]` — quarterly review notes

**When to escalate.** If a log entry recurs across multiple weeks (the same temptation, the same drift, the same gap), it's signal that an ADR or block change is needed. Escalate to RFC in `40-LAB/`.
