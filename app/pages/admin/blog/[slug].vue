<script setup lang="ts">
import type { BlogPost } from '#shared/utils/blog'

definePageMeta({ layout: 'admin', middleware: 'admin' })

const route = useRoute()
const isNew = computed(() => route.params.slug === 'nuevo')

const empty = () => ({
  title: '',
  slug: '',
  excerpt: '',
  audience: 'propietarios' as BlogPost['audience'],
  category: '',
  publishedAt: new Date().toISOString().slice(0, 10),
  published: false,
  body: '## Primer apartado\n\nEscribe aquí el artículo en Markdown.\n\n| Columna | Columna |\n|---|---|\n| Dato | Dato |\n',
})

const post = reactive(empty())
const originalSlug = ref<string | null>(null)
const slugTouched = ref(false)
const errors = ref<Record<string, string>>({})
const saving = ref(false)
const savedAt = ref<string | null>(null)
const serverError = ref<string | null>(null)
const tab = ref<'editar' | 'vista'>('editar')
const previewHtml = ref('')
const dirty = ref(false)

if (!isNew.value) {
  const data = await $fetch<BlogPost>(`/api/admin/blog/${route.params.slug}`).catch(() => null)
  if (!data) throw createError({ statusCode: 404, statusMessage: 'Artículo no encontrado', fatal: true })
  Object.assign(post, data)
  originalSlug.value = data.slug
  slugTouched.value = true
}
watch(post, () => { dirty.value = true }, { deep: true })
nextTick(() => { dirty.value = false })

// En artículos nuevos, la URL se genera desde el título hasta que la toques a mano.
watch(() => post.title, (t) => { if (!slugTouched.value) post.slug = slugify(t) })

async function showPreview() {
  tab.value = 'vista'
  const res = await $fetch<{ html: string }>('/api/admin/preview', { method: 'POST', body: { body: post.body } })
  previewHtml.value = res.html
}

const words = computed(() => post.body.split(/\s+/).filter(Boolean).length)

const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Madrid' }).format(new Date())
const scheduled = computed(() => post.published && post.publishedAt > today)

async function save(publish?: boolean) {
  // Un borrador con fecha pasada que se publica ahora sale con la fecha de hoy; una fecha futura lo deja programado.
  if (publish && !post.published && post.publishedAt < today) post.publishedAt = today
  if (publish !== undefined) post.published = publish
  saving.value = true
  errors.value = {}
  serverError.value = null
  try {
    const saved = isNew.value || !originalSlug.value
      ? await $fetch<BlogPost>('/api/admin/blog', { method: 'POST', body: post })
      : await $fetch<BlogPost>(`/api/admin/blog/${originalSlug.value}`, { method: 'PUT', body: post })
    Object.assign(post, saved)
    savedAt.value = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    await nextTick()
    dirty.value = false
    if (saved.slug !== originalSlug.value) {
      originalSlug.value = saved.slug
      await navigateTo(`/admin/blog/${saved.slug}`, { replace: true })
    }
  }
  catch (e: unknown) {
    const err = e as { statusCode?: number; data?: { data?: { errors?: Record<string, string> }; statusMessage?: string } }
    if (err.data?.data?.errors) errors.value = err.data.data.errors
    else serverError.value = err.data?.statusMessage ?? 'No se ha podido guardar.'
  }
  finally {
    saving.value = false
  }
}

// Insertar formato sin salir del teclado.
const bodyEl = ref<HTMLTextAreaElement | null>(null)
function insert(before: string, after = '', placeholder = 'texto') {
  const el = bodyEl.value
  if (!el) return
  const { selectionStart: s, selectionEnd: e } = el
  const selected = post.body.slice(s, e) || placeholder
  post.body = post.body.slice(0, s) + before + selected + after + post.body.slice(e)
  nextTick(() => {
    el.focus()
    el.setSelectionRange(s + before.length, s + before.length + selected.length)
  })
}

onBeforeRouteLeave(() => (dirty.value ? confirm('Hay cambios sin guardar. ¿Salir igualmente?') : true))
if (import.meta.client) {
  const warn = (e: BeforeUnloadEvent) => { if (dirty.value) e.preventDefault() }
  onMounted(() => window.addEventListener('beforeunload', warn))
  onBeforeUnmount(() => window.removeEventListener('beforeunload', warn))
}
</script>

<template>
  <div class="editor">
    <div class="head">
      <div>
        <NuxtLink to="/admin/blog" class="back">← Artículos</NuxtLink>
        <h1>{{ isNew && !originalSlug ? 'Nuevo artículo' : 'Editar artículo' }}</h1>
        <p class="muted small">
          <span class="badge" :class="post.published ? '' : 'badge-muted'">{{ scheduled ? `Programado para el ${post.publishedAt.split('-').reverse().join('/')}` : post.published ? 'Publicado' : 'Borrador' }}</span>
          <span v-if="savedAt"> · Guardado a las {{ savedAt }}</span>
          <span v-if="dirty"> · Cambios sin guardar</span>
        </p>
      </div>
      <div class="actions">
        <a v-if="post.published && originalSlug" :href="`/blog/${originalSlug}`" target="_blank" class="btn btn-ghost btn-sm">Ver en la web</a>
        <button type="button" class="btn btn-ghost btn-sm" :disabled="saving" @click="save(false)">{{ post.published ? 'Pasar a borrador' : 'Guardar borrador' }}</button>
        <button type="button" class="btn btn-primary btn-sm" :disabled="saving" @click="save(true)">{{ saving ? 'Guardando…' : post.published ? 'Guardar' : post.publishedAt > today ? 'Programar' : 'Publicar' }}</button>
      </div>
    </div>

    <p v-if="serverError" class="err" role="alert">{{ serverError }}</p>

    <div class="cols">
      <div class="main card">
        <div class="field">
          <label for="pe-title">Título</label>
          <input id="pe-title" v-model="post.title" class="input big" :aria-invalid="!!errors.title">
          <span v-if="errors.title" class="err">{{ errors.title }}</span>
        </div>
        <div class="field">
          <label for="pe-excerpt">Resumen <span class="muted">(se ve en el listado y en Google)</span></label>
          <textarea id="pe-excerpt" v-model="post.excerpt" class="textarea" rows="2" maxlength="300" :aria-invalid="!!errors.excerpt" />
          <span class="hint">{{ post.excerpt.length }}/300</span>
          <span v-if="errors.excerpt" class="err">{{ errors.excerpt }}</span>
        </div>

        <div class="body-head">
          <div class="tabs" role="tablist">
            <button type="button" role="tab" :aria-selected="tab === 'editar'" :class="{ on: tab === 'editar' }" @click="tab = 'editar'">Editar</button>
            <button type="button" role="tab" :aria-selected="tab === 'vista'" :class="{ on: tab === 'vista' }" @click="showPreview">Vista previa</button>
          </div>
          <div v-if="tab === 'editar'" class="tools" aria-label="Formato">
            <button type="button" title="Subtítulo" @click="insert('\n## ', '\n', 'Subtítulo')">H2</button>
            <button type="button" title="Negrita" @click="insert('**', '**')"><b>B</b></button>
            <button type="button" title="Lista" @click="insert('\n- ', '', 'elemento')">• Lista</button>
            <button type="button" title="Enlace" @click="insert('[', '](/apuntate)', 'texto del enlace')">Enlace</button>
            <button type="button" title="Tabla" @click="insert('\n| Concepto | Importe |\n|---|---|\n| ', ' | 0 € |\n', 'Dato')">Tabla</button>
          </div>
        </div>
        <textarea v-show="tab === 'editar'" ref="bodyEl" v-model="post.body" class="textarea body" :aria-invalid="!!errors.body" aria-label="Contenido en Markdown" />
        <article v-show="tab === 'vista'" class="preview prose" v-html="previewHtml" />
        <span class="hint">{{ words }} palabras · unos {{ readingMinutes(post.body) }} min de lectura. Al final del artículo se añade solo una llamada al formulario según el público.</span>
        <span v-if="errors.body" class="err">{{ errors.body }}</span>
      </div>

      <aside class="side card">
        <div class="field">
          <label for="pe-audience">Público</label>
          <select id="pe-audience" v-model="post.audience" class="select">
            <option v-for="(label, key) in AUDIENCES" :key="key" :value="key">{{ label }}</option>
          </select>
          <span class="hint">Decide la llamada a la acción: formulario de propietario, de inquilino o de inmobiliaria.</span>
        </div>
        <div class="field">
          <label for="pe-category">Categoría</label>
          <input id="pe-category" v-model="post.category" class="input" placeholder="Impagos, Legal, Ahorro…">
        </div>
        <div class="field">
          <label for="pe-date">Fecha de publicación</label>
          <input id="pe-date" v-model="post.publishedAt" class="input" type="date">
          <span class="hint">Con una fecha futura, el botón pasa a «Programar»: el artículo se publica solo ese día.</span>
        </div>
        <div class="field">
          <label for="pe-slug">URL</label>
          <div class="input-group">
            <span class="prefix">/blog/</span>
            <input id="pe-slug" v-model="post.slug" class="input" :aria-invalid="!!errors.slug" @input="slugTouched = true">
          </div>
          <span v-if="errors.slug" class="err">{{ errors.slug }}</span>
          <span v-if="originalSlug && post.slug !== originalSlug" class="hint warn">Cambiar la URL rompe los enlaces que ya apunten al artículo.</span>
        </div>
        <details class="md-help">
          <summary>Chuleta de Markdown</summary>
          <pre>## Subtítulo
**negrita**
- elemento de lista
1. lista numerada
[texto](/apuntate?tipo=inquilino)
| A | B |
|---|---|
| 1 | 2 |</pre>
        </details>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.head { display: flex; justify-content: space-between; align-items: flex-end; gap: 16px; flex-wrap: wrap; margin-bottom: 20px; }
.back { font-size: 0.9rem; text-decoration: none; color: var(--muted); }
h1 { font-size: 2rem; margin: 6px 0 4px; }
.head p { margin: 0; }
.actions { display: flex; gap: 8px; flex-wrap: wrap; }
.cols { display: grid; gap: 16px; align-items: start; }
@media (min-width: 1100px) { .cols { grid-template-columns: minmax(0, 1fr) 300px; } .side { position: sticky; top: 16px; } }
.main,
.side { display: grid; gap: 16px; }
.input.big { font-size: 1.3rem; font-weight: 500; }
.err { color: var(--danger); font-size: 0.85rem; }
p.err { margin: 0 0 12px; }
.hint.warn { color: #7a4a00; }
.body-head { display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap; }
.tabs { display: inline-flex; gap: 4px; padding: 4px; background: var(--grey-01); border-radius: 999px; }
.tabs button { font: inherit; font-size: 0.88rem; border: 0; background: transparent; border-radius: 999px; padding: 7px 14px; cursor: pointer; color: var(--muted); }
.tabs button.on { background: #fff; color: var(--ink); box-shadow: var(--shadow); }
.tools { display: flex; gap: 4px; flex-wrap: wrap; }
.tools button { font: inherit; font-size: 0.82rem; border: 1px solid var(--line); background: #fff; border-radius: 8px; padding: 5px 10px; cursor: pointer; }
.tools button:hover { border-color: var(--ink); }
.body { min-height: 520px; font-family: ui-monospace, 'Cascadia Code', Consolas, monospace; font-size: 0.92rem; line-height: 1.6; resize: vertical; }
.preview { min-height: 520px; border: 1px solid var(--line); border-radius: 12px; padding: 20px 24px; }
.input-group .prefix { display: grid; place-items: center; padding: 0 10px; border: 1px solid #cecece; border-right: 0; border-radius: var(--radius-sm) 0 0 var(--radius-sm); background: var(--grey-01); color: var(--muted); font-size: 0.85rem; }
.input-group .prefix + .input { border-radius: 0 var(--radius-sm) var(--radius-sm) 0; }
.md-help { font-size: 0.85rem; }
.md-help summary { cursor: pointer; font-weight: 500; }
.md-help pre { background: var(--off); border-radius: 10px; padding: 12px; font-size: 0.8rem; overflow-x: auto; }

.prose { font-size: 1rem; line-height: 1.7; }
.prose :deep(h2) { font-size: 1.5rem; margin: 1.6em 0 0.5em; }
.prose :deep(h2:first-child) { margin-top: 0; }
.prose :deep(table) { width: 100%; border-collapse: collapse; margin: 1em 0; font-size: 0.92rem; }
.prose :deep(th),
.prose :deep(td) { padding: 8px 12px; border: 1px solid var(--line); text-align: left; }
.prose :deep(th) { background: var(--ink); color: #fff; font-weight: 500; }
.prose :deep(a) { color: var(--ink); text-decoration-color: var(--lime); text-decoration-thickness: 3px; }
</style>
