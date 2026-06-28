/**
 * Shared body for /vehicle-lien-check and /es/vehicle-lien-check.
 * Wave 18 batch 3 — full English layout in both locales via COPY={en,es}.
 */

import Link from "next/link";
import {
  Check, Shield, Search, FileText, Database, ChevronRight,
  Lock, Zap, BadgeCheck, Sparkles, AlertTriangle, Banknote,
  Wrench, Warehouse, Landmark, Gavel, Car, Eye, HandCoins,
  ClipboardCheck, XCircle,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import VinCheckBanner from "@/components/VinCheckBanner";
import RelatedChecks from "@/components/RelatedChecks";
import type { Locale } from "@/i18n/config";

const HOW_ICONS = [Search, Database, FileText] as const;
const LIEN_ICONS = [Banknote, Wrench, Warehouse, Landmark, Gavel, Car] as const;
const PROTECT_ICONS = [HandCoins, FileText, Landmark, XCircle] as const;
const WHY_ICONS = [Banknote, ClipboardCheck, BadgeCheck] as const;

const COPY = {
  en: {
    home: "Home", crumb: "Vehicle Lien Check",
    badge: "Hidden-Loan Lookup   ·   NMVTIS-Backed",
    h1Lead: "Free Vehicle Lien Check by VIN — ",
    h1Accent: "Do You Really Own It?",
    intro: "Buying a used car with an undisclosed lien means you don't own it — the lender does, and they can repossess it from your driveway whenever they want. Enter a 17-character VIN to surface hidden loans, repossession records, and sale history in seconds — free, so you never inherit somebody else's debt.",
    formHeading: "Run a Free Vehicle Lien Check",
    formSub: "Enter any 17-character VIN — we'll surface any active or historical lien and the lien holder on record",
    formNote: "Free · No sign-up · Instant result",
    trustStats: [
      { icon: Database, value: "NMVTIS", label: "+ DMV feeds" },
      { icon: Banknote, value: "Lien holder", label: "& status" },
      { icon: Car, value: "Repo", label: "history" },
      { icon: Zap, value: "Free", label: "no sign-up" },
    ],
    h2How: "How a VIN Lien Check Works",
    howIntro: "A lien is recorded against the VIN, not the paper title. Three steps turn scattered DMV and lender records into a clear answer on whether the car is truly free to sell.",
    howSteps: [
      { tag: "Step 1", title: "Enter the VIN", body: "Type the 17-character VIN from the dashboard, door jamb, or title. A lien attaches to the VIN — not to whatever piece of paper the seller hands you." },
      { tag: "Step 2", title: "We query DMV + lender registries", body: "The lookup cross-references NMVTIS, all 50 state DMV title-brand feeds, UCC-1 commercial filings, and reported lender registries into one lien picture." },
      { tag: "Step 3", title: "See holder, type, and status", body: "The report shows the lien holder, the lien type, the filing date, and whether it's active or released. An active lien blocks the title transfer until it's paid." },
    ],
    h2What: "What Is a Vehicle Lien — and Why It Follows the Car",
    what1Pre: "A vehicle lien is a lender's legal claim against a specific car that secures the right to ",
    what1Bold: "repossess",
    what1Suffix: " it if a debt isn't paid. The lien attaches to the VIN and the title — not to the borrower personally — so it travels with the car through every ownership change until it's formally satisfied and released.",
    what2: "Most liens come from auto loans, but a car can also carry a mechanic's lien, a storage lien, an IRS or state tax lien, or a judgment lien. Any one of them is enough to block a clean title transfer at the DMV.",
    what3Pre: "The key point: the seller's paper title may read \u201Cclean\u201D or stay silent, but the underlying DMV record still shows the encumbrance. That's why a ",
    what3Bold: "VIN-based",
    what3Suffix: " lien check beats reading the title document.",
    risksCardTitle: "Three ways skipping it goes wrong",
    risksItems: [
      { bold: "You inherit the debt.", body: " Seller vanishes, lender repos, no refund." },
      { bold: "You can't title it.", body: " The DMV blocks transfer until the lien is released." },
      { bold: "Repo years later.", body: " An old unreleased lien can surface long after you buy." },
    ],
    h2LienTypes: "The Six Lien Types We Surface",
    lienTypesIntro: "A \u201Clien\u201D is not just an auto loan. Six common types show up on used-vehicle titles — any one can block your purchase.",
    lienTypes: [
      { title: "Auto loan liens", body: "The most common. Filed by banks, credit unions, and dealer-finance arms — stay on the title until the loan is paid and a release is filed." },
      { title: "Mechanic's liens", body: "Filed by a repair shop when an owner refuses to pay for completed work. The shop can hold and eventually sell the car." },
      { title: "Storage liens", body: "Filed by tow yards, parking facilities, or impound lots over unpaid fees — common on cars impounded after an accident or police hold." },
      { title: "Tax liens", body: "Filed by the IRS or a state against any property the debtor owns, including the vehicle. Federal tax liens are particularly aggressive." },
      { title: "Judgment liens", body: "The result of a civil lawsuit where a court orders payment. The creditor can attach the judgment to the debtor's vehicle title." },
      { title: "Repossession records", body: "Not technically a lien, but a critical companion record showing whether the car was previously repossessed and re-sold." },
    ],
    midCtaHeading: "Does This Car Carry a Hidden Lien?",
    midCtaSub: "Don't rely on the paper title — it can look clean over an active loan. Run the VIN to see the lien holder and status, free, in seconds.",
    h2Compare: "Free vs. Paid — What You Actually Need",
    compareIntro: "For a private-party purchase, you don't need to spend $44.99. Here's where each option fits.",
    freeTag: "CarCheckerVIN", freeTitle: "Free",
    freeBullets: ["NMVTIS-fed lien status and lien holder.", "Repossession history included.", "Instant, no sign-up — the right first step."],
    dmvTag: "State DMV search", dmvTitle: "$5–$25",
    dmvBullets: ["Official certified record.", "Often slow — mail-in or in-person.", "One state's coverage at a time."],
    paidTag: "Carfax / AutoCheck", paidTitle: "$24.99–$44.99",
    paidBullets: ["Full history: accidents and service.", "Lien data is the same NMVTIS feed we use.", "Overkill just to confirm a lien."],
    compareNoteBoldLead: "Just confirming a lien?",
    compareNoteMid: " Our free check is enough. If you want the full history bundle, see our ",
    compareNoteLink: "CarCheckerVIN vs Carfax",
    compareNoteSuffix: " comparison.",
    h2RedFlags: "Red Flags That Suggest a Hidden Lien",
    redFlags1: "Before you even run the VIN, certain seller behaviors point strongly to an undisclosed lien. Any one of these is reason to slow down and verify the VIN yourself.",
    redFlags2Pre: "Lien disclosure rules vary — ",
    redFlags2Bold: "roughly 13 states require explicit disclosure",
    redFlags2Suffix: " on private-party sales, and the rest are buyer-beware. Even in disclosure states, the legal remedy arrives long after the damage is done. Treat every private-party sale as no-disclosure: assume nothing, verify the VIN.",
    redFlagsCardCta: "Run the VIN before you hand over a dollar:",
    redFlagsCardTitle: "Hidden-lien warning signs",
    redFlags: [
      "Title says \"Original\" but the seller can't produce a physical title",
      "Title lists a lienholder — \"it's paid off\" means nothing without a release",
      "Cash only; refuses cashier's checks, escrow, or traceable payment",
      "Wants to \"just sign the title over\" or has only a duplicate or bill of sale",
      "Asking price far below market with no clear, verifiable explanation",
      "Urgent sale — \"moving overseas tomorrow,\" pressure to skip paperwork",
    ],
    h2Protect: "What to Do If You Find a Lien",
    protectIntro: "An active lien isn't automatically a deal-breaker — but it absolutely changes how you close. Pick the option that matches your risk tolerance.",
    protect: [
      { title: "Use an escrow service", body: "Escrow holds your funds, pays the loan payoff to the lender directly, and releases the rest to the seller only after release is confirmed. Costs $50–$500 and removes almost all the risk." },
      { title: "Get a lien payoff letter", body: "Have the seller request a 10-day payoff letter stating the exact balance. It proves the lien is real and gives you a fixed number to negotiate against." },
      { title: "Close at the lender", body: "Meet at the lender's office, pay the lender directly, and walk out with a lien release in hand and the title ready to sign over to you." },
      { title: "Walk away", body: "If the seller can't or won't cooperate with any of the above, the deal isn't worth it. There are always more cars." },
    ],
    h2Why: "Why a Lien Check Matters Before You Buy",
    whyIntro: "A lien tied to the VIN decides whether you can legally own and register the car at all — and whether your money is safe.",
    whyCards: [
      { title: "Protect your money", body: "Buy over an active lien and the lender can repossess the car you paid for — with no refund and the seller long gone." },
      { title: "Protect your title", body: "An unreleased lien blocks DMV transfer. Confirming release status first means you can actually register and insure the car." },
      { title: "Verify, don't trust", body: "A clean-looking paper title can hide an active loan. The VIN-tied DMV record — not the seller's word — is the only reliable proof." },
    ],
    h2Internal: "More VIN Checks That Pair With a Lien Check",
    internalIntro: "A lien is one piece of the puzzle. These checks complete the pre-purchase picture before you buy.",
    internalLinks: [
      { href: "/stolen-vehicle-check", label: "Stolen Vehicle Check", desc: "A seller hiding a lien may be hiding stolen status too — verify both by VIN." },
      { href: "/salvage-title-check", label: "Salvage Title Check", desc: "Liens and branded titles both block a clean transfer — check the title history." },
      { href: "/total-loss-check", label: "Total Loss Check", desc: "An insurer write-off often travels with repo and lien complications." },
      { href: "/vin-check-vs-carfax", label: "CarCheckerVIN vs Carfax", desc: "See how our free lien data compares to the paid full-history bundles." },
      { href: "/vin-check", label: "Full VIN History Check", desc: "Liens, title brands, accidents, odometer, and theft in one complete report." },
      { href: "/vin-decoder", label: "VIN Decoder", desc: "Decode the 17-character VIN to specs, trim, and factory build details." },
    ],
    h2Faq: "Vehicle Lien Check — Frequently Asked Questions",
    faqIntro: "The questions buyers ask most about liens, lien holders, and closing safely.",
    bottomBadge: "Free · Instant · NMVTIS-Backed",
    ctaBottomHeading: "Run Your Free Lien Check Now",
    ctaBottomSub: "Two minutes today saves you a lifetime of someone else's debt. Enter the VIN and see every recorded lien, lien holder, and repo on file instantly.",
    ctaBottomNoteA: "NMVTIS-backed data",
    ctaBottomNoteB: "No sign-up · Free",
  },
  es: {
    home: "Inicio", crumb: "Verificación de gravamen vehicular",
    badge: "Búsqueda de préstamos ocultos   ·   Respaldado por NMVTIS",
    h1Lead: "Verificación gratis de gravamen vehicular por VIN — ",
    h1Accent: "¿Realmente lo posees?",
    intro: "Comprar un auto usado con un gravamen no divulgado significa que no lo posees — el prestamista sí, y puede recuperarlo de tu cochera cuando quiera. Ingresa un VIN de 17 caracteres para mostrar préstamos ocultos, registros de recuperación e historial de venta en segundos — gratis, para que nunca heredes la deuda de otra persona.",
    formHeading: "Haz una verificación gratis de gravamen vehicular",
    formSub: "Ingresa cualquier VIN de 17 caracteres — mostraremos cualquier gravamen activo o histórico y el titular del gravamen en archivo",
    formNote: "Gratis · Sin registro · Resultado instantáneo",
    trustStats: [
      { icon: Database, value: "NMVTIS", label: "+ feeds DMV" },
      { icon: Banknote, value: "Titular", label: "y estado" },
      { icon: Car, value: "Recuperación", label: "historial" },
      { icon: Zap, value: "Gratis", label: "sin registro" },
    ],
    h2How: "Cómo funciona una verificación VIN de gravamen",
    howIntro: "Un gravamen se registra contra el VIN, no contra el título físico. Tres pasos convierten registros dispersos del DMV y prestamistas en una respuesta clara sobre si el auto realmente está libre para vender.",
    howSteps: [
      { tag: "Paso 1", title: "Ingresa el VIN", body: "Escribe el VIN de 17 caracteres del tablero, marco de la puerta o título. Un gravamen se adhiere al VIN — no al papel que te entrega el vendedor." },
      { tag: "Paso 2", title: "Consultamos DMV + registros de prestamistas", body: "La búsqueda cruza NMVTIS, los feeds de marca de título de los 50 DMV estatales, presentaciones UCC-1 comerciales y registros reportados de prestamistas en una sola imagen del gravamen." },
      { tag: "Paso 3", title: "Ve titular, tipo y estado", body: "El reporte muestra el titular del gravamen, el tipo de gravamen, la fecha de presentación y si está activo o liberado. Un gravamen activo bloquea la transferencia del título hasta que se pague." },
    ],
    h2What: "Qué es un gravamen vehicular — y por qué sigue al auto",
    what1Pre: "Un gravamen vehicular es el reclamo legal de un prestamista contra un auto específico que asegura el derecho a ",
    what1Bold: "recuperarlo",
    what1Suffix: " si una deuda no se paga. El gravamen se adhiere al VIN y al título — no al prestatario personalmente — así que viaja con el auto a través de cada cambio de propiedad hasta que se satisface y libera formalmente.",
    what2: "La mayoría de los gravámenes provienen de préstamos para autos, pero un auto también puede llevar un gravamen mecánico, un gravamen de almacenamiento, un gravamen fiscal del IRS o estatal, o un gravamen de sentencia. Cualquiera de ellos basta para bloquear una transferencia limpia del título en el DMV.",
    what3Pre: "El punto clave: el título físico del vendedor puede decir \u201Climpio\u201D o quedarse en silencio, pero el registro subyacente del DMV todavía muestra la carga. Por eso una verificación de gravamen ",
    what3Bold: "basada en VIN",
    what3Suffix: " supera leer el documento del título.",
    risksCardTitle: "Tres formas en que omitirla sale mal",
    risksItems: [
      { bold: "Heredas la deuda.", body: " El vendedor desaparece, el prestamista recupera, sin reembolso." },
      { bold: "No puedes titularlo.", body: " El DMV bloquea la transferencia hasta que se libere el gravamen." },
      { bold: "Recuperación años después.", body: " Un gravamen viejo no liberado puede surgir mucho después de que compras." },
    ],
    h2LienTypes: "Los seis tipos de gravamen que mostramos",
    lienTypesIntro: "Un \u201Cgravamen\u201D no es solo un préstamo para auto. Seis tipos comunes aparecen en títulos de vehículos usados — cualquiera puede bloquear tu compra.",
    lienTypes: [
      { title: "Gravámenes de préstamo para auto", body: "Los más comunes. Presentados por bancos, cooperativas de crédito y brazos de financiamiento de concesionarios — permanecen en el título hasta que se paga el préstamo y se presenta una liberación." },
      { title: "Gravámenes mecánicos", body: "Presentados por un taller cuando un propietario se niega a pagar por el trabajo completado. El taller puede retener y eventualmente vender el auto." },
      { title: "Gravámenes de almacenamiento", body: "Presentados por patios de remolque, estacionamientos o corralones por tarifas no pagadas — comunes en autos incautados después de un accidente o retención policial." },
      { title: "Gravámenes fiscales", body: "Presentados por el IRS o un estado contra cualquier propiedad que posea el deudor, incluyendo el vehículo. Los gravámenes fiscales federales son particularmente agresivos." },
      { title: "Gravámenes de sentencia", body: "El resultado de una demanda civil donde un tribunal ordena el pago. El acreedor puede adjuntar la sentencia al título del vehículo del deudor." },
      { title: "Registros de recuperación", body: "No es técnicamente un gravamen, pero es un registro complementario crítico que muestra si el auto fue previamente recuperado y revendido." },
    ],
    midCtaHeading: "¿Este auto lleva un gravamen oculto?",
    midCtaSub: "No te bases en el título físico — puede verse limpio sobre un préstamo activo. Ejecuta el VIN para ver el titular del gravamen y su estado, gratis, en segundos.",
    h2Compare: "Gratis vs. pagado — Qué realmente necesitas",
    compareIntro: "Para una compra entre particulares, no necesitas gastar $44.99. Aquí está dónde encaja cada opción.",
    freeTag: "CarCheckerVIN", freeTitle: "Gratis",
    freeBullets: ["Estado del gravamen y titular alimentado por NMVTIS.", "Historial de recuperación incluido.", "Instantáneo, sin registro — el primer paso correcto."],
    dmvTag: "Búsqueda en DMV estatal", dmvTitle: "$5–$25",
    dmvBullets: ["Registro oficial certificado.", "A menudo lento — por correo o en persona.", "Cobertura de un estado a la vez."],
    paidTag: "Carfax / AutoCheck", paidTitle: "$24.99–$44.99",
    paidBullets: ["Historial completo: accidentes y servicio.", "Los datos del gravamen son del mismo feed NMVTIS que usamos.", "Excesivo solo para confirmar un gravamen."],
    compareNoteBoldLead: "¿Solo confirmando un gravamen?",
    compareNoteMid: " Nuestra verificación gratis es suficiente. Si quieres el paquete completo del historial, mira nuestra comparación ",
    compareNoteLink: "CarCheckerVIN vs Carfax",
    compareNoteSuffix: ".",
    h2RedFlags: "Banderas rojas que sugieren un gravamen oculto",
    redFlags1: "Antes de incluso ejecutar el VIN, ciertas conductas del vendedor apuntan fuertemente a un gravamen no divulgado. Cualquiera de estas es razón para frenar y verificar el VIN tú mismo.",
    redFlags2Pre: "Las reglas de divulgación de gravámenes varían — ",
    redFlags2Bold: "aproximadamente 13 estados requieren divulgación explícita",
    redFlags2Suffix: " en ventas entre particulares, y el resto son de comprador-precavido. Incluso en estados con divulgación, el remedio legal llega mucho después de que el daño está hecho. Trata cada venta entre particulares como sin-divulgación: no asumas nada, verifica el VIN.",
    redFlagsCardCta: "Ejecuta el VIN antes de entregar un dólar:",
    redFlagsCardTitle: "Señales de advertencia de gravamen oculto",
    redFlags: [
      "El título dice \"Original\" pero el vendedor no puede producir un título físico",
      "El título lista un titular de gravamen — \"está pagado\" no significa nada sin una liberación",
      "Solo efectivo; rechaza cheques de caja, depósito en garantía o pago rastreable",
      "Quiere \"solo firmarte el título\" o solo tiene un duplicado o factura de venta",
      "Precio muy por debajo del mercado sin explicación clara y verificable",
      "Venta urgente — \"me mudo al extranjero mañana\", presión para saltarse el papeleo",
    ],
    h2Protect: "Qué hacer si encuentras un gravamen",
    protectIntro: "Un gravamen activo no es automáticamente un rompe-tratos — pero absolutamente cambia cómo cierras. Elige la opción que coincida con tu tolerancia al riesgo.",
    protect: [
      { title: "Usa un servicio de depósito en garantía", body: "El depósito en garantía retiene tus fondos, paga la liquidación del préstamo directamente al prestamista y libera el resto al vendedor solo después de que se confirme la liberación. Cuesta $50–$500 y elimina casi todo el riesgo." },
      { title: "Obtén una carta de pago final del gravamen", body: "Pide al vendedor que solicite una carta de pago final de 10 días que indique el saldo exacto. Demuestra que el gravamen es real y te da un número fijo contra el cual negociar." },
      { title: "Cierra en el prestamista", body: "Reúnete en la oficina del prestamista, paga directamente al prestamista y sal con una liberación de gravamen en mano y el título listo para firmártelo." },
      { title: "Aléjate", body: "Si el vendedor no puede o no quiere cooperar con ninguno de los anteriores, el trato no vale la pena. Siempre hay más autos." },
    ],
    h2Why: "Por qué una verificación de gravamen importa antes de comprar",
    whyIntro: "Un gravamen vinculado al VIN decide si puedes legalmente poseer y registrar el auto en absoluto — y si tu dinero está seguro.",
    whyCards: [
      { title: "Protege tu dinero", body: "Compra sobre un gravamen activo y el prestamista puede recuperar el auto por el que pagaste — sin reembolso y con el vendedor desaparecido hace tiempo." },
      { title: "Protege tu título", body: "Un gravamen no liberado bloquea la transferencia en el DMV. Confirmar el estado de liberación primero significa que realmente puedes registrar y asegurar el auto." },
      { title: "Verifica, no confíes", body: "Un título físico de apariencia limpia puede ocultar un préstamo activo. El registro DMV vinculado al VIN — no la palabra del vendedor — es la única prueba confiable." },
    ],
    h2Internal: "Más verificaciones VIN que se combinan con una verificación de gravamen",
    internalIntro: "Un gravamen es una pieza del rompecabezas. Estas verificaciones completan la imagen previa a la compra antes de comprar.",
    internalLinks: [
      { href: "/stolen-vehicle-check", label: "Verificación de vehículo robado", desc: "Un vendedor que oculta un gravamen también puede ocultar estado de robo — verifica ambos por VIN." },
      { href: "/salvage-title-check", label: "Verificación título salvamento", desc: "Los gravámenes y títulos marcados ambos bloquean una transferencia limpia — verifica el historial del título." },
      { href: "/total-loss-check", label: "Verificación pérdida total", desc: "Una pérdida total de aseguradora a menudo viaja con complicaciones de recuperación y gravamen." },
      { href: "/vin-check-vs-carfax", label: "CarCheckerVIN vs Carfax", desc: "Mira cómo nuestros datos gratis de gravamen se comparan con los paquetes pagados de historial completo." },
      { href: "/vin-check", label: "Verificación completa de historial VIN", desc: "Gravámenes, marcas de título, accidentes, odómetro y robo en un reporte completo." },
      { href: "/vin-decoder", label: "Decodificador VIN", desc: "Decodifica el VIN de 17 caracteres a especificaciones, versión y detalles de fabricación." },
    ],
    h2Faq: "Verificación de gravamen vehicular — Preguntas frecuentes",
    faqIntro: "Las preguntas que más hacen los compradores sobre gravámenes, titulares de gravamen y cierre seguro.",
    bottomBadge: "Gratis · Instantáneo · Respaldado por NMVTIS",
    ctaBottomHeading: "Haz tu verificación gratis de gravamen ahora",
    ctaBottomSub: "Dos minutos hoy te ahorran toda una vida de la deuda de otra persona. Ingresa el VIN y ve cada gravamen registrado, titular del gravamen y recuperación en archivo al instante.",
    ctaBottomNoteA: "Datos respaldados por NMVTIS",
    ctaBottomNoteB: "Sin registro · Gratis",
  },
  fr: {
    home: "Accueil", crumb: "Vérification de privilège véhiculaire",
    badge: "Recherche de prêt caché   ·   Adossée NMVTIS",
    h1Lead: "Vérification gratuite de privilège véhiculaire par VIN — ",
    h1Accent: "Est-ce vraiment toi qui le possèdes ?",
    intro: "Acheter une voiture d'occasion avec un privilège non divulgué signifie que tu ne la possèdes pas — le prêteur si, et il peut la saisir dans ton allée quand il le veut. Saisis un VIN de 17 caractères pour faire remonter les prêts cachés, les enregistrements de saisie et l'historique de vente en quelques secondes — gratuit, pour que tu n'hérites jamais de la dette de quelqu'un d'autre.",
    formHeading: "Effectue une vérification gratuite de privilège véhiculaire",
    formSub: "Saisis n'importe quel VIN de 17 caractères — nous ferons remonter tout privilège actif ou historique et le titulaire du privilège au dossier",
    formNote: "Gratuit · Sans inscription · Résultat instantané",
    trustStats: [
      { icon: Database, value: "NMVTIS", label: "+ flux DMV" },
      { icon: Banknote, value: "Titulaire", label: "et statut" },
      { icon: Car, value: "Saisie", label: "historique" },
      { icon: Zap, value: "Gratuit", label: "sans inscription" },
    ],
    h2How: "Comment fonctionne une vérification VIN de privilège",
    howIntro: "Un privilège est enregistré contre le VIN, pas contre le titre papier. Trois étapes transforment des registres DMV et prêteurs dispersés en une réponse claire sur si la voiture est vraiment libre à vendre.",
    howSteps: [
      { tag: "Étape 1", title: "Saisis le VIN", body: "Tape le VIN de 17 caractères du tableau de bord, du montant de porte ou du titre. Un privilège se rattache au VIN — pas à n'importe quel papier que le vendeur te tend." },
      { tag: "Étape 2", title: "Nous interrogeons DMV + registres de prêteurs", body: "La recherche croise NMVTIS, tous les flux de marque de titre des 50 DMV d'État, les dépôts commerciaux UCC-1 et les registres de prêteurs déclarés en une seule image du privilège." },
      { tag: "Étape 3", title: "Vois titulaire, type et statut", body: "Le rapport montre le titulaire du privilège, le type de privilège, la date de dépôt et s'il est actif ou levé. Un privilège actif bloque le transfert de titre jusqu'à ce qu'il soit payé." },
    ],
    h2What: "Qu'est-ce qu'un privilège véhiculaire — et pourquoi il suit la voiture",
    what1Pre: "Un privilège véhiculaire est la créance légale d'un prêteur contre une voiture spécifique qui garantit le droit de la ",
    what1Bold: "saisir",
    what1Suffix: " si une dette n'est pas payée. Le privilège se rattache au VIN et au titre — pas à l'emprunteur personnellement — donc il voyage avec la voiture à travers chaque changement de propriété jusqu'à ce qu'il soit formellement satisfait et levé.",
    what2: "La plupart des privilèges proviennent de prêts auto, mais une voiture peut aussi porter un privilège de mécanicien, un privilège d'entreposage, un privilège fiscal de l'IRS ou d'État, ou un privilège de jugement. L'un d'entre eux suffit à bloquer un transfert de titre propre au DMV.",
    what3Pre: "Le point clé : le titre papier du vendeur peut indiquer « propre » ou rester silencieux, mais le registre DMV sous-jacent montre toujours la charge. C'est pourquoi une vérification de privilège ",
    what3Bold: "basée sur le VIN",
    what3Suffix: " bat la lecture du document de titre.",
    risksCardTitle: "Trois façons dont l'omettre tourne mal",
    risksItems: [
      { bold: "Tu hérites de la dette.", body: " Le vendeur disparaît, le prêteur saisit, pas de remboursement." },
      { bold: "Tu ne peux pas l'immatriculer.", body: " Le DMV bloque le transfert jusqu'à ce que le privilège soit levé." },
      { bold: "Saisie des années plus tard.", body: " Un vieux privilège non levé peut surgir longtemps après ton achat." },
    ],
    h2LienTypes: "Les six types de privilèges que nous faisons remonter",
    lienTypesIntro: "Un « privilège » n'est pas juste un prêt auto. Six types courants apparaissent sur les titres de véhicules d'occasion — chacun peut bloquer ton achat.",
    lienTypes: [
      { title: "Privilèges de prêt auto", body: "Les plus courants. Déposés par les banques, coopératives de crédit et bras de financement de concessionnaires — restent sur le titre jusqu'à ce que le prêt soit payé et qu'une mainlevée soit déposée." },
      { title: "Privilèges de mécanicien", body: "Déposés par un atelier de réparation lorsqu'un propriétaire refuse de payer pour un travail terminé. L'atelier peut retenir et éventuellement vendre la voiture." },
      { title: "Privilèges d'entreposage", body: "Déposés par les fourrières, parkings ou dépanneuses pour frais impayés — courants sur les voitures mises en fourrière après un accident ou une retenue policière." },
      { title: "Privilèges fiscaux", body: "Déposés par l'IRS ou un État contre tout bien que possède le débiteur, y compris le véhicule. Les privilèges fiscaux fédéraux sont particulièrement agressifs." },
      { title: "Privilèges de jugement", body: "Le résultat d'une poursuite civile où un tribunal ordonne un paiement. Le créancier peut attacher le jugement au titre du véhicule du débiteur." },
      { title: "Enregistrements de saisie", body: "Pas techniquement un privilège, mais un registre complémentaire critique montrant si la voiture a été précédemment saisie et revendue." },
    ],
    midCtaHeading: "Cette voiture porte-t-elle un privilège caché ?",
    midCtaSub: "Ne te fie pas au titre papier — il peut paraître propre sur un prêt actif. Lance le VIN pour voir le titulaire du privilège et son statut, gratuit, en quelques secondes.",
    h2Compare: "Gratuit vs. payant — Ce dont tu as vraiment besoin",
    compareIntro: "Pour un achat entre particuliers, tu n'as pas besoin de dépenser $44.99. Voici où chaque option s'inscrit.",
    freeTag: "CarCheckerVIN", freeTitle: "Gratuit",
    freeBullets: ["Statut de privilège et titulaire alimentés par NMVTIS.", "Historique de saisie inclus.", "Instantané, sans inscription — la bonne première étape."],
    dmvTag: "Recherche DMV d'État", dmvTitle: "$5–$25",
    dmvBullets: ["Registre officiel certifié.", "Souvent lent — par courrier ou en personne.", "Couverture d'un seul État à la fois."],
    paidTag: "Carfax / AutoCheck", paidTitle: "$24.99–$44.99",
    paidBullets: ["Historique complet : accidents et entretien.", "Les données de privilège viennent du même flux NMVTIS que nous utilisons.", "Excessif juste pour confirmer un privilège."],
    compareNoteBoldLead: "Tu confirmes juste un privilège ?",
    compareNoteMid: " Notre vérification gratuite suffit. Si tu veux le package complet d'historique, vois notre comparaison ",
    compareNoteLink: "CarCheckerVIN vs Carfax",
    compareNoteSuffix: ".",
    h2RedFlags: "Signaux d'alerte qui suggèrent un privilège caché",
    redFlags1: "Avant même de lancer le VIN, certains comportements du vendeur pointent fortement vers un privilège non divulgué. L'un d'eux est une raison de ralentir et de vérifier le VIN toi-même.",
    redFlags2Pre: "Les règles de divulgation des privilèges varient — ",
    redFlags2Bold: "environ 13 États exigent une divulgation explicite",
    redFlags2Suffix: " sur les ventes entre particuliers, et le reste est acheteur-méfiant. Même dans les États de divulgation, le recours légal arrive longtemps après que le mal est fait. Traite chaque vente entre particuliers comme sans divulgation : ne suppose rien, vérifie le VIN.",
    redFlagsCardCta: "Lance le VIN avant de remettre un dollar :",
    redFlagsCardTitle: "Signaux d'alerte de privilège caché",
    redFlags: [
      "Le titre indique « Original » mais le vendeur ne peut produire un titre physique",
      "Le titre liste un titulaire de privilège — « c'est payé » ne signifie rien sans mainlevée",
      "Espèces uniquement ; refuse les chèques de banque, l'entiercement ou les paiements traçables",
      "Veut « juste te signer le titre » ou n'a qu'un duplicata ou un acte de vente",
      "Prix demandé largement sous le marché sans explication claire et vérifiable",
      "Vente urgente — « je pars à l'étranger demain », pression pour sauter la paperasse",
    ],
    h2Protect: "Que faire si tu trouves un privilège",
    protectIntro: "Un privilège actif n'est pas automatiquement un casse-affaire — mais ça change absolument comment tu conclus. Choisis l'option qui correspond à ta tolérance au risque.",
    protect: [
      { title: "Utilise un service d'entiercement", body: "L'entiercement retient tes fonds, paie le remboursement du prêt directement au prêteur et libère le reste au vendeur uniquement après confirmation de la mainlevée. Coûte $50 à $500 et supprime presque tout le risque." },
      { title: "Obtiens une lettre de remboursement de privilège", body: "Demande au vendeur de demander une lettre de remboursement de 10 jours indiquant le solde exact. Cela prouve que le privilège est réel et te donne un nombre fixe contre lequel négocier." },
      { title: "Conclus chez le prêteur", body: "Rencontre au bureau du prêteur, paie le prêteur directement, et repars avec une mainlevée en main et le titre prêt à te signer." },
      { title: "Pars", body: "Si le vendeur ne peut ou ne veut pas coopérer avec aucune des options ci-dessus, l'affaire n'en vaut pas la peine. Il y a toujours plus de voitures." },
    ],
    h2Why: "Pourquoi une vérification de privilège compte avant d'acheter",
    whyIntro: "Un privilège lié au VIN décide si tu peux légalement posséder et immatriculer la voiture du tout — et si ton argent est en sécurité.",
    whyCards: [
      { title: "Protège ton argent", body: "Achète sur un privilège actif et le prêteur peut saisir la voiture pour laquelle tu as payé — sans remboursement et le vendeur disparu depuis longtemps." },
      { title: "Protège ton titre", body: "Un privilège non levé bloque le transfert au DMV. Confirmer le statut de mainlevée d'abord signifie que tu peux réellement immatriculer et assurer la voiture." },
      { title: "Vérifie, ne fais pas confiance", body: "Un titre papier d'apparence propre peut cacher un prêt actif. Le registre DMV lié au VIN — pas la parole du vendeur — est la seule preuve fiable." },
    ],
    h2Internal: "Plus de vérifications VIN qui se combinent avec une vérification de privilège",
    internalIntro: "Un privilège est une pièce du puzzle. Ces vérifications complètent l'image avant achat avant que tu n'achètes.",
    internalLinks: [
      { href: "/stolen-vehicle-check", label: "Vérification de véhicule volé", desc: "Un vendeur qui cache un privilège peut aussi cacher un statut de vol — vérifie les deux par VIN." },
      { href: "/salvage-title-check", label: "Vérification titre salvage", desc: "Les privilèges et titres marqués bloquent tous deux un transfert propre — vérifie l'historique du titre." },
      { href: "/total-loss-check", label: "Vérification perte totale", desc: "Une radiation par assureur voyage souvent avec des complications de saisie et de privilège." },
      { href: "/vin-check-vs-carfax", label: "CarCheckerVIN vs Carfax", desc: "Vois comment nos données gratuites de privilège se comparent aux packages payants d'historique complet." },
      { href: "/vin-check", label: "Vérification complète d'historique VIN", desc: "Privilèges, marques de titre, accidents, odomètre et vol dans un rapport complet." },
      { href: "/vin-decoder", label: "Décodeur VIN", desc: "Décode le VIN de 17 caractères en spécifications, finitions et détails de fabrication." },
    ],
    h2Faq: "Vérification de privilège véhiculaire — Foire aux questions",
    faqIntro: "Les questions que les acheteurs posent le plus sur les privilèges, les titulaires de privilèges et la clôture en toute sécurité.",
    bottomBadge: "Gratuit · Instantané · Adossé NMVTIS",
    ctaBottomHeading: "Fais ta vérification de privilège gratuite maintenant",
    ctaBottomSub: "Deux minutes aujourd'hui te font économiser toute une vie de la dette de quelqu'un d'autre. Saisis le VIN et vois chaque privilège enregistré, titulaire de privilège et saisie au dossier instantanément.",
    ctaBottomNoteA: "Données adossées NMVTIS",
    ctaBottomNoteB: "Sans inscription · Gratuit",
  },
} as const;

const FAQS_EN = [
  { question: "Is a free VIN lien check actually accurate?", answer: "A free consumer-grade VIN lien check pulls from public state DMV title brand records, NMVTIS, and reported lender filings. It catches the vast majority of recorded liens, but commercial NMVTIS searches that cost $20–$45 occasionally surface very recent filings (within the last 7–14 days) that have not yet propagated to public feeds. For a private-party purchase, run our free check first and request a paid NMVTIS report from an approved provider only if anything looks ambiguous." },
  { question: "Can a seller hide a lien?", answer: "Yes. A seller can show you a paper title that looks clean even when an active lien exists, especially if the title was issued before the loan was taken out, if the title is a duplicate, or if the lien was recorded with the lender but never updated on the physical title. Always verify independently using the VIN — the lien attaches to the VIN, not to whatever piece of paper the seller hands you." },
  { question: "What happens if I buy a car with a lien?", answer: "You do not legally own it. The lender holds the security interest in the vehicle until the loan is paid off. If the seller stops making payments — or never planned to make them — the lender can repossess the car from your driveway and you have no legal recourse against them. Your only remedy is a civil suit against the seller, who has likely already disappeared with your cash." },
  { question: "How long does a lien stay on a title?", answer: "A lien stays on the title until the debt is satisfied AND the lender files a lien release with the state DMV. Many old satisfied liens never get released because lenders close, get acquired, or simply forget. Even a long-paid-off lien that was never released can block a title transfer years later, so always confirm release status before you buy." },
  { question: "Can I check a lien for free at the DMV?", answer: "Some states offer a free or low-cost lien lookup directly through their DMV portal, but most charge a fee — typically $5 to $25 — for an official title and lien record search. Our VIN-based check is free and pulls from the same underlying state DMV reporting feeds, so it is usually the fastest first step before you decide whether you need an official certified record." },
  { question: "What is a UCC-1 filing?", answer: "A UCC-1 (Uniform Commercial Code) financing statement is a public notice that a lender has a security interest in a piece of collateral. For commercial vehicles, fleet vehicles, and some heavy equipment, the lien is recorded as a UCC-1 with the secretary of state rather than on the DMV title. If you are buying a commercial vehicle, always run both a DMV title lien check AND a UCC-1 search." },
  { question: "Can I remove an old satisfied lien?", answer: "Yes. If you have already paid off your loan but the lien is still showing on the title, request a lien release letter from the lender (sometimes called a 'satisfaction of lien'). Submit that letter to your state DMV with the appropriate form and a small fee, and the DMV will issue a new title with the lien removed. Doing this before you sell saves the buyer a major headache." },
  { question: "Do private-party sellers have to disclose liens?", answer: "It depends on the state. Roughly 13 states require explicit lien disclosure on private-party sales, and the rest leave it to buyer beware. Even in disclosure states, enforcement is weak and the legal remedy comes after the damage is done. Treat every private-party sale as a no-disclosure state: assume nothing, verify the VIN yourself." },
  { question: "What is the difference between a lien and an encumbrance?", answer: "A lien is a specific legal claim that secures a debt — the lender can repossess the vehicle if you do not pay. An encumbrance is a broader term that covers any restriction on a property's use or transfer, including liens, leases, easements, and use restrictions. Every lien is an encumbrance, but not every encumbrance is a lien." },
  { question: "How do I check for a lien if the seller refuses to share the VIN?", answer: "You walk away. A seller who will not share the 17-character VIN before a sale is hiding something — and the most common thing they are hiding is a lien, a salvage brand, or stolen status. The VIN is not private information; it is visible through the windshield from the street. A refusal to provide it is itself the red flag." },
];

const FAQS_ES = [
  { question: "¿Una verificación gratis de gravamen por VIN es realmente precisa?", answer: "Una verificación gratis de gravamen por VIN de grado consumidor extrae de registros públicos de marca de título de DMV estatales, NMVTIS y presentaciones reportadas de prestamistas. Atrapa la gran mayoría de los gravámenes registrados, pero las búsquedas comerciales de NMVTIS que cuestan $20–$45 ocasionalmente muestran presentaciones muy recientes (dentro de los últimos 7–14 días) que aún no se han propagado a los feeds públicos. Para una compra entre particulares, ejecuta nuestra verificación gratis primero y solicita un reporte pagado de NMVTIS de un proveedor aprobado solo si algo se ve ambiguo." },
  { question: "¿Puede un vendedor ocultar un gravamen?", answer: "Sí. Un vendedor puede mostrarte un título físico que se ve limpio incluso cuando existe un gravamen activo, especialmente si el título se emitió antes de tomar el préstamo, si el título es un duplicado, o si el gravamen se registró con el prestamista pero nunca se actualizó en el título físico. Siempre verifica independientemente usando el VIN — el gravamen se adhiere al VIN, no al papel que te entrega el vendedor." },
  { question: "¿Qué pasa si compro un auto con un gravamen?", answer: "Legalmente no lo posees. El prestamista mantiene el interés de garantía en el vehículo hasta que se pague el préstamo. Si el vendedor deja de hacer pagos — o nunca planeó hacerlos — el prestamista puede recuperar el auto de tu cochera y no tienes recurso legal contra ellos. Tu único remedio es una demanda civil contra el vendedor, quien probablemente ya desapareció con tu efectivo." },
  { question: "¿Cuánto tiempo permanece un gravamen en un título?", answer: "Un gravamen permanece en el título hasta que se satisface la deuda Y el prestamista presenta una liberación de gravamen al DMV estatal. Muchos gravámenes viejos satisfechos nunca se liberan porque los prestamistas cierran, son adquiridos o simplemente olvidan. Incluso un gravamen pagado hace mucho que nunca se liberó puede bloquear una transferencia de título años después, así que siempre confirma el estado de liberación antes de comprar." },
  { question: "¿Puedo verificar un gravamen gratis en el DMV?", answer: "Algunos estados ofrecen una búsqueda de gravamen gratis o de bajo costo directamente a través de su portal DMV, pero la mayoría cobra una tarifa — típicamente $5 a $25 — por una búsqueda oficial de título y registro de gravamen. Nuestra verificación basada en VIN es gratis y extrae de los mismos feeds subyacentes de reporte de DMV estatal, así que usualmente es el primer paso más rápido antes de decidir si necesitas un registro oficial certificado." },
  { question: "¿Qué es una presentación UCC-1?", answer: "Una declaración de financiamiento UCC-1 (Código Comercial Uniforme) es un aviso público de que un prestamista tiene un interés de garantía en una pieza de colateral. Para vehículos comerciales, vehículos de flota y algún equipo pesado, el gravamen se registra como un UCC-1 con el secretario de estado en lugar de en el título del DMV. Si estás comprando un vehículo comercial, siempre ejecuta tanto una verificación de gravamen de título DMV COMO una búsqueda UCC-1." },
  { question: "¿Puedo remover un gravamen viejo satisfecho?", answer: "Sí. Si ya pagaste tu préstamo pero el gravamen todavía se muestra en el título, solicita una carta de liberación de gravamen al prestamista (a veces llamada 'satisfacción de gravamen'). Envía esa carta a tu DMV estatal con el formulario apropiado y una pequeña tarifa, y el DMV emitirá un nuevo título con el gravamen removido. Hacer esto antes de vender le ahorra al comprador un dolor de cabeza importante." },
  { question: "¿Los vendedores particulares tienen que divulgar gravámenes?", answer: "Depende del estado. Aproximadamente 13 estados requieren divulgación explícita de gravamen en ventas entre particulares, y el resto lo dejan al comprador-precavido. Incluso en estados con divulgación, la aplicación es débil y el remedio legal llega después de que el daño está hecho. Trata cada venta entre particulares como un estado sin divulgación: no asumas nada, verifica el VIN tú mismo." },
  { question: "¿Cuál es la diferencia entre un gravamen y una carga?", answer: "Un gravamen es un reclamo legal específico que asegura una deuda — el prestamista puede recuperar el vehículo si no pagas. Una carga es un término más amplio que cubre cualquier restricción sobre el uso o transferencia de una propiedad, incluyendo gravámenes, arrendamientos, servidumbres y restricciones de uso. Cada gravamen es una carga, pero no cada carga es un gravamen." },
  { question: "¿Cómo verifico un gravamen si el vendedor se niega a compartir el VIN?", answer: "Te alejas. Un vendedor que no comparte el VIN de 17 caracteres antes de una venta está ocultando algo — y lo más común que están ocultando es un gravamen, una marca de salvamento o estado de robo. El VIN no es información privada; es visible a través del parabrisas desde la calle. Una negativa a proporcionarlo es en sí misma la bandera roja." },
];

interface Props { locale: Locale; }

export default function VehicleLienCheckBody({ locale }: Props) {
  const c = COPY[locale];
  const faqs = locale === "es" ? FAQS_ES : FAQS_EN;
  const link = (en: string) => (locale === "es" ? `/es${en}` : en);

  return (
    <article className="pb-16 bg-surface">
      <div className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
          <Breadcrumbs items={[{ label: c.home, href: locale === "es" ? "/es" : "/" }, { label: c.crumb }]} onDark />
          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <Lock className="w-4 h-4" /> {c.badge}
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
            {c.h1Lead}
            <span style={{ color: "var(--color-secondary-container)" }}>{c.h1Accent}</span>
          </h1>
          <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">{c.intro}</p>

          <div id="lien-search" className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
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
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2What}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {c.what1Pre}
                <strong className="text-on-surface">{c.what1Bold}</strong>
                {c.what1Suffix}
              </p>
              <p>{c.what2}</p>
              <p>
                {c.what3Pre}
                <strong className="text-on-surface">{c.what3Bold}</strong>
                {c.what3Suffix}
              </p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.risksCardTitle}</h3>
              </div>
              <ul className="space-y-3 text-sm text-on-surface">
                {c.risksItems.map((r, i) => {
                  const Icon = [Banknote, FileText, AlertTriangle][i];
                  return (
                    <li key={r.bold} className="flex items-start gap-2 rounded-lg bg-white px-3.5 py-2.5 border border-outline-variant/60">
                      <Icon className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>{r.bold}</strong>{r.body}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2LienTypes}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.lienTypesIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {c.lienTypes.map((l, i) => {
              const Icon = LIEN_ICONS[i];
              return (
                <div key={l.title} className="rounded-2xl border border-outline-variant bg-surface p-5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-base font-headline font-extrabold text-primary mb-1">{l.title}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{l.body}</p>
                </div>
              );
            })}
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
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Compare}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">{c.compareIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5 sm:p-6">
              <div className="text-[11px] font-black uppercase tracking-wider text-primary mb-2">{c.freeTag}</div>
              <p className="text-lg font-headline font-extrabold text-primary mb-3">{c.freeTitle}</p>
              <ul className="space-y-2 text-sm text-on-surface-variant">
                {c.freeBullets.map((b) => <li key={b} className="flex gap-2"><span>·</span><span>{b}</span></li>)}
              </ul>
            </div>
            <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
              <div className="text-[11px] font-black uppercase tracking-wider text-on-surface-variant mb-2">{c.dmvTag}</div>
              <p className="text-lg font-headline font-extrabold text-on-surface mb-3">{c.dmvTitle}</p>
              <ul className="space-y-2 text-sm text-on-surface-variant">
                {c.dmvBullets.map((b) => <li key={b} className="flex gap-2"><span>·</span><span>{b}</span></li>)}
              </ul>
            </div>
            <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
              <div className="text-[11px] font-black uppercase tracking-wider text-on-surface-variant mb-2">{c.paidTag}</div>
              <p className="text-lg font-headline font-extrabold text-on-surface mb-3">{c.paidTitle}</p>
              <ul className="space-y-2 text-sm text-on-surface-variant">
                {c.paidBullets.map((b) => <li key={b} className="flex gap-2"><span>·</span><span>{b}</span></li>)}
              </ul>
            </div>
          </div>
          <div className="mt-6 rounded-2xl bg-secondary-container/40 border border-outline-variant p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <BadgeCheck className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
              <p className="text-sm text-on-surface leading-relaxed">
                <strong className="text-on-surface">{c.compareNoteBoldLead}</strong>
                {c.compareNoteMid}
                <Link href={link("/vin-check-vs-carfax")} className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.compareNoteLink}</Link>
                {c.compareNoteSuffix}
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{c.h2RedFlags}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>{c.redFlags1}</p>
              <p>
                {c.redFlags2Pre}
                <strong className="text-on-surface">{c.redFlags2Bold}</strong>
                {c.redFlags2Suffix}
              </p>
              <div className="rounded-xl bg-white p-4 border border-outline-variant">
                <p className="text-xs font-bold text-on-surface mb-2">{c.redFlagsCardCta}</p>
                <VinSearchForm size="sm" />
              </div>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Eye className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.redFlagsCardTitle}</h3>
              </div>
              <ul className="space-y-2 text-sm text-on-surface">
                {c.redFlags.map((flag) => (
                  <li key={flag} className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{flag}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Protect}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.protectIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {c.protect.map((p, i) => {
              const Icon = PROTECT_ICONS[i];
              return (
                <div key={p.title} className="rounded-2xl border border-outline-variant bg-surface p-5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-base font-headline font-extrabold text-primary mb-1">{p.title}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{p.body}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Why}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.whyIntro}</p>
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
          <div className="speakable-faq space-y-3">
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
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-on-surface-variant">
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-green-500" /> {c.ctaBottomNoteA}
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-green-500" strokeWidth={3} /> {c.ctaBottomNoteB}
            </span>
          </div>
        </section>

        <RelatedChecks exclude="/vehicle-lien-check" />
      </div>
    </article>
  );
}

export { FAQS_EN, FAQS_ES };
