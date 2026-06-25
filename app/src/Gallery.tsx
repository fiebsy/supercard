/*
 * Gallery — the React app's landing view. Mirrors docs/index.html, but each
 * card links to its React render (#/cards/{slug}). The standalone HTML twin is
 * still one click away via the mono link, so both render paths stay reachable
 * from one deployment.
 */
import { useState } from "react";
import { cards } from "./cards/registry";
import { Glyph } from "./blocks";

const SPEC_URL = "https://berafoot.com/llms.txt";

function SpecBlock() {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    const done = () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    };
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(SPEC_URL).then(done, done);
    } else {
      done();
    }
  };
  return (
    <div className="spec-link" style={{ cursor: "default" }}>
      <div className="spec-link-title">One URL. The whole spec.</div>
      <div className="card-desc" style={{ marginTop: "4px", marginBottom: "16px" }}>
        Everything an agent needs to build, render, or judge a Supercard —
        principles, grammar, blocks, pipeline, tokens — lives in one
        self-contained <code>llms.txt</code> file. Point any LLM at it;
        there's nothing else to fetch.
      </div>
      <div style={{ display: "flex", alignItems: "stretch", gap: "8px" }}>
        <span
          className="spec-link-url"
          style={{
            flex: "1 1 auto",
            minWidth: 0,
            display: "flex",
            alignItems: "center",
            color: "var(--ink)",
            background: "rgba(0,0,0,0.025)",
            border: "1px solid var(--g-12)",
            borderRadius: "10px",
            padding: "0 12px",
            fontSize: "13px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {SPEC_URL}
        </span>
        <button
          type="button"
          onClick={copy}
          aria-label="Copy the spec URL"
          style={{
            flex: "0 0 auto",
            fontFamily: "var(--rounded)",
            fontSize: "13px",
            fontWeight: 600,
            color: "var(--w)",
            background: copied ? "var(--ink-2)" : "var(--k)",
            border: 0,
            borderRadius: "10px",
            padding: "10px 16px",
            cursor: "pointer",
          }}
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
}

export function Gallery() {
  return (
    <div className="canvas" style={{ paddingTop: "var(--s-6)" }}>
      <div className="eyebrow">Supercard · v3.6 Atlas · React</div>
      <h1>Supercard</h1>
      <p className="gallery-lede">
        A screenshot-shareable, single-emphasis-per-block knowledge card — a
        cognitive prosthesis. Each card below links to its React render; the
        mono link opens the standalone HTML twin — same card, same pixels, two
        render paths.
      </p>

      <div className="section-label">The spec</div>

      <SpecBlock />

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
