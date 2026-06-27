/*
 * Card registry — the React render path's equivalent of the docs/index.html
 * gallery. Add a row here when a new card gets a React component. Newest first.
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
  component: ComponentType;
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
];

export function findCard(slug: string): CardEntry | undefined {
  return cards.find((c) => c.slug === slug);
}
