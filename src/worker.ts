// Content negotiation for agents: an HTML page requested with `Accept: text/markdown` is answered
// with its Markdown twin (built by Astro at <page>/index.md). Everything else is served straight
// from static assets. wrangler.jsonc routes only page paths through this Worker.

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
}

/** True when the client ranks text/markdown at least as high as text/html. */
function prefersMarkdown(accept: string | null): boolean {
  if (!accept) return false;
  const quality = (type: string) => {
    const match = accept.split(",").find((part) => part.trim().toLowerCase().startsWith(type));
    if (!match) return 0;
    const q = /;\s*q=([0-9.]+)/.exec(match);
    return q ? Number(q[1]) : 1;
  };
  const markdown = quality("text/markdown");
  return markdown > 0 && markdown >= quality("text/html");
}

function withVary(response: Response): Response {
  const headers = new Headers(response.headers);
  headers.append("Vary", "Accept");
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const isRead = request.method === "GET" || request.method === "HEAD";
    if (isRead && prefersMarkdown(request.headers.get("Accept"))) {
      const url = new URL(request.url);
      url.pathname = `${url.pathname.replace(/\/?$/, "/")}index.md`;
      const markdown = await env.ASSETS.fetch(new Request(url, request));
      if (markdown.ok) {
        const body = await markdown.text();
        const headers = new Headers(markdown.headers);
        headers.set("Content-Type", "text/markdown; charset=utf-8");
        headers.append("Vary", "Accept");
        // Same rough estimate Cloudflare's Markdown for Agents reports: ~4 characters per token.
        headers.set("x-markdown-tokens", String(Math.ceil(body.length / 4)));
        headers.delete("Content-Length");
        return new Response(request.method === "HEAD" ? null : body, { status: 200, headers });
      }
    }
    return withVary(await env.ASSETS.fetch(request));
  },
};
