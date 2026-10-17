<script setup lang="ts">
import type { Audience } from '#shared/utils/blog'

// Generación de artículos con IA. Todo lo que se genera se guarda como borrador para revisarlo antes de publicar.
type Length = 'corto' | 'medio' | 'largo'
interface Idea { topic: string; keyword: string; length: Length; why: string }
interface Job { topic: string; audience: Audience; length: Length; keywords: string; notes: string; status: 'pendiente' | 'escribiendo' | 'ok' | 'error'; slug?: string; title?: string; error?: string }

const emit = defineEmits<{ generated: [] }>()

const { data: status } = useFetch<{ configured: boolean }>('/api/admin/blog/ia', { default: () => ({ configured: false }) })

const LENGTHS: Record<Length, string> = { corto: 'Corto (~400 palabras)', medio: 'Medio (~800)', largo: 'Guía larga (~1.500)' }

// Sugerir temas
const ideaForm = reactive({ audience: 'propietarios' as Audience, count: 8, focus: '' })
const ideas = ref<(Idea & { pick: boolean })[]>([])
const loadingIdeas = ref(false)
const ideasError = ref('')

async function suggest() {
  loadingIdeas.value = true
  ideasError.value = ''
  try {
    const res = await $fetch<{ ideas: Idea[] }>('/api/admin/blog/ideas', { method: 'POST', body: ideaForm })
    ideas.value = res.ideas.map(i => ({ ...i, pick: false }))
  }
  catch (e: unknown) {
    ideasError.value = (e as { data?: { statusMessage?: string } }).data?.statusMessage ?? 'No se han podido generar ideas.'
  }
  finally {
    loadingIdeas.value = false
  }
}

// Escribir uno
const one = reactive({ topic: '', audience: 'propietarios' as Audience, length: 'medio' as Length, keywords: '', notes: '' })

// Cola de generación (uno a uno, para no saturar la API)
const jobs = ref<Job[]>([])
const running = ref(false)

function queueIdeas() {
  for (const i of ideas.value.filter(i => i.pick)) {
    jobs.value.push({ topic: i.topic, audience: ideaForm.audience, length: i.length, keywords: i.keyword, notes: ideaForm.focus, status: 'pendiente' })
    i.pick = false
  }
  run()
}
function queueOne() {
  if (one.topic.trim().length < 5) return
  jobs.value.push({ topic: one.topic.trim(), audience: one.audience, length: one.length, keywords: one.keywords, notes: one.notes, status: 'pendiente' })
  one.topic = ''
  run()
}

async function run() {
  if (running.value) return
  running.value = true
  try {
    for (const job of jobs.value) {
      if (job.status !== 'pendiente') continue
      job.status = 'escribiendo'
      try {
        const res = await $fetch<{ slug: string; title: string }>('/api/admin/blog/generar', {
          method: 'POST',
          body: { topic: job.topic, audience: job.audience, length: job.length, keywords: job.keywords, notes: job.notes },
          timeout: 300_000,
        })
        Object.assign(job, { status: 'ok', slug: res.slug, title: res.title })
        emit('generated')
      }
      catch (e: unknown) {
        Object.assign(job, { status: 'error', error: (e as { data?: { statusMessage?: string } }).data?.statusMessage ?? 'Error al generar' })
      }
    }
  }
  finally {
    running.value = false
  }
}

const picked = computed(() => ideas.value.filter(i => i.pick).length)
</script>

<template>
  <section class="ai card">
    <div class="head">
      <div>
        <h2>Crear artículos con IA</h2>
        <p class="muted small">Claude redacta el artículo con las reglas de RentaHucha y lo guarda como <strong>borrador</strong>. Tú lo revisas, lo editas y decides cuándo publicarlo o programarlo.</p>
      </div>
    </div>

    <div v-if="!status.configured" class="note">
      <strong>Falta conectar la IA</strong>
      <p>Añade la clave de la API de Claude (<code>ANTHROPIC_API_KEY</code>) en el archivo <code>.env</code> del servidor y reinicia el servicio. En cuanto esté, esta sección se activa.</p>
    </div>

    <template v-else>
      <div class="cols">
        <!-- Sugerir temas -->
        <div class="box">
          <h3>1 · Sugerir temas</h3>
          <div class="row">
            <div class="field">
              <label for="ai-ia">Público</label>
              <select id="ai-ia" v-model="ideaForm.audience" class="select">
                <option v-for="(label, key) in AUDIENCES" :key="key" :value="key">{{ label }}</option>
              </select>
            </div>
            <div class="field narrow">
              <label for="ai-ic">Cuántos</label>
              <input id="ai-ic" v-model.number="ideaForm.count" class="input" type="number" min="3" max="15">
            </div>
          </div>
          <div class="field">
            <label for="ai-if">Enfoque <span class="opt">(opcional)</span></label>
            <input id="ai-if" v-model="ideaForm.focus" class="input" placeholder="Ej.: impuestos y renta 2027, temas para Málaga, captar agencias…">
          </div>
          <button type="button" class="btn btn-ghost btn-sm" :disabled="loadingIdeas" @click="suggest">{{ loadingIdeas ? 'Pensando temas…' : 'Sugerir temas' }}</button>
          <p v-if="ideasError" class="err small">{{ ideasError }}</p>

          <ul v-if="ideas.length" class="ideas">
            <li v-for="(i, n) in ideas" :key="n" :class="{ on: i.pick }">
              <label>
                <input v-model="i.pick" type="checkbox">
                <span>
                  <strong>{{ i.topic }}</strong>
                  <span class="small muted">«{{ i.keyword }}» · {{ LENGTHS[i.length] }} · {{ i.why }}</span>
                </span>
              </label>
            </li>
          </ul>
          <button v-if="ideas.length" type="button" class="btn btn-primary btn-sm" :disabled="!picked" @click="queueIdeas">Generar {{ picked }} borrador(es)</button>
        </div>

        <!-- Escribir uno -->
        <div class="box">
          <h3>2 · Escribir uno concreto</h3>
          <div class="field">
            <label for="ai-t">Tema</label>
            <textarea id="ai-t" v-model="one.topic" class="textarea" rows="2" placeholder="Ej.: Qué hacer si el inquilino se va dejando deudas de suministros" />
          </div>
          <div class="row">
            <div class="field">
              <label for="ai-a">Público</label>
              <select id="ai-a" v-model="one.audience" class="select">
                <option v-for="(label, key) in AUDIENCES" :key="key" :value="key">{{ label }}</option>
              </select>
            </div>
            <div class="field">
              <label for="ai-l">Longitud</label>
              <select id="ai-l" v-model="one.length" class="select">
                <option v-for="(label, key) in LENGTHS" :key="key" :value="key">{{ label }}</option>
              </select>
            </div>
          </div>
          <div class="field">
            <label for="ai-k">Palabras clave <span class="opt">(opcional)</span></label>
            <input id="ai-k" v-model="one.keywords" class="input" placeholder="Ej.: deudas suministros inquilino">
          </div>
          <div class="field">
            <label for="ai-n">Indicaciones <span class="opt">(opcional)</span></label>
            <input id="ai-n" v-model="one.notes" class="input" placeholder="Ej.: tono muy práctico, incluye una checklist">
          </div>
          <button type="button" class="btn btn-primary btn-sm" :disabled="one.topic.trim().length < 5" @click="queueOne">Generar borrador</button>
        </div>
      </div>

      <div v-if="jobs.length" class="jobs">
        <h3>Generados en esta sesión</h3>
        <ul>
          <li v-for="(j, n) in jobs" :key="n">
            <span class="badge" :class="{ 'badge-muted': j.status !== 'ok', err: j.status === 'error' }">
              {{ { pendiente: 'En cola', escribiendo: 'Escribiendo…', ok: 'Borrador listo', error: 'Error' }[j.status] }}
            </span>
            <span class="t">{{ j.title ?? j.topic }}</span>
            <NuxtLink v-if="j.slug" :to="`/admin/blog/${j.slug}`" class="link">Revisar y publicar →</NuxtLink>
            <span v-if="j.error" class="err small">{{ j.error }}</span>
          </li>
        </ul>
        <p class="small muted">Cada artículo tarda entre medio minuto y un par de minutos. Puedes seguir trabajando mientras tanto.</p>
      </div>
    </template>
  </section>
</template>

<style scoped>
.ai { display: grid; gap: 16px; margin-bottom: 20px; }
.head h2 { font-size: 1.2rem; font-weight: 600; margin-bottom: 4px; }
.head p { margin: 0; }
.note { background: var(--lime-soft); border-radius: 12px; padding: 14px 16px; }
.note p { margin: 4px 0 0; }
.cols { display: grid; gap: 16px; }
@media (min-width: 1100px) { .cols { grid-template-columns: 1fr 1fr; } }
.box { border: 1px solid var(--line); border-radius: 14px; padding: 16px; display: grid; gap: 12px; align-content: start; }
.box h3 { font-size: 1rem; margin: 0; }
.row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.row .narrow { max-width: 120px; }
.opt { font-weight: 400; color: var(--muted); font-size: 0.85em; }
.box .btn { justify-self: start; }
.ideas { list-style: none; padding: 0; margin: 0; display: grid; gap: 6px; max-height: 360px; overflow: auto; }
.ideas li { border: 1px solid var(--line); border-radius: 10px; padding: 8px 10px; }
.ideas li.on { border-color: var(--ink); background: var(--lime-soft); }
.ideas label { display: flex; gap: 10px; align-items: flex-start; cursor: pointer; }
.ideas label > span { display: grid; gap: 2px; }
.jobs h3 { font-size: 1rem; margin-bottom: 8px; }
.jobs ul { list-style: none; padding: 0; margin: 0 0 8px; display: grid; gap: 8px; }
.jobs li { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }
.jobs .t { font-weight: 500; }
.link { font-weight: 500; }
.err { color: var(--danger); }
.badge.err { background: var(--danger-soft); color: var(--danger); }
</style>
