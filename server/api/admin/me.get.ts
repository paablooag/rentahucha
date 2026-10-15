export default defineEventHandler(async (event) => {
  const user = await requireAdmin(event)
  return { user, weakPassword: adminCredentials().password.length < 12 }
})
