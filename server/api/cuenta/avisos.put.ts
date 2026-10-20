// Activa o desactiva los avisos por correo de mensajes nuevos.
export default defineEventHandler(async (event) => {
  const user = await requireUser(event)
  const on = (await readBody<{ messages?: boolean }>(event))?.messages === true
  await query('UPDATE users SET notify_messages = $2 WHERE id = $1', [user.id, on])
  return { messages: on }
})
