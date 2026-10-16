import type { BlogPost } from '#shared/utils/blog'

// Quinta tanda (versión 5): artículos para inmobiliarias (I). Guías largas de captación, honorarios, gestión y
// normativa, pensadas para búsquedas de profesionales. Sin cifras de mercado inventadas: los importes son
// orientativos y la normativa remite a la fuente oficial. RentaHucha no es una aseguradora.

type Seed = Omit<BlogPost, 'updatedAt' | 'published'>
const D = '2026-10-16'
const A = 'inmobiliarias' as const

const CTA = `> **¿Gestionas pisos en alquiler?** Sube tu cartera a RentaHucha: inquilinos verificados y una hucha anti-impago que ofrecer a tus propietarios, sin vender seguros. [Apunta a tu inmobiliaria](/inmobiliarias#formulario).`

export const BLOG_SEED_V5_INMOBILIARIAS_A: Seed[] = [
  {
    slug: 'como-captar-propietarios-para-alquiler-guia-inmobiliarias',
    title: 'Cómo captar propietarios para alquiler en 2027: guía completa para inmobiliarias',
    excerpt: 'Canales, mensajes y argumentos que funcionan para conseguir pisos en alquiler en un mercado con poca oferta y mucha regulación.',
    audience: A,
    category: 'Captación',
    publishedAt: D,
    body: `Con poca oferta y mucha demanda, el cuello de botella de una inmobiliaria de alquiler no es encontrar inquilinos: es **conseguir pisos**. Esta guía reúne lo que funciona hoy para captar propietarios.

## Por qué cuesta tanto captar

- **Miedo al impago y a la ocupación**: muchos propietarios prefieren tener el piso vacío.
- **Cambios normativos**: zonas tensionadas, límites de renta, decretos y elecciones generales el 29 de noviembre de 2026.
- **Honorarios**: desde la Ley 12/2023, los gastos de gestión los paga el propietario, y algunos comparan precio antes que servicio.

El propietario no compra "publicar un anuncio". Compra **tranquilidad**.

## Dónde están los propietarios

| Perfil | Dónde encontrarlo | Qué le preocupa |
|---|---|---|
| Piso heredado | Notarías, gestorías, asesores fiscales | Repartir con hermanos, impuestos, estado del piso |
| Piso vacío por miedo | Barrio, comunidades de vecinos, boca a boca | Impago, okupación |
| Ex piso turístico | Registros, portales de alquiler turístico | Nuevas reglas, fiscalidad |
| Pequeño inversor | Redes, formación, banca privada | Rentabilidad neta |
| Propietario que se muda | Ofertas de empleo, traslados | Que alguien lo gestione por él |

## Siete canales que funcionan

1. **Contenido útil y local**: guías como esta, con tu ciudad en el título. Atraen búsquedas como "alquilar mi piso en Valencia".
2. **Ficha de Google bien trabajada**: reseñas recientes y fotos reales del equipo.
3. **Alianzas** con gestorías, abogados, administradores de fincas y notarías.
4. **Campañas de buzoneo segmentadas** en edificios con muchos pisos vacíos, con un mensaje concreto, no genérico.
5. **Webinars o charlas** sobre la normativa vigente: atraen propietarios preocupados.
6. **Recomendación** de propietarios actuales, con un incentivo claro.
7. **Valoración gratuita del alquiler**: el gancho clásico, si se hace con datos (comparables e índice de referencia).

## Los argumentos que convencen

- **Selección del inquilino con datos**: ingresos verificados, historial de pagos y ratio renta/ingresos.
- **Protección frente a impagos**: aquí puedes diferenciarte. Con RentaHucha, el inquilino llena una hucha cada mes que **pasa al propietario si hay impago**, sin que tengas que vender seguros.
- **Cumplimiento normativo**: contrato correcto, fianza depositada, certificado energético.
- **Transparencia**: informe mensual, avisos de pago e incidencias documentadas.

## Un mensaje de captación que funciona

> "¿Tienes el piso vacío por miedo a un mal inquilino? Te presentamos solo candidatos verificados y, si alguno deja de pagar, la hucha que ha ido llenando cada mes pasa a ti. Te lo explicamos en 15 minutos."

Funciona porque nombra el miedo, da una solución concreta y pide poco compromiso.

## Mide lo que haces

| Indicador | Cómo calcularlo |
|---|---|
| Coste por propietario captado | Gasto del canal / propietarios firmados |
| Tasa de conversión de valoraciones | Firmas / valoraciones hechas |
| Días hasta alquilar | Desde la firma de la gestión hasta el contrato |
| Retención a 12 meses | Propietarios que siguen contigo un año después |

## Plan de captación de 90 días

| Semanas | Acciones | Objetivo |
|---|---|---|
| 1–2 | Ficha de Google al día, página de servicios para propietarios, guion de llamada | Base preparada |
| 3–4 | Reunión con 5 gestorías, 3 administradores de fincas y 2 notarías de la zona | Alianzas activas |
| 5–8 | Dos guías locales en el blog y una charla sobre la normativa vigente | Primeros contactos entrantes |
| 9–10 | Campaña de buzoneo segmentada en 3 edificios con pisos vacíos | Valoraciones |
| 11–12 | Programa de recomendación para propietarios actuales | Captación recurrente |

Revisa los números cada dos semanas y quédate con los dos canales que mejor convierten.

## La primera visita al piso

Es el momento decisivo. Lleva:

1. **Informe de valoración** con comparables, índice de referencia y, si aplica, límite de zona tensionada.
2. **Calendario realista**: cuántos días esperas tardar en alquilar.
3. **Proceso de selección** explicado en una página.
4. **Qué pasa si hay impago**: aviso el día 1, requerimiento, expediente y la hucha del inquilino.
5. **Propuesta económica** clara, con lo que incluye y lo que no.

Escucha más de lo que hablas: el propietario te dirá qué le preocupa y ese es tu argumento principal.

## Errores que hacen perder captaciones

- **Prometer una renta que el mercado no paga**: captas hoy y pierdes al cliente en un mes.
- **Hablar de "renta garantizada" sin una cobertura real detrás**.
- **No volver a llamar**: muchos propietarios deciden en la segunda o tercera conversación.
- **Mandar un PDF genérico** en lugar de una valoración de su piso.
- **Criticar a la competencia** en lugar de explicar tu método.

## Cómo seguir la relación si dice que no

Pide permiso para enviarle información útil (cambios normativos, una guía) y vuelve a contactar en dos o tres meses. Muchas captaciones llegan tras un primer "ahora no".

## Preguntas frecuentes

### ¿Qué canal capta más propietarios de alquiler?
Depende de la zona, pero las recomendaciones y las alianzas con gestorías y administradores de fincas suelen dar los propietarios de mejor calidad. El contenido local da volumen a medio plazo.

### ¿Cómo convenzo a un propietario que tiene el piso vacío por miedo?
Habla de su miedo concreto (impago, daños, ocupación) y enséñale el proceso: cómo seleccionas, qué pasa el día 1 de un impago y qué protección tiene. Con RentaHucha, la hucha del inquilino pasa a él si hay impago.

### ¿Puedo cobrar la valoración al propietario?
Puedes, pero como herramienta de captación suele funcionar mejor gratuita y con datos reales de tu zona.

${CTA}`,
  },
  {
    slug: 'honorarios-agencia-alquiler-ley-vivienda-quien-paga',
    title: 'Honorarios de agencia en el alquiler tras la Ley de Vivienda: quién paga y cómo cobrarlos',
    excerpt: 'Desde la Ley 12/2023 los gastos de gestión y formalización corren a cargo del propietario. Cómo adaptar tu modelo de honorarios sin perder clientes.',
    audience: A,
    category: 'Normativa',
    publishedAt: D,
    body: `La Ley 12/2023, por el derecho a la vivienda, cambió el artículo 20 de la LAU: los **gastos de gestión inmobiliaria y de formalización del contrato corren a cargo del arrendador**. Para muchas agencias fue el cambio más importante de la última década.

## Qué dice la norma

- Afecta a los **contratos de vivienda** sujetos a la LAU.
- Los gastos de gestión inmobiliaria y de formalización del contrato los paga el **propietario**.
- No se pueden repercutir al inquilino por la vía indirecta (por ejemplo, llamándolos "gastos de estudio" o "de reserva").

## Lo que ya no puedes hacer

- Cobrar al inquilino un mes de honorarios por encontrarle el piso.
- Cobrar "gastos de estudio del expediente" o de "reserva" que en realidad son honorarios.
- Trasladar al inquilino el coste del contrato.

Si tienes dudas sobre un concepto concreto, consulta con un abogado: la línea entre servicio al inquilino y gestión para el propietario puede ser fina.

## Modelos de honorarios que se usan hoy

| Modelo | Cómo funciona | Para quién encaja |
|---|---|---|
| Comisión por alquiler | Un porcentaje o una cantidad fija al firmar | Propietarios que gestionan después |
| Gestión integral mensual | Un porcentaje de la renta cada mes | Propietarios que no quieren ocuparse |
| Paquete mixto | Alta inicial reducida + cuota mensual | Fidelizar desde el primer contrato |
| Servicios sueltos | Valoración, contrato, entrega de llaves | Propietarios con experiencia |

## Cómo justificar tus honorarios ante el propietario

El propietario paga ahora el 100 %. Tiene que ver claro **qué compra**:

1. **Tiempo**: anuncios, visitas, filtrado, contrato y entrega.
2. **Riesgo**: selección del inquilino y protección frente a impagos.
3. **Cumplimiento**: fianza depositada, certificado energético, contrato actualizado.
4. **Fiscalidad**: los honorarios son gasto deducible del rendimiento del alquiler en el IRPF.

## Facturación

- Factura siempre al **propietario**, con el IVA correspondiente (21 % en servicios de intermediación).
- Detalla los conceptos: ayuda al propietario a deducirlos.

## La hoja de encargo

Firma siempre una **hoja de encargo** o contrato de gestión con el propietario antes de empezar. Debe incluir:

- Servicios incluidos (comercialización, selección, contrato, entrega de llaves, gestión mensual…).
- **Honorarios** y cuándo se devengan (al firmar el contrato de alquiler, mensualmente…).
- Duración del encargo y si es en exclusiva.
- Qué pasa si el propietario alquila por su cuenta durante el encargo.
- Gastos no incluidos (certificado energético, reparaciones, destacados en portales).

## Ejemplo de presupuesto para el propietario

| Concepto | Importe |
|---|---|
| Comercialización y selección del inquilino | Cantidad fija o porcentaje acordado |
| Redacción del contrato e inventario | Incluido |
| Gestión mensual (opcional) | Porcentaje de la renta |
| IVA | 21 % sobre los honorarios |
| Deducible en el IRPF del propietario | Sí, como gasto del alquiler |

Mostrar que los honorarios son **deducibles** cambia mucho la percepción del precio.

## Cómo comunicarlo al inquilino

Incluye en tus anuncios una frase clara: "Sin honorarios para el inquilino". Atrae a más candidatos y deja claro que cumples la ley.

## Señales de que un concepto puede ser problemático

- Se cobra al inquilino y está relacionado con conseguir el piso o firmar el contrato.
- No hay un servicio real e independiente detrás.
- Es obligatorio para poder alquilar.

En cualquiera de esos casos, no lo cobres sin asesoramiento jurídico.

## Preguntas frecuentes

### ¿Puede la agencia cobrar algo al inquilino?
Por la gestión del alquiler de vivienda y la formalización del contrato, no. Si ofreces otros servicios claramente independientes y opcionales que el inquilino contrata libremente, consúltalo antes con un abogado.

### ¿Se aplica también al alquiler de temporada?
El artículo 20 de la LAU regula el arrendamiento de vivienda. En temporada y otros usos distintos de vivienda hay más debate: revisa cada caso con asesoramiento jurídico y evita prácticas que puedan considerarse abusivas.

### ¿Los honorarios son deducibles para el propietario?
Sí, como gasto necesario para obtener el rendimiento del capital inmobiliario, con su factura.

${CTA}`,
  },
  {
    slug: 'servicio-gestion-integral-alquileres-rentable',
    title: 'Cómo montar un servicio de gestión integral de alquileres rentable',
    excerpt: 'Qué incluir, cuánto cobrar, cuántos pisos por gestor y qué procesos automatizar para que la gestión mensual sea un negocio y no un problema.',
    audience: A,
    category: 'Gestión de alquiler',
    publishedAt: D,
    body: `La gestión integral convierte un ingreso puntual (la comisión al alquilar) en un **ingreso recurrente**. Bien montada, estabiliza la agencia. Mal montada, se come el tiempo del equipo.

## Qué incluye una gestión integral

| Bloque | Tareas |
|---|---|
| Comercialización | Valoración, anuncio, visitas, selección |
| Contratación | Contrato, inventario, fianza, suministros |
| Día a día | Cobros, avisos, incidencias, proveedores |
| Final del contrato | Revisión, liquidación de fianza, nueva comercialización |
| Información | Informe mensual y anual para la renta del propietario |

## Cuánto cobrar

En el mercado español es habitual ver cuotas de gestión integral que se mueven en un **porcentaje de la renta mensual**, con variaciones según la ciudad, el número de pisos y lo que incluya el servicio. Más que copiar la cifra de la competencia, calcula tu coste:

1. Horas al mes por piso (cobros, incidencias, comunicaciones).
2. Coste por hora del equipo.
3. Herramientas (software, firma, verificación).
4. Margen que quieres obtener.

## Cuántos pisos por gestor

Depende de lo automatizado que esté el proceso. Con avisos de cobro automáticos, incidencias centralizadas y proveedores de confianza, un gestor puede llevar bastantes más pisos que con WhatsApp y hojas de cálculo.

## Procesos que conviene automatizar

- **Cobro por domiciliación** y aviso automático de cada pago.
- **Alerta el día 1** si un cobro falla.
- **Recogida de incidencias** con fotos y estado.
- **Informe mensual** al propietario.
- **Recordatorios** de actualización de renta y fin de contrato.

## Dónde se pierde dinero

- Incidencias sin protocolo: cada avería es una cadena de llamadas.
- Impagos sin procedimiento: se pierden semanas.
- Inquilinos mal seleccionados: la gestión de un mal inquilino consume más que diez buenos.

## Cómo encaja RentaHucha

RentaHucha cubre la parte que más tiempo y disgustos genera: **inquilinos verificados**, **avisos de pago**, **incidencias en un panel** y una **hucha anti-impago** que pasa al propietario si el inquilino deja de pagar. Tu agencia mantiene la relación con el propietario.

## El contrato de gestión: cláusulas clave

| Cláusula | Por qué importa |
|---|---|
| Servicios incluidos y excluidos | Evita discusiones sobre "eso no estaba" |
| Límite de gasto sin autorización | Puedes resolver averías pequeñas rápido |
| Cuenta de cobro y plazo de transferencia | Transparencia con el dinero del propietario |
| Informe periódico | Qué recibe y cuándo |
| Duración y preaviso de baja | Estabilidad para ambos |
| Protección de datos | Eres encargado del tratamiento de datos del propietario y del inquilino |

## Ejemplo de rentabilidad por piso

Ejemplo orientativo para una cartera tipo:

| Concepto | Al mes |
|---|---|
| Renta media del piso | 900 € |
| Cuota de gestión (ejemplo) | Porcentaje acordado sobre la renta |
| Horas de gestión por piso | 1,5 h |
| Coste por hora del equipo | Tu coste real |
| Herramientas por piso | Software, firma, verificación |

Si las horas por piso bajan de 3 a 1,5 gracias a procesos y herramientas, puedes gestionar el doble de pisos con el mismo equipo.

## Proveedores

Una red de proveedores de confianza (fontanero, electricista, cerrajero, técnico de calderas, limpieza) es la mitad del servicio. Acuerda:

- Precios orientativos por tipo de trabajo.
- Tiempos de respuesta para urgencias.
- Fotos del antes y el después.
- Facturación a nombre del propietario.

## Cómo escalar de 20 a 100 pisos

1. **Estandariza**: plantillas de contrato, inventario, informes y mensajes.
2. **Centraliza**: un único canal de incidencias y un panel con el estado de cada piso.
3. **Automatiza** cobros, avisos y recordatorios.
4. **Especializa** al equipo: comercialización por un lado y gestión por otro.
5. **Mide** los KPIs cada mes.

## Preguntas frecuentes

### ¿Qué es mejor, cobrar comisión o cuota mensual?
Muchas agencias combinan ambas: un alta reducida al alquilar y una cuota mensual. Así el ingreso no depende solo de la rotación.

### ¿Cómo evito que el propietario se vaya tras el primer contrato?
Con valor visible cada mes: informe, incidencias resueltas rápido y cero sorpresas en los cobros.

${CTA}`,
  },
  {
    slug: 'verificacion-de-inquilinos-rgpd-inmobiliarias',
    title: 'Verificación de inquilinos: cómo hacerla bien y dentro del RGPD',
    excerpt: 'Qué documentación pedir, cómo comprobar ingresos con el consentimiento del candidato y cuánto tiempo puedes guardar sus datos.',
    audience: A,
    category: 'Gestión de alquiler',
    publishedAt: D,
    body: `Elegir bien al inquilino es la mejor protección contra el impago. Pero pedir documentación tiene límites legales: el **Reglamento General de Protección de Datos (RGPD)** y la Ley Orgánica 3/2018.

## El principio clave: minimización

Pide **solo lo necesario** para valorar la solvencia y formalizar el contrato. Ni más, ni antes de tiempo.

| En la primera visita | Antes de firmar |
|---|---|
| Nombre, contacto, situación laboral general | DNI o NIE |
| Número de personas, fecha de entrada | Nóminas, contrato o declaración de la renta |
| Mascotas | Referencias, si el candidato las aporta |

## Cómo comprobar ingresos

1. **Documentación tradicional**: nóminas, contrato y vida laboral. Ojo con los documentos manipulados.
2. **Verificación bancaria con consentimiento (open banking)**: el candidato autoriza el acceso de lectura a sus movimientos a través de un proveedor regulado. Es más fiable y más rápido, y él controla qué comparte.
3. **Historial de alquileres previos**: un historial de pagos puntuales vale más que cualquier nómina. Es la idea del **pasaporte de inquilino** de RentaHucha.

## Lo que no debes hacer

- Pedir datos de salud, religión, ideología u orientación.
- Guardar fotocopias del DNI de todos los candidatos.
- Compartir la documentación con terceros sin informar.
- Enviar documentación por canales inseguros sin necesidad.

## Información que debes dar al candidato

- Quién es el responsable (tu agencia).
- Para qué usarás los datos (valorar su candidatura).
- Cuánto tiempo los guardarás.
- Cómo ejercer sus derechos.

## Cuánto tiempo guardarlos

- **Candidatos no elegidos**: borra su documentación en cuanto termine el proceso, salvo que necesites conservarla un tiempo breve por una razón justificada.
- **Inquilino elegido**: durante el contrato y, después, el tiempo de prescripción de las posibles reclamaciones.

## El ratio renta/ingresos

Es el indicador más usado. Se calcula así: renta mensual / ingresos netos mensuales del hogar.

| Ratio | Lectura habitual |
|---|---|
| Hasta el 30 % | Holgado |
| 30–35 % | Razonable |
| 35–40 % | Ajustado: mira el historial y los ahorros |
| Más del 40 % | Riesgo alto |

No es la única variable: la estabilidad de los ingresos y el historial de pagos pesan tanto como el ratio.

## Señales de documentos manipulados

- Tipografías o alineaciones distintas dentro del mismo documento.
- Importes redondos sin retenciones coherentes.
- Empresas que no aparecen en ningún registro.
- Fechas o cuentas que no cuadran entre documentos.
- Prisa extrema por firmar y pagar.

Ante la duda, la verificación bancaria con consentimiento del candidato elimina casi todo el riesgo de manipulación.

## Un proceso en cinco pasos

| Paso | Qué | Tiempo orientativo |
|---|---|---|
| 1 | Filtro previo por mensaje o llamada | Mismo día |
| 2 | Visita | 1–3 días |
| 3 | Documentación del candidato preseleccionado | 24–48 h |
| 4 | Verificación de ingresos e historial | 24 h |
| 5 | Ficha resumida al propietario y decisión | 24–48 h |

## Texto informativo para candidatos (orientativo)

> "Tus datos los trata [agencia] para valorar tu candidatura al alquiler de [dirección], con tu consentimiento y para aplicar medidas precontractuales a petición tuya. Solo los compartiremos con el propietario en forma de resumen. Si no eres seleccionado, los borraremos en [plazo]. Puedes ejercer tus derechos en [email]."

Adáptalo con tu asesor de protección de datos.

## Preguntas frecuentes

### ¿Puedo consultar ficheros de morosos?
Solo en los supuestos que permite la normativa y con las garantías previstas. Consulta con tu delegado de protección de datos o asesor.

### ¿Es legal pedir la declaración de la renta?
Sí, como alternativa a las nóminas para valorar la solvencia, siempre que sea proporcionado y la trates con seguridad.

### ¿Y si el candidato no quiere dar su documentación?
Puede negarse, y tú puedes no seguir con su candidatura. Ofrece alternativas, como la verificación bancaria, que suelen generar más confianza.

${CTA}`,
  },
  {
    slug: 'protocolo-impagos-cartera-inmobiliaria',
    title: 'Impagos en tu cartera: protocolo paso a paso para inmobiliarias',
    excerpt: 'Del día 1 a la demanda: qué hacer, cuándo y cómo documentarlo para que el propietario confíe en tu agencia incluso cuando algo sale mal.',
    audience: A,
    category: 'Gestión de alquiler',
    publishedAt: D,
    body: `Un impago bien gestionado puede **reforzar** la confianza del propietario en tu agencia. Uno mal gestionado lo hace irse, y contárselo a sus vecinos.

## Día 0: antes de que pase

- Selección rigurosa: el mejor impago es el que no ocurre.
- Cobro por domiciliación con fecha clara.
- Recordatorio unos días antes del cargo.

## Día 1: el cobro falla

1. **Aviso automático** al inquilino y al propietario.
2. **Llamada al inquilino**: ¿error del banco, retraso puntual o problema serio?
3. Si es un bache puntual, propón un **plan de pago corto** por escrito.

## Días 7 a 15: requerimiento

- Si no hay solución, **requerimiento fehaciente** de pago (burofax con certificación de contenido).
- Documenta todo: importes, fechas y comunicaciones.

## Antes de demandar

Desde la reforma de la justicia de 2025 (Ley Orgánica 1/2025), en la mayoría de procedimientos civiles hay que acreditar un **intento previo de negociación** (los llamados MASC). Tu requerimiento y el plan de pago propuesto forman parte de ese expediente. El abogado del propietario te dirá qué necesita exactamente.

## La protección del propietario

| Herramienta | Qué hace |
|---|---|
| Fianza y garantía adicional | Se aplican a las deudas al final del contrato |
| Hucha de RentaHucha | Si hay impago, su saldo pasa al propietario |
| Seguro de impago (si lo contrató él) | Paga según su póliza |

## Lo que nunca debes hacer (ni permitir)

- Cambiar la cerradura.
- Cortar suministros.
- Presionar al inquilino o a su familia.

Son conductas que pueden constituir delito de coacciones y complican el proceso.

## Comunicación con el propietario

- Avísale el mismo día.
- Explícale el plan y los plazos reales: los desahucios los decide un juzgado.
- Envíale un resumen escrito cada semana mientras dure.

## Mensaje del día 1 (plantilla)

> "Hola, [nombre]. El cargo del alquiler de [mes] no se ha podido completar. ¿Ha pasado algo con la cuenta? Si necesitas unos días, dímelo hoy y lo dejamos por escrito. Gracias."

Tono de ayuda, no de amenaza: la mayoría de retrasos se resuelven así.

## Qué debe incluir el requerimiento

- Identificación del contrato y de la vivienda.
- **Importe exacto** adeudado y meses a los que corresponde.
- **Plazo** para pagar y cuenta de pago.
- **Propuesta de acuerdo** (por ejemplo, un plan de pago), que sirve como intento de negociación previa.
- Aviso de que, si no se paga, el propietario podrá ejercer las acciones legales.

Lo redacta o revisa el abogado del propietario. Envíalo por burofax con certificación de contenido.

## Calendario tipo

| Día | Acción |
|---|---|
| 1 | Aviso automático y llamada |
| 3 | Propuesta de plan de pago por escrito |
| 7–15 | Requerimiento fehaciente con propuesta |
| 15–30 | Si no hay acuerdo, expediente al abogado |
| Después | Demanda y seguimiento semanal con el propietario |

## Si el inquilino es vulnerable

- Infórmale de los **servicios sociales** de su ayuntamiento y de las ayudas de emergencia.
- Documenta las comunicaciones: en el procedimiento se valorará la situación de vulnerabilidad.
- Explica al propietario los plazos reales y las posibles suspensiones.

Actuar con humanidad no es incompatible con proteger al propietario: suele acortar el conflicto.

## Preguntas frecuentes

### ¿Quién paga al abogado?
Normalmente el propietario, salvo que tenga un seguro de impago con defensa jurídica o hayáis pactado otra cosa en el contrato de gestión.

### ¿Puede la agencia presentar la demanda?
La demanda la presenta el propietario con abogado y procurador. La agencia aporta el expediente y la documentación.

${CTA}`,
  },
  {
    slug: 'normativa-inmobiliaria-alquiler-2027',
    title: 'Normativa que toda inmobiliaria de alquiler debe conocer para 2027',
    excerpt: 'LAU, Ley de Vivienda, zonas tensionadas, registro único, prevención de blanqueo, protección de datos y decretos de octubre: el mapa completo.',
    audience: A,
    category: 'Normativa',
    publishedAt: D,
    body: `El alquiler es uno de los sectores con más cambios normativos de los últimos años. Este es el mapa que debería conocer cualquier agencia.

## Las bases

| Norma | Lo esencial para una agencia |
|---|---|
| **LAU (Ley 29/1994)** | Duración (5 o 7 años), prórrogas, fianza, garantías, obras, desistimiento |
| **Ley 12/2023 de vivienda** | Gastos de gestión a cargo del propietario, zonas tensionadas, índice de referencia, gran tenedor |
| **Código Civil** | Alquileres no sujetos a la LAU (por ejemplo, plazas de garaje sueltas) |

## Novedades recientes

- **Zonas tensionadas**: límites a la renta de los contratos nuevos donde la comunidad autónoma las ha declarado.
- **Actualización de rentas**: para contratos firmados desde la Ley 12/2023, si se pacta actualización, el límite es el índice del INE para arrendamientos de vivienda (IRAV).
- **Registro único de arrendamientos** (Real Decreto 1312/2024): número de registro obligatorio para anunciar alquileres de corta duración (turísticos y de temporada, también por habitaciones).
- **Decretos de octubre de 2026**: prórrogas extraordinarias, límites a las subidas y reglas de temporada y habitaciones, pendientes de convalidación. Lee el [resumen de los decretos](/blog/decretos-de-vivienda-octubre-2026-explicados).
- **Reforma de la justicia (LO 1/2025)**: intento previo de negociación antes de muchas demandas civiles.

## Obligaciones de la agencia como empresa

- **Protección de datos**: registro de actividades, información a candidatos e inquilinos, seguridad.
- **Prevención del blanqueo de capitales** (Ley 10/2010): los agentes inmobiliarios son sujetos obligados en compraventas y en alquileres con renta mensual igual o superior a 10.000 €. Más detalle en [prevención de blanqueo en el alquiler](/blog/prevencion-blanqueo-alquiler-inmobiliarias).
- **Registro de agentes**: algunas comunidades, como Cataluña, exigen inscribirse en un registro de agentes inmobiliarios.
- **Consumo**: información precisa en anuncios, incluida la calificación energética.

## En la operación

- [ ] Certificado energético antes de anunciar
- [ ] Comprobar si la zona es tensionada
- [ ] Contrato conforme a la LAU vigente
- [ ] Fianza depositada en el organismo autonómico
- [ ] Inventario con fotos
- [ ] Número de registro si es corta duración

## Fechas clave

| Fecha | Qué |
|---|---|
| 1-7-2025 | Número de registro obligatorio para anunciar alquileres de corta duración |
| 7-10-2026 | Publicación de los decretos de vivienda |
| 16-10-2026 | Votación de convalidación prevista |
| 15-11-2026 | Entraría en vigor el decreto de estabilidad de contratos, si se convalida |
| 29-11-2026 | Elecciones generales |
| 31-12-2027 | Fin del límite temporal de las subidas, según el decreto |

Más fechas en el [calendario de la vivienda hasta 2030](/blog/calendario-vivienda-fechas-clave-hasta-2030).

## Qué pasa si cambia el Gobierno

Las leyes siguen vigentes hasta que otra norma las modifique o derogue. Un cambio de Gobierno puede traer nuevas leyes o decretos, pero necesitan su tramitación. Los contratos firmados se rigen, en general, por la norma vigente al firmar.

## Checklist anual de cumplimiento para tu agencia

- [ ] Plantillas de contrato revisadas con la normativa vigente
- [ ] Registro de actividades de tratamiento y contratos con proveedores actualizados
- [ ] Formación del equipo en novedades normativas
- [ ] Revisión de los anuncios: calificación energética y número de registro
- [ ] Procedimiento de prevención de blanqueo, si intermedias compraventas o alquileres de alta renta
- [ ] Inscripción en el registro de agentes, si tu comunidad lo exige
- [ ] Calendario de depósitos de fianzas al día

## Preguntas frecuentes

### ¿Dónde consulto si un municipio es zona tensionada?
En la resolución de la comunidad autónoma y en el listado del Ministerio de Vivienda.

### ¿Cada cuánto cambia la normativa?
En 2026 ha cambiado varias veces. Con elecciones generales el 29 de noviembre, revísala de nuevo cuando se forme Gobierno.

${CTA}`,
  },
  {
    slug: 'por-que-subir-tus-pisos-a-rentahucha',
    title: 'Por qué subir los pisos de tu inmobiliaria a RentaHucha',
    excerpt: 'Inquilinos verificados, hucha anti-impago para tus propietarios y gestión en un panel. Qué es, qué no es y cómo encaja con tu agencia.',
    audience: A,
    category: 'RentaHucha',
    publishedAt: D,
    body: `RentaHucha nace para alinear a propietarios e inquilinos: el inquilino que paga bien **ahorra**, y el propietario alquila con más **tranquilidad**. Para una inmobiliaria, eso se traduce en argumentos de captación y menos tiempo perdido.

## Qué te aporta

| Para tu agencia | Para tus propietarios | Para los inquilinos |
|---|---|---|
| Candidatos verificados | Inquilinos con incentivo para pagar | Entrar sin aval si su perfil lo permite |
| Menos visitas improductivas | Hucha que pasa a ellos si hay impago | Ahorro que recuperan con bonus |
| Cobros e incidencias en un panel | Avisos de cada pago | Pasaporte de buen inquilino |

## Cómo funciona la hucha

1. Cada mes, el inquilino aporta un pequeño porcentaje junto con la renta.
2. Ese dinero va a una cuenta **a su nombre**, abierta y custodiada por una entidad financiera autorizada. RentaHucha nunca guarda el dinero: gestiona las reglas.
3. Si hay un impago, el **saldo pasa al propietario**.
4. Si el inquilino termina sin deudas, la recupera con un **bonus**.

## Lo que RentaHucha no es

- **No es una aseguradora** ni vende, gestiona o intermedia seguros.
- No sustituye a la agencia: el propietario sigue siendo **tu cliente**.
- No cobra gestión al inquilino: la Ley 12/2023 la atribuye al propietario.

## Cómo se trabaja con una agencia

1. Te apuntas y nos cuentas tu cartera.
2. Subes tus pisos con sus condiciones.
3. Recibes candidatos verificados.
4. Firmas y gestionas cobros e incidencias desde el panel.

## Un ejemplo

Una agencia con 40 pisos en alquiler:

- Antes: visitas sin filtrar, nóminas por email y cobros comprobados a mano.
- Con RentaHucha: candidatos verificados, cobros con aviso automático, incidencias en un panel y, para cada propietario, una hucha que crece cada mes y que pasa a él si hay impago.

El equipo dedica menos tiempo a perseguir y más a captar.

## Lo que contamos a tus propietarios

- "Tu inquilino ha pasado una verificación de ingresos."
- "Cada mes aporta a una hucha que, si deja de pagar, pasa a ti."
- "Te avisamos de cada cobro y, si falla, actuamos el mismo día."
- "No es un seguro. Si quieres uno, puedes contratarlo además."

## Preguntas frecuentes

### ¿Cuánto cuesta para una inmobiliaria?
Estamos cerrando las condiciones para agencias. Las primeras de la lista entran con condiciones de lanzamiento.

### ¿Puedo seguir usando mis portales?
Sí. RentaHucha no te obliga a dejar tus canales.

### ¿Qué pasa si el propietario ya tiene un seguro de impago?
Es compatible: la hucha y la selección del inquilino suman.

${CTA}`,
  },
  {
    slug: 'como-explicar-la-hucha-anti-impago-a-un-propietario',
    title: 'Cómo explicar la hucha anti-impago a un propietario en dos minutos',
    excerpt: 'Un guion sencillo, con números, para que el propietario entienda qué gana con la hucha y por qué es distinta de la fianza.',
    audience: A,
    category: 'Captación',
    publishedAt: D,
    body: `El propietario medio conoce la fianza y ha oído hablar del seguro de impago. La hucha es nueva, así que conviene explicarla **en su idioma**.

## El guion

1. **El problema**: "La fianza es un mes. Si el inquilino deja de pagar, se queda corta."
2. **La idea**: "Con RentaHucha, el inquilino aporta cada mes un pequeño porcentaje a una hucha a su nombre."
3. **Lo que gana el propietario**: "Si hay impago, el saldo de esa hucha pasa a ti."
4. **Por qué el inquilino paga mejor**: "Si cumple, recupera su hucha con un bonus. Tiene algo que perder."
5. **Lo que no es**: "No es un seguro. Si quieres, puedes contratar uno aparte."

## Con números

| Renta | Aportación (4 %) | Hucha al año | A los dos años |
|---|---|---|---|
| 700 € | 28 € | 336 € | 672 € |
| 850 € | 34 € | 408 € | 816 € |
| 1.100 € | 44 € | 528 € | 1.056 € |

Es un ejemplo orientativo. En vivienda habitual, la garantía adicional más la hucha no pueden pasar de dos mensualidades.

## Las tres objeciones habituales

- **"Es poco dinero"**: crece cada mes y se suma a la fianza. Y su efecto principal es que el inquilino tiene un incentivo para pagar.
- **"¿Quién guarda el dinero?"**: una entidad financiera autorizada, en una cuenta a nombre del inquilino. Solo se mueve con las reglas firmadas: impago comprobado, o acuerdo de ambas partes o resolución si hay desperfectos.
- **"¿Y si quiero más protección?"**: puede contratar un seguro de impago por su cuenta. Son compatibles.

Más argumentos en [cómo ofrecer protección frente a impagos sin vender seguros](/blog/proteccion-impagos-sin-vender-seguros-inmobiliarias).

${CTA}`,
  },
  {
    slug: 'proteccion-impagos-sin-vender-seguros-inmobiliarias',
    title: 'Cómo ofrecer protección frente a impagos sin vender seguros',
    excerpt: 'Vender seguros exige estar inscrito como mediador. Alternativas legales para que tus propietarios alquilen más tranquilos.',
    audience: A,
    category: 'Captación',
    publishedAt: D,
    body: `Muchos propietarios piden "algo que les proteja del impago". La respuesta rápida es un seguro. Pero **distribuir seguros es una actividad regulada**: para intermediarlos, una agencia necesita estar inscrita como mediador o colaborador de un mediador, según la normativa de distribución de seguros.

## Alternativas que no son seguros

| Herramienta | Qué aporta |
|---|---|
| Selección rigurosa del inquilino | Reduce la probabilidad de impago |
| Garantía adicional (hasta dos meses en vivienda) | Más colchón al firmar |
| Aval bancario del inquilino | Garantía de una entidad financiera |
| Hucha de RentaHucha | El saldo pasa al propietario si hay impago |
| Protocolo de impago | Reacción el día 1 y expediente listo |

## Cómo presentarlo al propietario

1. **Prevención**: "Elegimos con datos y verificamos ingresos."
2. **Incentivo**: "El inquilino llena una hucha que pierde si no paga."
3. **Reacción**: "Si falla un pago, actuamos el mismo día."
4. **Opción extra**: "Si quieres además un seguro de impago, puedes contratarlo con la compañía que elijas."

## Lo que no conviene decir

- "Cobras siempre, pase lo que pase", si no hay una cobertura real que lo respalde.
- "El inquilino estará fuera en una semana": los plazos los fija un juzgado.

${CTA}`,
  },
  {
    slug: 'zonas-tensionadas-que-cambia-para-las-agencias',
    title: 'Zonas tensionadas: qué cambia para las inmobiliarias',
    excerpt: 'Límites de renta, grandes tenedores y la conversación con el propietario: cómo trabajar en municipios declarados tensionados.',
    audience: A,
    category: 'Normativa',
    publishedAt: D,
    body: `En las zonas de mercado residencial tensionado (Ley 12/2023), la renta de los contratos nuevos está limitada. Para una agencia, cambia la **valoración**, la **captación** y la **conversación** con el propietario.

## Qué comprobar en cada piso

- [ ] ¿El municipio o barrio está declarado tensionado?
- [ ] ¿Cuál fue la renta del último contrato en los últimos cinco años?
- [ ] ¿El propietario es gran tenedor (en general, más de 10 viviendas, o más de 5 en la zona si así se declara)?
- [ ] ¿Qué dice el índice de referencia para esa vivienda?

## Cómo cambia la valoración

| Propietario | Contrato nuevo |
|---|---|
| Pequeño propietario | En general, sin superar la renta del contrato anterior, con los ajustes previstos |
| Gran tenedor | Límite por el índice de referencia |
| Vivienda sin alquilar en los últimos cinco años | Puede aplicar el índice, según la declaración |

## La conversación con el propietario

- Explica el límite **antes** de que se ilusione con una cifra.
- Enséñale las **ventajas fiscales**: en zona tensionada hay reducciones del IRPF de hasta el 90 % en ciertos casos.
- Destaca lo que sí controla: **calidad del inquilino** y **tiempo vacío**.

## Errores que vemos

- Anunciar por encima del límite.
- Usar el alquiler de temporada para esquivar el tope.
- No documentar la renta anterior.

${CTA}`,
  },
  {
    slug: 'alquiler-de-temporada-guia-para-agencias',
    title: 'Alquiler de temporada para agencias: cómo hacerlo bien con las nuevas reglas',
    excerpt: 'Causa justificada, duración, fianza, registro único y límites a encadenar contratos. Lo que tu agencia necesita revisar en cada operación.',
    audience: A,
    category: 'Normativa',
    publishedAt: D,
    body: `El alquiler de temporada ha crecido mucho y está en el punto de mira. Hacerlo bien protege al propietario y a tu agencia.

## Requisitos de una temporada real

- Una **necesidad temporal** del inquilino: estudios, trabajo temporal, tratamiento médico, obras en su casa.
- El inquilino tiene su **vivienda habitual en otro lugar**.
- **Fianza de dos mensualidades** (uso distinto de vivienda).

## Las novedades

- **Registro único de arrendamientos**: para anunciar alquileres de temporada hace falta número de registro. Lee [quién debe registrarse](/blog/registro-unico-de-arrendamientos-quien-debe-registrarse).
- **Decreto de octubre de 2026** (pendiente de convalidación): de 31 días a 12 meses, causa justificada por el propietario y no más de dos contratos encadenados. Detalle en [las nuevas reglas de la temporada](/blog/alquiler-de-temporada-nuevas-reglas-12-meses).

## Checklist por operación

- [ ] Documento que acredite la causa temporal
- [ ] Causa y fechas en el contrato
- [ ] Número de registro en el anuncio
- [ ] Fianza de dos meses depositada si tu comunidad lo exige
- [ ] Inventario detallado (suelen ser pisos amueblados)

## Cuándo no es temporada

Si el inquilino va a vivir allí de forma estable, el contrato es de **vivienda habitual**, se llame como se llame. Un juzgado puede recalificarlo.

${CTA}`,
  },
  {
    slug: 'registro-unico-arrendamientos-agencias-temporada',
    title: 'Registro único de arrendamientos: lo que tu agencia debe hacer si anuncia temporada',
    excerpt: 'Número de registro, anuncios en plataformas y responsabilidades: guía rápida del Real Decreto 1312/2024 para inmobiliarias.',
    audience: A,
    category: 'Normativa',
    publishedAt: D,
    body: `El **Real Decreto 1312/2024** creó el Registro Único de Arrendamientos y la Ventanilla Única Digital de Arrendamientos. Desde el **1 de julio de 2025**, los alquileres de corta duración que se ofrecen en plataformas necesitan un **número de registro**.

## A qué afecta

- Alquiler **turístico**.
- Alquiler **de temporada** (por ejemplo, por estudios o trabajo).
- Alquiler **por habitaciones** de corta duración.

No afecta, en general, al alquiler de vivienda habitual de larga duración.

## Qué debe hacer la agencia

1. Comprobar que el piso tiene **número de registro** antes de anunciarlo como temporada.
2. Incluir el número en el **anuncio**.
3. Conservar la documentación del alquiler para las obligaciones de información periódica.

## Cómo se obtiene

Se solicita en el **Registro de la Propiedad** correspondiente, a través de la ventanilla digital, con los datos de la vivienda y del tipo de alquiler. Consulta los requisitos actualizados en el Colegio de Registradores.

## Errores a evitar

- Anunciar temporada sin número.
- Usar el número de un alquiler turístico para otro tipo de alquiler sin comprobar que cubre ese uso.

${CTA}`,
  },
  {
    slug: 'prevencion-blanqueo-alquiler-inmobiliarias',
    title: 'Prevención de blanqueo en el alquiler: cuándo afecta a tu inmobiliaria',
    excerpt: 'Los agentes inmobiliarios son sujetos obligados en compraventas y en alquileres de 10.000 € al mes o más. Qué implica y qué hacer.',
    audience: A,
    category: 'Normativa',
    publishedAt: D,
    body: `La **Ley 10/2010 de prevención del blanqueo de capitales** incluye a los agentes inmobiliarios entre los sujetos obligados. En el alquiler, la obligación se activa en operaciones de **renta mensual igual o superior a 10.000 €**.

## Qué implica ser sujeto obligado

- **Identificar** a los clientes y, en su caso, al titular real.
- Aplicar **medidas de diligencia debida** proporcionales al riesgo.
- **Conservar** la documentación durante el plazo legal.
- Contar con **políticas y procedimientos** internos.
- **Comunicar** al SEPBLAC las operaciones sospechosas.

## ¿Y en los alquileres normales?

En alquileres por debajo de ese umbral la Ley 10/2010 no te impone estas obligaciones por el alquiler en sí, pero:

- Si también intermedias **compraventas**, tu agencia ya es sujeto obligado por esa actividad.
- Es buena práctica identificar correctamente a las partes de cualquier contrato.

## Señales de alerta

- Pagos en efectivo de importes altos.
- Pagos desde cuentas de terceros sin explicación.
- Prisa extrema y poco interés por el piso.
- Estructuras societarias opacas.

Consulta con un experto en cumplimiento para adaptar tus procedimientos.

${CTA}`,
  },
  {
    slug: 'valoracion-de-alquiler-que-convence-al-propietario',
    title: 'Cómo hacer una valoración de alquiler que convence al propietario',
    excerpt: 'Comparables, índice de referencia, ajustes y tiempo vacío: la estructura de un informe de valoración que gana captaciones.',
    audience: A,
    category: 'Captación',
    publishedAt: D,
    body: `La valoración es el momento en que el propietario decide si confía en ti. Un buen informe **explica** el precio, no solo lo da.

## Estructura del informe

1. **Datos del piso**: superficie, habitaciones, estado, extras.
2. **Comparables**: 6 a 10 pisos similares en la zona, con precio por metro cuadrado.
3. **Índice de referencia**: lo que dice el sistema oficial para esa vivienda.
4. **Zona tensionada**: si aplica, el límite legal.
5. **Ajustes**: reforma, amueblado, ascensor, terraza, luz.
6. **Recomendación**: un precio de salida y un rango.
7. **Coste de esperar**: cuánto pierde por cada mes vacío.

## Ejemplo de coste de esperar

| Renta | Un mes vacío | Equivale a bajar al mes durante un año |
|---|---|---|
| 900 € | 900 € | 75 € |
| 1.200 € | 1.200 € | 100 € |

## Cómo presentarlo

- En persona o por videollamada, no solo por email.
- Con fotos de los comparables.
- Con un plan: precio de salida, revisión a los 15 días y fecha objetivo.

${CTA}`,
  },
  {
    slug: 'fotos-y-anuncios-que-alquilan-manual-agencias',
    title: 'Fotos y anuncios que alquilan: manual para agencias',
    excerpt: 'Un estándar de calidad para todos los pisos de tu cartera: número de fotos, orden, textos y datos obligatorios.',
    audience: A,
    category: 'Marketing inmobiliario',
    publishedAt: D,
    body: `Si cada comercial hace las fotos a su manera, tu marca pierde. Un **estándar** común sube la calidad de toda la cartera.

## Estándar de fotos

- Horizontal, desde la esquina, a la altura del pecho.
- Luces encendidas y persianas subidas.
- Entre 15 y 25 fotos, empezando por el salón.
- Plano siempre que sea posible.
- Sin personas, mascotas ni objetos personales.

## Estándar de texto

| Bloque | Contenido |
|---|---|
| Título | Tipo + habitaciones + rasgo + zona |
| Primer párrafo | Lo mejor del piso |
| Distribución | Habitaciones, baños, metros útiles |
| Equipamiento | Mobiliario, electrodomésticos, climatización |
| Condiciones | Renta, gastos, fianza, duración, disponibilidad |
| Obligatorio | Calificación energética y, en corta duración, número de registro |

## Edición e IA

Puedes mejorar la luz y el encuadre. Si usas **amueblado virtual**, indícalo claramente en la foto: el inquilino debe saber qué verá en la visita.

Más ideas en [fotos que alquilan con el móvil](/blog/fotos-que-alquilan-guia-con-el-movil).

${CTA}`,
  },
  {
    slug: 'portales-inmobiliarios-reducir-coste-por-contacto',
    title: 'Portales inmobiliarios: cómo reducir el coste por contacto de tu agencia',
    excerpt: 'Medir, priorizar y mejorar anuncios para pagar menos por cada candidato de calidad.',
    audience: A,
    category: 'Marketing inmobiliario',
    publishedAt: D,
    body: `Los portales son imprescindibles, pero caros. La clave no es estar en todos, sino **medir** qué te da cada uno.

## Mide tres números por portal

1. **Coste mensual** (suscripción y destacados).
2. **Contactos recibidos**.
3. **Contratos firmados** que vienen de ese portal.

Con eso calculas el coste por contacto y, lo más importante, el **coste por contrato**.

## Cómo mejorarlo

- **Mejores fotos y títulos**: más clics con el mismo gasto.
- **Destacados solo donde funcionan**: en pisos difíciles o al principio de la publicación.
- **Respuesta rápida**: las primeras horas concentran el interés.
- **Filtro previo automático**: preguntas básicas antes de dar visita.
- **Canales propios**: web, ficha de Google y lista de candidatos verificados.

## La lista de candidatos verificados

Cada candidato bueno que no se queda un piso es un candidato para el siguiente. Guárdalo, con su consentimiento, y avísale cuando entre algo que encaje. Es el contacto más barato que existe.

${CTA}`,
  },
  {
    slug: 'google-business-profile-inmobiliarias-resenas',
    title: 'Google Business Profile para inmobiliarias: reseñas y visibilidad local',
    excerpt: 'Cómo optimizar tu ficha de Google para aparecer en "inmobiliaria cerca de mí" y conseguir reseñas de propietarios.',
    audience: A,
    category: 'Marketing inmobiliario',
    publishedAt: D,
    body: `Cuando un propietario busca "inmobiliaria alquiler + barrio", la ficha de Google es lo primero que ve. Una ficha cuidada capta propietarios **sin pagar por cada clic**.

## Optimiza la ficha

- **Categoría principal** correcta (agencia inmobiliaria) y secundarias relevantes.
- **Horario** actualizado, también los festivos.
- **Fotos reales**: equipo, oficina y pisos gestionados.
- **Servicios**: gestión de alquiler, valoración, gestión integral.
- **Publicaciones** periódicas: novedades normativas, pisos alquilados, consejos.

## Reseñas: cómo conseguirlas

1. Pídelas en el **mejor momento**: tras una entrega de llaves o un problema bien resuelto.
2. Envía un **enlace directo**.
3. Pide reseñas a **propietarios y a inquilinos**.
4. **No las compres** ni ofrezcas incentivos por valoraciones positivas.

## Responder siempre

- Agradece las positivas, con detalle.
- Responde las negativas con calma y una solución. Lee [cómo responder a reseñas negativas](/blog/responder-resenas-negativas-inmobiliaria).

${CTA}`,
  },
  {
    slug: 'seo-local-inmobiliarias-alquilar-piso-ciudad',
    title: 'SEO local para inmobiliarias: cómo aparecer cuando buscan "alquilar mi piso en tu ciudad"',
    excerpt: 'Páginas por barrio, contenido útil, enlaces locales y datos estructurados: un plan de SEO realista para una agencia.',
    audience: A,
    category: 'Marketing inmobiliario',
    publishedAt: D,
    body: `Los propietarios buscan en Google antes de llamar a nadie. Si tu agencia aparece en esas búsquedas, captas **sin pagar por contacto**.

## Las búsquedas que importan

- "Alquilar mi piso en [ciudad]"
- "Gestión de alquileres [barrio]"
- "Cuánto puedo pedir por mi piso en [zona]"
- "Inmobiliaria de alquiler cerca de mí"

## Plan en cuatro bloques

### 1. Páginas locales
Una página por ciudad o barrio importante, con contenido propio: precios orientativos, tipos de vivienda y qué buscan los inquilinos de esa zona. Nada de copiar y pegar cambiando el nombre.

### 2. Contenido útil
Guías que resuelven dudas reales: normativa, impuestos, impagos. Un blog bien enlazado internamente posiciona mejor.

### 3. Ficha de Google
Optimizada y con reseñas. Mira [Google Business Profile para inmobiliarias](/blog/google-business-profile-inmobiliarias-resenas).

### 4. Enlaces locales
Asociaciones, medios del barrio, patrocinios y colaboraciones con gestorías.

## Aspectos técnicos

- Web rápida y adaptada a móvil.
- Un título y una descripción únicos por página.
- Datos estructurados (organización, artículos, preguntas frecuentes).
- Sitemap enviado a Google Search Console.

${CTA}`,
  },
  {
    slug: 'inteligencia-artificial-inmobiliaria-usos-y-limites',
    title: 'Inteligencia artificial en la inmobiliaria: usos útiles y límites legales',
    excerpt: 'Descripciones, respuestas automáticas, amueblado virtual y análisis de datos. Qué te ahorra tiempo y dónde tener cuidado.',
    audience: A,
    category: 'Tecnología',
    publishedAt: D,
    body: `La IA ya está en muchas agencias. Bien usada, ahorra horas. Mal usada, puede generar anuncios engañosos o problemas de protección de datos.

## Usos que ahorran tiempo

| Uso | Ejemplo |
|---|---|
| Redacción | Borradores de anuncios a partir de una ficha |
| Atención | Respuestas automáticas a preguntas frecuentes de candidatos |
| Imagen | Mejora de luz y encuadre; amueblado virtual etiquetado |
| Datos | Resumen de comparables para la valoración |
| Organización | Resúmenes de llamadas y tareas pendientes |

## Límites que debes respetar

- **Veracidad**: un anuncio no puede mostrar algo que el piso no tiene. Si usas amueblado virtual, indícalo.
- **Protección de datos**: no subas documentación de inquilinos a herramientas sin garantías ni contrato de encargo del tratamiento.
- **Decisiones automatizadas**: si una herramienta descarta candidatos de forma automática, el RGPD exige garantías y una revisión humana.
- **Reglamento europeo de IA**: aplica obligaciones progresivas según el riesgo del sistema. Revisa las de tus proveedores.

## Recomendación

Usa la IA para **preparar**, y una persona para **revisar y decidir**.

${CTA}`,
  },
  {
    slug: 'firma-electronica-contratos-alquiler-validez',
    title: 'Firma electrónica de contratos de alquiler: validez y buenas prácticas',
    excerpt: 'Tipos de firma, qué aceptan los juzgados y cómo guardar la evidencia para que tu contrato sea sólido.',
    audience: A,
    category: 'Tecnología',
    publishedAt: D,
    body: `Firmar online ahorra desplazamientos y acelera la entrada del inquilino. La firma electrónica es válida en España y en la UE (Reglamento eIDAS y Ley 6/2020).

## Tipos de firma

| Tipo | Qué es | Uso habitual |
|---|---|---|
| Simple | Clic, firma dibujada o código por SMS | Contratos de bajo riesgo |
| Avanzada | Vinculada al firmante de forma única, con evidencias | Contratos de alquiler |
| Cualificada | Con certificado cualificado | Máxima presunción de validez |

Para un contrato de alquiler, una **firma avanzada** de un proveedor fiable suele ser suficiente.

## Buenas prácticas

- **Identifica** al firmante: DNI, móvil y email verificados.
- Conserva el **documento de evidencias** (fechas, IP, verificaciones).
- Firma **todas las páginas**, anexos e inventario.
- Entrega a cada parte su **copia firmada**.

## Lo que no cambia

- El contrato debe cumplir la LAU.
- La fianza se deposita igual.

${CTA}`,
  },
]
