// Cambios de estado que hace el propietario: enviar a revisión, pausar, reactivar o marcar como alquilado.
// Publicar solo lo hace el equipo tras revisar el anuncio.
export default defineEventHandler(async (event) => {
  const user = await requireUser(event, 'propietario')
  const p = await getOwnerProperty(user.id, getRouterParam(event, 'id') ?? '')
  const { action } = await readBody<{ action?: string }>(event)

  let next: PropertyStatus
  if (action === 'enviar') {
    if (!['borrador', 'rechazado'].includes(p.status)) throw createError({ statusCode: 409, statusMessage: 'Este anuncio ya está enviado.' })
    const blockers = publishBlockers(p)
    if (blockers.length) throw createError({ statusCode: 422, statusMessage: `Antes de enviarlo falta: ${blockers.join(' ')}` })
    next = 'revision'
  }
  else if (action === 'pausar' && p.status === 'publicado') next = 'pausado'
  else if (action === 'reactivar' && (p.status === 'pausado' || p.status === 'alquilado')) next = 'publicado'
  else if (action === 'alquilado' && ['publicado', 'pausado'].includes(p.status)) next = 'alquilado'
  else throw createError({ statusCode: 409, statusMessage: 'No se puede hacer este cambio ahora.' })

  await query('UPDATE properties SET status = $2, updated_at = now() WHERE id = $1', [p.id, next])
  return getOwnerProperty(user.id, p.id)
})
