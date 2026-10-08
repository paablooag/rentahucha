// En GitHub Pages la web cuelga de /rentahucha/ (NUXT_APP_BASE_URL lo fija el workflow de despliegue).
const baseURL = process.env.NUXT_APP_BASE_URL || '/'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  // Tipografía servida desde la propia web: sin peticiones a Google ni cookies de terceros.
  css: ['@fontsource-variable/inter-tight', '~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      // URL que recibe los formularios (p. ej. https://formspree.io/f/xxxx). Se fija con NUXT_PUBLIC_FORMS_ENDPOINT.
      formsEndpoint: '',
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
    // Las páginas públicas se prerenderizan para SEO.
    '/': { prerender: true },
    '/propietarios': { prerender: true },
    '/inquilinos': { prerender: true },
    '/herramientas/**': { prerender: true },
    '/dossier/propietarios': { prerender: true },
    '/dossier/inquilinos': { prerender: true },
  },
})
