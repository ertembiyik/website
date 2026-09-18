import { describe, expect, test } from "bun:test";
import worker from "./index";

const ETAG = '"twin-v1"';

/** Stands in for the static-assets binding: one page, its Markdown twin, and ETag revalidation. */
const assets = {
  ASSETS: {
    async fetch(request: Request): Promise<Response> {
      const { pathname } = new URL(request.url);
      if (pathname === "/work/pool/") return new Response("<h1>Pool</h1>", { headers: { "Content-Type": "text/html" } });
      if (pathname === "/work/pool/index.md") {
        if (request.headers.get("If-None-Match") === ETAG) return new Response(null, { status: 304, headers: { ETag: ETAG } });
        return new Response("# Pool\n", { headers: { "Content-Type": "text/markdown", "Content-Length": "7", ETag: ETAG } });
      }
      return new Response("not found", { status: 404 });
    },
  },
};

// The handler is typed against workerd's Request, Env, and ExecutionContext. Bun supplies the
// standard fetch classes, which is all the handler touches, so the test crosses that gap once here.
const dispatch = worker.fetch as unknown as (request: Request, env: typeof assets) => Promise<Response>;

const get = (path: string, headers: Record<string, string> = {}) =>
  dispatch(new Request(`https://example.test${path}`, { headers }), assets);

describe("worker", () => {
  test("passes a browser request straight through", async () => {
    const response = await get("/work/pool/", { Accept: "text/html,*/*;q=0.8" });
    expect(response.headers.get("Content-Type")).toBe("text/html");
    expect(await response.text()).toBe("<h1>Pool</h1>");
  });

  test("answers Accept: text/markdown with the twin, with and without a trailing slash", async () => {
    for (const path of ["/work/pool/", "/work/pool"]) {
      const response = await get(path, { Accept: "text/markdown" });
      expect(response.status).toBe(200);
      expect(response.headers.get("Content-Type")).toBe("text/markdown; charset=utf-8");
      expect(response.headers.get("x-markdown-tokens")).toBe("2");
      expect(await response.text()).toBe("# Pool\n");
    }
  });

  test("revalidates the Markdown variant instead of falling back to HTML", async () => {
    const response = await get("/work/pool/", { Accept: "text/markdown", "If-None-Match": ETAG });
    expect(response.status).toBe(304);
  });

  test("falls back to the page when no twin exists", async () => {
    const response = await get("/missing/", { Accept: "text/markdown" });
    expect(response.status).toBe(404);
  });

  test("never negotiates a write", async () => {
    const response = await dispatch(
      new Request("https://example.test/work/pool/", { method: "POST", headers: { Accept: "text/markdown" } }),
      assets,
    );
    expect(response.headers.get("Content-Type")).toBe("text/html");
  });
});
