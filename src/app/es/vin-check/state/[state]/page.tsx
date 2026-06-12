/**
 * Spanish dynamic state landing page — /es/vin-check/state/<state>.
 *
 * For the 44 non-Big-5 states, this renders the full state-page chrome
 * in Spanish, using the per-state hooks from lib/states-es.ts. The
 * Big-5 (CA/TX/NY/IL/PA) have hand-written static pages in this folder
 * that take precedence over this dynamic file — they keep the dedicated
 * "/es/<state>-revision-vin" slug. Florida is redirected to its
 * dedicated "/es/florida-revision-vin" path.
 *
 * Address-bar UX: this file lives at the English-shape internal route
 * because the proxy doesn't rewrite the non-Big-5 state slugs (no
 * mapping in slugs.ts), so users land here via /es/vin-check/state/<x>
 * directly. That's still better than nothing — buyers searching the
 * Spanish keyword for state DMV history reach a fully-localised page.
 */

import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import {
  Shield,
  FileText,
  AlertTriangle,
  MapPin,
  ArrowRight,
} from "lucide-react";
import VinSearchForm from "@/components/VinSearchForm";
import Breadcrumbs from "@/components/Breadcrumbs";
import { states, getStateBySlug } from "@/lib/states";
import { getStateEsBySlug, getBrandDescriptionEs } from "@/lib/states-es";
import { t } from "@/i18n";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const LOCALE = "es" as const;
const SITE = "https://www.carcheckervin.com";

interface Props {
  params: Promise<{ state: string }>;
}

export async function generateStaticParams() {
  return states.map((s) => ({ state: s.slug }));
}

function fill(template: string, vars: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? `{${k}}`);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state: slug } = await params;
  const state = getStateBySlug(slug);
  if (!state) return { title: "Revisi\u00f3n VIN" };
  const es = getStateEsBySlug(slug);
  const stateNameEs = es?.nameEs ?? state.name;

  const title = `Revisi\u00f3n VIN ${stateNameEs} gratis \u2014 Historial ${state.abbr}`;
  const hook = es?.descriptionHookEs ?? `Detecta marcas salvage, rebuilt e inundaci\u00f3n en ${stateNameEs}.`;
  const description = `${hook} Reporte gratis al instante \u2014 sin registro, sin tarjeta.`;
  const englishPath = `/vin-check/state/${state.slug}`;
  const alt = hreflangAlternatesForLocale(englishPath, LOCALE);

  return {
    title: { absolute: title },
    description,
    keywords: [
      `revisi\u00f3n VIN ${stateNameEs}`,
      `VIN check ${stateNameEs} espa\u00f1ol`,
      `historial vehicular ${stateNameEs}`,
      `salvage ${stateNameEs}`,
      `DMV ${stateNameEs} VIN`,
      `verificar VIN ${state.abbr}`,
    ],
    alternates: { canonical: alt.canonical, languages: alt.languages },
    openGraph: {
      title,
      description,
      url: alt.canonical,
      type: "website",
      locale: "es_US",
      siteName: "CarCheckerVIN",
    },
    twitter: { card: "summary_large_image", title, description },
    robots: { index: true, follow: true },
  };
}

const otherPopularStateSlugs = [
  "california", "texas", "florida", "new-york",
  "illinois", "pennsylvania", "ohio", "georgia",
];

export default async function StatePageEs({ params }: Props) {
  const { state: slug } = await params;

  // Florida has a dedicated Spanish page at /es/florida-revision-vin;
  // redirect rather than render a duplicate.
  if (slug === "florida") {
    redirect("/es/florida-revision-vin");
  }

  const state = getStateBySlug(slug);
  if (!state) notFound();
  const es = getStateEsBySlug(slug);

  const stateNameEs = es?.nameEs ?? state.name;
  const dmvNameEs = es?.dmvNameEs ?? state.dmvName;
  const lemonLawNotes = es?.lemonLawNotesEs ?? state.lemonLawNotes;
  const specialFact = es?.specialFactEs ?? state.specialFact;

  const vars = {
    state: stateNameEs,
    dmv: dmvNameEs,
    population: state.population,
    vehicles: state.vehiclesRegistered,
  };

  const url = `${SITE}/es/vin-check/state/${state.slug}`;

  const otherStates = states
    .filter((s) => s.slug !== state.slug && otherPopularStateSlugs.includes(s.slug))
    .slice(0, 8);

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    inLanguage: "es",
    name: `Revisi\u00f3n VIN de ${stateNameEs}`,
    description: `Revisi\u00f3n VIN gratis y reporte de historial vehicular en ${stateNameEs}. Marcas de t\u00edtulo del ${dmvNameEs} y datos de la Lemon Law.`,
    url,
    isPartOf: { "@type": "WebSite", name: "CarCheckerVIN", url: SITE },
    about: {
      "@type": "Place",
      name: stateNameEs,
      address: {
        "@type": "PostalAddress",
        addressRegion: state.abbr,
        addressCountry: "US",
      },
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/es` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Revisi\u00f3n VIN",
        item: `${SITE}/es/revision-vin`,
      },
      { "@type": "ListItem", position: 3, name: stateNameEs },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "es",
    mainEntity: [
      {
        "@type": "Question",
        name: `\u00bfQu\u00e9 marcas de t\u00edtulo usa ${stateNameEs}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `El ${dmvNameEs} se\u00f1ala veh\u00edculos con marcas como ${state.titleBrands.join(
            ", "
          )}. ${getBrandDescriptionEs(state.titleBrands[0], stateNameEs)}`,
        },
      },
      {
        "@type": "Question",
        name: `\u00bfTiene ${stateNameEs} una Lemon Law?`,
        acceptedAnswer: { "@type": "Answer", text: `S\u00ed. ${lemonLawNotes}` },
      },
      {
        "@type": "Question",
        name: `\u00bfQu\u00e9 tiene de \u00fanico revisar un VIN en ${stateNameEs}?`,
        acceptedAnswer: { "@type": "Answer", text: specialFact },
      },
      {
        "@type": "Question",
        name: `\u00bfLa revisi\u00f3n VIN es gratis para veh\u00edculos de ${stateNameEs}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `S\u00ed. Puedes ejecutar una revisi\u00f3n VIN gratis a cualquier veh\u00edculo registrado en ${stateNameEs} para ver marcas de t\u00edtulo, registros de salvage e inundaci\u00f3n, historial del od\u00f3metro y retiros abiertos antes de comprar \u2014 sin registro ni tarjeta.`,
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Breadcrumbs
              onDark
              items={[
                { label: t(LOCALE, "stateTemplate.breadcrumbHome"), href: "/es" },
                { label: t(LOCALE, "stateTemplate.breadcrumbVinCheck"), href: "/es/revision-vin" },
                { label: t(LOCALE, "stateTemplate.breadcrumbByState"), href: "/es/vin-check/state" },
                { label: stateNameEs },
              ]}
            />
          </div>
          <div className="flex items-center gap-2 mb-3 text-primary-100">
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-medium">{stateNameEs} ({state.abbr})</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            {stateNameEs} {t(LOCALE, "stateTemplate.heroHeadlineSuffix")}
          </h1>
          <p className="text-lg text-primary-100 max-w-2xl leading-relaxed mb-8">
            {fill(t(LOCALE, "stateTemplate.heroSubTemplate"), vars)}
          </p>
          <div className="max-w-xl">
            <VinSearchForm size="lg" onDark />
          </div>
        </div>
      </section>

      {/* Why a VIN Check */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            {fill(t(LOCALE, "stateTemplate.whyHeading"), vars)}
          </h2>
          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
            <p>{fill(t(LOCALE, "stateTemplate.whyP1Template"), vars)}</p>
            <p>{fill(t(LOCALE, "stateTemplate.whyP2"), vars)}</p>
            <p>{fill(t(LOCALE, "stateTemplate.whyP3"), vars)}</p>
          </div>
        </div>
      </section>

      {/* Title Brands */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            {fill(t(LOCALE, "stateTemplate.brandsHeading"), vars)}
          </h2>
          <p className="text-slate-700 mb-8">
            {fill(t(LOCALE, "stateTemplate.brandsSubTemplate"), vars)}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {state.titleBrands.map((brand) => (
              <div key={brand} className="flex items-start gap-3 p-5 bg-white rounded-xl border border-slate-200">
                <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{brand}</h3>
                  <p className="text-sm text-slate-700 mt-0.5">
                    {getBrandDescriptionEs(brand, stateNameEs)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lemon Law */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            {fill(t(LOCALE, "stateTemplate.lemonLawHeading"), vars)}
          </h2>
          <div className="flex items-start gap-4 p-6 bg-amber-50 border border-amber-200 rounded-xl mb-6">
            <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-slate-700 leading-relaxed">{lemonLawNotes}</p>
          </div>
          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
            <p>{specialFact}</p>
          </div>
        </div>
      </section>

      {/* Sources */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">
            {t(LOCALE, "stateTemplate.sourcesHeading")}
          </h2>
          <p className="text-slate-600 mb-6 leading-relaxed">
            {fill(t(LOCALE, "stateTemplate.sourcesIntro"), vars)}
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            {[
              { href: "https://vehiclehistory.bja.ojp.gov/", label: "NMVTIS \u2014 Bureau of Justice Assistance", note: `Sistema federal de informaci\u00f3n de t\u00edtulos de veh\u00edculos para los 50 estados.` },
              { href: "https://www.nhtsa.gov/recalls", label: "NHTSA \u2014 Retiros de seguridad", note: `Base autorizada de retiros activos para cualquier VIN de EE. UU.` },
              { href: "https://www.nicb.org/vincheck", label: "NICB VINCheck", note: `Reportes gratuitos de robos y salvage de aseguradoras de EE. UU.` },
              { href: "https://www.iihs.org/", label: "IIHS \u2014 Calificaciones de seguridad", note: `Investigaci\u00f3n independiente sobre seguridad y robos de autos.` },
            ].map((s) => (
              <li key={s.href} className="rounded-xl border border-slate-200 bg-white p-4">
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-primary-600 font-semibold underline underline-offset-2 hover:text-primary-700"
                >
                  {s.label} ↗
                </a>
                <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">{s.note}</p>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs text-slate-500 italic">
            {fill(t(LOCALE, "stateTemplate.sourcesFootnote"), vars)}
          </p>
        </div>
      </section>

      {/* Other Popular States */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Otros estados populares
          </h2>
          <div className="flex flex-wrap gap-2">
            {otherStates.map((s) => {
              const sEs = getStateEsBySlug(s.slug);
              return (
                <Link
                  key={s.slug}
                  href={`/es/vin-check/state/${s.slug}`}
                  className="px-4 py-2 bg-slate-50 text-slate-700 text-sm rounded-xl border border-slate-200 hover:border-primary-300 hover:bg-primary-50/30 hover:text-primary-700 transition-all font-medium"
                >
                  {sEs?.nameEs ?? s.name}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-primary-600 text-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-wider mb-4">
            <Shield className="w-3.5 h-3.5" />
            {t(LOCALE, "stateTemplate.badgeFree")}
          </div>
          <h2 className="text-2xl font-bold mb-3">
            {fill(t(LOCALE, "stateTemplate.ctaHeading"), vars)}
          </h2>
          <p className="text-primary-100 mb-6">
            {t(LOCALE, "stateTemplate.ctaSub")}
          </p>
          <VinSearchForm size="sm" />
          <Link
            href="/es/vin-check/state"
            className="inline-flex items-center gap-1.5 mt-6 text-white/80 text-sm hover:text-white transition-colors"
          >
            Ver todos los estados <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
