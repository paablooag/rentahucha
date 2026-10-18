// Buscador público de pisos publicados.
export default defineEventHandler(async (event) => {
  const q = getQuery(event)
  const num = (v: unknown) => { const n = Number(v); return Number.isFinite(n) && n > 0 ? Math.round(n) : undefined }
  return searchProperties({
    city: typeof q.ciudad === 'string' ? q.ciudad.trim().slice(0, 60) : undefined,
    maxRent: num(q.max),
    minBedrooms: num(q.hab),
    stayType: typeof q.tipo === 'string' && PROPERTY_OPTIONS.stayType.includes(q.tipo as never) ? q.tipo : undefined,
    page: num(q.pagina),
  })
})
