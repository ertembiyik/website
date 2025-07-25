// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

// Import polyfills for client-side compatibility
import "./src/polyfills/index.ts";

// https://astro.build/config
export default defineConfig({
  output: 'static',
  integrations: [react()],
  vite: {
    build: {
      target: 'es2020'
    }
  },
});
