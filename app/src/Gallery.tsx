/*
 * Gallery — the React app's landing view (V3.7 lander redesign). Mono
 * `# supercard` wordmark + a GitHub icon, path-style `~/ zone` labels, a
 * code-block spec input with an inset copy button, and a toast-style archive:
 * the newest card shows in full, older cards collapse behind a reveal. Each
 * card links to its React render (#/cards/{slug}); the standalone HTML twin is
 * one click away inside the card view, so both render paths stay reachable.
 */
import { useState } from "react";
import { cards } from "./cards/registry";
import type { CardEntry } from "./cards/registry";
import {
  IconButton,
  ChevronRight,
  ChevronDown,
  CopyIcon,
  CheckIcon,
  GitHubIcon,
} from "./ui";

/* The full URL is what gets copied; the display drops the scheme so the mono
 * line reads large and clean inside the input. */
const SPEC_URL = "https://berafoot.com/llms.txt";
const SPEC_URL_DISPLAY = "berafoot.com/llms.txt";
const REPO_URL = "https://github.com/fiebsy/supercard";

/* A mono path label (`~/ spec`) trailed by a hairline rule — the device that
 * separates the lander's zones in this vertical, mobile layout. */
function ZoneLabel({ children }: { children: string }) {
  return (
    <div className="zone-label">
      <span className="zone-label-text">{children}</span>
      <span className="zone-rule" />
    </div>
  );
}

/* The inset copy button. Non-black (gray fill, ink glyph); swaps to a green
 * check for a moment after a successful copy — the one sanctioned color, and
 * only as transient UI feedback. */
function SpecCopyButton({ value }: { value: string }) {
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
      className={`spec-copy${copied ? " copied" : ""}`}
      onClick={copy}
      aria-label={copied ? "Spec URL copied" : "Copy the spec URL"}
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
    </button>
  );
}

/* A peek at a published card: the real opening prose, clipped to a fixed
 * height with a fade mask over the cut, and a chevron bottom-right that opens
 * the full card. (Refinement target — kept as-is for the lander wiring.) */
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
  const [current, ...older] = cards;
  const [showOlder, setShowOlder] = useState(false);

  return (
    <div className="canvas" style={{ paddingTop: 0 }}>
      <header className="landing-header">
        <span className="wordmark"># supercard</span>
        <a
          className="gh-btn"
          href={REPO_URL}
          target="_blank"
          rel="noreferrer"
          aria-label="Supercard on GitHub"
        >
          <GitHubIcon />
        </a>
      </header>

      <p className="gallery-lede">
        Paste the spec into Claude. Any deep-research topic becomes a scannable
        card.
      </p>

      <ZoneLabel>~/ spec</ZoneLabel>
      <div className="spec-title">One URL. The whole spec.</div>
      <div className="spec-desc">Everything an agent needs, in one file.</div>
      <div className="spec-input">
        <span className="spec-url">{SPEC_URL_DISPLAY}</span>
        <SpecCopyButton value={SPEC_URL} />
      </div>

      <ZoneLabel>~/ samples</ZoneLabel>
      <SampleCard entry={current} />

      {older.length > 0 ? (
        <>
          <ZoneLabel>~/ older</ZoneLabel>
          {showOlder ? (
            <div className="older-list">
              {older.map((c) => (
                <SampleCard key={c.slug} entry={c} />
              ))}
            </div>
          ) : (
            <div className="older">
              <div className="older-peek" />
              <button
                type="button"
                className="older-toggle"
                onClick={() => setShowOlder(true)}
              >
                View {older.length} older card{older.length === 1 ? "" : "s"}
                <ChevronDown />
              </button>
            </div>
          )}
        </>
      ) : null}

      <div className="landing-footer">◆ supercard · v3.7 atlas</div>
    </div>
  );
}
