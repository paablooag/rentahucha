// Crear una alerta de búsqueda de pisos (público, con consentimiento).
export default defineEventHandler(async (event) => {
  rateLimit(event, 'alert', 10, 60 * 60 * 1000)
  const body = await readBody<Record<string, unknown>>(event)
  if (typeof body?.website === 'string' && body.website.trim()) return { ok: true }
  const r = validateAlert(body ?? {})
  if (!r.ok) throw createError({ statusCode: 422, statusMessage: r.error })
  const { created } = await createAlert(r.data)
  return { ok: true, created }
})
