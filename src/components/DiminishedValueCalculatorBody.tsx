/**
 * Shared body for /diminished-value-calculator and /es/diminished-value-calculator.
 * Wave 18 — full English layout in both locales via COPY={en,es}.
 */

import Link from "next/link";
import {
  Check,
  TrendingDown,
  Scale,
  FileText,
  AlertTriangle,
  Car,
  Gauge,
  Stamp,
  Calculator,
  BookOpen,
  MapPin,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import DiminishedValueCalculator from "@/app/diminished-value-calculator/DiminishedValueCalculator";
import type { Locale } from "@/i18n/config";

const STEP_ICONS = [Stamp, TrendingDown, Car, Gauge] as const;

const COPY = {
  en: {
    home: "Home",
    crumb: "Diminished Value Calculator",
    h1: "Diminished Value Calculator",
    intro1Pre: "A repaired car is still worth less than one that was never wrecked. This calculator runs the insurer's ",
    intro17c: "17c formula",
    intro1Mid: " and shows the ",
    introMarket: "realistic market loss",
    intro1Suffix: " beside it — so you walk into a diminished value claim knowing both the lowball number and the figure worth fighting for.",

    h2WhatIs: "What Is Diminished Value?",
    whatIs1: "Diminished value is the difference between what your car was worth before an accident and what it's worth after — even once it's been perfectly repaired. Two identical cars on a lot will sell for different prices if one has a recorded accident and the other doesn't. Buyers pay less for the wrecked one, and that price gap is money out of your pocket the day you sell or trade.",
    whatIs2Pre: "There are three flavors worth knowing. ",
    whatIsInherent: "Inherent diminished value",
    whatIs2Mid: " is the loss from the car simply having an accident on record — this is what most claims and this calculator target. ",
    whatIsRepair: "Repair-related diminished value",
    whatIs2Mid2: " is extra loss from imperfect repairs (mismatched paint, panel gaps). ",
    whatIsImmediate: "Immediate diminished value",
    whatIs2Suffix: " is the difference right after the crash, before repairs. The 17c formula estimates inherent diminished value.",

    h2How17c: "How the 17c Formula Works",
    how17cIntroPre: 'The "17c" name comes from paragraph 17(c) of the Georgia class-action settlement ',
    how17cIntroEm: "Mabry v. State Farm",
    how17cIntroSuffix: ". It became the de-facto method insurers reach for, because it produces a conservative number. Here's every step it runs:",
    steps: [
      {
        label: "Pre-accident value",
        text: "Start from the clean retail value the day before the crash — KBB or NADA for your exact year, trim, and mileage.",
      },
      {
        label: "10% base cap",
        text: "The 17c formula caps maximum base loss at 10% of that value. This is the single biggest reason 17c under-states real loss.",
      },
      {
        label: "Damage multiplier",
        text: "Severity scales the base from 1.00 (structural) down to 0.00 (no structural damage). Frame damage carries the worst stigma.",
      },
      {
        label: "Mileage multiplier",
        text: "A second reduction by odometer band, from 1.00 under 20k miles to 0.00 at 100k+. Two stacked reductions shrink the figure fast.",
      },
    ],
    how17cWarnBold: "Why insurers love it:",
    how17cWarnSuffix: " stacking a 10% cap with two multipliers that each only reduce the number means 17c rarely reflects what the car actually lost. It's a starting point to negotiate against — not a ceiling.",

    h2Loss: "Typical Market Loss by Damage Severity",
    lossIntro: "Real-world resale discounts as a percentage of pre-accident value. Use these as a sanity check against the 17c figure when building a claim.",
    lossThDamage: "Damage",
    lossThLost: "Value Lost",
    lossThExamples: "Examples",
    lossRows: [
      { severity: "Minor cosmetic", loss: "5–10%", note: "Scratches, dents, bumper scuffs" },
      { severity: "Moderate repairable", loss: "10–15%", note: "Standard collision, bolt-on parts" },
      { severity: "Major bodywork", loss: "15–20%", note: "Panel/suspension replacement" },
      { severity: "Structural / frame", loss: "20–25%", note: "Unibody, frame, airbag deployment" },
      { severity: "Branded title (after)", loss: "30–50%", note: "Salvage or rebuilt brand recorded" },
    ],

    h2Example: "17c Formula: A Worked Example",
    exampleIntroPre: "Take a car worth ",
    exampleVal: "$30,000",
    exampleIntroMid1: " before the accident that suffered ",
    exampleSev: "major bodywork",
    exampleIntroMid2: " (a 0.75 damage multiplier) with ",
    exampleMiles: "15,000 miles",
    exampleIntroSuffix: " on the odometer (a 1.00 mileage multiplier). Here is exactly how the 17c number is built, and how it compares to the real market loss.",
    exampleHeader: "Step-by-step on a $30,000 vehicle",
    exampleRows: [
      { label: "Pre-accident value", value: "$30,000" },
      { label: "10% base cap ($30,000 × 0.10)", value: "$3,000" },
      { label: "× Damage multiplier (major, 0.75)", value: "$2,250" },
      { label: "× Mileage multiplier (under 20k, 1.00)", value: "$2,250" },
    ],
    example17cLabel: "17c diminished value",
    example17cVal: "$2,250",
    exampleMarketLabel: "Real market loss (15–20% of value)",
    exampleMarketVal: "$4,500–$6,000",
    exampleConclusionPre: "The 17c formula returns ",
    exampleConclusion17c: "$2,250",
    exampleConclusionMid1: ", but comparable resale data for major bodywork points to a loss of ",
    exampleConclusionMarket: "$4,500 to $6,000",
    exampleConclusionMid2: " — roughly two to nearly three times higher. That gap, often ",
    exampleConclusionGap: "$2,250–$3,750",
    exampleConclusionSuffix: " on a single mid-priced car, is why an independent appraisal usually pays for itself when you build the claim around the market figure rather than the insurer's 17c output.",

    h2DvDep: "Diminished Value vs. Depreciation",
    dvDepIntroPre: "They are not the same thing, and conflating them is the fastest way to lose a claim. ",
    dvDepDepBold: "Depreciation",
    dvDepIntroMid1: " is the normal, expected loss in value every car takes from age and mileage — it happens to a flawless vehicle that never sees an accident. ",
    dvDepDvBold: "Diminished value",
    dvDepIntroMid2: " is the ",
    dvDepExtra: "extra",
    dvDepIntroSuffix: " loss stacked on top, caused specifically by the recorded accident. An insurer owes you for the diminished value, not for the ordinary depreciation you would have absorbed anyway.",
    dvDepCard1Title: "Depreciation",
    dvDepCard1Body: "Predictable loss from time, mileage, and wear. Affects every car. Not recoverable from an insurer — it is the cost of ownership.",
    dvDepCard2Title: "Diminished value",
    dvDepCard2Body: "Additional loss caused by the accident record alone. Recoverable through a diminished value claim, usually against the at-fault driver's insurer.",

    h2HowToFile: "How to File a Diminished Value Claim",
    fileSteps: [
      {
        title: "Confirm you can claim",
        detail: "Third-party claims (against the at-fault driver's insurer when you weren't at fault) are widely allowed. First-party claims against your own insurer are barred or limited in many states — check yours.",
      },
      {
        title: "Gather your evidence",
        detail: "Pull the repair invoice, photos of the damage, the police report, and the pre-accident value from KBB or NADA. The accident record on the VIN shows what future buyers will see.",
      },
      {
        title: "Get an independent appraisal",
        detail: "For any meaningful claim, a licensed appraiser's written report carries far more weight than a self-calculated figure and is often required to recover the real market loss.",
      },
      {
        title: "Submit a written demand",
        detail: "Send the insurer a demand letter with your appraisal and supporting documents, stating the market-loss figure — not the 17c number — as your claim amount.",
      },
      {
        title: "Negotiate, then escalate",
        detail: "Expect a low first offer near the 17c figure. Counter with your appraisal. If they won't move, options include your state insurance department, arbitration, or small-claims court.",
      },
    ],

    h2ByState: "Diminished Value Claims by State",
    byStateIntroPre: "Whether you can recover diminished value — and from whom — depends on your state. The reliable path almost everywhere is a ",
    byStateThirdBold: "third-party claim",
    byStateIntroMid: ": when another driver is at fault, you claim diminished value against ",
    byStateTheirEm: "their",
    byStateIntroMid2: " insurer. A ",
    byStateFirstBold: "first-party claim",
    byStateIntroSuffix: " against your own insurer is the harder case and is barred or sharply limited in many states.",
    byStateCard1Label: "Georgia",
    byStateCard1Pre: " is the origin of the 17c formula through ",
    byStateCard1Em: "Mabry v. State Farm",
    byStateCard1Suffix: ", and Georgia insurers are affirmatively required to consider diminished value on first-party claims — one of the most claimant-friendly states.",
    byStateCard2Label: "Most other states",
    byStateCard2Suffix: " recognize third-party diminished value claims but limit or exclude first-party recovery. Check your policy language and your state insurance department before filing.",
    byStateFooter: "Because the rules and the statute of limitations vary, confirm your state's position with its insurance department before you send a demand. The calculation above is the same everywhere; what changes is who you can collect from and how long you have.",

    crossLinks: [
      { href: "/accident-history-check", label: "Accident History Check", sub: "See the record buyers will find" },
      { href: "/market-value", label: "Market Value", sub: "Current valuation by VIN" },
      { href: "/car-depreciation-calculator", label: "Depreciation Calculator", sub: "Value loss over time" },
    ],

    h2Faq: "Frequently Asked Questions",
    faqs: [
      { q: "What is diminished value?", a: "The loss in a car's market worth after an accident, even once it's perfectly repaired. An identical car with no accident history sells for more — that price gap is the diminished value." },
      { q: "What is the 17c formula?", a: "The method most insurers use, from Mabry v. State Farm. It caps base loss at 10% of pre-accident value, then multiplies by a damage multiplier and a mileage multiplier — producing a deliberately conservative number." },
      { q: "Is the 17c number what I'll actually recover?", a: "It's the insurer's opening figure, usually a lowball. Real market loss is typically higher — 10–25% of value for structural damage. An independent appraisal is how you argue for the difference." },
      { q: "Can I claim diminished value against my own insurance?", a: "Often no — first-party DV claims are barred or limited in many states. Third-party claims against the at-fault driver's insurer are widely available when you weren't at fault." },
      { q: "Do I need an appraisal?", a: "For anything beyond a small claim, yes. A licensed appraiser's written report is taken far more seriously than a self-calculated figure and is often required to recover the full loss." },
      { q: "How long do I have to file?", a: "Your state's property-damage statute of limitations applies — commonly two to four years from the accident. File early, while records and pre-accident value are fresh." },
    ],

    h2Sources: "Sources & References",
    sourcesIntro: "The 17c methodology, market-loss ranges, and claim rules above draw on the following primary sources.",
    sources: [
      { href: "https://law.justia.com/cases/georgia/supreme-court/2001/s00g1840-1.html", label: "Mabry v. State Farm Mutual Automobile Insurance Co.", sub: "Georgia Supreme Court — origin of the 17c formula" },
      { href: "https://content.naic.org/", label: "National Association of Insurance Commissioners (NAIC)", sub: "State insurance regulation and consumer guidance" },
      { href: "https://www.nhtsa.gov/", label: "NHTSA", sub: "Vehicle safety, crash, and recall data" },
      { href: "https://www.kbb.com/", label: "Kelley Blue Book (KBB)", sub: "Pre-accident retail and trade-in valuation" },
      { href: "https://www.jdpower.com/cars/nadaguides", label: "J.D. Power / NADA Guides", sub: "Used-vehicle valuation benchmarks" },
    ],

    ctaBottomHeading: "Building a Diminished Value Claim?",
    ctaBottomBody: "Pull the accident record tied to your VIN — the same record a future buyer will see, and the evidence that proves your car's value took a hit.",
    ctaBottomBtn: "Check Accident History",
  },
  es: {
    home: "Inicio",
    crumb: "Calculadora de valor disminuido",
    h1: "Calculadora de valor disminuido",
    intro1Pre: "Un auto reparado vale menos que uno que nunca fue chocado. Esta calculadora ejecuta la ",
    intro17c: "fórmula 17c",
    intro1Mid: " de la aseguradora y muestra la ",
    introMarket: "pérdida de mercado realista",
    intro1Suffix: " al lado — para que entres a un reclamo de valor disminuido sabiendo tanto la cifra baja como la cifra por la que vale la pena luchar.",

    h2WhatIs: "¿Qué es el valor disminuido?",
    whatIs1: "El valor disminuido es la diferencia entre lo que valía tu auto antes de un accidente y lo que vale después — incluso una vez que ha sido perfectamente reparado. Dos autos idénticos en un lote se venderán a precios diferentes si uno tiene un accidente registrado y el otro no. Los compradores pagan menos por el chocado, y esa brecha de precio es dinero de tu bolsillo el día que lo vendas o lo cambies.",
    whatIs2Pre: "Hay tres tipos que vale la pena conocer. ",
    whatIsInherent: "Valor disminuido inherente",
    whatIs2Mid: " es la pérdida por el simple hecho de que el auto tenga un accidente en el registro — esto es lo que la mayoría de los reclamos y esta calculadora apuntan. ",
    whatIsRepair: "Valor disminuido relacionado con la reparación",
    whatIs2Mid2: " es la pérdida adicional por reparaciones imperfectas (pintura que no coincide, huecos entre paneles). ",
    whatIsImmediate: "Valor disminuido inmediato",
    whatIs2Suffix: " es la diferencia justo después del choque, antes de las reparaciones. La fórmula 17c estima el valor disminuido inherente.",

    h2How17c: "Cómo funciona la fórmula 17c",
    how17cIntroPre: 'El nombre "17c" viene del párrafo 17(c) del acuerdo de demanda colectiva de Georgia ',
    how17cIntroEm: "Mabry v. State Farm",
    how17cIntroSuffix: ". Se convirtió en el método de facto al que recurren las aseguradoras, porque produce una cifra conservadora. Aquí está cada paso que ejecuta:",
    steps: [
      {
        label: "Valor previo al accidente",
        text: "Comienza desde el valor minorista limpio del día anterior al choque — KBB o NADA para tu año, versión y kilometraje exactos.",
      },
      {
        label: "Tope base del 10%",
        text: "La fórmula 17c limita la pérdida base máxima al 10% de ese valor. Esta es la razón individual más grande por la que la 17c subestima la pérdida real.",
      },
      {
        label: "Multiplicador de daño",
        text: "La gravedad escala la base desde 1.00 (estructural) hasta 0.00 (sin daño estructural). El daño al chasis carga el peor estigma.",
      },
      {
        label: "Multiplicador de kilometraje",
        text: "Una segunda reducción por banda de odómetro, desde 1.00 bajo 20 mil millas hasta 0.00 en 100 mil+. Dos reducciones apiladas reducen rápidamente la cifra.",
      },
    ],
    how17cWarnBold: "Por qué les encanta a las aseguradoras:",
    how17cWarnSuffix: " apilar un tope del 10% con dos multiplicadores que cada uno solo reduce la cifra significa que la 17c rara vez refleja lo que el auto realmente perdió. Es un punto de partida para negociar — no un techo.",

    h2Loss: "Pérdida típica de mercado por gravedad del daño",
    lossIntro: "Descuentos de reventa del mundo real como porcentaje del valor previo al accidente. Úsalos como verificación de sensatez contra la cifra 17c al construir un reclamo.",
    lossThDamage: "Daño",
    lossThLost: "Valor perdido",
    lossThExamples: "Ejemplos",
    lossRows: [
      { severity: "Cosmético menor", loss: "5–10%", note: "Rayones, abolladuras, raspones de parachoques" },
      { severity: "Reparable moderado", loss: "10–15%", note: "Colisión estándar, piezas atornilladas" },
      { severity: "Carrocería mayor", loss: "15–20%", note: "Reemplazo de panel/suspensión" },
      { severity: "Estructural / chasis", loss: "20–25%", note: "Unibody, chasis, despliegue de bolsa de aire" },
      { severity: "Título marcado (después)", loss: "30–50%", note: "Marca de salvamento o reconstruido registrada" },
    ],

    h2Example: "Fórmula 17c: un ejemplo trabajado",
    exampleIntroPre: "Toma un auto que vale ",
    exampleVal: "$30,000 USD",
    exampleIntroMid1: " antes del accidente que sufrió ",
    exampleSev: "carrocería mayor",
    exampleIntroMid2: " (un multiplicador de daño de 0.75) con ",
    exampleMiles: "15,000 millas",
    exampleIntroSuffix: " en el odómetro (un multiplicador de kilometraje de 1.00). Aquí está exactamente cómo se construye la cifra 17c, y cómo se compara con la pérdida real de mercado.",
    exampleHeader: "Paso a paso en un vehículo de $30,000 USD",
    exampleRows: [
      { label: "Valor previo al accidente", value: "$30,000 USD" },
      { label: "Tope base del 10% ($30,000 × 0.10)", value: "$3,000 USD" },
      { label: "× Multiplicador de daño (mayor, 0.75)", value: "$2,250 USD" },
      { label: "× Multiplicador de kilometraje (bajo 20k, 1.00)", value: "$2,250 USD" },
    ],
    example17cLabel: "Valor disminuido 17c",
    example17cVal: "$2,250 USD",
    exampleMarketLabel: "Pérdida real de mercado (15–20% del valor)",
    exampleMarketVal: "$4,500–$6,000 USD",
    exampleConclusionPre: "La fórmula 17c devuelve ",
    exampleConclusion17c: "$2,250 USD",
    exampleConclusionMid1: ", pero los datos comparables de reventa para carrocería mayor apuntan a una pérdida de ",
    exampleConclusionMarket: "$4,500 a $6,000 USD",
    exampleConclusionMid2: " — aproximadamente dos a casi tres veces mayor. Esa brecha, a menudo ",
    exampleConclusionGap: "$2,250–$3,750 USD",
    exampleConclusionSuffix: " en un solo auto de precio medio, es por lo que una tasación independiente generalmente se paga sola cuando construyes el reclamo alrededor de la cifra de mercado en lugar del resultado 17c de la aseguradora.",

    h2DvDep: "Valor disminuido vs. depreciación",
    dvDepIntroPre: "No son lo mismo, y confundirlos es la forma más rápida de perder un reclamo. ",
    dvDepDepBold: "Depreciación",
    dvDepIntroMid1: " es la pérdida normal y esperada en el valor que toma cada auto por edad y kilometraje — le sucede a un vehículo impecable que nunca ve un accidente. ",
    dvDepDvBold: "Valor disminuido",
    dvDepIntroMid2: " es la pérdida ",
    dvDepExtra: "adicional",
    dvDepIntroSuffix: " apilada encima, causada específicamente por el accidente registrado. Una aseguradora te debe por el valor disminuido, no por la depreciación ordinaria que de todos modos habrías absorbido.",
    dvDepCard1Title: "Depreciación",
    dvDepCard1Body: "Pérdida predecible por tiempo, kilometraje y desgaste. Afecta a cada auto. No recuperable de una aseguradora — es el costo de propiedad.",
    dvDepCard2Title: "Valor disminuido",
    dvDepCard2Body: "Pérdida adicional causada solo por el registro del accidente. Recuperable a través de un reclamo de valor disminuido, generalmente contra la aseguradora del conductor responsable.",

    h2HowToFile: "Cómo presentar un reclamo de valor disminuido",
    fileSteps: [
      {
        title: "Confirma que puedes reclamar",
        detail: "Los reclamos de terceros (contra la aseguradora del conductor responsable cuando no fuiste tú el culpable) son ampliamente permitidos. Los reclamos de primera parte contra tu propia aseguradora están prohibidos o limitados en muchos estados — verifica el tuyo.",
      },
      {
        title: "Reúne tu evidencia",
        detail: "Saca la factura de reparación, fotos del daño, el reporte policial y el valor previo al accidente de KBB o NADA. El registro del accidente en el VIN muestra lo que verán los futuros compradores.",
      },
      {
        title: "Obtén una tasación independiente",
        detail: "Para cualquier reclamo significativo, el reporte escrito de un tasador con licencia tiene mucho más peso que una cifra autocalculada y a menudo se requiere para recuperar la pérdida real de mercado.",
      },
      {
        title: "Envía una demanda por escrito",
        detail: "Envía a la aseguradora una carta de demanda con tu tasación y documentos de respaldo, indicando la cifra de pérdida de mercado — no la cifra 17c — como el monto de tu reclamo.",
      },
      {
        title: "Negocia, luego escala",
        detail: "Espera una primera oferta baja cerca de la cifra 17c. Contraataca con tu tasación. Si no se mueven, las opciones incluyen el departamento de seguros de tu estado, arbitraje o corte de reclamos menores.",
      },
    ],

    h2ByState: "Reclamos de valor disminuido por estado",
    byStateIntroPre: "Si puedes recuperar el valor disminuido — y de quién — depende de tu estado. La vía confiable casi en todas partes es un ",
    byStateThirdBold: "reclamo de terceros",
    byStateIntroMid: ": cuando otro conductor es responsable, reclamas el valor disminuido contra ",
    byStateTheirEm: "su",
    byStateIntroMid2: " aseguradora. Un ",
    byStateFirstBold: "reclamo de primera parte",
    byStateIntroSuffix: " contra tu propia aseguradora es el caso más difícil y está prohibido o fuertemente limitado en muchos estados.",
    byStateCard1Label: "Georgia",
    byStateCard1Pre: " es el origen de la fórmula 17c a través de ",
    byStateCard1Em: "Mabry v. State Farm",
    byStateCard1Suffix: ", y las aseguradoras de Georgia están afirmativamente obligadas a considerar el valor disminuido en reclamos de primera parte — uno de los estados más favorables al reclamante.",
    byStateCard2Label: "La mayoría de los otros estados",
    byStateCard2Suffix: " reconocen reclamos de valor disminuido de terceros pero limitan o excluyen la recuperación de primera parte. Verifica el lenguaje de tu póliza y tu departamento estatal de seguros antes de presentar.",
    byStateFooter: "Como las reglas y el plazo de prescripción varían, confirma la posición de tu estado con su departamento de seguros antes de enviar una demanda. El cálculo de arriba es el mismo en todas partes; lo que cambia es de quién puedes cobrar y cuánto tiempo tienes.",

    crossLinks: [
      { href: "/accident-history-check", label: "Verificación de historial de accidentes", sub: "Mira el registro que encontrarán los compradores" },
      { href: "/market-value", label: "Valor de mercado", sub: "Valoración actual por VIN" },
      { href: "/car-depreciation-calculator", label: "Calculadora de depreciación", sub: "Pérdida de valor con el tiempo" },
    ],

    h2Faq: "Preguntas frecuentes",
    faqs: [
      { q: "¿Qué es el valor disminuido?", a: "La pérdida en el valor de mercado de un auto después de un accidente, incluso una vez que está perfectamente reparado. Un auto idéntico sin historial de accidentes se vende por más — esa brecha de precio es el valor disminuido." },
      { q: "¿Qué es la fórmula 17c?", a: "El método que usan la mayoría de las aseguradoras, de Mabry v. State Farm. Limita la pérdida base al 10% del valor previo al accidente, luego multiplica por un multiplicador de daño y un multiplicador de kilometraje — produciendo una cifra deliberadamente conservadora." },
      { q: "¿La cifra 17c es lo que realmente recuperaré?", a: "Es la cifra inicial de la aseguradora, generalmente baja. La pérdida real de mercado es típicamente más alta — 10–25% del valor por daño estructural. Una tasación independiente es cómo argumentas por la diferencia." },
      { q: "¿Puedo reclamar valor disminuido contra mi propio seguro?", a: "A menudo no — los reclamos de valor disminuido de primera parte están prohibidos o limitados en muchos estados. Los reclamos de terceros contra la aseguradora del conductor responsable están ampliamente disponibles cuando no fuiste el culpable." },
      { q: "¿Necesito una tasación?", a: "Para cualquier cosa más allá de un reclamo pequeño, sí. El reporte escrito de un tasador con licencia se toma mucho más en serio que una cifra autocalculada y a menudo se requiere para recuperar la pérdida completa." },
      { q: "¿Cuánto tiempo tengo para presentar?", a: "Aplica el plazo de prescripción de daños a la propiedad de tu estado — comúnmente de dos a cuatro años desde el accidente. Presenta temprano, mientras los registros y el valor previo al accidente estén frescos." },
    ],

    h2Sources: "Fuentes y referencias",
    sourcesIntro: "La metodología 17c, los rangos de pérdida de mercado y las reglas de reclamo anteriores se basan en las siguientes fuentes primarias.",
    sources: [
      { href: "https://law.justia.com/cases/georgia/supreme-court/2001/s00g1840-1.html", label: "Mabry v. State Farm Mutual Automobile Insurance Co.", sub: "Corte Suprema de Georgia — origen de la fórmula 17c" },
      { href: "https://content.naic.org/", label: "Asociación Nacional de Comisionados de Seguros (NAIC)", sub: "Regulación estatal de seguros y guía al consumidor" },
      { href: "https://www.nhtsa.gov/", label: "NHTSA", sub: "Datos de seguridad vehicular, choques y recalls" },
      { href: "https://www.kbb.com/", label: "Kelley Blue Book (KBB)", sub: "Valoración minorista y de intercambio previa al accidente" },
      { href: "https://www.jdpower.com/cars/nadaguides", label: "J.D. Power / NADA Guides", sub: "Puntos de referencia de valoración de vehículos usados" },
    ],

    ctaBottomHeading: "¿Construyendo un reclamo de valor disminuido?",
    ctaBottomBody: "Saca el registro de accidente vinculado a tu VIN — el mismo registro que verá un futuro comprador, y la evidencia que prueba que el valor de tu auto se vio afectado.",
    ctaBottomBtn: "Verificar historial de accidentes",
  },
} as const;

const FAQS_EN = [
  {
    question: "What is diminished value?",
    answer: "Diminished value is the loss in a vehicle's market worth after it has been in an accident and repaired. Even a perfectly repaired car is worth less than an identical car with a clean history, because buyers pay less for a vehicle with a recorded accident. That gap is the diminished value.",
  },
  {
    question: "What is the 17c diminished value formula?",
    answer: "The 17c formula comes from the Georgia case Mabry v. State Farm and is the method most insurers use to calculate a diminished value offer. It takes the pre-accident value, caps the base loss at 10% of that value, then multiplies by a damage-severity multiplier (0.00–1.00) and a mileage multiplier (0.00–1.00). The result is usually a conservative, low estimate.",
  },
  {
    question: "Is the 17c formula accurate?",
    answer: "Not in your favor. The 17c formula deliberately understates loss: the 10% cap and the two reducing multipliers stack to produce a low number. Independent appraisers and real resale data usually show a larger loss — often 10–25% of value for structural damage. Use 17c as the insurer's opening figure and an independent appraisal to argue for the real market loss.",
  },
  {
    question: "How much value does a car lose after an accident?",
    answer: "It depends on severity and the vehicle, but a recorded accident typically reduces market value by roughly 5–10% for minor cosmetic damage and 15–25% for structural or frame damage. Luxury and newer vehicles tend to lose a larger dollar amount because the percentage applies to a higher base value.",
  },
  {
    question: "Can I file a diminished value claim against my own insurance?",
    answer: "It depends on your state and policy. First-party diminished value claims (against your own insurer) are barred or limited in many states. Third-party claims — against the at-fault driver's insurer when you were not at fault — are widely available across the US. Check your state's rules and your policy language before filing.",
  },
  {
    question: "Do I need an independent appraisal for a diminished value claim?",
    answer: "For anything beyond a small claim, yes. A licensed independent appraiser produces a written report documenting the pre-accident value, the repairs, and the post-repair market value. Insurers take a professional appraisal far more seriously than a self-calculated number, and it is often required to recover the full market loss rather than the lower 17c figure.",
  },
  {
    question: "How long do I have to file a diminished value claim?",
    answer: "The deadline is set by your state's statute of limitations for property damage, commonly two to four years from the date of the accident, though it varies. File as early as possible — diminished value is easiest to prove while the repair records and pre-accident value are fresh.",
  },
  {
    question: "Does diminished value apply to a leased car?",
    answer: "It can, but the lease holder (the finance company) usually owns the vehicle, so any diminished value recovery may belong to them rather than you. Review your lease and talk to the leasing company before pursuing a claim on a leased vehicle.",
  },
  {
    question: "Does an accident always show up on a vehicle history report?",
    answer: "Not always, but often. If the accident was reported to police, an insurer, or generated a body-shop record fed to a history database, it can appear on a report tied to the VIN — which is exactly why buyers discount the car. Running an accident-history check on the VIN shows what a future buyer will see.",
  },
];

const FAQS_ES = [
  {
    question: "¿Qué es el valor disminuido?",
    answer: "El valor disminuido es la pérdida en el valor de mercado de un vehículo después de haber estado en un accidente y ser reparado. Incluso un auto perfectamente reparado vale menos que un auto idéntico con un historial limpio, porque los compradores pagan menos por un vehículo con un accidente registrado. Esa brecha es el valor disminuido.",
  },
  {
    question: "¿Qué es la fórmula 17c de valor disminuido?",
    answer: "La fórmula 17c viene del caso de Georgia Mabry v. State Farm y es el método que la mayoría de las aseguradoras usan para calcular una oferta de valor disminuido. Toma el valor previo al accidente, limita la pérdida base al 10% de ese valor, luego multiplica por un multiplicador de gravedad de daño (0.00–1.00) y un multiplicador de kilometraje (0.00–1.00). El resultado es generalmente una estimación conservadora y baja.",
  },
  {
    question: "¿Es precisa la fórmula 17c?",
    answer: "No a tu favor. La fórmula 17c deliberadamente subestima la pérdida: el tope del 10% y los dos multiplicadores reductores se apilan para producir una cifra baja. Tasadores independientes y datos reales de reventa generalmente muestran una pérdida mayor — a menudo 10–25% del valor por daño estructural. Usa la 17c como la cifra inicial de la aseguradora y una tasación independiente para argumentar la pérdida real de mercado.",
  },
  {
    question: "¿Cuánto valor pierde un auto después de un accidente?",
    answer: "Depende de la gravedad y del vehículo, pero un accidente registrado típicamente reduce el valor de mercado en aproximadamente 5–10% por daño cosmético menor y 15–25% por daño estructural o de chasis. Los vehículos de lujo y más nuevos tienden a perder una cantidad mayor en dólares porque el porcentaje se aplica a un valor base más alto.",
  },
  {
    question: "¿Puedo presentar un reclamo de valor disminuido contra mi propio seguro?",
    answer: "Depende de tu estado y póliza. Los reclamos de valor disminuido de primera parte (contra tu propia aseguradora) están prohibidos o limitados en muchos estados. Los reclamos de terceros — contra la aseguradora del conductor responsable cuando no fuiste el culpable — están ampliamente disponibles en todo EE. UU. Verifica las reglas de tu estado y el lenguaje de tu póliza antes de presentar.",
  },
  {
    question: "¿Necesito una tasación independiente para un reclamo de valor disminuido?",
    answer: "Para cualquier cosa más allá de un reclamo pequeño, sí. Un tasador independiente con licencia produce un reporte escrito documentando el valor previo al accidente, las reparaciones y el valor de mercado posterior a la reparación. Las aseguradoras toman una tasación profesional mucho más en serio que una cifra autocalculada, y a menudo se requiere para recuperar la pérdida completa de mercado en lugar de la cifra 17c más baja.",
  },
  {
    question: "¿Cuánto tiempo tengo para presentar un reclamo de valor disminuido?",
    answer: "El plazo lo establece el plazo de prescripción de daños a la propiedad de tu estado, comúnmente dos a cuatro años desde la fecha del accidente, aunque varía. Presenta lo antes posible — el valor disminuido es más fácil de probar mientras los registros de reparación y el valor previo al accidente estén frescos.",
  },
  {
    question: "¿El valor disminuido aplica a un auto arrendado?",
    answer: "Puede, pero el titular del arrendamiento (la financiera) generalmente es dueño del vehículo, por lo que cualquier recuperación de valor disminuido puede pertenecerles a ellos en lugar de a ti. Revisa tu contrato de arrendamiento y habla con la compañía arrendadora antes de perseguir un reclamo sobre un vehículo arrendado.",
  },
  {
    question: "¿Un accidente siempre aparece en un reporte de historial vehicular?",
    answer: "No siempre, pero a menudo. Si el accidente se reportó a la policía, a una aseguradora o generó un registro de taller de carrocería alimentado a una base de datos de historial, puede aparecer en un reporte vinculado al VIN — que es exactamente por qué los compradores descuentan el auto. Ejecutar una verificación de historial de accidentes en el VIN muestra lo que verá un futuro comprador.",
  },
];

interface Props {
  locale: Locale;
}

export default function DiminishedValueCalculatorBody({ locale }: Props) {
  const c = COPY[locale];
  const link = (en: string) => (locale === "es" ? `/es${en}` : en);

  return (
    <>
      <main className="pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: c.home, href: locale === "es" ? "/es" : "/" },
              { label: c.crumb },
            ]}
          />

          <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
            {c.h1}
          </h1>
          <p className="mt-4 text-lg text-slate-700 leading-relaxed">
            {c.intro1Pre}
            <strong>{c.intro17c}</strong>
            {c.intro1Mid}
            <strong>{c.introMarket}</strong>
            {c.intro1Suffix}
          </p>

          {/* Calculator */}
          <div className="mt-10">
            <DiminishedValueCalculator locale={locale} />
          </div>

          {/* What is DV */}
          <section id="what-is-dv" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{c.h2WhatIs}</h2>
            <p className="text-slate-700 leading-relaxed mb-4">{c.whatIs1}</p>
            <p className="text-slate-700 leading-relaxed">
              {c.whatIs2Pre}
              <strong>{c.whatIsInherent}</strong>
              {c.whatIs2Mid}
              <strong>{c.whatIsRepair}</strong>
              {c.whatIs2Mid2}
              <strong>{c.whatIsImmediate}</strong>
              {c.whatIs2Suffix}
            </p>
          </section>

          {/* VIN banner */}
          <div className="mt-12">
            <VinCheckBanner variant="card" />
          </div>

          {/* How 17c works */}
          <section id="how-17c-works" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-5">{c.h2How17c}</h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              {c.how17cIntroPre}
              <em>{c.how17cIntroEm}</em>
              {c.how17cIntroSuffix}
            </p>
            <ul className="space-y-4">
              {c.steps.map((step, i) => {
                const Icon = STEP_ICONS[i];
                return (
                  <li
                    key={step.label}
                    className="flex gap-3 items-start p-4 bg-white border border-slate-200 rounded-xl"
                  >
                    <Icon className="w-5 h-5 flex-shrink-0 mt-0.5 text-primary-600" />
                    <div>
                      <p className="font-bold text-slate-900">{step.label}</p>
                      <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                        {step.text}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="mt-5 flex items-start gap-3 p-4 rounded-xl border border-amber-200 bg-amber-50 text-sm text-amber-800">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-600" />
              <p className="leading-relaxed">
                <strong>{c.how17cWarnBold}</strong>
                {c.how17cWarnSuffix}
              </p>
            </div>
          </section>

          {/* Loss by severity table */}
          <section id="loss-by-severity" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{c.h2Loss}</h2>
            <p className="text-slate-600 leading-relaxed mb-5">{c.lossIntro}</p>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium">{c.lossThDamage}</th>
                    <th className="text-right px-4 py-3 font-medium">{c.lossThLost}</th>
                    <th className="text-left px-4 py-3 font-medium">{c.lossThExamples}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {c.lossRows.map(({ severity, loss, note }) => (
                    <tr key={severity} className="hover:bg-slate-50">
                      <td className="px-4 py-3 text-slate-800 font-medium">{severity}</td>
                      <td className="px-4 py-3 text-right font-bold text-primary-700">{loss}</td>
                      <td className="px-4 py-3 text-slate-600 text-xs">{note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Worked example */}
          <section id="worked-example" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{c.h2Example}</h2>
            <p className="text-slate-700 leading-relaxed mb-5">
              {c.exampleIntroPre}
              <strong>{c.exampleVal}</strong>
              {c.exampleIntroMid1}
              <strong>{c.exampleSev}</strong>
              {c.exampleIntroMid2}
              <strong>{c.exampleMiles}</strong>
              {c.exampleIntroSuffix}
            </p>
            <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border-b border-slate-200">
                <Calculator className="w-5 h-5 text-primary-600" />
                <p className="font-bold text-slate-900 text-sm">{c.exampleHeader}</p>
              </div>
              <ol className="divide-y divide-slate-100 text-sm">
                {c.exampleRows.map((r) => (
                  <li key={r.label} className="flex justify-between gap-4 px-4 py-3">
                    <span className="text-slate-700">{r.label}</span>
                    <span className="font-bold text-slate-900">{r.value}</span>
                  </li>
                ))}
                <li className="flex justify-between gap-4 px-4 py-3 bg-primary-50">
                  <span className="font-bold text-slate-900">{c.example17cLabel}</span>
                  <span className="font-bold text-primary-700">{c.example17cVal}</span>
                </li>
                <li className="flex justify-between gap-4 px-4 py-3 bg-emerald-50">
                  <span className="font-bold text-slate-900">{c.exampleMarketLabel}</span>
                  <span className="font-bold text-emerald-700">{c.exampleMarketVal}</span>
                </li>
              </ol>
            </div>
            <p className="text-slate-600 leading-relaxed mt-4 text-sm">
              {c.exampleConclusionPre}
              <strong>{c.exampleConclusion17c}</strong>
              {c.exampleConclusionMid1}
              <strong>{c.exampleConclusionMarket}</strong>
              {c.exampleConclusionMid2}
              <strong>{c.exampleConclusionGap}</strong>
              {c.exampleConclusionSuffix}
            </p>
          </section>

          {/* DV vs depreciation */}
          <section id="dv-vs-depreciation" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{c.h2DvDep}</h2>
            <p className="text-slate-700 leading-relaxed mb-5">
              {c.dvDepIntroPre}
              <strong>{c.dvDepDepBold}</strong>
              {c.dvDepIntroMid1}
              <strong>{c.dvDepDvBold}</strong>
              {c.dvDepIntroMid2}
              <em>{c.dvDepExtra}</em>
              {c.dvDepIntroSuffix}
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-xl border border-slate-200 bg-white">
                <p className="font-bold text-slate-900 text-sm mb-1.5">{c.dvDepCard1Title}</p>
                <p className="text-sm text-slate-600 leading-relaxed">{c.dvDepCard1Body}</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 bg-white">
                <p className="font-bold text-slate-900 text-sm mb-1.5">{c.dvDepCard2Title}</p>
                <p className="text-sm text-slate-600 leading-relaxed">{c.dvDepCard2Body}</p>
              </div>
            </div>
          </section>

          {/* How to file */}
          <section id="how-to-claim" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-5">{c.h2HowToFile}</h2>
            <ul className="space-y-3">
              {c.fileSteps.map(({ title, detail }) => (
                <li key={title} className="flex gap-3 items-start">
                  <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">
                    <strong className="text-slate-900">{title}</strong> — {detail}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* By state */}
          <section id="by-state" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{c.h2ByState}</h2>
            <p className="text-slate-700 leading-relaxed mb-5">
              {c.byStateIntroPre}
              <strong>{c.byStateThirdBold}</strong>
              {c.byStateIntroMid}
              <em>{c.byStateTheirEm}</em>
              {c.byStateIntroMid2}
              <strong>{c.byStateFirstBold}</strong>
              {c.byStateIntroSuffix}
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 bg-white">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5 text-primary-600" />
                <p className="text-sm text-slate-600 leading-relaxed">
                  <strong className="text-slate-900">{c.byStateCard1Label}</strong>
                  {c.byStateCard1Pre}
                  <em>{c.byStateCard1Em}</em>
                  {c.byStateCard1Suffix}
                </p>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 bg-white">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5 text-primary-600" />
                <p className="text-sm text-slate-600 leading-relaxed">
                  <strong className="text-slate-900">{c.byStateCard2Label}</strong>{" "}
                  {c.byStateCard2Suffix}
                </p>
              </div>
            </div>
            <p className="text-slate-600 leading-relaxed mt-4 text-sm">{c.byStateFooter}</p>
          </section>

          {/* Cross-links */}
          <div className="mt-12 grid sm:grid-cols-3 gap-3">
            {c.crossLinks.map(({ href, label, sub }) => (
              <Link
                key={href}
                href={link(href)}
                className="flex items-center justify-between gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <div>
                  <p className="font-bold text-slate-900 text-sm">{label}</p>
                  <p className="text-xs text-slate-600 mt-0.5">{sub}</p>
                </div>
                <span className="text-slate-500 font-bold text-xs flex-shrink-0">→</span>
              </Link>
            ))}
          </div>

          {/* FAQ */}
          <section id="faq" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">{c.h2Faq}</h2>
            <dl className="space-y-6">
              {c.faqs.map(({ q, a }) => (
                <div key={q}>
                  <dt className="font-bold text-slate-900">{q}</dt>
                  <dd className="mt-1.5 text-slate-600 leading-relaxed">{a}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Sources & references */}
          <section id="sources" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{c.h2Sources}</h2>
            <p className="text-slate-600 leading-relaxed mb-5 text-sm">{c.sourcesIntro}</p>
            <ul className="space-y-3">
              {c.sources.map(({ href, label, sub }) => (
                <li
                  key={href}
                  className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 bg-white"
                >
                  <BookOpen className="w-5 h-5 flex-shrink-0 mt-0.5 text-primary-600" />
                  <span className="text-sm">
                    <a
                      href={href}
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                      className="font-bold text-slate-900 hover:text-primary-700 underline decoration-slate-300 underline-offset-2"
                    >
                      {label}
                    </a>
                    <span className="block text-slate-600 mt-0.5">{sub}</span>
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Related */}
          <div className="mt-14">
            <RelatedChecks exclude="/diminished-value-calculator" />
          </div>
        </div>
      </main>

      {/* Bottom CTA */}
      <section className="py-14 bg-slate-50 border-t border-slate-200">
        <div className="max-w-xl mx-auto px-4 text-center">
          <Scale className="w-8 h-8 text-primary-600 mx-auto mb-3" />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">{c.ctaBottomHeading}</h2>
          <p className="text-slate-600 mb-6">{c.ctaBottomBody}</p>
          <Link
            href={link("/accident-history-check")}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl transition-colors"
          >
            <FileText className="w-4 h-4" />
            {c.ctaBottomBtn}
          </Link>
        </div>
      </section>
    </>
  );
}

export { FAQS_EN, FAQS_ES };
