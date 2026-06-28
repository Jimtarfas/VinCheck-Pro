/**
 * Wave 18 batch 2 — Spanish how-to-read-a-vin guide. Same full English layout
 * via the shared GuideHowToReadAVinBody. Replaces the Wave 15 SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import GuideHowToReadAVinBody, { FAQS_ES } from "@/components/GuideHowToReadAVinBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/es/guides/how-to-read-a-vin`;
const alt = hreflangAlternatesForLocale("/guides/how-to-read-a-vin", "es");
const title = "Cómo leer un VIN — Desglose completo del VIN";
const description =
  "Aprende cómo leer un número VIN con nuestra guía paso a paso. Entiende los 17 dígitos del VIN, incluyendo las secciones WMI, VDS y VIS, y lo que significa cada posición.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "cómo leer un VIN",
    "desglose del número VIN",
    "significado de los dígitos del VIN",
    "guía decodificadora de VIN",
    "VIN de 17 dígitos explicado",
    "WMI VDS VIS",
    "significado de las posiciones del VIN",
    "leer número de identificación vehicular",
    "tabla de año del VIN",
    "código de año modelo del VIN",
    "dígito 10 del VIN año",
    "tabla de códigos de año del VIN",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title: "Cómo leer un número VIN — Guía completa de desglose del VIN",
    description:
      "Aprende cómo leer un número VIN con nuestra guía paso a paso. Entiende los 17 dígitos del VIN y lo que significa cada posición.",
    url: PAGE_URL,
    type: "article",
    siteName: "CarCheckerVIN",
    locale: "es_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description:
      "Guía paso a paso para leer un VIN de 17 caracteres: WMI, VDS, VIS, dígito de verificación, año modelo, planta de ensamblaje y número de serie.",
  },
  robots: { index: true, follow: true },
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  inLanguage: "es",
  name: "Cómo leer un número VIN",
  description:
    "Una guía paso a paso para leer y entender los 17 caracteres de un Número de Identificación Vehicular (VIN).",
  step: [
    {
      "@type": "HowToStep",
      name: "Identifica el identificador mundial del fabricante (posiciones 1-3)",
      text: "Los primeros tres caracteres forman el WMI. La posición 1 indica el país de fabricación, la posición 2 identifica al fabricante y la posición 3 denota el tipo de vehículo o la división de fabricación.",
    },
    {
      "@type": "HowToStep",
      name: "Lee la sección descriptora del vehículo (posiciones 4-8)",
      text: "Las posiciones 4 a 8 forman el VDS. Estos dígitos codifican atributos del vehículo como el estilo de carrocería, tipo de motor, modelo y serie. El significado exacto varía según el fabricante.",
    },
    {
      "@type": "HowToStep",
      name: "Verifica el dígito de verificación (posición 9)",
      text: "La posición 9 es el dígito de verificación, un valor calculado usado para verificar que el VIN sea legítimo. Se deriva usando una fórmula matemática ponderada aplicada a todos los demás caracteres.",
    },
    {
      "@type": "HowToStep",
      name: "Determina el año modelo (posición 10)",
      text: "La posición 10 representa el año modelo usando un código estandarizado de letra o número. Por ejemplo, R representa 2024, S representa 2025 y T representa 2026.",
    },
    {
      "@type": "HowToStep",
      name: "Encuentra la planta de ensamblaje (posición 11)",
      text: "La posición 11 es un código asignado por el fabricante para identificar la planta de ensamblaje específica donde se construyó el vehículo.",
    },
    {
      "@type": "HowToStep",
      name: "Lee el número de secuencia de producción (posiciones 12-17)",
      text: "Los últimos seis caracteres son el número de serie de producción asignado al vehículo a medida que sale de la línea de ensamblaje. Esto le da a cada vehículo su identificador único.",
    },
  ],
};

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

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <GuideHowToReadAVinBody locale="es" />
    </>
  );
}
