// Estadísticas propias sin cookies ni nada guardado en el dispositivo del visitante (ver server/api/t.post.ts).
// La visita es un identificador aleatorio en memoria: desaparece al cerrar o recargar la pestaña.

// Exclusión del equipo: Pablo puede marcar «no contar este dispositivo» desde el panel (localStorage, en su propio
// navegador y por decisión suya), y la vista previa del mapa de calor carga las páginas con ?notrack.
export function trackingDisabled() {
  if (import.meta.server) return true
  try {
    if (new URLSearchParams(window.location.search).has('notrack')) return true
    return window.localStorage.getItem('rh-notrack') === '1'
  }
  catch { return false }
}

export function sendTracking(payload: Record<string, unknown>) {
  if (trackingDisabled()) return
  try {
    const body = JSON.stringify(payload)
    if (!navigator.sendBeacon?.('/api/t', new Blob([body], { type: 'application/json' }))) {
      fetch('/api/t', { method: 'POST', body, headers: { 'content-type': 'application/json' }, keepalive: true }).catch(() => {})
    }
  }
  catch {}
}

// Registra un evento (formulario enviado, clic en una llamada a la acción…).
export function trackEvent(e: string, p?: string) {
  if (import.meta.server) return
  sendTracking({ e, p: p ?? window.location.pathname })
}
