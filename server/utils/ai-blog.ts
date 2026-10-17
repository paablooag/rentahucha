import Anthropic from '@anthropic-ai/sdk'
import type { Audience, BlogPostSummary } from '#shared/utils/blog'

// Redacción de artículos del blog con Claude. Los artículos se guardan siempre como BORRADOR: una persona los
// revisa en /admin antes de publicarlos o programarlos. La clave va en ANTHROPIC_API_KEY (.env del servidor).

const MODEL = 'claude-opus-5-5'

export const AI_LENGTHS = {
  corto: 'Corto: 300–450 palabras. Responde a una búsqueda concreta, directo al grano.',
  medio: 'Medio: 600–900 palabras, con 4–6 secciones.',
  largo: 'Guía larga: 1.200–1.800 palabras, con índice natural de 6–9 secciones, ejemplos, una tabla y una sección final «## Preguntas frecuentes» con 3–5 preguntas en «### ».',
} as const
export type AiLength = keyof typeof AI_LENGTHS

// Contexto fijo (se cachea): reglas de marca, de producto, legales y de formato.
const SYSTEM = `Eres el redactor del blog de RentaHucha (rentahucha.es), una plataforma española de alquiler de vivienda. Escribes en español de España, claro, cercano y preciso, para propietarios, inquilinos o inmobiliarias.

## Qué es RentaHucha (no lo contradigas nunca)
- Proyecto en lista de espera, previo al lanzamiento, para toda España.
- Propietarios: inquilinos verificados (ingresos, contrato, ahorros), contrato conforme a la LAU, aviso de cada pago, incidencias en un panel y protocolo de impago. Cuota del 5 % de la renta (hasta el 3,5 % con varios pisos). Sin coste de entrada.
- Inquilinos: gratis (la Ley 12/2023 atribuye los gastos de gestión al propietario). Cada mes aportan un pequeño porcentaje de la renta (en torno al 4 %) a una HUCHA a su nombre. Se llena mes a mes; tope de dos mensualidades en vivienda habitual.
- La hucha es una cuenta a nombre del inquilino, abierta y custodiada por una entidad financiera autorizada. RentaHucha nunca guarda el dinero: gestiona las reglas.
- Reglas firmadas al inicio: si el alquiler termina sin incidencias, se devuelve íntegra con un bonus del 10 % por buen pagador; si hay un impago de renta comprobado, se paga al propietario la cantidad pendiente con el saldo de la hucha (sin esperar a un juicio); los desperfectos o reclamaciones solo con acuerdo firmado por ambas partes o una resolución.
- Pasaporte de inquilino: historial de pagos verificado y portable.
- Inmobiliarias: pueden subir sus pisos, ofrecer a sus propietarios inquilinos verificados y la hucha anti-impago; el propietario sigue siendo cliente de la agencia. Condiciones para agencias: se cuentan al apuntarse (no inventes precios).
- La fianza legal y la garantía adicional van aparte, como en cualquier alquiler, y son del propietario.

## Prohibido
- Decir o insinuar que RentaHucha es aseguradora, vende o intermedia seguros, o garantiza la renta. Nunca uses «renta garantizada», «cobras siempre» ni «pase lo que pase» referido a RentaHucha. El seguro de impago es un producto del mercado que el propietario puede contratar por su cuenta.
- Prometer plazos de desahucio: los decide un juzgado.
- Inventar estadísticas, cifras de mercado, sentencias o normas. Si no estás seguro de un dato, no lo des o remite a la fuente oficial (BOE, Agencia Tributaria, INE, Ministerio de Vivienda, comunidad autónoma). Los importes, como rangos orientativos.
- Opinar sobre partidos o políticos. La política se trata de forma estrictamente neutral: hechos, propuestas atribuidas a quien las hace, partidos por orden alfabético.
- Contenido discriminatorio o avisos del tipo «solo criterios económicos».

## Normativa de referencia (úsala con precisión)
LAU (Ley 29/1994): vivienda habitual 5 años de prórroga obligatoria (7 si el arrendador es persona jurídica) y 3 de tácita; preaviso del arrendador 4 meses y del inquilino 2 al final; desistimiento del inquilino tras 6 meses con 30 días; fianza de 1 mes (2 en uso distinto); garantía adicional máx. 2 meses en vivienda habitual. Ley 12/2023: gastos de gestión a cargo del arrendador, zonas tensionadas, índice de referencia, gran tenedor, reducciones del IRPF del 50 % al 90 %. La actualización anual de contratos posteriores a la Ley 12/2023 se limita con el IRAV del INE. Desde 2025 (LO 1/2025) muchas demandas civiles exigen un intento previo de negociación (MASC).

## Formato de salida
- "body" en Markdown: empieza con un párrafo de entrada (sin título H1), usa «## » para secciones y «### » para subsecciones, listas y tablas cuando ayuden. Nada de HTML.
- Escribe para la búsqueda: incluye de forma natural la palabra clave en el título, la entrada y algún «## ».
- Termina con un llamado a la acción breve hacia la lista de espera, con estos enlaces exactos según el público: propietarios → [Apúntate](/apuntate?tipo=propietario#formulario); inquilinos → [Apúntate](/apuntate?tipo=inquilino#formulario); inmobiliarias → [Apunta a tu inmobiliaria](/inmobiliarias#formulario).
- Enlaces internos: 1–3 a artículos de la lista que te dé el usuario, con la forma [texto](/blog/slug). Nunca inventes slugs.
- "title": máximo 70 caracteres, atractivo y honesto. "excerpt": 120–160 caracteres. "slug": minúsculas, sin acentos, palabras separadas por guiones, máx. 70 caracteres. "category": 1–3 palabras (por ejemplo: Legal, Fiscalidad, Impagos, Reformas, Captación, Ahorro, Buscar piso, Derechos, Gestión).`

const ARTICLE_SCHEMA = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    slug: { type: 'string' },
    excerpt: { type: 'string' },
    category: { type: 'string' },
    body: { type: 'string' },
  },
  required: ['title', 'slug', 'excerpt', 'category', 'body'],
  additionalProperties: false,
} as const

const IDEAS_SCHEMA = {
  type: 'object',
  properties: {
    ideas: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          topic: { type: 'string' },
          keyword: { type: 'string' },
          length: { type: 'string', enum: ['corto', 'medio', 'largo'] },
          why: { type: 'string' },
        },
        required: ['topic', 'keyword', 'length', 'why'],
        additionalProperties: false,
      },
    },
  },
  required: ['ideas'],
  additionalProperties: false,
} as const

export function aiConfigured(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY)
}

let client: Anthropic | null = null
function anthropic(): Anthropic {
  if (!aiConfigured()) throw createError({ statusCode: 503, statusMessage: 'Falta ANTHROPIC_API_KEY en el servidor.' })
  client ??= new Anthropic()
  return client
}

function catalog(existing: BlogPostSummary[]): string {
  return existing.map(p => `- /blog/${p.slug} · ${p.title} [${p.audience}]`).join('\n')
}

// Una petición con salida JSON validada por el esquema. Si los filtros de seguridad rechazan la petición,
// la API la repite en otro modelo (fallbacks "default"); si aun así se rechaza, se devuelve un error claro.
async function askJson<T>(user: string, schema: object, effort: 'medium' | 'high'): Promise<T> {
  const params = {
    model: MODEL,
    max_tokens: 16000,
    betas: ['server-side-fallback-2026-07-01'],
    fallbacks: 'default',
    output_config: { effort, format: { type: 'json_schema', schema } },
    system: [{ type: 'text', text: SYSTEM, cache_control: { type: 'ephemeral' } }],
    messages: [{ role: 'user', content: user }],
  }
  let message: Anthropic.Beta.BetaMessage
  try {
    message = await anthropic().beta.messages.create(params as unknown as Anthropic.Beta.MessageCreateParamsNonStreaming)
  }
  catch (e) {
    if (e instanceof Anthropic.AuthenticationError) throw createError({ statusCode: 503, statusMessage: 'La clave de la API de Claude no es válida.' })
    if (e instanceof Anthropic.RateLimitError) throw createError({ statusCode: 429, statusMessage: 'Demasiadas peticiones a la IA. Prueba en un minuto.' })
    if (e instanceof Anthropic.APIError) throw createError({ statusCode: 502, statusMessage: `La IA no está disponible ahora (${e.status ?? 'error'}).` })
    throw e
  }
  if (message.stop_reason === 'refusal') throw createError({ statusCode: 422, statusMessage: 'La IA no ha querido escribir sobre ese tema. Prueba a reformularlo.' })
  if (message.stop_reason === 'max_tokens') throw createError({ statusCode: 502, statusMessage: 'La respuesta de la IA se cortó. Prueba con una longitud menor.' })
  const text = message.content.filter(b => b.type === 'text').map(b => (b as Anthropic.Beta.BetaTextBlock).text).join('')
  try {
    return JSON.parse(text) as T
  }
  catch {
    throw createError({ statusCode: 502, statusMessage: 'La IA devolvió un formato inesperado. Vuelve a intentarlo.' })
  }
}

export interface AiArticleRequest {
  topic: string
  audience: Audience
  length: AiLength
  keywords?: string
  notes?: string
}

export function generateArticle(req: AiArticleRequest, existing: BlogPostSummary[]) {
  const user = `Fecha de hoy: ${madridDate()}.
Público: ${req.audience}.
Tema: ${req.topic}
${req.keywords ? `Palabras clave a posicionar: ${req.keywords}\n` : ''}${req.notes ? `Indicaciones del editor: ${req.notes}\n` : ''}Longitud: ${AI_LENGTHS[req.length]}

Artículos ya publicados (no repitas sus temas; enlaza 1–3 relevantes):
${catalog(existing)}

Escribe el artículo.`
  return askJson<{ title: string; slug: string; excerpt: string; category: string; body: string }>(user, ARTICLE_SCHEMA, 'high')
}

export function suggestIdeas(audience: Audience, count: number, focus: string, existing: BlogPostSummary[]) {
  const user = `Fecha de hoy: ${madridDate()}.
Propón ${count} temas nuevos de artículo para el público «${audience}»${focus ? `, con este enfoque: ${focus}` : ''}.
Busca lo que la gente busca de verdad en Google en España sobre alquiler, actualidad útil y temas que atraigan a ese público hacia RentaHucha. Mezcla longitudes.
Para cada uno: "topic" (el tema, en una frase), "keyword" (la búsqueda principal), "length" y "why" (una frase sobre por qué atrae tráfico o clientes).
No repitas ni solapes estos artículos ya publicados:
${catalog(existing)}`
  return askJson<{ ideas: { topic: string; keyword: string; length: AiLength; why: string }[] }>(user, IDEAS_SCHEMA, 'medium')
}
