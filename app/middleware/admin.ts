// Protege /admin: sin sesión válida, redirige al login. La protección real está en el servidor (requireAdmin).
export default defineNuxtRouteMiddleware(async (to) => {
  if (to.path === '/admin/login') return
  try {
    await $fetch('/api/admin/me')
  }
  catch {
    return navigateTo({ path: '/admin/login', query: { next: to.fullPath } })
  }
})
