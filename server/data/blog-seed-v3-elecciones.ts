import type { BlogPost } from '#shared/utils/blog'

// Tercera tanda (versión 3): elecciones generales del 29-N y vivienda. Tono estrictamente informativo y neutral:
// se describen normas y propuestas atribuidas a quien las hace, sin valoraciones. Situación a 15 de octubre de 2026
// (decretos aprobados el 6-10-2026 y publicados en el BOE el 7-10-2026, pendientes de convalidación).

type Seed = Omit<BlogPost, 'updatedAt' | 'published'>
const D = '2026-10-15'
const CAT = 'Elecciones 29N'

const NOTA = `> **Actualizado a 15 de octubre de 2026.** Los decretos de vivienda están pendientes de convalidación por la Diputación Permanente del Congreso. Si no se convalidan, decaen. Consulta siempre el BOE para la versión vigente.`

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
| Alquiler de temporada | Decreto de octubre: entre 31 días y 12 meses, con causa justificada |
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
    title: 'Los decretos de vivienda de octubre de 2026, explicados punto por punto',
    excerpt: 'Prórrogas extraordinarias, límite del 2 %, temporada, habitaciones, fiscalidad y desahucios: qué incluye cada decreto y en qué estado está.',
    audience: 'propietarios',
    category: CAT,
    publishedAt: D,
    body: `El Consejo de Ministros aprobó el 6 de octubre de 2026 dos decretos de vivienda, publicados en el BOE el día 7. Estas son sus medidas principales, según el resumen oficial del Gobierno.

${NOTA}

## Decreto 1: medidas urgentes (en vigor desde el 7 de octubre)

**Alquiler**
- **Prórroga extraordinaria**: los contratos que venzan hasta el 31-12-2028 pueden prorrogarse hasta dos años más, por periodos anuales y en las mismas condiciones, si el inquilino lo pide y está al corriente de pago en los ocho meses anteriores.
- **Subidas**: hasta el 31-12-2027 no se puede subir la renta si supera el índice de referencia. Si está por debajo, la subida máxima es del 2 %, salvo acuerdo.
- **Temporada**: entre 31 días y 12 meses, y el propietario debe justificar el motivo temporal. Encadenar más de dos contratos los convierte en contrato de vivienda habitual.
- **Habitaciones**: en zonas tensionadas, la suma de lo que se cobra por las habitaciones no puede superar la renta del piso completo.

**Fiscalidad**
- Deducción del 10 % en el IRPF para inquilinos con ingresos inferiores a 33.007,20 €.
- Deducciones de hasta el 100 % para el casero, si no es gran tenedor, que rebaje la renta más de un 5 % en determinados casos.
- Posibles recargos de IBI para viviendas turísticas y para pisos vacíos de quien tenga muchos.

**Otras medidas**: suspensión de desahucios de hogares vulnerables hasta 2030 (con excepciones), límites a compras por debajo del 70 % del valor de mercado, la empresa pública Casa 47 y el fondo TU CASA.

## Decreto 2: estabilidad de los contratos (no en vigor)

Prevé la renovación automática de los contratos al terminar los 5 o 7 años y un preaviso de 6 meses para el propietario. También fija una indemnización si no se renueva sin causa. Solo entraría en vigor el 15 de noviembre si la Diputación Permanente lo convalida antes.

## Qué hacer

Revisa el vencimiento de tus contratos y guarda los justificantes de pago. Consulta el BOE o a un profesional antes de negarte a una prórroga.`,
  },
  {
    slug: 'prorroga-extraordinaria-alquiler-2026-quien-puede-pedirla',
    title: 'Prórroga extraordinaria del alquiler: quién puede pedirla y cómo',
    excerpt: 'Si tu contrato vence antes de 2029, el decreto de octubre te permite pedir hasta dos años más con las mismas condiciones. Requisitos y modelo de solicitud.',
    audience: 'inquilinos',
    category: CAT,
    publishedAt: D,
    body: `El decreto de vivienda en vigor desde el 7 de octubre de 2026 permite a muchos inquilinos quedarse más tiempo en su piso.

${NOTA}

## Quién puede pedirla

- Inquilinos con contrato de **vivienda habitual**.
- Cuyo contrato venza **hasta el 31 de diciembre de 2028**.
- Que estén **al corriente de pago** en los ocho meses anteriores.

## Qué consigues

- Hasta **dos años más**, por periodos de un año.
- **Mismas condiciones** del contrato actual.

## Cuándo puede negarse el propietario

- Si acordáis otras condiciones.
- Si acredita que necesita la vivienda (en los casos previstos en la norma).

## Cómo pedirla

1. Hazlo **por escrito**, con un medio que deje constancia: burofax, correo certificado o email con acuse.
2. Indica tu nombre, la dirección del piso, la fecha del contrato y que solicitas la prórroga extraordinaria del decreto de octubre de 2026.
3. Guarda el justificante.

## Si el decreto no se convalida

Si el 16 de octubre la Diputación Permanente no lo convalida, la medida decae. Lo que sigue vigente son las prórrogas de la LAU: la obligatoria hasta 5 o 7 años y la tácita de hasta 3 años.`,
  },
  {
    slug: 'limite-2-por-ciento-subida-alquiler-hasta-2027',
    title: 'Límite del 2 % a la subida del alquiler hasta 2027: cómo se aplica',
    excerpt: 'Qué rentas quedan congeladas, cuáles pueden subir hasta un 2 % y qué pasa con los contratos referenciados al IPC.',
    audience: 'propietarios',
    category: CAT,
    publishedAt: D,
    body: `El decreto de octubre de 2026 fija un límite a la actualización anual de la renta **hasta el 31 de diciembre de 2027**.

${NOTA}

## Las dos reglas

| Tu renta respecto al índice de referencia | Qué puedes hacer en la actualización |
|---|---|
| Por encima del límite del índice | No puedes subirla |
| Por debajo | Subida máxima del 2 %, salvo acuerdo |

El índice de referencia es el **Sistema Estatal de Referencia de Precios del Alquiler**, que publica el Ministerio de Vivienda.

## Cómo calcularlo

1. Consulta el índice para tu vivienda: superficie, zona y características.
2. Compara tu renta con el valor máximo del rango.
3. Aplica la regla que te corresponda en la fecha de actualización del contrato.

## Ejemplo

Renta de 800 € por debajo del índice: la actualización máxima es de 16 € (2 %), y la nueva renta queda en **816 €**.

## Consejos

- Comunica la actualización por escrito y con el cálculo.
- No apliques una subida automática por IPC sin comprobar antes el límite vigente.
- Si el decreto no se convalidara, se volvería a la regla general: lo pactado en el contrato y, en zonas tensionadas, la Ley 12/2023.`,
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
    title: 'Alquiler de temporada: nuevas reglas de duración y justificación',
    excerpt: 'Entre 31 días y 12 meses, con motivo temporal justificado y límite a encadenar contratos. Lo que cambia para quien alquila por temporada.',
    audience: 'propietarios',
    category: CAT,
    publishedAt: D,
    body: `El alquiler de temporada sirve para necesidades temporales: estudios, trabajo por un tiempo, tratamientos médicos u obras en la vivienda propia. El decreto de octubre de 2026 concreta sus reglas.

${NOTA}

## Las nuevas reglas

| Aspecto | Regla |
|---|---|
| Duración | Entre 31 días y 12 meses |
| Causa | El propietario debe justificar el motivo temporal del inquilino |
| Encadenar contratos | Más de dos seguidos se convierten en contrato de vivienda habitual (LAU) |

## Cómo documentarlo bien

- Indica en el contrato la causa concreta: por ejemplo, un curso académico, un contrato de trabajo temporal o una obra en la vivienda propia.
- Adjunta un documento que la acredite: matrícula, carta de la empresa, licencia de obra…
- Fija fechas de entrada y salida coherentes con esa causa.

## Lo que no cambia

- La fianza en temporada sigue siendo de **dos mensualidades** (uso distinto de vivienda).
- Si el inquilino usa el piso como vivienda habitual, el contrato puede considerarse de vivienda, se llame como se llame.

## Si dudas

Si la necesidad del inquilino no es claramente temporal, lo más seguro es firmar un contrato de vivienda habitual.`,
  },
  {
    slug: 'alquiler-por-habitaciones-nuevo-limite',
    title: 'Alquiler por habitaciones: el nuevo límite de precio, explicado',
    excerpt: 'En zonas tensionadas, la suma de las habitaciones no puede superar la renta del piso completo. Qué significa si compartes piso.',
    audience: 'inquilinos',
    category: CAT,
    publishedAt: D,
    body: `Compartir piso es la opción de muchas personas jóvenes y trabajadoras desplazadas. El decreto de octubre de 2026 introduce una regla nueva para estos alquileres.

${NOTA}

## La regla

En **zonas de mercado residencial tensionado**, la suma de las rentas de todas las habitaciones **no puede superar** la renta que tendría el piso alquilado completo.

## Ejemplo

| Piso de 4 habitaciones | Renta |
|---|---|
| Renta máxima del piso completo | 1.200 € |
| Suma máxima de las habitaciones | 1.200 € (por ejemplo, 4 × 300 €) |

## Cómo comprobarlo

1. Averigua si tu municipio está declarado zona tensionada: lo publica tu comunidad autónoma y el Ministerio de Vivienda.
2. Pregunta cuánto se paga en total por todas las habitaciones.
3. Compara con el índice de referencia del piso entero.

## Si crees que se supera

- Pide información por escrito al propietario.
- Consulta la oficina de vivienda de tu ayuntamiento o comunidad, o una asociación de consumidores.

## Además

Si vas a compartir, lee [cómo repartir gastos y quién firma el contrato](/blog/compartir-piso-gastos-y-contrato).`,
  },
  {
    slug: 'deduccion-irpf-10-por-ciento-inquilinos',
    title: 'Nueva deducción del 10 % en el IRPF para inquilinos: requisitos',
    excerpt: 'Ingresos por debajo de 33.007,20 € y alquiler de vivienda habitual: quién podría aplicarla y qué guardar desde ya.',
    audience: 'inquilinos',
    category: CAT,
    publishedAt: D,
    body: `El decreto de vivienda de octubre de 2026 incluye una **deducción estatal del 10 %** en el IRPF por el alquiler de la vivienda habitual.

${NOTA}

## Requisitos principales

- Alquiler de tu **vivienda habitual**.
- Ingresos inferiores a **33.007,20 €**.

Los detalles exactos (base máxima, periodo y forma de declararlo) están en el texto del BOE y se desarrollarán en la campaña de la renta. Consulta la información de la Agencia Tributaria cuando se publique.

## Qué guardar desde ya

- El contrato de alquiler.
- Los justificantes de pago de cada mes: transferencias o recibos. **Evita pagar en efectivo.**
- El NIF del propietario y la referencia catastral del piso.

## Compatibilidad con otras ayudas

- Muchas comunidades autónomas tienen **deducciones propias** por alquiler.
- Hay ayudas directas, como los programas autonómicos del Plan Estatal de Vivienda.

Revisa las condiciones de compatibilidad de cada una.

## Si el decreto no se convalida

La deducción estatal decaería. Las deducciones autonómicas no dependen de este decreto.`,
  },
  {
    slug: 'bonificaciones-fiscales-caseros-que-bajan-el-alquiler',
    title: 'Bonificaciones fiscales para caseros que bajan el alquiler',
    excerpt: 'Las reducciones de la Ley 12/2023 y las nuevas deducciones del decreto para propietarios que rebajan la renta más de un 5 %.',
    audience: 'propietarios',
    category: CAT,
    publishedAt: D,
    body: `Si alquilas tu vivienda como residencia habitual del inquilino, la fiscalidad premia ciertos comportamientos.

${NOTA}

## Lo que ya existe (Ley 12/2023, contratos desde 2024)

| Caso | Reducción del rendimiento neto |
|---|---|
| General | 50 % |
| Obras de rehabilitación en los dos años anteriores | 60 % |
| Primer alquiler a joven de 18 a 35 años en zona tensionada | 70 % |
| Rebaja de más del 5 % en zona tensionada | 90 % |

## Lo que añade el decreto de octubre de 2026

Deducciones de **hasta el 100 %** para propietarios que no sean grandes tenedores, cuando un contrato nuevo rebaja la renta más de un 5 %:

- Con el mismo inquilino, al terminar los cinco años o la última prórroga.
- Con un inquilino nuevo, si la renta queda por debajo del límite del índice de referencia.

## Ejemplo orientativo

Un rendimiento neto de 6.000 € con reducción del 50 % tributa solo por 3.000 €. Si la reducción es mayor, tributa todavía menos.

## Consejo

Guarda los contratos anteriores y posteriores para poder acreditar la rebaja. Consulta con tu asesor fiscal antes de la declaración.`,
  },
  {
    slug: 'desahucios-vulnerabilidad-hasta-2030-que-dice-el-decreto',
    title: 'Desahucios y vulnerabilidad hasta 2030: qué dice el decreto',
    excerpt: 'Suspensión de lanzamientos, compensación al propietario y excepciones para pequeños caseros vulnerables. La norma, explicada sin valoraciones.',
    audience: 'propietarios',
    category: CAT,
    publishedAt: D,
    body: `El decreto de octubre de 2026 regula la suspensión de desahucios de hogares vulnerables **hasta el 31 de diciembre de 2030**.

${NOTA}

## Qué prevé

- Suspensión del procedimiento cuando el demandante es una entidad que compró la deuda por debajo del valor de mercado y el ocupante es vulnerable sin alternativa habitacional.
- Suspensión en otros casos si la Administración no ofrece una alternativa habitacional.
- **Compensación** al demandante (personas físicas y entidades de alquiler asequible): rentas dejadas de percibir, suministros impagados y costas, a cargo de la Administración de vivienda.
- En los impagos, la comunidad autónoma tiene **dos meses** para pagar lo necesario y detener el desahucio. Si no lo hace, el proceso continúa.

## Excepción

No hay suspensión si el propietario acredita que **también es vulnerable** y tiene **dos viviendas o menos**.

## Cómo protegerte como propietario

- Analiza la solvencia del inquilino antes de firmar.
- Valora un **seguro de impago**: según su póliza, cobras aunque haya un procedimiento judicial.
- Documenta todos los pagos y las comunicaciones.

Más información en [qué hacer si tu inquilino no paga](/blog/que-hacer-si-tu-inquilino-no-paga).`,
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
    body: `La **Ley 12/2023** creó las zonas de mercado residencial tensionado. Las declara cada comunidad autónoma, municipio a municipio o por barrios.

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

En zona tensionada se aplican las reducciones más altas del IRPF, del 70 % y el 90 %, en los casos previstos.

## Antes de fijar la renta

Comprueba si tu municipio está declarado y cuál fue la renta del último contrato. Si tienes dudas, consulta a un profesional.`,
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
4. **Gran tenedor**: en general, quien tiene más de 10 viviendas, o más de 5 en una zona tensionada si así se declara.
5. **Prórroga extraordinaria**: hasta 3 años en zona tensionada, en ciertos casos, al terminar el contrato.
6. **Actualización de rentas**: límites temporales del 2 % (2023) y del 3 % (2024), y un índice propio desde 2025.
7. **Incentivos fiscales**: reducciones del IRPF del 50 % al 90 % para caseros.
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
    excerpt: 'Pros y contras objetivos de firmar antes o después del 29-N si tienes un piso para alquilar. Sin predicciones: solo hechos.',
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

Los ayuntamientos podrán aplicar **recargos** a las viviendas de uso turístico:

| Viviendas turísticas del propietario | Recargo máximo |
|---|---|
| Una | Hasta el 50 % |
| Dos o más | Hasta el 100 % |
| Cuatro o más | Hasta el 150 % |

Es una facultad municipal: cada ayuntamiento decide si lo aplica.

## Opciones si tienes un piso turístico

- Mantenerlo, con los nuevos costes.
- Pasarlo a **alquiler de vivienda habitual**, con reducciones del IRPF del 50 % al 90 %.
- Alquilarlo por **temporada**, cumpliendo las nuevas reglas de 31 días a 12 meses con causa.

Haz números con tu asesor antes de decidir.`,
  },
  {
    slug: 'pisos-vacios-recargo-ibi-decreto',
    title: 'Pisos vacíos: el recargo de IBI y cuándo se considera desocupado',
    excerpt: 'Recargos de hasta el 150 % para quien tiene cuatro o más viviendas vacías más de tres años. A quién afecta y a quién no.',
    audience: 'propietarios',
    category: CAT,
    publishedAt: D,
    body: `Desde la Ley 12/2023, los ayuntamientos pueden aplicar un **recargo en el IBI** a las viviendas desocupadas de forma permanente. El decreto de octubre de 2026 lo ajusta.

${NOTA}

## Lo que prevé

- Recargo de **hasta el 150 %** para propietarios con **cuatro o más viviendas** vacías durante **más de tres años**.
- Lo aplica cada ayuntamiento mediante su ordenanza fiscal.

## A quién no afecta

- Al propietario de una vivienda vacía por un tiempo corto.
- A las segundas residencias en uso, los traslados por trabajo o salud, las viviendas en venta o alquiler dentro de plazos razonables y las que están en obras, según las causas justificadas que recoja la normativa.

## Más allá del recargo

Un piso vacío también te cuesta IBI, comunidad, seguro y suministros mínimos. Calcula [cuánto te cuesta un piso vacío](/blog/cuanto-cuesta-tener-un-piso-vacio).

## Si quieres alquilarlo con tranquilidad

Con RentaHucha alquilas a inquilinos verificados, la hucha del inquilino pasa a ti si hay un impago y te beneficias de las reducciones del IRPF del alquiler de vivienda.`,
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
| **Gran tenedor** | En general, quien tiene más de 10 viviendas (o más de 5 en zona tensionada, si se declara) |
| **Prórroga obligatoria** | Tiempo que el contrato dura si el inquilino quiere: 5 o 7 años |
| **Prórroga tácita** | Hasta 3 años más si nadie avisa |
| **Prórroga extraordinaria** | Ampliación excepcional prevista en una ley o decreto |
| **Fianza** | Un mes de renta (dos en temporada), depositada en tu comunidad |
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
| 16-10-2026 | Votación prevista de convalidación en la Diputación Permanente |
| 15-11-2026 | Entraría en vigor el decreto de estabilidad de contratos, si se convalida |
| 29-11-2026 | Elecciones generales |
| 31-12-2027 | Fin del límite del 2 % y de la congelación por encima del índice |
| 31-12-2028 | Último vencimiento de contrato con derecho a la prórroga extraordinaria |
| 31-12-2030 | Fin de la suspensión de desahucios de vulnerables y de los límites a compras por debajo del 70 % |

## Fechas que dependen de tu contrato

- **Actualización anual**: la fecha de aniversario del contrato.
- **Preaviso de no renovación**: 4 meses antes del fin, en tu caso (LAU).
- **Fin de la prórroga obligatoria**: 5 años desde la firma (7 si eres empresa).

Apunta estas fechas en tu calendario y revisa las novedades después de la votación del 16 de octubre.`,
  },
]
