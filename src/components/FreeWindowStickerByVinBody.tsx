/**
 * Shared body for /free-window-sticker-by-vin and /es/free-window-sticker-by-vin.
 * Wave 18 batch 3.
 */

import Link from "next/link";
import {
  Check, Search, FileText, ScanLine, ChevronRight, Lock, Zap, BadgeCheck,
  Sparkles, Tag, Car, DollarSign, Gauge, Printer, Download, Ban,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import WindowStickerMaker from "@/app/window-sticker/WindowStickerMaker";
import type { Locale } from "@/i18n/config";

const TRUST_ICONS = [DollarSign, ScanLine, BadgeCheck, Printer] as const;
const HOW_ICONS = [ScanLine, FileText, Download] as const;
const INCLUDED_ICONS = [DollarSign, Tag, Car, Gauge] as const;

const COPY = {
  en: {
    home: "Home", tools: "Tools", crumb: "Free Window Sticker by VIN",
    badge: "100% Free   \u00B7   Monroney Label   \u00B7   By VIN",
    h1Lead: "Free Window Sticker ", h1Accent: "by VIN",
    intro: "Get any vehicle\u2019s original Monroney window sticker free, straight from its VIN. Enter a 17-character VIN to pull the base MSRP, factory options and packages, standard equipment, and EPA fuel economy \u2014 for Toyota, Ford, Chevy, Honda, BMW, Chrysler, Dodge, and every U.S.-market vehicle. Print or save as PDF, with no per-report fee.",
    ctaTop: "Get the Free Window Sticker",
    ctaTopNote: "Free \u00B7 No credit card \u00B7 Instant result",
    trustStats: [
      { value: "$0", label: "always free" },
      { value: "By VIN", label: "17-char decode" },
      { value: "All brands", label: "U.S.-market" },
      { value: "PDF", label: "print or save" },
    ],
    quickAnswer: "Quick answer",
    quickAnswerBold: "To get a free window sticker by VIN, enter the vehicle\u2019s 17-character VIN and decode it.",
    quickAnswerBody: " You get the original Monroney label \u2014 base MSRP, factory options and packages, standard equipment, and EPA fuel economy \u2014 for any U.S.-market car, truck, or SUV built from 1981 onward. Generating and previewing the sticker is completely free with no per-VIN fee; a free email account (no credit card) is needed only to print or save it as a PDF. Brands covered include Toyota, Ford, Chevy, Honda, BMW, Chrysler, and Dodge.",
    h2How: "How to Get a Free Window Sticker by VIN",
    howIntro: "The original Monroney sticker lives in the manufacturer\u2019s build record, keyed to the VIN. Three free steps turn that code back into the label the car was sold with.",
    howSteps: [
      { tag: "Step 1", title: "Enter the VIN", body: "Paste any 17-character VIN into the auto-fill field. The free decode keys into the factory build record for that exact vehicle." },
      { tag: "Step 2", title: "Decode for free", body: "One click pulls year, make, model, trim, engine, MSRP, factory options, standard equipment, and EPA fuel economy \u2014 no charge, no per-VIN fee." },
      { tag: "Step 3", title: "Print or save as PDF", body: "Sign in with a free account, then export a clean single-page Monroney sticker to print or save as PDF for listings, records, or display." },
    ],
    h2Included: "What\u2019s Included Free",
    includedIntro: "The free VIN sticker reconstructs every block of the original federally-mandated Monroney label \u2014 nothing held back behind a paywall.",
    included: [
      { title: "Original MSRP & pricing", body: "Base MSRP, total of all factory options, destination charge, and the total sticker price the vehicle carried when new." },
      { title: "Factory options & packages", body: "Every factory-installed option and bundled package with its individual price \u2014 itemized exactly like the original label." },
      { title: "Standard equipment", body: "The safety, comfort, technology, and convenience features included at no charge with the base trim." },
      { title: "EPA fuel economy", body: "City, highway, and combined MPG (or MPGe for hybrids and EVs) plus the estimated annual fuel cost block." },
    ],
    midCtaTag: "Always free", midCtaHeading: "Get a Free Window Sticker by VIN",
    midCtaSub: "Original MSRP, factory options, and EPA fuel economy in seconds \u2014 no fee, no credit card.",
    midCtaBtn: "Get It Free",
    h2FreeVsPaid: "Free by VIN vs. Paid Window Sticker Reports",
    freeVsPaidP1: "Carfax and several dealer tools bundle the window sticker into a paid report and charge per VIN \u2014 and the output is view-only. This tool reconstructs the same Monroney-style sticker from the VIN for free, and lets you edit and export it.",
    freeVsPaidP2Pre: "The catch is small and honest: building and previewing is open to everyone, and a free email account is required only at the download step. There is no payment and no watermark. Pair the free sticker with a full ",
    freeVsPaidP2Link: "VIN history report",
    freeVsPaidP2Suffix: " for the complete picture.",
    freeVsPaidCardTitle: "What you don\u2019t pay for",
    freeVsPaidBullets: [
      "No per-VIN report fee \u2014 generate as many stickers as you want",
      "No credit card, ever \u2014 a free email account unlocks downloads",
      "Edit every field after the decode, unlike view-only paid reports",
      "Print or save as PDF, plus a portable HTML copy",
      "Works for every U.S.-market brand and model year from 1981 on",
      "No watermark on the finished sticker",
    ],
    h2Internal: "Free Tools That Pair With Your Window Sticker",
    internalIntro: "The sticker is one piece. These free tools complete the picture before you buy or list.",
    internalLinks: [
      { href: "/window-sticker-lookup", label: "Window Sticker Lookup", desc: "The lookup-focused walkthrough, with brand-by-brand guidance and a free-vs-paid comparison." },
      { href: "/window-sticker", label: "Window Sticker Maker", desc: "Build and customize a Monroney label from scratch \u2014 edit every field, then print or download." },
      { href: "/build-sheet", label: "Factory Build Sheet", desc: "The full as-built option and equipment list behind the window sticker." },
      { href: "/vin-decoder", label: "VIN Decoder", desc: "Decode the 17-character VIN to specs, trim, engine, and factory options." },
      { href: "/vin-check", label: "Full VIN History Check", desc: "Title, accident, odometer, and recall records to pair with the original sticker." },
      { href: "/recall-check", label: "Recall Check", desc: "Open NHTSA safety recalls for the same VIN \u2014 repaired free by the dealer." },
    ],
    h2Faq: "Free Window Sticker by VIN \u2014 Frequently Asked Questions",
    faqIntro: "The questions people ask most about pulling a free window sticker from a VIN.",
    bottomBadge: "Free \u00B7 Instant \u00B7 By VIN",
    bottomHeading: "Get Your Free Window Sticker by VIN",
    bottomSub: "Enter a 17-character VIN to pull the original Monroney label \u2014 MSRP, factory options, and EPA fuel economy \u2014 then print or save as PDF, at no charge.",
    bottomCta: "Get It Free",
  },
  es: {
    home: "Inicio", tools: "Herramientas", crumb: "Etiqueta de ventana gratis por VIN",
    badge: "100% Gratis   \u00B7   Etiqueta Monroney   \u00B7   Por VIN",
    h1Lead: "Etiqueta de ventana gratis ", h1Accent: "por VIN",
    intro: "Obt\u00E9n la etiqueta de ventana Monroney original de cualquier veh\u00EDculo gratis, directamente desde su VIN. Ingresa un VIN de 17 caracteres para obtener el MSRP base, opciones y paquetes de f\u00E1brica, equipamiento est\u00E1ndar y econom\u00EDa de combustible EPA \u2014 para Toyota, Ford, Chevy, Honda, BMW, Chrysler, Dodge y todo veh\u00EDculo del mercado estadounidense. Imprime o guarda como PDF, sin tarifa por reporte.",
    ctaTop: "Obtener la etiqueta gratis",
    ctaTopNote: "Gratis \u00B7 Sin tarjeta de cr\u00E9dito \u00B7 Resultado instant\u00E1neo",
    trustStats: [
      { value: "$0", label: "siempre gratis" },
      { value: "Por VIN", label: "decodificaci\u00F3n 17 car." },
      { value: "Todas las marcas", label: "mercado EE.UU." },
      { value: "PDF", label: "imprime o guarda" },
    ],
    quickAnswer: "Respuesta r\u00E1pida",
    quickAnswerBold: "Para obtener una etiqueta de ventana gratis por VIN, ingresa el VIN de 17 caracteres del veh\u00EDculo y decod\u00EDficalo.",
    quickAnswerBody: " Obtienes la etiqueta Monroney original \u2014 MSRP base, opciones y paquetes de f\u00E1brica, equipamiento est\u00E1ndar y econom\u00EDa de combustible EPA \u2014 para cualquier auto, camioneta o SUV del mercado estadounidense construido desde 1981 en adelante. Generar y previsualizar la etiqueta es completamente gratis sin tarifa por VIN; una cuenta de correo gratis (sin tarjeta de cr\u00E9dito) se necesita solo para imprimirla o guardarla como PDF. Las marcas cubiertas incluyen Toyota, Ford, Chevy, Honda, BMW, Chrysler y Dodge.",
    h2How: "C\u00F3mo obtener una etiqueta de ventana gratis por VIN",
    howIntro: "La etiqueta Monroney original vive en el registro de construcci\u00F3n del fabricante, vinculada al VIN. Tres pasos gratis convierten ese c\u00F3digo de vuelta en la etiqueta con la que se vendi\u00F3 el auto.",
    howSteps: [
      { tag: "Paso 1", title: "Ingresa el VIN", body: "Pega cualquier VIN de 17 caracteres en el campo de autocompletado. La decodificaci\u00F3n gratis se conecta al registro de construcci\u00F3n de f\u00E1brica para ese veh\u00EDculo exacto." },
      { tag: "Paso 2", title: "Decodifica gratis", body: "Un clic extrae a\u00F1o, marca, modelo, versi\u00F3n, motor, MSRP, opciones de f\u00E1brica, equipamiento est\u00E1ndar y econom\u00EDa de combustible EPA \u2014 sin cargo, sin tarifa por VIN." },
      { tag: "Paso 3", title: "Imprime o guarda como PDF", body: "Inicia sesi\u00F3n con una cuenta gratis, luego exporta una etiqueta Monroney limpia de una sola p\u00E1gina para imprimir o guardar como PDF para anuncios, registros o exhibici\u00F3n." },
    ],
    h2Included: "Qu\u00E9 se incluye gratis",
    includedIntro: "La etiqueta VIN gratis reconstruye cada bloque de la etiqueta Monroney original exigida por ley federal \u2014 nada retenido detr\u00E1s de un muro de pago.",
    included: [
      { title: "MSRP original y precios", body: "MSRP base, total de todas las opciones de f\u00E1brica, tarifa de destino y el precio total de etiqueta que llevaba el veh\u00EDculo cuando era nuevo." },
      { title: "Opciones y paquetes de f\u00E1brica", body: "Cada opci\u00F3n instalada de f\u00E1brica y paquete agrupado con su precio individual \u2014 desglosado exactamente como la etiqueta original." },
      { title: "Equipamiento est\u00E1ndar", body: "Las caracter\u00EDsticas de seguridad, comodidad, tecnolog\u00EDa y conveniencia incluidas sin cargo con la versi\u00F3n base." },
      { title: "Econom\u00EDa de combustible EPA", body: "MPG en ciudad, carretera y combinado (o MPGe para h\u00EDbridos y EV) m\u00E1s el bloque de costo anual estimado de combustible." },
    ],
    midCtaTag: "Siempre gratis", midCtaHeading: "Obt\u00E9n una etiqueta de ventana gratis por VIN",
    midCtaSub: "MSRP original, opciones de f\u00E1brica y econom\u00EDa de combustible EPA en segundos \u2014 sin tarifa, sin tarjeta de cr\u00E9dito.",
    midCtaBtn: "Obtenerla gratis",
    h2FreeVsPaid: "Gratis por VIN vs. reportes pagados de etiqueta de ventana",
    freeVsPaidP1: "Carfax y varias herramientas de concesionarios agrupan la etiqueta de ventana en un reporte pagado y cobran por VIN \u2014 y la salida es solo de vista. Esta herramienta reconstruye la misma etiqueta estilo Monroney desde el VIN gratis, y te permite editarla y exportarla.",
    freeVsPaidP2Pre: "La trampa es peque\u00F1a y honesta: construir y previsualizar est\u00E1 abierto para todos, y una cuenta de correo gratis se requiere solo en el paso de descarga. No hay pago ni marca de agua. Combina la etiqueta gratis con un ",
    freeVsPaidP2Link: "reporte de historial VIN",
    freeVsPaidP2Suffix: " completo para la imagen completa.",
    freeVsPaidCardTitle: "Por lo que no pagas",
    freeVsPaidBullets: [
      "Sin tarifa de reporte por VIN \u2014 genera tantas etiquetas como quieras",
      "Sin tarjeta de cr\u00E9dito, nunca \u2014 una cuenta de correo gratis desbloquea descargas",
      "Edita cada campo despu\u00E9s de la decodificaci\u00F3n, a diferencia de los reportes pagados solo de vista",
      "Imprime o guarda como PDF, m\u00E1s una copia HTML port\u00E1til",
      "Funciona para cada marca del mercado estadounidense y a\u00F1o modelo desde 1981 en adelante",
      "Sin marca de agua en la etiqueta terminada",
    ],
    h2Internal: "Herramientas gratis que se combinan con tu etiqueta de ventana",
    internalIntro: "La etiqueta es una pieza. Estas herramientas gratis completan la imagen antes de comprar o anunciar.",
    internalLinks: [
      { href: "/window-sticker-lookup", label: "B\u00FAsqueda de etiqueta de ventana", desc: "El recorrido enfocado en la b\u00FAsqueda, con orientaci\u00F3n marca por marca y una comparaci\u00F3n gratis-vs-pagado." },
      { href: "/window-sticker", label: "Creador de etiqueta de ventana", desc: "Construye y personaliza una etiqueta Monroney desde cero \u2014 edita cada campo, luego imprime o descarga." },
      { href: "/build-sheet", label: "Hoja de construcci\u00F3n de f\u00E1brica", desc: "La lista completa de opciones y equipamiento tal como se construy\u00F3 detr\u00E1s de la etiqueta de ventana." },
      { href: "/vin-decoder", label: "Decodificador VIN", desc: "Decodifica el VIN de 17 caracteres a especificaciones, versi\u00F3n, motor y opciones de f\u00E1brica." },
      { href: "/vin-check", label: "Verificaci\u00F3n completa de historial VIN", desc: "Registros de t\u00EDtulo, accidentes, od\u00F3metro y recalls para combinar con la etiqueta original." },
      { href: "/recall-check", label: "Verificaci\u00F3n de recalls", desc: "Recalls de seguridad NHTSA abiertos para el mismo VIN \u2014 reparados gratis por el concesionario." },
    ],
    h2Faq: "Etiqueta de ventana gratis por VIN \u2014 Preguntas frecuentes",
    faqIntro: "Las preguntas que la gente m\u00E1s hace sobre obtener una etiqueta de ventana gratis desde un VIN.",
    bottomBadge: "Gratis \u00B7 Instant\u00E1neo \u00B7 Por VIN",
    bottomHeading: "Obt\u00E9n tu etiqueta de ventana gratis por VIN",
    bottomSub: "Ingresa un VIN de 17 caracteres para obtener la etiqueta Monroney original \u2014 MSRP, opciones de f\u00E1brica y econom\u00EDa de combustible EPA \u2014 luego imprime o guarda como PDF, sin cargo.",
    bottomCta: "Obtenerla gratis",
  },
} as const;

const FAQS_EN = [
  { question: "How do I get a free window sticker by VIN?", answer: "Enter the vehicle's 17-character VIN into the tool and click Decode. It pulls the original Monroney window sticker data from the factory build record \u2014 MSRP, factory options and packages, standard equipment, and EPA fuel economy \u2014 at no charge. You can then edit, print, or save the sticker as a PDF." },
  { question: "Is the window sticker really free?", answer: "Yes. Generating and previewing the window sticker by VIN is completely free \u2014 no payment, no trial limit, and no watermark. A free account using only your email (no credit card) is required at the moment you download or print. Unlike Carfax, there is no per-VIN report fee." },
  { question: "Can I get a free Toyota window sticker by VIN?", answer: "Yes. Toyota is fully supported \u2014 enter the VIN and the tool reconstructs the original Toyota Monroney sticker with MSRP, packages, and EPA data. The same works for Ford, Chevrolet, Honda, Nissan, BMW, Chrysler, Dodge, RAM, Jeep, GMC, Hyundai, Kia, and every other U.S.-market brand." },
  { question: "Can I download the free window sticker as a PDF?", answer: "Yes. After signing in free, click Print / Save as PDF to open your browser's print dialog and choose 'Save as PDF'. The print stylesheet hides the rest of the page so you get a clean, single-page sticker. You can also download a portable HTML copy to edit later." },
  { question: "Where is the VIN I need to enter?", answer: "The 17-character VIN is on a plate at the base of the driver-side windshield, on the driver-side door-jamb sticker, and on the title, registration, and insurance card. Match the VIN across two locations before relying on the sticker it produces." },
  { question: "Is this the official manufacturer window sticker?", answer: "It is a Monroney-style reconstruction built from the VIN's factory data and any values you enter \u2014 accurate for personal use, listings, records, and display, but not a manufacturer-issued legal document. For accident, title, and odometer history, pair it with a full VIN history report." },
  { question: "Can I get a free window sticker for an older or used car?", answer: "Coverage is strongest for U.S.-market vehicles built from 1981 onward, when the 17-character VIN became standard. For older or specialty vehicles, you can still build the sticker for free by entering the year, make, model, options, and original MSRP manually \u2014 the Monroney layout is the same for any era." },
  { question: "Why is the window sticker free here when Carfax charges for it?", answer: "Carfax bundles the window sticker into a paid history report priced per VIN, and the result is view-only. This tool reconstructs the same Monroney-style sticker directly from the VIN's factory data at no charge, then lets you edit and export it. The site covers its costs through optional full VIN history reports, so the sticker itself stays free." },
  { question: "Do I need to create an account to get the free window sticker?", answer: "No account is needed to enter a VIN, decode the data, and preview the full window sticker. A free account \u2014 email only, no credit card \u2014 is required just once, at the moment you print the sticker or save it as a PDF, so the export can be tied to your library." },
];

const FAQS_ES = [
  { question: "\u00BFC\u00F3mo obtengo una etiqueta de ventana gratis por VIN?", answer: "Ingresa el VIN de 17 caracteres del veh\u00EDculo en la herramienta y haz clic en Decodificar. Extrae los datos originales de la etiqueta de ventana Monroney del registro de construcci\u00F3n de f\u00E1brica \u2014 MSRP, opciones y paquetes de f\u00E1brica, equipamiento est\u00E1ndar y econom\u00EDa de combustible EPA \u2014 sin cargo. Luego puedes editar, imprimir o guardar la etiqueta como PDF." },
  { question: "\u00BFLa etiqueta de ventana es realmente gratis?", answer: "S\u00ED. Generar y previsualizar la etiqueta de ventana por VIN es completamente gratis \u2014 sin pago, sin l\u00EDmite de prueba y sin marca de agua. Una cuenta gratis usando solo tu correo (sin tarjeta de cr\u00E9dito) se requiere en el momento en que descargas o imprimes. A diferencia de Carfax, no hay tarifa de reporte por VIN." },
  { question: "\u00BFPuedo obtener una etiqueta de ventana Toyota gratis por VIN?", answer: "S\u00ED. Toyota es totalmente compatible \u2014 ingresa el VIN y la herramienta reconstruye la etiqueta Monroney Toyota original con MSRP, paquetes y datos EPA. Lo mismo funciona para Ford, Chevrolet, Honda, Nissan, BMW, Chrysler, Dodge, RAM, Jeep, GMC, Hyundai, Kia y cualquier otra marca del mercado estadounidense." },
  { question: "\u00BFPuedo descargar la etiqueta de ventana gratis como PDF?", answer: "S\u00ED. Despu\u00E9s de iniciar sesi\u00F3n gratis, haz clic en Imprimir / Guardar como PDF para abrir el di\u00E1logo de impresi\u00F3n de tu navegador y elegir 'Guardar como PDF'. La hoja de estilo de impresi\u00F3n oculta el resto de la p\u00E1gina para obtener una etiqueta limpia de una sola p\u00E1gina. Tambi\u00E9n puedes descargar una copia HTML port\u00E1til para editar despu\u00E9s." },
  { question: "\u00BFD\u00F3nde est\u00E1 el VIN que necesito ingresar?", answer: "El VIN de 17 caracteres est\u00E1 en una placa en la base del parabrisas del lado del conductor, en la etiqueta del marco de la puerta del conductor y en el t\u00EDtulo, registro y tarjeta de seguro. Coincide el VIN en dos ubicaciones antes de confiar en la etiqueta que produce." },
  { question: "\u00BFEsta es la etiqueta de ventana oficial del fabricante?", answer: "Es una reconstrucci\u00F3n estilo Monroney construida a partir de los datos de f\u00E1brica del VIN y cualquier valor que ingreses \u2014 precisa para uso personal, anuncios, registros y exhibici\u00F3n, pero no es un documento legal emitido por el fabricante. Para historial de accidentes, t\u00EDtulo y od\u00F3metro, comb\u00EDnala con un reporte completo de historial VIN." },
  { question: "\u00BFPuedo obtener una etiqueta de ventana gratis para un auto m\u00E1s antiguo o usado?", answer: "La cobertura es m\u00E1s fuerte para veh\u00EDculos del mercado estadounidense construidos desde 1981 en adelante, cuando el VIN de 17 caracteres se volvi\u00F3 est\u00E1ndar. Para veh\u00EDculos m\u00E1s antiguos o especializados, a\u00FAn puedes construir la etiqueta gratis ingresando el a\u00F1o, marca, modelo, opciones y MSRP original manualmente \u2014 el dise\u00F1o Monroney es el mismo para cualquier era." },
  { question: "\u00BFPor qu\u00E9 la etiqueta de ventana es gratis aqu\u00ED cuando Carfax cobra por ella?", answer: "Carfax agrupa la etiqueta de ventana en un reporte de historial pagado con precio por VIN, y el resultado es solo de vista. Esta herramienta reconstruye la misma etiqueta estilo Monroney directamente desde los datos de f\u00E1brica del VIN sin cargo, luego te permite editarla y exportarla. El sitio cubre sus costos a trav\u00E9s de reportes opcionales completos de historial VIN, por lo que la etiqueta en s\u00ED se mantiene gratis." },
  { question: "\u00BFNecesito crear una cuenta para obtener la etiqueta de ventana gratis?", answer: "No se necesita cuenta para ingresar un VIN, decodificar los datos y previsualizar la etiqueta de ventana completa. Una cuenta gratis \u2014 solo correo, sin tarjeta de cr\u00E9dito \u2014 se requiere solo una vez, en el momento en que imprimes la etiqueta o la guardas como PDF, para que la exportaci\u00F3n pueda vincularse a tu biblioteca." },
];

interface Props { locale: Locale; }

export default function FreeWindowStickerByVinBody({ locale }: Props) {
  const c = COPY[locale];
  const faqs = locale === "es" ? FAQS_ES : FAQS_EN;
  const link = (en: string) => (locale === "es" ? `/es${en}` : en);

  return (
    <article className="pb-16 bg-surface">
      <div className="bg-primary text-white print:hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
          <Breadcrumbs
            items={[
              { label: c.home, href: locale === "es" ? "/es" : "/" },
              { label: c.tools, href: link("/tools") },
              { label: c.crumb },
            ]}
            onDark
          />

          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <Sparkles className="w-4 h-4" /> {c.badge}
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
            {c.h1Lead}
            <span style={{ color: "var(--color-secondary-container)" }}>{c.h1Accent}</span>
          </h1>

          <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">{c.intro}</p>

          <a href="#tool" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-primary font-bold hover:bg-white/90 transition">
            <Search className="w-5 h-5" /> {c.ctaTop}
          </a>
          <p className="mt-3 text-[11px] text-white/60 flex items-center gap-1.5">
            <Lock className="w-3 h-3" /> {c.ctaTopNote}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            {c.trustStats.map((s, i) => {
              const Icon = TRUST_ICONS[i];
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

      <section id="tool" className="bg-surface-container-low border-b border-outline-variant py-10 print:py-0 print:bg-white print:border-0 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <WindowStickerMaker locale={locale} />
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 print:hidden">
        <section className="pt-12 sm:pt-16">
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5 sm:p-7">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-[11px] font-black uppercase tracking-wider text-primary">{c.quickAnswer}</span>
            </div>
            <p className="fast-answer text-base sm:text-lg text-on-surface leading-relaxed">
              <strong className="text-primary">{c.quickAnswerBold}</strong>{c.quickAnswerBody}
            </p>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2How}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl">{c.howIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {c.howSteps.map((m, i) => {
              const Icon = HOW_ICONS[i];
              return (
                <div key={m.title} className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
                  <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-[11px] font-black uppercase tracking-wider text-primary/70 mb-0.5">{m.tag}</div>
                  <h3 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1.5">{m.title}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{m.body}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Included}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.includedIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {c.included.map((it, i) => {
              const Icon = INCLUDED_ICONS[i];
              return (
                <div key={it.title} className="rounded-2xl border border-outline-variant bg-surface p-5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-base font-headline font-extrabold text-primary mb-1">{it.title}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{it.body}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="py-4">
          <div className="rounded-3xl bg-primary text-white p-7 sm:p-10 text-center">
            <div className="inline-flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span className="text-xs font-black uppercase tracking-wider text-white/80">{c.midCtaTag}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold mb-2">{c.midCtaHeading}</h2>
            <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto mb-6">{c.midCtaSub}</p>
            <a href="#tool" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-primary font-bold hover:bg-white/90 transition">
              <Search className="w-5 h-5" /> {c.midCtaBtn}
            </a>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{c.h2FreeVsPaid}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>{c.freeVsPaidP1}</p>
              <p>
                {c.freeVsPaidP2Pre}
                <Link href={link("/vin-check")} className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.freeVsPaidP2Link}</Link>
                {c.freeVsPaidP2Suffix}
              </p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Ban className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.freeVsPaidCardTitle}</h3>
              </div>
              <ul className="space-y-2 text-sm text-on-surface">
                {c.freeVsPaidBullets.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span>{tip}</span>
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
                  <h3 className="text-sm sm:text-base font-headline font-extrabold text-primary pr-2 m-0">{f.question}</h3>
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
          <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3">{c.bottomHeading}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">{c.bottomSub}</p>
          <a href="#tool" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition">
            <Search className="w-5 h-5" /> {c.bottomCta}
          </a>
        </section>

        <RelatedChecks exclude="/window-sticker" />
      </div>
    </article>
  );
}

export { FAQS_EN, FAQS_ES };
