// Revisión de anuncios: aprobar (se publica) o pedir cambios con una nota para el propietario. También retirar uno publicado.
export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const id = getRouterParam(event, 'id')
  if (!isUuid(id)) throw createError({ statusCode: 400, statusMessage: 'Identificador no válido' })
  const { action, note } = await readBody<{ action?: string; note?: string }>(event)
  const text = String(note ?? '').trim().slice(0, 1000)

  if (action === 'aprobar') {
    await query(`UPDATE properties SET status = 'publicado', review_note = '', published_at = COALESCE(published_at, now()), updated_at = now() WHERE id = $1`, [id])
  }
  else if (action === 'rechazar' || action === 'retirar') {
    if (text.length < 5) throw createError({ statusCode: 422, statusMessage: 'Explica al propietario qué tiene que cambiar.' })
    await query(`UPDATE properties SET status = 'rechazado', review_note = $2, updated_at = now() WHERE id = $1`, [id, text])
  }
  else throw createError({ statusCode: 422, statusMessage: 'Acción no válida' })
  return { ok: true }
})
