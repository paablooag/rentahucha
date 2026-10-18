// Mensajes de una conversación y la marca como leída.
// Refresco: ?desde=<último id> trae los nuevos y ?cambios=<fecha ISO> los que han cambiado (p. ej. una visita aceptada).
export default defineEventHandler(async (event) => {
  const user = await requireUser(event)
  const c = await getConversationFor(user, getRouterParam(event, 'id'))
  const q = getQuery(event)
  const since = Number(q.desde) || 0
  const changedSince = typeof q.cambios === 'string' && !Number.isNaN(Date.parse(q.cambios)) ? q.cambios : null
  const messages = await query<{ id: number; senderId: string; body: string; kind: string; meta: unknown; createdAt: string; updatedAt: string | null }>(
    `SELECT id, sender_id, body, kind, meta, created_at, updated_at FROM messages
     WHERE conversation_id = $1 AND (id > $2 OR ($3::timestamptz IS NOT NULL AND updated_at > $3::timestamptz))
     ORDER BY id LIMIT 500`,
    [c.id, since, changedSince],
  )
  const isOwner = c.ownerId === user.id
  await query(`UPDATE conversations SET ${isOwner ? 'owner' : 'tenant'}_read_at = now() WHERE id = $1`, [c.id])

  // El propietario ve el perfil que el inquilino ha rellenado (declarado, sin verificar) y la renta del piso.
  const extra = isOwner && !since && !changedSince
    ? { tenantProfile: await getTenantProfile(c.tenantId), rent: Number((await queryOne<{ rent: number }>('SELECT rent FROM properties WHERE id = $1', [c.propertyId]))?.rent ?? 0) }
    : {}

  return {
    id: c.id,
    isOwner,
    serverTime: new Date().toISOString(),
    property: { id: c.propertyId, title: c.propertyTitle, city: c.propertyCity, status: c.propertyStatus },
    blocked: !!c.blockedAt,
    otherName: isOwner ? c.tenantName : c.ownerName,
    // Hasta cuándo ha leído la otra persona (para el «visto»).
    otherReadAt: isOwner ? c.tenantReadAt : c.ownerReadAt,
    messages: messages.map(m => ({
      id: Number(m.id), body: m.body, kind: m.kind, createdAt: m.createdAt, mine: m.senderId === user.id,
      meta: typeof m.meta === 'string' ? JSON.parse(m.meta) : m.meta,
    })),
    ...extra,
  }
})
