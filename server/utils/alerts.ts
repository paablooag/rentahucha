import { PROPERTY_OPTIONS } from '#shared/utils/properties'
import { randomBytes } from 'node:crypto'

// Alertas de búsqueda: quien busca piso deja su búsqueda y su correo (con consentimiento) y le avisamos,
// como mucho una vez al día, de los pisos publicados que encajan. Baja en un clic con el enlace de cada correo.

export interface AlertInput { email: string; city: string; maxRent: number | null; minBedrooms: number | null; stayType: string }

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
export function validateAlert(i: Record<string, unknown>): { ok: true; data: AlertInput } | { ok: false; error: string } {
  const num = (v: unknown, min: number, max: number) => { const n = Math.round(Number(v)); return Number.isFinite(n) && n >= min && n <= max ? n : null }
  const data: AlertInput = {
    email: String(i.email ?? '').trim().toLowerCase().slice(0, 120),
    city: String(i.city ?? '').trim().replace(/\s+/g, ' ').slice(0, 60),
    maxRent: num(i.maxRent, 100, 20000),
    minBedrooms: num(i.minBedrooms, 1, 10),
    stayType: (PROPERTY_OPTIONS.stayType as readonly string[]).includes(String(i.stayType)) ? String(i.stayType) : '',
  }
  if (!EMAIL.test(data.email)) return { ok: false, error: 'Revisa el correo: no parece válido.' }
  if (data.city.length < 2) return { ok: false, error: '¿En qué ciudad buscas?' }
  if (i.consent !== true) return { ok: false, error: 'Marca la casilla para que podamos avisarte por correo.' }
  return { ok: true, data }
}

export const describeAlert = (a: { city: string; maxRent: number | null; minBedrooms: number | null }) =>
  [`pisos en ${a.city}`, a.maxRent ? `hasta ${a.maxRent} €` : '', a.minBedrooms ? `${a.minBedrooms} hab. o más` : ''].filter(Boolean).join(' · ')

export async function createAlert(a: AlertInput) {
  const existing = await queryOne<{ id: string }>(
    `SELECT id FROM search_alerts WHERE email = $1 AND lower(city) = lower($2)
       AND max_rent IS NOT DISTINCT FROM $3::int AND min_bedrooms IS NOT DISTINCT FROM $4::int AND stay_type = $5`,
    [a.email, a.city, a.maxRent, a.minBedrooms, a.stayType],
  )
  if (existing) return { created: false }
  const token = randomBytes(24).toString('base64url')
  await query(
    `INSERT INTO search_alerts (email, city, max_rent, min_bedrooms, stay_type, token, last_sent_at) VALUES ($1, $2, $3, $4, $5, $6, now())`,
    [a.email, a.city, a.maxRent, a.minBedrooms, a.stayType, token],
  )
  const mail = mailLayout({
    preheader: 'Te avisaremos cuando se publique un piso que encaje.',
    eyebrow: 'Alerta de pisos',
    title: 'Tu alerta está activa',
    paragraphs: ['Te avisaremos por correo, como mucho una vez al día, cuando se publique un piso que encaje con tu búsqueda.'],
    highlight: { label: 'Tu búsqueda', text: describeAlert(a) },
    button: { label: 'Ver los pisos publicados', url: siteUrl(`/pisos?ciudad=${encodeURIComponent(a.city)}`) },
    after: [`Mientras tanto, prepara tu carta de presentación: ${siteUrl('/herramientas/carta-inquilino')}`, `Para cancelar esta alerta: ${siteUrl(`/alertas/baja?token=${token}`)}`],
    footer: 'Recibes este correo porque has creado una alerta de pisos en RentaHucha.',
  })
  sendMailLater({ to: a.email, subject: `Alerta activa: ${describeAlert(a)}`, ...mail })
  return { created: true }
}

/** Envía las alertas con pisos nuevos (publicados después del último envío). Se llama cada hora desde un plugin. */
export async function sendDueAlerts(opts: { ignoreDailyLimit?: boolean } = {}) {
  const alerts = await query<{ id: string; email: string; city: string; maxRent: number | null; minBedrooms: number | null; stayType: string; token: string; lastSentAt: string }>(
    `SELECT id, email, city, max_rent, min_bedrooms, stay_type, token, last_sent_at FROM search_alerts
     WHERE $1 OR last_sent_at < now() - interval '20 hours' LIMIT 200`,
    [opts.ignoreDailyLimit === true],
  )
  let sent = 0
  for (const a of alerts) {
    const pisos = await query<{ id: string; title: string; rent: number; bedrooms: number; district: string; city: string; photoId: string | null }>(
      `SELECT p.id, p.title, p.rent, p.bedrooms, p.district, p.city,
              (SELECT f.id FROM property_photos f WHERE f.property_id = p.id ORDER BY f.position, f.created_at LIMIT 1) AS photo_id
       FROM properties p
       WHERE p.status = 'publicado' AND p.published_at > $1
         AND (lower(p.city) LIKE $2 OR lower(p.district) LIKE $2)
         AND ($3::int IS NULL OR p.rent <= $3::int) AND ($4::int IS NULL OR p.bedrooms >= $4::int) AND ($5 = '' OR p.stay_type = $5)
       ORDER BY p.published_at DESC LIMIT 6`,
      [a.lastSentAt, `%${a.city.toLowerCase()}%`, a.maxRent, a.minBedrooms, a.stayType],
    )
    await query('UPDATE search_alerts SET last_sent_at = now() WHERE id = $1', [a.id])
    if (!pisos.length) continue
    const list = pisos.map(p => `· ${p.title} — ${p.rent} €/mes, ${p.bedrooms} hab., ${p.district ? `${p.district}, ` : ''}${p.city}: ${siteUrl(`/pisos/${p.id}`)}`).join('\n')
    const mail = mailLayout({
      preheader: `${pisos.length === 1 ? 'Hay un piso nuevo' : `Hay ${pisos.length} pisos nuevos`} para tu búsqueda.`,
      eyebrow: 'Alerta de pisos',
      title: pisos.length === 1 ? 'Hay un piso nuevo que encaja contigo' : `Hay ${pisos.length} pisos nuevos que encajan contigo`,
      paragraphs: [`Para tu búsqueda de ${describeAlert(a)}:`],
      highlight: { text: list },
      button: { label: 'Ver los pisos', url: siteUrl(`/pisos?ciudad=${encodeURIComponent(a.city)}`) },
      after: ['Escribe pronto al propietario desde la web: los primeros mensajes son los que más respuestas reciben. Nunca pagues ni envíes dinero antes de visitar el piso.', `Para cancelar esta alerta: ${siteUrl(`/alertas/baja?token=${a.token}`)}`],
      footer: 'Recibes este correo porque creaste una alerta de pisos en RentaHucha.',
    })
    if (await sendMail({ to: a.email, subject: `Pisos nuevos: ${describeAlert(a)}`, ...mail })) sent++
  }
  return sent
}

/** Cuántas personas buscan piso en una ciudad (alertas + inquilinos en la lista de espera). Para mostrar demanda real. */
export async function demandFor(city: string) {
  const row = await queryOne<{ n: number }>(
    `SELECT (SELECT count(DISTINCT email) FROM search_alerts WHERE lower(city) = lower($1))
          + (SELECT count(*) FROM leads WHERE role = 'inquilino' AND lower(city) = lower($1)) AS n`,
    [city],
  )
  return Number(row?.n ?? 0)
}
