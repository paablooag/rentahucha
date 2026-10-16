import type { BlogPost } from '#shared/utils/blog'

// Tercera tanda (versión 3): reformas y mantenimiento. Los precios son orientativos (varían por ciudad, calidades y
// año) y se presentan como rangos; las obligaciones legales remiten a la LAU y a la normativa técnica general.

type Seed = Omit<BlogPost, 'updatedAt' | 'published'>
const D = '2026-10-15'

export const BLOG_SEED_V3_REFORMAS: Seed[] = [
  {
    slug: 'reformas-que-se-pagan-solas-al-alquilar',
    title: '7 reformas que se pagan solas cuando alquilas tu piso',
    excerpt: 'Pintura, iluminación, cocina y baño: dónde invertir para alquilar antes y mejor, y dónde no merece la pena gastar.',
    audience: 'propietarios',
    category: 'Reformas',
    publishedAt: D,
    body: `No todas las reformas suben la renta. Estas son las que más se notan en las visitas y en el tiempo que tardas en alquilar.

## Las que más rinden

1. **Pintura blanca o neutra**: es la más barata y la que más cambia las fotos.
2. **Iluminación LED**: luz cálida en salón y dormitorios, neutra en cocina y baño.
3. **Frentes de cocina y encimera**: cambiar puertas y tiradores sin tocar los muebles.
4. **Mampara y grifería del baño**: un baño "de antes" pasa a parecer actual.
5. **Suelo vinílico sobre el existente**: rápido, resistente al agua y sin escombros.
6. **Enchufes y mecanismos nuevos**: detalle pequeño con mucho efecto.
7. **Mejoras de eficiencia**: burletes, ventanas o termostato. Bajan facturas y mejoran el certificado energético.

## Las que rara vez compensan para alquilar

- Acabados de lujo que el inquilino no paga.
- Cambios de distribución costosos si el piso ya funciona.
- Domótica compleja que luego hay que mantener.

## Regla práctica

Divide el coste de la reforma entre el aumento de renta mensual esperado. Si se recupera en **menos de 3–4 años**, suele merecer la pena. Y recuerda que acortar el tiempo vacío también cuenta como ganancia.`,
  },
  {
    slug: 'reformar-cocina-para-alquilar',
    title: 'Reformar la cocina para alquilar: materiales resistentes y presupuesto',
    excerpt: 'Encimeras, frentes, electrodomésticos y distribución: cómo hacer una cocina bonita, duradera y fácil de mantener.',
    audience: 'propietarios',
    category: 'Reformas',
    publishedAt: D,
    body: `La cocina es la estancia que más pesa en la decisión del inquilino. Y también la que más se desgasta. La clave es elegir **materiales resistentes y fáciles de reponer**.

## Materiales recomendados

| Elemento | Opción para alquiler | Por qué |
|---|---|---|
| Encimera | Laminado de alta presión o compacto | Barata, resistente y fácil de cambiar |
| Frentes | Laminado mate o lacado resistente | No marca huellas y se sustituye por piezas |
| Frente entre muebles | Porcelánico o vidrio | Se limpia fácil |
| Fregadero | Acero inoxidable bajo encimera | Duradero |
| Grifo | Monomando con caño extraíble | Cómodo y robusto |

## Electrodomésticos

Placa de inducción o vitrocerámica, horno, frigorífico combi y lavadora. Elige **eficiencia energética alta**: el inquilino lo valora y se nota en la factura.

## Presupuesto orientativo

- **Lavado de cara** (frentes, encimera y grifo): desde unos 1.500–3.000 €.
- **Cocina nueva completa** con electrodomésticos básicos: desde unos 5.000–9.000 €, según los metros y las calidades.

## Consejos

- Pide fotos o fichas de los acabados y guarda las referencias para poder reponer piezas.
- Evita los muebles de color brillante muy marcado: neutro siempre alquila mejor.`,
  },
  {
    slug: 'reformar-bano-para-alquilar-plato-ducha-o-banera',
    title: 'Reformar el baño para alquilar: ¿plato de ducha o bañera?',
    excerpt: 'Qué prefieren los inquilinos, cuánto cuesta cambiar la bañera por ducha y qué materiales evitan problemas de humedad.',
    audience: 'propietarios',
    category: 'Reformas',
    publishedAt: D,
    body: `Un baño anticuado resta mucho en las fotos. Y un baño con fugas genera averías y discusiones.

## Plato de ducha o bañera

| Opción | Pros | Contras |
|---|---|---|
| Plato de ducha | Más accesible, moderno y fácil de limpiar | Menos atractivo para familias con bebés |
| Bañera | Útil con niños pequeños | Más difícil de usar para personas mayores |

En pisos pequeños y para personas jóvenes o mayores, el **plato de ducha** suele ser lo más demandado.

## Lo que más importa

- **Impermeabilización** correcta bajo el plato y en las paredes de la ducha.
- **Extractor** si el baño no tiene ventana: evita moho y condensación.
- Mampara fija o corredera de vidrio templado.
- Grifería **termostática**: más segura y cómoda.

## Presupuesto orientativo

- Cambiar bañera por plato con mampara: unos 1.000–2.500 €.
- Baño completo de unos 4 m²: unos 4.000–8.000 €, según los materiales.

## Opciones sin obra

Pintura específica para azulejos, vinilos para suelo de baño y espejo con luz LED. Ver [lavado de cara del baño sin obras](/blog/bano-de-alquiler-lavado-de-cara-sin-obras).`,
  },
  {
    slug: 'colores-de-pintura-que-alquilan-mejor',
    title: 'Colores de pintura que alquilan mejor (y cuáles evitar)',
    excerpt: 'Blancos cálidos, grises suaves y tonos arena: la paleta que amplía, ilumina y gusta a casi todos.',
    audience: 'propietarios',
    category: 'Reformas',
    publishedAt: D,
    body: `Pintar es la reforma más rentable para alquilar. El color correcto hace el piso más grande y luminoso en las fotos.

## Colores que funcionan

- **Blanco roto o cálido**: luminoso sin parecer un hospital.
- **Gris muy claro o greige** (mezcla de gris y beige): elegante y disimula marcas.
- **Arena o lino**: acogedor en dormitorios.

## Colores a evitar

- Tonos muy oscuros o intensos en paredes grandes.
- Paredes de distintos colores sin criterio.
- Gotelé muy marcado: si puedes, alísalo.

## Acabado

| Estancia | Acabado recomendado |
|---|---|
| Salón y dormitorios | Mate lavable |
| Cocina y baño | Satinado o pintura antihumedad |
| Techos | Mate blanco |

## Truco para alquiler

Usa **un solo color** en todo el piso y guarda un bote con la referencia. Así podrás retocar entre inquilinos en una tarde.

## Coste orientativo

Pintar un piso de 70–80 m² por profesionales cuesta unos **1.000–2.000 €**, según el estado de las paredes y la ciudad.`,
  },
  {
    slug: 'suelos-para-piso-de-alquiler-vinilico-laminado-porcelanico',
    title: 'Suelos para un piso de alquiler: vinílico, laminado o porcelánico',
    excerpt: 'Comparativa de resistencia, precio y facilidad de instalación para elegir el suelo que más dura con inquilinos.',
    audience: 'propietarios',
    category: 'Reformas',
    publishedAt: D,
    body: `El suelo es lo que más sufre en un piso alquilado: muebles, mascotas, humedad, mudanzas…

## Comparativa

| Suelo | Resistencia al agua | Resistencia a golpes | Instalación | Precio orientativo |
|---|---|---|---|---|
| Vinílico SPC/LVT | Alta | Buena | Rápida, sobre el suelo existente | Medio |
| Laminado AC4/AC5 | Baja o media | Buena | Rápida | Bajo o medio |
| Porcelánico | Muy alta | Muy alta | Con obra | Medio o alto |
| Parqué de madera | Baja | Media | Con obra | Alto |

## Recomendación general

- **Vinílico de clic** de buena capa de uso: ideal para renovar sin obra y apto para baños y cocinas.
- **Porcelánico imitación madera**: para un piso que alquilarás muchos años.
- **Laminado**: económico, pero evítalo en zonas húmedas.

## Consejos

- Pide la **capa de uso** (en vinílico, al menos 0,3–0,55 mm para uso intenso).
- Pon fieltro en las patas de los muebles que dejes en el piso.
- Guarda una caja de lamas de repuesto.`,
  },
  {
    slug: 'mejorar-certificado-energetico-piso-alquiler',
    title: 'Cómo mejorar la letra del certificado energético de tu piso',
    excerpt: 'Es obligatorio para alquilar. Estas mejoras suben la calificación, bajan facturas y hacen tu anuncio más atractivo.',
    audience: 'propietarios',
    category: 'Reformas',
    publishedAt: D,
    body: `El **certificado de eficiencia energética** es obligatorio para anunciar y alquilar una vivienda. La letra, de la A a la G, debe aparecer en el anuncio.

## Qué mide

Cuánta energía consume el piso y cuánto CO₂ emite, en condiciones normales de uso: calefacción, refrigeración y agua caliente.

## Mejoras que más suben la letra

1. **Ventanas** con rotura de puente térmico y doble vidrio bajo emisivo.
2. **Aislamiento**: trasdosados interiores o insuflado en cámaras.
3. **Bomba de calor** o aerotermia en lugar de radiadores eléctricos.
4. **Termo eficiente** o aerotermia para el agua caliente.
5. **Iluminación LED** (influye poco en vivienda, pero suma).

## Pasos

1. Pide primero un certificado con **propuestas de mejora**: el técnico las incluye.
2. Prioriza por coste y por letras ganadas.
3. Tras la obra, **actualiza el certificado** y regístralo en tu comunidad autónoma.

## Ayudas

Hay programas de rehabilitación energética financiados con fondos públicos, que gestiona cada comunidad. Consulta la convocatoria vigente en la tuya.

## Duración

El certificado vale **10 años**, o 5 si la letra es G.`,
  },
  {
    slug: 'ventanas-y-aislamiento-ahorro-en-pisos-de-alquiler',
    title: 'Ventanas y aislamiento: cuánto se ahorra y si compensa en alquiler',
    excerpt: 'Las ventanas son el punto débil de muchos pisos antiguos. Qué cambiar, cuánto cuesta y cómo afecta a la renta.',
    audience: 'propietarios',
    category: 'Reformas',
    publishedAt: D,
    body: `En un piso antiguo, buena parte del calor del invierno se escapa por las ventanas y los cajones de persiana.

## Señales de que toca cambiarlas

- Corrientes de aire con la ventana cerrada.
- Condensación en el cristal todas las mañanas.
- Mucho ruido de la calle.
- Marcos de aluminio sin rotura de puente térmico, o de madera deteriorada.

## Opciones

| Opción | Coste orientativo por ventana | Mejora |
|---|---|---|
| Burletes y sellado | Muy bajo | Pequeña |
| Cambiar solo el vidrio | Bajo o medio | Media |
| Ventana de PVC o aluminio con RPT | Medio | Alta |
| Aislar el cajón de persiana | Bajo | Media |

## ¿Compensa en un piso alquilado?

- El inquilino paga menos de luz o gas y valora más el piso.
- Mejoras el **certificado energético**.
- Puedes optar a ayudas de rehabilitación energética.
- Las obras de mejora amortizan en tu IRPF.

## Ojo con la comunidad

Si cambias el color o el aspecto exterior de la fachada, puede hacer falta permiso de la comunidad y licencia municipal.`,
  },
  {
    slug: 'instalacion-electrica-boletin-cuando-renovar',
    title: 'Instalación eléctrica: boletín, potencia y cuándo renovarla',
    excerpt: 'Qué es el certificado de instalación eléctrica, cuándo te lo piden y señales de que tu piso necesita una revisión.',
    audience: 'propietarios',
    category: 'Reformas',
    publishedAt: D,
    body: `Una instalación eléctrica antigua es un riesgo de seguridad y una fuente de averías.

## El "boletín"

El **Certificado de Instalación Eléctrica (CIE)**, conocido como boletín, lo emite un instalador autorizado. Puede hacer falta para:

- Dar de alta un suministro tras una baja larga.
- Aumentar la potencia contratada por encima de lo permitido por la instalación.
- Instalaciones nuevas o reformadas.

Los requisitos concretos dependen de tu comunidad autónoma y de la distribuidora.

## Señales de que hay que revisarla

- Los diferenciales saltan con frecuencia.
- Enchufes sin toma de tierra.
- Cuadro eléctrico antiguo con fusibles de rosca.
- Cables con funda de tela o sin canalizar.

## Mínimos para alquilar con tranquilidad

- Cuadro con **diferencial** y magnetotérmicos por circuito.
- Circuitos separados para cocina y lavadora.
- Toma de tierra en enchufes y baño.

## Coste orientativo

Renovar la instalación completa de un piso de unos 80 m² puede costar entre **2.500 y 6.000 €**, según la ciudad y si hay que hacer rozas.`,
  },
  {
    slug: 'aire-acondicionado-bomba-de-calor-en-alquiler',
    title: 'Aire acondicionado y bomba de calor: ¿merece la pena en tu alquiler?',
    excerpt: 'Los veranos son cada vez más calurosos y el clima ya es un filtro en las búsquedas. Coste, consumo y qué valoran los inquilinos.',
    audience: 'propietarios',
    category: 'Reformas',
    publishedAt: D,
    body: `En muchas ciudades, un piso sin climatización ya es un motivo de descarte en verano.

## Por qué la bomba de calor

- **Frío y calor** con el mismo equipo.
- Mucho más eficiente que los radiadores eléctricos.
- Mejora la calificación energética.

## Opciones

| Sistema | Ideal para | Coste orientativo |
|---|---|---|
| Split por estancia | Pisos pequeños o climatizar solo salón y dormitorio | Medio por equipo |
| Multisplit | Varias estancias con una sola unidad exterior | Medio o alto |
| Por conductos | Reformas integrales con falso techo | Alto |

## Antes de instalar

- Consulta los **estatutos de la comunidad** sobre las unidades exteriores en fachada.
- Revisa si la **potencia contratada** es suficiente.
- Elige equipos de clase energética alta.

## En el anuncio

Indica "aire acondicionado con bomba de calor". Es uno de los filtros más usados en los portales.

## Mantenimiento

Limpiar los filtros es tarea del inquilino, como pequeño uso ordinario. Las averías del equipo corren a cargo del propietario.`,
  },
  {
    slug: 'licencia-de-obra-menor-o-mayor-piso',
    title: 'Licencia de obras para reformar un piso: menor, mayor o declaración responsable',
    excerpt: 'Qué trámite necesitas según la reforma, quién lo pide y qué pasa si reformas sin permiso.',
    audience: 'propietarios',
    category: 'Reformas',
    publishedAt: D,
    body: `Casi cualquier reforma necesita un trámite en el ayuntamiento. Lo que cambia es cuál.

## Los tres tipos habituales

| Trámite | Para qué obras | Ejemplos |
|---|---|---|
| Comunicación previa o declaración responsable | Obras sencillas sin estructura | Pintar, cambiar suelo, alicatar, sustituir sanitarios |
| Licencia de obra menor | Obras interiores de cierta entidad | Redistribuir tabiques no portantes, cambiar instalaciones |
| Licencia de obra mayor (con proyecto) | Estructura, fachada o cambio de uso | Tocar vigas o muros de carga, ampliar, unir pisos |

Los nombres y los requisitos **varían según el ayuntamiento**. Consulta su web o la sede electrónica.

## Qué necesitas normalmente

- Descripción de la obra y presupuesto.
- Si la obra es mayor, proyecto firmado por un técnico.
- Pago de la tasa y del ICIO (impuesto de obras).

## La comunidad de propietarios

Si afecta a elementos comunes (fachada, bajantes, estructura), necesitas su autorización.

## Si reformas sin permiso

Te arriesgas a una paralización, una multa y tener que restituir la obra. Además, puede complicarte vender o asegurar el piso.`,
  },
  {
    slug: 'comparar-presupuestos-de-reforma',
    title: 'Cómo comparar presupuestos de reforma y evitar sorpresas',
    excerpt: 'Partidas, mediciones, calidades y forma de pago: la lista para que tres presupuestos sean realmente comparables.',
    audience: 'propietarios',
    category: 'Reformas',
    publishedAt: D,
    body: `Pedir tres presupuestos no sirve de mucho si cada uno incluye cosas distintas.

## Qué debe incluir un buen presupuesto

- **Partidas separadas**: demolición, albañilería, fontanería, electricidad, carpintería, pintura y limpieza.
- **Mediciones**: metros cuadrados y unidades.
- **Calidades concretas**: marca y modelo o rango de precio por metro cuadrado.
- **Plazo** de ejecución y fecha de inicio.
- Gestión de **escombros** y licencias.
- IVA desglosado.

## Cómo compararlos

1. Haz una tabla con las mismas partidas en filas y las empresas en columnas.
2. Marca lo que **no** incluye cada una.
3. Pregunta por las partidas con mucha diferencia de precio.

## Forma de pago razonable

Pagos por **hitos**: un adelanto moderado, pagos por fases terminadas y una parte final tras revisar la obra. Evita pagar casi todo por adelantado.

## Señales de alarma

- Presupuesto "a ojo", sin desglose.
- Precio muy por debajo del resto.
- Pago en efectivo sin factura.
- Sin seguro de responsabilidad civil.

## Contrato

Firma un contrato con plazos, penalizaciones por retraso y garantías. Las facturas te sirven también para el IRPF.`,
  },
  {
    slug: 'cuanto-cuesta-reformar-un-piso-2027',
    title: 'Cuánto cuesta reformar un piso en 2027: rangos orientativos',
    excerpt: 'Del lavado de cara a la reforma integral: precios orientativos por metro cuadrado y qué hace subir o bajar el presupuesto.',
    audience: 'propietarios',
    category: 'Reformas',
    publishedAt: D,
    body: `El precio de una reforma depende de la ciudad, el estado del piso, las calidades y la mano de obra disponible. Estos rangos son **orientativos**.

## Por tipo de reforma

| Tipo | Qué incluye | Rango orientativo |
|---|---|---|
| Lavado de cara | Pintura, iluminación, mecanismos y pequeños arreglos | 2.000–6.000 € |
| Reforma parcial | Cocina o baño más pintura y suelo | 8.000–20.000 € |
| Reforma integral | Distribución, instalaciones, cocina, baños y acabados | 600–1.200 €/m² o más |

## Qué hace subir el presupuesto

- Cambiar la distribución o tocar la estructura.
- Renovar toda la instalación eléctrica y la fontanería.
- Calidades altas en suelos, cocina y baños.
- Una ciudad con mucha demanda de obra.

## Qué lo contiene

- Mantener la distribución.
- Suelos sobre el existente.
- Cocina de gama media con buenos electrodomésticos.

## No olvides

- Licencias, ICIO, escombros y técnico, si hace falta.
- Un **10–15 % de imprevistos**.
- Los meses sin alquilar mientras dura la obra.

Para saber qué reformas compensan más, lee [7 reformas que se pagan solas](/blog/reformas-que-se-pagan-solas-al-alquilar).`,
  },
  {
    slug: 'obras-con-inquilino-dentro-que-dice-la-lau',
    title: 'Obras con el inquilino dentro: qué dice la LAU',
    excerpt: 'Obras de conservación, de mejora y urgentes: avisos, plazos, rebajas de renta y derechos de cada parte.',
    audience: 'propietarios',
    category: 'Reformas',
    publishedAt: D,
    body: `A veces hay que hacer obras con el piso alquilado. La LAU distingue varios casos.

## Obras de conservación (art. 21)

- El propietario debe hacer las **reparaciones necesarias** para mantener la vivienda habitable, salvo los daños que cause el inquilino.
- Si la obra no puede esperar, el inquilino debe permitirla.
- Si dura **más de 20 días**, la renta se reduce en proporción a la parte de la vivienda que no se puede usar.

## Obras de mejora (art. 22)

- Si no pueden esperar al final del contrato, el inquilino debe soportarlas.
- El propietario debe avisar por escrito con **al menos 3 meses** de antelación, indicando la naturaleza, el comienzo, la duración y el coste previsible.
- El inquilino puede **desistir** del contrato en el mes siguiente a la notificación, salvo que las obras no le afecten o le afecten muy poco.
- Tiene derecho a una **reducción de renta** proporcional y a una indemnización por los gastos que le causen.

## Subida de renta por mejoras (art. 19)

A partir de los 5 años de contrato (7 si eres empresa), puedes subir la renta por obras de mejora, con límites legales.

## Consejo

Pacta por escrito el calendario, los horarios, el acceso y la rebaja.`,
  },
  {
    slug: 'que-obras-puede-hacer-el-inquilino',
    title: '¿Qué obras puede hacer un inquilino en el piso?',
    excerpt: 'Pintar, colgar estanterías, cambiar el plato de ducha… Qué está permitido, qué necesita permiso y qué pasa al irte.',
    audience: 'inquilinos',
    category: 'Reformas',
    publishedAt: D,
    body: `Quieres que el piso se sienta tuyo, pero sin problemas al devolver las llaves. Esto dice la LAU.

## Necesitan permiso por escrito (art. 23)

Las obras que **modifican la configuración** de la vivienda o de sus accesorios, o que afectan a su estabilidad o seguridad. Por ejemplo:

- Tirar o levantar tabiques.
- Cambiar el baño o la cocina.
- Cambiar los suelos.

Sin consentimiento, el propietario puede resolver el contrato o exigir que dejes todo como estaba.

## Normalmente no necesitan permiso

- Colgar cuadros y estanterías ligeras, con agujeros razonables.
- Cambiar lámparas.
- Pequeños arreglos por el uso ordinario.

Aun así, **revisa tu contrato**: algunas cláusulas piden avisar incluso para pintar.

## Adaptaciones por discapacidad o edad (art. 24)

Si tú o alguien que vive contigo tiene una discapacidad o es mayor de 70 años, puedes hacer las obras necesarias para adaptar la vivienda, avisando por escrito. Al terminar el contrato, el propietario puede pedir que repongas el estado anterior.

## Consejo

Pide siempre el permiso por escrito, aunque sea por email, y guarda fotos del antes y el después.`,
  },
  {
    slug: 'mini-reformas-en-una-semana',
    title: 'Mini reformas en una semana para alquilar antes',
    excerpt: 'Un plan día a día para renovar tu piso entre inquilinos sin obra mayor y con poco presupuesto.',
    audience: 'propietarios',
    category: 'Reformas',
    publishedAt: D,
    body: `Entre un inquilino y otro hay poco tiempo. Este plan te permite renovar el piso en una semana.

## Plan de 7 días

| Día | Tarea |
|---|---|
| 1 | Limpieza a fondo y lista de desperfectos con fotos |
| 2 | Reparaciones: grifos, cisternas, persianas, puertas y silicona del baño |
| 3 | Pintura de techos y paredes (un solo color) |
| 4 | Segunda mano de pintura y cambio de mecanismos |
| 5 | Iluminación LED y lámparas sencillas |
| 6 | Textiles neutros, espejo grande y orden |
| 7 | Limpieza final y fotos con luz de día |

## Lista de compra básica

- Pintura blanca o neutra lavable.
- Silicona antimoho.
- Bombillas LED de luz cálida.
- Tiradores para la cocina.
- Cortina de ducha o mampara sencilla.
- Burletes para puertas y ventanas.

## Resultado

Un piso que parece "a estrenar" en las fotos y que se alquila antes. Mira también [home staging de bajo coste](/blog/home-staging-low-cost-para-alquilar).`,
  },
  {
    slug: 'reformar-piso-heredado-para-alquilar',
    title: 'Has heredado un piso antiguo: cómo reformarlo para alquilarlo',
    excerpt: 'Prioridades, presupuesto y trámites para convertir un piso de los de antes en una vivienda que se alquile bien.',
    audience: 'propietarios',
    category: 'Reformas',
    publishedAt: D,
    body: `Muchos pisos heredados llevan décadas sin reformas. Alquilarlos así es difícil y arriesga averías.

## Antes de reformar

1. Termina los trámites de la herencia y cambia la titularidad en el Catastro y en los suministros.
2. Vacía el piso: dona, vende o recicla.
3. Pide a un técnico o a una empresa de confianza una **revisión del estado**.

## Orden de prioridades

1. **Seguridad**: electricidad, gas y fontanería.
2. **Humedades** y cubierta: arréglalas antes que lo estético.
3. **Baño y cocina** funcionales.
4. **Ventanas** y confort térmico.
5. **Estética**: suelos, pintura e iluminación.

## Presupuesto

Puedes hacerlo por fases. Si el piso es habitable, empieza con un lavado de cara y deja la reforma integral para más adelante.

## Fiscalidad

- Las **reparaciones** se deducen en el IRPF como gasto del año.
- Las **mejoras** se amortizan al 3 % anual.

Consulta [cómo deducir la reforma en la renta](/blog/deducir-reforma-piso-alquilado-en-la-renta).`,
  },
  {
    slug: 'pequenas-reformas-de-accesibilidad',
    title: 'Pequeñas reformas de accesibilidad que amplían tu público',
    excerpt: 'Platos de ducha a ras, asideros, iluminación y puertas: mejoras que facilitan la vida a personas mayores y con movilidad reducida.',
    audience: 'propietarios',
    category: 'Reformas',
    publishedAt: D,
    body: `Un piso accesible es más cómodo para todo el mundo y amplía el número de inquilinos interesados.

## Mejoras sencillas

- **Plato de ducha a ras de suelo** con mampara corredera.
- **Asideros** en la ducha y junto al inodoro.
- **Suelo antideslizante** en el baño.
- **Iluminación** con detectores de presencia en el pasillo.
- **Manillas** en lugar de pomos.
- **Grifería** monomando o termostática.

## Mejoras de mayor alcance

- Ensanchar puertas a unos 80 cm de paso.
- Eliminar escalones interiores.
- Rampas en los accesos, gestionadas con la comunidad.

## Ayudas

Muchas comunidades y ayuntamientos tienen ayudas para obras de accesibilidad. En los edificios, la comunidad de propietarios puede estar obligada a hacer ciertos ajustes razonables.

## En el anuncio

Indica "baño adaptado" o "ducha a ras de suelo". Son filtros que buscan muchas familias con mayores a su cargo.`,
  },
  {
    slug: 'deducir-reforma-piso-alquilado-en-la-renta',
    title: 'Reforma de un piso alquilado: qué se deduce en la renta y cómo',
    excerpt: 'Reparación o mejora: la diferencia que cambia cuánto te deduces cada año. Con ejemplos.',
    audience: 'propietarios',
    category: 'Reformas',
    publishedAt: D,
    body: `En el IRPF, lo que gastas en tu piso alquilado se trata de forma distinta según sea una **reparación** o una **mejora**.

## Reparación y conservación

- Mantener el piso como estaba: pintura, arreglar una avería, cambiar una pieza estropeada por otra similar.
- Se deduce como **gasto del año**.
- Tiene un límite conjunto con los intereses: no puede superar los ingresos del alquiler. El exceso se aplica en los **4 años siguientes**.

## Mejora

- Aumenta la capacidad o el valor del piso: cocina nueva de calidad superior, cambio de distribución, ascensor…
- No se deduce de golpe: se **amortiza al 3 % anual**.

## Muebles y electrodomésticos

Se amortizan normalmente al **10 % anual**.

## Ejemplo

| Gasto | Tipo | Deducción el primer año |
|---|---|---|
| Pintura: 1.500 € | Reparación | 1.500 € |
| Cocina nueva: 8.000 € | Mejora | 240 € (3 %) |
| Frigorífico: 600 € | Mobiliario | 60 € (10 %) |

## Requisitos

- **Factura** a tu nombre con NIF.
- Pago por un medio trazable.

Consulta tu caso concreto con un asesor fiscal.`,
  },
  {
    slug: 'humedades-y-condensacion-en-el-piso',
    title: 'Humedades y condensación en el piso: causas y quién las arregla',
    excerpt: 'Moho en las paredes, cristales empañados y manchas: cómo distinguir una filtración de la condensación y quién debe pagar.',
    audience: 'inquilinos',
    category: 'Reformas',
    publishedAt: D,
    body: `Las humedades son una de las causas más frecuentes de conflicto en el alquiler. Lo primero es saber **de dónde vienen**.

## Tipos de humedad

| Tipo | Señales | Quién suele arreglarla |
|---|---|---|
| Condensación | Cristales empañados, moho en esquinas, peor en invierno | Mejoras de ventilación. Si el origen es constructivo, el propietario |
| Filtración | Manchas tras la lluvia, cerca de fachada o cubierta | Propietario o comunidad |
| Capilaridad | Manchas en la parte baja de las paredes de bajos | Propietario o comunidad |
| Fuga de tubería | Mancha que crece, a veces en el techo | El responsable de esa tubería |

## Para reducir la condensación

- Ventila **10 minutos al día**, también en invierno.
- Usa el extractor y la tapa al cocinar.
- No tiendas la ropa dentro sin ventilar.
- Mantén una temperatura estable.

## Si es una filtración o una avería

1. Haz fotos con fecha.
2. Avisa al propietario **por escrito**.
3. Si no responde, envía un burofax y consulta la oficina de vivienda o de consumo.

Más información en [qué hacer si el casero no hace reparaciones](/blog/casero-no-hace-reparaciones-que-hacer).`,
  },
  {
    slug: 'electrodomesticos-para-piso-de-alquiler',
    title: 'Qué electrodomésticos poner en un piso de alquiler',
    excerpt: 'Los imprescindibles, los que suman y cómo elegirlos para que duren y no disparen la factura del inquilino.',
    audience: 'propietarios',
    category: 'Reformas',
    publishedAt: D,
    body: `Un piso con cocina equipada se alquila antes. Pero cada electrodoméstico que pones es uno más que puede averiarse.

## Imprescindibles

- Frigorífico combi.
- Placa de inducción o vitrocerámica.
- Horno o microondas con grill.
- Lavadora.
- Termo o caldera.

## Suman puntos

- Lavavajillas, muy valorado por familias y personas que comparten piso.
- Campana extractora eficaz.
- Secadora o lavadora-secadora en pisos sin tendedero.

## Cómo elegirlos

- **Etiqueta energética** alta: el inquilino paga la factura y lo valora.
- **Marcas con servicio técnico** cercano.
- Modelos estándar de medidas comunes, fáciles de sustituir.
- Guarda **facturas y garantías** en una carpeta compartida.

## Quién paga las averías

- **Avería por desgaste normal**: el propietario.
- **Daño por mal uso**: el inquilino.
- **Mantenimiento de pequeño uso** (filtros, limpieza): el inquilino.

Inclúyelo en el **inventario** del contrato con la marca y el estado.`,
  },
  {
    slug: 'iluminacion-led-y-puntos-de-luz',
    title: 'Iluminación LED y puntos de luz: el truco barato que cambia tu piso',
    excerpt: 'Temperatura de color, lúmenes y dónde colocar la luz para que el piso parezca más grande y acogedor.',
    audience: 'propietarios',
    category: 'Reformas',
    publishedAt: D,
    body: `Mucha gente decide en las fotos. Y las fotos dependen de la luz.

## Temperatura de color

| Estancia | Temperatura | Sensación |
|---|---|---|
| Salón y dormitorios | 2.700–3.000 K | Cálida, acogedora |
| Cocina y baño | 3.500–4.000 K | Neutra, práctica |
| Zonas de trabajo | 4.000 K | Concentración |

Evita la luz muy fría (más de 5.000 K) en las zonas de estar.

## Cantidad de luz

Como referencia, un salón necesita alrededor de **100–150 lúmenes por m²**. Mejor varios puntos de luz que una sola lámpara central.

## Ideas sencillas

- Tira LED bajo los muebles altos de la cocina.
- Aplique o espejo con luz en el baño.
- Lámparas de techo sencillas y fáciles de limpiar.
- Bombillas iguales en todo el piso, para que la luz sea uniforme en las fotos.

## Ventajas para el inquilino

Las LED consumen hasta un 80–90 % menos que las incandescentes y duran años. Menos factura y menos avisos por bombillas fundidas.`,
  },
  {
    slug: 'renovar-puertas-y-armarios-sin-cambiarlos',
    title: 'Renovar puertas y armarios sin cambiarlos',
    excerpt: 'Lacar, cambiar manillas y forrar interiores: cómo modernizar la carpintería por una fracción de lo que cuesta sustituirla.',
    audience: 'propietarios',
    category: 'Reformas',
    publishedAt: D,
    body: `Las puertas de sapelli o de pino oscuro hacen que un piso parezca antiguo. Cambiarlas es caro; renovarlas, no tanto.

## Opciones

| Opción | Resultado | Coste relativo |
|---|---|---|
| Lacar en blanco | Muy moderno y luminoso | Medio |
| Pintar con esmalte al agua | Bueno si se prepara bien | Bajo |
| Vinilo para puertas | Rápido, resultado variable | Bajo |
| Cambiar solo las manillas | Detalle actual | Muy bajo |

## Armarios empotrados

- Lacar los frentes igual que las puertas.
- Forrar el interior, poner barra y baldas, e iluminación LED con sensor.
- Tiradores modernos y discretos.

## Consejos

- Lija y pon imprimación antes de pintar para que la pintura no salte.
- Elige **un mismo acabado** para todas las puertas.
- Ajusta las bisagras y los cierres: una puerta que roza da mala impresión en la visita.`,
  },
  {
    slug: 'cambiar-cerradura-al-cambiar-de-inquilino',
    title: 'Cambiar la cerradura al cambiar de inquilino: seguridad y costes',
    excerpt: 'Por qué conviene cambiar el bombín entre inquilinos, qué tipos hay y cómo gestionar las copias de llaves.',
    audience: 'propietarios',
    category: 'Reformas',
    publishedAt: D,
    body: `Nunca sabes cuántas copias de llaves hizo el inquilino anterior. Cambiar el **bombín** es barato y evita problemas.

## Qué cambiar

- **Bombín**: la pieza donde entra la llave. Se sustituye en minutos.
- **Cerradura completa**: solo si está dañada o es muy antigua.

## Tipos de bombín

| Tipo | Ventaja |
|---|---|
| Bombín estándar | Económico |
| Antibumping y antiganzúa | Más resistente a aperturas sin llave |
| De llave con tarjeta de copia | Solo se copian las llaves con la tarjeta |

## Gestión de llaves

- Anota en el contrato o en el inventario **cuántas llaves** entregas (portal, piso, buzón, trastero, garaje).
- Pide que se devuelvan todas al terminar el contrato.
- Guarda una copia en un lugar seguro. Recuerda que no puedes entrar en el piso sin permiso del inquilino.

## Puerta acorazada o blindada

Mejora la seguridad y el aislamiento acústico. Muchas compañías de seguros la valoran.`,
  },
  {
    slug: 'revisiones-obligatorias-gas-caldera-alquiler',
    title: 'Caldera y gas: revisiones obligatorias en un piso de alquiler',
    excerpt: 'Inspección periódica, mantenimiento de la caldera y quién paga cada cosa entre propietario e inquilino.',
    audience: 'propietarios',
    category: 'Reformas',
    publishedAt: D,
    body: `Las instalaciones de gas y las calderas tienen **revisiones obligatorias**. No hacerlas es un riesgo para la seguridad y puede darte problemas con el seguro.

## Dos cosas distintas

| Revisión | Qué es | Frecuencia habitual |
|---|---|---|
| Inspección periódica de la instalación de gas | La gestiona la distribuidora con un técnico autorizado | Cada 5 años |
| Mantenimiento de la caldera | Revisión del equipo por un técnico habilitado | Según la normativa (RITE) y el fabricante, normalmente periódica |

Las frecuencias concretas dependen del tipo de equipo y de la normativa autonómica.

## Quién paga

- **Inspección de la instalación**: suele cobrarse en la factura del titular del suministro. Conviene pactarlo en el contrato.
- **Mantenimiento ordinario de la caldera**: se considera pequeño uso y suele asumirlo el inquilino, si así se pacta.
- **Avería o sustitución por desgaste**: el propietario.

## Cuidado con los fraudes

Las compañías avisan con antelación y los técnicos van identificados. Desconfía de visitas sin aviso que exigen pago en el momento.

## Recomendación

Recoge en el contrato quién gestiona y paga cada revisión, y guarda los certificados.`,
  },
  {
    slug: 'mantenimiento-anual-piso-alquilado-checklist',
    title: 'Mantenimiento anual del piso alquilado: checklist para propietarios',
    excerpt: 'Una revisión al año evita averías caras. Lo que conviene comprobar y cómo coordinarlo con el inquilino.',
    audience: 'propietarios',
    category: 'Reformas',
    publishedAt: D,
    body: `Revisar el piso una vez al año, siempre con el **acuerdo del inquilino**, evita que un pequeño problema se convierta en una gran avería.

## Checklist

**Agua**
- [ ] Grifos sin goteos
- [ ] Silicona de la ducha y el fregadero en buen estado
- [ ] Desagües sin atascos ni malos olores
- [ ] Llaves de paso que funcionan

**Electricidad**
- [ ] Diferencial: pulsa el botón de prueba
- [ ] Enchufes y mecanismos firmes

**Clima**
- [ ] Caldera y aire acondicionado revisados
- [ ] Filtros limpios

**Carpintería**
- [ ] Persianas y cintas
- [ ] Ventanas que cierran bien
- [ ] Puertas que no rozan

**Humedades**
- [ ] Manchas en techos y esquinas

## Cómo hacerlo bien

- Propón la visita **con antelación** y por escrito.
- Recuerda que no puedes entrar sin permiso: la vivienda es el domicilio del inquilino.
- Aprovecha para preguntar si hay algo que no funciona.

## Presupuesto

Reserva cada año en torno a un **5–10 % de la renta anual** para mantenimiento.`,
  },
]
