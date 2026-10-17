export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug') ?? ''
  const post = await getPost(slug)
  // Los programados (fecha futura) no se ven hasta su día.
  if (!post || !post.published || post.publishedAt > madridDate()) throw createError({ statusCode: 404, statusMessage: 'Artículo no encontrado' })

  // Relacionados: primero los del mismo tema y luego los del mismo público (enlazado interno para SEO).
  const others = (await listPosts({ audience: post.audience })).filter(p => p.slug !== slug)
  const related = [...others.filter(p => p.category === post.category), ...others.filter(p => p.category !== post.category)].slice(0, 3)
  return { ...toSummary(post), html: renderMarkdown(post.body), ...articleExtras(post.body), related }
})
