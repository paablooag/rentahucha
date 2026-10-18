// Ruta base de la web (p. ej. «/rentahucha/» si cuelga de una subcarpeta). Por defecto, la raíz.
const baseURL = process.env.NUXT_APP_BASE_URL || '/'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  // Tipografía servida desde la propia web: sin peticiones a Google ni cookies de terceros.
  css: ['@fontsource-variable/inter-tight', '~/assets/css/main.css'],
  runtimeConfig: {
    // Solo servidor. Se fijan con NUXT_ADMIN_USER, NUXT_ADMIN_PASSWORD y NUXT_SESSION_PASSWORD (ver .env.example).
    adminUser: '',
    adminPassword: '',
    sessionPassword: '',
    // Solo para probar en local con una contraseña corta (NUXT_ALLOW_WEAK_PASSWORD=true). Nunca en producción.
    allowWeakPassword: false,
    // PostgreSQL (NUXT_DATABASE_URL=postgres://usuario:clave@host:5432/bd). En desarrollo, sin URL se usa PGlite.
    databaseUrl: '',
  },
  app: {
    head: {
      htmlAttrs: { lang: 'es' },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#090909' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: `${baseURL.replace(/\/$/, '')}/favicon.svg` },
      ],
    },
  },
  routeRules: {
    // Páginas estáticas prerenderizadas para SEO.
    '/': { prerender: true },
    '/propietarios': { prerender: true },
    '/inquilinos': { prerender: true },
    '/inmobiliarias': { prerender: true },
    '/herramientas/**': { prerender: true },
    '/alquilar-mi-piso': { prerender: true },
    '/alquilar-mi-piso/**': { prerender: true },
    '/dossier/propietarios': { prerender: true },
    '/dossier/inquilinos': { prerender: true },
    '/dossier/checklist-propietarios': { prerender: true },
    // El panel solo se pinta en el navegador y nunca se indexa.
    // URLs de artículos renombradas (2026 → 2027): redirección permanente para no perder enlaces ni posicionamiento.
    '/blog/como-buscar-piso-de-alquiler-en-2026': { redirect: { to: '/blog/como-buscar-piso-de-alquiler-en-2027', statusCode: 301 } },
    '/blog/cuanto-cuesta-reformar-un-piso-2026': { redirect: { to: '/blog/cuanto-cuesta-reformar-un-piso-2027', statusCode: 301 } },
    '/blog/normativa-inmobiliaria-alquiler-2026': { redirect: { to: '/blog/normativa-inmobiliaria-alquiler-2027', statusCode: 301 } },
    '/admin/**': { ssr: false, headers: { 'X-Robots-Tag': 'noindex, nofollow' } },
    '/api/admin/**': { headers: { 'Cache-Control': 'no-store' } },
  },
})
