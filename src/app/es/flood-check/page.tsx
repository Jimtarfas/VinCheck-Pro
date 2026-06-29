/**
 * Wave 18a — Spanish flood-check. Same full English layout via the
 * shared FloodCheckBody. Replaces the Wave 15 SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import FloodCheckBody, { FAQS_ES } from "@/components/FloodCheckBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/es/flood-check`;
const alt = hreflangAlternatesForLocale("/flood-check", "es");
const title = "Verificación de daño por inundación por VIN — ¿Este auto fue inundado? (Búsqueda gratis de daño por agua)";
const description = "Verifica cualquier auto por daño por inundación con el VIN — gratis. Muestra marcas de título por inundación y daño por agua, registros de salvamento por huracán y declaraciones de pérdida total del seguro de NMVTIS, DMV estatales y subastas de salvamento antes de comprar un vehículo dañado por agua.";

export const metadata: Metadata = {
  title, description,
  keywords: ["verificación daño inundación VIN", "historial auto inundado", "verificación daño agua VIN", "verificación título inundación", "este auto fue inundado", "verificar auto por daño inundación por VIN", "daño huracán vehículo", "título salvamento por inundación", "marca título daño agua", "verificación vehículo inundado gratis", "título inundación NMVTIS", "lavado título auto inundado"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "es_US" },
  twitter: { card: "summary_large_image", title, description: "Verificación VIN gratis para marcas de título por inundación y daño por agua, salvamento por huracán y total-loss. Fuente NMVTIS." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", inLanguage: "es", name: "Verificación de daño por inundación por VIN", url: PAGE_URL, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Verifica si un vehículo fue dañado por inundación usando su VIN de 17 caracteres. Muestra marcas de título por inundación y daño por agua, registros de salvamento por huracán y declaraciones de pérdida total del seguro de NMVTIS, DMV estatales, aseguradoras y subastas de salvamento.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", inLanguage: "es", headline: "Verificación de daño por inundación por VIN — ¿Este auto fue inundado?", description: "Cómo verificar cualquier vehículo por historial de inundación y daño por agua usando el VIN, qué significa una marca de título por inundación, cómo detectar un auto inundado oculto y cómo los registros de inundación llegan a un reporte VIN.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, datePublished: "2026-05-04", dateModified: new Date().toISOString().slice(0, 10) };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "es", mainEntity: FAQS_ES.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/es` }, { "@type": "ListItem", position: 2, name: "Verificación de inundación", item: PAGE_URL }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <FloodCheckBody locale="es" />
    </>
  );
}
