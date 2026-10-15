<script setup lang="ts">
import type { BlogPost, BlogPostSummary } from '#shared/utils/blog'

definePageMeta({ layout: 'admin', middleware: 'admin' })

const { data: posts, refresh } = await useFetch<BlogPostSummary[]>('/api/admin/blog', { default: () => [] })
const filter = ref<'todos' | 'propietarios' | 'inquilinos' | 'borradores'>('todos')
const q = ref('')
const busy = ref<string | null>(null)
const showImporter = ref(false)

const visible = computed(() => {
  const term = q.value.trim().toLowerCase()
  return posts.value.filter(p =>
    (filter.value === 'todos' ? true : filter.value === 'borradores' ? !p.published : p.audience === filter.value)
    && (!term || p.title.toLowerCase().includes(term) || p.category.toLowerCase().includes(term) || p.slug.includes(term)))
})

const date = (d: string) => new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(`${d}T12:00:00`))

// Selección múltiple para acciones en bloque.
const selected = ref<Set<string>>(new Set())
const allVisibleSelected = computed(() => visible.value.length > 0 && visible.value.every(p => selected.value.has(p.slug)))
function toggle(slug: string) {
  const s = new Set(selected.value)
  if (s.has(slug)) s.delete(slug)
  else s.add(slug)
  selected.value = s
}
function toggleAll() {
  selected.value = allVisibleSelected.value ? new Set() : new Set(visible.value.map(p => p.slug))
}
watch(filter, () => { selected.value = new Set() })

const progress = ref<{ done: number; total: number; label: string } | null>(null)

async function setPublished(slug: string, published: boolean) {
  const full = await $fetch<BlogPost>(`/api/admin/blog/${slug}`)
  if (full.published !== published) await $fetch(`/api/admin/blog/${slug}`, { method: 'PUT', body: { ...full, published } })
}

async function bulk(action: 'publicar' | 'ocultar' | 'borrar') {
  const slugs = [...selected.value]
  if (!slugs.length) return
  if (action === 'borrar' && !confirm(`¿Borrar ${slugs.length} artículo(s)? No se puede deshacer.`)) return
  const labels = { publicar: 'Publicando', ocultar: 'Ocultando', borrar: 'Borrando' }
  progress.value = { done: 0, total: slugs.length, label: labels[action] }
  const failed: string[] = []
  for (const slug of slugs) {
    try {
      if (action === 'borrar') await $fetch(`/api/admin/blog/${slug}`, { method: 'DELETE' })
      else await setPublished(slug, action === 'publicar')
    }
    catch {
      failed.push(slug)
    }
    progress.value.done++
  }
  progress.value = null
  selected.value = new Set(failed)
  await refresh()
  if (failed.length) alert(`No se pudieron procesar: ${failed.join(', ')}`)
}

async function togglePublished(p: BlogPostSummary) {
  busy.value = p.slug
  try {
    await setPublished(p.slug, !p.published)
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

// Arrastrar archivos sobre cualquier parte de la página abre el importador.
function onPageDragEnter(e: DragEvent) {
  if (e.dataTransfer?.types?.includes('Files')) showImporter.value = true
}
</script>

<template>
  <div @dragenter="onPageDragEnter">
    <div class="head">
      <div>
        <h1>Blog</h1>
        <p class="muted">{{ posts.filter(p => p.published).length }} publicados · {{ posts.filter(p => !p.published).length }} borradores</p>
      </div>
      <div class="head-actions">
        <button type="button" class="btn btn-ghost btn-sm" :aria-expanded="showImporter" @click="showImporter = !showImporter">
          <AppIcon name="file" :size="16" /> {{ showImporter ? 'Cerrar importación' : 'Importar archivos' }}
        </button>
        <NuxtLink to="/admin/blog/nuevo" class="btn btn-primary btn-sm">Nuevo artículo</NuxtLink>
      </div>
    </div>

    <AdminBlogImporter v-if="showImporter" :existing="posts" @imported="refresh()" />

    <div class="toolbar">
      <div class="tabs" role="tablist">
        <button v-for="t in (['todos', 'propietarios', 'inquilinos', 'borradores'] as const)" :key="t" type="button" role="tab" :aria-selected="filter === t" :class="{ on: filter === t }" @click="filter = t">
          {{ { todos: 'Todos', propietarios: 'Propietarios', inquilinos: 'Inquilinos', borradores: 'Borradores' }[t] }}
        </button>
      </div>
      <input v-model="q" class="input search" type="search" placeholder="Buscar por título o categoría…" aria-label="Buscar artículos">
    </div>

    <div v-if="selected.size || progress" class="bulk" role="region" aria-label="Acciones en bloque">
      <template v-if="progress">
        <span>{{ progress.label }} {{ progress.done }} de {{ progress.total }}…</span>
        <span class="bulk-bar"><span :style="{ width: `${(progress.done / progress.total) * 100}%` }" /></span>
      </template>
      <template v-else>
        <strong>{{ selected.size }} seleccionado(s)</strong>
        <button type="button" class="btn btn-sm btn-primary" @click="bulk('publicar')">Publicar</button>
        <button type="button" class="btn btn-sm btn-ghost light" @click="bulk('ocultar')">Pasar a borrador</button>
        <button type="button" class="btn btn-sm btn-ghost light danger-btn" @click="bulk('borrar')">Borrar</button>
        <button type="button" class="link light" @click="selected = new Set()">Quitar selección</button>
      </template>
    </div>

    <div class="table-wrap">
      <table class="table">
        <thead>
          <tr>
            <th class="check"><input type="checkbox" :checked="allVisibleSelected" :indeterminate="selected.size > 0 && !allVisibleSelected" aria-label="Seleccionar todos" @change="toggleAll"></th>
            <th>Título</th><th>Público</th><th>Fecha</th><th>Estado</th><th class="num">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="!visible.length"><td colspan="6" class="muted">No hay artículos con este filtro.</td></tr>
          <tr v-for="p in visible" :key="p.slug" :class="{ busy: busy === p.slug, sel: selected.has(p.slug) }">
            <td class="check"><input type="checkbox" :checked="selected.has(p.slug)" :aria-label="`Seleccionar ${p.title}`" @change="toggle(p.slug)"></td>
            <td>
              <NuxtLink :to="`/admin/blog/${p.slug}`" class="title">{{ p.title }}</NuxtLink>
              <span class="small muted slug">/blog/{{ p.slug }} · {{ p.category }} · {{ p.readingMinutes }} min</span>
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
.head-actions { display: flex; gap: 8px; flex-wrap: wrap; }
.toolbar { display: flex; gap: 12px; flex-wrap: wrap; align-items: center; margin-bottom: 16px; }
.tabs { display: inline-flex; gap: 4px; padding: 4px; background: #fff; border: 1px solid var(--line); border-radius: 999px; flex-wrap: wrap; }
.tabs button { font: inherit; font-size: 0.9rem; border: 0; background: transparent; border-radius: 999px; padding: 8px 14px; cursor: pointer; color: var(--muted); }
.tabs button.on { background: var(--ink); color: #fff; }
.search { max-width: 300px; }
.bulk {
  position: sticky; top: 12px; z-index: 5; display: flex; gap: 10px; align-items: center; flex-wrap: wrap;
  background: var(--black); color: #fff; border-radius: 14px; padding: 10px 14px; margin-bottom: 12px; box-shadow: var(--shadow-lg);
}
.bulk-bar { flex: 1; min-width: 120px; height: 6px; background: #333; border-radius: 99px; overflow: hidden; }
.bulk-bar span { display: block; height: 100%; background: var(--lime); transition: width 0.2s; }
.light { color: #fff; border-color: #444; }
.danger-btn { color: #ff8a80; }
.check { width: 36px; }
tr.sel td { background: var(--lime-soft) !important; }
.title { font-weight: 600; text-decoration: none; display: block; }
.title:hover { text-decoration: underline; }
.slug { display: block; }
.nowrap { white-space: nowrap; }
.actions { white-space: nowrap; }
.actions > * { margin-left: 12px; font-size: 0.9rem; }
.link { font: inherit; font-size: 0.9rem; background: none; border: 0; color: var(--ink); text-decoration: underline; cursor: pointer; padding: 0; }
.link.light { color: #cfcfcf; }
.danger { color: var(--danger); }
tr.busy { opacity: 0.5; }
</style>
