// Alta de empresas: una ({ company, city, … }) o varias ({ items: [...] }). Las repetidas (mismo nombre y ciudad) se ignoran.
export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const body = await readBody<Record<string, unknown>>(event)
  const raw = Array.isArray(body?.items) ? (body.items as Record<string, unknown>[]).slice(0, 500) : [body ?? {}]
  let added = 0
  for (const r of raw) {
    const p = cleanProspect(r)
    if (p.company.length < 2 || p.city.length < 2) continue
    const row = await queryOne<{ id: string }>(
      `INSERT INTO prospects (kind, company, contact_name, city, phone, email, website, source, notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       ON CONFLICT (lower(company), lower(city)) DO NOTHING RETURNING id`,
      [p.kind, p.company, p.contactName, p.city, p.phone, p.email, p.website, p.source, p.notes],
    )
    if (row) { added++; await logProspect(row.id, 'alta', p.source ? `Fuente: ${p.source}` : '') }
  }
  return { added, skipped: raw.length - added }
})
