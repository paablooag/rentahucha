// useGrouping 'always': en es-ES los números de 4 cifras no se agrupan por defecto (1346 € → 1.346 €).
const euro = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0, useGrouping: 'always' })
const euroCents = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: 'always' })
const percent = new Intl.NumberFormat('es-ES', { maximumFractionDigits: 1 })

export function formatEuro(value: number, cents = false): string {
  return (cents ? euroCents : euro).format(Number.isFinite(value) ? value : 0)
}

export function formatPercent(value: number): string {
  return `${percent.format(value)} %`
}
