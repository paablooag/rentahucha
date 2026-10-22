import type { BlogPost } from '#shared/utils/blog'

// Quinta tanda (versión 5): artículos para inmobiliarias (II). Datos, fidelización, procesos y plantillas cortas.

type Seed = Omit<BlogPost, 'updatedAt' | 'published'>
const D = '2026-10-16'
const A = 'inmobiliarias' as const

const CTA = `> **¿Gestionas pisos en alquiler?** Sube tu cartera a RentaHucha: inquilinos verificados y una hucha anti-impago que ofrecer a tus propietarios, sin vender seguros. [Apunta a tu inmobiliaria](/inmobiliarias#formulario).`

export const BLOG_SEED_V5_INMOBILIARIAS_B: Seed[] = [
  {
    slug: 'kpis-agencia-de-alquiler-que-medir',
    title: 'KPIs de una agencia de alquiler: qué medir cada mes',
    excerpt: 'Diez indicadores para saber si tu agencia de alquiler crece de forma sana: captación, rotación, impagos y rentabilidad por piso.',
    audience: A,
    category: 'Negocio',
    publishedAt: D,
    body: `Lo que no se mide no se mejora. Estos indicadores caben en una hoja y dicen mucho de tu agencia.

| KPI | Fórmula | Qué te dice |
|---|---|---|
| Pisos captados | Nuevos contratos de gestión al mes | Salud comercial |
| Días hasta alquilar | Media desde la captación hasta el contrato | Precio y calidad del anuncio |
| Visitas por contrato | Visitas / contratos firmados | Eficiencia del filtro |
| Coste por contrato | Gasto en marketing / contratos | Rentabilidad de los canales |
| Tasa de impago | Pisos con impago / pisos gestionados | Calidad de la selección |
| Incidencias por piso | Incidencias / pisos al mes | Estado de la cartera |
| Tiempo de resolución | Días medios por incidencia | Servicio al propietario |
| Retención de propietarios | Siguen a los 12 meses / total | Fidelización |
| Ingreso recurrente | Cuotas mensuales de gestión | Estabilidad del negocio |
| Margen por piso | Ingreso por piso − coste por piso | Rentabilidad real |

## Cómo usarlos

- Revísalos **cada mes**, siempre con los mismos criterios.
- Elige **tres prioritarios** por trimestre.
- Compártelos con el equipo: lo que se ve, mejora.

${CTA}`,
  },
  {
    slug: 'fidelizar-propietarios-inmobiliaria',
    title: 'Cómo fidelizar a los propietarios para que no se vayan de tu agencia',
    excerpt: 'Informes, respuesta rápida, cero sorpresas y pequeños detalles: lo que hace que un propietario se quede años contigo.',
    audience: A,
    category: 'Gestión de alquiler',
    publishedAt: D,
    body: `Captar un propietario cuesta mucho más que conservarlo. Estos hábitos marcan la diferencia.

## Lo que más valoran

1. **Que no le llamen para todo**: resolver las incidencias pequeñas sin molestarle.
2. **Que le avisen de lo importante**: impagos, averías grandes, fin de contrato.
3. **Transparencia**: informe mensual con cobros, gastos e incidencias.
4. **Asesoramiento**: normativa, fiscalidad, actualización de renta.

## Rutina de fidelización

| Cuándo | Qué |
|---|---|
| Cada mes | Informe breve y aviso de cobro |
| Cada año | Resumen para la renta, revisión de la renta y del estado del piso |
| Fin de contrato | Propuesta de renovación o nueva comercialización |
| Cambios normativos | Nota clara de qué le afecta |

## Señales de que un propietario se va a ir

- Pregunta por otras agencias o compara precios.
- Se queja de que nadie le contesta.
- Ha tenido una incidencia mal resuelta.

Actúa antes: una llamada a tiempo salva el cliente. Usa esta [plantilla de informe mensual](/blog/plantilla-informe-mensual-propietario).

${CTA}`,
  },
  {
    slug: 'captar-propietarios-pisos-vacios',
    title: 'Captar propietarios de pisos vacíos: argumentos que funcionan',
    excerpt: 'Recargo del IBI, costes fijos, miedo al impago y pisos heredados: cómo convencer a quien tiene un piso cerrado.',
    audience: A,
    category: 'Captación',
    publishedAt: D,
    body: `En casi todas las ciudades hay pisos cerrados. Sus propietarios no necesitan que les vendas un anuncio: necesitan **resolver su miedo**.

## Por qué está vacío

| Motivo | Argumento |
|---|---|
| Miedo al impago | Selección con datos y hucha que pasa al propietario si hay impago |
| Miedo a daños | Inventario con fotos y revisión periódica acordada |
| Herencia sin resolver | Te coordinas con la gestoría y propones alquilar mientras deciden |
| Necesita reformas | Plan de mini reformas que se pagan solas |
| "Lo quiero para mis hijos" | Alquiler de temporada o contrato con cláusula de necesidad |

## Los números que abren conversación

- Un piso vacío sigue pagando IBI, comunidad, seguro y suministros mínimos.
- Hacienda imputa una renta por los inmuebles que no son vivienda habitual ni están alquilados.
- Algunos ayuntamientos aplican recargos del IBI a la vivienda desocupada de forma permanente.

Puedes apoyarte en [cuánto cuesta tener un piso vacío](/blog/cuanto-cuesta-tener-un-piso-vacio).

## Dónde encontrarlos

Administradores de fincas, porteros, vecinos, gestorías de herencias y campañas de buzoneo con un mensaje específico.

${CTA}`,
  },
  {
    slug: 'convertir-pisos-turisticos-en-alquiler-larga-duracion-agencias',
    title: 'Cómo convertir pisos turísticos en alquiler de larga duración: oportunidad para agencias',
    excerpt: 'Más fiscalidad, recargos de IBI y registro obligatorio están moviendo a propietarios turísticos hacia el alquiler tradicional.',
    audience: A,
    category: 'Captación',
    publishedAt: D,
    body: `Muchos propietarios de pisos turísticos se están planteando el alquiler de larga duración: registro único, más control municipal y, si se convalida el decreto de octubre, IVA del 10 % en ciertos alquileres turísticos y recargos de IBI.

## El argumento para el propietario

| Turístico | Larga duración |
|---|---|
| Ingreso variable según la temporada | Ingreso estable |
| Limpieza, check-in y reseñas | Un inquilino, un contrato |
| Más costes e impuestos en debate | Reducciones del IRPF de hasta el 100 % |
| Más regulación local | Marco conocido (LAU) |

## Cómo plantearlo

1. **Haz los números netos** de los dos modelos, con meses vacíos y gastos reales.
2. Propón un **plan de transición**: fecha de última reserva, puesta a punto y comercialización.
3. Ofrece un **inquilino verificado** y protección frente a impagos con la hucha.

## Ojo con

- Los pisos turísticos suelen estar muy amueblados: decide qué se queda.
- Revisar el certificado energético y las licencias.

${CTA}`,
  },
  {
    slug: 'gestion-de-incidencias-inmobiliaria-sistema',
    title: 'Gestión de incidencias: de WhatsApp a un sistema que escala',
    excerpt: 'Cómo organizar las averías de tu cartera para responder rápido, controlar costes y tener todo documentado.',
    audience: A,
    category: 'Gestión de alquiler',
    publishedAt: D,
    body: `Las incidencias son la parte más visible del servicio. Si dependen del WhatsApp de un comercial, no escalan.

## Un flujo sencillo

1. **Entrada única**: el inquilino comunica la avería con fotos por un canal.
2. **Clasificación**: urgente (agua, luz, gas, cerradura) o normal.
3. **Responsable**: quién paga según la LAU (reparación necesaria del propietario o pequeño uso del inquilino).
4. **Proveedor**: red de confianza con precios acordados.
5. **Cierre**: foto del arreglo, factura y aviso al propietario.

## Tiempos objetivo

| Tipo | Respuesta | Solución |
|---|---|---|
| Urgente | Mismo día | 24–48 h |
| Normal | 24 h | 1–2 semanas |

## Lo que ganas

- Menos llamadas.
- Historial por piso (útil al final del contrato).
- Propietarios más tranquilos.

En el panel de RentaHucha, las incidencias llegan con fotos y estado, y el propietario ve el historial.

${CTA}`,
  },
  {
    slug: 'colaboracion-entre-inmobiliarias-mls-alquiler',
    title: 'Colaborar entre inmobiliarias en alquiler: MLS y operaciones compartidas',
    excerpt: 'Compartir cartera y candidatos acelera los alquileres. Cómo repartir honorarios y evitar conflictos.',
    audience: A,
    category: 'Negocio',
    publishedAt: D,
    body: `En alquiler, la velocidad lo es todo. Compartir pisos y candidatos con otras agencias puede reducir mucho el tiempo vacío.

## Cómo funciona

- Una agencia aporta el **piso** (captadora) y otra el **inquilino** (colaboradora).
- Se reparten los honorarios según lo acordado.
- Ambas cumplen un **código de colaboración** común.

## Claves para que funcione

1. **Acuerdo por escrito**: reparto, plazos y quién hace cada tarea.
2. **Información completa del piso**, actualizada.
3. **Respeto al cliente** de cada agencia.
4. **Recordatorio**: los honorarios los paga el propietario (Ley 12/2023), también en operaciones compartidas.

## Riesgos

- Información desactualizada (pisos ya alquilados).
- Duplicidad de visitas.
- Conflictos por el reparto si no está escrito.

${CTA}`,
  },
  {
    slug: 'elecciones-29n-hablar-de-normativa-con-clientes-sin-opinar',
    title: 'Elecciones del 29-N: cómo hablar de la normativa con tus clientes sin opinar',
    excerpt: 'Tus propietarios e inquilinos preguntan qué pasará. Cómo informar con hechos, sin hacer predicciones ni tomar partido.',
    audience: A,
    category: 'Normativa',
    publishedAt: D,
    body: `Con elecciones generales el **29 de noviembre de 2026**, tus clientes preguntan: "¿Qué va a pasar con el alquiler?". Tu papel no es predecir ni opinar, sino **informar**.

## Tres reglas

1. **Hechos, no predicciones**: qué norma está vigente hoy y qué está pendiente.
2. **Todas las propuestas por igual**: si las mencionas, atribuye cada una a su partido y sin adjetivos.
3. **Lo que no cambia**: un contrato firmado se rige por la ley vigente cuando se firmó, salvo disposición expresa.

## Respuestas tipo

- **"¿Firmo ahora o espero?"**: "Hoy rigen la LAU, la Ley 12/2023 y el decreto de octubre si se convalida. Cualquier cambio requerirá una votación en el nuevo Congreso. Esperar tiene un coste: cada mes vacío."
- **"¿Me pueden congelar la renta?"**: "Ahora mismo hay un límite temporal del 2 %, si el decreto se mantiene. Te avisaremos de cualquier cambio."

## Recursos neutrales

- [Qué está en juego en la vivienda el 29-N](/blog/elecciones-29-noviembre-que-esta-en-juego-en-vivienda)
- [Propuestas de los partidos, por orden alfabético](/blog/propuestas-de-vivienda-de-los-partidos-resumen-neutral)

${CTA}`,
  },
  {
    slug: 'proteccion-de-datos-inmobiliaria-errores-comunes',
    title: 'Protección de datos en la inmobiliaria: 8 errores comunes',
    excerpt: 'Fotocopias de DNI, grupos de WhatsApp, carpetas compartidas y plazos de conservación: lo que más multas genera.',
    audience: A,
    category: 'Normativa',
    publishedAt: D,
    body: `Las inmobiliarias manejan muchos datos personales: candidatos, inquilinos, propietarios. Estos son los errores más habituales.

1. **Pedir documentación a todos los candidatos**, incluso a los que no van a firmar.
2. **Guardarla indefinidamente**.
3. **Compartirla por WhatsApp personal** o en grupos.
4. **Carpetas en la nube sin control de acceso**.
5. **No informar** al candidato de para qué se usan sus datos.
6. **Enviar listados de candidatos** al propietario con más datos de los necesarios.
7. **No tener contrato de encargo** con los proveedores (software, firma, verificación).
8. **Fotografiar documentos** de identidad sin necesidad.

## Cómo hacerlo bien

- Pide la documentación **solo** al candidato preseleccionado.
- Usa herramientas con **acceso controlado**.
- Envía al propietario un **resumen** de la candidatura, no la documentación completa.
- Define **plazos de borrado**.

Más detalle en [verificación de inquilinos y RGPD](/blog/verificacion-de-inquilinos-rgpd-inmobiliarias).

${CTA}`,
  },
  {
    slug: 'cobro-de-rentas-domiciliacion-evitar-retrasos',
    title: 'Cobro de rentas: cómo evitar retrasos en los pisos que gestionas',
    excerpt: 'Domiciliación, fechas de cobro realistas, recordatorios y reacción el día 1: el sistema que reduce los retrasos.',
    audience: A,
    category: 'Gestión de alquiler',
    publishedAt: D,
    body: `Muchos retrasos no son impagos: son despistes, fechas mal elegidas o transferencias olvidadas. Se pueden reducir mucho.

## Cinco medidas

1. **Domiciliación** en lugar de transferencia manual.
2. **Fecha de cobro** alineada con la nómina del inquilino (por ejemplo, del 1 al 5 de cada mes).
3. **Recordatorio** unos días antes del cargo.
4. **Aviso automático** si el cobro falla.
5. **Llamada el mismo día**, con tono de ayuda, no de amenaza.

## Qué decir el día 1

> "Hola, el cargo del alquiler de este mes no se ha podido completar. ¿Ha habido algún problema con la cuenta? Si necesitas unos días, cuéntamelo y lo dejamos por escrito."

## Cuándo pasar al protocolo de impago

Si en una o dos semanas no hay respuesta ni acuerdo, activa el [protocolo de impagos](/blog/protocolo-impagos-cartera-inmobiliaria).

${CTA}`,
  },
  {
    slug: 'deposito-de-fianzas-agencia-o-propietario',
    title: 'Depósito de fianzas: qué hace la agencia y qué el propietario',
    excerpt: 'Quién deposita, en qué plazo y qué pasa al final del contrato. Cómo organizarlo para no dejar ninguna fianza sin depositar.',
    audience: A,
    category: 'Gestión de alquiler',
    publishedAt: D,
    body: `La fianza (un mes en vivienda, dos en otros usos) se deposita, en la mayoría de comunidades autónomas, en un organismo público. La obligación es del **arrendador**, pero muchas agencias lo gestionan por él.

## Reparto de tareas habitual

| Tarea | Quién |
|---|---|
| Cobrar la fianza al firmar | Agencia, en nombre del propietario |
| Presentar el depósito | Agencia (con autorización) o propietario |
| Guardar el justificante | Ambos |
| Recuperarla al final | Propietario (o agencia con autorización) |
| Devolverla al inquilino | Propietario, descontando daños justificados |

## Plazos

Suelen ser de **uno o dos meses** desde la firma, según la comunidad. No depositarla puede acarrear sanciones.

## Buenas prácticas

- Calendario de depósitos con alertas.
- Autorización escrita del propietario para gestionarlo.
- Justificante archivado con el contrato.

Más detalle para propietarios en [cómo depositar la fianza](/blog/depositar-la-fianza-en-tu-comunidad).

${CTA}`,
  },
  {
    slug: 'objeciones-de-propietarios-y-como-responderlas',
    title: '10 objeciones de propietarios y cómo responderlas',
    excerpt: 'Respuestas cortas y honestas a lo que más oyes en una captación: precio, miedo, normativa y confianza.',
    audience: A,
    category: 'Captación',
    publishedAt: D,
    body: `| Objeción | Respuesta |
|---|---|
| "Lo alquilo yo, no necesito agencia" | "Perfecto. ¿Cómo vas a verificar los ingresos y qué harás el día 1 de un impago?" |
| "Sois caros" | "Son gasto deducible. Y un mes vacío o un impago cuesta mucho más." |
| "Me da miedo el impago" | "Seleccionamos con datos y la hucha del inquilino pasa a ti si deja de pagar." |
| "Con la ley, el inquilino se queda para siempre" | "Te explicamos las duraciones reales y las opciones legales para tu caso." |
| "Prefiero esperar a las elecciones" | "Un contrato se rige por la ley vigente al firmar. Cada mes vacío es renta perdida." |
| "Quiero más renta" | "Esto dicen los comparables y el índice. Si no hay contactos en 15 días, lo revisamos juntos." |
| "No quiero mascotas" | "Es tu decisión. Te contamos qué ganas y cómo protegerte si decides aceptarlas." |
| "¿Y si me rompen el piso?" | "Inventario con fotos, fianza y revisión acordada." |
| "Otra agencia me lo hace más barato" | "Comparemos qué incluye cada una." |
| "Ya tengo un seguro de impago" | "Genial: la selección y la hucha suman a tu seguro." |

${CTA}`,
  },
  {
    slug: 'guion-de-llamada-captar-piso-alquiler',
    title: 'Guion de llamada para captar un piso en alquiler',
    excerpt: 'Una llamada de captación en cinco pasos: presentación, diagnóstico, propuesta, objeciones y siguiente paso.',
    audience: A,
    category: 'Captación',
    publishedAt: D,
    body: `## 1. Presentación (20 segundos)
"Hola, soy [nombre], de [agencia]. Ayudamos a propietarios de [zona] a alquilar con inquilinos verificados. ¿Tienes un minuto?"

## 2. Diagnóstico (preguntas)
- ¿El piso está vacío o alquilado?
- ¿Lo has alquilado antes? ¿Qué tal fue?
- ¿Qué es lo que más te preocupa?

## 3. Propuesta (adaptada a su miedo)
"Te propongo una valoración con datos de tu zona y te explico cómo seleccionamos y qué pasa si un inquilino deja de pagar."

## 4. Objeciones
Usa las [10 respuestas a objeciones](/blog/objeciones-de-propietarios-y-como-responderlas).

## 5. Siguiente paso concreto
"¿Te va bien el jueves a las 18:00 para ver el piso? Son 30 minutos."

**Consejo:** apunta lo que te dice. En la visita, empieza por su preocupación.

${CTA}`,
  },
  {
    slug: 'plantilla-informe-mensual-propietario',
    title: 'Plantilla de informe mensual para el propietario',
    excerpt: 'Una página, cinco bloques: cobro, gastos, incidencias, próximas fechas y novedades. Copia y adapta.',
    audience: A,
    category: 'Gestión de alquiler',
    publishedAt: D,
    body: `Un informe corto y regular transmite profesionalidad. Esta estructura cabe en una página.

## Plantilla

**Informe de [mes] · [dirección del piso]**

1. **Cobro**: renta de [importe] cobrada el [fecha]. Estado: al día / retraso de X días.
2. **Gastos del mes**: comunidad, reparaciones (con factura adjunta).
3. **Incidencias**: [descripción], abierta el [fecha], resuelta el [fecha], coste [importe].
4. **Próximas fechas**: actualización de renta el [fecha]; fin de contrato el [fecha]; preaviso hasta el [fecha].
5. **Novedades normativas**: una frase sobre lo que le afecta, si hay algo.

## Consejos

- Envíalo **siempre el mismo día** del mes.
- Si no hay novedades, dilo: "Mes sin incidencias".
- Adjunta las facturas: le facilitan la renta.

${CTA}`,
  },
  {
    slug: 'presentar-candidatos-al-propietario',
    title: 'Cómo presentar candidatos al propietario',
    excerpt: 'Una ficha resumida por candidato ayuda al propietario a decidir rápido y sin recibir datos personales innecesarios.',
    audience: A,
    category: 'Gestión de alquiler',
    publishedAt: D,
    body: `El propietario quiere decidir rápido y con criterio. Dale una **ficha resumida**, no un montón de nóminas.

## Ficha de candidato

| Campo | Ejemplo |
|---|---|
| Perfil | Pareja, 2 personas, sin mascotas |
| Situación laboral | Ambos con contrato indefinido |
| Ratio renta/ingresos | 28 % |
| Historial | 3 años de pagos puntuales en su alquiler anterior |
| Entrada | 1 de noviembre |
| Recomendación | Encaje alto |

## Por qué así

- Protege los datos del candidato (minimización).
- Permite comparar varias candidaturas de un vistazo.
- Muestra tu trabajo de análisis.

## Cuántos presentar

Entre **dos y tres** buenos candidatos. Más, abruma; uno solo, no deja elegir.

${CTA}`,
  },
  {
    slug: 'checklist-entrega-de-llaves-agencias',
    title: 'Checklist de entrega de llaves para agencias',
    excerpt: 'Inventario, fotos, contadores, llaves y documentos: todo lo que debe quedar firmado el día de la entrada.',
    audience: A,
    category: 'Gestión de alquiler',
    publishedAt: D,
    body: `- [ ] Contrato firmado por todas las partes
- [ ] Justificante del primer mes y de la fianza
- [ ] Inventario con fotos, firmado
- [ ] Lecturas de contadores (luz, agua, gas) con foto
- [ ] Número de llaves entregadas por tipo
- [ ] Prueba de electrodomésticos, calefacción y agua caliente
- [ ] Manual de la vivienda: llave de paso, cuadro eléctrico, normas de la comunidad
- [ ] Contacto para incidencias y urgencias
- [ ] Cambio de titular de suministros iniciado
- [ ] Copia del certificado energético

**Consejo:** envía al inquilino y al propietario un email con el acta de entrega y las fotos el mismo día. Esa fecha te protege al final del contrato.

${CTA}`,
  },
  {
    slug: 'errores-contratos-de-alquiler-que-vemos',
    title: '7 errores en contratos de alquiler que vemos a menudo',
    excerpt: 'Duraciones ilegales, garantías excesivas, gastos mal repartidos y cláusulas nulas: revisa tu modelo de contrato.',
    audience: A,
    category: 'Normativa',
    publishedAt: D,
    body: `1. **Duración de un año "sin prórroga"** en vivienda habitual: la LAU permite al inquilino llegar a 5 años (7 si el propietario es empresa).
2. **Garantías por encima del límite**: en vivienda habitual, fianza de un mes y garantía adicional de hasta dos.
3. **Gastos de gestión al inquilino**: desde la Ley 12/2023, a cargo del propietario.
4. **Cláusula de necesidad mal redactada**: debe constar en el contrato para poder recuperar la vivienda en los términos del artículo 9.
5. **Actualización por IPC** en contratos recientes sin tener en cuenta el límite del índice vigente.
6. **Temporada sin causa**: un contrato de temporada sin necesidad temporal real puede recalificarse.
7. **Renuncias a derechos irrenunciables**: son nulas y restan credibilidad al contrato.

Revisa tu plantilla al menos una vez al año, y siempre que cambie la normativa.

${CTA}`,
  },
  {
    slug: 'visitas-en-grupo-sin-perder-candidatos',
    title: 'Visitas en grupo: cómo organizarlas sin perder buenos candidatos',
    excerpt: 'Las visitas agrupadas ahorran tiempo, pero pueden espantar a los mejores perfiles. Cómo hacerlas bien.',
    audience: A,
    category: 'Gestión de alquiler',
    publishedAt: D,
    body: `Con mucha demanda, agrupar visitas ahorra horas. Pero un buen candidato puede sentirse un número más y descolgarse.

## Cómo hacerlo bien

- **Filtro previo**: solo visitan quienes encajan.
- **Franjas cortas** (20–30 minutos), con pocos candidatos a la vez.
- **Información clara** antes de la visita: renta, requisitos, documentación y plazos.
- **Atención individual** al final de la visita.
- **Respuesta rápida**: decide y comunica en 48–72 horas.

## Lo que espanta a los buenos candidatos

- Colas en el portal.
- "Envíame toda la documentación y ya te diré".
- No responder a quien no ha sido elegido.

${CTA}`,
  },
  {
    slug: 'responder-resenas-negativas-inmobiliaria',
    title: 'Cómo responder a reseñas negativas de tu inmobiliaria',
    excerpt: 'Una estructura de respuesta en cuatro pasos que protege tu reputación y muestra profesionalidad.',
    audience: A,
    category: 'Marketing inmobiliario',
    publishedAt: D,
    body: `Las reseñas negativas las leen los futuros clientes. La respuesta pesa más que la crítica.

## Estructura

1. **Agradece** el comentario.
2. **Reconoce** lo que se pudo hacer mejor, sin excusas.
3. **Explica** brevemente, sin datos personales.
4. **Ofrece** un canal privado para resolverlo.

## Ejemplo

> "Gracias por contarnos tu experiencia, Ana. Sentimos que la reparación tardase más de lo que esperabas. Revisamos el caso y cambiamos de proveedor para ese tipo de avería. Si quieres, escríbenos a [email] y lo vemos juntos."

## Lo que no debes hacer

- Responder en caliente.
- Revelar datos del cliente o del contrato.
- Discutir en público.

${CTA}`,
  },
  {
    slug: 'precio-gestion-integral-alquiler-como-fijarlo',
    title: 'Precio de la gestión integral de alquiler: cómo fijarlo',
    excerpt: 'Coste por piso, valor percibido y competencia: un método para poner precio a la gestión mensual sin regalar tu trabajo.',
    audience: A,
    category: 'Negocio',
    publishedAt: D,
    body: `> **¿Eres propietario y quieres saber cuánto cuesta que te gestionen el piso?** Lee [cuánto cobra una inmobiliaria por gestionar tu alquiler](/blog/cuanto-cuesta-gestion-alquiler-inmobiliaria). Este artículo está pensado para agencias que fijan su tarifa.

## 1. Calcula tu coste por piso

Horas al mes × coste por hora + herramientas + parte proporcional de la estructura.

## 2. Mira el mercado

En España es frecuente ver la gestión integral cobrada como un **porcentaje de la renta mensual**, con diferencias según la ciudad y lo que incluye cada servicio. Úsalo como referencia, no como regla.

## 3. Define qué incluye

| Básico | Completo |
|---|---|
| Cobros y avisos | + Incidencias con proveedores |
| Informe mensual | + Revisión anual del piso |
| | + Protección frente a impagos (hucha) |

## 4. Ajusta por volumen

Propietarios con varios pisos pueden tener un porcentaje menor. Es la lógica de los tramos de RentaHucha (del 5 % al 3,5 %).

## 5. Comunica el valor

El propietario no compra horas: compra **tranquilidad y tiempo**. Explícalo con ejemplos.

${CTA}`,
  },
  {
    slug: 'pasaporte-de-inquilino-captar-inquilinos-de-calidad',
    title: 'Captar inquilinos de calidad para tu cartera con el pasaporte de inquilino',
    excerpt: 'Un historial de pagos verificado y portable reduce visitas inútiles y da confianza al propietario.',
    audience: A,
    category: 'RentaHucha',
    publishedAt: D,
    body: `El mejor predictor de cómo pagará un inquilino es **cómo ha pagado antes**. Pero hoy ese historial no viaja con él.

## Qué es el pasaporte de inquilino

En RentaHucha, cada pago puntual queda registrado en un **historial verificado** que el inquilino puede enseñar en su siguiente alquiler, junto con su hucha si se muda dentro de la red.

## Qué gana tu agencia

- **Menos tiempo verificando**: el historial ya está comprobado.
- **Mejores candidatos**: quien tiene un buen historial quiere conservarlo.
- **Argumento para el propietario**: "Este inquilino lleva 24 pagos puntuales".

## Y el inquilino

Entra con más facilidad, a veces sin aval, y su buen comportamiento por fin le sirve de algo.

Más sobre el producto en [por qué subir tus pisos a RentaHucha](/blog/por-que-subir-tus-pisos-a-rentahucha).

${CTA}`,
  },
]
