// Alta de cuenta de propietario o inquilino. Deja la sesión iniciada.
export default defineEventHandler(async (event) => {
  rateLimit(event, 'signup', 10, 60 * 60 * 1000)
  const body = await readBody<Record<string, unknown>>(event)
  if (typeof body?.website === 'string' && body.website.trim()) return { ok: true } // campo trampa

  const result = validateSignup(body ?? {})
  if (!result.ok) throw createError({ statusCode: 422, statusMessage: 'Revisa los datos', data: { errors: result.errors } })
  const { role, name, email, phone, password } = result.data

  const exists = await queryOne('SELECT 1 FROM users WHERE email = $1', [email])
  if (exists) throw createError({ statusCode: 409, statusMessage: 'Ya hay una cuenta con este correo. Entra con tu contraseña.' })

  const user = await queryOne<{ id: string }>(
    `INSERT INTO users (role, name, email, phone, password_hash, consent_at, consent_text, last_login_at)
     VALUES ($1, $2, $3, $4, $5, now(), $6, now()) RETURNING id`,
    [role, name, email, phone, await hashPassword(password), SIGNUP_CONSENT],
  )
  const session = await userSession(event)
  await session.update({ userId: user!.id })
  return { ok: true, user: { id: user!.id, role, name, email, phone } }
})
