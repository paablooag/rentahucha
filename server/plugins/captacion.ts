// En producción, cada hora: recordatorios únicos de captación pendientes (server/utils/prospects.ts)
// y alertas de pisos nuevos para quien busca (server/utils/alerts.ts).
export default defineNitroPlugin(() => {
  if (import.meta.dev || import.meta.prerender) return
  const run = () => {
    sendDueFollowups().catch(e => console.warn('[captación]', e instanceof Error ? e.message : e))
    sendDueAlerts().catch(e => console.warn('[alertas]', e instanceof Error ? e.message : e))
  }
  setTimeout(run, 5 * 60 * 1000)
  setInterval(run, 60 * 60 * 1000)
})
