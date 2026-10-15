export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const result = validatePost(await readBody(event) ?? {})
  if (!result.ok) throw createError({ statusCode: 422, statusMessage: 'Revisa el artículo', data: { errors: result.errors } })
  return savePost(result.post)
})
