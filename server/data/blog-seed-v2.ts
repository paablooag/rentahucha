import type { BlogPost } from '#shared/utils/blog'

// Segunda tanda de artículos (versión 2 del contenido inicial): 10 para propietarios y 10 para inquilinos.
// Normativa citada: LAU (Ley 29/1994), Ley 12/2023 por el derecho a la vivienda y Ley del IRPF. Las cuantías de
// ayudas, impuestos e índices cambian por año y comunidad: se remite siempre a la fuente oficial.

type Seed = Omit<BlogPost, 'updatedAt' | 'published'>
const D = '2026-10-15'

export const BLOG_SEED_V2: Seed[] = [
  // ───────────── Propietarios ─────────────
  {
    slug: 'como-calcular-la-renta-de-tu-piso',
    title: 'Cómo calcular cuánto pedir por el alquiler de tu piso',
    excerpt: 'Precio por metro cuadrado, comparables y ajustes por estado y extras: un método sencillo para fijar una renta que se alquile rápido.',
    audience: 'propietarios',
    category: 'Rentabilidad',
    publishedAt: D,
    body: `Pedir de más alarga el tiempo vacío; pedir de menos te hace perder dinero cada mes durante años. Este es un método práctico para acertar.

## 1. Busca comparables reales

Mira en los portales pisos **en tu misma zona**, con superficie y habitaciones parecidas. Apunta al menos 8–10 y calcula el precio por metro cuadrado de cada uno.

## 2. Calcula tu punto de partida

| Superficie | 10 €/m² | 12 €/m² | 14 €/m² |
|---|---|---|---|
| 50 m² | 500 € | 600 € | 700 € |
| 70 m² | 700 € | 840 € | 980 € |
| 90 m² | 900 € | 1.080 € | 1.260 € |

## 3. Ajusta por lo que tiene tu piso

| Factor | Ajuste orientativo |
|---|---|
| Reformado recientemente | Al alza |
| Amueblado y equipado | Al alza |
| Ascensor (a partir de un 2.º piso) | Al alza |
| Terraza, garaje o trastero | Al alza |
| Bajo interior o sin luz | A la baja |
| Necesita reforma | A la baja |

## 4. Ojo con las zonas tensionadas

Si tu municipio está declarado **zona de mercado residencial tensionado** (Ley 12/2023), puede haber límites a la renta de los nuevos contratos. Consulta si tu zona lo está antes de fijar el precio.

## 5. Mide la respuesta

Si en dos semanas no recibes contactos de calidad, el precio probablemente está por encima del mercado. Un mes vacío de un piso de 850 € equivale a bajar 70 € al mes durante un año.`,
  },
  {
    slug: 'como-declarar-el-alquiler-en-la-renta',
    title: 'Cómo declarar el alquiler en la renta: gastos deducibles y reducciones',
    excerpt: 'Qué gastos puedes restar, cómo funciona la amortización y qué reducción aplicar al alquiler de vivienda según la Ley 12/2023.',
    audience: 'propietarios',
    category: 'Fiscalidad',
    publishedAt: D,
    body: `Las rentas de alquiler tributan en el IRPF como **rendimientos del capital inmobiliario**. Lo que pagas no se calcula sobre lo que cobras, sino sobre el rendimiento neto.

## Gastos que puedes restar

| Gasto | Deducible |
|---|---|
| IBI y tasas municipales (basuras) | Sí |
| Cuotas de comunidad | Sí |
| Seguro del hogar y de impago | Sí |
| Intereses de la hipoteca | Sí, con límite junto con reparaciones |
| Reparaciones y conservación | Sí, con límite junto con intereses |
| Gestión del alquiler | Sí |
| Amortización del inmueble | Sí, un 3 % anual del valor de la construcción |
| Amortización de muebles | Sí |

Los intereses y las reparaciones no pueden superar, en conjunto, los ingresos del año (el exceso se puede aplicar en los cuatro siguientes).

## La reducción por alquiler de vivienda

Si el piso es vivienda habitual del inquilino, el rendimiento neto positivo tiene una reducción. El porcentaje depende de **cuándo firmaste el contrato**:

| Fecha de firma | Reducción |
|---|---|
| Antes del 26 de mayo de 2023 | 60 % |
| Del 26 de mayo de 2023 al 1 de diciembre de 2026 | Del 50 % al 90 % según el caso (Ley 12/2023): 50 % en general, 60 % si se rehabilitó, 70 % en algunos casos de zona tensionada o jóvenes y 90 % en zona tensionada bajando la renta más de un 5 % |
| Después del 1 de diciembre de 2026 | Del 15 % al 100 % según si bajas, mantienes o subes la renta (Real Decreto-ley 29/2026, pendiente de convalidación) |

Calcula tu caso con la [calculadora de la reducción del IRPF](/herramientas/reduccion-irpf-alquiler). El nuevo régimen lo explicamos con tablas y ejemplos en [la reducción del IRPF por alquilar desde diciembre de 2026](/blog/reduccion-irpf-alquiler-vivienda-2027-hasta-100). Comprueba tu caso en la web de la Agencia Tributaria o con un asesor.

## Un ejemplo sencillo

| Concepto | Importe anual |
|---|---|
| Rentas cobradas (850 €/mes) | 10.200 € |
| Gastos deducibles (IBI, comunidad, seguro, amortización…) | −3.200 € |
| Rendimiento neto | 7.000 € |
| Reducción del 50 % (contrato de 2024, caso general) | −3.500 € |
| **Rendimiento a integrar en la base** | **3.500 €** |

Guarda todas las facturas: si Hacienda revisa la declaración, te pedirá justificar cada gasto.`,
  },
  {
    slug: 'inventario-y-fotos-al-entregar-las-llaves',
    title: 'Inventario y fotos al entregar las llaves: cómo evitar discusiones',
    excerpt: 'Un buen inventario firmado y fechado es la mejor prueba para recuperar desperfectos o devolver la fianza sin discusiones.',
    audience: 'propietarios',
    category: 'Gestión',
    publishedAt: D,
    body: `La mayoría de los conflictos al final de un alquiler se deben a que nadie puede demostrar cómo estaba el piso al principio. Se evita con media hora de trabajo el día de la entrega.

## Qué incluir

| Estancia | Qué revisar |
|---|---|
| Entrada y salón | Paredes, suelo, puertas, ventanas, persianas |
| Cocina | Electrodomésticos (marca y modelo), encimera, grifos, armarios |
| Baños | Sanitarios, grifería, mampara, juntas, extractor |
| Dormitorios | Armarios, suelo, paredes, ventanas |
| Instalaciones | Caldera, termo, aire acondicionado, cuadro eléctrico |
| Mobiliario | Lista de muebles con su estado |
| Contadores | Lectura de luz, agua y gas |
| Llaves | Número de juegos y mandos entregados |

## Cómo hacerlo bien

1. **Fotos y vídeo con fecha**, de cada estancia y de los detalles que ya tengan desgaste.
2. **Firma de ambas partes** en cada hoja del inventario.
3. **Anexo al contrato:** que forme parte del contrato y no sea un papel suelto.
4. **Copia para cada uno**, en papel o por correo.

## Al terminar el contrato

Repite la revisión con el inquilino presente y compara con el inventario inicial. El desgaste por el uso normal no se puede descontar de la fianza; los desperfectos que vayan más allá, sí, siempre que se puedan justificar.

## Con nosotros

Hacemos el inventario con fotos en la entrega y lo dejamos firmado digitalmente por las dos partes.`,
  },
  {
    slug: 'reparaciones-quien-paga-propietario-o-inquilino',
    title: 'Reparaciones: qué paga el propietario y qué paga el inquilino',
    excerpt: 'La ley distingue entre conservar la vivienda y las pequeñas reparaciones del día a día. Te explicamos el reparto con ejemplos.',
    audience: 'propietarios',
    category: 'Legal',
    publishedAt: D,
    body: `Es la duda más repetida durante un alquiler. La Ley de Arrendamientos Urbanos (art. 21) da un criterio claro.

## La regla general

- **El propietario** debe hacer las reparaciones necesarias para conservar la vivienda en condiciones de habitabilidad.
- **El inquilino** paga las pequeñas reparaciones causadas por el desgaste del uso ordinario.
- Si el daño lo causa el inquilino por mal uso, lo paga él.

## Ejemplos habituales

| Avería | Normalmente paga |
|---|---|
| Caldera averiada por antigüedad | Propietario |
| Filtración o humedad estructural | Propietario |
| Instalación eléctrica deficiente | Propietario |
| Electrodoméstico que se estropea por el uso normal y los años | Propietario |
| Bombillas, pilas, juntas de un grifo | Inquilino |
| Desatascar un desagüe por mal uso | Inquilino |
| Persiana rota por un golpe | Inquilino |

## Cómo comunicarlo

El inquilino debe avisar cuanto antes de cualquier avería que tenga que reparar el propietario. Si es urgente para evitar un daño mayor, puede hacerla él y reclamar después su importe.

## Buenas prácticas

- Deja por escrito en el contrato a quién llamar en cada caso.
- Pide siempre fotos y factura de cada reparación.
- Revisa la caldera y el termo de forma periódica: la mayoría de las averías caras se avisan antes.

Con nuestra plataforma, el inquilino reporta la incidencia con fotos desde la app y queda registro de todo el proceso.`,
  },
  {
    slug: 'ibi-comunidad-y-suministros-quien-los-paga',
    title: 'IBI, comunidad y suministros: quién paga cada gasto del alquiler',
    excerpt: 'Qué gastos puedes repercutir al inquilino, cómo dejarlo en el contrato y qué ocurre con los suministros.',
    audience: 'propietarios',
    category: 'Legal',
    publishedAt: D,
    body: `Además de la renta, un piso tiene gastos fijos. La ley permite repartirlos, pero con condiciones.

## Gastos generales (IBI y comunidad)

Según el artículo 20 de la LAU, se puede pactar que el inquilino pague el IBI o la cuota de comunidad, siempre que:

- Conste **por escrito en el contrato**.
- Se indique el **importe anual** de esos gastos en el momento de firmar.

Si no está pactado así, los paga el propietario.

## Suministros

| Gasto | Quién paga |
|---|---|
| Luz, agua y gas con contador propio | Inquilino, según consumo |
| Internet y teléfono | Quien los contrate, normalmente el inquilino |
| Suministros sin contador individual | Lo que se pacte en el contrato |

## Lo que no se puede repercutir

Desde la Ley 12/2023, los **gastos de gestión inmobiliaria y de formalización del contrato** son siempre del propietario.

## Ejemplo de cálculo

| Gasto anual | Importe | Al mes |
|---|---|---|
| IBI | 420 € | 35 € |
| Comunidad | 720 € | 60 € |
| **Total** | **1.140 €** | **95 €** |

Si los repercutes, deja claro en el contrato cómo y cuándo se pagan (por ejemplo, junto con la renta mensual).`,
  },
  {
    slug: 'actualizacion-de-la-renta-cuanto-puedes-subir',
    title: 'Actualización de la renta: cuánto puedes subir el alquiler',
    excerpt: 'Solo se actualiza si el contrato lo dice, una vez al año y con un índice de referencia. Esto es lo que tienes que saber.',
    audience: 'propietarios',
    category: 'Legal',
    publishedAt: D,
    body: `Subir la renta no es libre durante el contrato. Hay tres reglas básicas.

## 1. Tiene que estar en el contrato

Si el contrato no prevé la actualización, la renta no se puede actualizar mientras dure. Revisa la cláusula antes de pedir ninguna subida.

## 2. Una vez al año

La actualización se aplica en la fecha en que se cumple cada año de contrato, y hay que notificarla al inquilino por escrito indicando el cálculo.

## 3. Con un índice de referencia

Desde 2025, el INE publica cada mes un índice específico para la actualización de los alquileres de vivienda (**IRAV**), que funciona como límite en muchos contratos. Antes de aplicar cualquier subida, consulta el último valor publicado y lo que dice tu contrato.

## Ejemplo

| Renta actual | Si el índice aplicable es 2 % | Si es 3 % |
|---|---|---|
| 600 € | 612 € | 618 € |
| 850 € | 867 € | 875,50 € |
| 1.200 € | 1.224 € | 1.236 € |

## Al renovar con otro inquilino

Con un contrato nuevo, la renta se fija de nuevo, salvo en **zonas tensionadas**, donde la Ley 12/2023 puede limitarla. Comprueba la situación de tu municipio.

## Consejo

Una subida moderada que mantiene a un buen inquilino suele ser más rentable que una grande que te deja el piso vacío un mes.`,
  },
  {
    slug: 'alquilar-a-estudiantes',
    title: 'Alquilar a estudiantes: ventajas, riesgos y tipo de contrato',
    excerpt: 'Demanda alta en ciudades universitarias, contratos de curso completo y cómo protegerte si el inquilino no tiene ingresos propios.',
    audience: 'propietarios',
    category: 'Selección',
    publishedAt: D,
    body: `En ciudades con universidad, los estudiantes son una demanda estable cada septiembre. Bien planteado, es un alquiler cómodo.

## Ventajas

- Demanda muy alta antes de cada curso.
- Fechas previsibles: de septiembre a junio o julio.
- Suelen cuidar el piso si hay normas claras y fianza.

## Riesgos y cómo cubrirlos

| Riesgo | Cómo cubrirlo |
|---|---|
| No tiene ingresos propios | Aval de los padres o garantía adicional |
| Rotación cada año | Contrato de temporada por curso completo |
| Desgaste del mobiliario | Inventario detallado con fotos |
| Gastos de suministros altos | Suministros a nombre de los inquilinos o con límite pactado |

## Qué contrato usar

Si vienen solo para el curso y mantienen su residencia familiar, encaja un **contrato de temporada** que indique el motivo (estudios) y las fechas. Con el decreto de octubre de 2026, la temporada pasa a ser «vivienda temporal»: garantía adicional de una mensualidad como máximo y la causa por escrito. Detalle en [el alquiler de temporada con el decreto](/blog/alquiler-de-temporada-nuevas-reglas-12-meses).

## Varios estudiantes en el mismo piso

- Que todos firmen el contrato, con responsabilidad solidaria.
- Un único pago mensual, aunque se repartan entre ellos.
- Normas de convivencia básicas como anexo.

## Con nosotros

Verificamos tanto al estudiante como, si hace falta, a su avalista, y la hucha empieza a cubrir desde el primer mes.`,
  },
  {
    slug: 'cuanto-cuesta-tener-un-piso-vacio',
    title: 'Cuánto te cuesta tener un piso vacío (aunque no lo uses)',
    excerpt: 'IBI, comunidad, seguro, suministros mínimos e IRPF: los costes de un piso sin alquilar que muchos propietarios no cuentan.',
    audience: 'propietarios',
    category: 'Rentabilidad',
    publishedAt: D,
    body: `Un piso vacío no es gratis. Sigue generando gastos y, además, renuncias a la renta.

## Gastos que siguen corriendo

| Gasto anual (ejemplo) | Importe |
|---|---|
| IBI | 420 € |
| Comunidad | 720 € |
| Seguro del hogar | 180 € |
| Suministros mínimos (potencia contratada, mantenimiento) | 240 € |
| **Total** | **1.560 €** |

## Lo que dejas de ganar

| Renta de mercado | Un año vacío |
|---|---|
| 600 € | 7.200 € |
| 850 € | 10.200 € |
| 1.200 € | 14.400 € |

## Y Hacienda también cuenta

Los inmuebles que no son tu vivienda habitual y no están alquilados generan una **imputación de rentas** en el IRPF (un porcentaje del valor catastral), aunque no cobres nada.

## El recargo de algunos ayuntamientos

Los ayuntamientos pueden aplicar un **recargo en el IBI** a las viviendas vacías más de dos años sin causa justificada (y, en zona tensionada, aunque tengas una sola). Te lo explicamos en [el recargo del IBI por piso vacío](/blog/pisos-vacios-recargo-ibi-decreto).

## Por qué muchos no alquilan

El motivo más común es el miedo al impago. Por eso proponemos inquilinos verificados y una hucha que, si hay un impago, pasa al propietario: para que el piso vacío deje de ser la opción «segura».`,
  },
  {
    slug: 'clausulas-clave-del-contrato-de-alquiler',
    title: 'Las cláusulas clave de un buen contrato de alquiler',
    excerpt: 'Lo que no puede faltar en el contrato para evitar problemas: duración, renta, actualización, garantías, gastos y más.',
    audience: 'propietarios',
    category: 'Legal',
    publishedAt: D,
    body: `Un buen contrato evita la mayoría de los conflictos antes de que empiecen. Estos son los puntos que siempre revisamos.

## Checklist del contrato

| Cláusula | Qué dejar claro |
|---|---|
| Partes | Datos completos de propietario e inquilinos |
| Vivienda | Dirección, referencia catastral y anejos (garaje, trastero) |
| Duración | Fecha de inicio, duración inicial y tipo de contrato |
| Renta | Importe, día de pago y forma (domiciliación) |
| Actualización | Si se actualiza y con qué índice |
| Fianza y garantías | Importes y forma de cada una |
| Gastos | IBI, comunidad y suministros: quién paga y cuánto |
| Obras | Que el inquilino no pueda hacer obras sin permiso escrito |
| Mascotas | Si se permiten y con qué condiciones |
| Desistimiento | Indemnización si el inquilino se va antes (si se pacta) |
| Necesidad del piso | Si vas a necesitarlo para ti o un familiar |
| Inventario | Como anexo firmado |
| Notificaciones | Correo electrónico válido para comunicaciones |

## Errores frecuentes

- Usar un modelo antiguo que no recoge los cambios de la Ley 12/2023.
- No identificar el tipo de contrato (vivienda habitual o temporada).
- Pactar garantías por encima del límite legal.
- Cláusulas genéricas sobre gastos sin importe anual.

## Firma electrónica

La firma electrónica tiene plena validez legal y deja registro de quién firmó y cuándo. Es más rápida y evita perder papeles.

## Con nosotros

Usamos contratos revisados por abogados, adaptados a tu caso y firmados electrónicamente por todas las partes.`,
  },
  {
    slug: 'documentos-obligatorios-para-alquilar-un-piso',
    title: 'Documentos obligatorios para alquilar un piso',
    excerpt: 'Certificado energético, cédula de habitabilidad, depósito de la fianza y más: lo que necesitas tener antes de anunciar tu piso.',
    audience: 'propietarios',
    category: 'Legal',
    publishedAt: D,
    body: `Antes de anunciar el piso conviene tener al día la documentación. Algunas obligaciones son nacionales y otras dependen de tu comunidad autónoma.

## Lista básica

| Documento | Para qué | Dónde |
|---|---|---|
| Certificado de eficiencia energética | Obligatorio para alquilar y su calificación debe aparecer en el anuncio | Lo emite un técnico y se registra en la comunidad |
| Cédula de habitabilidad o equivalente | Acredita que la vivienda es apta (según comunidad) | Organismo autonómico |
| Nota simple o escritura | Acredita la titularidad | Registro de la Propiedad |
| Último recibo del IBI | Referencia catastral y gastos | Ayuntamiento |
| Contrato | Regula la relación | Firmado por las partes |
| Justificante del depósito de la fianza | Obligación legal en la mayoría de comunidades | Organismo de vivienda autonómico |

## El certificado energético

- Lo emite un técnico competente tras visitar el piso.
- Tiene una validez general de **10 años**.
- La **etiqueta** debe figurar en el anuncio del alquiler.
- No tenerlo puede acarrear sanciones.

## El depósito de la fianza

En la mayoría de comunidades hay que depositar la fianza en un organismo público en un plazo determinado tras firmar. Consulta el plazo y el procedimiento de tu comunidad.

## Con nosotros

Te decimos qué documentos necesitas según tu comunidad y nos encargamos del depósito de la fianza.`,
  },

  // ───────────── Inquilinos ─────────────
  {
    slug: 'cuanto-alquiler-te-puedes-permitir',
    title: 'Cuánto alquiler te puedes permitir según tu sueldo',
    excerpt: 'La regla del 30–35 %, una tabla por ingresos y por qué conviene dejar margen para ahorrar.',
    audience: 'inquilinos',
    category: 'Entrar a vivir',
    publishedAt: D,
    body: `La pregunta antes de buscar piso es cuánto puedes pagar sin ahogarte. Una regla prudente es que el alquiler no supere el **30–35 % de tus ingresos netos**.

> Calcúlalo con tus números en la [calculadora de alquiler según tu sueldo](/herramientas/cuanto-alquiler-puedo-pagar).

## Tabla rápida

| Ingresos netos al mes | Alquiler al 30 % | Alquiler al 35 % |
|---|---|---|
| 1.200 € | 360 € | 420 € |
| 1.500 € | 450 € | 525 € |
| 1.800 € | 540 € | 630 € |
| 2.200 € | 660 € | 770 € |
| 2.600 € | 780 € | 910 € |
| 3.000 € | 900 € | 1.050 € |

Si compartís piso o vivís en pareja, suma los ingresos de todos.

## No te olvides de los otros gastos

| Gasto mensual típico | Orientativo |
|---|---|
| Luz y gas | 50–90 € |
| Agua | 15–30 € |
| Internet | 25–40 € |
| Seguro de hogar (contenido) | 8–15 € |

## Por qué dejar margen

Con un alquiler que se come la mitad del sueldo, cualquier imprevisto se convierte en un retraso. Un margen te permite ahorrar y te da tranquilidad.

## Y si estás justo

Los propietarios también miran ese porcentaje. Si estás en el límite, un historial de pagos puntuales y una garantía que se forma mes a mes, como nuestra hucha, pueden inclinar la balanza a tu favor.`,
  },
  {
    slug: 'documentos-para-alquilar-un-piso-inquilino',
    title: 'Qué documentos preparar para alquilar un piso',
    excerpt: 'La lista según seas asalariado, autónomo o estudiante, para responder rápido cuando encuentres el piso que te gusta.',
    audience: 'inquilinos',
    category: 'Entrar a vivir',
    publishedAt: D,
    body: `Los buenos pisos vuelan. Tener los papeles preparados te hace ganar días frente a otros candidatos.

## Según tu situación

| Documento | Asalariado | Autónomo | Estudiante |
|---|---|---|---|
| DNI o NIE | Sí | Sí | Sí |
| Últimas nóminas (2–3) | Sí | — | Si trabaja |
| Contrato de trabajo | Sí | — | Si trabaja |
| Informe de vida laboral | Recomendable | Sí | Opcional |
| Última declaración de la renta | Recomendable | Sí | — |
| Declaraciones trimestrales (IVA e IRPF) | — | Sí | — |
| Matrícula o carta de admisión | — | — | Sí |
| Datos del avalista | Si se pide | Si se pide | Normalmente |

## Consejos

- Prepara todo en **PDF** en una carpeta, listo para enviar.
- Tapa los datos que no hagan falta (por ejemplo, el número de cuenta en las nóminas).
- Envía solo a propietarios o agencias identificados, nunca a anuncios sospechosos.

## Ojo con las estafas

Desconfía si te piden pagar una reserva antes de ver el piso, si el precio es demasiado bajo para la zona o si el «propietario» está siempre en el extranjero.

## Con nosotros

Verificas tus ingresos una sola vez y compartes un **pasaporte de inquilino** con el resumen, sin enviar nóminas ni extractos a cada propietario.`,
  },
  {
    slug: 'alquilar-con-mascota',
    title: 'Alquilar con mascota: qué dice la ley y cómo conseguirlo',
    excerpt: 'El propietario puede prohibir mascotas en el contrato. Te contamos cómo negociarlo y qué garantías puedes ofrecer.',
    audience: 'inquilinos',
    category: 'Derechos',
    publishedAt: D,
    body: `Encontrar piso con perro o gato es más difícil, pero no imposible si lo planteas bien.

## Qué dice la ley

No hay una norma general que obligue a aceptar mascotas en un alquiler. El propietario puede **permitirlas, prohibirlas o ponerles condiciones** en el contrato. Lo que firméis es lo que vale.

## Cómo convencer al propietario

| Qué ofrecer | Por qué ayuda |
|---|---|
| Referencias de alquileres anteriores con la mascota | Demuestra que no hubo daños |
| Seguro de responsabilidad civil de la mascota | Cubre daños a terceros |
| Garantía adicional (dentro del límite legal) | Cubre posibles desperfectos |
| Cláusula de limpieza profesional al salir | Tranquiliza sobre el estado final |
| Presentar a la mascota en la visita | Rompe prejuicios |

## Antes de firmar

- Que la mascota figure **por escrito** en el contrato (especie, número).
- Haz fotos detalladas del estado del piso, sobre todo suelos y puertas.
- Revisa las normas de la comunidad de vecinos.

## Al salir

Deja el piso limpio y sin olores, y repara los arañazos o daños que haya hecho tu mascota: es la forma de recuperar la fianza completa y conseguir una buena referencia.

## Con nosotros

Al apuntarte nos dices si tienes mascota y te avisamos de pisos cuyos propietarios las aceptan.`,
  },
  {
    slug: 'compartir-piso-gastos-y-contrato',
    title: 'Compartir piso: cómo repartir gastos y quién firma el contrato',
    excerpt: 'Contrato conjunto o por habitaciones, reparto de la renta y suministros, y qué pasa si un compañero se va.',
    audience: 'inquilinos',
    category: 'Convivencia',
    publishedAt: D,
    body: `Compartir piso es la forma más común de reducir el alquiler. Para que salga bien, conviene dejar claras las cuentas desde el principio.

## ¿Quién firma?

| Opción | Ventaja | Riesgo |
|---|---|---|
| Todos firman el mismo contrato | Todos con los mismos derechos | Responsabilidad solidaria: si uno no paga, responden los demás |
| Firma uno y subarrienda | Más flexible | Necesita permiso escrito del propietario |
| Contrato por habitación | Cada uno responde de lo suyo | No siempre lo ofrecen los propietarios |

## Repartir la renta

No siempre a partes iguales. Un reparto por tamaño de habitación suele ser más justo:

| Habitación | Superficie | Parte de 900 € |
|---|---|---|
| Principal (con baño) | 16 m² | 360 € |
| Mediana | 12 m² | 290 € |
| Pequeña | 10 m² | 250 € |

## Gastos comunes

- Usad una **cuenta o app compartida** para los suministros.
- Pactad un fondo común para limpieza y básicos.
- Revisad las facturas juntos cada mes.

## Si un compañero se va

Avisad al propietario y acordad cómo se busca sustituto y qué pasa con su parte de la fianza. Ponedlo por escrito.

## Con nosotros

Si os apuntáis varios, decidnos cuántos seréis y buscaremos pisos con las habitaciones que necesitáis.`,
  },
  {
    slug: 'que-revisar-en-la-visita-a-un-piso',
    title: 'Qué revisar en la visita a un piso de alquiler',
    excerpt: 'La checklist para no llevarte sorpresas: humedades, ruido, agua caliente, ventanas, consumo y vecindario.',
    audience: 'inquilinos',
    category: 'Entrar a vivir',
    publishedAt: D,
    body: `En una visita de 15 minutos es fácil fijarse solo en la decoración. Esta lista te ayuda a ver lo que de verdad importa.

## Checklist de la visita

| Qué mirar | Por qué |
|---|---|
| Manchas o olor a humedad en techos y esquinas | Problemas caros y de salud |
| Presión y agua caliente en ducha y cocina | Caldera o termo en mal estado |
| Ventanas: cierre y aislamiento | Ruido y gasto en calefacción |
| Enchufes y cuadro eléctrico | Instalación antigua o insuficiente |
| Electrodomésticos: funcionan y su antigüedad | Averías frecuentes |
| Orientación y luz natural | Confort y consumo |
| Ruido de la calle y de los vecinos | Descanso |
| Cobertura móvil e internet disponible | Teletrabajo |
| Certificado energético | Estimación del consumo |
| Estado de portal, ascensor y zonas comunes | Mantenimiento de la comunidad |

## Preguntas para el propietario

1. ¿Qué gastos incluye la renta y cuáles no?
2. ¿Cuánto se paga de luz y gas al mes, aproximadamente?
3. ¿Por qué se fue el último inquilino?
4. ¿Qué duración y tipo de contrato propone?
5. ¿Qué garantías pide?

## Después de la visita

Haz fotos (con permiso), apunta lo que te preocupe y pide que las reparaciones pendientes queden por escrito antes de firmar.`,
  },
  {
    slug: 'la-fianza-donde-va-y-como-recuperarla',
    title: 'La fianza: dónde va tu dinero y cómo recuperarla',
    excerpt: 'Cuánto es, dónde se deposita, en qué plazo te la tienen que devolver y qué pueden descontar.',
    audience: 'inquilinos',
    category: 'Derechos',
    publishedAt: D,
    body: `La fianza es tu dinero. Saber cómo funciona te ayuda a recuperarla entera.

## Lo básico

| Pregunta | Respuesta |
|---|---|
| ¿Cuánto es? | 1 mensualidad en vivienda habitual; 2 en alquiler de temporada |
| ¿Dónde va? | En la mayoría de comunidades, el propietario debe depositarla en un organismo público |
| ¿Se actualiza? | Durante los primeros años no; después, al renovar, puede ajustarse a la renta |
| ¿Cuándo te la devuelven? | Al terminar el contrato, tras revisar el piso |

## El plazo de devolución

Si pasa **un mes** desde que entregas las llaves sin que te la devuelvan, la cantidad pendiente empieza a generar el interés legal (LAU, art. 36.4).

## Qué te pueden descontar

- Rentas o suministros pendientes.
- Desperfectos que vayan más allá del uso normal, justificados.

No te pueden descontar el desgaste normal: pintura con el paso de los años, pequeñas marcas de uso o el envejecimiento de los muebles.

## Para recuperarla entera

1. Haz fotos el día que entras y el día que te vas.
2. Deja todo pagado y con lecturas de contadores.
3. Pide una revisión conjunta del piso.
4. Entrega las llaves con un documento firmado y fechado.

## Y la hucha

Con nosotros, además de la fianza, tu hucha también vuelve a ti al terminar, con un bonus si no hay deudas.`,
  },
  {
    slug: 'cuanto-te-pueden-subir-el-alquiler',
    title: '¿Cuánto te pueden subir el alquiler?',
    excerpt: 'Durante el contrato solo si está pactado y con un índice de referencia. Al renovar, depende de la zona. Te lo explicamos.',
    audience: 'inquilinos',
    category: 'Derechos',
    publishedAt: D,
    body: `Una subida inesperada puede descuadrar tus cuentas. Esto es lo que te pueden pedir y lo que no.

## Durante el contrato

- Solo si el contrato **prevé la actualización**.
- Como mucho **una vez al año**, en la fecha de cumplimiento del contrato.
- Con un índice de referencia: desde 2025 el INE publica el **IRAV**, que limita las actualizaciones de muchos contratos de vivienda.
- Te la tienen que **notificar por escrito** con el cálculo.

## Cuánto supone

| Tu renta | Con una subida del 2 % | Con una del 3 % |
|---|---|---|
| 600 € | +12 €/mes | +18 €/mes |
| 850 € | +17 €/mes | +25,50 €/mes |
| 1.000 € | +20 €/mes | +30 €/mes |

## Al renovar o firmar un contrato nuevo

Mientras dure la prórroga obligatoria (5 o 7 años en vivienda habitual), las condiciones se mantienen salvo la actualización pactada. En un contrato nuevo, la renta se negocia de nuevo, con límites en las **zonas tensionadas**.

## Si te piden una subida que no corresponde

1. Revisa tu contrato.
2. Comprueba el índice publicado.
3. Responde por escrito, con calma, pidiendo el cálculo.

Muchas veces es un error y se resuelve hablando.`,
  },
  {
    slug: 'ayudas-al-alquiler-para-jovenes',
    title: 'Ayudas al alquiler para jóvenes: qué existe y dónde informarte',
    excerpt: 'Bono Alquiler Joven, ayudas del Plan de Vivienda y deducciones autonómicas: cómo saber a cuáles puedes optar.',
    audience: 'inquilinos',
    category: 'Ahorro',
    publishedAt: D,
    body: `Existen varias ayudas para que los jóvenes puedan pagar el alquiler. Sus importes y requisitos cambian según el año y la comunidad, así que lo más importante es saber dónde mirar.

## Tipos de ayuda

| Ayuda | Qué es | Dónde se solicita |
|---|---|---|
| Bono Alquiler Joven | Ayuda mensual para jóvenes con ingresos limitados | Organismo de vivienda de tu comunidad |
| Ayudas del Plan Estatal de Vivienda | Ayudas al pago del alquiler con requisitos de renta | Organismo de vivienda de tu comunidad |
| Deducciones autonómicas en el IRPF | Desgravación por el alquiler de tu vivienda habitual | En tu declaración de la renta |
| Ayudas municipales | Programas propios de algunos ayuntamientos | Tu ayuntamiento |

## Requisitos habituales

- Edad (a menudo, de 18 a 35 años).
- Límite de ingresos, normalmente referido al IPREM.
- Contrato de alquiler de vivienda habitual a tu nombre.
- Que la renta no supere un importe máximo.
- Estar al corriente con Hacienda y la Seguridad Social.

## Cómo no perderte ninguna

1. Consulta la web de vivienda de tu comunidad autónoma.
2. Revisa en la declaración de la renta las deducciones autonómicas por alquiler.
3. Guarda el contrato y los justificantes de pago: los pedirán.

## Un consejo

Las convocatorias tienen plazos cortos. Si buscas piso, ten preparada la documentación para poder pedir la ayuda en cuanto firmes.`,
  },
  {
    slug: 'seguro-de-hogar-para-inquilinos',
    title: 'Seguro de hogar para inquilinos: qué cubre y si te conviene',
    excerpt: 'El seguro del propietario no protege tus cosas. Te explicamos qué cubre un seguro de contenido y responsabilidad civil.',
    audience: 'inquilinos',
    category: 'Protección',
    publishedAt: D,
    body: `Muchos inquilinos creen que el seguro del propietario les cubre. Normalmente cubre el edificio y lo del propietario, no tus pertenencias ni los daños que causes.

## Qué cubre un seguro para inquilinos

| Cobertura | Ejemplo |
|---|---|
| Contenido | Tus muebles, electrónica y ropa ante incendio, agua o robo |
| Responsabilidad civil | Si se te olvida un grifo abierto y dañas el piso de abajo |
| Daños por agua | Fugas que estropean tus cosas |
| Asistencia | Cerrajero, fontanero o electricista urgente |

## Cuánto cuesta

Un seguro básico de contenido y responsabilidad civil para un piso de alquiler suele costar entre **8 y 15 € al mes**, según capitales y coberturas.

## Cómo elegir

1. Calcula el valor real de tus cosas para fijar el capital de contenido.
2. Comprueba el límite de **responsabilidad civil**.
3. Revisa las franquicias y exclusiones.
4. Pregunta si cubre objetos fuera de casa (por ejemplo, el portátil).

## ¿Me lo pueden exigir?

El propietario puede pedirlo como condición del contrato. Aunque no lo pida, la responsabilidad civil te protege de una avería que te puede costar mucho más que el seguro de varios años.`,
  },
  {
    slug: 'como-negociar-el-precio-del-alquiler',
    title: 'Cómo negociar el precio del alquiler (y cuándo es posible)',
    excerpt: 'Datos de mercado, contratos más largos y un buen perfil: argumentos que funcionan para pagar menos.',
    audience: 'inquilinos',
    category: 'Ahorro',
    publishedAt: D,
    body: `No siempre se puede negociar, pero cuando el piso lleva tiempo anunciado o tú eres un candidato fuerte, merece la pena intentarlo.

## Cuándo tienes margen

- El piso lleva **más de dos o tres semanas** anunciado.
- Hay varios pisos parecidos disponibles en la zona.
- Es temporada baja (fuera de septiembre en ciudades universitarias).
- Tienes un perfil muy solvente o un buen historial de pagos.

## Argumentos que funcionan

| Argumento | Por qué convence |
|---|---|
| Precios de pisos comparables | Demuestra que pides algo razonable |
| Contrato más largo | Le ahorras rotación y meses vacíos |
| Entrada inmediata | Deja de perder renta antes |
| Ingresos verificados e historial puntual | Menos riesgo para él |
| Hacerte cargo de pequeñas mejoras | Valor sin coste para él |

## Cuánto pedir

Una rebaja del **3–5 %** es una petición razonable. En un piso de 850 €, son 25–40 € al mes: entre 300 y 500 € al año.

## Cómo pedirlo

1. Muestra interés real por el piso.
2. Presenta tu perfil antes de hablar de precio.
3. Haz una propuesta concreta, no un «¿lo podrías bajar?».
4. Ofrece algo a cambio: duración o fecha de entrada.

## Tu mejor carta

Un historial verificado de pagos puntuales es el argumento más sólido. Es justo lo que guarda tu pasaporte de inquilino.`,
  },
]
