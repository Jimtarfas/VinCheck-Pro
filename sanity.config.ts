"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemas";

export default defineConfig({
  basePath: "/studio",
  projectId: "oWhsIkKd6",
  dataset: "production",
  title: "CarCheckerVIN Blog",
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});
