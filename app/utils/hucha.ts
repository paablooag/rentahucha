// Parámetros de la hucha de garantía-ahorro. Hipótesis del plan, pendientes de validación jurídica.
export const HUCHA = {
  defaultPct: 4,
  minPct: 2,
  maxPct: 6,
  bonusPct: 10,
  // Tope legal de garantía adicional (LAU art. 36.5) en contratos de vivienda de duración legal.
  capMonths: 2,
} as const

export interface HuchaResult {
  monthly: number
  cap: number
  monthsToCap: number
  balance: number
  bonus: number
  payout: number
}

export function huchaBalanceAt(rent: number, pct: number, month: number): number {
  const monthly = (rent * pct) / 100
  return Math.min(monthly * month, rent * HUCHA.capMonths)
}

export function calcHucha(rent: number, pct: number, months: number): HuchaResult {
  const monthly = (rent * pct) / 100
  const cap = rent * HUCHA.capMonths
  const balance = huchaBalanceAt(rent, pct, months)
  const bonus = (balance * HUCHA.bonusPct) / 100
  return {
    monthly,
    cap,
    monthsToCap: monthly > 0 ? Math.ceil(cap / monthly) : 0,
    balance,
    bonus,
    payout: balance + bonus,
  }
}

// Lo que se paga al firmar: primer mes + fianza legal + garantía adicional.
export function entryCost(rent: number) {
  return {
    traditional: { firstMonth: rent, deposit: rent, extraGuarantee: rent * HUCHA.capMonths, total: rent * (2 + HUCHA.capMonths) },
    ours: { firstMonth: rent, deposit: rent, extraGuarantee: 0, total: rent * 2 },
  }
}
