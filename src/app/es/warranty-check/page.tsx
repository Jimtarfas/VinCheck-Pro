/**
 * Wave 18 batch 3 — Spanish warranty-check. Same full layout via the shared
 * WarrantyCheckBody. Replaces the prior SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import WarrantyCheckBody, { FAQS_ES } from "@/components/WarrantyCheckBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/es/warranty-check`;
const alt = hreflangAlternatesForLocale("/warranty-check", "es");
const title = "Verificación de garantía por VIN — ¿Este auto sigue bajo garantía? (Vista previa gratis de cobertura)";
const description = "Verifica si un auto sigue bajo garantía por VIN con vista previa gratis. Encuentra la fecha de puesta en servicio y ve la cobertura restante de defensa a defensa, tren motriz, corrosión, emisiones, batería EV y CPO antes de comprar. Confirma límites exactos con el fabricante.";

export const metadata: Metadata = {
  title, description,
  keywords: ["verificación de garantía por VIN", "mi auto sigue bajo garantía", "este auto está bajo garantía", "búsqueda de garantía de vehículo", "verificar garantía de auto por VIN", "verificación garantía tren motriz", "garantía defensa a defensa", "garantía CPO VIN", "verificación garantía restante", "transferencia garantía fabricante", "búsqueda fecha de puesta en servicio", "verificación garantía batería EV", "garantía extendida vs fabricante", "vista previa verificación garantía gratis"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title: "Verificación de garantía por VIN — ¿Este auto sigue bajo garantía? (Vista previa gratis)", description: "Vista previa gratis de una búsqueda de garantía basada en VIN. Encuentra la fecha de puesta en servicio y la cobertura restante de fabricante, tren motriz, corrosión, emisiones, batería EV y CPO.", url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "es_US" },
  twitter: { card: "summary_large_image", title: "Verificación de garantía por VIN — ¿Este auto sigue bajo garantía? (Vista previa gratis)", description: "Búsqueda de garantía VIN con vista previa gratis: fecha de puesta en servicio, cobertura de fabricante/tren motriz restante, estado CPO y reglas de transferencia." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", inLanguage: "es", name: "Verificación de garantía por VIN", url: PAGE_URL, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Verifica el estado de la garantía de un vehículo por su VIN de 17 caracteres. Recupera la fecha de puesta en servicio y ayuda a estimar la cobertura restante de defensa a defensa, tren motriz, corrosión, emisiones, batería EV y CPO. Límites exactos confirmados con el fabricante.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", inLanguage: "es", headline: "Verificación de garantía por VIN — ¿Este auto sigue bajo garantía?", description: "Cómo verificar el estado de la garantía por VIN, qué incluye cada cobertura de fabricante, cómo la fecha de puesta en servicio y el kilometraje determinan la cobertura restante, reglas de transferencia y qué anula una garantía de fabricante.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, datePublished: "2026-05-04", dateModified: new Date().toISOString().slice(0, 10) };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "es", mainEntity: FAQS_ES.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", inLanguage: "es", name: "Cómo verificar si un auto sigue bajo garantía por VIN", description: "Estima la cobertura de garantía de fabricante restante de un vehículo usado usando su VIN de 17 caracteres y kilometraje actual antes de comprar.", totalTime: "PT2M", step: [{ "@type": "HowToStep", position: 1, name: "Encuentra el VIN de 17 caracteres", text: "Lee el VIN del tablero del lado del conductor, la calcomanía del marco de puerta, el título o el registro. Confirma que tiene 17 caracteres sin las letras I, O, o Q." }, { "@type": "HowToStep", position: 2, name: "Ejecuta la verificación de garantía por VIN", text: "Ingresa el VIN en la herramienta de búsqueda para recuperar la fecha de puesta en servicio y los detalles del vehículo. El reloj de la garantía comienza desde la fecha de puesta en servicio, no desde el año del modelo." }, { "@type": "HowToStep", position: 3, name: "Compara tiempo y kilometraje con los límites", text: "Para cada cobertura, resta el tiempo transcurrido del límite de tiempo y el kilometraje actual del límite de kilometraje. Lo que se agote primero termina esa cobertura — defensa a defensa generalmente expira antes que el tren motriz." }, { "@type": "HowToStep", position: 4, name: "Confirma con el fabricante", text: "Verifica la cobertura exacta restante y cualquier extensión CPO o de contrato de servicio con el fabricante o un distribuidor autorizado, ya que consultan la base de datos oficial de garantía vinculada al VIN." }] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/es` }, { "@type": "ListItem", position: 2, name: "Verificación de garantía", item: PAGE_URL }] };
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
      <WarrantyCheckBody locale="es" />
    </>
  );
}
