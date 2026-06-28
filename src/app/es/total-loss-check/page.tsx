/**
 * Wave 18 batch 3 — Spanish /total-loss-check. Same full layout as English via
 * the shared TotalLossCheckBody. Replaces the prior SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import TotalLossCheckBody, { FAQS_ES } from "@/components/TotalLossCheckBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/es/total-loss-check`;
const alt = hreflangAlternatesForLocale("/total-loss-check", "es");
const title = "Verificación de pérdida total por VIN — ¿Este auto fue declarado pérdida total? (Búsqueda gratis de pago de seguro)";
const description = "Verifica si un auto fue declarado pérdida total por el seguro — gratis, por VIN. Muestra registros de pago de seguro, declaraciones de pérdida total, marcas de salvamento y reconstruido, y daño estructural desde NMVTIS, DMV estatales y subastas de salvamento antes de comprar.";

export const metadata: Metadata = {
  title, description,
  keywords: ["verificación pérdida total VIN", "este auto fue pérdida total", "es este auto una pérdida total", "pago de seguro VIN", "verificación vehículo pérdida total", "verificar si auto fue pérdida total por VIN", "pérdida total reconstruido", "historial auto pérdida total", "pérdida total vs título salvamento", "umbral pérdida total por estado", "NMVTIS pérdida total", "registro pérdida total seguro", "verificación pérdida total gratis", "búsqueda VIN auto pérdida total"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title: "Verificación de pérdida total por VIN — ¿Este auto fue pérdida total? (Gratis)", description: "Verificación VIN gratis de declaraciones de pérdida total de seguro, marcas de salvamento y reconstruido, e historial de daño estructural. Fuente NMVTIS.", url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "es_US" },
  twitter: { card: "summary_large_image", title: "Verificación de pérdida total por VIN — ¿Este auto fue pérdida total? (Gratis)", description: "Verificación VIN gratis de declaraciones de pérdida total de seguro, marcas de salvamento/reconstruido y daño estructural. Fuente NMVTIS." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", inLanguage: "es", name: "Verificación de pérdida total por VIN", url: PAGE_URL, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Verifica si un vehículo fue declarado pérdida total por una aseguradora usando su VIN de 17 caracteres. Muestra registros de pago de seguro, marcas de título de salvamento y reconstruido, y daño estructural desde NMVTIS, DMV estatales, aseguradoras y subastas de salvamento.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", inLanguage: "es", headline: "Verificación de pérdida total por VIN — ¿Este auto fue pérdida total?", description: "Cómo verificar si un vehículo fue declarado pérdida total por el seguro, qué significa pérdida total para el valor, seguridad y estado de título, y cómo los registros de pérdida total llegan a un reporte VIN.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, datePublished: "2026-05-04", dateModified: "2026-06-25" };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "es", mainEntity: FAQS_ES.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", inLanguage: "es", name: "Cómo verificar si un auto fue declarado pérdida total por VIN", description: "Verifica si un vehículo usado fue dado de baja como pérdida total por una aseguradora antes de comprar, usando su VIN de 17 caracteres.", totalTime: "PT2M", step: [{ "@type": "HowToStep", position: 1, name: "Encuentra el VIN de 17 caracteres", text: "Lee el VIN del tablero del lado del conductor, calcomanía del marco de puerta, título o tarjeta de seguro. Confirma que tiene 17 caracteres sin letras I, O o Q." }, { "@type": "HowToStep", position: 2, name: "Ejecuta el VIN a través de la verificación de pérdida total", text: "Ingresa el VIN en la herramienta de búsqueda. Consulta NMVTIS, DMV estatales, aseguradoras y subastas de salvamento por declaraciones de pérdida total, marcas de salvamento y daño estructural." }, { "@type": "HowToStep", position: 3, name: "Lee el historial de marca de título y pérdida", text: "Busca marcas de salvamento, reconstruido, reconstituido, inundación, chatarra o no reparable y cualquier registro de pérdida total del seguro — estos confirman que el auto fue dado de baja, incluso si el título físico actual se ve limpio." }, { "@type": "HowToStep", position: 4, name: "Inspecciona antes de comprar", text: "Si aparece una marca de pérdida total o reconstruido, haz que un especialista en reparación estructural inspeccione el vehículo y confirma qué fue dañado y cómo fue reparado antes de pagar." }] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/es` }, { "@type": "ListItem", position: 2, name: "Verificación pérdida total", item: PAGE_URL }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", inLanguage: "es", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] }, url: PAGE_URL };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <TotalLossCheckBody locale="es" />
    </>
  );
}
