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
  Bot,
  Radar,
  BookOpen,
  Compass,
  Trophy,
  Sparkles,
  Check,
  X,
  TrendingUp,
  Users,
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

      {/* ── Trust bar (full-width stats on primary) ──────────────── */}
      <section className="bg-primary-container py-10 sm:py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {[
            { value: "50K+", label: "Reportes descargados" },
            { value: "4.9", label: "Calificación promedio" },
            { value: "<60s", label: "Tiempo promedio de entrega" },
            { value: "24/7", label: "Datos disponibles" },
          ].map(({ value, label }, i) => (
            <div
              key={label}
              className={`text-center text-white ${i > 0 ? "md:border-l md:border-white/10" : ""} ${i === 2 ? "md:border-l" : ""} ${i % 2 === 1 ? "border-l border-white/10 md:border-l" : ""}`}
            >
              <p className="text-3xl sm:text-4xl font-headline font-black mb-1">{value}</p>
              <p className="text-[11px] sm:text-sm text-white/85 uppercase tracking-widest font-semibold">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

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

      {/* ── AI Features ──────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-xs sm:text-sm font-black text-primary uppercase tracking-[0.2em] mb-3 sm:mb-4 block">
            Impulsado por IA avanzada
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-extrabold text-primary mb-5 sm:mb-6 leading-tight">
            No solo leas datos.
            <br className="hidden sm:block" />{" "}
            <span className="text-on-surface">Deja que la IA los entienda por ti.</span>
          </h2>
          <p className="text-base sm:text-lg text-on-surface-variant max-w-2xl mx-auto mb-12 sm:mb-20 px-2">
            Somos el primer proveedor de historial vehicular en integrar arquitectura
            de IA avanzada directamente en cada reporte — convirtiendo datos VIN
            crudos en respuestas claras, historias y advertencias que puedes usar.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {[
              {
                icon: Bot,
                title: "Asistente VIN con IA",
                desc:
                  "Haz preguntas en español natural sobre cualquier reporte VIN. Nuestro asistente cruza datos del motor, retiros, valor de mercado y equipamiento para darte una respuesta clara y honesta en segundos.",
                accent: "border-primary",
                iconBg: "bg-primary/10 text-primary",
              },
              {
                icon: Radar,
                title: "Análisis de riesgo con IA",
                desc:
                  "Puntuación automática de severidad de accidentes, anomalías del odómetro, marcas de título y patrones de propiedad — señalados como alertas antes de que abras tu billetera.",
                accent: "border-secondary",
                iconBg: "bg-secondary-container/20 text-secondary",
              },
              {
                icon: BookOpen,
                title: "Narrador de historia con IA",
                desc:
                  "Convierte registros técnicos densos en una biografía legible del auto — cuándo y dónde fue construido, cómo fue equipado y cómo ha sido manejado y servido.",
                accent: "border-green-500",
                iconBg: "bg-green-500/10 text-green-600",
              },
              {
                icon: Compass,
                title: "Buscador de vehículos con IA",
                desc:
                  "Describe el auto que quieres en lenguaje cotidiano. Nuestro buscador compara tus necesidades con anuncios activos, datos MSRP y confiabilidad real para encontrar el VIN correcto.",
                accent: "border-purple-500",
                iconBg: "bg-purple-500/10 text-purple-600",
              },
            ].map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className={`bg-surface-container-low p-6 sm:p-8 rounded-3xl sm:rounded-[2rem] text-left border-t-4 ${card.accent} shadow-sm hover:shadow-md transition-shadow`}
                >
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl ${card.iconBg} flex items-center justify-center mb-4 sm:mb-5`}
                  >
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-on-surface mb-2 sm:mb-3">
                    {card.title}
                  </h3>
                  <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Comparison vs Carfax / AutoCheck ─────────────────────── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-surface">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-black text-primary uppercase tracking-[0.2em] mb-3 sm:mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Comparación del mercado
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-extrabold text-primary mb-3 sm:mb-4">
              Cómo nos comparamos con los gigantes
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto">
              No te conformes con menos datos a mayor precio. Damos más
              información por una fracción del costo.
            </p>
          </div>
          <div className="rounded-3xl border border-outline-variant bg-surface-container-lowest shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse min-w-[640px]">
                <thead>
                  <tr className="bg-surface-container-low">
                    <th className="p-4 sm:p-6 text-left font-headline text-sm sm:text-base text-primary font-extrabold align-bottom">
                      Comparación de funciones
                    </th>
                    <th className="p-0 align-bottom">
                      <div className="relative bg-primary text-white px-3 sm:px-6 pt-7 sm:pt-9 pb-4 sm:pb-5 mx-1.5 sm:mx-2 rounded-t-2xl">
                        <div
                          className="absolute -top-0.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider whitespace-nowrap text-on-secondary-container shadow-md"
                          style={{ background: "var(--color-secondary-container)" }}
                        >
                          Mejor valor
                        </div>
                        <div className="flex items-center justify-center gap-1.5 font-headline text-base sm:text-xl font-black">
                          <Trophy
                            className="w-4 h-4 sm:w-5 sm:h-5"
                            style={{ color: "var(--color-secondary-container)" }}
                          />
                          CarCheckerVIN
                        </div>
                      </div>
                    </th>
                    <th className="p-4 sm:p-6 text-center font-headline text-sm sm:text-base text-on-surface-variant font-bold align-bottom">
                      Carfax
                    </th>
                    <th className="p-4 sm:p-6 text-center font-headline text-sm sm:text-base text-on-surface-variant font-bold align-bottom">
                      AutoCheck
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { f: "Historial de accidentes y daños", us: "check", c: "check", a: "check" },
                    { f: "Registros y marcas de título", us: "check", c: "check", a: "check" },
                    { f: "Fotos reales del vehículo", us: "check", c: "partial", a: "cross" },
                    { f: "Fotos de subastas salvage", us: "check", c: "partial", a: "cross" },
                    { f: "Análisis de valor de mercado", us: "check", c: "partial", a: "partial" },
                    { f: "Verificación del odómetro", us: "check", c: "check", a: "check" },
                    { f: "Registros de robo y recuperación", us: "check", c: "check", a: "check" },
                    { f: "Equipamiento y opciones completas", us: "check", c: "cross", a: "cross" },
                    { f: "Vista previa gratis (sin tarjeta)", us: "check", c: "cross", a: "cross" },
                    { f: "Precio (un solo reporte)", us: "$9.99", c: "$44.99", a: "$24.99" },
                  ].map((row, idx, arr) => {
                    const isLast = idx === arr.length - 1;
                    const renderCell = (val: string, highlight: boolean) => {
                      if (val === "check") {
                        return (
                          <Check
                            className={`w-5 h-5 mx-auto ${highlight ? "text-white" : "text-green-500"}`}
                            strokeWidth={3}
                          />
                        );
                      }
                      if (val === "cross") {
                        return <X className="w-5 h-5 text-error/70 mx-auto" strokeWidth={2.5} />;
                      }
                      if (val === "partial") {
                        return (
                          <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full bg-secondary/15 text-secondary font-bold text-[11px] sm:text-xs uppercase tracking-wide">
                            Parcial
                          </span>
                        );
                      }
                      return highlight ? (
                        <span className="text-xl sm:text-2xl font-extrabold text-white drop-shadow-sm">
                          {val}
                        </span>
                      ) : (
                        <span className="text-base sm:text-lg font-bold text-on-surface-variant">
                          {val}
                        </span>
                      );
                    };
                    return (
                      <tr
                        key={row.f}
                        className={`border-t border-outline-variant/60 ${isLast ? "bg-primary/[0.02]" : ""}`}
                      >
                        <td
                          className={`p-3 sm:p-5 text-xs sm:text-sm bg-surface-container-low ${
                            isLast
                              ? "font-headline font-extrabold text-primary text-sm sm:text-base"
                              : "font-semibold text-on-surface"
                          }`}
                        >
                          {row.f}
                        </td>
                        <td className="p-0 text-center">
                          <div
                            className={`mx-1.5 sm:mx-2 py-3 sm:py-4 bg-primary border-x border-primary ${
                              isLast ? "rounded-b-2xl" : ""
                            }`}
                          >
                            {renderCell(row.us, true)}
                          </div>
                        </td>
                        <td className="p-3 sm:p-5 text-center">{renderCell(row.c, false)}</td>
                        <td className="p-3 sm:p-5 text-center">{renderCell(row.a, false)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-center sm:text-left">
            <p className="text-sm sm:text-base text-on-surface-variant max-w-md">
              Obtén los mismos datos que los gigantes cobran a $25–$45 —{" "}
              <span className="font-bold text-primary">solo $9.99 por reporte</span>.
              Comienza con una vista previa gratis, sin tarjeta de crédito.
            </p>
            <Link
              href="/es/revision-vin"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-bold text-sm sm:text-base text-on-secondary-container hover:brightness-110 hover:shadow-lg active:scale-[0.98] transition-all whitespace-nowrap shadow-md"
              style={{ background: "var(--color-secondary-container)" }}
            >
              Revisión VIN gratis
              <ArrowRight className="w-4 h-4" />
            </Link>
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

      {/* ── Seller ───────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-surface">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 sm:gap-16 items-center">
          <div className="hidden lg:block">
            <div className="text-center px-8">
              <div className="inline-flex w-24 h-24 rounded-full bg-primary/10 items-center justify-center mb-6">
                <Car className="w-12 h-12 text-primary" />
              </div>
              <p className="font-headline font-black text-5xl text-primary mb-2">3 días</p>
              <p className="text-sm text-on-surface-variant">
                Promedio de venta de autos con reporte VIN incluido
              </p>
            </div>
          </div>
          <div>
            <span className="text-xs sm:text-sm font-black text-primary uppercase tracking-[0.2em] mb-3 sm:mb-4 block">
              Para vendedores
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-extrabold text-primary mb-4 sm:mb-5">
              ¿Vendes tu vehículo?
            </h2>
            <p className="text-base sm:text-lg text-on-surface-variant mb-8 sm:mb-10">
              Un reporte CarCheckerVIN te ayuda a vender más rápido y a mejor precio.
              Dale al comprador la transparencia que necesita para decir sí con confianza.
            </p>
            <div className="space-y-3 sm:space-y-4">
              {[
                {
                  icon: TrendingUp,
                  title: "Obtén el mejor precio",
                  desc: "Los vehículos con reportes limpios reciben 10–15% más de precio.",
                  accent: "bg-emerald-50 text-emerald-600",
                },
                {
                  icon: Users,
                  title: "Atrae más compradores",
                  desc: "Los anuncios con reporte VIN reciben 3× más consultas serias.",
                  accent: "bg-primary/8 text-primary",
                },
                {
                  icon: Shield,
                  title: "Reduce tu responsabilidad",
                  desc:
                    "Documenta la condición del vehículo desde el inicio y genera confianza.",
                  accent: "bg-violet-50 text-violet-600",
                },
              ].map(({ icon: Icon, title, desc, accent }) => (
                <div
                  key={title}
                  className="flex gap-4 sm:gap-5 p-4 sm:p-5 bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/10 hover:shadow-lg hover:shadow-outline/5 transition-all duration-300"
                >
                  <div
                    className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl ${accent} flex items-center justify-center flex-shrink-0`}
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h3 className="font-headline font-bold text-on-surface mb-1">{title}</h3>
                    <p className="text-sm text-on-surface-variant">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
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
