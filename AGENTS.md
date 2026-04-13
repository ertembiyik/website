# AGENTS.md

This file provides guidance to coding agents when working with code in this repository.

## Commands

```bash
bun install          # Install dependencies
bun run dev          # Start local development server
bun run build        # Production build
bun run preview      # Preview build locally via Wrangler
bun run deploy       # Build and deploy to Cloudflare Workers
```

## Architecture

Personal portfolio/CV website built with Astro, deployed as static assets on Cloudflare Workers. Dark terminal aesthetic with visible markdown syntax.

### Tech Stack
- **Astro 6** - Static site generator with `output: 'static'`
- **TypeScript** - Strict mode via Astro's tsconfig
- **Cloudflare Workers Assets** - Hosting via Wrangler asset deployment
- **Ubuntu Sans Mono** - Monospace font from Google Fonts

### Content Structure
- `src/content/site.md` - Main page content (YAML frontmatter + markdown)
- `src/content/work/*.md` - Work experience entries (routed via `src/pages/work/[slug].astro`)
- `src/content/projects/*.md` - Project entries (routed via `src/pages/projects/[slug].astro`)
- Dynamic routes use Astro's `getStaticPaths()` for static generation

### Data Flow
1. `src/pages/index.astro` imports `site.md` via `rawContent()` for custom parsing
2. `VisibleMarkdown.astro` parses raw markdown at build time, rendering with visible grayed-out syntax symbols
3. Detail pages use progressive disclosure — short summaries on main page link to dedicated pages

### Key Components
- **VisibleMarkdown.astro** - Custom regex-based markdown renderer. Shows syntax symbols (##, ###, -, ---) grayed out while applying formatting. Differentiates internal vs external links.
- **Layout.astro** - Shared layout wrapper

### Styling
- Global styles and CSS variables in `src/styles/globals.css`
- Dark-only theme (#0a0a0a background), no light mode
- Zero client-side JavaScript — pure static HTML
- Scoped styles in index.astro for layout
