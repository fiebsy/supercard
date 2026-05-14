// Post-build: copy the standalone HTML renders from ../docs into dist/html so
// the Vercel deployment carries BOTH render paths — the React app at / and the
// canonical standalone HTML at /html/cards/CARD-...html. Renders are views,
// never sources (RENDERING-spec) — this only copies, never edits.
import { cp, access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const docs = resolve(here, "../../docs");
const dest = resolve(here, "../dist/html");

try {
  await access(docs);
  await cp(docs, dest, { recursive: true });
  console.log(`[copy-renders] ../docs -> dist/html`);
} catch (err) {
  console.warn(`[copy-renders] skipped: ${err.message}`);
}
