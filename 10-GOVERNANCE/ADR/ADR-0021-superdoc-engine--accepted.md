# ADR-0021 — The Superdoc engine: the Supercard soul beyond the card, and the invoice as its first format

| key | value |
|---|---|
| id | ADR-0021 |
| type | adr |
| status | Accepted |
| date | 2026-09-01 |
| owner | derick |

## Status

**Accepted** — 2026-09-01. Ships as a sibling system beside the card spec,
not a card-spec version: no card rule, token value, or render path changes,
no card re-renders, and `llms.txt` gains only this ledger row. New surface:
`70-SUPERDOCS/` (engine + invoice format specs), `app/src/superdoc.css`,
`app/scripts/render-invoice.mjs` + `make-pdf.mjs`, `docs/pdf/`, and a
Documents section in the gallery.

## Context

The Supercard was built to extract information from an LLM session and hand
it back at low cognitive load — scannable, single-emphasis, grayscale. The
steward's intent was always larger than the card: the same soul injected
into any artifact worth designing — super PDFs, super dashboards, super
one-pagers — starting with a working need: a clean, elegant invoice for
PAYBA (a company billing a customer for a creator membership product).

The risk in "reuse the design system" is that each new artifact quietly
re-decides the foundations — a new ramp here, a shadow there — until the
family resemblance is a vibe rather than a spec. The system already knows
how to prevent that: name the split, number the rules, render from source,
publish by default.

## Decision

1. **A two-layer split (D-1).** The soul is canvas-independent and carries
   verbatim: the gray ramp, the R-20 ink ladder, R-39 role tokens, the
   `ui-rounded` stack, flat surfaces (R-22), the `--g-12` hairline (R-23),
   label discipline (R-14), single emphasis (P2), plain language (P13),
   light-only, no em dash (R-24). The canvas is format-owned and re-derives:
   dimensions, type scale, spacing units, structural vocabulary.
2. **A new home, not a card-spec bump.** Formats live in `70-SUPERDOCS/` as
   `GOV-{format}` docs with their own rule series (engine D-rules, invoice
   N-rules), leaving the card's R/G series untouched. The public card spec
   does not inline them.
3. **The invoice is the proving format.** Researched first (ADR-0006's
   registry now carries `BREAKDOWN-financial-invoice-design`, mode
   `format-engine`), specified as twelve N-rules, rendered by a
   deterministic renderer (ADR-0010's contract: source JSON → inlined-token
   HTML → tagged-PDF twin, every derived number computed in integer cents).
4. **Render-and-publish holds (ADR-0007).** Documents publish to
   `docs/pdf/` and the gallery gains a Documents section.

## Consequences

- The card system is untouched: every existing card renders pixel-identical,
  and the paste-and-go `llms.txt` reader sees only a ledger row.
- The engine recipe (research → format spec → token derivation → renderer →
  publish → design review) is the template for the next formats; a format
  that wants an accent color or a shadow is asking to leave the system, and
  the answer is in D-1, not in taste.
- Chromium's `--export-tagged-pdf` gives tagged output, not certified
  PDF/UA; if PAYBA ever needs conformance, that is a follow-up pass (noted
  in the breakdown's open questions).

## Alternatives considered

- **Grow the card spec to cover documents** — rejected: the 393pt canvas,
  beat grammar, and block library are card identity; stretching them to
  Letter pages would blur both specs (the V2-drift failure mode).
- **A standalone invoice template with copied styles** — rejected: copied
  values drift silently; the engine names what is shared so drift is a
  diff, not a discovery.
