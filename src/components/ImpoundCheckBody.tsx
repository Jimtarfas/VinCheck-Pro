/**
 * Shared body for /impound-check and /es/impound-check.
 * Wave 18d — full English layout in both locales via COPY={en,es}.
 */

import Link from "next/link";
import { Check } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import type { Locale } from "@/i18n/config";

const COPY = {
  en: {
    home: "Home",
    crumb: "Impound Check",
    h1: "Impound & Repo History Check by VIN",
    intro:
      "Purchasing a vehicle with an active lien or unresolved impound record can result in losing the vehicle after purchase — even if you paid in full and the seller appeared to have legitimate ownership. A VIN impound and repo check reveals active liens, past repossession events, and impound history that could complicate or completely prevent a clean title transfer.",
    ctaTopHeading: "Check for Impound, Repo, and Lien History",
    h2What: "What Is an Impound Record",
    what1:
      "A vehicle impound is the seizure and storage of a vehicle by law enforcement or a government authority. Impounds occur for a range of reasons: driving under the influence, operating an uninsured or unregistered vehicle, parking violations with unpaid fines, vehicle abandonment, association with criminal activity, or as evidence in an investigation. When a vehicle is impounded, the event is recorded in law enforcement databases.",
    what2:
      "Impound records can complicate used car purchases in several ways. Outstanding impound fees or storage charges may become liens against the vehicle that must be resolved before title transfer. A vehicle impounded as evidence in an ongoing investigation may not be available for transfer at all until the legal matter is resolved. And some jurisdictions place holds on vehicle titles for unpaid fines that block registration in a new owner's name.",
    what3:
      "Not all impound records appear in VIN-linked databases — local law enforcement impound records are particularly variable in their reporting to centralized databases. However, impounds that resulted in auction sales, abandoned vehicle proceedings, or liens against the title will generally appear in comprehensive vehicle history reports.",
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
    faqHeading: "Frequently Asked Questions",
    ctaBottomHeading: "Check for Impound, Repo, and Lien Records",
    ctaBottomSub: "Enter a 17-character VIN to check for active liens, repossession history, and impound records.",
  },
  es: {
    home: "Inicio",
    crumb: "Verificación de incautación",
    h1: "Verificación de historial de incautación y embargo por VIN",
    intro:
      "Comprar un vehículo con un gravamen activo o un registro de incautación sin resolver puede resultar en perder el vehículo después de la compra — incluso si pagaste completo y el vendedor parecía tener la propiedad legítima. Una verificación VIN de incautación y embargo revela gravámenes activos, eventos pasados de recuperación e historial de incautación que podrían complicar o impedir completamente una transferencia limpia del título.",
    ctaTopHeading: "Verifica historial de incautación, embargo y gravámenes",
    h2What: "Qué es un registro de incautación",
    what1:
      "Una incautación de vehículo es el secuestro y almacenamiento de un vehículo por parte de las fuerzas del orden o una autoridad gubernamental. Las incautaciones ocurren por diversas razones: conducir bajo los efectos del alcohol, operar un vehículo sin seguro o sin registrar, violaciones de estacionamiento con multas impagas, abandono del vehículo, asociación con actividad criminal o como evidencia en una investigación. Cuando un vehículo es incautado, el evento se registra en bases de datos de las fuerzas del orden.",
    what2:
      "Los registros de incautación pueden complicar las compras de autos usados de varias formas. Las tarifas pendientes de incautación o cargos de almacenamiento pueden convertirse en gravámenes contra el vehículo que deben resolverse antes de la transferencia del título. Un vehículo incautado como evidencia en una investigación en curso puede no estar disponible para transferencia hasta que se resuelva el asunto legal. Y algunas jurisdicciones colocan retenciones sobre los títulos de los vehículos por multas impagas que bloquean el registro a nombre del nuevo propietario.",
    what3:
      "No todos los registros de incautación aparecen en bases de datos vinculadas al VIN — los registros locales de incautación de las fuerzas del orden son particularmente variables en su reporte a bases de datos centralizadas. Sin embargo, las incautaciones que resultaron en ventas en subasta, procedimientos de vehículos abandonados o gravámenes contra el título generalmente aparecerán en reportes completos de historial vehicular.",
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
    faqHeading: "Preguntas frecuentes",
    ctaBottomHeading: "Verifica registros de incautación, embargo y gravámenes",
    ctaBottomSub: "Ingresa un VIN de 17 caracteres para verificar gravámenes activos, historial de recuperación y registros de incautación.",
  },
} as const;

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

          <h2 className="mt-12 text-2xl font-bold text-slate-900">{c.h2What}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.what1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.what2}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.what3}</p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">{c.h2Repo}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.repo1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.repo2}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.repo3}</p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">{c.h2Liens}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.liensIntro}</p>
          <ul className="mt-4 space-y-2 text-slate-600">
            {c.lienBullets.map((b) => (
              <li key={b.strong} className="flex gap-2 items-start">
                <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span><strong>{b.strong}</strong>{b.rest}</span>
              </li>
            ))}
          </ul>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">{c.h2Transfer}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.transfer1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.transfer2}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            {c.transfer3Pre}
            <Link href={link("/vin-check")} className="text-primary-600 hover:underline font-medium">{c.vinLink}</Link>
            {c.transfer3Mid}
            <Link href={link("/stolen-vehicle-check")} className="text-primary-600 hover:underline font-medium">{c.stolenLink}</Link>
            {c.transfer3Suffix}
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">{c.h2Buying}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.buy1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.buy2}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            {c.buy3Pre}
            <Link href={link("/accident-history-check")} className="text-primary-600 hover:underline font-medium">{c.accidentLink}</Link>
            {c.buy3Mid}
            <Link href={link("/odometer-check")} className="text-primary-600 hover:underline font-medium">{c.odoLink}</Link>
            {c.buy3Suffix}
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">{c.faqHeading}</h2>
          <div className="mt-6 space-y-3">
            {faqs.map((faq) => (
              <details key={faq.question} className="group rounded-xl border border-slate-200 bg-white p-5">
                <summary className="flex cursor-pointer items-center justify-between gap-4 list-none">
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900 m-0">{faq.question}</h3>
                  <span className="text-2xl text-primary-600 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-slate-600 leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </article>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-4">
        <RelatedChecks exclude="/impound-check" />
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

export { FAQS_EN, FAQS_ES };
