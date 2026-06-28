/**
 * Wave 18 — French car-loan-calculator. Same full English layout via the
 * shared CarLoanCalculatorBody.
 */

import type { Metadata } from "next";
import CarLoanCalculatorBody, { FAQS_FR } from "@/components/CarLoanCalculatorBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/car-loan-calculator`;
const alt = hreflangAlternatesForLocale("/car-loan-calculator", "fr");
const title = "Calculateur de prêt auto — Mensualité, intérêt total et amortissement (gratuit)";
const description =
  "Calculateur gratuit de prêt de auto. Ingresa le precio du véhicule, pago inicial, intercambio, APR et plazo du prêt pour calcular instantanément ta mensuelité, intérêt total et calendario complet de amortissement. Funciona pour les 50 états de EE. UU.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "calculateur prêt auto",
    "calculateur prêt automotriz",
    "calculateur pago auto",
    "calculateur mensuelité auto",
    "calculateur financement auto",
    "calculateur pago carro",
    "calculateur intérêt prêt auto",
    "calculateur amortissement prêt auto",
    "calculateur prêt auto avec intercambio",
    "calculateur pago inicial auto",
    "calculateur prêt voiture d’occasion",
    "calculateur prêt auto nuevo",
    "calculateur APR auto",
    "cuánto auto puedo pagar",
    "estimateur pago auto",
    "calculateur intérêt total prêt auto",
    "calculateur prêt auto 60 moises",
    "calculateur prêt auto 72 moises",
    "calculateur prêt auto avec taxes",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title,
    description,
    url: PAGE_URL,
    type: "website",
    siteName: "CarCheckerVIN",
    locale: "fr_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculateur gratuit de prêt de auto — Pago mensuel et amortissement",
    description:
      "Ingresa precio du véhicule, APR et plazo pour ver instantanément ta mensuelité, intérêt total et calendario complet de amortissement.",
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

/* ─── JSON-LD Schemas ─────────────────────────────────────── */

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": ["WebApplication", "SoftwareApplication"],
  inLanguage: "fr",
  name: "Calculateur de prêt auto",
  description:
    "Calculateur gratuit de prêt de auto. Calcula pagos mensueles, intérêt total et un calendario complet de amortissement pour n’importe quel prêt automotriz. Soporta pago inicial, intercambio, taxe estatal sur ventes et tarifas du concessionnaire.",
  url: PAGE_URL,
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Cálculo de mensuelité",
    "Calendario complet de amortissement",
    "Support pour valeur de intercambio",
    "Impuesto sur ventes pour les 50 états",
    "Support pour tarifas du concessionnaire et documentación",
    "Plazos de prêt de 12 a 84 moises",
    "Desglose de intérêt vs. capital",
  ],
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  inLanguage: "fr",
  name: "Comment calcular ta mensuelité de auto",
  description:
    "Utilise le calculateur gratuit de prêt de auto de CarCheckerVIN pour trouver ta mensuelité exacto, intérêt total et calendario de amortissement en segundeux.",
  totalTime: "PT1M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Ingresa le precio du véhicule et le pago inicial",
      text: "Escribe le precio total de compra du véhicule et le monto que planeas pagar par adelantado como pago inicial. Si tienes un intercambio, ingresa su valeur estimado pour reducir le capital du prêt.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Establece le APR et le plazo du prêt",
      text: "Ingresa ta tasa anual de intérêt (APR) de ta banco, cooperativa de crédito ou pre-aprobación du concessionnaire. Selecciona le plazo du prêt — 36, 48, 60, 72 ou 84 moises. Plazos plus cortos significan pagos mensueles plus altos pero menos intérêt total.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Agrega le taxe estatal sur ventes et les tarifas",
      text: "Selecciona ta état pour le taxe automático sur ventes, luego ingresa les tarifas estimadas du concessionnaire et documentación. Estas se agregan al capital du prêt si no se pagan par adelantado.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Ve tes resultadeux",
      text: "Haz clic en 'Calcular mensuelité' pour ver instantanément ta monto de mensuelité, intérêt total pagado, coût total et le calendario complet de amortissement mostrando le desglose de capital e intérêt de cada pago.",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "fr",
  mainEntity: FAQS_FR.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "fr",
  headline: "Calculateur de prêt auto",
  description:
    "Aprende a calcular ta mensuelité de auto, intérêt total et calendario de amortissement — incluyendo taxe estatal sur ventes, valeur du intercambio et tarifas du concessionnaire.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
  datePublished: "2026-04-16",
  dateModified: "2026-06-25",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` },
    { "@type": "ListItem", position: 2, name: "Calculateur de prêt auto", item: PAGE_URL },
  ],
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  inLanguage: "fr",
  name: "Calculateur de prêt auto",
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", "#how-it-works", "#faq"],
  },
  url: PAGE_URL,
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <CarLoanCalculatorBody locale="fr" />
    </>
  );
}
