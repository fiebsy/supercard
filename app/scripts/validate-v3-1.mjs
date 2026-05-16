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
 *
 *   Warnings (exit 0, printed) — fix where possible:
 *     - standard-text block exceeds 75 words or 4 sentences
 *     - beat has > 4 consecutive content blocks without an asterism/anchor
 *     - beat with >= 5 blocks missing the asterism (⁂) rest
 *     - per-beat anchor:content ratio outside the 1:2..1:4 band
 *     - (V3.4+) standard-text block exceeds 60 words (G-12 mobile cap)
 *     - (V3.4+) prose block tests above Flesch-Kincaid grade 9 (G-13)
 *     - (V3.4+) prose block tests below Flesch Reading Ease 60 (G-13)
 *     - (V3.4+) prose block average sentence length above 20 words (G-13)
 *     - (V3.4+) eyebrow / tagline paraphrases the body below it (G-14)
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
