// Mensajes de una conversación (desde ?desde=<id> para el refresco) y la marca como leída.
export default defineEventHandler(async (event) => {
  const user = await requireUser(event)
  const c = await getConversationFor(user, getRouterParam(event, 'id'))
  const since = Number(getQuery(event).desde) || 0
  const messages = await query<{ id: number; senderId: string; body: string; createdAt: string }>(
    'SELECT id, sender_id, body, created_at FROM messages WHERE conversation_id = $1 AND id > $2 ORDER BY id LIMIT 500',
    [c.id, since],
  )
  const isOwner = c.ownerId === user.id
  await query(`UPDATE conversations SET ${isOwner ? 'owner' : 'tenant'}_read_at = now() WHERE id = $1`, [c.id])
  return {
    id: c.id,
    property: { id: c.propertyId, title: c.propertyTitle, city: c.propertyCity, status: c.propertyStatus },
    otherName: isOwner ? c.tenantName : c.ownerName,
    // Hasta cuándo ha leído la otra persona (para el «visto»).
    otherReadAt: isOwner ? c.tenantReadAt : c.ownerReadAt,
    messages: messages.map(m => ({ ...m, id: Number(m.id), mine: m.senderId === user.id })),
  }
})
