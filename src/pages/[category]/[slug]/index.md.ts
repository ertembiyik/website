import type { APIRoute, InferGetStaticPropsType } from "astro";
import { entryPaths } from "../../../data/entries";
import { entryMarkdown } from "../../../data/markdown";

export const getStaticPaths = entryPaths;

export const GET: APIRoute<InferGetStaticPropsType<typeof getStaticPaths>> = ({ props }) =>
  new Response(entryMarkdown(props.entry), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
