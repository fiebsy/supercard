/*
 * App — a tiny hash router. No dependency: the gallery is #/, a card is
 * #/cards/{slug}. Hash routing keeps the build a plain static SPA, so Vercel
 * serves it with zero rewrite config.
 */
import { useEffect, useRef, useState } from "react";
import { Gallery } from "./Gallery";
import { findCard } from "./cards/registry";
import { ChevronLeft } from "./ui";

function useHashRoute() {
  const [hash, setHash] = useState(
    () => window.location.hash.replace(/^#/, "") || "/",
  );
  useEffect(() => {
    const onChange = () =>
      setHash(window.location.hash.replace(/^#/, "") || "/");
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return hash;
}

export function App() {
  const route = useHashRoute();
  const cardMatch = route.match(/^\/cards\/([\w-]+)$/);
  const entry = cardMatch ? findCard(cardMatch[1]) : undefined;
  const top = useRef<HTMLDivElement>(null);

  // A hash change swaps the whole view with no page load, so nothing resets
  // the document title or the reading position on its own: a screen reader
  // stayed where it was in the gallery while a different card rendered under
  // it. Name the page and move focus to the top of the new view.
  useEffect(() => {
    document.title = entry
      ? `${entry.title} · Supercard`
      : "Supercard · one URL, the whole spec";
    top.current?.focus();
  }, [route, entry]);

  if (entry?.component) {
    const Card = entry.component;
    return (
      <>
        {/* The focus target for a route change. -1 keeps it out of the tab
            order; it exists only to receive focus programmatically. */}
        <div ref={top} tabIndex={-1} />
        <a className="card-back" href="#/" aria-label="Back to gallery">
          <span className="back-btn">
            <ChevronLeft />
          </span>
        </a>
        <Card />
        {/* In the column, not at the viewport edge: these were siblings of the
            card with no wrapper, so on any window wider than 393px they sat at
            x=0 while everything else was centred. */}
        <nav className="card-foot" aria-label="Card navigation">
          <a className="back-link" href="#/">
            ← gallery
          </a>
          <a className="back-link" href={entry.htmlRender}>
            standalone html ↗
          </a>
        </nav>
      </>
    );
  }

  return (
    <>
      <div ref={top} tabIndex={-1} />
      <Gallery />
    </>
  );
}
