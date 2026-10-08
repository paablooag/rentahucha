export type WaitlistRole = 'propietario' | 'inquilino'

export interface WaitlistEntry {
  role: WaitlistRole
  name: string
  email: string
  city: string
  units?: number
  rent?: number
  maxRent?: number
  employment?: string
}

export function useWaitlist() {
  const { send } = useFormSender()
  const pending = ref(false)
  const error = ref<string | null>(null)

  async function submit(entry: WaitlistEntry): Promise<boolean> {
    pending.value = true
    error.value = null
    try {
      await send('lista-espera', { ...entry, consentimiento: true })
      return true
    }
    catch {
      error.value = 'No hemos podido guardar tus datos. Inténtalo de nuevo en unos minutos.'
      return false
    }
    finally {
      pending.value = false
    }
  }

  return { submit, pending, error }
}
