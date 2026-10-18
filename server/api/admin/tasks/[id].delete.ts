const UUID = /^[0-9a-f-]{36}$/i

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const id = getRouterParam(event, 'id') ?? ''
  if (!UUID.test(id)) throw createError({ statusCode: 400, statusMessage: 'Identificador no válido.' })
  await deleteTask(id)
  return { ok: true }
})
