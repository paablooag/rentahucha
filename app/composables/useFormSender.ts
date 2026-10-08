export type FormName = 'lista-espera' | 'newsletter'

// Envía un formulario al servicio configurado en NUXT_PUBLIC_FORMS_ENDPOINT (Formspree o similar,
// que acepte POST con JSON). Sin endpoint, guarda en el navegador para poder probar la web.
export function useFormSender() {
  const endpoint = useRuntimeConfig().public.formsEndpoint as string

  async function send(form: FormName, data: Record<string, unknown>) {
    const payload = { formulario: form, ...data, enviadoEl: new Date().toISOString() }

    if (endpoint) {
      await $fetch(endpoint, { method: 'POST', body: payload, headers: { Accept: 'application/json' } })
      return
    }

    if (import.meta.dev) console.warn(`[${form}] Sin NUXT_PUBLIC_FORMS_ENDPOINT: el envío solo se guarda en este navegador.`)
    try {
      const key = `rh-${form}`
      const current = JSON.parse(localStorage.getItem(key) ?? '[]') as unknown[]
      localStorage.setItem(key, JSON.stringify([...current, payload]))
    }
    catch {
      // Almacenamiento no disponible (modo privado).
    }
  }

  return { send, configured: Boolean(endpoint) }
}
