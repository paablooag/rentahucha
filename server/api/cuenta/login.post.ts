export default defineEventHandler(async (event) => {
  rateLimit(event, 'user-login', 10, 15 * 60 * 1000)
  const body = await readBody<{ email?: string; password?: string }>(event)
  const email = String(body?.email ?? '').trim().toLowerCase().slice(0, 120)
  const password = String(body?.password ?? '').slice(0, 200)

  const row = await queryOne<PublicUser & { passwordHash: string }>('SELECT id, role, name, email, phone, password_hash FROM users WHERE email = $1', [email])
  // Mismo mensaje si no existe el correo o falla la contraseña.
  if (!row || !(await verifyPassword(password, row.passwordHash))) {
    throw createError({ statusCode: 401, statusMessage: 'Correo o contraseña incorrectos.' })
  }
  resetRateLimit(event, 'user-login')
  await query('UPDATE users SET last_login_at = now() WHERE id = $1', [row.id])
  const session = await userSession(event)
  await session.update({ userId: row.id })
  const { passwordHash: _, ...user } = row
  return { ok: true, user }
})
