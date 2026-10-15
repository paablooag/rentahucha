import type { H3Event } from 'h3'

// Límite sencillo en memoria por IP. Suficiente para una sola instancia; con varias, usar un almacén compartido.
const hits = new Map<string, { count: number; resetAt: number }>()

export function rateLimit(event: H3Event, bucket: string, max: number, windowMs: number) {
  const ip = getRequestIP(event, { xForwardedFor: true }) ?? 'local'
  const key = `${bucket}:${ip}`
  const now = Date.now()
  const entry = hits.get(key)
  if (!entry || entry.resetAt < now) {
    hits.set(key, { count: 1, resetAt: now + windowMs })
    return
  }
  entry.count++
  if (entry.count > max) {
    throw createError({ statusCode: 429, statusMessage: 'Demasiados intentos. Prueba de nuevo en unos minutos.' })
  }
}

export function resetRateLimit(event: H3Event, bucket: string) {
  const ip = getRequestIP(event, { xForwardedFor: true }) ?? 'local'
  hits.delete(`${bucket}:${ip}`)
}
