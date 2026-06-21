/**
 * Wave 17f — Spanish dynamic template for /es/marketplace-vin-check/[marketplace].
 * Renders the SAME full English marketplace-page layout via the shared
 * MarketplaceVinCheckBody component. Replaces the Wave 15 SpecialtyToolPage
 * shell with true visual parity.
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MarketplaceVinCheckBody, {
  buildMarketplaceFaqs,
} from "@/components/MarketplaceVinCheckBody";
import { marketplaces, getMarketplaceBySlug } from "@/lib/marketplaces";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const SITE = "https://www.carcheckervin.com";

export function generateStaticParams() {
  // Match the English route: `copart` has its own dedicated page so it must
  // be excluded here to avoid two routes resolving to the same path.
  return marketplaces
    .filter((m) => m.slug !== "copart")
    .map((m) => ({ marketplace: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ marketplace: string }>;
}): Promise<Metadata> {
  const { marketplace: slug } = await params;
  const mp = getMarketplaceBySlug(slug);
  if (!mp) return {};

  const alt = hreflangAlternatesForLocale(`/marketplace-vin-check/${mp.slug}`, "es");
  const title = `Verificación VIN ${mp.name} — Verifica antes de comprar en ${mp.name}`;
  const description = `Ejecuta una verificación VIN en cualquier vehículo publicado en ${mp.name}. Obtén un reporte completo de historial vehicular antes de comprar — descubre accidentes, problemas de título y fraude de odómetro al instante.`;

  return {
    title: { absolute: `${title} | CarCheckerVIN` },
    description,
    keywords: [
      `verificación VIN ${mp.name}`,
      `${mp.name} historial vehicular`,
      `${mp.name} revisión auto`,
      `verificar anuncio ${mp.name}`,
      `${mp.name} consulta VIN`,
      `${mp.name} auto usado verificación`,
      `verificación VIN marketplace`,
      `historial vehicular marketplace en línea`,
    ],
    alternates: { canonical: alt.canonical, languages: alt.languages },
    openGraph: {
      title,
      description,
      url: alt.canonical,
      type: "article",
      siteName: "CarCheckerVIN",
      locale: "es_US",
    },
    twitter: { card: "summary_large_image", title, description },
    robots: { index: true, follow: true },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ marketplace: string }>;
}) {
  const { marketplace: slug } = await params;
  const mp = getMarketplaceBySlug(slug);
  if (!mp) notFound();

  const pageUrl = `${SITE}/es/marketplace-vin-check/${mp.slug}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/es` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Verificación VIN de marketplace",
        item: `${SITE}/es/marketplace-vin-check`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `Verificación VIN ${mp.name}`,
        item: pageUrl,
      },
    ],
  };

  // FAQ JSON-LD mirrors the visible (Spanish) FAQs via the shared body.
  const faqs = buildMarketplaceFaqs(slug, "es");
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <MarketplaceVinCheckBody marketplaceSlug={slug} locale="es" />
    </>
  );
}
