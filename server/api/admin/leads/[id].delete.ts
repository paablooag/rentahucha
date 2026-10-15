// Borrado definitivo de un interesado (derecho de supresión, RGPD art. 17).
export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const id = getRouterParam(event, 'id') ?? ''
  if (!/^[0-9a-f-]{36}$/i.test(id)) throw createError({ statusCode: 400, statusMessage: 'Identificador no válido' })
  const { kind } = getQuery(event)
  const table = kind === 'newsletter' ? 'newsletter_subscribers' : 'leads'
  await query(`DELETE FROM ${table} WHERE id = $1`, [id])
  return { ok: true }
})
