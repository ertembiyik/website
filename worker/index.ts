// Content negotiation for agents. An HTML page requested with `Accept: text/markdown` is answered
// with its Markdown twin, which Astro builds at <page>/index.md. Every other request is handed to
// static assets untouched: no header copy, no new Response. wrangler.jsonc routes only page paths
// here, and public/_headers sets `Vary: Accept` on both variants.
import { prefersMarkdown } from "./accept";

function twinOf(requestUrl: string): URL {
  const url = new URL(requestUrl);
  url.pathname = url.pathname.endsWith("/") ? `${url.pathname}index.md` : `${url.pathname}/index.md`;
  return url;
}

export default {
  async fetch(request, env) {
    const isRead = request.method === "GET" || request.method === "HEAD";
    if (!isRead || !prefersMarkdown(request.headers.get("Accept"))) {
      return env.ASSETS.fetch(request);
    }

    // The original request rides along, so conditional headers revalidate the twin itself.
    const twin = await env.ASSETS.fetch(new Request(twinOf(request.url), request));
    if (twin.status === 304) return twin;
    if (!twin.ok) return env.ASSETS.fetch(request);

    const headers = new Headers(twin.headers);
    headers.set("Content-Type", "text/markdown; charset=utf-8");
    // Same rough estimate Cloudflare's Markdown for Agents reports (~4 bytes per token), taken
    // from the asset's length so the body streams through without being read.
    const bytes = Number(twin.headers.get("Content-Length"));
    if (Number.isFinite(bytes) && bytes > 0) headers.set("x-markdown-tokens", String(Math.ceil(bytes / 4)));
    return new Response(twin.body, { status: twin.status, headers });
  },
} satisfies ExportedHandler<Env>;
