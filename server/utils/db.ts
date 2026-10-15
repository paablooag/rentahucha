import postgres from 'postgres'
import { MIGRATIONS } from '../db/migrations'
import { BLOG_SEED as BLOG_SEED_V1 } from '../data/blog-seed'
import { BLOG_SEED_V2 } from '../data/blog-seed-v2'
import { BLOG_SEED_V3_ELECCIONES } from '../data/blog-seed-v3-elecciones'
import { BLOG_SEED_V3_REFORMAS } from '../data/blog-seed-v3-reformas'
import { BLOG_SEED_V3_ALQUILAR } from '../data/blog-seed-v3-alquilar'
import { BLOG_SEED_V3_INQUILINOS } from '../data/blog-seed-v3-inquilinos'

// Los nuevos primero: al insertar en orden inverso, el primero de la lista queda como el más reciente.
const BLOG_SEED = [
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

// Artículos iniciales por versiones. Cada versión nueva añade los que falten (sin tocar los ya editados en
// /admin) y puede aplicar un ajuste puntual. Sube BLOG_SEED_VERSION al añadir artículos a BLOG_SEED.
const BLOG_SEED_VERSION = 3
const SEED_DATE_V2 = '2026-10-15'

async function seed(d: Driver) {
  const [meta] = await d.query(`SELECT value FROM app_meta WHERE key = 'blog_seed_version'`)
  const legacy = await d.query(`SELECT 1 FROM app_meta WHERE key = 'blog_seeded'`)
  const current = meta ? Number(meta.value) : legacy.length ? 1 : 0
  if (current >= BLOG_SEED_VERSION) return

  // Se insertan al revés para que el primero de la lista quede como el más reciente.
  for (const p of [...BLOG_SEED].reverse()) {
    await d.query(
      `INSERT INTO blog_posts (slug, title, excerpt, audience, category, body, published, published_at)
       VALUES ($1, $2, $3, $4, $5, $6, true, $7) ON CONFLICT (slug) DO NOTHING`,
      [p.slug, p.title, p.excerpt, p.audience, p.category, p.body, p.publishedAt],
    )
  }
  // v2: todos los artículos iniciales con fecha de publicación del 15 de octubre de 2026.
  if (current < 2) {
    await d.query('UPDATE blog_posts SET published_at = $1::date WHERE slug = ANY($2::text[])', [SEED_DATE_V2, BLOG_SEED.map(p => p.slug)])
  }
  await d.query(
    `INSERT INTO app_meta (key, value) VALUES ('blog_seed_version', $1)
     ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value`,
    [String(BLOG_SEED_VERSION)],
  )
}

async function init(): Promise<Driver> {
  const d = await connect()
  await migrate(d)
  await seed(d)
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
