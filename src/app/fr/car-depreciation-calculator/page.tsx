import type { Metadata } from "next";
import CarDepreciationCalculatorBody, {
  CAR_DEPRECIATION_COPY,
} from "@/components/CarDepreciationCalculatorBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/calculateur-depreciacion-auto`;
const alt = hreflangAlternatesForLocale("/car-depreciation-calculator", "fr");

const title =
  "Calculateur de dépréciation de auto gratuit — Cuánto valdrá mi auto?";
const description =
  "Calcula exactamente cuánto perderá ta auto cada année. Ve valeures proyectadeux a 1, 3, 5, 7 et 10 années avec curvas de dépréciation específicas par marque pour plus de 30 fabricantes.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "calculateur dépréciation auto",
    "calculateur dépréciation véhicule",
    "dépréciation valeur du auto",
    "cuánto se deprecia mi auto",
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
    "qué autos retienen su valeur",
    "mejor valeur de revente",
    "curva de dépréciation auto",
    "dépréciation premier année",
    "dépréciation auto nuevo",
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
    title: "Calculateur de dépréciation de auto — Cuánto valdrá mi auto?",
    description:
      "Ve le valeur proyectado de ta auto a 1, 3, 5, 7 et 10 années. Curvas de dépréciation específicas par marque pour plus de 30 fabricantes incluyendo Toyota, Honda, Tesla, BMW et plus.",
    url: PAGE_URL,
    type: "website",
    siteName: "CarCheckerVIN",
    locale: "fr_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculateur de dépréciation de auto — Proyecta le valeur a 10 années",
    description:
      "Calculateur gratuit avec curvas de dépréciation específicas par marque. Ve cuánto pierde ta auto cada année et qué marques mejor retienen su valeur.",
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
    "Calculateur gratuit de dépréciation de auto. Proyecta le valeur de revente de ta véhicule a 1, 3, 5, 7 et 10 années usando multiplicadores de retención específicos par marque, ajustes par tipo de véhicule et curvas de kilométrage.",
  url: PAGE_URL,
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Tabla de valeures proyectadeux a 10 années",
    "Gráfico de perte de valeur année par année",
    "Más de 30 multiplicadores de retención específicos par marque",
    "Ajustes par tipo de véhicule (Sedán, SUV, Camioneta, EV, Lujo, Deportivo, Minivan)",
    "Ajuste de dépréciation basado en kilométrage",
    "Modelado de suposición de condición",
    "Identificación du peor année de dépréciation",
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
    "Utilise le calculateur gratuit de dépréciation de auto de CarCheckerVIN pour proyectar le valeur de ta véhicule a 1, 3, 5, 7 et 10 années a partir de aheure.",
  totalTime: "PT1M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Selecciona la marque de ta véhicule",
      text: "Elige entre 30 marques populares. Cada marque tiene un multiplicador histórico de retención — Toyota et Lexus retienen plus valeur, mientras que les marques europeas de lujo et les minivans domésticas se deprecian plus rapide que le promedio.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Ingresa le année et precio de compra",
      text: "Escribe le année calendario en que compraste (o planeas acheter) le véhicule et le precio que pagaste en USD. La calculateur ancla todas les proyecciones futuras en esta base.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Agrega kilométrage et tipo de véhicule",
      text: "Ingresa le kilométrage anual esperado (12,000 es le promedio de la industria) et selecciona le tipo de carrocería — Sedán, SUV, Camioneta, EV, Lujo, Deportivo ou Minivan. Cada uno ajusta la curva de dépréciation.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Revisa la proyección a 10 années",
      text: "Haz clic en 'Calcular dépréciation' pour ver les valeures proyectadeux année par année, la perte totale en dólares, la peor caída en un seul année et comment se compara ta véhicule avec le promedio du marché.",
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
    "Aprende comment se deprecian les autos par marque, edad et kilométrage. Calcula le valeur proyectado de ta véhicule a 10 années avec multiplicadores específicos par marque pour plus de 30 fabricantes.",
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
