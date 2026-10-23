import { randomBytes } from 'node:crypto'

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

export const getIrav = defineCachedFunction(async () => {
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
}, { maxAge: 6 * 60 * 60, name: 'irav', getKey: () => 'ultimos' })

const MONTHS = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
const label = (m: IravMonth) => `${MONTHS[m.month - 1]} de ${m.year}`
const pct = (v: number) => `${v.toFixed(2).replace('.', ',')} %`
const period = (m: IravMonth) => `${m.year}-${String(m.month).padStart(2, '0')}`

// Aviso mensual del IRAV: quien se apunta (newsletter con origen «irav») recibe un correo cada vez que el INE publica
// un dato nuevo, con la subida máxima. Baja en un clic con el enlace de cada correo (/baja).
// Límite extraordinario del Real Decreto-ley 29/2026 (disp. final 6.ª), pendiente de convalidación: revisar tras el 12-N.
export function iravMail(m: IravMonth, token: string, welcome: boolean) {
  const cap = Math.min(m.value, 2)
  const example = (900 * cap / 100).toFixed(2).replace('.', ',')
  return mailLayout({
    preheader: `IRAV de ${label(m)}: ${pct(m.value)}. Subida máxima sin nuevo acuerdo: ${pct(cap)}.`,
    eyebrow: welcome ? 'Aviso del IRAV' : 'Nuevo IRAV del INE',
    title: welcome ? 'Te avisaremos de cada IRAV' : `IRAV de ${label(m)}: ${pct(m.value)}`,
    paragraphs: [
      welcome
        ? `Cada mes, cuando el INE publique el índice, te enviaremos el dato y cuánto puedes subir el alquiler. El último publicado es el de ${label(m)}.`
        : `El INE ha publicado el IRAV de ${label(m)}. Es el que se aplica a los contratos que cumplen año a partir de ahora.`,
      'Hasta el 31-12-2027, sin un nuevo acuerdo con el inquilino, la actualización no puede pasar del 2 % ni de la variación del IRAV, y no hay subida si la renta supera el límite del índice de referencia (Real Decreto-ley 29/2026, pendiente de convalidación). Si el contrato no prevé actualizar la renta, no se actualiza.',
    ],
    highlight: { label: `IRAV de ${label(m)}`, text: `Variación anual: ${pct(m.value)}\nSubida máxima sin nuevo acuerdo: ${pct(cap)}\nCon 900 € de renta: hasta ${example} € más al mes` },
    button: { label: 'Calcula la subida de tu contrato', url: siteUrl('/herramientas/subida-alquiler-irav?utm_source=correo&utm_campaign=irav') },
    after: [
      `¿No sabes si tu renta supera el índice de referencia? Te lo calculamos gratis, con pisos comparables de tu zona: ${siteUrl('/valoracion-alquiler?utm_source=correo&utm_campaign=irav')}`,
      `Para dejar de recibir estos correos: ${siteUrl(`/baja?token=${token}`)}`,
    ],
    footer: 'Recibes este correo porque te apuntaste al aviso del IRAV en rentahucha.es. Fuente: INE, Índice de Referencia de Arrendamientos de Vivienda.',
  })
}

/** Alta en el aviso del IRAV (queda también en la newsletter). Si ya estaba en el aviso, no hace nada. */
export async function subscribeIrav(email: string) {
  const { months } = await getIrav()
  const latest = months[0]!
  const existing = await queryOne<{ token: string | null; iravPeriod: string | null }>('SELECT token, irav_period FROM newsletter_subscribers WHERE email = $1', [email])
  if (existing?.iravPeriod) return { activated: false }
  const token = existing?.token ?? randomBytes(24).toString('base64url')
  if (existing) await query('UPDATE newsletter_subscribers SET token = $1, irav_period = $2 WHERE email = $3', [token, period(latest), email])
  else await query(`INSERT INTO newsletter_subscribers (email, source, token, irav_period) VALUES ($1, 'irav', $2, $3) ON CONFLICT (email) DO NOTHING`, [email, token, period(latest)])
  sendMailLater({ to: email, subject: `Aviso del IRAV activado: ${label(latest)}, ${pct(latest.value)}`, ...iravMail(latest, token, true) })
  return { activated: true }
}

/** Envía el IRAV nuevo a quien aún no lo ha recibido. Se llama cada hora desde un plugin; solo con datos del INE. */
export async function sendIravAlerts() {
  const { months, source } = await getIrav()
  const latest = months[0]
  if (source !== 'ine' || !latest) return 0
  const p = period(latest)
  const subs = await query<{ id: string; email: string; token: string }>(
    'SELECT id, email, token FROM newsletter_subscribers WHERE irav_period < $1 AND token IS NOT NULL LIMIT 200',
    [p],
  )
  let sent = 0
  for (const s of subs) {
    await query('UPDATE newsletter_subscribers SET irav_period = $1 WHERE id = $2', [p, s.id])
    if (await sendMail({ to: s.email, subject: `IRAV de ${label(latest)}: ${pct(latest.value)}`, ...iravMail(latest, s.token, false) })) sent++
  }
  return sent
}
