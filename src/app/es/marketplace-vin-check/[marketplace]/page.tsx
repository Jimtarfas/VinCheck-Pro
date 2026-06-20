/**
 * Wave 15 — Spanish dynamic template for /marketplace-vin-check/[marketplace].
 * ~5 pages: Facebook Marketplace, Craigslist, OfferUp, eBay Motors,
 * AutoTrader.
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Store } from "lucide-react";
import SpecialtyToolPage from "../../_specialty-shared/SpecialtyToolPage";
import { specialtyMetadata, specialtySchemas } from "../../_specialty-shared/metadata";
import type { SpecialtyHook } from "../../_specialty-shared/strings";
import { marketplaces } from "@/lib/marketplaces";

export function generateStaticParams() {
  return marketplaces.map((m) => ({ marketplace: m.slug }));
}

const RISK_LABEL = {
  low: "Bajo",
  medium: "Medio",
  high: "Alto",
} as const;

function buildHook(marketplaceSlug: string): SpecialtyHook | null {
  const mp = marketplaces.find((m) => m.slug === marketplaceSlug);
  if (!mp) return null;

  return {
    esSlug: `/marketplace-vin-check/${mp.slug}`,
    englishPath: `/marketplace-vin-check/${mp.slug}`,
    icon: Store,
    badge: `${mp.name} · Riesgo ${RISK_LABEL[mp.riskLevel]}`,
    h1: `Verificación VIN para autos en ${mp.name}`,
    metaTitle: `Verificación VIN ${mp.name} gratis — Detecta fraude`,
    metaDescription: `Verifica VIN de cualquier auto vendido en ${mp.name}. Marcas de título, accidentes, retiros y robos — gratis e instantáneo antes de comprar.`,
    keywords: [
      `${mp.name} VIN check español`,
      `${mp.name} auto verificar`,
      `${mp.name} fraude auto`,
      `verificar VIN ${mp.name}`,
      `${mp.name} auto usado verificación`,
      `${mp.name} estafa auto`,
    ],
    intro: `${mp.longDesc} Verifica el VIN antes de viajar a ver el auto o pagar cualquier depósito: 60 segundos de verificación previenen $5,000–$50,000 de pérdida total.`,
    whatYouGet: [
      `Marcas de título en los 50 estados (salvage, rebuilt, flood)`,
      `Historial de accidentes y reparaciones reportadas`,
      `Detección de retroceso de odómetro`,
      `Cruce contra NICB para autos robados`,
      `Retiros NHTSA pendientes específicos del VIN`,
      `Confirmación de marca/modelo/año vs lo que el vendedor publica`,
      `Tipos populares en ${mp.name}: ${mp.popular.join(", ")}`,
    ],
    whyItMatters: [
      mp.riskNote,
      `Los vendedores legítimos en ${mp.name} comparten el VIN sin objeción — si se niegan, es bandera roja crítica`,
      `Sin garantía de marketplace = sin recurso si descubres salvage después de pagar`,
      `Una verificación de 60 segundos por VIN previene la mayoría de estafas`,
    ],
    trustNote: `Datos cruzados contra NMVTIS, NICB, NHTSA y reportes de aseguradoras. La verificación es gratis sin tarjeta — los reportes premium con historial completo cuestan $9.99 una sola vez.`,
    schemaName: `Verificación VIN ${mp.name}`,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ marketplace: string }>;
}): Promise<Metadata> {
  const { marketplace } = await params;
  const hook = buildHook(marketplace);
  if (!hook) return {};
  return specialtyMetadata(hook);
}

export default async function Page({
  params,
}: {
  params: Promise<{ marketplace: string }>;
}) {
  const { marketplace } = await params;
  const hook = buildHook(marketplace);
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
