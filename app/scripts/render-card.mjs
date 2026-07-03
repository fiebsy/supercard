/*
 * render-card.mjs — the deterministic Supercard renderer (ADR-0010).
 *
 * Turns a markdown card in 30-CARDS/ into its published standalone HTML in
 * docs/cards/, then upserts the docs/index.html gallery entry. This is the
 * ONE supported way to produce the HTML render path (RENDERING-spec § Two
 * render paths, Stage 5 of PIPELINE-card-assembly).
 *
 *   node scripts/render-card.mjs <card.md...>   # render named cards
 *   node scripts/render-card.mjs                # render every 30-CARDS/*.md
 *   npm --prefix app run render -- <card.md>    # via package.json
 *
 * Why a script and not hand-authored HTML:
 *   - The render step used to be a manual reconstruction of the whole HTML
 *     file from RENDERING-spec prose. It was forgotten (last pipeline stage,
 *     nothing failed if skipped) and it drifted (eyebrows, subheads, and the
 *     dek were re-authored at render time, existing only in the HTML — a
 *     genealogy leak, I7 / ADR-0003). This script makes the markdown card the
 *     complete reader-visible source and the render a pure function over it.
 *
 * Single source of truth:
 *   - All layout/type/colour comes from app/src/supercard.css, inlined
 *     verbatim. The renderer never re-states a token. It picks the card's rule
 *     library by resolving frozen_at_version to the canvas class chain
 *     (.canvas .v3-1 .v3-5 …) — the same cascade the React path uses, so the
 *     HTML twin is pixel-identical to the React card (RENDERING-spec contract).
 *
 * The grammar it parses is documented in 50-TEMPLATES/TEMPLATE-supercard-*.md.
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { dirname, resolve, relative, basename } from "node:path";
import {
  barChartGeometry,
  lineChartGeometry,
  columnChartGeometry,
  areaChartGeometry,
} from "../src/chart-geometry.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const repo = resolve(here, "../..");
const CARDS_DIR = resolve(repo, "30-CARDS");
const RENDER_DIR = resolve(repo, "docs/cards");
const GALLERY = resolve(repo, "docs/index.html");
const CSS_PATH = resolve(repo, "app/src/supercard.css");

// The renderer's own version — emitted as sc:renderer_version. Bump when the
// emitted markup changes shape (not when a card's frozen_at_version changes).
const RENDERER_VERSION = "v3.9";

/* ---- small helpers ----------------------------------------------------- */

function escapeHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Inline markdown → HTML. Escape first, then promote the inline tokens that
// survive escaping. Single emphasis (PRINCIPLES 2) means **bold** is the only
// heavy run a block should carry; we still support `code` and *em* for titles.
function inlineMd(s) {
  let h = escapeHtml(s.trim());
  h = h.replace(/`([^`]+)`/g, "<code>$1</code>");
  h = h.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  h = h.replace(/(^|[^*])\*([^*]+)\*(?!\*)/g, "$1<em>$2</em>");
  return h;
}

const isBlank = (l) => l.trim() === "";

/* ---- frontmatter + title ----------------------------------------------- */

// Cards carry their frontmatter as the first | key | value | table, not YAML.
function parseCard(raw) {
  const lines = raw.split(/\r?\n/);
  let title = "";
  const fm = {};
  let i = 0;

  for (; i < lines.length; i++) {
    const l = lines[i];
    if (!title) {
      const m = l.match(/^#\s+(.+)$/);
      if (m) {
        title = m[1].trim();
        continue;
      }
    }
    // frontmatter rows: | key | value |
    const row = l.match(/^\|\s*([^|]+?)\s*\|\s*(.*?)\s*\|\s*$/);
    if (row) {
      const key = row[1].trim().toLowerCase();
      if (key === "key" || /^-+$/.test(key)) continue; // header / separator
      fm[key] = row[2].trim();
    }
  }

  // Body = everything from the first "## " section header onward.
  const firstSection = lines.findIndex((l) => /^##\s+/.test(l));
  const body = firstSection === -1 ? "" : lines.slice(firstSection).join("\n");
  return { title, fm, body };
}

/* ---- canvas class chain by frozen_at_version --------------------------- */

function canvasClasses(fm) {
  const frozen = fm.frozen_at_version || fm.version || "3.0.0";
  const [maj, min] = frozen.split(".").map((n) => parseInt(n, 10));
  const cls = ["canvas"];
  if (maj > 3 || (maj === 3 && min >= 1)) cls.push("v3-1");
  if (maj > 3 || (maj === 3 && min >= 4)) cls.push("v3-4");
  if (maj > 3 || (maj === 3 && min >= 5)) cls.push("v3-5");
  if (maj > 3 || (maj === 3 && min >= 6)) cls.push("v3-6");
  if (maj > 3 || (maj === 3 && min >= 7)) cls.push("v3-7");
  if (maj > 3 || (maj === 3 && min >= 8)) cls.push("v3-8");
  if (maj > 3 || (maj === 3 && min >= 9)) cls.push("v3-9");

  // Beat-gap opt-outs/ins relative to the version default (R-15).
  const gap = (fm.beat_gap || "").trim();
  const defaultGap = maj === 3 && min >= 5 ? "64" : "48";
  if (gap && gap !== defaultGap) cls.push(`beat-gap-${gap}`);

  // Apple register (V3.4 only; superseded for V3.5 — validator errors on it).
  if (min === 4 && /^true$/i.test(fm.apple_register || "")) cls.push("apple-register");
  return cls.join(" ");
}

function versionLabel(fm) {
  const frozen = fm.frozen_at_version || fm.version || "3.0.0";
  const [maj, min] = frozen.split(".");
  return `v${maj}.${min}`;
}

/* ---- section parsing --------------------------------------------------- */

// A section starts at "## …" and runs to the next "## " or "---" fence.
function splitSections(body) {
  const out = [];
  let cur = null;
  for (const line of body.split(/\r?\n/)) {
    if (/^##\s+/.test(line)) {
      if (cur) out.push(cur);
      cur = { header: line.replace(/^##\s+/, "").trim(), lines: [] };
    } else if (/^---\s*$/.test(line)) {
      continue; // beat fences are scaffold; never rendered
    } else if (cur) {
      cur.lines.push(line);
    }
  }
  if (cur) out.push(cur);
  return out;
}

// Only beat sections, the Sources section, and section dividers render. Any
// other `## ` section in the card — Authoring notes, gate results, migration
// notes — is production scaffold and MUST NOT reach the reader (R-10, I7).
// Through V3.8 the renderer rendered every section, which leaked one card's
// authoring notes into its published render (fixed in V3.9, R-33).
function isRenderableSection(sec) {
  const h = sec.header;
  if (/^beat\b/i.test(h) || /^sources\b/i.test(h) || /section divider/i.test(h)) return true;
  // A section that explicitly carries a `BLOCK-…` annotation is content too.
  return sec.lines.some((l) => /^`BLOCK-[a-z0-9-]+`/i.test(l.trim()));
}

// First non-blank line of a section is the `BLOCK-xxx` · eyebrow annotation.
// The text after the middle dot IS the reader-facing eyebrow (R-14: names the
// content, never the position, <= 4 words). Everything after is block body.
function parseSection(sec) {
  // A "## Sources" section defaults to the footnote-source block even when it
  // carries no annotation — the aggregated-source list is its whole job.
  let blockId = /^sources\b/i.test(sec.header) ? "footnote-source" : "standard-text";
  let eyebrow = "";
  let idx = 0;
  for (; idx < sec.lines.length; idx++) {
    if (isBlank(sec.lines[idx])) continue;
    const ann = sec.lines[idx].match(/^`BLOCK-([a-z0-9-]+)`\s*(?:·\s*(.*))?$/i);
    if (ann) {
      blockId = ann[1].toLowerCase();
      eyebrow = (ann[2] || "").replace(/\*/g, "").trim();
      idx++;
    }
    break;
  }
  const lines = sec.lines.slice(idx);
  return { blockId, eyebrow, lines };
}

// Group body lines into paragraph-ish units: blank lines separate, but a
// markdown table (consecutive | … | lines), a list (- …), and a fenced code
// block (``` … ```, blank lines included) each stay one chunk. Fences kept
// whole here render as <pre> downstream (R-33) instead of being shredded into
// paragraphs, which through V3.8 mangled every equation/code block.
function chunk(lines) {
  const out = [];
  let buf = [];
  let inFence = false;
  const flush = () => {
    if (buf.length) out.push(buf.join("\n").trim());
    buf = [];
  };
  for (const l of lines) {
    if (/^```/.test(l.trim())) {
      if (!inFence) flush(); // fence opens its own chunk
      buf.push(l);
      if (inFence) flush(); // closing fence completes the chunk
      inFence = !inFence;
    } else if (inFence) {
      buf.push(l); // blank lines inside a fence stay in the chunk
    } else if (isBlank(l)) {
      flush();
    } else {
      buf.push(l);
    }
  }
  flush();
  return out.filter(Boolean);
}

/* ---- inline-content emitters ------------------------------------------- */

function emitEyebrow(text) {
  return text ? `      <div class="eyebrow">${inlineMd(text)}</div>\n` : "";
}

function takeLeadingTile(chunks) {
  // A leading "### …" line is the section subhead (R-21 26/32 .tile).
  if (chunks.length && /^###\s+/.test(chunks[0])) {
    const tile = chunks[0].replace(/^###\s+/, "").trim();
    return [`      <div class="tile">${inlineMd(tile)}</div>\n`, chunks.slice(1)];
  }
  return ["", chunks];
}

function emitTable(block, cls = "") {
  const rows = block
    .split(/\n/)
    .filter((l) => /^\|/.test(l) && !/^\|\s*-+/.test(l.replace(/\|/g, "|")))
    .map((l) =>
      l
        .replace(/^\|/, "")
        .replace(/\|\s*$/, "")
        .split("|")
        .map((c) => c.trim()),
    );
  // drop separator rows like | --- | --- |
  const data = rows.filter((r) => !r.every((c) => /^:?-+:?$/.test(c)));
  if (!data.length) return "";
  const [head, ...body] = data;
  const attr = cls ? ` class="${cls}"` : "";
  let html = `      <table${attr}>\n        <thead>\n          <tr>`;
  html += head.map((h) => `<th>${inlineMd(h)}</th>`).join("");
  html += "</tr>\n        </thead>\n        <tbody>\n";
  for (const r of body) {
    const isTakeaway = /takeaway/i.test(r[0].replace(/\*/g, ""));
    const tag = isTakeaway ? ' class="takeaway-row"' : "";
    // A `| **Takeaway** | verdict | |` row spans the verdict across the full
    // grid (matching the React DataTable's colSpan cell) — a one-clause
    // verdict crammed into one fixed-layout column is unreadable. A takeaway
    // row carrying multiple content cells (verdict + focal value) keeps its
    // cells, per the BUILD per-block pattern.
    const rest = r.slice(1).map((c) => c.trim()).filter(Boolean);
    if (isTakeaway && r[0].replace(/\*/g, "").trim().toLowerCase() === "takeaway" && rest.length === 1) {
      const verdict = inlineMd(rest[0]).replace(/<\/?strong>/g, "");
      html += `          <tr${tag}><td colspan="${head.length}"><strong>${verdict}</strong></td></tr>\n`;
      continue;
    }
    html += `          <tr${tag}>` + r.map((c) => `<td>${inlineMd(c)}</td>`).join("") + "</tr>\n";
  }
  html += "        </tbody>\n      </table>\n";
  return html;
}

/* ---- V3.7 numeric / chart blocks (R-30, R-31) -------------------------- *
 * Charts and the stat grid are authored as a plain markdown table — the block
 * id, not new syntax, selects chart-vs-table (RENDERING-spec § R-30). The SVG
 * geometry here is duplicated verbatim in app/src/blocks.tsx so a React card
 * and its HTML twin stay pixel-identical (the parity contract). */

const isSepLine = (l) => /-/.test(l) && /^[|\s:-]+$/.test(l.trim());

// Raw cell matrix for a markdown-table chunk (separator rows already dropped).
function tableRows(block) {
  return block
    .split(/\n/)
    .filter((l) => /^\|/.test(l) && !isSepLine(l))
    .map((l) =>
      l
        .replace(/^\|/, "")
        .replace(/\|\s*$/, "")
        .split("|")
        .map((c) => c.trim()),
    );
}

// label/value items from a 2-col table; the single bolded cell is the focal one.
function chartItems(block) {
  const rows = tableRows(block);
  if (rows.length < 2) return [];
  return rows.slice(1).map((r) => {
    const display = (r[1] || "").replace(/\*\*/g, "").trim();
    const num = parseFloat((display.match(/-?[\d.]+/) || ["0"])[0]) || 0;
    const focal = /\*\*/.test(r[0]) || /\*\*/.test(r[1] || "");
    return { label: r[0].replace(/\*\*/g, "").trim(), value: num, display, focal };
  });
}

// The SVG serializers below consume app/src/chart-geometry.mjs — the one home
// of the chart math (R-35). blocks.tsx maps the same geometry to JSX, so the
// HTML twin and the React card stay the same pixels without duplicated math.

function barChartSvg(items) {
  const g = barChartGeometry(items);
  let s = `<svg viewBox="0 0 ${g.W} ${g.H}" role="img" aria-label="bar chart">`;
  for (const r of g.rows) {
    const f = r.focal ? " focal" : "";
    s += `<text class="c-label" x="${r.labelX}" y="${r.cy}" dominant-baseline="middle">${escapeHtml(r.label)}</text>`;
    s += `<rect class="bar${f}" x="${r.barX}" y="${r.barY}" width="${r.barW}" height="${r.barH}" rx="3"/>`;
    s += `<text class="c-value${f}" x="${r.valueX}" y="${r.cy}" dominant-baseline="middle">${escapeHtml(r.display)}</text>`;
  }
  return s + `</svg>`;
}

function lineChartSvg(items) {
  const g = lineChartGeometry(items);
  let s = `<svg viewBox="0 0 ${g.W} ${g.H}" role="img" aria-label="line chart">`;
  for (const gl of g.grid) {
    s += `<line class="grid" x1="${gl.x1}" y1="${gl.y}" x2="${gl.x2}" y2="${gl.y}"/>`;
  }
  s += `<polyline class="series" points="${g.polyline}"/>`;
  for (const p of g.points) {
    const f = p.focal ? " focal" : "";
    s += `<circle class="dot${f}" cx="${p.x}" cy="${p.y}" r="${p.r}"/>`;
    s += `<text class="c-value${f}" x="${p.x}" y="${p.valueY}" text-anchor="${p.anchor}">${escapeHtml(p.display)}</text>`;
    s += `<text class="c-label" x="${p.x}" y="${p.labelY}" text-anchor="${p.anchor}">${escapeHtml(p.label)}</text>`;
  }
  return s + `</svg>`;
}

function columnChartSvg(items) {
  const g = columnChartGeometry(items);
  let s = `<svg viewBox="0 0 ${g.W} ${g.H}" role="img" aria-label="column chart">`;
  s += `<line class="axis" x1="0" y1="${g.baseY}" x2="${g.W}" y2="${g.baseY}"/>`;
  for (const c of g.cols) {
    const f = c.focal ? " focal" : "";
    s += `<rect class="bar${f}" x="${c.x}" y="${c.y}" width="${c.w}" height="${c.h}" rx="3"/>`;
    s += `<text class="c-value${f}" x="${c.cx}" y="${c.valueY}" text-anchor="middle">${escapeHtml(c.display)}</text>`;
    s += `<text class="c-label" x="${c.cx}" y="${c.labelY}" text-anchor="middle">${escapeHtml(c.label)}</text>`;
  }
  return s + `</svg>`;
}

function areaChartSvg(items) {
  const g = areaChartGeometry(items);
  let s = `<svg viewBox="0 0 ${g.W} ${g.H}" role="img" aria-label="area chart">`;
  for (const gl of g.grid) {
    s += `<line class="grid" x1="${gl.x1}" y1="${gl.y}" x2="${gl.x2}" y2="${gl.y}"/>`;
  }
  s += `<path class="area" d="${g.areaPath}"/>`;
  s += `<polyline class="series" points="${g.polyline}"/>`;
  for (const p of g.points) {
    const f = p.focal ? " focal" : "";
    s += `<circle class="dot${f}" cx="${p.x}" cy="${p.y}" r="${p.r}"/>`;
    s += `<text class="c-value${f}" x="${p.x}" y="${p.valueY}" text-anchor="${p.anchor}">${escapeHtml(p.display)}</text>`;
    s += `<text class="c-label" x="${p.x}" y="${p.labelY}" text-anchor="${p.anchor}">${escapeHtml(p.label)}</text>`;
  }
  return s + `</svg>`;
}

function emitChartSection(sec, kind) {
  let [tileHtml, chunks] = takeLeadingTile(chunk(sec.lines));
  let html = "    <section>\n";
  html += emitEyebrow(sec.eyebrow);
  html += tileHtml;
  for (const c of chunks) {
    if (/^\|/.test(c)) {
      const items = chartItems(c);
      if (items.length) {
        const svg =
          kind === "line" ? lineChartSvg(items)
          : kind === "column" ? columnChartSvg(items)
          : kind === "area" ? areaChartSvg(items)
          : barChartSvg(items);
        html += `      <div class="chart">${svg}</div>\n`;
      }
    } else {
      html += `      <p>${inlineMd(c)}</p>\n`;
    }
  }
  return html + "    </section>\n";
}

function emitStatGrid(sec) {
  let [tileHtml, chunks] = takeLeadingTile(chunk(sec.lines));
  let html = "    <section>\n";
  html += emitEyebrow(sec.eyebrow);
  html += tileHtml;
  for (const c of chunks) {
    if (/^\|/.test(c)) {
      let rows = tableRows(c);
      if (c.split(/\n/).some(isSepLine)) rows = rows.slice(1); // drop header row
      if (!rows.length) continue;
      const cls = rows.length % 3 === 0 ? "stat-grid cols-3" : "stat-grid";
      html += `      <div class="${cls}">\n`;
      for (const r of rows) {
        const value = (r[0] || "").replace(/\*\*/g, "").trim();
        const cap = (r[1] || "").replace(/\*\*/g, "").trim();
        html += `        <div class="cell"><div class="num">${inlineMd(value)}</div><div class="cap">${inlineMd(cap)}</div></div>\n`;
      }
      html += "      </div>\n";
    } else {
      html += `      <p>${inlineMd(c)}</p>\n`;
    }
  }
  return html + "    </section>\n";
}

/* ---- V3.8 flashcard list (R-32) ---------------------------------------- *
 * A flashcard list is authored as a headerless `| question | answer |`
 * markdown table — the block id (not new syntax) selects the <dl> visual, the
 * same convention the V3.7 charts use (R-30). Each row becomes one Q/A pair;
 * the dt (question) is the row's single near-black emphasis, the dd (answer)
 * is secondary ink. The markup is duplicated in app/src/blocks.tsx (Flashcards)
 * so the HTML twin and the React card are the same pixels (the parity
 * contract). */
function emitFlashcards(sec) {
  let [tileHtml, chunks] = takeLeadingTile(chunk(sec.lines));
  let html = "    <section>\n";
  html += emitEyebrow(sec.eyebrow);
  html += tileHtml;
  for (const c of chunks) {
    if (/^\|/.test(c)) {
      let rows = tableRows(c);
      if (c.split(/\n/).some(isSepLine)) rows = rows.slice(1); // drop any header row
      rows = rows.filter((r) => (r[0] || "").trim() || (r[1] || "").trim());
      if (!rows.length) continue;
      html += `      <dl class="flashcards">\n`;
      for (const r of rows) {
        const q = (r[0] || "").replace(/\*\*/g, "").trim();
        const a = (r[1] || "").replace(/\*\*/g, "").trim();
        html += `        <div class="fc"><dt>${inlineMd(q)}</dt><dd>${inlineMd(a)}</dd></div>\n`;
      }
      html += "      </dl>\n";
    } else {
      html += `      <p>${inlineMd(c)}</p>\n`;
    }
  }
  return html + "    </section>\n";
}

/*
 * List rendering is selected by BLOCK id (R-33). Through V3.8 every list was
 * emitted as the 13px footnote `.sources` style — so checklists rendered as
 * fine print with literal "[ ]" markers. Each list-bearing block now gets its
 * catalogued treatment:
 *
 *   footnote-source  → <ul class="sources">          (the only fine-print list)
 *   checklist        → body-size rows, ✓ marker      ("[ ]"/"[x]" stripped)
 *   anti-pattern     → body-size rows, ✗ marker
 *   numbered-principle / process-flow
 *                    → <ol>, tabular numeral markers  (also parses "1." lines)
 *   anything else    → plain body-size rows, no marker
 */
const LIST_STYLES = {
  "footnote-source": { tag: "ul", cls: "sources" },
  sources: { tag: "ul", cls: "sources" },
  checklist: { tag: "ul", cls: "checklist", marker: () => "✓" },
  "anti-pattern": { tag: "ul", cls: "antipattern", marker: () => "✗" },
  "numbered-principle": { tag: "ol", marker: (i) => String(i + 1) },
  "process-flow": { tag: "ol", marker: (i) => String(i + 1) },
};

function emitList(block, blockId) {
  // Fold wrapped (indented continuation) lines into their item — dropping
  // them truncated multi-line items mid-sentence through V3.8.
  const items = [];
  for (const l of block.split(/\n/)) {
    if (/^([-*]|\d+\.)\s+/.test(l)) {
      items.push(
        l
          .replace(/^([-*]|\d+\.)\s+/, "")
          .replace(/^\[[ xX]\]\s*/, "") // checkbox syntax is authoring shorthand
          .trim(),
      );
    } else if (!isBlank(l) && items.length) {
      items[items.length - 1] += " " + l.trim();
    }
  }
  if (!items.length) return "";
  const style = LIST_STYLES[blockId] || { tag: "ul" };
  const cls = style.cls ? ` class="${style.cls}"` : "";
  const li = (it, i) =>
    style.marker
      ? `        <li><span class="marker">${style.marker(i)}</span><span>${inlineMd(it)}</span></li>`
      : `        <li>${inlineMd(it)}</li>`;
  return (
    `      <${style.tag}${cls}>\n` +
    items.map(li).join("\n") +
    `\n      </${style.tag}>\n`
  );
}

// A fenced ``` chunk → <pre>, verbatim and escaped (no inline markdown).
const isFence = (c) => /^```/.test(c.trim());
function emitPre(c) {
  const inner = c
    .split(/\n/)
    .filter((l) => !/^```/.test(l.trim()))
    .join("\n");
  return `      <pre>${escapeHtml(inner)}</pre>\n`;
}

// A `> …` chunk → <blockquote> (class "pull" on the pull-quote block).
const isQuote = (c) => /^>\s?/.test(c);
function emitQuote(c, blockId) {
  const text = c.replace(/^>\s?/gm, "").replace(/\n/g, " ").trim();
  const cls = blockId === "pull-quote" ? ' class="pull"' : "";
  return `      <blockquote${cls}>${inlineMd(text)}</blockquote>\n`;
}

// The short line following a quote is its attribution (required on
// pull-quotes, V3.1). Longer follow-ups are commentary and stay body prose.
const isAttribution = (c) =>
  !isQuote(c) && !/^\|/.test(c) && !/\*\*/.test(c) && c.split(/\s+/).length <= 12 && !/\n/.test(c);

const isStandaloneBold = (c) => /^\*\*[^*]+\*\*$/.test(c.trim());
const boldInner = (c) => c.trim().replace(/^\*\*([^*]+)\*\*$/, "$1");

/* ---- block emitters (markup matches app/src/blocks.tsx + the HTML twin) - */

function emitHero(title, sec) {
  const chunks = chunk(sec.lines);
  let dek = "";
  let hook = "";
  const rest = [];
  for (const c of chunks) {
    if (/^###\s+/.test(c)) dek = c.replace(/^###\s+/, "").trim();
    else if (/^>\s+/.test(c)) hook = c.replace(/^>\s*/gm, "").replace(/\n/g, " ").trim();
    else if (/^HERO-CARD:/i.test(c)) continue; // template scaffold, never rendered (I7)
    else rest.push(c);
  }
  let html = "    <section>\n";
  html += emitEyebrow(sec.eyebrow);
  html += `      <h1>${inlineMd(title)}</h1>\n`;
  if (dek) html += `      <p class="dek">${inlineMd(dek)}</p>\n`;
  if (hook) html += `      <div class="hero">\n        <p class="hook">${inlineMd(hook)}</p>\n      </div>\n`;
  rest.forEach((c, i) => {
    const cls = i === 0 ? ' class="lede"' : "";
    html += `      <p${cls}>${inlineMd(c)}</p>\n`;
  });
  html += "    </section>\n";
  return html;
}

function emitGeneric(sec, { statMode = false, takeawayMode = false } = {}) {
  let [tileHtml, chunks] = takeLeadingTile(chunk(sec.lines));
  let html = "    <section>\n";
  html += emitEyebrow(sec.eyebrow);
  html += tileHtml;
  let usedTakeaway = false;
  const isQuoteBlock = sec.blockId === "pull-quote" || sec.blockId === "quote-as-evidence";
  let prevWasQuote = false;
  for (const c of chunks) {
    const afterQuote = prevWasQuote;
    prevWasQuote = false;
    if (isFence(c)) html += emitPre(c);
    else if (isQuote(c)) {
      html += emitQuote(c, sec.blockId);
      prevWasQuote = isQuoteBlock;
    } else if (/^\|/.test(c)) html += emitTable(c, sec.blockId === "timeline" ? "timeline" : "");
    else if (/^([-*]|\d+\.)\s+/m.test(c)) html += emitList(c, sec.blockId);
    else if (isStandaloneBold(c)) {
      if (takeawayMode && !usedTakeaway) {
        html += `      <p class="takeaway"><strong>${inlineMd(boldInner(c)).replace(/<\/?strong>/g, "")}</strong></p>\n`;
        usedTakeaway = true;
      } else if (statMode) {
        html += `      <div class="stat">${inlineMd(boldInner(c)).replace(/<\/?strong>/g, "")}</div>\n`;
      } else {
        html += `      <p>${inlineMd(c)}</p>\n`;
      }
    } else if (afterQuote && isAttribution(c)) {
      html += `      <p class="attrib">${inlineMd(c)}</p>\n`;
    } else {
      html += `      <p>${inlineMd(c)}</p>\n`;
    }
  }
  html += "    </section>\n";
  return html;
}

// section-divider — the beat-boundary block (chapter break, not paragraph
// break). Renders on its own `.divider` section so the breathier symmetric
// padding applies; the content is the divider's one orienting line.
function emitDivider(sec) {
  let [tileHtml, chunks] = takeLeadingTile(chunk(sec.lines));
  let html = '    <section class="divider">\n';
  html += emitEyebrow(sec.eyebrow);
  html += tileHtml;
  for (const c of chunks) {
    html += `      <p>${inlineMd(c)}</p>\n`;
  }
  return html + "    </section>\n";
}

function emitSection(title, sec) {
  switch (sec.blockId) {
    case "loft-card":
    case "hook":
      return emitHero(title, sec);
    case "stat-callout":
      return emitGeneric(sec, { statMode: true });
    case "stat-grid":
      return emitStatGrid(sec);
    case "flashcard-list":
      return emitFlashcards(sec);
    case "bar-chart":
      return emitChartSection(sec, "bar");
    case "line-chart":
      return emitChartSection(sec, "line");
    case "column-chart":
      return emitChartSection(sec, "column");
    case "area-chart":
      return emitChartSection(sec, "area");
    case "section-divider":
      return emitDivider(sec);
    case "key-takeaway":
      return emitGeneric(sec, { takeawayMode: true });
    default:
      // table, standard-text, footnote-source, definition, etc. all flow
      // through the generic emitter — tables and lists are detected per chunk.
      return emitGeneric(sec);
  }
}

/* ---- whole-document assembly ------------------------------------------- */

function renderCard(cardPath) {
  const raw = readFileSync(cardPath, "utf8");
  const { title, fm, body } = parseCard(raw);
  const css = readFileSync(CSS_PATH, "utf8");
  const contentHash = createHash("sha256").update(raw).digest("hex");
  const renderedAt = new Date().toISOString().slice(0, 10);
  const ver = versionLabel(fm);
  const sourceRel = relative(repo, cardPath);

  const allSections = splitSections(body);
  const skipped = allSections.filter((s) => !isRenderableSection(s));
  for (const s of skipped) {
    console.log(`[render]   scaffold section skipped (never rendered): "## ${s.header}"`);
  }
  const sections = allSections
    .filter(isRenderableSection)
    .map((sec) => emitSection(title, parseSection(sec)))
    .join("\n");

  const meta = [
    `<meta name="sc:source_file" content="${escapeHtml(sourceRel)}">`,
    `<meta name="sc:research_report" content="${escapeHtml(fm.research_report || "")}">`,
    `<meta name="sc:renderer_version" content="${RENDERER_VERSION}">`,
    `<meta name="sc:frozen_at_version" content="${escapeHtml(fm.frozen_at_version || "")}">`,
    `<meta name="sc:rendered_at" content="${renderedAt}">`,
    `<meta name="sc:content_hash" content="${contentHash}">`,
  ].join("\n");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=393, initial-scale=1">
<meta name="color-scheme" content="only light">
<title>${escapeHtml(title)} — Supercard ${ver.toUpperCase()}</title>
${meta}
<!-- Styles inlined verbatim from app/src/supercard.css — the single source of
     truth for layout/type/colour. The .canvas class chain below resolves this
     card's frozen_at_version rule library (ADR-0010). Do not hand-edit. -->
<style>
${css.trim()}
</style>
</head>
<body>
  <a class="card-back" href="../../" aria-label="Back to gallery"><span class="back-btn"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg></span></a>
  <div class="${canvasClasses(fm)}">

${sections}
  </div>
  <div class="glyph">✦ berafoot.com</div>
</body>
</html>
`;
  return { html, fm, title, contentHash };
}

/* ---- gallery upsert ---------------------------------------------------- */

function galleryEntry(slug, title, fm, prevDesc) {
  const len = fm.length || "";
  const stamp = [versionLabel(fm), fm.lifecycle].filter(Boolean).join(" ");
  const meta = [slug, len, stamp].filter(Boolean).join(" · ");
  // Prefer an authored one-line `summary`; preserve a curated desc on
  // re-render; fall back to tags only if nothing better exists.
  const desc = (fm.summary || prevDesc || fm.tags || "").trim();
  return `    <a class="card-link" href="cards/${slug}.html">
      <div class="card-title">${escapeHtml(title)}</div>
      <div class="card-meta">${escapeHtml(meta)}</div>
      ${desc ? `<div class="card-desc">${escapeHtml(desc)}</div>` : ""}
    </a>`;
}

function upsertGallery(slug, title, fm) {
  let gal = readFileSync(GALLERY, "utf8");
  const linkRe = new RegExp(
    `\\s*<a class="card-link" href="cards/${slug}\\.html">[\\s\\S]*?</a>`,
  );
  const existing = gal.match(linkRe)?.[0] ?? "";
  const prevDesc = existing.match(/<div class="card-desc">([\s\S]*?)<\/div>/)?.[1]?.trim();
  const entry = galleryEntry(slug, title, fm, prevDesc);
  if (linkRe.test(gal)) {
    gal = gal.replace(linkRe, "\n" + entry);
  } else {
    // Insert newest-at-top, right after the "Cards" section label.
    gal = gal.replace(
      /(<div class="section-label">Cards<\/div>\n)/,
      `$1\n${entry}\n`,
    );
  }
  writeFileSync(GALLERY, gal);
}

/* ---- main -------------------------------------------------------------- */

function cardList(argv) {
  if (argv.length) return argv.map((p) => resolve(process.cwd(), p));
  return readdirSync(CARDS_DIR)
    .filter((f) => /^CARD-.*\.md$/.test(f))
    .map((f) => resolve(CARDS_DIR, f));
}

let rendered = 0;
for (const cardPath of cardList(process.argv.slice(2))) {
  if (!statSync(cardPath).isFile()) continue;
  const slug = basename(cardPath).replace(/--draft|--published|--archived/, "").replace(/\.md$/, "");
  const { html, fm, title } = renderCard(cardPath);
  const outPath = resolve(RENDER_DIR, `${slug}.html`);
  writeFileSync(outPath, html);
  upsertGallery(slug, title, fm);
  rendered++;
  console.log(`[render] ${relative(repo, cardPath)} -> ${relative(repo, outPath)}  (frozen ${fm.frozen_at_version || "?"})`);
}
console.log(`\n[render] ${rendered} card${rendered === 1 ? "" : "s"} rendered + gallery updated.`);
