/**
 * Spanish make landing page — /es/revision-vin/<make>.
 *
 * The proxy rewrites the address-bar URL "/es/revision-vin/<make>" back
 * to the internal Next route "/es/vin-check/<make>" (per slugs.ts), so
 * this file lives at the English-shape path even though buyers see the
 * native-language slug.
 *
 * Content sources:
 *   - Brand-neutral chrome (headings, FAQs, steps): make.* in es.ts
 *   - Per-make Spanish prose: makesEs from lib/makes-es.ts
 *   - Shared structural data (slug, name, vinPrefix, popular[]): makes
 *     from lib/makes.ts — these are facts, not language.
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Shield,
  Search,
  FileText,
  Clock,
  CheckCircle,
  ArrowRight,
  ScanLine,
  Wrench,
  ShieldAlert,
  Lightbulb,
} from "lucide-react";
import { makes, getMakeBySlug } from "@/lib/makes";
import { getMakeEsBySlug } from "@/lib/makes-es";
import VinSearchForm from "@/components/VinSearchForm";
import Breadcrumbs from "@/components/Breadcrumbs";
import { t, type TranslationKey } from "@/i18n";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const LOCALE = "es" as const;
const SITE = "https://www.carcheckervin.com";

interface Props {
  params: Promise<{ make: string }>;
}

export async function generateStaticParams() {
  return makes.map((m) => ({ make: m.slug }));
}

/** {placeholder} substitution for templated strings in the dictionary. */
function fill(template: string, vars: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? `{${k}}`);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { make: slug } = await params;
  const make = getMakeBySlug(slug);
  if (!make) return { title: "Revisi\u00f3n VIN" };

  const title = `Revisi\u00f3n VIN ${make.name} gratis \u2014 Decodificador e historial`;
  const description = `Revisi\u00f3n VIN ${make.name} y decodificador gratis. Decodifica cualquier VIN ${make.name} para especificaciones, fotos, valor de mercado, retiros e historial completo del veh\u00edculo \u2014 sin registro, sin tarjeta.`;
  const englishPath = `/vin-check/${make.slug}`;
  const alt = hreflangAlternatesForLocale(englishPath, LOCALE);

  return {
    title: { absolute: title },
    description,
    keywords: [
      `revisi\u00f3n VIN ${make.name}`,
      `decodificador VIN ${make.name}`,
      `VIN check ${make.name} espa\u00f1ol`,
      `historial vehicular ${make.name}`,
      `${make.name} VIN gratis`,
      `retiros ${make.name} por VIN`,
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

const featureKeys: ReadonlyArray<{
  icon: typeof Search;
  titleKey: TranslationKey;
  descKey: TranslationKey;
}> = [
  { icon: Search, titleKey: "make.feature1Title", descKey: "make.feature1Desc" },
  { icon: FileText, titleKey: "make.feature2Title", descKey: "make.feature2Desc" },
  { icon: Shield, titleKey: "make.feature3Title", descKey: "make.feature3Desc" },
  { icon: Clock, titleKey: "make.feature4Title", descKey: "make.feature4Desc" },
];

export default async function MakePageEs({ params }: Props) {
  const { make: slug } = await params;
  const make = getMakeBySlug(slug);
  if (!make) notFound();
  const es = getMakeEsBySlug(slug);

  // If the make hasn't been translated yet, fall back to the English
  // long-form fields so we never render an empty section — the chrome
  // is already Spanish so the page is still mostly Spanish.
  const description = es?.descriptionEs ?? make.description;
  const country = es?.countryEs ?? make.country;
  const vinNote = es?.vinNoteEs ?? make.vinNote;
  const commonIssues = es?.commonIssuesEs ?? make.commonIssues;
  const recallContext = es?.recallContextEs ?? make.recallContext;
  const buyingTip = es?.buyingTipEs ?? make.buyingTip;

  const vars = {
    make: make.name,
    description,
    // Trim trailing "." from the country string before interpolating —
    // "EE. UU." already carries a final period that, when followed by
    // the template's own ". ", would render as "EE. UU..".
    country: country.replace(/\.$/, ""),
    founded: make.founded,
    vinPrefix: make.vinPrefix,
    model1: make.popular[0],
    model2: make.popular[1] ?? make.popular[0],
    model3: make.popular[2] ?? make.popular[0],
  };

  const url = `${SITE}/es/revision-vin/${make.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    inLanguage: "es",
    name: `Revisi\u00f3n VIN y decodificador ${make.name}`,
    description: `Revisi\u00f3n VIN ${make.name} gratis. Decodifica cualquier VIN ${make.name} para historial completo del veh\u00edculo, especificaciones y valores de mercado.`,
    url,
    isPartOf: {
      "@type": "WebSite",
      name: "CarCheckerVIN",
      url: SITE,
    },
    author: ORG_AUTHOR,
  };

  const serviceRatingLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: `Revisi\u00f3n VIN ${make.name}`,
    provider: {
      "@type": "Organization",
      name: "CarCheckerVIN",
      url: SITE,
    },
    areaServed: { "@type": "Country", name: "United States" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      bestRating: "5",
      worstRating: "1",
      ratingCount: "89",
    },
  };

  const faqs = [
    {
      q: `\u00bfLa revisi\u00f3n VIN de ${make.name} es gratis?`,
      a: `S\u00ed. Nuestra revisi\u00f3n VIN de ${make.name} es completamente gratis. Ingresa el VIN de 17 caracteres arriba para decodificar las especificaciones y obtener el historial disponible \u2014 sin cuenta ni pago.`,
    },
    {
      q: `\u00bfC\u00f3mo busco el n\u00famero VIN de un ${make.name}?`,
      a: `Encuentra el VIN de 17 caracteres en el tablero del lado del conductor, la calcoman\u00eda del marco de la puerta o el t\u00edtulo, luego escr\u00edbelo o p\u00e9galo en el cuadro de b\u00fasqueda arriba. Nuestra b\u00fasqueda VIN ${make.name} devuelve especificaciones, equipamiento de f\u00e1brica, valor de mercado e historial en segundos.`,
    },
    {
      q: `\u00bfQu\u00e9 me dice un decodificador VIN de ${make.name}?`,
      a: `Decodificar un VIN ${make.name} revela el a\u00f1o del modelo, motor, trim, estilo de carrocer\u00eda y planta de ensamblaje, m\u00e1s equipamiento instalado de f\u00e1brica. Combinado con datos de historial tambi\u00e9n muestra marcas de t\u00edtulo, lecturas del od\u00f3metro y retiros abiertos.`,
    },
    {
      q: `\u00bfPuedo revisar retiros abiertos de ${make.name} por VIN?`,
      a: `S\u00ed. Las campa\u00f1as de retiro de ${make.name} est\u00e1n ligadas al VIN, as\u00ed que una revisi\u00f3n muestra los retiros de seguridad que aplican a ese veh\u00edculo espec\u00edfico y si la reparaci\u00f3n fue completada.`,
    },
    {
      q: `\u00bfC\u00f3mo s\u00e9 si un ${make.name} usado tuvo accidente?`,
      a: `Ejecuta el VIN arriba. Un reporte de historial de ${make.name} se\u00f1ala accidentes reportados, marcas de t\u00edtulo salvage o reconstruido, y discrepancias del od\u00f3metro registradas en bases de datos nacionales \u2014 los registros que un vendedor puede no divulgar.`,
    },
    {
      q: `\u00bfPuedo revisar si un ${make.name} es robado o tiene t\u00edtulo salvage?`,
      a: `Un reporte de historial VIN muestra registros reportados de salvage, robo y p\u00e9rdida total donde aparezcan en bases de datos nacionales. Como modelos como el ${make.name} ${make.popular[0]} son blancos comunes de robo, tambi\u00e9n coteja el VIN del tablero con el del marco de la puerta y el t\u00edtulo antes de comprar.`,
    },
  ];

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "es",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceRatingLd) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Breadcrumbs
              onDark
              items={[
                { label: t(LOCALE, "make.breadcrumbHome"), href: "/es" },
                { label: t(LOCALE, "make.breadcrumbVinCheck"), href: "/es/revision-vin" },
                { label: make.name },
              ]}
            />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            {make.name} {t(LOCALE, "make.heroHeadlineSuffix")}
          </h1>
          <p className="text-lg text-primary-100 max-w-2xl leading-relaxed mb-8">
            {fill(t(LOCALE, "make.heroSubTemplate"), vars)}
          </p>
          <div className="max-w-xl">
            <VinSearchForm size="lg" onDark />
          </div>
        </div>
      </section>

      {/* About Make */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            {fill(t(LOCALE, "make.aboutHeading"), vars)}
          </h2>
          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
            <p>{fill(t(LOCALE, "make.aboutP1Template"), vars)}</p>
            <p>{fill(t(LOCALE, "make.aboutP2Template"), vars)}</p>
            <p>{fill(t(LOCALE, "make.aboutP3Template"), vars)}</p>
          </div>
        </div>
      </section>

      {/* Make-Specific VIN & History Notes */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            {fill(t(LOCALE, "make.whatToCheckHeading"), vars)}
          </h2>
          <p className="text-slate-700 mb-8">
            {fill(t(LOCALE, "make.whatToCheckSub"), vars)}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: ScanLine, title: fill(t(LOCALE, "make.cardDecoding"), vars), body: vinNote },
              { icon: Wrench, title: fill(t(LOCALE, "make.cardCommonIssues"), vars), body: commonIssues },
              { icon: ShieldAlert, title: fill(t(LOCALE, "make.cardRecallHistory"), vars), body: recallContext },
              { icon: Lightbulb, title: fill(t(LOCALE, "make.cardBuyingTip"), vars), body: buyingTip },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="p-6 bg-white rounded-xl border border-slate-200">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-slate-900">{title}</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            {fill(t(LOCALE, "make.reportIncludedHeading"), vars)}
          </h2>
          <p className="text-slate-700 mb-8">
            {fill(t(LOCALE, "make.reportIncludedSub"), vars)}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {featureKeys.map(({ icon: Icon, titleKey, descKey }) => (
              <div key={titleKey} className="flex items-start gap-3 p-5 bg-white rounded-xl border border-slate-200">
                <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{t(LOCALE, titleKey)}</h3>
                  <p className="text-sm text-slate-700 mt-0.5">{t(LOCALE, descKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Models */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            {fill(t(LOCALE, "make.popularHeading"), vars)}
          </h2>
          <p className="text-slate-700 mb-8">
            {fill(t(LOCALE, "make.popularSub"), vars)}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {make.popular.map((model) => (
              <div
                key={model}
                className="flex items-center gap-2 p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-primary-300 hover:bg-primary-50/30 transition-all"
              >
                <CheckCircle className="w-4 h-4 text-primary-600 flex-shrink-0" />
                <span className="text-sm font-medium text-slate-700">{make.name} {model}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How To */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">
            {fill(t(LOCALE, "make.howToHeading"), vars)}
          </h2>
          <div className="space-y-4">
            {([
              { step: "1", titleKey: "make.step1Title", descKey: "make.step1Desc" },
              { step: "2", titleKey: "make.step2Title", descKey: "make.step2Desc" },
              { step: "3", titleKey: "make.step3Title", descKey: "make.step3Desc" },
            ] as ReadonlyArray<{ step: string; titleKey: TranslationKey; descKey: TranslationKey }>).map(({ step, titleKey, descKey }) => (
              <div key={step} className="flex items-start gap-4 p-5 bg-white rounded-xl border border-slate-200">
                <div className="w-8 h-8 rounded-lg bg-primary-600 text-white flex items-center justify-center flex-shrink-0 text-sm font-bold">{step}</div>
                <div>
                  <h3 className="font-semibold text-slate-900">{fill(t(LOCALE, titleKey), vars)}</h3>
                  <p className="text-sm text-slate-700 mt-1">{fill(t(LOCALE, descKey), vars)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Makes */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            {t(LOCALE, "make.otherBrandsHeading")}
          </h2>
          <div className="flex flex-wrap gap-2">
            {makes.filter((m) => m.slug !== make.slug).slice(0, 20).map((m) => (
              <Link
                key={m.slug}
                href={`/es/revision-vin/${m.slug}`}
                className="px-4 py-2 bg-slate-50 text-slate-700 text-sm rounded-xl border border-slate-200 hover:border-primary-300 hover:bg-primary-50/30 hover:text-primary-700 transition-all font-medium"
              >
                {m.name}
              </Link>
            ))}
          </div>
          <Link
            href="/es/revision-vin"
            className="inline-flex items-center gap-1.5 mt-6 text-primary-600 font-medium text-sm hover:text-primary-700 transition-colors"
          >
            {t(LOCALE, "make.otherBrandsCta")} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Sources */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">
            {fill(t(LOCALE, "make.sourcesHeading"), vars)}
          </h2>
          <p className="text-slate-600 mb-6 leading-relaxed">
            {fill(t(LOCALE, "make.sourcesIntro"), vars)}
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            {[
              {
                href: "https://vehiclehistory.bja.ojp.gov/",
                label: "NMVTIS \u2014 Bureau of Justice Assistance",
                note: `Base federal que registra cada marca de t\u00edtulo de ${make.name} en los 50 estados.`,
              },
              {
                href: "https://www.nhtsa.gov/recalls",
                label: "NHTSA \u2014 Retiros de seguridad",
                note: `B\u00fasqueda autorizada de retiros de ${make.name} por VIN.`,
              },
              {
                href: "https://www.nicb.org/vincheck",
                label: "NICB VINCheck",
                note: `Registros de robo y salvage \u2014 el ${make.name} ${make.popular[0]} es un blanco conocido de robo.`,
              },
              {
                href: "https://www.iihs.org/",
                label: "IIHS \u2014 Calificaciones de seguridad",
                note: `Resultados independientes de pruebas de choque para todos los modelos modernos de ${make.name}.`,
              },
              {
                href: "https://vpic.nhtsa.dot.gov/decoder/",
                label: "Decodificador VIN de NHTSA",
                note: `Decodificador federal de referencia para la estructura del VIN de ${make.name} (WMI ${make.vinPrefix}).`,
              },
              {
                href: "https://www.fueleconomy.gov/",
                label: "EPA FuelEconomy.gov",
                note: `Datos oficiales de econom\u00eda de combustible y emisiones de ${make.name} por a\u00f1o de modelo.`,
              },
            ].map((s) => (
              <li key={s.href} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
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
            {fill(t(LOCALE, "make.sourcesFootnote"), vars)}
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">
            {fill(t(LOCALE, "make.faqHeading"), vars)}
          </h2>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-xl border border-slate-200 bg-white p-5 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                  <span className="font-semibold text-slate-900 pr-2">{f.q}</span>
                  <span className="flex-shrink-0 mt-0.5 text-primary-600 text-xl font-light group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="text-sm text-slate-600 leading-relaxed mt-3">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-primary-600 text-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-3">{fill(t(LOCALE, "make.ctaHeading"), vars)}</h2>
          <p className="text-primary-100 mb-6">{t(LOCALE, "make.ctaSub")}</p>
          <VinSearchForm size="sm" />
        </div>
      </section>
    </>
  );
}
