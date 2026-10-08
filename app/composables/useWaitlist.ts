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
  createdAt: string
}

const STORAGE_KEY = 'rh-waitlist'

// Sin backend todavía: las altas se guardan en el navegador. Para conectarlo,
// sustituir el cuerpo de `submit` por un $fetch('/api/waitlist', { method: 'POST', body }).
export function useWaitlist() {
  const pending = ref(false)
  const error = ref<string | null>(null)

  async function submit(entry: Omit<WaitlistEntry, 'createdAt'>): Promise<boolean> {
    pending.value = true
    error.value = null
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      const record: WaitlistEntry = { ...entry, createdAt: new Date().toISOString() }
      try {
        const current = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as WaitlistEntry[]
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...current, record]))
      }
      catch {
        // Almacenamiento no disponible (modo privado): el alta se da por buena igualmente.
      }
      return true
    }
    catch {
      error.value = 'No hemos podido guardar tus datos. Inténtalo de nuevo.'
      return false
    }
    finally {
      pending.value = false
    }
  }

  return { submit, pending, error }
}
