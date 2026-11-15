// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://ertembiyik.com',
  output: 'static',
  devToolbar: {
    enabled: false,
  },
  integrations: [sitemap()],
  // The whole stylesheet is ~4 KB; inlining it removes the only render-blocking request.
  build: {
    inlineStylesheets: 'always',
  },
  // src/scripts/navigation.ts prefetches pages itself, with the request the client router sends.
  prefetch: false,
});
