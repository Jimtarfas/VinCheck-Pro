/**
 * Wave 15 — Spanish blog category index. Sanity-backed.
 * Renders a thin Spanish "Categoría: X" landing that links back to
 * /es/blog. Blog category pages are intentionally low-rank (per the
 * note on the English version, Google typically parks them as
 * "Crawled — currently not indexed"), so we keep the Spanish version
 * minimal — just enough to avoid 404 + give the visitor a way back
 * to the main /es/blog feed.
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FolderOpen } from "lucide-react";
import SpecialtyToolPage from "../../../_specialty-shared/SpecialtyToolPage";
import { specialtyMetadata, specialtySchemas } from "../../../_specialty-shared/metadata";
import type { SpecialtyHook } from "../../../_specialty-shared/strings";
import { sanityClient } from "@/sanity/client";
import { allCategorySlugsQuery, categoryBySlugQuery } from "@/sanity/queries";
import type { SanityCategory } from "@/sanity/types";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await sanityClient.fetch<string[]>(allCategorySlugsQuery);
  return slugs.map((slug) => ({ slug }));
}

async function buildHook(slug: string): Promise<SpecialtyHook | null> {
  const category = await sanityClient.fetch<SanityCategory | null>(categoryBySlugQuery, { slug });
  if (!category) return null;
  return {
    esSlug: `/blog/category/${category.slug}`,
    englishPath: `/blog/category/${category.slug}`,
    icon: FolderOpen,
    badge: `Categoría · ${category.title}`,
    h1: `Categoría: ${category.title}`,
    metaTitle: `${category.title} — Blog CarCheckerVIN`,
    metaDescription:
      category.description ||
      `Lee los artículos más recientes de CarCheckerVIN en la categoría ${category.title} — guías, consejos y análisis.`,
    keywords: [`${category.title} CarCheckerVIN`, `blog ${category.title} español`, `artículos VIN ${category.title}`],
    intro: `Esta es la página de la categoría "${category.title}". Hemos publicado artículos relacionados en esta categoría — visita /es/blog para ver el feed completo en español.`,
    whatYouGet: [
      `Artículos publicados bajo la categoría ${category.title}`,
      `Acceso al feed completo en /es/blog`,
      `Suscripción opcional al boletín por correo`,
    ],
    whyItMatters: [
      `Las categorías ayudan a navegar los artículos por tema`,
      `Para artículos en español, visita la página principal del blog en /es/blog`,
    ],
    trustNote: `Los artículos son escritos por nuestro equipo editorial y revisados por nuestro equipo de datos antes de publicar. Las traducciones al español están en desarrollo continuo — algunos artículos pueden estar solo disponibles en inglés temporalmente.`,
    schemaName: `Categoría blog: ${category.title}`,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const hook = await buildHook(slug);
  if (!hook) return { robots: { index: false, follow: false } };
  return { ...specialtyMetadata(hook), robots: { index: false, follow: true } };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const hook = await buildHook(slug);
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
