// Borrado (p. ej. si la empresa pide que eliminemos sus datos). Para «no contactar» basta con marcar «No le interesa».
export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const p = await getProspect(getRouterParam(event, 'id') ?? '')
  await query('DELETE FROM prospects WHERE id = $1', [p.id])
  return { ok: true }
})
