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

export function Eyebrow({ beat }: { beat: Beat }) {
  // Strip the "Beat N · " authoring prefix — public render shows the name only.
  return <div className="eyebrow">{beat.replace(/^Beat \d+ · /, "")}</div>;
}

export function Section({
  beat,
  children,
}: {
  beat: Beat;
  children: ReactNode;
}) {
  return (
    <section>
      <Eyebrow beat={beat} />
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
  return (
    <div className={v31 ? "canvas v3-1" : "canvas"}>{children}</div>
  );
}

/* ---- Beat 1 — loft-card (the one lofted element) ----------------------- */

export function Hero({
  title,
  hook,
  lede,
}: {
  title: string;
  hook: ReactNode;
  lede: ReactNode;
}) {
  return (
    <Section beat="Beat 1 · Hook">
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
  heading,
  lead,
  children,
}: {
  beat: Beat;
  heading?: string;
  /* V3.1+: the bolded 2–6-word lead-clause that opens the first paragraph.
   * Renders as <strong class="lead"> so the validator can detect it. */
  lead?: ReactNode;
  children: ReactNode;
}) {
  return (
    <Section beat={beat}>
      {heading ? <h2>{heading}</h2> : null}
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
  term,
  children,
}: {
  beat: Beat;
  term: string;
  children: ReactNode;
}) {
  return (
    <Section beat={beat}>
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
  heading,
  steps,
  closer,
}: {
  beat: Beat;
  heading?: string;
  steps: Step[];
  closer?: ReactNode;
}) {
  return (
    <Section beat={beat}>
      {heading ? <h2>{heading}</h2> : null}
      <ol>
        {steps.map((s, i) => (
          <li key={i}>
            <span className="marker">{i + 1}</span>
            <span>
              {s.lead ? <strong>{s.lead}</strong> : null}
              {s.lead ? " — " : null}
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
  heading,
  marker,
  items,
  intro,
  closer,
}: {
  beat: Beat;
  heading?: string;
  marker: string;
  items: ReactNode[];
  intro?: ReactNode;
  closer?: ReactNode;
}) {
  return (
    <Section beat={beat}>
      {heading ? <h2>{heading}</h2> : null}
      {intro ? <p>{intro}</p> : null}
      <ul>
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
  heading,
  className,
  head,
  rows,
  takeaway,
  closer,
}: {
  beat: Beat;
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
    <Section beat={beat}>
      {heading ? <h2>{heading}</h2> : null}
      <table className={className}>
        {head ? (
          <thead>
            <tr>
              {head.map((h, i) => (
                <th key={i}>{h}</th>
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

/* ---- definitional: equation -------------------------------------------- */

export function Equation({
  beat,
  heading,
  intro,
  formula,
  closer,
}: {
  beat: Beat;
  heading?: string;
  intro?: ReactNode;
  formula: string;
  closer?: ReactNode;
}) {
  return (
    <Section beat={beat}>
      {heading ? <h2>{heading}</h2> : null}
      {intro ? <p>{intro}</p> : null}
      <pre>{formula}</pre>
      {closer ? <p>{closer}</p> : null}
    </Section>
  );
}

/* ---- editorial: quote-as-evidence / pull-quote ------------------------- */

export function Quote({
  beat,
  variant,
  quote,
  children,
}: {
  beat: Beat;
  variant: "evidence" | "pull";
  quote: ReactNode;
  children?: ReactNode;
}) {
  const pull = variant === "pull";
  return (
    <Section beat={beat}>
      <blockquote className={pull ? "pull" : undefined}>{quote}</blockquote>
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
      <div className="rule">— {rule} —</div>
      <h2>{heading}</h2>
      {children ? <p>{children}</p> : null}
    </section>
  );
}

/* ---- editorial: key takeaway ------------------------------------------- */

export function KeyTakeaway({
  takeaway,
  children,
}: {
  takeaway: ReactNode;
  children?: ReactNode;
}) {
  return (
    <Section beat="Beat 7 · Close">
      <p className="takeaway">{takeaway}</p>
      {children ? <p>{children}</p> : null}
    </Section>
  );
}

/* ---- editorial: footnote / source aggregator --------------------------- */

export function Sources({ items }: { items: ReactNode[] }) {
  return (
    <Section beat="Sources">
      <ul className="sources">
        {items.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>
    </Section>
  );
}

/* ---- V3.1: mid-beat asterism rest (G-10 / R-11) ------------------------ */

export function Asterism() {
  // Literal text glyph at body size/weight, 32pt vertical bands (CSS).
  // No box, no rule, no tint — see RENDERING-spec § R-11.
  return (
    <div className="asterism" aria-hidden="true">
      ⁂
    </div>
  );
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

export function Glyph({ version = "v3.0" }: { version?: string } = {}) {
  return <div className="glyph">◆ supercard · {version} atlas</div>;
}
