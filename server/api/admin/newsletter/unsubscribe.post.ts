// Baja de la newsletter: borra la suscripción del pie y quita el permiso en los formularios.
// Los datos de la lista de espera se mantienen (es un consentimiento distinto).
export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const { email } = await readBody<{ email?: string }>(event)
  const target = String(email ?? '').trim().toLowerCase()
  if (!target) throw createError({ statusCode: 400, statusMessage: 'Falta el correo' })

  const storage = db()
  const [subscribers, leads] = await Promise.all([
    listByPrefix<StoredSubscriber>('newsletter:'),
    listByPrefix<StoredLead>('leads:'),
  ])
  await Promise.all([
    ...subscribers.filter(s => s.email === target).map(s => storage.removeItem(`newsletter:${s.id}`)),
    ...leads.filter(l => l.email === target && l.consentNews).map(l => storage.setItem(`leads:${l.id}`, { ...l, consentNews: false, updatedAt: new Date().toISOString() })),
  ])
  return { ok: true }
})
