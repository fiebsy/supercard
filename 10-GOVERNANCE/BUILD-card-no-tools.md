# BUILD — produce a card with no tools

| key | value |
|---|---|
| id | BUILD-card-no-tools |
| type | guide |
| era | atlas |
| version | 3.8.0 |
| owner | derick |
| updated | 2026-06-28 |

---

**Read this first. If all you have is this page and a topic, this section is the
whole job.** It is written for a chat LLM with no repository, no renderer, and no
file system — you produce the finished card yourself, in your reply.

## What you are producing

**One self-contained HTML file** — the card. The reader opens it in a browser and
screenshots it. So your output must:

- be a single HTML document with the `<style>` **inlined** (no external CSS, fonts,
  or scripts; no network);
- render on a **393px-wide mobile canvas**, centered, flat white, edge to edge;
- be **strict grayscale** — black, white, and the gray ramp only. No colour, ever;
- set **SF Pro Rounded** as the typeface (the `--rounded` stack below);
- carry the **corner glyph** as a `position: fixed` element so it lands on every
  screenshot;
- declare `color-scheme: only light` so mobile browsers don't force-darken it.

Emit the HTML in one fenced ```html block so the reader can copy the whole file.
Do not also write files, run commands, or describe a build pipeline — there is none
here. Your reply *is* the deliverable.

## Build sequence

Walk these in order. The detail behind each step is in the sections further down
this spec (Principles, Grammar, Block library); you do not need anything outside
this page.

1. **Pick the mode** from the request verb — `summary` / `briefing` / `deep-dive`
   / `reference` (default `briefing`). It sets depth and length. State it in one
   line before you build.
2. **Gather the content in-context.** Use what you know plus anything the user
   supplied. Every claim needs a real basis; if you are unsure of a number, say so
   in the prose rather than inventing precision.
3. **Outline the 7 beats** — Hook, Evidence, Mechanism, Comparison, Counter,
   Application, Close (Mini keeps 1·2·3·6·7). One idea per beat.
4. **Pick one block per unit of content** with the Grammar decision tree
   (shape-first: number → stat; comparison → comparison/chart; steps → process;
   definition → definition; …; prose is the *last* resort).
5. **Write each block with exactly one emphasis** — one bold span. Prose blocks
   open with a 2–6-word **bold lead-clause** and stay ≤ 3 sentences / ≤ 60 words,
   plain language (grade ≤ 9). No em dashes in card text; recast as comma, colon,
   parentheses, or two sentences.
6. **Assemble the HTML** from the skeleton + per-block patterns below.
7. **Run the self-check** at the end of this section. Fix every "no" before you
   ship.

Length: Mini 5–8 blocks, Standard 10–14, XL 18–25. Above 25, split into parts.
Cards: at most **1–3 bounded cards** (the hero + ≤ 2) — everything else is flat.

## The HTML skeleton

Copy this shell, paste the stylesheet from the next section into the `<style>`,
fill the slots, and drop the per-block patterns into the sections.

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=393, initial-scale=1">
<meta name="color-scheme" content="only light">
<title>CARD TITLE</title>
<style>/* paste the stylesheet here */</style>
</head>
<body>
<div class="canvas">

  <!-- COVER (Beat 1). Optional one-word kicker, title, dek, hero. -->
  <section>
    <div class="eyebrow">OPTIONAL KICKER</div>
    <h1>Five-word title, not a sentence</h1>
    <p class="dek">One-sentence thesis. Fold the date or status into this prose, not a label strip.</p>
    <div class="hero">
      <p class="hook"><strong>The one idea.</strong> One muted supporting sentence that makes the hook stand alone.</p>
    </div>
  </section>

  <!-- one <section> per beat after the cover; first block carries the eyebrow -->
  <section>
    <div class="eyebrow">CONTENT-NAMING LABEL</div>
    <!-- block pattern(s) here -->
  </section>

  <div class="glyph">✦ berafoot.com</div>
</div>
</body>
</html>
```

Rules for the skeleton: one `<section>` per beat (the 64pt gap and hairline are the
only beat boundary — no "Beat N", no "3 / 7" counters anywhere). The `.eyebrow`
names the section's **content**, is ≤ 4 words, and is **different every time** —
never the beat name, never repeated. The cover eyebrow is optional and sits above
the title; every other eyebrow opens its section.

## The stylesheet (paste verbatim)

This is the flat, current (V3.7) stylesheet — the effective values a card renders
with. Paste it whole into the `<style>`; do not restate values elsewhere.

```css
:root{
  color-scheme:only light;
  --w:#fff; --k:#000;
  --g-12:rgba(0,0,0,.12); --g-30:rgba(0,0,0,.30); --g-60:rgba(0,0,0,.60);
  --ink:#1a1a1a; --ink-2:#595959; --ink-3:#767676;   /* text-ink ladder — every step ≥ 4.5:1 on white */
  --rounded:ui-rounded,"SF Pro Rounded","SF Pro",-apple-system,BlinkMacSystemFont,system-ui,"Segoe UI",Roboto,sans-serif;
  --mono:ui-monospace,"SF Mono",Menlo,Monaco,Consolas,monospace;
  --s-1:8px; --s-2:12px; --s-3:16px; --s-4:24px; --s-5:32px; --s-7:64px; --s-8:96px;
}
*{box-sizing:border-box;margin:0;padding:0}
html,body{background:var(--w);font-family:var(--rounded);color:var(--ink);-webkit-font-smoothing:antialiased}
.canvas{width:393px;margin:0 auto;background:var(--w);min-height:100vh;padding:0 16px var(--s-8)}

/* a beat is one section: 64pt symmetric gap, one hairline per boundary */
section{padding:var(--s-7) 0;border-bottom:.5px solid var(--g-12)}
section:last-of-type{border-bottom:none}

/* cover */
h1{font-size:40px;line-height:44px;font-weight:600;letter-spacing:-.02em;margin-bottom:var(--s-3)}
.dek{font-size:17px;line-height:26px;font-weight:500;letter-spacing:-.01em;color:var(--ink-2);margin-bottom:var(--s-3)}

/* section label — names CONTENT, never the beat; uppercase, the one positively-tracked role */
.eyebrow{font-size:11px;line-height:14px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:var(--ink-3);margin-bottom:var(--s-3)}
section:first-of-type .eyebrow{margin-bottom:var(--s-1)}  /* cover kicker sits 8pt above the title */

/* the single mid size — merges old tile/section/subtitle into one 26/32 step */
h2,.tile,.takeaway{font-size:26px;line-height:32px;font-weight:600;letter-spacing:-.012em;margin-bottom:var(--s-2)}
.takeaway{color:var(--ink)}

/* body */
p{font-size:17px;line-height:26px;font-weight:400;letter-spacing:-.01em;color:var(--ink-2);text-wrap:pretty;margin-bottom:var(--s-2)}
p:last-child{margin-bottom:0}
strong{font-weight:700;color:var(--ink)}   /* the ONE emphasis per block */
em{font-style:italic}                       /* titles / foreign terms only — never emphasis */

/* hero — the one bounded anchor: border + radius + padding, no shadow */
.hero{background:var(--w);border:1px solid var(--g-12);border-radius:16px;padding:var(--s-5);margin:var(--s-2) 0 var(--s-3)}
.hero .hook{font-size:19px;line-height:26px;font-weight:500;letter-spacing:-.005em;color:var(--ink-2)}

/* lists — checklist / numbered-principle */
ol,ul{list-style:none}
li{font-size:17px;line-height:26px;letter-spacing:-.01em;color:var(--ink-2);padding:var(--s-1) 0;border-bottom:.5px solid var(--g-12);display:flex;gap:var(--s-2)}
li:last-child{border-bottom:none}
.marker{font-variant-numeric:tabular-nums;color:var(--g-30);font-weight:600;flex-shrink:0;min-width:18px}

/* definition */
.def-term{font-weight:700;color:var(--ink)}

/* stat-callout — reserved 56pt hero number + a REQUIRED verbal-anchor sentence */
.stat{font-size:56px;line-height:60px;font-weight:700;letter-spacing:-.025em;font-variant-numeric:tabular-nums;color:var(--ink);margin:var(--s-1) 0}

/* stat-grid — 2–6 parallel metrics */
.stat-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:var(--s-4) var(--s-3);margin:var(--s-3) 0}
.stat-grid.cols-3{grid-template-columns:repeat(3,1fr)}
.stat-grid .num{font-size:34px;line-height:38px;font-weight:700;letter-spacing:-.02em;font-variant-numeric:tabular-nums;color:var(--ink)}
.stat-grid .cap{font-size:13px;line-height:18px;color:var(--ink-3);margin-top:2px}

/* quote / pull-quote */
blockquote{font-size:19px;line-height:26px;font-weight:500;letter-spacing:-.005em;color:var(--ink);border-left:2px solid var(--k);padding-left:var(--s-3);margin:var(--s-1) 0 var(--s-3)}
blockquote.pull{font-size:24px;line-height:30px;font-weight:600;letter-spacing:-.012em}

/* code */
pre{font-family:var(--mono);font-size:14px;line-height:22px;color:var(--k);background:rgba(0,0,0,.03);border:1px solid var(--g-12);border-radius:8px;padding:var(--s-2) var(--s-3);margin:var(--s-2) 0;overflow-x:auto}

/* table — fixed grid; ≥ 4 rows must close with a bold Takeaway row */
table{width:100%;border-collapse:collapse;table-layout:fixed;margin:var(--s-2) 0;font-size:15px}
th,td{text-align:left;padding:var(--s-2) var(--s-1);border-bottom:.5px solid var(--g-12);line-height:20px;color:var(--ink-2);vertical-align:top;overflow-wrap:break-word}
th{font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:var(--ink-3);font-weight:600}
th:first-child,td:first-child{width:36%;color:var(--ink-3)}
td.num,th.num{text-align:right;font-variant-numeric:tabular-nums}
tr.focal td,tr.focal td strong{color:var(--k)}
tr.takeaway-row td{color:var(--ink);font-weight:600}
table tr:last-child td{border-bottom:none}

/* sources */
.sources{padding-left:var(--s-3)}
.sources li{font-size:13px;line-height:18px;color:var(--g-60);display:list-item;border:0;padding:0}
.sources li::before{content:"·";color:var(--g-30);margin-right:var(--s-1)}

/* flashcard-list — a compact Q/A study list; dt = question (the row's one
   emphasis, primary ink), dd = answer (secondary ink). No bold; the weight +
   ink contrast is the emphasis. Parallel questions are the adjacency exception. */
.flashcards{margin:var(--s-3) 0}
.flashcards .fc{padding:var(--s-2) 0;border-bottom:.5px solid var(--g-12)}
.flashcards .fc:first-child{padding-top:0}
.flashcards .fc:last-child{padding-bottom:0;border-bottom:none}
.flashcards dt{font-size:17px;line-height:24px;font-weight:600;letter-spacing:-.01em;color:var(--ink);margin-bottom:2px}
.flashcards dd{font-size:17px;line-height:26px;font-weight:400;letter-spacing:-.01em;color:var(--ink-2)}

/* corner glyph — fixed, lands on every screenshot */
.glyph{position:fixed;bottom:16px;left:50%;transform:translateX(calc(196px - 100% - 4px));font-family:var(--mono);font-size:10px;letter-spacing:.04em;color:var(--g-30);background:rgba(255,255,255,.85);backdrop-filter:blur(4px);padding:4px 7px;border-radius:6px;border:1px solid var(--g-12)}
```

## Per-block HTML patterns

Each pattern is the markup for one block. The **bold span is the block's one
emphasis** — never two per block.

```html
<!-- standard-text — opens with a bold lead-clause, ≤ 3 sentences -->
<p><strong>Lead-clause names the point.</strong> One or two plain sentences that deliver it without a second bold run.</p>

<!-- key-takeaway — the synthesis line (Close beat, and the hero treatment) -->
<p class="takeaway"><strong>The bottom line</strong> in one sharp clause.</p>

<!-- stat-callout — focal number + REQUIRED verbal anchor (a bare number is forbidden) -->
<div class="stat">33%</div>
<p><strong>One-third the study time.</strong> A 2008 meta-analysis found spaced review reaches the same retention as cramming with about a third of the hours.</p>

<!-- stat-grid — 2–6 parallel metrics on one dimension -->
<div class="stat-grid">
  <div><div class="num">84</div><div class="cap">studies pooled</div></div>
  <div><div class="num">2×</div><div class="cap">recall vs. massed</div></div>
</div>

<!-- definition — the named term is the emphasis -->
<p><span class="def-term">Retrieval at the edge of forgetting.</span> Recalling an item at the longest interval you can still answer strengthens memory more than re-reading.</p>

<!-- numbered-principle / checklist — subordinate actions share one verb -->
<ol>
  <li><span class="marker">1</span><span>Grade each recall honestly.</span></li>
  <li><span class="marker">2</span><span>One deck per topic.</span></li>
  <li><span class="marker">3</span><span>Review daily.</span></li>
</ol>

<!-- pull-quote (Close) / quote-as-evidence (Evidence·Counter) — verbatim, with attribution -->
<blockquote class="pull">Memory is the residue of thought.</blockquote>
<p class="sources"><span>Daniel Willingham</span></p>

<!-- table — ≥ 4 rows close with a bold Takeaway row; mark a focal data column `num` -->
<table>
  <tr><th>Method</th><th class="num">Retention</th></tr>
  <tr><td>Massed</td><td class="num">40%</td></tr>
  <tr><td>Spaced</td><td class="num">80%</td></tr>
  <tr class="takeaway-row"><td>Spacing roughly doubles recall.</td><td class="num">2×</td></tr>
</table>

<!-- bar-chart — inline SVG, grayscale, exactly one focal bar at --ink -->
<div class="chart"><svg viewBox="0 0 320 160">
  <line x1="40" y1="140" x2="310" y2="140" stroke="rgba(0,0,0,.12)"/>
  <rect x="60"  y="80"  width="40" height="60"  fill="#767676"/>
  <rect x="140" y="40"  width="40" height="100" fill="#1a1a1a"/>  <!-- focal -->
  <rect x="220" y="100" width="40" height="40"  fill="#767676"/>
</svg></div>

<!-- flashcard-list — 5 to 10 Q/A pairs, the highest-yield recall items. No
     bold: the dt (question) is the emphasis via weight + ink, the dd (answer)
     is muted. Each side stays to a few words. -->
<dl class="flashcards">
  <div class="fc"><dt>What does spacing buy you?</dt><dd>Cramming's retention for about a third of the study time.</dd></div>
  <div class="fc"><dt>When should you review a card?</dt><dd>Just before you would otherwise forget it.</dd></div>
  <div class="fc"><dt>What resets the forgetting curve?</dt><dd>A successful recall at the longest interval you can still answer.</dd></div>
</dl>

<!-- section divider — only between beats, never between every block -->
<section class="divider"><div class="eyebrow">NEXT MOVEMENT</div><h2>The claim it lands</h2></section>
```

## A complete worked card

A full Mini (`summary` mode) on spaced repetition — six blocks, one emphasis each.
Copy its shape.

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=393, initial-scale=1">
<meta name="color-scheme" content="only light">
<title>Spaced repetition</title>
<style>/* paste the stylesheet above, verbatim */</style>
</head>
<body>
<div class="canvas">

  <section>
    <h1>Spaced repetition</h1>
    <p class="dek">Same retention as cramming for a third of the hours: paid in timing, not effort.</p>
    <div class="hero">
      <p class="hook"><strong>Retrieval at the edge of forgetting.</strong> A recall attempt at the longest interval you can still answer strengthens memory more than re-reading ever does.</p>
    </div>
  </section>

  <section>
    <div class="eyebrow">The evidence</div>
    <div class="stat">33%</div>
    <p><strong>One-third the study time.</strong> A 2008 meta-analysis of 84 studies found spaced review reaches cramming's retention with about a third of the hours.</p>
  </section>

  <section>
    <div class="eyebrow">The mechanism</div>
    <p><span class="def-term">The forgetting curve.</span> Recall decays predictably; a review just before you would forget resets it higher each time.</p>
    <p><strong>Software does the scheduling.</strong> Anki and SuperMemo show each card just before you would forget it, so the only job left is to grade each recall honestly.</p>
  </section>

  <section>
    <div class="eyebrow">How to start</div>
    <ol>
      <li><span class="marker">1</span><span>Grade each recall honestly.</span></li>
      <li><span class="marker">2</span><span>One deck per topic.</span></li>
      <li><span class="marker">3</span><span>Review daily, briefly.</span></li>
    </ol>
  </section>

  <section>
    <div class="eyebrow">The bottom line</div>
    <p class="takeaway"><strong>It replaces hours with timing.</strong> Cramming's retention, a third of the work, paid in daily discipline.</p>
  </section>

  <div class="glyph">✦ berafoot.com</div>
</div>
</body>
</html>
```

## Self-check before you ship

Tool-less version of the gates. Any "no" means fix it, not ship it.

1. **Screenshot test** — crop any one section: does it carry one complete idea, with the corner glyph in frame, and a first sentence that stands without prior context?
2. **One emphasis per block** — exactly one bold span in each block? (No block has two.)
3. **Bold-only read** — read just the bold clauses top to bottom: do they compose the card's thesis in a sentence?
4. **Plain language** — every prose block ≤ 3 sentences / ≤ 60 words, grade ≤ 9, active voice, jargon defined on first use?
5. **Grayscale** — black / white / gray only? No colour anywhere, including charts.
6. **Cards** — at most 1–3 bounded cards (hero + ≤ 2)? Everything else flat?
7. **No scaffold** — no "Beat N", no "3 / 7" counter, no block-type label on the canvas? Each eyebrow names content and is distinct?
8. **No em dash** in card text; the `.sources` marker is a middle dot.
9. **Length** — block count in the mode's band (Mini 5–8 / Standard 10–14 / XL 18–25); split above 25.

Everything below this section — Principles, Grammar, Lengths, the Block library —
is the reasoning and the full rule set behind these steps. Read on when you need
the *why* or an edge case; for a straight build, the steps above are enough.
