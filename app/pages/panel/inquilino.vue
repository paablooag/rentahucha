<script setup lang="ts">
import { passportDemo, tenantDemo, type Incident } from '~/data/demo'

definePageMeta({ layout: 'panel' })
useSeoMeta({ title: 'Mi alquiler', robots: 'noindex' })

const t = tenantDemo
const paidMonths = computed(() => t.payments.filter(p => p.status === 'puntual').length)
const hucha = computed(() => calcHucha(t.rent, t.huchaPct, paidMonths.value))
const huchaAtEnd = computed(() => calcHucha(t.rent, t.huchaPct, t.contractMonths))
const capPct = computed(() => Math.round((hucha.value.balance / hucha.value.cap) * 100))
const monthlyCharge = computed(() => t.rent + hucha.value.monthly)

const incidents = ref<Incident[]>([...t.incidents])
const showForm = ref(false)
const draft = reactive({ title: '', category: 'Fontanería' })
const categories = ['Fontanería', 'Electricidad', 'Electrodomésticos', 'Humedades', 'Carpintería', 'Otro']

function reportIncident() {
  if (!draft.title.trim()) return
  incidents.value.unshift({
    id: Date.now(),
    title: draft.title.trim(),
    category: draft.category,
    date: new Date().toISOString().slice(0, 10),
    status: 'abierta',
  })
  draft.title = ''
  showForm.value = false
}

const copied = ref(false)
async function sharePassport() {
  try {
    await navigator.clipboard.writeText(`${location.origin}${withBase('/pasaporte/demo')}?c=${passportDemo.code}`)
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  }
  catch {
    copied.value = false
  }
}

const statusBadge: Record<string, string> = { 'abierta': 'badge-amber', 'en curso': 'badge-amber', 'resuelta': '' }
</script>

<template>
  <div class="dash">
    <div class="hello">
      <div>
        <h1>Hola, {{ t.name.split(' ')[0] }}</h1>
        <p class="muted">{{ t.flat }}</p>
      </div>
    </div>

    <div class="grid kpis">
      <div class="card hucha">
        <div class="stat-label">Tu hucha</div>
        <div class="stat-value">{{ formatEuro(hucha.balance, true) }}</div>
        <div class="meter"><span :style="{ width: `${capPct}%` }" /></div>
        <p class="small muted">{{ capPct }} % del tope ({{ formatEuro(hucha.cap) }}). Si cumples el contrato, recuperarás unos <strong>{{ formatEuro(huchaAtEnd.payout) }}</strong> con el bonus.</p>
      </div>
      <div class="card">
        <div class="stat-label">Próximo cobro · {{ t.nextPaymentDate }}</div>
        <div class="stat-value">{{ formatEuro(monthlyCharge, true) }}</div>
        <p class="small muted">{{ formatEuro(t.rent) }} de renta + {{ formatEuro(hucha.monthly, true) }} a tu hucha</p>
      </div>
      <div class="card">
        <div class="stat-label">Pagos a tiempo</div>
        <div class="stat-value green">{{ paidMonths }} / {{ paidMonths }}</div>
        <p class="small muted">Racha perfecta desde el primer mes</p>
      </div>
    </div>

    <div class="grid cols">
      <section class="card">
        <h2 class="h">Historial de pagos</h2>
        <ul class="payments">
          <li v-for="p in [...t.payments].reverse()" :key="p.month">
            <span class="month">{{ p.month }}</span>
            <span class="amount">{{ formatEuro(p.amount) }}</span>
            <span class="badge" :class="{ 'badge-muted': p.status === 'pendiente' }">
              {{ p.status === 'puntual' ? `Pagado ${p.paidOn}` : 'Pendiente' }}
            </span>
          </li>
        </ul>
      </section>

      <div class="side">
        <section class="card">
          <div class="h-row">
            <h2 class="h">Incidencias del piso</h2>
            <button class="btn btn-sm btn-ghost" type="button" @click="showForm = !showForm">{{ showForm ? 'Cancelar' : 'Reportar' }}</button>
          </div>
          <form v-if="showForm" class="report" @submit.prevent="reportIncident">
            <input v-model="draft.title" class="input" placeholder="¿Qué ha pasado? Ej.: no funciona el horno" required>
            <select v-model="draft.category" class="select">
              <option v-for="c in categories" :key="c">{{ c }}</option>
            </select>
            <button class="btn btn-primary btn-sm" type="submit">Enviar al propietario</button>
            <span class="hint small muted">En la versión real podrás adjuntar fotos.</span>
          </form>
          <ul class="incidents">
            <li v-for="i in incidents" :key="i.id">
              <div>
                <strong>{{ i.title }}</strong>
                <span class="small muted">{{ i.category }} · {{ i.date }}</span>
              </div>
              <span class="badge" :class="statusBadge[i.status]">{{ i.status }}</span>
            </li>
          </ul>
        </section>

        <section class="card">
          <h2 class="h">Tu pasaporte</h2>
          <p class="small muted">Compártelo con un propietario para tu próximo piso. Solo verá un resumen verificado.</p>
          <button class="btn btn-amber btn-sm" type="button" @click="sharePassport">
            <AppIcon name="share" :size="16" /> {{ copied ? 'Enlace copiado' : 'Copiar enlace' }}
          </button>
          <NuxtLink to="/pasaporte/demo" class="small see">Ver cómo lo ven</NuxtLink>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dash { display: grid; gap: 20px; }
.hello h1 { font-size: 1.8rem; margin-bottom: 2px; }
.hello p { margin: 0; }
.kpis { grid-template-columns: 1fr; }
@media (min-width: 820px) { .kpis { grid-template-columns: 1.4fr 1fr 1fr; } }
.hucha { background: var(--amber-soft); border-color: #f0dcb8; }
.meter { height: 8px; background: rgba(184, 116, 26, 0.18); border-radius: 99px; margin: 12px 0; overflow: hidden; }
.meter span { display: block; height: 100%; background: var(--amber); border-radius: 99px; }
.card p { margin: 6px 0 0; }
.green { color: var(--green); }
.cols { grid-template-columns: 1fr; align-items: start; }
@media (min-width: 900px) { .cols { grid-template-columns: 1.2fr 1fr; } }
.side { display: grid; gap: 20px; }
.h { font-size: 1.1rem; margin-bottom: 12px; }
.h-row { display: flex; justify-content: space-between; align-items: center; gap: 12px; }
.payments,
.incidents { list-style: none; padding: 0; margin: 0; }
.payments li { display: grid; grid-template-columns: 1fr auto auto; gap: 12px; align-items: center; padding: 10px 0; border-bottom: 1px solid var(--line); }
.payments li:last-child,
.incidents li:last-child { border-bottom: 0; }
.month { text-transform: capitalize; font-weight: 500; }
.amount { font-variant-numeric: tabular-nums; color: var(--muted); }
.incidents li { display: flex; justify-content: space-between; gap: 12px; align-items: center; padding: 10px 0; border-bottom: 1px solid var(--line); }
.incidents li div { display: grid; }
.report { display: grid; gap: 10px; margin-bottom: 16px; padding: 14px; background: var(--off); border-radius: 12px; }
.see { display: inline-block; margin-left: 12px; }
</style>
