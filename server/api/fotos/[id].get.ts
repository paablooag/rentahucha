// Sirve una foto. Solo las de pisos publicados (o alquilados) son públicas; el resto, solo para su propietario y el panel.
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!isUuid(id)) throw createError({ statusCode: 404, statusMessage: 'No encontrada' })
  const row = await queryOne<{ mime: string; data: Uint8Array; status: string; ownerId: string }>(
    'SELECT f.mime, f.data, p.status, p.owner_id FROM property_photos f JOIN properties p ON p.id = f.property_id WHERE f.id = $1',
    [id],
  )
  if (!row) throw createError({ statusCode: 404, statusMessage: 'No encontrada' })
  const isPublic = row.status === 'publicado' || row.status === 'alquilado'
  if (!isPublic) {
    const user = await getUser(event)
    const admin = await adminSession(event).then(s => s.data.user).catch(() => null)
    if (user?.id !== row.ownerId && !admin) throw createError({ statusCode: 404, statusMessage: 'No encontrada' })
  }
  setHeader(event, 'Content-Type', row.mime)
  // Cada foto tiene id propio y no cambia nunca: si es pública se puede cachear mucho tiempo.
  setHeader(event, 'Cache-Control', isPublic ? 'public, max-age=31536000, immutable' : 'private, max-age=300')
  setHeader(event, 'X-Content-Type-Options', 'nosniff')
  return Buffer.from(row.data)
})
