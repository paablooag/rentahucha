const UUID = /^[0-9a-f-]{36}$/i

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const id = getRouterParam(event, 'id') ?? ''
  if (!UUID.test(id)) throw createError({ statusCode: 400, statusMessage: 'Identificador no válido.' })
  const res = validateTask(await readBody<Record<string, unknown>>(event) ?? {})
  if (!res.ok) throw createError({ statusCode: 422, statusMessage: res.error })
  const task = await updateTask(id, res.task)
  if (!task) throw createError({ statusCode: 404, statusMessage: 'La tarea no existe.' })
  return task
})
