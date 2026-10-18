import { REPORT_REASONS } from '#shared/utils/properties'

// Denuncia de una conversación (acoso, spam, intento de estafa…). Bloquea la conversación para ambas partes
// y deja la denuncia en el panel para que el equipo la revise.
export default defineEventHandler(async (event) => {
  const user = await requireUser(event)
  rateLimit(event, 'report', 10, 60 * 60 * 1000)
  const c = await getConversationFor(user, getRouterParam(event, 'id'))
  const body = await readBody<{ reason?: string; details?: string }>(event)
  const reasons: readonly string[] = REPORT_REASONS
  const reason = reasons.includes(String(body?.reason)) ? String(body!.reason) : null
  if (!reason) throw createError({ statusCode: 422, statusMessage: 'Elige el motivo.' })
  await query('INSERT INTO reports (conversation_id, reporter_id, reason, details) VALUES ($1, $2, $3, $4)', [c.id, user.id, reason, String(body?.details ?? '').trim().slice(0, 1000)])
  await query('UPDATE conversations SET blocked_at = COALESCE(blocked_at, now()) WHERE id = $1', [c.id])
  return { ok: true }
})
