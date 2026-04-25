import { defineType, defineArrayMember } from "sanity";

export const blockContent = defineType({
  name: "blockContent",
  title: "Block Content",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          { title: "Code", value: "code" },
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Link",
            fields: [
              { name: "href", type: "url", title: "URL" },
              {
                name: "blank",
                type: "boolean",
                title: "Open in new tab",
                initialValue: false,
              },
            ],
          },
          {
            name: "internalLink",
            type: "object",
            title: "Internal page link",
            fields: [
              { name: "path", type: "string", title: "Path (e.g. /vin-check)" },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
      fields: [
        { name: "alt", type: "string", title: "Alt text (for SEO)", validation: (r) => r.required() },
        { name: "caption", type: "string", title: "Caption" },
      ],
    }),
    defineArrayMember({
      name: "callout",
      title: "Callout",
      type: "object",
      fields: [
        { name: "title", type: "string", title: "Title" },
        { name: "text", type: "text", title: "Text", rows: 3 },
        { name: "variant", type: "string", title: "Variant", options: { list: ["info", "tip", "warning"] }, initialValue: "info" },
      ],
    }),
  ],
});
