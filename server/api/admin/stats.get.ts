// Estadísticas del panel. Fechas en hora de Madrid. «Visitantes» = huellas anónimas distintas por día.
const DAY = `(ts AT TIME ZONE 'Europe/Madrid')::date`
const TODAY = `(now() AT TIME ZONE 'Europe/Madrid')::date`

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const days = [7, 30, 90].includes(Number(getQuery(event).dias)) ? Number(getQuery(event).dias) : 30
  const since = `${DAY} > ${TODAY} - ${days}`
  const n = (v: unknown) => Number(v ?? 0)

  const [realtime, realtimePages, today, yesterday, series, pages, referrers, campaigns, devices, events, leads, ownerPages] = await Promise.all([
    queryOne<{ visitors: number }>(`SELECT count(DISTINCT visitor) AS visitors FROM pageviews WHERE ts > now() - interval '5 minutes'`),
    query<{ path: string; visitors: number }>(`SELECT path, count(DISTINCT visitor) AS visitors FROM pageviews WHERE event = 'view' AND ts > now() - interval '5 minutes' GROUP BY path ORDER BY visitors DESC LIMIT 8`),
    queryOne<{ visitors: number; views: number }>(`SELECT count(DISTINCT visitor) AS visitors, count(*) FILTER (WHERE event = 'view') AS views FROM pageviews WHERE ${DAY} = ${TODAY}`),
    queryOne<{ visitors: number; views: number }>(`SELECT count(DISTINCT visitor) AS visitors, count(*) FILTER (WHERE event = 'view') AS views FROM pageviews WHERE ${DAY} = ${TODAY} - 1`),
    query<{ day: string; visitors: number; views: number }>(
      `SELECT d::date::text AS day,
              (SELECT count(DISTINCT visitor) FROM pageviews WHERE ${DAY} = d::date) AS visitors,
              (SELECT count(*) FROM pageviews WHERE event = 'view' AND ${DAY} = d::date) AS views
       FROM generate_series(${TODAY} - ${days - 1}, ${TODAY}, interval '1 day') AS d ORDER BY d`,
    ),
    query<{ path: string; views: number; visitors: number }>(`SELECT path, count(*) AS views, count(DISTINCT visitor) AS visitors FROM pageviews WHERE event = 'view' AND ${since} GROUP BY path ORDER BY views DESC LIMIT 15`),
    query<{ source: string; visitors: number }>(`SELECT COALESCE(referrer, 'Directo o desconocido') AS source, count(DISTINCT visitor) AS visitors FROM pageviews WHERE event = 'view' AND ${since} GROUP BY 1 ORDER BY visitors DESC LIMIT 10`),
    query<{ campaign: string; visitors: number }>(`SELECT concat_ws(' · ', utm_source, utm_medium, utm_campaign) AS campaign, count(DISTINCT visitor) AS visitors FROM pageviews WHERE utm_source IS NOT NULL AND ${since} GROUP BY 1 ORDER BY visitors DESC LIMIT 10`),
    query<{ device: string; visitors: number }>(`SELECT COALESCE(device, 'otro') AS device, count(DISTINCT visitor) AS visitors FROM pageviews WHERE ${since} GROUP BY 1 ORDER BY visitors DESC`),
    query<{ event: string; count: number }>(`SELECT event, count(*) AS count FROM pageviews WHERE event <> 'view' AND ${since} GROUP BY event`),
    query<{ role: string; count: number }>(`SELECT role, count(*) AS count FROM leads WHERE (created_at AT TIME ZONE 'Europe/Madrid')::date > ${TODAY} - ${days} GROUP BY role`),
    // Tráfico de propietarios: la página /propietarios y los artículos para propietarios.
    queryOne<{ visitors: number }>(
      `SELECT count(DISTINCT p.visitor) AS visitors FROM pageviews p
       WHERE p.event = 'view' AND ${since.replace(DAY, `(p.ts AT TIME ZONE 'Europe/Madrid')::date`)}
         AND (p.path = '/propietarios' OR p.path IN (SELECT '/blog/' || slug FROM blog_posts WHERE audience = 'propietarios'))`,
    ),
  ])

  const totalVisitors = series.reduce((s, d) => s + n(d.visitors), 0)
  const leadsBy = Object.fromEntries(leads.map(l => [l.role, n(l.count)]))
  const ownerTotals = await queryOne<{ c: number; ready: number; talking: number }>(
    `SELECT count(*) AS c, count(*) FILTER (WHERE stage = 'listo') AS ready, count(*) FILTER (WHERE stage = 'conversacion') AS talking FROM leads WHERE role = 'propietario'`,
  )

  const platform = await queryOne<{ owners: number; tenants: number; published: number; review: number; messages: number }>(
    `SELECT (SELECT count(*) FROM users WHERE role = 'propietario')::int AS owners, (SELECT count(*) FROM users WHERE role = 'inquilino')::int AS tenants,
            (SELECT count(*) FROM properties WHERE status = 'publicado')::int AS published, (SELECT count(*) FROM properties WHERE status = 'revision')::int AS review,
            (SELECT count(*) FROM messages WHERE created_at > now() - interval '1 day' * $1)::int AS messages`,
    [days],
  )

  return {
    days,
    platform,
    realtime: { visitors: n(realtime?.visitors), pages: realtimePages.map(p => ({ path: p.path, visitors: n(p.visitors) })) },
    today: { visitors: n(today?.visitors), views: n(today?.views) },
    yesterday: { visitors: n(yesterday?.visitors), views: n(yesterday?.views) },
    series: series.map(d => ({ day: d.day, visitors: n(d.visitors), views: n(d.views) })),
    totalVisitors,
    pages: pages.map(p => ({ path: p.path, views: n(p.views), visitors: n(p.visitors) })),
    referrers: referrers.map(r => ({ source: r.source, visitors: n(r.visitors) })),
    campaigns: campaigns.map(c => ({ campaign: c.campaign, visitors: n(c.visitors) })),
    devices: devices.map(d => ({ device: d.device, visitors: n(d.visitors) })),
    events: Object.fromEntries(events.map(e => [e.event, n(e.count)])),
    leads: { propietario: leadsBy.propietario ?? 0, inquilino: leadsBy.inquilino ?? 0, inmobiliaria: leadsBy.inmobiliaria ?? 0 },
    owners: { visitors: n(ownerPages?.visitors), totalSignups: n(ownerTotals?.c), ready: n(ownerTotals?.ready), talking: n(ownerTotals?.talking), goal: 10 },
  }
})
