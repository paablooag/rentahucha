const STORAGE_KEY = 'rh-newsletter'

// Sin backend todavía: igual que la lista de espera, las altas se guardan en el navegador.
// Para conectarlo, sustituir el cuerpo de `subscribe` por un $fetch('/api/newsletter', { method: 'POST', body }).
export function useNewsletter() {
  const pending = ref(false)
  const error = ref<string | null>(null)

  async function subscribe(email: string): Promise<boolean> {
    pending.value = true
    error.value = null
    try {
      await new Promise(resolve => setTimeout(resolve, 400))
      try {
        const current = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as { email: string; createdAt: string }[]
        if (!current.some(e => e.email === email)) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify([...current, { email, createdAt: new Date().toISOString() }]))
        }
      }
      catch {
        // Almacenamiento no disponible (modo privado): el alta se da por buena igualmente.
      }
      return true
    }
    catch {
      error.value = 'No hemos podido apuntarte. Inténtalo de nuevo.'
      return false
    }
    finally {
      pending.value = false
    }
  }

  return { subscribe, pending, error }
}
