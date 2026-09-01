/*
 * render-invoice.mjs — deterministic renderer for Superdoc invoices.
 *
 * The Superdoc counterpart to render-card.mjs (ADR-0010's contract, applied
 * to the document canvas): a pure function over the invoice source JSON in
 * 70-SUPERDOCS/invoices/. It inlines app/src/superdoc.css verbatim (the
 * single source of truth for every token — never re-state a value here),
 * computes every derived number from the lines (a stated total that could
 * drift from its own lines is the defect N-7 exists to prevent), and emits
 * one standalone HTML page to docs/pdf/{id}.html.
 *
 *   node scripts/render-invoice.mjs ../70-SUPERDOCS/invoices/INVOICE-xxx.json
 *
 * The PDF twin is produced from that HTML by make-pdf.mjs (Chromium print).
 * Output is deterministic — no wall-clock timestamps — so a re-render of an
 * unchanged source is byte-identical.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve, basename } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const repo = resolve(here, "../..");
const cssPath = resolve(here, "../src/superdoc.css");
const outDir = resolve(repo, "docs/pdf");

const srcArg = process.argv[2];
if (!srcArg) {
  console.error("usage: node scripts/render-invoice.mjs <invoice-source.json>");
  process.exit(1);
}
const srcPath = resolve(process.cwd(), srcArg);
const inv = JSON.parse(readFileSync(srcPath, "utf8"));
const css = readFileSync(cssPath, "utf8");

/* ------------------------------------------------------------------ *
 * Money and dates. All arithmetic in integer cents (N-7).
 * ------------------------------------------------------------------ */
const CURRENCY = inv.currency || "USD";
const fmtMoney = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: CURRENCY,
});
const money = (cents) => fmtMoney.format(cents / 100);

// Dates in the source are authored as display text with a spelled month —
// "09/01/2026" is ambiguous across the Atlantic; "September 1, 2026" is not
// (N-8). The renderer refuses an all-numeric date rather than reformatting.
const numericDate = /\b\d{1,2}[/.]\d{1,2}[/.]\d{2,4}\b/;

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/* ------------------------------------------------------------------ *
 * Derived numbers — always computed, never copied from the source.
 * ------------------------------------------------------------------ */
const lines = inv.lines.map((l) => ({
  ...l,
  amountCents: Math.round(l.qty * Math.round(l.unit_price * 100)),
  unitCents: Math.round(l.unit_price * 100),
}));
const subtotalCents = lines.reduce((s, l) => s + l.amountCents, 0);
const taxRate = inv.tax ? inv.tax.rate : 0;
const taxCents = Math.round(subtotalCents * taxRate);
const totalCents = subtotalCents + taxCents;
const paidCents = Math.round((inv.amount_paid || 0) * 100);
const dueCents = totalCents - paidCents;

const taxLabel = inv.tax
  ? `${inv.tax.label} (${(taxRate * 100).toFixed(taxRate * 100 % 1 ? 2 : 0)}%)`
  : null;

// N-8 gate: no all-numeric date anywhere reader-visible.
const visibleText = JSON.stringify([inv.meta, inv.due_line, inv.lines, inv.notes]);
if (numericDate.test(visibleText)) {
  console.error("[render-invoice] N-8: all-numeric date found — spell the month.");
  process.exit(1);
}

/* ------------------------------------------------------------------ *
 * Fragments.
 * ------------------------------------------------------------------ */
const metaPairs = (inv.meta || []).map(
  (m) => `      <div>
        <dt class="label">${esc(m.label)}</dt>
        <dd class="value${m.mono ? " id" : ""}">${esc(m.value)}</dd>
      </div>`
).join("\n");

const party = (label, p) => `      <div class="party">
        <h2 class="label">${esc(label)}</h2>
        <p class="name">${esc(p.name)}</p>
${(p.rows || []).map((r) => `        <p>${esc(r)}</p>`).join("\n")}
      </div>`;

const lineRows = lines.map(
  (l) => `        <tr>
          <td>
            <p class="desc">${esc(l.description)}</p>
${l.detail ? `            <p class="detail">${esc(l.detail)}</p>` : ""}
          </td>
          <td class="num">${l.qty}</td>
          <td class="num">${money(l.unitCents)}</td>
          <td class="num">${money(l.amountCents)}</td>
        </tr>`
).join("\n");

const totalRows = [
  `        <tr><th scope="row">Subtotal</th><td class="num">${money(subtotalCents)}</td></tr>`,
  taxLabel
    ? `        <tr><th scope="row">${esc(taxLabel)}</th><td class="num">${money(taxCents)}</td></tr>`
    : null,
  paidCents
    ? `        <tr><th scope="row">Amount paid</th><td class="num">${money(-paidCents)}</td></tr>`
    : null,
  `        <tr class="due"><th scope="row">Amount due</th><td class="num">${money(dueCents)}</td></tr>`,
].filter(Boolean).join("\n");

const payRows = (inv.payment || []).map(
  (p) => `        <p><strong>${esc(p.method)}</strong> · ${esc(p.detail)}</p>`
).join("\n");

/* ------------------------------------------------------------------ *
 * The page.
 * ------------------------------------------------------------------ */
const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<!-- The sheet is a fixed 612pt (816px) column; width=816 without a pinned
     initial-scale lets a phone compute the fit-to-width scale (the R-34
     lesson, applied to the document canvas). -->
<meta name="viewport" content="width=846">
<meta name="color-scheme" content="only light">
<title>${esc(inv.title)}</title>
<meta name="description" content="${esc(inv.description || inv.title)}">
<meta name="sd:type" content="invoice">
<meta name="sd:id" content="${esc(inv.id)}">
<meta name="sd:number" content="${esc(inv.number)}">
<meta name="sd:source" content="70-SUPERDOCS/invoices/${basename(srcPath)}">
<style>
${css.trim()}
</style>
</head>
<body>
  <nav class="viewer" aria-label="Document viewer">
    <a href="../index.html"><span aria-hidden="true">←</span>&nbsp;Gallery</a>
    <a href="${esc(inv.id)}.pdf" download>Download PDF</a>
  </nav>
  <main class="page">

    <header>
      <p class="wordmark">${esc(inv.issuer.wordmark)}</p>

      <h1 class="display" style="margin-top: var(--d-3);">Invoice</h1>

      <section class="card amount" style="margin-top: var(--d-3);">
        <div>
          <h2 class="label">Amount due</h2>
          <p class="display" style="margin-top: var(--d-1);">${money(dueCents)}</p>
        </div>
        <p style="color: var(--text-body);">${esc(inv.due_line)}</p>
      </section>
    </header>

    <hr class="rule" style="margin-top: var(--d-4);">

    <dl class="meta-grid" style="margin-top: var(--d-3);">
${metaPairs}
    </dl>

    <div class="parties" style="margin-top: var(--d-4);">
${party("From", inv.issuer.party)}
${party("Bill to", inv.bill_to)}
    </div>

    <section style="margin-top: var(--d-4);" aria-label="Line items">
      <table class="lines">
        <caption>Line items: description, quantity, unit price, and amount for each charge on invoice ${esc(inv.number)}</caption>
        <colgroup>
          <col style="width: 55%">
          <col style="width: 9%">
          <col style="width: 18%">
          <col style="width: 18%">
        </colgroup>
        <thead>
          <tr>
            <th scope="col">Description</th>
            <th scope="col" class="num">Qty</th>
            <th scope="col" class="num">Unit price</th>
            <th scope="col" class="num">Amount</th>
          </tr>
        </thead>
        <tbody>
${lineRows}
        </tbody>
      </table>

      <div style="display: flex; justify-content: flex-end;">
        <table class="totals" style="width: 220pt;">
${totalRows}
        </table>
      </div>
    </section>

    <div class="bottom-grid" style="margin-top: var(--d-4);">
      <section aria-label="How to pay">
        <h2 class="label" style="margin-bottom: var(--d-2);">Payment</h2>
${payRows}
${inv.payment_note ? `        <p class="quiet" style="margin-top: var(--d-2);">${esc(inv.payment_note)}</p>` : ""}
      </section>
${inv.notes ? `      <section aria-label="Notes">
        <h2 class="label" style="margin-bottom: var(--d-2);">Notes</h2>
        <p>${esc(inv.notes)}</p>
      </section>` : ""}
    </div>

    <footer class="doc-foot">
      <p>${esc(inv.footer.left)}</p>
      <p class="num">${esc(inv.footer.right)}</p>
    </footer>

  </main>
</body>
</html>
`;

mkdirSync(outDir, { recursive: true });
const outPath = resolve(outDir, `${inv.id}.html`);
writeFileSync(outPath, html);
console.log(`[render-invoice] ${basename(srcPath)} -> docs/pdf/${inv.id}.html`);
console.log(`[render-invoice] subtotal ${money(subtotalCents)} · tax ${money(taxCents)} · due ${money(dueCents)}`);
