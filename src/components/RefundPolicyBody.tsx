/**
 * Shared body for /refund-policy and /es/refund-policy.
 * Wave 18 batch 4 — full English layout in both locales via COPY={en,es}.
 * Compliance-sensitive — ES strings come from the Wave 18c translation
 * that previously lived inline in /es/refund-policy.
 */

import Link from "@/components/LocaleLink";
import { Fragment } from "react";
import type { Locale } from "@/i18n/config";

const SUPPORT_EMAIL = "contact@carcheckervin.com";
const SUPPORT_PHONE = "+1 (564) 212-3985";

const COPY = {
  en: {
    h1: "Refund Policy",
    lastUpdatedLabel: "Last updated:",
    lastUpdatedValue: "May 24, 2026",
    bannerHeading: "Policy in one sentence",
    bannerBefore: "We issue a refund ",
    bannerBoldOnly: "only",
    bannerMid: " when the data in your CarCheckerVIN report does ",
    bannerBoldNot: "not",
    bannerSuffix:
      " match the actual vehicle identified by the VIN you submitted. All other refund requests are not eligible.",
    h2Overview: "1. Overview",
    overview: {
      pre: "",
      brandBold: "CarCheckerVIN",
      mid: " (carcheckervin.com) is operated by ",
      companyBold: "Cognifyx Solutions LLC",
      suffix:
        ", a New Mexico limited liability company with its registered office at 1209 Mountain Road Pl NE, Ste N, Albuquerque, NM 87110, United States. CarCheckerVIN sells digital vehicle history reports that are generated and delivered instantly the moment payment is received. Because each report is a one-time digital product produced on demand from third-party automotive databases, refunds are limited to the single circumstance described below.",
    },
    h2Eligible: "2. The only refund-eligible scenario",
    eligibleLead:
      "A refund will be issued if, and only if, the report you purchased contains data that does not correspond to the vehicle identified by the VIN you entered at checkout. This includes situations where the report returns:",
    eligibleBullets: [
      "A different year, make, or model than the vehicle attached to the VIN by federal records (NHTSA / NMVTIS);",
      "Specifications or equipment that are demonstrably and materially inconsistent with the actual vehicle for that VIN;",
      "A vehicle of a different class entirely (for example, a motorcycle returned for a passenger-car VIN, or vice versa).",
    ],
    h2NotPre: "3. What is ",
    h2NotEm: "not",
    h2NotSuf: " eligible for a refund",
    notLead:
      "To set clear expectations before purchase, the following situations do not qualify for a refund:",
    notBullets: [
      "Buyer\u2019s remorse, change of mind, accidental purchase, or ordering the wrong VIN.",
      "Limited or absent records for older vehicles (typically pre-1981 VINs), salvage-only vehicles, or non-US vehicles where third-party databases hold less data.",
      "Disagreement with the report\u2019s findings (for example, an accident, recall, lien, or title brand that the customer believes should not be listed) when the underlying data is accurately reflected from the source database.",
      "Inability to access the report because of an expired email link, missing receipt, or local device/network issue \u2014 in these cases we resend the report at no charge.",
      "Reports that the customer believes are incomplete because a third-party database did not return certain fields (for example, missing photos, missing market-value comparables, or unavailable equipment details). Where third-party providers return no data, CarCheckerVIN cannot synthesize it.",
      "Reports purchased through any third-party reseller, gift card, promotional credit, or VIN that was already reported on within the same billing cycle.",
      "Subscriptions or bundles after a report has been generated from the bundle. Unused report credits within a bundle remain redeemable but are not refundable in cash.",
    ],
    h2Evidence: "4. Evidence required",
    evidencePre: "To process a mismatch claim, please send the following to ",
    evidenceMid: " within ",
    evidenceBold: "30 days",
    evidenceSuf: " of the original purchase:",
    evidenceBullets: [
      "The 17-digit VIN you submitted and your order or receipt ID.",
      "A photo of the vehicle\u2019s VIN plate, registration document, or title clearly showing the same VIN.",
      "A short note describing which field(s) in the report do not match the actual vehicle (year / make / model / class / other).",
    ],
    evidenceFooterPre: "Our team will review the claim, cross-check the source database, and reply within ",
    evidenceFooterBold: "3 business days",
    evidenceFooterSuf: ".",
    h2Issued: "5. How refunds are issued",
    issuedPre:
      "Approved refunds are issued to the original payment method used at checkout. Most card networks display the credit within ",
    issuedBold: "5\u201310 business days",
    issuedSuf:
      ". Bank-transfer or wallet payments may take longer depending on the processor. We do not issue cash, store credit, or alternative-method refunds for an approved card-payment claim.",
    h2Chargebacks: "6. Chargebacks",
    chargebacksPre: "We strongly prefer that customers contact ",
    chargebacksSuf:
      " before initiating a payment-card chargeback. Most eligible requests are resolved within one business day. Chargebacks filed without first contacting us will be contested with evidence including the VIN submitted, the report delivered, the timestamp of delivery, and the IP address used at checkout.",
    h2Free: "7. Free reports",
    free:
      "Reports generated under a free tier or promotional credit have no monetary value and are therefore not refundable, but you may still report a data mismatch using the process above so we can flag the underlying record with our data providers.",
    h2Changes: "8. Changes to this policy",
    changes:
      "We may update this policy from time to time. Material changes will be announced on this page and the \u201cLast updated\u201d date above will be revised. Refund requests are evaluated under the policy in effect at the time of the original purchase.",
    h2Contact: "9. Contact",
    contactLead: "Refund requests, evidence submissions, and any policy questions:",
    emailLabel: "Email: ",
    phoneLabel: "Phone: ",
    phoneHours: " (Mon\u2013Fri, 9:00\u201318:00 US ET)",
    relatedLabel: "Related pages: ",
    relatedLinks: [
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  es: {
    h1: "Política de reembolsos",
    lastUpdatedLabel: "Última actualización:",
    lastUpdatedValue: "24 de mayo de 2026",
    bannerHeading: "La política en una frase",
    bannerBefore: "Emitimos un reembolso ",
    bannerBoldOnly: "únicamente",
    bannerMid: " cuando los datos de tu reporte CarCheckerVIN ",
    bannerBoldNot: "no",
    bannerSuffix:
      " coinciden con el vehículo real identificado por el VIN que enviaste. Todas las demás solicitudes de reembolso no son elegibles.",
    h2Overview: "1. Resumen",
    overview: {
      pre: "",
      brandBold: "CarCheckerVIN",
      mid: " (carcheckervin.com) es operado por ",
      companyBold: "Cognifyx Solutions LLC",
      suffix:
        ", una sociedad de responsabilidad limitada de Nuevo México con domicilio registrado en 1209 Mountain Road Pl NE, Ste N, Albuquerque, NM 87110, Estados Unidos. CarCheckerVIN vende reportes digitales de historial vehicular que se generan y entregan al instante en el momento en que se recibe el pago. Debido a que cada reporte es un producto digital único producido bajo demanda a partir de bases de datos automotrices de terceros, los reembolsos se limitan a la única circunstancia descrita a continuación.",
    },
    h2Eligible: "2. El único escenario elegible para reembolso",
    eligibleLead:
      "Se emitirá un reembolso si, y solo si, el reporte que compraste contiene datos que no corresponden al vehículo identificado por el VIN que ingresaste en el pago. Esto incluye situaciones en las que el reporte devuelve:",
    eligibleBullets: [
      "Un año, marca o modelo diferente al vehículo vinculado al VIN por registros federales (NHTSA / NMVTIS);",
      "Especificaciones o equipamiento que son demostrable y materialmente inconsistentes con el vehículo real para ese VIN;",
      "Un vehículo de una clase completamente diferente (por ejemplo, una motocicleta devuelta para un VIN de auto de pasajeros, o viceversa).",
    ],
    h2NotPre: "3. Qué ",
    h2NotEm: "no",
    h2NotSuf: " es elegible para reembolso",
    notLead:
      "Para establecer expectativas claras antes de la compra, las siguientes situaciones no califican para reembolso:",
    notBullets: [
      "Arrepentimiento del comprador, cambio de opinión, compra accidental o haber pedido el VIN equivocado.",
      "Registros limitados o ausentes para vehículos antiguos (típicamente VINs anteriores a 1981), vehículos solo de salvamento o vehículos no estadounidenses donde las bases de datos de terceros tienen menos información.",
      "Desacuerdo con los hallazgos del reporte (por ejemplo, un accidente, recall, gravamen o marca de título que el cliente cree que no debería aparecer) cuando los datos subyacentes se reflejan con precisión desde la base de datos de origen.",
      "Imposibilidad de acceder al reporte debido a un enlace de correo expirado, recibo faltante o problemas locales de dispositivo/red \u2014 en estos casos reenviamos el reporte sin cargo.",
      "Reportes que el cliente considera incompletos porque una base de datos de terceros no devolvió ciertos campos (por ejemplo, fotos faltantes, comparables de valor de mercado faltantes o detalles de equipamiento no disponibles). Cuando los proveedores externos no devuelven datos, CarCheckerVIN no puede sintetizarlos.",
      "Reportes comprados a través de cualquier revendedor externo, tarjeta de regalo, crédito promocional o VIN que ya fue reportado dentro del mismo ciclo de facturación.",
      "Suscripciones o paquetes después de que se haya generado un reporte desde el paquete. Los créditos de reporte no utilizados dentro de un paquete siguen siendo canjeables pero no son reembolsables en efectivo.",
    ],
    h2Evidence: "4. Evidencia requerida",
    evidencePre: "Para procesar un reclamo por discrepancia, envía lo siguiente a ",
    evidenceMid: " dentro de los ",
    evidenceBold: "30 días",
    evidenceSuf: " posteriores a la compra original:",
    evidenceBullets: [
      "El VIN de 17 dígitos que enviaste y tu identificador de orden o recibo.",
      "Una foto de la placa VIN del vehículo, documento de registro o título que muestre claramente el mismo VIN.",
      "Una nota breve describiendo qué campo(s) del reporte no coinciden con el vehículo real (año / marca / modelo / clase / otro).",
    ],
    evidenceFooterPre: "Nuestro equipo revisará el reclamo, verificará la base de datos de origen y responderá dentro de ",
    evidenceFooterBold: "3 días hábiles",
    evidenceFooterSuf: ".",
    h2Issued: "5. Cómo se emiten los reembolsos",
    issuedPre:
      "Los reembolsos aprobados se emiten al método de pago original utilizado en el pago. La mayoría de las redes de tarjetas muestran el crédito dentro de ",
    issuedBold: "5 a 10 días hábiles",
    issuedSuf:
      ". Los pagos por transferencia bancaria o billetera electrónica pueden tardar más dependiendo del procesador. No emitimos reembolsos en efectivo, crédito de tienda ni de método alternativo para un reclamo de pago con tarjeta aprobado.",
    h2Chargebacks: "6. Contracargos",
    chargebacksPre: "Recomendamos enfáticamente que los clientes contacten a ",
    chargebacksSuf:
      " antes de iniciar un contracargo con la tarjeta de pago. La mayoría de las solicitudes elegibles se resuelven dentro de un día hábil. Los contracargos presentados sin contactarnos primero serán impugnados con evidencia que incluye el VIN enviado, el reporte entregado, el sello de tiempo de entrega y la dirección IP utilizada en el pago.",
    h2Free: "7. Reportes gratuitos",
    free:
      "Los reportes generados bajo un nivel gratuito o crédito promocional no tienen valor monetario y por lo tanto no son reembolsables, pero aún puedes reportar una discrepancia de datos usando el proceso anterior para que podamos marcar el registro subyacente con nuestros proveedores de datos.",
    h2Changes: "8. Cambios a esta política",
    changes:
      "Podemos actualizar esta política ocasionalmente. Los cambios materiales se anunciarán en esta página y la fecha de \u201cÚltima actualización\u201d será revisada. Las solicitudes de reembolso se evalúan bajo la política vigente al momento de la compra original.",
    h2Contact: "9. Contacto",
    contactLead: "Solicitudes de reembolso, envíos de evidencia y preguntas sobre la política:",
    emailLabel: "Correo: ",
    phoneLabel: "Teléfono: ",
    phoneHours: " (Lun\u2013Vie, 9:00\u201318:00 hora del Este de EE. UU.)",
    relatedLabel: "Páginas relacionadas: ",
    relatedLinks: [
      { label: "Términos de servicio", href: "/terms" },
      { label: "Política de privacidad", href: "/privacy" },
      { label: "Precios", href: "/pricing" },
    ],
  },
  fr: {
    h1: "Politique de remboursement",
    lastUpdatedLabel: "Dernière mise à jour :",
    lastUpdatedValue: "24 mai 2026",
    bannerHeading: "La politique en une phrase",
    bannerBefore: "Nous émettons un remboursement ",
    bannerBoldOnly: "uniquement",
    bannerMid: " lorsque les données de ton rapport CarCheckerVIN ne ",
    bannerBoldNot: "correspondent pas",
    bannerSuffix:
      " au véhicule réel identifié par le VIN que tu as soumis. Toutes les autres demandes de remboursement ne sont pas éligibles.",
    h2Overview: "1. Aperçu",
    overview: {
      pre: "",
      brandBold: "CarCheckerVIN",
      mid: " (carcheckervin.com) est exploité par ",
      companyBold: "Cognifyx Solutions LLC",
      suffix:
        ", une société à responsabilité limitée du Nouveau-Mexique dont le siège social est situé au 1209 Mountain Road Pl NE, Ste N, Albuquerque, NM 87110, États-Unis. CarCheckerVIN vend des rapports numériques d'historique de véhicule qui sont générés et livrés instantanément dès la réception du paiement. Comme chaque rapport est un produit numérique unique produit à la demande à partir de bases de données automobiles tierces, les remboursements sont limités à la seule circonstance décrite ci-dessous.",
    },
    h2Eligible: "2. Le seul scénario éligible au remboursement",
    eligibleLead:
      "Un remboursement sera émis si, et seulement si, le rapport que tu as acheté contient des données qui ne correspondent pas au véhicule identifié par le VIN que tu as saisi au moment du paiement. Cela inclut les situations où le rapport renvoie :",
    eligibleBullets: [
      "Une année, marque ou modèle différent du véhicule rattaché au VIN par les registres fédéraux (NHTSA / NMVTIS) ;",
      "Des spécifications ou équipements qui sont manifestement et matériellement incohérents avec le véhicule réel pour ce VIN ;",
      "Un véhicule d'une catégorie entièrement différente (par exemple, une moto retournée pour un VIN de voiture de tourisme, ou vice versa).",
    ],
    h2NotPre: "3. Ce qui ",
    h2NotEm: "n'est pas",
    h2NotSuf: " éligible au remboursement",
    notLead:
      "Pour fixer des attentes claires avant l'achat, les situations suivantes ne sont pas éligibles au remboursement :",
    notBullets: [
      "Remords de l'acheteur, changement d'avis, achat accidentel ou commande du mauvais VIN.",
      "Registres limités ou absents pour les véhicules anciens (typiquement VIN antérieurs à 1981), véhicules uniquement de récupération ou véhicules non américains où les bases de données tierces contiennent moins de données.",
      "Désaccord avec les conclusions du rapport (par exemple, un accident, un rappel, un privilège ou une marque de titre que le client estime ne devoir pas être listé) lorsque les données sous-jacentes sont fidèlement reflétées depuis la base de données source.",
      "Impossibilité d'accéder au rapport en raison d'un lien e-mail expiré, d'un reçu manquant ou d'un problème local d'appareil/de réseau \u2014 dans ces cas, nous renvoyons le rapport sans frais.",
      "Rapports que le client estime incomplets parce qu'une base de données tierce n'a pas renvoyé certains champs (par exemple, photos manquantes, comparables de valeur de marché manquants ou détails d'équipement non disponibles). Lorsque les fournisseurs tiers ne renvoient pas de données, CarCheckerVIN ne peut pas les synthétiser.",
      "Rapports achetés via un revendeur tiers, une carte cadeau, un crédit promotionnel ou un VIN qui a déjà été interrogé dans le même cycle de facturation.",
      "Abonnements ou forfaits après qu'un rapport a été généré à partir du forfait. Les crédits de rapport inutilisés au sein d'un forfait restent utilisables mais ne sont pas remboursables en espèces.",
    ],
    h2Evidence: "4. Preuves requises",
    evidencePre: "Pour traiter une réclamation de non-correspondance, envoie ce qui suit à ",
    evidenceMid: " dans les ",
    evidenceBold: "30 jours",
    evidenceSuf: " suivant l'achat initial :",
    evidenceBullets: [
      "Le VIN à 17 chiffres que tu as soumis et ton identifiant de commande ou de reçu.",
      "Une photo de la plaque VIN du véhicule, du document d'immatriculation ou du titre montrant clairement le même VIN.",
      "Une courte note décrivant quel(s) champ(s) du rapport ne correspondent pas au véhicule réel (année / marque / modèle / catégorie / autre).",
    ],
    evidenceFooterPre: "Notre équipe examinera la réclamation, recoupera la base de données source et répondra dans un délai de ",
    evidenceFooterBold: "3 jours ouvrables",
    evidenceFooterSuf: ".",
    h2Issued: "5. Comment les remboursements sont émis",
    issuedPre:
      "Les remboursements approuvés sont émis sur le mode de paiement original utilisé au moment du paiement. La plupart des réseaux de cartes affichent le crédit dans les ",
    issuedBold: "5 à 10 jours ouvrables",
    issuedSuf:
      ". Les paiements par virement bancaire ou portefeuille électronique peuvent prendre plus de temps selon le processeur. Nous n'émettons pas de remboursements en espèces, en crédit boutique ou par méthode alternative pour une réclamation de paiement par carte approuvée.",
    h2Chargebacks: "6. Rétrofacturations",
    chargebacksPre: "Nous préférons fortement que les clients contactent ",
    chargebacksSuf:
      " avant d'initier une rétrofacturation par carte de paiement. La plupart des demandes éligibles sont résolues dans un jour ouvrable. Les rétrofacturations déposées sans nous contacter d'abord seront contestées avec des preuves incluant le VIN soumis, le rapport livré, l'horodatage de la livraison et l'adresse IP utilisée au moment du paiement.",
    h2Free: "7. Rapports gratuits",
    free:
      "Les rapports générés sous un niveau gratuit ou un crédit promotionnel n'ont aucune valeur monétaire et ne sont donc pas remboursables, mais tu peux toujours signaler une non-correspondance de données en utilisant le processus ci-dessus afin que nous puissions signaler l'enregistrement sous-jacent à nos fournisseurs de données.",
    h2Changes: "8. Modifications de cette politique",
    changes:
      "Nous pouvons mettre à jour cette politique de temps à autre. Les changements importants seront annoncés sur cette page et la date de \u00ab Dernière mise à jour \u00bb ci-dessus sera révisée. Les demandes de remboursement sont évaluées en vertu de la politique en vigueur au moment de l'achat initial.",
    h2Contact: "9. Contact",
    contactLead: "Demandes de remboursement, soumissions de preuves et toute question sur la politique :",
    emailLabel: "E-mail : ",
    phoneLabel: "Téléphone : ",
    phoneHours: " (lun\u2013ven, 9 h\u201318 h, heure de l'Est des États-Unis)",
    relatedLabel: "Pages connexes : ",
    relatedLinks: [
      { label: "Conditions d'utilisation", href: "/terms" },
      { label: "Politique de confidentialité", href: "/privacy" },
      { label: "Tarifs", href: "/pricing" },
    ],
  },
} as const;

interface Props {
  locale: Locale;
}

export default function RefundPolicyBody({ locale }: Props) {
  const c = COPY[locale];
  const link = (en: string) => (locale === "es" ? `/es${en}` : en);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
      <h1 className="text-3xl font-bold text-slate-900 mb-3">{c.h1}</h1>
      <p className="text-sm text-slate-500 mb-8">
        <strong>{c.lastUpdatedLabel}</strong> {c.lastUpdatedValue}
      </p>

      <div className="prose prose-slate max-w-none space-y-6 text-slate-600 leading-relaxed">
        <div className="not-prose rounded-2xl border-2 border-primary/30 bg-primary/5 p-5 sm:p-6">
          <h2 className="text-base font-bold text-primary mb-2 uppercase tracking-wide">
            {c.bannerHeading}
          </h2>
          <p className="text-slate-800 leading-relaxed">
            {c.bannerBefore}
            <strong>{c.bannerBoldOnly}</strong>
            {c.bannerMid}
            <strong>{c.bannerBoldNot}</strong>
            {c.bannerSuffix}
          </p>
        </div>

        <h2 className="text-xl font-semibold text-slate-900 mt-8">{c.h2Overview}</h2>
        <p>
          {c.overview.pre}
          <strong>{c.overview.brandBold}</strong>
          {c.overview.mid}
          <strong>{c.overview.companyBold}</strong>
          {c.overview.suffix}
        </p>

        <h2 className="text-xl font-semibold text-slate-900 mt-8">{c.h2Eligible}</h2>
        <p>{c.eligibleLead}</p>
        <ul className="list-disc pl-6 space-y-1.5">
          {c.eligibleBullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold text-slate-900 mt-8">
          {c.h2NotPre}
          <em>{c.h2NotEm}</em>
          {c.h2NotSuf}
        </h2>
        <p>{c.notLead}</p>
        <ul className="list-disc pl-6 space-y-1.5">
          {c.notBullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold text-slate-900 mt-8">{c.h2Evidence}</h2>
        <p>
          {c.evidencePre}
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="text-primary-600 hover:underline"
          >
            {SUPPORT_EMAIL}
          </a>
          {c.evidenceMid}
          <strong>{c.evidenceBold}</strong>
          {c.evidenceSuf}
        </p>
        <ul className="list-disc pl-6 space-y-1.5">
          {c.evidenceBullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
        <p>
          {c.evidenceFooterPre}
          <strong>{c.evidenceFooterBold}</strong>
          {c.evidenceFooterSuf}
        </p>

        <h2 className="text-xl font-semibold text-slate-900 mt-8">{c.h2Issued}</h2>
        <p>
          {c.issuedPre}
          <strong>{c.issuedBold}</strong>
          {c.issuedSuf}
        </p>

        <h2 className="text-xl font-semibold text-slate-900 mt-8">{c.h2Chargebacks}</h2>
        <p>
          {c.chargebacksPre}
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="text-primary-600 hover:underline"
          >
            {SUPPORT_EMAIL}
          </a>
          {c.chargebacksSuf}
        </p>

        <h2 className="text-xl font-semibold text-slate-900 mt-8">{c.h2Free}</h2>
        <p>{c.free}</p>

        <h2 className="text-xl font-semibold text-slate-900 mt-8">{c.h2Changes}</h2>
        <p>{c.changes}</p>

        <h2 className="text-xl font-semibold text-slate-900 mt-8">{c.h2Contact}</h2>
        <p>{c.contactLead}</p>
        <ul className="list-none pl-0 space-y-1.5">
          <li>
            {c.emailLabel}
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="text-primary-600 hover:underline"
            >
              {SUPPORT_EMAIL}
            </a>
          </li>
          <li>
            {c.phoneLabel}
            <a
              href={`tel:${SUPPORT_PHONE.replace(/[^+\d]/g, "")}`}
              className="text-primary-600 hover:underline"
            >
              {SUPPORT_PHONE}
            </a>
            {c.phoneHours}
          </li>
          <li>
            {c.relatedLabel}
            {c.relatedLinks.map((rl, i) => (
              <Fragment key={rl.href}>
                <Link href={link(rl.href)} className="text-primary-600 hover:underline">
                  {rl.label}
                </Link>
                {i < c.relatedLinks.length - 1 && " \u00b7 "}
              </Fragment>
            ))}
          </li>
        </ul>
      </div>
    </div>
  );
}
