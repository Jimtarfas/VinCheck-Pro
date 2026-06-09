import type {
  PortableTextBlock,
  PortableTextCallout,
  PortableTextInlineImage,
  PortableTextNode,
  PortableTextSpan,
} from "../types";

let counter = 0;
function k(): string {
  counter++;
  return `b${counter.toString(36)}${Date.now().toString(36).slice(-3)}`;
}

function span(text: string, marks: string[] = []): PortableTextSpan {
  return { _type: "span", _key: k(), text, marks };
}

export function p(...children: (string | PortableTextSpan)[]): PortableTextBlock {
  const kids = children.map((c) => (typeof c === "string" ? span(c) : c));
  return { _type: "block", _key: k(), style: "normal", children: kids, markDefs: [] };
}

export function h2(text: string): PortableTextBlock {
  return { _type: "block", _key: k(), style: "h2", children: [span(text)], markDefs: [] };
}
export function h3(text: string): PortableTextBlock {
  return { _type: "block", _key: k(), style: "h3", children: [span(text)], markDefs: [] };
}
export function quote(text: string): PortableTextBlock {
  return { _type: "block", _key: k(), style: "blockquote", children: [span(text)], markDefs: [] };
}

export function bullets(items: string[]): PortableTextBlock[] {
  return items.map((t) => ({
    _type: "block",
    _key: k(),
    style: "normal",
    listItem: "bullet",
    level: 1,
    children: [span(t)],
    markDefs: [],
  }));
}

export function numbered(items: string[]): PortableTextBlock[] {
  return items.map((t) => ({
    _type: "block",
    _key: k(),
    style: "normal",
    listItem: "number",
    level: 1,
    children: [span(t)],
    markDefs: [],
  }));
}

export function bold(text: string): PortableTextSpan {
  return span(text, ["strong"]);
}

export function callout(
  variant: "info" | "tip" | "warning",
  title: string,
  text: string
): PortableTextCallout {
  return { _type: "callout", _key: k(), variant, title, text };
}

/**
 * Inline image embed. The `url` is uploaded to Sanity at import time;
 * see scripts/import-blog.ts.
 */
export function img(
  url: string,
  alt: string,
  caption?: string
): PortableTextInlineImage {
  return { _type: "image", _key: k(), url, alt, caption };
}

/**
 * Build a Portable Text block that includes inline links. Pass an array
 * of plain strings (rendered as text) or [text, href] tuples (rendered
 * as anchor tags). External hrefs render as <a>; "/path" hrefs render
 * as internal Next.js Links.
 */
export function pLink(
  ...parts: Array<string | [text: string, href: string]>
): PortableTextBlock {
  const block = p() as PortableTextBlock;
  const children: PortableTextSpan[] = [];
  const markDefs: NonNullable<PortableTextBlock["markDefs"]> = [];
  for (const part of parts) {
    if (typeof part === "string") {
      children.push({ _type: "span", _key: k(), text: part, marks: [] });
    } else {
      const [text, href] = part;
      const mark = k();
      const isInternal = href.startsWith("/");
      markDefs.push(
        isInternal
          ? { _key: mark, _type: "internalLink", path: href }
          : { _key: mark, _type: "link", href }
      );
      children.push({ _type: "span", _key: k(), text, marks: [mark] });
    }
  }
  block.children = children;
  block.markDefs = markDefs;
  return block;
}

/** Helper to assemble a post body from a list of nodes (auto-flattens lists). */
export function body(...nodes: (PortableTextNode | PortableTextNode[])[]): PortableTextNode[] {
  return nodes.flat();
}
