// Vista previa de las plantillas de correo con datos de ejemplo (solo panel). /api/admin/correos/mensaje, anuncio…
export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const samples: Record<string, MailContent> = {
    mensaje: {
      preheader: 'Hola, me interesa mucho el piso. Somos una pareja con contrato indefinido…',
      eyebrow: 'Mensaje nuevo',
      title: 'Lucía te ha escrito',
      paragraphs: ['Hola, Marta: tienes un mensaje nuevo sobre «Piso luminoso de 2 habitaciones en Ruzafa».'],
      highlight: { label: 'Lucía', text: 'Hola, me interesa mucho el piso. Somos una pareja con contrato indefinido y nos mudaríamos en diciembre. ¿Podríamos verlo el sábado?' },
      button: { label: 'Ver y responder', url: siteUrl('/mi-cuenta/mensajes') },
      after: ['Responde desde la web: así no tienes que dar tu teléfono ni tu correo. Nunca envíes dinero ni pagues una señal antes de visitar el piso.'],
      footer: 'Recibes este aviso porque tienes una cuenta en RentaHucha. Puedes desactivarlo en Mi cuenta.',
    },
    anuncio: {
      preheader: 'Ya aparece en el buscador.',
      eyebrow: 'Tu anuncio',
      title: '¡Tu anuncio ya está publicado!',
      paragraphs: ['Hola, Marta: hemos revisado «Piso luminoso de 2 habitaciones en Ruzafa» y ya aparece en el buscador.', 'Cuando alguien te escriba, te avisaremos por correo.'],
      button: { label: 'Ver mi anuncio', url: siteUrl('/pisos') },
      after: ['Consejo: responde pronto a los interesados y propón día de visita desde el chat.'],
      footer: 'Recibes este correo porque has publicado un anuncio en RentaHucha.',
    },
    cambios: {
      eyebrow: 'Tu anuncio',
      title: 'Tu anuncio necesita algún cambio',
      paragraphs: ['Hola, Marta: hemos revisado «Piso luminoso de 2 habitaciones en Ruzafa» y, antes de publicarlo, hace falta esto:'],
      highlight: { label: 'Lo que hay que cambiar', text: 'Añade la calificación energética y quita el teléfono de la descripción: los interesados te escribirán por la web.' },
      button: { label: 'Editar el anuncio', url: siteUrl('/mi-cuenta/pisos') },
      footer: 'Recibes este correo porque has enviado un anuncio a RentaHucha.',
    },
    valoracion: {
      eyebrow: 'Valoración del alquiler',
      title: 'Estamos preparando tu valoración',
      paragraphs: ['Hola, Carmen: gracias por contarnos cómo es tu piso. Estamos buscando pisos comparables de tu zona.'],
      highlight: { label: 'Tu piso', text: 'Piso en Ruzafa, Valencia · 75 m² · 2 hab. · 1 baño · en buen estado' },
      button: { label: 'Mientras tanto: checklist para alquilar', url: siteUrl('/herramientas/checklist-alquilar-piso') },
      after: ['Te la enviaremos en menos de 48 horas laborables.'],
      footer: 'Recibes este correo porque has pedido una valoración del alquiler en RentaHucha.',
    },
    contrasena: {
      eyebrow: 'Tu cuenta',
      title: 'Cambia tu contraseña',
      paragraphs: ['Hola, Marta: hemos recibido una petición para cambiar la contraseña de tu cuenta.'],
      button: { label: 'Elegir una contraseña nueva', url: siteUrl('/cuenta/recuperar') },
      after: ['El enlace sirve una sola vez y caduca en 1 hora.'],
    },
  }
  const tipo = getRouterParam(event, 'tipo') ?? ''
  const sample = samples[tipo]
  if (!sample) throw createError({ statusCode: 404, statusMessage: `Plantillas: ${Object.keys(samples).join(', ')}` })
  setHeader(event, 'Content-Type', 'text/html; charset=utf-8')
  return mailLayout(sample).html
})
