export default defineEventHandler(async (event) => {
  const session = await userSession(event)
  await session.clear()
  return { ok: true }
})
