import { groq } from "next-sanity";

const POST_FIELDS = `
  _id,
  title,
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
