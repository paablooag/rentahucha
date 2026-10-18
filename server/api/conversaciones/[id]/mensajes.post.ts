export default defineEventHandler(async (event) => {
  const user = await requireUser(event)
  rateLimit(event, 'message', 120, 10 * 60 * 1000)
  const c = await getConversationFor(user, getRouterParam(event, 'id'))
  const body = String((await readBody<{ body?: string }>(event))?.body ?? '').trim().slice(0, 4000)
  if (!body) throw createError({ statusCode: 422, statusMessage: 'Escribe un mensaje.' })
  const isOwner = c.ownerId === user.id
  const row = await queryOne<{ id: number; createdAt: string }>(
    'INSERT INTO messages (conversation_id, sender_id, body) VALUES ($1, $2, $3) RETURNING id, created_at',
    [c.id, user.id, body],
  )
  await query(`UPDATE conversations SET last_message_at = now(), ${isOwner ? 'owner' : 'tenant'}_read_at = now() WHERE id = $1`, [c.id])
  return { id: Number(row!.id), body, kind: 'texto', createdAt: row!.createdAt, mine: true }
})
