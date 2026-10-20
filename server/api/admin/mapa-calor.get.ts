// Datos del mapa de calor de una página: clics (posición relativa 0-1000), hasta dónde se baja y qué se pulsa más.
export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const q = getQuery(event)
  const days = [7, 30, 90].includes(Number(q.dias)) ? Number(q.dias) : 30
  const device = ['móvil', 'tablet', 'escritorio'].includes(String(q.dispositivo)) ? String(q.dispositivo) : 'escritorio'
  const since = `ts > now() - interval '${days} days'`

  // Páginas con datos, para el selector.
  const paths = await query<{ path: string; clicks: number }>(
    `SELECT path, count(*)::int AS clicks FROM page_clicks WHERE ${since} GROUP BY path ORDER BY clicks DESC LIMIT 50`,
  )
  const path = typeof q.ruta === 'string' && q.ruta.startsWith('/') ? q.ruta.slice(0, 300) : (paths[0]?.path ?? '/')

  const [clicks, targets, scroll] = await Promise.all([
    query<{ x: number; y: number }>(`SELECT x, y FROM page_clicks WHERE path = $1 AND device = $2 AND ${since} ORDER BY ts DESC LIMIT 5000`, [path, device]),
    query<{ target: string; n: number }>(
      `SELECT target, count(*)::int AS n FROM page_clicks WHERE path = $1 AND device = $2 AND target <> '' AND ${since} GROUP BY target ORDER BY n DESC LIMIT 12`,
      [path, device],
    ),
    queryOne<{ views: number; p25: number; p50: number; p75: number; p100: number }>(
      `SELECT count(*)::int AS views,
              count(*) FILTER (WHERE max_scroll >= 25)::int AS p25, count(*) FILTER (WHERE max_scroll >= 50)::int AS p50,
              count(*) FILTER (WHERE max_scroll >= 75)::int AS p75, count(*) FILTER (WHERE max_scroll >= 95)::int AS p100
       FROM pageviews WHERE event = 'view' AND path = $1 AND device = $2 AND max_scroll IS NOT NULL AND ${since}`,
      [path, device],
    ),
  ])
  return { days, device, path, paths, clicks, targets, scroll }
})
