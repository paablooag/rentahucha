// Páginas locales «Alquilar mi piso en …». Datos regionales comprobados el 18-10-2026 en el Ministerio de Vivienda:
// - Depósito de fianzas por comunidad: mivau.gob.es → Alquila bien → Depósito de fianzas.
// - Zonas tensionadas: mivau.gob.es → Consultar zonas de mercado residencial tensionado (resolución de 24-7-2026).
// Al publicarse una nueva resolución trimestral, revisar `tension` y CITIES_CHECKED.

export const CITIES_CHECKED = '18 de octubre de 2026'

export interface Region { name: string; deposit: string | null }

// null = «Actualmente no existe obligación de depósito de fianza» según el Ministerio.
export const REGIONS = {
  andalucia: { name: 'Andalucía', deposit: null },
  aragon: { name: 'Aragón', deposit: 'la Dirección General de Vivienda y Rehabilitación del Gobierno de Aragón' },
  asturias: { name: 'Asturias', deposit: null },
  baleares: { name: 'Illes Balears', deposit: 'el Instituto Balear de la Vivienda (IBAVI)' },
  canarias: { name: 'Canarias', deposit: 'el Instituto Canario de la Vivienda' },
  cyl: { name: 'Castilla y León', deposit: 'el Consejo General de las Cámaras de la Propiedad Urbana de Castilla y León' },
  cataluna: { name: 'Cataluña', deposit: "l'Institut Català del Sòl (INCASÒL)" },
  valencia: { name: 'Comunitat Valenciana', deposit: 'la Dirección General de Tributos y Juego de la Generalitat' },
  galicia: { name: 'Galicia', deposit: 'el Instituto Gallego de Vivienda y Suelo (IGVS)' },
  madrid: { name: 'Comunidad de Madrid', deposit: 'la Agencia de Vivienda Social de la Comunidad de Madrid' },
  murcia: { name: 'Región de Murcia', deposit: null },
  navarra: { name: 'Navarra', deposit: null },
  euskadi: { name: 'País Vasco', deposit: 'el Servicio Vasco de Vivienda' },
  cantabria: { name: 'Cantabria', deposit: null },
  clm: { name: 'Castilla-La Mancha', deposit: 'la Dirección General de Vivienda y Urbanismo de Castilla-La Mancha' },
  extremadura: { name: 'Extremadura', deposit: null },
  larioja: { name: 'La Rioja', deposit: null },
} satisfies Record<string, Region>

export type RegionId = keyof typeof REGIONS

export interface City {
  slug: string
  name: string
  region: RegionId
  /** Declaración de zona tensionada vigente según el Ministerio; null si no figura en la lista. */
  tension: { scope: string; until: string } | null
  intro: string
  tips: string[]
}

const SHORT_STAY = 'Si piensas en alquiler turístico, necesitas la licencia o el registro de tu comunidad autónoma y tu ayuntamiento, y su código en el anuncio (el registro único estatal lo anuló el Tribunal Supremo en 2026). Desde el decreto de octubre de 2026, el de temporada pasa a ser «vivienda temporal», con causa escrita en el contrato y en general hasta 12 meses.'
const STUDENTS = 'Si alquilas a estudiantes por curso, el contrato es de temporada (no de vivienda habitual) y debe reflejar de verdad esa causa. Si el inquilino va a vivir allí de forma estable, es vivienda habitual aunque sea joven.'
const OWN_RULES_CAT = "Además de la normativa estatal, Cataluña tiene regulación propia de vivienda. Antes de fijar la renta, consulta la Agència de l'Habitatge de Catalunya."

export const CITIES: City[] = [
  {
    slug: 'madrid', name: 'Madrid', region: 'madrid', tension: null,
    intro: 'En Madrid la demanda de alquiler es alta y constante, y eso tiene dos caras: alquilas rápido, pero recibes muchas solicitudes y elegir bien lleva tiempo. Lo importante es filtrar por solvencia real, no por quién llega primero.',
    tips: ['Con muchos candidatos, decide con criterios objetivos y por escrito: ingresos acreditados, estabilidad y encaje con la renta.', 'La fianza se deposita en la Agencia de Vivienda Social de la Comunidad de Madrid: hazlo en plazo y guarda el justificante.'],
  },
  {
    slug: 'barcelona', name: 'Barcelona', region: 'cataluna', tension: { scope: 'todo el municipio', until: '16 de marzo de 2027' },
    intro: 'Barcelona es zona de mercado residencial tensionado, así que antes de poner precio tienes que revisar qué límite de renta se aplica a tu piso: la del contrato anterior o el índice de referencia, según el caso. Bien hecho, alquilar sigue siendo sencillo.',
    tips: [OWN_RULES_CAT, 'Ten a mano el contrato anterior del piso si lo has alquilado en los últimos cinco años: lo vas a necesitar para fijar la nueva renta.'],
  },
  {
    slug: 'valencia', name: 'Valencia', region: 'valencia', tension: null,
    intro: 'Valencia combina demanda de familias, profesionales que se mudan y estudiantes. Decide primero a quién quieres alquilar, porque cambia el tipo de contrato, la duración y el perfil que tienes que verificar.',
    tips: [STUDENTS, 'La fianza se deposita ante la Dirección General de Tributos y Juego de la Generalitat Valenciana.'],
  },
  {
    slug: 'sevilla', name: 'Sevilla', region: 'andalucia', tension: null,
    intro: 'En Sevilla conviven barrios muy distintos y rentas muy distintas. Fija el precio comparando con pisos parecidos de tu zona y apóyate en el sistema estatal de índices de referencia para no quedarte corto ni pasarte.',
    tips: ['En Andalucía, según el Ministerio, ahora mismo no hay obligación de depositar la fianza en un organismo público. La fianza sigue siendo obligatoria: la guardas tú y la devuelves al final.', STUDENTS],
  },
  {
    slug: 'malaga', name: 'Málaga', region: 'andalucia', tension: null,
    intro: 'En Málaga muchos propietarios dudan entre alquiler turístico, de temporada y de larga duración. El de vivienda habitual da estabilidad y menos rotación, y con un buen inquilino es el que menos trabajo da.',
    tips: [SHORT_STAY, 'En Andalucía, según el Ministerio, ahora mismo no hay que depositar la fianza en un organismo público. Sigue siendo obligatoria: la guardas tú.'],
  },
  {
    slug: 'zaragoza', name: 'Zaragoza', region: 'aragon', tension: null,
    intro: 'Zaragoza tiene un mercado de alquiler más tranquilo que las grandes capitales, lo que da margen para elegir con calma y cuidar el piso para que dure el inquilino.',
    tips: ['La fianza se deposita en la Dirección General de Vivienda y Rehabilitación del Gobierno de Aragón.', 'Un precio ajustado y un piso bien presentado reducen los meses vacíos, que suelen costar más que bajar un poco la renta.'],
  },
  {
    slug: 'bilbao', name: 'Bilbao', region: 'euskadi', tension: { scope: 'todo el municipio', until: '31 de octubre de 2028' },
    intro: 'Bilbao es zona de mercado residencial tensionado desde octubre de 2025. Eso limita cómo fijas la renta de un contrato nuevo, pero no cambia lo esencial: elegir bien al inquilino y dejarlo todo por escrito.',
    tips: ['La fianza se deposita en el Servicio Vasco de Vivienda.', 'Guarda el contrato anterior del piso: si lo alquilaste en los últimos cinco años, la nueva renta parte de ahí.'],
  },
  {
    slug: 'alicante', name: 'Alicante', region: 'valencia', tension: null,
    intro: 'En Alicante el alquiler de vivienda habitual compite con el vacacional. Si buscas ingresos estables todo el año y menos gestión, un contrato de larga duración con un inquilino verificado suele compensar.',
    tips: [SHORT_STAY, 'La fianza se deposita ante la Dirección General de Tributos y Juego de la Generalitat Valenciana.'],
  },
  {
    slug: 'murcia', name: 'Murcia', region: 'murcia', tension: null,
    intro: 'Murcia tiene una demanda estable de familias y de estudiantes universitarios. Antes de anunciar, decide el perfil que buscas y prepara el piso para él.',
    tips: ['En la Región de Murcia, según el Ministerio, ahora mismo no hay obligación de depositar la fianza en un organismo público. Sigue siendo obligatoria: la guardas tú.', STUDENTS],
  },
  {
    slug: 'palma', name: 'Palma', region: 'baleares', tension: null,
    intro: 'En Palma la vivienda habitual escasea y la demanda de residentes es alta. Alquilar a largo plazo a un inquilino solvente te da estabilidad todo el año, sin temporadas vacías.',
    tips: ['La fianza se deposita en el Instituto Balear de la Vivienda (IBAVI).', SHORT_STAY],
  },
  {
    slug: 'las-palmas-de-gran-canaria', name: 'Las Palmas de Gran Canaria', region: 'canarias', tension: null,
    intro: 'En Las Palmas de Gran Canaria hay demanda de residentes y de profesionales que llegan por trabajo. Un contrato de vivienda habitual bien hecho te ahorra la rotación del alquiler corto.',
    tips: ['La fianza se deposita en el Instituto Canario de la Vivienda.', SHORT_STAY],
  },
  {
    slug: 'valladolid', name: 'Valladolid', region: 'cyl', tension: null,
    intro: 'Valladolid tiene un mercado de alquiler estable, con demanda de familias, funcionarios y estudiantes. Es buen sitio para contratos largos con inquilinos que se quedan años.',
    tips: ['En Castilla y León la fianza se deposita a través del Consejo General de las Cámaras de la Propiedad Urbana de Castilla y León.', STUDENTS],
  },
  {
    slug: 'vitoria-gasteiz', name: 'Vitoria-Gasteiz', region: 'euskadi', tension: { scope: 'el municipio, salvo la zona rural de las entidades locales menores', until: '31 de octubre de 2028' },
    intro: 'Vitoria-Gasteiz es zona de mercado residencial tensionado desde octubre de 2025 (salvo la zona rural de las entidades locales menores). Antes de fijar la renta, revisa el contrato anterior del piso.',
    tips: ['La fianza se deposita en el Servicio Vasco de Vivienda.', 'Comprueba si tu piso está en la trama urbana o en una entidad local menor: la declaración no afecta igual a las dos.'],
  },
  {
    slug: 'donostia-san-sebastian', name: 'Donostia / San Sebastián', region: 'euskadi', tension: { scope: 'todo el municipio', until: '30 de julio de 2028' },
    intro: 'Donostia es zona de mercado residencial tensionado desde julio de 2025. La demanda de vivienda habitual es muy alta, así que el reto no es encontrar inquilino, sino elegir al adecuado y fijar bien la renta.',
    tips: ['La fianza se deposita en el Servicio Vasco de Vivienda.', SHORT_STAY],
  },
  {
    slug: 'pamplona', name: 'Pamplona / Iruña', region: 'navarra', tension: { scope: 'todo el municipio', until: '30 de julio de 2028' },
    intro: 'Pamplona y buena parte de su comarca son zona de mercado residencial tensionado desde julio de 2025. Si alquilas allí, revisa la renta del contrato anterior antes de anunciar.',
    tips: ['En Navarra, según el Ministerio, ahora mismo no hay obligación de depositar la fianza en un organismo público. Sigue siendo obligatoria: la guardas tú.', 'La declaración incluye también municipios del entorno como Burlada, Barañáin, Villava o el Valle de Egüés.'],
  },
  {
    slug: 'a-coruna', name: 'A Coruña', region: 'galicia', tension: { scope: 'todo el municipio', until: '30 de julio de 2028' },
    intro: 'A Coruña es zona de mercado residencial tensionado desde julio de 2025, a petición del propio ayuntamiento. Antes de fijar la renta de un contrato nuevo, mira la del anterior.',
    tips: ['La fianza se deposita en el Instituto Gallego de Vivienda y Suelo (IGVS).', 'Guarda el contrato anterior si alquilaste el piso en los últimos cinco años: es la referencia para la nueva renta.'],
  },
  {
    slug: 'santiago-de-compostela', name: 'Santiago de Compostela', region: 'galicia', tension: { scope: 'todo el municipio', until: '30 de julio de 2029' },
    intro: 'Santiago de Compostela es zona de mercado residencial tensionado desde julio de 2026. Es además ciudad universitaria, así que conviene tener claro si alquilas vivienda habitual o por curso.',
    tips: ['La fianza se deposita en el Instituto Gallego de Vivienda y Suelo (IGVS).', STUDENTS],
  },
  {
    slug: 'gijon', name: 'Gijón', region: 'asturias', tension: { scope: 'los barrios de La Arena y Cimadevilla', until: '30 de julio de 2029' },
    intro: 'En Gijón solo los barrios de La Arena y Cimadevilla son zona de mercado residencial tensionado (desde julio de 2026). Si tu piso está en otro barrio, se aplican las reglas generales.',
    tips: ['En Asturias, según el Ministerio, ahora mismo no hay obligación de depositar la fianza en un organismo público. Sigue siendo obligatoria: la guardas tú.', 'Comprueba en qué barrio está exactamente tu piso antes de fijar la renta.'],
  },
  {
    slug: 'granada', name: 'Granada', region: 'andalucia', tension: null,
    intro: 'Granada es una de las grandes ciudades universitarias de España. Mucha oferta se va al alquiler por curso; si prefieres estabilidad, un contrato de vivienda habitual con un inquilino solvente te ahorra cambios cada verano.',
    tips: [STUDENTS, 'En Andalucía, según el Ministerio, ahora mismo no hay que depositar la fianza en un organismo público. Sigue siendo obligatoria: la guardas tú.'],
  },
  {
    slug: 'cordoba', name: 'Córdoba', region: 'andalucia', tension: null,
    intro: 'Córdoba tiene un mercado de alquiler tranquilo, con inquilinos que suelen buscar quedarse. Un piso cuidado y un precio realista son tu mejor anuncio.',
    tips: ['En Andalucía, según el Ministerio, ahora mismo no hay que depositar la fianza en un organismo público. Sigue siendo obligatoria: la guardas tú.', 'Pide siempre ingresos acreditados, aunque el candidato te dé buena impresión en la visita.'],
  },
  ...moreCities(),
]

// Ciudades añadidas el 20-10-2026 con los mismos datos oficiales (comprobados el 18-10-2026).
// El consejo sobre la fianza se genera a partir de la comunidad para que no se desalinee de REGIONS.
function moreCities(): City[] {
  const CAT_TENSION = { scope: 'todo el municipio', until: '16 de marzo de 2027' }
  const depositTip = (r: RegionId) => {
    const reg: Region = REGIONS[r]
    return reg.deposit
      ? `La fianza se deposita en ${reg.deposit}: hazlo en plazo y guarda el justificante.`
      : `En ${reg.name}, según el Ministerio, ahora mismo no hay obligación de depositar la fianza en un organismo público. Sigue siendo obligatoria: la guardas tú y la devuelves al final.`
  }
  const c = (slug: string, name: string, region: RegionId, tension: City['tension'], intro: string, tip: string): City => ({ slug, name, region, tension, intro, tips: [depositTip(region), tip] })
  const TENSION_TIP = 'Ten a mano el contrato anterior del piso si lo has alquilado en los últimos cinco años: es la referencia para fijar la nueva renta.'
  const INCOME_TIP = 'Pide siempre ingresos acreditados, aunque el candidato te dé buena impresión en la visita.'
  const PRICE_TIP = 'Un precio ajustado a pisos parecidos de tu barrio reduce los meses vacíos, que suelen costar más que bajar un poco la renta.'

  return [
    // Comunidad de Madrid
    c('alcala-de-henares', 'Alcalá de Henares', 'madrid', null, 'Alcalá de Henares combina demanda de familias, trabajadores que se desplazan a Madrid y estudiantes de su universidad. Define bien a quién alquilas antes de anunciar.', STUDENTS),
    c('mostoles', 'Móstoles', 'madrid', null, 'Móstoles es una de las grandes ciudades del sur de Madrid, con mucha demanda de familias y de quien busca precios más contenidos que en la capital.', INCOME_TIP),
    c('getafe', 'Getafe', 'madrid', null, 'Getafe tiene demanda estable de trabajadores y familias, con buena conexión con Madrid. Un contrato de larga duración con un inquilino solvente da tranquilidad.', PRICE_TIP),
    c('leganes', 'Leganés', 'madrid', null, 'En Leganés alquilan sobre todo familias y trabajadores del sur de Madrid. Elegir bien al inquilino importa más que alquilar el primer día.', INCOME_TIP),
    c('alcorcon', 'Alcorcón', 'madrid', null, 'Alcorcón atrae a quien trabaja en Madrid y busca un piso más asequible bien comunicado. La demanda es constante: tómate tu tiempo para elegir.', PRICE_TIP),
    c('fuenlabrada', 'Fuenlabrada', 'madrid', null, 'Fuenlabrada tiene un mercado de alquiler de familias que buscan estabilidad. Un buen inventario con fotos te ahorra discusiones al final del contrato.', INCOME_TIP),
    // Cataluña (zona tensionada según la resolución de 14-3-2024)
    c('lhospitalet-de-llobregat', "L'Hospitalet de Llobregat", 'cataluna', CAT_TENSION, "L'Hospitalet de Llobregat es zona de mercado residencial tensionado. Antes de poner precio, revisa qué límite de renta se aplica a tu piso.", OWN_RULES_CAT),
    c('badalona', 'Badalona', 'cataluna', CAT_TENSION, 'Badalona es zona de mercado residencial tensionado, con mucha demanda de quien trabaja en Barcelona. La renta de un contrato nuevo tiene límites.', OWN_RULES_CAT),
    c('terrassa', 'Terrassa', 'cataluna', CAT_TENSION, 'Terrassa es zona de mercado residencial tensionado. Antes de anunciar, comprueba la renta del contrato anterior y la normativa catalana.', TENSION_TIP),
    c('sabadell', 'Sabadell', 'cataluna', CAT_TENSION, 'Sabadell es zona de mercado residencial tensionado y una de las grandes ciudades del Vallès, con demanda constante de vivienda habitual.', TENSION_TIP),
    c('tarragona', 'Tarragona', 'cataluna', CAT_TENSION, 'Tarragona es zona de mercado residencial tensionado. Si alquilas por temporada o como vivienda habitual, las reglas cambian: decídelo antes de anunciar.', SHORT_STAY),
    c('girona', 'Girona', 'cataluna', CAT_TENSION, 'Girona es zona de mercado residencial tensionado y ciudad universitaria. Ten claro si alquilas vivienda habitual o por curso.', STUDENTS),
    c('lleida', 'Lleida', 'cataluna', CAT_TENSION, 'Lleida es zona de mercado residencial tensionado. Antes de fijar la renta de un contrato nuevo, revisa la del anterior.', TENSION_TIP),
    c('mataro', 'Mataró', 'cataluna', CAT_TENSION, 'Mataró es zona de mercado residencial tensionado, con demanda de quien trabaja en el área de Barcelona y busca costa.', OWN_RULES_CAT),
    c('reus', 'Reus', 'cataluna', CAT_TENSION, 'Reus es zona de mercado residencial tensionado. La renta de un contrato nuevo tiene límites: compruébalos antes de anunciar.', TENSION_TIP),
    c('sant-cugat-del-valles', 'Sant Cugat del Vallès', 'cataluna', CAT_TENSION, 'Sant Cugat del Vallès es zona de mercado residencial tensionado, con mucha demanda de familias. Antes de poner precio, revisa los límites aplicables.', OWN_RULES_CAT),
    // Comunitat Valenciana
    c('elche', 'Elche', 'valencia', null, 'Elche tiene un mercado de alquiler amplio, con demanda de familias, trabajadores y estudiantes universitarios.', STUDENTS),
    c('castellon-de-la-plana', 'Castellón de la Plana', 'valencia', null, 'Castellón de la Plana tiene un mercado de alquiler tranquilo y estable. Un piso cuidado y bien presentado se alquila antes.', PRICE_TIP),
    c('benidorm', 'Benidorm', 'valencia', null, 'En Benidorm el alquiler de vivienda habitual compite con el turístico. Un contrato largo con un inquilino solvente te da ingresos todo el año.', SHORT_STAY),
    // Andalucía
    c('almeria', 'Almería', 'andalucia', null, 'Almería tiene demanda de familias, trabajadores y estudiantes. Pide ingresos acreditados y deja todo por escrito.', INCOME_TIP),
    c('cadiz', 'Cádiz', 'andalucia', null, 'En Cádiz la vivienda habitual compite con el alquiler turístico y de temporada. Decide qué tipo de alquiler quieres antes de anunciar.', SHORT_STAY),
    c('jerez-de-la-frontera', 'Jerez de la Frontera', 'andalucia', null, 'Jerez de la Frontera tiene un mercado de alquiler estable, con inquilinos que buscan quedarse. Cuida el inventario con fotos al firmar.', INCOME_TIP),
    c('huelva', 'Huelva', 'andalucia', null, 'Huelva tiene un mercado de alquiler tranquilo. Un precio realista y un piso cuidado son tu mejor anuncio.', PRICE_TIP),
    c('marbella', 'Marbella', 'andalucia', null, 'En Marbella conviven el alquiler de larga duración, el de temporada y el turístico. Para vivienda habitual, elige un inquilino solvente y contrato LAU.', SHORT_STAY),
    c('jaen', 'Jaén', 'andalucia', null, 'Jaén tiene un mercado de alquiler estable, con demanda de familias, funcionarios y estudiantes.', STUDENTS),
    // País Vasco y Navarra
    c('barakaldo', 'Barakaldo', 'euskadi', { scope: 'todo el municipio', until: '1 de mayo de 2028' }, 'Barakaldo es zona de mercado residencial tensionado desde mayo de 2025. La renta de un contrato nuevo tiene límites: revisa la del contrato anterior.', TENSION_TIP),
    c('irun', 'Irun', 'euskadi', { scope: 'todo el municipio', until: '1 de mayo de 2028' }, 'Irun es zona de mercado residencial tensionado desde mayo de 2025, con demanda de quien trabaja a ambos lados de la frontera.', TENSION_TIP),
    c('tudela', 'Tudela', 'navarra', { scope: 'todo el municipio', until: '30 de julio de 2028' }, 'Tudela es zona de mercado residencial tensionado desde julio de 2025. Antes de fijar la renta, revisa la del contrato anterior del piso.', TENSION_TIP),
    // Galicia y Asturias
    c('vigo', 'Vigo', 'galicia', null, 'Vigo es la ciudad más poblada de Galicia y tiene una demanda de alquiler constante. Elegir bien al inquilino es lo que más protege lo que ganas.', INCOME_TIP),
    c('ourense', 'Ourense', 'galicia', null, 'Ourense tiene un mercado de alquiler tranquilo, con inquilinos que suelen buscar estabilidad.', PRICE_TIP),
    c('lugo', 'Lugo', 'galicia', null, 'Lugo tiene un mercado de alquiler estable, con demanda de familias, funcionarios y estudiantes.', STUDENTS),
    c('pontevedra', 'Pontevedra', 'galicia', null, 'Pontevedra tiene demanda de vivienda habitual de familias y trabajadores. Un contrato largo bien hecho da tranquilidad a las dos partes.', INCOME_TIP),
    c('oviedo', 'Oviedo', 'asturias', null, 'Oviedo tiene un mercado de alquiler estable, con demanda de familias, funcionarios y estudiantes universitarios.', STUDENTS),
    c('aviles', 'Avilés', 'asturias', { scope: 'el barrio de La Magdalena', until: '30 de julio de 2029' }, 'En Avilés solo el barrio de La Magdalena es zona de mercado residencial tensionado (desde julio de 2026). Si tu piso está en otro barrio, se aplican las reglas generales.', 'Comprueba en qué barrio está exactamente tu piso antes de fijar la renta.'),
    // Castilla y León
    c('burgos', 'Burgos', 'cyl', null, 'Burgos tiene un mercado de alquiler estable, con inquilinos que suelen quedarse años. Es buen sitio para contratos largos.', INCOME_TIP),
    c('salamanca', 'Salamanca', 'cyl', null, 'Salamanca es una de las ciudades universitarias más conocidas de España: mucha oferta va al alquiler por curso. Decide si prefieres vivienda habitual o temporada.', STUDENTS),
    c('leon', 'León', 'cyl', null, 'León tiene un mercado de alquiler tranquilo, con demanda de familias, funcionarios y estudiantes.', STUDENTS),
    // Canarias
    c('santa-cruz-de-tenerife', 'Santa Cruz de Tenerife', 'canarias', null, 'En Santa Cruz de Tenerife la vivienda habitual es muy buscada por residentes. Un contrato largo con un inquilino solvente te ahorra la rotación del alquiler corto.', SHORT_STAY),
    // Otras comunidades
    c('santander', 'Santander', 'cantabria', null, 'Santander tiene demanda de vivienda habitual todo el año y de temporada en verano. Decide qué tipo de alquiler encaja con tu piso.', SHORT_STAY),
    c('toledo', 'Toledo', 'clm', null, 'Toledo tiene demanda de funcionarios, familias y de quien trabaja en Madrid. Un precio ajustado y un buen inventario hacen el resto.', PRICE_TIP),
    c('albacete', 'Albacete', 'clm', null, 'Albacete tiene un mercado de alquiler estable, con inquilinos que buscan quedarse. Pide siempre ingresos acreditados.', INCOME_TIP),
    c('badajoz', 'Badajoz', 'extremadura', null, 'Badajoz tiene un mercado de alquiler tranquilo, con demanda de familias, funcionarios y estudiantes.', STUDENTS),
    c('caceres', 'Cáceres', 'extremadura', null, 'Cáceres tiene un mercado de alquiler estable y ciudad universitaria. Ten claro si alquilas vivienda habitual o por curso.', STUDENTS),
    c('logrono', 'Logroño', 'larioja', null, 'Logroño tiene un mercado de alquiler estable, con inquilinos que suelen buscar contratos largos.', PRICE_TIP),
  ]
}

export const cityBySlug = (slug: string) => CITIES.find(c => c.slug === slug)
