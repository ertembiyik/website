import type { APIRoute } from "astro";
import { introParagraphs, loadEntries } from "../data/entries";
import { homeMarkdown } from "../data/markdown";

export const GET: APIRoute = async () => {
  const [entries, intro] = await Promise.all([loadEntries(), introParagraphs()]);
  return new Response(homeMarkdown(entries, intro), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
