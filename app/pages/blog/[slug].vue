<script setup lang="ts">
import type { BlogPostSummary } from '#shared/utils/blog'

type PostPage = BlogPostSummary & { html: string; related: BlogPostSummary[]; toc: { id: string; text: string }[]; faq: { q: string; a: string }[] }

const route = useRoute()
const { data: post, error } = await useFetch<PostPage>(() => `/api/blog/${route.params.slug}`)
if (error.value || !post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Artículo no encontrado', fatal: true })
}

const date = (d: string) => new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(`${d}T12:00:00`))

// CTA flotante en móvil: visible siempre en el artículo; se puede cerrar y no vuelve en la visita.
const floating = useState('blog-cta-floating', () => true)
const showFloat = ref(false)
onMounted(() => {
  try { if (sessionStorage.getItem('rh-cta-closed')) floating.value = false } catch {}
  showFloat.value = floating.value
})
useHead({ bodyAttrs: { class: computed(() => (showFloat.value ? 'has-float-cta' : '')) } })

function closeFloat() {
  floating.value = false
  showFloat.value = false
  try { sessionStorage.setItem('rh-cta-closed', '1') } catch {}
}
const floatCopy = computed(() => (post.value?.audience === 'inmobiliarias'
  ? { text: '¿Eres inmobiliaria? Sube tus pisos', to: '/inmobiliarias#formulario' }
  : post.value?.audience === 'propietarios'
  ? { text: 'Inquilinos verificados y hucha anti-impago', to: '/apuntate?tipo=propietario#formulario' }
  : { text: 'Alquila sin aval y ahorra con tu hucha', to: '/apuntate?tipo=inquilino#formulario' }))

// Enlaces a las guías por ciudad que menciona el artículo (o a las principales), solo para propietarios e inmobiliarias.
const cityLinks = computed(() => {
  const p = post.value
  if (!p || p.audience === 'inquilinos') return []
  const text = `${p.title} ${p.html.replace(/<[^>]+>/g, ' ')}`
  const mentioned = CITIES.filter(c => c.name.split(' / ').some(n => new RegExp(`(^|[^\\p{L}])${n}([^\\p{L}]|$)`, 'u').test(text)))
  return (mentioned.length ? mentioned : CITIES.slice(0, 6)).slice(0, 8)
})

// En los artículos para propietarios e inmobiliarias que hablan del decreto de vivienda, la guía en PDF a cambio del correo.
const showGuia = computed(() => !!post.value && post.value.audience !== 'inquilinos' && /decreto/i.test(post.value.html))
// El artículo se parte antes del segundo apartado para intercalar una llamada a la acción (BlogInlineCta).
const parts = computed(() => {
  const html = post.value?.html ?? ''
  const first = html.indexOf('<h2')
  const second = first >= 0 ? html.indexOf('<h2', first + 3) : -1
  return second > 0 ? [html.slice(0, second), html.slice(second)] : [html, '']
})

// SEO: URL canónica, etiquetas para redes y datos estructurados (artículo, migas de pan y preguntas frecuentes).
const { brand } = useAppConfig()
const site = `https://${brand.domain}`
const url = computed(() => `${site}/blog/${post.value?.slug ?? ''}`)

useSeoMeta({
  title: () => post.value?.title ?? '',
  description: () => post.value?.excerpt ?? '',
  ogType: 'article',
  ogTitle: () => post.value?.title ?? '',
  ogDescription: () => post.value?.excerpt ?? '',
  ogUrl: () => url.value,
  articlePublishedTime: () => post.value?.publishedAt ?? '',
  articleModifiedTime: () => post.value?.updatedAt ?? '',
  articleSection: () => post.value?.category ?? '',
  twitterCard: 'summary',
  twitterTitle: () => post.value?.title ?? '',
  twitterDescription: () => post.value?.excerpt ?? '',
})

const jsonLd = computed(() => {
  const p = post.value
  if (!p) return []
  const org = { '@type': 'Organization', name: brand.name, url: site, logo: { '@type': 'ImageObject', url: `${site}/favicon.svg` } }
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'BlogPosting',
      headline: p.title,
      description: p.excerpt,
      datePublished: p.publishedAt,
      dateModified: (p.updatedAt || p.publishedAt).slice(0, 10),
      inLanguage: 'es-ES',
      articleSection: p.category,
      wordCount: p.readingMinutes * 220,
      mainEntityOfPage: url.value,
      url: url.value,
      author: org,
      publisher: org,
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: site },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${site}/blog` },
        { '@type': 'ListItem', position: 3, name: `Blog para ${AUDIENCES[p.audience].toLowerCase()}`, item: `${site}/blog?para=${p.audience}` },
        { '@type': 'ListItem', position: 4, name: p.title, item: url.value },
      ],
    },
  ]
  if (p.faq.length) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: p.faq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    })
  }
  return graph
})

useHead({
  // Los títulos largos van sin « · RentaHucha» para que Google no los corte en los resultados.
  titleTemplate: (t?: string) => (t && t.length > 55 ? t : `${t} · ${brand.name}`),
  link: [{ rel: 'canonical', href: url }],
  script: [{ type: 'application/ld+json', innerHTML: computed(() => JSON.stringify({ '@context': 'https://schema.org', '@graph': jsonLd.value })) }],
})
</script>

<template>
  <div v-if="post">
    <section class="hero">
      <div class="container head">
        <NuxtLink :to="`/blog?para=${post.audience}`" class="back">← Blog para {{ AUDIENCES[post.audience].toLowerCase() }}</NuxtLink>
        <span class="eyebrow">{{ post.category }}</span>
        <h1>{{ post.title }}</h1>
        <p class="lead">{{ post.excerpt }}</p>
        <p class="meta">{{ date(post.publishedAt) }} · {{ post.readingMinutes }} min de lectura</p>
      </div>
    </section>

    <section class="section">
      <div class="container layout">
        <div class="main">
          <details v-if="post.toc.length >= 4" class="toc" open>
            <summary>En este artículo</summary>
            <ol>
              <li v-for="t in post.toc" :key="t.id"><a :href="`#${t.id}`">{{ t.text }}</a></li>
            </ol>
          </details>
          <article class="prose" v-html="parts[0]" />
          <BlogInlineCta v-if="parts[1]" :audience="post.audience" :slug="post.slug" />
          <article v-if="parts[1]" class="prose" v-html="parts[1]" />
          <GuiaDecretoDownload v-if="showGuia" />
        </div>
        <aside class="side">
          <BlogCta :audience="post.audience" compact />
        </aside>
      </div>

      <div class="container end">
        <nav v-if="cityLinks.length" class="city-links" aria-label="Guías por ciudad">
          <strong>Alquilar tu piso en tu ciudad:</strong>
          <NuxtLink v-for="c in cityLinks" :key="c.slug" :to="`/alquilar-mi-piso/${c.slug}`">{{ c.name }}</NuxtLink>
          <NuxtLink to="/alquilar-mi-piso" class="all">Todas las guías →</NuxtLink>
        </nav>
        <BlogCta :audience="post.audience" />
      </div>

      <div v-if="post.related.length" class="container related">
        <h2>Sigue leyendo</h2>
        <div class="grid grid-3">
          <BlogCard v-for="p in post.related" :key="p.slug" :post="p" />
        </div>
      </div>
    </section>

    <Transition name="float">
      <div v-if="showFloat" class="float-cta" role="complementary" aria-label="Lista de espera">
        <NuxtLink :to="floatCopy.to" class="float-link">
          <span>{{ floatCopy.text }}</span>
          <strong>Apúntate <AppIcon name="arrow" :size="16" /></strong>
        </NuxtLink>
        <button type="button" class="float-close" aria-label="Cerrar" @click="closeFloat">×</button>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.hero { padding-bottom: 72px; }
.head { max-width: 860px; }
.back { display: inline-block; color: #a8a8a8; text-decoration: none; margin-bottom: 20px; font-size: 0.92rem; }
.back:hover { color: #fff; }
.hero h1 { font-size: clamp(2.2rem, 5vw, 3.6rem); }
.meta { color: #8d8a8a; font-size: 0.9rem; margin: 0; }
.layout { display: grid; grid-template-columns: minmax(0, 1fr); gap: 40px; align-items: start; }
@media (min-width: 1000px) { .layout { grid-template-columns: minmax(0, 1fr) 320px; } .side { position: sticky; top: 110px; } }
@media (max-width: 999px) { .side { display: none; } }
.end { margin-top: 56px; }
.main { min-width: 0; max-width: 720px; }
.toc { background: var(--off); border-radius: 16px; padding: 16px 20px; margin-bottom: 32px; }
.toc summary { cursor: pointer; font-weight: 600; color: var(--ink); }
.toc ol { margin: 12px 0 2px; padding-left: 1.3em; display: grid; gap: 6px; font-size: 0.95rem; }
.toc a { color: var(--ink); text-decoration: none; }
.toc a:hover { text-decoration: underline; text-decoration-color: var(--lime); text-decoration-thickness: 3px; }
.prose :deep(h2),
.prose :deep(h3) { scroll-margin-top: 8px; }
.related { margin-top: 72px; }
.related h2 { font-size: 2rem; margin-bottom: 24px; }

/* Contenido en Markdown */
.prose { max-width: 720px; font-size: 1.08rem; line-height: 1.7; }
.prose :deep(h2) { font-size: 1.75rem; margin: 2em 0 0.6em; }
.prose :deep(h3) { font-size: 1.25rem; margin: 1.6em 0 0.5em; }
.prose :deep(p) { margin: 0 0 1.1em; }
.prose :deep(ul),
.prose :deep(ol) { padding-left: 1.3em; margin: 0 0 1.2em; }
.prose :deep(li) { margin-bottom: 0.4em; }
.prose :deep(li::marker) { color: var(--ink); font-weight: 600; }
.prose :deep(strong) { font-weight: 600; }
.prose :deep(a) { color: var(--ink); text-decoration-color: var(--lime); text-decoration-thickness: 3px; text-underline-offset: 3px; }
.prose :deep(.table-scroll) { margin: 1.4em 0; overflow-x: auto; border: 1px solid var(--line); border-radius: 14px; -webkit-overflow-scrolling: touch; }
.prose :deep(table) { width: 100%; border-collapse: separate; border-spacing: 0; font-size: 0.95rem; }
.prose :deep(th),
.prose :deep(td) { padding: 11px 14px; text-align: left; vertical-align: top; border-bottom: 1px solid var(--line); min-width: 90px; }
.prose :deep(th) { background: var(--ink); color: #fff; font-weight: 500; }
.prose :deep(tr:last-child td) { border-bottom: 0; }
.prose :deep(tbody tr:nth-child(even) td) { background: #fbfbfb; }
.prose :deep(blockquote) { margin: 1.4em 0; padding: 16px 20px; background: var(--lime-soft); border-radius: 14px; }
@media (max-width: 640px) {
  .prose { font-size: 1.02rem; }
  .prose :deep(th),
  .prose :deep(td) { white-space: normal; padding: 10px 12px; }
  .prose :deep(table) { font-size: 0.9rem; }
  /* Tablas de 3 o más columnas: cada fila pasa a ser una ficha con «columna: valor». */
  .prose :deep(.table-scroll:has(table.stack)) { border: 0; border-radius: 0; overflow: visible; }
  .prose :deep(table.stack thead) { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
  .prose :deep(table.stack),
  .prose :deep(table.stack tbody),
  .prose :deep(table.stack tr),
  .prose :deep(table.stack td) { display: block; width: 100%; }
  .prose :deep(table.stack tr) { border: 1px solid var(--line); border-radius: 14px; overflow: hidden; margin-bottom: 10px; background: #fff; }
  .prose :deep(table.stack tbody tr:nth-child(even) td) { background: transparent; }
  .prose :deep(table.stack td) { display: flex; justify-content: space-between; gap: 16px; text-align: right; border-bottom: 1px solid var(--line); }
  .prose :deep(table.stack td::before) { content: attr(data-label); text-align: left; color: var(--muted); font-weight: 400; flex: 0 0 45%; }
  .prose :deep(table.stack td:first-child) { display: block; text-align: left; background: var(--ink) !important; color: #fff; font-weight: 600; }
  .prose :deep(table.stack td:first-child::before) { content: none; }
  .prose :deep(table.stack td:last-child) { border-bottom: 0; }
}

/* CTA flotante (solo móvil) */
.float-cta { display: none; }
@media (max-width: 999px) {
  .float-cta {
    position: fixed; left: 12px; right: 12px; bottom: calc(12px + env(safe-area-inset-bottom)); z-index: 40;
    display: flex; align-items: center; gap: 4px; padding: 6px 6px 6px 16px;
    background: var(--black); color: #fff; border-radius: 999px; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  }
  .float-link { flex: 1; display: flex; align-items: center; justify-content: space-between; gap: 10px; color: #fff; text-decoration: none; min-width: 0; }
  .float-link span { font-size: 0.86rem; line-height: 1.25; color: #e4e4e4; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
  .float-link strong { flex: none; display: inline-flex; align-items: center; gap: 4px; background: var(--lime); color: var(--ink); font-weight: 500; font-size: 0.88rem; padding: 9px 14px; border-radius: 999px; }
  .float-close { flex: none; width: 32px; height: 32px; border: 0; background: transparent; color: #9a9a9a; font-size: 1.3rem; line-height: 1; cursor: pointer; border-radius: 50%; }
  .float-close:hover { color: #fff; }
}
.float-enter-active,
.float-leave-active { transition: transform 0.25s ease, opacity 0.25s ease; }
.float-enter-from,
.float-leave-to { transform: translateY(16px); opacity: 0; }
@media (prefers-reduced-motion: reduce) { .float-enter-active, .float-leave-active { transition: none; } }
</style>

<style>
/* Hueco al final de la página para que la barra flotante no tape el pie en móvil. */
@media (max-width: 999px) { body.has-float-cta .footer { padding-bottom: calc(96px + env(safe-area-inset-bottom)); } }
.city-links { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; margin-bottom: 20px; font-size: 0.92rem; }
.city-links strong { margin-right: 4px; }
.city-links a { padding: 6px 12px; border-radius: 999px; border: 1px solid var(--line); color: var(--ink); text-decoration: none; background: #fff; }
.city-links a:hover { border-color: var(--green); }
.city-links a.all { border-color: transparent; background: none; text-decoration: underline; }
</style>
