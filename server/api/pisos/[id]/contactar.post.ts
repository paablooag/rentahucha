// Primer mensaje de un inquilino al propietario de un piso: crea (o reutiliza) la conversación.
export default defineEventHandler(async (event) => {
  const user = await requireUser(event, 'inquilino')
  rateLimit(event, 'contact', 30, 60 * 60 * 1000)
  const p = await getPublicProperty(getRouterParam(event, 'id') ?? '')
  if (p.status === 'alquilado') throw createError({ statusCode: 409, statusMessage: 'Este piso ya está alquilado.' })
  const body = String((await readBody<{ message?: string }>(event))?.message ?? '').trim().slice(0, 4000)
  if (body.length < 10) throw createError({ statusCode: 422, statusMessage: 'Cuéntale algo más al propietario (al menos 10 caracteres).' })

  const conv = await queryOne<{ id: string }>(
    `INSERT INTO conversations (property_id, tenant_id, owner_id, tenant_read_at) VALUES ($1, $2, $3, now())
     ON CONFLICT (property_id, tenant_id) DO UPDATE SET last_message_at = now(), tenant_read_at = now()
     RETURNING id`,
    [p.id, user.id, p.ownerId],
  )
  const blocked = await queryOne('SELECT 1 FROM conversations WHERE id = $1 AND blocked_at IS NOT NULL', [conv!.id])
  if (blocked) throw createError({ statusCode: 403, statusMessage: 'Esta conversación está bloqueada.' })
  await query('INSERT INTO messages (conversation_id, sender_id, body) VALUES ($1, $2, $3)', [conv!.id, user.id, body])
  notifyNewMessage(conv!.id, user.id, body)
  return { conversationId: conv!.id }
})
