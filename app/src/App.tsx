/*
 * App — a tiny hash router. No dependency: the gallery is #/, a card is
 * #/cards/{slug}. Hash routing keeps the build a plain static SPA, so Vercel
 * serves it with zero rewrite config.
 */
import { useEffect, useState } from "react";
import { Gallery } from "./Gallery";
import { findCard } from "./cards/registry";
import { IconButton, ChevronLeft } from "./ui";

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
  if (cardMatch) {
    const entry = findCard(cardMatch[1]);
    if (entry) {
      const Card = entry.component;
      return (
        <>
          <a className="card-back" href="#/" aria-label="Back to gallery">
            <IconButton label="Back to gallery">
              <ChevronLeft />
            </IconButton>
          </a>
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
