// Usuario con sesión iniciada (o null) y sus mensajes sin leer.
export default defineEventHandler(async (event) => {
  const user = await getUser(event)
  if (!user) return { user: null, unread: 0 }
  const col = user.role === 'propietario' ? 'owner' : 'tenant'
  const row = await queryOne<{ n: number }>(
    `SELECT count(*) AS n FROM conversations c
     WHERE c.${col}_id = $1 AND EXISTS (
       SELECT 1 FROM messages m WHERE m.conversation_id = c.id AND m.sender_id <> $1
         AND m.created_at > COALESCE(c.${col}_read_at, 'epoch'::timestamptz))`,
    [user.id],
  )
  const prefs = await queryOne<{ notifyMessages: boolean }>('SELECT notify_messages FROM users WHERE id = $1', [user.id])
  return { user, unread: Number(row?.n ?? 0), notifyMessages: prefs?.notifyMessages ?? true }
})
