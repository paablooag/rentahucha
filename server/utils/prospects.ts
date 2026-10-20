import { PROSPECT_KINDS, type Prospect } from '#shared/utils/prospects'

// Captación de inmobiliarias y administradores de fincas (B2B).
// Regla de oro (LSSI art. 21): el correo con la propuesta solo sale cuando la empresa lo ha pedido (estado «pide_info»),
// se registra cuándo, y hay como mucho un recordatorio. Quien dice que no queda bloqueado para siempre.

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const txt = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().replace(/\s+/g, ' ').slice(0, max) : '')

export function cleanProspect(i: Record<string, unknown>) {
  const website = txt(i.website, 200)
  return {
    kind: (Object.keys(PROSPECT_KINDS) as string[]).includes(String(i.kind)) ? String(i.kind) : 'inmobiliaria',
    company: txt(i.company, 120),
    contactName: txt(i.contactName, 80),
    city: txt(i.city, 60),
    phone: txt(i.phone, 40),
    email: txt(i.email, 120).toLowerCase(),
    website: website && !/^https?:\/\//i.test(website) ? `https://${website}` : website,
    source: txt(i.source, 120),
    notes: typeof i.notes === 'string' ? i.notes.slice(0, 4000) : '',
  }
}

export async function logProspect(id: string, kind: string, detail = '') {
  await query('INSERT INTO prospect_events (prospect_id, kind, detail) VALUES ($1, $2, $3)', [id, kind, detail.slice(0, 1000)])
}

export async function getProspect(id: string): Promise<Prospect> {
  if (!isUuid(id)) throw createError({ statusCode: 404, statusMessage: 'No encontrada' })
  const p = await queryOne<Prospect>(`SELECT *, to_char(next_call_at, 'YYYY-MM-DD') AS next_call_at FROM prospects WHERE id = $1`, [id])
  if (!p) throw createError({ statusCode: 404, statusMessage: 'No encontrada' })
  p.events = await query('SELECT kind, detail, created_at FROM prospect_events WHERE prospect_id = $1 ORDER BY id DESC LIMIT 50', [id])
  return p
}

// ── Correos (solo con consentimiento) ─────────────────────────────────────

function proposalMail(p: Prospect, consentDate: string) {
  const hi = p.contactName ? `Hola, ${p.contactName.split(' ')[0]}:` : 'Hola:'
  const when = new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long' }).format(new Date(consentDate))
  return mailLayout({
    preheader: 'Inquilinos verificados y una hucha anti-impago para tus propietarios.',
    eyebrow: 'Para inmobiliarias',
    title: `RentaHucha para ${p.company}`,
    paragraphs: [
      `${hi} gracias por atendernos. Como te comentamos, RentaHucha es una plataforma de alquiler de vivienda que estamos lanzando en toda España, y queremos empezar con un grupo pequeño de inmobiliarias${p.city ? ` en ${p.city}` : ''}.`,
      'Qué os aporta:\n· Inquilinos verificados (ingresos, contrato y vida laboral comprobados) para vuestros pisos.\n· Un argumento nuevo para captar propietarios: el inquilino llena cada mes una hucha a su nombre, custodiada por una entidad financiera autorizada, y si hay un impago comprobado su saldo pasa al propietario.\n· El propietario sigue siendo vuestro cliente. No somos aseguradora ni sustituimos vuestro trabajo.',
      'En la beta ya podéis publicar pisos gratis y hablar con los interesados desde la web. Las condiciones para agencias las estamos cerrando con las primeras que entren.',
    ],
    highlight: { label: 'Siguiente paso', text: '¿Hacemos una llamada de 15 minutos esta semana? Responde a este correo con el día y la hora que mejor os venga.' },
    button: { label: 'Ver RentaHucha para inmobiliarias', url: siteUrl('/inmobiliarias?utm_source=captacion&utm_campaign=propuesta') },
    after: [`Te escribimos porque nos pediste esta información por teléfono el ${when}. Si no quieres recibir más correos nuestros, responde «baja» y no volveremos a escribirte.`],
    footer: 'Correo enviado a petición de la empresa destinataria.',
  })
}

function followupMail(p: Prospect) {
  const hi = p.contactName ? `Hola, ${p.contactName.split(' ')[0]}:` : 'Hola:'
  return mailLayout({
    preheader: 'Solo un recordatorio, sin compromiso.',
    eyebrow: 'Para inmobiliarias',
    title: '¿Pudiste echarle un vistazo?',
    paragraphs: [`${hi} hace unos días te enviamos la información de RentaHucha que nos pediste. Solo quería saber si os encaja y si tenéis alguna duda.`],
    highlight: { label: 'En una frase', text: 'Inquilinos verificados para vuestros pisos y una hucha que el inquilino llena cada mes y que pasa al propietario si hay un impago comprobado.' },
    button: { label: 'Ver RentaHucha para inmobiliarias', url: siteUrl('/inmobiliarias?utm_source=captacion&utm_campaign=recordatorio') },
    after: ['Este es el único recordatorio: si no os interesa ahora, no volveremos a escribiros. Para que no te escribamos más, responde «baja».'],
    footer: 'Correo enviado a petición de la empresa destinataria.',
  })
}

export async function sendProposal(p: Prospect) {
  if (!EMAIL.test(p.email)) throw createError({ statusCode: 422, statusMessage: 'Para enviar la propuesta hace falta su correo.' })
  if (p.doNotContact) throw createError({ statusCode: 409, statusMessage: 'Esta empresa pidió no ser contactada.' })
  if (p.proposalSentAt) return false
  const consent = p.consentAt ?? new Date().toISOString()
  const mail = proposalMail(p, consent)
  const ok = await sendMail({ to: p.email, subject: `Lo que te comentamos por teléfono: RentaHucha para ${p.company}`, ...mail })
  if (ok) {
    await query('UPDATE prospects SET proposal_sent_at = now(), updated_at = now() WHERE id = $1', [p.id])
    await logProspect(p.id, 'correo', 'Propuesta enviada (la pidió por teléfono)')
  }
  return ok
}

/** Recordatorio único a los 7 días si siguen en «pide_info» (no han respondido). Se llama desde un plugin cada hora. */
export async function sendDueFollowups() {
  const due = await query<Prospect>(
    `SELECT * FROM prospects WHERE status = 'pide_info' AND NOT do_not_contact AND email <> ''
       AND proposal_sent_at < now() - interval '7 days' AND followup_sent_at IS NULL LIMIT 20`,
  )
  for (const p of due) {
    const ok = await sendMail({ to: p.email, subject: `¿Os encaja RentaHucha? (${p.company})`, ...followupMail(p) })
    if (ok) {
      await query('UPDATE prospects SET followup_sent_at = now(), updated_at = now() WHERE id = $1', [p.id])
      await logProspect(p.id, 'correo', 'Recordatorio único enviado (7 días sin respuesta)')
    }
  }
  return due.length
}
