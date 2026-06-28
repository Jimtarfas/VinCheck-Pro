/**
 * Wave 18 batch 3 — Spanish /airbag-check. Same full English layout via the
 * shared AirbagCheckBody. Replaces the Wave 15 SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import AirbagCheckBody, { FAQS_ES } from "@/components/AirbagCheckBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/es/airbag-check`;
const alt = hreflangAlternatesForLocale("/airbag-check", "es");
const title = "Verificación de bolsas de aire y despliegue por VIN — Historial SRS y detección de fraude (Gratis)";
const description = "Verifica si las bolsas de aire de un vehículo fueron desplegadas o reemplazadas por VIN — gratis. Muestra registros de accidentes graves, pérdida total y salvamento, además de retiros de seguridad de bolsas de aire abiertos para detectar bolsas falsificadas y reparaciones SRS incompletas antes de comprar.";

export const metadata: Metadata = {
  title, description,
  keywords: [
    "verificación bolsas de aire por VIN",
    "historial despliegue bolsa de aire",
    "verificación SRS VIN",
    "verificación fraude bolsa de aire",
    "bolsa de aire desplegada VIN",
    "verificación bolsa de aire falsificada",
    "verificación VIN retiro Takata",
    "luz advertencia SRS",
    "se desplegaron las bolsas de aire",
    "verificación gratis bolsa de aire",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "es_US" },
  twitter: { card: "summary_large_image", title, description: "Historial gratis de bolsas de aire y SRS basado en VIN. Muestra registros vinculados a despliegue y retiros de seguridad de bolsas de aire abiertos antes de comprar." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", inLanguage: "es", name: "Verificación de bolsas de aire y despliegue por VIN", url: PAGE_URL, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Verifica el historial de bolsas de aire y SRS de un vehículo por su VIN de 17 caracteres. Muestra registros de accidentes graves, pérdida total de aseguradoras y títulos de salvamento que indican despliegue probable de bolsas de aire, además de retiros de seguridad de bolsas de aire abiertos de NHTSA — las señales que exponen bolsas de aire falsificadas y reparaciones SRS incompletas.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", inLanguage: "es", headline: "Verificación de bolsas de aire y despliegue por VIN", description: "Aprende cómo verificar el historial de despliegue de bolsas de aire por VIN, por qué importa, las formas comunes de fraude de bolsas de aire y cómo verificar que el sistema SRS fue restaurado correctamente.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, datePublished: "2026-05-04", dateModified: "2026-06-09" };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "es", mainEntity: FAQS_ES.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", inLanguage: "es", name: "Cómo verificar el historial de bolsas de aire y SRS por VIN", description: "Evalúa si las bolsas de aire de un vehículo usado probablemente se desplegaron y si el sistema SRS fue restaurado correctamente, usando su VIN de 17 caracteres antes de comprar.", totalTime: "PT2M", step: [{ "@type": "HowToStep", position: 1, name: "Encuentra el VIN de 17 caracteres", text: "Lee el VIN del tablero del lado del conductor, la calcomanía del marco de la puerta, el título o el registro. Confirma que sea de 17 caracteres sin las letras I, O o Q." }, { "@type": "HowToStep", position: 2, name: "Ejecuta el VIN para señales de despliegue", text: "Ingresa el VIN en la herramienta de búsqueda. Muestra registros de accidentes graves, pérdida total de aseguradoras y títulos de salvamento que indican despliegue probable de bolsas de aire, además de cualquier retiro de seguridad de bolsa de aire abierto de NHTSA." }, { "@type": "HowToStep", position: 3, name: "Señala cualquier despliegue sin registro de reparación", text: "Una colisión frontal o lateral grave en el historial sin un reemplazo correspondiente de bolsa de aire es una bandera roja mayor de que el sistema SRS puede no haberse restaurado correctamente." }, { "@type": "HowToStep", position: 4, name: "Confirma con un escaneo diagnóstico SRS", text: "Antes de comprar, obtén una inspección previa a la compra que lea los códigos de falla SRS con un escáner OBD-II. Nunca te bases solo en que la luz de advertencia de bolsa de aire esté apagada — puede deshabilitarse." }] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/es` }, { "@type": "ListItem", position: 2, name: "Verificación de bolsas de aire", item: PAGE_URL }] };
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
      <AirbagCheckBody locale="es" />
    </>
  );
}
