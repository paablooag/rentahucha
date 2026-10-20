export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  return getProspect(getRouterParam(event, 'id') ?? '')
})
