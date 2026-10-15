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
  },
  nitro: {
    storage: {
      // Interesados, suscriptores y blog. En local: ficheros en .data/db. En producción, cambiar el driver
      // (p. ej. Netlify Blobs, Vercel KV, Redis) o usar un disco persistente.
      db: { driver: 'fs', base: './.data/db' },
    },
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
    '/herramientas/**': { prerender: true },
    '/dossier/propietarios': { prerender: true },
    '/dossier/inquilinos': { prerender: true },
    // El panel solo se pinta en el navegador y nunca se indexa.
    '/admin/**': { ssr: false, headers: { 'X-Robots-Tag': 'noindex, nofollow' } },
    '/api/admin/**': { headers: { 'Cache-Control': 'no-store' } },
  },
})
