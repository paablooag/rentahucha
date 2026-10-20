export default defineEventHandler(async (event) => {
  rateLimit(event, 'newsletter', 20, 60 * 60 * 1000)
  const body = await readBody<Record<string, unknown>>(event)
  if (typeof body?.website === 'string' && body.website.trim()) return { ok: true }

  const result = validateNewsletter(body ?? {})
  if (!result.ok) throw createError({ statusCode: 422, statusMessage: result.error })

  // Origen del alta: el pie de la web, la checklist para propietarios (a cambio del PDF) o el test del propietario.
  const source = body?.source === 'checklist' || body?.source === 'test' ? body.source : 'pie'
  await query('INSERT INTO newsletter_subscribers (email, source) VALUES ($1, $2) ON CONFLICT (email) DO NOTHING', [result.email, source])
  return { ok: true }
})
