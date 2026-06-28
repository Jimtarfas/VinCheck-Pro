/**
 * Shared body for /window-sticker and /es/window-sticker.
 * Wave 18 batch 3 — full English layout in both locales via COPY={en,es}.
 */

import Link from "next/link";
import {
  Check, FileText, Tag, Sparkles, Download, Printer, ScanLine, Lock,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import VinSearchForm from "@/components/VinSearchForm";
import WindowStickerMaker from "@/app/window-sticker/WindowStickerMaker";
import type { Locale } from "@/i18n/config";

const FEATURE_ICONS = [ScanLine, Tag, Sparkles, Printer, Download, FileText] as const;

const COPY = {
  en: {
    home: "Home", tools: "Tools", crumb: "Window Sticker Maker",
    heroBadge: "100% Free \u00B7 Auto-Fill from VIN \u00B7 Monroney-Style Output",
    h1: "Window Sticker Maker",
    intro: "Build a free, professional Monroney-style window sticker for any car, truck, or SUV in under a minute. Auto-fill the entire form from a VIN, customize the MSRP and factory options, then download or print. A free account is required only at the download step.",
    vinPromptTitle: "Have a VIN? Preview the vehicle\u2019s full history \u2014 free in seconds",
    tocOnThisPage: "On this page",
    toc: [
      { id: "tool", label: "Window Sticker Maker Tool" },
      { id: "features", label: "Features" },
      { id: "how-to-make", label: "How to Make a Window Sticker" },
      { id: "what-is-a-window-sticker", label: "What's on a Monroney Label" },
      { id: "why-make-one", label: "Why Make One" },
      { id: "by-vin", label: "How VIN Auto-Fill Works" },
      { id: "faq", label: "FAQ" },
    ],
    h2Features: "Free Window Sticker Maker Features",
    featuresIntro: "Designed to mirror the official Monroney label layout, with the flexibility to match any vehicle from any model year.",
    features: [
      { title: "Auto-fill from VIN", desc: "Paste a 17-character VIN and pull year, make, model, engine, MSRP, MPG, and equipment in one click." },
      { title: "Edit every field", desc: "Override base MSRP, destination charge, options, and standard equipment to match your build exactly." },
      { title: "Monroney-style preview", desc: "Live, professionally styled Monroney label updates as you type \u2014 no design work required." },
      { title: "Print or save as PDF", desc: "One-click print stylesheet hides the rest of the page so you get a clean single-page export." },
      { title: "Download as HTML", desc: "Save a portable HTML copy you can edit, archive, or share with buyers and dealers." },
      { title: "Free with a free account", desc: "No payment, no trial, no watermark. Sign up free to download or print as many stickers as you need." },
    ],
    h2HowTo: "How to Make a Window Sticker by VIN",
    howToIntro: "Four steps from VIN to a printable, downloadable Monroney label.",
    steps: [
      { step: "1", id: "step-1", title: "Paste the VIN", desc: "Enter any 17-character VIN into the Auto-fill field at the top of the maker." },
      { step: "2", id: "step-2", title: "Click Decode", desc: "We pull year, make, model, trim, engine, transmission, MSRP, EPA mileage, and factory equipment from the build record in seconds." },
      { step: "3", id: "step-3", title: "Customize options & pricing", desc: "Add or remove optional packages, fine-tune MSRP and destination charge, and edit the standard equipment list to reflect the exact build." },
      { step: "4", id: "step-4", title: "Sign in, then print or download", desc: "Create a free account (or log in) at the download step, then click Print / Save as PDF for a single-page sticker, or Download for a portable HTML copy." },
    ],
    h2What: "What\u2019s on a Monroney Label (a.k.a. Window Sticker)",
    whatP1Pre: "A ", whatP1Bold1: "Monroney label", whatP1Mid: " \u2014 commonly called a ", whatP1Bold2: "window sticker", whatP1Suffix: " \u2014 is the federally-mandated document that ships with every new vehicle sold in the United States. The Automobile Information Disclosure Act of 1958, sponsored by Oklahoma Senator Mike Monroney, created a standard, transparent pricing format that protects consumers from inflated dealer markups. Every retail passenger vehicle sold new since then has carried one of these labels on its side window until purchase.",
    whatP2: "The structure of the label is consistent across manufacturers and decades. Our maker mirrors this layout so the sticker you create looks instantly familiar to any buyer or collector. Each section serves a specific informational purpose:",
    whatBullets: [
      { bold: "Vehicle description block", body: " \u2014 year, make, model, trim, engine, transmission, drivetrain, exterior and interior colors, and the country/plant of assembly." },
      { bold: "Standard equipment list", body: " \u2014 every safety, comfort, technology, and convenience feature included at no extra charge with the base trim." },
      { bold: "Optional equipment & packages", body: " \u2014 every factory-installed option or bundled package, each with its individual price." },
      { bold: "EPA fuel economy", body: " \u2014 city, highway, and combined MPG (or MPGe for hybrids and EVs), plus an estimated annual fuel cost." },
      { bold: "Pricing summary", body: " \u2014 base MSRP, sum of all options, the destination/delivery charge, and the total vehicle price." },
      { bold: "VIN and identification", body: " \u2014 the 17-character vehicle identification number that ties the sticker to the specific unit." },
    ],
    h2Why: "Why People Use the Window Sticker Maker",
    whyParas: [
      { bold: "Private sellers", body: " use it to make Facebook Marketplace, Craigslist, and eBay Motors listings look more professional. A clean Monroney-style sticker communicates the original equipment, MSRP, and EPA ratings at a glance \u2014 buyers recognize the format and trust it. Sellers who include a sticker in their photo set report faster response times and stronger asking-price retention." },
      { bold: "Used car dealers", body: " generate replacement window stickers for trade-ins and pre-owned inventory where the original sticker has been removed or lost. A consistent in-store presentation across vehicles strengthens dealer brand and gives shoppers a frictionless way to compare units side by side." },
      { bold: "Collectors and restorers", body: " print stickers for car shows, museum displays, garage walls, and provenance binders. Documenting the original factory configuration alongside the vehicle adds value at auction and helps verify matching-numbers status during inspection." },
    ],
    whyP4Bold: "Buyers", whyP4Mid: " recreate window stickers for vehicles they\u2019re researching, especially when negotiating a used car. Knowing the original MSRP and option pricing reveals how much depreciation has actually occurred and gives you a factual baseline for offers. Pair this with a full ", whyP4Link: "VIN history report", whyP4Suffix: " to verify what has happened to the vehicle since it left the showroom.",
    whyP5Bold: "Insurance and appraisal", whyP5Mid: " use cases include agreed-value coverage for collectible vehicles, total-loss documentation, and replacement-cost calculations. Some insurers ask for the original equipment list to confirm coverage tiers \u2014 a ", whyP5Link: "total-loss check", whyP5Suffix: " alongside a Monroney label gives adjusters everything they need.",
    h2ByVin: "Window Sticker by VIN: How Auto-Fill Works",
    byVinP1: "Every character in a 17-digit VIN encodes specific information about the vehicle\u2019s country of origin, manufacturer, vehicle type, engine, model year, assembly plant, and sequential build number. Manufacturers use this code as the primary key into their internal build databases \u2014 which contain the full record of every option, package, and equipment line that was selected at the time of order.",
    byVinP2: "When you click Decode, the maker queries a VIN database that aggregates manufacturer build data and returns the matching factory configuration. We then map those fields directly into the form: year, make, model, trim, engine displacement and configuration, transmission, drivetrain, base MSRP, destination charge, EPA fuel economy, and the factory equipment list.",
    byVinP3: "Coverage is strongest for U.S.-market vehicles built from 1981 onward, since that\u2019s when the 17-character VIN standard was adopted. For older vehicles, fleet orders, or specialty builds with limited public records, you can still build a complete sticker manually using the form fields. The Monroney layout is identical regardless of how the data gets in.",
    byVinP4Pre: "Pair a window sticker with a ", byVinL1: "factory build sheet", byVinP4Mid1: ", ", byVinL2: "recall check", byVinP4Mid2: ", and a ", byVinL3: "current market value", byVinP4Mid3: " for the most complete pre-purchase or pre-listing snapshot of any vehicle. Buyers on online marketplaces should also pair it with a ", byVinL4: "marketplace VIN check", byVinP4Suffix: " before meeting any seller.",
    gateTitle: "A free account is required to download or print",
    gateBody: "Building and previewing your window sticker is open to anyone \u2014 no signup required. To download the HTML copy or print/save as PDF, you\u2019ll create a free account (email + password, no credit card). Signup takes seconds and unlocks unlimited downloads forever.",
    h2Faq: "Window Sticker Maker FAQ",
    bottomHeading: "Build Your Window Sticker Now",
    bottomSub: "Auto-fill from a VIN, customize, and download \u2014 100% free with a free account.",
    bottomCta: "Start the Maker",
  },
  es: {
    home: "Inicio", tools: "Herramientas", crumb: "Creador de etiqueta de ventana",
    heroBadge: "100% Gratis \u00B7 Autocompletar desde VIN \u00B7 Salida estilo Monroney",
    h1: "Creador de etiqueta de ventana",
    intro: "Construye una etiqueta de ventana profesional estilo Monroney gratis para cualquier auto, camioneta o SUV en menos de un minuto. Autocompleta todo el formulario desde un VIN, personaliza el MSRP y las opciones de f\u00E1brica, luego descarga o imprime. Solo se requiere una cuenta gratis en el paso de descarga.",
    vinPromptTitle: "\u00BFTienes un VIN? Previsualiza el historial completo del veh\u00EDculo \u2014 gratis en segundos",
    tocOnThisPage: "En esta p\u00E1gina",
    toc: [
      { id: "tool", label: "Herramienta creadora de etiquetas" },
      { id: "features", label: "Caracter\u00EDsticas" },
      { id: "how-to-make", label: "C\u00F3mo crear una etiqueta de ventana" },
      { id: "what-is-a-window-sticker", label: "Qu\u00E9 lleva una etiqueta Monroney" },
      { id: "why-make-one", label: "Por qu\u00E9 crear una" },
      { id: "by-vin", label: "C\u00F3mo funciona el autocompletado VIN" },
      { id: "faq", label: "Preguntas frecuentes" },
    ],
    h2Features: "Caracter\u00EDsticas del creador gratis de etiquetas de ventana",
    featuresIntro: "Dise\u00F1ado para reflejar el dise\u00F1o oficial de la etiqueta Monroney, con la flexibilidad de adaptarse a cualquier veh\u00EDculo de cualquier a\u00F1o modelo.",
    features: [
      { title: "Autocompletar desde VIN", desc: "Pega un VIN de 17 caracteres y obt\u00E9n a\u00F1o, marca, modelo, motor, MSRP, MPG y equipamiento con un clic." },
      { title: "Edita cada campo", desc: "Sobrescribe MSRP base, tarifa de destino, opciones y equipamiento est\u00E1ndar para que coincida exactamente con tu configuraci\u00F3n." },
      { title: "Vista previa estilo Monroney", desc: "Etiqueta Monroney en vivo y profesional que se actualiza mientras escribes \u2014 sin trabajo de dise\u00F1o requerido." },
      { title: "Imprime o guarda como PDF", desc: "Hoja de estilo de impresi\u00F3n de un clic que oculta el resto de la p\u00E1gina para obtener una exportaci\u00F3n limpia de una sola p\u00E1gina." },
      { title: "Descarga como HTML", desc: "Guarda una copia HTML port\u00E1til que puedes editar, archivar o compartir con compradores y concesionarios." },
      { title: "Gratis con cuenta gratis", desc: "Sin pago, sin prueba, sin marca de agua. Reg\u00EDstrate gratis para descargar o imprimir tantas etiquetas como necesites." },
    ],
    h2HowTo: "C\u00F3mo crear una etiqueta de ventana por VIN",
    howToIntro: "Cuatro pasos desde el VIN hasta una etiqueta Monroney imprimible y descargable.",
    steps: [
      { step: "1", id: "step-1", title: "Pega el VIN", desc: "Ingresa cualquier VIN de 17 caracteres en el campo de autocompletado en la parte superior del creador." },
      { step: "2", id: "step-2", title: "Haz clic en Decodificar", desc: "Extraemos a\u00F1o, marca, modelo, versi\u00F3n, motor, transmisi\u00F3n, MSRP, MPG EPA y equipamiento de f\u00E1brica del registro de construcci\u00F3n en segundos." },
      { step: "3", id: "step-3", title: "Personaliza opciones y precios", desc: "Agrega o elimina paquetes opcionales, ajusta el MSRP y la tarifa de destino, y edita la lista de equipamiento est\u00E1ndar para reflejar la configuraci\u00F3n exacta." },
      { step: "4", id: "step-4", title: "Inicia sesi\u00F3n, luego imprime o descarga", desc: "Crea una cuenta gratis (o inicia sesi\u00F3n) en el paso de descarga, luego haz clic en Imprimir / Guardar como PDF para una etiqueta de una sola p\u00E1gina, o Descargar para una copia HTML port\u00E1til." },
    ],
    h2What: "Qu\u00E9 lleva una etiqueta Monroney (tambi\u00E9n conocida como etiqueta de ventana)",
    whatP1Pre: "Una ", whatP1Bold1: "etiqueta Monroney", whatP1Mid: " \u2014 com\u00FAnmente llamada ", whatP1Bold2: "etiqueta de ventana", whatP1Suffix: " \u2014 es el documento exigido por ley federal que viene con cada veh\u00EDculo nuevo vendido en Estados Unidos. La Ley de Divulgaci\u00F3n de Informaci\u00F3n de Autom\u00F3viles de 1958, patrocinada por el senador de Oklahoma Mike Monroney, cre\u00F3 un formato de precios est\u00E1ndar y transparente que protege a los consumidores de los aumentos inflados del concesionario. Cada veh\u00EDculo de pasajeros vendido nuevo desde entonces ha llevado una de estas etiquetas en la ventana lateral hasta la compra.",
    whatP2: "La estructura de la etiqueta es consistente entre fabricantes y d\u00E9cadas. Nuestro creador refleja este dise\u00F1o para que la etiqueta que crees se vea instant\u00E1neamente familiar para cualquier comprador o coleccionista. Cada secci\u00F3n cumple un prop\u00F3sito informativo espec\u00EDfico:",
    whatBullets: [
      { bold: "Bloque de descripci\u00F3n del veh\u00EDculo", body: " \u2014 a\u00F1o, marca, modelo, versi\u00F3n, motor, transmisi\u00F3n, tracci\u00F3n, colores exteriores e interiores, y el pa\u00EDs/planta de ensamblaje." },
      { bold: "Lista de caracter\u00EDsticas est\u00E1ndar", body: " \u2014 cada caracter\u00EDstica de seguridad, comodidad, tecnolog\u00EDa y conveniencia incluida sin cargo adicional con la versi\u00F3n base." },
      { bold: "Equipamiento opcional y paquetes", body: " \u2014 cada opci\u00F3n instalada de f\u00E1brica o paquete agrupado, cada uno con su precio individual." },
      { bold: "Econom\u00EDa de combustible EPA", body: " \u2014 MPG en ciudad, carretera y combinado (o MPGe para h\u00EDbridos y EV), m\u00E1s un costo anual estimado de combustible." },
      { bold: "Resumen de precios", body: " \u2014 MSRP base, suma de todas las opciones, la tarifa de destino/entrega y el precio total del veh\u00EDculo." },
      { bold: "VIN e identificaci\u00F3n", body: " \u2014 el n\u00FAmero de identificaci\u00F3n del veh\u00EDculo de 17 caracteres que vincula la etiqueta a la unidad espec\u00EDfica." },
    ],
    h2Why: "Por qu\u00E9 la gente usa el creador de etiquetas de ventana",
    whyParas: [
      { bold: "Vendedores privados", body: " lo usan para hacer que los anuncios en Facebook Marketplace, Craigslist y eBay Motors se vean m\u00E1s profesionales. Una etiqueta estilo Monroney limpia comunica el equipamiento original, MSRP y calificaciones EPA de un vistazo \u2014 los compradores reconocen el formato y conf\u00EDan en \u00E9l. Los vendedores que incluyen una etiqueta en su conjunto de fotos reportan tiempos de respuesta m\u00E1s r\u00E1pidos y mayor retenci\u00F3n del precio solicitado." },
      { bold: "Concesionarios de autos usados", body: " generan etiquetas de ventana de reemplazo para canjes e inventario usado donde la etiqueta original ha sido retirada o perdida. Una presentaci\u00F3n consistente en la tienda entre veh\u00EDculos fortalece la marca del concesionario y da a los compradores una forma sin fricci\u00F3n de comparar unidades lado a lado." },
      { bold: "Coleccionistas y restauradores", body: " imprimen etiquetas para exposiciones de autos, exhibiciones de museos, paredes de garaje y carpetas de procedencia. Documentar la configuraci\u00F3n de f\u00E1brica original junto al veh\u00EDculo agrega valor en subasta y ayuda a verificar el estado de n\u00FAmeros coincidentes durante la inspecci\u00F3n." },
    ],
    whyP4Bold: "Compradores", whyP4Mid: " recrean etiquetas de ventana para veh\u00EDculos que est\u00E1n investigando, especialmente al negociar un auto usado. Conocer el MSRP original y el precio de las opciones revela cu\u00E1nta depreciaci\u00F3n ha ocurrido realmente y te da una base factual para las ofertas. Combina esto con un ", whyP4Link: "reporte de historial VIN", whyP4Suffix: " completo para verificar lo que ha pasado con el veh\u00EDculo desde que sali\u00F3 del sal\u00F3n de exhibici\u00F3n.",
    whyP5Bold: "Casos de seguro y avaluaci\u00F3n", whyP5Mid: " incluyen cobertura de valor acordado para veh\u00EDculos coleccionables, documentaci\u00F3n de p\u00E9rdida total y c\u00E1lculos de costo de reemplazo. Algunas aseguradoras piden la lista de equipamiento original para confirmar niveles de cobertura \u2014 una ", whyP5Link: "verificaci\u00F3n de p\u00E9rdida total", whyP5Suffix: " junto a una etiqueta Monroney da a los ajustadores todo lo que necesitan.",
    h2ByVin: "Etiqueta de ventana por VIN: c\u00F3mo funciona el autocompletado",
    byVinP1: "Cada car\u00E1cter en un VIN de 17 d\u00EDgitos codifica informaci\u00F3n espec\u00EDfica sobre el pa\u00EDs de origen del veh\u00EDculo, fabricante, tipo de veh\u00EDculo, motor, a\u00F1o modelo, planta de ensamblaje y n\u00FAmero secuencial de construcci\u00F3n. Los fabricantes usan este c\u00F3digo como clave primaria en sus bases de datos internas de construcci\u00F3n \u2014 que contienen el registro completo de cada opci\u00F3n, paquete y l\u00EDnea de equipamiento que se seleccion\u00F3 al momento del pedido.",
    byVinP2: "Cuando haces clic en Decodificar, el creador consulta una base de datos VIN que agrega datos de construcci\u00F3n del fabricante y devuelve la configuraci\u00F3n de f\u00E1brica coincidente. Luego mapeamos esos campos directamente al formulario: a\u00F1o, marca, modelo, versi\u00F3n, desplazamiento y configuraci\u00F3n del motor, transmisi\u00F3n, tracci\u00F3n, MSRP base, tarifa de destino, econom\u00EDa de combustible EPA y la lista de equipamiento de f\u00E1brica.",
    byVinP3: "La cobertura es m\u00E1s fuerte para veh\u00EDculos del mercado estadounidense construidos desde 1981 en adelante, ya que es cuando se adopt\u00F3 el est\u00E1ndar VIN de 17 caracteres. Para veh\u00EDculos m\u00E1s antiguos, pedidos de flota o construcciones especializadas con registros p\u00FAblicos limitados, a\u00FAn puedes construir una etiqueta completa manualmente usando los campos del formulario. El dise\u00F1o Monroney es id\u00E9ntico independientemente de c\u00F3mo entren los datos.",
    byVinP4Pre: "Combina una etiqueta de ventana con una ", byVinL1: "hoja de construcci\u00F3n de f\u00E1brica", byVinP4Mid1: ", ", byVinL2: "verificaci\u00F3n de recalls", byVinP4Mid2: " y un ", byVinL3: "valor de mercado actual", byVinP4Mid3: " para la instant\u00E1nea m\u00E1s completa pre-compra o pre-anuncio de cualquier veh\u00EDculo. Los compradores en mercados en l\u00EDnea tambi\u00E9n deben combinarla con una ", byVinL4: "verificaci\u00F3n VIN de marketplace", byVinP4Suffix: " antes de encontrarse con cualquier vendedor.",
    gateTitle: "Se requiere una cuenta gratis para descargar o imprimir",
    gateBody: "Construir y previsualizar tu etiqueta de ventana est\u00E1 abierto para cualquiera \u2014 no se requiere registro. Para descargar la copia HTML o imprimir/guardar como PDF, crear\u00E1s una cuenta gratis (correo + contrase\u00F1a, sin tarjeta de cr\u00E9dito). El registro toma segundos y desbloquea descargas ilimitadas para siempre.",
    h2Faq: "Preguntas frecuentes del creador de etiquetas",
    bottomHeading: "Construye tu etiqueta de ventana ahora",
    bottomSub: "Autocompleta desde un VIN, personaliza y descarga \u2014 100% gratis con una cuenta gratis.",
    bottomCta: "Iniciar el creador",
  },
} as const;

const FAQS_EN = [
  { question: "Is this window sticker maker really free?", answer: "Yes \u2014 the Window Sticker Maker is completely free. You'll create a free account before downloading or printing your finished sticker, but there's no payment, no trial limit, and no watermark. Build as many window stickers as you need." },
  { question: "Do I need an account to use the window sticker maker?", answer: "Building and previewing a window sticker is open to everyone. A free account is required only at the moment you download or print the finished sticker. Signup takes seconds and uses just your email \u2014 no credit card and no personal details beyond that." },
  { question: "What is a Monroney label?", answer: "A Monroney label \u2014 commonly called a window sticker \u2014 is the federally-mandated document that lists every new vehicle's MSRP, factory-installed options, destination charge, fuel economy, and standard equipment. It was introduced by the Automobile Information Disclosure Act of 1958 and is named after its sponsor, Senator Mike Monroney of Oklahoma." },
  { question: "Can I create a window sticker just from a VIN?", answer: "Yes. Enter the 17-character VIN and click Decode \u2014 the maker pulls year, make, model, trim, engine, transmission, MSRP, EPA fuel economy, and factory equipment from the build record. You can edit every field after the auto-fill." },
  { question: "Can I download the window sticker as a PDF?", answer: "Yes. After signing in, click Print / Save as PDF to open your browser's print dialog, then choose 'Save as PDF' as the destination. The print stylesheet hides the rest of the page so you get a clean, single-page sticker. You can also download an HTML copy for editing." },
  { question: "Is this an official manufacturer window sticker?", answer: "No. The maker generates a Monroney-style replica using vehicle data and the values you enter. It is intended for personal use, listing photos, presentations, or display \u2014 it is not a manufacturer-issued document and should not be presented as one in legal or regulated contexts." },
  { question: "Why would I make a window sticker?", answer: "Sellers create window stickers to make used vehicle listings look professional and to document factory equipment for buyers. Dealers use them for in-house displays. Collectors and restorers print them for shows, garage walls, and provenance binders. Insurance documentation and pre-purchase confidence are also common reasons." },
  { question: "Does the maker work for older or classic cars?", answer: "Auto-fill works best for vehicles built after 1981, when the 17-character VIN became standard. For older or classic vehicles you can still build a sticker manually by typing the year, make, model, options, and original MSRP into the form. The Monroney layout fits any era." },
  { question: "Can I add custom options that weren't on the original sticker?", answer: "Yes \u2014 the optional equipment section lets you add unlimited rows with custom names and prices. Use this to document dealer-installed accessories, aftermarket upgrades, or restoration parts alongside the original factory options." },
  { question: "Which brands work with the window sticker maker?", answer: "Every U.S.-market brand is supported, including Ford, Chevrolet, Toyota, Honda, Nissan, RAM, Jeep, GMC, Hyundai, Kia, Subaru, Volkswagen, BMW, Mercedes-Benz, Audi, Lexus, Acura, Cadillac, Chrysler, Dodge, Mazda, Mitsubishi, Volvo, Tesla, and more. If a vehicle has a 17-character VIN, it can be auto-filled." },
];

const FAQS_ES = [
  { question: "\u00BFEste creador de etiquetas de ventana es realmente gratis?", answer: "S\u00ED \u2014 el creador de etiquetas de ventana es completamente gratis. Crear\u00E1s una cuenta gratis antes de descargar o imprimir tu etiqueta terminada, pero no hay pago, sin l\u00EDmite de prueba y sin marca de agua. Construye tantas etiquetas como necesites." },
  { question: "\u00BFNecesito una cuenta para usar el creador de etiquetas?", answer: "Construir y previsualizar una etiqueta de ventana est\u00E1 abierto para todos. Una cuenta gratis se requiere solo en el momento en que descargas o imprimes la etiqueta terminada. El registro toma segundos y solo usa tu correo \u2014 sin tarjeta de cr\u00E9dito y sin detalles personales m\u00E1s all\u00E1 de eso." },
  { question: "\u00BFQu\u00E9 es una etiqueta Monroney?", answer: "Una etiqueta Monroney \u2014 com\u00FAnmente llamada etiqueta de ventana \u2014 es el documento exigido por ley federal que enumera el MSRP de cada veh\u00EDculo nuevo, las opciones instaladas de f\u00E1brica, tarifa de destino, econom\u00EDa de combustible y equipamiento est\u00E1ndar. Fue introducida por la Ley de Divulgaci\u00F3n de Informaci\u00F3n de Autom\u00F3viles de 1958 y lleva el nombre de su patrocinador, el senador Mike Monroney de Oklahoma." },
  { question: "\u00BFPuedo crear una etiqueta de ventana solo desde un VIN?", answer: "S\u00ED. Ingresa el VIN de 17 caracteres y haz clic en Decodificar \u2014 el creador extrae a\u00F1o, marca, modelo, versi\u00F3n, motor, transmisi\u00F3n, MSRP, econom\u00EDa de combustible EPA y equipamiento de f\u00E1brica del registro de construcci\u00F3n. Puedes editar cada campo despu\u00E9s del autocompletado." },
  { question: "\u00BFPuedo descargar la etiqueta de ventana como PDF?", answer: "S\u00ED. Despu\u00E9s de iniciar sesi\u00F3n, haz clic en Imprimir / Guardar como PDF para abrir el di\u00E1logo de impresi\u00F3n de tu navegador, luego elige 'Guardar como PDF' como destino. La hoja de estilo de impresi\u00F3n oculta el resto de la p\u00E1gina para obtener una etiqueta limpia de una sola p\u00E1gina. Tambi\u00E9n puedes descargar una copia HTML para editar." },
  { question: "\u00BFEsta es una etiqueta de ventana oficial del fabricante?", answer: "No. El creador genera una r\u00E9plica estilo Monroney usando datos del veh\u00EDculo y los valores que ingresas. Est\u00E1 destinada para uso personal, fotos de anuncios, presentaciones o exhibici\u00F3n \u2014 no es un documento emitido por el fabricante y no debe presentarse como tal en contextos legales o regulados." },
  { question: "\u00BFPor qu\u00E9 har\u00EDa una etiqueta de ventana?", answer: "Los vendedores crean etiquetas de ventana para hacer que los anuncios de veh\u00EDculos usados se vean profesionales y para documentar el equipamiento de f\u00E1brica para los compradores. Los concesionarios las usan para exhibiciones en tienda. Coleccionistas y restauradores las imprimen para exposiciones, paredes de garaje y carpetas de procedencia. La documentaci\u00F3n de seguro y la confianza pre-compra tambi\u00E9n son razones comunes." },
  { question: "\u00BFEl creador funciona para autos m\u00E1s antiguos o cl\u00E1sicos?", answer: "El autocompletado funciona mejor para veh\u00EDculos construidos despu\u00E9s de 1981, cuando el VIN de 17 caracteres se volvi\u00F3 est\u00E1ndar. Para veh\u00EDculos m\u00E1s antiguos o cl\u00E1sicos, a\u00FAn puedes construir una etiqueta manualmente escribiendo el a\u00F1o, marca, modelo, opciones y MSRP original en el formulario. El dise\u00F1o Monroney se adapta a cualquier era." },
  { question: "\u00BFPuedo agregar opciones personalizadas que no estaban en la etiqueta original?", answer: "S\u00ED \u2014 la secci\u00F3n de equipamiento opcional te permite agregar filas ilimitadas con nombres y precios personalizados. Usa esto para documentar accesorios instalados por el concesionario, mejoras del mercado de accesorios o piezas de restauraci\u00F3n junto a las opciones originales de f\u00E1brica." },
  { question: "\u00BFQu\u00E9 marcas funcionan con el creador de etiquetas de ventana?", answer: "Cada marca del mercado estadounidense es compatible, incluyendo Ford, Chevrolet, Toyota, Honda, Nissan, RAM, Jeep, GMC, Hyundai, Kia, Subaru, Volkswagen, BMW, Mercedes-Benz, Audi, Lexus, Acura, Cadillac, Chrysler, Dodge, Mazda, Mitsubishi, Volvo, Tesla y m\u00E1s. Si un veh\u00EDculo tiene un VIN de 17 caracteres, puede autocompletarse." },
];

interface Props { locale: Locale; }

export default function WindowStickerBody({ locale }: Props) {
  const c = COPY[locale];
  const faqs = locale === "es" ? FAQS_ES : FAQS_EN;
  const link = (en: string) => (locale === "es" ? `/es${en}` : en);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white pt-24 pb-12 print:hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Breadcrumbs
              onDark
              items={[
                { label: c.home, href: locale === "es" ? "/es" : "/" },
                { label: c.tools, href: link("/tools") },
                { label: c.crumb },
              ]}
            />
          </div>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 border border-white/20 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            {c.heroBadge}
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4">{c.h1}</h1>
          <p className="text-lg text-primary-100 max-w-2xl leading-relaxed">{c.intro}</p>

          <div className="mt-7 rounded-2xl bg-white/10 border border-white/20 p-4 sm:p-5 backdrop-blur-sm max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <ScanLine className="w-4 h-4 text-amber-300 flex-shrink-0" />
              <p className="text-sm sm:text-base font-bold">{c.vinPromptTitle}</p>
            </div>
            <VinSearchForm size="sm" onDark />
          </div>

          <nav aria-label={c.tocOnThisPage} className="mt-6 flex flex-wrap gap-2 text-sm">
            {c.toc.map((t) => (
              <a
                key={t.id}
                href={`#${t.id}`}
                className="px-3 py-1.5 rounded-full bg-white/10 border border-white/15 hover:bg-white/20 text-white/90 hover:text-white transition"
              >
                {t.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* The actual tool */}
      <section id="tool" className="bg-slate-50 border-b border-slate-200 py-10 print:py-0 print:bg-white print:border-0 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <WindowStickerMaker locale={locale} />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 bg-white print:hidden scroll-mt-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">{c.h2Features}</h2>
          <p className="text-slate-700 mb-8">{c.featuresIntro}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {c.features.map((f, i) => {
              const Icon = FEATURE_ICONS[i];
              return (
                <article key={f.title} className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-slate-900">{f.title}</h3>
                  <p className="text-sm text-slate-700 mt-1 leading-relaxed">{f.desc}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-to-make" className="py-16 bg-slate-50 print:hidden scroll-mt-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">{c.h2HowTo}</h2>
          <p className="text-slate-700 mb-8">{c.howToIntro}</p>
          <ol className="space-y-4">
            {c.steps.map((s) => (
              <li key={s.step} id={s.id} className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-slate-200 scroll-mt-24">
                <div className="w-9 h-9 rounded-xl bg-primary-600 text-white flex items-center justify-center flex-shrink-0 text-sm font-bold">
                  {s.step}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{s.title}</h3>
                  <p className="text-sm text-slate-700 mt-1 leading-relaxed">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* What is on a window sticker */}
      <section id="what-is-a-window-sticker" className="py-16 bg-white print:hidden scroll-mt-24">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">{c.h2What}</h2>
          <p className="text-slate-700 leading-relaxed mb-6">
            {c.whatP1Pre}<strong>{c.whatP1Bold1}</strong>{c.whatP1Mid}<strong>{c.whatP1Bold2}</strong>{c.whatP1Suffix}
          </p>
          <p className="text-slate-700 leading-relaxed mb-6">{c.whatP2}</p>
          <ul className="space-y-2 text-slate-700">
            {c.whatBullets.map((b) => (
              <li key={b.bold} className="flex gap-2 items-start">
                <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span><strong>{b.bold}</strong>{b.body}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      {/* Why make one */}
      <section id="why-make-one" className="py-16 bg-slate-50 print:hidden scroll-mt-24">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">{c.h2Why}</h2>
          <div className="space-y-4 text-slate-700 leading-relaxed">
            {c.whyParas.map((p) => (
              <p key={p.bold}><strong>{p.bold}</strong>{p.body}</p>
            ))}
            <p>
              <strong>{c.whyP4Bold}</strong>{c.whyP4Mid}
              <Link href={link("/vin-check")} className="text-primary-600 hover:underline font-medium">{c.whyP4Link}</Link>
              {c.whyP4Suffix}
            </p>
            <p>
              <strong>{c.whyP5Bold}</strong>{c.whyP5Mid}
              <Link href={link("/total-loss-check")} className="text-primary-600 hover:underline font-medium">{c.whyP5Link}</Link>
              {c.whyP5Suffix}
            </p>
          </div>
        </article>
      </section>

      {/* Window sticker by VIN */}
      <section id="by-vin" className="py-16 bg-white print:hidden scroll-mt-24">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">{c.h2ByVin}</h2>
          <p className="text-slate-700 leading-relaxed mb-4">{c.byVinP1}</p>
          <p className="text-slate-700 leading-relaxed mb-4">{c.byVinP2}</p>
          <p className="text-slate-700 leading-relaxed mb-4">{c.byVinP3}</p>
          <p className="text-slate-700 leading-relaxed">
            {c.byVinP4Pre}
            <Link href={link("/build-sheet")} className="text-primary-600 hover:underline font-medium">{c.byVinL1}</Link>
            {c.byVinP4Mid1}
            <Link href={link("/recall-check")} className="text-primary-600 hover:underline font-medium">{c.byVinL2}</Link>
            {c.byVinP4Mid2}
            <Link href={link("/market-value")} className="text-primary-600 hover:underline font-medium">{c.byVinL3}</Link>
            {c.byVinP4Mid3}
            <Link href={link("/marketplace-vin-check")} className="text-primary-600 hover:underline font-medium">{c.byVinL4}</Link>
            {c.byVinP4Suffix}
          </p>
        </article>
      </section>

      {/* Account explainer */}
      <section className="py-12 bg-primary-50 print:hidden">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4 p-6 rounded-2xl border border-primary-200 bg-white">
            <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center flex-shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">{c.gateTitle}</h2>
              <p className="mt-2 text-sm text-slate-700 leading-relaxed">{c.gateBody}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 bg-slate-50 print:hidden scroll-mt-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">{c.h2Faq}</h2>
          <div className="space-y-4">
            {faqs.map((q) => (
              <details key={q.question} className="group bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <summary className="cursor-pointer list-none p-5 flex items-center justify-between gap-4 font-semibold text-slate-900 hover:bg-slate-50">
                  <span>{q.question}</span>
                  <span className="text-primary-600 group-open:rotate-45 transition-transform text-xl leading-none">+</span>
                </summary>
                <div className="px-5 pb-5 text-slate-700 leading-relaxed text-sm">{q.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* VIN Check CTA */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 print:hidden">
        <VinCheckBanner />
      </div>

      {/* Related */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-12 print:hidden">
        <RelatedChecks exclude="/window-sticker" />
      </div>

      {/* Final CTA */}
      <section className="py-14 bg-primary-600 text-white print:hidden">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-3">{c.bottomHeading}</h2>
          <p className="text-primary-100 mb-6">{c.bottomSub}</p>
          <a href="#tool" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-primary-700 font-semibold hover:bg-primary-50 transition">
            {c.bottomCta}
          </a>
        </div>
      </section>
    </>
  );
}

export { FAQS_EN, FAQS_ES };
