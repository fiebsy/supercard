/*
 * Type surface for chart-geometry.mjs — the shared chart math both render
 * paths import (R-35). Kept as a hand-written declaration so the geometry
 * stays a plain .mjs Node can import without a build step.
 */

export const CHART_W: number;

export type ChartDatum = {
  label: string;
  value: number;
  display?: string;
  focal?: boolean;
};

export type BarRow = {
  label: string;
  display: string;
  focal: boolean;
  labelX: number;
  cy: number;
  barX: number;
  barY: number;
  barW: number;
  barH: number;
  valueX: number;
};

export type LinePoint = {
  label: string;
  display: string;
  focal: boolean;
  x: number;
  y: number;
  r: number;
  valueY: number;
  labelY: number;
  anchor: "start" | "middle" | "end";
};

export type Column = {
  label: string;
  display: string;
  focal: boolean;
  x: number;
  y: number;
  w: number;
  h: number;
  cx: number;
  valueY: number;
  labelY: number;
};

export function barChartGeometry(items: ChartDatum[]): {
  W: number;
  H: number;
  rows: BarRow[];
};

export function lineChartGeometry(items: ChartDatum[]): {
  W: number;
  H: number;
  grid: { x1: number; x2: number; y: number }[];
  points: LinePoint[];
  polyline: string;
};

export function columnChartGeometry(items: ChartDatum[]): {
  W: number;
  H: number;
  baseY: number;
  cols: Column[];
};

export function areaChartGeometry(items: ChartDatum[]): {
  W: number;
  H: number;
  grid: { x1: number; x2: number; y: number }[];
  points: LinePoint[];
  polyline: string;
  baseY: number;
  areaPath: string;
};
