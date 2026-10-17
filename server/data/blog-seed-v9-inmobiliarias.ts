import type { BlogPost } from '#shared/utils/blog'

// Novena versión del contenido inicial: 12 artículos para inmobiliarias (captación en redes, emails, rentabilidad de
// cartera, formación y diferenciación). Sin cifras de mercado inventadas.

type Seed = Omit<BlogPost, 'updatedAt' | 'published'>
const D = '2026-10-17'
const A = 'inmobiliarias' as const
const CTA = `> **¿Gestionas pisos en alquiler?** Sube tu cartera a RentaHucha: inquilinos verificados y una hucha anti-impago que ofrecer a tus propietarios, sin vender seguros. [Apunta a tu inmobiliaria](/inmobiliarias#formulario).`

export const BLOG_SEED_V9_INMOBILIARIAS: Seed[] = [
  {
    slug: 'captar-propietarios-en-linkedin-y-redes',
    title: 'Cómo captar propietarios en LinkedIn y redes sociales',
    excerpt: 'Contenido útil, perfil profesional y mensajes que no suenan a anuncio: un método para que los propietarios te escriban a ti.',
    audience: A,
    category: 'Captación',
    publishedAt: D,
    body: `Las redes no sirven para "publicar pisos": sirven para que los propietarios **confíen en ti** antes de necesitarte.

## 1. Perfil que inspira confianza
- Foto profesional y nombre real.
- Titular claro: "Ayudo a propietarios de [zona] a alquilar con inquilinos verificados".
- Reseñas y casos reales, con permiso.

## 2. Contenido que atrae propietarios
| Formato | Ejemplo |
|---|---|
| Explicación corta | "Qué cambia con el decreto de vivienda, en 60 segundos" |
| Caso real | "Cómo alquilamos un piso heredado en 12 días" |
| Números | "Lo que cuesta un mes vacío frente a bajar 30 € la renta" |
| Pregunta frecuente | "¿Puedo recuperar mi piso si lo necesito?" |

## 3. Constancia
Dos o tres publicaciones a la semana durante meses funcionan mejor que una campaña intensa de una semana.

## 4. Mensajes directos sin agobiar
> Hola, [nombre]. Vi que comentaste sobre la nueva normativa de alquiler. Si en algún momento quieres una valoración de tu piso con datos de [zona], estaré encantado de ayudarte.

## 5. Mide
Mensajes recibidos, valoraciones pedidas y captaciones firmadas que vienen de redes.

${CTA}`,
  },
  {
    slug: 'email-a-propietarios-que-consigue-llamadas',
    title: 'El email que consigue que un propietario te llame (plantillas)',
    excerpt: 'Asuntos, estructura y tres plantillas para propietarios con piso vacío, heredado o con un inquilino que se va.',
    audience: A,
    category: 'Captación',
    publishedAt: D,
    body: `## Reglas de oro
- **Asunto concreto**: "Valoración del alquiler de tu piso en [barrio]".
- **Una sola petición**: una llamada de 15 minutos.
- **Corto**: se lee en 30 segundos.
- **Protección de datos**: escribe solo a quien te haya dado su contacto o con base legal para hacerlo.

## Plantilla 1: piso vacío
> Hola, [nombre]: tener un piso vacío cuesta IBI, comunidad y seguro cada mes. Te propongo una valoración con datos de [barrio] y te explico cómo elegimos a inquilinos verificados. ¿Te viene bien una llamada de 15 minutos esta semana?

## Plantilla 2: piso heredado
> Hola, [nombre]: sé que gestionar un piso heredado entre varios hermanos es complicado. Podemos encargarnos del alquiler y enviaros a todos un informe mensual. ¿Lo hablamos?

## Plantilla 3: el inquilino se va
> Hola, [nombre]: si tu inquilino ha avisado de que se va, tienes tiempo para que el siguiente entre sin meses vacíos. Te cuento cómo lo hacemos en 15 minutos.

## Seguimiento
Si no responde, un segundo email a los 5–7 días con un contenido útil (una guía, un dato normativo). No más.

${CTA}`,
  },
  {
    slug: 'diferenciar-tu-inmobiliaria-2027',
    title: 'Cómo diferenciar tu inmobiliaria en 2027: 9 ideas',
    excerpt: 'Si todas las agencias prometen lo mismo, gana la que lo demuestra. Ideas concretas para destacar en alquiler.',
    audience: A,
    category: 'Negocio',
    publishedAt: D,
    body: `1. **Especialízate**: un barrio, un tipo de vivienda o un tipo de propietario.
2. **Transparencia total**: informe mensual, cobros visibles e incidencias documentadas.
3. **Velocidad**: responde a candidatos y propietarios el mismo día.
4. **Selección con datos**: verificación de ingresos y del historial de pagos.
5. **Protección frente a impagos** sin vender seguros: la hucha de RentaHucha pasa al propietario si hay impago.
6. **Contenido local** que responda a dudas reales.
7. **Asesoramiento normativo** cuando cambia la ley.
8. **Reseñas** recientes de propietarios e inquilinos.
9. **Precio claro**: qué incluye y qué no, sin letra pequeña.

## Cómo elegir por dónde empezar
Pregunta a tus últimos diez propietarios por qué te eligieron y qué les preocupa. Ahí está tu diferencia.

${CTA}`,
  },
  {
    slug: 'captar-pisos-de-herencias-notarias-gestorias',
    title: 'Captar pisos de herencias: alianzas con notarías y gestorías',
    excerpt: 'Los herederos necesitan ayuda práctica. Cómo crear alianzas profesionales que te deriven propietarios.',
    audience: A,
    category: 'Captación',
    publishedAt: D,
    body: `Muchos pisos que salen al alquiler vienen de herencias. Los herederos suelen tener prisa, poco tiempo y desacuerdos.

## Con quién aliarte
- **Gestorías** que tramitan herencias.
- **Abogados** de familia y sucesiones.
- **Asesores fiscales**.
- **Administradores de fincas**.

## Qué ofrecerles
- Una **guía práctica** para sus clientes: alquilar o vender, pasos y costes.
- **Valoraciones** rápidas y gratuitas.
- Un **interlocutor único** para varios herederos.

## Cómo mantener la alianza
- Informa al profesional del resultado (con permiso del cliente).
- Deriva tú también clientes cuando necesiten sus servicios.

Puedes compartir con los herederos [alquilar un piso heredado entre hermanos](/blog/alquilar-piso-heredado-entre-hermanos).

${CTA}`,
  },
  {
    slug: 'cuantos-pisos-necesita-tu-cartera-para-ser-rentable',
    title: '¿Cuántos pisos necesita tu cartera de alquiler para ser rentable?',
    excerpt: 'Una fórmula sencilla con tus costes, tu cuota y las horas por piso para saber cuál es tu punto de equilibrio.',
    audience: A,
    category: 'Negocio',
    publishedAt: D,
    body: `## La fórmula

**Pisos necesarios = costes fijos mensuales / margen mensual por piso**

Donde el margen por piso es: cuota mensual por piso − coste variable por piso (horas de gestión × coste por hora + herramientas).

## Ejemplo con números redondos

| Concepto | Valor de ejemplo |
|---|---|
| Costes fijos (oficina, sueldo base, software) | 4.000 € al mes |
| Renta media | 900 € |
| Cuota de gestión (ejemplo) | 6 % = 54 € |
| Coste variable por piso | 20 € |
| Margen por piso | 34 € |
| **Pisos para cubrir costes** | **≈ 118** |

Cambia los valores por los tuyos: el resultado varía mucho.

## Cómo mejorar el resultado
- **Bajar las horas por piso**: procesos y herramientas.
- **Ingresos por alta** al alquilar, además de la cuota mensual.
- **Retener** propietarios: cada baja te aleja del equilibrio.

Más en [cómo montar una gestión integral rentable](/blog/servicio-gestion-integral-alquileres-rentable).

${CTA}`,
  },
  {
    slug: 'videos-de-pisos-para-redes-guion-30-segundos',
    title: 'Vídeos de pisos para redes: guion de 30 segundos',
    excerpt: 'Un guion probado para enseñar un piso en vídeo vertical: gancho, recorrido, datos y llamada a la acción.',
    audience: A,
    category: 'Marketing inmobiliario',
    publishedAt: D,
    body: `| Segundos | Qué enseñar | Qué decir o escribir |
|---|---|---|
| 0–3 | La mejor estancia o la vista | Gancho: "Piso luminoso con terraza a 5 min del metro" |
| 3–15 | Recorrido rápido: salón, cocina, dormitorios, baño | Datos en pantalla: m², habitaciones |
| 15–25 | Detalles que diferencian | "Reformado", "aire acondicionado", "trastero" |
| 25–30 | Renta y llamada a la acción | "850 €/mes. Escríbenos para visitarlo" |

## Consejos
- Graba en **vertical**, con luz natural.
- Movimientos lentos y estables.
- **Subtítulos**: muchos ven sin sonido.
- Calificación energética en el texto de la publicación.
- No muestres datos ni objetos personales de inquilinos.

${CTA}`,
  },
  {
    slug: 'formar-comercial-de-alquiler-en-30-dias',
    title: 'Cómo formar a un comercial de alquiler en 30 días',
    excerpt: 'Un plan de formación por semanas: normativa básica, proceso, herramientas y acompañamiento en visitas y captaciones.',
    audience: A,
    category: 'Negocio',
    publishedAt: D,
    body: `| Semana | Contenido | Resultado esperado |
|---|---|---|
| 1 | LAU, Ley 12/2023, zonas tensionadas, protección de datos | Responde a las dudas básicas de propietarios |
| 2 | Proceso de la agencia: valoración, anuncio, selección, firma | Prepara una valoración y un anuncio |
| 3 | Visitas y selección acompañado | Lleva visitas y presenta candidatos |
| 4 | Captación: llamadas, objeciones, primera reunión | Hace sus primeras captaciones con supervisión |

## Material imprescindible
- [Guion de llamada para captar](/blog/guion-de-llamada-captar-piso-alquiler).
- [Respuestas a objeciones](/blog/objeciones-de-propietarios-y-como-responderlas).
- [Normativa de alquiler](/blog/normativa-inmobiliaria-alquiler-2027).

## Cómo evaluarlo
Valoraciones hechas, visitas, candidatos presentados y captaciones. Y, sobre todo, la opinión de los propietarios que atiende.

${CTA}`,
  },
  {
    slug: 'atencion-al-inquilino-servicio-que-retiene-propietarios',
    title: 'La atención al inquilino: el servicio que hace que el propietario se quede',
    excerpt: 'Un inquilino bien atendido paga mejor, cuida el piso y se queda más. Por qué es tu mejor argumento de retención.',
    audience: A,
    category: 'Gestión de alquiler',
    publishedAt: D,
    body: `Muchas agencias se centran en el propietario y olvidan al inquilino. Error: el inquilino es quien vive el servicio cada día.

## Lo que más valora el inquilino
- Que **le contesten** cuando algo se rompe.
- **Plazos claros** para las reparaciones.
- **Trato respetuoso** y sin entradas sin aviso.
- **Fianza devuelta** a tiempo al final.

## Por qué beneficia al propietario
- Un inquilino contento **se queda más**: menos meses vacíos.
- **Cuida** el piso.
- **Paga** con menos retrasos.

## Un incentivo extra
Con la hucha de RentaHucha, el inquilino que cumple recupera su ahorro con bonus: tiene un motivo más para pagar a tiempo y cuidar la vivienda.

${CTA}`,
  },
  {
    slug: 'explicar-zona-tensionada-al-propietario-guion',
    title: 'Cómo explicar el límite de la zona tensionada a un propietario (guion)',
    excerpt: 'Una conversación incómoda bien llevada: datos, alternativas y ventajas fiscales en cinco pasos.',
    audience: A,
    category: 'Normativa',
    publishedAt: D,
    body: `## 1. Empieza por los hechos
"Tu municipio está declarado zona tensionada desde [fecha]. Eso limita la renta del nuevo contrato."

## 2. Enseña el cálculo
"El contrato anterior era de [importe]. Con la normativa, la nueva renta no puede superar [importe], salvo las excepciones previstas."

## 3. Muestra las ventajas
"En zona tensionada, la reducción del IRPF puede llegar al 70 % o al 90 % en ciertos casos."

## 4. Habla de lo que sí controla
"Lo que sí podemos mejorar es el tiempo vacío y la calidad del inquilino."

## 5. Cierra con un plan
"Te propongo publicarlo a [importe], con fotos nuevas, y revisar los resultados en 15 días."

Más contexto en [zonas tensionadas: qué cambia para las agencias](/blog/zonas-tensionadas-que-cambia-para-las-agencias).

${CTA}`,
  },
  {
    slug: 'usar-el-blog-de-tu-inmobiliaria-para-captar',
    title: 'Cómo usar el blog de tu inmobiliaria para captar propietarios',
    excerpt: 'Qué temas escribir, con qué frecuencia y cómo convertir lectores en valoraciones. Con un ejemplo de calendario.',
    audience: A,
    category: 'Marketing inmobiliario',
    publishedAt: D,
    body: `## Qué escribir
Responde a lo que los propietarios buscan en Google sobre tu zona:
- "Cuánto puedo pedir por mi piso en [barrio]"
- "Cómo alquilar un piso heredado en [ciudad]"
- "Zona tensionada en [municipio]: qué cambia"

## Con qué frecuencia
Mejor **un artículo útil a la semana** durante un año que diez en un mes y luego nada.

## Calendario de ejemplo (un mes)

| Semana | Tema |
|---|---|
| 1 | Guía local de precios orientativos por zonas |
| 2 | Novedad normativa explicada |
| 3 | Caso real (con permiso) |
| 4 | Pregunta frecuente de propietarios |

## Convertir lectores en clientes
- Un **llamado a la acción** al final de cada artículo: "Pide tu valoración".
- **Formularios** cortos.
- **Enlaces** entre artículos relacionados.

Mira cómo lo hacemos en [el blog para inmobiliarias de RentaHucha](/blog?para=inmobiliarias).

${CTA}`,
  },
  {
    slug: 'errores-de-precio-que-hacen-perder-captaciones',
    title: 'Errores de precio que hacen perder captaciones (y clientes)',
    excerpt: 'Inflar la valoración para captar, no revisar a tiempo y olvidar la normativa: cómo afectan a tu reputación.',
    audience: A,
    category: 'Captación',
    publishedAt: D,
    body: `1. **Inflar la valoración para ganar el encargo.** El piso no se alquila, el propietario se frustra y te deja.
2. **No revisar el precio a los 15 días.** Cada semana sin interés es renta perdida para tu cliente.
3. **Ignorar la zona tensionada.** Publicar por encima del límite te expone a problemas.
4. **Valorar sin comparables reales.** El propietario confía más en los datos que en la intuición.
5. **No explicar el coste de esperar.** Un mes vacío suele pesar más que una pequeña rebaja.

## La alternativa honesta
Valoración con datos, precio de salida con una fecha de revisión pactada y seguimiento semanal. Más en [cómo hacer una valoración que convence](/blog/valoracion-de-alquiler-que-convence-al-propietario).

${CTA}`,
  },
  {
    slug: 'propietarios-con-hucha-mas-fieles-a-su-agencia',
    title: 'Por qué la hucha anti-impago ayuda a retener propietarios en tu agencia',
    excerpt: 'Un propietario que alquila tranquilo tiene menos motivos para irse. Cómo la hucha refuerza tu servicio sin vender seguros.',
    audience: A,
    category: 'RentaHucha',
    publishedAt: D,
    body: `Los propietarios suelen dejar una agencia tras un mal momento: un impago mal llevado, una avería que tardó o un mes vacío. La hucha ayuda en el más temido.

## Cómo funciona para el propietario
- El inquilino aporta cada mes un pequeño porcentaje a una hucha a su nombre, custodiada por una entidad financiera autorizada.
- Si hay un **impago comprobado**, se paga al propietario la cantidad pendiente con el saldo de la hucha.
- Si el alquiler termina sin incidencias, el inquilino la recupera con bonus.

## Por qué refuerza tu servicio
- **Argumento de captación**: algo concreto que ofrecer frente al miedo al impago.
- **Inquilinos con incentivo** para pagar y cuidar el piso.
- **Sin vender seguros**: no necesitas ser mediador.
- **Menos conflictos**: las reglas se firman al inicio.

## Lo que no es
No es un seguro ni garantiza la renta: cubre hasta el saldo acumulado. El propietario puede contratar además un seguro de impago si quiere.

${CTA}`,
  },
]
