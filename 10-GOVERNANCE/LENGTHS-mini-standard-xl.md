# LENGTHS — Mini / Standard / XL

| key | value |
|---|---|
| id | LENGTHS-mini-standard-xl |
| type | governance |
| era | atlas |
| version | 3.3.0 |
| owner | derick |
| updated | 2026-05-16 |

Length is a **prop**, not a fork. Same content model, same grammar, same identity — only emphasis, density, and depth vary.

---

## The three variants

| Variant | Density | Purpose | Total blocks |
|---|---|---|---|
| **Mini** | High | Glanceable; index-card scale; lists, sidebars, dense grids | 5–8 |
| **Standard** | Comfortable | Canonical reading unit | 10–14 |
| **XL** | Spacious | Deep-dive long-form synthesis | 18–25 |

Standard is canonical. Mini and XL are derived views — when they conflict with Standard, Standard wins.

## Beat coverage

| Beat | Mini | Standard | XL |
|---|:-:|:-:|:-:|
| 1. Hook | ✓ | ✓ | ✓ |
| 2. Evidence | ✓ | ✓ | ✓ (multi-block) |
| 3. Mechanism | ✓ | ✓ | ✓ (multi-block) |
| 4. Comparison | — | ✓ | ✓ |
| 5. Counter | — | ✓ | ✓ |
| 6. Application | ✓ | ✓ | ✓ |
| 7. Close | ✓ | ✓ | ✓ |

Mini collapses to the essential five beats. XL fills every beat and runs multi-block beats with internal rhythm.

## Block compatibility per length

Each block declares which lengths it supports via its `length_variants` field. Rules:

1. **Same content model, different presentation.** A Mini and an XL authored from the same source must contain the same canonical fields; only emphasis and depth differ.
2. **Blocks declare length compatibility** in their spec frontmatter (`length_variants: mini, standard, xl`). This is the contract.
3. **No block may exist in only one length** without explicit ADR justification. Prevents "XL-only" blocks from becoming a parallel system.
4. **Standard is the reference rendering.** When in doubt, render Standard.

## When to choose which

**Mini** when:

- Topic has a single load-bearing claim with minimal supporting structure
- The card serves a glance use case (mobile, sidebar, dense grid, list-of-cards)
- 5 beats is enough to do the topic justice

**Standard** when:

- The default. Pick this unless you have a reason not to.
- Topic warrants the full 7-beat narrative
- Card will be read in isolation, mobile-first

**XL** when:

- Topic genuinely needs depth across all beats
- Multiple parallel claims need separate evidence + mechanism + comparison
- The card is a reference doc users will return to

If you're between Standard and XL, choose Standard and split into multi-part if needed. A two-part Standard reads better than a stretched XL.

## Hero scaling across lengths

| Variant | Hero treatment |
|---|---|
| Mini | Compact card-in-hero, single visual or short stat |
| Standard | Full Postcard-as-header, 4:5 aspect, hero card with metric or diagram |
| XL | Same as Standard, may use 1:1 or 5:4 if topic demands extra visual presence |

Hero is always one of the 1–3 elevated elements. Standard and XL allow up to 2 additional elevated elements; Mini allows 0–1 additional.

## Anti-pattern: stretching a Mini into a Standard

Don't pad. If a topic only fills 6 blocks naturally, ship it as a Mini. Padding sections to hit Standard length triggers the redundancy filter and kills scannability. The Mini variant exists exactly so you don't have to choose between "ship a thin Standard" and "don't ship at all."

## Anti-pattern: compressing an XL into a Standard

Don't compress. If a topic genuinely needs 22 blocks, give it 22 blocks. Compressing to fit Standard length destroys the beat structure and produces a card that's neither scannable (too dense for Standard) nor deep (too thin for XL).

## L-5. Per-length anchor budgets (V3.1+)

V3.1+ cards apply per-length anchor budgets on top of the block totals above. **Anchors** are the structurally emphatic blocks defined in GRAMMAR § G-9 (stat-callout, pull-quote, key-takeaway, numbered-principle, table-with-takeaway-row). Anchor counts EXCLUDE the title, dek, beat dividers, and the optional editorial eyebrow (R-10 V3.3).

| Variant | Total blocks | Min anchors | Max anchors | Asterism rests |
|---|---|---|---|---|
| Mini | 5–8 | 2 | 3 | — (retired) |
| Standard | 10–14 | 3 | 5 | — (retired) |
| XL | 18–25 | 5 | 8 | — (retired) |

Rules:

1. **The asterism rest is retired (V3.6 — R-24).** The "Asterism rests" column above is kept for genealogy but is now always none. At XL length, a long beat breaks to an anchor or splits into multiple beats (G-9); the 64pt beat gap (R-15) carries the rest-the-eye load that mid-beat asterisms used to.
2. Anchor counts that fall outside the band trigger a re-mix, not a length change — pad with content blocks or trim anchors before changing variant.

## L-6. Beat anchor weighting (V3.1+)

The 7 beats don't all carry the same anchor density. V3.1+ cards apply the following weighting:

| Beat | Anchor requirement |
|---|---|
| 1. Hook | Anchor in the first block (the hero counts) |
| 2. Evidence | Lead with a stat-callout or numbered-principle |
| 3. Mechanism | Prose is permitted; the anchor MAY sit at the end of the beat |
| 4. Comparison | Comparison-block or table-with-takeaway-row counts as the beat anchor |
| 5. Counter | At least one pull-quote OR key-takeaway stating the steel-manned view |
| 6. Application | End with a numbered-principle or application-checklist |
| 7. Close | Anchor in the final block — key-takeaway is canonical |

Mapping reflects ADHD reading behaviour: readers enter on the Hook, may bail anywhere, and re-enter at high-visual-contrast points. Anchors at beat openings (Evidence) and closings (Application, Close) give them re-entry landings.
