/**
 * Wave 18 batch 3 — French /airbag-check. Same full English layout via the
 * shared AirbagCheckBody. Replaces the Wave 15 SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import AirbagCheckBody, { FAQS_FR } from "@/components/AirbagCheckBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/airbag-check`;
const alt = hreflangAlternatesForLocale("/airbag-check", "fr");
const title = "Vérification de bolsas de aire et despliegue par VIN — Historique SRS et détection de fraude (Gratuit)";
const description = "Vérifie si les bolsas de aire de un véhicule a étéron desplegadas ou reemplazadas par VIN — gratuit. Affiche enregistrements de accidents graves, perte totale et récupération, adeplus de rappels de sécurité de bolsas de aire ouverts pour detectar bolsas falsificadas et réparations SRS incomplètes avant de acheter.";

export const metadata: Metadata = {
  title, description,
  keywords: [
    "vérification bolsas de aire par VIN",
    "historique despliegue bolsa de aire",
    "vérification SRS VIN",
    "vérification fraude bolsa de aire",
    "bolsa de aire desplegada VIN",
    "vérification bolsa de aire falsificada",
    "vérification VIN rappel Takata",
    "luz avertissement SRS",
    "se se sont déployés les bolsas de aire",
    "vérification gratuit bolsa de aire",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "fr_US" },
  twitter: { card: "summary_large_image", title, description: "Historique gratuit de bolsas de aire et SRS basado en VIN. Affiche enregistrements vinculadeux a despliegue et rappels de sécurité de bolsas de aire ouverts avant de acheter." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", inLanguage: "fr", name: "Vérification de bolsas de aire et despliegue par VIN", url: PAGE_URL, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Vérifie le historique de bolsas de aire et SRS de un véhicule par su VIN de 17 caractères. Affiche enregistrements de accidents graves, perte totale de assureurs et titrois de récupération que indican despliegue probable de bolsas de aire, adeplus de rappels de sécurité de bolsas de aire ouverts de NHTSA — les signaux que exponen bolsas de aire falsificadas et réparations SRS incomplètes.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", inLanguage: "fr", headline: "Vérification de bolsas de aire et despliegue par VIN", description: "Apprends comment vérifier le historique de despliegue de bolsas de aire par VIN, par que importa, les façons comunes de fraude de bolsas de aire et comment vérifier que le sistema SRS a été restaurado correctement.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, datePublished: "2026-05-04", dateModified: "2026-06-09" };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "fr", mainEntity: FAQS_FR.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", inLanguage: "fr", name: "Comment vérifier le historique de bolsas de aire et SRS par VIN", description: "Evalúa si les bolsas de aire de un véhicule usado probablemente se se sont déployés et si le sistema SRS a été restaurado correctement, en utilisant su VIN de 17 caractères avant de acheter.", totalTime: "PT2M", step: [{ "@type": "HowToStep", position: 1, name: "Trouve le VIN de 17 caractères", text: "Lis le VIN du tableau de bord du côté du conductor, la autocollant du marco de la porte, le titre ou le enregistrement. Confirme que sea de 17 caractères sans les letras I, O ou Q." }, { "@type": "HowToStep", position: 2, name: "Ejecuta le VIN pour signaux de despliegue", text: "Entre le VIN en la outil de recherche. Affiche enregistrements de accidents graves, perte totale de assureurs et titrois de récupération que indican despliegue probable de bolsas de aire, adeplus de n’importe quel rappel de sécurité de bolsa de aire ouvert de NHTSA." }, { "@type": "HowToStep", position: 3, name: "Signala n’importe quel despliegue sans inscription de réparation", text: "Una collision frontal ou latétaitl grave en le historique sans un reemplazo correspondiente de bolsa de aire es una bandétait roja mayor de que le sistema SRS peut non haberse restaurado correctement." }, { "@type": "HowToStep", position: 4, name: "Confirme avec un escaneo diagnóstico SRS", text: "Avant de acheter, obtiens una inspection previa a la compra que lea les codes de falla SRS avec un escáner OBD-II. Jamais te bases seul en que la luz de avertissement de bolsa de aire esté apayeda — peut deshabilitarse." }] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` }, { "@type": "ListItem", position: 2, name: "Vérification de bolsas de aire", item: PAGE_URL }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", inLanguage: "fr", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] }, url: PAGE_URL };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <AirbagCheckBody locale="fr" />
    </>
  );
}
