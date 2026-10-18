// Registra un evento de las estadísticas propias (sin cookies). Ver app/plugins/track.client.ts y server/api/t.post.ts.
export function trackEvent(e: string, p?: string) {
  if (import.meta.server) return
  try {
    const body = JSON.stringify({ e, p: p ?? window.location.pathname })
    if (!navigator.sendBeacon?.('/api/t', new Blob([body], { type: 'application/json' }))) {
      fetch('/api/t', { method: 'POST', body, headers: { 'content-type': 'application/json' }, keepalive: true }).catch(() => {})
    }
  }
  catch {}
}
