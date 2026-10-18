// Borrado de la cuenta y de todo lo asociado (pisos, fotos, conversaciones), derecho de supresión (RGPD art. 17).
export default defineEventHandler(async (event) => {
  const user = await requireUser(event)
  const body = await readBody<{ password?: string }>(event)
  const row = await queryOne<{ passwordHash: string }>('SELECT password_hash FROM users WHERE id = $1', [user.id])
  if (!row || !(await verifyPassword(String(body?.password ?? ''), row.passwordHash))) {
    throw createError({ statusCode: 401, statusMessage: 'La contraseña no es correcta.' })
  }
  await query('DELETE FROM users WHERE id = $1', [user.id])
  const session = await userSession(event)
  await session.clear()
  return { ok: true }
})
