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
    { "@type": "Question", name: "Qué es un VIN et dónde lo encuentro?", acceptedAnswer: { "@type": "Answer", text: "El Número de Identification Vehicular (VIN) es un code unique de 17 caractères asignado a chaque véhicule a motor. Puedes encontrarlo en el tablero du lado du conductor (visible a travers du parabrisas), en la autocollant du marco de la puerta du conductor, en ta enregistrement du véhicule ou en los documentos du assurance." } },
    { "@type": "Question", name: "Qué information incluye un rapport de CarCheckerVIN?", acceptedAnswer: { "@type": "Answer", text: "Nuestros rapports incluyen especificaciones complètes du véhicule (motor, transmission, traction), todas las opciones et equipamiento de usine, estimaciones de valeur de marché, information de rappels, fotos reales du véhicule et données técnicos detallados provenientes de NMVTIS et bases de données de fabricantes." } },
    { "@type": "Question", name: "Qué tan rapide recibiré mi rapport VIN?", acceptedAnswer: { "@type": "Answer", text: "Los rapports VIN se generan instantanément — normalmente en menos de 60 segundos. Una vez décodedo el VIN, verás el rapport complet du historique du véhicule inmediatamente en pantalla." } },
    { "@type": "Question", name: "Qué véhicules cubre su décodeur VIN?", acceptedAnswer: { "@type": "Answer", text: "Cubrimos véhicules fabricados desde 1981 en adelante (cuando se adoptó el estándar du VIN de 17 caractères). Esto incluye autos, camiones, SUVs et vans de todos los principales fabricantes incluant Toyota, Ford, Honda, Chevrolet, BMW, Mercedes-Benz et plus." } },
    { "@type": "Question", name: "Es útil una révision VIN también pour vendeurs?", acceptedAnswer: { "@type": "Answer", text: "Absolutamente! Los vendeurs usan los rapports VIN pour documentar la condición du véhicule, generar confiance en el acheteur et justificar el prix. Un rapport limpio puede aiderte a vender plus rapide et a mejor prix." } },
    { "@type": "Question", name: "En qué se diferencia su révision VIN de los décodeurs gratuit?", acceptedAnswer: { "@type": "Answer", text: "Los décodeurs VIN gratuit típicamente solo muestran information de base de marque/modèle/año. Nuestro vérificateur VIN ofrece données complets incluant listas complètes de equipamiento, opciones de usine, especificaciones du motor, detalles de transmission, fotos reales et valeuraciones de marché de bases de données fiables." } },
    { "@type": "Question", name: "Una révision VIN puede decirme si un auto fue volé?", acceptedAnswer: { "@type": "Answer", text: "Sí. Nuestros rapports cruzan el VIN contra la base de données du National Insurance Crime Bureau (NICB). Si un véhicule está reportado como volé et no ha sido recuperado — ou ha sido recuperado como perte totale — el rapport lo marquerá." } },
    { "@type": "Question", name: "Una révision VIN me mostrará si hubo retroceso de odomètre?", acceptedAnswer: { "@type": "Answer", text: "Los rapports premium muestran todas las lecturas de kilométrage reportadas en inspecciones, transferts de titre et enregistrements de service. Las inconsistencias en la cronología son un fuerte indicador de fraude de odomètre, que cuesta a los consumidores étatunidenses plus de mil millones de dólares al año." } },
    { "@type": "Question", name: "Este service de révision VIN es realmente gratuit?", acceptedAnswer: { "@type": "Answer", text: "Sí — et por tiempo limitado todos los formules son complètemente gratuit, incluant rapports premium complets avec historique, valeur de marché, fotos et análisis detallado. Sin tarjeta de crédit. Los tarifs regulares (desde $14.99) se reanudan al terminar la promotion." } },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  inLanguage: "fr",
  name: "Comment revisar un numéro VIN en ligne",
  description:
    "Aprende a décoder n’importe quel Número de Identification Vehicular (VIN) pour obtener un rapport complet du historique du véhicule en menos de 60 segundos.",
  step: [
    { "@type": "HowToStep", name: "Encuentra ta VIN", text: "Localiza el VIN de 17 caractères en el tablero du véhicule, la autocollant du marco de la puerta du conductor, la enregistrement ou los documentos du assurance." },
    { "@type": "HowToStep", name: "Ingresa el VIN", text: "Ingresa el VIN de 17 caractères en el cuadro de recherche en notre sitio." },
    { "@type": "HowToStep", name: "Recibe ta rapport", text: "Visualiza ta rapport complet du véhicule instantanément, incluant especificaciones, fotos, valeures de marché, listas de equipamiento e historique." },
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
