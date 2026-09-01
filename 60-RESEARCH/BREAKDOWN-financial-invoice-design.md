# BREAKDOWN — Financial Invoice Design

| key | value |
|---|---|
| id | BREAKDOWN-financial-invoice-design |
| type | breakdown |
| topic | How to construct a financial invoice: content, layout, typography, accessibility |
| slug | financial-invoice-design |
| era | atlas |
| owner | derick |
| created | 2026-09-01 |
| updated | 2026-09-01 |
| status | active |
| modes_derived | format-engine |
| derived_cards | |
| derived_docs | GOV-invoice-format--draft, INVOICE-2026-0847-payba-sample |
| source_count | 30 |
| confidence | high |
| supersedes | |
| related_reports | |

> **What this file is.** The deep research report behind the Superdoc invoice
> format (`70-SUPERDOCS/GOV-invoice-format--draft.md`, ADR-0021) — the
> uncompressed source of truth its numbered rules are derived from. This is
> the first breakdown that feeds a *format spec* rather than a card; the
> registry carries it under mode `format-engine`.

---

## 0. Research brief

- **Question.** What must a commercial invoice contain, and how do the best
  minimalist invoices lay it out, set its type, and stay accessible?
- **Why now.** First test of extending the Supercard design soul beyond the
  card canvas (ADR-0021): a clean, elegant invoice engine for PAYBA.
- **In scope.** US conventional/legal field set (brief EU VAT contrast),
  SaaS/membership billing specifics, layout and reading order, financial
  typography, exemplars (Stripe, Apple, Swiss style), accessible PDF,
  print/scan robustness, anti-patterns.
- **Out of scope.** Tax advice per jurisdiction; e-invoicing interchange
  formats (Factur-X, UBL); payment-rail mechanics.
- **Audience posture.** The reader is the format spec's author and any agent
  rendering an invoice from it. Prescriptive findings preferred over survey.
- **Source posture.** Web research across regulation (CFR, EU VAT Directive),
  AP-processing practice, typography canon (Butterick, Fonts.com, Ström),
  platform documentation (Stripe), and accessibility standards (WCAG, PDF/UA).

## 1. Research log

- **Pass 1 — the legal baseline.** No single US federal law dictates a
  domestic invoice format; federal content rules exist only for customs
  (19 CFR § 141.86). Domestically "required" means *conventionally required
  for the invoice to be payable and defensible* — contract law, state
  sales-tax rules, audit-worthiness.
- **Pass 2 — the payable field set.** Converged across invoicing and AP
  guides (IONOS, Zoho Books, Medius, InvoiceOwl) on the ten-field consensus
  in § 3. The AP three-way match (invoice ↔ PO ↔ receipt) is what makes the
  PO number load-bearing, not decorative.
- **Pass 3 — layout and reading order.** AP clerks scan in an F-pattern and
  hunt five fields: vendor name, invoice number, amount, due date, PO. The
  modern standard (Stripe's hosted invoice) answers "how much, by when" at
  the very top, before any detail.
- **Pass 4 — typography.** The financial-document canon is unanimous:
  tabular lining figures, right-aligned money, one family, two weights,
  about three sizes, hierarchy by weight and gray value.
- **Pass 5 — accessibility and robustness.** Tagged real-text PDF (PDF/UA),
  WCAG 4.5:1 for body-size text, and the 1-bit photocopy test: what survives
  scanning is near-black text on white; what dies is light gray, sub-0.5pt
  rules, and text on tints.
- **Searches that returned little:** a canonical US statute for domestic
  invoice content (there isn't one — the void is filled by convention).

## 2. Executive synthesis

An invoice has one job: get paid without a phone call. Everything else is
subordinate. The reader is an accounts-payable clerk (or a busy customer) who
scans in an F-pattern for five fields — vendor, invoice number, amount, due
date, PO — so the best invoices answer **who → what → how much → by when →
how to pay** in that order down the page, and summarize "how much, by when"
at the very top before any detail (the Stripe pattern). Structure comes from
alignment and whitespace first, hairline rules second, boxes never. Type is
one family, two or three weights, about three sizes, with tabular lining
figures on every number and the total as the single most emphasized number on
the page. The document must survive a 1-bit photocopy and read correctly to a
screen reader — which means real tagged text, spelled-out months, 4.5:1
contrast, and no meaning carried by color alone. Every anti-pattern (buried
total, ambiguous date, missing remittance detail) is a release blocker, not a
style preference: it is the invoice failing at its only job.

## 3. Content — what must appear

**The legal baseline (US).** No federal domestic format law; 19 CFR § 141.86
governs customs invoices only (description, quantities, values, seller
identity, itemized discounts — content, not layout). Sales tax is state and
local; separately stating the tax amount is the near-universal convention,
and some states require the seller's permit number on taxable invoices.

**The conventional field set (what makes an invoice payable):**

1. The word **"Invoice"** — document type, distinguishing it from quote,
   receipt, statement, or credit note.
2. **Invoice number** — unique, sequential, gapless, zero-padded, with a
   stable prefix scheme (`INV-2026-0847`). Gaps and reuse are audit flags
   and break AP duplicate detection.
3. **Issue date and explicit due date** as calendar dates. State the term
   ("Net 30") *alongside* the computed date, never instead of it — "pay by
   October 1, 2026" measurably outperforms bare "Net 30".
4. **Seller identity** — legal name, address, contact; tax ID where
   applicable (EIN rarely required domestically; VAT ID mandatory in the EU).
5. **Buyer identity** — "Bill to" name and address; the buyer's **PO number**
   whenever one exists (three-way matching stalls without it).
6. **Line items** — description, quantity, unit price, amount. Descriptions
   specific enough to match against a PO or contract.
7. **The money cascade, visible** — subtotal → itemized discounts → tax with
   rate shown → **amount due**, labeled unambiguously; ISO currency code near
   the total for cross-border.
8. **Payment terms** — Net 30 = full amount within 30 calendar days of issue;
   2/10 Net 30 = 2% discount inside 10 days.
9. **Payment instructions** with executable detail — ACH/wire/check/link —
   plus "reference the invoice number with payment." Vague remittance detail
   is a leading cause of payment delay.
10. **Notes/footer** — a designed home for thanks, late-fee policy, and
    legally required text (Stripe ships dedicated memo and footer fields for
    exactly this).

**EU VAT contrast (brief).** Directive 2006/112/EC Art. 226 mandates ~15
particulars: sequential number from an unbroken series, both parties' VAT
IDs, quantity/nature of supply, taxable amount *per VAT rate*, VAT rate and
amount, and required legends ("Reverse charge"). Design consequence: a
template needs a per-rate tax block and room for a legal legend.

**SaaS / membership billing.** The billing period is the identity of a
recurring charge — every recurring line carries plan name exactly as marketed
plus its period ("All-Access · Sep 1, 2026 – Aug 31, 2027"). Proration is
shown as arithmetic (a credit line and a charge line, never one merged
number). Recurring and one-time lines stay distinct. Auto-charged invoices
show the payment method on file and the next billing date; an invoice states
an amount *due*, a receipt an amount *paid*.

## 4. Layout — the 3-second scan

- **Reading order.** Who is this from → what is it for → how much → by when →
  how do I pay. Amount due + due date summarized near the top (the Stripe
  hosted-invoice pattern: "Acme Inc. — $1,234.00 due March 15, 2026" before
  any detail).
- **Zones.** Seller identity top-left; a grouped meta block (number, dates,
  terms, PO) as one label/value grid, never scattered; parties below the
  header; full-width line-item table; totals bottom-right directly under the
  amount column so the eye falls from line amounts into subtotal → tax →
  total; payment instructions and footer last.
- **Table discipline.** Right-align every numeric column; left-align
  descriptions; headers align with their column's content. Structure by
  alignment and whitespace first, hairline horizontal rules second (one under
  the header, one above the total), vertical rules and cell boxes never.
- **Page discipline.** One page by default. Overflow: repeat the table
  header, totals on the last page only, "Page 1 of N." Never shrink type to
  force one page.

## 5. Typography for money

- **Tabular lining figures** on every number column — the canonical setting
  for invoices and financial statements (`font-variant-numeric: tabular-nums
  lining-nums`). Never oldstyle figures in an amounts column.
- **Minimal size system.** Body 10–12pt print; roughly **three sizes total**
  (body, a small meta/footer size, one display size for the amount due);
  everything else differentiated by weight and gray value. Line spacing
  120–145%.
- **One family, two weights.** A workhorse sans with real tabular figures;
  bold only the load-bearing numbers (total, due date, invoice number) —
  bolding everything emphasizes nothing.
- **Identifiers in mono/tabular setting** — invoice, PO, account numbers are
  transcribed digit by digit.
- **Currency.** Buyer's locale conventions; US style `$1,234.56`, always two
  decimals on amounts, thousands separators always, ISO code once near the
  total for cross-border.
- **Dates unambiguous.** Spell the month ("Sep 1, 2026"); never all-numeric
  `09/01/2026` (US/EU day-month flip). ISO 8601 acceptable but colder.
- **Hairlines over boxes.** No zebra stripes on a short table, no cell
  borders.

## 6. Exemplars

- **Stripe** — the de facto modern standard: top summary (amount + due
  date), compact meta grid, restrained single accent with everything else
  grayscale, period-annotated subscription lines, explicit proration lines in
  defined order, designed memo/footer fields, per-account sequential
  numbering. The lesson: *constrain the template, parameterize the content*.
- **Apple** — one typeface, generous whitespace, almost no rules, hierarchy
  carried by weight and gray value; a financial document made premium purely
  through restraint.
- **Swiss / International Typographic Style** — the historical root:
  Müller-Brockmann grids, objective top-to-bottom organization, flush-left
  text, right-aligned numbers, no ornament. An invoice is the ideal
  Swiss-style artifact — pure information, no persuasion.

## 7. Accessibility and robustness

- **Tagged PDF / PDF-UA (ISO 14289).** Real selectable text (never outlined
  or flattened), logical reading order, tables tagged with header cells,
  document language and title set. Real text is also what makes AP OCR
  extraction reliable.
- **Contrast.** WCAG 4.5:1 for body-size text: body ≈ #595959 or darker on
  white; ≈ #767676 is the floor and is reserved for non-essential labels,
  never amounts, dates, or payment details.
- **Size floors.** Body 10–12pt print (≥ 15px screen); nothing below ~7pt.
- **No meaning in color alone.** "PAID" / "OVERDUE" always get a word;
  grayscale printing and color-blind readers lose color-only signals.
- **The 1-bit photocopy test.** Invoices get printed, scanned at 200–300 dpi
  in line-art mode, faxed, photographed. Survives: near-black text on white,
  solid weights, adequate size. Dies: light grays (thresholded to nothing),
  rules under 0.5pt, text on tinted backgrounds, fine reversed-out type.

## 8. Anti-patterns (release blockers)

1. Buried total — set at line-item size, forcing a full read.
2. Ambiguous dates — all-numeric, or "upon receipt" with no date.
3. Missing or vague payment instructions.
4. Missing PO/reference — the invoice sits in an AP exception queue.
5. Spreadsheet chrome — boxed cells, zebra stripes on five rows.
6. Too many sizes/fonts — hierarchy dissolves into noise.
7. Cramming — shrinking type to dodge a second page.
8. Decorative chrome — watermarks, tints, oversized logos.
9. Low-contrast gray fine print — illegible after copying.
10. Color-only signals — red total, green "paid," no textual equivalent.
11. Unlabeled adjustments — merged proration math, silent credits.
12. Non-sequential or duplicate invoice numbers.

## Source register

1. 19 CFR § 141.86, customs invoice content — law.cornell.edu/cfr/text/19/141.86
2. State sales-tax invoice requirements — invoicedataextraction.com/blog/sales-tax-invoice-requirements-by-state
3. Invoice field conventions — ionos.com/startupguide/grow-your-business/requirements-for-a-proper-invoice/
4. Invoice format and layout guide — invoicara.com/blog/invoice-format-layout-guide
5. AP invoice processing, bill to payment — zoho.com/books/academy/accounting-principles/invoice-processing-accounts-payable-practical-guide-bill-to-payment.html
6. Invoice numbering best practice — invoiceowl.com/invoicing-guide/what-is-an-invoice-number/
7. Invoice numbering schemes — tofu.com/blog/invoice-numbering
8. Layout tweaks that get you paid faster — leanlaw.co/blog/a-guide-to-invoice-design-layout-tweaks-that-get-you-paid-faster/
9. Three-way matching — medius.com/glossary/what-is-invoice-processing/
10. AP processing steps — coreintegrator.com/invoice-processing-steps/
11. Net 30 / 2-10 net 30 — tipalti.com/resources/learn/210-net-30/
12. Remit-to and remittance advice — invoicefly.com/glossary/remit-to/ · routable.com/resources/remittance-advice/
13. Stripe invoice customization (memo, footer, meta) — docs.stripe.com/invoicing/customize
14. Stripe hosted invoice page — docs.stripe.com/invoicing/hosted-invoice-page
15. EU VAT invoice content, Art. 226 — stripe.com/resources/more/eu-vat-invoice-content-requirements · vatupdate.com/2022/05/12/eu-vat-directive-2006-112-ec-explained-art-226-content-of-an-invoice/
16. SaaS billing best practices — schematichq.com/blog/saas-billing-best-practices
17. Proration shown as arithmetic — ordwaylabs.com/resources/glossary/what-is-proration/ · paddle.com/resources/proration
18. Stripe invoice line ordering — docs.stripe.com/api/invoices
19. AP five-field scan — business.amazon.com/en/blog/invoice-processing
20. Design better data tables — Matthew Ström, mattstromawn.com/writing/tables/
21. Web typography: tables to be read — alistapart.com/article/web-typography-tables/
22. Tabular vs proportional figures — myfonts.com/pages/fontscom-learning-fontology-level-3-numbers-proportional-vs-tabular-figures/
23. OpenType figure styles — typenetwork.com/articles/opentype-at-work-figure-styles
24. Practical Typography, point size and key rules — practicaltypography.com/point-size.html
25. Currency formatting by locale — fastspring.com/blog/how-to-format-30-currencies-from-countries-all-over-the-world/ · cldr.unicode.org/translation/number-currency-formats/number-and-currency-patterns
26. ISO 8601 and date ambiguity — iso.org/iso-8601-date-and-time-format.html
27. PDF/UA overview — pdfix.net/pdf-compliance/pdf-ua-iso-14289-the-technical-standard-for-accessible-pdfs/ · adobe.com/accessibility/pdf/pdf-accessibility-overview.html
28. WCAG contrast — w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html
29. Scan/photocopy survival — scantips.com/basics04.html
30. Invoice problems and mistakes — conexiom.com/blog/top-11-invoice-problems-and-solutions · invoicefly.com/academy/invoicing-mistakes/

## Numbers & data bank

- AP clerks hunt **5 fields**: vendor, invoice number, amount, due date, PO.
- Clear remittance detail is credited with **30–40%** cash-flow-cycle
  improvement; professionally designed invoices with **~24%** faster payment
  (practitioner figures, not experimental — see Contested claims).
- Body floor: **10–12pt** print, **≥ 15px** screen; fine print never below
  **~7pt**; rules **≥ 0.5pt** to survive scanning.
- Contrast: **4.5:1** body floor; #595959 ≈ 7:1; #767676 = 4.54:1.
- EU VAT: Art. 226 lists **~15** mandatory particulars.

## Contested claims

- **"24% faster payment for well-designed invoices"** and the "30–40%
  cash-flow improvement" figures circulate in practitioner marketing content
  without a traceable primary study. Directionally consistent with AP
  processing research; do not cite as measured fact.
- **State tax-ID display rules vary** — the spec treats the tax-ID slot as
  optional-per-jurisdiction rather than mandatory.

## Open questions & gaps

- E-invoicing interchange (EN 16931, Factur-X, UBL) was out of scope; if
  PAYBA ever needs machine-submittable invoices, that is a second research
  pass.
- Chromium's `--export-tagged-pdf` produces tagged output but not certified
  PDF/UA; full conformance would need a post-processing pass.

## Confidence assessment

- **High** — field set, layout order, table alignment, tabular figures,
  contrast floors, anti-patterns: unanimous across regulation, AP practice,
  and the typography canon.
- **Medium** — the specific payment-speed percentages (see Contested claims).
- **High** — EU VAT particulars (directive text, cross-checked).

## Derivation log

- 2026-09-01 — `GOV-invoice-format--draft` (70-SUPERDOCS): the N-rules are
  the prescriptive distillation of §§ 3–8.
- 2026-09-01 — `INVOICE-2026-0847-payba-sample`: first rendered artifact.
