// Conversación a la que pertenece el usuario (como propietario o como inquilino), o 404.
export async function getConversationFor(user: PublicUser, id: string | undefined) {
  if (!isUuid(id)) throw createError({ statusCode: 404, statusMessage: 'Conversación no encontrada' })
  const c = await queryOne<{
    id: string; propertyId: string; ownerId: string; tenantId: string; ownerReadAt: string | null; tenantReadAt: string | null; blockedAt: string | null
    propertyTitle: string; propertyCity: string; propertyStatus: string; ownerName: string; tenantName: string
  }>(
    `SELECT c.id, c.property_id, c.owner_id, c.tenant_id, c.owner_read_at, c.tenant_read_at, c.blocked_at,
            p.title AS property_title, p.city AS property_city, p.status AS property_status, o.name AS owner_name, t.name AS tenant_name
     FROM conversations c JOIN properties p ON p.id = c.property_id JOIN users o ON o.id = c.owner_id JOIN users t ON t.id = c.tenant_id
     WHERE c.id = $1 AND (c.owner_id = $2 OR c.tenant_id = $2)`,
    [id, user.id],
  )
  if (!c) throw createError({ statusCode: 404, statusMessage: 'Conversación no encontrada' })
  return c
}

export function assertNotBlocked(c: { blockedAt: string | null }) {
  if (c.blockedAt) throw createError({ statusCode: 403, statusMessage: 'Esta conversación está bloqueada.' })
}
