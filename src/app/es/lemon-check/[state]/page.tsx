/**
 * Wave 15 — Spanish dynamic template for /lemon-check/[state].
 *
 * Reuses the existing English data sources (states + LEMON_LAWS) and
 * pipes per-state facts into a Spanish hook rendered through the
 * shared SpecialtyToolPage. 50 pages generated statically — one per
 * U.S. state. The actual statute names + numbers stay in English/legal
 * Spanish because they're proper-noun legal references.
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Scale } from "lucide-react";
import SpecialtyToolPage from "../../_specialty-shared/SpecialtyToolPage";
import { specialtyMetadata, specialtySchemas } from "../../_specialty-shared/metadata";
import type { SpecialtyHook } from "../../_specialty-shared/strings";
import { states } from "@/lib/states";
import { statesEs } from "@/lib/states-es";
import { LEMON_LAWS } from "@/lib/lemon-laws";

export function generateStaticParams() {
  return states.map((s) => ({ state: s.slug }));
}

function buildHook(stateSlug: string): SpecialtyHook | null {
  const state = states.find((s) => s.slug === stateSlug);
  if (!state) return null;
  const stateEs = statesEs.find((s) => s.slug === stateSlug);
  const name = stateEs?.nameEs ?? state.name;
  const law = LEMON_LAWS.find((l) => l.abbr === state.abbr);

  return {
    esSlug: `/lemon-check/${state.slug}`,
    englishPath: `/lemon-check/${state.slug}`,
    icon: Scale,
    badge: `Ley Limón · ${name}`,
    h1: `Ley Limón en ${name}`,
    metaTitle: `Ley Limón ${name} — Verificación gratis por VIN`,
    metaDescription: `Verifica si tu vehículo califica bajo la Ley Limón de ${name}. Cobertura estatal, plazos, intentos de reparación y remedios. Gratis por VIN.`,
    keywords: [
      `Ley Limón ${name}`,
      `lemon law ${name} español`,
      `auto defectuoso ${name}`,
      `reembolso auto ${name}`,
      `${name} buyback VIN`,
      `${name} Lemon Law VIN check`,
    ],
    intro: `${stateEs?.lemonLawNotesEs ?? `${name} tiene una Ley Limón estatal que protege a compradores de autos nuevos con defectos sustanciales no reparables.`} Verifica gratis por VIN si tu vehículo cumple los criterios específicos de ${name} para reclamar reembolso, reemplazo o cash bajo la Ley Limón estatal y la ley federal Magnuson-Moss.`,
    whatYouGet: [
      `Cobertura específica de la Ley Limón en ${name}`,
      law ? `Plazo legal en ${name}: ${law.coveragePeriod}` : `Plazos legales de la Ley Limón de ${name}`,
      law ? `Umbral de intentos de reparación: ${law.repairAttempts}` : `Número de intentos de reparación requeridos`,
      `Tipo de remedio: reembolso completo, reemplazo o cash`,
      `Aplicabilidad a autos usados bajo garantía de fábrica`,
      `Cobertura adicional bajo la ley federal Magnuson-Moss`,
      `Recursos de abogados especializados en Ley Limón en ${name} (sin costo si ganas)`,
    ],
    whyItMatters: [
      `Los abogados de Ley Limón en ${name} cobran al fabricante, no al consumidor — tu reclamo no cuesta nada`,
      `Los plazos son cortos: en ${name} puedes perder el derecho tras 12–24 meses sin reclamar`,
      `Documenta cada intento de reparación con fecha, kilometraje y descripción del defecto`,
      stateEs?.specialFactEs ?? `${name} aplica las protecciones estatales de Ley Limón a vehículos registrados en el estado`,
    ],
    trustNote: `Los datos provienen de la Oficina del Fiscal General de ${name} y referencias publicadas del estatuto. Esta página es una guía educativa — la elegibilidad real depende del estatuto exacto y los hechos del caso. Confirma siempre con un abogado certificado en ${name} antes de presentar reclamo.`,
    schemaName: `Verificación de Ley Limón en ${name}`,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}): Promise<Metadata> {
  const { state } = await params;
  const hook = buildHook(state);
  if (!hook) return {};
  return specialtyMetadata(hook);
}

export default async function Page({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state } = await params;
  const hook = buildHook(state);
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
