export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const rows = await query<{ id: string; kind: string; name: string; email: string; phone: string; city: string; data: unknown; consentNews: boolean; status: string; notes: string; createdAt: string }>(
    `SELECT id, kind, name, email, phone, city, data, consent_news, status, notes, created_at FROM form_submissions ORDER BY created_at DESC LIMIT 500`,
  )
  return {
    items: rows.map(r => ({ ...r, data: typeof r.data === 'string' ? JSON.parse(r.data) : r.data })),
    survey: await surveyResults(),
  }
})
