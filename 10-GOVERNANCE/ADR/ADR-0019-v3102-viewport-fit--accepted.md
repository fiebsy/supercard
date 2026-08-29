# ADR-0019 — V3.10.2: the viewport keeps R-34's promise — fit to the phone, measured

| key | value |
|---|---|
| id | ADR-0019 |
| type | adr |
| status | Accepted |
| date | 2026-08-29 |
| owner | derick |

## Status

**Accepted** — 2026-08-29. Ships as spec version `3.10.2`, a patch. One
`<meta>` tag changes on every page; no card's pixels, grammar or
`frozen_at_version` moves.

## Context

R-34 (V3.9) states the viewport rule in one sentence: the render declares
`<meta name="viewport" content="width=393">`, because the canvas is a fixed
393pt column and `width=393` *scales the whole canvas to the device*. That is
the rule as written, and it was correct.

What every render path actually emitted, from V3.9 through V3.10.1, was
`width=393, initial-scale=1` — and the second half defeats the first. With the
scale pinned at 1, a browser lays out 393px and shows however many of them the
glass has: an iPhone SE or 13 mini (375 CSS px) hides 18px of every card, a
typical Android (360) hides 33px, a 320 phone hides 74px. The reader can pan
to the missing edge; the card no longer fits the screen, which is the exact
thing R-34 exists to guarantee. Measured under Chromium mobile emulation:

| device width | with `initial-scale=1` | with `width=393` alone |
|---|---|---|
| 393 | fits, scale 1.000 | fits, scale 1.000 |
| 375 | **18px offscreen** | fits, scale 0.954 |
| 360 | **33px offscreen** | fits, scale 0.916 |
| 320 | **74px offscreen** | fits, scale 0.814 |

The defect is V3.10's own defect class — **a rule the spec states, the
changelog records as done, and no render path ever carried out** — found by
the same method V3.10 used, a headless browser measuring instead of a steward
reading. Four surfaces carried the tag:

1. `app/scripts/render-card.mjs` — every published card in `docs/cards/`.
2. `10-GOVERNANCE/BUILD-card-no-tools.md`, twice — the spec's lead section,
   inlined into the public `llms.txt`. **Every card a chat LLM builds from the
   published spec inherits the defect**, which is why "recent cards" clip on
   phones: the spec itself was teaching the broken tag.
3. `app/index.html` — the React lander.
4. `docs/index.html` — the gallery. The V3.10 R-43 commit moved the site pages
   from `device-width` (overflow + horizontal scrollbar) to
   `width=393, initial-scale=1`, trading a scrollbar for a clip and verifying
   only that the *layout* viewport was 393 — the visual viewport was never
   measured.

## Decision

Emit `<meta name="viewport" content="width=393">` — nothing else — on every
page kind: standalone card renders, the no-tools build examples in the spec,
the lander and the gallery. Amend R-34's viewport bullet to state the negative
half explicitly: **never pin `initial-scale`**. No new rule number: this is
R-34, kept.

With `width` given and no pinned scale, the browser computes the initial scale
as device-width ÷ 393 — the whole canvas scales down uniformly, like a poster
fit to the glass. This is the only behavior compatible with the canvas
identity: the 393pt column is the design space (the Overridden table already
rules that there are no breakpoints to derive), so a narrow phone gets the
same card smaller, never a reflowed one. User zoom stays available; nothing
sets `user-scalable=no` or `maximum-scale`.

## Consequences

- All eight published cards re-rendered from their frozen sources; the only
  byte that changes in each is the viewport `<meta>`. Renders verified under
  emulation at 393 / 375 / 360 / 320: visual viewport ≥ canvas at every width.
  (At 320 Chromium rounds the layout viewport to 394px — one sub-pixel of
  pan, no element outside the column; recorded here so nobody chases it.)
- `llms.txt` regenerated; the spec now teaches the fit-to-width tag, so cards
  built from a paste stop inheriting the clip.
- On phones *wider* than 393 CSS px the initial scale computes above 1 (e.g.
  430 ÷ 393 ≈ 1.09): the canvas fills the glass edge to edge, slightly
  magnified, instead of sitting at 393px with gutters. Accepted — it is the
  same fit-to-width contract in the other direction, and type gets larger,
  never smaller.
- The gallery's 44pt touch targets (R-40) render at ~40px effective on a
  360px Android (44 × 0.916). Accepted: the alternative, a fluid site layout,
  reflows a canvas whose fixed width is the format. Revisit only if the site
  pages ever stop sharing the card's canvas.

## Alternatives considered

- **Keep `initial-scale=1` and make the column fluid** (`width: min(393px,
  100vw)` + `device-width`). Reflows the canvas: the measured beat rhythm,
  chart lanes and table shares are all tuned to 393. The canvas is the thing
  being screenshotted; it scales, it does not reflow.
- **`initial-scale` computed per device.** No such thing statically; that is
  precisely what omitting it asks the browser to do.
- **Treat the site pages differently from the cards** (`device-width` +
  responsive CSS for lander and gallery, per the skills' own layout rules).
  Right in principle for "ordinary web UI," but both site pages are built on
  the same fixed 393px canvas as the cards; a responsive rebuild is real
  scope, not a patch, and would still have to solve the card previews. If it
  ever happens it is its own ADR.
