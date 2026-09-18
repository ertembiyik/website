// Proactive content negotiation for one question: does this client want Markdown rather than HTML?
// Media ranges and weights follow RFC 9110 §12.5.1.

const MARKDOWN = "text/markdown";

/** qvalue = ( "0" [ "." 0*3DIGIT ] ) / ( "1" [ "." 0*3("0") ] ) */
const QVALUE = /^(?:0(?:\.\d{0,3})?|1(?:\.0{0,3})?)$/;

/** Cheap gate so browser requests, which never name Markdown, skip parsing entirely. */
const NAMES_MARKDOWN = /text\/markdown/i;

interface Range {
  type: string;
  quality: number;
}

function parse(accept: string): Range[] {
  const ranges: Range[] = [];
  for (const member of accept.split(",")) {
    const [rawType = "", ...parameters] = member.split(";");
    const type = rawType.trim().toLowerCase();
    if (type === "") continue;

    let quality = 1;
    for (const parameter of parameters) {
      const [name = "", value = ""] = parameter.split("=");
      if (name.trim().toLowerCase() !== "q") continue;
      const weight = value.trim();
      // A malformed weight makes the range unusable rather than silently maximal.
      quality = QVALUE.test(weight) ? Number(weight) : 0;
      break;
    }
    ranges.push({ type, quality });
  }
  return ranges;
}

/** The weight of the most specific range covering `type`: exact, then `text/*`, then `*\/*`. */
function qualityOf(ranges: readonly Range[], type: string): number {
  const family = `${type.slice(0, type.indexOf("/"))}/*`;
  for (const candidate of [type, family, "*/*"]) {
    const range = ranges.find((entry) => entry.type === candidate);
    if (range) return range.quality;
  }
  return 0;
}

/**
 * True when the client names `text/markdown` with a non-zero weight at least as high as the weight
 * it gives HTML. A bare wildcard never counts: `curl`'s default `*\/*` should keep getting HTML.
 */
export function prefersMarkdown(accept: string | null): boolean {
  if (accept === null || !NAMES_MARKDOWN.test(accept)) return false;
  const ranges = parse(accept);
  const markdown = ranges.find((range) => range.type === MARKDOWN)?.quality ?? 0;
  return markdown > 0 && markdown >= qualityOf(ranges, "text/html");
}
