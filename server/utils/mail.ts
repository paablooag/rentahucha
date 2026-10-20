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

export interface MailContent {
  /** Texto corto que los clientes de correo muestran junto al asunto. */
  preheader?: string
  /** Etiqueta pequeña sobre el título (p. ej. «Tu anuncio»). */
  eyebrow?: string
  title: string
  paragraphs: string[]
  /** Recuadro destacado: un mensaje recibido, una nota de revisión… */
  highlight?: { label?: string; text: string }
  button?: { label: string; url: string }
  /** Párrafos tras el botón (letra pequeña). */
  after?: string[]
  /** Por qué recibe este correo (pie). */
  footer?: string
}

// Colores de la marca (los clientes de correo no entienden variables CSS).
const C = { ink: '#141414', lime: '#e0fb00', limeSoft: '#f6fdc6', bg: '#f2f2ef', muted: '#6b6b6b', line: '#e6e6e6' }
const FONT = `'Inter Tight', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif`

/**
 * Plantilla de marca para todos los correos: tablas e estilos en línea para que se vea igual en Gmail, Outlook,
 * Apple Mail y el móvil. Todo el texto que llega es texto plano y se escapa.
 */
export function mailLayout(o: MailContent) {
  const { brand } = useAppConfig()
  const site = `https://${brand.domain}`
  const text = [
    o.title, '',
    ...o.paragraphs.flatMap(p => [p, '']),
    ...(o.highlight ? [`${o.highlight.label ? `${o.highlight.label}: ` : ''}${o.highlight.text}`, ''] : []),
    ...(o.button ? [`${o.button.label}: ${o.button.url}`, ''] : []),
    ...(o.after ?? []).flatMap(p => [p, '']),
    '—', `${brand.name} · ${site}`, o.footer ?? '',
  ].join('\n').trim()

  const p = (s: string, extra = '') => `<p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:${C.ink};white-space:pre-line;${extra}">${esc(s)}</p>`
  const button = o.button
    ? `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:8px 0 22px"><tr>
<td bgcolor="${C.lime}" style="border-radius:999px;background:${C.lime}">
<a href="${esc(o.button.url)}" target="_blank" style="display:inline-block;padding:14px 28px;font-family:${FONT};font-size:16px;font-weight:700;color:${C.ink};text-decoration:none;border-radius:999px">${esc(o.button.label)} &rarr;</a>
</td></tr></table>`
    : ''
  const highlight = o.highlight
    ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:4px 0 20px"><tr>
<td style="background:${C.limeSoft};border-left:4px solid ${C.lime};border-radius:12px;padding:16px 18px">
${o.highlight.label ? `<p style="margin:0 0 6px;font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:${C.muted}">${esc(o.highlight.label)}</p>` : ''}
<p style="margin:0;font-size:16px;line-height:1.6;color:${C.ink};white-space:pre-line">${esc(o.highlight.text)}</p>
</td></tr></table>`
    : ''

  const html = `<!doctype html>
<html lang="es" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light"><meta name="supported-color-schemes" content="light">
<title>${esc(o.title)}</title>
</head>
<body style="margin:0;padding:0;background:${C.bg};-webkit-text-size-adjust:100%">
${o.preheader ? `<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:${C.bg}">${esc(o.preheader)}&#8199;&#65279;&#847;&#8199;&#65279;&#847;&#8199;&#65279;&#847;</div>` : ''}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.bg}">
<tr><td align="center" style="padding:28px 12px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;font-family:${FONT}">

<tr><td style="background:${C.ink};border-radius:20px 20px 0 0;padding:22px 32px">
<a href="${site}" target="_blank" style="text-decoration:none"><img src="${site}/email/logo.png" width="140" height="36" alt="${esc(brand.name)}" style="display:block;border:0;width:140px;height:auto"></a>
</td></tr>

<tr><td style="background:#ffffff;padding:34px 32px 18px">
${o.eyebrow ? `<p style="margin:0 0 10px;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:${C.muted}">${esc(o.eyebrow)}</p>` : ''}
<h1 style="margin:0 0 18px;font-size:26px;line-height:1.25;font-weight:700;letter-spacing:-.02em;color:${C.ink}">${esc(o.title)}</h1>
${o.paragraphs.map(s => p(s)).join('\n')}
${highlight}
${button}
${(o.after ?? []).map(s => p(s, `font-size:14px;color:${C.muted}`)).join('\n')}
</td></tr>

<tr><td style="background:#ffffff;border-radius:0 0 20px 20px;padding:0 32px 28px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-top:1px solid ${C.line};padding-top:18px">
<p style="margin:0;font-size:14px;line-height:1.5;color:${C.ink}"><strong>${esc(brand.name)}</strong> · Inquilinos verificados y una hucha que responde.</p>
</td></tr></table>
</td></tr>

<tr><td style="padding:20px 32px 8px;text-align:center">
<p style="margin:0 0 10px;font-size:13px;line-height:1.6">
<a href="${site}/pisos" style="color:${C.ink};text-decoration:underline">Pisos</a> &nbsp;·&nbsp;
<a href="${site}/propietarios" style="color:${C.ink};text-decoration:underline">Propietarios</a> &nbsp;·&nbsp;
<a href="${site}/mi-cuenta" style="color:${C.ink};text-decoration:underline">Mi cuenta</a> &nbsp;·&nbsp;
<a href="mailto:${brand.email}" style="color:${C.ink};text-decoration:underline">${esc(brand.email)}</a>
</p>
<p style="margin:0 0 6px;font-size:12px;line-height:1.6;color:${C.muted}">${o.footer ? `${esc(o.footer)}<br>` : ''}Responde a este correo si necesitas ayuda: lo lee una persona.</p>
<p style="margin:0;font-size:12px;line-height:1.6;color:${C.muted}">${esc(brand.name)} no es una aseguradora · <a href="${site}/legal/privacidad" style="color:${C.muted}">Privacidad</a></p>
</td></tr>

</table>
</td></tr>
</table>
</body></html>`
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
  const { text, html } = mailLayout({ eyebrow: 'Panel de RentaHucha', title: subject, paragraphs: lines, button: link ? { label: 'Abrir en el panel', url: link } : undefined, footer: 'Aviso interno del panel.' })
  sendMailLater({ to: brand.email, subject: `[Panel] ${subject}`, text, html })
}

export const siteUrl = (path = '') => `https://${useAppConfig().brand.domain}${path}`
