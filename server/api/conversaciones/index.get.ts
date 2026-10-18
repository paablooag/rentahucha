// Bandeja de mensajes del usuario (propietario o inquilino).
export default defineEventHandler(async (event) => {
  const user = await requireUser(event)
  const me = user.role === 'propietario' ? 'owner' : 'tenant'
  const other = me === 'owner' ? 'tenant' : 'owner'
  return query(
    `SELECT c.id, c.property_id, p.title AS property_title, p.city AS property_city, p.status AS property_status,
            (SELECT f.id FROM property_photos f WHERE f.property_id = p.id ORDER BY f.position, f.created_at LIMIT 1) AS photo_id,
            u.name AS other_name, c.last_message_at,
            (SELECT m.body FROM messages m WHERE m.conversation_id = c.id ORDER BY m.id DESC LIMIT 1) AS last_body,
            (SELECT count(*) FROM messages m WHERE m.conversation_id = c.id AND m.sender_id <> $1
               AND m.created_at > COALESCE(c.${me}_read_at, 'epoch'::timestamptz))::int AS unread
     FROM conversations c
     JOIN properties p ON p.id = c.property_id
     JOIN users u ON u.id = c.${other}_id
     WHERE c.${me}_id = $1
     ORDER BY c.last_message_at DESC`,
    [user.id],
  )
})
