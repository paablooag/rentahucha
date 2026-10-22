import type { BlogPost } from '#shared/utils/blog'

// Quinta tanda (versión 5): inquilinos. Respuestas a búsquedas frecuentes, con guías largas (con preguntas
// frecuentes para los datos estructurados) y respuestas cortas. Normativa: LAU y Ley 12/2023.

type Seed = Omit<BlogPost, 'updatedAt' | 'published'>
const D = '2026-10-16'
const A = 'inquilinos' as const

export const BLOG_SEED_V5_INQUILINOS: Seed[] = [
  {
    slug: 'que-pasa-si-no-pago-el-alquiler-un-mes',
    title: '¿Qué pasa si no pago el alquiler un mes?',
    excerpt: 'Un retraso puntual no es un desahucio, pero tiene consecuencias. Qué hacer para no empeorar la situación.',
    audience: A,
    category: 'Derechos',
    publishedAt: D,
    body: `Un mes sin pagar no te deja en la calle al día siguiente, pero **sí es un incumplimiento** que permite al propietario iniciar un desahucio.

## Lo que puede pasar

1. El propietario te reclama el pago.
2. Si no pagas, puede enviarte un **requerimiento** formal.
3. Si sigue sin resolverse, puede **demandar** por falta de pago.

## Qué hacer

- **Avisa antes** de que llegue la fecha, si sabes que no vas a poder pagar.
- Propón un **plan concreto**: "pago la mitad ahora y el resto el día 20".
- Déjalo **por escrito**.
- Si tu situación es grave, acude a los **servicios sociales** de tu ayuntamiento: hay ayudas para emergencias.

## La hucha

Si alquilas con RentaHucha y hay un impago, el saldo de tu hucha pasa al propietario. Por eso merece la pena hablar a tiempo y no llegar a ese punto: si cumples, la recuperas con un bonus.`,
  },
  {
    slug: 'puede-el-casero-entrar-en-mi-casa',
    title: '¿Puede el casero entrar en mi casa sin permiso?',
    excerpt: 'No. La vivienda alquilada es tu domicilio. Cuándo debes dejarle pasar y cómo organizar las visitas.',
    audience: A,
    category: 'Derechos',
    publishedAt: D,
    body: `**No.** Tu vivienda alquilada es tu domicilio, protegido por la Constitución. El propietario necesita tu **consentimiento** para entrar, aunque tenga llaves.

## Cuándo es razonable dejarle pasar

- Para **reparaciones** necesarias.
- Para **obras** que no pueden esperar.
- Para **enseñar el piso**, si se pactó en el contrato y con aviso.

## Cómo organizarlo

- Pide que te avise por escrito y con antelación.
- Acordad un día y una hora.
- Puedes estar presente.

## Si entra sin permiso

Guarda pruebas y consulta con una asociación de consumidores o un abogado: puede constituir un delito de allanamiento.`,
  },
  {
    slug: 'el-casero-vende-el-piso-que-pasa-con-mi-contrato',
    title: 'El casero vende el piso: ¿qué pasa con mi contrato de alquiler?',
    excerpt: 'El comprador tiene que respetar tu contrato y tú puedes tener derecho a comprar antes que nadie. Todo lo que debes saber.',
    audience: A,
    category: 'Derechos',
    publishedAt: D,
    body: `Si tu casero vende el piso, **tu contrato no se acaba**. Esto es lo que dice la ley.

## El nuevo propietario respeta tu contrato

Según el **artículo 14 de la LAU**, el comprador se **subroga**: ocupa el lugar del antiguo propietario con los mismos derechos y obligaciones. Debe respetar tu contrato, al menos hasta cumplir la duración mínima legal (5 años, o 7 si el arrendador era una empresa).

## Tu derecho a comprar primero

El **artículo 25 de la LAU** te da un derecho de adquisición preferente:

- **Tanteo**: el propietario debe notificarte la venta, con el precio y las condiciones. Tienes **30 días naturales** para comprar en esas condiciones.
- **Retracto**: si no te lo notificaron o se vendió en otras condiciones, puedes comprar en esas condiciones en los **30 días** siguientes a conocer la venta.

Ojo: en algunos contratos se renuncia a este derecho. Revisa el tuyo.

## Qué pasa con tu fianza

El nuevo propietario asume la obligación de devolvértela al final del contrato.

## Qué hacer

1. Pide por escrito los datos del nuevo propietario y la nueva cuenta de pago.
2. No pagues a nadie sin confirmación.
3. Guarda tu contrato y tus recibos.

## Si el nuevo propietario quiere el piso para él

Solo podría recuperarlo por necesidad si la **cláusula de necesidad** estaba en tu contrato y se cumplen los requisitos del artículo 9.3 de la LAU (que haya pasado un año, preaviso de dos meses…). La compra, por sí sola, no le da ese derecho.

## Si te ofrecen dinero por irte

Es legal negociar una salida voluntaria. Antes de aceptar:

- Calcula cuánto te costaría **mudarte** (fianza, mudanza, renta del nuevo piso).
- Pide el acuerdo **por escrito**: fecha de salida, importe, devolución de la fianza y estado del piso.
- No firmes con prisas: tu contrato sigue vigente.

## Checklist

- [ ] Datos del nuevo propietario por escrito
- [ ] Nueva cuenta de pago confirmada
- [ ] Copia de tu contrato y recibos a mano
- [ ] Revisar tu derecho de tanteo y retracto (en contratos desde el 8-10-2026 no se puede renunciar a él)
- [ ] Fianza: confirmar que se transfiere al nuevo propietario

## Preguntas frecuentes

### ¿Me pueden echar porque venden el piso?
No mientras el contrato esté en vigor. La venta no es causa para resolverlo.

### ¿Tengo que dejar que visiten el piso los compradores?
Es tu domicilio: no pueden entrar sin tu consentimiento. Si el contrato lo prevé, colabora con visitas razonables y avisadas.

### ¿Me pueden subir la renta por la venta?
No. El nuevo propietario mantiene las condiciones del contrato, incluida la renta y su actualización pactada.`,
  },
  {
    slug: 'derecho-de-tanteo-y-retracto-del-inquilino',
    title: 'Derecho de tanteo y retracto: cómo comprar tu piso de alquiler antes que nadie',
    excerpt: 'Si tu casero vende, puedes tener preferencia para comprar. Plazos y cómo ejercerlo.',
    audience: A,
    category: 'Derechos',
    publishedAt: D,
    body: `## En qué consiste

Si el propietario vende tu vivienda, tienes derecho a **comprarla en las mismas condiciones** que el comprador.

| Derecho | Plazo | Cuándo |
|---|---|---|
| Tanteo | 30 días naturales | Desde que te notifican la venta |
| Retracto | 30 días naturales | Si no te notificaron o cambiaron las condiciones |

## Cómo ejercerlo

1. Responde **por escrito** (burofax) dentro del plazo.
2. Ten preparada la **financiación**: el precio es el mismo.
3. Consulta con un abogado si hay dudas.

Revisa si en tu contrato renunciaste a este derecho. Más en [el casero vende el piso](/blog/el-casero-vende-el-piso-que-pasa-con-mi-contrato).`,
  },
  {
    slug: 'subarrendar-una-habitacion-es-legal',
    title: 'Subarrendar una habitación: ¿es legal?',
    excerpt: 'Solo con permiso escrito del propietario y sin cobrar más que tu renta. Lo que dice la LAU.',
    audience: A,
    category: 'Derechos',
    publishedAt: D,
    body: `Según el **artículo 8 de la LAU**, puedes subarrendar **parte** de la vivienda solo con el **consentimiento escrito** del propietario.

## Reglas

- **Nunca la vivienda entera**: solo una parte.
- El subarriendo termina cuando termina tu contrato.
- El precio no puede ser mayor que la parte proporcional de tu renta.

## Si lo haces sin permiso

El propietario puede **resolver tu contrato**. No merece la pena.

## Alternativa

Si vais a vivir varias personas, lo mejor es que **todos firméis** el contrato. Lee [cómo repartir gastos y quién firma](/blog/compartir-piso-gastos-y-contrato).`,
  },
  {
    slug: 'alquilar-piso-siendo-autonomo',
    title: 'Alquilar un piso siendo autónomo: documentos que convencen',
    excerpt: 'Sin nómina también se puede. Qué documentación presentar para demostrar ingresos estables.',
    audience: A,
    category: 'Buscar piso',
    publishedAt: D,
    body: `Los propietarios piden nóminas porque son fáciles de entender. Como autónomo, tienes que **traducir tus ingresos** a algo igual de claro.

## Documentación que funciona

| Documento | Qué demuestra |
|---|---|
| Última declaración de la renta | Ingresos anuales reales |
| Pagos fraccionados del IRPF del año | Que la actividad sigue |
| Certificados de estar al corriente con Hacienda y la Seguridad Social | Que cumples |
| Extractos bancarios | Ingresos regulares |
| Contratos con clientes | Estabilidad futura |

## Cómo presentarlo

- Un **resumen de una página**: ingresos medios mensuales, años de actividad y clientes principales.
- Ofrece **verificación bancaria** con tu consentimiento.
- Si tu perfil lo permite, una **garantía adicional** (dentro del límite legal) da confianza.

## Tu historial vale

Si has pagado tu alquiler anterior sin falta, demuéstralo. Es la idea del [pasaporte de inquilino](/blog/pasaporte-de-inquilino-demostrar-buen-pagador).`,
  },
  {
    slug: 'alquilar-piso-siendo-extranjero',
    title: 'Alquilar un piso en España siendo extranjero: NIE, cuenta y garantías',
    excerpt: 'Qué documentos te pedirán, si necesitas NIE y cómo dar confianza al propietario cuando acabas de llegar.',
    audience: A,
    category: 'Buscar piso',
    publishedAt: D,
    body: `## Documentos habituales

- **Pasaporte o documento de identidad**, y NIE si ya lo tienes.
- **Contrato de trabajo** o carta de la empresa.
- **Extractos bancarios** o justificante de ahorros.
- Si eres estudiante, **matrícula** y justificante de beca o ingresos.

## ¿Necesito NIE?

Para firmar el contrato no siempre es imprescindible, pero facilita muchos trámites: cuenta bancaria, suministros, empadronamiento.

## Cómo dar confianza

- Contrato de trabajo en España o carta de traslado.
- Referencias de alquileres anteriores, aunque sean de otro país.
- Una garantía adicional dentro del límite legal.

## Cuidado con las estafas

No pagues nada sin ver el piso ni firmar. Lee [señales de un anuncio falso](/blog/senales-de-un-anuncio-de-alquiler-falso).`,
  },
  {
    slug: 'como-reclamar-la-fianza-si-no-te-la-devuelven',
    title: 'Cómo reclamar la fianza si no te la devuelven: guía paso a paso',
    excerpt: 'Plazos, intereses, burofax y juicio monitorio. Todo lo que puedes hacer para recuperar tu fianza.',
    audience: A,
    category: 'Derechos',
    publishedAt: D,
    body: `Al terminar el contrato, el propietario debe devolverte la fianza, descontando solo lo que esté **justificado**: rentas o suministros pendientes y daños más allá del desgaste normal.

## Plazos

Según el **artículo 36 de la LAU**, si la fianza no se devuelve en **un mes** desde la entrega de las llaves, genera el **interés legal del dinero**.

## Paso 1: pídela por escrito

Email o mensaje con la fecha de entrega de llaves, el importe y tu número de cuenta.

## Paso 2: burofax

Si no responde, envía un **burofax** con certificación de contenido reclamando la fianza y los intereses, y dando un plazo.

## Paso 3: mediación o consumo

Algunas comunidades y ayuntamientos tienen servicios de mediación en vivienda. Las asociaciones de consumidores también pueden ayudarte.

## Paso 4: juicio monitorio

Es un procedimiento sencillo para reclamar deudas. Para la petición inicial **no necesitas abogado ni procurador**, y en reclamaciones de hasta 2.000 € tampoco en el juicio verbal posterior.

## Pruebas que te salvan

- Fotos y vídeo del piso al entrar y al salir.
- El inventario firmado.
- El documento de entrega de llaves.
- Las lecturas de los contadores.

## Qué puede descontar el propietario (y qué no)

| Puede descontar, con justificación | No puede descontar |
|---|---|
| Rentas pendientes | El desgaste normal por el uso |
| Suministros impagados a su nombre | Pintura deslucida tras años |
| Daños más allá del uso normal | Averías por antigüedad de los aparatos |
| Limpieza si dejaste el piso muy sucio | Mejoras que quiera hacer para el siguiente inquilino |

## Contenido del burofax (orientativo)

- Tus datos y los del propietario.
- Dirección de la vivienda y fecha del contrato.
- **Fecha de entrega de las llaves**.
- Importe de la fianza y cuenta para la devolución.
- Petición de devolución en un plazo (por ejemplo, 10 días) más el interés legal desde el mes siguiente a la entrega.
- Aviso de que, si no, reclamarás por vía judicial.

## Si el propietario no responde

1. Comprueba si tu comunidad tiene un servicio de **mediación** en vivienda.
2. Reúne todas las pruebas.
3. Presenta un **juicio monitorio** en el juzgado de tu domicilio o el de la vivienda, según corresponda.

## Preguntas frecuentes

### ¿Puede quedarse la fianza por pintar el piso?
No por el desgaste normal de la pintura tras años de uso. Sí si pintaste de otro color sin permiso o hay daños.

### ¿Y si dice que la fianza está depositada en la comunidad autónoma?
Es su obligación recuperarla y devolvértela. El depósito no retrasa tu derecho.

### ¿Cuánto tiempo tengo para reclamar?
Hay plazos de prescripción para reclamar deudas. No esperes: reclama cuanto antes.

Usa también [la checklist para salir del piso](/blog/salir-del-piso-y-recuperar-la-fianza-checklist).`,
  },
  {
    slug: 'que-es-el-irav-subida-del-alquiler',
    title: 'Qué es el IRAV y cuánto te pueden subir el alquiler este año',
    excerpt: 'El índice del INE que limita la actualización de muchos contratos. Cómo saber si te afecta y comprobar la subida.',
    audience: A,
    category: 'Derechos',
    publishedAt: D,
    body: `El **IRAV** es el índice que publica el INE cada mes para limitar la actualización anual de los contratos de alquiler de vivienda firmados desde la Ley 12/2023.

## ¿Me afecta?

- Si tu contrato es de vivienda, se firmó desde mayo de 2023 y prevé una actualización anual, **la subida no puede superar el IRAV**.
- Si tu contrato **no dice nada** de actualización, no te pueden subir la renta durante el contrato.

## Además, el decreto de octubre

Si se convalida, hasta el 31-12-2027: subida máxima del 2 % y congelación si tu renta supera el índice de referencia. Lee [cuánto te pueden subir el alquiler](/blog/cuanto-te-pueden-subir-el-alquiler).

## Cómo comprobar la subida

1. Mira la fecha de aniversario del contrato.
2. Busca el IRAV del mes correspondiente en la web del INE.
3. Multiplica tu renta por el porcentaje.
4. Si te piden más, contesta por escrito con el cálculo.`,
  },
  {
    slug: 'bono-alquiler-joven-requisitos-y-como-pedirlo',
    title: 'Bono Alquiler Joven: requisitos generales y cómo pedirlo',
    excerpt: 'Qué ofrecían las últimas convocatorias, quién puede pedirlo y dónde informarte de la convocatoria vigente.',
    audience: A,
    category: 'Ahorro',
    publishedAt: D,
    body: `El **Bono Alquiler Joven** es una ayuda estatal que gestionan las comunidades autónomas.

## Lo que ofrecían las últimas convocatorias

| Requisito | Orientación |
|---|---|
| Edad | 18 a 35 años |
| Ingresos | Hasta un límite ligado al IPREM |
| Ayuda | Una cantidad mensual durante un tiempo limitado |
| Renta del piso | Hasta un máximo, que varía por zona |

Las condiciones exactas **cambian con cada convocatoria y comunidad**. Consulta la vigente en la web de tu comunidad autónoma.

## Cómo pedirlo

1. Busca la convocatoria en la web de vivienda de tu comunidad.
2. Prepara el contrato, el empadronamiento y la justificación de ingresos.
3. Presenta la solicitud en plazo.

## Compatibilidades

Revisa si es compatible con deducciones autonómicas y otras ayudas.`,
  },
  {
    slug: 'deduccion-alquiler-vivienda-habitual-comunidad',
    title: 'Deducción por alquiler de vivienda habitual: cómo saber si te corresponde',
    excerpt: 'Muchas comunidades tienen deducciones propias para inquilinos. Dónde buscarlas y qué guardar.',
    audience: A,
    category: 'Ahorro',
    publishedAt: D,
    body: `## Dónde están

- **Deducciones autonómicas**: cada comunidad tiene las suyas, con requisitos de edad, ingresos y renta.
- **Deducción estatal**: el decreto de octubre de 2026 prevé una nueva del 10 % para ingresos bajos, si se convalida. Lee [la deducción del 10 %](/blog/deduccion-irpf-10-por-ciento-inquilinos).

## Cómo saber si te corresponde

En el borrador de la renta, revisa el apartado de deducciones autonómicas o consulta el manual de la Agencia Tributaria de ese año.

## Qué guardar

- Contrato.
- Pagos por **transferencia**.
- Depósito de la fianza, si tu comunidad lo pide.
- NIF del propietario.`,
  },
  {
    slug: 'muere-el-titular-del-contrato-de-alquiler',
    title: 'Muere el titular del contrato de alquiler: ¿puedo quedarme en el piso?',
    excerpt: 'Quién puede subrogarse en el contrato, en qué orden y cómo comunicarlo al propietario.',
    audience: A,
    category: 'Derechos',
    publishedAt: D,
    body: `Si fallece el inquilino, ciertas personas que vivían con él pueden **seguir con el contrato** (artículo 16 de la LAU).

## Quién (por orden)

1. Cónyuge o pareja que convivía.
2. Hijos bajo su patria potestad o que convivían los dos años anteriores.
3. Padres que convivían los dos años anteriores.
4. Hermanos en las mismas condiciones.
5. Personas con discapacidad, en los supuestos previstos.

## Cómo

Comunícalo al propietario **por escrito** en **tres meses** desde el fallecimiento, con el certificado de defunción y la prueba de tu relación y convivencia (por ejemplo, el empadronamiento).`,
  },
  {
    slug: 'divorcio-o-separacion-quien-se-queda-el-piso-de-alquiler',
    title: 'Divorcio o separación: ¿quién se queda el piso de alquiler?',
    excerpt: 'Lo que dice la LAU cuando el titular del contrato se separa y el piso se atribuye al otro cónyuge.',
    audience: A,
    category: 'Derechos',
    publishedAt: D,
    body: `Según el **artículo 15 de la LAU**, en caso de separación, divorcio o nulidad, el cónyuge **no titular** puede seguir usando la vivienda si se le atribuye judicialmente.

## Qué hay que hacer

- Comunicarlo al propietario en **dos meses** desde la resolución judicial.
- Aportar copia de la resolución.

## En parejas no casadas

Lo más seguro es que **ambos firmen** el contrato. Lee [alquilar en pareja](/blog/alquilar-en-pareja-contrato-a-nombre-de-ambos).`,
  },
  {
    slug: 'me-pueden-echar-si-el-casero-necesita-el-piso',
    title: '¿Me pueden echar si el casero necesita el piso?',
    excerpt: 'Solo si consta en el contrato, después del primer año y con dos meses de aviso. Tus derechos si no lo ocupa.',
    audience: A,
    category: 'Derechos',
    publishedAt: D,
    body: `## Requisitos

El propietario puede recuperar la vivienda por necesidad (artículo 9.3 de la LAU) solo si:

- La **cláusula de necesidad** consta en tu contrato.
- Es persona física.
- Ha pasado **al menos un año**.
- La necesita para él, familiares de primer grado o su cónyuge en caso de separación.
- Te avisa con **dos meses** de antelación.

## Si no la ocupa

Si en **tres meses** no la ocupa la persona indicada, puedes elegir **volver** en las mismas condiciones o recibir una **indemnización**.

## Si no está en tu contrato

No puede recuperarla por necesidad durante la prórroga obligatoria.`,
  },
  {
    slug: 'cuanto-preaviso-para-dejar-el-piso-de-alquiler',
    title: '¿Con cuánto preaviso tengo que dejar el piso de alquiler?',
    excerpt: 'Para irte a mitad de contrato, 30 días desde el sexto mes. Al final de una anualidad, 30 días. Al final de los 5 o 7 años, dos meses.',
    audience: A,
    category: 'Derechos',
    publishedAt: D,
    body: `| Situación | Preaviso |
|---|---|
| Quieres irte antes de que acabe el contrato | 30 días, a partir del sexto mes (desistimiento, art. 11 LAU) |
| No quieres renovar al acabar una anualidad, dentro de la duración mínima | 30 días antes de esa fecha (art. 9 LAU) |
| No quieres seguir al acabar los 5 años (7 si el casero es empresa) | 2 meses antes (art. 10 LAU) |
| Durante la prórroga tácita (hasta 3 años más) | 1 mes antes del final de cada anualidad (art. 10 LAU) |

## Indemnización

Si te vas antes y el contrato lo prevé, puede haber una indemnización de hasta un mes por cada año que quedara. Lee [¿puedo irme antes de que acabe el contrato?](/blog/irte-antes-de-tiempo-del-piso-de-alquiler).

## Cómo avisar

Por escrito y con constancia: burofax o email con acuse.`,
  },
  {
    slug: 'clausulas-abusivas-contrato-de-alquiler',
    title: '12 cláusulas abusivas en un contrato de alquiler que no debes firmar',
    excerpt: 'Renuncias a derechos, garantías excesivas, gastos de agencia y penalizaciones desproporcionadas: cómo detectarlas.',
    audience: A,
    category: 'Derechos',
    publishedAt: D,
    body: `Las cláusulas contrarias a la LAU en perjuicio del inquilino son **nulas**, aunque las firmes. Aun así, es mejor detectarlas antes.

## Las 12 más frecuentes

1. **Renunciar a la prórroga** obligatoria de 5 años (o 7).
2. **Fianza** superior a un mes en vivienda.
3. **Garantías adicionales** por encima de dos mensualidades en vivienda habitual.
4. **Gastos de agencia o de formalización** a tu cargo: los paga el propietario desde la Ley 12/2023.
5. **Subidas de renta** sin límite o por encima del índice legal.
6. **Hacerte cargo de todas las reparaciones**, incluidas las estructurales.
7. **Entrada libre del propietario** en la vivienda.
8. **Prohibición de empadronarte**.
9. **Penalizaciones desproporcionadas** por irte antes.
10. **Pago de varios meses por adelantado** como condición.
11. **Renuncia al derecho de desistimiento** tras el sexto mes.
12. **Temporada sin causa** cuando vas a vivir allí de forma habitual.

## Qué hacer si las encuentras

- Pide que se modifiquen antes de firmar.
- Si ya firmaste, no te obligan en lo que contradicen la ley. Consulta con una asociación de consumidores o un abogado.`,
  },
  {
    slug: 'alquilar-piso-con-ninos-que-buscar',
    title: 'Alquilar un piso con niños: qué buscar y tus derechos',
    excerpt: 'Colegios, seguridad, ruido y estabilidad. Lo que conviene mirar y preguntar antes de firmar.',
    audience: A,
    category: 'Buscar piso',
    publishedAt: D,
    body: `## Qué mirar

- **Cercanía** a colegios, parques y centro de salud.
- **Seguridad**: barandillas, ventanas y enchufes.
- **Ascensor**, si es un piso alto.
- **Aislamiento acústico**: los niños hacen ruido y los vecinos también.

## Qué preguntar

- ¿Cuánto tiempo puedo quedarme? Para no cambiar de colegio.
- ¿Admite pequeñas adaptaciones, como protectores o barreras?

## Tus derechos

Ningún propietario puede rechazarte de forma discriminatoria. Y la duración mínima legal te da estabilidad: 5 años (7 si el propietario es una empresa).`,
  },
  {
    slug: 'plagas-en-el-piso-de-alquiler-quien-paga',
    title: 'Plagas en el piso de alquiler (cucarachas, chinches): ¿quién paga?',
    excerpt: 'Depende del origen. Cómo actuar, a quién avisar y cómo documentarlo.',
    audience: A,
    category: 'Derechos',
    publishedAt: D,
    body: `| Situación | Quién suele pagar |
|---|---|
| La plaga ya estaba al entrar o viene del edificio | Propietario o comunidad |
| Aparece por falta de higiene del inquilino | Inquilino |
| Origen dudoso | Conviene acordarlo |

## Qué hacer

1. **Fotos y vídeo** con fecha.
2. Aviso **por escrito** al propietario.
3. Si afecta a todo el edificio, aviso a la **comunidad**.
4. Tratamiento por una **empresa autorizada**, con factura.

Más en [qué hacer si el casero no hace reparaciones](/blog/casero-no-hace-reparaciones-que-hacer).`,
  },
  {
    slug: 'calefaccion-central-o-individual-que-preguntar',
    title: 'Calefacción central o individual: qué preguntar antes de alquilar',
    excerpt: 'Cómo se reparte el coste, si hay contadores, horarios y qué te puede costar el invierno.',
    audience: A,
    category: 'Ahorro',
    publishedAt: D,
    body: `## Calefacción central

- ¿Se paga en la **comunidad** o aparte?
- ¿Hay **repartidores de costes** en los radiadores?
- ¿Cuál es el **horario** de funcionamiento?

## Calefacción individual

- ¿Qué **sistema** es: gas, bomba de calor o eléctrica?
- ¿Cuánto fue el **consumo** del invierno pasado?
- ¿Cuándo se hizo la última **revisión**?

## Un truco

Pide al propietario las facturas de un mes de invierno. Te ahorra sorpresas. Y mira [calefacción barata en invierno](/blog/calefaccion-barata-en-invierno-piso-alquiler).`,
  },
  {
    slug: 'alquiler-de-temporada-tus-derechos-como-inquilino',
    title: 'Alquiler de temporada: tus derechos como inquilino',
    excerpt: 'Cuándo es temporada de verdad, qué fianza te pueden pedir y qué hacer si en realidad vas a vivir allí.',
    audience: A,
    category: 'Derechos',
    publishedAt: D,
    body: `## Qué es

Un alquiler para una **necesidad temporal**: estudios, trabajo por un tiempo, tratamiento médico.

## Tus derechos

- **Fianza** de dos mensualidades (uso distinto de vivienda).
- Contrato con la **causa y las fechas** por escrito.
- Si se convalida el decreto de octubre de 2026: duración máxima de 12 meses y no más de dos contratos encadenados.

## Si en realidad es tu vivienda habitual

Si vas a vivir allí de forma estable, el contrato puede considerarse de **vivienda habitual**, con todos sus derechos (duración mínima, límites a las garantías…). Consulta con una asociación de inquilinos o de consumidores.

Más en [las nuevas reglas de la temporada](/blog/alquiler-de-temporada-nuevas-reglas-12-meses).`,
  },
  {
    slug: 'que-es-la-inquiokupacion-y-por-que-te-afecta',
    title: 'Qué es la inquiokupación y por qué afecta a todos los inquilinos',
    excerpt: 'Los impagos de unos pocos hacen que los propietarios pidan más garantías a todos. Cómo diferenciarte.',
    audience: A,
    category: 'Buscar piso',
    publishedAt: D,
    body: `Se llama **inquiokupación** a la situación de un inquilino con contrato que deja de pagar y sigue en la vivienda. Es un impago, y se resuelve con un desahucio por la vía civil.

## Por qué te afecta aunque pagues

El miedo a ese caso hace que muchos propietarios:

- Pidan **avales** y garantías extra.
- Exijan **más ingresos**.
- Prefieran tener el piso **vacío**.

## Cómo diferenciarte

- Demuestra tu **historial de pagos**.
- Ofrece **verificación de ingresos** con tu consentimiento.
- Alquila con una **hucha** que da confianza al propietario: con RentaHucha, si hubiera impago pasaría a él, y si cumples la recuperas con bonus.

Más en [el pasaporte de inquilino](/blog/pasaporte-de-inquilino-demostrar-buen-pagador).`,
  },
  {
    slug: 'negociar-quedarte-mas-tiempo-en-tu-piso',
    title: 'Cómo negociar quedarte más tiempo en tu piso de alquiler',
    excerpt: 'Antes de que llegue el preaviso: argumentos que funcionan con el propietario.',
    audience: A,
    category: 'Ahorro',
    publishedAt: D,
    body: `## Cuándo hablar

**Antes** de los últimos cuatro meses del contrato, cuando el propietario aún no ha decidido nada.

## Argumentos

- **Historial de pagos** sin un solo retraso.
- **Cuidado del piso**: fotos del estado actual.
- **Cero meses vacío** y cero gastos de cambio de inquilino para él.
- Disposición a una **actualización razonable** de la renta, dentro de los límites legales.

## Qué proponer

Una renovación por escrito con la duración y la renta claras.

## Conoce tus derechos

Puede que la ley ya te permita quedarte: prórroga obligatoria, tácita o, si se convalida, la [prórroga extraordinaria](/blog/prorroga-extraordinaria-alquiler-2026-quien-puede-pedirla).`,
  },
  {
    slug: 'alquilar-sin-nomina-alternativas',
    title: 'Alquilar sin nómina: alternativas reales',
    excerpt: 'Estudiantes, autónomos, recién llegados o con trabajo nuevo: cómo convencer al propietario sin una nómina.',
    audience: A,
    category: 'Buscar piso',
    publishedAt: D,
    body: `| Tu situación | Qué presentar |
|---|---|
| Autónomo | Declaración de la renta, extractos y certificados de estar al corriente |
| Estudiante | Matrícula, beca, ingresos o garantía familiar |
| Trabajo nuevo | Contrato firmado o carta de la empresa |
| Con ahorros | Extractos que muestren capacidad de pago |
| Pensionista | Justificante de la pensión |

## Además

- Una **garantía adicional** dentro del límite legal.
- **Referencias** de caseros anteriores.
- Alquilar con **hucha**, que da confianza al propietario.

Más en [alquilar siendo autónomo](/blog/alquilar-piso-siendo-autonomo) y [alquilar sin aval](/blog/alquilar-sin-aval).`,
  },
  {
    slug: 'pasaporte-de-inquilino-demostrar-buen-pagador',
    title: 'Pasaporte de inquilino: cómo demostrar que eres buen pagador',
    excerpt: 'Tus años pagando a tiempo pueden ayudarte en el siguiente alquiler. Cómo funciona el historial verificado de RentaHucha.',
    audience: A,
    category: 'Ahorro',
    publishedAt: D,
    body: `Has pagado tu alquiler puntualmente durante años y, al cambiar de piso, te piden lo mismo que a alguien sin historial. No tiene sentido.

## Qué es

En RentaHucha, cada pago puntual queda en un **historial verificado y portable**: tu pasaporte de inquilino.

## Para qué sirve

- Demostrar que eres **buen pagador** en tu siguiente alquiler.
- Entrar con más facilidad, a veces **sin aval**.
- Llevarte tu **hucha** si te mudas dentro de la red.

## Mientras tanto

Si aún no alquilas con RentaHucha, guarda tus **recibos** y pide una **carta de referencia** a tu casero actual.

[Apúntate a la lista de espera](/apuntate?tipo=inquilino#formulario).`,
  },
  {
    slug: 'checklist-comparar-dos-pisos-de-alquiler',
    title: 'Checklist para comparar dos pisos de alquiler',
    excerpt: 'Más allá de la renta: coste total, estado, ubicación y condiciones del contrato en una tabla.',
    audience: A,
    category: 'Buscar piso',
    publishedAt: D,
    body: `| Criterio | Piso A | Piso B |
|---|---|---|
| Renta mensual | | |
| Gastos (comunidad, suministros estimados) | | |
| Dinero para entrar (primer mes + fianza + garantías) | | |
| Calificación energética | | |
| Estado y reformas | | |
| Luz y orientación | | |
| Ruido | | |
| Transporte y tiempo al trabajo | | |
| Duración del contrato | | |
| Admite mascotas | | |
| Sensación con el propietario | | |

## Consejos

- Calcula el **coste total al mes**, no solo la renta.
- Visita a **distintas horas**.
- Lee el contrato **antes** de decidir.

Más en [qué revisar en la visita](/blog/que-revisar-en-la-visita-a-un-piso).`,
  },
]
