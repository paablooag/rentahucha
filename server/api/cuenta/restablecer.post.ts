import { createHash } from 'node:crypto'

// Cambia la contraseña con el enlace de un solo uso y deja la sesión iniciada.
export default defineEventHandler(async (event) => {
  rateLimit(event, 'password-reset-use', 20, 60 * 60 * 1000)
  const body = await readBody<{ token?: string; password?: string }>(event)
  const password = String(body?.password ?? '')
  if (password.length < 10 || password.length > 200) throw createError({ statusCode: 422, statusMessage: 'La contraseña debe tener al menos 10 caracteres.' })
  const hash = createHash('sha256').update(String(body?.token ?? '')).digest('hex')
  const row = await queryOne<{ userId: string }>(
    `UPDATE password_resets SET used_at = now() WHERE token_hash = $1 AND used_at IS NULL AND expires_at > now() RETURNING user_id`,
    [hash],
  )
  if (!row) throw createError({ statusCode: 400, statusMessage: 'El enlace no es válido o ha caducado. Pide uno nuevo.' })
  await query('UPDATE users SET password_hash = $2, last_login_at = now() WHERE id = $1', [row.userId, await hashPassword(password)])
  await query('DELETE FROM password_resets WHERE user_id = $1', [row.userId])
  const session = await userSession(event)
  await session.update({ userId: row.userId })
  return { ok: true }
})
