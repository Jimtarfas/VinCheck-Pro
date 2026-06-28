/**
 * Shared body for /motorcycle-vin-check — Wave 18 batch 3.
 * Accepts locale and reads every visible string from COPY={en,es}.
 */

import Link from "next/link";
import { Check } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import type { Locale } from "@/i18n/config";

interface Faq {
  question: string;
  answer: string;
}

const COPY = {
  en: {
    crumbs: { home: "Home", current: "Motorcycle VIN Check" },
    h1: "Motorcycle VIN Check",
    lede: "Buying a used motorcycle without a VIN check is a significant risk. Motorcycles have some of the highest theft rates of any vehicle category, and stolen bikes are frequently relicensed and resold. A motorcycle VIN check reveals title status, theft records, salvage brands, and accident history \u2014 the same essential data points that protect car buyers also protect motorcycle buyers from costly mistakes.",
    formH2: "Run a Free Motorcycle VIN Check",
    diffH2: "How Motorcycle VINs Differ from Car VINs",
    diff: {
      p1: "Since 1981, all motorcycles sold in the United States \u2014 like automobiles \u2014 have used the standardized 17-character VIN format mandated by NHTSA. The structure is the same: the first three characters identify the World Manufacturer Identifier, characters 4\u20138 form the Vehicle Descriptor Section, character 9 is the check digit, character 10 encodes the model year, character 11 identifies the assembly plant, and characters 12\u201317 are the sequential production number.",
      p2: "The key differences from automobile VINs are in the specific codes used within the standard structure. Motorcycle manufacturer codes are different from car manufacturer codes. Engine displacement is encoded differently. Body style codes reflect motorcycle categories (sport, cruiser, dual-sport, off-road) rather than car body styles.",
      p3: "VIN location on motorcycles also differs from automobiles. On most motorcycles, the VIN is stamped into the frame \u2014 typically on the steering head (where the forks attach to the frame), on the left side of the frame near the engine, or in both locations. Some manufacturers also place a VIN plate on the frame in addition to the stamped number.",
    },
    reportH2: "What\u2019s in a Motorcycle VIN Report",
    reportIntro: "A comprehensive motorcycle VIN report covers the same categories as a car history report, with some motorcycle-specific considerations. Title brands for motorcycles include the standard salvage, rebuilt, and flood brands, but also motorcycle-specific categories like \u201coff-road use only\u201d and \u201cparts only\u201d \u2014 titles that indicate the bike was deemed unroadworthy or was stripped for parts.",
    reportItems: [
      { strong: "Title and registration history", rest: " \u2014 all states where the motorcycle was titled, including any brands or status changes." },
      { strong: "Theft records", rest: " \u2014 NICB and law enforcement theft reports, including whether the bike is currently on a stolen vehicle list." },
      { strong: "Accident and damage history", rest: " \u2014 insurance claims and reported collision damage." },
      { strong: "Odometer records", rest: " \u2014 mileage readings at title transfers to detect rollback." },
      { strong: "VIN decode", rest: " \u2014 manufacturer, model year, engine displacement, and assembly plant from the VIN structure." },
    ],
    brandsH2: "Motorcycle Title Brands to Watch For",
    brands: {
      p1: "Title brands on motorcycles carry the same implications as on automobiles, but the specific risks differ because of motorcycle construction. A salvage-branded car may be rebuildable with extensive structural repair; a salvage-branded motorcycle that suffered frame damage may be fundamentally unsafe regardless of cosmetic repair because the frame is the primary structural element of the bike.",
      p2: "Rebuilt title motorcycles \u2014 those that were previously salvage but have been inspected and retitled \u2014 require careful scrutiny. The inspection process varies by state, and some states have minimal requirements. A motorcycle with a rebuilt title from a state with minimal inspection requirements should be treated with the same caution as a salvage title bike. Have the bike inspected by a qualified motorcycle mechanic who can assess frame integrity before purchase.",
      p3Before: "Run your motorcycle VIN check alongside a ",
      p3LinkSalvage: "salvage title check",
      p3Mid: " and a ",
      p3LinkStolen: "stolen vehicle check",
      p3After: " to get complete title and theft history coverage.",
    },
    theftH2: "Checking for Stolen Motorcycles",
    theft: {
      p1: "Motorcycles are stolen at a significantly higher rate per unit than automobiles. According to NICB data, hundreds of thousands of motorcycles are reported stolen each year in the United States, with recovery rates substantially lower than for cars. The secondary market for stolen motorcycles is active because bikes are easy to transport, can be quickly stripped for parts, or can be retitled with altered VINs in jurisdictions with less rigorous inspection.",
      p2: "A VIN theft check queries NICB\u2019s database and law enforcement stolen vehicle records to determine whether the VIN you\u2019re checking has been reported stolen. This check should be run on every used motorcycle purchase, not just when something seems suspicious. Many stolen motorcycles are sold with fraudulent documentation that appears completely legitimate.",
      p3: "Before completing any used motorcycle purchase, physically verify the VIN stamped on the frame against the title document and insurance card. Altered or restamped VINs on the frame are a strong indicator of a stolen or cloned motorcycle. If the numbers don\u2019t match or show signs of alteration, walk away.",
    },
    brandPrefixesH2: "Top Motorcycle Brands and VIN Prefixes",
    brandPrefixesIntro: "Major motorcycle manufacturers each have distinctive WMI codes that appear in the first three characters of the VIN. These codes are internationally standardized and allow instant brand identification from the VIN alone.",
    brandPrefixes: [
      { strong: "Harley-Davidson", rest: " \u2014 begins with 1HD (US manufacturing); international plants use different prefixes." },
      { strong: "Honda motorcycles", rest: " \u2014 JH2 (Japan), 1HF, or 19H depending on production year and plant." },
      { strong: "Kawasaki", rest: " \u2014 JKBVD or similar JK prefix codes for Japan manufacturing." },
      { strong: "Yamaha", rest: " \u2014 JYA prefix for Japanese-built models; VBKV for European-manufactured bikes." },
      { strong: "Suzuki", rest: " \u2014 JS1 prefix for Japan; different codes for other production regions." },
    ],
    faqH2: "Frequently Asked Questions",
    cta: {
      h2: "Run a Free Motorcycle VIN Check",
      body: "Enter a 17-character motorcycle VIN to check title status, theft records, accident history, and specifications.",
    },
  },
  es: {
    crumbs: { home: "Inicio", current: "Verificaci\u00f3n de VIN de motocicleta" },
    h1: "Verificaci\u00f3n de VIN de motocicleta",
    lede: "Comprar una motocicleta usada sin una verificaci\u00f3n de VIN es un riesgo importante. Las motos tienen una de las tasas de robo m\u00e1s altas de cualquier categor\u00eda de veh\u00edculo, y las motos robadas con frecuencia se re-licencian y revenden. Una verificaci\u00f3n de VIN de moto revela el estado del t\u00edtulo, registros de robo, marcas de salvamento y el historial de accidentes \u2014 los mismos datos esenciales que protegen a los compradores de autos tambi\u00e9n protegen a los compradores de motos de errores costosos.",
    formH2: "Haz una verificaci\u00f3n gratis de VIN de moto",
    diffH2: "C\u00f3mo se diferencian los VIN de motos y de autos",
    diff: {
      p1: "Desde 1981, todas las motocicletas vendidas en Estados Unidos \u2014 al igual que los autom\u00f3viles \u2014 usan el formato estandarizado de VIN de 17 caracteres exigido por la NHTSA. La estructura es la misma: los primeros tres caracteres identifican el Identificador Mundial del Fabricante, los caracteres 4\u20138 forman la Secci\u00f3n Descriptora del Veh\u00edculo, el car\u00e1cter 9 es el d\u00edgito de verificaci\u00f3n, el car\u00e1cter 10 codifica el a\u00f1o modelo, el car\u00e1cter 11 identifica la planta de ensamblaje, y los caracteres 12\u201317 son el n\u00famero de serie de producci\u00f3n.",
      p2: "Las diferencias clave con los VIN de autom\u00f3viles est\u00e1n en los c\u00f3digos espec\u00edficos usados dentro de la estructura est\u00e1ndar. Los c\u00f3digos del fabricante para motos son distintos de los de autos. La cilindrada del motor se codifica de forma diferente. Los c\u00f3digos de estilo de carrocer\u00eda reflejan categor\u00edas de motos (deportiva, crucero, dual-sport, todoterreno) en lugar de estilos de carrocer\u00eda de autom\u00f3viles.",
      p3: "La ubicaci\u00f3n del VIN en motos tambi\u00e9n difiere de la de los autom\u00f3viles. En la mayor\u00eda de las motos, el VIN se estampa en el chasis \u2014 t\u00edpicamente en el cabezal de direcci\u00f3n (donde se unen las horquillas al chasis), en el lado izquierdo del chasis cerca del motor, o en ambas ubicaciones. Algunos fabricantes tambi\u00e9n colocan una placa con el VIN en el chasis adem\u00e1s del n\u00famero estampado.",
    },
    reportH2: "Qu\u00e9 incluye un reporte de VIN de motocicleta",
    reportIntro: "Un reporte de VIN de moto completo cubre las mismas categor\u00edas que un reporte de historial de auto, con algunas consideraciones espec\u00edficas para motos. Las marcas de t\u00edtulo para motos incluyen las marcas est\u00e1ndar de salvamento, reconstruido e inundaci\u00f3n, pero tambi\u00e9n categor\u00edas espec\u00edficas para motos como \u201csolo uso todoterreno\u201d y \u201csolo partes\u201d \u2014 t\u00edtulos que indican que la moto fue declarada no apta para la v\u00eda o fue desmantelada para piezas.",
    reportItems: [
      { strong: "Historial de t\u00edtulo y registro", rest: " \u2014 todos los estados donde la moto fue titulada, incluyendo marcas o cambios de estado." },
      { strong: "Registros de robo", rest: " \u2014 reportes de robo de NICB y autoridades, incluyendo si la moto est\u00e1 actualmente en una lista de veh\u00edculos robados." },
      { strong: "Historial de accidentes y da\u00f1os", rest: " \u2014 reclamos de seguro y da\u00f1os por colisi\u00f3n reportados." },
      { strong: "Registros del od\u00f3metro", rest: " \u2014 lecturas de millaje en transferencias de t\u00edtulo para detectar manipulaci\u00f3n." },
      { strong: "Decodificaci\u00f3n del VIN", rest: " \u2014 fabricante, a\u00f1o modelo, cilindrada del motor y planta de ensamblaje a partir de la estructura del VIN." },
    ],
    brandsH2: "Marcas de t\u00edtulo de moto a las que prestar atenci\u00f3n",
    brands: {
      p1: "Las marcas de t\u00edtulo en motos tienen las mismas implicaciones que en autom\u00f3viles, pero los riesgos espec\u00edficos difieren por la construcci\u00f3n de la moto. Un auto con t\u00edtulo de salvamento puede ser reconstruible con reparaciones estructurales extensas; una moto con t\u00edtulo de salvamento que sufri\u00f3 da\u00f1o al chasis puede ser fundamentalmente insegura sin importar la reparaci\u00f3n cosm\u00e9tica, porque el chasis es el elemento estructural principal de la moto.",
      p2: "Las motos con t\u00edtulo reconstruido \u2014 las que estaban previamente como salvamento pero han sido inspeccionadas y re-tituladas \u2014 requieren un escrutinio cuidadoso. El proceso de inspecci\u00f3n var\u00eda por estado y algunos estados tienen requisitos m\u00ednimos. Una moto con t\u00edtulo reconstruido de un estado con requisitos m\u00ednimos de inspecci\u00f3n debe tratarse con la misma cautela que una moto con t\u00edtulo de salvamento. Haz que un mec\u00e1nico calificado de motos eval\u00fae la integridad del chasis antes de comprar.",
      p3Before: "Haz tu verificaci\u00f3n de VIN de moto junto con una ",
      p3LinkSalvage: "verificaci\u00f3n de t\u00edtulo de salvamento",
      p3Mid: " y una ",
      p3LinkStolen: "verificaci\u00f3n de veh\u00edculo robado",
      p3After: " para obtener cobertura completa del historial de t\u00edtulo y robo.",
    },
    theftH2: "C\u00f3mo revisar si una moto est\u00e1 robada",
    theft: {
      p1: "Las motocicletas se roban a una tasa significativamente m\u00e1s alta por unidad que los autom\u00f3viles. Seg\u00fan datos del NICB, cientos de miles de motos se reportan robadas cada a\u00f1o en Estados Unidos, con tasas de recuperaci\u00f3n sustancialmente m\u00e1s bajas que las de los autos. El mercado secundario de motos robadas es activo porque las motos son f\u00e1ciles de transportar, pueden desmantelarse r\u00e1pidamente para piezas, o pueden re-titularse con VINs alterados en jurisdicciones con inspecciones menos rigurosas.",
      p2: "Una verificaci\u00f3n de robo por VIN consulta la base de datos del NICB y los registros policiales de veh\u00edculos robados para determinar si el VIN que est\u00e1s revisando se ha reportado como robado. Esta verificaci\u00f3n debe hacerse en cada compra de moto usada, no solo cuando algo parece sospechoso. Muchas motos robadas se venden con documentaci\u00f3n fraudulenta que parece completamente leg\u00edtima.",
      p3: "Antes de completar cualquier compra de moto usada, verifica f\u00edsicamente el VIN estampado en el chasis contra el documento del t\u00edtulo y la tarjeta del seguro. VINs alterados o re-estampados en el chasis son un fuerte indicador de una moto robada o clonada. Si los n\u00fameros no coinciden o muestran se\u00f1ales de alteraci\u00f3n, al\u00e9jate.",
    },
    brandPrefixesH2: "Principales marcas de motos y prefijos VIN",
    brandPrefixesIntro: "Los principales fabricantes de motos tienen c\u00f3digos WMI distintivos que aparecen en los primeros tres caracteres del VIN. Estos c\u00f3digos est\u00e1n estandarizados internacionalmente y permiten la identificaci\u00f3n inmediata de la marca solo a partir del VIN.",
    brandPrefixes: [
      { strong: "Harley-Davidson", rest: " \u2014 comienza con 1HD (manufactura en EE. UU.); las plantas internacionales usan prefijos diferentes." },
      { strong: "Motocicletas Honda", rest: " \u2014 JH2 (Jap\u00f3n), 1HF, o 19H seg\u00fan el a\u00f1o de producci\u00f3n y la planta." },
      { strong: "Kawasaki", rest: " \u2014 JKBVD o c\u00f3digos similares con prefijo JK para manufactura en Jap\u00f3n." },
      { strong: "Yamaha", rest: " \u2014 prefijo JYA para modelos hechos en Jap\u00f3n; VBKV para motos fabricadas en Europa." },
      { strong: "Suzuki", rest: " \u2014 prefijo JS1 para Jap\u00f3n; c\u00f3digos diferentes para otras regiones de producci\u00f3n." },
    ],
    faqH2: "Preguntas frecuentes",
    cta: {
      h2: "Haz una verificaci\u00f3n gratis de VIN de moto",
      body: "Ingresa un VIN de motocicleta de 17 caracteres para revisar el estado del t\u00edtulo, registros de robo, historial de accidentes y especificaciones.",
    },
  },
} as const;

export const FAQS_EN: Faq[] = [
  { question: "Do motorcycles have 17-character VINs like cars?", answer: "Yes. On-road motorcycles built for the 1981 model year onward use the same standardized 17-character VIN as cars, mandated by NHTSA and based on the ISO 3779 format. The structure is identical: characters 1\u20133 are the World Manufacturer Identifier, 4\u20138 the descriptor section, 9 the check digit, 10 the model year, 11 the plant, and 12\u201317 the production sequence. Pre-1981 bikes used shorter, manufacturer-specific numbers that a standard decoder cannot read." },
  { question: "Where is the VIN located on a motorcycle?", answer: "The primary VIN is stamped into the steering head (frame neck) on most motorcycles \u2014 on Harley-Davidsons it is on the right side of the frame neck, and on Japanese sportbikes it sits just below the handlebars. Many bikes also carry a VIN or partial VIN on the engine case near the cylinder head. Note that the frame number is the legal VIN; the engine has its own separate serial number, so a non-matching engine number does not always mean fraud." },
  { question: "Does a motorcycle VIN check show title, salvage, and theft history?", answer: "Yes. A motorcycle VIN check surfaces title and registration history, brand records such as salvage, rebuilt, flood, and parts-only, plus theft records. Title brands and salvage data come from NMVTIS-backed sources that aggregate all 50 state DMVs, while theft status is cross-referenced against National Insurance Crime Bureau (NICB) and law-enforcement stolen-vehicle records. The report also includes odometer readings recorded at title transfers." },
  { question: "How can I tell if a used motorcycle is stolen?", answer: "Run the frame VIN through a theft check that queries NICB and law-enforcement stolen-vehicle databases to see whether it has been reported stolen. Then physically inspect the VIN stamped on the steering head: restamped, ground-down, or altered digits are a strong theft indicator. Cross-check that the stamped frame VIN exactly matches the title, registration, and insurance card. If the numbers differ or show tampering, walk away from the purchase." },
  { question: "Can I check motorcycle recalls by VIN?", answer: "Yes. NHTSA maintains open-recall records by VIN for motorcycles sold in the United States, and manufacturers issue safety recalls for defects such as brake, fuel-system, or electrical faults. A VIN-based recall lookup tells you whether any open recalls have not yet been remedied. Because recalls are tied to the specific VIN, an unrepaired recall stays flagged until the work is completed at an authorized dealer at no cost to the owner." },
  { question: "How do I verify a used motorcycle before buying it?", answer: "Run the 17-character VIN to confirm title status, salvage or rebuilt brands, theft records, and reported accident or odometer history. Physically match the stamped frame VIN to the title and registration, and check for tampering. Because a motorcycle frame is its main structural component, have any salvage or rebuilt bike inspected by a qualified mechanic for frame integrity before you buy. Pair the VIN check with a salvage-title and stolen-vehicle lookup for full coverage." },
  { question: "Do dirt bikes and off-road motorcycles have VINs?", answer: "Coverage is inconsistent. Many street-legal and dual-sport off-road bikes carry a standard 17-character VIN, but competition-only dirt bikes and some youth or off-road models may use a shorter manufacturer-specific frame number instead, and not every state titles off-road vehicles. If an off-road bike lacks a 17-character VIN, a standard decoder and NMVTIS history check may return limited or no results, so verify the frame number directly with the manufacturer or a marque registry." },
];

export const FAQS_ES: Faq[] = [
  { question: "\u00bfLas motos tienen VINs de 17 caracteres como los autos?", answer: "S\u00ed. Las motos de calle construidas a partir del a\u00f1o modelo 1981 usan el mismo VIN estandarizado de 17 caracteres que los autos, exigido por la NHTSA y basado en el formato ISO 3779. La estructura es id\u00e9ntica: los caracteres 1\u20133 son el Identificador Mundial del Fabricante, 4\u20138 la secci\u00f3n descriptora, 9 el d\u00edgito de verificaci\u00f3n, 10 el a\u00f1o modelo, 11 la planta y 12\u201317 la secuencia de producci\u00f3n. Las motos anteriores a 1981 usaron n\u00fameros m\u00e1s cortos espec\u00edficos del fabricante que un decodificador est\u00e1ndar no puede leer." },
  { question: "\u00bfD\u00f3nde se ubica el VIN en una moto?", answer: "El VIN principal est\u00e1 estampado en el cabezal de direcci\u00f3n (cuello del chasis) en la mayor\u00eda de las motos \u2014 en las Harley-Davidson est\u00e1 en el lado derecho del cuello del chasis, y en las deportivas japonesas se ubica justo debajo del manillar. Muchas motos tambi\u00e9n llevan un VIN o VIN parcial en la carcasa del motor cerca de la cabeza de los cilindros. Nota que el n\u00famero del chasis es el VIN legal; el motor tiene su propio n\u00famero de serie separado, por lo que un n\u00famero de motor que no coincida no siempre significa fraude." },
  { question: "\u00bfUna verificaci\u00f3n de VIN de moto muestra el historial de t\u00edtulo, salvamento y robo?", answer: "S\u00ed. Una verificaci\u00f3n de VIN de moto revela el historial de t\u00edtulo y registro, marcas como salvamento, reconstruido, inundaci\u00f3n y solo partes, adem\u00e1s de registros de robo. Las marcas de t\u00edtulo y los datos de salvamento vienen de fuentes respaldadas por NMVTIS que agregan las 50 DMVs estatales, mientras que el estado de robo se cruza con los registros del National Insurance Crime Bureau (NICB) y de veh\u00edculos robados de las autoridades. El reporte tambi\u00e9n incluye lecturas del od\u00f3metro registradas en transferencias de t\u00edtulo." },
  { question: "\u00bfC\u00f3mo puedo saber si una moto usada est\u00e1 robada?", answer: "Pasa el VIN del chasis por una verificaci\u00f3n de robo que consulte las bases de datos del NICB y de las autoridades para ver si se ha reportado como robada. Luego inspecciona f\u00edsicamente el VIN estampado en el cabezal de direcci\u00f3n: d\u00edgitos re-estampados, lijados o alterados son un fuerte indicador de robo. Verifica que el VIN del chasis coincida exactamente con el t\u00edtulo, registro y tarjeta del seguro. Si los n\u00fameros difieren o muestran manipulaci\u00f3n, al\u00e9jate de la compra." },
  { question: "\u00bfPuedo revisar retiros de seguridad de motos por VIN?", answer: "S\u00ed. La NHTSA mantiene registros de retiros abiertos por VIN para motos vendidas en Estados Unidos, y los fabricantes emiten retiros de seguridad por defectos como fallas de frenos, sistema de combustible o el\u00e9ctricos. Una b\u00fasqueda de retiros por VIN te dice si hay retiros abiertos no remediados. Como los retiros est\u00e1n ligados al VIN espec\u00edfico, un retiro no reparado permanece marcado hasta que el trabajo se complete en un concesionario autorizado sin costo para el due\u00f1o." },
  { question: "\u00bfC\u00f3mo verifico una moto usada antes de comprarla?", answer: "Ejecuta el VIN de 17 caracteres para confirmar el estado del t\u00edtulo, marcas de salvamento o reconstruido, registros de robo y el historial de accidentes u od\u00f3metro reportados. Compara f\u00edsicamente el VIN estampado en el chasis con el t\u00edtulo y el registro, y revisa si hay manipulaci\u00f3n. Como el chasis de una moto es su componente estructural principal, haz que un mec\u00e1nico calificado inspeccione la integridad del chasis de cualquier moto con salvamento o reconstruida antes de comprar. Combina la verificaci\u00f3n de VIN con una de t\u00edtulo de salvamento y de veh\u00edculo robado para cobertura completa." },
  { question: "\u00bfLas motos de cross y todoterreno tienen VINs?", answer: "La cobertura es inconsistente. Muchas motos de calle y dual-sport todoterreno llevan un VIN est\u00e1ndar de 17 caracteres, pero las motos de cross solo de competici\u00f3n y algunos modelos juveniles o todoterreno pueden usar en su lugar un n\u00famero de chasis m\u00e1s corto espec\u00edfico del fabricante, y no todos los estados titulan veh\u00edculos todoterreno. Si una moto todoterreno carece de un VIN de 17 caracteres, un decodificador est\u00e1ndar y una verificaci\u00f3n de historial NMVTIS pueden devolver resultados limitados o ninguno, as\u00ed que verifica el n\u00famero del chasis directamente con el fabricante o un registro de la marca." },
];

interface BodyProps {
  locale: Locale;
}

export default function MotorcycleVinCheckBody({ locale }: BodyProps) {
  const c = COPY[locale];
  const faqs = locale === "es" ? FAQS_ES : FAQS_EN;
  const link = (href: string) => (locale === "es" ? `/es${href}` : href);

  return (
    <>
      <article className="pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: c.crumbs.home, href: link("/") },
              { label: c.crumbs.current },
            ]}
          />

          <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
            {c.h1}
          </h1>
          <p className="mt-4 text-lg text-slate-700 leading-relaxed">{c.lede}</p>

          <div className="mt-8 p-6 bg-primary-50 rounded-2xl border border-primary-100">
            <h2 className="text-lg font-bold text-slate-900 mb-3">{c.formH2}</h2>
            <VinSearchForm size="sm" locale={locale} />
          </div>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">{c.diffH2}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.diff.p1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.diff.p2}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.diff.p3}</p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">{c.reportH2}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.reportIntro}</p>
          <ul className="mt-4 space-y-2 text-slate-600">
            {c.reportItems.map((item) => (
              <li key={item.strong} className="flex gap-2 items-start">
                <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>{item.strong}</strong>
                  {item.rest}
                </span>
              </li>
            ))}
          </ul>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">{c.brandsH2}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.brands.p1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.brands.p2}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            {c.brands.p3Before}
            <Link href={link("/salvage-title-check")} className="text-primary-600 hover:underline font-medium">
              {c.brands.p3LinkSalvage}
            </Link>
            {c.brands.p3Mid}
            <Link href={link("/stolen-vehicle-check")} className="text-primary-600 hover:underline font-medium">
              {c.brands.p3LinkStolen}
            </Link>
            {c.brands.p3After}
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">{c.theftH2}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.theft.p1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.theft.p2}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.theft.p3}</p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">{c.brandPrefixesH2}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.brandPrefixesIntro}</p>
          <ul className="mt-4 space-y-2 text-slate-600">
            {c.brandPrefixes.map((item) => (
              <li key={item.strong} className="flex gap-2 items-start">
                <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>{item.strong}</strong>
                  {item.rest}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </article>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <h2 className="text-2xl font-bold text-slate-900">{c.faqH2}</h2>
        <div className="mt-6 space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-xl border border-slate-200 bg-white p-5"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 list-none">
                <h3 className="text-base sm:text-lg font-semibold text-slate-900 m-0">
                  {faq.question}
                </h3>
                <span className="text-2xl text-primary-600 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-slate-600 leading-relaxed">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-4">
        <RelatedChecks exclude="/motorcycle-vin-check" />
      </div>

      <section className="py-14 bg-slate-50">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">{c.cta.h2}</h2>
          <p className="text-slate-700 mb-6">{c.cta.body}</p>
          <VinSearchForm size="sm" locale={locale} />
        </div>
      </section>
    </>
  );
}
