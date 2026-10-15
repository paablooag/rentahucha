// Exportación CSV (separador «;» y BOM para que Excel en español la abra bien).
export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const leads = (await listLeads()).reverse()

  const columns: [string, (l: StoredLead) => unknown][] = [
    ['Fecha', l => l.createdAt.slice(0, 10)],
    ['Perfil', l => l.role],
    ['Nombre', l => l.name],
    ['Email', l => l.email],
    ['Teléfono', l => l.phone],
    ['Ciudad', l => l.city],
    ['Pisos', l => l.units],
    ['Renta piso', l => l.rentRange],
    ['Situación del piso', l => l.flatStatus],
    ['Tipo de vivienda', l => l.propertyType],
    ['Habitaciones', l => l.bedrooms],
    ['Baños', l => l.bathrooms],
    ['m²', l => l.sizeM2],
    ['Estado', l => l.condition],
    ['Mobiliario', l => l.furnished],
    ['Extras', l => l.features?.join(', ')],
    ['Prefiere alquiler', l => l.stayPref],
    ['Renta máxima', l => l.maxRent],
    ['Edad', l => l.ageRange],
    ['Personas', l => l.people],
    ['Habitaciones buscadas', l => l.wantedBedrooms],
    ['Baños buscados', l => l.wantedBathrooms],
    ['Mascotas', l => l.pets],
    ['Tipo de estancia', l => l.stayType],
    ['Imprescindibles', l => l.mustHaves?.join(', ')],
    ['Convivencia', l => l.household],
    ['Situación laboral', l => l.employment],
    ['Cuándo', l => l.timing],
    ['Intereses', l => l.interests.join(', ')],
    ['Comentarios', l => l.comments],
    ['Newsletter', l => (l.consentNews ? 'sí' : 'no')],
  ]
  const cell = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`
  const csv = [columns.map(c => cell(c[0])).join(';'), ...leads.map(l => columns.map(c => cell(c[1](l))).join(';'))].join('\r\n')

  setHeader(event, 'Content-Type', 'text/csv; charset=utf-8')
  setHeader(event, 'Content-Disposition', `attachment; filename="interesados-${new Date().toISOString().slice(0, 10)}.csv"`)
  return `﻿${csv}`
})
