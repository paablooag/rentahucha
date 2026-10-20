import { createHash } from 'node:crypto'

// Registro de visitas y conversiones, sin cookies ni nada guardado en el dispositivo del visitante.
// El visitante se identifica con un hash de IP + navegador + una sal que cambia cada día: sirve para contar
// visitantes únicos del día, pero no permite seguir a nadie entre días ni recuperar la IP (que no se guarda).

const BOTS = /bot|crawl|spider|slurp|bing|google|yandex|baidu|duckduck|facebookexternalhit|preview|headless|lighthouse|monitor|curl|wget|python|axios|node-fetch/i
const EVENTS = new Set(['view', 'lead_propietario', 'lead_inquilino', 'lead_inmobiliaria', 'newsletter', 'checklist', 'cta', 'valoracion', 'test', 'encuesta', 'anuncio_generado', 'carta_generada'])

function dailySalt() {
  const day = new Date().toISOString().slice(0, 10)
  return createHash('sha256').update(`${adminCredentials().sessionPassword}:${day}`).digest('hex')
}

const clip = (v: unknown, max: number) => (typeof v === 'string' && v.trim() ? v.trim().slice(0, max) : null)

export default defineEventHandler(async (event) => {
  rateLimit(event, 'track', 240, 60 * 1000)
  const ua = getRequestHeader(event, 'user-agent') ?? ''
  if (!ua || BOTS.test(ua)) return { ok: true }

  const body = await readBody<Record<string, unknown>>(event).catch(() => null)
  const path = clip(body?.p, 300)
  if (!path || !path.startsWith('/') || path.startsWith('/admin') || path.startsWith('/api')) return { ok: true }
  const ev = typeof body?.e === 'string' && EVENTS.has(body.e) ? body.e : 'view'

  // Solo el dominio de origen, nunca la URL completa de la que viene la visita.
  let referrer: string | null = null
  try {
    const host = new URL(String(body?.r ?? '')).hostname.replace(/^www\./, '')
    referrer = host && !host.endsWith('rentahucha.es') ? host.slice(0, 100) : null
  }
  catch { referrer = null }

  const device = /ipad|tablet/i.test(ua) ? 'tablet' : /mobi|android|iphone/i.test(ua) ? 'móvil' : 'escritorio'
  const ip = getRequestIP(event, { xForwardedFor: true }) ?? ''
  const visitor = createHash('sha256').update(`${dailySalt()}:${ip}:${ua}`).digest('hex').slice(0, 20)

  await query(
    `INSERT INTO pageviews (event, path, referrer, utm_source, utm_medium, utm_campaign, device, visitor)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
    [ev, path.split('?')[0], referrer, clip(body?.us, 60), clip(body?.um, 60), clip(body?.uc, 80), device, visitor],
  )
  // Conservación limitada: se borran de vez en cuando las visitas de hace más de 13 meses.
  if (Math.random() < 0.01) await query(`DELETE FROM pageviews WHERE ts < now() - interval '13 months'`)
  return { ok: true }
})
