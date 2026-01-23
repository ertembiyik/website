# ertembiyik.com

Personal portfolio and CV website built with Astro and React, deployed to Cloudflare Workers.

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
  pages/index.astro      # Main page
  components/            # React components (Profile, Attachments, Lightbox)
  layouts/Layout.astro   # HTML shell
  styles/                # CSS Modules and globals

public/
  data/cv.json           # CV data
  content/sections/      # MDX content (jobs, projects, talks, education)
```

## Tech Stack

- **Astro** - Static site generation
- **React** - Interactive components
- **Cloudflare Workers** - Hosting
