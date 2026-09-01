# GOV — The invoice format

| key | value |
|---|---|
| id | GOV-invoice-format |
| type | governance |
| era | atlas |
| version | 0.1.0 |
| owner | derick |
| updated | 2026-09-01 |
| status | draft |
| engine | GOV-superdoc-engine |
| research_report | BREAKDOWN-financial-invoice-design |

The first format on the Superdoc engine: a single-page, grayscale, hairline
invoice in the Supercard soul. Every N-rule below is distilled from the
research report (`60-RESEARCH/BREAKDOWN-financial-invoice-design.md`); the
engine rules (D-1…D-8) apply underneath and are not restated. Sample
artifact: `docs/pdf/INVOICE-2026-0847-payba-sample.html` (+ `.pdf`), source
in `invoices/`.

---

## The one job

An invoice has one job: **get paid without a phone call.** Its reader is an
accounts-payable clerk or a busy customer scanning for five fields — vendor,
invoice number, amount, due date, PO — and every rule below exists to make
that scan instant and the payment executable. An anti-pattern here is a
release blocker, not a style preference.

## N-1. The five-question order

The page answers, top to bottom: **who is this from → what is it → how much →
by when → how do I pay.** Concretely: wordmark and issuer contact first, the
document type ("Invoice"), the amount-due card, the meta grid, the parties,
the line items and totals, then payment instructions, notes, footer. Nothing
appears before the question it answers.

## N-2. The amount-due card is the hero

The page's **one bounded card** (D-6) holds the scan's answer before any
detail — the Stripe hosted-invoice pattern:

- a micro-label (`AMOUNT DUE`),
- the amount at display size — **the page's only display-sized number**
  (single emphasis, P2),
- one body line with the explicit due date and the term
  ("Due October 1, 2026 · Net 30").

The totals ladder at the bottom repeats the figure at body size, semibold.
That repetition is deliberate and is the *only* sanctioned duplication on
the page: the card answers the scan; the ladder shows the arithmetic.

## N-3. The payable field set

Every invoice MUST carry: the word **Invoice**; a unique, sequential,
zero-padded **invoice number** with a stable prefix (`INV-2026-0847`);
**issue date** and **explicit due date**; **seller** legal name, address and
contact (tax ID where the jurisdiction requires it); **bill-to** name and
address, with the buyer's **PO number** whenever one exists; **line items**
(description, quantity, unit price, amount); the visible money cascade
(N-7); **payment terms**; **payment instructions** (N-9). EU-destined
invoices additionally need both VAT IDs, a per-rate tax breakdown, and any
required legend ("Reverse charge") — the template holds space for them.

## N-4. One meta block

Invoice number, issue date, due date, and PO number sit in **one**
label-over-value grid, never scattered around the page. Labels are
micro-labels (D-3); values are body at 500 in primary ink; the invoice
number is mono (N-6). The AP clerk keys the invoice from this block in one
pass.

## N-5. Line-item discipline

- Description column left-aligned; **every numeric column right-aligned**
  (qty, unit price, amount), headers aligned with their column.
- Descriptions specific enough to match a PO or contract. A membership or
  subscription line carries the **plan name as marketed and its billing
  period** ("All-Access membership · Maren Cole Studio", "Annual plan ·
  Sep 1, 2026 – Aug 31, 2027") — the period is the identity of a recurring
  charge.
- Proration renders as arithmetic: a labeled credit line and a labeled
  charge line, never one merged number. Recurring and one-time lines stay
  distinct.
- Hairlines: one under the header row, 0.5pt between rows, none under the
  last row (the totals rule closes the table, R-28). No vertical rules, no
  boxes, no stripes (D-5).

## N-6. Money and identifiers

- **Tabular lining figures on every number** (`font-variant-numeric:
  tabular-nums lining-nums`) so magnitudes align digit-for-digit.
- Buyer's-locale formatting; US style `$1,234.56` — always two decimals on
  amounts, thousands separators always, ISO code near the total when the
  invoice crosses a border.
- Identifiers a human transcribes — invoice number, PO, account tails — set
  in the mono role.

## N-7. The cascade is computed, never stated

Subtotal → itemized discounts → tax with its rate shown → **amount due** (less
any amount paid), rendered as a right-hand ladder directly under the amount
column. The renderer computes every one of these from the lines in integer
cents (D-7); the source file carries no total that could drift from its own
arithmetic.

## N-8. Dates spell the month

"September 1, 2026", never `09/01/2026` — all-numeric dates flip meaning
across the Atlantic. The term ("Net 30") is stated **beside** the computed
due date, never instead of it.

## N-9. Payment is executable

The payment section lists each accepted method with the detail needed to
act on it — a pay link, ACH/wire remittance detail (or where to request
it), a check remit-to — and asks the payer to **reference the invoice
number with payment**. Notes and legal text get the designed footer home,
never improvised margins.

## N-10. One page by default

If the invoice must run over: repeat the table header, place the totals
ladder only on the last page, number pages "Page 1 of N," and never shrink
type to force a fit.

## N-11. Ink floors for money

Amounts, dates, identifiers, and payment details never render below
secondary ink (`--ink-2`); tertiary ink (`--ink-3`) is reserved for
micro-labels and non-essential annotation. Status words are words — "PAID",
"OVERDUE" — never a color (the grayscale system makes this structural).
Rules stay ≥ 0.5pt. The rendered artifact must pass D-8's photocopy test.

## N-12. Anti-patterns (each one blocks release)

| Anti-pattern | Why it fails |
|---|---|
| Buried total — the amount due set at line-item size | Fails the 3-second scan; the page's one job |
| Ambiguous date — all-numeric, or "upon receipt" with no date | Flips meaning across locales; unenforceable |
| Vague payment instructions | The leading self-inflicted cause of payment delay |
| Missing PO/reference when one exists | Stalls three-way matching; the invoice sits in an exception queue |
| Spreadsheet chrome — boxed cells, vertical rules, stripes | D-5; alignment does this work |
| A fourth type size | D-3; weight and ink are the levers |
| Type shrunk to dodge a second page | N-10; legibility outranks tidiness |
| Decorative chrome — watermark, tint, oversized logo | Competes with the numbers |
| Essential detail in tertiary ink or under 0.5pt rules | Dies in the photocopy (N-11) |
| A stated total copied into the source | Drifts from its own lines (N-7) |
| Non-sequential or reused invoice numbers | Audit flag; breaks AP duplicate detection |

## The type scale (this format's D-3 values)

| Role | Size / leading | Weight | Tracking | Ink |
|---|---|---|---|---|
| Display | 22 / 26pt | 600 | −0.015em | primary |
| Body | 10 / 15pt | 400 / 500 / 600 | −0.005em | ladder per role |
| Micro-label (UPPERCASE) | 8 / 11pt | 600 | +0.08em | tertiary |
| Mono (identifiers) | 9 / 15pt | 400 | 0 | inherits |

Canvas: US Letter, 612 × 792pt, 56pt margin (D-2). Spacing: 4 / 8 / 12 /
16 / 24 / 32 / 48pt (D-4). Body and label sizes sit above the research's
print floors (10–12pt body, ~7pt fine-print minimum).

## Build and publish

```sh
# render the sample invoice → docs/pdf/{id}.html
npm --prefix app run invoice -- 70-SUPERDOCS/invoices/INVOICE-2026-0847-payba-sample.json

# print the PDF twin → docs/pdf/{id}.pdf (tagged, via headless Chromium)
npm --prefix app run invoice:pdf -- docs/pdf/INVOICE-2026-0847-payba-sample.html
```

The HTML page is the canonical render (real text, semantic tables, the
screen viewer); the PDF is its print twin. Both publish from `docs/pdf/`
via the existing deployment (ADR-0007's render-and-publish, applied to
documents).
