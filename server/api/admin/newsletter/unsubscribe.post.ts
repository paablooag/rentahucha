// Baja de la newsletter: borra la suscripción del pie y quita el permiso en los formularios.
// Los datos de la lista de espera se mantienen (es un consentimiento distinto).
export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const { email } = await readBody<{ email?: string }>(event)
  const target = String(email ?? '').trim().toLowerCase()
  if (!target) throw createError({ statusCode: 400, statusMessage: 'Falta el correo' })

  await query('DELETE FROM newsletter_subscribers WHERE email = $1', [target])
  await query('UPDATE leads SET consent_news = false, updated_at = now() WHERE email = $1 AND consent_news', [target])
  return { ok: true }
})
