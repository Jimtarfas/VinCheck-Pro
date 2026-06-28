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
const title = "Vérification de garantie par VIN — Este auto sigue bajo garantie? (Vista previa gratuit de cobertura)";
const description = "Verifica si un auto sigue bajo garantie par VIN avec vista previa gratuit. Encuentra la fecha de puesta en service et ve la cobertura restante de defensa a defensa, tren motriz, corrosión, emisiones, batería EV et CPO antes de acheter. Confirma límites exactos avec le fabricante.";

export const metadata: Metadata = {
  title, description,
  keywords: ["vérification de garantie par VIN", "mi auto sigue bajo garantie", "este auto está bajo garantie", "búsqueda de garantie de véhicule", "vérifier garantie de auto par VIN", "vérification garantie tren motriz", "garantie defensa a defensa", "garantie CPO VIN", "vérification garantie restante", "transferencia garantie fabricante", "búsqueda fecha de puesta en service", "vérification garantie batería EV", "garantie extendida vs fabricante", "vista previa vérification garantie gratuit"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title: "Vérification de garantie par VIN — Este auto sigue bajo garantie? (Vista previa gratuit)", description: "Vista previa gratuit de una búsqueda de garantie basada en VIN. Encuentra la fecha de puesta en service et la cobertura restante de fabricante, tren motriz, corrosión, emisiones, batería EV et CPO.", url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "fr_US" },
  twitter: { card: "summary_large_image", title: "Vérification de garantie par VIN — Este auto sigue bajo garantie? (Vista previa gratuit)", description: "Recherche de garantie VIN avec vista previa gratuit: fecha de puesta en service, cobertura de fabricante/tren motriz restante, état CPO et reglas de transferencia." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", inLanguage: "fr", name: "Vérification de garantie par VIN", url: PAGE_URL, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Verifica le état de la garantie de un véhicule par su VIN de 17 caracteres. Recupera la fecha de puesta en service et aide a estimar la cobertura restante de defensa a defensa, tren motriz, corrosión, emisiones, batería EV et CPO. Límites exactos confirmadeux avec le fabricante.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", inLanguage: "fr", headline: "Vérification de garantie par VIN — Este auto sigue bajo garantie?", description: "Comment vérifier le état de la garantie par VIN, qué incluye cada cobertura de fabricante, comment la fecha de puesta en service et le kilométrage determinan la cobertura restante, reglas de transferencia et qué anula una garantie de fabricante.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, datePublished: "2026-05-04", dateModified: "2026-06-25" };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "fr", mainEntity: FAQS_FR.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", inLanguage: "fr", name: "Comment vérifier si un auto sigue bajo garantie par VIN", description: "Estima la cobertura de garantie de fabricante restante de un véhicule usado usando su VIN de 17 caracteres et kilométrage actual antes de acheter.", totalTime: "PT2M", step: [{ "@type": "HowToStep", position: 1, name: "Encuentra le VIN de 17 caracteres", text: "Lee le VIN du tablero du lado du conductor, la calcomanía du marco de puerta, le titre ou le enregistrement. Confirma que tiene 17 caracteres sans les letras I, O, ou Q." }, { "@type": "HowToStep", position: 2, name: "Ejecuta la vérification de garantie par VIN", text: "Ingresa le VIN en la outil de búsqueda pour recuperar la fecha de puesta en service et les detalles du véhicule. Le reloj de la garantie comienza desde la fecha de puesta en service, no desde le année du modelo." }, { "@type": "HowToStep", position: 3, name: "Compara tiempo et kilométrage avec les límites", text: "Para cada cobertura, resta le tiempo transcurrido du límite de tiempo et le kilométrage actual du límite de kilométrage. Lo que se agote premiero termina esa cobertura — defensa a defensa generalmente expira antes que le tren motriz." }, { "@type": "HowToStep", position: 4, name: "Confirma avec le fabricante", text: "Verifica la cobertura exacta restante et n’importe quel extensión CPO ou de contrato de service avec le fabricante ou un distribuidor autorizado, ya que consultationtiontiontiontiontionn la base de données oficial de garantie vinculada al VIN." }] };
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
