// Content negotiation for agents. An HTML page requested with `Accept: text/markdown` is answered
// with its Markdown twin, which Astro builds at <page>/index.md. Every other request is handed to
// static assets untouched. Neither path copies headers or builds a new Response.
//
// Only web-standard globals are used, so this module type-checks against workerd's runtime types
// and against Bun's in the tests without a cast on either side.
import { prefersMarkdown } from "./accept";

/** The one capability needed from the static-assets binding. */
export interface Assets {
  fetch(request: Request): Promise<Response>;
}

function twinOf(requestUrl: string): string {
  const url = new URL(requestUrl);
  url.pathname = url.pathname.endsWith("/") ? `${url.pathname}index.md` : `${url.pathname}/index.md`;
  return url.href;
}

export async function negotiate(request: Request, assets: Assets): Promise<Response> {
  const isRead = request.method === "GET" || request.method === "HEAD";
  if (!isRead || !prefersMarkdown(request.headers.get("Accept"))) {
    return assets.fetch(request);
  }

  // The original request rides along, so conditional headers revalidate the twin itself.
  const twin = await assets.fetch(new Request(twinOf(request.url), request));
  // The twin goes back as the asset layer produced it, body unread: public/_headers already gives
  // every .md its charset and `Vary: Accept`. A 304 is the Markdown variant revalidating.
  return twin.ok || twin.status === 304 ? twin : assets.fetch(request);
}
