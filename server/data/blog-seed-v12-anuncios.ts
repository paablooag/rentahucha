import type { BlogPost } from '#shared/utils/blog'

// Duodécima versión del contenido inicial: lo que debe incluir un anuncio de alquiler desde el Real Decreto-ley 29/2026
// (art. 20, BOE 7-10-2026). Texto comprobado en el BOE el 21-10-2026; la convalidación sigue pendiente.

type Seed = Omit<BlogPost, 'updatedAt' | 'published'>
const D = '2026-10-21'
const CAT = 'Actualidad'
const AL_DIA = `> **Actualizado a 21 de octubre de 2026.** El Real Decreto-ley 29/2026 está en vigor desde el 8 de octubre, pero tiene que ser convalidado por el Congreso (con las Cortes disueltas, por su Diputación Permanente). La prensa sitúa la votación el 12 de noviembre, sin convocatoria oficial publicada a esta fecha. Si no se convalida, decae. Actualizaremos este artículo con el resultado.`

const ART20 = `## Lo que dice la norma

El artículo 20 del Real Decreto-ley 29/2026, «Publicidad de los arrendamientos», establece dos cosas:

1. La publicidad, promoción u oferta de alquiler de viviendas debe ajustarse a los principios de **veracidad y transparencia** y **no puede omitir ni distorsionar información relevante** que pueda inducir a error.
2. Toda oferta o publicidad de alquiler debe incluir, **al menos**:
   - **a)** El **índice de referencia del precio del alquiler**, siempre que la vivienda esté en una **zona de mercado residencial tensionado**.
   - **b)** En los ámbitos con **limitación legal de la renta**, el **límite de renta aplicable** y la referencia a la normativa y parámetros que lo fijan.
   - **c)** El **número, código o título identificativo** de la vivienda, cuando proceda.
   - **d)** La condición de **gran tenedor** del arrendador, cuando proceda.`

const FUENTES = `## Fuentes

- BOE: [Real Decreto-ley 29/2026, de 6 de octubre](https://www.boe.es/buscar/act.php?id=BOE-A-2026-20823) (BOE núm. 249, de 7 de octubre de 2026), artículo 20 y artículo 3 (modificación del artículo 20 de la Ley de Arrendamientos Urbanos). Texto consolidado consultado el 21-10-2026.
- idealista/news: [Todo sobre las nuevas obligaciones para anunciar una vivienda en alquiler en portales o redes sociales](https://www.idealista.com/news/inmobiliario/vivienda/2026/10/19/919386-todo-sobre-las-nuevas-obligaciones-para-anunciar-una-vivienda-en-alquiler-en) (19-10-2026).
- OCU: [Cambios en el alquiler desde el 8 de octubre](https://www.ocu.org/fincas-y-casas/gestion/alquiler/analisis/2026/10/nuevas-reglas-del-alquiler).
- Ministerio de Vivienda: [Sistema estatal de índices de referencia del precio del alquiler (SERPAVI)](https://serpavi.mivau.gob.es/).`

export const BLOG_SEED_V12_ANUNCIOS: Seed[] = [
  {
    slug: 'que-debe-incluir-un-anuncio-de-alquiler-decreto-29-2026',
    title: 'Qué debe incluir tu anuncio de alquiler desde el 8 de octubre (Real Decreto-ley 29/2026)',
    excerpt: 'Índice de referencia, límite de renta, número de registro y si eres gran tenedor: lo que exige el nuevo decreto a cualquier anuncio de alquiler, explicado con el texto del BOE.',
    audience: 'propietarios',
    category: CAT,
    publishedAt: D,
    body: `Si vas a anunciar tu piso en alquiler, hay **datos nuevos que el anuncio debe llevar** desde el 8 de octubre de 2026. Los introduce el artículo 20 del Real Decreto-ley 29/2026 y se aplican a toda oferta o publicidad de alquiler de vivienda, la publique un particular o una inmobiliaria.

${AL_DIA}

${ART20}

## Qué significa en la práctica

### Si tu piso está en zona tensionada
Tienes que indicar el **índice de referencia del precio** que corresponde a tu vivienda. Lo calcula el [sistema estatal de índices del Ministerio de Vivienda (SERPAVI)](https://serpavi.mivau.gob.es/) a partir de la referencia catastral. Si además se aplica un **límite de renta** (por ejemplo, el de la renta del contrato anterior), el anuncio debe decir cuál es y en qué norma se basa.

¿No sabes si tu municipio es zona tensionada? Las declaraciones vigentes las publica el Ministerio de Vivienda. En nuestras [guías por ciudad](/alquilar-mi-piso) indicamos, para cada ciudad, si figura en la lista y la fecha en que lo comprobamos.

### Si tu vivienda tiene un número de registro
Si la vivienda tiene un número o código identificativo (como los códigos municipales o autonómicos, o el del registro de arrendamientos cuando se aplique), debe aparecer en el anuncio. El propio decreto pone como ejemplo los códigos de las viviendas de uso turístico.

### Si eres gran tenedor
Debes indicarlo en el anuncio.

### Siempre
El anuncio debe ser **veraz**: no puede omitir ni distorsionar información relevante. Según los abogados consultados por idealista, eso incluye no falsear la superficie, la luminosidad o el mobiliario.

## ¿Y los anuncios que ya estaban publicados?

El artículo 20 no prevé un periodo de adaptación. Según los abogados consultados por idealista, los anuncios ya publicados también deben actualizarse.

## Gastos de gestión: tampoco al inquilino

El mismo decreto da nueva redacción al artículo 20 de la Ley de Arrendamientos Urbanos: los **gastos de gestión inmobiliaria y de formalización del contrato no pueden repercutirse al inquilino**, «ni directa ni indirectamente, bajo ningún concepto o denominación». Cualquier otro servicio no esencial solo puede cobrarse al inquilino si lo ha pedido por escrito, sabiendo antes que es opcional y lo que cuesta.

## ¿Hay sanciones?

El artículo 20 no fija sanciones propias. El decreto se remite a las competencias de inspección y sanción de las administraciones públicas, que en publicidad y consumo suelen ser las comunidades autónomas. Según idealista, quien detecte un anuncio incompleto puede pedir que se corrija a quien lo publica y acudir a los servicios de consumo o de vivienda de su comunidad o ayuntamiento.

## Cómo lo hacemos en RentaHucha

Al publicar tu piso en RentaHucha, el formulario tiene un apartado de **datos legales del anuncio** (índice de referencia, límite de renta, número de registro y gran tenedor). Si tu ciudad está en nuestra lista, te avisamos de si el Ministerio la declara zona tensionada. Revisamos cada anuncio antes de publicarlo.

- [Publica tu piso gratis](/cuenta/registro): el anuncio y el chat ya funcionan en la beta.
- ¿Dudas con el precio? Pide una [valoración del alquiler](/valoracion-alquiler).
- Prepara el texto con el [generador de anuncios](/herramientas/generador-anuncio).

${FUENTES}`,
  },
  {
    slug: 'anuncios-de-alquiler-inmobiliarias-decreto-29-2026',
    title: 'Inmobiliarias: cómo adaptar los anuncios de alquiler al Real Decreto-ley 29/2026',
    excerpt: 'El artículo 20 del decreto obliga a incluir el índice de referencia, el límite de renta, el número de registro y la condición de gran tenedor. Una lista de comprobación para tu cartera.',
    audience: 'inmobiliarias',
    category: CAT,
    publishedAt: D,
    body: `Desde el 8 de octubre de 2026, los anuncios de alquiler de vivienda tienen que incluir datos que antes no eran obligatorios. Si gestionas una cartera de alquileres, conviene revisar los anuncios publicados y la ficha de captación de cada piso.

${AL_DIA}

${ART20}

## Lista de comprobación para cada piso de la cartera

1. **¿Está en zona tensionada?** Compruébalo en las declaraciones vigentes del Ministerio de Vivienda. Si lo está, añade al anuncio el índice de referencia del [SERPAVI](https://serpavi.mivau.gob.es/) para esa vivienda.
2. **¿Hay limitación de renta?** Si se aplica, indica el límite y la norma o los parámetros que lo determinan.
3. **¿Tiene número o código identificativo?** Inclúyelo, cuando proceda.
4. **¿El propietario es gran tenedor?** Pídeselo por escrito al firmar el encargo y, si lo es, indícalo en el anuncio.
5. **¿El anuncio es veraz?** Superficie, estado y mobiliario tal como son. La norma prohíbe omitir o distorsionar información relevante.
6. **¿Cobras algo al inquilino?** Los gastos de gestión inmobiliaria y de formalización no pueden repercutirse al inquilino (nuevo artículo 20 de la LAU). Un servicio no esencial solo puede cobrarse si el inquilino lo pide por escrito, informado antes de que es opcional y de su precio.

Según los abogados consultados por idealista, la obligación alcanza a cualquier canal donde se anuncie el piso, incluido el escaparate de la agencia, y los anuncios ya publicados también deben actualizarse.

## Añade los datos a tu hoja de captación

La forma más sencilla de no olvidarlos es pedirlos al propietario el mismo día de la captación: referencia catastral (para calcular el índice), renta del último contrato si lo hubo, código de registro si existe y la declaración de si es gran tenedor.

## En RentaHucha

Las inmobiliarias pueden [crear una cuenta](/cuenta/registro?tipo=inmobiliaria) y publicar sus pisos con su nombre comercial. El formulario de cada anuncio incluye los datos del artículo 20, y revisamos los anuncios antes de publicarlos. Más información en la [página para inmobiliarias](/inmobiliarias).

${FUENTES}`,
  },
  {
    slug: 'anuncio-de-alquiler-que-datos-debe-darte-decreto-29-2026',
    title: 'Buscas piso: qué datos debe darte ahora un anuncio de alquiler',
    excerpt: 'Desde el 8 de octubre, los anuncios deben indicar el índice de referencia del precio en zonas tensionadas, el límite de renta aplicable y más. Qué mirar y qué hacer si faltan.',
    audience: 'inquilinos',
    category: CAT,
    publishedAt: D,
    body: `Si estás buscando piso, los anuncios de alquiler tienen que darte más información desde el 8 de octubre de 2026. Te sirve para saber si el precio que piden respeta los límites de tu zona.

${AL_DIA}

${ART20}

## Qué mirar en cada anuncio

- **En zona tensionada**, el anuncio debe decir el **índice de referencia** del precio. Compáralo con la renta que piden.
- **Si hay límite de renta**, el anuncio debe indicarlo y decir en qué norma se basa.
- **Gastos de gestión:** según el nuevo artículo 20 de la Ley de Arrendamientos Urbanos, los gastos de gestión inmobiliaria y de formalización del contrato no pueden cobrarse al inquilino. Un servicio extra solo puede cobrarse si lo pides tú por escrito, sabiendo antes que es opcional y su precio.

## Si faltan datos

Según idealista, puedes pedir que se corrija a quien publica el anuncio (el propietario, la agencia o el portal) y, si no lo hace, acudir a los servicios de consumo o de vivienda de tu comunidad autónoma o tu ayuntamiento. Si pagaste honorarios que no correspondían, puedes reclamar su devolución.

## Antes de escribir al propietario

- Calcula [cuánto alquiler puedes pagar con tu sueldo](/herramientas/cuanto-alquiler-puedo-pagar).
- Prepara tu [carta de presentación](/herramientas/carta-inquilino).
- Busca [pisos revisados en RentaHucha](/pisos): revisamos cada anuncio antes de publicarlo y puedes escribir al propietario sin dar tu teléfono.

${FUENTES}`,
  },
]
