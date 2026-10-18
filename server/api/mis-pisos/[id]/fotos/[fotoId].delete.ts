export default defineEventHandler(async (event) => {
  const user = await requireUser(event, 'propietario')
  const p = await getOwnerProperty(user.id, getRouterParam(event, 'id') ?? '')
  const fotoId = getRouterParam(event, 'fotoId')
  if (!isUuid(fotoId)) throw createError({ statusCode: 404, statusMessage: 'Foto no encontrada' })
  await query('DELETE FROM property_photos WHERE id = $1 AND property_id = $2', [fotoId, p.id])
  return getOwnerProperty(user.id, p.id)
})
