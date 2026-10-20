import { PROSPECT_STATUS, type Prospect, type ProspectStatus } from '#shared/utils/prospects'

// Actualiza una empresa: datos, notas, próxima llamada o resultado de la llamada.
// Al pasar a «pide_info» se registra el consentimiento y se envía la propuesta (una sola vez).
export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const current = await getProspect(getRouterParam(event, 'id') ?? '')
  const body = await readBody<Record<string, unknown>>(event)
  const data = cleanProspect({ ...current, ...body })
  const status = (Object.keys(PROSPECT_STATUS) as string[]).includes(String(body?.status)) ? String(body!.status) as ProspectStatus : current.status
  const nextCall = typeof body?.nextCallAt === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(body.nextCallAt) ? body.nextCallAt : body?.nextCallAt === null ? null : current.nextCallAt
  const call = typeof body?.call === 'string' ? body.call.trim().slice(0, 500) : ''

  if (current.doNotContact && status !== 'no_interesa') throw createError({ statusCode: 409, statusMessage: 'Esta empresa pidió no ser contactada.' })
  if (status === 'pide_info' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) throw createError({ statusCode: 422, statusMessage: 'Apunta su correo para poder enviarle la propuesta.' })

  await query(
    `UPDATE prospects SET kind = $2, company = $3, contact_name = $4, city = $5, phone = $6, email = $7, website = $8, source = $9, notes = $10,
       status = $11, next_call_at = $12,
       consent_at = CASE WHEN $11 = 'pide_info' AND consent_at IS NULL THEN now() ELSE consent_at END,
       do_not_contact = do_not_contact OR $11 = 'no_interesa', updated_at = now()
     WHERE id = $1`,
    [current.id, data.kind, data.company, data.contactName, data.city, data.phone, data.email, data.website, data.source, data.notes, status, nextCall],
  )
  if (call) await logProspect(current.id, 'llamada', call)
  if (status !== current.status) await logProspect(current.id, 'estado', `${PROSPECT_STATUS[current.status]} → ${PROSPECT_STATUS[status]}`)

  let sent: boolean | null = null
  if (status === 'pide_info') sent = await sendProposal(await getProspect(current.id))
  return { prospect: await getProspect(current.id), sent }
})
