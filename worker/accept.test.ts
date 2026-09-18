import { describe, expect, test } from "bun:test";
import { prefersMarkdown } from "./accept";

describe("prefersMarkdown", () => {
  test.each([
    ["no header", null],
    ["a browser navigation", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8"],
    ["curl's default wildcard", "*/*"],
    ["a text wildcard alone", "text/*"],
    ["Markdown ranked below HTML", "text/markdown;q=0.5, text/html"],
    ["Markdown refused with q=0", "text/markdown;q=0, */*"],
    ["a lookalike media type", "text/markdownx"],
    ["a malformed weight", "text/markdown;q=1.5, text/html;q=0.9"],
  ])("keeps HTML for %s", (_, accept) => {
    expect(prefersMarkdown(accept)).toBe(false);
  });

  test.each([
    ["Markdown only", "text/markdown"],
    ["Markdown first, HTML as fallback", "text/markdown, text/html;q=0.9"],
    ["Markdown with a low-weight wildcard", "text/markdown, */*;q=0.1"],
    ["equal weights", "text/html, text/markdown"],
    ["mixed case and spacing", "Text/Markdown ; Q=0.8 , text/html;q=0.7"],
    ["parameters before the weight", "text/markdown;charset=utf-8;q=1"],
  ])("serves Markdown for %s", (_, accept) => {
    expect(prefersMarkdown(accept)).toBe(true);
  });
});
