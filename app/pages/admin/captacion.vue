<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })
useHead({ title: 'Captación' })

const { data, refresh } = await useFetch<{ items: Prospect[]; mailReady: boolean }>('/api/admin/captacion', { default: () => ({ items: [], mailReady: false }), deep: true })

const status = ref<ProspectStatus | 'todas' | 'hoy'>('hoy')
const city = ref('')
const q = ref('')
const today = new Date().toISOString().slice(0, 10)
const cities = computed(() => [...new Set(data.value.items.map(p => p.city))].sort((a, b) => a.localeCompare(b, 'es')))
const isDue = (p: Prospect) => (p.status === 'por_llamar' || p.status === 'volver_a_llamar') && (!p.nextCallAt || p.nextCallAt <= today)
const list = computed(() => {
  const term = q.value.trim().toLowerCase()
  // La ficha abierta sigue visible aunque al cambiar su estado ya no encaje en el filtro (hasta que se cierre).
  return data.value.items.filter(p => p.id === openId.value || (
    (status.value === 'todas' || (status.value === 'hoy' ? isDue(p) : p.status === status.value))
    && (!city.value || p.city === city.value)
    && (!term || [p.company, p.contactName, p.phone, p.email].some(v => v.toLowerCase().includes(term)))))
})
const count = (s: ProspectStatus) => data.value.items.filter(p => p.status === s).length
const dueCount = computed(() => data.value.items.filter(isDue).length)

// Alta
const adding = ref(false)
const bulk = ref('')
const bulkCity = ref('')
const addMsg = ref('')
async function addBulk() {
  // Una empresa por línea: Nombre; Teléfono; Web; Ciudad (opcional si se elige arriba); Tipo (opcional)
  const items = bulk.value.split('\n').map(l => l.split(/[;\t]/).map(x => x.trim())).filter(c => c[0])
    .map(([company, phone, website, cityCol, kind]) => ({ company, phone, website, city: cityCol || bulkCity.value, kind: kind?.toLowerCase().startsWith('admin') ? 'administrador' : 'inmobiliaria', source: 'Lista manual' }))
  const r = await $fetch<{ added: number; skipped: number }>('/api/admin/captacion', { method: 'POST', body: { items } })
  addMsg.value = `${r.added} añadidas${r.skipped ? ` · ${r.skipped} repetidas o sin ciudad` : ''}`
  bulk.value = ''
  await refresh()
}

// Ficha
const openId = ref<string | null>(null)
const detail = ref<Prospect | null>(null)
const callNote = ref('')
const msg = ref('')
const msgErr = ref(false)
async function open(p: Prospect) {
  if (openId.value === p.id) { openId.value = null; return }
  openId.value = p.id
  callNote.value = ''
  msg.value = ''
  detail.value = await $fetch<Prospect>(`/api/admin/captacion/${p.id}`)
}
async function save(patch: Record<string, unknown>, okText = 'Guardado') {
  if (!detail.value) return
  msg.value = ''
  try {
    const r = await $fetch<{ prospect: Prospect; sent: boolean | null }>(`/api/admin/captacion/${detail.value.id}`, {
      method: 'PUT',
      body: { ...detail.value, ...patch, call: callNote.value || patch.call },
    })
    detail.value = r.prospect
    callNote.value = ''
    msgErr.value = false
    msg.value = r.sent === true ? 'Propuesta enviada por correo ✔' : r.sent === false && patch.status === 'pide_info' ? 'Guardado (la propuesta ya se había enviado o el correo no está configurado)' : okText
    const i = data.value.items.findIndex(x => x.id === r.prospect.id)
    if (i >= 0) data.value.items.splice(i, 1, r.prospect)
  }
  catch (e) { msgErr.value = true; msg.value = apiError(e).message }
}
const tomorrow = () => new Date(Date.now() + 864e5).toISOString().slice(0, 10)
const noAnswer = () => save({ status: 'volver_a_llamar', nextCallAt: tomorrow(), call: callNote.value || 'No contesta' }, 'Anotado: volver a llamar mañana')
const askInfo = () => {
  if (!detail.value?.email) { msgErr.value = true; msg.value = 'Apunta su correo antes de marcar «Pide información».'; return }
  if (confirm(`¿Te ha pedido que le enviemos la información? Se enviará la propuesta a ${detail.value.email}.`)) save({ status: 'pide_info', call: callNote.value || 'Pide información por correo' })
}
const date = (d: string) => new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }).format(new Date(d))
const showScript = ref(true)
</script>

<template>
  <div>
    <div class="head">
      <div>
        <h1>Captación</h1>
        <p class="muted">Inmobiliarias y administradores de fincas. Se llama primero; el correo con la propuesta sale solo cuando lo piden.</p>
      </div>
      <div class="row">
        <a href="/dossier/rentahucha-cartel-propietarios.pdf" target="_blank" class="btn btn-ghost btn-sm">Carteles y tarjetas (PDF)</a>
        <button type="button" class="btn btn-dark btn-sm" @click="adding = !adding">+ Añadir empresas</button>
      </div>
    </div>

    <p v-if="!data.mailReady" class="note note-danger small">El correo no está configurado en este entorno: las propuestas no se enviarán.</p>

    <div v-if="adding" class="card add">
      <p class="small"><strong>Una empresa por línea:</strong> Nombre; Teléfono; Web; Ciudad (opcional si la eliges aquí); Tipo (opcional: «administrador»). Solo datos públicos de la empresa.</p>
      <div class="row">
        <input v-model="bulkCity" class="input narrow" placeholder="Ciudad para todas (opcional)">
      </div>
      <textarea v-model="bulk" class="input" rows="6" placeholder="Inmobiliaria Ejemplo; 960 000 000; ejemplo.es&#10;Fincas Centro; 961 111 111; fincascentro.es; Valencia; administrador" />
      <div class="row">
        <button type="button" class="btn btn-primary btn-sm" :disabled="!bulk.trim()" @click="addBulk">Añadir</button>
        <span class="small muted">{{ addMsg }}</span>
      </div>
    </div>

    <div class="funnel">
      <button type="button" :class="{ on: status === 'hoy' }" @click="status = 'hoy'"><strong>{{ dueCount }}</strong><span>Para llamar hoy</span></button>
      <button v-for="(label, s) in PROSPECT_STATUS" :key="s" type="button" :class="{ on: status === s }" @click="status = s"><strong>{{ count(s) }}</strong><span>{{ label }}</span></button>
      <button type="button" :class="{ on: status === 'todas' }" @click="status = 'todas'"><strong>{{ data.items.length }}</strong><span>Todas</span></button>
    </div>

    <div class="toolbar">
      <select v-model="city" class="select narrow" aria-label="Ciudad"><option value="">Todas las ciudades</option><option v-for="c in cities" :key="c">{{ c }}</option></select>
      <input v-model="q" class="input search" type="search" placeholder="Buscar empresa, persona, teléfono…" aria-label="Buscar">
    </div>

    <p v-if="!list.length" class="muted">No hay empresas en esta vista.</p>
    <div class="list">
      <article v-for="p in list" :key="p.id" class="card item" :class="{ open: openId === p.id }">
        <div class="top" @click="open(p)">
          <div class="who">
            <strong>{{ p.company }}</strong>
            <span class="small muted">{{ PROSPECT_KINDS[p.kind] }} · {{ p.city }}<template v-if="p.nextCallAt"> · llamar el {{ p.nextCallAt.split('-').reverse().join('/') }}</template></span>
          </div>
          <a v-if="p.phone" :href="`tel:${p.phone.replace(/\s/g, '')}`" class="btn btn-ghost btn-sm" @click.stop>📞 {{ p.phone }}</a>
          <span class="pill" :class="`s-${p.status}`">{{ PROSPECT_STATUS[p.status] }}</span>
        </div>

        <div v-if="openId === p.id && detail" class="detail" @click.stop>
          <details :open="showScript" class="script" @toggle="showScript = ($event.target as HTMLDetailsElement).open">
            <summary>Guion de llamada (2-3 minutos)</summary>
            <ol class="small">
              <li>«Hola, ¿hablo con {{ detail.company }}? Soy [tu nombre], de RentaHucha, una plataforma de alquiler que estamos lanzando. ¿Te robo un minuto?»</li>
              <li>«Trabajamos con {{ detail.kind === 'administrador' ? 'administradores de fincas: muchos de vuestros propietarios alquilan y temen el impago' : 'inmobiliarias: os damos inquilinos verificados para vuestros pisos' }}, y una herramienta que podéis ofrecer contra el impago: el inquilino llena cada mes una hucha a su nombre, custodiada por una entidad financiera, que pasa al propietario si hay un impago comprobado. No somos aseguradora y el propietario sigue siendo vuestro cliente.»</li>
              <li>«¿Gestionáis alquileres de larga duración? ¿Cuántos más o menos?»</li>
              <li>«¿Te mando la información por correo? ¿A qué dirección?» → si dice que sí, apunta el correo y pulsa <strong>Pide información</strong>.</li>
              <li>Si no le interesa: «Perfecto, gracias por tu tiempo». Pulsa <strong>No le interesa</strong> y no se le vuelve a contactar.</li>
            </ol>
          </details>

          <div class="grid2">
            <label>Persona de contacto<input v-model="detail.contactName" class="input" placeholder="Nombre"></label>
            <label>Correo (solo si lo da)<input v-model="detail.email" class="input" type="email" placeholder="nombre@inmobiliaria.es"></label>
            <label>Teléfono<input v-model="detail.phone" class="input"></label>
            <label>Web<input v-model="detail.website" class="input"></label>
          </div>
          <label class="full">Qué ha pasado en la llamada<textarea v-model="callNote" class="input" rows="2" placeholder="Gestionan unos 40 alquileres; le interesa la verificación de inquilinos…" /></label>
          <div class="outcomes">
            <button type="button" class="btn btn-ghost btn-sm" :disabled="detail.doNotContact" @click="noAnswer">No contesta (mañana)</button>
            <label class="later">Volver a llamar el
              <input type="date" class="input" :min="today" :value="detail.nextCallAt ?? ''" :disabled="detail.doNotContact" @change="save({ status: 'volver_a_llamar', nextCallAt: ($event.target as HTMLInputElement).value }, 'Llamada programada')">
            </label>
            <button type="button" class="btn btn-primary btn-sm" :disabled="detail.doNotContact || !!detail.proposalSentAt" @click="askInfo">{{ detail.proposalSentAt ? 'Propuesta enviada' : 'Pide información → enviar propuesta' }}</button>
            <button type="button" class="btn btn-ghost btn-sm" :disabled="detail.doNotContact" @click="save({ status: 'en_conversacion' })">En conversación</button>
            <button type="button" class="btn btn-ghost btn-sm" :disabled="detail.doNotContact" @click="save({ status: 'cliente' })">¡Dentro!</button>
            <button type="button" class="btn btn-ghost btn-sm danger" @click="save({ status: 'no_interesa', call: callNote || 'No le interesa' })">No le interesa</button>
            <button type="button" class="link small" @click="save({})">Guardar datos</button>
          </div>
          <p v-if="msg" class="small" :class="msgErr ? 'err' : 'ok'" role="status">{{ msg }}</p>
          <p v-if="detail.doNotContact" class="small err">Pidió no ser contactada: no se le enviará nada.</p>
          <p v-if="detail.proposalSentAt" class="small muted">Propuesta enviada el {{ date(detail.proposalSentAt) }}{{ detail.followupSentAt ? ` · recordatorio el ${date(detail.followupSentAt)}` : ' · si no responde, el recordatorio único sale solo a los 7 días' }}.</p>
          <label class="full">Notas<textarea v-model="detail.notes" class="input" rows="2" @change="save({}, 'Notas guardadas')" /></label>
          <ul v-if="detail.events?.length" class="events small">
            <li v-for="(e, i) in detail.events" :key="i"><span class="muted">{{ date(e.createdAt) }}</span> · <strong>{{ e.kind }}</strong>{{ e.detail ? `: ${e.detail}` : '' }}</li>
          </ul>
        </div>
      </article>
    </div>
  </div>
</template>

<style scoped>
.head { display: flex; justify-content: space-between; gap: 16px; align-items: flex-start; flex-wrap: wrap; margin-bottom: 16px; }
h1 { font-size: 2.2rem; margin: 0 0 4px; }
.head p { margin: 0; max-width: 640px; }
.add { display: grid; gap: 10px; margin-bottom: 16px; }
.add p { margin: 0; }
.row { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }
.narrow { max-width: 260px; }
.funnel { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 8px; margin-bottom: 14px; }
.funnel button { font: inherit; text-align: left; border: 1px solid var(--line); background: #fff; border-radius: 14px; padding: 10px 12px; cursor: pointer; display: grid; gap: 2px; }
.funnel strong { font-size: 1.4rem; }
.funnel span { font-size: 0.8rem; color: var(--muted); }
.funnel button.on { border-color: var(--ink); box-shadow: inset 0 0 0 1px var(--ink); }
.toolbar { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 12px; }
.search { max-width: 320px; }
.list { display: grid; gap: 8px; }
.item { padding: 12px 14px; }
.item.open { border-color: var(--ink); }
.top { display: flex; gap: 12px; align-items: center; cursor: pointer; flex-wrap: wrap; }
.who { display: grid; gap: 2px; flex: 1; min-width: 200px; }
.pill { font-size: 0.75rem; font-weight: 600; padding: 3px 10px; border-radius: 999px; background: var(--grey-01); white-space: nowrap; }
.s-volver_a_llamar { background: #fff3cd; }
.s-pide_info { background: #dfe5ff; }
.s-en_conversacion { background: var(--lime-soft); }
.s-cliente { background: var(--lime); }
.s-no_interesa { color: var(--muted); text-decoration: line-through; }
.detail { margin-top: 14px; display: grid; gap: 12px; cursor: default; }
.script { background: var(--off); border-radius: 12px; padding: 10px 14px; }
.script summary { cursor: pointer; font-weight: 600; }
.script ol { margin: 8px 0 0; padding-left: 20px; display: grid; gap: 6px; }
.grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.grid2 label, .full { display: grid; gap: 4px; font-size: 0.85rem; font-weight: 600; }
.grid2 .input, .full .input { font-weight: 400; }
.outcomes { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
.later { display: inline-flex; gap: 6px; align-items: center; font-size: 0.85rem; }
.later .input { width: auto; padding: 6px 10px; }
.danger { color: var(--danger); }
.link { font: inherit; background: none; border: 0; text-decoration: underline; cursor: pointer; padding: 0; color: var(--muted); }
.err { color: var(--danger); margin: 0; }
.ok { color: var(--green); margin: 0; }
.events { list-style: none; padding: 0; margin: 0; display: grid; gap: 4px; border-top: 1px solid var(--line); padding-top: 10px; }
@media (max-width: 640px) { .grid2 { grid-template-columns: 1fr; } }
</style>
