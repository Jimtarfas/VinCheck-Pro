/**
 * Claude rewrite step for the auto-news pipeline.
 *
 * Takes a SourceArticle from apitube and produces an ORIGINAL article — the
 * facts are retained, but the structure, angle, and every sentence are the
 * model's own, with CarCheckerVIN's used-car-buyer framing added. This is what
 * makes the output safe for SEO (no duplicate content) and meaningfully
 * different from the source rather than a sentence-level spin.
 *
 * Output is the same JSON contract the blog bot uses (so ./portable-text.ts
 * renders it identically) plus slug + keywords the publisher needs.
 */

import type { ClaudeDraft, DraftSection } from "../blog-bot/types";
import type { SourceArticle } from "./apitube";

const MODEL = "claude-opus-4-6";
const ANTHROPIC_VERSION = "2023-06-01";
const MAX_TOKENS = 8000;

/** Voice profiles — rotated per article so successive posts don't share a
 * stylistic fingerprint (the main mitigation against AI-text classifiers). */
const VOICES: ReadonlyArray<{ name: string; guidance: string }> = [
  {
    name: "newsroom",
    guidance:
      "Write like a wire-service auto reporter: lead with the single most important fact, short declarative sentences, attribute claims to the named source or company. No hype adjectives.",
  },
  {
    name: "explainer",
    guidance:
      "Write like a explainer desk: open with why a used-car buyer should care, then the facts, then what it means for them. Second person where natural. Plain words over jargon.",
  },
  {
    name: "analyst",
    guidance:
      "Write like an industry analyst: longer sentences with specifics (named companies, model years, dollar/figure detail when present), measured and factual, no first person.",
  },
];

function pickVoice(seed: string): { name: string; guidance: string } {
  let h = 5381;
  for (let i = 0; i < seed.length; i++) h = ((h << 5) + h) ^ seed.charCodeAt(i);
  return VOICES[(h >>> 0) % VOICES.length];
}

export interface NewsDraft extends ClaudeDraft {
  /** kebab-case URL slug, unique per article. */
  slug: string;
  /** Primary keyword the rewrite targets. */
  focusKeyword: string;
  /** 2-5 secondary keywords for tags/links. */
  secondaryKeywords: string[];
}

export interface RewriteResult {
  draft: NewsDraft;
  voice: string;
  inputTokens: number;
  outputTokens: number;
  usdEstimate: number;
}

function systemPrompt(): string {
  return [
    "You are a senior automotive news editor for CarCheckerVIN, a US-focused VIN-check and used-car buying site.",
    "You are given a SOURCE headline and a SHORT lede only — the full article body is NOT available. You write an ORIGINAL short news brief in your own words.",
    "",
    "Hard rules:",
    "- Output is JSON ONLY, matching the schema in the user message exactly. No prose outside JSON.",
    "- Ground every factual claim in the supplied title, lede, keywords, and entities. Because the source is brief, do NOT invent specifics — no statistics, dates, prices, trims, quotes, or named people that are not in what you were given. If a detail isn't provided, leave it out rather than guessing.",
    "- You MAY add general, evergreen used-car-buyer guidance that is true regardless of this specific story (e.g. how safety recalls work, why title/recall checks matter, how to verify a car by VIN). Frame it clearly as general advice, NOT as new facts about this story.",
    "- Do NOT copy sentences or distinctive phrasing from the source lede. Write completely in your own words and structure. This is mandatory.",
    "- Do NOT fabricate direct quotations. Paraphrase and attribute to the company/source generally.",
    "- Reference checking a vehicle history report or VIN where natural — in plain prose, no markdown links. Reference real institutions by name when relevant: NHTSA, NMVTIS, NICB, FTC.",
    "- Keep the body 350-600 words. Better short and accurate than padded — do not stretch thin facts to hit a length.",
    "- seoTitle must be <=55 characters and must NOT contain 'CarCheckerVIN'.",
    "- seoDescription must be 140-160 characters and state the news in the first half.",
    "- slug must be kebab-case, <=70 chars, specific to this story (include the make/model or subject), no date.",
    "- Do NOT write 'in conclusion', 'in summary', 'overall', 'in today's world', 'as we have seen', or similar AI-tell transitions. Do NOT use the words 'delve', 'unpack', 'journey', or 'landscape'.",
  ].join("\n");
}

function userPrompt(
  source: SourceArticle,
  voice: { name: string; guidance: string }
): string {
  const lede = source.sourceText.length > 4000 ? source.sourceText.slice(0, 4000) : source.sourceText;
  return [
    `Voice profile: ${voice.name}`,
    voice.guidance,
    "",
    "SOURCE (headline + short lede only — write the facts in your own words, do not copy, do not invent details beyond this):",
    `Source title: ${source.title}`,
    `Source publisher: ${source.sourceDomain || "unknown"}`,
    source.keywords.length ? `Keywords: ${source.keywords.join(", ")}` : "",
    source.entities.length ? `Entities mentioned: ${source.entities.join(", ")}` : "",
    "Source lede:",
    lede,
    "",
    "Output JSON with this exact shape:",
    `{
  "title": "string (<=120 chars, H1, your own headline)",
  "slug": "string (kebab-case, <=70 chars, specific to the story)",
  "seoTitle": "string (<=55 chars, no 'CarCheckerVIN')",
  "seoDescription": "string (140-160 chars)",
  "excerpt": "string (<=220 chars, card teaser)",
  "focusKeyword": "string (primary keyword)",
  "secondaryKeywords": ["2-5 keywords"],
  "sections": [
    { "kind": "p", "text": "lede — the single most important fact for a buyer/reader" },
    { "kind": "callout", "variant": "info", "title": "The short version", "text": "1-2 sentence summary" },
    { "kind": "h2", "text": "heading" },
    { "kind": "p", "text": "..." },
    { "kind": "h2", "text": "heading" },
    { "kind": "p", "text": "..." },
    { "kind": "callout", "variant": "tip", "title": "What it means if you're buying used", "text": "..." }
  ]
}`,
    "",
    "Structural requirements:",
    "- Open with a 'p' lede, then an 'info' callout titled 'The short version'.",
    "- 3-5 h2 sections. Use at most one bullets/numbered list total.",
    "- Close with a 'tip' callout that ties the story to checking a car by VIN before buying.",
    "",
    "Write the original article now. Return JSON only.",
  ]
    .filter(Boolean)
    .join("\n");
}

export async function rewriteArticle(source: SourceArticle): Promise<RewriteResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY env var is required");

  const voice = pickVoice(source.id);

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": ANTHROPIC_VERSION,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      system: systemPrompt(),
      messages: [{ role: "user", content: userPrompt(source, voice) }],
    }),
    signal: AbortSignal.timeout(90_000),
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => res.statusText);
    throw new Error(`Anthropic API failed: ${res.status} ${txt.slice(0, 500)}`);
  }

  const json = (await res.json()) as {
    content: Array<{ type: string; text: string }>;
    usage?: { input_tokens?: number; output_tokens?: number };
  };
  const textBlock = json.content?.find((b) => b.type === "text");
  if (!textBlock?.text) throw new Error("Anthropic response had no text content");

  const draft = extractJson<NewsDraft>(textBlock.text);
  validateNewsDraft(draft);

  const inputTokens = json.usage?.input_tokens || 0;
  const outputTokens = json.usage?.output_tokens || 0;
  // Opus 4.6 pricing (USD/M tokens): $15 input, $75 output.
  const usdEstimate = (inputTokens / 1_000_000) * 15 + (outputTokens / 1_000_000) * 75;

  return { draft, voice: voice.name, inputTokens, outputTokens, usdEstimate };
}

// ── Helpers (mirror blog-bot/claude.ts so behavior matches) ─────────
function extractJson<T>(text: string): T {
  const trimmed = text.trim();
  try {
    return JSON.parse(trimmed) as T;
  } catch {
    /* fall through to brace-balancing */
  }
  const start = trimmed.indexOf("{");
  if (start < 0) throw new Error("No JSON object found in model response");
  let depth = 0;
  let inString = false;
  let escape = false;
  for (let i = start; i < trimmed.length; i++) {
    const ch = trimmed[i];
    if (escape) {
      escape = false;
      continue;
    }
    if (ch === "\\") {
      escape = true;
      continue;
    }
    if (ch === '"') {
      inString = !inString;
      continue;
    }
    if (inString) continue;
    if (ch === "{") depth++;
    else if (ch === "}") {
      depth--;
      if (depth === 0) return JSON.parse(trimmed.slice(start, i + 1)) as T;
    }
  }
  throw new Error("Unbalanced JSON in model response");
}

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function validateNewsDraft(d: NewsDraft): void {
  if (!d.title || d.title.length > 120) throw new Error("title invalid");
  if (!d.slug || d.slug.length > 70 || !SLUG_RE.test(d.slug)) {
    throw new Error(`slug invalid: ${d.slug}`);
  }
  if (!d.seoTitle || d.seoTitle.length > 55) {
    throw new Error(`seoTitle invalid (length ${d.seoTitle?.length})`);
  }
  if (d.seoTitle.toLowerCase().includes("carcheckervin")) {
    throw new Error("seoTitle contains 'carcheckervin' — must not");
  }
  if (!d.seoDescription || d.seoDescription.length < 100 || d.seoDescription.length > 170) {
    throw new Error(`seoDescription invalid (length ${d.seoDescription?.length})`);
  }
  if (!d.excerpt || d.excerpt.length > 220) throw new Error("excerpt invalid");
  if (!d.focusKeyword) throw new Error("focusKeyword missing");
  if (!Array.isArray(d.secondaryKeywords) || d.secondaryKeywords.length === 0) {
    throw new Error("secondaryKeywords missing");
  }
  if (!Array.isArray(d.sections) || d.sections.length < 5) {
    throw new Error(`sections too short (${d.sections?.length})`);
  }
  for (const s of d.sections as DraftSection[]) {
    if (!["h2", "h3", "p", "bullets", "numbered", "callout"].includes(s.kind)) {
      throw new Error(`invalid section kind: ${(s as { kind: string }).kind}`);
    }
  }
}
