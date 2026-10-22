import type { BlogPost } from '#shared/utils/blog'

// Décima versión del contenido inicial (I): actualidad de octubre de 2026 — acampadas por la vivienda, huelga general
// del 11 de noviembre, decretos pendientes de votación, protestas en Francia y vivienda en Europa. Tono informativo
// y neutral: hechos atribuidos a su fuente, posiciones de cada parte y nada de opiniones. Situación a 18-10-2026.

type Seed = Omit<BlogPost, 'updatedAt' | 'published'>
const D = '2026-10-18'
const CAT = 'Actualidad'
const AL_DIA = `> **Actualizado a 18 de octubre de 2026.** Es un tema en evolución: consulta las fuentes oficiales y los medios para las novedades.`
const CTA_INQ = `¿Buscas piso? Con RentaHucha alquilas con inquilinos verificados como tú y una hucha que recuperas con bonus. [Apúntate](/apuntate?tipo=inquilino#formulario).`
const CTA_PROP = `¿Tienes un piso? Alquílalo a inquilinos verificados y con una hucha que responde si hay impago. [Apúntate](/apuntate?tipo=propietario#formulario).`

export const BLOG_SEED_V10_ACTUALIDAD_A: Seed[] = [
  {
    slug: 'acampada-de-sol-por-la-vivienda-que-es-y-que-piden',
    title: 'La acampada de Sol por la vivienda: qué es, qué piden y cómo empezó',
    excerpt: 'Desde finales de septiembre, cientos de personas acampan en la Puerta del Sol para reclamar medidas de vivienda. Te lo contamos con datos y sin opiniones.',
    audience: 'inquilinos',
    category: CAT,
    publishedAt: D,
    body: `La Puerta del Sol de Madrid acoge desde finales de septiembre de 2026 una acampada por el derecho a la vivienda que ya supera las tres semanas.

${AL_DIA}

## Cómo empezó

Según la agencia EFE, la acampada comenzó la noche del **26 de septiembre**, tras una manifestación convocada por el Sindicato de Inquilinas de Madrid en protesta por un desahucio. Ese caso se convirtió en símbolo de las dificultades de acceso a la vivienda.

## Qué piden

Según la información publicada, las personas acampadas reclaman al Gobierno medidas urgentes:

- **Renovación** de los contratos de alquiler.
- **Suspensión de los desalojos** sin alternativa habitacional.
- Que los partidos concreten sus propuestas de vivienda antes de las elecciones del **29 de noviembre**.

## Las distintas posiciones

| Parte | Posición publicada |
|---|---|
| Personas acampadas | Mantener la protesta sin fecha de fin |
| Comunidad de Madrid | Considera la acampada ilegal y ha pedido su desalojo |
| Tribunal Superior de Justicia de Madrid | Según la información publicada, rechazó la petición de disolución |
| Sindicato de Inquilinas | La impulsó al inicio y dejó de permanecer en ella el 2 de octubre |

## No es la única

Según EFE, hay una veintena de acampadas similares en el centro de ciudades españolas, como la de **plaza Catalunya** en Barcelona. Lee [las acampadas por la vivienda en España](/blog/acampadas-por-la-vivienda-en-espana-ciudades).

## Qué viene ahora

- **11 de noviembre**: huelga general por la vivienda. Lee [qué es y cómo te afecta](/blog/huelga-general-por-la-vivienda-11-noviembre).
- **12 de noviembre**: votación prevista de los decretos de vivienda.
- **29 de noviembre**: elecciones generales.

## Preguntas frecuentes

### ¿Es legal acampar en una plaza como protesta?
El derecho de reunión está reconocido en la Constitución y las concentraciones en lugares públicos se comunican a la autoridad. Si una acampada puede mantenerse o no es una cuestión que, en caso de conflicto, deciden las autoridades y los tribunales.

### ¿Qué relación tiene con mi alquiler?
Ninguna directa: tu contrato se rige por la ley vigente. Pero las reivindicaciones tocan temas que pueden cambiar con nuevas normas, como la renovación de contratos.

### ¿Dónde informarme de forma fiable?
En los medios de comunicación, la web del Congreso para la votación de los decretos y el BOE para las normas aprobadas.

${CTA_INQ}`,
  },
  {
    slug: 'acampadas-por-la-vivienda-en-espana-ciudades',
    title: 'Acampadas por la vivienda en España: de Sol a plaza Catalunya',
    excerpt: 'Madrid, Barcelona, Bilbao, Santander, Murcia, Málaga… Un mapa de las acampadas por la vivienda y de cómo se organizan.',
    audience: 'inquilinos',
    category: CAT,
    publishedAt: D,
    body: `Tras la acampada de la Puerta del Sol, iniciada a finales de septiembre, se sumaron otras en el centro de varias ciudades. Según la agencia EFE, ya son una veintena.

${AL_DIA}

## Algunas de ellas

| Ciudad | Lugar | Lo publicado |
|---|---|---|
| Madrid | Puerta del Sol | Desde el 26 de septiembre; supera las tres semanas |
| Barcelona | Plaza Catalunya | Desde el 29 de septiembre; pasó de unas 40 a unas 120 tiendas en pocos días |
| Bilbao, Santander, Murcia, Málaga | Centros urbanos | Acampadas citadas por la prensa como parte del mismo movimiento |

## Cómo se organizan

Según las crónicas publicadas, funcionan con **asambleas**, **turnos** y **reparto de tareas**. En Barcelona, el Sindicat de Llogateres no impulsó la acampada pero la respalda.

## Qué reclaman

Acceso a una vivienda digna, medidas contra los desahucios sin alternativa y la convalidación de los decretos de vivienda aprobados por el Gobierno en octubre.

## Para entender el contexto

- [La acampada de Sol: qué es y qué piden](/blog/acampada-de-sol-por-la-vivienda-que-es-y-que-piden)
- [Los decretos de vivienda, explicados](/blog/decretos-de-vivienda-octubre-2026-explicados)
- [La votación de los decretos, prevista para el 12 de noviembre](/blog/decretos-de-vivienda-votacion-12-noviembre)

${CTA_INQ}`,
  },
  {
    slug: 'huelga-general-por-la-vivienda-11-noviembre',
    title: 'Huelga general por la vivienda del 11 de noviembre: qué es y cómo te afecta',
    excerpt: 'Una huelga de 24 horas convocada por sindicatos e inquilinos, la primera general de jornada completa desde 2012. Quién la convoca y qué debes saber.',
    audience: 'inquilinos',
    category: CAT,
    publishedAt: D,
    body: `Varias organizaciones sindicales y de inquilinos han convocado una **huelga general de 24 horas el miércoles 11 de noviembre de 2026** por la situación de la vivienda.

${AL_DIA}

## Quién la convoca

Según la información publicada, la convocan la Confederación de Sindicatos de Inquilinas, **CCOO** y **UGT**, con el apoyo de otras organizaciones como CGT, ELA, LAB, CIG, Cobas o Solidaridad Obrera. CSIF ha anunciado que no la secundará.

## Por qué es noticia

- Sería la primera huelga general de jornada completa en España desde 2012.
- Cae **18 días antes** de las elecciones generales del 29 de noviembre.
- Según la prensa, la patronal CEOE cuestiona su legalidad y estudia un recurso. El Gobierno debe fijar los **servicios mínimos**.

## Si trabajas por cuenta ajena

- **Hacer huelga es un derecho** reconocido en la Constitución.
- No tienes que avisar a tu empresa de que vas a secundarla.
- Ese día no cobras el salario y se suspende la cotización de esa jornada.
- Si te asignan **servicios mínimos**, debes cumplirlos.

Más detalle en [tus derechos en una huelga general](/blog/huelga-general-derechos-de-los-trabajadores).

## ¿Afecta a tu alquiler?

No. Tu contrato y tus obligaciones de pago no cambian. Lo vemos en [huelga general y alquiler](/blog/huelga-general-y-alquiler-afecta-a-mi-contrato).

## Preguntas frecuentes

### ¿Es una huelga solo de inquilinos?
Es una huelga general laboral convocada por sindicatos, con la vivienda como motivo principal.

### ¿Habrá transporte?
Dependerá de los servicios mínimos que se fijen. Consulta a tu operador de transporte unos días antes.

### ¿Me pueden sancionar por hacer huelga?
No por ejercer el derecho de huelga de forma legal. Sí podrían hacerlo si incumples unos servicios mínimos que te hayan asignado.

${CTA_INQ}`,
  },
  {
    slug: 'huelga-general-derechos-de-los-trabajadores',
    title: 'Huelga general: tus derechos como trabajador, explicados en 5 minutos',
    excerpt: 'Si quieres secundar la huelga del 11 de noviembre o no, esto es lo que dice la ley: aviso, salario, cotización y servicios mínimos.',
    audience: 'inquilinos',
    category: CAT,
    publishedAt: D,
    body: `La huelga es un **derecho fundamental** recogido en el artículo 28.2 de la Constitución.

## Si la secundas

| Tema | Qué pasa |
|---|---|
| Aviso a la empresa | No es obligatorio comunicar de antemano que harás huelga |
| Salario | No cobras la jornada de huelga |
| Cotización | Se suspende la de esa jornada |
| Despido o sanción | No pueden sancionarte por ejercer el derecho de forma legal |
| Sustitución | La empresa no puede sustituirte por otras personas para romper la huelga |

## Si no la secundas

Tienes derecho a trabajar. Los piquetes son legales si son **informativos** y pacíficos.

## Servicios mínimos

En servicios esenciales (sanidad, transporte…), la autoridad fija servicios mínimos. Si te asignan uno, **debes cumplirlo**.

## Si eres autónomo

Puedes cerrar o adherirte al paro, pero no hay salario que se descuente: simplemente no facturas ese día.

## Si eres estudiante

Los paros estudiantiles tienen sus propias normas en cada centro.

Más contexto en [la huelga general por la vivienda del 11 de noviembre](/blog/huelga-general-por-la-vivienda-11-noviembre).

${CTA_INQ}`,
  },
  {
    slug: 'huelga-general-y-alquiler-afecta-a-mi-contrato',
    title: 'Huelga general y alquiler: ¿afecta a mi contrato o al pago de la renta?',
    excerpt: 'No. Tu contrato y tus pagos siguen igual. Lo que sí conviene revisar si tu renta se cobra ese día.',
    audience: 'inquilinos',
    category: CAT,
    publishedAt: D,
    body: `Una huelga general **no cambia tu contrato** ni tus obligaciones de pago.

## Lo que sigue igual
- La renta y su fecha de pago.
- Las condiciones del contrato.
- Los plazos de preaviso y de prórroga.

## Lo que conviene revisar
- Si tu renta se paga por **transferencia** ese día, hazla antes o comprueba que tu banco la procesa.
- Si tienes una **visita o una firma** prevista el 11 de noviembre, confírmala con antelación.
- Si tu sueldo de ese mes será menor por hacer huelga, ajusta tu presupuesto.

## ¿Y si se aprueban cambios después?
Las normas que se aprueben se aplicarán según lo que digan. Lee [qué cambiaría si se convalidan los decretos](/blog/si-se-convalida-el-decreto-que-cambia-en-tu-contrato).

${CTA_INQ}`,
  },
  {
    slug: 'decretos-de-vivienda-votacion-12-noviembre',
    title: 'Decretos de vivienda: la votación prevista para el 12 de noviembre y qué está en juego',
    excerpt: 'La votación prevista para el 16 de octubre se aplaza. Qué incluyen los dos decretos, qué dice la prensa sobre los apoyos y qué pasa si caen.',
    audience: 'propietarios',
    category: CAT,
    publishedAt: D,
    body: `Los dos decretos de vivienda aprobados por el Gobierno el 6 de octubre de 2026 (**reales decretos-ley 28/2026 y 29/2026**, publicados en el BOE el día 7) siguen pendientes de convalidación. Según la prensa, la **Diputación Permanente del Congreso** prevé votarlos el **12 de noviembre**, y no el 16 de octubre como se anunció. A 20 de octubre no hay convocatoria oficial y algunos medios apuntan a que la fecha podría moverse: si no se convalidan dentro del plazo legal, decaen.

${AL_DIA}

## Qué incluyen, en resumen

| Decreto | Contenido principal | Situación |
|---|---|---|
| Medidas urgentes | Prórrogas extraordinarias, límite del 2 % a las subidas, temporada, habitaciones, fiscalidad, desahucios de vulnerables | En vigor desde el 8 de octubre, pendiente de convalidar |
| Estabilidad de los contratos | Renovación automática al terminar los 5 o 7 años | Solo entraría en vigor si se convalida |

Detalle en [los decretos explicados punto por punto](/blog/decretos-de-vivienda-octubre-2026-explicados).

## Qué dice la prensa sobre los apoyos

Las informaciones publicadas apuntan a una votación ajustada en la Diputación Permanente y a que cada decreto podría correr una suerte distinta. No hacemos predicciones: el resultado se conocerá ese día.

## Qué pasa en cada caso

- **Si se convalida**, el decreto sigue en vigor.
- **Si no se convalida**, decae, aunque lo aplicado mientras estuvo vigente mantiene, en general, su efecto.

## Preguntas frecuentes

### ¿Sigo aplicando el límite del 2 % hasta el 12 de noviembre?
El decreto de medidas urgentes está en vigor desde su publicación, salvo que decaiga. Consulta a un profesional para tu caso concreto.

### ¿Y si mi inquilino me pide la prórroga extraordinaria ahora?
Mientras el decreto esté en vigor, la solicitud se rige por él. Guarda la comunicación y revisa la situación tras la votación.

### ¿Dónde sigo la votación?
En la web del Congreso de los Diputados y, después, en el BOE.

${CTA_PROP}`,
  },
  {
    slug: 'si-se-convalida-el-decreto-que-cambia-en-tu-contrato',
    title: 'Si se convalidan los decretos de vivienda, ¿qué cambia en tu contrato?',
    excerpt: 'Prórrogas, subidas, temporada y habitaciones: lo que se mantendría si la Diputación Permanente los convalida el 12 de noviembre.',
    audience: 'inquilinos',
    category: CAT,
    publishedAt: D,
    body: `Si los decretos de vivienda se convalidan en la votación prevista para el **12 de noviembre**, estas medidas seguirían aplicándose.

${AL_DIA}

## Lo que te afectaría como inquilino

| Medida | Qué supone |
|---|---|
| Prórroga extraordinaria | Si tu periodo obligatorio (5 o 7 años) o la prórroga tácita termina antes de 2029: hasta dos años más en las mismas condiciones, si llevas ocho meses al día ([requisitos](/blog/prorroga-extraordinaria-alquiler-2026-quien-puede-pedirla)) |
| Subidas | Hasta finales de 2027, máximo un 2 %, y nada si la renta supera el índice de referencia |
| Temporada | Más de 31 días y, en general, hasta 12 meses y con causa justificada |
| Habitaciones | En zona tensionada, la suma no puede superar la renta del piso entero |
| Deducción en el IRPF | Del 10 % para ingresos bajos |
| Renovación automática (segundo decreto) | Al terminar los 5 o 7 años, salvo excepciones |
| Anuncios | Deben indicar, cuando proceda, el índice de referencia, el límite de renta, el número de registro y si el arrendador es gran tenedor |

**Si eres propietario**, además cambiaría la reducción del IRPF de los contratos firmados después del 1 de diciembre de 2026: hasta el 100 % si bajas la renta o quedas por debajo del índice, y mucho menos si la subes. Calcúlalo con la [calculadora de la reducción del IRPF](/herramientas/reduccion-irpf-alquiler).

## Si no se convalidan

Seguirían vigentes la **LAU** y la **Ley 12/2023**, con sus propias prórrogas (la obligatoria hasta 5 o 7 años y la tácita hasta 3 años) y el límite de actualización del IRAV en los contratos posteriores a 2023.

## Qué hacer ahora

- Si tu contrato vence pronto, pide la prórroga por escrito: lee [la prórroga extraordinaria](/blog/prorroga-extraordinaria-alquiler-2026-quien-puede-pedirla).
- Guarda tus justificantes de pago.
- Consulta las novedades tras el 12 de noviembre.

${CTA_INQ}`,
  },
  {
    slug: 'si-caen-los-decretos-de-vivienda-que-pasaria',
    title: 'Si caen los decretos de vivienda, ¿qué pasaría con los contratos?',
    excerpt: 'Qué significa que un decreto «decaiga», qué efectos se mantienen y qué normas seguirían vigentes. Para propietarios.',
    audience: 'propietarios',
    category: CAT,
    publishedAt: D,
    body: `Un real decreto-ley entra en vigor al publicarse, pero el Congreso (con las Cortes disueltas, la Diputación Permanente) debe **convalidarlo**. Si no lo hace, el decreto **decae**.

${AL_DIA}

## Qué significa que decaiga

- Deja de aplicarse desde ese momento.
- Lo que se aplicó mientras estuvo vigente mantiene, en general, sus efectos. Si tienes dudas sobre una situación concreta (por ejemplo, una prórroga pedida durante su vigencia), consulta con un profesional.

## Qué seguiría vigente

| Norma | Lo esencial |
|---|---|
| LAU | Duraciones, prórrogas, fianza y garantías |
| Ley 12/2023 | Zonas tensionadas, gastos de gestión del propietario, reducciones del IRPF |
| IRAV | Límite de actualización de los contratos posteriores a la Ley 12/2023 |

## Qué dejaría de aplicarse (Real Decreto-ley 29/2026)

| Medida | Si decae |
|---|---|
| Nueva reducción del IRPF (contratos posteriores al 1-12-2026, del 15 % al 100 %) | Se mantendría el régimen de la Ley 12/2023 (del 50 % al 90 %) |
| Límite extraordinario del 2 % a la actualización de rentas hasta 2027 | Volvería la regla general (lo pactado, con el tope del IRAV) |
| Datos obligatorios en los anuncios (artículo 20) | Dejarían de ser exigibles por esta norma |
| Prórroga extraordinaria de hasta dos años | Dejaría de poder pedirse |

Si tienes que decidir la renta de un contrato nuevo, compara los dos escenarios con la [calculadora de la reducción del IRPF](/herramientas/reduccion-irpf-alquiler).

## Qué conviene hacer

- Guarda toda la comunicación con tu inquilino durante este periodo.
- No tomes decisiones irreversibles antes de conocer el resultado.
- Revisa la situación tras la votación prevista para el **12 de noviembre**.

Más contexto en [la votación prevista de los decretos](/blog/decretos-de-vivienda-votacion-12-noviembre).

${CTA_PROP}`,
  },
  {
    slug: 'prorroga-extraordinaria-que-hacer-mientras-se-vota',
    title: 'Prórroga extraordinaria del alquiler: qué hacer mientras se vota el decreto',
    excerpt: 'El decreto está en vigor pero pendiente de convalidar. Si tu contrato vence, así te proteges sin esperar al 12 de noviembre.',
    audience: 'inquilinos',
    category: CAT,
    publishedAt: D,
    body: `El decreto de medidas urgentes, que incluye la **prórroga extraordinaria**, está en vigor desde octubre de 2026 y pendiente de convalidación, prevista según la prensa para el **12 de noviembre**.

${AL_DIA}

## Si tu contrato vence pronto

1. **Comprueba los requisitos**: vivienda habitual, vencimiento hasta finales de 2028 y estar al corriente de pago los ocho meses anteriores.
2. **Pídela por escrito** ahora, con un medio que deje constancia.
3. **Guarda el justificante** de envío y de recepción.

## Modelo orientativo

> Por la presente solicito, al amparo del real decreto-ley de medidas urgentes en materia de vivienda publicado en el BOE el 7 de octubre de 2026, la prórroga extraordinaria del contrato de arrendamiento de la vivienda situada en [dirección], firmado el [fecha], en las mismas condiciones vigentes.

## Si el decreto decae

Recuerda que la LAU ya te da derechos: la prórroga obligatoria hasta 5 o 7 años y la tácita de hasta 3 años si nadie avisa. Más en [la prórroga extraordinaria](/blog/prorroga-extraordinaria-alquiler-2026-quien-puede-pedirla).

${CTA_INQ}`,
  },
  {
    slug: 'calendario-hasta-el-29n-vivienda',
    title: 'Calendario hasta el 29-N: huelga, votación de los decretos y elecciones',
    excerpt: 'Las fechas clave de la vivienda en noviembre de 2026, en una tabla.',
    audience: 'inquilinos',
    category: CAT,
    publishedAt: D,
    body: `${AL_DIA}

| Fecha | Qué pasa |
|---|---|
| Desde el 26 de septiembre | Acampada por la vivienda en la Puerta del Sol |
| 29 de septiembre | Empieza la acampada de plaza Catalunya (Barcelona) |
| 7 de octubre | BOE: decretos de vivienda 28/2026 y 29/2026 |
| 11 de noviembre | Huelga general por la vivienda (24 horas) |
| 12 de noviembre | Votación prevista de los decretos en la Diputación Permanente |
| 15 de noviembre | Entraría en vigor el decreto de estabilidad de contratos, si se convalida |
| 29 de noviembre | Elecciones generales |

## Para cada fecha

- [Huelga del 11 de noviembre](/blog/huelga-general-por-la-vivienda-11-noviembre)
- [Votación del 12 de noviembre](/blog/decretos-de-vivienda-votacion-12-noviembre)
- [Qué está en juego el 29-N](/blog/elecciones-29-noviembre-que-esta-en-juego-en-vivienda)
- [Propuestas de los partidos](/blog/propuestas-de-vivienda-de-los-partidos-resumen-neutral)

${CTA_INQ}`,
  },
  {
    slug: 'que-es-un-sindicato-de-inquilinas',
    title: '¿Qué es un sindicato de inquilinas y cómo funciona?',
    excerpt: 'Organizaciones de inquilinos que asesoran, negocian y se movilizan. Qué hacen, cómo se financian y cómo contactar con ellas.',
    audience: 'inquilinos',
    category: CAT,
    publishedAt: D,
    body: `Los sindicatos de inquilinas son **organizaciones de personas que viven de alquiler**. No son sindicatos laborales, aunque usan herramientas parecidas: asesoramiento, negociación colectiva y movilización.

## Qué hacen
- **Asesoran** a sus afiliados sobre contratos, subidas o desahucios.
- **Negocian** con propietarios, sobre todo con grandes tenedores.
- **Se movilizan**: manifestaciones, campañas y, en 2026, la convocatoria de la huelga general del 11 de noviembre junto con otros sindicatos.

## Cómo se organizan
Por ciudades o territorios, con asambleas y cuotas de sus miembros. En 2026 varias de estas organizaciones se agrupan en una confederación estatal.

## Otras opciones si tienes un problema
- **Oficinas de vivienda** de tu ayuntamiento o comunidad.
- **Asociaciones de consumidores**.
- **Colegios de abogados**: asistencia jurídica gratuita si cumples los requisitos.

${CTA_INQ}`,
  },
  {
    slug: 'derecho-de-reunion-y-manifestacion-vivienda',
    title: 'Manifestarse por la vivienda: qué dice la ley sobre el derecho de reunión',
    excerpt: 'Comunicación previa, plazos y límites: lo esencial del derecho de reunión y manifestación en España.',
    audience: 'inquilinos',
    category: CAT,
    publishedAt: D,
    body: `El **derecho de reunión pacífica** está recogido en el artículo 21 de la Constitución y regulado por la Ley Orgánica 9/1983.

## Lo esencial

| Tema | Regla general |
|---|---|
| Autorización | No hace falta autorización previa |
| Comunicación | Las reuniones en lugares de tránsito público y las manifestaciones se comunican a la autoridad (Delegación o Subdelegación del Gobierno) con antelación |
| Plazo | Con carácter general, con al menos 10 días naturales; en casos urgentes, con menos |
| Límites | La autoridad puede prohibirlas o modificarlas por razones fundadas de orden público, con peligro para personas o bienes |
| Recurso | Esas decisiones pueden recurrirse ante los tribunales |

## Las acampadas

Si una acampada prolongada puede mantenerse es algo que, en caso de conflicto, deciden las autoridades y los tribunales caso por caso, como en [la acampada de Sol](/blog/acampada-de-sol-por-la-vivienda-que-es-y-que-piden).

## Consejos si vas a una manifestación
- Lleva tu documentación.
- Sigue las indicaciones de la organización y de las autoridades.
- Respeta el recorrido comunicado.

${CTA_INQ}`,
  },
  {
    slug: 'te-enfrentas-a-un-desahucio-ayudas-y-pasos',
    title: 'Si te enfrentas a un desahucio: ayudas y pasos que puedes dar',
    excerpt: 'Servicios sociales, asistencia jurídica gratuita, vulnerabilidad y plazos: qué hacer desde el primer aviso.',
    audience: 'inquilinos',
    category: CAT,
    publishedAt: D,
    body: `Recibir una demanda de desahucio asusta, pero hay plazos y recursos. Actúa pronto.

## 1. No ignores el requerimiento
Lee la documentación del juzgado y apunta los **plazos**: suelen ser cortos.

## 2. Pide asistencia jurídica gratuita
Si tus ingresos no superan los límites legales, puedes tener **abogado y procurador gratuitos**. Pídelo en el colegio de abogados o en el propio juzgado.

## 3. Acude a los servicios sociales
Pueden valorar tu situación de **vulnerabilidad** y buscar alternativas habitacionales. Desde la Ley 12/2023 hay más coordinación con los juzgados, y los decretos de octubre de 2026 prevén suspensiones para hogares vulnerables, si se mantienen.

## 4. Valora pagar o negociar
En los desahucios por impago, a veces se puede **parar el proceso pagando** lo debido (enervación), salvo excepciones. Negociar un plan de pago con el propietario también puede evitar el juicio.

## 5. Documenta tu situación
Ingresos, cargas familiares, informes sociales y comunicaciones con el propietario.

## Recursos
- Servicios sociales de tu ayuntamiento.
- Oficina de vivienda de tu comunidad.
- Asociaciones y sindicatos de inquilinos.

${CTA_INQ}`,
  },
  {
    slug: 'movilizacion-por-la-vivienda-explicada-para-propietarios',
    title: 'La movilización por la vivienda, explicada para propietarios',
    excerpt: 'Acampadas, huelga general y decretos: qué piden los movimientos, qué dice hoy la ley y qué podría cambiar para quien alquila.',
    audience: 'propietarios',
    category: CAT,
    publishedAt: D,
    body: `Si tienes un piso alquilado, quizá te preguntes qué significan las acampadas y la huelga general para ti. Te lo contamos sin opiniones.

${AL_DIA}

## Qué piden los movimientos
Según la información publicada: renovación de los contratos, suspensión de los desalojos sin alternativa habitacional y medidas urgentes de vivienda.

## Qué dice hoy la ley

| Tema | Situación |
|---|---|
| Duración | LAU: 5 años (7 si eres empresa) y 3 de tácita |
| Prórroga extraordinaria y límite del 2 % | Decreto en vigor, pendiente de convalidar el 12 de noviembre |
| Renovación automática | Segundo decreto, solo si se convalida |
| Desahucios de vulnerables | Suspensiones previstas en el decreto, con compensación al propietario en ciertos casos |

## Qué no cambia por una protesta
Tu contrato ni tus derechos. Solo una norma aprobada puede cambiarlos.

## Qué hacer
- Mantén la comunicación con tu inquilino.
- Documenta los pagos.
- Revisa las novedades tras el 12 y el 29 de noviembre.

Más en [si caen los decretos, qué pasaría](/blog/si-caen-los-decretos-de-vivienda-que-pasaria).

${CTA_PROP}`,
  },
  {
    slug: 'glosario-de-la-movilizacion-por-la-vivienda',
    title: 'Glosario de la movilización por la vivienda: las palabras clave',
    excerpt: 'Lanzamiento, enervación, vulnerabilidad, convalidación, servicios mínimos… Los términos de la actualidad, explicados en una línea.',
    audience: 'inquilinos',
    category: CAT,
    publishedAt: D,
    body: `| Término | Qué significa |
|---|---|
| **Desahucio** | Procedimiento judicial para recuperar una vivienda |
| **Lanzamiento** | El acto en que se entrega la vivienda al propietario, con la comisión judicial |
| **Enervación** | Parar un desahucio por impago pagando lo debido, salvo excepciones |
| **Vulnerabilidad** | Situación económica o social que puede dar lugar a protección o suspensión |
| **Alternativa habitacional** | Vivienda que ofrece la administración a quien la pierde |
| **Renovación automática** | Que el contrato se prorrogue solo al terminar, salvo causas tasadas |
| **Prórroga extraordinaria** | Ampliación excepcional prevista en una norma |
| **Real decreto-ley** | Norma del Gobierno con rango de ley, que el Congreso debe convalidar |
| **Convalidación** | Votación que confirma un decreto-ley |
| **Diputación Permanente** | Órgano del Congreso que actúa con las Cortes disueltas |
| **Huelga general** | Paro laboral de todos los sectores convocado por sindicatos |
| **Servicios mínimos** | Servicios esenciales que deben mantenerse durante una huelga |
| **Zona tensionada** | Zona con precios altos donde se limitan las rentas de nuevos contratos |
| **Gran tenedor** | En general, quien tiene más de 10 viviendas |

Para el contexto, empieza por [la acampada de Sol](/blog/acampada-de-sol-por-la-vivienda-que-es-y-que-piden).

${CTA_INQ}`,
  },
  {
    slug: 'protestas-en-francia-coste-de-vida-octubre-2026',
    title: 'Protestas en Francia por el coste de vida: qué está pasando',
    excerpt: 'Cientos de miles de personas salieron a la calle el 17 de octubre contra la inflación y el precio de los combustibles. Datos, versiones y contexto.',
    audience: 'inquilinos',
    category: CAT,
    publishedAt: D,
    body: `El **17 de octubre de 2026**, Francia vivió una jornada de protestas masivas contra el **coste de vida**: la inflación y el precio de los combustibles.

${AL_DIA}

## Lo que se sabe

| Dato | Según la fuente |
|---|---|
| Origen | Una convocatoria surgida de un vídeo viral en TikTok a comienzos de septiembre |
| Participación | Unas 550.000 personas según el Ministerio del Interior; unas 800.000 según los organizadores |
| Incidentes | Saqueos e incendios en varias ciudades; daños en el histórico Ayuntamiento de Limoges, según France 24 |
| Detenciones | Las cifras varían mucho según el medio |

## No es la única movilización en Francia

Desde el 18 de septiembre hay además **protestas estudiantiles** que reclaman más profesorado, grupos más pequeños y mejores instalaciones.

## ¿Tiene que ver con la vivienda?

Las protestas del 17 de octubre se centran en el coste de vida en general. En España, en cambio, la movilización de estas semanas tiene la **vivienda** como eje: lee [la acampada de Sol](/blog/acampada-de-sol-por-la-vivienda-que-es-y-que-piden) y [la huelga del 11 de noviembre](/blog/huelga-general-por-la-vivienda-11-noviembre).

## Por qué te importa

El coste de vida y la vivienda están conectados: cuanto más se lleva el alquiler, menos margen queda para todo lo demás. Calcula tu caso con la [calculadora de alquiler según tu sueldo](/herramientas/cuanto-alquiler-puedo-pagar).

${CTA_INQ}`,
  },
  {
    slug: 'control-de-alquileres-en-paris-como-funciona',
    title: 'Cómo funciona el control de alquileres en París',
    excerpt: 'Alquileres de referencia por zona, un máximo del 20 % por encima y un «complemento» excepcional: el modelo francés, explicado.',
    audience: 'propietarios',
    category: 'Vivienda en Europa',
    publishedAt: D,
    body: `Francia lleva años aplicando el **encadrement des loyers** (control de alquileres) en París y en otras ciudades que se han acogido a él.

## Cómo funciona, en general

1. La administración fija un **alquiler de referencia** por metro cuadrado según la zona, el tipo de vivienda, la antigüedad del edificio y si está amueblada.
2. En un contrato nuevo, la renta no puede superar el **alquiler de referencia aumentado** (en general, un 20 % por encima).
3. Se admite un **complemento de alquiler** solo por características excepcionales de la vivienda, que deben justificarse.
4. El inquilino puede reclamar si se supera el límite.

## Parecidos con España

| | París | España |
|---|---|---|
| Ámbito | Ciudades que lo aplican | Zonas tensionadas declaradas por cada comunidad |
| Referencia | Alquiler de referencia oficial | Índice estatal de referencia |
| A quién afecta | Contratos nuevos en la zona | Contratos nuevos en zona tensionada, con reglas distintas para grandes tenedores |

## Un aviso

Los detalles cambian con el tiempo y según la ciudad. Este artículo resume el funcionamiento general, no es asesoramiento sobre la normativa francesa.

Más sobre España en [zonas tensionadas](/blog/zonas-tensionadas-que-son-y-donde-se-aplican).

${CTA_PROP}`,
  },
  {
    slug: 'regulacion-del-alquiler-en-europa-comparativa',
    title: 'Cómo regulan el alquiler en Europa: Francia, Alemania, Países Bajos y Portugal',
    excerpt: 'Freno a los alquileres, sistemas de puntos y límites al alquiler turístico: un repaso general a modelos europeos.',
    audience: 'propietarios',
    category: 'Vivienda en Europa',
    publishedAt: D,
    body: `Muchos países europeos regulan el alquiler, cada uno a su manera. Este es un repaso **general**; los detalles cambian a menudo.

| País | Herramienta principal | En pocas palabras |
|---|---|---|
| Francia | Control de alquileres (encadrement) | Alquileres de referencia por zona en ciudades que lo aplican |
| Alemania | Freno al alquiler (Mietpreisbremse) | En zonas declaradas, la renta de un contrato nuevo no puede superar en más de un 10 % el alquiler habitual de la zona, con excepciones |
| Países Bajos | Sistema de puntos | Las características de la vivienda determinan una renta máxima; desde 2024 se extendió a parte del alquiler medio |
| Portugal | Programa «Mais Habitação» (2023) | Medidas para el alquiler asequible y restricciones a nuevas licencias de alojamiento local |
| España | Ley 12/2023 | Zonas tensionadas, índice de referencia y gran tenedor |

## Qué tienen en común

- Actúan sobre **contratos nuevos** en zonas con más presión.
- Usan un **índice o referencia** oficial.
- Combinan límites con **incentivos** o vivienda pública.

## Un aviso

Este resumen es orientativo y no es asesoramiento sobre normativa extranjera. Si alquilas en otro país, consulta a un profesional local.

${CTA_PROP}`,
  },
  {
    slug: 'coste-de-vida-y-alquiler-cuanto-pesa-la-vivienda',
    title: 'Coste de vida y alquiler: por qué la vivienda pesa tanto en tu presupuesto',
    excerpt: 'Cuando la renta se lleva una gran parte del sueldo, todo lo demás se resiente. Cómo medirlo y qué margen tienes.',
    audience: 'inquilinos',
    category: CAT,
    publishedAt: D,
    body: `Las protestas por el coste de vida en Francia y la movilización por la vivienda en España tienen algo en común: **cuánto queda después de pagar lo básico**.

## Cómo medir tu esfuerzo
Divide tu renta mensual entre tus ingresos netos:

| Resultado | Lectura habitual |
|---|---|
| Hasta el 30 % | Margen razonable |
| 30–40 % | Esfuerzo alto |
| Más del 40 % | Esfuerzo muy alto |

Calcúlalo con la [calculadora de alquiler según tu sueldo](/herramientas/cuanto-alquiler-puedo-pagar).

## Qué puedes hacer si te pasas
- Revisar **suministros** y suscripciones.
- Valorar **compartir** o mudarte a una zona con mejor relación precio/transporte.
- Comprobar si tienes derecho a **ayudas o deducciones** por alquiler.
- Negociar con tu propietario una prórroga en las mismas condiciones.

## Ahorrar aunque sea poco
Un pequeño ahorro mensual automático da tranquilidad. Con la hucha de RentaHucha, ese ahorro va unido al pago de la renta.

${CTA_INQ}`,
  },
  {
    slug: 'datos-fiables-de-precios-del-alquiler-donde-mirar',
    title: 'Precios del alquiler: dónde mirar datos fiables',
    excerpt: 'INE, índice de referencia del Ministerio, Banco de España y portales: qué mide cada fuente y cómo no dejarte engañar por un titular.',
    audience: 'inquilinos',
    category: CAT,
    publishedAt: D,
    body: `Cada semana aparecen titulares con cifras distintas sobre el alquiler. Saber qué mide cada fuente evita confusiones.

| Fuente | Qué mide | Para qué sirve |
|---|---|---|
| INE (IRAV) | Índice para actualizar contratos | Saber cuánto pueden subirte la renta |
| Índice de referencia del Ministerio de Vivienda | Rango de precios por vivienda y zona | Saber si un precio es razonable o el límite en zona tensionada |
| Portales inmobiliarios | Precios de los anuncios publicados | Ver el mercado de oferta actual |
| Banco de España y estudios | Análisis del mercado | Entender tendencias |

## Cómo leer un titular
- **¿Precio pedido o pagado?** Los portales reflejan anuncios, no contratos firmados.
- **¿Qué zona?** Una media nacional dice poco de tu barrio.
- **¿Qué periodo?** Interanual, mensual…

## Para tu caso
Compara pisos parecidos en tu zona y consulta el índice de referencia. Más en [cómo calcular cuánto pedir o pagar](/blog/como-calcular-la-renta-de-tu-piso).

${CTA_INQ}`,
  },
  {
    slug: 'contrato-vence-en-2027-como-prepararte',
    title: 'Tu contrato vence en 2027: cómo prepararte desde ya',
    excerpt: 'Fechas, preavisos, prórrogas y alternativas: un plan para que el final de tu contrato no te pille por sorpresa.',
    audience: 'inquilinos',
    category: CAT,
    publishedAt: D,
    body: `Si tu contrato termina en 2027, tienes tiempo para prepararte.

## 1. Apunta tus fechas
- Fecha de fin del contrato y de la anualidad.
- Fin de la prórroga obligatoria (5 o 7 años desde la firma).
- Plazos de preaviso: el propietario, al menos 4 meses antes del final; tú, al menos 2.

## 2. Conoce tus derechos
- Si estás dentro de los 5 o 7 años, puedes seguir aunque el propietario no quiera, salvo necesidad pactada.
- Si nadie avisa a tiempo, prórroga tácita de hasta 3 años.
- Si se mantiene el decreto, posible [prórroga extraordinaria](/blog/prorroga-extraordinaria-alquiler-2026-quien-puede-pedirla).

## 3. Habla con tu propietario con tiempo
Lee [cómo negociar quedarte más tiempo](/blog/negociar-quedarte-mas-tiempo-en-tu-piso).

## 4. Prepara un plan B
Ahorra para una posible mudanza y ten tu documentación al día.

${CTA_INQ}`,
  },
  {
    slug: 'emanciparse-en-2027-obstaculos-y-soluciones',
    title: 'Emanciparse en 2027: los obstáculos reales y cómo superarlos',
    excerpt: 'Dinero para entrar, avales y precios altos: soluciones prácticas para dar el paso de vivir por tu cuenta.',
    audience: 'inquilinos',
    category: CAT,
    publishedAt: D,
    body: `Emanciparse es cada vez más difícil para muchas personas jóvenes. Estos son los obstáculos más habituales y qué puedes hacer con cada uno.

| Obstáculo | Qué puedes hacer |
|---|---|
| Dinero para entrar | Ahorrar al menos dos rentas; recuerda que los gastos de agencia los paga el propietario |
| Te piden aval | Demostrar ingresos y un buen historial; ofrecer garantías dentro de la ley |
| Precios altos | Compartir piso o buscar en zonas bien comunicadas |
| Contrato temporal | Aportar ahorros, referencias y antigüedad |
| Competencia por cada piso | Responder rápido con la documentación lista |

## Ayudas
Revisa el Bono Alquiler Joven y las deducciones de tu comunidad. Lee [Bono Alquiler Joven](/blog/bono-alquiler-joven-requisitos-y-como-pedirlo).

## Empieza por el plan
Lee [tu primer alquiler: guía completa](/blog/tu-primer-alquiler-guia-para-independizarte-2027).

${CTA_INQ}`,
  },
  {
    slug: 'compartir-piso-a-los-30-y-40',
    title: 'Compartir piso a los 30 y a los 40: cómo hacerlo bien',
    excerpt: 'Cada vez más adultos comparten vivienda. Contrato, convivencia y gastos para que funcione sin conflictos.',
    audience: 'inquilinos',
    category: 'Convivencia',
    publishedAt: D,
    body: `Compartir piso ya no es solo cosa de estudiantes. Si lo haces a los 30 o a los 40, conviene organizarlo como adultos.

## El contrato
- Mejor que **firméis todos**: mismos derechos y obligaciones.
- Si alquilas una habitación, deja claro qué zonas compartís y las normas.

## Los gastos
- Cuenta común o una app para repartir.
- Suministros a partes iguales o por consumo.
- Fondo común para lo básico de casa.

## La convivencia
| Tema | Pactadlo por escrito |
|---|---|
| Limpieza | Turnos |
| Visitas y parejas | Frecuencia y aviso |
| Teletrabajo | Horarios y espacios |
| Ruido | Horas de descanso |

## Si alguien se va
Acordad con antelación cómo se busca a la persona que entra y cómo se gestiona su parte de la fianza.

Más en [compartir piso: gastos y contrato](/blog/compartir-piso-gastos-y-contrato).

${CTA_INQ}`,
  },
  {
    slug: 'estres-por-buscar-piso-como-gestionarlo',
    title: 'El estrés de buscar piso: cómo gestionarlo sin quemarte',
    excerpt: 'Buscar vivienda puede ser agotador. Un método para organizarte, cuidar tu tiempo y no rendirte.',
    audience: 'inquilinos',
    category: 'Buscar piso',
    publishedAt: D,
    body: `Buscar piso en una ciudad con mucha demanda puede generar ansiedad: mensajes sin respuesta, visitas en grupo y decisiones rápidas.

## Organízate para gastar menos energía
- **Alertas** en dos o tres portales, no en diez.
- **Mensaje plantilla** listo para enviar. Lee [el mensaje que consigue visitas](/blog/mensaje-al-propietario-que-consigue-visitas).
- **Carpeta de documentos** preparada.
- **Horario de búsqueda**: por ejemplo, 30 minutos por la mañana y por la tarde.

## Fija tus límites
- Renta máxima y zonas: si lo decides antes, decidirás mejor después.
- Lo imprescindible y lo que es negociable.

## Cuídate
- Habla de cómo te sientes con personas de confianza.
- Si la situación te desborda, busca apoyo profesional.

## Un plan B
Un alquiler temporal o una habitación mientras buscas puede quitarte presión.

${CTA_INQ}`,
  },
]
