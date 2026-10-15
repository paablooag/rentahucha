<script setup lang="ts">
import type { Audience, BlogPostSummary } from '#shared/utils/blog'
import type { ImportedPost } from '~/utils/blog-import'

const props = defineProps<{ existing: BlogPostSummary[] }>()
const emit = defineEmits<{ imported: [] }>()

type Row = ImportedPost & { status: 'pendiente' | 'subiendo' | 'ok' | 'error'; error?: string; include: boolean; updated?: boolean }

const defaults = reactive({
  audience: 'propietarios' as Audience,
  category: '',
  publishedAt: new Date().toISOString().slice(0, 10),
  published: false,
})
const overwrite = ref(false)
const rows = ref<Row[]>([])
const dragging = ref(false)
const reading = ref(false)
const running = ref(false)
const skipped = ref<string[]>([])
const input = ref<HTMLInputElement | null>(null)

const existingSlugs = computed(() => new Set(props.existing.map(p => p.slug)))

// Problemas que impedirían guardar el artículo (mismas reglas que el servidor).
function problems(r: Row): string[] {
  const res = validatePost({ ...r })
  const out = res.ok ? [] : Object.values(res.errors)
  if (existingSlugs.value.has(r.slug) && !overwrite.value) out.push('Ya existe un artículo con esa URL (marca «Sobrescribir» para actualizarlo)')
  if (rows.value.filter(x => x.include && x.slug === r.slug).length > 1) out.push('URL repetida entre los archivos')
  return out
}

const ready = computed(() => rows.value.filter(r => r.include && r.status !== 'ok' && !problems(r).length))
const done = computed(() => rows.value.filter(r => r.status === 'ok').length)

async function addFiles(list: FileList | File[]) {
  const files = [...list]
  skipped.value = files.filter(f => !IMPORT_EXTENSIONS.some(ext => f.name.toLowerCase().endsWith(ext))).map(f => f.name)
  const valid = files.filter(f => IMPORT_EXTENSIONS.some(ext => f.name.toLowerCase().endsWith(ext)))
  reading.value = true
  try {
    for (const f of valid) {
      try {
        const post = await readArticleFile(f, { ...defaults })
        rows.value.push({ ...post, status: 'pendiente', include: true })
      }
      catch {
        rows.value.push({ file: f.name, title: '', slug: '', excerpt: '', audience: defaults.audience, category: '', publishedAt: defaults.publishedAt, published: false, body: '', notes: [], status: 'error', error: 'No se ha podido leer el archivo', include: false })
      }
    }
  }
  finally {
    reading.value = false
  }
}

function onDrop(e: DragEvent) {
  dragging.value = false
  if (e.dataTransfer?.files?.length) addFiles(e.dataTransfer.files)
}

function onPick(e: Event) {
  const el = e.target as HTMLInputElement
  if (el.files?.length) addFiles(el.files)
  el.value = ''
}

// Cambiar los valores por defecto se aplica a las filas aún no subidas.
function applyDefaults() {
  for (const r of rows.value) {
    if (r.status === 'ok') continue
    r.audience = defaults.audience
    r.published = defaults.published
    if (defaults.category) r.category = defaults.category
  }
}

async function importAll() {
  running.value = true
  for (const r of ready.value) {
    r.status = 'subiendo'
    const body = { title: r.title, slug: r.slug, excerpt: r.excerpt, audience: r.audience, category: r.category, publishedAt: r.publishedAt, published: r.published, body: r.body }
    try {
      r.updated = existingSlugs.value.has(r.slug)
      if (r.updated) await $fetch(`/api/admin/blog/${r.slug}`, { method: 'PUT', body })
      else await $fetch('/api/admin/blog', { method: 'POST', body })
      r.status = 'ok'
    }
    catch (e: unknown) {
      const err = e as { data?: { statusMessage?: string; data?: { errors?: Record<string, string> } } }
      r.status = 'error'
      r.error = Object.values(err.data?.data?.errors ?? {}).join(' · ') || err.data?.statusMessage || 'Error al guardar'
    }
  }
  running.value = false
  emit('imported')
}

function clear() {
  rows.value = []
  skipped.value = []
}

function downloadTemplate() {
  const blob = new Blob([ARTICLE_TEMPLATE], { type: 'text/markdown;charset=utf-8' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = 'plantilla-articulo.md'
  a.click()
  URL.revokeObjectURL(a.href)
}
</script>

<template>
  <section class="importer card">
    <div class="head">
      <div>
        <h2>Importar artículos</h2>
        <p class="muted small">Arrastra uno o varios archivos <strong>.docx</strong> (Word), <strong>.md</strong> o <strong>.txt</strong>. Podrás revisarlos antes de guardarlos.</p>
      </div>
      <button type="button" class="btn btn-ghost btn-sm" @click="downloadTemplate"><AppIcon name="file" :size="16" /> Plantilla .md</button>
    </div>

    <div
      class="drop"
      :class="{ over: dragging }"
      role="button"
      tabindex="0"
      aria-label="Arrastra aquí los archivos o pulsa para elegirlos"
      @click="input?.click()"
      @keydown.enter.prevent="input?.click()"
      @keydown.space.prevent="input?.click()"
      @dragenter.prevent="dragging = true"
      @dragover.prevent="dragging = true"
      @dragleave.prevent="dragging = false"
      @drop.prevent="onDrop"
    >
      <span class="drop-icon"><AppIcon name="file" :size="26" /></span>
      <strong>{{ reading ? 'Leyendo archivos…' : 'Suelta aquí los archivos' }}</strong>
      <span class="small muted">o haz clic para elegirlos · varios a la vez</span>
      <input ref="input" type="file" multiple :accept="IMPORT_EXTENSIONS.join(',')" hidden @change="onPick">
    </div>
    <p v-if="skipped.length" class="warn small">Se han ignorado {{ skipped.length }} archivo(s) con formato no admitido: {{ skipped.join(', ') }}</p>

    <template v-if="rows.length">
      <div class="defaults">
        <div class="field">
          <label for="imp-aud">Público por defecto</label>
          <select id="imp-aud" v-model="defaults.audience" class="select" @change="applyDefaults">
            <option v-for="(label, key) in AUDIENCES" :key="key" :value="key">{{ label }}</option>
          </select>
        </div>
        <div class="field">
          <label for="imp-cat">Categoría por defecto</label>
          <input id="imp-cat" v-model="defaults.category" class="input" placeholder="Si el archivo no la trae" @change="applyDefaults">
        </div>
        <label class="checkbox"><input v-model="defaults.published" type="checkbox" @change="applyDefaults"> Publicar directamente</label>
        <label class="checkbox"><input v-model="overwrite" type="checkbox"> Sobrescribir si la URL ya existe</label>
      </div>

      <div class="table-wrap">
        <table class="table">
          <thead><tr><th /><th>Archivo</th><th>Título y URL</th><th>Público</th><th>Estado</th></tr></thead>
          <tbody>
            <tr v-for="(r, i) in rows" :key="i" :class="{ off: !r.include }">
              <td><input v-model="r.include" type="checkbox" :disabled="r.status === 'ok'" :aria-label="`Incluir ${r.file}`"></td>
              <td class="file small">{{ r.file }}</td>
              <td>
                <input v-model="r.title" class="input slim" :disabled="r.status === 'ok'" aria-label="Título" @change="r.slug = r.slug || slugify(r.title)">
                <span class="small muted slug">/blog/<input v-model="r.slug" class="slug-input" :disabled="r.status === 'ok'" aria-label="URL"></span>
                <span v-for="n in r.notes" :key="n" class="note-line small">{{ n }}</span>
              </td>
              <td>
                <select v-model="r.audience" class="select slim" :disabled="r.status === 'ok'" aria-label="Público">
                  <option v-for="(label, key) in AUDIENCES" :key="key" :value="key">{{ label }}</option>
                </select>
                <label class="pub small"><input v-model="r.published" type="checkbox" :disabled="r.status === 'ok'"> Publicar</label>
              </td>
              <td class="state small">
                <span v-if="r.status === 'ok'" class="badge">{{ r.updated ? 'Actualizado' : 'Importado' }}</span>
                <span v-else-if="r.status === 'subiendo'" class="badge badge-muted">Subiendo…</span>
                <span v-else-if="r.status === 'error'" class="err">{{ r.error }}</span>
                <template v-else-if="r.include">
                  <span v-if="!problems(r).length" class="badge badge-muted">Listo</span>
                  <span v-for="p in problems(r)" :key="p" class="err">{{ p }}</span>
                </template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="actions">
        <span class="small muted">{{ ready.length }} listo(s) para importar{{ done ? ` · ${done} importado(s)` : '' }}</span>
        <button type="button" class="btn btn-ghost btn-sm" :disabled="running" @click="clear">Vaciar</button>
        <button type="button" class="btn btn-primary btn-sm" :disabled="!ready.length || running" @click="importAll">
          {{ running ? 'Importando…' : `Importar ${ready.length} artículo(s)` }}
        </button>
      </div>
    </template>
  </section>
</template>

<style scoped>
.importer { display: grid; gap: 16px; margin-bottom: 20px; }
.head { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; flex-wrap: wrap; }
.head h2 { font-size: 1.2rem; font-weight: 600; letter-spacing: -0.01em; margin-bottom: 4px; }
.head p { margin: 0; }
.drop {
  display: grid; justify-items: center; gap: 6px; padding: 28px 16px; text-align: center; cursor: pointer;
  border: 2px dashed #cecece; border-radius: 16px; background: var(--off); transition: all 0.15s;
}
.drop:hover,
.drop:focus-visible { border-color: var(--ink); }
.drop.over { border-color: var(--ink); background: var(--lime-soft); }
.drop-icon { width: 52px; height: 52px; border-radius: 50%; display: grid; place-items: center; background: var(--lime); }
.warn { margin: 0; color: #7a4a00; }
.defaults { display: flex; gap: 14px; align-items: flex-end; flex-wrap: wrap; }
.defaults .field { min-width: 200px; }
.table td { vertical-align: top; }
tr.off td { opacity: 0.5; }
.file { max-width: 160px; word-break: break-all; color: var(--muted); }
.slim { padding: 7px 10px; font-size: 0.92rem; }
.slug { display: flex; align-items: center; margin-top: 4px; }
.slug-input { font: inherit; border: 0; border-bottom: 1px dashed #cecece; background: transparent; padding: 0 2px; min-width: 0; flex: 1; color: var(--muted); }
.note-line { display: block; color: var(--muted); margin-top: 2px; }
.note-line::before { content: 'ℹ '; }
.pub { display: flex; gap: 6px; align-items: center; margin-top: 6px; }
.state { min-width: 160px; }
.err { display: block; color: var(--danger); }
.actions { display: flex; gap: 10px; justify-content: flex-end; align-items: center; flex-wrap: wrap; }
.actions .muted { margin-right: auto; }
</style>
