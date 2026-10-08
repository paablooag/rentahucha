// Datos ficticios para las demos de los paneles y del pasaporte.

export type PaymentStatus = 'puntual' | 'retraso' | 'pendiente' | 'impago'

export interface Payment {
  month: string
  amount: number
  status: PaymentStatus
  paidOn?: string
}

export interface Incident {
  id: number
  title: string
  category: string
  date: string
  status: 'abierta' | 'en curso' | 'resuelta'
}

export interface Passport {
  holder: string
  initials: string
  code: string
  memberSince: string
  verified: { identity: boolean; income: boolean; employment: boolean }
  affordableRent: number
  payments: { onTime: number; total: number }
  hucha: { balance: number; cap: number }
  exitReports: number
}

const MONTHS = ['nov 2025', 'dic 2025', 'ene 2026', 'feb 2026', 'mar 2026', 'abr 2026', 'may 2026', 'jun 2026', 'jul 2026', 'ago 2026', 'sep 2026', 'oct 2026']

export const tenantDemo = {
  name: 'Lucía Martín',
  flat: 'C/ de Ruzafa 24, 3ºB · Valencia',
  rent: 850,
  huchaPct: 4,
  contractStart: '2025-11-01',
  contractMonths: 36,
  nextPaymentDate: '1 de noviembre',
  payments: MONTHS.map<Payment>((month, i) => ({
    month,
    amount: 884,
    status: i === MONTHS.length - 1 ? 'pendiente' : 'puntual',
    paidOn: i === MONTHS.length - 1 ? undefined : `01/${String(((i + 10) % 12) + 1).padStart(2, '0')}`,
  })),
  incidents: [
    { id: 3, title: 'Grifo de la cocina gotea', category: 'Fontanería', date: '2026-09-18', status: 'resuelta' },
    { id: 2, title: 'Persiana del dormitorio atascada', category: 'Carpintería', date: '2026-04-02', status: 'resuelta' },
  ] as Incident[],
}

export const passportDemo: Passport = {
  holder: 'Lucía M.',
  initials: 'LM',
  code: 'RH-7Q4K-29',
  memberSince: 'noviembre de 2025',
  verified: { identity: true, income: true, employment: true },
  affordableRent: 950,
  payments: { onTime: 11, total: 11 },
  hucha: { balance: 374, cap: 1700 },
  exitReports: 0,
}

export interface OwnerFlat {
  id: number
  address: string
  rent: number
  tenant: string | null
  status: 'al día' | 'retraso' | 'buscando inquilino'
  hucha: number
  lastPayment: string | null
}

export interface Candidate {
  id: number
  initials: string
  affordableRent: number
  onTime: number
  total: number
  huchaTransferable: number
  employment: string
  moveIn: string
  match: 'alto' | 'medio'
}

export const ownerDemo = {
  name: 'Antonio',
  flats: [
    { id: 1, address: 'C/ de Ruzafa 24, 3ºB · Valencia', rent: 850, tenant: 'Lucía M.', status: 'al día', hucha: 374, lastPayment: '01/10/2026' },
    { id: 2, address: 'Av. de la Constitución 11, 1ºA · Sevilla', rent: 720, tenant: 'Javier R.', status: 'retraso', hucha: 547, lastPayment: '01/09/2026' },
    { id: 3, address: 'C/ de Embajadores 40, 5ºC · Madrid', rent: 690, tenant: null, status: 'buscando inquilino', hucha: 0, lastPayment: null },
  ] as OwnerFlat[],
  candidates: [
    { id: 1, initials: 'M.G.', affordableRent: 980, onTime: 24, total: 24, huchaTransferable: 816, employment: 'Contrato indefinido', moveIn: '1 nov', match: 'alto' },
    { id: 2, initials: 'P.S.', affordableRent: 760, onTime: 0, total: 0, huchaTransferable: 0, employment: 'Autónoma · 3 años', moveIn: '15 nov', match: 'alto' },
    { id: 3, initials: 'D.L.', affordableRent: 720, onTime: 11, total: 12, huchaTransferable: 310, employment: 'Contrato temporal', moveIn: '1 dic', match: 'medio' },
  ] as Candidate[],
  incidents: [
    { id: 7, title: 'Humedad en el baño', category: 'Humedades', date: '2026-10-03', status: 'en curso' },
    { id: 3, title: 'Grifo de la cocina gotea', category: 'Fontanería', date: '2026-09-18', status: 'resuelta' },
  ] as Incident[],
}
