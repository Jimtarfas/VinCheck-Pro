import type { Metadata } from "next";
import { Palette, Check } from "lucide-react";
import { t } from "@/i18n";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import VinSearchForm from "@/components/VinSearchForm";
import Breadcrumbs from "@/components/Breadcrumbs";

const LOCALE = "es" as const;
const ENGLISH_PATH = "/paint-code-lookup" as const;
const SITE = "https://www.carcheckervin.com";

export async function generateMetadata(): Promise<Metadata> {
  const alt = hreflangAlternatesForLocale(ENGLISH_PATH, LOCALE);
  return {
    title: { absolute: t(LOCALE, "paintCode.metaTitle") },
    description: t(LOCALE, "paintCode.metaDescription"),
    alternates: { canonical: alt.canonical, languages: alt.languages },
    openGraph: {
      title: t(LOCALE, "paintCode.metaTitle"),
      description: t(LOCALE, "paintCode.metaDescription"),
      url: alt.canonical,
      type: "website",
      locale: "es_US",
      siteName: "CarCheckerVIN",
    },
    twitter: {
      card: "summary_large_image",
      title: t(LOCALE, "paintCode.metaTitle"),
      description: t(LOCALE, "paintCode.metaDescription"),
    },
    robots: { index: true, follow: true },
  };
}

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  inLanguage: "es",
  name: "Búsqueda del código de pintura por VIN",
  url: `${SITE}/es/codigo-de-pintura`,
  applicationCategory: "UtilityApplication",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function PaintCodeLookupEs() {
  const bullets = [
    "Código de pintura OEM (ej. NH788P para el Lunar Silver Metallic de Honda)",
    "Nombre oficial del color tal como lo imprime el fabricante",
    "Años de producción en que se ofreció el color",
    "Referencias de bolígrafo y botella de pintura para retoques",
    "Identificación de pintura bicapa vs monocapa",
    "Código de color de carrocería Y código de color del interior (cuando esté disponible)",
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <main className="pb-16 bg-surface">
        <div className="bg-primary text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
            <Breadcrumbs
              items={[
                { label: "Inicio", href: "/es" },
                { label: "Código de pintura" },
              ]}
              onDark
            />

            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs sm:text-sm font-semibold mt-6 mb-4">
              <Palette className="w-3.5 h-3.5" />
              {t(LOCALE, "paintCode.heroEyebrow")}
            </span>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
              {t(LOCALE, "paintCode.heroHeadline")}
            </h1>

            <p className="text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
              {t(LOCALE, "paintCode.heroSub")}
            </p>

            <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
              <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">
                {t(LOCALE, "paintCode.searchHeading")}
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant mb-4">
                {t(LOCALE, "paintCode.searchSub")}
              </p>
              <VinSearchForm size="lg" />
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 mt-14 space-y-12">
          <section>
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
              {t(LOCALE, "paintCode.whyVinHeading")}
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
              {t(LOCALE, "paintCode.whyVinBody")}
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
              {t(LOCALE, "paintCode.whatYouGetHeading")}
            </h2>
            <ul className="space-y-3">
              {bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-3 bg-surface-container-low rounded-xl p-4"
                >
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base text-on-surface">{b}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
              {t(LOCALE, "paintCode.whereStickerHeading")}
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
              {t(LOCALE, "paintCode.whereStickerBody")}
            </p>
          </section>

          <section className="bg-primary text-white rounded-3xl p-8 text-center">
            <h2 className="text-2xl font-headline font-extrabold mb-2">
              {t(LOCALE, "paintCode.ctaHeading")}
            </h2>
            <p className="text-white/80 mb-6">
              {t(LOCALE, "paintCode.ctaSub")}
            </p>
            <div className="max-w-md mx-auto bg-white rounded-xl p-4">
              <VinSearchForm size="lg" />
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
