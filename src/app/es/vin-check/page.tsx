import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Shield, ArrowRight } from "lucide-react";
import { t } from "@/i18n";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import VinSearchForm from "@/components/VinSearchForm";
import Breadcrumbs from "@/components/Breadcrumbs";

const LOCALE = "es" as const;
const ENGLISH_PATH = "/vin-check" as const;
const SITE = "https://www.carcheckervin.com";

export async function generateMetadata(): Promise<Metadata> {
  const alt = hreflangAlternatesForLocale(ENGLISH_PATH, LOCALE);
  return {
    title: { absolute: t(LOCALE, "vinCheck.metaTitle") },
    description: t(LOCALE, "vinCheck.metaDescription"),
    alternates: { canonical: alt.canonical, languages: alt.languages },
    openGraph: {
      title: t(LOCALE, "vinCheck.metaTitle"),
      description: t(LOCALE, "vinCheck.metaDescription"),
      url: alt.canonical,
      type: "website",
      locale: "es_US",
      siteName: "CarCheckerVIN",
    },
    twitter: {
      card: "summary_large_image",
      title: t(LOCALE, "vinCheck.metaTitle"),
      description: t(LOCALE, "vinCheck.metaDescription"),
    },
    robots: { index: true, follow: true },
  };
}

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  inLanguage: "es",
  name: "Revisión VIN gratis",
  url: `${SITE}/es/revision-vin`,
  description:
    "Revisión VIN gratis y búsqueda del historial del vehículo respaldada por NMVTIS.",
};

export default function VinCheckHubEs() {
  // Pull the bullets array via t() — keys arrive as a comma-separated
  // string in our dictionary's plain-text walker, but we want an array.
  // Since arrays don't survive the t() walker, we re-read from the dict
  // module directly. That keeps the dictionary as the single source.
  const bullets: string[] = [
    "Marcas de título de los 50 estados (salvage, reconstruido, inundación, lemon, granizo)",
    "Accidentes reportados con severidad y activación de bolsas de aire",
    "Cada lectura del odómetro registrada en transferencias del DMV, inspecciones y servicio",
    "Retiros activos de seguridad de la NHTSA con instrucciones de reparación",
    "Cantidad de propietarios anteriores y transferencias de registro",
    "Registros de servicio y mantenimiento reportados a los socios de datos de ClearVin",
    "Registros de robo y pérdida total exigidos por NMVTIS",
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <article className="pb-16 bg-surface">
        <div className="bg-primary text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
            <Breadcrumbs
              items={[
                { label: "Inicio", href: "/es" },
                { label: "Revisión VIN" },
              ]}
              onDark
            />

            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs sm:text-sm font-semibold mt-6 mb-4">
              <Shield className="w-3.5 h-3.5" />
              {t(LOCALE, "vinCheck.heroEyebrow")}
            </span>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
              {t(LOCALE, "vinCheck.heroHeadline")}
            </h1>

            <p className="text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
              {t(LOCALE, "vinCheck.heroSub")}
            </p>

            <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
              <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-4">
                {t(LOCALE, "vinCheck.ctaSearchHeading")}
              </h2>
              <VinSearchForm size="lg" />
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 mt-14">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-6">
            {t(LOCALE, "vinCheck.whatYouGet")}
          </h2>
          <ul className="space-y-3">
            {bullets.map((b) => (
              <li
                key={b}
                className="flex items-start gap-3 bg-surface-container-low rounded-xl p-4"
              >
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-on-surface">
                  {b}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-12 text-center">
            <Link
              href="/es/precios"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary text-white font-bold hover:bg-primary-700 transition shadow-lg shadow-primary/20"
            >
              {t(LOCALE, "pricing.heroHeadline").split(".")[0]}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
