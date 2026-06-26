/**
 * Spanish homepage — /es.
 *
 * Renders the SAME section components as the English homepage at /, just
 * with locale="es" so every visible string flips to Spanish via each
 * component's per-locale COPY map. Visual structure (hero split, car
 * photo, plate toggle, "where is my VIN" accordion, feature grids,
 * comparison table, pricing tiers, FAQ accordion, CTA) is guaranteed
 * identical to the English page.
 *
 * What stays page-local:
 *   - locale="es" metadata + hreflang
 *   - inLanguage: "es" JSON-LD overrides (WebSite, FAQPage, HowTo)
 */

import type { Metadata } from "next";
import { t } from "@/i18n";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import RecentReportsSection from "@/components/RecentReportsSection";
import HowItWorks from "@/components/HowItWorks";
import ReportIncludedSection from "@/components/ReportIncludedSection";
import FeaturesSection from "@/components/FeaturesSection";
import AIFeaturesSection from "@/components/AIFeaturesSection";
import ComparisonSection from "@/components/ComparisonSection";
import PricingSection from "@/components/PricingSection";
import Reviews from "@/components/Reviews";
import SellerSection from "@/components/SellerSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";

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

/* ── Spanish-locale JSON-LD ────────────────────────────────────────
 * The English /page.tsx ships an en-US FAQPage + HowTo + Product. The
 * Spanish equivalent stays scoped to /es with inLanguage: "es-US" and
 * its own canonical IDs so Google treats them as distinct knowledge-
 * graph entries per locale.
 */
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
    { "@type": "Question", name: "¿Qué es un VIN y dónde lo encuentro?", acceptedAnswer: { "@type": "Answer", text: "El Número de Identificación Vehicular (VIN) es un código único de 17 caracteres asignado a cada vehículo a motor. Puedes encontrarlo en el tablero del lado del conductor (visible a través del parabrisas), en la calcomanía del marco de la puerta del conductor, en tu registro vehicular o en los documentos del seguro." } },
    { "@type": "Question", name: "¿Qué información incluye un reporte de CarCheckerVIN?", acceptedAnswer: { "@type": "Answer", text: "Nuestros reportes incluyen especificaciones completas del vehículo (motor, transmisión, tracción), todas las opciones y equipamiento de fábrica, estimaciones de valor de mercado, información de retiros, fotos reales del vehículo y datos técnicos detallados provenientes de NMVTIS y bases de datos de fabricantes." } },
    { "@type": "Question", name: "¿Qué tan rápido recibiré mi reporte VIN?", acceptedAnswer: { "@type": "Answer", text: "Los reportes VIN se generan al instante — normalmente en menos de 60 segundos. Una vez decodificado el VIN, verás el reporte completo del historial del vehículo inmediatamente en pantalla." } },
    { "@type": "Question", name: "¿Qué vehículos cubre su decodificador VIN?", acceptedAnswer: { "@type": "Answer", text: "Cubrimos vehículos fabricados desde 1981 en adelante (cuando se adoptó el estándar del VIN de 17 caracteres). Esto incluye autos, camiones, SUVs y vans de todos los principales fabricantes incluyendo Toyota, Ford, Honda, Chevrolet, BMW, Mercedes-Benz y más." } },
    { "@type": "Question", name: "¿Es útil una revisión VIN también para vendedores?", acceptedAnswer: { "@type": "Answer", text: "¡Absolutamente! Los vendedores usan los reportes VIN para documentar la condición del vehículo, generar confianza en el comprador y justificar el precio. Un reporte limpio puede ayudarte a vender más rápido y a mejor precio." } },
    { "@type": "Question", name: "¿En qué se diferencia su revisión VIN de los decodificadores gratis?", acceptedAnswer: { "@type": "Answer", text: "Los decodificadores VIN gratis típicamente solo muestran información básica de marca/modelo/año. Nuestro verificador VIN ofrece datos completos incluyendo listas completas de equipamiento, opciones de fábrica, especificaciones del motor, detalles de transmisión, fotos reales y valoraciones de mercado de bases de datos confiables." } },
    { "@type": "Question", name: "¿Una revisión VIN puede decirme si un auto fue robado?", acceptedAnswer: { "@type": "Answer", text: "Sí. Nuestros reportes cruzan el VIN contra la base de datos del National Insurance Crime Bureau (NICB). Si un vehículo está reportado como robado y no ha sido recuperado — o ha sido recuperado como pérdida total — el reporte lo marcará." } },
    { "@type": "Question", name: "¿Una revisión VIN me mostrará si hubo retroceso de odómetro?", acceptedAnswer: { "@type": "Answer", text: "Los reportes premium muestran todas las lecturas de kilometraje reportadas en inspecciones, transferencias de título y registros de servicio. Las inconsistencias en la cronología son un fuerte indicador de fraude de odómetro, que cuesta a los consumidores estadounidenses más de mil millones de dólares al año." } },
    { "@type": "Question", name: "¿Este servicio de revisión VIN es realmente gratis?", acceptedAnswer: { "@type": "Answer", text: "Sí — y por tiempo limitado todos los planes son completamente gratis, incluyendo reportes premium completos con historial, valor de mercado, fotos y análisis detallado. Sin tarjeta de crédito. Los precios regulares (desde $14.99) se reanudan al terminar la promoción." } },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  inLanguage: "es",
  name: "Cómo revisar un número VIN en línea",
  description:
    "Aprende a decodificar cualquier Número de Identificación Vehicular (VIN) para obtener un reporte completo del historial del vehículo en menos de 60 segundos.",
  step: [
    { "@type": "HowToStep", name: "Encuentra tu VIN", text: "Localiza el VIN de 17 caracteres en el tablero del vehículo, la calcomanía del marco de la puerta del conductor, la registración o los documentos del seguro." },
    { "@type": "HowToStep", name: "Ingresa el VIN", text: "Ingresa el VIN de 17 caracteres en el cuadro de búsqueda en nuestro sitio." },
    { "@type": "HowToStep", name: "Recibe tu reporte", text: "Visualiza tu reporte completo del vehículo al instante, incluyendo especificaciones, fotos, valores de mercado, listas de equipamiento e historial." },
  ],
};

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

      {/* SAME components as / — locale="es" flips every visible string. */}
      <HeroSection locale={LOCALE} />
      <TrustBar locale={LOCALE} />
      <RecentReportsSection locale={LOCALE} />
      <ReportIncludedSection locale={LOCALE} />
      <HowItWorks locale={LOCALE} />
      <FeaturesSection locale={LOCALE} />
      <AIFeaturesSection locale={LOCALE} />
      <ComparisonSection locale={LOCALE} />
      <PricingSection locale={LOCALE} />
      <Reviews locale={LOCALE} />
      <SellerSection locale={LOCALE} />
      <FAQSection locale={LOCALE} />
      <CTASection locale={LOCALE} />
    </>
  );
}
