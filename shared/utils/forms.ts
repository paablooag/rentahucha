// Formularios sueltos de la web (valoración del alquiler y encuesta): opciones y validación compartidas.

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const text = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().replace(/\s+/g, ' ').slice(0, max) : '')
const pick = (v: unknown, list: readonly string[]) => (typeof v === 'string' && list.includes(v) ? v : '')
const picks = (v: unknown, list: readonly string[], max: number) => (Array.isArray(v) ? [...new Set(v.filter((x): x is string => list.includes(x as string)))].slice(0, max) : [])

// ── Valoración del alquiler ──────────────────────────────────────────────
export const VALUATION_OPTIONS = {
  propertyType: ['Piso', 'Ático', 'Estudio o loft', 'Dúplex', 'Casa o chalet'],
  bedrooms: ['Estudio', '1', '2', '3', '4', '5 o más'],
  bathrooms: ['1', '2', '3 o más'],
  condition: ['Reformado recientemente', 'En buen estado', 'Necesita alguna reforma'],
  furnished: ['Amueblado', 'Sin amueblar', 'Parcialmente amueblado'],
  features: ['Ascensor', 'Terraza o balcón', 'Garaje', 'Trastero', 'Aire acondicionado', 'Calefacción', 'Exterior', 'Piscina'],
  situation: ['Vacío', 'Alquilado ahora (quiero saber si estoy en precio)', 'Lo alquilaré más adelante'],
} as const

export const VALUATION_CONSENT = 'Acepto que RentaHucha use estos datos para enviarme la valoración orientativa y contactarme sobre ella, según la política de privacidad.'

export interface ValuationInput {
  name: string; email: string; phone: string; city: string; district: string
  propertyType: string; sizeM2: number | null; bedrooms: string; bathrooms: string; condition: string; furnished: string
  features: string[]; situation: string; currentRent: number | null; comments: string; consentNews: boolean
}

export function validateValuation(i: Record<string, unknown>): { ok: true; data: ValuationInput } | { ok: false; errors: Record<string, string> } {
  const errors: Record<string, string> = {}
  const size = Math.round(Number(i.sizeM2))
  const rent = Math.round(Number(i.currentRent))
  const data: ValuationInput = {
    name: text(i.name, 80), email: text(i.email, 120).toLowerCase(), phone: text(i.phone, 30),
    city: text(i.city, 60), district: text(i.district, 80),
    propertyType: pick(i.propertyType, VALUATION_OPTIONS.propertyType),
    sizeM2: Number.isFinite(size) && size >= 10 && size <= 2000 ? size : null,
    bedrooms: pick(i.bedrooms, VALUATION_OPTIONS.bedrooms), bathrooms: pick(i.bathrooms, VALUATION_OPTIONS.bathrooms),
    condition: pick(i.condition, VALUATION_OPTIONS.condition), furnished: pick(i.furnished, VALUATION_OPTIONS.furnished),
    features: picks(i.features, VALUATION_OPTIONS.features, 8), situation: pick(i.situation, VALUATION_OPTIONS.situation),
    currentRent: Number.isFinite(rent) && rent >= 100 && rent <= 20000 ? rent : null,
    comments: typeof i.comments === 'string' ? i.comments.trim().slice(0, 1000) : '',
    consentNews: i.consentNews === true,
  }
  if (data.name.length < 2) errors.name = 'Escribe tu nombre.'
  if (!EMAIL.test(data.email)) errors.email = 'Revisa el correo: ahí te enviaremos la valoración.'
  if (data.city.length < 2) errors.city = '¿En qué ciudad está el piso?'
  if (data.district.length < 2) errors.district = 'Indica el barrio o la zona: es lo que más cambia el precio.'
  if (!data.propertyType) errors.propertyType = 'Elige el tipo de vivienda.'
  if (!data.sizeM2) errors.sizeM2 = 'Indica los metros cuadrados (aproximados).'
  if (!data.bedrooms) errors.bedrooms = '¿Cuántas habitaciones?'
  if (!data.bathrooms) errors.bathrooms = '¿Cuántos baños?'
  if (!data.condition) errors.condition = '¿En qué estado está?'
  if (!data.situation) errors.situation = '¿Cuál es su situación ahora?'
  if (i.consentContact !== true) errors.consentContact = 'Necesitamos tu permiso para enviarte la valoración.'
  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, data }
}

// ── Encuesta del alquiler ────────────────────────────────────────────────
export const SURVEY = {
  role: { q: '¿Cuál es tu caso?', options: ['Tengo un piso para alquilar o alquilado', 'Busco o vivo de alquiler', 'Las dos cosas'] },
  ownerWorry: { q: 'Propietarios: ¿qué te frena más a la hora de alquilar?', options: ['El miedo al impago', 'Que me estropeen el piso', 'No encontrar un buen inquilino', 'El papeleo y los trámites', 'Que las leyes cambien tanto', 'Nada, ya alquilo sin problemas'] },
  tenantWorry: { q: 'Inquilinos: ¿qué es lo más difícil de encontrar piso?', options: ['El precio', 'Los requisitos (aval, nóminas, contrato…)', 'El dinero que piden para entrar', 'La competencia por cada piso', 'Anuncios falsos o intentos de estafa', 'Que los propietarios no respondan'] },
  wants: { q: '¿Qué valorarías más de una plataforma de alquiler? (hasta 2)', options: ['Que la otra parte esté verificada', 'Contrato, cobros e incidencias online', 'Una hucha en vez de avales y garantías grandes', 'Ayuda si surge un problema', 'Rapidez para alquilar'] },
} as const

export const SURVEY_MIN_RESULTS = 20

export interface SurveyInput { role: string; ownerWorry: string; tenantWorry: string; wants: string[]; city: string; email: string; consentNews: boolean }

export function validateSurvey(i: Record<string, unknown>): { ok: true; data: SurveyInput } | { ok: false; error: string } {
  const data: SurveyInput = {
    role: pick(i.role, SURVEY.role.options),
    ownerWorry: pick(i.ownerWorry, SURVEY.ownerWorry.options),
    tenantWorry: pick(i.tenantWorry, SURVEY.tenantWorry.options),
    wants: picks(i.wants, SURVEY.wants.options, 2),
    city: text(i.city, 60),
    email: text(i.email, 120).toLowerCase(),
    consentNews: i.consentNews === true,
  }
  if (!data.role) return { ok: false, error: 'Elige tu caso.' }
  if (!data.ownerWorry && !data.tenantWorry) return { ok: false, error: 'Responde al menos a una de las preguntas.' }
  if (data.email && !EMAIL.test(data.email)) return { ok: false, error: 'Revisa el correo o déjalo en blanco.' }
  if (data.consentNews && !data.email) return { ok: false, error: 'Para recibir los resultados, escribe tu correo.' }
  return { ok: true, data }
}
