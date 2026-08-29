# ADR-0018 — V3.10.1: the interaction layer — press, hover, hit area, scroll

| key | value |
|---|---|
| id | ADR-0018 |
| type | adr |
| status | Accepted |
| date | 2026-08-29 |
| owner | derick |

## Status

**Accepted** — 2026-08-29. Ships as spec version `3.10.1`, a patch. No card's
pixels change and no card's `frozen_at_version` moves.

## Context

V3.10 audited the layer under the picture and found that the system's worst
defects were failures to keep its own promises (ADR-0017). It read the HTML.
It did not press anything.

The report that opened this cut was one sentence from a reader on a phone:
*the buttons don't work and there are weird shadows on press.* Both halves were
true, and neither was visible in a screenshot or in the markup. They lived in
the interaction layer — the one part of the site that only exists while a
finger is on the glass.

### What was actually wrong

1. **The grey shadow was the user agent's.** Mobile Safari and Chrome paint a
   translucent rectangle over a pressed link. Nothing in the stylesheet ever
   turned it off, so the one surface in a strict-grayscale, shadow-free system
   (R-22) that still dropped a shadow was the browser's, on every tap, sized
   to the whole 232pt sample card.

2. **The press feedback shipped without its motion.** V3.10 added
   `scale: 0.96` on press and declared the transition for it once, near the
   top of the sheet. Seven controls further down then restated `transition:`
   for their own colour changes. The shorthand *replaces* `transition-property`,
   so each of those rules silently dropped `scale` from the list. Measured on
   the built site, not one control on the lander had `scale` in its computed
   `transition-property`. The state was real; the animation had never once
   run. This is R-39's lesson in a different layer — a rule that exists in one
   place and is contradicted in another is a rule that does not ship.

3. **Hover stuck to whatever you last tapped.** A touch browser synthesises
   `:hover` on tap and leaves it applied, so the card you just came back from
   stayed lit as though the pointer were still on it.

4. **The back bar was the link.** `.card-back` was an `<a>` with
   `display: block` across the full 393pt column. The whole top band of every
   published card navigated away — a tap near the title, or a mis-aimed scroll
   gesture, left the page. The one control that looked tappable, the 32pt
   circle, was a fraction of the target that actually was.

5. **A route change kept the old scroll offset.** A hash change does not reset
   scroll and nothing did it by hand. Opening a card from the bottom of the
   expanded archive left the reader ~770pt down a twenty-thousand-pixel card,
   below the cover, with the back button off-screen above them. That is the
   literal shape of "the buttons don't work": the button was real, and it was
   not on the screen.

6. **The copy button reported a copy it had not made.** The spec field's
   fallback branch — taken when the async Clipboard API is absent or refuses,
   which is any insecure origin and several in-app webviews — set the check
   glyph and the `aria-live` region without copying anything.

## Decision

Add **R-44 (Touch is the primary input)** to RENDERING-spec as a base-level
defect repair, not a `.canvas.v3-10` scope: a press that does not animate is a
defect at every frozen version, on the ADR-0011 precedent, and the interaction
layer is chrome around the card rather than part of it.

The rule has one shape: **the canvas draws its own feedback, and it draws it
the same way everywhere.** The UA's tap rectangle is off; the press is
`scale: 0.96` in at `--press-in` and out at `--press-out`; the transition is
declared once for every control and never redeclared below; hover is gated on
`(hover: hover) and (pointer: fine)`; a link is the size of its button, with a
44pt touch target around a 32 or 36pt drawn circle; and a route change lands
the reader somewhere deliberate — a card at its cover, the gallery at the row
they left from.

`<body ontouchstart="">` accompanies it in all three page kinds. It is an
empty attribute rather than script, and its presence is the documented
condition for Mobile Safari delivering `:active` to the control under the
finger — which, with the UA rectangle gone, is the whole of the press
feedback.

## Consequences

- `app/src/supercard.css` owns one interaction group. Seven per-control
  `transition:` shorthands and nine loose `:hover` rules were folded into it,
  so there is exactly one place a control's motion is set.
- The renderer emits `<div class="card-back"><a class="card-back-link">…` in
  place of the full-width anchor. `RENDERER_VERSION` moves to `v3.10` and all
  eight published cards were re-rendered from their frozen sources. The
  canvas below the bar is byte-identical; the bar keeps its 56pt height and
  the circle its position on the 16pt margin.
- `docs/index.html` carries the same interaction block, hand-mirrored the way
  it already mirrors the ramp and the R-39 role tokens.
- The React lander keeps the reader's place across a route change, which means
  the archive's open/closed state has to survive the unmount too — a restored
  offset on a re-collapsed page would be worse than no restoration at all. Both
  live at module scope.
- The copy fallback runs `document.execCommand("copy")` against an off-screen
  field and reports what it returns. A control that lies about what it did is
  worse than one that visibly fails.
- Nothing about card grammar, tokens, blocks or beats moves. This is a patch.

## Alternatives considered

- **Re-declare `scale` in each control's own `transition:`.** Restores the
  animation and leaves the trap armed: the next control added below the group
  drops it again. The defect was the duplication, not the values.
- **Drive the press from pointer events in React.** Works on the lander,
  reaches none of the eight standalone renders, which carry no script by
  design. `:active` plus the empty attribute is the one mechanism both paths
  can share.
- **Grow the drawn circles to 44pt.** Meets the touch minimum by moving the
  layout: an 8pt-taller GitHub button pushes the whole lander down a step.
  The target grows, the drawing does not.
- **Animate the archive's height on reveal.** `interpolate-size` is not
  reliably available, and a measured-height animation is a lot of machinery
  for one control. The list rises and fades in over 0.3s instead.
