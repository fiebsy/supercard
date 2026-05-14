/*
 * Card registry — the React render path's equivalent of the docs/index.html
 * gallery. Add a row here when a new card gets a React component. Newest first.
 */
import type { ComponentType } from "react";
import { GestaltPrinciples } from "./gestalt-principles";

export type CardEntry = {
  slug: string;
  id: string;
  title: string;
  length: string;
  mode: string;
  desc: string;
  component: ComponentType;
  /** path to the standalone HTML twin, served at /html/... on the deploy */
  htmlRender: string;
};

export const cards: CardEntry[] = [
  {
    slug: "gestalt-principles",
    id: "CARD-2026-05-14-gestalt-principles",
    title: "Gestalt Principles",
    length: "xl",
    mode: "deep-dive",
    desc: "Your visual system groups, splits, and completes a scene into objects before you're aware of looking — the Gestalt principles are the catalogue of rules it uses.",
    component: GestaltPrinciples,
    htmlRender: "html/cards/CARD-2026-05-14-gestalt-principles.html",
  },
];

export function findCard(slug: string): CardEntry | undefined {
  return cards.find((c) => c.slug === slug);
}
