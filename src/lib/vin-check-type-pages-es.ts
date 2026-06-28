/**
 * Spanish translations of the VIN_CHECK_TYPE_PAGES data, keyed by slug.
 * Wave 18 batch 4. US Spanish, "tú" form. Used by VinCheckTypeBody when
 * locale="es" to keep the EN data file untouched.
 */

import type { VinCheckTypePage } from "./vin-check-type-pages";

const PAGES_ES: Record<string, VinCheckTypePage> = {
  snowmobile: {
    slug: "snowmobile",
    category: "powersports",
    badge: "Verificación VIN de motonieve",
    h1: "Verificación VIN de motonieve —",
    h1Accent: "Verifica una motonieve usada antes de comprar",
    metaTitle: "Verificación VIN de motonieve — Verificación VIN gratis de motonieve",
    metaDescription:
      "Verificación VIN gratis de motonieve. Ingresa el VIN de 17 caracteres de una motonieve para confirmar la marca y el año y verificar registros de robo y título antes de comprar una Ski-Doo, Polaris, Arctic Cat o Yamaha usada.",
    keywords: [
      "verificación VIN motonieve",
      "verificación número VIN motonieve",
      "verificación VIN sled",
      "verificación VIN motonieve gratis",
      "verificación VIN Ski-Doo",
      "verificación VIN Polaris motonieve",
      "verificación número VIN Arctic Cat",
      "verificación VIN Yamaha motonieve",
    ],
    intro:
      "¿Estás comprando una motonieve usada en Marketplace o en un concesionario? Ejecuta su VIN primero. Una verificación VIN de motonieve decodifica la marca y el año modelo y muestra cualquier registro de robo o título vinculado al número. Una advertencia que debes saber de entrada: las bases de datos nacionales de robo cubren las motonieves de forma desigual por estado, así que también te decimos dónde verificar. Ingresa un VIN para comenzar gratis.",
    quickAnswer:
      "Una verificación VIN de motonieve lee el VIN de 17 caracteres de una motonieve para confirmar el fabricante y el año modelo y para buscar registros reportados de robo y título. Las motonieves modernas de Ski-Doo/BRP, Polaris, Arctic Cat y Yamaha usan el VIN estándar. Como NMVTIS y las bases de datos nacionales de robo cubren las motonieves de forma inconsistente entre estados, las verificaciones más completas también se hacen a través del fabricante y la agencia estatal que registra la motonieve.",
    reveals: [
      { title: "Marca y año modelo", body: "El VIN confirma el fabricante y fija el año modelo a partir del 10º carácter — útil en una motonieve sin marcas de año obvias." },
      { title: "Registros de robo", body: "Las motonieves son fáciles de cargar y remolcar, lo que las convierte en blanco de robo. La verificación muestra registros de robo reportados vinculados al VIN donde existen." },
      { title: "Estado de título y marca", body: "Si la motonieve tiene un título limpio o una marca de salvamento/chatarra en los estados que titulan motonieves y reportan a registros nacionales." },
      { title: "Dónde verificar más", body: "Te dirigimos al fabricante y a la oficina estatal de registro, ya que la cobertura de bases de datos nacionales para motonieves es limitada." },
    ],
    sections: [
      {
        h2: "Dónde encontrar el VIN en una motonieve",
        paras: [
          "El VIN de 17 caracteres está estampado en el túnel de la mayoría de las motonieves modernas — usualmente en el lado derecho hacia la parte trasera — y está impreso en una etiqueta en el chasis. Coincide el número estampado con la etiqueta y con el título antes de confiar en él; una discrepancia es la señal más clara de que algo está mal.",
          "No confundas el VIN con el número de serie del motor. Los fabricantes estampan un número separado en el motor, y los vendedores a veces lo citan por error. El VIN es el de 17 caracteres que decodifica a un año y marca. Las motonieves construidas antes de la era del VIN de 17 caracteres usaban números más cortos específicos del fabricante que no decodificarán en una herramienta estándar — para esas, los registros del fabricante son la forma de identificar la máquina.",
        ],
      },
      {
        h2: "Qué puede y no puede confirmar una verificación VIN de motonieve",
        paras: [
          "Confirma de forma confiable la marca y el año modelo y valida el dígito de verificación, lo que detecta un VIN alterado o mal escrito. Para robo y título, sé realista sobre la cobertura: NMVTIS está construido alrededor de vehículos titulados de carretera, y muchos estados registran motonieves a través de una agencia de parques o de recursos naturales en lugar del DMV, así que el historial de una motonieve puede no estar completamente reflejado en bases de datos nacionales.",
          "Por eso la verificación más sólida combina tres cosas: decodifica y valida el VIN aquí, confirma que el VIN estampado coincida con el título y el papeleo del vendedor, luego verifica robo y registro con el fabricante y la agencia estatal donde la motonieve está titulada. Si un vendedor no te deja ver y fotografiar el estampado del VIN, aléjate.",
        ],
      },
    ],
    faqs: [
      { q: "¿Puedo verificar una motonieve por VIN gratis?", a: "Sí. Ingresa el VIN de 17 caracteres de la motonieve arriba para confirmar la marca y el año modelo y validar el dígito de verificación gratis, sin registro. Luego puedes obtener un reporte de historial más completo." },
      { q: "¿Dónde está el VIN en una motonieve?", a: "Está estampado en el túnel — usualmente el lado derecho cerca de la parte trasera — y está impreso en una etiqueta del chasis. No lo confundas con el número de serie del motor; el VIN es el de 17 caracteres." },
      { q: "¿Puedo saber si una motonieve es robada por el VIN?", a: "Parcialmente. Una verificación VIN muestra registros de robo reportados donde existen, pero las bases de datos nacionales cubren las motonieves de forma inconsistente por estado. La verificación de robo más confiable también se hace a través del fabricante y la agencia estatal que registra la motonieve." },
      { q: "¿Qué marcas de motonieves usan un VIN estándar?", a: "Las motonieves modernas de Ski-Doo/BRP, Polaris, Arctic Cat y Yamaha llevan el VIN de 17 caracteres, así que decodifican para marca y año modelo. Las motonieves anteriores a 1981 usaban números más cortos específicos del fabricante." },
      { q: "¿Una motonieve se titula como un auto?", a: "Depende del estado. Algunos estados titulan y registran motonieves a través del DMV; otros usan una agencia de parques o de recursos naturales. Verifica las reglas del estado donde la motonieve está registrada." },
    ],
    related: [
      { href: "/vin-lookup/snowmobile", label: "Decodificador VIN de motonieve" },
      { href: "/atv-vin-check", label: "Verificación VIN de ATV" },
      { href: "/stolen-vehicle-check", label: "Verificación de vehículo robado" },
    ],
    relatedSlugs: ["dirt-bike", "utv"],
  },

  "dirt-bike": {
    slug: "dirt-bike",
    category: "powersports",
    badge: "Verificación VIN de moto cross",
    h1: "Verificación VIN de moto cross —",
    h1Accent: "Verifica una moto todoterreno por VIN",
    metaTitle: "Verificación VIN de moto cross — Verificación VIN gratis de moto todoterreno",
    metaDescription:
      "Verificación VIN gratis de moto cross. Ingresa el VIN de una motocicleta todoterreno para confirmar la marca y el año y verificar registros de robo antes de comprar una KTM, Honda, Yamaha, Kawasaki o Husqvarna usada.",
    keywords: [
      "verificación VIN moto cross",
      "verificación número VIN moto cross",
      "verificación número VIN moto cross gratis",
      "verificación VIN moto cross gratis",
      "verificación VIN KTM",
      "verificación VIN moto de motocross",
      "verificación VIN moto todoterreno",
      "verificación VIN Honda moto cross",
    ],
    intro:
      "Una moto cross usada con aspecto limpio aún puede ser robada o tener un mal título — y las motos todoterreno son robadas con frecuencia porque son livianas y rápidas de cargar. Una verificación VIN de moto cross confirma la marca y el año y busca registros de robo antes de que entregues efectivo. La cobertura varía porque muchas motos son solo todoterreno y nunca son tituladas, así que somos honestos sobre lo que el número puede probar. Ingresa un VIN para comenzar gratis.",
    quickAnswer:
      "Una verificación VIN de moto cross lee el VIN de 17 caracteres de una motocicleta todoterreno para confirmar el fabricante y el año modelo y para buscar registros de robo reportados. Las motos legales para calle y dual-sport están usualmente tituladas y decodifican limpiamente; las motos puramente todoterreno de competencia a menudo se venden con una factura y sin título, así que los datos de robo y título sobre ellas son más limitados. Confirmar que el VIN estampado en el chasis coincida con el papeleo del vendedor es el paso más importante.",
    reveals: [
      { title: "Marca y año modelo", body: "El VIN confirma el fabricante — KTM, Honda, Yamaha, Kawasaki, Husqvarna, GasGas — y fija el año modelo, que los vendedores a menudo se equivocan." },
      { title: "Registros de robo", body: "Las motos todoterreno son un blanco frecuente de robo. La verificación muestra registros de robo reportados vinculados al VIN donde se hayan presentado." },
      { title: "Estado del título", body: "Para motos legales para calle y dual-sport, si el título está limpio o lleva una marca de salvamento/chatarra donde se reporte." },
      { title: "Integridad del VIN", body: "Las matemáticas del dígito de verificación detectan un número de chasis alterado o re-estampado — una bandera roja común en una moto todoterreno robada." },
    ],
    sections: [
      {
        h2: "Dónde encontrar el VIN de una moto cross",
        paras: [
          "En casi todas las motos cross modernas, el VIN de 17 caracteres está estampado en la cabeza de dirección — la parte del chasis por donde pasan las horquillas. Muchas motos también tienen una calcomanía con el VIN en el chasis, pero las calcomanías se despegan y se reemplazan, así que el número estampado en la cabeza de dirección es el que importa. El motor lleva un número de motor separado; no es el VIN.",
          "Observa de cerca el estampado mismo. Espaciado desigual, caracteres a diferentes profundidades, marcas de esmerilado o relleno alrededor del área son señales de que el número del chasis fue alterado. En una moto legítima el estampado es limpio y consistente. Fotografíalo y léelo contra el título o factura antes de comprometerte.",
        ],
      },
      {
        h2: "Motos tituladas vs. solo todoterreno",
        paras: [
          "Si una moto cross tiene título depende de cómo está clasificada y dónde vive. Las motos dual-sport y legales para calle están registradas y tituladas como cualquier motocicleta, así que decodifican y se verifican igual. Las motos puras de motocross y competencia todoterreno se venden con frecuencia solo con una declaración de origen del fabricante o una factura, y varios estados nunca las titulan.",
          "Eso significa que la cobertura de robo y título para motos solo todoterreno es genuinamente limitada — puede que no haya registro del DMV que sacar. En ese caso la verificación VIN aún confirma la marca, el año y la integridad del número de chasis, y las salvaguardas prácticas son: coincide el VIN estampado con el papeleo, pide la cadena original de facturas y verifica el VIN contra registros de robo y con el fabricante donde sea posible.",
        ],
      },
    ],
    faqs: [
      { q: "¿Puedo verificar un VIN de moto cross gratis?", a: "Sí. Ingresa el VIN de 17 caracteres de la moto arriba para confirmar la marca y el año modelo y validar el número del chasis gratis, sin registro. Luego puedes obtener un reporte de historial más completo." },
      { q: "¿Dónde está el VIN en una moto cross?", a: "Está estampado en la cabeza de dirección del chasis, donde pasan las horquillas. A menudo también hay una calcomanía, pero el número estampado es el confiable. El número del motor es separado y no es el VIN." },
      { q: "¿Cómo sé si una moto cross usada es robada?", a: "Verifica el VIN para registros de robo, e inspecciona el estampado de la cabeza de dirección por esmerilado, relleno o caracteres desiguales. Coincide el VIN estampado con el título o factura. Si el vendedor evita mostrar el estampado, tómalo como una advertencia." },
      { q: "¿Todas las motos cross tienen título?", a: "No. Las motos legales para calle y dual-sport están tituladas, pero las motos puras de competencia todoterreno a menudo se venden con una factura y sin título, y algunos estados nunca las titulan. Los datos de robo y título son más limitados para esas." },
      { q: "¿Funciona una verificación VIN en una KTM o Husqvarna?", a: "Sí. Las motos modernas de KTM, Husqvarna, Honda, Yamaha, Kawasaki y GasGas llevan el VIN de 17 caracteres, así que la verificación confirma la marca y el año modelo y valida el número del chasis." },
    ],
    related: [
      { href: "/motorcycle-vin-check", label: "Verificación VIN de motocicleta" },
      { href: "/atv-vin-check", label: "Verificación VIN de ATV" },
      { href: "/stolen-vehicle-check", label: "Verificación de vehículo robado" },
    ],
    relatedSlugs: ["snowmobile", "utv"],
  },

  utv: {
    slug: "utv",
    category: "powersports",
    badge: "Verificación VIN de UTV",
    h1: "Verificación VIN de UTV y Side-by-Side —",
    h1Accent: "Verifica un UTV usado antes de comprar",
    metaTitle: "Verificación VIN de UTV — Verificación VIN gratis de Side-by-Side y SxS",
    metaDescription:
      "Verificación VIN gratis de UTV para side-by-sides. Ingresa el VIN para confirmar la marca y el año y verificar registros de robo y título antes de comprar un Polaris RZR, Can-Am, Kawasaki Mule o Honda Pioneer usado.",
    keywords: [
      "verificación VIN UTV",
      "verificación VIN side-by-side",
      "verificación VIN SxS",
      "verificación número VIN UTV",
      "verificación VIN Polaris RZR",
      "verificación VIN Can-Am",
      "verificación VIN Kawasaki Mule",
      "verificación VIN UTV gratis",
    ],
    intro:
      "Los side-by-sides retienen su valor, lo que los hace valer la pena robar y verificar. Una verificación VIN de UTV confirma la marca y el año modelo y busca registros de robo y título antes de que compres un RZR, Can-Am, Mule o Pioneer usado. Como con otras máquinas todoterreno, la cobertura de bases de datos nacionales varía por estado, así que te decimos dónde más buscar. Ingresa un VIN para comenzar gratis.",
    quickAnswer:
      "Una verificación VIN de UTV lee el VIN de 17 caracteres de un side-by-side para confirmar el fabricante y el año modelo y para buscar registros reportados de robo y título. Los UTV modernos de Polaris, Can-Am/BRP, Kawasaki, Honda y Yamaha usan el VIN estándar. Como los UTV son máquinas todoterreno que muchos estados registran a través de una agencia de parques o de recursos naturales en lugar del DMV, la cobertura nacional de robo y título es desigual, así que las verificaciones con el fabricante y el estado añaden el contexto faltante.",
    reveals: [
      { title: "Marca y año modelo", body: "El VIN confirma el fabricante — Polaris, Can-Am, Kawasaki, Honda, Yamaha — y fija el año modelo para la máquina correcta." },
      { title: "Registros de robo", body: "Los UTV son valiosos y transportables, una combinación común de robo. La verificación muestra registros de robo reportados vinculados al VIN." },
      { title: "Estado de título y marca", body: "Si el UTV tiene un título limpio o una marca de salvamento/chatarra en los estados que titulan side-by-sides y lo reportan." },
      { title: "Integridad del VIN", body: "Las matemáticas del dígito de verificación detectan un VIN alterado o mal escrito antes de que cambie dinero de manos." },
    ],
    sections: [
      {
        h2: "Dónde encontrar el VIN en un UTV",
        paras: [
          "En la mayoría de los side-by-sides el VIN de 17 caracteres está estampado en el chasis — comúnmente en un riel del chasis cerca de la rueda delantera izquierda o debajo del asiento del conductor — e impreso en una etiqueta del fabricante. Las marcas varían en ubicación, así que verifica el manual del propietario si no es obvio. El motor tiene su propio número de serie separado, que no es el VIN.",
          "Confirma que el VIN estampado coincida con la etiqueta y el título. Como el estampado del chasis es alcanzable, puede ser manipulado en una máquina robada, así que busca esmerilado o caracteres desiguales y fotografía el estampado para leerlo contra el papeleo.",
        ],
      },
      {
        h2: "Cobertura de registro y título para UTV",
        paras: [
          "Cómo se titula un UTV depende mucho del estado. Algunos estados emiten un título estándar y registran side-by-sides a través del DMV; otros manejan vehículos todoterreno a través de un departamento de parques o recursos naturales con un registro y calcomanía separados, y unos pocos los tratan como equipo todoterreno sin título.",
          "Ese mosaico significa que el historial de un UTV puede no estar completamente reflejado en NMVTIS, que se centra en vehículos titulados de carretera. La verificación VIN aún confirma la marca, el año y la integridad del VIN y muestra registros de robo donde se hayan presentado; para una imagen completa, también verifica el registro con la agencia estatal del estado donde se usa la máquina y verifica detalles de construcción y retiros con el fabricante.",
        ],
      },
    ],
    faqs: [
      { q: "¿Puedo hacer una verificación VIN de UTV gratis?", a: "Sí. Ingresa el VIN de 17 caracteres del side-by-side arriba para confirmar la marca y el año modelo y validar el VIN gratis, sin registro. Luego puedes obtener un reporte de historial más completo." },
      { q: "¿Dónde está el VIN en un side-by-side?", a: "Usualmente está estampado en un riel del chasis cerca de la rueda delantera izquierda o debajo del asiento del conductor, e impreso en una etiqueta del fabricante. La ubicación varía por marca, así que verifica el manual del propietario si es necesario." },
      { q: "¿Puedo verificar si un UTV es robado?", a: "Una verificación VIN muestra registros de robo reportados donde existen, pero la cobertura varía por estado porque muchos estados registran UTV fuera del DMV. Combina la verificación con la agencia estatal de registro y el fabricante para una verificación de robo más completa." },
      { q: "¿'Side-by-side' es lo mismo que 'UTV'?", a: "Sí. Side-by-side, SxS y UTV (vehículo utilitario de tarea/terreno) describen la misma clase de máquina todoterreno con asientos — RZR, Can-Am, Mule, Pioneer y similares. Usan el VIN estándar de 17 caracteres." },
      { q: "¿Los UTV se titulan como autos?", a: "Varía por estado. Algunos emiten un título estándar a través del DMV; otros registran vehículos todoterreno a través de una agencia de parques o recursos naturales, y algunos los tratan como equipo sin título. Verifica las reglas donde se usa la máquina." },
    ],
    related: [
      { href: "/atv-vin-check", label: "Verificación VIN de ATV" },
      { href: "/vin-decoder/can-am", label: "Decodificador VIN de Can-Am" },
      { href: "/stolen-vehicle-check", label: "Verificación de vehículo robado" },
    ],
    relatedSlugs: ["dirt-bike", "snowmobile"],
  },

  trailer: {
    slug: "trailer",
    category: "towable",
    badge: "Verificación VIN de remolque",
    h1: "Verificación VIN de remolque —",
    h1Accent: "Verifica el título y registro de robo de un remolque usado",
    metaTitle: "Verificación VIN de remolque — Verificación VIN gratis de remolque",
    metaDescription:
      "Verificación VIN gratis de remolque. Ingresa el VIN de 17 caracteres de un remolque utilitario, de carga, de viaje o de bote para confirmar el año y verificar registros de título y robo antes de comprar. Instantáneo, sin registro.",
    keywords: [
      "verificación VIN remolque",
      "verificación número VIN remolque",
      "verificación VIN remolque gratis",
      "verificación VIN remolque utilitario",
      "verificación VIN remolque de carga",
      "verificación VIN remolque de viaje",
      "verificación VIN remolque de bote",
      "verificar VIN remolque",
    ],
    intro:
      "Los remolques se titulan y se registran como otros vehículos, y la mayoría construidos desde 1981 llevan un VIN de 17 caracteres — lo que significa que también pueden ser robados, re-titulados y revendidos. Una verificación VIN de remolque confirma el año y tipo y busca marcas de título y registros de robo antes de que compres un remolque utilitario, de carga, de viaje o de bote usado. Como el VIN está expuesto y es fácil de manipular, verificarlo importa aquí. Ingresa un VIN para comenzar gratis.",
    quickAnswer:
      "Una verificación VIN de remolque lee el VIN de 17 caracteres de un remolque para confirmar el fabricante, tipo y año modelo y para buscar marcas de título y registros de robo. Aplica a remolques utilitarios, de carga, cerrados, de viaje y de bote construidos desde 1981, que llevan un VIN estándar como autos y camionetas. Algunos remolques caseros o muy livianos en cambio tienen un número de identificación asignado por el estado en lugar de un VIN de fábrica.",
    reveals: [
      { title: "Año y tipo", body: "El VIN fija el año modelo y confirma el tipo de remolque — útil cuando un remolque no tiene marcas claras de año." },
      { title: "Estado de título y marca", body: "Si el remolque tiene un título limpio o una marca de salvamento/chatarra donde se reporte a registros estatales y nacionales." },
      { title: "Registros de robo", body: "Los remolques son un blanco frecuente de robo precisamente porque son fáciles de enganchar y remolcar. La verificación muestra registros de robo reportados vinculados al VIN." },
      { title: "Integridad del VIN", body: "Como la placa del VIN de un remolque está expuesta, es un riesgo de manipulación. Las matemáticas del dígito de verificación detectan un número alterado o mal escrito." },
    ],
    sections: [
      {
        h2: "¿Todos los remolques tienen un VIN?",
        paras: [
          "La mayoría de los remolques construidos desde 1981 llevan un VIN de 17 caracteres y están titulados y registrados a través del DMV estatal, igual que un auto. Lo encontrarás estampado en la lengüeta o estructura A, a lo largo de un riel del chasis y en la etiqueta de certificación del fabricante. La excepción son los remolques muy livianos o construidos en taller — varios estados emiten un número de identificación asignado por el estado para remolques caseros o sin título en lugar de un VIN de fábrica.",
          "Como la placa del VIN de un remolque está expuesta, es fácil de intercambiar o re-estampar en una unidad robada. Confirmar que el VIN estampado coincide con el título y la etiqueta de certificación, y verificarlo contra registros de robo, es el paso más útil antes de pagar por un remolque usado.",
        ],
      },
      {
        h2: "Comprar un remolque usado: qué verificar",
        paras: [
          "Decodifica el VIN para confirmar que el tipo y año coincidan con la descripción del vendedor, luego verifica el estado del título y cualquier registro de robo vinculado a ese VIN. Mira la placa del VIN misma — remaches sueltos, fuentes que no coinciden o una placa que se ve más nueva que el remolque son señales de advertencia.",
          "Para un remolque de bote, recuerda que el remolque y el bote son dos cosas separadas con dos identificadores separados: el remolque tiene su propio VIN de 17 caracteres, mientras que el bote tiene un Número de Identificación de Casco (HIN) de 12 caracteres que se verifica de una manera diferente. Verifica ambos si estás comprando un paquete de bote y remolque.",
        ],
      },
    ],
    faqs: [
      { q: "¿Puedo verificar un remolque por VIN gratis?", a: "Sí. Ingresa el VIN de 17 caracteres del remolque arriba para confirmar el año y tipo y validar el VIN gratis, sin registro. Luego puedes obtener un reporte de título e historial más completo." },
      { q: "¿Dónde está el VIN en un remolque?", a: "Busca en la lengüeta o estructura A, a lo largo del riel del chasis, y en la etiqueta de certificación del fabricante. Confirma que el número estampado coincida con el título y la etiqueta." },
      { q: "¿Puedo verificar un remolque por robo por VIN?", a: "Sí. Los remolques son un blanco común de robo, y una verificación VIN muestra registros de robo reportados — un paso importante porque la placa del VIN expuesta es fácil de manipular en una unidad robada." },
      { q: "¿El VIN de un remolque de bote es el mismo que el número del bote?", a: "No. El remolque tiene su propio VIN de 17 caracteres, mientras que el bote tiene un Número de Identificación de Casco (HIN) separado de 12 caracteres. Se verifican independientemente, así que verifica ambos en una venta de bote y remolque." },
      { q: "¿Los remolques caseros tienen un VIN?", a: "A menudo no un VIN de fábrica. Muchos estados emiten un número de identificación asignado por el estado para remolques caseros o muy livianos, que se registra y titula a través del DMV en lugar de un VIN del fabricante." },
    ],
    related: [
      { href: "/vin-lookup/trailer", label: "Decodificador VIN de remolque" },
      { href: "/salvage-title-check", label: "Verificación título salvamento" },
      { href: "/stolen-vehicle-check", label: "Verificación de vehículo robado" },
    ],
    relatedSlugs: ["boat", "utv"],
  },

  boat: {
    slug: "boat",
    category: "marine",
    badge: "Verificación VIN de bote",
    h1: "Verificación VIN de bote —",
    h1Accent: "Los botes usan un HIN, no un VIN",
    metaTitle: "Verificación VIN de bote — Verificación y búsqueda gratis del número HIN de bote",
    metaDescription:
      "¿Buscas una verificación VIN de bote? Los botes usan un Número de Identificación de Casco (HIN) de 12 caracteres, no un VIN. Aprende dónde encontrar el HIN y cómo verificar un bote usado antes de comprar. Gratis.",
    keywords: [
      "verificación VIN bote",
      "verificación VIN bote gratis",
      "verificación número VIN bote",
      "verificar número VIN bote gratis",
      "verificación VIN bote gratis",
      "verificación HIN bote",
      "verificación VIN moto acuática",
      "verificación VIN jet ski",
    ],
    intro:
      "Buscar una \"verificación VIN de bote\" es común, pero los botes no tienen un VIN. Bajo las reglas de la Guardia Costera de EE. UU., cada casco de bote construido desde 1972 lleva un Número de Identificación de Casco (HIN) de 12 caracteres en su lugar. La buena noticia: un HIN cumple el mismo trabajo — identifica al constructor y el año modelo y te permite verificar el casco antes de comprar. Aquí está dónde encontrarlo y cómo verificar un bote usado o moto acuática.",
    quickAnswer:
      "Los botes y motos acuáticas no usan un VIN. Bajo las regulaciones de la Guardia Costera de EE. UU., cada casco de bote fabricado desde 1972 lleva un Número de Identificación de Casco (HIN) de 12 caracteres, que es el equivalente marino de un VIN. El HIN identifica al fabricante y el año modelo, y lo usas — no un VIN — para verificar la identidad y el historial de un bote usado. Un remolque de bote, en cambio, tiene su propio VIN separado de 17 caracteres.",
    reveals: [
      { title: "Por qué no hay VIN", body: "Los VIN son un estándar para vehículos de carretera (ISO 3779). Los botes caen bajo las reglas de identificación de casco de la USCG, que asignan un HIN de 12 caracteres a cada casco construido desde 1972." },
      { title: "Constructor y año modelo", body: "El HIN codifica el identificador del fabricante y el año modelo, así que confirma quién construyó el casco y cuándo — el mismo trabajo de identidad que hace un VIN en tierra." },
      { title: "Señales de manipulación del casco", body: "Un bote con un HIN esmerilado, que no coincide o ausente es una señal de advertencia seria y debe verificarse con la Guardia Costera o agencia náutica estatal antes de comprar." },
      { title: "El remolque es separado", body: "Si el bote viene en un remolque, el remolque lleva su propio VIN de 17 caracteres — verifícalo independientemente del HIN del bote." },
    ],
    table: {
      caption: "HIN de bote vs. VIN de auto — qué es diferente",
      head: ["Identificador", "Se aplica a"],
      rows: [
        ["HIN de 12 caracteres", "Cascos de bote y moto acuática construidos desde 1972 (regla USCG)"],
        ["VIN de 17 caracteres", "Vehículos de carretera construidos desde 1981 (ISO 3779) — incluyendo el remolque del bote"],
        ["Número de serie del motor", "El motor fuera de borda o interno — separado tanto del HIN del casco como de cualquier VIN"],
      ],
    },
    sections: [
      {
        h2: "Dónde encontrar el HIN de un bote",
        paras: [
          "El HIN primario está moldeado o fijado en el lado de estribor (derecho) del espejo de popa — la parte plana trasera del casco — usualmente en la esquina superior. Un HIN duplicado se registra en un segundo lugar no expuesto en el casco para que un número primario manipulado pueda verificarse de forma cruzada. Las motos acuáticas (Sea-Doo, WaveRunner, Jet Ski) llevan un HIN de la misma manera, típicamente en la parte trasera o en el compartimiento del motor.",
          "Lee el HIN contra el título, registro y factura. Un HIN que ha sido esmerilado, pintado encima, o que no coincide con el papeleo es la versión marina de un VIN alterado y una razón para detener la venta hasta que se explique.",
        ],
      },
      {
        h2: "Cómo verificar un bote usado antes de comprar",
        paras: [
          "Comienza con el HIN: confirma que está presente, sin dañar y coincide con el título y registro. Usa el HIN — no un VIN — para buscar la identidad del casco y cualquier historial registrado, y reporta un HIN sospechoso o ausente a la Guardia Costera de EE. UU. o a tu agencia náutica estatal.",
          "Luego maneja el resto como elementos separados. El motor tiene su propio número de serie para búsquedas de construcción y retiros. Si se incluye un remolque, tiene su propio VIN de 17 caracteres para verificar título y robo. Tratar el casco, el motor y el remolque como tres registros distintos es la forma de evitar comprar un paquete de bote robado o re-marcado.",
        ],
      },
    ],
    faqs: [
      { q: "¿Los botes tienen un VIN?", a: "No. Los botes usan un Número de Identificación de Casco (HIN) de 12 caracteres bajo las reglas de la Guardia Costera de EE. UU., no un VIN de 17 caracteres. El HIN es el equivalente marino y cumple el mismo trabajo de identidad." },
      { q: "¿Dónde está el HIN en un bote?", a: "El HIN primario está en el lado de estribor (derecho) del espejo de popa, usualmente en la esquina superior. Un duplicado se registra en una ubicación no expuesta en el casco para que un primario manipulado pueda verificarse de forma cruzada." },
      { q: "¿Puedo verificar un jet ski o Sea-Doo por VIN?", a: "Las motos acuáticas también usan un HIN, no un VIN. Encontrarás el HIN en la parte trasera de la embarcación o en el compartimiento del motor, y lo verificas de la misma manera que un casco de bote." },
      { q: "¿Qué pasa si el HIN de un bote está ausente o esmerilado?", a: "Trátalo como una señal de advertencia seria — es el equivalente marino de un VIN alterado. No completes la compra hasta que se verifique, y reporta un HIN sospechoso a la Guardia Costera de EE. UU. o tu agencia náutica estatal." },
      { q: "¿El remolque del bote se verifica de la misma manera?", a: "No. El remolque tiene su propio VIN de 17 caracteres, que verificas por separado para título y robo. En una venta de bote y remolque, verifica el HIN del casco y el VIN del remolque independientemente." },
    ],
    related: [
      { href: "/hin-lookup", label: "Búsqueda HIN de bote" },
      { href: "/stolen-vehicle-check", label: "Verificación de vehículo robado" },
      { href: "/vin-check/type/trailer", label: "Verificación VIN de remolque de bote" },
    ],
    relatedSlugs: ["trailer", "snowmobile"],
  },
};

export function vinCheckTypePageEs(slug: string): VinCheckTypePage | undefined {
  return PAGES_ES[slug];
}

export function vinCheckTypeBadgeEs(slug: string): string | undefined {
  return PAGES_ES[slug]?.badge;
}
