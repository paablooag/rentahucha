export default defineEventHandler(async (event) => {
  const user = await requireUser(event, 'propietario')
  const p = await getOwnerProperty(user.id, getRouterParam(event, 'id') ?? '')
  await query('DELETE FROM properties WHERE id = $1', [p.id])
  return { ok: true }
})
