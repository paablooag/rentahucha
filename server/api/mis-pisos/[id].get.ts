export default defineEventHandler(async (event) => {
  const user = await requireUser(event, 'propietario')
  return getOwnerProperty(user.id, getRouterParam(event, 'id') ?? '')
})
