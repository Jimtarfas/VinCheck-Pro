import type { Metadata } from "next";
import Link from "next/link";
import { Search, Shield, Check } from "lucide-react";
import { t } from "@/i18n";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import Breadcrumbs from "@/components/Breadcrumbs";

const LOCALE = "es" as const;
const ENGLISH_PATH = "/license-plate-lookup" as const;
const SITE = "https://www.carcheckervin.com";

export async function generateMetadata(): Promise<Metadata> {
  const alt = hreflangAlternatesForLocale(ENGLISH_PATH, LOCALE);
  return {
    title: { absolute: t(LOCALE, "licensePlate.metaTitle") },
    description: t(LOCALE, "licensePlate.metaDescription"),
    alternates: { canonical: alt.canonical, languages: alt.languages },
    openGraph: {
      title: t(LOCALE, "licensePlate.metaTitle"),
      description: t(LOCALE, "licensePlate.metaDescription"),
      url: alt.canonical,
      type: "website",
      locale: "es_US",
      siteName: "CarCheckerVIN",
    },
    twitter: {
      card: "summary_large_image",
      title: t(LOCALE, "licensePlate.metaTitle"),
      description: t(LOCALE, "licensePlate.metaDescription"),
    },
    robots: { index: true, follow: true },
  };
}

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  inLanguage: "es",
  name: "Búsqueda de VIN por placa",
  url: `${SITE}/es/buscar-por-placa`,
  applicationCategory: "UtilityApplication",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function LicensePlateLookupEs() {
  const bullets = [
    "El VIN de 17 caracteres asociado a la placa",
    "Año, marca, modelo, versión",
    "Estilo de carrocería y color",
    "Motor y transmisión",
    "Retiros activos de seguridad de la NHTSA",
    "Opcional: reporte completo del historial respaldado por NMVTIS",
  ];

  const sources = [
    {
      href: "https://www.law.cornell.edu/uscode/text/18/2721",
      label: "18 U.S.C. § 2721 — Driver's Privacy Protection Act",
      note: "Ley federal que restringe la divulgación de registros personales de vehículos motorizados.",
    },
    {
      href: "https://vehiclehistory.bja.ojp.gov/",
      label: "NMVTIS — Bureau of Justice Assistance",
      note: "Registros federales de título y marcas, cruzados después de resolver la placa al VIN.",
    },
    {
      href: "https://www.nhtsa.gov/recalls",
      label: "NHTSA — Retiros de seguridad por VIN",
      note: "Consulta autorizada de retiros activos una vez resuelto el VIN.",
    },
    {
      href: "https://www.nicb.org/vincheck",
      label: "NICB VINCheck",
      note: "Registros gratuitos de vehículos robados y salvage de aseguradoras de EE. UU.",
    },
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
                { label: "Buscar por placa" },
              ]}
              onDark
            />

            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs sm:text-sm font-semibold mt-6 mb-4">
              <Search className="w-3.5 h-3.5" />
              {t(LOCALE, "licensePlate.heroEyebrow")}
            </span>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
              {t(LOCALE, "licensePlate.heroHeadline")}
            </h1>

            <p className="text-base sm:text-xl text-white/85 max-w-3xl leading-relaxed">
              {t(LOCALE, "licensePlate.heroSub")}
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 mt-14 space-y-12">
          <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-outline-variant/40">
            <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">
              {t(LOCALE, "licensePlate.searchHeading")}
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant mb-4">
              {t(LOCALE, "licensePlate.searchSub")}
            </p>
            {/* Plate lookup widget is the existing English form — for
                Wave 1 we link buyers to the English /license-plate-lookup
                page where the working interactive widget lives. The
                widget itself gets translated in a later wave. */}
            <Link
              href="/license-plate-lookup"
              className="block w-full text-center px-5 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary-700 transition"
            >
              {t(LOCALE, "vinCheck.ctaSearchHeading")} →
            </Link>
            <p className="text-[11px] text-on-surface-variant text-center mt-3 italic">
              La herramienta interactiva sigue en inglés mientras
              traducimos los controles. La búsqueda funciona igual desde
              ahí y respeta toda la normativa DPPA.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
              {t(LOCALE, "licensePlate.whatYouGetHeading")}
            </h2>
            <ul className="space-y-3">
              {bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-3 bg-surface-container-low rounded-xl p-4"
                >
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base text-on-surface">
                    {b}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-amber-50 border border-amber-200 rounded-2xl p-6 sm:p-7">
            <h2 className="text-base font-bold text-amber-900 flex items-center gap-2 mb-3">
              <Shield className="w-4 h-4" />
              {t(LOCALE, "licensePlate.dppaHeading")}
            </h2>
            <p className="text-amber-900 text-sm leading-relaxed">
              {t(LOCALE, "licensePlate.dppaBody")}
            </p>
          </section>

          <section className="bg-surface-container-low border border-outline-variant/40 rounded-2xl p-6 sm:p-7">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-3">
              {t(LOCALE, "licensePlate.sourcesHeading")}
            </h2>
            <p className="text-sm text-on-surface-variant mb-5">
              {t(LOCALE, "licensePlate.sourcesIntro")}
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {sources.map((s) => (
                <li
                  key={s.href}
                  className="rounded-xl border border-outline-variant/60 bg-white p-4"
                >
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary font-semibold underline underline-offset-2"
                  >
                    {s.label} ↗
                  </a>
                  <p className="mt-1.5 text-xs text-on-surface-variant leading-relaxed">
                    {s.note}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-primary text-white rounded-3xl p-8 text-center">
            <h2 className="text-2xl font-headline font-extrabold mb-2">
              {t(LOCALE, "licensePlate.ctaHeading")}
            </h2>
            <p className="text-white/80 mb-6">
              {t(LOCALE, "licensePlate.ctaSub")}
            </p>
            <Link
              href="/es/revision-vin"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-primary font-bold hover:bg-white/90 transition"
            >
              {t(LOCALE, "licensePlate.ctaButton")}
            </Link>
          </section>
        </div>
      </main>
    </>
  );
}
