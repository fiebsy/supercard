# BREAKDOWN — Gestalt Principles

| key | value |
|---|---|
| id | BREAKDOWN-gestalt-principles |
| type | breakdown |
| topic | The Gestalt principles of perceptual organization |
| slug | gestalt-principles |
| era | atlas |
| owner | derick |
| created | 2026-05-14 |
| updated | 2026-05-14 |
| status | active |
| modes_derived | deep-dive |
| derived_cards | CARD-2026-05-14-gestalt-principles |
| source_count | 10 |
| confidence | high |
| supersedes | |
| related_reports | |

> **What this file is.** The deep research report for the Gestalt principles —
> the uncompressed source of truth `CARD-2026-05-14-gestalt-principles` is
> derived from (ADR-0005, ADR-0006). Registered in `INDEX-research-reports.md`.
>
> Authored for completeness, not for a card. No length budget. The card in
> `30-CARDS/` is a constrained `deep-dive` *view* of this file.

---

## 0. Research brief

- **Question.** What are the Gestalt principles of perceptual organization, where did they come from, how do they actually work, and how well have they held up — scientifically and in design practice?
- **Why now.** User requested a `deep-dive` Supercard on "gestalt principles," to be rendered both as standalone HTML and as a React component on Vercel.
- **Mode(s) anticipated.** `deep-dive` first (XL, 18–25 blocks). The report is deliberately deep enough to also feed a future `reference` card (the principles as a navigable catalogue) or a `summary` Mini.
- **In scope.** The founding history; the master law (Prägnanz); the classic grouping principles; figure/ground organization; the 20th/21st-century additions; the modern scientific reassessment; quantification; design applications; the honest limitations.
- **Out of scope.** Gestalt *therapy* (Perls — a separate, unrelated tradition that borrowed the name). The full neuroscience of cortical grouping mechanisms below the behavioural level. Gestalt approaches to problem-solving, learning, and thinking (Wertheimer's *Productive Thinking*, Köhler's ape studies) — adjacent but not perceptual organization.
- **Audience posture.** Reader is a design engineer. Assume visual fluency and interest in why interfaces read the way they do; do **not** assume they know the history, the names of the principles, or that "Gestalt psychology" was once a whole rival school of psychology that collapsed.
- **Source posture.** Web research against the established perception-science literature — a Psychological Bulletin centennial review, the foundational primary papers, a canonical text — cross-checked against reputable design-practitioner references for the application beat.

## 1. Research log

- **Pass 1 — the canon.** Searched for the standard list and origin of the Gestalt principles. Established the three founders (Wertheimer, Koffka, Köhler), the ~1910s German origin, and the commonly taught set: proximity, similarity, continuity, closure, figure/ground, Prägnanz. [S5][S9]
- **Pass 2 — the primary record.** Traced the founding to two papers: Wertheimer's 1912 phi-phenomenon paper (apparent motion — the experiment that launched the school) and his 1923 *Untersuchungen zur Lehre von der Gestalt II* (the "dot essay" that formalized the laws of organization, later translated as "Laws of organization in perceptual forms"). Confirmed publication: *Psychologische Forschung* 4, pp. 301–350, 1923. [S2][S3]
- **Pass 3 — the quote.** Chased the famous "the whole is other than the sum of its parts." It is Koffka's (*Principles of Gestalt Psychology*, 1935). The popular version — "*greater* than the sum" — is a misquote Koffka actively corrected: "other," not "greater," because the whole is *qualitatively different*, not merely *larger*. This is a load-bearing distinction, not pedantry. [S4]
- **Pass 4 — the modern verdict.** Found Wagemans et al. (2012), "A century of Gestalt psychology in visual perception: I. Perceptual grouping and figure–ground organization," *Psychological Bulletin* — the centennial review. It supplied: the full principle list including 20th/21st-century additions (common region, element connectedness, uniform connectedness, common fate, synchrony, parallelism); the quantification of proximity (the Pure Distance Law, Kubovy & Wagemans 1995); the decline narrative (Köhler's brain-field theory refuted by Lashley 1951 and Sperry 1955); and the verdict that the *phenomena* are real and replicable even though the original *explanatory theory* failed. [S1][S7][S8][S10]
- **Pass 5 — design practice.** Practitioner references (Interaction Design Foundation, Laws of UX) for how the principles are used in UI/UX — common region as the "card" pattern, proximity for grouping, closure in logo design (FedEx arrow, WWF panda). [S5][S6]
- **Searches that returned little:** a single canonical *count* of "the Gestalt principles" — there isn't one. Wertheimer's 1923 paper named more than a hundred factors informally; textbooks teach 5–7; the 2012 review catalogues a dozen-plus. The number is a teaching convention, not a fact. Recorded so a later pass doesn't chase it.

## 2. Executive synthesis

The Gestalt principles describe how the human visual system imposes structure
on raw input *before* conscious thought — automatically grouping, separating,
and completing what falls on the retina so the world arrives already organized
into objects. They were formulated by three German psychologists in the 1910s–20s
(Wertheimer, Koffka, Köhler), under one master law, **Prägnanz**: perception
settles into the simplest, most stable organization the stimulus allows. The
movement that produced them — Gestalt psychology, a rival to the
element-by-element "structuralist" account of mind — eventually collapsed: its
core *explanatory* mechanism, Köhler's theory of electrical fields in the brain,
was experimentally refuted in the 1950s. But the *phenomena* the principles
describe outlived the theory. Modern vision science has re-derived them with
rigorous experiments and even quantified some — proximity now follows a precise
mathematical law. The principles are best understood today as **robust,
descriptive regularities of perception**: not a finished theory of *why*, but a
reliable catalogue of *what* the visual system does — which is exactly why they
became the working grammar of graphic, interface, and information design.

---

# The seven beats

## Beat 1 — Hook

- **Essence.** You never see raw pixels. Before you are aware of looking, your
  visual system has already grouped, split, and completed the scene into
  objects — and the Gestalt principles are the catalogue of the rules it uses.
- Candidate framings:
  - "Perception isn't a camera — it's an interpreter. The Gestalt principles are the rules it interprets by." (clean, abstract)
  - "The whole is *other* than the sum of its parts — your visual system builds the whole first, and you only ever meet the result." (uses the canonical quote; ties hook to Koffka)
  - "Three German psychologists asked why a row of dots looks like *a row* and not like *dots*. The answer became the working grammar of design." (history-forward, concrete)
  - "Gestalt psychology — the school — is dead. The Gestalt principles — the phenomena — are everywhere you look." (the central tension of the whole topic, stated as the hook)
- Why this is the hook and not the mechanism: the screenshot-worthy idea is the
  *inversion* — that organization is upstream of awareness, not downstream of it.
  The principles themselves (Beat 3) are the catalogue; the hook just has to
  land that the catalogue exists because perception is *constructive*.

## Beat 2 — Evidence

*Why this matters — and why it is taken seriously despite its school collapsing.*

- **The founding experiment: the phi phenomenon (1912).** Max Wertheimer
  published *Experimentelle Studien über das Sehen von Bewegung* — experimental
  studies on the seeing of motion. Two lights flashed in alternation at the
  right interval are seen as **one light moving** — motion where there is no
  moving thing. The perception is of a whole (movement) that is not present in
  any part (a static flash). This is the experiment that launched Gestalt
  psychology; the apparatus was a stroboscope, and the popular origin story has
  Wertheimer struck by the idea on a train in 1910. [S3][S1]
- **It built — and outlived — an entire school of psychology.** Gestalt
  psychology was a serious rival to the dominant element-by-element accounts of
  mind (structuralism, and later behaviourism). The school scattered when its
  founders fled Nazi Germany after 1933, and faded as a distinct movement by the
  1950s–60s. The *principles* did not fade — they were absorbed into mainstream
  perception science, cognitive science, and design. [S1]
- **The principles are among the most replicated phenomena in perception.**
  The 2012 *Psychological Bulletin* centennial review (Wagemans et al.) concludes
  the grouping phenomena are "genuine and ubiquitous in perception," real and
  replicable — and that modern neuroscience has confirmed the *pre-attentive
  organizational mechanisms* the Gestaltists postulated, even though it rejected
  their specific theory of how the brain implements them. [S1]
- **Proximity has been reduced to a precise law.** Kubovy & Wagemans (1995) and
  Kubovy, Holcombe & Wagemans (1998) showed that in ambiguous dot lattices, the
  log-odds of seeing one grouping over a competing one is a linear function of
  the log-ratio of the competing distances — the **Pure Distance Law**. Grouping
  by proximity depends *only* on relative distance, nothing else. This is the
  single strongest piece of evidence that a "principle" once dismissed as a
  vague demonstration is a quantifiable regularity. [S7][S1]
- **The canonical formulation: Koffka's quote.** "The whole is **other** than
  the sum of its parts" — Kurt Koffka, *Principles of Gestalt Psychology* (1935).
  Koffka explicitly rejected the common rendering "*greater* than the sum": the
  point is not that wholes are *bigger*, it is that they are *qualitatively
  different* and have an existence of their own in perception. "This is not a
  principle of addition." [S4]
- Note on numbers: there is **no fixed count** of "the Gestalt principles."
  Wertheimer's 1923 paper named well over a hundred contributing factors
  informally; introductory textbooks settle on five to seven for teaching; the
  2012 review catalogues a dozen-plus including modern additions. Any card must
  not imply a canonical number exists. [S1][S2]

## Beat 3 — Mechanism

*How it works — the master law, the classic grouping principles, the
figure/ground act, the modern additions, and the one principle that has been
turned into math.*

### The master law: Prägnanz

- **Prägnanz** (German: roughly "pithiness," "conciseness," "good form") is the
  overarching law under which all the specific principles sit. It states that
  the perceptual field organizes itself into the **simplest, most regular,
  most stable** structure the stimulus conditions permit. Every specific
  grouping principle is a particular way the system pursues "good form." [S2][S1][S9]
- It is a *minimum principle*: perception, given a choice of organizations,
  tends toward the one that is most economical to represent. (The 2012 review
  connects this to modern minimum-energy / recurrent-network models — the
  abstract idea survived even though Köhler's specific physical theory did not.) [S1]

### The classic grouping principles (Wertheimer, 1923)

These are the rules by which the system decides *which elements belong together*:

1. **Proximity** — elements that are close together are grouped together. [S2]
2. **Similarity** — elements that share a feature (color, size, shape,
   orientation) are grouped together. [S2]
3. **Common fate** — elements that move together (same direction, same speed)
   are grouped together. The only classically *dynamic* principle. [S2][S1]
4. **Good continuation** — elements arranged on a smooth, continuous line or
   curve are grouped; the eye prefers continuous paths over abrupt direction
   changes. [S2]
5. **Closure** — the system completes incomplete figures, perceiving a whole
   shape where the contour is actually broken. [S2]
6. **Symmetry / good form (order)** — symmetrical, regular, ordered
   arrangements are grouped and preferred over irregular ones. [S2][S1]
- (Wertheimer also discussed **parallelism** — parallel elements group — and
  **past experience / set** — familiar arrangements are seen as familiar
  objects. Past experience is the most contested classic factor: see Counter
  and Open questions.) [S1][S2]

### The other organizing act: figure/ground

- **Figure/ground organization** is distinct from grouping. Grouping decides
  which elements clump; figure/ground decides which region is the **object**
  (the figure — it has shape, it owns the contour, it appears closer) and which
  is the **background** (the ground — shapeless, continuing behind the figure).
  Reversible figures (Rubin's vase/faces) show the assignment is an active
  perceptual *decision*, and an unstable one. [S1][S9]
- Cues that bias a region toward "figure": smaller area, surroundedness,
  convexity, symmetry, being lower in the visual field, having meaning. [S1]

### The 20th/21st-century additions

The principle set is not closed. Later researchers added grouping factors
Wertheimer's generation did not isolate:

- **Common region** (Palmer, 1992) — elements inside a shared bounded area are
  grouped, even against proximity and similarity. This is the principle behind
  the "card" UI pattern. [S1][S6]
- **Element / uniform connectedness** (Palmer & Rock, 1994) — elements that are
  physically connected, or that form a uniformly-propertied region, are grouped.
  Palmer & Rock argued **uniform connectedness is foundational** — the visual
  system first carves the image into uniform connected regions, *then* applies
  grouping and figure/ground to those regions. It can override proximity and
  similarity. [S1][S8]
- **Synchrony** and **generalized common fate** — elements that change at the
  same time, in *any* dimension (not just motion — luminance, color), are
  grouped. A modern generalization of common fate. [S1]

### The one principle turned into math: the Pure Distance Law

- For proximity, grouping is fully predicted by relative distance. In a dot
  lattice with two competing grouping orientations at distances *d₁* and *d₂*,
  the log-odds of perceiving orientation 1 over orientation 2 is:

  **log-odds = k · log(d₁ / d₂)**

  where *k* is an individual observer's sensitivity. Only the *ratio* of
  distances matters — not absolute distance, not the lattice's overall
  symmetry. And when proximity and similarity act together, their effects are
  **additive in log-odds space**. The vague nineteenth-century "things near each
  other group" became a precise, parameter-fitted model. [S7][S1]

### The lever

- **The lever of the whole topic is automaticity-before-awareness.** None of
  this is reasoning. Grouping, figure/ground, and closure happen pre-attentively,
  fast, and largely involuntarily — you cannot *un-see* a grouped row of dots as
  scattered dots by deciding to. The principles are descriptions of a process
  that runs *upstream* of the conscious observer. That is why they are reliable
  enough to design with: the designer is not persuading the viewer, the
  designer is supplying inputs to a fixed perceptual machine. [S1]

### Edge conditions in the mechanism

- Principles **compete and combine**. A layout can pit proximity against
  similarity against common region; the outcome is the organization with the
  best overall "fit," and for some pairs (proximity + similarity) the
  combination is quantifiably additive. [S1][S7]
- Some principles **dominate** others: uniform connectedness and common region
  can override proximity and similarity. There is no fixed global ranking — it
  is stimulus-dependent. [S1][S8]

## Beat 4 — Comparison

*What the Gestalt account sits against.*

- **Gestalt (wholes-first) vs. structuralism / elementism (parts-first).** The
  central historical contrast. Structuralism (Wundt, Titchener) held that
  conscious experience is built up from atomic sensations — perception is
  addition. Gestalt psychology inverted it: the **whole is perceived first**,
  and is *other than* the sum of the parts; the parts are determined by the
  whole, not the whole by the parts. The phi phenomenon was the wedge — you
  cannot build "motion" by adding two static flashes. [S1][S4][S3]
- **Gestalt principles vs. feature detection / computational vision.** Later
  vision science (Hubel & Wiesel's feature detectors; Marr's computational
  approach) is often read as a return to a parts-first, bottom-up account. The
  2012 review's reconciliation: it is not either/or — there are *multiple
  processing levels*, and the Gestalt grouping phenomena are now modelled as
  context-sensitive, recurrent (feedback-laden) processes, not as either pure
  bottom-up feature addition or a mystical top-down whole. [S1]
- **Commonly confused with: Gestalt *therapy*.** Fritz Perls's Gestalt therapy
  (1940s–50s) borrowed the word and the holistic flavour but is a separate
  clinical tradition with no direct line to Wertheimer's perceptual research. A
  card must not let the two bleed together. [S9]
- **Principle vs. principle.** Within the system, the interesting comparison is
  internal: proximity vs. similarity vs. common region — which wins when they
  disagree. This is not a flaw; it is the actual content of the modern research
  program (quantifying the combination rules). [S1][S7]

## Beat 5 — Counter

*The honest steelman — where the Gestalt account is weak, and what failed.*

- **The explanatory theory failed.** Köhler's account of *why* grouping happens —
  "psychophysical isomorphism," the claim that organized percepts correspond to
  organized **electrical fields** in the brain — was experimentally refuted.
  Lashley, Chow & Semmes (1951) and Sperry, Miner & Myers (1955) disrupted
  cortical current flow in animals (gold foil, mica strips, pin arrays) and
  found shape discrimination *survived*. The brain-field theory was wrong. This
  was a major reason Gestalt psychology declined as a school. [S1][S10]
- **"Mere demonstrations," not experiments.** A standing criticism: the classic
  principles were originally established by compelling but *qualitative*
  picture-demonstrations, not controlled measurement. For decades they were
  descriptive rules with no quantitative model and no predictive power for
  novel, complex scenes. (The 2012 review treats this as a criticism that has
  *since been answered* — by the Pure Distance Law and similar work — not one
  that was wrong, but one that took 80+ years to address.) [S1][S7]
- **The laws are vague and they conflict.** "Things that are similar group" does
  not say *how* similar, on *which* dimension, or what happens when similarity
  and proximity disagree. The principles are a catalogue of tendencies, not an
  algorithm; for an arbitrary complex image they do not jointly predict a unique
  organization without further modelling. [S1]
- **Proliferation.** The list keeps growing (common region, connectedness,
  synchrony, generalized common fate…). A set of "laws" that expands whenever a
  new grouping demo is found risks being a taxonomy of effects rather than a
  theory. [S1]
- **Innate vs. learned is unresolved.** The Gestaltists treated the principles
  as native, autonomous organization. How much is built-in versus learned from a
  lifetime of experience with the statistics of real scenes is still open — and
  "past experience" as a grouping factor sits awkwardly inside a framework that
  was built to *deny* that perception is assembled from learned associations. [S1]
- **The strongest skeptic's objection** — *"If the founding theory was refuted
  and the laws are just a descriptive list, why call it a theory at all?"* The
  honest response: you shouldn't. The defensible modern position is exactly that
  — the Gestalt principles are **robust descriptive regularities**, not a
  complete theory of perception. That is not a small thing: a reliable,
  replicable, partly-quantified description of how perception organizes input is
  enormously useful, both scientifically and practically. The error is only in
  over-claiming it as a finished *explanation*. [S1]

## Beat 6 — Application

*So what — for a designer, the principles are not trivia, they are the
operating rules of the medium.*

- **The bridge: design is the deliberate supply of grouping cues.** Because the
  principles run pre-attentively and involuntarily, a designer who arranges
  proximity, similarity, common region, and continuity is not decorating — they
  are programming the viewer's perceptual machine. Layout *is* applied Gestalt. [S5][S6]
- **Proximity → grouping without chrome.** Related items placed close, unrelated
  items spaced apart, communicates structure with whitespace alone — no boxes,
  no lines needed. Tightening and loosening spacing is the cheapest grouping
  tool. [S5][S6]
- **Common region → the card.** Enclosing elements in a shared bounded surface
  makes them read as one unit, even when they are far apart or dissimilar. The
  card UI pattern, fieldsets, and table row striping are all common region. (It
  is also why the Supercard format budgets cards so strictly — a bounded region
  is a strong, expensive grouping signal.) [S1][S6]
- **Similarity → implicit categories.** Shared color, shape, or type style tells
  the viewer "these are the same kind of thing" without a label — used for
  links, button hierarchies, status indicators. [S5]
- **Continuity → alignment and flow.** Aligning elements to a shared edge or a
  grid creates a continuous invisible line the eye follows; this is why grids
  feel ordered and misalignment feels broken. [S5][S6]
- **Closure → minimal marks.** The viewer completes implied shapes, so a logo or
  icon can be suggested rather than drawn in full. Canonical examples: the
  **FedEx arrow** in the negative space between E and x (closure + figure/ground),
  the **WWF panda** assembled from incomplete black shapes, the IBM and USA
  Network logos. [S5]
- **Figure/ground → hierarchy and depth.** Controlling which region reads as
  figure (contrast, surroundedness, blur of the ground) is how interfaces create
  modals, focus states, and layered depth. [S5][S6]
- **Common fate → motion grouping.** Elements that animate together read as one
  group — used in coordinated transitions, loading states, and to show that a
  set of items shares a fate (e.g., a row sliding away on delete). [S1]
- **Anti-patterns to avoid:**
  - Letting an *unintended* principle dominate — e.g., similarity (everything
    the same color) overriding the proximity grouping you actually want.
  - Fighting the principles instead of using them — equal spacing everywhere
    destroys proximity grouping and forces the user to read every element
    individually.
  - Over-enclosing — wrapping everything in a card so common region stops
    signalling anything (this is exactly the Supercard "chrome is noise" rule).
  - Treating the principles as decoration rather than as the structural logic of
    the layout.

## Beat 7 — Close

- Candidate takeaways:
  - **"The Gestalt principles aren't design tips — they're the perceptual
    machine design runs on."** (sharpest, application-forward; recommended)
  - "The school that discovered them is gone. The phenomena they discovered are
    in everything you've ever looked at."
  - "Perception organizes before you do. The principles are the rules of that
    organization — descriptive, replicable, and yours to design with."
  - "The whole is *other* than the sum of its parts — and the designer's job is
    to choose which whole."
- What to remember if nothing else: the visual system imposes structure
  pre-attentively under one master law (Prägnanz — pursue the simplest stable
  form); the specific grouping principles are a robust, partly-quantified
  *description* of how it does so; and design is the practice of supplying that
  machine its inputs on purpose.

---

# Research apparatus

## Source register

| key | source (author, title, publisher/year, URL) | type | reliability | what it supports |
|---|---|---|---|---|
| S1 | Wagemans, J., Elder, J.H., Kubovy, M., Palmer, S.E., Peterson, M.A., Singh, M., von der Heydt, R. — "A century of Gestalt psychology in visual perception: I. Perceptual grouping and figure–ground organization" — *Psychological Bulletin* 138(6), 2012 — https://pmc.ncbi.nlm.nih.gov/articles/PMC3482144/ | review / primary synthesis | high | the centennial verdict; full principle list incl. modern additions; decline narrative; brain-field refutation; quantification; reconciliation with modern vision science |
| S2 | Wertheimer, M. — "Untersuchungen zur Lehre von der Gestalt II" — *Psychologische Forschung* 4, pp. 301–350, 1923 (trans. "Laws of organization in perceptual forms," in Ellis, *A Source Book of Gestalt Psychology*, 1938) — https://psychclassics.yorku.ca/Wertheimer/Forms/forms.htm | foundational primary | high | the formal laws of organization: proximity, similarity, good continuation, closure, common fate, good form; Prägnanz as the general principle |
| S3 | Wertheimer, M. — "Experimentelle Studien über das Sehen von Bewegung" — *Zeitschrift für Psychologie* 61, 1912 | foundational primary | high | the phi phenomenon — the founding experiment of Gestalt psychology; apparent motion |
| S4 | Koffka, K. — *Principles of Gestalt Psychology* — Harcourt, Brace, 1935 | book / foundational | high | "the whole is other than the sum of its parts"; the "other ≠ greater" distinction; Gestalt vs. elementism |
| S5 | Interaction Design Foundation — "What are the Gestalt Principles?" — https://www.interaction-design.org/literature/topics/gestalt-principles | practitioner / educational reference | medium | the standard taught principle set; design applications; logo examples (FedEx, WWF) |
| S6 | Yablonski, J. — *Laws of UX* — "Law of Common Region," "Law of Proximity," etc. — https://lawsofux.com/ | practitioner reference | medium | common region as the card pattern; proximity and continuity in UI; principle-to-pattern mapping |
| S7 | Kubovy, M. & Wagemans, J. — "Grouping by proximity and multistability in dot lattices" — *Psychological Science* 6, 1995; Kubovy, M., Holcombe, A.O. & Wagemans, J. — "On the lawfulness of grouping by proximity" — *Cognitive Psychology* 35, 1998 | primary research | high | the Pure Distance Law: log-odds = k·log(d₁/d₂); proximity depends only on relative distance; additive combination with similarity |
| S8 | Palmer, S.E. & Rock, I. — "Rethinking perceptual organization: The role of uniform connectedness" — *Psychonomic Bulletin & Review* 1, 1994 | primary research | high | uniform connectedness as a foundational, pre-grouping organizing step; element connectedness; can override proximity/similarity |
| S9 | Britannica, "Gestalt psychology"; Scholarpedia, "Gestalt principles"; SimplyPsychology, "What is Gestalt Psychology?" — general reference articles | tertiary reference | medium | founder names and dates; Prägnanz gloss; figure/ground and reversible figures; the Gestalt-therapy distinction |
| S10 | Lashley, K.S., Chow, K.L. & Semmes, J. — "An examination of the electrical field theory of cerebral integration" — *Psychological Review* 58, 1951; Sperry, R.W., Miner, N. & Myers, R.E. — "Visual pattern perception following subpial slicing and tantalum wire implantations in the visual cortex" — *J. Comparative & Physiological Psychology* 48, 1955 (accessed via S1) | primary research | high | experimental refutation of Köhler's electrical brain-field theory |

Reliability guide: **high** = peer-reviewed primary research, authoritative
review, or foundational primary text. **medium** = reputable practitioner or
tertiary educational reference. **low** = single uncorroborated source.

## Key quotes bank

- > "The whole is other than the sum of its parts." — Kurt Koffka, *Principles of
  Gestalt Psychology*, 1935 [S4]. **Usage note:** verbatim and safe for a
  `pull-quote` or `quote-as-evidence` block. The common form "*greater* than the
  sum" is a misquote — Koffka corrected students who substituted "greater," and
  any card using the quote should use "other" and may note the correction.
- > "This is not a principle of addition." — attributed to Koffka, glossing the
  above [S4, S9 corroboration]. Paraphrase-strength; treat as reported, not as a
  pull-quote unless the exact wording is reconfirmed against the 1935 text.
- The 2012 review's verdict — that the grouping phenomena are "genuine and
  ubiquitous in perception" [S1] — is a true short lift and may be used as a
  `quote-as-evidence` fragment.

## Numbers & data bank

| value | units | what it measures | source | date / population | confidence |
|---|---|---|---|---|---|
| 1912 | year | phi-phenomenon paper — the founding experiment / start of Gestalt psychology | S3, S1 | Wertheimer, 1912 | high |
| 1923 | year | *Untersuchungen II* — the formal "laws of organization" paper | S2 | Wertheimer, 1923 | high |
| 1935 | year | Koffka's *Principles of Gestalt Psychology* — "other than the sum" | S4 | Koffka, 1935 | high |
| 1951 / 1955 | years | Lashley and Sperry experiments refuting Köhler's brain-field theory | S10, S1 | 1951, 1955 | high |
| 2012 | year | *Psychological Bulletin* centennial review — modern verdict | S1 | Wagemans et al., 2012 | high |
| ~100 | years | span from founding (1912) to centennial review (2012); "a century of Gestalt psychology" | S1 | — | high |
| 3 | count | founders — Wertheimer, Koffka, Köhler | S1, S9 | — | high |
| 6 | count | classic grouping principles commonly taught (proximity, similarity, common fate, good continuation, closure, symmetry/order) — a **teaching convention**, not a canonical number | S2, S5 | — | medium — see Open questions |
| log-odds = k·log(d₁/d₂) | equation | the Pure Distance Law — grouping by proximity as a function of the log-ratio of competing distances | S7, S1 | Kubovy & Wagemans 1995; Kubovy et al. 1998 | high |
| 1933 | year | Nazi seizure of power; founders begin emigrating to the US, scattering the school | S1, S9 | — | high |

## Contested claims

- **"How many Gestalt principles are there?"** There is no canonical count.
  Wertheimer's 1923 paper named well over a hundred contributing factors
  informally; textbooks teach five to seven; the 2012 review catalogues a
  dozen-plus including 20th/21st-century additions. A card must present the
  principles as an **open, growing set**, never as a fixed numbered canon.
  [S1][S2][S5]
- **"Greater" vs. "other" than the sum of the parts.** The popular quote is
  "greater"; the correct, sourced quote is "other." This is not trivia — Koffka
  corrected it deliberately because "greater" implies the whole is just *more
  of the same* (addition), whereas "other" means it is *qualitatively
  different*. The card should use "other." [S4]
- **Is it a "theory" or a "set of descriptions"?** Gestalt psychology *as a
  theory of mind* (with the brain-field mechanism) is refuted/abandoned; the
  Gestalt *principles as descriptive regularities* are validated and in active
  use. Sources that call the principles a "theory" without qualification are
  imprecise. The defensible position: robust descriptions, not a finished
  explanation. [S1][S10]
- **Innate vs. learned.** The Gestaltists claimed the principles are native and
  autonomous. The contribution of learned scene statistics is genuinely
  unsettled. Do not present the principles as definitively innate. [S1]

## Open questions & gaps

- **The full quantification program is incomplete.** Proximity has the Pure
  Distance Law; similarity has partial models; most other principles
  (closure, good continuation, common region) are still largely descriptive.
  How *all* the principles jointly predict the organization of an arbitrary
  complex natural scene is an open computational problem. [S1]
- **Innate vs. learned**, as above — unresolved, and a real tension inside the
  framework. [S1]
- **Figure/ground beyond the simple cues.** The cue list (convexity,
  surroundedness, etc.) is known; a complete account of how the cues combine,
  and how meaning/past experience feeds in, is not settled. [S1]
- **Gestalt in non-visual modalities** (auditory streaming is the obvious
  parallel) was left out of scope here — a natural extending pass.
- **Gestalt therapy** was deliberately excluded; if a reader conflates it, a
  future card may need a one-line disambiguation block, but it is not part of
  this report.

## Confidence assessment

Overall **high**. The core position in §2 — that the Gestalt principles are
robust, replicable, partly-quantified *descriptive regularities* of
pre-attentive perceptual organization, whose parent *theory* failed but whose
*phenomena* did not — rests almost entirely on `high`-reliability sources: the
2012 *Psychological Bulletin* centennial review (S1), the foundational primary
papers (S2, S3, S4), and the quantification and refutation literature (S7, S8,
S10). The history (founders, dates, the 1933 scattering, the 1950s decline) is
firmly sourced. The two soft spots are both flagged and both in low-stakes
beats: the *count* of principles is a teaching convention, not a fact (handled
in Contested claims and Open questions), and the design-application beat (Beat 6)
rests on `medium` practitioner sources (S5, S6) rather than controlled studies —
entirely appropriate, since that beat is about *practice*, not empirical claims.
Nothing found would overturn the headline. The conclusion is stable.

---

## Card derivation log

### CARD-2026-05-14-gestalt-principles — deep-dive — 2026-05-14

- **Mode → length variant:** `deep-dive` → XL (18–25 blocks, all 7 beats,
  multi-block beats, redundancy filter at its hardest). Single card — came in
  at 21 blocks (19 content + 2 section dividers), under the 25 cap, so no split.
- **Admitted:** all 7 beats.
  - Beat 1 Hook → `loft-card` (the "perception is upstream of awareness" framing).
  - Beat 2 Evidence → `standard-text` (the phi phenomenon founding) + `timeline`
    (1912 → 2012 history) + `quote-as-evidence` (Koffka "other than the sum").
    No `stat-callout` — the dates live in the timeline; a parallel stat block
    would have failed the redundancy filter.
  - Beat 3 Mechanism → `definition` (Prägnanz, the master law) + `process-flow`
    (Palmer & Rock's carve → assign → group order of operations) +
    `numbered-principle` (the six classic grouping laws) + `definition`
    (figure/ground) + `table` (the modern additions) + `equation` (the Pure
    Distance Law).
  - Beat 4 Comparison → `comparison` (Gestalt wholes-first vs. structuralism
    parts-first) + `standard-text` (principles competing/combining; the Gestalt-
    therapy disambiguation folded in).
  - Beat 5 Counter → `anti-pattern` (the honest steelman — failed theory, vague
    laws, proliferation, innate-vs-learned) + `quote-as-evidence` (the brain-
    field refutation).
  - Beat 6 Application → `standard-text` (the bridge: design = supplying grouping
    cues) + `checklist` (applying the principles) + `table` (canonical examples:
    FedEx, WWF, cards, grids).
  - Beat 7 Close → `key-takeaway` + `pull-quote` (Koffka, reprised as the closer).
  - 2 `section-divider` blocks mark the Mechanism and Counter beat boundaries.
- **Dropped:** the synchrony / generalized-common-fate detail was compressed
  into the modern-additions table rather than given its own block. The
  figure/ground cue list (convexity, surroundedness, etc.) was trimmed to a
  representative few. The full Lashley/Sperry experimental detail (gold foil,
  mica strips) was reduced to a single line in the Counter quote block. All of
  it remains here for a future `reference`-mode re-derivation.
- **Split:** none — single XL card at 22 blocks.
- **Render:** `docs/cards/CARD-2026-05-14-gestalt-principles.html` (standalone
  HTML) and `app/src/cards/GestaltPrinciples.tsx` (React component, Vercel).
