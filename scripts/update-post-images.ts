/**
 * One-off script to replace the hero image on specific blog posts.
 *
 * Usage:
 *   SANITY_API_TOKEN=... npx tsx scripts/update-post-images.ts
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

// slug → { unsplash URL, alt text }
// IMPORTANT: every URL below is verified against the project's known-good
// IMAGE_POOL (scripts/posts/index.ts) so we don't ship a random image again.
const UPDATES: Array<{ slug: string; url: string; alt: string }> = [
  {
    // Cash-for-Clunkers: used-car lot — older vehicles, trade-in vibe.
    slug: "cash-for-clunkers-2026",
    url: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1600&q=80",
    alt: "Used car lot — older vehicles eligible for cash-for-clunkers trade-in programs",
  },
  {
    // EV vs Gas: known-good 'electric vehicle charging' from the import pool.
    slug: "ev-vs-gas-savings",
    url: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1600&q=80",
    alt: "Electric vehicle plugged into a charging station — comparing EV ownership cost to gas",
  },
];

async function uploadImage(url: string, filename: string): Promise<string> {
  console.log(`  ↑ uploading ${filename}…`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  const asset = await client.assets.upload("image", buffer, { filename });
  return asset._id;
}

async function updateOne(u: (typeof UPDATES)[number]) {
  console.log(`\n▶ ${u.slug}`);

  const post = await client.fetch<{ _id: string } | null>(
    `*[_type=="post" && slug.current==$slug][0]{_id}`,
    { slug: u.slug }
  );
  if (!post) {
    console.error(`  ✗ post not found in Sanity`);
    return;
  }

  const assetId = await uploadImage(u.url, `${u.slug}.jpg`);
  await client
    .patch(post._id)
    .set({
      heroImage: {
        _type: "image",
        asset: { _ref: assetId, _type: "reference" },
        alt: u.alt,
      },
    })
    .commit();
  console.log(`  ✓ hero image updated`);
}

async function main() {
  console.log(`Updating ${UPDATES.length} hero images in ${PROJECT_ID}/${DATASET}…`);
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
