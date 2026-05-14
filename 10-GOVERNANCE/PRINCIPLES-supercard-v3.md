# PRINCIPLES — Supercard

| key | value |
|---|---|
| id | PRINCIPLES-supercard-v3 |
| type | governance |
| era | atlas |
| version | 3.0.0 |
| owner | derick |
| updated | 2026-04-30 |

The 10 foundational principles of the Supercard format. PRINCIPLES says *what we're doing*; GRAMMAR says *how to assemble it*. When in doubt, this doc is the identity anchor — anything that violates these is by definition not a Supercard.

---

## 1. Screenshot autonomy (non-negotiable)

Every visible region of a Supercard must convey one complete idea on its own. A stranger seeing only a cropped screenshot — no scroll context, no surrounding sections — should still understand a single, coherent thought, and be able to trace it back to the system via the corner glyph.

**Why it matters.** This is the load-bearing principle. It's what made V1 work and what V2 lost. Supercards live in the wild — shared, screenshotted, dropped into Slack, pinned on Pinterest — and a card that requires its full scroll to make sense is a card that breaks the moment it leaves the canvas.

**How to apply.** Run the screenshot test on every section, including the header. First sentence must stand without prior context. No pronoun-first openers ("It works because...") that depend on what came before.

## 2. Single emphasis per block (Lorch 1995)

Each block has exactly **one** emphasized phrase — one bold span, one focal stat, one highlighted callout. Two emphases compete; three is noise.

**Why it matters.** Cognitive load research (Lorch 1995, Sanchez & Wiley 2006) shows that emphasis effects collapse when more than one item per visual region competes for primacy. The reader's eye doesn't know where to land, so it lands nowhere — and the block reads as a wall.

**How to apply.** Before publishing any block, ask: "If a reader takes away one phrase from this block, which is it?" Bold that phrase. Strip everything else back to body weight.

## 3. Format-as-grammar, not length

A Supercard is defined by its grammar (the 7-beat narrative spine, the block library, the screenshot test) — not by how long it is. Mini, Standard, and XL are presentation variants of the same grammar, not separate formats.

**Why it matters.** Length-as-identity is how V2 drifted: "Standard" started meaning "long" rather than "complete," and Mini stopped existing because it felt like "less Supercard." Same grammar, different density — Standard remains canonical.

**How to apply.** Author the content first as a 7-beat structure. Then choose a length variant based on topic depth, not desired ceremony. Don't pad a Mini to fill a Standard; don't compress an XL to fit a Standard.

## 4. Sparing use of cards (chrome is noise)

Cards (rounded, lofted, padded surfaces) are the most expensive visual primitive in the system. Reserve them for the hero and at most two other elevated moments. Everything else is flat.

**Why it matters.** When every block sits in a card shell, the chrome becomes the design — and the reader stops being able to distinguish the *anchor* moments from ordinary text. The hard cap is **1–3 lofted elements per Supercard** (hero + ≤2 others).

**How to apply.** Default every block to flat. Justify each lofted element by what it anchors. If you can't articulate why a block deserves elevation, leave it flat.

## 5. Strict grayscale (no color, ever)

Supercards use black, white, and a six-step gray ramp (0%, 6%, 12%, 30%, 60%, 100%). No accent colors. No category colors. No data colors.

**Why it matters.** Color introduces hue management cost (which red? which orange? does it match across cards?). Grayscale forces emphasis to come from weight, position, and size — the underlying typography decisions. The result is editorial timelessness instead of web-app fashion.

**How to apply.** All emphasis lives in font weight (300 → 700) and gray opacity. Charts use solid black for the focal series and gray-30/gray-60 for context series. Never use color to "highlight" — use weight or position.

## 6. SF Pro Rounded as the canonical typeface

SF Pro Rounded for body and display, SF Mono for code and equations. The CSS keyword `ui-rounded` resolves to it on Apple platforms, with a documented fallback chain.

**Why it matters.** The rounded variant of SF Pro carries warmth that pure SF Pro doesn't — it reads as cognitive-prosthesis (a thinking aid) rather than corporate (a deliverable). That tonal difference is the entire reason a Supercard feels different from a slide deck.

**How to apply.** Always declare the full font stack (`ui-rounded, "SF Pro Rounded", "SF Pro", -apple-system, BlinkMacSystemFont, system-ui, ...`). Inline the font on the container, not via a Tailwind class.

## 7. Authoring friction is a feature

Writing a Supercard should feel like writing — i.e., it should be slow, considered, and require synthesis. The format actively resists templates that let you skip thinking.

**Why it matters.** A card that's easy to author tends to be easy to skim past. The friction (filling out a Metadata table, running the screenshot test, choosing the right block per beat) forces the author to actually have a position. Cards written in 5 minutes look like cards written in 5 minutes.

**How to apply.** Don't shortcut the redundancy filter. Don't skip beats because "this topic doesn't need them." If a block writes itself in seconds, suspect it.

## 8. Content frozen at authored version

A Supercard authored under V3.0 stays valid under V3.0 forever. Spec updates don't retroactively reformat old cards. The renderer maintains versioned rule libraries; new blocks added in V3.1+ are unknown to V3.0 cards and skipped, not auto-migrated. (Formalized in ADR-0003.)

**Why it matters.** Auto-migration corrupts the archive — Notion's block format auto-migrates and you can never reconstruct what you wrote in 2019. Frozen-at-authored preserves the genealogy as a true historical record. V3.0's design choices become consequential because we can't quietly fix them later.

**How to apply.** Every Supercard's frontmatter declares `frozen_at_version: 3.X.Y`. Forward migration is allowed only voluntarily — re-author a card under a newer version, with a migration note in the new card's history.

## 9. The redundancy filter

Before any block ships, ask: *what unique element does this add that's not already in any other block on this Supercard?* If the answer is "nothing" or "restates the thesis," cut the block.

**Why it matters.** Redundancy is the silent killer of synthesis. Each block competes for attention; a block that re-says what an adjacent block already said dilutes both. The filter forces every block to earn its scroll.

**How to apply.** Run on every block at draft completion. Pull-quotes that paraphrase body fail. Definitions for context-obvious terms fail. Padding sections that "balance the structure" fail. When in doubt, cut — a card that's tighter is always more authoritative.

## 10. Genealogy-as-asset

The history of how a Supercard came to be — the ADRs, the stewards' log, the rejected ideas, the version it was authored under, the cards that superseded it — is part of the artifact, not metadata. The system optimizes for legibility of its own evolution.

**Why it matters.** Most knowledge systems optimize for the current state and treat history as overhead. Supercards treat history as a load-bearing feature: a future reader (or future-Derick) can reconstruct *why* a card looks the way it does, which is the only way to evolve the system without repeating V2's drift.

**How to apply.** Every card declares `version` and `frozen_at_version`. Every card optionally declares `supersedes` and `related`. ADRs document why decisions were made. The stewards' log captures the *noticing* — patterns observed, temptations resisted. Treat the archive as the asset, not as cleanup to do later.

---

## What these principles aren't

- **They're not a checklist.** A card can pass every individual check and still feel wrong. The principles work together; violating one usually surfaces in another.
- **They're not aesthetic preferences.** Every principle has a load-bearing reason — most grounded in cognition research, design system precedent, or specific incidents (V2 drift, archive corruption).
- **They're not exhaustive.** GRAMMAR, LENGTHS, and RENDERING formalize the *how*. PRINCIPLES is the *what we're doing and why* — when those three docs disagree with this one, this one wins.

## The screenshot test (the principle of principles)

If you can only remember one rule from this doc, remember this: **every visible region must convey one complete idea, traceable back to the system via the corner glyph.** Everything else flows from that.
