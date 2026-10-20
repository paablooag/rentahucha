// Lanza ahora el envío de alertas de pisos (normalmente lo hace un plugin cada hora). Útil para probar.
export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const { ignorarLimite } = await readBody<{ ignorarLimite?: boolean }>(event) ?? {}
  return { sent: await sendDueAlerts({ ignoreDailyLimit: ignorarLimite === true }) }
})
