export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug') ?? ''
  const post = await getPost(slug)
  if (!post || !post.published) throw createError({ statusCode: 404, statusMessage: 'Artículo no encontrado' })

  const related = (await listPosts({ audience: post.audience })).filter(p => p.slug !== slug).slice(0, 3)
  return { ...toSummary(post), html: renderMarkdown(post.body), related }
})
