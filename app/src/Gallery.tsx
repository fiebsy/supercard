/*
 * Gallery — the React app's landing view. Mirrors docs/index.html, but each
 * card links to its React render (#/cards/{slug}). The standalone HTML twin is
 * still one click away via the mono link, so both render paths stay reachable
 * from one deployment.
 */
import { useState } from "react";
import type { CSSProperties } from "react";
import { Glyph } from "./blocks";

const SPEC_URL = "https://berafoot.com/llms.txt";
const REPO_URL = "https://github.com/fiebsy/supercard";

/* The two action rows share one pill + one square icon-button shape so the
 * spec and the repo read as a matched pair. */
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
  borderRadius: "10px",
  padding: "12px 14px",
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
  borderRadius: "10px",
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
function ArrowIcon() {
  return (
    <svg {...svgProps}>
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

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
        Everything an agent needs to build, render, or judge a Supercard lives
        in one self-contained file. Point any LLM at it; nothing else to fetch.
      </div>

      <div style={rowStyle}>
        <span style={pillStyle}>{SPEC_URL}</span>
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? "Spec URL copied" : "Copy the spec URL"}
          style={{ ...btnStyle, color: copied ? "#34c759" : "var(--w)" }}
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
        </button>
      </div>

      <div style={{ ...rowStyle, marginTop: "8px" }}>
        <span style={pillStyle}>github.com/fiebsy/supercard</span>
        <a
          href={REPO_URL}
          target="_blank"
          rel="noreferrer"
          aria-label="Open the GitHub repo"
          style={btnStyle}
        >
          <ArrowIcon />
        </a>
      </div>
    </div>
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

      <Glyph />
    </div>
  );
}
