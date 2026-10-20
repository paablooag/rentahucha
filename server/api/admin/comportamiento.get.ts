// Comportamiento de los visitantes (sin cookies): tiempo, páginas por visita, entradas y salidas, recorridos y,
// por página, tiempo y scroll. Solo cuenta visitas con identificador de visita (desde que existe el seguimiento nuevo).
export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const days = [7, 30, 90].includes(Number(getQuery(event).dias)) ? Number(getQuery(event).dias) : 30
  const since = `ts > now() - interval '${days} days'`

  const [summary, entries, exits, flows, pages] = await Promise.all([
    queryOne<{ visits: number; pagesPerVisit: number; avgVisitMs: number; bounce: number; avgPageMs: number }>(
      `WITH v AS (
         SELECT visit, count(*) AS pages, sum(COALESCE(duration_ms, 0)) AS ms
         FROM pageviews WHERE event = 'view' AND visit IS NOT NULL AND ${since} GROUP BY visit
       )
       SELECT count(*)::int AS visits,
              COALESCE(round(avg(pages)::numeric, 2), 0)::float AS pages_per_visit,
              COALESCE(round(avg(ms))::int, 0) AS avg_visit_ms,
              COALESCE(round(100.0 * count(*) FILTER (WHERE pages = 1) / NULLIF(count(*), 0)), 0)::int AS bounce,
              (SELECT COALESCE(round(avg(duration_ms))::int, 0) FROM pageviews WHERE event = 'view' AND duration_ms > 0 AND ${since}) AS avg_page_ms
       FROM v`,
    ),
    query<{ path: string; visits: number }>(
      `SELECT path, count(*)::int AS visits FROM pageviews WHERE event = 'view' AND seq = 1 AND visit IS NOT NULL AND ${since}
       GROUP BY path ORDER BY visits DESC LIMIT 10`,
    ),
    query<{ path: string; visits: number }>(
      `SELECT path, count(*)::int AS visits FROM (
         SELECT DISTINCT ON (visit) visit, path FROM pageviews WHERE event = 'view' AND visit IS NOT NULL AND ${since} ORDER BY visit, seq DESC
       ) last GROUP BY path ORDER BY visits DESC LIMIT 10`,
    ),
    query<{ fromPath: string; toPath: string; n: number }>(
      `SELECT a.path AS from_path, b.path AS to_path, count(*)::int AS n
       FROM pageviews a JOIN pageviews b ON b.visit = a.visit AND b.seq = a.seq + 1 AND b.event = 'view'
       WHERE a.event = 'view' AND a.visit IS NOT NULL AND a.${since} AND a.path <> b.path
       GROUP BY 1, 2 ORDER BY n DESC LIMIT 15`,
    ),
    query<{ path: string; views: number; avgMs: number; avgScroll: number }>(
      `SELECT path, count(*)::int AS views,
              COALESCE(round(avg(duration_ms) FILTER (WHERE duration_ms > 0))::int, 0) AS avg_ms,
              COALESCE(round(avg(max_scroll) FILTER (WHERE max_scroll > 0))::int, 0) AS avg_scroll
       FROM pageviews WHERE event = 'view' AND visit IS NOT NULL AND ${since}
       GROUP BY path ORDER BY views DESC LIMIT 20`,
    ),
  ])
  return { days, summary, entries, exits, flows, pages }
})
