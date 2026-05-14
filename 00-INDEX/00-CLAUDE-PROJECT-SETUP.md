# 00-CLAUDE-PROJECT-SETUP

> Final step. ~3 minutes in your browser. After this, "supercard" prompts always
> resolve to the canonical V3 system without you needing to qualify.

---

## Step 1 — Create the Claude Project (30 sec)

1. Open https://claude.ai
2. Click **Projects** (left sidebar) → **+ Create Project**
3. Name it: **Supercard**
4. Description (optional): `Cognitive-prosthesis knowledge synthesis system. V3 (Atlas era).`

## Step 2 — Pin the 15 governance + template docs (90 sec)

In your new Project:

1. Click **Project knowledge** (right side)
2. Click **+ Add content** → **Google Drive**
3. Search and pin each of these by name (search will hit the populated `/Supercard/` hierarchy):

**Core governance (the canonical reference):**

- `INDEX-supercard-v3`
- `PRINCIPLES-supercard-v3`
- `GRAMMAR-block-composition`
- `LENGTHS-mini-standard-xl`
- `RENDERING-spec`
- `CHANGELOG-supercard`
- `STEWARDS-LOG-2026`

**ADRs (decisions and rationale):**

- `ADR-0001-named-eras--accepted`
- `ADR-0002-four-tier-lifecycle--accepted`
- `ADR-0003-frozen-at-authored-version--accepted`

**Templates (for authoring):**

- `TEMPLATE-supercard-standard`
- `TEMPLATE-supercard-mini`
- `TEMPLATE-supercard-xl`
- `TEMPLATE-block`
- `TEMPLATE-adr`
- `TEMPLATE-rfc`

**Plus the populated block library:**

- `INDEX-block-library`

If you want copy-paste IDs (in case search returns multiple matches), use this list:

```
INDEX-supercard-v3                              1qQEjNC-51Pm2KX6nS3GLPAjBV4M8_iBBhglERg3L1OA
PRINCIPLES-supercard-v3                         1-n7FjClqGQQxYoUP5AhH9zLKbZpcDuVNITjkwfq-sCQ
GRAMMAR-block-composition                       1z7iZCAJXqTwoy1OM647XJHtjm5L2uaOqF_Tye8RuqyI
LENGTHS-mini-standard-xl                        1OVPqvpGljGMcRMJPKrlB1xY83yerHbCdvGtMolEOUZ4
RENDERING-spec                                  1bFUm4NGpDgWjk1l5g-Tt-WGJbp0zkYFJSIu6wovjJcc
CHANGELOG-supercard                             1S4RpXdLREKScRa6UiHJt076cM9nqkOYEMQZx2Qf3CzE
STEWARDS-LOG-2026                               1q9NHHyJS60tNnBcB1faMVEVxwr8DQ4wXTIOxSR9YzpM
ADR-0001-named-eras--accepted                   1OPOThGk10EezMAix9dfU8zdP7AvJSZdHM5QmQJgG7-A
ADR-0002-four-tier-lifecycle--accepted          1uXye3D5yBjyKoxVFMvGGhH3m0zkpYEXStzO2Qo9DQbY
ADR-0003-frozen-at-authored-version--accepted   1Z8B1nVrF43zuZ-v4nJ16m8J6sjxTLL8EI5al2vXohaw
TEMPLATE-supercard-standard                     1mbaPkkWr1U-Kbf3CbhjGIJl-iGRfhAC85lQRpT9HEpI
TEMPLATE-supercard-mini                         14Y7CKcV-2pkevIvPmcsV4McjVl-r89LBlk83c516BRk
TEMPLATE-supercard-xl                           1T8CtMRS6pgbvcvFJHYQF7VgbBI2yJmlTaolEq1sdEPM
TEMPLATE-block                                  1JKQm6w_VyBujVa8g_kuYr2ROG-7_lzMolpBZ9-Y1-Ig
TEMPLATE-adr                                    1QlgcnB4b0szivjUmSwJ4C9ShSUKrl-jwiRUSEXJ7PDY
TEMPLATE-rfc                                    1itcS9Qsf54ltwAj7L26yoccSFechzCw7p81ydSep_kc
INDEX-block-library (Sheet)                     1pbjFFJVSIHEc2Pjvcw0xU4vOEchz3FxNWFD9sBofbJs
```

## Step 3 — Paste these Custom Instructions (60 sec)

In the Project, click **Custom Instructions** (or "Set custom instructions") and paste exactly:

```
"Supercard" (unqualified) ALWAYS refers to the current canonical Supercard system,
which lives at /Supercard/ in Google Drive. Never ask which version — there is one
canonical Supercard, and old eras (V1, V2) live ONLY in /Supercard/90-ARCHIVE/.

Default reading order before any card work: INDEX → PRINCIPLES → GRAMMAR.
For deeper questions: LENGTHS, RENDERING, ADRs, CHANGELOG.
Block reference: search /Supercard/20-BLOCKS/ first, then INDEX-block-library Sheet.
Past cards: search /Supercard/30-CARDS/. Drafts and experiments: /Supercard/40-LAB/.
Archive (read-only, do not author into): /Supercard/90-ARCHIVE/.

Authoring rules (V3 = Atlas era, current):
- Strict grayscale only (#000, #FFF, --g-06/12/30/60)
- SF Pro Rounded body, SF Mono code, 393pt mobile canvas
- Single emphasis per block (one bold phrase max)
- Screenshot test on every section
- 1–3 lofted elements per card max
- 7-beat narrative spine: Hook · Evidence · Mechanism · Comparison · Counter · Application · Close
- Mini=5–8 blocks · Standard=10–14 · XL=18–25
- Frozen at authored version (declare frozen_at_version: 3.0.0 in frontmatter)
- Use Core/Stable blocks unless asked for Experimental

When the user asks for a new card:
1. Read INDEX, PRINCIPLES, GRAMMAR from project knowledge first.
2. Search /Supercard/20-BLOCKS/ and /Supercard/30-CARDS/ for relevant prior work.
3. Compose the card following V3 grammar — choose Mini/Standard/XL based on topic depth.
4. Save to /Supercard/30-CARDS/ with filename CARD-{YYYY-MM-DD}-{slug}--draft.
5. Top of doc: Metadata key/value table (see TEMPLATE-supercard-standard).
6. Render an HTML preview as an artifact in chat for review.
```

## Step 4 — Smoke test (the validation prompt)

In a new chat inside the **Supercard** Project, paste exactly:

```
Build me a Standard-length Supercard about [your topic of choice].
Save it to Drive when done and render the HTML as an artifact.
```

What you should observe:

1. Claude reads INDEX → PRINCIPLES → GRAMMAR from pinned knowledge first
2. Drive search hits ONLY `/Supercard/...` results (no V2/postcard pollution)
3. Card lands at `/Supercard/30-CARDS/CARD-2026-04-29-{slug}--draft`
4. Doc opens with the Metadata key/value table at top
5. HTML preview renders in chat as an artifact

If all 5 happen → system is operational and unqualified "supercard" resolves cleanly.

---

## Why this works (one-paragraph reflection)

Three things make "supercard" unambiguous now:

1. **Pollution is gone** — the V2 spec and postcard-format-spec that were sitting in My Drive root have been moved to `/Supercard/90-ARCHIVE/`. Drive search no longer mixes them with current.
2. **The folder is canonical** — `/Supercard/` (no version suffix) IS the current. Future V4 will move V3 contents into `/Supercard/90-ARCHIVE/V3/` and continue at `/Supercard/`.
3. **The Project pre-loads context** — 15 docs pinned to the Project means Claude has full system context before any prompt, so unqualified "supercard" resolves via knowledge, not via search.

The Custom Instructions seal it by making the resolution explicit: "Supercard (unqualified) ALWAYS refers to the current canonical".
