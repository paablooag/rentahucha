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
]
