// En producción, cada 6 horas: copia de los datos de Google Search Console (server/utils/search-console.ts).
export default defineNitroPlugin(() => {
  if (import.meta.dev || import.meta.prerender || !gscConfigured()) return
  const run = () => {
    syncSearchConsole().catch(e => console.warn('[search console]', e instanceof Error ? e.message : e))
  }
  setTimeout(run, 2 * 60 * 1000)
  setInterval(run, 6 * 60 * 60 * 1000)
})
