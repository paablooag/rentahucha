export function useNewsletter() {
  const pending = ref(false)
  const error = ref<string | null>(null)

  async function subscribe(email: string, source?: 'checklist' | 'test' | 'guia-decreto'): Promise<boolean> {
    pending.value = true
    error.value = null
    try {
      await $fetch('/api/newsletter', { method: 'POST', body: { email, consent: true, source } })
      return true
    }
    catch (e: unknown) {
      const err = e as { statusCode?: number; statusMessage?: string }
      error.value = err.statusCode === 422 && err.statusMessage ? err.statusMessage : 'No hemos podido apuntarte. Inténtalo de nuevo en unos minutos.'
      return false
    }
    finally {
      pending.value = false
    }
  }

  return { subscribe, pending, error }
}
