import { defineField, defineType } from "sanity";

export const category = defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
    defineField({ name: "color", title: "Display color", type: "string", options: {
      list: [
        { title: "Indigo (default)", value: "indigo" },
        { title: "Emerald", value: "emerald" },
        { title: "Amber", value: "amber" },
        { title: "Rose", value: "rose" },
        { title: "Violet", value: "violet" },
        { title: "Cyan", value: "cyan" },
      ],
    }, initialValue: "indigo" }),
  ],
  preview: { select: { title: "title", subtitle: "description" } },
});
