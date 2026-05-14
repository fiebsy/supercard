# 30-CARDS

Active V3 Supercards. One file per card, named `CARD-{YYYY-MM-DD}-{slug}--{status}.md`
(status: `--draft` or `--published`).

Author from one of:

- [`50-TEMPLATES/TEMPLATE-supercard-standard.md`](../50-TEMPLATES/TEMPLATE-supercard-standard.md) — the default
- [`50-TEMPLATES/TEMPLATE-supercard-mini.md`](../50-TEMPLATES/TEMPLATE-supercard-mini.md)
- [`50-TEMPLATES/TEMPLATE-supercard-xl.md`](../50-TEMPLATES/TEMPLATE-supercard-xl.md)

Every card opens with a Metadata key/value table and declares
`frozen_at_version`. It also names the `research_report` in `60-RESEARCH/` it
was derived from — the card is a constrained *view* of that report (ADR-0005,
ADR-0006). Read `INDEX → PRINCIPLES → GRAMMAR` before authoring.

Every card is rendered and published to `docs/cards/` (ADR-0007) — the markdown
here is the canonical source; the HTML render is the view you open online.

## Sample

[`CARD-2026-05-14-spaced-repetition--draft.md`](CARD-2026-05-14-spaced-repetition--draft.md)
is a fully-authored Standard card — the single go-to reference for what a
finished Supercard source looks like. Each beat names the block type it uses and
carries exactly one emphasized phrase. Its deep-research report is
[`60-RESEARCH/BREAKDOWN-spaced-repetition.md`](../60-RESEARCH/BREAKDOWN-spaced-repetition.md);
its render is `docs/cards/CARD-2026-05-14-spaced-repetition.html`.
