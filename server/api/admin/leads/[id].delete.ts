// Borrado definitivo de un interesado (derecho de supresión, RGPD art. 17).
export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const id = getRouterParam(event, 'id') ?? ''
  const { kind } = getQuery(event)
  const prefix = kind === 'newsletter' ? 'newsletter' : 'leads'
  await db().removeItem(`${prefix}:${id}`)
  return { ok: true }
})
