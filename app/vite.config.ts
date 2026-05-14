import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The React render path for Supercards. Builds to app/dist, which Vercel
// serves (see ../vercel.json). The standalone HTML renders in ../docs/cards
// are copied into dist/html by scripts/copy-renders.mjs after the build, so a
// single Vercel deployment carries both render paths.
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
  },
});
