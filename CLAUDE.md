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

This is a personal portfolio/CV website built with Astro and React, deployed to Cloudflare Workers.

### Tech Stack
- **Astro 5** - Static site generator with `output: 'static'`
- **React 19** - Client-side interactivity via `client:load` directive
- **TypeScript** - Strict mode via Astro's tsconfig
- **Cloudflare Workers** - Hosting via Wrangler

### Data Flow
1. CV data lives in `/public/data/cv.json`
2. Content sections are MDX files in `/public/content/sections/` (jobs, side-projects, talks, links, education)
3. `src/pages/index.astro` fetches cv.json and passes it to the React Profile component
4. Profile renders sections dynamically based on the JSON structure

### Key Components
- **Profile.tsx** - Main component that renders CV sections
- **Attachments.tsx** - Horizontal scrolling media gallery with ScrollBooster
- **Lightbox.tsx** - Full-screen media viewer (uses ReactDOM.createPortal)
- **RichText.tsx** - Memoized Markdown renderer

### Styling
- CSS Modules for component styles (e.g., `Profile.module.css`)
- Global theme variables in `src/styles/globals.css`
- Dark mode support via CSS custom properties
