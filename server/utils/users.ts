import { randomBytes, scrypt, timingSafeEqual } from 'node:crypto'
import { promisify } from 'node:util'
import type { H3Event } from 'h3'

const scryptAsync = promisify(scrypt) as (pwd: string, salt: Buffer, len: number, opts: { N: number; r: number; p: number; maxmem: number }) => Promise<Buffer>
const PARAMS = { N: 2 ** 15, r: 8, p: 1, maxmem: 64 * 1024 * 1024 }

// Formato: scrypt$N$r$p$sal$hash (todo en base64url salvo los parámetros).
export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16)
  const hash = await scryptAsync(password.normalize('NFKC'), salt, 32, PARAMS)
  return ['scrypt', PARAMS.N, PARAMS.r, PARAMS.p, salt.toString('base64url'), hash.toString('base64url')].join('$')
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [alg, N, r, p, salt, hash] = stored.split('$')
  if (alg !== 'scrypt' || !salt || !hash) return false
  const expected = Buffer.from(hash, 'base64url')
  const actual = await scryptAsync(password.normalize('NFKC'), Buffer.from(salt, 'base64url'), expected.length, { N: Number(N), r: Number(r), p: Number(p), maxmem: PARAMS.maxmem })
  return actual.length === expected.length && timingSafeEqual(actual, expected)
}

// Texto exacto aceptado al crear la cuenta (RGPD art. 7.1).
export const SIGNUP_CONSENT = 'Acepto las condiciones de uso y la política de privacidad de RentaHucha, y que guarde mis datos para gestionar mi cuenta, mis anuncios y mis mensajes.'

interface UserSession { userId?: string }

function sessionConfig() {
  const { sessionPassword } = adminCredentials()
  if (!sessionPassword || sessionPassword.length < 32) {
    throw createError({ statusCode: 500, statusMessage: 'Falta NUXT_SESSION_PASSWORD (mínimo 32 caracteres).' })
  }
  return {
    password: sessionPassword,
    name: 'rh-user',
    maxAge: 60 * 60 * 24 * 30,
    cookie: { httpOnly: true, sameSite: 'lax' as const, secure: !import.meta.dev, path: '/' },
  }
}

export const userSession = (event: H3Event) => useSession<UserSession>(event, sessionConfig())

export async function getUser(event: H3Event): Promise<PublicUser | null> {
  const session = await userSession(event)
  if (!session.data.userId) return null
  const user = await queryOne<PublicUser>('SELECT id, role, name, email, phone FROM users WHERE id = $1', [session.data.userId])
  if (!user) await session.clear()
  return user
}

export async function requireUser(event: H3Event, role?: UserRole): Promise<PublicUser> {
  const user = await getUser(event)
  if (!user) throw createError({ statusCode: 401, statusMessage: 'Inicia sesión para continuar.' })
  if (role && user.role !== role) {
    throw createError({ statusCode: 403, statusMessage: role === 'propietario' ? 'Esta sección es para propietarios.' : 'Esta sección es para quien busca piso.' })
  }
  return user
}

export const isUuid = (v: unknown): v is string => typeof v === 'string' && /^[0-9a-f-]{36}$/i.test(v)
