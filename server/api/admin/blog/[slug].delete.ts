export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  await deletePost(getRouterParam(event, 'slug') ?? '')
  return { ok: true }
})
