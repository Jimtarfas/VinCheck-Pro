/**
 * Shared body for /impound-check and /es/impound-check.
 *
 * Upgraded to the rich VIN-check layout used by the Chevrolet cluster and
 * LemonCheckBrandBody: dark hero with trust stats, an at-a-glance card,
 * long-form content sections, a "records that reveal an impound" grid, a
 * 6-step how-to, a mid-page CTA, the VinCheckBanner, an FAQ accordion, and a
 * closing CTA. Fully bilingual via COPY={en,es}; the page files supply the
 * matching JSON-LD (Article, FAQ, Breadcrumb, HowTo, WebApplication,
 * Speakable) and pull FAQS_* / HOWTO_* from here so the structured data
 * never drifts from the rendered copy.
 */

import Link from "next/link";
import {
  Search, Banknote, FileText, Repeat, Building2, ShieldCheck,
  Check, AlertTriangle, Clock, BadgeCheck, Fingerprint, Lock,
  Zap, ArrowRight, Gauge,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import type { Locale } from "@/i18n/config";

const HOWTO_ICONS = [Search, Banknote, FileText, Repeat, Building2, ShieldCheck] as const;
const TRUST_ICONS = [ShieldCheck, Banknote, Clock, BadgeCheck, Fingerprint] as const;

const COPY = {
  en: {
    home: "Home",
    crumb: "Impound Check",
    badge: "Impound · Repo · Lien Records",
    h1: "Impound & Repo History Check by VIN",
    h1Accent: "Find Liens Before You Buy",
    intro:
      "Purchasing a vehicle with an active lien or unresolved impound record can result in losing the vehicle after purchase — even if you paid in full and the seller appeared to have legitimate ownership. A VIN impound and repo check reveals active liens, past repossession events, and impound history that could complicate or completely prevent a clean title transfer.",
    heroFormHeading: "Run a Free Impound & Lien Check",
    heroFormSub: "Enter any 17-character VIN",
    secureNote: "256-bit encrypted · DPPA compliant · NMVTIS-sourced title data",
    trustStats: [
      { value: "NMVTIS", label: "federally-sourced" },
      { value: "Liens", label: "active lien check" },
      { value: "< 5 sec", label: "average lookup" },
      { value: "Free", label: "preview, no signup" },
      { value: "17-char", label: "full VIN decode" },
    ],
    glanceHeading: "Impound & Lien Check at a Glance",
    glanceStats: [
      { label: "Records checked", value: "Liens · Repo · Impound" },
      { label: "Primary source", value: "NMVTIS + state DMV" },
      { label: "Coverage note", value: "Local impounds vary" },
      { label: "Lookup", value: "Free · instant · by VIN" },
    ],
    h2What: "What Is an Impound Record",
    what1:
      "A vehicle impound is the seizure and storage of a vehicle by law enforcement or a government authority. Impounds occur for a range of reasons: driving under the influence, operating an uninsured or unregistered vehicle, parking violations with unpaid fines, vehicle abandonment, association with criminal activity, or as evidence in an investigation. When a vehicle is impounded, the event is recorded in law enforcement databases.",
    what2:
      "Impound records can complicate used car purchases in several ways. Outstanding impound fees or storage charges may become liens against the vehicle that must be resolved before title transfer. A vehicle impounded as evidence in an ongoing investigation may not be available for transfer at all until the legal matter is resolved. And some jurisdictions place holds on vehicle titles for unpaid fines that block registration in a new owner's name.",
    what3:
      "Not all impound records appear in VIN-linked databases — local law enforcement impound records are particularly variable in their reporting to centralized databases. However, impounds that resulted in auction sales, abandoned vehicle proceedings, or liens against the title will generally appear in comprehensive vehicle history reports.",
    h2Records: "Records That Reveal an Impound",
    recordsSub:
      "Impounds rarely appear as a single dedicated entry. They usually surface through the records they leave behind — these are the signals worth checking by VIN.",
    recordCards: [
      "Liens against the title for unpaid storage or towing fees that must clear before a clean transfer.",
      "Abandoned-vehicle title proceedings and lender or municipal auction sale records.",
      "Title brands or reassignments that resulted from the impound or auction process.",
    ],
    h2Repo: "Repossession History and What It Means",
    repo1:
      "A vehicle repossession occurs when a lender legally reclaims the vehicle from a borrower who has defaulted on their loan payments. The lender holds a security interest in the vehicle (their collateral for the loan), and upon default, they are entitled to take possession without a court order in most states. Repossession events are recorded in lender databases and often appear in vehicle history reports as a change of ownership from the borrower to the lender.",
    repo2:
      "A past repossession in a vehicle's history is not necessarily a problem for a subsequent buyer — if the lender properly transferred title and released the lien after repossession, the vehicle can be sold with a clean title to the next buyer. The issue arises when a seller attempts to sell a vehicle that was repossessed but the lender's lien has not been properly released from the title.",
    repo3:
      "If a vehicle has been repossessed, always verify that the lien release is documented on the title before completing any purchase. A lender whose loan was not fully repaid through the repossession sale retains the right to pursue the vehicle regardless of who currently holds it.",
    h2Liens: "How to Check for Active Liens",
    liensIntro:
      "An active lien on a vehicle means a financial institution or other creditor has a legal claim against the vehicle as collateral for an outstanding debt. Buying a vehicle with an active lien means you could potentially lose the vehicle to the lienholder if the debt is not satisfied — even if you purchased it in good faith from a private seller.",
    lienBullets: [
      { strong: "Review the physical title", rest: " — the lienholder's name should appear on the front of the title if a lien is active. A clean title shows no lienholder." },
      { strong: "Check VIN history reports", rest: " — active liens reported to NMVTIS appear in comprehensive vehicle history reports." },
      { strong: "Contact the state DMV", rest: " — state motor vehicle agencies maintain lien records and can confirm whether a lien exists on a specific VIN." },
      { strong: "Request a lien release letter", rest: " — if the seller claims the loan is paid off but no title is available, request written lien release documentation from the lender." },
    ],
    h2Transfer: "Title Transfer Issues with Liens",
    transfer1:
      "The most practical consequence of an active lien is that it prevents clean title transfer. When you register a vehicle in your name, the DMV checks for any outstanding liens. If a lien is present, registration may be blocked or the lienholder may be notified, potentially triggering repossession even after you have taken possession of the vehicle.",
    transfer2:
      "If you are buying a vehicle with a known outstanding loan, the safest approach is to conduct the transaction through the lender directly. Pay the lender the outstanding balance, receive the lien release, and then complete the transaction with the seller for any remaining equity. Never simply accept a seller's promise to \"pay off the loan with the sale proceeds\" — if they default on that obligation, you have no vehicle and no guarantee.",
    transfer3Pre: "Pair the impound and lien check with a full ",
    vinLink: "VIN history report",
    transfer3Mid: " and a ",
    stolenLink: "stolen vehicle check",
    transfer3Suffix: " to rule out both financial and criminal encumbrances on the vehicle.",
    h2Buying: "Buying a Car with Repo History",
    buy1:
      "A vehicle with a past repossession in its history is not necessarily a problematic purchase, provided the lien was properly released and the title is clean. Repossession simply means the previous owner defaulted on their loan — the vehicle itself may be in perfectly good mechanical and cosmetic condition. Repossessed vehicles sold through lender auctions are typically well-documented and often represent reasonable market values.",
    buy2:
      "The risk increases when a seller is attempting to sell a vehicle that was repossessed but the lender's interest has not been fully resolved. This scenario is more common in private party sales where distressed sellers attempt to liquidate assets before a formal repossession action. Always verify title cleanliness before any payment changes hands.",
    buy3Pre: "Complete your due diligence with an ",
    accidentLink: "accident history check",
    buy3Mid: " and an ",
    odoLink: "odometer check",
    buy3Suffix: " alongside the impound and lien check for full pre-purchase protection.",
    howToHeading: "How to Check Impound, Repo & Lien History — 6 Steps",
    howToSub:
      "A complete pre-purchase encumbrance screen takes about 15 minutes between your desk and the DMV.",
    midCtaHeading: "Don't Inherit Someone Else's Lien",
    midCtaSub:
      "Free, instant impound, repo, and lien check sourced from NMVTIS and every state DMV. No credit card. No signup.",
    faqHeading: "Frequently Asked Questions",
    faqSub:
      "The most-searched questions about impound, repossession, and lien checks.",
    bottomBadge: "Free · Instant · Lien & Repo",
    ctaBottomHeading: "Check for Impound, Repo, and Lien Records",
    ctaBottomSub:
      "Enter a 17-character VIN to check for active liens, repossession history, and impound records.",
    bottomReportLink: "Or get the full VIN history report",
  },
  es: {
    home: "Inicio",
    crumb: "Verificación de incautación",
    badge: "Registros de incautación · embargo · gravamen",
    h1: "Verificación de historial de incautación y embargo por VIN",
    h1Accent: "Encuentra gravámenes antes de comprar",
    intro:
      "Comprar un vehículo con un gravamen activo o un registro de incautación sin resolver puede resultar en perder el vehículo después de la compra — incluso si pagaste completo y el vendedor parecía tener la propiedad legítima. Una verificación VIN de incautación y embargo revela gravámenes activos, eventos pasados de recuperación e historial de incautación que podrían complicar o impedir completamente una transferencia limpia del título.",
    heroFormHeading: "Ejecuta una verificación gratuita de incautación y gravamen",
    heroFormSub: "Ingresa cualquier VIN de 17 caracteres",
    secureNote: "Cifrado de 256 bits · conforme a DPPA · datos de título de NMVTIS",
    trustStats: [
      { value: "NMVTIS", label: "datos federales" },
      { value: "Gravámenes", label: "verificación activa" },
      { value: "< 5 seg", label: "consulta promedio" },
      { value: "Gratis", label: "vista previa, sin registro" },
      { value: "17 caract.", label: "decodificación VIN" },
    ],
    glanceHeading: "Verificación de incautación y gravamen de un vistazo",
    glanceStats: [
      { label: "Registros revisados", value: "Gravámenes · embargo · incautación" },
      { label: "Fuente principal", value: "NMVTIS + DMV estatal" },
      { label: "Nota de cobertura", value: "Incautaciones locales varían" },
      { label: "Consulta", value: "Gratis · instantánea · por VIN" },
    ],
    h2What: "Qué es un registro de incautación",
    what1:
      "Una incautación de vehículo es el secuestro y almacenamiento de un vehículo por parte de las fuerzas del orden o una autoridad gubernamental. Las incautaciones ocurren por diversas razones: conducir bajo los efectos del alcohol, operar un vehículo sin seguro o sin registrar, violaciones de estacionamiento con multas impagas, abandono del vehículo, asociación con actividad criminal o como evidencia en una investigación. Cuando un vehículo es incautado, el evento se registra en bases de datos de las fuerzas del orden.",
    what2:
      "Los registros de incautación pueden complicar las compras de autos usados de varias formas. Las tarifas pendientes de incautación o cargos de almacenamiento pueden convertirse en gravámenes contra el vehículo que deben resolverse antes de la transferencia del título. Un vehículo incautado como evidencia en una investigación en curso puede no estar disponible para transferencia hasta que se resuelva el asunto legal. Y algunas jurisdicciones colocan retenciones sobre los títulos de los vehículos por multas impagas que bloquean el registro a nombre del nuevo propietario.",
    what3:
      "No todos los registros de incautación aparecen en bases de datos vinculadas al VIN — los registros locales de incautación de las fuerzas del orden son particularmente variables en su reporte a bases de datos centralizadas. Sin embargo, las incautaciones que resultaron en ventas en subasta, procedimientos de vehículos abandonados o gravámenes contra el título generalmente aparecerán en reportes completos de historial vehicular.",
    h2Records: "Registros que revelan una incautación",
    recordsSub:
      "Las incautaciones rara vez aparecen como una sola entrada dedicada. Normalmente surgen a través de los registros que dejan atrás — estas son las señales que vale la pena revisar por VIN.",
    recordCards: [
      "Gravámenes contra el título por tarifas impagas de almacenamiento o remolque que deben liquidarse antes de una transferencia limpia.",
      "Procedimientos de título de vehículo abandonado y registros de venta en subasta de prestamistas o municipios.",
      "Marcas de título o reasignaciones que resultaron del proceso de incautación o subasta.",
    ],
    h2Repo: "Historial de recuperación y qué significa",
    repo1:
      "Una recuperación de vehículo ocurre cuando un prestamista reclama legalmente el vehículo a un prestatario que ha incumplido los pagos de su préstamo. El prestamista tiene un interés de garantía en el vehículo (su garantía para el préstamo), y al incumplir, tiene derecho a tomar posesión sin orden judicial en la mayoría de los estados. Los eventos de recuperación se registran en bases de datos de prestamistas y a menudo aparecen en reportes de historial vehicular como un cambio de propiedad del prestatario al prestamista.",
    repo2:
      "Una recuperación pasada en el historial de un vehículo no es necesariamente un problema para un comprador posterior — si el prestamista transfirió correctamente el título y liberó el gravamen tras la recuperación, el vehículo puede venderse con título limpio al siguiente comprador. El problema surge cuando un vendedor intenta vender un vehículo que fue recuperado pero el gravamen del prestamista no se ha liberado correctamente del título.",
    repo3:
      "Si un vehículo ha sido recuperado, siempre verifica que la liberación del gravamen esté documentada en el título antes de completar cualquier compra. Un prestamista cuyo préstamo no fue completamente pagado a través de la venta de recuperación conserva el derecho de perseguir el vehículo sin importar quién lo posea actualmente.",
    h2Liens: "Cómo verificar gravámenes activos",
    liensIntro:
      "Un gravamen activo sobre un vehículo significa que una institución financiera u otro acreedor tiene una reclamación legal contra el vehículo como garantía por una deuda pendiente. Comprar un vehículo con un gravamen activo significa que podrías perder el vehículo ante el acreedor si la deuda no se satisface — incluso si lo compraste de buena fe a un vendedor privado.",
    lienBullets: [
      { strong: "Revisa el título físico", rest: " — el nombre del acreedor debe aparecer en el frente del título si hay un gravamen activo. Un título limpio no muestra acreedor." },
      { strong: "Revisa reportes de historial VIN", rest: " — los gravámenes activos reportados a NMVTIS aparecen en reportes completos de historial vehicular." },
      { strong: "Contacta al DMV estatal", rest: " — las agencias estatales de vehículos motorizados mantienen registros de gravámenes y pueden confirmar si existe un gravamen sobre un VIN específico." },
      { strong: "Solicita una carta de liberación de gravamen", rest: " — si el vendedor afirma que el préstamo está saldado pero no hay título disponible, solicita documentación escrita de liberación de gravamen por parte del prestamista." },
    ],
    h2Transfer: "Problemas de transferencia de título con gravámenes",
    transfer1:
      "La consecuencia práctica más importante de un gravamen activo es que impide una transferencia limpia del título. Cuando registras un vehículo a tu nombre, el DMV verifica cualquier gravamen pendiente. Si hay un gravamen presente, el registro puede bloquearse o el acreedor puede ser notificado, potencialmente desencadenando una recuperación incluso después de que hayas tomado posesión del vehículo.",
    transfer2:
      "Si estás comprando un vehículo con un préstamo pendiente conocido, el enfoque más seguro es realizar la transacción directamente a través del prestamista. Paga al prestamista el saldo pendiente, recibe la liberación del gravamen y luego completa la transacción con el vendedor por cualquier equidad restante. Nunca aceptes simplemente la promesa de un vendedor de \"pagar el préstamo con el dinero de la venta\" — si incumplen esa obligación, te quedas sin vehículo y sin garantía.",
    transfer3Pre: "Combina la verificación de incautación y gravámenes con un ",
    vinLink: "reporte completo de historial VIN",
    transfer3Mid: " y una ",
    stolenLink: "verificación de vehículo robado",
    transfer3Suffix: " para descartar tanto cargas financieras como criminales sobre el vehículo.",
    h2Buying: "Comprar un auto con historial de recuperación",
    buy1:
      "Un vehículo con una recuperación pasada en su historial no es necesariamente una compra problemática, siempre que el gravamen haya sido liberado correctamente y el título esté limpio. La recuperación simplemente significa que el propietario anterior incumplió su préstamo — el vehículo en sí puede estar en perfectas condiciones mecánicas y cosméticas. Los vehículos recuperados vendidos a través de subastas de prestamistas suelen estar bien documentados y a menudo representan valores de mercado razonables.",
    buy2:
      "El riesgo aumenta cuando un vendedor intenta vender un vehículo que fue recuperado pero el interés del prestamista no se ha resuelto completamente. Este escenario es más común en ventas privadas donde vendedores en apuros intentan liquidar activos antes de una acción formal de recuperación. Siempre verifica la limpieza del título antes de que cualquier pago cambie de manos.",
    buy3Pre: "Completa tu diligencia debida con una ",
    accidentLink: "verificación de historial de accidentes",
    buy3Mid: " y una ",
    odoLink: "verificación de odómetro",
    buy3Suffix: " junto con la verificación de incautación y gravámenes para protección completa previa a la compra.",
    howToHeading: "Cómo verificar el historial de incautación, embargo y gravamen — 6 pasos",
    howToSub:
      "Una verificación completa de cargas previa a la compra toma unos 15 minutos entre tu escritorio y el DMV.",
    midCtaHeading: "No heredes el gravamen de otra persona",
    midCtaSub:
      "Verificación gratuita e instantánea de incautación, embargo y gravamen desde NMVTIS y cada DMV estatal. Sin tarjeta de crédito. Sin registro.",
    faqHeading: "Preguntas frecuentes",
    faqSub:
      "Las preguntas más buscadas sobre verificaciones de incautación, recuperación y gravámenes.",
    bottomBadge: "Gratis · Instantáneo · Gravamen y embargo",
    ctaBottomHeading: "Verifica registros de incautación, embargo y gravámenes",
    ctaBottomSub:
      "Ingresa un VIN de 17 caracteres para verificar gravámenes activos, historial de recuperación y registros de incautación.",
    bottomReportLink: "O obtén el reporte completo de historial VIN",
  },
  fr: {
    home: "Accueil",
    crumb: "Vérification de mise en fourrière",
    badge: "Registres mise en fourrière · saisie · gage",
    h1: "Vérification d'historique de mise en fourrière et saisie par VIN",
    h1Accent: "Trouve les gages avant d'acheter",
    intro:
      "Acheter un véhicule avec un gage actif ou un registre de mise en fourrière non résolu peut entraîner la perte du véhicule après l'achat — même si tu as payé en entier et que le vendeur semblait avoir une propriété légitime. Une vérification VIN de mise en fourrière et saisie révèle les gages actifs, les événements passés de reprise et l'historique de mise en fourrière qui pourraient compliquer ou empêcher complètement un transfert propre du titre.",
    heroFormHeading: "Effectue une vérification gratuite de mise en fourrière et gage",
    heroFormSub: "Saisis n'importe quel VIN de 17 caractères",
    secureNote: "Chiffré 256 bits · conforme DPPA · données de titre de NMVTIS",
    trustStats: [
      { value: "NMVTIS", label: "données fédérales" },
      { value: "Gages", label: "vérification active" },
      { value: "< 5 sec", label: "recherche moyenne" },
      { value: "Gratuit", label: "aperçu, sans inscription" },
      { value: "17 car.", label: "décodage VIN complet" },
    ],
    glanceHeading: "Vérification mise en fourrière et gage en un coup d'œil",
    glanceStats: [
      { label: "Registres vérifiés", value: "Gages · saisie · mise en fourrière" },
      { label: "Source principale", value: "NMVTIS + DMV étatique" },
      { label: "Note de couverture", value: "Mises en fourrière locales varient" },
      { label: "Recherche", value: "Gratuit · instantané · par VIN" },
    ],
    h2What: "Qu'est-ce qu'un registre de mise en fourrière",
    what1:
      "Une mise en fourrière de véhicule est la saisie et le stockage d'un véhicule par les forces de l'ordre ou une autorité gouvernementale. Les mises en fourrière surviennent pour une variété de raisons : conduite sous influence, exploitation d'un véhicule non assuré ou non immatriculé, infractions de stationnement avec amendes impayées, abandon de véhicule, association avec une activité criminelle ou comme preuve dans une enquête. Quand un véhicule est mis en fourrière, l'événement est enregistré dans les bases de données des forces de l'ordre.",
    what2:
      "Les registres de mise en fourrière peuvent compliquer les achats de voitures d'occasion de plusieurs façons. Les frais de mise en fourrière en souffrance ou les frais de stockage peuvent devenir des gages contre le véhicule qui doivent être résolus avant le transfert de titre. Un véhicule mis en fourrière comme preuve dans une enquête en cours peut ne pas être disponible pour le transfert tant que l'affaire légale n'est pas résolue. Et certaines juridictions placent des retenues sur les titres de véhicules pour les amendes impayées qui bloquent l'enregistrement au nom d'un nouveau propriétaire.",
    what3:
      "Tous les registres de mise en fourrière n'apparaissent pas dans les bases de données liées au VIN — les registres locaux de mise en fourrière des forces de l'ordre sont particulièrement variables dans leur signalement aux bases de données centralisées. Cependant, les mises en fourrière qui ont entraîné des ventes aux enchères, des procédures de véhicule abandonné ou des gages contre le titre apparaîtront généralement dans les rapports complets d'historique véhiculaire.",
    h2Records: "Registres qui révèlent une mise en fourrière",
    recordsSub:
      "Les mises en fourrière apparaissent rarement comme une seule entrée dédiée. Elles font généralement surface à travers les registres qu'elles laissent derrière — ce sont les signaux à vérifier par VIN.",
    recordCards: [
      "Gages contre le titre pour les frais impayés de stockage ou remorquage qui doivent être réglés avant un transfert propre.",
      "Procédures de titre de véhicule abandonné et registres de vente aux enchères de prêteurs ou municipaux.",
      "Marques de titre ou réassignations qui résultent du processus de mise en fourrière ou d'enchère.",
    ],
    h2Repo: "Historique de reprise et ce que cela signifie",
    repo1:
      "Une reprise de véhicule survient lorsqu'un prêteur récupère légalement le véhicule d'un emprunteur qui a fait défaut sur ses paiements de prêt. Le prêteur détient un intérêt de garantie sur le véhicule (sa garantie pour le prêt), et en cas de défaut, il a le droit de prendre possession sans ordonnance du tribunal dans la plupart des états. Les événements de reprise sont enregistrés dans les bases de données des prêteurs et apparaissent souvent dans les rapports d'historique véhiculaire comme un changement de propriété de l'emprunteur au prêteur.",
    repo2:
      "Une reprise passée dans l'historique d'un véhicule n'est pas nécessairement un problème pour un acheteur ultérieur — si le prêteur a correctement transféré le titre et libéré le gage après la reprise, le véhicule peut être vendu avec un titre propre à l'acheteur suivant. Le problème survient quand un vendeur tente de vendre un véhicule qui a été repris mais le gage du prêteur n'a pas été correctement libéré du titre.",
    repo3:
      "Si un véhicule a été repris, vérifie toujours que la libération du gage est documentée sur le titre avant de compléter tout achat. Un prêteur dont le prêt n'a pas été complètement remboursé via la vente de reprise conserve le droit de poursuivre le véhicule peu importe qui le détient actuellement.",
    h2Liens: "Comment vérifier les gages actifs",
    liensIntro:
      "Un gage actif sur un véhicule signifie qu'une institution financière ou un autre créancier a une réclamation légale contre le véhicule comme garantie pour une dette en souffrance. Acheter un véhicule avec un gage actif signifie que tu pourrais potentiellement perdre le véhicule au profit du créancier si la dette n'est pas satisfaite — même si tu l'as acheté de bonne foi à un vendeur privé.",
    lienBullets: [
      { strong: "Examine le titre physique", rest: " — le nom du créancier devrait apparaître sur le devant du titre si un gage est actif. Un titre propre ne montre aucun créancier." },
      { strong: "Vérifie les rapports d'historique VIN", rest: " — les gages actifs signalés à NMVTIS apparaissent dans les rapports complets d'historique véhiculaire." },
      { strong: "Contacte le DMV étatique", rest: " — les agences étatiques des véhicules motorisés maintiennent des registres de gages et peuvent confirmer si un gage existe sur un VIN spécifique." },
      { strong: "Demande une lettre de libération de gage", rest: " — si le vendeur affirme que le prêt est remboursé mais qu'aucun titre n'est disponible, demande une documentation écrite de libération de gage du prêteur." },
    ],
    h2Transfer: "Problèmes de transfert de titre avec des gages",
    transfer1:
      "La conséquence pratique la plus importante d'un gage actif est qu'il empêche un transfert propre du titre. Quand tu enregistres un véhicule à ton nom, le DMV vérifie tout gage en souffrance. Si un gage est présent, l'enregistrement peut être bloqué ou le créancier peut être notifié, déclenchant potentiellement une reprise même après que tu aies pris possession du véhicule.",
    transfer2:
      "Si tu achètes un véhicule avec un prêt en souffrance connu, l'approche la plus sûre est de mener la transaction directement par le prêteur. Paie au prêteur le solde restant, reçois la libération de gage, puis complète la transaction avec le vendeur pour toute équité restante. N'accepte jamais simplement la promesse d'un vendeur de « payer le prêt avec le produit de la vente » — s'ils manquent à cette obligation, tu n'as ni véhicule ni garantie.",
    transfer3Pre: "Combine la vérification de mise en fourrière et gages avec un ",
    vinLink: "rapport complet d'historique VIN",
    transfer3Mid: " et une ",
    stolenLink: "vérification de véhicule volé",
    transfer3Suffix: " pour écarter à la fois les charges financières et criminelles sur le véhicule.",
    h2Buying: "Acheter une voiture avec un historique de reprise",
    buy1:
      "Un véhicule avec une reprise passée dans son historique n'est pas nécessairement un achat problématique, à condition que le gage ait été correctement libéré et que le titre soit propre. La reprise signifie simplement que le propriétaire précédent a fait défaut sur son prêt — le véhicule lui-même peut être en parfait état mécanique et cosmétique. Les véhicules repris vendus par les enchères de prêteurs sont typiquement bien documentés et représentent souvent des valeurs de marché raisonnables.",
    buy2:
      "Le risque augmente quand un vendeur tente de vendre un véhicule qui a été repris mais l'intérêt du prêteur n'a pas été entièrement résolu. Ce scénario est plus courant dans les ventes entre particuliers où des vendeurs en détresse tentent de liquider des actifs avant une action formelle de reprise. Vérifie toujours la propreté du titre avant que tout paiement ne change de mains.",
    buy3Pre: "Complète ta diligence raisonnable avec une ",
    accidentLink: "vérification d'historique d'accidents",
    buy3Mid: " et une ",
    odoLink: "vérification d'odomètre",
    buy3Suffix: " aux côtés de la vérification de mise en fourrière et gages pour une protection complète avant achat.",
    howToHeading: "Comment vérifier l'historique de mise en fourrière, saisie et gage — 6 étapes",
    howToSub:
      "Un dépistage complet de charges avant achat prend environ 15 minutes entre ton bureau et le DMV.",
    midCtaHeading: "N'hérite pas du gage de quelqu'un d'autre",
    midCtaSub:
      "Vérification gratuite et instantanée de mise en fourrière, saisie et gage provenant de NMVTIS et chaque DMV étatique. Sans carte de crédit. Sans inscription.",
    faqHeading: "Questions fréquentes",
    faqSub:
      "Les questions les plus recherchées sur les vérifications de mise en fourrière, reprise et gages.",
    bottomBadge: "Gratuit · Instantané · Gage et saisie",
    ctaBottomHeading: "Vérifie les registres de mise en fourrière, saisie et gages",
    ctaBottomSub:
      "Saisis un VIN de 17 caractères pour vérifier les gages actifs, l'historique de reprise et les registres de mise en fourrière.",
    bottomReportLink: "Ou obtiens le rapport complet d'historique VIN",
  },
} as const;

const HOWTO_EN = [
  { title: "Enter the VIN", body: "Type the 17-character VIN into the search form to start the impound, repossession, and lien screen for that exact vehicle." },
  { title: "Review active liens", body: "Check the report for active liens and the lienholder's name. An open lien means a creditor still has a legal claim against the vehicle as collateral." },
  { title: "Inspect the physical title", body: "Confirm whether a lienholder appears on the front of the paper title. A clean title shows none; a named lienholder signals an unresolved loan." },
  { title: "Look for repo & auction records", body: "Watch for an ownership change to a lender and a lender-auction sale — the fingerprint of a past repossession. Verify the lien was released afterward." },
  { title: "Confirm with the state DMV", body: "State motor vehicle agencies hold lien and title-hold records and can confirm encumbrances tied to a VIN that purely local impound events may never report." },
  { title: "Resolve before you pay", body: "If a lien or unpaid impound fee exists, settle it through the lender or authority and get written lien release in hand before any money changes hands." },
];

const HOWTO_ES = [
  { title: "Ingresa el VIN", body: "Escribe el VIN de 17 caracteres en el formulario de búsqueda para iniciar la verificación de incautación, recuperación y gravámenes de ese vehículo." },
  { title: "Revisa los gravámenes activos", body: "Revisa el reporte por gravámenes activos y el nombre del acreedor. Un gravamen abierto significa que un acreedor todavía tiene una reclamación legal sobre el vehículo como garantía." },
  { title: "Inspecciona el título físico", body: "Confirma si aparece un acreedor en el frente del título en papel. Un título limpio no muestra ninguno; un acreedor nombrado señala un préstamo sin resolver." },
  { title: "Busca registros de embargo y subasta", body: "Observa un cambio de propiedad a un prestamista y una venta en subasta del prestamista — la huella de una recuperación pasada. Verifica que el gravamen se haya liberado después." },
  { title: "Confirma con el DMV estatal", body: "Las agencias estatales de vehículos mantienen registros de gravámenes y retenciones de título y pueden confirmar cargas vinculadas a un VIN que los eventos puramente locales de incautación quizá nunca reporten." },
  { title: "Resuelve antes de pagar", body: "Si existe un gravamen o tarifa de incautación impaga, liquídalo a través del prestamista o autoridad y obtén la liberación de gravamen por escrito antes de que el dinero cambie de manos." },
];

const FAQS_EN = [
  { question: "What is an impound check?", answer: "An impound check is a VIN-based search for records showing that a vehicle was seized and stored by law enforcement or a government authority. It looks for impound-related events such as outstanding storage fees, abandoned-vehicle proceedings, or liens placed against the title. Because local impound records are not consistently reported to centralized databases, an impound check is most reliable when an impound intersected title, salvage, lien, or auction records." },
  { question: "Does a VIN check show if a car was impounded?", answer: "Sometimes, but not always. A VIN check surfaces impound events only when they were recorded in a database tied to the VIN — for example, when an impound resulted in an auction sale, an abandoned-vehicle title proceeding, or a lien against the title. Many local law enforcement impound records are never reported to centralized systems, so a clean VIN report does not guarantee a vehicle was never impounded." },
  { question: "Why do cars get impounded?", answer: "Vehicles are impounded for a range of reasons, including driving under the influence, operating an uninsured or unregistered vehicle, unpaid parking fines, vehicle abandonment, association with criminal activity, or being held as evidence in an investigation. When a vehicle is impounded, the event is recorded in law enforcement databases. Outstanding storage or towing fees from an impound can become liens that must be cleared before a clean title transfer." },
  { question: "Can impound history affect a used car's value?", answer: "It can, mainly through its consequences rather than the impound itself. Unpaid impound or storage fees can become liens that block registration in a new owner's name, and a vehicle impounded as evidence may be unavailable for transfer until the legal matter resolves. An impound that led to an auction or abandoned-vehicle title can also leave a branded or reassigned title that lowers resale value and complicates financing." },
  { question: "How do I check a car's impound or tow history by VIN?", answer: "Enter the 17-character VIN in the search form on this page to check for impound, repossession, and lien records associated with the vehicle. Because comprehensive nationwide impound databases are limited, pair the VIN check with a review of the physical title for liens or brands, and contact the state DMV, which maintains lien and title records and can confirm holds tied to a specific VIN." },
  { question: "What records reveal that a vehicle was impounded?", answer: "Impounds most often surface through related records rather than a dedicated impound entry. These include liens against the title for unpaid storage or towing fees, abandoned-vehicle title proceedings, auction sale records, and title brands that resulted from an impound process. Active liens reported to NMVTIS can appear in comprehensive vehicle history reports, while purely local impound events may leave no VIN-linked trace at all." },
  { question: "Is impound history harder to find than title brands?", answer: "Yes. Title brands such as salvage or flood are reported by state DMVs into centralized systems like NMVTIS, making them broadly searchable by VIN. Impound and tow data is far less centralized — local law enforcement reporting is inconsistent, so impound history typically becomes visible only when it intersects title, salvage, lien, or auction records, or when checked directly with local sources." },
];

const FAQS_ES = [
  { question: "¿Qué es una verificación de incautación?", answer: "Una verificación de incautación es una búsqueda basada en VIN de registros que muestran que un vehículo fue secuestrado y almacenado por las fuerzas del orden o una autoridad gubernamental. Busca eventos relacionados con incautación, como tarifas de almacenamiento pendientes, procedimientos de vehículos abandonados o gravámenes colocados contra el título. Debido a que los registros locales de incautación no se reportan consistentemente a bases de datos centralizadas, una verificación de incautación es más confiable cuando la incautación intersectó con registros de título, salvamento, gravamen o subasta." },
  { question: "¿Una verificación VIN muestra si un auto fue incautado?", answer: "A veces, pero no siempre. Una verificación VIN muestra eventos de incautación solo cuando fueron registrados en una base de datos vinculada al VIN — por ejemplo, cuando una incautación resultó en una venta en subasta, un procedimiento de título de vehículo abandonado o un gravamen contra el título. Muchos registros locales de incautación de las fuerzas del orden nunca se reportan a sistemas centralizados, así que un reporte VIN limpio no garantiza que un vehículo nunca fue incautado." },
  { question: "¿Por qué se incautan los autos?", answer: "Los vehículos son incautados por diversas razones, incluyendo conducir bajo los efectos del alcohol, operar un vehículo sin seguro o sin registrar, multas impagas de estacionamiento, abandono del vehículo, asociación con actividad criminal o como evidencia en una investigación. Cuando un vehículo es incautado, el evento se registra en bases de datos de las fuerzas del orden. Las tarifas pendientes de almacenamiento o remolque por una incautación pueden convertirse en gravámenes que deben liquidarse antes de una transferencia limpia del título." },
  { question: "¿Puede el historial de incautación afectar el valor de un auto usado?", answer: "Puede, principalmente a través de sus consecuencias en lugar de la incautación en sí. Las tarifas impagas de incautación o almacenamiento pueden convertirse en gravámenes que bloquean el registro a nombre del nuevo propietario, y un vehículo incautado como evidencia puede no estar disponible para transferencia hasta que se resuelva el asunto legal. Una incautación que llevó a una subasta o título de vehículo abandonado también puede dejar un título marcado o reasignado que reduce el valor de reventa y complica el financiamiento." },
  { question: "¿Cómo verifico el historial de incautación o remolque de un auto por VIN?", answer: "Ingresa el VIN de 17 caracteres en el formulario de búsqueda en esta página para verificar registros de incautación, recuperación y gravámenes asociados con el vehículo. Debido a que las bases de datos nacionales completas de incautación son limitadas, combina la verificación VIN con una revisión del título físico por gravámenes o marcas, y contacta al DMV estatal, que mantiene registros de gravámenes y títulos y puede confirmar retenciones vinculadas a un VIN específico." },
  { question: "¿Qué registros revelan que un vehículo fue incautado?", answer: "Las incautaciones aparecen más a menudo a través de registros relacionados que a través de una entrada dedicada de incautación. Estos incluyen gravámenes contra el título por tarifas impagas de almacenamiento o remolque, procedimientos de título de vehículo abandonado, registros de venta en subasta y marcas de título que resultaron de un proceso de incautación. Los gravámenes activos reportados a NMVTIS pueden aparecer en reportes completos de historial vehicular, mientras que los eventos puramente locales de incautación pueden no dejar rastro vinculado al VIN." },
  { question: "¿El historial de incautación es más difícil de encontrar que las marcas en el título?", answer: "Sí. Las marcas en el título como salvamento o inundación son reportadas por los DMV estatales a sistemas centralizados como NMVTIS, lo que las hace ampliamente buscables por VIN. Los datos de incautación y remolque están mucho menos centralizados — el reporte local de las fuerzas del orden es inconsistente, así que el historial de incautación normalmente solo se vuelve visible cuando intersecta con registros de título, salvamento, gravamen o subasta, o cuando se verifica directamente con fuentes locales." },
];

interface Props { locale: Locale; }

export default function ImpoundCheckBody({ locale }: Props) {
  const c = COPY[locale];
  const faqs = locale === "es" ? FAQS_ES : FAQS_EN;
  const howTo = locale === "es" ? HOWTO_ES : HOWTO_EN;
  const link = (en: string) => (locale === "es" ? `/es${en}` : en);
  const homeHref = locale === "es" ? "/es" : "/";
  const vinCheckHref = link("/vin-check");

  return (
    <article className="pb-16 bg-surface">
      {/* Hero */}
      <div className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
          <Breadcrumbs
            items={[{ label: c.home, href: homeHref }, { label: c.crumb }]}
            onDark
          />

          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <Banknote className="w-4 h-4" /> {c.badge}
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
            {c.h1} —{" "}
            <span style={{ color: "var(--color-secondary-container)" }}>
              {c.h1Accent}
            </span>
          </h1>

          <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
            {c.intro}
          </p>

          <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
            <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">
              {c.heroFormHeading}
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant mb-4">
              {c.heroFormSub}
            </p>
            <VinSearchForm size="lg" />
            <p className="mt-3 text-[11px] text-slate-400 flex items-center gap-1.5">
              <Lock className="w-3 h-3" /> {c.secureNote}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-8">
            {c.trustStats.map((st, i) => {
              const Icon = TRUST_ICONS[i] ?? ShieldCheck;
              return (
                <div key={st.label} className="bg-white/10 border border-white/15 rounded-xl px-3 py-3 text-center">
                  <Icon className="w-5 h-5 mx-auto mb-1 text-white/70" />
                  <div className="text-sm sm:text-base font-headline font-black text-white">{st.value}</div>
                  <div className="text-[10px] sm:text-[11px] text-white/65 leading-tight mt-0.5">{st.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* At a glance */}
      <section aria-labelledby="glance-heading" className="max-w-5xl mx-auto px-4 sm:px-6 -mt-8 sm:-mt-10 relative z-10">
        <div className="rounded-3xl bg-surface-container shadow-md border border-outline-variant p-5 sm:p-7">
          <h2 id="glance-heading" className="text-xs sm:text-sm font-headline font-black uppercase tracking-widest text-primary mb-4 sm:mb-5">
            {c.glanceHeading}
          </h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {c.glanceStats.map((st) => (
              <div key={st.label} className="rounded-2xl bg-primary px-4 py-4 sm:py-5">
                <dt className="text-[11px] sm:text-xs text-white/75 leading-snug mb-1.5">{st.label}</dt>
                <dd className="font-headline font-bold text-base sm:text-lg text-white leading-tight">{st.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* What is an impound record */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
            {c.h2What}
          </h2>
          <div className="prose prose-slate max-w-none text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
            <p>{c.what1}</p>
            <p>{c.what2}</p>
            <p>{c.what3}</p>
          </div>
        </section>

        {/* Records that reveal an impound */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            {c.h2Records}
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl">
            {c.recordsSub}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {c.recordCards.map((card, i) => (
              <div key={i} className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <AlertTriangle className="w-4 h-4 text-primary" />
                </div>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{card}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Repossession history */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
            {c.h2Repo}
          </h2>
          <div className="prose prose-slate max-w-none text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
            <p>{c.repo1}</p>
            <p>{c.repo2}</p>
            <p>{c.repo3}</p>
          </div>
        </section>

        {/* How to check for active liens */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
            {c.h2Liens}
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed mb-5 max-w-3xl">
            {c.liensIntro}
          </p>
          <ul className="space-y-3">
            {c.lienBullets.map((b) => (
              <li key={b.strong} className="flex gap-3 items-start rounded-2xl border border-outline-variant bg-surface-container-lowest p-4">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" strokeWidth={3} />
                <span className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                  <strong className="text-on-surface">{b.strong}</strong>{b.rest}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Title transfer issues */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
            {c.h2Transfer}
          </h2>
          <div className="prose prose-slate max-w-none text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
            <p>{c.transfer1}</p>
            <p>{c.transfer2}</p>
            <p>
              {c.transfer3Pre}
              <Link href={vinCheckHref} className="text-primary font-bold hover:underline">{c.vinLink}</Link>
              {c.transfer3Mid}
              <Link href={link("/stolen-vehicle-check")} className="text-primary font-bold hover:underline">{c.stolenLink}</Link>
              {c.transfer3Suffix}
            </p>
          </div>
        </section>

        {/* How-to */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            {c.howToHeading}
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl">
            {c.howToSub}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {howTo.map((st, i) => {
              const Icon = HOWTO_ICONS[i] ?? Search;
              const n = String(i + 1).padStart(2, "0");
              return (
                <div key={st.title} className="rounded-2xl border border-outline-variant bg-surface p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-headline font-black text-primary">{n}</span>
                  </div>
                  <h3 className="text-base font-headline font-extrabold text-primary mb-1.5">{st.title}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{st.body}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Buying a car with repo history */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
            {c.h2Buying}
          </h2>
          <div className="prose prose-slate max-w-none text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
            <p>{c.buy1}</p>
            <p>{c.buy2}</p>
            <p>
              {c.buy3Pre}
              <Link href={link("/accident-history-check")} className="text-primary font-bold hover:underline">{c.accidentLink}</Link>
              {c.buy3Mid}
              <Link href={link("/odometer-check")} className="text-primary font-bold hover:underline">{c.odoLink}</Link>
              {c.buy3Suffix}
            </p>
          </div>
        </section>

        {/* Mid CTA */}
        <section className="py-10">
          <div className="rounded-3xl bg-primary p-7 sm:p-10 text-center">
            <Search className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">
              {c.midCtaHeading}
            </h2>
            <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">
              {c.midCtaSub}
            </p>
            <div className="max-w-xl mx-auto bg-white rounded-2xl p-4 sm:p-5">
              <VinSearchForm size="lg" />
            </div>
          </div>
        </section>

        <section className="py-10">
          <VinCheckBanner />
        </section>

        {/* FAQ */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            {c.faqHeading}
          </h2>
          <p className="text-sm text-on-surface-variant mb-8">{c.faqSub}</p>
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

        {/* Bottom CTA */}
        <section className="py-14 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-wider mb-4">
            <Zap className="w-3.5 h-3.5" /> {c.bottomBadge}
          </div>
          <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3">
            {c.ctaBottomHeading}
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">
            {c.ctaBottomSub}
          </p>
          <div className="max-w-xl mx-auto bg-surface-container-low rounded-2xl p-5 border border-outline-variant">
            <VinSearchForm size="lg" />
          </div>
          <Link href={vinCheckHref} className="inline-flex items-center gap-2 mt-6 text-sm font-bold text-primary hover:underline">
            {c.bottomReportLink}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

        <RelatedChecks exclude="/impound-check" />
      </div>
    </article>
  );
}

export { FAQS_EN, FAQS_ES, HOWTO_EN, HOWTO_ES };
