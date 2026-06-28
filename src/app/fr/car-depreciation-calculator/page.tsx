import type { Metadata } from "next";
import CarDepreciationCalculatorBody, {
  CAR_DEPRECIATION_COPY,
} from "@/components/CarDepreciationCalculatorBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/calculateur-dépréciation-auto`;
const alt = hreflangAlternatesForLocale("/car-depreciation-calculator", "fr");

const title =
  "Calculateur de dépréciation de auto gratuit — Combien valdrá mi auto?";
const description =
  "Calcule exactement combien perderá ta auto chaque année. Ve valeures proyectadeux a 1, 3, 5, 7 et 10 années avec curvas de dépréciation spécifiques par marque pour plus de 30 fabricavant.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "calculateur dépréciation auto",
    "calculateur dépréciation véhicule",
    "dépréciation valeur du auto",
    "combien se deprecia mi auto",
    "tasa de dépréciation auto",
    "calculateur dépréciation automotriz",
    "dépréciation par année",
    "gráfico dépréciation auto",
    "dépréciation auto 5 années",
    "dépréciation auto 10 années",
    "dépréciation auto de lujo",
    "calculateur dépréciation camioneta",
    "calculateur dépréciation SUV",
    "calculateur dépréciation EV",
    "dépréciation Tesla",
    "que voitures rean su valeur",
    "meilleur valeur de revente",
    "curva de dépréciation auto",
    "dépréciation premier année",
    "dépréciation auto nonuveau",
    "dépréciation voiture d’occasion",
    "dépréciation par marque",
    "calculateur valeur residual auto",
    "calculateur valeur futuro auto",
    "valeur auto en 5 années",
    "dépréciation véhicule par kilométrage",
    "calculateur dépréciation avec kilométrage",
    "calculateur envejecimiento auto",
    "calculateur revente auto",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title: "Calculateur de dépréciation de auto — Combien valdrá mi auto?",
    description:
      "Ve le valeur proyectado de ta auto a 1, 3, 5, 7 et 10 années. Curvas de dépréciation spécifiques par marque pour plus de 30 fabricavant incluant Toyota, Honda, Tesla, BMW et plus.",
    url: PAGE_URL,
    type: "website",
    siteName: "CarCheckerVIN",
    locale: "fr_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculateur de dépréciation de auto — Proyecta le valeur a 10 années",
    description:
      "Calculateur gratuit avec curvas de dépréciation spécifiques par marque. Ve combien pierde ta auto chaque année et que marques meilleur rean su valeur.",
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
  name: "Calculateur de dépréciation de auto",
  description:
    "Calculateur gratuit de dépréciation de auto. Proyecta le valeur de revente de ta véhicule a 1, 3, 5, 7 et 10 années en utilisant multiplicadores de rétention spécifiques par marque, ajustes par tipo de véhicule et curvas de kilométrage.",
  url: PAGE_URL,
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web Browêtre",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Tabla de valeures proyectadeux a 10 années",
    "Gráfico de perte de valeur année par année",
    "Más de 30 multiplicadores de rétention spécifiques par marque",
    "Ajustes par tipo de véhicule (Sedán, SUV, Camioneta, EV, Lujo, Sportif, Minivan)",
    "Ajuste de dépréciation basado en kilométrage",
    "Modecôté de suposition de condition",
    "Identification du pire année de dépréciation",
    "Comparaison avec le promedio du marché",
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
  name: "Comment calcular la dépréciation de ta auto",
  description:
    "Utilise le calculateur gratuit de dépréciation de auto de CarCheckerVIN pour proyectar le valeur de ta véhicule a 1, 3, 5, 7 et 10 années à partir de aheure.",
  totalTime: "PT1M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Sélectionne la marque de ta véhicule",
      text: "Elige entre 30 marques populares. Chaque marque a un multiplicador histórico de rétention — Toyota et Lexus rean plus valeur, pendant que les marques europeas de lujo et les minivans domésticas se deprecian plus rapide que le promedio.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Entre le année et prix de compra",
      text: "Escribe le année calendario en que compraste (o planeas acheter) le véhicule et le prix que payeste en USD. La calculateur ancla todas les proyecciones futuras en esta base.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Agrega kilométrage et tipo de véhicule",
      text: "Entre le kilométrage anual espétaitdo (12,000 es le promedio de la industria) et sélectionne le tipo de carrosêtreie — Sedán, SUV, Camioneta, EV, Lujo, Sportif ou Minivan. Chaque unon ajusta la curva de dépréciation.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Revisa la proyección a 10 années",
      text: "Haz clic en 'Calcular dépréciation' pour ver les valeures proyectadeux année par année, la perte totale en dólares, la pire caída en un seul année et comment se compare ta véhicule avec le promedio du marché.",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "fr",
  mainEntity: CAR_DEPRECIATION_COPY.es.faqs.map((f) => ({
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
      name: "Calculateur de dépréciation de auto",
      item: PAGE_URL,
    },
  ],
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  inLanguage: "fr",
  name: "Calculateur de dépréciation de auto",
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", "#what-is", "#why-cars", "#faq"],
  },
  url: PAGE_URL,
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "fr",
  headline: "Calculateur de dépréciation de auto",
  description:
    "Apprends comment se deprecian les voitures par marque, edad et kilométrage. Calcule le valeur proyectado de ta véhicule a 10 années avec multiplicadores spécifiques par marque pour plus de 30 fabricavant.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
  datePublished: "2026-05-01",
  dateModified: "2026-06-25",
};

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <CarDepreciationCalculatorBody locale="fr" />
    </>
  );
}
