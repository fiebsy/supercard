/*
 * App — a tiny hash router. No dependency: the gallery is #/, a card is
 * #/cards/{slug}. Hash routing keeps the build a plain static SPA, so Vercel
 * serves it with zero rewrite config.
 */
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Gallery } from "./Gallery";
import { findCard } from "./cards/registry";
import { ChevronLeft } from "./ui";

/*
 * R-44 — where a route change leaves the reader.
 *
 * A hash change does not reset the scroll position, and nothing here did it
 * either: opening a card from the bottom of the archive dropped the reader
 * two-thirds of the way down a twenty-thousand-pixel card, with the back
 * button off-screen above them and no cover in sight. A card opens at its
 * cover. Coming back the other way, the gallery returns to the row the reader
 * left from — a "back" that lands somewhere else is the same lost-my-place
 * problem in reverse.
 *
 * Module scope, not state: the offset has to outlive the Gallery unmounting.
 */
let galleryScroll = 0;

function useHashRoute() {
  const [hash, setHash] = useState(
    () => window.location.hash.replace(/^#/, "") || "/",
  );
  const current = useRef(hash);
  useEffect(() => {
    const onChange = () => {
      // hashchange fires before the new route renders, so window.scrollY here
      // is still the outgoing page's — the one moment the gallery's offset
      // can be read, whether the reader tapped a card, swiped back, or typed
      // the hash.
      if (current.current === "/") galleryScroll = window.scrollY;
      const next = window.location.hash.replace(/^#/, "") || "/";
      current.current = next;
      setHash(next);
    };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return hash;
}

export function App() {
  const route = useHashRoute();

  // Before paint, so the reader never sees the new route at the old offset.
  // `instant`, not the CSS default: smooth-scrolling the height of a card
  // would animate past every beat on the way.
  useLayoutEffect(() => {
    window.scrollTo({ top: route === "/" ? galleryScroll : 0, behavior: "instant" });
  }, [route]);

  const cardMatch = route.match(/^\/cards\/([\w-]+)$/);
  if (cardMatch) {
    const entry = findCard(cardMatch[1]);
    if (entry && entry.component) {
      const Card = entry.component;
      return (
        <>
          {/* The bar carries the column's dotted guides; the LINK is the
              button and nothing else (R-44). The bar used to be the anchor —
              393pt wide — so a tap anywhere along the top of a card left the
              page. */}
          <div className="card-back">
            <a
              className="card-back-link"
              href="#/"
              aria-label="Back to gallery"
            >
              <span className="back-btn">
                <ChevronLeft />
              </span>
            </a>
          </div>
          <Card />
          <a className="back-link" href="#/">
            ← gallery
          </a>{" "}
          <a className="back-link" href={entry.htmlRender}>
            standalone html ↗
          </a>
        </>
      );
    }
  }

  return <Gallery />;
}
