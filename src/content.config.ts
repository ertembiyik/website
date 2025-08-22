import { defineCollection, type ImageFunction, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const seoSchemaWithoutImage = z.object({
  title: z.string(),
  description: z.string(),
  type: z.string().optional(),
  keywords: z.string().optional(),
  canonicalUrl: z.string().optional(),
  twitter: z
    .object({
      creator: z.string().optional(),
    })
    .optional(),
  robots: z.string().optional(),
});

const seoSchema = (image: ImageFunction) =>
  z
    .object({
      image: image().optional(),
    })
    .merge(seoSchemaWithoutImage);

const pageCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/pages' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      seo: seoSchema(image),
    }),
});

const linkCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.yml', base: './src/content/links' }),
  schema: z.object({
    label: z.string(),
    name: z.string(),
    url: z.string(),
  }),
});

const jobCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/jobs' }),
  schema: z.object({
    title: z.string(),
    company: z.string(),
    from: z.number(),
    to: z.number().or(z.enum(['Now'])),
    url: z.string(),
  }),
});

const sideProjectsCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/side-projects' }),
  schema: z.object({
    name: z.string(),
    people: z.string(),
    from: z.number(),
    to: z.number().or(z.enum(['Now'])),
    url: z.string(),
  }),
});

const talkCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/talks' }),
  schema: z.object({
    title: z.string(),
    year: z.number(),
    event: z.string(),
    url: z.string(),
  }),
});

export const collections = {
  pages: pageCollection,
  links: linkCollection,
  jobs: jobCollection,
  sideProjects: sideProjectsCollection,
  talks: talkCollection,
};
