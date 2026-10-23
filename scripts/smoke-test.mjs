// Prueba de humo de los flujos clave contra una web arrancada (por defecto http://localhost:3999).
// Se ejecuta en GitHub Actions antes de cada despliegue, con una base de datos PostgreSQL vacía:
// si algo falla, no se despliega. Uso: BASE_URL=http://localhost:3999 ADMIN_USER=… ADMIN_PASSWORD=… node scripts/smoke-test.mjs
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const B = process.env.BASE_URL ?? 'http://localhost:3999'
const ADMIN = { user: process.env.ADMIN_USER ?? '', password: process.env.ADMIN_PASSWORD ?? '' }
const stamp = Date.now()
let failures = 0

function check(ok, label) {
  console.log(`${ok ? '✓' : '✗'} ${label}`)
  if (!ok) failures++
}

// Cliente con cookies propio (cada «usuario» de la prueba tiene su sesión).
function client() {
  const jar = new Map()
  return async (path, opts = {}) => {
    const headers = { 'user-agent': 'Mozilla/5.0 (prueba de humo)', ...(opts.headers ?? {}) }
    if (jar.size) headers.cookie = [...jar].map(([k, v]) => `${k}=${v}`).join('; ')
    let body = opts.body
    if (body && !(body instanceof FormData) && typeof body !== 'string') { body = JSON.stringify(body); headers['content-type'] = 'application/json' }
    const res = await fetch(B + path, { ...opts, headers, body, redirect: 'manual' })
    for (const c of res.headers.getSetCookie?.() ?? []) { const [kv] = c.split(';'); const i = kv.indexOf('='); jar.set(kv.slice(0, i), kv.slice(i + 1)) }
    const text = await res.text()
    let json = null
    try { json = JSON.parse(text) } catch {}
    return { status: res.status, text, json }
  }
}

const anon = client()

// 1. Páginas públicas
for (const p of ['/', '/propietarios', '/inquilinos', '/inmobiliarias', '/pisos', '/alquiler', '/alquiler/madrid', '/alquilar-mi-piso/valencia',
  '/valoracion-alquiler', '/encuesta-alquiler', '/herramientas', '/herramientas/modelo-contrato-alquiler', '/herramientas/reduccion-irpf-alquiler', '/herramientas/subida-alquiler-irav', '/herramientas/decreto-vivienda-mi-contrato', '/embed/irav', '/blog', '/cuenta/registro', '/sitemap.xml', '/robots.txt']) {
  const r = await anon(p)
  check(r.status === 200, `GET ${p} → ${r.status}`)
}
const home = await anon('/')
check(/RentaHucha/.test(home.text), 'la portada contiene la marca')

// 2. Propietario: cuenta, piso, fotos y revisión
const owner = client()
let r = await owner('/api/cuenta/registro', { method: 'POST', body: { role: 'propietario', name: 'Prueba Propietario', email: `prop${stamp}@example.com`, password: 'clave-de-prueba-123', consent: true, adult: true } })
check(r.status === 200, `registro de propietario → ${r.status}`)
r = await owner('/api/mis-pisos', { method: 'POST', body: { title: 'Piso de prueba automática en el centro', city: 'Valencia', district: 'Centro', propertyType: 'Piso', rent: 900, bedrooms: 2, bathrooms: 1, furnished: 'Amueblado', stayType: 'Vivienda habitual (larga duración)', energyRating: 'D', description: 'Piso de prueba creado por la prueba automática de despliegue: luminoso, exterior y bien comunicado con el centro.', referenceIndex: 'Entre 800 y 950 €/mes', regCode: 'PRUEBA-123' } })
check(r.status === 200 && r.json?.id, `crear piso → ${r.status}`)
const pisoId = r.json?.id
const img = readFileSync(resolve(import.meta.dirname, '../public/og/default.png'))
for (let i = 0; i < 3; i++) {
  const fd = new FormData()
  fd.append('foto', new Blob([img], { type: 'image/png' }), 'foto.png')
  r = await owner(`/api/mis-pisos/${pisoId}/fotos`, { method: 'POST', body: fd })
}
check(r.status === 200 && r.json?.photos?.length === 3, `subir 3 fotos → ${r.status}`)
r = await owner(`/api/mis-pisos/${pisoId}/estado`, { method: 'POST', body: { action: 'enviar' } })
check(r.status === 200 && r.json?.status === 'revision', `enviar a revisión → ${r.status}`)
r = await anon(`/api/pisos/${pisoId}`)
check(r.status === 404, `un piso en revisión no es público → ${r.status}`)

// 3. Panel: aprobar
const admin = client()
r = await admin('/api/admin/login', { method: 'POST', body: ADMIN })
check(r.status === 200, `login del panel → ${r.status}`)
r = await admin(`/api/admin/pisos/${pisoId}`, { method: 'POST', body: { action: 'aprobar' } })
check(r.status === 200, `aprobar piso → ${r.status}`)
r = await anon(`/api/pisos/${pisoId}`)
check(r.status === 200 && !('address' in (r.json?.property ?? {})), 'el piso aprobado es público y sin dirección exacta')
check(r.json?.property?.referenceIndex === 'Entre 800 y 950 €/mes' && r.json?.property?.regCode === 'PRUEBA-123', 'el anuncio público muestra los datos legales (RDL 29/2026)')
check(r.json?.property?.ownerName === 'Prueba' && r.json?.property?.ownerIsAgency === false, 'un particular se muestra con su nombre de pila')
r = await anon('/api/admin/pisos')
check(r.status === 401, `el panel sin sesión da 401 → ${r.status}`)

// 4. Inquilino: contacto y chat
const tenant = client()
r = await tenant('/api/cuenta/registro', { method: 'POST', body: { role: 'inquilino', name: 'Prueba Inquilino', email: `inq${stamp}@example.com`, password: 'clave-de-prueba-456', consent: true, adult: true } })
check(r.status === 200, `registro de inquilino → ${r.status}`)
r = await tenant(`/api/pisos/${pisoId}/contactar`, { method: 'POST', body: { message: 'Hola, me interesa el piso. ¿Podemos verlo esta semana?' } })
check(r.status === 200 && r.json?.conversationId, `escribir al propietario → ${r.status}`)
const conv = r.json?.conversationId
r = await owner(`/api/conversaciones/${conv}/mensajes`, { method: 'POST', body: { body: '¡Hola! Sí, el sábado a las 11.' } })
check(r.status === 200, `respuesta del propietario → ${r.status}`)
r = await tenant(`/api/conversaciones/${conv}`)
check(r.status === 200 && r.json?.messages?.length === 2, 'el inquilino ve los dos mensajes')
r = await anon(`/api/conversaciones/${conv}`)
check(r.status === 401, `la conversación es privada → ${r.status}`)

// 5. Formularios públicos
r = await anon('/api/leads', { method: 'POST', body: { role: 'propietario', name: 'Prueba Lista', email: `lista${stamp}@example.com`, city: 'Valencia', units: '1 piso', rentRange: '600–900 €', flatStatus: 'Vacío y listo para alquilar', propertyType: 'Piso', bedrooms: '2', bathrooms: '1', condition: 'En buen estado', timing: 'Cuanto antes', consentContact: true, adult: true } })
check(r.status === 200, `lista de espera → ${r.status}`)
r = await anon('/api/formularios/valoracion', { method: 'POST', body: { name: 'Prueba Valoración', email: `val${stamp}@example.com`, city: 'Valencia', district: 'Ruzafa', propertyType: 'Piso', sizeM2: 70, bedrooms: '2', bathrooms: '1', condition: 'En buen estado', situation: 'Vacío', consentContact: true } })
check(r.status === 200, `valoración → ${r.status}`)
r = await anon('/api/alertas', { method: 'POST', body: { email: `alerta${stamp}@example.com`, city: 'Valencia', consent: true } })
check(r.status === 200, `alerta de pisos → ${r.status}`)
r = await anon('/api/newsletter', { method: 'POST', body: { email: `news${stamp}@example.com`, consent: true } })
check(r.status === 200, `newsletter → ${r.status}`)
r = await anon('/api/newsletter', { method: 'POST', body: { email: `irav${stamp}@example.com`, consent: true, source: 'irav' } })
check(r.status === 200, `aviso del IRAV → ${r.status}`)
r = await anon('/api/baja', { method: 'POST', body: { token: 'no-existe' } })
check(r.status === 404, `baja con token falso → ${r.status}`)
r = await anon('/api/newsletter', { method: 'POST', body: { email: `guia${stamp}@example.com`, consent: true, source: 'guia-decreto' } })
check(r.status === 200, `guía del decreto a cambio del correo → ${r.status}`)

// 5b. Cuenta de inmobiliaria
const agency = client()
r = await agency('/api/cuenta/registro', { method: 'POST', body: { role: 'inmobiliaria', name: 'Prueba Agencia', email: `agencia${stamp}@example.com`, password: 'clave-de-prueba-789', consent: true, adult: true } })
check(r.status === 422, `inmobiliaria sin nombre comercial → ${r.status}`)
r = await agency('/api/cuenta/registro', { method: 'POST', body: { role: 'inmobiliaria', company: 'Fincas Prueba', name: 'Prueba Agencia', email: `agencia${stamp}@example.com`, password: 'clave-de-prueba-789', consent: true, adult: true } })
check(r.status === 200 && r.json?.user?.role === 'propietario' && r.json?.user?.isAgency === true, `registro de inmobiliaria → ${r.status}`)
r = await agency('/api/cuenta/yo')
check(r.status === 200 && r.json?.user?.company === 'Fincas Prueba', `la sesión de la inmobiliaria lleva su nombre comercial → ${r.status}`)

// 6. Captación (panel)
r = await admin('/api/admin/captacion', { method: 'POST', body: { company: `Inmobiliaria Prueba ${stamp}`, city: 'Valencia', phone: '900 000 000' } })
check(r.status === 200 && r.json?.added === 1, `alta en captación → ${r.status}`)
r = await admin('/api/admin/comportamiento?dias=7')
check(r.status === 200 && r.json?.summary, `comportamiento → ${r.status}`)
r = await admin('/api/admin/mapa-calor?dias=7')
check(r.status === 200 && Array.isArray(r.json?.clicks), `mapa de calor → ${r.status}`)
r = await admin('/api/admin/stats?dias=7')
check(r.status === 200 && typeof r.json?.today?.visitors === 'number', `estadísticas → ${r.status}`)
r = await admin('/api/admin/google?dias=28')
check(r.status === 200 && typeof r.json?.configured === 'boolean', `datos de Google → ${r.status}`)
r = await anon('/api/t', { method: 'POST', body: { e: 'view', p: '/', v: 'prueba', s: 1, w: 1280 } })
check(r.status === 200, `seguimiento → ${r.status}`)

console.log(failures ? `\n${failures} comprobaciones fallidas` : '\nTodo correcto')
process.exit(failures ? 1 : 0)
