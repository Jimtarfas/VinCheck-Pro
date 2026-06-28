import Link from "next/link";
import {
  Check,
  Shield,
  Search,
  FileText,
  AlertCircle,
  Clock,
  Car,
  MapPin,
  ChevronRight,
  Star,
  Lock,
  Zap,
  BadgeCheck,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import type { Locale } from "@/i18n/config";

interface Faq { question: string; answer: string; }

const COPY = {
  en: {
    crumbs: { home: "Home", current: "Florida VIN Check" },
    badge: "Florida (FL)  \u00b7  DHSMV Data",
    h1Lead: "Florida VIN Check \u2014 ",
    h1Accent: "Free FL Vehicle History",
    intro:
      "Instant access to Florida DHSMV records, title brands, accident history, flood damage, and odometer data for any vehicle. Free, no credit card, no sign-up \u2014 results in under 5 seconds.",
    searchHeading: "Run Your Free Florida VIN Check",
    searchSub: "Enter any 17-character VIN \u2014 passenger cars, trucks, motorcycles, RVs",
    searchSecurity: "256-bit encrypted \u00b7 DPPA compliant \u00b7 No personal data stored",
    trustStats: [
      { value: "4.8M+",   label: "FL vehicles in database" },
      { value: "NMVTIS",  label: "certified data source" },
      { value: "< 5 sec", label: "average report time" },
      { value: "Free",    label: "no credit card needed" },
    ],
    statsHeading: "Florida VIN Check \u2014 By the Numbers",
    headlineStats: [
      { value: "4.8M+",    label: "Florida-registered vehicles checked" },
      { value: "51",       label: "Title brands tracked across all state DMVs" },
      { value: "<5 sec",   label: "Average VIN decode time" },
      { value: "\u00a7 319.14", label: "Florida statute governing salvage title brands" },
      { value: "$0",       label: "Cost for the free preview" },
    ],
    whyHeading: "Why a Florida VIN Check Is Different From Other States",
    whyP1Before:
      "Florida is one of the most important states to check when buying a used vehicle \u2014 and one of the most risky to skip. The Sunshine State consistently ranks in the ",
    whyP1Bold: "top 5 states nationally for salvage vehicle registrations",
    whyP1Mid:
      ", flood-damage title brands, and odometer fraud cases. Federal data quantifies the risk: an estimated ",
    whyP1Link1: "358,000 vehicles were flood-damaged in Florida after Hurricane Ian (Carfax, 2022)",
    whyP1Mid2: ", and Florida ranks ",
    whyP1Link2: "#4 nationwide for vehicle theft with 31,419 thefts in 2023 (NICB)",
    whyP1After: ". Here\u2019s why it matters:",
    whyBullets: [
      { icon: "\ud83c\udf00", point: "Hurricane exposure", detail: "Florida is struck by more hurricanes and tropical storms than any other US state. After events like Hurricane Ian (2022), Irma (2017), and Michael (2018), tens of thousands of flood-totaled vehicles entered the used car market \u2014 many with washed or out-of-state titles." },
      { icon: "\ud83d\udea2", point: "Port of entry", detail: "Miami and Jacksonville are major ports for imported vehicles. Out-of-state and international vehicles frequently enter with incomplete or misrepresented histories." },
      { icon: "\ud83d\udc74", point: "High seasonal turnover", detail: "Florida\u2019s large snowbird population means vehicles frequently change hands between private parties \u2014 bypassing dealer disclosure requirements." },
      { icon: "\u2600\ufe0f", point: "Sun and salt damage", detail: "UV degradation and coastal salt air cause cosmetic and structural damage that sellers routinely conceal. A VIN history report surfaces prior damage claims even when the vehicle looks clean." },
    ],
    whyP2Before: "A ",
    whyP2Bold: "Florida DMV VIN check",
    whyP2After:
      " pulls records directly from the Florida Department of Highway Safety and Motor Vehicles (DHSMV) \u2014 the state agency responsible for vehicle registration and titling. Combined with NMVTIS (the federal National Motor Vehicle Title Information System) and national insurance data, our free VIN check gives you the most complete picture available.",
    reportHeading: "What Your Free Florida Vehicle History Report Includes",
    reportSub:
      "Our Florida VIN lookup aggregates data from DHSMV, NMVTIS, NICB, NHTSA, and licensed insurance history providers into a single report.",
    reportItems: [
      { icon: FileText,    title: "Title History",      desc: "Every title issued in Florida and all 49 other states, including brands, lienholders, and ownership transfers." },
      { icon: AlertCircle, title: "Accident Records",   desc: "Collision data from insurance companies, repair facilities, and state DMV reports." },
      { icon: Search,      title: "Odometer Readings",  desc: "Mileage snapshots from every DMV transaction, inspection, and insurance event." },
      { icon: Shield,      title: "Theft Records",      desc: "NICB stolen vehicle database cross-reference \u2014 critical in South Florida\u2019s high-theft metro areas." },
      { icon: Car,         title: "Recall Status",      desc: "All open NHTSA safety recalls \u2014 know before you register." },
      { icon: MapPin,      title: "Flood & Hurricane Damage", desc: "Flood-title brands and total-loss records from Florida\u2019s hurricane events." },
    ],
    stepsHeading: "How to Check a VIN in Florida \u2014 Step-by-Step",
    stepsSubBefore: "Running a ",
    stepsSubBold: "free VIN check in Florida",
    stepsSubAfter: " takes under two minutes.",
    steps: [
      { step: "01", title: "Locate the VIN on the vehicle", body: "The VIN is a 17-character code found in three easy locations: (1) the dashboard, visible through the lower-left corner of the windshield from outside the vehicle; (2) the driver-side door jamb sticker; (3) the vehicle title or registration document. On motorcycles, the VIN is typically stamped on the steering head or engine block. Always verify all three locations match \u2014 mismatches are a serious red flag." },
      { step: "02", title: "Enter the VIN above", body: "Paste or type the 17-character VIN into the search box at the top of this page. Our system auto-validates the format, including the check digit (position 9), to catch transposition errors before you run the report." },
      { step: "03", title: "Review Florida title records first", body: "The most critical section for Florida vehicles is title history. Look for these brands specifically: Salvage, Rebuilt/Reconstructed, Flood/Water Damage, Lemon Law Buyback, and Odometer Discrepancy. Any of these require careful negotiation or a professional inspection before purchase." },
      { step: "04", title: "Check accident and damage records", body: "Florida accident records come from insurance company filings, body shop repair orders, and law enforcement accident reports. Even minor collisions can affect safety systems, frame integrity, and resale value. Our report flags airbag deployments separately \u2014 a deployed airbag that was never replaced is a major safety issue." },
      { step: "05", title: "Verify the odometer history", body: "Cross-reference each mileage reading in the odometer history section. Readings should increase consistently. A drop in mileage or a multi-year gap with no records is a strong indicator of odometer tampering \u2014 a federal crime and a common fraud tactic in the Florida private-party market." },
      { step: "06", title: "Check open recalls before you register", body: "Florida DHSMV does not require sellers to disclose open recalls. Our report pulls all NHTSA recall data so you know before you buy \u2014 and before the next registration renewal when a recall notification could ground the vehicle." },
    ],
    brandsHeading: "Florida Title Brands You Must Know Before Buying",
    brandsSubBefore:
      "Florida DHSMV stamps every titled vehicle with one or more brands that follow it permanently. A ",
    brandsSubBold: "Florida title search by VIN",
    brandsSubAfter: " reveals these brands even if the vehicle was re-titled in another state.",
    titleBrands: [
      { brand: "Salvage",          desc: "Vehicle was declared a total loss by an insurer. May be unsafe or uninsurable." },
      { brand: "Rebuilt / Reconstructed", desc: "Was salvage, repaired, and re-inspected. Must be disclosed by Florida law." },
      { brand: "Flood",            desc: "Water damage reported. Extremely common in Florida after hurricanes." },
      { brand: "Lemon Buyback",    desc: "Manufacturer repurchased the vehicle under Florida\u2019s Lemon Law." },
      { brand: "Odometer Rollback", desc: "Mileage discrepancy recorded by DMV or insurance data." },
      { brand: "Junk",             desc: "Designated for scrap. Cannot be legally retitled or driven on Florida roads." },
    ],
    brandsCalloutBold: "Florida law (\u00a7 319.14, F.S.)",
    brandsCalloutMid:
      " requires sellers to disclose rebuilt, salvage, and flood titles. However, enforcement is inconsistent in private-party transactions. Always run a ",
    brandsCalloutBold2: "Florida vehicle history report",
    brandsCalloutAfter: " independently \u2014 don\u2019t rely solely on seller disclosure.",
    dhsmvHeading: "Florida DHSMV VIN Check vs. Our Free Report",
    dhsmvLeadBefore:
      "The Florida Department of Highway Safety and Motor Vehicles (DHSMV) maintains the official state vehicle title and registration database. Here\u2019s how a ",
    dhsmvLeadBold: "Florida DMV VIN check",
    dhsmvLeadAfter: " compares to our free report:",
    tableHeaders: { feature: "Data Point", us: "CarCheckerVIN (Free)", dmv: "DHSMV Direct ($)" },
    tableRows: [
      ["Florida title status",         true,  true],
      ["Title brands (salvage, flood)", true,  true],
      ["Lienholder information",        true,  true],
      ["Accident / damage records",     true,  false],
      ["National history (all 50 states)", true, false],
      ["Odometer fraud detection",      true,  false],
      ["Recall status",                 true,  false],
      ["Real vehicle photos",           true,  false],
      ["Cost",                          "Free", "$5\u201325 + form"],
      ["Turnaround",                    "< 5 sec", "1\u20135 business days"],
    ] as Array<[string, boolean | string, boolean | string]>,
    tableNoLabel: "No",
    tableFootBefore: "For a certified title copy for legal or financial purposes, request directly from ",
    tableFootBold: "Florida DHSMV at flhsmv.gov",
    tableFootAfter: ". Our report is for pre-purchase due diligence.",
    motoHeading: "Motorcycle VIN Check in Florida",
    motoLeadBefore:
      "Florida is one of the top motorcycle markets in the US \u2014 year-round riding weather drives high demand for used bikes. A ",
    motoLeadBold: "motorcycle VIN check in Florida",
    motoLeadAfter: " follows the same process as a passenger vehicle, with a few differences:",
    motoCards: [
      { title: "Where to find the motorcycle VIN", body: "The VIN is usually stamped on the steering head (headstock) \u2014 look at the front of the frame where the fork meets the frame. It\u2019s also on the engine case and on the title document." },
      { title: "Florida titles motorcycles separately", body: "DHSMV issues a specific Motorcycle Certificate of Title. Salvage and flood brands apply to motorcycles just like cars. Always verify the title type before buying." },
      { title: "Flood risk is high", body: "South Florida\u2019s flooding means motorcycles \u2014 often stored outdoors or in garages \u2014 are particularly susceptible to flood damage that doesn\u2019t always result in a title brand." },
      { title: "Theft is a major concern", body: "Florida ranks in the top 5 states for motorcycle theft. Our report cross-references the NICB database for theft records on every two-wheeled VIN." },
    ],
    motoCta: "Run a Florida Motorcycle VIN Check",
    ownerHeading: "VIN Owner Lookup in Florida \u2014 What You Can (and Can\u2019t) Access",
    ownerCalloutBold: "federal Driver\u2019s Privacy Protection Act (DPPA, 18 U.S.C. \u00a7 2721)",
    ownerCalloutAfter:
      " and Florida Statute \u00a7 119.0712, owner names, addresses, and phone numbers tied to vehicle registrations are protected private information. No consumer VIN lookup service \u2014 including ours \u2014 can legally return owner identity from a VIN search. Any service claiming to provide this is operating outside the law.",
    ownerCalloutBefore: "Under the ",
    ownerLeadBefore: "What a ",
    ownerLeadBold: "VIN owner lookup in Florida",
    ownerLeadMid: " ",
    ownerLeadEm: "can",
    ownerLeadAfter: " legally provide:",
    ownerBullets: [
      "Number of previous owners (count, not names)",
      "Whether the title was issued to a private individual, dealer, or fleet/rental company",
      "State(s) where the vehicle was previously titled",
      "Length of time each title was held (approximate)",
      "Whether any title was issued to a business entity (rental, fleet, lease)",
    ],
    midCtaHeading: "Ready to Check a Florida VIN?",
    midCtaSub: "Free, instant, no credit card. Get the full Florida vehicle history report in under 5 seconds.",
    linksHeading: "More Florida Vehicle Check Tools",
    linksSub: "Dig deeper into specific Florida vehicle concerns with these targeted tools.",
    internalLinks: [
      { href: "/salvage-title-check",    label: "Salvage Title Check",         desc: "Verify if a vehicle carries a Florida salvage brand." },
      { href: "/accident-history-check", label: "Accident History Check",      desc: "Deep dive into collision and damage records." },
      { href: "/flood-check",            label: "Flood Damage Check",          desc: "Critical for any vehicle that spent time in Florida." },
      { href: "/odometer-check",         label: "Odometer Check",              desc: "Detect rollback and mileage fraud." },
      { href: "/license-plate-lookup",   label: "Florida Plate Lookup",        desc: "Find the VIN from any Florida plate number." },
      { href: "/motorcycle-vin-search",  label: "Motorcycle VIN Check",        desc: "FL title history for motorcycles and scooters." },
      { href: "/lemon-check",            label: "Lemon Law Buyback Check",     desc: "Find Florida lemon buyback records." },
      { href: "/vehicle-lien-check",     label: "Lien Check",                  desc: "Verify outstanding loans on any Florida vehicle." },
    ],
    faqHeading: "Frequently Asked Questions \u2014 Florida VIN Check",
    faqSub: "Long-tail answers to the questions Florida car buyers search most.",
    bottomBadge: "Free \u00b7 Instant \u00b7 No Sign-Up",
    bottomHeading: "Protect Yourself Before You Buy in Florida",
    bottomSub:
      "Florida\u2019s used car market is one of the riskiest in the US for hidden flood damage, title washing, and odometer fraud. A free VIN check takes 5 seconds and could save you thousands.",
    sourcesHeading: "Sources & Data Authority",
    sourcesIntro:
      "Every claim on this page traces back to a public, authoritative US source. Below are the primary references our Florida VIN check uses and the agencies you can cross-check with.",
    sources: [
      { href: "https://services.flhsmv.gov/mvcheckweb/", label: "Florida DHSMV \u2014 Motor Vehicle Check", note: "Official Florida title and registration verification." },
      { href: "https://vehiclehistory.bja.ojp.gov/", label: "NMVTIS \u2014 Bureau of Justice Assistance", note: "Federal National Motor Vehicle Title Information System." },
      { href: "https://www.nhtsa.gov/recalls", label: "NHTSA \u2014 Safety Recalls", note: "Authoritative open-recall database for every US VIN." },
      { href: "https://www.nicb.org/vincheck", label: "NICB VINCheck", note: "Stolen-vehicle & salvage reports from insurance carriers." },
      { href: "https://www.iihs.org/topics/auto-theft", label: "IIHS \u2014 Auto Theft Statistics", note: "Independent vehicle-theft research used in Florida risk modelling." },
      { href: "http://www.leg.state.fl.us/Statutes/index.cfm?App_mode=Display_Statute&URL=0300-0399/0319/Sections/0319.14.html", label: "Florida Statutes \u00a7 319.14", note: "Statute governing salvage and rebuilt title brands." },
    ],
    sourcesFooter:
      "Data accuracy is verified against NMVTIS, NHTSA, NICB, and Florida DHSMV records at the time of each lookup. Statistics on this page are sourced from Carfax post-Hurricane Ian impact estimates and the NICB 2023 Hot Spots Report.",
  },
  es: {
    crumbs: { home: "Inicio", current: "Verificaci\u00f3n VIN de Florida" },
    badge: "Florida (FL)  \u00b7  Datos del DHSMV",
    h1Lead: "Verificaci\u00f3n VIN de Florida \u2014 ",
    h1Accent: "Historial vehicular gratis de FL",
    intro:
      "Acceso instant\u00e1neo a los registros del DHSMV de Florida, marcas de t\u00edtulo, historial de accidentes, da\u00f1os por inundaci\u00f3n y datos del od\u00f3metro de cualquier veh\u00edculo. Gratis, sin tarjeta de cr\u00e9dito, sin registro \u2014 resultados en menos de 5 segundos.",
    searchHeading: "Ejecuta tu verificaci\u00f3n VIN gratis de Florida",
    searchSub: "Ingresa cualquier VIN de 17 caracteres \u2014 autos, camionetas, motocicletas, RVs",
    searchSecurity: "Cifrado de 256 bits \u00b7 Cumple con DPPA \u00b7 No almacenamos datos personales",
    trustStats: [
      { value: "4.8M+",   label: "veh\u00edculos de FL en la base" },
      { value: "NMVTIS",  label: "fuente de datos certificada" },
      { value: "< 5 seg", label: "tiempo promedio del reporte" },
      { value: "Gratis",  label: "sin tarjeta de cr\u00e9dito" },
    ],
    statsHeading: "Verificaci\u00f3n VIN de Florida \u2014 En n\u00fameros",
    headlineStats: [
      { value: "4.8M+",    label: "veh\u00edculos registrados en Florida verificados" },
      { value: "51",       label: "marcas de t\u00edtulo rastreadas en todos los DMV estatales" },
      { value: "<5 seg",   label: "Tiempo promedio para decodificar un VIN" },
      { value: "\u00a7 319.14", label: "Estatuto de Florida que rige las marcas de t\u00edtulo de salvamento" },
      { value: "$0",       label: "Costo de la vista previa gratuita" },
    ],
    whyHeading: "Por qu\u00e9 una verificaci\u00f3n VIN de Florida es distinta a la de otros estados",
    whyP1Before:
      "Florida es uno de los estados m\u00e1s importantes que debes revisar al comprar un veh\u00edculo usado \u2014 y uno de los m\u00e1s riesgosos de saltarte. El Estado del Sol figura consistentemente entre los ",
    whyP1Bold: "5 primeros estados a nivel nacional en registros de veh\u00edculos de salvamento",
    whyP1Mid:
      ", marcas de t\u00edtulo por inundaci\u00f3n y casos de fraude de od\u00f3metro. Los datos federales cuantifican el riesgo: se estima que ",
    whyP1Link1: "358,000 veh\u00edculos sufrieron da\u00f1os por inundaci\u00f3n en Florida tras el hurac\u00e1n Ian (Carfax, 2022)",
    whyP1Mid2: ", y Florida ocupa el ",
    whyP1Link2: "puesto #4 a nivel nacional en robos de veh\u00edculos con 31,419 robos en 2023 (NICB)",
    whyP1After: ". Esto es por qu\u00e9 importa:",
    whyBullets: [
      { icon: "\ud83c\udf00", point: "Exposici\u00f3n a huracanes", detail: "Florida es golpeada por m\u00e1s huracanes y tormentas tropicales que cualquier otro estado de EE. UU. Tras eventos como el hurac\u00e1n Ian (2022), Irma (2017) y Michael (2018), decenas de miles de veh\u00edculos con p\u00e9rdida total por inundaci\u00f3n entraron al mercado de usados \u2014 muchos con t\u00edtulos lavados o de otros estados." },
      { icon: "\ud83d\udea2", point: "Puerto de entrada", detail: "Miami y Jacksonville son puertos importantes para veh\u00edculos importados. Los autos de otros estados e internacionales entran con frecuencia con historiales incompletos o tergiversados." },
      { icon: "\ud83d\udc74", point: "Alta rotaci\u00f3n estacional", detail: "La numerosa poblaci\u00f3n de snowbirds en Florida significa que los veh\u00edculos cambian de manos con frecuencia entre particulares \u2014 evitando los requisitos de divulgaci\u00f3n de los concesionarios." },
      { icon: "\u2600\ufe0f", point: "Da\u00f1os por sol y sal", detail: "La degradaci\u00f3n por rayos UV y el aire salino costero causan da\u00f1os cosm\u00e9ticos y estructurales que los vendedores suelen ocultar. Un reporte de historial por VIN saca a la luz reclamos previos de da\u00f1os aunque el veh\u00edculo se vea limpio." },
    ],
    whyP2Before: "Una ",
    whyP2Bold: "verificaci\u00f3n VIN del DMV de Florida",
    whyP2After:
      " obtiene los registros directamente del Departamento de Seguridad Vial y Veh\u00edculos Motorizados de Florida (DHSMV) \u2014 la agencia estatal responsable de la matriculaci\u00f3n y titulaci\u00f3n de veh\u00edculos. Combinada con NMVTIS (el Sistema Nacional Federal de Informaci\u00f3n de T\u00edtulos de Veh\u00edculos Motorizados) y datos nacionales de seguros, nuestra verificaci\u00f3n VIN gratis te da la imagen m\u00e1s completa disponible.",
    reportHeading: "Qu\u00e9 incluye tu reporte gratis de historial vehicular de Florida",
    reportSub:
      "Nuestra b\u00fasqueda VIN de Florida agrega datos del DHSMV, NMVTIS, NICB, NHTSA y proveedores autorizados de historial de seguros en un solo reporte.",
    reportItems: [
      { icon: FileText,    title: "Historial de t\u00edtulos",      desc: "Cada t\u00edtulo emitido en Florida y en los otros 49 estados, incluidas marcas, acreedores con gravamen y transferencias de propiedad." },
      { icon: AlertCircle, title: "Registros de accidentes",   desc: "Datos de colisiones de aseguradoras, talleres de reparaci\u00f3n y reportes del DMV estatal." },
      { icon: Search,      title: "Lecturas del od\u00f3metro",  desc: "Capturas de kilometraje de cada tr\u00e1mite del DMV, inspecci\u00f3n y evento de seguro." },
      { icon: Shield,      title: "Registros de robo",      desc: "Cotejo con la base de veh\u00edculos robados de la NICB \u2014 cr\u00edtico en las \u00e1reas metropolitanas de alto robo del sur de Florida." },
      { icon: Car,         title: "Estado de retiros del mercado",      desc: "Todos los retiros activos de seguridad de la NHTSA \u2014 ent\u00e9rate antes de matricular." },
      { icon: MapPin,      title: "Da\u00f1os por inundaci\u00f3n y huracanes", desc: "Marcas de t\u00edtulo por inundaci\u00f3n y registros de p\u00e9rdida total de los eventos de hurac\u00e1n en Florida." },
    ],
    stepsHeading: "C\u00f3mo verificar un VIN en Florida \u2014 Paso a paso",
    stepsSubBefore: "Ejecutar una ",
    stepsSubBold: "verificaci\u00f3n VIN gratis en Florida",
    stepsSubAfter: " toma menos de dos minutos.",
    steps: [
      { step: "01", title: "Localiza el VIN en el veh\u00edculo", body: "El VIN es un c\u00f3digo de 17 caracteres que se encuentra en tres lugares f\u00e1ciles: (1) el tablero, visible a trav\u00e9s de la esquina inferior izquierda del parabrisas desde fuera del veh\u00edculo; (2) la calcoman\u00eda del marco de la puerta del conductor; (3) el documento de t\u00edtulo o matriculaci\u00f3n. En motocicletas, el VIN suele estar grabado en la columna de direcci\u00f3n o en el bloque del motor. Siempre verifica que los tres lugares coincidan \u2014 las discrepancias son una bandera roja seria." },
      { step: "02", title: "Ingresa el VIN arriba", body: "Pega o escribe el VIN de 17 caracteres en la caja de b\u00fasqueda al inicio de esta p\u00e1gina. Nuestro sistema valida autom\u00e1ticamente el formato, incluido el d\u00edgito verificador (posici\u00f3n 9), para detectar errores de transcripci\u00f3n antes de ejecutar el reporte." },
      { step: "03", title: "Revisa primero los registros de t\u00edtulo de Florida", body: "La secci\u00f3n m\u00e1s cr\u00edtica para los veh\u00edculos de Florida es el historial de t\u00edtulos. Busca estas marcas espec\u00edficamente: Salvamento, Reconstruido, Da\u00f1o por inundaci\u00f3n/agua, Recompra por Ley Lim\u00f3n y Discrepancia de od\u00f3metro. Cualquiera de estas requiere negociaci\u00f3n cuidadosa o una inspecci\u00f3n profesional antes de comprar." },
      { step: "04", title: "Revisa los registros de accidentes y da\u00f1os", body: "Los registros de accidentes de Florida vienen de avisos de aseguradoras, \u00f3rdenes de reparaci\u00f3n de talleres y reportes policiales de accidentes. Incluso colisiones menores pueden afectar los sistemas de seguridad, la integridad del bastidor y el valor de reventa. Nuestro reporte marca los despliegues de bolsas de aire por separado \u2014 una bolsa de aire desplegada que nunca se reemplaz\u00f3 es un problema mayor de seguridad." },
      { step: "05", title: "Verifica el historial del od\u00f3metro", body: "Cruza cada lectura de kilometraje en la secci\u00f3n de historial del od\u00f3metro. Las lecturas deben aumentar de forma consistente. Una ca\u00edda en el kilometraje o una brecha de varios a\u00f1os sin registros es un fuerte indicador de manipulaci\u00f3n del od\u00f3metro \u2014 un delito federal y una t\u00e1ctica de fraude com\u00fan en el mercado entre particulares de Florida." },
      { step: "06", title: "Verifica los retiros abiertos antes de matricular", body: "El DHSMV de Florida no exige a los vendedores divulgar los retiros abiertos. Nuestro reporte trae todos los datos de retiros de la NHTSA para que sepas antes de comprar \u2014 y antes de la pr\u00f3xima renovaci\u00f3n de matr\u00edcula, cuando una notificaci\u00f3n de retiro podr\u00eda dejar fuera de circulaci\u00f3n al veh\u00edculo." },
    ],
    brandsHeading: "Marcas de t\u00edtulo de Florida que debes conocer antes de comprar",
    brandsSubBefore:
      "El DHSMV de Florida marca cada veh\u00edculo titulado con una o m\u00e1s marcas que lo siguen permanentemente. Una ",
    brandsSubBold: "b\u00fasqueda de t\u00edtulo de Florida por VIN",
    brandsSubAfter: " revela estas marcas incluso si el veh\u00edculo fue re-titulado en otro estado.",
    titleBrands: [
      { brand: "Salvamento",          desc: "El veh\u00edculo fue declarado p\u00e9rdida total por una aseguradora. Puede ser inseguro o no asegurable." },
      { brand: "Reconstruido", desc: "Fue salvamento, reparado y re-inspeccionado. Debe divulgarse por ley de Florida." },
      { brand: "Inundaci\u00f3n",            desc: "Da\u00f1o por agua reportado. Extremadamente com\u00fan en Florida tras huracanes." },
      { brand: "Recompra por Ley Lim\u00f3n",    desc: "El fabricante recompr\u00f3 el veh\u00edculo bajo la Ley Lim\u00f3n de Florida." },
      { brand: "Reversi\u00f3n de od\u00f3metro", desc: "Discrepancia de kilometraje registrada por el DMV o por datos de aseguradora." },
      { brand: "Chatarra",             desc: "Designado para desguace. No puede re-titularse legalmente ni conducirse en las carreteras de Florida." },
    ],
    brandsCalloutBold: "La ley de Florida (\u00a7 319.14, F.S.)",
    brandsCalloutMid:
      " exige a los vendedores divulgar los t\u00edtulos reconstruidos, de salvamento y de inundaci\u00f3n. Sin embargo, la aplicaci\u00f3n es inconsistente en las transacciones entre particulares. Siempre ejecuta un ",
    brandsCalloutBold2: "reporte de historial vehicular de Florida",
    brandsCalloutAfter: " de forma independiente \u2014 no dependas solo de la divulgaci\u00f3n del vendedor.",
    dhsmvHeading: "Verificaci\u00f3n VIN del DHSMV de Florida vs. nuestro reporte gratis",
    dhsmvLeadBefore:
      "El Departamento de Seguridad Vial y Veh\u00edculos Motorizados de Florida (DHSMV) mantiene la base oficial estatal de t\u00edtulos y matriculaci\u00f3n de veh\u00edculos. As\u00ed se compara una ",
    dhsmvLeadBold: "verificaci\u00f3n VIN del DMV de Florida",
    dhsmvLeadAfter: " con nuestro reporte gratis:",
    tableHeaders: { feature: "Dato", us: "CarCheckerVIN (Gratis)", dmv: "DHSMV directo ($)" },
    tableRows: [
      ["Estado del t\u00edtulo de Florida",         true,  true],
      ["Marcas de t\u00edtulo (salvamento, inundaci\u00f3n)", true,  true],
      ["Informaci\u00f3n del acreedor con gravamen",        true,  true],
      ["Registros de accidentes / da\u00f1os",     true,  false],
      ["Historial nacional (los 50 estados)", true, false],
      ["Detecci\u00f3n de fraude de od\u00f3metro",      true,  false],
      ["Estado de retiros",                 true,  false],
      ["Fotos reales del veh\u00edculo",           true,  false],
      ["Costo",                          "Gratis", "$5\u201325 + formulario"],
      ["Tiempo de respuesta",                    "< 5 seg", "1\u20135 d\u00edas h\u00e1biles"],
    ] as Array<[string, boolean | string, boolean | string]>,
    tableNoLabel: "No",
    tableFootBefore: "Para una copia certificada del t\u00edtulo con fines legales o financieros, sol\u00ed citala directamente al ",
    tableFootBold: "DHSMV de Florida en flhsmv.gov",
    tableFootAfter: ". Nuestro reporte es para la debida diligencia previa a la compra.",
    motoHeading: "Verificaci\u00f3n VIN para motocicletas en Florida",
    motoLeadBefore:
      "Florida es uno de los principales mercados de motocicletas de EE. UU. \u2014 el clima apto para conducir todo el a\u00f1o impulsa la alta demanda de motos usadas. Una ",
    motoLeadBold: "verificaci\u00f3n VIN para motocicletas en Florida",
    motoLeadAfter: " sigue el mismo proceso que un veh\u00edculo de pasajeros, con algunas diferencias:",
    motoCards: [
      { title: "D\u00f3nde encontrar el VIN de la motocicleta", body: "El VIN suele estar grabado en la columna de direcci\u00f3n (headstock) \u2014 mira al frente del bastidor donde la horquilla se une al chasis. Tambi\u00e9n est\u00e1 en la caja del motor y en el documento del t\u00edtulo." },
      { title: "Florida titula las motocicletas por separado", body: "El DHSMV emite un Certificado de T\u00edtulo espec\u00edfico para motocicletas. Las marcas de salvamento e inundaci\u00f3n aplican a las motocicletas igual que a los autos. Siempre verifica el tipo de t\u00edtulo antes de comprar." },
      { title: "El riesgo de inundaci\u00f3n es alto", body: "Las inundaciones del sur de Florida significan que las motocicletas \u2014 a menudo guardadas a la intemperie o en cocheras \u2014 son particularmente susceptibles a da\u00f1os por inundaci\u00f3n que no siempre resultan en una marca de t\u00edtulo." },
      { title: "El robo es una preocupaci\u00f3n mayor", body: "Florida figura entre los 5 primeros estados en robo de motocicletas. Nuestro reporte coteja la base de la NICB para registros de robo en cada VIN de dos ruedas." },
    ],
    motoCta: "Ejecutar una verificaci\u00f3n VIN para motocicleta en Florida",
    ownerHeading: "B\u00fasqueda de due\u00f1o por VIN en Florida \u2014 Lo que puedes (y no puedes) acceder",
    ownerCalloutBefore: "Bajo la ",
    ownerCalloutBold: "Ley federal de Protecci\u00f3n de la Privacidad del Conductor (DPPA, 18 U.S.C. \u00a7 2721)",
    ownerCalloutAfter:
      " y el Estatuto de Florida \u00a7 119.0712, los nombres, direcciones y tel\u00e9fonos de los due\u00f1os vinculados a la matriculaci\u00f3n de veh\u00edculos son informaci\u00f3n privada protegida. Ning\u00fan servicio de b\u00fasqueda VIN al consumidor \u2014 incluido el nuestro \u2014 puede devolver legalmente la identidad del due\u00f1o desde una b\u00fasqueda VIN. Cualquier servicio que diga proveerlo opera fuera de la ley.",
    ownerLeadBefore: "Lo que una ",
    ownerLeadBold: "b\u00fasqueda de due\u00f1o por VIN en Florida",
    ownerLeadMid: " ",
    ownerLeadEm: "s\u00ed",
    ownerLeadAfter: " puede proveer legalmente:",
    ownerBullets: [
      "N\u00famero de due\u00f1os anteriores (cantidad, no nombres)",
      "Si el t\u00edtulo se emiti\u00f3 a un particular, concesionario o empresa de flota/renta",
      "Estado(s) donde el veh\u00edculo fue titulado previamente",
      "Tiempo aproximado en que se mantuvo cada t\u00edtulo",
      "Si alg\u00fan t\u00edtulo se emiti\u00f3 a una entidad comercial (renta, flota, arrendamiento)",
    ],
    midCtaHeading: "\u00bfListo para verificar un VIN de Florida?",
    midCtaSub: "Gratis, instant\u00e1neo, sin tarjeta de cr\u00e9dito. Obt\u00e9n el reporte completo de historial vehicular de Florida en menos de 5 segundos.",
    linksHeading: "M\u00e1s herramientas de verificaci\u00f3n de veh\u00edculos en Florida",
    linksSub: "Profundiza en preocupaciones espec\u00edficas de veh\u00edculos en Florida con estas herramientas enfocadas.",
    internalLinks: [
      { href: "/salvage-title-check",    label: "Verificaci\u00f3n de t\u00edtulo de salvamento",         desc: "Verifica si un veh\u00edculo lleva una marca de salvamento de Florida." },
      { href: "/accident-history-check", label: "Verificaci\u00f3n de historial de accidentes",      desc: "An\u00e1lisis profundo de registros de colisiones y da\u00f1os." },
      { href: "/flood-check",            label: "Verificaci\u00f3n de da\u00f1o por inundaci\u00f3n",          desc: "Cr\u00edtico para cualquier veh\u00edculo que estuvo en Florida." },
      { href: "/odometer-check",         label: "Verificaci\u00f3n de od\u00f3metro",              desc: "Detecta reversi\u00f3n y fraude de kilometraje." },
      { href: "/license-plate-lookup",   label: "B\u00fasqueda de placa de Florida",        desc: "Encuentra el VIN a partir de cualquier placa de Florida." },
      { href: "/motorcycle-vin-search",  label: "Verificaci\u00f3n VIN de motocicleta",        desc: "Historial de t\u00edtulo de FL para motocicletas y scooters." },
      { href: "/lemon-check",            label: "Verificaci\u00f3n de recompra por Ley Lim\u00f3n",     desc: "Encuentra registros de recompra por Ley Lim\u00f3n en Florida." },
      { href: "/vehicle-lien-check",     label: "Verificaci\u00f3n de gravamen",                  desc: "Verifica pr\u00e9stamos pendientes en cualquier veh\u00edculo de Florida." },
    ],
    faqHeading: "Preguntas frecuentes \u2014 Verificaci\u00f3n VIN de Florida",
    faqSub: "Respuestas detalladas a las preguntas que los compradores de autos en Florida buscan m\u00e1s.",
    bottomBadge: "Gratis \u00b7 Al instante \u00b7 Sin registro",
    bottomHeading: "Prot\u00e9gete antes de comprar en Florida",
    bottomSub:
      "El mercado de autos usados de Florida es uno de los m\u00e1s riesgosos de EE. UU. por da\u00f1os ocultos por inundaci\u00f3n, lavado de t\u00edtulo y fraude de od\u00f3metro. Una verificaci\u00f3n VIN gratis toma 5 segundos y podr\u00eda ahorrarte miles.",
    sourcesHeading: "Fuentes y autoridad de los datos",
    sourcesIntro:
      "Cada afirmaci\u00f3n en esta p\u00e1gina se rastrea hasta una fuente p\u00fablica y autorizada de EE. UU. A continuaci\u00f3n est\u00e1n las referencias principales que usa nuestra verificaci\u00f3n VIN de Florida y las agencias con las que puedes cotejar.",
    sources: [
      { href: "https://services.flhsmv.gov/mvcheckweb/", label: "DHSMV de Florida \u2014 Verificaci\u00f3n de veh\u00edculos motorizados", note: "Verificaci\u00f3n oficial de t\u00edtulo y matriculaci\u00f3n en Florida." },
      { href: "https://vehiclehistory.bja.ojp.gov/", label: "NMVTIS \u2014 Bureau of Justice Assistance", note: "Sistema Nacional Federal de Informaci\u00f3n de T\u00edtulos de Veh\u00edculos Motorizados." },
      { href: "https://www.nhtsa.gov/recalls", label: "NHTSA \u2014 Retiros de seguridad", note: "Base autorizada de retiros abiertos para cualquier VIN de EE. UU." },
      { href: "https://www.nicb.org/vincheck", label: "NICB VINCheck", note: "Reportes de veh\u00edculos robados y de salvamento de las aseguradoras." },
      { href: "https://www.iihs.org/topics/auto-theft", label: "IIHS \u2014 Estad\u00edsticas de robos de autos", note: "Investigaci\u00f3n independiente de robo de veh\u00edculos usada en el modelado de riesgo de Florida." },
      { href: "http://www.leg.state.fl.us/Statutes/index.cfm?App_mode=Display_Statute&URL=0300-0399/0319/Sections/0319.14.html", label: "Estatutos de Florida \u00a7 319.14", note: "Estatuto que rige las marcas de t\u00edtulo de salvamento y reconstruido." },
    ],
    sourcesFooter:
      "La precisi\u00f3n de los datos se verifica contra NMVTIS, NHTSA, NICB y los registros del DHSMV de Florida en el momento de cada b\u00fasqueda. Las estad\u00edsticas en esta p\u00e1gina provienen de las estimaciones de impacto post-hurac\u00e1n Ian de Carfax y del Reporte Hot Spots 2023 de la NICB.",
  },
  fr: {
    crumbs: { home: "Accueil", current: "Vérification VIN Florida" },
    badge: "Florida (FL)  \u00b7  Données DHSMV",
    h1Lead: "Vérification VIN Florida \u2014 ",
    h1Accent: "Historique véhicule FL gratuit",
    intro:
      "Accès instantané aux dossiers du DHSMV de Florida, marques de titre, historique d'accidents, dégâts par inondation et données d'odomètre pour n'importe quel véhicule. Gratuit, sans carte de crédit, sans inscription \u2014 résultats en moins de 5 secondes.",
    searchHeading: "Lance ta vérification VIN Florida gratuite",
    searchSub: "Saisis n'importe quel VIN de 17 caractères \u2014 voitures particulières, camions, motos, RVs",
    searchSecurity: "Chiffré 256 bits \u00b7 Conforme DPPA \u00b7 Aucune donnée personnelle stockée",
    trustStats: [
      { value: "4.8M+",   label: "véhicules FL dans la base" },
      { value: "NMVTIS",  label: "source de données certifiée" },
      { value: "< 5 sec", label: "temps moyen du rapport" },
      { value: "Gratuit", label: "sans carte de crédit" },
    ],
    statsHeading: "Vérification VIN Florida \u2014 En chiffres",
    headlineStats: [
      { value: "4.8M+",    label: "véhicules immatriculés en Florida vérifiés" },
      { value: "51",       label: "marques de titre suivies dans tous les DMV d'état" },
      { value: "<5 sec",   label: "Temps moyen pour décoder un VIN" },
      { value: "\u00a7 319.14", label: "Statut de Florida régissant les marques de salvage" },
      { value: "$0",       label: "Coût de l'aperçu gratuit" },
    ],
    whyHeading: "Pourquoi une vérification VIN Florida est différente des autres états",
    whyP1Before:
      "Florida est l'un des états les plus importants à vérifier lorsque tu achètes un véhicule d'occasion \u2014 et l'un des plus risqués à sauter. Le Sunshine State se classe régulièrement parmi les ",
    whyP1Bold: "5 premiers états au niveau national pour les enregistrements de véhicules salvage",
    whyP1Mid:
      ", les marques de titre par inondation et les cas de fraude d'odomètre. Les données fédérales quantifient le risque : on estime que ",
    whyP1Link1: "358 000 véhicules ont été endommagés par les inondations en Florida après l'ouragan Ian (Carfax, 2022)",
    whyP1Mid2: ", et Florida occupe le ",
    whyP1Link2: "rang #4 au niveau national pour le vol de véhicules avec 31 419 vols en 2023 (NICB)",
    whyP1After: ". Voici pourquoi c'est important :",
    whyBullets: [
      { icon: "\ud83c\udf00", point: "Exposition aux ouragans", detail: "Florida est frappée par plus d'ouragans et de tempêtes tropicales que tout autre état des US. Après des événements comme l'ouragan Ian (2022), Irma (2017) et Michael (2018), des dizaines de milliers de véhicules en perte totale par inondation sont entrés sur le marché de l'occasion \u2014 beaucoup avec des titres lavés ou d'autres états." },
      { icon: "\ud83d\udea2", point: "Port d'entrée", detail: "Miami et Jacksonville sont des ports majeurs pour les véhicules importés. Les véhicules d'autres états et internationaux entrent fréquemment avec des historiques incomplets ou déformés." },
      { icon: "\ud83d\udc74", point: "Forte rotation saisonnière", detail: "La grande population de snowbirds en Florida signifie que les véhicules changent fréquemment de mains entre particuliers \u2014 contournant les exigences de divulgation des concessionnaires." },
      { icon: "\u2600\ufe0f", point: "Dégâts par soleil et sel", detail: "La dégradation par UV et l'air salin côtier causent des dégâts cosmétiques et structurels que les vendeurs cachent régulièrement. Un rapport d'historique par VIN fait remonter les réclamations de dégâts antérieures même lorsque le véhicule semble propre." },
    ],
    whyP2Before: "Une ",
    whyP2Bold: "vérification VIN du DMV de Florida",
    whyP2After:
      " récupère les dossiers directement du Florida Department of Highway Safety and Motor Vehicles (DHSMV) \u2014 l'agence d'état responsable de l'immatriculation et du titrage des véhicules. Combinée à NMVTIS (le National Motor Vehicle Title Information System fédéral) et aux données nationales d'assurance, notre vérification VIN gratuite te donne l'image la plus complète disponible.",
    reportHeading: "Ce qu'inclut ton rapport d'historique véhicule Florida gratuit",
    reportSub:
      "Notre recherche VIN Florida agrège les données du DHSMV, NMVTIS, NICB, NHTSA et des fournisseurs d'historique d'assurance licenciés dans un seul rapport.",
    reportItems: [
      { icon: FileText,    title: "Historique de titre",      desc: "Chaque titre émis en Florida et dans les 49 autres états, y compris les marques, les créanciers et les transferts de propriété." },
      { icon: AlertCircle, title: "Dossiers d'accidents",   desc: "Données de collision des compagnies d'assurance, ateliers de réparation et rapports du DMV d'état." },
      { icon: Search,      title: "Lectures d'odomètre",  desc: "Instantanés du kilométrage de chaque transaction du DMV, inspection et événement d'assurance." },
      { icon: Shield,      title: "Dossiers de vol",      desc: "Croisement avec la base de véhicules volés de la NICB \u2014 critique dans les zones métropolitaines à haut taux de vol du sud de la Florida." },
      { icon: Car,         title: "Statut des rappels",      desc: "Tous les rappels de sécurité ouverts de la NHTSA \u2014 sache avant d'immatriculer." },
      { icon: MapPin,      title: "Dégâts par inondation et ouragans", desc: "Marques de titre par inondation et dossiers de perte totale des événements d'ouragan en Florida." },
    ],
    stepsHeading: "Comment vérifier un VIN en Florida \u2014 Étape par étape",
    stepsSubBefore: "Lancer une ",
    stepsSubBold: "vérification VIN gratuite en Florida",
    stepsSubAfter: " prend moins de deux minutes.",
    steps: [
      { step: "01", title: "Localise le VIN sur le véhicule", body: "Le VIN est un code de 17 caractères que l'on trouve dans trois endroits faciles : (1) le tableau de bord, visible à travers le coin inférieur gauche du pare-brise depuis l'extérieur du véhicule ; (2) l'autocollant du chambranle de porte conducteur ; (3) le document de titre ou d'immatriculation. Sur les motos, le VIN est généralement gravé sur la colonne de direction ou le bloc moteur. Vérifie toujours que les trois emplacements correspondent \u2014 les divergences sont un drapeau rouge sérieux." },
      { step: "02", title: "Saisis le VIN ci-dessus", body: "Colle ou tape le VIN de 17 caractères dans la boîte de recherche en haut de cette page. Notre système valide automatiquement le format, y compris le chiffre de contrôle (position 9), pour détecter les erreurs de transcription avant de lancer le rapport." },
      { step: "03", title: "Examine d'abord les dossiers de titre de Florida", body: "La section la plus critique pour les véhicules de Florida est l'historique de titre. Cherche spécifiquement ces marques : Salvage, Rebuilt/Reconstructed, Flood/Water Damage, Lemon Law Buyback et Odometer Discrepancy. Toutes ces marques nécessitent une négociation prudente ou une inspection professionnelle avant l'achat." },
      { step: "04", title: "Vérifie les dossiers d'accidents et de dégâts", body: "Les dossiers d'accidents en Florida proviennent des dépôts de compagnies d'assurance, des ordres de réparation de carrosserie et des rapports d'accidents des forces de l'ordre. Même les collisions mineures peuvent affecter les systèmes de sécurité, l'intégrité du châssis et la valeur de revente. Notre rapport signale séparément les déploiements d'airbags \u2014 un airbag déployé qui n'a jamais été remplacé est un problème majeur de sécurité." },
      { step: "05", title: "Vérifie l'historique d'odomètre", body: "Croise chaque lecture de kilométrage dans la section d'historique d'odomètre. Les lectures doivent augmenter de manière cohérente. Une baisse du kilométrage ou un écart de plusieurs années sans dossiers est un fort indicateur de manipulation d'odomètre \u2014 un crime fédéral et une tactique de fraude courante sur le marché entre particuliers en Florida." },
      { step: "06", title: "Vérifie les rappels ouverts avant d'immatriculer", body: "Le DHSMV de Florida n'exige pas que les vendeurs divulguent les rappels ouverts. Notre rapport extrait toutes les données de rappels de la NHTSA pour que tu saches avant d'acheter \u2014 et avant le prochain renouvellement d'immatriculation où une notification de rappel pourrait immobiliser le véhicule." },
    ],
    brandsHeading: "Marques de titre de Florida que tu dois connaître avant d'acheter",
    brandsSubBefore:
      "Le DHSMV de Florida appose à chaque véhicule titré une ou plusieurs marques qui le suivent en permanence. Une ",
    brandsSubBold: "recherche de titre de Florida par VIN",
    brandsSubAfter: " révèle ces marques même si le véhicule a été re-titré dans un autre état.",
    titleBrands: [
      { brand: "Salvage",          desc: "Le véhicule a été déclaré perte totale par un assureur. Peut être dangereux ou non assurable." },
      { brand: "Rebuilt / Reconstructed", desc: "Était salvage, réparé et ré-inspecté. Doit être divulgué par la loi de Florida." },
      { brand: "Flood",            desc: "Dégâts d'eau signalés. Extrêmement courant en Florida après les ouragans." },
      { brand: "Lemon Buyback",    desc: "Le fabricant a racheté le véhicule sous la lemon law de Florida." },
      { brand: "Odometer Rollback", desc: "Divergence de kilométrage enregistrée par le DMV ou les données d'assurance." },
      { brand: "Junk",             desc: "Destiné à la casse. Ne peut pas être légalement re-titré ou conduit sur les routes de Florida." },
    ],
    brandsCalloutBold: "La loi de Florida (\u00a7 319.14, F.S.)",
    brandsCalloutMid:
      " exige des vendeurs qu'ils divulguent les titres rebuilt, salvage et flood. Cependant, l'application est incohérente dans les transactions entre particuliers. Lance toujours un ",
    brandsCalloutBold2: "rapport d'historique véhicule de Florida",
    brandsCalloutAfter: " indépendamment \u2014 ne te fie pas uniquement à la divulgation du vendeur.",
    dhsmvHeading: "Vérification VIN du DHSMV de Florida vs. notre rapport gratuit",
    dhsmvLeadBefore:
      "Le Florida Department of Highway Safety and Motor Vehicles (DHSMV) maintient la base de données officielle d'état des titres et de l'immatriculation de véhicules. Voici comment une ",
    dhsmvLeadBold: "vérification VIN du DMV de Florida",
    dhsmvLeadAfter: " se compare à notre rapport gratuit :",
    tableHeaders: { feature: "Donnée", us: "CarCheckerVIN (Gratuit)", dmv: "DHSMV direct ($)" },
    tableRows: [
      ["Statut du titre de Florida",         true,  true],
      ["Marques de titre (salvage, flood)", true,  true],
      ["Informations du créancier",        true,  true],
      ["Dossiers d'accidents / dégâts",     true,  false],
      ["Historique national (50 états)", true, false],
      ["Détection de fraude d'odomètre",      true,  false],
      ["Statut des rappels",                 true,  false],
      ["Vraies photos du véhicule",           true,  false],
      ["Coût",                          "Gratuit", "$5\u201325 + formulaire"],
      ["Délai",                    "< 5 sec", "1\u20135 jours ouvrables"],
    ] as Array<[string, boolean | string, boolean | string]>,
    tableNoLabel: "Non",
    tableFootBefore: "Pour une copie certifiée du titre à des fins légales ou financières, demande-la directement au ",
    tableFootBold: "DHSMV de Florida sur flhsmv.gov",
    tableFootAfter: ". Notre rapport est pour la diligence raisonnable pré-achat.",
    motoHeading: "Vérification VIN pour motos en Florida",
    motoLeadBefore:
      "Florida est l'un des principaux marchés de motos aux US \u2014 le climat propice à la conduite toute l'année stimule la forte demande pour les motos d'occasion. Une ",
    motoLeadBold: "vérification VIN pour motos en Florida",
    motoLeadAfter: " suit le même processus qu'un véhicule de passagers, avec quelques différences :",
    motoCards: [
      { title: "Où trouver le VIN de la moto", body: "Le VIN est généralement gravé sur la colonne de direction (headstock) \u2014 regarde à l'avant du châssis là où la fourche rencontre le châssis. Il est aussi sur le carter moteur et sur le document de titre." },
      { title: "Florida titre les motos séparément", body: "Le DHSMV émet un Motorcycle Certificate of Title spécifique. Les marques salvage et flood s'appliquent aux motos comme aux voitures. Vérifie toujours le type de titre avant d'acheter." },
      { title: "Le risque d'inondation est élevé", body: "Les inondations du sud de la Florida signifient que les motos \u2014 souvent stockées à l'extérieur ou dans des garages \u2014 sont particulièrement sensibles aux dégâts par inondation qui n'aboutissent pas toujours à une marque de titre." },
      { title: "Le vol est une préoccupation majeure", body: "Florida figure parmi les 5 premiers états pour le vol de motos. Notre rapport croise avec la base de la NICB pour les dossiers de vol sur chaque VIN à deux roues." },
    ],
    motoCta: "Lancer une vérification VIN pour moto en Florida",
    ownerHeading: "Recherche de propriétaire par VIN en Florida \u2014 Ce que tu peux (et ne peux pas) accéder",
    ownerCalloutBold: "fédéral Driver's Privacy Protection Act (DPPA, 18 U.S.C. \u00a7 2721)",
    ownerCalloutAfter:
      " et le Florida Statute \u00a7 119.0712, les noms, adresses et numéros de téléphone des propriétaires liés à l'immatriculation des véhicules sont des informations privées protégées. Aucun service de recherche VIN grand public \u2014 y compris le nôtre \u2014 ne peut légalement retourner l'identité du propriétaire à partir d'une recherche VIN. Tout service prétendant fournir ceci opère en dehors de la loi.",
    ownerCalloutBefore: "Sous la ",
    ownerLeadBefore: "Ce qu'une ",
    ownerLeadBold: "recherche de propriétaire par VIN en Florida",
    ownerLeadMid: " ",
    ownerLeadEm: "peut",
    ownerLeadAfter: " légalement fournir :",
    ownerBullets: [
      "Nombre de propriétaires précédents (nombre, pas noms)",
      "Si le titre a été émis à un particulier, concessionnaire ou société de flotte/location",
      "État(s) où le véhicule a été précédemment titré",
      "Durée de détention de chaque titre (approximative)",
      "Si un titre a été émis à une entité commerciale (location, flotte, leasing)",
    ],
    midCtaHeading: "Prêt à vérifier un VIN de Florida ?",
    midCtaSub: "Gratuit, instantané, sans carte de crédit. Obtiens le rapport complet d'historique véhicule de Florida en moins de 5 secondes.",
    linksHeading: "Plus d'outils de vérification de véhicules en Florida",
    linksSub: "Approfondis des préoccupations spécifiques aux véhicules en Florida avec ces outils ciblés.",
    internalLinks: [
      { href: "/salvage-title-check",    label: "Vérification de salvage title",         desc: "Vérifie si un véhicule porte une marque salvage de Florida." },
      { href: "/accident-history-check", label: "Vérification d'historique d'accidents",      desc: "Analyse approfondie des dossiers de collision et de dégâts." },
      { href: "/flood-check",            label: "Vérification de dégâts par inondation",          desc: "Critique pour tout véhicule ayant séjourné en Florida." },
      { href: "/odometer-check",         label: "Vérification d'odomètre",              desc: "Détecte le recul et la fraude de kilométrage." },
      { href: "/license-plate-lookup",   label: "Recherche de plaque de Florida",        desc: "Trouve le VIN à partir de n'importe quelle plaque de Florida." },
      { href: "/motorcycle-vin-search",  label: "Vérification VIN moto",        desc: "Historique de titre FL pour motos et scooters." },
      { href: "/lemon-check",            label: "Vérification de rachat lemon law",     desc: "Trouve les dossiers de rachat lemon law en Florida." },
      { href: "/vehicle-lien-check",     label: "Vérification de privilège",                  desc: "Vérifie les prêts impayés sur n'importe quel véhicule de Florida." },
    ],
    faqHeading: "Questions fréquentes \u2014 Vérification VIN Florida",
    faqSub: "Réponses détaillées aux questions que les acheteurs de voitures en Florida recherchent le plus.",
    bottomBadge: "Gratuit \u00b7 Instantané \u00b7 Sans inscription",
    bottomHeading: "Protège-toi avant d'acheter en Florida",
    bottomSub:
      "Le marché des voitures d'occasion de Florida est l'un des plus risqués des US pour les dégâts cachés par inondation, le lavage de titre et la fraude d'odomètre. Une vérification VIN gratuite prend 5 secondes et pourrait t'économiser des milliers de dollars.",
    sourcesHeading: "Sources et autorité des données",
    sourcesIntro:
      "Chaque affirmation sur cette page se trace à une source publique et autoritative des US. Ci-dessous se trouvent les références principales qu'utilise notre vérification VIN Florida et les agences avec lesquelles tu peux croiser.",
    sources: [
      { href: "https://services.flhsmv.gov/mvcheckweb/", label: "DHSMV de Florida \u2014 Vérification de véhicules motorisés", note: "Vérification officielle de titre et d'immatriculation en Florida." },
      { href: "https://vehiclehistory.bja.ojp.gov/", label: "NMVTIS \u2014 Bureau of Justice Assistance", note: "Système national fédéral d'information sur les titres de véhicules motorisés." },
      { href: "https://www.nhtsa.gov/recalls", label: "NHTSA \u2014 Rappels de sécurité", note: "Base de données autoritative des rappels ouverts pour tout VIN des US." },
      { href: "https://www.nicb.org/vincheck", label: "NICB VINCheck", note: "Rapports de véhicules volés et de salvage des assureurs." },
      { href: "https://www.iihs.org/topics/auto-theft", label: "IIHS \u2014 Statistiques de vol d'autos", note: "Recherche indépendante sur le vol de véhicules utilisée dans la modélisation du risque en Florida." },
      { href: "http://www.leg.state.fl.us/Statutes/index.cfm?App_mode=Display_Statute&URL=0300-0399/0319/Sections/0319.14.html", label: "Statuts de Florida \u00a7 319.14", note: "Statut régissant les marques de titre salvage et rebuilt." },
    ],
    sourcesFooter:
      "La précision des données est vérifiée contre NMVTIS, NHTSA, NICB et les dossiers du DHSMV de Florida au moment de chaque recherche. Les statistiques sur cette page proviennent des estimations d'impact post-ouragan Ian de Carfax et du Hot Spots Report 2023 de la NICB.",
  },
} as const;

export const FAQS_EN: Faq[] = [
  { question: "How do I run a free VIN check in Florida?", answer: "Enter the 17-character VIN in the search box at the top of this page. Our system queries Florida DHSMV records and national databases including NMVTIS to return title status, accident history, odometer records, and more \u2014 at no charge." },
  { question: "What is a Florida DMV VIN check?", answer: "A Florida DMV VIN check (officially handled by the Florida Department of Highway Safety and Motor Vehicles, DHSMV) verifies vehicle ownership, title status, any liens recorded, and title brands such as salvage, rebuilt, or flood. Our service aggregates DHSMV data alongside NMVTIS and national history providers for a comprehensive report." },
  { question: "Can I look up a vehicle owner by VIN in Florida?", answer: "No. Under the federal Driver's Privacy Protection Act (DPPA), owner name and address cannot be returned to the general public from any VIN or plate lookup service. Our VIN check returns vehicle data \u2014 specs, title history, accident records \u2014 but not personal owner information." },
  { question: "How do I check for a salvage or rebuilt title in Florida?", answer: "Run a VIN check above. Florida DHSMV records every title brand on a vehicle's history including salvage, rebuilt, junk, flood, lemon buyback, and odometer discrepancy. These brands follow the VIN permanently and will appear in your free report." },
  { question: "Can I do a motorcycle VIN check in Florida?", answer: "Yes. Florida DHSMV titles motorcycles, scooters, and mopeds just like passenger vehicles. Our free VIN check covers all 2-wheeled vehicles registered in Florida. Motorcycle VINs are typically 17 characters on models 1981 and newer." },
  { question: "Does Florida have a lot of flood-damaged vehicles?", answer: "Yes \u2014 Florida's hurricane and tropical storm history makes it one of the top states for flood-damaged vehicles. After events like Hurricane Ian (2022) and Irma (2017), tens of thousands of flood-totaled vehicles entered the used car market, sometimes with washed titles from other states. Always run a VIN check before buying any Florida vehicle." },
  { question: "What is VIN verification in Florida?", answer: "Florida VIN verification is a physical inspection of the VIN plate on the vehicle by a licensed dealer, law enforcement officer, or DHSMV inspector. It is required when registering an out-of-state vehicle in Florida or when the title shows a discrepancy. Our online VIN check is a data verification \u2014 not a substitute for a physical VIN inspection when one is legally required." },
  { question: "How do I check a Florida title by VIN?", answer: "Enter the VIN in our search tool above. We pull Florida title records via NMVTIS and DHSMV-linked data sources to show the current title status, any lienholders of record, and all historical title brands. For a certified title copy you must request directly from DHSMV." },
  { question: "Is a Florida vehicle history report the same as a Carfax report?", answer: "Our Florida vehicle history report covers the same data categories as Carfax \u2014 title records, accident history, odometer readings, theft records, and recall status \u2014 but our report is free. Carfax charges $44.99 per report. We source data from the same NMVTIS-certified feeds plus additional insurance history providers." },
  { question: "What does 'title washing' mean for Florida vehicles?", answer: "Title washing is when a badly-branded vehicle (salvage, flood, lemon) is re-titled in a state with looser branding laws to remove the brand, then brought back to Florida for sale. NMVTIS was created specifically to stop this practice \u2014 our report queries all 50 states' records so a washed title cannot hide its history." },
];

export const FAQS_FR: Faq[] = [
  { question: "Comment lancer une vérification VIN gratuite en Florida ?", answer: "Saisis le VIN de 17 caractères dans la boîte de recherche en haut de cette page. Notre système interroge les dossiers du DHSMV de Florida et les bases nationales y compris NMVTIS pour retourner le statut du titre, l'historique des accidents, les dossiers d'odomètre et plus \u2014 sans frais." },
  { question: "Qu'est-ce qu'une vérification VIN du DMV de Florida ?", answer: "Une vérification VIN du DMV de Florida (gérée officiellement par le Florida Department of Highway Safety and Motor Vehicles, DHSMV) vérifie la propriété du véhicule, le statut du titre, tout privilège enregistré et les marques de titre comme salvage, rebuilt ou flood. Notre service agrège les données du DHSMV avec NMVTIS et les fournisseurs nationaux d'historique pour un rapport complet." },
  { question: "Puis-je rechercher le propriétaire d'un véhicule par VIN en Florida ?", answer: "Non. Sous le Driver's Privacy Protection Act fédéral (DPPA), le nom et l'adresse du propriétaire ne peuvent pas être retournés au grand public depuis un service de recherche VIN ou de plaque. Notre vérification VIN retourne les données du véhicule \u2014 spécifications, historique de titre, dossiers d'accidents \u2014 mais pas les informations personnelles du propriétaire." },
  { question: "Comment vérifier un titre salvage ou rebuilt en Florida ?", answer: "Lance une vérification VIN ci-dessus. Le DHSMV de Florida enregistre chaque marque de titre dans l'historique d'un véhicule y compris salvage, rebuilt, junk, flood, lemon buyback et odometer discrepancy. Ces marques suivent le VIN en permanence et apparaîtront dans ton rapport gratuit." },
  { question: "Puis-je faire une vérification VIN moto en Florida ?", answer: "Oui. Le DHSMV de Florida titre les motos, scooters et mopeds comme les véhicules de passagers. Notre vérification VIN gratuite couvre tous les véhicules à 2 roues immatriculés en Florida. Les VIN de motos ont typiquement 17 caractères sur les modèles de 1981 et plus récents." },
  { question: "Florida a-t-elle beaucoup de véhicules endommagés par inondation ?", answer: "Oui \u2014 l'historique d'ouragans et de tempêtes tropicales de Florida en fait l'un des principaux états pour les véhicules endommagés par inondation. Après des événements comme l'ouragan Ian (2022) et Irma (2017), des dizaines de milliers de véhicules en perte totale par inondation sont entrés sur le marché de l'occasion, parfois avec des titres lavés d'autres états. Lance toujours une vérification VIN avant d'acheter n'importe quel véhicule de Florida." },
  { question: "Qu'est-ce que la vérification VIN en Florida ?", answer: "La vérification VIN en Florida est une inspection physique de la plaque VIN sur le véhicule par un concessionnaire licencié, un agent des forces de l'ordre ou un inspecteur du DHSMV. Elle est requise lors de l'immatriculation d'un véhicule d'un autre état en Florida ou quand le titre montre une divergence. Notre vérification VIN en ligne est une vérification de données \u2014 elle ne remplace pas une inspection physique du VIN quand elle est légalement requise." },
  { question: "Comment vérifier un titre de Florida par VIN ?", answer: "Saisis le VIN dans notre outil de recherche ci-dessus. Nous extrayons les dossiers de titre de Florida via NMVTIS et les sources de données liées au DHSMV pour montrer le statut actuel du titre, tous créanciers enregistrés et toutes les marques historiques du titre. Pour une copie certifiée du titre, tu dois la demander directement au DHSMV." },
  { question: "Un rapport d'historique véhicule de Florida est-il le même qu'un rapport Carfax ?", answer: "Notre rapport d'historique véhicule de Florida couvre les mêmes catégories de données que Carfax \u2014 dossiers de titre, historique d'accidents, lectures d'odomètre, dossiers de vol et statut des rappels \u2014 mais notre rapport est gratuit. Carfax facture $44.99 par rapport. Nous tirons les données des mêmes flux certifiés NMVTIS plus des fournisseurs supplémentaires d'historique d'assurance." },
  { question: "Que signifie 'lavage de titre' pour les véhicules de Florida ?", answer: "Le lavage de titre est quand un véhicule mal marqué (salvage, flood, lemon) est re-titré dans un état avec des lois de marquage plus laxistes pour retirer la marque, puis ramené en Florida pour vente. NMVTIS a été créé spécifiquement pour arrêter cette pratique \u2014 notre rapport consulte les dossiers des 50 états donc un titre lavé ne peut pas cacher son historique." },
];

export const FAQS_ES: Faq[] = [
  { question: "\u00bfC\u00f3mo ejecuto una verificaci\u00f3n VIN gratis en Florida?", answer: "Ingresa el VIN de 17 caracteres en la caja de b\u00fasqueda al inicio de esta p\u00e1gina. Nuestro sistema consulta los registros del DHSMV de Florida y bases nacionales como NMVTIS para devolver el estado del t\u00edtulo, historial de accidentes, registros del od\u00f3metro y m\u00e1s \u2014 sin costo." },
  { question: "\u00bfQu\u00e9 es una verificaci\u00f3n VIN del DMV de Florida?", answer: "Una verificaci\u00f3n VIN del DMV de Florida (manejada oficialmente por el Departamento de Seguridad Vial y Veh\u00edculos Motorizados de Florida, DHSMV) verifica la propiedad del veh\u00edculo, el estado del t\u00edtulo, cualquier gravamen registrado y marcas de t\u00edtulo como salvamento, reconstruido o inundaci\u00f3n. Nuestro servicio agrega los datos del DHSMV junto con NMVTIS y proveedores nacionales de historial para un reporte completo." },
  { question: "\u00bfPuedo buscar al due\u00f1o de un veh\u00edculo por VIN en Florida?", answer: "No. Bajo la Ley federal de Protecci\u00f3n de la Privacidad del Conductor (DPPA), el nombre y la direcci\u00f3n del due\u00f1o no pueden devolverse al p\u00fablico general desde ning\u00fan servicio de b\u00fasqueda VIN o de placa. Nuestra verificaci\u00f3n VIN devuelve datos del veh\u00edculo \u2014 especificaciones, historial de t\u00edtulo, registros de accidentes \u2014 pero no informaci\u00f3n personal del due\u00f1o." },
  { question: "\u00bfC\u00f3mo verifico un t\u00edtulo de salvamento o reconstruido en Florida?", answer: "Ejecuta una verificaci\u00f3n VIN arriba. El DHSMV de Florida registra cada marca de t\u00edtulo en el historial de un veh\u00edculo, incluidas salvamento, reconstruido, chatarra, inundaci\u00f3n, recompra por Ley Lim\u00f3n y discrepancia de od\u00f3metro. Estas marcas siguen al VIN permanentemente y aparecer\u00e1n en tu reporte gratis." },
  { question: "\u00bfPuedo hacer una verificaci\u00f3n VIN de motocicleta en Florida?", answer: "S\u00ed. El DHSMV de Florida titula motocicletas, scooters y ciclomotores igual que veh\u00edculos de pasajeros. Nuestra verificaci\u00f3n VIN gratis cubre todos los veh\u00edculos de dos ruedas matriculados en Florida. Los VIN de motocicletas suelen tener 17 caracteres en modelos de 1981 en adelante." },
  { question: "\u00bfFlorida tiene muchos veh\u00edculos da\u00f1ados por inundaci\u00f3n?", answer: "S\u00ed \u2014 el historial de huracanes y tormentas tropicales de Florida la convierte en uno de los estados principales en veh\u00edculos da\u00f1ados por inundaci\u00f3n. Tras eventos como el hurac\u00e1n Ian (2022) e Irma (2017), decenas de miles de veh\u00edculos con p\u00e9rdida total por inundaci\u00f3n entraron al mercado de usados, a veces con t\u00edtulos lavados de otros estados. Siempre ejecuta una verificaci\u00f3n VIN antes de comprar cualquier veh\u00edculo de Florida." },
  { question: "\u00bfQu\u00e9 es la verificaci\u00f3n VIN en Florida?", answer: "La verificaci\u00f3n VIN en Florida es una inspecci\u00f3n f\u00edsica de la placa VIN del veh\u00edculo realizada por un concesionario autorizado, un agente del orden o un inspector del DHSMV. Es requerida al matricular un veh\u00edculo de otro estado en Florida o cuando el t\u00edtulo muestra una discrepancia. Nuestra verificaci\u00f3n VIN en l\u00ednea es una verificaci\u00f3n de datos \u2014 no sustituye la inspecci\u00f3n f\u00edsica del VIN cuando esta es legalmente requerida." },
  { question: "\u00bfC\u00f3mo verifico un t\u00edtulo de Florida por VIN?", answer: "Ingresa el VIN en nuestra herramienta de b\u00fasqueda arriba. Extraemos los registros de t\u00edtulo de Florida v\u00eda NMVTIS y fuentes de datos vinculadas al DHSMV para mostrar el estado actual del t\u00edtulo, cualquier acreedor con gravamen registrado y todas las marcas hist\u00f3ricas del t\u00edtulo. Para una copia certificada del t\u00edtulo debes solicitarla directamente al DHSMV." },
  { question: "\u00bfEs un reporte de historial vehicular de Florida lo mismo que un reporte de Carfax?", answer: "Nuestro reporte de historial vehicular de Florida cubre las mismas categor\u00edas de datos que Carfax \u2014 registros de t\u00edtulo, historial de accidentes, lecturas del od\u00f3metro, registros de robo y estado de retiros \u2014 pero nuestro reporte es gratis. Carfax cobra $44.99 por reporte. Tomamos los datos de las mismas fuentes certificadas por NMVTIS m\u00e1s proveedores adicionales de historial de seguros." },
  { question: "\u00bfQu\u00e9 significa 'lavado de t\u00edtulo' para los veh\u00edculos de Florida?", answer: "El lavado de t\u00edtulo es cuando un veh\u00edculo con una mala marca (salvamento, inundaci\u00f3n, lim\u00f3n) se re-titula en un estado con leyes de marcado m\u00e1s laxas para retirar la marca, y luego se trae de vuelta a Florida para vender. NMVTIS fue creado espec\u00edficamente para detener esta pr\u00e1ctica \u2014 nuestro reporte consulta los registros de los 50 estados para que un t\u00edtulo lavado no pueda ocultar su historial." },
];

export default function FloridaVinCheckBody({ locale }: { locale: Locale }) {
  const c = COPY[locale];
  const faqs = locale === "es" ? FAQS_ES : FAQS_EN;
  const link = (href: string) => (locale === "es" ? `/es${href}` : href);

  return (
    <article className="pb-16 bg-surface">
      {/* Hero */}
      <div className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
          <Breadcrumbs
            items={[{ label: c.crumbs.home, href: link("/") }, { label: c.crumbs.current }]}
            onDark
          />

          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <MapPin className="w-4 h-4" /> {c.badge}
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
            {c.h1Lead}
            <span style={{ color: "var(--color-secondary-container)" }}>
              {c.h1Accent}
            </span>
          </h1>

          <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
            {c.intro}
          </p>

          <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
            <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">
              {c.searchHeading}
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant mb-4">
              {c.searchSub}
            </p>
            <VinSearchForm size="lg" locale={locale} />
            <p className="mt-3 text-[11px] text-slate-400 flex items-center gap-1.5">
              <Lock className="w-3 h-3" /> {c.searchSecurity}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            {c.trustStats.map((s, i) => {
              const Icons = [Car, Shield, Clock, BadgeCheck];
              const Icon = Icons[i];
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

      {/* Stats block */}
      <section
        aria-labelledby="fl-stats-heading"
        className="max-w-5xl mx-auto px-4 sm:px-6 -mt-8 sm:-mt-10 relative z-10"
      >
        <div className="rounded-3xl bg-surface-container shadow-md border border-outline-variant p-5 sm:p-7">
          <h2
            id="fl-stats-heading"
            className="text-xs sm:text-sm font-headline font-black uppercase tracking-widest text-primary mb-4 sm:mb-5"
          >
            {c.statsHeading}
          </h2>
          <dl className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
            {c.headlineStats.map((s) => (
              <div key={s.label} className="rounded-2xl bg-primary-container px-4 py-4 sm:py-5">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-headline font-bold text-3xl sm:text-4xl text-on-primary-container leading-none mb-2">
                  {s.value}
                </dd>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-snug">
                  {s.label}
                </p>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Why different */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
            {c.whyHeading}
          </h2>
          <div className="prose prose-slate max-w-none text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
            <p>
              {c.whyP1Before}
              <strong className="text-on-surface">{c.whyP1Bold}</strong>
              {c.whyP1Mid}
              <a
                href="https://www.carfax.com/press/post/an-estimated-358000-flood-damaged-vehicles-could-be-back-on-roads-after-hurricane-ian"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="text-primary underline underline-offset-2"
              >
                {c.whyP1Link1}
              </a>
              {c.whyP1Mid2}
              <a
                href="https://www.nicb.org/news/news-releases/nicb-hot-spots-report-vehicle-theft-rates-continue-rise-2023"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="text-primary underline underline-offset-2"
              >
                {c.whyP1Link2}
              </a>
              {c.whyP1After}
            </p>
            <ul className="space-y-3 list-none pl-0">
              {c.whyBullets.map((item) => (
                <li key={item.point} className="flex gap-3 items-start bg-surface-container-low rounded-xl p-4">
                  <span className="text-2xl flex-shrink-0">{item.icon}</span>
                  <span><strong className="text-on-surface">{item.point}:</strong> {item.detail}</span>
                </li>
              ))}
            </ul>
            <p>
              {c.whyP2Before}
              <strong className="text-on-surface">{c.whyP2Bold}</strong>
              {c.whyP2After}
            </p>
          </div>
        </section>

        {/* Report includes */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            {c.reportHeading}
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8">
            {c.reportSub}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {c.reportItems.map((item) => {
              const Icon = item.icon;
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

        {/* Step-by-step */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            {c.stepsHeading}
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8">
            {c.stepsSubBefore}<strong>{c.stepsSubBold}</strong>{c.stepsSubAfter}
          </p>
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

        {/* Title brands */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            {c.brandsHeading}
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8">
            {c.brandsSubBefore}<strong>{c.brandsSubBold}</strong>{c.brandsSubAfter}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {c.titleBrands.map((b) => (
              <div key={b.brand} className="flex gap-3 items-start rounded-xl border border-outline-variant bg-surface-container-lowest p-4">
                <AlertCircle className="w-5 h-5 text-error flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-sm font-bold text-on-surface">{b.brand}</strong>
                  <p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl bg-primary/5 border border-primary/20 p-5 sm:p-6">
            <p className="text-sm text-on-surface-variant leading-relaxed">
              <strong className="text-primary">{c.brandsCalloutBold}</strong>
              {c.brandsCalloutMid}
              <strong>{c.brandsCalloutBold2}</strong>
              {c.brandsCalloutAfter}
            </p>
          </div>
        </section>

        {/* DHSMV comparison */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
            {c.dhsmvHeading}
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-6 leading-relaxed">
            {c.dhsmvLeadBefore}<strong>{c.dhsmvLeadBold}</strong>{c.dhsmvLeadAfter}
          </p>
          <div className="overflow-x-auto rounded-2xl border border-outline-variant">
            <table className="w-full border-collapse min-w-[520px] text-sm">
              <thead className="bg-surface-container-low">
                <tr>
                  <th className="p-4 text-left font-headline font-extrabold text-primary">{c.tableHeaders.feature}</th>
                  <th className="p-4 text-center font-headline font-extrabold text-white bg-primary">{c.tableHeaders.us}</th>
                  <th className="p-4 text-center font-headline font-bold text-on-surface-variant">{c.tableHeaders.dmv}</th>
                </tr>
              </thead>
              <tbody>
                {c.tableRows.map(([feature, us, dmv]) => (
                  <tr key={feature as string} className="border-t border-outline-variant/60">
                    <td className="p-3 sm:p-4 text-on-surface font-medium">{feature}</td>
                    <td className="p-3 sm:p-4 text-center bg-primary/5">
                      {typeof us === "boolean" ? (
                        us ? <Check className="w-5 h-5 text-green-500 mx-auto" strokeWidth={3} /> : <span className="text-error/70 text-xs font-bold">{c.tableNoLabel}</span>
                      ) : (
                        <span className="font-headline font-black text-primary text-base">{us}</span>
                      )}
                    </td>
                    <td className="p-3 sm:p-4 text-center">
                      {typeof dmv === "boolean" ? (
                        dmv ? <Check className="w-5 h-5 text-on-surface-variant mx-auto" /> : <span className="text-error/70 text-xs font-bold">{c.tableNoLabel}</span>
                      ) : (
                        <span className="text-sm text-on-surface-variant font-semibold">{dmv}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-on-surface-variant">
            {c.tableFootBefore}
            <span className="font-semibold text-on-surface">{c.tableFootBold}</span>
            {c.tableFootAfter}
          </p>
        </section>

        {/* Motorcycle section */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
            {c.motoHeading}
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed mb-4">
            {c.motoLeadBefore}<strong>{c.motoLeadBold}</strong>{c.motoLeadAfter}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {c.motoCards.map((item) => (
              <div key={item.title} className="rounded-xl border border-outline-variant bg-surface-container-lowest p-4">
                <h3 className="text-sm font-bold text-primary mb-1.5">{item.title}</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
          <Link
            href={link("/motorcycle-vin-search")}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-white text-sm font-bold hover:brightness-110 transition-all"
          >
            {c.motoCta} <ChevronRight className="w-4 h-4" />
          </Link>
        </section>

        {/* Owner lookup */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
            {c.ownerHeading}
          </h2>
          <div className="rounded-2xl border border-outline-variant bg-surface-container-low p-5 sm:p-6 mb-5">
            <div className="flex items-start gap-3">
              <Lock className="w-6 h-6 text-secondary flex-shrink-0 mt-0.5" />
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {c.ownerCalloutBefore}
                <strong className="text-on-surface">{c.ownerCalloutBold}</strong>
                {c.ownerCalloutAfter}
              </p>
            </div>
          </div>
          <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
            {c.ownerLeadBefore}<strong>{c.ownerLeadBold}</strong>{c.ownerLeadMid}<em>{c.ownerLeadEm}</em>{c.ownerLeadAfter}
          </p>
          <ul className="space-y-2">
            {c.ownerBullets.map((item) => (
              <li key={item} className="flex gap-2 items-start text-sm text-on-surface-variant">
                <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" strokeWidth={3} />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Mid CTA */}
        <section className="py-10">
          <div className="rounded-3xl bg-primary p-7 sm:p-10 text-center">
            <Star className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">
              {c.midCtaHeading}
            </h2>
            <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">
              {c.midCtaSub}
            </p>
            <div className="max-w-xl mx-auto bg-white rounded-2xl p-4 sm:p-5">
              <VinSearchForm size="lg" locale={locale} />
            </div>
          </div>
        </section>

        {/* Internal links */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            {c.linksHeading}
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7">
            {c.linksSub}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {c.internalLinks.map((l) => (
              <Link
                key={l.href}
                href={link(l.href)}
                className="flex items-start gap-3 rounded-xl border border-outline-variant bg-surface hover:border-primary/40 hover:bg-primary/5 transition-colors p-4 group"
              >
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
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            {c.faqHeading}
          </h2>
          <p className="text-sm text-on-surface-variant mb-8">
            {c.faqSub}
          </p>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details
                key={f.question}
                className="group rounded-2xl border border-outline-variant bg-surface p-4 sm:p-5 [&_summary::-webkit-details-marker]:hidden"
              >
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
          <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3">
            {c.bottomHeading}
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">
            {c.bottomSub}
          </p>
          <div className="max-w-xl mx-auto bg-surface-container-low rounded-2xl p-5 border border-outline-variant">
            <VinSearchForm size="lg" locale={locale} />
          </div>
        </section>

        {/* Sources */}
        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            {c.sourcesHeading}
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-6">
            {c.sourcesIntro}
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            {c.sources.map((s) => (
              <li
                key={s.href}
                className="rounded-xl border border-outline-variant bg-surface-container-lowest p-4"
              >
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-primary font-bold underline underline-offset-2"
                >
                  {s.label} ↗
                </a>
                <p className="mt-1.5 text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  {s.note}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs text-on-surface-variant italic">
            {c.sourcesFooter}
          </p>
        </section>

        <RelatedChecks exclude="/florida-vin-check" />
      </div>
    </article>
  );
}
