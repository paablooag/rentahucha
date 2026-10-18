// Responder a una propuesta de visita: la otra persona la acepta o la rechaza; cualquiera puede cancelarla después.
export default defineEventHandler(async (event) => {
  const user = await requireUser(event)
  const c = await getConversationFor(user, getRouterParam(event, 'id'))
  const msgId = Number(getRouterParam(event, 'msgId'))
  const { action } = await readBody<{ action?: string }>(event)
  const m = await queryOne<{ id: number; senderId: string; meta: { at: string; status: string } | string }>(
    `SELECT id, sender_id, meta FROM messages WHERE id = $1 AND conversation_id = $2 AND kind = 'visita'`,
    [msgId, c.id],
  )
  if (!m) throw createError({ statusCode: 404, statusMessage: 'Propuesta no encontrada' })
  const meta = typeof m.meta === 'string' ? JSON.parse(m.meta) : m.meta
  const proposer = m.senderId === user.id

  let status: string
  if ((action === 'aceptar' || action === 'rechazar') && !proposer && meta.status === 'propuesta') status = action === 'aceptar' ? 'aceptada' : 'rechazada'
  else if (action === 'cancelar' && (meta.status === 'aceptada' || (meta.status === 'propuesta' && proposer))) status = 'cancelada'
  else throw createError({ statusCode: 409, statusMessage: 'No se puede hacer este cambio.' })

  const next = { ...meta, status, by: user.id === c.ownerId ? 'propietario' : 'inquilino' }
  await query('UPDATE messages SET meta = $2::jsonb, updated_at = now() WHERE id = $1', [m.id, JSON.stringify(next)])
  await query('UPDATE conversations SET last_message_at = now() WHERE id = $1', [c.id])
  return { id: m.id, meta: next }
})
