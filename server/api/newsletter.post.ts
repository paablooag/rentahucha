export default defineEventHandler(async (event) => {
  rateLimit(event, 'newsletter', 20, 60 * 60 * 1000)
  const body = await readBody<Record<string, unknown>>(event)
  if (typeof body?.website === 'string' && body.website.trim()) return { ok: true }

  const result = validateNewsletter(body ?? {})
  if (!result.ok) throw createError({ statusCode: 422, statusMessage: result.error })

  await query('INSERT INTO newsletter_subscribers (email) VALUES ($1) ON CONFLICT (email) DO NOTHING', [result.email])
  return { ok: true }
})
