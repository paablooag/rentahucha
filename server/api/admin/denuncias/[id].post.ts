// Gestión de una denuncia: marcarla como resuelta (la conversación sigue bloqueada) o resolverla y desbloquear la conversación.
export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const id = getRouterParam(event, 'id')
  if (!isUuid(id)) throw createError({ statusCode: 400, statusMessage: 'Identificador no válido' })
  const { action } = await readBody<{ action?: string }>(event)
  const r = await queryOne<{ conversationId: string }>('UPDATE reports SET resolved_at = now() WHERE id = $1 RETURNING conversation_id', [id])
  if (!r) throw createError({ statusCode: 404, statusMessage: 'Denuncia no encontrada' })
  if (action === 'desbloquear') await query('UPDATE conversations SET blocked_at = NULL WHERE id = $1', [r.conversationId])
  return { ok: true }
})
