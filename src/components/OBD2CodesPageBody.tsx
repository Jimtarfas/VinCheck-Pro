/**
 * Shared body for /obd2-codes and /es/obd2-codes.
 * Wave 16d.2 — identical JSX, locale-driven copy.
 *
 * OBD-II codes themselves are international standards (SAE J2012)
 * so the code names stay English. Surrounding explanatory text
 * (severity descriptions, FAQs, sections) translate.
 */

import Link from "next/link";
import {
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  Wrench,
  Zap,
  Activity,
  Cpu,
  Gauge,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import OBD2CodeLookup from "@/app/obd2-codes/OBD2CodeLookup";
import type { Locale } from "@/i18n/config";

const COPY = {
  en: {
    breadcrumbHome: "Home",
    breadcrumbCurrent: "OBD-II Code Lookup",
    h1: "Free OBD-II Code Lookup",
    heroLead:
      "Decode any check engine light code instantly. Search by code or keyword to see meaning, symptoms, probable causes, severity, DIY difficulty, and estimated repair cost. Free, no signup, all generic and common manufacturer-specific codes covered.",
    whatHeading: "What is an OBD-II Code?",
    whatP1:
      "An OBD-II code — also called a Diagnostic Trouble Code or DTC — is a 5-character code stored in your vehicle's computer when it detects a fault. Every car sold in the United States since 1996 uses this same standard (defined in SAE J2012), which is why the same scanner works on a Honda Civic, a Ford F-150, and a BMW 3 Series.",
    whatP2Pre: "The format is always:",
    whatP2Format: "one letter + four digits",
    whatP2Mid: ". The letter identifies the system. The first digit (0 or 1) tells you whether the code is generic or manufacturer-specific. The remaining three digits identify the specific fault. So",
    whatP2Code1: "P0420",
    whatP2Middle2: "is a generic",
    whatP2Powertrain: "powertrain",
    whatP2Middle3: "code, while",
    whatP2Code2: "P1399",
    whatP2Suffix: "is a manufacturer-specific powertrain code (Honda, in this case).",
    categoriesHeading: "Code Categories Explained",
    categories: [
      {
        name: "Powertrain",
        catLabel: "Category P",
        desc: "Engine, transmission, fuel system, ignition, emissions. The largest category — about 70% of codes most drivers encounter.",
      },
      {
        name: "Body",
        catLabel: "Category B",
        desc: "Airbags (SRS), climate control, lighting, power windows, seats and interior electronics.",
      },
      {
        name: "Chassis",
        catLabel: "Category C",
        desc: "ABS, traction control, stability control, suspension, steering, tire pressure (TPMS).",
      },
      {
        name: "Network / Communication",
        catLabel: "Category U",
        desc: "CAN bus and inter-module communication faults — when modules can't talk to each other on the in-vehicle network.",
      },
    ],
    examplesPrefix: "Examples:",
    topHeading: "Top 20 Most Common OBD-II Codes",
    topIntro: "These are the codes mechanics see most often. Click any code to decode it.",
    severityHeading: "Severity Levels Explained",
    severityLow: "Low",
    severityLowDesc:
      "Minor issue. Continue driving normally; address at your convenience or before an emissions test. Examples: loose gas cap, EVAP small leak, O2 sensor heater fault.",
    severityMod: "Moderate",
    severityModDesc:
      "Address within a few weeks. Affects fuel economy or emissions but not driveability. Examples: dirty MAF, slow O2 sensor, mild lean/rich condition.",
    severityHigh: "High",
    severityHighDesc:
      "Repair as soon as possible. Continued driving may damage expensive components. Examples: misfires, transmission solenoid faults, catalyst efficiency.",
    severityCritical: "Critical",
    severityCriticalDesc:
      "Stop driving. Tow to a repair shop. Risk of safety system failure or major engine/transmission damage. Examples: airbag deployment circuit faults, lost PCM communication.",
    withoutScannerHeading: "How to Read OBD Codes Without a Scanner",
    withoutScannerIntro:
      "Most modern cars require a scanner to read trouble codes — but there are a few free options before you spend money:",
    withoutScannerBullets: [
      { title: "Use a free retail scan", detail: "AutoZone, O'Reilly, Advance Auto Parts, and most regional chains will scan your codes for free. They'll print out the codes — bring the printout home and decode each one here." },
      { title: "Buy a $20 Bluetooth dongle", detail: "An ELM327-compatible Bluetooth OBD-II dongle plus a free app like Torque, Car Scanner, or OBD Auto Doctor can read codes, clear codes, and show live data on your phone. Strongly recommended if you plan to keep older vehicles." },
      { title: "Check the key-cycle method (older cars only)", detail: "Some pre-2005 GM, Chrysler, and Honda vehicles flash the codes on the dash by cycling the ignition key (typically ON-OFF-ON-OFF-ON without starting). This rarely works on modern vehicles. Search your specific year/make/model to confirm." },
      { title: "Use the iPhone or Android shop apps", detail: "Some vehicles (newer Teslas, GM cars with OnStar, Ford with FordPass) display fault codes directly in the manufacturer's app without needing a scanner." },
    ],
    driveHeading: "When to Drive vs Tow",
    driveOkHeading: "OK to drive (cautiously)",
    driveOkBullets: [
      "Solid (not flashing) check engine light",
      "EVAP / gas cap codes (P0440-series, P0455-P0457)",
      "Most O2 sensor heater faults",
      "Catalyst efficiency codes (P0420 / P0430)",
      "Coolant temp circuit faults (P0117 / P0118)",
    ],
    driveTowHeading: "Stop & tow",
    driveTowBullets: [
      "Flashing check engine light (active misfire)",
      "Critical-severity airbag/SRS codes (B0001-series)",
      "Low oil pressure or overheating warning",
      "Lost PCM communication (U0100)",
      "Hard-shift / limp-mode transmission codes",
    ],
    driveRuleLabel: "Rule of thumb:",
    driveRule:
      "if the check engine light is flashing, pull over within a mile and shut the engine off. Continued driving with an active misfire can destroy a $1,500+ catalytic converter in under 10 minutes.",
    crossLinks: [
      { label: "Free VIN Check", sub: "Full vehicle history report" },
      { label: "Recall Lookup", sub: "Open NHTSA safety recalls" },
      { label: "Window Sticker", sub: "Original equipment & options" },
    ],
    faqHeading: "Frequently Asked Questions",
    faqs: [
      { q: "What does an OBD-II code mean?", a: "It's a 5-character code (1 letter + 4 digits) stored by your car's computer when it detects a fault. The letter identifies the affected system: P=Powertrain, B=Body, C=Chassis, U=Network." },
      { q: "Is it safe to drive with the check engine light on?", a: "A solid CEL is usually OK to drive home, but a flashing CEL means an active misfire — pull over and avoid driving to prevent catalytic converter damage." },
      { q: "What does P0420 mean?", a: "P0420 is 'Catalyst System Efficiency Below Threshold (Bank 1)' — your catalytic converter isn't working efficiently. Often caused by a worn cat, faulty O2 sensor, or exhaust leak. Repair: $200–$2,500." },
      { q: "Will clearing OBD codes pass an emissions test?", a: "No — clearing codes resets readiness monitors. Most states require monitors to be 'set' before testing, which takes 50–200 miles of normal driving across multiple drive cycles." },
      { q: "Can a check engine light come back on after I clear it?", a: "Yes, if the underlying problem isn't fixed. Many codes will return within 1–3 drive cycles. Always diagnose and repair the root cause before clearing." },
      { q: "What's the difference between generic and manufacturer-specific codes?", a: "Generic codes (P0XXX) are the same across all manufacturers. Manufacturer-specific codes (P1XXX, B1XXX, C1XXX, U1XXX) are defined by the automaker and may mean different things on different brands." },
      { q: "How much does it cost to fix a check engine light?", a: "Anywhere from $0 (tighten gas cap) to $4,000+ (transmission rebuild). Decode the specific code first to set the right expectation — this tool gives you a cost range for each code." },
      { q: "Can I read OBD-II codes without a scanner?", a: "On most modern vehicles, no — you need a scan tool. A $20–$40 Bluetooth dongle paired with a free phone app is the cheapest option. Most auto parts stores will also scan your codes for free." },
    ],
    bottomCtaHeading: "Buying a Used Car With Active Codes?",
    bottomCtaBody:
      "Recurring trouble codes can hint at hidden accident damage, flood history, or salvage rebuilds. Run a free VIN check to see the full vehicle history before you buy.",
    bottomCtaButton: "Run a Free VIN Check",
  },
  es: {
    breadcrumbHome: "Inicio",
    breadcrumbCurrent: "Búsqueda de códigos OBD-II",
    h1: "Búsqueda de códigos OBD-II gratis",
    heroLead:
      "Decodifica al instante cualquier código de check engine. Busca por código o palabra clave para ver el significado, síntomas, causas probables, severidad, dificultad DIY y costo estimado de reparación. Gratis, sin registro, cubre todos los códigos genéricos y comunes específicos del fabricante.",
    whatHeading: "¿Qué es un código OBD-II?",
    whatP1:
      "Un código OBD-II — también llamado Código de Diagnóstico de Problemas o DTC — es un código de 5 caracteres almacenado en la computadora de tu vehículo cuando detecta una falla. Cada auto vendido en Estados Unidos desde 1996 usa este mismo estándar (definido en SAE J2012), por lo que el mismo escáner funciona en un Honda Civic, una Ford F-150 y un BMW Serie 3.",
    whatP2Pre: "El formato es siempre:",
    whatP2Format: "una letra + cuatro dígitos",
    whatP2Mid: ". La letra identifica el sistema. El primer dígito (0 o 1) te dice si el código es genérico o específico del fabricante. Los tres dígitos restantes identifican la falla específica. Entonces",
    whatP2Code1: "P0420",
    whatP2Middle2: "es un código genérico de",
    whatP2Powertrain: "tren motriz",
    whatP2Middle3: ", mientras que",
    whatP2Code2: "P1399",
    whatP2Suffix: "es un código de tren motriz específico del fabricante (Honda, en este caso).",
    categoriesHeading: "Categorías de códigos explicadas",
    categories: [
      {
        name: "Tren motriz",
        catLabel: "Categoría P",
        desc: "Motor, transmisión, sistema de combustible, encendido, emisiones. La categoría más grande — alrededor del 70% de los códigos que la mayoría de los conductores encuentra.",
      },
      {
        name: "Carrocería",
        catLabel: "Categoría B",
        desc: "Airbags (SRS), control climático, iluminación, ventanas eléctricas, asientos y electrónica interior.",
      },
      {
        name: "Chasis",
        catLabel: "Categoría C",
        desc: "ABS, control de tracción, control de estabilidad, suspensión, dirección, presión de llantas (TPMS).",
      },
      {
        name: "Red / Comunicación",
        catLabel: "Categoría U",
        desc: "Fallas del bus CAN y comunicación entre módulos — cuando los módulos no pueden hablar entre sí en la red interna del vehículo.",
      },
    ],
    examplesPrefix: "Ejemplos:",
    topHeading: "Top 20 códigos OBD-II más comunes",
    topIntro:
      "Estos son los códigos que los mecánicos ven más a menudo. Haz clic en cualquier código para decodificarlo.",
    severityHeading: "Niveles de severidad explicados",
    severityLow: "Bajo",
    severityLowDesc:
      "Problema menor. Continúa conduciendo normalmente; aborda cuando sea conveniente o antes de una prueba de emisiones. Ejemplos: tapa de gasolina suelta, fuga pequeña EVAP, falla del calentador del sensor O2.",
    severityMod: "Moderado",
    severityModDesc:
      "Aborda dentro de algunas semanas. Afecta la economía de combustible o emisiones pero no la conducibilidad. Ejemplos: MAF sucio, sensor O2 lento, condición leve pobre/rica.",
    severityHigh: "Alto",
    severityHighDesc:
      "Repara lo antes posible. Continuar conduciendo puede dañar componentes costosos. Ejemplos: fallos de encendido, fallas de solenoide de transmisión, eficiencia del catalizador.",
    severityCritical: "Crítico",
    severityCriticalDesc:
      "Deja de conducir. Remolca a un taller. Riesgo de falla del sistema de seguridad o daño mayor del motor/transmisión. Ejemplos: fallas del circuito de despliegue del airbag, pérdida de comunicación del PCM.",
    withoutScannerHeading: "Cómo leer códigos OBD sin un escáner",
    withoutScannerIntro:
      "La mayoría de los autos modernos requieren un escáner para leer códigos de problema — pero hay algunas opciones gratis antes de gastar dinero:",
    withoutScannerBullets: [
      { title: "Usa un escaneo gratis en tienda", detail: "AutoZone, O'Reilly, Advance Auto Parts y la mayoría de las cadenas regionales escanearán tus códigos gratis. Imprimirán los códigos — trae la impresión a casa y decodifica cada uno aquí." },
      { title: "Compra un dongle Bluetooth de $20", detail: "Un dongle Bluetooth OBD-II compatible con ELM327 más una app gratis como Torque, Car Scanner u OBD Auto Doctor puede leer códigos, borrar códigos y mostrar datos en vivo en tu teléfono. Altamente recomendado si planeas conservar vehículos más viejos." },
      { title: "Revisa el método de ciclo de llave (solo autos viejos)", detail: "Algunos vehículos pre-2005 de GM, Chrysler y Honda muestran los códigos en el tablero al ciclar la llave de ignición (típicamente ON-OFF-ON-OFF-ON sin arrancar). Esto raramente funciona en vehículos modernos. Busca tu año/marca/modelo específico para confirmar." },
      { title: "Usa las apps de iPhone o Android del fabricante", detail: "Algunos vehículos (Teslas nuevos, autos GM con OnStar, Ford con FordPass) muestran códigos de falla directamente en la app del fabricante sin necesitar un escáner." },
    ],
    driveHeading: "Cuándo conducir vs remolcar",
    driveOkHeading: "OK conducir (con precaución)",
    driveOkBullets: [
      "Luz de check engine fija (no parpadeante)",
      "Códigos EVAP / tapa de gasolina (serie P0440, P0455-P0457)",
      "La mayoría de fallas del calentador del sensor O2",
      "Códigos de eficiencia del catalizador (P0420 / P0430)",
      "Fallas del circuito de temperatura del refrigerante (P0117 / P0118)",
    ],
    driveTowHeading: "Para y remolca",
    driveTowBullets: [
      "Luz de check engine parpadeante (fallo de encendido activo)",
      "Códigos de severidad crítica de airbag/SRS (serie B0001)",
      "Advertencia de baja presión de aceite o sobrecalentamiento",
      "Pérdida de comunicación con PCM (U0100)",
      "Cambios duros / códigos de transmisión en modo limp",
    ],
    driveRuleLabel: "Regla general:",
    driveRule:
      "si la luz de check engine está parpadeando, oríllate dentro de una milla y apaga el motor. Continuar conduciendo con un fallo de encendido activo puede destruir un catalizador de $1,500+ en menos de 10 minutos.",
    crossLinks: [
      { label: "Revisión VIN gratis", sub: "Reporte completo de historial vehicular" },
      { label: "Búsqueda de retiros", sub: "Retiros de seguridad NHTSA abiertos" },
      { label: "Etiqueta Monroney", sub: "Equipamiento original y opciones" },
    ],
    faqHeading: "Preguntas frecuentes",
    faqs: [
      { q: "¿Qué significa un código OBD-II?", a: "Es un código de 5 caracteres (1 letra + 4 dígitos) almacenado por la computadora de tu auto cuando detecta una falla. La letra identifica el sistema afectado: P=Tren motriz, B=Carrocería, C=Chasis, U=Red." },
      { q: "¿Es seguro conducir con la luz de check engine encendida?", a: "Una CEL fija usualmente está OK para conducir a casa, pero una CEL parpadeante significa un fallo de encendido activo — oríllate y evita conducir para prevenir daño al catalizador." },
      { q: "¿Qué significa P0420?", a: "P0420 es 'Eficiencia del Sistema de Catalizador Bajo el Umbral (Banco 1)' — tu catalizador no está trabajando eficientemente. A menudo causado por un cat desgastado, sensor O2 defectuoso o fuga de escape. Reparación: $200–$2,500." },
      { q: "¿Borrar los códigos OBD pasará una prueba de emisiones?", a: "No — borrar códigos resetea los monitores de listos. La mayoría de los estados requieren que los monitores estén 'listos' antes de la prueba, lo que toma 50–200 millas de manejo normal a través de múltiples ciclos de manejo." },
      { q: "¿Puede regresar una luz de check engine después de borrarla?", a: "Sí, si el problema subyacente no se arregla. Muchos códigos regresarán dentro de 1-3 ciclos de manejo. Siempre diagnostica y repara la causa raíz antes de borrar." },
      { q: "¿Cuál es la diferencia entre códigos genéricos y específicos del fabricante?", a: "Los códigos genéricos (P0XXX) son los mismos en todos los fabricantes. Los códigos específicos del fabricante (P1XXX, B1XXX, C1XXX, U1XXX) están definidos por el fabricante y pueden significar cosas diferentes en marcas diferentes." },
      { q: "¿Cuánto cuesta arreglar una luz de check engine?", a: "Desde $0 (apretar la tapa de gasolina) hasta $4,000+ (reconstrucción de transmisión). Decodifica el código específico primero para establecer la expectativa correcta — esta herramienta te da un rango de costo para cada código." },
      { q: "¿Puedo leer códigos OBD-II sin un escáner?", a: "En la mayoría de los vehículos modernos, no — necesitas una herramienta de escaneo. Un dongle Bluetooth de $20-$40 emparejado con una app gratis para teléfono es la opción más barata. La mayoría de las tiendas de partes automotrices también escanearán tus códigos gratis." },
    ],
    bottomCtaHeading: "¿Comprando un auto usado con códigos activos?",
    bottomCtaBody:
      "Los códigos de problema recurrentes pueden insinuar daño oculto por accidente, historial de inundación o reconstrucciones de salvamento. Ejecuta una revisión VIN gratis para ver el historial completo del vehículo antes de comprar.",
    bottomCtaButton: "Ejecutar revisión VIN gratis",
  },
  fr: {
    breadcrumbHome: "Accueil",
    breadcrumbCurrent: "Recherche de codes OBD-II",
    h1: "Recherche de codes OBD-II gratuite",
    heroLead:
      "Décode instantanément n'importe quel code de check engine. Recherche par code ou mot-clé pour voir la signification, les symptômes, les causes probables, la sévérité, la difficulté DIY et le coût estimé de réparation. Gratuit, sans inscription, couvre tous les codes génériques et spécifiques aux fabricants courants.",
    whatHeading: "Qu'est-ce qu'un code OBD-II ?",
    whatP1:
      "Un code OBD-II — également appelé Diagnostic Trouble Code ou DTC — est un code à 5 caractères stocké dans l'ordinateur de ton véhicule lorsqu'il détecte une défaillance. Chaque voiture vendue aux États-Unis depuis 1996 utilise ce même standard (défini dans SAE J2012), c'est pourquoi le même scanner fonctionne sur une Honda Civic, une Ford F-150 et une BMW Série 3.",
    whatP2Pre: "Le format est toujours :",
    whatP2Format: "une lettre + quatre chiffres",
    whatP2Mid: ". La lettre identifie le système. Le premier chiffre (0 ou 1) te dit si le code est générique ou spécifique au fabricant. Les trois chiffres restants identifient la défaillance spécifique. Donc",
    whatP2Code1: "P0420",
    whatP2Middle2: "est un code générique de",
    whatP2Powertrain: "groupe motopropulseur",
    whatP2Middle3: ", tandis que",
    whatP2Code2: "P1399",
    whatP2Suffix: "est un code de groupe motopropulseur spécifique au fabricant (Honda, dans ce cas).",
    categoriesHeading: "Catégories de codes expliquées",
    categories: [
      {
        name: "Groupe motopropulseur",
        catLabel: "Catégorie P",
        desc: "Moteur, transmission, système de carburant, allumage, émissions. La plus grande catégorie — environ 70% des codes que la plupart des conducteurs rencontrent.",
      },
      {
        name: "Carrosserie",
        catLabel: "Catégorie B",
        desc: "Airbags (SRS), contrôle climatique, éclairage, vitres électriques, sièges et électronique intérieure.",
      },
      {
        name: "Châssis",
        catLabel: "Catégorie C",
        desc: "ABS, contrôle de traction, contrôle de stabilité, suspension, direction, pression des pneus (TPMS).",
      },
      {
        name: "Réseau / Communication",
        catLabel: "Catégorie U",
        desc: "Défaillances du bus CAN et de la communication inter-modules — quand les modules ne peuvent pas se parler sur le réseau interne du véhicule.",
      },
    ],
    examplesPrefix: "Exemples :",
    topHeading: "Top 20 des codes OBD-II les plus courants",
    topIntro: "Ce sont les codes que les mécaniciens voient le plus souvent. Clique sur n'importe quel code pour le décoder.",
    severityHeading: "Niveaux de sévérité expliqués",
    severityLow: "Faible",
    severityLowDesc:
      "Problème mineur. Continue à conduire normalement ; règle quand c'est pratique ou avant un test d'émissions. Exemples : bouchon de réservoir desserré, petite fuite EVAP, défaillance du chauffage du capteur O2.",
    severityMod: "Modéré",
    severityModDesc:
      "Règle dans quelques semaines. Affecte l'économie de carburant ou les émissions mais pas la conduite. Exemples : MAF sale, capteur O2 lent, condition légère pauvre/riche.",
    severityHigh: "Élevé",
    severityHighDesc:
      "Répare dès que possible. Continuer à conduire peut endommager des composants coûteux. Exemples : ratés d'allumage, défaillances de solénoïde de transmission, efficacité du catalyseur.",
    severityCritical: "Critique",
    severityCriticalDesc:
      "Arrête de conduire. Remorque jusqu'à un atelier de réparation. Risque de défaillance du système de sécurité ou de dommages majeurs au moteur/transmission. Exemples : défaillances du circuit de déploiement d'airbag, perte de communication PCM.",
    withoutScannerHeading: "Comment lire les codes OBD sans scanner",
    withoutScannerIntro:
      "La plupart des voitures modernes nécessitent un scanner pour lire les codes de problème — mais il existe quelques options gratuites avant de dépenser de l'argent :",
    withoutScannerBullets: [
      { title: "Utilise un scan gratuit en magasin", detail: "AutoZone, O'Reilly, Advance Auto Parts et la plupart des chaînes régionales scanneront tes codes gratuitement. Ils imprimeront les codes — ramène l'impression à la maison et décode chacun ici." },
      { title: "Achète un dongle Bluetooth à 20 USD", detail: "Un dongle Bluetooth OBD-II compatible ELM327 plus une application gratuite comme Torque, Car Scanner ou OBD Auto Doctor peut lire les codes, les effacer et afficher les données en direct sur ton téléphone. Fortement recommandé si tu prévois de garder des véhicules plus anciens." },
      { title: "Vérifie la méthode du cycle de clé (vieilles voitures uniquement)", detail: "Certains véhicules pré-2005 de GM, Chrysler et Honda affichent les codes sur le tableau de bord en cyclant la clé d'allumage (typiquement ON-OFF-ON-OFF-ON sans démarrer). Cela fonctionne rarement sur les véhicules modernes. Recherche ton année/marque/modèle spécifique pour confirmer." },
      { title: "Utilise les applications iPhone ou Android du constructeur", detail: "Certains véhicules (nouvelles Tesla, voitures GM avec OnStar, Ford avec FordPass) affichent les codes de défaillance directement dans l'application du constructeur sans nécessiter de scanner." },
    ],
    driveHeading: "Quand conduire vs remorquer",
    driveOkHeading: "OK pour conduire (avec prudence)",
    driveOkBullets: [
      "Voyant check engine fixe (non clignotant)",
      "Codes EVAP / bouchon de réservoir (série P0440, P0455-P0457)",
      "La plupart des défaillances du chauffage du capteur O2",
      "Codes d'efficacité du catalyseur (P0420 / P0430)",
      "Défaillances du circuit de température du liquide de refroidissement (P0117 / P0118)",
    ],
    driveTowHeading: "Arrête et remorque",
    driveTowBullets: [
      "Voyant check engine clignotant (raté d'allumage actif)",
      "Codes airbag/SRS de sévérité critique (série B0001)",
      "Avertissement de basse pression d'huile ou de surchauffe",
      "Perte de communication avec le PCM (U0100)",
      "Changements durs / codes de transmission en mode dégradé",
    ],
    driveRuleLabel: "Règle générale :",
    driveRule:
      "si le voyant check engine clignote, range-toi sur le côté dans un mile et coupe le moteur. Continuer à conduire avec un raté d'allumage actif peut détruire un catalyseur de 1 500 USD+ en moins de 10 minutes.",
    crossLinks: [
      { label: "Vérification VIN gratuite", sub: "Rapport complet d'historique véhiculaire" },
      { label: "Recherche de rappels", sub: "Rappels de sécurité NHTSA ouverts" },
      { label: "Étiquette Monroney", sub: "Équipement et options d'origine" },
    ],
    faqHeading: "Questions fréquemment posées",
    faqs: [
      { q: "Que signifie un code OBD-II ?", a: "C'est un code à 5 caractères (1 lettre + 4 chiffres) stocké par l'ordinateur de ta voiture lorsqu'il détecte une défaillance. La lettre identifie le système affecté : P=Groupe motopropulseur, B=Carrosserie, C=Châssis, U=Réseau." },
      { q: "Est-il sûr de conduire avec le voyant check engine allumé ?", a: "Un CEL fixe est généralement OK pour rentrer à la maison, mais un CEL clignotant signifie un raté d'allumage actif — range-toi sur le côté et évite de conduire pour prévenir les dommages au catalyseur." },
      { q: "Que signifie P0420 ?", a: "P0420 est 'Catalyst System Efficiency Below Threshold (Bank 1)' — ton catalyseur ne fonctionne pas efficacement. Souvent causé par un cat usé, un capteur O2 défectueux ou une fuite d'échappement. Réparation : 200 à 2 500 USD." },
      { q: "Effacer les codes OBD passera-t-il un test d'émissions ?", a: "Non — effacer les codes réinitialise les moniteurs de préparation. La plupart des États exigent que les moniteurs soient 'définis' avant le test, ce qui prend 50 à 200 miles de conduite normale à travers plusieurs cycles de conduite." },
      { q: "Un voyant check engine peut-il revenir après l'avoir effacé ?", a: "Oui, si le problème sous-jacent n'est pas corrigé. De nombreux codes reviendront dans 1 à 3 cycles de conduite. Toujours diagnostiquer et réparer la cause racine avant d'effacer." },
      { q: "Quelle est la différence entre les codes génériques et spécifiques au fabricant ?", a: "Les codes génériques (P0XXX) sont les mêmes chez tous les fabricants. Les codes spécifiques au fabricant (P1XXX, B1XXX, C1XXX, U1XXX) sont définis par le constructeur automobile et peuvent signifier des choses différentes sur des marques différentes." },
      { q: "Combien coûte la réparation d'un voyant check engine ?", a: "De 0 USD (serrer le bouchon du réservoir) à 4 000 USD+ (reconstruction de transmission). Décode d'abord le code spécifique pour établir la bonne attente — cet outil te donne une fourchette de coûts pour chaque code." },
      { q: "Puis-je lire les codes OBD-II sans scanner ?", a: "Sur la plupart des véhicules modernes, non — tu as besoin d'un outil de scan. Un dongle Bluetooth de 20 à 40 USD couplé à une application téléphone gratuite est l'option la moins chère. La plupart des magasins de pièces automobiles scanneront aussi tes codes gratuitement." },
    ],
    bottomCtaHeading: "Tu achètes une voiture d'occasion avec des codes actifs ?",
    bottomCtaBody:
      "Des codes de problème récurrents peuvent suggérer des dommages d'accident cachés, un historique d'inondation ou des reconstructions salvage. Exécute une vérification VIN gratuite pour voir l'historique complet du véhicule avant d'acheter.",
    bottomCtaButton: "Exécuter une vérification VIN gratuite",
  },
} as const;

const TOP_20_CODES = [
  { code: "P0420", title: "Catalyst Efficiency Below Threshold (Bank 1)" },
  { code: "P0430", title: "Catalyst Efficiency Below Threshold (Bank 2)" },
  { code: "P0171", title: "System Too Lean (Bank 1)" },
  { code: "P0174", title: "System Too Lean (Bank 2)" },
  { code: "P0172", title: "System Too Rich (Bank 1)" },
  { code: "P0300", title: "Random/Multiple Cylinder Misfire" },
  { code: "P0301", title: "Cylinder 1 Misfire" },
  { code: "P0302", title: "Cylinder 2 Misfire" },
  { code: "P0303", title: "Cylinder 3 Misfire" },
  { code: "P0304", title: "Cylinder 4 Misfire" },
  { code: "P0011", title: "Camshaft Timing Over-Advanced (Bank 1)" },
  { code: "P0128", title: "Coolant Temp Below Thermostat Regulating Temp" },
  { code: "P0455", title: "EVAP Large Leak Detected" },
  { code: "P0456", title: "EVAP Very Small Leak Detected" },
  { code: "P0442", title: "EVAP Small Leak Detected" },
  { code: "P0700", title: "Transmission Control System Malfunction" },
  { code: "P0750", title: "Shift Solenoid 'A' Malfunction" },
  { code: "P0335", title: "Crankshaft Position Sensor 'A' Malfunction" },
  { code: "P0506", title: "Idle Air Control RPM Lower Than Expected" },
  { code: "U0100", title: "Lost Communication With ECM/PCM 'A'" },
] as const;

const CAT_ICONS = [Activity, Cpu, Gauge, Zap] as const;
const CAT_LETTERS = ["P", "B", "C", "U"] as const;
const CAT_EXAMPLES = [
  "P0420, P0171, P0300, P0700",
  "B0001, B1000, B1318",
  "C0035, C1145, C0110",
  "U0100, U0140, U0155",
] as const;

export default function OBD2CodesPageBody({
  locale = "en",
}: {
  locale?: Locale;
}) {
  const copy = COPY[locale];
  const homeHref = locale === "es" ? "/es" : "/";
  const ctaHref = locale === "es" ? "/es/revision-vin" : "/vin-check";
  const crossHrefs = locale === "es"
    ? ["/es/revision-vin", "/es/verificacion-recall", "/es/etiqueta-monroney"]
    : ["/vin-check", "/recall-check", "/window-sticker"];
  const obd2BaseHref = locale === "es" ? "/es/obd2-codes" : "/obd2-codes";

  const severityRows = [
    { label: copy.severityLow, pill: "bg-emerald-100 text-emerald-800 border-emerald-200", text: copy.severityLowDesc },
    { label: copy.severityMod, pill: "bg-amber-100 text-amber-800 border-amber-200", text: copy.severityModDesc },
    { label: copy.severityHigh, pill: "bg-orange-100 text-orange-800 border-orange-200", text: copy.severityHighDesc },
    { label: copy.severityCritical, pill: "bg-red-100 text-red-800 border-red-200", text: copy.severityCriticalDesc },
  ];

  return (
    <>
      <main className="pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: copy.breadcrumbHome, href: homeHref }, { label: copy.breadcrumbCurrent }]} />

          <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">{copy.h1}</h1>
          <p className="mt-4 text-lg text-slate-700 leading-relaxed">{copy.heroLead}</p>

          <div className="mt-8">
            <VinCheckBanner variant="card" />
          </div>

          <div className="mt-8">
            <OBD2CodeLookup />
          </div>

          <section id="what-is-obd2" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{copy.whatHeading}</h2>
            <p className="text-slate-700 leading-relaxed">{copy.whatP1}</p>
            <p className="mt-3 text-slate-700 leading-relaxed">
              {copy.whatP2Pre} <strong>{copy.whatP2Format}</strong>{copy.whatP2Mid}{" "}
              <span className="font-mono font-bold">{copy.whatP2Code1}</span> {copy.whatP2Middle2}{" "}
              <em>{copy.whatP2Powertrain}</em>{copy.whatP2Middle3}{" "}
              <span className="font-mono font-bold">{copy.whatP2Code2}</span> {copy.whatP2Suffix}
            </p>
          </section>

          <section id="categories" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-5">{copy.categoriesHeading}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {copy.categories.map((cat, i) => {
                const Icon = CAT_ICONS[i];
                const letter = CAT_LETTERS[i];
                return (
                  <div key={letter} className="bg-white border border-slate-200 rounded-xl p-5 hover:border-primary-300 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-mono font-bold text-slate-900">{letter}</div>
                      <div>
                        <p className="font-bold text-slate-900">{cat.name}</p>
                        <p className="text-[11px] text-slate-500">
                          <Icon className="w-3 h-3 inline mr-1" />
                          {cat.catLabel}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">{cat.desc}</p>
                    <p className="mt-2 text-[11px] text-slate-500 font-mono">{copy.examplesPrefix} {CAT_EXAMPLES[i]}</p>
                  </div>
                );
              })}
            </div>
          </section>

          <section id="top-codes" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">{copy.topHeading}</h2>
            <p className="text-slate-600 leading-relaxed mb-5">{copy.topIntro}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {TOP_20_CODES.map(({ code, title }) => (
                <Link
                  key={code}
                  href={`${obd2BaseHref}#${code}`}
                  className="flex items-center justify-between gap-3 px-4 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-primary-300 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="font-mono font-bold text-sm text-slate-900 flex-shrink-0">{code}</span>
                    <span className="text-xs text-slate-600 truncate">{title}</span>
                  </div>
                  <span className="text-slate-400 font-bold text-xs flex-shrink-0">→</span>
                </Link>
              ))}
            </div>
          </section>

          <section id="severity-levels" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-5">{copy.severityHeading}</h2>
            <div className="space-y-3">
              {severityRows.map((s) => (
                <div key={s.label} className="flex items-start gap-3 p-4 bg-white border border-slate-200 rounded-xl">
                  <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded border flex-shrink-0 ${s.pill}`}>
                    {s.label}
                  </span>
                  <p className="text-sm text-slate-700 leading-relaxed">{s.text}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-14">
            <VinCheckBanner />
          </div>

          <section id="read-without-scanner" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{copy.withoutScannerHeading}</h2>
            <p className="text-slate-700 leading-relaxed">{copy.withoutScannerIntro}</p>
            <ul className="mt-4 space-y-3">
              {copy.withoutScannerBullets.map((b) => (
                <li key={b.title} className="flex gap-3 items-start">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">
                    <strong className="text-slate-900">{b.title}</strong> — {b.detail}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section id="drive-vs-tow" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{copy.driveHeading}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-xl">
                <h3 className="flex items-center gap-2 font-bold text-emerald-900 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  {copy.driveOkHeading}
                </h3>
                <ul className="space-y-2 text-sm text-emerald-900">
                  {copy.driveOkBullets.map((b) => <li key={b}>• {b}</li>)}
                </ul>
              </div>
              <div className="p-5 bg-red-50 border border-red-200 rounded-xl">
                <h3 className="flex items-center gap-2 font-bold text-red-900 mb-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  {copy.driveTowHeading}
                </h3>
                <ul className="space-y-2 text-sm text-red-900">
                  {copy.driveTowBullets.map((b) => <li key={b}>• {b}</li>)}
                </ul>
              </div>
            </div>
            <div className="mt-4 flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
              <ShieldAlert className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-600" />
              <p>
                <strong>{copy.driveRuleLabel}</strong> {copy.driveRule}
              </p>
            </div>
          </section>

          <div className="mt-14 grid sm:grid-cols-3 gap-3">
            {copy.crossLinks.map((link, i) => (
              <Link
                key={crossHrefs[i]}
                href={crossHrefs[i]}
                className="flex items-center justify-between gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <div>
                  <p className="font-bold text-slate-900 text-sm">{link.label}</p>
                  <p className="text-xs text-slate-600 mt-0.5">{link.sub}</p>
                </div>
                <span className="text-slate-500 font-bold text-xs flex-shrink-0">→</span>
              </Link>
            ))}
          </div>

          <section id="faq" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">{copy.faqHeading}</h2>
            <dl className="space-y-6">
              {copy.faqs.map((f) => (
                <div key={f.q} className="faq-answer">
                  <dt className="font-bold text-slate-900">{f.q}</dt>
                  <dd className="mt-1.5 text-slate-600 leading-relaxed">{f.a}</dd>
                </div>
              ))}
            </dl>
          </section>

          <div className="mt-14">
            <RelatedChecks exclude="/obd2-codes" />
          </div>
        </div>
      </main>

      <section className="py-14 bg-slate-50 border-t border-slate-200">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">{copy.bottomCtaHeading}</h2>
          <p className="text-slate-600 mb-6">{copy.bottomCtaBody}</p>
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl transition-colors"
          >
            <Wrench className="w-4 h-4" />
            {copy.bottomCtaButton}
          </Link>
        </div>
      </section>
    </>
  );
}

export { COPY as OBD2_COPY };
