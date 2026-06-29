/**
 * Wave 18 batch 3 — French warranty-check. Same full layout via the shared
 * WarrantyCheckBody. Replaces the prior SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import WarrantyCheckBody, { FAQS_FR } from "@/components/WarrantyCheckBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/warranty-check`;
const alt = hreflangAlternatesForLocale("/warranty-check", "fr");
const title = "Vérification de garantie par VIN — Este auto sigue sous garantie? (Vista previa gratuit de couverture)";
const description = "Vérifie si un auto sigue sous garantie par VIN avec vista previa gratuit. Trouve la fecha de puesta en êtrevice et ve la couverture restante de defensa a defensa, tren motriz, corrosion, emisiones, batterie EV et CPO avant de acheter. Confirme limites exactos avec le fabricante.";

export const metadata: Metadata = {
  title, description,
  keywords: ["vérification de garantie par VIN", "mi auto sigue sous garantie", "este auto est sous garantie", "recherche de garantie de véhicule", "vérifier garantie de auto par VIN", "vérification garantie tren motriz", "garantie defensa a defensa", "garantie CPO VIN", "vérification garantie restante", "transfert garantie fabricante", "recherche fecha de puesta en êtrevice", "vérification garantie batterie EV", "garantie extendida vs fabricante", "vista previa vérification garantie gratuit"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title: "Vérification de garantie par VIN — Este auto sigue sous garantie? (Vista previa gratuit)", description: "Vista previa gratuit de una recherche de garantie basada en VIN. Trouve la fecha de puesta en êtrevice et la couverture restante de fabricante, tren motriz, corrosion, emisiones, batterie EV et CPO.", url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "fr_US" },
  twitter: { card: "summary_large_image", title: "Vérification de garantie par VIN — Este auto sigue sous garantie? (Vista previa gratuit)", description: "Recherche de garantie VIN avec vista previa gratuit: fecha de puesta en êtrevice, couverture de fabricante/tren motriz restante, état CPO et reglas de transfert." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", inLanguage: "fr", name: "Vérification de garantie par VIN", url: PAGE_URL, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Vérifie le état de la garantie de un véhicule par su VIN de 17 caractères. Récupéré la fecha de puesta en êtrevice et aide a estimar la couverture restante de defensa a defensa, tren motriz, corrosion, emisiones, batterie EV et CPO. Limites exactos confirmadeux avec le fabricante.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", inLanguage: "fr", headline: "Vérification de garantie par VIN — Este auto sigue sous garantie?", description: "Comment vérifier le état de la garantie par VIN, que inclut chaque couverture de fabricante, comment la fecha de puesta en êtrevice et le kilométrage determinan la couverture restante, reglas de transfert et que anula una garantie de fabricante.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, datePublished: "2026-05-04", dateModified: new Date().toISOString().slice(0, 10) };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "fr", mainEntity: FAQS_FR.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", inLanguage: "fr", name: "Comment vérifier si un auto sigue sous garantie par VIN", description: "Estima la couverture de garantie de fabricante restante de un véhicule usado en utilisant su VIN de 17 caractères et kilométrage actual avant de acheter.", totalTime: "PT2M", step: [{ "@type": "HowToStep", position: 1, name: "Trouve le VIN de 17 caractères", text: "Lis le VIN du tableau de bord du côté du conductor, la autocollant du marco de porte, le titre ou le enregistrement. Confirme que a 17 caractères sans les letras I, O, ou Q." }, { "@type": "HowToStep", position: 2, name: "Ejecuta la vérification de garantie par VIN", text: "Entre le VIN en la outil de recherche pour récupérér la fecha de puesta en êtrevice et les detalles du véhicule. Le reloj de la garantie commence desde la fecha de puesta en êtrevice, non desde le année du modèle." }, { "@type": "HowToStep", position: 3, name: "Compare temps et kilométrage avec les limites", text: "Para chaque couverture, resta le temps transcurrido du limite de temps et le kilométrage actual du limite de kilométrage. Lo que se agote premiero termine esa couverture — defensa a defensa genétaitlmente expira avant que le tren motriz." }, { "@type": "HowToStep", position: 4, name: "Confirme avec le fabricante", text: "Vérifie la couverture exacta restante et n’importe quel extensión CPO ou de contrato de êtrevice avec le fabricante ou un distribuidor autorizado, ya que consultatioptiontioptiontioptionn la base de données oficial de garantie vinculada al VIN." }] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` }, { "@type": "ListItem", position: 2, name: "Vérification de garantie", item: PAGE_URL }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] }, url: PAGE_URL };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <WarrantyCheckBody locale="fr" />
    </>
  );
}
