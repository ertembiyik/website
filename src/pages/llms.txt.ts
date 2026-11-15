import type { APIRoute } from "astro";
import { loadEntries } from "../data/entries";
import { llmsTxt } from "../data/markdown";

export const GET: APIRoute = async () =>
  new Response(llmsTxt(await loadEntries()), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
