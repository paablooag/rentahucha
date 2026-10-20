// Baja de una alerta con el enlace del correo (no hace falta cuenta).
export default defineEventHandler(async (event) => {
  rateLimit(event, 'alert-off', 30, 60 * 60 * 1000)
  const token = String((await readBody<{ token?: string }>(event))?.token ?? '').slice(0, 100)
  const row = await queryOne<{ city: string }>('DELETE FROM search_alerts WHERE token = $1 RETURNING city', [token])
  if (!row) throw createError({ statusCode: 404, statusMessage: 'Esta alerta ya no existe o el enlace no es válido.' })
  return { ok: true, city: row.city }
})
