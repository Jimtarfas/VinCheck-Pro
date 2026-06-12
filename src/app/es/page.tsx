/**
 * Spanish homepage — /es.
 *
 * Mirrors the English homepage section-by-section so Spanish-speaking
 * visitors land on a complete page, not a stub. The English homepage
 * uses a dozen client components hard-coded with English copy; rather
 * than refactor each component to accept a locale prop, this file
 * builds the equivalent layout inline using Spanish copy. Every public
 * string is here so a reviewer can audit translations in one place.
 *
 * Sections rendered (matching English page.tsx):
 *   1. Hero with VinSearchForm
 *   2. Trust bar (NMVTIS / NICB / NHTSA)
 *   3. How it works (3 steps)
 *   4. What's in the report (features grid)
 *   5. Why CarCheckerVIN (value props)
 *   6. Pricing teaser → /es/precios
 *   7. Reviews (Trustpilot)
 *   8. FAQ
 *   9. CTA with search form
 */

import type { Metadata } from "next";
import Link from "next/link";
import {
  Search,
  ShieldCheck,
  Clock,
  BadgeCheck,
  FileText,
  AlertCircle,
  Shield,
  Car,
  MapPin,
  CheckCircle,
  Zap,
  Award,
  Lock,
  ArrowRight,
  Star,
} from "lucide-react";
import { t } from "@/i18n";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import VinSearchForm from "@/components/VinSearchForm";

const LOCALE = "es" as const;
const ENGLISH_PATH = "/" as const;
const SITE = "https://www.carcheckervin.com";

export async function generateMetadata(): Promise<Metadata> {
  const alt = hreflangAlternatesForLocale(ENGLISH_PATH, LOCALE);
  return {
    title: t(LOCALE, "home.metaTitle"),
    description: t(LOCALE, "home.metaDescription"),
    alternates: { canonical: alt.canonical, languages: alt.languages },
    openGraph: {
      title: t(LOCALE, "home.metaTitle"),
      description: t(LOCALE, "home.metaDescription"),
      url: alt.canonical,
      type: "website",
      locale: "es_US",
      siteName: "CarCheckerVIN",
    },
    twitter: {
      card: "summary_large_image",
      title: t(LOCALE, "home.metaTitle"),
      description: t(LOCALE, "home.metaDescription"),
    },
  };
}

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE}/es/#website`,
  name: "CarCheckerVIN",
  url: `${SITE}/es/`,
  inLanguage: "es",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE}/es/?vin={vin}`,
    },
    "query-input": "required name=vin",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${SITE}/es/#faqpage`,
  inLanguage: "es",
  mainEntity: [
    {
      "@type": "Question",
      name: "\u00bfQu\u00e9 es un VIN y d\u00f3nde lo encuentro?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "El N\u00famero de Identificaci\u00f3n Vehicular (VIN) es un c\u00f3digo \u00fanico de 17 caracteres asignado a cada veh\u00edculo motorizado. Lo encuentras en el tablero del lado del conductor (visible por el parabrisas), la calcoman\u00eda del marco de la puerta del conductor, tu registraci\u00f3n del veh\u00edculo o documentos del seguro.",
      },
    },
    {
      "@type": "Question",
      name: "\u00bfQu\u00e9 informaci\u00f3n incluye un reporte de revisi\u00f3n VIN?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nuestros reportes incluyen especificaciones completas del veh\u00edculo (motor, transmisi\u00f3n, tren motriz), equipamiento instalado de f\u00e1brica, estimaciones de valor de mercado, informaci\u00f3n de retiros, fotos reales del veh\u00edculo y datos t\u00e9cnicos detallados de NMVTIS y bases de datos del fabricante.",
      },
    },
    {
      "@type": "Question",
      name: "\u00bfQu\u00e9 tan r\u00e1pido recibir\u00e9 mi reporte VIN?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Los reportes VIN se generan al instante \u2014 normalmente en menos de 60 segundos. Una vez decodificado tu VIN, ver\u00e1s el historial completo del veh\u00edculo de inmediato en pantalla.",
      },
    },
    {
      "@type": "Question",
      name: "\u00bfQu\u00e9 veh\u00edculos cubre tu decodificador VIN?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Cubrimos veh\u00edculos fabricados desde 1981 (cuando se adopt\u00f3 el est\u00e1ndar VIN de 17 caracteres). Esto incluye autos, camionetas, SUVs y vans de todos los fabricantes principales como Toyota, Ford, Honda, Chevrolet, BMW, Mercedes-Benz y m\u00e1s.",
      },
    },
    {
      "@type": "Question",
      name: "\u00bfUna revisi\u00f3n VIN es \u00fatil tambi\u00e9n para vendedores?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Por supuesto. Los vendedores usan reportes VIN para documentar la condici\u00f3n del veh\u00edculo, generar confianza en el comprador y justificar el precio pedido. Un reporte limpio te ayuda a vender m\u00e1s r\u00e1pido y a mejor precio.",
      },
    },
    {
      "@type": "Question",
      name: "\u00bfPuede una revisi\u00f3n VIN decirme si un auto fue robado?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "S\u00ed. Nuestros reportes cruzan el VIN contra la base de datos del National Insurance Crime Bureau (NICB). Si un veh\u00edculo est\u00e1 reportado como robado y no ha sido recuperado \u2014 o fue recuperado como p\u00e9rdida total salvage \u2014 el reporte lo se\u00f1alar\u00e1.",
      },
    },
    {
      "@type": "Question",
      name: "\u00bfMostrar\u00e1 la revisi\u00f3n VIN reversi\u00f3n del od\u00f3metro?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Los reportes premium muestran todas las lecturas de kilometraje reportadas en inspecciones, transferencias de t\u00edtulo y registros de servicio. Las inconsistencias en la l\u00ednea de tiempo son un fuerte indicador de fraude de od\u00f3metro, que cuesta a los consumidores estadounidenses m\u00e1s de mil millones de d\u00f3lares al a\u00f1o.",
      },
    },
    {
      "@type": "Question",
      name: "\u00bfNecesito una cuenta para ejecutar una revisi\u00f3n VIN?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No se requiere cuenta para decodificar un VIN gratis. Solo necesitas una cuenta si quieres guardar reportes en tu panel, configurar listas de vigilancia de veh\u00edculos o ejecutar reportes en lote.",
      },
    },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  inLanguage: "es",
  name: "C\u00f3mo revisar un n\u00famero VIN en l\u00ednea",
  description:
    "Aprende a decodificar cualquier N\u00famero de Identificaci\u00f3n Vehicular (VIN) para obtener un reporte completo del historial del veh\u00edculo en menos de 60 segundos.",
  step: [
    {
      "@type": "HowToStep",
      name: "Encuentra tu VIN",
      text: "Localiza el VIN de 17 caracteres en el tablero del veh\u00edculo, la calcoman\u00eda del marco de la puerta del conductor, la registraci\u00f3n o los documentos del seguro.",
    },
    {
      "@type": "HowToStep",
      name: "Ingresa el VIN",
      text: "Ingresa el VIN de 17 caracteres en el cuadro de b\u00fasqueda en nuestro sitio.",
    },
    {
      "@type": "HowToStep",
      name: "Recibe tu reporte",
      text: "Visualiza tu reporte completo del veh\u00edculo al instante, incluyendo especificaciones, fotos, valores de mercado, listas de equipamiento e historial.",
    },
  ],
};

const REPORT_ITEMS = [
  {
    icon: FileText,
    title: "Historial de t\u00edtulos",
    desc:
      "Cada t\u00edtulo emitido en los 50 estados, incluidas marcas, acreedores y transferencias de propiedad.",
  },
  {
    icon: AlertCircle,
    title: "Registros de accidentes",
    desc: "Datos de colisiones de aseguradoras, talleres y reportes del DMV estatal.",
  },
  {
    icon: Search,
    title: "Lecturas del od\u00f3metro",
    desc: "Kilometraje de cada tr\u00e1mite del DMV, inspecci\u00f3n y evento de seguro.",
  },
  {
    icon: Shield,
    title: "Registros de robo",
    desc: "Referencia cruzada a la base de datos de veh\u00edculos robados de la NICB.",
  },
  {
    icon: Car,
    title: "Retiros de seguridad",
    desc: "Todos los retiros activos de la NHTSA para ese VIN espec\u00edfico.",
  },
  {
    icon: MapPin,
    title: "Da\u00f1o por inundaci\u00f3n y clima",
    desc: "Marcas por inundaci\u00f3n, granizo y eventos meteorol\u00f3gicos registrados a nivel federal.",
  },
];

const WHY_BULLETS = [
  {
    icon: Zap,
    title: "Resultados al instante",
    desc: "Decodificaci\u00f3n VIN en menos de 60 segundos \u2014 sin esperas, sin formularios largos.",
  },
  {
    icon: Award,
    title: "Datos de fuentes oficiales",
    desc: "Cruce de informaci\u00f3n contra NMVTIS, NICB, NHTSA y 30+ proveedores autorizados.",
  },
  {
    icon: Lock,
    title: "Sin registro ni tarjeta",
    desc: "La revisi\u00f3n VIN b\u00e1sica es gratis para siempre \u2014 sin cuenta ni tarjeta de cr\u00e9dito.",
  },
  {
    icon: CheckCircle,
    title: "Cobertura de los 50 estados",
    desc: "Marcas de t\u00edtulo, accidentes y retiros desde Florida hasta Alaska y todos los estados intermedios.",
  },
];

const REVIEWS = [
  {
    name: "Carmen Liam",
    rating: 5,
    body:
      "El reporte fue tan bueno, el sitio fluido. Compar\u00e9 mi reporte con el del concesionario y obtuve la misma informaci\u00f3n \u2014 todo estuvo perfecto.",
  },
  {
    name: "Adams Daniel Brook",
    rating: 5,
    body:
      "Estaba buscando un SUV usado y cuando encontr\u00e9 este sitio en Google revis\u00e9 el VIN con su herramienta gratis. Todo bien, gracias.",
  },
  {
    name: "David Franz Friedhof",
    rating: 5,
    body:
      "Me salv\u00f3 de comprar un auto con da\u00f1o oculto por inundaci\u00f3n. El reporte mostr\u00f3 todo lo necesario. Gracias CarCheckerVIN.",
  },
];

const FAQS_DISPLAY = faqSchema.mainEntity.map((q) => ({
  q: q.name,
  a: q.acceptedAnswer.text,
}));

export default function SpanishHomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <main
        className="relative pt-20 pb-12 sm:pt-24 sm:pb-16 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #f7f9fc 0%, #eceef1 100%)" }}
      >
        <div
          className="absolute top-0 right-0 w-[32rem] h-[32rem] rounded-full opacity-30 -translate-y-1/2 translate-x-1/3 pointer-events-none"
          style={{
            background: "radial-gradient(circle, #003178 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-20 translate-y-1/2 -translate-x-1/3 pointer-events-none"
          style={{
            background: "radial-gradient(circle, #ff9800 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-primary/8 border border-primary/10 text-xs sm:text-sm font-semibold text-primary mb-5">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            {t(LOCALE, "home.heroEyebrow")}
          </span>
          <h1 className="font-headline font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-tight tracking-tighter text-primary mb-4 sm:mb-5">
            {t(LOCALE, "home.heroHeadline")}
          </h1>
          <p className="text-base sm:text-lg text-on-surface-variant font-medium max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
            {t(LOCALE, "home.heroSub")}
          </p>

          {/* Real VIN search form, not a dummy CTA button. */}
          <div className="max-w-xl mx-auto">
            <VinSearchForm size="lg" />
          </div>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto">
            {[
              { value: "50K+", label: t(LOCALE, "home.stats.reports") },
              { value: "4.9", label: t(LOCALE, "home.stats.rating") },
              { value: "<60s", label: t(LOCALE, "home.stats.speed") },
              { value: "40+", label: t(LOCALE, "home.stats.dataPoints") },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-xl sm:text-2xl font-headline font-black text-primary leading-none mb-1">
                  {value}
                </p>
                <p className="text-[10px] sm:text-xs text-on-surface-variant font-medium uppercase tracking-wider">
                  {label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-6 border-t border-slate-200/60 flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-[0.18em]">
              {t(LOCALE, "home.trustedSources")}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-slate-600">
              <ShieldCheck className="w-3.5 h-3.5" />
              NMVTIS
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-slate-600">
              <BadgeCheck className="w-3.5 h-3.5" />
              NICB
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-slate-600">
              <Clock className="w-3.5 h-3.5" />
              NHTSA
            </span>
          </div>
        </div>
      </main>

      {/* ── How it works ─────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-headline font-extrabold text-primary mb-3">
              {t(LOCALE, "home.sections.howItWorksHeading")}
            </h2>
            <p className="text-base text-on-surface-variant max-w-2xl mx-auto">
              {t(LOCALE, "home.sections.howItWorksSub")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "1",
                title: t(LOCALE, "home.sections.step1Title"),
                body: t(LOCALE, "home.sections.step1Body"),
              },
              {
                step: "2",
                title: t(LOCALE, "home.sections.step2Title"),
                body: t(LOCALE, "home.sections.step2Body"),
              },
              {
                step: "3",
                title: t(LOCALE, "home.sections.step3Title"),
                body: t(LOCALE, "home.sections.step3Body"),
              },
            ].map(({ step, title, body }) => (
              <div
                key={step}
                className="relative p-6 bg-surface-container-lowest rounded-2xl border border-outline-variant"
              >
                <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-lg mb-4">
                  {step}
                </div>
                <h3 className="font-headline font-extrabold text-lg text-primary mb-2">
                  {title}
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What's in the report ────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-surface-container-low">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-headline font-extrabold text-primary mb-3">
              {t(LOCALE, "home.sections.reportIncludesHeading")}
            </h2>
            <p className="text-base text-on-surface-variant max-w-2xl mx-auto">
              Cobertura completa de cada dato que importa antes de comprar.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {REPORT_ITEMS.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="p-5 bg-white rounded-2xl border border-outline-variant"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-headline font-extrabold text-base text-primary mb-1.5">
                  {title}
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why CarCheckerVIN ─────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-headline font-extrabold text-primary mb-3">
              {t(LOCALE, "home.sections.featuresHeading")}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {WHY_BULLETS.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="flex items-start gap-4 p-5 bg-surface-container-lowest rounded-2xl border border-outline-variant"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-headline font-extrabold text-base text-primary mb-1">
                    {title}
                  </h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing teaser ───────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-surface-container-low">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-headline font-extrabold text-primary mb-3">
            Precios simples y transparentes
          </h2>
          <p className="text-base text-on-surface-variant mb-8">
            Decodificación VIN básica gratis para siempre. Reportes premium completos
            por una tarifa única — sin suscripciones, sin cargos ocultos.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/es/precios"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary text-white font-bold text-base shadow-lg shadow-primary/20 hover:bg-primary-700 transition"
            >
              Ver precios <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/es/revision-vin"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border border-primary/20 text-primary font-bold text-base hover:bg-primary/5 transition"
            >
              Revisión VIN gratis
            </Link>
          </div>
        </div>
      </section>

      {/* ── Reviews ──────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-headline font-extrabold text-primary mb-3">
              {t(LOCALE, "home.sections.reviewsHeading")}
            </h2>
            <div className="inline-flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
              <span className="ml-2 text-sm font-bold text-on-surface">
                4.9 · Trustpilot
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {REVIEWS.map((r) => (
              <div
                key={r.name}
                className="p-5 bg-surface-container-lowest rounded-2xl border border-outline-variant"
              >
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed mb-3 italic">
                  &ldquo;{r.body}&rdquo;
                </p>
                <p className="text-xs font-bold text-on-surface">{r.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-surface-container-low">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-headline font-extrabold text-primary text-center mb-10">
            {t(LOCALE, "home.sections.faqHeading")}
          </h2>
          <div className="space-y-3">
            {FAQS_DISPLAY.map((f) => (
              <details
                key={f.q}
                className="group rounded-2xl border border-outline-variant bg-white p-5 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                  <span className="faq-question font-bold text-on-surface pr-2">
                    {f.q}
                  </span>
                  <span className="flex-shrink-0 mt-0.5 text-primary text-xl font-light group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="faq-answer text-sm text-on-surface-variant leading-relaxed mt-3">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-primary text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-headline font-extrabold mb-3">
            {t(LOCALE, "home.sections.ctaHeading")}
          </h2>
          <p className="text-base text-white/85 mb-8">
            {t(LOCALE, "home.sections.ctaSub")}
          </p>
          <div className="max-w-xl mx-auto bg-white rounded-2xl p-5 shadow-xl">
            <VinSearchForm size="lg" />
          </div>
        </div>
      </section>
    </>
  );
}
