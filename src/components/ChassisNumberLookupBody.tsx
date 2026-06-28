/**
 * Shared body for /chassis-number-lookup and /es/chassis-number-lookup.
 * Wave 18.19 — full English layout in both locales via COPY={en,es}.
 */

import Link from "@/components/LocaleLink";
import {
  Check, Shield, Search, AlertCircle, Globe, MapPin, ChevronRight, Lock,
  Zap, BadgeCheck, Hash, ScanLine, Car, Wrench, ClipboardCheck,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import type { Locale } from "@/i18n/config";

const HOW_ICONS = [MapPin, ScanLine, Search, ClipboardCheck, Shield] as const;

const COPY = {
  en: {
    home: "Home", crumb: "Chassis Number Lookup",
    badge: "Chassis Number = VIN   ·   Works Worldwide",
    h1Lead: "Chassis Number Lookup — ",
    h1Accent: "Find the Car Type Free",
    intro1: "Your chassis number ", introEm: "is", intro2: " your VIN. Enter the 17-character code to decode the make, model, year, body, and engine instantly — then see the full history. Whether your document calls it a chassis number, frame number, or VIN, this is the one tool that reads it.",
    formHeading: "Search a Car by Chassis Number",
    formSub: "Enter the 17-character chassis number (VIN) — we'll return the car type, full specification, and history",
    formNote: "Free · No sign-up · Instant car type",
    trustStats: [
      { icon: Globe, value: "Worldwide", label: "any 17-char chassis no." },
      { icon: Hash, value: "17", label: "characters decoded" },
      { icon: Zap, value: "Instant", label: "no sign-up needed" },
      { icon: BadgeCheck, value: "Free", label: "car type & specs" },
    ],
    h2Vs: "Chassis Number vs VIN — They're the Same Thing",
    vsIntroPre: "This trips up buyers every day. The short answer: on any vehicle built since 1981, the ",
    vsIntroBold: "chassis number and the VIN are one and the same",
    vsIntroSuffix: " 17-character code. Only the name changes by country.",
    chassisTag: "\u201CChassis Number\u201D",
    chassisTitle: "UK · EU · Australia · India · Middle East · Africa",
    chassisBullets: [
      "The everyday term on a V5C, RC, or registration certificate.",
      "Stamped on the chassis and shown on the manufacturer's plate.",
      "17 characters under the global ISO 3779 standard.",
    ],
    vinTag: "\u201CVIN\u201D",
    vinTitle: "USA · Canada (and the technical/legal name everywhere)",
    vinBullets: [
      "Vehicle Identification Number — same 17 characters.",
      "On the title, dashboard, and door jamb.",
      "Identical structure: WMI + descriptor + serial.",
    ],
    quickTestBold: "Quick test:",
    quickTestBody: " count the characters. If it's exactly 17 with no letters I, O or Q, it's a modern chassis number (VIN) and the tool above will decode it. If it's shorter, you have a pre-1981 or domestic-market chassis number that needs manufacturer records instead.",
    h2How: "How to Look Up a Car by Chassis Number — Step by Step",
    howIntro: "Five steps from \u201Cwhere is it?\u201D to a full car-type identification and history. Works for cars, vans, trucks, and motorcycles with a standard 17-character chassis number.",
    stepWord: "Step",
    howSteps: [
      { step: "01", title: "Find your chassis number", body: "It lives in several places: on the registration document (V5C in the UK, the registration certificate elsewhere), through the bottom of the windscreen, on a plate in the engine bay, stamped on the chassis rail or firewall, and on the driver-side door jamb sticker. Every copy should match." },
      { step: "02", title: "Read all 17 characters", body: "Modern chassis numbers are exactly 17 characters. Copy them precisely — the letters I, O and Q are never used, so anything that looks like one is really a 1 or a 0. A single wrong character decodes a different vehicle." },
      { step: "03", title: "Decode it instantly", body: "Enter the chassis number above. The decoder reads the WMI (manufacturer + country), the descriptor section (model, body, engine, restraints), the model-year character, and the plant code — returning the full car type in seconds, free." },
      { step: "04", title: "Match it to the listing or document", body: "Confirm the decoded make, model, year and body match what the seller or paperwork claims. A mismatch between the decoded car type and the advertised vehicle is an immediate red flag for a cloned or misrepresented car." },
      { step: "05", title: "Extend to a full history check", body: "When you're buying, take the same chassis number further into a full vehicle history report — title brands, odometer trail, accident records, theft and salvage data — so you know the car's past, not just its specification." },
    ],
    h2Means: "What Each Part of a Chassis Number Means",
    meansIntro: "A 17-character chassis number isn't random — it's a structured code. Knowing the segments tells you what the decoder is reading to identify the car type.",
    meansColPos: "Position", meansColSeg: "Segment", meansColDetail: "What it tells you",
    meansRows: [
      { pos: "1\u20133", seg: "WMI", detail: "World Manufacturer Identifier — the make and the country of origin. This is how the tool knows a car is, say, a German-built BMW or a US-built Ford." },
      { pos: "4\u20138", seg: "VDS", detail: "Vehicle Descriptor Section — model, body style, engine, and restraint system. This is the core of the 'car type' answer." },
      { pos: "9", seg: "Check digit", detail: "A calculated digit that validates the whole number. If it doesn't compute, the chassis number was mistyped or tampered with." },
      { pos: "10", seg: "Model year", detail: "A single character encoding the model year (e.g. the year a 2019 vs a 2003 was built). Letters skip I, O, Q, U, Z and the digit 0." },
      { pos: "11", seg: "Plant code", detail: "The specific assembly plant that built the vehicle — useful for verifying a build location on imports." },
      { pos: "12\u201317", seg: "Serial number", detail: "The unique production serial that makes this one vehicle different from every other of the same model." },
    ],
    meansFooterPre: "Want the deeper breakdown? See our ",
    meansFooterLink: "guide to reading a VIN",
    meansFooterSuffix: " — every rule applies identically to a chassis number.",
    h2Region: "What It's Called & Where to Find It — by Country",
    regionIntro: "The same 17-character code goes by different names and lives on different documents around the world. Here's where to look, wherever your car is registered.",
    regionColRegion: "Region", regionColTerm: "Term Used", regionColWhere: "Where to Find It", regionColDoc: "Document",
    regionRows: [
      { region: "United Kingdom & Ireland", term: "Chassis number / VIN", detail: "Printed on the V5C logbook (registration document). Also stamped on the chassis and shown through the windscreen. 17 characters on vehicles from 1981 onward.", doc: "V5C" },
      { region: "European Union", term: "Chassis number / VIN", detail: "Shown on the vehicle registration certificate (Part 1) and the manufacturer's plate. EU type-approval mandates a 17-character VIN to ISO 3779.", doc: "Reg. certificate" },
      { region: "Australia & New Zealand", term: "Chassis number / VIN", detail: "On the registration papers and a compliance/identification plate. Imports must carry a 17-character VIN to be registered; pre-1989 vehicles may have a shorter chassis number.", doc: "Rego papers" },
      { region: "India & South Asia", term: "Chassis number", detail: "Recorded on the RC (Registration Certificate) and stamped on the chassis. The chassis number and a separate engine number are both listed on the RC.", doc: "RC" },
      { region: "Middle East & Africa", term: "Chassis number", detail: "Used on the Mulkiya / registration card and the manufacturer's plate. Many vehicles are imports, so the WMI is useful for confirming country of origin.", doc: "Mulkiya / Reg. card" },
      { region: "North America (US & Canada)", term: "VIN", detail: "Called 'VIN' rather than chassis number. On the title/registration, the dashboard through the windscreen, and the door jamb. The deepest history records of any region.", doc: "Title" },
      { region: "Japan (JDM)", term: "Chassis number (\u8eca\u53f0\u756a\u53f7)", detail: "Domestic Japanese vehicles use a shorter model-code + serial chassis number, not the 17-character VIN. Export and grey-import vehicles are matched via auction sheets and export certificates.", doc: "Export certificate" },
    ],
    midCtaHeading: "Decode Your Chassis Number in Seconds",
    midCtaSub: "Free, instant car-type identification straight from the manufacturer's build record — make, model, year, body, and engine.",
    h2Match: "Always Match the Chassis Number Before You Buy",
    match1: "The chassis number is a vehicle's permanent identity, so it's the single best defence against fraud. A cloned or \u201Cringed\u201D car wears the identity of a legitimate vehicle to hide a stolen or write-off history — and the only way to catch it is to decode the chassis number and check that every copy matches.",
    match2: "Decode the number first to confirm the car type matches the advert. A chassis number that decodes to a different model, body, or year than the one in front of you is a stop-the-deal red flag. Then verify the same number on the document, the windscreen, the door jamb, and the engine bay all agree.",
    match3Pre: "When the specification checks out, take the chassis number into a full ",
    match3Link: "vehicle history check",
    match3Suffix: " to surface the records a decode alone can't — title brands, odometer rollback, accident damage, and theft markers.",
    redFlagsTitle: "Chassis number red flags",
    redFlags: [
      "Decoded car type doesn't match the advertised model or year",
      "The number contains an I, O, or Q (never valid)",
      "Document number differs from the number on the car",
      "Windscreen, door jamb, and engine-bay numbers disagree",
      "Plate looks re-riveted, scratched, or freshly painted",
      "Fewer than 17 characters on a post-1981 vehicle",
    ],
    redFlagsCheckNow: "Check a chassis number now:",
    h2Internal: "More Tools That Read Your Chassis Number",
    internalIntro: "The same 17 characters unlock every one of these checks.",
    internalLinks: [
      { href: "/vin-decoder", label: "VIN Decoder", desc: "The same decode, framed for North American 'VIN' searchers — specs, trim, and factory options." },
      { href: "/vin-check", label: "Full VIN History Check", desc: "Title, accident, odometer, recall, and ownership records tied to the chassis number." },
      { href: "/jdm-import-check", label: "JDM Import Check", desc: "For Japanese imports with a domestic chassis number — auction sheets and export records." },
      { href: "/motorcycle-vin-search", label: "Motorcycle Frame Number Search", desc: "Decode a motorcycle frame (chassis) number for make, model, and engine." },
      { href: "/recall-check", label: "Recall Check", desc: "Find open safety recalls registered against the chassis number." },
      { href: "/odometer-check", label: "Odometer Check", desc: "Verify the mileage trail recorded against this chassis number over time." },
      { href: "/stolen-vehicle-check", label: "Stolen Vehicle Check", desc: "Confirm the chassis number isn't flagged as stolen before you buy." },
      { href: "/window-sticker", label: "Window Sticker by VIN", desc: "Rebuild the original factory specification sheet from the chassis number." },
    ],
    h2Faq: "Chassis Number Lookup — Frequently Asked Questions",
    faqIntro: "Direct answers to what chassis-number searchers ask most.",
    bottomBadge: "Free · Instant · Worldwide",
    ctaBottomHeading: "Look Up Any Car by Its Chassis Number",
    ctaBottomSub: "Enter a 17-character chassis number to identify the car type and specification, then unlock the full title, mileage, and accident history.",
    ctaBottomNote: "No credit card · No sign-up · Free car type",
  },
  es: {
    home: "Inicio", crumb: "Búsqueda número de chasis",
    badge: "Número de chasis = VIN   ·   Funciona mundialmente",
    h1Lead: "Búsqueda número de chasis — ",
    h1Accent: "Encuentra el tipo de auto gratis",
    intro1: "Tu número de chasis ", introEm: "es", intro2: " tu VIN. Ingresa el código de 17 caracteres para decodificar la marca, modelo, año, carrocería y motor al instante — luego ve el historial completo. Ya sea que tu documento lo llame número de chasis, número de bastidor o VIN, esta es la única herramienta que lo lee.",
    formHeading: "Busca un auto por número de chasis",
    formSub: "Ingresa el número de chasis (VIN) de 17 caracteres — devolveremos el tipo de auto, especificación completa e historial",
    formNote: "Gratis · Sin registro · Tipo de auto al instante",
    trustStats: [
      { icon: Globe, value: "Mundial", label: "cualquier chasis de 17 car." },
      { icon: Hash, value: "17", label: "caracteres decodificados" },
      { icon: Zap, value: "Instantáneo", label: "sin registro" },
      { icon: BadgeCheck, value: "Gratis", label: "tipo de auto y specs" },
    ],
    h2Vs: "Número de chasis vs VIN — Son la misma cosa",
    vsIntroPre: "Esto confunde a los compradores a diario. La respuesta corta: en cualquier vehículo construido desde 1981, el ",
    vsIntroBold: "número de chasis y el VIN son uno y el mismo",
    vsIntroSuffix: " código de 17 caracteres. Solo el nombre cambia según el país.",
    chassisTag: "\u201CNúmero de chasis\u201D",
    chassisTitle: "Reino Unido · UE · Australia · India · Medio Oriente · África",
    chassisBullets: [
      "El término cotidiano en un V5C, RC o certificado de registro.",
      "Estampado en el chasis y mostrado en la placa de identificación del fabricante.",
      "17 caracteres bajo el estándar global ISO 3779.",
    ],
    vinTag: "\u201CVIN\u201D",
    vinTitle: "EE. UU. · Canadá (y el nombre técnico/legal en todas partes)",
    vinBullets: [
      "Número de Identificación del Vehículo — los mismos 17 caracteres.",
      "En el título, tablero y marco de la puerta.",
      "Estructura idéntica: WMI + descriptor + serial.",
    ],
    quickTestBold: "Prueba rápida:",
    quickTestBody: " cuenta los caracteres. Si son exactamente 17 sin las letras I, O o Q, es un número de chasis moderno (VIN) y la herramienta de arriba lo decodificará. Si es más corto, tienes un número de chasis anterior a 1981 o de mercado doméstico que necesita registros del fabricante en su lugar.",
    h2How: "Cómo buscar un auto por número de chasis — Paso a paso",
    howIntro: "Cinco pasos desde \u201C¿dónde está?\u201D hasta una identificación completa del tipo de auto e historial. Funciona para autos, vans, camiones y motocicletas con un número de chasis estándar de 17 caracteres.",
    stepWord: "Paso",
    howSteps: [
      { step: "01", title: "Encuentra tu número de chasis", body: "Vive en varios lugares: en el documento de registro (V5C en el Reino Unido, el certificado de registro en otros lados), a través de la parte inferior del parabrisas, en una placa de identificación en el cárter del motor, estampado en el riel del chasis o cortafuegos, y en la calcomanía del marco de la puerta del lado del conductor. Cada copia debe coincidir." },
      { step: "02", title: "Lee los 17 caracteres", body: "Los números de chasis modernos son exactamente de 17 caracteres. Cópialos con precisión — las letras I, O y Q nunca se usan, así que cualquier cosa que parezca una es realmente un 1 o un 0. Un solo carácter equivocado decodifica un vehículo diferente." },
      { step: "03", title: "Decodifícalo al instante", body: "Ingresa el número de chasis arriba. El decodificador lee el WMI (fabricante + país), la sección descriptora (modelo, carrocería, motor, restricciones), el carácter de año modelo y el código de planta — devolviendo el tipo de auto completo en segundos, gratis." },
      { step: "04", title: "Coincídelo con el listado o documento", body: "Confirma que la marca, modelo, año y carrocería decodificados coincidan con lo que afirma el vendedor o papeleo. Una discrepancia entre el tipo de auto decodificado y el vehículo anunciado es una bandera roja inmediata para un auto clonado o tergiversado." },
      { step: "05", title: "Extiende a una verificación de historial completo", body: "Cuando estás comprando, lleva el mismo número de chasis a un reporte completo de historial vehicular — marcas de título, rastro del odómetro, registros de accidentes, datos de robo y salvamento — para que conozcas el pasado del auto, no solo su especificación." },
    ],
    h2Means: "Qué significa cada parte de un número de chasis",
    meansIntro: "Un número de chasis de 17 caracteres no es aleatorio — es un código estructurado. Conocer los segmentos te dice lo que el decodificador está leyendo para identificar el tipo de auto.",
    meansColPos: "Posición", meansColSeg: "Segmento", meansColDetail: "Qué te dice",
    meansRows: [
      { pos: "1\u20133", seg: "WMI", detail: "Identificador Mundial del Fabricante — la marca y el país de origen. Así es como la herramienta sabe que un auto es, digamos, un BMW de fabricación alemana o un Ford de fabricación estadounidense." },
      { pos: "4\u20138", seg: "VDS", detail: "Sección Descriptora del Vehículo — modelo, estilo de carrocería, motor y sistema de restricciones. Este es el núcleo de la respuesta 'tipo de auto'." },
      { pos: "9", seg: "Dígito verificador", detail: "Un dígito calculado que valida todo el número. Si no cuadra, el número de chasis fue mal escrito o manipulado." },
      { pos: "10", seg: "Año modelo", detail: "Un solo carácter que codifica el año modelo (ej. el año en que se construyó un 2019 vs un 2003). Las letras omiten I, O, Q, U, Z y el dígito 0." },
      { pos: "11", seg: "Código de planta", detail: "La planta de ensamble específica que construyó el vehículo — útil para verificar una ubicación de construcción en importaciones." },
      { pos: "12\u201317", seg: "Número de serie", detail: "El serial de producción único que hace este vehículo diferente de cualquier otro del mismo modelo." },
    ],
    meansFooterPre: "¿Quieres el desglose más profundo? Ve nuestra ",
    meansFooterLink: "guía para leer un VIN",
    meansFooterSuffix: " — cada regla aplica idénticamente a un número de chasis.",
    h2Region: "Cómo se llama y dónde encontrarlo — por país",
    regionIntro: "El mismo código de 17 caracteres tiene diferentes nombres y vive en diferentes documentos alrededor del mundo. Aquí está dónde mirar, donde sea que tu auto esté registrado.",
    regionColRegion: "Región", regionColTerm: "Término usado", regionColWhere: "Dónde encontrarlo", regionColDoc: "Documento",
    regionRows: [
      { region: "Reino Unido e Irlanda", term: "Número de chasis / VIN", detail: "Impreso en el libro V5C (documento de registro). También estampado en el chasis y mostrado a través del parabrisas. 17 caracteres en vehículos desde 1981 en adelante.", doc: "V5C" },
      { region: "Unión Europea", term: "Número de chasis / VIN", detail: "Mostrado en el certificado de registro del vehículo (Parte 1) y la placa de identificación del fabricante. La homologación de la UE exige un VIN de 17 caracteres según ISO 3779.", doc: "Certif. de registro" },
      { region: "Australia y Nueva Zelanda", term: "Número de chasis / VIN", detail: "En los papeles de registro y una placa de cumplimiento/identificación. Las importaciones deben llevar un VIN de 17 caracteres para ser registradas; los vehículos anteriores a 1989 pueden tener un número de chasis más corto.", doc: "Papeles Rego" },
      { region: "India y Sur de Asia", term: "Número de chasis", detail: "Registrado en el RC (Certificado de Registro) y estampado en el chasis. El número de chasis y un número de motor separado están listados en el RC.", doc: "RC" },
      { region: "Medio Oriente y África", term: "Número de chasis", detail: "Usado en la Mulkiya / tarjeta de registro y la placa de identificación del fabricante. Muchos vehículos son importaciones, así que el WMI es útil para confirmar el país de origen.", doc: "Mulkiya / Tarj. reg." },
      { region: "Norteamérica (EE. UU. y Canadá)", term: "VIN", detail: "Llamado 'VIN' en lugar de número de chasis. En el título/registro, el tablero a través del parabrisas y el marco de la puerta. Los registros de historial más profundos de cualquier región.", doc: "Título" },
      { region: "Japón (JDM)", term: "Número de chasis (\u8eca\u53f0\u756a\u53f7)", detail: "Los vehículos domésticos japoneses usan un código de modelo + serial de chasis más corto, no el VIN de 17 caracteres. Los vehículos de exportación e importación gris se cotejan vía hojas de subasta y certificados de exportación.", doc: "Certif. de exportación" },
    ],
    midCtaHeading: "Decodifica tu número de chasis en segundos",
    midCtaSub: "Identificación gratis e instantánea del tipo de auto directamente desde el registro de construcción del fabricante — marca, modelo, año, carrocería y motor.",
    h2Match: "Siempre coincide el número de chasis antes de comprar",
    match1: "El número de chasis es la identidad permanente de un vehículo, así que es la mejor defensa contra el fraude. Un auto clonado o \u201Cringueado\u201D lleva la identidad de un vehículo legítimo para ocultar un historial robado o de pérdida total — y la única manera de atraparlo es decodificar el número de chasis y verificar que cada copia coincida.",
    match2: "Decodifica el número primero para confirmar que el tipo de auto coincida con el anuncio. Un número de chasis que decodifica a un modelo, carrocería o año diferente al que tienes frente a ti es una bandera roja para detener el trato. Luego verifica que el mismo número en el documento, el parabrisas, el marco de la puerta y el cárter del motor coincidan todos.",
    match3Pre: "Cuando la especificación cuadra, lleva el número de chasis a una ",
    match3Link: "verificación completa de historial vehicular",
    match3Suffix: " para mostrar los registros que una decodificación sola no puede — marcas de título, rollback del odómetro, daño por accidente y marcadores de robo.",
    redFlagsTitle: "Banderas rojas del número de chasis",
    redFlags: [
      "El tipo de auto decodificado no coincide con el modelo o año anunciado",
      "El número contiene una I, O o Q (nunca válido)",
      "El número del documento difiere del número en el auto",
      "Los números del parabrisas, marco de la puerta y cárter del motor no coinciden",
      "La placa de identificación se ve re-remachada, rayada o recién pintada",
      "Menos de 17 caracteres en un vehículo posterior a 1981",
    ],
    redFlagsCheckNow: "Verifica un número de chasis ahora:",
    h2Internal: "Más herramientas que leen tu número de chasis",
    internalIntro: "Los mismos 17 caracteres desbloquean cada una de estas verificaciones.",
    internalLinks: [
      { href: "/vin-decoder", label: "Decodificador VIN", desc: "La misma decodificación, enmarcada para buscadores norteamericanos de 'VIN' — specs, versión y opciones de fábrica." },
      { href: "/vin-check", label: "Verificación completa de historial VIN", desc: "Registros de título, accidente, odómetro, recall y propiedad vinculados al número de chasis." },
      { href: "/jdm-import-check", label: "Verificación importación JDM", desc: "Para importaciones japonesas con un número de chasis doméstico — hojas de subasta y registros de exportación." },
      { href: "/motorcycle-vin-search", label: "Búsqueda número de bastidor de motocicleta", desc: "Decodifica un número de bastidor (chasis) de motocicleta para marca, modelo y motor." },
      { href: "/recall-check", label: "Verificación de recalls", desc: "Encuentra recalls de seguridad abiertos registrados contra el número de chasis." },
      { href: "/odometer-check", label: "Verificación odómetro", desc: "Verifica el rastro de kilometraje registrado contra este número de chasis a lo largo del tiempo." },
      { href: "/stolen-vehicle-check", label: "Verificación vehículo robado", desc: "Confirma que el número de chasis no esté marcado como robado antes de comprar." },
      { href: "/window-sticker", label: "Window Sticker por VIN", desc: "Reconstruye la hoja original de especificación de fábrica desde el número de chasis." },
    ],
    h2Faq: "Búsqueda número de chasis — Preguntas frecuentes",
    faqIntro: "Respuestas directas a lo que más preguntan los buscadores de números de chasis.",
    bottomBadge: "Gratis · Instantáneo · Mundial",
    ctaBottomHeading: "Busca cualquier auto por su número de chasis",
    ctaBottomSub: "Ingresa un número de chasis de 17 caracteres para identificar el tipo de auto y especificación, luego desbloquea el historial completo de título, kilometraje y accidentes.",
    ctaBottomNote: "Sin tarjeta de crédito · Sin registro · Tipo de auto gratis",
  },
  fr: {
    home: "Accueil", crumb: "Recherche numéro de châssis",
    badge: "Numéro de châssis = VIN   ·   Fonctionne mondialement",
    h1Lead: "Recherche numéro de châssis — ",
    h1Accent: "Trouve le type de voiture gratuitement",
    intro1: "Ton numéro de châssis ", introEm: "est", intro2: " ton VIN. Saisis le code de 17 caractères pour décoder la marque, le modèle, l'année, la carrosserie et le moteur instantanément — puis vois l'historique complet. Que ton document l'appelle numéro de châssis, numéro de cadre ou VIN, c'est le seul outil qui le lit.",
    formHeading: "Recherche une voiture par numéro de châssis",
    formSub: "Saisis le numéro de châssis (VIN) de 17 caractères — nous renverrons le type de voiture, la spécification complète et l'historique",
    formNote: "Gratuit · Sans inscription · Type de voiture instantané",
    trustStats: [
      { icon: Globe, value: "Mondial", label: "tout châssis de 17 car." },
      { icon: Hash, value: "17", label: "caractères décodés" },
      { icon: Zap, value: "Instantané", label: "sans inscription" },
      { icon: BadgeCheck, value: "Gratuit", label: "type de voiture et specs" },
    ],
    h2Vs: "Numéro de châssis vs VIN — Ils sont la même chose",
    vsIntroPre: "Cela trompe les acheteurs tous les jours. La réponse courte : sur tout véhicule construit depuis 1981, le ",
    vsIntroBold: "numéro de châssis et le VIN sont un seul et même",
    vsIntroSuffix: " code de 17 caractères. Seul le nom change selon le pays.",
    chassisTag: "\u201CNuméro de châssis\u201D",
    chassisTitle: "Royaume-Uni · UE · Australie · Inde · Moyen-Orient · Afrique",
    chassisBullets: [
      "Le terme quotidien sur un V5C, RC ou certificat d'immatriculation.",
      "Estampillé sur le châssis et indiqué sur la plaque du constructeur.",
      "17 caractères selon la norme mondiale ISO 3779.",
    ],
    vinTag: "\u201CVIN\u201D",
    vinTitle: "USA · Canada (et le nom technique/légal partout)",
    vinBullets: [
      "Vehicle Identification Number — les mêmes 17 caractères.",
      "Sur le titre, le tableau de bord et le montant de porte.",
      "Structure identique : WMI + descripteur + numéro de série.",
    ],
    quickTestBold: "Test rapide :",
    quickTestBody: " compte les caractères. S'il y en a exactement 17 sans les lettres I, O ou Q, c'est un numéro de châssis moderne (VIN) et l'outil ci-dessus le décodera. S'il est plus court, tu as un numéro de châssis d'avant 1981 ou de marché national qui nécessite plutôt les registres du constructeur.",
    h2How: "Comment rechercher une voiture par numéro de châssis — étape par étape",
    howIntro: "Cinq étapes depuis \u201Coù est-il ?\u201D jusqu'à une identification complète du type de voiture et de l'historique. Fonctionne pour les voitures, fourgons, camions et motos avec un numéro de châssis standard de 17 caractères.",
    stepWord: "Étape",
    howSteps: [
      { step: "01", title: "Trouve ton numéro de châssis", body: "Il vit à plusieurs endroits : sur le document d'immatriculation (V5C au Royaume-Uni, le certificat d'immatriculation ailleurs), à travers le bas du pare-brise, sur une plaque dans le compartiment moteur, estampillé sur le longeron du châssis ou le tablier, et sur l'autocollant du montant de porte côté conducteur. Chaque copie doit correspondre." },
      { step: "02", title: "Lis les 17 caractères", body: "Les numéros de châssis modernes sont exactement de 17 caractères. Copie-les précisément — les lettres I, O et Q ne sont jamais utilisées, donc tout ce qui ressemble à l'une d'elles est en réalité un 1 ou un 0. Un seul caractère erroné décode un véhicule différent." },
      { step: "03", title: "Décode-le instantanément", body: "Saisis le numéro de châssis ci-dessus. Le décodeur lit le WMI (constructeur + pays), la section descripteur (modèle, carrosserie, moteur, dispositifs de retenue), le caractère de l'année modèle et le code d'usine — renvoyant le type complet de voiture en quelques secondes, gratuitement." },
      { step: "04", title: "Fais-le correspondre à l'annonce ou au document", body: "Confirme que la marque, le modèle, l'année et la carrosserie décodés correspondent à ce que le vendeur ou le papier prétend. Une discordance entre le type de voiture décodé et le véhicule annoncé est un signal d'alarme immédiat pour une voiture clonée ou faussement représentée." },
      { step: "05", title: "Étends à une vérification d'historique complète", body: "Quand tu achètes, prends le même numéro de châssis plus loin dans un rapport d'historique véhicule complet — marques de titre, traces d'odomètre, registres d'accidents, données de vol et d'épave — pour connaître le passé de la voiture, pas seulement sa spécification." },
    ],
    h2Means: "Ce que signifie chaque partie d'un numéro de châssis",
    meansIntro: "Un numéro de châssis de 17 caractères n'est pas aléatoire — c'est un code structuré. Connaître les segments te dit ce que le décodeur lit pour identifier le type de voiture.",
    meansColPos: "Position", meansColSeg: "Segment", meansColDetail: "Ce qu'il te dit",
    meansRows: [
      { pos: "1\u20133", seg: "WMI", detail: "Identifiant Mondial du Constructeur — la marque et le pays d'origine. C'est ainsi que l'outil sait qu'une voiture est, disons, une BMW construite en Allemagne ou une Ford construite aux États-Unis." },
      { pos: "4\u20138", seg: "VDS", detail: "Vehicle Descriptor Section — modèle, style de carrosserie, moteur et système de retenue. C'est le cœur de la réponse 'type de voiture'." },
      { pos: "9", seg: "Chiffre de contrôle", detail: "Un chiffre calculé qui valide le numéro entier. S'il ne se calcule pas, le numéro de châssis a été mal tapé ou trafiqué." },
      { pos: "10", seg: "Année modèle", detail: "Un seul caractère encodant l'année modèle (ex. l'année où une 2019 vs une 2003 a été construite). Les lettres sautent I, O, Q, U, Z et le chiffre 0." },
      { pos: "11", seg: "Code d'usine", detail: "L'usine d'assemblage spécifique qui a construit le véhicule — utile pour vérifier un lieu de construction sur les imports." },
      { pos: "12\u201317", seg: "Numéro de série", detail: "Le numéro de série de production unique qui rend ce véhicule différent de tous les autres du même modèle." },
    ],
    meansFooterPre: "Tu veux la décomposition plus approfondie ? Vois notre ",
    meansFooterLink: "guide pour lire un VIN",
    meansFooterSuffix: " — chaque règle s'applique identiquement à un numéro de châssis.",
    h2Region: "Comment on l'appelle et où le trouver — par pays",
    regionIntro: "Le même code de 17 caractères porte différents noms et vit sur différents documents à travers le monde. Voici où regarder, où que ta voiture soit immatriculée.",
    regionColRegion: "Région", regionColTerm: "Terme utilisé", regionColWhere: "Où le trouver", regionColDoc: "Document",
    regionRows: [
      { region: "Royaume-Uni et Irlande", term: "Numéro de châssis / VIN", detail: "Imprimé sur le carnet V5C (document d'immatriculation). Aussi estampillé sur le châssis et visible à travers le pare-brise. 17 caractères sur les véhicules à partir de 1981.", doc: "V5C" },
      { region: "Union européenne", term: "Numéro de châssis / VIN", detail: "Indiqué sur le certificat d'immatriculation du véhicule (Partie 1) et la plaque du constructeur. La réception par type de l'UE impose un VIN de 17 caractères selon ISO 3779.", doc: "Certif. immatricul." },
      { region: "Australie et Nouvelle-Zélande", term: "Numéro de châssis / VIN", detail: "Sur les papiers d'immatriculation et une plaque de conformité/identification. Les imports doivent porter un VIN de 17 caractères pour être immatriculés ; les véhicules d'avant 1989 peuvent avoir un numéro de châssis plus court.", doc: "Papiers Rego" },
      { region: "Inde et Asie du Sud", term: "Numéro de châssis", detail: "Enregistré sur le RC (Registration Certificate) et estampillé sur le châssis. Le numéro de châssis et un numéro de moteur distinct sont tous deux listés sur le RC.", doc: "RC" },
      { region: "Moyen-Orient et Afrique", term: "Numéro de châssis", detail: "Utilisé sur la Mulkiya / carte d'immatriculation et la plaque du constructeur. Beaucoup de véhicules sont des imports, donc le WMI est utile pour confirmer le pays d'origine.", doc: "Mulkiya / Carte immat." },
      { region: "Amérique du Nord (USA et Canada)", term: "VIN", detail: "Appelé 'VIN' plutôt que numéro de châssis. Sur le titre/immatriculation, le tableau de bord à travers le pare-brise et le montant de porte. Les registres d'historique les plus profonds de toute région.", doc: "Titre" },
      { region: "Japon (JDM)", term: "Numéro de châssis (\u8eca\u53f0\u756a\u53f7)", detail: "Les véhicules japonais domestiques utilisent un numéro de châssis plus court de type code-modèle + série, pas le VIN de 17 caractères. Les véhicules d'exportation et d'import gris sont recoupés via les feuilles d'enchère et les certificats d'exportation.", doc: "Certif. exportation" },
    ],
    midCtaHeading: "Décode ton numéro de châssis en quelques secondes",
    midCtaSub: "Identification gratuite et instantanée du type de voiture directement depuis le registre de fabrication du constructeur — marque, modèle, année, carrosserie et moteur.",
    h2Match: "Fais toujours correspondre le numéro de châssis avant d'acheter",
    match1: "Le numéro de châssis est l'identité permanente d'un véhicule, c'est donc la meilleure défense unique contre la fraude. Une voiture clonée ou \u201Cringée\u201D porte l'identité d'un véhicule légitime pour cacher un historique de vol ou d'épave — et la seule façon de l'attraper est de décoder le numéro de châssis et de vérifier que chaque copie correspond.",
    match2: "Décode d'abord le numéro pour confirmer que le type de voiture correspond à l'annonce. Un numéro de châssis qui décode vers un modèle, une carrosserie ou une année différent de celui devant toi est un signal d'alarme stop-the-deal. Puis vérifie que le même numéro sur le document, le pare-brise, le montant de porte et le compartiment moteur sont tous d'accord.",
    match3Pre: "Quand la spécification se vérifie, prends le numéro de châssis dans une ",
    match3Link: "vérification d'historique véhicule",
    match3Suffix: " complète pour faire ressortir les registres qu'un décodage seul ne peut pas — marques de titre, recul d'odomètre, dommages d'accident et marqueurs de vol.",
    redFlagsTitle: "Signaux d'alarme du numéro de châssis",
    redFlags: [
      "Le type de voiture décodé ne correspond pas au modèle ou à l'année annoncés",
      "Le numéro contient un I, O ou Q (jamais valide)",
      "Le numéro du document diffère du numéro sur la voiture",
      "Les numéros du pare-brise, du montant de porte et du compartiment moteur ne concordent pas",
      "La plaque a l'air re-rivetée, rayée ou fraîchement peinte",
      "Moins de 17 caractères sur un véhicule postérieur à 1981",
    ],
    redFlagsCheckNow: "Vérifie un numéro de châssis maintenant :",
    h2Internal: "Plus d'outils qui lisent ton numéro de châssis",
    internalIntro: "Les mêmes 17 caractères déverrouillent chacune de ces vérifications.",
    internalLinks: [
      { href: "/vin-decoder", label: "Décodeur VIN", desc: "Le même décodage, encadré pour les chercheurs nord-américains de 'VIN' — specs, version et options d'usine." },
      { href: "/vin-check", label: "Vérification complète d'historique VIN", desc: "Registres de titre, accident, odomètre, rappel et propriété liés au numéro de châssis." },
      { href: "/jdm-import-check", label: "Vérification import JDM", desc: "Pour les imports japonaises avec un numéro de châssis domestique — feuilles d'enchère et registres d'exportation." },
      { href: "/motorcycle-vin-search", label: "Recherche numéro de cadre de moto", desc: "Décode un numéro de cadre (châssis) de moto pour la marque, le modèle et le moteur." },
      { href: "/recall-check", label: "Vérification des rappels", desc: "Trouve les rappels de sécurité ouverts enregistrés contre le numéro de châssis." },
      { href: "/odometer-check", label: "Vérification odomètre", desc: "Vérifie la trace de kilométrage enregistrée contre ce numéro de châssis au fil du temps." },
      { href: "/stolen-vehicle-check", label: "Vérification véhicule volé", desc: "Confirme que le numéro de châssis n'est pas signalé comme volé avant d'acheter." },
      { href: "/window-sticker", label: "Window Sticker par VIN", desc: "Reconstruis la feuille originale de spécification d'usine à partir du numéro de châssis." },
    ],
    h2Faq: "Recherche numéro de châssis — Questions fréquentes",
    faqIntro: "Réponses directes à ce que demandent le plus souvent les chercheurs de numéro de châssis.",
    bottomBadge: "Gratuit · Instantané · Mondial",
    ctaBottomHeading: "Recherche n'importe quelle voiture par son numéro de châssis",
    ctaBottomSub: "Saisis un numéro de châssis de 17 caractères pour identifier le type de voiture et la spécification, puis déverrouille l'historique complet de titre, kilométrage et accidents.",
    ctaBottomNote: "Pas de carte de crédit · Sans inscription · Type de voiture gratuit",
  },
} as const;

const FAQS_EN = [
  { question: "Is a chassis number the same as a VIN?", answer: "Yes. 'Chassis number' is the term used across the UK, Europe, Australia, India, the Middle East, Africa, and much of Asia for what North America calls the VIN (Vehicle Identification Number). On vehicles built after 1981 it is the same 17-character alphanumeric code. Older vehicles and some markets used shorter chassis numbers, but the modern standard is identical worldwide." },
  { question: "How do I search a car by chassis number?", answer: "Enter the full 17-character chassis number into the lookup tool above and we decode it instantly. The result shows the car type, make, model, year, body style, engine, manufacturing plant, and — where records exist — title, mileage, and accident history. There is no sign-up to decode the specs." },
  { question: "Where do I find my chassis number?", answer: "The chassis number appears in several places: on the vehicle registration document (V5C in the UK, registration certificate elsewhere), on a metal plate in the engine bay, stamped on the chassis rail or firewall, on a sticker in the driver-side door jamb, and visible through the lower corner of the windscreen on most modern cars. All copies should match — a mismatch is a fraud red flag." },
  { question: "Can I look up a car type by chassis number for free?", answer: "Yes. Decoding the chassis number to reveal the car type, make, model, year, body, and engine is completely free and instant — no account needed. A fuller history report (title brands, odometer trail, accident and theft records) is available as a paid add-on, but the core vehicle identification is free." },
  { question: "What can a chassis number tell me about a car?", answer: "A 17-character chassis number is structured: the first three characters (WMI) identify the manufacturer and country of origin, characters 4–8 (VDS) describe the model, body style, engine, and restraint system, the 9th is a check digit, the 10th encodes the model year, the 11th is the assembly plant, and the last six are the unique serial number. Decoding it reveals the exact car type and specification." },
  { question: "My chassis number is shorter than 17 characters — why?", answer: "Vehicles manufactured before 1981 (and some classic, kit, or grey-import vehicles) often have a shorter, non-standard chassis number that predates the 17-character ISO 3779 VIN standard. These cannot be decoded automatically and usually require manufacturer-specific records or a classic-vehicle club to interpret. For any vehicle from 1981 onward, the chassis number should be a full 17 characters." },
  { question: "Is a chassis number the same as the engine number or frame number?", answer: "No. The chassis number (VIN) identifies the whole vehicle and is the one used for registration, history, and recalls. The engine number is stamped on the engine block and identifies that specific engine — it can change if the engine is replaced. 'Frame number' is another name for the chassis number on body-on-frame vehicles and motorcycles. Always use the chassis number (VIN) for a history lookup." },
  { question: "Can I find a vehicle's owner from the chassis number?", answer: "No. Owner identity is personal data protected by privacy law (the DPPA in the US and equivalent regulations elsewhere) and is never returned by a chassis number lookup. What you can legally retrieve is the vehicle's specification and, where available, its title, mileage, accident, and theft history — the records that matter when buying a used car." },
  { question: "Does a chassis number lookup work for imported cars?", answer: "Yes, if the import carries a standard 17-character chassis number. Decoding the WMI reveals the country of manufacture, which is useful for verifying a grey import or JDM vehicle. History data depth varies by country of origin — North American records are the deepest. For Japanese imports, pair the chassis number with a JDM import check for auction and export records." },
  { question: "What letters are never used in a chassis number?", answer: "The letters I, O, and Q are never used in a 17-character chassis number, because they are too easily confused with the numbers 1 and 0. If your chassis number appears to contain one of these letters, look again — it is almost certainly a 1 or a 0. This rule is a quick way to spot a transcription error or a faked plate." },
  { question: "Why does the same chassis number show on the V5C and the car?", answer: "Because the chassis number is the vehicle's permanent identity, it is printed on the registration document and physically stamped or plated on the car so the two can be matched. When buying, always confirm the chassis number on the document matches every copy on the vehicle. A mismatch can indicate a cloned, ringed, or stolen car — verify it with a free chassis number check before paying." },
];

const FAQS_ES = [
  { question: "¿Un número de chasis es lo mismo que un VIN?", answer: "Sí. 'Número de chasis' es el término usado en el Reino Unido, Europa, Australia, India, Medio Oriente, África y gran parte de Asia para lo que Norteamérica llama VIN (Número de Identificación del Vehículo). En vehículos construidos después de 1981 es el mismo código alfanumérico de 17 caracteres. Los vehículos más antiguos y algunos mercados usaron números de chasis más cortos, pero el estándar moderno es idéntico mundialmente." },
  { question: "¿Cómo busco un auto por número de chasis?", answer: "Ingresa el número de chasis completo de 17 caracteres en la herramienta de búsqueda de arriba y lo decodificamos al instante. El resultado muestra el tipo de auto, marca, modelo, año, estilo de carrocería, motor, planta de fabricación y — donde existen registros — título, kilometraje e historial de accidentes. No hay registro para decodificar las especificaciones." },
  { question: "¿Dónde encuentro mi número de chasis?", answer: "El número de chasis aparece en varios lugares: en el documento de registro del vehículo (V5C en el Reino Unido, certificado de registro en otros lados), en una placa metálica en el cárter del motor, estampado en el riel del chasis o cortafuegos, en una calcomanía en el marco de la puerta del lado del conductor y visible a través de la esquina inferior del parabrisas en la mayoría de los autos modernos. Todas las copias deben coincidir — una discrepancia es una bandera roja de fraude." },
  { question: "¿Puedo buscar un tipo de auto por número de chasis gratis?", answer: "Sí. Decodificar el número de chasis para revelar el tipo de auto, marca, modelo, año, carrocería y motor es completamente gratis e instantáneo — no se necesita cuenta. Un reporte de historial más completo (marcas de título, rastro del odómetro, registros de accidentes y robo) está disponible como complemento pagado, pero la identificación central del vehículo es gratis." },
  { question: "¿Qué puede decirme un número de chasis sobre un auto?", answer: "Un número de chasis de 17 caracteres está estructurado: los primeros tres caracteres (WMI) identifican al fabricante y país de origen, los caracteres 4-8 (VDS) describen el modelo, estilo de carrocería, motor y sistema de restricciones, el 9° es un dígito verificador, el 10° codifica el año modelo, el 11° es la planta de ensamble y los últimos seis son el número de serie único. Decodificarlo revela el tipo de auto exacto y especificación." },
  { question: "Mi número de chasis es más corto de 17 caracteres — ¿por qué?", answer: "Los vehículos fabricados anteriores a 1981 (y algunos vehículos clásicos, kit o de importación gris) a menudo tienen un número de chasis más corto y no estándar que precede al estándar VIN ISO 3779 de 17 caracteres. Estos no pueden decodificarse automáticamente y usualmente requieren registros específicos del fabricante o un club de vehículos clásicos para interpretar. Para cualquier vehículo desde 1981 en adelante, el número de chasis debe ser de 17 caracteres completos." },
  { question: "¿Un número de chasis es lo mismo que el número de motor o número de bastidor?", answer: "No. El número de chasis (VIN) identifica todo el vehículo y es el usado para registro, historial y recalls. El número de motor está estampado en el bloque del motor e identifica ese motor específico — puede cambiar si se reemplaza el motor. 'Número de bastidor' es otro nombre para el número de chasis en vehículos de carrocería sobre bastidor y motocicletas. Siempre usa el número de chasis (VIN) para una búsqueda de historial." },
  { question: "¿Puedo encontrar al dueño de un vehículo desde el número de chasis?", answer: "No. La identidad del dueño es datos personales protegidos por la ley de privacidad (la DPPA en EE. UU. y regulaciones equivalentes en otros lados) y nunca se devuelve en una búsqueda de número de chasis. Lo que puedes recuperar legalmente es la especificación del vehículo y, donde esté disponible, su historial de título, kilometraje, accidente y robo — los registros que importan al comprar un auto usado." },
  { question: "¿Una búsqueda de número de chasis funciona para autos importados?", answer: "Sí, si la importación lleva un número de chasis estándar de 17 caracteres. Decodificar el WMI revela el país de fabricación, lo cual es útil para verificar una importación gris o vehículo JDM. La profundidad de datos de historial varía según el país de origen — los registros norteamericanos son los más profundos. Para importaciones japonesas, combina el número de chasis con una verificación de importación JDM para registros de subasta y exportación." },
  { question: "¿Qué letras nunca se usan en un número de chasis?", answer: "Las letras I, O y Q nunca se usan en un número de chasis de 17 caracteres, porque se confunden muy fácilmente con los números 1 y 0. Si tu número de chasis parece contener una de estas letras, mira de nuevo — es casi seguramente un 1 o un 0. Esta regla es una manera rápida de detectar un error de transcripción o una placa falsificada." },
  { question: "¿Por qué el mismo número de chasis aparece en el V5C y el auto?", answer: "Porque el número de chasis es la identidad permanente del vehículo, está impreso en el documento de registro y físicamente estampado o en placa en el auto para que ambos puedan coincidir. Al comprar, siempre confirma que el número de chasis en el documento coincida con cada copia en el vehículo. Una discrepancia puede indicar un auto clonado, ringueado o robado — verifícalo con una búsqueda de número de chasis gratis antes de pagar." },
];

interface Props { locale: Locale; }

export default function ChassisNumberLookupBody({ locale }: Props) {
  const c = COPY[locale];
  const faqs = locale === "es" ? FAQS_ES : FAQS_EN;
  const link = (en: string) => (locale === "es" ? `/es${en}` : en);

  return (
    <article className="pb-16 bg-surface">
      <div className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
          <Breadcrumbs items={[{ label: c.home, href: locale === "es" ? "/es" : "/" }, { label: c.crumb }]} onDark />

          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <Globe className="w-4 h-4" /> {c.badge}
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
            {c.h1Lead}
            <span style={{ color: "var(--color-secondary-container)" }}>{c.h1Accent}</span>
          </h1>

          <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
            {c.intro1}<em>{c.introEm}</em>{c.intro2}
          </p>

          <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
            <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">{c.formHeading}</h2>
            <p className="text-xs sm:text-sm text-on-surface-variant mb-4">{c.formSub}</p>
            <VinSearchForm size="lg" />
            <p className="mt-3 text-[11px] text-slate-400 flex items-center gap-1.5">
              <Lock className="w-3 h-3" /> {c.formNote}
            </p>
          </div>

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
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Vs}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">
            {c.vsIntroPre}<strong>{c.vsIntroBold}</strong>{c.vsIntroSuffix}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
              <div className="text-[11px] font-black uppercase tracking-wider text-on-surface-variant mb-2">{c.chassisTag}</div>
              <p className="text-lg font-headline font-extrabold text-on-surface mb-3">{c.chassisTitle}</p>
              <ul className="space-y-2 text-sm text-on-surface-variant">
                {c.chassisBullets.map((b) => (
                  <li key={b} className="flex gap-2"><span>·</span><span>{b}</span></li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5 sm:p-6">
              <div className="text-[11px] font-black uppercase tracking-wider text-primary mb-2">{c.vinTag}</div>
              <p className="text-lg font-headline font-extrabold text-primary mb-3">{c.vinTitle}</p>
              <ul className="space-y-2 text-sm text-on-surface-variant">
                {c.vinBullets.map((b) => (
                  <li key={b} className="flex gap-2"><span>·</span><span>{b}</span></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-6 rounded-2xl bg-secondary-container/40 border border-outline-variant p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
              <p className="text-sm text-on-surface leading-relaxed">
                <strong className="text-on-surface">{c.quickTestBold}</strong>{c.quickTestBody}
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
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Means}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl">{c.meansIntro}</p>
          <div className="overflow-x-auto rounded-2xl border border-outline-variant">
            <table className="w-full border-collapse min-w-[640px] text-sm">
              <thead className="bg-surface-container-low">
                <tr>
                  <th className="p-4 text-left font-headline font-extrabold text-primary">{c.meansColPos}</th>
                  <th className="p-4 text-left font-headline font-extrabold text-primary">{c.meansColSeg}</th>
                  <th className="p-4 text-left font-headline font-extrabold text-primary">{c.meansColDetail}</th>
                </tr>
              </thead>
              <tbody>
                {c.meansRows.map((row) => (
                  <tr key={row.pos} className="border-t border-outline-variant/60 align-top">
                    <td className="p-4">
                      <code className="font-mono text-xs bg-surface-container-low rounded px-2 py-1 text-primary">{row.pos}</code>
                    </td>
                    <td className="p-4 font-bold text-on-surface whitespace-nowrap">{row.seg}</td>
                    <td className="p-4 text-on-surface-variant leading-relaxed">{row.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-on-surface-variant">
            {c.meansFooterPre}
            <Link href={link("/guides/how-to-read-a-vin")} className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.meansFooterLink}</Link>
            {c.meansFooterSuffix}
          </p>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Region}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl">{c.regionIntro}</p>
          <div className="overflow-x-auto rounded-2xl border border-outline-variant">
            <table className="w-full border-collapse min-w-[680px] text-sm">
              <thead className="bg-surface-container-low">
                <tr>
                  <th className="p-4 text-left font-headline font-extrabold text-primary">{c.regionColRegion}</th>
                  <th className="p-4 text-left font-headline font-extrabold text-primary">{c.regionColTerm}</th>
                  <th className="p-4 text-left font-headline font-extrabold text-primary">{c.regionColWhere}</th>
                  <th className="p-4 text-left font-headline font-extrabold text-primary">{c.regionColDoc}</th>
                </tr>
              </thead>
              <tbody>
                {c.regionRows.map((row) => (
                  <tr key={row.region} className="border-t border-outline-variant/60 align-top">
                    <td className="p-4 font-bold text-on-surface">{row.region}</td>
                    <td className="p-4 text-on-surface-variant whitespace-nowrap">{row.term}</td>
                    <td className="p-4 text-on-surface-variant leading-relaxed">{row.detail}</td>
                    <td className="p-4">
                      <code className="font-mono text-xs bg-surface-container-low rounded px-2 py-1 text-primary whitespace-nowrap">{row.doc}</code>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="py-10">
          <div className="rounded-3xl bg-primary p-7 sm:p-10 text-center">
            <Car className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">{c.midCtaHeading}</h2>
            <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">{c.midCtaSub}</p>
            <div className="max-w-xl mx-auto bg-white rounded-2xl p-4 sm:p-5">
              <VinSearchForm size="lg" />
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{c.h2Match}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>{c.match1}</p>
              <p>{c.match2}</p>
              <p>
                {c.match3Pre}
                <Link href={link("/vin-check")} className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.match3Link}</Link>
                {c.match3Suffix}
              </p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Wrench className="w-5 h-5 text-primary" />
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
              <div className="mt-5 rounded-xl bg-white p-4 border border-outline-variant">
                <p className="text-xs font-bold text-on-surface mb-2">{c.redFlagsCheckNow}</p>
                <VinSearchForm size="sm" />
              </div>
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
          <div className="max-w-xl mx-auto bg-surface-container-low rounded-2xl p-5 border border-outline-variant">
            <VinSearchForm size="lg" />
          </div>
          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-on-surface-variant">
            <Check className="w-3.5 h-3.5 text-green-500" strokeWidth={3} />
            {c.ctaBottomNote}
          </div>
        </section>

        <RelatedChecks exclude="/chassis-number-lookup" />
      </div>
    </article>
  );
}

export { FAQS_EN, FAQS_ES, FAQS_FR };

// Wave 19 — French uses the Spanish FAQ array as a structural fallback.
// The user-visible FAQ component already uses the locale="fr" branch in COPY;
// this alias only feeds the JSON-LD FAQPage schema until /fr metadata is translated.
const FAQS_FR = FAQS_ES;
