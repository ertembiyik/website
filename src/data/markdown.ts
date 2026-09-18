import type { CollectionEntry } from "astro:content";
import { links, profile, writing } from "./site";

/** Markdown twins of the HTML pages, for agents: /llms.txt, /index.md, and /<category>/<slug>/index.md. */

export type Category = "work" | "projects" | "speaking";
type Entry = CollectionEntry<Category>;

const site = "https://ertembiyik.com";

const byOrder = (a: Entry, b: Entry) => a.data.order - b.data.order;

const when = (entry: Entry) =>
  "period" in entry.data ? entry.data.period : "event" in entry.data ? `${entry.data.event}, ${entry.data.year}` : entry.data.year;

const heading = (entry: Entry) =>
  "role" in entry.data ? `${entry.data.role} at ${entry.data.title}` : entry.data.title;

const entryLine = (category: Category, entry: Entry) =>
  `- [${heading(entry)}](${site}/${category}/${entry.id}/index.md): ${entry.data.summary} (${when(entry)})`;

export const intro =
  "I make apps for Apple platforms. Sometimes poke at what's underneath them. In my free time I build consumer + AI side projects with friends, skate, play tennis, and nerd out on X. Now founding engineer at Pool — the fastest way to save anything with a screenshot. Before that, three years at VK shipping a superapp to 100M+ people";

const connect = [
  `- Email: ${profile.email}`,
  `- X: ${links.x}`,
  `- GitHub: ${links.github}`,
  `- Telegram: ${links.telegram}`,
  `- LinkedIn: ${links.linkedin}`,
  `- Book a call: ${links.cal}`,
].join("\n");

interface Collections {
  work: CollectionEntry<"work">[];
  projects: CollectionEntry<"projects">[];
  speaking: CollectionEntry<"speaking">[];
}

function sections({ work, projects, speaking }: Collections) {
  return [
    "## Experience",
    [...work].sort(byOrder).map((entry) => entryLine("work", entry)).join("\n"),
    "## Side projects",
    [...projects].sort(byOrder).map((entry) => entryLine("projects", entry)).join("\n"),
    "## Writing and talks",
    [
      ...writing.map((post) => `- [${post.title}](${post.href}) (${post.year})`),
      ...[...speaking].sort(byOrder).map((entry) => entryLine("speaking", entry)),
    ].join("\n"),
    "## Connect",
    connect,
  ].join("\n\n");
}

/** llms.txt: H1, blockquote summary, then link lists (https://llmstxt.org/). */
export const llmsTxt = (collections: Collections) =>
  [
    `# ${profile.name}`,
    `> ${profile.description} Every page has a Markdown twin at <page URL>/index.md, and HTML pages answer \`Accept: text/markdown\`.`,
    `- [Home](${site}/index.md): intro, experience, side projects, writing, and contact`,
    sections(collections),
    "",
  ].join("\n\n");

export const homeMarkdown = (collections: Collections) =>
  [`# ${profile.name}`, intro, sections(collections), ""].join("\n\n");

export const entryMarkdown = (category: Category, entry: Entry) =>
  [
    `# ${entry.data.title}`,
    `${"role" in entry.data ? `${entry.data.role} · ` : ""}${when(entry)}`,
    entry.data.summary,
    entry.data.links.map((link) => `- [${link.label}](${link.url})`).join("\n"),
    (entry.body ?? "").trim(),
    `[← ${profile.name}](${site}/index.md)`,
    "",
  ]
    .filter((part) => part !== "")
    .concat("")
    .join("\n\n");
