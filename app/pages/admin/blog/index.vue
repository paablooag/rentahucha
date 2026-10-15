<script setup lang="ts">
import type { BlogPost, BlogPostSummary } from '#shared/utils/blog'

definePageMeta({ layout: 'admin', middleware: 'admin' })

const { data: posts, refresh } = await useFetch<BlogPostSummary[]>('/api/admin/blog', { default: () => [] })
const filter = ref<'todos' | 'propietarios' | 'inquilinos' | 'borradores'>('todos')
const busy = ref<string | null>(null)

const visible = computed(() => posts.value.filter(p =>
  filter.value === 'todos' ? true : filter.value === 'borradores' ? !p.published : p.audience === filter.value))

const date = (d: string) => new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(`${d}T12:00:00`))

async function togglePublished(p: BlogPostSummary) {
  busy.value = p.slug
  try {
    const full = await $fetch<BlogPost>(`/api/admin/blog/${p.slug}`)
    await $fetch(`/api/admin/blog/${p.slug}`, { method: 'PUT', body: { ...full, published: !full.published } })
    await refresh()
  }
  finally {
    busy.value = null
  }
}

async function remove(p: BlogPostSummary) {
  if (!confirm(`¿Borrar «${p.title}»? No se puede deshacer.`)) return
  busy.value = p.slug
  try {
    await $fetch(`/api/admin/blog/${p.slug}`, { method: 'DELETE' })
    await refresh()
  }
  finally {
    busy.value = null
  }
}
</script>

<template>
  <div>
    <div class="head">
      <div>
        <h1>Blog</h1>
        <p class="muted">{{ posts.filter(p => p.published).length }} publicados · {{ posts.filter(p => !p.published).length }} borradores</p>
      </div>
      <NuxtLink to="/admin/blog/nuevo" class="btn btn-primary btn-sm">Nuevo artículo</NuxtLink>
    </div>

    <div class="tabs" role="tablist">
      <button v-for="t in (['todos', 'propietarios', 'inquilinos', 'borradores'] as const)" :key="t" type="button" role="tab" :aria-selected="filter === t" :class="{ on: filter === t }" @click="filter = t">
        {{ { todos: 'Todos', propietarios: 'Propietarios', inquilinos: 'Inquilinos', borradores: 'Borradores' }[t] }}
      </button>
    </div>

    <div class="table-wrap">
      <table class="table">
        <thead><tr><th>Título</th><th>Público</th><th>Fecha</th><th>Estado</th><th class="num">Acciones</th></tr></thead>
        <tbody>
          <tr v-if="!visible.length"><td colspan="5" class="muted">No hay artículos con este filtro.</td></tr>
          <tr v-for="p in visible" :key="p.slug" :class="{ busy: busy === p.slug }">
            <td>
              <NuxtLink :to="`/admin/blog/${p.slug}`" class="title">{{ p.title }}</NuxtLink>
              <span class="small muted slug">/blog/{{ p.slug }} · {{ p.readingMinutes }} min</span>
            </td>
            <td>{{ AUDIENCES[p.audience] }}</td>
            <td class="nowrap">{{ date(p.publishedAt) }}</td>
            <td>
              <span class="badge" :class="p.published ? '' : 'badge-muted'">{{ p.published ? 'Publicado' : 'Borrador' }}</span>
            </td>
            <td class="num actions">
              <NuxtLink :to="`/admin/blog/${p.slug}`">Editar</NuxtLink>
              <button type="button" class="link" :disabled="busy === p.slug" @click="togglePublished(p)">{{ p.published ? 'Ocultar' : 'Publicar' }}</button>
              <a v-if="p.published" :href="`/blog/${p.slug}`" target="_blank">Ver</a>
              <button type="button" class="link danger" :disabled="busy === p.slug" @click="remove(p)">Borrar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.head { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; flex-wrap: wrap; margin-bottom: 20px; }
h1 { font-size: 2.2rem; margin-bottom: 4px; }
.head p { margin: 0; }
.tabs { display: inline-flex; gap: 4px; padding: 4px; background: #fff; border: 1px solid var(--line); border-radius: 999px; margin-bottom: 16px; flex-wrap: wrap; }
.tabs button { font: inherit; font-size: 0.9rem; border: 0; background: transparent; border-radius: 999px; padding: 8px 14px; cursor: pointer; color: var(--muted); }
.tabs button.on { background: var(--ink); color: #fff; }
.title { font-weight: 600; text-decoration: none; display: block; }
.title:hover { text-decoration: underline; }
.slug { display: block; }
.nowrap { white-space: nowrap; }
.actions { white-space: nowrap; }
.actions > * { margin-left: 12px; font-size: 0.9rem; }
.link { font: inherit; font-size: 0.9rem; background: none; border: 0; color: var(--ink); text-decoration: underline; cursor: pointer; padding: 0; }
.danger { color: var(--danger); }
tr.busy { opacity: 0.5; }
</style>
