/**
 * Wave 18 — Spanish gas-mileage-calculator. Same full English layout via the
 * shared GasMileageCalculatorBody. Replaces the Wave 15 SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import GasMileageCalculatorBody from "@/components/GasMileageCalculatorBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/es/gas-mileage-calculator`;
const alt = hreflangAlternatesForLocale("/gas-mileage-calculator", "es");
const title = "Calculadora de costo de combustible — Costo por milla, mes y año (gratis)";
const description =
  "Calculadora gratis de costo de combustible. Ingresa tu MPG, millas recorridas y precio local de gasolina para ver al instante tu costo de combustible diario, mensual y anual. Incluye calculadora de viaje por carretera y comparación de vehículos con análisis de punto de equilibrio. Precios de gasolina de los 50 estados de EE. UU. incluidos.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "calculadora costo combustible",
    "calculadora costo gasolina",
    "calculadora MPG costo",
    "calculadora costo por milla",
    "calculadora costo anual gasolina",
    "calculadora costo mensual gasolina",
    "calculadora costo viaje carretera",
    "calculadora rendimiento combustible",
    "calculadora eficiencia combustible",
    "costo de gasolina por milla",
    "cuánto cuesta la gasolina por mes",
    "calculadora gasolina por estado",
    "comparación híbrido vs gasolina",
    "calculadora ahorro combustible",
    "calculadora presupuesto gasolina",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title,
    description,
    url: PAGE_URL,
    type: "website",
    siteName: "CarCheckerVIN",
    locale: "es_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description:
      "Ingresa MPG, millas recorridas y precio local de gasolina para ver tus costos diarios, mensuales y anuales de combustible. Incluye modo viaje y comparación de vehículos.",
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

/* JSON-LD Schemas */

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": ["WebApplication", "SoftwareApplication"],
  inLanguage: "es",
  name: "Calculadora de costo de combustible",
  description:
    "Calculadora gratis de costo de combustible. Ingresa MPG, distancia de manejo y precio de gasolina para calcular al instante los costos diarios, mensuales y anuales de combustible. Incluye modo de viaje por carretera, promedios de precio de gasolina de los 50 estados de EE. UU. y comparación de vehículos con análisis de punto de equilibrio.",
  url: PAGE_URL,
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Costo diario de combustible",
    "Costo mensual y anual de combustible",
    "Cálculo de costo por milla",
    "Modo de costo de viaje por carretera",
    "Promedios de precio de gasolina de los 50 estados de EE. UU.",
    "Entrada de precio de gasolina personalizado",
    "Comparación de dos vehículos",
    "Análisis de punto de equilibrio para mejora de eficiencia",
    "Estimación anual de emisiones de CO₂",
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
  name: "Cómo calcular tu costo de combustible",
  description:
    "Usa la calculadora gratis de costo de combustible de CarCheckerVIN para encontrar tus costos diarios, mensuales y anuales de combustible en segundos.",
  totalTime: "PT1M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Elige modo diario o viaje por carretera",
      text: "Selecciona 'Costo de manejo diario' para calcular el gasto semanal y anual de combustible, o 'Costo de viaje por carretera' para estimar el combustible de un viaje específico.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Ingresa el MPG de tu vehículo",
      text: "Escribe la eficiencia de combustible de tu auto en millas por galón. Encuéntralo en la calcomanía de la ventana, en tu manual del propietario o en fueleconomy.gov. Usa la calificación combinada de la EPA para la estimación anual más precisa.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Establece tu precio de gasolina",
      text: "Selecciona tu estado para un precio de gasolina promedio rellenado automáticamente, o ingresa el precio exacto en tu estación local. Los precios están actualizados a los promedios de 2025 para los 50 estados.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Opcionalmente compara dos vehículos",
      text: "Expande la sección de comparación para ingresar el MPG de un segundo vehículo y la diferencia de precio. La calculadora muestra el ahorro anual y el punto de equilibrio en meses.",
    },
  ],
};

const FAQS_ES = [
  {
    question: "¿Cómo calculo mi costo de gasolina por milla?",
    answer:
      "Costo de gasolina por milla = precio de gasolina por galón ÷ MPG. A $3.50/galón y 28 MPG, tu costo de combustible es $0.125 por milla, o 12.5 centavos. Multiplica por tu kilometraje anual para obtener la cuenta anual de combustible. Nuestra calculadora hace esto automáticamente y también muestra los costos mensuales y diarios.",
  },
  {
    question: "¿Cuánto cuesta la gasolina por mes para el estadounidense promedio?",
    answer:
      "El estadounidense promedio maneja aproximadamente 13,500 millas por año en un vehículo que obtiene 28 MPG, gastando aproximadamente $1,660–$1,800 por año en gasolina a $3.45/galón — alrededor de $138–$150/mes. Los conductores de alto kilometraje o aquellos con vehículos menos eficientes en combustible pueden gastar $200–$400/mes.",
  },
  {
    question: "¿Vale la pena comprar un auto más eficiente en combustible para ahorrar en gasolina?",
    answer:
      "Depende del precio extra y tu kilometraje anual. Usa el modo comparación: ingresa tu MPG actual y el MPG del nuevo vehículo, más la diferencia de precio. La calculadora muestra el ahorro anual y el punto de equilibrio en meses. Al kilometraje promedio de EE. UU., un precio extra de $5,000 por un vehículo que obtiene 15 MPG más típicamente se recupera en 4–7 años a los precios actuales de gasolina.",
  },
  {
    question: "¿Cómo calculo el costo de combustible para un viaje por carretera?",
    answer:
      "Cambia al modo de viaje por carretera, ingresa la distancia total del viaje en millas, el MPG de tu vehículo y el precio de la gasolina. La calculadora devuelve los galones totales necesarios y el costo total de combustible. Para un viaje redondo, duplica la distancia de ida. Recuerda que el manejo en carretera a menudo logra 10–20% mejor eficiencia de combustible que la calificación EPA combinada.",
  },
  {
    question: "¿Qué MPG debería esperar de un auto usado?",
    answer:
      "El MPG del mundo real típicamente corre 5–15% por debajo de la etiqueta EPA debido a hábitos de manejo, terreno, clima y edad del vehículo. Vehículos más antiguos con bujías gastadas, filtros de aire sucios o llantas con baja presión pueden correr 10–20% por debajo de su eficiencia calificada. Siempre verifica el historial real de eficiencia de combustible del vehículo — un reporte de historial VIN puede revelar patrones de mantenimiento previos que afectan la eficiencia.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "es",
  mainEntity: FAQS_ES.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "es",
  headline: "Calculadora de costo de combustible por VIN",
  description:
    "Aprende cómo calcular tus costos diarios, mensuales y anuales de combustible, comparar vehículos para análisis de punto de equilibrio y mejorar tu rendimiento de combustible.",
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
    { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/es` },
    { "@type": "ListItem", position: 2, name: "Calculadora de costo de combustible", item: PAGE_URL },
  ],
};

export { FAQS_ES };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <GasMileageCalculatorBody locale="es" />
    </>
  );
}
