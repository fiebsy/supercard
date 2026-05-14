# docs/ — the published Supercard site

This folder is the repo's pages site: where rendered Supercards are **published
so they can be viewed online** (ADR-0004, ADR-0007). When a card request says
"push it so I can view it," this is where it goes.

## Structure

| path | what it is |
|---|---|
| `index.html` | The **gallery** — lists every published card render, links to each. Newest at top. |
| `cards/CARD-{YYYY-MM-DD}-{slug}.html` | One **standalone render** per card, per `RENDERING-spec`. |

## How a card gets here

The pipeline's render-and-publish stage (mandatory — ADR-0007) does this on
every card request:

1. Render the card from `30-CARDS/CARD-...--draft.md` to
   `docs/cards/CARD-{YYYY-MM-DD}-{slug}.html` — standalone, all resources
   inlined, 393pt mobile canvas, corner glyph on every section.
2. The render carries `<meta>` provenance: `sc:source_file`,
   `sc:research_report`, `sc:renderer_version`, `sc:frozen_at_version`,
   `sc:rendered_at` — so the genealogy chain
   *research → breakdown → card → render* is readable from the artifact itself.
3. Add an `<a class="card-link">` entry to `index.html` (newest at top).
4. Commit and push. The gallery and the card are then live URLs — that is the
   "view it online" step.

## Rules

- **Renders are views, never sources.** Never hand-edit a file in `cards/`.
  Re-render from the markdown card (the canonical, frozen-at-version source —
  ADR-0003) instead.
- **The gallery is hand-maintained.** Updating `index.html` when a card is
  added is a named, non-optional pipeline action — the same discipline as the
  research registry (ADR-0006).
- **Multi-part `deep-dive` cards** each get their own `cards/...-part-N.html`
  and their own gallery entry; group them visually under one heading.

## Serving

`docs/` is the conventional GitHub Pages source folder. Pushing to the default
branch with Pages pointed at `docs/` makes every card a live URL of the form
`{pages-host}/cards/CARD-{date}-{slug}.html`.
