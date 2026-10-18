<script setup lang="ts">
definePageMeta({ middleware: 'cuenta' })
useSeoMeta({ title: 'Conversación', robots: 'noindex' })
const route = useRoute()
const { refresh: refreshAccount } = useAccount()

type VisitStatus = 'propuesta' | 'aceptada' | 'rechazada' | 'cancelada'
interface Msg { id: number; body: string; kind: 'texto' | 'visita'; meta?: { at: string; status: VisitStatus } | null; createdAt: string; mine: boolean; pending?: boolean }
interface Conv {
  id: string; isOwner: boolean; serverTime: string
  property: { id: string; title: string; city: string; status: string }
  otherName: string; otherReadAt: string | null; messages: Msg[]; blocked: boolean
  tenantProfile?: TenantProfile | null; rent?: number
}

// deep: los mensajes nuevos se añaden a la lista existente (en Nuxt 4 useFetch no es reactivo en profundidad por defecto).
const { data: conv, error } = await useFetch<Conv>(() => `/api/conversaciones/${route.params.id}`, { deep: true })
if (error.value) throw createError({ statusCode: 404, statusMessage: 'Conversación no encontrada', fatal: true })

const list = ref<HTMLElement | null>(null)
const text = ref('')
const sending = ref(false)
const sendError = ref('')
let lastSync = conv.value?.serverTime ?? new Date().toISOString()

const scrollDown = () => nextTick(() => { if (list.value) list.value.scrollTop = list.value.scrollHeight })

// Refresco cada 5 s con la pestaña visible: mensajes nuevos y cambios (visitas aceptadas, rechazadas…).
async function poll() {
  if (!conv.value || document.hidden) return
  const last = conv.value.messages.filter(m => !m.pending).at(-1)?.id ?? 0
  const r = await $fetch<Conv>(`/api/conversaciones/${conv.value.id}`, { query: { desde: last, cambios: lastSync } }).catch(() => null)
  if (!r) return
  lastSync = r.serverTime
  conv.value.otherReadAt = r.otherReadAt
  let added = false
  for (const m of r.messages) {
    const i = conv.value.messages.findIndex(x => x.id === m.id)
    if (i >= 0) conv.value.messages.splice(i, 1, m)
    else { conv.value.messages.push(m); added = true }
  }
  if (added) scrollDown()
}
let timer: ReturnType<typeof setInterval> | undefined
onMounted(() => {
  scrollDown()
  refreshAccount()
  timer = setInterval(poll, 5000)
  document.addEventListener('visibilitychange', poll)
})
onBeforeUnmount(() => { clearInterval(timer); document.removeEventListener('visibilitychange', poll) })

async function send() {
  const body = text.value.trim()
  if (!body || !conv.value || sending.value) return
  sending.value = true
  sendError.value = ''
  const temp: Msg = { id: -Date.now(), body, kind: 'texto', createdAt: new Date().toISOString(), mine: true, pending: true }
  conv.value.messages.push(temp)
  text.value = ''
  scrollDown()
  try {
    const saved = await $fetch<Msg>(`/api/conversaciones/${conv.value.id}/mensajes`, { method: 'POST', body: { body } })
    const i = conv.value.messages.indexOf(temp)
    // Si el refresco ya lo trajo, se quita el provisional; si no, se sustituye.
    if (conv.value.messages.some(m => m.id === saved.id)) conv.value.messages.splice(i, 1)
    else conv.value.messages.splice(i, 1, { ...saved, kind: 'texto' })
  }
  catch (e) {
    conv.value.messages.splice(conv.value.messages.indexOf(temp), 1)
    text.value = body
    sendError.value = apiError(e).message
  }
  finally { sending.value = false }
}
function onKey(e: KeyboardEvent) {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
}

// Visitas
const proposing = ref(false)
const visitAt = ref('')
const minDate = new Date(Date.now() + 3600e3).toISOString().slice(0, 16)
async function proposeVisit() {
  if (!conv.value || !visitAt.value) return
  sendError.value = ''
  try {
    const m = await $fetch<Msg>(`/api/conversaciones/${conv.value.id}/visitas`, { method: 'POST', body: { at: visitAt.value } })
    conv.value.messages.push(m)
    proposing.value = false
    visitAt.value = ''
    scrollDown()
  }
  catch (e) { sendError.value = apiError(e).message }
}
async function answerVisit(m: Msg, action: 'aceptar' | 'rechazar' | 'cancelar') {
  if (!conv.value) return
  if (action === 'cancelar' && !confirm('¿Cancelar esta visita?')) return
  try {
    const r = await $fetch<{ meta: Msg['meta'] }>(`/api/conversaciones/${conv.value.id}/visitas/${m.id}`, { method: 'PUT', body: { action } })
    m.meta = r.meta
  }
  catch (e) { sendError.value = apiError(e).message }
}
const visitDate = (at: string) => new Intl.DateTimeFormat('es-ES', { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' }).format(new Date(`${at}:00`))
// Enlace para añadir la visita a Google Calendar (hora de España).
const calendarLink = (at: string) => {
  const start = at.replace(/[-:]/g, '') + '00'
  const end = new Date(new Date(`${at}:00`).getTime() + 30 * 60e3)
  const pad = (n: number) => String(n).padStart(2, '0')
  const endStr = `${end.getFullYear()}${pad(end.getMonth() + 1)}${pad(end.getDate())}T${pad(end.getHours())}${pad(end.getMinutes())}00`
  const title = `Visita: ${conv.value?.property.title}`
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${start}/${endStr}&ctz=Europe/Madrid&details=${encodeURIComponent('Visita acordada en RentaHucha')}`
}
const STATUS_LABEL: Record<VisitStatus, string> = { propuesta: 'Pendiente de respuesta', aceptada: 'Visita confirmada', rechazada: 'No le viene bien', cancelada: 'Visita cancelada' }

// Denunciar: bloquea la conversación y avisa al equipo.
const reporting = ref(false)
const reportReason = ref('')
const reportDetails = ref('')
async function report() {
  if (!conv.value || !reportReason.value) return
  try {
    await $fetch(`/api/conversaciones/${conv.value.id}/denunciar`, { method: 'POST', body: { reason: reportReason.value, details: reportDetails.value } })
    conv.value.blocked = true
    reporting.value = false
  }
  catch (e) { sendError.value = apiError(e).message }
}

// Perfil del inquilino (solo lo ve el propietario)
const tp = computed(() => conv.value?.tenantProfile ?? null)
const ratio = computed(() => {
  const income = tp.value?.income ? INCOME_MIDPOINT[tp.value.income] : 0
  return income && conv.value?.rent ? Math.round((conv.value.rent / income) * 100) : null
})
const showProfile = ref(false)

const time = (d: string) => new Intl.DateTimeFormat('es-ES', { hour: '2-digit', minute: '2-digit' }).format(new Date(d))
const day = (d: string) => new Intl.DateTimeFormat('es-ES', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date(d))
const showDay = (i: number) => i === 0 || new Date(conv.value!.messages[i - 1]!.createdAt).toDateString() !== new Date(conv.value!.messages[i]!.createdAt).toDateString()
const lastMineSeen = computed(() => {
  const c = conv.value
  if (!c?.otherReadAt) return null
  const last = c.messages.filter(m => m.mine && !m.pending).at(-1)
  return last && new Date(c.otherReadAt) >= new Date(last.createdAt) ? last.id : null
})
// Aviso si alguien habla de pagar o pega un IBAN antes de la visita.
const risky = computed(() => /\b(bizum|western union|se[ñn]al|adelanto|iban|es\d{2}\s?\d{4})\b/i.test(text.value))
</script>

<template>
  <section v-if="conv" class="section chat-section">
    <div class="container narrow">
      <AccountNav />
      <div class="chat card">
        <header>
          <NuxtLink to="/mi-cuenta/mensajes" class="back" aria-label="Volver a mensajes">←</NuxtLink>
          <div class="who">
            <strong>{{ conv.otherName }}</strong>
            <NuxtLink :to="`/pisos/${conv.property.id}`" class="small muted prop">{{ conv.property.title }} · {{ conv.property.city }}</NuxtLink>
          </div>
          <button v-if="conv.isOwner" type="button" class="btn btn-ghost btn-sm" :aria-expanded="showProfile" @click="showProfile = !showProfile">Perfil</button>
          <button v-if="!conv.blocked" type="button" class="link small" :aria-expanded="reporting" @click="reporting = !reporting">Denunciar</button>
        </header>

        <form v-if="reporting" class="report" @submit.prevent="report">
          <p class="small"><strong>Denunciar esta conversación.</strong> La bloquearemos para los dos y la revisará el equipo.</p>
          <select v-model="reportReason" class="select" required>
            <option value="" disabled>Motivo…</option>
            <option v-for="r in REPORT_REASONS" :key="r" :value="r">{{ r }}</option>
          </select>
          <textarea v-model="reportDetails" class="input" rows="2" maxlength="1000" placeholder="Cuéntanos qué ha pasado (opcional)" />
          <div class="v-actions left">
            <button class="btn btn-sm danger-btn" type="submit" :disabled="!reportReason">Denunciar y bloquear</button>
            <button type="button" class="link small" @click="reporting = false">Cancelar</button>
          </div>
        </form>

        <div v-if="conv.isOwner && showProfile" class="profile">
          <template v-if="tp">
            <p class="small muted">Lo que {{ conv.otherName.split(' ')[0] }} cuenta de sí mismo/a. Declarado, sin verificar.</p>
            <dl>
              <template v-if="tp.employment"><dt>Situación</dt><dd>{{ tp.employment }}</dd></template>
              <template v-if="tp.income"><dt>Ingresos netos/mes</dt><dd>{{ tp.income }}<span v-if="ratio" class="ratio" :class="{ ok: ratio <= 35, warn: ratio > 40 }"> · la renta sería ≈{{ ratio }} %</span></dd></template>
              <template v-if="tp.household"><dt>Convivencia</dt><dd>{{ tp.household }}{{ tp.people ? ` · ${tp.people} pers.` : '' }}</dd></template>
              <template v-if="tp.pets"><dt>Mascotas</dt><dd>{{ tp.pets }}</dd></template>
              <template v-if="tp.moveDate"><dt>Se mudaría</dt><dd>{{ new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(`${tp.moveDate}T12:00:00`)) }}</dd></template>
              <template v-if="tp.stay"><dt>Tiempo previsto</dt><dd>{{ tp.stay }}</dd></template>
            </dl>
            <p v-if="tp.about" class="about">{{ tp.about }}</p>
          </template>
          <p v-else class="small muted">{{ conv.otherName.split(' ')[0] }} aún no ha rellenado su perfil. Puedes preguntarle por su situación laboral, cuántas personas vivirían y cuándo se mudaría.</p>
          <p class="tiny muted">Decide con criterios objetivos y económicos: la ley prohíbe discriminar por origen, sexo, religión, orientación o discapacidad.</p>
        </div>

        <div ref="list" class="messages" aria-live="polite">
          <template v-for="(m, i) in conv.messages" :key="m.id">
            <div v-if="showDay(i)" class="day small muted">{{ day(m.createdAt) }}</div>
            <div v-if="m.kind === 'visita' && m.meta" class="visit" :class="[`v-${m.meta.status}`, { mine: m.mine }]">
              <span class="v-label">📅 {{ m.mine ? 'Has propuesto una visita' : `${conv.otherName.split(' ')[0]} propone una visita` }}</span>
              <strong class="v-date">{{ visitDate(m.meta.at) }}</strong>
              <span class="v-status">{{ STATUS_LABEL[m.meta.status] }}</span>
              <div class="v-actions">
                <template v-if="m.meta.status === 'propuesta' && !m.mine">
                  <button type="button" class="btn btn-primary btn-sm" @click="answerVisit(m, 'aceptar')">Aceptar</button>
                  <button type="button" class="btn btn-ghost btn-sm" @click="answerVisit(m, 'rechazar')">No me viene bien</button>
                </template>
                <a v-if="m.meta.status === 'aceptada'" :href="calendarLink(m.meta.at)" target="_blank" rel="noopener" class="btn btn-ghost btn-sm">Añadir al calendario</a>
                <button v-if="m.meta.status === 'aceptada' || (m.meta.status === 'propuesta' && m.mine)" type="button" class="link small" @click="answerVisit(m, 'cancelar')">Cancelar</button>
              </div>
            </div>
            <div v-else class="msg" :class="{ mine: m.mine, pending: m.pending }">
              <p>{{ m.body }}</p>
              <span class="meta">{{ time(m.createdAt) }}<template v-if="m.id === lastMineSeen"> · Visto</template></span>
            </div>
          </template>
        </div>

        <div v-if="conv.blocked" class="blocked small">Esta conversación está bloqueada tras una denuncia. Si crees que es un error, escríbenos a {{ useAppConfig().brand.email }}.</div>
        <form v-else class="composer" @submit.prevent="send">
          <p v-if="risky" class="warn small">Nunca pagues señales ni envíes dinero antes de visitar el piso y comprobar quién es el propietario.</p>
          <p v-if="sendError" class="err small" role="alert">{{ sendError }}</p>
          <div v-if="proposing" class="visit-form">
            <label for="visit-at" class="small"><strong>Proponer visita:</strong></label>
            <input id="visit-at" v-model="visitAt" class="input" type="datetime-local" :min="minDate" step="900">
            <button type="button" class="btn btn-primary btn-sm" :disabled="!visitAt" @click="proposeVisit">Enviar propuesta</button>
            <button type="button" class="link small" @click="proposing = false">Cancelar</button>
          </div>
          <div class="row">
            <button v-if="conv.property.status !== 'alquilado' && !proposing" type="button" class="icon-btn" title="Proponer una visita" aria-label="Proponer una visita" @click="proposing = true">📅</button>
            <label for="chat-text" class="sr-only">Escribe un mensaje</label>
            <textarea id="chat-text" v-model="text" class="input" rows="2" maxlength="4000" placeholder="Escribe un mensaje…" @keydown="onKey" />
            <button class="btn btn-primary" type="submit" :disabled="!text.trim() || sending">Enviar</button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
.narrow { max-width: 820px; }
.chat { padding: 0; display: flex; flex-direction: column; height: min(74vh, 780px); overflow: hidden; }
header { display: flex; gap: 12px; align-items: center; padding: 14px 18px; border-bottom: 1px solid var(--line); }
.who { display: grid; min-width: 0; flex: 1; }
.prop { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: var(--muted); }
.back { font-size: 1.3rem; text-decoration: none; color: var(--ink); }
.profile { padding: 14px 18px; border-bottom: 1px solid var(--line); background: #fff; display: grid; gap: 8px; max-height: 40vh; overflow-y: auto; }
.profile p { margin: 0; }
.profile dl { display: grid; grid-template-columns: max-content 1fr; gap: 4px 16px; margin: 0; font-size: 0.92rem; }
.profile dt { color: var(--muted); }
.profile dd { margin: 0; }
.ratio.ok { color: var(--green); }
.ratio.warn { color: var(--danger); }
.about { white-space: pre-line; font-size: 0.92rem; background: var(--off); padding: 10px 12px; border-radius: 10px; }
.tiny { font-size: 0.75rem; }
.messages { flex: 1; overflow-y: auto; padding: 18px; display: flex; flex-direction: column; gap: 8px; background: #fafafa; }
.day { align-self: center; margin: 8px 0 2px; }
.day::first-letter, .v-date::first-letter { text-transform: uppercase; }
.msg { max-width: 78%; align-self: flex-start; background: #fff; border: 1px solid var(--line); border-radius: 16px 16px 16px 4px; padding: 9px 13px; }
.msg.mine { align-self: flex-end; background: var(--lime-soft); border-color: transparent; border-radius: 16px 16px 4px 16px; }
.msg.pending { opacity: 0.6; }
.msg p { margin: 0; white-space: pre-wrap; overflow-wrap: anywhere; }
.meta { display: block; text-align: right; font-size: 0.72rem; color: var(--muted); margin-top: 2px; }
.visit { align-self: center; width: min(100%, 380px); border: 1px solid var(--line); background: #fff; border-radius: 16px; padding: 12px 14px; display: grid; gap: 4px; text-align: center; }
.v-label { font-size: 0.82rem; color: var(--muted); }
.v-date { display: block; font-size: 1.05rem; }
.v-status { font-size: 0.82rem; font-weight: 600; }
.v-aceptada { border-color: var(--green); background: var(--lime-soft); }
.v-aceptada .v-status { color: var(--green); }
.v-rechazada .v-status, .v-cancelada .v-status { color: var(--muted); }
.v-rechazada .v-date, .v-cancelada .v-date { text-decoration: line-through; color: var(--muted); }
.v-actions { display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; margin-top: 4px; align-items: center; }
.link { font: inherit; background: none; border: 0; text-decoration: underline; cursor: pointer; padding: 0; color: var(--muted); }
.composer { border-top: 1px solid var(--line); padding: 12px; display: grid; gap: 6px; }
.visit-form { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
.visit-form .input { width: auto; }
.row { display: flex; gap: 8px; align-items: flex-end; }
.row textarea { flex: 1; resize: none; min-width: 0; }
.icon-btn { flex: none; width: 44px; height: 44px; border-radius: 12px; border: 1px solid var(--line); background: #fff; cursor: pointer; font-size: 1.2rem; }
.warn { margin: 0; color: #8a5a00; background: #fff3cd; padding: 6px 10px; border-radius: 8px; }
.err { margin: 0; color: var(--danger); }
@media (max-width: 640px) { .chat-section { padding-top: 16px; } .chat { height: calc(100dvh - 190px); } .msg { max-width: 88%; } }
.report { padding: 12px 18px; border-bottom: 1px solid var(--line); background: #fff8f7; display: grid; gap: 8px; }
.report p { margin: 0; }
.v-actions.left { justify-content: flex-start; }
.danger-btn { background: var(--danger); color: #fff; border-color: var(--danger); }
.blocked { padding: 14px 18px; border-top: 1px solid var(--line); background: var(--off); color: var(--muted); }
</style>
