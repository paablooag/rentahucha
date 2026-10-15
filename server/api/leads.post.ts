// Alta de interesados (propietarios e inquilinos). Valida en servidor, ignora bots y no guarda la IP.
export default defineEventHandler(async (event) => {
  // 20 por hora y IP: frena a los bots sin bloquear redes compartidas (universidades, oficinas).
  rateLimit(event, 'leads', 20, 60 * 60 * 1000)
  const body = await readBody<Record<string, unknown>>(event)

  // Campo trampa invisible: los humanos lo dejan vacío.
  if (typeof body?.website === 'string' && body.website.trim()) return { ok: true }

  const result = validateLead(body ?? {})
  if (!result.ok) {
    throw createError({ statusCode: 422, statusMessage: 'Revisa el formulario', data: { errors: result.errors } })
  }

  const storage = db()
  const existing = (await listByPrefix<StoredLead>('leads:')).find(l => l.email === result.data.email && l.role === result.data.role)
  const lead: StoredLead = {
    ...result.data,
    id: existing?.id ?? newId(),
    createdAt: existing?.createdAt ?? new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    consentAt: new Date().toISOString(),
    consentText: CONSENT_TEXT,
  }
  await storage.setItem(`leads:${lead.id}`, lead)
  return { ok: true, updated: Boolean(existing) }
})
