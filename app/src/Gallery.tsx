/*
 * Gallery — the React app's landing view (V3.7 lander redesign). Mono
 * `# supercard` wordmark + a GitHub icon, path-style `~/ zone` labels, a
 * code-block spec input with an inset copy button, and a toast-style archive:
 * the newest card shows in full, older cards collapse behind a reveal. Each
 * card links to its React render (#/cards/{slug}); the standalone HTML twin is
 * one click away inside the card view, so both render paths stay reachable.
 */
import { useEffect, useRef, useState } from "react";
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

/* Below this many older cards, just show them inline — the collapse/toast only
 * earns its chrome once there's enough to be worth hiding. */
const COLLAPSE_OLDER_AT = 3;

/* Whether the archive was open, at module scope so it outlives the Gallery
 * unmounting on a route change. Opening a card and coming back used to
 * re-collapse the list the reader had just expanded, which — paired with the
 * restored scroll offset (R-44, App.tsx) — would have returned them to an
 * offset the page no longer had. The two belong together. */
let olderWasOpen = false;

/* A mono path label (`~/ spec`) trailed by a hairline rule — the device that
 * separates the lander's zones in this vertical, mobile layout. */
function ZoneLabel({ children, id }: { children: string; id?: string }) {
  // R-40 — the zone labels are what divide this page, so they are its headings.
  // Rendered as an <h2> the outline reads spec / samples / older instead of a
  // single <h1> followed by nothing.
  return (
    <div className="zone-label">
      <h2 className="zone-label-text" id={id}>
        {children}
      </h2>
      <span className="zone-rule" />
    </div>
  );
}

/* The in-gesture copy path. The async Clipboard API is missing or refused in
 * more places than it looks — an insecure origin, an in-app webview, a
 * browser whose privacy mode declines the write — and the button used to
 * report "Copied" in every one of them without copying anything (R-44). A
 * control that lies about what it did is worse than one that visibly fails,
 * so this runs for real and its return value is what the check reports. */
function copyBySelection(text: string): boolean {
  // Selecting the off-screen field moves focus; hand it back afterwards so a
  // keyboard reader is not dropped to the top of the document by copying.
  const active =
    document.activeElement instanceof HTMLElement ? document.activeElement : null;
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  // Off-screen, not hidden: a display:none or zero-size field is not
  // selectable, and iOS scrolls to a focused field it can see.
  ta.style.cssText = "position:fixed;top:0;left:-9999px;opacity:0";
  document.body.appendChild(ta);
  ta.select();
  ta.setSelectionRange(0, text.length);
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch {
    ok = false;
  }
  ta.remove();
  active?.focus();
  return ok;
}

/* The spec input is itself the copy button — the whole field is clickable, so
 * the copy glyph is just a quiet indicator (no fill). The glyph swaps to a
 * check for a moment after a successful copy (monochrome — readable on the
 * field, not a colored badge). */
function SpecInput() {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    const settle = (ok: boolean) => {
      if (!ok) return;
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    };
    // execCommand("copy") only works inside the click's own call stack. The
    // old order — async Clipboard API first, selection copy in its .catch —
    // ran the fallback after the user gesture had expired, so exactly where
    // the API refuses (iOS Safari denials, in-app webviews, embedded frames)
    // the fallback returned false too: no copy and no check. So the
    // in-gesture path goes first, and the async API is the fallback for
    // whatever eventually drops execCommand.
    if (copyBySelection(SPEC_URL)) {
      settle(true);
    } else if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(SPEC_URL).then(
        () => settle(true),
        () => settle(false)
      );
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
      {/* The one action on the page, so its outcome is announced rather than
          left to whether the reader notices a glyph swap. The region is
          rendered empty and filled on copy, which is what makes it speak. */}
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "Spec URL copied" : ""}
      </span>
    </button>
  );
}

/* A peek at a published card (Card B): the title shares a row with a ghost
 * open-chevron, a trimmed mono meta line, then the real opening prose clipped
 * with a fade. The chevron lives in the title row so the preview runs the full
 * width with nothing floating over the faded text. */
function SampleCard({ entry }: { entry: CardEntry }) {
  // Cards with a React view route in-app; archive-only cards open their twin.
  const href = entry.component ? `#/cards/${entry.slug}` : entry.htmlRender;
  return (
    <a
      href={href}
      className="sample-card"
      aria-labelledby={`sample-${entry.slug}`}
    >
      <div className="sample-head">
        <div className="sample-headings">
          <div className="sample-eyebrow">{entry.eyebrow}</div>
          <span className="sample-title" id={`sample-${entry.slug}`}>
            {entry.title}
          </span>
        </div>
        <span className="sample-open" aria-hidden="true">
          <ChevronRight />
        </span>
      </div>
      <div className="sample-meta">
        {entry.version} · {entry.length} · {entry.mode}
      </div>
      <p className="sample-preview">{entry.preview}</p>
    </a>
  );
}

export function Gallery() {
  const [current, ...older] = cards;
  const [showOlder, setShowOlder] = useState(olderWasOpen);
  // Expanding swaps the reveal button out of the tree and collapsing swaps the
  // Hide button out, so without this a keyboard reader is returned to the top
  // of the document by whichever control they just used.
  const hideRef = useRef<HTMLButtonElement>(null);
  const revealRef = useRef<HTMLButtonElement>(null);
  const moved = useRef(false);
  useEffect(() => {
    if (!moved.current) return;
    (showOlder ? hideRef : revealRef).current?.focus();
  }, [showOlder]);
  const toggle = (next: boolean) => {
    moved.current = true;
    olderWasOpen = next;
    setShowOlder(next);
  };

  return (
    <main className="canvas" style={{ paddingTop: 0 }}>
      <header className="landing-header">
        <h1 className="wordmark"># supercard</h1>
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
        Paste the spec into Claude or ChatGPT. Any topic becomes one scannable
        card.
      </p>

      <ZoneLabel>~/ spec</ZoneLabel>
      <h3 className="spec-title">One URL. The whole spec.</h3>
      <SpecInput />

      <ZoneLabel>~/ samples</ZoneLabel>
      <SampleCard entry={current} />

      {older.length === 0 ? null : older.length < COLLAPSE_OLDER_AT ? (
        // A couple of older cards — show them inline, no toast.
        <>
          <ZoneLabel>~/ older</ZoneLabel>
          <div className="older-list">
            {older.map((c) => (
              <SampleCard key={c.slug} entry={c} />
            ))}
          </div>
        </>
      ) : showOlder ? (
        // Enough to collapse, expanded — label carries a Hide control.
        <>
          <div className="zone-label">
            <span className="zone-label-text">~/ older</span>
            <span className="zone-rule" />
            <button
              ref={hideRef}
              type="button"
              className="zone-action"
              aria-expanded={true}
              aria-controls="older-cards"
              onClick={() => toggle(false)}
            >
              Hide
            </button>
          </div>
          <div
            className={`older-list${moved.current ? " is-revealing" : ""}`}
            id="older-cards"
          >
            {older.map((c) => (
              <SampleCard key={c.slug} entry={c} />
            ))}
          </div>
        </>
      ) : (
        // Enough to collapse, collapsed — the toast reveal.
        <>
          <ZoneLabel>~/ older</ZoneLabel>
          <div className="older">
            <div className="older-peek" />
            <button
              ref={revealRef}
              type="button"
              className="older-toggle"
              aria-expanded={false}
              aria-controls="older-cards"
              onClick={() => toggle(true)}
            >
              View {older.length} older formats
              <ChevronDown />
            </button>
          </div>
        </>
      )}

      <footer className="landing-footer">◆ supercard · v3.10 atlas</footer>
    </main>
  );
}
