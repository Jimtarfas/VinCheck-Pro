import type { Metadata } from "next";
import GuideVinDecodingMasterBody, { FAQS_FR } from "@/components/GuideVinDecodingMasterBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/guides/vin-decoding-master-guide`;
const alt = hreflangAlternatesForLocale("/guides/vin-decoding-master-guide", "fr");

const title = "Décodage de VIN: Les 17 caracteres explicadeux (2026)";
const description =
  "Décode cada position de un VIN de 17 caracteres: WMI, VDS, dígito de vérification, codes de année modelo, codes de planta et numéros de êtreie. La guide plus complète de décodeur de VIN en la web.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "guide décodage VIN",
    "décoder VIN",
    "significado numéro VIN",
    "que te dice un VIN",
    "VIN 17 caracteres",
    "significado position VIN",
    "code WMI",
    "VDS VIN",
    "dígito vérification VIN",
    "code année modelo VIN",
    "code planta VIN",
    "numéro êtreie VIN",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title: "Décodage de VIN: La guide maestra de les 17 caracteres",
    description:
      "Desglose position par position du VIN de 17 caracteres: WMI, VDS, dígito de vérification, codes de année, codes de planta et plus.",
    url: PAGE_URL,
    type: "article",
    siteName: "CarCheckerVIN",
    locale: "fr_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description:
      "Desglose position par position du VIN de 17 caracteres: WMI, VDS, dígito de vérification, codes de année, codes de planta et plus.",
  },
  robots: { index: true, follow: true },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "fr",
  headline: "Décodage de VIN: La guide maestra de les 17 caracteres",
  description:
    "Desglose complet position par position du Numéro de Identification Vehicular de 17 caracteres, incluant WMI, VDS, dígito de vérification, codes de année et codes de planta.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: {
      "@type": "ImageObject",
      url: `${SITE}/logo.png`,
    },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": PAGE_URL,
  },
  datePublished: "2026-04-23",
  dateModified: "2026-06-25",
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  inLanguage: "fr",
  name: "Comment décoder un VIN de 17 caracteres",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Identifica le WMI",
      text: "Les premieros trois caracteres identifican al fabricante mundial (país, fabricante, tipo de véhicule).",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Lis le VDS",
      text: "Les posiciones 4 a 8 describen les atributos du véhicule: modelo, carrosêtreie, sistema de rétention, moteur.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Valida le dígito de vérification",
      text: "La position 9 es un dígito de validation basado en matemáticas. Si nonn se valida, le VIN es inválido ou se transcribió incorrectement.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Identifica le année modelo",
      text: "La position 10 codifica le année modelo en utilisant un alfabeto cíclico de 30 années de letras et dígitos.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Identifica le code de planta",
      text: "La position 11 identifica la planta de fabrication où se ensambló le véhicule.",
    },
    {
      "@type": "HowToStep",
      position: 6,
      name: "Lis le numéro de êtreie",
      text: "Les posiciones 12 a 17 son le numéro de êtreie unique de production pour ese véhicule específico.",
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

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` },
    { "@type": "ListItem", position: 2, name: "Guías", item: `${SITE}/fr/guides` },
    { "@type": "ListItem", position: 3, name: "Guía maestra de décodage de VIN", item: PAGE_URL },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
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
      <GuideVinDecodingMasterBody locale="fr" />
    </>
  );
}
