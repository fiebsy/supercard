# app/ — the React render path

This is the **second** of two Supercard render paths. It exists so a card can be
viewed as a React component on Vercel, while the first path — standalone HTML in
`../docs/` — stays usable by an agent that only has read-only guidance and no
checkout.

| | `docs/` (HTML path) | `app/` (React path) |
|---|---|---|
| Artifact | one standalone `.html` per card, all resources inlined | one `.tsx` component per card, composed from block primitives |
| Needs the codebase? | **No** — reproducible from `RENDERING-spec` alone | **Yes** — needs this Vite project |
| Hosted on | GitHub Pages (`docs/`) | Vercel (`app/dist`, via `../vercel.json`) |
| Canonical source | `30-CARDS/CARD-*.md` | `30-CARDS/CARD-*.md` |

Both paths are **views**, never sources. The markdown card in `30-CARDS/` is the
frozen-at-version source of truth (ADR-0003); re-derive both renders from it,
never hand-edit either.

## Layout

```
app/
  index.html              Vite entry
  vite.config.ts          builds to app/dist
  scripts/copy-renders.mjs  post-build: copies ../docs into dist/html
  src/
    main.tsx              mounts <App/>
    App.tsx               tiny hash router (#/ , #/cards/{slug})
    Gallery.tsx           landing view — mirrors docs/index.html
    blocks.tsx            one component per INDEX-block-library block type
    supercard.css         render tokens — ported verbatim from RENDERING-spec
    cards/
      registry.tsx        card metadata + component map
      gestalt-principles.tsx   CARD-2026-05-14-gestalt-principles, composed from blocks
```

## Local dev

```
cd app
npm install
npm run dev      # gallery at the printed localhost URL
npm run build    # → app/dist  (also copies ../docs into dist/html)
npm run preview  # serve the production build
```

## Deploy (Vercel)

`../vercel.json` points Vercel at this folder:

- install: `npm --prefix app install`
- build: `npm --prefix app run build`
- output: `app/dist`

Pushing the default branch deploys it. The build also copies the standalone HTML
renders into `dist/html/`, so a single Vercel deployment carries **both** render
paths — the React gallery at `/`, the canonical HTML twins at
`/html/cards/CARD-...html`.

## Adding a card to the React path

1. The card's markdown (`30-CARDS/`) and breakdown (`60-RESEARCH/`) already exist
   — this path renders, it does not author.
2. Write `src/cards/{slug}.tsx`, composing `blocks.tsx` primitives. Match the
   block sequence in the markdown card exactly; single emphasis per block.
3. Register it in `src/cards/registry.tsx` (newest first).
4. If a block type isn't in `blocks.tsx` yet, add it there — keyed to its
   `INDEX-block-library` id — so the next card can reuse it.
