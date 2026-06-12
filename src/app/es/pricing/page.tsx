import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { t } from "@/i18n";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import Breadcrumbs from "@/components/Breadcrumbs";

const LOCALE = "es" as const;
const ENGLISH_PATH = "/pricing" as const;
const SITE = "https://www.carcheckervin.com";

export async function generateMetadata(): Promise<Metadata> {
  const alt = hreflangAlternatesForLocale(ENGLISH_PATH, LOCALE);
  return {
    title: { absolute: t(LOCALE, "pricing.metaTitle") },
    description: t(LOCALE, "pricing.metaDescription"),
    alternates: { canonical: alt.canonical, languages: alt.languages },
    openGraph: {
      title: t(LOCALE, "pricing.metaTitle"),
      description: t(LOCALE, "pricing.metaDescription"),
      url: alt.canonical,
      type: "website",
      locale: "es_US",
      siteName: "CarCheckerVIN",
    },
    twitter: {
      card: "summary_large_image",
      title: t(LOCALE, "pricing.metaTitle"),
      description: t(LOCALE, "pricing.metaDescription"),
    },
    robots: { index: true, follow: true },
  };
}

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  inLanguage: "es",
  name: "Reporte completo del historial del vehículo",
  description:
    "Reporte completo del historial del vehículo respaldado por NMVTIS.",
  offers: {
    "@type": "Offer",
    price: "9.99",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    url: `${SITE}/es/precios`,
  },
};

export default function PricingPageEs() {
  const freeBullets = [
    "Año, marca, modelo, versión",
    "Motor, transmisión, tracción",
    "Equipamiento de fábrica",
    "Retiros activos de seguridad de la NHTSA",
    "No se necesita tarjeta de crédito",
  ];
  const paidBullets = [
    "Todo lo del plan gratis",
    "Marcas de título de los 50 estados",
    "Accidentes y daños reportados",
    "Cada lectura del odómetro registrada",
    "Propietarios anteriores y transferencias de registro",
    "Registros de servicio y mantenimiento",
    "Registros de robo y pérdida total",
    "Reembolso del 100% si no hay datos del VIN",
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <main className="pb-16 bg-surface">
        <div className="bg-primary text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
            <Breadcrumbs
              items={[
                { label: "Inicio", href: "/es" },
                { label: "Precios" },
              ]}
              onDark
            />

            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs sm:text-sm font-semibold mt-6 mb-4">
              {t(LOCALE, "pricing.heroEyebrow")}
            </span>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
              {t(LOCALE, "pricing.heroHeadline")}
            </h1>

            <p className="text-base sm:text-xl text-white/85 max-w-3xl leading-relaxed">
              {t(LOCALE, "pricing.heroSub")}
            </p>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-12 grid sm:grid-cols-2 gap-6">
          {/* Free tier */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-outline-variant/40 shadow-sm">
            <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
              {t(LOCALE, "pricing.freeTitle")}
            </p>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-5xl font-headline font-extrabold text-on-surface">
                {t(LOCALE, "pricing.freePrice")}
              </span>
              <span className="text-sm text-on-surface-variant">
                {t(LOCALE, "pricing.freeUnit")}
              </span>
            </div>
            <ul className="space-y-2 mb-6">
              {freeBullets.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-on-surface">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  {b}
                </li>
              ))}
            </ul>
            <Link
              href="/es/revision-vin"
              className="block w-full text-center px-5 py-3 rounded-xl bg-surface-container border border-outline-variant text-on-surface font-bold hover:bg-surface-container-high transition"
            >
              {t(LOCALE, "pricing.freeCta")}
            </Link>
          </div>

          {/* Paid tier */}
          <div className="bg-primary text-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-primary/30">
            <p className="text-xs font-bold text-white/70 uppercase tracking-wider mb-1">
              {t(LOCALE, "pricing.paidTitle")}
            </p>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-5xl font-headline font-extrabold">
                {t(LOCALE, "pricing.paidPrice")}
              </span>
              <span className="text-sm text-white/70">
                {t(LOCALE, "pricing.paidUnit")}
              </span>
            </div>
            <ul className="space-y-2 mb-6">
              {paidBullets.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-secondary-container flex-shrink-0 mt-0.5" />
                  {b}
                </li>
              ))}
            </ul>
            <Link
              href="https://app.carcheckervin.com/"
              className="block w-full text-center px-5 py-3 rounded-xl bg-white text-primary font-bold hover:bg-white/90 transition"
            >
              {t(LOCALE, "pricing.paidCta")}
            </Link>
            <p className="text-xs text-white/60 text-center mt-3">
              {t(LOCALE, "pricing.moneyBack")}
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
