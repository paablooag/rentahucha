import type { BlogPost } from '#shared/utils/blog'

// Decimoquinta versión del contenido inicial: artículos que responden a búsquedas concretas vistas en Search Console
// (Admin → Google). Situación comprobada el 21-10-2026.

type Seed = Omit<BlogPost, 'updatedAt' | 'published'>
const D = '2026-10-21'

export const BLOG_SEED_V15_BUSQUEDAS: Seed[] = [
  {
    slug: 'madrid-zona-tensionada-alquiler',
    title: '¿Es Madrid zona tensionada? Situación a octubre de 2026 y qué implica si alquilas tu piso',
    excerpt: 'Ningún municipio de la Comunidad de Madrid figura como zona de mercado residencial tensionado. Qué significa para el precio, qué normas se aplican igualmente y qué cambiaría si se declarara.',
    audience: 'propietarios',
    category: 'Normativa',
    publishedAt: D,
    body: `**Respuesta corta:** no. A fecha de 21 de octubre de 2026, **ni Madrid capital ni ningún otro municipio de la Comunidad de Madrid** figura en la lista de zonas de mercado residencial tensionado que publica el Ministerio de Vivienda. Por tanto, en Madrid **no se aplican los límites de renta propios de las zonas tensionadas**, pero sí el resto de normas estatales del alquiler, incluidas las de los decretos de octubre de 2026.

> **Actualizado a 21 de octubre de 2026.** La lista de zonas tensionadas se revisa periódicamente. Comprueba siempre la última versión en la web del Ministerio de Vivienda antes de firmar.

## Quién declara una zona tensionada

Según la Ley 12/2023, por el derecho a la vivienda, la declaración la hace **la comunidad autónoma** a partir de unos indicadores (por ejemplo, que el alquiler más los gastos supere el 30 % de los ingresos medios de los hogares, o que los precios hayan subido claramente por encima del IPC). El Ministerio de Vivienda recoge las declaraciones en su lista. Mientras la Comunidad de Madrid no declare ninguna zona, Madrid no es zona tensionada.

## Qué no se aplica en Madrid (por no ser zona tensionada)

| Regla de las zonas tensionadas | ¿Se aplica en Madrid? |
|---|---|
| Límite a la renta de un contrato nuevo (en general, la del contrato anterior) | No |
| Grandes tenedores: renta máxima según el índice de referencia | No |
| Obligación de poner el índice de referencia en el anuncio | No (solo en zonas tensionadas) |
| Prórroga extraordinaria de hasta 3 años prevista en la LAU para zonas tensionadas | No |

## Qué sí se aplica en Madrid

- **Ley de Arrendamientos Urbanos**: prórrogas hasta 5 años (7 si el arrendador es una empresa), fianza de una mensualidad y garantía adicional de como máximo dos mensualidades.
- **Gastos de gestión inmobiliaria y de formalización del contrato**: no se pueden cobrar al inquilino.
- **Actualización de la renta**: entre el 8 de octubre de 2026 y el 31 de diciembre de 2027, sin nuevo acuerdo, la subida anual no puede pasar del 2 %, y no hay subida si la renta supera el límite del índice de referencia (Real Decreto-ley 29/2026, pendiente de convalidación). Lo explicamos en [cuánto puede subir el alquiler en 2026 y 2027](/blog/limite-2-por-ciento-subida-alquiler-hasta-2027).
- **Anuncio**: debe ser veraz e incluir, cuando proceda, el número identificativo de la vivienda y si el arrendador es gran tenedor, además de la etiqueta energética: [qué debe incluir tu anuncio](/blog/que-debe-incluir-un-anuncio-de-alquiler-decreto-29-2026).
- **Fianza**: se deposita en la **Agencia de Vivienda Social de la Comunidad de Madrid**.

## ¿Y en la declaración de la renta?

En los contratos firmados hasta el 1 de diciembre de 2026, los porcentajes más altos de reducción del IRPF están ligados a las zonas tensionadas, así que en Madrid no se pueden aplicar. Para los firmados después, el decreto de octubre permite llegar al **100 %** también fuera de zonas tensionadas, por ejemplo si bajas la renta más de un 5 % y quedas por debajo del índice de referencia: [la reducción del IRPF por alquilar desde diciembre de 2026](/blog/reduccion-irpf-alquiler-vivienda-2027-hasta-100).

## Cómo fijar el precio en Madrid

Que no haya límite de renta no significa que cualquier precio funcione: un piso por encima del mercado se queda vacío, y cada mes vacío cuesta una mensualidad.

1. Compara con pisos parecidos de tu barrio.
2. Consulta el índice de referencia del Ministerio en [serpavi.mivau.gob.es](https://serpavi.mivau.gob.es/) como orientación.
3. Si quieres, pide una [valoración gratis del alquiler](/valoracion-alquiler) con comparables reales de tu zona.

Más consejos en la [guía para alquilar tu piso en Madrid](/alquilar-mi-piso/madrid).

## Preguntas frecuentes

### ¿Algún distrito de Madrid es zona tensionada?
No. A esta fecha no hay ninguna zona declarada en la Comunidad de Madrid, ni de municipio entero ni de distritos o barrios.

### ¿Puede cambiar?
Sí: si la Comunidad de Madrid declara una zona, pasaría a aplicarse allí el régimen de las zonas tensionadas. Lo actualizaremos en este artículo y en la guía de Madrid.

### ¿Qué ciudades sí son zona tensionada?
Por ejemplo, Barcelona y gran parte de Cataluña, y municipios del País Vasco, Navarra, Asturias o Galicia. Puedes verlo ciudad a ciudad en las [guías de alquiler por ciudad](/alquilar-mi-piso) y en [zonas tensionadas: qué son y dónde se aplican](/blog/zonas-tensionadas-que-son-y-donde-se-aplican).

## Fuentes

- Ministerio de Vivienda y Agenda Urbana: listado de zonas de mercado residencial tensionado (consultado el 18-10-2026).
- BOE: [Ley 12/2023, de 24 de mayo, por el derecho a la vivienda](https://www.boe.es/buscar/act.php?id=BOE-A-2023-12203).
- BOE: [Real Decreto-ley 29/2026, de 6 de octubre](https://www.boe.es/buscar/act.php?id=BOE-A-2026-20823).`,
  },
  {
    slug: 'reduccion-irpf-alquiler-vivienda-2027-hasta-100',
    title: 'Reducción del IRPF por alquilar tu piso desde diciembre de 2026: hasta el 100 % (y cuándo baja al 15 %)',
    excerpt: 'El decreto de octubre cambia la reducción del IRPF para los contratos de alquiler de vivienda firmados después del 1 de diciembre de 2026: hasta el 100 % si bajas la renta o te quedas por debajo del índice, y mucho menos si la subes. Tablas, ejemplos y qué pasa con tu contrato actual.',
    audience: 'propietarios',
    category: 'Fiscalidad',
    publishedAt: '2026-10-22',
    body: `**Respuesta corta:** si firmas un contrato de alquiler de vivienda **después del 1 de diciembre de 2026**, la reducción del IRPF sobre el rendimiento neto puede llegar al **100 %** (no tributas por ese alquiler) cuando bajas la renta más de un 5 % respecto al contrato anterior o, si es el primer alquiler, cuando la renta queda por debajo del índice de referencia. Si mantienes la renta, la reducción es del **50 %**; si la subes, baja **hasta el 15 %**. Lo establece el Real Decreto-ley 29/2026.

> **Actualizado a 22 de octubre de 2026.** El Real Decreto-ley 29/2026 está en vigor desde el 8 de octubre, pero tiene que ser convalidado por el Congreso (Diputación Permanente). La prensa sitúa la votación el 12 de noviembre. Si no se convalida, decae y se mantiene el régimen anterior. Actualizaremos este artículo con el resultado.

## Qué régimen se aplica a tu contrato

| Fecha de firma del contrato | Reducción que se aplica |
|---|---|
| Antes del 26 de mayo de 2023 (Ley 12/2023) | El régimen antiguo: 60 % |
| Del 26 de mayo de 2023 al 1 de diciembre de 2026 | El de la Ley 12/2023: del 50 % al 90 % según el caso |
| Después del 1 de diciembre de 2026 | **El nuevo régimen**, que se explica abajo |

Además, para cualquier contrato cuyo plazo mínimo de cinco años termine después del 1 de diciembre de 2026, la **prórroga tácita** puede tener una reducción del **80 %** (ver abajo).

## El nuevo régimen: si ya habías alquilado el piso antes

Se aplica a un nuevo contrato del mismo arrendador que **no sea gran tenedor**, comparando la renta inicial con la última renta del contrato anterior (actualizada):

### Si bajas la renta más de un 5 %

| Caso | Reducción |
|---|---|
| Renuevas con el **mismo inquilino** al acabar los 5 años o las prórrogas, o con otro inquilino y la renta queda **por debajo del índice de referencia** | **100 %** |
| Zona tensionada e inquilino de **18 a 35 años** | **95 %** |
| Zona tensionada | **90 %** |
| Inquilino de **18 a 35 años** | **85 %** |
| Resto de casos | **70 %** |

### Si mantienes o subes la renta

| Renta inicial respecto a la anterior | Reducción |
|---|---|
| Igual o menor (sin bajar más de un 5 %) | **50 %** |
| Sube hasta un 5 % | 40 % |
| Sube más de un 5 % y hasta un 10 % | 30 % |
| Sube más de un 10 % y hasta un 15 % | 25 % |
| Sube más de un 15 % y hasta un 20 % | 20 % |
| Sube más de un 20 % | 15 % |

## Si alquilas el piso por primera vez

Si no eres gran tenedor:

| Caso | Reducción |
|---|---|
| Renta inicial **por debajo** del límite del índice de referencia | **100 %** |
| Zona tensionada e inquilino de 18 a 35 años | 95 % |
| Zona tensionada | 90 % |
| Inquilino de 18 a 35 años | 85 % |
| Renta igual o superior al límite del índice | 50 % |

## Otros casos

- **Alquiler social** a una Administración o entidad sin ánimo de lucro, o vivienda en un programa público con renta limitada: **70 %**.
- **Vivienda rehabilitada** en los dos años anteriores al contrato: **60 %**.
- **Prórroga tácita** (artículo 10.1 de la LAU): **80 %** si la renta no supera el límite del índice de referencia y el arrendador no es gran tenedor.
- Si cumples varios supuestos, se aplica **el porcentaje más alto**.
- Con varios inquilinos, los porcentajes ligados a la edad se aplican en proporción a los que tengan de 18 a 35 años.

## Requisitos que conviene no olvidar

- Los requisitos se miran **al firmar** el contrato, y la reducción se mantiene mientras se sigan cumpliendo.
- Solo se aplica sobre el rendimiento **declarado** por ti antes de que Hacienda abra una comprobación: si no declaras el alquiler y te lo regularizan, pierdes la reducción.
- No se aplica a contratos que incumplan los límites de renta de las zonas tensionadas (artículo 17.6 de la LAU).
- El **índice de referencia** se consulta en [serpavi.mivau.gob.es](https://serpavi.mivau.gob.es/) con la referencia catastral.

## Ejemplos

Rendimiento neto de 7.000 € al año (rentas menos gastos deducibles):

| Situación del contrato nuevo | Reducción | Rendimiento que tributa |
|---|---|---|
| Bajas la renta un 6 % y quedas por debajo del índice | 100 % | 0 € |
| Bajas la renta un 6 %, sin más requisitos | 70 % | 2.100 € |
| Mantienes la renta | 50 % | 3.500 € |
| Subes la renta un 8 % | 30 % | 4.900 € |
| Subes la renta un 25 % | 15 % | 5.950 € |

## Qué significa para fijar el precio

Con este régimen, **subir la renta al cambiar de inquilino tiene un coste fiscal** y bajarla un poco puede compensar. Calcula tu caso en un minuto con la [calculadora de la reducción del IRPF](/herramientas/reduccion-irpf-alquiler), que compara firmar antes o después del 1 de diciembre. Antes de decidir, haz números con lo que de verdad te queda: la [calculadora de rentabilidad](/herramientas/rentabilidad-alquiler) te ayuda, y si quieres saber dónde está el mercado en tu zona, pide una [valoración gratis del alquiler](/valoracion-alquiler) con el índice oficial.

Más sobre la declaración: [cómo declarar el alquiler en la renta](/blog/como-declarar-el-alquiler-en-la-renta).

*Información general sobre la norma publicada en el BOE. No sustituye el asesoramiento de un profesional para tu caso concreto.*

## Fuentes

- BOE: [Real Decreto-ley 29/2026, de 6 de octubre](https://www.boe.es/buscar/act.php?id=BOE-A-2026-20823), artículo 6 (nueva redacción del artículo 23.2 y de la disposición transitoria trigésima octava de la Ley 35/2006 del IRPF), y [texto consolidado de la Ley del IRPF](https://www.boe.es/buscar/act.php?id=BOE-A-2006-20764). Consultados el 22-10-2026.`,
  },
  {
    slug: 'cuanto-cuesta-gestion-alquiler-inmobiliaria',
    title: '¿Cuánto cobra una inmobiliaria por gestionar tu alquiler? Precios habituales y qué incluyen',
    excerpt: 'Buscar inquilino suele costar una mensualidad y la gestión mensual entre un 8 % y un 12 % de la renta, según el sector. Qué incluye cada servicio, quién lo paga por ley y cuánto supone al año.',
    audience: 'propietarios',
    category: 'Gestión',
    publishedAt: '2026-10-22',
    body: `Si piensas en dejar tu piso en manos de una agencia, hay **dos servicios distintos** que conviene no mezclar: **buscar inquilino** (se paga una vez) y **gestionar el alquiler** mes a mes (se paga mientras dura el contrato). No hay tarifas oficiales: cada agencia fija las suyas, así que lo que sigue son los rangos que publica el propio sector.

## Los precios habituales, según el sector

| Servicio | Precio habitual | Fuente |
|---|---|---|
| Buscar inquilino (intermediación) | Alrededor de **una mensualidad + IVA** | Inmolovers |
| Gestión continuada (cobros, incidencias, renovaciones) | **8 %-12 % de la renta mensual + IVA** | Inmolovers |
| Gestión del alquiler | Entre un 8 % y un 10 % de la renta anual, o una mensualidad | Housfy |
| Tarifa fija de gestión | 25-40 € al mes (precio indicativo) | Cronoshare |

Son rangos orientativos: pide siempre presupuesto por escrito y compara **qué incluye** cada uno.

## Quién paga: siempre el propietario

Desde la Ley 12/2023, los gastos de gestión inmobiliaria y de formalización del contrato son a cargo del arrendador, y el decreto de octubre de 2026 lo refuerza: **no se pueden repercutir al inquilino** «ni directa ni indirectamente». Si una agencia te propone cobrarle «honorarios» al inquilino, desconfía.

## Cuánto supone al año

Con una renta de 900 € al mes:

| Modelo | Coste el primer año | Años siguientes |
|---|---|---|
| Solo buscar inquilino (1 mes + 21 % IVA) | 1.089 € | 0 € (hasta el siguiente inquilino) |
| Gestión al 8 % + IVA | 1.045 € | 1.045 € |
| Gestión al 12 % + IVA | 1.568 € | 1.568 € |
| Buscar inquilino + gestión al 10 % + IVA | 2.396 € | 1.307 € |

Los gastos de gestión del alquiler son **deducibles** en el IRPF del propietario.

## Qué debería incluir una buena gestión

- **Selección del inquilino** con solvencia comprobada (no solo nóminas: estabilidad y encaje con la renta).
- **Contrato** conforme a la LAU vigente, con inventario y fotos.
- **Depósito de la fianza** en el organismo de tu comunidad.
- **Cobro y aviso** de cada pago, y **actuación inmediata** si uno falla.
- **Incidencias**: quién atiende las averías, con qué plazos y con qué presupuesto máximo sin consultarte.
- **Renovaciones y actualización** de la renta según la ley vigente (ojo al límite del 2 % hasta finales de 2027).
- **Qué pasa si hay impago**: ¿te adelantan algo, gestionan el requerimiento, te preparan el expediente para el abogado? Muchas «rentas garantizadas» son en realidad un seguro: lee las condiciones.

## Preguntas que conviene hacer antes de firmar con una agencia

1. ¿El porcentaje es sobre la renta cobrada o sobre la pactada (aunque no cobre)?
2. ¿El IVA está incluido?
3. ¿Hay permanencia o penalización por cancelar?
4. ¿Las reparaciones tienen recargo?
5. ¿Quién es el dueño del contrato y de los datos del inquilino si dejo la agencia?

## ¿Y si lo gestionas tú?

Ahorras la cuota, pero asumes el tiempo: anuncio, visitas, selección, contrato, fianza, cobros e incidencias. Para hacerlo bien tienes la [guía para poner tu piso en alquiler](/blog/como-poner-tu-piso-en-alquiler-paso-a-paso), la [checklist](/herramientas/checklist-alquilar-piso) y el [modelo de contrato](/herramientas/modelo-contrato-alquiler). Para ver cuánto te queda de verdad con y sin gestión, usa la [calculadora de rentabilidad](/herramientas/rentabilidad-alquiler).

## Cómo lo planteamos en RentaHucha

En la beta puedes [publicar tu piso gratis](/cuenta/registro) y hablar con los interesados por chat. Desde el lanzamiento, la cuota será del **5 % de la renta** con un piso (hasta el 3,5 % con varios; precios orientativos de lanzamiento) e incluirá inquilinos verificados, contrato conforme a la LAU, aviso de cada pago, incidencias en un panel y un protocolo de impago con la hucha del inquilino, que custodia una entidad financiera autorizada. No somos una aseguradora: si quieres cubrir más meses de impago, puedes contratar tu propio seguro. Si quieres saber primero cuánto pedir, pide una [valoración gratis del alquiler](/valoracion-alquiler).

## Fuentes

- Inmolovers: [Comisiones de agentes inmobiliarios en España: guía completa (2026)](https://inmolovers.com/guias/comisiones-agente-inmobiliario).
- Housfy: [¿Quién paga a la inmobiliaria en un alquiler en 2026?](https://housfy.com/blog/comision-inmobiliaria-del-alquiler-quien-la-paga-y-como-se-calcula/).
- Cronoshare: [¿Cuánto cuesta la gestión de alquileres? Precios en 2026](https://www.cronoshare.com/cuanto-cuesta/gestion-alquileres).
- BOE: [Real Decreto-ley 29/2026](https://www.boe.es/buscar/act.php?id=BOE-A-2026-20823), nueva redacción del artículo 20 de la LAU (gastos de gestión).`,
  },
  {
    slug: 'iva-10-reformas-piso-alquilado-diciembre-2026',
    title: 'Reformas en pisos alquilados con IVA del 10 % desde el 1 de diciembre de 2026: requisitos',
    excerpt: 'El decreto de octubre extiende el IVA reducido del 10 % a las obras de renovación y reparación de viviendas alquiladas como vivienda habitual, sea cual sea el arrendador. Requisitos, ejemplo y qué pasa con los pisos turísticos.',
    audience: 'propietarios',
    category: 'Fiscalidad',
    publishedAt: '2026-10-22',
    body: `**Respuesta corta:** desde el **1 de diciembre de 2026**, las obras de **renovación y reparación** de una vivienda que se alquila **como vivienda habitual** tributan al **IVA del 10 %** en lugar del 21 %, **cualquiera que sea la condición del arrendador** (particular, empresa o gran tenedor), si se cumplen unos requisitos. Lo establece el Real Decreto-ley 29/2026, pendiente de convalidación.

> **Actualizado a 22 de octubre de 2026.** El decreto está en vigor, pero esta medida tiene efectos desde el 1 de diciembre de 2026 y depende de la convalidación del decreto (votación prevista el 12 de noviembre, según la prensa).

## Qué cambia

Hasta ahora, el IVA reducido del 10 % en obras de renovación y reparación de viviendas se aplicaba, en general, cuando quien encargaba la obra era un **particular que la usaba para sí mismo** (o una comunidad de propietarios). Si reformabas un piso para alquilarlo, lo normal era pagar el 21 %.

Con la nueva redacción del artículo 91.Uno.2.10.º de la Ley del IVA, también se aplica el 10 % **cuando la vivienda se destina al alquiler como vivienda habitual, cualquiera que sea la condición del arrendador**.

## Requisitos

| Requisito | Qué significa |
|---|---|
| Obras de **renovación y reparación** | No obra nueva: arreglos, reformas de baño o cocina, instalaciones, pintura… |
| Vivienda alquilada **como vivienda habitual** del inquilino | No vale el alquiler turístico ni, en principio, el de temporada |
| **Pago por medios trazables** | Tarjeta, transferencia, cheque nominativo o ingreso en cuenta. **Si pagas en efectivo, no hay tipo reducido** |
| Edificio terminado (o rehabilitado) **hace al menos dos años** | Antes de empezar las obras |
| **Materiales**: si los aporta quien hace la obra, su coste no puede superar el **40 %** de la base imponible | Si los materiales pesan más, se aplica el 21 % |

## Ejemplo

Reforma de baño en un piso alquilado como vivienda habitual, 6.000 € de base (mano de obra 4.000 € y materiales 2.000 €, es decir, un 33 % en materiales), pagada por transferencia:

| | IVA al 21 % | IVA al 10 % |
|---|---|---|
| Base | 6.000 € | 6.000 € |
| IVA | 1.260 € | 600 € |
| **Total** | **7.260 €** | **6.600 €** |

Ahorro: **660 €**. Además, si es una reparación o conservación, el gasto puede deducirse en el IRPF del alquiler (con los límites de cada caso).

## Consejos

- Si estás pensando reformar antes de alquilar, ten en cuenta la fecha: **desde el 1 de diciembre** se aplica el tipo reducido.
- Pide la factura detallando mano de obra y materiales, y paga siempre por banco.
- Guarda el contrato de alquiler (o tenlo firmado al hacer la obra) para acreditar que es vivienda habitual del inquilino.
- Si la reforma es importante, valora también la reducción del IRPF del 60 % para viviendas rehabilitadas en los dos años anteriores al contrato: [cómo funciona la reducción del IRPF](/herramientas/reduccion-irpf-alquiler).

## ¿Y los pisos turísticos o de corta estancia?

Van en sentido contrario. Desde la misma fecha, el alquiler de viviendas amuebladas por **30 noches o menos** (o con servicios de tipo hotelero, como limpieza o lavandería) deja de estar exento y pasa a tributar al **IVA del 10 %**, salvo que se alquile en la vivienda donde el propio arrendador tiene su residencia habitual. El alquiler de vivienda habitual de larga duración sigue exento de IVA.

¿Vas a reformar para alquilar? Mira qué reformas compensan en [reformas que se pagan solas al alquilar](/blog/reformas-que-se-pagan-solas-al-alquilar) y pide una [valoración gratis del alquiler](/valoracion-alquiler) para saber cuánto podrás pedir después.

*Información general sobre la norma publicada en el BOE. Para tu caso concreto, consulta con un asesor fiscal.*

## Fuentes

- BOE: [Real Decreto-ley 29/2026, de 6 de octubre](https://www.boe.es/buscar/act.php?id=BOE-A-2026-20823), artículo 7 (modificación de los artículos 20.Uno.23.º y 91.Uno.2 de la Ley 37/1992 del IVA), con efectos desde el 1 de diciembre de 2026. Consultado el 22-10-2026.`,
  },
  {
    slug: 'documento-finalizacion-contrato-alquiler-plantilla',
    title: 'Documento de finalización del alquiler: qué es, por qué es obligatorio y plantilla para copiar',
    excerpt: 'Desde octubre de 2026, al terminar el alquiler propietario e inquilino deben firmar un documento con el estado de la vivienda. Si no se firma, se presume que se entregó bien. Qué debe incluir y una plantilla gratis.',
    audience: 'propietarios',
    category: 'Legal',
    publishedAt: '2026-10-22',
    body: `**Respuesta corta:** el Real Decreto-ley 29/2026 añade un apartado 7 al artículo 36 de la Ley de Arrendamientos Urbanos: **al terminar el contrato, las partes deben dejar constancia por escrito del estado de la vivienda** en un **documento de finalización del arrendamiento** firmado por ambas. Si no se firma, o si no recoge ningún desperfecto, **se presume que la vivienda se entregó en buen estado**, salvo prueba en contrario.

> **Actualizado a 22 de octubre de 2026.** El decreto está en vigor desde el 8 de octubre y pendiente de convalidación por el Congreso.

## Por qué te importa (seas propietario o inquilino)

- **Propietario:** si hay desperfectos y no los escribes en el documento, después será difícil descontarlos de la fianza: la ley presume que el piso se entregó bien.
- **Inquilino:** el documento firmado te protege frente a reclamaciones posteriores y agiliza la devolución de la fianza.

## Qué debe incluir

- Identificación de las partes, de la vivienda y del contrato.
- **Fecha y hora** de entrega de llaves (y cuántas llaves se devuelven).
- **Lecturas de contadores** (luz, agua, gas).
- **Estado de cada estancia** y del mobiliario, comparado con el **inventario inicial**.
- **Desperfectos** concretos, si los hay, distinguiendo el desgaste por el uso normal (que no es un desperfecto).
- Qué pasa con la **fianza**: si se devuelve entera o qué se descuenta y por qué.
- **Firmas** de ambas partes. Adjuntad fotos fechadas.

## Plantilla

Cópiala y adáptala. Rellenadla juntos el día de la entrega de llaves.

> **DOCUMENTO DE FINALIZACIÓN DEL ARRENDAMIENTO**
>
> (artículo 36.7 de la Ley 29/1994, de Arrendamientos Urbanos)
>
> En [ciudad], a [fecha], a las [hora].
>
> **Arrendador/a:** [nombre y apellidos], con DNI/NIE [número].
>
> **Arrendatario/a:** [nombre y apellidos], con DNI/NIE [número].
>
> **Vivienda:** [dirección completa], referencia catastral [número].
>
> **Contrato** de fecha [fecha de firma].
>
> **1. Entrega de la posesión.** El arrendatario entrega en este acto la posesión de la vivienda y [número] llaves / mandos. El arrendador las recibe.
>
> **2. Contadores.** Luz: [lectura]. Agua: [lectura]. Gas: [lectura].
>
> **3. Estado de la vivienda**, comparado con el inventario inicial de fecha [fecha]:
> - Entrada y salón: [estado].
> - Cocina y electrodomésticos: [estado].
> - Baño(s): [estado].
> - Dormitorio(s): [estado].
> - Mobiliario: [estado].
> - Otros (terraza, trastero, garaje): [estado].
>
> **4. Desperfectos** (excluido el desgaste por el uso normal): [descripción concreta de cada uno, o «Ninguno»].
>
> **5. Fianza.** Importe: [importe] €. Se devuelve: [íntegra / [importe] € descontando [concepto e importe justificado]], mediante [transferencia a la cuenta …] en el plazo de [días] (como máximo, un mes desde la entrega de llaves).
>
> **6. Anexos.** [número] fotografías fechadas.
>
> Firmado por ambas partes:
>
> Arrendador/a: ____________________
>
> Arrendatario/a: ____________________

## Consejos

- Haced la revisión **juntos**, con el inventario inicial delante.
- Si no estáis de acuerdo en algún punto, **escribidlo igualmente** en el documento («el arrendatario no está conforme con…»): es mejor que no dejar constancia.
- La fianza se devuelve en el plazo de **un mes** desde la entrega de llaves; si no, genera intereses.
- Prepara el final desde el principio: un buen **inventario con fotos** al firmar el contrato lo facilita todo. Lo tienes en la [checklist para alquilar tu piso](/herramientas/checklist-alquilar-piso).

*Plantilla orientativa. Para situaciones complejas o con desacuerdo, consulta con un profesional.*

## Fuentes

- BOE: [Real Decreto-ley 29/2026, de 6 de octubre](https://www.boe.es/buscar/act.php?id=BOE-A-2026-20823), artículo 3 (nuevo apartado 7 del artículo 36 de la LAU). Consultado el 22-10-2026.`,
  },
]
