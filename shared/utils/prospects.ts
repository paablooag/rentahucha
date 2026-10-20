// Captación B2B (inmobiliarias y administradores de fincas): estados y tipos compartidos por el panel y el servidor.
export const PROSPECT_STATUS = {
  por_llamar: 'Por llamar',
  volver_a_llamar: 'Volver a llamar',
  pide_info: 'Pide información',
  en_conversacion: 'En conversación',
  cliente: 'Dentro',
  no_interesa: 'No le interesa',
} as const
export type ProspectStatus = keyof typeof PROSPECT_STATUS
export const PROSPECT_KINDS = { inmobiliaria: 'Inmobiliaria', administrador: 'Administrador de fincas', otro: 'Otro' } as const

export interface Prospect {
  id: string; kind: keyof typeof PROSPECT_KINDS; company: string; contactName: string; city: string; phone: string; email: string; website: string
  source: string; status: ProspectStatus; notes: string; nextCallAt: string | null; consentAt: string | null
  proposalSentAt: string | null; followupSentAt: string | null; doNotContact: boolean; createdAt: string; updatedAt: string
  events?: { kind: string; detail: string; createdAt: string }[]
}
