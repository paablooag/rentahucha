// Propone una visita al piso. La fecha se guarda tal cual en hora local de España («2026-11-07T11:00»).
export default defineEventHandler(async (event) => {
  const user = await requireUser(event)
  rateLimit(event, 'visit', 30, 60 * 60 * 1000)
  const c = await getConversationFor(user, getRouterParam(event, 'id'))
  assertNotBlocked(c)
  if (c.propertyStatus === 'alquilado') throw createError({ statusCode: 409, statusMessage: 'Este piso ya está alquilado.' })
  const at = String((await readBody<{ at?: string }>(event))?.at ?? '')
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(at)) throw createError({ statusCode: 422, statusMessage: 'Elige día y hora.' })
  // Comparación aproximada (hora del servidor en UTC): basta para descartar fechas pasadas o demasiado lejanas.
  const ms = Date.parse(`${at}:00Z`) - Date.now()
  if (ms < -2 * 3600e3) throw createError({ statusCode: 422, statusMessage: 'Esa fecha ya ha pasado.' })
  if (ms > 90 * 864e5) throw createError({ statusCode: 422, statusMessage: 'Propón una fecha dentro de los próximos 3 meses.' })

  const isOwner = c.ownerId === user.id
  const row = await queryOne<{ id: number; createdAt: string }>(
    `INSERT INTO messages (conversation_id, sender_id, body, kind, meta) VALUES ($1, $2, 'Propuesta de visita', 'visita', $3::jsonb) RETURNING id, created_at`,
    [c.id, user.id, JSON.stringify({ at, status: 'propuesta' })],
  )
  await query(`UPDATE conversations SET last_message_at = now(), ${isOwner ? 'owner' : 'tenant'}_read_at = now() WHERE id = $1`, [c.id])
  return { id: Number(row!.id), body: 'Propuesta de visita', kind: 'visita', meta: { at, status: 'propuesta' }, createdAt: row!.createdAt, mine: true }
})
