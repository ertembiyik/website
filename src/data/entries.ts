import { getCollection, getEntry, type CollectionEntry, type CollectionKey } from "astro:content";
import { intro } from "./site";

export type Entry = CollectionEntry<CollectionKey>;

const byOrder = (a: Entry, b: Entry) => a.data.order - b.data.order;

/** Every collection, each in its `order`. */
export async function loadEntries() {
  const [work, projects, speaking] = await Promise.all([
    getCollection("work"),
    getCollection("projects"),
    getCollection("speaking"),
  ]);
  return { work: work.sort(byOrder), projects: projects.sort(byOrder), speaking: speaking.sort(byOrder) };
}

export type Entries = Awaited<ReturnType<typeof loadEntries>>;

/** Static paths for the shared `/<category>/<slug>/` routes. */
export async function entryPaths() {
  const { work, projects, speaking } = await loadEntries();
  return [...work, ...projects, ...speaking].map((entry) => ({
    params: { category: entry.collection, slug: entry.id },
    props: { entry },
  }));
}

export const entryUrl = (entry: Entry) => `/${entry.collection}/${entry.id}/`;

/** When it happened: the period, the event and year, or the year. */
export function when(entry: Entry) {
  switch (entry.collection) {
    case "work":
      return entry.data.period;
    case "speaking":
      return `${entry.data.event} · ${entry.data.year}`;
    case "projects":
      return entry.data.year;
  }
}

/** The line under a detail heading. */
export const metaLine = (entry: Entry) =>
  entry.collection === "work" ? `${entry.data.role} · ${entry.data.period}` : when(entry);

/** A work entry named from site.ts; a missing one fails the build. */
export async function workEntry(id: string) {
  const entry = await getEntry("work", id);
  if (!entry) throw new Error(`site.ts names a work entry that does not exist: ${id}`);
  return entry;
}

/** The intro's paragraphs, each `{ work }` resolved to its entry. */
export const introParagraphs = () =>
  Promise.all(
    intro.map((paragraph) =>
      Promise.all(paragraph.map((part) => (typeof part === "string" ? part : workEntry(part.work)))),
    ),
  );
