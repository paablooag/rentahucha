export default defineEventHandler(async (event) => {
  // 5 intentos cada 15 minutos por IP.
  rateLimit(event, 'admin-login', 5, 15 * 60 * 1000)

  const { user: adminUser, password: adminPassword, allowWeak } = adminCredentials()
  if (!adminUser || !adminPassword) {
    throw createError({ statusCode: 503, statusMessage: 'El acceso de administración no está configurado (NUXT_ADMIN_USER y NUXT_ADMIN_PASSWORD).' })
  }
  // El panel da acceso a datos personales (RGPD art. 32): en producción no se admiten contraseñas cortas.
  if (!import.meta.dev && !allowWeak && adminPassword.length < 12) {
    throw createError({ statusCode: 503, statusMessage: 'La contraseña de administración es demasiado débil para producción (mínimo 12 caracteres).' })
  }

  const body = await readBody<{ user?: string; password?: string }>(event)
  const userOk = safeEqual(String(body?.user ?? ''), adminUser)
  const passOk = safeEqual(String(body?.password ?? ''), adminPassword)
  if (!userOk || !passOk) throw createError({ statusCode: 401, statusMessage: 'Usuario o contraseña incorrectos.' })

  resetRateLimit(event, 'admin-login')
  const session = await adminSession(event)
  await session.update({ user: adminUser })
  return { ok: true, user: adminUser }
})
