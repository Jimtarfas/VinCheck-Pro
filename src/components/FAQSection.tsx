"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Locale } from "@/i18n/config";

const COPY = {
  en: {
    heading: "Frequently Asked Questions",
    sub: "Everything you need to know about CarCheckerVIN reports.",
    faqs: [
      {
        question: "What is a VIN and where can I find it?",
        answer: "A Vehicle Identification Number (VIN) is a unique 17-character code assigned to every motor vehicle. You can find it on the driver-side dashboard (visible through the windshield), the driver-side door jamb sticker, your vehicle registration, or insurance documents.",
      },
      {
        question: "What information is included in a CarCheckerVIN report?",
        answer: "Our reports include complete vehicle specifications (engine, transmission, drivetrain), all factory-installed options and equipment, market value estimates, recall information, real vehicle photos, and detailed technical data sourced from NMVTIS and manufacturer databases.",
      },
      {
        question: "How quickly will I receive my VIN report?",
        answer: "VIN reports are generated instantly — typically in under 60 seconds. Once your VIN is decoded, you'll see the full vehicle history report immediately on screen.",
      },
      {
        question: "Which vehicles are covered by your VIN decoder?",
        answer: "We cover vehicles manufactured from 1981 onwards (when the 17-character VIN standard was adopted). This includes cars, trucks, SUVs, and vans from all major manufacturers worldwide including Toyota, Ford, Honda, Chevrolet, BMW, Mercedes-Benz, and more.",
      },
      {
        question: "Is a VIN check useful for sellers too?",
        answer: "Absolutely! Sellers use VIN check reports to document vehicle condition, build buyer confidence, and justify asking prices. A clean vehicle report can help you sell faster and at a higher price.",
      },
      {
        question: "How is your VIN check different from free VIN decoders?",
        answer: "Free VIN decoders typically only show basic make/model/year info. Our VIN checker provides comprehensive data including full equipment lists, factory options, engine specifications, transmission details, real vehicle photos, and market valuations sourced from trusted industry databases.",
      },
      {
        question: "Can a VIN check tell me if a car was stolen?",
        answer: "Yes. Our reports cross-reference the VIN against the National Insurance Crime Bureau (NICB) database. If a vehicle is reported stolen and not yet recovered — or has been recovered as a salvage total loss — the report will flag it.",
      },
      {
        question: "Will a VIN check show me odometer rollback?",
        answer: "Premium reports show all reported mileage readings from inspections, title transfers, and service records. Inconsistencies in the timeline are a strong indicator of odometer fraud, which costs U.S. consumers over $1 billion per year.",
      },
      {
        question: "Is this VIN check service really free?",
        answer: "Yes — and for a limited time every single plan is completely free, including full premium reports with history, market values, photos, and detailed analysis. No credit card required. Regular pricing (starting at $14.99) resumes when the promotion ends.",
      },
    ],
  },
  es: {
    heading: "Preguntas frecuentes",
    sub: "Todo lo que necesitas saber sobre los reportes de CarCheckerVIN.",
    faqs: [
      {
        question: "¿Qué es un VIN y dónde lo encuentro?",
        answer: "El Número de Identificación Vehicular (VIN) es un código único de 17 caracteres asignado a cada vehículo a motor. Puedes encontrarlo en el tablero del lado del conductor (visible a través del parabrisas), en la calcomanía del marco de la puerta del conductor, en tu registro vehicular o en los documentos del seguro.",
      },
      {
        question: "¿Qué información incluye un reporte de CarCheckerVIN?",
        answer: "Nuestros reportes incluyen especificaciones completas del vehículo (motor, transmisión, tracción), todas las opciones y equipamiento de fábrica, estimaciones de valor de mercado, información de retiros, fotos reales del vehículo y datos técnicos detallados provenientes de NMVTIS y bases de datos de fabricantes.",
      },
      {
        question: "¿Qué tan rápido recibiré mi reporte VIN?",
        answer: "Los reportes VIN se generan al instante — normalmente en menos de 60 segundos. Una vez decodificado el VIN, verás el reporte completo del historial del vehículo inmediatamente en pantalla.",
      },
      {
        question: "¿Qué vehículos cubre su decodificador VIN?",
        answer: "Cubrimos vehículos fabricados desde 1981 en adelante (cuando se adoptó el estándar del VIN de 17 caracteres). Esto incluye autos, camiones, SUVs y vans de todos los principales fabricantes incluyendo Toyota, Ford, Honda, Chevrolet, BMW, Mercedes-Benz y más.",
      },
      {
        question: "¿Es útil una revisión VIN también para vendedores?",
        answer: "¡Absolutamente! Los vendedores usan los reportes VIN para documentar la condición del vehículo, generar confianza en el comprador y justificar el precio. Un reporte limpio puede ayudarte a vender más rápido y a mejor precio.",
      },
      {
        question: "¿En qué se diferencia su revisión VIN de los decodificadores gratis?",
        answer: "Los decodificadores VIN gratis típicamente solo muestran información básica de marca/modelo/año. Nuestro verificador VIN ofrece datos completos incluyendo listas completas de equipamiento, opciones de fábrica, especificaciones del motor, detalles de transmisión, fotos reales y valoraciones de mercado de bases de datos confiables.",
      },
      {
        question: "¿Una revisión VIN puede decirme si un auto fue robado?",
        answer: "Sí. Nuestros reportes cruzan el VIN contra la base de datos del National Insurance Crime Bureau (NICB). Si un vehículo está reportado como robado y no ha sido recuperado — o ha sido recuperado como pérdida total — el reporte lo marcará.",
      },
      {
        question: "¿Una revisión VIN me mostrará si hubo retroceso de odómetro?",
        answer: "Los reportes premium muestran todas las lecturas de kilometraje reportadas en inspecciones, transferencias de título y registros de servicio. Las inconsistencias en la cronología son un fuerte indicador de fraude de odómetro, que cuesta a los consumidores estadounidenses más de mil millones de dólares al año.",
      },
      {
        question: "¿Este servicio de revisión VIN es realmente gratis?",
        answer: "Sí — y por tiempo limitado todos los planes son completamente gratis, incluyendo reportes premium completos con historial, valor de mercado, fotos y análisis detallado. Sin tarjeta de crédito. Los precios regulares (desde $14.99) se reanudan al terminar la promoción.",
      },
    ],
  },
  fr: {
    heading: "Questions fréquentes",
    sub: "Tout ce que tu dois savoir sur les rapports CarCheckerVIN.",
    faqs: [
      {
        question: "Qu'est-ce qu'un VIN et où puis-je le trouver ?",
        answer: "Le Numéro d'Identification du Véhicule (VIN) est un code unique de 17 caractères attribué à chaque véhicule à moteur. Tu peux le trouver sur le tableau de bord côté conducteur (visible à travers le pare-brise), sur l'autocollant du montant de la portière conducteur, sur ta carte grise ou sur tes documents d'assurance.",
      },
      {
        question: "Quelles informations sont incluses dans un rapport CarCheckerVIN ?",
        answer: "Nos rapports incluent les spécifications complètes du véhicule (moteur, transmission, transmission intégrale), toutes les options et équipements d'usine, les estimations de valeur de marché, les informations de rappel, des vraies photos du véhicule et des données techniques détaillées issues de NMVTIS et des bases de données constructeurs.",
      },
      {
        question: "À quelle vitesse vais-je recevoir mon rapport VIN ?",
        answer: "Les rapports VIN sont générés instantanément — généralement en moins de 60 secondes. Une fois ton VIN décodé, tu verras immédiatement le rapport complet d'historique du véhicule à l'écran.",
      },
      {
        question: "Quels véhicules sont couverts par votre décodeur VIN ?",
        answer: "Nous couvrons les véhicules fabriqués à partir de 1981 (lorsque la norme VIN à 17 caractères a été adoptée). Cela inclut les voitures, camions, SUV et fourgonnettes de tous les grands constructeurs mondiaux, dont Toyota, Ford, Honda, Chevrolet, BMW, Mercedes-Benz et plus encore.",
      },
      {
        question: "Une vérification VIN est-elle aussi utile pour les vendeurs ?",
        answer: "Absolument ! Les vendeurs utilisent les rapports de vérification VIN pour documenter l'état du véhicule, renforcer la confiance des acheteurs et justifier les prix demandés. Un rapport de véhicule propre peut t'aider à vendre plus vite et à un meilleur prix.",
      },
      {
        question: "En quoi votre vérification VIN diffère-t-elle des décodeurs VIN gratuits ?",
        answer: "Les décodeurs VIN gratuits ne montrent généralement que les informations de base sur la marque/le modèle/l'année. Notre vérificateur VIN fournit des données complètes incluant la liste complète des équipements, les options d'usine, les spécifications moteur, les détails de transmission, de vraies photos du véhicule et des évaluations de marché issues de bases de données sectorielles fiables.",
      },
      {
        question: "Une vérification VIN peut-elle me dire si une voiture a été volée ?",
        answer: "Oui. Nos rapports croisent le VIN avec la base de données du National Insurance Crime Bureau (NICB). Si un véhicule est signalé volé et pas encore récupéré — ou s'il a été récupéré comme perte totale de sauvetage — le rapport le signalera.",
      },
      {
        question: "Une vérification VIN me montrera-t-elle un retour en arrière du compteur ?",
        answer: "Les rapports premium affichent toutes les lectures de kilométrage déclarées lors des inspections, transferts de titre et historiques de service. Les incohérences dans la chronologie sont un fort indicateur de fraude au compteur, qui coûte aux consommateurs américains plus d'un milliard de dollars par an.",
      },
      {
        question: "Ce service de vérification VIN est-il vraiment gratuit ?",
        answer: "Oui — et pour une durée limitée, chaque forfait est entièrement gratuit, y compris les rapports premium complets avec historique, valeurs de marché, photos et analyse détaillée. Aucune carte bancaire requise. Les tarifs normaux (à partir de $14.99) reprennent à la fin de la promotion.",
      },
    ],
  },
} as const;

export default function FAQSection({
  locale = "en",
}: {
  locale?: Locale;
}) {
  const copy = COPY[locale];
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-16 sm:py-24 px-4 sm:px-6 bg-surface-container-lowest">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-extrabold text-primary mb-3 sm:mb-4">
            {copy.heading}
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant">
            {copy.sub}
          </p>
        </div>

        <div className="space-y-3">
          {copy.faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl transition-all duration-300 ${
                  isOpen
                    ? "bg-surface shadow-sm border border-outline-variant/10"
                    : "bg-surface hover:bg-surface-container-low border border-transparent"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-4 sm:p-6 text-left cursor-pointer"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  {/*
                    h3 (not span) so each question is a real heading in the
                    DOM — feeds Google's passage-level indexing and helps
                    AI Overviews extract Q&A pairs cleanly. The `faq-question`
                    class anchors the SpeakableSpecification declared in
                    src/app/page.tsx for voice / AI audio surfaces.
                  */}
                  <h3
                    className={`faq-question font-headline font-bold text-base sm:text-lg pr-3 sm:pr-4 m-0 ${isOpen ? "text-primary" : "text-on-surface"}`}
                  >
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-primary" : "text-outline"}`}
                  />
                </button>
                <div
                  id={`faq-answer-${index}`}
                  role="region"
                  className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <p className="faq-answer px-4 sm:px-6 pb-4 sm:pb-6 text-sm sm:text-base text-on-surface-variant leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
