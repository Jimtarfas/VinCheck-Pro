/**
 * Shared body for /glossary and /es/glossary.
 * Wave 16d — identical JSX, locale-driven copy.
 *
 * Terms stay in English (industry/legal acronyms like NMVTIS, NICB,
 * WMI, VIN don't translate); definitions translate to Spanish.
 * Each definition is full Spanish so the entry is actually useful
 * to a Spanish-speaking buyer.
 */

import Link from "@/components/LocaleLink";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import type { Locale } from "@/i18n/config";

type Term = { term: string; definition: string; href?: string };

const COPY = {
  en: {
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Glossary",
    h1: "VIN & Vehicle History Glossary",
    heroLead:
      "Buying a used car involves a lot of paperwork, acronyms, and title-brand jargon. This glossary defines more than 60 of the most important VIN, title, valuation, and vehicle history terms you will encounter, so you can shop with confidence and spot trouble before it costs you.",
    lettersAria: "Glossary letters",
    faqHeading: "Frequently Asked Questions",
    faqIntro:
      "Quick, plain-English answers to the most common questions about VINs, title brands, and vehicle history terminology.",
    quickHeading: "Quick Tools",
    quickIntro:
      "Put what you just learned to work. Run a free VIN check or jump straight to a focused history lookup.",
    quickToolSubTemplate: "Run a focused {label} by VIN.",
    ctaHeading: "Ready to Decode a VIN?",
    ctaBody: "Enter any 17-character VIN to see specs, title brands, and history in seconds.",
    quickTools: [
      { label: "Free VIN Check" },
      { label: "Stolen Vehicle Check" },
      { label: "Salvage Title Check" },
      { label: "Accident History Check" },
      { label: "Odometer Check" },
      { label: "Lemon Check" },
    ],
    faqs: [
      { q: "What is a VIN?", a: "A VIN (Vehicle Identification Number) is a 17-character alphanumeric code that uniquely identifies every modern vehicle. It encodes the manufacturer, brand, vehicle type, model year, assembly plant, and a unique production serial number. The VIN appears on the dashboard, driver-side doorjamb, engine block, title, registration, and insurance documents, and is the key used to pull a vehicle's full title and history records." },
      { q: "What does NMVTIS stand for?", a: "NMVTIS stands for the National Motor Vehicle Title Information System. It is a federally mandated database, administered by the U.S. Department of Justice, that aggregates title, brand, junk, and salvage records from state motor vehicle agencies, insurance carriers, junkyards, and salvage auctions across U.S. jurisdictions. Because it consolidates data nationwide, NMVTIS is the most authoritative source for catching cross-state title brand history and title washing." },
      { q: "What is a salvage title?", a: "A salvage title is a title brand applied when an insurer declares a vehicle a total loss, typically after damage exceeds a state-defined threshold of roughly 70 to 90 percent of the vehicle's pre-loss value. A salvage-titled vehicle cannot legally be driven on public roads until it is repaired, passes a state safety inspection, and is re-titled as rebuilt. The salvage brand is permanent and follows the VIN across state lines." },
      { q: "What is a title brand?", a: "A title brand is a permanent notation on a vehicle's title indicating significant damage, theft recovery, or other adverse history. Common brands include salvage, rebuilt, flood, junk, non-repairable, and lemon (manufacturer buyback). A title brand follows the VIN across state lines for the life of the vehicle, generally reduces resale value, and can make the vehicle harder to insure or finance." },
      { q: "What is the difference between a salvage title and a rebuilt title?", a: "A salvage title marks a vehicle that an insurer declared a total loss; it cannot legally be driven until repaired and re-inspected. A rebuilt title is issued to a previously salvaged vehicle that has been repaired and has passed a state safety inspection, making it road-legal again. Rebuilt vehicles are road-legal but typically worth 20 to 40 percent less than a comparable clean-title vehicle, and both insurance and financing options remain limited." },
      { q: "What is odometer rollback?", a: "Odometer rollback is a form of odometer fraud in which a vehicle's displayed mileage is illegally reduced to make the car appear less used and worth more. Modern digital instrument clusters can be rolled back with service tools, leaving few visible signs. Federal law requires odometer disclosure on title transfers and bans rollback. The best defense is comparing the displayed mileage against the most recent state inspection, oil-change, or service records." },
      { q: "What is title washing?", a: "Title washing is the fraudulent practice of moving a branded vehicle through one or more states to remove or hide an adverse title brand, then re-titling it as clean. NMVTIS, which consolidates brand records nationwide, makes title washing much harder, but it still occurs in gaps between state reporting systems. Running a multi-source VIN history check before buying is the most reliable way to surface a brand that was washed off the paper title." },
      { q: "What is a lemon buyback?", a: "A lemon buyback is a vehicle that the manufacturer repurchased from its original owner under a state lemon law because a substantial defect could not be repaired within a reasonable number of attempts. Lemon buybacks must generally be disclosed and typically carry a permanent title brand such as 'Lemon Law Buyback' or 'Manufacturer Buyback.' These vehicles often return to the used market after repairs, usually at a steep discount." },
    ],
    terms: [
      { term: "ACV (Actual Cash Value)", definition: "The fair market value of a vehicle immediately before a loss, used by insurers to settle total-loss claims. ACV factors in age, mileage, condition, and local demand. It is typically lower than retail replacement cost." },
      { term: "Airbag history", definition: "A record showing whether a vehicle's airbags have ever deployed and whether replacements were properly installed. Missing or improperly reset airbags are a major safety red flag. Airbag history sometimes appears on vehicle history reports and inspection records." },
      { term: "As-is sale", definition: "A used-car sale in which the buyer accepts the vehicle in its current condition with no implied warranty. Once you sign, repairs are your responsibility unless fraud is proven. Always run a VIN check and pre-purchase inspection before agreeing to as-is terms." },
      { term: "Assembly plant", definition: "The factory where a vehicle was built, encoded in the 11th character of the VIN. Knowing the plant can help diagnose recall scope or production-run issues. Manufacturers may use multiple plants for the same model." },
      { term: "Auction record", definition: "A historical entry showing a vehicle was sold or offered at a wholesale, salvage, or insurance auction. Frequent auction appearances often signal damage, total loss, or lemon buyback history. Auction photos can reveal damage hidden by later cosmetic repairs." },
      { term: "AutoCheck", definition: "A vehicle history report service owned by Experian, often used by dealers and at auctions. It scores vehicles on a numeric scale based on title, accident, and ownership history. AutoCheck and Carfax sometimes show different records, so cross-checking is wise." },
      { term: "Bill of sale", definition: "A written document recording the transfer of a vehicle from seller to buyer, including price, VIN, and parties' details. Many states require a notarized bill of sale to register the vehicle. Keep your copy for tax and warranty purposes." },
      { term: "Bonded title", definition: "A title issued when ownership documentation is missing, backed by a surety bond that protects future claimants. The bond typically remains in force for three to five years. Bonded titles can usually be converted to standard titles after the bond period expires without claims." },
      { term: "Branded title", definition: "Any title carrying a permanent designation such as salvage, rebuilt, flood, junk, or lemon. Branded vehicles are worth substantially less and may be harder to insure or finance. The brand follows the VIN across state lines for the life of the vehicle." },
      { term: "Bumper-to-bumper warranty", definition: "A comprehensive manufacturer warranty covering most vehicle components except wear items and routine maintenance. Coverage typically lasts three years or 36,000 miles, whichever comes first. It usually transfers with the VIN to subsequent owners until expiration." },
      { term: "Carfax", definition: "A widely recognized vehicle history report provider that aggregates title, accident, service, and ownership records. Reports include a Buyback Guarantee on covered title issues. Carfax pricing is significantly higher than alternatives like CarCheckerVIN." },
      { term: "Certificate of title", definition: "The official state-issued legal document proving ownership of a vehicle. It lists the VIN, owner, lienholders, and any title brands. You generally cannot transfer or register a vehicle without it." },
      { term: "Certified pre-owned (CPO)", definition: "A used vehicle that has passed a manufacturer-backed inspection and qualifies for an extended warranty. CPO programs vary widely between brands, so always read the contract. Expect to pay a premium versus a non-certified equivalent." },
      { term: "Check digit", definition: "The 9th character of the VIN, calculated from the other 16 characters using a weighted formula. It allows software to detect typos and counterfeit VINs. A failing check digit is a strong indicator of fraud or VIN cloning." },
      { term: "Chop shop", definition: "An illegal operation that disassembles stolen vehicles to sell parts on the black market. Parts from chop shops sometimes appear on legitimate marketplaces with mismatched VINs. Buying chop-shop parts can lead to seizure and criminal exposure." },
      { term: "Clean title", definition: "A title with no damage, salvage, flood, or other adverse brands recorded against the VIN. Clean does not necessarily mean the vehicle has never been damaged, only that no brand was reported. Always pair a clean title with an independent inspection." },
      { term: "Clear title", definition: "A title that is free of liens or other ownership encumbrances, ready for transfer. Clear refers to ownership status, while clean refers to damage history. A title can be clean and still not clear if a lender holds a lien." },
      { term: "Cloned VIN", definition: "A VIN copied from a legitimate vehicle and applied to a stolen or salvaged one to disguise its identity. Cloned VINs often pair with forged titles and altered registration documents. A physical VIN inspection can reveal mismatches between stamped and visible plates." },
      { term: "Dealer markup", definition: "An amount added above the manufacturer's suggested retail price, common for in-demand models. Markups are negotiable in soft markets but rigid during shortages. Always compare the out-the-door price across multiple dealers." },
      { term: "Depreciation", definition: "The decline in a vehicle's value over time due to age, mileage, and wear. Most cars lose 20 to 30 percent of value in the first year and roughly 60 percent over five years. Buying lightly used can sidestep the steepest depreciation curve." },
      { term: "DMV", definition: "The Department of Motor Vehicles, the state agency that issues titles, registrations, and driver licenses. Some states use alternate names such as DOT, MVD, or BMV. The DMV is the authoritative source for state-level title and registration data." },
      { term: "Documentation fee", definition: "A dealer charge for preparing and filing the paperwork associated with a vehicle sale. Doc fees vary widely by state and are sometimes capped by law. They are negotiable in some markets but rarely waived entirely." },
      { term: "Duplicate title", definition: "A replacement certificate of title issued when the original is lost, stolen, or damaged. Most states require an affidavit and a small fee. Duplicate titles may be marked as such on their face." },
      { term: "Edmunds TMV", definition: "Edmunds True Market Value, an estimated transaction price based on recent sales in your area. TMV adjusts for trim, mileage, options, and regional demand. Use it alongside Kelley Blue Book to triangulate fair pricing." },
      { term: "Emissions inspection", definition: "A state-mandated test that measures a vehicle's exhaust pollutants. Many urban counties require passing emissions before registration renewal. Failing vehicles must be repaired or, in limited cases, granted a waiver." },
      { term: "Encumbered title", definition: "A title showing one or more active liens, meaning a lender has a financial interest in the vehicle. Encumbered vehicles cannot be transferred free and clear until the lien is satisfied. Always confirm lien release before paying a private seller." },
      { term: "Extended warranty", definition: "An optional service contract that prolongs coverage beyond the original manufacturer warranty. Costs, exclusions, and claim processes vary widely between providers. Read the fine print on pre-existing condition and modification clauses." },
      { term: "Fleet vehicle", definition: "A vehicle previously owned and operated by a company, government agency, or rental fleet. Fleet vehicles often have higher mileage but stricter maintenance schedules. Fleet history may affect resale value and warranty eligibility." },
      { term: "Flood title", definition: "A title brand applied when a vehicle has sustained damage from being submerged in water above sensitive components. Flood vehicles can suffer corrosion and electrical failures for years after the loss. Some states mark these as Flood, others fold them into the salvage brand." },
      { term: "Frame damage", definition: "Bending, cracking, or compromise of a vehicle's structural frame or unibody. Even after professional repair, frame damage can affect crash performance and resale value. Many lenders and CPO programs reject vehicles with documented frame damage." },
      { term: "GAP coverage", definition: "Guaranteed Asset Protection insurance that pays the difference between a vehicle's ACV and the remaining loan balance after a total loss. GAP is most valuable on long-term loans with low down payments. It usually does not cover deductibles, late fees, or extended warranties." },
      { term: "Hail damage", definition: "Cosmetic or structural denting caused by large hailstones striking the vehicle. Severe hail damage can lead to a salvage or hail-specific title brand. Many hail-damaged cars are sold at insurance auctions and resold without proper disclosure." },
      { term: "Junk title", definition: "A title indicating a vehicle is fit only for parts or scrap and cannot legally be re-titled or driven. Junk-titled vehicles occasionally resurface through fraud and title washing. Always cross-check a VIN against NMVTIS for junk records." },
      { term: "Kelley Blue Book", definition: "A long-standing automotive valuation source publishing trade-in, private-party, and retail values. KBB pricing is widely accepted by dealers, lenders, and insurers. Use the same condition tier across providers when comparing estimates." },
      { term: "Lemon buyback", definition: "A vehicle repurchased by the manufacturer under a state lemon law because it could not be repaired. Lemon buybacks must be disclosed and typically carry a permanent title brand. They sometimes return to market after repairs at a steep discount." },
      { term: "Lemon law", definition: "State and federal statutes that protect buyers of new and sometimes used vehicles with chronic defects. Qualifying vehicles may be eligible for replacement, refund, or cash settlement. Lemon law thresholds vary, so consult your state attorney general's office for specifics." },
      { term: "Lien", definition: "A legal claim against a vehicle securing payment of a debt, most often a car loan. The lienholder is listed on the title until the debt is satisfied and the lien is released. You cannot transfer clear ownership while a lien remains active." },
      { term: "Lienholder", definition: "The party, usually a bank or credit union, that holds a lien on the vehicle. The lienholder physically holds or electronically controls the title in many states. Always verify a lien release letter before paying off a private seller." },
      { term: "Manufacturer buyback", definition: "A broader category that includes lemon buybacks plus voluntary repurchases by automakers for goodwill or recall reasons. Most carry a permanent title brand. Disclosure requirements vary by state and circumstance." },
      { term: "Model year digit", definition: "The 10th character of the VIN, encoding the model year of the vehicle. The character cycles through letters and numbers on a 30-year rotation. Pairing it with the assembly plant character helps confirm authenticity." },
      { term: "NICB", definition: "The National Insurance Crime Bureau, a non-profit that maintains databases of stolen and salvage vehicles reported by member insurers. Its free VINCheck tool flags stolen and total-loss records. Coverage is limited to participating insurers, so it should not be your only check." },
      { term: "NMVTIS", definition: "The National Motor Vehicle Title Information System, a federally mandated database tracking titles, brands, junk, and salvage records across U.S. jurisdictions. NMVTIS is the most authoritative source for cross-state title brand history. Most reputable VIN check services pull from NMVTIS." },
      { term: "Non-repairable title", definition: "A title brand indicating a vehicle is so severely damaged it can only be dismantled for parts or sold for scrap. Non-repairable vehicles cannot be re-titled for road use. The brand permanently follows the VIN." },
      { term: "Odometer fraud", definition: "Illegally tampering with a vehicle's odometer to misrepresent its true mileage. Federal law requires odometer disclosure on title transfers and bans rollback. Suspicious mileage gaps in service or registration records often expose fraud." },
      { term: "Odometer rollback", definition: "A specific form of odometer fraud where the displayed mileage is reduced. Modern digital clusters can be rolled back via service tools, leaving few visible signs. Always compare the displayed mileage to the most recent state inspection or oil-change records." },
      { term: "Open title", definition: "A title signed by the previous owner but not yet transferred into a new owner's name. Open titles are illegal in most states and frequently associated with curbstoning and title skipping. Avoid any deal involving an open title." },
      { term: "Parts-only title", definition: "A title designation similar to junk or non-repairable, indicating the vehicle may be sold only for components. Parts-only vehicles cannot be returned to road use. Some states use parts-only and non-repairable interchangeably." },
      { term: "Phantom vehicle", definition: "A fictitious vehicle created in registration or insurance records, often using a fake or cloned VIN. Phantom vehicles surface in fraud schemes targeting financing or insurance payouts. A failed VIN decode is a classic warning sign." },
      { term: "Powertrain warranty", definition: "Coverage focused on the engine, transmission, and drivetrain components. Powertrain warranties usually last longer than bumper-to-bumper coverage, often five to ten years. They typically transfer to subsequent owners with restrictions." },
      { term: "Pre-purchase inspection (PPI)", definition: "An independent inspection performed by a qualified mechanic before you buy a used vehicle. A good PPI uncovers hidden damage, deferred maintenance, and red flags missed on a test drive. Expect to pay 100 to 250 dollars, well worth the peace of mind." },
      { term: "Private-party sale", definition: "A vehicle sale directly between two individuals, with no dealer in the middle. Private-party prices are typically lower than dealer retail but offer no warranty protection. A VIN check is essential before transferring any money." },
      { term: "Private-party value", definition: "An estimated price reflecting what a private buyer would reasonably pay a private seller. It generally falls between trade-in and retail values. Use it to anchor negotiations on Craigslist, Facebook Marketplace, and similar platforms." },
      { term: "Rebuilt title", definition: "A title issued to a previously salvaged vehicle that has been repaired and passed a state safety inspection. Rebuilt vehicles are road-legal but worth 20 to 40 percent less than clean equivalents. Insurance and financing options are limited." },
      { term: "Recall", definition: "A manufacturer or NHTSA-mandated repair program addressing safety defects. Recall repairs are free regardless of vehicle age or ownership. Always check open recalls by VIN before purchase and have them completed at an authorized dealer." },
      { term: "Reconstructed", definition: "A title brand used in some states for vehicles substantially rebuilt from major component assemblies. Reconstructed vehicles must usually pass a structural and safety inspection. The brand follows the VIN and affects resale value." },
      { term: "Registration", definition: "The state-issued credential allowing a titled vehicle to be operated on public roads. Registration must be renewed periodically and may require emissions or safety inspections. Registration is separate from the title and must be updated when ownership changes." },
      { term: "Retail value", definition: "The price a dealer typically asks on the lot, reflecting reconditioning, marketing, warranty coverage, and overhead. Retail value is the highest of the standard valuations. Negotiate from documented private-party value when possible." },
      { term: "Safety inspection", definition: "A periodic state inspection verifying brakes, lights, tires, and other safety systems meet minimum standards. Required intervals and scope vary by state. Failed vehicles must be repaired before they can be re-registered." },
      { term: "Salvage title", definition: "A title brand applied when an insurer declares a vehicle a total loss, usually after damage exceeds 70 to 90 percent of its value. Salvage vehicles cannot legally be driven until rebuilt and re-titled. Always avoid salvage vehicles unless you are an experienced rebuilder." },
      { term: "Structural damage", definition: "Damage affecting load-bearing components such as the frame, unibody, or pillars. Structural damage compromises crash performance even after professional repair. It is one of the strongest signals to walk away from a deal." },
      { term: "Title brand", definition: "A permanent notation on a vehicle title indicating significant damage, theft recovery, or other adverse history. Brands follow the VIN across state lines for the life of the vehicle. Common brands include salvage, rebuilt, flood, junk, and lemon." },
      { term: "Title transfer", definition: "The legal process of moving ownership from seller to buyer through the state DMV. Most states impose strict deadlines, often 10 to 30 days from sale. Failing to transfer on time can trigger penalties and registration issues." },
      { term: "Title washing", definition: "The fraudulent practice of moving a branded vehicle through multiple states to remove or hide adverse title brands. NMVTIS makes title washing harder but it still occurs. Always run a multi-source VIN history check before buying." },
      { term: "Total loss", definition: "An insurance designation for a vehicle whose repair cost exceeds a state-defined percentage of its pre-loss value. Total losses usually receive a salvage or junk title brand. Even repaired total-loss vehicles can carry hidden long-term issues." },
      { term: "Trade-in value", definition: "The amount a dealer offers to credit you for your current vehicle when buying another. Trade-in value is typically the lowest of the standard valuations because dealers must recondition and resell. In many states, the trade-in reduces sales tax on the new vehicle." },
      { term: "TSB (Technical Service Bulletin)", definition: "A manufacturer-issued advisory describing a known issue and recommended fix. Unlike recalls, TSB repairs are usually performed at the owner's expense. Searching TSBs by VIN can reveal common problems before purchase." },
      { term: "VDS (Vehicle Descriptor Section)", definition: "Characters 4 through 9 of the VIN, describing the vehicle's model, body, engine, and restraint system. The VDS structure is defined by each manufacturer within ISO standards. Decoding the VDS reveals trim and powertrain details." },
      { term: "VIN", definition: "The Vehicle Identification Number, a 17-character alphanumeric code that uniquely identifies every modern vehicle. The VIN encodes manufacturer, model, year, plant, and serial information. It appears on the dash, doorjamb, title, and registration." },
      { term: "VIS (Vehicle Identifier Section)", definition: "Characters 10 through 17 of the VIN, including model year, assembly plant, and a unique production sequence number. The VIS makes each vehicle individually identifiable. It is what makes VIN-based history reporting possible." },
      { term: "WMI (World Manufacturer Identifier)", definition: "The first three characters of the VIN, identifying the country, manufacturer, and vehicle type. Codes are assigned globally by SAE International. The WMI is your first clue to where and by whom a vehicle was built." },
    ],
  },
  es: {
    breadcrumbHome: "Inicio",
    breadcrumbCurrent: "Glosario",
    h1: "Glosario de VIN e historial vehicular",
    heroLead:
      "Comprar un auto usado implica mucha documentación, acrónimos y jerga de marcas de título. Este glosario define más de 60 de los términos más importantes de VIN, título, valoración e historial vehicular que encontrarás, para que puedas comprar con confianza y detectar problemas antes de que te cuesten.",
    lettersAria: "Letras del glosario",
    faqHeading: "Preguntas frecuentes",
    faqIntro:
      "Respuestas rápidas y claras a las preguntas más comunes sobre VINs, marcas de título y terminología del historial vehicular.",
    quickHeading: "Herramientas rápidas",
    quickIntro:
      "Pon en práctica lo que acabas de aprender. Ejecuta una revisión VIN gratis o salta directo a una búsqueda enfocada de historial.",
    quickToolSubTemplate: "Ejecuta una {label} enfocada por VIN.",
    ctaHeading: "¿Listo para decodificar un VIN?",
    ctaBody: "Ingresa cualquier VIN de 17 caracteres para ver especificaciones, marcas de título e historial en segundos.",
    quickTools: [
      { label: "Revisión VIN gratis" },
      { label: "Verificación de vehículo robado" },
      { label: "Verificación de título de salvamento" },
      { label: "Verificación de historial de accidentes" },
      { label: "Verificación de odómetro" },
      { label: "Verificación de Ley Limón" },
    ],
    faqs: [
      { q: "¿Qué es un VIN?", a: "Un VIN (Número de Identificación Vehicular) es un código alfanumérico de 17 caracteres que identifica de forma única cada vehículo moderno. Codifica el fabricante, marca, tipo de vehículo, año modelo, planta de ensamblaje y un número de serie único de producción. El VIN aparece en el tablero, en el marco de la puerta del conductor, en el bloque del motor, en el título, registro y documentos del seguro, y es la clave usada para obtener el título completo y los registros de historial de un vehículo." },
      { q: "¿Qué significa NMVTIS?", a: "NMVTIS significa Sistema Nacional del Título de Vehículos. Es una base de datos federalmente obligatoria, administrada por el Departamento de Justicia de EE. UU., que agrega registros de título, marcas, chatarra y salvamento de agencias estatales de vehículos, aseguradoras, deshuesaderos y subastas de salvamento en las jurisdicciones de EE. UU. Como consolida datos a nivel nacional, NMVTIS es la fuente más autoritativa para detectar historial de marcas de título entre estados y lavado de títulos." },
      { q: "¿Qué es un título de salvamento?", a: "Un título de salvamento es una marca de título aplicada cuando una aseguradora declara un vehículo como pérdida total, típicamente después de que el daño excede un umbral definido por el estado de aproximadamente 70 a 90 por ciento del valor del vehículo antes de la pérdida. Un vehículo con título de salvamento no puede ser conducido legalmente en vías públicas hasta que se repare, pase una inspección estatal de seguridad y se vuelva a titular como reconstruido. La marca de salvamento es permanente y sigue al VIN entre estados." },
      { q: "¿Qué es una marca de título?", a: "Una marca de título es una notación permanente en el título de un vehículo que indica daño significativo, recuperación de robo u otro historial adverso. Las marcas comunes incluyen salvamento, reconstruido, inundación, chatarra, no reparable y limón (recompra del fabricante). Una marca de título sigue al VIN entre estados durante toda la vida del vehículo, generalmente reduce el valor de reventa y puede dificultar el aseguramiento o financiamiento." },
      { q: "¿Cuál es la diferencia entre un título de salvamento y un título reconstruido?", a: "Un título de salvamento marca un vehículo que una aseguradora declaró como pérdida total; no puede ser conducido legalmente hasta que se repare e inspeccione nuevamente. Un título reconstruido se emite a un vehículo previamente salvado que ha sido reparado y ha pasado una inspección estatal de seguridad, haciéndolo legal para la vía nuevamente. Los vehículos reconstruidos son legales para la vía pero típicamente valen 20 a 40 por ciento menos que un vehículo comparable con título limpio, y tanto las opciones de seguro como financiamiento permanecen limitadas." },
      { q: "¿Qué es el retroceso de odómetro?", a: "El retroceso de odómetro es una forma de fraude de odómetro en la que el kilometraje mostrado de un vehículo se reduce ilegalmente para hacer que el auto parezca menos usado y valga más. Los clústeres digitales modernos pueden retroceder con herramientas de servicio, dejando pocos signos visibles. La ley federal requiere divulgación del odómetro en transferencias de título y prohíbe el retroceso. La mejor defensa es comparar el kilometraje mostrado contra los registros más recientes de inspección estatal, cambio de aceite o servicio." },
      { q: "¿Qué es el lavado de títulos?", a: "El lavado de títulos es la práctica fraudulenta de mover un vehículo con marca a través de uno o más estados para remover u ocultar una marca de título adversa, luego volver a titularlo como limpio. NMVTIS, que consolida registros de marcas a nivel nacional, dificulta mucho el lavado de títulos, pero todavía ocurre en brechas entre sistemas estatales de reportes. Ejecutar una verificación de historial VIN de múltiples fuentes antes de comprar es la forma más confiable de surgir una marca que fue lavada del título de papel." },
      { q: "¿Qué es una recompra por Ley Limón?", a: "Una recompra por Ley Limón es un vehículo que el fabricante recompró a su dueño original bajo una Ley Limón estatal porque un defecto sustancial no pudo repararse dentro de un número razonable de intentos. Las recompras por Ley Limón generalmente deben divulgarse y típicamente llevan una marca de título permanente como 'Recompra Ley Limón' o 'Recompra del Fabricante.' Estos vehículos a menudo regresan al mercado usado después de reparaciones, usualmente con un descuento considerable." },
    ],
    terms: [
      { term: "ACV (Valor Real en Efectivo)", definition: "El valor justo de mercado de un vehículo inmediatamente antes de una pérdida, usado por las aseguradoras para liquidar reclamos de pérdida total. ACV considera edad, kilometraje, condición y demanda local. Típicamente es menor al costo de reemplazo al detalle." },
      { term: "Historial de airbags", definition: "Un registro que muestra si los airbags de un vehículo se han desplegado alguna vez y si los reemplazos se instalaron correctamente. Airbags faltantes o reseteados incorrectamente son una bandera roja mayor de seguridad. El historial de airbags a veces aparece en reportes de historial vehicular y registros de inspección." },
      { term: "Venta tal cual (As-is)", definition: "Una venta de auto usado en la que el comprador acepta el vehículo en su condición actual sin garantía implícita. Una vez que firmas, las reparaciones son tu responsabilidad a menos que se pruebe fraude. Siempre ejecuta una revisión VIN e inspección pre-compra antes de aceptar términos tal cual." },
      { term: "Planta de ensamblaje", definition: "La fábrica donde se construyó un vehículo, codificada en el carácter 11 del VIN. Conocer la planta puede ayudar a diagnosticar el alcance de un retiro o problemas de lote de producción. Los fabricantes pueden usar múltiples plantas para el mismo modelo." },
      { term: "Registro de subasta", definition: "Una entrada histórica que muestra que un vehículo fue vendido u ofrecido en una subasta mayorista, de salvamento o de seguros. Apariciones frecuentes en subastas a menudo señalan daño, pérdida total o historial de recompra por Ley Limón. Las fotos de subasta pueden revelar daños ocultos por reparaciones cosméticas posteriores." },
      { term: "AutoCheck", definition: "Un servicio de reportes de historial vehicular propiedad de Experian, a menudo usado por concesionarios y en subastas. Califica vehículos en una escala numérica basada en historial de título, accidentes y propiedad. AutoCheck y Carfax a veces muestran registros diferentes, así que verificar cruzadamente es sabio." },
      { term: "Contrato de compraventa", definition: "Un documento escrito que registra la transferencia de un vehículo del vendedor al comprador, incluyendo precio, VIN y detalles de las partes. Muchos estados requieren un contrato de compraventa notariado para registrar el vehículo. Guarda tu copia para fines de impuestos y garantía." },
      { term: "Título con fianza", definition: "Un título emitido cuando falta documentación de propiedad, respaldado por una fianza que protege a futuros reclamantes. La fianza típicamente permanece en vigor de tres a cinco años. Los títulos con fianza usualmente pueden convertirse a títulos estándar después de que el periodo de fianza expire sin reclamos." },
      { term: "Título con marca", definition: "Cualquier título que lleva una designación permanente como salvamento, reconstruido, inundación, chatarra o limón. Los vehículos con marca valen sustancialmente menos y pueden ser más difíciles de asegurar o financiar. La marca sigue al VIN entre estados durante toda la vida del vehículo." },
      { term: "Garantía bumper-to-bumper", definition: "Una garantía completa del fabricante que cubre la mayoría de los componentes del vehículo excepto los de desgaste y mantenimiento de rutina. La cobertura típicamente dura tres años o 36,000 millas, lo que ocurra primero. Usualmente se transfiere con el VIN a los dueños subsecuentes hasta la expiración." },
      { term: "Carfax", definition: "Un proveedor ampliamente reconocido de reportes de historial vehicular que agrega registros de título, accidentes, servicio y propiedad. Los reportes incluyen una Garantía de Recompra en problemas de título cubiertos. Los precios de Carfax son significativamente más altos que alternativas como CarCheckerVIN." },
      { term: "Certificado de título", definition: "El documento legal oficial emitido por el estado que prueba la propiedad de un vehículo. Lista el VIN, dueño, acreedores y cualquier marca de título. Generalmente no puedes transferir o registrar un vehículo sin él." },
      { term: "Certified pre-owned (CPO)", definition: "Un vehículo usado que ha pasado una inspección respaldada por el fabricante y califica para una garantía extendida. Los programas CPO varían ampliamente entre marcas, así que siempre lee el contrato. Espera pagar un premium versus un equivalente no certificado." },
      { term: "Dígito verificador", definition: "El carácter 9 del VIN, calculado a partir de los otros 16 caracteres usando una fórmula ponderada. Permite al software detectar errores tipográficos y VINs falsificados. Un dígito verificador que falla es un fuerte indicador de fraude o clonación de VIN." },
      { term: "Chop shop", definition: "Una operación ilegal que desensambla vehículos robados para vender partes en el mercado negro. Las partes de chop shops a veces aparecen en mercados legítimos con VINs no coincidentes. Comprar partes de chop shop puede llevar a confiscación y exposición criminal." },
      { term: "Título limpio", definition: "Un título sin daño, salvamento, inundación u otras marcas adversas registradas contra el VIN. Limpio no necesariamente significa que el vehículo nunca ha sido dañado, solo que no se reportó marca. Siempre acompaña un título limpio con una inspección independiente." },
      { term: "Título libre (clear)", definition: "Un título libre de gravámenes u otros encumbramientos de propiedad, listo para transferencia. Libre se refiere al estado de propiedad, mientras que limpio se refiere al historial de daño. Un título puede estar limpio y todavía no libre si un prestamista mantiene un gravamen." },
      { term: "VIN clonado", definition: "Un VIN copiado de un vehículo legítimo y aplicado a uno robado o salvado para disfrazar su identidad. Los VINs clonados a menudo se emparejan con títulos falsificados y documentos de registro alterados. Una inspección física del VIN puede revelar discrepancias entre las placas estampadas y visibles." },
      { term: "Markup del concesionario", definition: "Una cantidad agregada por encima del precio sugerido por el fabricante, común para modelos en demanda. Los markups son negociables en mercados suaves pero rígidos durante escaseces. Siempre compara el precio out-the-door entre múltiples concesionarios." },
      { term: "Depreciación", definition: "La disminución en el valor de un vehículo a lo largo del tiempo debido a edad, kilometraje y desgaste. La mayoría de los autos pierden 20 a 30 por ciento de valor en el primer año y aproximadamente 60 por ciento en cinco años. Comprar ligeramente usado puede esquivar la curva de depreciación más pronunciada." },
      { term: "DMV", definition: "El Departamento de Vehículos Motorizados, la agencia estatal que emite títulos, registros y licencias de conducir. Algunos estados usan nombres alternativos como DOT, MVD o BMV. El DMV es la fuente autoritativa para datos de título y registro a nivel estatal." },
      { term: "Cuota de documentación", definition: "Un cobro del concesionario por preparar y archivar el papeleo asociado con una venta de vehículo. Las cuotas de doc varían ampliamente por estado y a veces están limitadas por ley. Son negociables en algunos mercados pero rara vez se eliminan completamente." },
      { term: "Título duplicado", definition: "Un certificado de título de reemplazo emitido cuando el original se pierde, roba o daña. La mayoría de los estados requieren un affidávit y una pequeña cuota. Los títulos duplicados pueden estar marcados como tal en su cara." },
      { term: "Edmunds TMV", definition: "Edmunds True Market Value, un precio estimado de transacción basado en ventas recientes en tu área. TMV se ajusta por trim, kilometraje, opciones y demanda regional. Úsalo junto con Kelley Blue Book para triangular precios justos." },
      { term: "Inspección de emisiones", definition: "Una prueba mandatada por el estado que mide los contaminantes del escape de un vehículo. Muchos condados urbanos requieren pasar emisiones antes de la renovación de registro. Los vehículos que fallan deben ser reparados o, en casos limitados, otorgados una exención." },
      { term: "Título encumbrado", definition: "Un título que muestra uno o más gravámenes activos, significando que un prestamista tiene un interés financiero en el vehículo. Los vehículos encumbrados no pueden ser transferidos libres y claros hasta que se satisfaga el gravamen. Siempre confirma la liberación del gravamen antes de pagar a un vendedor privado." },
      { term: "Garantía extendida", definition: "Un contrato de servicio opcional que prolonga la cobertura más allá de la garantía original del fabricante. Los costos, exclusiones y procesos de reclamo varían ampliamente entre proveedores. Lee la letra pequeña sobre cláusulas de condición preexistente y modificación." },
      { term: "Vehículo de flota", definition: "Un vehículo previamente propiedad y operado por una compañía, agencia gubernamental o flota de renta. Los vehículos de flota a menudo tienen mayor kilometraje pero horarios de mantenimiento más estrictos. El historial de flota puede afectar el valor de reventa y elegibilidad de garantía." },
      { term: "Título de inundación", definition: "Una marca de título aplicada cuando un vehículo ha sufrido daño por estar sumergido en agua por encima de componentes sensibles. Los vehículos inundados pueden sufrir corrosión y fallas eléctricas durante años después de la pérdida. Algunos estados los marcan como Inundación, otros los doblan en la marca de salvamento." },
      { term: "Daño al chasis", definition: "Doblado, agrietamiento o compromiso del chasis estructural o monocasco de un vehículo. Incluso después de reparación profesional, el daño al chasis puede afectar el desempeño en choques y el valor de reventa. Muchos prestamistas y programas CPO rechazan vehículos con daño al chasis documentado." },
      { term: "Cobertura GAP", definition: "Seguro de Protección de Activos Garantizada que paga la diferencia entre el ACV de un vehículo y el saldo restante del préstamo después de una pérdida total. GAP es más valiosa en préstamos a largo plazo con bajos enganches. Usualmente no cubre deducibles, cuotas tardías o garantías extendidas." },
      { term: "Daño por granizo", definition: "Abolladuras cosméticas o estructurales causadas por granizos grandes golpeando el vehículo. El daño severo por granizo puede llevar a una marca de título de salvamento o específica de granizo. Muchos autos dañados por granizo se venden en subastas de seguros y se revenden sin divulgación adecuada." },
      { term: "Título de chatarra", definition: "Un título que indica que un vehículo es apto solo para partes o chatarra y no puede ser legalmente re-titulado o conducido. Los vehículos con título de chatarra ocasionalmente resurgen mediante fraude y lavado de títulos. Siempre verifica cruzadamente un VIN contra NMVTIS para registros de chatarra." },
      { term: "Kelley Blue Book", definition: "Una fuente de valoración automotriz de larga data que publica valores de trade-in, venta privada y al detalle. Los precios de KBB son ampliamente aceptados por concesionarios, prestamistas y aseguradoras. Usa el mismo nivel de condición entre proveedores al comparar estimaciones." },
      { term: "Recompra por Ley Limón", definition: "Un vehículo recomprado por el fabricante bajo una Ley Limón estatal porque no pudo ser reparado. Las recompras por Ley Limón deben divulgarse y típicamente llevan una marca de título permanente. A veces regresan al mercado después de reparaciones con un descuento considerable." },
      { term: "Ley Limón", definition: "Estatutos estatales y federales que protegen a compradores de vehículos nuevos y a veces usados con defectos crónicos. Los vehículos que califican pueden ser elegibles para reemplazo, reembolso o liquidación en efectivo. Los umbrales de Ley Limón varían, así que consulta la oficina del fiscal general de tu estado para detalles." },
      { term: "Gravamen", definition: "Una reclamación legal contra un vehículo que asegura el pago de una deuda, más a menudo un préstamo de auto. El acreedor está listado en el título hasta que la deuda se satisface y el gravamen se libera. No puedes transferir propiedad libre mientras un gravamen permanezca activo." },
      { term: "Acreedor (Lienholder)", definition: "La parte, usualmente un banco o cooperativa de crédito, que mantiene un gravamen en el vehículo. El acreedor físicamente mantiene o controla electrónicamente el título en muchos estados. Siempre verifica una carta de liberación de gravamen antes de pagarle a un vendedor privado." },
      { term: "Recompra del fabricante", definition: "Una categoría más amplia que incluye recompras por Ley Limón más recompras voluntarias por fabricantes por razones de buena voluntad o retiros. La mayoría lleva una marca de título permanente. Los requisitos de divulgación varían por estado y circunstancia." },
      { term: "Dígito del año modelo", definition: "El carácter 10 del VIN, codificando el año modelo del vehículo. El carácter rota a través de letras y números en una rotación de 30 años. Emparejarlo con el carácter de planta de ensamblaje ayuda a confirmar autenticidad." },
      { term: "NICB", definition: "El National Insurance Crime Bureau, una organización sin fines de lucro que mantiene bases de datos de vehículos robados y de salvamento reportados por aseguradoras miembros. Su herramienta gratuita VINCheck marca registros de robo y pérdida total. La cobertura está limitada a aseguradoras participantes, así que no debería ser tu única verificación." },
      { term: "NMVTIS", definition: "El Sistema Nacional del Título de Vehículos, una base de datos federalmente obligatoria que rastrea títulos, marcas, chatarra y registros de salvamento en jurisdicciones de EE. UU. NMVTIS es la fuente más autoritativa para historial de marcas de título entre estados. La mayoría de los servicios reputables de revisión VIN obtienen datos de NMVTIS." },
      { term: "Título no reparable", definition: "Una marca de título que indica que un vehículo está tan severamente dañado que solo puede ser desmantelado para partes o vendido para chatarra. Los vehículos no reparables no pueden ser re-titulados para uso vial. La marca permanentemente sigue al VIN." },
      { term: "Fraude de odómetro", definition: "Manipular ilegalmente el odómetro de un vehículo para tergiversar su kilometraje real. La ley federal requiere divulgación del odómetro en transferencias de título y prohíbe el retroceso. Brechas sospechosas de kilometraje en registros de servicio o registro a menudo exponen fraude." },
      { term: "Retroceso de odómetro", definition: "Una forma específica de fraude de odómetro donde el kilometraje mostrado se reduce. Los clústeres digitales modernos pueden retroceder vía herramientas de servicio, dejando pocos signos visibles. Siempre compara el kilometraje mostrado con los registros más recientes de inspección estatal o cambio de aceite." },
      { term: "Título abierto", definition: "Un título firmado por el dueño anterior pero aún no transferido al nombre del nuevo dueño. Los títulos abiertos son ilegales en la mayoría de los estados y frecuentemente asociados con curbstoning y title skipping. Evita cualquier trato que involucre un título abierto." },
      { term: "Título solo de partes", definition: "Una designación de título similar a chatarra o no reparable, indicando que el vehículo puede ser vendido solo por componentes. Los vehículos solo de partes no pueden regresar a uso vial. Algunos estados usan solo-partes y no-reparable intercambiablemente." },
      { term: "Vehículo fantasma", definition: "Un vehículo ficticio creado en registros de registro o seguro, a menudo usando un VIN falso o clonado. Los vehículos fantasma surgen en esquemas de fraude apuntando a pagos de financiamiento o seguros. Una decodificación VIN fallida es una señal clásica de advertencia." },
      { term: "Garantía del tren motriz", definition: "Cobertura enfocada en componentes del motor, transmisión y tren de potencia. Las garantías del tren motriz usualmente duran más que la cobertura bumper-to-bumper, a menudo cinco a diez años. Típicamente se transfieren a dueños subsecuentes con restricciones." },
      { term: "Inspección pre-compra (PPI)", definition: "Una inspección independiente realizada por un mecánico calificado antes de comprar un vehículo usado. Una buena PPI descubre daño oculto, mantenimiento diferido y banderas rojas perdidas en una prueba de manejo. Espera pagar 100 a 250 dólares, bien valen la tranquilidad." },
      { term: "Venta privada", definition: "Una venta de vehículo directamente entre dos individuos, sin concesionario de por medio. Los precios de venta privada típicamente son más bajos que el retail del concesionario pero no ofrecen protección de garantía. Una revisión VIN es esencial antes de transferir cualquier dinero." },
      { term: "Valor de venta privada", definition: "Un precio estimado que refleja lo que un comprador privado razonablemente pagaría a un vendedor privado. Generalmente cae entre los valores de trade-in y retail. Úsalo para anclar negociaciones en Craigslist, Facebook Marketplace y plataformas similares." },
      { term: "Título reconstruido", definition: "Un título emitido a un vehículo previamente salvado que ha sido reparado y pasado una inspección estatal de seguridad. Los vehículos reconstruidos son legales para vía pero valen 20 a 40 por ciento menos que equivalentes con título limpio. Las opciones de seguro y financiamiento son limitadas." },
      { term: "Recall (Retiro)", definition: "Un programa de reparación obligado por el fabricante o NHTSA que aborda defectos de seguridad. Las reparaciones de retiro son gratuitas sin importar la edad o propiedad del vehículo. Siempre verifica retiros abiertos por VIN antes de comprar y haz que se completen en un concesionario autorizado." },
      { term: "Reconstruido (Reconstructed)", definition: "Una marca de título usada en algunos estados para vehículos sustancialmente reconstruidos a partir de ensamblajes de componentes mayores. Los vehículos reconstruidos usualmente deben pasar una inspección estructural y de seguridad. La marca sigue al VIN y afecta el valor de reventa." },
      { term: "Registro vehicular", definition: "La credencial emitida por el estado que permite que un vehículo titulado sea operado en vías públicas. El registro debe renovarse periódicamente y puede requerir inspecciones de emisiones o seguridad. El registro es separado del título y debe actualizarse cuando cambia la propiedad." },
      { term: "Valor al detalle (Retail)", definition: "El precio que un concesionario típicamente pide en el lote, reflejando reacondicionamiento, marketing, cobertura de garantía y gastos generales. El valor al detalle es el más alto de las valoraciones estándar. Negocia desde el valor documentado de venta privada cuando sea posible." },
      { term: "Inspección de seguridad", definition: "Una inspección estatal periódica que verifica que frenos, luces, llantas y otros sistemas de seguridad cumplan estándares mínimos. Los intervalos requeridos y alcance varían por estado. Los vehículos que fallan deben ser reparados antes de poder ser re-registrados." },
      { term: "Título de salvamento", definition: "Una marca de título aplicada cuando una aseguradora declara un vehículo como pérdida total, usualmente después de que el daño excede 70 a 90 por ciento de su valor. Los vehículos de salvamento no pueden ser conducidos legalmente hasta ser reconstruidos y re-titulados. Siempre evita vehículos de salvamento a menos que seas un reconstructor experimentado." },
      { term: "Daño estructural", definition: "Daño que afecta componentes que soportan carga como el chasis, monocasco o pilares. El daño estructural compromete el desempeño en choques incluso después de reparación profesional. Es una de las señales más fuertes para alejarse de un trato." },
      { term: "Marca de título (Title brand)", definition: "Una notación permanente en un título vehicular que indica daño significativo, recuperación de robo u otro historial adverso. Las marcas siguen al VIN entre estados durante toda la vida del vehículo. Las marcas comunes incluyen salvamento, reconstruido, inundación, chatarra y limón." },
      { term: "Transferencia de título", definition: "El proceso legal de mover propiedad del vendedor al comprador a través del DMV estatal. La mayoría de los estados imponen plazos estrictos, a menudo 10 a 30 días desde la venta. Fallar al transferir a tiempo puede activar penalizaciones y problemas de registro." },
      { term: "Lavado de títulos (Title washing)", definition: "La práctica fraudulenta de mover un vehículo con marca a través de múltiples estados para remover u ocultar marcas de título adversas. NMVTIS dificulta el lavado de títulos pero todavía ocurre. Siempre ejecuta una verificación de historial VIN de múltiples fuentes antes de comprar." },
      { term: "Pérdida total (Total loss)", definition: "Una designación de seguro para un vehículo cuyo costo de reparación excede un porcentaje definido por el estado de su valor antes de la pérdida. Las pérdidas totales usualmente reciben una marca de título de salvamento o chatarra. Incluso vehículos de pérdida total reparados pueden cargar problemas ocultos a largo plazo." },
      { term: "Valor trade-in", definition: "La cantidad que un concesionario ofrece acreditarte por tu vehículo actual al comprar otro. El valor trade-in típicamente es el más bajo de las valoraciones estándar porque los concesionarios deben reacondicionar y revender. En muchos estados, el trade-in reduce el impuesto a la venta del nuevo vehículo." },
      { term: "TSB (Boletín de Servicio Técnico)", definition: "Una advertencia emitida por el fabricante que describe un problema conocido y la reparación recomendada. A diferencia de los recalls, las reparaciones de TSB usualmente se realizan a cuenta del dueño. Buscar TSBs por VIN puede revelar problemas comunes antes de comprar." },
      { term: "VDS (Vehicle Descriptor Section)", definition: "Caracteres 4 al 9 del VIN, describiendo el modelo del vehículo, carrocería, motor y sistema de sujeción. La estructura VDS está definida por cada fabricante dentro de estándares ISO. Decodificar el VDS revela detalles de trim y tren motriz." },
      { term: "VIN", definition: "El Número de Identificación Vehicular, un código alfanumérico de 17 caracteres que identifica de forma única cada vehículo moderno. El VIN codifica fabricante, modelo, año, planta e información serial. Aparece en el tablero, marco de la puerta, título y registro." },
      { term: "VIS (Vehicle Identifier Section)", definition: "Caracteres 10 al 17 del VIN, incluyendo año modelo, planta de ensamblaje y un número único de secuencia de producción. El VIS hace que cada vehículo sea individualmente identificable. Es lo que hace posible el reporte de historial basado en VIN." },
      { term: "WMI (World Manufacturer Identifier)", definition: "Los primeros tres caracteres del VIN, identificando el país, fabricante y tipo de vehículo. Los códigos son asignados globalmente por SAE International. El WMI es tu primera pista sobre dónde y por quién fue construido un vehículo." },
    ],
  },
  fr: {
    breadcrumbHome: "Accueil",
    breadcrumbCurrent: "Glossaire",
    h1: "Glossaire VIN et historique de v\u00e9hicule",
    heroLead:
      "Acheter une voiture d'occasion implique beaucoup de paperasse, d'acronymes et de jargon de marques de titre. Ce glossaire d\u00e9finit plus de 60 des termes les plus importants de VIN, titre, \u00e9valuation et historique de v\u00e9hicule que tu rencontreras, pour que tu puisses acheter en confiance et rep\u00e9rer les probl\u00e8mes avant qu'ils ne te co\u00fbtent.",
    lettersAria: "Lettres du glossaire",
    faqHeading: "Questions fr\u00e9quentes",
    faqIntro:
      "R\u00e9ponses rapides et claires aux questions les plus courantes sur les VIN, marques de titre et terminologie d'historique de v\u00e9hicule.",
    quickHeading: "Outils rapides",
    quickIntro:
      "Mets en pratique ce que tu viens d'apprendre. Lance une v\u00e9rification VIN gratuite ou passe directement \u00e0 une recherche d'historique cibl\u00e9e.",
    quickToolSubTemplate: "Lance une {label} cibl\u00e9e par VIN.",
    ctaHeading: "Pr\u00eat \u00e0 d\u00e9coder un VIN\u00a0?",
    ctaBody: "Saisis n'importe quel VIN de 17 caract\u00e8res pour voir sp\u00e9cifications, marques de titre et historique en quelques secondes.",
    quickTools: [
      { label: "V\u00e9rification VIN gratuite" },
      { label: "V\u00e9rification de v\u00e9hicule vol\u00e9" },
      { label: "V\u00e9rification de titre salvage" },
      { label: "V\u00e9rification d'historique d'accidents" },
      { label: "V\u00e9rification d'odom\u00e8tre" },
      { label: "V\u00e9rification Lemon Law" },
    ],
    faqs: [
      { q: "Qu'est-ce qu'un VIN\u00a0?", a: "Un VIN (Vehicle Identification Number, num\u00e9ro d'identification du v\u00e9hicule) est un code alphanum\u00e9rique de 17 caract\u00e8res qui identifie de fa\u00e7on unique chaque v\u00e9hicule moderne. Il encode le fabricant, la marque, le type de v\u00e9hicule, l'ann\u00e9e mod\u00e8le, l'usine d'assemblage et un num\u00e9ro de s\u00e9rie unique de production. Le VIN appara\u00eet sur le tableau de bord, le cadre de porte conducteur, le bloc moteur, le titre, l'immatriculation et les documents d'assurance, et c'est la cl\u00e9 utilis\u00e9e pour obtenir le titre complet et les dossiers d'historique d'un v\u00e9hicule." },
      { q: "Que signifie NMVTIS\u00a0?", a: "NMVTIS d\u00e9signe le National Motor Vehicle Title Information System. C'est une base de donn\u00e9es f\u00e9d\u00e9rale obligatoire, administr\u00e9e par le D\u00e9partement de la Justice des \u00c9tats-Unis, qui agr\u00e8ge les dossiers de titre, marques, casse et salvage des agences \u00e9tatiques de v\u00e9hicules, assureurs, ferrailleurs et ench\u00e8res de salvage aux \u00c9tats-Unis. Comme elle consolide les donn\u00e9es au niveau national, NMVTIS est la source la plus autoritative pour d\u00e9tecter l'historique des marques de titre entre \u00e9tats et le lavage de titre." },
      { q: "Qu'est-ce qu'un titre salvage\u00a0?", a: "Un titre salvage est une marque de titre appos\u00e9e quand un assureur d\u00e9clare un v\u00e9hicule en perte totale, g\u00e9n\u00e9ralement apr\u00e8s que les dommages d\u00e9passent un seuil d'\u00e9tat de 70 \u00e0 90 pour cent de la valeur du v\u00e9hicule avant la perte. Un v\u00e9hicule \u00e0 titre salvage ne peut pas \u00eatre conduit l\u00e9galement sur la voie publique avant d'\u00eatre r\u00e9par\u00e9, d'avoir pass\u00e9 une inspection de s\u00e9curit\u00e9 \u00e9tatique et d'\u00eatre retitr\u00e9 comme reconstruit. La marque salvage est permanente et suit le VIN entre les \u00e9tats." },
      { q: "Qu'est-ce qu'une marque de titre\u00a0?", a: "Une marque de titre est une notation permanente sur le titre d'un v\u00e9hicule indiquant des dommages significatifs, une r\u00e9cup\u00e9ration de vol ou un autre historique d\u00e9favorable. Les marques courantes incluent salvage, reconstruit, inondation, casse, non r\u00e9parable et lemon (rachat du fabricant). Une marque de titre suit le VIN entre les \u00e9tats pour toute la vie du v\u00e9hicule, r\u00e9duit g\u00e9n\u00e9ralement la valeur de revente et peut compliquer l'assurance ou le financement." },
      { q: "Quelle est la diff\u00e9rence entre un titre salvage et un titre reconstruit\u00a0?", a: "Un titre salvage marque un v\u00e9hicule qu'un assureur a d\u00e9clar\u00e9 en perte totale\u00a0; il ne peut pas \u00eatre conduit l\u00e9galement avant d'\u00eatre r\u00e9par\u00e9 et inspect\u00e9 \u00e0 nouveau. Un titre reconstruit est \u00e9mis \u00e0 un v\u00e9hicule pr\u00e9c\u00e9demment salvage qui a \u00e9t\u00e9 r\u00e9par\u00e9 et a pass\u00e9 une inspection de s\u00e9curit\u00e9 \u00e9tatique, le rendant l\u00e9gal pour la route \u00e0 nouveau. Les v\u00e9hicules reconstruits sont l\u00e9gaux pour la route mais valent g\u00e9n\u00e9ralement 20 \u00e0 40 pour cent de moins qu'un v\u00e9hicule comparable \u00e0 titre propre, et les options d'assurance et de financement restent limit\u00e9es." },
      { q: "Qu'est-ce que le rollback d'odom\u00e8tre\u00a0?", a: "Le rollback d'odom\u00e8tre est une forme de fraude \u00e0 l'odom\u00e8tre dans laquelle le kilom\u00e9trage affich\u00e9 d'un v\u00e9hicule est r\u00e9duit ill\u00e9galement pour donner l'impression que la voiture est moins us\u00e9e et vaut plus. Les compteurs num\u00e9riques modernes peuvent \u00eatre rembobin\u00e9s avec des outils de service, laissant peu de signes visibles. La loi f\u00e9d\u00e9rale exige la divulgation de l'odom\u00e8tre lors des transferts de titre et interdit le rollback. La meilleure d\u00e9fense est de comparer le kilom\u00e9trage affich\u00e9 aux dossiers les plus r\u00e9cents d'inspection \u00e9tatique, de vidange d'huile ou d'entretien." },
      { q: "Qu'est-ce que le lavage de titre\u00a0?", a: "Le lavage de titre est la pratique frauduleuse consistant \u00e0 d\u00e9placer un v\u00e9hicule marqu\u00e9 \u00e0 travers un ou plusieurs \u00e9tats pour retirer ou cacher une marque de titre d\u00e9favorable, puis le retitrer comme propre. NMVTIS, qui consolide les dossiers de marques au niveau national, rend le lavage de titre beaucoup plus difficile, mais il se produit encore dans les br\u00e8ches entre syst\u00e8mes de d\u00e9claration \u00e9tatiques. Lancer une v\u00e9rification d'historique VIN multi-sources avant d'acheter est le moyen le plus fiable de faire \u00e9merger une marque qui a \u00e9t\u00e9 lav\u00e9e du titre papier." },
      { q: "Qu'est-ce qu'un rachat Lemon Law\u00a0?", a: "Un rachat Lemon Law est un v\u00e9hicule que le fabricant a rachet\u00e9 \u00e0 son propri\u00e9taire d'origine en vertu d'une Lemon Law \u00e9tatique parce qu'un d\u00e9faut substantiel n'a pas pu \u00eatre r\u00e9par\u00e9 dans un nombre raisonnable de tentatives. Les rachats Lemon Law doivent g\u00e9n\u00e9ralement \u00eatre divulgu\u00e9s et portent typiquement une marque de titre permanente comme \u00ab\u00a0Lemon Law Buyback\u00a0\u00bb ou \u00ab\u00a0Manufacturer Buyback\u00a0\u00bb. Ces v\u00e9hicules reviennent souvent sur le march\u00e9 d'occasion apr\u00e8s r\u00e9parations, g\u00e9n\u00e9ralement avec une d\u00e9cote consid\u00e9rable." },
    ],
    terms: [
      { term: "ACV (Actual Cash Value)", definition: "La juste valeur marchande d'un v\u00e9hicule juste avant une perte, utilis\u00e9e par les assureurs pour r\u00e9gler les sinistres de perte totale. L'ACV prend en compte l'\u00e2ge, le kilom\u00e9trage, l'\u00e9tat et la demande locale. Elle est g\u00e9n\u00e9ralement inf\u00e9rieure au co\u00fbt de remplacement au d\u00e9tail." },
      { term: "Historique des coussins gonflables", definition: "Un dossier indiquant si les coussins gonflables d'un v\u00e9hicule se sont d\u00e9ploy\u00e9s et si les remplacements ont \u00e9t\u00e9 install\u00e9s correctement. Des coussins manquants ou r\u00e9initialis\u00e9s incorrectement sont un drapeau rouge majeur de s\u00e9curit\u00e9. L'historique des coussins appara\u00eet parfois dans les rapports d'historique de v\u00e9hicule et les dossiers d'inspection." },
      { term: "Vente \u00ab\u00a0en l'\u00e9tat\u00a0\u00bb (As-is)", definition: "Une vente de voiture d'occasion o\u00f9 l'acheteur accepte le v\u00e9hicule dans son \u00e9tat actuel sans garantie implicite. Une fois que tu signes, les r\u00e9parations sont ta responsabilit\u00e9 sauf preuve de fraude. Lance toujours une v\u00e9rification VIN et une inspection avant achat avant d'accepter des conditions \u00ab\u00a0en l'\u00e9tat\u00a0\u00bb." },
      { term: "Usine d'assemblage", definition: "L'usine o\u00f9 un v\u00e9hicule a \u00e9t\u00e9 construit, encod\u00e9e dans le caract\u00e8re 11 du VIN. Conna\u00eetre l'usine peut aider \u00e0 diagnostiquer la port\u00e9e d'un rappel ou des probl\u00e8mes de lot de production. Les constructeurs peuvent utiliser plusieurs usines pour le m\u00eame mod\u00e8le." },
      { term: "Dossier d'ench\u00e8re", definition: "Une entr\u00e9e historique montrant qu'un v\u00e9hicule a \u00e9t\u00e9 vendu ou propos\u00e9 dans une ench\u00e8re de gros, de salvage ou d'assurance. Des apparitions fr\u00e9quentes en ench\u00e8res signalent souvent des dommages, une perte totale ou un historique de rachat Lemon Law. Les photos d'ench\u00e8re peuvent r\u00e9v\u00e9ler des dommages cach\u00e9s par des r\u00e9parations cosm\u00e9tiques ult\u00e9rieures." },
      { term: "AutoCheck", definition: "Un service de rapports d'historique de v\u00e9hicule appartenant \u00e0 Experian, souvent utilis\u00e9 par les concessionnaires et en ench\u00e8res. Il note les v\u00e9hicules sur une \u00e9chelle num\u00e9rique bas\u00e9e sur l'historique de titre, d'accidents et de propri\u00e9t\u00e9. AutoCheck et Carfax affichent parfois des dossiers diff\u00e9rents, donc le recoupement est sage." },
      { term: "Bill of sale (contrat de vente)", definition: "Un document \u00e9crit enregistrant le transfert d'un v\u00e9hicule du vendeur \u00e0 l'acheteur, incluant prix, VIN et d\u00e9tails des parties. Beaucoup d'\u00e9tats exigent un bill of sale notari\u00e9 pour immatriculer le v\u00e9hicule. Conserve ta copie \u00e0 des fins fiscales et de garantie." },
      { term: "Titre cautionn\u00e9 (Bonded title)", definition: "Un titre \u00e9mis quand la documentation de propri\u00e9t\u00e9 manque, garanti par un cautionnement qui prot\u00e8ge les futurs r\u00e9clamants. Le cautionnement reste g\u00e9n\u00e9ralement en vigueur de trois \u00e0 cinq ans. Les titres cautionn\u00e9s peuvent g\u00e9n\u00e9ralement \u00eatre convertis en titres standard apr\u00e8s expiration de la p\u00e9riode sans r\u00e9clamations." },
      { term: "Titre marqu\u00e9 (Branded title)", definition: "Tout titre portant une d\u00e9signation permanente comme salvage, reconstruit, inondation, casse ou lemon. Les v\u00e9hicules marqu\u00e9s valent substantiellement moins et peuvent \u00eatre plus difficiles \u00e0 assurer ou financer. La marque suit le VIN entre les \u00e9tats pour toute la vie du v\u00e9hicule." },
      { term: "Garantie bumper-to-bumper", definition: "Une garantie compl\u00e8te du fabricant couvrant la plupart des composants du v\u00e9hicule sauf ceux d'usure et d'entretien de routine. La couverture dure typiquement trois ans ou 36\u00a0000 miles, selon la premi\u00e8re \u00e9ch\u00e9ance. Elle se transf\u00e8re g\u00e9n\u00e9ralement avec le VIN aux propri\u00e9taires suivants jusqu'\u00e0 expiration." },
      { term: "Carfax", definition: "Un fournisseur largement reconnu de rapports d'historique de v\u00e9hicule qui agr\u00e8ge les dossiers de titre, accidents, service et propri\u00e9t\u00e9. Les rapports incluent une Buyback Guarantee sur les probl\u00e8mes de titre couverts. Les prix Carfax sont significativement plus \u00e9lev\u00e9s que des alternatives comme CarCheckerVIN." },
      { term: "Certificat de titre", definition: "Le document l\u00e9gal officiel \u00e9mis par l'\u00e9tat qui prouve la propri\u00e9t\u00e9 d'un v\u00e9hicule. Il liste le VIN, le propri\u00e9taire, les cr\u00e9anciers et toute marque de titre. Tu ne peux g\u00e9n\u00e9ralement pas transf\u00e9rer ou immatriculer un v\u00e9hicule sans lui." },
      { term: "Certified Pre-Owned (CPO)", definition: "Un v\u00e9hicule d'occasion qui a pass\u00e9 une inspection soutenue par le fabricant et se qualifie pour une garantie prolong\u00e9e. Les programmes CPO varient consid\u00e9rablement entre marques, donc lis toujours le contrat. Attends-toi \u00e0 payer une prime par rapport \u00e0 un \u00e9quivalent non certifi\u00e9." },
      { term: "Check digit (chiffre de contr\u00f4le)", definition: "Le 9e caract\u00e8re du VIN, calcul\u00e9 \u00e0 partir des 16 autres caract\u00e8res en utilisant une formule pond\u00e9r\u00e9e. Il permet au logiciel de d\u00e9tecter les fautes de frappe et les VIN forg\u00e9s. Un chiffre de contr\u00f4le qui \u00e9choue est un fort indicateur de fraude ou de clonage VIN." },
      { term: "Chop shop", definition: "Une op\u00e9ration ill\u00e9gale qui d\u00e9monte des v\u00e9hicules vol\u00e9s pour vendre des pi\u00e8ces sur le march\u00e9 noir. Les pi\u00e8ces de chop shop apparaissent parfois sur des march\u00e9s l\u00e9gitimes avec des VIN non concordants. Acheter des pi\u00e8ces de chop shop peut conduire \u00e0 la confiscation et \u00e0 une exposition criminelle." },
      { term: "Titre propre (Clean title)", definition: "Un titre sans dommage, salvage, inondation ou autres marques d\u00e9favorables enregistr\u00e9es contre le VIN. \u00ab\u00a0Propre\u00a0\u00bb ne signifie pas n\u00e9cessairement que le v\u00e9hicule n'a jamais \u00e9t\u00e9 endommag\u00e9, juste qu'aucune marque n'a \u00e9t\u00e9 d\u00e9clar\u00e9e. Accompagne toujours un titre propre d'une inspection ind\u00e9pendante." },
      { term: "Titre libre (Clear)", definition: "Un titre libre de privil\u00e8ges ou autres charges de propri\u00e9t\u00e9, pr\u00eat au transfert. \u00ab\u00a0Libre\u00a0\u00bb se r\u00e9f\u00e8re au statut de propri\u00e9t\u00e9, tandis que \u00ab\u00a0propre\u00a0\u00bb se r\u00e9f\u00e8re \u00e0 l'historique des dommages. Un titre peut \u00eatre propre et toujours pas libre si un pr\u00eateur d\u00e9tient un privil\u00e8ge." },
      { term: "VIN clon\u00e9", definition: "Un VIN copi\u00e9 d'un v\u00e9hicule l\u00e9gitime et appliqu\u00e9 \u00e0 un v\u00e9hicule vol\u00e9 ou salvage pour d\u00e9guiser son identit\u00e9. Les VIN clon\u00e9s sont souvent associ\u00e9s \u00e0 des titres forg\u00e9s et \u00e0 des documents d'immatriculation alt\u00e9r\u00e9s. Une inspection physique du VIN peut r\u00e9v\u00e9ler des divergences entre les plaques estamp\u00e9es et visibles." },
      { term: "Markup du concessionnaire", definition: "Un montant ajout\u00e9 au-dessus du prix sugg\u00e9r\u00e9 par le fabricant, courant pour les mod\u00e8les en demande. Les markups sont n\u00e9gociables dans les march\u00e9s mous mais rigides pendant les p\u00e9nuries. Compare toujours le prix \u00ab\u00a0out-the-door\u00a0\u00bb entre plusieurs concessionnaires." },
      { term: "D\u00e9pr\u00e9ciation", definition: "La diminution de la valeur d'un v\u00e9hicule au fil du temps en raison de l'\u00e2ge, du kilom\u00e9trage et de l'usure. La plupart des voitures perdent 20 \u00e0 30 pour cent de valeur la premi\u00e8re ann\u00e9e et environ 60 pour cent en cinq ans. Acheter l\u00e9g\u00e8rement usag\u00e9 peut \u00e9viter la courbe de d\u00e9pr\u00e9ciation la plus abrupte." },
      { term: "DMV", definition: "Le Department of Motor Vehicles, l'agence \u00e9tatique qui \u00e9met titres, immatriculations et permis de conduire. Certains \u00e9tats utilisent des noms alternatifs comme DOT, MVD ou BMV. Le DMV est la source autoritative pour les donn\u00e9es de titre et d'immatriculation au niveau \u00e9tatique." },
      { term: "Frais de documentation", definition: "Une charge du concessionnaire pour pr\u00e9parer et classer la paperasse associ\u00e9e \u00e0 une vente de v\u00e9hicule. Les frais de doc varient consid\u00e9rablement par \u00e9tat et sont parfois plafonn\u00e9s par la loi. Ils sont n\u00e9gociables sur certains march\u00e9s mais rarement compl\u00e8tement \u00e9limin\u00e9s." },
      { term: "Titre duplicata", definition: "Un certificat de titre de remplacement \u00e9mis quand l'original est perdu, vol\u00e9 ou endommag\u00e9. La plupart des \u00e9tats exigent un affidavit et un petit frais. Les titres duplicata peuvent \u00eatre marqu\u00e9s comme tels sur leur face." },
      { term: "Edmunds TMV", definition: "Edmunds True Market Value, un prix estim\u00e9 de transaction bas\u00e9 sur des ventes r\u00e9centes dans ta r\u00e9gion. TMV s'ajuste selon la finition, le kilom\u00e9trage, les options et la demande r\u00e9gionale. Utilise-le avec le Kelley Blue Book pour trianguler des prix justes." },
      { term: "Inspection des \u00e9missions", definition: "Un test mandat\u00e9 par l'\u00e9tat qui mesure les polluants d'\u00e9chappement d'un v\u00e9hicule. Beaucoup de comt\u00e9s urbains exigent de passer les \u00e9missions avant le renouvellement d'immatriculation. Les v\u00e9hicules qui \u00e9chouent doivent \u00eatre r\u00e9par\u00e9s ou, dans des cas limit\u00e9s, b\u00e9n\u00e9ficier d'une exemption." },
      { term: "Titre encombr\u00e9", definition: "Un titre montrant un ou plusieurs privil\u00e8ges actifs, signifiant qu'un pr\u00eateur a un int\u00e9r\u00eat financier dans le v\u00e9hicule. Les v\u00e9hicules encombr\u00e9s ne peuvent pas \u00eatre transf\u00e9r\u00e9s libres et nets tant que le privil\u00e8ge n'est pas satisfait. Confirme toujours la mainlev\u00e9e du privil\u00e8ge avant de payer un vendeur priv\u00e9." },
      { term: "Garantie prolong\u00e9e", definition: "Un contrat de service optionnel qui prolonge la couverture au-del\u00e0 de la garantie d'origine du fabricant. Les co\u00fbts, exclusions et processus de r\u00e9clamation varient consid\u00e9rablement entre fournisseurs. Lis les petits caract\u00e8res sur les clauses de condition pr\u00e9existante et de modification." },
      { term: "V\u00e9hicule de flotte", definition: "Un v\u00e9hicule pr\u00e9c\u00e9demment poss\u00e9d\u00e9 et exploit\u00e9 par une entreprise, une agence gouvernementale ou une flotte de location. Les v\u00e9hicules de flotte ont souvent un kilom\u00e9trage plus \u00e9lev\u00e9 mais des calendriers d'entretien plus stricts. L'historique de flotte peut affecter la valeur de revente et l'\u00e9ligibilit\u00e9 \u00e0 la garantie." },
      { term: "Titre inondation", definition: "Une marque de titre appliqu\u00e9e quand un v\u00e9hicule a subi des dommages d'\u00eatre submerg\u00e9 dans l'eau au-dessus de composants sensibles. Les v\u00e9hicules inond\u00e9s peuvent souffrir de corrosion et de pannes \u00e9lectriques pendant des ann\u00e9es apr\u00e8s la perte. Certains \u00e9tats les marquent \u00ab\u00a0Flood\u00a0\u00bb, d'autres les regroupent sous la marque salvage." },
      { term: "Dommage de ch\u00e2ssis", definition: "Pliage, fissuration ou compromission du ch\u00e2ssis structurel ou monocoque d'un v\u00e9hicule. M\u00eame apr\u00e8s r\u00e9paration professionnelle, le dommage de ch\u00e2ssis peut affecter les performances en cas de choc et la valeur de revente. Beaucoup de pr\u00eateurs et programmes CPO refusent les v\u00e9hicules avec dommage de ch\u00e2ssis document\u00e9." },
      { term: "Couverture GAP", definition: "Guaranteed Asset Protection insurance qui paie la diff\u00e9rence entre l'ACV d'un v\u00e9hicule et le solde restant du pr\u00eat apr\u00e8s une perte totale. GAP est la plus pr\u00e9cieuse sur les pr\u00eats \u00e0 long terme avec faibles acomptes. Elle ne couvre g\u00e9n\u00e9ralement pas les franchises, frais de retard ou garanties prolong\u00e9es." },
      { term: "Dommages de gr\u00eale", definition: "Cabosses cosm\u00e9tiques ou structurelles caus\u00e9es par de grands gr\u00ealons frappant le v\u00e9hicule. Des dommages de gr\u00eale s\u00e9v\u00e8res peuvent conduire \u00e0 une marque de titre salvage ou sp\u00e9cifique \u00e0 la gr\u00eale. Beaucoup de voitures endommag\u00e9es par la gr\u00eale sont vendues aux ench\u00e8res d'assurance et revendues sans divulgation appropri\u00e9e." },
      { term: "Titre de casse (Junk title)", definition: "Un titre indiquant qu'un v\u00e9hicule n'est apte qu'aux pi\u00e8ces ou \u00e0 la casse et ne peut pas \u00eatre l\u00e9galement retitr\u00e9 ou conduit. Les v\u00e9hicules \u00e0 titre de casse ressurgissent occasionnellement par la fraude et le lavage de titre. V\u00e9rifie toujours un VIN contre NMVTIS pour les dossiers de casse." },
      { term: "Kelley Blue Book", definition: "Une source d'\u00e9valuation automobile de longue date qui publie les valeurs de reprise, vente particuli\u00e8re et d\u00e9tail. Les prix KBB sont largement accept\u00e9s par concessionnaires, pr\u00eateurs et assureurs. Utilise le m\u00eame niveau d'\u00e9tat entre fournisseurs lors de la comparaison d'estimations." },
      { term: "Rachat Lemon Law", definition: "Un v\u00e9hicule rachet\u00e9 par le fabricant en vertu d'une Lemon Law \u00e9tatique parce qu'il n'a pas pu \u00eatre r\u00e9par\u00e9. Les rachats Lemon Law doivent \u00eatre divulgu\u00e9s et portent typiquement une marque de titre permanente. Ils reviennent parfois sur le march\u00e9 apr\u00e8s r\u00e9parations avec une d\u00e9cote consid\u00e9rable." },
      { term: "Lemon Law", definition: "Lois \u00e9tatiques et f\u00e9d\u00e9rales qui prot\u00e8gent les acheteurs de v\u00e9hicules neufs et parfois d'occasion avec des d\u00e9fauts chroniques. Les v\u00e9hicules \u00e9ligibles peuvent \u00eatre admissibles \u00e0 un remplacement, un remboursement ou un r\u00e8glement en esp\u00e8ces. Les seuils Lemon Law varient, donc consulte le bureau du procureur g\u00e9n\u00e9ral de ton \u00e9tat pour les d\u00e9tails." },
      { term: "Privil\u00e8ge (Lien)", definition: "Une r\u00e9clamation l\u00e9gale contre un v\u00e9hicule qui garantit le paiement d'une dette, le plus souvent un pr\u00eat auto. Le cr\u00e9ancier est list\u00e9 sur le titre jusqu'\u00e0 ce que la dette soit satisfaite et le privil\u00e8ge lib\u00e9r\u00e9. Tu ne peux pas transf\u00e9rer la propri\u00e9t\u00e9 libre tant qu'un privil\u00e8ge reste actif." },
      { term: "Lienholder (titulaire du privil\u00e8ge)", definition: "La partie, g\u00e9n\u00e9ralement une banque ou une coop\u00e9rative de cr\u00e9dit, qui d\u00e9tient un privil\u00e8ge sur le v\u00e9hicule. Le titulaire d\u00e9tient physiquement ou contr\u00f4le \u00e9lectroniquement le titre dans beaucoup d'\u00e9tats. V\u00e9rifie toujours une lettre de mainlev\u00e9e de privil\u00e8ge avant de payer un vendeur priv\u00e9." },
      { term: "Rachat du fabricant", definition: "Une cat\u00e9gorie plus large qui inclut les rachats Lemon Law plus les rachats volontaires par les fabricants pour des raisons de bonne volont\u00e9 ou des rappels. La plupart portent une marque de titre permanente. Les exigences de divulgation varient par \u00e9tat et circonstance." },
      { term: "Chiffre d'ann\u00e9e mod\u00e8le", definition: "Le 10e caract\u00e8re du VIN, encodant l'ann\u00e9e mod\u00e8le du v\u00e9hicule. Le caract\u00e8re alterne entre lettres et chiffres dans une rotation de 30 ans. L'associer au caract\u00e8re d'usine d'assemblage aide \u00e0 confirmer l'authenticit\u00e9." },
      { term: "NICB", definition: "Le National Insurance Crime Bureau, une organisation \u00e0 but non lucratif qui maintient des bases de donn\u00e9es de v\u00e9hicules vol\u00e9s et de salvage d\u00e9clar\u00e9s par les assureurs membres. Son outil gratuit VINCheck signale les dossiers de vol et de perte totale. La couverture est limit\u00e9e aux assureurs participants, donc ne devrait pas \u00eatre ta seule v\u00e9rification." },
      { term: "NMVTIS", definition: "Le National Motor Vehicle Title Information System, une base de donn\u00e9es f\u00e9d\u00e9rale obligatoire qui suit titres, marques, casse et dossiers de salvage aux \u00c9tats-Unis. NMVTIS est la source la plus autoritative pour l'historique des marques de titre entre \u00e9tats. La plupart des services r\u00e9put\u00e9s de v\u00e9rification VIN tirent leurs donn\u00e9es de NMVTIS." },
      { term: "Titre non r\u00e9parable", definition: "Une marque de titre indiquant qu'un v\u00e9hicule est si gravement endommag\u00e9 qu'il ne peut \u00eatre que d\u00e9mont\u00e9 pour des pi\u00e8ces ou vendu pour la ferraille. Les v\u00e9hicules non r\u00e9parables ne peuvent pas \u00eatre retitr\u00e9s pour usage routier. La marque suit le VIN de fa\u00e7on permanente." },
      { term: "Fraude \u00e0 l'odom\u00e8tre", definition: "Manipuler ill\u00e9galement l'odom\u00e8tre d'un v\u00e9hicule pour d\u00e9former son kilom\u00e9trage r\u00e9el. La loi f\u00e9d\u00e9rale exige la divulgation de l'odom\u00e8tre lors des transferts de titre et interdit le rollback. Les \u00e9carts suspects de kilom\u00e9trage dans les dossiers de service ou d'immatriculation exposent souvent la fraude." },
      { term: "Rollback d'odom\u00e8tre", definition: "Une forme sp\u00e9cifique de fraude \u00e0 l'odom\u00e8tre o\u00f9 le kilom\u00e9trage affich\u00e9 est r\u00e9duit. Les compteurs num\u00e9riques modernes peuvent \u00eatre rembobin\u00e9s via des outils de service, laissant peu de signes visibles. Compare toujours le kilom\u00e9trage affich\u00e9 aux dossiers les plus r\u00e9cents d'inspection \u00e9tatique ou de vidange d'huile." },
      { term: "Titre ouvert", definition: "Un titre sign\u00e9 par le pr\u00e9c\u00e9dent propri\u00e9taire mais pas encore transf\u00e9r\u00e9 au nom du nouveau propri\u00e9taire. Les titres ouverts sont ill\u00e9gaux dans la plupart des \u00e9tats et fr\u00e9quemment associ\u00e9s au curbstoning et au title skipping. \u00c9vite tout deal impliquant un titre ouvert." },
      { term: "Titre pi\u00e8ces seulement (Parts-only)", definition: "Une d\u00e9signation de titre similaire \u00e0 casse ou non r\u00e9parable, indiquant que le v\u00e9hicule ne peut \u00eatre vendu que par composants. Les v\u00e9hicules pi\u00e8ces-seulement ne peuvent pas retourner \u00e0 l'usage routier. Certains \u00e9tats utilisent pi\u00e8ces-seulement et non-r\u00e9parable de fa\u00e7on interchangeable." },
      { term: "V\u00e9hicule fant\u00f4me", definition: "Un v\u00e9hicule fictif cr\u00e9\u00e9 dans les dossiers d'immatriculation ou d'assurance, souvent en utilisant un VIN faux ou clon\u00e9. Les v\u00e9hicules fant\u00f4mes surgissent dans les sch\u00e9mas de fraude visant les paiements de financement ou d'assurance. Un d\u00e9codage VIN qui \u00e9choue est un signe d'alerte classique." },
      { term: "Garantie du groupe motopropulseur", definition: "Couverture ax\u00e9e sur les composants moteur, transmission et groupe motopropulseur. Les garanties du groupe motopropulseur durent g\u00e9n\u00e9ralement plus longtemps que la couverture bumper-to-bumper, souvent cinq \u00e0 dix ans. Elles se transf\u00e8rent typiquement aux propri\u00e9taires suivants avec des restrictions." },
      { term: "Inspection avant achat (PPI)", definition: "Une inspection ind\u00e9pendante effectu\u00e9e par un m\u00e9canicien qualifi\u00e9 avant d'acheter un v\u00e9hicule d'occasion. Une bonne PPI d\u00e9couvre les dommages cach\u00e9s, l'entretien diff\u00e9r\u00e9 et les drapeaux rouges manqu\u00e9s lors d'un essai routier. Attends-toi \u00e0 payer 100 \u00e0 250 dollars, bien valoir la tranquillit\u00e9 d'esprit." },
      { term: "Vente priv\u00e9e", definition: "Une vente de v\u00e9hicule directement entre deux individus, sans concessionnaire impliqu\u00e9. Les prix de vente priv\u00e9e sont typiquement inf\u00e9rieurs au retail du concessionnaire mais n'offrent pas de protection de garantie. Une v\u00e9rification VIN est essentielle avant tout transfert d'argent." },
      { term: "Valeur de vente priv\u00e9e", definition: "Un prix estim\u00e9 refl\u00e9tant ce qu'un acheteur priv\u00e9 paierait raisonnablement \u00e0 un vendeur priv\u00e9. Tombe g\u00e9n\u00e9ralement entre les valeurs de reprise et de d\u00e9tail. Utilise-le pour ancrer les n\u00e9gociations sur Craigslist, Facebook Marketplace et plateformes similaires." },
      { term: "Titre reconstruit", definition: "Un titre \u00e9mis \u00e0 un v\u00e9hicule pr\u00e9c\u00e9demment salvage qui a \u00e9t\u00e9 r\u00e9par\u00e9 et a pass\u00e9 une inspection de s\u00e9curit\u00e9 \u00e9tatique. Les v\u00e9hicules reconstruits sont l\u00e9gaux pour la route mais valent 20 \u00e0 40 pour cent de moins que les \u00e9quivalents \u00e0 titre propre. Les options d'assurance et de financement sont limit\u00e9es." },
      { term: "Recall (Rappel)", definition: "Un programme de r\u00e9paration impos\u00e9 par le fabricant ou la NHTSA qui traite les d\u00e9fauts de s\u00e9curit\u00e9. Les r\u00e9parations de rappel sont gratuites quel que soit l'\u00e2ge ou la propri\u00e9t\u00e9 du v\u00e9hicule. V\u00e9rifie toujours les rappels ouverts par VIN avant d'acheter et fais-les compl\u00e9ter chez un concessionnaire autoris\u00e9." },
      { term: "Reconstructed (Reconstruit)", definition: "Une marque de titre utilis\u00e9e dans certains \u00e9tats pour des v\u00e9hicules substantiellement reconstruits \u00e0 partir d'assemblages de composants majeurs. Les v\u00e9hicules reconstruits doivent g\u00e9n\u00e9ralement passer une inspection structurelle et de s\u00e9curit\u00e9. La marque suit le VIN et affecte la valeur de revente." },
      { term: "Immatriculation du v\u00e9hicule", definition: "Le document \u00e9mis par l'\u00e9tat qui permet \u00e0 un v\u00e9hicule titr\u00e9 d'\u00eatre exploit\u00e9 sur la voie publique. L'immatriculation doit \u00eatre renouvel\u00e9e p\u00e9riodiquement et peut exiger des inspections d'\u00e9missions ou de s\u00e9curit\u00e9. L'immatriculation est s\u00e9par\u00e9e du titre et doit \u00eatre mise \u00e0 jour lors d'un changement de propri\u00e9t\u00e9." },
      { term: "Valeur de d\u00e9tail (Retail)", definition: "Le prix qu'un concessionnaire demande typiquement sur le lot, refl\u00e9tant le reconditionnement, le marketing, la couverture de garantie et les frais g\u00e9n\u00e9raux. La valeur de d\u00e9tail est la plus \u00e9lev\u00e9e des \u00e9valuations standard. N\u00e9gocie depuis la valeur de vente priv\u00e9e document\u00e9e quand possible." },
      { term: "Inspection de s\u00e9curit\u00e9", definition: "Une inspection \u00e9tatique p\u00e9riodique qui v\u00e9rifie que freins, lumi\u00e8res, pneus et autres syst\u00e8mes de s\u00e9curit\u00e9 respectent les normes minimales. Les intervalles requis et l'\u00e9tendue varient par \u00e9tat. Les v\u00e9hicules qui \u00e9chouent doivent \u00eatre r\u00e9par\u00e9s avant de pouvoir \u00eatre r\u00e9immatricul\u00e9s." },
      { term: "Titre salvage", definition: "Une marque de titre appos\u00e9e quand un assureur d\u00e9clare un v\u00e9hicule en perte totale, g\u00e9n\u00e9ralement apr\u00e8s que les dommages d\u00e9passent 70 \u00e0 90 pour cent de sa valeur. Les v\u00e9hicules salvage ne peuvent pas \u00eatre conduits l\u00e9galement avant d'\u00eatre reconstruits et retitr\u00e9s. \u00c9vite toujours les v\u00e9hicules salvage \u00e0 moins d'\u00eatre un reconstructeur exp\u00e9riment\u00e9." },
      { term: "Dommage structurel", definition: "Dommage affectant les composants porteurs de charge comme le ch\u00e2ssis, le monocoque ou les piliers. Le dommage structurel compromet les performances en cas de choc m\u00eame apr\u00e8s r\u00e9paration professionnelle. C'est l'un des signaux les plus forts pour s'\u00e9loigner d'un deal." },
      { term: "Marque de titre (Title brand)", definition: "Une notation permanente sur un titre de v\u00e9hicule indiquant des dommages significatifs, une r\u00e9cup\u00e9ration de vol ou un autre historique d\u00e9favorable. Les marques suivent le VIN entre les \u00e9tats pour toute la vie du v\u00e9hicule. Les marques courantes incluent salvage, reconstruit, inondation, casse et lemon." },
      { term: "Transfert de titre", definition: "Le processus l\u00e9gal de transfert de propri\u00e9t\u00e9 du vendeur \u00e0 l'acheteur via le DMV \u00e9tatique. La plupart des \u00e9tats imposent des d\u00e9lais stricts, souvent 10 \u00e0 30 jours apr\u00e8s la vente. Manquer le transfert \u00e0 temps peut d\u00e9clencher des p\u00e9nalit\u00e9s et des probl\u00e8mes d'immatriculation." },
      { term: "Lavage de titre (Title washing)", definition: "La pratique frauduleuse consistant \u00e0 d\u00e9placer un v\u00e9hicule marqu\u00e9 \u00e0 travers plusieurs \u00e9tats pour retirer ou cacher des marques de titre d\u00e9favorables. NMVTIS rend le lavage de titre plus difficile mais il se produit encore. Lance toujours une v\u00e9rification d'historique VIN multi-sources avant d'acheter." },
      { term: "Perte totale (Total loss)", definition: "Une d\u00e9signation d'assurance pour un v\u00e9hicule dont le co\u00fbt de r\u00e9paration d\u00e9passe un pourcentage d\u00e9fini par l'\u00e9tat de sa valeur avant la perte. Les pertes totales re\u00e7oivent g\u00e9n\u00e9ralement une marque de titre salvage ou casse. M\u00eame les v\u00e9hicules de perte totale r\u00e9par\u00e9s peuvent porter des probl\u00e8mes cach\u00e9s \u00e0 long terme." },
      { term: "Valeur de reprise", definition: "Le montant qu'un concessionnaire offre de te cr\u00e9diter pour ton v\u00e9hicule actuel lors de l'achat d'un autre. La valeur de reprise est typiquement la plus basse des \u00e9valuations standard parce que les concessionnaires doivent reconditionner et revendre. Dans beaucoup d'\u00e9tats, la reprise r\u00e9duit la taxe de vente sur le nouveau v\u00e9hicule." },
      { term: "TSB (Bulletin de service technique)", definition: "Un avis \u00e9mis par le fabricant d\u00e9crivant un probl\u00e8me connu et la r\u00e9paration recommand\u00e9e. Contrairement aux rappels, les r\u00e9parations TSB sont g\u00e9n\u00e9ralement effectu\u00e9es aux frais du propri\u00e9taire. Chercher des TSB par VIN peut r\u00e9v\u00e9ler des probl\u00e8mes courants avant l'achat." },
      { term: "VDS (Vehicle Descriptor Section)", definition: "Caract\u00e8res 4 \u00e0 9 du VIN, d\u00e9crivant le mod\u00e8le du v\u00e9hicule, la carrosserie, le moteur et le syst\u00e8me de retenue. La structure VDS est d\u00e9finie par chaque fabricant dans les normes ISO. D\u00e9coder le VDS r\u00e9v\u00e8le les d\u00e9tails de finition et de groupe motopropulseur." },
      { term: "VIN", definition: "Le Vehicle Identification Number, un code alphanum\u00e9rique de 17 caract\u00e8res qui identifie de fa\u00e7on unique chaque v\u00e9hicule moderne. Le VIN encode le fabricant, le mod\u00e8le, l'ann\u00e9e, l'usine et l'information s\u00e9rielle. Il appara\u00eet sur le tableau de bord, le cadre de porte, le titre et l'immatriculation." },
      { term: "VIS (Vehicle Identifier Section)", definition: "Caract\u00e8res 10 \u00e0 17 du VIN, incluant l'ann\u00e9e mod\u00e8le, l'usine d'assemblage et un num\u00e9ro unique de s\u00e9quence de production. Le VIS rend chaque v\u00e9hicule individuellement identifiable. C'est ce qui rend possible le rapport d'historique bas\u00e9 sur VIN." },
      { term: "WMI (World Manufacturer Identifier)", definition: "Les trois premiers caract\u00e8res du VIN, identifiant le pays, le fabricant et le type de v\u00e9hicule. Les codes sont attribu\u00e9s globalement par SAE International. Le WMI est ton premier indice sur o\u00f9 et par qui un v\u00e9hicule a \u00e9t\u00e9 construit." },
    ],
  },
} as const;

// Per-term internal-link hrefs (locale-aware). Index-matched to COPY.terms.
const TERM_LINKS_EN: (string | undefined)[] = [
  undefined, "/accident-history-check", "/vin-check", undefined, undefined, undefined, undefined, undefined,
  "/salvage-title-check", undefined, "/vin-check-vs-carfax", undefined, undefined, undefined, "/stolen-vehicle-check",
  undefined, undefined, "/stolen-vehicle-check", undefined, undefined, undefined, undefined, undefined,
  undefined, undefined, undefined, undefined, undefined, "/salvage-title-check", "/accident-history-check",
  undefined, undefined, "/salvage-title-check", undefined, "/lemon-check", "/lemon-check", undefined, undefined,
  "/lemon-check", undefined, "/stolen-vehicle-check", "/vin-check", "/salvage-title-check",
  "/odometer-check", "/odometer-check", undefined, undefined, "/stolen-vehicle-check", undefined,
  undefined, "/vin-check", undefined, "/salvage-title-check", undefined, undefined, undefined, undefined,
  undefined, "/salvage-title-check", "/accident-history-check", "/salvage-title-check", undefined,
  "/vin-check", undefined, undefined, undefined, "/vin-check", "/vin-check", "/vin-check", undefined,
];

const TERM_LINKS_ES: (string | undefined)[] = [
  undefined, "/es/historial-accidentes", "/es/revision-vin", undefined, undefined, undefined, undefined, undefined,
  "/es/titulo-salvamento", undefined, "/es/carcheckervin-vs-carfax", undefined, undefined, undefined, "/es/vehiculo-robado",
  undefined, undefined, "/es/vehiculo-robado", undefined, undefined, undefined, undefined, undefined,
  undefined, undefined, undefined, undefined, undefined, "/es/titulo-salvamento", "/es/historial-accidentes",
  undefined, undefined, "/es/titulo-salvamento", undefined, "/es/verificacion-ley-limon", "/es/verificacion-ley-limon", undefined, undefined,
  "/es/verificacion-ley-limon", undefined, "/es/vehiculo-robado", "/es/revision-vin", "/es/titulo-salvamento",
  "/es/verificacion-odometro", "/es/verificacion-odometro", undefined, undefined, "/es/vehiculo-robado", undefined,
  undefined, "/es/revision-vin", undefined, "/es/titulo-salvamento", undefined, undefined, undefined, undefined,
  undefined, "/es/titulo-salvamento", "/es/historial-accidentes", "/es/titulo-salvamento", undefined,
  "/es/revision-vin", undefined, undefined, undefined, "/es/revision-vin", "/es/revision-vin", "/es/revision-vin", undefined,
];

export default function GlossaryPageBody({
  locale = "en",
}: {
  locale?: Locale;
}) {
  const copy = COPY[locale];
  const homeHref = locale === "es" ? "/es" : "/";
  const links = locale === "es" ? TERM_LINKS_ES : TERM_LINKS_EN;
  const QUICK_HREFS = locale === "es"
    ? ["/es/revision-vin", "/es/vehiculo-robado", "/es/titulo-salvamento", "/es/historial-accidentes", "/es/verificacion-odometro", "/es/verificacion-ley-limon"]
    : ["/vin-check", "/stolen-vehicle-check", "/salvage-title-check", "/accident-history-check", "/odometer-check", "/lemon-check"];

  // Build Term[] with hrefs
  const terms: Term[] = copy.terms.map((t, i) => ({
    term: t.term,
    definition: t.definition,
    href: links[i],
  }));

  const sortedTerms = [...terms].sort((a, b) =>
    a.term.localeCompare(b.term, locale === "es" ? "es" : "en", { sensitivity: "base" })
  );

  const grouped = sortedTerms.reduce<Record<string, Term[]>>((acc, t) => {
    const letter = t.term[0]?.toUpperCase() ?? "#";
    const key = /[A-Z]/.test(letter) ? letter : "#";
    acc[key] ||= [];
    acc[key].push(t);
    return acc;
  }, {});

  const letters = Object.keys(grouped).sort();
  const allLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <>
      <section className="pt-28 pb-10 bg-gradient-to-br from-primary-600 to-primary-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-5 [&_a]:text-primary-100 [&_a:hover]:text-white [&_span]:text-white [&_li_span]:text-primary-200">
            <Breadcrumbs onDark items={[{ label: copy.breadcrumbHome, href: homeHref }, { label: copy.breadcrumbCurrent }]} />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold">{copy.h1}</h1>
          <p className="mt-5 text-lg text-primary-100 leading-relaxed max-w-3xl">{copy.heroLead}</p>
        </div>
      </section>

      <section className="py-10 border-b border-slate-200 bg-white sticky top-16 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label={copy.lettersAria} className="flex flex-wrap gap-2 justify-center">
            {allLetters.map((l) => {
              const enabled = letters.includes(l);
              return enabled ? (
                <a key={l} href={`#letter-${l}`} className="w-9 h-9 flex items-center justify-center rounded-lg bg-primary-50 text-primary-700 hover:bg-primary-600 hover:text-white font-semibold text-sm transition-colors">
                  {l}
                </a>
              ) : (
                <span key={l} className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-50 text-slate-300 font-semibold text-sm" aria-hidden>{l}</span>
              );
            })}
          </nav>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {letters.map((letter) => (
            <div key={letter} id={`letter-${letter}`} className="mb-12 scroll-mt-32">
              <h2 className="text-3xl font-bold text-slate-900 border-b border-slate-200 pb-3 mb-6">{letter}</h2>
              <dl className="space-y-6">
                {grouped[letter].map((t) => (
                  <div key={t.term} className="bg-white">
                    <dt className="text-lg font-semibold text-slate-900">
                      {t.href ? (
                        <Link href={t.href} className="hover:text-primary-600 transition-colors">{t.term}</Link>
                      ) : (
                        t.term
                      )}
                    </dt>
                    <dd className="mt-1.5 text-slate-600 leading-relaxed">{t.definition}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center">{copy.faqHeading}</h2>
          <p className="mt-3 text-slate-700 text-center max-w-2xl mx-auto">{copy.faqIntro}</p>
          <div className="mt-8 space-y-3">
            {copy.faqs.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-slate-200 bg-white p-5 hover:border-primary-500 transition-colors [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                  <span className="text-base sm:text-lg font-semibold text-slate-900 pr-2">{f.q}</span>
                  <span className="flex-shrink-0 mt-0.5 text-primary-600 text-2xl font-light leading-none group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-slate-600 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center">{copy.quickHeading}</h2>
          <p className="mt-3 text-slate-700 text-center max-w-2xl mx-auto">{copy.quickIntro}</p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {copy.quickTools.map((tool, i) => (
              <Link key={QUICK_HREFS[i]} href={QUICK_HREFS[i]} className="block p-5 bg-white rounded-2xl border border-slate-200 hover:border-primary-500 hover:shadow-md transition-all text-slate-900 font-semibold">
                {tool.label}
                <span className="block mt-1 text-sm text-slate-700 font-normal">
                  {copy.quickToolSubTemplate.replace("{label}", tool.label.toLowerCase())}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">{copy.ctaHeading}</h2>
          <p className="text-slate-700 mb-8">{copy.ctaBody}</p>
          <VinSearchForm size="sm" locale={locale} />
        </div>
      </section>
    </>
  );
}

export { COPY as GLOSSARY_COPY };
