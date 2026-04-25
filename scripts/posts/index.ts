/**
 * Master post index: merges all spec batches, assigns publish dates + hero
 * images deterministically, expands each spec into a full Portable Text body,
 * and exports as `ALL_POSTS` for the import script.
 */

import { POST_SPECS } from "./catalog";
import { SPECS_BATCH_1A } from "./specs-batch1a";
import { SPECS_BATCH_1B } from "./specs-batch1b";
import { SPECS_BATCH_2 } from "./specs-batch2";
import { SPECS_BATCH_3 } from "./specs-batch3";
import { expandSpec, type PostSpec } from "./catalog-writer";
import type { PostInput } from "../types";

const UNSPLASH = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=80`;

const IMAGE_POOL: Array<{ id: string; alt: string }> = [
  { id: "photo-1492144534655-ae79c964c9d7", alt: "Modern car parked at dusk" },
  { id: "photo-1494976388531-d1058494cdd8", alt: "Premium sedan on highway" },
  { id: "photo-1583121274602-3e2820c69888", alt: "Sports coupe in showroom" },
  { id: "photo-1549317661-bd32c8ce0db2", alt: "Used car keys on a desk" },
  { id: "photo-1503376780353-7e6692767b70", alt: "Classic sports car" },
  { id: "photo-1605559424843-9e4c228bf1c2", alt: "Modern luxury SUV" },
  { id: "photo-1542362567-b07e54358753", alt: "Mechanic inspecting an engine" },
  { id: "photo-1547038577-da80abbc4f19", alt: "Car dashboard close-up" },
  { id: "photo-1516919549054-e08258825f80", alt: "Pickup truck on dirt road" },
  { id: "photo-1502877338535-766e1452684a", alt: "Convertible by the coast" },
  { id: "photo-1525609004556-c46c7d6cf023", alt: "Performance car at sunset" },
  { id: "photo-1485463611174-f302f6a5c1c9", alt: "Steering wheel and dashboard" },
  { id: "photo-1606664515524-ed2f786a0bd6", alt: "Compact SUV on city street" },
  { id: "photo-1568844293986-8d0400bd4745", alt: "Family minivan in suburb" },
  { id: "photo-1560958089-b8a1929cea89", alt: "Electric vehicle charging" },
  { id: "photo-1552519507-da3b142c6e3d", alt: "Yellow sports car on track" },
  { id: "photo-1469854523086-cc02fe5d8800", alt: "Convertible roadster" },
  { id: "photo-1489824904134-891ab64532f1", alt: "Off-road SUV in landscape" },
  { id: "photo-1542228262-3d663b306a53", alt: "Black luxury sedan close-up" },
  { id: "photo-1555215695-3004980ad54e", alt: "Modern hatchback front view" },
  { id: "photo-1553440569-bcc63803a83d", alt: "Used car lot detail" },
  { id: "photo-1532581291347-9c39cf10a73c", alt: "Couple buying a used car" },
  { id: "photo-1471444928139-48c5bf5173f8", alt: "Pickup truck on country road" },
  { id: "photo-1542282088-fe8426682b8f", alt: "Car interior with leather" },
  { id: "photo-1494905998402-395d579af36f", alt: "Vintage classic car" },
];

function pickImage(slug: string): { url: string; alt: string } {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  const img = IMAGE_POOL[h % IMAGE_POOL.length];
  return { url: UNSPLASH(img.id), alt: img.alt };
}

function dateFor(i: number): string {
  // Spread posts across Jan 15 → April 25 2026 (~100 posts in ~100 days).
  const start = new Date("2026-01-15T10:00:00Z").getTime();
  const day = 86400 * 1000;
  return new Date(start + i * day).toISOString();
}

// Specs from catalog.ts already have date + image; the others don't.
type RawSpec = Omit<PostSpec, "publishedAt" | "heroImageUrl" | "heroImageAlt">;

const allSpecsRaw: RawSpec[] = [
  // Already-formed specs (catalog.ts has 24 with date+image)
  ...POST_SPECS.map((s): RawSpec => ({
    slug: s.slug,
    title: s.title,
    seoTitle: s.seoTitle,
    seoDescription: s.seoDescription,
    excerpt: s.excerpt,
    focusKeyword: s.focusKeyword,
    keywords: s.keywords,
    category: s.category,
    tags: s.tags,
    outline: s.outline,
    intro: s.intro,
    conclusion: s.conclusion,
  })),
  ...SPECS_BATCH_1A,
  ...SPECS_BATCH_1B,
  ...SPECS_BATCH_2,
  ...SPECS_BATCH_3,
];

// Dedupe by slug (in case any topic accidentally collides).
const seen = new Set<string>();
const uniqueSpecs: RawSpec[] = [];
for (const s of allSpecsRaw) {
  if (seen.has(s.slug)) continue;
  seen.add(s.slug);
  uniqueSpecs.push(s);
}

const completeSpecs: PostSpec[] = uniqueSpecs.map((s, i) => {
  const img = pickImage(s.slug);
  return {
    ...s,
    publishedAt: dateFor(i),
    heroImageUrl: img.url,
    heroImageAlt: img.alt,
  };
});

export const ALL_POSTS: PostInput[] = completeSpecs.map(expandSpec);
