// Últimos valores del IRAV (Índice de Referencia para la Actualización Anual de los Contratos de Arrendamiento de
// Vivienda) desde la API pública del INE (operación 481, tabla 72975: variación anual, total nacional).
// Se guarda en caché 6 horas; si el INE no responde, se usa el último dato conocido.
interface IneData { Anyo: number; FK_Periodo: number; Valor: number }
export interface IravMonth { year: number; month: number; value: number }

const FALLBACK: IravMonth[] = [
  { year: 2026, month: 9, value: 2.54 }, { year: 2026, month: 8, value: 2.47 }, { year: 2026, month: 7, value: 2.49 },
  { year: 2026, month: 6, value: 2.44 }, { year: 2026, month: 5, value: 2.48 }, { year: 2026, month: 4, value: 2.4 },
  { year: 2026, month: 3, value: 2.47 }, { year: 2026, month: 2, value: 2.16 }, { year: 2026, month: 1, value: 2.14 },
  { year: 2025, month: 12, value: 2.32 }, { year: 2025, month: 11, value: 2.29 }, { year: 2025, month: 10, value: 2.25 },
]

export default defineCachedEventHandler(async () => {
  try {
    const series = await $fetch<{ Data: IneData[] }[]>('https://servicios.ine.es/wstempus/js/ES/DATOS_TABLA/72975?nult=12', { timeout: 8000 })
    const months = (series[0]?.Data ?? [])
      .filter(d => typeof d.Valor === 'number')
      .map(d => ({ year: d.Anyo, month: d.FK_Periodo, value: d.Valor }))
      .sort((a, b) => b.year - a.year || b.month - a.month)
    if (months.length) return { months, source: 'ine' as const }
  }
  catch (e) {
    console.warn('[irav]', e instanceof Error ? e.message : e)
  }
  return { months: FALLBACK, source: 'copia' as const }
}, { maxAge: 6 * 60 * 60, name: 'irav' })
