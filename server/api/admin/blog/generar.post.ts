// Genera un artículo con IA y lo guarda como BORRADOR para revisarlo en el editor antes de publicarlo.
export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  rateLimit(event, 'ai-blog', 30, 60 * 60 * 1000)
  const body = await readBody<Record<string, unknown>>(event)

  const topic = typeof body?.topic === 'string' ? body.topic.trim().slice(0, 400) : ''
  const audience = typeof body?.audience === 'string' && body.audience in AUDIENCES ? body.audience as keyof typeof AUDIENCES : null
  const length = typeof body?.length === 'string' && body.length in AI_LENGTHS ? body.length as AiLength : 'medio'
  if (topic.length < 5 || !audience) throw createError({ statusCode: 400, statusMessage: 'Indica el tema y el público.' })

  const existing = await listPosts({ includeDrafts: true })
  const draft = await generateArticle({
    topic,
    audience,
    length,
    keywords: typeof body.keywords === 'string' ? body.keywords.slice(0, 200) : '',
    notes: typeof body.notes === 'string' ? body.notes.slice(0, 600) : '',
  }, existing)

  // URL única: si ya existe, se añade un número.
  const base = slugify(draft.slug || draft.title)
  const taken = new Set(existing.map(p => p.slug))
  let slug = base
  for (let i = 2; taken.has(slug); i++) slug = `${base}-${i}`.slice(0, 80)

  const result = validatePost({ ...draft, slug, audience, published: false, publishedAt: new Date().toISOString().slice(0, 10) })
  if (!result.ok) throw createError({ statusCode: 502, statusMessage: 'El borrador generado no es válido. Vuelve a intentarlo.', data: { errors: result.errors } })
  const saved = await savePost(result.post)
  return { slug: saved.slug, title: saved.title }
})
