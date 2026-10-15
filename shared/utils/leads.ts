// Formulario de interesados: opciones y validación compartidas por la web (errores en vivo)
// y el servidor (validación real). Solo se piden datos necesarios para avisar del lanzamiento
// y medir el interés (minimización, RGPD art. 5.1.c): nada de DNI, ingresos ni documentos.

export type LeadRole = 'propietario' | 'inquilino'

export const LEAD_OPTIONS = {
  units: ['1 piso', '2–3 pisos', '4–9 pisos', '10 o más'],
  ownerRent: ['Menos de 600 €', '600–900 €', '900–1.200 €', 'Más de 1.200 €'],
  flatStatus: ['Vacío y listo para alquilar', 'Alquilado ahora mismo', 'Lo alquilaré más adelante'],
  propertyType: ['Piso', 'Ático', 'Estudio o loft', 'Dúplex', 'Casa o chalet'],
  bedrooms: ['Estudio', '1', '2', '3', '4', '5 o más'],
  bathrooms: ['1', '2', '3 o más'],
  condition: ['Reformado recientemente', 'En buen estado', 'Necesita alguna reforma'],
  furnished: ['Amueblado', 'Sin amueblar', 'Parcialmente amueblado'],
  features: ['Ascensor', 'Terraza o balcón', 'Garaje', 'Trastero', 'Aire acondicionado', 'Calefacción', 'Admite mascotas'],
  stayPref: ['Larga duración', 'Temporada (estudios o trabajo)', 'Me da igual'],
  // Inquilino
  ageRange: ['18–24', '25–29', '30–34', '35–44', '45–54', '55 o más'],
  people: ['1', '2', '3', '4', '5 o más'],
  wantedBedrooms: ['Estudio', '1', '2', '3', '4 o más'],
  wantedBathrooms: ['1', '2 o más'],
  pets: ['No', 'Perro', 'Gato', 'Otra mascota'],
  stayType: ['Vivienda habitual (larga duración)', 'Temporada (estudios o trabajo)'],
  mustHaves: ['Amueblado', 'Ascensor', 'Terraza o balcón', 'Garaje', 'Aire acondicionado', 'Calefacción'],
  ownerTiming: ['Cuanto antes', 'En los próximos 3 meses', 'En 6 meses o más', 'Solo quiero informarme'],
  ownerInterest: ['Renta garantizada', 'Selección del inquilino', 'Cobros e incidencias', 'La hucha del inquilino'],
  tenantTiming: ['Este mes', 'En 1–3 meses', 'En 3–6 meses', 'Solo quiero informarme'],
  household: ['Solo/a', 'En pareja', 'Compartiendo piso', 'Con familia'],
  employment: ['Contrato indefinido', 'Contrato temporal', 'Autónomo/a', 'Estudiante con ingresos o beca', 'Funcionario/a', 'Otra situación'],
  tenantInterest: ['Alquilar sin aval', 'Entrar con menos dinero', 'Ahorrar con la hucha', 'Pasaporte de buen inquilino'],
} as const

export interface LeadData {
  role: LeadRole
  name: string
  email: string
  phone: string
  city: string
  // Propietario
  units?: string
  rentRange?: string
  flatStatus?: string
  propertyType?: string
  bedrooms?: string
  bathrooms?: string
  sizeM2?: number
  condition?: string
  furnished?: string
  features?: string[]
  stayPref?: string
  // Inquilino
  maxRent?: number
  ageRange?: string
  people?: string
  wantedBedrooms?: string
  wantedBathrooms?: string
  pets?: string
  stayType?: string
  mustHaves?: string[]
  household?: string
  employment?: string
  // Ambos
  timing: string
  interests: string[]
  comments: string
  consentNews: boolean
}

export type LeadErrors = Partial<Record<keyof LeadData | 'consentContact' | 'adult', string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_RE = /^\+?[\d\s().-]{9,20}$/

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '')
const oneOf = (v: unknown, list: readonly string[]) => (typeof v === 'string' && list.includes(v) ? v : '')

export function validateLead(input: Record<string, unknown>): { ok: true; data: LeadData } | { ok: false; errors: LeadErrors } {
  const errors: LeadErrors = {}
  const role = input.role === 'propietario' || input.role === 'inquilino' ? input.role : null
  if (!role) return { ok: false, errors: { role: 'Elige si eres propietario o inquilino.' } }

  const name = str(input.name, 80)
  const email = str(input.email, 120).toLowerCase()
  const phone = str(input.phone, 20)
  const city = str(input.city, 60)
  const comments = str(input.comments, 500)

  if (name.length < 2) errors.name = 'Escribe tu nombre.'
  if (!EMAIL_RE.test(email)) errors.email = 'Revisa el correo: no parece válido.'
  if (phone && !PHONE_RE.test(phone)) errors.phone = 'Revisa el teléfono o déjalo en blanco.'
  if (city.length < 2) errors.city = role === 'propietario' ? '¿En qué ciudad está el piso?' : '¿En qué ciudad buscas?'

  const interestList: readonly string[] = role === 'propietario' ? LEAD_OPTIONS.ownerInterest : LEAD_OPTIONS.tenantInterest
  const interests = Array.isArray(input.interests) ? input.interests.filter((i): i is string => typeof i === 'string' && interestList.includes(i)) : []

  const data: LeadData = { role, name, email, phone, city, timing: '', interests, comments, consentNews: input.consentNews === true }

  if (role === 'propietario') {
    data.units = oneOf(input.units, LEAD_OPTIONS.units)
    data.rentRange = oneOf(input.rentRange, LEAD_OPTIONS.ownerRent)
    data.flatStatus = oneOf(input.flatStatus, LEAD_OPTIONS.flatStatus)
    data.timing = oneOf(input.timing, LEAD_OPTIONS.ownerTiming)
    if (!data.units) errors.units = 'Indica cuántos pisos tienes.'
    if (!data.rentRange) errors.rentRange = 'Elige un rango de renta.'
    if (!data.flatStatus) errors.flatStatus = 'Cuéntanos cómo está el piso ahora.'
    data.propertyType = oneOf(input.propertyType, LEAD_OPTIONS.propertyType)
    data.bedrooms = oneOf(input.bedrooms, LEAD_OPTIONS.bedrooms)
    data.bathrooms = oneOf(input.bathrooms, LEAD_OPTIONS.bathrooms)
    data.condition = oneOf(input.condition, LEAD_OPTIONS.condition)
    data.furnished = oneOf(input.furnished, LEAD_OPTIONS.furnished)
    data.features = Array.isArray(input.features) ? input.features.filter((f): f is string => typeof f === 'string' && (LEAD_OPTIONS.features as readonly string[]).includes(f)) : []
    const size = Number(input.sizeM2)
    data.sizeM2 = input.sizeM2 === undefined || input.sizeM2 === null || input.sizeM2 === '' ? undefined : Math.round(size)
    if (!data.propertyType) errors.propertyType = 'Elige el tipo de vivienda.'
    if (!data.bedrooms) errors.bedrooms = '¿Cuántas habitaciones tiene?'
    if (!data.bathrooms) errors.bathrooms = '¿Cuántos baños tiene?'
    if (!data.condition) errors.condition = 'Cuéntanos en qué estado está.'
    data.stayPref = oneOf(input.stayPref, LEAD_OPTIONS.stayPref)
    if (data.sizeM2 !== undefined && (!Number.isFinite(data.sizeM2) || data.sizeM2 < 10 || data.sizeM2 > 2000)) errors.sizeM2 = 'Indica entre 10 y 2.000 m² o déjalo en blanco.'
  }
  else {
    const maxRent = Number(input.maxRent)
    data.maxRent = Number.isFinite(maxRent) ? Math.round(maxRent) : 0
    data.household = oneOf(input.household, LEAD_OPTIONS.household)
    data.employment = oneOf(input.employment, LEAD_OPTIONS.employment)
    data.timing = oneOf(input.timing, LEAD_OPTIONS.tenantTiming)
    if (!data.maxRent || data.maxRent < 150 || data.maxRent > 6000) errors.maxRent = 'Indica una renta máxima entre 150 € y 6.000 €.'
    data.ageRange = oneOf(input.ageRange, LEAD_OPTIONS.ageRange)
    data.people = oneOf(input.people, LEAD_OPTIONS.people)
    data.wantedBedrooms = oneOf(input.wantedBedrooms, LEAD_OPTIONS.wantedBedrooms)
    data.wantedBathrooms = oneOf(input.wantedBathrooms, LEAD_OPTIONS.wantedBathrooms)
    data.pets = oneOf(input.pets, LEAD_OPTIONS.pets)
    data.stayType = oneOf(input.stayType, LEAD_OPTIONS.stayType)
    data.mustHaves = Array.isArray(input.mustHaves) ? input.mustHaves.filter((f): f is string => typeof f === 'string' && (LEAD_OPTIONS.mustHaves as readonly string[]).includes(f)) : []
    if (!data.ageRange) errors.ageRange = 'Indica tu edad.'
    if (!data.people) errors.people = '¿Cuántas personas viviréis?'
    if (!data.wantedBedrooms) errors.wantedBedrooms = '¿Cuántas habitaciones necesitas?'
    if (!data.wantedBathrooms) errors.wantedBathrooms = '¿Cuántos baños necesitas?'
  }
  if (!data.timing) errors.timing = '¿Cuándo te vendría bien?'

  // Consentimiento informado e inequívoco (RGPD art. 7) y mayoría de edad para contratar un alquiler.
  if (input.consentContact !== true) errors.consentContact = 'Necesitamos tu permiso para guardar tus datos y escribirte.'
  if (input.adult !== true) errors.adult = 'Tienes que ser mayor de edad.'

  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, data }
}

export function validateNewsletter(input: Record<string, unknown>): { ok: true; email: string } | { ok: false; error: string } {
  const email = str(input.email, 120).toLowerCase()
  if (!EMAIL_RE.test(email)) return { ok: false, error: 'Revisa el correo: no parece válido.' }
  if (input.consent !== true) return { ok: false, error: 'Marca la casilla para poder enviarte correos.' }
  return { ok: true, email }
}
