// Seguimiento de una solicitud: estado y notas internas.
export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const id = getRouterParam(event, 'id')
  if (!isUuid(id)) throw createError({ statusCode: 400, statusMessage: 'Identificador no válido' })
  const body = await readBody<{ status?: string; notes?: string }>(event)
  const status = ['nuevo', 'respondido', 'descartado'].includes(String(body?.status)) ? String(body!.status) : null
  const notes = typeof body?.notes === 'string' ? body.notes.slice(0, 4000) : null
  await query('UPDATE form_submissions SET status = COALESCE($2::text, status), notes = COALESCE($3::text, notes) WHERE id = $1', [id, status, notes])
  return { ok: true }
})
