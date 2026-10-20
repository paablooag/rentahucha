import type { BlogPost } from '#shared/utils/blog'

// Undécima versión del contenido inicial: vivienda en las elecciones generales del 29-N. Tono informativo y neutral:
// partidos por orden alfabético, cada propuesta atribuida a su fuente y nada de opiniones. Situación a 20-10-2026,
// cuando ningún partido había publicado aún su programa para el 29-N.

type Seed = Omit<BlogPost, 'updatedAt' | 'published'>
const D = '2026-10-20'
const CAT = 'Elecciones'
const AL_DIA = `> **Actualizado a 20 de octubre de 2026.** A esta fecha ningún partido ha publicado su programa para el 29-N: lo que sigue son declaraciones, documentos previos y programas anteriores recogidos por la prensa. Lo actualizaremos cuando se publiquen los programas.`

const FUENTES = `## Fuentes

- Fotocasa: [¿Qué pasará con la vivienda tras las elecciones? Propuestas de los principales partidos](https://www.fotocasa.es/fotocasa-life/sector/pasara-vivienda-elecciones-estas-son-propuestas-principales-partidos/) (14-10-2026).
- Política Electoral: [Vivienda: qué propone cada partido el 29-N](http://www.politicaelectoral.com/es/espana/generales-2026/nacional/comparar/vivienda) (consultado el 20-10-2026).
- Forbes: [Elecciones 2026: las cinco batallas económicas del 29-N](https://forbes.es/actualidad/1036705/elecciones-2026-batallas-economicas-29-n/).`

export const BLOG_SEED_V11_ELECCIONES: Seed[] = [
  {
    slug: 'vivienda-elecciones-29n-que-propone-cada-partido',
    title: 'Vivienda en las elecciones del 29-N: qué propone cada partido y cómo afectaría a los propietarios',
    excerpt: 'Zonas tensionadas, topes al alquiler, prórrogas, impuestos y vivienda pública: lo que han planteado los partidos, por orden alfabético y con su fuente.',
    audience: 'propietarios',
    category: CAT,
    publishedAt: D,
    body: `La vivienda es uno de los temas centrales de la campaña de las elecciones generales del **29 de noviembre de 2026**. Este es un resumen de lo que han planteado los partidos, **por orden alfabético**, para que puedas compararlo con calma.

${AL_DIA}

## Qué ha planteado cada partido

### ERC
Según Fotocasa, propone mantener los topes de alquiler en zonas tensionadas y extenderlos a los contratos de temporada y por habitaciones, más vivienda pública, movilizar vivienda vacía y rebajar el ITP de la primera vivienda.

### Junts
Según Fotocasa, plantea condicionar las prórrogas extraordinarias a un acuerdo entre propietario e inquilino, ampliar las deducciones fiscales para inquilinos y proteger al pequeño propietario. Según Política Electoral, entregó el 2 de octubre al Ministerio de Vivienda un decreto alternativo con una prórroga voluntaria de hasta dos años.

### PNV
Según Fotocasa, defiende proteger a los hogares vulnerables sin imponer la renovación automática de contratos al pequeño propietario, agilizar el urbanismo y que el alquiler turístico tribute con un IVA del 10 %.

### Podemos
Según Fotocasa y Política Electoral, propone rebajar por ley los alquileres (un 40 % como «medida de choque»), con el objetivo de que ninguna familia destine más del 30 % de su renta al alquiler, contratos indefinidos con causas tasadas y prohibir los pisos turísticos.

### PP
Según Fotocasa y Política Electoral, propone derogar la Ley de Vivienda de 2023, eliminar las zonas tensionadas y retirar los mecanismos de intervención en los alquileres, con el objetivo de construir «un millón de viviendas en cuatro años», avales para compradores jóvenes y silencio positivo en las licencias.

### PSOE
Según Política Electoral, defiende mantener las medidas de los decretos de octubre de 2026 (tope del 2 % a la subida de los contratos vigentes y suspensión de ciertos desahucios hasta 2030). Según Fotocasa, propone desarrollar la Ley de Vivienda, ampliar el parque público y la entidad pública Casa 47 y mantener protegidas las viviendas financiadas con dinero público.

### Sumar
Según Fotocasa, propone la renovación automática de los contratos tras los plazos mínimos, regular el alquiler temporal y por habitaciones, más parque público y prohibir que empresas y fondos de inversión compren vivienda.

### Vox
Según Fotocasa y Política Electoral, propone derogar la Ley de Vivienda de 2023, más oferta y menos impuestos (eliminar el IVA de la primera vivienda y bonificar las donaciones familiares para comprarla), construir vivienda social, incentivos al alquiler de larga duración y acelerar los desalojos por ocupación ilegal.

## Las propuestas, por temas

| Tema | Qué se ha planteado |
| --- | --- |
| Zonas tensionadas y topes al alquiler | Eliminarlas (PP). Mantener y extender los topes (ERC). Rebaja por ley de los alquileres (Podemos). |
| Duración y prórrogas | Renovación automática (Sumar). Prórroga solo con acuerdo (Junts). Sin renovación automática para el pequeño propietario (PNV). Contratos indefinidos con causas tasadas (Podemos). |
| Alquiler de temporada y por habitaciones | Regularlo o extender los topes (ERC, Sumar). |
| Alquiler turístico | Prohibirlo (Podemos). IVA del 10 % (PNV). |
| Impuestos | Menos impuestos a la compra (PP, Vox). Deducciones para inquilinos (Junts). Rebaja del ITP en la primera vivienda (ERC). |
| Ley de Vivienda de 2023 | Derogarla (PP, Vox). Desarrollarla (PSOE). |
| Vivienda pública | Ampliar el parque público (ERC, PSOE, Sumar). Construir vivienda social (Vox). |

## Qué significa para ti como propietario, hoy

- **Hasta que haya cambios, se aplica la ley vigente**: la Ley de Arrendamientos Urbanos, la Ley de Vivienda de 2023 y, mientras sigan en vigor, los decretos de octubre de 2026, pendientes de convalidación.
- Un contrato firmado hoy se rige por las normas de hoy, salvo que una ley posterior diga expresamente otra cosa.
- Si vas a alquilar en las próximas semanas, lo prudente es lo de siempre: **elegir bien al inquilino** y dejarlo todo por escrito. Lee [si conviene firmar ahora o después de las elecciones](/blog/firmar-alquiler-ahora-o-despues-de-las-elecciones).

${FUENTES}`,
  },
  {
    slug: 'elecciones-29n-alquiler-propuestas-para-inquilinos',
    title: 'Elecciones del 29-N y alquiler: lo que proponen los partidos para los inquilinos',
    excerpt: 'Topes, rebajas, prórrogas, contratos indefinidos o más oferta: un resumen neutral de las propuestas que afectan a quien vive de alquiler.',
    audience: 'inquilinos',
    category: CAT,
    publishedAt: D,
    body: `Si vives de alquiler, estas son las propuestas que más te pueden afectar de cara a las elecciones generales del **29 de noviembre de 2026**, por orden alfabético de partido y con su fuente.

${AL_DIA}

## Precio del alquiler

- **ERC**: mantener los topes en zonas tensionadas y extenderlos a temporada y habitaciones (según Fotocasa).
- **Podemos**: rebajar por ley los alquileres, un 40 % como «medida de choque» (según Política Electoral).
- **PP**: eliminar las zonas tensionadas y los mecanismos de intervención, y aumentar la oferta (según Fotocasa).
- **PSOE**: mantener el tope del 2 % a la subida de los contratos vigentes de los decretos de octubre (según Política Electoral).
- **Vox**: más oferta, menos impuestos e incentivos al alquiler de larga duración (según Fotocasa).

## Duración del contrato

- **Junts**: prórrogas extraordinarias solo con acuerdo entre las partes (según Fotocasa).
- **Podemos**: contratos indefinidos con causas tasadas (según Fotocasa).
- **Sumar**: renovación automática de los contratos tras los plazos mínimos (según Fotocasa).

## Ayudas e impuestos

- **Junts**: ampliar las deducciones fiscales para inquilinos (según Fotocasa).
- **PP** y **Vox**: medidas para facilitar la compra de la primera vivienda a jóvenes (según Fotocasa).

## Lo que puedes hacer hoy

- Tus derechos actuales siguen vigentes: puedes prorrogar tu contrato de vivienda habitual hasta 5 años (7 si el propietario es una empresa) y la fianza es de una mensualidad.
- Si buscas piso, mira [cuánto alquiler puedes pagar con tu sueldo](/herramientas/cuanto-alquiler-puedo-pagar) y prepara tu [carta de presentación](/herramientas/carta-inquilino).
- Si tu ciudad es zona tensionada, consulta qué implica en las [guías de alquiler por ciudad](/alquiler).

${FUENTES}`,
  },
]
