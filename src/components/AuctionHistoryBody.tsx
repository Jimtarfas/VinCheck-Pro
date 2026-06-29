import Link from "@/components/LocaleLink";
import {
  Check, FileText, AlertCircle, Clock, Camera, Gavel, ChevronRight,
  Star, Lock, Zap, BadgeCheck, Building2, Gauge,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import type { Locale } from "@/i18n/config";

interface Faq { question: string; answer: string; }

const COPY = {
  en: {
    crumbs: { home: "Home", current: "Auction History" },
    badge: "Copart \u00b7 IAA \u00b7 Dealer Auctions",
    h1Lead: "VIN Auction History \u2014 ",
    h1Accent: "Salvage & Dealer Records",
    lede: "CarCheckerVIN's free auction history check queries Copart, IAA, Manheim, ADESA, and NMVTIS salvage records to surface salvage and dealer auction appearances, sale dates, damage codes, odometer at sale, run-and-drive status, and pre-repair auction photos for any 17-character VIN. As an NMVTIS-approved data provider, CarCheckerVIN returns the same auction trail insurers and lenders use to value a vehicle. Find out if a vehicle passed through a salvage or dealer auction. See sale dates, damage codes, odometer at sale, run-and-drive status, and the original pre-repair auction photos for any VIN. Free preview, no credit card, results in under 5 seconds.",
    formH2: "Check Auction History by VIN",
    formSub: "Enter any 17-character VIN \u2014 cars, trucks, motorcycles, RVs",
    formNote: "256-bit encrypted \u00b7 DPPA compliant \u00b7 No personal data stored",
    trustStats: [
      { value: "Salvage", label: "+ dealer auction records" },
      { value: "Photos", label: "pre-repair, when available" },
      { value: "< 5 sec", label: "average report time" },
      { value: "Free preview", label: "no credit card needed" },
    ],
    statsH2: "VIN Auction History \u2014 By the Numbers",
    headlineStats: [
      { value: "Copart + IAA", label: "Salvage auction houses cross-referenced" },
      { value: "7 fields", label: "Captured per auction event" },
      { value: "Photos", label: "Pre-repair images shown when on file" },
      { value: "<5 sec", label: "Average VIN decode time" },
      { value: "$0", label: "Cost for the free preview" },
    ],
    whyH2: "Why Auction History Is the Record Sellers Hope You Skip",
    why: {
      p1Pre: "When an insurer declares a vehicle a total loss, it usually heads to a salvage auction, most often ",
      copart: "Copart",
      p1Mid: " or ",
      iaa: "IAA (Insurance Auto Auctions)",
      p1Suf: ". There it is photographed from every angle and tagged with its damage type, condition, and mileage ",
      p1Strong: "before anyone repairs it",
      p1End: ". That snapshot is the closest thing to ground truth about a damaged car.",
      p2Pre: "The problem for buyers is what happens next. A rebuilder can purchase the car, do cosmetic work, move it to a state with looser titling rules, and resell it with a title that looks clean. The current photos look fine. The seller says nothing. The only durable evidence of the total loss is the ",
      p2Strong: "auction record",
      p2End: " attached to the VIN: the sale date, the damage code, and the intake photos that no amount of bodywork can erase from history.",
      p3: "A VIN auction history check surfaces exactly that. It tells you whether a car was sold for salvage, what was wrong with it, how many miles it showed at the time, and whether it could even run, so you can compare the auction reality against the glossy listing in front of you.",
    },
    fieldsH2: "What Each Auction Record Shows",
    fieldsSub: "For every auction event on file, the report captures the data that matters for a buying decision.",
    recordFields: [
      { title: "Auction House & Location", desc: "Which auction sold the vehicle (Copart, IAA, and others) and the physical sale yard location." },
      { title: "Sale Date & Result", desc: "When the vehicle crossed the block and whether it sold, was a no-sale, or was relisted." },
      { title: "Damage Description", desc: "Primary and secondary damage as recorded by the auction: front-end, flood, theft-recovery, hail, and more." },
      { title: "Condition / Run Status", desc: "Operability notes such as run-and-drive, starts, or enhanced, giving a quick read on how functional the car was at sale." },
      { title: "Odometer at Sale", desc: "The mileage recorded at auction, an independent checkpoint for spotting odometer rollback." },
      { title: "Original Auction Photos", desc: "Intake photos taken before any repair, the clearest evidence of the vehicle's true pre-sale condition." },
    ],
    compareH2: "Salvage Auctions vs. Dealer Auctions",
    compareSub: "Not every auction record is a warning. Knowing which type of sale you are looking at is the difference between a routine wholesale trade and a hidden total loss.",
    salvageCard: {
      title: "Salvage Auctions \u2014 Copart, IAA",
      body: "Sell insurance total-loss, theft-recovery, flood, and heavily damaged vehicles, mostly to rebuilders, dismantlers, and exporters.",
      bullets: [
        "Almost always tied to a total loss or branded title",
        "Detailed damage codes and pre-repair photos",
        "A strong signal to inspect before buying",
      ],
    },
    dealerCard: {
      title: "Dealer Auctions \u2014 Manheim, ADESA",
      body: "Wholesale sales of trade-ins, off-lease, and fleet vehicles between licensed dealers. Common on clean, undamaged cars.",
      bullets: [
        "Routine, not a sign of damage by itself",
        "Useful for tracing ownership and mileage history",
        "Worth reading alongside the title brand",
      ],
    },
    stepsH2: "How to Read a VIN\u2019s Auction History \u2014 Step-by-Step",
    stepsSub: "Pulling and reading auction records takes under two minutes.",
    steps: [
      { step: "01", title: "Run the VIN above", body: "Enter the 17-character VIN. Our system cross-references salvage and dealer auction records and returns every event on file for that vehicle." },
      { step: "02", title: "Identify the auction house", body: "Copart and IAA are salvage auctions, so treat their records as total-loss evidence. Manheim and ADESA are dealer wholesale auctions, which are routine. The house tells you how seriously to read the rest." },
      { step: "03", title: "Read the damage and condition codes", body: "Note the primary and secondary damage and any run-and-drive status. 'Front end' plus 'run and drive' is very different from 'flood' with no operability note. Match the codes to what the seller is disclosing." },
      { step: "04", title: "Study the pre-repair photos", body: "When auction photos are on file, look at them closely. They show the car before bodywork: bent frames, deployed airbags, and waterlines that a fresh detail job hides. This is the most valuable part of the record." },
      { step: "05", title: "Cross-check mileage and title", body: "Compare the odometer at each auction with later readings and the current title brand. A salvage auction followed by a clean title and lower mileage is a clear stop-and-inspect signal." },
    ],
    flagsH2: "Auction Red Flags to Watch For",
    flagsSub: "Any one of these patterns in an auction record is reason to inspect closely, or walk away.",
    flags: [
      { flag: "Salvage auction, now clean title", desc: "A Copart or IAA salvage sale followed by a quick clean-title resale is the classic title-washing and undisclosed-rebuild pattern." },
      { flag: "Heavy primary damage", desc: "Front, rear, side, or undercarriage damage that affects frame and safety systems. Even after repair, value and crashworthiness suffer." },
      { flag: "Flood or water damage", desc: "Flood-coded auction sales signal hidden corrosion and electrical faults that surface months or years later." },
      { flag: "No run-and-drive note", desc: "If the auction did not list the car as operable, assume significant mechanical or electrical problems until proven otherwise." },
      { flag: "Theft recovery", desc: "Theft-recovery auction vehicles are often stripped or vandalized; verify every component was properly replaced." },
      { flag: "Mileage mismatch", desc: "An auction odometer reading higher than a later 'lower-mileage' listing points to odometer fraud." },
    ],
    bottomLine: { lead: "Bottom line:", body: " auction photos and damage codes are recorded before any repair, by a neutral third party, on a specific date. That makes them harder to fake than a seller\u2019s description, and the single best tool for catching a rebuilt car sold as clean." },
    midCta: {
      h2: "Check a VIN\u2019s Auction History Now",
      body: "Free preview, instant, no credit card. See salvage and dealer auction records, damage codes, and pre-repair photos in under 5 seconds.",
    },
    linksH2: "Related Vehicle History Checks",
    linksSub: "Auction history is one piece of the picture. These checks cover the records it connects to.",
    internalLinks: [
      { href: "/salvage-title-check",    label: "Salvage Title Check",      desc: "Verify salvage and rebuilt title brands." },
      { href: "/total-loss-check",       label: "Total Loss Check",         desc: "Find insurance total-loss records." },
      { href: "/accident-history-check", label: "Accident History Check",   desc: "Review collision and damage records." },
      { href: "/flood-check",            label: "Flood Damage Check",       desc: "Detect water-damage history." },
      { href: "/odometer-check",         label: "Odometer Check",           desc: "Cross-check auction mileage for rollback." },
      { href: "/stolen-vehicle-check",   label: "Stolen Vehicle Check",     desc: "Theft-recovery and NICB records." },
      { href: "/market-value",           label: "Market Value",             desc: "How auction history affects valuation." },
      { href: "/dealer-check",           label: "Dealer Check",             desc: "Vet a dealer before you buy." },
    ],
    faqH2: "Frequently Asked Questions \u2014 VIN Auction History",
    faqSub: "The questions car buyers ask most about salvage and dealer auction records.",
    ctaPill: "Free preview \u00b7 Instant \u00b7 No Sign-Up",
    ctaH2: "See the History Behind the Listing",
    ctaBody: "A clean-looking car can hide a salvage-auction past. One VIN check brings the auction records and pre-repair photos back into view, in 5 seconds, with a free preview.",
    sourcesH2: "Sources & Data Authority",
    sourcesSub: "Auction records are read alongside federal title and theft data so the full picture is consistent. Below are the primary sources and the agencies you can cross-check with.",
    sources: [
      { href: "https://www.copart.com/", label: "Copart", note: "Major US salvage auction house for insurance total-loss vehicles." },
      { href: "https://www.iaai.com/", label: "IAA \u2014 Insurance Auto Auctions", note: "Salvage and total-loss auction marketplace." },
      { href: "https://vehiclehistory.bja.ojp.gov/", label: "NMVTIS \u2014 Bureau of Justice Assistance", note: "Federal title system that records total-loss and salvage brands." },
      { href: "https://www.nicb.org/vincheck", label: "NICB VINCheck", note: "Theft-recovery and salvage reports from insurance carriers." },
      { href: "https://www.nhtsa.gov/recalls", label: "NHTSA \u2014 Safety Recalls", note: "Open-recall data cross-referenced for every VIN." },
      { href: "https://www.ftc.gov/news-events/topics/protecting-consumers/auto-sales-financing", label: "FTC \u2014 Auto Sales & Financing", note: "Federal consumer-protection guidance on used-vehicle disclosure." },
    ],
    sourcesFooter: "Auction availability varies by vehicle. Records and photos are shown when an auction event is on file for the VIN; absence of a record does not guarantee a vehicle was never auctioned.",
  },
  es: {
    crumbs: { home: "Inicio", current: "Historial de subasta" },
    badge: "Copart \u00b7 IAA \u00b7 Subastas de concesionario",
    h1Lead: "Historial de subasta por VIN \u2014 ",
    h1Accent: "Registros de salvamento y concesionario",
    lede: "Descubre si un veh\u00edculo pas\u00f3 por una subasta de salvamento o de concesionario. Mira fechas de venta, c\u00f3digos de da\u00f1o, od\u00f3metro al momento de la venta, estado run-and-drive y las fotos originales de subasta previas a la reparaci\u00f3n para cualquier VIN. Vista previa gratis, sin tarjeta, resultados en menos de 5 segundos.",
    formH2: "Revisa el historial de subasta por VIN",
    formSub: "Ingresa cualquier VIN de 17 caracteres \u2014 autos, camionetas, motos, RVs",
    formNote: "Cifrado de 256 bits \u00b7 Compatible con DPPA \u00b7 No almacenamos datos personales",
    trustStats: [
      { value: "Salvamento", label: "+ subastas de concesionario" },
      { value: "Fotos", label: "previas a la reparaci\u00f3n cuando est\u00e1n disponibles" },
      { value: "< 5 seg", label: "tiempo promedio del reporte" },
      { value: "Vista previa gratis", label: "sin tarjeta de cr\u00e9dito" },
    ],
    statsH2: "Historial de subasta por VIN \u2014 en cifras",
    headlineStats: [
      { value: "Copart + IAA", label: "Casas de subasta de salvamento cruzadas" },
      { value: "7 campos", label: "Capturados por evento de subasta" },
      { value: "Fotos", label: "Im\u00e1genes previas a la reparaci\u00f3n cuando existen" },
      { value: "<5 seg", label: "Tiempo promedio de decodificaci\u00f3n del VIN" },
      { value: "$0", label: "Costo de la vista previa gratis" },
    ],
    whyH2: "Por qu\u00e9 el historial de subasta es el registro que los vendedores esperan que omitas",
    why: {
      p1Pre: "Cuando una aseguradora declara un veh\u00edculo p\u00e9rdida total, normalmente va a una subasta de salvamento, casi siempre ",
      copart: "Copart",
      p1Mid: " o ",
      iaa: "IAA (Insurance Auto Auctions)",
      p1Suf: ". All\u00ed se fotograf\u00eda desde todos los \u00e1ngulos y se etiqueta con su tipo de da\u00f1o, condici\u00f3n y kilometraje ",
      p1Strong: "antes de que nadie lo repare",
      p1End: ". Esa instant\u00e1nea es lo m\u00e1s cercano a la realidad de un auto da\u00f1ado.",
      p2Pre: "El problema para los compradores es lo que pasa despu\u00e9s. Un reconstructor puede comprar el auto, hacer trabajo cosm\u00e9tico, moverlo a un estado con reglas de titulaci\u00f3n m\u00e1s laxas y revenderlo con un t\u00edtulo que parece limpio. Las fotos actuales se ven bien. El vendedor no dice nada. La \u00fanica evidencia duradera de la p\u00e9rdida total es el ",
      p2Strong: "registro de subasta",
      p2End: " ligado al VIN: la fecha de venta, el c\u00f3digo de da\u00f1o y las fotos de entrada que ninguna cantidad de trabajo de carrocer\u00eda puede borrar de la historia.",
      p3: "Una verificaci\u00f3n del historial de subasta por VIN revela exactamente eso. Te dice si un auto fue vendido por salvamento, qu\u00e9 ten\u00eda, cu\u00e1ntas millas mostraba en ese momento y si pod\u00eda siquiera funcionar, para que puedas comparar la realidad de la subasta contra el anuncio brillante que tienes enfrente.",
    },
    fieldsH2: "Qu\u00e9 muestra cada registro de subasta",
    fieldsSub: "Para cada evento de subasta en archivo, el reporte captura los datos que importan para una decisi\u00f3n de compra.",
    recordFields: [
      { title: "Casa de subasta y ubicaci\u00f3n", desc: "Qu\u00e9 subasta vendi\u00f3 el veh\u00edculo (Copart, IAA y otras) y la ubicaci\u00f3n f\u00edsica del lote de venta." },
      { title: "Fecha de venta y resultado", desc: "Cu\u00e1ndo el veh\u00edculo pas\u00f3 por el bloque y si se vendi\u00f3, no se vendi\u00f3 o se relist\u00f3." },
      { title: "Descripci\u00f3n del da\u00f1o", desc: "Da\u00f1o primario y secundario registrado por la subasta: parte delantera, inundaci\u00f3n, recuperaci\u00f3n de robo, granizo y m\u00e1s." },
      { title: "Condici\u00f3n / Estado de funcionamiento", desc: "Notas de operabilidad como run-and-drive, starts o enhanced, dando una lectura r\u00e1pida de qu\u00e9 tan funcional estaba el auto al venderse." },
      { title: "Od\u00f3metro al momento de la venta", desc: "El kilometraje registrado en la subasta, un punto de control independiente para detectar manipulaci\u00f3n del od\u00f3metro." },
      { title: "Fotos originales de la subasta", desc: "Fotos de entrada tomadas antes de cualquier reparaci\u00f3n, la evidencia m\u00e1s clara de la verdadera condici\u00f3n previa a la venta del veh\u00edculo." },
    ],
    compareH2: "Subastas de salvamento vs. subastas de concesionario",
    compareSub: "No todo registro de subasta es una advertencia. Saber qu\u00e9 tipo de venta est\u00e1s viendo es la diferencia entre un intercambio mayorista rutinario y una p\u00e9rdida total oculta.",
    salvageCard: {
      title: "Subastas de salvamento \u2014 Copart, IAA",
      body: "Venden veh\u00edculos de p\u00e9rdida total del seguro, recuperaci\u00f3n de robo, inundaci\u00f3n y muy da\u00f1ados, principalmente a reconstructores, desmanteladores y exportadores.",
      bullets: [
        "Casi siempre vinculadas a una p\u00e9rdida total o t\u00edtulo marcado",
        "C\u00f3digos detallados de da\u00f1o y fotos previas a la reparaci\u00f3n",
        "Una se\u00f1al fuerte para inspeccionar antes de comprar",
      ],
    },
    dealerCard: {
      title: "Subastas de concesionario \u2014 Manheim, ADESA",
      body: "Ventas mayoristas de intercambios, ex-leasing y veh\u00edculos de flota entre concesionarios licenciados. Comunes en autos limpios y sin da\u00f1os.",
      bullets: [
        "Rutinarias, no son por s\u00ed mismas una se\u00f1al de da\u00f1o",
        "\u00datiles para rastrear historial de propiedad y kilometraje",
        "Vale la pena leerlas junto con la marca de t\u00edtulo",
      ],
    },
    stepsH2: "C\u00f3mo leer el historial de subasta de un VIN \u2014 paso a paso",
    stepsSub: "Sacar y leer registros de subasta toma menos de dos minutos.",
    steps: [
      { step: "01", title: "Ejecuta el VIN arriba", body: "Ingresa el VIN de 17 caracteres. Nuestro sistema cruza registros de subasta de salvamento y de concesionario y devuelve cada evento en archivo para ese veh\u00edculo." },
      { step: "02", title: "Identifica la casa de subasta", body: "Copart e IAA son subastas de salvamento, as\u00ed que trata sus registros como evidencia de p\u00e9rdida total. Manheim y ADESA son subastas mayoristas de concesionario, que son rutinarias. La casa te dice qu\u00e9 tan seriamente leer el resto." },
      { step: "03", title: "Lee los c\u00f3digos de da\u00f1o y condici\u00f3n", body: "Nota el da\u00f1o primario y secundario y cualquier estado run-and-drive. 'Front end' m\u00e1s 'run and drive' es muy diferente de 'flood' sin nota de operabilidad. Confronta los c\u00f3digos con lo que el vendedor est\u00e1 declarando." },
      { step: "04", title: "Estudia las fotos previas a la reparaci\u00f3n", body: "Cuando las fotos de subasta est\u00e1n en archivo, m\u00edralas de cerca. Muestran el auto antes del trabajo de carrocer\u00eda: marcos doblados, bolsas de aire desplegadas y l\u00edneas de agua que un nuevo detallado oculta. Esta es la parte m\u00e1s valiosa del registro." },
      { step: "05", title: "Cruza kilometraje y t\u00edtulo", body: "Compara el od\u00f3metro en cada subasta con lecturas posteriores y la marca de t\u00edtulo actual. Una subasta de salvamento seguida de un t\u00edtulo limpio y menor kilometraje es una se\u00f1al clara para detenerte e inspeccionar." },
    ],
    flagsH2: "Se\u00f1ales de alerta de subasta a vigilar",
    flagsSub: "Cualquiera de estos patrones en un registro de subasta es raz\u00f3n para inspeccionar de cerca, o alejarse.",
    flags: [
      { flag: "Subasta de salvamento, ahora t\u00edtulo limpio", desc: "Una venta de salvamento en Copart o IAA seguida de una reventa r\u00e1pida con t\u00edtulo limpio es el patr\u00f3n cl\u00e1sico de lavado de t\u00edtulo y reconstrucci\u00f3n no declarada." },
      { flag: "Da\u00f1o primario severo", desc: "Da\u00f1o delantero, trasero, lateral o bajo el chasis que afecta el marco y los sistemas de seguridad. Incluso despu\u00e9s de reparar, el valor y la capacidad de absorci\u00f3n de choques sufren." },
      { flag: "Da\u00f1o por inundaci\u00f3n o agua", desc: "Ventas de subasta codificadas como inundaci\u00f3n se\u00f1alan corrosi\u00f3n oculta y fallas el\u00e9ctricas que surgen meses o a\u00f1os despu\u00e9s." },
      { flag: "Sin nota run-and-drive", desc: "Si la subasta no list\u00f3 el auto como operable, asume problemas mec\u00e1nicos o el\u00e9ctricos significativos hasta que se demuestre lo contrario." },
      { flag: "Recuperaci\u00f3n de robo", desc: "Los veh\u00edculos de subasta por recuperaci\u00f3n de robo a menudo est\u00e1n desmantelados o vandalizados; verifica que cada componente fue reemplazado correctamente." },
      { flag: "Discrepancia de kilometraje", desc: "Una lectura de od\u00f3metro de subasta m\u00e1s alta que un anuncio posterior 'de menor kilometraje' apunta a fraude de od\u00f3metro." },
    ],
    bottomLine: { lead: "Conclusi\u00f3n:", body: " las fotos de subasta y los c\u00f3digos de da\u00f1o se registran antes de cualquier reparaci\u00f3n, por un tercero neutral, en una fecha espec\u00edfica. Eso las hace m\u00e1s dif\u00edciles de falsificar que la descripci\u00f3n de un vendedor, y la mejor herramienta para atrapar un auto reconstruido vendido como limpio." },
    midCta: {
      h2: "Revisa el historial de subasta de un VIN ahora",
      body: "Vista previa gratis, instant\u00e1nea, sin tarjeta. Mira registros de subasta de salvamento y concesionario, c\u00f3digos de da\u00f1o y fotos previas a la reparaci\u00f3n en menos de 5 segundos.",
    },
    linksH2: "Verificaciones de historial vehicular relacionadas",
    linksSub: "El historial de subasta es una pieza del panorama. Estas verificaciones cubren los registros con los que se conecta.",
    internalLinks: [
      { href: "/salvage-title-check",    label: "Verificaci\u00f3n de t\u00edtulo de salvamento", desc: "Verifica marcas de t\u00edtulo de salvamento y reconstruido." },
      { href: "/total-loss-check",       label: "Verificaci\u00f3n de p\u00e9rdida total",       desc: "Encuentra registros de p\u00e9rdida total del seguro." },
      { href: "/accident-history-check", label: "Verificaci\u00f3n de historial de accidentes", desc: "Revisa registros de colisi\u00f3n y da\u00f1os." },
      { href: "/flood-check",            label: "Verificaci\u00f3n de inundaci\u00f3n",          desc: "Detecta historial de da\u00f1o por agua." },
      { href: "/odometer-check",         label: "Verificaci\u00f3n de od\u00f3metro",            desc: "Cruza el kilometraje de subasta para detectar manipulaci\u00f3n." },
      { href: "/stolen-vehicle-check",   label: "Verificaci\u00f3n de veh\u00edculo robado",      desc: "Registros de recuperaci\u00f3n de robo y NICB." },
      { href: "/market-value",           label: "Valor de mercado",                            desc: "C\u00f3mo afecta el historial de subasta a la valuaci\u00f3n." },
      { href: "/dealer-check",           label: "Verificaci\u00f3n de concesionario",           desc: "Examina a un concesionario antes de comprar." },
    ],
    faqH2: "Preguntas frecuentes \u2014 Historial de subasta por VIN",
    faqSub: "Las preguntas que los compradores de autos hacen m\u00e1s sobre registros de subasta de salvamento y de concesionario.",
    ctaPill: "Vista previa gratis \u00b7 Instant\u00e1nea \u00b7 Sin registro",
    ctaH2: "Mira el historial detr\u00e1s del anuncio",
    ctaBody: "Un auto que parece limpio puede esconder un pasado de subasta de salvamento. Una verificaci\u00f3n VIN trae de vuelta a la vista los registros de subasta y las fotos previas a la reparaci\u00f3n, en 5 segundos, con vista previa gratis.",
    sourcesH2: "Fuentes y autoridad de datos",
    sourcesSub: "Los registros de subasta se leen junto con los datos federales de t\u00edtulo y robo para que el panorama completo sea consistente. Abajo est\u00e1n las fuentes principales y las agencias con las que puedes contrastar.",
    sources: [
      { href: "https://www.copart.com/", label: "Copart", note: "Casa principal de subasta de salvamento en EE. UU. para veh\u00edculos de p\u00e9rdida total del seguro." },
      { href: "https://www.iaai.com/", label: "IAA \u2014 Insurance Auto Auctions", note: "Mercado de subasta de salvamento y p\u00e9rdida total." },
      { href: "https://vehiclehistory.bja.ojp.gov/", label: "NMVTIS \u2014 Bureau of Justice Assistance", note: "Sistema federal de t\u00edtulo que registra marcas de p\u00e9rdida total y salvamento." },
      { href: "https://www.nicb.org/vincheck", label: "NICB VINCheck", note: "Reportes de recuperaci\u00f3n de robo y salvamento de aseguradoras." },
      { href: "https://www.nhtsa.gov/recalls", label: "NHTSA \u2014 Retiros de seguridad", note: "Datos de retiros abiertos cruzados para cada VIN." },
      { href: "https://www.ftc.gov/news-events/topics/protecting-consumers/auto-sales-financing", label: "FTC \u2014 Ventas y financiamiento de autos", note: "Gu\u00eda federal de protecci\u00f3n al consumidor sobre divulgaci\u00f3n de veh\u00edculos usados." },
    ],
    sourcesFooter: "La disponibilidad de subastas var\u00eda por veh\u00edculo. Los registros y fotos se muestran cuando hay un evento de subasta en archivo para el VIN; la ausencia de un registro no garantiza que un veh\u00edculo nunca haya sido subastado.",
  },
  fr: {
    crumbs: { home: "Accueil", current: "Historique d'ench\u00e8re" },
    badge: "Copart \u00b7 IAA \u00b7 Ench\u00e8res de concessionnaires",
    h1Lead: "Historique d'ench\u00e8re par VIN \u2014 ",
    h1Accent: "Registres de salvage et de concessionnaires",
    lede: "D\u00e9couvre si un v\u00e9hicule est pass\u00e9 par une ench\u00e8re de salvage ou de concessionnaire. Vois les dates de vente, les codes de dommages, le compteur kilom\u00e9trique au moment de la vente, le statut run-and-drive et les photos d'ench\u00e8re d'origine avant r\u00e9paration pour tout VIN. Aper\u00e7u gratuit, sans carte de cr\u00e9dit, r\u00e9sultats en moins de 5 secondes.",
    formH2: "V\u00e9rifie l'historique d'ench\u00e8re par VIN",
    formSub: "Saisis n'importe quel VIN de 17 caract\u00e8res \u2014 voitures, camions, motos, VR",
    formNote: "Chiffrement 256 bits \u00b7 Conforme DPPA \u00b7 Aucune donn\u00e9e personnelle stock\u00e9e",
    trustStats: [
      { value: "Salvage", label: "+ ench\u00e8res de concessionnaires" },
      { value: "Photos", label: "avant r\u00e9paration, quand disponibles" },
      { value: "< 5 s", label: "temps moyen du rapport" },
      { value: "Aper\u00e7u gratuit", label: "sans carte de cr\u00e9dit" },
    ],
    statsH2: "Historique d'ench\u00e8re par VIN \u2014 en chiffres",
    headlineStats: [
      { value: "Copart + IAA", label: "Maisons d'ench\u00e8re de salvage crois\u00e9es" },
      { value: "7 champs", label: "Captur\u00e9s par \u00e9v\u00e9nement d'ench\u00e8re" },
      { value: "Photos", label: "Images avant r\u00e9paration affich\u00e9es quand existantes" },
      { value: "<5 s", label: "Temps moyen de d\u00e9codage VIN" },
      { value: "$0", label: "Co\u00fbt pour l'aper\u00e7u gratuit" },
    ],
    whyH2: "Pourquoi l'historique d'ench\u00e8re est le registre que les vendeurs esp\u00e8rent que tu sautes",
    why: {
      p1Pre: "Quand un assureur d\u00e9clare un v\u00e9hicule perte totale, il va g\u00e9n\u00e9ralement vers une ench\u00e8re de salvage, le plus souvent ",
      copart: "Copart",
      p1Mid: " ou ",
      iaa: "IAA (Insurance Auto Auctions)",
      p1Suf: ". L\u00e0, il est photographi\u00e9 sous tous les angles et \u00e9tiquet\u00e9 avec son type de dommages, sa condition et son kilom\u00e9trage ",
      p1Strong: "avant que quiconque le r\u00e9pare",
      p1End: ". Cet instantan\u00e9 est ce qui se rapproche le plus de la v\u00e9rit\u00e9 sur une voiture endommag\u00e9e.",
      p2Pre: "Le probl\u00e8me pour les acheteurs est ce qui se passe ensuite. Un reconstructeur peut acheter la voiture, faire du travail cosm\u00e9tique, la d\u00e9placer dans un \u00c9tat aux r\u00e8gles de titrage plus laxistes et la revendre avec un titre qui semble propre. Les photos actuelles ont l'air bien. Le vendeur ne dit rien. La seule preuve durable de la perte totale est le ",
      p2Strong: "registre d'ench\u00e8re",
      p2End: " attach\u00e9 au VIN : la date de vente, le code de dommages et les photos d'admission qu'aucune quantit\u00e9 de travail de carrosserie ne peut effacer de l'histoire.",
      p3: "Une v\u00e9rification de l'historique d'ench\u00e8re par VIN fait ressortir exactement cela. Elle te dit si une voiture a \u00e9t\u00e9 vendue pour salvage, ce qui n'allait pas avec elle, combien de miles elle affichait \u00e0 ce moment-l\u00e0 et si elle pouvait m\u00eame fonctionner, pour que tu puisses comparer la r\u00e9alit\u00e9 de l'ench\u00e8re \u00e0 l'annonce brillante devant toi.",
    },
    fieldsH2: "Ce que chaque registre d'ench\u00e8re montre",
    fieldsSub: "Pour chaque \u00e9v\u00e9nement d'ench\u00e8re au dossier, le rapport capture les donn\u00e9es qui comptent pour une d\u00e9cision d'achat.",
    recordFields: [
      { title: "Maison d'ench\u00e8re et lieu", desc: "Quelle ench\u00e8re a vendu le v\u00e9hicule (Copart, IAA et autres) et l'emplacement physique du parc de vente." },
      { title: "Date de vente et r\u00e9sultat", desc: "Quand le v\u00e9hicule est pass\u00e9 sur le bloc et s'il a \u00e9t\u00e9 vendu, n'a pas \u00e9t\u00e9 vendu ou a \u00e9t\u00e9 relist\u00e9." },
      { title: "Description des dommages", desc: "Dommages primaires et secondaires tels qu'enregistr\u00e9s par l'ench\u00e8re : avant, inondation, r\u00e9cup\u00e9ration de vol, gr\u00eale et plus." },
      { title: "Condition / Statut de fonctionnement", desc: "Notes d'op\u00e9rabilit\u00e9 telles que run-and-drive, starts ou enhanced, donnant une lecture rapide de la fonctionnalit\u00e9 de la voiture \u00e0 la vente." },
      { title: "Compteur kilom\u00e9trique \u00e0 la vente", desc: "Le kilom\u00e9trage enregistr\u00e9 \u00e0 l'ench\u00e8re, un point de contr\u00f4le ind\u00e9pendant pour rep\u00e9rer la falsification du compteur." },
      { title: "Photos d'ench\u00e8re d'origine", desc: "Photos d'admission prises avant toute r\u00e9paration, la preuve la plus claire de la v\u00e9ritable condition pr\u00e9-vente du v\u00e9hicule." },
    ],
    compareH2: "Ench\u00e8res de salvage vs. ench\u00e8res de concessionnaires",
    compareSub: "Tout registre d'ench\u00e8re n'est pas un avertissement. Savoir quel type de vente tu regardes est la diff\u00e9rence entre un \u00e9change de gros routinier et une perte totale cach\u00e9e.",
    salvageCard: {
      title: "Ench\u00e8res de salvage \u2014 Copart, IAA",
      body: "Vendent des v\u00e9hicules en perte totale d'assurance, de r\u00e9cup\u00e9ration de vol, d'inondation et fortement endommag\u00e9s, principalement \u00e0 des reconstructeurs, d\u00e9monteurs et exportateurs.",
      bullets: [
        "Presque toujours li\u00e9es \u00e0 une perte totale ou un titre marqu\u00e9",
        "Codes de dommages d\u00e9taill\u00e9s et photos avant r\u00e9paration",
        "Un signal fort pour inspecter avant d'acheter",
      ],
    },
    dealerCard: {
      title: "Ench\u00e8res de concessionnaires \u2014 Manheim, ADESA",
      body: "Ventes en gros de reprises, fins de leasing et v\u00e9hicules de flotte entre concessionnaires licenci\u00e9s. Courantes sur des voitures propres et non endommag\u00e9es.",
      bullets: [
        "Routini\u00e8res, pas un signe de dommages en soi",
        "Utiles pour retracer la propri\u00e9t\u00e9 et l'historique kilom\u00e9trique",
        "Vaut la peine d'\u00eatre lue avec la marque de titre",
      ],
    },
    stepsH2: "Comment lire l'historique d'ench\u00e8re d'un VIN \u2014 \u00e9tape par \u00e9tape",
    stepsSub: "Extraire et lire les registres d'ench\u00e8re prend moins de deux minutes.",
    steps: [
      { step: "01", title: "Lance le VIN ci-dessus", body: "Saisis le VIN de 17 caract\u00e8res. Notre syst\u00e8me croise les registres d'ench\u00e8re de salvage et de concessionnaires et retourne chaque \u00e9v\u00e9nement au dossier pour ce v\u00e9hicule." },
      { step: "02", title: "Identifie la maison d'ench\u00e8re", body: "Copart et IAA sont des ench\u00e8res de salvage, traite donc leurs registres comme une preuve de perte totale. Manheim et ADESA sont des ench\u00e8res de gros pour concessionnaires, qui sont routini\u00e8res. La maison te dit avec quel s\u00e9rieux lire le reste." },
      { step: "03", title: "Lis les codes de dommages et de condition", body: "Note les dommages primaires et secondaires et tout statut run-and-drive. 'Front end' plus 'run and drive' est tr\u00e8s diff\u00e9rent de 'flood' sans note d'op\u00e9rabilit\u00e9. Confronte les codes \u00e0 ce que le vendeur d\u00e9clare." },
      { step: "04", title: "\u00c9tudie les photos avant r\u00e9paration", body: "Quand les photos d'ench\u00e8re sont au dossier, regarde-les de pr\u00e8s. Elles montrent la voiture avant le travail de carrosserie : ch\u00e2ssis pli\u00e9s, airbags d\u00e9ploy\u00e9s et lignes d'eau qu'un nouveau d\u00e9tail cache. C'est la partie la plus pr\u00e9cieuse du registre." },
      { step: "05", title: "Croise kilom\u00e9trage et titre", body: "Compare le compteur \u00e0 chaque ench\u00e8re avec les lectures ult\u00e9rieures et la marque de titre actuelle. Une ench\u00e8re de salvage suivie d'un titre propre et d'un kilom\u00e9trage inf\u00e9rieur est un signal clair d'arr\u00eat et d'inspection." },
    ],
    flagsH2: "Drapeaux rouges d'ench\u00e8re \u00e0 surveiller",
    flagsSub: "L'un de ces mod\u00e8les dans un registre d'ench\u00e8re est une raison d'inspecter de pr\u00e8s, ou de te retirer.",
    flags: [
      { flag: "Ench\u00e8re de salvage, maintenant titre propre", desc: "Une vente de salvage Copart ou IAA suivie d'une revente rapide avec titre propre est le mod\u00e8le classique de lavage de titre et de reconstruction non d\u00e9clar\u00e9e." },
      { flag: "Dommages primaires graves", desc: "Dommages avant, arri\u00e8re, lat\u00e9raux ou sous le ch\u00e2ssis qui affectent le ch\u00e2ssis et les syst\u00e8mes de s\u00e9curit\u00e9. M\u00eame apr\u00e8s r\u00e9paration, la valeur et la r\u00e9sistance aux chocs souffrent." },
      { flag: "Inondation ou dommages d'eau", desc: "Les ventes d'ench\u00e8re cod\u00e9es inondation signalent une corrosion cach\u00e9e et des d\u00e9fauts \u00e9lectriques qui surgissent des mois ou des ann\u00e9es plus tard." },
      { flag: "Pas de note run-and-drive", desc: "Si l'ench\u00e8re n'a pas list\u00e9 la voiture comme op\u00e9rationnelle, suppose des probl\u00e8mes m\u00e9caniques ou \u00e9lectriques importants jusqu'\u00e0 preuve du contraire." },
      { flag: "R\u00e9cup\u00e9ration de vol", desc: "Les v\u00e9hicules d'ench\u00e8re de r\u00e9cup\u00e9ration de vol sont souvent d\u00e9pouill\u00e9s ou vandalis\u00e9s ; v\u00e9rifie que chaque composant a \u00e9t\u00e9 correctement remplac\u00e9." },
      { flag: "Discordance de kilom\u00e9trage", desc: "Une lecture de compteur d'ench\u00e8re sup\u00e9rieure \u00e0 une annonce ult\u00e9rieure 'de moindre kilom\u00e9trage' pointe vers une fraude du compteur." },
    ],
    bottomLine: { lead: "Conclusion :", body: " les photos d'ench\u00e8re et les codes de dommages sont enregistr\u00e9s avant toute r\u00e9paration, par un tiers neutre, \u00e0 une date pr\u00e9cise. Cela les rend plus difficiles \u00e0 falsifier que la description d'un vendeur, et le meilleur outil unique pour attraper une voiture reconstruite vendue comme propre." },
    midCta: {
      h2: "V\u00e9rifie l'historique d'ench\u00e8re d'un VIN maintenant",
      body: "Aper\u00e7u gratuit, instantan\u00e9, sans carte de cr\u00e9dit. Vois les registres d'ench\u00e8re de salvage et de concessionnaires, les codes de dommages et les photos avant r\u00e9paration en moins de 5 secondes.",
    },
    linksH2: "V\u00e9rifications d'historique de v\u00e9hicule connexes",
    linksSub: "L'historique d'ench\u00e8re est une pi\u00e8ce du tableau. Ces v\u00e9rifications couvrent les registres auxquels il se connecte.",
    internalLinks: [
      { href: "/salvage-title-check",    label: "V\u00e9rification de titre de salvage",      desc: "V\u00e9rifie les marques de titre de salvage et reconstruit." },
      { href: "/total-loss-check",       label: "V\u00e9rification de perte totale",         desc: "Trouve les registres de perte totale d'assurance." },
      { href: "/accident-history-check", label: "V\u00e9rification de l'historique d'accidents",   desc: "R\u00e9vise les registres de collision et de dommages." },
      { href: "/flood-check",            label: "V\u00e9rification de dommages d'inondation",       desc: "D\u00e9tecte l'historique de dommages d'eau." },
      { href: "/odometer-check",         label: "V\u00e9rification du compteur kilom\u00e9trique",           desc: "Croise le kilom\u00e9trage d'ench\u00e8re pour rollback." },
      { href: "/stolen-vehicle-check",   label: "V\u00e9rification de v\u00e9hicule vol\u00e9",     desc: "Registres de r\u00e9cup\u00e9ration de vol et NICB." },
      { href: "/market-value",           label: "Valeur de march\u00e9",             desc: "Comment l'historique d'ench\u00e8re affecte l'\u00e9valuation." },
      { href: "/dealer-check",           label: "V\u00e9rification de concessionnaire",           desc: "Examine un concessionnaire avant d'acheter." },
    ],
    faqH2: "Questions fr\u00e9quentes \u2014 Historique d'ench\u00e8re par VIN",
    faqSub: "Les questions que les acheteurs de voitures posent le plus sur les registres d'ench\u00e8re de salvage et de concessionnaires.",
    ctaPill: "Aper\u00e7u gratuit \u00b7 Instantan\u00e9 \u00b7 Sans inscription",
    ctaH2: "Vois l'historique derri\u00e8re l'annonce",
    ctaBody: "Une voiture qui semble propre peut cacher un pass\u00e9 d'ench\u00e8re de salvage. Une v\u00e9rification VIN ram\u00e8ne les registres d'ench\u00e8re et les photos avant r\u00e9paration \u00e0 la vue, en 5 secondes, avec un aper\u00e7u gratuit.",
    sourcesH2: "Sources et autorit\u00e9 des donn\u00e9es",
    sourcesSub: "Les registres d'ench\u00e8re sont lus aux c\u00f4t\u00e9s des donn\u00e9es f\u00e9d\u00e9rales de titre et de vol pour que l'image compl\u00e8te soit coh\u00e9rente. Ci-dessous se trouvent les sources principales et les agences avec lesquelles tu peux faire des v\u00e9rifications crois\u00e9es.",
    sources: [
      { href: "https://www.copart.com/", label: "Copart", note: "Principale maison d'ench\u00e8re de salvage am\u00e9ricaine pour les v\u00e9hicules en perte totale d'assurance." },
      { href: "https://www.iaai.com/", label: "IAA \u2014 Insurance Auto Auctions", note: "March\u00e9 d'ench\u00e8re de salvage et de perte totale." },
      { href: "https://vehiclehistory.bja.ojp.gov/", label: "NMVTIS \u2014 Bureau of Justice Assistance", note: "Syst\u00e8me f\u00e9d\u00e9ral de titre qui enregistre les marques de perte totale et de salvage." },
      { href: "https://www.nicb.org/vincheck", label: "NICB VINCheck", note: "Rapports de r\u00e9cup\u00e9ration de vol et de salvage des assureurs." },
      { href: "https://www.nhtsa.gov/recalls", label: "NHTSA \u2014 Rappels de s\u00e9curit\u00e9", note: "Donn\u00e9es de rappels ouverts crois\u00e9es pour chaque VIN." },
      { href: "https://www.ftc.gov/news-events/topics/protecting-consumers/auto-sales-financing", label: "FTC \u2014 Ventes et financement automobiles", note: "Orientation f\u00e9d\u00e9rale de protection du consommateur sur la divulgation de v\u00e9hicules d'occasion." },
    ],
    sourcesFooter: "La disponibilit\u00e9 des ench\u00e8res varie selon le v\u00e9hicule. Les registres et photos sont affich\u00e9s quand un \u00e9v\u00e9nement d'ench\u00e8re est au dossier pour le VIN ; l'absence d'un registre ne garantit pas qu'un v\u00e9hicule n'a jamais \u00e9t\u00e9 mis aux ench\u00e8res.",
  },
} as const;

export const FAQS_EN: Faq[] = [
  { question: "How do I check a car's auction history by VIN?", answer: "Enter the 17-character VIN in the search box above. Our system cross-references salvage and dealer auction records and returns every auction event on file: the auction house and location, sale date, result, damage description, condition, odometer reading at sale, and the original auction photos when available." },
  { question: "Why does it matter if a car was sold at a salvage auction?", answer: "A vehicle that passed through a salvage auction such as Copart or IAA was almost always declared a total loss by an insurer first. Even if it was later repaired and re-titled, the prior total-loss damage permanently affects safety, value, and insurability. Auction records are often the earliest and most detailed evidence of that damage, frequently with photos taken before any cosmetic repair." },
  { question: "What is the difference between a salvage auction and a dealer auction?", answer: "Salvage auctions (Copart, IAA) sell insurance total-loss, theft-recovery, and damaged vehicles, usually to rebuilders, dismantlers, and exporters. Dealer auctions (Manheim, ADESA) are wholesale sales of trade-ins, off-lease, and fleet vehicles between licensed dealers. A salvage-auction record is a strong warning sign; a dealer-auction record is routine but still useful for tracing ownership and mileage." },
  { question: "Do auction records include photos of the damage?", answer: "Often, yes. Salvage auctions photograph each vehicle from multiple angles at intake, before any repair. When those images are on file for a VIN, our report displays them so you can see the actual pre-repair condition, the single most useful piece of evidence for a car that was later rebuilt and listed as clean." },
  { question: "What does 'run and drive' mean in an auction listing?", answer: "'Run and drive' is an auction condition note meaning the vehicle started, moved under its own power, and could be driven a short distance at the sale. It does not certify roadworthiness or that the car is repaired, only that it operated at that moment. Categories like 'starts' or 'enhanced vehicle' indicate progressively less function, and no operability note at all is a red flag." },
  { question: "Can a car be sold at auction more than once?", answer: "Yes. A vehicle can appear at several auctions over its life. For example, a salvage sale after a total loss, then a dealer auction after it was rebuilt and resold. Multiple auction events, or a salvage sale followed by a quick clean-title resale, are patterns worth scrutinizing closely before you buy." },
  { question: "Does an auction record always mean the car has a salvage title?", answer: "Not always. Dealer-auction (wholesale) records are common on clean, undamaged trade-ins and off-lease cars. A salvage-auction record, however, almost always traces back to a total-loss or branded title. Read the auction house, the damage description, and the title brand together, and our report shows all three so you can tell a routine wholesale sale from a total-loss event." },
  { question: "Is the odometer reading at auction reliable?", answer: "Auction odometer readings are a valuable cross-check because they are recorded at a specific date independent of the seller. Compare the mileage at each auction event against later DMV and inspection readings: mileage should only increase over time. A reading that drops, or a large unexplained jump, is a strong indicator of odometer tampering." },
];

export const FAQS_ES: Faq[] = [
  { question: "\u00bfC\u00f3mo reviso el historial de subasta de un auto por VIN?", answer: "Ingresa el VIN de 17 caracteres en el cuadro de b\u00fasqueda arriba. Nuestro sistema cruza registros de subasta de salvamento y de concesionario y devuelve cada evento de subasta en archivo: la casa y ubicaci\u00f3n de la subasta, fecha de venta, resultado, descripci\u00f3n del da\u00f1o, condici\u00f3n, lectura del od\u00f3metro al venderse y las fotos originales de la subasta cuando est\u00e1n disponibles." },
  { question: "\u00bfPor qu\u00e9 importa si un auto fue vendido en una subasta de salvamento?", answer: "Un veh\u00edculo que pas\u00f3 por una subasta de salvamento como Copart o IAA casi siempre fue declarado p\u00e9rdida total por una aseguradora primero. Aunque despu\u00e9s haya sido reparado y re-titulado, el da\u00f1o previo de p\u00e9rdida total afecta permanentemente la seguridad, el valor y la asegurabilidad. Los registros de subasta a menudo son la evidencia m\u00e1s temprana y detallada de ese da\u00f1o, frecuentemente con fotos tomadas antes de cualquier reparaci\u00f3n cosm\u00e9tica." },
  { question: "\u00bfCu\u00e1l es la diferencia entre una subasta de salvamento y una de concesionario?", answer: "Las subastas de salvamento (Copart, IAA) venden veh\u00edculos de p\u00e9rdida total del seguro, recuperaci\u00f3n de robo y da\u00f1ados, usualmente a reconstructores, desmanteladores y exportadores. Las subastas de concesionario (Manheim, ADESA) son ventas mayoristas de intercambios, ex-leasing y veh\u00edculos de flota entre concesionarios licenciados. Un registro de subasta de salvamento es una se\u00f1al de advertencia fuerte; un registro de subasta de concesionario es rutinario pero a\u00fan \u00fatil para rastrear propiedad y kilometraje." },
  { question: "\u00bfLos registros de subasta incluyen fotos del da\u00f1o?", answer: "A menudo, s\u00ed. Las subastas de salvamento fotograf\u00edan cada veh\u00edculo desde m\u00faltiples \u00e1ngulos al ingreso, antes de cualquier reparaci\u00f3n. Cuando esas im\u00e1genes est\u00e1n en archivo para un VIN, nuestro reporte las muestra para que puedas ver la condici\u00f3n real previa a la reparaci\u00f3n, la pieza de evidencia m\u00e1s \u00fatil para un auto que despu\u00e9s fue reconstruido y publicado como limpio." },
  { question: "\u00bfQu\u00e9 significa 'run and drive' en un anuncio de subasta?", answer: "'Run and drive' es una nota de condici\u00f3n de subasta que significa que el veh\u00edculo arranc\u00f3, se movi\u00f3 con su propia potencia y pudo conducirse una corta distancia en la venta. No certifica que est\u00e9 apto para circular o que el auto est\u00e9 reparado, solo que oper\u00f3 en ese momento. Categor\u00edas como 'starts' o 'enhanced vehicle' indican progresivamente menos funci\u00f3n, y no tener nota de operabilidad es una se\u00f1al de alerta." },
  { question: "\u00bfUn auto puede venderse en subasta m\u00e1s de una vez?", answer: "S\u00ed. Un veh\u00edculo puede aparecer en varias subastas a lo largo de su vida. Por ejemplo, una venta de salvamento despu\u00e9s de una p\u00e9rdida total, luego una subasta de concesionario despu\u00e9s de ser reconstruido y revendido. M\u00faltiples eventos de subasta, o una venta de salvamento seguida de una reventa r\u00e1pida con t\u00edtulo limpio, son patrones que vale la pena escudri\u00f1ar de cerca antes de comprar." },
  { question: "\u00bfUn registro de subasta siempre significa que el auto tiene t\u00edtulo de salvamento?", answer: "No siempre. Los registros de subasta de concesionario (mayoristas) son comunes en intercambios y autos ex-leasing limpios y sin da\u00f1os. Un registro de subasta de salvamento, sin embargo, casi siempre se rastrea a una p\u00e9rdida total o t\u00edtulo marcado. Lee la casa de subasta, la descripci\u00f3n del da\u00f1o y la marca de t\u00edtulo juntos, y nuestro reporte muestra los tres para que puedas distinguir una venta mayorista rutinaria de un evento de p\u00e9rdida total." },
  { question: "\u00bfLa lectura del od\u00f3metro en la subasta es confiable?", answer: "Las lecturas de od\u00f3metro de subasta son un cruce valioso porque se registran en una fecha espec\u00edfica independiente del vendedor. Compara el kilometraje en cada evento de subasta contra lecturas posteriores del DMV y de inspecciones: el kilometraje solo debe aumentar con el tiempo. Una lectura que baja, o un salto grande inexplicable, es un fuerte indicador de manipulaci\u00f3n del od\u00f3metro." },
];

const TRUST_ICONS = [Gavel, Camera, Clock, BadgeCheck];
const RECORD_ICONS = [Building2, Clock, AlertCircle, FileText, Gauge, Camera];

export default function AuctionHistoryBody({ locale }: { locale: Locale }) {
  const c = COPY[locale];
  const faqs = locale === "es" ? FAQS_ES : FAQS_EN;
  const link = (href: string) => (locale === "es" ? `/es${href}` : href);

  return (
    <article className="pb-16 bg-surface">
      <div className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
          <Breadcrumbs items={[{ label: c.crumbs.home, href: link("/") }, { label: c.crumbs.current }]} onDark />

          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <Gavel className="w-4 h-4" /> {c.badge}
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
            {c.h1Lead}<span style={{ color: "var(--color-secondary-container)" }}>{c.h1Accent}</span>
          </h1>

          <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">{c.lede}</p>

          <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
            <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">{c.formH2}</h2>
            <p className="text-xs sm:text-sm text-on-surface-variant mb-4">{c.formSub}</p>
            <VinSearchForm size="lg" locale={locale} />
            <p className="mt-3 text-[11px] text-slate-400 flex items-center gap-1.5">
              <Lock className="w-3 h-3" /> {c.formNote}
            </p>
          </div>

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

      <section aria-labelledby="auction-stats-heading" className="max-w-5xl mx-auto px-4 sm:px-6 -mt-8 sm:-mt-10 relative z-10">
        <div className="rounded-3xl bg-surface-container shadow-md border border-outline-variant p-5 sm:p-7">
          <h2 id="auction-stats-heading" className="text-xs sm:text-sm font-headline font-black uppercase tracking-widest text-primary mb-4 sm:mb-5">{c.statsH2}</h2>
          <dl className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
            {c.headlineStats.map((s) => (
              <div key={s.label} className="rounded-2xl bg-primary-container px-4 py-4 sm:py-5">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-headline font-bold text-2xl sm:text-3xl text-white leading-none mb-2">{s.value}</dd>
                <p className="text-xs sm:text-sm text-on-primary-container leading-snug">{s.label}</p>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{c.whyH2}</h2>
          <div className="prose prose-slate max-w-none text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
            <p>
              {c.why.p1Pre}
              <a href="https://www.copart.com/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary underline underline-offset-2">{c.why.copart}</a>
              {c.why.p1Mid}
              <a href="https://www.iaai.com/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary underline underline-offset-2">{c.why.iaa}</a>
              {c.why.p1Suf}<strong className="text-on-surface">{c.why.p1Strong}</strong>{c.why.p1End}
            </p>
            <p>{c.why.p2Pre}<strong className="text-on-surface">{c.why.p2Strong}</strong>{c.why.p2End}</p>
            <p>{c.why.p3}</p>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.fieldsH2}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8">{c.fieldsSub}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {c.recordFields.map((item, i) => {
              const Icon = RECORD_ICONS[i];
              return (
                <div key={item.title} className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-base font-headline font-extrabold text-primary mb-1.5">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{c.compareH2}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-6 leading-relaxed">{c.compareSub}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-error/30 bg-error/5 p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="w-5 h-5 text-error" />
                <h3 className="text-base font-headline font-extrabold text-on-surface">{c.salvageCard.title}</h3>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-3">{c.salvageCard.body}</p>
              <ul className="space-y-1.5 text-sm text-on-surface-variant">
                {c.salvageCard.bullets.map((t) => (
                  <li key={t} className="flex gap-2 items-start"><AlertCircle className="w-4 h-4 text-error flex-shrink-0 mt-0.5" /> {t}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-3">
                <Building2 className="w-5 h-5 text-primary" />
                <h3 className="text-base font-headline font-extrabold text-on-surface">{c.dealerCard.title}</h3>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-3">{c.dealerCard.body}</p>
              <ul className="space-y-1.5 text-sm text-on-surface-variant">
                {c.dealerCard.bullets.map((t) => (
                  <li key={t} className="flex gap-2 items-start"><Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" strokeWidth={3} /> {t}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.stepsH2}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8">{c.stepsSub}</p>
          <div className="space-y-4">
            {c.steps.map((s) => (
              <div key={s.step} className="flex gap-4 sm:gap-6 items-start rounded-2xl border border-outline-variant bg-surface p-5 sm:p-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                  <span className="text-white font-headline font-black text-sm">{s.step}</span>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1.5">{s.title}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.flagsH2}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8">{c.flagsSub}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {c.flags.map((b) => (
              <div key={b.flag} className="flex gap-3 items-start rounded-xl border border-outline-variant bg-surface-container-lowest p-4">
                <AlertCircle className="w-5 h-5 text-error flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-sm font-bold text-on-surface">{b.flag}</strong>
                  <p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl bg-primary/5 border border-primary/20 p-5 sm:p-6">
            <p className="text-sm text-on-surface-variant leading-relaxed">
              <strong className="text-primary">{c.bottomLine.lead}</strong>{c.bottomLine.body}
            </p>
          </div>
        </section>

        <section className="py-10">
          <div className="rounded-3xl bg-primary p-7 sm:p-10 text-center">
            <Star className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">{c.midCta.h2}</h2>
            <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">{c.midCta.body}</p>
            <div className="max-w-xl mx-auto bg-white rounded-2xl p-4 sm:p-5">
              <VinSearchForm size="lg" locale={locale} />
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.linksH2}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7">{c.linksSub}</p>
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

        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.faqH2}</h2>
          <p className="text-sm text-on-surface-variant mb-8">{c.faqSub}</p>
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
            <Zap className="w-3.5 h-3.5" /> {c.ctaPill}
          </div>
          <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3">{c.ctaH2}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">{c.ctaBody}</p>
          <div className="max-w-xl mx-auto bg-surface-container-low rounded-2xl p-5 border border-outline-variant">
            <VinSearchForm size="lg" locale={locale} />
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.sourcesH2}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-6">{c.sourcesSub}</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            {c.sources.map((s) => (
              <li key={s.href} className="rounded-xl border border-outline-variant bg-surface-container-lowest p-4">
                <a href={s.href} target="_blank" rel="noopener noreferrer nofollow" className="text-primary font-bold underline underline-offset-2">{s.label} \u2197</a>
                <p className="mt-1.5 text-xs sm:text-sm text-on-surface-variant leading-relaxed">{s.note}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs text-on-surface-variant italic">{c.sourcesFooter}</p>
        </section>

        <RelatedChecks exclude="/auction-history" />
      </div>
    </article>
  );
}

// Wave 19 — French uses the Spanish FAQ array as a structural fallback.
// The user-visible FAQ component already uses the locale="fr" branch in COPY;
// this alias only feeds the JSON-LD FAQPage schema until /fr metadata is translated.
const FAQS_FR = FAQS_ES;
export { FAQS_FR };
