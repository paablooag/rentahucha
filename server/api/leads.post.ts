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

  const { updated } = await upsertLead(result.data)
  const d = result.data
  if (!updated) {
    // Confirmación al interesado y, si es propietario o inmobiliaria, aviso al equipo.
    const first = d.name.split(' ')[0]
    const body = d.role === 'inquilino'
      ? ['Te avisaremos antes del lanzamiento para crear tu pasaporte de inquilino. Mientras tanto, ya puedes ver pisos y escribir a sus propietarios en la web.']
      : d.role === 'inmobiliaria'
        ? ['Te escribiremos en breve para contarte las condiciones para agencias y conocer cómo trabajáis.']
        : [`Te escribiremos personalmente para conocer tu caso y explicarte cómo funciona, sin compromiso. Si ya quieres publicar tu piso de ${d.city}, puedes hacerlo gratis desde la web.`]
    const mail = mailLayout({
      title: `Ya estás en la lista, ${first}`,
      paragraphs: [`Gracias por apuntarte a RentaHucha.`, ...body, 'Si tienes cualquier duda, responde a este correo.'],
      button: d.role === 'propietario' ? { label: 'Publicar mi piso', url: siteUrl('/cuenta/registro?tipo=propietario') } : d.role === 'inquilino' ? { label: 'Ver pisos', url: siteUrl('/pisos') } : undefined,
    })
    sendMailLater({ to: d.email, subject: 'Ya estás en la lista de RentaHucha', ...mail })
    if (d.role !== 'inquilino') {
      notifyTeam(`Nuevo ${d.role}: ${d.name} (${d.city})`, [`${d.name} · ${d.email}${d.phone ? ` · ${d.phone}` : ''}`, `Plazo: ${d.timing}`], siteUrl('/admin/interesados'))
    }
  }
  return { ok: true, updated }
})
