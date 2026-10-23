export default defineEventHandler(async (event) => {
  rateLimit(event, 'newsletter', 20, 60 * 60 * 1000)
  const body = await readBody<Record<string, unknown>>(event)
  if (typeof body?.website === 'string' && body.website.trim()) return { ok: true }

  const result = validateNewsletter(body ?? {})
  if (!result.ok) throw createError({ statusCode: 422, statusMessage: result.error })

  // Origen del alta: el pie de la web, la checklist o la guía del decreto (a cambio del PDF) o el test del propietario.
  const source = body?.source === 'checklist' || body?.source === 'test' || body?.source === 'guia-decreto' ? body.source : 'pie'
  const inserted = await query('INSERT INTO newsletter_subscribers (email, source) VALUES ($1, $2) ON CONFLICT (email) DO NOTHING RETURNING email', [result.email, source])

  // Quien pide un PDF (checklist o guía del decreto) recibe un correo con el enlace y el siguiente paso.
  const PDFS: Record<string, { name: string; file: string; next: string }> = {
    'checklist': { name: 'la checklist para alquilar tu piso', file: '/dossier/rentahucha-checklist-alquilar-piso-2027.pdf', next: 'Cuando tengas el piso listo, te decimos cuánto puedes pedir con pisos comparables de tu zona y el índice oficial.' },
    'guia-decreto': { name: 'la guía del decreto de vivienda para propietarios', file: '/dossier/rentahucha-guia-decreto-vivienda-2026.pdf', next: 'Con el decreto, el precio que pongas cambia lo que puedes subir y tu reducción en el IRPF. Te decimos cuánto pedir con pisos comparables de tu zona y el índice oficial.' },
  }
  const pdf = PDFS[source]
  if (inserted.length && pdf) {
    const mail = mailLayout({
      preheader: `Aquí tienes ${pdf.name}.`,
      eyebrow: 'Tu descarga',
      title: `Aquí tienes ${pdf.name}`,
      paragraphs: ['Gracias por descargarla. Te dejamos el enlace por si quieres guardarla o compartirla.', pdf.next],
      button: { label: 'Pedir mi valoración gratis', url: siteUrl('/valoracion-alquiler?utm_source=correo&utm_campaign=' + source) },
      after: [`Descarga el PDF: ${siteUrl(pdf.file)}`],
      footer: 'Recibes este correo porque has pedido esta descarga en rentahucha.es y aceptado recibir nuestras novedades. Para darte de baja, responde a este correo con la palabra BAJA.',
    })
    sendMailLater({ to: result.email, subject: `Tu descarga: ${pdf.name}`, ...mail })
    notifyTeam(`Nueva descarga: ${pdf.name}`, [`${result.email} ha descargado ${pdf.name} y acepta recibir novedades.`])
  }
  return { ok: true }
})
