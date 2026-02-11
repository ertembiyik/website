# ertembiyik.com

Personal portfolio and CV website built with Astro, deployed to Cloudflare Workers.

## Development

```bash
pnpm install      # Install dependencies
pnpm dev          # Start dev server at localhost:4321
pnpm build        # Build for production
pnpm preview      # Preview build via Wrangler
pnpm deploy       # Build and deploy to Cloudflare
```

## Project Structure

```
src/
  content/site.md        # Main page content (YAML frontmatter + markdown)
  content/work/*.md      # Work experience entries
  content/projects/*.md  # Project entries
  content/speaking/*.md  # Speaking entries
  pages/index.astro      # Main page
  components/            # VisibleMarkdown.astro (custom markdown renderer)
  layouts/Layout.astro   # HTML shell
  styles/                # Global styles and CSS variables
```

## Tech Stack

- **Astro** - Static site generation
- **Cloudflare Workers** - Hosting
