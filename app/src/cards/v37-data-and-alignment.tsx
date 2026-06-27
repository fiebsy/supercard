/*
 * CARD-2026-06-27-v37-data-and-alignment: V3.7 reference sample / Standard.
 *
 * Source of truth:  30-CARDS/CARD-2026-06-27-v37-data-and-alignment--draft.md
 * HTML twin:         docs/cards/CARD-2026-06-27-v37-data-and-alignment.html
 *
 * A view of the markdown card (frozen at 3.7.0), not a source — re-derive it
 * from the markdown, never hand-edit it as canonical. Exercises the V3.7 cut:
 * the R-27 cover eyebrow, R-30 grayscale bar + line charts, R-31 stat-grid +
 * stat-callout, and the R-28/R-29 alignment fixes. Strict grayscale.
 */
import {
  StandardText,
  DataTable,
  BarChart,
  LineChart,
  StatGrid,
  KeyTakeaway,
  Sources,
  Glyph,
} from "../blocks";

export function V37DataAndAlignment() {
  return (
    <div className="canvas v3-1 v3-4 v3-5 v3-6 v3-7">
      {/* Beat 1 — Hook (loft-card). Raw section: the cover now opens with an
          eyebrow above the title (R-27), then dek, then the hero card. */}
      <section>
        <div className="eyebrow">The variety release</div>
        <h1>Data, Aligned</h1>
        <p className="dek">
          V3.7 gives every card more ways to fill the same grid: charts,
          numbers, and a cover that can open with an eyebrow.
        </p>
        <div className="hero">
          <p className="hook">
            <strong>Range, without breaking the system.</strong> The shape
            held; v3.7 just widened what can sit inside it.
          </p>
        </div>
        <p className="lede">
          The chart blocks were catalogued for a year. Now they actually
          render, in both paths, on the same gray ramp as everything else.
        </p>
      </section>

      {/* Beat 2 — Evidence: stat-grid */}
      <StatGrid
        beat="Beat 2 · Evidence"
        eyebrow="The system in four numbers"
        heading="One grammar, many parts."
        metrics={[
          { value: "39", caption: "blocks" },
          { value: "7", caption: "families" },
          { value: "14", caption: "ADRs" },
          { value: "2", caption: "render paths" },
        ]}
      />

      {/* Beat 2 — Evidence: bar chart (one focal bar = single emphasis) */}
      <BarChart
        beat="Beat 2 · Evidence"
        eyebrow="Where the blocks live"
        heading="Editorial carries the most weight."
        items={[
          { label: "Editorial", value: 11, focal: true },
          { label: "Comparative", value: 7 },
          { label: "Numeric", value: 5 },
          { label: "Sequential", value: 4 },
          { label: "Definitional", value: 4 },
          { label: "Distributional", value: 4 },
          { label: "Structural", value: 4 },
        ]}
        closer="One bar goes full-ink: the family a card reaches for most."
      />

      {/* Beat 3 — Mechanism: how a chart stays on brand */}
      <StandardText
        beat="Beat 3 · Mechanism"
        eyebrow="How a chart stays on brand"
        lead="Grayscale, single emphasis."
      >
        A chart obeys the same rules as prose: every bar and line sits on the
        gray ramp, and exactly one element goes full-ink to carry the focus. No
        color, no second highlight.
      </StandardText>

      {/* Beat 3 — Mechanism: line chart (focal final point) */}
      <LineChart
        beat="Beat 3 · Mechanism"
        eyebrow="Rules per release"
        heading="The spec grows in small, deliberate cuts."
        items={[
          { label: "v3.1", value: 6 },
          { label: "v3.4", value: 4 },
          { label: "v3.5", value: 3 },
          { label: "v3.6", value: 3 },
          { label: "v3.6.1", value: 2 },
          { label: "v3.7", value: 5, focal: true },
        ]}
      />

      {/* Beat 4 — Comparison: cleaned 3-column table (R-29 fixed alignment) */}
      <DataTable
        beat="Beat 4 · Comparison"
        eyebrow="Table or chart"
        heading="Pick by what the reader extracts."
        head={["", "Table", "Chart"]}
        rows={[
          { cells: ["Reads as", "values", "shape"] },
          { cells: ["Best for", "exact figures", "magnitude at a glance"] },
          {
            cells: [
              "Carries focus with",
              "a bold cell",
              <strong>one full-ink bar</strong>,
            ],
          },
        ]}
      />

      {/* Beat 5 — Counter: stat-callout (focal hero number + verbal anchor) */}
      <section>
        <div className="eyebrow">Colors on the canvas</div>
        <div className="tile">The ramp is the whole palette.</div>
        <p>Charts changed nothing about the rule that has held since v3.0:</p>
        <div className="stat">0</div>
        <p>
          colors. Every bar, line, and number stays on the gray ramp, and one
          focal element per chart carries the emphasis.
        </p>
      </section>

      {/* Beat 6 — Application: pick-the-block table with takeaway row */}
      <DataTable
        beat="Beat 6 · Application"
        eyebrow="Reach for the right one"
        heading="What you have decides the block."
        head={["You have", "Reach for"]}
        rows={[
          { cells: ["One number that matters", "stat-callout"] },
          { cells: ["A few parallel metrics", "stat-grid"] },
          { cells: ["Magnitudes to compare", "bar chart"] },
          { cells: ["A trend over time", "line chart"] },
        ]}
        takeaway="Shape first, text last: the data picks the block."
      />

      {/* Beat 7 — Close: key takeaway */}
      <KeyTakeaway
        eyebrow="Bottom line"
        takeaway={<strong>More range, one grammar.</strong>}
      >
        V3.7 adds charts, numbers, and a cover eyebrow without a single color or
        a broken grid. The system gets more expressive the same way it got
        quieter: by rule, on the ramp, one emphasis at a time.
      </KeyTakeaway>

      <Sources
        items={[
          <>
            Supercard <code>RENDERING-spec</code> § R-27–R-31 (V3.7 rules)
          </>,
          <>
            Supercard <code>ADR-0014</code> — V3.7 header eyebrow, alignment,
            data-viz
          </>,
          <>
            Supercard <code>INDEX-block-library</code> — 39 blocks across 7
            families
          </>,
          <>
            Supercard <code>CHANGELOG-supercard</code> — version cadence
          </>,
        ]}
      />

      <Glyph version="v3.7" />
    </div>
  );
}
