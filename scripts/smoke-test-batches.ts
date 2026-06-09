// Quick sanity-check: load all 4 June batches, verify each has 4 posts
// with required fields, no duplicate slugs, and seoTitle <= 55 chars.
import { JUN_BATCH_1 } from "./posts/jun-batch-1";
import { JUN_BATCH_2 } from "./posts/jun-batch-2";
import { JUN_BATCH_3 } from "./posts/jun-batch-3";
import { JUN_BATCH_4 } from "./posts/jun-batch-4";

const all = [...JUN_BATCH_1, ...JUN_BATCH_2, ...JUN_BATCH_3, ...JUN_BATCH_4];

console.log(`Loaded ${all.length} posts (expected 16)`);
if (all.length !== 16) {
  console.error("✗ wrong post count");
  process.exit(1);
}

const slugs = new Set<string>();
let issues = 0;
for (const p of all) {
  if (slugs.has(p.slug)) {
    console.error(`✗ duplicate slug: ${p.slug}`);
    issues++;
  }
  slugs.add(p.slug);

  if (!p.seoTitle) {
    console.warn(`⚠ no seoTitle: ${p.slug}`);
  } else if (p.seoTitle.length > 55) {
    console.warn(`⚠ seoTitle ${p.seoTitle.length} chars: ${p.slug}`);
  }
  if (p.seoTitle && p.seoTitle.toLowerCase().includes("carcheckervin")) {
    console.error(`✗ seoTitle contains brand suffix: ${p.slug}`);
    issues++;
  }
  if (!p.seoDescription || p.seoDescription.length < 100 || p.seoDescription.length > 170) {
    console.warn(`⚠ seoDescription ${p.seoDescription?.length || 0} chars: ${p.slug}`);
  }
  if (!p.body || p.body.length < 20) {
    console.error(`✗ body too short (${p.body?.length || 0}): ${p.slug}`);
    issues++;
  }
  if (!p.category) {
    console.error(`✗ no category: ${p.slug}`);
    issues++;
  }

  // Word-count estimate from text blocks
  let words = 0;
  for (const n of p.body) {
    if (n._type === "block" && "children" in n) {
      for (const c of n.children) words += (c.text || "").split(/\s+/).length;
    } else if (n._type === "callout") {
      words += (n.text || "").split(/\s+/).length;
    }
  }
  console.log(`  · ${p.slug.padEnd(50)} ${p.seoTitle?.length ?? "?"}c title · ~${words}w body · ${p.body.length} blocks`);
}

console.log(`\n${issues === 0 ? "✓ all checks passed" : `✗ ${issues} hard issues`}`);
process.exit(issues === 0 ? 0 : 1);
