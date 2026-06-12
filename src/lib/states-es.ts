/**
 * Spanish translations of the per-state text fields in `lib/states.ts`.
 *
 * Only the language-sensitive fields are duplicated here:
 *   - nameEs           — Spanish-language state name where one exists
 *                        (Nueva York, Pensilvania, Carolina del Norte)
 *                        else the English name unchanged.
 *   - dmvNameEs        — translated agency name (concise)
 *   - lemonLawNotesEs  — single sentence
 *   - specialFactEs    — single sentence per-state hook
 *   - descriptionHookEs — SERP-targeted lead used in Spanish meta description
 *
 * Structural data (slug, abbr, population, vehiclesRegistered, titleBrands
 * array) is read straight from `states.ts` — those are facts, not language.
 *
 * Used by `/es/vin-check/state/[state]/page.tsx`. Falls back to the
 * English source if a translation is missing so the page never renders empty.
 */

export interface StateInfoEs {
  slug: string;
  nameEs: string;
  dmvNameEs: string;
  lemonLawNotesEs: string;
  specialFactEs: string;
  descriptionHookEs: string;
}

export const statesEs: StateInfoEs[] = [
  { slug: "alabama", nameEs: "Alabama", dmvNameEs: "División de Vehículos del Departamento de Ingresos de Alabama", lemonLawNotesEs: "La Lemon Law de Alabama cubre vehículos nuevos por 12 meses o 12,000 millas, lo que ocurra primero.", specialFactEs: "Alabama exige una inspección VIN a todo vehículo de otro estado antes de poder titularse en el estado.", descriptionHookEs: "Detecta marcas Salvage, Junk y Rebuilt en Alabama antes de comprar." },
  { slug: "alaska", nameEs: "Alaska", dmvNameEs: "División de Vehículos Motorizados de Alaska", lemonLawNotesEs: "La Lemon Law de Alaska aplica a vehículos nuevos durante el primer año o el período de garantía.", specialFactEs: "Alaska marca títulos de vehículos dañados por el clima subártico extremo y los tratamientos corrosivos de invierno en las carreteras.", descriptionHookEs: "Detecta daño por sal y reconstruido en Alaska antes de comprar." },
  { slug: "arizona", nameEs: "Arizona", dmvNameEs: "División de Vehículos Motorizados de Arizona (MVD)", lemonLawNotesEs: "La Lemon Law de Arizona cubre vehículos nuevos por 24 meses o 24,000 millas.", specialFactEs: "El programa de emisiones de Arizona hace que el historial de emisiones por VIN sea clave en cualquier revisión previa a la compra en los condados de Maricopa y Pima.", descriptionHookEs: "Revisa historial de emisiones, salvage y marcas reconstruido en Arizona." },
  { slug: "arkansas", nameEs: "Arkansas", dmvNameEs: "Departamento de Finanzas y Administración de Arkansas", lemonLawNotesEs: "La Lemon Law de Arkansas aplica a vehículos nuevos por 24 meses o 24,000 millas.", specialFactEs: "Arkansas exige verificación VIN por las autoridades en muchas transferencias de título de vehículos usados.", descriptionHookEs: "Detecta marcas Salvage, Rebuilt y Prior Salvage en Arkansas en segundos." },
  { slug: "california", nameEs: "California", dmvNameEs: "DMV de California", lemonLawNotesEs: "La Song-Beverly de California es una de las leyes lemon más fuertes del país, con amplia protección para compradores de autos nuevos y usados con garantía.", specialFactEs: "California marca de forma única los títulos con 'Lemon Law Buyback' para que los compradores identifiquen vehículos recomprados por la ley lemon.", descriptionHookEs: "Detecta títulos Lemon Law Buyback y salvage revivido en California." },
  { slug: "colorado", nameEs: "Colorado", dmvNameEs: "División de Vehículos Motorizados de Colorado", lemonLawNotesEs: "La Lemon Law de Colorado cubre vehículos nuevos por un año desde la compra.", specialFactEs: "Colorado es uno de los pocos estados con marca de título 'Hail Damage' por sus frecuentes tormentas severas de granizo.", descriptionHookEs: "Detecta marcas Hail Damage, salvage y accidentes en Colorado." },
  { slug: "connecticut", nameEs: "Connecticut", dmvNameEs: "DMV de Connecticut", lemonLawNotesEs: "Connecticut promulgó la primera ley lemon del país en 1982, cubriendo vehículos nuevos por 24 meses o 24,000 millas.", specialFactEs: "La Lemon Law de Connecticut fue la primera de su tipo en Estados Unidos y sigue siendo modelo nacional.", descriptionHookEs: "Detecta salvage, rebuilt y daño por inundación en Connecticut." },
  { slug: "delaware", nameEs: "Delaware", dmvNameEs: "División de Vehículos Motorizados de Delaware", lemonLawNotesEs: "La Lemon Law de Delaware aplica a vehículos nuevos por 12 meses desde la entrega.", specialFactEs: "Delaware usa una marca 'Distressed' para señalar vehículos con daño significativo no por colisión.", descriptionHookEs: "Detecta marcas Distressed, salvage y reconstruido en Delaware." },
  { slug: "florida", nameEs: "Florida", dmvNameEs: "DHSMV de Florida", lemonLawNotesEs: "La Lemon Law de Florida cubre vehículos nuevos y de demostración por 24 meses desde la entrega.", specialFactEs: "Florida tiene la tasa más alta de vehículos con daño por inundación reingresando al mercado debido a huracanes recurrentes.", descriptionHookEs: "Detecta títulos por huracán e inundación y autos reconstruidos en Florida." },
  { slug: "georgia", nameEs: "Georgia", dmvNameEs: "División de Vehículos del Departamento de Ingresos de Georgia", lemonLawNotesEs: "La Lemon Law de Georgia cubre vehículos nuevos por 24 meses o 24,000 millas.", specialFactEs: "Georgia emite una designación 'Unrebuildable' para vehículos demasiado dañados para retitularse para uso vial.", descriptionHookEs: "Detecta marcas Unrebuildable, salvage e inundación en Georgia." },
  { slug: "hawaii", nameEs: "Hawái", dmvNameEs: "Departamento de Servicios al Cliente de Hawái", lemonLawNotesEs: "La Lemon Law de Hawái cubre vehículos nuevos por 24 meses, 24,000 millas o término de garantía.", specialFactEs: "La corrosión por aire salino de Hawái es una razón clave para que las revisiones VIN incluyan los lugares previos de registración.", descriptionHookEs: "Detecta corrosión por aire salino y reconstruido en Hawái." },
  { slug: "idaho", nameEs: "Idaho", dmvNameEs: "Departamento de Transporte de Idaho", lemonLawNotesEs: "La Lemon Law de Idaho aplica por 24 meses o 24,000 millas para vehículos nuevos.", specialFactEs: "Idaho exige inspección VIN por una agencia autorizada para cualquier vehículo de fuera del estado que se vaya a titular.", descriptionHookEs: "Detecta salvage, rebuilt, junk e inundación en Idaho en segundos." },
  { slug: "illinois", nameEs: "Illinois", dmvNameEs: "Servicios Vehiculares de la Secretaría de Estado de Illinois", lemonLawNotesEs: "La New Vehicle Buyer Protection Act de Illinois cubre vehículos por 12 meses o 12,000 millas.", specialFactEs: "La ley de Illinois tipifica como felonía alterar un VIN, y la Secretaría de Estado investiga activamente la manipulación de VIN.", descriptionHookEs: "Detecta manipulación de VIN, salvage y reconstruido en Illinois." },
  { slug: "indiana", nameEs: "Indiana", dmvNameEs: "Oficina de Vehículos Motorizados de Indiana", lemonLawNotesEs: "La Lemon Law de Indiana cubre vehículos nuevos por 18 meses o 18,000 millas.", specialFactEs: "Indiana usa una marca 'Disclosed Damage' para señalar vehículos con daño significativo previo que puede no alcanzar el umbral de salvage.", descriptionHookEs: "Detecta marcas Disclosed Damage, salvage y reconstruido en Indiana." },
  { slug: "iowa", nameEs: "Iowa", dmvNameEs: "Departamento de Transporte de Iowa", lemonLawNotesEs: "La Lemon Law de Iowa aplica a vehículos nuevos por dos años o 24,000 millas.", specialFactEs: "La ley de Iowa exige que los vehículos dañados por inundación lleven marca permanente en el título para proteger a futuros compradores.", descriptionHookEs: "Detecta marcas por inundación, salvage y prior salvage en Iowa." },
  { slug: "kansas", nameEs: "Kansas", dmvNameEs: "División de Vehículos del Departamento de Ingresos de Kansas", lemonLawNotesEs: "La Lemon Law de Kansas aplica por un año desde la entrega para vehículos nuevos.", specialFactEs: "Kansas usa una marca 'Non-Highway' para vehículos que no pueden operarse legalmente en vías públicas.", descriptionHookEs: "Detecta marcas Non-Highway, salvage y reconstruido en Kansas." },
  { slug: "kentucky", nameEs: "Kentucky", dmvNameEs: "Gabinete de Transporte de Kentucky", lemonLawNotesEs: "La Lemon Law de Kentucky cubre vehículos motorizados nuevos por 12 meses o 12,000 millas.", specialFactEs: "Kentucky exige una inspección VIN por la Policía Estatal para muchas solicitudes de título salvage y reconstruido.", descriptionHookEs: "Detecta marcas Junked, salvage y reconstruido en Kentucky." },
  { slug: "louisiana", nameEs: "Luisiana", dmvNameEs: "Oficina de Vehículos Motorizados de Luisiana", lemonLawNotesEs: "La Lemon Law de Luisiana cubre vehículos nuevos por un año desde la entrega.", specialFactEs: "Luisiana marca títulos de vehículos dañados por huracanes e inundaciones, una revisión crítica dada la exposición del estado a tormentas.", descriptionHookEs: "Detecta autos dañados por huracanes e inundaciones en Luisiana." },
  { slug: "maine", nameEs: "Maine", dmvNameEs: "Oficina de Vehículos Motorizados de Maine", lemonLawNotesEs: "La Lemon Law de Maine cubre vehículos nuevos por tres años o 18,000 millas.", specialFactEs: "Maine titula los vehículos anteriores a 1995 solo con registración, haciendo que el historial VIN sea especialmente importante para camionetas antiguas.", descriptionHookEs: "Detecta salvage, rebuilt y daño por óxido en Maine fácilmente." },
  { slug: "maryland", nameEs: "Maryland", dmvNameEs: "Administración de Vehículos Motorizados de Maryland", lemonLawNotesEs: "La Lemon Law de Maryland aplica a vehículos nuevos por 24 meses o 18,000 millas.", specialFactEs: "Maryland exige una inspección estatal de seguridad para cada transferencia de título de vehículo usado, incluyendo verificación del VIN.", descriptionHookEs: "Detecta salvage, rebuilt y daño por inundación en Maryland." },
  { slug: "massachusetts", nameEs: "Massachusetts", dmvNameEs: "Registro de Vehículos Motorizados de Massachusetts", lemonLawNotesEs: "Massachusetts tiene Lemon Law para autos nuevos y para autos usados, brindando algunas de las protecciones más fuertes de EE. UU.", specialFactEs: "Massachusetts es uno de los pocos estados con una Lemon Law para autos usados que aplica a vehículos vendidos por concesionarios con menos de 125,000 millas.", descriptionHookEs: "Detecta salvage, reconstruido y autos lemon en Massachusetts al instante." },
  { slug: "michigan", nameEs: "Michigan", dmvNameEs: "Secretaría de Estado de Michigan", lemonLawNotesEs: "La Lemon Law de Michigan cubre vehículos nuevos durante el primer año o el período de garantía.", specialFactEs: "Como hogar de las Tres Grandes automotrices, los registros VIN de Michigan son extensos y están ligados estrechamente a los datos de retiros del fabricante.", descriptionHookEs: "Detecta daño del cinturón de óxido, salvage y rebuilt en Michigan." },
  { slug: "minnesota", nameEs: "Minnesota", dmvNameEs: "Servicios de Conductores y Vehículos de Minnesota", lemonLawNotesEs: "La Lemon Law de Minnesota cubre vehículos nuevos por dos años o el período de garantía.", specialFactEs: "Los inviernos duros y la sal en carreteras de Minnesota hacen que el historial de óxido y bajo carrocería sea particularmente importante al revisar un VIN.", descriptionHookEs: "Detecta salvage, prior salvage y daño por óxido en Minnesota." },
  { slug: "mississippi", nameEs: "Misisipi", dmvNameEs: "Departamento de Ingresos de Misisipi", lemonLawNotesEs: "La Lemon Law de Misisipi aplica a vehículos nuevos por 12 meses o 12,000 millas.", specialFactEs: "Misisipi ha sido históricamente destino de vehículos con daño por inundación de huracanes del Golfo, haciendo esenciales las revisiones VIN.", descriptionHookEs: "Detecta autos inundados por huracanes y salvage en Misisipi." },
  { slug: "missouri", nameEs: "Misuri", dmvNameEs: "Departamento de Ingresos de Misuri", lemonLawNotesEs: "La Lemon Law de Misuri cubre vehículos nuevos por un año o el período de garantía.", specialFactEs: "Misuri exige una inspección por la Patrulla Estatal de Carreteras para vehículos con prior salvage antes de poder retitularse.", descriptionHookEs: "Detecta marcas Junking Certificate, prior salvage e inundación en Misuri." },
  { slug: "montana", nameEs: "Montana", dmvNameEs: "División de Vehículos Motorizados de Montana", lemonLawNotesEs: "La Lemon Law de Montana cubre vehículos nuevos por dos años o el período de garantía.", specialFactEs: "La ausencia de impuesto sobre ventas de vehículos en Montana lo ha hecho popular para registraciones LLC, así que el historial VIN puede mostrar uso fuera del estado.", descriptionHookEs: "Detecta registraciones LLC ocultas, salvage y rebuilt en Montana." },
  { slug: "nebraska", nameEs: "Nebraska", dmvNameEs: "Departamento de Vehículos Motorizados de Nebraska", lemonLawNotesEs: "La Lemon Law de Nebraska aplica a vehículos nuevos por un año o el período de garantía.", specialFactEs: "Nebraska marca títulos de vehículos ensamblados con partes usadas, ayudando a los compradores a identificar autos reconstruidos.", descriptionHookEs: "Detecta marcas Previous Salvage, junk y reconstruido en Nebraska." },
  { slug: "nevada", nameEs: "Nevada", dmvNameEs: "DMV de Nevada", lemonLawNotesEs: "La Lemon Law de Nevada cubre vehículos nuevos por un año o el período de garantía.", specialFactEs: "Nevada exige una inspección VIN por personal del DMV para cualquier vehículo de fuera del estado antes de poder registrarse.", descriptionHookEs: "Detecta marcas Non-Repairable y lemon-buyback en Nevada." },
  { slug: "new-hampshire", nameEs: "Nuevo Hampshire", dmvNameEs: "División de Vehículos Motorizados de Nuevo Hampshire", lemonLawNotesEs: "La Lemon Law de Nuevo Hampshire aplica a vehículos nuevos durante el término de garantía.", specialFactEs: "Nuevo Hampshire solo titula vehículos del año modelo 2000 o más nuevos, haciendo vital el reporte VIN para autos más antiguos.", descriptionHookEs: "Detecta salvage, rebuilt y daño por óxido en Nuevo Hampshire." },
  { slug: "new-jersey", nameEs: "Nueva Jersey", dmvNameEs: "Comisión de Vehículos Motorizados de Nueva Jersey", lemonLawNotesEs: "La Lemon Law de Nueva Jersey cubre vehículos nuevos por 24 meses o 24,000 millas.", specialFactEs: "La Lemon Law de Autos Usados de Nueva Jersey también cubre vehículos usados vendidos por concesionarios, una protección poco común a nivel nacional.", descriptionHookEs: "Detecta autos inundados, salvage y lemon-buyback en Nueva Jersey." },
  { slug: "new-mexico", nameEs: "Nuevo México", dmvNameEs: "División de Vehículos Motorizados de Nuevo México", lemonLawNotesEs: "La Lemon Law de Nuevo México cubre vehículos nuevos por un año o el período de garantía.", specialFactEs: "Nuevo México exige inspección VIN en un puerto de entrada para vehículos importados desde México.", descriptionHookEs: "Detecta salvage, rebuilt y vehículos importados en Nuevo México." },
  { slug: "new-york", nameEs: "Nueva York", dmvNameEs: "DMV del Estado de Nueva York", lemonLawNotesEs: "Nueva York tiene Lemon Law para autos nuevos y usados que brinda protección integral al consumidor.", specialFactEs: "Nueva York exige una inspección anti-robo del DMV antes de poder titular y registrar cualquier vehículo Rebuilt Salvage.", descriptionHookEs: "Detecta marcas por inundación, salvage y reversión del odómetro en Nueva York." },
  { slug: "north-carolina", nameEs: "Carolina del Norte", dmvNameEs: "División de Vehículos Motorizados de Carolina del Norte", lemonLawNotesEs: "La Lemon Law de Carolina del Norte cubre vehículos nuevos por 24 meses, 24,000 millas o el término de garantía.", specialFactEs: "Carolina del Norte exige que todo vehículo dañado en 75% o más del valor justo de mercado reciba título salvage.", descriptionHookEs: "Detecta autos inundados, salvage y reconstruido en Carolina del Norte." },
  { slug: "north-dakota", nameEs: "Dakota del Norte", dmvNameEs: "Departamento de Transporte de Dakota del Norte", lemonLawNotesEs: "La Lemon Law de Dakota del Norte aplica a vehículos nuevos por un año o el período de garantía.", specialFactEs: "La actividad petrolera de Dakota del Norte hace que el historial VIN de camionetas sea especialmente importante para verificar uso comercial pesado.", descriptionHookEs: "Detecta camionetas de campo petrolero, salvage y rebuilt en Dakota del Norte." },
  { slug: "ohio", nameEs: "Ohio", dmvNameEs: "Oficina de Vehículos Motorizados de Ohio", lemonLawNotesEs: "La Lemon Law de Ohio cubre vehículos nuevos por un año o 18,000 millas.", specialFactEs: "Ohio usa un programa de Inspección de Salvage donde los vehículos reconstruidos deben pasar inspección de la Patrulla Estatal de Carreteras.", descriptionHookEs: "Detecta salvage, rebuilt salvage y daño del cinturón de óxido en Ohio." },
  { slug: "oklahoma", nameEs: "Oklahoma", dmvNameEs: "Service Oklahoma", lemonLawNotesEs: "La Lemon Law de Oklahoma cubre vehículos nuevos por un año o el período de garantía.", specialFactEs: "El clima severo frecuente de Oklahoma, incluidos tornados y granizo, hace que el historial de marcas de título sea un punto vital de la revisión VIN.", descriptionHookEs: "Detecta robos no recuperados, salvage y daño por granizo en Oklahoma." },
  { slug: "oregon", nameEs: "Oregón", dmvNameEs: "Servicios de Conductor y Vehículos Motorizados de Oregón", lemonLawNotesEs: "La Lemon Law de Oregón cubre vehículos nuevos por 24 meses o 24,000 millas.", specialFactEs: "Oregón marca títulos como 'Totaled' para cualquier pérdida total declarada por aseguradora, brindando visibilidad clara del daño previo.", descriptionHookEs: "Detecta marcas Totaled, salvage y reconstruido en Oregón." },
  { slug: "pennsylvania", nameEs: "Pensilvania", dmvNameEs: "PennDOT", lemonLawNotesEs: "La Lemon Law de Pensilvania cubre vehículos nuevos por un año, 12,000 millas o el término de garantía.", specialFactEs: "Pensilvania exige una inspección reforzada por un agente autorizado para cualquier vehículo reconstruido antes de retitularse.", descriptionHookEs: "Detecta marcas Reconstructed, salvage e inundación en Pensilvania." },
  { slug: "rhode-island", nameEs: "Rhode Island", dmvNameEs: "División de Vehículos Motorizados de Rhode Island", lemonLawNotesEs: "La Lemon Law de Rhode Island aplica a vehículos nuevos por un año o 15,000 millas.", specialFactEs: "Rhode Island también opera una Lemon Law de Autos Usados que cubre vehículos vendidos por concesionarios, ampliando las protecciones del comprador.", descriptionHookEs: "Detecta salvage, reconstruido e inundación en Rhode Island." },
  { slug: "south-carolina", nameEs: "Carolina del Sur", dmvNameEs: "DMV de Carolina del Sur", lemonLawNotesEs: "La Lemon Law de Carolina del Sur cubre vehículos nuevos por un año o 12,000 millas.", specialFactEs: "Carolina del Sur exige verificación VIN por un oficial de la ley para muchas solicitudes de título de vehículos de fuera del estado.", descriptionHookEs: "Detecta autos dañados por huracán, salvage y lemon-buyback en Carolina del Sur." },
  { slug: "south-dakota", nameEs: "Dakota del Sur", dmvNameEs: "División de Vehículos Motorizados de Dakota del Sur", lemonLawNotesEs: "La Lemon Law de Dakota del Sur aplica a vehículos nuevos por un año desde la compra.", specialFactEs: "Dakota del Sur solo titula vehículos del año modelo 1976 o más nuevos, así que los autos antiguos dependen del reporte VIN.", descriptionHookEs: "Detecta salvage, rebuilt y prior salvage en Dakota del Sur." },
  { slug: "tennessee", nameEs: "Tennessee", dmvNameEs: "Servicios de Vehículos del Departamento de Ingresos de Tennessee", lemonLawNotesEs: "La Lemon Law de Tennessee cubre vehículos nuevos por un año o el período de garantía.", specialFactEs: "Tennessee alberga grandes plantas de Nissan, Volkswagen y GM, haciéndolo un punto caliente para datos VIN de fábrica.", descriptionHookEs: "Detecta salvage, rebuilt e inundación en Tennessee al instante." },
  { slug: "texas", nameEs: "Texas", dmvNameEs: "TxDMV", lemonLawNotesEs: "La Lemon Law de Texas cubre vehículos nuevos por 24 meses o 24,000 millas, administrada por el TxDMV.", specialFactEs: "Texas emite una marca de título 'Flood Damage' separada para vehículos inundados por tormentas o huracanes, incluidos los afectados por Hurricane Harvey.", descriptionHookEs: "Detecta lavado de título, salvage rebobinado y daño por granizo o inundación en Texas." },
  { slug: "utah", nameEs: "Utah", dmvNameEs: "División de Vehículos Motorizados de Utah", lemonLawNotesEs: "La Lemon Law de Utah cubre vehículos nuevos por un año o el período de garantía.", specialFactEs: "Utah exige una inspección de la Comisión Estatal de Impuestos para todos los vehículos rebuilt salvage antes de poder retitularse.", descriptionHookEs: "Detecta salvage, rebuilt y reacondicionado en Utah al instante." },
  { slug: "vermont", nameEs: "Vermont", dmvNameEs: "DMV de Vermont", lemonLawNotesEs: "La Lemon Law de Vermont cubre vehículos nuevos durante el período de garantía del fabricante.", specialFactEs: "Vermont solo titula vehículos de 15 años o menos; los autos más antiguos usan solo registración, haciendo crítico el historial VIN.", descriptionHookEs: "Detecta salvage, rebuilt y daño del cinturón de óxido en Vermont." },
  { slug: "virginia", nameEs: "Virginia", dmvNameEs: "DMV de Virginia", lemonLawNotesEs: "El Motor Vehicle Warranty Enforcement Act de Virginia aplica a vehículos nuevos por 18 meses.", specialFactEs: "Virginia exige una inspección de seguridad por la policía estatal para cualquier vehículo rebuilt salvage antes de retitularse.", descriptionHookEs: "Detecta salvage, rebuilt e historial de accidentes en Virginia." },
  { slug: "washington", nameEs: "Washington", dmvNameEs: "Departamento de Licencias de Washington", lemonLawNotesEs: "La Lemon Law de Washington cubre vehículos nuevos por 24 meses o 24,000 millas.", specialFactEs: "Washington marca un vehículo como 'Destroyed' cuando no puede volver a condición de uso vial, brindando fuertes advertencias al comprador.", descriptionHookEs: "Detecta marcas Destroyed, salvage y rebuilt en Washington al instante." },
  { slug: "west-virginia", nameEs: "Virginia Occidental", dmvNameEs: "División de Vehículos Motorizados de Virginia Occidental", lemonLawNotesEs: "La Lemon Law de Virginia Occidental cubre vehículos nuevos por un año o el período de garantía.", specialFactEs: "El terreno montañoso y las carreteras tratadas con sal de Virginia Occidental hacen que el historial VIN del bajo carrocería sea particularmente relevante.", descriptionHookEs: "Detecta salvage, reconstruido y daño del cinturón de óxido en Virginia Occidental." },
  { slug: "wisconsin", nameEs: "Wisconsin", dmvNameEs: "División de Vehículos Motorizados de Wisconsin", lemonLawNotesEs: "La Lemon Law de Wisconsin es una de las más fuertes del país, cubriendo vehículos nuevos por un año o el período de garantía.", specialFactEs: "La ley lemon de Wisconsin permite doble indemnización más honorarios de abogado, haciéndola modelo de protección al consumidor.", descriptionHookEs: "Detecta salvage, rebuilt y daño del cinturón de óxido en Wisconsin." },
  { slug: "wyoming", nameEs: "Wyoming", dmvNameEs: "Departamento de Transporte de Wyoming", lemonLawNotesEs: "La Lemon Law de Wyoming aplica a vehículos nuevos por un año o el período de garantía.", specialFactEs: "La alta tasa de vehículos registrados per cápita en Wyoming refleja vida rural y uso pesado de camionetas, haciendo importante el historial de uso por VIN.", descriptionHookEs: "Detecta salvage, rebuilt y autos con pérdida total en Wyoming." },
];

const bySlug = new Map(statesEs.map((s) => [s.slug, s]));

export function getStateEsBySlug(slug: string): StateInfoEs | undefined {
  return bySlug.get(slug);
}

/**
 * Spanish translations of the title-brand descriptions used across all
 * state pages. Mirrors `BRAND_DESCRIPTIONS` in `states.ts`. Falls back
 * to a generic line when a brand isn't in the map (same behaviour as
 * the English helper).
 */
export const BRAND_DESCRIPTIONS_ES: Record<string, string> = {
  "Salvage":
    "Se emite cuando una aseguradora declara el vehículo pérdida total — usualmente cuando los costos de reparación alcanzan aproximadamente el 65–100% de su valor, dependiendo del estado. Un vehículo salvage no puede manejarse legalmente hasta que sea reparado, inspeccionado y retitulado.",
  "Rebuilt":
    "Un vehículo salvage que ha sido reparado y pasó una inspección estatal para regresar legalmente a la vía. El daño previo por pérdida total reduce permanentemente su valor y puede complicar el seguro y la reventa.",
  "Rebuilt Salvage":
    "Un vehículo salvage que ha sido reparado y pasó inspección para volver a la vía. El historial de pérdida total permanece en su registro permanentemente y afecta valor y asegurabilidad.",
  "Restored Salvage":
    "Un vehículo salvage previo que ha sido reparado y reinspeccionado para uso vial. La restauración no borra el evento original de pérdida total del historial del vehículo.",
  "Reconstructed":
    "Un vehículo reconstruido desde una base salvage o con daño significativo y reinspeccionado para uso vial. Los reconstruidos suelen combinar partes de varios autos, así que una revisión de historial completa es esencial.",
  "Revived Salvage":
    "El término de California para un vehículo salvage que ha sido reparado y reregistrado para uso vial tras inspección. El historial de salvage queda permanentemente ligado al VIN.",
  "Flood":
    "Marca un vehículo dañado por sumersión en agua. Los autos inundados frecuentemente desarrollan fallas eléctricas ocultas, corrosión y moho meses o años después — a menudo después de que la limpieza cosmética oculta la evidencia.",
  "Flood Damage":
    "Una marca de título para vehículos dañados por inundación o agua de tormenta. Estos autos llevan riesgo de corrosión y eléctrico a largo plazo y comúnmente se envían entre estados para reventa.",
  "Hurricane":
    "Marca vehículos dañados por tormentas tropicales o huracanes nombrados. Como otros autos con daño por inundación, llevan corrosión y riesgo eléctrico ocultos y frecuentemente se transportan a otros estados para revenderse.",
  "Hail Damage":
    "Marca daño de carrocería y vidrios relacionado con tormentas. Aunque a menudo es cosmético, el granizo severo puede ocultar problemas estructurales o mecánicos subyacentes, así que vale la pena una inspección completa y revisión de historial.",
  "Junk":
    "Marca un vehículo considerado no apto para uso vial y destinado solo a partes o chatarra. Un vehículo con marca junk nunca debería retitularse para manejarse.",
  "Junked":
    "Indica un vehículo dado de baja como chatarra o solo para partes. No puede regresar legalmente a la vía y los compradores que buscan un auto manejable deben evitarlo.",
  "Junking Certificate":
    "Un certificado que muestra que el vehículo ha sido retirado como junk o chatarra. Permanentemente impide que el vehículo sea retitulado para uso vial.",
  "Scrap":
    "Designa un vehículo destinado a desmantelamiento o reciclaje. Una marca scrap significa que el auto no puede regresar legalmente a la vía.",
  "Certificate of Destruction":
    "La designación no-reparable más fuerte: el vehículo debe ser desmantelado o aplastado y nunca puede retitularse para uso vial. Una clara señal de advertencia en cualquier reporte de historial.",
  "Non-Repairable":
    "Significa que el vehículo está demasiado dañado para regresar legalmente a la vía. Solo puede venderse para partes o chatarra — nunca retitulado para manejarse.",
  "Non-Rebuildable":
    "Indica un vehículo que no puede repararse y retitularse legalmente para uso vial. Está restringido únicamente a valor de partes o chatarra.",
  "Unrebuildable":
    "La designación de Georgia para un vehículo demasiado dañado para retitularse en la vía. Estos vehículos se limitan a partes o chatarra.",
  "Destroyed":
    "Significa que el vehículo no puede volver a condición de uso vial. Una marca destroyed es una advertencia fuerte de que el auto solo sirve para partes.",
  "Total Loss":
    "Indica que una aseguradora declaró el vehículo pérdida total. Dependiendo del estado, aún puede ser reconstruible, pero la pérdida previa afecta permanentemente valor y asegurabilidad.",
  "Totaled":
    "La marca de Oregón para cualquier pérdida total declarada por aseguradora, dando a los compradores visibilidad clara del daño mayor previo aunque el auto haya sido reparado después.",
  "Prior Salvage":
    "Indica que el vehículo tuvo alguna vez título salvage, aunque desde entonces haya sido reconstruido. Esta marca permanente advierte a los compradores de un evento previo de pérdida total.",
  "Previous Salvage":
    "Indica que el vehículo tuvo previamente título salvage. Incluso tras reparación, este historial permanece en el registro y afecta el valor de reventa.",
  "Lemon Law Buyback":
    "Significa que el fabricante recompró el vehículo por un defecto crónico que no pudo arreglar bajo garantía. El mismo problema subyacente puede persistir para el siguiente dueño.",
  "Distressed":
    "Marca daño significativo no por colisión que puede caer bajo el umbral salvage pero aún afecta valor y seguridad del vehículo. Investiga siempre la causa subyacente.",
  "Disclosed Damage":
    "Indica daño significativo previo que el dueño reportó voluntariamente, aun si no alcanzó el umbral salvage. Una señal útil de transparencia que vale la pena investigar.",
  "Salvage Parts Only":
    "Significa que el vehículo solo puede usarse como fuente de componentes y no puede titularse para uso vial bajo ninguna circunstancia.",
  "Parts Only":
    "Restringe el vehículo a uso como donante de partes. No puede registrarse o manejarse legalmente en vías públicas.",
  "Owner Retained":
    "Aplica cuando un dueño se queda con un vehículo que la aseguradora declaró pérdida total. Señala daño significativo previo que el dueño optó por no entregar.",
  "Non-Highway":
    "Significa que el vehículo no es legal para uso en vía pública y está restringido a operación fuera de carretera o privada.",
};

export function getBrandDescriptionEs(brand: string, stateNameEs: string): string {
  return (
    BRAND_DESCRIPTIONS_ES[brand] ||
    `Una marca de título usada por ${stateNameEs} u otro estado para se\u00f1alar vehículos con da\u00f1o, pérdida o problemas de condición significativos. Verifica siempre los detalles con una revisión completa del historial VIN antes de comprar.`
  );
}
