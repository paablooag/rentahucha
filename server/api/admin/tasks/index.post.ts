export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const res = validateTask(await readBody<Record<string, unknown>>(event) ?? {})
  if (!res.ok) throw createError({ statusCode: 422, statusMessage: res.error })
  return createTask(res.task)
})
