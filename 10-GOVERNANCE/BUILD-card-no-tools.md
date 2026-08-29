# BUILD — produce a card with no tools

| key | value |
|---|---|
| id | BUILD-card-no-tools |
| type | guide |
| era | atlas |
| version | 3.9.0 |
| owner | derick |
| updated | 2026-07-03 |

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
   parentheses, or two sentences. Set real punctuation in the rendered HTML
   (R-42): curly quotes and apostrophes, the single ellipsis character, an en
   dash for a numeric range. Straight quotes stay inside `<code>` and `<pre>`.
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
<main class="canvas">

  <!-- COVER (Beat 1). Optional one-word kicker, title, dek, hero. -->
  <section>
    <div class="eyebrow">OPTIONAL KICKER</div>
    <h1>Five-word title, not a sentence</h1>
    <p class="dek">One-sentence thesis. Fold the date or status into this prose, not a label strip.</p>
    <div class="hero">
      <p class="hook"><strong>The one idea.</strong> One muted supporting sentence that makes the hook stand alone.</p>
    </div>
  </section>

  <!-- one <section> per beat after the cover; first block carries the eyebrow.
       A beat with a subhead uses <h2 class="tile"> — a real heading, so the
       card has an outline for anything reading the HTML instead of the
       picture. The class carries the size; the element carries the structure. -->
  <section>
    <div class="eyebrow">CONTENT-NAMING LABEL</div>
    <h2 class="tile">The claim this beat lands.</h2>
    <!-- block pattern(s) here -->
  </section>

</main>
<div class="glyph">✦ berafoot.com</div>
</body>
</html>
```

Rules for the skeleton: one `<section>` per beat (the 64pt gap and hairline are the
only beat boundary — no "Beat N", no "3 / 7" counters anywhere). The `.eyebrow`
names the section's **content**, is ≤ 4 words, and is **different every time** —
never the beat name, never repeated. The cover eyebrow is optional and sits above
the title; every other eyebrow opens its section.

**Exactly one `<h1>`, and an `<h2 class="tile">` for every subhead** (R-36). The
card is built to be screenshotted, and that is not a reason for the HTML under
it to be a pile of divs: a reader on a screen reader, an in-page outline and any
agent parsing the render all get their structure from the headings. A subhead
styled as a heading but marked up as a `<div>` gives them a document with one
heading and twenty beats.

## The stylesheet (paste verbatim)

This is the flat, current (V3.9) stylesheet — the effective values a card renders
with. Paste it whole into the `<style>`; do not restate values elsewhere.

```css
:root{
  color-scheme:only light;
  --w:#fff; --k:#000;
  --g-06:rgba(0,0,0,.06); --g-12:rgba(0,0,0,.12); --g-30:rgba(0,0,0,.30); --g-60:rgba(0,0,0,.60);
  --ink:#1a1a1a; --ink-2:#595959; --ink-3:#767676;   /* text-ink ladder — every step ≥ 4.5:1 on white */
  --rounded:ui-rounded,"SF Pro Rounded","SF Pro",Inter,-apple-system,BlinkMacSystemFont,system-ui,"Segoe UI",Roboto,sans-serif;
  --mono:ui-monospace,"SF Mono",Menlo,Monaco,Consolas,monospace;
  --s-1:8px; --s-2:12px; --s-3:16px; --s-4:24px; --s-5:32px; --s-7:64px; --s-8:96px;
  /* role tokens (R-39): a rule says WHERE a value belongs. Ink carries glyphs,
     the g-ramp draws rules and fills, and a rule token is never a `color`. */
  --text-emphasis:var(--ink); --text-body:var(--ink-2); --text-quiet:var(--ink-3);
  --rule-hairline:var(--g-12); --fill-chip:var(--g-06); --surface-page:var(--w);
}
/* the selection fill is on the ramp: unstyled, every browser paints a saturated
   blue, the one hue that could otherwise reach a grayscale canvas */
::selection{background:var(--g-12);color:var(--ink)}
*{box-sizing:border-box;margin:0;padding:0}
html,body{background:var(--w);font-family:var(--rounded);color:var(--ink);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
/* overflow-wrap: nothing ever escapes the 393px canvas — long URLs and tokens wrap */
.canvas{width:393px;margin:0 auto;background:var(--w);min-height:100vh;padding:0 16px var(--s-8);overflow-wrap:break-word}

/* a beat is one section: 64pt symmetric gap, one hairline per boundary */
section{padding:var(--s-7) 0;border-bottom:.5px solid var(--g-12)}
section:last-of-type{border-bottom:none}
/* the beat gap is ONE value: a trailing list/table/chart drops its bottom margin */
section>:last-child{margin-bottom:0}
/* the cover opens 32pt from the canvas top (the beat gap governs BETWEEN beats) */
section:first-of-type{padding-top:var(--s-5)}

/* cover — joins are exact: top 32 / title→dek 12 / dek→hero 24 */
h1{font-size:40px;line-height:44px;font-weight:600;letter-spacing:-.02em;margin-bottom:var(--s-2);text-wrap:balance}
.dek{font-size:17px;line-height:26px;font-weight:500;letter-spacing:-.01em;color:var(--ink-2);margin-bottom:var(--s-3)}

/* section label — names CONTENT, never the beat; uppercase, the one positively-tracked role */
.eyebrow{font-size:11px;line-height:14px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:var(--ink-3);margin-bottom:var(--s-3)}
section:first-of-type .eyebrow{margin-bottom:var(--s-1)}  /* cover kicker sits 8pt above the title */

/* the single mid size — merges old tile/section/subtitle into one 26/32 step */
/* R-41: balance evens a short run over its lines; pretty only fixes the last */
h2,.tile,.takeaway,.dek,blockquote{text-wrap:balance}
h2,.tile,.takeaway{font-size:26px;line-height:32px;font-weight:600;letter-spacing:-.012em;margin-bottom:var(--s-2)}
.takeaway{color:var(--ink)}

/* body */
p{font-size:17px;line-height:26px;font-weight:400;letter-spacing:-.01em;color:var(--ink-2);text-wrap:pretty;margin-bottom:var(--s-2)}
p:last-child{margin-bottom:0}
strong{font-weight:700;color:var(--ink)}   /* the ONE emphasis per block */
em{font-style:italic}                       /* titles / foreign terms only — never emphasis */

/* hero — the one bounded anchor: border + radius + padding, no shadow */
.hero{background:var(--w);border:1px solid var(--g-12);border-radius:16px;padding:var(--s-5);margin:var(--s-4) 0 var(--s-3)}
.hero .hook{font-size:19px;line-height:26px;font-weight:500;letter-spacing:-.005em;color:var(--ink-2)}

/* lists — checklist / numbered-principle */
ol,ul{list-style:none}
li{font-size:17px;line-height:26px;letter-spacing:-.01em;color:var(--ink-2);padding:var(--s-1) 0;border-bottom:.5px solid var(--g-12);display:flex;gap:var(--s-2)}
li:last-child{border-bottom:none}
/* R-37: the marker is content (a checklist vs an anti-pattern list vs a
   numbered process), so it takes text ink. --g-30 measures 2.10:1 and is a
   non-text step by R-20. */
.marker{font-variant-numeric:tabular-nums;color:var(--text-quiet);font-weight:600;flex-shrink:0;min-width:18px}

/* definition */
.def-term{font-weight:700;color:var(--ink)}

/* stat-callout — reserved 56pt hero number + a REQUIRED verbal-anchor sentence */
.stat{font-size:56px;line-height:60px;font-weight:700;letter-spacing:-.025em;font-variant-numeric:tabular-nums;color:var(--ink);margin:var(--s-1) 0}

/* stat-grid — 2–6 parallel metrics */
.stat-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:var(--s-4) var(--s-3);margin:var(--s-3) 0}
.stat-grid.cols-3{grid-template-columns:repeat(3,1fr)}
.stat-grid .num{font-size:34px;line-height:38px;font-weight:700;letter-spacing:-.02em;font-variant-numeric:tabular-nums;color:var(--ink)}
.stat-grid .cap{font-size:13px;line-height:18px;color:var(--ink-3);margin-top:2px}

/* quote / pull-quote — the short line after a quote is its attribution */
/* R-43: 8pt in to the attribution, 24pt out to whatever follows — the gap
   around a group has to beat the gap inside it */
blockquote{font-size:19px;line-height:26px;font-weight:500;letter-spacing:-.005em;color:var(--ink);border-inline-start:2px solid var(--k);padding-inline-start:var(--s-3);margin:var(--s-1) 0 var(--s-1)}
blockquote.pull{font-size:24px;line-height:30px;font-weight:600;letter-spacing:-.012em}
.attrib{font-size:13px;line-height:18px;letter-spacing:0;color:var(--text-quiet);margin-bottom:var(--s-4)}

/* code */
/* R-43: `white-space:pre` opts out of the canvas overflow-wrap, so this is the
   one block that can still run past the column. The trailing mask is the cue
   that it scrolls; without one a screenshot loses the tail silently. */
pre{font-family:var(--mono);font-size:14px;line-height:22px;color:var(--k);background:var(--fill-chip);border:1px solid var(--rule-hairline);border-radius:8px;padding:var(--s-2) var(--s-3);margin:var(--s-2) 0;overflow-x:auto;-webkit-mask-image:linear-gradient(to right,#000 0,#000 calc(100% - 24px),transparent 100%);mask-image:linear-gradient(to right,#000 0,#000 calc(100% - 24px),transparent 100%)}

/* table — fixed grid; ≥ 4 rows must close with a bold Takeaway row */
table{width:100%;border-collapse:collapse;table-layout:fixed;margin:var(--s-2) 0;font-size:15px}
th,td{text-align:start;padding:var(--s-2) var(--s-1);border-bottom:.5px solid var(--rule-hairline);line-height:20px;color:var(--ink-2);vertical-align:top;overflow-wrap:break-word}
th{font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:var(--ink-3);font-weight:600}
th:first-child,td:first-child{width:36%;color:var(--ink-3)}
td.num,th.num{text-align:end;font-variant-numeric:tabular-nums}
tr.focal td,tr.focal td strong{color:var(--k)}
tr.takeaway-row td{color:var(--ink);font-weight:600}
table tr:last-child td{border-bottom:none}
/* timeline — a dated table; the date column is tabular and semibold */
table.timeline td:first-child{font-variant-numeric:tabular-nums;font-weight:600;color:var(--ink-3)}

/* sources */
.sources{padding-inline-start:var(--s-3)}
.sources li{font-size:13px;line-height:18px;letter-spacing:0;color:var(--g-60);display:list-item;border:0;padding:2px 0}
.sources li::before{content:"·";color:var(--text-quiet);margin-inline-end:var(--s-1)}

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
/* R-37/R-43: the mark has to be readable (it is how a cropped screenshot is
   traced back), and it clamps to the viewport so it cannot leave the screen. */
.glyph{position:fixed;bottom:16px;left:50%;transform:translateX(calc(min(196px,50vw) - 100% - 4px));font-family:var(--mono);font-size:10px;letter-spacing:.04em;color:var(--text-quiet);background:rgba(255,255,255,.85);backdrop-filter:blur(4px);padding:4px 7px;border-radius:6px;border:1px solid var(--rule-hairline)}
```

## Per-block HTML patterns

Each pattern is the markup for one block. The **bold span is the block's one
emphasis** — never two per block.

```html
<!-- subhead — a beat's claim, above its blocks. A heading, not a styled div. -->
<h2 class="tile">The claim this beat lands.</h2>

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

<!-- numbered-principle / process-flow — subordinate actions share one verb -->
<ol>
  <li><span class="marker">1</span><span>Grade each recall honestly.</span></li>
  <li><span class="marker">2</span><span>One deck per topic.</span></li>
  <li><span class="marker">3</span><span>Review daily.</span></li>
</ol>

<!-- checklist — same rows, a ✓ marker instead of a numeral -->
<ul>
  <li><span class="marker">✓</span><span>Review before you would forget, not after.</span></li>
  <li><span class="marker">✓</span><span>Keep answers to one sentence.</span></li>
</ul>

<!-- anti-pattern — the list of don'ts; ✗ marker -->
<ul>
  <li><span class="marker">✗</span><span>Rereading highlights instead of recalling.</span></li>
  <li><span class="marker">✗</span><span>One giant deck for every subject.</span></li>
</ul>

<!-- pull-quote (Close) / quote-as-evidence (Evidence·Counter) — verbatim; the
     attribution line is required and reads small in tertiary ink -->
<blockquote class="pull">Memory is the residue of thought.</blockquote>
<p class="attrib">Daniel Willingham</p>

<!-- table — ≥ 4 rows close with a bold Takeaway row; mark a focal data column `num` -->
<table>
  <tr><th scope="col">Method</th><th scope="col" class="num">Retention</th></tr>
  <tr><td>Massed</td><td class="num">40%</td></tr>
  <tr><td>Spaced</td><td class="num">80%</td></tr>
  <tr class="takeaway-row"><td>Spacing roughly doubles recall.</td><td class="num">2×</td></tr>
</table>

<!-- timeline — a dated table; the date column carries class="timeline" styling -->
<table class="timeline">
  <tr><th scope="col">Year</th><th scope="col">Event</th></tr>
  <tr><td>1885</td><td>Ebbinghaus charts the forgetting curve</td></tr>
  <tr><td>1985</td><td>SuperMemo ships the first scheduler</td></tr>
</table>

<!-- bar-chart — inline SVG, grayscale, exactly one focal bar at --ink.
     Horizontal bars when labels are words (they get a label lane).
     R-38: every chart carries role="img" and an aria-label built from its OWN
     rows — "label value, label value… X is the focal value." Naming the shape
     ("bar chart") tells a listener the picture and withholds the point. -->
<div class="chart"><svg viewBox="0 0 320 160" role="img" aria-label="Bar chart. Massed 40, Spaced 80. Spaced is the focal value.">
  <line x1="40" y1="140" x2="310" y2="140" stroke="rgba(0,0,0,.12)"/>
  <rect x="60"  y="80"  width="40" height="60"  fill="#767676"/>
  <rect x="140" y="40"  width="40" height="100" fill="#1a1a1a"/>  <!-- focal -->
  <rect x="220" y="100" width="40" height="40"  fill="#767676"/>
</svg></div>

<!-- column-chart — vertical bars for SHORT labels (≤ 8 chars: years, versions).
     Same palette: series #767676, ONE focal column #1a1a1a, axis 12% gray. -->
<div class="chart"><svg viewBox="0 0 320 170" role="img" aria-label="Column chart. 2019 5, 2022 10, 2025 7. 2022 is the focal value.">
  <line x1="0" y1="140" x2="320" y2="140" stroke="rgba(0,0,0,.12)"/>
  <rect x="40"  y="90" width="48" height="50" rx="3" fill="#767676"/>
  <rect x="136" y="40" width="48" height="100" rx="3" fill="#1a1a1a"/>  <!-- focal -->
  <rect x="232" y="70" width="48" height="70" rx="3" fill="#767676"/>
  <text x="64"  y="158" text-anchor="middle" font-size="11" fill="#767676">2019</text>
  <text x="160" y="158" text-anchor="middle" font-size="11" fill="#767676">2022</text>
  <text x="256" y="158" text-anchor="middle" font-size="11" fill="#767676">2025</text>
</svg></div>

<!-- area-chart — a line whose under-curve VOLUME is the point; the fill is the
     one permitted fill, at 6% black. Keep edge labels anchored inward. -->
<div class="chart"><svg viewBox="0 0 320 150" role="img" aria-label="Area chart. The trend rises to its focal final point.">
  <path d="M 10 130 L 10 100 L 110 80 L 210 50 L 310 30 L 310 130 Z" fill="rgba(0,0,0,.06)"/>
  <polyline points="10,100 110,80 210,50 310,30" fill="none" stroke="#767676" stroke-width="2"/>
  <circle cx="310" cy="30" r="5" fill="#1a1a1a"/>  <!-- focal -->
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
<main class="canvas">

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
    <h2 class="tile">Timing does the work, not effort.</h2>
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

</main>
<div class="glyph">✦ berafoot.com</div>
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
8. **No em dash** in card text; the `.sources` marker is a middle dot. Quotes and apostrophes are curly, the ellipsis is one character, and `<code>` keeps straight quotes (R-42).
9. **Length** — block count in the mode's band (Mini 5–8 / Standard 10–14 / XL 18–25); split above 25.
10. **Fit** — nothing escapes the 393px canvas: tables keep the fixed grid, long tokens wrap, chart text stays inside its `viewBox` (anchor edge labels inward), and every beat gap is the same height.
11. **Structure** — one `<h1>`, an `<h2 class="tile">` for every subhead, `<main>` on the canvas, `scope="col"` on column headers, and an `aria-label` on every chart built from its own rows. Read the headings alone: they should outline the card (R-36, R-38, R-40).
12. **Legibility** — every glyph a reader is meant to read, markers and the corner mark included, comes from the ink ladder (`--text-emphasis` / `--text-body` / `--text-quiet`), never from `--g-30`, which measures 2.10:1 and is a rule colour (R-37, R-39).

Everything below this section — Principles, Grammar, Lengths, the Block library —
is the reasoning and the full rule set behind these steps. Read on when you need
the *why* or an edge case; for a straight build, the steps above are enough.
