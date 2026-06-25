# LAB — System-Evolution Research (toward V3.1)

| key | value |
|---|---|
| id | LAB-system-evolution-research-v3.1 |
| type | lab |
| era | atlas |
| version | 3.0.0 |
| targets | 3.1.0 |
| owner | derick |
| created | 2026-05-14 |
| updated | 2026-05-14 |
| status | exploring |
| confidence | high |

> **What this file is.** The consolidated research report for a deliberate
> system-evolution pass on Supercard V3 — two thrusts: *polish the design
> style* and *perfect the beats*. It synthesizes six parallel deep-research
> agents into one inspectable artifact. **Nothing in the spec has been changed.**
> Every recommendation below carries a stable ID and a status of
> `pending-adjudication`; the spec is updated only after the owner rules on each,
> item by item (see § Adjudication log). This file is the genealogy of whatever
> V3.1 becomes — keep it as the asset (PRINCIPLE 10).

---

## 0. Provenance & method

A single research question — *how should the Supercard system evolve to better
serve its own goals?* — fanned out to **six parallel research agents**, each
scoped to one facet, each instructed to ground recommendations in the current
spec, return findings sourced and reliability-rated, and **write no files**
(reports returned in-chat, consolidated here).

| agent | scope | thrust |
|---|---|---|
| A1 | Typography & emphasis-without-color | design polish |
| A2 | Layout, space & elevation | design polish |
| A3 | Narrative structure & the 7-beat spine | perfect the beats |
| A4 | Cognition — attention, load, comprehension, memory | perfect the beats |
| A5 | Drift audit of the 3 existing cards | meta |
| A6 | Peer-systems research — what to steal | meta |

Each agent's full report is preserved verbatim in the appendices (§ A1–A6). The
body of this document is the synthesis: what converged, what's urgent, what's a
gap, and what needs the owner's judgment.

---

## 1. Executive synthesis

**The system is well-built and well-reasoned — almost nothing in its *values*
needs to change.** The recurring verdict across all six agents: Supercard is
**well-tuned but under-explained**, and it is **right for reasons it does not
state**. The drift audit confirms it from the other end — the two cards that
completed the pipeline are clean on every *aesthetic* rule (zero color
violations, correct gray ramp, scaffolding labels stripped, dividers behaving).

The work divides into four buckets:

1. **Two factual citation errors** in `PRINCIPLES` — fix regardless of any other
   decision (§ 3, R-A1).
2. **One urgent drift fix** — the Musk card is not yet a Supercard (§ 3, R-A3).
3. **~8 spec gaps** where rules were ambiguous or self-contradictory and every
   card-author had to guess — and guessed inconsistently (§ 4).
4. **A set of genuine evolution choices** — the actual "perfect the beats /
   polish the style" work — each trading against an identity principle, each
   needing the owner's adjudication and probably an ADR (§ 5).

The drift audit's structural conclusion frames the whole pass: **the system
catches *aesthetic* drift well but not *structural* drift** (emphasis budgets,
render parity, publish completeness) — because those rules are narrated in prose
or contradictory in the spec. The Stewards' Log already predicted "if drift
recurs, that's signal for a validator." It has recurred.

---

## 2. The two cross-cutting themes

Every agent independently surfaced one of these.

### Theme 1 — Lookup tables, not a grammar of relationships

`RENDERING-spec` lists tokens as flat value tables but never states how they
*relate*:

- Spacing is never tied to leading (no vertical-rhythm rule).
- "Density" (Mini/Standard/XL) is asserted as words — High / Comfortable /
  Spacious — but never mapped to spacing tokens, so the three tiers differ only
  in block *count*, not in any documented spacing behavior. This invites the
  exact three-systems drift `LENGTHS` says it is preventing.
- Elevation rules are split across three docs.
- "Concentric with iOS 26" is named but the math is never computed — with a
  16pt card radius and 24pt internal pad, the concentric inner radius is
  `16 − 24 → clamps to 0`, i.e. anything nested inside a card must have square
  corners. The spec never says this.

**No token values are wrong. The system is under-specified as a system.** The
single highest-leverage structural move is to add a few short "how these tokens
relate" subsections — not to retune any number.

### Theme 2 — Right for reasons it doesn't state

The system does the right thing and stays silent on why — which is exactly how
the next steward "fixes" it back into drift:

- It correctly puts load-bearing claims at Hook (primacy) and Close (recency) —
  unstated.
- Section dividers correctly rescue mid-card beats from the serial-position
  recall trough — unstated.
- It stays near-flat *against* the prevailing iOS 26 / visionOS move back toward
  depth and materials — unstated, so a future steward will "correct" it.
- The corner glyph is a deliberate guard against the documented
  decontextualized-quote "flattening" failure mode — unstated.

Making the rationale explicit is what protects the system from its own future.

---

## 3. Part A — Urgent & unambiguous

Fix these regardless of how any Part 5 tension is adjudicated.

### R-A1 — `PRINCIPLES` #2 cites the wrong papers
`status: pending-adjudication` · sources: A1, A4 (independently caught) ·
target: `10-GOVERNANCE/PRINCIPLES-supercard-v3.md` §2, §9

PRINCIPLE 2 cites *Lorch 1995* and *Sanchez & Wiley 2006*. Findings:

- There are **two** "Lorch 1995" papers. The one that *actually supports the
  claim* is **Lorch, Lorch & Klusewitz (1995),** *Contemporary Educational
  Psychology* 20:51–64. Its real finding is *sharper* than the spec states:
  heavy signaling performs **no better than no signaling at all** — over-emphasis
  doesn't dilute, it zeroes out. Disambiguate the citation to this exact paper,
  and sharpen the claim text to match.
- **Sanchez & Wiley 2006** is the *seductive-details* effect (irrelevant but
  interesting material harms comprehension, esp. for low-WM readers). That is a
  **correct citation — for PRINCIPLE 9 (the redundancy filter).** It is filed
  under the wrong principle. Move it.
- The missing mechanism is the **von Restorff / isolation effect** (von Restorff
  1933; Hunt 1995, *Psychonomic Bulletin & Review*): distinctiveness is
  *relational* — if three things are bold, none is isolated, so the advantage
  collapses for all three. This is the precise basis for "two emphases compete;
  three is noise." Add it.
- Optional extension: the 2023 *Memory & Cognition* ERP study neurally confirms
  the mechanism (emphasis recruits controlled attention); Mayer's signaling
  principle generalizes it. Three independent literatures converge on the rule
  the system already enforces — the rule is right, only the footnotes are wrong.

### R-A2 — The ADHD identity claim cites zero ADHD research
`status: pending-adjudication` · source: A4 · target:
`10-GOVERNANCE/PRINCIPLES-supercard-v3.md` (preamble or §1 "Why it matters")

The spec stakes its identity on "cognitive prosthesis for **ADHD** readers" but
argues entirely from general cognition. The ADHD literature is *stronger and
more specific* than what is on the page:

- **Centrality deficit** — Miller, Keenan et al. (2013), *Journal of Abnormal
  Child Psychology*: ADHD readers disproportionately fail to recall the *central*
  idea of a text even when they can identify it; working memory fully mediates
  the effect. → the best possible justification for single-emphasis: it
  *externalizes centrality detection* for a reader who cannot do it internally.
- **Scrolling penalizes low-WM readers** — Sanchez & Wiley (2009), *Human
  Factors*: a scrolling format reduced comprehension of complex text specifically
  for low-working-memory readers. → a better empirical core for PRINCIPLE 1
  (screenshot autonomy) than anything currently cited.
- **Event-segmentation deficit** — ADHD readers under-segment continuous input;
  Supercard's blocks *are* the segmentation.

One paragraph with these three citations converts the identity claim from
branding into thesis. A4 rated this the single highest-value addition in the
whole pass.

### R-A3 — The Musk card is not yet a Supercard
`status: pending-adjudication` · source: A5 · targets: `30-CARDS/`,
`60-RESEARCH/`, `40-LAB/`, `docs/`, `INDEX-research-reports.md`

`CARD-2026-05-14-musk-altman-openai-trial--draft` violates ADR-0007 and ADR-0006
right now:

- **No render** in `docs/cards/`; **not in** the `docs/index.html` gallery.
- The card's frontmatter **omits the `render:` field entirely** (the templates
  include it).
- Its breakdown is still in `40-LAB/` — the "experiments drawer" — not
  `60-RESEARCH/`. The Stewards' Log entry of the *same day* says parking
  breakdowns there was the exact bug ADR-0006 fixed.
- It is **unregistered** in `INDEX-research-reports.md` — "has this been
  researched?" is not a one-grep question for this topic.
- The breakdown frontmatter predates the `TEMPLATE-breakdown` rewrite and is
  missing `slug`, `status`, `modes_derived`, `derived_cards`, `confidence`,
  `updated`.

It is the precise pre-ADR-0007 failure mode the system *just* declared fixed.
**Decision needed:** render + publish + register + migrate it, or pull it. The
markdown itself is mostly sound and salvageable (correct Mini beat selection,
5 blocks in range) — but it also has its own content fails (see § A5: 2 emphases
in Beat 3, screenshot-test Q1/Q3 failures) that must be fixed in the same pass.

---

## 4. Part B — Spec gaps (authors had to guess; they guessed inconsistently)

Each is a real ambiguity or contradiction the drift audit caught producing
divergent cards. All `status: pending-adjudication`.

### R-B1 — Emphasis budget: per-block or per-list-item?
sources: A4, A5 · target: `PRINCIPLES` §2 + `GRAMMAR` decision-tree entries for
anti-pattern / checklist / numbered-principle

The single highest-frequency drift. *Every* `checklist` and `anti-pattern` block
in the repo bolds the lead-in of *every* bullet — Gestalt's Counter renders five
`<strong>` spans. PRINCIPLE 2 says "exactly one emphasized phrase" *per block*,
but a list block is structurally a list, and the spec never says whether the
budget is per-block or per-item. The von Restorff finding (R-A1) says it must be
**per-block** — five isolates is zero isolation. Resolve explicitly, and if
per-item lead-ins are allowed at all, cap their *weight* so they don't all read
as focal.

### R-B2 — How are multi-block beats labeled?
source: A5 (also A3) · target: `GRAMMAR` §spine + `RENDERING-spec` §output
contract

`GRAMMAR` says XL runs "multi-block beats" but never says how the sub-blocks are
*titled*. The Gestalt author stuttered the beat name — the markdown has three
`## Beat 2 — Evidence` and six `## Beat 3 — Mechanism` headings, and the render
shows `EVIDENCE EVIDENCE EVIDENCE` / `MECHANISM ×6` as separate eyebrowed
sections. Recommended fix (A5): render the beat eyebrow **once** on the first
block of the beat; subsequent blocks in the same beat carry their `<h2>`
subtitle only.

### R-B3 — "≤3 long sections in a row" contradicts XL multi-block beats
sources: A5, A3 · target: `GRAMMAR`

`GRAMMAR` says "Never run more than 3 long sections in a row" *and* says XL runs
multi-block beats. Gestalt's Mechanism is **six blocks** — the two rules are
live and contradictory, and the author sided with "the topic needs it" (the
exact rationalization PRINCIPLE 7 warns about). Reconcile: either multi-block
beats are explicitly exempt from the run-length rule, or there is a hard
per-beat block cap.

### R-B4 — `render:` field unenforced; no render-parity / publish check
sources: A5, A2 · target: `PIPELINE` + a new CI validator

Nothing caught the Musk card's missing `render:` field, missing render, missing
gallery entry, missing registry row. The Stewards' Log predicted: "if drift
recurs, that's signal for a validator (or CI) rather than more discipline." It
has recurred. Build a CI check covering: `render:` field present + file exists;
card in gallery; breakdown in `60-RESEARCH/` and registered;
markdown↔render parity (e.g. Gestalt's authoring notes claim 2 lofted elements,
the render ships 1 — self-reported compliance, already wrong).

### R-B5 — Body measure (line length) is ungoverned
source: A1 · target: `RENDERING-spec` §canvas

`RENDERING-spec` defines canvas width and padding but never a target *measure*.
Today body text runs ~35–38 characters per line — inside the mobile-optimal
band (research: 30–50 CPL; Dyson & Haselgrove 55 CPL) — but **by accident**: a
future block with reduced padding or a wider variant drifts out silently. Add an
explicit target: "Body text measure: 35–45 CPL; any block or variant that
changes content width or padding stays in this band."

### R-B6 — "Density" is never mapped to spacing tokens
source: A2 · target: `LENGTHS` + `RENDERING-spec` §spacing cross-ref

`LENGTHS` calls Mini "High" density, Standard "Comfortable," XL "Spacious" but
never maps those words to tokens. The tiers currently differ in block *count*
and beat coverage (well-specified) but not in documented spacing — which is the
actual definition of density. Add a "density resolves to spacing tokens" table
so each tier is provably "the same scale, indexed differently," not three
systems. (A2 supplied a structural draft; exact values are an owner call.)

### R-B7 — "Sparingly" / "1–3 lofted" have no enforced number or parity check
sources: A5, A2 · target: `GRAMMAR` decision tree + `RENDERING-spec` §shadow

The decision tree says "Table (sparingly)" with no cap — Gestalt uses `table`
3×. The loft budget ("1–3 elevated elements") is narrated in every card's
authoring notes, never machine-checked — and Gestalt's narration is already
wrong (claims 2, render has 1). Give "sparingly" a number; make the loft budget
checkable; tighten the elevation role-mapping into one place (A2: of the 1–3,
slot 1 = hero/`lofted` mandatory, slot 2 = primary anchor, slot 3 = at most one
mid-card breath; `subtle` never appears without a `lofted` element present).

### R-B8 — Breakdown schema versioning is undefined
source: A5 · target: `TEMPLATE-breakdown` / a breakdown-governance note

The Musk breakdown predates the `TEMPLATE-breakdown` rewrite and was never
migrated — it is missing half its frontmatter. PRINCIPLE 8 freezes *cards* at
version, but breakdowns are not cards. State explicitly whether breakdowns are
frozen or living, and if living, that pre-rewrite ones must be brought forward.

---

## 5. Part C — Evolution choices (need the owner's adjudication)

The actual "perfect the beats / polish the style" work. Each trades against an
identity principle. All `status: pending-adjudication`; most likely each wants
an ADR.

### Beats & narrative

**R-C1 — The Hook is doing too much.**
source: A3. Beat 1 is simultaneously thesis, visual anchor, *and* (smuggled via
the "Lede") scope-setter. Comprehension research (prime the schema first) and
SCQA (the "Situation" move) both want a "what is this / what's in scope" move
*early*. Two options: **(a)** formalize the Hook lede as the scope contract —
keeps the identity-defining "7" intact (A3's recommendation); **(b)** add a
"Frame" beat — cleaner, but breaks "7." Cost of (b): "7-beat narrative spine" is
named in PRINCIPLE 3 as identity. A3's read: the *spine* is sacred, "7" is a
consequence — but that is the owner's call.

**R-C2 — The Mini collapse drops the wrong beat.**
source: A3. Mini currently drops Comparison **and** Counter (keeps 1,2,3,6,7).
Refutation-text research (coactivation; hypercorrection) and one-sided-vs-
two-sided-message meta-analyses say **Counter is load-bearing for *comprehension
itself*, not just balance** — a Mini with no steelman is an empirically weaker,
less credible artifact (a one-sided message). Recommended: Mini drops Comparison
only, keeps a one-line compressed Counter → beats 1,2,3,5,6,7.

**R-C3 — Comparison and Counter bleed together.**
source: A3, confirmed A5. Both are contrastive; the Gestalt card produced four
blocks all doing contrast work. Recommended fix is *language, not order*: rewrite
the beat-4 / beat-5 descriptions to draw the line explicitly — Comparison =
*lateral* (sibling concepts, what it's NOT), Counter = *adversarial* (the
steelman against the thesis itself) — and add a one-line disambiguation test.

**R-C4 — `reference` mode doesn't fit a linear spine.**
source: A3. Diátaxis: reference material is a *map*, not a story — structured by
the subject's own shape, not Hook→…→Close. The `PIPELINE` already gives
`reference` mode a different block bias *and* a carve-out against the redundancy
filter — the spec quietly admitting the misfit. Define `reference` properly (the
spine runs once as a top overview, then the body becomes a catalogue keyed to
the subject's structure) or give it its own structural template.

**R-C5 — Climax-last vs. answer-first — record the decision.**
source: A3. Supercard runs classical "peroratio" (Close at beat 7); the entire
consulting / journalism / military world (Minto Pyramid, BLUF, inverted pyramid)
leads with the answer. Per-block screenshot autonomy mitigates this (you can
"stop anywhere" *locally*) — but a reader who crops only beat 3 gets mechanism
with no bottom line. Worth a *recorded* rationale (ADR or PRINCIPLES note) so it
is not silently re-litigated.

**R-C6 — Section dividers as sanctioned connective tissue.**
source: A3 (also A4 on serial position). Every narrative framework derives its
power from connectives — but screenshot autonomy forbids connective openers
inside blocks. Supercard has resolved this by making the beats a *labeled
scaffold*, not a flowing narrative. Make that honest and deliberate: explicitly
designate section-divider text as *where inter-beat narrative flow lives*, and
note (A4) that dividers also re-trigger local primacy, rescuing mid-card beats
from the serial-position recall trough.

### Visual style

**R-C7 — Body leading sits at the bottom of the comfortable band.**
source: A1. Current Body 17/24 = 1.41×; research-supported band is 1.4–1.5
(WCAG leans 1.5). For an ADHD-reader prosthesis, where line-skipping is a known
failure mode, 1.41 is defensible but not generous. Recommended: raise to 17/25
(1.47×) or 17/26 (1.53×). **Cost (flagged by A2):** every block gets taller, and
`GRAMMAR`'s length budgets (block heights, total scroll) are calibrated to
current leading — raising leading means accepting longer cards or recalibrating
the budgets. Owner's trade-off.

**R-C8 — The gray ramp has a text-legibility hole.**
source: A1. Computed contrast on white: `g-30` ≈ 1.9:1 — **fails every WCAG bar,
including the lenient large-text 3:1.** `--ink-4` #888 ≈ 3.5:1 (fails AA normal
text). The spec assigns `g-30` to "tertiary text, deemphasized data." For an
ADHD prosthesis, illegible "deemphasized" text is worse than none. Recommended:
restrict `g-30` and lighter (`--ink-4`, `--ink-5`) to **marks only** — gridlines,
chart context series, hairlines — and make `g-60` (#666, ≈5.7:1) the lightest
value that ever carries words. **Tension:** under PRINCIPLE 8 (frozen-at-version),
existing V3.0 cards that used `g-30` as text stay as authored — so this ships
either as a V3.1 ramp revision or a V3.0.x clarification. Owner's call on framing.

**R-C9 — Body tracking is tighter than Apple's optical default.**
source: A1. At 17pt, Supercard's −0.008em ≈ −0.14px vs Apple's optically-tuned
−0.43px — Supercard is *one third* as tight, which works against the crowding /
legibility goal. Recommended: loosen toward −0.004em or 0. **Open question for
the owner:** is "slightly airier than iOS" a deliberate Supercard signature, or
should tracking match Apple's optical tuning? That decision sets the exact value.

**R-C10 — Codify "bold is the only emphasis style" + "body is always
ragged-right."**
source: A1. Two small, well-supported additions: (a) bold-weight span is *the*
emphasis primitive — italic/underline for emphasis introduce a competing second
axis; add as an anti-pattern. (b) Body text is always left-aligned, ragged-right,
never justified — justification creates word-spacing "rivers" that disrupt
tracking for attention-divergent readers (one of the few robust dyslexia/ADHD
layout findings). Currently unstated.

**R-C11 — Add the relationship subsections `RENDERING-spec` is missing.**
source: A2 (the Theme-1 fix). Add short subsections: a **vertical-rhythm note**
tying inter-element spacing to the 24pt body line; a **"self-framing recipe"**
stating how a *flat, borderless* block achieves screenshot autonomy (internal
proximity via small tokens + a ≥`--s-5` separation gap so the crop lands in
whitespace + the glyph/beat-label as the lightweight frame); and a one-sentence
**concentricity clarification** (nested elements inside a card use square
corners, because 16pt radius − 24pt pad = 0). Also scope `--s-0` (4pt) as
"horizontal / sub-element only — never a vertical block gap," and justify or
demote the single-use `--s-8` (96).

**R-C12 — Note the deliberate elevation divergence from the platform.**
source: A2. iOS 26 / visionOS are moving *toward* depth, glass, and materials;
Supercard is moving the other way. This is defensible (editorial timelessness,
PRINCIPLE 5) — but add a one-line note in `RENDERING-spec` §shadow that the
near-flat aesthetic is an *intentional* divergence, so a future steward doesn't
"fix" it by adding glass. (Recommendation: keep the 1–3 cap, the ≤6% opacity
ceiling, the 3-tier scale, pure-black shadows — all validated. Only the
*rationale* is missing.)

### Borrowed from peers

**R-C13 — An "epistemic status" line on the rendered card.**
source: A6 (highest-value, lowest-risk steal per A6). One compressed line
surfacing what is currently buried in `mode` / `lifecycle` / authoring notes —
e.g. "Deep-dive · 10 primary sources · high confidence" — so a *cropped
screenshot carries its own trust signal*. Serves PRINCIPLE 1 (autonomy) and
PRINCIPLE 10 (genealogy, but *visible*). **Tension:** this directly reverses
recent commit b14f29f ("strip dev scaffolding from renders"). The adjudication
is: is epistemic status *content* (a trust signal the reader needs) or
*scaffolding* (authoring noise)? A6's argument: content. Owner rules.

**R-C14 — Block-level addressing + a generated backlink index.**
source: A6 (converges with Zettelkasten, Notion block IDs, Roam/Obsidian). Atomic
blocks (PRINCIPLE 2) are currently anonymous and un-citable; genealogy
(PRINCIPLE 10) is *asserted* but not *navigable*. Give blocks stable addresses;
generate a backlink index (like the existing JSON spec tree). **Hard constraint
(A6):** keep it a *secondary, generated, read-only* index — never an authoring
surface. Graph-as-the-primary-structure is the V2-drift failure mode in
disguise.

**R-C15 — An inline, word-scale sparkline primitive.**
source: A6. Tufte's sparkline was *designed* for monochrome typographic context
— it is the single most under-exploited idea given Supercard's strict grayscale.
Currently `Sparkline` exists only as a full block; add a true word-sized inline
primitive usable inside `stat-callout` / `standard-text`.

**R-C16 — Name the ancestors; adopt Tufte's "smallest effective difference."**
source: A6. The **Tufte handout** and the **airline safety card** are
independent prior art for "anti-slide-deck, self-sufficient, self-paced" — cite
them in `PRINCIPLES` alongside the Postcard. (The safety-card industry
independently re-derived single-emphasis: "drawings let essential actions be
emphasized, backgrounds omitted.") And name Tufte's **"smallest effective
difference"** as the operating rule of the six-step gray ramp — PRINCIPLE 5 says
"no color" but never says *how to use the grays you have left*.

**R-C17 — Finding-stating titles on chart/data blocks + a within-block data-ink
audit.**
source: A6. (a) Require chart blocks to carry a *finding-stating* title ("GDP
rose 6× since 1950"), not a *topic-stating* one ("GDP over time") — the
chart-level screenshot test (Our World in Data / NYT annotation discipline).
(b) Add a per-block data-ink audit — every gridline, frame, tick, label
justifies itself or is deleted — sharper than "earns its scroll"; add "chart
frame / axis chrome that isn't load-bearing" to the anti-pattern table.

**R-C18 — Engineer the Hook as an open loop, not a summary.**
source: A6 (carousels, Anki). The hero carries the entire share decision;
carousel and flashcard practice both *withhold then reveal*. Supercard heroes
currently lean *summary*. **Tension:** a pure cliffhanger fails the screenshot
test (PRINCIPLE 1 wants one *complete* idea). A6's read: a hero can state a
complete claim *and* imply "here's the catalogue" — the Gestalt hero already
does this — but the line between "open loop" and "incomplete" needs drawing in
`GRAMMAR`. Pairs with R-C1.

**R-C19 — Adopt USWDS release-status vocabulary + a promotion checklist for the
block library.**
source: A6. The 38-block library has lifecycle tiers; USWDS's consumer-facing
vocabulary (`Experimental` / `Stable` / `Use with caution`, published *on* each
component) is more honest, and Carbon's model gates promotion behind a
documented checklist. Borrow the *vocabulary* and a *comment window* for RFCs;
**do not** import the heavy multi-stage committee pipeline (that would be
PRINCIPLE 7 friction in the wrong place — friction belongs in authoring a card,
not bureaucratizing the spec).

**R-C20 — Designate Beat 7 as "the screenshot."**
source: A6. Carousel practice makes the final slide the most shareable single
frame. Ensure Beat 7 (Close) is the *designated crop* — the most self-contained,
quotable block — the one a sharer takes when they take only one.

---

## 6. Part D — Validated; do not touch

Reassurance is a research output too. These are confirmed best-in-class against
the literature and against peer systems — leave them alone:

- **SF Pro Rounded as the typeface.** The dyslexia-font literature actively
  *vindicates* a clean, high-x-height mainstream sans over a "specialized" font
  (Rello & Baeza-Yates 2013; Kuster et al. 2018). [A1]
- **Single emphasis as a *principle*.** Empirically the best-supported rule in
  the system — behavioral, neural, and multimedia-learning literatures converge;
  the airline-safety-card industry re-derived it independently. Only its
  *citations* are wrong (R-A1). [A1, A4, A6]
- **Strict grayscale as identity.** Forcing emphasis onto weight/size/position
  is exactly how monochrome editorial systems (NYT, Bloomberg, the zine /
  photocopier tradition) create richness. The constraint is a strength. [A1, A6]
- **The 1–3 loft cap** — A2: "arguably the system's sharpest single rule." Keep
  the cap, the ≤6% opacity ceiling, the 3-tier scale, pure-black-never-tinted
  shadows, Y-offset = ⅓ blur. [A2]
- **The 8pt grid + numeric tokens** — industry-standard, on-grid canvas math.
  [A2]
- **Screenshot autonomy (PRINCIPLE 1)** — independently re-derives the
  decontextualization-survival criterion from the spreadability literature; the
  corner glyph is a genuinely well-designed mitigation for the documented
  "flattening" failure mode. The correct inversion of The Pudding's
  scrollytelling dependency. [A4, A6]
- **Frozen-at-version (PRINCIPLE 8)** — independently validated by *three*
  peers: Notion's auto-migration is the named anti-pattern; X screenshot culture
  trusts screenshots *because* they can't be stealth-edited; archival practice
  treats the frozen artifact as the record. More defensible than the spec
  currently argues. [A6]
- **"Length is a prop, not a fork"** — matches Stripe Press house-grid
  discipline and recipe-card slot grammar. The anti-fork governance is excellent.
  [A2, A6]
- **Evidence-before-Mechanism ordering** — matches both Claim-Evidence-Reasoning
  and classical rhetoric (narratio → confirmatio). [A3]
- **Counter → Application → Close as the late-card move** — classical
  refutatio → peroratio, and the counterargument-placement literature, both
  back it. [A3]
- **Beats-as-scaffolding; rendered cards show beat NAME only** — confirmed in
  the actual HTML (commit b14f29f held); creates the best-case "layer-cake" scan
  pattern. [A4, A5]
- **The redundancy filter (PRINCIPLE 9)** = Mayer's coherence principle (23/23
  tests, median d=0.86) — one of the best-supported things in the system. [A4]
- **Section dividers behave** — Gestalt uses exactly 2, at true beat boundaries.
  Grayscale is absolute across both rendered cards (zero violations). The
  breakdown → card → render genealogy is legible when the pipeline is followed.
  [A5]
- **Versioning + CHANGELOG + ADRs** — already match Material / Carbon / Polaris
  semantic-versioning practice. The governance bones are industry-standard. [A6]

---

## 7. Open tensions — the deeper questions under the recommendations

Beyond the per-item adjudication, these are the standing tensions the owner
should hold in view:

1. **Extraneous-load reduction vs. intrinsic-load support.** [A4] Supercard
   aggressively cuts *extraneous* load — but the redundancy filter and authoring
   friction also strip the restatement and scaffolding that signaling research
   shows help *low-prior-knowledge readers most* — i.e. the stated audience. The
   system may be optimizing for the screenshot-*sharer* (wants density, zero
   redundancy) over the struggling *reader* (sometimes needs the redundancy).
   The Mini/Standard/XL axis is probably where this resolves — but the spec does
   not frame it that way.

2. **Screenshot autonomy vs. narrative connective tissue is a true zero-sum.**
   [A3] Every narrative framework derives power from connectives; Supercard
   forbids them inside blocks. The honest framing: Supercard's "spine" is a
   *labeled sequence*, not a *flowing narrative* — and the spec should say so
   plainly rather than implying a narrative it structurally cannot have.

3. **"7" as identity vs. the spine as identity.** [A3] PRINCIPLE 3 names "the
   7-beat narrative spine" as identity. R-C1 and R-C3 both pressure the count.
   Is "7" sacred, or is it the *spine* that is sacred and "7" a consequence?

4. **Is `reference` mode even the same artifact?** [A3] Diátaxis treats
   reference as a fundamentally different *form* from explanation. R-C4 retrofits
   it; the more honest move might be to admit `reference` wants its own template
   and is a different artifact sharing the visual language.

5. **The middle-beat recall trough is unaddressed at the content level.** [A4]
   Serial position says Mechanism/Comparison/Counter are least-remembered.
   Dividers help at the *scan* level, but the spec gives no guidance that the
   single most important mechanism claim should sit at a beat boundary (local
   primacy) rather than buried mid-beat.

6. **"No two adjacent blocks identical" is a heuristic, not a finding.** [A4]
   ADHD novelty-seeking lends it plausibility, but the empirical core is only
   "monotony → disengagement." If the spec is to be strict about evidence tiers,
   this rule should be *labeled* a design heuristic, not borrow the authority of
   cited cognition research.

7. **Single emphasis vs. the parallel-comparison exception.** [A4] `GRAMMAR`
   allows three identical stat-callouts as "small multiples." Under von Restorff
   that is fine *within the run* — but a screenshot of that run then has *no*
   single isolated focal point. Can the screenshot test (Q4: exactly one
   emphasized phrase visible) actually be satisfied for a parallel-comparison
   run? The two rules may collide at render time.

8. **Counter-trend elevation will recur every platform cycle.** [A2] Staying
   near-flat against iOS/visionOS depth is defensible — but it is a *standing*
   tension. The fix is not to change the system, it is to *document the
   divergence as deliberate* (R-C12) so it stops being re-litigated.

9. **Generation effect benefits the *author*, not the *reader*.** [A4]
   PRINCIPLE 7 ("authoring friction is a feature") is correct and the generation
   effect supports it — but only for the author. No spec text should imply the
   *reader's* memory benefits from the authoring process; the reader's payoff is
   segmentation + distinctiveness + retrieval-cue quality.

10. **Picture superiority ≠ dual coding.** [A4] If any spec text or breakdown
    justifies the decision tree's "shape-first" bias, justify it via
    *distinctiveness* (Higdon et al. 2025 — the effect survives even in
    aphantasia), **not** dual coding, which is now contested. Do not let "dual
    coding" enter the spec as settled science.

---

## 8. Recommendation index

Master list for the adjudication pass. Status values:
`pending-adjudication` → `accepted` / `rejected` / `deferred` / `needs-ADR`.

| ID | one-line | target file(s) | source | status |
|---|---|---|---|---|
| R-A1 | Fix PRINCIPLE 2 citations (Lorch→Klusewitz, move Sanchez&Wiley to §9, add von Restorff) | PRINCIPLES | A1,A4 | pending-adjudication |
| R-A2 | Add ADHD research grounding to the identity claim | PRINCIPLES | A4 | pending-adjudication |
| R-A3 | Render+publish+register+migrate the Musk card, or pull it | 30-CARDS, 60-RESEARCH, docs, registry | A5 | pending-adjudication |
| R-B1 | Resolve emphasis budget: per-block vs per-list-item | PRINCIPLES, GRAMMAR | A4,A5 | pending-adjudication |
| R-B2 | Define multi-block-beat labeling | GRAMMAR, RENDERING | A5,A3 | pending-adjudication |
| R-B3 | Reconcile "≤3 long sections" vs XL multi-block beats | GRAMMAR | A5,A3 | pending-adjudication |
| R-B4 | Build CI validator: render/gallery/registry/parity | PIPELINE + CI | A5,A2 | pending-adjudication |
| R-B5 | Add a body-measure (CPL) target | RENDERING | A1 | pending-adjudication |
| R-B6 | Map density tiers to spacing tokens | LENGTHS, RENDERING | A2 | pending-adjudication |
| R-B7 | Number "sparingly"; make loft budget checkable; consolidate elevation roles | GRAMMAR, RENDERING | A5,A2 | pending-adjudication |
| R-B8 | Define breakdown schema versioning (frozen vs living) | TEMPLATE-breakdown | A5 | pending-adjudication |
| R-C1 | Hook overload: formalize lede-as-scope vs add Frame beat | GRAMMAR | A3 | pending-adjudication |
| R-C2 | Mini collapse: keep a compressed Counter | GRAMMAR, LENGTHS | A3 | pending-adjudication |
| R-C3 | Sharpen Comparison vs Counter language (lateral vs adversarial) | GRAMMAR | A3,A5 | pending-adjudication |
| R-C4 | Define `reference` mode structure (or give it its own template) | PIPELINE | A3 | pending-adjudication |
| R-C5 | Record the climax-last vs answer-first decision | PRINCIPLES / ADR | A3 | pending-adjudication |
| R-C6 | Designate section-divider text as sanctioned connective tissue | GRAMMAR | A3,A4 | pending-adjudication |
| R-C7 | Raise body leading 17/24 → 17/25–26 (cost: length budgets) | RENDERING, GRAMMAR | A1,A2 | pending-adjudication |
| R-C8 | Restrict g-30 & lighter to marks-only; g-60 is lightest text | RENDERING | A1 | pending-adjudication |
| R-C9 | Loosen body tracking toward Apple optical default | RENDERING | A1 | pending-adjudication |
| R-C10 | Codify "bold is the only emphasis style" + "body always ragged-right" | RENDERING, GRAMMAR | A1 | pending-adjudication |
| R-C11 | Add RENDERING relationship subsections (vertical rhythm, self-framing recipe, concentricity, token scoping) | RENDERING | A2 | pending-adjudication |
| R-C12 | Note the deliberate elevation divergence from iOS/visionOS | RENDERING | A2 | pending-adjudication |
| R-C13 | Epistemic-status line on the render (reverses commit b14f29f) | RENDERING + frontmatter | A6 | pending-adjudication |
| R-C14 | Block-level addressing + generated backlink index | GRAMMAR + tooling | A6 | pending-adjudication |
| R-C15 | Inline word-scale sparkline primitive | block library, GRAMMAR | A6 | pending-adjudication |
| R-C16 | Name ancestors (Tufte handout, safety card); adopt "smallest effective difference" | PRINCIPLES | A6 | pending-adjudication |
| R-C17 | Finding-stating chart titles + within-block data-ink audit | GRAMMAR, RENDERING | A6 | pending-adjudication |
| R-C18 | Engineer the Hook as an open loop, not a summary | GRAMMAR, PRINCIPLES | A6 | pending-adjudication |
| R-C19 | USWDS status vocabulary + promotion checklist for the block library | governance, 20-BLOCKS | A6 | pending-adjudication |
| R-C20 | Designate Beat 7 as "the screenshot" | GRAMMAR | A6 | pending-adjudication |

---

## 9. Adjudication log

> The owner rules on each recommendation here, item by item. The spec is touched
> **only** for items marked `accepted` or `needs-ADR` (→ then the ADR is drafted
> first). This section is the bridge from research to V3.1.

*(empty — awaiting owner adjudication, 2026-05-14)*

---

# Appendices — the six agent reports (verbatim)

> Preserved in full so the synthesis above is inspectable and a later pass can
> extend it. Each agent did deep web research (A5 did an internal repo audit),
> grounded in the V3.0 spec, and returned findings with reliability ratings.

## Appendix A1 — Typography & emphasis-without-color

**Findings.**

*Type scale & reading mechanics.* Body at 17pt is well-supported (Apple system
default; mobile-readability research recommends 16px minimum, mobile benefits
from slightly larger). 17pt is correct — do not change. Line length is the real
risk and the spec does not govern it: optimal measure is 50–75 CPL desktop but
**mobile portrait should target 30–50 CPL** (Baymard, UXPin; Dyson & Haselgrove
found 55 CPL supports both normal and fast reading). Supercard's content width
361 − 48 pad = ~313pt yields ~35–38 CPL — inside the band, but *by accident*:
`RENDERING-spec` defines width and padding but never a target measure. Leading:
Body 17/24 = 1.41× sits at the *bottom* of the comfortable 1.4–1.5 range
(WCAG-adjacent guidance leans 1.5); defensible but not generous for an
ADHD-target format where line-skipping is a known failure. Section header 24/30
= 1.25 and Display 40/44 = 1.10 are correctly tight — the modular logic (leading
ratio shrinks as size grows) is sound. The scale ratios are slightly irregular
(11→13 ×1.18, 13→17 ×1.31, 17→19 ×1.12, 19→24 ×1.26, 24→40 ×1.67, 40→56 ×1.40)
— mostly defensible as *role* sizes, but Body 17 → Subtitle 19 is only ×1.12, a
2pt difference that at the same gray value leans entirely on the 400→500 weight
change, making it the weakest hierarchy boundary in the system. SF Pro Rounded
has size-specific optical outlines (Text ≤19pt, Display ≥20pt) — the switch
falls *inside* this scale between Subtitle and Section header; `ui-rounded`
handles it automatically. Supercard's tracking is **consistently looser than
Apple's at display sizes and tighter at body** — Body 17pt at −0.008em ≈ −0.14px
vs Apple's −0.43px (one third as tight); Section header 24pt at −0.29px vs
Apple's ~−0.75px. Eyebrow at +0.07em is far above Apple's +0.15px but uppercase
genuinely wants heavy tracking — defensible. (Reliability: peer-reviewed lit
review + practitioner consensus, convergent; Apple HIG authoritative for the
typeface.)

*ADHD- and dyslexia-aware typography.* The "dyslexia font" is a debunked myth —
do not adopt one. Rello & Baeza-Yates (2013, eye-tracking): OpenDyslexic did not
improve reading time or fixations; participants *preferred* Verdana/Helvetica.
Kuster et al. (2018, *Annals of Dyslexia*): Dyslexie font gave no benefit to
children with or without dyslexia. Convergent across multiple studies:
specialized fonts do not help, readers often prefer standard ones. **Supercard's
SF Pro Rounded — a clean, high-x-height, open-aperture mainstream sans — is
exactly what this literature endorses.** What the evidence *does* support is
layout mechanics, not a font: perceptual crowding is real and measurable, and
hits working-memory-constrained readers harder — the lever is spacing
(tracking + leading), not typeface; generous, consistent, predictable spacing
reduces cognitive load; short sentences and ragged-right setting help —
justified text creates word-spacing "rivers" that disrupt tracking, so Supercard
should never justify body text. Honest caveat: there is no confirmed "ADHD
font," and much ADHD-specific typography advice is practitioner extrapolation
from dyslexia/low-vision research, not ADHD-specific RCTs — the strongest claims
are about crowding and executive load; the weakest are about specific typefaces.
(Reliability: crowding peer-reviewed; ADHD-font-specific claims
anecdote/practitioner — flagged.)

*Emphasis without color.* Lorch 1995 verified, and the precise finding is
sharper than the principle states — **Lorch, Lorch & Klusewitz**,
*Contemporary Educational Psychology* 20:51–64: cued recall was better in the
*light* signaling condition than in *both* the control and the *heavy*
signaling condition — control and heavy "did not differ." Over-signaling does
not merely dilute, it collapses the effect entirely back to baseline. The
mechanism is attentional — emphasized targets were read *slower* and recalled
*better* (Exp. 2): emphasis buys dwell time. Extending the base: a 2023
*Memory & Cognition* ERP study found emphasized words elicited reduced N1 /
increased P2 — emphasis recruits controlled attention (neural confirmation of
Lorch's behavioral mechanism); Mayer's signaling/cueing principle generalizes
it (minimal cueing aids learning, excessive does not). Three independent
literatures converge on the rule Supercard already enforces. Weight-based
hierarchy: practitioner consensus says weight is a legitimate primary axis but
contrast must be decisive — "skip a weight" — and Subtitle 500 vs Body 400 is a
single step, combined with the near-invisible 17→19 size gap, making Body/
Subtitle the weakest boundary in the system. **The gray ramp has a legibility
problem at the light end** — computed contrast on white: `--k`/#000 = 21:1,
`--ink` #111 ≈ 18.9:1, `g-60` ≈ 5.7:1 (passes AA normal), `--ink-4` #888 ≈
3.5:1 (fails AA normal text), `g-30` ≈ 1.9:1 (**fails everything**), `--ink-5`
#BBB ≈ 1.8:1 (fails everything). The spec assigns `g-30` to "tertiary text" — at
1.9:1 it is not legible text by any standard. `g-30` and lighter are safe for
*marks* (gridlines, hairlines, chart context series) but should not carry words.
(Reliability: WCAG is a formal standard; contrast math deterministic — high
confidence.)

*Editorial type-system precedent.* NYT builds richness from a strict
role-to-typeface split — Cheltenham (serif, many weights) for headlines carrying
voice through weight alone; Franklin (sans) for *everything functional* (bylines,
timestamps, captions, labels). Lesson Supercard half-applies: one family can
carry editorial voice if weight range is exploited and functional text is
rigorously separated — Supercard's Eyebrow (uppercase, tracked, semibold) is its
"Franklin," used correctly but could be used more consistently. Stripe Press:
restraint as a house signature (fixed logo position, hardcover-only) — Supercard's
corner glyph + fixed canvas is the same move. Bloomberg Businessweek / Pentagram:
richness without color comes from *scale jumps and white space as structure* —
Supercard's Hero 56 vs Caption 13 = 4.3× is genuinely dramatic and correctly so.
Academic typesetting: ragged-right, *one* emphasis style (italic or bold, never
both, never underline) — Supercard should adopt "one emphasis *style*, not just
one emphasis *instance*": bold is the system's emphasis; italic/underline
reserved or banned.

**Recommendations.** (1) `RENDERING-spec` §Canvas — add a 35–45 CPL target
measure. (2) `RENDERING-spec` §Type scale — raise Body leading from 17/24 to
17/25 or 17/26 (single highest-value type change; tension: length budgets).
(3) `RENDERING-spec` §Type scale — loosen Body tracking from −0.008em toward
−0.004em–0 (don't jump all the way to Apple's value — Supercard sets a
slightly-airy register by choice). (4) `RENDERING-spec` §Type scale — strengthen
the Body/Subtitle boundary: Subtitle → 20pt (also crosses the optical-size
boundary cleanly) or → 600 weight; pick one decisive axis. (5) `RENDERING-spec`
§Gray ramp — restrict `g-30`/`--ink-4`/`--ink-5` to non-text use; relabel `g-30`
from "Tertiary text" to "Deemphasized marks, chart context series"; `g-60` (#666)
is the lightest text value. (6) `RENDERING-spec` §Type scale — add a tracking
note tied to optical size (Text/Display boundary at 20pt; values are
deliberately looser than Apple — renderers must not "correct" them). (7)
`PRINCIPLES` #2 — extend the citation and sharpen: heavy signaling performs *no
better than no signaling*; add the 2023 ERP study and Mayer's signaling
principle; add the mechanism line (emphasis buys attentional dwell time). (8)
`GRAMMAR`/`RENDERING` — codify "bold is the only emphasis style"; add an
anti-pattern for italic/underline as emphasis. (9) `RENDERING-spec` — state
"body text is always left-aligned, ragged-right, never justified."

**What's already right.** SF Pro Rounded (the dyslexia-font literature
vindicates the choice); single emphasis as a principle (best-supported rule —
only citations need extending); strict grayscale (the constraint forces richness
the way monochrome editorial systems do); Body 17pt and #111-not-pure-black;
leading ratios shrinking as size grows; the Hero 56 / Caption 13 = 4.3× dramatic
range; Eyebrow tracking; the 8-role count (resisting more is correct).

**Open tensions.** (1) Leading vs vertical density — raising to 17/26 serves the
ADHD target but lengthens every block; 17/25 is a softer compromise; or stay at
24 and accept the bottom of the band. (2) How "Apple-correct" should tracking
be — Supercard's looser tracking *is* a house choice; is "slightly airier than
iOS" a deliberate signature? (3) Body/Subtitle — fix by size (→20pt, compresses
gap to Section header) or by weight (→600, spends a weight step)? (4) Does
restricting `g-30` from text break existing cards — ship as a V3.1 ramp revision
or a V3.0.x clarification? (5) Caption at 13pt is below the 16px mobile-body
floor — fine for true captions, a latent problem if used for multi-line reading
text; worth a "Caption is for ≤2 lines" constraint.

*Sources:* Lorch, Lorch & Klusewitz (1995), *Contemporary Educational
Psychology* 20:51–64 — peer-reviewed. "A further specification of the effects of
font emphasis on reading comprehension" (2023), *Memory & Cognition* —
peer-reviewed ERP. Mayer, "The Signaling/Cueing Principle," *Cambridge Handbook
of Multimedia Learning* ch. 17. Rello & Baeza-Yates (2013), "Good fonts for
dyslexia"; Kuster et al. (2018), *Annals of Dyslexia* — both peer-reviewed,
debunk specialized fonts. Dyson & Haselgrove; "Optimal Line Length in Reading —
A Literature Review," *Visible Language* (2005). Baymard Institute, UXPin —
practitioner, mobile CPL. Apple HIG / WWDC20 "Details of UI Typography" —
authoritative. WCAG 2.1/2.2 SC 1.4.3 & 1.4.8; WebAIM; UX Movement 46%-brightness
rule. Creative Pro "Seven Principles of Typographic Contrast," Fontfabric,
Toptal — practitioner. AudioEye, iubenda, neurodivergent.blog — practitioner
(ADHD-font claims low-reliability). Commercial Type / Fonts in Use — NYT typeface
documentation.

## Appendix A2 — Layout, space & elevation

**Grid & spacing.** The 8pt baseline is industry-standard and correct; numeric
token naming (`--s-0…--s-8`) is the right call once a scale exceeds ~5 steps.
The scale (4/8/12/16/24/32/48/64/96) has a subtle inconsistency: the low end
(4→8→12→16) is linear +4, the high end is roughly geometric ×1.5 — a defensible
hybrid, but `--s-0` (4) is half-grid and the spec doesn't say "4pt is
horizontal/sub-element only, never a vertical block gap," so 4pt vertical gaps
will creep in and break the 8pt vertical rhythm; and the 64→96 jump is large and
`--s-8` (96) has a single use ("Hero/footer") — a single-use token at the top of
a scale is a smell. Vertical rhythm is under-specified relative to the type
scale: all leadings are multiples of 2 and 24 is on-grid (good), but the spec
never ties block spacing to leading — best practice is that vertical spacing
between text elements is a function of line-height. **Whitespace-as-grouping is
the system's most under-leveraged asset:** Gestalt proximity says elements are
grouped by *relative* spacing; the large tokens `--s-6`/`--s-7` *are* doing
proximity work (the whitespace that says "new idea"), but `RENDERING-spec`
presents the tokens as a flat lookup table of sizes, not as a grouping language.

*Recommendations:* annotate `--s-0` as "horizontal & sub-element only"; add a
vertical-rhythm note tying inter-element gaps to the 24pt body line; reframe
`--s-6`/`--s-7`/`--s-8` as the grouping layer ("the large tokens are not big
paddings — they are the whitespace that does Gestalt grouping"); justify or
demote `--s-8` (96); consider whether 9 steps are needed at all (mature systems
run on 6–8). *Already right:* 8pt baseline, numeric names, on-grid canvas math,
leadings on multiples of 2 with body line on-grid.

**The loft / elevation budget.** The 1–3 elevated-elements cap is well-supported
and arguably the system's sharpest single rule — Material 3 and Atlassian both
warn elevation must be used sparingly; Supercard caps *instances per artifact*,
stricter than the typical 4–6 *levels* guidance, correctly so for a single
screenshot-shareable surface. The 3-tier shadow set (flat/subtle/lofted) is
correctly sized; the opacity discipline (≤6% per stop, pure black, Y-offset ⅓
blur) is technically sound — tinted shadows leak hue and would break strict
grayscale. The industry is moving *toward* depth (iOS 26 Liquid Glass, visionOS)
— Supercard's near-flat aesthetic is now counter-trend; that's fine (editorial
timelessness is explicitly a bet against web-app fashion) but the spec should
*say* it's a deliberate divergence so a future steward doesn't "fix" it. One real
gap: the spec defines *what* the tiers are but is thin on *what each tier may
attach to*, and elevation rules are split across `RENDERING-spec` and `GRAMMAR`.

*Recommendations:* add a one-line "deliberate divergence" note to §Shadow
system; tighten the role mapping into one place (of the 1–3: slot 1 = hero
mandatory `lofted`, slot 2 = the single most important anchor, slot 3 = at most
one mid-card breath; `subtle` never appears without a `lofted` element present);
state the Mini exception inline (Mini = 1–2 total). *Already right:* the 1–3
cap, ≤6% opacity, pure-black-never-tinted, 3 tiers, Y-offset = ⅓ blur, "default
every block to flat" — the strongest part of the layout system; defend it.

**The self-sufficient region as a layout constraint.** "Screenshot autonomy" is
the layout expression of the atomic content unit (REI Cedar, Brad Frost's
atomic design) — Supercard's PRINCIPLE 1 is a *stricter* version (comprehensible
when cropped with no neighbors). The hard part the spec under-addresses:
self-framing *without a container*. PRINCIPLE 4 forbids putting every block in a
card shell, which creates a real problem — a flat borderless block still has to
read as one complete idea when screenshotted. The literature points to the
answer (proximity + a clear separation gap + alignment to an invisible grid) and
Supercard *has* the tools (spacing scale, corner glyph, beat label) but
`RENDERING-spec` never assembles them into a stated recipe. The corner glyph and
beat label are doing container-replacement work and the spec doesn't say so.

*Recommendations:* add a short "self-framing recipe" subsection — (1) internal
proximity via `--s-0`/`--s-1`/`--s-2`, (2) a ≥`--s-5` separation gap top/bottom
so the crop boundary lands in whitespace not mid-idea, (3) the glyph + beat
label are the frame, (4) elevation is the exception signal not the framing
default; add a spacing-contrast rule to `GRAMMAR` §adjacency; state a minimum
self-sufficient height (no single self-sufficient idea should exceed ~one screen
height, ~750pt usable — above that it isn't screenshot-autonomous by
definition).

**Density across Mini / Standard / XL.** Supercard correctly treats density as a
*prop, not a fork* — the right architecture, and the no-XL-only-blocks rule
prevents the V2 drift. **But "density" is asserted, not operationalized:**
`LENGTHS` says Mini = "High," Standard = "Comfortable," XL = "Spacious" but
*nowhere maps those words to spacing tokens*. The three tiers currently differ
in block *count* and beat coverage (well-specified) but not in any documented
spacing behavior — which is the actual definition of density. Risk: without a
spacing-per-tier rule, the tiers *will* drift into three systems.

*Recommendation:* add a "density resolves to spacing tokens" table to `LENGTHS`
(structural draft supplied: each tier shifts ~one token step for each gap role —
intra-block, inter-block same-beat, beat boundary, card pad — so it's provably
"the same scale, indexed differently"); cross-reference from `RENDERING-spec`.
*Already right:* "length is a prop not a fork," the no-XL-only-blocks rule,
Standard-is-canonical, the beat-coverage table, the hero-scaling table — the
*governance* of density is excellent, only the *spacing mechanics* are missing.

**Card radius / concentricity.** The 16pt radius is reasonable and the
"concentric with iOS 26" intent is correct — but the spec does not actually
implement concentricity. iOS 26's `ConcentricRectangle` makes inner radius ≈
outer radius − padding. Supercard's numbers don't satisfy the formula: card
radius 16pt, internal pad 24pt → `16 − 24 = −8` → clamps to **0**. So today
anything nested inside a Supercard card must have square corners to be
concentrically correct — and the spec never says this. The deeper point:
Supercard mostly *doesn't nest* cards (PRINCIPLE 4), so concentricity is a
smaller problem than invoking it implies — "concentric with iOS 26" is currently
more an aesthetic-alignment claim than a structural rule.

*Recommendations:* clarify what "concentric" means — Option A (aesthetic,
minimal: "16pt matches the platform radius for visual kinship; Supercard rarely
nests rounded surfaces, so concentric math is rarely engaged") or Option B
(structural: adopt the formula and document the nesting rule). Regardless, add
the one concrete sentence: "Elements nested inside a card surface use square
corners (radius 0) — the 24pt pad exceeds the 16pt radius." No change to the
16pt value itself (platform-aligned, on-grid).

**Cross-cutting note (A2's own synthesis):** four of the five sections share the
same root gap — `RENDERING-spec` documents tokens as a lookup table of values,
not as a grammar of relationships. The single highest-leverage move is to add
2–3 short "how these tokens relate" subsections to `RENDERING-spec` and one
density table to `LENGTHS`. No token *values* need to change.

**Open tensions.** (1) 9 spacing tokens vs ~7 — trimming is cleaner but a
breaking change; lean: annotate/scope now (cheap, non-breaking), revisit count
at v3.1. (2) Concentricity: aesthetic claim vs enforced rule — the sparing-cards
identity argues for the aesthetic framing, but then stop using "concentric" as
if it's structural. (3) Counter-trend elevation — keep it, but *document the
divergence as deliberate* so it stops being re-litigated. (4) Density-table
specificity adds a constraint authors must follow — worth the rigidity given the
three-systems fear; the owner picks the exact token values.

*Sources:* Built to Adapt — "8-Point Grid: Vertical Rhythm"; Designsystems.com —
"Space, grids & layouts"; freeCodeCamp — "8-Point Grid: Typography on the Web";
Chien-Chun Wu — "Design token scales"; Mark Dalgleish — T-shirt sizing gist;
Designsystems.surf — "Depth with Purpose"; Material Design 3 — Elevation tokens;
Auzenne — "The End of Flat Design"; Apple HIG — Materials; nilcoalescing &
DevTechie — `ConcentricRectangle` in SwiftUI / iOS 26; NN/g — Proximity
Principle; IxDF — Law of Proximity; REI Cedar — Atomic Content; Brad Frost —
Atomic Design ch.2; Gapsy — Proximity Design Principle.

## Appendix A3 — Narrative structure & the 7-beat spine

**Established spines, mapped against the 7 beats.** *And-But-Therefore* (Olson):
*And* ≈ Hook+Evidence, *But* ≈ Comparison+Counter, *Therefore* ≈
Application+Close — Mechanism has no ABT slot, because ABT is an *argument*
spine, not an *explanatory* one (the key tension: Supercard is doing
explanation, not just persuasion). *Kenn Adams' Story Spine / Pixar*: a *fiction*
spine built on a single pivot + escalation; maps poorly — there is no "inciting
incident" in a knowledge artifact; the one transferable idea is "a clear line of
*change*," and Supercard's beats are more a *catalogue* than a *change-line*.
*Minto Pyramid / SCQA*: S ≈ Hook, C ≈ Evidence/Counter, Q ≈ implicit, A ≈
Application/Close — **the critical divergence: Minto puts the *answer at the
top*; Supercard puts the Close at beat 7.** *Inverted Pyramid / BLUF*: directly
relevant — "reader can leave at any point and still understand" is structurally
identical to screenshot autonomy; BLUF would front-load the Close. *Aristotle's
rhetoric*: exordium → narratio → confirmatio → refutatio → peroratio maps
*cleanly* onto Supercard and independently validates hook-first, proof-before-
refutation, close-last. *AIDA*: a conversion spine, weakest fit.
**Synthesis:** the 7 beats line up most closely with **classical rhetoric** and
reasonably with **ABT**; the sharpest dissenter is **Minto/BLUF** (lead with the
answer) — that disagreement is the central question for the verdict.

**Expository sequencing — comprehension research.** *Claim-Evidence-Reasoning
(+Rebuttal)* (McNeill & Krajcik): the dominant framework in science education —
Claim ≈ Hook, Evidence ≈ Evidence, Reasoning ≈ Mechanism, Rebuttal ≈ Counter;
strongly validates beats 1,2,3,5 and their order, and puts **Evidence before
Reasoning/Mechanism — matching Supercard.** *Refutation text research* (Tippett
2010 review; Sinatra & Broughton; Kendeou et al.) — the most
decision-relevant body found: a refutation text states the misconception →
refutes it → offers the better account, and produces conceptual change where
plain expository text does not; the "coactivation principle" — conceptual change
happens only when the misconception is activated *at the same time* as the
correct explanation; refutations cause "hypercorrection" — high-confidence
misconceptions are corrected *more* strongly. **Implication:** the Counter beat
is load-bearing for *comprehension itself*, not garnish — but its placement is
questioned: coactivation says the misconception should sit *next to* the
Mechanism, not stranded at beat 5. *One-sided vs two-sided messages* (Allen
meta-analyses): refutational two-sided messages are significantly more
persuasive and credible — backs keeping Counter; but the *law of primacy* (the
argument presented first has the largest effect) cuts against burying the thesis
at beat 7.

**Critique of the current 7 beats.** Evidence before Mechanism: correct, keep.
Counter at beat 5 after Comparison: questionable — coactivation says the steelman
works best adjacent to the mechanism it corrects. Counter → Application as the
late-card move: right, keep (classical refutatio → peroratio). Comparison (4)
and Counter (5) overlap — both are contrastive; consider whether they are two
beats or one "Contrast" beat with two facets (defensible to keep them separate —
Comparison is *lateral*, Counter is *adversarial* — but the spec doesn't draw
the line, so authors blur it). **Missing: an explicit Scope/Definition beat** —
the biggest gap; comprehension research (prime the schema first) and SCQA (the
"Situation" move) both say the reader needs "what are we talking about, what's
in/out of scope" *early*; the Gestalt card smuggles it into the Hook lede and a
Mechanism definition. Hook is doing too much — it is simultaneously the
BLUF/thesis, the visual anchor, and (via the lede) the scope-setter. Mini
collapse (drop Comparison + Counter): **partially wrong** — dropping Comparison
from a glanceable card is defensible, but dropping Counter contradicts the
refutation-text and two-sided-message research; a Mini with no Counter is a
one-sided message.

**Transitions between beats.** Strong narrative spines need connective tissue,
not just boundary markers (ABT's power *is* the connectives "but" and
"therefore"). Supercard has the opposite — beats are labeled but transitions are
silent — and screenshot autonomy actively *forbids* connective openers. This is
a genuine identity-level tension: Supercard's "spine" is structurally a
*labeled sequence*, not a *flowing narrative*. The section-divider text is
currently the only place connective tissue is allowed — that role should be made
explicit and deliberate.

**Beats vs modes.** `reference` mode does not fit a linear spine — the
`PIPELINE` already gives it a different block bias and permits parallel
structural repetition *against* the redundancy filter, the spec quietly
admitting the misfit. Diátaxis: reference material is a *map*, structured by the
subject's own shape, not a story. `summary`/`briefing`/`deep-dive` are all
narrative intents and fit the spine fine; `reference` is a different shape.

**Verdict.** Keep the spine; keep the order of beats 1-2-3 and 5-6-7; make three
changes: (1) formalize scope-setting into Hook's contract via the lede (preserves
the identity "7") rather than adding an 8th beat; (2) keep both Comparison and
Counter but tighten the *spec language* (lateral vs adversarial) — the order is
fine, the language is the defect; (3) fix the Mini collapse — drop Comparison
only, keep a one-line compressed Counter. The spine is right in its bones (it
independently re-derives classical rhetoric + CER+Rebuttal); the fixes are at
the edges.

**Open tensions.** (1) Is "7" identity, or is the *spine* identity and "7" a
consequence? (2) Screenshot autonomy vs connective tissue is a true zero-sum —
the spec should say plainly that the spine is a labeled sequence. (3) `reference`
mode may want its own structural template. (4) Comparison/Counter: sharpen (keep
7) vs merge (cleaner 6, pays the identity cost). (5) Climax-last vs answer-first
— worth a deliberate recorded decision.

*Sources:* Olson, ABT / "Narrative Is Everything"; Kenn Adams' Story Spine /
SessionLab; Minto Pyramid & SCQA / ModelThinkers, Analytic Storytelling; BLUF &
Inverted Pyramid (Wikipedia); CER framework / McNeill & Krajcik (ERIC); "Refutation
Text in Science Education: Two Decades of Research" / Tippett (Springer);
refutation texts & knowledge revision (ScienceDirect); hypercorrection of
high-confidence misconceptions (ScienceDirect); one-sided vs two-sided messages
meta-analysis (Allen 1991, 1999); argument order / law of primacy (PMC);
counterargument placement (UNR Writing Center); Diátaxis framework;
instructional sequencing / assimilation-to-schema (Springer).

## Appendix A4 — Cognition: attention, load, comprehension, memory

**Cognitive load theory.** Sweller's CLT is well-established; working memory
holds ~4 chunks of *novel* information (Cowan 2001 — Miller's 7±2 was inflated by
rehearsal artifacts). CLT splits load into intrinsic / extraneous / germane. The
block model is functionally a chunking and segmentation device — it externalizes
the working-memory partition an ADHD reader struggles to perform internally;
"one complete idea per region" is a direct operationalization of "one chunk per
region" — a genuine CLT mapping, not decoration. **The caveat:** Supercard mostly
attacks *extraneous* load (grayscale removes hue-management cost, single emphasis
removes competing focal points, flat-by-default removes chrome) but does little
for *intrinsic* load — and the redundancy filter and authoring friction arguably
*increase* intrinsic load by stripping restatement and scaffolding that help
low-prior-knowledge readers, who are exactly the audience a "prosthesis" claims
to serve.

**ADHD-specific reading research — the prosthesis claim is *better* supported
than the spec shows.** The spec asserts "cognitive prosthesis for ADHD readers"
but cites no ADHD research. The literature backs it: the **centrality deficit**
(Miller, Keenan et al. 2013, *Journal of Abnormal Child Psychology*) — children
with ADHD show a disproportionate deficit in recalling the *central* ideas of a
text even though they know which are central; working memory completely mediated
the effect → ADHD readers cannot reliably self-identify "the one thing that
matters," and single emphasis does that work for them; **scrolling specifically
penalizes low-WM readers** (Sanchez & Wiley 2009, *Human Factors*, "To Scroll or
Not to Scroll") — a scrolling format reduced comprehension of complex texts
especially for low-WM readers, directly supporting screenshot autonomy;
**working memory is the bottleneck** across the ADHD-reading literature;
**event-segmentation deficit** (PubMed 30205738) — ADHD readers are worse at
spontaneously segmenting continuous input, and Supercard pre-segments for them.
Novelty/interest-based attention is mixed reliability — the neurochemical core
is peer-reviewed (Hauser et al. 2018, *Brain*) but most circulating material is
practitioner/pop; the adjacency rule gets *plausibility* from ADHD
novelty-seeking but the empirical core is only monotony → disengagement, not a
specific "vary every block" prescription. **Verdict: the prosthesis claim is
well-founded and currently under-cited.**

**Signaling & emphasis — supported as a principle, but the current citations are
wrong.** The signaling effect is real and well-replicated (two meta-analyses:
Richter et al. 2016, 103 studies N=12,201, largest for low-prior-knowledge
learners; Alpizar et al. 2020, d≈0.38); Mayer's coherence + redundancy
principles have solid backing for "strip everything else back" and the
redundancy filter. **But:** Lorch 1995 (the *Educational Psychology Review*
review of signaling devices) does not establish "exactly one emphasis per region
is optimal" or "effects collapse when more than one competes" — that specific
claim is not in it; Sanchez & Wiley 2006 is about the *seductive-details effect*
(a great citation for "cut decorative blocks" — the redundancy filter — **not**
emphasis-count-per-region). **What actually supports "exactly one emphasis per
block": the von Restorff (isolation) effect** (von Restorff 1933; Hunt 1995,
*Psychonomic Bulletin & Review*) — an item is remembered better *because it is
isolated against a homogeneous background*; isolation is relational, so if three
things are bold, none is isolated and the advantage collapses for all three.
"Exactly one emphasis per block" is a sound heuristic with real grounding — but
the grounding is *von Restorff distinctiveness + Mayer coherence*, not the two
papers cited. The fix is a citation swap, not a principle change.

**Scanning & visual attention.** Layer-cake scanning (NN/g) — readers scan
headings and skip body until one catches them; Supercard's beat labels + one
emphasis per block force a clean layer-cake (the best-case scan pattern).
F-pattern is the *failure* mode (appears in the absence of subheadings/bullets) —
Supercard's structure is a deliberate defense against it. **Serial position**
(Glanzer & Cunitz 1966) — first and last items are recalled best, the middle is
the trough; Hook (1) gets primacy, Close (7) gets recency — the system already
puts its load-bearing claims there; but the middle beats (3,4,5) sit in the
recall trough — "never run more than 3 long sections in a row" is a partial
mitigation, and section dividers act as memory "reset" points re-triggering
local primacy. Good design the spec doesn't explain.

**Comprehension & memory.** Dual coding (Paivio) — the picture-superiority
effect is real and robust, but the *dual-coding explanation* is now disputed
(Higdon et al. 2025 — distinctiveness, not dual coding; the effect persists even
in aphantasia) → justify the decision tree's "shape-first" bias as
*distinctiveness*, not dual coding. Generation effect (robust) — self-generated
information is better remembered than read information, which benefits *the
author* (PRINCIPLE 7 is correct) but does **not** transfer to the *reader*; the
system should not claim reader-side memory benefits from the authoring process.
Spaced repetition — already covered in `60-RESEARCH/BREAKDOWN-spaced-repetition`;
one connection: a screenshot-autonomous block is also a well-formed retrieval cue.

**Screenshot-shareability as a memory property — the core bet has real science
under it.** Decontextualization is a known mechanism of spread (semiotics of
spreadability; Lee 2024, *Literature Compass*) — text that survives
decontextualization is what gets re-shared, and Supercard's screenshot test is
precisely a decontextualization-survival test. The risk is also documented
(decontextualized quotes "flatten understanding") — and Supercard's corner glyph
(traceability) is the system's answer to exactly that known failure mode.
Convergence: a region that is self-sufficient, single-focus, and distinctive is
simultaneously the most comprehensible (CLT), most memorable (von Restorff,
serial position), most re-findable (retrieval cue), and most spreadable
(decontextualization-survival). The core bet is coherent.

**Verdict on the cognitive-prosthesis claim:** well-founded and currently
under-argued. The strongest evidence (centrality deficit, the scrolling study,
working-memory mediation) is *more* favorable to Supercard than what the spec
cites. Where it's solid: PRINCIPLES 1, 2, 9 and the block model. Where it's
"decoration as written": the specific citations in PRINCIPLE 2. Unforced gap: no
ADHD research cited anywhere.

**Recommendations.** (1) PRINCIPLES #2 — swap the citations to von Restorff /
Hunt 1995, state the actual mechanism, keep Mayer's coherence as secondary. (2)
PRINCIPLES #1 — add Sanchez & Wiley (2009) as the empirical core of "a card that
requires its full scroll breaks." (3) PRINCIPLES — add ADHD grounding explicitly
(centrality deficit, event-segmentation deficit) or stop claiming it — the
highest-value change. (4) GRAMMAR screenshot test — name the
decontextualization-survival framing explicitly. (5) GRAMMAR — make the
serial-position rationale explicit (dividers re-trigger local primacy, rescuing
middle-beat content). (6) Decision tree — re-ground "shape-first" on
distinctiveness, not dual coding. (7) PRINCIPLES #7 — narrow the memory claim to
the *author*.

**Open tensions.** (1) Extraneous-load reduction vs intrinsic-load support — the
system may optimize for the sharer over the struggling reader; Mini/Standard/XL
is probably where this resolves but the spec doesn't frame it that way. (2) "No
two adjacent blocks identical" is a heuristic, not a finding — label it as such.
(3) Single emphasis vs the parallel-comparison exception — a screenshot of three
identical stat-callouts has no single isolated focal point; the two rules may
collide at render time. (4) The middle-beat recall trough is unaddressed at the
content level — no guidance that the most important mechanism claim should sit
at a beat boundary.

*Source reliability:* High (peer-reviewed primary/meta) — Cowan 2001; Sweller
2011; Miller/Keenan et al. 2013; Sanchez & Wiley 2006 & 2009; von Restorff 1933
/ Hunt 1995; Glanzer & Cunitz 1966; Mayer (Cambridge Handbook ch. 12); signaling
meta-analyses (Richter et al. 2016, Alpizar et al. 2020); Higdon et al. 2025;
event-segmentation deficit (PubMed 30205738). Strong practitioner — NN/g
(F-pattern, layer-cake). Mixed/caution — ADHD "interest-based nervous system" /
dopamine-novelty framing (neurochemical core peer-reviewed: Hauser et al. 2018,
*Brain*; most circulating material is coaching/pop-psych). **Citation errors
found in the current spec: PRINCIPLES #2 cites Lorch 1995 and Sanchez & Wiley
2006 for a claim neither paper makes.**

## Appendix A5 — Drift audit of the 3 existing cards

**Card 1 — Spaced Repetition (Standard, briefing) — B+, the cleanest.** Passes:
7 beats in order, one block per beat, no dividers (correct for Standard); loft
budget honored (hero is the only lofted element, confirmed in the render); single
emphasis is real (every render section has exactly one `<strong>` focal phrase);
markdown↔render parity tight (the render even improves the markdown — Beat 4
table trimmed 4 cols → 3); redundancy filter visibly applied. Borderline: Beat 4
arguably has 2 emphases (two bolded cells + a bolded phrase in the trailing
paragraph); hero hook is 38 words including title — at the ≤40 ceiling, no
margin. Fails: **screenshot test Q3 — Beat 2 opens "Without review, the
forgetting curve is steep" — "the forgetting curve" is presented as given, but
the breakdown's own audience posture says don't assume the reader knows that
term**; the card is `status: draft` / `lifecycle: sample` but is the published
reference example, with no draft indication in the render.

**Card 2 — Gestalt Principles (XL, deep-dive) — C+, technically the most
compliant, and the one that feels most wrong.** Passes: block-count math checks
out (21, under the 25 cap); section dividers used correctly (exactly 2, at beat
boundaries); beat NAME-only labels confirmed in the render (commit b14f29f
held); the Koffka quote reprise is defensible (both verbatim, pre-justified in
authoring notes). Fails: **Beat 2 is three blocks all labeled `## Beat 2 —
Evidence` — the render shows `EVIDENCE / EVIDENCE / EVIDENCE`**, the single
ugliest authoring artifact in the repo; **the Mechanism beat is SIX blocks** —
`GRAMMAR` says "never run more than 3 long sections in a row," and the authoring
notes acknowledge six while calling it justified (the exact rationalization
PRINCIPLE 7 warns about); **the card claims 2 lofted elements but the render
ships 1** — the Beat 7 `key-takeaway` is a plain flat `<p>` in the render, a
markdown↔render parity fail that means the card's own authoring notes
misdescribe the artifact; **screenshot test Q4 — the Beat 5 anti-pattern has
five `<strong>` spans** (four bullet lead-ins + a verdict) — a wall, the exact
failure PRINCIPLE 2 names; the `table` block is used 3× (decision tree says
"sparingly").

**Card 3 — Musk v. Altman (Mini, summary) — F, not a Supercard yet.** The
disqualifying fail: **no render exists**; **not in the gallery**; **the
frontmatter has no `render:` field at all**; ADR-0007 says rendering is not
optional — this card was authored as markdown and abandoned at Stage 4, the
exact pre-ADR-0007 failure the Stewards' Log says was just fixed. Salvageable
(correct Mini beat selection 1,2,3,6,7; 5 blocks in range; single emphasis mostly
clean) — but: **the breakdown lives in `40-LAB/`** not `60-RESEARCH/` (the
Stewards' Log of the same day says that was the bug being fixed); **not in
`INDEX-research-reports.md`**; the breakdown frontmatter is a pre-rewrite schema
missing `slug`/`status`/`modes_derived`/`derived_cards`/`confidence`/`updated`;
**screenshot test Q3 fails — Beat 3 has 2 bolded phrases** (`Charitable trust`,
`only as advice`) and tries to carry three ideas (definition + claims-at-issue +
advisory-jury point).

**Cross-cutting drift patterns (systemic — 2+ cards).** (1) **Multi-emphasis
bleed in list-bearing blocks (all 3 cards)** — every `anti-pattern`/`checklist`
bolds every bullet lead-in; PRINCIPLE 2 says "exactly one emphasized phrase per
block" but the cards (and the render CSS) treat "one per bullet" as compliant —
the spec never resolved per-block vs per-list-item. (2) **"Beat N — Name" used
as a literal repeated heading for multi-block beats** — three `## Beat 2`, six
`## Beat 3`; the spec is silent on how sub-blocks within a beat are titled. (3)
**Markdown↔render parity is not enforced** (Gestalt loft, Musk's absence). (4)
**Loft budget is described in authoring notes, not encoded** — self-reported
compliance, and Gestalt's narration is already wrong. (5) **The `` `BLOCK-*` ·
descriptor `` line is inconsistent free-text** across all 3 cards — sometimes a
block-type gloss, sometimes a section subtitle, sometimes editorializing; no
spec rule governs it.

**Spec gaps (where the author had to guess):** emphasis budget per-block vs
per-item; how multi-block beats are labeled; "≤3 long sections in a row" vs XL
multi-block beats (directly contradictory); `render:` field not enforced;
breakdown schema versioning; `lifecycle: sample` / `status: draft` on a
published card; "Table (sparingly)" has no number; the `` `BLOCK-*` ·
descriptor `` line is unspecified.

**Recommendations.** (1) Render+publish the Musk card immediately, or pull it
(move its breakdown to `60-RESEARCH/`, register, migrate frontmatter, add the
`render:` field). (2) Resolve per-block vs per-item emphasis and re-grade all
Counter/Checklist blocks. (3) Fix the Gestalt loft discrepancy (markdown and
render must agree). (4) Add a multi-block-beat labeling rule (render the eyebrow
once per beat). (5) Reconcile "3 long sections" with XL multi-block beats. (6)
Build the validator the Stewards' Log already predicted (it has recurred —
that's the signal). (7) Soften the spaced-rep Beat 2 opener.

**What's working.** Beats-as-scaffolding strip is holding (both renders show
beat NAME-only eyebrows); section dividers behave; grayscale is absolute (zero
violations across both rendered cards); font stack correct and inlined; the
redundancy filter is visibly being run (every card pre-justifies a cut); the
breakdown → card genealogy is legible for the 2 cards that completed the
pipeline. **The system catches *aesthetic* drift well but not *structural*
drift** — because those rules are narrated in prose or contradictory in the
spec. The Musk card is the proof: it failed every structural gate and nothing
stopped it.

## Appendix A6 — Peer-systems research: what to steal

**Index-card / note systems.** *Zettelkasten* — atomicity is "a guiding compass,
not a rigid law," and its *reason* is **linkability**; Luhmann's cards carried a
unique address so any could cite any other — a Supercard block that is genuinely
atomic is currently *un-citable* from outside its card. Anti-lesson: don't import
the Folgezettel branching scheme or "conversation partner" framing — Luhmann
optimizes for the author's serendipity over decades, Supercard for a stranger's
comprehension in one screenshot. *The humble index card / Field Notes* — the
*constraint as the editor* (you can't write past the edge); Supercard's
PRINCIPLE 7 is the same instinct but its "edge" is soft (block-height *ranges*);
a harder per-block ceiling would do more editing work. *Anki / Wozniak's 20
rules* — the **withhold-then-reveal** structure (question before answer);
Supercard's Hook could borrow the *withhold* move — currently heroes lean
*summary* rather than opening a loop. Anti-lesson: don't adopt spaced-repetition
scheduling or decks — Supercard is a read-once, screenshot-share artifact.

**Edward Tufte — going deeper than the existing citation.** What Supercard is
missing: (a) the **data-ink ratio as a per-block audit metric** — sharper than
"earns its scroll"; every gridline, tick, label, frame justifies itself or is
deleted. (b) **"Above all else show the data"** — the decision tree is
shape-first (good) but the grammar doesn't say the chosen shape must be
*maximally direct*; a heavy chart frame passes the current anti-pattern list,
and the frame itself is the violation. (c) **Sparkline as an *inline*
element** — Tufte's sparkline is word-sized, lives inside a sentence; Supercard
treats it only as a full block; this is the single most under-exploited Tufte
idea given the grayscale constraint (sparklines were *designed* for monochrome
typographic context). (d) **The Tufte handout** — a single dense self-paced
sheet replacing a slide deck — philosophically the closest peer to Supercard's
whole thesis; worth citing as a named ancestor alongside the Postcard. (e) **The
smallest effective difference** (*Visual Explanations*) — *the* governing rule
for a six-step gray ramp, and it isn't named anywhere in PRINCIPLE 5. Anti-lesson:
don't import Tufte's hostility to all non-data-ink (the corner glyph is
load-bearing identity) or chase his maximal density (Supercard is mobile-portrait
and ADHD-targeted; Tufte's handouts are letter-size, sustained-focus).

**Physical card formats.** *Trading / baseball cards* — the identity glyph + a
*consistent stat-panel location*, and **grading** (a 1–10 condition signal that
travels with the card); Supercard's `lifecycle` and `frozen_at_version` are a
grading system that *isn't surfaced on the render*. Anti-lesson: don't import
scarcity/foil/collectibility, and don't let the stat panel grow. *Brian Eno's
Oblique Strategies* — radical self-sufficiency through brevity, the purest
ancestor of PRINCIPLE 1; the deck has *no progression* (any card, any order) —
the limit case against the 7-beat spine. Anti-lesson: don't adopt the
*ambiguity* — a Supercard block must convey one *unambiguous* idea. *Recipe
cards* — a **fixed slot grammar** (title/yield/time/ingredients/method/notes,
always in that order, scannable by position); a recipe card never *skips* a
slot, it leaves it short — compare to Mini dropping beats 4 & 5 entirely.
*Museum wall placards* — **tiered reading depth in a fixed footprint** (bold
title for everyone, one-line "what it is" for most, paragraph for the curious) —
progressive disclosure *inside a single static card*, which Supercard does not
have at the block level. *Airline safety cards* — **drawings beat photographs
because "essential actions can be emphasized and backgrounds omitted"** — single
emphasis re-derived independently under safety-critical pressure; and the
**pictogram index** (a wayfinding key) — a consistent beat-glyph set would make
a cropped screenshot say "this is the COUNTER beat" wordlessly. Anti-lesson:
don't go fully wordless — Supercard's value is the prose position.

**Digital knowledge systems.** *Notion* — PRINCIPLE 8 already cites its
auto-migration as the anti-pattern; what Supercard *hasn't* taken is the **block
as a first-class addressable unit** (Notion blocks have stable IDs). *Roam /
Obsidian* — **bidirectional links / backlinks**; Supercard's `related` /
`supersedes` are one-directional frontmatter declarations with no rendered "cards
that reference this one" view — genealogy is asserted but not navigable;
anti-lesson: don't import the graph-as-primary-structure (that's V2 drift in
disguise — backlinks as a *secondary* index only). *Readwise* — a highlight
*always* carries its source inline; make source-attribution mandatory on every
quote block. *Maggie Appleton — digital gardens* — **epistemic disclosure** (a
one-line status: how the author knows this and how sure they are); Supercard
strips dev scaffolding from renders, so a screenshot reader has *no idea* if this
is careful synthesis or a quick take — the Gestalt card already reasons about
source confidence in its (hidden) authoring notes. Anti-lesson: reject the
*tending* (continuous revision) — Supercard is frozen-at-version, correctly, for
its medium — but epistemic disclosure is separable from tending.

**Editorial / publishing systems.** *Stripe Press* — restraint as a signal of
seriousness; a house grid and type scale that never varies across wildly
different books = Supercard's "format-as-grammar." Anti-lesson: don't import
skeuomorphic page texture / book-spine chrome. *NYT visual explainers* — the
**annotation layer** (the takeaway sentence printed directly on the chart, near
the data point). *Our World in Data* — every chart carries a **finding-stating
title** ("GDP per capita has risen 6× since 1950," not "GDP over time"). *The
Pudding* — scrollytelling = one idea per scroll-state, *literally Supercard's
grammar arrived at independently* — but their pieces *require* the scroll (the
V2 failure PRINCIPLE 1 forbids); Supercard is right to demand each block survive
cropping. *Bloomberg* — consistent "chart furniture" (a documented internal
spec) = the `RENDERING-spec` analog; validation. *Magazine front-of-book /
zines* — short dense varied items under a strong consistent template = the Mini
card's job; the zine's photocopier constraint *became* an aesthetic, same move
as Supercard's grayscale. Anti-lesson: don't import interactivity/animation (a
Supercard is static by definition) or the zine's deliberate roughness.

**Shareable-card formats (the "actually gets shared" question).** *Instagram /
LinkedIn carousels* — the closest format peer: **the hook slide carries the
entire share decision** (validates the load-bearing hero), and the borrowable
refinement is that carousels engineer slide 1 to **create an open loop** (a
question, a contrarian claim, a number that demands explanation), not to
summarize; **every swipe is an engagement signal**, so each slide should end
with a reason to continue (mild tension with PRINCIPLE 1); the final slide is
the most shareable single frame — Supercard should make Beat 7 the *designated
crop*. *Pinterest infographics* — vertical aspect + legible at thumbnail scale +
self-contained value; Supercard's header should pass a *thumbnail* test, not
just a screenshot test. *Twitter/X screenshot culture* — people share images of
text because images survive platform-jumping and **can't be stealth-edited** —
independent validation of PRINCIPLE 8; anti-lesson: X screenshot culture also
spreads decontextualized claims, and the corner glyph is the deliberate guard.

**Design-system precedent.** *USWDS component lifecycle* — explicit,
consumer-facing release-status labels that travel with each component
(`Experimental` = "OK to use but will change", `Stable`, `Use with caution`),
*published on the component itself*. *Carbon's component checklist* — a literal
gate: a component cannot move to "stable" until it passes a documented checklist.
*Semantic versioning + migration guides* — Material/Carbon/Polaris treat the
system as a product; Supercard is well-aligned (version, frozen_at_version,
CHANGELOG) but peers publish *migration guides*, not just per-card notes.
*Governance* — peers land on federated-with-a-core-team and an open-comment
period (USWDS: 45 days); Supercard is single-owner — the stewards' log is the
right primitive, but borrow a defined comment window for RFCs. Anti-lesson:
don't import the committee weight (an 11-status pipeline would be PRINCIPLE 7
friction in the wrong place — friction belongs in authoring a card, not
bureaucratizing the spec).

**Top recommendations (A6's ranking):** (1) epistemic-status line on the render
— highest-value, lowest-risk. (2) block-level addresses + a generated backlink
index. (3) an inline word-scale sparkline primitive. (4) finding-stating titles
on chart/data blocks. (5) engineer the hero as an open loop. (6) USWDS
release-status vocabulary + a Carbon-style promotion checklist. (7) name Tufte's
"smallest effective difference" as the gray-ramp operating rule. (8) a per-block
data-ink audit. (9) designate Beat 7 as "the screenshot." (10) cite the Tufte
handout and the airline safety card as named ancestors.

**Validation — where Supercard is already best-in-class:** frozen-at-version
(validated by three peers); single-emphasis-per-block (re-derived by airline
safety-card designers); screenshot autonomy (the correct inversion of The
Pudding's scrollytelling dependency); format-as-grammar (matches Stripe Press
house-grid discipline and recipe-card slot grammar); grayscale-as-identity (the
zine/photocopier move); versioning + CHANGELOG + ADRs (match Material/Carbon/
Polaris); the corner glyph (the ethical core X screenshot culture lacks).

**Open tensions.** (1) "Open loop" hero vs PRINCIPLE 1 — can a hero open a loop
*and* be self-sufficient? (probably yes — needs a line drawn in GRAMMAR). (2)
"Each block ends with a reason to continue" vs PRINCIPLE 1 — is pull-through
allowed only as tone/curiosity, never as missing information? (3) Block-level
addressing + backlinks vs the bounded-artifact thesis — cap it explicitly as a
generated read-only index. (4) Epistemic-status line vs "chrome is noise" and
the recent strip-dev-scaffolding decision — is epistemic status *content* or
*scaffolding*? (5) Tufte's maximal density vs ADHD-targeted mobile restraint —
steal Tufte's principles, explicitly reject his density ceiling. (6) USWDS
comment-window governance vs single-owner velocity + commit-straight-to-main —
does the block *library* need heavier governance than a *card*?

*Source reliability:* Primary — Tufte (edwardtufte.com, his books), USWDS
lifecycle docs, Maggie Appleton's site, Wikipedia "Aircraft safety card,"
zettelkasten.de. Practitioner — Carbon component checklist, arun.is
flight-safety-card teardown, Anki manual / Wozniak's 20 rules, design-system
governance guides. Blog/vendor (moderate — engagement claims consistent across
multiple but marketing-adjacent) — carousel guides (postnitro, carouselpost,
expandi); treat specific multipliers as soft, the directional claims are
corroborated widely.

---

## 10. Consolidated source register

Rated as in the breakdown convention: **high** = peer-reviewed primary/meta,
authoritative review, or foundational primary text. **medium** = reputable
practitioner or tertiary educational reference. **low/moderate** = single or
marketing-adjacent source; directionally corroborated.

| key | source | reliability | supports |
|---|---|---|---|
| C1 | Lorch, Lorch & Klusewitz (1995), *Contemporary Educational Psychology* 20:51–64 | high | light vs heavy signaling; heavy = no better than control; R-A1 |
| C2 | von Restorff (1933); Hunt (1995), *Psychonomic Bulletin & Review* — "The subtlety of distinctiveness" | high | the isolation effect — the true basis of single-emphasis; R-A1, R-B1 |
| C3 | Sanchez & Wiley (2006), *Memory & Cognition* — seductive-details effect | high | belongs under PRINCIPLE 9 (redundancy filter), not §2; R-A1 |
| C4 | Sanchez & Wiley (2009), *Human Factors* — "To Scroll or Not to Scroll" | high | scrolling penalizes low-WM readers; empirical core of PRINCIPLE 1; R-A2 |
| C5 | Miller, Keenan et al. (2013), *Journal of Abnormal Child Psychology* — the centrality deficit | high | ADHD readers can't self-identify central ideas; R-A2 |
| C6 | Event-segmentation deficits in ADHD (PubMed 30205738) | high | ADHD readers under-segment continuous input; R-A2 |
| C7 | Cowan (2001), *Behavioral and Brain Sciences* 24(1) — "the magical number 4" | high | working memory ~4 chunks; the block model as chunking |
| C8 | Sweller, *Cognitive Load Theory* (2011) | high | intrinsic/extraneous/germane load |
| C9 | Mayer, *Cambridge Handbook of Multimedia Learning* — coherence, redundancy, signaling principles | high | the redundancy filter; signaling; R-A1 |
| C10 | Signaling meta-analyses — Richter et al. (2016); Alpizar et al. (2020), *ETR&D* | high | signaling effect, largest for low-prior-knowledge learners |
| C11 | Glanzer & Cunitz (1966) — serial position / primacy & recency | high | Hook/Close exploit primacy & recency; the middle-beat trough; R-C6 |
| C12 | Higdon et al. (2025), *Quarterly Journal of Experimental Psychology* — picture superiority = distinctiveness | high | re-ground "shape-first" on distinctiveness, not dual coding |
| C13 | "A further specification of the effects of font emphasis on reading comprehension" (2023), *Memory & Cognition* — ERP | high | neural confirmation of the emphasis mechanism; R-A1 |
| C14 | Rello & Baeza-Yates (2013), "Good fonts for dyslexia"; Kuster et al. (2018), *Annals of Dyslexia* | high | specialized fonts do not help — SF Pro Rounded vindicated |
| C15 | McNeill & Krajcik — Claim-Evidence-Reasoning (+Rebuttal) framework (ERIC) | high | Evidence-before-Mechanism; Counter is load-bearing; R-C2 |
| C16 | Tippett (2010), "Refutation Text in Science Education" (Springer); Kendeou et al.; Sinatra & Broughton — refutation-text / coactivation / hypercorrection | high | Counter is load-bearing for comprehension; R-C2 |
| C17 | Allen — one-sided vs two-sided message meta-analyses (1991, 1999) | high | refutational two-sided messages more persuasive & credible; R-C2 |
| C18 | Argument order / law of primacy (PMC) | high | tension: primacy vs climax-last; R-C5 |
| C19 | Diátaxis framework (diataxis.fr) | high | reference is a map, not a story; R-C4 |
| C20 | Olson — And-But-Therefore; Kenn Adams' Story Spine; Minto Pyramid / SCQA; BLUF / inverted pyramid; Aristotle's rhetoric | medium–high | spine mapping; classical rhetoric validates the 7-beat order |
| C21 | WCAG 2.1/2.2 SC 1.4.3 & 1.4.8 (W3C); WebAIM contrast | high (formal standard) | the gray-ramp legibility hole; R-C8 |
| C22 | Apple HIG / WWDC20 "Details of UI Typography" | high (authoritative) | SF Pro optical sizes; tracking; R-C9 |
| C23 | "Optimal Line Length in Reading — A Literature Review," *Visible Language* (2005); Dyson & Haselgrove; Baymard; UXPin | high–medium | mobile measure 30–50 CPL; R-B5 |
| C24 | 8-point-grid & design-token literature (Built to Adapt, Designsystems.com, freeCodeCamp, Chien-Chun Wu, Dalgleish) | medium | grid/token validation; vertical rhythm; R-C11 |
| C25 | Material Design 3 elevation tokens; Designsystems.surf "Depth with Purpose"; Atlassian | medium | elevation must be sparing; the 1–3 cap validated |
| C26 | Auzenne, "The End of Flat Design"; Apple HIG Materials — iOS 26 / visionOS depth turn | medium | the counter-trend tension; R-C12 |
| C27 | nilcoalescing & DevTechie — `ConcentricRectangle` (iOS 26) | high | the concentric-radius formula; R-C11 |
| C28 | NN/g — Proximity Principle, F-pattern, layer-cake scanning | medium (eye-tracking-backed practitioner) | whitespace-as-grouping; scan patterns |
| C29 | REI Cedar — Atomic Content; Brad Frost — Atomic Design | medium | the self-sufficient region as the atomic content unit |
| C30 | Edward Tufte — *The Visual Display of Quantitative Information*, *Visual Explanations*, edwardtufte.com | high (foundational) | data-ink, sparklines, smallest effective difference, the handout; R-C15, R-C16, R-C17 |
| C31 | USWDS component lifecycle; Carbon component checklist; design-system governance guides | medium (authoritative practitioner) | release-status vocabulary; promotion checklist; R-C19 |
| C32 | Maggie Appleton — digital gardens / epistemic disclosure (maggieappleton.com) | medium | the epistemic-status line; R-C13 |
| C33 | Zettelkasten (zettelkasten.de); Anki manual / Wozniak's "20 rules"; Field Notes | medium | atomicity-for-linkability; withhold-then-reveal; R-C14, R-C18 |
| C34 | Wikipedia "Aircraft safety card" (well-sourced); arun.is flight-safety-card teardown | medium | single-emphasis re-derived; the pictogram index; R-C16 |
| C35 | Our World in Data; NYT visual explainers; The Pudding; Bloomberg; Stripe Press | medium | finding-stating titles; annotation layer; scrollytelling as validation; R-C17 |
| C36 | Carousel-format guides (postnitro, carouselpost, expandi); X screenshot culture | low–moderate | hook-as-share-decision; designated-crop final slide; R-C18, R-C20 |
| C37 | Hauser et al. (2018), *Brain* 141(5) — dopamine / novelty | high (but pop framing around it is low) | the adjacency rule's plausibility — not a finding |

---

## 11. Confidence assessment

Overall **high**. The synthesis rests on a strong peer-reviewed core for every
load-bearing claim: the citation corrections (R-A1) and the ADHD grounding
(R-A2) are backed by high-reliability primary research and were caught
*independently by two agents*; the drift audit (A5) is a direct inspection of
the repo, not inference; the spec gaps (Part B) are observed contradictions in
the spec text itself, not opinions. The softer areas are appropriately flagged:
the borrowed peer mechanics (Part C "borrowed from peers") rest on medium /
practitioner sources — correctly, since they are *practice* proposals, not
empirical claims — and the carousel-engagement material (C36) is explicitly
marked low/moderate. The single genuine inter-agent discrepancy — "which Lorch
1995 paper" — resolves cleanly: A1 found a specific 1995 Lorch paper that *does*
support the claim, A4 noted a *different* 1995 Lorch review that does not; the
fix (R-A1) is to disambiguate to the correct paper *and* add von Restorff as the
mechanism, which both agents' findings support. Nothing in the six reports
contradicts the headline: **the system's values are sound; the work is
correction, clarification, enforcement, and a set of deliberate evolution
choices the owner now adjudicates.**
