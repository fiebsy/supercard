# INDEX — Supercard V3

| key | value |
|---|---|
| id | INDEX-supercard-v3 |
| type | index |
| era | atlas |
| version | 3.6.0 |
| owner | derick |
| updated | 2026-06-25 |

The canonical entry point. If you're a new Claude session reading this, start here.

---

## What is a Supercard

A Supercard is a screenshot-shareable, single-emphasis-per-block knowledge artifact built as a cognitive prosthesis for ADHD readers. Every visible region must be self-sufficient: a stranger seeing only a cropped screenshot should still get one complete idea, traceable back to the system via the corner glyph. The format is a grammar, not a length — identity holds from a 5-block summary to a 25-block synthesis because the type scale, gray ramp, 16pt grid, and header/footer pattern stay pixel-identical.

## How Claude should use this system

**The fast path:** for a topic-to-card build, run the dynamic assembly pipeline in `10-GOVERNANCE/PIPELINE-card-assembly.md` (or invoke the `supercard` skill). It handles research → breakdown → card with mode-driven adaptation. The canonical layer sequence below mirrors the agent-guide `task_routing` and the pipeline's Stage 0–5.

**To build a new Supercard on topic X (canonical layer sequence):**

1. **`PIPELINE-card-assembly`** — the operational manual: Stage 0–5 with what-to-do, what-to-produce, what-to-check per stage.
2. **`GRAMMAR-block-composition`** — the block selection procedure (decision tree + precedence + density budget).
3. **`LENGTHS-mini-standard-xl`** — which length variant the mode admits.
4. **`INDEX-block-library`** — survey the 39 blocks across 7 families with `rules_by_version`.
5. **`RENDERING-spec`** — the output contract (tokens, type scale, frozen-at-version).

Use **`PRINCIPLES-supercard-v3`** to judge identity (it's the audit reference; not part of the build sequence). Use **`GLOSSARY-supercard`** to disambiguate terms. Use **`EXAMPLE-mini-supercard`** for a worked end-to-end build.

For each block you'll use, read its individual `BLOCK-*` spec in `20-BLOCKS/`. Search `30-CARDS/` and `90-ARCHIVE/` for related prior cards. Read the most-recent 5 entries of `STEWARDS-LOG-2026` for current direction. Compose using only Core/Stable blocks (Experimental requires an explicit ask). Save to `30-CARDS/` as `CARD-{YYYY}-{slug}--draft` with a Metadata table at the top, including the `research_report` it descends from. Render the HTML and publish to `docs/cards/` + the `docs/index.html` gallery, then push — the card is viewable online (ADR-0007).

The breakdown — the deep-research report — is the first durable artifact: it lives in `60-RESEARCH/` and is registered in `INDEX-research-reports.md`. Check that registry before researching, so a topic is never researched twice (ADR-0006).

**To migrate a V2 card to V3:**

1. Read the V2 source from `90-ARCHIVE/2025-V2/`
2. Read `PRINCIPLES`, `GRAMMAR`, and any "Accepted" ADRs whose tags overlap
3. Map V2 patterns that violate V3 (multi-emphasis blocks, non-self-sufficient regions) to V3 blocks
4. Produce new V3 card in `30-CARDS/` with frontmatter `supersedes: <V2-id>`

**To audit cards for drift:**

1. List recently-changed cards: `git log --since='<N days ago>' --name-only -- 30-CARDS/`
2. Grade each against PRINCIPLES + last 10 stewards' log entries
3. Save report as `AUDIT-{date}--draft` in `40-LAB/`

**To propose a new block:**

1. Create RFC in `40-LAB/` named `RFC-{NNNN}-{slug}--proposed` from `TEMPLATE-rfc`
2. Draft a corresponding ADR-stub in `10-GOVERNANCE/ADR/` with status `Proposed`

## Folder map

- **`00-INDEX/`** — this doc + block library index
- **`10-GOVERNANCE/`** — principles, grammar, lengths, rendering, pipeline, glossary, worked example, changelog, stewards' log, ADRs
- **`20-BLOCKS/`** — 39 individual block specs (one doc each)
- **`30-CARDS/`** — active V3 Supercards
- **`40-LAB/`** — experiments + RFC proposals + audit reports
- **`50-TEMPLATES/`** — golden templates for new artifacts
- **`60-RESEARCH/`** — the deep-research-report store: breakdowns + `INDEX-research-reports` registry (ADR-0006)
- **`90-ARCHIVE/`** — frozen V1/V2 era + retired V3 minor versions
- **`docs/`** — published renders: the gallery + one HTML per card, viewable online (ADR-0007)

## Naming grammar (non-negotiable)

`{TYPE}-{slug-or-id}--{status}`

- TYPE ALL CAPS: `ADR`, `BLOCK`, `CARD`, `RFC`, `LAB`, `INDEX`, `TEMPLATE`, `GOV`, `AUDIT`
- Slug kebab-case lowercase
- `--` (double dash) separates status: `--draft`, `--published`, `--accepted`, `--proposed`, `--archived`, `--exploring`

## Search recipes Claude should use

```
# All Core blocks
ls 20-BLOCKS/BLOCK-*--core.md

# Recent governance changes
git log --since='2026-04-01' --name-only -- 10-GOVERNANCE/

# Accepted ADRs
grep -rl 'status | Accepted' 10-GOVERNANCE/ADR/

# Related prior cards by topic
grep -rli '<topic-keyword>' 30-CARDS/ 90-ARCHIVE/

# Published cards only
ls 30-CARDS/CARD-*--published.md

# Has this topic already been researched? (check before any new research)
grep -i '<topic-keyword>' 60-RESEARCH/INDEX-research-reports.md

# Published renders
ls docs/cards/
```

## ADR ledger

(Updated by SupercardOps. Manually mirror new ADRs here for at-a-glance lookup.)

| # | Title | Status | Date |
|---|---|---|---|
| 0001 | Adopt named eras with SemVer (V3 = Atlas) | Accepted | 2026-04-29 |
| 0002 | Four-tier lifecycle: Core / Stable / Experimental / Deprecated | Accepted | 2026-04-29 |
| 0003 | Content frozen at authored version | Accepted | 2026-04-29 |
| 0004 | Git repository as the canonical home | Proposed | 2026-05-14 |
| 0005 | Mode-driven card assembly pipeline | Proposed | 2026-05-14 |
| 0006 | Dedicated research-report store (`60-RESEARCH/`) | Accepted | 2026-05-14 |
| 0007 | Render and publish by default | Accepted | 2026-05-14 |
| 0008 | Spec organized for agent legibility (3.2.0) | Accepted | 2026-05-16 |
| 0009 | V3.5 reading-layer refinement (R-19/R-20/R-21) | Accepted | 2026-06-25 |
| 0010 | Deterministic renderer (`render-card.mjs`) | Accepted | 2026-06-25 |
| 0011 | V3.6 surface refinement (R-22/R-23/R-24, retroactive) | Accepted | 2026-06-25 |

## Change-log pointer

The full version history lives in `10-GOVERNANCE/CHANGELOG-supercard.md`. Most recent entry:

**v3.6.0** — Surface refinement. Added R-22 (flat surfaces — shadows retired system-wide; the `--shadow-*` tokens are deleted and an anchor card is bounded by border + radius + padding), R-23 (heavier hairline — borders step from `--g-06` to `--g-12`, anchor cards to 1px), R-24 (no em dash in reader-visible card content; asterism rest retired — supersedes R-11/G-10). Amended Principle 4 ("bounded," not "lofted") and R-13. **Not backwards-compatible by design:** unlike every prior version, R-22/R-23/R-24's visual rules apply to every card on re-render regardless of `frozen_at_version` (the CSS lives at base level), and em dashes are stripped from all existing sources — the deliberate exception to the frozen-at-version guarantee (ADR-0011). The reading-layer rules (R-9/R-19, R-20, R-21) remain frozen and untouched. (ADR-0011.)

**v3.5.0** — Reading-layer refinement. Added R-19 (body type metrics — retires R-9's positive tracking, body to 17/26 −0.01em / word-spacing normal), R-20 (text-ink ladder — `--ink` #1A1A1A / `--ink-2` #595959 / `--ink-3` #767676, all clearing WCAG 4.5:1; `#888`/`#BBB`/`--g-30` demoted to non-text), R-21 (three-size reading core — header 40 / subhead 26 / body 17, weight + ink + space do the rest). Amended R-15 (V3.5 default beat gap 48→64pt), R-13 (dek at body-size + secondary ink), and superseded R-9 / folded R-18's display tightening in as the default (dropping the sub-1.5 line-height variant). Backwards-compatible: every V3.0–V3.4 card renders identically. New constraints apply to `frozen_at_version: 3.5.0` and later only. (ADR-0009.)

**v3.4.0** — Apple-calibrated readability cut. Added P13 (plain language as substance), P14 (connective flow without scaffold), G-12 (paragraph mobile cap), G-13 (readability target), G-14 (connective-flow vocabulary), R-15 (section spacing scale), R-16 (surface-tinted card affordance), R-17 (screenshot-autonomy enforcement), R-18 (Apple register opt-in for body). Added `--s-9: 120pt` spacing token, `--surface-tint: rgba(0,0,0,0.025)` color token, and a 28/32 Tile type-ramp step. Backwards-compatible: every v3.3 card renders identically under v3.4. New constraints apply to `frozen_at_version: 3.4.0` and later only.

## Versioning at a glance

- **Era** (named): `Atlas` is V3.x. Era changes require a generational bump (V3 → V4)
- **MINOR** bumps: new Stable block promoted, length variant added to existing block
- **PATCH** bumps: spec text clarifications, typo fixes
- **Pre-release**: experimental work tagged `V3.next-alpha.N`
- **Frozen-at-authored**: a card written under V3.0 stays valid forever; reading-layer versions (V3.5) don't retroactively reformat it. **Exception — V3.6 (ADR-0011):** the surface rules (no shadow, heavier hairline, no asterism, no em dash) are applied retroactively to every card on re-render, by the steward's call

## Quick links

- Pipeline → `10-GOVERNANCE/PIPELINE-card-assembly` (operational manual)
- Grammar → `10-GOVERNANCE/GRAMMAR-block-composition` (block selection procedure)
- Lengths → `10-GOVERNANCE/LENGTHS-mini-standard-xl`
- Rendering → `10-GOVERNANCE/RENDERING-spec`
- Principles → `10-GOVERNANCE/PRINCIPLES-supercard-v3` (identity audit reference)
- Glossary → `10-GOVERNANCE/GLOSSARY-supercard`
- Worked example → `10-GOVERNANCE/EXAMPLE-mini-supercard`
- Changelog → `10-GOVERNANCE/CHANGELOG-supercard`
- Stewards' log → `10-GOVERNANCE/STEWARDS-LOG-2026`
- Block library → `00-INDEX/INDEX-block-library`
- ADRs → `10-GOVERNANCE/ADR/`
- Templates → `50-TEMPLATES/`
- Research reports → `60-RESEARCH/` (registry: `INDEX-research-reports`)
- Published renders → `docs/` (gallery: `docs/index.html`)
- Public machine-readable spec → **https://berafoot.com/spec/index.json** (source: `docs/spec/`)

## Public spec endpoint

The canonical entry point for any LLM or agent — **https://berafoot.com/spec/index.json**. For anything Supercard-related, this URL is the single source of truth; the drop-in instruction prompt for agents is at `docs/spec/PROMPT.md` (also served at `/spec/PROMPT.md`).

For an agent working from a URL with no checkout, the canonical docs above are also published as a progressive-disclosure JSON tree at `docs/spec/`. Fetch `spec/index.json` (the manifest), then drill into only the layers a task needs — `agent-guide`, `tokens`, `principles`, `grammar`, `lengths`, `blocks`, `pipeline`, `rendering`. The JSON is a *generated view* of the markdown in `10-GOVERNANCE/` and `00-INDEX/` (the markdown stays the source of truth, ADR-0003); `app/scripts/build-spec.mjs` regenerates it and the `spec-drift` GitHub Action fails CI if the two ever diverge.

It is served publicly through the **Vercel deployment**, which publishes a private repo to a public URL — the repo itself stays private. The Vercel build copies `docs/` into the deployment and `vercel.json` rewrites `/spec/*` to it. The manifest's layer links are relative, so it works from whatever domain serves it.
