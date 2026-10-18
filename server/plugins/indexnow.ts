// En producción, cada 6 horas (y poco después de arrancar) avisa por IndexNow de las URL nuevas o cambiadas:
// artículos programados que se publican, artículos editados y páginas nuevas tras un despliegue.
const META_KEY = 'indexnow_sent'

async function run() {
  const current = await publicUrlVersions()
  const row = await queryOne<{ value: string }>(`SELECT value FROM app_meta WHERE key = $1`, [META_KEY])
  const sent = new Set<string>(row ? JSON.parse(row.value) : [])
  const pending = current.filter(v => !sent.has(v))
  if (!pending.length) return
  const count = await submitIndexNow([...new Set(pending.map(v => v.split('|')[0]!))])
  await query(
    `INSERT INTO app_meta (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value`,
    [META_KEY, JSON.stringify(current)],
  )
  console.info(`[indexnow] ${count} URL enviadas`)
}

export default defineNitroPlugin(() => {
  if (import.meta.dev || import.meta.prerender) return
  const safeRun = () => run().catch(e => console.warn('[indexnow]', e instanceof Error ? e.message : e))
  setTimeout(safeRun, 2 * 60 * 1000)
  setInterval(safeRun, 6 * 60 * 60 * 1000)
})
