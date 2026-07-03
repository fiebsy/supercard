/*
 * chart-geometry.mjs — the ONE home of Supercard chart geometry (V3.9, R-35).
 *
 * Through V3.8 the bar/line SVG math was duplicated verbatim between
 * app/scripts/render-card.mjs and app/src/blocks.tsx (the parity contract,
 * R-30). The stewards' log flagged that duplication as the signal to watch:
 * "if a third chart type lands, that's the signal to extract a shared geometry
 * module both paths import, not to copy the math a third time." V3.9 lands the
 * third and fourth chart types (column, area) — so the math moves here, once,
 * and both render paths consume these pure functions. The emitted numbers for
 * bar and line are IDENTICAL to the V3.7 duplicated versions; only the home
 * changed.
 *
 * Every function is pure: items in, plain geometry out (no DOM, no React, no
 * SVG strings) so the HTML renderer can serialize strings and the React path
 * can map to JSX from the same numbers. All coordinates are in content-px
 * units (viewBox width 361 ≈ 1 unit = 1px at the 361pt content width) so SVG
 * text reads at its stated size (R-30).
 */

export const CHART_W = 361;

const round1 = (x) => Math.round(x * 10) / 10;

// ~px width of an 11px SF Pro Rounded string — the overflow guard's ruler.
// Chart text may never escape the 361-unit viewBox: `.chart svg` is
// `overflow: visible`, so anything past the edge paints into the gutter.
const textW = (s) => String(s).length * 6.6;

// A label longer than its lane is truncated with an ellipsis; the full text
// belongs in the block's prose, not the chart lane (G-15).
const clip = (s, maxChars) =>
  String(s).length > maxChars ? String(s).slice(0, Math.max(1, maxChars - 1)).trimEnd() + "…" : String(s);

/** items: [{ label, value, display, focal }] */
export function barChartGeometry(items) {
  const W = CHART_W, labelW = 120, padR = 8, rowH = 34, barH = 20, valueW = 38;
  const n = items.length;
  const H = n * rowH + 4;
  const max = Math.max(...items.map((d) => d.value), 0) || 1;
  const barAreaW = W - labelW - padR - valueW;
  const rows = items.map((d, i) => {
    const cy = i * rowH + rowH / 2;
    const barW = Math.max(2, (d.value / max) * barAreaW);
    const display = d.display ?? String(d.value);
    return {
      label: clip(d.label, 18), // 18 chars ≈ the 120px label lane
      display,
      focal: !!d.focal,
      labelX: 0,
      cy,
      barX: labelW,
      barY: i * rowH + (rowH - barH) / 2,
      barW: round1(barW),
      barH,
      // Clamp so a wide value on a near-max bar never passes the right edge.
      valueX: round1(Math.min(labelW + barW + 6, W - textW(display))),
    };
  });
  return { W, H, rows };
}

/** items: [{ label, value, display, focal }] */
export function lineChartGeometry(items) {
  // padT 22 (was 18 through V3.8) keeps the topmost value label inside the
  // viewBox; edge points anchor start/end for the same reason (see `anchor`).
  const W = CHART_W, H = 168, padL = 10, padR = 10, padT = 22, padB = 30;
  const n = items.length;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;
  const vals = items.map((d) => d.value);
  const min = Math.min(...vals), max = Math.max(...vals);
  const range = max - min || 1;
  const x = (i) => padL + (n === 1 ? plotW / 2 : (i / (n - 1)) * plotW);
  const y = (v) => padT + (1 - (v - min) / range) * plotH;
  const grid = [0, 1, 2].map((g) => ({
    x1: padL,
    x2: W - padR,
    y: round1(padT + (g / 2) * plotH),
  }));
  const points = items.map((d, i) => ({
    label: clip(d.label, 12),
    display: d.display ?? String(d.value),
    focal: !!d.focal,
    x: round1(x(i)),
    y: round1(y(d.value)),
    r: d.focal ? 5 : 4,
    valueY: round1(y(d.value) - 9),
    labelY: H - 8,
    // First/last labels hug the plot edges; a centered anchor would push
    // half the text outside the viewBox and into the page gutter.
    anchor: n > 1 && i === 0 ? "start" : n > 1 && i === n - 1 ? "end" : "middle",
  }));
  const polyline = points.map((p) => `${p.x},${p.y}`).join(" ");
  return { W, H, grid, points, polyline };
}

/**
 * Column chart (V3.9, R-35) — vertical magnitude comparison. Same palette
 * contract as bar: series at --ink-3, exactly one focal column at --ink.
 * Labels sit under the baseline, values above each column, so labels must be
 * short (≤ 8 characters — GRAMMAR § G-15); longer labels belong on a
 * horizontal bar-chart, which reserves a 120px label lane.
 */
export function columnChartGeometry(items) {
  const W = CHART_W, H = 180, padT = 16, padB = 24, gap = 12;
  const n = items.length || 1;
  const baseY = H - padB;
  const plotH = baseY - padT;
  const max = Math.max(...items.map((d) => d.value), 0) || 1;
  const colW = round1(Math.min(56, (W - (n - 1) * gap) / n));
  const totalW = n * colW + (n - 1) * gap;
  const x0 = round1((W - totalW) / 2);
  // A column's label lane is the column + its gap; longer labels belong on a
  // horizontal bar-chart (G-15: column labels stay ≤ 8 characters).
  const labelChars = Math.max(4, Math.floor((colW + gap) / 6.6));
  const cols = items.map((d, i) => {
    const h = Math.max(2, (d.value / max) * plotH);
    const cx = round1(x0 + i * (colW + gap) + colW / 2);
    return {
      label: clip(d.label, labelChars),
      display: d.display ?? String(d.value),
      focal: !!d.focal,
      x: round1(x0 + i * (colW + gap)),
      y: round1(baseY - h),
      w: colW,
      h: round1(h),
      cx,
      valueY: round1(baseY - h - 6),
      labelY: H - 6,
    };
  });
  return { W, H, baseY, cols };
}

/**
 * Area chart (V3.9, R-35) — cumulative trend where under-curve volume matters.
 * The line-chart frame plus a closed fill path at --g-06 (the one fill the
 * grayscale contract permits under the "no fill above 12%" rule, R-30).
 */
export function areaChartGeometry(items) {
  const g = lineChartGeometry(items);
  const baseY = round1(g.grid[g.grid.length - 1].y);
  const first = g.points[0], last = g.points[g.points.length - 1];
  const areaPath = first
    ? `M ${first.x} ${baseY} L ${g.points.map((p) => `${p.x} ${p.y}`).join(" L ")} L ${last.x} ${baseY} Z`
    : "";
  return { ...g, baseY, areaPath };
}
