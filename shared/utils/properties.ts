// Pisos publicados por propietarios: opciones, estados y validación compartidos por la web y el servidor.

export const PROPERTY_OPTIONS = {
  propertyType: ['Piso', 'Ático', 'Estudio o loft', 'Dúplex', 'Casa o chalet'],
  furnished: ['Amueblado', 'Sin amueblar', 'Parcialmente amueblado'],
  features: ['Ascensor', 'Terraza o balcón', 'Garaje', 'Trastero', 'Aire acondicionado', 'Calefacción', 'Admite mascotas', 'Piscina', 'Exterior'],
  // La etiqueta energética es obligatoria en los anuncios de alquiler (RD 390/2021).
  energyRating: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'En trámite'],
  stayType: ['Vivienda habitual (larga duración)', 'Temporada (estudios o trabajo)'],
} as const

export const PROPERTY_STATUS = {
  borrador: 'Borrador',
  revision: 'En revisión',
  publicado: 'Publicado',
  rechazado: 'Necesita cambios',
  pausado: 'Pausado',
  alquilado: 'Alquilado',
} as const
export type PropertyStatus = keyof typeof PROPERTY_STATUS

export const MAX_PHOTOS = 12
export const MAX_PHOTO_BYTES = 2.5 * 1024 * 1024

export interface PropertyInput {
  title: string
  city: string
  district: string
  address: string
  propertyType: string
  rent: number
  expensesIncl: boolean
  sizeM2: number | null
  bedrooms: number
  bathrooms: number
  floor: string
  furnished: string
  features: string[]
  energyRating: string
  stayType: string
  availableFrom: string | null
  description: string
}

/** Piso tal como lo ve su propietario. La dirección exacta nunca se muestra en público. */
export interface Property extends PropertyInput {
  id: string
  status: PropertyStatus
  reviewNote: string
  photos: { id: string; width: number | null; height: number | null }[]
  publishedAt: string | null
  createdAt: string
  updatedAt: string
  /** Solo en la vista del propietario. */
  views30?: number
  conversations?: number
  favorites?: number
}

export type PublicProperty = Omit<Property, 'address' | 'reviewNote' | 'views30' | 'conversations' | 'favorites'> & { ownerName: string; ownerIsAgency?: boolean }

export type PropertyErrors = Partial<Record<keyof PropertyInput, string>>

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().replace(/\s+/g, ' ').slice(0, max) : '')
const oneOf = (v: unknown, list: readonly string[]) => (typeof v === 'string' && list.includes(v) ? v : '')
const int = (v: unknown) => (v === '' || v === null || v === undefined ? NaN : Math.round(Number(v)))

export function validateProperty(input: Record<string, unknown>): { ok: true; data: PropertyInput } | { ok: false; errors: PropertyErrors } {
  const errors: PropertyErrors = {}
  const sizeRaw = int(input.sizeM2)
  const data: PropertyInput = {
    title: str(input.title, 90),
    city: str(input.city, 60),
    district: str(input.district, 60),
    address: str(input.address, 160),
    propertyType: oneOf(input.propertyType, PROPERTY_OPTIONS.propertyType),
    rent: int(input.rent),
    expensesIncl: input.expensesIncl === true,
    sizeM2: Number.isFinite(sizeRaw) ? sizeRaw : null,
    bedrooms: int(input.bedrooms),
    bathrooms: int(input.bathrooms),
    floor: str(input.floor, 30),
    furnished: oneOf(input.furnished, PROPERTY_OPTIONS.furnished),
    features: Array.isArray(input.features) ? input.features.filter((f): f is string => PROPERTY_OPTIONS.features.includes(f as never)) : [],
    energyRating: oneOf(input.energyRating, PROPERTY_OPTIONS.energyRating),
    stayType: oneOf(input.stayType, PROPERTY_OPTIONS.stayType),
    availableFrom: typeof input.availableFrom === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(input.availableFrom) ? input.availableFrom : null,
    // En la descripción se respetan los saltos de línea.
    description: typeof input.description === 'string' ? input.description.trim().replace(/\n{3,}/g, '\n\n').slice(0, 3000) : '',
  }

  if (data.title.length < 10) errors.title = 'Escribe un título de al menos 10 caracteres (p. ej. «Piso luminoso de 2 habitaciones en Ruzafa»).'
  if (data.city.length < 2) errors.city = '¿En qué ciudad está?'
  if (!data.propertyType) errors.propertyType = 'Elige el tipo de vivienda.'
  if (!Number.isFinite(data.rent) || data.rent < 100 || data.rent > 20000) errors.rent = 'Indica la renta mensual en euros.'
  if (data.sizeM2 !== null && (data.sizeM2 < 10 || data.sizeM2 > 2000)) errors.sizeM2 = 'Revisa los metros cuadrados.'
  if (!Number.isFinite(data.bedrooms) || data.bedrooms < 0 || data.bedrooms > 20) errors.bedrooms = '¿Cuántas habitaciones tiene? (0 si es un estudio)'
  if (!Number.isFinite(data.bathrooms) || data.bathrooms < 1 || data.bathrooms > 10) errors.bathrooms = '¿Cuántos baños tiene?'
  if (!data.furnished) errors.furnished = '¿Está amueblado?'
  if (!data.stayType) errors.stayType = 'Elige el tipo de alquiler.'

  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, data }
}

/** Lo que falta para poder enviar el anuncio a revisión (además de un formulario válido). */
export function publishBlockers(p: Pick<Property, 'energyRating' | 'description' | 'photos'>): string[] {
  const out: string[] = []
  if (!p.energyRating) out.push('La calificación energética (es obligatoria en los anuncios; si está en trámite, indícalo).')
  if (p.description.length < 80) out.push('Una descripción de al menos 80 caracteres.')
  if (p.photos.length < 3) out.push('Al menos 3 fotos.')
  return out
}

// Cuentas de usuario
export type UserRole = 'propietario' | 'inquilino'
export interface PublicUser { id: string; role: UserRole; name: string; email: string; phone: string; isAgency: boolean; company: string }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
export function validateSignup(input: Record<string, unknown>): { ok: true; data: { role: UserRole; name: string; email: string; phone: string; password: string; isAgency: boolean; company: string } } | { ok: false; errors: Record<string, string> } {
  const errors: Record<string, string> = {}
  // «inmobiliaria» es una cuenta de propietario con nombre comercial.
  const isAgency = input.role === 'inmobiliaria'
  const role = input.role === 'inquilino' ? 'inquilino' : input.role === 'propietario' || isAgency ? 'propietario' : null
  const company = isAgency ? str(input.company, 100) : ''
  if (isAgency && company.length < 2) errors.company = 'Escribe el nombre comercial de la inmobiliaria.'
  const name = str(input.name, 80)
  const email = str(input.email, 120).toLowerCase()
  const phone = str(input.phone, 30)
  const password = typeof input.password === 'string' ? input.password : ''
  if (!role) errors.role = 'Elige si eres propietario o buscas piso.'
  if (name.length < 2) errors.name = 'Escribe tu nombre.'
  if (!EMAIL_RE.test(email)) errors.email = 'Revisa el correo: no parece válido.'
  if (password.length < 10) errors.password = 'La contraseña debe tener al menos 10 caracteres.'
  else if (password.length > 200) errors.password = 'La contraseña es demasiado larga.'
  if (input.consent !== true) errors.consent = 'Necesitamos que aceptes las condiciones y la política de privacidad.'
  if (input.adult !== true) errors.adult = 'Tienes que ser mayor de edad.'
  return Object.keys(errors).length || !role ? { ok: false, errors } : { ok: true, data: { role, name, email, phone, password, isAgency, company } }
}

// Perfil del inquilino: lo que cuenta de sí mismo (declarado, sin verificar). Solo lo ven los propietarios a los que escribe.
export const TENANT_OPTIONS = {
  employment: ['Contrato indefinido', 'Contrato temporal', 'Autónomo/a', 'Funcionario/a', 'Estudiante', 'Pensionista', 'Otra situación'],
  // Ingresos netos mensuales del hogar.
  income: ['Menos de 1.000 €', '1.000–1.500 €', '1.500–2.000 €', '2.000–3.000 €', '3.000–4.500 €', 'Más de 4.500 €'],
  household: ['Solo/a', 'En pareja', 'Familia con hijos', 'Compartiendo piso'],
  people: ['1', '2', '3', '4', '5 o más'],
  pets: ['No', 'Perro', 'Gato', 'Otra mascota'],
  stay: ['Menos de 1 año', '1–3 años', 'Más de 3 años'],
} as const

// Punto medio aproximado de cada tramo, para orientar al propietario (renta / ingresos).
export const INCOME_MIDPOINT: Record<string, number> = {
  'Menos de 1.000 €': 850, '1.000–1.500 €': 1250, '1.500–2.000 €': 1750, '2.000–3.000 €': 2500, '3.000–4.500 €': 3750, 'Más de 4.500 €': 5000,
}

export interface TenantProfile {
  employment: string
  income: string
  household: string
  people: string
  pets: string
  moveDate: string | null
  stay: string
  about: string
}

export function validateTenantProfile(input: Record<string, unknown>): TenantProfile {
  return {
    employment: oneOf(input.employment, TENANT_OPTIONS.employment),
    income: oneOf(input.income, TENANT_OPTIONS.income),
    household: oneOf(input.household, TENANT_OPTIONS.household),
    people: oneOf(input.people, TENANT_OPTIONS.people),
    pets: oneOf(input.pets, TENANT_OPTIONS.pets),
    moveDate: typeof input.moveDate === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(input.moveDate) ? input.moveDate : null,
    stay: oneOf(input.stay, TENANT_OPTIONS.stay),
    about: typeof input.about === 'string' ? input.about.trim().slice(0, 1000) : '',
  }
}

export const profileCompleteness = (p: TenantProfile | null) => {
  if (!p) return 0
  const keys: (keyof TenantProfile)[] = ['employment', 'income', 'household', 'people', 'pets', 'moveDate', 'stay', 'about']
  return Math.round((keys.filter(k => p[k]).length / keys.length) * 100)
}

export const REPORT_REASONS = ['Me pide dinero antes de la visita', 'Spam o publicidad', 'Acoso o mensajes ofensivos', 'Anuncio falso', 'Otro motivo'] as const

/** Máximo de pisos por cuenta (las inmobiliarias gestionan más). */
export const maxProperties = (u: { isAgency?: boolean }) => (u.isAgency ? 300 : 50)
