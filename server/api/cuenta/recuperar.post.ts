import { createHash, randomBytes } from 'node:crypto'

// Pide un enlace para cambiar la contraseña. Responde lo mismo exista o no la cuenta (no revela qué correos están dados de alta).
export default defineEventHandler(async (event) => {
  rateLimit(event, 'password-reset', 5, 60 * 60 * 1000)
  const email = String((await readBody<{ email?: string }>(event))?.email ?? '').trim().toLowerCase().slice(0, 120)
  const user = await queryOne<{ id: string; name: string }>('SELECT id, name FROM users WHERE email = $1', [email])
  if (user) {
    const token = randomBytes(32).toString('base64url')
    const hash = createHash('sha256').update(token).digest('hex')
    await query('DELETE FROM password_resets WHERE user_id = $1 OR expires_at < now()', [user.id])
    await query(`INSERT INTO password_resets (token_hash, user_id, expires_at) VALUES ($1, $2, now() + interval '1 hour')`, [hash, user.id])
    const mail = mailLayout({
      title: 'Cambia tu contraseña',
      paragraphs: [`Hola, ${user.name.split(' ')[0]}: hemos recibido una petición para cambiar la contraseña de tu cuenta.`, 'El enlace sirve una sola vez y caduca en 1 hora. Si no lo has pedido tú, ignora este correo: tu contraseña no cambia.'],
      button: { label: 'Elegir una contraseña nueva', url: siteUrl(`/cuenta/restablecer?token=${token}`) },
    })
    await sendMail({ to: email, subject: 'Cambia tu contraseña de RentaHucha', ...mail })
  }
  return { ok: true }
})
