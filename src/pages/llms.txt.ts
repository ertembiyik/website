import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { llmsTxt } from "../data/markdown";

export const GET: APIRoute = async () => {
  const [work, projects, speaking] = await Promise.all([
    getCollection("work"),
    getCollection("projects"),
    getCollection("speaking"),
  ]);
  return new Response(llmsTxt({ work, projects, speaking }), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
