import { createHash } from 'node:crypto'

// Registro de visitas y comportamiento, sin cookies ni nada guardado en el dispositivo del visitante.
// - El visitante del día es un hash de IP + navegador + una sal diaria: no permite seguir a nadie entre días ni recuperar la IP.
// - La «visita» es un identificador aleatorio que solo vive en la memoria de la pestaña (recorridos dentro de la visita).
// - Al salir de cada página llega el tiempo visible, lo que se ha bajado y los clics (posición relativa) para el mapa de calor.
// - Las visitas del equipo (con la sesión del panel abierta) no se cuentan.

const BOTS = /bot|crawl|spider|slurp|bing|google|yandex|baidu|duckduck|facebookexternalhit|preview|headless|lighthouse|monitor|curl|wget|python|axios|node-fetch|prueba de humo/i
const EVENTS = new Set(['view', 'time', 'lead_propietario', 'lead_inquilino', 'lead_inmobiliaria', 'newsletter', 'checklist', 'cta', 'valoracion', 'test', 'encuesta', 'anuncio_generado', 'carta_generada', 'alerta'])

function dailySalt() {
  const day = new Date().toISOString().slice(0, 10)
  return createHash('sha256').update(`${adminCredentials().sessionPassword}:${day}`).digest('hex')
}

const clip = (v: unknown, max: number) => (typeof v === 'string' && v.trim() ? v.trim().slice(0, max) : null)
const int = (v: unknown, min: number, max: number) => { const n = Math.round(Number(v)); return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : null }
const deviceFromWidth = (w: number | null, ua: string) => (w ? (w < 700 ? 'móvil' : w < 1100 ? 'tablet' : 'escritorio') : /ipad|tablet/i.test(ua) ? 'tablet' : /mobi|android|iphone/i.test(ua) ? 'móvil' : 'escritorio')

export default defineEventHandler(async (event) => {
  rateLimit(event, 'track', 400, 60 * 1000)
  const ua = getRequestHeader(event, 'user-agent') ?? ''
  if (!ua || BOTS.test(ua)) return { ok: true }
  // El equipo no cuenta: si hay sesión del panel en este navegador, se ignora.
  const admin = await adminSession(event).then(s => s.data.user).catch(() => null)
  if (admin) return { ok: true, skipped: 'equipo' }

  const body = await readBody<Record<string, unknown>>(event).catch(() => null)
  const path = clip(body?.p, 300)?.split('?')[0] ?? null
  if (!path || !path.startsWith('/') || path.startsWith('/admin') || path.startsWith('/api') || path.startsWith('/dossier')) return { ok: true }
  const ev = typeof body?.e === 'string' && EVENTS.has(body.e) ? body.e : 'view'
  const visit = clip(body?.v, 40)
  const seq = int(body?.s, 0, 10000)
  const width = int(body?.w, 200, 5000)
  const device = deviceFromWidth(width, ua)

  // Fin de una página: tiempo visible, scroll y clics.
  if (ev === 'time') {
    if (!visit || seq === null) return { ok: true }
    const duration = int(body?.d, 0, 30 * 60 * 1000)
    const scroll = int(body?.sc, 0, 100)
    await query(
      `UPDATE pageviews SET duration_ms = GREATEST(COALESCE(duration_ms, 0), $3), max_scroll = GREATEST(COALESCE(max_scroll, 0), $4)
       WHERE visit = $1 AND seq = $2 AND path = $5 AND ts > now() - interval '1 day'`,
      [visit, seq, duration, scroll, path],
    )
    const clicks = Array.isArray(body?.c) ? (body.c as unknown[]).slice(0, 60) : []
    for (const c of clicks) {
      if (!Array.isArray(c)) continue
      const x = int(c[0], 0, 1000)
      const y = int(c[1], 0, 1000)
      if (x === null || y === null) continue
      await query('INSERT INTO page_clicks (path, device, x, y, target) VALUES ($1, $2, $3, $4, $5)', [path, device, x, y, clip(c[2], 60) ?? ''])
    }
    return { ok: true }
  }

  // Solo el dominio de origen, nunca la URL completa de la que viene la visita.
  let referrer: string | null = null
  try {
    const host = new URL(String(body?.r ?? '')).hostname.replace(/^www\./, '')
    referrer = host && !host.endsWith('rentahucha.es') ? host.slice(0, 100) : null
  }
  catch { referrer = null }

  const ip = getRequestIP(event, { xForwardedFor: true }) ?? ''
  const visitor = createHash('sha256').update(`${dailySalt()}:${ip}:${ua}`).digest('hex').slice(0, 20)

  await query(
    `INSERT INTO pageviews (event, path, referrer, utm_source, utm_medium, utm_campaign, device, visitor, visit, seq)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
    [ev, path, referrer, clip(body?.us, 60), clip(body?.um, 60), clip(body?.uc, 80), device, visitor, ev === 'view' ? visit : null, ev === 'view' ? seq : null],
  )
  // Conservación limitada: se borran de vez en cuando las visitas y clics de hace más de 13 meses.
  if (Math.random() < 0.01) {
    await query(`DELETE FROM pageviews WHERE ts < now() - interval '13 months'`)
    await query(`DELETE FROM page_clicks WHERE ts < now() - interval '13 months'`)
  }
  return { ok: true }
})
