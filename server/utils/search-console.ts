import { readFileSync } from 'node:fs'
import { createSign } from 'node:crypto'

// Google Search Console (solo lectura) con una cuenta de servicio. La clave JSON vive en el servidor, fuera del repositorio:
// NUXT_GSC_KEY_FILE=/opt/rentahucha/shared/gsc-key.json y, si cambia la propiedad, NUXT_GSC_SITE (por defecto sc-domain:rentahucha.es).

interface ServiceKey { client_email: string; private_key: string }
let cachedToken: { token: string; exp: number } | null = null

function gscConfig() {
  const c = useRuntimeConfig()
  return { keyFile: String(c.gscKeyFile ?? ''), site: String(c.gscSite || 'sc-domain:rentahucha.es') }
}
export const gscConfigured = () => !!gscConfig().keyFile

async function accessToken(): Promise<string> {
  if (cachedToken && cachedToken.exp > Date.now() + 60_000) return cachedToken.token
  const key = JSON.parse(readFileSync(gscConfig().keyFile, 'utf-8')) as ServiceKey
  const b64 = (o: object) => Buffer.from(JSON.stringify(o)).toString('base64url')
  const now = Math.floor(Date.now() / 1000)
  const unsigned = `${b64({ alg: 'RS256', typ: 'JWT' })}.${b64({ iss: key.client_email, scope: 'https://www.googleapis.com/auth/webmasters.readonly', aud: 'https://oauth2.googleapis.com/token', iat: now, exp: now + 3600 })}`
  const signature = createSign('RSA-SHA256').update(unsigned).sign(key.private_key, 'base64url')
  const res = await $fetch<{ access_token: string; expires_in: number }>('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: `${unsigned}.${signature}` }).toString(),
  })
  cachedToken = { token: res.access_token, exp: Date.now() + res.expires_in * 1000 }
  return res.access_token
}

interface GscRow { keys?: string[]; clicks: number; impressions: number; position: number }

async function searchAnalytics(body: Record<string, unknown>): Promise<GscRow[]> {
  const out: GscRow[] = []
  // La API devuelve como mucho 25.000 filas por petición: se pagina con startRow.
  for (let startRow = 0; ; startRow += 25000) {
    const res = await $fetch<{ rows?: GscRow[] }>(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(gscConfig().site)}/searchAnalytics/query`, {
      method: 'POST',
      headers: { authorization: `Bearer ${await accessToken()}` },
      body: { ...body, rowLimit: 25000, startRow, dataState: 'all' },
    })
    out.push(...(res.rows ?? []))
    if ((res.rows?.length ?? 0) < 25000) return out
  }
}

const isoDay = (d: Date) => d.toISOString().slice(0, 10)
// Solo la ruta, sin dominio ni protocolo (Google puede devolver http:// y https://).
const pathOf = (url: string) => { try { return new URL(url).pathname } catch { return url } }

async function insertRows(table: string, cols: string[], rows: unknown[][]) {
  for (let i = 0; i < rows.length; i += 400) {
    const chunk = rows.slice(i, i + 400)
    const params: unknown[] = []
    const values = chunk.map((r) => `(${r.map(v => { params.push(v); return `$${params.length}` }).join(', ')})`).join(', ')
    await query(`INSERT INTO ${table} (${cols.join(', ')}) VALUES ${values}`, params)
  }
}

/** Trae los datos de Search Console de los últimos `days` días y sustituye los guardados (Google los completa durante unos días). */
export async function syncSearchConsole(days?: number) {
  if (!gscConfigured()) return { ok: false as const, reason: 'Sin configurar (NUXT_GSC_KEY_FILE).' }
  const empty = !(await queryOne('SELECT 1 FROM gsc_daily LIMIT 1'))
  // La primera vez, todo el histórico que guarda Google (16 meses); después, los últimos 7 días.
  const span = days ?? (empty ? 480 : 7)
  const end = new Date()
  const start = new Date(Date.now() - span * 86_400_000)
  const range = { startDate: isoDay(start), endDate: isoDay(end) }

  const [totals, pages, queries] = await Promise.all([
    searchAnalytics({ ...range, dimensions: ['date'] }),
    searchAnalytics({ ...range, dimensions: ['date', 'page'] }),
    searchAnalytics({ ...range, dimensions: ['date', 'query', 'page'] }),
  ])

  // Varias URLs (http y https) pueden dar la misma ruta: se agrupan.
  const byPage = new Map<string, { day: string; page: string; clicks: number; impressions: number; posSum: number }>()
  for (const r of pages) {
    const [day, url] = r.keys!
    const k = `${day}|${pathOf(url!)}`
    const e = byPage.get(k) ?? { day: day!, page: pathOf(url!), clicks: 0, impressions: 0, posSum: 0 }
    e.clicks += r.clicks; e.impressions += r.impressions; e.posSum += r.position * r.impressions
    byPage.set(k, e)
  }

  await query('DELETE FROM gsc_daily WHERE day >= $1', [range.startDate])
  await query('DELETE FROM gsc_pages WHERE day >= $1', [range.startDate])
  await query('DELETE FROM gsc_queries WHERE day >= $1', [range.startDate])
  await insertRows('gsc_daily', ['day', 'clicks', 'impressions', 'position'], totals.map(r => [r.keys![0], r.clicks, r.impressions, r.position]))
  await insertRows('gsc_pages', ['day', 'page', 'clicks', 'impressions', 'position'],
    [...byPage.values()].map(e => [e.day, e.page, e.clicks, e.impressions, e.impressions ? e.posSum / e.impressions : 0]))
  await insertRows('gsc_queries', ['day', 'query', 'page', 'clicks', 'impressions', 'position'],
    queries.map(r => [r.keys![0], r.keys![1], pathOf(r.keys![2]!), r.clicks, r.impressions, r.position]))
  await query(
    `INSERT INTO app_meta (key, value) VALUES ('gsc_synced_at', $1) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value`,
    [new Date().toISOString()],
  )
  return { ok: true as const, days: totals.length, pages: byPage.size, queries: queries.length }
}
