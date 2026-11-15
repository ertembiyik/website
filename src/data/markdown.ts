import { type Entries, type Entry, entryUrl, metaLine, when } from "./entries";
import { connect, profile, writing } from "./site";

/** Markdown twins of the HTML pages, for agents: /llms.txt, /index.md, and /<category>/<slug>/index.md. */

const absolute = (path: string) => new URL(path, import.meta.env.SITE).href;

const heading = (entry: Entry) => (entry.collection === "work" ? `${entry.data.role} at ${entry.data.title}` : entry.data.title);

const entryLine = (entry: Entry) =>
  `- [${heading(entry)}](${absolute(`${entryUrl(entry)}index.md`)}): ${entry.data.summary} (${when(entry)})`;

/** The intro with its work entries resolved, as from `introParagraphs()`. */
export type Intro = readonly (readonly (string | Entry)[])[];

const introMarkdown = (intro: Intro) =>
  intro
    .map((paragraph) =>
      paragraph
        .map((part) => (typeof part === "string" ? part : `[${part.data.title}](${absolute(`${entryUrl(part)}index.md`)})`))
        .join(""),
    )
    .join("\n\n");

/** A Markdown document: blocks separated by a blank line, empty ones dropped, one final newline. */
const markdownDocument = (blocks: readonly string[]) => `${blocks.filter((block) => block !== "").join("\n\n")}\n`;

const sections = ({ work, projects, speaking }: Entries) =>
  [
    "## Experience",
    work.map(entryLine).join("\n"),
    "## Side projects",
    projects.map(entryLine).join("\n"),
    "## Writing and talks",
    [...writing.map((post) => `- [${post.title}](${post.href}) (${post.year})`), ...speaking.map(entryLine)].join("\n"),
    "## Connect",
    connect.map(({ label, href }) => `- ${label}: ${href.replace(/^mailto:/, "")}`).join("\n"),
  ].join("\n\n");

/** llms.txt: H1, blockquote summary, then link lists (https://llmstxt.org/). */
export const llmsTxt = (entries: Entries) =>
  markdownDocument([
    `# ${profile.name}`,
    `> ${profile.description}. Every page has a Markdown twin at <page URL>/index.md, and HTML pages answer \`Accept: text/markdown\`.`,
    `- [Home](${absolute("/index.md")}): intro, experience, side projects, writing, and contact`,
    sections(entries),
  ]);

export const homeMarkdown = (entries: Entries, intro: Intro) =>
  markdownDocument([`# ${profile.name}`, introMarkdown(intro), sections(entries)]);

export const entryMarkdown = (entry: Entry) =>
  markdownDocument([
    `# ${entry.data.title}`,
    metaLine(entry),
    entry.data.summary,
    entry.data.links.map((link) => `- [${link.label}](${link.url})`).join("\n"),
    (entry.body ?? "").trim(),
    `[← ${profile.name}](${absolute("/index.md")})`,
  ]);
