/**
 * Wave 15 — Spanish author profile page. Sanity-backed.
 * Profile bios stay in English (proper names + journalist credentials)
 * but we render Spanish chrome around them so /es/author/<slug> exists.
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { User } from "lucide-react";
import SpecialtyToolPage from "../../_specialty-shared/SpecialtyToolPage";
import { specialtyMetadata, specialtySchemas } from "../../_specialty-shared/metadata";
import type { SpecialtyHook } from "../../_specialty-shared/strings";
import { sanityClient } from "@/sanity/client";
import { allAuthorsQuery, authorBySlugQuery } from "@/sanity/queries";
import type { SanityAuthor } from "@/sanity/types";

export const revalidate = 60;

export async function generateStaticParams() {
  const authors = await sanityClient.fetch<SanityAuthor[]>(allAuthorsQuery);
  return authors
    .filter((a) => !!a.slug)
    .map((a) => ({ slug: a.slug as string }));
}

async function buildHook(slug: string): Promise<SpecialtyHook | null> {
  const author = await sanityClient.fetch<SanityAuthor | null>(authorBySlugQuery, { slug });
  if (!author) return null;
  return {
    esSlug: `/author/${author.slug}`,
    englishPath: `/author/${author.slug}`,
    icon: User,
    badge: `Autor · ${author.name}`,
    h1: `Autor: ${author.name}`,
    metaTitle: `${author.name} — Autor en CarCheckerVIN`,
    metaDescription:
      author.bio ||
      `${author.name}${author.role ? ` — ${author.role}` : ""} en CarCheckerVIN. Lee todos los artículos escritos por ${author.name}.`,
    keywords: [`${author.name} CarCheckerVIN`, `autor ${author.name}`, `artículos ${author.name}`],
    intro: `${author.name}${author.role ? ` (${author.role})` : ""} forma parte del equipo editorial de CarCheckerVIN. ${author.bio || ""}`,
    whatYouGet: [
      `Lista de artículos publicados por ${author.name}`,
      `Biografía y credenciales profesionales`,
      `Acceso al feed completo del blog en /es/blog`,
    ],
    whyItMatters: [
      `Nuestros autores son periodistas y expertos del sector automotriz`,
      `Cada artículo es revisado por nuestro equipo de datos antes de publicar`,
      `Para más artículos en español, visita /es/blog`,
    ],
    trustNote: `Todos los autores de CarCheckerVIN tienen credenciales verificadas en periodismo automotriz o data del sector. Los perfiles aparecen primero en inglés y se traducen al español según prioridad de tráfico.`,
    schemaName: `Autor: ${author.name}`,
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
