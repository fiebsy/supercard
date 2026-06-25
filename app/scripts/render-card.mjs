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
const RENDERER_VERSION = "v3.5";

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
<meta name="color-scheme" content="light">
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
