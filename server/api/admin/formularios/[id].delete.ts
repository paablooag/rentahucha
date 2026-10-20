// Borrado definitivo (derecho de supresión).
export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const id = getRouterParam(event, 'id')
  if (!isUuid(id)) throw createError({ statusCode: 400, statusMessage: 'Identificador no válido' })
  await query('DELETE FROM form_submissions WHERE id = $1', [id])
  return { ok: true }
})
