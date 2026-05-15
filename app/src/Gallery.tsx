/*
 * Gallery — the React app's landing view. Mirrors docs/index.html, but each
 * card links to its React render (#/cards/{slug}). The standalone HTML twin is
 * still one click away via the mono link, so both render paths stay reachable
 * from one deployment.
 */
import { cards } from "./cards/registry";
import { Glyph } from "./blocks";

export function Gallery() {
  return (
    <div className="canvas" style={{ paddingTop: "var(--s-6)" }}>
      <div className="eyebrow">Supercard · v3.0 Atlas · React</div>
      <h1>Gallery</h1>
      <p className="gallery-lede">
        Every Supercard with a React render. Each links to its component view;
        the mono link opens the standalone HTML twin — same card, same pixels,
        two render paths.
      </p>

      <div className="section-label">Spec</div>

      <a className="spec-link" href="/spec/index.json">
        <div className="spec-link-title">Manifest — /spec/index.json</div>
        <div className="card-desc">
          Progressive-disclosure JSON tree. Fetch the manifest first; it
          carries the absolute URL of every layer plus a Vercel-app
          fallback URL for each.
        </div>
        <div className="spec-link-url" style={{ marginTop: "8px" }}>
          berafoot.com/spec/index.json
        </div>
      </a>

      <a
        className="spec-link"
        href="https://supercard-seven.vercel.app/spec/index.json"
      >
        <div className="spec-link-title">Vercel-app fallback</div>
        <div className="card-desc">
          Same deployment, alternate host. Use this if the apex domain
          isn't reachable from your environment.
        </div>
        <div className="spec-link-url" style={{ marginTop: "8px" }}>
          supercard-seven.vercel.app/spec/index.json
        </div>
      </a>

      <a className="spec-link" href="/spec/PROMPT.md">
        <div className="spec-link-title">Drop-in agent prompt</div>
        <div className="card-desc">
          Paste into any LLM's system prompt so it always builds Supercards
          from the live spec.
        </div>
        <div className="spec-link-url" style={{ marginTop: "8px" }}>
          berafoot.com/spec/PROMPT.md
        </div>
      </a>

      <div className="section-label">Cards</div>

      {cards.map((c) => (
        <a className="card-link" key={c.slug} href={`#/cards/${c.slug}`}>
          <div className="card-title">{c.title}</div>
          <div className="card-meta">
            {c.id} · {c.length} · {c.mode}
          </div>
          <div className="card-desc">{c.desc}</div>
        </a>
      ))}

      <Glyph />
    </div>
  );
}
