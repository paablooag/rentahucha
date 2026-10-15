<script setup lang="ts">
import type { BlogPostSummary } from '#shared/utils/blog'

type PostPage = BlogPostSummary & { html: string; related: BlogPostSummary[] }

const route = useRoute()
const { data: post, error } = await useFetch<PostPage>(() => `/api/blog/${route.params.slug}`)
if (error.value || !post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Artículo no encontrado', fatal: true })
}

const date = (d: string) => new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(`${d}T12:00:00`))

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

      <div class="container end">
        <BlogCta :audience="post.audience" />
      </div>

      <div v-if="post.related.length" class="container related">
        <h2>Sigue leyendo</h2>
        <div class="grid grid-3">
          <BlogCard v-for="p in post.related" :key="p.slug" :post="p" />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero { padding-bottom: 72px; }
.head { max-width: 860px; }
.back { display: inline-block; color: #a8a8a8; text-decoration: none; margin-bottom: 20px; font-size: 0.92rem; }
.back:hover { color: #fff; }
.hero h1 { font-size: clamp(2.2rem, 5vw, 3.6rem); }
.meta { color: #8d8a8a; font-size: 0.9rem; margin: 0; }
.layout { display: grid; gap: 40px; align-items: start; }
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
.prose :deep(table) { width: 100%; border-collapse: separate; border-spacing: 0; margin: 1.4em 0; font-size: 0.95rem; border: 1px solid var(--line); border-radius: 14px; overflow: hidden; display: block; overflow-x: auto; }
.prose :deep(th),
.prose :deep(td) { padding: 11px 14px; text-align: left; border-bottom: 1px solid var(--line); white-space: nowrap; }
.prose :deep(th) { background: var(--ink); color: #fff; font-weight: 500; }
.prose :deep(tr:last-child td) { border-bottom: 0; }
.prose :deep(tbody tr:nth-child(even) td) { background: #fbfbfb; }
.prose :deep(blockquote) { margin: 1.4em 0; padding: 16px 20px; background: var(--lime-soft); border-radius: 14px; }
@media (max-width: 640px) { .prose :deep(th), .prose :deep(td) { white-space: normal; } }
</style>
