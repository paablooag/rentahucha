<script setup lang="ts">
import type { Task, TaskStatus } from '#shared/utils/tasks'

definePageMeta({ layout: 'admin', middleware: 'admin' })
useHead({ title: 'Tareas' })

const { data: tasks, refresh } = await useFetch<Task[]>('/api/admin/tasks', { default: () => [] })
const statuses = Object.keys(TASK_STATUSES) as TaskStatus[]
const owner = ref<'todos' | 'pablo' | 'claude'>('todos')

const columns = computed(() => statuses.map(s => ({
  status: s,
  label: TASK_STATUSES[s],
  items: tasks.value
    .filter(t => t.status === s && (owner.value === 'todos' || t.owner === owner.value))
    .sort((a, b) => a.position - b.position),
})))

const pendingForPablo = computed(() => tasks.value.filter(t => t.owner === 'pablo' && t.status !== 'hecha').length)
const done = computed(() => tasks.value.filter(t => t.status === 'hecha').length)

// ── Guardar ─────────────────────────────────────────────────────────────────
const error = ref('')
async function save(t: Pick<Task, 'title' | 'description' | 'status' | 'owner' | 'priority' | 'area'> & { id?: string; position?: number }) {
  error.value = ''
  try {
    if (t.id) await $fetch(`/api/admin/tasks/${t.id}`, { method: 'PUT', body: t })
    else await $fetch('/api/admin/tasks', { method: 'POST', body: t })
    await refresh()
    return true
  }
  catch (e: unknown) {
    error.value = (e as { data?: { statusMessage?: string } }).data?.statusMessage ?? 'No se ha podido guardar.'
    return false
  }
}

// Mueve una tarea a una columna y posición (entre dos tarjetas o al final), con cambio inmediato en pantalla.
async function moveTo(task: Task, status: TaskStatus, before?: Task) {
  const col = tasks.value.filter(t => t.status === status && t.id !== task.id).sort((a, b) => a.position - b.position)
  let position: number
  if (before) {
    const i = col.findIndex(t => t.id === before.id)
    const prev = col[i - 1]
    position = prev ? (prev.position + before.position) / 2 : before.position - 1
  }
  else {
    position = (col.at(-1)?.position ?? 0) + 1
  }
  Object.assign(task, { status, position })
  await save({ ...task })
}

// ── Arrastrar y soltar (escritorio) ─────────────────────────────────────────
const dragging = ref<Task | null>(null)
const overCol = ref<TaskStatus | null>(null)
function onDragStart(e: DragEvent, t: Task) {
  dragging.value = t
  e.dataTransfer?.setData('text/plain', t.id)
  if (e.dataTransfer) e.dataTransfer.effectAllowed = 'move'
}
function onDrop(status: TaskStatus, before?: Task) {
  const t = dragging.value
  dragging.value = null
  overCol.value = null
  if (t && t.id !== before?.id) moveTo(t, status, before)
}

// Botones de mover (móvil y teclado)
function step(t: Task, dir: -1 | 1) {
  const i = statuses.indexOf(t.status) + dir
  const target = statuses[i]
  if (target) moveTo(t, target)
}

// ── Editor ──────────────────────────────────────────────────────────────────
const editing = ref<(Partial<Task> & { status: TaskStatus }) | null>(null)
function openNew(status: TaskStatus) {
  editing.value = { title: '', description: '', status, owner: 'claude', priority: 'media', area: '' }
}
function openEdit(t: Task) {
  editing.value = { ...t }
}
async function submit() {
  if (!editing.value) return
  const ok = await save(editing.value as Task)
  if (ok) editing.value = null
}
async function remove() {
  const t = editing.value
  if (!t?.id || !confirm(`¿Borrar la tarea «${t.title}»?`)) return
  await $fetch(`/api/admin/tasks/${t.id}`, { method: 'DELETE' })
  editing.value = null
  await refresh()
}
</script>

<template>
  <div>
    <div class="head">
      <div>
        <h1>Tareas</h1>
        <p class="muted">{{ tasks.length }} tareas · {{ done }} hechas · <strong>{{ pendingForPablo }} esperan a Pablo</strong></p>
      </div>
      <div class="head-actions">
        <div class="tabs" role="tablist" aria-label="Responsable">
          <button v-for="o in (['todos', 'pablo', 'claude'] as const)" :key="o" type="button" role="tab" :aria-selected="owner === o" :class="{ on: owner === o }" @click="owner = o">
            {{ o === 'todos' ? 'Todas' : TASK_OWNERS[o] }}
          </button>
        </div>
        <button type="button" class="btn btn-primary btn-sm" @click="openNew('pendiente')">Nueva tarea</button>
      </div>
    </div>

    <p v-if="error" class="err">{{ error }}</p>

    <div class="board">
      <section
        v-for="col in columns"
        :key="col.status"
        class="col"
        :class="[`col-${col.status}`, { over: overCol === col.status }]"
        :aria-label="col.label"
        @dragover.prevent="overCol = col.status"
        @dragleave.self="overCol = null"
        @drop.prevent="onDrop(col.status)"
      >
        <header>
          <h2>{{ col.label }} <span>{{ col.items.length }}</span></h2>
          <button type="button" class="add" :aria-label="`Añadir tarea en ${col.label}`" @click="openNew(col.status)">+</button>
        </header>

        <ul>
          <li
            v-for="t in col.items"
            :key="t.id"
            class="task"
            :class="[`p-${t.priority}`, { dragging: dragging?.id === t.id }]"
            draggable="true"
            @dragstart="onDragStart($event, t)"
            @dragend="dragging = null; overCol = null"
            @dragover.prevent
            @drop.prevent.stop="onDrop(col.status, t)"
          >
            <button type="button" class="open" @click="openEdit(t)">
              <span class="meta">
                <span class="prio" :title="`Prioridad ${TASK_PRIORITIES[t.priority].toLowerCase()}`" />
                <span v-if="t.area" class="area">{{ t.area }}</span>
                <span class="who" :class="t.owner">{{ TASK_OWNERS[t.owner] }}</span>
              </span>
              <strong>{{ t.title }}</strong>
              <span v-if="t.description" class="desc">{{ t.description }}</span>
            </button>
            <div class="moves">
              <button type="button" :disabled="t.status === statuses[0]" aria-label="Mover a la columna anterior" @click="step(t, -1)">←</button>
              <button type="button" :disabled="t.status === statuses.at(-1)" aria-label="Mover a la columna siguiente" @click="step(t, 1)">→</button>
            </div>
          </li>
          <li v-if="!col.items.length" class="empty">Arrastra aquí una tarea</li>
        </ul>
      </section>
    </div>

    <!-- Editor de tarea -->
    <div v-if="editing" class="modal-bg" @click.self="editing = null">
      <form class="modal card" @submit.prevent="submit">
        <h2>{{ editing.id ? 'Editar tarea' : 'Nueva tarea' }}</h2>
        <div class="field">
          <label for="tk-title">Título</label>
          <input id="tk-title" v-model="editing.title" class="input" required maxlength="140">
        </div>
        <div class="field">
          <label for="tk-desc">Descripción</label>
          <textarea id="tk-desc" v-model="editing.description" class="textarea" rows="4" maxlength="2000" />
        </div>
        <div class="row">
          <div class="field">
            <label for="tk-status">Estado</label>
            <select id="tk-status" v-model="editing.status" class="select">
              <option v-for="(label, key) in TASK_STATUSES" :key="key" :value="key">{{ label }}</option>
            </select>
          </div>
          <div class="field">
            <label for="tk-owner">Responsable</label>
            <select id="tk-owner" v-model="editing.owner" class="select">
              <option v-for="(label, key) in TASK_OWNERS" :key="key" :value="key">{{ label }}</option>
            </select>
          </div>
          <div class="field">
            <label for="tk-prio">Prioridad</label>
            <select id="tk-prio" v-model="editing.priority" class="select">
              <option v-for="(label, key) in TASK_PRIORITIES" :key="key" :value="key">{{ label }}</option>
            </select>
          </div>
          <div class="field">
            <label for="tk-area">Área</label>
            <input id="tk-area" v-model="editing.area" class="input" maxlength="40" placeholder="SEO, Legal…">
          </div>
        </div>
        <p v-if="error" class="err">{{ error }}</p>
        <div class="actions">
          <button v-if="editing.id" type="button" class="link danger" @click="remove">Borrar</button>
          <button type="button" class="btn btn-ghost btn-sm" @click="editing = null">Cancelar</button>
          <button type="submit" class="btn btn-primary btn-sm">Guardar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.head { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; flex-wrap: wrap; margin-bottom: 20px; }
h1 { font-size: 2.2rem; margin-bottom: 4px; }
.head p { margin: 0; }
.head-actions { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }
.tabs { display: inline-flex; gap: 4px; padding: 4px; background: #fff; border: 1px solid var(--line); border-radius: 999px; }
.tabs button { font: inherit; font-size: 0.9rem; border: 0; background: transparent; border-radius: 999px; padding: 7px 14px; cursor: pointer; color: var(--muted); }
.tabs button.on { background: var(--ink); color: #fff; }
.err { color: var(--danger); }

.board { display: grid; gap: 14px; grid-template-columns: repeat(4, minmax(240px, 1fr)); overflow-x: auto; padding-bottom: 8px; align-items: start; }
.col { background: var(--off); border-radius: 16px; padding: 12px; min-height: 200px; border: 2px dashed transparent; transition: border-color 0.15s; }
.col.over { border-color: var(--ink); }
.col header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
.col h2 { font-size: 0.95rem; font-weight: 600; margin: 0; display: flex; gap: 8px; align-items: center; }
.col h2 span { font-size: 0.78rem; background: #fff; border-radius: 999px; padding: 2px 8px; color: var(--muted); }
.col-esperando h2::before { content: ''; width: 8px; height: 8px; border-radius: 50%; background: #f08a6c; }
.col-en_curso h2::before { content: ''; width: 8px; height: 8px; border-radius: 50%; background: #f5c451; }
.col-hecha h2::before { content: ''; width: 8px; height: 8px; border-radius: 50%; background: var(--lime); }
.add { width: 34px; height: 34px; border-radius: 50%; border: 0; background: #fff; cursor: pointer; font-size: 1.1rem; line-height: 1; }
.add:hover { background: var(--ink); color: #fff; }
ul { list-style: none; padding: 0; margin: 0; display: grid; gap: 8px; }

.task { background: #fff; border-radius: 12px; border: 1px solid var(--line); border-left: 4px solid #cfcfcf; cursor: grab; position: relative; }
.task.p-alta { border-left-color: #f08a6c; }
.task.p-media { border-left-color: #f5c451; }
.task.p-baja { border-left-color: #cfd8ff; }
.task.dragging { opacity: 0.4; }
.col-hecha .task { opacity: 0.75; }
.open { font: inherit; text-align: left; width: 100%; background: none; border: 0; padding: 10px 12px 8px; cursor: pointer; display: grid; gap: 4px; color: var(--ink); }
.open strong { font-weight: 600; font-size: 0.93rem; line-height: 1.3; }
.desc { font-size: 0.82rem; color: var(--muted); display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
.meta { display: flex; gap: 6px; align-items: center; flex-wrap: wrap; }
.prio { display: none; }
.area { font-size: 0.72rem; background: var(--off); border-radius: 999px; padding: 2px 8px; color: var(--muted); }
.who { font-size: 0.72rem; border-radius: 999px; padding: 2px 8px; font-weight: 500; }
.who.pablo { background: #ffe1d6; color: #7a2e12; }
.who.claude { background: var(--lime-soft); color: var(--ink); }
.moves { display: flex; justify-content: flex-end; gap: 4px; padding: 0 8px 8px; }
.moves button { font: inherit; font-size: 0.8rem; border: 1px solid var(--line); background: #fff; border-radius: 8px; width: 36px; height: 32px; cursor: pointer; color: var(--muted); }
.moves button:disabled { opacity: 0.3; cursor: default; }
.moves button:not(:disabled):hover { border-color: var(--ink); color: var(--ink); }
.empty { font-size: 0.82rem; color: var(--muted); text-align: center; padding: 18px 8px; border: 1px dashed #d4d4d4; border-radius: 12px; }

.modal-bg { position: fixed; inset: 0; background: rgba(0, 0, 0, 0.45); display: grid; place-items: center; padding: 16px; z-index: 50; }
.modal { width: min(640px, 100%); display: grid; gap: 14px; max-height: 90vh; overflow: auto; }
.modal h2 { font-size: 1.3rem; margin: 0; }
.row { display: grid; gap: 12px; grid-template-columns: repeat(2, 1fr); }
@media (min-width: 640px) { .row { grid-template-columns: repeat(4, 1fr); } }
.actions { display: flex; gap: 10px; justify-content: flex-end; align-items: center; }
.actions .danger { margin-right: auto; }
.link { font: inherit; background: none; border: 0; text-decoration: underline; cursor: pointer; padding: 6px 2px; min-height: 32px; }
.danger { color: var(--danger); }
@media (max-width: 760px) { .board { grid-template-columns: 1fr; overflow: visible; } }
</style>
