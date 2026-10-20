import { SURVEY, SURVEY_MIN_RESULTS } from '#shared/utils/forms'

// Resultados agregados y anónimos de la encuesta. Solo se muestran con un mínimo de respuestas.
export async function surveyResults() {
  const rows = await query<{ data: Record<string, unknown> | string }>(`SELECT data FROM form_submissions WHERE kind = 'encuesta'`)
  const total = rows.length
  if (total < SURVEY_MIN_RESULTS) return { total, ready: false as const, min: SURVEY_MIN_RESULTS }

  const count = (key: 'ownerWorry' | 'tenantWorry' | 'wants') => {
    const tally = new Map<string, number>()
    let answered = 0
    for (const r of rows) {
      const d = typeof r.data === 'string' ? JSON.parse(r.data) : r.data
      const v = d[key]
      const values = Array.isArray(v) ? v : v ? [v] : []
      if (values.length) answered++
      for (const x of values) tally.set(String(x), (tally.get(String(x)) ?? 0) + 1)
    }
    const options = SURVEY[key].options.map(o => ({ option: o, n: tally.get(o) ?? 0, pct: answered ? Math.round(((tally.get(o) ?? 0) / answered) * 100) : 0 }))
    return { answered, options: options.sort((a, b) => b.n - a.n) }
  }
  return { total, ready: true as const, min: SURVEY_MIN_RESULTS, ownerWorry: count('ownerWorry'), tenantWorry: count('tenantWorry'), wants: count('wants') }
}
