/**
 * Shared body for /golf-cart-vin-lookup and /es/golf-cart-vin-lookup.
 * Wave 18 batch 3 — full English layout in both locales via COPY={en,es}.
 */

import Link from "next/link";
import {
  Check, Search, MapPin, ChevronRight, Zap, BadgeCheck,
  ScanLine, ClipboardCheck, AlertCircle, Car, Calendar, Hash, ShieldCheck,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import GolfCartDecoder from "@/app/golf-cart-vin-lookup/GolfCartDecoder";
import type { Locale } from "@/i18n/config";

const HOW_ICONS = [BadgeCheck, MapPin, Search, ClipboardCheck, ScanLine] as const;

const COPY = {
  en: {
    home: "Home", crumb: "Golf Cart VIN Lookup",
    badge: "Golf Cart = Serial Number   ·   Not a Road VIN",
    h1Lead: "Golf Cart VIN Lookup — ",
    h1Accent: "Decode the Serial & Year",
    intro1: "Golf carts don't carry a 17-character road VIN — they use a ",
    introBold: "manufacturer serial number",
    intro2: " that encodes the model year. Find it, decode it, and know exactly what year your Club Car, E-Z-GO, or Yamaha cart is.",
    trustStats: [
      { icon: Car, value: "3 Brands", label: "Club Car · EZGO · Yamaha" },
      { icon: Calendar, value: "Model Year", label: "from the serial" },
      { icon: Zap, value: "Instant", label: "no sign-up needed" },
      { icon: BadgeCheck, value: "Free", label: "serial decode" },
    ],
    h2Vin: "A Golf Cart's \"VIN\" Is Its Serial Number",
    vinIntroPre: "Here's the honest answer most people are looking for: a golf cart ",
    vinIntroBold1: "does not have a 17-character VIN",
    vinIntroMid: " like a car. As a low-speed off-road vehicle, it's identified by a ",
    vinIntroBold2: "manufacturer serial number",
    vinIntroSuffix: " instead — and that serial is exactly what you read to find the year, order parts, or confirm a cart before buying.",
    cartTag: "Golf Cart",
    cartTitle: "Serial Number",
    cartBullets: [
      "Assigned by the maker — Club Car, E-Z-GO, Yamaha.",
      "Encodes the model year and production run.",
      "On the frame and a label under the seat or glove box.",
    ],
    carTag: "Car / Truck",
    carTitle: "17-Character VIN",
    carBulletsPre: ["Required on road vehicles built since 1981.", "Decodes make, model, year, engine, and plant."],
    carBullet3Pre: "A street-legal LSV conversion may get a true VIN — ",
    carBullet3Link: "decode that here",
    carBullet3Suffix: ".",
    bottomLineBold: "Bottom line:",
    bottomLineMid: " if you searched \"golf cart VIN,\" what you actually need is the ",
    bottomLineBold2: "serial number",
    bottomLineSuffix: ". Find it, and the brand guides below (plus the Club Car decoder at the top) turn it into a model year.",
    h2How: "How to Look Up a Golf Cart Year — Step by Step",
    howIntro: "Five steps from \"what year is this?\" to the exact model year — for Club Car, E-Z-GO, and Yamaha.",
    stepWord: "Step",
    howSteps: [
      { step: "01", title: "Identify the brand", body: "Club Car, E-Z-GO, and Yamaha each encode the build year differently, so the brand decides how you read the serial. It's usually badged on the body, steering column, or seat back." },
      { step: "02", title: "Find the serial number", body: "Look under the glove box or driver seat (Club Car), under the seat or near the controller (E-Z-GO), or stamped on the frame under the seat (Yamaha). Always check the frame stamping, not just a sticker." },
      { step: "03", title: "Read or decode the year", body: "For a Club Car, drop the serial into the decoder above to get the model year and production week instantly. For Yamaha and E-Z-GO, match the model prefix to that brand's year chart below." },
      { step: "04", title: "Verify against the cart", body: "Confirm the decoded year and model line up with the cart's features and the seller's claim. A serial that decodes to a different year than advertised is a reason to ask questions before you buy." },
      { step: "05", title: "Use it to order parts or price it", body: "Golf cart batteries, controllers, and accessories are year- and model-specific. The exact model year is what you need to order the right parts or to value the cart fairly." },
    ],
    h2Brand: "Serial Numbers by Brand — Club Car, E-Z-GO & Yamaha",
    brandIntro: "Each maker hides the year in a different place and format. Here's where to look and how the year is encoded for the three big brands.",
    brandColBrand: "Brand", brandColWhere: "Where to find the serial",
    brandColFormat: "How the year is encoded", brandColDecodes: "Decodes here?",
    brandRows: [
      { brand: "Club Car", where: "Bar-code label under the glove box or driver-side seat; stamped on the frame.", format: "2 letters (model prefix) + YY (year) + WW (week) + sequence. PG05 = model year 2005. Decode it instantly above.", decodes: "Yes — deterministic" },
      { brand: "E-Z-GO", where: "Under the seat or on the frame near the controller; manufacturer number on the body.", format: "Manufacturer code + serial. Newer models embed the year in the manufacturer number; older carts use a date/build code — match to an E-Z-GO era chart.", decodes: "Via brand chart" },
      { brand: "Yamaha", where: "Stamped on the frame under the seat; sticker beneath the body.", format: "Model code + serial. The year lives in the model prefix (e.g. G-series, Drive, Drive2), read from Yamaha's year/model chart — not a fixed digit.", decodes: "Via brand chart" },
    ],
    brandFooterPre: "The decoder at the top of this page reads the ",
    brandFooterBold: "Club Car",
    brandFooterSuffix: " format directly. For Yamaha and E-Z-GO, find the serial using the guide above, then match the model prefix to that brand's official year chart — we don't guess a year we can't verify from the serial alone.",
    h2Breakdown: "How a Club Car Serial Number Breaks Down",
    breakdownIntroPre: "Club Car's serial is the easiest to decode because the year and week sit in fixed positions. Take an example like ",
    breakdownExample: "PG0512345678",
    breakdownIntroSuffix: ":",
    breakdownColPos: "Position", breakdownColEx: "Example", breakdownColMean: "Meaning",
    breakdownRows: [
      { pos: "1–2", ex: "PG", mean: "Model / assembly prefix (the cart line)" },
      { pos: "3–4", ex: "05", mean: "Model year — here, 2005" },
      { pos: "5–6", ex: "12", mean: "Week of production — here, week 12" },
      { pos: "7+", ex: "345678", mean: "Production sequence number" },
    ],
    breakdownNote: "Note: very early Club Car DS units (1980s) and some special runs vary slightly. The year digits (positions 3–4) are the reliable figure — the decoder flags anything that doesn't fit the standard week pattern.",
    midCtaHeading: "Buying a Street-Legal Cart With a Real VIN?",
    midCtaSub: "Some low-speed vehicles are registered with a true 17-character VIN. If yours has one, decode it free for the make, model, year, and full history.",
    midCtaBtn: "Decode a 17-character VIN",
    h2Buy: "Check the Serial Before You Buy a Used Cart",
    buy1: "The serial number is a golf cart's identity, so it's the first thing to check on a used buy. Decode the year and confirm it matches what the seller advertised — model years on carts are easy to fudge because there's no title or road VIN keeping everyone honest.",
    buy2: "Match the serial on the frame to any label and to the bill of sale. Then use the exact model year to price the cart and to order the correct batteries, controller, and parts — golf cart components are tightly year- and model-specific.",
    buy3: "For build details or to confirm a cart isn't reported stolen, contact the manufacturer directly with the frame serial — golf carts aren't in the road-vehicle theft databases that cars are.",
    redFlagsTitle: "Golf cart serial red flags",
    redFlags: [
      "Decoded year doesn't match the advertised year",
      "Serial on the frame differs from the label or bill of sale",
      "Frame area looks ground down or repainted over the stamp",
      "Seller can't or won't show you the serial number",
      "No bill of sale on a used private-party purchase",
    ],
    h2Internal: "More Vehicle Lookups",
    internalIntro: "Decoding something with a road VIN? These tools have you covered.",
    internalLinks: [
      { href: "/", label: "Car & Truck VIN Decoder", desc: "For a street-legal LSV with a real 17-character VIN, decode it here for make, model, and year." },
      { href: "/motorcycle-vin-search", label: "Motorcycle VIN Search", desc: "Decode a motorcycle or ATV frame number for make, model, and engine." },
      { href: "/hin-lookup", label: "HIN Lookup (Boat VIN)", desc: "A boat's serial equivalent — decode a 12-character Hull Identification Number." },
      { href: "/rv-vin-check", label: "RV VIN Check", desc: "Decode and history-check a motorhome or travel-trailer VIN." },
      { href: "/stolen-vehicle-check", label: "Stolen Vehicle Check", desc: "For road vehicles with a VIN — confirm it isn't flagged as stolen before you buy." },
      { href: "/chassis-number-lookup", label: "Chassis Number Lookup", desc: "The same 17-character VIN is called a chassis number outside North America." },
    ],
    h2Faq: "Golf Cart VIN / Serial Lookup — Frequently Asked Questions",
    faqIntro: "Direct answers to what golf cart owners and buyers ask most.",
    bottomBadge: "Free · Instant · Club Car decoder",
    ctaBottomHeading: "Find Your Golf Cart's Year From the Serial",
    ctaBottomSub: "Scroll back up to decode a Club Car serial instantly, or use the brand guides to read a Yamaha or E-Z-GO year. Free, no sign-up.",
    ctaBottomNote: "No credit card · No sign-up · Honest, brand-accurate guidance",
  },
  es: {
    home: "Inicio", crumb: "Búsqueda VIN de carrito de golf",
    badge: "Carrito de golf = Número de serie   ·   No es un VIN vial",
    h1Lead: "Búsqueda VIN de carrito de golf — ",
    h1Accent: "Decodifica el serial y el año",
    intro1: "Los carritos de golf no llevan un VIN vial de 17 caracteres — usan un ",
    introBold: "número de serie del fabricante",
    intro2: " que codifica el año modelo. Encuéntralo, decodifícalo y conoce exactamente qué año es tu carrito Club Car, E-Z-GO o Yamaha.",
    trustStats: [
      { icon: Car, value: "3 marcas", label: "Club Car · EZGO · Yamaha" },
      { icon: Calendar, value: "Año modelo", label: "desde el serial" },
      { icon: Zap, value: "Instantáneo", label: "sin registro" },
      { icon: BadgeCheck, value: "Gratis", label: "decodificación de serial" },
    ],
    h2Vin: "El \"VIN\" de un carrito de golf es su número de serie",
    vinIntroPre: "Aquí está la respuesta honesta que la mayoría busca: un carrito de golf ",
    vinIntroBold1: "no tiene un VIN de 17 caracteres",
    vinIntroMid: " como un auto. Como vehículo de baja velocidad fuera de carretera, se identifica por un ",
    vinIntroBold2: "número de serie del fabricante",
    vinIntroSuffix: " en su lugar — y ese serial es exactamente lo que lees para encontrar el año, ordenar partes o confirmar un carrito antes de comprar.",
    cartTag: "Carrito de golf",
    cartTitle: "Número de serie",
    cartBullets: [
      "Asignado por el fabricante — Club Car, E-Z-GO, Yamaha.",
      "Codifica el año modelo y la serie de producción.",
      "En el chasis y una etiqueta debajo del asiento o guantera.",
    ],
    carTag: "Auto / Camión",
    carTitle: "VIN de 17 caracteres",
    carBulletsPre: ["Requerido en vehículos viales construidos desde 1981.", "Decodifica marca, modelo, año, motor y planta."],
    carBullet3Pre: "Una conversión LSV de calle puede obtener un VIN real — ",
    carBullet3Link: "decodifícalo aquí",
    carBullet3Suffix: ".",
    bottomLineBold: "Conclusión:",
    bottomLineMid: " si buscaste \"VIN de carrito de golf,\" lo que realmente necesitas es el ",
    bottomLineBold2: "número de serie",
    bottomLineSuffix: ". Encuéntralo, y las guías de marca abajo (más el decodificador Club Car arriba) lo convierten en un año modelo.",
    h2How: "Cómo buscar el año de un carrito de golf — Paso a paso",
    howIntro: "Cinco pasos desde \"¿qué año es esto?\" hasta el año modelo exacto — para Club Car, E-Z-GO y Yamaha.",
    stepWord: "Paso",
    howSteps: [
      { step: "01", title: "Identifica la marca", body: "Club Car, E-Z-GO y Yamaha cada uno codifica el año de construcción de manera diferente, así que la marca decide cómo lees el serial. Usualmente está distinguida en la carrocería, columna de dirección o respaldo del asiento." },
      { step: "02", title: "Encuentra el número de serie", body: "Busca debajo de la guantera o asiento del conductor (Club Car), debajo del asiento o cerca del controlador (E-Z-GO), o estampado en el chasis debajo del asiento (Yamaha). Siempre verifica el estampado del chasis, no solo una calcomanía." },
      { step: "03", title: "Lee o decodifica el año", body: "Para un Club Car, ingresa el serial al decodificador de arriba para obtener el año modelo y semana de producción al instante. Para Yamaha y E-Z-GO, coincide el prefijo de modelo con la tabla de años de esa marca abajo." },
      { step: "04", title: "Verifica contra el carrito", body: "Confirma que el año y modelo decodificados coincidan con las características del carrito y la afirmación del vendedor. Un serial que decodifica a un año diferente al anunciado es razón para hacer preguntas antes de comprar." },
      { step: "05", title: "Úsalo para ordenar partes o ponerle precio", body: "Las baterías, controladores y accesorios de carritos de golf son específicos por año y modelo. El año modelo exacto es lo que necesitas para ordenar las partes correctas o valuar el carrito justamente." },
    ],
    h2Brand: "Números de serie por marca — Club Car, E-Z-GO y Yamaha",
    brandIntro: "Cada fabricante esconde el año en un lugar y formato diferente. Aquí está dónde buscar y cómo se codifica el año para las tres marcas grandes.",
    brandColBrand: "Marca", brandColWhere: "Dónde encontrar el serial",
    brandColFormat: "Cómo se codifica el año", brandColDecodes: "¿Decodifica aquí?",
    brandRows: [
      { brand: "Club Car", where: "Etiqueta de código de barras debajo de la guantera o asiento del lado del conductor; estampado en el chasis.", format: "2 letras (prefijo de modelo) + AA (año) + SS (semana) + secuencia. PG05 = año modelo 2005. Decodifícalo al instante arriba.", decodes: "Sí — determinista" },
      { brand: "E-Z-GO", where: "Debajo del asiento o en el chasis cerca del controlador; número de fabricante en la carrocería.", format: "Código de fabricante + serial. Los modelos más nuevos incorporan el año en el número de fabricante; los carritos más antiguos usan un código de fecha/construcción — coincide con una tabla de era E-Z-GO.", decodes: "Vía tabla de marca" },
      { brand: "Yamaha", where: "Estampado en el chasis debajo del asiento; calcomanía debajo de la carrocería.", format: "Código de modelo + serial. El año vive en el prefijo de modelo (ej. serie G, Drive, Drive2), leído desde la tabla año/modelo de Yamaha — no un dígito fijo.", decodes: "Vía tabla de marca" },
    ],
    brandFooterPre: "El decodificador en la parte superior de esta página lee directamente el formato ",
    brandFooterBold: "Club Car",
    brandFooterSuffix: ". Para Yamaha y E-Z-GO, encuentra el serial usando la guía de arriba, luego coincide el prefijo de modelo con la tabla oficial de años de esa marca — no adivinamos un año que no podemos verificar solo desde el serial.",
    h2Breakdown: "Cómo se descompone un número de serie Club Car",
    breakdownIntroPre: "El serial de Club Car es el más fácil de decodificar porque el año y la semana están en posiciones fijas. Toma un ejemplo como ",
    breakdownExample: "PG0512345678",
    breakdownIntroSuffix: ":",
    breakdownColPos: "Posición", breakdownColEx: "Ejemplo", breakdownColMean: "Significado",
    breakdownRows: [
      { pos: "1–2", ex: "PG", mean: "Prefijo de modelo / ensamblaje (la línea de carrito)" },
      { pos: "3–4", ex: "05", mean: "Año modelo — aquí, 2005" },
      { pos: "5–6", ex: "12", mean: "Semana de producción — aquí, semana 12" },
      { pos: "7+", ex: "345678", mean: "Número de secuencia de producción" },
    ],
    breakdownNote: "Nota: las unidades muy tempranas de Club Car DS (años 80) y algunas series especiales varían ligeramente. Los dígitos del año (posiciones 3-4) son la cifra confiable — el decodificador marca cualquier cosa que no se ajuste al patrón estándar de semana.",
    midCtaHeading: "¿Comprando un carrito de calle con un VIN real?",
    midCtaSub: "Algunos vehículos de baja velocidad están registrados con un VIN verdadero de 17 caracteres. Si el tuyo tiene uno, decodifícalo gratis para la marca, modelo, año e historial completo.",
    midCtaBtn: "Decodifica un VIN de 17 caracteres",
    h2Buy: "Verifica el serial antes de comprar un carrito usado",
    buy1: "El número de serie es la identidad de un carrito de golf, así que es lo primero a verificar en una compra usada. Decodifica el año y confirma que coincida con lo que el vendedor anunció — los años modelo en carritos son fáciles de falsificar porque no hay título ni VIN vial manteniendo a todos honestos.",
    buy2: "Coincide el serial en el chasis con cualquier etiqueta y con la factura de venta. Luego usa el año modelo exacto para ponerle precio al carrito y ordenar las baterías, controlador y partes correctas — los componentes de carritos de golf son estrictamente específicos por año y modelo.",
    buy3: "Para detalles de construcción o para confirmar que un carrito no esté reportado como robado, contacta al fabricante directamente con el serial del chasis — los carritos de golf no están en las bases de datos de robo de vehículos viales que los autos sí están.",
    redFlagsTitle: "Banderas rojas del serial de carrito de golf",
    redFlags: [
      "El año decodificado no coincide con el año anunciado",
      "El serial en el chasis difiere de la etiqueta o factura de venta",
      "El área del chasis se ve lijada o repintada sobre el estampado",
      "El vendedor no puede o no quiere mostrarte el número de serie",
      "Sin factura de venta en una compra usada de particular",
    ],
    h2Internal: "Más búsquedas de vehículos",
    internalIntro: "¿Decodificando algo con un VIN vial? Estas herramientas te cubren.",
    internalLinks: [
      { href: "/", label: "Decodificador VIN de auto y camión", desc: "Para un LSV de calle con un VIN real de 17 caracteres, decodifícalo aquí para marca, modelo y año." },
      { href: "/motorcycle-vin-search", label: "Búsqueda VIN de motocicleta", desc: "Decodifica el número de chasis de una motocicleta o ATV para marca, modelo y motor." },
      { href: "/hin-lookup", label: "Búsqueda HIN (VIN de barco)", desc: "El equivalente al serial de un barco — decodifica un Número de Identificación del Casco de 12 caracteres." },
      { href: "/rv-vin-check", label: "Verificación VIN de RV", desc: "Decodifica e historial-verifica el VIN de una autocaravana o tráiler de viaje." },
      { href: "/stolen-vehicle-check", label: "Verificación vehículo robado", desc: "Para vehículos viales con VIN — confirma que no esté marcado como robado antes de comprar." },
      { href: "/chassis-number-lookup", label: "Búsqueda número de chasis", desc: "El mismo VIN de 17 caracteres se llama número de chasis fuera de Norteamérica." },
    ],
    h2Faq: "Búsqueda VIN / serial de carrito de golf — Preguntas frecuentes",
    faqIntro: "Respuestas directas a lo que más preguntan los dueños y compradores de carritos de golf.",
    bottomBadge: "Gratis · Instantáneo · Decodificador Club Car",
    ctaBottomHeading: "Encuentra el año de tu carrito de golf desde el serial",
    ctaBottomSub: "Desplázate hacia arriba para decodificar un serial Club Car al instante, o usa las guías de marca para leer un año Yamaha o E-Z-GO. Gratis, sin registro.",
    ctaBottomNote: "Sin tarjeta de crédito · Sin registro · Guía honesta y precisa por marca",
  },
} as const;

const FAQS_EN = [
  { question: "Do golf carts have a VIN?", answer: "Not in the road-vehicle sense. Golf carts are low-speed off-road vehicles and are not required to carry a 17-character VIN like a car or truck. Instead, each manufacturer assigns a serial number that identifies the model and build year. People search 'golf cart VIN' but what they actually need is the serial number — which does the same job for identifying a cart." },
  { question: "How do I tell what year my golf cart is?", answer: "Find the serial number and read the year code from it. On a Club Car, the serial is two letters followed by the two-digit model year and a two-digit week (e.g. PG05 = 2005). On a Yamaha, the year is read from a model-prefix chart. On an E-Z-GO, newer models show the year in the serial/manufacturer number while older ones use a date code. Locate the serial first, then match it to the brand's chart." },
  { question: "Where is the serial number on a golf cart?", answer: "It depends on the brand. Club Car: on a bar-code label under the glove box or beneath the driver-side seat, and stamped on the frame. E-Z-GO: under the seat or on the frame near the controller, plus a manufacturer number on the body. Yamaha: stamped on the frame under the seat and on a sticker beneath the body. Always check the frame stamping against any label." },
  { question: "How do I decode a Club Car serial number?", answer: "A Club Car serial is two letters (the model/assembly prefix) followed by the two-digit model year, the two-digit week of production, and a sequence number. For example PG0512 decodes to model year 2005, week 12. Enter it into the decoder above to read the year instantly." },
  { question: "How do I find the year of a Yamaha golf cart by serial number?", answer: "Yamaha encodes the year in the model code at the start of the serial, not in a fixed digit position, so you read it from a Yamaha year/model-prefix chart rather than a simple formula. Locate the serial stamped on the frame under the seat (often prefixed J for gas or G for electric on G-series carts), then match the model prefix to Yamaha's chart to find the year." },
  { question: "How do I find the year of an E-Z-GO golf cart?", answer: "E-Z-GO uses a manufacturer code plus a serial number. On many models built from the late 1990s onward the model year is embedded in the manufacturer's number, while older carts use a date/build code. Find the serial and manufacturer number under the seat or on the frame, then match it to an E-Z-GO year chart for that era." },
  { question: "Why does the year on my golf cart matter?", answer: "The model year determines which parts, batteries, controllers, and accessories fit your cart — golf cart components are year- and model-specific. It also affects resale value and helps confirm a seller's claim before you buy. Knowing the exact year saves you from ordering the wrong parts." },
  { question: "Can a golf cart serial number be used to check if it's stolen?", answer: "A serial number is what police and the manufacturer use to identify a specific cart, so it's worth recording — but golf carts aren't in the national road-vehicle theft databases that cars are, because they don't carry a road VIN. If you're buying used, ask for the bill of sale, match the frame serial to any documents, and contact the manufacturer with the serial to confirm build details." },
  { question: "Is a golf cart serial number the same as a VIN?", answer: "Functionally it serves the same purpose — uniquely identifying the vehicle and encoding its build year — but it is not a 17-character ISO 3779 road VIN. Some street-legal LSV (low-speed vehicle) conversions are assigned a true 17-character VIN so they can be registered for road use; a standard golf cart is identified by its manufacturer serial number." },
];

const FAQS_ES = [
  { question: "¿Los carritos de golf tienen VIN?", answer: "No en el sentido de vehículo vial. Los carritos de golf son vehículos de baja velocidad fuera de carretera y no se requiere que lleven un VIN de 17 caracteres como un auto o camión. En su lugar, cada fabricante asigna un número de serie que identifica el modelo y año de construcción. Las personas buscan 'VIN de carrito de golf' pero lo que realmente necesitan es el número de serie — que hace el mismo trabajo de identificar un carrito." },
  { question: "¿Cómo sé qué año es mi carrito de golf?", answer: "Encuentra el número de serie y lee el código de año de él. En un Club Car, el serial son dos letras seguidas del año modelo de dos dígitos y una semana de dos dígitos (ej. PG05 = 2005). En un Yamaha, el año se lee de una tabla de prefijo de modelo. En un E-Z-GO, los modelos más nuevos muestran el año en el número de serie/fabricante mientras los más antiguos usan un código de fecha. Localiza el serial primero, luego coincídelo con la tabla de la marca." },
  { question: "¿Dónde está el número de serie en un carrito de golf?", answer: "Depende de la marca. Club Car: en una etiqueta de código de barras debajo de la guantera o debajo del asiento del lado del conductor, y estampado en el chasis. E-Z-GO: debajo del asiento o en el chasis cerca del controlador, más un número de fabricante en la carrocería. Yamaha: estampado en el chasis debajo del asiento y en una calcomanía debajo de la carrocería. Siempre verifica el estampado del chasis contra cualquier etiqueta." },
  { question: "¿Cómo decodifico un número de serie Club Car?", answer: "Un serial Club Car son dos letras (el prefijo de modelo/ensamblaje) seguidas del año modelo de dos dígitos, la semana de dos dígitos de producción y un número de secuencia. Por ejemplo PG0512 decodifica al año modelo 2005, semana 12. Ingrésalo al decodificador de arriba para leer el año al instante." },
  { question: "¿Cómo encuentro el año de un carrito Yamaha por número de serie?", answer: "Yamaha codifica el año en el código de modelo al inicio del serial, no en una posición fija de dígito, así que lo lees de una tabla de prefijo año/modelo de Yamaha en lugar de una fórmula simple. Localiza el serial estampado en el chasis debajo del asiento (a menudo con prefijo J para gas o G para eléctrico en carritos serie G), luego coincide el prefijo de modelo con la tabla de Yamaha para encontrar el año." },
  { question: "¿Cómo encuentro el año de un carrito E-Z-GO?", answer: "E-Z-GO usa un código de fabricante más un número de serie. En muchos modelos construidos desde finales de los 90 en adelante el año modelo está incorporado en el número del fabricante, mientras los carritos más antiguos usan un código de fecha/construcción. Encuentra el serial y número de fabricante debajo del asiento o en el chasis, luego coincídelo con una tabla de año E-Z-GO para esa era." },
  { question: "¿Por qué importa el año de mi carrito de golf?", answer: "El año modelo determina qué partes, baterías, controladores y accesorios encajan en tu carrito — los componentes de carritos de golf son específicos por año y modelo. También afecta el valor de reventa y ayuda a confirmar la afirmación de un vendedor antes de comprar. Conocer el año exacto te evita ordenar las partes equivocadas." },
  { question: "¿Se puede usar un número de serie de carrito de golf para verificar si está robado?", answer: "Un número de serie es lo que la policía y el fabricante usan para identificar un carrito específico, así que vale la pena registrarlo — pero los carritos de golf no están en las bases de datos nacionales de robo de vehículos viales que los autos sí están, porque no llevan un VIN vial. Si estás comprando usado, pide la factura de venta, coincide el serial del chasis con cualquier documento y contacta al fabricante con el serial para confirmar detalles de construcción." },
  { question: "¿Un número de serie de carrito de golf es lo mismo que un VIN?", answer: "Funcionalmente sirve para el mismo propósito — identificar únicamente el vehículo y codificar su año de construcción — pero no es un VIN vial ISO 3779 de 17 caracteres. Algunas conversiones LSV (vehículo de baja velocidad) de calle reciben un VIN verdadero de 17 caracteres para que puedan registrarse para uso vial; un carrito de golf estándar se identifica por su número de serie del fabricante." },
];

interface Props { locale: Locale; }

export default function GolfCartVinLookupBody({ locale }: Props) {
  const c = COPY[locale];
  const faqs = locale === "es" ? FAQS_ES : FAQS_EN;
  const link = (en: string) => (locale === "es" ? `/es${en}` : en);

  return (
    <article className="pb-16 bg-surface">
      <div className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
          <Breadcrumbs items={[{ label: c.home, href: locale === "es" ? "/es" : "/" }, { label: c.crumb }]} onDark />

          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <Car className="w-4 h-4" /> {c.badge}
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
            {c.h1Lead}
            <span style={{ color: "var(--color-secondary-container)" }}>{c.h1Accent}</span>
          </h1>

          <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
            {c.intro1}<strong>{c.introBold}</strong>{c.intro2}
          </p>

          <GolfCartDecoder locale={locale} />

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            {c.trustStats.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-center">
                  <Icon className="w-5 h-5 mx-auto mb-1 text-white/70" />
                  <div className="text-lg sm:text-2xl font-headline font-black text-white">{s.value}</div>
                  <div className="text-[11px] text-white/65 leading-tight mt-0.5">{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <section className="py-12 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Vin}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">
            {c.vinIntroPre}<strong>{c.vinIntroBold1}</strong>{c.vinIntroMid}<strong>{c.vinIntroBold2}</strong>{c.vinIntroSuffix}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
              <div className="text-[11px] font-black uppercase tracking-wider text-on-surface-variant mb-2">{c.cartTag}</div>
              <p className="text-lg font-headline font-extrabold text-on-surface mb-3">{c.cartTitle}</p>
              <ul className="space-y-2 text-sm text-on-surface-variant">
                {c.cartBullets.map((b) => (
                  <li key={b} className="flex gap-2"><span>·</span><span>{b}</span></li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5 sm:p-6">
              <div className="text-[11px] font-black uppercase tracking-wider text-primary mb-2">{c.carTag}</div>
              <p className="text-lg font-headline font-extrabold text-primary mb-3">{c.carTitle}</p>
              <ul className="space-y-2 text-sm text-on-surface-variant">
                {c.carBulletsPre.map((b) => (
                  <li key={b} className="flex gap-2"><span>·</span><span>{b}</span></li>
                ))}
                <li className="flex gap-2">
                  <span>·</span>
                  <span>
                    {c.carBullet3Pre}
                    <Link href={link("/")} className="text-primary font-semibold underline underline-offset-2">{c.carBullet3Link}</Link>
                    {c.carBullet3Suffix}
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-6 rounded-2xl bg-secondary-container/40 border border-outline-variant p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
              <p className="text-sm text-on-surface leading-relaxed">
                <strong className="text-on-surface">{c.bottomLineBold}</strong>
                {c.bottomLineMid}<strong>{c.bottomLineBold2}</strong>{c.bottomLineSuffix}
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2How}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl">{c.howIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {c.howSteps.map((s, i) => {
              const Icon = HOW_ICONS[i];
              return (
                <div key={s.step} className="flex gap-4 items-start rounded-2xl border border-outline-variant bg-surface p-5 sm:p-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-[11px] font-black uppercase tracking-wider text-primary/70 mb-0.5">{c.stepWord} {s.step}</div>
                    <h3 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1.5">{s.title}</h3>
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{s.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Brand}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl">{c.brandIntro}</p>
          <div className="overflow-x-auto rounded-2xl border border-outline-variant">
            <table className="w-full border-collapse min-w-[720px] text-sm">
              <thead className="bg-surface-container-low">
                <tr>
                  <th className="p-4 text-left font-headline font-extrabold text-primary">{c.brandColBrand}</th>
                  <th className="p-4 text-left font-headline font-extrabold text-primary">{c.brandColWhere}</th>
                  <th className="p-4 text-left font-headline font-extrabold text-primary">{c.brandColFormat}</th>
                  <th className="p-4 text-left font-headline font-extrabold text-primary">{c.brandColDecodes}</th>
                </tr>
              </thead>
              <tbody>
                {c.brandRows.map((row) => (
                  <tr key={row.brand} className="border-t border-outline-variant/60 align-top">
                    <td className="p-4 font-bold text-on-surface whitespace-nowrap">{row.brand}</td>
                    <td className="p-4 text-on-surface-variant leading-relaxed">{row.where}</td>
                    <td className="p-4 text-on-surface-variant leading-relaxed">{row.format}</td>
                    <td className="p-4">
                      <span className="inline-block rounded-full bg-primary/10 text-primary text-xs font-bold px-2.5 py-1 whitespace-nowrap">{row.decodes}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-on-surface-variant">
            {c.brandFooterPre}<strong>{c.brandFooterBold}</strong>{c.brandFooterSuffix}
          </p>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Breakdown}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl">
            {c.breakdownIntroPre}
            <code className="font-mono text-xs bg-surface-container-low rounded px-2 py-1 text-primary">{c.breakdownExample}</code>
            {c.breakdownIntroSuffix}
          </p>
          <div className="overflow-x-auto rounded-2xl border border-outline-variant">
            <table className="w-full border-collapse min-w-[560px] text-sm">
              <thead className="bg-surface-container-low">
                <tr>
                  <th className="p-4 text-left font-headline font-extrabold text-primary">{c.breakdownColPos}</th>
                  <th className="p-4 text-left font-headline font-extrabold text-primary">{c.breakdownColEx}</th>
                  <th className="p-4 text-left font-headline font-extrabold text-primary">{c.breakdownColMean}</th>
                </tr>
              </thead>
              <tbody>
                {c.breakdownRows.map((row) => (
                  <tr key={row.pos} className="border-t border-outline-variant/60 align-top">
                    <td className="p-4">
                      <code className="font-mono text-xs bg-surface-container-low rounded px-2 py-1 text-primary">{row.pos}</code>
                    </td>
                    <td className="p-4 font-mono font-bold text-on-surface whitespace-nowrap">{row.ex}</td>
                    <td className="p-4 text-on-surface-variant leading-relaxed">{row.mean}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex items-start gap-2 rounded-xl bg-surface-container-low border border-outline-variant p-4 text-xs text-on-surface-variant">
            <Hash className="w-4 h-4 flex-shrink-0 mt-0.5 text-primary" />
            <span>{c.breakdownNote}</span>
          </div>
        </section>

        <section className="py-10">
          <div className="rounded-3xl bg-primary p-7 sm:p-10 text-center">
            <Car className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">{c.midCtaHeading}</h2>
            <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">{c.midCtaSub}</p>
            <Link href={link("/")} className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-primary hover:opacity-90 transition">
              <Search className="w-4 h-4" /> {c.midCtaBtn}
            </Link>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{c.h2Buy}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>{c.buy1}</p>
              <p>{c.buy2}</p>
              <p>{c.buy3}</p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.redFlagsTitle}</h3>
              </div>
              <ul className="space-y-2 text-sm text-on-surface">
                {c.redFlags.map((reason) => (
                  <li key={reason} className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Internal}</h2>
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

        <section className="py-10">
          <VinCheckBanner />
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Faq}</h2>
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

        <section className="py-14 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-wider mb-4">
            <Zap className="w-3.5 h-3.5" /> {c.bottomBadge}
          </div>
          <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3">{c.ctaBottomHeading}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">{c.ctaBottomSub}</p>
          <div className="flex items-center justify-center gap-2 text-xs text-on-surface-variant">
            <Check className="w-3.5 h-3.5 text-green-500" strokeWidth={3} />
            {c.ctaBottomNote}
          </div>
        </section>

        <RelatedChecks exclude="/golf-cart-vin-lookup" />
      </div>
    </article>
  );
}

export { FAQS_EN, FAQS_ES };
