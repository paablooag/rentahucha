// Datos de Google Search Console para el panel: evolución, búsquedas, páginas y oportunidades.
// El periodo termina en el último día que ha publicado Google (suele ir 2-3 días por detrás).
export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const q = getQuery(event)
  const days = [7, 28, 90].includes(Number(q.dias)) ? Number(q.dias) : 28
  const synced = await queryOne<{ value: string }>(`SELECT value FROM app_meta WHERE key = 'gsc_synced_at'`)
  const last = await queryOne<{ day: string }>(`SELECT to_char(max(day), 'YYYY-MM-DD') AS day FROM gsc_daily`)
  const base = { configured: gscConfigured(), syncedAt: synced?.value ?? null, days }
  if (!last?.day) return { ...base, lastDay: null, series: [], totals: null, previous: null, queries: [], pages: [], opportunities: [], unclicked: [] }

  const end = last.day
  const params = [end, days]
  const range = `day > $1::date - $2::int AND day <= $1::date`
  const prevRange = `day > $1::date - 2 * $2::int AND day <= $1::date - $2::int`
  // Posición media ponderada por impresiones, como la calcula Google.
  const agg = `sum(clicks)::int AS clicks, sum(impressions)::int AS impressions,
    CASE WHEN sum(impressions) > 0 THEN round((sum(position * impressions) / sum(impressions))::numeric, 1)::float ELSE 0 END AS position`

  const [series, totals, previous, queries, pages, opportunities, unclicked] = await Promise.all([
    query(`SELECT to_char(d::date, 'YYYY-MM-DD') AS day, COALESCE(g.clicks, 0) AS clicks, COALESCE(g.impressions, 0) AS impressions, COALESCE(round(g.position::numeric, 1)::float, 0) AS position
           FROM generate_series($1::date - $2::int + 1, $1::date, interval '1 day') d LEFT JOIN gsc_daily g ON g.day = d::date ORDER BY d`, params),
    queryOne(`SELECT ${agg} FROM gsc_daily WHERE ${range}`, params),
    queryOne(`SELECT ${agg} FROM gsc_daily WHERE ${prevRange}`, params),
    query(`SELECT query, ${agg}, (array_agg(page ORDER BY impressions DESC))[1] AS page FROM gsc_queries WHERE ${range}
           GROUP BY query ORDER BY sum(impressions) DESC, sum(clicks) DESC LIMIT 100`, params),
    query(`SELECT page, ${agg} FROM gsc_pages WHERE ${range} GROUP BY page ORDER BY sum(clicks) DESC, sum(impressions) DESC LIMIT 100`, params),
    // Búsquedas en las que salimos entre la posición 4 y la 20: mejorando la página se puede llegar al top 3 o a la primera página.
    query(`SELECT query, ${agg}, (array_agg(page ORDER BY impressions DESC))[1] AS page FROM gsc_queries WHERE ${range}
           GROUP BY query HAVING sum(impressions) >= 3 AND sum(position * impressions) / sum(impressions) BETWEEN 4 AND 20
           ORDER BY sum(impressions) DESC LIMIT 30`, params),
    // Páginas que Google enseña pero nadie pincha: revisar título y descripción.
    query(`SELECT page, ${agg} FROM gsc_pages WHERE ${range} GROUP BY page HAVING sum(clicks) = 0 AND sum(impressions) >= 10
           ORDER BY sum(impressions) DESC LIMIT 30`, params),
  ])
  return { ...base, lastDay: end, series, totals, previous, queries, pages, opportunities, unclicked }
})
