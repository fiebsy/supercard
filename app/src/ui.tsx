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
