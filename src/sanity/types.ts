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
}
