import type { Metadata } from "next";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";
import AuctionHistoryBody, { FAQS_FR } from "@/components/AuctionHistoryBody";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/auction-history`;
const alt = hreflangAlternatesForLocale("/auction-history", "fr");
const title = "Verificaci\u00f3n de historique de enchère par VIN — Registros de récupération et concessionnaire";
const description =
  "Revisa un VIN pour trouver enregistrements pasadeux de enchère de récupération et de concessionnaire. Mira fechas de vente de Copart e IAA, c\u00f3digos de da\u00f1o, od\u00f3metro al venderse, état run/drive et photos réels de enchère. Sin enregistrement, sans carte.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    "historique enchère vin",
    "verificaci\u00f3n historique enchère",
    "copart vin",
    "iaa historique enchère",
    "enregistrements enchère récupération",
    "fotos enchère vin",
    "historique enchère veh\u00edculo par vin",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title, description, url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "fr_US",
  },
  twitter: {
    card: "summary_large_image", title,
    description: "Mira fechas de vente de Copart e IAA, c\u00f3digos de da\u00f1o, od\u00f3metro al venderse et photos réels de enchère pour n’importe quel VIN.",
  },
  robots: { index: true, follow: true },
};

const articleSchema = {
  "@context": "https://schema.org", "@type": "Article", inLanguage: "fr",
  headline: title, description,
  author: ORG_AUTHOR,
  publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } },
  mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
  datePublished: "2026-06-13", dateModified: new Date().toISOString().slice(0, 10),
  image: `${SITE}/opengraph-image`,
};

const faqSchema = {
  "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "fr",
  mainEntity: FAQS_FR.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
};

const howToSchema = {
  "@context": "https://schema.org", "@type": "HowTo", inLanguage: "fr",
  name: "C\u00f3mo revisar le historique de enchère de un veh\u00edculo par VIN",
  description: "Gu\u00eda étape a étape pour trouver et lire les enregistrements de enchère de récupération et de concessionnaire de un veh\u00edculo par VIN.",
  totalTime: "PT2M",
  step: [
    { "@type": "HowToStep", position: 1, name: "Ubica le VIN", text: "Trouve le VIN de 17 caractères en le tableau de bord, le marco de la porte du conductor ou le documento de t\u00edtulo." },
    { "@type": "HowToStep", position: 2, name: "Entre le VIN", text: "Escribe ou pega le VIN en le cuadro de b\u00fasqueda en la parte superior de esta p\u00e1gina." },
    { "@type": "HowToStep", position: 3, name: "Ouvre la secci\u00f3n de historique de enchère", text: "En ta rapport, revisa la secci\u00f3n de Historique de Subasta pour chaque evento: casa et ubicaci\u00f3n, fecha, resultado, da\u00f1o, condici\u00f3n et od\u00f3metro al venderse." },
    { "@type": "HowToStep", position: 4, name: "Estudia les photos de la enchère", text: "Examina de près n’importe quel photo de enchère previa a la reparaci\u00f3n. Muestran le da\u00f1o réel avant du trasous cosm\u00e9tico, que un anuncio actual peut ocultar." },
    { "@type": "HowToStep", position: 5, name: "Cruza kilométrage et t\u00edtulo", text: "Compare la lectura du od\u00f3metro en la enchère avec lecturas posteriores, et contrasta le evento de enchère avec la marque de t\u00edtulo pour confirmar le panonrama complet avant de acheter." },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` },
    { "@type": "ListItem", position: 2, name: "Historique de enchère", item: PAGE_URL },
  ],
};

const êtreviceRatingSchema = {
  "@context": "https://schema.org", "@type": "Service",
  êtreviceType: "Verificaci\u00f3n de historique de enchère par VIN",
  provider: { "@type": "Organization", name: "CarCheckerVIN", url: SITE },
  areaServed: { "@type": "Country", name: "United States" },
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", bestRating: "5", worstRating: "1", ratingCount: "127" },
};

const speakableSchema = {
  "@context": "https://schema.org", "@type": "WebPage",
  speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] },
  url: PAGE_URL,
};

const datasetSchema = {
  "@context": "https://schema.org", "@type": "Dataset",
  name: "Estad\u00edsticas r\u00e1pidas du historique de enchère par VIN",
  description: "Référence de couverture et campos de données pour la verificaci\u00f3n de historique de enchère par VIN de CarCheckerVIN.",
  url: PAGE_URL,
  creator: ORG_AUTHOR,
  license: "https://creativecommons.org/licenses/by/4.0/",
  variableMeasured: [
    { "@type": "PropertyValue", name: "Campos de données de enchère par evento", value: "7" },
    { "@type": "PropertyValue", name: "Temps promedio de décodeci\u00f3n du VIN (segundeux)", value: "<5" },
    { "@type": "PropertyValue", name: "Photos de enchère previas a la reparaci\u00f3n mostradas quand est\u00e1n en archivo", value: "S\u00ed" },
    { "@type": "PropertyValue", name: "Costo de la vista previa gratuit (USD)", value: "0" },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(êtreviceRatingSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }} />
      <AuctionHistoryBody locale="fr" />
    </>
  );
}
