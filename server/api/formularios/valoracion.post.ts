import { VALUATION_CONSENT, validateValuation } from '#shared/utils/forms'

// Solicitud de valoración gratuita del alquiler. La responde una persona del equipo con comparables de la zona.
export default defineEventHandler(async (event) => {
  rateLimit(event, 'valuation', 10, 60 * 60 * 1000)
  const body = await readBody<Record<string, unknown>>(event)
  if (typeof body?.website === 'string' && body.website.trim()) return { ok: true } // campo trampa

  const r = validateValuation(body ?? {})
  if (!r.ok) throw createError({ statusCode: 422, statusMessage: 'Revisa los datos', data: { errors: r.errors } })
  const { name, email, phone, city, consentNews, ...rest } = r.data
  await query(
    `INSERT INTO form_submissions (kind, name, email, phone, city, data, consent_news, consent_at, consent_text)
     VALUES ('valoracion', $1, $2, $3, $4, $5::jsonb, $6, now(), $7)`,
    [name, email, phone, city, JSON.stringify(rest), consentNews, VALUATION_CONSENT],
  )
  if (consentNews) await query(`INSERT INTO newsletter_subscribers (email, source) VALUES ($1, 'valoracion') ON CONFLICT (email) DO NOTHING`, [email])
  return { ok: true }
})
