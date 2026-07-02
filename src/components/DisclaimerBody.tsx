/**
 * Shared body for /disclaimer and /es/disclaimer.
 * Wave 18 batch 4 — full English layout in both locales via COPY={en,es}.
 *
 * The English text is the federal canonical NMVTIS notice
 * (49 U.S.C. § 30502 and 28 C.F.R. Part 25, Subpart C). The Spanish
 * rendering mirrors the BJA/NMVTIS consumer-notice wording closely;
 * because it remains pending sign-off by ClearVin LLC's compliance
 * team, the ES view surfaces an amber banner pointing buyers back to
 * the English canonical for full legal certainty.
 *
 * The body is locale-driven (no ?lang= query parsing). Each locale
 * wrapper (/disclaimer and /es/disclaimer) passes the prop directly.
 * The legacy bilingual page at /order/disclaimer keeps its own
 * ?lang= logic for the checkout-form link.
 */

import Link from "@/components/LocaleLink";
import { ShieldCheck, TriangleAlert, Info, ExternalLink } from "lucide-react";
import type { Locale } from "@/i18n/config";

interface DisclaimerCopy {
  backToCheckout: string;
  eyebrow: string;
  h1: string;
  requiredBy: string;
  officialNoticeLabel: string;
  notice: {
    p1: string;
    p2: string;
    p3: string;
    p4Strong: string;
    p4Suffix: string;
    p5Strong: string;
    p5Suffix: string;
    purchaseHeading: string;
    bullets: string[];
    p7Before: string;
    p7After: string;
  };
  providerAttributionHeading: string;
  providerAttribution: { p1Before: string; p1Mid: string; p1After: string; p2: string };
  limitsHeading: string;
  limits: { lead: string; doesNotInclude: string; suffix: string; bullets: string[]; footer: string };
  alsoSee: { before: string; linkLabel: string; after: string };
  backCta: string;
  reviewBannerTitle?: string;
  reviewBannerBody?: string;
  reviewBannerCta?: string;
}

const COPY: Record<Locale | "fr", DisclaimerCopy> = {
  en: {
    backToCheckout: "\u2190 Back to checkout",
    eyebrow: "Federally Mandated Disclosure",
    h1: "NMVTIS Disclaimer",
    requiredBy: "Required by 49 U.S.C. \u00a7\u00a030502 and 28 C.F.R. Part\u00a025, Subpart\u00a0C.",
    officialNoticeLabel: "Official NMVTIS Notice to Consumers",
    notice: {
      p1: "The National Motor Vehicle Title Information System (NMVTIS) is an electronic system that contains information on certain automobiles titled in the United States. NMVTIS is intended to serve as a reliable source of title and brand history for automobiles, but it does not contain detailed information regarding the vehicle's repair history.",
      p2: "All states, insurance carriers, and junk and salvage yards are required by federal law to report information to NMVTIS. However, NMVTIS data is supplied by current data providers, and the data for any vehicle may not be in the system if the data providers are not yet reporting. Information on the date of any new data provided will be included in your report.",
      p3: "Currently, the following jurisdictions are providing vehicle data to NMVTIS: information about most vehicles titled in the United States is now available through the system, including most vehicles in the current vehicle fleet.",
      p4Strong: "NMVTIS also collects information from insurance carriers",
      p4Suffix:
        " that are required by federal law to report vehicles they have declared a total loss. NMVTIS also collects information from junk and salvage yards that are required by federal law to report vehicles received by their facilities.",
      p5Strong: "While NMVTIS is designed to protect consumers from fraud and unsafe vehicles, users should not solely rely on NMVTIS.",
      p5Suffix:
        " NMVTIS data does not include event data on vehicles damaged prior to the implementation of the NMVTIS reporting requirements; data on collision damage that has not been reported by a participating insurance carrier; or data on damage to vehicles where insurance claims were not filed.",
      purchaseHeading:
        "Before purchasing a vehicle, in addition to obtaining a vehicle history report, consumers should:",
      bullets: [
        "Obtain an independent vehicle inspection by a qualified mechanic of their choosing.",
        "Verify that the vehicle identification number (VIN) on the vehicle matches the VIN on the title and any other vehicle documents.",
        "Examine the title to determine if there are any brands listed (i.e., flood, salvage, junk, etc.).",
      ],
      p7Before:
        "For more information about NMVTIS, the data included in the system, and the definitions of the standard NMVTIS brands, please visit ",
      p7After: ".",
    },
    providerAttributionHeading: "Data Provider Attribution",
    providerAttribution: {
      p1Before: "The NMVTIS-backed data displayed in your CarCheckerVIN report is supplied by ",
      p1Mid: "ClearVin LLC",
      p1After:
        ", an approved NMVTIS Data Provider. All right, title, and interest in the data remain the property of ClearVin and its underlying data partners (state DMVs, NMVTIS, NHTSA, the National Insurance Crime Bureau, participating insurance carriers, salvage auctions, and independent service-record contributors).",
      p2: "CarCheckerVIN is operated by Coconut Ventures LLC, a New Mexico limited liability company with its registered office at 412 W 7th St, Clovis, NM 88101, USA, and is a reseller of ClearVin's NMVTIS data service. CarCheckerVIN does not modify, edit, alter, or omit any data value returned by ClearVin; only the surrounding layout and styling are customized for the CarCheckerVIN brand.",
    },
    limitsHeading: "What NMVTIS Cannot Tell You",
    limits: {
      lead: "An NMVTIS-backed report is a powerful tool but it is ",
      doesNotInclude: "not a complete history",
      suffix: " of any vehicle. In particular, NMVTIS data does not include:",
      bullets: [
        "accidents or damage that were not reported to an insurance carrier or to law enforcement;",
        "service or maintenance records from independent shops that do not report to a national database;",
        "manufacturer-issued recall completion status (only the recall itself);",
        "outstanding loans, liens, or finance encumbrances on the vehicle;",
        "certified pre-owned (CPO) inspection records held by individual dealers;",
        "events occurring before NMVTIS reporting requirements were phased in for a given jurisdiction.",
      ],
      footer:
        "For these reasons, the U.S. Department of Justice and the federal NMVTIS program strongly recommend that every used-vehicle purchase be accompanied by an in-person inspection performed by a qualified mechanic of your choosing.",
    },
    alsoSee: {
      before: "See also our ",
      linkLabel: "Terms & Conditions",
      after: " for the full liability waiver and intellectual-property notice.",
    },
    backCta: "Back to checkout",
  },
  es: {
    backToCheckout: "\u2190 Volver al pago",
    eyebrow: "Divulgaci\u00f3n exigida por ley federal",
    h1: "Aviso legal NMVTIS",
    requiredBy:
      "Requerido por 49 U.S.C. \u00a7\u00a030502 y 28 C.F.R. Parte\u00a025, Subparte\u00a0C.",
    officialNoticeLabel: "Aviso oficial NMVTIS al consumidor",
    notice: {
      p1: "El National Motor Vehicle Title Information System (NMVTIS) es un sistema electr\u00f3nico que contiene informaci\u00f3n sobre ciertos veh\u00edculos titulados en Estados Unidos. NMVTIS est\u00e1 dise\u00f1ado para ser una fuente confiable del historial de t\u00edtulo y marcas de los veh\u00edculos, pero no contiene informaci\u00f3n detallada sobre el historial de reparaciones del veh\u00edculo.",
      p2: "La ley federal exige que todos los estados, aseguradoras y desguazadores de chatarra y salvamento reporten informaci\u00f3n al NMVTIS. Sin embargo, los datos NMVTIS los proveen los proveedores de datos actuales, y los datos de cualquier veh\u00edculo pueden no estar en el sistema si los proveedores de datos a\u00fan no est\u00e1n reportando. La informaci\u00f3n sobre la fecha de cualquier dato nuevo proporcionado se incluir\u00e1 en tu reporte.",
      p3: "Actualmente, las siguientes jurisdicciones est\u00e1n proporcionando datos de veh\u00edculos al NMVTIS: la informaci\u00f3n sobre la mayor\u00eda de los veh\u00edculos titulados en Estados Unidos est\u00e1 disponible a trav\u00e9s del sistema, incluyendo la mayor parte de la flota vehicular actual.",
      p4Strong: "NMVTIS tambi\u00e9n recoge informaci\u00f3n de las aseguradoras",
      p4Suffix:
        " que est\u00e1n obligadas por ley federal a reportar veh\u00edculos que han declarado p\u00e9rdida total. NMVTIS tambi\u00e9n recoge informaci\u00f3n de desguazadores de chatarra y salvamento que est\u00e1n obligados por ley federal a reportar los veh\u00edculos que reciben en sus instalaciones.",
      p5Strong:
        "Aunque NMVTIS est\u00e1 dise\u00f1ado para proteger al consumidor del fraude y de veh\u00edculos inseguros, los usuarios no deben depender \u00fanicamente del NMVTIS.",
      p5Suffix:
        " Los datos NMVTIS no incluyen datos de eventos de veh\u00edculos da\u00f1ados antes de la implementaci\u00f3n de los requisitos de reporte del NMVTIS; datos de da\u00f1os por colisi\u00f3n que no han sido reportados por una aseguradora participante; ni datos de da\u00f1os a veh\u00edculos en los que no se present\u00f3 un reclamo de seguro.",
      purchaseHeading:
        "Antes de comprar un veh\u00edculo, adem\u00e1s de obtener un reporte de historial vehicular, los consumidores deben:",
      bullets: [
        "Obtener una inspecci\u00f3n independiente del veh\u00edculo por un mec\u00e1nico calificado de su elecci\u00f3n.",
        "Verificar que el n\u00famero de identificaci\u00f3n vehicular (VIN) del veh\u00edculo coincida con el VIN del t\u00edtulo y de cualquier otro documento del veh\u00edculo.",
        "Examinar el t\u00edtulo para determinar si hay marcas registradas (es decir, inundaci\u00f3n, salvamento, chatarra, etc.).",
      ],
      p7Before:
        "Para m\u00e1s informaci\u00f3n sobre NMVTIS, los datos incluidos en el sistema y las definiciones de las marcas NMVTIS est\u00e1ndar, visita ",
      p7After: ".",
    },
    providerAttributionHeading: "Atribuci\u00f3n del proveedor de datos",
    providerAttribution: {
      p1Before:
        "Los datos respaldados por NMVTIS mostrados en tu reporte CarCheckerVIN los provee ",
      p1Mid: "ClearVin LLC",
      p1After:
        ", un proveedor de datos NMVTIS aprobado. Todos los derechos, t\u00edtulo e inter\u00e9s sobre los datos permanecen como propiedad de ClearVin y sus socios de datos subyacentes (DMVs estatales, NMVTIS, NHTSA, el National Insurance Crime Bureau, aseguradoras participantes, subastas de salvamento y contribuyentes independientes de registros de servicio).",
      p2: "CarCheckerVIN es operado por Coconut Ventures LLC, una sociedad de responsabilidad limitada de Nuevo M\u00e9xico con domicilio registrado en 412 W 7th St, Clovis, NM 88101, EE. UU., y es revendedor del servicio de datos NMVTIS de ClearVin. CarCheckerVIN no modifica, edita, altera ni omite ning\u00fan valor de los datos devueltos por ClearVin; solo el dise\u00f1o y estilo del entorno se personalizan para la marca CarCheckerVIN.",
    },
    limitsHeading: "Lo que NMVTIS no puede decirte",
    limits: {
      lead: "Un reporte respaldado por NMVTIS es una herramienta poderosa, pero ",
      doesNotInclude: "no es un historial completo",
      suffix: " de ning\u00fan veh\u00edculo. En particular, los datos NMVTIS no incluyen:",
      bullets: [
        "accidentes o da\u00f1os que no se reportaron a una aseguradora o a las autoridades;",
        "registros de servicio o mantenimiento de talleres independientes que no reportan a una base de datos nacional;",
        "el estado de cumplimiento de los retiros (recalls) del fabricante (solo el retiro en s\u00ed);",
        "pr\u00e9stamos pendientes, grav\u00e1menes o cargas financieras sobre el veh\u00edculo;",
        "registros de inspecci\u00f3n certified pre-owned (CPO) en poder de concesionarios individuales;",
        "eventos ocurridos antes de que los requisitos de reporte NMVTIS entraran en vigor en una jurisdicci\u00f3n dada.",
      ],
      footer:
        "Por estas razones, el Departamento de Justicia de EE. UU. y el programa federal NMVTIS recomiendan encarecidamente que cada compra de veh\u00edculo usado vaya acompa\u00f1ada de una inspecci\u00f3n presencial realizada por un mec\u00e1nico calificado de tu elecci\u00f3n.",
    },
    alsoSee: {
      before: "Consulta tambi\u00e9n nuestros ",
      linkLabel: "T\u00e9rminos y Condiciones",
      after: " para la renuncia de responsabilidad completa y el aviso de propiedad intelectual.",
    },
    backCta: "Volver al pago",
    reviewBannerTitle: "Traducci\u00f3n pendiente de validaci\u00f3n legal",
    reviewBannerBody:
      "La versi\u00f3n inglesa de esta divulgaci\u00f3n es la can\u00f3nica conforme a la ley federal de EE. UU. Esta traducci\u00f3n se proporciona como referencia y est\u00e1 sujeta a la revisi\u00f3n del equipo de cumplimiento de ClearVin LLC.",
    reviewBannerCta: "Leer la divulgaci\u00f3n en ingl\u00e9s",
  },
  fr: {
    backToCheckout: "\u2190 Retour au paiement",
    eyebrow: "Divulgation exig\u00e9e par la loi f\u00e9d\u00e9rale",
    h1: "Avertissement l\u00e9gal NMVTIS",
    requiredBy:
      "Requis par 49 U.S.C. \u00a7\u00a030502 et 28 C.F.R. Partie\u00a025, Sous-partie\u00a0C.",
    officialNoticeLabel: "Avis officiel NMVTIS au consommateur",
    notice: {
      p1: "Le National Motor Vehicle Title Information System (NMVTIS) est un syst\u00e8me \u00e9lectronique qui contient des informations sur certains v\u00e9hicules titr\u00e9s aux \u00c9tats-Unis. NMVTIS est con\u00e7u pour \u00eatre une source fiable de l'historique du titre et des marques des v\u00e9hicules, mais il ne contient pas d'informations d\u00e9taill\u00e9es sur l'historique de r\u00e9paration du v\u00e9hicule.",
      p2: "La loi f\u00e9d\u00e9rale exige que tous les \u00c9tats, les assureurs et les casses et chantiers de salvage signalent les informations au NMVTIS. Cependant, les donn\u00e9es NMVTIS sont fournies par les fournisseurs de donn\u00e9es actuels, et les donn\u00e9es de tout v\u00e9hicule peuvent ne pas \u00eatre dans le syst\u00e8me si les fournisseurs de donn\u00e9es ne signalent pas encore. L'information sur la date de toute nouvelle donn\u00e9e fournie sera incluse dans ton rapport.",
      p3: "Actuellement, les juridictions suivantes fournissent des donn\u00e9es de v\u00e9hicules au NMVTIS : l'information sur la plupart des v\u00e9hicules titr\u00e9s aux \u00c9tats-Unis est maintenant disponible \u00e0 travers le syst\u00e8me, y compris la plupart des v\u00e9hicules du parc actuel.",
      p4Strong: "NMVTIS collecte aussi des informations des assureurs",
      p4Suffix:
        " qui sont tenus par la loi f\u00e9d\u00e9rale de signaler les v\u00e9hicules qu'ils ont d\u00e9clar\u00e9s perte totale. NMVTIS collecte aussi des informations des casses et chantiers de salvage qui sont tenus par la loi f\u00e9d\u00e9rale de signaler les v\u00e9hicules re\u00e7us dans leurs installations.",
      p5Strong:
        "Bien que NMVTIS soit con\u00e7u pour prot\u00e9ger les consommateurs de la fraude et des v\u00e9hicules dangereux, les utilisateurs ne doivent pas se fier uniquement \u00e0 NMVTIS.",
      p5Suffix:
        " Les donn\u00e9es NMVTIS n'incluent pas les donn\u00e9es d'\u00e9v\u00e9nements de v\u00e9hicules endommag\u00e9s avant la mise en \u0153uvre des exigences de signalement NMVTIS ; les donn\u00e9es de dommages de collision qui n'ont pas \u00e9t\u00e9 signal\u00e9s par un assureur participant ; ni les donn\u00e9es de dommages aux v\u00e9hicules pour lesquels aucune r\u00e9clamation d'assurance n'a \u00e9t\u00e9 d\u00e9pos\u00e9e.",
      purchaseHeading:
        "Avant d'acheter un v\u00e9hicule, en plus d'obtenir un rapport d'historique du v\u00e9hicule, les consommateurs doivent :",
      bullets: [
        "Obtenir une inspection ind\u00e9pendante du v\u00e9hicule par un m\u00e9canicien qualifi\u00e9 de leur choix.",
        "V\u00e9rifier que le num\u00e9ro d'identification du v\u00e9hicule (VIN) sur le v\u00e9hicule correspond au VIN sur le titre et sur tout autre document du v\u00e9hicule.",
        "Examiner le titre pour d\u00e9terminer s'il y a des marques inscrites (c'est-\u00e0-dire inondation, salvage, casse, etc.).",
      ],
      p7Before:
        "Pour plus d'informations sur NMVTIS, les donn\u00e9es incluses dans le syst\u00e8me et les d\u00e9finitions des marques NMVTIS standard, visite ",
      p7After: ".",
    },
    providerAttributionHeading: "Attribution du fournisseur de donn\u00e9es",
    providerAttribution: {
      p1Before:
        "Les donn\u00e9es soutenues par NMVTIS affich\u00e9es dans ton rapport CarCheckerVIN sont fournies par ",
      p1Mid: "ClearVin LLC",
      p1After:
        ", un fournisseur de donn\u00e9es NMVTIS approuv\u00e9. Tous les droits, le titre et l'int\u00e9r\u00eat sur les donn\u00e9es restent la propri\u00e9t\u00e9 de ClearVin et de ses partenaires de donn\u00e9es sous-jacents (DMV d'\u00c9tat, NMVTIS, NHTSA, le National Insurance Crime Bureau, assureurs participants, ench\u00e8res de salvage et contributeurs ind\u00e9pendants de dossiers de service).",
      p2: "CarCheckerVIN est exploit\u00e9 par Coconut Ventures LLC, une soci\u00e9t\u00e9 \u00e0 responsabilit\u00e9 limit\u00e9e du Nouveau-Mexique avec si\u00e8ge social enregistr\u00e9 au 412 W 7th St, Clovis, NM 88101, \u00c9tats-Unis, et est un revendeur du service de donn\u00e9es NMVTIS de ClearVin. CarCheckerVIN ne modifie, n'\u00e9dite, n'alt\u00e8re ni n'omet aucune valeur de donn\u00e9es retourn\u00e9e par ClearVin ; seule la mise en page et le style environnants sont personnalis\u00e9s pour la marque CarCheckerVIN.",
    },
    limitsHeading: "Ce que NMVTIS ne peut pas te dire",
    limits: {
      lead: "Un rapport soutenu par NMVTIS est un outil puissant, mais ",
      doesNotInclude: "ce n'est pas un historique complet",
      suffix: " d'aucun v\u00e9hicule. En particulier, les donn\u00e9es NMVTIS n'incluent pas :",
      bullets: [
        "les accidents ou dommages qui n'ont pas \u00e9t\u00e9 signal\u00e9s \u00e0 un assureur ou aux forces de l'ordre ;",
        "les dossiers de service ou de maintenance d'ateliers ind\u00e9pendants qui ne signalent pas \u00e0 une base de donn\u00e9es nationale ;",
        "le statut d'ach\u00e8vement des rappels \u00e9mis par le fabricant (seulement le rappel lui-m\u00eame) ;",
        "les pr\u00eats en cours, privil\u00e8ges ou charges financi\u00e8res sur le v\u00e9hicule ;",
        "les dossiers d'inspection certified pre-owned (CPO) d\u00e9tenus par des concessionnaires individuels ;",
        "les \u00e9v\u00e9nements survenus avant que les exigences de signalement NMVTIS soient mises en place pour une juridiction donn\u00e9e.",
      ],
      footer:
        "Pour ces raisons, le D\u00e9partement de la Justice des \u00c9.-U. et le programme f\u00e9d\u00e9ral NMVTIS recommandent fortement que chaque achat de v\u00e9hicule d'occasion soit accompagn\u00e9 d'une inspection en personne effectu\u00e9e par un m\u00e9canicien qualifi\u00e9 de ton choix.",
    },
    alsoSee: {
      before: "Consulte aussi nos ",
      linkLabel: "Conditions g\u00e9n\u00e9rales",
      after: " pour la renonciation \u00e0 responsabilit\u00e9 compl\u00e8te et l'avis de propri\u00e9t\u00e9 intellectuelle.",
    },
    backCta: "Retour au paiement",
    reviewBannerTitle: "Traduction en attente de validation l\u00e9gale",
    reviewBannerBody:
      "La version anglaise de cette divulgation est la version canonique selon la loi f\u00e9d\u00e9rale des \u00c9.-U. Cette traduction est fournie \u00e0 titre de r\u00e9f\u00e9rence et est sujette \u00e0 la r\u00e9vision de l'\u00e9quipe de conformit\u00e9 de ClearVin LLC.",
    reviewBannerCta: "Lire la divulgation en anglais",
  },
};

interface Props {
  locale: Locale;
}

export default function DisclaimerBody({ locale }: Props) {
  const copy = COPY[locale];
  const homeHref = locale === "es" ? "/es" : "/";
  const termsHref = locale === "es" ? "/es/terms" : "/terms";
  const englishHref = "/disclaimer";

  return (
    <div className="bg-surface min-h-[calc(100vh-200px)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <Link
          href={homeHref}
          className="text-sm text-primary hover:text-primary-700 inline-flex items-center gap-1 mb-6"
        >
          {copy.backToCheckout}
        </Link>

        <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider bg-blue-50 border border-blue-200 text-blue-800 px-2.5 py-1 rounded-full mb-4">
          <ShieldCheck className="w-3 h-3" />
          {copy.eyebrow}
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">{copy.h1}</h1>
        <p className="mt-2 text-sm text-slate-500">{copy.requiredBy}</p>

        {locale === "es" && copy.reviewBannerTitle && (
          <div className="mt-6 p-4 rounded-2xl bg-amber-50 border border-amber-200">
            <div className="flex items-start gap-3">
              <TriangleAlert className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-amber-900">{copy.reviewBannerTitle}</p>
                <p className="mt-1 text-xs text-amber-900 leading-relaxed">
                  {copy.reviewBannerBody}
                </p>
                <Link
                  href={englishHref}
                  className="mt-2 inline-block text-xs font-bold text-amber-900 underline"
                >
                  {copy.reviewBannerCta} →
                </Link>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 space-y-6 text-sm text-slate-700 leading-relaxed">
          <div className="bg-white border-2 border-slate-300 rounded-2xl p-6 sm:p-8">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              {copy.officialNoticeLabel}
            </p>
            <p>{copy.notice.p1}</p>
            <p className="mt-3">{copy.notice.p2}</p>
            <p className="mt-3">{copy.notice.p3}</p>
            <p className="mt-3">
              <strong>{copy.notice.p4Strong}</strong>
              {copy.notice.p4Suffix}
            </p>
            <p className="mt-3">
              <strong>{copy.notice.p5Strong}</strong>
              {copy.notice.p5Suffix}
            </p>
            <p className="mt-3">
              <strong>{copy.notice.purchaseHeading}</strong>
            </p>
            <ul className="mt-2 ml-5 space-y-1.5 list-disc">
              {copy.notice.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <p className="mt-3">
              {copy.notice.p7Before}
              <a
                href="https://vehiclehistory.bja.ojp.gov"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-primary hover:text-primary-700 inline-flex items-center gap-0.5"
              >
                vehiclehistory.bja.ojp.gov
                <ExternalLink className="w-3 h-3" />
              </a>
              {copy.notice.p7After}
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-3">
              <Info className="w-4 h-4 text-blue-700" />
              {copy.providerAttributionHeading}
            </h2>
            <p>
              {copy.providerAttribution.p1Before}
              <strong>{copy.providerAttribution.p1Mid}</strong>
              {copy.providerAttribution.p1After}
            </p>
            <p className="mt-2">{copy.providerAttribution.p2}</p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 sm:p-7">
            <h2 className="text-base font-bold text-amber-900 flex items-center gap-2 mb-3">
              <TriangleAlert className="w-4 h-4" />
              {copy.limitsHeading}
            </h2>
            <p className="text-amber-900">
              {copy.limits.lead}
              <strong>{copy.limits.doesNotInclude}</strong>
              {copy.limits.suffix}
            </p>
            <ul className="mt-2 ml-5 space-y-1.5 list-disc text-amber-900">
              {copy.limits.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <p className="mt-3 text-amber-900">{copy.limits.footer}</p>
          </div>

          <p className="text-xs text-slate-500 text-center">
            {copy.alsoSee.before}
            <Link href={termsHref} className="underline hover:text-slate-900">
              {copy.alsoSee.linkLabel}
            </Link>
            {copy.alsoSee.after}
          </p>
        </div>

        <div className="mt-8 text-center">
          <Link
            href={homeHref}
            className="inline-block px-5 py-2.5 bg-primary hover:bg-primary-700 text-white text-sm font-bold rounded-xl transition"
          >
            {copy.backCta}
          </Link>
        </div>
      </div>
    </div>
  );
}
