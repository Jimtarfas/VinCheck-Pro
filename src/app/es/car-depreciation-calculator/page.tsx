import type { Metadata } from "next";
import CarDepreciationCalculatorBody, {
  CAR_DEPRECIATION_COPY,
} from "@/components/CarDepreciationCalculatorBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/es/calculadora-depreciacion-auto`;
const alt = hreflangAlternatesForLocale("/car-depreciation-calculator", "es");

const title =
  "Calculadora de depreciación de auto gratis — ¿Cuánto valdrá mi auto?";
const description =
  "Calcula exactamente cuánto perderá tu auto cada año. Ve valores proyectados a 1, 3, 5, 7 y 10 años con curvas de depreciación específicas por marca para más de 30 fabricantes.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "calculadora depreciación auto",
    "calculadora depreciación vehículo",
    "depreciación valor del auto",
    "cuánto se deprecia mi auto",
    "tasa de depreciación auto",
    "calculadora depreciación automotriz",
    "depreciación por año",
    "gráfico depreciación auto",
    "depreciación auto 5 años",
    "depreciación auto 10 años",
    "depreciación auto de lujo",
    "calculadora depreciación camioneta",
    "calculadora depreciación SUV",
    "calculadora depreciación EV",
    "depreciación Tesla",
    "qué autos retienen su valor",
    "mejor valor de reventa",
    "curva de depreciación auto",
    "depreciación primer año",
    "depreciación auto nuevo",
    "depreciación auto usado",
    "depreciación por marca",
    "calculadora valor residual auto",
    "calculadora valor futuro auto",
    "valor auto en 5 años",
    "depreciación vehículo por kilometraje",
    "calculadora depreciación con kilometraje",
    "calculadora envejecimiento auto",
    "calculadora reventa auto",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title: "Calculadora de depreciación de auto — ¿Cuánto valdrá mi auto?",
    description:
      "Ve el valor proyectado de tu auto a 1, 3, 5, 7 y 10 años. Curvas de depreciación específicas por marca para más de 30 fabricantes incluyendo Toyota, Honda, Tesla, BMW y más.",
    url: PAGE_URL,
    type: "website",
    siteName: "CarCheckerVIN",
    locale: "es_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculadora de depreciación de auto — Proyecta el valor a 10 años",
    description:
      "Calculadora gratis con curvas de depreciación específicas por marca. Ve cuánto pierde tu auto cada año y qué marcas mejor retienen su valor.",
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
  inLanguage: "es",
  name: "Calculadora de depreciación de auto",
  description:
    "Calculadora gratis de depreciación de auto. Proyecta el valor de reventa de tu vehículo a 1, 3, 5, 7 y 10 años usando multiplicadores de retención específicos por marca, ajustes por tipo de vehículo y curvas de kilometraje.",
  url: PAGE_URL,
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Tabla de valores proyectados a 10 años",
    "Gráfico de pérdida de valor año por año",
    "Más de 30 multiplicadores de retención específicos por marca",
    "Ajustes por tipo de vehículo (Sedán, SUV, Camioneta, EV, Lujo, Deportivo, Minivan)",
    "Ajuste de depreciación basado en kilometraje",
    "Modelado de suposición de condición",
    "Identificación del peor año de depreciación",
    "Comparación con el promedio del mercado",
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
  inLanguage: "es",
  name: "Cómo calcular la depreciación de tu auto",
  description:
    "Usa la calculadora gratis de depreciación de auto de CarCheckerVIN para proyectar el valor de tu vehículo a 1, 3, 5, 7 y 10 años a partir de ahora.",
  totalTime: "PT1M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Selecciona la marca de tu vehículo",
      text: "Elige entre 30 marcas populares. Cada marca tiene un multiplicador histórico de retención — Toyota y Lexus retienen más valor, mientras que las marcas europeas de lujo y las minivans domésticas se deprecian más rápido que el promedio.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Ingresa el año y precio de compra",
      text: "Escribe el año calendario en que compraste (o planeas comprar) el vehículo y el precio que pagaste en USD. La calculadora ancla todas las proyecciones futuras en esta base.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Agrega kilometraje y tipo de vehículo",
      text: "Ingresa el kilometraje anual esperado (12,000 es el promedio de la industria) y selecciona el tipo de carrocería — Sedán, SUV, Camioneta, EV, Lujo, Deportivo o Minivan. Cada uno ajusta la curva de depreciación.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Revisa la proyección a 10 años",
      text: "Haz clic en 'Calcular depreciación' para ver los valores proyectados año por año, la pérdida total en dólares, la peor caída en un solo año y cómo se compara tu vehículo con el promedio del mercado.",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "es",
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
    { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/es` },
    {
      "@type": "ListItem",
      position: 2,
      name: "Calculadora de depreciación de auto",
      item: PAGE_URL,
    },
  ],
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  inLanguage: "es",
  name: "Calculadora de depreciación de auto",
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", "#what-is", "#why-cars", "#faq"],
  },
  url: PAGE_URL,
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "es",
  headline: "Calculadora de depreciación de auto",
  description:
    "Aprende cómo se deprecian los autos por marca, edad y kilometraje. Calcula el valor proyectado de tu vehículo a 10 años con multiplicadores específicos por marca para más de 30 fabricantes.",
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
      <CarDepreciationCalculatorBody locale="es" />
    </>
  );
}
