import type { APIRoute, GetStaticPaths, InferGetStaticPropsType } from "astro";
import { getCollection } from "astro:content";
import { entryMarkdown } from "../../../data/markdown";

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

export const GET: APIRoute<InferGetStaticPropsType<typeof getStaticPaths>> = ({ props }) => {
  return new Response(entryMarkdown(props.category, props.entry), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
