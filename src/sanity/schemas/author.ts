import { defineField, defineType } from "sanity";

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" } }),
    defineField({ name: "role", title: "Role / Title", type: "string" }),
    defineField({ name: "bio", title: "Short bio", type: "text", rows: 4 }),
    defineField({ name: "avatar", title: "Avatar", type: "image", options: { hotspot: true } }),
    defineField({
      name: "social",
      title: "Social Links",
      type: "object",
      fields: [
        { name: "twitter", title: "Twitter / X URL", type: "url" },
        { name: "linkedin", title: "LinkedIn URL", type: "url" },
        { name: "website", title: "Website URL", type: "url" },
      ],
    }),
  ],
  preview: { select: { title: "name", subtitle: "role", media: "avatar" } },
});
