<p align="center">
  <img src="public/favicon.svg" alt="website icon" width="96" />
</p>

<h1 align="center">Website</h1>

<p align="center">Source for <a href="https://ertembiyik.com">ertembiyik.com</a>, a portfolio site built with Astro.</p>

<p align="center">
  <a href="https://ertembiyik.com">
    <img src="https://img.shields.io/badge/Live-ertembiyik.com-f38020?logo=cloudflare&logoColor=white" alt="Visit ertembiyik.com" />
  </a>
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/License-Apache_2.0-green.svg" alt="Apache 2.0 License" />
  </a>
</p>

`website` is a content-driven personal site with a dark terminal aesthetic, visible markdown syntax, and static deployment through Cloudflare Workers assets.

## Getting Started

Requirements:
- Bun 1.3+
- Cloudflare account and Wrangler authentication for preview and deploy

Install dependencies and start local development:

```bash
bun install
bun run dev
```

Build the site locally:

```bash
bun run build
```

Lint the Astro and TypeScript source:

```bash
bun run lint
```

Preview the built site through Wrangler:

```bash
bun run preview
```

Deploy to Cloudflare:

```bash
bunx wrangler login
bun run deploy
```

The project does not require environment variables for local development or production deploys.

## License

This project is licensed under the Apache License 2.0. See [LICENSE](LICENSE) for details.
