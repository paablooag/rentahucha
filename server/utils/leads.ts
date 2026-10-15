import type { LeadData } from '#shared/utils/leads'

export interface StoredLead extends LeadData {
  id: string
  createdAt: string
  updatedAt: string
  consentAt: string
  consentText: string
}

export interface StoredSubscriber {
  id: string
  email: string
  createdAt: string
  consentAt: string
}

// Se guarda junto a cada alta para poder demostrar qué consentimiento se dio (RGPD art. 7.1).
export const CONSENT_TEXT = 'Acepto que RentaHucha guarde estos datos para avisarme del lanzamiento y conocer el interés en el servicio, según la política de privacidad.'

// Campo del formulario → columna de la tabla leads. Los arrays se guardan como text[].
const COLUMNS: [keyof LeadData, string, 'text[]' | 'integer' | 'boolean' | 'text'][] = [
  ['role', 'role', 'text'],
  ['name', 'name', 'text'],
  ['email', 'email', 'text'],
  ['phone', 'phone', 'text'],
  ['city', 'city', 'text'],
  ['timing', 'timing', 'text'],
  ['interests', 'interests', 'text[]'],
  ['comments', 'comments', 'text'],
  ['consentNews', 'consent_news', 'boolean'],
  ['units', 'units', 'text'],
  ['rentRange', 'rent_range', 'text'],
  ['flatStatus', 'flat_status', 'text'],
  ['propertyType', 'property_type', 'text'],
  ['bedrooms', 'bedrooms', 'text'],
  ['bathrooms', 'bathrooms', 'text'],
  ['sizeM2', 'size_m2', 'integer'],
  ['condition', 'condition', 'text'],
  ['furnished', 'furnished', 'text'],
  ['features', 'features', 'text[]'],
  ['stayPref', 'stay_pref', 'text'],
  ['maxRent', 'max_rent', 'integer'],
  ['ageRange', 'age_range', 'text'],
  ['people', 'people', 'text'],
  ['wantedBedrooms', 'wanted_bedrooms', 'text'],
  ['wantedBathrooms', 'wanted_bathrooms', 'text'],
  ['household', 'household', 'text'],
  ['employment', 'employment', 'text'],
  ['pets', 'pets', 'text'],
  ['stayType', 'stay_type', 'text'],
  ['mustHaves', 'must_haves', 'text[]'],
]

// Los textos vacíos se guardan como NULL (más fácil de analizar en SQL); los arrays vacíos, como '{}'.
function value(lead: LeadData, key: keyof LeadData, type: string) {
  const v = lead[key]
  if (type === 'text[]') return Array.isArray(v) ? v : []
  if (v === '' && key !== 'phone' && key !== 'comments') return null
  return v ?? null
}

// Alta o actualización por (email, perfil): si alguien se apunta dos veces, se actualizan sus datos.
export async function upsertLead(lead: LeadData): Promise<{ updated: boolean }> {
  const cols = COLUMNS.map(c => c[1])
  const params = COLUMNS.map(([k, , t]) => value(lead, k, t))
  const placeholders = COLUMNS.map(([, , t], i) => `$${i + 1}::${t}`)
  const n = COLUMNS.length
  const updates = cols.filter(c => c !== 'email' && c !== 'role').map(c => `${c} = EXCLUDED.${c}`)
  const row = await queryOne<{ inserted: boolean }>(
    `INSERT INTO leads (${cols.join(', ')}, consent_at, consent_text)
     VALUES (${placeholders.join(', ')}, now(), $${n + 1})
     ON CONFLICT (email, role) DO UPDATE SET ${updates.join(', ')}, consent_at = now(), consent_text = EXCLUDED.consent_text, updated_at = now()
     RETURNING (xmax = 0) AS inserted`,
    [...params, CONSENT_TEXT],
  )
  return { updated: !row?.inserted }
}

export async function listLeads(): Promise<StoredLead[]> {
  const rows = await query<StoredLead>('SELECT * FROM leads ORDER BY created_at DESC')
  // NULL → valores vacíos para que la web reciba siempre el mismo formato.
  return rows.map(l => Object.fromEntries(Object.entries(l).map(([k, v]) => [k, v ?? undefined])) as StoredLead)
}

export async function listSubscribers(): Promise<StoredSubscriber[]> {
  return query<StoredSubscriber>('SELECT id, email, created_at, consent_at FROM newsletter_subscribers ORDER BY created_at DESC')
}
