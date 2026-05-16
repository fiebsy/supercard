/*
 * validate-v3-1.mjs — surfaces V3.1 ADHD-scan-ability violations in cards.
 *
 *   node scripts/validate-v3-1.mjs                # scan every card
 *   node scripts/validate-v3-1.mjs <card.md...>   # scan named cards
 *
 * Reads frozen_at_version from the card's frontmatter table. Skips cards
 * frozen below 3.1.0 (they are governed by V3.0 rules per ADR-0003).
 *
 *   Errors  (exit 1) — must fix before publishing:
 *     - block contains >= 2 bolded runs
 *     - standard-text block missing the opening bolded lead-clause
 *     - table with >= 4 data rows missing a bolded **Takeaway** row
 *     - context-chip strip (>= 3 middle-dot-separated UPPERCASE tokens on
 *       its own line) appears anywhere a dek or lead-clause sentence would
 *       integrate the same facts (R-14)
 *     - scaffold leakage on V3.3+ cards: a standalone BEAT N / N / TOTAL
 *       line on the rendered canvas. The pre-V3.3 micro-folio was permitted;
 *       R-10 (V3.3) and identity invariant I7 prohibit it.
 *
 *   Warnings (exit 0, printed) — fix where possible:
 *     - standard-text block exceeds 75 words or 4 sentences
 *     - beat has > 4 consecutive content blocks without an asterism/anchor
 *     - beat with >= 5 blocks missing the asterism (⁂) rest
 *     - per-beat anchor:content ratio outside the 1:2..1:4 band
 *
 * The validator is opt-in (V3.1+ only) and does not block the build.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve, relative } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const repo = resolve(here, "../..");
const cardsDir = resolve(repo, "30-CARDS");

/* ------------------------------------------------------------------ *
 * Parsing
 * ------------------------------------------------------------------ */

function parseMeta(raw) {
  const meta = {};
  for (const line of raw.split("\n")) {
    const m = /^\|\s*([a-z_]+)\s*\|\s*(.+?)\s*\|\s*$/.exec(line);
    if (m) meta[m[1]] = m[2];
  }
  return meta;
}

function compareVersion(a, b) {
  const pa = a.split(".").map(Number);
  const pb = b.split(".").map(Number);
  for (let i = 0; i < 3; i++) {
    const d = (pa[i] || 0) - (pb[i] || 0);
    if (d !== 0) return d;
  }
  return 0;
}

// Each `## Beat N — Name` heading delimits one block. Multi-block beats
// repeat the heading, so blocks group naturally by `beat` after parsing.
function parseBlocks(raw) {
  const lines = raw.split("\n");
  const blocks = [];
  let cur = null;
  for (const line of lines) {
    const m = /^##\s+Beat\s+(\d+)\s*[—-]\s*(.+?)\s*$/.exec(line);
    if (m) {
      if (cur) blocks.push(cur);
      cur = {
        beat: Number(m[1]),
        beatName: m[2].trim().replace(/\s*\(.*\)\s*$/, ""),
        type: null,
        lines: [],
        bodyText: "",
        startLine: 0,
      };
      continue;
    }
    if (cur) {
      cur.lines.push(line);
      const t = /`BLOCK-([\w-]+)`/.exec(line);
      if (t && !cur.type) cur.type = t[1];
    }
  }
  if (cur) blocks.push(cur);
  for (const b of blocks) {
    b.bodyText = b.lines
      .filter((l) => !/`BLOCK-[\w-]+`/.test(l))
      .join("\n")
      .trim();
  }
  return blocks;
}

/* ------------------------------------------------------------------ *
 * Block classification (anchor vs content)
 * ------------------------------------------------------------------ */

const ANCHOR_TYPES = new Set([
  "stat-callout",
  "pull-quote",
  "key-takeaway",
  "numbered-principle",
  "loft-card",
  "quote-as-evidence",
]);
const CONTENT_TYPES = new Set([
  "standard-text",
  "faq",
  "code",
]);

function classify(block) {
  if (block.type && ANCHOR_TYPES.has(block.type)) return "anchor";
  if (block.type === "table") {
    return /^\s*\|.*\*\*Takeaway\*\*/m.test(block.bodyText) ? "anchor" : "content";
  }
  if (block.type && CONTENT_TYPES.has(block.type)) return "content";
  return "content"; // unknown / chart types are scan-equivalent to content
}

/* ------------------------------------------------------------------ *
 * Rules
 * ------------------------------------------------------------------ */

// "Bolded runs" for the single-emphasis rule means *emphasis* bolds, not
// structural labels. Strip known structural markers before counting:
//   - The HERO-CARD title line: `HERO-CARD: **Title**`
//   - Named structural labels: **Lede.**, **Takeaway**, **Why it matters.**,
//     **How to apply.**, **Note.**, **Hero.**, **Authoring notes.**
// Anything left over is content emphasis — there must be at most one per block.
const LABEL_BOLDS = [
  /\*\*Lede\.\*\*/g,
  /\*\*Takeaway\*\*/gi,
  /\*\*Why it matters\.?\*\*/g,
  /\*\*How to apply\.?\*\*/g,
  /\*\*Note\.\*\*/g,
  /\*\*Hero\.\*\*/g,
  /\*\*Authoring notes\.?\*\*/g,
  /\*\*Sources\.?\*\*/g,
];
function countBoldRuns(text) {
  let stripped = text.replace(/^\s*HERO-CARD:.*$/gm, "");
  for (const r of LABEL_BOLDS) stripped = stripped.replace(r, "");
  return (stripped.match(/\*\*[^*\n]+\*\*/g) || []).length;
}

function startsWithBoldedLead(text) {
  // Trim metadata lines (e.g. HERO-CARD: ..., `BLOCK-foo` lines, blockquote
  // markers) and find the first prose-bearing paragraph.
  const cleaned = text
    .replace(/^\s*HERO-CARD:.*$/gm, "")
    .replace(/^\s*`BLOCK-[\w-]+`.*$/gm, "")
    .replace(/^\s*>\s?/gm, "")
    .replace(/^\s*\*Lede\.\*?\s*/m, "")
    .trim();
  return /^\*\*[^*]{2,80}\*\*[.\s—-]/.test(cleaned);
}

function countWords(text) {
  return (text
    .replace(/`[^`]*`/g, " ")
    .replace(/\*+/g, "")
    .replace(/[#>|*_]/g, " ")
    .match(/\b[\w'-]+\b/g) || []).length;
}

function countSentences(text) {
  return (text.match(/[.!?](?:\s|$)/g) || []).length;
}

function tableDataRows(text) {
  // Count pipe rows in the body excluding the header + separator row.
  const rows = text.split("\n").filter((l) => /^\s*\|.*\|\s*$/.test(l));
  if (rows.length < 3) return 0; // header + sep + at least one data row
  const dataRows = rows.slice(2);
  // Skip a final takeaway row from the count of "data" rows so we match the
  // spec's "rows of comparison data" notion (G-11 phrasing).
  return dataRows.filter((r) => !/\*\*Takeaway\*\*/i.test(r)).length;
}

function hasTakeawayRow(text) {
  return /^\s*\|.*\*\*Takeaway\*\*/im.test(text);
}

function hasAsterism(text) {
  return /⁂/.test(text);
}

// R-14 context-chip strip: a standalone line of the form
//   `WORD · WORD · WORD` (3+ middle-dot-separated UPPERCASE tokens).
// Detected after stripping bold/italic markers so `**A · B · C**` and
// `*A · B · C*` also catch. The surrounding pipe rule excludes table cells.
function findChipStrips(text) {
  const hits = [];
  for (const raw of text.split("\n")) {
    if (/\|/.test(raw)) continue; // skip table rows
    const line = raw.replace(/[*_`>]/g, "").trim();
    if (!line) continue;
    const tokens = line.split(/\s*·\s*/);
    if (tokens.length < 3) continue;
    // Each chip is short, starts with a letter/digit, and is upper-case-ish:
    // letters, digits, spaces, comma, period, dash, slash. ≤ 30 chars.
    const allLabelLike = tokens.every((t) => /^[A-Z0-9][A-Z0-9 ,./-]{0,29}$/.test(t));
    if (allLabelLike) hits.push(line);
  }
  return hits;
}

// R-10 (V3.3) scaffold leakage: any standalone `BEAT N` / `N / TOTAL` /
// `MECHANISM · 4 / 7` style line on the rendered canvas. The pre-V3.3 micro-folio
// was an exception; in V3.3+ it is itself the error this checks for.
function findScaffoldLeaks(text) {
  const hits = [];
  for (const raw of text.split("\n")) {
    if (/\|/.test(raw)) continue; // skip table rows
    const line = raw.replace(/[*_`>]/g, "").trim();
    if (!line) continue;
    if (/^BEAT\s+\d+\s*·/i.test(line)) hits.push(line);
    else if (/^\d+\s*\/\s*\d+\s*$/.test(line)) hits.push(line);
  }
  return hits;
}

/* ------------------------------------------------------------------ *
 * Validation
 * ------------------------------------------------------------------ */

function validateCard(path, raw) {
  const errors = [];
  const warnings = [];
  const push = (arr, blk, msg) =>
    arr.push({ path, beat: blk?.beat ?? null, type: blk?.type ?? null, msg });

  const meta = parseMeta(raw);
  const fav = meta.frozen_at_version || meta.version;
  if (!fav) {
    return { skipped: true, reason: "no frozen_at_version", errors, warnings };
  }
  if (compareVersion(fav, "3.1.0") < 0) {
    return { skipped: true, reason: `frozen at ${fav} (< 3.1.0)`, errors, warnings };
  }

  const blocks = parseBlocks(raw);

  // ------- per-block rules
  for (const b of blocks) {
    if (b.beat > 7) continue; // skip Sources / Authoring notes
    const boldCount = countBoldRuns(b.bodyText);
    if (boldCount >= 2) {
      push(errors, b, `block has ${boldCount} bolded runs (single-emphasis: max 1)`);
    }
    if (b.type === "standard-text") {
      if (!startsWithBoldedLead(b.bodyText)) {
        push(errors, b, `standard-text missing bolded lead-clause (G-7)`);
      }
      const words = countWords(b.bodyText);
      if (words > 75) {
        push(warnings, b, `standard-text exceeds 75-word cap (${words} words; G-8)`);
      }
      const sents = countSentences(b.bodyText);
      if (sents > 4) {
        push(warnings, b, `standard-text exceeds 4-sentence cap (${sents} sentences; G-8)`);
      }
    }
    if (b.type === "table" || /^\s*\|.*\|/m.test(b.bodyText)) {
      const dataRows = tableDataRows(b.bodyText);
      if (dataRows >= 4 && !hasTakeawayRow(b.bodyText)) {
        push(errors, b, `table has ${dataRows} data rows without a **Takeaway** row (G-11)`);
      }
    }
    for (const strip of findChipStrips(b.bodyText)) {
      push(errors, b, `context-chip strip "${strip}" — labels integrate facts in prose; promote to dek or lead-clause (R-14)`);
    }
    if (compareVersion(fav, "3.3.0") >= 0) {
      for (const leak of findScaffoldLeaks(b.bodyText)) {
        push(errors, b, `scaffold leakage "${leak}" — beat labels and position counters do not appear in the rendered card (R-10 V3.3, I7)`);
      }
    }
  }

  // ------- per-beat rules
  const byBeat = new Map();
  for (const b of blocks) {
    if (b.beat > 7) continue;
    if (!byBeat.has(b.beat)) byBeat.set(b.beat, []);
    byBeat.get(b.beat).push(b);
  }
  for (const [beat, list] of byBeat) {
    let consecutiveContent = 0;
    let hadAsterism = false;
    let anchors = 0;
    let contents = 0;
    for (const b of list) {
      if (hasAsterism(b.bodyText)) {
        hadAsterism = true;
        consecutiveContent = 0;
        continue;
      }
      const k = classify(b);
      if (k === "anchor") {
        anchors++;
        consecutiveContent = 0;
      } else {
        contents++;
        consecutiveContent++;
        if (consecutiveContent > 4) {
          push(warnings, b, `beat ${beat}: > 4 consecutive content blocks without an anchor or ⁂ (G-9)`);
        }
      }
    }
    if (list.length >= 5 && !hadAsterism) {
      push(warnings, { beat }, `beat ${beat}: ${list.length} blocks but no ⁂ asterism rest after block 4 (G-10)`);
    }
    if (anchors > 0 && contents > 0) {
      const ratio = contents / anchors;
      if (ratio < 2 || ratio > 4) {
        push(
          warnings,
          { beat },
          `beat ${beat}: anchor:content ratio is 1:${ratio.toFixed(2)} (outside 1:2..1:4 band; G-9)`,
        );
      }
    }
  }

  return { skipped: false, errors, warnings, blocks: blocks.length };
}

/* ------------------------------------------------------------------ *
 * Driver
 * ------------------------------------------------------------------ */

function collectCards(args) {
  if (args.length) return args.map((p) => resolve(process.cwd(), p));
  return readdirSync(cardsDir)
    .filter((f) => f.endsWith(".md") && f.toUpperCase().startsWith("CARD-"))
    .map((f) => resolve(cardsDir, f));
}

const paths = collectCards(process.argv.slice(2));
let totalErrors = 0;
let totalWarnings = 0;
let scanned = 0;
let skipped = 0;

for (const path of paths) {
  if (!statSync(path).isFile()) continue;
  const raw = readFileSync(path, "utf8");
  const rel = relative(repo, path);
  const res = validateCard(path, raw);
  if (res.skipped) {
    skipped++;
    console.log(`[validate] skip ${rel} (${res.reason})`);
    continue;
  }
  scanned++;
  for (const e of res.errors) {
    console.error(`  ERROR  ${rel}  beat ${e.beat ?? "?"} (${e.type ?? "?"}): ${e.msg}`);
  }
  for (const w of res.warnings) {
    console.warn(`  warn   ${rel}  beat ${w.beat ?? "?"} (${w.type ?? "?"}): ${w.msg}`);
  }
  if (!res.errors.length && !res.warnings.length) {
    console.log(`  ok     ${rel} (${res.blocks} blocks)`);
  }
  totalErrors += res.errors.length;
  totalWarnings += res.warnings.length;
}

console.log(
  `\n[validate] scanned ${scanned}, skipped ${skipped} — ${totalErrors} error${totalErrors === 1 ? "" : "s"}, ${totalWarnings} warning${totalWarnings === 1 ? "" : "s"}`,
);
process.exit(totalErrors > 0 ? 1 : 0);
