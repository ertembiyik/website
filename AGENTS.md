# AGENTS.md

This file provides guidance to coding agents when working with code in this repository.

## Commands

```bash
bun install          # Install dependencies
bun run dev          # Start local development server
bun run check        # Run Astro and TypeScript diagnostics
bun run lint         # Lint Astro, TypeScript, and JavaScript
bun run build        # Production build
bun run preview      # Preview build locally via Wrangler
bun run deploy       # Build and deploy to Cloudflare Workers
```

## Architecture

Personal site built with Astro, deployed as static assets on Cloudflare Workers. One dark, narrow column (39rem): avatar, short first-person intro, experience, side projects, writing, stack, contact. Zero framework JavaScript.

### Tech Stack
- **Astro 7** - Static site generator with `output: 'static'`
- **TypeScript** - Strict mode via Astro's tsconfig
- **Astro Content Collections** - Typed Markdown-backed work, project, and speaking entries with `image()` icons
- **astro:assets** - App icons and the avatar are optimized at build time (1x/2x/3x webp)
- **Cloudflare Workers Assets** - Hosting via Wrangler asset deployment
- **Inter Variable + Geist Mono Variable** - Self-hosted from fontsource packages, preloaded

### Content Structure
- `src/data/site.ts` - Profile copy, links, external writing, and the Connect row (inline Simple Icons glyph paths)
- `src/content/work/*.md` - Work experience entries (`role`, `period`, optional `icon`)
- `src/content/projects/*.md` - Side project entries (`year`, `icon`)
- `src/content/speaking/*.md` - Talks (`event`, `year`, `icon`)
- Every entry has `links` (first one is the primary chip on its detail page) and optional `screens` (app screenshots rendered in iPhone frames); keep link lists out of Markdown bodies
- `src/assets/me/` - Photos and clips for the hero pile, sorted by filename
- `src/content.config.ts` - Schemas and glob loaders for all collections
- `src/assets/icons/` - App icons and company logos referenced from frontmatter
- Dynamic routes use `getStaticPaths()` and `render()` for static generation

### Data Flow
1. `src/pages/index.astro` queries typed collections with `getCollection()`
2. Collection frontmatter supplies summaries, icons, and metadata for the index
3. Markdown bodies render only on detail pages through the shared dynamic route
4. Site-wide profile and writing data comes from `src/data/site.ts`

### Key Components
- **AppIcon.astro** - Renders an image inside an Apple-style squircle (`corner-shape: squircle` with an SVG mask fallback) and optionally assigns a `view-transition-name`
- **IconTile.astro** - Monochrome glyph in a squircle tile with a hover tooltip, used for the Connect row
- **PhotoStack.astro** - The hero pile of photos/videos; hover fans it out, click sends the top card to the back
- **Layout.astro** - Metadata, font preloads, and the once-per-session intro flag

### Styling and motion
- Global styles and CSS variables live in `src/styles/globals.css`
- Dark-only theme, `#0a0a0a` background
- `<ClientRouter />` (astro:transitions) swaps pages in place, so view transitions run without a document reload; an entry's icon and title morph into the detail heading via `icon-<id>` / `title-<id>` names. Detail pages carry them statically; on the index several links can point at one entry (the intro sentence and its row), so candidates are marked with `data-morph` inside an `a[data-morph-scope]` and the script in `Layout.astro` assigns the names at navigation time to the link that was used, and restores them on that same link when coming back. Scripts bind on `astro:page-load`
- Intro reveal plays once per session (`sessionStorage`), gated on `prefers-reduced-motion`
- Hover states only under `(hover: hover) and (pointer: fine)`; 44px tap targets on touch
- Client JavaScript is limited to the photo pile shuffle and the detail-page back link; both bind on `astro:page-load`
- Copy style: no period at the end of a paragraph or summary; em dashes with spaces
- Section titles are body-size Inter at weight 500 (no mono, no uppercase); dates are 13px tabular labels on the right of each row, years only on the index (`years()` in index.astro), full periods on detail pages

### Dev feedback (Agentation)
- `src/dev/agentation.ts` mounts the [Agentation](https://agentation.com) toolbar with React in copy-prompt mode (annotate, copy the markdown, paste it to the agent); it carries the toolbar's stylesheets through `astro:before-swap` and remounts on `astro:after-swap`. `Layout.astro` loads it through an inline module script only when `import.meta.env.DEV`, so React (a devDependency) never ships to production. No MCP server is configured

### Agent readiness
- `public/robots.txt` declares Content Signals (`search=yes, ai-input=yes, ai-train=yes`) and names the AI crawlers; `public/_headers` repeats the signal as a response header and adds `Link` headers to `/llms.txt` and the sitemap
- `src/data/markdown.ts` builds Markdown twins from the same collections: `/llms.txt`, `/index.md`, and `/<category>/<slug>/index.md` (endpoints under `src/pages/`); each HTML page links its twin with `<link rel="alternate" type="text/markdown">`
- `src/worker.ts` answers `Accept: text/markdown` on page paths with the twin (`Vary: Accept`, `x-markdown-tokens`); `wrangler.jsonc` routes only `/`, `/work/*`, `/projects/*`, `/speaking/*` through it, so hashed assets stay on the free static path
- The home page carries a schema.org `Person` JSON-LD block
- Lighthouse's Agentic Browsing category keys off the accessibility tree: keep ARIA attributes on elements with a valid role, and keep text at 4.5:1 (`--text-3` is the floor)

