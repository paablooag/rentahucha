import { validateSurvey } from '#shared/utils/forms'

// Respuesta a la encuesta del alquiler. Anónima salvo que se deje el correo para recibir los resultados.
export default defineEventHandler(async (event) => {
  rateLimit(event, 'survey', 5, 60 * 60 * 1000)
  const body = await readBody<Record<string, unknown>>(event)
  if (typeof body?.website === 'string' && body.website.trim()) return surveyResults()

  const r = validateSurvey(body ?? {})
  if (!r.ok) throw createError({ statusCode: 422, statusMessage: r.error })
  const { email, city, consentNews, ...answers } = r.data
  await query(
    `INSERT INTO form_submissions (kind, email, city, data, consent_news, consent_at, consent_text)
     VALUES ('encuesta', $1, $2, $3::jsonb, $4, CASE WHEN $4 THEN now() END, $5)`,
    [consentNews ? email : '', city, JSON.stringify(answers), consentNews, consentNews ? 'Acepto recibir los resultados de la encuesta y correos informativos de RentaHucha, según la política de privacidad.' : ''],
  )
  if (consentNews && email) await query(`INSERT INTO newsletter_subscribers (email, source) VALUES ($1, 'encuesta') ON CONFLICT (email) DO NOTHING`, [email])
  return surveyResults()
})
