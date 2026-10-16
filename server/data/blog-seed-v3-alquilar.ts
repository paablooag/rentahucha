import type { BlogPost } from '#shared/utils/blog'

// Tercera tanda (versión 3): poner un piso en alquiler y gestionarlo. Normativa: LAU (Ley 29/1994) y Ley 12/2023.

type Seed = Omit<BlogPost, 'updatedAt' | 'published'>
const D = '2026-10-15'

export const BLOG_SEED_V3_ALQUILAR: Seed[] = [
  {
    slug: 'como-poner-tu-piso-en-alquiler-paso-a-paso',
    title: 'Cómo poner tu piso en alquiler paso a paso (guía 2026)',
    excerpt: 'De preparar el piso a entregar las llaves: los 10 pasos, los documentos y los errores que debes evitar.',
    audience: 'propietarios',
    category: 'Poner en alquiler',
    publishedAt: D,
    body: `Alquilar tu piso por primera vez puede parecer un lío. Esta es la ruta completa, en orden.

## Los 10 pasos

1. **Revisa el piso**: reparaciones pendientes, limpieza y pintura.
2. **Saca el certificado energético**: es obligatorio para anunciar.
3. **Fija el precio**: compara con pisos similares y comprueba si tu zona es tensionada.
4. **Haz buenas fotos** con luz natural.
5. **Publica el anuncio** con toda la información.
6. **Filtra y organiza visitas**.
7. **Analiza la solvencia**: ingresos, contrato de trabajo y referencias.
8. **Firma el contrato** con un inventario y fotos.
9. **Deposita la fianza** en el organismo de tu comunidad autónoma.
10. **Cambia los suministros** y entrega las llaves.

## Documentos que necesitas

- Nota simple o escritura.
- Certificado energético.
- Cédula de habitabilidad, en las comunidades que la exigen.
- Últimos recibos de IBI y comunidad.

## Errores típicos

- Precio por encima del mercado: el piso se queda vacío semanas.
- No hacer inventario.
- No depositar la fianza.
- Elegir con prisa y sin comprobar ingresos.

## Para alquilar tranquilo

Elige bien al inquilino y suma una protección frente a impagos: con RentaHucha, la hucha del inquilino pasa a ti si deja de pagar. Si quieres cubrir más meses, puedes contratar además un seguro de impago. Más información en [seguro de impago o renta garantizada](/blog/seguro-de-impago-o-renta-garantizada).`,
  },
  {
    slug: 'fotos-que-alquilan-guia-con-el-movil',
    title: 'Fotos que alquilan: guía para hacerlas con el móvil',
    excerpt: 'Luz, ángulos, orden y número de fotos. Cómo conseguir imágenes de portal sin fotógrafo profesional.',
    audience: 'propietarios',
    category: 'Poner en alquiler',
    publishedAt: D,
    body: `Las fotos deciden si alguien pide visita o pasa al siguiente anuncio.

## Antes de disparar

- Limpia y **despeja**: quita objetos personales, imanes de la nevera y cables.
- Sube persianas y abre cortinas.
- Enciende todas las luces, aunque sea de día.
- Haz la cama con ropa lisa y clara.

## Cómo hacerlas

- **Horizontal** siempre.
- Desde una **esquina** de la habitación, a la altura del pecho.
- Usa el gran angular con moderación: no deformes.
- Evita el contraluz directo hacia la ventana.
- Mantén las líneas verticales rectas.

## Qué fotos incluir (orden recomendado)

1. Salón (la mejor)
2. Cocina
3. Dormitorio principal
4. Baño
5. Resto de dormitorios
6. Terraza o vistas
7. Fachada o portal, si suman

Entre **15 y 25 fotos** es un buen número.

## Extras

- Un **plano** sencillo aumenta el interés.
- Un vídeo corto o un recorrido virtual ahorra visitas a quien no le encaja el piso.`,
  },
  {
    slug: 'como-escribir-el-anuncio-perfecto-de-alquiler',
    title: 'Cómo escribir el anuncio perfecto para alquilar tu piso',
    excerpt: 'Título, descripción, datos obligatorios y cómo atraer al inquilino que buscas sin promesas vacías.',
    audience: 'propietarios',
    category: 'Poner en alquiler',
    publishedAt: D,
    body: `Un buen anuncio filtra por ti: atrae a quien encaja y evita visitas inútiles.

## El título

Fórmula: **tipo + habitaciones + rasgo diferencial + zona**.

Ejemplo: "Piso de 3 habitaciones reformado con terraza junto al metro".

## La descripción

1. **Lo mejor primero**: luz, reforma, ubicación.
2. **Distribución**: habitaciones, baños y metros útiles.
3. **Equipamiento**: amueblado o no, electrodomésticos, climatización.
4. **Edificio**: ascensor, portero, trastero o garaje.
5. **Entorno**: transporte, colegios, comercios.
6. **Condiciones**: renta, gastos incluidos o no, fianza, duración y fecha de disponibilidad.

## Datos que debes incluir

- **Calificación energética**: es obligatoria.
- Renta y gastos claros.
- Si es vivienda habitual o temporada.

## Lo que conviene evitar

- Exageraciones ("espectacular", "único") sin datos.
- Requisitos discriminatorios.
- Esconder información que el inquilino descubrirá en la visita.

## Revisa antes de publicar

Lee el anuncio como si fueras un inquilino: ¿sabrías si te encaja sin llamar?`,
  },
  {
    slug: 'donde-anunciar-tu-piso-de-alquiler',
    title: 'Dónde anunciar tu piso de alquiler: portales, redes o agencia',
    excerpt: 'Ventajas y costes de cada canal para llegar a buenos candidatos sin perder tiempo.',
    audience: 'propietarios',
    category: 'Poner en alquiler',
    publishedAt: D,
    body: `Elegir bien el canal ahorra semanas y llamadas.

## Opciones

| Canal | Ventajas | Inconvenientes |
|---|---|---|
| Grandes portales inmobiliarios | Máxima visibilidad | Muchas consultas que filtrar; algunos cobran por destacar |
| Redes sociales y grupos locales | Gratis, cercanía | Menos control, más mensajes poco serios |
| Agencia o gestora | Te lo hacen todo | Coste (desde 2023, los gastos de gestión los paga el propietario) |
| Universidades y empresas | Candidatos con perfil definido | Público concreto |
| Boca a boca | Confianza | Alcance limitado |

## Consejos

- Publica en **2 o 3 canales**, no en diez.
- Responde rápido las primeras 48 horas: es cuando más interés hay.
- Usa una plantilla de respuesta con los datos clave y las preguntas de filtro.

## Seguridad

No envíes copias de tu DNI ni datos bancarios a desconocidos. Y desconfía de quien quiere alquilar sin ver el piso y pagar desde el extranjero.`,
  },
  {
    slug: 'precio-de-salida-y-cuando-bajarlo',
    title: 'El precio de salida de tu alquiler y cuándo bajarlo',
    excerpt: 'Cómo leer las señales del mercado en las dos primeras semanas y ajustar sin perder dinero.',
    audience: 'propietarios',
    category: 'Poner en alquiler',
    publishedAt: D,
    body: `El precio de salida es una hipótesis. Las dos primeras semanas te dicen si es correcta.

## Señales

| Lo que pasa | Lo que significa |
|---|---|
| Muchos contactos y visitas el primer día | Precio ajustado o algo bajo |
| Visitas pero ninguna oferta | Precio alto para lo que se ve, o fotos que prometen más que el piso |
| Pocos contactos | Precio alto o anuncio poco atractivo |

## Cuándo ajustar

- Si en **10–15 días** no tienes visitas de calidad, revisa el precio y las fotos.
- Mejor **una bajada clara** (por ejemplo, un 5 %) que varias pequeñas.

## Cuánto cuesta no bajar

| Renta | Un mes vacío | Equivale a bajar al mes, durante un año |
|---|---|---|
| 800 € | 800 € | 67 € |
| 1.000 € | 1.000 € | 83 € |
| 1.300 € | 1.300 € | 108 € |

## Recuerda

En zonas tensionadas la renta del nuevo contrato puede estar limitada. Comprueba antes las reglas de tu zona.`,
  },
  {
    slug: 'organizar-visitas-piso-alquiler',
    title: 'Cómo organizar las visitas de tu piso de alquiler sin perder tiempo',
    excerpt: 'Filtro previo, visitas agrupadas y qué preguntar: un sistema para enseñar el piso pocas veces y elegir bien.',
    audience: 'propietarios',
    category: 'Poner en alquiler',
    publishedAt: D,
    body: `Enseñar un piso veinte veces agota. Con un poco de método, basta con unas pocas visitas.

## 1. Filtro previo

Antes de dar cita, pregunta:

- ¿Cuántas personas vivirán?
- ¿Fecha de entrada?
- ¿Situación laboral e ingresos aproximados?
- ¿Mascotas?

## 2. Agrupa las visitas

Concentra las visitas en **una o dos franjas** (por ejemplo, martes por la tarde y sábado por la mañana), con 20–30 minutos por visita.

## 3. Prepara el piso

Ventila, luces encendidas, temperatura agradable y los papeles a mano: certificado energético, recibos de suministros y condiciones del contrato.

## 4. Durante la visita

- Deja que recorran el piso con calma.
- Cuenta lo que no se ve: gastos de comunidad, consumo medio y vecinos.
- Explica el proceso y el plazo para decidir.

## 5. Después

Pide la documentación a los interesados y responde a todos, también a quienes no elijas.

## Seguridad

Si visitas sin compañía, avisa a alguien. Pide nombre y teléfono antes de cada visita.`,
  },
  {
    slug: 'alquilar-amueblado-o-sin-amueblar',
    title: '¿Alquilar amueblado o sin amueblar? Pros, contras y números',
    excerpt: 'Qué tipo de inquilino busca cada opción, cuánto cambia la renta y qué implica en averías e inventario.',
    audience: 'propietarios',
    category: 'Poner en alquiler',
    publishedAt: D,
    body: `Depende de tu zona, del tipo de inquilino y de cuánto quieras implicarte.

## Comparativa

| Aspecto | Amueblado | Sin amueblar |
|---|---|---|
| Público | Personas jóvenes, desplazadas, estancias de 1–3 años | Familias, estancias largas |
| Renta | Algo superior | Algo inferior |
| Rotación | Más alta | Más baja |
| Averías | Más elementos que mantener | Menos |
| Inventario | Detallado | Sencillo |

## Opción intermedia: semiamueblado

Cocina equipada, armarios y lámparas, sin sofá ni camas. Es muy demandado por familias.

## Si amueblas

- Muebles **resistentes y neutros**.
- Colchones nuevos, con funda protectora.
- Un inventario con fotos de cada mueble.
- Los muebles se amortizan al 10 % anual en tu IRPF.

## Consejo

Mira los anuncios de tu zona: si casi todos son amueblados, el tuyo destacará si también lo es, y viceversa.`,
  },
  {
    slug: 'home-staging-low-cost-para-alquilar',
    title: 'Home staging de bajo coste: prepara tu piso para alquilarlo antes',
    excerpt: 'Con menos de 300 € puedes transformar las fotos de tu anuncio. Textiles, plantas, espejos y orden.',
    audience: 'propietarios',
    category: 'Decoración',
    publishedAt: D,
    body: `El **home staging** consiste en preparar el piso para que guste al mayor número de personas. No hace falta gastar mucho.

## Lo esencial

1. **Despersonaliza**: fuera fotos familiares, colecciones y exceso de objetos.
2. **Despeja**: menos muebles hace que el espacio parezca mayor.
3. **Ilumina**: bombillas cálidas iguales en todo el piso.
4. **Neutraliza**: paredes y textiles en tonos claros.

## Compras con efecto (por menos de 300 €)

| Artículo | Para qué |
|---|---|
| Ropa de cama blanca y un plaid | Dormitorio de revista |
| Cojines en dos tonos | Da vida al sofá |
| Alfombra clara | Delimita la zona de estar |
| Espejo grande | Amplía y refleja la luz |
| Dos o tres plantas | Frescura |
| Toallas blancas | Baño de hotel |
| Cortinas de lino ligero | Suavizan la luz |

## En la cocina

Encimera despejada: como mucho, una tabla de madera y un frutero.

## Después de las fotos

Puedes dejar parte del staging como "regalo de bienvenida" o llevártelo para el próximo inquilino.`,
  },
  {
    slug: 'preguntas-para-elegir-inquilino-legales',
    title: 'Qué puedes preguntar a un candidato a inquilino (y qué no)',
    excerpt: 'Preguntas útiles y legales para valorar la solvencia, y los límites que marca la protección de datos.',
    audience: 'propietarios',
    category: 'Poner en alquiler',
    publishedAt: D,
    body: `Necesitas información para decidir, pero hay límites legales: protección de datos y no discriminación.

## Preguntas útiles y razonables

- ¿Cuántas personas vivirán en el piso?
- ¿Cuál es tu situación laboral? ¿Qué antigüedad tienes en el empleo?
- ¿Cuáles son tus ingresos netos mensuales aproximados?
- ¿Por qué te mudas? ¿Cuándo quieres entrar?
- ¿Tienes mascotas?
- ¿Podemos hablar con tu casero anterior?

## Documentación que es razonable pedir

- DNI o NIE.
- Últimas nóminas o declaración de la renta.
- Contrato de trabajo o alta de autónomo.

Pide **solo lo necesario** y guárdalo de forma segura. Borra la documentación de quien no elijas.

## Lo que no debes preguntar

- Religión, ideología, orientación sexual u origen.
- Planes de embarazo.
- Datos de salud.

## Criterio práctico

Una referencia habitual es que la renta no supere el **30–35 % de los ingresos netos** del hogar. Ver [cómo elegir un buen inquilino](/blog/como-elegir-un-buen-inquilino).`,
  },
  {
    slug: 'contrato-de-alquiler-plantilla-o-abogado',
    title: 'Contrato de alquiler: ¿plantilla, gestoría o abogado?',
    excerpt: 'Riesgos de copiar un modelo de internet, qué cláusulas personalizar y cuándo compensa pagar a un profesional.',
    audience: 'propietarios',
    category: 'Poner en alquiler',
    publishedAt: D,
    body: `El contrato es tu principal herramienta si algo va mal. Un modelo genérico puede tener cláusulas nulas o desactualizadas.

## Problemas típicos de las plantillas

- Duraciones contrarias a la LAU (por ejemplo, contratos de vivienda de un año sin prórroga).
- Fianzas o garantías por encima del límite legal.
- Gastos de agencia a cargo del inquilino, algo que ya no se permite.
- Cláusulas de renuncia a derechos irrenunciables.

## Qué debe estar bien redactado

- Identificación de las partes y de la vivienda (referencia catastral).
- Duración, prórrogas y preavisos.
- Renta, forma de pago y actualización.
- Fianza y garantías.
- Gastos: quién paga cada uno.
- Inventario y estado de la vivienda.
- Reparaciones, obras y mascotas.
- Desistimiento e indemnización pactada.

## Cuándo compensa un profesional

- Primera vez que alquilas.
- Pisos de valor alto o con particularidades (local, temporada, varias personas).
- Si quieres cláusulas a medida.

## Revisión anual

Las normas cambian. Si usas siempre tu modelo, actualízalo cada año.`,
  },
  {
    slug: 'depositar-la-fianza-en-tu-comunidad',
    title: 'Cómo depositar la fianza del alquiler en tu comunidad autónoma',
    excerpt: 'Es obligatorio en la mayoría de comunidades. Plazos, organismos y qué pasa si no lo haces.',
    audience: 'propietarios',
    category: 'Poner en alquiler',
    publishedAt: D,
    body: `La LAU obliga a exigir la fianza en metálico: **un mes** en vivienda y **dos** en uso distinto, como la temporada. La mayoría de comunidades autónomas obligan además a **depositarla** en un organismo público.

## Cómo funciona

1. Cobras la fianza al firmar.
2. La depositas en el organismo de tu comunidad (instituto de vivienda, consejería o agencia tributaria autonómica, según el caso).
3. Al terminar el contrato, la recuperas y la devuelves al inquilino, descontando los daños justificados.

## Plazos

Suelen ser de **uno o dos meses** desde la firma, según la comunidad.

## Si no la depositas

Te arriesgas a **sanciones** y, en algunas comunidades, a recargos.

## Qué guardar

- El justificante del depósito.
- El contrato con el importe de la fianza.

## Fianza y garantía adicional no son lo mismo

La **garantía adicional** (hasta dos meses en vivienda habitual) no se deposita. Lo explicamos en [fianza, garantía adicional y aval](/blog/fianza-garantia-adicional-y-aval-que-puedes-pedir).`,
  },
  {
    slug: 'cambio-de-titular-suministros-alquiler',
    title: 'Suministros en el alquiler: ¿cambiar el titular o no?',
    excerpt: 'Luz, agua, gas e internet: opciones para gestionar las facturas, riesgos de impagos y cómo hacer el cambio.',
    audience: 'propietarios',
    category: 'Poner en alquiler',
    publishedAt: D,
    body: `Es una de las dudas más frecuentes al alquilar: ¿las facturas siguen a tu nombre o pasan al inquilino?

## Opciones

| Opción | Ventajas | Riesgos |
|---|---|---|
| Cambio de titular al inquilino | Él gestiona y paga; tú no adelantas nada | Si deja deudas, el corte puede afectar al siguiente |
| Titularidad del propietario, el inquilino paga | Control | Si no paga, la deuda es tuya |
| Gastos incluidos en la renta | Comodidad (típico en habitaciones) | Consumos impredecibles |

## Recomendación general

Para vivienda habitual, el **cambio de titular** suele ser lo más limpio. El agua, en algunos municipios, va ligada a la propiedad.

## Cómo hacerlo

1. Anota las **lecturas de los contadores** el día de la entrega y haz fotos.
2. El inquilino llama a su comercializadora con el CUPS (luz o gas) y los datos del contrato.
3. Comprueba que el cambio se ha hecho.

## Al terminar el contrato

Haz de nuevo lecturas y fotos. Pide las últimas facturas pagadas antes de devolver la fianza.`,
  },
  {
    slug: 'seguro-de-hogar-del-propietario',
    title: 'Seguro de hogar para propietarios que alquilan: qué debe cubrir',
    excerpt: 'Continente, responsabilidad civil, daños por agua y actos vandálicos. Lo que necesitas y lo que no.',
    audience: 'propietarios',
    category: 'Poner en alquiler',
    publishedAt: D,
    body: `El seguro del propietario protege el edificio de tu piso y tu responsabilidad. El del inquilino protege sus cosas y su responsabilidad. Son complementarios.

## Coberturas clave

- **Continente**: paredes, suelos, instalaciones y elementos fijos.
- **Responsabilidad civil** como propietario: daños a vecinos o terceros.
- **Daños por agua**: incluida la localización y reparación de la fuga.
- **Incendio, explosión y fenómenos atmosféricos**.
- **Actos vandálicos** del inquilino: no todas las pólizas lo cubren. Pregúntalo.
- **Asistencia** 24 h: fontanería, cerrajería, electricidad.

## Si alquilas amueblado

Asegura también el **contenido** que es tuyo: muebles y electrodomésticos.

## Diferencia con el seguro de impago

El seguro de hogar **no** cubre que el inquilino deje de pagar. Para eso existe el **seguro de impago**, que puedes contratar aparte.

## Consejo

Avisa a tu aseguradora de que el piso está alquilado: algunas pólizas cambian las condiciones si no lo sabe.`,
  },
  {
    slug: 'primer-mes-tras-firmar-el-alquiler-propietario',
    title: 'Ya has firmado el alquiler: qué hacer el primer mes',
    excerpt: 'Fianza, suministros, seguro, comunicación con la comunidad y control de pagos. La lista de tareas tras la firma.',
    audience: 'propietarios',
    category: 'Poner en alquiler',
    publishedAt: D,
    body: `Firmar no es el final. Estas tareas del primer mes te evitan problemas después.

## Checklist

- [ ] **Depositar la fianza** en tu comunidad autónoma
- [ ] Guardar el contrato firmado, el inventario y las fotos en una carpeta (digital y en papel)
- [ ] Confirmar el **cambio de titular** de los suministros
- [ ] Avisar a tu **seguro** de que el piso está alquilado
- [ ] Informar al **administrador de la comunidad** del nuevo ocupante (contacto para avisos)
- [ ] Confirmar la recepción del **primer pago** y la forma de pago de los siguientes
- [ ] Apuntar las fechas clave: actualización, fin de contrato y preavisos
- [ ] Empezar a reservar gastos: IBI, comunidad y un fondo de mantenimiento

## Comunicación

Envía un mensaje de bienvenida con:

- El canal para avisos de averías.
- Teléfonos de urgencia (seguro, fontanero).
- Las normas de la comunidad.

## Fiscalidad

Apunta desde el primer mes **ingresos y gastos**: te facilitará la declaración de la renta.`,
  },
  {
    slug: 'comunicacion-con-el-inquilino-buenas-practicas',
    title: 'Comunicación con tu inquilino: buenas prácticas que evitan conflictos',
    excerpt: 'Canales, tiempos de respuesta, avisos por escrito y cómo plantear temas incómodos sin estropear la relación.',
    audience: 'propietarios',
    category: 'Gestión',
    publishedAt: D,
    body: `La mayoría de los conflictos de alquiler empiezan con un malentendido.

## Reglas básicas

1. **Un canal principal**, por ejemplo el email, y otro para urgencias (teléfono).
2. **Por escrito** todo lo importante: subidas, obras, avisos y acuerdos.
3. **Tiempos de respuesta** razonables. Urgencias como fugas o falta de luz, el mismo día.
4. **Tono profesional y amable**, también cuando hay problemas.

## Temas delicados

**Retraso en el pago**
Pregunta primero qué ha pasado, propón una fecha y déjalo por escrito.

**Ruidos o quejas de vecinos**
Transmite la queja con hechos, sin juicios.

**Visitas al piso**
Pide permiso con antelación y respeta su respuesta: es su domicilio.

## Lo que genera confianza

- Arreglar rápido las averías.
- Avisar de la actualización de la renta con el cálculo.
- Devolver la fianza en plazo al final del contrato.

Un buen inquilino que se queda años vale más que una renta algo más alta con rotación constante.`,
  },
  {
    slug: 'gestionar-tu-alquiler-o-delegar',
    title: '¿Gestionar tú el alquiler o delegarlo? Comparativa honesta',
    excerpt: 'Tiempo, coste y riesgo de gestionar por tu cuenta, con agencia, con gestión integral o con RentaHucha.',
    audience: 'propietarios',
    category: 'Gestión',
    publishedAt: D,
    body: `Alquilar requiere tiempo: anuncios, visitas, contratos, averías y cobros. Estas son las opciones habituales.

## Comparativa

| Opción | Tu tiempo | Coste | Riesgo de impago |
|---|---|---|---|
| Gestión propia | Alto | Ninguno directo | Lo asumes tú |
| Agencia (solo búsqueda) | Medio | Honorarios puntuales | Lo asumes tú |
| Gestión integral | Bajo | Porcentaje mensual | Depende del contrato |
| RentaHucha | Bajo | 5 % mensual | La hucha del inquilino pasa a ti |
| Seguro de impago (aparte) | — | Prima anual | Según la póliza |

## Preguntas para decidir

- ¿Vives cerca del piso?
- ¿Cuánto tiempo puedes dedicarle al mes?
- ¿Podrías asumir varios meses sin cobrar?
- ¿Tienes conocimientos legales básicos?

## Recuerda

Desde la Ley 12/2023, los **gastos de gestión inmobiliaria** los paga el propietario, no el inquilino.

En RentaHucha, por un **5 %** seleccionamos al inquilino, gestionamos cobros e incidencias y, si hay un impago, el saldo de su hucha pasa a ti. No somos una aseguradora: el seguro de impago, si lo quieres, lo contratas tú. [Más información](/propietarios).`,
  },
  {
    slug: 'alquilar-a-nomadas-digitales-y-temporada',
    title: 'Alquilar a nómadas digitales y por temporada: lo que debes saber',
    excerpt: 'Duración, causa justificada, fianza de dos meses y cómo documentar bien el contrato con las nuevas reglas.',
    audience: 'propietarios',
    category: 'Poner en alquiler',
    publishedAt: D,
    body: `Profesionales en remoto, estudiantes de máster o personal sanitario desplazado buscan pisos por meses.

## El marco legal

- **Contrato de temporada** (uso distinto de vivienda): no aplica la prórroga obligatoria de 5 o 7 años.
- **Fianza de dos meses**.
- Con el decreto de octubre de 2026 (pendiente de convalidación): de **31 días a 12 meses**, con causa justificada y como mucho dos contratos encadenados.

## Cómo hacerlo bien

- Pide un **documento que acredite la temporalidad**: contrato de trabajo temporal, matrícula o carta de la empresa.
- Recoge en el contrato la causa, las fechas y que el inquilino tiene su vivienda habitual en otro lugar.
- Inventario detallado: suelen ser pisos amueblados.

## Qué buscan

- Buena conexión a internet: indica la velocidad.
- Una zona de trabajo cómoda.
- Ubicación con transporte.
- Flexibilidad en las fechas de entrada.

## Atención

Si la estancia no es realmente temporal, el contrato puede considerarse de vivienda habitual. Más detalles en [las nuevas reglas de la temporada](/blog/alquiler-de-temporada-nuevas-reglas-12-meses).`,
  },
  {
    slug: 'alquilar-a-familias-que-buscan',
    title: 'Alquilar a familias: qué buscan y por qué suelen quedarse más',
    excerpt: 'Colegios, dormitorios, almacenaje y estabilidad. Cómo preparar tu piso y tu anuncio para familias.',
    audience: 'propietarios',
    category: 'Poner en alquiler',
    publishedAt: D,
    body: `Las familias suelen buscar **estabilidad**: cambiar de colegio y de barrio no es fácil. Por eso tienden a quedarse años.

## Qué valoran

- **Cercanía a colegios**, parques y centros de salud.
- Al menos **dos o tres dormitorios** y, si es posible, dos baños.
- **Almacenaje**: armarios empotrados, trastero.
- Ascensor si es un piso alto: carritos y compras.
- Cocina con espacio para comer.
- Lavavajillas y lavadora-secadora.

## En el anuncio

- Menciona los colegios y las líneas de transporte cercanas.
- Indica la superficie de cada dormitorio.
- Fotos de los armarios y del trastero.

## Contrato

- Duración larga: las familias valoran poder quedarse los 5 años.
- Revisa la **solvencia conjunta**: puedes incluir a ambos adultos como titulares.

## Ventaja para ti

Menos rotación significa menos meses vacíos, menos gastos de preparación y menos visitas.`,
  },
  {
    slug: 'alquilar-a-personas-mayores',
    title: 'Alquilar a personas mayores: un perfil estable y a menudo olvidado',
    excerpt: 'Ingresos por pensión, contratos largos y pequeñas adaptaciones. Por qué es una buena opción para muchos propietarios.',
    audience: 'propietarios',
    category: 'Poner en alquiler',
    publishedAt: D,
    body: `Muchas personas mayores alquilan tras vender su casa, para acercarse a su familia o para cambiar a un piso más cómodo.

## Por qué es un buen perfil

- **Ingresos estables** por pensión.
- Suelen buscar contratos largos.
- Cuidan la vivienda y la convivencia.

## Qué buscan

- **Ascensor** o planta baja.
- Ducha en lugar de bañera.
- Cerca de centros de salud, comercios y transporte.
- Calefacción eficiente.
- Un barrio tranquilo.

## Adaptaciones sencillas

Plato de ducha a ras, asideros, buena iluminación y suelos antideslizantes. Mira [pequeñas reformas de accesibilidad](/blog/pequenas-reformas-de-accesibilidad).

## Contrato

- Puedes pedir el justificante de la pensión como acreditación de ingresos.
- La LAU permite al inquilino mayor de 70 años hacer obras de adaptación, avisando por escrito.`,
  },
  {
    slug: 'alquiler-con-opcion-a-compra',
    title: 'Alquiler con opción a compra: cómo funciona para el propietario',
    excerpt: 'Prima, precio pactado, plazo y fiscalidad. Cuándo puede interesarte y qué riesgos tiene.',
    audience: 'propietarios',
    category: 'Poner en alquiler',
    publishedAt: D,
    body: `El alquiler con opción a compra une dos contratos: un **arrendamiento** y una **opción de compra**.

## Elementos clave

- **Precio de venta**: se fija al firmar.
- **Plazo de la opción**: por ejemplo, de 2 a 4 años.
- **Prima de la opción**: un importe inicial que paga el inquilino por el derecho a comprar.
- **Rentas que se descuentan**: qué parte del alquiler se resta del precio si compra.

## Ventajas para el propietario

- Inquilino muy comprometido con la vivienda.
- Precio de venta asegurado si se ejerce la opción.
- La prima suele quedar para el propietario si no se compra, según lo pactado.

## Riesgos

- Si el mercado sube, vendes al precio pactado.
- Inmovilizas el piso durante el plazo de la opción.
- Fiscalidad más compleja: rentas, prima y posible venta.

## Recomendación

Redacta el contrato con un profesional y considera inscribir la opción en el Registro de la Propiedad.`,
  },
  {
    slug: 'fin-de-contrato-como-recuperar-el-piso',
    title: 'Fin del contrato de alquiler: plazos para avisar y recuperar el piso',
    excerpt: 'Prórroga obligatoria, tácita, necesidad del propietario y preavisos: cómo terminar un contrato correctamente.',
    audience: 'propietarios',
    category: 'Gestión',
    publishedAt: D,
    body: `Muchos conflictos surgen al final del contrato por avisos fuera de plazo.

## Los plazos de la LAU (contratos desde marzo de 2019)

| Situación | Regla |
|---|---|
| Prórroga obligatoria | Hasta 5 años (7 si eres empresa), si el inquilino quiere seguir |
| Preaviso del propietario al final | Al menos 4 meses antes |
| Preaviso del inquilino | Al menos 2 meses antes |
| Prórroga tácita sin preaviso | Hasta 3 años más, por años |

## Recuperar el piso por necesidad

Durante la prórroga obligatoria solo si lo recoge el contrato y se cumplen las condiciones del art. 9 LAU: necesidad para ti o para familiares de primer grado, o tu cónyuge en caso de separación. Debe comunicarse con al menos dos meses de antelación.

## Atención a las novedades

El decreto de octubre de 2026 prevé **prórrogas extraordinarias** para contratos que venzan hasta finales de 2028, si se convalida. Revisa la situación antes de enviar el preaviso.

## Cómo comunicarlo

Por **burofax** o por un medio con acuse de recibo, con la fecha de finalización y la cita del artículo aplicable.

## Al final

Revisión conjunta del piso, lecturas de contadores, devolución de llaves y liquidación de la fianza.`,
  },
  {
    slug: 'revision-de-la-fianza-desgaste-normal-o-danos',
    title: 'Revisión de la fianza: desgaste normal o daños, ¿qué puedes descontar?',
    excerpt: 'Ejemplos claros de lo que es uso normal y lo que es un daño, y cómo justificar los descuentos.',
    audience: 'propietarios',
    category: 'Gestión',
    publishedAt: D,
    body: `La fianza garantiza que el inquilino cumple, pero **no cubre el desgaste normal** del uso del piso.

## Ejemplos

| Uso normal (no descontable) | Daño (descontable si se justifica) |
|---|---|
| Pintura algo deslucida tras años | Paredes pintadas de otro color sin permiso |
| Pequeñas marcas de muebles | Agujeros grandes o desconchones |
| Desgaste del suelo por el uso | Quemaduras, arañazos profundos o manchas de humedad por descuido |
| Electrodoméstico viejo que se avería | Electrodoméstico roto por mal uso |
| Juntas del baño oscurecidas | Mampara rota |

## Cómo justificar los descuentos

1. **Inventario con fotos** al inicio.
2. **Revisión conjunta** al final, con nuevas fotos.
3. **Presupuestos o facturas** de las reparaciones.
4. Comunicación escrita detallando cada descuento.

## Plazo

La LAU establece que, si la fianza no se devuelve en **un mes** desde la entrega de llaves, devenga el interés legal.

## Otros descuentos posibles

Rentas o suministros pendientes, con justificante.`,
  },
  {
    slug: 'piso-heredado-alquilar-o-vender',
    title: 'Piso heredado: ¿alquilarlo o venderlo?',
    excerpt: 'Rentabilidad, impuestos, reparto entre herederos y tiempo: las claves para decidir con números.',
    audience: 'propietarios',
    category: 'Rentabilidad',
    publishedAt: D,
    body: `Heredar un piso obliga a decidir qué hacer con él. No hay una respuesta única.

## Preguntas para decidir

- ¿Hay varios herederos? ¿Estáis de acuerdo?
- ¿En qué estado está el piso? ¿Cuánto costaría ponerlo a punto?
- ¿Necesitas liquidez ahora?
- ¿Tienes tiempo para gestionarlo?

## Números básicos

| Alquilar | Vender |
|---|---|
| Ingresos mensuales (renta menos gastos) | Ingreso único (precio menos impuestos y gastos) |
| El piso sigue siendo tuyo y puede revalorizarse | Liquidez para otras inversiones o necesidades |
| Tributa como capital inmobiliario, con reducciones | Tributa la ganancia patrimonial y la plusvalía municipal |

Calcula la **rentabilidad neta**: renta anual menos gastos, dividida por el valor del piso. Ver [rentabilidad bruta y neta](/blog/rentabilidad-bruta-y-neta-de-un-alquiler).

## Si sois varios herederos

Una opción es alquilar y repartir los ingresos según las cuotas. Dejadlo por escrito: quién gestiona, cómo se reparten los gastos y qué pasa si alguien quiere vender.

## Asesoramiento

La fiscalidad de herencias y ventas varía según la comunidad autónoma. Consulta con un profesional.`,
  },
  {
    slug: 'rentabilidad-bruta-y-neta-de-un-alquiler',
    title: 'Rentabilidad bruta y neta de un alquiler: cómo calcularla bien',
    excerpt: 'La fórmula, los gastos que se olvidan y un ejemplo completo para saber cuánto gana de verdad tu piso.',
    audience: 'propietarios',
    category: 'Rentabilidad',
    publishedAt: D,
    body: `La rentabilidad bruta es la que se anuncia. La **neta** es la que llega a tu bolsillo.

## Fórmulas

- **Bruta** = renta anual / valor del piso × 100
- **Neta** = (renta anual − gastos anuales) / valor del piso × 100

## Gastos que debes restar

- IBI y tasa de basuras.
- Comunidad.
- Seguro de hogar.
- Mantenimiento y reparaciones.
- Meses vacíos.
- Gestión del alquiler o seguro de impago.
- Impuestos (IRPF).

## Ejemplo

| Concepto | Importe anual |
|---|---|
| Renta (900 € × 12) | 10.800 € |
| IBI y basuras | −500 € |
| Comunidad | −720 € |
| Seguro | −250 € |
| Mantenimiento | −600 € |
| Gestión (5 %) | −540 € |
| **Neto antes de impuestos** | **8.190 €** |

Con un valor de 200.000 €, la rentabilidad bruta es del 5,4 % y la neta antes de impuestos, del **4,1 %**.

## Lo que más la mejora

- Reducir los meses vacíos.
- Evitar impagos.
- Aplicar bien las reducciones fiscales.`,
  },
  {
    slug: 'errores-tipicos-casero-primerizo',
    title: '10 errores típicos del casero primerizo (y cómo evitarlos)',
    excerpt: 'Del precio a la fianza: los fallos que más dinero y disgustos cuestan al alquilar por primera vez.',
    audience: 'propietarios',
    category: 'Gestión',
    publishedAt: D,
    body: `Casi todos los propietarios aprenden a base de errores. Puedes ahorrártelos.

1. **Poner el precio por sentimiento**: "mi piso vale más". Usa comparables.
2. **No hacer inventario ni fotos**: luego no puedes demostrar nada.
3. **Elegir por simpatía** sin comprobar ingresos.
4. **Usar un contrato descargado** sin revisar.
5. **No depositar la fianza** en tu comunidad.
6. **Pedir más garantías de las permitidas**: hasta dos meses de garantía adicional en vivienda habitual.
7. **Cobrar gastos de agencia al inquilino**: desde 2023 los paga el propietario.
8. **Entrar en el piso sin permiso**: es el domicilio del inquilino.
9. **No declarar el alquiler** o no aplicar las reducciones.
10. **No prever impagos**: sin seguro ni garantía, un impago puede costar meses de renta y gastos judiciales.

## Lo que sí funciona

- Un proceso ordenado: [cómo poner tu piso en alquiler paso a paso](/blog/como-poner-tu-piso-en-alquiler-paso-a-paso).
- Buena comunicación.
- Una protección frente a impagos: la hucha del inquilino y, si quieres, un seguro de impago.`,
  },
]
