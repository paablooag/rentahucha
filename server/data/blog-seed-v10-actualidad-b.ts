import type { BlogPost } from '#shared/utils/blog'

// Décima versión del contenido inicial (II): hoteles, Airbnb y pisos turísticos, turismo y actualidad para
// propietarios e inmobiliarias. Datos atribuidos a su fuente (INE vía prensa, Ministerios, tribunales). Situación a 18-10-2026.

type Seed = Omit<BlogPost, 'updatedAt' | 'published'>
const D = '2026-10-18'
const AL_DIA = `> **Actualizado a 18 de octubre de 2026.** Consulta las fuentes oficiales para las novedades.`
const CTA_INQ = `¿Buscas piso para quedarte? Con RentaHucha alquilas con una hucha que recuperas con bonus. [Apúntate](/apuntate?tipo=inquilino#formulario).`
const CTA_PROP = `¿Pasas tu piso al alquiler de larga duración? Alquílalo a inquilinos verificados y con una hucha que responde si hay impago. [Apúntate](/apuntate?tipo=propietario#formulario).`
const CTA_INMO = `> **¿Gestionas pisos en alquiler?** Sube tu cartera a RentaHucha: inquilinos verificados y una hucha anti-impago para tus propietarios, sin vender seguros. [Apunta a tu inmobiliaria](/inmobiliarias#formulario).`

export const BLOG_SEED_V10_ACTUALIDAD_B: Seed[] = [
  {
    slug: 'hoteles-en-maximos-por-que-nunca-habia-costado-tanto',
    title: 'Hoteles en máximos: por qué dormir en un hotel nunca había costado tanto',
    excerpt: 'Según datos del INE recogidos por la prensa, la tarifa media hotelera marcó récord en el verano de 2026. Qué hay detrás y qué tiene que ver con la vivienda.',
    audience: 'propietarios',
    category: 'Turismo',
    publishedAt: D,
    body: `Dormir en un hotel en España nunca había sido tan caro, según los datos del Instituto Nacional de Estadística (INE) recogidos por la prensa en 2026.

${AL_DIA}

## Los datos publicados

| Periodo | Tarifa media por habitación (según la prensa, con datos del INE) |
|---|---|
| Primer trimestre de 2026 | 143,4 € |
| Julio de 2026 | 156,9 € |
| Agosto de 2026 | 166,9 €, el máximo de la serie y un 7,3 % más que en agosto de 2025 |

En julio, la ocupación media fue del 71,1 % de las plazas, según esos mismos datos. Las cifras de variación difieren ligeramente entre medios.

## Qué hay detrás

La demanda turística sigue alta y la oferta en los destinos más buscados es limitada. A la vez, el alquiler turístico en viviendas está más regulado: registro obligatorio, retirada de anuncios ilegales y más control municipal.

## Qué tiene que ver con la vivienda

El debate sobre el turismo y la vivienda gira en torno a cuántas viviendas se destinan a uso turístico y cuántas a residencia. Lee [hoteles y pisos turísticos: el debate](/blog/hoteles-y-pisos-turisticos-el-debate-y-la-normativa).

## Si tienes un piso turístico

Con más regulación, puede interesarte comparar con el alquiler de larga duración: [haz los números](/blog/piso-turistico-o-larga-duracion-haz-los-numeros-2027).

${CTA_PROP}`,
  },
  {
    slug: 'hoteles-y-pisos-turisticos-el-debate-y-la-normativa',
    title: 'Hoteles y pisos turísticos: el debate y lo que dice la normativa',
    excerpt: 'Competencia, vivienda y regulación: los argumentos de cada parte y las reglas que se aplican hoy, sin tomar partido.',
    audience: 'propietarios',
    category: 'Turismo',
    publishedAt: D,
    body: `El alojamiento turístico en viviendas lleva años en el centro del debate. Estas son las posiciones habituales y lo que dice hoy la normativa.

## Los argumentos que se escuchan

| Parte | Argumento habitual |
|---|---|
| Sector hotelero | Pide igualdad de condiciones y más control de la oferta ilegal |
| Plataformas y propietarios de pisos turísticos | Defienden una regulación proporcionada y el derecho a usar su vivienda |
| Movimientos vecinales y de inquilinos | Señalan el efecto del turismo en la oferta de vivienda de larga duración |
| Administraciones | Combinan registro, licencias y limitaciones por zonas |

## Lo que dice la normativa hoy

- **Licencia o autorización** autonómica o municipal para la vivienda de uso turístico.
- **Registro único de arrendamientos** y número en el anuncio, obligatorio desde julio de 2025 para los alquileres de corta duración.
- **Comunidad de propietarios**: desde 2025, los nuevos pisos turísticos necesitan la aprobación previa de la comunidad. Lee [la comunidad ya puede vetar pisos turísticos](/blog/comunidad-de-vecinos-puede-vetar-pisos-turisticos).
- **Fiscalidad**: el decreto de octubre de 2026 prevé IVA del 10 % en ciertos alquileres turísticos y recargos de IBI, si se mantiene.

${CTA_PROP}`,
  },
  {
    slug: 'airbnb-multa-64-millones-que-paso',
    title: 'La multa de 64 millones a Airbnb: qué pasó y qué significa',
    excerpt: 'Consumo sancionó a Airbnb por anunciar alojamientos sin licencia y la justicia denegó suspender el pago. Los hechos, en orden.',
    audience: 'propietarios',
    category: 'Turismo',
    publishedAt: D,
    body: `${AL_DIA}

## Los hechos

| Fecha | Qué pasó (según la información publicada) |
|---|---|
| Diciembre de 2025 | El Ministerio de Consumo multa a Airbnb por publicar anuncios de alojamientos turísticos sin licencia |
| Importe | La sanción principal ronda los 64 millones de euros, más otras dos de menor cuantía |
| Marzo de 2026 | El Tribunal Superior de Justicia de Madrid deniega las medidas cautelares que pedía Airbnb para no pagar mientras recurre |
| Después | Airbnb anunció que seguiría recurriendo y considera la sanción contraria al marco legal español y europeo |

## Qué significa para los propietarios

- Anunciar un piso turístico **sin licencia ni número de registro** expone al propietario y a la plataforma.
- Las plataformas están retirando anuncios que no cumplen. Lee [por qué desaparecieron miles de anuncios](/blog/registro-unico-airbnb-por-que-desaparecieron-anuncios).
- Antes de anunciar, revisa los [requisitos para tener un piso en Airbnb](/blog/es-legal-tener-un-piso-en-airbnb-requisitos-2027).

## Un apunte

Es un procedimiento con recursos pendientes según la información publicada: su resultado final puede cambiar.

${CTA_PROP}`,
  },
  {
    slug: 'registro-unico-airbnb-por-que-desaparecieron-anuncios',
    title: 'Registro único y Airbnb: por qué desaparecieron miles de anuncios',
    excerpt: 'Desde julio de 2025, los alquileres de corta duración necesitan número de registro. Qué acordaron el Gobierno y las plataformas y cuántos anuncios se retiraron.',
    audience: 'propietarios',
    category: 'Turismo',
    publishedAt: D,
    body: `Desde el **1 de julio de 2025**, para anunciar un alquiler de corta duración (turístico, de temporada o por habitaciones) hace falta un número del **Registro Único de Arrendamientos** (Real Decreto 1312/2024).

## Lo que pasó en 2025

| Momento | Según la información oficial y de prensa |
|---|---|
| Julio de 2025 | El Ministerio de Vivienda acuerda con Airbnb la retirada de anuncios sin código de registro válido |
| Julio de 2025 | Tras requerimientos de Consumo, se retiran unos 65.000 anuncios de alojamientos sin licencia |
| Septiembre de 2025 | Vivienda notifica más de 53.500 pisos turísticos cuya solicitud de registro no prosperó para que se retiren sus anuncios |

## Cómo funciona ahora

- La plataforma recibe los números de registro y retira los anuncios irregulares.
- Normalmente se avisa antes al anfitrión para que subsane los defectos; si el número está revocado, la retirada es rápida.

## Si tienes un piso en una plataforma

Comprueba que tu número de registro es válido y corresponde al tipo de alquiler que ofreces. Lee [quién debe registrarse](/blog/registro-unico-de-arrendamientos-quien-debe-registrarse).

${CTA_PROP}`,
  },
  {
    slug: 'es-legal-tener-un-piso-en-airbnb-requisitos-2027',
    title: '¿Es legal tener un piso en Airbnb en 2027? Requisitos básicos',
    excerpt: 'Licencia, registro, comunidad de propietarios, impuestos y normas municipales: la lista para no tener problemas.',
    audience: 'propietarios',
    category: 'Turismo',
    publishedAt: D,
    body: `Sí, es legal si cumples los requisitos. Estos son los básicos; cada comunidad autónoma y ayuntamiento añade los suyos.

## Checklist

- [ ] **Licencia o autorización** de vivienda de uso turístico de tu comunidad o ayuntamiento
- [ ] **Zona permitida** según el planeamiento municipal (muchas ciudades limitan por barrios)
- [ ] **Aprobación de la comunidad** de propietarios para nuevos pisos turísticos (desde 2025)
- [ ] **Número del Registro Único** en el anuncio
- [ ] **Registro de viajeros** ante las autoridades
- [ ] **Impuestos**: IRPF y, en su caso, IVA; revisa los cambios del decreto de octubre de 2026
- [ ] **Seguro** adecuado al uso turístico
- [ ] **Normas de convivencia** para los huéspedes

## Si no cumples alguno

Sanciones autonómicas o municipales, retirada del anuncio y conflictos con la comunidad.

## La alternativa

Muchos propietarios están pasando al alquiler de larga duración por la carga de trámites. Lee [piso turístico o larga duración: haz los números](/blog/piso-turistico-o-larga-duracion-haz-los-numeros-2027).

${CTA_PROP}`,
  },
  {
    slug: 'comunidad-de-vecinos-puede-vetar-pisos-turisticos',
    title: 'La comunidad de vecinos ya puede vetar los nuevos pisos turísticos',
    excerpt: 'Desde abril de 2025, abrir un piso turístico en un edificio requiere la aprobación previa de la comunidad. Cómo funciona.',
    audience: 'propietarios',
    category: 'Turismo',
    publishedAt: D,
    body: `La Ley Orgánica 1/2025 reformó la **Ley de Propiedad Horizontal**: desde abril de 2025, quien quiera destinar su vivienda a uso turístico necesita la **aprobación expresa de la junta de propietarios**.

## Cómo funciona, en general

- La decisión requiere una **mayoría reforzada** de propietarios y cuotas (tres quintas partes).
- Afecta a los **nuevos** pisos turísticos; los que ya tenían licencia antes de la reforma tienen su propio régimen.
- La comunidad también puede acordar condiciones o cuotas especiales, dentro de los límites de la ley.

## Si eres propietario y quieres abrir un piso turístico

1. Consulta los **estatutos** de la comunidad.
2. Solicita que el tema se incluya en el orden del día de la **junta**.
3. Si se aprueba, tramita después la **licencia** y el **registro**.

## Si eres vecino

Puedes plantear el tema en la junta y, ante actividades molestas o ilegales, informar al administrador y al ayuntamiento.

Consulta con tu administrador de fincas o un abogado para tu caso concreto.

${CTA_PROP}`,
  },
  {
    slug: 'piso-turistico-o-larga-duracion-haz-los-numeros-2027',
    title: 'Piso turístico o alquiler de larga duración en 2027: haz los números',
    excerpt: 'Una plantilla para comparar ingresos netos, gastos, impuestos y horas de trabajo de los dos modelos con tus propios datos.',
    audience: 'propietarios',
    category: 'Rentabilidad',
    publishedAt: D,
    body: `Más regulación, multas y trámites están llevando a muchos propietarios a replantearse el piso turístico. La decisión depende de tus números, no de los titulares.

## Plantilla de comparación (anual)

| Concepto | Turístico | Larga duración |
|---|---|---|
| Ingresos (noches × precio × ocupación / renta × 12) | | |
| Comisión de la plataforma o gestión | | |
| Limpieza y lavandería | | — |
| Suministros e internet | | Normalmente a cargo del inquilino |
| Reposición de menaje y desgaste | | Menor |
| Licencias, registro y tasas | | — |
| Impuestos (IRPF, IVA si aplica) | | IRPF con reducción del 50 % al 90 % |
| Horas de tu tiempo | Muchas | Pocas |
| **Neto** | | |

## Preguntas clave
- ¿Qué ocupación real tienes fuera de temporada alta?
- ¿Tu comunidad o tu ayuntamiento van a restringir más?
- ¿Cuánto vale tu tiempo?

## Si decides cambiar
Lee [pasar tu piso turístico a larga duración](/blog/pasar-piso-turistico-a-alquiler-larga-duracion).

${CTA_PROP}`,
  },
  {
    slug: 'como-denunciar-un-piso-turistico-ilegal',
    title: 'Cómo denunciar un piso turístico ilegal en tu edificio',
    excerpt: 'Comprueba si tiene licencia y registro, documenta las molestias y acude a la administración competente.',
    audience: 'inquilinos',
    category: 'Turismo',
    publishedAt: D,
    body: `Si sospechas que un piso de tu edificio funciona como alojamiento turístico sin licencia:

1. **Comprueba** si el anuncio muestra el número de licencia y el de registro.
2. **Documenta** las molestias, con fechas: ruido, entradas y salidas, uso de zonas comunes.
3. **Informa al administrador** y al presidente de la comunidad.
4. **Denuncia** ante el organismo de turismo de tu comunidad autónoma o ante el ayuntamiento, que suelen tener formularios de denuncia.
5. Si hay un problema de seguridad o de ruido en el momento, avisa a la **Policía Local**.

## Si vives de alquiler
Avisa también a tu propietario si las molestias afectan a tu vivienda.

## Ten en cuenta
No todas las estancias cortas son ilegales: algunas viviendas tienen licencia. Comprueba antes de denunciar.

${CTA_INQ}`,
  },
  {
    slug: 'puedo-subalquilar-mi-piso-en-airbnb-siendo-inquilino',
    title: 'Soy inquilino: ¿puedo subalquilar mi piso en Airbnb?',
    excerpt: 'Sin permiso escrito del propietario y sin licencia turística, no. Los riesgos son serios: pérdida del contrato y sanciones.',
    audience: 'inquilinos',
    category: 'Turismo',
    publishedAt: D,
    body: `La respuesta corta es **no**, salvo que se cumplan varias condiciones difíciles de reunir.

## Por qué no
- La LAU solo permite **subarrendar parte** de la vivienda, con **consentimiento escrito** del propietario.
- El uso turístico necesita **licencia** y **número de registro**, que normalmente tramita el propietario.
- Muchas comunidades exigen además la **aprobación** de la junta.

## Qué te arriesgas
- **Resolución del contrato** por subarriendo sin permiso.
- **Sanciones** por actividad turística sin licencia.
- Responsabilidad por daños causados por los huéspedes.

## Si quieres ingresos extra
Pregunta a tu propietario por compartir el piso con un compañero, con su autorización y por escrito.

${CTA_INQ}`,
  },
  {
    slug: 'pisos-turisticos-que-vuelven-al-alquiler',
    title: 'Pisos turísticos que vuelven al alquiler: qué buscar como inquilino',
    excerpt: 'Muchos pisos turísticos pasan al alquiler de larga duración. Ventajas, puntos a revisar y cómo negociar.',
    audience: 'inquilinos',
    category: 'Buscar piso',
    publishedAt: D,
    body: `Con más regulación y control, algunos propietarios están pasando sus pisos turísticos al alquiler de larga duración o de temporada.

## Ventajas habituales
- Suelen estar **amueblados y equipados**.
- Muchos están en **zonas céntricas**.
- Pueden estar **recién reformados**.

## Qué revisar
- **Tipo de contrato**: si vas a vivir allí, debe ser de vivienda habitual, no de temporada.
- **Mobiliario**: inventario detallado.
- **Suministros**: si vas a cambiar el titular.
- **Ruido y comunidad**: cómo era la convivencia con el uso turístico.
- **Certificado energético**.

## Cómo negociar
Un propietario que deja el turístico valora la **estabilidad**: un inquilino solvente para varios años es tu mejor argumento.

${CTA_INQ}`,
  },
  {
    slug: 'alquiler-de-temporada-o-hotel-para-estancias-largas',
    title: 'Estancias largas por trabajo: ¿hotel, apartahotel o alquiler de temporada?',
    excerpt: 'Con los hoteles en máximos, comparamos opciones para quedarte uno o varios meses en otra ciudad.',
    audience: 'inquilinos',
    category: 'Turismo',
    publishedAt: D,
    body: `Si tienes que pasar semanas o meses en otra ciudad por trabajo o estudios, hay varias opciones.

| Opción | Ventajas | Inconvenientes |
|---|---|---|
| Hotel | Servicios y flexibilidad | Precio por noche alto en temporada |
| Apartahotel | Cocina y servicios | Precio intermedio o alto |
| Alquiler de temporada | Más espacio y precio mensual | Fianza de dos meses y contrato |
| Habitación | Lo más económico | Convivencia |

## Cuándo compensa el alquiler de temporada
A partir de unas semanas, el precio mensual suele salir más a cuenta que el hotel. Asegúrate de que:
- El contrato recoge la **causa temporal** (tu trabajo o estudios).
- Tiene **número de registro** si se anuncia en plataformas.
- Hay **inventario**.

Lee [tus derechos en el alquiler de temporada](/blog/alquiler-de-temporada-tus-derechos-como-inquilino).

${CTA_INQ}`,
  },
  {
    slug: 'alojamiento-en-temporada-alta-sin-estafas',
    title: 'Alojamiento en temporada alta: cómo encontrarlo sin caer en estafas',
    excerpt: 'Con los hoteles en máximos, crecen los anuncios falsos. Señales de alarma, el número de registro y cómo pagar con seguridad.',
    audience: 'inquilinos',
    category: 'Turismo',
    publishedAt: D,
    body: `Cuando los precios suben, aparecen ofertas que parecen demasiado buenas. Muchas lo son.

## Señales de alarma
- Precio muy por debajo de lo que cuesta la zona.
- Te piden pagar **fuera de la plataforma** o por transferencia a un particular.
- El anfitrión tiene prisa y no responde a preguntas concretas.
- Fotos genéricas o que aparecen en otros anuncios.
- **Sin número de registro** en el anuncio de una vivienda turística.

## Qué comprobar
1. El **número de registro** y, en su caso, la licencia autonómica.
2. Las **opiniones** de otros huéspedes y su antigüedad.
3. La **ubicación exacta** antes de pagar.
4. La política de **cancelación**.

## Cómo pagar
- Siempre dentro de la plataforma o con medios que permitan reclamar.
- Nunca por servicios de envío de dinero a desconocidos.

## Si te estafan
Denuncia en la Policía o la Guardia Civil y avisa a la plataforma. Más señales en [cómo detectar anuncios falsos](/blog/senales-de-un-anuncio-de-alquiler-falso).

${CTA_INQ}`,
  },
  {
    slug: 'turismo-y-barrios-como-afecta-la-presion-turistica',
    title: 'Turismo y barrios: cómo afecta la presión turística a la vivienda',
    excerpt: 'Qué se debate, qué herramientas usan los ayuntamientos y qué datos conviene mirar, sin alarmismos.',
    audience: 'propietarios',
    category: 'Turismo',
    publishedAt: D,
    body: `En los barrios más turísticos, la convivencia entre residentes y visitantes es parte del debate sobre la vivienda.

## Qué se debate
- Cuántas viviendas se destinan a uso turístico.
- El efecto en los precios del alquiler residencial.
- La convivencia y los servicios del barrio.

## Herramientas que usan las administraciones
| Herramienta | Qué hace |
|---|---|
| Zonificación | Limita nuevos pisos turísticos en ciertas zonas |
| Licencias | Control de quién puede operar |
| Registro único | Número obligatorio en los anuncios |
| Fiscalidad | Recargos de IBI e impuestos específicos, según el municipio |
| Comunidad de propietarios | Aprobación previa de nuevos pisos turísticos |

## Qué datos mirar
Los registros oficiales de viviendas turísticas de tu comunidad y ayuntamiento, y los estudios con metodología clara. Desconfía de cifras sin fuente.

${CTA_PROP}`,
  },
  {
    slug: 'huelga-general-11n-y-propietarios-que-cambia',
    title: 'La huelga general del 11-N y los propietarios: ¿qué cambia?',
    excerpt: 'Nada en tu contrato. Lo que sí conviene prever: cobros, visitas, reparaciones y comunicación con tu inquilino ese día.',
    audience: 'propietarios',
    category: 'Actualidad',
    publishedAt: D,
    body: `La huelga general por la vivienda del **11 de noviembre de 2026** no cambia ninguna ley ni ningún contrato.

${AL_DIA}

## Lo que conviene prever
- **Cobros**: si tu inquilino paga por transferencia ese día, puede retrasarse un día por motivos bancarios o personales. No es un impago.
- **Visitas y firmas**: confírmalas con antelación o muévelas de fecha.
- **Reparaciones**: algunos profesionales pueden secundar la huelga. Planifica las urgencias.

## Lo que no debes hacer
- Presionar a tu inquilino por secundar o no la huelga.
- Tomar decisiones sobre tu contrato por la movilización: solo las normas cambian las reglas.

Más contexto en [la movilización por la vivienda, explicada para propietarios](/blog/movilizacion-por-la-vivienda-explicada-para-propietarios).

${CTA_PROP}`,
  },
  {
    slug: 'alquilar-en-tiempos-de-incertidumbre-decisiones-prudentes',
    title: 'Alquilar en tiempos de incertidumbre: 7 decisiones prudentes',
    excerpt: 'Decretos pendientes, huelga y elecciones: qué puedes hacer como propietario para alquilar tranquilo pase lo que pase con la normativa.',
    audience: 'propietarios',
    category: 'Actualidad',
    publishedAt: D,
    body: `Con decretos pendientes de votación, una huelga general y elecciones generales en noviembre, es normal tener dudas. Estas decisiones funcionan con cualquier escenario.

1. **Contrato al día** con la normativa vigente cuando firmes.
2. **Selección rigurosa** del inquilino: ingresos verificados e historial.
3. **Precio ajustado** para no tener el piso vacío.
4. **Inventario con fotos** y fianza depositada.
5. **Comunicación por escrito** con tu inquilino.
6. **Colchón de gastos**: reserva para reparaciones e imprevistos.
7. **Protección frente a impagos**: la hucha de RentaHucha y, si quieres, un seguro de impago por tu cuenta.

## Lo que no conviene
- Dejar el piso vacío esperando a que se aclare todo: el coste es seguro, el cambio no.
- Firmar contratos "de temporada" para vivienda habitual.

${CTA_PROP}`,
  },
  {
    slug: 'pisos-vacios-en-el-debate-que-se-propone',
    title: 'Pisos vacíos en el debate: qué se propone y qué dice la ley',
    excerpt: 'Recargos de IBI, movilización y fiscalidad: lo que ya existe y lo que proponen los partidos, de forma neutral.',
    audience: 'propietarios',
    category: 'Actualidad',
    publishedAt: D,
    body: `Las viviendas vacías aparecen en casi todos los debates de vivienda de esta campaña.

${AL_DIA}

## Lo que ya existe
- **Recargo del IBI** a viviendas desocupadas de forma permanente, a decisión de cada ayuntamiento (Ley 12/2023, ajustado por el decreto de octubre de 2026 si se mantiene).
- **Imputación de rentas** en el IRPF para viviendas que no son la habitual ni están alquiladas.

## Lo que proponen los partidos
Las propuestas van desde inventarios y medidas sobre viviendas vacías de grandes propietarios hasta incentivos fiscales para sacarlas al alquiler. Lee el [resumen neutral de propuestas](/blog/propuestas-de-vivienda-de-los-partidos-resumen-neutral).

## Si tienes un piso vacío
Haz cuentas con [cuánto cuesta tener un piso vacío](/blog/cuanto-cuesta-tener-un-piso-vacio) y [la imputación de rentas](/blog/imputacion-de-rentas-piso-vacio).

${CTA_PROP}`,
  },
  {
    slug: 'pequenos-propietarios-y-grandes-tenedores-diferencias',
    title: 'Pequeños propietarios y grandes tenedores: por qué la ley los trata distinto',
    excerpt: 'Límites de renta, desahucios y fiscalidad: las diferencias que marca la normativa y por qué aparecen en el debate.',
    audience: 'propietarios',
    category: 'Actualidad',
    publishedAt: D,
    body: `La Ley 12/2023 y los decretos de octubre de 2026 distinguen entre **pequeños propietarios** y **grandes tenedores**.

## Quién es gran tenedor
En general, quien tiene más de 10 viviendas (o más de 5 en zona tensionada, si así se declara). Lee [¿soy gran tenedor?](/blog/como-saber-si-eres-gran-tenedor).

## Diferencias principales

| Tema | Pequeño propietario | Gran tenedor |
|---|---|---|
| Renta en zona tensionada | Referencia: el contrato anterior | Límite del índice de referencia |
| Desahucios de vulnerables | Excepción si el propietario también es vulnerable y tiene pocas viviendas; compensación en ciertos casos | Obligaciones adicionales |
| Deducciones del decreto | Pueden aplicarse | Algunas excluidas |

## Por qué está en el debate
Las propuestas de los partidos plantean tratamientos distintos para unos y otros. Consúltalas en el [resumen neutral](/blog/propuestas-de-vivienda-de-los-partidos-resumen-neutral).

${CTA_PROP}`,
  },
  {
    slug: 'preguntas-de-vivienda-para-los-debates-electorales',
    title: '10 preguntas de vivienda para escuchar en los debates del 29-N',
    excerpt: 'Una lista neutral para comparar lo que dicen los candidatos sobre alquiler, construcción y ayudas.',
    audience: 'propietarios',
    category: 'Elecciones 29N',
    publishedAt: D,
    body: `Si sigues los debates de la campaña, estas preguntas te ayudan a comparar respuestas con tus propios criterios.

1. ¿Qué harán con la **Ley 12/2023** y con las zonas tensionadas?
2. ¿Qué pasará con los **decretos de vivienda** si cambia el Gobierno?
3. ¿Cuántas viviendas prometen construir, **dónde** y en **qué plazo**?
4. ¿Cómo se **financian** sus propuestas?
5. ¿Qué cambios fiscales proponen para **propietarios** e **inquilinos**?
6. ¿Qué harán con los **desahucios** de hogares vulnerables?
7. ¿Qué proponen sobre el **alquiler turístico** y de temporada?
8. ¿Cómo coordinarán sus medidas con **comunidades y ayuntamientos**?
9. ¿Qué medidas tienen para **jóvenes** que quieren emanciparse?
10. ¿Cómo medirán si sus medidas funcionan?

Para comparar programas, lee [cómo leer un programa electoral de vivienda](/blog/como-leer-un-programa-electoral-de-vivienda).

${CTA_PROP}`,
  },
  {
    slug: 'votar-el-29n-si-te-has-mudado',
    title: 'Votar el 29-N si te has mudado de alquiler: qué comprobar',
    excerpt: 'El censo, el empadronamiento y el voto por correo: lo que debes revisar si has cambiado de piso hace poco.',
    audience: 'inquilinos',
    category: 'Elecciones 29N',
    publishedAt: D,
    body: `Si has cambiado de piso en los últimos meses, comprueba dónde te toca votar.

## 1. El censo electoral
El censo se elabora a partir del **padrón**. Si te empadronaste hace poco, puede que sigas censado en tu dirección anterior. Consúltalo en la web del **INE** o en tu ayuntamiento.

## 2. Si te toca votar lejos
Puedes **votar por correo**. Hay plazos para solicitarlo y para enviar el voto: consúltalos en la web de Correos y de la Junta Electoral, y no lo dejes para el final.

## 3. Empadrónate siempre
Además de para votar, el padrón te da acceso a servicios y ayudas. Lee [cómo empadronarte en un piso de alquiler](/blog/empadronarse-en-un-piso-de-alquiler).

## Para informarte sobre vivienda
- [Qué está en juego el 29-N](/blog/elecciones-29-noviembre-que-esta-en-juego-en-vivienda)
- [Propuestas de los partidos, por orden alfabético](/blog/propuestas-de-vivienda-de-los-partidos-resumen-neutral)

${CTA_INQ}`,
  },
  {
    slug: 'desahucios-de-vulnerables-hasta-2030-para-inquilinos',
    title: 'Desahucios de hogares vulnerables hasta 2030: lo que debes saber',
    excerpt: 'Qué prevé el decreto de octubre de 2026, quién puede acogerse y por qué depende de la votación del 12 de noviembre.',
    audience: 'inquilinos',
    category: 'Actualidad',
    publishedAt: D,
    body: `El decreto de medidas urgentes de octubre de 2026 prevé, **hasta el 31 de diciembre de 2030**, suspender ciertos desahucios de hogares vulnerables. Está en vigor y pendiente de convalidación, prevista para el **12 de noviembre**.

${AL_DIA}

## Qué prevé, en resumen
- Suspensión cuando la demandante es una entidad que compró la deuda por debajo del valor de mercado y el hogar es vulnerable sin alternativa.
- Suspensión en otros casos si la administración no ofrece una alternativa habitacional.
- Excepción: no se suspende si el propietario también es vulnerable y tiene dos viviendas o menos.

## Cómo acreditar la vulnerabilidad
A través de los **servicios sociales**, con informes sobre ingresos y situación familiar.

## Importante
La suspensión no cancela la deuda. Busca ayuda cuanto antes: lee [si te enfrentas a un desahucio](/blog/te-enfrentas-a-un-desahucio-ayudas-y-pasos).

${CTA_INQ}`,
  },
  {
    slug: 'comunicar-con-clientes-en-plena-movilizacion-vivienda',
    title: 'Cómo comunicar con tus clientes en plena movilización por la vivienda',
    excerpt: 'Propietarios preocupados e inquilinos movilizados: cómo informar con hechos, sin opinar y sin perder la confianza de nadie.',
    audience: 'inmobiliarias',
    category: 'Normativa',
    publishedAt: D,
    body: `Acampadas, huelga general, decretos pendientes y elecciones: tus clientes preguntan. Tu papel es **informar**.

## Con propietarios
- Explica qué está en vigor y qué está pendiente (votación del 12 de noviembre).
- No hagas predicciones.
- Recomienda decisiones prudentes válidas en cualquier escenario.

## Con inquilinos
- Respeta su derecho a movilizarse o no.
- Informa de sus derechos en el contrato.
- Mantén los plazos de reparaciones y respuestas.

## Con tu equipo
- Una **nota interna** común con los hechos y las fuentes.
- Un responsable de actualizarla.
- Tono neutral en redes sociales.

## Recursos que puedes compartir
- [La movilización por la vivienda, explicada para propietarios](/blog/movilizacion-por-la-vivienda-explicada-para-propietarios)
- [Calendario hasta el 29-N](/blog/calendario-hasta-el-29n-vivienda)

${CTA_INMO}`,
  },
  {
    slug: 'huelga-general-11n-como-organizar-tu-agencia',
    title: 'Huelga general del 11-N: cómo organizar tu inmobiliaria ese día',
    excerpt: 'Derechos de tu equipo, citas con clientes, firmas y urgencias: un plan para que la jornada no te pille desprevenido.',
    audience: 'inmobiliarias',
    category: 'Gestión de alquiler',
    publishedAt: D,
    body: `${AL_DIA}

## Tu equipo
- Hacer huelga es un **derecho**: no se puede presionar ni sancionar a quien la secunda.
- No es obligatorio que te avisen de antemano.
- No puedes sustituir a quien hace huelga para romperla.

## Tus clientes
- **Confirma** las visitas, firmas y entregas de llaves previstas para el 11 de noviembre, o reprográmalas.
- Avisa a propietarios e inquilinos de posibles retrasos en las respuestas.

## Urgencias
- Ten localizados a proveedores para averías graves (agua, gas, electricidad).
- Prepara un protocolo de guardia, respetando los derechos de todos.

Más contexto en [la huelga general por la vivienda](/blog/huelga-general-por-la-vivienda-11-noviembre).

${CTA_INMO}`,
  },
  {
    slug: 'captar-propietarios-de-pisos-turisticos-tras-registro-y-multas',
    title: 'Del piso turístico al alquiler: la oportunidad de captación de 2027',
    excerpt: 'Registro único, multas a plataformas y veto de las comunidades: por qué muchos propietarios turísticos buscan una alternativa y cómo ayudarles.',
    audience: 'inmobiliarias',
    category: 'Captación',
    publishedAt: D,
    body: `Más control sobre el alquiler turístico (registro único, retirada de anuncios, multas a plataformas, aprobación de la comunidad) está llevando a muchos propietarios a buscar alternativas.

## Por qué ahora
- Anuncios retirados por falta de registro válido.
- Más trámites y más fiscalidad en debate.
- Comunidades que pueden vetar nuevos pisos turísticos.

## Qué ofrecerles
1. **Comparativa de números** con su caso. Usa [esta plantilla](/blog/piso-turistico-o-larga-duracion-haz-los-numeros-2027).
2. **Plan de transición**: última reserva, puesta a punto y comercialización.
3. **Inquilino verificado** y protección frente a impagos con la hucha.
4. **Alquiler de temporada bien hecho**, si encaja con su piso.

## Cómo encontrarlos
Anuncios que han desaparecido de las plataformas, administradores de fincas y asociaciones de propietarios.

Lee también [convertir pisos turísticos en larga duración](/blog/convertir-pisos-turisticos-en-alquiler-larga-duracion-agencias).

${CTA_INMO}`,
  },
  {
    slug: 'votacion-12n-que-decir-a-propietarios-con-contratos-que-vencen',
    title: 'Votación del 12-N: qué decir a propietarios con contratos que vencen',
    excerpt: 'Un guion para explicar las prórrogas, el límite del 2 % y los escenarios posibles sin hacer predicciones.',
    audience: 'inmobiliarias',
    category: 'Normativa',
    publishedAt: D,
    body: `Muchos propietarios con contratos que vencen pronto preguntan qué pasará. Este guion te ayuda.

## 1. Lo que está en vigor
"Ahora mismo rige el decreto de medidas urgentes, publicado el 7 de octubre. Incluye la prórroga extraordinaria y el límite del 2 %."

## 2. Lo que está pendiente
"La Diputación Permanente tiene prevista la votación el 12 de noviembre. Si no se convalida, decae."

## 3. Los dos escenarios
| Si se convalida | Si decae |
|---|---|
| Siguen las prórrogas extraordinarias y el límite del 2 % hasta finales de 2027 | Rigen la LAU y la Ley 12/2023 |

## 4. Qué hacer ahora
"Contestamos por escrito a cualquier solicitud del inquilino, guardamos todo y revisamos tras la votación."

## 5. Lo que no decimos
Predicciones sobre el resultado o el próximo Gobierno.

Más en [los decretos se votarán el 12 de noviembre](/blog/decretos-de-vivienda-votacion-12-noviembre).

${CTA_INMO}`,
  },
  {
    slug: 'reputacion-de-las-inmobiliarias-en-la-crisis-de-vivienda',
    title: 'Inmobiliarias en la crisis de vivienda: cómo generar confianza',
    excerpt: 'Transparencia, cumplimiento y trato justo a los inquilinos: lo que diferencia a una agencia en un momento de desconfianza.',
    audience: 'inmobiliarias',
    category: 'Negocio',
    publishedAt: D,
    body: `En un momento de movilizaciones por la vivienda, la confianza en el sector se pone a prueba. Estas prácticas marcan la diferencia.

## Con los inquilinos
- **Nada de honorarios** al inquilino: los paga el propietario por ley.
- **Respuestas rápidas** y trato respetuoso.
- **Requisitos claros** y sin discriminación.
- **Devolución de la fianza** en plazo.

## Con los propietarios
- **Valoraciones honestas**, sin inflar.
- **Transparencia** en cobros y gastos.
- **Cumplimiento normativo** en cada contrato.

## En público
- Información útil y neutral en tu web y en redes.
- Reseñas reales y respuestas cuidadas.

Más ideas en [cómo diferenciar tu inmobiliaria](/blog/diferenciar-tu-inmobiliaria-2027).

${CTA_INMO}`,
  },
  {
    slug: 'hoteles-caros-oportunidad-alquiler-de-temporada-bien-hecho',
    title: 'Hoteles en máximos: la oportunidad del alquiler de temporada bien hecho',
    excerpt: 'Profesionales desplazados y estudiantes buscan alternativas al hotel. Cómo ofrecer temporada cumpliendo todas las reglas.',
    audience: 'inmobiliarias',
    category: 'Captación',
    publishedAt: D,
    body: `Con la tarifa hotelera media en máximos según los datos del INE publicados en 2026, muchas empresas y profesionales buscan alternativas para estancias de varios meses.

## El perfil
- Profesionales en proyectos temporales.
- Personal sanitario y docente desplazado.
- Estudiantes de máster o intercambio.

## Cómo hacerlo bien
| Requisito | Por qué |
|---|---|
| Causa temporal documentada | Evita que se recalifique como vivienda habitual |
| Duración de 31 días a 12 meses | Regla del decreto de octubre de 2026, si se mantiene |
| Número del registro único | Obligatorio para anunciarlo en plataformas |
| Fianza de dos meses | Uso distinto de vivienda |
| Inventario detallado | Suelen ser pisos amueblados |

## Una advertencia
El alquiler de temporada no debe usarse para esquivar la normativa de vivienda habitual. Lee [alquiler de temporada para agencias](/blog/alquiler-de-temporada-guia-para-agencias).

${CTA_INMO}`,
  },
]
