import { createHash, timingSafeEqual } from 'node:crypto'
import type { H3Event } from 'h3'

interface AdminSession { user?: string }

// Nuxt convierte los valores de entorno que parecen números (p. ej. «123456») en number: se fuerzan a texto.
export function adminCredentials() {
  const config = useRuntimeConfig()
  return {
    user: String(config.adminUser ?? ''),
    password: String(config.adminPassword ?? ''),
    sessionPassword: String(config.sessionPassword ?? ''),
    allowWeak: String(config.allowWeakPassword) === 'true',
  }
}

function sessionConfig() {
  const { sessionPassword } = adminCredentials()
  if (!sessionPassword || sessionPassword.length < 32) {
    throw createError({ statusCode: 500, statusMessage: 'Falta NUXT_SESSION_PASSWORD (mínimo 32 caracteres).' })
  }
  return {
    password: sessionPassword,
    name: 'rh-admin',
    maxAge: 60 * 60 * 8,
    cookie: { httpOnly: true, sameSite: 'strict' as const, secure: !import.meta.dev, path: '/' },
  }
}

export const adminSession = (event: H3Event) => useSession<AdminSession>(event, sessionConfig())

// Compara en tiempo constante (con hash para igualar longitudes).
export function safeEqual(a: string, b: string): boolean {
  const ha = createHash('sha256').update(a).digest()
  const hb = createHash('sha256').update(b).digest()
  return timingSafeEqual(ha, hb)
}

export async function requireAdmin(event: H3Event): Promise<string> {
  const session = await adminSession(event)
  if (!session.data.user) throw createError({ statusCode: 401, statusMessage: 'No autorizado' })
  return session.data.user
}
