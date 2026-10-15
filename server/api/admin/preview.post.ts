// Vista previa del Markdown con el mismo renderizado que la web pública.
export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const { body } = await readBody<{ body?: string }>(event)
  return { html: renderMarkdown(String(body ?? '').slice(0, 60_000)) }
})
