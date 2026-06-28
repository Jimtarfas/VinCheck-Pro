/**
 * Shared body for /airbag-check and /es/airbag-check.
 * Wave 18 batch 3 — full English layout in both locales via COPY={en,es}.
 */

import Link from "next/link";
import {
  Check, Shield, ShieldAlert, Search, FileText, Database, ChevronRight,
  Lock, Zap, BadgeCheck, Sparkles, AlertTriangle, Wind, Cpu, Wrench,
  Gauge, ClipboardCheck, Ban, Car, CircleAlert,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import type { Locale } from "@/i18n/config";

const HOW_ICONS = [Search, Database, ClipboardCheck] as const;
const FRAUD_ICONS = [Ban, Wind, AlertTriangle, CircleAlert] as const;
const SIGN_ICONS = [ShieldAlert, Car, FileText, Cpu] as const;
const WHY_ICONS = [Shield, Wrench, BadgeCheck] as const;

const COPY = {
  en: {
    home: "Home", crumb: "Airbag Check",
    badge: "SRS History   ·   Fraud Detection",
    h1Lead: "Airbag & Deployment Check by VIN — ",
    h1Accent: "Will They Actually Deploy?",
    intro: "Airbag fraud is one of the most dangerous defects in the used-car market — a car can look perfectly repaired while hiding counterfeit modules, rag-stuffed cavities, or a disabled SRS system. Enter a 17-character VIN to surface the crash and title records that point to deployment, plus open airbag recalls — free, before you buy.",
    formHeading: "Check Airbag & SRS History by VIN",
    formSub: "Enter any 17-character VIN — we'll surface deployment signals and open airbag recalls on record",
    formNote: "Free · No sign-up · Instant result",
    trustStats: [
      { icon: Database, value: "Crash data", label: "severity records" },
      { icon: ShieldAlert, value: "SRS signals", label: "deployment clues" },
      { icon: BadgeCheck, value: "Recalls", label: "Takata & more" },
      { icon: Zap, value: "Free", label: "no sign-up" },
    ],
    h2How: "How a VIN Airbag Check Works",
    howIntro: "No database logs every deployment directly, so the check reads the records that reveal it. Three steps turn crash and title history into a clear picture of airbag risk.",
    howSteps: [
      { tag: "Step 1", title: "Enter the VIN", body: "Type the 17-character VIN from the dashboard, door jamb, title, or registration. Airbag risk is read from crash and title records tied to the VIN — not the car's cosmetic condition." },
      { tag: "Step 2", title: "We surface deployment signals", body: "The lookup pulls severe-accident, insurance total-loss, and salvage-title records that indicate likely deployment, plus any open NHTSA airbag recalls." },
      { tag: "Step 3", title: "Verify with an SRS scan", body: "A severe collision with no airbag-repair record is a red flag. Confirm in person with an OBD-II SRS diagnostic before you buy — the light alone isn't proof." },
    ],
    h2Why: "Why Airbag History Matters",
    why1Pre: "Airbags are ",
    why1Bold: "single-use",
    why1Suffix: " safety devices. Once deployed, restoring crash protection means replacing not just the airbag modules but the crash sensors, the airbag control module, the clockspring, seat-belt pretensioners, and often the steering wheel and dashboard covers the airbags tore through.",
    why2Pre: "A proper OEM replacement can cost ",
    why2Bold: "$3,000 to $10,000",
    why2Suffix: " or more. That high cost is exactly what tempts bad actors to cut corners — stuffing the cavity, fitting counterfeit modules that won't fire, or simply capping the holes with covers and nothing behind them.",
    why3Pre: "The consequence is brutal: a buyer drives a car that looks repaired but offers ",
    why3Bold: "no airbag protection",
    why3Suffix: " in the next crash — a failure they had no way of seeing from the outside.",
    exampleTitle: "Worked example — the red-flag gap",
    exampleRows: [
      { label: "Accident record", value: "severe frontal" },
      { label: "Airbag repair", value: "none on file" },
      { label: "Verdict", value: "verify SRS" },
    ],
    exampleNote: "A severe frontal crash that likely deployed airbags, with no replacement record, is the classic warning sign — get an SRS scan before you buy.",
    midCtaHeading: "Did This Car's Airbags Deploy?",
    midCtaSub: "A repaired look means nothing if the SRS system is fake or disabled. Run the VIN to surface the crash and recall records that expose airbag risk — free, in seconds.",
    h2Fraud: "Airbag Fraud — A Real and Documented Danger",
    fraudIntro: "NHTSA and the National Insurance Crime Bureau have documented theft rings and counterfeit modules sold as new on the secondary market. These are the four forms the fraud usually takes.",
    fraud: [
      { title: "Counterfeit airbags", body: "Fake modules that look correct but lack proper inflators — they may not deploy at all, or deploy with dangerous, uncontrolled force." },
      { title: "Placeholder stuffing", body: "Rags, foam, or other materials packed into the airbag cavity to keep a cosmetic appearance with no functional module behind the cover." },
      { title: "Used deployed modules", body: "Previously deployed airbags reinstalled without repacking. They physically fit but cannot deploy again in the next crash." },
      { title: "Disabled SRS systems", body: "The airbag warning light is disabled so the fault is invisible to a buyer or a quick inspection — hiding a non-functional system." },
    ],
    fraudNoteBoldLead: "The Takata recall.",
    fraudNoteMid: " The largest auto recall in U.S. history covers tens of millions of cars whose inflators can rupture and fire metal fragments into the cabin. Always confirm any open airbag recall is closed with a ",
    fraudNoteLink: "recall check",
    fraudNoteSuffix: " before buying.",
    h2Signs: "Signs of Improper Airbag Replacement",
    signsIntro: "A VIN check is your most powerful tool, but a careful in-person inspection adds another layer. Watch for these clues that the SRS system may not have been properly restored.",
    signs: [
      { title: "Lit SRS warning light", body: "An illuminated airbag light on the dashboard is an immediate red flag that the SRS system has a stored fault." },
      { title: "Mismatched covers", body: "Dashboard, steering-wheel, or pillar covers that don't match the rest of the interior can mean the airbag area was replaced." },
      { title: "Missing repair records", body: "Documented collision damage with no airbag-replacement entry in the service history warrants serious additional scrutiny." },
      { title: "SRS fault codes", body: "An OBD-II scan that reads SRS-specific fault codes can reveal airbag faults that aren't visible from the warning light alone." },
    ],
    h2Recorded: "How Airbag Deployment Is Recorded",
    recorded1Pre: "Deployment is recorded in several places. The vehicle's own ",
    recorded1Bold: "event data recorder",
    recorded1Suffix: " (the \u201cblack box\u201d) logs whether airbags fired, and insurance claims for crashes severe enough to deploy them create records captured in comprehensive VIN reports.",
    recorded2Pre: "Body-shop repair records may document the replacement, but they're not centrally databased — so deployment is often ",
    recorded2Bold: "inferred",
    recorded2Suffix: " from patterns: severe collision damage plus high documented repair cost points to a likely airbag event even without an explicit airbag line item.",
    recorded3Pre: "That's why the strongest assessment pairs the VIN history with a hands-on ",
    recorded3LinkLabel: "accident history check",
    recorded3Suffix: " and an in-person SRS diagnostic scan.",
    verifyCardTitle: "Airbag verification checklist",
    verifyChecklist: [
      "Run the VIN for severe-accident and salvage signals first",
      "Cross-check any open NHTSA airbag recall (e.g. Takata)",
      "Confirm the SRS warning light cycles on, then off, at startup",
      "Get an OBD-II SRS diagnostic scan from a qualified technician",
      "Demand documented OEM airbag-replacement repair records",
      "Never trust a dark airbag light alone — it can be disabled",
    ],
    verifyCardCta: "Start with the VIN — check the crash history first:",
    h2WhyBuy: "Why an Airbag Check Matters Before You Buy",
    whyBuyIntro: "No other defect is this invisible or this lethal. A VIN-based airbag check is the first line of defense between you and a car that can't protect you in a crash.",
    whyCards: [
      { title: "Protect your life", body: "A fake or disabled SRS system offers zero protection in the next collision. Verifying it is genuinely a life-safety decision." },
      { title: "Avoid a hidden repair bill", body: "Correctly restoring a deployed SRS system can run thousands. Knowing first lets you price it in — or walk away." },
      { title: "Verify, don't trust", body: "A dark airbag light can be deliberately disabled. The VIN history plus an SRS scan — not appearances — is the only real proof." },
    ],
    h2Internal: "More VIN Checks That Pair With an Airbag Check",
    internalIntro: "Airbag risk is one piece of the puzzle. These checks complete the safety picture before you buy.",
    internalLinks: [
      { href: "/accident-history-check", label: "Accident History Check", desc: "See the collision severity and context in which any airbag deployment likely occurred." },
      { href: "/salvage-title-check", label: "Salvage Title Check", desc: "Salvage and rebuilt brands often follow the severe crashes that deploy airbags." },
      { href: "/total-loss-check", label: "Total Loss Check", desc: "An insurer write-off usually means damage severe enough to trigger the SRS system." },
      { href: "/recall-check", label: "Recall Check", desc: "Confirm open airbag recalls like Takata are closed — repaired free by the dealer." },
      { href: "/vin-check", label: "Full VIN History Check", desc: "Accidents, title brands, airbag signals, odometer, and recalls in one report." },
      { href: "/vin-decoder", label: "VIN Decoder", desc: "Decode the 17-character VIN to specs, trim, and factory safety equipment." },
    ],
    h2Faq: "Airbag Check — Frequently Asked Questions",
    faqIntro: "The questions buyers ask most about airbag deployment, SRS repairs, and recall safety.",
    bottomBadge: "Free · Instant · VIN-Based",
    ctaBottomHeading: "Check Airbag & SRS History Now",
    ctaBottomSub: "Enter a 17-character VIN to surface deployment-linked crash records, salvage brands, and open airbag recalls before you buy.",
    ctaBottomNote: "No credit card · No sign-up · Free",
  },
  es: {
    home: "Inicio", crumb: "Verificación de bolsas de aire",
    badge: "Historial SRS   ·   Detección de fraude",
    h1Lead: "Verificación de bolsas de aire y despliegue por VIN — ",
    h1Accent: "¿Realmente se desplegarán?",
    intro: "El fraude de bolsas de aire es uno de los defectos más peligrosos en el mercado de autos usados — un auto puede verse perfectamente reparado mientras esconde módulos falsificados, cavidades rellenas con trapos o un sistema SRS deshabilitado. Ingresa un VIN de 17 caracteres para mostrar los registros de choques y títulos que apuntan a despliegue, además de retiros de seguridad de bolsas de aire abiertos — gratis, antes de comprar.",
    formHeading: "Verifica el historial de bolsas de aire y SRS por VIN",
    formSub: "Ingresa cualquier VIN de 17 caracteres — mostraremos señales de despliegue y retiros de seguridad de bolsas de aire abiertos en archivo",
    formNote: "Gratis · Sin registro · Resultado instantáneo",
    trustStats: [
      { icon: Database, value: "Datos de choques", label: "registros de gravedad" },
      { icon: ShieldAlert, value: "Señales SRS", label: "pistas de despliegue" },
      { icon: BadgeCheck, value: "Retiros", label: "Takata y más" },
      { icon: Zap, value: "Gratis", label: "sin registro" },
    ],
    h2How: "Cómo funciona una verificación VIN de bolsas de aire",
    howIntro: "Ninguna base de datos registra cada despliegue directamente, así que la verificación lee los registros que lo revelan. Tres pasos convierten el historial de choques y títulos en una imagen clara del riesgo de bolsas de aire.",
    howSteps: [
      { tag: "Paso 1", title: "Ingresa el VIN", body: "Escribe el VIN de 17 caracteres del tablero, marco de puerta, título o registro. El riesgo de bolsas de aire se lee de registros de choques y títulos vinculados al VIN — no de la condición cosmética del auto." },
      { tag: "Paso 2", title: "Mostramos señales de despliegue", body: "La búsqueda extrae registros de accidentes graves, pérdida total de aseguradoras y títulos de salvamento que indican despliegue probable, además de cualquier retiro de seguridad de bolsas de aire abierto de NHTSA." },
      { tag: "Paso 3", title: "Verifica con un escaneo SRS", body: "Una colisión grave sin registro de reparación de bolsa de aire es una bandera roja. Confirma en persona con un diagnóstico SRS por OBD-II antes de comprar — la luz por sí sola no es prueba." },
    ],
    h2Why: "Por qué importa el historial de bolsas de aire",
    why1Pre: "Las bolsas de aire son dispositivos de seguridad de ",
    why1Bold: "un solo uso",
    why1Suffix: ". Una vez desplegadas, restaurar la protección en choques significa reemplazar no solo los módulos de bolsa de aire sino los sensores de choque, el módulo de control de bolsas de aire, el clockspring, los pretensores de cinturones de seguridad y, a menudo, el volante y las cubiertas del tablero que las bolsas atravesaron.",
    why2Pre: "Un reemplazo OEM apropiado puede costar ",
    why2Bold: "$3,000 a $10,000",
    why2Suffix: " o más. Ese alto costo es exactamente lo que tienta a los malos actores a tomar atajos — rellenar la cavidad, instalar módulos falsificados que no dispararán, o simplemente tapar los huecos con cubiertas y nada detrás.",
    why3Pre: "La consecuencia es brutal: un comprador conduce un auto que se ve reparado pero ofrece ",
    why3Bold: "cero protección de bolsas de aire",
    why3Suffix: " en el próximo choque — una falla que no tenían forma de ver desde afuera.",
    exampleTitle: "Ejemplo trabajado — la brecha de bandera roja",
    exampleRows: [
      { label: "Registro de accidente", value: "frontal grave" },
      { label: "Reparación de bolsa de aire", value: "ninguna en archivo" },
      { label: "Veredicto", value: "verificar SRS" },
    ],
    exampleNote: "Un choque frontal grave que probablemente desplegó bolsas de aire, sin registro de reemplazo, es la señal de advertencia clásica — obtén un escaneo SRS antes de comprar.",
    midCtaHeading: "¿Se desplegaron las bolsas de aire de este auto?",
    midCtaSub: "Una apariencia reparada no significa nada si el sistema SRS es falso o está deshabilitado. Ejecuta el VIN para mostrar los registros de choques y retiros que exponen el riesgo de bolsas de aire — gratis, en segundos.",
    h2Fraud: "Fraude de bolsas de aire — Un peligro real y documentado",
    fraudIntro: "NHTSA y el National Insurance Crime Bureau han documentado redes de robo y módulos falsificados vendidos como nuevos en el mercado secundario. Estas son las cuatro formas que el fraude usualmente toma.",
    fraud: [
      { title: "Bolsas de aire falsificadas", body: "Módulos falsos que se ven correctos pero carecen de infladores apropiados — pueden no desplegarse en absoluto, o desplegarse con fuerza peligrosa y descontrolada." },
      { title: "Relleno de marcador", body: "Trapos, espuma u otros materiales empacados en la cavidad de la bolsa de aire para mantener una apariencia cosmética sin un módulo funcional detrás de la cubierta." },
      { title: "Módulos usados ya desplegados", body: "Bolsas de aire previamente desplegadas reinstaladas sin re-empaque. Físicamente caben pero no pueden desplegarse de nuevo en el próximo choque." },
      { title: "Sistemas SRS deshabilitados", body: "La luz de advertencia de bolsa de aire está deshabilitada para que la falla sea invisible para un comprador o una inspección rápida — escondiendo un sistema no funcional." },
    ],
    fraudNoteBoldLead: "El retiro de seguridad de Takata.",
    fraudNoteMid: " El mayor retiro automotriz en la historia de EE. UU. cubre decenas de millones de autos cuyos infladores pueden romperse y disparar fragmentos de metal hacia la cabina. Siempre confirma que cualquier retiro de seguridad de bolsa de aire abierto esté cerrado con una ",
    fraudNoteLink: "verificación de retiros",
    fraudNoteSuffix: " antes de comprar.",
    h2Signs: "Señales de reemplazo incorrecto de bolsas de aire",
    signsIntro: "Una verificación VIN es tu herramienta más poderosa, pero una inspección cuidadosa en persona agrega otra capa. Vigila estas pistas de que el sistema SRS puede no haberse restaurado apropiadamente.",
    signs: [
      { title: "Luz de advertencia SRS encendida", body: "Una luz de bolsa de aire iluminada en el tablero es una bandera roja inmediata de que el sistema SRS tiene una falla almacenada." },
      { title: "Cubiertas que no coinciden", body: "Cubiertas del tablero, volante o pilares que no coinciden con el resto del interior pueden significar que el área de bolsa de aire fue reemplazada." },
      { title: "Registros de reparación faltantes", body: "Daño de colisión documentado sin entrada de reemplazo de bolsa de aire en el historial de servicio merece escrutinio adicional serio." },
      { title: "Códigos de falla SRS", body: "Un escaneo OBD-II que lee códigos de falla específicos de SRS puede revelar fallas de bolsa de aire que no son visibles solo desde la luz de advertencia." },
    ],
    h2Recorded: "Cómo se registra el despliegue de bolsas de aire",
    recorded1Pre: "El despliegue se registra en varios lugares. El propio ",
    recorded1Bold: "registrador de datos de evento",
    recorded1Suffix: " del vehículo (la \u201ccaja negra\u201d) registra si las bolsas de aire dispararon, y los reclamos de seguro por choques lo suficientemente graves para desplegarlas crean registros capturados en reportes VIN completos.",
    recorded2Pre: "Los registros de reparación de talleres de carrocería pueden documentar el reemplazo, pero no están centralizados en una base de datos — así que el despliegue a menudo se ",
    recorded2Bold: "infiere",
    recorded2Suffix: " de patrones: daño grave de colisión más alto costo de reparación documentado apunta a un probable evento de bolsa de aire incluso sin una línea explícita de bolsa de aire.",
    recorded3Pre: "Por eso la evaluación más fuerte combina el historial VIN con una ",
    recorded3LinkLabel: "verificación de historial de accidentes",
    recorded3Suffix: " práctica y un escaneo diagnóstico SRS en persona.",
    verifyCardTitle: "Lista de verificación de bolsas de aire",
    verifyChecklist: [
      "Ejecuta el VIN para señales de accidentes graves y salvamento primero",
      "Cruza cualquier retiro de seguridad de bolsa de aire abierto de NHTSA (p. ej. Takata)",
      "Confirma que la luz de advertencia SRS cicla encendida, luego apagada, al arranque",
      "Obtén un escaneo diagnóstico SRS por OBD-II de un técnico calificado",
      "Exige registros documentados de reparación de reemplazo OEM de bolsa de aire",
      "Nunca confíes solo en una luz de bolsa de aire apagada — puede deshabilitarse",
    ],
    verifyCardCta: "Comienza con el VIN — verifica el historial de choques primero:",
    h2WhyBuy: "Por qué una verificación de bolsas de aire importa antes de comprar",
    whyBuyIntro: "Ningún otro defecto es tan invisible o tan letal. Una verificación de bolsas de aire basada en VIN es la primera línea de defensa entre tú y un auto que no puede protegerte en un choque.",
    whyCards: [
      { title: "Protege tu vida", body: "Un sistema SRS falso o deshabilitado ofrece cero protección en la próxima colisión. Verificarlo es genuinamente una decisión de seguridad de vida." },
      { title: "Evita una factura de reparación oculta", body: "Restaurar correctamente un sistema SRS desplegado puede costar miles. Saberlo primero te permite considerarlo en el precio — o alejarte." },
      { title: "Verifica, no confíes", body: "Una luz de bolsa de aire apagada puede deshabilitarse deliberadamente. El historial VIN más un escaneo SRS — no las apariencias — es la única prueba real." },
    ],
    h2Internal: "Más verificaciones VIN que se combinan con una verificación de bolsas de aire",
    internalIntro: "El riesgo de bolsas de aire es una pieza del rompecabezas. Estas verificaciones completan la imagen de seguridad antes de comprar.",
    internalLinks: [
      { href: "/accident-history-check", label: "Verificación historial accidentes", desc: "Mira la gravedad de colisión y el contexto en el que probablemente ocurrió cualquier despliegue de bolsa de aire." },
      { href: "/salvage-title-check", label: "Verificación título salvamento", desc: "Las marcas de salvamento y reconstruido a menudo siguen a los choques graves que despliegan bolsas de aire." },
      { href: "/total-loss-check", label: "Verificación pérdida total", desc: "Una declaración de pérdida total de una aseguradora usualmente significa daño suficientemente grave para activar el sistema SRS." },
      { href: "/recall-check", label: "Verificación de retiros", desc: "Confirma que los retiros de seguridad de bolsa de aire abiertos como Takata estén cerrados — reparados gratis por el concesionario." },
      { href: "/vin-check", label: "Verificación completa de historial VIN", desc: "Accidentes, marcas de título, señales de bolsa de aire, odómetro y retiros en un reporte." },
      { href: "/vin-decoder", label: "Decodificador VIN", desc: "Decodifica el VIN de 17 caracteres en especificaciones, versión y equipo de seguridad de fábrica." },
    ],
    h2Faq: "Verificación de bolsas de aire — Preguntas frecuentes",
    faqIntro: "Las preguntas que más hacen los compradores sobre despliegue de bolsas de aire, reparaciones SRS y seguridad de retiros.",
    bottomBadge: "Gratis · Instantáneo · Basado en VIN",
    ctaBottomHeading: "Verifica el historial de bolsas de aire y SRS ahora",
    ctaBottomSub: "Ingresa un VIN de 17 caracteres para mostrar registros de choques vinculados a despliegue, marcas de salvamento y retiros de seguridad de bolsas de aire abiertos antes de comprar.",
    ctaBottomNote: "Sin tarjeta de crédito · Sin registro · Gratis",
  },
  fr: {
    home: "Accueil", crumb: "Vérification d'airbag",
    badge: "Historique SRS   ·   Détection de fraude",
    h1Lead: "Vérification d'airbag et déploiement par VIN — ",
    h1Accent: "Vont-ils réellement se déployer ?",
    intro: "La fraude d'airbag est l'un des défauts les plus dangereux sur le marché des voitures d'occasion — une voiture peut sembler parfaitement réparée tout en cachant des modules contrefaits, des cavités remplies de chiffons ou un système SRS désactivé. Saisis un VIN de 17 caractères pour faire ressortir les registres d'accidents et de titres qui pointent vers un déploiement, plus les rappels d'airbag ouverts — gratuit, avant d'acheter.",
    formHeading: "Vérifie l'historique d'airbag et SRS par VIN",
    formSub: "Saisis n'importe quel VIN de 17 caractères — nous ferons ressortir les signaux de déploiement et les rappels d'airbag ouverts au dossier",
    formNote: "Gratuit · Sans inscription · Résultat instantané",
    trustStats: [
      { icon: Database, value: "Données d'accidents", label: "registres de gravité" },
      { icon: ShieldAlert, value: "Signaux SRS", label: "indices de déploiement" },
      { icon: BadgeCheck, value: "Rappels", label: "Takata et plus" },
      { icon: Zap, value: "Gratuit", label: "sans inscription" },
    ],
    h2How: "Comment fonctionne une vérification VIN d'airbag",
    howIntro: "Aucune base de données n'enregistre directement chaque déploiement, donc la vérification lit les registres qui le révèlent. Trois étapes transforment l'historique des accidents et des titres en une image claire du risque d'airbag.",
    howSteps: [
      { tag: "Étape 1", title: "Saisis le VIN", body: "Tape le VIN de 17 caractères du tableau de bord, du montant de la porte, du titre ou de l'enregistrement. Le risque d'airbag est lu à partir des registres d'accidents et de titres liés au VIN — pas de l'état cosmétique de la voiture." },
      { tag: "Étape 2", title: "Nous faisons ressortir les signaux de déploiement", body: "La recherche extrait les registres d'accidents graves, de pertes totales d'assurance et de titres de salvage qui indiquent un déploiement probable, plus tout rappel d'airbag ouvert NHTSA." },
      { tag: "Étape 3", title: "Vérifie avec un scan SRS", body: "Une collision grave sans registre de réparation d'airbag est un drapeau rouge. Confirme en personne avec un diagnostic SRS OBD-II avant d'acheter — le voyant seul n'est pas une preuve." },
    ],
    h2Why: "Pourquoi l'historique d'airbag importe",
    why1Pre: "Les airbags sont des dispositifs de sécurité à ",
    why1Bold: "usage unique",
    why1Suffix: ". Une fois déployés, restaurer la protection en cas d'accident signifie remplacer non seulement les modules d'airbag mais aussi les capteurs d'accident, le module de contrôle d'airbag, le clockspring, les pré-tensionneurs de ceinture de sécurité et souvent le volant et les couvercles du tableau de bord que les airbags ont traversés.",
    why2Pre: "Un remplacement OEM approprié peut coûter ",
    why2Bold: "$3,000 à $10,000",
    why2Suffix: " ou plus. Ce coût élevé est exactement ce qui tente les mauvais acteurs à couper les coins — remplir la cavité, installer des modules contrefaits qui ne se déclencheront pas, ou simplement couvrir les trous avec des couvercles et rien derrière.",
    why3Pre: "La conséquence est brutale : un acheteur conduit une voiture qui semble réparée mais n'offre ",
    why3Bold: "aucune protection d'airbag",
    why3Suffix: " lors du prochain accident — une défaillance qu'il n'avait aucun moyen de voir de l'extérieur.",
    exampleTitle: "Exemple travaillé — l'écart de drapeau rouge",
    exampleRows: [
      { label: "Registre d'accident", value: "frontal grave" },
      { label: "Réparation d'airbag", value: "aucune au dossier" },
      { label: "Verdict", value: "vérifier SRS" },
    ],
    exampleNote: "Un accident frontal grave qui a probablement déployé les airbags, sans registre de remplacement, est le signe d'avertissement classique — obtiens un scan SRS avant d'acheter.",
    midCtaHeading: "Les airbags de cette voiture se sont-ils déployés ?",
    midCtaSub: "Une apparence réparée ne signifie rien si le système SRS est faux ou désactivé. Lance le VIN pour faire ressortir les registres d'accidents et de rappels qui exposent le risque d'airbag — gratuit, en quelques secondes.",
    h2Fraud: "Fraude d'airbag — Un danger réel et documenté",
    fraudIntro: "NHTSA et le National Insurance Crime Bureau ont documenté des réseaux de vol et des modules contrefaits vendus comme neufs sur le marché secondaire. Voici les quatre formes que prend généralement la fraude.",
    fraud: [
      { title: "Airbags contrefaits", body: "Faux modules qui semblent corrects mais manquent d'inflateurs appropriés — ils peuvent ne pas se déployer du tout, ou se déployer avec une force dangereuse et incontrôlée." },
      { title: "Remplissage factice", body: "Chiffons, mousse ou autres matériaux entassés dans la cavité de l'airbag pour maintenir une apparence cosmétique sans module fonctionnel derrière la couverture." },
      { title: "Modules usagés déjà déployés", body: "Airbags précédemment déployés réinstallés sans remballage. Ils s'adaptent physiquement mais ne peuvent plus se déployer lors du prochain accident." },
      { title: "Systèmes SRS désactivés", body: "Le voyant d'avertissement d'airbag est désactivé pour que le défaut soit invisible à un acheteur ou à une inspection rapide — cachant un système non fonctionnel." },
    ],
    fraudNoteBoldLead: "Le rappel Takata.",
    fraudNoteMid: " Le plus grand rappel automobile de l'histoire des États-Unis couvre des dizaines de millions de voitures dont les inflateurs peuvent se rompre et tirer des fragments de métal dans l'habitacle. Confirme toujours qu'un rappel d'airbag ouvert est clos avec une ",
    fraudNoteLink: "vérification de rappels",
    fraudNoteSuffix: " avant d'acheter.",
    h2Signs: "Signes de remplacement incorrect d'airbag",
    signsIntro: "Une vérification VIN est ton outil le plus puissant, mais une inspection minutieuse en personne ajoute une autre couche. Surveille ces indices que le système SRS peut ne pas avoir été correctement restauré.",
    signs: [
      { title: "Voyant SRS allumé", body: "Un voyant d'airbag allumé sur le tableau de bord est un drapeau rouge immédiat indiquant que le système SRS a un défaut stocké." },
      { title: "Couvercles non assortis", body: "Couvercles de tableau de bord, de volant ou de montants qui ne correspondent pas au reste de l'intérieur peuvent signifier que la zone d'airbag a été remplacée." },
      { title: "Registres de réparation manquants", body: "Dommages de collision documentés sans entrée de remplacement d'airbag dans l'historique de service méritent un examen supplémentaire sérieux." },
      { title: "Codes d'erreur SRS", body: "Un scan OBD-II qui lit les codes d'erreur spécifiques au SRS peut révéler des défauts d'airbag qui ne sont pas visibles uniquement à partir du voyant d'avertissement." },
    ],
    h2Recorded: "Comment le déploiement d'airbag est enregistré",
    recorded1Pre: "Le déploiement est enregistré à plusieurs endroits. Le propre ",
    recorded1Bold: "enregistreur de données d'événement",
    recorded1Suffix: " du véhicule (la \u201cboîte noire\u201d) consigne si les airbags se sont déclenchés, et les réclamations d'assurance pour des accidents suffisamment graves pour les déployer créent des registres capturés dans les rapports VIN complets.",
    recorded2Pre: "Les registres de réparation des carrosseries peuvent documenter le remplacement, mais ils ne sont pas centralisés dans une base de données — donc le déploiement est souvent ",
    recorded2Bold: "déduit",
    recorded2Suffix: " des modèles : dommages graves de collision plus coût de réparation documenté élevé pointent vers un événement probable d'airbag même sans ligne explicite d'airbag.",
    recorded3Pre: "C'est pourquoi l'évaluation la plus solide associe l'historique VIN avec une ",
    recorded3LinkLabel: "vérification de l'historique d'accidents",
    recorded3Suffix: " pratique et un scan diagnostique SRS en personne.",
    verifyCardTitle: "Liste de vérification d'airbag",
    verifyChecklist: [
      "Lance le VIN pour les signaux d'accidents graves et de salvage d'abord",
      "Croise tout rappel d'airbag ouvert de NHTSA (p. ex. Takata)",
      "Confirme que le voyant SRS s'allume puis s'éteint au démarrage",
      "Obtiens un scan diagnostique SRS OBD-II d'un technicien qualifié",
      "Exige des registres documentés de réparation de remplacement OEM d'airbag",
      "Ne te fie jamais à un voyant d'airbag éteint seul — il peut être désactivé",
    ],
    verifyCardCta: "Commence par le VIN — vérifie d'abord l'historique des accidents :",
    h2WhyBuy: "Pourquoi une vérification d'airbag importe avant d'acheter",
    whyBuyIntro: "Aucun autre défaut n'est aussi invisible ou aussi mortel. Une vérification d'airbag basée sur le VIN est la première ligne de défense entre toi et une voiture qui ne peut pas te protéger en cas d'accident.",
    whyCards: [
      { title: "Protège ta vie", body: "Un système SRS faux ou désactivé n'offre aucune protection lors de la prochaine collision. Le vérifier est véritablement une décision de sécurité vitale." },
      { title: "Évite une facture de réparation cachée", body: "Restaurer correctement un système SRS déployé peut coûter des milliers. Le savoir d'abord te permet de l'intégrer au prix — ou de te retirer." },
      { title: "Vérifie, ne te fie pas", body: "Un voyant d'airbag éteint peut être délibérément désactivé. L'historique VIN plus un scan SRS — pas les apparences — est la seule vraie preuve." },
    ],
    h2Internal: "Plus de vérifications VIN qui s'associent à une vérification d'airbag",
    internalIntro: "Le risque d'airbag est une pièce du puzzle. Ces vérifications complètent l'image de sécurité avant d'acheter.",
    internalLinks: [
      { href: "/accident-history-check", label: "Vérification historique d'accidents", desc: "Vois la gravité de collision et le contexte dans lequel tout déploiement d'airbag s'est probablement produit." },
      { href: "/salvage-title-check", label: "Vérification titre de salvage", desc: "Les marques de salvage et reconstruit suivent souvent les accidents graves qui déploient les airbags." },
      { href: "/total-loss-check", label: "Vérification perte totale", desc: "Une déclaration de perte totale d'assureur signifie généralement des dommages assez graves pour déclencher le système SRS." },
      { href: "/recall-check", label: "Vérification de rappels", desc: "Confirme que les rappels d'airbag ouverts comme Takata sont clos — réparés gratuitement par le concessionnaire." },
      { href: "/vin-check", label: "Vérification complète d'historique VIN", desc: "Accidents, marques de titre, signaux d'airbag, compteur kilométrique et rappels dans un seul rapport." },
      { href: "/vin-decoder", label: "Décodeur VIN", desc: "Décode le VIN de 17 caractères en spécifications, finition et équipement de sécurité d'usine." },
    ],
    h2Faq: "Vérification d'airbag — Questions fréquentes",
    faqIntro: "Les questions que les acheteurs posent le plus sur le déploiement d'airbag, les réparations SRS et la sécurité des rappels.",
    bottomBadge: "Gratuit · Instantané · Basé sur VIN",
    ctaBottomHeading: "Vérifie l'historique d'airbag et SRS maintenant",
    ctaBottomSub: "Saisis un VIN de 17 caractères pour faire ressortir les registres d'accidents liés au déploiement, les marques de salvage et les rappels d'airbag ouverts avant d'acheter.",
    ctaBottomNote: "Sans carte de crédit · Sans inscription · Gratuit",
  },
} as const;

const FAQS_EN = [
  { question: "Does a VIN check show airbag deployment history?", answer: "A VIN check rarely logs each airbag deployment as a separate line item. Instead, it surfaces the records that point to deployment: severe accident reports, insurance total-loss declarations, and salvage or rebuilt title brands. When a frontal or side collision appears in the history at speeds that typically trigger the SRS system, that is strong evidence airbags deployed — even when no explicit airbag entry exists." },
  { question: "Why do deployed airbags matter when buying a used car?", answer: "Airbags are single-use devices. Once deployed, they must be replaced with proper modules, sensors, and the airbag control module to restore crash protection. A correct replacement can cost $3,000 to $10,000, which tempts some sellers to install counterfeit modules, stuff the cavity with rags, or leave the system disabled. A buyer then drives a car that looks repaired but offers no airbag protection in the next crash." },
  { question: "Can you tell if airbags were replaced after deployment?", answer: "Not always from the VIN alone. Body-shop repair records are not centrally databased, so airbag replacement is often inferred rather than documented. The most reliable confirmation combines the VIN history with a physical inspection: check for a lit SRS warning light, mismatched dashboard or steering-wheel covers, and have a technician read SRS fault codes with an OBD-II scan tool before buying." },
  { question: "Does a salvage or total-loss title mean airbags deployed?", answer: "Not automatically, but it is a strong signal. A salvage or total-loss brand means an insurer declared the repair cost too high relative to the car's value, and severe frontal or side collisions that cause that damage usually deploy airbags. Flood or theft total-losses may not involve deployment. Treat any salvage or rebuilt title as a prompt to verify the SRS system was fully and correctly restored." },
  { question: "How do I check airbag status by VIN?", answer: "Enter the 17-character VIN into the search tool above. The report pulls accident severity, insurance total-loss, and salvage title records that indicate likely airbag deployment, plus any open NHTSA airbag-related recalls. For full confirmation, pair the VIN check with a pre-purchase inspection that includes an SRS diagnostic scan, since the actual condition of the airbag modules must be verified in person." },
  { question: "Are airbag recalls like the Takata recall shown by VIN?", answer: "Yes. Open airbag-related recalls are tied to the VIN through NHTSA's recall database, which you can search free at nhtsa.gov. The Takata inflator recall — the largest automotive recall in U.S. history, affecting tens of millions of vehicles — is tracked this way. A defective Takata inflator can rupture and send metal fragments into the cabin, so always confirm any open recall is closed before buying." },
  { question: "Is it safe to buy a car with previously deployed airbags?", answer: "It can be, but only if the airbags and the full SRS system were replaced correctly with OEM or equivalent parts by a qualified shop. The danger is not the prior deployment itself but improper repair — counterfeit modules, used modules that cannot redeploy, or a disabled warning light. Require documented repair records and an SRS diagnostic scan, and never rely on the airbag light being off alone." },
];

const FAQS_ES = [
  { question: "¿Una verificación VIN muestra el historial de despliegue de bolsas de aire?", answer: "Una verificación VIN rara vez registra cada despliegue de bolsa de aire como una línea separada. En su lugar, muestra los registros que apuntan al despliegue: reportes de accidentes graves, declaraciones de pérdida total de aseguradoras y marcas de título de salvamento o reconstruido. Cuando una colisión frontal o lateral aparece en el historial a velocidades que típicamente activan el sistema SRS, esa es fuerte evidencia de que las bolsas de aire se desplegaron — incluso cuando no existe una entrada explícita de bolsa de aire." },
  { question: "¿Por qué importan las bolsas de aire desplegadas al comprar un auto usado?", answer: "Las bolsas de aire son dispositivos de un solo uso. Una vez desplegadas, deben reemplazarse con módulos, sensores y el módulo de control de bolsas de aire apropiados para restaurar la protección en choques. Un reemplazo correcto puede costar de $3,000 a $10,000, lo que tienta a algunos vendedores a instalar módulos falsificados, rellenar la cavidad con trapos o dejar el sistema deshabilitado. Un comprador entonces conduce un auto que se ve reparado pero no ofrece protección de bolsas de aire en el próximo choque." },
  { question: "¿Puedes saber si las bolsas de aire fueron reemplazadas después del despliegue?", answer: "No siempre solo desde el VIN. Los registros de reparación de talleres de carrocería no están centralizados en bases de datos, así que el reemplazo de bolsa de aire a menudo se infiere en lugar de documentarse. La confirmación más confiable combina el historial VIN con una inspección física: revisa si hay una luz de advertencia SRS encendida, cubiertas de tablero o volante que no coincidan, y haz que un técnico lea los códigos de falla SRS con una herramienta de escaneo OBD-II antes de comprar." },
  { question: "¿Un título de salvamento o pérdida total significa que las bolsas de aire se desplegaron?", answer: "No automáticamente, pero es una fuerte señal. Una marca de salvamento o pérdida total significa que una aseguradora declaró el costo de reparación demasiado alto en relación con el valor del auto, y las colisiones frontales o laterales graves que causan ese daño usualmente despliegan bolsas de aire. Las pérdidas totales por inundación o robo pueden no involucrar despliegue. Trata cualquier título de salvamento o reconstruido como un indicador para verificar que el sistema SRS se haya restaurado completa y correctamente." },
  { question: "¿Cómo verifico el estado de las bolsas de aire por VIN?", answer: "Ingresa el VIN de 17 caracteres en la herramienta de búsqueda arriba. El reporte extrae registros de gravedad de accidentes, pérdida total de aseguradoras y títulos de salvamento que indican despliegue probable de bolsas de aire, además de cualquier retiro de seguridad relacionado con bolsas de aire abierto de NHTSA. Para confirmación completa, combina la verificación VIN con una inspección previa a la compra que incluya un escaneo diagnóstico SRS, ya que la condición real de los módulos de bolsa de aire debe verificarse en persona." },
  { question: "¿Los retiros de seguridad de bolsas de aire como el de Takata se muestran por VIN?", answer: "Sí. Los retiros de seguridad abiertos relacionados con bolsas de aire están vinculados al VIN a través de la base de datos de retiros de NHTSA, que puedes buscar gratis en nhtsa.gov. El retiro de seguridad de infladores Takata — el mayor retiro automotriz en la historia de EE. UU., afectando decenas de millones de vehículos — se rastrea de esta manera. Un inflador Takata defectuoso puede romperse y enviar fragmentos de metal a la cabina, así que siempre confirma que cualquier retiro abierto esté cerrado antes de comprar." },
  { question: "¿Es seguro comprar un auto con bolsas de aire previamente desplegadas?", answer: "Puede serlo, pero solo si las bolsas de aire y el sistema SRS completo se reemplazaron correctamente con partes OEM o equivalentes por un taller calificado. El peligro no es el despliegue previo en sí sino la reparación incorrecta — módulos falsificados, módulos usados que no pueden volver a desplegarse, o una luz de advertencia deshabilitada. Exige registros documentados de reparación y un escaneo diagnóstico SRS, y nunca te bases solo en que la luz de bolsa de aire esté apagada." },
];

interface Props { locale: Locale; }

export default function AirbagCheckBody({ locale }: Props) {
  const c = COPY[locale];
  const faqs = locale === "es" ? FAQS_ES : FAQS_EN;
  const link = (en: string) => (locale === "es" ? `/es${en}` : en);

  return (
    <article className="pb-16 bg-surface">
      <div className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
          <Breadcrumbs items={[{ label: c.home, href: locale === "es" ? "/es" : "/" }, { label: c.crumb }]} onDark />
          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <ShieldAlert className="w-4 h-4" /> {c.badge}
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
            {c.h1Lead}
            <span style={{ color: "var(--color-secondary-container)" }}>{c.h1Accent}</span>
          </h1>
          <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">{c.intro}</p>

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
                  <div className="text-xl sm:text-2xl font-headline font-black text-white">{s.value}</div>
                  <div className="text-[11px] text-white/65 leading-tight mt-0.5">{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
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
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Why}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {c.why1Pre}
                <strong className="text-on-surface">{c.why1Bold}</strong>
                {c.why1Suffix}
              </p>
              <p>
                {c.why2Pre}
                <strong className="text-on-surface">{c.why2Bold}</strong>
                {c.why2Suffix}
              </p>
              <p>
                {c.why3Pre}
                <strong className="text-on-surface">{c.why3Bold}</strong>
                {c.why3Suffix}
              </p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Gauge className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.exampleTitle}</h3>
              </div>
              <ul className="space-y-3 text-sm text-on-surface">
                {c.exampleRows.map((r) => (
                  <li key={r.label} className="flex items-center justify-between gap-3 rounded-lg bg-white px-3.5 py-2.5 border border-outline-variant/60">
                    <span className="text-on-surface-variant">{r.label}</span>
                    <code className="font-mono font-bold text-primary">{r.value}</code>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-on-surface-variant leading-relaxed">{c.exampleNote}</p>
            </div>
          </div>
        </section>

        <section className="py-10">
          <div className="rounded-3xl bg-primary p-7 sm:p-10 text-center">
            <Sparkles className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">{c.midCtaHeading}</h2>
            <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">{c.midCtaSub}</p>
            <div className="max-w-xl mx-auto bg-white rounded-2xl p-4 sm:p-5">
              <VinSearchForm size="lg" />
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Fraud}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.fraudIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {c.fraud.map((f, i) => {
              const Icon = FRAUD_ICONS[i];
              return (
                <div key={f.title} className="rounded-2xl border border-outline-variant bg-surface p-5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-base font-headline font-extrabold text-primary mb-1">{f.title}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{f.body}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-6 rounded-2xl bg-secondary-container/40 border border-outline-variant p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
              <p className="text-sm text-on-surface leading-relaxed">
                <strong className="text-on-surface">{c.fraudNoteBoldLead}</strong>
                {c.fraudNoteMid}
                <Link href={link("/recall-check")} className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.fraudNoteLink}</Link>
                {c.fraudNoteSuffix}
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Signs}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.signsIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {c.signs.map((s, i) => {
              const Icon = SIGN_ICONS[i];
              return (
                <div key={s.title} className="rounded-2xl border border-outline-variant bg-surface p-5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-base font-headline font-extrabold text-primary mb-1">{s.title}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{s.body}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{c.h2Recorded}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {c.recorded1Pre}
                <strong className="text-on-surface">{c.recorded1Bold}</strong>
                {c.recorded1Suffix}
              </p>
              <p>
                {c.recorded2Pre}
                <strong className="text-on-surface">{c.recorded2Bold}</strong>
                {c.recorded2Suffix}
              </p>
              <p>
                {c.recorded3Pre}
                <Link href={link("/accident-history-check")} className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.recorded3LinkLabel}</Link>
                {c.recorded3Suffix}
              </p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <ClipboardCheck className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.verifyCardTitle}</h3>
              </div>
              <ul className="space-y-2 text-sm text-on-surface">
                {c.verifyChecklist.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 rounded-xl bg-white p-4 border border-outline-variant">
                <p className="text-xs font-bold text-on-surface mb-2">{c.verifyCardCta}</p>
                <VinSearchForm size="sm" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2WhyBuy}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.whyBuyIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {c.whyCards.map((item, i) => {
              const Icon = WHY_ICONS[i];
              return (
                <div key={item.title} className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
                  <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1.5">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{item.body}</p>
                </div>
              );
            })}
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

        <RelatedChecks exclude="/airbag-check" />
      </div>
    </article>
  );
}

export { FAQS_EN, FAQS_ES, FAQS_FR };

// Wave 19 — French uses the Spanish FAQ array as a structural fallback.
// The user-visible FAQ component already uses the locale="fr" branch in COPY;
// this alias only feeds the JSON-LD FAQPage schema until /fr metadata is translated.
const FAQS_FR = FAQS_ES;
