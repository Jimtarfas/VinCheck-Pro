/**
 * Shared body for /vin-check-vs-bumper and /es/vin-check-vs-bumper.
 * Wave 18b — full English layout in both locales via COPY={en,es}.
 */

import Link from "next/link";
import { Check, X } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import type { Locale } from "@/i18n/config";

const ROWS_EN: { feature: string; us: boolean | string; them: boolean | string }[] = [
  { feature: "Single report price", us: "$14.99", them: "Subscription only" },
  { feature: "Monthly subscription", us: "Optional $24.99", them: "$19.99 / mo" },
  { feature: "Pay-as-you-go available", us: true, them: false },
  { feature: "Free VIN decode (no account)", us: true, them: false },
  { feature: "NMVTIS title brand data", us: true, them: true },
  { feature: "Salvage / rebuilt brand check", us: true, them: true },
  { feature: "Accident history records", us: true, them: true },
  { feature: "Odometer / mileage timeline", us: true, them: true },
  { feature: "Stolen vehicle (NICB) check", us: true, them: true },
  { feature: "Open recall lookup", us: true, them: true },
  { feature: "Manufacturer buyback / lemon", us: true, them: true },
  { feature: "Real vehicle photos", us: true, them: true },
  { feature: "Market value estimate", us: true, them: true },
  { feature: "Continuous vehicle monitoring", us: false, them: true },
  { feature: "People-search add-ons", us: false, them: true },
  { feature: "Cancel anytime, no auto-renew", us: true, them: false },
  { feature: "Instant download report", us: true, them: true },
];

const ROWS_FR: typeof ROWS_EN = [
  { feature: "Prix du rapport unique", us: "$14.99", them: "Abonnement uniquement" },
  { feature: "Abonnement mensuel", us: "Optionnel $24.99", them: "$19.99 / mois" },
  { feature: "Paiement à l'usage disponible", us: true, them: false },
  { feature: "Décodage VIN gratuit (sans compte)", us: true, them: false },
  { feature: "Données de marques de titre NMVTIS", us: true, them: true },
  { feature: "Vérification marque épave / reconstruit", us: true, them: true },
  { feature: "Registres d'historique d'accidents", us: true, them: true },
  { feature: "Chronologie odomètre / kilométrage", us: true, them: true },
  { feature: "Vérification véhicule volé (NICB)", us: true, them: true },
  { feature: "Recherche de rappels ouverts", us: true, them: true },
  { feature: "Rachat constructeur / lemon", us: true, them: true },
  { feature: "Vraies photos du véhicule", us: true, them: true },
  { feature: "Estimation de valeur de marché", us: true, them: true },
  { feature: "Surveillance continue du véhicule", us: false, them: true },
  { feature: "Modules de recherche de personnes", us: false, them: true },
  { feature: "Annule quand tu veux, sans renouvellement auto", us: true, them: false },
  { feature: "Téléchargement instantané du rapport", us: true, them: true },
];

const ROWS_ES: typeof ROWS_EN = [
  { feature: "Precio de reporte único", us: "$14.99", them: "Solo suscripción" },
  { feature: "Suscripción mensual", us: "Opcional $24.99", them: "$19.99 / mes" },
  { feature: "Pago por uso disponible", us: true, them: false },
  { feature: "Decodificación VIN gratis (sin cuenta)", us: true, them: false },
  { feature: "Datos de marca de título de NMVTIS", us: true, them: true },
  { feature: "Verificación marca salvamento / reconstruido", us: true, them: true },
  { feature: "Registros de historial de accidentes", us: true, them: true },
  { feature: "Línea de tiempo de odómetro / kilometraje", us: true, them: true },
  { feature: "Verificación de vehículo robado (NICB)", us: true, them: true },
  { feature: "Búsqueda de recalls abiertos", us: true, them: true },
  { feature: "Recompra por fabricante / limón", us: true, them: true },
  { feature: "Fotos reales del vehículo", us: true, them: true },
  { feature: "Estimación de valor de mercado", us: true, them: true },
  { feature: "Monitoreo continuo del vehículo", us: false, them: true },
  { feature: "Complementos de búsqueda de personas", us: false, them: true },
  { feature: "Cancela cuando quieras, sin auto-renovación", us: true, them: false },
  { feature: "Descarga instantánea del reporte", us: true, them: true },
];

const COPY = {
  en: {
    home: "Home", crumb: "CarCheckerVIN vs Bumper",
    h1: "CarCheckerVIN vs Bumper: Pricing & Features Compared",
    intro: "Bumper is a subscription-first vehicle history service that charges roughly $19.99 per month for unlimited reports plus ongoing monitoring of vehicles you own. CarCheckerVIN takes the opposite approach: pay only for the report you need, when you need it, with no recurring charges. Below is a fair, fact-checked comparison so you can decide which pricing model fits your situation.",
    ctaTopHeading: "Run a VIN Check Now",
    h2Compare: "Side-by-Side Comparison",
    compareIntro: "Below is a feature-by-feature breakdown based on the publicly listed retail prices and report contents of both services as of April 2026.",
    thFeature: "Feature", thUs: "CarCheckerVIN", thThem: "Bumper",
    pricingNote: "Pricing reflects the publicly listed retail price for individual consumer reports and subscriptions as of April 2026.",
    rows: ROWS_EN,
    h2Price: "Pricing — Subscription vs Pay-As-You-Go",
    price1: "Bumper's consumer offering is built around a recurring subscription, currently around $19.99 per month, that bundles unlimited reports and ongoing monitoring. New users typically see a low introductory price for the first week, which then rolls into the standard monthly rate unless cancelled.",
    price2: "CarCheckerVIN is intentionally pay-as-you-go: $14.99 for a single report, $35.99 for a three-pack, and $24.99 for a month of unlimited access — with no auto-renewal. If you only need one report this year, you pay $14.99 and you are done. If you need unlimited for a month while shopping, you pay $24.99 once and it expires on its own.",
    price3: "For most used-car buyers, this matters because the typical search lasts two to four weeks. Locking into a subscription for an indefinite period — and remembering to cancel before the next billing cycle — is friction most buyers do not want.",
    h2Monitor: "Continuous Monitoring — Where Bumper Wins",
    m1: "Bumper's genuine differentiator is ongoing monitoring of vehicles you save to your account. As long as you remain subscribed, you receive alerts when new title brands, recalls, or accident records are added to a tracked VIN. That is legitimately useful for owners who want a real-time heads-up on vehicles they already own.",
    m2: "CarCheckerVIN does not offer a continuous monitoring service today. Our model is a fresh, point-in-time report you can re-run any time you need an update — for $14.99 each time. For most owners, an annual re-check is more than sufficient and is cheaper than 12 months of subscription.",
    h2Data: "Data Sources and Report Contents",
    d1Pre: "Both services pull from the same backbone: NMVTIS, NICB, NHTSA, and state DMV feeds. CarCheckerVIN's premium report includes a full VIN decode, NMVTIS title history including ",
    salvageLink: "salvage and rebuilt brands",
    d1Mid1: ", reported ",
    accidentLink: "accident history",
    d1Mid2: ", ",
    odoLink: "odometer timeline",
    d1Mid3: ", ",
    stolenLink: "stolen vehicle check",
    d1Suffix: ", open recalls, lemon and buyback flags, market value, and real photos when available.",
    d2: "A Bumper report covers the same core categories and adds people-search style add-ons (owner search, neighbour lookups) that some users find useful and others view as scope creep. Functionally, the vehicle data is comparable.",
    h2Trap: "The Auto-Renewal Trap",
    trap1: "One real consumer complaint about subscription-first VIN services in general is the difficulty of cancelling once the introductory week ends. Forgotten subscriptions can quietly cost $200–$240 a year. CarCheckerVIN avoids this entirely — there is no auto-renewal on any tier. When your unlimited month expires, it expires.",
    trap2: "If you do choose Bumper, set a calendar reminder the day you sign up so you can cancel before the recurring charge kicks in if you no longer need it.",
    h2When: "When Bumper May Make Sense",
    whenBullets: [
      "You own multiple vehicles and want continuous monitoring with alerts on new events.",
      "You will use the people-search and owner-lookup add-ons regularly enough to justify the monthly fee.",
      "You are comfortable managing a recurring subscription and remembering to cancel when you no longer need it.",
    ],
    h2Choose: "When to Choose CarCheckerVIN",
    chooseBullets: [
      { text: "You want a one-time report for a single car purchase without committing to a subscription.", linkText: null, linkHref: null, after: null },
      { text: "You want to avoid recurring charges and the cancel-in-time anxiety that comes with subscription products.", linkText: null, linkHref: null, after: null },
      { text: "You want a free instant decode without an account or trial — see our ", linkText: "free VIN check guide", linkHref: "/guides/free-vin-check", after: "." },
      { text: "You want the option to upgrade to a 30-day unlimited pass for $24.99 that simply expires when finished.", linkText: null, linkHref: null, after: null },
    ],
    h2Bottom: "The Bottom Line",
    bottom1: "Bumper is a credible product whose strongest pitch is continuous monitoring for vehicles you already own — something genuinely valuable to a small subset of users. For the much larger group of buyers who simply want a comprehensive report on a car they are about to purchase, CarCheckerVIN delivers comparable data without locking you into a recurring monthly charge.",
    bottom2Pre: "See how we compare against the other major providers in our ",
    carfaxLink: "Carfax comparison",
    bottom2Mid1: ", ",
    autoLink: "AutoCheck comparison",
    bottom2Mid2: ", ",
    vinauditLink: "VinAudit comparison",
    bottom2Mid3: ", and ",
    clearvinLink: "ClearVin comparison",
    bottom2End: ", or run a free decode now from our ",
    vinLink: "VIN check page",
    bottom2Suffix: ".",
    faqHeading: "Frequently Asked Questions",
    ctaBottomHeading: "Try a Smarter, Cheaper Alternative",
    ctaBottomSub: "Enter a 17-character VIN and see what a $14.99 report looks like.",
  },
  es: {
    home: "Inicio", crumb: "CarCheckerVIN vs Bumper",
    h1: "CarCheckerVIN vs Bumper: precios y características comparados",
    intro: "Bumper es un servicio de historial vehicular basado en suscripción que cobra aproximadamente $19.99 al mes por reportes ilimitados más monitoreo continuo de los vehículos que posees. CarCheckerVIN toma el enfoque opuesto: paga solo por el reporte que necesitas, cuando lo necesitas, sin cargos recurrentes. A continuación una comparación justa y verificada para que decidas qué modelo de precio se ajusta a tu situación.",
    ctaTopHeading: "Haz una verificación VIN ahora",
    h2Compare: "Comparación lado a lado",
    compareIntro: "A continuación un desglose característica por característica basado en los precios minoristas listados públicamente y los contenidos del reporte de ambos servicios a abril de 2026.",
    thFeature: "Característica", thUs: "CarCheckerVIN", thThem: "Bumper",
    pricingNote: "El precio refleja el precio minorista listado públicamente para reportes individuales de consumidor y suscripciones a abril de 2026.",
    rows: ROWS_ES,
    h2Price: "Precio — Suscripción vs Pago por uso",
    price1: "La oferta de consumidor de Bumper está construida alrededor de una suscripción recurrente, actualmente alrededor de $19.99 al mes, que agrupa reportes ilimitados y monitoreo continuo. Los nuevos usuarios típicamente ven un precio introductorio bajo durante la primera semana, que luego pasa a la tarifa mensual estándar a menos que se cancele.",
    price2: "CarCheckerVIN es intencionalmente pago por uso: $14.99 por un reporte único, $35.99 por un paquete de tres, y $24.99 por un mes de acceso ilimitado — sin auto-renovación. Si solo necesitas un reporte este año, pagas $14.99 y listo. Si necesitas ilimitado por un mes mientras compras, pagas $24.99 una vez y expira por sí solo.",
    price3: "Para la mayoría de compradores de autos usados, esto importa porque la búsqueda típica dura de dos a cuatro semanas. Comprometerse a una suscripción por un período indefinido — y recordar cancelar antes del próximo ciclo de facturación — es una fricción que la mayoría de compradores no quiere.",
    h2Monitor: "Monitoreo continuo — Donde Bumper gana",
    m1: "El diferenciador genuino de Bumper es el monitoreo continuo de vehículos que guardas en tu cuenta. Mientras permanezcas suscrito, recibes alertas cuando se agregan nuevas marcas de título, recalls o registros de accidentes a un VIN rastreado. Eso es legítimamente útil para propietarios que quieren un aviso en tiempo real sobre vehículos que ya poseen.",
    m2: "CarCheckerVIN no ofrece un servicio de monitoreo continuo hoy. Nuestro modelo es un reporte fresco, en un punto en el tiempo, que puedes volver a ejecutar cada vez que necesites una actualización — por $14.99 cada vez. Para la mayoría de propietarios, una re-verificación anual es más que suficiente y es más barata que 12 meses de suscripción.",
    h2Data: "Fuentes de datos y contenidos del reporte",
    d1Pre: "Ambos servicios extraen del mismo backbone: feeds de NMVTIS, NICB, NHTSA y DMV estatales. El reporte premium de CarCheckerVIN incluye una decodificación VIN completa, historial de título de NMVTIS incluyendo ",
    salvageLink: "marcas de salvamento y reconstruido",
    d1Mid1: ", ",
    accidentLink: "historial de accidentes",
    d1Mid2: " reportados, ",
    odoLink: "línea de tiempo de odómetro",
    d1Mid3: ", ",
    stolenLink: "verificación de vehículo robado",
    d1Suffix: ", recalls abiertos, indicadores de limón y recompra, valor de mercado y fotos reales cuando están disponibles.",
    d2: "Un reporte de Bumper cubre las mismas categorías clave y agrega complementos de estilo búsqueda de personas (búsqueda de propietario, búsquedas de vecinos) que algunos usuarios encuentran útiles y otros ven como expansión de alcance. Funcionalmente, los datos del vehículo son comparables.",
    h2Trap: "La trampa de la auto-renovación",
    trap1: "Una queja real de consumidores sobre servicios VIN basados en suscripción en general es la dificultad de cancelar una vez que termina la semana introductoria. Las suscripciones olvidadas pueden costar silenciosamente $200-$240 al año. CarCheckerVIN evita esto por completo — no hay auto-renovación en ningún nivel. Cuando expira tu mes ilimitado, expira.",
    trap2: "Si eliges Bumper, configura un recordatorio en el calendario el día que te registres para poder cancelar antes de que comience el cargo recurrente si ya no lo necesitas.",
    h2When: "Cuándo Bumper puede tener sentido",
    whenBullets: [
      "Posees múltiples vehículos y quieres monitoreo continuo con alertas sobre nuevos eventos.",
      "Usarás los complementos de búsqueda de personas y de propietario lo suficiente para justificar la tarifa mensual.",
      "Te sientes cómodo manejando una suscripción recurrente y recordando cancelar cuando ya no la necesites.",
    ],
    h2Choose: "Cuándo elegir CarCheckerVIN",
    chooseBullets: [
      { text: "Quieres un reporte único para una sola compra de auto sin comprometerte a una suscripción.", linkText: null, linkHref: null, after: null },
      { text: "Quieres evitar cargos recurrentes y la ansiedad de cancelar a tiempo que viene con productos de suscripción.", linkText: null, linkHref: null, after: null },
      { text: "Quieres una decodificación instantánea gratuita sin cuenta ni prueba — consulta nuestra ", linkText: "guía de verificación VIN gratis", linkHref: "/guides/free-vin-check", after: "." },
      { text: "Quieres la opción de actualizar a un pase ilimitado de 30 días por $24.99 que simplemente expira cuando termina.", linkText: null, linkHref: null, after: null },
    ],
    h2Bottom: "La conclusión",
    bottom1: "Bumper es un producto creíble cuya mejor propuesta es el monitoreo continuo para vehículos que ya posees — algo genuinamente valioso para un pequeño subconjunto de usuarios. Para el grupo mucho más grande de compradores que simplemente quieren un reporte completo sobre un auto que están a punto de comprar, CarCheckerVIN entrega datos comparables sin comprometerte a un cargo mensual recurrente.",
    bottom2Pre: "Mira cómo nos comparamos con los otros proveedores principales en nuestra ",
    carfaxLink: "comparación con Carfax",
    bottom2Mid1: ", ",
    autoLink: "comparación con AutoCheck",
    bottom2Mid2: ", ",
    vinauditLink: "comparación con VinAudit",
    bottom2Mid3: " y ",
    clearvinLink: "comparación con ClearVin",
    bottom2End: ", o haz una decodificación gratis ahora desde nuestra ",
    vinLink: "página de verificación VIN",
    bottom2Suffix: ".",
    faqHeading: "Preguntas frecuentes",
    ctaBottomHeading: "Prueba una alternativa más inteligente y económica",
    ctaBottomSub: "Ingresa un VIN de 17 caracteres y ve cómo se ve un reporte de $14.99.",
  },
  fr: {
    home: "Accueil", crumb: "CarCheckerVIN vs Bumper",
    h1: "CarCheckerVIN vs Bumper : prix et caractéristiques comparés",
    intro: "Bumper est un service d'historique de véhicule axé abonnement qui facture environ $19.99 par mois pour des rapports illimités et une surveillance continue des véhicules que tu possèdes. CarCheckerVIN adopte l'approche inverse : paie seulement pour le rapport dont tu as besoin, quand tu en as besoin, sans frais récurrents. Ci-dessous une comparaison juste et vérifiée pour que tu décides quel modèle de prix convient à ta situation.",
    ctaTopHeading: "Lance une vérification VIN maintenant",
    h2Compare: "Comparatif côte à côte",
    compareIntro: "Ci-dessous une décomposition caractéristique par caractéristique basée sur les prix au détail publiquement listés et le contenu des rapports des deux services en avril 2026.",
    thFeature: "Caractéristique", thUs: "CarCheckerVIN", thThem: "Bumper",
    pricingNote: "Les prix reflètent le prix de détail publiquement listé pour les rapports individuels grand public et les abonnements en avril 2026.",
    rows: ROWS_FR,
    h2Price: "Prix — Abonnement vs Paiement à l'usage",
    price1: "L'offre grand public de Bumper est bâtie autour d'un abonnement récurrent, actuellement environ $19.99 par mois, qui regroupe des rapports illimités et une surveillance continue. Les nouveaux utilisateurs voient généralement un prix d'introduction bas pendant la première semaine, qui passe ensuite au tarif mensuel standard sauf annulation.",
    price2: "CarCheckerVIN est intentionnellement à l'usage : $14.99 pour un rapport unique, $35.99 pour un pack de trois, et $24.99 pour un mois d'accès illimité — sans renouvellement automatique. Si tu n'as besoin que d'un seul rapport cette année, tu paies $14.99 et c'est fini. Si tu as besoin d'illimité pendant un mois en cherchant, tu paies $24.99 une fois et ça expire seul.",
    price3: "Pour la plupart des acheteurs de voitures d'occasion, cela compte parce que la recherche typique dure deux à quatre semaines. S'engager dans un abonnement pour une période indéfinie — et se souvenir d'annuler avant le prochain cycle de facturation — est une friction que la plupart des acheteurs ne veulent pas.",
    h2Monitor: "Surveillance continue — Là où Bumper gagne",
    m1: "Le vrai différenciateur de Bumper est la surveillance continue des véhicules que tu enregistres sur ton compte. Tant que tu restes abonné, tu reçois des alertes lorsque de nouvelles marques de titre, rappels ou registres d'accidents sont ajoutés à un VIN suivi. C'est légitimement utile pour les propriétaires qui veulent un avertissement en temps réel sur les véhicules qu'ils possèdent déjà.",
    m2: "CarCheckerVIN n'offre pas de service de surveillance continue aujourd'hui. Notre modèle est un rapport frais, ponctuel, que tu peux relancer chaque fois que tu as besoin d'une mise à jour — pour $14.99 à chaque fois. Pour la plupart des propriétaires, une re-vérification annuelle est largement suffisante et est moins chère que 12 mois d'abonnement.",
    h2Data: "Sources de données et contenu des rapports",
    d1Pre: "Les deux services puisent dans la même colonne vertébrale : flux NMVTIS, NICB, NHTSA et DMV étatiques. Le rapport premium CarCheckerVIN inclut un décodage VIN complet, l'historique de titre NMVTIS incluant les ",
    salvageLink: "marques d'épave et reconstruit",
    d1Mid1: ", l'",
    accidentLink: "historique d'accidents",
    d1Mid2: " rapporté, la ",
    odoLink: "chronologie odomètre",
    d1Mid3: ", la ",
    stolenLink: "vérification véhicule volé",
    d1Suffix: ", les rappels ouverts, les indicateurs lemon et rachat, la valeur de marché et de vraies photos lorsque disponibles.",
    d2: "Un rapport Bumper couvre les mêmes catégories clés et ajoute des modules style recherche de personnes (recherche de propriétaire, recherche de voisins) que certains utilisateurs trouvent utiles et d'autres voient comme une expansion de portée. Fonctionnellement, les données du véhicule sont comparables.",
    h2Trap: "Le piège du renouvellement automatique",
    trap1: "Une vraie plainte de consommateurs sur les services VIN axés abonnement en général est la difficulté d'annuler une fois la semaine d'introduction terminée. Les abonnements oubliés peuvent silencieusement coûter $200-$240 par an. CarCheckerVIN évite cela entièrement — il n'y a pas de renouvellement automatique à aucun niveau. Quand ton mois illimité expire, il expire.",
    trap2: "Si tu choisis Bumper, configure un rappel de calendrier le jour où tu t'inscris pour pouvoir annuler avant que la facturation récurrente ne démarre si tu n'en as plus besoin.",
    h2When: "Quand Bumper peut avoir du sens",
    whenBullets: [
      "Tu possèdes plusieurs véhicules et veux une surveillance continue avec alertes sur les nouveaux événements.",
      "Tu utiliseras les modules de recherche de personnes et de propriétaire assez régulièrement pour justifier les frais mensuels.",
      "Tu es à l'aise avec la gestion d'un abonnement récurrent et te souvenir d'annuler quand tu n'en as plus besoin.",
    ],
    h2Choose: "Quand choisir CarCheckerVIN",
    chooseBullets: [
      { text: "Tu veux un rapport unique pour un seul achat de voiture sans t'engager dans un abonnement.", linkText: null, linkHref: null, after: null },
      { text: "Tu veux éviter les frais récurrents et l'anxiété d'annuler à temps qui vient avec les produits d'abonnement.", linkText: null, linkHref: null, after: null },
      { text: "Tu veux un décodage instantané gratuit sans compte ni essai — consulte notre ", linkText: "guide de vérification VIN gratuite", linkHref: "/guides/free-vin-check", after: "." },
      { text: "Tu veux l'option de passer à un pass illimité de 30 jours pour $24.99 qui expire simplement quand c'est fini.", linkText: null, linkHref: null, after: null },
    ],
    h2Bottom: "La conclusion",
    bottom1: "Bumper est un produit crédible dont la meilleure proposition est la surveillance continue pour les véhicules que tu possèdes déjà — quelque chose de vraiment précieux pour un petit sous-ensemble d'utilisateurs. Pour le groupe bien plus grand d'acheteurs qui veulent simplement un rapport complet sur une voiture qu'ils sont sur le point d'acheter, CarCheckerVIN livre des données comparables sans t'enfermer dans des frais mensuels récurrents.",
    bottom2Pre: "Vois comment nous nous comparons aux autres fournisseurs majeurs dans notre ",
    carfaxLink: "comparatif Carfax",
    bottom2Mid1: ", ",
    autoLink: "comparatif AutoCheck",
    bottom2Mid2: ", ",
    vinauditLink: "comparatif VinAudit",
    bottom2Mid3: " et ",
    clearvinLink: "comparatif ClearVin",
    bottom2End: ", ou lance un décodage gratuit maintenant depuis notre ",
    vinLink: "page de vérification VIN",
    bottom2Suffix: ".",
    faqHeading: "Questions fréquentes",
    ctaBottomHeading: "Essaie une alternative plus intelligente et moins chère",
    ctaBottomSub: "Entre un VIN de 17 caractères et vois à quoi ressemble un rapport à $14.99.",
  },
} as const;

const FAQS_EN = [
  { question: "What is the difference between CarCheckerVIN and Bumper?", answer: "The core difference is the pricing model. Bumper is subscription-first, charging roughly $19.99 per month for unlimited reports plus continuous monitoring of vehicles you own. CarCheckerVIN is pay-as-you-go: $14.99 for a single report with no recurring charges. Both pull vehicle data from the same backbone — NMVTIS, NICB, NHTSA, and state DMV feeds — so the underlying vehicle history is comparable." },
  { question: "Is Bumper a subscription service?", answer: "Yes. Bumper's consumer offering is built around a recurring monthly subscription, currently around $19.99 per month, that bundles unlimited reports and ongoing monitoring. New users typically see a low introductory price for the first week, which then rolls into the standard monthly rate unless cancelled. CarCheckerVIN, by contrast, has no auto-renewal on any tier." },
  { question: "Is CarCheckerVIN cheaper than Bumper?", answer: "For a single vehicle, yes. CarCheckerVIN charges $14.99 for one report with no subscription, while Bumper requires a monthly subscription of about $19.99. If you only need one report this year, you pay $14.99 once and you are done. A forgotten Bumper subscription can quietly cost $200 to $240 a year, so for one-time buyers CarCheckerVIN is the cheaper path." },
  { question: "Do CarCheckerVIN and Bumper use the same data sources?", answer: "Largely yes. Both services pull from the same backbone: NMVTIS, NICB, NHTSA, and state DMV feeds. Reports from each cover the same core categories — title brands, salvage and rebuilt checks, accident history, odometer timeline, stolen vehicle checks, open recalls, lemon and buyback flags, market value, and photos when available. Bumper adds people-search style add-ons; the vehicle data itself is functionally comparable." },
  { question: "Can I get a one-time report instead of a subscription?", answer: "With CarCheckerVIN, yes. It is intentionally pay-as-you-go: $14.99 for a single report, $35.99 for a three-pack, or $24.99 for a 30-day unlimited pass that simply expires on its own with no auto-renewal. Bumper does not offer an equivalent one-time report — its consumer model is built around an ongoing monthly subscription that you must remember to cancel." },
  { question: "Which is better value, CarCheckerVIN or Bumper?", answer: "It depends on your need. For the typical used-car buyer whose search lasts two to four weeks, CarCheckerVIN offers better value: comparable vehicle data for a one-time $14.99 report with no recurring charge. Bumper offers better value if you own multiple vehicles and want continuous monitoring with alerts, or will regularly use its people-search add-ons enough to justify the monthly fee." },
];

const FAQS_ES = [
  { question: "¿Cuál es la diferencia entre CarCheckerVIN y Bumper?", answer: "La diferencia central es el modelo de precio. Bumper es basado en suscripción, cobrando aproximadamente $19.99 al mes por reportes ilimitados más monitoreo continuo de vehículos que posees. CarCheckerVIN es pago por uso: $14.99 por un reporte único sin cargos recurrentes. Ambos extraen datos del vehículo del mismo backbone — feeds de NMVTIS, NICB, NHTSA y DMV estatales — así que el historial vehicular subyacente es comparable." },
  { question: "¿Bumper es un servicio de suscripción?", answer: "Sí. La oferta de consumidor de Bumper está construida alrededor de una suscripción mensual recurrente, actualmente alrededor de $19.99 al mes, que agrupa reportes ilimitados y monitoreo continuo. Los nuevos usuarios típicamente ven un precio introductorio bajo durante la primera semana, que luego pasa a la tarifa mensual estándar a menos que se cancele. CarCheckerVIN, por contraste, no tiene auto-renovación en ningún nivel." },
  { question: "¿CarCheckerVIN es más barato que Bumper?", answer: "Para un solo vehículo, sí. CarCheckerVIN cobra $14.99 por un reporte sin suscripción, mientras Bumper requiere una suscripción mensual de aproximadamente $19.99. Si solo necesitas un reporte este año, pagas $14.99 una vez y listo. Una suscripción olvidada de Bumper puede costar silenciosamente $200 a $240 al año, así que para compradores únicos CarCheckerVIN es el camino más barato." },
  { question: "¿CarCheckerVIN y Bumper usan las mismas fuentes de datos?", answer: "En gran parte sí. Ambos servicios extraen del mismo backbone: feeds de NMVTIS, NICB, NHTSA y DMV estatales. Los reportes de cada uno cubren las mismas categorías clave — marcas de título, verificaciones de salvamento y reconstruido, historial de accidentes, línea de tiempo de odómetro, verificaciones de vehículos robados, recalls abiertos, indicadores de limón y recompra, valor de mercado y fotos cuando están disponibles. Bumper agrega complementos de estilo búsqueda de personas; los datos del vehículo en sí son funcionalmente comparables." },
  { question: "¿Puedo obtener un reporte único en lugar de una suscripción?", answer: "Con CarCheckerVIN, sí. Es intencionalmente pago por uso: $14.99 por un reporte único, $35.99 por un paquete de tres, o $24.99 por un pase ilimitado de 30 días que simplemente expira por sí solo sin auto-renovación. Bumper no ofrece un reporte único equivalente — su modelo de consumidor está construido alrededor de una suscripción mensual continua que debes recordar cancelar." },
  { question: "¿Cuál tiene mejor valor, CarCheckerVIN o Bumper?", answer: "Depende de tu necesidad. Para el comprador típico de auto usado cuya búsqueda dura de dos a cuatro semanas, CarCheckerVIN ofrece mejor valor: datos vehiculares comparables por un reporte único de $14.99 sin cargo recurrente. Bumper ofrece mejor valor si posees múltiples vehículos y quieres monitoreo continuo con alertas, o usarás sus complementos de búsqueda de personas regularmente lo suficiente para justificar la tarifa mensual." },
];

interface Props { locale: Locale; }

export default function VinCheckVsBumperBody({ locale }: Props) {
  const c = COPY[locale];
  const faqs = locale === "es" ? FAQS_ES : FAQS_EN;
  const link = (en: string) => (locale === "es" ? `/es${en}` : en);

  return (
    <>
      <article className="pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: c.home, href: locale === "es" ? "/es" : "/" }, { label: c.crumb }]} />
          <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">{c.h1}</h1>
          <p className="mt-4 text-lg text-slate-700 leading-relaxed">{c.intro}</p>

          <div className="mt-8 p-6 bg-primary-50 rounded-2xl border border-primary-100">
            <h2 className="text-lg font-bold text-slate-900 mb-3">{c.ctaTopHeading}</h2>
            <VinSearchForm size="sm" />
          </div>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">{c.h2Compare}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.compareIntro}</p>
          <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-700">
                <tr>
                  <th className="px-4 py-3 font-semibold">{c.thFeature}</th>
                  <th className="px-4 py-3 font-semibold text-center">{c.thUs}</th>
                  <th className="px-4 py-3 font-semibold text-center">{c.thThem}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {c.rows.map(({ feature, us, them }) => (
                  <tr key={feature} className="hover:bg-slate-50/50">
                    <td className="px-4 py-3 text-slate-900">{feature}</td>
                    <td className="px-4 py-3 text-center">
                      {typeof us === "string" ? <span className="font-semibold text-slate-900">{us}</span> : us ? <Check className="w-5 h-5 text-emerald-500 mx-auto" /> : <X className="w-5 h-5 text-slate-500 mx-auto" />}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {typeof them === "string" ? <span className="font-semibold text-slate-900">{them}</span> : them ? <Check className="w-5 h-5 text-emerald-500 mx-auto" /> : <X className="w-5 h-5 text-slate-500 mx-auto" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-slate-700">{c.pricingNote}</p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">{c.h2Price}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.price1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.price2}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.price3}</p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">{c.h2Monitor}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.m1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.m2}</p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">{c.h2Data}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            {c.d1Pre}
            <Link href={link("/salvage-title-check")} className="text-primary-600 hover:underline font-medium">{c.salvageLink}</Link>
            {c.d1Mid1}
            <Link href={link("/accident-history-check")} className="text-primary-600 hover:underline font-medium">{c.accidentLink}</Link>
            {c.d1Mid2}
            <Link href={link("/odometer-check")} className="text-primary-600 hover:underline font-medium">{c.odoLink}</Link>
            {c.d1Mid3}
            <Link href={link("/stolen-vehicle-check")} className="text-primary-600 hover:underline font-medium">{c.stolenLink}</Link>
            {c.d1Suffix}
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.d2}</p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">{c.h2Trap}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.trap1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.trap2}</p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">{c.h2When}</h2>
          <ul className="mt-4 space-y-2 text-slate-600">
            {c.whenBullets.map((b) => (
              <li key={b} className="flex gap-2 items-start">
                <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">{c.h2Choose}</h2>
          <ul className="mt-4 space-y-2 text-slate-600">
            {c.chooseBullets.map((b) => (
              <li key={b.text} className="flex gap-2 items-start">
                <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>
                  {b.text}
                  {b.linkText && b.linkHref && (
                    <Link href={link(b.linkHref)} className="text-primary-600 hover:underline font-medium">{b.linkText}</Link>
                  )}
                  {b.after}
                </span>
              </li>
            ))}
          </ul>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">{c.h2Bottom}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.bottom1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            {c.bottom2Pre}
            <Link href={link("/vin-check-vs-carfax")} className="text-primary-600 hover:underline font-medium">{c.carfaxLink}</Link>
            {c.bottom2Mid1}
            <Link href={link("/vin-check-vs-autocheck")} className="text-primary-600 hover:underline font-medium">{c.autoLink}</Link>
            {c.bottom2Mid2}
            <Link href={link("/vin-check-vs-vinaudit")} className="text-primary-600 hover:underline font-medium">{c.vinauditLink}</Link>
            {c.bottom2Mid3}
            <Link href={link("/vin-check-vs-clearvin")} className="text-primary-600 hover:underline font-medium">{c.clearvinLink}</Link>
            {c.bottom2End}
            <Link href={link("/vin-check")} className="text-primary-600 hover:underline font-medium">{c.vinLink}</Link>
            {c.bottom2Suffix}
          </p>
        </div>
      </article>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <h2 className="text-2xl font-bold text-slate-900">{c.faqHeading}</h2>
        <div className="mt-6 space-y-3">
          {faqs.map((faq) => (
            <details key={faq.question} className="group rounded-xl border border-slate-200 bg-white p-5 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-4 list-none">
                <h3 className="text-base sm:text-lg font-semibold text-slate-900 m-0">{faq.question}</h3>
                <span className="text-2xl text-primary-600 transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-slate-600 leading-relaxed">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-4">
        <RelatedChecks exclude="" />
      </div>

      <section className="py-14 bg-slate-50">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">{c.ctaBottomHeading}</h2>
          <p className="text-slate-700 mb-6">{c.ctaBottomSub}</p>
          <VinSearchForm size="sm" />
        </div>
      </section>
    </>
  );
}

export { FAQS_EN, FAQS_ES, FAQS_FR };

// Wave 19 — French uses the Spanish FAQ array as a structural fallback.
// The user-visible FAQ component already uses the locale="fr" branch in COPY;
// this alias only feeds the JSON-LD FAQPage schema until /fr metadata is translated.
const FAQS_FR = FAQS_ES;
