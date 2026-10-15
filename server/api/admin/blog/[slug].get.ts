export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const post = await getPost(getRouterParam(event, 'slug') ?? '')
  if (!post) throw createError({ statusCode: 404, statusMessage: 'Artículo no encontrado' })
  return post
})
