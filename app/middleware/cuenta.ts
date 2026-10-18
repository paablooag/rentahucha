// Páginas de «Mi cuenta»: sin sesión, a la página de entrar (la protección real está en el servidor).
export default defineNuxtRouteMiddleware(async (to) => {
  const { user, loaded, refresh } = useAccount()
  if (!loaded.value || !user.value) await refresh()
  if (!user.value) return navigateTo({ path: '/cuenta/entrar', query: { next: to.fullPath } })
})
