/**
 * Shared body for /hin-lookup and /es/hin-lookup.
 * Wave 18 batch 3 — full English layout in both locales via COPY={en,es}.
 */

import Link from "@/components/LocaleLink";
import {
  Check, Anchor, Search, MapPin, ChevronRight, Zap, BadgeCheck,
  Ship, Waves, ScanLine, ClipboardCheck, ShieldCheck, AlertCircle,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import HinDecoder from "@/app/hin-lookup/HinDecoder";
import type { Locale } from "@/i18n/config";

const HOW_ICONS = [MapPin, ScanLine, Search, ClipboardCheck, ShieldCheck] as const;

const COPY = {
  en: {
    home: "Home", crumb: "HIN Lookup",
    badge: "A Boat's HIN = Its VIN   ·   USCG Standard",
    h1Lead: "HIN Lookup — ",
    h1Accent: "Decode Any Boat's Hull Number",
    introPre: "A boat's Hull Identification Number ",
    introEm: "is",
    introSuffix: " its VIN. Enter the 12-character HIN from the transom to break out the manufacturer code, hull serial, and build year instantly. The marine equivalent of a VIN decode — free, no sign-up.",
    trustStats: [
      { icon: Anchor, value: "12", label: "characters decoded" },
      { icon: Ship, value: "Since 1972", label: "USCG HIN standard" },
      { icon: Zap, value: "Instant", label: "no sign-up needed" },
      { icon: BadgeCheck, value: "Free", label: "manufacturer & year" },
    ],
    h2Vs: "HIN vs \"Boat VIN\" — Same Idea, Different Code",
    vsIntroPre: "Searchers ask for a \"boat VIN\" every day. Boats don't carry the 17-character automotive VIN — they carry a ",
    vsIntroBold: "12-character Hull Identification Number (HIN)",
    vsIntroSuffix: " that does the exact same job: a permanent, unique identity used for titling, registration, recalls, and theft records.",
    hinTag: "Boat \"HIN\"",
    hinTitle: "12 characters · on the transom",
    hinBullets: [
      "Required by the US Coast Guard since Nov 1, 1972.",
      "MIC + hull serial + build-date characters.",
      "Used to title, register, and trace any boat or PWC.",
    ],
    vinTag: "Car \"VIN\"",
    vinTitle: "17 characters · on the dash & door",
    vinBulletsPre: ["Vehicle Identification Number for cars and trucks.", "Same purpose — permanent, unique identity."],
    vinBullet3Pre: "Your boat ",
    vinBullet3Em: "trailer",
    vinBullet3Suffix: " has a 17-character VIN, not a HIN.",
    quickTestBold: "Quick test:",
    quickTestMid: " count the characters. Exactly ",
    quickTest12: "12",
    quickTestMid2: " means it's a boat HIN and the decoder above will read it. If it's ",
    quickTest17: "17",
    quickTestMid3: ", you're looking at the VIN on the boat trailer or tow vehicle — use the ",
    quickTestLink: "VIN lookup",
    quickTestSuffix: " instead.",
    h2How: "How to Look Up a Boat by Its HIN — Step by Step",
    howIntro: "Five steps from \"where is it?\" to a full hull identification. Works for powerboats, sailboats, and personal watercraft with a standard 12-character HIN.",
    stepWord: "Step",
    howSteps: [
      { step: "01", title: "Find the HIN on the transom", body: "The primary HIN is on the upper starboard (right) corner of the transom — the flat rear of the boat — within two inches of the top. A duplicate is hidden elsewhere on the hull, and the same number is on the registration and title." },
      { step: "02", title: "Read all 12 characters", body: "A standard HIN is exactly 12 characters: a 3-character manufacturer code, a 5-character hull serial, and a 4-character date section. Copy it precisely — a single wrong character points to a different hull." },
      { step: "03", title: "Decode it instantly", body: "Enter the HIN above. The decoder isolates the Manufacturer Identification Code (MIC), the hull serial number, and translates the date characters into a build month and model year — free, in seconds." },
      { step: "04", title: "Match it to the paperwork", body: "Confirm the decoded HIN matches the registration, the title, and the hidden duplicate HIN on the hull. Any mismatch between copies is an immediate red flag for a re-numbered or stolen boat." },
      { step: "05", title: "Run a history & theft check", body: "With the HIN verified, check title brands, recalls, and theft records through your state titling agency and the US Coast Guard before money changes hands." },
    ],
    h2Means: "What Each Part of a HIN Means",
    meansIntro: "A 12-character HIN isn't random — it's a structured code. Knowing the segments tells you exactly what the decoder is reading.",
    meansColPos: "Position", meansColSeg: "Segment", meansColDetail: "What it tells you",
    meansRows: [
      { pos: "1–3", seg: "MIC", detail: "Manufacturer Identification Code — three characters the US Coast Guard assigns to each boat builder. This is how the tool knows who built the hull." },
      { pos: "4–8", seg: "Hull serial", detail: "A five-character serial number the manufacturer assigns to that specific hull. Unique within the builder's production run." },
      { pos: "9", seg: "Month (current format)", detail: "In the straight-year format, the month of build encoded as a letter A–L (A = January through L = December)." },
      { pos: "10", seg: "Year digit", detail: "A single digit for the year the hull was built/certified in the straight-year format." },
      { pos: "11–12", seg: "Model year", detail: "The two-digit model year of the boat. In the older model-year format these positions shift — the 11th character is the letter 'M' and the 12th is the month." },
    ],
    h2Formats: "The Two HIN Date Formats",
    formatsIntro: "The last four characters encode the date two different ways depending on when the boat was built. Our decoder detects the format automatically — here's how to read each by hand.",
    formatsColFormat: "Format", formatsColUsed: "Used", formatsColLayout: "Date Layout", formatsColExample: "Example",
    formatsRows: [
      { format: "Straight-Year Format", used: "Aug 1, 1984 → present", layout: "MIC · serial · month(A–L) · year-digit · model-year", example: "ABC12345 H8 05" },
      { format: "Model-Year Format", used: "Nov 1972 → Jul 1984", layout: "MIC · serial · model-year · 'M' · month(A–L)", example: "ABC12345 79 M H" },
    ],
    formatsFooterPre: "Month letters run ",
    formatsFooterBold: "A–L",
    formatsFooterSuffix: " for January through December in both formats.",
    midCtaHeading: "Decode Your Boat's HIN in Seconds",
    midCtaSub: "Free, instant hull identification — manufacturer code, serial, and build year straight from the 12-character HIN.",
    h2Match: "Always Match the HIN Before You Buy a Boat",
    match1: "The HIN is a boat's permanent identity, so it's the single best defence against buying a stolen or re-titled hull. A re-numbered boat wears the identity of a legitimate vessel to hide a theft or total-loss history — and the way to catch it is to decode the HIN and confirm every copy matches.",
    match2: "Decode the number first to confirm the manufacturer and build year line up with the listing. Then verify the same HIN appears identically on the transom, the hidden duplicate on the hull, the registration, and the title.",
    match3: "When the identity checks out, take the HIN to your state titling agency and the US Coast Guard to confirm title status, recalls, and theft records before any money changes hands.",
    redFlagsTitle: "HIN red flags",
    redFlags: [
      "Decoded manufacturer or year doesn't match the listing",
      "Transom HIN differs from the hidden duplicate on the hull",
      "HIN on the boat doesn't match the title or registration",
      "Plate or stamping looks ground down, re-glued, or repainted",
      "Fewer or more than 12 characters on a post-1972 boat",
      "Seller can't or won't show you the transom HIN",
    ],
    h2Internal: "Trailer or Tow Vehicle? Decode Its VIN Too",
    internalIntro: "Your boat has a HIN — but the trailer and the truck towing it carry 17-character VINs. These tools cover the rest of the rig.",
    internalLinks: [
      { href: "/chassis-number-lookup", label: "Chassis Number / VIN Lookup", desc: "Decode the 17-character VIN on your boat trailer or tow vehicle." },
      { href: "/vin-decoder", label: "VIN Decoder", desc: "Free decode for any car, truck, or trailer VIN — specs and origin." },
      { href: "/stolen-vehicle-check", label: "Stolen Vehicle Check", desc: "Confirm a trailer or tow vehicle isn't flagged stolen before you buy." },
      { href: "/motorcycle-vin-search", label: "Motorcycle VIN Search", desc: "Decode a motorcycle or off-road frame number for make and model." },
      { href: "/recall-check", label: "Recall Check", desc: "Find open safety recalls on a tow vehicle by its VIN." },
      { href: "/odometer-check", label: "Odometer Check", desc: "Verify the mileage trail on the tow vehicle pulling your boat." },
      { href: "/market-value", label: "Market Value", desc: "Check the current value of the tow vehicle or trailer by VIN." },
      { href: "/vin-check", label: "Full VIN History Check", desc: "Title, accident, and theft records for the vehicle towing your boat." },
    ],
    h2Faq: "HIN Lookup — Frequently Asked Questions",
    faqIntro: "Direct answers to what boat buyers and owners ask most.",
    bottomBadge: "Free · Instant · USCG Format",
    ctaBottomHeading: "Decode Any Boat by Its Hull Number",
    ctaBottomSub: "Enter a 12-character HIN to identify the manufacturer, hull serial, and build year — the marine equivalent of a free VIN decode.",
    ctaBottomNote: "No credit card · No sign-up · Free hull identification",
  },
  es: {
    home: "Inicio", crumb: "Búsqueda HIN",
    badge: "El HIN de un barco = Su VIN   ·   Estándar USCG",
    h1Lead: "Búsqueda HIN — ",
    h1Accent: "Decodifica el número de casco de cualquier barco",
    introPre: "El Número de Identificación del Casco de un barco ",
    introEm: "es",
    introSuffix: " su VIN. Ingresa el HIN de 12 caracteres del espejo de popa para desglosar el código del fabricante, serial del casco y año de construcción al instante. El equivalente marino de una decodificación VIN — gratis, sin registro.",
    trustStats: [
      { icon: Anchor, value: "12", label: "caracteres decodificados" },
      { icon: Ship, value: "Desde 1972", label: "estándar HIN USCG" },
      { icon: Zap, value: "Instantáneo", label: "sin registro" },
      { icon: BadgeCheck, value: "Gratis", label: "fabricante y año" },
    ],
    h2Vs: "HIN vs \"VIN de barco\" — Misma idea, código diferente",
    vsIntroPre: "Los buscadores piden un \"VIN de barco\" todos los días. Los barcos no llevan el VIN automotriz de 17 caracteres — llevan un ",
    vsIntroBold: "Número de Identificación del Casco (HIN) de 12 caracteres",
    vsIntroSuffix: " que hace exactamente el mismo trabajo: una identidad permanente y única usada para titulación, registro, recalls y registros de robo.",
    hinTag: "\"HIN\" de barco",
    hinTitle: "12 caracteres · en el espejo de popa",
    hinBullets: [
      "Requerido por la Guardia Costera de EE. UU. desde el 1 de noviembre de 1972.",
      "MIC + serial del casco + caracteres de fecha de construcción.",
      "Usado para titular, registrar y rastrear cualquier barco o PWC.",
    ],
    vinTag: "\"VIN\" de auto",
    vinTitle: "17 caracteres · en el tablero y puerta",
    vinBulletsPre: ["Número de Identificación del Vehículo para autos y camiones.", "Mismo propósito — identidad permanente y única."],
    vinBullet3Pre: "Tu ",
    vinBullet3Em: "remolque",
    vinBullet3Suffix: " de barco tiene un VIN de 17 caracteres, no un HIN.",
    quickTestBold: "Prueba rápida:",
    quickTestMid: " cuenta los caracteres. Exactamente ",
    quickTest12: "12",
    quickTestMid2: " significa que es un HIN de barco y el decodificador de arriba lo leerá. Si son ",
    quickTest17: "17",
    quickTestMid3: ", estás viendo el VIN del remolque del barco o vehículo de remolque — usa la ",
    quickTestLink: "búsqueda VIN",
    quickTestSuffix: " en su lugar.",
    h2How: "Cómo buscar un barco por su HIN — Paso a paso",
    howIntro: "Cinco pasos desde \"¿dónde está?\" hasta una identificación completa del casco. Funciona para lanchas, veleros y motos acuáticas con un HIN estándar de 12 caracteres.",
    stepWord: "Paso",
    howSteps: [
      { step: "01", title: "Encuentra el HIN en el espejo de popa", body: "El HIN principal está en la esquina superior estribor (derecha) del espejo de popa — la parte trasera plana del barco — dentro de dos pulgadas de la parte superior. Un duplicado está escondido en otra parte del casco, y el mismo número está en el registro y título." },
      { step: "02", title: "Lee los 12 caracteres", body: "Un HIN estándar es exactamente de 12 caracteres: un código de fabricante de 3 caracteres, un serial del casco de 5 caracteres y una sección de fecha de 4 caracteres. Cópialo con precisión — un solo carácter equivocado apunta a un casco diferente." },
      { step: "03", title: "Decodifícalo al instante", body: "Ingresa el HIN arriba. El decodificador aísla el Código de Identificación del Fabricante (MIC), el número de serie del casco y traduce los caracteres de fecha en un mes de construcción y año modelo — gratis, en segundos." },
      { step: "04", title: "Coincídelo con el papeleo", body: "Confirma que el HIN decodificado coincida con el registro, el título y el HIN duplicado oculto en el casco. Cualquier discrepancia entre copias es una bandera roja inmediata para un barco re-numerado o robado." },
      { step: "05", title: "Ejecuta una verificación de historial y robo", body: "Con el HIN verificado, revisa marcas de título, recalls y registros de robo a través de tu agencia estatal de titulación y la Guardia Costera de EE. UU. antes de que cambie el dinero." },
    ],
    h2Means: "Qué significa cada parte de un HIN",
    meansIntro: "Un HIN de 12 caracteres no es aleatorio — es un código estructurado. Conocer los segmentos te dice exactamente lo que el decodificador está leyendo.",
    meansColPos: "Posición", meansColSeg: "Segmento", meansColDetail: "Qué te dice",
    meansRows: [
      { pos: "1–3", seg: "MIC", detail: "Código de Identificación del Fabricante — tres caracteres que la Guardia Costera de EE. UU. asigna a cada constructor de barcos. Así es como la herramienta sabe quién construyó el casco." },
      { pos: "4–8", seg: "Serial del casco", detail: "Un número de serie de cinco caracteres que el fabricante asigna a ese casco específico. Único dentro de la serie de producción del constructor." },
      { pos: "9", seg: "Mes (formato actual)", detail: "En el formato año-directo, el mes de construcción codificado como una letra A-L (A = enero hasta L = diciembre)." },
      { pos: "10", seg: "Dígito de año", detail: "Un solo dígito para el año en que el casco fue construido/certificado en el formato año-directo." },
      { pos: "11–12", seg: "Año modelo", detail: "El año modelo de dos dígitos del barco. En el formato más antiguo de año-modelo estas posiciones cambian — el carácter 11 es la letra 'M' y el 12 es el mes." },
    ],
    h2Formats: "Los dos formatos de fecha HIN",
    formatsIntro: "Los últimos cuatro caracteres codifican la fecha de dos maneras diferentes dependiendo de cuándo se construyó el barco. Nuestro decodificador detecta el formato automáticamente — aquí está cómo leer cada uno a mano.",
    formatsColFormat: "Formato", formatsColUsed: "Usado", formatsColLayout: "Diseño de fecha", formatsColExample: "Ejemplo",
    formatsRows: [
      { format: "Formato Año-Directo", used: "1 ago 1984 → presente", layout: "MIC · serial · mes(A-L) · dígito-año · año-modelo", example: "ABC12345 H8 05" },
      { format: "Formato Año-Modelo", used: "Nov 1972 → Jul 1984", layout: "MIC · serial · año-modelo · 'M' · mes(A-L)", example: "ABC12345 79 M H" },
    ],
    formatsFooterPre: "Las letras de mes van de ",
    formatsFooterBold: "A-L",
    formatsFooterSuffix: " para enero a diciembre en ambos formatos.",
    midCtaHeading: "Decodifica el HIN de tu barco en segundos",
    midCtaSub: "Identificación de casco gratis e instantánea — código del fabricante, serial y año de construcción directamente desde el HIN de 12 caracteres.",
    h2Match: "Siempre coincide el HIN antes de comprar un barco",
    match1: "El HIN es la identidad permanente de un barco, así que es la mejor defensa contra comprar un casco robado o re-titulado. Un barco re-numerado lleva la identidad de un buque legítimo para ocultar un historial de robo o pérdida total — y la manera de atraparlo es decodificar el HIN y confirmar que cada copia coincida.",
    match2: "Decodifica el número primero para confirmar que el fabricante y año de construcción coincidan con el listado. Luego verifica que el mismo HIN aparezca idénticamente en el espejo de popa, el duplicado oculto en el casco, el registro y el título.",
    match3: "Cuando la identidad cuadra, lleva el HIN a tu agencia estatal de titulación y a la Guardia Costera de EE. UU. para confirmar el estado del título, recalls y registros de robo antes de que cambie el dinero.",
    redFlagsTitle: "Banderas rojas del HIN",
    redFlags: [
      "El fabricante o año decodificado no coincide con el listado",
      "El HIN del espejo de popa difiere del duplicado oculto en el casco",
      "El HIN en el barco no coincide con el título o registro",
      "La placa o estampado se ve lijada, re-pegada o repintada",
      "Menos o más de 12 caracteres en un barco post-1972",
      "El vendedor no puede o no quiere mostrarte el HIN del espejo de popa",
    ],
    h2Internal: "¿Remolque o vehículo de remolque? Decodifica también su VIN",
    internalIntro: "Tu barco tiene un HIN — pero el remolque y la camioneta que lo remolca llevan VIN de 17 caracteres. Estas herramientas cubren el resto del equipo.",
    internalLinks: [
      { href: "/chassis-number-lookup", label: "Búsqueda número de chasis / VIN", desc: "Decodifica el VIN de 17 caracteres en tu remolque de barco o vehículo de remolque." },
      { href: "/vin-decoder", label: "Decodificador VIN", desc: "Decodificación gratis para cualquier VIN de auto, camión o remolque — especificaciones y origen." },
      { href: "/stolen-vehicle-check", label: "Verificación vehículo robado", desc: "Confirma que un remolque o vehículo de remolque no esté marcado como robado antes de comprar." },
      { href: "/motorcycle-vin-search", label: "Búsqueda VIN de motocicleta", desc: "Decodifica un número de chasis de motocicleta o todoterreno para marca y modelo." },
      { href: "/recall-check", label: "Verificación de recalls", desc: "Encuentra recalls de seguridad abiertos en un vehículo de remolque por su VIN." },
      { href: "/odometer-check", label: "Verificación odómetro", desc: "Verifica el rastro de kilometraje en el vehículo de remolque que tira de tu barco." },
      { href: "/market-value", label: "Valor de mercado", desc: "Revisa el valor actual del vehículo de remolque o remolque por VIN." },
      { href: "/vin-check", label: "Verificación completa de historial VIN", desc: "Registros de título, accidente y robo para el vehículo que remolca tu barco." },
    ],
    h2Faq: "Búsqueda HIN — Preguntas frecuentes",
    faqIntro: "Respuestas directas a lo que más preguntan los compradores y dueños de barcos.",
    bottomBadge: "Gratis · Instantáneo · Formato USCG",
    ctaBottomHeading: "Decodifica cualquier barco por su número de casco",
    ctaBottomSub: "Ingresa un HIN de 12 caracteres para identificar el fabricante, serial del casco y año de construcción — el equivalente marino de una decodificación VIN gratis.",
    ctaBottomNote: "Sin tarjeta de crédito · Sin registro · Identificación de casco gratis",
  },
  fr: {
    home: "Accueil", crumb: "Recherche HIN",
    badge: "Le HIN d'un bateau = son VIN   ·   Norme USCG",
    h1Lead: "Recherche HIN — ",
    h1Accent: "Décode le numéro de coque de n'importe quel bateau",
    introPre: "Le Numéro d'Identification de Coque d'un bateau ",
    introEm: "est",
    introSuffix: " son VIN. Saisis le HIN de 12 caractères du tableau arrière pour ventiler le code du fabricant, la série de coque et l'année de construction instantanément. L'équivalent marin d'un décodage VIN — gratuit, sans inscription.",
    trustStats: [
      { icon: Anchor, value: "12", label: "caractères décodés" },
      { icon: Ship, value: "Depuis 1972", label: "norme HIN USCG" },
      { icon: Zap, value: "Instantané", label: "sans inscription" },
      { icon: BadgeCheck, value: "Gratuit", label: "fabricant et année" },
    ],
    h2Vs: "HIN vs « VIN de bateau » — Même idée, code différent",
    vsIntroPre: "Les chercheurs demandent un « VIN de bateau » tous les jours. Les bateaux ne portent pas le VIN automobile de 17 caractères — ils portent un ",
    vsIntroBold: "Numéro d'Identification de Coque (HIN) de 12 caractères",
    vsIntroSuffix: " qui fait exactement le même travail : une identité permanente et unique utilisée pour la titulation, l'immatriculation, les rappels et les dossiers de vol.",
    hinTag: "« HIN » de bateau",
    hinTitle: "12 caractères · sur le tableau arrière",
    hinBullets: [
      "Requis par la Garde côtière américaine depuis le 1er novembre 1972.",
      "MIC + série de coque + caractères de date de construction.",
      "Utilisé pour titulariser, immatriculer et tracer n'importe quel bateau ou PWC.",
    ],
    vinTag: "« VIN » de voiture",
    vinTitle: "17 caractères · sur le tableau de bord et la portière",
    vinBulletsPre: ["Numéro d'Identification du Véhicule pour voitures et camions.", "Même objectif — identité permanente et unique."],
    vinBullet3Pre: "Ta ",
    vinBullet3Em: "remorque",
    vinBullet3Suffix: " de bateau a un VIN de 17 caractères, pas un HIN.",
    quickTestBold: "Test rapide :",
    quickTestMid: " compte les caractères. Exactement ",
    quickTest12: "12",
    quickTestMid2: " signifie que c'est un HIN de bateau et le décodeur ci-dessus le lira. Si c'est ",
    quickTest17: "17",
    quickTestMid3: ", tu regardes le VIN de la remorque du bateau ou du véhicule de remorquage — utilise la ",
    quickTestLink: "recherche VIN",
    quickTestSuffix: " à la place.",
    h2How: "Comment chercher un bateau par son HIN — Étape par étape",
    howIntro: "Cinq étapes de « où est-il ? » à une identification complète de la coque. Fonctionne pour les bateaux à moteur, voiliers et motomarines avec un HIN standard de 12 caractères.",
    stepWord: "Étape",
    howSteps: [
      { step: "01", title: "Trouve le HIN sur le tableau arrière", body: "Le HIN principal est dans le coin supérieur tribord (droit) du tableau arrière — la partie arrière plate du bateau — à moins de deux pouces du haut. Un duplicata est caché ailleurs sur la coque, et le même numéro est sur l'immatriculation et le titre." },
      { step: "02", title: "Lis les 12 caractères", body: "Un HIN standard fait exactement 12 caractères : un code de fabricant de 3 caractères, une série de coque de 5 caractères et une section de date de 4 caractères. Copie-le avec précision — un seul caractère erroné pointe vers une coque différente." },
      { step: "03", title: "Décode-le instantanément", body: "Saisis le HIN ci-dessus. Le décodeur isole le Code d'Identification du Fabricant (MIC), le numéro de série de la coque et traduit les caractères de date en un mois de construction et année modèle — gratuit, en quelques secondes." },
      { step: "04", title: "Fais-le correspondre aux papiers", body: "Confirme que le HIN décodé correspond à l'immatriculation, au titre et au HIN duplicata caché sur la coque. Toute incompatibilité entre les copies est un drapeau rouge immédiat pour un bateau re-numéroté ou volé." },
      { step: "05", title: "Lance une vérification d'historique et de vol", body: "Avec le HIN vérifié, vérifie les marques de titre, les rappels et les dossiers de vol via ton agence de titulation d'État et la Garde côtière américaine avant que l'argent ne change de mains." },
    ],
    h2Means: "Ce que signifie chaque partie d'un HIN",
    meansIntro: "Un HIN de 12 caractères n'est pas aléatoire — c'est un code structuré. Connaître les segments te dit exactement ce que le décodeur lit.",
    meansColPos: "Position", meansColSeg: "Segment", meansColDetail: "Ce qu'il te dit",
    meansRows: [
      { pos: "1–3", seg: "MIC", detail: "Code d'Identification du Fabricant — trois caractères que la Garde côtière américaine attribue à chaque constructeur de bateaux. C'est ainsi que l'outil sait qui a construit la coque." },
      { pos: "4–8", seg: "Série de coque", detail: "Un numéro de série de cinq caractères que le fabricant attribue à cette coque spécifique. Unique au sein de la série de production du constructeur." },
      { pos: "9", seg: "Mois (format actuel)", detail: "Dans le format année-directe, le mois de construction encodé comme une lettre A–L (A = janvier jusqu'à L = décembre)." },
      { pos: "10", seg: "Chiffre d'année", detail: "Un seul chiffre pour l'année où la coque a été construite/certifiée dans le format année-directe." },
      { pos: "11–12", seg: "Année modèle", detail: "L'année modèle de deux chiffres du bateau. Dans le format plus ancien année-modèle, ces positions changent — le 11e caractère est la lettre « M » et le 12e est le mois." },
    ],
    h2Formats: "Les deux formats de date HIN",
    formatsIntro: "Les quatre derniers caractères encodent la date de deux manières différentes selon quand le bateau a été construit. Notre décodeur détecte le format automatiquement — voici comment lire chacun à la main.",
    formatsColFormat: "Format", formatsColUsed: "Utilisé", formatsColLayout: "Disposition de date", formatsColExample: "Exemple",
    formatsRows: [
      { format: "Format Année-Directe", used: "1er août 1984 → présent", layout: "MIC · série · mois(A–L) · chiffre-année · année-modèle", example: "ABC12345 H8 05" },
      { format: "Format Année-Modèle", used: "Nov 1972 → Juil 1984", layout: "MIC · série · année-modèle · « M » · mois(A–L)", example: "ABC12345 79 M H" },
    ],
    formatsFooterPre: "Les lettres de mois vont de ",
    formatsFooterBold: "A–L",
    formatsFooterSuffix: " pour janvier à décembre dans les deux formats.",
    midCtaHeading: "Décode le HIN de ton bateau en quelques secondes",
    midCtaSub: "Identification de coque gratuite et instantanée — code du fabricant, série et année de construction directement depuis le HIN de 12 caractères.",
    h2Match: "Fais toujours correspondre le HIN avant d'acheter un bateau",
    match1: "Le HIN est l'identité permanente d'un bateau, donc c'est la meilleure défense contre l'achat d'une coque volée ou re-titulée. Un bateau re-numéroté porte l'identité d'un vaisseau légitime pour cacher un historique de vol ou de perte totale — et la façon de l'attraper est de décoder le HIN et de confirmer que chaque copie correspond.",
    match2: "Décode d'abord le numéro pour confirmer que le fabricant et l'année de construction correspondent à l'annonce. Puis vérifie que le même HIN apparaît identiquement sur le tableau arrière, le duplicata caché sur la coque, l'immatriculation et le titre.",
    match3: "Quand l'identité est confirmée, apporte le HIN à ton agence de titulation d'État et à la Garde côtière américaine pour confirmer le statut du titre, les rappels et les dossiers de vol avant que l'argent ne change de mains.",
    redFlagsTitle: "Drapeaux rouges du HIN",
    redFlags: [
      "Le fabricant ou l'année décodés ne correspondent pas à l'annonce",
      "Le HIN du tableau arrière diffère du duplicata caché sur la coque",
      "Le HIN sur le bateau ne correspond pas au titre ou à l'immatriculation",
      "La plaque ou le marquage semble meulé, recollé ou repeint",
      "Moins ou plus de 12 caractères sur un bateau post-1972",
      "Le vendeur ne peut pas ou ne veut pas te montrer le HIN du tableau arrière",
    ],
    h2Internal: "Remorque ou véhicule de remorquage ? Décode aussi son VIN",
    internalIntro: "Ton bateau a un HIN — mais la remorque et le camion qui le tire portent des VIN de 17 caractères. Ces outils couvrent le reste de l'attelage.",
    internalLinks: [
      { href: "/chassis-number-lookup", label: "Recherche numéro de châssis / VIN", desc: "Décode le VIN de 17 caractères sur ta remorque de bateau ou ton véhicule de remorquage." },
      { href: "/vin-decoder", label: "Décodeur VIN", desc: "Décodage gratuit pour n'importe quel VIN de voiture, camion ou remorque — spécifications et origine." },
      { href: "/stolen-vehicle-check", label: "Vérification de véhicule volé", desc: "Confirme qu'une remorque ou un véhicule de remorquage n'est pas signalé comme volé avant d'acheter." },
      { href: "/motorcycle-vin-search", label: "Recherche VIN de moto", desc: "Décode un numéro de châssis de moto ou tout-terrain pour marque et modèle." },
      { href: "/recall-check", label: "Vérification de rappels", desc: "Trouve les rappels de sécurité ouverts sur un véhicule de remorquage par son VIN." },
      { href: "/odometer-check", label: "Vérification d'odomètre", desc: "Vérifie la traçabilité du kilométrage sur le véhicule de remorquage tirant ton bateau." },
      { href: "/market-value", label: "Valeur de marché", desc: "Vérifie la valeur actuelle du véhicule de remorquage ou de la remorque par VIN." },
      { href: "/vin-check", label: "Vérification complète d'historique VIN", desc: "Dossiers de titre, accident et vol pour le véhicule remorquant ton bateau." },
    ],
    h2Faq: "Recherche HIN — Foire aux questions",
    faqIntro: "Réponses directes à ce que les acheteurs et propriétaires de bateaux demandent le plus.",
    bottomBadge: "Gratuit · Instantané · Format USCG",
    ctaBottomHeading: "Décode n'importe quel bateau par son numéro de coque",
    ctaBottomSub: "Saisis un HIN de 12 caractères pour identifier le fabricant, la série de coque et l'année de construction — l'équivalent marin d'un décodage VIN gratuit.",
    ctaBottomNote: "Pas de carte de crédit · Pas d'inscription · Identification de coque gratuite",
  },
} as const;

const FAQS_EN = [
  { question: "What is a HIN on a boat?", answer: "A HIN, or Hull Identification Number, is a 12-character code that uniquely identifies a boat — the marine equivalent of a car's VIN. The US Coast Guard has required a HIN on every boat manufactured or imported for sale in the United States since November 1, 1972. It encodes the manufacturer, a unique hull serial number, and the build date." },
  { question: "Is a HIN the same as a boat VIN?", answer: "Effectively yes. People search for a 'boat VIN,' but boats don't use the 17-character automotive VIN — they use a 12-character HIN that serves the same purpose: a permanent, unique identifier used for registration, titling, recall, and theft records. If someone refers to a boat's VIN, they mean its HIN." },
  { question: "Where is the HIN located on a boat?", answer: "The primary HIN is permanently affixed to the upper starboard (right) side of the transom — the flat rear of the boat — within two inches of the top. A duplicate HIN is also hidden in an unexposed location elsewhere on the hull. On a PWC or jet ski it's typically on the rear or the hull near the pump. It's also listed on the registration and title documents." },
  { question: "How do I read a 12-character HIN?", answer: "The first three characters are the Manufacturer Identification Code (MIC). Characters 4–8 are the hull serial number assigned by the builder. The final four characters encode the date. In the current straight-year format the 9th character is the month of build (A–L for January–December), the 10th is a year-of-build digit, and the 11th–12th are the model year." },
  { question: "What do the letters in a HIN date mean?", answer: "In the build-date portion, months are encoded as letters A through L: A is January, B is February, and so on through L for December. So a HIN with 'H' in the month position was built in August. Our decoder translates the letter automatically." },
  { question: "Can I find the boat manufacturer from the HIN?", answer: "Yes — the first three characters are the Manufacturer Identification Code (MIC), which the US Coast Guard assigns to each builder. Our tool isolates the MIC for you; to convert it to a company name, look it up in the official USCG MIC database, which we link directly from the result." },
  { question: "Why is my HIN not 12 characters?", answer: "Boats built before November 1, 1972 predate the federal HIN requirement and may have no HIN or a non-standard builder's number. Some imported or home-built boats also carry irregular numbers. A standard, decodable HIN is always exactly 12 characters; anything shorter or longer needs to be verified with the manufacturer or your state titling agency." },
  { question: "Does a HIN lookup show the boat's owner?", answer: "No. Owner identity is personal information protected by privacy law and is not returned by a HIN decode. What the HIN gives you is the boat's identity — manufacturer, serial, and build year — plus a starting point for registration, recall, and theft checks through the relevant marine authorities." },
  { question: "Can I check a boat's history with the HIN?", answer: "The HIN is the key used to look up a boat's title, registration, accident, and theft history through state agencies and the US Coast Guard. Decoding the HIN confirms the boat's identity and build year first; from there you can verify the same number matches the title and run a marine history report before buying." },
  { question: "Does a jet ski or PWC have a HIN?", answer: "Yes. Personal watercraft (jet skis, wave runners) follow the same US Coast Guard HIN rules as any other boat — a 12-character Hull Identification Number, usually on the rear of the hull. Our decoder reads a PWC HIN exactly the same way it reads a boat HIN." },
];

const FAQS_ES = [
  { question: "¿Qué es un HIN en un barco?", answer: "Un HIN, o Número de Identificación del Casco, es un código de 12 caracteres que identifica únicamente a un barco — el equivalente marino del VIN de un auto. La Guardia Costera de EE. UU. ha requerido un HIN en cada barco fabricado o importado para venta en los Estados Unidos desde el 1 de noviembre de 1972. Codifica el fabricante, un número de serie único del casco y la fecha de construcción." },
  { question: "¿Un HIN es lo mismo que un VIN de barco?", answer: "Efectivamente sí. La gente busca un 'VIN de barco', pero los barcos no usan el VIN automotriz de 17 caracteres — usan un HIN de 12 caracteres que sirve para el mismo propósito: un identificador permanente y único usado para registro, titulación, recall y registros de robo. Si alguien se refiere al VIN de un barco, se refiere a su HIN." },
  { question: "¿Dónde está ubicado el HIN en un barco?", answer: "El HIN principal está permanentemente fijado al lado superior estribor (derecho) del espejo de popa — la parte trasera plana del barco — dentro de dos pulgadas de la parte superior. Un HIN duplicado también está oculto en una ubicación no expuesta en otra parte del casco. En un PWC o moto acuática típicamente está en la parte trasera o el casco cerca de la bomba. También está listado en el registro y documentos de título." },
  { question: "¿Cómo leo un HIN de 12 caracteres?", answer: "Los primeros tres caracteres son el Código de Identificación del Fabricante (MIC). Los caracteres 4-8 son el número de serie del casco asignado por el constructor. Los últimos cuatro caracteres codifican la fecha. En el formato año-directo actual el carácter 9 es el mes de construcción (A-L para enero-diciembre), el 10 es un dígito de año de construcción, y los 11-12 son el año modelo." },
  { question: "¿Qué significan las letras en una fecha HIN?", answer: "En la porción de fecha de construcción, los meses se codifican como letras A hasta L: A es enero, B es febrero, y así sucesivamente hasta L para diciembre. Así que un HIN con 'H' en la posición de mes fue construido en agosto. Nuestro decodificador traduce la letra automáticamente." },
  { question: "¿Puedo encontrar el fabricante del barco desde el HIN?", answer: "Sí — los primeros tres caracteres son el Código de Identificación del Fabricante (MIC), que la Guardia Costera de EE. UU. asigna a cada constructor. Nuestra herramienta aísla el MIC para ti; para convertirlo a un nombre de empresa, búscalo en la base de datos oficial MIC de USCG, a la que enlazamos directamente desde el resultado." },
  { question: "¿Por qué mi HIN no tiene 12 caracteres?", answer: "Los barcos construidos antes del 1 de noviembre de 1972 preceden al requisito federal del HIN y pueden no tener HIN o un número no estándar del constructor. Algunos barcos importados o caseros también llevan números irregulares. Un HIN estándar y decodificable siempre es exactamente de 12 caracteres; cualquier cosa más corta o larga necesita verificarse con el fabricante o tu agencia estatal de titulación." },
  { question: "¿Una búsqueda HIN muestra al dueño del barco?", answer: "No. La identidad del dueño es información personal protegida por la ley de privacidad y no se devuelve por una decodificación HIN. Lo que el HIN te da es la identidad del barco — fabricante, serial y año de construcción — más un punto de partida para verificaciones de registro, recall y robo a través de las autoridades marinas relevantes." },
  { question: "¿Puedo verificar el historial de un barco con el HIN?", answer: "El HIN es la clave usada para buscar el historial de título, registro, accidente y robo de un barco a través de agencias estatales y la Guardia Costera de EE. UU. Decodificar el HIN confirma la identidad del barco y año de construcción primero; desde ahí puedes verificar que el mismo número coincide con el título y ejecutar un reporte de historial marino antes de comprar." },
  { question: "¿Una moto acuática o PWC tiene un HIN?", answer: "Sí. Las motos acuáticas personales (jet skis, wave runners) siguen las mismas reglas de HIN de la Guardia Costera de EE. UU. que cualquier otro barco — un Número de Identificación del Casco de 12 caracteres, usualmente en la parte trasera del casco. Nuestro decodificador lee un HIN de PWC exactamente de la misma manera que lee un HIN de barco." },
];

interface Props { locale: Locale; }

export default function HinLookupBody({ locale }: Props) {
  const c = COPY[locale];
  const faqs = locale === "es" ? FAQS_ES : FAQS_EN;
  const link = (en: string) => (locale === "es" ? `/es${en}` : en);

  return (
    <article className="pb-16 bg-surface">
      <div className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
          <Breadcrumbs items={[{ label: c.home, href: locale === "es" ? "/es" : "/" }, { label: c.crumb }]} onDark />

          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <Waves className="w-4 h-4" /> {c.badge}
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
            {c.h1Lead}
            <span style={{ color: "var(--color-secondary-container)" }}>{c.h1Accent}</span>
          </h1>

          <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
            {c.introPre}<em>{c.introEm}</em>{c.introSuffix}
          </p>

          <HinDecoder locale={locale} />

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
              <div className="text-[11px] font-black uppercase tracking-wider text-on-surface-variant mb-2">{c.hinTag}</div>
              <p className="text-lg font-headline font-extrabold text-on-surface mb-3">{c.hinTitle}</p>
              <ul className="space-y-2 text-sm text-on-surface-variant">
                {c.hinBullets.map((b) => (
                  <li key={b} className="flex gap-2"><span>·</span><span>{b}</span></li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5 sm:p-6">
              <div className="text-[11px] font-black uppercase tracking-wider text-primary mb-2">{c.vinTag}</div>
              <p className="text-lg font-headline font-extrabold text-primary mb-3">{c.vinTitle}</p>
              <ul className="space-y-2 text-sm text-on-surface-variant">
                {c.vinBulletsPre.map((b) => (
                  <li key={b} className="flex gap-2"><span>·</span><span>{b}</span></li>
                ))}
                <li className="flex gap-2">
                  <span>·</span>
                  <span>{c.vinBullet3Pre}<em>{c.vinBullet3Em}</em>{c.vinBullet3Suffix}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-6 rounded-2xl bg-secondary-container/40 border border-outline-variant p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
              <p className="text-sm text-on-surface leading-relaxed">
                <strong className="text-on-surface">{c.quickTestBold}</strong>
                {c.quickTestMid}<strong>{c.quickTest12}</strong>{c.quickTestMid2}<strong>{c.quickTest17}</strong>{c.quickTestMid3}
                <Link href={link("/chassis-number-lookup")} className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.quickTestLink}</Link>
                {c.quickTestSuffix}
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
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Formats}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl">{c.formatsIntro}</p>
          <div className="overflow-x-auto rounded-2xl border border-outline-variant">
            <table className="w-full border-collapse min-w-[680px] text-sm">
              <thead className="bg-surface-container-low">
                <tr>
                  <th className="p-4 text-left font-headline font-extrabold text-primary">{c.formatsColFormat}</th>
                  <th className="p-4 text-left font-headline font-extrabold text-primary">{c.formatsColUsed}</th>
                  <th className="p-4 text-left font-headline font-extrabold text-primary">{c.formatsColLayout}</th>
                  <th className="p-4 text-left font-headline font-extrabold text-primary">{c.formatsColExample}</th>
                </tr>
              </thead>
              <tbody>
                {c.formatsRows.map((row) => (
                  <tr key={row.format} className="border-t border-outline-variant/60 align-top">
                    <td className="p-4 font-bold text-on-surface whitespace-nowrap">{row.format}</td>
                    <td className="p-4 text-on-surface-variant whitespace-nowrap">{row.used}</td>
                    <td className="p-4 text-on-surface-variant leading-relaxed">{row.layout}</td>
                    <td className="p-4">
                      <code className="font-mono text-xs bg-surface-container-low rounded px-2 py-1 text-primary whitespace-nowrap">{row.example}</code>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-on-surface-variant">
            {c.formatsFooterPre}<strong>{c.formatsFooterBold}</strong>{c.formatsFooterSuffix}
          </p>
        </section>

        <section className="py-10">
          <div className="rounded-3xl bg-primary p-7 sm:p-10 text-center">
            <Anchor className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">{c.midCtaHeading}</h2>
            <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">{c.midCtaSub}</p>
            <div className="max-w-xl mx-auto">
              <HinDecoder locale={locale} />
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{c.h2Match}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>{c.match1}</p>
              <p>{c.match2}</p>
              <p>{c.match3}</p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Ship className="w-5 h-5 text-primary" />
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
          <div className="max-w-xl mx-auto">
            <HinDecoder locale={locale} />
          </div>
          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-on-surface-variant">
            <Check className="w-3.5 h-3.5 text-green-500" strokeWidth={3} />
            {c.ctaBottomNote}
          </div>
        </section>

        <RelatedChecks exclude="/hin-lookup" />
      </div>
    </article>
  );
}

export { FAQS_EN, FAQS_ES, FAQS_FR };

// Wave 19 — French uses the Spanish FAQ array as a structural fallback.
// The user-visible FAQ component already uses the locale="fr" branch in COPY;
// this alias only feeds the JSON-LD FAQPage schema until /fr metadata is translated.
const FAQS_FR = FAQS_ES;
