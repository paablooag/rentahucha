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

const SHORT_STAY = 'Si piensas en alquiler de temporada o turístico, desde julio de 2025 necesitas el número del Registro Único de Arrendamientos para anunciarlo. Para vivienda habitual con contrato LAU no hace falta.'
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
]

export const cityBySlug = (slug: string) => CITIES.find(c => c.slug === slug)
