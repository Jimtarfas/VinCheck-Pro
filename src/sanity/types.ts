import type { PortableTextBlock } from "@portabletext/types";

export interface SanityImage {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
  alt?: string;
  caption?: string;
  hotspot?: { x: number; y: number; height: number; width: number };
}

export interface SanityCategory {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  color?: string;
  postCount?: number;
}

export interface SanityAuthor {
  _id: string;
  name: string;
  slug?: string;
  role?: string;
  bio?: string;
  avatar?: SanityImage;
  social?: { twitter?: string; linkedin?: string; website?: string };
}

export interface SanityPost {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  heroImage?: SanityImage;
  publishedAt: string;
  _updatedAt?: string;
  tags?: string[];
  noIndex?: boolean;
  canonicalUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
  focusKeyword?: string;
  keywords?: string[];
  ogImage?: SanityImage;
  wordCount?: number;
  readMinutes?: number;
  category?: SanityCategory;
  author?: SanityAuthor;
  body?: PortableTextBlock[];
  relatedPosts?: SanityPost[];

  // ── Wave 8 — Spanish variants (optional per post) ──
  // Same field semantics as their English siblings; when populated the
  // /es/blog page renders these, falling back to the English fields
  // when blank. Slug stays shared across locales.
  titleEs?: string;
  excerptEs?: string;
  bodyEs?: PortableTextBlock[];
  seoTitleEs?: string;
  seoDescriptionEs?: string;
  focusKeywordEs?: string;
}
