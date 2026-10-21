// Sincronización manual de Search Console desde el panel.
export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  if (!gscConfigured()) throw createError({ statusCode: 503, statusMessage: 'Search Console no está configurado en el servidor.' })
  return syncSearchConsole()
})
