/**
 * Shared body for /vin-decoder and /es/vin-decoder.
 * Wave 18a — full English layout in both locales via COPY={en,es}.
 *
 * The interactive <VinDecoder /> widget is a client component that stays
 * locale-agnostic for now (form labels are short and intuitive). All
 * surrounding marketing/explainer chrome translates via COPY.
 */

import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import VinDecoder from "@/app/vin-decoder/VinDecoder";
import type { Locale } from "@/i18n/config";

const COPY = {
  en: {
    home: "Home",
    crumb: "VIN Decoder",
    h1: "Free VIN Decoder",
    intro:
      "Decode any 17-character VIN instantly. See the full position breakdown — WMI, VDS, check digit, model year, plant code, and production sequence — plus full manufacturer specs for any car, truck, motorcycle, or RV. Always free, no signup required.",
    h2Structure: "VIN Structure — What Each Position Means",
    structureIntro:
      "Every modern VIN (1981 and newer) follows the ISO 3779 standard. The 17 characters are divided into three sections, each encoding a different layer of vehicle identity.",
    thPos: "Position(s)",
    thSection: "Section",
    thEncodes: "What It Encodes",
    structureRows: [
      ["1–3", "WMI", "World Manufacturer Identifier — country of assembly and manufacturer"],
      ["4–8", "VDS", "Vehicle Descriptor Section — model, body style, restraint system, engine"],
      ["9", "Check Digit", "Mathematical validity check (weighted sum mod 11)"],
      ["10", "Model Year", "Year of manufacture (A=1980/2010, B=1981/2011, etc.)"],
      ["11", "Plant Code", "Assembly plant — manufacturer-specific"],
      ["12–17", "Sequence", "Sequential production number at that plant"],
    ],
    h2Country: "Common WMI Country Codes (Position 1)",
    countryIntro:
      "The first character of the WMI identifies the country or world region where the vehicle was assembled. This is not necessarily the brand's home country — many manufacturers assemble vehicles in multiple countries.",
    thChars: "Character(s)",
    thCountry: "Country / Region",
    countryRows: [
      ["1, 4, 5", "United States"],
      ["2", "Canada"],
      ["3", "Mexico"],
      ["6", "Australia"],
      ["9", "Brazil"],
      ["J", "Japan"],
      ["K", "South Korea"],
      ["L", "China"],
      ["S", "United Kingdom"],
      ["V", "France / Spain / Netherlands"],
      ["W", "Germany"],
      ["X", "Russia"],
      ["Y", "Sweden / Finland"],
      ["Z", "Italy"],
    ],
    crossLinks: [
      { href: "/motorcycle-vin-search", label: "Motorcycle VIN Decoder", sub: "Decode bike VINs by brand" },
      { href: "/window-sticker", label: "Window Sticker Maker", sub: "Build a Monroney label" },
      { href: "/license-plate-lookup", label: "Plate to VIN Lookup", sub: "Find VIN from plate number" },
    ],
    faqHeading: "Frequently Asked Questions",
    faqs: [
      { q: "What is a VIN?", a: "A VIN (Vehicle Identification Number) is a unique 17-character code assigned to every motor vehicle at the factory. It encodes the country of manufacture, manufacturer, vehicle attributes, model year, assembly plant, and a sequential production number. No two vehicles ever share the same VIN." },
      { q: "Where do I find my VIN?", a: "The most reliable locations are the driver-side doorjamb sticker (most visible), the lower-left corner of the windshield (visible from outside the vehicle), on the engine block, and on your title, registration, and insurance documents." },
      { q: "Why is my VIN's check digit showing as invalid?", a: "An invalid check digit usually means a transcription error — the most common mistakes are confusing the letter O with zero, or the letter I with the number 1. Note that I, O, and Q are never valid VIN characters. Double-check your VIN against the doorjamb sticker. A VIN from a post-2000 vehicle that still shows invalid after careful re-entry should be treated as potentially altered." },
      { q: "What is the difference between a VIN decode and a VIN history report?", a: "A VIN decode (what this tool provides) reads the vehicle's specifications directly from the VIN itself: year, make, model, engine, trim, assembly plant, and so on. A VIN history report (our paid product) goes further — it pulls NMVTIS title records, accident and damage reports, odometer history, theft records, open recall notices, and more from third-party databases that are not encoded in the VIN." },
    ],
    ctaHeading: "Want the Full Story Behind This VIN?",
    ctaSub:
      "A VIN decode shows you the specs. A history report shows you accidents, title brands, odometer fraud, theft records, and open recalls — everything that affects the vehicle's real-world value and safety.",
    ctaBtn: "Run a Free VIN Check",
  },
  es: {
    home: "Inicio",
    crumb: "Decodificador VIN",
    h1: "Decodificador VIN gratis",
    intro:
      "Decodifica cualquier VIN de 17 caracteres al instante. Ve el desglose completo por posición — WMI, VDS, dígito verificador, año modelo, código de planta y secuencia de producción — más las especificaciones completas del fabricante para cualquier auto, camioneta, motocicleta o RV. Siempre gratis, sin registro requerido.",
    h2Structure: "Estructura del VIN — Qué significa cada posición",
    structureIntro:
      "Cada VIN moderno (1981 en adelante) sigue el estándar ISO 3779. Los 17 caracteres se dividen en tres secciones, cada una codificando una capa distinta de la identidad del vehículo.",
    thPos: "Posición(es)",
    thSection: "Sección",
    thEncodes: "Qué codifica",
    structureRows: [
      ["1–3", "WMI", "Identificador Mundial del Fabricante — país de ensamblaje y fabricante"],
      ["4–8", "VDS", "Sección Descriptora del Vehículo — modelo, carrocería, sistema de retención, motor"],
      ["9", "Dígito verificador", "Comprobación matemática de validez (suma ponderada mod 11)"],
      ["10", "Año modelo", "Año de fabricación (A=1980/2010, B=1981/2011, etc.)"],
      ["11", "Código de planta", "Planta de ensamblaje — específico por fabricante"],
      ["12–17", "Secuencia", "Número secuencial de producción en esa planta"],
    ],
    h2Country: "Códigos comunes de país WMI (Posición 1)",
    countryIntro:
      "El primer carácter del WMI identifica el país o región mundial donde se ensambló el vehículo. No es necesariamente el país de origen de la marca — muchos fabricantes ensamblan vehículos en múltiples países.",
    thChars: "Carácter(es)",
    thCountry: "País / Región",
    countryRows: [
      ["1, 4, 5", "Estados Unidos"],
      ["2", "Canadá"],
      ["3", "México"],
      ["6", "Australia"],
      ["9", "Brasil"],
      ["J", "Japón"],
      ["K", "Corea del Sur"],
      ["L", "China"],
      ["S", "Reino Unido"],
      ["V", "Francia / España / Países Bajos"],
      ["W", "Alemania"],
      ["X", "Rusia"],
      ["Y", "Suecia / Finlandia"],
      ["Z", "Italia"],
    ],
    crossLinks: [
      { href: "/motorcycle-vin-search", label: "Decodificador VIN de motocicleta", sub: "Decodifica VINs de motos por marca" },
      { href: "/window-sticker", label: "Generador de etiqueta Monroney", sub: "Crea una etiqueta Monroney" },
      { href: "/license-plate-lookup", label: "Búsqueda de VIN por placa", sub: "Encuentra el VIN desde el número de placa" },
    ],
    faqHeading: "Preguntas frecuentes",
    faqs: [
      { q: "¿Qué es un VIN?", a: "Un VIN (Número de Identificación Vehicular) es un código único de 17 caracteres asignado a cada vehículo motorizado en la fábrica. Codifica el país de manufactura, fabricante, atributos del vehículo, año modelo, planta de ensamblaje y un número secuencial de producción. Ningún vehículo comparte el mismo VIN." },
      { q: "¿Dónde encuentro mi VIN?", a: "Las ubicaciones más confiables son la calcomanía del marco de la puerta del conductor (la más visible), la esquina inferior izquierda del parabrisas (visible desde fuera del vehículo), en el bloque del motor y en tus documentos de título, registro y seguro." },
      { q: "¿Por qué el dígito verificador de mi VIN aparece como inválido?", a: "Un dígito verificador inválido usualmente significa un error de transcripción — los errores más comunes son confundir la letra O con el cero, o la letra I con el número 1. Nota que I, O y Q nunca son caracteres VIN válidos. Verifica tu VIN contra la calcomanía del marco de la puerta. Un VIN de un vehículo post-2000 que sigue siendo inválido tras reingresarlo cuidadosamente debe tratarse como potencialmente alterado." },
      { q: "¿Cuál es la diferencia entre una decodificación VIN y un reporte de historial VIN?", a: "Una decodificación VIN (lo que ofrece esta herramienta) lee las especificaciones del vehículo directamente del VIN mismo: año, marca, modelo, motor, equipamiento, planta de ensamblaje, etc. Un reporte de historial VIN (nuestro producto de pago) va más allá — extrae registros de título NMVTIS, reportes de accidentes y daños, historial de odómetro, registros de robo, notificaciones de recalls abiertos y más de bases de datos de terceros que no están codificadas en el VIN." },
    ],
    ctaHeading: "¿Quieres la historia completa detrás de este VIN?",
    ctaSub:
      "Una decodificación VIN te muestra las especificaciones. Un reporte de historial te muestra accidentes, marcas en el título, fraude de odómetro, registros de robo y recalls abiertos — todo lo que afecta el valor real y la seguridad del vehículo.",
    ctaBtn: "Hacer una verificación VIN gratis",
  },
} as const;

interface Props { locale: Locale; }

export default function VinDecoderBody({ locale }: Props) {
  const c = COPY[locale];
  const link = (en: string) => (locale === "es" ? `/es${en}` : en);

  return (
    <>
      <main className="pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: c.home, href: locale === "es" ? "/es" : "/" }, { label: c.crumb }]} />
          <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">{c.h1}</h1>
          <p className="page-description mt-4 text-lg text-slate-700 leading-relaxed">{c.intro}</p>

          <div className="mt-8">
            <VinDecoder />
          </div>

          <div className="mt-10">
            <VinCheckBanner />
          </div>

          <section id="vin-structure" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{c.h2Structure}</h2>
            <p className="text-slate-600 leading-relaxed mb-5">{c.structureIntro}</p>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium">{c.thPos}</th>
                    <th className="text-left px-4 py-3 font-medium">{c.thSection}</th>
                    <th className="text-left px-4 py-3 font-medium">{c.thEncodes}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {c.structureRows.map(([pos, section, desc]) => (
                    <tr key={pos} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-mono font-bold text-primary-700">{pos}</td>
                      <td className="px-4 py-3 font-semibold text-slate-800">{section}</td>
                      <td className="px-4 py-3 text-slate-600">{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="country-codes" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{c.h2Country}</h2>
            <p className="text-slate-600 leading-relaxed mb-5">{c.countryIntro}</p>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium">{c.thChars}</th>
                    <th className="text-left px-4 py-3 font-medium">{c.thCountry}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {c.countryRows.map(([char, country]) => (
                    <tr key={char} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-mono font-bold text-primary-700">{char}</td>
                      <td className="px-4 py-3 text-slate-700">{country}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <div className="mt-10 grid sm:grid-cols-3 gap-3">
            {c.crossLinks.map(({ href, label, sub }) => (
              <Link key={href} href={link(href)} className="flex items-center justify-between gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors">
                <div>
                  <p className="font-bold text-slate-900 text-sm">{label}</p>
                  <p className="text-xs text-slate-600 mt-0.5">{sub}</p>
                </div>
                <span className="text-slate-500 font-bold text-xs flex-shrink-0">→</span>
              </Link>
            ))}
          </div>

          <section id="faq" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">{c.faqHeading}</h2>
            <dl className="space-y-6">
              {c.faqs.map(({ q, a }) => (
                <div key={q}>
                  <dt className="font-bold text-slate-900">{q}</dt>
                  <dd className="mt-1.5 text-slate-600 leading-relaxed">{a}</dd>
                </div>
              ))}
            </dl>
          </section>

          <div className="mt-14">
            <RelatedChecks exclude="/vin-decoder" />
          </div>
        </div>
      </main>

      <section className="py-14 bg-slate-50 border-t border-slate-200">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">{c.ctaHeading}</h2>
          <p className="text-slate-600 mb-6">{c.ctaSub}</p>
          <Link href={link("/vin-check")} className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl transition-colors">
            {c.ctaBtn}
          </Link>
        </div>
      </section>
    </>
  );
}

// Exported so wrappers can build matching FAQ JSON-LD in either locale.
export const VIN_DECODER_FAQS_EN = COPY.en.faqs;
export const VIN_DECODER_FAQS_ES = COPY.es.faqs;
