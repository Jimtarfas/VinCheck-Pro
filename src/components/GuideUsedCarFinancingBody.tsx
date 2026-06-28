/**
 * Shared body for /guides/used-car-financing-guide and the Spanish twin.
 * Wave 18 batch 2 — full English layout in both locales via COPY={en,es}.
 */

import Link from "next/link";
import {
  PiggyBank, CreditCard, Building2, FileSignature, Percent, Repeat,
  TrendingDown, Calculator, AlertTriangle, CheckCircle2,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import type { Locale } from "@/i18n/config";

const COPY = {
  en: {
    home: "Home",
    guides: "Guides",
    crumb: "Used Car Financing Guide",
    h1: "Used Car Financing: The Complete 2026 Guide",
    intro:
      "Financing a used car in 2026 is a fundamentally different exercise than it was three years ago. Average used-vehicle APRs from the Federal Reserve\u2019s consumer credit data have stayed stubbornly above 10% for non-prime borrowers, loan terms have stretched into 84-month territory, and dealer F&I offices have layered on more add-ons than ever to preserve margin. The good news: a buyer who arrives with a pre-approval, a clear total-cost target, and a willingness to walk away can still finance a used car on terms that make financial sense.",
    vetBoxTitle: "Vetting a vehicle before financing?",
    vetBoxBody:
      "Run the VIN before you sign anything. Title brands and accident damage tank resale value \u2014 and your loan-to-value with it.",
    tocAria: "Table of contents",
    tocTitle: "In this guide",
    toc: [
      { href: "#landscape", label: "The 2026 used auto loan landscape" },
      { href: "#credit", label: "How your credit score shapes the loan" },
      { href: "#lenders", label: "Dealer vs. bank vs. credit union" },
      { href: "#preapproval", label: "Pre-approval: the buyer\u2019s superpower" },
      { href: "#apr", label: "APR vs. total cost vs. monthly payment" },
      { href: "#term", label: "Loan term: shorter is almost always better" },
      { href: "#downpayment", label: "Down payment, GAP, and being underwater" },
      { href: "#lease", label: "Leasing vs. buying a used car" },
      { href: "#refinance", label: "Refinancing: when and how" },
      { href: "#fi-office", label: "Surviving the F&I office" },
    ],
    s1H: "The 2026 used auto loan landscape",
    s1P1:
      "Federal Reserve consumer credit reports show used-vehicle loan APRs have flattened in 2026 but remain elevated versus the pre-pandemic norm. Average used APR for prime borrowers (FICO 720+) hovers near 7.5\u20138.5% at credit unions and 8\u20139.5% at major banks. Non-prime borrowers face 11\u201315%, and subprime borrowers (sub-600 FICO) routinely see APRs north of 18% on used-vehicle paper.",
    s1P2:
      "Average used-vehicle loan amounts now exceed $26,000, average term length is 67 months, and roughly one-quarter of new used auto loans extend 73 months or longer. That term creep is the most important pattern to recognize: the longer the term, the more interest you pay, and the longer you spend underwater on the loan. A 2024 Edmunds analysis found average negative-equity rolled into new loans at over $6,000, a record high.",
    s2H: "How your credit score shapes the loan",
    s2P1:
      "Credit score bands drive everything: APR, maximum loan-to-value, term length availability, and add-on pricing. Most lenders use the FICO Auto Score 8 or 9, which is a credit-product-specific scoring model that weights past auto-loan behavior more heavily than the general FICO score. Your credit-card-app FICO and your FICO Auto Score can differ by 30+ points.",
    s2P2:
      "Approximate APR bands for used-auto financing in early 2026 (varies by lender and region):",
    tableHead: { band: "FICO band", tier: "Tier", apr: "Typical APR" },
    tableRows: [
      { band: "781\u2013850", tier: "Super-prime", apr: "6.99\u20137.99%" },
      { band: "661\u2013780", tier: "Prime", apr: "8.49\u20139.99%" },
      { band: "601\u2013660", tier: "Near-prime", apr: "11.49\u201313.49%" },
      { band: "501\u2013600", tier: "Subprime", apr: "14.99\u201318.49%" },
      { band: "300\u2013500", tier: "Deep subprime", apr: "18.99%+" },
    ],
    s2P3:
      "If your score sits at the top of a band, even a small improvement can drop you into the next bracket and save thousands over the life of the loan. Three high-impact credit fixes that work fast: pay down revolving balances below 30% utilization, dispute any incorrect collections with the bureaus, and avoid opening new credit lines in the 90 days before applying.",
    s3H: "Dealer vs. bank vs. credit union",
    s3P1:
      "Three primary lender channels exist for used-auto borrowers, and each has structural advantages and disadvantages.",
    s3CULead: "Credit unions",
    s3CUBody:
      " consistently offer the lowest APRs for prime and near-prime borrowers, often 0.5\u20132 percentage points below banks. They are member-owned, which means underwriting tends to consider relationship factors (length of membership, other deposit balances) on top of pure FICO score. Membership requirements are often trivial to meet \u2014 many credit unions have geographic or employer-based fields of membership that admit nearly anyone in the region.",
    s3BankLead: "Banks and online lenders",
    s3BankBody:
      " compete on speed and convenience. Decisions arrive in minutes, the funds are wired or printed as a check at the closing, and many integrate with checking accounts you already hold. APRs trail credit unions for prime borrowers but are competitive for super-prime applicants who qualify for promotional rates.",
    s3DealerLead: "Dealer financing",
    s3DealerBody:
      " is technically indirect lending: the dealer submits your application to a network of lenders (banks, captive finance arms, specialty lenders), receives a buy rate, and quotes you a contract rate that adds a markup. The convenience is real, and on certified-pre-owned vehicles with manufacturer subvention the rate can beat the market. The risk is that the markup is invisible unless you have a pre-approval to compare against.",
    s4H: "Pre-approval: the buyer\u2019s superpower",
    s4P1:
      "A pre-approval is a written conditional commitment from a lender stating the maximum amount, the APR, and the term they will finance for you. It is the single most powerful tool a used-car buyer has, for three reasons:",
    s4List: [
      { bold: "It defines your ceiling.", body: " You walk into the dealership knowing exactly how much you can borrow and at what rate. The dealer\u2019s F&I office cannot expand that ceiling without your consent." },
      { bold: "It exposes dealer markup.", body: " If the dealer offers 8.99% and your credit union pre-approval is 7.49%, the markup is 1.5 percentage points \u2014 and you have written proof that a competing lender will undercut them." },
      { bold: "It removes the \u201cmonthly payment\u201d trap.", body: " With financing settled, the conversation can stay on out-the-door price." },
    ],
    s4P2:
      "Pull at least three pre-approvals: one credit union, one bank, one online lender. Submit them within a 14-day window so the major credit bureaus treat them as a single inquiry for scoring purposes. Use the best offer as your negotiating floor at the dealer.",
    s5H: "APR vs. total cost vs. monthly payment",
    s5P1Pre:
      "Three numbers describe every auto loan, and salespeople redirect to the least informative one. The APR is the annualized cost of borrowing. The monthly payment is how much you write per month. The ",
    s5P1Bold: "total of payments",
    s5P1Post:
      " is the actual dollar amount you will hand over by the time the loan is paid off \u2014 and it is the only number that captures the full cost.",
    s5P2:
      "Worked example: a $25,000 loan at 9.49% APR over 60 months has a $525 monthly payment and totals $31,475 paid \u2014 meaning $6,475 in interest over the life of the loan. Stretch that to 72 months and the monthly payment drops to $458, but the total paid jumps to $32,976 \u2014 an extra $1,500 in interest for the convenience of a lower payment. Stretch to 84 months and you pay $34,558, with the additional risk of being upside down for the first three or four years.",
    s5P3:
      "Always negotiate against the total of payments. The monthly payment is what the dealer wants you to focus on because it is trivially manipulable by changing term length.",
    s6H: "Loan term: shorter is almost always better",
    s6P1:
      "The 20/4/10 rule of thumb gets criticized for being too conservative in a high-rate environment, but it survives for a reason: the math holds. A four-year term at 8.49% on $20,000 totals roughly $23,664 paid \u2014 $3,664 in interest. A six-year term at the same rate totals $25,653 paid \u2014 $5,653 in interest. The $1,989 difference is the price of the longer term.",
    s6P2:
      "On top of pure interest cost, the longer term creates two structural risks. First, you spend more time underwater \u2014 depreciation outpaces principal paydown, so if you total the car or want to sell, you owe more than it is worth. Second, the longer the term, the more likely your life circumstances change (job, family, relocation) and force you into a disadvantaged sale or trade.",
    s6P3:
      "For most buyers, 48 months is the upper limit. 60 months is acceptable on a higher-quality vehicle with a substantial down payment. 72 months and beyond should be a last resort.",
    s7H: "Down payment, GAP, and being underwater",
    s7P1:
      "A 20% down payment is the long-standing benchmark because it does two things at once. It immediately reduces the principal you finance, lowering both monthly payment and total interest. And it absorbs the steep first-year depreciation hit, keeping your loan-to-value below 100% from day one. Without that cushion, a vehicle that depreciates 18\u201322% in the first year leaves you underwater \u2014 owing more than the car is worth.",
    s7P2:
      "GAP (Guaranteed Asset Protection) coverage exists specifically for this gap. If your vehicle is totaled or stolen, GAP pays the difference between the insurance settlement (actual cash value) and your outstanding loan balance. GAP is genuinely valuable, but the F&I office routinely sells it at $700\u2013$1,200, while credit unions offer the same coverage for $200\u2013$400. Buy GAP from your credit union, not the dealer.",
    s7P3Pre:
      "One more pitfall: rolling negative equity from a previous loan into the new one. The dealer\u2019s F&I office can quietly pad your new loan with the deficit from your trade-in. The result is a loan that starts instantly underwater and stays that way for years. Walk in knowing your trade\u2019s wholesale and retail value (run the VIN through our ",
    s7P3Link: "VIN check",
    s7P3Post:
      " and the manufacturer\u2019s buyback or KBB tool) and negotiate it as a separate transaction.",
    s8H: "Leasing vs. buying a used car",
    s8P1:
      "Used-car leasing is rare but not unknown. A handful of captive finance arms (BMW Financial, Mercedes-Benz Financial, Lexus Financial, Audi Financial) lease certified-pre-owned vehicles to qualified buyers, usually in 24- or 36-month terms. The math rarely beats buying, because the depreciation curve has already flattened: you are paying the residual hit on a vehicle that will depreciate slower than a new one.",
    s8P2:
      "For most buyers, leasing a used car is the wrong call. Financing a used car gives you full ownership, no mileage caps, no end-of-lease wear charges, and the ability to sell or trade whenever you choose. The scenarios where used leasing makes sense are narrow: a buyer who values the manufacturer-backed warranty premium of a CPO program, drives well under 12,000 miles per year, and intends to upgrade frequently.",
    s9H: "Refinancing: when and how",
    s9P1:
      "Refinancing replaces your existing auto loan with a new one at (ideally) a lower APR. Three scenarios commonly justify a refinance:",
    s9List: [
      { bold: "Rates have dropped.", body: " Even a one-percentage-point reduction can save hundreds over the remaining term." },
      { bold: "Your credit has improved.", body: " Borrowers who took a subprime loan a year ago and have rebuilt credit can routinely cut their rate by several points." },
      { bold: "You need a different term.", body: " Refinancing into a shorter term cuts interest cost; extending term reduces monthly payment but raises total cost." },
    ],
    s9P2:
      "Mechanics: the refinance lender pays off the original loan, takes a new lien on the vehicle, and you start making payments on the new loan. There is usually no cost beyond a small lien-recording fee. Prepayment penalties are rare on auto loans but check the original contract before pulling the trigger.",
    s10H: "Surviving the F&I office",
    s10P1:
      "The finance office is where dealer profit is made. After you have negotiated the price of the vehicle, you sit down with the finance manager who walks you through a long menu of add-ons. Each one is a separate negotiation; none of them are required.",
    s10List: [
      { bold: "Extended warranty / vehicle service contract", body: " \u2014 can be worth it on certain vehicles, but markups of 100\u2013200% are common. Compare against credit-union pricing." },
      { bold: "GAP insurance", body: " \u2014 valuable, but dealer markup is typically 3\u20135x credit-union pricing." },
      { bold: "Tire-and-wheel protection", body: " \u2014 high-margin, low-utility for most buyers." },
      { bold: "Paint protection / fabric protection", body: " \u2014 usually a wax application or fabric spray marked up 1,000%. Decline." },
      { bold: "VIN etching", body: " \u2014 supposed to deter theft. You can buy a kit for $20." },
      { bold: "Nitrogen tire fill", body: " \u2014 air is 78% nitrogen for free." },
    ],
    s10P2:
      "Read the contract carefully before signing. Verify that the APR, term, and total of payments match what you agreed to verbally. Verify that no add-ons appear that you did not authorize. Once you sign, getting things removed becomes much harder.",
    specH: "Specialty financing situations",
    specP:
      "The standard playbook above covers the majority of buyers, but several situations warrant their own consideration: subprime borrowers, first-time buyers, self-employed applicants, and buyers financing branded-title or older vehicles.",
    sub1H: "Subprime financing without getting trapped",
    sub1P:
      "Subprime borrowers (FICO 500\u2013620) face APRs in the 14\u201319% range and often see their applications routed to specialty lenders. A few principles to protect yourself: always insist on a simple-interest amortizing loan, never a precomputed-interest contract that penalizes early payoff; verify there is no prepayment penalty; cap the term at 60 months even if longer is offered; and put as much down as possible to shrink loan-to-value below 100%. Many subprime buyers refinance after 12 months of on-time payments rebuilds credit, cutting their rate by three or more percentage points.",
    sub2H: "First-time buyer programs",
    sub2P:
      "Most major credit unions and several manufacturer captive arms run dedicated first-time buyer programs that loosen credit requirements in exchange for documented employment, a small income verification, and sometimes a co-signer. APRs are typically near prime rates rather than subprime, and term lengths are constrained to 48\u201360 months. Worth pursuing aggressively before accepting a higher subprime rate.",
    sub3H: "Self-employed and 1099 borrowers",
    sub3P:
      "Self-employed applicants often face friction because lenders use stated income from W-2s as their default verification. Bring two years of personal and business tax returns, the most recent two months of personal bank statements showing consistent deposits, and a profit-and-loss summary for the current year. Credit unions are typically more flexible than national banks for self-employed applicants, and many will use the average of the last two years\u2019 net income for qualifying purposes.",
    sub4H: "Financing branded or older vehicles",
    sub4PPre:
      "Many lenders refuse to finance salvage-titled or rebuilt-titled vehicles entirely. Those who do usually charge 2\u20135 percentage points above their clean-title rate and require shorter terms. Vehicles older than 10 model years or above 120,000 miles face similar restrictions. If you are financing in either category, expect a smaller lender pool and disclose the title status upfront so you do not waste time on a pre-approval that collapses at funding. Pull a complete ",
    sub4PLink: "salvage title check",
    sub4PPost:
      " before applying so you know exactly what brands the title carries.",
    sub5H: "Trade-in mechanics inside a financed deal",
    sub5P1:
      "Trade-ins complicate financing math in ways that consistently work against the buyer. The dealer offers a trade-in value, applies it as a credit toward the purchase, and finances the remainder. Two pitfalls dominate. First, the trade-in value offered by the dealer is usually 15\u201325% below private-party value \u2014 the dealer absorbs reconditioning cost and resale risk in the spread. Second, if you owe more on your existing loan than the trade is worth, the negative equity rolls into the new loan, starting you instantly underwater.",
    sub5P2:
      "Defensive approach: get an instant offer from online buyers (Carvana, CarMax, Vroom-style platforms) before you walk into the dealer. Use the highest written offer as your floor. Many buyers find that selling to an instant-offer platform and walking into the dealer with cash for the new vehicle nets better total economics than trading in. Trade-in tax credits may shift the calculation in some states \u2014 sales tax is commonly assessed only on the difference between new-vehicle price and trade-in value \u2014 so run both scenarios with your specific state\u2019s tax rate.",
    insH: "Insurance and registration: the hidden line items",
    insP1:
      "Insurance is the second-largest ongoing cost of vehicle ownership after the loan payment itself. Several factors that shape your premium are controllable and worth optimizing before you finalize the purchase. Vehicle choice matters: a Hyundai Elantra is dramatically cheaper to insure than a Dodge Charger of the same value, because insurers price based on theft frequency, claim severity, and historical loss data on that specific make/model. Always pull a binding quote on the exact vehicle before committing.",
    insP2:
      "Coverage levels matter on financed vehicles. Lenders require comprehensive and collision coverage with deductibles capped at $1,000 for the duration of the loan; most buyers default to $500 deductibles, which raises premium meaningfully. Liability limits should follow your net worth, not the lender minimum \u2014 the small premium difference between state-minimum liability and a $250k/$500k policy is one of the highest-leverage insurance dollars you spend.",
    insP3:
      "Registration costs vary dramatically by state. Vehicle property tax (Virginia, Connecticut, Massachusetts, others) can add hundreds annually. Registration fees in California scale with vehicle value; in Texas they are flat. Build the recurring registration cost into your annual ownership budget, not just the first-year purchase numbers.",
    cycH: "Financing in a high-rate environment: principles that survive the cycle",
    cycP1:
      "Auto-loan rates have whipsawed in recent years. The principles that survive any rate environment are simple: shop pre-approvals from at least three lenders, anchor on total cost rather than monthly payment, keep the term as short as the budget allows, and refinance opportunistically as credit improves and rates move. Buyers who follow these four principles routinely save thousands over the life of the loan compared to those who walk into a dealership without preparation.",
    cycP2Pre:
      "Equally important: vehicle choice itself shapes financing economics. A reliable, lower-depreciation vehicle protects your loan-to-value position even as rates fluctuate. A vehicle with strong resale value (Toyota, Honda, Lexus, Subaru) tends to stay above water through the loan term; faster-depreciating brands and high-value luxury vehicles can drop below loan balance for years. The history report you pull at purchase shapes future resale \u2014 clean-title, low-accident vehicles consistently command better trade-in offers years later. Run the report through our ",
    cycP2Link: "VIN check",
    cycP2Post: " before you sign anything.",
    relH: "Related reading",
    relCards: [
      { href: "/guides/used-car-buying-complete-guide", title: "Complete used car buying guide", desc: "End-to-end: budget through paperwork." },
      { href: "/vin-check", title: "VIN check", desc: "Verify the vehicle before signing the loan." },
      { href: "/dealers", title: "For dealers", desc: "Bulk reports for sales floors." },
      { href: "/guides", title: "All guides", desc: "Buying, fraud, decoding, and history reports." },
      { href: "/guides/car-history-report-guide", title: "Vehicle history report guide", desc: "What is in a report and how to read it." },
      { href: "/guides/vehicle-fraud-prevention", title: "Vehicle fraud prevention", desc: "Title, odometer, and cloning fraud." },
      { href: "/blog", title: "CarCheckerVIN blog", desc: "Rate trackers, depreciation, and market news." },
      { href: "/glossary", title: "Used car glossary", desc: "Every loan, dealer, and DMV term defined." },
    ],
    contH: "Continue learning",
    contPre: "Ready to vet the vehicle behind the loan? Decode the VIN at our ",
    contLink1: "VIN check tool",
    contMid: " or read the full ",
    contLink2: "used car buying guide",
    contPost: " for the complete pre-purchase playbook.",
    faqH: "Frequently Asked Questions",
    faqP:
      "General, educational answers to the most-searched questions about financing a used car. This is informational guidance, not personalized financial advice.",
    bottomH: "Vet the vehicle before financing",
    bottomP:
      "Title brands and accident history can crater resale value \u2014 and your loan-to-value with it. Run the VIN first.",
  },
  es: {
    home: "Inicio",
    guides: "Guías",
    crumb: "Guía de financiamiento de auto usado",
    h1: "Financiamiento de auto usado: La guía completa 2026",
    intro:
      "Financiar un auto usado en 2026 es un ejercicio fundamentalmente diferente de lo que era hace tres años. Los APR promedio de vehículos usados de los datos de crédito al consumidor de la Reserva Federal se han mantenido obstinadamente por encima del 10% para prestatarios no prime, los plazos del préstamo se han estirado hasta territorio de 84 meses, y las oficinas F&I de los concesionarios han añadido más extras que nunca para preservar su margen. La buena noticia: un comprador que llega con una preaprobación, un objetivo claro de costo total y la disposición de retirarse aún puede financiar un auto usado en términos que tengan sentido financiero.",
    vetBoxTitle: "¿Evaluando un vehículo antes de financiar?",
    vetBoxBody:
      "Ejecuta el VIN antes de firmar nada. Las marcas de título y daños por accidentes hunden el valor de reventa — y tu relación préstamo-valor con él.",
    tocAria: "Tabla de contenidos",
    tocTitle: "En esta guía",
    toc: [
      { href: "#landscape", label: "El panorama del préstamo de auto usado en 2026" },
      { href: "#credit", label: "Cómo tu puntaje de crédito moldea el préstamo" },
      { href: "#lenders", label: "Concesionario vs. banco vs. cooperativa de crédito" },
      { href: "#preapproval", label: "Preaprobación: el superpoder del comprador" },
      { href: "#apr", label: "APR vs. costo total vs. pago mensual" },
      { href: "#term", label: "Plazo del préstamo: más corto casi siempre es mejor" },
      { href: "#downpayment", label: "Pago inicial, GAP y estar bajo el agua" },
      { href: "#lease", label: "Arrendar vs. comprar un auto usado" },
      { href: "#refinance", label: "Refinanciar: cuándo y cómo" },
      { href: "#fi-office", label: "Sobreviviendo la oficina F&I" },
    ],
    s1H: "El panorama del préstamo de auto usado en 2026",
    s1P1:
      "Los reportes de crédito al consumidor de la Reserva Federal muestran que los APR de préstamos de vehículos usados se han aplanado en 2026 pero permanecen elevados frente a la norma pre-pandemia. El APR promedio para prestatarios prime (FICO 720+) ronda 7.5\u20138.5% en cooperativas de crédito y 8\u20139.5% en bancos principales. Los prestatarios no prime enfrentan 11\u201315%, y los prestatarios subprime (FICO bajo 600) rutinariamente ven APR por encima del 18% en papel de vehículo usado.",
    s1P2:
      "Los montos promedio de préstamos de vehículos usados ahora exceden $26,000, el plazo promedio es de 67 meses, y aproximadamente un cuarto de los nuevos préstamos de auto usado se extienden a 73 meses o más. Ese aumento de plazo es el patrón más importante por reconocer: cuanto más largo el plazo, más interés pagas, y más tiempo pasas bajo el agua en el préstamo. Un análisis de Edmunds de 2024 encontró que el capital negativo promedio enrollado en préstamos nuevos superó $6,000, un récord histórico.",
    s2H: "Cómo tu puntaje de crédito moldea el préstamo",
    s2P1:
      "Los rangos de puntaje de crédito impulsan todo: APR, máxima relación préstamo-valor, disponibilidad de plazo y precio de extras. La mayoría de los prestamistas usan el FICO Auto Score 8 o 9, que es un modelo de puntuación específico para productos crediticios que pesa el comportamiento pasado de préstamos de auto más fuertemente que el puntaje FICO general. Tu FICO de aplicación de tarjeta de crédito y tu FICO Auto Score pueden diferir por más de 30 puntos.",
    s2P2:
      "Rangos aproximados de APR para financiamiento de auto usado a inicios de 2026 (varía por prestamista y región):",
    tableHead: { band: "Rango FICO", tier: "Nivel", apr: "APR típico" },
    tableRows: [
      { band: "781\u2013850", tier: "Súper-prime", apr: "6.99\u20137.99%" },
      { band: "661\u2013780", tier: "Prime", apr: "8.49\u20139.99%" },
      { band: "601\u2013660", tier: "Casi-prime", apr: "11.49\u201313.49%" },
      { band: "501\u2013600", tier: "Subprime", apr: "14.99\u201318.49%" },
      { band: "300\u2013500", tier: "Subprime profundo", apr: "18.99%+" },
    ],
    s2P3:
      "Si tu puntaje está en la parte superior de un rango, incluso una pequeña mejora puede llevarte al siguiente y ahorrar miles a lo largo de la vida del préstamo. Tres arreglos de crédito de alto impacto que funcionan rápido: paga los saldos rotativos por debajo del 30% de utilización, disputa cualquier cobro incorrecto con los burós, y evita abrir nuevas líneas de crédito en los 90 días antes de aplicar.",
    s3H: "Concesionario vs. banco vs. cooperativa de crédito",
    s3P1:
      "Existen tres canales principales de prestamistas para los prestatarios de auto usado, y cada uno tiene ventajas y desventajas estructurales.",
    s3CULead: "Las cooperativas de crédito",
    s3CUBody:
      " consistentemente ofrecen los APR más bajos para prestatarios prime y casi-prime, a menudo 0.5\u20132 puntos porcentuales por debajo de los bancos. Son propiedad de los miembros, lo que significa que la suscripción tiende a considerar factores de relación (duración de la membresía, otros saldos de depósito) además del puntaje FICO puro. Los requisitos de membresía son a menudo triviales de cumplir — muchas cooperativas tienen campos de membresía geográficos o basados en el empleador que admiten a casi cualquiera en la región.",
    s3BankLead: "Los bancos y prestamistas en línea",
    s3BankBody:
      " compiten en velocidad y conveniencia. Las decisiones llegan en minutos, los fondos se transfieren o se imprimen como un cheque en el cierre, y muchos se integran con cuentas de cheques que ya tienes. Los APR quedan detrás de las cooperativas para prestatarios prime pero son competitivos para solicitantes súper-prime que califican para tasas promocionales.",
    s3DealerLead: "El financiamiento del concesionario",
    s3DealerBody:
      " es técnicamente préstamo indirecto: el concesionario envía tu solicitud a una red de prestamistas (bancos, brazos de financiamiento cautivos, prestamistas especializados), recibe una tasa de compra y te cotiza una tasa de contrato que añade un margen. La conveniencia es real, y en vehículos certificados pre-poseídos con subvención del fabricante la tasa puede vencer al mercado. El riesgo es que el margen es invisible a menos que tengas una preaprobación con la cual comparar.",
    s4H: "Preaprobación: el superpoder del comprador",
    s4P1:
      "Una preaprobación es un compromiso condicional escrito de un prestamista que indica el monto máximo, el APR y el plazo que financiarán para ti. Es la herramienta más poderosa que tiene un comprador de auto usado, por tres razones:",
    s4List: [
      { bold: "Define tu techo.", body: " Caminas hacia el concesionario sabiendo exactamente cuánto puedes pedir prestado y a qué tasa. La oficina F&I del concesionario no puede expandir ese techo sin tu consentimiento." },
      { bold: "Expone el margen del concesionario.", body: " Si el concesionario ofrece 8.99% y tu preaprobación de cooperativa de crédito es 7.49%, el margen es de 1.5 puntos porcentuales — y tienes prueba escrita de que un prestamista competidor los superará." },
      { bold: "Elimina la trampa del \u201cpago mensual\u201d.", body: " Con el financiamiento resuelto, la conversación puede quedarse en el precio total de salida." },
    ],
    s4P2:
      "Obtén al menos tres preaprobaciones: una cooperativa de crédito, un banco, un prestamista en línea. Envíalas dentro de una ventana de 14 días para que los principales burós de crédito las traten como una sola consulta para fines de puntuación. Usa la mejor oferta como tu piso de negociación en el concesionario.",
    s5H: "APR vs. costo total vs. pago mensual",
    s5P1Pre:
      "Tres números describen cada préstamo de auto, y los vendedores te redirigen al menos informativo. El APR es el costo anualizado de pedir prestado. El pago mensual es cuánto escribes por mes. El ",
    s5P1Bold: "total de pagos",
    s5P1Post:
      " es la cantidad real en dólares que entregarás para cuando el préstamo esté pagado — y es el único número que captura el costo completo.",
    s5P2:
      "Ejemplo trabajado: un préstamo de $25,000 al 9.49% APR a 60 meses tiene un pago mensual de $525 y totaliza $31,475 pagados — significando $6,475 en interés a lo largo de la vida del préstamo. Estíralo a 72 meses y el pago mensual cae a $458, pero el total pagado salta a $32,976 — un extra de $1,500 en interés por la conveniencia de un pago menor. Estíralo a 84 meses y pagas $34,558, con el riesgo adicional de estar en negativo los primeros tres o cuatro años.",
    s5P3:
      "Siempre negocia contra el total de pagos. El pago mensual es en lo que el concesionario quiere que te enfoques porque es trivialmente manipulable cambiando la duración del plazo.",
    s6H: "Plazo del préstamo: más corto casi siempre es mejor",
    s6P1:
      "La regla 20/4/10 es criticada por ser demasiado conservadora en un entorno de tasas altas, pero sobrevive por una razón: la matemática se mantiene. Un plazo de cuatro años al 8.49% sobre $20,000 totaliza aproximadamente $23,664 pagados — $3,664 en interés. Un plazo de seis años a la misma tasa totaliza $25,653 pagados — $5,653 en interés. La diferencia de $1,989 es el precio del plazo más largo.",
    s6P2:
      "Además del puro costo de interés, el plazo más largo crea dos riesgos estructurales. Primero, pasas más tiempo bajo el agua — la depreciación supera la amortización del capital, así que si pierdes el auto totalmente o quieres vender, debes más de lo que vale. Segundo, cuanto más largo el plazo, más probable que tus circunstancias de vida cambien (trabajo, familia, reubicación) y te obliguen a una venta o intercambio desventajoso.",
    s6P3:
      "Para la mayoría de los compradores, 48 meses es el límite superior. 60 meses es aceptable en un vehículo de mayor calidad con un pago inicial sustancial. 72 meses y más allá deberían ser un último recurso.",
    s7H: "Pago inicial, GAP y estar bajo el agua",
    s7P1:
      "Un pago inicial del 20% es el referente de larga data porque hace dos cosas a la vez. Reduce inmediatamente el capital que financias, bajando tanto el pago mensual como el interés total. Y absorbe el fuerte golpe de depreciación del primer año, manteniendo tu relación préstamo-valor por debajo del 100% desde el día uno. Sin ese colchón, un vehículo que se deprecia 18\u201322% en el primer año te deja bajo el agua — debiendo más de lo que vale el auto.",
    s7P2:
      "La cobertura GAP (Protección Garantizada del Activo) existe específicamente para esta brecha. Si tu vehículo es pérdida total o robado, el GAP paga la diferencia entre el pago del seguro (valor real en efectivo) y tu saldo pendiente del préstamo. El GAP es genuinamente valioso, pero la oficina F&I rutinariamente lo vende a $700\u2013$1,200, mientras que las cooperativas de crédito ofrecen la misma cobertura por $200\u2013$400. Compra el GAP de tu cooperativa de crédito, no del concesionario.",
    s7P3Pre:
      "Una trampa más: enrollar capital negativo de un préstamo previo en el nuevo. La oficina F&I del concesionario puede silenciosamente rellenar tu nuevo préstamo con el déficit de tu intercambio. El resultado es un préstamo que comienza instantáneamente bajo el agua y se mantiene así por años. Camina sabiendo el valor mayorista y minorista de tu intercambio (ejecuta el VIN a través de nuestra ",
    s7P3Link: "verificación VIN",
    s7P3Post:
      " y la herramienta de recompra del fabricante o KBB) y negócialo como una transacción separada.",
    s8H: "Arrendar vs. comprar un auto usado",
    s8P1:
      "El arrendamiento de autos usados es raro pero no desconocido. Un puñado de brazos de financiamiento cautivos (BMW Financial, Mercedes-Benz Financial, Lexus Financial, Audi Financial) arriendan vehículos certificados pre-poseídos a compradores calificados, usualmente en plazos de 24 o 36 meses. La matemática raramente le gana a comprar, porque la curva de depreciación ya se ha aplanado: estás pagando el golpe residual sobre un vehículo que se depreciará más lento que uno nuevo.",
    s8P2:
      "Para la mayoría de los compradores, arrendar un auto usado es la decisión equivocada. Financiar un auto usado te da propiedad total, sin límites de millaje, sin cargos de desgaste al final del arrendamiento, y la habilidad de vender o intercambiar cuando elijas. Los escenarios donde el arrendamiento usado tiene sentido son estrechos: un comprador que valora la prima de garantía respaldada por el fabricante de un programa CPO, conduce muy por debajo de 12,000 millas por año y tiene la intención de actualizar frecuentemente.",
    s9H: "Refinanciar: cuándo y cómo",
    s9P1:
      "Refinanciar reemplaza tu préstamo de auto existente con uno nuevo a (idealmente) un APR menor. Tres escenarios comúnmente justifican un refinanciamiento:",
    s9List: [
      { bold: "Las tasas han bajado.", body: " Incluso una reducción de un punto porcentual puede ahorrar cientos sobre el plazo restante." },
      { bold: "Tu crédito ha mejorado.", body: " Los prestatarios que tomaron un préstamo subprime hace un año y han reconstruido crédito pueden rutinariamente reducir su tasa por varios puntos." },
      { bold: "Necesitas un plazo diferente.", body: " Refinanciar a un plazo más corto reduce el costo de interés; extender el plazo reduce el pago mensual pero eleva el costo total." },
    ],
    s9P2:
      "Mecánica: el prestamista de refinanciamiento paga el préstamo original, toma un nuevo gravamen sobre el vehículo, y comienzas a hacer pagos sobre el nuevo préstamo. Usualmente no hay costo más allá de una pequeña tarifa de registro de gravamen. Las penalizaciones por pago anticipado son raras en préstamos de auto pero verifica el contrato original antes de jalar el gatillo.",
    s10H: "Sobreviviendo la oficina F&I",
    s10P1:
      "La oficina de finanzas es donde se hace la ganancia del concesionario. Después de haber negociado el precio del vehículo, te sientas con el gerente de finanzas quien te lleva a través de un largo menú de extras. Cada uno es una negociación separada; ninguno es requerido.",
    s10List: [
      { bold: "Garantía extendida / contrato de servicio del vehículo", body: " — puede valer la pena en ciertos vehículos, pero los márgenes de 100\u2013200% son comunes. Compara contra el precio de la cooperativa de crédito." },
      { bold: "Seguro GAP", body: " — valioso, pero el margen del concesionario es típicamente 3\u20135x el precio de la cooperativa de crédito." },
      { bold: "Protección de llantas y ruedas", body: " — alto margen, baja utilidad para la mayoría de los compradores." },
      { bold: "Protección de pintura / protección de tela", body: " — usualmente una aplicación de cera o spray de tela marcado al 1,000%. Rechaza." },
      { bold: "Grabado VIN", body: " — supuestamente para disuadir el robo. Puedes comprar un kit por $20." },
      { bold: "Llenado de llantas con nitrógeno", body: " — el aire es 78% nitrógeno gratis." },
    ],
    s10P2:
      "Lee el contrato cuidadosamente antes de firmar. Verifica que el APR, plazo y total de pagos coincidan con lo que acordaste verbalmente. Verifica que no aparezcan extras que no autorizaste. Una vez que firmas, lograr que quiten cosas se vuelve mucho más difícil.",
    specH: "Situaciones de financiamiento especializadas",
    specP:
      "El manual estándar de arriba cubre a la mayoría de los compradores, pero varias situaciones merecen su propia consideración: prestatarios subprime, compradores por primera vez, solicitantes autoempleados y compradores que financian vehículos con título marcado o más viejos.",
    sub1H: "Financiamiento subprime sin quedar atrapado",
    sub1P:
      "Los prestatarios subprime (FICO 500\u2013620) enfrentan APR en el rango del 14\u201319% y a menudo ven sus solicitudes enrutadas a prestamistas especializados. Algunos principios para protegerte: siempre insiste en un préstamo de interés simple amortizable, nunca un contrato de interés precomputado que penaliza el pago anticipado; verifica que no haya penalización por pago anticipado; limita el plazo a 60 meses incluso si se ofrece más largo; y pon todo lo posible como pago inicial para reducir la relación préstamo-valor por debajo del 100%. Muchos compradores subprime refinancian después de que 12 meses de pagos puntuales reconstruyen el crédito, reduciendo su tasa por tres o más puntos porcentuales.",
    sub2H: "Programas para compradores primerizos",
    sub2P:
      "La mayoría de las principales cooperativas de crédito y varios brazos cautivos de fabricantes ejecutan programas dedicados para compradores primerizos que aflojan los requisitos de crédito a cambio de empleo documentado, una pequeña verificación de ingresos, y a veces un cofirmante. Los APR son típicamente cercanos a tasas prime en vez de subprime, y los plazos están restringidos a 48\u201360 meses. Vale la pena perseguir agresivamente antes de aceptar una tasa subprime más alta.",
    sub3H: "Prestatarios autoempleados y 1099",
    sub3P:
      "Los solicitantes autoempleados a menudo enfrentan fricción porque los prestamistas usan ingresos declarados de W-2s como su verificación por defecto. Trae dos años de declaraciones de impuestos personales y de negocio, los dos meses más recientes de estados bancarios personales mostrando depósitos consistentes, y un resumen de ganancias y pérdidas para el año actual. Las cooperativas de crédito son típicamente más flexibles que los bancos nacionales para solicitantes autoempleados, y muchas usarán el promedio de los últimos dos años de ingreso neto para fines de calificación.",
    sub4H: "Financiar vehículos marcados o más viejos",
    sub4PPre:
      "Muchos prestamistas se rehúsan a financiar vehículos con título de salvamento o reconstruido por completo. Aquellos que lo hacen usualmente cobran 2\u20135 puntos porcentuales por encima de su tasa de título limpio y requieren plazos más cortos. Los vehículos más viejos de 10 años modelo o por encima de 120,000 millas enfrentan restricciones similares. Si estás financiando en cualquiera de esas categorías, espera un grupo de prestamistas más pequeño y divulga el estado del título por adelantado para no perder tiempo en una preaprobación que se colapsa al financiar. Obtén una ",
    sub4PLink: "verificación de título de salvamento",
    sub4PPost:
      " completa antes de aplicar para que sepas exactamente qué marcas lleva el título.",
    sub5H: "Mecánica del intercambio dentro de un trato financiado",
    sub5P1:
      "Los intercambios complican las matemáticas del financiamiento en formas que consistentemente trabajan contra el comprador. El concesionario ofrece un valor de intercambio, lo aplica como crédito hacia la compra y financia el resto. Dominan dos trampas. Primero, el valor de intercambio ofrecido por el concesionario es usualmente 15\u201325% por debajo del valor de venta entre particulares — el concesionario absorbe el costo de reacondicionamiento y el riesgo de reventa en el margen. Segundo, si debes más en tu préstamo existente que el valor del intercambio, el capital negativo se enrolla en el nuevo préstamo, comenzándote instantáneamente bajo el agua.",
    sub5P2:
      "Enfoque defensivo: obtén una oferta instantánea de compradores en línea (Carvana, CarMax, plataformas estilo Vroom) antes de caminar al concesionario. Usa la oferta escrita más alta como tu piso. Muchos compradores encuentran que vender a una plataforma de oferta instantánea y caminar al concesionario con efectivo por el nuevo vehículo arroja mejor economía total que el intercambio. Los créditos fiscales por intercambio pueden cambiar el cálculo en algunos estados — el impuesto sobre las ventas se evalúa comúnmente solo sobre la diferencia entre el precio del vehículo nuevo y el valor del intercambio — así que ejecuta ambos escenarios con la tasa fiscal específica de tu estado.",
    insH: "Seguro y registro: las partidas ocultas",
    insP1:
      "El seguro es el segundo costo recurrente más grande de la propiedad del vehículo después del pago del préstamo en sí. Varios factores que moldean tu prima son controlables y vale la pena optimizar antes de finalizar la compra. La elección del vehículo importa: un Hyundai Elantra es dramáticamente más barato de asegurar que un Dodge Charger del mismo valor, porque las aseguradoras tasan basándose en frecuencia de robo, severidad de reclamos y datos históricos de pérdida en esa marca/modelo específica. Siempre obtén una cotización vinculante sobre el vehículo exacto antes de comprometerte.",
    insP2:
      "Los niveles de cobertura importan en vehículos financiados. Los prestamistas requieren cobertura amplia y de colisión con deducibles limitados a $1,000 durante la duración del préstamo; la mayoría de los compradores predeterminan a deducibles de $500, lo cual eleva la prima significativamente. Los límites de responsabilidad deben seguir tu patrimonio neto, no el mínimo del prestamista — la pequeña diferencia de prima entre la responsabilidad mínima del estado y una póliza de $250k/$500k es uno de los dólares de seguro de mayor apalancamiento que gastas.",
    insP3:
      "Los costos de registro varían dramáticamente por estado. El impuesto a la propiedad del vehículo (Virginia, Connecticut, Massachusetts, otros) puede añadir cientos anualmente. Las tarifas de registro en California escalan con el valor del vehículo; en Texas son fijas. Construye el costo recurrente de registro en tu presupuesto anual de propiedad, no solo en los números de compra del primer año.",
    cycH: "Financiamiento en un entorno de tasas altas: principios que sobreviven el ciclo",
    cycP1:
      "Las tasas de préstamos de auto han oscilado en años recientes. Los principios que sobreviven cualquier entorno de tasas son simples: compara preaprobaciones de al menos tres prestamistas, ancla en costo total en vez de pago mensual, mantén el plazo tan corto como permita el presupuesto y refinancia oportunísticamente conforme mejora el crédito y se mueven las tasas. Los compradores que siguen estos cuatro principios rutinariamente ahorran miles a lo largo de la vida del préstamo comparados con quienes caminan a un concesionario sin preparación.",
    cycP2Pre:
      "Igualmente importante: la elección del vehículo en sí moldea la economía del financiamiento. Un vehículo confiable de menor depreciación protege tu posición préstamo-valor incluso cuando las tasas fluctúan. Un vehículo con fuerte valor de reventa (Toyota, Honda, Lexus, Subaru) tiende a quedarse por encima del agua durante el plazo del préstamo; las marcas de depreciación más rápida y vehículos de lujo de alto valor pueden caer por debajo del saldo del préstamo por años. El reporte de historial que obtienes en la compra moldea la reventa futura — los vehículos de título limpio, con pocos accidentes, consistentemente obtienen mejores ofertas de intercambio años después. Ejecuta el reporte a través de nuestra ",
    cycP2Link: "verificación VIN",
    cycP2Post: " antes de firmar nada.",
    relH: "Lectura relacionada",
    relCards: [
      { href: "/guides/used-car-buying-complete-guide", title: "Guía completa para comprar auto usado", desc: "De extremo a extremo: del presupuesto al papeleo." },
      { href: "/vin-check", title: "Verificación VIN", desc: "Verifica el vehículo antes de firmar el préstamo." },
      { href: "/dealers", title: "Para concesionarios", desc: "Reportes masivos para pisos de ventas." },
      { href: "/guides", title: "Todas las guías", desc: "Compra, fraude, decodificación y reportes de historial." },
      { href: "/guides/car-history-report-guide", title: "Guía del reporte de historial del vehículo", desc: "Qué hay en un reporte y cómo leerlo." },
      { href: "/guides/vehicle-fraud-prevention", title: "Prevención de fraude vehicular", desc: "Fraude de título, odómetro y clonación." },
      { href: "/blog", title: "Blog de CarCheckerVIN", desc: "Rastreadores de tasas, depreciación y noticias del mercado." },
      { href: "/glossary", title: "Glosario de auto usado", desc: "Cada término de préstamo, concesionario y DMV definido." },
    ],
    contH: "Continúa aprendiendo",
    contPre: "¿Listo para evaluar el vehículo detrás del préstamo? Decodifica el VIN en nuestra ",
    contLink1: "herramienta de verificación VIN",
    contMid: " o lee la ",
    contLink2: "guía completa para comprar auto usado",
    contPost: " para el manual completo previo a la compra.",
    faqH: "Preguntas frecuentes",
    faqP:
      "Respuestas generales y educativas a las preguntas más buscadas sobre financiar un auto usado. Esta es guía informativa, no asesoría financiera personalizada.",
    bottomH: "Evalúa el vehículo antes de financiar",
    bottomP:
      "Las marcas de título y el historial de accidentes pueden hundir el valor de reventa — y tu relación préstamo-valor con él. Ejecuta el VIN primero.",
  },
} as const;

const FAQS_EN = [
  { question: "How does used car financing work?", answer: "Used car financing is a secured installment loan: a lender pays the seller, you repay the borrowed amount plus interest in fixed monthly payments, and the vehicle serves as collateral until the loan is paid off. Lenders evaluate your credit history, income, and the loan-to-value ratio, along with the car's age and mileage, because older or higher-mileage vehicles depreciate faster and carry more risk. You can borrow from a bank, credit union, online lender, or through dealer-arranged financing." },
  { question: "What credit score do I need to finance a used car?", answer: "There is no universal minimum, and some lenders approve borrowers with scores in the 500s, but a higher score generally unlocks lower interest rates and more lender choices. Lenders typically group applicants into tiers such as super-prime, prime, near-prime, and subprime, with each lower tier paying meaningfully higher rates. Beyond the score itself, lenders also weigh your income, debt-to-income ratio, and the loan-to-value of the specific vehicle." },
  { question: "Should I get pre-approved before shopping for a used car?", answer: "Pre-approval is a written conditional offer from a lender stating the amount, rate, and term they will finance. It clarifies your realistic budget before you shop, locks in a rate you can compare against dealer offers, and shifts negotiation toward the vehicle's price rather than a monthly payment. Submitting several applications within a short shopping window (commonly counted as a single inquiry by credit-scoring models) lets you compare lenders with minimal credit-score impact." },
  { question: "Is dealer financing or a bank/credit union loan better?", answer: "Each channel has trade-offs. Credit unions are member-owned and often offer competitive used-car rates, sometimes considering relationship factors beyond the credit score. Banks and online lenders compete on speed and convenience. Dealer financing is indirect lending: the dealer submits your application to lenders and may add a markup to the rate, so it can be convenient but harder to verify. Comparing a pre-approval against any dealer quote is the most reliable way to see which is actually cheaper." },
  { question: "Can you finance a salvage or branded-title car?", answer: "It is often difficult. Many banks and credit unions decline loans on salvage or rebuilt-title vehicles entirely because the title brand reduces collateral value and resale certainty. Lenders that do finance them typically charge higher rates and require shorter terms or larger down payments. Because a title brand can collapse a pre-approval at funding, it is worth running a VIN check before applying so you know exactly what brands appear on the title and can disclose them upfront." },
  { question: "What is a typical used-car loan term?", answer: "Used-car loan terms commonly range from 36 to 72 months, and some lenders offer 84-month terms. A longer term lowers the monthly payment but increases the total interest paid and keeps you owing money on the vehicle for longer, which raises the chance of being underwater (owing more than the car is worth). A shorter term costs more each month but reduces total interest and builds equity faster." },
  { question: "How does a down payment affect my used-car loan?", answer: "A down payment reduces the amount you finance, which lowers both your monthly payment and the total interest paid over the loan. It also improves your loan-to-value ratio, helping offset early depreciation so you are less likely to owe more than the car is worth. A larger down payment can additionally widen the pool of willing lenders and may help applicants with lower credit scores qualify or secure better terms." },
];

const FAQS_ES = [
  { question: "¿Cómo funciona el financiamiento de auto usado?", answer: "El financiamiento de auto usado es un préstamo a plazos garantizado: un prestamista paga al vendedor, tú devuelves el monto prestado más interés en pagos mensuales fijos, y el vehículo sirve como colateral hasta que el préstamo se pague. Los prestamistas evalúan tu historial de crédito, ingresos y la relación préstamo-valor, junto con la edad y millaje del auto, porque los vehículos más viejos o de mayor millaje se deprecian más rápido y conllevan más riesgo. Puedes pedir prestado a un banco, cooperativa de crédito, prestamista en línea o a través del financiamiento arreglado por el concesionario." },
  { question: "¿Qué puntaje de crédito necesito para financiar un auto usado?", answer: "No hay un mínimo universal, y algunos prestamistas aprueban prestatarios con puntajes en los 500, pero un puntaje más alto generalmente desbloquea tasas de interés más bajas y más opciones de prestamistas. Los prestamistas típicamente agrupan a los solicitantes en niveles como súper-prime, prime, casi-prime y subprime, con cada nivel inferior pagando tasas significativamente más altas. Más allá del puntaje en sí, los prestamistas también pesan tus ingresos, relación deuda-ingreso y la relación préstamo-valor del vehículo específico." },
  { question: "¿Debería preaprobarme antes de buscar un auto usado?", answer: "La preaprobación es una oferta condicional escrita de un prestamista indicando el monto, tasa y plazo que financiarán. Aclara tu presupuesto realista antes de comprar, fija una tasa que puedes comparar contra ofertas del concesionario y desplaza la negociación hacia el precio del vehículo en vez de un pago mensual. Enviar varias solicitudes dentro de una ventana corta de compra (comúnmente contadas como una sola consulta por los modelos de puntuación de crédito) te permite comparar prestamistas con impacto mínimo al puntaje de crédito." },
  { question: "¿Es mejor el financiamiento del concesionario o un préstamo de banco/cooperativa de crédito?", answer: "Cada canal tiene compensaciones. Las cooperativas de crédito son propiedad de los miembros y a menudo ofrecen tasas competitivas para auto usado, a veces considerando factores de relación más allá del puntaje de crédito. Los bancos y prestamistas en línea compiten en velocidad y conveniencia. El financiamiento del concesionario es préstamo indirecto: el concesionario envía tu solicitud a los prestamistas y puede añadir un margen a la tasa, así que puede ser conveniente pero más difícil de verificar. Comparar una preaprobación contra cualquier cotización del concesionario es la forma más confiable de ver cuál es realmente más barata." },
  { question: "¿Puedes financiar un auto de salvamento o con título marcado?", answer: "A menudo es difícil. Muchos bancos y cooperativas de crédito rechazan préstamos sobre vehículos con título de salvamento o reconstruido por completo porque la marca del título reduce el valor del colateral y la certeza de reventa. Los prestamistas que sí los financian típicamente cobran tasas más altas y requieren plazos más cortos o pagos iniciales más grandes. Como una marca de título puede colapsar una preaprobación al financiar, vale la pena ejecutar una verificación VIN antes de aplicar para que sepas exactamente qué marcas aparecen en el título y puedas divulgarlas por adelantado." },
  { question: "¿Cuál es un plazo típico de préstamo de auto usado?", answer: "Los plazos de préstamo de auto usado comúnmente van de 36 a 72 meses, y algunos prestamistas ofrecen plazos de 84 meses. Un plazo más largo baja el pago mensual pero aumenta el interés total pagado y te mantiene debiendo dinero sobre el vehículo por más tiempo, lo que eleva la posibilidad de estar bajo el agua (debiendo más de lo que vale el auto). Un plazo más corto cuesta más cada mes pero reduce el interés total y construye capital más rápido." },
  { question: "¿Cómo afecta un pago inicial mi préstamo de auto usado?", answer: "Un pago inicial reduce el monto que financias, lo cual baja tanto tu pago mensual como el interés total pagado durante el préstamo. También mejora tu relación préstamo-valor, ayudando a compensar la depreciación temprana para que sea menos probable que debas más de lo que vale el auto. Un pago inicial más grande puede adicionalmente ampliar el grupo de prestamistas dispuestos y puede ayudar a los solicitantes con puntajes de crédito más bajos a calificar o asegurar mejores términos." },
];

interface Props { locale: Locale; }

export default function GuideUsedCarFinancingBody({ locale }: Props) {
  const c = COPY[locale];
  const faqs = locale === "es" ? FAQS_ES : FAQS_EN;
  const link = (en: string) => (locale === "es" ? `/es${en}` : en);

  return (
    <>
      <article className="pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: c.home, href: locale === "es" ? "/es" : "/" },
              { label: c.guides, href: link("/guides") },
              { label: c.crumb },
            ]}
          />

          <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
            {c.h1}
          </h1>
          <p className="mt-4 text-lg text-slate-700 leading-relaxed">
            {c.intro}
          </p>

          <div className="mt-8 p-6 bg-primary-50 rounded-2xl border border-primary-100">
            <h2 className="text-lg font-bold text-slate-900 mb-3">
              {c.vetBoxTitle}
            </h2>
            <p className="text-sm text-slate-600 mb-4">
              {c.vetBoxBody}
            </p>
            <VinSearchForm size="sm" />
          </div>

          <nav
            aria-label={c.tocAria}
            className="mt-10 p-6 rounded-2xl border border-slate-200 bg-white"
          >
            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-700 mb-3">
              {c.tocTitle}
            </h2>
            <ol className="space-y-2 text-slate-700 text-sm list-decimal list-inside">
              {c.toc.map((t) => (
                <li key={t.href}>
                  <a href={t.href} className="text-primary-600 hover:underline font-medium">
                    {t.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <h2 id="landscape" className="mt-12 text-2xl font-bold text-slate-900 scroll-mt-24 flex items-center gap-2">
            <TrendingDown className="w-6 h-6 text-primary-600" /> {c.s1H}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.s1P1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.s1P2}</p>

          <h2 id="credit" className="mt-12 text-2xl font-bold text-slate-900 scroll-mt-24 flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-primary-600" /> {c.s2H}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.s2P1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.s2P2}</p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-700">
                <tr>
                  <th className="px-4 py-3 font-semibold">{c.tableHead.band}</th>
                  <th className="px-4 py-3 font-semibold">{c.tableHead.tier}</th>
                  <th className="px-4 py-3 font-semibold">{c.tableHead.apr}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {c.tableRows.map((r) => (
                  <tr key={r.band}>
                    <td className="px-4 py-3">{r.band}</td>
                    <td className="px-4 py-3">{r.tier}</td>
                    <td className="px-4 py-3">{r.apr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-slate-600 leading-relaxed">{c.s2P3}</p>

          <h2 id="lenders" className="mt-12 text-2xl font-bold text-slate-900 scroll-mt-24 flex items-center gap-2">
            <Building2 className="w-6 h-6 text-primary-600" /> {c.s3H}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.s3P1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            <strong>{c.s3CULead}</strong>{c.s3CUBody}
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            <strong>{c.s3BankLead}</strong>{c.s3BankBody}
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            <strong>{c.s3DealerLead}</strong>{c.s3DealerBody}
          </p>

          <h2 id="preapproval" className="mt-12 text-2xl font-bold text-slate-900 scroll-mt-24 flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-emerald-500" /> {c.s4H}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.s4P1}</p>
          <ol className="mt-4 space-y-2 text-slate-600 list-decimal list-inside">
            {c.s4List.map((it) => (
              <li key={it.bold}>
                <strong>{it.bold}</strong>{it.body}
              </li>
            ))}
          </ol>
          <p className="mt-4 text-slate-600 leading-relaxed">{c.s4P2}</p>

          <h2 id="apr" className="mt-12 text-2xl font-bold text-slate-900 scroll-mt-24 flex items-center gap-2">
            <Percent className="w-6 h-6 text-primary-600" /> {c.s5H}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            {c.s5P1Pre}<strong>{c.s5P1Bold}</strong>{c.s5P1Post}
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.s5P2}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.s5P3}</p>

          <h2 id="term" className="mt-12 text-2xl font-bold text-slate-900 scroll-mt-24 flex items-center gap-2">
            <Calculator className="w-6 h-6 text-primary-600" /> {c.s6H}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.s6P1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.s6P2}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.s6P3}</p>

          <h2 id="downpayment" className="mt-12 text-2xl font-bold text-slate-900 scroll-mt-24 flex items-center gap-2">
            <PiggyBank className="w-6 h-6 text-primary-600" /> {c.s7H}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.s7P1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.s7P2}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            {c.s7P3Pre}
            <Link href={link("/vin-check")} className="text-primary-600 hover:underline font-medium">
              {c.s7P3Link}
            </Link>
            {c.s7P3Post}
          </p>

          <h2 id="lease" className="mt-12 text-2xl font-bold text-slate-900 scroll-mt-24 flex items-center gap-2">
            <FileSignature className="w-6 h-6 text-primary-600" /> {c.s8H}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.s8P1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.s8P2}</p>

          <h2 id="refinance" className="mt-12 text-2xl font-bold text-slate-900 scroll-mt-24 flex items-center gap-2">
            <Repeat className="w-6 h-6 text-primary-600" /> {c.s9H}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.s9P1}</p>
          <ul className="mt-4 space-y-2 text-slate-600 list-disc list-inside">
            {c.s9List.map((it) => (
              <li key={it.bold}>
                <strong>{it.bold}</strong>{it.body}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-slate-600 leading-relaxed">{c.s9P2}</p>

          <h2 id="fi-office" className="mt-12 text-2xl font-bold text-slate-900 scroll-mt-24 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-amber-500" /> {c.s10H}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.s10P1}</p>
          <ul className="mt-4 space-y-2 text-slate-600 list-disc list-inside">
            {c.s10List.map((it) => (
              <li key={it.bold}>
                <strong>{it.bold}</strong>{it.body}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-slate-600 leading-relaxed">{c.s10P2}</p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900 scroll-mt-24">{c.specH}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.specP}</p>

          <h3 className="mt-6 text-xl font-bold text-slate-900">{c.sub1H}</h3>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.sub1P}</p>

          <h3 className="mt-8 text-xl font-bold text-slate-900">{c.sub2H}</h3>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.sub2P}</p>

          <h3 className="mt-8 text-xl font-bold text-slate-900">{c.sub3H}</h3>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.sub3P}</p>

          <h3 className="mt-8 text-xl font-bold text-slate-900">{c.sub4H}</h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            {c.sub4PPre}
            <Link href={link("/salvage-title-check")} className="text-primary-600 hover:underline font-medium">
              {c.sub4PLink}
            </Link>
            {c.sub4PPost}
          </p>

          <h3 className="mt-8 text-xl font-bold text-slate-900">{c.sub5H}</h3>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.sub5P1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.sub5P2}</p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900 scroll-mt-24">{c.insH}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.insP1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.insP2}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.insP3}</p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900 scroll-mt-24">{c.cycH}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.cycP1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            {c.cycP2Pre}
            <Link href={link("/vin-check")} className="text-primary-600 hover:underline font-medium">
              {c.cycP2Link}
            </Link>
            {c.cycP2Post}
          </p>

          <h2 className="mt-14 text-2xl font-bold text-slate-900">{c.relH}</h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {c.relCards.map((card) => (
              <Link
                key={card.href}
                href={link(card.href)}
                className="block p-5 rounded-2xl border border-slate-200 bg-white hover:border-primary-300 hover:shadow-sm transition"
              >
                <div className="font-semibold text-slate-900">{card.title}</div>
                <p className="mt-1 text-sm text-slate-700">{card.desc}</p>
              </Link>
            ))}
          </div>

          <h2 className="mt-14 text-2xl font-bold text-slate-900">{c.contH}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            {c.contPre}
            <Link href={link("/vin-check")} className="text-primary-600 hover:underline font-medium">
              {c.contLink1}
            </Link>
            {c.contMid}
            <Link href={link("/guides/used-car-buying-complete-guide")} className="text-primary-600 hover:underline font-medium">
              {c.contLink2}
            </Link>
            {c.contPost}
          </p>

          <h2 className="mt-14 text-2xl font-bold text-slate-900">{c.faqH}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.faqP}</p>
          <div className="mt-6 space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-xl border border-slate-200 bg-white p-5 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 list-none">
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900 m-0">
                    {faq.question}
                  </h3>
                  <span className="flex-shrink-0 text-2xl font-light text-primary-600 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-slate-600 leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </article>

      <section className="py-14 bg-slate-50">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">{c.bottomH}</h2>
          <p className="text-slate-700 mb-6">{c.bottomP}</p>
          <VinSearchForm size="sm" />
        </div>
      </section>
    </>
  );
}

export { FAQS_EN, FAQS_ES };
