import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { homeMarkdown } from "../data/markdown";

export const GET: APIRoute = async () => {
  const [work, projects, speaking] = await Promise.all([
    getCollection("work"),
    getCollection("projects"),
    getCollection("speaking"),
  ]);
  return new Response(homeMarkdown({ work, projects, speaking }), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
