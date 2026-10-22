import type { BlogPost } from '#shared/utils/blog'

// Artículos iniciales. Se cargan una sola vez en el almacenamiento; a partir de ahí se editan desde /admin.
// Cifras calculadas con los mismos supuestos que la web (aportación del 4 %, bonus del 10 %, cuota del 5 %).
// Normativa: LAU (Ley 29/1994) y Ley 12/2023 por el derecho a la vivienda. Revisar con un abogado antes de publicar.

type Seed = Omit<BlogPost, 'updatedAt' | 'published'>

export const BLOG_SEED: Seed[] = [
  {
    slug: 'que-hacer-si-tu-inquilino-no-paga',
    title: 'Qué hacer si tu inquilino no paga: guía paso a paso',
    excerpt: 'Del primer día de retraso a la demanda: qué hacer, en qué orden y qué no hacer nunca si tu inquilino deja de pagar el alquiler.',
    audience: 'propietarios',
    category: 'Impagos',
    publishedAt: '2026-10-15',
    body: `Un retraso no es lo mismo que un impago. La mayoría de los problemas de pago empiezan como un bache puntual y se resuelven si se actúa pronto y con orden. Esta es la secuencia que recomendamos.

## 1. Día 1: habla con el inquilino

Llama o escribe el mismo día del cobro fallido. Pregunta qué ha pasado y si puede pagar en unos días. Si es un bache (un retraso en la nómina, un gasto imprevisto), **un plan de pago corto por escrito** suele ser la solución más rápida y barata.

## 2. Requerimiento fehaciente

Si no hay respuesta o el impago se repite, envía un **burofax con certificación de contenido** reclamando la cantidad debida. Tiene dos efectos importantes:

- Deja constancia de la deuda y de la fecha.
- Si lo envías al menos **30 días antes de presentar la demanda** y el inquilino no paga, este ya no podrá *enervar* el desahucio (pagar a última hora para pararlo), según el artículo 22.4 de la Ley de Enjuiciamiento Civil.

## 3. Intento de acuerdo

Desde 2025, antes de acudir a los tribunales civiles en muchos casos hay que intentar un **medio adecuado de solución de controversias** (una negociación o mediación documentada). Tu abogado te dirá si aplica a tu caso y cómo dejarlo acreditado.

## 4. Demanda de desahucio por falta de pago

Si no hay acuerdo, el abogado presenta la demanda (puede acumular la reclamación de rentas). Los plazos dependen mucho del juzgado y de si el inquilino se opone o está en situación de vulnerabilidad.

| Paso | Cuándo | Quién |
|---|---|---|
| Contacto y plan de pago | Día 1–5 | Tú |
| Burofax de requerimiento | Semana 1–2 | Tú o tu abogado |
| Intento de acuerdo | Semana 2–6 | Abogado o mediador |
| Demanda | Tras el intento | Abogado y procurador |

## Si el inquilino está en situación de vulnerabilidad económica

Con el Real Decreto-ley 29/2026 (en vigor desde el 8 de octubre de 2026 y pendiente de convalidación), si en el desahucio por impago se acredita que el inquilino es **económicamente vulnerable**, se avisa a la Administración, que tiene **dos meses** para ofrecerle otra vivienda o **pagarte todo lo debido y las costas**. Si no lo hace, **pasa a ser ella la deudora**, no hay lanzamiento y el contrato sigue. Esta vía puede darse aunque hayas enviado el burofax. Te lo explicamos en [qué dice el decreto sobre desahucios](/blog/desahucios-vulnerabilidad-hasta-2030-que-dice-el-decreto).

## Lo que nunca debes hacer

- Cambiar la cerradura o entrar en el piso sin permiso.
- Cortar el agua, la luz o el gas.
- Presionar al inquilino o a su familia.

Aunque te deba dinero, estas acciones pueden ser **delito de coacciones** y complicarte el proceso.

## Cómo lo hacemos nosotros

Desde el lanzamiento, el aviso saldrá el día 1 y, si es un bache puntual, propondremos un plan de pago corto. Si el impago no se resuelve, el saldo de la hucha del inquilino pasará a ti y te entregaremos el expediente completo para que tu abogado reclame sin perder tiempo. RentaHucha no es una aseguradora: si quieres cubrir más meses, puedes contratar por tu cuenta un seguro de impago.`,
  },
  {
    slug: 'cuanto-cuesta-un-impago-de-alquiler',
    title: 'Cuánto cuesta realmente un impago de alquiler (con números)',
    excerpt: 'Rentas perdidas, abogado, reparaciones y meses vacío: calculamos el coste real de un impago para pisos de 600, 850 y 1.200 €.',
    audience: 'propietarios',
    category: 'Impagos',
    publishedAt: '2026-10-15',
    body: `Cuando se habla de impagos se piensa en las rentas que no cobras. Pero el coste real es mayor: hay que sumar el proceso legal, el estado en que te devuelven el piso y el tiempo que tarda en volver a alquilarse.

## Supuestos del cálculo

- **10 meses** sin cobrar hasta recuperar el piso (depende mucho del juzgado: puede ser menos o bastante más).
- **1.500 €** de abogado, procurador y burofax.
- **800 €** de reparaciones al recuperar la vivienda.
- **1 mes** vacío hasta el siguiente inquilino.

## El resultado

| Renta mensual | Rentas perdidas | Legal + reparaciones | Mes vacío | **Total** |
|---|---|---|---|---|
| 600 € | 6.000 € | 2.300 € | 600 € | **8.900 €** |
| 850 € | 8.500 € | 2.300 € | 850 € | **11.650 €** |
| 1.200 € | 12.000 € | 2.300 € | 1.200 € | **15.500 €** |

Un solo impago puede comerse **más de un año de rentas**. Y eso sin contar el tiempo y el estrés.

## Comparado con protegerse

| Renta mensual | Coste anual de gestión al 5 % | Coste de un impago |
|---|---|---|
| 600 € | 360 € | 8.900 € |
| 850 € | 510 € | 11.650 € |
| 1.200 € | 720 € | 15.500 € |

## Qué reduce el riesgo de verdad

1. **Elegir bien:** ingresos verificados y una renta proporcionada a esos ingresos.
2. **Detectar pronto:** saber el mismo día que un pago ha fallado.
3. **Tener un colchón:** una garantía que cubra el primer mes mientras se resuelve.
4. **Estar asegurado:** que, si el impago se alarga, alguien te pague la renta.

Puedes hacer tu propio cálculo con nuestra [calculadora del coste de un impago](/herramientas/coste-impago).`,
  },
  {
    slug: 'fianza-garantia-adicional-y-aval-que-puedes-pedir',
    title: 'Fianza, garantía adicional y aval: qué puedes pedir legalmente',
    excerpt: 'Los límites de la Ley de Arrendamientos Urbanos tras el decreto de octubre de 2026: cuántos meses puedes pedir en vivienda habitual y en temporada, el aval, el pago adelantado y por qué ya no puedes exigir un seguro de impago.',
    audience: 'propietarios',
    category: 'Legal',
    publishedAt: '2026-10-15',
    body: `Pedir garantías es legítimo y recomendable, pero la ley pone límites claros. Superarlos puede hacer que una cláusula sea nula.

## Vivienda habitual

| Concepto | Límite | Base legal |
|---|---|---|
| Fianza legal | 1 mensualidad (obligatoria) | LAU, art. 36.1 |
| Garantía adicional | Hasta 2 mensualidades (en contratos de hasta 5 años, o 7 si el arrendador es empresa) | LAU, art. 36.5 |
| **Total de garantías** | **3 mensualidades** | |
| Renta por adelantado | No puedes exigir más de 1 mes | LAU, art. 17.2 |

La garantía adicional puede ser un depósito en metálico o un **aval bancario**. La fianza legal, en cambio, se deposita en el organismo de vivienda de tu comunidad autónoma.

## Lo que no puedes exigir

Desde el Real Decreto-ley 29/2026 (en vigor desde el 8 de octubre de 2026 y pendiente de convalidación), el artículo 36.5 de la LAU dice que **en ningún caso puede exigirse al inquilino que contrate un seguro de impago** u otras coberturas análogas. Si quieres ese seguro, lo contratas y lo pagas tú: [cuánto cuesta](/blog/seguro-de-impago-cuanto-cuesta-y-que-mirar).

## Alquiler de temporada

Con el mismo decreto, la temporada pasa a ser «vivienda temporal» y la **garantía adicional no puede superar una mensualidad**. Los contratos de temporada firmados antes del 8 de octubre de 2026 mantienen su régimen anterior (uso distinto del de vivienda, fianza legal de dos mensualidades) hasta que terminan. Detalle en [fianza y garantía en temporada](/blog/fianza-y-garantia-en-alquiler-de-temporada).

## Otros usos (locales, oficinas)

Fianza legal de **2 mensualidades** y garantía adicional sin el tope de la vivienda.

## Ejemplo con un piso de 850 €

| Concepto | Importe |
|---|---|
| Primer mes de renta | 850 € |
| Fianza legal | 850 € |
| Garantía adicional (máximo) | 1.700 € |
| **Lo máximo que puede pagar el inquilino al firmar** | **3.400 €** |

## Errores frecuentes

- **Pedir «tres meses por adelantado» de renta.** No se puede exigir; lo que sí puedes pedir son garantías dentro de los límites.
- **No depositar la fianza.** Cada comunidad tiene su plazo y puede sancionar si no se hace.
- **Cobrar gastos de gestión al inquilino.** Desde la Ley 12/2023 los paga el propietario.

## Y la hucha, ¿cuenta?

Desde el lanzamiento, la hucha del inquilino estará bloqueada a favor del contrato, así que en vivienda habitual contará dentro del máximo de dos mensualidades de garantía adicional (en temporada, el máximo legal es una). Si pides las dos al firmar, la hucha seguirá llenándose, pero como ahorro del inquilino.`,
  },
  {
    slug: 'como-elegir-un-buen-inquilino',
    title: 'Cómo elegir un buen inquilino: ingresos, ratio y documentos',
    excerpt: 'Qué ingresos debería tener tu inquilino según la renta, qué documentos pedir y cómo verificarlos sin quedarte con papeles que no necesitas.',
    audience: 'propietarios',
    category: 'Selección',
    publishedAt: '2026-10-15',
    body: `La mejor protección contra el impago es elegir bien. Y elegir bien no es pedir más papeles, sino comprobar lo que importa: que la renta sea asumible con margen.

## La regla del esfuerzo

Una regla prudente es que la renta no supere el **30–35 % de los ingresos netos** del hogar.

| Renta | Ingresos netos al 35 % | Ingresos netos al 30 % |
|---|---|---|
| 600 € | 1.714 €/mes | 2.000 €/mes |
| 850 € | 2.429 €/mes | 2.833 €/mes |
| 1.000 € | 2.857 €/mes | 3.333 €/mes |

Si son varios inquilinos, suma sus ingresos. Cuanto más margen, menos riesgo de que un imprevisto se convierta en impago.

## Qué comprobar

1. **Identidad:** documento en vigor.
2. **Ingresos:** las últimas nóminas o, mejor aún, una verificación por *open banking*, que confirma los ingresos reales sin quedarte con los extractos.
3. **Estabilidad:** tipo de contrato o actividad y antigüedad. Un autónomo con tres años de actividad puede ser tan solvente como un indefinido.
4. **Historial:** referencias de alquileres anteriores o un historial de pagos verificado.

## Menos papeles, mejor

No necesitas guardar nóminas ni extractos una vez comprobados. Cuantos menos datos personales conserves, menos riesgo y menos obligaciones de protección de datos. Lo útil es quedarte con el **resultado**: «ingresos verificados suficientes para esta renta».

## Señales de alerta

- Prisa por firmar sin visitar el piso.
- Ofrecer pagar muchos meses por adelantado a cambio de no aportar documentación.
- Documentos con datos que no cuadran entre sí.

## Cómo lo hacemos nosotros

Verificamos identidad, ingresos y estabilidad y te enseñamos un resumen claro de cada candidato con nuestra recomendación. Tú decides.`,
  },
  {
    slug: 'duracion-contrato-alquiler-vivienda-habitual-o-temporada',
    title: 'Duración del contrato de alquiler: vivienda habitual o temporada',
    excerpt: '¿Puedes alquilar solo un año? Explicamos las prórrogas de 5 y 7 años, cómo recuperar el piso para ti y cuándo encaja un contrato de temporada.',
    audience: 'propietarios',
    category: 'Legal',
    publishedAt: '2026-10-15',
    body: `Una de las dudas más frecuentes de los propietarios es si pueden alquilar solo por un tiempo. La respuesta depende del tipo de contrato.

## Vivienda habitual

El contrato puede firmarse por un año, pero el inquilino tiene derecho a renovarlo:

| Situación | Duración mínima garantizada al inquilino |
|---|---|
| Propietario persona física | 5 años |
| Propietario empresa | 7 años |
| Después, si nadie avisa | Prórrogas anuales hasta 3 años más |

Para evitar esas prórrogas finales tienes que avisar con al menos **4 meses** de antelación (el inquilino, con 2 meses).

## Si vas a necesitar el piso

Si sabes que lo necesitarás para ti, para un familiar en primer grado o para tu cónyuge en caso de divorcio, **déjalo escrito en el contrato desde el principio**. Así podrás recuperarlo a partir del primer año, avisando con al menos dos meses (LAU, art. 9.3).

## Alquiler de temporada

Si el inquilino viene por un motivo temporal (estudios, trabajo, un tratamiento médico…), se firma un contrato de temporada:

- Duración pactada libremente: unos meses o un año.
- El motivo tiene que ser **real** y constar en el contrato.
- Fianza legal de **2 mensualidades**.

Disfrazar de temporada un alquiler que en realidad es vivienda habitual es un error caro: si se impugna, el contrato puede considerarse de vivienda habitual con todas sus prórrogas.

## Y el inquilino, ¿cuándo puede irse?

En vivienda habitual, a partir del **sexto mes**, avisando con **30 días**. Se puede pactar una indemnización de un mes por cada año que quede de contrato.

## Resumen

| Quieres… | Fórmula |
|---|---|
| Un inquilino estable muchos años | Vivienda habitual |
| Recuperar el piso para ti más adelante | Vivienda habitual con la necesidad en el contrato |
| Alquilar unos meses a un estudiante o trabajador desplazado | Temporada |`,
  },
  {
    slug: 'seguro-de-impago-o-renta-garantizada',
    title: 'Seguro de impago o renta garantizada: diferencias y qué mirar',
    excerpt: 'Carencias, meses cubiertos, defensa jurídica y quién gestiona el día a día: lo que tienes que comparar antes de proteger tu alquiler.',
    audience: 'propietarios',
    category: 'Protección',
    publishedAt: '2026-10-15',
    body: `Las dos opciones buscan lo mismo, que cobres aunque el inquilino falle, pero funcionan de forma distinta.

## Seguro de impago por tu cuenta

Contratas una póliza con una aseguradora y tú gestionas el resto: elegir inquilino, cobrar, reclamar y comunicar el siniestro.

## Renta garantizada

Un servicio de gestión se encarga de la selección, los cobros y el protocolo de impago, y la cobertura la presta una aseguradora autorizada.

## Qué comparar en cualquier póliza

| Punto | Qué preguntar |
|---|---|
| Meses cubiertos | ¿Cuántas rentas paga como máximo? |
| Carencia | ¿Desde cuándo cubre tras firmar? |
| Franquicia | ¿Hay meses que no paga al principio del impago? |
| Requisitos | ¿Qué perfil de inquilino exige para asegurar? |
| Defensa jurídica | ¿Incluye abogado y procurador? |
| Daños | ¿Cubre desperfectos o actos vandálicos, y con qué límite? |
| Comunicación | ¿En qué plazo hay que avisar del impago? |

## Lo que una póliza no hace

- No elige al inquilino por ti.
- No te avisa el día 1 de que un pago ha fallado.
- No evita el impago: solo lo compensa.

Por eso la protección funciona mejor por capas: buena selección, aviso inmediato, un colchón para los primeros problemas y el seguro solo para los casos que se alargan.

## Una advertencia

Desconfía de quien prometa que el inquilino estará «fuera en 24 horas». Los plazos de un desahucio los decide un juzgado. Lo que sí puede exigirse a una póliza es que **pague según sus condiciones** y que el proceso arranque sin perder un día.

## ¿Y RentaHucha?

RentaHucha **no es una aseguradora** ni vende, gestiona o intermedia seguros. Nuestra protección es otra:

- **Inquilinos verificados** antes de firmar.
- **La hucha del inquilino**, que crece cada mes y, si hay un impago, **pasa al propietario**.
- **Aviso el día 1** y el expediente preparado para reclamar.

Si además quieres un seguro de impago, puedes contratarlo con la compañía que elijas: es compatible con RentaHucha.`,
  },
  {
    slug: 'cuanto-dinero-necesitas-para-entrar-a-un-piso-de-alquiler',
    title: 'Cuánto dinero necesitas para entrar a un piso de alquiler',
    excerpt: 'Primer mes, fianza y garantías: tabla con lo que te pueden pedir legalmente según la renta y cómo entrar con menos dinero.',
    audience: 'inquilinos',
    category: 'Entrar a vivir',
    publishedAt: '2026-10-15',
    body: `Antes de buscar piso conviene saber cuánto dinero vas a necesitar el día de la firma. En vivienda habitual, lo máximo que te pueden pedir es esto:

| Concepto | Cuánto |
|---|---|
| Primer mes de renta | 1 mensualidad |
| Fianza legal | 1 mensualidad (obligatoria) |
| Garantía adicional | Hasta 2 mensualidades (opcional para el propietario) |
| Renta adelantada | Nunca más de 1 mes |

## Según la renta

| Renta | Mínimo (primer mes + fianza) | Máximo legal (con 2 meses de garantía) |
|---|---|---|
| 600 € | 1.200 € | 2.400 € |
| 750 € | 1.500 € | 3.000 € |
| 850 € | 1.700 € | 3.400 € |
| 1.000 € | 2.000 € | 4.000 € |
| 1.200 € | 2.400 € | 4.800 € |

A eso súmale la mudanza y las altas de suministros si no están a tu nombre.

## Lo que no te pueden cobrar

- **Gastos de gestión inmobiliaria ni de formalización del contrato.** Desde la Ley 12/2023 los paga el propietario.
- **Más de un mes de renta por adelantado.**
- **Más de dos meses de garantía adicional** en vivienda habitual.

## Cómo entrar con menos

Con nuestra hucha, si el propietario no pide garantía adicional al firmar, entras con **el primer mes y la fianza**. Cada mes aportas un poco (por ejemplo, el 4 % de la renta) a una hucha a tu nombre, que recuperas con un bonus si terminas sin deudas.

Calcula cuánto ahorrarías con el [simulador de la hucha](/herramientas/simulador-hucha).`,
  },
  {
    slug: 'alquilar-sin-aval',
    title: 'Alquilar sin aval: opciones reales y cómo convencer al propietario',
    excerpt: 'Por qué piden aval, qué alternativas existen y cómo demostrar que eres buen inquilino aunque no tengas contrato indefinido.',
    audience: 'inquilinos',
    category: 'Entrar a vivir',
    publishedAt: '2026-10-15',
    body: `El aval de los padres o el aval bancario es la forma que tiene el propietario de protegerse cuando no está seguro de que puedas pagar. Si le das esa seguridad de otra forma, el aval deja de ser necesario.

## Por qué te lo piden

- No pueden comprobar fácilmente tus ingresos.
- Tu contrato es temporal o eres autónomo.
- No tienes historial de alquiler que enseñar.

## Alternativas al aval

| Opción | Cómo funciona | A tener en cuenta |
|---|---|---|
| Ingresos verificados | Demuestras ingresos reales, por ejemplo con *open banking* | Lo ideal: la renta no debería pasar del 30–35 % de lo que ganas |
| Historial de pagos | Referencias o un historial verificado de alquileres anteriores | Cuanto más largo, más convence |
| Garantía adicional | Un depósito de hasta 2 meses en vivienda habitual | Es dinero que adelantas |
| Seguro del propietario | El propietario asegura el impago | Las aseguradoras también filtran perfiles |
| Hucha de garantía | Aportas poco a poco a una hucha a tu nombre | La recuperas con bonus si cumples |

## Cuánto deberías ganar

| Renta | Ingresos netos recomendados (35 %) |
|---|---|
| 600 € | 1.714 €/mes |
| 750 € | 2.143 €/mes |
| 850 € | 2.429 €/mes |
| 1.000 € | 2.857 €/mes |

Si compartís piso, cuentan los ingresos de todos.

## Tu mejor carta: el historial

Pagar a tiempo durante años debería servirte para algo. Por eso creamos el **pasaporte del buen inquilino**: un historial verificado que compartes con el siguiente propietario sin enseñar nóminas ni extractos.`,
  },
  {
    slug: 'ahorrar-para-la-entrada-de-un-piso-mientras-alquilas',
    title: 'Cómo ahorrar para la entrada de un piso mientras pagas alquiler',
    excerpt: 'Cuánto necesitas realmente para comprar, cuánto puedes ahorrar al mes y qué papel puede jugar tu hucha de alquiler.',
    audience: 'inquilinos',
    category: 'Ahorro',
    publishedAt: '2026-10-15',
    body: `Ahorrar para comprar mientras pagas alquiler es difícil, pero tener claros los números ayuda a hacer un plan realista.

## Cuánto necesitas para comprar

Los bancos suelen financiar hasta el **80 %** del valor de la vivienda. El resto, más los impuestos y gastos de la compra, sale de tus ahorros. Como referencia, calcula en torno al **30 % del precio**:

| Precio del piso | 20 % de entrada | Impuestos y gastos (aprox. 10 %) | **Ahorro necesario** |
|---|---|---|---|
| 150.000 € | 30.000 € | 15.000 € | **45.000 €** |
| 200.000 € | 40.000 € | 20.000 € | **60.000 €** |
| 250.000 € | 50.000 € | 25.000 € | **75.000 €** |

Los impuestos dependen de tu comunidad autónoma y de si la vivienda es nueva o de segunda mano.

## Tu ritmo de ahorro

| Ahorro mensual | En 3 años | En 5 años |
|---|---|---|
| 200 € | 7.200 € | 12.000 € |
| 400 € | 14.400 € | 24.000 € |
| 600 € | 21.600 € | 36.000 € |

## Dónde entra la hucha

Con la hucha de alquiler aportas el 4 % de tu renta cada mes y, si terminas sin deudas, la recuperas con un 10 % de bonus:

| Renta | Aportación | En 3 años | Con bonus |
|---|---|---|---|
| 600 € | 24 €/mes | 864 € | 950 € |
| 850 € | 34 €/mes | 1.224 € | 1.346 € |
| 1.000 € | 40 €/mes | 1.440 € | 1.584 € |

Seamos claros: **la hucha no te da la entrada entera**, pero es dinero que en un alquiler tradicional estaría inmovilizado sin rendir nada. Y el historial de pagos puntuales es una prueba de capacidad de pago que puedes enseñar al banco.

## Consejos que funcionan

1. Automatiza el ahorro el mismo día que cobras.
2. Separa el ahorro para la entrada del colchón de emergencias.
3. Revisa cada año si tu renta sigue siendo razonable para tus ingresos.`,
  },
  {
    slug: 'gastos-que-no-te-pueden-cobrar-al-alquilar',
    title: 'Gastos que no te pueden cobrar al alquilar un piso',
    excerpt: 'Honorarios de agencia, meses adelantados y garantías excesivas: lo que la ley prohíbe cobrar al inquilino y qué hacer si te lo piden.',
    audience: 'inquilinos',
    category: 'Derechos',
    publishedAt: '2026-10-15',
    body: `Saber qué no te pueden cobrar te ahorra dinero y discusiones. Estos son los límites principales en un alquiler de vivienda habitual.

## Lo que no te pueden cobrar

| Concepto | Qué dice la ley |
|---|---|
| Honorarios de la inmobiliaria | Los gastos de gestión inmobiliaria y de formalización del contrato son del propietario (Ley 12/2023) |
| Más de un mes de renta por adelantado | Prohibido exigirlo (LAU, art. 17.2) |
| Más de 2 meses de garantía adicional | Es el máximo en vivienda habitual (LAU, art. 36.5) |
| Una fianza distinta de un mes | En vivienda habitual, la fianza legal es de una mensualidad |

## Lo que sí te pueden pedir

- El primer mes de renta.
- La fianza legal de un mes.
- Una garantía adicional de hasta dos meses, en depósito o con aval.
- Los suministros que consumas, si así se pacta.

## Si te piden algo que no corresponde

1. Pide que te lo detallen **por escrito**.
2. Recuerda amablemente el límite legal: muchas veces es desconocimiento.
3. Si pagas, **guarda el justificante** de cada pago con su concepto.
4. Puedes reclamar ante la oficina de consumo de tu ayuntamiento o comunidad.

## La fianza vuelve

Al terminar el contrato, el propietario debe devolverte la fianza, descontando solo lo que esté justificado (rentas pendientes o desperfectos que vayan más allá del uso normal). Si tarda más de un mes en devolverla, la cantidad genera intereses legales.

## Con nosotros

La plataforma es **gratis para el inquilino**: no hay comisiones ni gastos de gestión. Y tu hucha es tuya: si terminas sin deudas, te la devolvemos con bonus.`,
  },
  {
    slug: 'irte-antes-de-tiempo-del-piso-de-alquiler',
    title: '¿Puedo irme antes de que acabe el contrato de alquiler?',
    excerpt: 'Cuándo puedes dejar el piso, con cuánto preaviso y cuánto te puede costar si el contrato prevé una indemnización.',
    audience: 'inquilinos',
    category: 'Derechos',
    publishedAt: '2026-10-15',
    body: `Cambiar de trabajo, de ciudad o de situación es normal. La ley lo tiene en cuenta y te permite marcharte antes de tiempo, con algunas condiciones.

## En vivienda habitual

- Puedes irte a partir de los **6 meses** de contrato.
- Tienes que avisar con al menos **30 días** de antelación (LAU, art. 11).

## La posible indemnización

Solo si el contrato lo dice expresamente, el propietario puede pedirte una indemnización de **un mes de renta por cada año de contrato que quede por cumplir** (en proporción si es menos de un año).

| Contrato | Te vas en el mes | Queda por cumplir | Indemnización máxima (si está pactada) |
|---|---|---|---|
| 3 años | 18 | 1,5 años | 1,5 mensualidades |
| 2 años | 12 | 1 año | 1 mensualidad |
| 1 año | 8 | 4 meses | Un tercio de la mensualidad |

Si el contrato no menciona la indemnización, no tienes que pagarla.

## Al final de cada año

Si tu contrato es anual y se va prorrogando, también puedes no renovar al final de cualquier anualidad, avisando con al menos 30 días antes de la fecha de vencimiento.

## Antes de irte

1. Envía el aviso por un medio que deje constancia (burofax o correo con acuse).
2. Pide una revisión del piso contigo delante y haz fotos.
3. Deja todo al día: rentas y suministros.
4. Facilita tu cuenta para la devolución de la fianza.

## Y tu historial

Si te vas cumpliendo, tu pasaporte de buen inquilino lo refleja y tu hucha se puede trasladar a tu siguiente piso de la red para seguir ahorrando.`,
  },
]
