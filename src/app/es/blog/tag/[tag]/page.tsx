/**
 * Wave 15 — Spanish blog tag index. Sanity-backed.
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Tag } from "lucide-react";
import SpecialtyToolPage from "../../../_specialty-shared/SpecialtyToolPage";
import { specialtyMetadata, specialtySchemas } from "../../../_specialty-shared/metadata";
import type { SpecialtyHook } from "../../../_specialty-shared/strings";
import { sanityClient } from "@/sanity/client";
import { allTagsQuery } from "@/sanity/queries";

export const revalidate = 60;

function slugifyTag(tag: string): string {
  return tag
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function resolveTag(slugParam: string): Promise<string | null> {
  const allTags = await sanityClient.fetch<string[]>(allTagsQuery);
  if (!allTags) return null;
  const decoded = decodeURIComponent(slugParam).toLowerCase();
  const match = allTags.find(
    (t) => slugifyTag(t) === decoded || t.toLowerCase() === decoded,
  );
  return match || null;
}

export async function generateStaticParams() {
  const allTags = await sanityClient.fetch<string[]>(allTagsQuery);
  if (!allTags) return [];
  const seen = new Set<string>();
  const params: { tag: string }[] = [];
  for (const t of allTags) {
    const slug = slugifyTag(t);
    if (slug && !seen.has(slug)) {
      seen.add(slug);
      params.push({ tag: slug });
    }
  }
  return params;
}

async function buildHook(slugParam: string): Promise<SpecialtyHook | null> {
  const tag = await resolveTag(slugParam);
  if (!tag) return null;
  return {
    esSlug: `/blog/tag/${slugifyTag(tag)}`,
    englishPath: `/blog/tag/${slugifyTag(tag)}`,
    icon: Tag,
    badge: `Etiqueta · ${tag}`,
    h1: `Etiqueta: ${tag}`,
    metaTitle: `Etiqueta ${tag} — Blog CarCheckerVIN`,
    metaDescription: `Artículos del blog de CarCheckerVIN etiquetados con "${tag}". Visita /es/blog para el feed completo.`,
    keywords: [`${tag} blog español`, `etiqueta ${tag} VIN`, `artículos ${tag} CarCheckerVIN`],
    intro: `Página de la etiqueta "${tag}". Visita /es/blog para ver el feed completo de artículos en español.`,
    whatYouGet: [
      `Artículos etiquetados con "${tag}"`,
      `Acceso al feed completo en /es/blog`,
      `Suscripción opcional al boletín`,
    ],
    whyItMatters: [
      `Las etiquetas ayudan a encontrar artículos por tema específico`,
      `Para más artículos en español, visita /es/blog`,
    ],
    trustNote: `Los artículos son escritos por nuestro equipo editorial. Las traducciones al español están en desarrollo continuo.`,
    schemaName: `Etiqueta blog: ${tag}`,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  const hook = await buildHook(tag);
  if (!hook) return { robots: { index: false, follow: false } };
  return { ...specialtyMetadata(hook), robots: { index: false, follow: true } };
}

export default async function Page({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const hook = await buildHook(tag);
  if (!hook) notFound();
  const { webAppSchema, breadcrumbSchema } = specialtySchemas(hook);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <SpecialtyToolPage hook={hook} />
    </>
  );
}
