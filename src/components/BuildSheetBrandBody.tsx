/**
 * Shared body for /build-sheet/[brand] and /es/build-sheet/[brand].
 * Wave 17d — 17 build-sheet brand pages × 2 locales rendered from one component.
 *
 * Brand-specific factual content (docName, whereToFind[], optionCodeFormat,
 * contains[], sourceName, sourceNote, tips[]) is technical English OEM data —
 * it renders verbatim on both locales (same approach as LemonCheckBrandBody
 * and PaintCodeBrandBody). Structural chrome (headings, intros, FAQs, CTAs)
 * translates via the COPY={en,es} map.
 */

import Link from "next/link";
import {
  Check,
  Search,
  Factory,
  ChevronRight,
  ArrowRight,
  Lock,
  Zap,
  ClipboardList,
  Tag,
  MapPin,
  Cog,
  ScrollText,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import {
  BUILD_SHEET_BRANDS,
  findBuildSheetBrand,
  type BuildSheetBrand,
} from "@/lib/build-sheets";
import type { Locale } from "@/i18n/config";

export function getBrandOthers(slug: string): BuildSheetBrand[] {
  const b = findBuildSheetBrand(slug);
  if (!b) return [];
  return BUILD_SHEET_BRANDS.filter((x) => x.slug !== b.slug);
}

const COPY = {
  en: {
    breadcrumbHome: "Home",
    breadcrumbHub: "Build Sheet",
    heroBadgeSep: " \u00B7 ",
    h1Pre: (name: string) => `${name} Build Sheet by VIN \u2014 `,
    h1Highlight: (docName: string) => `Decode the ${docName}`,
    heroSummarySuffix:
      " Start with the VIN to lock in the year and plant \u2014 it\u2019s free.",
    searchHeading: (name: string) => `Look Up a ${name} Build Sheet by VIN`,
    searchSub:
      "Enter the VIN and we\u2019ll fix the year, plant, and body so the build record decodes correctly",
    trustNote: "Free \u00B7 No sign-up \u00B7 Instant result",
    trustStat1Label: "build record",
    trustStat2Value: "Option",
    trustStat2Label: "code decode",
    trustStat3Value: "Plant",
    trustStat3Label: "& production data",
    trustStat4Value: "Free",
    trustStat4Label: "VIN lookup, no sign-up",
    howHeading: (name: string) => `How a ${name} Build Sheet Lookup Works`,
    howIntro: (docName: string) =>
      `The VIN points you to the right reference; the ${docName} fills in the original factory configuration.`,
    step1Tag: "Step 1",
    step1Title: (name: string) => `Enter the ${name} VIN`,
    step1Body:
      "Type the VIN from the dash, door jamb, title, or registration. It fixes the model year, assembly plant, and body style before you read the rest.",
    step2Tag: "Step 2",
    step2Title: (docName: string) => `We tie it to the ${docName}`,
    step2Body:
      "The VIN points to the right reference so the build record's option, paint, and equipment codes decode correctly for that exact car.",
    step3Tag: "Step 3",
    step3Title: "Reconstruct the original spec",
    step3Body:
      "The build record rebuilds the factory order: options, colors, drivetrain, and the plant it came from \u2014 the configuration the car left the line with.",
    whereHeading: (name: string) => `Where to Find ${name} Build Data`,
    whereIntro: (name: string, docName: string) =>
      `${name} records the build in the ${docName}. Here is where that data lives and how to reach it.`,
    optionCodeHeading: (name: string) => `${name} option-code format`,
    startLookupLabel: (name: string) => `Start the ${name} build lookup by VIN:`,
    containsHeading: (name: string) => `What a ${name} Build Record Shows`,
    containsIntro: (docName: string) =>
      `The ${docName} documents the car as it left the factory \u2014 far more detail than the window sticker ever showed the buyer.`,
    midCtaHeading: (name: string) => `Decode Your ${name}\u2019s Original Build`,
    midCtaBody: (docName: string) =>
      `Enter the VIN to lock in the year and plant, then read the ${docName} for the original options, colors, and equipment. Free, in seconds.`,
    tipsHeading: (name: string) => `${name} Build Sheet Tips`,
    tipsIntro: (name: string) =>
      `What buyers, collectors, and restorers should know before trusting a ${name} build record.`,
    sourcesHeading: (name: string) => `${name} Build Data \u2014 Sources & Authority`,
    sourcesIntroBeforeStrong: "",
    sourcesIntroSuffix: (name: string) =>
      ` The references below are the authoritative public origins behind ${name} VIN, recall, and title data in the United States.`,
    sourceNote1: (name: string) => `Federal reference decoder for ${name} VIN structure.`,
    sourceLabel1: "NHTSA VIN Decoder",
    sourceNote2: (name: string) => `Open ${name} recall lookup by VIN.`,
    sourceLabel2: "NHTSA \u2014 Safety Recalls",
    sourceNote3: (name: string) =>
      `Federal title-brand database covering every ${name} across all 50 states.`,
    sourceLabel3: "NMVTIS \u2014 Bureau of Justice Assistance",
    sourceNote4: (name: string) =>
      `Independent crash-test results for modern ${name} models.`,
    sourceLabel4: "IIHS \u2014 Safety Ratings",
    othersHeading: "Build Sheets for Other Brands",
    othersIntro:
      "Every manufacturer records the factory build differently. Jump to another brand\u2019s decoder.",
    othersBrandSuffix: " build sheet",
    fordSheetLabel: "Ford build sheet",
    gmSheetLabel: "GM build sheet",
    moparSheetLabel: "Mopar broadcast sheet",
    fullHubLink: "View the all-makes build sheet lookup",
    internalHeading: (name: string) => `More VIN Tools for ${name} Owners`,
    internalIntro: (name: string) =>
      `The build record is the starting point. These checks complete the picture on any ${name}.`,
    internalAllMakesLabel: "Build Sheet by VIN (All Makes)",
    internalAllMakesDesc:
      "The general factory build-sheet lookup covering every manufacturer.",
    internalVinDecoderLabel: "VIN Decoder",
    internalVinDecoderDesc: (name: string) =>
      `Decode the ${name} VIN to model year, plant, and production sequence.`,
    internalPaintLabel: "Paint Code Lookup",
    internalPaintDesc: (name: string) =>
      `Confirm the exact ${name} factory paint code for touch-up or restoration.`,
    internalStickerLabel: "Window Sticker Maker",
    internalStickerDesc:
      "The consumer-facing Monroney view with options in plain language and MSRP.",
    internalVinCheckLabel: "Full VIN History Check",
    internalVinCheckDesc:
      "Title, accident, odometer, and recall records to pair with the factory origin.",
    internalClassicLabel: "Classic Car VIN Decoder",
    internalClassicDesc: (name: string) =>
      `For older ${name} models with shorter VINs and era-specific plates.`,
    faqHeading: (name: string) =>
      `${name} Build Sheet \u2014 Frequently Asked Questions`,
    faqIntro: (name: string, docName: string) =>
      `The questions ${name} owners and buyers ask most about the ${docName}.`,
    ctaBadge: (name: string) => `Free \u00B7 Instant \u00B7 ${name} Build Codes`,
    ctaHeading: (name: string) => `Look Up a ${name} Build Sheet by VIN`,
    ctaBody: (docName: string) =>
      `Enter the VIN to anchor the year and plant, then decode the ${docName} \u2014 factory options, paint and interior codes, and drivetrain.`,
    ctaNote: "No credit card \u00B7 No sign-up \u00B7 Free",
    faqBuilder(b: BuildSheetBrand) {
      return [
        {
          q: `What is a ${b.name} build sheet?`,
          a: `A ${b.name} build sheet is the ${b.docName} \u2014 the factory record of how a single vehicle was originally specified. ${b.summary.replace(/^A[n]? [^—]+—\s*/, "It is ")} It documents ${b.contains.slice(0, 3).join(", ").toLowerCase()}, and more.`,
        },
        {
          q: `How do I find a ${b.name} build sheet by VIN?`,
          a: `Enter the 17-character VIN in the form above. The VIN fixes the model year, assembly plant, and body style, which is what lets the ${b.docName} decode correctly. You can find the VIN on the dashboard, the driver-side door jamb, the title, or the registration.`,
        },
        {
          q: `What do ${b.name} option codes look like?`,
          a: `${b.optionCodeFormat}`,
        },
        {
          q: `Where is the ${b.name} build data located?`,
          a: `On a ${b.name}, the build data is found in these places: ${b.whereToFind.join("; ")}.`,
        },
        {
          q: `Why do ${b.name} buyers and collectors check the build sheet?`,
          a: `The build record is how you confirm a factory option, package, or color was fitted at the factory rather than added later \u2014 which directly affects what a ${b.name} is worth. ${b.sourceName} is the authority that ${b.sourceNote.charAt(0).toLowerCase() + b.sourceNote.slice(1)}`,
        },
      ];
    },
  },
  es: {
    breadcrumbHome: "Inicio",
    breadcrumbHub: "Hoja de f\u00E1brica",
    heroBadgeSep: " \u00B7 ",
    h1Pre: (name: string) => `Hoja de f\u00E1brica ${name} por VIN \u2014 `,
    h1Highlight: (docName: string) => `Decodifica la ${docName}`,
    heroSummarySuffix:
      " Empieza con el VIN para fijar el a\u00F1o y la planta \u2014 es gratis.",
    searchHeading: (name: string) => `Busca una hoja de f\u00E1brica ${name} por VIN`,
    searchSub:
      "Ingresa el VIN y nosotros fijaremos el a\u00F1o, la planta y la carrocer\u00EDa para que el registro de fabricaci\u00F3n se decodifique correctamente",
    trustNote: "Gratis \u00B7 Sin registro \u00B7 Resultado al instante",
    trustStat1Label: "registro de f\u00E1brica",
    trustStat2Value: "Opci\u00F3n",
    trustStat2Label: "decodificaci\u00F3n de c\u00F3digo",
    trustStat3Value: "Planta",
    trustStat3Label: "y datos de producci\u00F3n",
    trustStat4Value: "Gratis",
    trustStat4Label: "b\u00FAsqueda por VIN, sin registro",
    howHeading: (name: string) =>
      `C\u00F3mo funciona la b\u00FAsqueda de hoja de f\u00E1brica ${name}`,
    howIntro: (docName: string) =>
      `El VIN te lleva a la referencia correcta; la ${docName} completa la configuraci\u00F3n original de f\u00E1brica.`,
    step1Tag: "Paso 1",
    step1Title: (name: string) => `Ingresa el VIN del ${name}`,
    step1Body:
      "Escribe el VIN del tablero, marco de la puerta, t\u00EDtulo o registro. Fija el a\u00F1o del modelo, la planta de ensamble y el estilo de carrocer\u00EDa antes de leer el resto.",
    step2Tag: "Paso 2",
    step2Title: (docName: string) => `Lo vinculamos con la ${docName}`,
    step2Body:
      "El VIN apunta a la referencia correcta para que los c\u00F3digos de opciones, pintura y equipamiento del registro de fabricaci\u00F3n se decodifiquen correctamente para ese auto exacto.",
    step3Tag: "Paso 3",
    step3Title: "Reconstruye la especificaci\u00F3n original",
    step3Body:
      "El registro de fabricaci\u00F3n reconstruye el pedido de f\u00E1brica: opciones, colores, tren motriz y la planta de origen \u2014 la configuraci\u00F3n con la que el auto sali\u00F3 de la l\u00EDnea.",
    whereHeading: (name: string) =>
      `D\u00F3nde encontrar los datos de fabricaci\u00F3n de ${name}`,
    whereIntro: (name: string, docName: string) =>
      `${name} registra la fabricaci\u00F3n en la ${docName}. Aqu\u00ED es donde vive esa informaci\u00F3n y c\u00F3mo acceder a ella.`,
    optionCodeHeading: (name: string) => `Formato de c\u00F3digo de opci\u00F3n ${name}`,
    startLookupLabel: (name: string) =>
      `Inicia la b\u00FAsqueda de fabricaci\u00F3n ${name} por VIN:`,
    containsHeading: (name: string) =>
      `Qu\u00E9 muestra un registro de fabricaci\u00F3n ${name}`,
    containsIntro: (docName: string) =>
      `La ${docName} documenta el auto tal como sali\u00F3 de la f\u00E1brica \u2014 mucho m\u00E1s detalle del que la etiqueta Monroney mostraba al comprador.`,
    midCtaHeading: (name: string) =>
      `Decodifica la fabricaci\u00F3n original de tu ${name}`,
    midCtaBody: (docName: string) =>
      `Ingresa el VIN para fijar el a\u00F1o y la planta, y luego lee la ${docName} para conocer las opciones, los colores y el equipamiento originales. Gratis, en segundos.`,
    tipsHeading: (name: string) => `Consejos para la hoja de f\u00E1brica ${name}`,
    tipsIntro: (name: string) =>
      `Lo que compradores, coleccionistas y restauradores deben saber antes de confiar en un registro de fabricaci\u00F3n ${name}.`,
    sourcesHeading: (name: string) =>
      `Datos de fabricaci\u00F3n ${name} \u2014 Fuentes y referencias`,
    sourcesIntroBeforeStrong: "",
    sourcesIntroSuffix: (name: string) =>
      ` Las referencias siguientes son los or\u00EDgenes p\u00FAblicos autorizados detr\u00E1s de los datos de VIN, retiros (recalls) y t\u00EDtulo de ${name} en los Estados Unidos.`,
    sourceNote1: (name: string) =>
      `Decodificador federal de referencia para la estructura del VIN de ${name}.`,
    sourceLabel1: "Decodificador VIN NHTSA",
    sourceNote2: (name: string) => `B\u00FAsqueda abierta de retiros de ${name} por VIN.`,
    sourceLabel2: "NHTSA \u2014 Retiros de seguridad",
    sourceNote3: (name: string) =>
      `Base de datos federal de marcas de t\u00EDtulo que cubre cada ${name} en los 50 estados.`,
    sourceLabel3: "NMVTIS \u2014 Bureau of Justice Assistance",
    sourceNote4: (name: string) =>
      `Resultados independientes de pruebas de choque para modelos ${name} modernos.`,
    sourceLabel4: "IIHS \u2014 Calificaciones de seguridad",
    othersHeading: "Hojas de f\u00E1brica para otras marcas",
    othersIntro:
      "Cada fabricante registra la fabricaci\u00F3n de manera diferente. Salta al decodificador de otra marca.",
    othersBrandSuffix: " hoja de f\u00E1brica",
    fordSheetLabel: "Hoja de f\u00E1brica Ford",
    gmSheetLabel: "Hoja de f\u00E1brica GM",
    moparSheetLabel: "Hoja broadcast Mopar",
    fullHubLink: "Ver la b\u00FAsqueda de hoja de f\u00E1brica para todas las marcas",
    internalHeading: (name: string) =>
      `M\u00E1s herramientas VIN para due\u00F1os de ${name}`,
    internalIntro: (name: string) =>
      `El registro de fabricaci\u00F3n es el punto de partida. Estas verificaciones completan el panorama de cualquier ${name}.`,
    internalAllMakesLabel: "Hoja de f\u00E1brica por VIN (todas las marcas)",
    internalAllMakesDesc:
      "La b\u00FAsqueda general de hoja de f\u00E1brica que cubre cada fabricante.",
    internalVinDecoderLabel: "Decodificador VIN",
    internalVinDecoderDesc: (name: string) =>
      `Decodifica el VIN de ${name} al a\u00F1o del modelo, planta y secuencia de producci\u00F3n.`,
    internalPaintLabel: "Buscador de c\u00F3digo de pintura",
    internalPaintDesc: (name: string) =>
      `Confirma el c\u00F3digo de pintura de f\u00E1brica exacto de ${name} para retoque o restauraci\u00F3n.`,
    internalStickerLabel: "Creador de etiqueta Monroney",
    internalStickerDesc:
      "La vista Monroney orientada al consumidor con opciones en lenguaje sencillo y MSRP.",
    internalVinCheckLabel: "Verificaci\u00F3n completa de historial VIN",
    internalVinCheckDesc:
      "Registros de t\u00EDtulo, accidentes, od\u00F3metro y retiros para combinar con el origen de f\u00E1brica.",
    internalClassicLabel: "Decodificador VIN para autos cl\u00E1sicos",
    internalClassicDesc: (name: string) =>
      `Para modelos ${name} antiguos con VIN m\u00E1s cortos y placas espec\u00EDficas de la \u00E9poca.`,
    faqHeading: (name: string) =>
      `Hoja de f\u00E1brica ${name} \u2014 Preguntas frecuentes`,
    faqIntro: (name: string, docName: string) =>
      `Las preguntas que m\u00E1s hacen los due\u00F1os y compradores de ${name} sobre la ${docName}.`,
    ctaBadge: (name: string) =>
      `Gratis \u00B7 Instant\u00E1neo \u00B7 C\u00F3digos de fabricaci\u00F3n ${name}`,
    ctaHeading: (name: string) => `Busca una hoja de f\u00E1brica ${name} por VIN`,
    ctaBody: (docName: string) =>
      `Ingresa el VIN para anclar el a\u00F1o y la planta, luego decodifica la ${docName} \u2014 opciones de f\u00E1brica, c\u00F3digos de pintura e interior, y tren motriz.`,
    ctaNote: "Sin tarjeta \u00B7 Sin registro \u00B7 Gratis",
    faqBuilder(b: BuildSheetBrand) {
      return [
        {
          q: `\u00BFQu\u00E9 es una hoja de f\u00E1brica ${b.name}?`,
          a: `Una hoja de f\u00E1brica ${b.name} es la ${b.docName} \u2014 el registro de f\u00E1brica de c\u00F3mo se especific\u00F3 originalmente un veh\u00EDculo. ${b.summary.replace(/^A[n]? [^—]+—\s*/, "Es ")} Documenta ${b.contains.slice(0, 3).join(", ").toLowerCase()}, y m\u00E1s.`,
        },
        {
          q: `\u00BFC\u00F3mo encuentro una hoja de f\u00E1brica ${b.name} por VIN?`,
          a: `Ingresa el VIN de 17 caracteres en el formulario de arriba. El VIN fija el a\u00F1o del modelo, la planta de ensamble y el estilo de carrocer\u00EDa, que es lo que permite que la ${b.docName} se decodifique correctamente. Puedes encontrar el VIN en el tablero, en el marco de la puerta del conductor, en el t\u00EDtulo o en el registro.`,
        },
        {
          q: `\u00BFC\u00F3mo se ven los c\u00F3digos de opci\u00F3n ${b.name}?`,
          a: `${b.optionCodeFormat}`,
        },
        {
          q: `\u00BFD\u00F3nde se encuentran los datos de fabricaci\u00F3n ${b.name}?`,
          a: `En un ${b.name}, los datos de fabricaci\u00F3n se encuentran en estos lugares: ${b.whereToFind.join("; ")}.`,
        },
        {
          q: `\u00BFPor qu\u00E9 los compradores y coleccionistas de ${b.name} revisan la hoja de f\u00E1brica?`,
          a: `El registro de fabricaci\u00F3n es c\u00F3mo confirmas que una opci\u00F3n, paquete o color de f\u00E1brica fue instalado en la f\u00E1brica y no agregado despu\u00E9s \u2014 lo que afecta directamente cu\u00E1nto vale un ${b.name}. ${b.sourceName} es la autoridad que ${b.sourceNote.charAt(0).toLowerCase() + b.sourceNote.slice(1)}`,
        },
      ];
    },
  },
} as const;

export default function BuildSheetBrandBody({
  brandSlug,
  locale = "en",
}: {
  brandSlug: string;
  locale?: Locale;
}) {
  const brand = findBuildSheetBrand(brandSlug);
  if (!brand) return null;

  const copy = COPY[locale];
  const homeHref = locale === "es" ? "/es" : "/";
  const hubHref = locale === "es" ? "/es/hoja-fabrica" : "/build-sheet";
  const brandBaseHref =
    locale === "es" ? "/es/build-sheet" : "/build-sheet";
  const vinDecoderHref = locale === "es" ? "/es/decodificador-vin" : "/vin-decoder";
  const paintHref = locale === "es" ? "/es/codigo-de-pintura" : "/paint-code-lookup";
  const stickerHref =
    locale === "es" ? "/es/creador-etiqueta-monroney" : "/window-sticker";
  const vinCheckHref = locale === "es" ? "/es/revision-vin" : "/vin-check";
  const classicHref = locale === "es" ? "/es/vin-auto-clasico" : "/classic-car-vin";
  const fordSheetHref = locale === "es" ? "/es/hoja-fabrica-ford" : "/ford-build-sheet";
  const gmSheetHref = locale === "es" ? "/es/hoja-fabrica-gm" : "/gm-build-sheet";
  const moparSheetHref =
    locale === "es" ? "/es/hoja-broadcast-mopar" : "/mopar-broadcast-sheet";

  const otherBrands = getBrandOthers(brandSlug);
  const faqs = copy.faqBuilder(brand);

  const TRUST_STATS = [
    { icon: Tag, value: brand.docName.split(" ")[0], label: copy.trustStat1Label },
    { icon: ClipboardList, value: copy.trustStat2Value, label: copy.trustStat2Label },
    { icon: Factory, value: copy.trustStat3Value, label: copy.trustStat3Label },
    { icon: Search, value: copy.trustStat4Value, label: copy.trustStat4Label },
  ];

  const HOW_STEPS = [
    {
      icon: Search,
      tag: copy.step1Tag,
      title: copy.step1Title(brand.name),
      body: copy.step1Body,
    },
    {
      icon: Tag,
      tag: copy.step2Tag,
      title: copy.step2Title(brand.docName),
      body: copy.step2Body,
    },
    {
      icon: ScrollText,
      tag: copy.step3Tag,
      title: copy.step3Title,
      body: copy.step3Body,
    },
  ];

  const INTERNAL_LINKS = [
    {
      href: hubHref,
      label: copy.internalAllMakesLabel,
      desc: copy.internalAllMakesDesc,
    },
    {
      href: vinDecoderHref,
      label: copy.internalVinDecoderLabel,
      desc: copy.internalVinDecoderDesc(brand.name),
    },
    {
      href: paintHref,
      label: copy.internalPaintLabel,
      desc: copy.internalPaintDesc(brand.name),
    },
    {
      href: stickerHref,
      label: copy.internalStickerLabel,
      desc: copy.internalStickerDesc,
    },
    {
      href: vinCheckHref,
      label: copy.internalVinCheckLabel,
      desc: copy.internalVinCheckDesc,
    },
    {
      href: classicHref,
      label: copy.internalClassicLabel,
      desc: copy.internalClassicDesc(brand.name),
    },
  ];

  const SOURCES = [
    {
      href: "https://vpic.nhtsa.dot.gov/decoder/",
      label: copy.sourceLabel1,
      note: copy.sourceNote1(brand.name),
    },
    {
      href: "https://www.nhtsa.gov/recalls",
      label: copy.sourceLabel2,
      note: copy.sourceNote2(brand.name),
    },
    {
      href: "https://vehiclehistory.bja.ojp.gov/",
      label: copy.sourceLabel3,
      note: copy.sourceNote3(brand.name),
    },
    {
      href: "https://www.iihs.org/",
      label: copy.sourceLabel4,
      note: copy.sourceNote4(brand.name),
    },
  ];

  return (
    <article className="pb-16 bg-surface">
      {/* Hero */}
      <div className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
          <Breadcrumbs
            onDark
            items={[
              { label: copy.breadcrumbHome, href: homeHref },
              { label: copy.breadcrumbHub, href: hubHref },
              { label: brand.name },
            ]}
          />

          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <ClipboardList className="w-4 h-4" /> {brand.name}
            {copy.heroBadgeSep}
            {brand.eyebrow}
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
            {copy.h1Pre(brand.name)}
            <span style={{ color: "var(--color-secondary-container)" }}>
              {copy.h1Highlight(brand.docName)}
            </span>
          </h1>

          <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
            {brand.summary}
            {copy.heroSummarySuffix}
          </p>

          <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
            <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">
              {copy.searchHeading(brand.name)}
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant mb-4">
              {copy.searchSub}
            </p>
            <VinSearchForm size="lg" locale={locale} />
            <p className="mt-3 text-[11px] text-slate-400 flex items-center gap-1.5">
              <Lock className="w-3 h-3" /> {copy.trustNote}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            {TRUST_STATS.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className="bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-center"
                >
                  <Icon className="w-5 h-5 mx-auto mb-1 text-white/70" />
                  <div className="text-lg sm:text-xl font-headline font-black text-white truncate">
                    {s.value}
                  </div>
                  <div className="text-[11px] text-white/65 leading-tight mt-0.5">
                    {s.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* How it works */}
        <section className="py-12 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            {copy.howHeading(brand.name)}
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl">
            {copy.howIntro(brand.docName)}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {HOW_STEPS.map((m) => {
              const Icon = m.icon;
              return (
                <div
                  key={m.title}
                  className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-[11px] font-black uppercase tracking-wider text-primary/70 mb-0.5">
                    {m.tag}
                  </div>
                  <h3 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1.5">
                    {m.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    {m.body}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Where to find it */}
        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            {copy.whereHeading(brand.name)}
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">
            {copy.whereIntro(brand.name, brand.docName)}
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <ol className="space-y-3">
              {brand.whereToFind.map((loc, i) => (
                <li
                  key={loc}
                  className="flex gap-4 items-start rounded-2xl border border-outline-variant bg-surface-container-lowest p-5"
                >
                  <div
                    className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black ${
                      i === 0 ? "bg-primary text-white" : "bg-primary/10 text-primary"
                    }`}
                  >
                    {i + 1}
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                    <p className="text-sm sm:text-base text-on-surface font-medium leading-relaxed">
                      {loc}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Cog className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">
                  {copy.optionCodeHeading(brand.name)}
                </h3>
              </div>
              <p className="text-sm text-on-surface leading-relaxed">
                {brand.optionCodeFormat}
              </p>
              <div className="mt-5 rounded-xl bg-white p-4 border border-outline-variant">
                <p className="text-xs font-bold text-on-surface mb-2">
                  {copy.startLookupLabel(brand.name)}
                </p>
                <VinSearchForm size="sm" locale={locale} />
              </div>
            </div>
          </div>
        </section>

        {/* What the record contains */}
        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            {copy.containsHeading(brand.name)}
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">
            {copy.containsIntro(brand.docName)}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {brand.contains.map((c) => (
              <div
                key={c}
                className="flex items-start gap-3 rounded-2xl border border-outline-variant bg-surface p-5"
              >
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-primary" strokeWidth={3} />
                </div>
                <p className="text-sm text-on-surface font-medium leading-relaxed pt-1.5">
                  {c}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Mid CTA */}
        <section className="py-10">
          <div className="rounded-3xl bg-primary p-7 sm:p-10 text-center">
            <ClipboardList className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">
              {copy.midCtaHeading(brand.name)}
            </h2>
            <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">
              {copy.midCtaBody(brand.docName)}
            </p>
            <div className="max-w-xl mx-auto bg-white rounded-2xl p-4 sm:p-5">
              <VinSearchForm size="lg" locale={locale} />
            </div>
          </div>
        </section>

        {/* Tips */}
        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            {copy.tipsHeading(brand.name)}
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl">
            {copy.tipsIntro(brand.name)}
          </p>
          <div className="space-y-3">
            {brand.tips.map((tip) => (
              <div
                key={tip}
                className="flex gap-3 items-start rounded-2xl border border-outline-variant bg-surface-container-lowest p-5"
              >
                <div className="w-9 h-9 rounded-xl bg-secondary-container/50 flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-on-secondary-container" strokeWidth={3} />
                </div>
                <p className="text-sm text-on-surface leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Authority / source */}
        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-3">
            {copy.sourcesHeading(brand.name)}
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-6 max-w-3xl leading-relaxed">
            <strong className="text-on-surface">{brand.sourceName}</strong>{" "}
            {brand.sourceNote}
            {copy.sourcesIntroSuffix(brand.name)}
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            {SOURCES.map((s) => (
              <li
                key={s.href}
                className="rounded-xl border border-outline-variant bg-surface-container-lowest p-4"
              >
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80"
                >
                  {s.label} {"\u2197"}
                </a>
                <p className="mt-1.5 text-xs text-on-surface-variant leading-relaxed">
                  {s.note}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* Other brands */}
        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            {copy.othersHeading}
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-6 max-w-3xl">
            {copy.othersIntro}
          </p>
          <div className="flex flex-wrap gap-2">
            {otherBrands.map((b) => (
              <Link
                key={b.slug}
                href={`${brandBaseHref}/${b.slug}`}
                className="px-4 py-2 bg-surface text-on-surface text-sm rounded-xl border border-outline-variant hover:border-primary/40 hover:bg-primary/5 hover:text-primary transition-all font-medium"
              >
                {b.name}
                {copy.othersBrandSuffix}
              </Link>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              { href: fordSheetHref, label: copy.fordSheetLabel },
              { href: gmSheetHref, label: copy.gmSheetLabel },
              { href: moparSheetHref, label: copy.moparSheetLabel },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="px-4 py-2 bg-surface text-on-surface text-sm rounded-xl border border-outline-variant hover:border-primary/40 hover:bg-primary/5 hover:text-primary transition-all font-medium"
              >
                {l.label}
              </Link>
            ))}
          </div>
          <Link
            href={hubHref}
            className="inline-flex items-center gap-1.5 mt-6 text-primary font-semibold text-sm hover:text-primary/80 transition-colors"
          >
            {copy.fullHubLink} <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

        {/* Internal links */}
        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            {copy.internalHeading(brand.name)}
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7">
            {copy.internalIntro(brand.name)}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {INTERNAL_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="flex items-start gap-3 rounded-xl border border-outline-variant bg-surface hover:border-primary/40 hover:bg-primary/5 transition-colors p-4 group"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <ChevronRight className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-bold text-primary group-hover:underline">
                    {l.label}
                  </div>
                  <div className="text-xs text-on-surface-variant mt-0.5">
                    {l.desc}
                  </div>
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
        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            {copy.faqHeading(brand.name)}
          </h2>
          <p className="text-sm text-on-surface-variant mb-8">
            {copy.faqIntro(brand.name, brand.docName)}
          </p>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-2xl border border-outline-variant bg-surface p-4 sm:p-5 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                  <span className="text-sm sm:text-base font-headline font-extrabold text-primary pr-2">
                    {f.q}
                  </span>
                  <span className="flex-shrink-0 mt-0.5 text-primary text-xl font-light group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-14 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-wider mb-4">
            <Zap className="w-3.5 h-3.5" /> {copy.ctaBadge(brand.name)}
          </div>
          <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3">
            {copy.ctaHeading(brand.name)}
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">
            {copy.ctaBody(brand.docName)}
          </p>
          <div className="max-w-xl mx-auto bg-surface-container-low rounded-2xl p-5 border border-outline-variant">
            <VinSearchForm size="lg" locale={locale} />
          </div>
          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-on-surface-variant">
            <Check className="w-3.5 h-3.5 text-green-500" strokeWidth={3} />
            {copy.ctaNote}
          </div>
        </section>

        <RelatedChecks exclude="/build-sheet" />
      </div>
    </article>
  );
}
