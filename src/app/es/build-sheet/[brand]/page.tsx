/**
 * Wave 15 — Spanish dynamic template for /build-sheet/[brand].
 * Per-brand build-sheet pages for Mercedes-Benz, BMW, Audi, etc.
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FileText } from "lucide-react";
import SpecialtyToolPage from "../../_specialty-shared/SpecialtyToolPage";
import { specialtyMetadata, specialtySchemas } from "../../_specialty-shared/metadata";
import type { SpecialtyHook } from "../../_specialty-shared/strings";
import { BUILD_SHEET_BRANDS } from "@/lib/build-sheets";

export function generateStaticParams() {
  return BUILD_SHEET_BRANDS.map((b) => ({ brand: b.slug }));
}

function buildHook(brandSlug: string): SpecialtyHook | null {
  const brand = BUILD_SHEET_BRANDS.find((b) => b.slug === brandSlug);
  if (!brand) return null;

  return {
    esSlug: `/build-sheet/${brand.slug}`,
    englishPath: `/build-sheet/${brand.slug}`,
    icon: FileText,
    badge: `Hoja de fábrica · ${brand.name}`,
    h1: `Hoja de fábrica ${brand.name} (${brand.docName})`,
    metaTitle: `Hoja de fábrica ${brand.name} gratis por VIN`,
    metaDescription: `Recupera la ${brand.docName} (hoja de fábrica) de cualquier ${brand.name} por VIN. Códigos de opciones, configuración original, planta y fecha — gratis.`,
    keywords: [
      `hoja de fábrica ${brand.name}`,
      `${brand.name} ${brand.docName} VIN`,
      `${brand.name} build sheet español`,
      `${brand.name} option codes`,
      `${brand.name} configuración original`,
      `${brand.name} spec sheet`,
    ],
    intro: `${brand.summary} La ${brand.docName} es el documento original que ${brand.name} genera al ensamblar cada vehículo. Lista todas las opciones instaladas, códigos de equipamiento, color de pintura, configuración del motor y planta de origen. Es la única referencia oficial para verificar qué especificaciones venían de fábrica en tu ${brand.name}.`,
    whatYouGet: brand.contains.slice(0, 7),
    whyItMatters: brand.tips.slice(0, 4),
    trustNote: `${brand.sourceNote} El formato de códigos de opciones es: ${brand.optionCodeFormat}. La hoja física se encuentra típicamente en: ${brand.whereToFind.slice(0, 3).join(", ")}.`,
    schemaName: `Hoja de fábrica ${brand.name}`,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ brand: string }>;
}): Promise<Metadata> {
  const { brand } = await params;
  const hook = buildHook(brand);
  if (!hook) return {};
  return specialtyMetadata(hook);
}

export default async function Page({
  params,
}: {
  params: Promise<{ brand: string }>;
}) {
  const { brand } = await params;
  const hook = buildHook(brand);
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
