# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start local development server
pnpm build        # Production build
pnpm preview      # Preview build locally via Wrangler
pnpm deploy       # Build and deploy to Cloudflare Workers
```

## Architecture

Personal portfolio/CV website built with Astro, deployed to Cloudflare Workers. Dark terminal aesthetic with visible markdown syntax.

### Tech Stack
- **Astro 5** - Static site generator with `output: 'static'`
- **TypeScript** - Strict mode via Astro's tsconfig
- **Cloudflare Workers** - Hosting via Wrangler
- **Ubuntu Sans Mono** - Monospace font from Google Fonts

### Data Flow
1. CV data lives in `/public/data/cv.json`
2. `src/pages/index.astro` reads cv.json and constructs markdown strings
3. `VisibleMarkdown.astro` parses markdown at build time, rendering with visible grayed-out syntax symbols

### Key Components
- **VisibleMarkdown.astro** - Custom markdown renderer that shows syntax symbols (##, ###, -, ---) grayed out while applying formatting

### Styling
- Global styles in `src/styles/globals.css`
- Dark-only theme (#0a0a0a background)
- Scoped styles in index.astro for layout
