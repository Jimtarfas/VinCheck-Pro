/**
 * Wave 15 — Spanish dynamic template for /lemon-check/brand/[make].
 * 26 brand pages (Toyota, Ford, Honda, Tesla, BMW, etc.) — one per
 * entry in LEMON_BRANDS. Reuses the English data for warranty
 * thresholds and brand facts, renders Spanish chrome around them.
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Scale } from "lucide-react";
import SpecialtyToolPage from "../../../_specialty-shared/SpecialtyToolPage";
import { specialtyMetadata, specialtySchemas } from "../../../_specialty-shared/metadata";
import type { SpecialtyHook } from "../../../_specialty-shared/strings";
import { LEMON_BRANDS } from "@/lib/lemon-brands";

export function generateStaticParams() {
  return LEMON_BRANDS.map((b) => ({ make: b.slug }));
}

function buildHook(makeSlug: string): SpecialtyHook | null {
  const brand = LEMON_BRANDS.find((b) => b.slug === makeSlug);
  if (!brand) return null;

  return {
    esSlug: `/lemon-check/brand/${brand.slug}`,
    englishPath: `/lemon-check/brand/${brand.slug}`,
    icon: Scale,
    badge: `Ley Limón · ${brand.name}`,
    h1: `Ley Limón para ${brand.name}`,
    metaTitle: `Ley Limón ${brand.name} — Verificación gratis por VIN`,
    metaDescription: `Verifica si tu ${brand.name} califica bajo la Ley Limón estatal o federal Magnuson-Moss. Cobertura de garantía, recompras (buybacks) e historial — gratis por VIN.`,
    keywords: [
      `Ley Limón ${brand.name}`,
      `${brand.name} buyback español`,
      `${brand.name} lemon law VIN`,
      `${brand.name} auto defectuoso`,
      `${brand.parent} garantía Ley Limón`,
      `${brand.name} historial recompra`,
    ],
    intro: `${brand.blurb} Las marcas de título por recompra ("Manufacturer Buyback", "Lemon Law Buyback") son emitidas por DMVs estatales — no por el fabricante. Verifica gratis por VIN si tu ${brand.name} tiene historial de recompra o si calificas para reclamar bajo la Ley Limón estatal o la ley federal Magnuson-Moss.`,
    whatYouGet: [
      `Marcas de recompra (Manufacturer Buyback, Lemon Law Buyback) por VIN`,
      `Garantía básica original: ${brand.basicWarranty}`,
      `Garantía del tren motriz: ${brand.powertrainWarranty}`,
      `Modelo de venta: ${brand.salesModel === "Franchised dealers" ? "Concesionarios franquiciados" : "Venta directa al consumidor"}`,
      `Historial de retiros NHTSA específicos del VIN`,
      `Recursos de arbitraje (BBB AUTO LINE, NCDS, juntas estatales)`,
      `Abogados especializados en Ley Limón de ${brand.name} en tu estado`,
    ],
    whyItMatters: [
      ...brand.tips.slice(0, 3),
      `Las marcas de recompra reducen el valor de reventa de un ${brand.name} en 20–40%`,
    ],
    trustNote: `Los datos provienen de NMVTIS, NHTSA y referencias publicadas de la garantía de ${brand.parent}. Esta página es educativa — la elegibilidad bajo Ley Limón depende del estatuto exacto de cada estado y los hechos del caso. Confirma siempre con un abogado especializado en Ley Limón en tu estado.`,
    schemaName: `Verificación Ley Limón ${brand.name}`,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ make: string }>;
}): Promise<Metadata> {
  const { make } = await params;
  const hook = buildHook(make);
  if (!hook) return {};
  return specialtyMetadata(hook);
}

export default async function Page({
  params,
}: {
  params: Promise<{ make: string }>;
}) {
  const { make } = await params;
  const hook = buildHook(make);
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
