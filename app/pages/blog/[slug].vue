<script setup lang="ts">
import type { BlogPostSummary } from '#shared/utils/blog'

type PostPage = BlogPostSummary & { html: string; related: BlogPostSummary[] }

const route = useRoute()
const { data: post, error } = await useFetch<PostPage>(() => `/api/blog/${route.params.slug}`)
if (error.value || !post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Artículo no encontrado', fatal: true })
}

const date = (d: string) => new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(`${d}T12:00:00`))

// CTA flotante en móvil: aparece al avanzar en el artículo, se oculta al llegar al CTA final y se puede cerrar.
const floating = useState('blog-cta-floating', () => true)
const showFloat = ref(false)
const endCta = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null
let endVisible = false
function onScroll() {
  showFloat.value = floating.value && !endVisible && window.scrollY > window.innerHeight * 0.8
}
onMounted(() => {
  try { if (sessionStorage.getItem('rh-cta-closed')) floating.value = false } catch {}
  observer = new IntersectionObserver(([e]) => { endVisible = !!e?.isIntersecting; onScroll() })
  if (endCta.value) observer.observe(endCta.value)
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => { observer?.disconnect(); window.removeEventListener('scroll', onScroll) })
function closeFloat() {
  floating.value = false
  showFloat.value = false
  try { sessionStorage.setItem('rh-cta-closed', '1') } catch {}
}
const floatCopy = computed(() => (post.value?.audience === 'propietarios'
  ? { text: 'Cobra tu alquiler cada mes, pase lo que pase', to: '/apuntate?tipo=propietario' }
  : { text: 'Alquila sin aval y ahorra con tu hucha', to: '/apuntate?tipo=inquilino' }))

useSeoMeta({
  title: () => post.value?.title ?? '',
  description: () => post.value?.excerpt ?? '',
  ogType: 'article',
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
        <article class="prose" v-html="post.html" />
        <aside class="side">
          <BlogCta :audience="post.audience" compact />
        </aside>
      </div>

      <div ref="endCta" class="container end">
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
