/**
 * Claude prompt builder + JSON-mode draft fetcher for the blog bot.
 *
 * We use the Messages API with a strict JSON output contract so the
 * Portable Text adapter (./portable-text.ts) is deterministic. The
 * prompt embeds a randomized "voice profile" each run so successive
 * posts vary in sentence rhythm and don't look like template output —
 * the main mitigation against AI-text classifiers.
 */

import type { ClaudeDraft, DiscoveredTopic } from "./types";

const MODEL = "claude-opus-4-6";
const ANTHROPIC_VERSION = "2023-06-01";
const MAX_TOKENS = 8000;

// ── Voice profiles ─────────────────────────────────────────────────
// One picked per run via a hash of the run id. Each profile shifts
// sentence length, paragraph rhythm, vocabulary, and POV. Mixing
// successive posts across these defeats the most common AI-text
// classifiers, which key on stable stylistic signatures.
interface Voice {
  name: string;
  guidance: string;
}

const VOICES: Voice[] = [
  {
    name: "editorial",
    guidance: `Write like a magazine editorial: medium-length sentences (12-22 words avg), occasional short punchy lines for emphasis. Use em-dashes — like this — for parenthetical asides. Lead with the buyer's situation, not the topic. Avoid "in conclusion" / "moreover" / "furthermore". Use contractions naturally.`,
  },
  {
    name: "field-guide",
    guidance: `Write like a practical field guide: bias toward second-person ("you"), short clear sentences, numbered steps where possible. Use occasional parenthetical context (like this) instead of em-dashes. Bias toward verbs over nouns. Avoid academic vocabulary.`,
  },
  {
    name: "investigative",
    guidance: `Write like an investigative journalist: longer sentences with embedded clauses, specific dollar figures and named entities (NHTSA, NMVTIS, Copart, NICB) over generic phrasing. Quote real statutes (e.g. 49 U.S.C. § 32703). Skeptical, factual tone. Avoid first-person.`,
  },
  {
    name: "wry-expert",
    guidance: `Write like a slightly wry industry insider: dry humor in 1-2 places per post, deflate marketing claims directly ("the 'low-mileage' lie is the oldest one in the book"), occasional rhetorical questions. Mostly second-person. Avoid sounding cynical — wry, not bitter.`,
  },
];

function pickVoice(seed: string): Voice {
  let h = 5381;
  for (let i = 0; i < seed.length; i++) h = ((h << 5) + h) ^ seed.charCodeAt(i);
  return VOICES[(h >>> 0) % VOICES.length];
}

// ── Prompt ─────────────────────────────────────────────────────────
function systemPrompt(): string {
  return [
    "You are a senior automotive editor writing for CarCheckerVIN, a US-focused VIN-check + used-car buying site.",
    "You produce blog posts that read as if written by a human industry veteran, not an AI.",
    "",
    "Hard rules:",
    "- Output is JSON ONLY, matching the schema in the user message exactly. No prose outside JSON.",
    "- Every claim that names a specific number, law, agency, or commercial entity must be accurate to the best of your knowledge — never fabricate statute citations or invent statistics.",
    "- Reference real US institutions where helpful: NMVTIS, NICB, NHTSA, FTC, Copart, IAA, Manheim, KBB, Edmunds, Carfax, AutoCheck. Use them by name when they're the natural reference.",
    "- Keep the post 900-1400 words total in the body. Quality over quantity.",
    "- seoTitle must be ≤55 characters and must NOT contain 'CarCheckerVIN' (the site layout appends that automatically).",
    "- seoDescription must be 140-160 characters and answer the searcher's actual question in the first half.",
    "- Internal links to /vin-check, /pricing, /blog/<other-slug> are encouraged WITHIN paragraph text via plain prose — do NOT include markdown link syntax in the JSON; the post processor handles links separately.",
    "- Do NOT write 'in conclusion', 'in summary', 'overall', 'in today's world', 'in this article', 'as we have seen', or any other AI-tell transition phrase.",
    "- Do NOT use the word 'delve' or 'unpack' or 'journey' or 'landscape' in any meaning.",
  ].join("\n");
}

function userPrompt(topic: DiscoveredTopic, voice: Voice): string {
  return [
    `Topic: ${topic.title}`,
    `Focus keyword: "${topic.focusKeyword}"`,
    `Category: ${topic.category}`,
    `Secondary keywords (use 2-3 of these naturally in the body): ${topic.secondaryKeywords.join(", ")}`,
    "",
    `Voice profile: ${voice.name}`,
    voice.guidance,
    "",
    "Output JSON with this exact shape:",
    `{
  "title": "string (≤120 chars, H1)",
  "seoTitle": "string (≤55 chars, no 'CarCheckerVIN')",
  "seoDescription": "string (140-160 chars)",
  "excerpt": "string (≤220 chars, card teaser)",
  "sections": [
    { "kind": "p", "text": "intro paragraph — set up the searcher's situation" },
    { "kind": "callout", "variant": "tip", "title": "60-second answer", "text": "the answer in 1-2 sentences" },
    { "kind": "h2", "text": "first major heading" },
    { "kind": "p", "text": "..." },
    { "kind": "bullets", "items": ["...", "..."] },
    { "kind": "h2", "text": "..." },
    { "kind": "p", "text": "..." },
    { "kind": "numbered", "items": ["step 1...", "step 2..."] },
    { "kind": "callout", "variant": "warning", "title": "...", "text": "..." },
    { "kind": "h2", "text": "..." },
    { "kind": "p", "text": "..." },
    { "kind": "callout", "variant": "info", "title": "What to do next", "text": "..." }
  ]
}`,
    "",
    "Structural requirements:",
    "- Open with a 'p' section (intro), then a 'tip' callout titled '60-second answer'.",
    "- 5-8 h2 sections (no h3 nesting required).",
    "- Use bullets and numbered sparingly — at most 3 list sections total in the post.",
    "- Include 1-2 callouts beyond the opener: at least one 'warning' or 'info'.",
    "- Close with a final 'callout' variant 'info', title 'What to do next', containing the most actionable single takeaway.",
    "",
    "Write the post now. Return JSON only.",
  ].join("\n");
}

// ── Public API ─────────────────────────────────────────────────────
export interface DraftFetchResult {
  draft: ClaudeDraft;
  voice: string;
  inputTokens: number;
  outputTokens: number;
  usdEstimate: number;
}

export async function fetchClaudeDraft(
  topic: DiscoveredTopic,
  runId: string
): Promise<DraftFetchResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY env var is required");

  const voice = pickVoice(runId);

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
      messages: [{ role: "user", content: userPrompt(topic, voice) }],
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

  // The model may wrap JSON in ```json ... ``` or include trailing prose.
  // Extract the largest balanced JSON object from the response.
  const draft = extractJson<ClaudeDraft>(textBlock.text);
  validateDraft(draft);

  // Opus 4.6 pricing (USD per million tokens): $15 input, $75 output.
  // Update here if pricing changes.
  const inputTokens = json.usage?.input_tokens || 0;
  const outputTokens = json.usage?.output_tokens || 0;
  const usdEstimate = (inputTokens / 1_000_000) * 15 + (outputTokens / 1_000_000) * 75;

  return { draft, voice: voice.name, inputTokens, outputTokens, usdEstimate };
}

// ── Helpers ────────────────────────────────────────────────────────
function extractJson<T>(text: string): T {
  const trimmed = text.trim();
  // Try the easy case first.
  try {
    return JSON.parse(trimmed) as T;
  } catch {
    /* try harder */
  }
  // Find first { and balance braces.
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
      if (depth === 0) {
        const sub = trimmed.slice(start, i + 1);
        return JSON.parse(sub) as T;
      }
    }
  }
  throw new Error("Unbalanced JSON in model response");
}

function validateDraft(d: ClaudeDraft): void {
  if (!d.title || d.title.length > 120) throw new Error("title invalid");
  if (!d.seoTitle || d.seoTitle.length > 55) throw new Error(`seoTitle invalid (length ${d.seoTitle?.length})`);
  if (d.seoTitle.toLowerCase().includes("carcheckervin")) {
    throw new Error("seoTitle contains 'carcheckervin' — must not");
  }
  if (!d.seoDescription || d.seoDescription.length < 100 || d.seoDescription.length > 170) {
    throw new Error(`seoDescription invalid (length ${d.seoDescription?.length})`);
  }
  if (!d.excerpt || d.excerpt.length > 220) throw new Error("excerpt invalid");
  if (!Array.isArray(d.sections) || d.sections.length < 8) {
    throw new Error(`sections too short (${d.sections?.length})`);
  }
  for (const s of d.sections) {
    if (!["h2", "h3", "p", "bullets", "numbered", "callout"].includes(s.kind)) {
      throw new Error(`invalid section kind: ${(s as { kind: string }).kind}`);
    }
  }
}
