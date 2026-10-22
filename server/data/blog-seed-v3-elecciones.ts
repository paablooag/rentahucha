import type { BlogPost } from '#shared/utils/blog'

// Tercera tanda (versión 3): elecciones generales del 29-N y vivienda. Tono estrictamente informativo y neutral:
// se describen normas y propuestas atribuidas a quien las hace, sin valoraciones. Situación a 15 de octubre de 2026
// (decretos aprobados el 6-10-2026 y publicados en el BOE el 7-10-2026, pendientes de convalidación).

type Seed = Omit<BlogPost, 'updatedAt' | 'published'>
const D = '2026-10-15'
const CAT = 'Elecciones 29N'

const NOTA = `> **Actualizado a 20 de octubre de 2026.** Los decretos de vivienda (reales decretos-ley 28/2026 y 29/2026) están pendientes de convalidación por la Diputación Permanente del Congreso. La prensa sitúa la votación el 12 de noviembre, aunque no hay convocatoria oficial y la fecha podría cambiar. Si no se convalidan dentro del plazo, decaen. Consulta siempre el BOE y la web del Congreso. Todas las medidas, en la [guía del decreto para propietarios](/blog/decretos-de-vivienda-octubre-2026-explicados).`

export const BLOG_SEED_V3_ELECCIONES: Seed[] = [
  {
    slug: 'elecciones-29-noviembre-que-esta-en-juego-en-vivienda',
    title: 'Elecciones del 29 de noviembre: qué está en juego en la vivienda',
    excerpt: 'Las generales se adelantan al 29-N y la vivienda es uno de los temas centrales. Te explicamos, sin opiniones, qué normas hay ahora y qué podría cambiar.',
    audience: 'inquilinos',
    category: CAT,
    publishedAt: D,
    body: `El Real Decreto 806/2026, publicado en el BOE el 6 de octubre, disolvió las Cortes y convocó **elecciones generales para el domingo 29 de noviembre de 2026**. La vivienda es uno de los asuntos que más aparece en la campaña.

${NOTA}

## Lo que ya está en vigor y no depende de las elecciones

- **Ley de Arrendamientos Urbanos (LAU)**: contratos de vivienda habitual de al menos 5 años (7 si el casero es una empresa), fianza de un mes y garantía adicional máxima de dos meses.
- **Ley 12/2023 por el derecho a la vivienda**: zonas de mercado residencial tensionado, índice de referencia de precios y gastos de gestión a cargo del propietario.

## Lo que está en el aire

El Gobierno aprobó en octubre dos decretos de vivienda:

| Decreto | Estado a 15 de octubre |
|---|---|
| Medidas urgentes (prórrogas, topes, temporada, fiscalidad, desahucios) | En vigor desde su publicación, pendiente de convalidar |
| Estabilidad de los contratos (renovación automática) | Solo entraría en vigor el 15 de noviembre si se convalida |

## Qué puede cambiar después

El resultado electoral no modifica por sí solo ninguna ley. Los cambios dependen del Gobierno que se forme y de las mayorías en el nuevo Congreso, que tendría que aprobar, modificar o derogar normas.

## Qué te conviene hacer

1. Guarda tu contrato y comprueba su fecha de fin.
2. Si vence pronto, infórmate de las prórrogas que te correspondan en cada momento.
3. Consulta fuentes oficiales (BOE, Ministerio de Vivienda, tu comunidad autónoma) antes de tomar decisiones.`,
  },
  {
    slug: 'elecciones-generales-que-puede-cambiar-para-propietarios',
    title: 'Elecciones generales: qué puede cambiar para los propietarios que alquilan',
    excerpt: 'Prórrogas, topes, fiscalidad y alquiler de temporada: los puntos de la normativa de alquiler que están en discusión antes del 29-N.',
    audience: 'propietarios',
    category: CAT,
    publishedAt: D,
    body: `Si tienes un piso alquilado o piensas alquilarlo, estas son las cuestiones que están sobre la mesa antes de las **elecciones generales del 29 de noviembre de 2026**. Las presentamos de forma descriptiva, sin valorar ninguna propuesta.

${NOTA}

## Los temas que están en discusión

| Tema | Situación actual |
|---|---|
| Duración de los contratos | LAU: 5 años (7 si eres empresa) y 3 de prórroga tácita |
| Subidas de renta | Decreto de octubre: límite del 2 % anual hasta el 31-12-2027, y congelación si superas el índice de referencia |
| Alquiler de temporada | Decreto de octubre: de más de 31 días y hasta 12 meses, con causa justificada |
| Zonas tensionadas | Ley 12/2023: las declara cada comunidad autónoma |
| Fiscalidad | Reducciones del IRPF de la Ley 12/2023, más las nuevas del decreto |

## Lo que proponen los partidos

Las posiciones van desde mantener y ampliar la regulación actual hasta derogar la Ley de Vivienda. Puedes leer un [resumen neutral de las propuestas](/blog/propuestas-de-vivienda-de-los-partidos-resumen-neutral).

## Lo que no cambia el día de las elecciones

- Tu contrato firmado se rige por la ley vigente cuando lo firmaste, salvo que una norma nueva diga expresamente otra cosa.
- Cualquier cambio necesita una votación en el nuevo Congreso, o un decreto que luego se convalide.

## En la práctica

Si vas a firmar ahora, hazlo con un contrato bien redactado y conforme a la normativa vigente ese día. Elegir bien al inquilino y tener una protección frente a impagos te ayuda con cualquier marco legal.`,
  },
  {
    slug: 'decretos-de-vivienda-octubre-2026-explicados',
    title: 'Decreto de vivienda de octubre de 2026 (RDL 29/2026): todo lo que cambia para propietarios, punto por punto',
    excerpt: 'Subidas, prórrogas, temporada, habitaciones, anuncios, garantías, IRPF, IVA, IBI y desahucios: la guía completa del decreto con el texto del BOE, una explicación de cada medida y calculadoras.',
    audience: 'propietarios',
    category: CAT,
    publishedAt: D,
    body: `El Consejo de Ministros aprobó el 6 de octubre de 2026 dos reales decretos-leyes de vivienda, publicados en el BOE el día 7. El **Real Decreto-ley 29/2026** está en vigor desde el **8 de octubre**; el **28/2026** solo entraría en vigor si se convalida. Esta es la guía completa para propietarios, con un enlace a la explicación detallada de cada punto.

${NOTA}

## Resumen rápido

| Tema | Qué cambia | Más detalle |
|---|---|---|
| Subida de la renta | Hasta el 31-12-2027, sin nuevo acuerdo, como máximo un 2 %; y nada si la renta supera el índice de referencia | [IRAV y calculadora de la subida](/herramientas/subida-alquiler-irav) |
| Prórroga extraordinaria | Hasta dos años más si el periodo obligatorio o la prórroga tácita termina antes de 2029 y el inquilino lleva ocho meses al día | [Requisitos y excepciones](/blog/prorroga-extraordinaria-alquiler-2026-quien-puede-pedirla) |
| Temporada | Pasa a ser «vivienda temporal»: causa escrita y probada, más de 31 días y en general hasta 12 meses | [Las nuevas reglas](/blog/alquiler-de-temporada-nuevas-reglas-12-meses) |
| Habitaciones | Alquilar una habitación es alquiler de vivienda; la suma no puede superar la renta del piso completo | [Habitaciones](/blog/alquiler-por-habitaciones-nuevo-limite) |
| Anuncios | Deben incluir, cuando proceda, índice de referencia, límite de renta, número de registro y si eres gran tenedor | [Qué debe incluir tu anuncio](/blog/que-debe-incluir-un-anuncio-de-alquiler-decreto-29-2026) |
| Garantías | Garantía adicional: máximo dos mensualidades (una en temporada); no se puede exigir seguro de impago al inquilino | [Fianza en temporada](/blog/fianza-y-garantia-en-alquiler-de-temporada) |
| Gastos de gestión | No se pueden repercutir al inquilino de ninguna forma | [Cuánto cobra una inmobiliaria](/blog/cuanto-cuesta-gestion-alquiler-inmobiliaria) |
| IBI y tributos | En los contratos nuevos, no pueden imponerse al inquilino | [Quién paga cada gasto](/blog/ibi-comunidad-y-suministros-quien-los-paga) |
| Desistimiento | En los contratos nuevos, si el inquilino se va pasados 6 meses (avisando con 30 días), no hay indemnización | [Si tu inquilino se va antes](/blog/inquilino-quiere-irse-antes-indemnizacion) |
| Fin del contrato | Documento de finalización obligatorio; si no se firma, se presume que el piso se entregó bien | [Plantilla](/blog/documento-finalizacion-contrato-alquiler-plantilla) |
| Gran tenedor | Más de 10 viviendas o 1.500 m² (5 o más en zona tensionada si se declara), con certificado del Registro | [¿Soy gran tenedor?](/blog/como-saber-si-eres-gran-tenedor) |
| IRPF del propietario | Contratos posteriores al 1-12-2026: reducción del 15 % al 100 % según bajes, mantengas o subas la renta | [Calculadora](/herramientas/reduccion-irpf-alquiler) |
| IRPF del inquilino | Deducción del 10 % del alquiler, hasta 1.163 € al año, con base imponible inferior a 33.007,20 € | [Requisitos](/blog/deduccion-irpf-10-por-ciento-inquilinos) |
| IVA de reformas | Desde el 1-12-2026, 10 % en obras de pisos alquilados como vivienda habitual | [Requisitos](/blog/iva-10-reformas-piso-alquilado-diciembre-2026) |
| IVA turístico | Desde el 1-12-2026, los alquileres de 30 noches o menos tributan al 10 % | [Vivienda turística](/blog/vivienda-turistica-iva-ibi-decreto) |
| IBI | Recargos posibles para pisos vacíos más de dos años y turísticos en zona tensionada | [Recargo por piso vacío](/blog/pisos-vacios-recargo-ibi-decreto) |
| Desahucios | Con inquilino vulnerable, la Administración paga o se subroga en la deuda; suspensiones hasta 2030 con excepciones | [Qué dice el decreto](/blog/desahucios-vulnerabilidad-hasta-2030-que-dice-el-decreto) |

## El otro decreto (28/2026): estabilidad de los contratos

Prevé la renovación automática de los contratos al terminar los 5 o 7 años, un preaviso de 6 meses para el propietario y una indemnización si no se renueva sin causa. **No está en vigor**: solo entraría en vigor el 15 de noviembre si se convalida antes.

## Calendario

| Fecha | Qué pasa |
|---|---|
| 8 de octubre de 2026 | Entra en vigor el Real Decreto-ley 29/2026 |
| 12 de noviembre de 2026 | Votación prevista de la convalidación, según la prensa |
| 29 de noviembre de 2026 | Elecciones generales |
| 1 de diciembre de 2026 | Nuevo IRPF del alquiler para contratos posteriores y cambios de IVA |
| 31 de diciembre de 2027 | Fin del límite extraordinario de las subidas |
| 31 de diciembre de 2030 | Fin de las suspensiones de desahucios del decreto |

Si el decreto no se convalida, decae: [qué pasaría](/blog/si-caen-los-decretos-de-vivienda-que-pasaria).

## Qué hacer ahora

- Revisa cuándo cumple año cada contrato y aplica bien la subida.
- Si vas a firmar un contrato nuevo, compara la fiscalidad antes y después del 1 de diciembre.
- Revisa tus anuncios y tu modelo de contrato.
- ¿Quieres saber cuánto pedir con el índice oficial? [Valoración gratis del alquiler](/valoracion-alquiler).

## Fuentes

- BOE: [Real Decreto-ley 29/2026, de 6 de octubre](https://www.boe.es/buscar/act.php?id=BOE-A-2026-20823). Texto consolidado consultado el 22-10-2026.`,
  },
  {
    slug: 'prorroga-extraordinaria-alquiler-2026-quien-puede-pedirla',
    title: 'Prórroga extraordinaria del alquiler: quién puede pedirla y cómo',
    excerpt: 'Si el periodo obligatorio de tu contrato termina antes de 2029, el decreto de octubre te permite pedir hasta dos años más con las mismas condiciones. Requisitos exactos, cuándo puede negarse el propietario y cómo pedirla.',
    audience: 'inquilinos',
    category: CAT,
    publishedAt: D,
    body: `El Real Decreto-ley 29/2026, en vigor desde el 8 de octubre de 2026, permite a muchos inquilinos quedarse más tiempo en su piso.

${NOTA}

## Quién puede pedirla

- Inquilinos con contrato de **vivienda habitual** que estuviera **vigente el 8 de octubre de 2026**.
- Cuyo **periodo de prórroga obligatoria** (los 5 años, o 7 si el propietario es una empresa) **termine antes del 31 de diciembre de 2028**, o a los que se les acabe la prórroga tácita (o la tácita reconducción).
- Que estén **al corriente de pago** y lo hayan estado cada mes durante los **ocho meses anteriores**.

## Qué consigues

- Hasta **dos años más**, por periodos de un año.
- **Mismas condiciones** del contrato actual.

## Cuándo puede negarse el propietario

- Si acordáis otras condiciones o firmáis un contrato nuevo.
- Si renováis o firmáis un contrato nuevo con una renta **al menos un 5 % más baja**.
- Si comunica, en los plazos del artículo 9.3 de la LAU, que **necesita la vivienda para sí o para un familiar**, aunque no lo previera el contrato, siempre que la necesidad sea real y acreditada.

En zona tensionada, si te corresponde la prórroga extraordinaria del artículo 10.3 de la LAU, se aplica esa con preferencia. (Si eres propietario, lee [cuándo puedes negarte](/blog/prorroga-extraordinaria-cuando-puede-negarse-el-propietario).)

## Cómo pedirla

1. Hazlo **por escrito**, con un medio que deje constancia: burofax, correo certificado o email con acuse.
2. Indica tu nombre, la dirección del piso, la fecha del contrato y que solicitas la prórroga extraordinaria del decreto de octubre de 2026.
3. Guarda el justificante.

## Si el decreto no se convalida

Si la Diputación Permanente no lo convalida (la votación está prevista para el 12 de noviembre), la medida decae. Lo que sigue vigente son las prórrogas de la LAU: la obligatoria hasta 5 o 7 años y la tácita de hasta 3 años.

Fuente: BOE, [Real Decreto-ley 29/2026](https://www.boe.es/buscar/act.php?id=BOE-A-2026-20823), disposición final quinta. Consultado el 22-10-2026.`,
  },
  {
    slug: 'limite-2-por-ciento-subida-alquiler-hasta-2027',
    title: '¿Cuánto puede subir el alquiler en 2026 y 2027? El límite del 2 %, explicado',
    excerpt: 'Hasta el 31 de diciembre de 2027, si no hay un nuevo acuerdo la subida anual no puede pasar del 2 %, y si la renta supera el índice de referencia no puede subir nada. Con ejemplos y el texto del BOE.',
    audience: 'propietarios',
    category: CAT,
    publishedAt: D,
    body: `**Respuesta corta:** si la actualización anual de tu contrato cae entre el 8 de octubre de 2026 y el 31 de diciembre de 2027, la renta **no puede subir más de un 2 %** salvo que propietario e inquilino pacten otra cosa, y **no puede subir nada** si ya supera el límite que marca el índice de referencia del precio del alquiler. Lo dice la disposición final sexta del Real Decreto-ley 29/2026.

${NOTA}

## Las dos reglas

| Tu renta respecto al índice de referencia | Qué puedes hacer en la actualización |
|---|---|
| Por encima del límite máximo del índice | No se aplica ninguna subida |
| Igual o por debajo | Lo que pactéis de nuevo; sin nuevo pacto, como máximo un 2 % |

El índice de referencia es el **sistema estatal de índices de referencia del precio del alquiler**, que publica el Ministerio de Vivienda y se consulta en [serpavi.mivau.gob.es](https://serpavi.mivau.gob.es/) con la referencia catastral.

## A qué contratos afecta

A los contratos de alquiler de vivienda sujetos a la Ley de Arrendamientos Urbanos cuya renta toque actualizar porque se cumple una anualidad **entre la entrada en vigor del decreto (8 de octubre de 2026) y el 31 de diciembre de 2027**. Si tu contrato cumple año fuera de esas fechas, no se aplica este límite extraordinario.

## ¿Y el IPC o el IRAV?

El mismo decreto da nueva redacción al artículo 18.1 de la LAU:

- La renta solo se actualiza en la fecha en que se cumple cada año de contrato y en los términos pactados. **Si el contrato no dice nada, no hay actualización.**
- Si el contrato prevé actualizar pero no concreta el índice, se usa el **Índice de Referencia para la Actualización Anual de los Contratos de Arrendamiento de Vivienda (IRAV)**, que publica el INE.
- En todo caso, la subida anual no puede superar la variación del IRAV en la fecha de actualización.

Por eso, una cláusula «se actualizará según el IPC» no basta para subir lo que marque el IPC: hay que comprobar antes los límites vigentes.

## Cómo calcularlo, paso a paso

1. Mira la fecha en que tu contrato cumple año.
2. Consulta el índice de referencia de tu vivienda y compara tu renta con el valor máximo del rango.
3. Si la superas, no hay subida. Si no la superas y no hay nuevo acuerdo, la subida máxima es el 2 %, y nunca más que la variación del IRAV.

## Ejemplos

- **Renta de 800 € por debajo del índice, sin nuevo acuerdo:** subida máxima de 16 € (2 %), y la renta queda en **816 €**. Si la variación del IRAV fuera menor que el 2 %, el tope sería esa variación.
- **Renta de 1.100 € por encima del límite del índice:** no se aplica ninguna subida en esa anualidad.
- **Contrato sin cláusula de actualización:** la renta no se actualiza.

## Consejos

- Comunica la actualización por escrito y con el cálculo.
- No apliques una subida automática por IPC sin comprobar antes el límite vigente.
- Si el decreto no se convalidara, decaería y se volvería a la regla general de la LAU y, en zonas tensionadas, de la Ley 12/2023.

Consulta el último IRAV y calcula tu subida en [IRAV y subida del alquiler](/herramientas/subida-alquiler-irav). ¿Quieres saber si tu renta está bien ajustada? Pide una [valoración gratis del alquiler](/valoracion-alquiler) con pisos comparables de tu zona y el índice oficial.

## Fuentes

- BOE: [Real Decreto-ley 29/2026, de 6 de octubre](https://www.boe.es/buscar/act.php?id=BOE-A-2026-20823), disposición final sexta (limitación extraordinaria de la actualización anual de la renta) y artículo 3 (nueva redacción del artículo 18.1 de la LAU). Consultado el 21-10-2026.
- Ministerio de Vivienda: [sistema estatal de índices de referencia del precio del alquiler](https://serpavi.mivau.gob.es/).`,
  },
  {
    slug: 'que-es-la-diputacion-permanente-y-tu-alquiler',
    title: 'Qué es la Diputación Permanente y por qué decide sobre tu alquiler',
    excerpt: 'Con las Cortes disueltas, un órgano reducido del Congreso vota los decretos de vivienda. Te contamos cómo funciona.',
    audience: 'inquilinos',
    category: CAT,
    publishedAt: D,
    body: `Cuando se convocan elecciones, las Cortes se disuelven. Pero el Congreso no desaparece del todo: queda la **Diputación Permanente**.

## Qué es

- Es un órgano del Congreso con representación de todos los grupos, en proporción a su peso.
- La prevé el **artículo 78 de la Constitución**.
- Funciona mientras las Cámaras están disueltas o fuera del periodo de sesiones.

## Qué hace con los decretos

Un **real decreto-ley** entra en vigor al publicarse en el BOE, pero el Congreso debe **convalidarlo en 30 días**. Con las Cortes disueltas, esa votación la hace la Diputación Permanente:

- **Si se convalida**, el decreto sigue en vigor.
- **Si no se convalida**, decae, aunque lo aplicado mientras estuvo vigente mantiene su efecto.

## Por qué te importa

Los decretos de vivienda de octubre de 2026 (prórrogas, límite del 2 % y alquiler de temporada) dependen de esa votación.

## Dónde seguirlo

- Web del Congreso de los Diputados: orden del día y resultado de las votaciones.
- BOE: publicación de la convalidación o la derogación.`,
  },
  {
    slug: 'renovacion-automatica-contratos-alquiler-segundo-decreto',
    title: 'Renovación automática de los contratos: qué prevé el segundo decreto',
    excerpt: 'Renovación al acabar los 5 o 7 años, preaviso de 6 meses e indemnización: qué dice el decreto de estabilidad y por qué aún no se aplica.',
    audience: 'propietarios',
    category: CAT,
    publishedAt: D,
    body: `El segundo decreto de vivienda de octubre de 2026 regula la **estabilidad de los contratos**. A diferencia del primero, no entró en vigor al publicarse.

${NOTA}

## Qué prevé

- Los contratos de vivienda habitual, cumplidos los 5 años (7 si el propietario es una empresa), se **renovarían automáticamente** por periodos iguales, salvo aviso de alguna de las partes.
- El **preaviso del propietario** pasaría de 4 a 6 meses. El del inquilino seguiría en 2 meses.
- Si el propietario no renueva, pagaría una **indemnización** de al menos 12 mensualidades de una vivienda comparable, según el índice de referencia.

## Cuándo no habría indemnización

- El propietario, persona física, necesita la vivienda para sí, para familiares cercanos o para su excónyuge.
- El inquilino no vive en la vivienda desde hace seis meses, salvo causa justificada.
- El inquilino tiene otra vivienda disponible en el mismo municipio.
- Se firma un contrato nuevo, o se ofrece y el inquilino lo rechaza.

## Estado

Entraría en vigor el **15 de noviembre de 2026** solo si se convalida antes. Hasta entonces sigue aplicándose la LAU: preaviso de 4 meses del propietario y prórroga tácita de hasta 3 años.`,
  },
  {
    slug: 'alquiler-de-temporada-nuevas-reglas-12-meses',
    title: 'Alquiler de temporada con el decreto de octubre de 2026: duración, causa, fianza y qué pasa si falla',
    excerpt: 'Más de 31 días y, en general, hasta 12 meses; causa real escrita en el contrato y probada por el propietario; garantía adicional de una mensualidad como máximo; y el inquilino puede irse tras un mes. Lo que cambia para quien alquila por temporada.',
    audience: 'propietarios',
    category: CAT,
    publishedAt: D,
    body: `El alquiler de temporada sirve para necesidades temporales: estudios, un trabajo por un tiempo, tratamientos médicos u obras en la vivienda propia. Con el Real Decreto-ley 29/2026 pasa a llamarse **arrendamiento de vivienda temporal** y se regula dentro de la Ley de Arrendamientos Urbanos como un alquiler de vivienda, con reglas propias.

${NOTA}

## Las nuevas reglas

| Aspecto | Regla |
|---|---|
| Qué es | Cubre la necesidad de vivienda de quien está **temporalmente desplazado de su domicilio habitual** por una causa justificada y acreditable. Incluye habitaciones |
| Duración | **Más de 31 días** y, como regla general, **hasta 12 meses** (puede prorrogarse por acuerdo si la causa sigue, sin pasar de 12 meses en total salvo que la causa continúe) |
| Causa | Debe figurar **expresamente en el contrato**, ser real y acreditable, y **la prueba corresponde al propietario** |
| Si falta la causa | El contrato pasa a ser de **vivienda habitual desde la firma** (con sus plazos y prórrogas) |
| Encadenar contratos | Más de 12 meses sin justificación, o más de dos contratos seguidos entre las mismas partes en la misma vivienda, convierten el primero en vivienda habitual |
| Garantía adicional | Como máximo **una mensualidad**, además de la fianza |
| Seguro de impago | No se puede exigir al inquilino |
| Desistimiento | El inquilino puede irse pasado **un mes**, avisando con **10 días**, sin indemnización |
| Fin del contrato | Hay que firmar un **documento de finalización** con el estado de la vivienda |

Además, en zona tensionada la renta de contratos temporales sucesivos en la misma vivienda no puede subir más que el IRAV, y la suma de habitaciones no puede superar la renta del piso entero. Las comunidades autónomas pueden tener reglas propias que se aplican en su territorio.

## ¿Y la fianza?

Los contratos de temporada firmados **antes del 8 de octubre de 2026** siguen con su régimen (uso distinto del de vivienda, fianza legal de dos mensualidades) hasta que terminen, y **no se pueden prorrogar**. En los nuevos, como la temporada pasa a ser un arrendamiento de vivienda, la fianza legal sería la de vivienda (**una mensualidad**, artículo 36.1 de la LAU), más una garantía adicional de como máximo otra. Confirma el importe a depositar con el organismo de tu comunidad.

## Cómo documentarlo bien

- Escribe en el contrato la causa concreta: un curso académico, un contrato de trabajo temporal en otra ciudad, una obra en la vivienda habitual del inquilino…
- Guarda un documento que la acredite (matrícula, carta de la empresa, licencia de obra): la carga de la prueba es tuya.
- Fija fechas coherentes con esa causa.

## Si dudas

Si la necesidad del inquilino no es claramente temporal, lo más seguro es firmar un contrato de **vivienda habitual**. Te lo explicamos en la [guía para poner tu piso en alquiler](/blog/como-poner-tu-piso-en-alquiler-paso-a-paso).

## Fuentes

- BOE: [Real Decreto-ley 29/2026, de 6 de octubre](https://www.boe.es/buscar/act.php?id=BOE-A-2026-20823), artículo 3 (nuevos artículos 2.3, 7, 9 bis, 11.2 y 36.5 y 36.7 de la LAU, y disposición transitoria octava). Consultado el 22-10-2026.`,
  },
  {
    slug: 'alquiler-por-habitaciones-nuevo-limite',
    title: 'Alquiler por habitaciones con el decreto de octubre de 2026: el límite de precio y tus derechos',
    excerpt: 'La suma de las habitaciones no puede superar la renta del piso completo, en cualquier municipio. Y alquilar una habitación pasa a ser alquiler de vivienda, con las protecciones de la LAU. Qué cambia si compartes piso.',
    audience: 'inquilinos',
    category: CAT,
    publishedAt: D,
    body: `Compartir piso es la opción de muchas personas jóvenes y trabajadoras desplazadas. El Real Decreto-ley 29/2026 cambia dos cosas importantes para estos alquileres.

${NOTA}

## 1. Una habitación ya es «alquiler de vivienda»

La Ley de Arrendamientos Urbanos incluye ahora expresamente el **arrendamiento parcial de una habitación o estancia**:

- Si la habitación es **tu vivienda habitual**, es un arrendamiento de vivienda habitual, con las reglas de la LAU (duración, prórrogas, fianza de una mensualidad, límites de garantías…).
- Si estás **temporalmente desplazado** (estudios, trabajo por un tiempo), es un arrendamiento de vivienda temporal, con causa escrita en el contrato y, en general, hasta 12 meses: [las reglas de la temporada](/blog/alquiler-de-temporada-nuevas-reglas-12-meses).

## 2. El límite de precio

En **cualquier municipio**, la suma de las rentas de los contratos de habitaciones vigentes a la vez en una vivienda **no puede superar la renta del contrato de alquiler de la vivienda completa**.

En **zonas de mercado residencial tensionado**, además, esa renta (la del piso completo o, si no existe, la suma de las habitaciones) debe respetar los límites de renta de esas zonas.

## Ejemplo

| Piso de 4 habitaciones | Renta |
|---|---|
| Renta del alquiler del piso completo | 1.200 € |
| Suma máxima de las habitaciones alquiladas a la vez | 1.200 € (por ejemplo, 4 × 300 €) |

## Cómo comprobarlo

1. Pregunta cuánto se paga en total por todas las habitaciones.
2. Compáralo con la renta del piso completo (y, en zona tensionada, con la renta del contrato anterior o el índice de referencia).
3. Mira si tu municipio es zona tensionada en las [guías por ciudad](/alquiler).

## Si crees que se supera

- Pide información por escrito al propietario.
- Consulta la oficina de vivienda de tu ayuntamiento o comunidad, o una asociación de consumidores.

Las comunidades autónomas pueden tener normas propias sobre habitaciones, que se aplican en su territorio.

Si vas a compartir, lee [cómo repartir gastos y quién firma el contrato](/blog/compartir-piso-gastos-y-contrato).

## Fuentes

- BOE: [Real Decreto-ley 29/2026, de 6 de octubre](https://www.boe.es/buscar/act.php?id=BOE-A-2026-20823), artículo 3 (nuevos artículos 2, 5.f) y 17.9 de la LAU). Consultado el 22-10-2026.`,
  },
  {
    slug: 'deduccion-irpf-10-por-ciento-inquilinos',
    title: 'Deducción del 10 % del alquiler en el IRPF para inquilinos: requisitos, límites y ejemplos',
    excerpt: 'Con base imponible inferior a 33.007,20 € puedes deducirte el 10 % de lo que pagas de alquiler, hasta 1.163 € al año. Requisitos exactos del BOE, cómo baja el límite según tu base y ejemplos.',
    audience: 'inquilinos',
    category: CAT,
    publishedAt: D,
    body: `El Real Decreto-ley 29/2026 añade al IRPF una **deducción estatal por alquiler de la vivienda habitual**: el **10 %** de lo que pagas de alquiler, con un máximo de **1.163 € al año**, si tu base imponible es inferior a **33.007,20 €**.

${NOTA}

## Requisitos (artículo 68.6 de la Ley del IRPF)

- Que sea el alquiler de tu **vivienda habitual**.
- **Base imponible inferior a 33.007,20 € al año.** Ojo: es la base imponible de tu declaración, no tu sueldo bruto ni tus ingresos totales.
- Que, durante al menos la mitad del año, ni tú ni nadie de tu unidad familiar seáis **propietarios (o usufructuarios) de otra vivienda a menos de 50 km** de la que alquilas, salvo que una resolución administrativa o judicial os impida usarla.

## Cuánto puedes deducir

Se deduce el 10 % de lo pagado, pero sobre una **base máxima** que depende de tu base imponible:

| Tu base imponible | Base máxima de la deducción | Deducción máxima |
|---|---|---|
| Hasta 23.007,20 € | 11.630 € al año | 1.163 € |
| Entre 23.007,20 € y 33.007,20 € | 11.630 € menos 1,163 × (base imponible − 23.007,20 €) | Baja poco a poco hasta 0 € |
| Desde 33.007,20 € | — | Sin deducción |

## Ejemplos

| Base imponible | Alquiler | Base máxima | Deducción |
|---|---|---|---|
| 18.000 € | 800 €/mes (9.600 €/año) | 11.630 € | **960 €** |
| 26.000 € | 800 €/mes (9.600 €/año) | 8.149,37 € | **814,94 €** |
| 30.000 € | 900 €/mes (10.800 €/año) | 3.497,37 € | **349,74 €** |
| 33.500 € | 700 €/mes | 0 € | Sin deducción |

## Desde cuándo

El decreto la introduce con efectos desde su entrada en vigor, el **8 de octubre de 2026**, y depende de que se convalide. Cómo se aplicará exactamente en la declaración (por ejemplo, qué pagos de 2026 cuentan) lo concretará la Agencia Tributaria en la campaña de la renta: consulta su web cuando se publique.

## Qué guardar desde ya

- El contrato de alquiler.
- Los justificantes de pago de cada mes: transferencias o recibos. **Evita pagar en efectivo.**
- El NIF del propietario y la referencia catastral del piso.

## Compatibilidad con otras ayudas

- Muchas comunidades autónomas tienen **deducciones propias** por alquiler, que no dependen de este decreto.
- Hay ayudas directas, como los programas autonómicos del Plan Estatal de Vivienda.

Revisa las condiciones de compatibilidad de cada una.

## Si el decreto no se convalida

La deducción estatal decaería. Las deducciones autonómicas seguirían igual.

¿Buscas piso? Mira [cuánto alquiler puedes pagar con tu sueldo](/herramientas/cuanto-alquiler-puedo-pagar) y [pisos revisados en RentaHucha](/pisos), donde escribes al propietario sin dar tu teléfono.

## Fuentes

- BOE: [Real Decreto-ley 29/2026, de 6 de octubre](https://www.boe.es/buscar/act.php?id=BOE-A-2026-20823), artículo 6 (nuevo apartado 6 del artículo 68 de la Ley del IRPF). Consultado el 22-10-2026.`,
  },
  {
    slug: 'bonificaciones-fiscales-caseros-que-bajan-el-alquiler',
    title: 'Bonificaciones fiscales para caseros que bajan el alquiler',
    excerpt: 'Las reducciones del IRPF de la Ley 12/2023 y el nuevo régimen del decreto de octubre (hasta el 100 %) para propietarios que rebajan la renta o se quedan por debajo del índice.',
    audience: 'propietarios',
    category: CAT,
    publishedAt: D,
    body: `Si alquilas tu vivienda como residencia habitual del inquilino, la fiscalidad premia ciertos comportamientos.

${NOTA}

## Contratos firmados del 26 de mayo de 2023 al 1 de diciembre de 2026 (Ley 12/2023)

| Caso | Reducción del rendimiento neto |
|---|---|
| General | 50 % |
| Obras de rehabilitación en los dos años anteriores | 60 % |
| Primer alquiler a joven de 18 a 35 años en zona tensionada | 70 % |
| Rebaja de más del 5 % en zona tensionada | 90 % |

## Contratos posteriores al 1 de diciembre de 2026 (decreto de octubre)

Si no eres gran tenedor y en el contrato nuevo **rebajas la renta más de un 5 %**:

| Caso | Reducción |
|---|---|
| Mismo inquilino al acabar los cinco años o las prórrogas, o renta por debajo del índice de referencia | 100 % |
| Zona tensionada e inquilino de 18 a 35 años | 95 % |
| Zona tensionada | 90 % |
| Inquilino de 18 a 35 años | 85 % |
| Resto | 70 % |

Si mantienes la renta, un 50 %; si la subes, del 40 % al 15 %. En el primer alquiler de la vivienda, 100 % si la renta queda por debajo del índice. Calcula tu caso con la [calculadora de la reducción del IRPF](/herramientas/reduccion-irpf-alquiler).

## Ejemplo orientativo

Un rendimiento neto de 6.000 € con reducción del 50 % tributa solo por 3.000 €. Si la reducción es mayor, tributa todavía menos.

## Consejo

Guarda los contratos anteriores y posteriores para poder acreditar la rebaja. Consulta con tu asesor fiscal antes de la declaración.`,
  },
  {
    slug: 'desahucios-vulnerabilidad-hasta-2030-que-dice-el-decreto',
    title: 'Desahucios y vulnerabilidad hasta 2030: qué dice el decreto de octubre de 2026 (y qué pasa si eres pequeño propietario)',
    excerpt: 'Enervación extraordinaria con pago de la Administración en los impagos de inquilinos vulnerables, suspensión de lanzamientos hasta 2030, compensación al propietario y excepciones para quien tiene dos viviendas o menos. La norma, explicada sin valoraciones.',
    audience: 'propietarios',
    category: CAT,
    publishedAt: D,
    body: `El Real Decreto-ley 29/2026 regula de tres formas los desahucios de personas en situación de vulnerabilidad, con medidas que en parte llegan **hasta el 31 de diciembre de 2030**. Esto es lo que dice el texto publicado en el BOE.

${NOTA}

## 1. Impago de un inquilino económicamente vulnerable: la Administración paga o se subroga

Es el caso más habitual para un propietario particular. Se añade un apartado 6 al artículo 22 de la Ley de Enjuiciamiento Civil (**enervación extraordinaria**):

1. Si en un desahucio por falta de pago se acredita que el inquilino está en **situación de vulnerabilidad económica**, se comunica a la Administración competente.
2. La Administración tiene **dos meses** (plazo improrrogable) para **ofrecerle una alternativa habitacional** o, si no, **pagar al propietario o consignar en el juzgado todo lo reclamado y lo que se haya devengado**, más las **costas**. Mientras tanto, el procedimiento y el lanzamiento quedan suspendidos.
3. Si paga o consigna en plazo, el procedimiento termina y **el contrato sigue vigente**.
4. Si pasan los dos meses sin alternativa ni pago, **la Administración queda subrogada automáticamente en la posición de deudora** del inquilino, no hay lanzamiento y el contrato sigue hasta que expire, mientras dure la vulnerabilidad.

Si la Administración se retrasa en pagar lo acordado por el tribunal, debe intereses. Esta vía no cuenta como la enervación ordinaria del inquilino y puede darse aunque hayas enviado el requerimiento fehaciente de pago.

## 2. Otros procesos con personas vulnerables sin alternativa habitacional

Cuando no se aplica lo anterior, si la persona demandada es vulnerable (según los servicios sociales o los criterios del artículo 441.7 de la LEC) y no tiene alternativa habitacional:

- El tribunal pide a la Administración que informe de los recursos disponibles y los ofrezca. Si no responde o no los tiene, **suspende el proceso** hasta que se garantice una alternativa, incluso si ya hay sentencia o fecha de lanzamiento (siempre que no se haya ejecutado).
- La suspensión se **revisa cada 12 meses** y se levanta cuando desaparece la vulnerabilidad, se ofrece una alternativa adecuada, la persona la rechaza sin causa justificada o pasan **tres años**.
- **Compensación al propietario** si es **persona física** (o empresa de alquiler asequible o social): como máximo, la **renta dejada de percibir**, los **suministros impagados** y las **costas**, a cargo de la Administración de vivienda. No se compensan el lucro cesante hipotético ni los daños morales. El inquilino sigue debiendo la renta.

### Las excepciones

- **No hay suspensión** si el tribunal aprecia que debe prevalecer la **vulnerabilidad económica o habitacional del propietario** (no se aplica a empresas ni a grandes tenedores).
- **Tampoco prevalece la vulnerabilidad económica del inquilino** cuando el propietario es una **persona física con dos viviendas o menos**.

## 3. Entidades que compran deuda o inmuebles muy por debajo de su valor

Hasta el 31 de diciembre de 2030, cuando demanda una entidad dedicada a adquirir inmuebles o carteras de préstamos impagados a un precio claramente inferior a su valor de mercado, y el ocupante es vulnerable sin alternativa habitacional, **el tribunal suspende el proceso**. No se aplica a las entidades públicas de vivienda social.

## En las demandas

Quien presente la demanda debe indicar si es **gran tenedor** y, si dice que no, aportar un **certificado del Registro de la Propiedad** con las viviendas a su nombre.

## Cómo protegerte como propietario

- Analiza la solvencia del inquilino antes de firmar, con criterios objetivos.
- Documenta todos los pagos y las comunicaciones.
- Actúa pronto si falla un pago: [qué hacer si tu inquilino no paga](/blog/que-hacer-si-tu-inquilino-no-paga).
- Si quieres cubrir más, puedes contratar un seguro de impago por tu cuenta (no se le puede exigir al inquilino).

## Fuentes

- BOE: [Real Decreto-ley 29/2026, de 6 de octubre](https://www.boe.es/buscar/act.php?id=BOE-A-2026-20823), artículos 1 y 2 y artículo 5 (nuevo apartado 6 del artículo 22 de la Ley de Enjuiciamiento Civil). Consultado el 22-10-2026.`,
  },
  {
    slug: 'fondo-tu-casa-prestamos-50000-euros-entrada',
    title: 'Fondo TU CASA: préstamos de hasta 50.000 € para la entrada de tu piso',
    excerpt: 'Hasta el 20 % del valor de la vivienda, sin intereses ni comisiones. Cómo funciona el nuevo fondo para comprar la primera vivienda.',
    audience: 'inquilinos',
    category: CAT,
    publishedAt: D,
    body: `Uno de los grandes obstáculos para dejar el alquiler y comprar es **la entrada**. El decreto de octubre de 2026 crea el fondo **TU CASA**.

${NOTA}

## Cómo funciona, según el resumen oficial

| Característica | Detalle |
|---|---|
| Dotación | 10.000 millones de euros |
| Importe | Hasta el 20 % del valor de la vivienda, con un máximo de 50.000 € |
| Interés | 0 %, sin comisiones |
| Plazo | Hasta 10 años, con carencia mientras dure la hipoteca o hasta 30 años |
| Condiciones | Precio máximo de reventa, y renta por debajo del índice si se alquila |

## Lo que aún falta saber

Los requisitos de acceso concretos, las entidades que lo comercializarán y la fecha de inicio dependen del desarrollo posterior y de la convalidación del decreto.

## Mientras tanto

- Calcula cuánto necesitas: la entrada más un 10–12 % de gastos de compra.
- Revisa los avales para jóvenes de tu comunidad autónoma.
- Sigue ahorrando: lee [cómo ahorrar para la entrada mientras pagas alquiler](/blog/ahorrar-para-la-entrada-de-un-piso-mientras-alquilas).`,
  },
  {
    slug: 'casa-47-empresa-publica-de-vivienda',
    title: 'Casa 47: qué es la empresa pública de vivienda y qué ofrecerá',
    excerpt: 'Inmuebles del Estado y de la Seguridad Social destinados a vivienda asequible, con precios máximos permanentes. Lo que se sabe.',
    audience: 'inquilinos',
    category: CAT,
    publishedAt: D,
    body: `**Casa 47** es la empresa pública estatal de vivienda. El decreto de octubre de 2026 refuerza su papel.

${NOTA}

## Qué es

- Una empresa pública que recibe **inmuebles del Estado y de la Seguridad Social** para destinarlos a vivienda asequible.
- Sus viviendas tienen **precios máximos** iguales a los de la vivienda protegida de cada comunidad. El límite se mantiene también en las ventas futuras.

## Qué puede ofrecer

- Alquiler asequible.
- Venta a precio protegido.

## Cómo enterarte de las convocatorias

- Web del Ministerio de Vivienda y de Casa 47.
- Registros de demandantes de vivienda protegida de tu comunidad autónoma. **Inscríbete**: suele ser requisito para optar.

## Lo que proponen los partidos

Las propuestas sobre vivienda pública varían entre partidos. Consulta el [resumen neutral de propuestas](/blog/propuestas-de-vivienda-de-los-partidos-resumen-neutral).`,
  },
  {
    slug: 'propuestas-de-vivienda-de-los-partidos-resumen-neutral',
    title: 'Propuestas de vivienda de los partidos: resumen neutral para el 29-N',
    excerpt: 'Qué han anunciado los principales partidos sobre alquiler, construcción y fiscalidad, por orden alfabético y sin valoraciones.',
    audience: 'inquilinos',
    category: CAT,
    publishedAt: D,
    body: `Resumimos las propuestas de vivienda **anunciadas públicamente** por los principales partidos de ámbito estatal y por algunos con grupo parlamentario.

> **Importante:** este resumen recoge posiciones anunciadas hasta principios de octubre de 2026, **antes de la publicación de los programas electorales definitivos**. Puede haber cambios. Consulta siempre el programa oficial de cada partido. RentaHucha no tiene afiliación política ni recomienda ningún voto.

Los partidos aparecen **por orden alfabético**.

## ERC
- Mantener los topes en zonas tensionadas y extenderlos a temporada y habitaciones.
- Más parque público y movilización de vivienda vacía de grandes propietarios.
- Rebajar el ITP de la primera vivienda y aplicar una tributación progresiva según el número de viviendas.

## Junts
- Prórrogas extraordinarias solo por acuerdo entre las partes.
- Deducción temporal del 15 % por alquiler, con bases de hasta 33.007,20 €.
- IVA del 5 % para determinada vivienda nueva y desalojo cautelar de ocupaciones sin título.

## PNV
- Prórrogas acotadas, sin renovación automática prolongada para pequeños propietarios.
- Protección de hogares vulnerables y bonificaciones fiscales a caseros.
- IVA del 10 % al alquiler turístico y respeto a las competencias autonómicas.

## Podemos
- Limitar por ley el alquiler al 30 % de la renta familiar.
- Contratos indefinidos con causas tasadas y más protección frente a desahucios.
- Medidas sobre viviendas de fondos de inversión y un inventario de vivienda vacía.

## PP
- Derogar la Ley de Vivienda y eliminar las zonas tensionadas.
- Un millón de viviendas en cuatro años, una nueva Ley del Suelo y silencio positivo a los 90 días.
- Avales de hasta el 95–100 % para jóvenes, IVA reducido en la primera vivienda nueva para jóvenes y desalojos de ocupaciones más rápidos.

## PSOE
- Desarrollar la Ley 12/2023 y ampliar el parque público y protegido.
- Que la vivienda financiada con dinero público siga siendo protegida de forma permanente.
- Casa 47, movilización de suelo estatal y regulación de la temporada y las habitaciones.

## Sumar
- Renovación automática de los contratos tras los 5 o 7 años.
- Regular la temporada y las habitaciones, y más parque público.
- Más fiscalidad a la vivienda turística y limitar la compra de vivienda a personas físicas.

## Vox
- Derogar la Ley 12/2023, liberar suelo y agilizar licencias.
- Eliminar el IVA de la primera vivienda y bonificar al 100 % las donaciones familiares para comprarla.
- Deducciones para jóvenes inquilinos, desalojos más rápidos y criterios de arraigo en la vivienda pública.

## Cómo comparar

Te proponemos [10 preguntas para leer un programa electoral de vivienda](/blog/como-leer-un-programa-electoral-de-vivienda).

*Fuente de partida: resúmenes publicados en medios especializados a partir de declaraciones de los partidos (octubre de 2026).*`,
  },
  {
    slug: 'como-leer-un-programa-electoral-de-vivienda',
    title: 'Cómo leer un programa electoral de vivienda: 10 preguntas útiles',
    excerpt: 'Una guía práctica y neutral para comparar propuestas: plazos, financiación, competencias y efectos en propietarios e inquilinos.',
    audience: 'propietarios',
    category: CAT,
    publishedAt: D,
    body: `Los programas electorales mezclan objetivos, cifras y promesas. Estas preguntas te ayudan a compararlos **con tus propios criterios**, sin que nadie te diga qué votar.

## Las 10 preguntas

1. **¿Qué medida concreta propone?** Distingue un objetivo ("más vivienda") de un instrumento (una ley, un impuesto, una ayuda).
2. **¿Quién tiene la competencia?** Mucha política de vivienda corresponde a comunidades y ayuntamientos. ¿Puede aplicarla el Gobierno central?
3. **¿Con qué norma?** ¿Ley, decreto, presupuesto? ¿Necesita mayoría absoluta o el apoyo de otros grupos?
4. **¿Cuánto cuesta y quién lo paga?** Busca cifras y su fuente de financiación.
5. **¿En qué plazo?** ¿Hay calendario?
6. **¿A quién afecta?** Propietarios particulares, grandes tenedores, inquilinos, compradores, jóvenes…
7. **¿Qué pasa con los contratos ya firmados?** ¿Tiene efecto retroactivo o solo hacia el futuro?
8. **¿Cómo se medirá?** ¿Hay indicadores (precio, oferta, viviendas terminadas)?
9. **¿Hay experiencias previas?** ¿Se ha aplicado algo parecido en otra comunidad o país, y con qué datos?
10. **¿Es compatible con otras propuestas del mismo programa?**

## Dónde encontrar los programas

En la web oficial de cada partido. Las propuestas resumidas en prensa son un punto de partida, pero conviene leer el texto original.

## Resumen de propuestas

Tienes un [resumen neutral por orden alfabético](/blog/propuestas-de-vivienda-de-los-partidos-resumen-neutral).`,
  },
  {
    slug: 'quien-decide-en-vivienda-estado-comunidades-ayuntamientos',
    title: 'Quién decide qué en vivienda: Estado, comunidades y ayuntamientos',
    excerpt: 'Las competencias de vivienda están repartidas. Saber quién decide cada cosa te ayuda a entender qué puede cambiar tras unas elecciones generales.',
    audience: 'inquilinos',
    category: CAT,
    publishedAt: D,
    body: `En España la vivienda es una **competencia compartida**. Por eso muchas medidas dependen de varios niveles de gobierno a la vez.

## Estado

- Legislación civil: la **Ley de Arrendamientos Urbanos** (duración, fianza, prórrogas).
- Ley de Enjuiciamiento Civil: procedimientos de desahucio.
- Impuestos estatales: IRPF (la parte estatal), IVA, Impuesto de Sociedades.
- Planes estatales de vivienda y su financiación.
- La Ley 12/2023, como marco general.

## Comunidades autónomas

- Competencia exclusiva en vivienda según sus estatutos.
- **Declaran las zonas tensionadas.**
- Vivienda protegida, ayudas al alquiler, depósito de fianzas.
- Tramos autonómicos del IRPF e ITP.

## Ayuntamientos

- Urbanismo y licencias.
- IBI, con sus recargos y bonificaciones.
- Vivienda municipal y registros de demandantes.
- Pisos turísticos (licencias y zonificación, según la comunidad).

## Por qué importa en unas generales

Unas elecciones generales cambian el Gobierno central y las Cortes. Muchas medidas solo se aplican si las comunidades y los ayuntamientos las activan, como ocurre con las zonas tensionadas.`,
  },
  {
    slug: 'zonas-tensionadas-que-son-y-donde-se-aplican',
    title: 'Zonas tensionadas: qué son, dónde se aplican y cómo te afectan',
    excerpt: 'Unos 310 municipios declarados, límites a la renta y reglas para grandes tenedores. Cómo saber si tu piso está en una zona tensionada.',
    audience: 'propietarios',
    category: CAT,
    publishedAt: D,
    body: `> **¿Buscas Madrid?** A octubre de 2026 no hay ninguna zona tensionada declarada en la Comunidad de Madrid: [¿es Madrid zona tensionada?](/blog/madrid-zona-tensionada-alquiler). Para otras ciudades, consulta las [guías por ciudad](/alquilar-mi-piso).

La **Ley 12/2023** creó las zonas de mercado residencial tensionado. Las declara cada comunidad autónoma, municipio a municipio o por barrios.

## Requisitos para declararlas

Una de estas dos condiciones:

- La carga media del alquiler o la hipoteca, más los gastos, supera el **30 %** de los ingresos medios de los hogares.
- El precio ha subido **3 puntos más que el IPC** en los últimos cinco años.

## Dónde se aplican

Según datos publicados en octubre de 2026, rondan los **310 municipios**, sobre todo en Cataluña, Asturias, Navarra, País Vasco y Galicia. La lista cambia. Consulta la oficial del **Ministerio de Vivienda** y la resolución de tu comunidad.

## Qué implica para ti

| Tipo de propietario | Contrato nuevo en zona tensionada |
|---|---|
| Pequeño propietario | Renta no superior a la del contrato anterior (con ajustes previstos) |
| Gran tenedor | Renta limitada por el índice de referencia |
| Vivienda sin alquilar en los últimos 5 años | Límite por índice si así lo establece la declaración |

## Ventajas fiscales

En los contratos firmados hasta el 1 de diciembre de 2026, las reducciones más altas del IRPF (70 % y 90 %) están ligadas a la zona tensionada. Para los posteriores, el decreto de octubre fija nuevos porcentajes, de hasta el 100 %: [la reducción del IRPF por alquilar desde diciembre de 2026](/blog/reduccion-irpf-alquiler-vivienda-2027-hasta-100).

## Antes de fijar la renta

Comprueba si tu municipio está declarado y cuál fue la renta del último contrato. Si tienes dudas, consulta a un profesional.

## ¿Mi ciudad es zona tensionada?

- **Madrid**: no hay ninguna zona declarada en la Comunidad de Madrid. Lo explicamos en [¿es Madrid zona tensionada?](/blog/madrid-zona-tensionada-alquiler).
- **Barcelona** y gran parte de Cataluña, y municipios del País Vasco, Navarra, Asturias o Galicia, sí lo son.
- Consulta tu ciudad, con la fecha de comprobación, en las [guías de alquiler por ciudad](/alquilar-mi-piso).`,
  },
  {
    slug: 'ley-de-vivienda-12-2023-en-5-minutos',
    title: 'La Ley de Vivienda 12/2023 en 5 minutos',
    excerpt: 'Gastos de agencia, zonas tensionadas, índice de referencia, gran tenedor y prórrogas: lo esencial de la ley que se debate en campaña.',
    audience: 'inquilinos',
    category: CAT,
    publishedAt: D,
    body: `La Ley 12/2023, de 24 de mayo, por el derecho a la vivienda, es la referencia actual del alquiler en España, junto con la LAU.

## Lo esencial

1. **Gastos de gestión y formalización**: los paga el propietario, no el inquilino.
2. **Zonas tensionadas**: las declaran las comunidades y limitan la renta de los contratos nuevos.
3. **Índice de referencia**: el Sistema Estatal de Referencia de Precios del Alquiler.
4. **Gran tenedor**: en general, quien tiene más de 10 viviendas, o 5 o más en una zona tensionada si así se declara.
5. **Prórroga extraordinaria**: hasta 3 años en zona tensionada, en ciertos casos, al terminar el contrato.
6. **Actualización de rentas**: límites temporales del 2 % (2023) y del 3 % (2024), y un índice propio desde 2025.
7. **Incentivos fiscales**: reducciones del IRPF para caseros, de hasta el 100 % en los contratos nuevos desde diciembre de 2026 si se convalida el decreto.
8. **Información previa**: el inquilino puede pedir datos sobre la vivienda y su renta.

## Por qué se habla de ella en campaña

Algunos partidos proponen desarrollarla y otros derogarla. Puedes ver un [resumen neutral de propuestas](/blog/propuestas-de-vivienda-de-los-partidos-resumen-neutral).

## Recuerda

Una ley solo se modifica o se deroga con otra norma aprobada en el Congreso. Hasta entonces, se aplica.`,
  },
  {
    slug: 'si-cambia-el-gobierno-cambia-mi-contrato-de-alquiler',
    title: '¿Si cambia el Gobierno, cambia mi contrato de alquiler?',
    excerpt: 'Qué protege tu contrato firmado, qué podría afectarte y cómo funcionan los cambios de ley con los contratos ya en vigor.',
    audience: 'inquilinos',
    category: CAT,
    publishedAt: D,
    body: `Es una de las preguntas más repetidas antes de unas elecciones. La respuesta corta: **tu contrato no cambia el día de las elecciones**.

## La regla general

Los contratos se rigen por la ley **vigente cuando se firmaron**. Las leyes nuevas suelen aplicarse a los contratos futuros, salvo que digan expresamente otra cosa mediante disposiciones transitorias.

## Lo que sí puede afectarte

- **Prórrogas extraordinarias y topes temporales**: suelen tener fechas concretas y aplicarse también a contratos vigentes.
- **Impuestos**: deducciones o reducciones en el IRPF que cambian de un año a otro.
- **Ayudas**: convocatorias que dependen de presupuestos.

## Lo que no cambia

- La **duración mínima** de tu contrato según la ley con la que lo firmaste.
- La **fianza** y las condiciones pactadas.

## Qué hacer

1. Ten a mano tu contrato y su fecha de firma.
2. Apunta las fechas clave: actualización anual, fin del contrato y plazos de preaviso.
3. Ante cualquier cambio, consulta una fuente oficial o la oficina de vivienda de tu zona.`,
  },
  {
    slug: 'firmar-alquiler-ahora-o-despues-de-las-elecciones',
    title: '¿Firmar un alquiler ahora o esperar a después de las elecciones?',
    excerpt: 'Pros y contras objetivos de firmar antes o después del 29-N si tienes un piso para alquilar, y por qué el 1 de diciembre de 2026 importa para tu IRPF. Sin predicciones: solo hechos.',
    audience: 'propietarios',
    category: CAT,
    publishedAt: D,
    body: `Hay propietarios que dudan si alquilar ya o esperar al resultado electoral. No podemos saber qué Gobierno se formará, pero sí ordenar los hechos.

## Lo que sabemos

- Un contrato se rige por la normativa **vigente al firmarlo**.
- Hoy rige la LAU, la Ley 12/2023 y, mientras esté convalidado, el decreto de octubre de 2026.
- Cualquier cambio posterior necesitará una votación en el nuevo Congreso, y formar Gobierno puede llevar semanas o meses.

## Cosas a tener en cuenta

| Firmar ahora | Esperar |
|---|---|
| Ingresas desde ya | Cada mes vacío es renta que no recuperas |
| Normas conocidas | Incertidumbre sobre plazos y contenidos |
| Contrato estable para ambos | Posibles cambios, en cualquier dirección |

## Las fechas que ya están en el calendario

| Fecha | Qué pasa |
|---|---|
| 8 de octubre de 2026 | Entra en vigor el Real Decreto-ley 29/2026 (pendiente de convalidación) |
| 12 de noviembre de 2026 | Votación prevista de la convalidación, según la prensa (sin convocatoria oficial a esta fecha) |
| 29 de noviembre de 2026 | Elecciones generales |
| 1 de diciembre de 2026 | Fecha de corte de la nueva reducción del IRPF por alquiler (ver abajo) |
| 31 de diciembre de 2027 | Fin del límite extraordinario del 2 % a la actualización de rentas |

## Una fecha que sí cambia las cuentas: el 1 de diciembre (IRPF)

Si el decreto se convalida, la reducción del IRPF por alquilar vivienda depende de **cuándo firmes**:

- **Contratos firmados hasta el 1 de diciembre de 2026**: se mantiene el régimen de la Ley 12/2023 (en general, un 50 %; hasta un 90 % en ciertos casos de zona tensionada).
- **Contratos firmados después**: el nuevo régimen, que premia **bajar la renta** o quedarse por debajo del índice de referencia (hasta el 100 %) y reduce mucho la ventaja si la **subes** respecto al contrato anterior (del 40 % al 15 %).

En la práctica, según el plan que tengas:

| Si vas a… | Te conviene mirar |
|---|---|
| Subir la renta respecto al último contrato | Firmar antes del 1 de diciembre mantiene la reducción general del 50 % |
| Mantener la renta | En los dos casos, en general, un 50 % |
| Bajarla más de un 5 % o quedarte por debajo del índice | Después del 1 de diciembre puedes llegar al 70 %-100 % |

Calcula tu caso con la [calculadora de la reducción del IRPF](/herramientas/reduccion-irpf-alquiler), que compara las dos fechas. Los detalles, con tablas y ejemplos, en [la reducción del IRPF por alquilar desde diciembre de 2026](/blog/reduccion-irpf-alquiler-vivienda-2027-hasta-100). Si el decreto no se convalida, decae y no cambia nada de esto.

## El coste de esperar

Un piso de 900 € vacío dos meses supone **1.800 €** que no se recuperan. Más información en [cuánto cuesta tener un piso vacío](/blog/cuanto-cuesta-tener-un-piso-vacio).

## Lo que conviene en cualquier caso

- Un contrato bien redactado y conforme a la normativa del día de la firma.
- Un buen análisis del inquilino.
- Una **protección frente a impagos**, útil con cualquier marco legal.`,
  },
  {
    slug: 'vivienda-turistica-iva-ibi-decreto',
    title: 'Vivienda turística: el IVA y los recargos de IBI del decreto',
    excerpt: 'IVA del 10 % en ciertos alquileres turísticos y recargos de IBI de hasta el 150 %. Qué cambia si alquilas por días.',
    audience: 'propietarios',
    category: CAT,
    publishedAt: D,
    body: `El decreto de octubre de 2026 incluye medidas fiscales sobre el alquiler turístico.

${NOTA}

## IVA

Pasan a tributar al **10 % de IVA** los alquileres de viviendas amuebladas cuando:

- El propietario presta servicios de tipo hotelero, o
- Las estancias son de **30 noches o menos**.

## IBI

En los municipios situados en una **zona de mercado residencial tensionado**, los ayuntamientos podrán aplicar **recargos** en el IBI a las viviendas destinadas a alojamiento turístico (identificadas según la normativa de cada comunidad):

| Viviendas turísticas del titular | Recargo máximo sobre la cuota |
|---|---|
| Una | Hasta el 50 % |
| Dos o más | Hasta el 100 % |
| Cuatro o más | Hasta el 150 % |

Es una facultad municipal: cada ayuntamiento decide si lo aplica en su ordenanza. Fuera de las zonas tensionadas, este recargo no se aplica. Se devenga el 31 de diciembre y se liquida cada año.

Fuente: BOE: [Real Decreto-ley 29/2026, de 6 de octubre](https://www.boe.es/buscar/act.php?id=BOE-A-2026-20823), artículo 8 (nuevos apartados 4 bis y 4 ter del artículo 72 del texto refundido de la Ley Reguladora de las Haciendas Locales). Consultado el 22-10-2026.

## Opciones si tienes un piso turístico

- Mantenerlo, con los nuevos costes.
- Pasarlo a **alquiler de vivienda habitual**, con reducciones del IRPF de hasta el 100 % según el caso.
- Alquilarlo por **temporada**, cumpliendo las nuevas reglas de más de 31 días a 12 meses con causa.

Haz números con tu asesor antes de decidir.`,
  },
  {
    slug: 'pisos-vacios-recargo-ibi-decreto',
    title: 'Recargo del IBI por piso vacío: a quién afecta, cuánto es y cómo evitarlo (decreto de octubre de 2026)',
    excerpt: 'Los ayuntamientos pueden subir el IBI de los pisos vacíos más de dos años sin causa justificada: hasta un 50 %, 100 % o 150 % según la zona y cuántos pisos tengas. En zona tensionada, también a quien tiene uno solo. Causas que lo evitan.',
    audience: 'propietarios',
    category: CAT,
    publishedAt: D,
    body: `**Respuesta corta:** si tu piso lleva **más de dos años vacío sin causa justificada**, tu ayuntamiento puede aplicarte un **recargo en el IBI**. Fuera de las zonas tensionadas solo afecta a quien tiene **cuatro o más** viviendas; **en zona tensionada puede afectar a cualquier propietario**, aunque tenga un solo piso. Cada ayuntamiento decide si lo aplica.

${NOTA}

## Cuándo un piso cuenta como «desocupado con carácter permanente»

Cuando permanece vacío **de forma continuada y sin causa justificada más de dos años**, según los requisitos, pruebas y procedimiento que fije la ordenanza fiscal de tu ayuntamiento. Antes de declararlo, el ayuntamiento tiene que **darte audiencia** y acreditar indicios de desocupación (por ejemplo, el padrón o los consumos de agua y luz).

## Cuánto puede ser el recargo

### Si tu municipio no es zona tensionada

Solo se aplica a titulares de **cuatro o más** viviendas:

| Situación | Recargo máximo sobre la cuota del IBI |
|---|---|
| Vacío más de 2 años | Hasta el 50 % |
| Vacío más de 3 años | Hasta el 100 % |
| Además, con dos o más viviendas vacías en el mismo municipio | Hasta 50 puntos más |

### Si tu municipio es zona tensionada

| Situación | Recargo máximo |
|---|---|
| Cualquier propietario, vacío más de 2 años | Hasta el 50 % |
| Titular de cuatro o más viviendas | Hasta el 100 % |
| Titular de cuatro o más, vacío más de 3 años | Hasta 50 puntos más |

¿No sabes si tu municipio es zona tensionada? Míralo en las [guías por ciudad](/alquilar-mi-piso).

## Causas que lo evitan

La norma considera **en todo caso** justificadas, entre otras:

- **Ofrecerlo en alquiler** en condiciones de mercado, con un **máximo de seis meses** en esa situación.
- Ofrecerlo **en venta** en condiciones de mercado, con un máximo de **un año**.
- **Segunda residencia**, con un máximo de **cuatro años** de desocupación continuada.
- **Obras o rehabilitación**, u otras circunstancias que impidan ocuparlo.
- Traslado temporal por **trabajo o formación**, o cambio de domicilio por **dependencia, salud o emergencia social**.
- Un **litigio** o procedimiento pendiente que impida usarlo.

Ojo con el alquiler: tenerlo anunciado solo te cubre **seis meses**. Si en ese tiempo no se alquila, quizá el precio está por encima del mercado.

## Cuándo se cobra

El recargo se devenga el **31 de diciembre** y el ayuntamiento lo liquida cada año, junto con el acto que declara el piso desocupado.

## Más allá del recargo

Un piso vacío ya te cuesta IBI, comunidad, seguro y suministros mínimos: calcula [cuánto te cuesta un piso vacío](/blog/cuanto-cuesta-tener-un-piso-vacio). Si lo alquilas como vivienda habitual, además, en los contratos posteriores al 1 de diciembre de 2026 la reducción del IRPF puede llegar al 100 % si la renta queda por debajo del índice de referencia: [calcúlalo](/herramientas/reduccion-irpf-alquiler).

## Si quieres alquilarlo

Pide una [valoración gratis del alquiler](/valoracion-alquiler) para ponerle un precio que se alquile, y [publícalo gratis en RentaHucha](/cuenta/registro): revisamos el anuncio y los interesados te escriben por chat.

## Fuentes

- BOE: [Real Decreto-ley 29/2026, de 6 de octubre](https://www.boe.es/buscar/act.php?id=BOE-A-2026-20823), artículo 8 (nuevos apartados 4 bis y 4 ter del artículo 72 del texto refundido de la Ley Reguladora de las Haciendas Locales). Consultado el 22-10-2026.`,
  },
  {
    slug: 'glosario-de-vivienda-para-entender-la-campana',
    title: 'Glosario de vivienda para entender la campaña electoral',
    excerpt: 'Gran tenedor, índice de referencia, prórroga tácita, VPO, SOCIMI, convalidación… Los términos que más vas a oír, explicados en una línea.',
    audience: 'inquilinos',
    category: CAT,
    publishedAt: D,
    body: `En campaña se repiten muchos términos técnicos. Aquí van, explicados de forma sencilla.

| Término | Qué significa |
|---|---|
| **LAU** | Ley de Arrendamientos Urbanos (1994, reformada en 2019): reglas básicas del alquiler |
| **Ley 12/2023** | Ley por el derecho a la vivienda |
| **Zona tensionada** | Zona con precios altos donde se limitan las rentas de los contratos nuevos |
| **Índice de referencia** | Rango de precios oficial del alquiler por vivienda y zona (Ministerio de Vivienda) |
| **Gran tenedor** | En general, quien tiene más de 10 viviendas (o 5 o más en zona tensionada, si se declara) |
| **Prórroga obligatoria** | Tiempo que el contrato dura si el inquilino quiere: 5 o 7 años |
| **Prórroga tácita** | Hasta 3 años más si nadie avisa |
| **Prórroga extraordinaria** | Ampliación excepcional prevista en una ley o decreto |
| **Fianza** | Un mes de renta en vivienda, depositada en tu comunidad (en temporada, ver las reglas del decreto de octubre) |
| **Garantía adicional** | Hasta dos meses más en vivienda habitual |
| **VPO / vivienda protegida** | Vivienda con precio limitado y requisitos de acceso |
| **SOCIMI** | Sociedad cotizada que invierte en inmuebles en alquiler |
| **Real decreto-ley** | Norma del Gobierno con rango de ley, que el Congreso debe convalidar en 30 días |
| **Convalidación** | Votación del Congreso que confirma un decreto-ley |
| **Diputación Permanente** | Órgano del Congreso que actúa con las Cortes disueltas |
| **Casa 47** | Empresa pública estatal de vivienda |
| **Desahucio / lanzamiento** | Procedimiento judicial y entrega forzosa de la vivienda |

¿Quieres más contexto? Lee [qué está en juego en la vivienda el 29-N](/blog/elecciones-29-noviembre-que-esta-en-juego-en-vivienda).`,
  },
  {
    slug: 'calendario-vivienda-fechas-clave-hasta-2030',
    title: 'Calendario de la vivienda: fechas clave de aquí a 2030',
    excerpt: 'Convalidación, elecciones, plazos de los decretos y vencimientos de las medidas temporales, en una sola tabla.',
    audience: 'propietarios',
    category: CAT,
    publishedAt: D,
    body: `Si alquilas un piso, estas fechas pueden afectarte. Las recogemos según la normativa publicada a 15 de octubre de 2026.

${NOTA}

| Fecha | Qué pasa |
|---|---|
| 6-10-2026 | Disolución de las Cortes y convocatoria electoral (RD 806/2026) |
| 7-10-2026 | Publicación en el BOE de los decretos de vivienda; entra en vigor el de medidas urgentes |
| 11-11-2026 | Huelga general por la vivienda (24 horas) |
| 12-11-2026 | Votación prevista de convalidación en la Diputación Permanente (aplazada desde el 16 de octubre) |
| 15-11-2026 | Entraría en vigor el decreto de estabilidad de contratos, si se convalida |
| 29-11-2026 | Elecciones generales |
| 31-12-2027 | Fin del límite del 2 % y de la congelación por encima del índice |
| 31-12-2028 | Último vencimiento de contrato con derecho a la prórroga extraordinaria |
| 31-12-2030 | Fin de la suspensión de desahucios de vulnerables y de los límites a compras por debajo del 70 % |

## Fechas que dependen de tu contrato

- **Actualización anual**: la fecha de aniversario del contrato.
- **Preaviso de no renovación**: 4 meses antes del fin, en tu caso (LAU).
- **Fin de la prórroga obligatoria**: 5 años desde la firma (7 si eres empresa).

Apunta estas fechas en tu calendario y revisa las novedades después de la votación prevista para el 12 de noviembre.`,
  },
]
