import type { Metadata } from "next";
import LicensePlateLookupBody from "@/components/LicensePlateLookupBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/es/license-plate-lookup`;
const alt = hreflangAlternatesForLocale("/license-plate-lookup", "es");
const title = "Búsqueda VIN por placa de matrícula — Gratis, los 50 estados";
const description =
  "Búsqueda gratis VIN por placa de matrícula para los 50 estados de EE. UU. Ingresa una placa para obtener el VIN, año, marca, modelo y reporte completo del historial del vehículo.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    "placa a VIN", "búsqueda por placa", "búsqueda VIN por placa", "búsqueda placa gratis",
    "encontrar auto por número de placa", "búsqueda DMV por placa", "decodificador VIN por placa",
    "búsqueda inversa de placa", "DPPA búsqueda por placa", "lookup placa por VIN",
    "número de placa lookup", "buscar VIN por matrícula",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title, description, url: PAGE_URL, type: "website", siteName: "CarCheckerVIN", locale: "es_US",
  },
  twitter: {
    card: "summary_large_image", title,
    description: "Búsqueda gratis VIN por placa para los 50 estados de EE. UU. Ingresa una placa para obtener el VIN, año, marca, modelo y reporte completo del historial.",
  },
  robots: { index: true, follow: true },
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": ["WebApplication", "SoftwareApplication"],
  inLanguage: "es",
  name: "Búsqueda VIN por placa de matrícula",
  description:
    "Herramienta gratis de búsqueda VIN por placa. Ingresa cualquier número de placa de EE. UU. y estado para obtener al instante el VIN, detalles del vehículo y reporte completo del historial.",
  url: PAGE_URL,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Los 50 estados de EE. UU. soportados",
    "Obtención del VIN desde el número de placa",
    "Decodificación instantánea de año, marca y modelo",
    "Enlaces al reporte completo de historial del vehículo",
    "Acceso a datos que cumple con DPPA",
  ],
  publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } },
};

const howToSchema = {
  "@context": "https://schema.org", "@type": "HowTo", inLanguage: "es",
  name: "Cómo buscar un VIN por placa de matrícula",
  description: "Usa la herramienta gratis de CarCheckerVIN para convertir cualquier placa de EE. UU. a un VIN en tres pasos.",
  totalTime: "PT1M",
  step: [
    { "@type": "HowToStep", position: 1, name: "Ingresa el número de placa", text: "Escribe el número alfanumérico de la placa en el campo de búsqueda exactamente como aparece, sin espacios ni caracteres especiales." },
    { "@type": "HowToStep", position: 2, name: "Selecciona el estado emisor", text: "Elige el estado que emitió la placa desde el menú desplegable. Los mismos caracteres de placa pueden existir en varios estados, así que seleccionar el estado correcto es esencial para una coincidencia precisa." },
    { "@type": "HowToStep", position: 3, name: "Mira el VIN y los detalles del vehículo", text: "Haz clic en 'Buscar VIN por placa'. La herramienta devuelve el VIN de 17 caracteres junto con año, marca, modelo y un enlace directo al reporte completo de historial." },
  ],
};

const faqSchema = {
  "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "es",
  mainEntity: [
    { "@type": "Question", name: "¿Puedo encontrar un VIN desde un número de placa gratis?", acceptedAnswer: { "@type": "Answer", text: "Sí. La búsqueda VIN por placa de CarCheckerVIN es gratis para investigación personal de pre-compra de vehículo. Crea una cuenta gratis, ingresa el número de placa y estado emisor, y la herramienta devuelve el VIN de 17 caracteres asociado junto con los detalles del vehículo decodificados." } },
    { "@type": "Question", name: "¿Qué estados de EE. UU. están soportados?", acceptedAnswer: { "@type": "Answer", text: "Los 50 estados de EE. UU. más el Distrito de Columbia están soportados. La base de datos de vehículos de cada estado se consulta por separado, por eso debes seleccionar el estado emisor — el mismo número de placa puede existir en varios estados simultáneamente." } },
    { "@type": "Question", name: "¿Es legal buscar una placa para obtener el VIN?", acceptedAnswer: { "@type": "Answer", text: "Sí, para propósitos permisibles bajo el Driver's Privacy Protection Act (DPPA). La investigación de vehículo antes de una compra de particular es un uso claramente permisible. Nuestra búsqueda devuelve información del vehículo (VIN, marca, modelo, estado del título) pero no datos personales del dueño como nombre o dirección, que el DPPA restringe." } },
    { "@type": "Question", name: "¿Qué información puedo obtener de una búsqueda por placa?", acceptedAnswer: { "@type": "Answer", text: "Una búsqueda por placa primero devuelve el VIN. Una vez que tienes el VIN puedes acceder al historial completo del vehículo: año, marca, modelo, marcas de título (salvamento, inundación, recompra por ley de limón), registros de accidentes, lecturas de odómetro en las transferencias de título, número de dueños anteriores, registros de robo y retiros de seguridad activos." } },
    { "@type": "Question", name: "¿Qué pasa si la búsqueda no devuelve resultados?", acceptedAnswer: { "@type": "Answer", text: "No tener resultados usualmente significa que la placa está vencida, fuera del estado, una etiqueta temporal de concesionario, o una placa personalizada aún no indexada. En estos casos, pídele al vendedor el VIN de 17 caracteres directamente y haz una verificación VIN en CarCheckerVIN para el reporte de historial más preciso." } },
    { "@type": "Question", name: "¿Por qué necesito seleccionar un estado para la búsqueda por placa?", acceptedAnswer: { "@type": "Answer", text: "Las placas las emiten los estados individuales, no a nivel federal. La misma secuencia alfanumérica (ej., 'ABC1234') puede estar activa en California, Texas y Nueva York simultáneamente. Debes especificar el estado emisor para que la búsqueda consulte la base de datos correcta del DMV estatal y devuelva el registro correcto del vehículo." } },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  inLanguage: "es",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/es` },
    { "@type": "ListItem", position: 2, name: "Búsqueda VIN por placa", item: PAGE_URL },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <LicensePlateLookupBody locale="es" />
    </>
  );
}
