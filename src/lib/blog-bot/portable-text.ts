/**
 * Adapter: ClaudeDraft.sections[] → Sanity Portable Text body blocks.
 * Mirrors the helpers used by scripts/posts/helpers.ts so manual posts
 * and bot posts render identically.
 */

import type { ClaudeDraft } from "./types";

type Span = { _type: "span"; _key: string; text: string; marks?: string[] };
type Block = {
  _type: "block";
  _key: string;
  style?: "normal" | "h2" | "h3" | "blockquote";
  listItem?: "bullet" | "number";
  level?: number;
  children: Span[];
  markDefs?: Array<{ _key: string; _type: string; href?: string; path?: string }>;
};
type Callout = {
  _type: "callout";
  _key: string;
  title?: string;
  text: string;
  variant?: "info" | "tip" | "warning";
};
export type Node = Block | Callout;

let counter = 0;
function k(): string {
  counter++;
  return `b${counter.toString(36)}${Date.now().toString(36).slice(-3)}`;
}

function span(text: string, marks: string[] = []): Span {
  return { _type: "span", _key: k(), text, marks };
}

function block(style: "normal" | "h2" | "h3", text: string): Block {
  return {
    _type: "block",
    _key: k(),
    style,
    children: [span(text)],
    markDefs: [],
  };
}

function listItems(items: string[], kind: "bullet" | "number"): Block[] {
  return items.map((t) => ({
    _type: "block" as const,
    _key: k(),
    style: "normal" as const,
    listItem: kind,
    level: 1,
    children: [span(t)],
    markDefs: [],
  }));
}

function callout(
  variant: "info" | "tip" | "warning",
  title: string,
  text: string
): Callout {
  return { _type: "callout", _key: k(), variant, title, text };
}

/**
 * Walk a paragraph text and convert references to known internal paths
 * into proper Portable Text internal-link annotations. We deliberately
 * only auto-link a small set of canonical paths so the bot can't link
 * to URLs that don't exist.
 */
const INTERNAL_LINK_PATTERNS: Array<{ phrase: RegExp; path: string }> = [
  { phrase: /\bvehicle history report\b/i, path: "/vin-check" },
  { phrase: /\bvin history report\b/i, path: "/vin-check" },
  { phrase: /\bnmvtis(-backed)? report\b/i, path: "/vin-check" },
  { phrase: /\bpre-?purchase inspection\b/i, path: "/blog/how-to-read-a-vehicle-history-report" },
];

function paragraph(text: string): Block {
  // Insert at most one internal link per paragraph — multiple links in a
  // single para read as spammy and don't help SEO.
  for (const { phrase, path } of INTERNAL_LINK_PATTERNS) {
    const match = phrase.exec(text);
    if (!match) continue;
    const before = text.slice(0, match.index);
    const linkText = match[0];
    const after = text.slice(match.index + linkText.length);
    const linkKey = k();
    return {
      _type: "block",
      _key: k(),
      style: "normal",
      children: [
        span(before),
        { _type: "span", _key: k(), text: linkText, marks: [linkKey] },
        span(after),
      ],
      markDefs: [{ _key: linkKey, _type: "internalLink", path }],
    };
  }
  return block("normal", text);
}

/** Convert the ClaudeDraft.sections array to a Sanity Portable Text body. */
export function draftToBody(draft: ClaudeDraft): Node[] {
  const out: Node[] = [];
  for (const s of draft.sections) {
    switch (s.kind) {
      case "h2":
        out.push(block("h2", s.text));
        break;
      case "h3":
        out.push(block("h3", s.text));
        break;
      case "p":
        out.push(paragraph(s.text));
        break;
      case "bullets":
        out.push(...listItems(s.items, "bullet"));
        break;
      case "numbered":
        out.push(...listItems(s.items, "number"));
        break;
      case "callout":
        out.push(callout(s.variant, s.title, s.text));
        break;
    }
  }
  return out;
}
