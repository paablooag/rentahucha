import type { LeadErrors } from '#shared/utils/leads'

export function useLeadSubmit() {
  const pending = ref(false)
  const serverError = ref<string | null>(null)

  // Devuelve null si todo fue bien, o los errores por campo que haya detectado el servidor.
  async function submit(payload: Record<string, unknown>): Promise<{ ok: boolean; errors?: LeadErrors }> {
    pending.value = true
    serverError.value = null
    try {
      await $fetch('/api/leads', { method: 'POST', body: payload })
      return { ok: true }
    }
    catch (e: unknown) {
      const err = e as { statusCode?: number; data?: { data?: { errors?: LeadErrors }; statusMessage?: string } }
      if (err.statusCode === 422 && err.data?.data?.errors) return { ok: false, errors: err.data.data.errors }
      serverError.value = err.statusCode === 429
        ? 'Has enviado demasiados formularios seguidos. Prueba de nuevo en un rato.'
        : 'No hemos podido guardar tus datos. Inténtalo de nuevo en unos minutos.'
      return { ok: false }
    }
    finally {
      pending.value = false
    }
  }

  return { submit, pending, serverError }
}
