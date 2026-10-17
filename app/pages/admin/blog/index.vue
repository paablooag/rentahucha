<script setup lang="ts">
import type { BlogPost, BlogPostSummary } from '#shared/utils/blog'

definePageMeta({ layout: 'admin', middleware: 'admin' })

const { data: posts, refresh } = await useFetch<BlogPostSummary[]>('/api/admin/blog', { default: () => [] })
const filter = ref<'todos' | 'propietarios' | 'inquilinos' | 'inmobiliarias' | 'borradores' | 'programados'>('todos')
const q = ref('')
const busy = ref<string | null>(null)
const showImporter = ref(false)
const showAi = ref(false)

// Hoy en Madrid, la misma referencia que usa la web para mostrar o no un artículo programado.
const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Madrid' }).format(new Date())
const isScheduled = (p: BlogPostSummary) => p.published && p.publishedAt > today

const visible = computed(() => {
  const term = q.value.trim().toLowerCase()
  return posts.value.filter(p =>
    (filter.value === 'todos' ? true : filter.value === 'borradores' ? !p.published : filter.value === 'programados' ? isScheduled(p) : p.audience === filter.value)
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

// Al publicar un borrador con fecha pasada, sale con la fecha de hoy (si no, quedaría hundido en la lista).
async function setPublished(slug: string, published: boolean, publishedAt?: string) {
  const full = await $fetch<BlogPost>(`/api/admin/blog/${slug}`)
  const date = publishedAt ?? (published && !full.published && full.publishedAt < today ? today : full.publishedAt)
  if (full.published !== published || date !== full.publishedAt) {
    await $fetch(`/api/admin/blog/${slug}`, { method: 'PUT', body: { ...full, published, publishedAt: date } })
  }
}

// Programar en bloque: el primero sale en la fecha de inicio y el resto cada N días, en el orden de la lista.
const scheduling = ref(false)
const plan = reactive({ start: today, every: 1 })
function addDays(d: string, n: number) {
  const x = new Date(`${d}T12:00:00Z`)
  x.setUTCDate(x.getUTCDate() + n)
  return x.toISOString().slice(0, 10)
}
async function schedule() {
  const slugs = visible.value.map(p => p.slug).filter(s => selected.value.has(s))
  if (!slugs.length || !plan.start) return
  progress.value = { done: 0, total: slugs.length, label: 'Programando' }
  const failed: string[] = []
  for (const [i, slug] of slugs.entries()) {
    try {
      await setPublished(slug, true, addDays(plan.start, i * Math.max(1, plan.every)))
    }
    catch {
      failed.push(slug)
    }
    progress.value.done++
  }
  progress.value = null
  scheduling.value = false
  selected.value = new Set(failed)
  await refresh()
  if (failed.length) alert(`No se pudieron programar: ${failed.join(', ')}`)
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
        <p class="muted">{{ posts.filter(p => p.published && !isScheduled(p)).length }} publicados · {{ posts.filter(isScheduled).length }} programados · {{ posts.filter(p => !p.published).length }} borradores</p>
      </div>
      <div class="head-actions">
        <button type="button" class="btn btn-ghost btn-sm" :aria-expanded="showAi" @click="showAi = !showAi">
          <AppIcon name="spark" :size="16" /> {{ showAi ? 'Cerrar IA' : 'Crear con IA' }}
        </button>
        <button type="button" class="btn btn-ghost btn-sm" :aria-expanded="showImporter" @click="showImporter = !showImporter">
          <AppIcon name="file" :size="16" /> {{ showImporter ? 'Cerrar importación' : 'Importar archivos' }}
        </button>
        <NuxtLink to="/admin/blog/nuevo" class="btn btn-primary btn-sm">Nuevo artículo</NuxtLink>
      </div>
    </div>

    <AdminBlogAi v-if="showAi" @generated="refresh()" />
    <AdminBlogImporter v-if="showImporter" :existing="posts" @imported="refresh()" />

    <div class="toolbar">
      <div class="tabs" role="tablist">
        <button v-for="t in (['todos', 'propietarios', 'inquilinos', 'inmobiliarias', 'borradores', 'programados'] as const)" :key="t" type="button" role="tab" :aria-selected="filter === t" :class="{ on: filter === t }" @click="filter = t">
          {{ { todos: 'Todos', propietarios: 'Propietarios', inquilinos: 'Inquilinos', inmobiliarias: 'Inmobiliarias', borradores: 'Borradores', programados: 'Programados' }[t] }}
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
        <button type="button" class="btn btn-sm btn-primary" @click="bulk('publicar')">Publicar ya</button>
        <button type="button" class="btn btn-sm btn-ghost light" :aria-expanded="scheduling" @click="scheduling = !scheduling">Programar…</button>
        <button type="button" class="btn btn-sm btn-ghost light" @click="bulk('ocultar')">Pasar a borrador</button>
        <button type="button" class="btn btn-sm btn-ghost light danger-btn" @click="bulk('borrar')">Borrar</button>
        <button type="button" class="link light" @click="selected = new Set()">Quitar selección</button>
        <form v-if="scheduling" class="plan" @submit.prevent="schedule">
          <label>Desde <input v-model="plan.start" type="date" class="input mini" :min="today" required></label>
          <label>uno cada <input v-model.number="plan.every" type="number" min="1" max="60" class="input mini num-in"> día(s)</label>
          <button type="submit" class="btn btn-sm btn-primary">Programar {{ selected.size }}</button>
          <span class="small hint">Se publican solos en su fecha, en el orden de la lista.</span>
        </form>
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
              <span v-if="isScheduled(p)" class="badge badge-scheduled">Programado</span>
              <span v-else class="badge" :class="p.published ? '' : 'badge-muted'">{{ p.published ? 'Publicado' : 'Borrador' }}</span>
            </td>
            <td class="num actions">
              <NuxtLink :to="`/admin/blog/${p.slug}`">Editar</NuxtLink>
              <button type="button" class="link" :disabled="busy === p.slug" @click="togglePublished(p)">{{ p.published ? 'Ocultar' : 'Publicar' }}</button>
              <a v-if="p.published && !isScheduled(p)" :href="`/blog/${p.slug}`" target="_blank">Ver</a>
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
.plan { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; width: 100%; padding-top: 8px; border-top: 1px solid #333; }
.plan label { display: inline-flex; gap: 6px; align-items: center; font-size: 0.9rem; }
.mini { padding: 6px 10px; font-size: 0.9rem; width: auto; }
.num-in { width: 70px; }
.hint { color: #bdbdbd; }
.badge-scheduled { background: #dfe5ff; color: var(--ink); }
tr.busy { opacity: 0.5; }
</style>
