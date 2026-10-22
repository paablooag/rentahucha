import postgres from 'postgres'
import { MIGRATIONS } from '../db/migrations'
import { TASKS_SEED } from '../data/tasks-seed'
import { BLOG_SEED as BLOG_SEED_V1 } from '../data/blog-seed'
import { BLOG_SEED_V2 } from '../data/blog-seed-v2'
import { BLOG_SEED_V3_ELECCIONES } from '../data/blog-seed-v3-elecciones'
import { BLOG_SEED_V3_REFORMAS } from '../data/blog-seed-v3-reformas'
import { BLOG_SEED_V3_ALQUILAR } from '../data/blog-seed-v3-alquilar'
import { BLOG_SEED_V3_INQUILINOS } from '../data/blog-seed-v3-inquilinos'
import { BLOG_SEED_V5_INMOBILIARIAS_A } from '../data/blog-seed-v5-inmobiliarias-a'
import { BLOG_SEED_V5_INMOBILIARIAS_B } from '../data/blog-seed-v5-inmobiliarias-b'
import { BLOG_SEED_V5_PROPIETARIOS } from '../data/blog-seed-v5-propietarios'
import { BLOG_SEED_V5_INQUILINOS } from '../data/blog-seed-v5-inquilinos'
import { BLOG_SEED_V9_INQUILINOS } from '../data/blog-seed-v9-inquilinos'
import { BLOG_SEED_V9_PROPIETARIOS } from '../data/blog-seed-v9-propietarios'
import { BLOG_SEED_V9_INMOBILIARIAS } from '../data/blog-seed-v9-inmobiliarias'
import { BLOG_SEED_V10_ACTUALIDAD_A } from '../data/blog-seed-v10-actualidad-a'
import { BLOG_SEED_V10_ACTUALIDAD_B } from '../data/blog-seed-v10-actualidad-b'
import { BLOG_SEED_V11_ELECCIONES } from '../data/blog-seed-v11-elecciones'
import { BLOG_SEED_V12_ANUNCIOS } from '../data/blog-seed-v12-anuncios'
import { BLOG_SEED_V15_BUSQUEDAS } from '../data/blog-seed-v15-busquedas'

// Los nuevos primero: al insertar en orden inverso, el primero de la lista queda como el más reciente.
const BLOG_SEED = [
  ...BLOG_SEED_V15_BUSQUEDAS,
  ...BLOG_SEED_V12_ANUNCIOS,
  ...BLOG_SEED_V11_ELECCIONES,
  ...BLOG_SEED_V10_ACTUALIDAD_A,
  ...BLOG_SEED_V10_ACTUALIDAD_B,
  ...BLOG_SEED_V9_INQUILINOS,
  ...BLOG_SEED_V9_PROPIETARIOS,
  ...BLOG_SEED_V9_INMOBILIARIAS,
  ...BLOG_SEED_V5_INMOBILIARIAS_A,
  ...BLOG_SEED_V5_PROPIETARIOS,
  ...BLOG_SEED_V5_INQUILINOS,
  ...BLOG_SEED_V5_INMOBILIARIAS_B,
  ...BLOG_SEED_V3_ELECCIONES,
  ...BLOG_SEED_V3_ALQUILAR,
  ...BLOG_SEED_V3_REFORMAS,
  ...BLOG_SEED_V3_INQUILINOS,
  ...BLOG_SEED_V2,
  ...BLOG_SEED_V1,
]

// Acceso a PostgreSQL. Producción: NUXT_DATABASE_URL (postgres://…). Desarrollo sin URL: PGlite, un Postgres
// real embebido que guarda en .data/pglite, para trabajar sin instalar nada.

type Row = Record<string, unknown>
interface Driver {
  query: (text: string, params?: unknown[]) => Promise<Row[]>
  exec: (text: string) => Promise<void>
  // Ejecuta varias sentencias de forma atómica: o se aplican todas o ninguna.
  transaction: (text: string) => Promise<void>
}

let ready: Promise<Driver> | null = null

async function connect(): Promise<Driver> {
  const url = String(useRuntimeConfig().databaseUrl ?? '')
  if (url) {
    const sql = postgres(url, { max: 5, idle_timeout: 30, onnotice: () => {} })
    return {
      query: async (text, params = []) => [...await sql.unsafe(text, params as never[])],
      // .simple(): permite varias sentencias en una llamada (migraciones).
      exec: async (text) => { await sql.unsafe(text).simple() },
      transaction: async (text) => { await sql.begin(tx => tx.unsafe(text).simple()) },
    }
  }
  if (import.meta.dev) {
    const { PGlite } = await import('@electric-sql/pglite')
    const { mkdirSync } = await import('node:fs')
    mkdirSync('./.data', { recursive: true })
    const pg = new PGlite('./.data/pglite')
    return {
      query: async (text, params = []) => (await pg.query<Row>(text, params)).rows,
      exec: async (text) => { await pg.exec(text) },
      transaction: async (text) => { await pg.transaction(tx => tx.exec(text)) },
    }
  }
  throw createError({ statusCode: 500, statusMessage: 'Falta NUXT_DATABASE_URL.' })
}

async function migrate(d: Driver) {
  await d.exec('CREATE TABLE IF NOT EXISTS schema_migrations (id integer PRIMARY KEY, name text NOT NULL, applied_at timestamptz NOT NULL DEFAULT now())')
  const applied = new Set((await d.query('SELECT id FROM schema_migrations')).map(r => Number(r.id)))
  for (const m of MIGRATIONS.filter(m => !applied.has(m.id))) {
    await d.transaction(`${m.sql}; INSERT INTO schema_migrations (id, name) VALUES (${m.id}, '${m.name.replace(/'/g, "''")}');`)
    console.info(`[db] migración ${m.id} aplicada: ${m.name}`)
  }
}

// Artículos iniciales por versiones. Cada versión nueva añade los que falten, actualiza el texto de los que nadie
// ha editado en /admin y puede aplicar un ajuste puntual. Sube BLOG_SEED_VERSION al añadir o corregir artículos.
// v4: RentaHucha no es una aseguradora; la protección es la hucha del inquilino, que pasa al propietario si hay impago.
// v5: 100 artículos (40 para inmobiliarias) y tercer público del blog.
// v6: títulos comerciales de 2026 a 2027 y tres URLs renombradas.
// v7: la hucha la custodia una entidad financiera autorizada; reglas de uso firmadas al inicio.
// v8: enlace a la calculadora de alquiler según el sueldo.
// v9: 50 artículos nuevos (20 inquilinos, 18 propietarios, 12 inmobiliarias).
// v10: 50 artículos de actualidad (acampadas, huelga del 11-N, decretos el 12-N, Francia, hoteles, Airbnb) y fecha de votación corregida.
// v11: vivienda en las elecciones del 29-N (2 artículos) y la fecha de votación de los decretos, sin confirmación oficial.
// v12: qué debe incluir un anuncio de alquiler según el art. 20 del RDL 29/2026 (3 artículos).
// v13: «¿Cuánto puede subir el alquiler en 2026 y 2027?» reescrito según Search Console (título, texto y BOE).
// v14: guía «Cómo poner tu piso en alquiler» ampliada y registro único corregido tras la anulación del Supremo (STS 620/2026).
// v15: «¿Es Madrid zona tensionada?» (búsqueda vista en Search Console).
// v16: nueva reducción del IRPF por alquiler (RDL 29/2026, hasta el 100 %) y cifras corregidas en 9 artículos.
// v17: «¿Firmar ahora o después de las elecciones?» con el calendario y el corte del IRPF del 1-12-2026.
// v18: enlaces a la calculadora de la reducción del IRPF.
// v19: «¿Cuánto cobra una inmobiliaria por gestionar tu alquiler?» (búsqueda de Search Console).
// v20: artículos de la convalidación con el IRPF y los anuncios del RDL 29/2026.
// v21: enlace a la página del IRAV desde el artículo del 2 %.
// v22: deducción del 10 % para inquilinos con los requisitos exactos del BOE (base imponible, base máxima, 50 km).
// v23: IVA del 10 % en reformas de pisos alquilados como vivienda habitual (RDL 29/2026, desde el 1-12-2026).
// v24: recargos del IBI (pisos vacíos y turísticos) según el texto del RDL 29/2026.
// v25: alquiler de temporada según el RDL 29/2026 (vivienda temporal, causa, garantía de una mensualidad, desistimiento).
// v26: documento de finalización del arrendamiento (art. 36.7 LAU) con plantilla.
// v27: formato de la plantilla del documento de finalización.
// v28: prórroga extraordinaria con los requisitos exactos de la disposición final 5.ª del RDL 29/2026.
// v29: gran tenedor (5 o más en zona tensionada, certificación registral, IRPF y anuncios).
// v30: alquiler por habitaciones según el RDL 29/2026 (arrendamiento de vivienda, límite en cualquier municipio).
// v31: desahucios de personas vulnerables según el texto del RDL 29/2026 (enervación extraordinaria, subrogación, excepciones).
// v32: impagos con la enervación extraordinaria del RDL 29/2026.
// v33: guía central del RDL 29/2026 para propietarios con enlaces a cada medida.
// v34: enlace a la guía del decreto en el aviso de convalidación.
// v35: enlaces de los artículos de gestión para agencias al de precios para propietarios.
// v36: seguro de impago con precios citados (OCU y otros) y el art. 36.5 LAU.
// v37: alquilar a jóvenes y bonificaciones fiscales con el nuevo régimen del IRPF.
// v38: fianza, garantía adicional y aval tras el RDL 29/2026.
// v39: plazos del desahucio con la enervación extraordinaria del RDL 29/2026.
// v40: inquilinos ante un desahucio con la enervación extraordinaria.
const BLOG_SEED_VERSION = 40

// v6: artículos «2026» como gancho pasan a «2027». Las URLs cambian; las antiguas redirigen con 301 (nuxt.config).
const BLOG_SLUG_RENAMES: [string, string][] = [
  ['como-buscar-piso-de-alquiler-en-2026', 'como-buscar-piso-de-alquiler-en-2027'],
  ['cuanto-cuesta-reformar-un-piso-2026', 'cuanto-cuesta-reformar-un-piso-2027'],
  ['normativa-inmobiliaria-alquiler-2026', 'normativa-inmobiliaria-alquiler-2027'],
]
const SEED_DATE_V2 = '2026-10-15'

async function seed(d: Driver) {
  const [meta] = await d.query(`SELECT value FROM app_meta WHERE key = 'blog_seed_version'`)
  const legacy = await d.query(`SELECT 1 FROM app_meta WHERE key = 'blog_seeded'`)
  const current = meta ? Number(meta.value) : legacy.length ? 1 : 0
  if (current >= BLOG_SEED_VERSION) return

  // Antes de insertar: renombrar las URLs cambiadas, para no duplicar el artículo con la URL nueva.
  for (const [from, to] of BLOG_SLUG_RENAMES) {
    await d.query(
      `UPDATE blog_posts SET slug = $2 WHERE slug = $1 AND NOT EXISTS (SELECT 1 FROM blog_posts WHERE slug = $2)`,
      [from, to],
    )
  }

  // Se insertan al revés para que el primero de la lista quede como el más reciente.
  for (const p of [...BLOG_SEED].reverse()) {
    await d.query(
      `INSERT INTO blog_posts (slug, title, excerpt, audience, category, body, published, published_at)
       VALUES ($1, $2, $3, $4, $5, $6, true, $7) ON CONFLICT (slug) DO NOTHING`,
      [p.slug, p.title, p.excerpt, p.audience, p.category, p.body, p.publishedAt],
    )
  }
  // Los artículos iniciales sin editar (updated_at igual a created_at) toman el texto actual del código.
  // No se toca updated_at, así siguen contando como «sin editar» en futuras correcciones.
  for (const p of BLOG_SEED) {
    await d.query(
      `UPDATE blog_posts SET title = $2, excerpt = $3, body = $4
       WHERE slug = $1 AND updated_at <= created_at + interval '1 second'
         AND (title, excerpt, body) IS DISTINCT FROM ($2::text, $3::text, $4::text)`,
      [p.slug, p.title, p.excerpt, p.body],
    )
  }
  // v2: los artículos de la v1 pasaron a fecha del 15 de octubre de 2026. Solo al actualizar desde la v1:
  // en una base de datos nueva cada artículo conserva su propia fecha.
  if (current === 1) {
    await d.query('UPDATE blog_posts SET published_at = $1::date WHERE slug = ANY($2::text[])', [SEED_DATE_V2, BLOG_SEED.map(p => p.slug)])
  }
  await d.query(
    `INSERT INTO app_meta (key, value) VALUES ('blog_seed_version', $1)
     ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value`,
    [String(BLOG_SEED_VERSION)],
  )
}

// Tareas iniciales del tablero: se cargan una sola vez; después el tablero lo gestiona el panel.
async function seedTasks(d: Driver) {
  const done = await d.query(`SELECT 1 FROM app_meta WHERE key = 'tasks_seeded'`)
  if (done.length) return
  let position = 0
  for (const t of TASKS_SEED) {
    await d.query(
      'INSERT INTO tasks (title, description, status, owner, priority, area, position) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [t.title, t.description, t.status, t.owner, t.priority, t.area, position++],
    )
  }
  await d.query(`INSERT INTO app_meta (key, value) VALUES ('tasks_seeded', '1')`)
}

async function init(): Promise<Driver> {
  const d = await connect()
  await migrate(d)
  await seed(d)
  await seedTasks(d)
  return d
}

const camel = (s: string) => s.replace(/_([a-z0-9])/g, (_, c: string) => c.toUpperCase())

// Filas con claves en camelCase y fechas como texto ISO (igual con postgres.js y con PGlite).
function normalize<T>(row: Row): T {
  const out: Row = {}
  for (const [k, v] of Object.entries(row)) out[camel(k)] = v instanceof Date ? v.toISOString() : v
  return out as T
}

export async function query<T = Row>(text: string, params: unknown[] = []): Promise<T[]> {
  ready ??= init().catch((e) => { ready = null; throw e })
  const d = await ready
  // postgres.js no acepta undefined: se guarda como NULL.
  return (await d.query(text, params.map(p => (p === undefined ? null : p)))).map(r => normalize<T>(r))
}

export async function queryOne<T = Row>(text: string, params: unknown[] = []): Promise<T | null> {
  return (await query<T>(text, params))[0] ?? null
}
