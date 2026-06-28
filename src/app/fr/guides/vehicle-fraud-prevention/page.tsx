/**
 * Wave 18 batch 2 — ES /fr/guides/vehicle-fraud-prevention via shared body.
 */

import type { Metadata } from "next";
import GuideVehicleFraudPreventionBody, { FAQS_FR } from "@/components/GuideVehicleFraudPreventionBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/guides/vehicle-fraud-prevention`;
const alt = hreflangAlternatesForLocale("/guides/vehicle-fraud-prevention", "fr");
const title = "Prevención de fraude du véhicule: La guide definitiva 2026";
const description =
  "Comment detectar fraude de titre, manipulación du odomètre, lavado de récupération, clonación de VIN, estafas de concessionnaires et fraude en línea — avec données réeles de NICB, NMVTIS, FTC et NHTSA.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "prevención de fraude du véhicule",
    "estafas de compra de autos",
    "fraude de titre",
    "guide de fraude de odomètre",
    "clonación de VIN",
    "lavado de titre de récupération",
    "fraude auto 2026",
    "estafas voitures d’occasion",
    "estafas autos en línea",
    "fraude de concessionnaire",
    "vérification auto volé",
    "comment evitar fraude du véhicule",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title,
    description:
      "Fraude de titre, manipulación du odomètre, lavado de récupération, clonación de VIN, estafas de concessionnaires et estafas en línea — comment funciona cada una et comment defenderte.",
    url: PAGE_URL,
    type: "article",
    siteName: "CarCheckerVIN",
    locale: "fr_US",
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "fr",
  headline: "Prevención de fraude du véhicule: La guide definitiva 2026",
  description:
    "Guide complet de les estafas de fraude du véhicule incluyendo fraude de titre, manipulación du odomètre, lavado de récupération, clonación de VIN, estafas de concessionnaires et fraude en línea.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
  datePublished: "2026-04-23",
  dateModified: "2026-06-25",
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  inLanguage: "fr",
  name: "Comment protegerte du fraude du véhicule",
  description:
    "Un protocolo de six pasos pour detectar et prevenir le fraude du véhicule antes de la compra.",
  step: [
    { "@type": "HowToStep", position: 1, name: "Verifica que le VIN coincida", text: "Revisa le VIN en le tablero, la calcomanía du marco de la puerta, le titre, le enregistrement et la factura de vente. Las discrepancias indican clonación." },
    { "@type": "HowToStep", position: 2, name: "Extrae un rapport de historique de véhicule complet", text: "Utilise données provenientes de NMVTIS pour vérifier marques de titre, enregistrements de accidents et cadena de propiedad." },
    { "@type": "HowToStep", position: 3, name: "Cruza les bases de données de véhicules volés et récupération de NICB", text: "Confirma que le véhicule no haya sido reportado como volé et no sea un enregistrement de récupération reemitido en otro état." },
    { "@type": "HowToStep", position: 4, name: "Valida la continuidad du odomètre", text: "Confirma que cada lectura du odomètre registrada tienda hacia arriba a través de la cadena de titrois." },
    { "@type": "HowToStep", position: 5, name: "Paga seul mediante métodeux rastreables", text: "Cheque de caja ou transferencia bancaria desde ta banco, nunca cartes de regalo, criptomonedas ou services de escrow de terceros sugerideux par le vendeur." },
    { "@type": "HowToStep", position: 6, name: "Inspecciona le titre en persona", text: "Verifica marques de agua, sellos en relieve, et que le titre sea du état de residencia du vendeur sans alteraciones." },
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
    { "@type": "ListItem", position: 3, name: "Prevención de fraude du véhicule", item: PAGE_URL },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <GuideVehicleFraudPreventionBody locale="fr" />
    </>
  );
}
