import { groq } from "next-sanity";

const POST_FIELDS = `
  _id,
  title,
  titleEs,
  "slug": slug.current,
  excerpt,
  heroImage,
  publishedAt,
  _updatedAt,
  tags,
  noIndex,
  canonicalUrl,
  seoTitle,
  seoDescription,
  focusKeyword,
  keywords,
  ogImage,
  "wordCount": length(pt::text(body)),
  "readMinutes": round(length(pt::text(body)) / 200),
  category->{ _id, title, "slug": slug.current, color },
  author->{ _id, name, "slug": slug.current, role, bio, avatar }
`;

export const allPostsQuery = groq`
  *[_type == "post" && !(_id in path("drafts.**")) && !defined(noIndex) || noIndex == false]
  | order(publishedAt desc) {
    ${POST_FIELDS}
  }
`;

// ── Wave 8 — Spanish blog queries ─────────────────────────────────
// POST_FIELDS_ES projects the Spanish variants alongside the canonical
// English fields so the page can render Spanish content with English
// fallback. A post is "Spanish" iff titleEs is non-empty.
const POST_FIELDS_ES = `
  _id,
  title,
  titleEs,
  "slug": slug.current,
  excerpt,
  excerptEs,
  heroImage,
  publishedAt,
  _updatedAt,
  tags,
  noIndex,
  canonicalUrl,
  seoTitle,
  seoTitleEs,
  seoDescription,
  seoDescriptionEs,
  focusKeyword,
  focusKeywordEs,
  keywords,
  ogImage,
  "wordCount": length(pt::text(coalesce(bodyEs, body))),
  "readMinutes": round(length(pt::text(coalesce(bodyEs, body))) / 200),
  category->{ _id, title, "slug": slug.current, color },
  author->{ _id, name, "slug": slug.current, role, bio, avatar }
`;

export const allPostsEsQuery = groq`
  *[_type == "post"
    && !(_id in path("drafts.**"))
    && (!defined(noIndex) || noIndex == false)
    && defined(titleEs) && titleEs != ""]
  | order(publishedAt desc) {
    ${POST_FIELDS_ES}
  }
`;

export const postBySlugEsQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    ${POST_FIELDS_ES},
    body,
    bodyEs,
    relatedPosts[]->{
      _id,
      title,
      titleEs,
      "slug": slug.current,
      excerpt,
      excerptEs,
      heroImage,
      publishedAt,
      "readMinutes": round(length(pt::text(coalesce(bodyEs, body))) / 200),
      category->{ title, "slug": slug.current, color }
    }
  }
`;

export const postSlugsEsQuery = groq`
  *[_type == "post"
    && defined(slug.current)
    && (!defined(noIndex) || noIndex == false)
    && defined(titleEs) && titleEs != ""][].slug.current
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    ${POST_FIELDS},
    body,
    relatedPosts[]->{
      _id,
      title,
      "slug": slug.current,
      excerpt,
      heroImage,
      publishedAt,
      "readMinutes": round(length(pt::text(body)) / 200),
      category->{ title, "slug": slug.current, color }
    }
  }
`;

export const postSlugsQuery = groq`
  *[_type == "post" && defined(slug.current) && (!defined(noIndex) || noIndex == false)][].slug.current
`;

export const featuredPostsQuery = groq`
  *[_type == "post" && featured == true && (!defined(noIndex) || noIndex == false)]
  | order(publishedAt desc)[0...3] {
    ${POST_FIELDS}
  }
`;

export const allCategoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id, title, "slug": slug.current, description, color,
    "postCount": count(*[_type == "post" && references(^._id)])
  }
`;

export const postsByCategoryQuery = groq`
  *[_type == "post" && category->slug.current == $slug && (!defined(noIndex) || noIndex == false)]
  | order(publishedAt desc) {
    ${POST_FIELDS}
  }
`;

export const categoryBySlugQuery = groq`
  *[_type == "category" && slug.current == $slug][0] {
    _id, title, "slug": slug.current, description, color
  }
`;

export const allCategorySlugsQuery = groq`
  *[_type == "category" && defined(slug.current)][].slug.current
`;

export const postsByTagQuery = groq`
  *[_type == "post" && $tag in tags && (!defined(noIndex) || noIndex == false)]
  | order(publishedAt desc) {
    ${POST_FIELDS}
  }
`;

export const allTagsQuery = groq`
  array::unique(*[_type == "post" && defined(tags)].tags[])
`;

export const allAuthorsQuery = groq`
  *[_type == "author"] {
    _id, name, "slug": slug.current, role, bio, avatar, social,
    "postCount": count(*[_type == "post" && references(^._id)])
  }
`;

export const authorBySlugQuery = groq`
  *[_type == "author" && slug.current == $slug][0] {
    _id, name, "slug": slug.current, role, bio, avatar, social
  }
`;

export const postsByAuthorQuery = groq`
  *[_type == "post" && author->slug.current == $slug && (!defined(noIndex) || noIndex == false)]
  | order(publishedAt desc) {
    ${POST_FIELDS}
  }
`;

// Auto-related posts: same category OR shared tags, excluding current slug.
// Returns up to 3 most relevant.
export const relatedPostsQuery = groq`
  *[_type == "post"
    && slug.current != $slug
    && (!defined(noIndex) || noIndex == false)
    && (
      category->slug.current == $categorySlug
      || count(tags[@ in $tags]) > 0
    )]
  | order(
      // Prefer same-category posts, then by recency
      (category->slug.current == $categorySlug) desc,
      publishedAt desc
    )[0...3] {
    ${POST_FIELDS}
  }
`;

// ── Blog-bot admin queries (Wave 13) ──────────────────────────────
//
// Posts produced by /api/cron/blog-bot have three lifecycle states the
// admin dashboard cares about:
//
//   PUBLISHED  — noIndex was flipped to false by the unindex sweep, so
//                the post is live at /blog. Sorted newest first by
//                publishedAt (the moment the bot wrote it, not when it
//                flipped public — those are typically 24h apart).
//   UPCOMING   — written by the bot but still inside the 24h quality
//                hold (noIndex=true, indexAt > now()). Sorted by the
//                soonest to flip live first.
//   STUCK      — defensive: noIndex=true AND indexAt is already in the
//                past. Shouldn't happen if the daily unindex cron runs,
//                but surfaces stale rows so an operator can see the
//                cron isn't running.
//
// All three queries project a narrow field set — no body, no related
// posts — because the admin table only needs title/slug/timestamps/
// category. Cheaper to fetch, easier to render.

const BOT_LIST_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  indexAt,
  noIndex,
  botRunId,
  category->{ title, "slug": slug.current, color }
`;

export const botPublishedPostsQuery = groq`
  *[_type == "post"
    && botGenerated == true
    && noIndex == false]
  | order(publishedAt desc)[0...50] {
    ${BOT_LIST_FIELDS}
  }
`;

export const botUpcomingPostsQuery = groq`
  *[_type == "post"
    && botGenerated == true
    && noIndex == true
    && defined(indexAt)
    && indexAt > now()]
  | order(indexAt asc)[0...50] {
    ${BOT_LIST_FIELDS}
  }
`;

export const botStuckPostsQuery = groq`
  *[_type == "post"
    && botGenerated == true
    && noIndex == true
    && defined(indexAt)
    && indexAt <= now()]
  | order(indexAt asc)[0...50] {
    ${BOT_LIST_FIELDS}
  }
`;
