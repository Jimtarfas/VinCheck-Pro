/**
 * Wave 17f — French dynamic template for /fr/marketplace-vin-check/[marketplace].
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

  const alt = hreflangAlternatesForLocale(`/marketplace-vin-check/${mp.slug}`, "fr");
  const title = `Vérification VIN ${mp.name} — Vérifie avant de acheter en ${mp.name}`;
  const description = `Ejecuta una vérification VIN en n’importe quel véhicule publicado en ${mp.name}. Obtiens un rapport complet de historique de véhicule avant de acheter — descouvre accidents, problemas de titre et fraude de odomètre instantanément.`;

  return {
    title: { absolute: `${title} | CarCheckerVIN` },
    description,
    keywords: [
      `vérification VIN ${mp.name}`,
      `${mp.name} historique de véhicule`,
      `${mp.name} vérification auto`,
      `vérifier anuncio ${mp.name}`,
      `${mp.name} consultatioptiontioptiontioption VIN`,
      `${mp.name} voiture d’occasion vérification`,
      `vérification VIN marketplace`,
      `historique de véhicule marketplace en ligne`,
    ],
    alternates: { canonical: alt.canonical, languages: alt.languages },
    openGraph: {
      title,
      description,
      url: alt.canonical,
      type: "article",
      siteName: "CarCheckerVIN",
      locale: "fr_US",
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

  const pageUrl = `${SITE}/fr/marketplace-vin-check/${mp.slug}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Vérification VIN de marketplace",
        item: `${SITE}/fr/marketplace-vin-check`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `Vérification VIN ${mp.name}`,
        item: pageUrl,
      },
    ],
  };

  // FAQ JSON-LD mirrors the visible (French) FAQs via the shared body.
  const faqs = buildMarketplaceFaqs(slug, "fr");
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
      <MarketplaceVinCheckBody marketplaceSlug={slug} locale="fr" />
    </>
  );
}
