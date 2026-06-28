/**
 * Shared body for /look-up-car-plates-free and /es/look-up-car-plates-free.
 * Wave 18 batch 4 — full visual parity via COPY={en,es}.
 */

import Link from "@/components/LocaleLink";
import {
  Check, Shield, Clock, Globe, Search, FileText, AlertCircle, Sparkles,
  DollarSign, Lock, Zap, Car, ArrowRight,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import LicensePlateLookup from "@/app/license-plate-lookup/LicensePlateLookup";
import { states } from "@/lib/states";
import type { Locale } from "@/i18n/config";

const COPY = {
  en: {
    home: "Home",
    crumb: "Look Up Car Plates Free",
    heroBadge: "100% Free · No Sign-Up · All 50 States",
    h1: "Look Up Car Plates Free",
    heroLedePre: "Enter any US license plate and state — we'll instantly return the VIN, year, make, model, trim, engine, title brands, and history records. ",
    heroLedeBold: "No credit card. No subscription. No catch.",
    trustStats: [
      { icon: DollarSign, color: "text-green-500", text: "Always free" },
      { icon: Lock, color: "text-primary", text: "DPPA compliant" },
      { icon: Zap, color: "text-secondary", text: "Results in 5 seconds" },
      { icon: Globe, color: "text-primary", text: "50 states + D.C." },
    ],
    howEyebrow: "How It Works",
    howH2: "Free in 4 Steps · Under 30 Seconds",
    howIntro: "Most paid services make you sign up, hand over a credit card, and wait through upsells before you see anything. We don't.",
    freeSteps: [
      { step: "1", title: "Enter the plate", desc: "Type the license plate exactly as it appears on the vehicle. Spaces and dashes are auto-handled.", icon: Search },
      { step: "2", title: "Pick the state", desc: "Choose the state where the plate is registered. We support all 50 states plus D.C.", icon: Globe },
      { step: "3", title: "Get the VIN instantly", desc: "We instantly resolve the plate to the vehicle's 17-character VIN — no waiting, no payment.", icon: Zap },
      { step: "4", title: "See full vehicle data", desc: "Year, make, model, trim, engine, title brands, equipment, and full history records — all free.", icon: FileText },
    ],
    cmpEyebrow: "Why Pay $44.99?",
    cmpH2: "Free vs. The Paid Giants",
    cmpIntro: "The same data, none of the paywalls. Here's how a free plate lookup with us stacks up against Carfax and AutoCheck.",
    colFeature: "Feature",
    colUs: "VINCheck Pro",
    colAuto: "AutoCheck",
    colCar: "Carfax",
    yes: "Yes",
    no: "No",
    free: "FREE",
    comparison: [
      { feature: "Look up by license plate", us: true, paid1: true, paid2: true },
      { feature: "Cost per single lookup", us: "FREE", paid1: "$24.99", paid2: "$44.99" },
      { feature: "Sign-up required", us: false, paid1: true, paid2: true },
      { feature: "Credit card required", us: false, paid1: true, paid2: true },
      { feature: "All 50 states + D.C.", us: true, paid1: true, paid2: true },
      { feature: "Instant VIN reveal", us: true, paid1: true, paid2: false },
      { feature: "Vehicle photos", us: true, paid1: false, paid2: false },
      { feature: "Equipment & options list", us: true, paid1: false, paid2: false },
      { feature: "No subscription trap", us: true, paid1: false, paid2: false },
    ],
    samplesH2: "Try a Sample Lookup",
    samplesIntro: "Not sure where to start? Here are example plate formats from popular states.",
    samplePlates: [
      { plate: "8XYZ123", state: "California" },
      { plate: "ABC1234", state: "Texas" },
      { plate: "DEF5678", state: "Florida" },
      { plate: "GHI9012", state: "New York" },
    ],
    whatEyebrow: "What You Get — Free",
    whatH2: "Everything Below Is Included at $0",
    whatItems: [
      { icon: Search, title: "VIN Reveal", desc: "Full 17-character VIN resolved instantly from the plate." },
      { icon: Car, title: "Vehicle Specs", desc: "Year, make, model, trim, engine, transmission, drivetrain." },
      { icon: Shield, title: "Title Brands", desc: "Salvage, flood, lemon, junk, rebuilt — every brand on record." },
      { icon: Clock, title: "Odometer Records", desc: "Mileage history from inspections, sales, and DMV updates." },
      { icon: FileText, title: "Equipment List", desc: "Original options, packages, paint code, and factory equipment." },
      { icon: AlertCircle, title: "Recall Notices", desc: "Active NHTSA recalls and manufacturer service campaigns." },
    ],
    stateH2: "Free Plate Lookup in All 50 States",
    stateIntro: "We support every US state DMV. Click your state for state-specific plate format guides and title brand notes.",
    mostSearched: "Most Searched States",
    allStates: "All States",
    topStates: ["California", "Texas", "Florida", "New York", "Pennsylvania", "Illinois", "Ohio", "Georgia", "North Carolina", "Michigan"],
    dppaH3: "About Owner Privacy (DPPA)",
    dppaPre: "Under the federal Driver's Privacy Protection Act (18 U.S.C. § 2721), ",
    dppaBold: "no consumer plate lookup service can return owner names, addresses, or phone numbers",
    dppaPost: " — including ours. We return vehicle data only (VIN, specs, history). Any service claiming otherwise is operating illegally.",
    faqH2: "Frequently Asked Questions",
    faqIntro: "Everything people ask before running a free plate lookup.",
    faqs: [
      { q: "Is this license plate lookup really 100% free?", a: "Yes. Looking up a plate, getting the VIN, and viewing core vehicle details (year, make, model, trim, equipment, title brands) is completely free. No credit card, no trial, no subscription. We do offer optional paid in-depth history reports if you want extra-deep records, but the free lookup gives you everything most buyers need." },
      { q: "Do I need to sign up or create an account?", a: "You do not need to sign up to start a search. Some optional add-on data (like saving reports to your dashboard) requires a free account, but the core plate-to-VIN lookup itself does not." },
      { q: "Which states are supported?", a: "All 50 US states plus Washington, D.C. We resolve plates issued by every state DMV and Department of Motor Vehicles equivalent — including California DMV, Texas DMV, Florida DHSMV, New York DMV, and every other agency." },
      { q: "Can I look up the owner's name and address?", a: "No. Owner personal information is protected by the federal Driver's Privacy Protection Act (DPPA, 18 U.S.C. § 2721). No legitimate consumer service — including ours — can return owner names, addresses, or phone numbers from a plate lookup. Anything claiming otherwise is breaking federal law. We return vehicle data only." },
      { q: "How accurate is the free data?", a: "Our plate-to-VIN match is sourced from official state DMV records and aggregated from registered title authorities. Once we resolve the VIN, the vehicle decode comes directly from NHTSA, manufacturer build sheets, and licensed history aggregators — the same sources the paid giants use." },
      { q: "How is this different from Carfax or AutoCheck plate lookup?", a: "Carfax charges $44.99 per plate lookup and AutoCheck charges $24.99. Both require a paid account before they reveal anything beyond the year and make. We give you the VIN, equipment list, and history records for free, with optional upgrades only if you need extra-deep records." },
      { q: "Can I look up classic, motorcycle, or commercial plates?", a: "Yes. Our database covers passenger plates, motorcycle plates, commercial plates, vanity plates, dealer plates, and historic/antique plates across all 50 states." },
      { q: "Is there a limit on free lookups?", a: "Casual users are not limited. We apply a fair-use rate limit only for clearly automated scraping behavior to keep the service fast for everyone." },
    ],
    bottomH2: "Ready to Look Up a Plate — Free?",
    bottomSub: "Scroll back up, drop in any US plate, and get the VIN plus full vehicle data. No card. No account. Always free.",
    bottomBtn: "Run Free Plate Lookup",
  },
  es: {
    home: "Inicio",
    crumb: "Consulta de placas gratis",
    heroBadge: "100% gratis · Sin registro · Los 50 estados",
    h1: "Consulta de placas de auto gratis",
    heroLedePre: "Ingresa cualquier placa de EE. UU. y estado — devolveremos al instante el VIN, año, marca, modelo, versión, motor, marcas de título y registros de historial. ",
    heroLedeBold: "Sin tarjeta de crédito. Sin suscripción. Sin trampa.",
    trustStats: [
      { icon: DollarSign, color: "text-green-500", text: "Siempre gratis" },
      { icon: Lock, color: "text-primary", text: "Cumple con DPPA" },
      { icon: Zap, color: "text-secondary", text: "Resultados en 5 segundos" },
      { icon: Globe, color: "text-primary", text: "50 estados + D.C." },
    ],
    howEyebrow: "Cómo funciona",
    howH2: "Gratis en 4 pasos · Menos de 30 segundos",
    howIntro: "La mayoría de servicios pagos te hacen registrarte, entregar tarjeta de crédito y esperar entre ofertas adicionales antes de ver nada. Nosotros no.",
    freeSteps: [
      { step: "1", title: "Ingresa la placa", desc: "Escribe la placa exactamente como aparece en el vehículo. Los espacios y guiones se manejan automáticamente.", icon: Search },
      { step: "2", title: "Elige el estado", desc: "Selecciona el estado donde está registrada la placa. Soportamos los 50 estados más D.C.", icon: Globe },
      { step: "3", title: "Obtén el VIN al instante", desc: "Resolvemos al instante la placa al VIN de 17 caracteres del vehículo — sin espera, sin pago.", icon: Zap },
      { step: "4", title: "Mira todos los datos del vehículo", desc: "Año, marca, modelo, versión, motor, marcas de título, equipo y registros completos de historial — todo gratis.", icon: FileText },
    ],
    cmpEyebrow: "¿Por qué pagar $44.99?",
    cmpH2: "Gratis vs. los gigantes pagos",
    cmpIntro: "Los mismos datos, sin ninguno de los muros de pago. Así se compara una búsqueda gratis por placa con nosotros frente a Carfax y AutoCheck.",
    colFeature: "Característica",
    colUs: "VINCheck Pro",
    colAuto: "AutoCheck",
    colCar: "Carfax",
    yes: "Sí",
    no: "No",
    free: "GRATIS",
    comparison: [
      { feature: "Búsqueda por placa de matrícula", us: true, paid1: true, paid2: true },
      { feature: "Costo por búsqueda individual", us: "GRATIS", paid1: "$24.99", paid2: "$44.99" },
      { feature: "Registro requerido", us: false, paid1: true, paid2: true },
      { feature: "Tarjeta de crédito requerida", us: false, paid1: true, paid2: true },
      { feature: "Los 50 estados + D.C.", us: true, paid1: true, paid2: true },
      { feature: "Revelación instantánea del VIN", us: true, paid1: true, paid2: false },
      { feature: "Fotos del vehículo", us: true, paid1: false, paid2: false },
      { feature: "Lista de equipo y opciones", us: true, paid1: false, paid2: false },
      { feature: "Sin trampa de suscripción", us: true, paid1: false, paid2: false },
    ],
    samplesH2: "Prueba una búsqueda de ejemplo",
    samplesIntro: "¿No sabes por dónde empezar? Aquí hay ejemplos de formatos de placa de estados populares.",
    samplePlates: [
      { plate: "8XYZ123", state: "California" },
      { plate: "ABC1234", state: "Texas" },
      { plate: "DEF5678", state: "Florida" },
      { plate: "GHI9012", state: "Nueva York" },
    ],
    whatEyebrow: "Lo que obtienes — Gratis",
    whatH2: "Todo lo de abajo está incluido a $0",
    whatItems: [
      { icon: Search, title: "Revelación del VIN", desc: "VIN completo de 17 caracteres resuelto al instante desde la placa." },
      { icon: Car, title: "Especificaciones del vehículo", desc: "Año, marca, modelo, versión, motor, transmisión, tracción." },
      { icon: Shield, title: "Marcas de título", desc: "Salvamento, inundación, limón, chatarra, reconstruido — toda marca registrada." },
      { icon: Clock, title: "Registros del odómetro", desc: "Historial de millaje de inspecciones, ventas y actualizaciones del DMV." },
      { icon: FileText, title: "Lista de equipo", desc: "Opciones originales, paquetes, código de pintura y equipo de fábrica." },
      { icon: AlertCircle, title: "Avisos de retiro", desc: "Retiros activos de la NHTSA y campañas de servicio del fabricante." },
    ],
    stateH2: "Búsqueda de placas gratis en los 50 estados",
    stateIntro: "Soportamos cada DMV estatal de EE. UU. Haz clic en tu estado para guías específicas de formato de placa y notas de marcas de título.",
    mostSearched: "Estados más buscados",
    allStates: "Todos los estados",
    topStates: ["California", "Texas", "Florida", "New York", "Pennsylvania", "Illinois", "Ohio", "Georgia", "North Carolina", "Michigan"],
    dppaH3: "Sobre la privacidad del dueño (DPPA)",
    dppaPre: "Bajo el Driver's Privacy Protection Act federal (18 U.S.C. § 2721), ",
    dppaBold: "ningún servicio de consumidor de búsqueda por placa puede devolver nombres, direcciones o números de teléfono del dueño",
    dppaPost: " — incluyéndonos. Devolvemos solo datos del vehículo (VIN, especificaciones, historial). Cualquier servicio que afirme lo contrario está operando ilegalmente.",
    faqH2: "Preguntas frecuentes",
    faqIntro: "Todo lo que la gente pregunta antes de hacer una búsqueda gratis de placa.",
    faqs: [
      { q: "¿Esta búsqueda de placas es realmente 100% gratis?", a: "Sí. Buscar una placa, obtener el VIN y ver los detalles principales del vehículo (año, marca, modelo, versión, equipo, marcas de título) es completamente gratis. Sin tarjeta de crédito, sin prueba, sin suscripción. Ofrecemos reportes opcionales pagos de historial en profundidad si quieres registros más detallados, pero la búsqueda gratis te da todo lo que la mayoría de compradores necesita." },
      { q: "¿Necesito registrarme o crear una cuenta?", a: "No necesitas registrarte para empezar una búsqueda. Algunos datos opcionales adicionales (como guardar reportes en tu dashboard) requieren una cuenta gratis, pero la búsqueda principal de placa-a-VIN no la necesita." },
      { q: "¿Qué estados están soportados?", a: "Los 50 estados de EE. UU. más Washington, D.C. Resolvemos placas emitidas por cada DMV estatal y equivalente de Departamento de Vehículos Motorizados — incluyendo California DMV, Texas DMV, Florida DHSMV, New York DMV y cada otra agencia." },
      { q: "¿Puedo buscar el nombre y dirección del dueño?", a: "No. La información personal del dueño está protegida por el Driver's Privacy Protection Act federal (DPPA, 18 U.S.C. § 2721). Ningún servicio legítimo de consumidor — incluyéndonos — puede devolver nombres, direcciones o números de teléfono del dueño desde una búsqueda por placa. Cualquier cosa que afirme lo contrario está rompiendo la ley federal. Devolvemos solo datos del vehículo." },
      { q: "¿Qué tan precisos son los datos gratis?", a: "Nuestra coincidencia de placa-a-VIN proviene de registros oficiales del DMV estatal y se agrega de autoridades de título registradas. Una vez que resolvemos el VIN, la decodificación del vehículo viene directamente de la NHTSA, hojas de fabricación del fabricante y agregadores de historial licenciados — las mismas fuentes que usan los gigantes pagos." },
      { q: "¿En qué se diferencia esto de Carfax o AutoCheck?", a: "Carfax cobra $44.99 por búsqueda de placa y AutoCheck cobra $24.99. Ambos requieren una cuenta paga antes de revelar cualquier cosa más allá del año y marca. Te damos el VIN, lista de equipo y registros de historial gratis, con upgrades opcionales solo si necesitas registros más profundos." },
      { q: "¿Puedo buscar placas clásicas, de motocicleta o comerciales?", a: "Sí. Nuestra base de datos cubre placas de pasajeros, placas de motocicleta, placas comerciales, placas vanity, placas de concesionario y placas históricas/antiguas en los 50 estados." },
      { q: "¿Hay un límite en las búsquedas gratis?", a: "Los usuarios casuales no están limitados. Aplicamos un límite de uso justo solo para comportamiento de scraping claramente automatizado para mantener el servicio rápido para todos." },
    ],
    bottomH2: "¿Listo para buscar una placa — Gratis?",
    bottomSub: "Desplázate hacia arriba, ingresa cualquier placa de EE. UU. y obtén el VIN más todos los datos del vehículo. Sin tarjeta. Sin cuenta. Siempre gratis.",
    bottomBtn: "Hacer búsqueda gratis de placa",
  },
  fr: {
    home: "Accueil",
    crumb: "Recherche de plaques d'immatriculation gratuite",
    heroBadge: "100% gratuit · Sans inscription · Les 50 états",
    h1: "Recherche de plaques d'immatriculation gratuite",
    heroLedePre: "Saisis n'importe quelle plaque d'immatriculation US et l'état — nous renverrons instantanément le VIN, l'année, la marque, le modèle, la finition, le moteur, les marques de titre et les dossiers d'historique. ",
    heroLedeBold: "Sans carte de crédit. Sans abonnement. Sans piège.",
    trustStats: [
      { icon: DollarSign, color: "text-green-500", text: "Toujours gratuit" },
      { icon: Lock, color: "text-primary", text: "Conforme DPPA" },
      { icon: Zap, color: "text-secondary", text: "Résultats en 5 secondes" },
      { icon: Globe, color: "text-primary", text: "50 états + D.C." },
    ],
    howEyebrow: "Comment ça marche",
    howH2: "Gratuit en 4 étapes · Moins de 30 secondes",
    howIntro: "La plupart des services payants te font inscrire, donner une carte de crédit et attendre à travers des ventes additionnelles avant de voir quoi que ce soit. Nous, non.",
    freeSteps: [
      { step: "1", title: "Saisis la plaque", desc: "Tape la plaque d'immatriculation exactement comme elle apparaît sur le véhicule. Les espaces et tirets sont gérés automatiquement.", icon: Search },
      { step: "2", title: "Choisis l'état", desc: "Sélectionne l'état où la plaque est enregistrée. Nous prenons en charge les 50 états plus D.C.", icon: Globe },
      { step: "3", title: "Obtiens le VIN instantanément", desc: "Nous résolvons instantanément la plaque vers le VIN de 17 caractères du véhicule — sans attente, sans paiement.", icon: Zap },
      { step: "4", title: "Vois toutes les données du véhicule", desc: "Année, marque, modèle, finition, moteur, marques de titre, équipement et dossiers complets d'historique — tout gratuit.", icon: FileText },
    ],
    cmpEyebrow: "Pourquoi payer $44.99 ?",
    cmpH2: "Gratuit vs. les géants payants",
    cmpIntro: "Les mêmes données, aucun des paywalls. Voici comment une recherche gratuite par plaque chez nous se compare à Carfax et AutoCheck.",
    colFeature: "Fonctionnalité",
    colUs: "VINCheck Pro",
    colAuto: "AutoCheck",
    colCar: "Carfax",
    yes: "Oui",
    no: "Non",
    free: "GRATUIT",
    comparison: [
      { feature: "Recherche par plaque d'immatriculation", us: true, paid1: true, paid2: true },
      { feature: "Coût par recherche individuelle", us: "GRATUIT", paid1: "$24.99", paid2: "$44.99" },
      { feature: "Inscription requise", us: false, paid1: true, paid2: true },
      { feature: "Carte de crédit requise", us: false, paid1: true, paid2: true },
      { feature: "Les 50 états + D.C.", us: true, paid1: true, paid2: true },
      { feature: "Révélation instantanée du VIN", us: true, paid1: true, paid2: false },
      { feature: "Photos du véhicule", us: true, paid1: false, paid2: false },
      { feature: "Liste d'équipement et d'options", us: true, paid1: false, paid2: false },
      { feature: "Sans piège d'abonnement", us: true, paid1: false, paid2: false },
    ],
    samplesH2: "Essaie un exemple de recherche",
    samplesIntro: "Tu ne sais pas par où commencer ? Voici des exemples de formats de plaque des états populaires.",
    samplePlates: [
      { plate: "8XYZ123", state: "California" },
      { plate: "ABC1234", state: "Texas" },
      { plate: "DEF5678", state: "Florida" },
      { plate: "GHI9012", state: "New York" },
    ],
    whatEyebrow: "Ce que tu obtiens — Gratuit",
    whatH2: "Tout ce qui suit est inclus à $0",
    whatItems: [
      { icon: Search, title: "Révélation du VIN", desc: "VIN complet de 17 caractères résolu instantanément depuis la plaque." },
      { icon: Car, title: "Spécifications du véhicule", desc: "Année, marque, modèle, finition, moteur, transmission, transmission intégrale." },
      { icon: Shield, title: "Marques de titre", desc: "Salvage, inondation, lemon, junk, rebuilt — chaque marque enregistrée." },
      { icon: Clock, title: "Dossiers d'odomètre", desc: "Historique du kilométrage des inspections, ventes et mises à jour du DMV." },
      { icon: FileText, title: "Liste d'équipement", desc: "Options d'origine, packs, code de peinture et équipement d'usine." },
      { icon: AlertCircle, title: "Avis de rappel", desc: "Rappels NHTSA actifs et campagnes de service du fabricant." },
    ],
    stateH2: "Recherche gratuite de plaques dans les 50 états",
    stateIntro: "Nous prenons en charge chaque DMV d'état US. Clique sur ton état pour des guides de format de plaque spécifiques à l'état et des notes sur les marques de titre.",
    mostSearched: "États les plus recherchés",
    allStates: "Tous les états",
    topStates: ["California", "Texas", "Florida", "New York", "Pennsylvania", "Illinois", "Ohio", "Georgia", "North Carolina", "Michigan"],
    dppaH3: "À propos de la vie privée du propriétaire (DPPA)",
    dppaPre: "Sous le Driver's Privacy Protection Act fédéral (18 U.S.C. § 2721), ",
    dppaBold: "aucun service grand public de recherche de plaque ne peut renvoyer les noms, adresses ou numéros de téléphone du propriétaire",
    dppaPost: " — y compris le nôtre. Nous renvoyons uniquement les données du véhicule (VIN, spécifications, historique). Tout service prétendant le contraire opère illégalement.",
    faqH2: "Questions fréquentes",
    faqIntro: "Tout ce que les gens demandent avant de lancer une recherche gratuite de plaque.",
    faqs: [
      { q: "Cette recherche de plaque d'immatriculation est-elle vraiment 100% gratuite ?", a: "Oui. Rechercher une plaque, obtenir le VIN et voir les détails principaux du véhicule (année, marque, modèle, finition, équipement, marques de titre) est complètement gratuit. Sans carte de crédit, sans essai, sans abonnement. Nous proposons des rapports d'historique approfondis payants optionnels si tu veux des dossiers extra-détaillés, mais la recherche gratuite te donne tout ce dont la plupart des acheteurs ont besoin." },
      { q: "Dois-je m'inscrire ou créer un compte ?", a: "Tu n'as pas besoin de t'inscrire pour démarrer une recherche. Certaines données complémentaires optionnelles (comme sauvegarder les rapports dans ton tableau de bord) nécessitent un compte gratuit, mais la recherche principale plaque-à-VIN elle-même ne le nécessite pas." },
      { q: "Quels états sont pris en charge ?", a: "Les 50 états américains plus Washington, D.C. Nous résolvons les plaques émises par chaque DMV d'état et équivalent de Department of Motor Vehicles — y compris California DMV, Texas DMV, Florida DHSMV, New York DMV et toutes les autres agences." },
      { q: "Puis-je rechercher le nom et l'adresse du propriétaire ?", a: "Non. Les informations personnelles du propriétaire sont protégées par le Driver's Privacy Protection Act fédéral (DPPA, 18 U.S.C. § 2721). Aucun service grand public légitime — y compris le nôtre — ne peut renvoyer les noms, adresses ou numéros de téléphone du propriétaire depuis une recherche de plaque. Tout ce qui prétend le contraire enfreint la loi fédérale. Nous renvoyons uniquement les données du véhicule." },
      { q: "À quel point les données gratuites sont-elles précises ?", a: "Notre correspondance plaque-à-VIN provient des dossiers officiels du DMV d'état et est agrégée à partir des autorités de titre enregistrées. Une fois que nous résolvons le VIN, le décodage du véhicule vient directement de la NHTSA, des feuilles de fabrication du fabricant et des agrégateurs d'historique sous licence — les mêmes sources qu'utilisent les géants payants." },
      { q: "En quoi est-ce différent de la recherche de plaque Carfax ou AutoCheck ?", a: "Carfax facture $44.99 par recherche de plaque et AutoCheck facture $24.99. Les deux exigent un compte payant avant de révéler quoi que ce soit au-delà de l'année et de la marque. Nous te donnons le VIN, la liste d'équipement et les dossiers d'historique gratuitement, avec des upgrades optionnels seulement si tu as besoin de dossiers plus approfondis." },
      { q: "Puis-je rechercher des plaques classiques, de moto ou commerciales ?", a: "Oui. Notre base de données couvre les plaques de passagers, plaques de moto, plaques commerciales, plaques vanity, plaques de concessionnaire et plaques historiques/antiques dans les 50 états." },
      { q: "Y a-t-il une limite sur les recherches gratuites ?", a: "Les utilisateurs occasionnels ne sont pas limités. Nous appliquons une limite d'usage équitable uniquement pour les comportements de scraping clairement automatisés afin de garder le service rapide pour tout le monde." },
    ],
    bottomH2: "Prêt à rechercher une plaque — Gratuit ?",
    bottomSub: "Remonte en haut, saisis n'importe quelle plaque US et obtiens le VIN plus toutes les données du véhicule. Sans carte. Sans compte. Toujours gratuit.",
    bottomBtn: "Lancer la recherche gratuite de plaque",
  },
} as const;

interface Props { locale: Locale; }

export default function LookUpCarPlatesFreeBody({ locale }: Props) {
  const c = COPY[locale];
  const link = (en: string) => (locale === "es" ? `/es${en}` : en);

  return (
    <main className="bg-surface min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <Breadcrumbs
          items={[
            { label: c.home, href: locale === "es" ? "/es" : "/" },
            { label: c.crumb },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="px-4 sm:px-6 pb-10 sm:pb-14">
        <div className="max-w-6xl mx-auto text-center">
          <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-black text-primary uppercase tracking-[0.2em] mb-3 sm:mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            {c.heroBadge}
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold text-primary mb-4 sm:mb-6 tracking-tight">
            {c.h1}
          </h1>
          <p className="speakable-summary text-base sm:text-lg text-on-surface-variant max-w-3xl mx-auto mb-6 sm:mb-8">
            {c.heroLedePre}
            <span className="font-bold text-primary">{c.heroLedeBold}</span>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mb-2 text-xs sm:text-sm">
            {c.trustStats.map(({ icon: Icon, color, text }) => (
              <span key={text} className="inline-flex items-center gap-1.5 text-on-surface-variant">
                <Icon className={`w-4 h-4 ${color}`} /> {text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive lookup tool */}
      <section className="px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <LicensePlateLookup locale={locale} />
        </div>
      </section>

      {/* VIN check banner */}
      <section className="px-4 sm:px-6 mt-12 sm:mt-16">
        <div className="max-w-6xl mx-auto">
          <VinCheckBanner variant="card" />
        </div>
      </section>

      {/* How it works */}
      <section className="px-4 sm:px-6 py-12 sm:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <span className="text-xs sm:text-sm font-black text-primary uppercase tracking-[0.2em] mb-3 block">{c.howEyebrow}</span>
            <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3 sm:mb-4">{c.howH2}</h2>
            <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto">{c.howIntro}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {c.freeSteps.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.step} className="relative rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-3xl font-headline font-black text-primary/15">{s.step}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-2">{s.title}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="px-4 sm:px-6 py-12 sm:py-20 bg-surface-container-lowest">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <span className="text-xs sm:text-sm font-black text-primary uppercase tracking-[0.2em] mb-3 block">{c.cmpEyebrow}</span>
            <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3 sm:mb-4">{c.cmpH2}</h2>
            <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto">{c.cmpIntro}</p>
          </div>

          <div className="rounded-3xl border border-outline-variant bg-surface overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse min-w-[560px]">
                <thead className="bg-surface-container-low">
                  <tr>
                    <th className="p-4 sm:p-5 text-left font-headline text-sm sm:text-base text-primary font-extrabold">{c.colFeature}</th>
                    <th className="p-4 sm:p-5 text-center font-headline text-sm sm:text-base text-white font-black bg-primary">{c.colUs}</th>
                    <th className="p-4 sm:p-5 text-center font-headline text-sm sm:text-base text-on-surface-variant font-bold">{c.colAuto}</th>
                    <th className="p-4 sm:p-5 text-center font-headline text-sm sm:text-base text-on-surface-variant font-bold">{c.colCar}</th>
                  </tr>
                </thead>
                <tbody>
                  {c.comparison.map((row, i) => (
                    <tr key={row.feature} className={`border-t border-outline-variant/60 ${i === 1 ? "bg-primary/[0.03]" : ""}`}>
                      <td className="p-3 sm:p-4 text-xs sm:text-sm font-semibold text-on-surface">{row.feature}</td>
                      <td className="p-3 sm:p-4 text-center bg-primary/[0.06]">
                        {typeof row.us === "boolean" ? (
                          row.us ? (
                            <Check className="w-5 h-5 text-green-500 mx-auto" strokeWidth={3} />
                          ) : (
                            <AlertCircle className="w-5 h-5 text-error/70 mx-auto" />
                          )
                        ) : (
                          <span className="text-base sm:text-lg font-headline font-black text-primary">{row.us}</span>
                        )}
                      </td>
                      <td className="p-3 sm:p-4 text-center">
                        {typeof row.paid1 === "boolean" ? (
                          row.paid1 ? (
                            <Check className="w-5 h-5 text-on-surface-variant mx-auto" />
                          ) : (
                            <span className="text-error/70 text-xs font-bold">{c.no}</span>
                          )
                        ) : (
                          <span className="text-sm font-headline font-bold text-on-surface-variant">{row.paid1}</span>
                        )}
                      </td>
                      <td className="p-3 sm:p-4 text-center">
                        {typeof row.paid2 === "boolean" ? (
                          row.paid2 ? (
                            <Check className="w-5 h-5 text-on-surface-variant mx-auto" />
                          ) : (
                            <span className="text-error/70 text-xs font-bold">{c.no}</span>
                          )
                        ) : (
                          <span className="text-sm font-headline font-bold text-on-surface-variant">{row.paid2}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Sample plates */}
      <section className="px-4 sm:px-6 py-12 sm:py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-3">{c.samplesH2}</h2>
            <p className="text-sm sm:text-base text-on-surface-variant">{c.samplesIntro}</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {c.samplePlates.map((s) => (
              <div key={s.plate} className="rounded-2xl border-2 border-dashed border-outline-variant bg-surface-container-lowest p-4 sm:p-5 text-center hover:border-primary/40 transition-colors">
                <div className="text-[10px] sm:text-xs uppercase tracking-wider text-on-surface-variant font-bold mb-1.5">{s.state}</div>
                <div className="font-mono text-lg sm:text-2xl font-black text-primary tracking-wider">{s.plate}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="px-4 sm:px-6 py-12 sm:py-20 bg-surface-container-lowest">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <span className="text-xs sm:text-sm font-black text-primary uppercase tracking-[0.2em] mb-3 block">{c.whatEyebrow}</span>
            <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3 sm:mb-4">{c.whatH2}</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {c.whatItems.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="rounded-2xl border border-outline-variant bg-surface p-5 sm:p-6">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1.5">{f.title}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* State directory */}
      <section className="px-4 sm:px-6 py-12 sm:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3 sm:mb-4">{c.stateH2}</h2>
            <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto">{c.stateIntro}</p>
          </div>

          <div className="mb-6 sm:mb-8">
            <h3 className="text-sm font-black uppercase tracking-wider text-primary mb-3">{c.mostSearched}</h3>
            <div className="flex flex-wrap gap-2">
              {c.topStates.map((name) => {
                const s = states.find((st) => st.name === name);
                if (!s) return null;
                return (
                  <Link
                    key={s.slug}
                    href={link(`/vin-check/state/${s.slug}`)}
                    className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary text-white text-xs sm:text-sm font-bold hover:brightness-110 transition-all"
                  >
                    {s.name} <ArrowRight className="w-3 h-3" />
                  </Link>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-wider text-on-surface-variant mb-3">{c.allStates}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
              {states.map((s) => (
                <Link
                  key={s.slug}
                  href={link(`/state-vin-check/${s.slug}`)}
                  className="px-3 py-2 rounded-lg border border-outline-variant bg-surface-container-lowest text-xs sm:text-sm font-semibold text-on-surface hover:border-primary/40 hover:bg-primary/5 transition-colors"
                >
                  {s.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DPPA */}
      <section className="px-4 sm:px-6 pb-12 sm:pb-16">
        <div className="max-w-4xl mx-auto rounded-2xl border border-outline-variant bg-surface-container-low p-5 sm:p-6">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="w-10 h-10 rounded-xl bg-secondary/15 flex items-center justify-center flex-shrink-0">
              <Lock className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1.5">{c.dppaH3}</h3>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                {c.dppaPre}
                <span className="font-semibold">{c.dppaBold}</span>
                {c.dppaPost}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mid banner */}
      <section className="px-4 sm:px-6 pb-12 sm:pb-16">
        <div className="max-w-6xl mx-auto">
          <VinCheckBanner />
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 sm:px-6 py-12 sm:py-20 bg-surface-container-lowest">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3 sm:mb-4">{c.faqH2}</h2>
            <p className="text-sm sm:text-base text-on-surface-variant">{c.faqIntro}</p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {c.faqs.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-outline-variant bg-surface p-4 sm:p-5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                  <span className="text-sm sm:text-base font-headline font-extrabold text-primary pr-2">{f.q}</span>
                  <span className="flex-shrink-0 mt-0.5 text-primary text-xl font-light group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-xs sm:text-sm text-on-surface-variant leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-4 sm:px-6 py-14 sm:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3 sm:mb-4">{c.bottomH2}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-6 sm:mb-8 max-w-xl mx-auto">{c.bottomSub}</p>
          <Link
            href="#plate"
            className="inline-flex items-center gap-2 px-7 sm:px-9 py-3 sm:py-3.5 rounded-full font-bold text-sm sm:text-base text-on-secondary-container hover:brightness-110 hover:shadow-lg transition-all shadow-md"
            style={{ background: "var(--color-secondary-container)" }}
          >
            {c.bottomBtn}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-16 sm:pb-24">
        <div className="max-w-6xl mx-auto">
          <RelatedChecks exclude="/look-up-car-plates-free" />
        </div>
      </section>
    </main>
  );
}
