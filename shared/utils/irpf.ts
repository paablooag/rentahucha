// Reducción del rendimiento neto por alquiler de vivienda en el IRPF (art. 23.2 de la Ley 35/2006).
// Tres regímenes según la fecha del contrato (disposición transitoria 38.ª, redactada por el RDL 29/2026):
// - «antiguo»: contratos anteriores a la Ley 12/2023 (26-5-2023) → redacción vigente a 31-12-2021 (60 %).
// - «ley2023»: del 26-5-2023 al 1-12-2026 → redacción vigente a 31-12-2025 (50 / 60 / 70 / 90 %).
// - «nuevo»: posteriores al 1-12-2026 → redacción del RDL 29/2026 (15 % a 100 %). Pendiente de convalidación.

export type IrpfRegime = 'antiguo' | 'ley2023' | 'nuevo'

export interface IrpfInput {
  regime: IrpfRegime
  bigHolder: boolean
  /** Primer alquiler de la vivienda (no hay contrato anterior con el que comparar). */
  firstRental: boolean
  previousRent: number | null
  newRent: number | null
  /** Límite máximo del índice de referencia del precio (€/mes), si se conoce. */
  indexLimit: number | null
  tensionZone: boolean
  /** Inquilino de 18 a 35 años. */
  youngTenant: boolean
  /** Nuevo contrato con el mismo inquilino al acabar el plazo mínimo de 5 años o las prórrogas. */
  sameTenantAfterTerm: boolean
  /** Alquiler social a una Administración o entidad sin ánimo de lucro, o programa público con renta limitada. */
  socialRental: boolean
  /** Rehabilitación terminada en los dos años anteriores al contrato. */
  rehabilitated: boolean
}

export interface IrpfResult {
  pct: number
  reason: string
  /** Aviso cuando falta un dato que podría cambiar el resultado. */
  caveat?: string
  /** Variación de la renta respecto al contrato anterior, en %. */
  change?: number
}

const pctText = (x: number) => `${x > 0 ? '+' : ''}${x.toFixed(1).replace('.', ',')} %`

export function irpfReduction(i: IrpfInput): IrpfResult {
  const options: IrpfResult[] = []
  const best = () => options.reduce((a, b) => (b.pct > a.pct ? b : a), { pct: 0, reason: 'No se cumple ningún supuesto de reducción.' } as IrpfResult)

  if (i.regime === 'antiguo') return { pct: 60, reason: 'Contrato anterior al 26 de mayo de 2023: se mantiene la reducción del 60 %.' }

  if (i.regime === 'ley2023') {
    const lowered = !i.firstRental && i.previousRent && i.newRent && i.newRent < i.previousRent * 0.95
    if (i.tensionZone && lowered) options.push({ pct: 90, reason: 'Nuevo contrato en zona tensionada con la renta rebajada más de un 5 %.' })
    if (i.tensionZone && i.firstRental && i.youngTenant) options.push({ pct: 70, reason: 'Primer alquiler en zona tensionada a una persona de 18 a 35 años.' })
    if (i.socialRental) options.push({ pct: 70, reason: 'Alquiler social o programa público con renta limitada.' })
    if (i.rehabilitated) options.push({ pct: 60, reason: 'Vivienda rehabilitada en los dos años anteriores.' })
    options.push({ pct: 50, reason: 'Caso general de la Ley 12/2023.' })
    return best()
  }

  // Régimen nuevo (contratos posteriores al 1-12-2026)
  if (i.socialRental) options.push({ pct: 70, reason: 'Alquiler social o programa público con renta limitada.' })
  if (i.rehabilitated) options.push({ pct: 60, reason: 'Vivienda rehabilitada en los dos años anteriores.' })
  if (i.bigHolder) {
    const r = best()
    return r.pct ? r : { pct: 0, reason: 'Para los grandes tenedores el nuevo régimen solo prevé la reducción del alquiler social (70 %) y la de vivienda rehabilitada (60 %).' }
  }
  const rent = i.newRent ?? 0
  const belowIndex = i.indexLimit ? rent < i.indexLimit : null
  const ageZone = (): IrpfResult | null =>
    i.tensionZone && i.youngTenant ? { pct: 95, reason: 'Zona tensionada e inquilino de 18 a 35 años.' }
      : i.tensionZone ? { pct: 90, reason: 'Zona tensionada.' }
        : i.youngTenant ? { pct: 85, reason: 'Inquilino de 18 a 35 años.' }
          : null

  if (i.firstRental) {
    if (belowIndex) options.push({ pct: 100, reason: 'Primer alquiler con la renta por debajo del límite del índice de referencia.' })
    const az = ageZone()
    if (az) options.push({ ...az, reason: `Primer alquiler: ${az.reason.charAt(0).toLowerCase()}${az.reason.slice(1)}` })
    if (belowIndex === false) options.push({ pct: 50, reason: 'Primer alquiler con la renta igual o superior al límite del índice de referencia.' })
    const r = best()
    if (belowIndex === null && r.pct < 100) {
      return r.pct
        ? { ...r, caveat: 'Si la renta queda por debajo del límite del índice de referencia, la reducción sería del 100 %.' }
        : { pct: 50, reason: 'Primer alquiler (suponiendo una renta igual o superior al índice de referencia).', caveat: 'Si la renta queda por debajo del límite del índice de referencia, la reducción sería del 100 %. Indica el límite para afinar.' }
    }
    return r
  }

  if (!i.previousRent || !i.newRent) return { pct: 0, reason: 'Indica la renta del contrato anterior y la nueva.' }
  const change = ((i.newRent - i.previousRent) / i.previousRent) * 100
  if (change < -5) {
    if (i.sameTenantAfterTerm) options.push({ pct: 100, reason: 'Renta rebajada más de un 5 % y nuevo contrato con el mismo inquilino al acabar el plazo mínimo o las prórrogas.' })
    if (belowIndex) options.push({ pct: 100, reason: 'Renta rebajada más de un 5 % y por debajo del límite del índice de referencia.' })
    const az = ageZone()
    if (az) options.push({ ...az, reason: `Renta rebajada más de un 5 %: ${az.reason.charAt(0).toLowerCase()}${az.reason.slice(1)}` })
    options.push({ pct: 70, reason: 'Renta rebajada más de un 5 %.' })
    const r = best()
    return { ...r, change, ...(belowIndex === null && r.pct < 100 ? { caveat: 'Si la nueva renta queda por debajo del límite del índice de referencia, la reducción sería del 100 %.' } : {}) }
  }
  if (change <= 0) options.push({ pct: 50, reason: `La renta no sube respecto al contrato anterior (${pctText(change)}).` })
  else {
    const pct = change <= 5 ? 40 : change <= 10 ? 30 : change <= 15 ? 25 : change <= 20 ? 20 : 15
    options.push({ pct, reason: `La renta sube un ${pctText(change).slice(1)} respecto al contrato anterior.` })
  }
  return { ...best(), change }
}
