/**
 * Wave 9 — bulk-translate blog posts to Spanish.
 *
 * Reads every published post from Sanity, calls Claude to translate the
 * 5 long-form fields, and writes the result back to titleEs/excerptEs/
 * bodyEs/seoTitleEs/seoDescriptionEs/focusKeywordEs in the same document.
 * Idempotent: skips posts that already have titleEs populated.
 *
 * Body translation walks the Portable Text JSON, translating only the
 * `children[].text` leaves so block types, marks, links, images, and
 * embedded objects are preserved 1:1. This is dramatically more robust
 * than asking Claude to round-trip the JSON shape.
 *
 *
 * Required env (.env.local):
 *   ANTHROPIC_API_KEY       — same key the blog-bot uses
 *   SANITY_API_TOKEN        — write-scoped token
 *   NEXT_PUBLIC_SANITY_PROJECT_ID  (defaults to s41e632p)
 *   NEXT_PUBLIC_SANITY_DATASET     (defaults to production)
 *
 * Usage:
 *   pnpm tsx scripts/translate-blog.ts                # translate ALL untranslated posts
 *   pnpm tsx scripts/translate-blog.ts --limit 5      # translate next 5 untranslated
 *   pnpm tsx scripts/translate-blog.ts --slug foo-bar # translate one specific post
 *   pnpm tsx scripts/translate-blog.ts --dry-run      # show plan, no writes
 *   pnpm tsx scripts/translate-blog.ts --force        # re-translate even if titleEs exists
 *
 * Cost (Opus 4.6, ~3K input + ~3K output per post):
 *   ~$0.18 per post → ~$24 for 130 posts. Cheaper if you switch to
 *   claude-sonnet-4-6 below (see MODEL).
 */

import "dotenv/config";
import { createClient } from "@sanity/client";

// ── Config ─────────────────────────────────────────────────────────
const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "s41e632p";
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const MODEL = "claude-opus-4-6";
const ANTHROPIC_VERSION = "2023-06-01";
const RATE_LIMIT_MS = 1500;

// ── CLI flags ──────────────────────────────────────────────────────
const args = process.argv.slice(2);
function flag(name: string): string | undefined {
  const i = args.indexOf(`--${name}`);
  if (i < 0) return undefined;
  const v = args[i + 1];
  return v && !v.startsWith("--") ? v : "";
}
const DRY_RUN = args.includes("--dry-run");
const FORCE = args.includes("--force");
const LIMIT = Number(flag("limit") || 0);
const SLUG = flag("slug");

// ── Types ──────────────────────────────────────────────────────────
interface TranslatableText {
  _key?: string;
  _type: "span";
  text: string;
  marks?: string[];
}
interface BodyBlock {
  _key?: string;
  _type: string;
  children?: TranslatableText[];
  markDefs?: Array<{ _key: string; _type: string; href?: string }>;
  style?: string;
  listItem?: string;
  level?: number;
  [k: string]: unknown;
}
interface PostRow {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  body?: BodyBlock[];
  seoTitle?: string;
  seoDescription?: string;
  focusKeyword?: string;
  titleEs?: string;
}

// ── Sanity client ──────────────────────────────────────────────────
function sanity() {
  const token = process.env.SANITY_API_TOKEN;
  if (!token) throw new Error("SANITY_API_TOKEN required");
  return createClient({
    projectId: PROJECT_ID,
    dataset: DATASET,
    apiVersion: "2024-04-01",
    token,
    useCdn: false,
  });
}

// ── Anthropic translator ───────────────────────────────────────────
// One generic translator that takes any input string array and returns
// the translated array in the same order. Batching multiple short
// fields per call halves the API overhead vs translating each field
// individually.
async function translateBatch(
  inputs: string[],
  postContext: { title: string; slug: string }
): Promise<string[]> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY required");

  if (inputs.every((s) => !s || s.trim() === "")) return inputs.map(() => "");

  const prompt = `Translate the following English strings to Spanish for a US Hispanic audience. Use pan-Hispanic neutral register, "tú" form (not "usted"). Keep these untranslated: VIN, NMVTIS, NICB, NHTSA, EPA, DMV, DOT, MSRP, MPG, FICO, APR, KBB, GVWR, OEM, AAA, Carfax, AutoCheck, CarCheckerVIN, model/brand names, and any 17-character VIN strings.

CRITICAL: Return ONLY a JSON array of translated strings, in the exact same order as the input. No commentary, no extra text. Keep each translation natural and conversational, matching the original tone. Preserve any markdown (**bold**, *italic*, [links](url)), HTML tags, and code blocks exactly.

Article context (do not translate this — for tone calibration only):
  Title: ${postContext.title}
  Slug: ${postContext.slug}

Inputs (JSON array of ${inputs.length} strings):
${JSON.stringify(inputs)}

Output: a JSON array of ${inputs.length} translated strings.`;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": ANTHROPIC_VERSION,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 8000,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Anthropic ${res.status}: ${text.slice(0, 300)}`);
  }

  const json = (await res.json()) as {
    content: Array<{ type: string; text: string }>;
  };
  const raw = json.content
    .filter((c) => c.type === "text")
    .map((c) => c.text)
    .join("");

  // Tolerate ```json ... ``` fencing.
  const cleaned = raw
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();
  let parsed: unknown;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    // Last-ditch: extract first JSON array via regex.
    const m = cleaned.match(/\[[\s\S]*\]/);
    if (!m) throw new Error(`Could not parse Anthropic output: ${cleaned.slice(0, 200)}`);
    parsed = JSON.parse(m[0]);
  }
  if (!Array.isArray(parsed) || parsed.length !== inputs.length) {
    throw new Error(`Expected array of ${inputs.length} strings, got ${JSON.stringify(parsed).slice(0, 200)}`);
  }
  return parsed.map((s) => String(s));
}

// ── Portable Text walker ───────────────────────────────────────────
// Collect every translatable string from a body, translate in one
// batch, then write the translations back into a deep copy preserving
// every _key, _type, mark, level, listItem, etc.
async function translateBody(
  body: BodyBlock[],
  postContext: { title: string; slug: string }
): Promise<BodyBlock[]> {
  // Step 1: harvest leaves.
  const leaves: { block: BodyBlock; childIdx: number }[] = [];
  for (const block of body) {
    if (!block.children) continue;
    block.children.forEach((child, i) => {
      if (child._type === "span" && typeof child.text === "string" && child.text.trim()) {
        leaves.push({ block, childIdx: i });
      }
    });
  }
  if (leaves.length === 0) return body;

  const inputs = leaves.map((l) => l.block.children![l.childIdx].text);

  // Step 2: translate in chunks of 40 leaves (~2K tokens input each).
  // Keeps individual calls fast and lets one bad chunk be retried without
  // re-translating an entire post.
  const CHUNK = 40;
  const translated: string[] = [];
  for (let i = 0; i < inputs.length; i += CHUNK) {
    const chunk = inputs.slice(i, i + CHUNK);
    const out = await translateBatch(chunk, postContext);
    translated.push(...out);
    if (i + CHUNK < inputs.length) await sleep(RATE_LIMIT_MS);
  }

  // Step 3: deep clone + write back.
  const cloned: BodyBlock[] = JSON.parse(JSON.stringify(body));
  // Rebuild leaf index against the clone.
  const cloneLeaves: { block: BodyBlock; childIdx: number }[] = [];
  for (const block of cloned) {
    if (!block.children) continue;
    block.children.forEach((child, i) => {
      if (child._type === "span" && typeof child.text === "string" && child.text.trim()) {
        cloneLeaves.push({ block, childIdx: i });
      }
    });
  }
  if (cloneLeaves.length !== translated.length) {
    throw new Error(`leaf count mismatch: ${cloneLeaves.length} vs ${translated.length}`);
  }
  cloneLeaves.forEach((leaf, i) => {
    leaf.block.children![leaf.childIdx].text = translated[i];
  });
  return cloned;
}

// ── Translator orchestration ───────────────────────────────────────
async function translatePost(post: PostRow) {
  const ctx = { title: post.title, slug: post.slug.current };
  // Translate the short fields in one batch.
  const shortInputs = [
    post.title,
    post.excerpt || "",
    post.seoTitle || "",
    post.seoDescription || "",
    post.focusKeyword || "",
  ];
  const [titleEs, excerptEs, seoTitleEs, seoDescriptionEs, focusKeywordEs] =
    await translateBatch(shortInputs, ctx);

  // Body in its own walker.
  const bodyEs = post.body
    ? await translateBody(post.body, ctx)
    : undefined;

  return {
    titleEs,
    excerptEs: excerptEs || undefined,
    seoTitleEs: seoTitleEs || undefined,
    seoDescriptionEs: seoDescriptionEs || undefined,
    focusKeywordEs: focusKeywordEs || undefined,
    bodyEs,
  };
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

// ── Main ───────────────────────────────────────────────────────────
async function main() {
  const c = sanity();

  const filter = SLUG
    ? `*[_type=="post" && slug.current==$slug]`
    : FORCE
    ? `*[_type=="post" && !(_id in path("drafts.**"))]`
    : `*[_type=="post" && !(_id in path("drafts.**")) && (!defined(titleEs) || titleEs == "")]`;

  const query = `${filter} | order(publishedAt desc) {
    _id, title, slug, excerpt, body, seoTitle, seoDescription, focusKeyword, titleEs
  }`;

  const posts = await c.fetch<PostRow[]>(query, SLUG ? { slug: SLUG } : {});

  const candidates = LIMIT > 0 ? posts.slice(0, LIMIT) : posts;

  console.log(`──────────────────────────────────────────────`);
  console.log(`Target dataset: ${PROJECT_ID}/${DATASET}`);
  console.log(`Model:          ${MODEL}`);
  console.log(`Posts queued:   ${candidates.length}/${posts.length}`);
  console.log(`Mode:           ${DRY_RUN ? "DRY RUN" : "WRITE"}${FORCE ? " (force re-translate)" : ""}`);
  console.log(`──────────────────────────────────────────────`);

  if (DRY_RUN) {
    for (const p of candidates) {
      const status = p.titleEs ? "(has titleEs)" : "(untranslated)";
      console.log(`  • ${p.slug.current} ${status}`);
    }
    console.log(`\n[dry-run] would translate ${candidates.length} posts. Re-run without --dry-run to execute.`);
    return;
  }

  let ok = 0;
  let failed = 0;
  for (let i = 0; i < candidates.length; i++) {
    const post = candidates[i];
    const tag = `[${i + 1}/${candidates.length}]`;
    process.stdout.write(`${tag} ${post.slug.current} ... `);
    try {
      const translation = await translatePost(post);
      await c.patch(post._id).set(translation).commit();
      ok++;
      console.log("✓");
    } catch (err) {
      failed++;
      console.log(`✗ ${(err as Error).message.slice(0, 150)}`);
    }
    if (i + 1 < candidates.length) await sleep(RATE_LIMIT_MS);
  }

  console.log(`\nDone. ${ok} translated, ${failed} failed.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
