/**
 * Wave 18 batch 3 — Spanish vehicle-lien-check. Same full English layout via
 * the shared VehicleLienCheckBody. Replaces the prior SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import VehicleLienCheckBody, { FAQS_ES } from "@/components/VehicleLienCheckBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/es/vehicle-lien-check`;
const alt = hreflangAlternatesForLocale("/vehicle-lien-check", "es");
const title = "Verificación gratis de gravamen vehicular — Encuentra préstamos, gravámenes y recuperaciones ocultos por VIN";
const description = "Verifica cualquier vehículo en busca de gravámenes ocultos, préstamos pendientes, registros de recuperación e historial de venta antes de comprar — gratis. Búsqueda de gravamen basada en VIN que te protege de heredar la deuda de otra persona.";

export const metadata: Metadata = {
  title, description,
  keywords: ["verificación gravamen vehicular", "verificación gravamen auto", "verificación gravamen gratis", "verificar auto por gravamen", "búsqueda gravamen vehicular", "verificación gravamen VIN", "verificación gravamen préstamo auto", "verificar vehículo por gravámenes", "búsqueda gratis gravamen auto", "verificación gravamen por VIN", "búsqueda gravamen gratis", "verificación préstamo pendiente auto", "búsqueda titular gravamen", "verificación gravamen DMV", "historial recuperación auto", "verificación recuperación vehículo", "verificación gravamen título", "titular gravamen por VIN", "hay gravamen en mi auto", "verificar gravamen antes de comprar", "encontrar gravamen vehículo", "búsqueda gratis gravamen vehículo", "verificación liberación titular gravamen", "verificación financiamiento auto", "búsqueda gratis financiamiento auto"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "es_US" },
  twitter: { card: "summary_large_image", title, description: "Búsqueda gratis de gravamen basada en VIN. Encuentra préstamos, gravámenes y registros de recuperación ocultos antes de comprar." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", inLanguage: "es", name: "Verificación de gravamen vehicular", url: PAGE_URL, applicationCategory: "UtilitiesApplication", operatingSystem: "Any", description: "Verificación gratis de gravamen vehicular basada en VIN. Muestra gravámenes de préstamos para auto, gravámenes mecánicos, gravámenes de almacenamiento, gravámenes fiscales, gravámenes de sentencia e historial de recuperación.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", inLanguage: "es", headline: "Verificación gratis de gravamen vehicular por VIN", description: "Cómo verificar un vehículo en busca de gravámenes ocultos por VIN, los seis tipos de gravamen que bloquean una transferencia de título, banderas rojas de un gravamen no divulgado y cómo cerrar de forma segura si encuentras uno.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, datePublished: "2026-05-04", dateModified: new Date().toISOString().slice(0, 10) };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "es", mainEntity: FAQS_ES.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", inLanguage: "es", name: "Cómo verificar un vehículo por gravamen", description: "Ejecuta una verificación gratis de gravamen basada en VIN en cuatro pasos: ingresa el VIN, consulta los registros de DMV estatal y de prestamistas, revisa el titular y estado del gravamen, y sigue un plan de protección.", totalTime: "PT2M", estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: "0" }, step: [{ "@type": "HowToStep", position: 1, name: "Ingresa el VIN de 17 caracteres", text: "Localiza el Número de Identificación del Vehículo de 17 caracteres en el tablero, marco de la puerta del conductor o documento del título, luego ingrésalo en el cuadro de búsqueda en la parte superior de la página." }, { "@type": "HowToStep", position: 2, name: "Consultamos registros de DMV estatal y prestamistas", text: "Cruzamos el VIN contra registros de marca de título de DMV estatales, NMVTIS, presentaciones UCC-1 y registros reportados de prestamistas para mostrar cualquier gravamen activo o histórico." }, { "@type": "HowToStep", position: 3, name: "Revisa el titular del gravamen y el estado actual", text: "El reporte muestra el nombre del titular del gravamen, el tipo de gravamen, cuándo se presentó y si está actualmente activo o ha sido liberado. Los gravámenes activos requieren liquidación antes de que el título pueda transferirse a ti." }, { "@type": "HowToStep", position: 4, name: "Sigue tu plan de protección", text: "Si un gravamen está activo, solicita una carta de pago final del gravamen, usa un servicio de depósito en garantía o cierra el trato directamente en la oficina del prestamista. Si el vendedor no puede o no quiere cooperar, aléjate." }] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/es` }, { "@type": "ListItem", position: 2, name: "Verificación de gravamen vehicular", item: PAGE_URL }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", inLanguage: "es", name: "Verificación gratis de gravamen vehicular", url: PAGE_URL, speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro", ".speakable-faq"] } };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <VehicleLienCheckBody locale="es" />
    </>
  );
}
