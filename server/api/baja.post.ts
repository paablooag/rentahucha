// Baja de la newsletter (y del aviso del IRAV) con el enlace de cada correo, sin cuenta.
// Quita también el permiso de novedades de la lista de espera; los datos de la lista se mantienen.
export default defineEventHandler(async (event) => {
  rateLimit(event, 'news-off', 30, 60 * 60 * 1000)
  const token = String((await readBody<{ token?: string }>(event))?.token ?? '').slice(0, 100)
  const row = token ? await queryOne<{ email: string }>('DELETE FROM newsletter_subscribers WHERE token = $1 RETURNING email', [token]) : null
  if (!row) throw createError({ statusCode: 404, statusMessage: 'Ya no estás suscrito o el enlace no es válido.' })
  await query('UPDATE leads SET consent_news = false, updated_at = now() WHERE email = $1 AND consent_news', [row.email])
  return { ok: true }
})
