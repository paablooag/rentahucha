<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })

interface Entry { email: string; name: string; source: string; createdAt: string }
const { data, refresh } = await useFetch<Entry[]>('/api/admin/newsletter', { default: () => [] })

const q = ref('')
const source = ref('todos')
const copied = ref(false)

const sources = computed(() => ['todos', ...new Set(data.value.map(e => e.source))])
const filtered = computed(() => {
  const term = q.value.trim().toLowerCase()
  return data.value.filter(e => (source.value === 'todos' || e.source === source.value) && (!term || e.email.includes(term) || e.name.toLowerCase().includes(term)))
})
const last30 = computed(() => data.value.filter(e => Date.now() - new Date(e.createdAt).getTime() < 30 * 864e5).length)

const date = (d: string) => new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(d))

async function copyAll() {
  await navigator.clipboard.writeText(filtered.value.map(e => e.email).join(', '))
  copied.value = true
  setTimeout(() => (copied.value = false), 2000)
}

async function unsubscribe(e: Entry) {
  if (!confirm(`¿Dar de baja a ${e.email} de la newsletter? Si está en la lista de espera, seguirá en ella.`)) return
  await $fetch('/api/admin/newsletter/unsubscribe', { method: 'POST', body: { email: e.email } })
  await refresh()
}
</script>

<template>
  <div>
    <div class="head">
      <div>
        <h1>Newsletter</h1>
        <p class="muted">{{ data.length }} correos suscritos · {{ last30 }} en los últimos 30 días</p>
      </div>
      <div class="actions">
        <button type="button" class="btn btn-ghost btn-sm" :disabled="!filtered.length" @click="copyAll">
          {{ copied ? '¡Copiados!' : `Copiar ${filtered.length} correos` }}
        </button>
        <a :href="withBase('/api/admin/newsletter/export')" class="btn btn-dark btn-sm" download><AppIcon name="file" :size="16" /> Exportar CSV</a>
      </div>
    </div>

    <p class="note small">
      Solo aparecen quienes marcaron expresamente la casilla de la newsletter. El CSV se puede importar directamente en Brevo, Mailchimp o MailerLite.
      Cada correo que envíes debe incluir un enlace para darse de baja.
    </p>

    <div class="toolbar">
      <select v-model="source" class="select narrow" aria-label="Origen">
        <option v-for="s in sources" :key="s" :value="s">{{ s === 'todos' ? 'Todos los orígenes' : s }}</option>
      </select>
      <input v-model="q" class="input search" type="search" placeholder="Buscar por correo o nombre…" aria-label="Buscar">
    </div>

    <div class="table-wrap">
      <table class="table">
        <thead><tr><th>Correo</th><th>Nombre</th><th>Origen</th><th>Alta</th><th /></tr></thead>
        <tbody>
          <tr v-if="!filtered.length"><td colspan="5" class="muted">No hay suscriptores con este filtro.</td></tr>
          <tr v-for="e in filtered" :key="e.email">
            <td>{{ e.email }}</td>
            <td>{{ e.name || '—' }}</td>
            <td><span class="badge" :class="e.source === 'Pie de la web' ? 'badge-muted' : e.source.includes('propietario') ? 'b-owner' : 'b-tenant'">{{ e.source }}</span></td>
            <td class="nowrap">{{ date(e.createdAt) }}</td>
            <td class="num"><button type="button" class="link danger" @click="unsubscribe(e)">Dar de baja</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.head { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; flex-wrap: wrap; margin-bottom: 16px; }
h1 { font-size: 2.2rem; margin-bottom: 4px; }
.head p { margin: 0; }
.actions { display: flex; gap: 8px; flex-wrap: wrap; }
.note { background: #fff; border: 1px solid var(--line); border-radius: 12px; padding: 12px 16px; color: var(--muted); margin-bottom: 16px; }
.toolbar { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 16px; }
.narrow { max-width: 240px; }
.search { max-width: 320px; }
.nowrap { white-space: nowrap; }
.b-owner { background: var(--ink); color: var(--lime); }
.b-tenant { background: var(--lime); color: var(--ink); }
.link { font: inherit; background: none; border: 0; text-decoration: underline; cursor: pointer; padding: 0; }
.danger { color: var(--danger); }
</style>
