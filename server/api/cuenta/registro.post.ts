// Alta de cuenta de propietario o inquilino. Deja la sesión iniciada.
export default defineEventHandler(async (event) => {
  rateLimit(event, 'signup', 10, 60 * 60 * 1000)
  const body = await readBody<Record<string, unknown>>(event)
  if (typeof body?.website === 'string' && body.website.trim()) return { ok: true } // campo trampa

  const result = validateSignup(body ?? {})
  if (!result.ok) throw createError({ statusCode: 422, statusMessage: 'Revisa los datos', data: { errors: result.errors } })
  const { role, name, email, phone, password } = result.data

  const exists = await queryOne('SELECT 1 FROM users WHERE email = $1', [email])
  if (exists) throw createError({ statusCode: 409, statusMessage: 'Ya hay una cuenta con este correo. Entra con tu contraseña.' })

  const user = await queryOne<{ id: string }>(
    `INSERT INTO users (role, name, email, phone, password_hash, consent_at, consent_text, last_login_at)
     VALUES ($1, $2, $3, $4, $5, now(), $6, now()) RETURNING id`,
    [role, name, email, phone, await hashPassword(password), SIGNUP_CONSENT],
  )
  const session = await userSession(event)
  await session.update({ userId: user!.id })
  const welcome = mailLayout({
    preheader: role === 'propietario' ? 'Publica tu piso en unos minutos.' : 'Escribe a los propietarios sin dar tu teléfono.',
    eyebrow: 'Bienvenida',
    footer: 'Recibes este correo porque acabas de crear una cuenta en RentaHucha.',
    title: `Bienvenido/a a RentaHucha, ${name.split(' ')[0]}`,
    paragraphs: role === 'propietario'
      ? ['Ya puedes publicar tu piso: rellena los datos, sube al menos 3 fotos y envíalo a revisión. Lo revisamos y lo publicamos, normalmente en menos de 24 horas.', 'Cuando un inquilino te escriba, te avisaremos por correo. Podrás ver su perfil y proponerle una visita desde el chat.']
      : ['Ya puedes escribir a los propietarios sin dar tu teléfono. Completa tu perfil de inquilino: los propietarios lo ven al recibir tu mensaje y responden antes.', 'Cuando un propietario te responda, te avisaremos por correo.'],
    button: role === 'propietario' ? { label: 'Publicar mi piso', url: siteUrl('/mi-cuenta/pisos/nuevo') } : { label: 'Completar mi perfil', url: siteUrl('/mi-cuenta/perfil') },
  })
  sendMailLater({ to: email, subject: 'Bienvenido/a a RentaHucha', ...welcome })
  if (role === 'propietario') notifyTeam(`Nueva cuenta de propietario: ${name}`, [`${name} · ${email}${phone ? ` · ${phone}` : ''}`])
  return { ok: true, user: { id: user!.id, role, name, email, phone } }
})
