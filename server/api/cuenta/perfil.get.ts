// Perfil del inquilino con sesión iniciada.
export default defineEventHandler(async (event) => {
  const user = await requireUser(event, 'inquilino')
  return { profile: await getTenantProfile(user.id) }
})
