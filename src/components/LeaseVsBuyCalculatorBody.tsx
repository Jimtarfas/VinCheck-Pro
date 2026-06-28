/**
 * Shared body for /lease-vs-buy-calculator and /es/lease-vs-buy-calculator.
 * Wave 18.19 — full English layout in both locales via COPY={en,es}.
 */

import Link from "next/link";
import {
  Check,
  X,
  AlertTriangle,
  Calculator,
  TrendingUp,
  Key,
  Gauge,
  DollarSign,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import LeaseVsBuyCalculator from "@/app/lease-vs-buy-calculator/LeaseVsBuyCalculator";
import type { Locale } from "@/i18n/config";

const COPY = {
  en: {
    home: "Home",
    crumb: "Lease vs Buy Calculator",
    h1: "Lease vs Buy Calculator",
    intro:
      "Compare the true total cost of leasing vs buying the same car side-by-side. See monthly payments, total out-of-pocket, end-of-term equity, and the clear net advantage over 3–7 years. Money-factor math, mileage overage, fees, and taxes all included.",

    quickCompareH2: "Lease vs Buy: Quick Comparison Table",
    quickCompareCols: { factor: "Factor", lease: "Lease", buy: "Buy" },
    quickCompareRows: [
      [
        "Monthly payment",
        "Lower (paying for depreciation only)",
        "Higher (paying for full vehicle)",
      ],
      [
        "Total cost over 3 years",
        "Lower out-of-pocket",
        "Higher out-of-pocket but you own equity",
      ],
      [
        "Asset at end of term",
        "$0 — return the car",
        "Vehicle with resale value",
      ],
      ["Mileage limits", "10k–15k/yr; ~$0.25/mi over", "Unlimited"],
      ["Modifications allowed", "Generally no", "Yes — fully yours"],
      ["Wear & tear chargebacks", "Yes, at turn-in", "None"],
      ["Early exit cost", "Punitive (1000s)", "Sell or trade anytime"],
      [
        "Best for",
        "New car every 3 yrs, low miles",
        "Long-term owners, high miles",
      ],
    ] as const,

    whenLeaseH2: "When Leasing Makes Sense",
    whenLease: [
      {
        t: "You drive under 12,000 miles a year",
        d: "Mileage caps and overage charges are the #1 lease killer. Under 12k/yr, you'll stay well within the allowance.",
      },
      {
        t: "You want a new car every 2–3 years",
        d: "If you cycle vehicles often anyway, leasing avoids depreciation hits and resale hassle.",
      },
      {
        t: "You can write off the lease as a business expense",
        d: "Self-employed drivers and businesses can often deduct the entire lease payment on their taxes — substantially shifting the math vs buying.",
      },
      {
        t: "You're targeting a luxury car for less per month",
        d: "Luxury brands have strong residuals (often 60%+), making lease payments dramatically lower than financing the same vehicle.",
      },
      {
        t: "You don't customize or modify cars",
        d: "If a stock vehicle is fine, you forgo the main benefit of ownership and simply pay less per month.",
      },
    ],

    whenBuyH2: "When Buying Makes Sense",
    whenBuy: [
      {
        t: "You drive more than 15,000 miles a year",
        d: "Mileage overages on a lease can easily exceed $4,000 over 3 years. Owning eliminates this entirely.",
      },
      {
        t: "You keep cars 5+ years",
        d: "Once the loan is paid off, your only costs are insurance, fuel, and maintenance. Years 5–10 are when buying massively pulls ahead financially.",
      },
      {
        t: "You want freedom to modify or upgrade",
        d: "Lifted trucks, performance mods, custom wraps, towing setups — all off-limits on a lease.",
      },
      {
        t: "You build equity you can use later",
        d: "A paid-off car is a $15–25k asset. You can sell it, trade it, or pass it down — none of that exists with a lease.",
      },
      {
        t: "You drive in harsh conditions",
        d: "Wear-and-tear chargebacks (curb rash, interior damage, dings) hit lease returns hard. Owning sidesteps this.",
      },
      {
        t: "You want predictable long-term cost",
        d: "After payoff, your monthly cost drops to $200–$400 of insurance and fuel. A perpetual leaser pays $400+ forever.",
      },
    ],

    hiddenLeaseH2: "Hidden Costs of Leasing",
    hiddenLease: [
      {
        t: "Mileage overage",
        d: "Typical $0.25/mile. Driving 18k/yr on a 12k/yr lease = $4,500 owed at turn-in over 3 years.",
      },
      {
        t: "Wear & tear chargebacks",
        d: "Tire tread, curb rash, interior stains, dings — banks often bill $500–$2,000 at lease end.",
      },
      {
        t: "Disposition fee",
        d: "$350–$500 charged at lease return. Often waived if you re-lease the same brand.",
      },
      {
        t: "Early termination",
        d: "Breaking a lease early can cost the remaining payments minus a small unearned-finance credit — easily $5k–$15k in penalties.",
      },
      {
        t: "Acquisition fee",
        d: "$595–$995 bank fee bundled into your lease at signing. Often hidden in the cap cost.",
      },
      {
        t: "Gap between residual and market",
        d: "If the car is worth more than the residual at lease end, you walk away from real equity unless you buy it out.",
      },
    ],

    hiddenBuyH2: "Hidden Benefits of Buying",
    hiddenBuy: [
      {
        t: "Real equity buildup",
        d: "Every payment puts equity in your pocket. After 5 years on a 60-month loan, you own a $15k–$20k asset outright.",
      },
      {
        t: "No mileage limits",
        d: "Drive 5k or 50k miles a year — no surcharges, no surprises at year-end.",
      },
      {
        t: "Free to modify",
        d: "Wheels, tunes, lifts, wraps, tow hitches — all yours without dealer pushback.",
      },
      {
        t: "Sell or trade anytime",
        d: "If your situation changes, you can sell privately or trade in. A lease has no early-exit option without massive penalties.",
      },
      {
        t: "Cheaper after payoff",
        d: "Years 6+ on an owned car are dirt cheap — insurance, fuel, maintenance only. Leasers pay full freight forever.",
      },
      {
        t: "Insurance flexibility",
        d: "Owners can drop collision coverage on older cars to cut premiums. Leasers must carry full coverage at high deductibles.",
      },
    ],

    moneyFactorH2: "How Money Factor Works",
    moneyFactorIntro:
      "Money factor is the lease equivalent of APR — a tiny decimal representing the interest portion of your lease. To convert it, multiply by 2400:",
    mfExampleLabel: "Example:",
    mfApr: "3.0% APR",
    mfFinanceLead: "The finance charge in a lease formula is calculated as:",
    mfFinanceCharge: "Finance Charge/mo =",
    mfCapPlusRes: "(Cap Cost + Residual)",
    mfMoneyFactor: "Money Factor",
    mfDealerNote:
      "Note: dealers can mark up the money factor — always check the advertised \"buy rate\" or compare to your bank's auto APR (divided by 24) to spot inflated finance charges.",

    faqH2: "Frequently Asked Questions",
    decidedTitle: "Decided to buy? Calculate the exact loan payment.",
    decidedBody:
      "Our Car Loan Calculator gives you the precise monthly payment and full amortization schedule for your financing scenario.",
    loanCalcLink: "Loan Calculator",
    loanCalcHref: "/car-loan-calculator",

    bottomH2: "Buying Used? Verify the History First.",
    bottomBody:
      "A clean Carfax can still hide a salvage past, odometer rollback, or lien. Run a free VIN check before signing any lease or loan.",
    bottomBtn: "Run a Free VIN Check",
    bottomHref: "/vin-check",
  },
  es: {
    home: "Inicio",
    crumb: "Calculadora arrendar vs comprar",
    h1: "Calculadora arrendar vs comprar",
    intro:
      "Compara el costo total real de arrendar vs comprar el mismo auto lado a lado. Mira pagos mensuales, gasto total de bolsillo, plusvalía al final del plazo y la ventaja neta clara durante 3–7 años. Matemática del factor de dinero, exceso de kilometraje, cargos e impuestos incluidos.",

    quickCompareH2: "Arrendar vs comprar: tabla de comparación rápida",
    quickCompareCols: { factor: "Factor", lease: "Lease", buy: "Comprar" },
    quickCompareRows: [
      [
        "Pago mensual",
        "Más bajo (solo pagas la depreciación)",
        "Más alto (pagas el vehículo completo)",
      ],
      [
        "Costo total en 3 años",
        "Menos de bolsillo",
        "Más de bolsillo pero te quedas con plusvalía",
      ],
      [
        "Activo al final del plazo",
        "$0 — devuelves el auto",
        "Vehículo con valor de reventa",
      ],
      [
        "Límites de kilometraje",
        "10k–15k/año; ~$0.25/mi extra",
        "Ilimitados",
      ],
      ["Modificaciones permitidas", "Generalmente no", "Sí — completamente tuyo"],
      ["Cargos por desgaste", "Sí, al devolver", "Ninguno"],
      ["Costo de salida anticipada", "Punitivo (miles)", "Vende o cambia cuando quieras"],
      [
        "Mejor para",
        "Auto nuevo cada 3 años, poco kilometraje",
        "Propietarios a largo plazo, alto kilometraje",
      ],
    ] as const,

    whenLeaseH2: "Cuándo tiene sentido arrendar",
    whenLease: [
      {
        t: "Conduces menos de 12,000 millas al año",
        d: "Los topes de kilometraje y cargos por exceso son el asesino #1 del lease. Bajo 12k/año te mantienes cómodo dentro del límite.",
      },
      {
        t: "Quieres un auto nuevo cada 2–3 años",
        d: "Si igual cambias de auto seguido, arrendar evita los golpes de depreciación y la molestia de la reventa.",
      },
      {
        t: "Puedes deducir el lease como gasto de negocio",
        d: "Conductores autónomos y empresas a menudo pueden deducir el pago del lease completo en sus impuestos — cambiando sustancialmente la matemática contra comprar.",
      },
      {
        t: "Apuntas a un auto de lujo por menos al mes",
        d: "Las marcas de lujo tienen residuales fuertes (a menudo 60%+), haciendo que los pagos del lease sean dramáticamente más bajos que financiar el mismo vehículo.",
      },
      {
        t: "No personalizas ni modificas autos",
        d: "Si un vehículo de fábrica te sirve, renuncias al beneficio principal de la propiedad y simplemente pagas menos al mes.",
      },
    ],

    whenBuyH2: "Cuándo tiene sentido comprar",
    whenBuy: [
      {
        t: "Conduces más de 15,000 millas al año",
        d: "Los excesos de kilometraje en un lease pueden superar fácilmente $4,000 en 3 años. Ser dueño elimina esto por completo.",
      },
      {
        t: "Conservas los autos 5+ años",
        d: "Una vez pagado el préstamo, tus únicos costos son seguro, combustible y mantenimiento. Los años 5–10 son cuando comprar saca enorme ventaja financiera.",
      },
      {
        t: "Quieres libertad para modificar o actualizar",
        d: "Camionetas elevadas, modificaciones de rendimiento, vinilos personalizados, enganches de remolque — todo prohibido en un lease.",
      },
      {
        t: "Construyes plusvalía que puedes usar después",
        d: "Un auto pagado es un activo de $15–25k. Puedes venderlo, cambiarlo o heredarlo — nada de eso existe con un lease.",
      },
      {
        t: "Conduces en condiciones duras",
        d: "Los cargos por desgaste (raspones en el borde, daño interior, abolladuras) golpean fuerte al devolver un lease. Ser dueño esquiva esto.",
      },
      {
        t: "Quieres costo predecible a largo plazo",
        d: "Después de pagar, tu costo mensual baja a $200–$400 de seguro y combustible. Un arrendatario perpetuo paga $400+ para siempre.",
      },
    ],

    hiddenLeaseH2: "Costos ocultos del lease",
    hiddenLease: [
      {
        t: "Exceso de kilometraje",
        d: "Típico $0.25/milla. Conducir 18k/año en un lease de 12k/año = $4,500 adeudados al devolver en 3 años.",
      },
      {
        t: "Cargos por desgaste",
        d: "Banda de neumáticos, raspones, manchas interiores, abolladuras — los bancos suelen cobrar $500–$2,000 al final del lease.",
      },
      {
        t: "Cargo de disposición",
        d: "$350–$500 cobrados al devolver el lease. A menudo se condona si re-arriendas la misma marca.",
      },
      {
        t: "Terminación anticipada",
        d: "Romper un lease antes puede costar los pagos restantes menos un pequeño crédito de financiamiento no devengado — fácilmente $5k–$15k en penalidades.",
      },
      {
        t: "Cargo de adquisición",
        d: "Cargo bancario de $595–$995 incluido en tu lease al firmar. A menudo oculto en el costo capitalizado.",
      },
      {
        t: "Brecha entre residual y mercado",
        d: "Si el auto vale más que el residual al final del lease, te alejas de plusvalía real a menos que lo compres.",
      },
    ],

    hiddenBuyH2: "Beneficios ocultos de comprar",
    hiddenBuy: [
      {
        t: "Construcción real de plusvalía",
        d: "Cada pago pone plusvalía en tu bolsillo. Después de 5 años en un préstamo de 60 meses, eres dueño absoluto de un activo de $15k–$20k.",
      },
      {
        t: "Sin límites de kilometraje",
        d: "Conduce 5k o 50k millas al año — sin recargos, sin sorpresas a fin de año.",
      },
      {
        t: "Libre para modificar",
        d: "Rines, ajustes, elevaciones, vinilos, enganches de remolque — todo tuyo sin oposición del concesionario.",
      },
      {
        t: "Vende o cambia cuando quieras",
        d: "Si tu situación cambia, puedes vender en privado o cambiar. Un lease no tiene opción de salida anticipada sin penalidades masivas.",
      },
      {
        t: "Más barato después de pagar",
        d: "Los años 6+ en un auto propio son baratísimos — solo seguro, combustible, mantenimiento. Los arrendatarios pagan tarifa completa para siempre.",
      },
      {
        t: "Flexibilidad de seguro",
        d: "Los dueños pueden dejar la cobertura de colisión en autos viejos para recortar primas. Los arrendatarios deben llevar cobertura completa con deducibles altos.",
      },
    ],

    moneyFactorH2: "Cómo funciona el factor de dinero",
    moneyFactorIntro:
      "El factor de dinero es el equivalente del APR en el lease — un decimal pequeño que representa la porción de interés de tu lease. Para convertirlo, multiplica por 2400:",
    mfExampleLabel: "Ejemplo:",
    mfApr: "3.0% APR",
    mfFinanceLead: "El cargo de financiamiento en la fórmula del lease se calcula así:",
    mfFinanceCharge: "Cargo financiamiento/mes =",
    mfCapPlusRes: "(Costo cap. + Residual)",
    mfMoneyFactor: "Factor de dinero",
    mfDealerNote:
      "Nota: los concesionarios pueden inflar el factor de dinero — siempre revisa el \"buy rate\" anunciado o compara con el APR auto de tu banco (dividido entre 24) para detectar cargos de financiamiento inflados.",

    faqH2: "Preguntas frecuentes",
    decidedTitle: "¿Decidiste comprar? Calcula el pago exacto del préstamo.",
    decidedBody:
      "Nuestra Calculadora de préstamo de auto te da el pago mensual preciso y el calendario completo de amortización para tu escenario de financiamiento.",
    loanCalcLink: "Calculadora préstamo",
    loanCalcHref: "/car-loan-calculator",

    bottomH2: "¿Compras usado? Verifica el historial primero.",
    bottomBody:
      "Un Carfax limpio aún puede ocultar un pasado de salvamento, retroceso de odómetro o gravamen. Ejecuta una verificación VIN gratis antes de firmar cualquier lease o préstamo.",
    bottomBtn: "Ejecutar una verificación VIN gratis",
    bottomHref: "/vin-check",
  },
  fr: {
    home: "Accueil",
    crumb: "Calculateur louer ou acheter",
    h1: "Calculateur louer ou acheter",
    intro:
      "Compare le vrai coût total de louer vs acheter la même auto côte à côte. Vois les paiements mensuels, la sortie totale, la plus-value en fin de terme et l'avantage net clair sur 3–7 ans. Calculs du facteur monétaire, excédent de kilométrage, frais et taxes tous inclus.",

    quickCompareH2: "Louer vs Acheter : tableau de comparaison rapide",
    quickCompareCols: { factor: "Facteur", lease: "Location", buy: "Achat" },
    quickCompareRows: [
      [
        "Paiement mensuel",
        "Plus bas (tu paies seulement la dépréciation)",
        "Plus haut (tu paies le véhicule complet)",
      ],
      [
        "Coût total sur 3 ans",
        "Moins de sortie",
        "Plus de sortie mais tu détiens la plus-value",
      ],
      [
        "Actif en fin de terme",
        "$0 — tu retournes la voiture",
        "Véhicule avec valeur de revente",
      ],
      ["Limites de kilométrage", "10k–15k/an ; ~$0.25/mi en sus", "Illimités"],
      ["Modifications permises", "Généralement non", "Oui — entièrement tien"],
      ["Frais d'usure", "Oui, au retour", "Aucun"],
      ["Coût de sortie anticipée", "Punitif (milliers)", "Vends ou échange quand tu veux"],
      [
        "Mieux pour",
        "Auto neuve tous les 3 ans, faible kilométrage",
        "Propriétaires à long terme, haut kilométrage",
      ],
    ] as const,

    whenLeaseH2: "Quand louer a du sens",
    whenLease: [
      {
        t: "Tu roules moins de 12,000 milles par année",
        d: "Les plafonds de kilométrage et frais d'excédent sont le tueur #1 de la location. Sous 12k/an, tu restes confortablement sous la limite.",
      },
      {
        t: "Tu veux une auto neuve tous les 2–3 ans",
        d: "Si tu changes de véhicule souvent de toute façon, louer évite les coups de dépréciation et le tracas de la revente.",
      },
      {
        t: "Tu peux déduire la location comme dépense d'affaires",
        d: "Les travailleurs autonomes et entreprises peuvent souvent déduire la totalité du paiement de location sur leurs impôts — modifiant substantiellement le calcul vs acheter.",
      },
      {
        t: "Tu vises une auto de luxe pour moins par mois",
        d: "Les marques de luxe ont des résiduels solides (souvent 60%+), rendant les paiements de location dramatiquement plus bas que financer le même véhicule.",
      },
      {
        t: "Tu ne personnalises ni ne modifies les autos",
        d: "Si un véhicule d'origine te convient, tu renonces au principal avantage de la propriété et tu paies simplement moins par mois.",
      },
    ],

    whenBuyH2: "Quand acheter a du sens",
    whenBuy: [
      {
        t: "Tu roules plus de 15,000 milles par année",
        d: "Les excédents de kilométrage sur une location peuvent facilement dépasser $4,000 sur 3 ans. Posséder élimine cela complètement.",
      },
      {
        t: "Tu gardes les autos 5+ ans",
        d: "Une fois le prêt remboursé, tes seuls coûts sont assurance, carburant et entretien. Les années 5–10 sont quand acheter prend une énorme avance financière.",
      },
      {
        t: "Tu veux la liberté de modifier ou améliorer",
        d: "Camions surélevés, modifications de performance, vinyles personnalisés, attaches de remorque — tout interdit sur une location.",
      },
      {
        t: "Tu bâtis de la plus-value utilisable plus tard",
        d: "Une auto payée est un actif de $15–25k. Tu peux la vendre, l'échanger ou la léguer — rien de cela n'existe avec une location.",
      },
      {
        t: "Tu roules dans des conditions rudes",
        d: "Les frais d'usure (éraflures de bordure, dommages intérieurs, bosses) frappent fort au retour de location. Posséder contourne ça.",
      },
      {
        t: "Tu veux un coût prévisible à long terme",
        d: "Après remboursement, ton coût mensuel tombe à $200–$400 d'assurance et carburant. Un locataire perpétuel paie $400+ pour toujours.",
      },
    ],

    hiddenLeaseH2: "Coûts cachés de la location",
    hiddenLease: [
      {
        t: "Excédent de kilométrage",
        d: "Typique $0.25/mille. Rouler 18k/an sur une location de 12k/an = $4,500 dûs au retour sur 3 ans.",
      },
      {
        t: "Frais d'usure",
        d: "Bande de roulement des pneus, éraflures, taches intérieures, bosses — les banques facturent souvent $500–$2,000 à la fin de la location.",
      },
      {
        t: "Frais de disposition",
        d: "$350–$500 facturés au retour. Souvent annulés si tu re-loues la même marque.",
      },
      {
        t: "Terminaison anticipée",
        d: "Briser une location plus tôt peut coûter les paiements restants moins un petit crédit de financement non gagné — facilement $5k–$15k en pénalités.",
      },
      {
        t: "Frais d'acquisition",
        d: "Frais bancaires de $595–$995 inclus dans ta location à la signature. Souvent cachés dans le coût capitalisé.",
      },
      {
        t: "Écart entre résiduel et marché",
        d: "Si l'auto vaut plus que le résiduel en fin de location, tu t'éloignes d'une vraie plus-value à moins de la racheter.",
      },
    ],

    hiddenBuyH2: "Avantages cachés d'acheter",
    hiddenBuy: [
      {
        t: "Construction de vraie plus-value",
        d: "Chaque paiement met de la plus-value dans ta poche. Après 5 ans sur un prêt de 60 mois, tu possèdes un actif de $15k–$20k en propre.",
      },
      {
        t: "Pas de limites de kilométrage",
        d: "Roule 5k ou 50k milles par an — pas de surcharges, pas de surprises en fin d'année.",
      },
      {
        t: "Libre de modifier",
        d: "Roues, calibrations, élévations, vinyles, attaches de remorque — tout à toi sans opposition du concessionnaire.",
      },
      {
        t: "Vends ou échange quand tu veux",
        d: "Si ta situation change, tu peux vendre en privé ou échanger. Une location n'a pas d'option de sortie anticipée sans pénalités massives.",
      },
      {
        t: "Moins cher après remboursement",
        d: "Les années 6+ sur une auto possédée sont vraiment pas chères — assurance, carburant, entretien seulement. Les locataires paient le plein tarif pour toujours.",
      },
      {
        t: "Flexibilité d'assurance",
        d: "Les propriétaires peuvent laisser tomber la couverture de collision sur les vieilles autos pour réduire les primes. Les locataires doivent porter une couverture complète à franchises élevées.",
      },
    ],

    moneyFactorH2: "Comment fonctionne le facteur monétaire",
    moneyFactorIntro:
      "Le facteur monétaire est l'équivalent location de l'APR — une petite décimale représentant la portion d'intérêt de ta location. Pour le convertir, multiplie par 2400 :",
    mfExampleLabel: "Exemple :",
    mfApr: "3.0% APR",
    mfFinanceLead: "Le frais de financement dans la formule de location est calculé comme :",
    mfFinanceCharge: "Frais financement/mois =",
    mfCapPlusRes: "(Coût cap. + Résiduel)",
    mfMoneyFactor: "Facteur monétaire",
    mfDealerNote:
      "Note : les concessionnaires peuvent gonfler le facteur monétaire — vérifie toujours le \"buy rate\" annoncé ou compare au taux APR auto de ta banque (divisé par 24) pour repérer les frais de financement gonflés.",

    faqH2: "Foire aux questions",
    decidedTitle: "Décidé d'acheter ? Calcule le paiement exact du prêt.",
    decidedBody:
      "Notre calculateur de prêt auto te donne le paiement mensuel précis et le calendrier complet d'amortissement pour ton scénario de financement.",
    loanCalcLink: "Calc. prêt",
    loanCalcHref: "/car-loan-calculator",

    bottomH2: "Tu achètes usagé ? Vérifie l'historique d'abord.",
    bottomBody:
      "Un Carfax propre peut encore cacher un passé salvage, un recul d'odomètre ou un privilège. Lance une vérification VIN gratuite avant de signer toute location ou prêt.",
    bottomBtn: "Lancer une vérification VIN gratuite",
    bottomHref: "/vin-check",
  },
} as const;

const FAQS_EN = [
  {
    q: "Is leasing or buying a car cheaper?",
    a: "Over a single 3-year window, leasing usually has lower out-of-pocket cost. Over 6+ years (i.e. continuing to drive a paid-off car vs. starting a second lease), buying nearly always wins because you stop making payments while the leaser keeps cycling.",
  },
  {
    q: "How is a lease payment calculated?",
    a: "Lease monthly = depreciation fee + finance charge, then taxed. Depreciation = (cap cost − residual) ÷ term. Finance = (cap cost + residual) × money factor. Multiply the sum by (1 + tax rate) for your taxed monthly. Our calculator handles all this.",
  },
  {
    q: "What is a money factor and how do I convert it to APR?",
    a: "Money factor is the lease equivalent of APR. Multiply by 2400 to convert. So 0.00125 = 3.0% APR. Dealers sometimes inflate the money factor for profit; always compare to your bank's auto loan rate.",
  },
  {
    q: "Should I put money down on a lease?",
    a: "Generally no. A 'cap cost reduction' lowers your monthly payment but you lose it entirely if the car is totaled — gap insurance only covers the lease balance. Most experts recommend zero down beyond the first month and acquisition fee.",
  },
  {
    q: "What's a typical residual value for 36 months?",
    a: "55% of MSRP is common. Some makes (Toyota, Honda, Subaru) post 60%+. Luxury and rapidly-depreciating models sometimes residual under 50%. Higher residual = lower payment.",
  },
  {
    q: "Can I negotiate the residual or money factor?",
    a: "Residual is set by the bank and not negotiable. Money factor can sometimes be lowered (toward the manufacturer's 'buy rate') if the dealer marked it up. Always ask 'what's the buy rate?' before signing.",
  },
  {
    q: "What if I drive more miles than my lease allows?",
    a: "Standard overage is $0.25/mile. Going 6,000 miles over a 3-year lease costs $1,500. If you regularly exceed 15k/yr, buying is almost always cheaper than paying overages or pre-buying high-mile leases.",
  },
  {
    q: "Can I buy my leased car at the end?",
    a: "Yes — every lease includes a buyout option at the residual price. If the market value exceeds the residual, this can be very profitable. If it's below, return the car.",
  },
  {
    q: "Does this calculator account for opportunity cost on the down payment?",
    a: "The advanced section includes an investment-return rate field for opportunity cost analysis. The headline net advantage focuses on direct out-of-pocket cost minus end-of-term equity — the most concrete comparison.",
  },
  {
    q: "Is leasing a good idea for a business?",
    a: "Often yes — businesses can deduct lease payments as an operating expense, which can shift the after-tax math significantly. Talk to your accountant about Section 179 vs. lease deduction trade-offs.",
  },
];

const FAQS_ES = [
  {
    q: "¿Es más barato arrendar o comprar un auto?",
    a: "En una sola ventana de 3 años, arrendar suele tener menor costo de bolsillo. En 6+ años (es decir, seguir conduciendo un auto pagado vs. iniciar un segundo lease), comprar casi siempre gana porque dejas de hacer pagos mientras el arrendatario sigue ciclando.",
  },
  {
    q: "¿Cómo se calcula un pago de lease?",
    a: "Mensual del lease = cargo de depreciación + cargo de financiamiento, luego se le aplica impuesto. Depreciación = (costo capitalizado − residual) ÷ plazo. Financiamiento = (costo capitalizado + residual) × factor de dinero. Multiplica la suma por (1 + tasa de impuesto) para tu mensual con impuesto. Nuestra calculadora se encarga de todo esto.",
  },
  {
    q: "¿Qué es un factor de dinero y cómo lo convierto a APR?",
    a: "El factor de dinero es el equivalente del APR en el lease. Multiplica por 2400 para convertir. Entonces 0.00125 = 3.0% APR. Los concesionarios a veces inflan el factor de dinero para ganancia; siempre compara con la tasa de préstamo auto de tu banco.",
  },
  {
    q: "¿Debo dar pago inicial en un lease?",
    a: "Generalmente no. Una 'reducción de costo capitalizado' baja tu pago mensual pero la pierdes por completo si el auto se declara pérdida total — el seguro gap solo cubre el saldo del lease. La mayoría de los expertos recomiendan cero inicial más allá del primer mes y el cargo de adquisición.",
  },
  {
    q: "¿Cuál es un valor residual típico para 36 meses?",
    a: "55% del MSRP es común. Algunas marcas (Toyota, Honda, Subaru) publican 60%+. Modelos de lujo y de depreciación rápida a veces tienen residual bajo 50%. Mayor residual = pago más bajo.",
  },
  {
    q: "¿Puedo negociar el residual o el factor de dinero?",
    a: "El residual lo fija el banco y no es negociable. El factor de dinero a veces se puede bajar (hacia el 'buy rate' del fabricante) si el concesionario lo infló. Siempre pregunta '¿cuál es el buy rate?' antes de firmar.",
  },
  {
    q: "¿Qué pasa si conduzco más millas de las que permite mi lease?",
    a: "El exceso estándar es $0.25/milla. Pasarse 6,000 millas en un lease de 3 años cuesta $1,500. Si regularmente excedes 15k/año, comprar es casi siempre más barato que pagar excesos o pre-comprar leases de alto kilometraje.",
  },
  {
    q: "¿Puedo comprar mi auto arrendado al final?",
    a: "Sí — todo lease incluye una opción de compra al precio residual. Si el valor de mercado excede el residual, esto puede ser muy rentable. Si está por debajo, devuelve el auto.",
  },
  {
    q: "¿Esta calculadora considera el costo de oportunidad del pago inicial?",
    a: "La sección avanzada incluye un campo de tasa de retorno de inversión para análisis de costo de oportunidad. La ventaja neta destacada se enfoca en costo directo de bolsillo menos plusvalía al final del plazo — la comparación más concreta.",
  },
  {
    q: "¿Arrendar es buena idea para un negocio?",
    a: "Frecuentemente sí — los negocios pueden deducir pagos de lease como gasto operativo, lo cual puede cambiar significativamente la matemática después de impuestos. Habla con tu contador sobre los trade-offs entre Sección 179 vs. deducción de lease.",
  },
];

interface Props {
  locale: Locale;
}

export default function LeaseVsBuyCalculatorBody({ locale }: Props) {
  const c = COPY[locale];
  const faqs = locale === "es" ? FAQS_ES : FAQS_EN;
  const link = (en: string) => (locale === "es" ? `/es${en}` : en);

  return (
    <>
      <main className="pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
            {c.intro}
          </p>

          {/* VIN check banner near the top */}
          <div className="mt-8">
            <VinCheckBanner variant="card" />
          </div>

          {/* Calculator */}
          <div className="mt-10">
            <LeaseVsBuyCalculator locale={locale} />
          </div>

          {/* Quick comparison table */}
          <section id="quick-comparison" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-5">
              {c.quickCompareH2}
            </h2>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-600 text-xs uppercase">
                  <tr>
                    <th className="text-left px-4 py-3 font-bold">
                      {c.quickCompareCols.factor}
                    </th>
                    <th className="text-left px-4 py-3 font-bold text-blue-700">
                      {c.quickCompareCols.lease}
                    </th>
                    <th className="text-left px-4 py-3 font-bold text-emerald-700">
                      {c.quickCompareCols.buy}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {c.quickCompareRows.map(([factor, lease, buy]) => (
                    <tr key={factor}>
                      <td className="px-4 py-3 font-bold text-slate-900">
                        {factor}
                      </td>
                      <td className="px-4 py-3 text-slate-700">{lease}</td>
                      <td className="px-4 py-3 text-slate-700">{buy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* When leasing makes sense */}
          <section id="when-lease" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-5 flex items-center gap-2">
              <Key className="w-6 h-6 text-blue-600" /> {c.whenLeaseH2}
            </h2>
            <ul className="space-y-3">
              {c.whenLease.map(({ t, d }) => (
                <li key={t} className="flex gap-3 items-start">
                  <Check className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">
                    <strong className="text-slate-900">{t}</strong> — {d}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* When buying makes sense */}
          <section id="when-buy" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-5 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-emerald-600" /> {c.whenBuyH2}
            </h2>
            <ul className="space-y-3">
              {c.whenBuy.map(({ t, d }) => (
                <li key={t} className="flex gap-3 items-start">
                  <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">
                    <strong className="text-slate-900">{t}</strong> — {d}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Hidden costs of leasing */}
          <section id="hidden-lease-costs" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-5 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-amber-600" /> {c.hiddenLeaseH2}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {c.hiddenLease.map(({ t, d }, i) => {
                const icons = [
                  <Gauge key="0" className="w-5 h-5 text-amber-600" />,
                  <AlertTriangle key="1" className="w-5 h-5 text-amber-600" />,
                  <DollarSign key="2" className="w-5 h-5 text-amber-600" />,
                  <X key="3" className="w-5 h-5 text-amber-600" />,
                  <DollarSign key="4" className="w-5 h-5 text-amber-600" />,
                  <TrendingUp key="5" className="w-5 h-5 text-amber-600" />,
                ];
                return (
                  <div
                    key={t}
                    className="bg-amber-50 border border-amber-200 rounded-xl p-4"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {icons[i]}
                      <h3 className="font-bold text-amber-900">{t}</h3>
                    </div>
                    <p className="text-sm text-amber-900">{d}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Hidden benefits of buying */}
          <section id="hidden-buy-benefits" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-5 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-emerald-600" /> {c.hiddenBuyH2}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {c.hiddenBuy.map(({ t, d }) => (
                <div
                  key={t}
                  className="bg-emerald-50 border border-emerald-200 rounded-xl p-4"
                >
                  <h3 className="font-bold text-emerald-900 mb-1.5">{t}</h3>
                  <p className="text-sm text-emerald-900">{d}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Money factor explainer */}
          <section id="money-factor" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Calculator className="w-6 h-6 text-primary-600" /> {c.moneyFactorH2}
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              {c.moneyFactorIntro}
            </p>
            <div className="bg-white border border-slate-200 rounded-xl p-5 mb-5 font-mono text-sm">
              <p>
                APR <span className="text-slate-400">=</span> Money Factor{" "}
                <span className="text-slate-400">×</span> 2400
              </p>
              <p className="mt-2">
                <span className="text-slate-500">{c.mfExampleLabel}</span> 0.00125{" "}
                <span className="text-slate-400">×</span> 2400 ={" "}
                <strong>{c.mfApr}</strong>
              </p>
            </div>
            <p className="text-slate-700 leading-relaxed mb-4">
              {c.mfFinanceLead}
            </p>
            <div className="bg-white border border-slate-200 rounded-xl p-5 font-mono text-sm">
              <p>
                {c.mfFinanceCharge}{" "}
                <span className="text-blue-700">{c.mfCapPlusRes}</span>{" "}
                <span className="text-slate-400">×</span>{" "}
                <span className="text-emerald-700">{c.mfMoneyFactor}</span>
              </p>
            </div>
            <p className="text-slate-700 leading-relaxed mt-4">
              {c.mfDealerNote}
            </p>
          </section>

          {/* Mid-page banner */}
          <div className="mt-12">
            <VinCheckBanner variant="default" />
          </div>

          {/* FAQ */}
          <section id="faq" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              {c.faqH2}
            </h2>
            <dl className="space-y-6">
              {faqs.map(({ q, a }) => (
                <div key={q}>
                  <dt className="font-bold text-slate-900">{q}</dt>
                  <dd className="mt-1.5 text-slate-600 leading-relaxed">{a}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Link to other calculators */}
          <div className="mt-12 flex items-center justify-between gap-4 p-5 bg-primary-50 border border-primary-100 rounded-2xl">
            <div>
              <p className="font-bold text-slate-900">{c.decidedTitle}</p>
              <p className="text-sm text-slate-600 mt-0.5">{c.decidedBody}</p>
            </div>
            <Link
              href={link(c.loanCalcHref)}
              className="flex-shrink-0 inline-flex items-center gap-1.5 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-bold rounded-xl transition-colors"
            >
              {c.loanCalcLink}
            </Link>
          </div>

          {/* Related */}
          <div className="mt-14">
            <RelatedChecks exclude="/lease-vs-buy-calculator" />
          </div>
        </div>
      </main>

      {/* Bottom CTA */}
      <section className="py-14 bg-slate-50 border-t border-slate-200">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            {c.bottomH2}
          </h2>
          <p className="text-slate-600 mb-6">{c.bottomBody}</p>
          <Link
            href={link(c.bottomHref)}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl transition-colors"
          >
            {c.bottomBtn}
          </Link>
        </div>
      </section>
    </>
  );
}

export { FAQS_EN, FAQS_ES };
