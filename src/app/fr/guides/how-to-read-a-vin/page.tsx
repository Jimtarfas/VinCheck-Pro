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
const title = "Comment lire un VIN — Desglose complet du VIN";
const description =
  "Apprends comment lire un numéro VIN avec nontre guide étape a étape. Entiende les 17 chiffres du VIN, incluant les secciones WMI, VDS et VIS, et le que significa chaque position.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "comment lire un VIN",
    "desglose du numéro VIN",
    "significado de les chiffres du VIN",
    "guide décodeura de VIN",
    "VIN de 17 chiffres explicado",
    "WMI VDS VIS",
    "significado de les posiciones du VIN",
    "leer numéro de identification du véhicule",
    "tabla de année du VIN",
    "code de année modèle du VIN",
    "chiffre 10 du VIN année",
    "tabla de codes de année du VIN",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title: "Comment lire un numéro VIN — Guide complet de desglose du VIN",
    description:
      "Apprends comment lire un numéro VIN avec nontre guide étape a étape. Entiende les 17 chiffres du VIN et le que significa chaque position.",
    url: PAGE_URL,
    type: "article",
    siteName: "CarCheckerVIN",
    locale: "fr_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description:
      "Guide étape a étape pour lire un VIN de 17 caractères: WMI, VDS, VIS, chiffre de vérification, année modèle, planta de ensamblaje et numéro de êtreie.",
  },
  robots: { index: true, follow: true },
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  inLanguage: "fr",
  name: "Comment lire un numéro VIN",
  description:
    "Una guide étape a étape pour lire et entender les 17 caractères de un Numéro de Identification Vehicular (VIN).",
  step: [
    {
      "@type": "HowToStep",
      name: "Identifica le identificador mundial du fabricante (posiciones 1-3)",
      text: "Les premieros trois caractères façonn le WMI. La position 1 indica le pays de fabrication, la position 2 identifica al fabricante et la position 3 denonta le tipo de véhicule ou la división de fabrication.",
    },
    {
      "@type": "HowToStep",
      name: "Lis la section descriptora du véhicule (posiciones 4-8)",
      text: "Les posiciones 4 a 8 façonn le VDS. Estos chiffres codifican atributos du véhicule como le estilo de carrosêtreie, tipo de moteur, modèle et êtreie. Le significado exacto varie selon le fabricante.",
    },
    {
      "@type": "HowToStep",
      name: "Vérifie le chiffre de vérification (position 9)",
      text: "La position 9 es le chiffre de vérification, un valeur calcucôté usado pour vérifier que le VIN sea legítimo. Se deriva en utilisant una formule matemática pondétaitda aplicada a todeux les deplus caractères.",
    },
    {
      "@type": "HowToStep",
      name: "Determine le année modèle (position 10)",
      text: "La position 10 representa le année modèle en utilisant un code estandarizado de letra ou numéro. Par ejemplo, R representa 2024, S representa 2025 et T representa 2026.",
    },
    {
      "@type": "HowToStep",
      name: "Trouve la planta de ensamblaje (position 11)",
      text: "La position 11 es un code asignado par le fabricante pour identificar la planta de ensamblaje spécifique où se construyó le véhicule.",
    },
    {
      "@type": "HowToStep",
      name: "Lis le numéro de séquence de production (posiciones 12-17)",
      text: "Les derniers six caractères son le numéro de êtreie de production asignado al véhicule a medida que sale de la ligne de ensamblaje. Esto le da a chaque véhicule su identificador unique.",
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
