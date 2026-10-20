import { VALUATION_CONSENT, validateValuation } from '#shared/utils/forms'

// Solicitud de valoración gratuita del alquiler. La responde una persona del equipo con comparables de la zona.
export default defineEventHandler(async (event) => {
  rateLimit(event, 'valuation', 10, 60 * 60 * 1000)
  const body = await readBody<Record<string, unknown>>(event)
  if (typeof body?.website === 'string' && body.website.trim()) return { ok: true } // campo trampa

  const r = validateValuation(body ?? {})
  if (!r.ok) throw createError({ statusCode: 422, statusMessage: 'Revisa los datos', data: { errors: r.errors } })
  const { name, email, phone, city, consentNews, ...rest } = r.data
  await query(
    `INSERT INTO form_submissions (kind, name, email, phone, city, data, consent_news, consent_at, consent_text)
     VALUES ('valoracion', $1, $2, $3, $4, $5::jsonb, $6, now(), $7)`,
    [name, email, phone, city, JSON.stringify(rest), consentNews, VALUATION_CONSENT],
  )
  const confirm = mailLayout({
    preheader: 'Te la enviamos en menos de 48 horas laborables.',
    eyebrow: 'Valoración del alquiler',
    title: 'Estamos preparando tu valoración',
    paragraphs: [
      `Hola, ${name.split(' ')[0]}: gracias por contarnos cómo es tu piso. Una persona del equipo está buscando pisos comparables de tu zona y consultando el índice de referencia oficial.`,
    ],
    highlight: { label: 'Tu piso', text: `${rest.propertyType} en ${rest.district}, ${city} · ${rest.sizeM2} m² · ${rest.bedrooms} hab. · ${rest.bathrooms} ${rest.bathrooms === '1' ? 'baño' : 'baños'} · ${rest.condition.toLowerCase()}` },
    button: { label: 'Mientras tanto: checklist para alquilar', url: siteUrl('/herramientas/checklist-alquilar-piso') },
    after: ['Te la enviaremos a este correo en menos de 48 horas laborables. Si quieres añadir algo (fotos, reformas, planta, orientación…), responde a este correo.'],
    footer: 'Recibes este correo porque has pedido una valoración del alquiler en RentaHucha.',
  })
  sendMailLater({ to: email, subject: 'Tu valoración del alquiler está en marcha', ...confirm })
  notifyTeam(`Valoración pedida: ${rest.district}, ${city}`, [`${name} · ${email}${phone ? ` · ${phone}` : ''}`, `${rest.propertyType}, ${rest.sizeM2} m², ${rest.bedrooms} hab., ${rest.bathrooms} baños · ${rest.condition} · ${rest.situation}`, 'Promesa: respuesta en menos de 48 h laborables.'], siteUrl('/admin/formularios'))
  if (consentNews) await query(`INSERT INTO newsletter_subscribers (email, source) VALUES ($1, 'valoracion') ON CONFLICT (email) DO NOTHING`, [email])
  return { ok: true }
})
