// Estadísticas propias sin cookies: envía la ruta vista (y, en la primera, de dónde llega y la campaña).
// No guarda nada en el dispositivo; el servidor cuenta visitantes con un hash diario anónimo.
export default defineNuxtPlugin(() => {
  const router = useRouter()
  let first = true

  function send(path: string, query: Record<string, unknown>) {
    if (path.startsWith('/admin')) return
    const payload: Record<string, unknown> = { e: 'view', p: path }
    if (first) {
      payload.r = document.referrer
      payload.us = query.utm_source
      payload.um = query.utm_medium
      payload.uc = query.utm_campaign
      first = false
    }
    try {
      const body = JSON.stringify(payload)
      if (!navigator.sendBeacon?.('/api/t', new Blob([body], { type: 'application/json' }))) {
        fetch('/api/t', { method: 'POST', body, headers: { 'content-type': 'application/json' }, keepalive: true }).catch(() => {})
      }
    }
    catch {}
  }

  router.afterEach((to, from) => {
    if (to.path !== from.path || from.matched.length === 0) send(to.path, to.query)
  })
  // Primera carga (afterEach puede no dispararse en la hidratación).
  onNuxtReady(() => {
    if (first) send(router.currentRoute.value.path, router.currentRoute.value.query)
  })
})
