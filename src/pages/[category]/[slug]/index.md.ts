import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import { entryMarkdown, type Category } from "../../../data/markdown";

export const getStaticPaths = (async () => {
  const [work, projects, speaking] = await Promise.all([
    getCollection("work"),
    getCollection("projects"),
    getCollection("speaking"),
  ]);
  return [
    ...work.map((entry) => ({ category: "work" as const, entry })),
    ...projects.map((entry) => ({ category: "projects" as const, entry })),
    ...speaking.map((entry) => ({ category: "speaking" as const, entry })),
  ].map(({ category, entry }) => ({
    params: { category, slug: entry.id },
    props: { category, entry },
  }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props }) => {
  const { category, entry } = props as { category: Category; entry: Parameters<typeof entryMarkdown>[1] };
  return new Response(entryMarkdown(category, entry), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
