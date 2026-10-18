<script setup lang="ts">
definePageMeta({ middleware: 'cuenta' })
useSeoMeta({ title: 'Conversación', robots: 'noindex' })
const route = useRoute()
const { refresh: refreshAccount } = useAccount()

interface Msg { id: number; body: string; createdAt: string; mine: boolean; pending?: boolean }
interface Conv { id: string; property: { id: string; title: string; city: string; status: string }; otherName: string; otherReadAt: string | null; messages: Msg[] }

// deep: los mensajes nuevos se añaden a la lista existente (en Nuxt 4 useFetch no es reactivo en profundidad por defecto).
const { data: conv, error } = await useFetch<Conv>(() => `/api/conversaciones/${route.params.id}`, { deep: true })
if (error.value) throw createError({ statusCode: 404, statusMessage: 'Conversación no encontrada', fatal: true })

const list = ref<HTMLElement | null>(null)
const text = ref('')
const sending = ref(false)
const sendError = ref('')

const scrollDown = () => nextTick(() => { if (list.value) list.value.scrollTop = list.value.scrollHeight })

// Refresco: pide solo los mensajes nuevos cada 5 segundos mientras la pestaña está visible.
async function poll() {
  if (!conv.value || document.hidden) return
  const last = conv.value.messages.filter(m => !m.pending).at(-1)?.id ?? 0
  const r = await $fetch<Conv>(`/api/conversaciones/${conv.value.id}`, { query: { desde: last } }).catch(() => null)
  if (!r) return
  conv.value.otherReadAt = r.otherReadAt
  const known = new Set(conv.value.messages.map(m => m.id))
  const fresh = r.messages.filter(m => !known.has(m.id))
  if (fresh.length) {
    conv.value.messages.push(...fresh)
    scrollDown()
  }
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
  const temp: Msg = { id: -Date.now(), body, createdAt: new Date().toISOString(), mine: true, pending: true }
  conv.value.messages.push(temp)
  text.value = ''
  scrollDown()
  try {
    const saved = await $fetch<Msg>(`/api/conversaciones/${conv.value.id}/mensajes`, { method: 'POST', body: { body } })
    const i = conv.value.messages.indexOf(temp)
    // Si el refresco ya lo trajo, se quita el provisional; si no, se sustituye.
    if (conv.value.messages.some(m => m.id === saved.id)) conv.value.messages.splice(i, 1)
    else conv.value.messages.splice(i, 1, saved)
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

const time = (d: string) => new Intl.DateTimeFormat('es-ES', { hour: '2-digit', minute: '2-digit' }).format(new Date(d))
const day = (d: string) => new Intl.DateTimeFormat('es-ES', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date(d))
const showDay = (i: number) => i === 0 || new Date(conv.value!.messages[i - 1]!.createdAt).toDateString() !== new Date(conv.value!.messages[i]!.createdAt).toDateString()
const lastMineSeen = computed(() => {
  const c = conv.value
  if (!c?.otherReadAt) return null
  const mine = c.messages.filter(m => m.mine && !m.pending)
  const last = mine.at(-1)
  return last && new Date(c.otherReadAt) >= new Date(last.createdAt) ? last.id : null
})
// Aviso si alguien pega un teléfono, IBAN o pide dinero antes de la visita.
const risky = computed(() => /\b(bizum|western union|se[ñn]al|adelanto|iban|es\d{2}\s?\d{4})\b/i.test(text.value))
</script>

<template>
  <section v-if="conv" class="section chat-section">
    <div class="container narrow">
      <AccountNav />
      <div class="chat card">
        <header>
          <NuxtLink to="/mi-cuenta/mensajes" class="back" aria-label="Volver a mensajes">←</NuxtLink>
          <div>
            <strong>{{ conv.otherName }}</strong>
            <NuxtLink :to="`/pisos/${conv.property.id}`" class="small muted prop">{{ conv.property.title }} · {{ conv.property.city }}</NuxtLink>
          </div>
        </header>

        <div ref="list" class="messages" aria-live="polite">
          <template v-for="(m, i) in conv.messages" :key="m.id">
            <div v-if="showDay(i)" class="day small muted">{{ day(m.createdAt) }}</div>
            <div class="msg" :class="{ mine: m.mine, pending: m.pending }">
              <p>{{ m.body }}</p>
              <span class="meta">{{ time(m.createdAt) }}<template v-if="m.id === lastMineSeen"> · Visto</template></span>
            </div>
          </template>
        </div>

        <form class="composer" @submit.prevent="send">
          <p v-if="risky" class="warn small">Nunca pagues señales ni envíes dinero antes de visitar el piso y comprobar quién es el propietario.</p>
          <p v-if="sendError" class="err small" role="alert">{{ sendError }}</p>
          <div class="row">
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
.chat { padding: 0; display: flex; flex-direction: column; height: min(72vh, 760px); overflow: hidden; }
header { display: flex; gap: 12px; align-items: center; padding: 14px 18px; border-bottom: 1px solid var(--line); }
header > div { display: grid; min-width: 0; }
.prop { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: var(--muted); }
.back { font-size: 1.3rem; text-decoration: none; color: var(--ink); }
.messages { flex: 1; overflow-y: auto; padding: 18px; display: flex; flex-direction: column; gap: 8px; background: #fafafa; }
.day { align-self: center; text-transform: capitalize; margin: 8px 0 2px; }
.msg { max-width: 78%; align-self: flex-start; background: #fff; border: 1px solid var(--line); border-radius: 16px 16px 16px 4px; padding: 9px 13px; }
.msg.mine { align-self: flex-end; background: var(--lime-soft); border-color: transparent; border-radius: 16px 16px 4px 16px; }
.msg.pending { opacity: 0.6; }
.msg p { margin: 0; white-space: pre-wrap; overflow-wrap: anywhere; }
.meta { display: block; text-align: right; font-size: 0.72rem; color: var(--muted); margin-top: 2px; }
.composer { border-top: 1px solid var(--line); padding: 12px; display: grid; gap: 6px; }
.row { display: flex; gap: 8px; align-items: flex-end; }
.row textarea { flex: 1; resize: none; min-width: 0; }
.warn { margin: 0; color: #8a5a00; background: #fff3cd; padding: 6px 10px; border-radius: 8px; }
.err { margin: 0; color: var(--danger); }
@media (max-width: 640px) { .chat-section { padding-top: 16px; } .chat { height: calc(100dvh - 190px); } .msg { max-width: 88%; } }
</style>
