/*
 * validate-v3-1.mjs — surfaces ADHD-scan-ability violations in cards.
 *
 * Validates V3.1+ cards: V3.1, V3.2, V3.3, V3.4. Filename retained from the
 * V3.1 launch; the validator is version-aware via the card's frontmatter
 * `frozen_at_version` and applies the rule set for that version (and any
 * versions inherited).
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
 *     - (V3.4+) prose block has zero anchor — no bolded lead-clause, focal
 *       stat, definition term, takeaway row, or attribution (R-17)
 *     - (V3.4+) position-language transition between beats — "Section N",
 *       "Next up", "Now we move to…" (G-14)
 *     - (V3.4+) meta-language transition between beats — "In the following
 *       section", "Let's look at…", "As mentioned above" (G-14)
 *     - (V3.4+) more than two readability warnings on a single card (G9)
 *     - (V3.4+) `apple_register: true` declared alongside R-9 customization
 *       in the same card (R-18)
 *     - (V3.4+) mixed beat-gap sizes within a single card (R-15)
 *     - (V3.4+) card uses both --surface-tint and --g-06 hairline on
 *       different blocks (R-16)
 *     - (spec) a R-20 text-ink token computes < 4.5:1 on white (< 3:1 for
 *       large text >= 24px). Unrounded — 4.499:1 fails. Run once per invocation.
 *     - (V3.5+) `apple_register` declared on a V3.5 card — R-18 is superseded,
 *       its display tightening folded into the R-19 default (R-18/R-19)
 *     - (V3.5+) positive body letter-spacing re-introduced via a frontmatter
 *       override — retired by R-19 (body is −0.01em, word-spacing normal)
 *     - (V3.6+) em dash (—) in reader-visible card content (R-24)
 *     - (V3.6+) asterism rest (⁂ / "* * *") in card content — retired in V3.6
 *       (R-24, supersedes R-11/G-10); macro-spacing does the rest-the-eye work
 *
 *   Warnings (exit 0, printed) — fix where possible:
 *     - standard-text block exceeds 75 words or 4 sentences
 *     - beat has > 4 consecutive content blocks without an anchor (G-9)
 *     - per-beat anchor:content ratio outside the 1:2..1:4 band
 *     - (V3.4+) standard-text block exceeds 60 words (G-12 mobile cap)
 *     - (V3.4+) prose block tests above Flesch-Kincaid grade 9 (G-13)
 *     - (V3.4+) prose block tests below Flesch Reading Ease 60 (G-13)
 *     - (V3.4+) prose block average sentence length above 20 words (G-13)
 *     - (V3.4+) eyebrow / tagline paraphrases the body below it (G-14)
 *
 * The validator is opt-in (V3.1+ only) and does not block the build.
 */
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { dirname, resolve, relative, basename } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const repo = resolve(here, "../..");
const cardsDir = resolve(repo, "30-CARDS");
const renderDir = resolve(repo, "docs/cards");
const galleryPath = resolve(repo, "docs/index.html");

/* ------------------------------------------------------------------ *
 * WCAG 2.2 contrast — R-20 text-ink ladder check (V3.5+).
 *
 * Every V3.5 text-ink token must compute >= 4.5:1 on its background
 * (>= 3:1 only for large text >= 24px). WCAG values are NOT rounded: a
 * token computing 4.499:1 fails. We re-check against --surface-tint
 * (rgba(0,0,0,0.025) composited over white) as well as pure white, because
 * tinted-surface cards (R-16) read text on the tint, not on #FFF.
 * ------------------------------------------------------------------ */

const TEXT_FLOOR = 4.5; // SC 1.4.3 normal text
const LARGE_TEXT_FLOOR = 3.0; // SC 1.4.3 large text (>= 24px)

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
}

function srgbToLinear(c) {
  const cs = c / 255;
  return cs <= 0.03928 ? cs / 12.92 : Math.pow((cs + 0.055) / 1.055, 2.4);
}

function relLuminance([r, g, b]) {
  return 0.2126 * srgbToLinear(r) + 0.7152 * srgbToLinear(g) + 0.0722 * srgbToLinear(b);
}

// Contrast ratio, unrounded. fg/bg are [r,g,b] in 0..255.
function contrastRatio(fg, bg) {
  const l1 = relLuminance(fg);
  const l2 = relLuminance(bg);
  const [hi, lo] = l1 >= l2 ? [l1, l2] : [l2, l1];
  return (hi + 0.05) / (lo + 0.05);
}

// Composite an rgba(0,0,0,alpha) tint over white -> opaque [r,g,b].
function blackTintOverWhite(alpha) {
  const v = 255 * (1 - alpha);
  return [v, v, v];
}

const WHITE = [255, 255, 255];
const SURFACE_TINT = blackTintOverWhite(0.025); // --surface-tint, R-16

// R-20 text-ink ladder. minPx 0 means "used at body/caption size" -> the
// 4.5:1 normal-text floor applies. The demoted grays are listed so the
// self-check documents WHY they're non-text-only.
const INK_LADDER_V35 = [
  { token: "--ink", hex: "#1A1A1A", role: "Primary (essence)" },
  { token: "--ink-2", hex: "#595959", role: "Secondary (dive-deeper)" },
  { token: "--ink-3", hex: "#767676", role: "Tertiary (support)" },
];
const DEMOTED_GRAYS = [
  { token: "--ink-4", hex: "#888888" },
  { token: "--ink-5", hex: "#BBBBBB" },
  { token: "--g-30", rgb: blackTintOverWhite(0.3), label: "rgba(0,0,0,0.30)" },
];

// Returns { errors, notes }. Errors fail the build (exit 1) just like card
// errors. This validates the SPEC's own ink tokens, version-independent.
function checkInkLadderContrast() {
  const errors = [];
  const notes = [];
  for (const tier of INK_LADDER_V35) {
    const fg = hexToRgb(tier.hex);
    const onWhite = contrastRatio(fg, WHITE);
    const onTint = contrastRatio(fg, SURFACE_TINT);
    notes.push(
      `R-20 ${tier.token} ${tier.hex} — ${onWhite.toFixed(2)}:1 on white, ${onTint.toFixed(2)}:1 on --surface-tint (${tier.role})`,
    );
    if (onWhite < TEXT_FLOOR) {
      errors.push(
        `R-20 text-ink ${tier.token} ${tier.hex} computes ${onWhite.toFixed(3)}:1 on white — below the ${TEXT_FLOOR}:1 text floor (WCAG 2.2 SC 1.4.3)`,
      );
    }
  }
  // The demoted grays MUST fail the text floor (that's why they're non-text-only).
  // If one ever passes, the demotion note is stale and should be revisited.
  for (const g of DEMOTED_GRAYS) {
    const fg = g.rgb || hexToRgb(g.hex);
    const onWhite = contrastRatio(fg, WHITE);
    notes.push(
      `R-20 (non-text only) ${g.token} ${g.label || g.hex} — ${onWhite.toFixed(2)}:1 on white${onWhite >= LARGE_TEXT_FLOOR ? ` (>= ${LARGE_TEXT_FLOOR}:1: large text >= 24px only)` : ""}`,
    );
  }
  return { errors, notes };
}

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

// V3.6 (R-24): the asterism is retired. This now detects a *violation* — the
// `⁂` glyph or a literal `* * *` / `***` thematic-break line (a `---` beat
// fence is permitted scaffold, stripped by the renderer, and is NOT flagged).
function hasAsterism(text) {
  return /⁂/.test(text) || /^[ \t]*(?:\*[ \t]*){3,}$/m.test(text);
}

// V3.6 (R-24): no em dash (U+2014) renders in reader-visible card content. En
// dashes (ranges) and the minus sign are unaffected. The `## Beat N — Name`
// heading separator is authoring scaffold and never reaches a block's bodyText.
function hasEmDash(text) {
  return /—/.test(text);
}

/* ------------------------------------------------------------------ *
 * V3.4 helpers — readability, anchor presence, transition vocabulary,
 * spacing-token / register consistency.
 *
 * Readability uses a standard Flesch-Kincaid implementation with a
 * vowel-cluster syllable heuristic — same family as the npm `flesch`
 * and `readability-scores` packages, inlined to avoid adding a runtime
 * dependency. Tracks Flesch-Kincaid grade level, Flesch Reading Ease,
 * and average sentence length per block (G-13).
 * ------------------------------------------------------------------ */

function readableText(raw) {
  // Strip markdown noise the reader doesn't experience as prose so the
  // grade-level number reflects what the rendered block reads as.
  return raw
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/^\s*HERO-CARD:.*$/gm, "")
    .replace(/^\s*`?BLOCK-[\w-]+`?.*$/gm, "")
    .replace(/^\s*>\s?/gm, "")
    .replace(/^\s*\|.*\|\s*$/gm, " ")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/_([^_]+)_/g, "$1")
    .replace(/\[(.*?)\]\([^)]*\)/g, "$1")
    .replace(/[#>|*_]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function countSyllables(word) {
  const w = word.toLowerCase().replace(/[^a-z]/g, "");
  if (!w) return 0;
  if (w.length <= 3) return 1;
  const trimmed = w.replace(/(?:[^aeiouy]es|ed|[^aeiouy]e)$/, "");
  const groups = trimmed.match(/[aeiouy]+/g);
  return Math.max(1, groups ? groups.length : 1);
}

// Flesch-Kincaid implementation (see PRINCIPLES 13 / GRAMMAR § G-13).
// Returns { grade, ease, avgSentenceLength, sentences, words, complexRatio }.
function fleschKincaid(raw) {
  const text = readableText(raw);
  if (!text) {
    return { grade: 0, ease: 100, avgSentenceLength: 0, sentences: 0, words: 0, complexRatio: 0 };
  }
  const sentenceMatches = text.match(/[^.!?]+[.!?]+(?:\s|$)/g) || [text];
  const sentences = Math.max(1, sentenceMatches.length);
  const wordTokens = text.match(/\b[\w'-]+\b/g) || [];
  const words = Math.max(1, wordTokens.length);
  let syllables = 0;
  let complexWords = 0;
  for (const w of wordTokens) {
    const s = countSyllables(w);
    syllables += s;
    if (s >= 3) complexWords += 1;
  }
  const grade = 0.39 * (words / sentences) + 11.8 * (syllables / words) - 15.59;
  const ease = 206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words);
  return {
    grade: Math.round(grade * 10) / 10,
    ease: Math.round(ease * 10) / 10,
    avgSentenceLength: Math.round((words / sentences) * 10) / 10,
    sentences,
    words,
    complexRatio: Math.round((complexWords / words) * 1000) / 1000,
  };
}

// R-17 anchor presence: every block must carry one of bolded lead-clause,
// focal stat (numeric anchor), definition term, takeaway row, or attribution.
function hasAnchor(block) {
  const text = block.bodyText;
  if (!text) return false;
  if (block.type && ANCHOR_TYPES.has(block.type)) return true;
  if (block.type === "stat-callout" || block.type === "stat-grid") return true;
  if (block.type === "definition" && /\*\*[^*]+\*\*/.test(text)) return true;
  if (block.type === "table" && hasTakeawayRow(text)) return true;
  if (block.type === "pull-quote" || block.type === "quote-as-evidence") {
    return /—\s*\S+|^\s*—/m.test(text);
  }
  if (startsWithBoldedLead(text)) return true;
  // Hero blocks declare themselves via HERO-CARD; an explicit hero anchor is
  // the hero block's lead.
  if (/^\s*HERO-CARD:/m.test(text)) return true;
  // A focal stat — a large bolded number — counts as anchor for any block.
  if (/\*\*[\d.,%$]+[\d.,%$KMB]*\*\*/.test(text)) return true;
  return false;
}

const POSITION_LANG = [
  /\b(?:section|beat)\s+\d+\b/i,
  /\bnext\s+up\b/i,
  /\bnow\s+we\s+move\s+to\b/i,
  /\bin\s+beat\s+\d+\b/i,
];
const META_LANG = [
  /\bin\s+the\s+following\s+section\b/i,
  /\blet'?s\s+look\s+at\b/i,
  /\bwe['']?ll\s+cover\b/i,
  /\bas\s+mentioned\s+above\b/i,
  /\bas\s+we['']?ll\s+see\b/i,
];

function findTransitionViolations(text) {
  const hits = { position: [], meta: [] };
  for (const re of POSITION_LANG) {
    const m = re.exec(text);
    if (m) hits.position.push(m[0]);
  }
  for (const re of META_LANG) {
    const m = re.exec(text);
    if (m) hits.meta.push(m[0]);
  }
  return hits;
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
  const isV34 = compareVersion(fav, "3.4.0") >= 0;
  const isV35 = compareVersion(fav, "3.5.0") >= 0;
  const appleRegister = (meta.apple_register || "").toLowerCase() === "true";
  const readabilityWarningsThisCard = [];

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
      } else if (isV34 && words > 60) {
        push(warnings, b, `standard-text exceeds 60-word mobile cap (${words} words; G-12)`);
      }
      const sents = countSentences(b.bodyText);
      if (sents > 4) {
        push(warnings, b, `standard-text exceeds 4-sentence cap (${sents} sentences; G-8)`);
      } else if (isV34 && sents > 3) {
        push(warnings, b, `standard-text exceeds 3-sentence mobile cap (${sents} sentences; G-12)`);
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
    // V3.6 (R-24): no em dash, no asterism rest, anywhere in card content.
    if (hasEmDash(b.bodyText)) {
      push(errors, b, `em dash (—) in card content — V3.6 bans the em dash in reader-visible prose; recast with a comma, colon, parentheses, or two sentences (R-24)`);
    }
    if (hasAsterism(b.bodyText)) {
      push(errors, b, `asterism rest (⁂ / "* * *") in card content — retired in V3.6; macro-spacing between beats does the rest-the-eye work (R-24, supersedes R-11/G-10)`);
    }
    if (compareVersion(fav, "3.3.0") >= 0) {
      for (const leak of findScaffoldLeaks(b.bodyText)) {
        push(errors, b, `scaffold leakage "${leak}" — beat labels and position counters do not appear in the rendered card (R-10 V3.3, I7)`);
      }
    }
    if (isV34) {
      // R-17: every block carries its own anchor.
      const proseTypes = new Set(["standard-text", "faq", "code"]);
      if (!hasAnchor(b) && (proseTypes.has(b.type) || b.type === null)) {
        push(errors, b, `block has no anchor — needs a bolded lead-clause, focal stat, definition term, takeaway row, or attribution (R-17)`);
      }
      // G-13 readability check on prose-bearing blocks.
      const proseLike = proseTypes.has(b.type) || b.type === null;
      if (proseLike) {
        const reading = readableText(b.bodyText);
        if (reading.split(/\s+/).filter(Boolean).length >= 20) {
          const r = fleschKincaid(b.bodyText);
          if (r.grade > 9) {
            const msg = `prose tests above Flesch–Kincaid grade 9 (grade ${r.grade}; G-13)`;
            push(warnings, b, msg);
            readabilityWarningsThisCard.push({ block: b, msg });
          }
          if (r.ease < 60) {
            const msg = `prose tests below Flesch Reading Ease 60 (ease ${r.ease}; G-13)`;
            push(warnings, b, msg);
            readabilityWarningsThisCard.push({ block: b, msg });
          }
          if (r.avgSentenceLength > 20) {
            const msg = `prose average sentence length ${r.avgSentenceLength} > 20 words (G-13)`;
            push(warnings, b, msg);
            readabilityWarningsThisCard.push({ block: b, msg });
          }
        }
      }
      // G-14 transition vocabulary: position-language and meta-language.
      const trans = findTransitionViolations(b.bodyText);
      for (const phrase of trans.position) {
        push(errors, b, `position-language transition "${phrase}" — bridges name content, never position (G-14)`);
      }
      for (const phrase of trans.meta) {
        push(errors, b, `meta-language transition "${phrase}" — the reader needs the point, not a preview of it (G-14)`);
      }
    }
  }

  // ------- per-card V3.4 rules
  if (isV34) {
    // G9: more than two readability warnings on a single card escalate.
    if (readabilityWarningsThisCard.length > 2) {
      push(errors, null, `card has ${readabilityWarningsThisCard.length} readability warnings — G9 gate escalates to an error above 2`);
    }
    // R-15: a card SHOULD snap to one beat-gap value. The frontmatter field
    // `beat_gap` is the declaration; if absent we don't error (the renderer
    // picks the default 48pt per R-15).
    if (meta.beat_gap) {
      const allowed = new Set(["48", "64", "120", "48pt", "64pt", "120pt"]);
      if (!allowed.has(meta.beat_gap.trim().toLowerCase())) {
        push(errors, null, `beat_gap "${meta.beat_gap}" not one of 48 / 64 / 120 pt — R-15 requires a uniform snap value per card`);
      }
    }
    // R-16: card declares either tinted surface (no hairline) or hairline (no
    // tint), not both. The frontmatter field `surface` is the declaration.
    const surface = (meta.surface || "").trim().toLowerCase();
    if (surface && !["hairline", "tinted"].includes(surface)) {
      push(errors, null, `surface "${meta.surface}" not one of "hairline" | "tinted" — R-16 is per-card`);
    }
    // R-18: apple_register: true forbids per-card R-9 overrides in the same
    // card (the validator looks for a `r9_overrides` frontmatter field).
    if (appleRegister && meta.r9_overrides && meta.r9_overrides.toLowerCase() !== "false") {
      push(errors, null, `apple_register: true conflicts with r9_overrides declared in the same card (R-18 mutual exclusion)`);
    }
  }

  // ------- per-card V3.5 rules (reading-layer refinement; R-19/R-20/R-21)
  if (isV35) {
    // R-18 is superseded for V3.5+: its display tightening is folded into the
    // R-19 default, so `apple_register` is not a valid declaration on a V3.5 card.
    if (appleRegister) {
      push(errors, null, `apple_register is not valid on a V3.5 card — R-18's display tightening is folded into the R-19 default (R-18 superseded for V3.5+)`);
    }
    // R-19 retires positive body tracking. A V3.5 card MUST NOT re-introduce it
    // via a frontmatter override (`r9_overrides` / `body_letter_spacing`).
    const r9o = (meta.r9_overrides || "").toLowerCase();
    const bls = (meta.body_letter_spacing || "").toLowerCase();
    if (/\+0?\.\d|positive/.test(r9o) || /^\+/.test(bls)) {
      push(errors, null, `positive body letter-spacing is retired in V3.5 (R-19: body is −0.01em, word-spacing normal) — remove the override`);
    }
    // R-20 tinted-surface caveat: tertiary --ink-3 #767676 clears 4.5:1 on white
    // but only ~4.3:1 on --surface-tint. Warn tinted V3.5 cards to step tertiary
    // text up to a tint-safe ink (or use the hairline surface).
    if ((meta.surface || "").trim().toLowerCase() === "tinted") {
      const onTint = contrastRatio(hexToRgb("#767676"), SURFACE_TINT);
      if (onTint < TEXT_FLOOR) {
        push(warnings, null, `tinted surface: R-20 tertiary --ink-3 #767676 is only ${onTint.toFixed(2)}:1 on --surface-tint (< ${TEXT_FLOOR}:1) — step tertiary text up to a tint-safe ink (>= #6E6E6E) or use the hairline surface`);
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
    // V3.6 (R-24): the asterism rest is retired — a long content run must break
    // to an anchor (or split the beat); the ⁂ is no longer an escape hatch.
    let consecutiveContent = 0;
    let anchors = 0;
    let contents = 0;
    for (const b of list) {
      const k = classify(b);
      if (k === "anchor") {
        anchors++;
        consecutiveContent = 0;
      } else {
        contents++;
        consecutiveContent++;
        if (consecutiveContent > 4) {
          push(warnings, b, `beat ${beat}: > 4 consecutive content blocks without an anchor — break to an anchor or split the beat (G-9)`);
        }
      }
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

// R-20 ink-ladder self-check — validates the spec's own text-ink tokens once,
// independent of any card. A failing token is a spec error, not a card error.
{
  const { errors, notes } = checkInkLadderContrast();
  console.log(`[validate] R-20 text-ink ladder (WCAG 2.2 SC 1.4.3, unrounded):`);
  for (const n of notes) console.log(`           ${n}`);
  for (const e of errors) console.error(`  ERROR  RENDERING-spec (R-20): ${e}`);
  totalErrors += errors.length;
  console.log("");
}

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

// G10 — render-freshness gate (ADR-0010). Every card in 30-CARDS/ MUST have a
// current published render in docs/cards/ and a gallery entry. The render
// embeds sc:content_hash = sha256 of the markdown it was built from; if the
// card has been edited since, the hashes diverge and the render is stale. This
// is the loud backstop that stops Stage 5 from being silently skipped.
{
  console.log(`\n[validate] G10 render-freshness (ADR-0010):`);
  const gallery = existsSync(galleryPath) ? readFileSync(galleryPath, "utf8") : "";
  for (const path of paths) {
    if (!statSync(path).isFile()) continue;
    const rel = relative(repo, path);
    const slug = basename(path).replace(/--(draft|published|archived)/, "").replace(/\.md$/, "");
    const cardRaw = readFileSync(path);
    // Grandfather pre-ADR-0010 cards by version — the renderer grammar and
    // content_hash are a V3.1+ concern, exactly as the content checks above
    // skip < 3.1.0. A missing/stale render is a hard error for V3.1+ cards
    // (so forgetting Stage 5 on a new card fails loudly) and a warning for
    // legacy V3.0 cards (adopt them deliberately, never auto-migrated).
    const frozen = cardRaw.toString("utf8").match(/\|\s*frozen_at_version\s*\|\s*([0-9.]+)\s*\|/)?.[1] || "3.0.0";
    const [fmaj, fmin] = frozen.split(".").map((n) => parseInt(n, 10));
    const legacy = fmaj < 3 || (fmaj === 3 && fmin < 1);
    const flag = (msg) => {
      if (legacy) { console.warn(`  warn   ${msg} (legacy V3.0 — grandfathered)`); totalWarnings++; }
      else { console.error(`  ERROR  ${msg}`); totalErrors++; }
    };
    const htmlPath = resolve(renderDir, `${slug}.html`);
    if (!existsSync(htmlPath)) {
      flag(`${rel}: no render at docs/cards/${slug}.html — run \`npm --prefix app run render -- ${rel}\``);
      continue;
    }
    const html = readFileSync(htmlPath, "utf8");
    const embedded = html.match(/<meta name="sc:content_hash" content="([a-f0-9]+)">/)?.[1];
    if (!embedded) {
      console.warn(`  warn   ${rel}: render lacks sc:content_hash (legacy hand-render) — re-render to adopt the gate`);
      totalWarnings++;
    } else {
      const actual = createHash("sha256").update(cardRaw).digest("hex");
      if (actual !== embedded) {
        flag(`${rel}: render is STALE (card edited since last render) — run \`npm --prefix app run render -- ${rel}\``);
      } else {
        console.log(`  ok     ${rel} -> docs/cards/${slug}.html (fresh)`);
      }
    }
    if (gallery && !gallery.includes(`cards/${slug}.html`)) {
      console.warn(`  warn   ${rel}: not linked in docs/index.html gallery — re-render to add it`);
      totalWarnings++;
    }
  }
}

console.log(
  `\n[validate] scanned ${scanned}, skipped ${skipped} — ${totalErrors} error${totalErrors === 1 ? "" : "s"}, ${totalWarnings} warning${totalWarnings === 1 ? "" : "s"}`,
);
process.exit(totalErrors > 0 ? 1 : 0);
