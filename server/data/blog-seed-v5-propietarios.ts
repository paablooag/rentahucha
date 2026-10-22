import type { BlogPost } from '#shared/utils/blog'

// Quinta tanda (versión 5): propietarios. Respuestas a búsquedas frecuentes (desahucios, IRAV, registro único,
// impuestos, venta con inquilino…), con guías largas y respuestas cortas. Normativa: LAU, Ley 12/2023, LIRPF,
// LEC y LO 1/2025. Importes orientativos; se remite a la fuente oficial cuando cambian por año o comunidad.

type Seed = Omit<BlogPost, 'updatedAt' | 'published'>
const D = '2026-10-16'
const A = 'propietarios' as const

export const BLOG_SEED_V5_PROPIETARIOS: Seed[] = [
  {
    slug: 'cuanto-tarda-un-desahucio-por-impago',
    title: '¿Cuánto tarda un desahucio por impago en España? Plazos reales para 2027',
    excerpt: 'Requerimiento, intento de acuerdo, demanda, enervación, vulnerabilidad y lanzamiento: las fases de un desahucio y lo que alarga cada una.',
    audience: A,
    category: 'Impagos',
    publishedAt: D,
    body: `Es una de las preguntas más buscadas por propietarios. La respuesta honesta: **depende mucho del juzgado** y de las circunstancias. Puede ir de unos pocos meses a más de un año. Estas son las fases y lo que influye en cada una.

## Las fases

| Fase | Qué pasa | Qué la alarga |
|---|---|---|
| 1. Requerimiento | Burofax reclamando la deuda | Nada, si se hace pronto |
| 2. Intento de acuerdo (MASC) | Negociación previa exigida desde 2025 | Que el inquilino no responda |
| 3. Demanda | Juicio verbal por falta de pago | Carga del juzgado |
| 4. Requerimiento judicial | El inquilino puede pagar, oponerse o irse | Oposición |
| 5. Vulnerabilidad | Servicios sociales, posible suspensión | Si el hogar es vulnerable |
| 6. Lanzamiento | Entrega de la vivienda con la comisión judicial | Agenda del juzgado |

## El intento previo de negociación

Desde la **Ley Orgánica 1/2025** (en vigor desde abril de 2025), en la mayoría de procedimientos civiles hay que acreditar un intento previo de solución (los llamados MASC): un requerimiento con propuesta, una mediación o una negociación entre abogados. Tu abogado te dirá qué vale en tu caso.

## La enervación

El inquilino puede **parar el desahucio pagando** todo lo debido antes del juicio, salvo que ya lo hubiera hecho antes o que le requirieras el pago con al menos 30 días de antelación a la demanda y no pagara. Por eso conviene hacer bien el requerimiento.

## Vulnerabilidad

Desde la Ley 12/2023, la demanda debe indicar si la vivienda es la habitual del inquilino y si el propietario es gran tenedor (y, si dices que no lo eres, ahora hay que aportar un certificado del Registro de la Propiedad), y los servicios sociales pueden intervenir.

Con el Real Decreto-ley 29/2026 (en vigor desde el 8 de octubre de 2026 y pendiente de convalidación), si el inquilino acredita **vulnerabilidad económica** en un desahucio por impago, el procedimiento se **suspende hasta dos meses** mientras la Administración le ofrece otra vivienda o **te paga todo lo debido y las costas**. Si paga, el procedimiento termina y el contrato sigue; si no hace ninguna de las dos cosas, **pasa a ser ella la deudora**, no hay lanzamiento y el contrato continúa mientras dure la vulnerabilidad. Más detalle en [desahucios y vulnerabilidad](/blog/desahucios-vulnerabilidad-hasta-2030-que-dice-el-decreto).

## Cómo acortar el proceso

1. Actúa **el día 1** del impago.
2. Requerimiento **fehaciente** y bien redactado.
3. Expediente completo: contrato, recibos y comunicaciones.
4. Abogado especializado en arrendamientos.

## Ejemplo de cronología

Un caso orientativo, sin oposición del inquilino y sin vulnerabilidad acreditada:

| Momento | Hito |
|---|---|
| Mes 0 | Primer impago, aviso y llamada |
| Mes 0–1 | Requerimiento con propuesta de acuerdo |
| Mes 1–2 | Demanda |
| Mes 2–5 | Admisión y requerimiento judicial al inquilino |
| Mes 4–8 o más | Fecha de lanzamiento |

Con oposición o un juzgado saturado, puede alargarse bastante más. Si el inquilino acredita vulnerabilidad económica, añade una suspensión de hasta dos meses y el resultado puede ser que cobres de la Administración en lugar de recuperar el piso.

## Documentos que te pedirá el abogado

- Contrato de alquiler y anexos.
- Recibos o extractos de los pagos y de los impagos.
- Requerimiento de pago y prueba de envío.
- Prueba del intento de negociación previa.
- Comunicaciones con el inquilino.
- Datos de si eres gran tenedor y de la situación de la vivienda.

## Errores que alargan el proceso

- **Esperar meses** antes de reclamar.
- Aceptar **pagos parciales sin documentarlos**.
- Requerimientos **sin prueba de contenido**.
- No acreditar el **intento de acuerdo** previo.
- Contratos con datos incompletos o desactualizados.

## Preguntas frecuentes

### ¿Puedo cambiar la cerradura si no me paga?
No. Puede ser delito de coacciones aunque te deba dinero. Solo un juez puede ordenar la entrega de la vivienda.

### ¿Recupero las rentas que me debe?
La sentencia puede condenar al pago, pero cobrarlo depende de la solvencia del inquilino. Por eso importan la selección y la fianza; y, desde el lanzamiento de RentaHucha, la hucha del inquilino, que se usará para pagarte lo pendiente si hay un impago comprobado.

### ¿Cuánto cuesta un desahucio?
Lo vemos en [cuánto cuesta un desahucio](/blog/cuanto-cuesta-un-desahucio).`,
  },
  {
    slug: 'cuanto-cuesta-un-desahucio',
    title: '¿Cuánto cuesta un desahucio por impago? Gastos que debes prever',
    excerpt: 'Abogado, procurador, burofax, cerrajero y meses sin cobrar: los costes directos e indirectos de un desahucio.',
    audience: A,
    category: 'Impagos',
    publishedAt: D,
    body: `Un desahucio cuesta mucho más que el abogado. Estos son los conceptos que conviene prever.

## Costes directos

| Concepto | Orientación |
|---|---|
| Burofax con certificación | Decenas de euros |
| Abogado | Desde unos cientos hasta más de mil euros, según el caso y la ciudad |
| Procurador | Unos cientos de euros |
| Cerrajero el día del lanzamiento | Variable |

Las personas físicas no pagan tasa judicial en este procedimiento. Si ganas, puede haber condena en costas al inquilino, pero cobrarlas depende de su solvencia.

## Costes indirectos (los que más pesan)

- **Rentas no cobradas** durante todo el proceso.
- **Suministros y comunidad** impagados.
- **Reparaciones** al recuperar el piso.
- **Meses vacío** hasta el siguiente inquilino.

Calcúlalo con tus números en la [calculadora del coste de un impago](/herramientas/coste-impago).

## Cómo reducirlo

- Selección con ingresos verificados.
- Reacción el día 1.
- Fianza, garantía adicional y la hucha del inquilino, que con RentaHucha pasa a ti si hay impago.
- Si quieres, un seguro de impago contratado por tu cuenta.`,
  },
  {
    slug: 'actualizar-renta-alquiler-irav-como-calcularlo',
    title: 'Cómo actualizar la renta del alquiler con el IRAV: cálculo paso a paso',
    excerpt: 'Qué es el índice del INE para arrendamientos de vivienda, a qué contratos se aplica y cómo calcular la subida anual.',
    audience: A,
    category: 'Rentabilidad',
    publishedAt: D,
    body: `El **IRAV** (Índice de Referencia para la Actualización Anual de los Contratos de Arrendamiento de Vivienda) lo publica el INE cada mes. Nació con la Ley 12/2023 para limitar las subidas anuales.

## A qué contratos se aplica

A los contratos de vivienda firmados desde la entrada en vigor de la Ley 12/2023 (mayo de 2023) que **prevean una actualización anual**: la subida no puede superar el IRAV. Si el contrato no dice nada de actualización, la renta no se actualiza.

Ojo: el decreto de octubre de 2026, si se convalida, fija hasta el 31-12-2027 un límite del 2 % y congela las rentas por encima del índice de referencia. Lee [cómo funciona el límite del 2 %](/blog/limite-2-por-ciento-subida-alquiler-hasta-2027).

## Cálculo paso a paso

1. Mira la **fecha de aniversario** del contrato.
2. Busca en la web del INE el **IRAV del mes** que indique tu contrato (normalmente el último publicado antes del aniversario).
3. Aplica el menor entre lo pactado y el límite legal vigente.

## Ejemplo

| Renta actual | Índice aplicable (ejemplo) | Nueva renta |
|---|---|---|
| 900 € | 2,2 % | 919,80 € |

## Cómo comunicarlo

Por escrito, con el cálculo y la fuente, al menos con un mes de antelación (artículo 18 de la LAU).`,
  },
  {
    slug: 'registro-unico-de-arrendamientos-quien-debe-registrarse',
    title: 'Registro único de arrendamientos: qué queda tras la anulación del Supremo',
    excerpt: 'El Supremo anuló en 2026 el registro único estatal de alquileres de corta duración. Qué sigue siendo obligatorio (registros autonómicos, datos de las plataformas) y qué hacer si alquilas por temporada o turístico.',
    audience: A,
    category: 'Legal',
    publishedAt: D,
    body: `El **Real Decreto 1312/2024** creó el Registro Único de Arrendamientos y la Ventanilla Única Digital de Arrendamientos, y desde el 1 de julio de 2025 exigía un número de registro estatal para anunciar alquileres de corta duración en plataformas. En 2026 el Tribunal Supremo anuló la parte del registro.

> **Actualizado a 21 de octubre de 2026.** El Tribunal Supremo **anuló el Registro Único de Arrendamientos estatal** por considerar que el Estado no tiene competencia para crearlo (sentencia 620/2026, de 19 de mayo, publicada en el BOE el 8 de junio de 2026; en el mismo sentido, la sentencia de 1 de junio de 2026, publicada el 18 de julio). Se mantienen la Ventanilla Única Digital de Arrendamientos y la obligación de las plataformas de enviar datos. Los registros y licencias **autonómicos o municipales** (por ejemplo, de vivienda turística) siguen vigentes.

## Qué se anuló y qué sigue

| | Situación |
|---|---|
| Registro único estatal y su número | **Anulado** por el Supremo |
| Ventanilla Única Digital de Arrendamientos | Se mantiene |
| Envío de datos de las plataformas a la ventanilla | Se mantiene |
| Registros y licencias autonómicos o municipales (por ejemplo, de vivienda turística) | **Siguen vigentes** según cada comunidad |
| Vivienda habitual de larga duración | No necesitaba número estatal |

## Qué hacer si alquilas

- **Vivienda habitual de larga duración**: no tenías que registrarte en el registro estatal. Revisa lo que exige el anuncio desde octubre de 2026: [qué debe incluir tu anuncio de alquiler](/blog/que-debe-incluir-un-anuncio-de-alquiler-decreto-29-2026).
- **Turístico**: consulta el registro o la licencia de tu comunidad autónoma y de tu ayuntamiento; siguen siendo necesarios y su código debe aparecer en el anuncio cuando proceda.
- **Temporada o habitaciones**: revisa si tu comunidad tiene un registro propio. La regulación de estos alquileres también ha cambiado con los decretos de octubre de 2026.

## Preguntas frecuentes

### ¿Sigo teniendo que poner el número del registro único en el anuncio?
El número estatal se anuló junto con el registro. Lo que sí debe aparecer, cuando proceda, es el número o código identificativo que exija tu comunidad o ayuntamiento (por ejemplo, el de vivienda turística), según el artículo 20 del Real Decreto-ley 29/2026.

### ¿Y los números que ya se habían concedido?
El Supremo no detalla los efectos sobre los números ya emitidos. Consulta a tu comunidad autónoma o a un profesional si tu actividad depende de ello.

## Fuentes

- Poder Judicial: [El Tribunal Supremo anula el Registro Único de arrendamientos de corta duración por considerar que el Estado carece de competencia para su creación](https://www.poderjudicial.es/cgpj/es/Poder-Judicial/Noticias-Judiciales/El-Tribunal-Supremo-anula-el-Registro-Unico-de-arrendamientos-de-corta-duracion-por-considerar-que-el-Estado-carece-de-competencia-para-su-creacion).
- BOE: [sentencia del Tribunal Supremo de 1 de junio de 2026](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-15677) (recurso de la Región de Murcia contra el Real Decreto 1312/2024).`,
  },
  {
    slug: 'inquiokupacion-y-okupacion-diferencias',
    title: 'Inquiokupación y okupación: diferencias legales y qué hacer en cada caso',
    excerpt: 'No es lo mismo un inquilino que deja de pagar que alguien que entra sin título. Procedimientos y plazos distintos.',
    audience: A,
    category: 'Legal',
    publishedAt: D,
    body: `En los medios se mezclan dos situaciones muy distintas.

## Las diferencias

| | Inquiokupación | Okupación |
|---|---|---|
| Quién | Un inquilino con contrato que deja de pagar | Alguien que entra sin ningún título |
| Vía | Civil: desahucio por falta de pago | Penal (usurpación o allanamiento) o civil |
| Primer paso | Requerimiento e intento de acuerdo | Denuncia inmediata |

## Si es tu inquilino

Es un **desahucio por falta de pago**. Lee [cuánto tarda un desahucio](/blog/cuanto-tarda-un-desahucio-por-impago) y [qué hacer si tu inquilino no paga](/blog/que-hacer-si-tu-inquilino-no-paga).

## Si es una ocupación sin título

1. **Denuncia** cuanto antes en la Policía o la Guardia Civil.
2. Si es tu vivienda habitual o segunda residencia en uso, puede ser **allanamiento de morada**, con una respuesta más rápida.
3. Si es una vivienda vacía, suele ser **usurpación**.
4. Desde 2025, estos delitos pueden tramitarse por el procedimiento de juicio rápido.
5. También existe una vía civil específica para recuperar la posesión.

## Lo que nunca debes hacer

Echar por tu cuenta, cambiar cerraduras con alguien dentro o cortar suministros: puede volverse en tu contra. Consulta con un abogado.`,
  },
  {
    slug: 'alquilar-piso-a-un-familiar-hacienda',
    title: 'Alquilar un piso a un familiar: lo que dice Hacienda',
    excerpt: 'Si alquilas a un familiar por debajo de mercado, Hacienda puede exigirte declarar un mínimo. Cómo hacerlo bien.',
    audience: A,
    category: 'Fiscalidad',
    publishedAt: D,
    body: `Alquilar a un hijo, un hermano o un sobrino es muy habitual. Fiscalmente tiene una regla especial.

## La regla

Si el inquilino es tu **cónyuge o un pariente hasta el tercer grado**, el rendimiento neto del alquiler **no puede ser inferior** al que resultaría de la imputación de rentas inmobiliarias (normalmente el 2 % del valor catastral, o el 1,1 % si se revisó en los últimos diez años).

## Ejemplo

| Concepto | Importe |
|---|---|
| Valor catastral | 80.000 € |
| Imputación mínima (2 %) | 1.600 € al año |
| Renta cobrada al hijo | 1.200 € al año |
| Declaras como mínimo | 1.600 € |

## Cómo hacerlo bien

- **Contrato por escrito**, aunque sea con familia.
- **Pagos por transferencia**, todos los meses.
- Si es a precio de mercado, se aplican las reglas generales.
- Ojo con las **reducciones**: consulta si te corresponden en tu caso.

Consulta tu caso concreto con un asesor fiscal.`,
  },
  {
    slug: 'alquilar-piso-heredado-entre-hermanos',
    title: 'Alquilar un piso heredado entre hermanos: cómo organizarlo',
    excerpt: 'Quién firma, cómo se reparten los ingresos y los gastos, y cómo declara cada uno.',
    audience: A,
    category: 'Gestión',
    publishedAt: D,
    body: `## Quién firma

Todos los copropietarios, o uno con **autorización** escrita de los demás.

## Cómo se reparte

- **Ingresos y gastos**, según el porcentaje de cada uno.
- Cada hermano **declara su parte** en su IRPF.

## Lo que conviene dejar por escrito

| Tema | Ejemplo |
|---|---|
| Quién gestiona | El hermano que vive más cerca, o una agencia |
| Cuenta de cobro | Cuenta común o reparto mensual |
| Gastos imprevistos | Hasta qué importe decide el gestor solo |
| Si uno quiere vender | Derecho preferente de los demás, plazos |

Si dudáis entre alquilar o vender, lee [piso heredado: alquilar o vender](/blog/piso-heredado-alquilar-o-vender).`,
  },
  {
    slug: 'como-saber-si-eres-gran-tenedor',
    title: '¿Soy gran tenedor? Cómo saberlo y qué implica',
    excerpt: 'Más de 10 viviendas o más de 1.500 m² residenciales, o 5 o más en zona tensionada si así se declara. Qué cuenta, cómo se acredita y qué cambia para ti (también en el IRPF y en tus anuncios).',
    audience: A,
    category: 'Legal',
    publishedAt: D,
    body: `Según la Ley 12/2023, en general es **gran tenedor** quien es titular de **más de 10 inmuebles urbanos de uso residencial** (sin contar garajes ni trasteros) o de una superficie construida residencial de más de 1.500 m².

En las **zonas tensionadas**, la comunidad autónoma puede bajar el umbral a **5 o más viviendas** en esa zona, si lo motiva en la declaración.

Con el Real Decreto-ley 29/2026 (pendiente de convalidación), la condición se acredita con una **certificación del Registro de la Propiedad** con las propiedades a tu nombre, y si un edificio tiene varias viviendas en una sola finca registral, **cada vivienda cuenta como un inmueble**, aunque no haya división horizontal.

## Qué cambia

- En zona tensionada, la renta de los contratos nuevos se limita por el **índice de referencia**.
- En desahucios, la demanda debe indicarlo y hay obligaciones adicionales.
- Algunas ayudas y deducciones no se aplican: por ejemplo, en los contratos posteriores al 1 de diciembre de 2026 el gran tenedor no tiene las reducciones del IRPF por bajar la renta ([calculadora](/herramientas/reduccion-irpf-alquiler)).
- Tus anuncios de alquiler deben indicar que eres gran tenedor ([qué debe incluir el anuncio](/blog/que-debe-incluir-un-anuncio-de-alquiler-decreto-29-2026)).

## Cómo contar

- Cuenta tu parte en las viviendas en copropiedad, según los criterios que fije la normativa autonómica aplicable.
- Si dudas, consulta con un asesor: cada comunidad puede concretar los criterios.`,
  },
  {
    slug: 'vender-piso-alquilado-con-inquilino',
    title: 'Vender un piso alquilado con el inquilino dentro: guía completa',
    excerpt: 'Subrogación del comprador, derecho de tanteo y retracto, precio y fiscalidad. Lo que debes saber antes de poner a la venta un piso alquilado.',
    audience: A,
    category: 'Legal',
    publishedAt: D,
    body: `Puedes vender un piso alquilado. Pero el contrato no desaparece con la venta, y el inquilino tiene derechos.

## El comprador se subroga

Según el **artículo 14 de la LAU**, el comprador ocupa tu lugar como arrendador. Debe respetar el contrato, al menos durante la duración mínima legal (5 años, o 7 si el arrendador anterior era una empresa).

## Derecho de tanteo y retracto

El **artículo 25 de la LAU** da al inquilino un derecho preferente de compra:

| Derecho | Qué significa | Plazo |
|---|---|---|
| Tanteo | Comprar en las mismas condiciones antes que nadie | 30 días naturales desde la notificación |
| Retracto | Anular la venta y comprar él, si no se le notificó o se vendió en otras condiciones | 30 días naturales desde que conoce la venta |

Se puede **renunciar** a este derecho en el contrato, en ciertos casos. Revisa el tuyo.

## Cómo notificarlo

De forma **fehaciente** (burofax), indicando precio, condiciones y datos del comprador.

## Precio

Un piso alquilado suele venderse **más barato** que uno vacío, salvo a inversores que buscan rentabilidad. A veces compensa negociar con el inquilino una salida o vendérselo a él.

## Fiscalidad

- Ganancia patrimonial en el IRPF.
- Plusvalía municipal, si hay incremento de valor.
- Las amortizaciones deducidas durante el alquiler reducen el valor de adquisición.

## Tres caminos

| Opción | Ventajas | Inconvenientes |
|---|---|---|
| Vender a un inversor con el inquilino dentro | No hay que esperar al fin del contrato | Precio más bajo que vacío |
| Vender al propio inquilino | Operación rápida, sin visitas | Depende de su financiación |
| Pactar la salida del inquilino | Vendes vacío, a precio de mercado | Coste del acuerdo y plazos |

Un acuerdo de salida debe ser voluntario, por escrito y con condiciones claras (fecha, compensación, estado del piso).

## Cómo calcular el precio para un inversor

Un inversor mira la **rentabilidad**:

- Rentabilidad bruta = renta anual / precio.
- Con una renta de 900 € (10.800 € al año) y una rentabilidad esperada del 5 %, el precio "de inversor" sería de unos 216.000 €.

Compara ese precio con el valor de mercado vacío para decidir.

## Documentos para la venta

- Escritura y nota simple.
- Contrato de alquiler en vigor y recibos.
- Justificante del depósito de la fianza.
- Certificado energético.
- Certificado de la comunidad de estar al corriente.
- Prueba de la notificación al inquilino (tanteo).

## Preguntas frecuentes

### ¿Puedo echar al inquilino para vender?
No, si el contrato está en vigor. La venta no es causa para resolverlo.

### ¿Tengo que avisar al inquilino de que voy a vender?
Sí, para el derecho de tanteo, salvo que haya renunciado a él en el contrato.

### ¿Quién se queda con la fianza?
El comprador se subroga en tus obligaciones, incluida la devolución de la fianza. Transfiérela en la compraventa y comunícalo al organismo de depósito.`,
  },
  {
    slug: 'derecho-de-tanteo-y-retracto-como-notificar',
    title: 'Derecho de tanteo y retracto: cómo notificarlo al inquilino',
    excerpt: 'Qué debe incluir la notificación, plazos y qué pasa si no se hace bien.',
    audience: A,
    category: 'Legal',
    publishedAt: D,
    body: `## Qué incluir en la notificación

- Intención de vender.
- **Precio** y forma de pago.
- **Condiciones esenciales** de la venta.
- Datos del posible comprador.

## Cómo enviarla

Por **burofax** con certificación de contenido o por otro medio fehaciente.

## Plazos

El inquilino tiene **30 días naturales** para ejercer el tanteo. Si no se le notifica o la venta se hace en condiciones distintas, puede ejercer el **retracto** en los 30 días siguientes a conocer la venta.

Más contexto en [vender un piso alquilado](/blog/vender-piso-alquilado-con-inquilino).`,
  },
  {
    slug: 'imputacion-de-rentas-piso-vacio',
    title: 'Imputación de rentas de un piso vacío: cuánto pagas sin alquilarlo',
    excerpt: 'Hacienda te hace tributar por un piso que no es tu vivienda habitual aunque no lo alquiles. Cómo se calcula.',
    audience: A,
    category: 'Fiscalidad',
    publishedAt: D,
    body: `Si tienes una vivienda que **no es tu vivienda habitual y no está alquilada**, tributas en el IRPF por una renta imputada.

## Cómo se calcula

| Situación del valor catastral | Porcentaje |
|---|---|
| Revisado en los últimos diez años | 1,1 % |
| No revisado | 2 % |

Se aplica de forma proporcional a los días del año en que el piso estuvo vacío.

## Ejemplo

Valor catastral de 90.000 € revisado: 990 € al año que se suman a tu base imponible general.

## Lo que se suma

IBI, comunidad, seguro y suministros mínimos. Y, en algunos municipios, recargos de IBI a la vivienda desocupada permanentemente.

## Alternativa

Alquilado como vivienda habitual, puedes aplicar reducciones del rendimiento neto de hasta el 100 % según el contrato ([cómo funcionan](/blog/reduccion-irpf-alquiler-vivienda-2027-hasta-100)). Haz números en [cuánto cuesta tener un piso vacío](/blog/cuanto-cuesta-tener-un-piso-vacio).`,
  },
  {
    slug: 'declarar-varios-inquilinos-en-el-mismo-ano',
    title: 'Cómo declarar el alquiler si has tenido varios inquilinos en el mismo año',
    excerpt: 'Días alquilado, días vacío y reducciones por contrato: cómo rellenar la renta sin errores.',
    audience: A,
    category: 'Fiscalidad',
    publishedAt: D,
    body: `## Claves

1. Declara **cada contrato** con sus días e ingresos.
2. Los **días vacíos** en los que el piso se ofrecía en alquiler cuentan como "a disposición del alquiler": los gastos de ese periodo se pueden deducir con matices. Si no estaba ofrecido, se imputa renta por esos días.
3. Las **reducciones** dependen de cada contrato (fecha y condiciones).
4. Guarda los **anuncios** que demuestren que estaba en alquiler.

## Datos que necesitas por inquilino

- NIF del inquilino.
- Fechas de inicio y fin.
- Rentas cobradas.

Consulta las instrucciones de la Agencia Tributaria del año correspondiente.`,
  },
  {
    slug: 'retencion-irpf-alquiler-local-o-vivienda',
    title: 'Retención del IRPF en el alquiler: ¿vivienda o local?',
    excerpt: 'En vivienda a un particular no hay retención. En locales alquilados a empresas o profesionales, sí. Te lo explicamos.',
    audience: A,
    category: 'Fiscalidad',
    publishedAt: D,
    body: `| Alquiler | ¿Retención? | ¿IVA? |
|---|---|---|
| Vivienda a un particular | No | No (exento) |
| Local u oficina a empresa o profesional | Sí, en general del 19 % | Sí, 21 % |
| Plaza de garaje suelta | Depende del inquilino | Sí, 21 % |

## Vivienda alquilada a una empresa

Si una empresa alquila una vivienda para sus trabajadores, la retención puede aplicar en algunos casos. Revisa el tipo de contrato y consulta con un asesor.

## Qué hacer con las retenciones

El inquilino que retiene las ingresa en Hacienda. Tú las restas en tu declaración de la renta.`,
  },
  {
    slug: 'alquilar-plaza-de-garaje-contrato-iva',
    title: 'Alquilar una plaza de garaje: contrato, IVA y fianza',
    excerpt: 'Una plaza suelta no se rige por la LAU sino por el Código Civil y lleva IVA. Lo esencial para alquilarla bien.',
    audience: A,
    category: 'Legal',
    publishedAt: D,
    body: `## Qué norma se aplica

Una plaza de garaje alquilada **sola** se rige por el **Código Civil** y lo pactado en el contrato, no por la LAU de vivienda.

## Impuestos

- **IVA del 21 %**, salvo que se alquile junto con la vivienda y como accesorio de ella.
- El ingreso tributa en el IRPF como rendimiento del capital inmobiliario.

## Qué incluir en el contrato

- Número de plaza y mando o llave.
- Duración y preaviso.
- Uso permitido (vehículo, no trastero).
- Fianza pactada.`,
  },
  {
    slug: 'pasar-piso-turistico-a-alquiler-larga-duracion',
    title: 'Pasar tu piso turístico a alquiler de larga duración: guía práctica',
    excerpt: 'Números, trámites y puesta a punto para cambiar de modelo con el menor tiempo vacío posible.',
    audience: A,
    category: 'Rentabilidad',
    publishedAt: D,
    body: `Más regulación, registro obligatorio y cambios fiscales en debate están llevando a muchos propietarios a pasar del turístico al alquiler tradicional.

## 1. Haz los números netos

| Concepto | Turístico | Larga duración |
|---|---|---|
| Ingresos | Variables por temporada | Estables |
| Gastos | Limpieza, plataformas, suministros, reposición | Menores |
| Fiscalidad | Sin reducciones de vivienda | Reducciones de hasta el 100 % |
| Tiempo | Mucho | Poco |

## 2. Planifica la transición

- Última reserva y fecha de puesta a punto.
- Decide qué muebles se quedan.
- Actualiza el certificado energético.
- Da de baja la actividad turística cuando corresponda.

## 3. Elige bien el inquilino

Un buen inquilino de larga duración vale más que muchas reservas. Con RentaHucha, además, su hucha pasa a ti si hay impago.

Más ideas en [cómo poner tu piso en alquiler](/blog/como-poner-tu-piso-en-alquiler-paso-a-paso).`,
  },
  {
    slug: 'inquilino-no-paga-suministros-que-hacer',
    title: 'El inquilino no paga los suministros: qué puedes hacer',
    excerpt: 'Si las facturas están a tu nombre, la deuda es tuya. Cómo evitarlo y cómo reclamar.',
    audience: A,
    category: 'Impagos',
    publishedAt: D,
    body: `## Si los suministros están a tu nombre

La compañía te reclamará a ti. Puedes repercutir el importe al inquilino según el contrato y, al final, descontarlo de la fianza con las facturas.

## Si están a nombre del inquilino

La deuda es suya, pero un corte puede afectar al piso y al siguiente inquilino.

## Qué hacer

1. Habla con el inquilino y pide los justificantes de pago.
2. Requerimiento por escrito si no paga.
3. Si persiste, el impago de cantidades asimiladas a la renta puede ser causa de resolución, según el contrato.

## Para evitarlo

- **Cambio de titular** al inicio del contrato.
- Lecturas de contadores con foto al entrar y al salir.

Más en [suministros: cambiar el titular o no](/blog/cambio-de-titular-suministros-alquiler).`,
  },
  {
    slug: 'subrogacion-fallecimiento-del-inquilino',
    title: 'Fallece el inquilino: ¿quién puede quedarse en el piso?',
    excerpt: 'La LAU permite que ciertos familiares se subroguen en el contrato. Quiénes y en qué plazo deben comunicarlo.',
    audience: A,
    category: 'Legal',
    publishedAt: D,
    body: `El **artículo 16 de la LAU** permite que ciertas personas se subroguen en el contrato si el inquilino fallece.

## Quién puede subrogarse (por orden)

1. Cónyuge o pareja que convivía con él.
2. Descendientes bajo su patria potestad o que convivieran con él los dos años anteriores.
3. Ascendientes que convivieran con él los dos años anteriores.
4. Hermanos en las mismas condiciones.
5. Personas con discapacidad, en los supuestos previstos.

## Plazo

Deben comunicarlo al propietario por escrito en **tres meses** desde el fallecimiento, con el certificado de defunción y la acreditación de su condición.

## Si nadie se subroga

El contrato se extingue. Coordínate con los herederos para la entrega de llaves y la liquidación de la fianza.`,
  },
  {
    slug: 'clausula-de-necesidad-del-arrendador-como-redactarla',
    title: 'Cláusula de necesidad del arrendador: cómo redactarla bien',
    excerpt: 'Para recuperar tu piso antes de los 5 años tiene que constar en el contrato. Requisitos y errores frecuentes.',
    audience: A,
    category: 'Legal',
    publishedAt: D,
    body: `El **artículo 9.3 de la LAU** permite recuperar la vivienda, pasado el primer año, si la necesitas para ti o para familiares de primer grado, o para tu cónyuge en caso de separación o divorcio. Pero solo si **consta en el contrato**.

## Requisitos

- Que la cláusula esté **en el contrato** desde la firma.
- Ser **persona física**.
- Que haya pasado **al menos un año** de contrato.
- Avisar con **dos meses** de antelación.

## Qué pasa si no la usas

Si en tres meses no ocupas la vivienda con la persona indicada, el inquilino puede elegir volver al piso en las condiciones anteriores o una indemnización.

## Redacción orientativa

> "El arrendador podrá recuperar la vivienda una vez transcurrido el primer año de duración del contrato para destinarla a vivienda permanente para sí o sus familiares en primer grado de consanguinidad o por adopción, o para su cónyuge en los supuestos de sentencia firme de separación, divorcio o nulidad matrimonial, comunicándolo al arrendatario con al menos dos meses de antelación."

Revísala con un profesional antes de usarla.`,
  },
  {
    slug: 'subir-el-alquiler-al-renovar-el-contrato',
    title: '¿Puedo subir el alquiler al renovar el contrato?',
    excerpt: 'Durante la prórroga, solo la actualización pactada. Con un contrato nuevo, sí, con los límites de las zonas tensionadas.',
    audience: A,
    category: 'Rentabilidad',
    publishedAt: D,
    body: `## Durante la prórroga obligatoria o tácita

La renta solo cambia con la **actualización anual** pactada y sus límites legales. No puedes fijar una renta nueva.

## Al terminar el contrato

Si el contrato termina (por ejemplo, tras los 5 o 7 años y con el preaviso correcto) y firmas uno **nuevo**:

- Fuera de zona tensionada, puedes pactar una renta nueva.
- En zona tensionada, hay límites a la renta del nuevo contrato.

## Ojo con las prórrogas extraordinarias

El decreto de octubre de 2026, si se convalida, permite a muchos inquilinos pedir prórrogas en las mismas condiciones. Lee [la prórroga extraordinaria](/blog/prorroga-extraordinaria-alquiler-2026-quien-puede-pedirla).

## Un consejo

Un buen inquilino que se queda vale dinero: evita meses vacíos y gastos de rotación.`,
  },
  {
    slug: 'seguro-de-impago-cuanto-cuesta-y-que-mirar',
    title: 'Seguro de impago de alquiler: cuánto cuesta en 2026 (precios y ejemplos) y qué mirar antes de contratarlo',
    excerpt: 'Suele costar entre un 3 % y un 6 % de la renta anual, con primas mínimas. Ejemplos con 700, 900 y 1.200 € de renta, qué comparar entre pólizas y por qué ya no puedes exigir al inquilino que lo pague.',
    audience: A,
    category: 'Protección',
    publishedAt: D,
    body: `El seguro de impago es un producto de las aseguradoras que contrata el **propietario**, con la compañía que elija. RentaHucha no vende seguros, pero te explicamos cuánto cuesta y qué mirar.

## Cuánto cuesta

La prima se calcula, en general, como un **porcentaje de la renta anual**, con una **prima mínima** que hace que en rentas bajas el porcentaje real suba.

| Fuente | Precio que recoge |
|---|---|
| OCU, comparativa de 17 seguros de 8 aseguradoras (julio de 2026) | La opción más barata rondaba el **3 % de la renta anual**, con una prima mínima de unos 130 €; otras compañías fijan mínimos de 200 € o más |
| Arrenta | Entre el **3,5 % y el 6 %** de la renta anual |
| Saber de Seguros | Entre el **3 % y el 5 %** de la renta anual |

## Ejemplos

| Renta mensual | Renta anual | Al 3 % | Al 5 % |
|---|---|---|---|
| 700 € | 8.400 € | 252 € | 420 € |
| 900 € | 10.800 € | 324 € | 540 € |
| 1.200 € | 14.400 € | 432 € | 720 € |

El precio final depende de las coberturas (meses cubiertos, defensa jurídica, daños) y del perfil del inquilino: pide siempre varias ofertas.

## Quién lo paga: el propietario

Con el Real Decreto-ley 29/2026 (en vigor desde el 8 de octubre de 2026 y pendiente de convalidación), el artículo 36.5 de la LAU dice que **en ningún caso puede exigirse al inquilino que contrate un seguro de impago u otras coberturas análogas**. La prima es un gasto del propietario, y es **deducible** en el IRPF del alquiler.

## Qué comparar

| Punto | Pregunta |
|---|---|
| Meses cubiertos | ¿Cuántas rentas paga como máximo? |
| Carencia | ¿Desde cuándo cubre tras firmar? |
| Franquicia | ¿Hay meses que no paga al principio? |
| Requisitos | ¿Qué ingresos y documentos exige al inquilino? Muchas piden que la renta no pase de un 35-45 % de sus ingresos |
| Defensa jurídica | ¿Incluye abogado y procurador? |
| Daños | ¿Cubre desperfectos o actos vandálicos? ¿Con qué límite? |
| Plazos | ¿En cuánto tiempo hay que comunicar el impago? |
| Prima mínima | ¿Cuánto pagas si tu renta es baja? |

## ¿Lo necesito?

Depende de cuánto te afecte un impago. Calcula [cuánto te puede costar un impago](/herramientas/coste-impago) y compáralo con la prima. Ten en cuenta también que, desde octubre de 2026, si el inquilino es económicamente vulnerable, la Administración debe pagar la deuda o subrogarse en ella: [qué dice el decreto](/blog/desahucios-vulnerabilidad-hasta-2030-que-dice-el-decreto).

## Compatible con RentaHucha

Desde el lanzamiento, la selección del inquilino y su hucha (que, si hay un impago comprobado, se usa para pagarte lo pendiente) sumarán a cualquier seguro que contrates.

## Fuentes

- OCU: [Mejores seguros de impago de rentas de alquiler 2026](https://www.ocu.org/fincas-y-casas/gestion/seguros-y-prestamos/analisis/2026/07/comparativa-seguros-impago-rentas).
- Arrenta: [¿Cuánto cuesta un seguro de impago de alquiler?](https://www.arrenta.es/blog/seguro-impago/precio-seguro-impago-alquiler-cuanto-cuesta/).
- Saber de Seguros: [Cuánto cuesta un seguro de impago de alquiler (precios 2026)](https://www.saberdeseguros.es/seguro-impago-alquiler-precio/).
- BOE: [Real Decreto-ley 29/2026](https://www.boe.es/buscar/act.php?id=BOE-A-2026-20823), artículo 3 (nuevo artículo 36.5 de la LAU).`,
  },
  {
    slug: 'fotos-con-ia-home-staging-virtual-sin-enganar',
    title: 'Fotos con IA y home staging virtual: cómo usarlos sin engañar',
    excerpt: 'Mejorar la luz está bien; amueblar virtualmente, también, si lo indicas. Lo que no debes hacer en un anuncio.',
    audience: A,
    category: 'Poner en alquiler',
    publishedAt: D,
    body: `## Lo que sí

- Corregir **luz, color y encuadre**.
- **Amueblado virtual** de un piso vacío, indicándolo en la foto.
- Un render de **cómo podría quedar** una estancia, etiquetado.

## Lo que no

- Borrar humedades, grietas o defectos.
- Cambiar las vistas por la ventana.
- Mostrar muebles o electrodomésticos que no estarán.

## Por qué importa

Un anuncio engañoso genera visitas inútiles, desconfianza y posibles reclamaciones. Las fotos honestas atraen al inquilino adecuado.`,
  },
  {
    slug: 'alquilar-con-mascotas-pros-y-contras-propietario',
    title: 'Aceptar mascotas en tu piso: pros y contras para el propietario',
    excerpt: 'Más candidatos y estancias más largas frente a posibles desperfectos. Cómo decidir y protegerte.',
    audience: A,
    category: 'Poner en alquiler',
    publishedAt: D,
    body: `| A favor | En contra |
|---|---|
| Más candidatos interesados | Posibles arañazos y olores |
| Suelen quedarse más tiempo | Ruidos o molestias a vecinos |
| Te diferencias de otros pisos | Más limpieza al final |

## Cómo protegerte

- **Cláusula** con el tipo y número de animales.
- **Inventario** con fotos detalladas.
- **Seguro de responsabilidad civil** del inquilino para daños a terceros.
- Suelos y textiles resistentes.

La fianza responde de los daños al final del contrato, no del desgaste normal. Más en [alquilar con mascota](/blog/alquilar-con-mascota).`,
  },
  {
    slug: 'gastos-deducibles-alquiler-que-se-olvidan',
    title: 'Gastos deducibles del alquiler que casi todo el mundo olvida',
    excerpt: 'Amortización del inmueble y del mobiliario, intereses, seguros, honorarios y saldos de dudoso cobro.',
    audience: A,
    category: 'Fiscalidad',
    publishedAt: D,
    body: `Muchos propietarios declaran el IBI y la comunidad, y se olvidan de lo demás.

| Gasto | Cómo se deduce |
|---|---|
| **Amortización del inmueble** | 3 % anual sobre el mayor entre el coste de adquisición y el valor catastral, sin el valor del suelo |
| **Mobiliario y electrodomésticos** | 10 % anual |
| **Intereses de la hipoteca** | Con límite conjunto con las reparaciones |
| **Seguros** | Hogar, impago, responsabilidad civil |
| **Honorarios** | Agencia, gestión, abogado, gestoría |
| **Saldos de dudoso cobro** | Rentas impagadas, con requisitos |
| **Certificado energético** | Gasto del año |
| **Tasas** | Basuras, vados |

Consulta las reglas exactas cada año y guarda todas las facturas. Más en [cómo declarar el alquiler en la renta](/blog/como-declarar-el-alquiler-en-la-renta).`,
  },
  {
    slug: 'comunidad-de-propietarios-normas-y-alquiler',
    title: 'Comunidad de propietarios y alquiler: normas que afectan a tus inquilinos',
    excerpt: 'Estatutos, uso de zonas comunes, obras y pisos turísticos: qué puede decidir la comunidad.',
    audience: A,
    category: 'Gestión',
    publishedAt: D,
    body: `## Lo que el inquilino debe cumplir

Los estatutos y las normas de régimen interior: horarios, zonas comunes, basuras, mascotas en zonas comunes.

## Lo que puede decidir la comunidad

- **Limitar o condicionar los pisos turísticos** por mayoría reforzada, según la Ley de Propiedad Horizontal.
- Aprobar **obras** y derramas (las paga el propietario, salvo pacto).
- Sancionar **actividades molestas**, que pueden acabar en una acción contra el ocupante.

## Buenas prácticas

- Entrega al inquilino las **normas** de la comunidad con el contrato.
- Informa al **administrador** de quién vive en el piso, para avisos.`,
  },
  {
    slug: 'cuando-puedo-entrar-en-mi-piso-alquilado',
    title: '¿Cuándo puedo entrar en mi piso alquilado?',
    excerpt: 'Solo con permiso del inquilino. Cómo pactar visitas para obras, revisiones o enseñar el piso.',
    audience: A,
    category: 'Legal',
    publishedAt: D,
    body: `La vivienda alquilada es el **domicilio del inquilino**, protegido por la Constitución. Entrar sin su consentimiento puede ser delito, aunque seas el propietario.

## Cuándo pedir acceso

- Reparaciones y obras necesarias.
- Revisión anual acordada.
- Enseñar el piso a futuros inquilinos o compradores, si se pactó.

## Cómo hacerlo

1. Pide la visita **por escrito**, con antelación.
2. Propón franjas horarias.
3. Respeta su respuesta.

## Una cláusula útil

Pacta en el contrato visitas razonables con preaviso para reparaciones y para enseñar el piso en los últimos meses del contrato.`,
  },
  {
    slug: 'contrato-alquiler-por-habitaciones-como-hacerlo',
    title: 'Contrato de alquiler por habitaciones en 2026: qué ley se aplica ahora y qué incluir',
    excerpt: 'Con el decreto de octubre de 2026, alquilar una habitación es arrendamiento de vivienda (habitual o temporal) y la suma de habitaciones no puede superar la renta del piso completo. Qué incluir en el contrato.',
    audience: A,
    category: 'Legal',
    publishedAt: D,
    body: `> **Actualizado a 22 de octubre de 2026.** El Real Decreto-ley 29/2026 (en vigor desde el 8 de octubre y pendiente de convalidación) cambia la regulación del alquiler por habitaciones.

## Qué norma se aplica ahora

Hasta el decreto, el alquiler de una habitación solía regirse por el Código Civil y lo pactado. Ahora la **Ley de Arrendamientos Urbanos** incluye expresamente el **arrendamiento parcial de una habitación o estancia**:

| Si la habitación es… | Tipo de contrato | Lo esencial |
|---|---|---|
| La vivienda habitual del inquilino | **Arrendamiento de vivienda habitual** | Plazos y prórrogas de la LAU, fianza de una mensualidad, garantía adicional de como máximo dos |
| Para una necesidad temporal (estudios, trabajo por un tiempo) | **Arrendamiento de vivienda temporal** | Causa escrita y acreditable, más de 31 días y en general hasta 12 meses, garantía adicional de una mensualidad como máximo |

Quedan fuera las cesiones sin ánimo de lucro de entidades del tercer sector en programas de acogida. Y las comunidades autónomas pueden tener normas propias.

## El límite de precio

- La **suma de las rentas** de las habitaciones alquiladas a la vez en una vivienda **no puede superar la renta del contrato del piso completo**.
- En **zona tensionada**, esa renta debe respetar además los límites de la zona (en general, la del contrato anterior; para grandes tenedores, el índice).

## Qué incluir en el contrato

| Bloque | Contenido |
|---|---|
| Tipo de contrato | Vivienda habitual o vivienda temporal (y, si es temporal, **la causa**, que tendrás que poder probar) |
| Objeto | Habitación concreta y zonas comunes de uso compartido |
| Duración y preaviso | Según el tipo de contrato |
| Renta y gastos | Qué incluye (suministros, internet, limpieza) |
| Normas de convivencia | Visitas, ruido, limpieza |
| Fianza y garantías | Fianza legal y garantía adicional dentro de los límites; no puedes exigir seguro de impago |
| Inventario | Estado de la habitación y del mobiliario, con fotos |

Al terminar, firmad el [documento de finalización](/blog/documento-finalizacion-contrato-alquiler-plantilla) con el estado de la habitación.

## Anuncio

Si anuncias las habitaciones, recuerda los datos que exige ahora el anuncio: [qué debe incluir tu anuncio](/blog/que-debe-incluir-un-anuncio-de-alquiler-decreto-29-2026).

## Fuentes

- BOE: [Real Decreto-ley 29/2026, de 6 de octubre](https://www.boe.es/buscar/act.php?id=BOE-A-2026-20823), artículo 3 (nuevos artículos 2, 5.f) y 17.9 de la LAU). Consultado el 22-10-2026.

¿Vas a alquilar habitaciones? [Publícalas gratis en RentaHucha](/cuenta/registro) y pide una [valoración del alquiler](/valoracion-alquiler).`,
  },
  {
    slug: 'alquilar-a-empresas-para-sus-trabajadores',
    title: 'Alquilar tu piso a una empresa para sus trabajadores',
    excerpt: 'Ventajas, tipo de contrato y fiscalidad cuando el inquilino es una empresa.',
    audience: A,
    category: 'Poner en alquiler',
    publishedAt: D,
    body: `## Ventajas

- Solvencia empresarial.
- Pagos puntuales y por transferencia.
- Contratos de duración conocida.

## Qué contrato

Si la empresa alquila para que viva un trabajador, la calificación (vivienda o uso distinto) y el régimen pueden variar. Revisa el contrato con un profesional.

## Fiscalidad

- Puede haber diferencias en IVA y reducciones respecto al alquiler a particulares.
- Pide asesoramiento antes de firmar.

## Consejo

Identifica en el contrato quién vivirá en el piso y qué pasa si cambia de trabajador.`,
  },
  {
    slug: 'valorar-piso-alquiler-indice-de-referencia',
    title: 'Cómo valorar tu piso para alquilarlo con el índice de referencia',
    excerpt: 'Qué es el sistema estatal de referencia de precios del alquiler, cómo consultarlo y cómo combinarlo con comparables.',
    audience: A,
    category: 'Rentabilidad',
    publishedAt: D,
    body: `El **Sistema Estatal de Referencia de Precios del Alquiler** del Ministerio de Vivienda da un rango de precio por metro cuadrado para cada vivienda según su zona y características.

## Para qué sirve

- En **zonas tensionadas**, limita la renta de ciertos contratos (grandes tenedores y viviendas sin alquilar en los últimos años).
- Fuera de ellas, es una **referencia** útil.
- Algunas bonificaciones fiscales dependen de alquilar por debajo del índice.

## Cómo consultarlo

En la web del Ministerio de Vivienda, con la referencia catastral y las características de la vivienda.

## Cómo combinarlo

1. Consulta el índice.
2. Busca 6–10 comparables reales.
3. Ajusta por estado, amueblado y extras.
4. Fija un precio de salida y revísalo a los 15 días.

Más en [cómo calcular cuánto pedir](/blog/como-calcular-la-renta-de-tu-piso).`,
  },
  {
    slug: 'inquilino-se-va-sin-avisar-que-hacer',
    title: 'El inquilino se va sin avisar: qué hacer',
    excerpt: 'Preaviso incumplido, llaves no devueltas y rentas pendientes: cómo recuperar el piso y reclamar.',
    audience: A,
    category: 'Impagos',
    publishedAt: D,
    body: `## Antes de entrar

Asegúrate de que se ha ido: intenta contactar, pregunta a vecinos y revisa si ha devuelto las llaves. Entrar si sigue viviendo allí puede ser un problema.

## Si ha devuelto las llaves

1. Revisión del piso con **fotos**.
2. Lecturas de contadores.
3. Liquidación de la fianza con rentas y daños pendientes.

## Si no las ha devuelto

Pide asesoramiento: puede ser necesario acreditar el abandono o acudir al juzgado para recuperar la posesión.

## Lo que puedes reclamar

- Rentas pendientes.
- La **indemnización por desistimiento** pactada en el contrato (hasta un mes por año que quedara), si se pactó.
- Daños más allá del desgaste normal.`,
  },
  {
    slug: 'gestionar-tu-alquiler-o-con-inmobiliaria-cuando-compensa',
    title: '¿Gestionar tú el alquiler o con una inmobiliaria? Cuándo compensa cada opción',
    excerpt: 'Tiempo, cercanía, número de pisos y conocimiento legal: una guía para decidir sin prejuicios.',
    audience: A,
    category: 'Gestión',
    publishedAt: D,
    body: `## Gestionar tú compensa si…

- Vives cerca del piso.
- Tienes tiempo para visitas, cobros e incidencias.
- Conoces la normativa básica.

## Una inmobiliaria compensa si…

- Vives lejos o no tienes tiempo.
- Tienes varios pisos.
- Quieres asesoramiento normativo y fiscal.
- Prefieres que otro gestione los problemas.

## Lo que debe incluir una buena agencia

Selección con datos, contrato actualizado, fianza depositada, informe mensual y un protocolo claro de impagos.

## Con RentaHucha

Tanto si gestionas tú como si trabajas con una agencia, puedes alquilar a inquilinos verificados con una hucha anti-impago.`,
  },
  {
    slug: 'verificar-identidad-del-inquilino',
    title: 'Cómo verificar la identidad del inquilino y evitar fraudes',
    excerpt: 'Documentos falsos, suplantaciones y nóminas manipuladas: señales de alarma y cómo comprobarlas.',
    audience: A,
    category: 'Selección',
    publishedAt: D,
    body: `## Señales de alarma

- Prisa extrema y ofertas de pagar meses por adelantado.
- Documentos con tipografías raras o datos que no cuadran.
- Nóminas con importes redondos y sin retenciones lógicas.
- Pagos desde cuentas de terceros.

## Cómo comprobarlo

1. **DNI o NIE** en persona o por videollamada, comparando la foto.
2. **Ingresos** con documentación coherente o con verificación bancaria con su consentimiento.
3. **Referencias** de caseros anteriores.
4. **Contrato y pagos** a nombre de la misma persona.

## Protección de datos

Pide solo lo necesario y bórralo si no firmáis. Más en [cómo elegir un buen inquilino](/blog/como-elegir-un-buen-inquilino).`,
  },
  {
    slug: 'certificado-energetico-obligaciones-y-multas',
    title: 'Certificado energético para alquilar: obligaciones y sanciones',
    excerpt: 'Cuándo es obligatorio, qué debe aparecer en el anuncio y qué pasa si alquilas sin él.',
    audience: A,
    category: 'Legal',
    publishedAt: D,
    body: `## Obligaciones

- Tenerlo **antes de anunciar** el piso.
- Mostrar la **calificación** en el anuncio.
- Entregar una copia al inquilino.
- Registrarlo en el organismo de tu comunidad.

## Validez

En general **10 años**, o 5 si la calificación es G.

## Sanciones

Alquilar o anunciar sin certificado puede conllevar sanciones según la normativa de consumo y la autonómica. Además, transmite poca profesionalidad.

Para mejorar tu letra, lee [cómo mejorar el certificado energético](/blog/mejorar-certificado-energetico-piso-alquiler).`,
  },
  {
    slug: 'cedula-de-habitabilidad-para-alquilar',
    title: 'Cédula de habitabilidad: ¿la necesito para alquilar?',
    excerpt: 'Depende de tu comunidad autónoma. Qué es, dónde se exige y cómo obtenerla.',
    audience: A,
    category: 'Legal',
    publishedAt: D,
    body: `La **cédula de habitabilidad** (o licencia de primera ocupación, según el caso) acredita que la vivienda cumple las condiciones mínimas para vivir.

## ¿Es obligatoria?

Depende de la **comunidad autónoma**. En algunas se exige para alquilar o para dar de alta los suministros. En otras se sustituye por otros documentos.

## Cómo obtenerla

1. Un técnico revisa la vivienda.
2. Emite un certificado.
3. Se presenta en el organismo autonómico o municipal.

## Consejo

Consulta la normativa de tu comunidad antes de anunciar. Si no la necesitas, guarda igualmente la documentación que acredite el estado de la vivienda.`,
  },
  {
    slug: 'elegir-entre-varios-candidatos-a-inquilino',
    title: 'Cómo elegir entre varios candidatos a inquilino',
    excerpt: 'Una tabla de criterios objetivos para decidir sin dudas y sin discriminar.',
    audience: A,
    category: 'Selección',
    publishedAt: D,
    body: `| Criterio | Peso | Qué mirar |
|---|---|---|
| Ratio renta/ingresos | Alto | Idealmente por debajo del 30–35 % |
| Estabilidad de ingresos | Alto | Antigüedad, tipo de contrato o actividad |
| Historial de pagos | Alto | Referencias o pasaporte de inquilino |
| Encaje con el piso | Medio | Número de personas, fecha de entrada |
| Duración deseada | Medio | Larga estancia frente a temporada |

## Reglas

- Mismos criterios para todos.
- Nada de criterios discriminatorios.
- Decide rápido: los buenos candidatos no esperan.

Más en [cómo elegir un buen inquilino](/blog/como-elegir-un-buen-inquilino).`,
  },
  {
    slug: 'inquilino-quiere-irse-antes-indemnizacion',
    title: 'Tu inquilino quiere irse antes de tiempo: indemnización y preaviso',
    excerpt: 'A partir del sexto mes puede desistir con 30 días de aviso. Cuándo puedes cobrar indemnización.',
    audience: A,
    category: 'Legal',
    publishedAt: D,
    body: `## Lo que dice la LAU (artículo 11)

El inquilino puede **desistir** del contrato de vivienda una vez pasados **seis meses**, avisando con **30 días** de antelación.

## La indemnización

Solo si **se pactó** en el contrato: como máximo, **una mensualidad por cada año** que quede de contrato (los periodos inferiores, a prorrata).

## Ejemplo

Quedan 18 meses de contrato y la renta es de 800 €: la indemnización máxima sería de 1.200 €.

## Consejo práctico

A veces compensa más **facilitar la salida** y alquilar rápido a un nuevo inquilino que discutir la indemnización.`,
  },
]
