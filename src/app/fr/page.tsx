/**
 * French homepage — /es.
 *
 * Renders the SAME section components as the English homepage at /, just
 * with locale="fr" so every visible string flips to French via each
 * component's per-locale COPY map. Visual structure (hero split, car
 * photo, plate toggle, "where is my VIN" accordion, feature grids,
 * comparison table, pricing tiers, FAQ accordion, CTA) is guaranteed
 * identical to the English page.
 *
 * What stays page-local:
 *   - locale="fr" metadata + hreflang
 *   - inLanguage: "fr" JSON-LD overrides (WebSite, FAQPage, HowTo)
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

const LOCALE = "fr" as const;
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
      locale: "fr_US",
      siteName: "CarCheckerVIN",
    },
    twitter: {
      card: "summary_large_image",
      title: t(LOCALE, "home.metaTitle"),
      description: t(LOCALE, "home.metaDescription"),
    },
  };
}

/* ── French-locale JSON-LD ────────────────────────────────────────
 * The English /page.tsx ships an en-US FAQPage + HowTo + Product. The
 * French equivalent stays scoped to /es with inLanguage: "fr-US" and
 * its own canonical IDs so Google treats them as distinct knowledge-
 * graph entries per locale.
 */
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE}/fr/#website`,
  name: "CarCheckerVIN",
  url: `${SITE}/fr/`,
  inLanguage: "fr",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE}/fr/?vin={vin}`,
    },
    "query-input": "required name=vin",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${SITE}/fr/#faqpage`,
  inLanguage: "fr",
  mainEntity: [
    { "@type": "Question", name: "Qué es un VIN et dónde le encuentro?", acceptedAnswer: { "@type": "Answer", text: "El Número de Identificación Vehicular (VIN) es un code unique de 17 caracteres asignado a cada véhicule a motor. Puedes trouverlo en le tablero du lado du conductor (visible a través du parabrisas), en la calcomanía du marco de la puerta du conductor, en ta enregistrement du véhicule ou en les documentos du assurance." } },
    { "@type": "Question", name: "Qué información incluye un rapport de CarCheckerVIN?", acceptedAnswer: { "@type": "Answer", text: "Nuestros rapports incluyen especificaciones complètes du véhicule (motor, transmisión, tracción), todas les opciones et equipamiento de fábrica, estimaciones de valeur de marché, información de rappels, fotos réeles du véhicule et données técnicos detalladeux provenientes de NMVTIS et bases de données de fabricantes." } },
    { "@type": "Question", name: "Qué tan rapide recibiré mi rapport VIN?", acceptedAnswer: { "@type": "Answer", text: "Los rapports VIN se generan instantanément — normalmente en moins de 60 segundeux. Una vez décodedo le VIN, verás le rapport complet du historique du véhicule inmediatamente en pantalla." } },
    { "@type": "Question", name: "Qué véhicules cubre su décodeur VIN?", acceptedAnswer: { "@type": "Answer", text: "Cubrimos véhicules fabricadeux desde 1981 en adelante (cuando se adoptó le estándar du VIN de 17 caracteres). Esto incluye autos, camiones, SUVs et vans de todeux les principales fabricantes incluyendo Toyota, Ford, Honda, Chevrolet, BMW, Mercedes-Benz et plus." } },
    { "@type": "Question", name: "Es útil una vérification VIN también pour vendeurs?", acceptedAnswer: { "@type": "Answer", text: "Absolutamente! Los vendeurs usan les rapports VIN pour documentar la condición du véhicule, generar confiance en le acheteur et justificar le precio. Un rapport limpio puede aiderte a vender plus rapide et a mejor precio." } },
    { "@type": "Question", name: "En qué se diferencia su vérification VIN de les décodeures gratuit?", acceptedAnswer: { "@type": "Answer", text: "Los décodeures VIN gratuit típicamente seul muestran información básica de marque/modelo/année. Nuestro vérificateur VIN ofrece données complets incluyendo listas complètes de equipamiento, opciones de fábrica, especificaciones du motor, detalles de transmisión, fotos réeles et valeuraciones de marché de bases de données fiables." } },
    { "@type": "Question", name: "Una vérification VIN puede decirme si un auto fue volé?", acceptedAnswer: { "@type": "Answer", text: "Sí. Nuestros rapports cruzan le VIN contra la base de données du National Insurance Crime Bureau (NICB). Si un véhicule está reportado como volé et no ha sido recuperado — ou ha sido recuperado como perte totale — le rapport le marquerá." } },
    { "@type": "Question", name: "Una vérification VIN me mostrará si hubo retroceso de odomètre?", acceptedAnswer: { "@type": "Answer", text: "Los rapports premium muestran todas les lecturas de kilométrage reportadas en inspecciones, transferencias de titre et enregistrements de service. Las inconsistencias en la cronología son un fuerte indicador de fraude de odomètre, que cuesta a les consumidores étatunidenses plus de mil millones de dólares al année." } },
    { "@type": "Question", name: "Este service de vérification VIN es réelmente gratuit?", acceptedAnswer: { "@type": "Answer", text: "Sí — et par tiempo limitado todeux les formules son complètemente gratuit, incluyendo rapports premium complets avec historique, valeur de marché, fotos et analyse detallado. Sin carte de crédito. Los tarifs regulares (desde $14.99) se reanudan al terminar la promoción." } },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  inLanguage: "fr",
  name: "Comment revisar un numéro VIN en línea",
  description:
    "Aprende a décoder n’importe quel Número de Identificación Vehicular (VIN) pour obtener un rapport complet du historique du véhicule en moins de 60 segundeux.",
  step: [
    { "@type": "HowToStep", name: "Encuentra ta VIN", text: "Localiza le VIN de 17 caracteres en le tablero du véhicule, la calcomanía du marco de la puerta du conductor, la registración ou les documentos du assurance." },
    { "@type": "HowToStep", name: "Ingresa le VIN", text: "Ingresa le VIN de 17 caracteres en le cuadro de búsqueda en notre sitio." },
    { "@type": "HowToStep", name: "Recibe ta rapport", text: "Visualiza ta rapport complet du véhicule instantanément, incluyendo especificaciones, fotos, valeures de marché, listas de equipamiento e historique." },
  ],
};

export default function FrenchHomePage() {
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

      {/* SAME components as / — locale="fr" flips every visible string. */}
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
