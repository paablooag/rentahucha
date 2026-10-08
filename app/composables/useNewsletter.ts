export function useNewsletter() {
  const { send } = useFormSender()
  const pending = ref(false)
  const error = ref<string | null>(null)

  async function subscribe(email: string): Promise<boolean> {
    pending.value = true
    error.value = null
    try {
      await send('newsletter', { email, consentimiento: true })
      return true
    }
    catch {
      error.value = 'No hemos podido apuntarte. Inténtalo de nuevo en unos minutos.'
      return false
    }
    finally {
      pending.value = false
    }
  }

  return { subscribe, pending, error }
}
