/**
 * Wave 15 — Spanish dynamic template for /paint-code-lookup/[brand].
 * One page per entry in PAINT_CODE_BRANDS (Honda, Toyota, Ford, BMW…).
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Palette } from "lucide-react";
import SpecialtyToolPage from "../../_specialty-shared/SpecialtyToolPage";
import { specialtyMetadata, specialtySchemas } from "../../_specialty-shared/metadata";
import type { SpecialtyHook } from "../../_specialty-shared/strings";
import { PAINT_CODE_BRANDS } from "@/lib/paint-codes";

export function generateStaticParams() {
  return PAINT_CODE_BRANDS.map((b) => ({ brand: b.slug }));
}

function buildHook(brandSlug: string): SpecialtyHook | null {
  const brand = PAINT_CODE_BRANDS.find((b) => b.slug === brandSlug);
  if (!brand) return null;

  const examples = brand.examples.slice(0, 3).map((e) => `${e.code} (${e.colorName})`).join(", ");

  return {
    esSlug: `/paint-code-lookup/${brand.slug}`,
    englishPath: `/paint-code-lookup/${brand.slug}`,
    icon: Palette,
    badge: `Código de pintura · ${brand.name}`,
    h1: `Buscador de código de pintura ${brand.name}`,
    metaTitle: `Código pintura ${brand.name} gratis por VIN`,
    metaDescription: `Encuentra el código de pintura OEM exacto de cualquier ${brand.name} por VIN. Nombre del color, código y referencias de retoque — gratis al instante.`,
    keywords: [
      `código pintura ${brand.name}`,
      `${brand.name} paint code español`,
      `color OEM ${brand.name}`,
      `retoque pintura ${brand.name}`,
      `${brand.name} código color`,
      `${brand.name} pintura VIN`,
    ],
    intro: `El código de pintura de fábrica de tu ${brand.name} está vinculado al VIN y a la calcomanía del ${brand.stickerLabel.toLowerCase()}. El formato es ${brand.codeFormat} y se encuentra principalmente en ${brand.primaryLocation.toLowerCase()}. Ejemplos comunes: ${examples}. Decodificarlo correctamente por VIN te da el código OEM exacto para pedir pintura de retoque que combine perfectamente con el resto de la carrocería.`,
    whatYouGet: [
      `Código OEM exacto de ${brand.name}`,
      `Nombre comercial del color (${examples})`,
      `Años de producción en que se ofreció ese color`,
      `Referencias para botellas, bolígrafos y latas de aerosol de retoque`,
      `Compatibilidad con sistemas PPG, Sherwin-Williams y BASF`,
      `Ubicación física de la calcomanía: ${brand.primaryLocation}`,
      `Ubicaciones alternativas: ${brand.secondaryLocations.slice(0, 2).join(", ")}`,
    ],
    whyItMatters: brand.tips.slice(0, 4),
    trustNote: `Decodificamos códigos de pintura OEM de ${brand.name} directamente desde hojas de especificación del fabricante. El formato sigue el estándar ${brand.codePattern}. Para confirmación física, busca la calcomanía en ${brand.primaryLocation.toLowerCase()} o cualquiera de las ubicaciones alternativas listadas arriba.`,
    schemaName: `Buscador código pintura ${brand.name}`,
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
