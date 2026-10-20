// Lanza ahora los envíos automáticos que normalmente hace un plugin cada hora (alertas de pisos, recordatorios
// a propietarios y recordatorios de captación). Útil para probar.
export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const { ignorarLimite } = await readBody<{ ignorarLimite?: boolean }>(event) ?? {}
  return {
    sent: await sendDueAlerts({ ignoreDailyLimit: ignorarLimite === true }),
    reminders: await sendOwnerReminders(),
    followups: await sendDueFollowups(),
  }
})
