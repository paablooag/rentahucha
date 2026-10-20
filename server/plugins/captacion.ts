// En producción, cada hora: recordatorios únicos de captación pendientes (ver server/utils/prospects.ts).
export default defineNitroPlugin(() => {
  if (import.meta.dev || import.meta.prerender) return
  const run = () => sendDueFollowups().catch(e => console.warn('[captación]', e instanceof Error ? e.message : e))
  setTimeout(run, 5 * 60 * 1000)
  setInterval(run, 60 * 60 * 1000)
})
