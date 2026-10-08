// En GitHub Pages la web cuelga de /rentahucha/ (NUXT_APP_BASE_URL lo fija el workflow de despliegue).
const baseURL = process.env.NUXT_APP_BASE_URL || '/'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'es' },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#090909' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: `${baseURL.replace(/\/$/, '')}/favicon.svg` },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter+Tight:wght@300;400;500;600;700&display=swap',
        },
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
