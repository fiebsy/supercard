# 90-ARCHIVE

Frozen prior eras and retired V3 minor versions. Read-only — do not author into
this folder.

- `2024-V1/` — V1 cards, `--archived` suffix
- `2025-V2/` — V2 cards + the V2 spec, `--archived` suffix

Per ADR-0003 (frozen-at-authored-version), V1 and V2 cards remain valid in their
own era; V3 does not retroactively reformat them. Future V4 will move V3 contents
into `90-ARCHIVE/V3/` and continue at the canonical root.

The legacy "Supercard Format — Specification v2.0" and "postcard-format-spec"
documents are intentionally not carried here — this repo tracks the canonical V3
system only. Add them under `2025-V2/` if a future V2 → V3 migration needs them
on hand.
