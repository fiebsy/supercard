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

const here = dirname(fileURLToPath(import.meta.url));
const repo = resolve(here, "../..");
const CARDS_DIR = resolve(repo, "30-CARDS");
const RENDER_DIR = resolve(repo, "docs/cards");
const GALLERY = resolve(repo, "docs/index.html");
const CSS_PATH = resolve(repo, "app/src/supercard.css");

// The renderer's own version — emitted as sc:renderer_version. Bump when the
// emitted markup changes shape (not when a card's frozen_at_version changes).
const RENDERER_VERSION = "v3.6";

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

// First non-blank line of a section is the `BLOCK-xxx` · eyebrow annotation.
// The text after the middle dot IS the reader-facing eyebrow (R-14: names the
// content, never the position, <= 4 words). Everything after is block body.
function parseSection(sec) {
  let blockId = "standard-text";
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
// markdown table (consecutive | … | lines) and list (- …) stay together.
function chunk(lines) {
  const out = [];
  let buf = [];
  const flush = () => {
    if (buf.length) out.push(buf.join("\n").trim());
    buf = [];
  };
  for (const l of lines) {
    if (isBlank(l)) flush();
    else buf.push(l);
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

function emitTable(block) {
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
  let html = "      <table>\n        <thead>\n          <tr>";
  html += head.map((h) => `<th>${inlineMd(h)}</th>`).join("");
  html += "</tr>\n        </thead>\n        <tbody>\n";
  for (const r of body) {
    const isTakeaway = /takeaway/i.test(r[0].replace(/\*/g, ""));
    const tag = isTakeaway ? ' class="takeaway-row"' : "";
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

const round1 = (x) => Math.round(x * 10) / 10;
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

function barChartSvg(items) {
  const W = 361, labelW = 120, padR = 8, rowH = 34, barH = 20, valueW = 38;
  const n = items.length;
  const H = n * rowH + 4;
  const max = Math.max(...items.map((d) => d.value), 0) || 1;
  const barAreaW = W - labelW - padR - valueW;
  let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="bar chart">`;
  items.forEach((d, i) => {
    const cy = i * rowH + rowH / 2;
    const barW = Math.max(2, (d.value / max) * barAreaW);
    const by = i * rowH + (rowH - barH) / 2;
    const f = d.focal ? " focal" : "";
    s += `<text class="c-label" x="0" y="${cy}" dominant-baseline="middle">${escapeHtml(d.label)}</text>`;
    s += `<rect class="bar${f}" x="${labelW}" y="${by}" width="${round1(barW)}" height="${barH}" rx="3"/>`;
    s += `<text class="c-value${f}" x="${round1(labelW + barW + 6)}" y="${cy}" dominant-baseline="middle">${escapeHtml(d.display)}</text>`;
  });
  return s + `</svg>`;
}

function lineChartSvg(items) {
  const W = 361, H = 168, padL = 10, padR = 10, padT = 18, padB = 30;
  const n = items.length;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;
  const vals = items.map((d) => d.value);
  const min = Math.min(...vals), max = Math.max(...vals);
  const range = max - min || 1;
  const x = (i) => padL + (n === 1 ? plotW / 2 : (i / (n - 1)) * plotW);
  const y = (v) => padT + (1 - (v - min) / range) * plotH;
  let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="line chart">`;
  for (let g = 0; g <= 2; g++) {
    const gy = round1(padT + (g / 2) * plotH);
    s += `<line class="grid" x1="${padL}" y1="${gy}" x2="${W - padR}" y2="${gy}"/>`;
  }
  const pts = items.map((d, i) => `${round1(x(i))},${round1(y(d.value))}`).join(" ");
  s += `<polyline class="series" points="${pts}"/>`;
  items.forEach((d, i) => {
    const f = d.focal ? " focal" : "";
    const px = round1(x(i)), py = round1(y(d.value));
    s += `<circle class="dot${f}" cx="${px}" cy="${py}" r="${d.focal ? 5 : 4}"/>`;
    s += `<text class="c-value${f}" x="${px}" y="${round1(py - 9)}" text-anchor="middle">${escapeHtml(d.display)}</text>`;
    s += `<text class="c-label" x="${px}" y="${H - 8}" text-anchor="middle">${escapeHtml(d.label)}</text>`;
  });
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
        const svg = kind === "line" ? lineChartSvg(items) : barChartSvg(items);
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

function emitList(block, cls) {
  const items = block
    .split(/\n/)
    .filter((l) => /^[-*]\s+/.test(l))
    .map((l) => l.replace(/^[-*]\s+/, "").trim());
  if (!items.length) return "";
  const c = cls ? ` class="${cls}"` : "";
  return (
    `      <ul${c}>\n` +
    items.map((it) => `        <li>${inlineMd(it)}</li>`).join("\n") +
    `\n      </ul>\n`
  );
}

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
  for (const c of chunks) {
    if (/^\|/.test(c)) html += emitTable(c);
    else if (/^[-*]\s+/m.test(c)) html += emitList(c, "sources");
    else if (isStandaloneBold(c)) {
      if (takeawayMode && !usedTakeaway) {
        html += `      <p class="takeaway"><strong>${inlineMd(boldInner(c)).replace(/<\/?strong>/g, "")}</strong></p>\n`;
        usedTakeaway = true;
      } else if (statMode) {
        html += `      <div class="stat">${inlineMd(boldInner(c)).replace(/<\/?strong>/g, "")}</div>\n`;
      } else {
        html += `      <p>${inlineMd(c)}</p>\n`;
      }
    } else {
      html += `      <p>${inlineMd(c)}</p>\n`;
    }
  }
  html += "    </section>\n";
  return html;
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

  const sections = splitSections(body)
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
<meta name="viewport" content="width=device-width, initial-scale=1">
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
  <div class="glyph">◆ supercard · ${ver} atlas</div>
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
