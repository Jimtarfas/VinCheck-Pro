/**
 * Wave 18 batch 3 — Spanish golf-cart-vin-lookup. Same full English layout via
 * the shared GolfCartVinLookupBody. Replaces the Wave 15 SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import GolfCartVinLookupBody, { FAQS_ES } from "@/components/GolfCartVinLookupBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/es/golf-cart-vin-lookup`;
const alt = hreflangAlternatesForLocale("/golf-cart-vin-lookup", "es");
const title = "Búsqueda VIN de carrito de golf — Decodificador de serial gratis (Club Car, EZGO, Yamaha)";
const description = "Los carritos de golf usan un número de serie, no un VIN de 17 caracteres. Decodifica un serial Club Car para el año modelo, con guías E-Z-GO y Yamaha. Gratis.";

export const metadata: Metadata = {
  title, description,
  keywords: ["búsqueda VIN carrito de golf", "búsqueda VIN carrito Yamaha", "búsqueda número serie Club Car", "búsqueda número serie ezgo", "búsqueda número serie carrito de golf", "año carrito de golf por número de serie", "búsqueda año Club Car", "año carrito Yamaha por número de serie", "búsqueda año carrito ezgo", "decodificador VIN carrito de golf", "cómo saber qué año es un carrito de golf", "búsqueda año modelo carrito de golf"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "es_US", images: [{ url: `${SITE}/golf-cart-vin-lookup/opengraph-image`, width: 1200, height: 630, alt: "Búsqueda VIN de carrito de golf — decodificador gratis de número de serie" }] },
  twitter: { card: "summary_large_image", title, description: "Los carritos de golf usan un número de serie, no un VIN vial. Decodifícalo para encontrar el año modelo. Gratis, instantáneo, sin registro.", images: [`${SITE}/golf-cart-vin-lookup/opengraph-image`] },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", inLanguage: "es", name: "Búsqueda VIN / número de serie de carrito de golf", url: PAGE_URL, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Herramienta gratis para encontrar y decodificar un número de serie de carrito de golf — Club Car, E-Z-GO o Yamaha — para determinar el año modelo. Los carritos de golf usan un número de serie del fabricante en lugar de un VIN vial de 17 caracteres.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "es", mainEntity: FAQS_ES.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", inLanguage: "es", name: "Cómo buscar el año de un carrito de golf por número de serie", description: "Guía paso a paso para encontrar y decodificar un número de serie de carrito de golf para determinar el año modelo en un carrito Club Car, E-Z-GO o Yamaha.", totalTime: "PT2M", step: [{ "@type": "HowToStep", position: 1, name: "Identifica la marca", text: "Confirma si el carrito es Club Car, E-Z-GO o Yamaha — cada uno codifica el año de manera diferente. La marca usualmente está en la carrocería, la columna de dirección o el asiento." }, { "@type": "HowToStep", position: 2, name: "Localiza el número de serie", text: "Encuentra el serial en el chasis y la etiqueta: Club Car debajo de la guantera o asiento del conductor, E-Z-GO debajo del asiento o cerca del controlador, Yamaha estampado en el chasis debajo del asiento." }, { "@type": "HowToStep", position: 3, name: "Lee o decodifica el año", text: "Para un Club Car, ingresa el serial al decodificador para leer el año modelo y semana. Para Yamaha o E-Z-GO, coincide el prefijo de modelo con la tabla de años de esa marca." }, { "@type": "HowToStep", position: 4, name: "Verifica contra el carrito", text: "Coincide el año y modelo decodificados con las características del carrito y la afirmación del vendedor. Una discrepancia entre el serial y el año anunciado es una bandera roja." }, { "@type": "HowToStep", position: 5, name: "Usa el año para ordenar partes o valuar el carrito", text: "Una vez que conoces el año modelo exacto, ordena baterías, controladores y accesorios específicos del año, o úsalo para ponerle precio al carrito para venta o compra." }] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/es` }, { "@type": "ListItem", position: 2, name: "Búsqueda VIN de carrito de golf", item: PAGE_URL }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", inLanguage: "es", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] }, url: PAGE_URL };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <GolfCartVinLookupBody locale="es" />
    </>
  );
}
