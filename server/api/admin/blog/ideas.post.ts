// Sugiere temas nuevos para el blog que no se solapen con los ya escritos.
export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  rateLimit(event, 'ai-ideas', 30, 60 * 60 * 1000)
  const body = await readBody<Record<string, unknown>>(event)
  const audience = typeof body?.audience === 'string' && body.audience in AUDIENCES ? body.audience as keyof typeof AUDIENCES : null
  if (!audience) throw createError({ statusCode: 400, statusMessage: 'Elige el público.' })
  const count = Math.min(15, Math.max(3, Number(body.count) || 8))
  const focus = typeof body.focus === 'string' ? body.focus.trim().slice(0, 300) : ''
  return suggestIdeas(audience, count, focus, await listPosts({ includeDrafts: true }))
})
