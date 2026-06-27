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

/* The spec input is itself the copy button — the whole field is clickable, so
 * the copy glyph is just a quiet indicator (no fill). The glyph swaps to a
 * check for a moment after a successful copy (monochrome — readable on the
 * field, not a colored badge). */
function SpecInput() {
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
    <button
      type="button"
      className="spec-input"
      onClick={copy}
      aria-label={copied ? "Spec URL copied" : "Copy the spec URL"}
    >
      <span className="spec-url">{SPEC_URL_DISPLAY}</span>
      <span
        className={`spec-copy${copied ? " copied" : ""}`}
        aria-hidden="true"
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </span>
    </button>
  );
}

/* A peek at a published card (Card B): the title shares a row with a ghost
 * open-chevron, a trimmed mono meta line, then the real opening prose clipped
 * with a fade. The chevron lives in the title row so the preview runs the full
 * width with nothing floating over the faded text. */
function SampleCard({ entry }: { entry: CardEntry }) {
  return (
    <a href={`#/cards/${entry.slug}`} className="sample-card">
      <div className="sample-head">
        <span className="sample-title">{entry.title}</span>
        <span className="sample-open" aria-hidden="true">
          <ChevronRight />
        </span>
      </div>
      <div className="sample-meta">
        {entry.version} · {entry.length} · {entry.mode}
      </div>
      <p className="sample-preview">{entry.preview}</p>
      <div className="sample-fade" />
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
      <SpecInput />

      <ZoneLabel>~/ samples</ZoneLabel>
      <SampleCard entry={current} />

      {older.length > 0 ? (
        showOlder ? (
          <>
            <div className="zone-label">
              <span className="zone-label-text">~/ older</span>
              <span className="zone-rule" />
              <button
                type="button"
                className="zone-action"
                onClick={() => setShowOlder(false)}
              >
                Hide
              </button>
            </div>
            <div className="older-list">
              {older.map((c) => (
                <SampleCard key={c.slug} entry={c} />
              ))}
            </div>
          </>
        ) : (
          <>
            <ZoneLabel>~/ older</ZoneLabel>
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
          </>
        )
      ) : null}

      <div className="landing-footer">◆ supercard · v3.7 atlas</div>
    </div>
  );
}
