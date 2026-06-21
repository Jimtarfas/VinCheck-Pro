import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { marketplaces, getMarketplaceBySlug } from "@/lib/marketplaces";
import MarketplaceVinCheckBody, {
  buildMarketplaceFaqs,
} from "@/components/MarketplaceVinCheckBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const SITE = "https://www.carcheckervin.com";

interface Props {
  params: Promise<{ marketplace: string }>;
}

export async function generateStaticParams() {
  // `copart` has its own dedicated, hand-authored page at
  // /marketplace-vin-check/copart, so it must be excluded here to avoid two
  // routes resolving to the same path.
  return marketplaces
    .filter((m) => m.slug !== "copart")
    .map((m) => ({ marketplace: m.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { marketplace: slug } = await params;
  const marketplace = getMarketplaceBySlug(slug);
  if (!marketplace) return { title: "Marketplace VIN Check" };

  const title = `${marketplace.name} VIN Check — Verify Before You Buy on ${marketplace.name}`;
  const description = `Run a VIN check on any vehicle listed on ${marketplace.name}. Get a full vehicle history report before you buy — uncover accidents, title issues, and odometer fraud instantly.`;

  const alt = hreflangAlternatesForLocale(`/marketplace-vin-check/${slug}`, "en");

  return {
    title,
    description,
    keywords: [
      `${marketplace.name} VIN check`,
      `${marketplace.name} vehicle history`,
      `${marketplace.name} car check`,
      `verify ${marketplace.name} listing`,
      `${marketplace.name} VIN lookup`,
      `${marketplace.name} used car check`,
      "marketplace VIN check",
      "online marketplace vehicle history",
    ],
    alternates: { canonical: alt.canonical, languages: alt.languages },
    openGraph: {
      title,
      description,
      type: "website",
    },
  };
}

export default async function MarketplacePage({ params }: Props) {
  const { marketplace: slug } = await params;
  const marketplace = getMarketplaceBySlug(slug);
  if (!marketplace) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${marketplace.name} VIN Check — Verify Before You Buy on ${marketplace.name}`,
    description: `Run a VIN check on any vehicle listed on ${marketplace.name}. Get a full vehicle history report before you buy.`,
    url: `${SITE}/marketplace-vin-check/${marketplace.slug}`,
    isPartOf: { "@type": "WebSite", name: "CarCheckerVIN", url: SITE },
  };

  // FAQ JSON-LD — single source of truth via the shared body component so
  // schema can never drift from the on-page content.
  const faqs = buildMarketplaceFaqs(slug, "en");
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      {
        "@type": "ListItem",
        position: 2,
        name: "Marketplace VIN Check",
        item: `${SITE}/marketplace-vin-check`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: marketplace.name,
        item: `${SITE}/marketplace-vin-check/${marketplace.slug}`,
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <MarketplaceVinCheckBody marketplaceSlug={slug} locale="en" />
    </>
  );
}
