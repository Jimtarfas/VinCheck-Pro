// Shared types for the bulk blog import scripts.

export type PortableTextSpan = { _type: "span"; _key: string; text: string; marks?: string[] };
export type PortableTextBlock = {
  _type: "block";
  _key: string;
  style?: "normal" | "h2" | "h3" | "h4" | "blockquote";
  listItem?: "bullet" | "number";
  level?: number;
  children: PortableTextSpan[];
  markDefs?: Array<{ _key: string; _type: string; href?: string; path?: string }>;
};
export type PortableTextCallout = {
  _type: "callout";
  _key: string;
  title?: string;
  text: string;
  variant?: "info" | "tip" | "warning";
};
export type PortableTextNode = PortableTextBlock | PortableTextCallout;

export interface PostInput {
  slug: string;                 // url slug, kebab-case
  title: string;                // H1 / display title
  seoTitle?: string;            // <title> override
  seoDescription: string;       // 140-160 char meta description
  excerpt: string;              // 1-2 sentence card teaser
  focusKeyword: string;         // primary target keyword
  keywords: string[];           // secondary keywords
  category: string;             // category slug (must be in CATEGORIES list)
  tags: string[];
  publishedAt: string;          // ISO date
  heroImageUrl: string;         // Unsplash URL (auto-uploaded to Sanity)
  heroImageAlt: string;         // image alt text
  body: PortableTextNode[];     // Portable Text body
}
