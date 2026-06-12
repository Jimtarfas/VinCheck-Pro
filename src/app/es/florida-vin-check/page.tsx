import type { Metadata } from "next";
import { MapPin, FileText, AlertCircle, Search, Shield, Car, BadgeCheck } from "lucide-react";
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
    alternates: { canonical: alt.canonical, languages: alt.languages },
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

// Why-different bullets + report items + sources are page-specific; we
// keep them in-file rather than the global dictionary because they only
// appear here.
const WHY_DIFFERENT = [
  {
    icon: "🌀",
    point: "Exposición a huracanes",
    detail:
      "Florida sufre más huracanes y tormentas tropicales que cualquier otro estado de EE. UU. Tras eventos como el huracán Ian (2022), Irma (2017) y Michael (2018), decenas de miles de vehículos con pérdida total por inundación entraron al mercado de usados — muchos con títulos lavados o de otros estados.",
  },
  {
    icon: "🚢",
    point: "Puerto de entrada",
    detail:
      "Miami y Jacksonville son puertos importantes para vehículos importados. Los autos de otros estados y de fuera del país entran a menudo con historiales incompletos o tergiversados.",
  },
  {
    icon: "👴",
    point: "Alta rotación estacional",
    detail:
      "La numerosa población de snowbirds en Florida significa que los vehículos cambian de manos con frecuencia entre particulares — evitando los requisitos de divulgación que aplican a los concesionarios.",
  },
  {
    icon: "☀️",
    point: "Daños por sol y sal",
    detail:
      "La degradación por rayos UV y el aire salino costero causan daños cosméticos y estructurales que los vendedores suelen ocultar. Un reporte de historial por VIN saca a la luz reclamos previos de daños aunque el vehículo se vea limpio.",
  },
];

const REPORT_ITEMS = [
  {
    icon: FileText,
    title: "Historial de títulos",
    desc: "Cada título emitido en Florida y en los otros 49 estados, incluidas marcas, acreedores y transferencias de propiedad.",
  },
  {
    icon: AlertCircle,
    title: "Registros de accidentes",
    desc: "Datos de colisiones de aseguradoras, talleres de reparación y reportes del DMV estatal.",
  },
  {
    icon: Search,
    title: "Lecturas del odómetro",
    desc: "Lecturas de kilometraje de cada trámite del DMV, inspección y evento de seguro.",
  },
  {
    icon: Shield,
    title: "Registros de robo",
    desc: "Referencia cruzada a la base de datos de vehículos robados de la NICB — crítica en las áreas metropolitanas del sur de Florida.",
  },
  {
    icon: Car,
    title: "Estado de retiros del mercado",
    desc: "Todos los retiros activos de seguridad de la NHTSA — entérate antes de registrar el auto.",
  },
  {
    icon: MapPin,
    title: "Daños por inundación y huracanes",
    desc: "Marcas de título por inundación y registros de pérdida total de los eventos meteorológicos de Florida.",
  },
];

const SOURCES = [
  {
    href: "https://services.flhsmv.gov/mvcheckweb/",
    label: "DHSMV de Florida — Verificación de vehículos motorizados",
    note: "Verificación oficial de título y registro en Florida.",
  },
  {
    href: "https://vehiclehistory.bja.ojp.gov/",
    label: "NMVTIS — Bureau of Justice Assistance",
    note: "Sistema Nacional Federal de Información de Títulos de Vehículos Motorizados.",
  },
  {
    href: "https://www.nhtsa.gov/recalls",
    label: "NHTSA — Retiros de seguridad",
    note: "Base autorizada de retiros activos para cualquier VIN de EE. UU.",
  },
  {
    href: "https://www.nicb.org/vincheck",
    label: "NICB VINCheck",
    note: "Reportes gratuitos de robos y salvage de aseguradoras de EE. UU.",
  },
  {
    href: "https://www.iihs.org/topics/auto-theft",
    label: "IIHS — Estadísticas de robos de autos",
    note: "Investigación independiente sobre robos usada en el modelo de riesgo de Florida.",
  },
  {
    href: "http://www.leg.state.fl.us/Statutes/index.cfm?App_mode=Display_Statute&URL=0300-0399/0319/Sections/0319.14.html",
    label: "Estatutos de Florida § 319.14",
    note: "Estatuto que regula las marcas de título salvage y reconstruido.",
  },
];

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

        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Why-different */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
              {t(LOCALE, "florida.whyDifferentHeading")}
            </h2>
            <div className="prose prose-slate max-w-none text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>{t(LOCALE, "florida.whyDifferentP1")}</p>
              <p>{t(LOCALE, "florida.whyDifferentStats")}</p>
              <ul className="space-y-3 list-none pl-0">
                {WHY_DIFFERENT.map((item) => (
                  <li
                    key={item.point}
                    className="flex gap-3 items-start bg-surface-container-low rounded-xl p-4"
                  >
                    <span className="text-2xl flex-shrink-0">{item.icon}</span>
                    <span>
                      <strong className="text-on-surface">{item.point}:</strong>{" "}
                      {item.detail}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* What's included */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              {t(LOCALE, "florida.whatIncludedHeading")}
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8">
              {t(LOCALE, "florida.whatIncludedSub")}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {REPORT_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-base font-headline font-extrabold text-primary mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Sources */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              {t(LOCALE, "florida.sourcesHeading")}
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-6">
              {t(LOCALE, "florida.sourcesIntro")}
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              {SOURCES.map((s) => (
                <li
                  key={s.href}
                  className="rounded-xl border border-outline-variant bg-surface-container-lowest p-4"
                >
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary font-bold underline underline-offset-2"
                  >
                    {s.label} ↗
                  </a>
                  <p className="mt-1.5 text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    {s.note}
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-on-surface-variant italic">
              Los datos VIN de Florida se cruzan contra NMVTIS, NHTSA, NICB y los
              registros del DHSMV en el momento de cada búsqueda. Florida tiene
              aproximadamente 21M de habitantes y un mercado activo de autos
              usados con alto riesgo de fraude por inundación y robo.
            </p>
          </section>

          {/* Bottom CTA */}
          <section className="py-14 sm:py-20 text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-wider mb-4">
              <BadgeCheck className="w-3.5 h-3.5" />
              Gratis · Al instante · Sin registro
            </div>
            <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3">
              {t(LOCALE, "florida.ctaHeading")}
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">
              {t(LOCALE, "florida.ctaSub")}
            </p>
            <div className="max-w-xl mx-auto bg-surface-container-low rounded-2xl p-5 border border-outline-variant">
              <VinSearchForm size="lg" />
            </div>
          </section>
        </div>
      </article>
    </>
  );
}
