// CSV listo para importar en Brevo, Mailchimp, MailerLite… (email, nombre, origen, fecha de alta).
export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const rows = await listNewsletter()
  const cell = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`
  const csv = [
    ['email', 'nombre', 'origen', 'fecha_alta'].join(','),
    ...rows.map(r => [r.email, r.name, r.source, r.createdAt.slice(0, 10)].map(cell).join(',')),
  ].join('\r\n')
  setHeader(event, 'Content-Type', 'text/csv; charset=utf-8')
  setHeader(event, 'Content-Disposition', `attachment; filename="newsletter-${new Date().toISOString().slice(0, 10)}.csv"`)
  return `﻿${csv}`
})
