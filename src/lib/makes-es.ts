/**
 * Spanish translations of the five long-form text fields on each make
 * record in `lib/makes.ts`. We keep the structural data (slug, name,
 * country, vinPrefix, founded, popular[]) shared with the English file —
 * those are facts that don't change by language. Only the descriptive
 * prose is translated.
 *
 * Used by `src/app/es/vin-check/[make]/page.tsx` via `getMakeEsBySlug()`,
 * falling back to the English string when a translation is missing so
 * the page never renders empty.
 *
 * Translation register matches the rest of the site: pan-Hispanic
 * neutral Spanish, "tú" form, US-specific acronyms (NHTSA, NMVTIS, NICB,
 * VIN, EPA) preserved untranslated since they're proper-noun agency
 * names searchers recognise.
 */

export interface MakeInfoEs {
  slug: string;
  descriptionEs: string;
  vinNoteEs: string;
  commonIssuesEs: string;
  recallContextEs: string;
  buyingTipEs: string;
  /** Translated country name (e.g., "Japón", "Alemania", "EE. UU."). */
  countryEs: string;
}

export const makesEs: MakeInfoEs[] = [
  {
    slug: "toyota",
    countryEs: "Japón",
    descriptionEs: "el mayor fabricante de autos del mundo por volumen de ventas",
    vinNoteEs:
      'Los Toyota fabricados en Japón comienzan con "JT", pero muchos de los modelos más vendidos se ensamblan en Norteamérica — los Camry y Tundra hechos en EE. UU. comienzan con "4T" o "5T", y los RAV4 hechos en Canadá con "2T". El décimo carácter codifica el año del modelo.',
    commonIssuesEs:
      "Algunos modelos 2007–2011 de cuatro cilindros con el motor 2AZ-FE son conocidos por consumo excesivo de aceite, y los chasís tempranos de Tacoma/Tundra en estados del cinturón de sal tuvieron problemas de perforación por óxido. Un historial VIN puede mostrar accidentes, inundación o reparaciones de chasís antes de comprar.",
    recallContextEs:
      "Millones de Toyotas estuvieron cubiertos por el retiro de infladores de bolsa de aire Takata (años 2002–2015) y las campañas 2009–2011 de aceleración no intencionada por tapete/pedal. Siempre confirma los retiros abiertos por VIN.",
    buyingTipEs:
      "El fuerte valor de reventa de Toyota los convierte en blanco frecuente de lavado de título y reversión del odómetro. Verifica el rastro de kilometraje y el historial de marcas de título en cualquier Camry, Corolla o Tacoma antes de pagar un premium.",
  },
  {
    slug: "ford",
    countryEs: "EE. UU.",
    descriptionEs: "el icónico fabricante estadounidense e inventor de la línea de ensamblaje",
    vinNoteEs:
      'Los WMI de Ford comienzan con "1F" (pasajeros EE. UU.), "1FT/1FD" (camionetas EE. UU.), "2F" (Canadá) o "3F" (México). En la F-150 el VIN también codifica el estilo de cabina y el largo de la caja, así puedes confirmar que un anuncio corresponde a la camioneta real.',
    commonIssuesEs:
      "Los modelos Fiesta y Focus 2011–2016 con la transmisión automática PowerShift de doble embrague fueron objeto de una demanda colectiva por vibración y falla prematura. Algunos motores 1.6L EcoBoost tuvieron problemas de intrusión de refrigerante. El historial ayuda a confirmar reemplazos de transmisión o motor.",
    recallContextEs:
      "Los vehículos Ford fueron muy afectados por el retiro de bolsa de aire Takata, y los Explorer 2011–2017 vieron campañas por olor a escape. Las pickups F-Series están entre los vehículos más robados de EE. UU., así que el clonado es un vector real de fraude.",
    buyingTipEs:
      "Como la F-150 es el vehículo más robado y más clonado de EE. UU., coteja el VIN del tablero con el del marco de la puerta y el título — una discrepancia es señal de alerta de una camioneta clonada o robada.",
  },
  {
    slug: "chevrolet",
    countryEs: "EE. UU.",
    descriptionEs: "una de las marcas de vehículos más populares de EE. UU. bajo General Motors",
    vinNoteEs:
      'Chevrolet comparte los WMI de GM "1G" / "1GC" (camionetas EE. UU.) / "2G" (Canadá) / "3G" (México). El VIN identifica la familia del motor — útil para confirmar si una Silverado tiene el V8 5.3L o 6.2L.',
    commonIssuesEs:
      "Algunos modelos Equinox 2010–2017 con el motor 2.4L eran conocidos por alto consumo de aceite, y los motores Silverado/Tahoe 5.3L 2014–2018 tuvieron problemas con los seguidores AFM. Un reporte de historial puede revelar reparaciones o reemplazos del motor.",
    recallContextEs:
      "El retiro del interruptor de ignición de GM en 2014 cubrió millones de modelos compactos (Cobalt, HHR, Ion) por un defecto vinculado a apagones y no despliegue de bolsas de aire. Las campañas de bolsa de aire Takata también aplican a muchos años de modelo.",
    buyingTipEs:
      "En pickups Silverado y Tahoe de alto kilometraje, usa el reporte de historial para revisar uso comercial o de flota previo y desgaste por remolque, lo que afecta seriamente la durabilidad del tren motriz.",
  },
  {
    slug: "honda",
    countryEs: "Japón",
    descriptionEs: "reconocido por su confiabilidad y eficiencia de combustible",
    vinNoteEs:
      'Los Accord y Odyssey fabricados en EE. UU. comienzan con "1HG" o "5FN", mientras que los modelos hechos en Japón usan "JHM". Los caracteres 4 al 8 del VIN decodifican trim, motor y carrocería, así puedes confirmar que un EX-L realmente es un EX-L.',
    commonIssuesEs:
      "Los V6 automáticos 2003–2007 de Accord/Odyssey/Pilot tendían a fallar (entonces aplicó garantía extendida), y algunos motores 1.5L turbo de CR-V/Civic tuvieron quejas de dilución del combustible en climas fríos. El historial muestra reemplazos de transmisión.",
    recallContextEs:
      "Honda fue el fabricante más golpeado por la crisis de la bolsa de aire Takata — ciertos Civic y Accord más antiguos llevan infladores 'Alpha' clasificados como extremadamente peligrosos. Confirmar el cierre del retiro de bolsa de aire por VIN es esencial.",
    buyingTipEs:
      "Los Civic y CR-V están entre los vehículos más robados de EE. UU. Verifica que el título no sea salvage o reconstruido, y que la placa del VIN no muestre señales de manipulación, antes de comprar.",
  },
  {
    slug: "nissan",
    countryEs: "Japón",
    descriptionEs: "uno de los principales fabricantes japoneses, conocido por su innovación",
    vinNoteEs:
      'Los Nissan fabricados en EE. UU. (Altima, Rogue, Frontier) comienzan con "1N4" / "1N6", mientras que los modelos hechos en Japón usan "JN". El VIN codifica el motor y si el auto tiene CVT o una automática convencional.',
    commonIssuesEs:
      "Muchos modelos Altima, Sentra, Rogue y Pathfinder desde 2013 usan la CVT Xtronic de Nissan, que ha sido objeto de varias demandas por sobrecalentamiento y falla prematura. Un reporte de historial puede revelar reemplazos previos de la CVT.",
    recallContextEs:
      "Los modelos Nissan fueron incluidos en el retiro de bolsa de aire Takata, y varios años tuvieron campañas separadas por problemas de pestillo del cofre y frenos. Verifica el estado de los retiros por VIN.",
    buyingTipEs:
      "En cualquier Nissan equipado con CVT, prioriza un historial VIN que muestre servicio documentado de la transmisión — y presupuesta que un reemplazo de CVT puede acercarse al valor de un auto más antiguo.",
  },
  {
    slug: "hyundai",
    countryEs: "Corea del Sur",
    descriptionEs: "el mayor fabricante de Corea del Sur con vehículos premiados",
    vinNoteEs:
      'Los Hyundai fabricados en EE. UU. (Sonata, Santa Fe, algunos Elantra) comienzan con "5NP" / "5NM", mientras que los modelos coreanos usan "KM". El VIN confirma la familia del motor — importante dado el historial Theta II abajo.',
    commonIssuesEs:
      "Ciertos modelos Sonata y Santa Fe 2011–2019 con el motor Theta II de 2.0L/2.4L fueron retirados por falla de cojinete que podía causar apagado o incendios. Un reporte de historial y verificación del retiro por VIN son críticos aquí.",
    recallContextEs:
      "Más allá de los retiros del motor Theta II, muchos Hyundai 2011–2022 fabricados sin inmovilizador de motor se volvieron blanco de robo en la tendencia viral 'Kia Boys', activando una actualización gratuita de software antirrobo.",
    buyingTipEs:
      "Confirma que tanto el retiro del motor Theta II COMO la actualización antirrobo estén completados por VIN — y revisa si el auto califica para la cobertura extendida del tren motriz de Hyundai.",
  },
  {
    slug: "kia",
    countryEs: "Corea del Sur",
    descriptionEs: "una marca coreana de rápido crecimiento, conocida por su valor y diseño",
    vinNoteEs:
      'Los Kia fabricados en EE. UU. (algunos Sportage, Telluride, Sorento) comienzan con "5XY", mientras los modelos coreanos usan "KN". El décimo carácter da el año del modelo — útil para separar años afectados y no afectados del motor.',
    commonIssuesEs:
      "Como Hyundai, ciertos modelos Kia con el motor Theta II 2.0L/2.4L (p. ej., 2011–2019 Optima, Sorento, Sportage) fueron retirados por falla de cojinete y riesgo de incendio. Verifica el cierre del retiro del motor por VIN.",
    recallContextEs:
      "Muchos Kia 2011–2021 fabricados sin inmovilizador de motor fueron blanco en la tendencia 'Kia Boys'; Kia emitió una actualización gratuita de software antirrobo y un remedio de bloqueo del volante.",
    buyingTipEs:
      "Revisa que tanto el retiro del motor como la actualización antirrobo estén cerrados por VIN, y confirma si el dueño anterior instaló el remedio de bloqueo de volante/rueda en modelos propensos a robo.",
  },
  {
    slug: "bmw",
    countryEs: "Alemania",
    descriptionEs: "la Máquina de Conducir Definitiva y líder de desempeño de lujo",
    vinNoteEs:
      'Los BMW fabricados en Alemania comienzan con "WBA" (pasajeros) o "WBS" (modelos M); los X3/X5/X7 construidos en EE. UU. desde Spartanburg empiezan con "5UX". El VIN decodifica el código del motor, lo que importa para los problemas conocidos abajo.',
    commonIssuesEs:
      "Algunos motores cuatro cilindros N20/N26 (2012–2016) tuvieron desgaste en la cadena de distribución, y los V8 N63 eran conocidos por alto consumo de aceite. Los componentes del sistema de refrigeración y VANOS son reparaciones comunes a alto kilometraje. El historial de servicio es invaluable.",
    recallContextEs:
      "BMW fue parte del retiro de bolsa de aire Takata y emitió varias campañas por riesgo de incendio relacionado con el motor del soplador y EGR en ciertos diésel. Confirma el estado del retiro por VIN.",
    buyingTipEs:
      "El costo de propiedad de BMW vive o muere por el historial de servicio. Usa el reporte VIN para confirmar mantenimiento regular y busca el trabajo de cadena de distribución y sistema de refrigeración que los modelos antiguos típicamente necesitan.",
  },
  {
    slug: "mercedes-benz",
    countryEs: "Alemania",
    descriptionEs: "el inventor del automóvil y líder global del lujo",
    vinNoteEs:
      'Los modelos fabricados en Alemania comienzan con "WDD" / "WDC", mientras los GLE/GLS construidos en EE. UU. desde Alabama usan "4JG". El VIN identifica el motor y si el auto es tracción integral 4MATIC.',
    commonIssuesEs:
      "Algunos modelos 2003–2009 tuvieron problemas de óxido por procesos anteriores de pintura al agua, y ciertas transmisiones 7G-Tronic y sistemas de suspensión neumática (Airmatic) son reparaciones costosas a alto kilometraje. Un reporte de historial muestra el trabajo mayor.",
    recallContextEs:
      "Los Mercedes-Benz fueron incluidos en el retiro Takata y emitieron campañas separadas por software de dirección y emisiones. Verifica retiros abiertos por VIN.",
    buyingTipEs:
      "En cualquier modelo con suspensión neumática Airmatic, contempla el reemplazo eventual de amortiguadores, y usa el reporte de historial para confirmar que el auto no fue una pérdida total por inundación o accidente — común en autos de lujo depreciados.",
  },
  {
    slug: "audi",
    countryEs: "Alemania",
    descriptionEs: "una marca alemana premium conocida por su tracción integral Quattro",
    vinNoteEs:
      'Los WMI de Audi comienzan con "WAU" (Alemania) o "WA1" (SUVs); algunos modelos comparten plantas del Grupo VW. El VIN confirma el código del motor y si el auto es Quattro auténtico.',
    commonIssuesEs:
      "Los motores 2.0T 2009–2011 (EA888 Gen 2) eran notorios por consumo excesivo de aceite y falla del tensor de cadena de distribución. La acumulación de carbón en motores de inyección directa también es común. El historial de servicio es clave.",
    recallContextEs:
      "Los diésel Audi (TDI) fueron parte del escándalo de emisiones del Grupo VW, y los modelos de gasolina estuvieron incluidos en las campañas Takata. Confirma el remedio de emisiones y cualquier retiro abierto por VIN.",
    buyingTipEs:
      "Para modelos 2.0T 2009–2011, pide evidencia de que se realizó el arreglo de consumo de aceite o servicio de aros del pistón, y verifícalo en el reporte de historial antes de comprar.",
  },
  {
    slug: "volkswagen",
    countryEs: "Alemania",
    descriptionEs: "la empresa del auto del pueblo y el mayor fabricante de Europa",
    vinNoteEs:
      'Los VW alemanes comienzan con "WVW" / "WV1"; los Jetta/Tiguan construidos en México usan "3VW", y los Atlas/Passat construidos en EE. UU. usan "1VW". El VIN decodifica el motor — relevante para el historial Dieselgate abajo.',
    commonIssuesEs:
      "Algunos motores 1.8T/2.0T tuvieron problemas con tensor de cadena de distribución y acumulación de carbón, y la transmisión DSG de doble embrague requiere servicio programado de fluido. Un reporte de historial confirma que estos se mantuvieron.",
    recallContextEs:
      "Los modelos diésel TDI 2009–2015 estuvieron en el centro del escándalo de emisiones 'Dieselgate'; los autos afectados recibieron una modificación de emisiones o recompra. Siempre confirma el estado del arreglo por VIN en un TDI usado.",
    buyingTipEs:
      "Si estás mirando un diésel TDI, verifica que el retiro de emisiones esté completado y si el auto fue parte del programa de recompra — los autos no arreglados pueden tener complicaciones de registro.",
  },
  {
    slug: "subaru",
    countryEs: "Japón",
    descriptionEs: "conocido por la tracción integral simétrica y los motores bóxer",
    vinNoteEs:
      'Los Subaru fabricados en Japón comienzan con "JF1" / "JF2", mientras que los Outback, Legacy, Ascent e Impreza construidos en EE. UU. desde Indiana usan "4S". El VIN confirma el motor bóxer y si el auto tiene CVT.',
    commonIssuesEs:
      "Los modelos 2011–2014 con el motor FB25 fueron objeto de una demanda colectiva por consumo de aceite, y los motores 2.5L anteriores (EJ25) eran conocidos por falla del empaque de la culata. Un reporte de historial puede revelar reparaciones de motor o empaque de culata.",
    recallContextEs:
      "Subaru emitió retiros de bolsa de aire Takata y varias campañas por defectos en la bomba de combustible y frenos. Confirma retiros abiertos por VIN, especialmente en los Outback y Forester de alto volumen.",
    buyingTipEs:
      "En modelos 2.5L antiguos, pregunta específicamente por el historial del empaque de la culata, y en autos 2011–2014 confirma el remedio de consumo de aceite — ambos afectan materialmente el valor de un Subaru usado.",
  },
  {
    slug: "mazda",
    countryEs: "Japón",
    descriptionEs: "la marca zoom-zoom enfocada en el placer de manejar",
    vinNoteEs:
      'Los Mazda fabricados en Japón comienzan con "JM1" (pasajeros) o "JM3" (SUVs); algunos modelos del mercado estadounidense construidos en México o EE. UU. usan "3MZ" o "MM". El VIN decodifica la variante del motor SkyActiv.',
    commonIssuesEs:
      "La línea SkyActiv moderna de Mazda es generalmente confiable, pero los modelos antiguos (antes de 2014) y el RX-8 rotativo tuvieron problemas documentados de óxido y desgaste del motor. Un reporte de historial muestra accidentes o daño por inundación que afecta estos autos monocasco.",
    recallContextEs:
      "Mazda fue parte del retiro Takata (Takata era un proveedor principal de Mazda) y emitió campañas por corrosión y partes del sistema de combustible. Verifica el cierre del retiro por VIN.",
    buyingTipEs:
      "Los Mazda aguantan bien mecánicamente, así que enfoca la revisión del historial en registros de accidentes e inundación y en confirmar que el retiro de bolsa de aire Takata esté cerrado.",
  },
  {
    slug: "jeep",
    countryEs: "EE. UU.",
    descriptionEs: "la legendaria marca todoterreno y pionera de los SUV",
    vinNoteEs:
      'Los WMI de Jeep comienzan con "1C4" / "1J4" (EE. UU.) o "3C4" (México). El VIN decodifica el modelo y motor, ayudando a confirmar si un Grand Cherokee tiene V6, V8 o EcoDiesel.',
    commonIssuesEs:
      "Los Wrangler y Grand Cherokee con eje rígido pueden desarrollar el 'death wobble' delantero, y los motores 2.4L Tigershark (Cherokee/Compass) tuvieron quejas de consumo de aceite. El uso todoterreno también acelera el desgaste del tren motriz — el historial ayuda.",
    recallContextEs:
      "Ciertos Grand Cherokee/Durango 2014–2019 tuvieron retiros de palanca de cambios electrónica y por apagón, y muchos años fueron parte de la campaña Takata. Confirma retiros abiertos por VIN.",
    buyingTipEs:
      "Como los Jeep se compran para manejarse fuera del camino, usa el reporte de historial para buscar accidentes, inundación (daño por cruce de agua) y reparaciones de chasís que la inspección casual puede pasar por alto.",
  },
  {
    slug: "ram",
    countryEs: "EE. UU.",
    descriptionEs: "la marca de camionetas premium de EE. UU.",
    vinNoteEs:
      'Las pickups Ram comienzan con "1C6" (EE. UU.) o "3C6" (México). El VIN codifica configuración de cabina, largo de caja y motor — útil para confirmar si una 1500 tiene el V8 Hemi o el EcoDiesel.',
    commonIssuesEs:
      "Los modelos EcoDiesel V6 (2014–2019) tuvieron problemas en el sistema de emisiones y enfriador EGR, y las pickups pesadas 2500/3500 usadas para remolque muestran desgaste del tren motriz y suspensión. Un reporte de historial revela uso comercial o de flota.",
    recallContextEs:
      "Las pickups Ram fueron parte del retiro Takata y tuvieron campañas separadas por puntas de dirección y problemas eléctricos. Verifica el estado del retiro por VIN.",
    buyingTipEs:
      "Las camionetas son vehículos de trabajo — usa el reporte VIN para revisar registro comercial previo, historial de accidentes y abuso por remolque antes de comprar una 1500 o 2500 usada.",
  },
  {
    slug: "gmc",
    countryEs: "EE. UU.",
    descriptionEs: "la marca de camionetas y SUVs grado profesional de General Motors",
    vinNoteEs:
      'Las pickups GMC comienzan con "1GT" (EE. UU.) o "3GT" (México); Terrain y Acadia comparten WMI de pasajeros de GM. El VIN identifica el motor — útil para distinguir Sierra 5.3L y 6.2L V8.',
    commonIssuesEs:
      "GMC comparte mecánica de GM: problemas con seguidores AFM 5.3L en Sierra/Yukon 2014–2018, y consumo de aceite 2.4L en Terrain temprano. Un reporte de historial puede confirmar reparaciones del motor y uso previo de flota.",
    recallContextEs:
      "Los vehículos GMC fueron cubiertos por las amplias campañas Takata de GM y compartieron retiros de camionetas por dirección hidráulica y problemas eléctricos. Confirma retiros abiertos por VIN.",
    buyingTipEs:
      "Sierra y Yukon son vehículos populares de flota y remolque — revisa el reporte de historial buscando uso comercial y desgaste por remolque, que afectan la durabilidad de transmisión y eje trasero.",
  },
  {
    slug: "dodge",
    countryEs: "EE. UU.",
    descriptionEs: "conocido por sus muscle cars y vehículos de desempeño",
    vinNoteEs:
      'Los WMI de Dodge comienzan con "2C3" / "1C3" (EE. UU./Canadá). El VIN decodifica el motor, lo que importa mucho en Charger/Challenger — distinguiendo V6, 5.7L, 6.4L y modelos Hellcat sobrealimentados.',
    commonIssuesEs:
      "Los Charger y Challenger de alto desempeño se manejan duro con frecuencia, así que revisa accidentes e historial del tren motriz. Algunos motores 5.7L Hemi desarrollan el conocido 'tic' del balancín. Un reporte de historial muestra abuso y reparaciones.",
    recallContextEs:
      "Los vehículos Dodge fueron parte del retiro Takata y tuvieron campañas por palanca de cambios electrónica y problemas del alternador. Verifica el cierre del retiro por VIN.",
    buyingTipEs:
      "Los muscle cars son imanes de robo y abuso — cruza el VIN entre tablero, puerta y título para descartar clonado, y usa el reporte de historial para detectar accidente oculto o daño de pista.",
  },
  {
    slug: "lexus",
    countryEs: "Japón",
    descriptionEs: "la división de lujo de Toyota y marca premium mejor calificada",
    vinNoteEs:
      'La mayoría de los Lexus comienzan con "JT" (fabricados en Japón); los ES construidos en EE. UU. y algunos RX usan "58A" o "2T". El VIN confirma tren motriz híbrido vs. gasolina en modelos RX y NX.',
    commonIssuesEs:
      "Lexus comparte la fuerte confiabilidad de Toyota, pero algunos modelos 2007–2011 tuvieron el problema de la línea de aceite del V6 2GR-FE, y los híbridos de alto kilometraje pueden necesitar servicio de batería. Un reporte de historial muestra accidente o daño por inundación.",
    recallContextEs:
      "Los modelos Lexus fueron incluidos en el retiro Takata y compartieron las campañas de aceleración no intencionada de Toyota. Confirma retiros abiertos por VIN.",
    buyingTipEs:
      "La confiabilidad de Lexus impone un premium de precio que atrae lavado de título — verifica la marca del título y el historial de kilometraje, y confirma cualquier servicio de batería híbrida en modelos antiguos RX y ES.",
  },
  {
    slug: "acura",
    countryEs: "Japón",
    descriptionEs: "la división de lujo y desempeño de Honda",
    vinNoteEs:
      'Los Acura construidos en EE. UU. (MDX, TLX) comienzan con "19U" / "5J8", mientras los modelos hechos en Japón usan "JH4". El VIN decodifica motor y si el auto tiene tracción integral SH-AWD.',
    commonIssuesEs:
      "Algunos V6 automáticos MDX/TL 2003–2007 compartieron el historial de fallas de transmisión de Honda, y ciertos modelos tuvieron la misma exposición Takata. Un reporte de historial puede revelar reemplazos de transmisión.",
    recallContextEs:
      "Acura, como marca de Honda, fue afectada por el gran retiro Takata. Confirma que el retiro del inflador de bolsa de aire esté cerrado por VIN.",
    buyingTipEs:
      "Los Acura comparten los fuertes trenes motrices de Honda pero también son blanco frecuente de robo — verifica que el título no sea reconstruido y que el retiro de bolsa de aire esté completado antes de comprar.",
  },
  {
    slug: "infiniti",
    countryEs: "Japón",
    descriptionEs: "la división de vehículos de lujo de Nissan",
    vinNoteEs:
      'Los modelos Infiniti comienzan con "JN" (Japón) o "5N" (QX60 construido en EE. UU.). El VIN confirma motor y tren motriz — importante para distinguir el VC-Turbo del QX50 de los V6 anteriores.',
    commonIssuesEs:
      "El QX60 (y su gemelo Nissan Pathfinder) usa una CVT sujeta a las mismas quejas de sobrecalentamiento que otras CVT de Nissan. Un reporte de historial puede revelar reemplazo previo de la transmisión.",
    recallContextEs:
      "Los modelos Infiniti fueron parte del retiro Takata y compartieron campañas de Nissan por frenado y problemas eléctricos. Verifica retiros abiertos por VIN.",
    buyingTipEs:
      "En modelos QX60 con CVT, prioriza un historial que muestre servicio documentado de la transmisión, y presupuesta el mayor costo de partes y reparaciones de marca de lujo.",
  },
  {
    slug: "tesla",
    countryEs: "EE. UU.",
    descriptionEs: "el pionero del vehículo eléctrico y líder del mercado",
    vinNoteEs:
      'Los VIN de Tesla comienzan con "5YJ" (Fremont, California) o "7SA" (Texas); los autos europeos usan "LRW" (Shanghái) o "XP7" (Berlín). El VIN decodifica el modelo, batería y configuración del motor.',
    commonIssuesEs:
      "Las unidades Model S/X 2012–2018 antiguas tuvieron fallas de memoria eMMC en el MCU y problemas ocasionales en la suspensión neumática. El mayor riesgo en un EV usado es el daño oculto a la batería — un título salvage o de inundación puede ocultar un paquete degradado. Un reporte de historial es esencial.",
    recallContextEs:
      "Tesla resuelve muchos problemas vía actualizaciones de software por aire, pero aún emite retiros formales de la NHTSA (p. ej., para Autopilot/Autosteer y avisos del cinturón). Confirma cualquier retiro abierto por VIN.",
    buyingTipEs:
      "Nunca compres un Tesla usado con título salvage, de inundación o reconstruido sin una revisión de salud de la batería — daño por agua o choque al paquete es costoso y no siempre visible. Verifica que el título esté limpio en el reporte de historial.",
  },
  {
    slug: "volvo",
    countryEs: "Suecia",
    descriptionEs: "la marca sueca sinónimo de seguridad",
    vinNoteEs:
      'Los WMI de Volvo comienzan con "YV1" (pasajeros) o "YV4" (SUVs); los S60 construidos en EE. UU. desde Carolina del Sur usan "7JR". El VIN confirma el motor Drive-E y si el auto es un híbrido enchufable (Recharge).',
    commonIssuesEs:
      "Algunos motores 2.0L Drive-E tuvieron problemas de acumulación de carbón y de distribución, y la electrónica compleja en versiones cargadas puede ser costosa de reparar fuera de garantía. El historial de servicio es valioso en estos autos.",
    recallContextEs:
      "Volvo emitió retiros Takata y varias campañas por componentes de bomba de combustible y cinturón de seguridad. Confirma el estado del retiro por VIN.",
    buyingTipEs:
      "La tecnología de seguridad de Volvo es excelente pero intensiva en reparación con la edad — usa el reporte de historial para confirmar servicio regular en concesionario y descartar daño por accidente a los sensores avanzados de asistencia al conductor.",
  },
  {
    slug: "porsche",
    countryEs: "Alemania",
    descriptionEs: "el icónico fabricante de autos deportivos",
    vinNoteEs:
      'Los WMI de Porsche comienzan con "WP0" (deportivos) o "WP1" (SUVs). El VIN decodifica la variante exacta del modelo — crítico en el 911, donde los trim Carrera, S, Turbo y GT difieren enormemente en valor.',
    commonIssuesEs:
      "Los modelos 911/Boxster/Cayman enfriados por agua 1997–2008 con el motor M96/M97 son conocidos por riesgo en el rodamiento IMS y rayado de cilindros; los Cayenne tempranos tuvieron problemas con tubos de refrigerante. Un historial documentado de servicio y reparación es esencial.",
    recallContextEs:
      "Porsche emitió retiros Takata en ciertos modelos y campañas por línea de combustible y rieles del asiento. Verifica retiros abiertos por VIN.",
    buyingTipEs:
      "En cualquier 911/Boxster/Cayman anterior a 2009, pregunta si se atendió el rodamiento IMS, y siempre confirma que la variante decodificada por el VIN coincida con lo que dice el vendedor — los valores Porsche varían mucho por trim.",
  },
  {
    slug: "cadillac",
    countryEs: "EE. UU.",
    descriptionEs: "la icónica marca de lujo de EE. UU.",
    vinNoteEs:
      'Los WMI de Cadillac comienzan con "1G6" (pasajeros) o "1GY" (Escalade/SUV). El VIN identifica el motor — útil para confirmar si una Escalade tiene el V8 6.2L o el diésel.',
    commonIssuesEs:
      "Cadillac comparte mecánica de GM, así que los problemas con seguidores AFM 6.2L V8 aplican a Escalade, y las pantallas de infoentretenimiento CUE en modelos 2013–2017 eran propensas a agrietarse. Un reporte de historial muestra reparaciones mayores.",
    recallContextEs:
      "Los vehículos Cadillac fueron cubiertos por las campañas Takata de GM y compartieron retiros de interruptor de ignición y eléctricos. Confirma retiros abiertos por VIN.",
    buyingTipEs:
      "Las Escalade son vehículos populares de transporte ejecutivo y flota — usa el reporte de historial para revisar uso comercial previo y desgaste del tren motriz de alto kilometraje antes de pagar precios de SUV de lujo.",
  },
  {
    slug: "buick",
    countryEs: "EE. UU.",
    descriptionEs: "la marca premium mainstream de GM",
    vinNoteEs:
      'Los WMI de Buick comienzan con "1G4" (pasajeros) o comparten códigos de SUV de GM; el Envision se construye en China y usa "LRB". El VIN confirma el motor y si el auto tiene tracción integral.',
    commonIssuesEs:
      "Buick comparte plataformas de GM — el V6 3.6L del Enclave puede desarrollar desgaste de cadena de distribución a mayor kilometraje, y los pequeños motores turbo necesitan servicio regular de aceite. Un reporte de historial confirma el mantenimiento.",
    recallContextEs:
      "Los vehículos Buick fueron parte de los retiros Takata de GM y compartieron campañas a nivel de plataforma. Verifica el estado del retiro por VIN.",
    buyingTipEs:
      "Los Buick suelen ser autos de un solo dueño y bajo kilometraje — confirma ese perfil en el reporte de historial, ya que su valor descansa fuertemente en uso previo cuidadoso y un registro de accidentes limpio.",
  },
  {
    slug: "chrysler",
    countryEs: "EE. UU.",
    descriptionEs: "un ícono automotriz estadounidense",
    vinNoteEs:
      'Los WMI de Chrysler comienzan con "2C3" / "2C4" (construido en Canadá, incluyendo la Pacifica) o "1C3" (EE. UU.). El VIN confirma si una Pacifica es el modelo de gasolina o el híbrido enchufable.',
    commonIssuesEs:
      "El Pacifica Hybrid tuvo campañas tempranas de batería y eléctricas, y el V6 Pentastar 3.6L del 300 puede desarrollar problemas en la culata en años tempranos. Un reporte de historial revela trabajo de batería o motor.",
    recallContextEs:
      "Los vehículos Chrysler fueron parte del retiro Takata, y el Pacifica Hybrid tuvo un retiro por riesgo de incendio que afectó ciertas unidades 2017–2018. Confirma el cierre por VIN.",
    buyingTipEs:
      "En un Pacifica Hybrid, verifica que los retiros relacionados con la batería estén cerrados por VIN, y revisa el reporte de historial buscando los registros de accidente e inundación que las minivans (usadas como vehículos familiares) suelen acumular.",
  },
  {
    slug: "lincoln",
    countryEs: "EE. UU.",
    descriptionEs: "la división de vehículos de lujo de Ford",
    vinNoteEs:
      'Los WMI de Lincoln comienzan con "5LM" (SUVs) o "1LN" (sedanes). El VIN decodifica el motor EcoBoost y si el vehículo tiene tracción integral — relevante en el Navigator y Aviator de turbo gemelo.',
    commonIssuesEs:
      "Lincoln comparte mecánica EcoBoost de Ford, así que algunos motores turbo tuvieron problemas de intrusión de refrigerante, y el híbrido enchufable del Aviator agregó complejidad eléctrica. Un reporte de historial muestra reparaciones del tren motriz.",
    recallContextEs:
      "Los vehículos Lincoln compartieron las campañas Takata y de plataforma Explorer de Ford (el Aviator comparte la arquitectura del Explorer). Confirma el estado del retiro por VIN.",
    buyingTipEs:
      "Los Navigator son vehículos populares de transporte ejecutivo — usa el reporte de historial para descartar uso comercial previo y desgaste del tren motriz de alto kilometraje antes de pagar precios de lujo.",
  },
  {
    slug: "genesis",
    countryEs: "Corea del Sur",
    descriptionEs: "la marca de lujo premiada de Hyundai",
    vinNoteEs:
      'Los modelos Genesis se construyen en Corea y comienzan con "KM" (SUVs) o "KMT". El VIN confirma motor — 2.5T, 3.5T twin-turbo o el modelo de batería Electrified GV70/G80.',
    commonIssuesEs:
      "Como marca más nueva, Genesis tiene un historial de fallas limitado, pero comparte algunas familias de motores Hyundai-Kia, así que confirmar retiros relacionados con el motor por VIN sigue valiendo la pena. Un reporte de historial muestra accidente o daño por inundación.",
    recallContextEs:
      "Los modelos Genesis han tenido retiros de software, cinturón de seguridad y eléctricos; al derivarse de Hyundai, confirma si las campañas de motor y antirrobo aplican por VIN.",
    buyingTipEs:
      "Genesis se deprecia más rápido que las marcas de lujo establecidas, lo que hace que un ejemplo usado limpio y bien documentado sea de fuerte valor — verifica el título y el historial de servicio antes de comprar.",
  },
  {
    slug: "land-rover",
    countryEs: "Reino Unido",
    descriptionEs: "la marca de SUVs de lujo más prestigiosa del mundo",
    vinNoteEs:
      'Los WMI de Land Rover comienzan con "SAL" (construidos en Reino Unido). El VIN decodifica el modelo y motor exactos — importante en la amplia gama Range Rover, Sport, Velar y Defender.',
    commonIssuesEs:
      "Los Land Rover tienen una reputación bien documentada de problemas eléctricos, de suspensión neumática y de fugas de aceite del motor, especialmente fuera de garantía. Un historial completo de servicio y reparación es más importante aquí que en casi cualquier otra marca.",
    recallContextEs:
      "Land Rover emitió retiros Takata y varias campañas por fallas en el sistema de combustible y eléctricas. Confirma retiros abiertos por VIN.",
    buyingTipEs:
      "Compra por historial de servicio, no por precio. Usa el reporte VIN para confirmar mantenimiento consistente en concesionario y descartar daño por inundación — el agua y los problemas eléctricos son una combinación costosa en estos SUVs.",
  },
  {
    slug: "jaguar",
    countryEs: "Reino Unido",
    descriptionEs: "la marca británica de lujo y desempeño",
    vinNoteEs:
      'Los WMI de Jaguar comienzan con "SAJ" (construidos en Reino Unido). El VIN confirma el motor — V6/V8 sobrealimentado, cuatro cilindros Ingenium o el tren motriz eléctrico del I-PACE.',
    commonIssuesEs:
      "Algunos diésel Ingenium 2.0L tuvieron problemas con la cadena de distribución, y los Jaguar comparten la reputación de Land Rover por gremlins eléctricos. Un historial de servicio documentado es importante en ejemplos usados.",
    recallContextEs:
      "Jaguar emitió retiros Takata y campañas relacionadas con emisiones en ciertos diésel. Verifica el estado del retiro por VIN.",
    buyingTipEs:
      "Los Jaguar se deprecian fuertemente, así que un ejemplo usado limpio y completamente servido puede ser una ganga — pero primero confirma mantenimiento en concesionario y un registro limpio de accidente/inundación en el reporte de historial.",
  },
  {
    slug: "mini",
    countryEs: "Reino Unido",
    descriptionEs: "la icónica marca de autos pequeños propiedad de BMW",
    vinNoteEs:
      'Los WMI de MINI comienzan con "WMW" (construidos en Reino Unido, propiedad de BMW). El VIN confirma el motor y si el auto es Cooper, Cooper S o la variante de desempeño John Cooper Works.',
    commonIssuesEs:
      "Los modelos 2007–2010 con el motor turbo N14 eran conocidos por traqueteo de cadena de distribución y acumulación de carbón, y el desgaste de embrague/transmisión es común en ejemplos manejados duro. Un historial de servicio es valioso.",
    recallContextEs:
      "MINI, como marca de BMW, fue parte del retiro Takata y compartió campañas relacionadas con el motor. Confirma el cierre del retiro por VIN.",
    buyingTipEs:
      "En modelos turbo (N14) 2007–2010, pregunta si se reemplazaron la cadena de distribución y el tensor, y verifícalo en el reporte de historial — es la reparación definitoria para estos autos.",
  },
  {
    slug: "mitsubishi",
    countryEs: "Japón",
    descriptionEs: "una marca japonesa conocida por SUVs duraderos",
    vinNoteEs:
      'Los WMI de Mitsubishi comienzan con "JA3" / "JA4" (construidos en Japón). El VIN confirma motor y si el Outlander es el modelo de gasolina o el híbrido enchufable (PHEV).',
    commonIssuesEs:
      "El sistema de batería y carga del Outlander PHEV agrega complejidad, y los modelos con CVT necesitan servicio regular de fluido. Un reporte de historial puede revelar trabajo de batería o transmisión.",
    recallContextEs:
      "Los modelos Mitsubishi fueron parte del retiro Takata y tuvieron campañas separadas por frenado y problemas eléctricos. Verifica el estado del retiro por VIN.",
    buyingTipEs:
      "La larga garantía del tren motriz de Mitsubishi es un argumento de venta — confirma si la cobertura restante se transfiere, y usa el reporte de historial para verificar un título limpio y registro de accidentes.",
  },
  {
    slug: "alfa-romeo",
    countryEs: "Italia",
    descriptionEs: "la marca italiana conocida por el manejo apasionado",
    vinNoteEs:
      'Los WMI de Alfa Romeo comienzan con "ZAR" (construidos en Italia). El VIN confirma el motor — el 2.0L turbo, el V6 Quadrifoglio 2.9L o el híbrido enchufable Tonale.',
    commonIssuesEs:
      "Los Alfa modernos (Giulia, Stelvio) tienen gremlins eléctricos e infoentretenimiento documentados, y los modelos Quadrifoglio de alto desempeño premian un historial cuidadoso de servicio. Un reporte de historial muestra trabajo eléctrico o de motor mayor.",
    recallContextEs:
      "Alfa Romeo emitió retiros por problemas eléctricos, de frenos y software en Giulia y Stelvio. Confirma retiros abiertos por VIN.",
    buyingTipEs:
      "Los Alfa son de carácter rico pero sensibles al mantenimiento — compra un ejemplo completamente documentado, confirma el estado de la garantía y usa el reporte de historial para descartar señales de alerta de accidente y reparación eléctrica.",
  },
  {
    slug: "suzuki",
    countryEs: "Japón",
    descriptionEs: "un fabricante japonés de autos compactos, SUVs y motocicletas",
    vinNoteEs:
      'Los autos y SUVs Suzuki construidos en Japón comienzan con "JS2" / "JS3", mientras que las motocicletas Suzuki usan "JS1". Suzuki se retiró del mercado automotriz de EE. UU. después de 2013, así que la mayoría de los autos en carreteras de EE. UU. son 2013 o más antiguos — el décimo carácter del VIN confirma el año del modelo. Los vehículos aún se venden ampliamente fuera de Norteamérica.',
    commonIssuesEs:
      "Los Grand Vitara y SX4 de alto kilometraje pueden mostrar desgaste de cadena de distribución y suspensión, y la red de concesionarios discontinuada en EE. UU. hace que algunas piezas sean más difíciles de conseguir. Un reporte de historial muestra accidentes, inundación o registros de salvage en estos vehículos antiguos.",
    recallContextEs:
      "Ciertos modelos Suzuki fueron parte del retiro Takata, y vehículos anteriores tuvieron campañas por partes de frenos y combustible. Como Suzuki dejó el mercado automotriz de EE. UU., confirma cualquier retiro abierto por VIN y revisa que los remedios se hayan completado antes del cierre del concesionario.",
    buyingTipEs:
      "Sin red de concesionarios nuevos en EE. UU., enfócate en un título limpio y mantenimiento documentado, y confirma disponibilidad de piezas para tu Grand Vitara o SX4 específico antes de comprar.",
  },
  {
    slug: "freightliner",
    countryEs: "EE. UU.",
    descriptionEs: "la marca líder de camiones pesados y comerciales de Norteamérica",
    vinNoteEs:
      'Los camiones Clase 8 Freightliner comienzan con "1FU" (construidos en EE. UU.); la van Sprinter con marca Freightliner usa WMI "WD" de Mercedes-Benz. Los VIN de camiones comerciales siguen siendo de 17 caracteres, pero la estructura enfatiza clase GVWR, motor y configuración del chasís en lugar de trim de auto de pasajeros.',
    commonIssuesEs:
      "Los Freightliner pesados viven vidas comerciales duras — alto kilometraje, reconstrucciones de motor (Detroit DD13/DD15, Cummins) y servicio del sistema DEF/emisiones son rutina. Un reporte de historial puede revelar propiedad previa de flota, registros de accidentes e historial del odómetro en un tractor o camión vocacional usado.",
    recallContextEs:
      "Freightliner (Daimler Truck) emite retiros NHTSA por frenado, dirección y cableado en sus líneas Cascadia y M2, y la Sprinter comparte campañas de van Mercedes-Benz. Siempre confirma retiros abiertos por VIN antes de poner un camión comercial de regreso al servicio.",
    buyingTipEs:
      "En cualquier Freightliner usado, trata el historial VIN como esencial — verifica el rastro del odómetro, uso previo de flota/leasing y registros de accidentes, ya que los camiones comerciales acumulan desgaste mucho más rápido que los vehículos de pasajeros.",
  },
];

const bySlug = new Map(makesEs.map((m) => [m.slug, m]));

/** Lookup; returns undefined if the make hasn't been translated yet. */
export function getMakeEsBySlug(slug: string): MakeInfoEs | undefined {
  return bySlug.get(slug);
}
