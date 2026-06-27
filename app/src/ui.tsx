/*
 * ui.tsx — shared chrome primitives for the landing + card views (V3.7).
 *
 * One round icon-button shape (.icon-btn) and one icon set, so the landing
 * copy buttons, the sample-card chevron, and the card-view back button are a
 * single size system: perfect circles, width == height, fully rounded. This
 * replaces three divergent inline-styled shapes that drifted apart (the copy
 * button was 46px and stretch-height, the sample chevron and back button were
 * 34px) and the SVG icons that were duplicated across Gallery.tsx and App.tsx.
 */
import type { CSSProperties, ReactNode } from "react";

/** The one icon-button diameter shared across the app — even height and width. */
export const ICON_BTN_SIZE = 40;

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

export function ChevronRight() {
  return (
    <svg {...svgProps}>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}
export function ChevronLeft() {
  return (
    <svg {...svgProps}>
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}
export function CopyIcon() {
  return (
    <svg {...svgProps}>
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}
export function CheckIcon() {
  return (
    <svg {...svgProps}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
export function ChevronDown() {
  return (
    <svg {...svgProps} width={14} height={14}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

/* The GitHub mark. A filled glyph (not stroked like the chevrons), so it takes
 * `fill: currentColor` — color it via the parent's `color` (e.g. .gh-btn). */
export function GitHubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.776.42-1.305.762-1.605-2.665-.305-5.467-1.334-5.467-5.93 0-1.31.467-2.38 1.235-3.22-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 0 1 3.003-.404c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.24 2.873.118 3.176.77.84 1.232 1.91 1.232 3.22 0 4.61-2.806 5.624-5.48 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 22.296 24 17.797 24 12.5 24 5.87 18.627.5 12 .5z" />
    </svg>
  );
}

/*
 * One round icon-button shape. `size` sets BOTH width and height, so every
 * instance is a perfect circle. Renders an <a> when given `href`, a <button>
 * when given `onClick`, and a decorative <span> otherwise (for chevrons that
 * sit inside an already-clickable card link — no nested interactive elements).
 */
export function IconButton({
  size = ICON_BTN_SIZE,
  href,
  onClick,
  label,
  children,
  style,
}: {
  size?: number;
  href?: string;
  onClick?: () => void;
  label: string;
  children: ReactNode;
  style?: CSSProperties;
}) {
  const dims: CSSProperties = { width: size, height: size, ...style };
  if (href) {
    return (
      <a className="icon-btn" href={href} aria-label={label} style={dims}>
        {children}
      </a>
    );
  }
  if (onClick) {
    return (
      <button
        type="button"
        className="icon-btn"
        onClick={onClick}
        aria-label={label}
        style={dims}
      >
        {children}
      </button>
    );
  }
  return (
    <span className="icon-btn" role="img" aria-label={label} style={dims}>
      {children}
    </span>
  );
}
