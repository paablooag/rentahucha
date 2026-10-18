// Convierte una foto en la portada (la primera).
export default defineEventHandler(async (event) => {
  const user = await requireUser(event, 'propietario')
  const p = await getOwnerProperty(user.id, getRouterParam(event, 'id') ?? '')
  const fotoId = getRouterParam(event, 'fotoId')
  if (!isUuid(fotoId)) throw createError({ statusCode: 404, statusMessage: 'Foto no encontrada' })
  await query(
    `UPDATE property_photos SET position = (SELECT COALESCE(min(position), 0) - 1 FROM property_photos WHERE property_id = $2)
     WHERE id = $1 AND property_id = $2`,
    [fotoId, p.id],
  )
  return getOwnerProperty(user.id, p.id)
})
