// Crea un piso en borrador.
export default defineEventHandler(async (event) => {
  const user = await requireUser(event, 'propietario')
  rateLimit(event, 'property-create', 30, 60 * 60 * 1000)
  const count = await queryOne<{ n: number }>('SELECT count(*) AS n FROM properties WHERE owner_id = $1', [user.id])
  if (Number(count?.n ?? 0) >= 50) throw createError({ statusCode: 429, statusMessage: 'Has llegado al máximo de 50 pisos. Escríbenos si necesitas más.' })

  const result = validateProperty(await readBody(event) ?? {})
  if (!result.ok) throw createError({ statusCode: 422, statusMessage: 'Revisa los datos', data: { errors: result.errors } })
  const cols = PROPERTY_FIELDS.map(([, c]) => c)
  const values = PROPERTY_FIELDS.map(([k]) => result.data[k])
  const row = await queryOne<{ id: string }>(
    `INSERT INTO properties (owner_id, ${cols.join(', ')}) VALUES ($1, ${cols.map((_, i) => `$${i + 2}`).join(', ')}) RETURNING id`,
    [user.id, ...values],
  )
  return getOwnerProperty(user.id, row!.id)
})
