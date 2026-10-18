// Primer mensaje personal a cada interesado, para que Pablo lo envíe desde su correo o WhatsApp.
// Solo hablamos de lo que pidió al apuntarse (el lanzamiento y su caso), sin prometer nada que no hagamos.
import type { LeadData } from '#shared/utils/leads'

const firstName = (name: string) => name.trim().split(/\s+/)[0] ?? ''

function ownerTiming(timing?: string) {
  if (timing === 'Cuanto antes') return 'Veo que quieres alquilar cuanto antes, así que me gustaría que llegaras al lanzamiento con todo preparado.'
  if (timing === 'En los próximos 3 meses') return 'Veo que piensas alquilar en los próximos meses: es justo el momento de prepararlo con calma.'
  return 'Aunque todavía no tengas fecha, me ayudaría mucho conocer tu caso.'
}

export function outreachEmail(l: LeadData, sender = 'Pablo'): { subject: string; body: string } {
  const hi = `Hola, ${firstName(l.name)}:`
  const sign = `Un saludo,\n${sender}\nFundador de RentaHucha · rentahucha.es`

  if (l.role === 'propietario') {
    return {
      subject: `Tu piso en ${l.city} y RentaHucha`,
      body: [
        hi,
        `Soy ${sender}, fundador de RentaHucha. Gracias por apuntar tu piso de ${l.city} a la lista de espera.`,
        `Te escribo personalmente porque estamos preparando el lanzamiento con un grupo pequeño de propietarios. ${ownerTiming(l.timing)}`,
        '¿Te viene bien una llamada de 10 minutos esta semana? Me cuentas qué es lo que más te preocupa al alquilar y te explico cómo funciona: inquilinos verificados, contrato conforme a la LAU, aviso de cada pago y la hucha que el inquilino va llenando cada mes, custodiada por una entidad financiera autorizada. Si hay un impago comprobado, su saldo pasa a ti.',
        'Si lo prefieres, respóndeme a este correo con tus dudas o con el día y la hora que mejor te vengan.',
        sign,
      ].join('\n\n'),
    }
  }
  if (l.role === 'inmobiliaria') {
    return {
      subject: `${l.company ?? 'Tu inmobiliaria'} y RentaHucha`,
      body: [
        hi,
        `Soy ${sender}, fundador de RentaHucha. Gracias por apuntar ${l.company ?? 'tu inmobiliaria'} a la lista de espera.`,
        'Estamos definiendo las condiciones para agencias con las primeras que se han interesado, y me gustaría escuchar cómo trabajáis hoy el alquiler y qué os ayudaría más con vuestros propietarios.',
        '¿Te viene bien una llamada de 15 minutos esta semana? Dime día y hora y te llamo.',
        sign,
      ].join('\n\n'),
    }
  }
  return {
    subject: 'Tu plaza en la lista de espera de RentaHucha',
    body: [
      hi,
      `Soy ${sender}, fundador de RentaHucha. Gracias por apuntarte para buscar piso en ${l.city}.`,
      'Te avisaremos antes del lanzamiento para crear tu pasaporte de inquilino. Mientras tanto, si conoces a algún propietario que vaya a alquilar en tu zona, cuéntale cómo funcionamos: cuantos más pisos entren en la red, antes podremos enseñarte opciones.',
      'Y si tienes cualquier duda sobre la hucha, respóndeme a este correo.',
      sign,
    ].join('\n\n'),
  }
}

export const mailtoLink = (l: LeadData) => {
  const { subject, body } = outreachEmail(l)
  return `mailto:${l.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

// WhatsApp solo si dejó teléfono. Mensaje más corto.
export function whatsappLink(l: LeadData): string | null {
  const digits = (l.phone ?? '').replace(/\D/g, '')
  if (digits.length < 9) return null
  const phone = digits.length === 9 ? `34${digits}` : digits.replace(/^00/, '')
  const text = l.role === 'propietario'
    ? `Hola, ${firstName(l.name)}. Soy Pablo, de RentaHucha. Gracias por apuntar tu piso de ${l.city}. ¿Te viene bien que hablemos 10 minutos esta semana para conocer tu caso y explicarte cómo funciona?`
    : `Hola, ${firstName(l.name)}. Soy Pablo, de RentaHucha. Gracias por apuntarte. ¿Te viene bien que hablemos unos minutos esta semana?`
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
}
