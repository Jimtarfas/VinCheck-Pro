import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { t } from "@/i18n";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import { ORG_AUTHOR } from "@/lib/seo/author";

const LOCALE = "es" as const;
const ENGLISH_PATH = "/florida-vin-check" as const;
const SITE = "https://www.carcheckervin.com";

export async function generateMetadata(): Promise<Metadata> {
  const alt = hreflangAlternatesForLocale(ENGLISH_PATH, LOCALE);
  return {
    title: { absolute: t(LOCALE, "florida.metaTitle") },
    description: t(LOCALE, "florida.metaDescription"),
    // 8 Spanish-language keywords matching the highest-volume LATAM/US
    // Hispanic VIN check queries. Trimmed vs English: meta keywords are
    // ignored by Google but Bing/Yandex still consume them.
    keywords: [
      "revisión VIN Florida",
      "VIN check Florida español",
      "historial vehicular Florida",
      "verificar VIN Florida",
      "Florida DHSMV VIN",
      "reporte historial auto Florida",
      "VIN gratis Florida",
      "decodificar VIN Florida",
    ],
    alternates: {
      canonical: alt.canonical,
      languages: alt.languages,
    },
    openGraph: {
      title: t(LOCALE, "florida.metaTitle"),
      description: t(LOCALE, "florida.metaDescription"),
      url: alt.canonical,
      type: "article",
      locale: "es_US",
      siteName: "CarCheckerVIN",
    },
    twitter: {
      card: "summary_large_image",
      title: t(LOCALE, "florida.metaTitle"),
      description: t(LOCALE, "florida.metaDescription"),
    },
    robots: { index: true, follow: true },
  };
}

/**
 * Spanish Florida VIN check landing — Phase 1 pilot.
 *
 * Structure mirrors the English /florida-vin-check page so the
 * hreflang chain is symmetric and Google identifies them as
 * equivalents.  Schema is emitted in Spanish (`inLanguage: "es"`,
 * `headline` translated) so Spanish queries pull the Spanish version
 * from the index, not the English fallback.
 */

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "es",
  headline:
    "Revisión VIN de Florida — Reporte gratis del historial del vehículo (FL DHSMV)",
  description:
    "Guía completa para ejecutar una revisión VIN gratis de Florida. Cubre datos del DHSMV, búsqueda de título, registros de accidentes, verificación VIN y revisión VIN para motocicletas.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE}/es/florida-revision-vin`,
  },
  datePublished: "2026-06-12",
  dateModified: "2026-06-12",
  image: `${SITE}/opengraph-image`,
  about: {
    "@type": "Place",
    name: "Florida",
    sameAs: "https://es.wikipedia.org/wiki/Florida",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/es` },
    {
      "@type": "ListItem",
      position: 2,
      name: "Revisión VIN de Florida",
      item: `${SITE}/es/florida-revision-vin`,
    },
  ],
};

export default function FloridaVinCheckPageEs() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <article className="pb-16 bg-surface">
        {/* Hero */}
        <div className="bg-primary text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
            <Breadcrumbs
              items={[
                { label: "Inicio", href: "/es" },
                { label: "Revisión VIN de Florida" },
              ]}
              onDark
            />

            <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
              <MapPin className="w-4 h-4" />
              {t(LOCALE, "florida.badgeState")} &nbsp;·&nbsp;{" "}
              {t(LOCALE, "florida.badgeAuthority")}
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
              {t(LOCALE, "florida.h1Lead")}{" "}
              <span style={{ color: "var(--color-secondary-container)" }}>
                {t(LOCALE, "florida.h1Accent")}
              </span>
            </h1>

            <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
              {t(LOCALE, "florida.intro")}
            </p>

            <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
              <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">
                {t(LOCALE, "florida.searchHeading")}
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant mb-4">
                {t(LOCALE, "florida.searchSub")}
              </p>
              <VinSearchForm size="lg" />
            </div>
          </div>
        </div>

        {/* Translated content sections will follow in Phase 2 — for now
            the hero alone is enough to validate the i18n pipeline. The
            English page has ~2,500 words of body content that we'll
            translate next sprint with the native reviewer. */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 mt-12 text-on-surface">
          <p className="text-sm leading-relaxed text-on-surface-variant italic">
            Más contenido traducido aparecerá pronto. La versión completa
            en inglés está disponible en{" "}
            <a
              href="/florida-vin-check"
              className="underline text-primary hover:text-primary-700"
            >
              /florida-vin-check
            </a>
            .
          </p>
        </div>
      </article>
    </>
  );
}
