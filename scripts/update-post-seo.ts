/**
 * One-off / re-runnable Sanity updater for blog post SEO fields
 * (seoTitle, seoDescription, focusKeyword, keywords). Use this to fix
 * low-CTR posts surfaced in Bing/Google Search Console.
 *
 * Usage:
 *   SANITY_API_TOKEN=... npx tsx scripts/update-post-seo.ts
 *
 * Rules of thumb baked into the data below:
 *   - seoTitle ≤ 52 chars so the blog template doesn't truncate it
 *     before the layout's "| CarCheckerVIN" suffix is appended.
 *   - seoTitle MUST NOT include "| CarCheckerVIN" (layout appends it).
 *   - seoDescription 140-160 chars, leads with the searcher's actual
 *     question/payoff, ends with a friction-killer or curiosity hook.
 */

import { createClient } from "@sanity/client";

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "s41e632p";
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const TOKEN = process.env.SANITY_API_TOKEN;

if (!TOKEN) {
  console.error("❌ SANITY_API_TOKEN env var is required");
  process.exit(1);
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: "2024-04-01",
  token: TOKEN,
  useCdn: false,
});

interface SeoUpdate {
  slug: string;
  seoTitle: string;        // ≤52 chars, no brand suffix
  seoDescription: string;  // ≤160 chars
  focusKeyword?: string;
  keywords?: string[];
}

const UPDATES: SeoUpdate[] = [
  {
    // GSC: 171 impressions, 1 click. Title was 66 chars (truncated by
    // blog template + layout brand suffix → "…1981-20…" in SERP).
    // Description was matter-of-fact, no curiosity hook.
    slug: "model-year-vin-position",
    seoTitle: "What's My Car's Model Year? VIN Position 10",
    seoDescription:
      "The 10th character of any VIN is the model year code. Full 1981-to-2026 chart, what each letter means, and how to spot odometer-rollback red flags.",
    focusKeyword: "VIN model year",
    keywords: [
      "VIN model year",
      "VIN position 10 model year",
      "VIN year decoder",
      "10th character VIN year",
      "model year VIN code chart",
      "what year is my VIN",
      "decode VIN year 2026",
      "VIN year letter chart",
    ],
  },
];

async function updateOne(u: SeoUpdate) {
  console.log(`\n▶ ${u.slug}`);

  const post = await client.fetch<{ _id: string } | null>(
    `*[_type=="post" && slug.current==$slug][0]{_id}`,
    { slug: u.slug }
  );
  if (!post) {
    console.error(`  ✗ post not found`);
    return;
  }

  if (u.seoTitle.length > 55) {
    console.warn(
      `  ⚠ seoTitle is ${u.seoTitle.length} chars (≥55) — blog template will truncate`
    );
  }
  if (u.seoDescription.length > 165) {
    console.warn(
      `  ⚠ seoDescription is ${u.seoDescription.length} chars (>165) — Google will truncate`
    );
  }
  if (u.seoTitle.toLowerCase().includes("carcheckervin")) {
    console.error(
      `  ✗ ABORT: seoTitle contains 'CarCheckerVIN' — layout already appends the brand. Remove it.`
    );
    return;
  }

  const patch: Record<string, unknown> = {
    seoTitle: u.seoTitle,
    seoDescription: u.seoDescription,
  };
  if (u.focusKeyword) patch.focusKeyword = u.focusKeyword;
  if (u.keywords) patch.keywords = u.keywords;

  await client.patch(post._id).set(patch).commit();
  console.log(
    `  ✓ updated — title ${u.seoTitle.length}c · desc ${u.seoDescription.length}c`
  );
}

async function main() {
  console.log(`Updating ${UPDATES.length} post SEO field(s)…`);
  for (const u of UPDATES) {
    try {
      await updateOne(u);
    } catch (e) {
      console.error(`  ✗ ${u.slug} → ${e instanceof Error ? e.message : e}`);
    }
  }
  console.log("\nDone.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
