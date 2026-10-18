// Pisos guardados por el usuario (solo los que siguen visibles).
export default defineEventHandler(async (event) => {
  const user = await requireUser(event)
  const rows = await query<{ propertyId: string }>(
    `SELECT f.property_id FROM favorites f JOIN properties p ON p.id = f.property_id
     WHERE f.user_id = $1 AND p.status IN ('publicado', 'alquilado') ORDER BY f.created_at DESC LIMIT 100`,
    [user.id],
  )
  return Promise.all(rows.map(r => getPublicProperty(r.propertyId).then(({ ownerId: _, ...p }) => p)))
})
