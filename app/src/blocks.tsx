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
  children,
}: {
  beat: Beat;
  heading?: string;
  children: ReactNode;
}) {
  return (
    <Section beat={beat}>
      {heading ? <h2>{heading}</h2> : null}
      {children}
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
  closer,
}: {
  beat: Beat;
  heading?: string;
  className?: string;
  head?: ReactNode[];
  rows: Row[];
  closer?: ReactNode;
}) {
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

/* ---- the corner glyph — on every section's screenshot ------------------ */

export function Glyph() {
  return <div className="glyph">◆ supercard · v3.0 atlas</div>;
}
