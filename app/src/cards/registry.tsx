/*
 * Card registry — the React render path's equivalent of the docs/index.html
 * gallery. Newest first.
 *
 * A card with a React `component` renders in-app at #/cards/{slug}. A card
 * without one is "archive only": it still appears in the landing's older list,
 * but the sample card links straight to its standalone HTML twin (htmlRender)
 * since there's no React view to route to.
 */
import type { ComponentType } from "react";
import { GestaltPrinciples } from "./gestalt-principles";
import { V37DataAndAlignment } from "./v37-data-and-alignment";

export type CardEntry = {
  slug: string;
  id: string;
  title: string;
  length: string;
  mode: string;
  /** frozen-at version, shown as a badge on the sample card (e.g. "v3.7") */
  version?: string;
  desc: string;
  /** the card's opening prose — shown (clipped + masked) in the sample-card
   * preview on the landing. The real card start, not a summary. */
  preview: string;
  /** the React view. Omitted for archive-only cards that exist only as a
   * standalone HTML render — those open via htmlRender instead. */
  component?: ComponentType;
  /** path to the standalone HTML twin, served at /html/... on the deploy */
  htmlRender: string;
};

export const cards: CardEntry[] = [
  {
    slug: "v37-data-and-alignment",
    id: "CARD-2026-06-27-v37-data-and-alignment",
    title: "Data, Aligned",
    length: "standard",
    mode: "reference",
    version: "v3.7",
    desc: "First card frozen at 3.7.0: the cover eyebrow (R-27), grayscale bar + line charts (R-30), stat-grid + stat-callout (R-31), and the alignment fixes (R-28/R-29) — strict grayscale, one emphasis per block.",
    preview:
      "V3.7 gives every card more ways to fill the same grid: charts, numbers, and a cover that can open with an eyebrow. The chart blocks were catalogued for a year. Now they actually render, in both paths, on the same gray ramp as everything else.",
    component: V37DataAndAlignment,
    htmlRender: "html/cards/CARD-2026-06-27-v37-data-and-alignment.html",
  },
  {
    slug: "v35-reading-layer",
    id: "CARD-2026-06-25-v35-reading-layer",
    title: "The Reading Layer, Refined",
    length: "mini",
    mode: "reference",
    version: "v3.5",
    desc: "First card frozen at 3.5.0 — the reading-layer cut: R-19 body metrics, the R-20 three-step ink ladder, the R-21 three-size reading core, and 64pt beats.",
    preview:
      "The first card frozen at 3.5.0. It exercises the reading-layer cut: new body metrics, the three-step ink ladder that clears WCAG at every step, the three-size reading core, and 64pt default beats.",
    htmlRender: "html/cards/CARD-2026-06-25-v35-reading-layer.html",
  },
  {
    slug: "v34-sample",
    id: "CARD-2026-05-16-v34-sample",
    title: "Plain Language as Substance",
    length: "mini",
    mode: "reference",
    version: "v3.4",
    desc: "First card frozen at 3.4.0 — the V3.4 cut: Tile head step, 64pt beat gaps (R-15), surface-tinted stat callout (R-16), eyebrow + tagline pairs (G-14).",
    preview:
      "The first card frozen at 3.4.0. It exercises the V3.4 cut end to end: the Tile head step, 64pt beat gaps, the surface-tinted stat callout, and eyebrow + tagline pairs, all under a grade 6-9 readability target.",
    htmlRender: "html/cards/CARD-2026-05-16-v34-sample.html",
  },
  {
    slug: "gestalt-principles",
    id: "CARD-2026-05-14-gestalt-principles",
    title: "Gestalt Principles",
    length: "xl",
    mode: "deep-dive",
    version: "v3.0",
    desc: "Your visual system groups, splits, and completes a scene into objects before you're aware of looking — the Gestalt principles are the catalogue of rules it uses.",
    preview:
      "You never see raw pixels. Before you are aware of looking, your visual system has already grouped, split, and completed the scene into objects, and the Gestalt principles are the catalogue of rules it uses. Three German psychologists asked why a row of dots looks like a row and not like dots.",
    component: GestaltPrinciples,
    htmlRender: "html/cards/CARD-2026-05-14-gestalt-principles.html",
  },
  {
    slug: "musk-altman-openai-trial",
    id: "CARD-2026-05-14-musk-altman-openai-trial",
    title: "Musk v. Altman: the OpenAI Trial",
    length: "mini",
    mode: "briefing",
    version: "v3.0",
    desc: "Two men co-founded OpenAI as a nonprofit in 2015. A decade later they are in court over whether its turn to profit broke a founding promise.",
    preview:
      "Two men co-founded OpenAI as a nonprofit in 2015. A decade later they are in court: Musk says he was duped into bankrolling a charity that quietly became an ~$800B company; OpenAI says no such promise was ever made and Musk is a rival with regrets.",
    htmlRender: "html/cards/CARD-2026-05-14-musk-altman-openai-trial.html",
  },
  {
    slug: "spaced-repetition",
    id: "CARD-2026-05-14-spaced-repetition",
    title: "Spaced Repetition",
    length: "standard",
    mode: "briefing",
    version: "v3.0",
    desc: "Reviewing at widening intervals beats cramming — roughly double the long-term retention for the same total study time.",
    preview:
      "Reviewing material at widening intervals beats cramming: not by a little, by roughly double the long-term retention for the same total study time. Spaced repetition schedules each review just before you would forget.",
    htmlRender: "html/cards/CARD-2026-05-14-spaced-repetition.html",
  },
];

export function findCard(slug: string): CardEntry | undefined {
  return cards.find((c) => c.slug === slug);
}
