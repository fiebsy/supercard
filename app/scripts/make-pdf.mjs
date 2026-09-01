/*
 * make-pdf.mjs — print a rendered Superdoc HTML page to its PDF twin.
 *
 * Uses headless Chromium (the same engine the renders are verified in) with
 * tagged-PDF export, so the PDF carries the HTML's semantic structure —
 * real text, table semantics, reading order (D-8). The HTML page stays the
 * canonical render; the PDF is a view printed from it.
 *
 *   node scripts/make-pdf.mjs ../docs/pdf/INVOICE-xxx.html
 *
 * Chromium is resolved from $SUPERDOC_CHROMIUM, then $PLAYWRIGHT_BROWSERS_PATH/chromium,
 * then `chromium` on PATH.
 */
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

const srcArg = process.argv[2];
if (!srcArg) {
  console.error("usage: node scripts/make-pdf.mjs <rendered-page.html>");
  process.exit(1);
}
const htmlPath = resolve(process.cwd(), srcArg);
if (!existsSync(htmlPath)) {
  console.error(`[make-pdf] not found: ${htmlPath}`);
  process.exit(1);
}
const pdfPath = htmlPath.replace(/\.html$/, ".pdf");

const candidates = [
  process.env.SUPERDOC_CHROMIUM,
  process.env.PLAYWRIGHT_BROWSERS_PATH &&
    `${process.env.PLAYWRIGHT_BROWSERS_PATH}/chromium`,
  "chromium",
].filter(Boolean);
const chromium = candidates.find((c) => c === "chromium" || existsSync(c));

execFileSync(
  chromium,
  [
    "--headless",
    "--no-sandbox",
    "--disable-gpu",
    "--export-tagged-pdf",
    "--no-pdf-header-footer",
    `--print-to-pdf=${pdfPath}`,
    `file://${htmlPath}`,
  ],
  { stdio: "inherit" }
);
console.log(`[make-pdf] ${htmlPath} -> ${pdfPath}`);
