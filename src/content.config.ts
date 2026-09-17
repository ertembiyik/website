import { defineCollection, type SchemaContext } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const link = z.object({ label: z.string(), url: z.url() });

const entry = ({ image }: SchemaContext) => ({
  title: z.string(),
  summary: z.string(),
  /** First link is the primary chip on the detail page. */
  links: z.array(link).min(1),
  icon: image(),
  /** App screenshots shown in iPhone frames, in order. */
  screens: z.array(image()).default([]),
  order: z.number().int().positive(),
});

const work = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/work" }),
  schema: (context) =>
    z.object({
      ...entry(context),
      icon: context.image().optional(),
      role: z.string(),
      period: z.string(),
    }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: (context) =>
    z.object({
      ...entry(context),
      year: z.string(),
    }),
});

const speaking = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/speaking" }),
  schema: (context) =>
    z.object({
      ...entry(context),
      year: z.string(),
      event: z.string(),
    }),
});

export const collections = { work, projects, speaking };
