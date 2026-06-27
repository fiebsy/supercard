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
import {
  IconButton,
  ICON_BTN_SIZE,
  ChevronRight,
  CopyIcon,
  CheckIcon,
} from "./ui";

const SPEC_URL = "https://berafoot.com/llms.txt";
const REPO_LABEL = "github.com/fiebsy/supercard";
const REPO_URL = "https://github.com/fiebsy/supercard";

/* The two action rows share one pill + one round IconButton (ui.tsx) so the
 * spec and the repo read as a matched pair — both copy-to-clipboard. The pill
 * height is pinned to the button diameter so the row is evenly aligned. */
const rowStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
};
const pillStyle: CSSProperties = {
  flex: "1 1 auto",
  minWidth: 0,
  height: `${ICON_BTN_SIZE}px`,
  display: "flex",
  alignItems: "center",
  fontFamily: "var(--mono)",
  fontSize: "13px",
  color: "var(--ink)",
  background: "rgba(0,0,0,0.025)",
  border: "1px solid var(--g-12)",
  borderRadius: "999px",
  padding: "0 18px",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

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
    <IconButton
      onClick={copy}
      label={copied ? `${label} copied` : `Copy ${label}`}
      style={{ color: copied ? "#34c759" : "var(--w)" }}
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
    </IconButton>
  );
}

function SpecBlock() {
  return (
    <div className="spec-link" style={{ cursor: "default" }}>
      <div className="spec-link-title">One URL. The whole spec.</div>
      <div className="card-desc" style={{ marginTop: "4px", marginBottom: "16px" }}>
        Everything an agent needs to build one, in a single file. Point any LLM
        at it.
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
      <span className="sample-badge">Sample</span>
      {entry.version ? (
        <span className="version-badge">{entry.version}</span>
      ) : null}
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

      {/* chevron — decorative; the whole card is the link that opens it */}
      <div style={{ position: "absolute", right: "16px", bottom: "16px" }}>
        <IconButton label="Open card">
          <ChevronRight />
        </IconButton>
      </div>
    </a>
  );
}

export function Gallery() {
  return (
    <div className="canvas" style={{ paddingTop: "var(--s-6)" }}>
      <h1>Supercard</h1>
      <p className="gallery-lede">
        Paste the spec into Claude and any deep-research topic becomes a
        scannable card, one idea in focus per block. Get the gist fast.
      </p>

      <SpecBlock />

      <hr className="sample-divider" />
      {cards.map((c) => (
        <SampleCard key={c.slug} entry={c} />
      ))}

      <Glyph />
    </div>
  );
}
