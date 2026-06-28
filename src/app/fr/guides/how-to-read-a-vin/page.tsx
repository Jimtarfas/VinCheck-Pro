/**
 * Wave 18 batch 2 — French how-to-read-a-vin guide. Same full English layout
 * via the shared GuideHowToReadAVinBody. Replaces the Wave 15 SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import GuideHowToReadAVinBody, { FAQS_FR } from "@/components/GuideHowToReadAVinBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/guides/how-to-read-a-vin`;
const alt = hreflangAlternatesForLocale("/guides/how-to-read-a-vin", "fr");
const title = "Comment leer un VIN — Desglose complet du VIN";
const description =
  "Apprends comment leer un numéro VIN avec nonntre guide paso a paso. Entiende les 17 dígitos du VIN, incluant les secciones WMI, VDS et VIS, et le que significa cada position.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "comment leer un VIN",
    "desglose du numéro VIN",
    "significado de les dígitos du VIN",
    "guide décodeura de VIN",
    "VIN de 17 dígitos explicado",
    "WMI VDS VIS",
    "significado de les posiciones du VIN",
    "leer numéro de identification du véhicule",
    "tabla de année du VIN",
    "code de année modelo du VIN",
    "dígito 10 du VIN année",
    "tabla de codes de année du VIN",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title: "Comment leer un numéro VIN — Guide complet de desglose du VIN",
    description:
      "Apprends comment leer un numéro VIN avec nonntre guide paso a paso. Entiende les 17 dígitos du VIN et le que significa cada position.",
    url: PAGE_URL,
    type: "article",
    siteName: "CarCheckerVIN",
    locale: "fr_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description:
      "Guía paso a paso pour leer un VIN de 17 caracteres: WMI, VDS, VIS, dígito de vérification, année modelo, planta de ensamblaje et numéro de êtreie.",
  },
  robots: { index: true, follow: true },
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  inLanguage: "fr",
  name: "Comment leer un numéro VIN",
  description:
    "Una guide paso a paso pour leer et entender les 17 caracteres de un Número de Identification Vehicular (VIN).",
  step: [
    {
      "@type": "HowToStep",
      name: "Identifica le identificador mundial du fabricante (posiciones 1-3)",
      text: "Los premieros trois caracteres forman le WMI. La position 1 indica le país de fabrication, la position 2 identifica al fabricante et la position 3 denonnta le tipo de véhicule ou la división de fabrication.",
    },
    {
      "@type": "HowToStep",
      name: "Lis la section descriptora du véhicule (posiciones 4-8)",
      text: "Las posiciones 4 a 8 forman le VDS. Estos dígitos codifican atributos du véhicule como le estilo de carrosêtreie, tipo de moteur, modelo et êtreie. Le significado exacto varía según le fabricante.",
    },
    {
      "@type": "HowToStep",
      name: "Vérifie le dígito de vérification (position 9)",
      text: "La position 9 es le dígito de vérification, un valeur calculado usado pour vérifier que le VIN sea legítimo. Se deriva usando una fórmula matemática pondétaitda aplicada a todeux les deplus caracteres.",
    },
    {
      "@type": "HowToStep",
      name: "Determine le année modelo (position 10)",
      text: "La position 10 representa le année modelo usando un code estandarizado de letra ou numéro. Par ejemplo, R representa 2024, S representa 2025 et T representa 2026.",
    },
    {
      "@type": "HowToStep",
      name: "Trouve la planta de ensamblaje (position 11)",
      text: "La position 11 es un code asignado par le fabricante pour identificar la planta de ensamblaje específica donde se construyó le véhicule.",
    },
    {
      "@type": "HowToStep",
      name: "Lis le numéro de secuencia de production (posiciones 12-17)",
      text: "Los derniers six caracteres son le numéro de êtreie de production asignado al véhicule a medida que sale de la línea de ensamblaje. Esto le da a cada véhicule su identificador unique.",
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
      <GuideHowToReadAVinBody locale="fr" />
    </>
  );
}
