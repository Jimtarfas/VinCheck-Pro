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
