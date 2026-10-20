// Estadísticas propias sin cookies: páginas vistas, recorrido dentro de la visita, tiempo visible, scroll y clics
// para el mapa de calor. Nada se guarda en el dispositivo: la visita solo existe en la memoria de esta pestaña.
export default defineNuxtPlugin(() => {
  if (trackingDisabled()) return
  const router = useRouter()
  const visit = (globalThis.crypto?.randomUUID?.() ?? `${Date.now()}${Math.random()}`).replace(/-/g, '').slice(0, 20)
  let seq = 0
  let first = true

  interface Page { path: string; seq: number; visibleMs: number; since: number | null; maxScroll: number; clicks: [number, number, string][] }
  let page: Page | null = null

  const docHeight = () => Math.max(document.documentElement.scrollHeight, document.body?.scrollHeight ?? 0, 1)
  const scrolled = () => Math.min(100, Math.round(((window.scrollY + window.innerHeight) / docHeight()) * 100))

  function visibleTime(p: Page) {
    return p.visibleMs + (p.since !== null ? Date.now() - p.since : 0)
  }
  // Envía lo acumulado de la página actual (se puede llamar varias veces: el servidor se queda con el máximo).
  function flush() {
    if (!page) return
    sendTracking({ e: 'time', p: page.path, v: visit, s: page.seq, d: visibleTime(page), sc: page.maxScroll, c: page.clicks, w: window.innerWidth })
    page.clicks = []
  }
  function start(path: string, query: Record<string, unknown>) {
    if (path.startsWith('/admin')) { page = null; return }
    seq++
    page = { path, seq, visibleMs: 0, since: document.visibilityState === 'visible' ? Date.now() : null, maxScroll: scrolled(), clicks: [] }
    const payload: Record<string, unknown> = { e: 'view', p: path, v: visit, s: seq, w: window.innerWidth }
    if (first) {
      payload.r = document.referrer
      payload.us = query.utm_source
      payload.um = query.utm_medium
      payload.uc = query.utm_campaign
      first = false
    }
    sendTracking(payload)
  }

  router.afterEach((to, from) => {
    if (to.path === from.path && from.matched.length) return
    flush()
    // Espera a que la página nueva se pinte para medir bien su altura.
    nextTick(() => start(to.path, to.query))
  })
  onNuxtReady(() => {
    if (first) start(router.currentRoute.value.path, router.currentRoute.value.query)
  })

  // Tiempo visible: se pausa al cambiar de pestaña y se envía lo acumulado.
  document.addEventListener('visibilitychange', () => {
    if (!page) return
    if (document.visibilityState === 'hidden') {
      if (page.since !== null) { page.visibleMs += Date.now() - page.since; page.since = null }
      flush()
    }
    else page.since = Date.now()
  })
  window.addEventListener('pagehide', flush)
  window.addEventListener('beforeunload', flush)
  // El envío al salir no siempre llega (algunos navegadores lo cortan): cada 15 s con la página visible se manda lo acumulado.
  setInterval(() => { if (page && document.visibilityState === 'visible') flush() }, 15000)

  let ticking = false
  window.addEventListener('scroll', () => {
    if (ticking || !page) return
    ticking = true
    requestAnimationFrame(() => { if (page) page.maxScroll = Math.max(page.maxScroll, scrolled()); ticking = false })
  }, { passive: true })

  // Clics: posición relativa a la página (0-1000) y el texto corto del botón o enlace. Nunca lo que se escribe.
  document.addEventListener('click', (ev) => {
    if (!page || page.clicks.length >= 60) return
    const el = (ev.target as Element | null)?.closest?.('a, button, label, summary') as HTMLElement | null
    const label = el ? (el.getAttribute('aria-label') || el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 40) : ''
    page.clicks.push([Math.round((ev.clientX / window.innerWidth) * 1000), Math.round((ev.pageY / docHeight()) * 1000), label])
  }, { capture: true, passive: true })
})
