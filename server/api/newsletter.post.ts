export default defineEventHandler(async (event) => {
  rateLimit(event, 'newsletter', 20, 60 * 60 * 1000)
  const body = await readBody<Record<string, unknown>>(event)
  if (typeof body?.website === 'string' && body.website.trim()) return { ok: true }

  const result = validateNewsletter(body ?? {})
  if (!result.ok) throw createError({ statusCode: 422, statusMessage: result.error })

  const storage = db()
  const subscribers = await listByPrefix<StoredSubscriber>('newsletter:')
  if (!subscribers.some(s => s.email === result.email)) {
    const now = new Date().toISOString()
    const id = newId()
    await storage.setItem(`newsletter:${id}`, { id, email: result.email, createdAt: now, consentAt: now } satisfies StoredSubscriber)
  }
  return { ok: true }
})
