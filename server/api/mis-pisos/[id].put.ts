// Edita los datos del piso. Si estaba publicado, vuelve a revisión para que el cambio se compruebe.
export default defineEventHandler(async (event) => {
  const user = await requireUser(event, 'propietario')
  const current = await getOwnerProperty(user.id, getRouterParam(event, 'id') ?? '')
  const result = validateProperty(await readBody(event) ?? {})
  if (!result.ok) throw createError({ statusCode: 422, statusMessage: 'Revisa los datos', data: { errors: result.errors } })

  const sets = PROPERTY_FIELDS.map(([, c], i) => `${c} = $${i + 2}`)
  const values = PROPERTY_FIELDS.map(([k]) => result.data[k])
  const status = current.status === 'publicado' || current.status === 'rechazado' ? 'revision' : current.status
  await query(
    `UPDATE properties SET ${sets.join(', ')}, status = $${values.length + 2}, updated_at = now() WHERE id = $1`,
    [current.id, ...values, status],
  )
  return getOwnerProperty(user.id, current.id)
})
