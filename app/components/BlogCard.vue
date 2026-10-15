<script setup lang="ts">
import type { BlogPostSummary } from '#shared/utils/blog'

defineProps<{ post: BlogPostSummary }>()
const date = (d: string) => new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(`${d}T12:00:00`))
</script>

<template>
  <NuxtLink :to="`/blog/${post.slug}`" class="post card">
    <div class="meta">
      <span class="badge" :class="post.audience === 'propietarios' ? 'b-owner' : 'b-tenant'">{{ AUDIENCES[post.audience] }}</span>
      <span class="small muted">{{ post.category }}</span>
    </div>
    <h3>{{ post.title }}</h3>
    <p class="muted small">{{ post.excerpt }}</p>
    <div class="foot small muted">
      <span>{{ date(post.publishedAt) }} · {{ post.readingMinutes }} min de lectura</span>
      <AppIcon name="arrow" :size="18" class="go" />
    </div>
  </NuxtLink>
</template>

<style scoped>
.post { display: flex; flex-direction: column; gap: 10px; text-decoration: none; color: inherit; transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s; }
.post:hover { transform: translateY(-3px); box-shadow: var(--shadow-lg); border-color: transparent; }
.meta { display: flex; align-items: center; gap: 10px; }
.b-owner { background: var(--ink); color: var(--lime); }
.b-tenant { background: var(--lime); color: var(--ink); }
h3 { font-size: 1.2rem; margin: 4px 0 0; }
p { margin: 0; }
.foot { margin-top: auto; padding-top: 10px; display: flex; justify-content: space-between; align-items: center; }
.go { color: var(--muted); transition: transform 0.2s, color 0.2s; }
.post:hover .go { transform: translateX(3px); color: var(--ink); }
</style>
