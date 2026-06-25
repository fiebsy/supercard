/*
 * Gallery — the React app's landing view. Mirrors docs/index.html, but each
 * card links to its React render (#/cards/{slug}). The standalone HTML twin is
 * still one click away via the mono link, so both render paths stay reachable
 * from one deployment.
 */
import { useState } from "react";
import type { CSSProperties } from "react";
import { cards } from "./cards/registry";
import type { CardEntry } from "./cards/registry";
import { Glyph } from "./blocks";

const SPEC_URL = "https://berafoot.com/llms.txt";
const REPO_LABEL = "github.com/fiebsy/supercard";
const REPO_URL = "https://github.com/fiebsy/supercard";

/* The two action rows share one pill + one round icon-button shape so the
 * spec and the repo read as a matched pair — both copy-to-clipboard. */
const rowStyle: CSSProperties = {
  display: "flex",
  alignItems: "stretch",
  gap: "8px",
};
const pillStyle: CSSProperties = {
  flex: "1 1 auto",
  minWidth: 0,
  display: "flex",
  alignItems: "center",
  fontFamily: "var(--mono)",
  fontSize: "13px",
  color: "var(--ink)",
  background: "rgba(0,0,0,0.025)",
  border: "1px solid var(--g-12)",
  borderRadius: "999px",
  padding: "12px 18px",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};
const btnStyle: CSSProperties = {
  flex: "0 0 auto",
  width: "46px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "var(--k)",
  border: 0,
  borderRadius: "999px",
  color: "var(--w)",
  cursor: "pointer",
  textDecoration: "none",
};

const ICON = 17;
const svgProps = {
  width: ICON,
  height: ICON,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function CopyIcon() {
  return (
    <svg {...svgProps}>
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg {...svgProps}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
function ChevronIcon() {
  return (
    <svg {...svgProps}>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

/* One copy-to-clipboard button; swaps the copy icon for a green check for a
 * moment after a successful copy. */
function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    const done = () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    };
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(value).then(done, done);
    } else {
      done();
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? `${label} copied` : `Copy ${label}`}
      style={{ ...btnStyle, color: copied ? "#34c759" : "var(--w)" }}
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
    </button>
  );
}

function SpecBlock() {
  return (
    <div className="spec-link" style={{ cursor: "default" }}>
      <div className="spec-link-title">One URL. The whole spec.</div>
      <div className="card-desc" style={{ marginTop: "4px", marginBottom: "16px" }}>
        Everything an agent needs to build, render, or judge a Supercard lives
        in one self-contained file. Point any LLM at it; nothing else to fetch.
      </div>

      <div style={rowStyle}>
        <span style={pillStyle}>{SPEC_URL}</span>
        <CopyButton value={SPEC_URL} label="spec URL" />
      </div>

      <div style={{ ...rowStyle, marginTop: "8px" }}>
        <span style={pillStyle}>{REPO_LABEL}</span>
        <CopyButton value={REPO_URL} label="repo URL" />
      </div>
    </div>
  );
}

/* A peek at a published card: the real opening prose, clipped to a fixed
 * height with a fade mask over the cut, and a chevron bottom-right that opens
 * the full card. */
function SampleCard({ entry }: { entry: CardEntry }) {
  return (
    <a
      href={`#/cards/${entry.slug}`}
      style={{
        position: "relative",
        display: "block",
        height: "240px",
        overflow: "hidden",
        textDecoration: "none",
        color: "inherit",
        background: "var(--w)",
        border: "1px solid var(--g-12)",
        borderRadius: "18px",
        padding: "var(--s-5)",
      }}
    >
      <div className="card-title">{entry.title}</div>
      <div
        style={{
          fontFamily: "var(--mono)",
          fontSize: "11px",
          color: "var(--g-30)",
          marginBottom: "var(--s-3)",
        }}
      >
        {entry.id} · {entry.length} · {entry.mode}
      </div>
      <p>{entry.preview}</p>

      {/* fade mask over the clipped text */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: "110px",
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0), var(--w) 78%)",
          pointerEvents: "none",
        }}
      />

      {/* chevron — opens the full card */}
      <div
        style={{
          position: "absolute",
          right: "16px",
          bottom: "16px",
          width: "34px",
          height: "34px",
          borderRadius: "999px",
          background: "var(--k)",
          color: "var(--w)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ChevronIcon />
      </div>
    </a>
  );
}

export function Gallery() {
  return (
    <div className="canvas" style={{ paddingTop: "var(--s-6)" }}>
      <h1>Supercard</h1>
      <p className="gallery-lede">
        Screenshot-shareable knowledge cards, one emphasis per block.
      </p>

      <SpecBlock />

      <div className="section-label">Sample</div>
      {cards.map((c) => (
        <SampleCard key={c.slug} entry={c} />
      ))}

      <Glyph />
    </div>
  );
}
