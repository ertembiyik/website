# AGENTS.md

This file provides guidance to coding agents when working with code in this repository.

## Commands

```bash
bun install          # Install dependencies
bun run dev          # Start local development server
bun run check        # Astro diagnostics, then generate Worker types and type-check worker/
bun run test         # Worker unit tests (bun test)
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
- `src/assets/og-card.png` - The 1200×630 social card (photo pile, name and the garland), a screenshot of the live page composed at that size; `Layout.astro` imports it with `?url`, so a new card gets a new hashed URL and link previews pick it up
- Dynamic routes use `getStaticPaths()` and `render()` for static generation

### Data Flow
1. `src/pages/index.astro` queries typed collections with `getCollection()`
2. Collection frontmatter supplies summaries, icons, and metadata for the index
3. Markdown bodies render only on detail pages through the shared dynamic route
4. Site-wide profile and writing data comes from `src/data/site.ts`

### Key Components
- **AppIcon.astro** - Renders an image inside an Apple-style squircle (`corner-shape: squircle` with an SVG mask fallback) and optionally assigns a `view-transition-name`
- **IconTile.astro** - Monochrome glyph in a squircle tile with a hover tooltip, used for the Connect row
- **PhotoStack.astro** - The hero pile of photos/videos. A mouse hover (fine pointers) or a tap opens it into an orb around the top photo: the ring follows the pointer, or spins when dragged on touch, and a picked card swaps places with the top photo. The ring shares its places evenly among the cards other than the top one, and the pile opens in one move. A click on the top card, or a sideways swipe on touch, sends it to the back: a pressed card shrinks at once, a swiped one follows the finger 1:1 for a quarter of its width and then rubber-bands against its own width (so it never travels much past one card), and letting go in the stretch, or flicking so it would coast into it (UIScrollView's deceleration projection), sends it to the back, while a small drag that stays in the free stretch springs home. Every move is a spring, with a little bounce only after a throw; reduced motion keeps the orb off
- **AsciiGarland.astro** - The flower garland above the footer. `src/assets/garland.svg` (a painted illustration, edit it to change the art) is rasterised with sharp at build time and turned into coloured characters: one glyph per 8×13 px cell from coverage, light and edges; colours lifted in OKLCH, snapped to a 48-tone k-means palette and written in Display P3 (also emitted per tone in `data-tones`). It sits one section gap below the last section, its six rows of sky rising into that gap, with its ground running straight into the footer (no rule between them) (`-webkit-text-size-adjust: 100%` on `html` keeps iPhone Safari from inflating its 4px glyphs, which threw the layout off; it stands alone because the CSS minifier drops a prefixed declaration that sits beside its unprefixed twin, and Safari reads only the prefixed one). It runs full bleed: the painting tiles seamlessly (flower heads stay clear of the seam) and repeats across any width. The script finds each flower (connected same-hue patches) and draws everything with WebGL 2: every glyph is one instance of a quad over a white glyph atlas, the vertex shader moves it by its plant's bend or the wave field from a small float texture, a second instanced pass with a blurred atlas adds the glow, flower heads paint an opaque cell behind themselves (back-to-front order) and the edge fade is done in the shader. Physics: each stem is a cantilever rooted at the ground under a heavy head, drawn in the beam's exact shape for the loads on it, with the head riding the tip as one piece; the head swings with inertia toward a 1D wave field driven by a breeze and rolling gusts. The hand is a soft spring rather than a wall: a touched point gives part of the way, so a slow push bends a flower (pushed low, the head swings further), and a fast swipe, which can cross a stem between pointer events, flicks whatever its path runs through toward its own speed; a stem the hand slips off springs back, leaves follow the field, the pointer or a finger pushes plants aside and stirs the field, and bees (about one per 90 columns in view, flying across the whole width rather than repeating with the painting, each on a flower of its own) hover between flowers, and butterflies (about one per 160 columns, blue or white `\i/` over `/'\` wings that fold through `| |` to `' '`) drift between the tall flowers in bursts of bobbing wingbeats and short glides on open wings, land on a head and ride it as it sways, and fly off when a hand comes near. Untouched it draws from a timer at about 24fps; after 8s without scrolling, pointer or keys the breeze dies down, the bees land and drawing stops (0% CPU) until something moves. Without WebGL 2 or with reduced motion the static art shows
- **Layout.astro** - Metadata, font preloads, and the once-per-session intro flag

### Styling and motion
- Global styles and CSS variables live in `src/styles/globals.css`
- Dark-only theme, `#0a0a0a` background
- `<ClientRouter />` (astro:transitions) swaps pages in place, so view transitions run without a document reload; an entry's icon and title morph into the detail heading via `icon-<id>` / `title-<id>` names. Detail pages carry them statically; on the index several links can point at one entry (the intro sentence and its row), so candidates are marked with `data-morph` inside an `a[data-morph-scope]` and the script in `Layout.astro` assigns the names at navigation time to the link that was used, and restores them on that same link when coming back. Scripts bind on `astro:page-load`
- Intro reveal plays once per session (`sessionStorage`), gated on `prefers-reduced-motion`
- Hover states only under `(hover: hover) and (pointer: fine)`; 44px tap targets on touch
- Client JavaScript is limited to the photo pile (shuffle and orb), the garland's wind, and the detail-page back link; all bind on `astro:page-load`
- Copy style: no period at the end of a paragraph or summary; no em dashes (commas, colons or parentheses instead; en dashes with spaces for ranges like `Feb 2026 – now`)
- Section titles are body-size Inter at weight 500 (no mono, no uppercase); dates are 13px tabular labels on the right of each row, years only on the index (`years()` in index.astro), full periods on detail pages

### Agent readiness
- `public/robots.txt` declares Content Signals (`search=yes, ai-input=yes, ai-train=yes`) and names the AI crawlers; `public/_headers` repeats the signal as a response header and adds `Link` headers to `/llms.txt` and the sitemap
- `src/data/markdown.ts` builds Markdown twins from the same collections: `/llms.txt`, `/index.md`, and `/<category>/<slug>/index.md` (endpoints under `src/pages/`); each HTML page links its twin with `<link rel="alternate" type="text/markdown">`
- `worker/negotiate.ts` (called from the `worker/index.ts` entry) answers `Accept: text/markdown` on page paths with the twin and hands every other request to static assets untouched; `worker/accept.ts` parses Accept per RFC 9110. `wrangler.jsonc` routes only `/`, `/work/*`, `/projects/*`, `/speaking/*` through it, and `public/_headers` sets `Vary: Accept` on both variants plus a UTF-8 charset on `.md` and `.txt`, so the Worker returns asset responses as they are and never builds its own. `workers_dev` is off: production is served from ertembiyik.com only, with preview URLs kept for pull requests. The Worker has its own `worker/tsconfig.json` against types from `wrangler types` (generated by `bun run check`, not committed) and is covered by `bun test`. `negotiate.ts` and `accept.ts` use only web-standard globals, so the tests type-check against Bun's types (`worker/tsconfig.test.json`) with no casts
- The home page carries a schema.org `Person` JSON-LD block
- Lighthouse's Agentic Browsing category keys off the accessibility tree: keep ARIA attributes on elements with a valid role, and keep text at 4.5:1 (`--text-3` is the floor)

