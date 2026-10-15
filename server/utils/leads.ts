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
