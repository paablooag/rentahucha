import type { BlogPost } from '#shared/utils/blog'

// Novena versión del contenido inicial: 20 artículos para inquilinos pensados para llamar la atención (checklists,
// mitos, plantillas, primerizos y ahorro). Sin cifras de mercado inventadas: los ejemplos usan números redondos.

type Seed = Omit<BlogPost, 'updatedAt' | 'published'>
const D = '2026-10-17'
const A = 'inquilinos' as const
const CTA = `¿Quieres alquilar sin aval y ahorrar mientras pagas la renta? [Apúntate a la lista de espera de RentaHucha](/apuntate?tipo=inquilino#formulario).`

export const BLOG_SEED_V9_INQUILINOS: Seed[] = [
  {
    slug: 'tu-primer-alquiler-guia-para-independizarte-2027',
    title: 'Tu primer alquiler: guía completa para independizarte en 2027',
    excerpt: 'Presupuesto, búsqueda, documentos, contrato, entrada y primeros meses: todo lo que nadie te explica cuando te independizas por primera vez.',
    audience: A,
    category: 'Entrar a vivir',
    publishedAt: D,
    body: `Independizarse es una de las decisiones más emocionantes, y también una de las que más dudas genera. Esta guía te acompaña desde que empiezas a echar cuentas hasta que llevas tres meses en tu piso.

## 1. Haz tus cuentas antes de mirar pisos

La referencia más usada es que el alquiler no pase del **30–35 % de tus ingresos netos**. Calcúlalo con tu sueldo en la [calculadora de alquiler](/herramientas/cuanto-alquiler-puedo-pagar).

Además de la renta, suma:

| Gasto mensual | Qué incluye |
|---|---|
| Suministros | Luz, agua, gas e internet |
| Comida y casa | Compra, limpieza |
| Transporte | Abono o gasolina |
| Imprevistos | Un pequeño colchón cada mes |

## 2. Junta el dinero para entrar

Para firmar te pedirán, como mínimo, el **primer mes** y la **fianza legal** (un mes en vivienda habitual). Algunos propietarios piden además hasta dos mensualidades de garantía adicional. Desde 2023, **los gastos de agencia los paga el propietario**: no te los pueden cobrar a ti.

## 3. Prepara tu carpeta

- DNI o NIE.
- Últimas nóminas o declaración de la renta.
- Contrato de trabajo.
- Referencias, si las tienes.

Con la carpeta lista puedes responder en minutos, y eso te pone por delante.

## 4. Busca con método

Alertas en dos o tres portales, mensajes rápidos y visitas con una lista de comprobación. Lee [cómo buscar piso de alquiler en 2027](/blog/como-buscar-piso-de-alquiler-en-2027) y aprende a detectar [anuncios falsos](/blog/senales-de-un-anuncio-de-alquiler-falso).

## 5. Lee el contrato antes de firmar

Comprueba la duración, la renta y su actualización, la fianza, quién paga qué y si hay cláusulas abusivas. Te ayudará [esta lista de cláusulas que no debes firmar](/blog/clausulas-abusivas-contrato-de-alquiler).

## 6. El día de la entrada

Fotos de todo, lecturas de contadores, inventario y llaves. Usa la [checklist del primer día](/blog/checklist-primer-dia-en-tu-piso-de-alquiler).

## 7. Los tres primeros meses

- **Empadrónate**: te abre la puerta a ayudas y servicios.
- **Domicilia** la renta para no olvidarte nunca.
- **Empieza a ahorrar**, aunque sea poco: un colchón te da tranquilidad.
- **Guarda los justificantes** de pago: son tu historial de buen inquilino.

## Preguntas frecuentes

### ¿Cuánto dinero necesito para independizarme?
Como mínimo, dos rentas para entrar (primer mes y fianza) y un pequeño colchón para los primeros gastos: muebles básicos, mudanza y suministros.

### ¿Necesito aval?
Depende del propietario y de tus ingresos. Si tu renta está por debajo del 30–35 % de tus ingresos, muchas veces no hace falta.

### ¿Puedo independizarme con un contrato temporal?
Sí, aunque algunos propietarios piden más garantías. Ayuda tener ahorros, referencias o un historial de pagos que demuestre que eres buen pagador.

${CTA}`,
  },
  {
    slug: 'preguntas-antes-de-firmar-un-alquiler',
    title: '15 preguntas que debes hacer antes de firmar un alquiler',
    excerpt: 'Duración, gastos, reparaciones, mascotas, subidas… Las preguntas que evitan sorpresas, ordenadas por temas.',
    audience: A,
    category: 'Buscar piso',
    publishedAt: D,
    body: `Muchos problemas de alquiler nacen de algo que nadie preguntó. Llévate esta lista a la visita.

## Dinero

1. ¿Cuánto es la renta y qué incluye exactamente?
2. ¿La comunidad y el IBI están incluidos?
3. ¿Cuánto se paga de suministros de media al mes?
4. ¿Qué te piden al firmar: fianza y garantía adicional?
5. ¿Cómo y cuándo se actualiza la renta cada año?

## Duración

6. ¿Es contrato de vivienda habitual o de temporada?
7. ¿El propietario necesitará el piso en algún momento? (Si es así, debe constar en el contrato.)
8. ¿Qué preaviso hay que dar para irse?

## Estado y reparaciones

9. ¿Cuándo se revisó la caldera o el aire acondicionado?
10. ¿Hay humedades o averías conocidas?
11. ¿A quién aviso si algo se rompe y en cuánto tiempo responde?

## Convivencia

12. ¿Se admiten mascotas?
13. ¿Puedo pintar o colgar cuadros?
14. ¿Hay normas de la comunidad que deba conocer?

## Documentación

15. ¿Tiene certificado energético? ¿Qué letra?

## Un consejo

Pide las respuestas importantes **por escrito**, aunque sea por mensaje. Y lee [cláusulas abusivas que no debes firmar](/blog/clausulas-abusivas-contrato-de-alquiler).

${CTA}`,
  },
  {
    slug: 'mitos-del-alquiler-que-te-cuestan-dinero',
    title: '8 mitos del alquiler que te están costando dinero',
    excerpt: '«La fianza es para pintar», «el casero puede entrar cuando quiera», «si me voy antes pierdo todo»… Desmontamos los mitos más comunes.',
    audience: A,
    category: 'Derechos',
    publishedAt: D,
    body: `Estos mitos circulan de piso en piso. Creerlos puede costarte dinero o derechos.

## 1. «La fianza es para pintar al irme»
**Falso.** La fianza no cubre el desgaste normal del uso. Solo responde de deudas o daños justificados.

## 2. «El casero puede entrar cuando quiera, que es su piso»
**Falso.** La vivienda alquilada es tu domicilio. Necesita tu permiso. Más en [puede el casero entrar en mi casa](/blog/puede-el-casero-entrar-en-mi-casa).

## 3. «Si me voy antes, pierdo la fianza»
**Falso.** Desde el sexto mes puedes irte avisando con 30 días. Solo pagarías una indemnización si se pactó, y con límite.

## 4. «El contrato es de un año y luego me pueden echar»
**Falso** en vivienda habitual: puedes llegar a 5 años (7 si el casero es una empresa).

## 5. «Tengo que pagar la agencia»
**Falso** desde la Ley 12/2023: los gastos de gestión los paga el propietario.

## 6. «Si el casero vende, me tengo que ir»
**Falso.** El comprador debe respetar tu contrato. Lee [el casero vende el piso](/blog/el-casero-vende-el-piso-que-pasa-con-mi-contrato).

## 7. «No me puedo empadronar si el casero no quiere»
**Falso.** Con un contrato en vigor, no necesitas su autorización.

## 8. «Si algo se rompe, lo pago yo»
**Depende.** Las reparaciones necesarias para la habitabilidad son del propietario; tú pagas las pequeñas por el uso diario y lo que rompas.

${CTA}`,
  },
  {
    slug: 'conseguir-piso-en-una-ciudad-nueva-sin-contactos',
    title: 'Cómo conseguir piso en una ciudad nueva sin conocer a nadie',
    excerpt: 'Te mudas por trabajo o estudios y no tienes contactos ni referencias locales. Un plan para encontrar piso rápido y sin estafas.',
    audience: A,
    category: 'Buscar piso',
    publishedAt: D,
    body: `Llegar a una ciudad nueva sin contactos complica la búsqueda: no conoces los barrios, no puedes visitar a diario y eres presa fácil de estafas. Este plan ayuda.

## Antes de llegar

1. **Elige 2 o 3 zonas** según tu trabajo o centro de estudios y el transporte.
2. **Activa alertas** en varios portales con esos filtros.
3. **Prepara tu carpeta** de documentos en PDF.

## Visitas a distancia

- Pide una **videollamada en directo**, no un vídeo grabado.
- Pide ver detalles: ventanas, baño, cocina, vistas.
- **Nunca pagues** nada sin haber visto el piso y sin contrato.

## Plan B: empieza con temporada

Un alquiler de temporada o una habitación durante uno o dos meses te da tiempo para conocer la ciudad y buscar con calma tu vivienda habitual.

## Cómo compensar la falta de referencias

- Carta de la empresa o matrícula.
- Extractos que muestren ahorros.
- Historial de pagos de tu alquiler anterior.

Más ideas en [mudarse de ciudad por trabajo](/blog/mudarse-de-ciudad-por-trabajo-temporada-o-vivienda-habitual).

${CTA}`,
  },
  {
    slug: 'alquilar-con-deudas-o-mal-historial',
    title: 'Alquilar con deudas o un mal historial: qué opciones tienes',
    excerpt: 'Si estás en un fichero de morosos o tuviste problemas con un alquiler, no está todo perdido. Pasos realistas para volver a alquilar.',
    audience: A,
    category: 'Buscar piso',
    publishedAt: D,
    body: `Un tropiezo financiero no debería cerrarte para siempre la puerta de un alquiler, pero sí lo complica. Así puedes mejorar tus opciones.

## 1. Conoce tu situación
Pide información a los ficheros de solvencia para saber si apareces y por qué. Si un dato es incorrecto, puedes pedir su rectificación.

## 2. Ordena tus deudas
Un plan de pagos acordado con el acreedor, aunque sea pequeño, es una señal de responsabilidad que puedes enseñar.

## 3. Compensa con garantías (dentro de la ley)
- Un **aval** de un familiar o una entidad.
- Una **garantía adicional** al firmar, hasta el límite legal de dos mensualidades en vivienda habitual.
- **Domiciliación** de la renta en la misma cuenta donde cobras.

## 4. Empieza por algo asequible
Un piso o una habitación muy por debajo de tu límite de ingresos te da credibilidad y tiempo para reconstruir tu historial.

## 5. Construye historial nuevo
Cada mes que pagas a tiempo cuenta. Con el **pasaporte de inquilino** de RentaHucha, ese historial queda verificado y te acompaña al siguiente piso.

## Sé transparente
Explicar tu situación con datos genera más confianza que esconderla.

${CTA}`,
  },
  {
    slug: 'mensaje-al-propietario-que-consigue-visitas',
    title: 'El mensaje al propietario que consigue visitas (con plantillas)',
    excerpt: 'Con decenas de interesados por piso, tu primer mensaje decide si te llaman. Plantillas para copiar según tu situación.',
    audience: A,
    category: 'Buscar piso',
    publishedAt: D,
    body: `Un propietario puede recibir decenas de mensajes en pocas horas. Los que consiguen visita tienen tres cosas: **quién eres, por qué encajas y cuándo puedes**.

## Plantilla general

> Hola, soy [nombre], [edad aprox.] años, trabajo como [puesto] en [empresa/sector] con contrato [tipo]. Buscamos piso para [n.º] personas desde el [fecha], sin mascotas. Ingresos netos de [importe] al mes y documentación preparada. ¿Podría visitarlo hoy o mañana a partir de las [hora]? Gracias.

## Si sois pareja

> Hola, somos [nombre] y [nombre]. Ambos trabajamos ([sectores]) y sumamos unos [importe] netos al mes. Buscamos un piso estable para varios años. Podemos visitarlo cuando le venga bien.

## Si eres autónomo

> Hola, soy [nombre], autónomo desde hace [años] en [actividad]. Puedo enseñarle mi última declaración de la renta y extractos de los últimos meses. Busco piso para larga estancia.

## Si tienes mascota

> Tengo un perro pequeño, educado y vacunado. Puedo aportar referencias de mi casero anterior y un seguro de responsabilidad civil.

## Errores que hacen que no te contesten

- «¿Sigue disponible?» y nada más.
- Pedir rebaja en el primer mensaje.
- No decir cuándo puedes entrar.

${CTA}`,
  },
  {
    slug: 'coste-real-de-vivir-de-alquiler',
    title: 'El coste real de vivir de alquiler: los gastos que no ves en el anuncio',
    excerpt: 'La renta es solo una parte. Suministros, seguro, mudanza, muebles y la entrada: calcula cuánto te cuesta de verdad.',
    audience: A,
    category: 'Ahorro',
    publishedAt: D,
    body: `Cuando comparas pisos solo por la renta, te llevas sorpresas. Este es el coste completo.

## Al entrar (una vez)

| Concepto | Cómo calcularlo |
|---|---|
| Primer mes | 1 renta |
| Fianza legal | 1 renta en vivienda habitual |
| Garantía adicional | 0 a 2 rentas, según el propietario |
| Mudanza | Desde casi nada hasta varios cientos de euros |
| Muebles y menaje | Según lo que tenga el piso |

## Cada mes

| Concepto | Notas |
|---|---|
| Renta | La del contrato |
| Suministros | Varían mucho por calefacción y época del año |
| Internet | Tarifa elegida |
| Seguro de hogar | Opcional, cubre tus cosas y tu responsabilidad |
| Comunidad | Si el contrato la repercute |

## Ejemplo con números redondos

Piso de 800 € de renta: entrar te costará al menos 1.600 € (primer mes y fianza), más la mudanza. Cada mes, la renta más los suministros y el internet.

## Cómo reducirlo

- Compara la **calificación energética**: un piso eficiente gasta menos.
- Pide las facturas de un mes de invierno.
- Usa la [calculadora de alquiler](/herramientas/cuanto-alquiler-puedo-pagar) para no pasarte.

${CTA}`,
  },
  {
    slug: 'puedo-cambiar-la-cerradura-del-piso-de-alquiler',
    title: '¿Puedo cambiar la cerradura de mi piso de alquiler?',
    excerpt: 'Por seguridad es razonable, pero conviene avisar y entregar una copia al terminar. Te explicamos cómo hacerlo bien.',
    audience: A,
    category: 'Derechos',
    publishedAt: D,
    body: `Es una duda muy común, sobre todo al entrar: ¿cuántas copias de las llaves hay por ahí?

## ¿Puedo hacerlo?

Cambiar el **bombín** por seguridad suele considerarse razonable, porque es tu domicilio. Pero:

- **Revisa tu contrato**: puede decir algo al respecto.
- **Avisa al propietario** por escrito.
- **Guarda el bombín original** o deja el nuevo al irte, con todas sus copias.

## ¿Quién lo paga?

Si es por tu tranquilidad, normalmente tú. Si la cerradura estaba rota o no cerraba bien, es una reparación que corresponde al propietario.

## Al terminar el contrato

Devuelve **todas las llaves** del bombín que esté instalado. Si pusiste el original de nuevo, entrega también las del tuyo o llévatelo.

## Una alternativa

Pide al propietario que cambie él el bombín entre inquilinos: es una buena práctica de seguridad.

${CTA}`,
  },
  {
    slug: 'quien-paga-el-seguro-de-hogar-en-un-alquiler',
    title: '¿Quién paga el seguro de hogar en un alquiler?',
    excerpt: 'El propietario asegura el edificio; tú, tus cosas y tu responsabilidad. Qué cubre cada seguro y si te conviene tener el tuyo.',
    audience: A,
    category: 'Protección',
    publishedAt: D,
    body: `| Seguro | Lo contrata | Qué cubre |
|---|---|---|
| Continente | Propietario | Paredes, suelos, instalaciones |
| Contenido del inquilino | Inquilino | Tus muebles, ropa, aparatos |
| Responsabilidad civil del inquilino | Inquilino | Daños que causes a terceros, por ejemplo una fuga al vecino |

## ¿Es obligatorio para el inquilino?

No por ley, aunque algunos contratos lo piden. Si lo exige el tuyo, cúmplelo.

## ¿Me conviene?

Si una fuga de tu lavadora daña el piso de abajo, la responsabilidad puede ser tuya. Un seguro de inquilino suele ser barato frente a ese riesgo. Más detalle en [seguro de hogar para inquilinos](/blog/seguro-de-hogar-para-inquilinos).

${CTA}`,
  },
  {
    slug: 'me-suben-el-alquiler-mas-de-lo-permitido',
    title: 'Me suben el alquiler más de lo permitido: qué puedo hacer',
    excerpt: 'Cómo comprobar si la subida es legal, cómo contestar por escrito y qué hacer si el propietario insiste.',
    audience: A,
    category: 'Derechos',
    publishedAt: D,
    body: `Durante el contrato, la renta solo puede actualizarse como diga el contrato y dentro de los límites legales.

## 1. Comprueba qué dice tu contrato
- Si **no prevé actualización**, no te la pueden subir durante el contrato.
- Si la prevé, mira la **fecha** y el **índice**.

## 2. Comprueba el límite legal
- Contratos posteriores a la Ley 12/2023: la actualización no puede superar el **IRAV** del INE. Lee [qué es el IRAV](/blog/que-es-el-irav-subida-del-alquiler).
- Además, el decreto de octubre de 2026 prevé un límite temporal del 2 % hasta finales de 2027, si se mantiene en vigor.

## 3. Contesta por escrito
> Hola, [nombre]. He revisado la actualización. Según el contrato y el límite legal vigente, la nueva renta sería de [importe], calculada así: [cálculo]. Seguiré pagando ese importe a partir de [fecha].

## 4. Sigue pagando lo que corresponde
Nunca dejes de pagar: paga la renta correcta y guarda los justificantes.

## 5. Si insiste
Consulta la oficina de vivienda de tu ayuntamiento o comunidad, o una asociación de inquilinos o de consumidores.

${CTA}`,
  },
  {
    slug: 'ahorrar-3000-euros-en-un-ano-viviendo-de-alquiler',
    title: 'Cómo ahorrar 3.000 € en un año viviendo de alquiler',
    excerpt: 'Un plan realista mes a mes: automatizar, recortar donde no duele y usar la hucha para que el ahorro crezca solo.',
    audience: A,
    category: 'Ahorro',
    publishedAt: D,
    body: `3.000 € al año son 250 € al mes. Parece mucho, pero repartido entre varias fuentes es más fácil de lo que crees.

## El plan

| Fuente | Ahorro mensual orientativo |
|---|---|
| Transferencia automática el día de cobro | 100 € |
| Revisar la potencia y la tarifa de la luz | 15 € |
| Suscripciones que no usas | 20 € |
| Comer de táper dos días por semana | 50 € |
| Compra planificada (lista y marcas blancas) | 40 € |
| Redondeo de compras | 25 € |
| **Total** | **250 €** |

Los importes son un ejemplo: adapta cada línea a tu vida.

## Las tres reglas que funcionan

1. **Págate primero**: el ahorro sale el día que cobras, no lo que sobre a final de mes.
2. **Separa la cuenta**: lo que no ves, no lo gastas.
3. **Objetivo concreto**: la entrada de tu casa, un colchón de emergencia o el próximo piso.

## La hucha ayuda

Con RentaHucha, parte de lo que pagas cada mes va a una hucha a tu nombre que recuperas con un 10 % de bonus si terminas el alquiler sin incidencias. Simula cuánto acumularías en el [simulador de la hucha](/herramientas/simulador-hucha).

${CTA}`,
  },
  {
    slug: 'alquilar-habitacion-o-piso-entero-que-compensa',
    title: '¿Alquilar una habitación o un piso entero? Qué te compensa',
    excerpt: 'Precio, intimidad, derechos y estabilidad: comparamos las dos opciones para que decidas según tu momento.',
    audience: A,
    category: 'Buscar piso',
    publishedAt: D,
    body: `| | Habitación | Piso entero |
|---|---|---|
| Coste | Menor | Mayor |
| Dinero para entrar | Menor | Mayor |
| Intimidad | Compartida | Total |
| Gastos | Repartidos | Todos tuyos |
| Normas | Pactadas con compañeros | Las tuyas |
| Estabilidad legal | Suele regirse por el Código Civil y lo pactado | LAU de vivienda: 5 años de prórroga |

## Cuándo compensa una habitación
- Acabas de llegar a la ciudad.
- Estás ahorrando para algo concreto.
- Valoras la compañía.

## Cuándo compensa un piso entero
- Quieres estabilidad a largo plazo.
- Trabajas desde casa.
- Vives en pareja o con familia.

## Nuevo límite de precio
En zonas tensionadas, si se mantiene el decreto de octubre de 2026, la suma de las habitaciones no puede superar la renta del piso completo. Lee [alquiler por habitaciones](/blog/alquiler-por-habitaciones-nuevo-limite).

${CTA}`,
  },
  {
    slug: 'eficiencia-energetica-del-piso-ahorra-dinero',
    title: 'Cómo leer el certificado energético de un piso (y por qué te ahorra dinero)',
    excerpt: 'La letra de la A a la G dice mucho de lo que pagarás de luz y calefacción. Qué mirar antes de alquilar.',
    audience: A,
    category: 'Ahorro',
    publishedAt: D,
    body: `Todo piso en alquiler debe tener **certificado de eficiencia energética**, y su letra tiene que aparecer en el anuncio.

## Cómo leerlo

- **A y B**: muy eficiente. Facturas bajas.
- **C y D**: correcto.
- **E, F y G**: poco eficiente. En invierno y verano notarás la factura.

El certificado da dos letras: **consumo de energía** y **emisiones**. Para tu bolsillo, mira sobre todo el consumo.

## Qué más preguntar

- Tipo de calefacción y de agua caliente.
- Si las ventanas son de doble vidrio.
- La factura de un mes de invierno.

## Por qué importa

Entre dos pisos con la misma renta, el más eficiente puede salir bastante más barato al mes. Inclúyelo al comparar con la [checklist para comparar pisos](/blog/checklist-comparar-dos-pisos-de-alquiler).

${CTA}`,
  },
  {
    slug: 'me-pueden-exigir-contrato-indefinido-para-alquilar',
    title: '¿Me pueden exigir contrato indefinido para alquilar un piso?',
    excerpt: 'El propietario puede elegir inquilino con criterios de solvencia, pero hay formas de demostrarla sin contrato indefinido.',
    audience: A,
    category: 'Buscar piso',
    publishedAt: D,
    body: `El propietario puede valorar tu **solvencia** y elegir. Muchos prefieren un contrato indefinido porque lo asocian a estabilidad.

## Cómo competir sin contrato indefinido

- **Antigüedad**: varios contratos seguidos con la misma empresa demuestran continuidad.
- **Ingresos holgados**: renta por debajo del 30 % de tus ingresos.
- **Ahorros**: extractos que muestren colchón.
- **Historial**: pagos puntuales en tu alquiler anterior.
- **Garantías**: dentro de los límites legales.

## Si eres fijo discontinuo, temporal o autónomo
Explica tu situación con números y aporta documentación clara. Mira [alquilar siendo autónomo](/blog/alquilar-piso-siendo-autonomo) y [alquilar sin nómina](/blog/alquilar-sin-nomina-alternativas).

${CTA}`,
  },
  {
    slug: 'inquilino-tengo-que-declarar-algo-a-hacienda',
    title: 'Vivo de alquiler: ¿tengo que declarar algo a Hacienda?',
    excerpt: 'Como inquilino no declaras ingresos por el alquiler, pero sí puedes tener deducciones. Qué revisar en tu renta.',
    audience: A,
    category: 'Ahorro',
    publishedAt: D,
    body: `Como inquilino **no tributas por pagar alquiler**. Pero tu declaración de la renta puede beneficiarte.

## Qué revisar

1. **Deducciones autonómicas por alquiler**: muchas comunidades las tienen, con requisitos de edad e ingresos.
2. **Deducción estatal**: el decreto de octubre de 2026 prevé una del 10 % para ingresos bajos, si se mantiene en vigor. Lee [la deducción del 10 %](/blog/deduccion-irpf-10-por-ciento-inquilinos).
3. **Contratos antiguos**: algunos contratos anteriores a 2015 mantienen la antigua deducción estatal, con requisitos.

## Qué necesitas

- NIF del propietario.
- Referencia catastral.
- Importe pagado en el año.
- Justificantes de pago, mejor por transferencia.

${CTA}`,
  },
  {
    slug: 'muere-el-propietario-que-pasa-con-mi-alquiler',
    title: 'Muere el propietario de mi piso: ¿qué pasa con mi alquiler?',
    excerpt: 'El contrato sigue: los herederos ocupan el lugar del propietario. Qué cambia y qué debes hacer.',
    audience: A,
    category: 'Derechos',
    publishedAt: D,
    body: `El fallecimiento del propietario **no extingue el contrato**. Los herederos pasan a ser los arrendadores, con los mismos derechos y obligaciones.

## Qué cambia
- A quién pagas la renta (los herederos deberán indicártelo).
- Con quién hablas de reparaciones.

## Qué no cambia
- La duración del contrato.
- La renta y su actualización pactada.
- Tu fianza.

## Qué hacer
1. Sigue pagando en la cuenta habitual hasta que te indiquen otra **por escrito**.
2. Pide los datos de quién gestiona ahora la vivienda.
3. Desconfía de peticiones de pago a cuentas nuevas sin documentación.

Si los herederos venden el piso, también tienes derechos: lee [el casero vende el piso](/blog/el-casero-vende-el-piso-que-pasa-con-mi-contrato).

${CTA}`,
  },
  {
    slug: 'teletrabajar-desde-piso-de-alquiler-oficina',
    title: '¿Puedo usar mi piso de alquiler como oficina?',
    excerpt: 'Teletrabajar desde casa es lo normal; montar un negocio abierto al público, no. Qué dice el contrato y qué debes saber si eres autónomo.',
    audience: A,
    category: 'Derechos',
    publishedAt: D,
    body: `## Teletrabajar
Trabajar desde casa con tu ordenador es un uso normal de la vivienda.

## Ser autónomo con domicilio en el piso
Es habitual, pero:
- **Revisa el contrato**: puede limitar actividades profesionales.
- Si vas a **deducir** parte de los suministros, consulta a un asesor.
- Avisar al propietario evita malentendidos.

## Lo que suele no estar permitido
- Abrir el piso al público (consulta, tienda, academia) sin acuerdo.
- Actividades molestas para los vecinos.
- Cambiar el uso de la vivienda.

## Consejo
Si tu trabajo implica recibir clientes, pídelo por escrito al propietario y revisa las normas de la comunidad.

${CTA}`,
  },
  {
    slug: 'mudarse-de-ciudad-por-trabajo-temporada-o-vivienda-habitual',
    title: 'Te mudas de ciudad por trabajo: ¿alquiler de temporada o vivienda habitual?',
    excerpt: 'Si tu traslado es temporal, puede encajar la temporada; si vas a quedarte, la vivienda habitual te da más derechos.',
    audience: A,
    category: 'Buscar piso',
    publishedAt: D,
    body: `| Tu situación | Contrato que encaja |
|---|---|
| Proyecto de unos meses y vuelves a tu ciudad | Temporada |
| Traslado indefinido | Vivienda habitual |
| No sabes cuánto te quedarás | Empieza con temporada y busca después vivienda habitual |

## Diferencias clave

- **Temporada**: necesidad temporal real y escrita en el contrato, sin prórroga obligatoria. Con las reglas de octubre de 2026 (si se mantienen): más de 31 días y, en general, hasta 12 meses, garantía adicional de una mensualidad como máximo y puedes irte tras un mes avisando con 10 días.
- **Vivienda habitual**: hasta 5 años de prórroga (7 si el casero es empresa), fianza de un mes, más derechos.

## Ojo
Si vas a vivir allí de forma estable, un contrato llamado de temporada puede considerarse de vivienda habitual. Lee [tus derechos en el alquiler de temporada](/blog/alquiler-de-temporada-tus-derechos-como-inquilino).

${CTA}`,
  },
  {
    slug: 'okupas-en-el-piso-de-al-lado-que-hacer',
    title: 'Okupas en el piso de al lado: qué puedes hacer como inquilino',
    excerpt: 'No puedes desalojarlos tú, pero sí avisar, documentar y moverte con la comunidad. Pasos prácticos y seguros.',
    audience: A,
    category: 'Convivencia',
    publishedAt: D,
    body: `Si sospechas que han ocupado un piso de tu edificio:

1. **No intervengas tú**: no te enfrentes ni intentes entrar.
2. **Avisa a la Policía** si ves una entrada forzada o hay un riesgo.
3. **Informa al presidente o al administrador** de la comunidad: la comunidad puede actuar en las zonas comunes y avisar al propietario.
4. **Documenta** molestias o desperfectos en zonas comunes, con fechas.
5. **Avisa a tu casero**, por si afecta a tu vivienda.

## Lo que puede hacer el propietario de ese piso
Denunciar. Desde 2025, estos delitos pueden tramitarse por el procedimiento de juicio rápido. Más en [inquiokupación y okupación](/blog/inquiokupacion-y-okupacion-diferencias).

${CTA}`,
  },
  {
    slug: 'pasaporte-de-inquilino-vs-aval-bancario',
    title: 'Pasaporte de inquilino o aval bancario: ¿qué te conviene?',
    excerpt: 'El aval bancario inmoviliza dinero y tiene coste; el pasaporte demuestra tu historial. Comparativa para inquilinos.',
    audience: A,
    category: 'Ahorro',
    publishedAt: D,
    body: `| | Aval bancario | Pasaporte de inquilino (RentaHucha) |
|---|---|---|
| Qué es | Una entidad garantiza el pago | Tu historial de pagos verificado |
| Coste | Comisiones y, a menudo, dinero bloqueado | Gratis para el inquilino |
| Qué demuestra | Que alguien responde por ti | Que pagas a tiempo |
| Portabilidad | Se constituye para cada contrato | Te acompaña al siguiente piso |

## ¿Son compatibles?
Sí. Pero si tu historial es bueno y tus ingresos encajan, muchas veces el aval deja de ser necesario.

## Mientras tanto
Guarda tus recibos y pide una carta de referencia a tu casero. Lee [cómo demostrar que eres buen pagador](/blog/pasaporte-de-inquilino-demostrar-buen-pagador).

${CTA}`,
  },
]
