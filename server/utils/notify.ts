// Avisos por correo de la plataforma. Nunca bloquean ni rompen la acción del usuario: si el correo falla, se anota y sigue.

const THROTTLE_MIN = 15

/** Mensaje nuevo en el chat: avisa a la otra parte, como mucho una vez cada 15 minutos por conversación. */
export async function notifyNewMessage(conversationId: string, senderId: string, preview: string) {
  try {
    const c = await queryOne<{
      ownerId: string; tenantId: string; ownerNotifiedAt: string | null; tenantNotifiedAt: string | null
      propertyTitle: string; ownerName: string; ownerEmail: string; ownerNotify: boolean; tenantName: string; tenantEmail: string; tenantNotify: boolean
    }>(
      `SELECT c.owner_id, c.tenant_id, c.owner_notified_at, c.tenant_notified_at, p.title AS property_title,
              o.name AS owner_name, o.email AS owner_email, o.notify_messages AS owner_notify,
              t.name AS tenant_name, t.email AS tenant_email, t.notify_messages AS tenant_notify
       FROM conversations c JOIN properties p ON p.id = c.property_id JOIN users o ON o.id = c.owner_id JOIN users t ON t.id = c.tenant_id
       WHERE c.id = $1`,
      [conversationId],
    )
    if (!c) return
    const toOwner = senderId === c.tenantId
    const notifiedAt = toOwner ? c.ownerNotifiedAt : c.tenantNotifiedAt
    if (!(toOwner ? c.ownerNotify : c.tenantNotify)) return
    if (notifiedAt && Date.now() - new Date(notifiedAt).getTime() < THROTTLE_MIN * 60e3) return

    const to = toOwner ? c.ownerEmail : c.tenantEmail
    const name = (toOwner ? c.ownerName : c.tenantName).split(' ')[0]
    const from = (toOwner ? c.tenantName : c.ownerName).split(' ')[0]
    const excerpt = preview.length > 280 ? `${preview.slice(0, 280)}…` : preview
    const { text, html } = mailLayout({
      preheader: excerpt,
      eyebrow: 'Mensaje nuevo',
      title: `${from} te ha escrito`,
      paragraphs: [`Hola, ${name}: tienes un mensaje nuevo sobre «${c.propertyTitle}».`],
      highlight: { label: from, text: excerpt },
      button: { label: 'Ver y responder', url: siteUrl(`/mi-cuenta/mensajes/${conversationId}`) },
      after: ['Responde desde la web: así no tienes que dar tu teléfono ni tu correo. Nunca envíes dinero ni pagues una señal antes de visitar el piso.'],
      footer: 'Recibes este aviso porque tienes una cuenta en RentaHucha. Puedes desactivarlo en Mi cuenta.',
    })
    await query(`UPDATE conversations SET ${toOwner ? 'owner' : 'tenant'}_notified_at = now() WHERE id = $1`, [conversationId])
    await sendMail({ to, subject: `${from} te ha escrito sobre «${c.propertyTitle}»`, text, html })
  }
  catch (e) { console.warn('[aviso mensaje]', e instanceof Error ? e.message : e) }
}

/** Resultado de la revisión de un anuncio. */
export async function notifyListingReviewed(propertyId: string, approved: boolean, note: string) {
  try {
    const p = await queryOne<{ title: string; name: string; email: string }>(
      'SELECT p.title, u.name, u.email FROM properties p JOIN users u ON u.id = p.owner_id WHERE p.id = $1',
      [propertyId],
    )
    if (!p) return
    const first = p.name.split(' ')[0]
    const mail = approved
      ? mailLayout({
          preheader: 'Ya aparece en el buscador. Te avisaremos cuando alguien te escriba.',
          eyebrow: 'Tu anuncio',
          title: '¡Tu anuncio ya está publicado!',
          paragraphs: [`Hola, ${first}: hemos revisado «${p.title}» y ya aparece en el buscador.`, 'Cuando alguien te escriba, te avisaremos por correo. Desde tu panel ves las visitas del anuncio, los interesados y cuántos lo han guardado.'],
          button: { label: 'Ver mi anuncio', url: siteUrl(`/pisos/${propertyId}`) },
          after: ['Consejo: responde pronto a los interesados y propón día de visita desde el chat. Los anuncios que contestan rápido alquilan antes.'],
          footer: 'Recibes este correo porque has publicado un anuncio en RentaHucha.',
        })
      : mailLayout({
          preheader: 'Antes de publicarlo hace falta un pequeño cambio.',
          eyebrow: 'Tu anuncio',
          title: 'Tu anuncio necesita algún cambio',
          paragraphs: [`Hola, ${first}: hemos revisado «${p.title}» y, antes de publicarlo, hace falta esto:`],
          highlight: { label: 'Lo que hay que cambiar', text: note },
          button: { label: 'Editar el anuncio', url: siteUrl(`/mi-cuenta/pisos/${propertyId}`) },
          after: ['Cuando lo cambies, vuelve a enviarlo a revisión desde tu panel. Si tienes dudas, responde a este correo.'],
          footer: 'Recibes este correo porque has enviado un anuncio a RentaHucha.',
        })
    await sendMail({ to: p.email, subject: approved ? `Publicado: ${p.title}` : `Cambios en tu anuncio: ${p.title}`, ...mail })
  }
  catch (e) { console.warn('[aviso anuncio]', e instanceof Error ? e.message : e) }
}
