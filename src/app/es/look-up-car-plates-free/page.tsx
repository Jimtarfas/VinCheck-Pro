import type { Metadata } from "next";
import LookUpCarPlatesFreeBody from "@/components/LookUpCarPlatesFreeBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/es/look-up-car-plates-free`;
const alt = hreflangAlternatesForLocale("/look-up-car-plates-free", "es");
const title = "Consulta de placas de auto gratis — Búsqueda VIN por placa, 50 estados";
const description =
  "Búsqueda gratis de placas de matrícula para los 50 estados de EE. UU. Ingresa cualquier placa de auto para ver el VIN, año, marca, modelo, marcas de título, accidentes y datos del odómetro.";

export const metadata: Metadata = {
  title: { absolute: title }, description,
  keywords: [
    "consultar placas gratis", "búsqueda placa gratis", "búsqueda VIN por placa gratis",
    "búsqueda placa de matrícula gratis", "consulta de placa gratis", "lookup placa gratis",
    "búsqueda inversa de placa gratis", "consulta placa sin pago", "búsqueda DMV placa gratis",
    "placa a VIN gratis", "consulta placa sin registro", "decodificador placa gratis",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title, description, url: PAGE_URL, type: "website", siteName: "CarCheckerVIN", locale: "es_US",
  },
  twitter: {
    card: "summary_large_image", title,
    description: "Búsqueda gratis de placas para los 50 estados de EE. UU. Ingresa cualquier placa de auto para ver VIN, año, marca, modelo, marcas de título, accidentes y odómetro.",
  },
  robots: { index: true, follow: true },
};

const FAQS_ES = [
  { q: "¿Esta búsqueda de placas es realmente 100% gratis?", a: "Sí. Buscar una placa, obtener el VIN y ver los detalles principales del vehículo (año, marca, modelo, versión, equipo, marcas de título) es completamente gratis. Sin tarjeta de crédito, sin prueba, sin suscripción. Ofrecemos reportes opcionales pagos de historial en profundidad si quieres registros más detallados, pero la búsqueda gratis te da todo lo que la mayoría de compradores necesita." },
  { q: "¿Necesito registrarme o crear una cuenta?", a: "No necesitas registrarte para empezar una búsqueda. Algunos datos opcionales adicionales (como guardar reportes en tu dashboard) requieren una cuenta gratis, pero la búsqueda principal de placa-a-VIN no la necesita." },
  { q: "¿Qué estados están soportados?", a: "Los 50 estados de EE. UU. más Washington, D.C. Resolvemos placas emitidas por cada DMV estatal y equivalente de Departamento de Vehículos Motorizados — incluyendo California DMV, Texas DMV, Florida DHSMV, New York DMV y cada otra agencia." },
  { q: "¿Puedo buscar el nombre y dirección del dueño?", a: "No. La información personal del dueño está protegida por el Driver's Privacy Protection Act federal (DPPA, 18 U.S.C. § 2721). Ningún servicio legítimo de consumidor — incluyéndonos — puede devolver nombres, direcciones o números de teléfono del dueño desde una búsqueda por placa. Cualquier cosa que afirme lo contrario está rompiendo la ley federal. Devolvemos solo datos del vehículo." },
  { q: "¿Qué tan precisos son los datos gratis?", a: "Nuestra coincidencia de placa-a-VIN proviene de registros oficiales del DMV estatal y se agrega de autoridades de título registradas. Una vez que resolvemos el VIN, la decodificación del vehículo viene directamente de la NHTSA, hojas de fabricación del fabricante y agregadores de historial licenciados — las mismas fuentes que usan los gigantes pagos." },
  { q: "¿En qué se diferencia esto de Carfax o AutoCheck?", a: "Carfax cobra $44.99 por búsqueda de placa y AutoCheck cobra $24.99. Ambos requieren una cuenta paga antes de revelar cualquier cosa más allá del año y marca. Te damos el VIN, lista de equipo y registros de historial gratis, con upgrades opcionales solo si necesitas registros más profundos." },
  { q: "¿Puedo buscar placas clásicas, de motocicleta o comerciales?", a: "Sí. Nuestra base de datos cubre placas de pasajeros, placas de motocicleta, placas comerciales, placas vanity, placas de concesionario y placas históricas/antiguas en los 50 estados." },
  { q: "¿Hay un límite en las búsquedas gratis?", a: "Los usuarios casuales no están limitados. Aplicamos un límite de uso justo solo para comportamiento de scraping claramente automatizado para mantener el servicio rápido para todos." },
];

const FREE_STEPS = [
  { title: "Ingresa la placa", desc: "Escribe la placa exactamente como aparece en el vehículo. Los espacios y guiones se manejan automáticamente." },
  { title: "Elige el estado", desc: "Selecciona el estado donde está registrada la placa. Soportamos los 50 estados más D.C." },
  { title: "Obtén el VIN al instante", desc: "Resolvemos al instante la placa al VIN de 17 caracteres del vehículo — sin espera, sin pago." },
  { title: "Mira todos los datos del vehículo", desc: "Año, marca, modelo, versión, motor, marcas de título, equipo y registros completos de historial — todo gratis." },
];

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  inLanguage: "es",
  name: "Búsqueda gratis de placa de matrícula — Consultar placas gratis",
  url: PAGE_URL,
  applicationCategory: "AutomotiveApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description: "Búsqueda gratis de placa de matrícula para los 50 estados de EE. UU. Resuelve cualquier placa a su VIN y obtén datos completos del vehículo — sin registro, sin tarjeta de crédito, sin tarifa.",
  featureList: [
    "Resolución gratis placa-a-VIN",
    "Los 50 estados de EE. UU. + D.C.",
    "Decodificación instantánea del vehículo",
    "Sin registro requerido",
    "Sin tarjeta de crédito requerida",
    "Registros de marcas de título e historial",
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "es",
  mainEntity: FAQS_ES.map((f) => ({
    "@type": "Question", name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  inLanguage: "es",
  name: "Cómo buscar una placa de auto gratis",
  description: "Guía paso a paso para buscar cualquier placa de EE. UU. gratis, sin registro requerido.",
  totalTime: "PT30S",
  step: FREE_STEPS.map((s, i) => ({
    "@type": "HowToStep", position: i + 1, name: s.title, text: s.desc,
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  inLanguage: "es",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/es` },
    { "@type": "ListItem", position: 2, name: "Consulta de placas gratis", item: PAGE_URL },
  ],
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  inLanguage: "es",
  speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-summary"] },
  url: PAGE_URL,
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <LookUpCarPlatesFreeBody locale="es" />
    </>
  );
}
