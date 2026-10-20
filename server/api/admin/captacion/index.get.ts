import type { Prospect } from '#shared/utils/prospects'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const items = await query<Prospect>(
    `SELECT p.*, to_char(p.next_call_at, 'YYYY-MM-DD') AS next_call_at FROM prospects p
     ORDER BY CASE p.status WHEN 'volver_a_llamar' THEN 0 WHEN 'por_llamar' THEN 1 WHEN 'pide_info' THEN 2 WHEN 'en_conversacion' THEN 3 ELSE 4 END,
              p.next_call_at NULLS LAST, p.created_at`,
  )
  return { items, mailReady: mailConfigured() }
})
