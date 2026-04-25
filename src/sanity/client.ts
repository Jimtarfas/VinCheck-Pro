import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { apiVersion, dataset, projectId, useCdn } from "./env";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  perspective: "published",
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source);
}
