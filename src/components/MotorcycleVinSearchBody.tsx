/**
 * Shared body for /motorcycle-vin-search and /es/motorcycle-vin-search.
 * Wave 18 batch 4 — full visual parity via COPY={en,es}.
 */

import Link from "next/link";
import {
  Bike, Sparkles, Search, Hash, ShieldCheck, Zap, Globe2, Calendar,
  Check, ChevronRight, Lock, BadgeCheck, MapPin,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import MotorcycleVinSearch from "@/app/motorcycle-vin-search/MotorcycleVinSearch";
import type { Locale } from "@/i18n/config";

const COPY = {
  en: {
    home: "Home", tools: "Tools", crumb: "Motorcycle VIN Search",
    heroBadge: "100% Free · Instant Decode · No Signup",
    h1: "Motorcycle VIN Search",
    heroPre: "Free motorcycle VIN decoder. Enter any 17-character bike VIN to instantly identify the ",
    heroBold: "manufacturer, country of origin, model year, plant code, and production sequence",
    heroPost: " — plus a position-by-position breakdown of what every character means. Works for Harley-Davidson, Honda, Yamaha, Suzuki, Kawasaki, BMW, Ducati, Triumph, KTM, and every major motorcycle brand.",
    tocAria: "On this page",
    toc: [
      { id: "tool", label: "Search Tool" },
      { id: "features", label: "Features" },
      { id: "find-vin", label: "Find Your VIN" },
      { id: "how-vin-works", label: "How a VIN Works" },
      { id: "brands", label: "Supported Brands" },
      { id: "faq", label: "FAQ" },
    ],
    trustStats: [
      { icon: Bike, value: "25+", label: "motorcycle brands" },
      { icon: Zap, value: "Instant", label: "client-side decode" },
      { icon: Globe2, value: "ISO 3779", label: "17-char standard" },
      { icon: BadgeCheck, value: "Free", label: "no signup" },
    ],
    toolH2: "Decode a Motorcycle VIN",
    toolSub: "Enter any 17-character bike VIN — we'll decode the manufacturer, year, plant, and production sequence instantly",
    toolFoot: "Free · No signup · Instant decode",
    featuresH2: "Free Motorcycle VIN Decoder Features",
    featuresIntro: "Built specifically for motorcycles — recognizes manufacturers and quirks that generic car-VIN tools miss.",
    features: [
      { icon: Zap, title: "Instant offline decode", desc: "WMI, year, plant, and serial are decoded client-side — results appear in milliseconds with zero API calls." },
      { icon: Bike, title: "25+ motorcycle brands", desc: "Recognizes Harley-Davidson, Honda, Yamaha, Suzuki, Kawasaki, BMW, Ducati, Triumph, KTM, Royal Enfield, and more." },
      { icon: Globe2, title: "Country & region of origin", desc: "Decodes the WMI region code so you know the country and continent where your bike was assembled." },
      { icon: Calendar, title: "Model year disambiguation", desc: "Handles the 30-year letter cycle and shows both possible years when the code is ambiguous." },
      { icon: Hash, title: "Visual VIN breakdown", desc: "Color-coded position-by-position display teaches you to read any motorcycle VIN by sight." },
      { icon: ShieldCheck, title: "One-click full history", desc: "Decode for free, then jump straight to the gated full history report (title, theft, accidents, recalls)." },
    ],
    findVinH2: "Where Is the VIN on a Motorcycle?",
    findVinIntro: "Manufacturers stamp the VIN in multiple locations on every bike, plus print it on every paper document tied to the vehicle. Knowing where to look saves time and confirms the VIN hasn't been tampered with — a missing or scratched VIN is one of the strongest indicators of a stolen motorcycle.",
    findVinLocations: [
      { title: "Steering neck (frame head)", desc: "The most common location on Japanese sportbikes (Honda, Yamaha, Kawasaki, Suzuki) and most European brands. Look on the right side just below the handlebars." },
      { title: "Right side of the frame neck (Harley-Davidson)", desc: "Harley stamps the VIN deeply on the right side of the frame neck. Older Harleys also stamped it on the left side of the engine case." },
      { title: "Engine case", desc: "Most modern motorcycles also stamp the VIN (or a partial VIN) on the engine block, typically near the cylinder head or starter motor." },
      { title: "Frame near the swingarm", desc: "Many cruisers and adventure bikes carry a secondary VIN stamping on the frame above or beside the swingarm pivot." },
      { title: "Title, registration, and insurance documents", desc: "Every paper document tied to the bike lists the VIN. Use this to cross-check the stamped VIN on the frame." },
    ],
    howVinH2: "How a Motorcycle VIN Works (17 Characters Explained)",
    howVinIntro: "The 17-character VIN format is an international standard (ISO 3779) adopted in 1981. Every motorcycle built since then for sale in North America, Europe, and most other markets uses this format. Letters I, O, and Q are excluded to avoid confusion with digits 1 and 0.",
    sampleVinLabel: "Example — a Harley-Davidson VIN, decoded",
    sampleVinFoot: "Each block maps to a position group below. Read left to right: who built it, what it is, a checksum, the year, the plant, and the unique serial.",
    vinPositions: [
      { pos: "1–3", title: "WMI — World Manufacturer Identifier", desc: "Identifies the country, manufacturer, and motorcycle category. Position 1 is the region (1–5 = North America, J–R = Asia, S–Z = Europe). Examples: 1HD = Harley-Davidson, JH2 = Honda, JYA = Yamaha, ZDM = Ducati." },
      { pos: "4–8", title: "VDS — Vehicle Descriptor Section", desc: "Encodes model-specific attributes: engine displacement and configuration, body or frame type, transmission, and trim. Each manufacturer uses its own scheme within these five positions." },
      { pos: "9", title: "Check digit", desc: "A mathematical checksum that validates the entire VIN. If even one character is wrong, the check digit won't match — useful for catching transcription errors." },
      { pos: "10", title: "Model year", desc: "A single character that encodes the model year. Letters A–Y (skipping I, O, Q, U, Z) cycle through 30 years; digits 1–9 cover 2001–2009. The same code can mean two possible years 30 years apart." },
      { pos: "11", title: "Assembly plant", desc: "A single character identifying the specific factory where the motorcycle was built. Each manufacturer assigns its own plant codes." },
      { pos: "12–17", title: "Production sequence", desc: "A unique six-character serial number assigned by the manufacturer. Combined with the WMI and year, it uniquely identifies your individual motorcycle out of millions." },
    ],
    posWord: "Pos",
    pairWithPre: "Pair a VIN decode with a full ",
    pairWithLink1: "motorcycle VIN check",
    pairWithMid: " to see title status, theft records, accidents, and recalls. For the original factory spec sheet, use the ",
    pairWithLink2: "Window Sticker Maker",
    pairWithPost: ".",
    midCtaH2: "Decode Any Motorcycle VIN Now",
    midCtaSub: "Free, instant, no signup. Identify the manufacturer, year, country, and plant in milliseconds — then jump to the full history report when you're ready.",
    midCtaBtn: "Search a VIN",
    brandsH2: "Supported Motorcycle Brands",
    brandsIntro: "The decoder recognizes 25+ motorcycle manufacturer WMIs and falls back to a generic decode for unrecognized brands.",
    supportedBrands: [
      "Harley-Davidson", "Honda", "Yamaha", "Suzuki", "Kawasaki", "BMW Motorrad",
      "Ducati", "Triumph", "KTM", "Indian", "Royal Enfield", "Aprilia",
      "MV Agusta", "Husqvarna", "Moto Guzzi", "Piaggio / Vespa", "Buell", "Victory (Polaris)",
    ],
    internalH2: "More VIN Tools That Pair With a Motorcycle VIN Search",
    internalIntro: "Decoding the VIN is the first step. These checks complete the bike's story.",
    internalLinks: [
      { href: "/motorcycle-vin-check", label: "Full Motorcycle VIN Check", desc: "Title status, theft records, accidents, recalls, and liens for any bike." },
      { href: "/vin-decoder", label: "VIN Decoder", desc: "Decode any 17-character VIN — cars and bikes — to make, year, plant, and sequence." },
      { href: "/stolen-vehicle-check", label: "Stolen Vehicle Check", desc: "Check the VIN against the NICB theft database before you buy." },
      { href: "/window-sticker", label: "Window Sticker Maker", desc: "Recreate the original factory spec sheet for the bike." },
      { href: "/vin-check", label: "Full VIN History Check", desc: "Title, accident, odometer, and recall records in one report." },
      { href: "/build-sheet", label: "Build Sheet by VIN", desc: "Pull the original factory build record and option codes." },
    ],
    faqH2: "Motorcycle VIN Search — Frequently Asked Questions",
    faqIntro: "The questions riders ask most about decoding a motorcycle VIN.",
    bottomBadge: "Free · Instant · No Signup",
    bottomH2: "Decode Any Motorcycle VIN Now",
    bottomSub: "Free, instant, no signup. Decode the manufacturer, year, country, plant, and production sequence — then jump to the full motorcycle history report when you're ready.",
    bottomBtn: "Search a VIN",
  },
  es: {
    home: "Inicio", tools: "Herramientas", crumb: "Búsqueda de VIN de motocicleta",
    heroBadge: "100% gratis · Decodificación instantánea · Sin registro",
    h1: "Búsqueda de VIN de motocicleta",
    heroPre: "Decodificador gratis de VIN de motocicleta. Ingresa cualquier VIN de moto de 17 caracteres para identificar al instante el ",
    heroBold: "fabricante, país de origen, año modelo, código de planta y secuencia de producción",
    heroPost: " — más un desglose posición por posición de lo que significa cada carácter. Funciona para Harley-Davidson, Honda, Yamaha, Suzuki, Kawasaki, BMW, Ducati, Triumph, KTM y todas las marcas principales de motocicletas.",
    tocAria: "En esta página",
    toc: [
      { id: "tool", label: "Herramienta de búsqueda" },
      { id: "features", label: "Características" },
      { id: "find-vin", label: "Encuentra tu VIN" },
      { id: "how-vin-works", label: "Cómo funciona un VIN" },
      { id: "brands", label: "Marcas compatibles" },
      { id: "faq", label: "Preguntas frecuentes" },
    ],
    trustStats: [
      { icon: Bike, value: "25+", label: "marcas de motos" },
      { icon: Zap, value: "Instantáneo", label: "decodificación en cliente" },
      { icon: Globe2, value: "ISO 3779", label: "estándar 17 caracteres" },
      { icon: BadgeCheck, value: "Gratis", label: "sin registro" },
    ],
    toolH2: "Decodifica un VIN de motocicleta",
    toolSub: "Ingresa cualquier VIN de moto de 17 caracteres — decodificaremos el fabricante, año, planta y secuencia de producción al instante",
    toolFoot: "Gratis · Sin registro · Decodificación instantánea",
    featuresH2: "Características del decodificador gratis de VIN de moto",
    featuresIntro: "Construido específicamente para motocicletas — reconoce fabricantes y particularidades que las herramientas genéricas de VIN de auto pasan por alto.",
    features: [
      { icon: Zap, title: "Decodificación offline instantánea", desc: "El WMI, año, planta y serial se decodifican en el cliente — los resultados aparecen en milisegundos sin llamadas a API." },
      { icon: Bike, title: "Más de 25 marcas de motos", desc: "Reconoce Harley-Davidson, Honda, Yamaha, Suzuki, Kawasaki, BMW, Ducati, Triumph, KTM, Royal Enfield y más." },
      { icon: Globe2, title: "País y región de origen", desc: "Decodifica el código de región del WMI para que sepas el país y continente donde se ensambló tu moto." },
      { icon: Calendar, title: "Desambiguación del año modelo", desc: "Maneja el ciclo de letras de 30 años y muestra los dos años posibles cuando el código es ambiguo." },
      { icon: Hash, title: "Desglose visual del VIN", desc: "Una visualización codificada por colores posición por posición te enseña a leer cualquier VIN de moto a simple vista." },
      { icon: ShieldCheck, title: "Historial completo en un clic", desc: "Decodifica gratis y salta directo al reporte completo de historial (título, robo, accidentes, retiros)." },
    ],
    findVinH2: "¿Dónde está el VIN en una motocicleta?",
    findVinIntro: "Los fabricantes estampan el VIN en varias ubicaciones en cada moto, además de imprimirlo en todos los documentos ligados al vehículo. Saber dónde buscar ahorra tiempo y confirma que el VIN no ha sido manipulado — un VIN ausente o rayado es uno de los indicadores más fuertes de una moto robada.",
    findVinLocations: [
      { title: "Cabezal de dirección (cuello del chasis)", desc: "La ubicación más común en deportivas japonesas (Honda, Yamaha, Kawasaki, Suzuki) y la mayoría de marcas europeas. Busca en el lado derecho justo debajo del manillar." },
      { title: "Lado derecho del cuello del chasis (Harley-Davidson)", desc: "Harley estampa el VIN profundamente en el lado derecho del cuello del chasis. Las Harley más viejas también lo estampaban en el lado izquierdo del cárter del motor." },
      { title: "Cárter del motor", desc: "La mayoría de motos modernas también estampan el VIN (o un VIN parcial) en el bloque del motor, típicamente cerca de la culata o el motor de arranque." },
      { title: "Chasis cerca del basculante", desc: "Muchos crucero y adventure llevan un estampado secundario del VIN en el chasis encima o al lado del pivote del basculante." },
      { title: "Título, registro y documentos del seguro", desc: "Cada documento físico ligado a la moto lista el VIN. Úsalo para cruzar con el VIN estampado en el chasis." },
    ],
    howVinH2: "Cómo funciona un VIN de motocicleta (17 caracteres explicados)",
    howVinIntro: "El formato de VIN de 17 caracteres es un estándar internacional (ISO 3779) adoptado en 1981. Cada motocicleta construida desde entonces para venta en Norteamérica, Europa y la mayoría de mercados usa este formato. Las letras I, O y Q se excluyen para evitar confusión con los dígitos 1 y 0.",
    sampleVinLabel: "Ejemplo — un VIN de Harley-Davidson, decodificado",
    sampleVinFoot: "Cada bloque mapea a un grupo de posiciones debajo. Lee de izquierda a derecha: quién la fabricó, qué es, un checksum, el año, la planta y el serial único.",
    vinPositions: [
      { pos: "1–3", title: "WMI — Identificador Mundial del Fabricante", desc: "Identifica el país, fabricante y categoría de moto. La posición 1 es la región (1–5 = Norteamérica, J–R = Asia, S–Z = Europa). Ejemplos: 1HD = Harley-Davidson, JH2 = Honda, JYA = Yamaha, ZDM = Ducati." },
      { pos: "4–8", title: "VDS — Sección Descriptora del Vehículo", desc: "Codifica atributos específicos del modelo: cilindrada y configuración del motor, tipo de carrocería o chasis, transmisión y versión. Cada fabricante usa su propio esquema dentro de estas cinco posiciones." },
      { pos: "9", title: "Dígito de verificación", desc: "Un checksum matemático que valida el VIN completo. Si incluso un carácter está mal, el dígito de verificación no coincidirá — útil para detectar errores de transcripción." },
      { pos: "10", title: "Año modelo", desc: "Un solo carácter que codifica el año modelo. Las letras A–Y (saltando I, O, Q, U, Z) ciclan por 30 años; los dígitos 1–9 cubren 2001–2009. El mismo código puede significar dos años posibles con 30 años de diferencia." },
      { pos: "11", title: "Planta de ensamblaje", desc: "Un solo carácter que identifica la fábrica específica donde se construyó la moto. Cada fabricante asigna sus propios códigos de planta." },
      { pos: "12–17", title: "Secuencia de producción", desc: "Un número de serie único de seis caracteres asignado por el fabricante. Combinado con el WMI y el año, identifica únicamente tu motocicleta individual entre millones." },
    ],
    posWord: "Pos",
    pairWithPre: "Combina la decodificación del VIN con una ",
    pairWithLink1: "verificación de VIN de moto",
    pairWithMid: " completa para ver el estado del título, registros de robo, accidentes y retiros. Para la hoja original de especificaciones de fábrica, usa el ",
    pairWithLink2: "Generador de Window Sticker",
    pairWithPost: ".",
    midCtaH2: "Decodifica cualquier VIN de moto ahora",
    midCtaSub: "Gratis, instantáneo, sin registro. Identifica el fabricante, año, país y planta en milisegundos — luego salta al reporte completo de historial cuando estés listo.",
    midCtaBtn: "Buscar un VIN",
    brandsH2: "Marcas de motos compatibles",
    brandsIntro: "El decodificador reconoce más de 25 WMI de fabricantes de motocicletas y recurre a una decodificación genérica para marcas no reconocidas.",
    supportedBrands: [
      "Harley-Davidson", "Honda", "Yamaha", "Suzuki", "Kawasaki", "BMW Motorrad",
      "Ducati", "Triumph", "KTM", "Indian", "Royal Enfield", "Aprilia",
      "MV Agusta", "Husqvarna", "Moto Guzzi", "Piaggio / Vespa", "Buell", "Victory (Polaris)",
    ],
    internalH2: "Más herramientas de VIN que se combinan con la búsqueda de VIN de moto",
    internalIntro: "Decodificar el VIN es el primer paso. Estas verificaciones completan la historia de la moto.",
    internalLinks: [
      { href: "/motorcycle-vin-check", label: "Verificación de VIN de moto completa", desc: "Estado del título, registros de robo, accidentes, retiros y gravámenes para cualquier moto." },
      { href: "/vin-decoder", label: "Decodificador de VIN", desc: "Decodifica cualquier VIN de 17 caracteres — autos y motos — para marca, año, planta y secuencia." },
      { href: "/stolen-vehicle-check", label: "Verificación de vehículo robado", desc: "Verifica el VIN contra la base de datos de robo del NICB antes de comprar." },
      { href: "/window-sticker", label: "Generador de Window Sticker", desc: "Recrea la hoja original de especificaciones de fábrica para la moto." },
      { href: "/vin-check", label: "Verificación completa de historial VIN", desc: "Registros de título, accidentes, odómetro y retiros en un solo reporte." },
      { href: "/build-sheet", label: "Hoja de fabricación por VIN", desc: "Obtén el registro original de fabricación y códigos de opciones." },
    ],
    faqH2: "Búsqueda de VIN de moto — Preguntas frecuentes",
    faqIntro: "Las preguntas que más hacen los motociclistas sobre decodificar un VIN de moto.",
    bottomBadge: "Gratis · Instantáneo · Sin registro",
    bottomH2: "Decodifica cualquier VIN de moto ahora",
    bottomSub: "Gratis, instantáneo, sin registro. Decodifica el fabricante, año, país, planta y secuencia de producción — luego salta al reporte completo de historial de moto cuando estés listo.",
    bottomBtn: "Buscar un VIN",
  },
} as const;

// Sample VIN — same content in both locales (just a VIN).
const SAMPLE_VIN = [
  { chars: "1HD", pos: "1–3", labelEn: "WMI", labelEs: "WMI", color: "bg-indigo-600" },
  { chars: "1KB41", pos: "4–8", labelEn: "VDS", labelEs: "VDS", color: "bg-sky-600" },
  { chars: "9", pos: "9", labelEn: "Check", labelEs: "Check", color: "bg-amber-600" },
  { chars: "7", pos: "10", labelEn: "Year", labelEs: "Año", color: "bg-emerald-600" },
  { chars: "Y", pos: "11", labelEn: "Plant", labelEs: "Planta", color: "bg-rose-600" },
  { chars: "012345", pos: "12–17", labelEn: "Sequence", labelEs: "Serie", color: "bg-violet-600" },
] as const;

export const FAQS_EN = [
  { question: "Is this motorcycle VIN search really free?", answer: "Yes. The motorcycle VIN search is 100% free with no signup, no payment, and no usage limit. Decode as many motorcycle VINs as you need. A free account is only required if you want the full vehicle history report (title status, theft, accidents, recalls) — the basic VIN decode and character breakdown are always open." },
  { question: "Where do I find the VIN on my motorcycle?", answer: "On most modern motorcycles, the 17-character VIN is stamped on the steering neck (right side, just below the handlebars), on the engine case (often near the cylinder head), and on the frame near the swingarm pivot. It also appears on your title, registration, and insurance documents. On Harley-Davidsons it's on the right side of the frame neck. On Japanese sportbikes (Honda, Yamaha, Kawasaki, Suzuki) it's typically on the steering head." },
  { question: "Why does a motorcycle VIN have 17 characters?", answer: "The 17-character VIN format is an international standard adopted in 1981 (ISO 3779). Before 1981, VINs varied in length and format by manufacturer. Every motorcycle built since 1981 for sale in North America, Europe, and most other markets uses the 17-character format. The VIN excludes the letters I, O, and Q to avoid confusion with 1 and 0." },
  { question: "What can a motorcycle VIN tell me?", answer: "A motorcycle VIN identifies the manufacturer (positions 1–3, the WMI), the bike's specific model and engine attributes (positions 4–8, the VDS), a check digit (position 9), the model year (position 10), the assembly plant (position 11), and the unique production sequence (positions 12–17). Together these encode where, when, and exactly which unit was built." },
  { question: "Can a VIN tell me what year my motorcycle is?", answer: "Yes — position 10 of the VIN is the model year code. Letters A–Y (skipping I, O, Q, U, Z) cover 1980–2000 and then again 2010–2030. Digits 1–9 cover 2001–2009. Because the letter codes repeat on a 30-year cycle, the same letter could mean two possible years; the title, registration, or full history report disambiguates." },
  { question: "Does this work for Harley-Davidson, Honda, Yamaha, Suzuki, Kawasaki, BMW, Ducati, KTM, and Triumph?", answer: "Yes — the decoder recognizes WMIs from every major motorcycle manufacturer including Harley-Davidson (1HD, 5HD), Indian (56K), Honda (JH2, 1HF), Yamaha (JYA, JYE), Suzuki (JS1, JS3), Kawasaki (JKA, JKB), BMW Motorrad (WB1, WB2), Ducati (ZDM), Aprilia (ZD4), Triumph (SMT), KTM (VBK), Husqvarna (VBM), Royal Enfield (ME3), MV Agusta (ZCG), Moto Guzzi (ZGU), Vespa/Piaggio (ZAP), Buell (4MZ), and Victory (5VP)." },
  { question: "Can I decode a motorcycle VIN that's less than 17 characters?", answer: "Pre-1981 motorcycle VINs varied in length (often 5–13 characters) and used manufacturer-specific schemes that aren't covered by the international standard. We can't decode them automatically. For vintage and classic motorcycles, contact a marque-specific registry or use the manufacturer's archive service." },
  { question: "Will the VIN tell me if my motorcycle is stolen?", answer: "The basic VIN decode on this page identifies the bike but doesn't check theft databases. For a theft check against the National Insurance Crime Bureau (NICB) database — plus title brands, accident records, and lien information — run a full motorcycle history report." },
  { question: "What's the difference between motorcycle VIN search, VIN check, and VIN decoder?", answer: "These terms are mostly interchangeable. A 'VIN search' or 'VIN lookup' usually means decoding the VIN to identify the bike. A 'VIN check' typically refers to a full history report including theft, title, and accident data. A 'VIN decoder' breaks down each VIN character to explain what it means. This page does all three: instant decode, character-by-character breakdown, and a one-click path to the full history report." },
];

export const FAQS_ES = [
  { question: "¿Esta búsqueda de VIN de moto es realmente gratis?", answer: "Sí. La búsqueda de VIN de moto es 100% gratis sin registro, sin pago y sin límite de uso. Decodifica tantos VIN de motos como necesites. Solo se requiere una cuenta gratuita si quieres el reporte completo de historial del vehículo (estado del título, robo, accidentes, retiros) — la decodificación básica del VIN y el desglose de caracteres siempre están abiertos." },
  { question: "¿Dónde encuentro el VIN en mi motocicleta?", answer: "En la mayoría de motos modernas, el VIN de 17 caracteres está estampado en el cabezal de dirección (lado derecho, justo debajo del manillar), en el cárter del motor (a menudo cerca de la culata) y en el chasis cerca del pivote del basculante. También aparece en tu título, registro y documentos del seguro. En las Harley-Davidson está en el lado derecho del cuello del chasis. En las deportivas japonesas (Honda, Yamaha, Kawasaki, Suzuki) típicamente está en el cabezal de dirección." },
  { question: "¿Por qué un VIN de moto tiene 17 caracteres?", answer: "El formato de VIN de 17 caracteres es un estándar internacional adoptado en 1981 (ISO 3779). Antes de 1981, los VIN variaban en longitud y formato por fabricante. Cada moto construida desde 1981 para venta en Norteamérica, Europa y la mayoría de mercados usa el formato de 17 caracteres. El VIN excluye las letras I, O y Q para evitar confusión con 1 y 0." },
  { question: "¿Qué me puede decir un VIN de moto?", answer: "Un VIN de moto identifica al fabricante (posiciones 1–3, el WMI), los atributos específicos del modelo y motor de la moto (posiciones 4–8, el VDS), un dígito de verificación (posición 9), el año modelo (posición 10), la planta de ensamblaje (posición 11) y la secuencia única de producción (posiciones 12–17). Juntos codifican dónde, cuándo y exactamente qué unidad se construyó." },
  { question: "¿Un VIN puede decirme de qué año es mi moto?", answer: "Sí — la posición 10 del VIN es el código del año modelo. Las letras A–Y (saltando I, O, Q, U, Z) cubren 1980–2000 y luego otra vez 2010–2030. Los dígitos 1–9 cubren 2001–2009. Como los códigos de letras se repiten en un ciclo de 30 años, la misma letra podría significar dos años posibles; el título, registro o reporte completo de historial los desambigua." },
  { question: "¿Funciona para Harley-Davidson, Honda, Yamaha, Suzuki, Kawasaki, BMW, Ducati, KTM y Triumph?", answer: "Sí — el decodificador reconoce WMI de cada fabricante principal de motos incluyendo Harley-Davidson (1HD, 5HD), Indian (56K), Honda (JH2, 1HF), Yamaha (JYA, JYE), Suzuki (JS1, JS3), Kawasaki (JKA, JKB), BMW Motorrad (WB1, WB2), Ducati (ZDM), Aprilia (ZD4), Triumph (SMT), KTM (VBK), Husqvarna (VBM), Royal Enfield (ME3), MV Agusta (ZCG), Moto Guzzi (ZGU), Vespa/Piaggio (ZAP), Buell (4MZ) y Victory (5VP)." },
  { question: "¿Puedo decodificar un VIN de moto de menos de 17 caracteres?", answer: "Los VIN de motos previos a 1981 variaban en longitud (a menudo 5–13 caracteres) y usaban esquemas específicos del fabricante que no están cubiertos por el estándar internacional. No podemos decodificarlos automáticamente. Para motos vintage y clásicas, contacta un registro específico de la marca o usa el servicio de archivo del fabricante." },
  { question: "¿El VIN me dirá si mi moto está robada?", answer: "La decodificación básica de VIN en esta página identifica la moto pero no verifica bases de datos de robo. Para una verificación de robo contra la base de datos del National Insurance Crime Bureau (NICB) — más marcas de título, registros de accidentes e información de gravámenes — ejecuta un reporte completo de historial de moto." },
  { question: "¿Cuál es la diferencia entre búsqueda de VIN, verificación de VIN y decodificador de VIN de moto?", answer: "Estos términos son en su mayoría intercambiables. Una 'búsqueda de VIN' o 'lookup de VIN' usualmente significa decodificar el VIN para identificar la moto. Una 'verificación de VIN' típicamente se refiere a un reporte completo de historial incluyendo datos de robo, título y accidentes. Un 'decodificador de VIN' desglosa cada carácter del VIN para explicar lo que significa. Esta página hace los tres: decodificación instantánea, desglose carácter por carácter y un camino de un clic al reporte completo de historial." },
];

interface Props { locale: Locale; }

export default function MotorcycleVinSearchBody({ locale }: Props) {
  const c = COPY[locale];
  const faqs = locale === "es" ? FAQS_ES : FAQS_EN;
  const link = (en: string) => (locale === "es" ? `/es${en}` : en);

  return (
    <article className="pb-16 bg-surface">
      {/* Hero */}
      <div className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
          <Breadcrumbs
            onDark
            items={[
              { label: c.home, href: locale === "es" ? "/es" : "/" },
              { label: c.tools, href: link("/tools") },
              { label: c.crumb },
            ]}
          />

          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <Sparkles className="w-4 h-4" /> {c.heroBadge}
          </div>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center flex-shrink-0">
              <Bike className="w-7 h-7" />
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight">{c.h1}</h1>
          </div>

          <p className="text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
            {c.heroPre}<strong>{c.heroBold}</strong>{c.heroPost}
          </p>

          <nav aria-label={c.tocAria} className="flex flex-wrap gap-2 text-sm mb-8">
            {c.toc.map((t) => (
              <a key={t.id} href={`#${t.id}`} className="px-3 py-1.5 rounded-full bg-white/10 border border-white/15 hover:bg-white/20 text-white/90 hover:text-white transition">
                {t.label}
              </a>
            ))}
          </nav>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {c.trustStats.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-center">
                  <Icon className="w-5 h-5 mx-auto mb-1 text-white/70" />
                  <div className="text-xl sm:text-2xl font-headline font-black text-white">{s.value}</div>
                  <div className="text-[11px] text-white/65 leading-tight mt-0.5">{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Tool */}
        <section id="tool" className="py-10 scroll-mt-24">
          <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl border border-outline-variant">
            <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">{c.toolH2}</h2>
            <p className="text-xs sm:text-sm text-on-surface-variant mb-4">{c.toolSub}</p>
            <MotorcycleVinSearch locale={locale} />
            <p className="mt-3 text-[11px] text-slate-400 flex items-center gap-1.5">
              <Lock className="w-3 h-3" /> {c.toolFoot}
            </p>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-12 sm:py-16 border-t border-outline-variant scroll-mt-24">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.featuresH2}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl">{c.featuresIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {c.features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
                <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1.5">{title}</h3>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Find VIN */}
        <section id="find-vin" className="py-12 sm:py-16 border-t border-outline-variant scroll-mt-24">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.findVinH2}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.findVinIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {c.findVinLocations.map((loc) => (
              <div key={loc.title} className="flex gap-4 items-start rounded-2xl border border-outline-variant bg-surface p-5">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-base font-headline font-extrabold text-primary mb-1">{loc.title}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{loc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How VIN Works */}
        <section id="how-vin-works" className="py-12 sm:py-16 border-t border-outline-variant scroll-mt-24">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.howVinH2}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.howVinIntro}</p>

          <div className="mb-8 rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
            <div className="text-[11px] font-black uppercase tracking-wider text-on-surface-variant mb-3">{c.sampleVinLabel}</div>
            <div className="flex flex-wrap items-stretch gap-1.5 sm:gap-2">
              {SAMPLE_VIN.map((seg) => (
                <div key={seg.pos} className="flex-1 min-w-[58px] rounded-xl overflow-hidden border border-outline-variant shadow-sm">
                  <div className={`${seg.color} px-2 py-2.5 text-center font-mono font-black text-white text-sm sm:text-base tracking-[0.15em]`}>{seg.chars}</div>
                  <div className="px-1.5 py-1.5 text-center bg-surface">
                    <div className="text-[10px] font-bold text-on-surface leading-tight">{locale === "es" ? seg.labelEs : seg.labelEn}</div>
                    <div className="text-[9px] text-on-surface-variant leading-tight">{c.posWord} {seg.pos}</div>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[11px] text-on-surface-variant leading-relaxed">{c.sampleVinFoot}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {c.vinPositions.map(({ pos, title, desc }, i) => (
              <div key={pos} className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
                <div className="flex items-baseline gap-2 mb-1.5">
                  <span className={`w-2.5 h-2.5 rounded-full self-center ${SAMPLE_VIN[i].color}`} aria-hidden />
                  <span className="text-[10px] font-black text-primary uppercase tracking-wider bg-primary/10 px-2 py-0.5 rounded-full">{c.posWord} {pos}</span>
                  <h3 className="font-headline font-extrabold text-primary">{title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl bg-secondary-container/40 border border-outline-variant p-5 sm:p-6">
            <p className="text-sm text-on-surface leading-relaxed">
              {c.pairWithPre}
              <Link href={link("/motorcycle-vin-check")} className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.pairWithLink1}</Link>
              {c.pairWithMid}
              <Link href={link("/window-sticker")} className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.pairWithLink2}</Link>
              {c.pairWithPost}
            </p>
          </div>
        </section>

        {/* Mid CTA */}
        <section className="py-10">
          <div className="rounded-3xl bg-primary p-7 sm:p-10 text-center">
            <Sparkles className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">{c.midCtaH2}</h2>
            <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">{c.midCtaSub}</p>
            <a href="#tool" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-primary font-bold hover:bg-white/90 transition">
              {c.midCtaBtn}
              <Search className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* Brands */}
        <section id="brands" className="py-12 sm:py-16 border-t border-outline-variant scroll-mt-24">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.brandsH2}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl">{c.brandsIntro}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
            {c.supportedBrands.map((b) => (
              <div key={b} className="p-3 bg-surface rounded-xl border border-outline-variant text-center text-sm font-semibold text-on-surface">{b}</div>
            ))}
          </div>
        </section>

        {/* Internal Links */}
        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.internalH2}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7">{c.internalIntro}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {c.internalLinks.map((l) => (
              <Link key={l.href} href={link(l.href)} className="flex items-start gap-3 rounded-xl border border-outline-variant bg-surface hover:border-primary/40 hover:bg-primary/5 transition-colors p-4 group">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <ChevronRight className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-bold text-primary group-hover:underline">{l.label}</div>
                  <div className="text-xs text-on-surface-variant mt-0.5">{l.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* VIN check banner */}
        <section className="py-10">
          <VinCheckBanner />
        </section>

        {/* FAQ */}
        <section id="faq" className="py-12 sm:py-16 border-t border-outline-variant scroll-mt-24">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.faqH2}</h2>
          <p className="text-sm text-on-surface-variant mb-8">{c.faqIntro}</p>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details key={f.question} className="group rounded-2xl border border-outline-variant bg-surface p-4 sm:p-5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                  <span className="text-sm sm:text-base font-headline font-extrabold text-primary pr-2">{f.question}</span>
                  <span className="flex-shrink-0 mt-0.5 text-primary text-xl font-light group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-xs sm:text-sm text-on-surface-variant leading-relaxed">{f.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-14 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-wider mb-4">
            <Zap className="w-3.5 h-3.5" /> {c.bottomBadge}
          </div>
          <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3">{c.bottomH2}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">{c.bottomSub}</p>
          <a href="#tool" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition">
            {c.bottomBtn}
            <Search className="w-4 h-4" />
          </a>
        </section>

        <RelatedChecks exclude="/motorcycle-vin-search" />
      </div>
    </article>
  );
}
