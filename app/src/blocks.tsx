/*
 * Supercard V3 block primitives — the React render path.
 *
 * One component per block type in INDEX-block-library, matching the markup the
 * standalone HTML renderer emits (see docs/cards/*.html and RENDERING-spec).
 * A card composes these; it never reaches for raw <div>s. Single emphasis,
 * strict grayscale, and the corner glyph are enforced here, not per-card.
 *
 * Section labels (eyebrows): the public render shows the beat NAME only —
 * "Close", not "Beat 7 · Close", and never the BLOCK-* id. The beat index and
 * block id are authoring metadata: they live in the markdown card (30-CARDS/)
 * and in the JSX comments below, and are never rendered (RENDERING-spec).
 *
 * V3.3 note: the rendered card MUST NOT emit beat NUMBERS, position counters
 * (`BEAT N`, `N / TOTAL`), or any reader-visible renderer-version footer.
 * Beat-name eyebrows are still permitted, but only as a content-naming label
 * — see RENDERING § R-10 (V3.3) and identity invariant I7. The deprecated
 * `MicroFolio` component below is dev-only and must not be mounted in new
 * cards (frozen_at_version >= 3.3.0).
 */
import type { ReactNode } from "react";
import {
  barChartGeometry,
  lineChartGeometry,
  columnChartGeometry,
  areaChartGeometry,
  chartDescription,
} from "./chart-geometry.mjs";

/* ---- section scaffold -------------------------------------------------- */

type Beat =
  | "Beat 1 · Hook"
  | "Beat 2 · Evidence"
  | "Beat 3 · Mechanism"
  | "Beat 4 · Comparison"
  | "Beat 5 · Counter"
  | "Beat 6 · Application"
  | "Beat 7 · Close"
  | "Sources";

// R-40 — the eyebrow is a beat's visible label, and R-25 already requires it
// to be distinct within a card, so it is a stable name for the section to
// point at. Matches eyebrowId() in app/scripts/render-card.mjs.
export function eyebrowId(text: string) {
  const slug = text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
  return slug ? `beat-${slug}` : undefined;
}

export function Eyebrow({ label }: { label: string }) {
  // The eyebrow is a short editorial label that names the block's CONTENT
  // (e.g. "The founding experiment"), NOT the beat name. The beat is authoring
  // metadata and is never rendered (R-10, R-14, I7). Sentence case + the
  // first-letter cap are handled in CSS; the source string is authored as-is.
  return (
    <div className="eyebrow" id={eyebrowId(label)}>
      {label}
    </div>
  );
}

export function Section({
  beat: _beat,
  eyebrow,
  children,
}: {
  /* `beat` is authoring metadata — kept for structure/typing, never rendered
   * (no beat-name leakage, hence the underscore). The reader-visible label is
   * `eyebrow`, supplied only when a block lacks its own heading anchor
   * (R-14: one label per job). */
  beat: Beat;
  eyebrow?: string;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby={eyebrow ? eyebrowId(eyebrow) : undefined}>
      {eyebrow ? <Eyebrow label={eyebrow} /> : null}
      {children}
    </section>
  );
}

/* ---- canvas (V3.1+ opts in via v31 prop; V3.0 cards omit it) ---------- */

export function Canvas({
  v31,
  children,
}: {
  v31?: boolean;
  children: ReactNode;
}) {
  // R-40 — the canvas is the card's one primary landmark, matching the
  // standalone renderer's <main class="canvas …">.
  return (
    <main className={v31 ? "canvas v3-1" : "canvas"}>{children}</main>
  );
}

/* ---- Beat 1 — loft-card (the one lofted element) ----------------------- */

export function Hero({
  title,
  hook,
  lede,
  eyebrow,
}: {
  title: string;
  hook: ReactNode;
  lede: ReactNode;
  eyebrow?: string;
}) {
  return (
    <Section beat="Beat 1 · Hook" eyebrow={eyebrow}>
      <h1>{title}</h1>
      <div className="hero">
        <p className="hook">{hook}</p>
      </div>
      <p className="lede">{lede}</p>
    </Section>
  );
}

/* ---- editorial: standard text ------------------------------------------ */

export function StandardText({
  beat,
  eyebrow,
  heading,
  lead,
  children,
}: {
  beat: Beat;
  eyebrow?: string;
  heading?: string;
  /* V3.1+: the bolded 2–6-word lead-clause that opens the first paragraph.
   * Renders as <strong class="lead"> so the validator can detect it. */
  lead?: ReactNode;
  children: ReactNode;
}) {
  return (
    <Section beat={beat} eyebrow={eyebrow}>
      {heading ? <h2 className="tile">{heading}</h2> : null}
      {lead ? (
        <p>
          <strong className="lead">{lead}</strong> {children}
        </p>
      ) : (
        children
      )}
    </Section>
  );
}

/* ---- definitional: definition ------------------------------------------ */

export function Definition({
  beat,
  eyebrow,
  term,
  children,
}: {
  beat: Beat;
  eyebrow?: string;
  term: string;
  children: ReactNode;
}) {
  return (
    <Section beat={beat} eyebrow={eyebrow}>
      <p>
        <span className="def-term">{term}</span> {children}
      </p>
    </Section>
  );
}

/* ---- definitional: numbered principle / sequential: process flow ------- */

type Step = { lead?: ReactNode; body: ReactNode };

export function NumberedList({
  beat,
  eyebrow,
  heading,
  steps,
  closer,
}: {
  beat: Beat;
  eyebrow?: string;
  heading?: string;
  steps: Step[];
  closer?: ReactNode;
}) {
  return (
    <Section beat={beat} eyebrow={eyebrow}>
      {heading ? <h2 className="tile">{heading}</h2> : null}
      <ol role="list">
        {steps.map((s, i) => (
          <li key={i}>
            <span className="marker">{i + 1}</span>
            <span>
              {s.lead ? <strong>{s.lead}</strong> : null}
              {s.lead ? ": " : null}
              {s.body}
            </span>
          </li>
        ))}
      </ol>
      {closer ? <p>{closer}</p> : null}
    </Section>
  );
}

/* ---- editorial: marker list (anti-pattern ✕, checklist ☐) -------------- */

export function MarkerList({
  beat,
  eyebrow,
  heading,
  marker,
  items,
  intro,
  closer,
}: {
  beat: Beat;
  eyebrow?: string;
  heading?: string;
  marker: string;
  items: ReactNode[];
  intro?: ReactNode;
  closer?: ReactNode;
}) {
  return (
    <Section beat={beat} eyebrow={eyebrow}>
      {heading ? <h2 className="tile">{heading}</h2> : null}
      {intro ? <p>{intro}</p> : null}
      <ul role="list">
        {items.map((it, i) => (
          <li key={i}>
            <span className="marker">{marker}</span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
      {closer ? <p>{closer}</p> : null}
    </Section>
  );
}

/* ---- sequential: timeline / editorial: table / comparative: comparison - */

type Row = { cells: ReactNode[]; focal?: boolean };

export function DataTable({
  beat,
  eyebrow,
  heading,
  className,
  head,
  rows,
  takeaway,
  closer,
}: {
  beat: Beat;
  eyebrow?: string;
  heading?: string;
  className?: string;
  head?: ReactNode[];
  rows: Row[];
  /* V3.1+: closing takeaway row stating the table's verdict in one bolded
   * clause (G-11). Required when rows.length >= 4. */
  takeaway?: ReactNode;
  closer?: ReactNode;
}) {
  const span = head?.length ?? rows[0]?.cells.length ?? 1;
  return (
    <Section beat={beat} eyebrow={eyebrow}>
      {heading ? <h2 className="tile">{heading}</h2> : null}
      <table className={className}>
        {head ? (
          <thead>
            <tr>
              {head.map((h, i) => (
                <th key={i} scope="col">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
        ) : null}
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className={r.focal ? "focal" : undefined}>
              {r.cells.map((c, j) => (
                <td key={j}>{c}</td>
              ))}
            </tr>
          ))}
          {takeaway ? (
            <tr className="takeaway-row">
              <td colSpan={span}>
                <strong>{takeaway}</strong>
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
      {closer ? <p>{closer}</p> : null}
    </Section>
  );
}

/* ---- V3.7/V3.9 numeric / chart blocks (R-30, R-31, R-35) ---------------- *
 * All chart math lives in ./chart-geometry.mjs — the ONE home both render
 * paths import (R-35 extracted the duplicated V3.7 math when the third chart
 * type landed). These components serialize the same numbers render-card.mjs
 * does, so a React card and its standalone HTML twin are the same pixels (the
 * parity contract). One focal element per chart = the block's single
 * emphasis (P2). */

export type ChartItem = {
  label: string;
  value: number;
  display?: string;
  focal?: boolean;
};

type ChartBlockProps = {
  beat: Beat;
  eyebrow?: string;
  heading?: string;
  items: ChartItem[];
  closer?: ReactNode;
};

export function BarChart({ beat, eyebrow, heading, items, closer }: ChartBlockProps) {
  const g = barChartGeometry(items);
  return (
    <Section beat={beat} eyebrow={eyebrow}>
      {heading ? <h2 className="tile">{heading}</h2> : null}
      <div className="chart">
        <svg viewBox={`0 0 ${g.W} ${g.H}`} role="img" aria-label={chartDescription("bar", items)}>
          {g.rows.map((r, i) => {
            const f = r.focal ? " focal" : "";
            return (
              <g key={i}>
                <text className="c-label" x={r.labelX} y={r.cy} dominantBaseline="middle">
                  {r.label}
                </text>
                <rect className={`bar${f}`} x={r.barX} y={r.barY} width={r.barW} height={r.barH} rx={3} />
                <text className={`c-value${f}`} x={r.valueX} y={r.cy} dominantBaseline="middle">
                  {r.display}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      {closer ? <p>{closer}</p> : null}
    </Section>
  );
}

export function LineChart({ beat, eyebrow, heading, items, closer }: ChartBlockProps) {
  const g = lineChartGeometry(items);
  return (
    <Section beat={beat} eyebrow={eyebrow}>
      {heading ? <h2 className="tile">{heading}</h2> : null}
      <div className="chart">
        <svg viewBox={`0 0 ${g.W} ${g.H}`} role="img" aria-label={chartDescription("line", items)}>
          {g.grid.map((gl, i) => (
            <line key={i} className="grid" x1={gl.x1} y1={gl.y} x2={gl.x2} y2={gl.y} />
          ))}
          <polyline className="series" points={g.polyline} />
          {g.points.map((p, i) => {
            const f = p.focal ? " focal" : "";
            return (
              <g key={i}>
                <circle className={`dot${f}`} cx={p.x} cy={p.y} r={p.r} />
                <text className={`c-value${f}`} x={p.x} y={p.valueY} textAnchor={p.anchor}>
                  {p.display}
                </text>
                <text className="c-label" x={p.x} y={p.labelY} textAnchor={p.anchor}>
                  {p.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      {closer ? <p>{closer}</p> : null}
    </Section>
  );
}

/* column-chart (V3.9, R-35) — vertical magnitude comparison. Labels must be
 * short (≤ 8 chars, G-15); longer labels belong on the horizontal BarChart. */
export function ColumnChart({ beat, eyebrow, heading, items, closer }: ChartBlockProps) {
  const g = columnChartGeometry(items);
  return (
    <Section beat={beat} eyebrow={eyebrow}>
      {heading ? <h2 className="tile">{heading}</h2> : null}
      <div className="chart">
        <svg viewBox={`0 0 ${g.W} ${g.H}`} role="img" aria-label={chartDescription("column", items)}>
          <line className="axis" x1={0} y1={g.baseY} x2={g.W} y2={g.baseY} />
          {g.cols.map((c, i) => {
            const f = c.focal ? " focal" : "";
            return (
              <g key={i}>
                <rect className={`bar${f}`} x={c.x} y={c.y} width={c.w} height={c.h} rx={3} />
                <text className={`c-value${f}`} x={c.cx} y={c.valueY} textAnchor="middle">
                  {c.display}
                </text>
                <text className="c-label" x={c.cx} y={c.labelY} textAnchor="middle">
                  {c.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      {closer ? <p>{closer}</p> : null}
    </Section>
  );
}

/* area-chart (V3.9, R-35) — the line-chart frame plus the one permitted fill
 * (under-curve volume at --g-06; the grayscale contract caps fills at 12%). */
export function AreaChart({ beat, eyebrow, heading, items, closer }: ChartBlockProps) {
  const g = areaChartGeometry(items);
  return (
    <Section beat={beat} eyebrow={eyebrow}>
      {heading ? <h2 className="tile">{heading}</h2> : null}
      <div className="chart">
        <svg viewBox={`0 0 ${g.W} ${g.H}`} role="img" aria-label={chartDescription("area", items)}>
          {g.grid.map((gl, i) => (
            <line key={i} className="grid" x1={gl.x1} y1={gl.y} x2={gl.x2} y2={gl.y} />
          ))}
          <path className="area" d={g.areaPath} />
          <polyline className="series" points={g.polyline} />
          {g.points.map((p, i) => {
            const f = p.focal ? " focal" : "";
            return (
              <g key={i}>
                <circle className={`dot${f}`} cx={p.x} cy={p.y} r={p.r} />
                <text className={`c-value${f}`} x={p.x} y={p.valueY} textAnchor={p.anchor}>
                  {p.display}
                </text>
                <text className="c-label" x={p.x} y={p.labelY} textAnchor={p.anchor}>
                  {p.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      {closer ? <p>{closer}</p> : null}
    </Section>
  );
}

type Metric = { value: ReactNode; caption: ReactNode };

export function StatGrid({
  beat,
  eyebrow,
  heading,
  metrics,
  closer,
}: {
  beat: Beat;
  eyebrow?: string;
  heading?: string;
  metrics: Metric[];
  closer?: ReactNode;
}) {
  const cls = metrics.length % 3 === 0 ? "stat-grid cols-3" : "stat-grid";
  return (
    <Section beat={beat} eyebrow={eyebrow}>
      {heading ? <h2 className="tile">{heading}</h2> : null}
      <div className={cls}>
        {metrics.map((m, i) => (
          <div className="cell" key={i}>
            <div className="num">{m.value}</div>
            <div className="cap">{m.caption}</div>
          </div>
        ))}
      </div>
      {closer ? <p>{closer}</p> : null}
    </Section>
  );
}

export function StatCallout({
  beat,
  eyebrow,
  stat,
  anchor,
}: {
  beat: Beat;
  eyebrow?: string;
  stat: ReactNode;
  anchor: ReactNode;
}) {
  // Markup matches the render-card.mjs statMode path exactly (.stat then the
  // verbal-anchor <p>, no wrapper) so the HTML twin is pixel-identical.
  return (
    <Section beat={beat} eyebrow={eyebrow}>
      <div className="stat">{stat}</div>
      <p>{anchor}</p>
    </Section>
  );
}

/* ---- V3.8 editorial: flashcard list (R-32) ----------------------------- *
 * Markup matches app/src/scripts/render-card.mjs (emitFlashcards) exactly — a
 * <dl class="flashcards"> of Q/A pairs — so the HTML twin is pixel-identical
 * (the parity contract). The question (dt) is the row's single emphasis at
 * --ink; the answer (dd) is secondary ink. Parallel questions are the
 * adjacency exception, not multi-emphasis. */

type Card = { q: ReactNode; a: ReactNode };

export function Flashcards({
  beat,
  eyebrow,
  heading,
  cards,
}: {
  beat: Beat;
  eyebrow?: string;
  heading?: string;
  cards: Card[];
}) {
  return (
    <Section beat={beat} eyebrow={eyebrow}>
      {heading ? <h2 className="tile">{heading}</h2> : null}
      <dl className="flashcards">
        {cards.map((c, i) => (
          <div className="fc" key={i}>
            <dt>{c.q}</dt>
            <dd>{c.a}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

/* ---- definitional: equation -------------------------------------------- */

export function Equation({
  beat,
  eyebrow,
  heading,
  intro,
  formula,
  closer,
}: {
  beat: Beat;
  eyebrow?: string;
  heading?: string;
  intro?: ReactNode;
  formula: string;
  closer?: ReactNode;
}) {
  return (
    <Section beat={beat} eyebrow={eyebrow}>
      {heading ? <h2 className="tile">{heading}</h2> : null}
      {intro ? <p>{intro}</p> : null}
      <pre>{formula}</pre>
      {closer ? <p>{closer}</p> : null}
    </Section>
  );
}

/* ---- editorial: quote-as-evidence / pull-quote ------------------------- */

export function Quote({
  beat,
  eyebrow,
  variant,
  quote,
  attrib,
  children,
}: {
  beat: Beat;
  eyebrow?: string;
  variant: "evidence" | "pull";
  quote: ReactNode;
  /* The short source line under the quote (required on pull-quotes, V3.1).
   * Renders as <p class="attrib"> — caption-sized tertiary ink (R-33). */
  attrib?: ReactNode;
  children?: ReactNode;
}) {
  const pull = variant === "pull";
  return (
    <Section beat={beat} eyebrow={eyebrow}>
      <blockquote className={pull ? "pull" : undefined}>{quote}</blockquote>
      {attrib ? <p className="attrib">{attrib}</p> : null}
      {children ? <p>{children}</p> : null}
    </Section>
  );
}

/* ---- editorial: section divider (beat boundary) ------------------------ */

export function SectionDivider({
  rule,
  heading,
  children,
}: {
  rule: string;
  heading: string;
  children?: ReactNode;
}) {
  return (
    <section className="divider">
      {/* R-24: no em dash renders on the canvas, as furniture or in prose.
          The divider's hairlines and its 64pt symmetric gap already do the
          dividing, so the label needs no frame at all. */}
      <div className="rule">{rule}</div>
      <h2>{heading}</h2>
      {children ? <p>{children}</p> : null}
    </section>
  );
}

/* ---- editorial: key takeaway ------------------------------------------- */

export function KeyTakeaway({
  takeaway,
  children,
  eyebrow,
}: {
  takeaway: ReactNode;
  children?: ReactNode;
  eyebrow?: string;
}) {
  return (
    <Section beat="Beat 7 · Close" eyebrow={eyebrow}>
      <p className="takeaway">{takeaway}</p>
      {children ? <p>{children}</p> : null}
    </Section>
  );
}

/* ---- editorial: footnote / source aggregator --------------------------- */

export function Sources({ items }: { items: ReactNode[] }) {
  return (
    <Section beat="Sources" eyebrow="Sources">
      <ul className="sources" role="list" aria-label="Sources">
        {items.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>
    </Section>
  );
}

/* ---- RETIRED in V3.6: mid-beat asterism rest (was G-10 / R-11) ---------- *
 * R-11 / G-10 are superseded by R-24 (ADR-0011): the asterism never renders.
 * Macro-spacing between beats does the rest-the-eye work the asterism used to.
 * The component returns null so any card still importing it emits nothing;
 * `.asterism` is also display:none in supercard.css as a belt-and-braces hide.
 * Do NOT mount this in new cards. */
export function Asterism() {
  return null;
}

/* ---- Deprecated V3.1 beat micro-folio (dev-only on V3.3+) -------------- *
 * R-10 (V3.3) prohibits emitting beat labels, numbers, or position counters
 * on the rendered canvas — they leaked the author's seven-beat scaffold into
 * the reader's view. The component survives so V3.1/V3.2 cards can still be
 * re-rendered for diagnostics, and so a renderer maintainer can flip on a
 * `.dev-mode` class on the canvas root to see the structural overlay; the
 * `.micro-folio` CSS rule defaults to `display: none`, so even when this
 * component is mounted, the markup is invisible in a production render.
 *
 * Do NOT mount this in new cards (frozen_at_version >= 3.3.0). */

const BEAT_NAMES: Record<number, string> = {
  1: "HOOK",
  2: "EVIDENCE",
  3: "MECHANISM",
  4: "COMPARISON",
  5: "COUNTER",
  6: "APPLICATION",
  7: "CLOSE",
};

/** @deprecated Removed from the V3.3 render contract (R-10, I7). Dev-only. */
export function MicroFolio({
  beat,
  total = 7,
  edge,
}: {
  beat: number;
  total?: number;
  edge: "top" | "bottom";
}) {
  const name = BEAT_NAMES[beat] ?? "";
  return (
    <div className={`micro-folio micro-folio--${edge}`} aria-hidden="true">
      BEAT {beat} · {name} · {beat} / {total}
    </div>
  );
}

/* ---- the corner glyph — on every section's screenshot ------------------ */

export function Glyph(_props: { version?: string } = {}) {
  // Identity only — no version, era, mode, or date in reader-visible chrome
  // (R-10). The production stamp lives in the <meta> tags / registry, never
  // on the canvas. The `version` prop is accepted for back-compat and ignored.
  return <div className="glyph">✦ berafoot.com</div>;
}
