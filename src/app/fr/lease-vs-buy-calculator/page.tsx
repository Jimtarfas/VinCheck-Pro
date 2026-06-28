/**
 * Wave 18.19 — French lease-vs-buy-calculator. Same full English layout via
 * the shared LeaseVsBuyCalculatorBody. Replaces the Wave 15 SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import LeaseVsBuyCalculatorBody, { FAQS_FR } from "@/components/LeaseVsBuyCalculatorBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/lease-vs-buy-calculator`;
const alt = hreflangAlternatesForLocale("/lease-vs-buy-calculator", "fr");

const title = "Calculateur louer vs acheter — Debo louer ou acheter un auto? (Gratuit)";
const description =
  "Comparaison côte à côte de louer (lease) vs financiar le même auto. Mira coût total, pagos mensueles, plusvalía et venteja neta en 3-7 années. Gratuit, instantané, sans inscription.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "calculateur louer vs acheter",
    "lease vs acheter auto",
    "calculateur lease auto",
    "factor de dinero calculateur",
    "valeur residual lease",
    "mensuelité lease calculateur",
    "louer ou financiar",
    "coût total lease",
    "calculateur pago lease",
    "lease vs prêt auto",
    "comparaison lease acheter",
    "calculateur arrendamiento auto",
    "debo louer mi auto",
    "calculateur compra de lease",
    "exceso kilométrage lease",
    "cargo adquisición lease",
    "cargo disposición lease",
    "plusvalía auto lease",
    "lease luxury auto",
    "ventejas et desventejas lease",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title: "Calculateur louer vs acheter — Debo louer ou acheter un auto?",
    description:
      "Compara le coût total réel de louer vs financiar le même auto. Mira pagos mensueles, dépense total, plusvalía al final du plazo et la venteja neta. Gratuit e instantané.",
    url: PAGE_URL,
    type: "website",
    siteName: "CarCheckerVIN",
    locale: "fr_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculateur louer vs acheter — Debo louer ou acheter un auto?",
    description:
      "Comparaison côte à côte de lease et financement avec matemática du factor de dinero, valeures residuales, plusvalía et un veredicto claro de venteja neta.",
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
  name: "Calculateur louer vs acheter",
  description:
    "Comparaison gratuit côte à côte de louer vs financiar le même véhicule. Calcula mensuelité, dépense total de bolsillo, plusvalía al final du plazo, cargo de financement avec factor de dinero et la venteja neta de coût.",
  url: PAGE_URL,
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Pago de lease avec factor de dinero",
    "Calculateur de valeur residual",
    "Amortización du prêt pour le lado de compra",
    "Veredicto de venteja neta (lease vs acheter)",
    "Tabla de coût acumulado année par année",
    "Estimador de exceso de kilométrage",
    "Manejo de cargos de adquisición / disposición",
    "Support de taxe sur mensuelidad et sur inicial",
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
  name: "Comment comparar louer vs acheter un auto",
  description:
    "Utilise le calculateur gratuit de louer vs acheter de CarCheckerVIN pour trouver la opción plus bon marché en cinq pasos.",
  totalTime: "PT3M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Ingresa le MSRP du véhicule et le precio negociado",
      text: "El MSRP define le residual du lease; le precio negociado define tanto le coût capitalizado du lease como le principal du prêt. Ingresa ambos — a menudo son diferentes.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Configura ta pago inicial, auto a cambio et tasa de taxe",
      text: "Estos insumos compartideux aplican a ambos ladeux. Agrega ta tasa combineda de taxe sur la vente estatal et local pour que la calculateur pueda gravar correctamente cada mensuelité du lease et le principal du lado de compra.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Ingresa les conditions du lease (factor de dinero, residual, cargos)",
      text: "El factor de dinero es le equivalente du APR en le lease — multiplica par 2400 pour obtener le APR. Le % residual le fija le banco; 55% es típico pour 36 moises. Los cargos de adquisición et disposición son cargos bancarios al inicio et al final.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Ingresa les conditions de compra (APR et plazo du prêt)",
      text: "Utilise un APR réel de una pre-aprobación de cooperativa ou banco. Le plazo du prêt puede ser plus largo que la ventena de comparaison — la calculateur maneja la amortissement de ventena parcial.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Haz clic en Comparar et lee le veredicto",
      text: "La calculateur devuelve cartes côte à côte, una tabla acumulada année par année et una sola píldora de veredicto de venteja neta: 'Comprar te ahorra $X' ou 'Arrendar te ahorra $X' basado en coût neto (dépense de bolsillo menos plusvalía al final du plazo).",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "fr",
  mainEntity: FAQS_FR.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` },
    {
      "@type": "ListItem",
      position: 2,
      name: "Calculateur louer vs acheter",
      item: PAGE_URL,
    },
  ],
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "SpeakableSpecification",
  cssSelector: ["h1", "#quick-comparison", "#when-lease", "#when-buy", "#faq"],
  url: PAGE_URL,
};

/* ─── Page ────────────────────────────────────────────────── */

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
      />
      <LeaseVsBuyCalculatorBody locale="fr" />
    </>
  );
}
