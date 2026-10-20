import nodemailer, { type Transporter } from 'nodemailer'

// Envío de correos transaccionales por SMTP (Brevo). Sin configuración (p. ej. en local) no se envía nada:
// se escribe en el registro para poder comprobarlo.
let transporter: Transporter | null | undefined

function getTransporter(): Transporter | null {
  if (transporter !== undefined) return transporter
  const { smtpHost, smtpPort, smtpUser, smtpPass } = useRuntimeConfig()
  transporter = smtpHost && smtpUser && smtpPass
    ? nodemailer.createTransport({ host: String(smtpHost), port: Number(smtpPort) || 587, secure: Number(smtpPort) === 465, auth: { user: String(smtpUser), pass: String(smtpPass) } })
    : null
  return transporter
}

export const mailConfigured = () => !!getTransporter()

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** Plantilla sencilla y legible en cualquier cliente de correo. `paragraphs` es texto plano (se escapa). */
export function mailLayout(o: { title: string; paragraphs: string[]; button?: { label: string; url: string }; footer?: string }) {
  const { brand } = useAppConfig()
  const text = [o.title, '', ...o.paragraphs.flatMap(p => [p, '']), ...(o.button ? [`${o.button.label}: ${o.button.url}`, ''] : []), '—', `${brand.name} · ${brand.domain}`, o.footer ?? ''].join('\n').trim()
  const html = `<!doctype html><html lang="es"><body style="margin:0;background:#f4f4f4;font-family:Arial,Helvetica,sans-serif;color:#141414">
<div style="max-width:560px;margin:0 auto;padding:24px 16px">
<div style="background:#fff;border-radius:16px;padding:28px 24px">
<p style="margin:0 0 18px;font-weight:bold;font-size:18px">${esc(brand.name)}</p>
<h1 style="font-size:22px;line-height:1.3;margin:0 0 16px">${esc(o.title)}</h1>
${o.paragraphs.map(p => `<p style="font-size:15px;line-height:1.55;margin:0 0 14px;white-space:pre-line">${esc(p)}</p>`).join('\n')}
${o.button ? `<p style="margin:22px 0 6px"><a href="${esc(o.button.url)}" style="display:inline-block;background:#e0fb00;color:#141414;text-decoration:none;font-weight:bold;padding:12px 22px;border-radius:999px">${esc(o.button.label)}</a></p>` : ''}
</div>
<p style="font-size:12px;color:#777;line-height:1.5;margin:14px 8px">${esc(brand.name)} · ${esc(brand.domain)}${o.footer ? `<br>${esc(o.footer)}` : ''}</p>
</div></body></html>`
  return { text, html }
}

export async function sendMail(o: { to: string; subject: string; text: string; html?: string; replyTo?: string }) {
  const { brand } = useAppConfig()
  const t = getTransporter()
  if (!t) {
    console.info(`[correo no enviado: SMTP sin configurar] Para: ${o.to} · ${o.subject}`)
    return false
  }
  try {
    await t.sendMail({ from: `"${brand.name}" <${brand.email}>`, replyTo: o.replyTo ?? brand.email, ...o })
    return true
  }
  catch (e) {
    console.warn('[correo] error al enviar', o.subject, e instanceof Error ? e.message : e)
    return false
  }
}

/** Para avisos que no deben retrasar ni romper la respuesta al usuario. */
export function sendMailLater(o: Parameters<typeof sendMail>[0]) {
  sendMail(o).catch(() => {})
}

/** Aviso interno al equipo (llega a hola@, que reenvía a Gmail). */
export function notifyTeam(subject: string, lines: string[], link?: string) {
  const { brand } = useAppConfig()
  const { text, html } = mailLayout({ title: subject, paragraphs: lines, button: link ? { label: 'Abrir en el panel', url: link } : undefined })
  sendMailLater({ to: brand.email, subject: `[Panel] ${subject}`, text, html })
}

export const siteUrl = (path = '') => `https://${useAppConfig().brand.domain}${path}`
