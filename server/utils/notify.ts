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

/**
 * Recordatorio único al propietario cuando un interesado lleva más de 48 h sin respuesta (y menos de 7 días).
 * Se llama cada hora desde un plugin. Respeta la preferencia de avisos del propietario.
 */
export async function sendOwnerReminders() {
  const due = await query<{ id: string; propertyTitle: string; ownerName: string; ownerEmail: string; tenantName: string; lastBody: string }>(
    `SELECT c.id, p.title AS property_title, o.name AS owner_name, o.email AS owner_email, t.name AS tenant_name,
            (SELECT m.body FROM messages m WHERE m.conversation_id = c.id ORDER BY m.id DESC LIMIT 1) AS last_body
     FROM conversations c
     JOIN properties p ON p.id = c.property_id
     JOIN users o ON o.id = c.owner_id
     JOIN users t ON t.id = c.tenant_id
     WHERE c.blocked_at IS NULL AND p.status = 'publicado' AND o.notify_messages
       AND c.owner_reminded_at IS NULL
       AND (SELECT m.sender_id FROM messages m WHERE m.conversation_id = c.id ORDER BY m.id DESC LIMIT 1) = c.tenant_id
       AND (SELECT max(m.created_at) FROM messages m WHERE m.conversation_id = c.id) BETWEEN now() - interval '7 days' AND now() - interval '48 hours'
     LIMIT 50`,
  )
  for (const c of due) {
    const excerpt = c.lastBody.length > 280 ? `${c.lastBody.slice(0, 280)}…` : c.lastBody
    const from = c.tenantName.split(' ')[0]
    const mail = mailLayout({
      preheader: `${from} espera tu respuesta desde hace más de dos días.`,
      eyebrow: 'Interesado esperando',
      title: `${from} sigue esperando tu respuesta`,
      paragraphs: [`Hola, ${c.ownerName.split(' ')[0]}: ${from} te escribió sobre «${c.propertyTitle}» hace más de dos días y aún no le has respondido.`],
      highlight: { label: from, text: excerpt },
      button: { label: 'Responder ahora', url: siteUrl(`/mi-cuenta/mensajes/${c.id}`) },
      after: ['Los inquilinos suelen escribir a varios pisos a la vez: los propietarios que responden pronto alquilan antes. Si ya no está disponible, márcalo como alquilado o pausa el anuncio desde tu panel.'],
      footer: 'Recordatorio único. Puedes desactivar los avisos de mensajes en Mi cuenta.',
    })
    await query('UPDATE conversations SET owner_reminded_at = now() WHERE id = $1', [c.id])
    await sendMail({ to: c.ownerEmail, subject: `${from} espera tu respuesta sobre «${c.propertyTitle}»`, ...mail })
  }
  return due.length
}
