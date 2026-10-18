// Sesión del usuario (propietario o inquilino) compartida por toda la web.
export function useAccount() {
  const user = useState<PublicUser | null>('account-user', () => null)
  const unread = useState('account-unread', () => 0)
  const loaded = useState('account-loaded', () => false)

  async function refresh() {
    const headers = import.meta.server ? useRequestHeaders(['cookie']) : undefined
    const r = await $fetch<{ user: PublicUser | null; unread: number }>('/api/cuenta/yo', { headers }).catch(() => ({ user: null, unread: 0 }))
    user.value = r.user
    unread.value = r.unread
    loaded.value = true
    return r.user
  }

  async function logout() {
    await $fetch('/api/cuenta/logout', { method: 'POST' })
    user.value = null
    unread.value = 0
    await navigateTo('/')
  }

  return { user, unread, loaded, refresh, logout }
}

// Mensaje de error legible de una respuesta de la API.
export function apiError(e: unknown, fallback = 'Algo ha fallado. Inténtalo de nuevo.'): { message: string; errors: Record<string, string> } {
  const err = e as { statusCode?: number; statusMessage?: string; data?: { statusMessage?: string; data?: { errors?: Record<string, string> } } }
  return {
    message: err.data?.statusMessage ?? err.statusMessage ?? fallback,
    errors: err.data?.data?.errors ?? {},
  }
}
