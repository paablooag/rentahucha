export interface FeeTier {
  label: string
  min: number
  max: number
  rate: number
}

// Cuota de gestión sobre la renta mensual, por número de pisos del propietario.
export const FEE_TIERS: FeeTier[] = [
  { label: '1 piso', min: 1, max: 1, rate: 5 },
  { label: '2–3 pisos', min: 2, max: 3, rate: 4.5 },
  { label: '4–9 pisos', min: 4, max: 9, rate: 4 },
  { label: '10 o más', min: 10, max: Infinity, rate: 3.5 },
]

export function feeRateFor(units: number): number {
  const n = Math.max(1, Math.floor(units))
  return (FEE_TIERS.find(t => n >= t.min && n <= t.max) ?? FEE_TIERS[0]!).rate
}

export function calcFees(rent: number, units: number) {
  const rate = feeRateFor(units)
  const perUnit = (rent * rate) / 100
  return {
    rate,
    perUnit,
    netPerUnit: rent - perUnit,
    monthlyTotal: perUnit * Math.max(1, units),
    yearlyTotal: perUnit * Math.max(1, units) * 12,
  }
}
