/**
 * Wave 6 — Spanish calculator landing pages.
 *
 * Each entry powers one /es/<slug> page (car-loan, affordability,
 * depreciation, gas-mileage, trade-in, diminished-value, total-cost-of-
 * ownership, lease-vs-buy). Reuses the SpecialtyToolPage renderer from
 * Wave 5 since the layout is the same: Spanish hero → "qué obtienes"
 * bullets → "por qué importa" bullets → trust note → CTA to the English
 * interactive calculator.
 *
 * The interactive widget stays on the English page; the Spanish landing
 * page is for SEO (capturing native-language buyer queries like
 * "calculadora préstamo auto", "depreciación auto", etc.) and for
 * giving Spanish-speaking visitors a complete pre-tool briefing.
 */

import type { LucideIcon } from "lucide-react";
import {
  Calculator,
  TrendingDown,
  DollarSign,
  Fuel,
  RefreshCcw,
  PieChart,
  Car,
  Scale,
} from "lucide-react";
import type { SpecialtyHook } from "../_specialty-shared/strings";

// Calculators reuse SpecialtyHook shape because the structural fields
// (slug, hero, what-you-get, why-it-matters, trust note) map 1:1 onto
// what a calculator landing page needs to communicate.

export const CALCULATOR_HOOKS_ES: Record<string, SpecialtyHook> = {
  "car-loan": {
    esSlug: "/calculadora-prestamo-auto",
    englishPath: "/car-loan-calculator",
    icon: DollarSign,
    badge: "Préstamo · Pago mensual · Interés total",
    h1: "Calculadora de préstamo de auto — Pago mensual y amortización",
    metaTitle: "Calculadora préstamo auto gratis — Pago mensual",
    metaDescription:
      "Calculadora gratis de préstamo de auto. Calcula pago mensual, interés total y tabla de amortización en segundos. Sin registro ni datos personales.",
    keywords: [
      "calculadora préstamo auto",
      "calcular pago auto mensual",
      "amortización préstamo auto",
      "interés total préstamo auto",
      "financiamiento auto",
      "pago mensual carro",
    ],
    intro:
      "La calculadora de préstamo de auto toma tres números — monto del préstamo, tasa de interés (APR) y plazo en meses — y devuelve tu pago mensual exacto, el interés total que pagarás durante la vida del préstamo y una tabla de amortización mes a mes. Es la herramienta que el concesionario usa internamente; ahora tú la tienes antes de pisar el lote.",
    whatYouGet: [
      "Pago mensual exacto (principal + interés)",
      "Interés total pagado a lo largo del préstamo",
      "Tabla de amortización mes por mes",
      "Comparación entre plazos de 36, 48, 60, 72 y 84 meses",
      "Impacto de un pago inicial mayor en el costo total",
      "Cálculo del costo real cuando agregas un trade-in",
    ],
    whyItMatters: [
      "Un préstamo a 84 meses puede tener pago mensual atractivo pero pagas miles más en interés",
      "Saber el pago real evita comprar al límite del presupuesto y caer en pago negativo",
      "Las APR de concesionario son negociables — entras con la tasa de tu banco como ancla",
      "Si el pago no entra en tu presupuesto, mejor saberlo ANTES de firmar el contrato",
    ],
    trustNote:
      "Usamos la fórmula estándar de amortización (mismo cálculo que tu banco, Bank of America, Chase, Capital One). Los resultados son matemáticamente exactos al céntimo.",
    schemaName: "Calculadora de préstamo de auto",
  },

  "affordability": {
    esSlug: "/calculadora-cuanto-puedo-pagar-auto",
    englishPath: "/car-affordability-calculator",
    icon: Calculator,
    badge: "Asequibilidad · Regla 20/4/10",
    h1: "Calculadora de asequibilidad de auto — ¿Cuánto puedo gastar?",
    metaTitle: "Cuánto auto puedo pagar — Calculadora gratis",
    metaDescription:
      "Calculadora gratis para saber cuánto auto puedes pagar según tu ingreso, deudas y pago inicial. Aplica la regla 20/4/10 y previene financiamiento riesgoso.",
    keywords: [
      "cuánto auto puedo comprar",
      "calculadora asequibilidad auto",
      "regla 20/4/10 auto",
      "presupuesto compra auto",
      "ingreso vs pago auto",
      "deuda permitida auto",
    ],
    intro:
      "La regla 20/4/10 es el estándar financiero conservador: 20% de pago inicial, plazo máximo de 4 años y los pagos totales del auto (préstamo + seguro + gasolina + mantenimiento) no deben exceder 10% de tu ingreso bruto mensual. Esta calculadora aplica la regla a tu situación real y te dice el precio máximo del auto que deberías considerar.",
    whatYouGet: [
      "Precio máximo recomendado según tu ingreso",
      "Pago mensual máximo seguro",
      "Pago inicial sugerido (20% del precio)",
      "Costo total de propiedad (TCO) estimado a 5 años",
      "Alertas de exceso de deuda según tu DTI (debt-to-income)",
      "Comparación con vehículos en tu rango (sedan, SUV, camioneta)",
    ],
    whyItMatters: [
      "El error #1 de los compradores es elegir el auto primero y el préstamo después — al revés",
      "Cargar más del 10% del ingreso en pagos de auto deja al hogar vulnerable a una emergencia",
      "Un pago inicial menor al 20% aumenta el riesgo de quedar 'underwater' en el préstamo",
      "Conocer tu límite real te da poder de negociación: te paras y te vas si el deal no encaja",
    ],
    trustNote:
      "Basado en directrices de planificación financiera publicadas por la NerdWallet, Consumer Reports y la guía 20/4/10 originada por el economista Greg McBride (Bankrate).",
    schemaName: "Calculadora de asequibilidad de auto",
  },

  "depreciation": {
    esSlug: "/calculadora-depreciacion-auto",
    englishPath: "/car-depreciation-calculator",
    icon: TrendingDown,
    badge: "Depreciación · Valor a 3, 5 y 7 años",
    h1: "Calculadora de depreciación de auto",
    metaTitle: "Calculadora depreciación auto — Valor a futuro",
    metaDescription:
      "Calcula la depreciación de tu auto a 3, 5 y 7 años. Tasa por marca, modelo y kilometraje. Compara qué autos pierden menos valor — gratis e instantáneo.",
    keywords: [
      "calculadora depreciación auto",
      "valor auto en el tiempo",
      "depreciación marca modelo",
      "valor reventa auto",
      "qué auto pierde menos valor",
      "depreciación Toyota Honda",
    ],
    intro:
      "La depreciación es el mayor costo oculto de tener un auto — entre 50% y 70% del valor desaparece en los primeros 5 años. La calculadora aplica curvas de depreciación reales por marca y modelo (Toyota y Honda pierden ~40%, Tesla y Nissan ~50–55%, BMW y Mercedes ~60%+) para predecir cuánto valdrá tu auto cuando lo vendas.",
    whatYouGet: [
      "Valor estimado del auto a 1, 3, 5 y 7 años",
      "Curva de depreciación específica por marca",
      "Comparación entre comprar nuevo vs usado",
      "Punto óptimo de venta (sweet spot) según depreciación + reparaciones",
      "Costo real por año de tenencia",
      "Impacto del kilometraje en el valor residual",
    ],
    whyItMatters: [
      "Comprar un auto a 2–3 años de uso ahorra hasta 30% del precio nuevo con casi toda la vida útil intacta",
      "Las marcas premium pierden valor más rápido — un BMW de 5 años vale ~40% de su MSRP",
      "Saber la depreciación esperada te dice si el precio actual del auto es justo o inflado",
      "El plan de venta a 5 años requiere conocer el valor residual estimado",
    ],
    trustNote:
      "Curvas de depreciación calibradas con datos de Kelley Blue Book, Edmunds y NADA Guides. Las marcas más confiables (Toyota, Honda, Lexus) tienen las mejores tasas de retención de valor a 5 años.",
    schemaName: "Calculadora de depreciación de auto",
  },

  "gas-mileage": {
    esSlug: "/calculadora-gasto-gasolina",
    englishPath: "/gas-mileage-calculator",
    icon: Fuel,
    badge: "Combustible · Costo por milla",
    h1: "Calculadora de gasto de gasolina — Costo por milla, mes y año",
    metaTitle: "Calculadora gasto gasolina — Costo por milla",
    metaDescription:
      "Calculadora gratis de gasto de gasolina. Calcula costo por milla, gasto mensual y anual de combustible según MPG y precio. Compara entre vehículos.",
    keywords: [
      "calculadora gasolina auto",
      "costo combustible por milla",
      "gasto gasolina mensual",
      "MPG comparación autos",
      "costo combustible anual",
      "calculadora gasolina",
    ],
    intro:
      "La calculadora de gasto de gasolina convierte el MPG (millas por galón) de tu auto y el precio actual del combustible en cifras de bolsillo: costo por milla, gasto mensual y costo total anual de combustible. Útil para comparar vehículos antes de comprar (un sedán a 35 MPG vs una camioneta a 18 MPG cuesta ~$2,000/año de diferencia) y para presupuestar viajes.",
    whatYouGet: [
      "Costo por milla en centavos exactos",
      "Gasto mensual estimado de combustible",
      "Costo total anual de combustible",
      "Comparación entre 2 o más vehículos por MPG",
      "Cálculo del ahorro al cambiar a un híbrido o eléctrico",
      "Impacto en el bolsillo de un precio de gasolina más alto",
    ],
    whyItMatters: [
      "El combustible es el segundo costo más grande de tener auto, después de la depreciación",
      "Un híbrido (45+ MPG) ahorra $1,500–$2,500/año vs un V8 (16 MPG) al precio actual",
      "El costo por milla determina si un trabajo lejano vale la pena vs un cambio de auto",
      "Las estimaciones del EPA suelen ser ~10% optimistas — usa MPG real de Fuelly.com como referencia",
    ],
    trustNote:
      "Calculamos con la fórmula estándar: (millas ÷ MPG) × precio por galón. Los ratings EPA oficiales están en fueleconomy.gov; los promedios reales de conductores en Fuelly.com.",
    schemaName: "Calculadora de gasto de gasolina",
  },

  "trade-in": {
    esSlug: "/estimador-valor-trade-in",
    englishPath: "/trade-in-value-estimator",
    icon: RefreshCcw,
    badge: "Trade-in · Valor de cambio",
    h1: "Estimador de valor de trade-in — ¿Cuánto vale mi auto?",
    metaTitle: "Cuánto vale mi auto trade-in — Estimador gratis",
    metaDescription:
      "Estima el valor de trade-in de tu auto en segundos. Compara contra Kelley Blue Book y Edmunds. Sin registro ni datos personales — gratis al instante.",
    keywords: [
      "cuánto vale mi auto",
      "valor trade-in auto",
      "estimar valor auto usado",
      "Kelley Blue Book español",
      "valor cambio auto",
      "qué me dan por mi auto",
    ],
    intro:
      "El valor de trade-in es lo que un concesionario te ofrece al cambiar tu auto por uno nuevo (o usado certificado). Suele ser 10–20% menos que el valor de venta privada — esa diferencia es la ganancia del concesionario al revenderlo. El estimador te da el rango realista antes de entrar al lote para que negocies con datos en mano y no aceptes lowball offers.",
    whatYouGet: [
      "Valor estimado de trade-in según marca, modelo, año y kilometraje",
      "Rango de venta privada (siempre 10–20% mayor)",
      "Ajustes por condición: excelente, buena, regular, mala",
      "Impacto del color, equipamiento opcional y reportes de accidentes",
      "Comparación con Kelley Blue Book y Edmunds",
      "Estrategia de negociación según el rango",
    ],
    whyItMatters: [
      "Los concesionarios suelen ofrecer 15–25% menos del KBB en el primer trade-in offer",
      "Una venta privada genera $1,500–$3,500 más que un trade-in en autos de $15K+",
      "Conocer el rango real evita ser estafado con un 'over-allowance' inflado en el auto nuevo",
      "Hay impuestos al trade-in en muchos estados que ofrecen ventaja fiscal — calcula el neto",
    ],
    trustNote:
      "Nuestro estimador usa rangos de Kelley Blue Book, Edmunds y NADA Guides cruzados con ventas reales de subastas Manheim y Adesa. Para el valor final exacto al firmar, recomendamos consultar las tres fuentes.",
    schemaName: "Estimador de valor de trade-in",
  },

  "diminished-value": {
    esSlug: "/calculadora-valor-disminuido",
    englishPath: "/diminished-value-calculator",
    icon: Car,
    badge: "Valor disminuido · Fórmula 17c",
    h1: "Calculadora de valor disminuido — Fórmula 17c",
    metaTitle: "Calculadora valor disminuido — Fórmula 17c gratis",
    metaDescription:
      "Calcula el valor disminuido de tu auto tras un accidente con la fórmula 17c. Reclama lo que tu aseguradora debe pagar por pérdida de valor de mercado.",
    keywords: [
      "valor disminuido auto",
      "fórmula 17c español",
      "diminished value calculadora",
      "reclamo valor perdido accidente",
      "valor mercado tras accidente",
      "pago aseguradora valor perdido",
    ],
    intro:
      "El valor disminuido (diminished value) es la pérdida de valor de mercado de tu auto tras un accidente, incluso después de reparaciones perfectas. La fórmula 17c de Mitchell — usada por la mayoría de aseguradoras de EE. UU. — multiplica el valor pre-accidente del auto por un factor base (10%) y ajusta por severidad de daño y kilometraje. Esta calculadora aplica la fórmula y te da el monto exacto que puedes reclamar.",
    whatYouGet: [
      "Cálculo de pérdida según la fórmula 17c estándar",
      "Ajuste por severidad de daño (estructural, panel, raspones)",
      "Ajuste por kilometraje (cuanto más alto, menor el reclamo)",
      "Comparación con métodos NADA y custom appraisal",
      "Plantilla de carta de reclamo a la aseguradora",
      "Lista de estados donde el reclamo es legal sin demanda",
    ],
    whyItMatters: [
      "Un accidente reduce 10–30% el valor de reventa del auto — incluso bien reparado",
      "La aseguradora del culpable debe pagarte ese valor perdido, no solo las reparaciones",
      "Muchos compradores no reclaman porque desconocen el derecho — pierden $2,000–$8,000",
      "La fórmula 17c es defendible en corte y tasaciones independientes",
    ],
    trustNote:
      "La fórmula 17c proviene del caso Mabry v. State Farm (Georgia, 2002). Es ampliamente aceptada por aseguradoras estadounidenses, aunque algunos estados (FL, MI) tienen restricciones. Consulta a un abogado de daños patrimoniales si la cifra es significativa.",
    schemaName: "Calculadora de valor disminuido (fórmula 17c)",
  },

  "tco": {
    esSlug: "/calculadora-costo-total-propiedad",
    englishPath: "/total-cost-of-ownership-calculator",
    icon: PieChart,
    badge: "TCO · Costo real a 5 años",
    h1: "Calculadora de costo total de propiedad — TCO a 5 años",
    metaTitle: "Calculadora TCO auto — Costo total 5 años",
    metaDescription:
      "Calcula el costo total de propiedad (TCO) real de un auto a 5 años: depreciación, combustible, seguro, mantenimiento, impuestos y financiamiento. Gratis.",
    keywords: [
      "costo total auto 5 años",
      "TCO calculadora auto",
      "costo verdadero tener auto",
      "costo real auto",
      "calcular gastos auto totales",
      "true cost to own",
    ],
    intro:
      "El TCO (Total Cost of Ownership) es la suma de todos los costos de tener un auto durante 5 años: depreciación, combustible, seguro, mantenimiento programado, reparaciones, impuestos, registración y costos de financiamiento. Es el número que importa al comparar autos — un sedán de $25K barato de mantener puede ganarle a un usado de $20K que devora combustible y reparaciones.",
    whatYouGet: [
      "Costo total acumulado a 5 años, desglosado por categoría",
      "Costo promedio por año y por milla",
      "Depreciación esperada según marca y modelo",
      "Gasto en combustible según MPG y millas anuales",
      "Costos de seguro estimados por estado y perfil de conductor",
      "Costos de mantenimiento e impuestos por estado",
    ],
    whyItMatters: [
      "El precio de etiqueta es solo ~40% del costo real de tener el auto 5 años",
      "Los autos de lujo pierden valor y cuestan más en seguro y mantenimiento — el TCO los penaliza",
      "Saber el TCO de 2 opciones a comparar revela cuál es realmente más barata a largo plazo",
      "Útil para presupuesto familiar: el TCO ÷ 60 te da el verdadero pago mensual",
    ],
    trustNote:
      "Metodología basada en el cálculo TrueCost®ToOwn de Edmunds y el estudio anual de AAA 'Your Driving Costs'. Las cifras de seguro provienen de NerdWallet y las de mantenimiento de RepairPal.",
    schemaName: "Calculadora de costo total de propiedad de auto",
  },

  "lease-vs-buy": {
    esSlug: "/calculadora-arrendar-vs-comprar",
    englishPath: "/lease-vs-buy-calculator",
    icon: Scale,
    badge: "Lease vs comprar · Comparación financiera",
    h1: "Calculadora arrendar (lease) vs comprar auto",
    metaTitle: "Lease vs comprar auto — Calculadora gratis",
    metaDescription:
      "Compara arrendar (lease) vs comprar un auto. Pagos mensuales, capital, depreciación y costo total a 3 años — gratis e instantáneo.",
    keywords: [
      "lease vs comprar auto",
      "calculadora arrendamiento auto",
      "conviene arrendar auto",
      "leasing vs financiamiento",
      "comparar lease comprar",
      "auto lease español",
    ],
    intro:
      "El leasing tiene pagos mensuales más bajos pero al final entregas el auto y empiezas otra vez; comprar tiene pagos más altos pero te queda el auto como activo. La calculadora aplica los términos exactos de un lease (down, mensualidad, residual, money factor, mileage cap) y los compara con la compra equivalente para revelar cuál de los dos te cuesta menos al final del término.",
    whatYouGet: [
      "Costo total del lease (pago inicial + mensualidades × término + tarifa de disposición)",
      "Costo total de compra al mismo término (pagos + interés − valor de reventa)",
      "Diferencia neta entre las dos opciones",
      "Análisis del kilometraje permitido vs tu uso real",
      "Costo de penalización por exceso de millas",
      "Punto de equilibrio: a qué kilometraje uno vence al otro",
    ],
    whyItMatters: [
      "El lease conviene si manejas menos de 12K millas/año y cambias auto cada 3 años",
      "Comprar conviene si manejas más de 15K millas/año o quieres conservar el auto >5 años",
      "El money factor del lease es el equivalente a la APR — multiplicado por 2,400 te da la tasa",
      "Las penalidades por exceso de millas son de $0.15–$0.30 por milla — fácilmente $2,000 al final",
    ],
    trustNote:
      "La calculadora usa la fórmula estándar de leasing automotriz: pago = (depreciación + financiamiento + impuestos) ÷ término. El cálculo es matemáticamente exacto a las condiciones del contrato del concesionario.",
    schemaName: "Calculadora arrendar vs comprar auto",
  },
};
