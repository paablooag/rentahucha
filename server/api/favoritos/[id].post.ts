// Guarda o quita un piso de favoritos (alterna). Devuelve si queda guardado.
export default defineEventHandler(async (event) => {
  const user = await requireUser(event)
  rateLimit(event, 'favorite', 200, 60 * 60 * 1000)
  const p = await getPublicProperty(getRouterParam(event, 'id') ?? '')
  const removed = await query('DELETE FROM favorites WHERE user_id = $1 AND property_id = $2 RETURNING 1', [user.id, p.id])
  if (removed.length) return { saved: false }
  await query('INSERT INTO favorites (user_id, property_id) VALUES ($1, $2) ON CONFLICT DO NOTHING', [user.id, p.id])
  return { saved: true }
})
