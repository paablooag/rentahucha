import { InferSeoMetaPlugin } from '@unhead/vue/plugins'

// og:title y og:description se rellenan solos con el título y la descripción de cada página
// (para que los enlaces compartidos en WhatsApp, LinkedIn o Facebook se vean bien). Las páginas que los definen ganan.
export default defineNuxtPlugin(() => {
  injectHead().use(InferSeoMetaPlugin())
})
