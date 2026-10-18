// Seguimiento de cada interesado en el panel (mini-CRM): en qué punto está la conversación.
export const LEAD_STAGES = ['nuevo', 'contactado', 'conversacion', 'listo', 'descartado'] as const
export type LeadStage = (typeof LEAD_STAGES)[number]

export const STAGE_LABELS: Record<LeadStage, string> = {
  nuevo: 'Nuevo',
  contactado: 'Contactado',
  conversacion: 'En conversación',
  listo: 'Dispuesto a publicar',
  descartado: 'Descartado',
}
