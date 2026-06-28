/**
 * Wave 18b — French car-history-report-guide. Same full layout via the shared
 * GuideCarHistoryReportBody. Replaces the Wave 15 SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import GuideCarHistoryReportBody, { FAQS_FR } from "@/components/GuideCarHistoryReportBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/guides/car-history-report-guide`;
const alt = hreflangAlternatesForLocale("/guides/car-history-report-guide", "fr");

const title = "Rapports de historique de véhicule: todo le que necesitas saber (2026)";
const description =
  "Que cona un rapport de historique de véhicule, de où provienen les données (NMVTIS, NICB, NHTSA), comment leerlo et comment se comparan proveedores como Carfax, AutoCheck et CarCheckerVIN.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "rapport de historique de véhicule",
    "vérification de historique du auto",
    "guide alternative a carfax",
    "rapport de historique de véhicule explicado",
    "rapport nmvtis",
    "nicb vincheck",
    "autocheck vs carfax",
    "que cona un rapport de historique du auto",
    "comment lire un rapport de historique de véhicule",
    "rapport de historique vin",
    "meilleur rapport de historique de véhicule 2026",
    "comparaison de rapports de historique du auto",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title: "Rapports de historique de véhicule: todo le que necesitas saber",
    description:
      "Guide complet sur rapports de historique de véhicule: a éténtes de données, que buscar, comment lire unonn et comment se comparan les proveedores.",
    url: PAGE_URL,
    type: "article",
    siteName: "CarCheckerVIN",
    locale: "fr_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description:
      "Guide complet sur rapports de historique de véhicule: NMVTIS, NICB, NHTSA et comment lire un rapport.",
  },
  robots: { index: true, follow: true },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "fr",
  headline: "Rapports de historique de véhicule: todo le que necesitas saber (2026)",
  description:
    "Todo en un rapport de historique de véhicule explicado: données de NMVTIS, vérificationes NICB, rappels de sécurité du fabricante, valeur de marché, comment lire un rapport et comment comparar proveedores.",
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
  name: "Comment lire un rapport de historique de véhicule",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Vérifie le VIN et les especificaciones básicas",
      text: "Confirme que le VIN du encabezado du rapport coincida avec la plaque du tableau de bord du véhicule et la calcomanía du marco de la porte.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Revisa le historique de titre et marques",
      text: "Busca n’importe quel marque de récupération, reconstruido, inondation, chatarra ou citron en cada état de titre registrado.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Vérifie la cadena du odomètre",
      text: "Vérifie que cada kilométrage registrado tienda al alza et coincida avec le que est en le odomètre actual.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Revisa les enregistrements de accidents et dégâtss",
      text: "Lis la gravedad, le despliegue de bolsas de aire et les indicadores de réparation estructural pour cada incident registrado.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Revisa le historique de êtrevice et propriété",
      text: "Busca intervalos de êtrevice consistentes et un numéro razonable de propriétaires previos.",
    },
    {
      "@type": "HowToStep",
      position: 6,
      name: "Cruza les rappels de sécurité ouverts",
      text: "Vérifie n’importe quel rappel de sécurité ouvert de NHTSA et confirme si han été complètedeux.",
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
  inLanguage: "fr",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` },
    { "@type": "ListItem", position: 2, name: "Guías", item: `${SITE}/fr/guides` },
    { "@type": "ListItem", position: 3, name: "Guía du rapport de historique de véhicule", item: PAGE_URL },
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
      <GuideCarHistoryReportBody locale="fr" />
    </>
  );
}
