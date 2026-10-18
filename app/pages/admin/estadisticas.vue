<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })
useHead({ title: 'Estadísticas' })

interface Stats {
  days: number
  realtime: { visitors: number; pages: { path: string; visitors: number }[] }
  today: { visitors: number; views: number }
  yesterday: { visitors: number; views: number }
  series: { day: string; visitors: number; views: number }[]
  totalVisitors: number
  pages: { path: string; views: number; visitors: number }[]
  referrers: { source: string; visitors: number }[]
  campaigns: { campaign: string; visitors: number }[]
  devices: { device: string; visitors: number }[]
  events: Record<string, number>
  leads: { propietario: number; inquilino: number; inmobiliaria: number }
  owners: { visitors: number; totalSignups: number; goal: number }
}

const days = ref(30)
const { data: s, refresh } = await useFetch<Stats>('/api/admin/stats', { query: { dias: days } })

// El tiempo real se refresca solo cada 20 segundos.
let timer: ReturnType<typeof setInterval> | undefined
onMounted(() => { timer = setInterval(() => refresh(), 20_000) })
onBeforeUnmount(() => clearInterval(timer))

const fmt = (n: number) => new Intl.NumberFormat('es-ES').format(n)
const pct = (a: number, b: number) => (b ? `${((a / b) * 100).toFixed(1).replace('.', ',')} %` : '—')
const dayLabel = (d: string) => new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'short' }).format(new Date(`${d}T12:00:00`))
const delta = computed(() => {
  if (!s.value) return null
  const { today, yesterday } = s.value
  if (!yesterday.visitors) return null
  return Math.round(((today.visitors - yesterday.visitors) / yesterday.visitors) * 100)
})

const maxDay = computed(() => Math.max(1, ...(s.value?.series.map(d => d.visitors) ?? [1])))
const goalPct = computed(() => Math.min(100, ((s.value?.owners.totalSignups ?? 0) / (s.value?.owners.goal ?? 10)) * 100))
const hover = ref<number | null>(null)
const maxOf = (list: { visitors: number }[]) => Math.max(1, ...list.map(i => i.visitors))
</script>

<template>
  <div v-if="s">
    <div class="head">
      <div>
        <h1>Estadísticas</h1>
        <p class="muted">Sin cookies: visitantes anónimos contados por día. Se actualiza cada 20 segundos.</p>
      </div>
      <div class="tabs" role="tablist" aria-label="Periodo">
        <button v-for="d in [7, 30, 90]" :key="d" type="button" role="tab" :aria-selected="days === d" :class="{ on: days === d }" @click="days = d">{{ d }} días</button>
      </div>
    </div>

    <!-- Objetivo del mes y tiempo real -->
    <div class="top">
      <section class="card goal">
        <span class="label">Objetivo del mes</span>
        <strong class="big">{{ s.owners.totalSignups }} <small>de {{ s.owners.goal }} propietarios</small></strong>
        <div class="goal-bar" role="progressbar" :aria-valuenow="s.owners.totalSignups" aria-valuemin="0" :aria-valuemax="s.owners.goal"><span :style="{ width: `${goalPct}%` }" /></div>
        <p class="small muted">{{ fmt(s.owners.visitors) }} {{ s.owners.visitors === 1 ? 'visitante vio' : 'visitantes vieron' }} páginas para propietarios en {{ s.days }} días · conversión {{ pct(s.leads.propietario, s.owners.visitors) }}</p>
      </section>

      <section class="card live">
        <span class="label"><span class="dot" aria-hidden="true" /> Ahora en la web</span>
        <strong class="big">{{ s.realtime.visitors }}</strong>
        <ul v-if="s.realtime.pages.length" class="mini">
          <li v-for="p in s.realtime.pages" :key="p.path"><span class="path">{{ p.path }}</span><span>{{ p.visitors }}</span></li>
        </ul>
        <p v-else class="small muted">Nadie en los últimos 5 minutos.</p>
      </section>
    </div>

    <!-- Cifras clave -->
    <div class="kpis">
      <div class="kpi">
        <span class="label">Visitantes hoy</span>
        <strong>{{ fmt(s.today.visitors) }}</strong>
        <span class="sub">{{ delta === null ? `${fmt(s.today.views)} páginas vistas` : `${delta >= 0 ? '+' : ''}${delta} % frente a ayer` }}</span>
      </div>
      <div class="kpi">
        <span class="label">Visitantes ({{ s.days }} días)</span>
        <strong>{{ fmt(s.totalVisitors) }}</strong>
        <span class="sub">suma de visitantes diarios</span>
      </div>
      <div class="kpi">
        <span class="label">Propietarios apuntados</span>
        <strong>{{ s.leads.propietario }}</strong>
        <span class="sub">en {{ s.days }} días</span>
      </div>
      <div class="kpi">
        <span class="label">Inquilinos apuntados</span>
        <strong>{{ s.leads.inquilino }}</strong>
        <span class="sub">en {{ s.days }} días</span>
      </div>
      <div class="kpi">
        <span class="label">Inmobiliarias</span>
        <strong>{{ s.leads.inmobiliaria }}</strong>
        <span class="sub">en {{ s.days }} días</span>
      </div>
      <div class="kpi">
        <span class="label">Newsletter</span>
        <strong>{{ s.events.newsletter ?? 0 }}</strong>
        <span class="sub">altas en {{ s.days }} días</span>
      </div>
      <div class="kpi">
        <span class="label">Checklist</span>
        <strong>{{ s.events.checklist ?? 0 }}</strong>
        <span class="sub">descargas en {{ s.days }} días</span>
      </div>
    </div>

    <!-- Visitantes por día -->
    <section class="card chart-card">
      <h2>Visitantes por día</h2>
      <div class="chart" role="img" :aria-label="`Visitantes por día en los últimos ${s.days} días`" @mouseleave="hover = null">
        <div
          v-for="(d, i) in s.series"
          :key="d.day"
          class="col"
          @mouseenter="hover = i"
          @focus="hover = i"
        >
          <span class="bar" :style="{ height: `${(d.visitors / maxDay) * 100}%` }" />
          <span v-if="hover === i" class="tip" :class="{ left: i > s.series.length * 0.7 }">
            <strong>{{ dayLabel(d.day) }}</strong>
            {{ fmt(d.visitors) }} {{ d.visitors === 1 ? 'visitante' : 'visitantes' }} · {{ fmt(d.views) }} {{ d.views === 1 ? 'página' : 'páginas' }}
          </span>
        </div>
      </div>
      <div class="axis small muted">
        <span>{{ dayLabel(s.series[0]?.day ?? '') }}</span>
        <span>máx. {{ fmt(maxDay) }}</span>
        <span>{{ dayLabel(s.series.at(-1)?.day ?? '') }}</span>
      </div>
      <details class="table-view">
        <summary>Ver como tabla</summary>
        <table class="table">
          <thead><tr><th>Día</th><th class="num">Visitantes</th><th class="num">Páginas vistas</th></tr></thead>
          <tbody><tr v-for="d in [...s.series].reverse()" :key="d.day"><td>{{ dayLabel(d.day) }}</td><td class="num">{{ fmt(d.visitors) }}</td><td class="num">{{ fmt(d.views) }}</td></tr></tbody>
        </table>
      </details>
    </section>

    <!-- Listas -->
    <div class="lists">
      <section class="card">
        <h2>Páginas más vistas</h2>
        <ul class="rank">
          <li v-for="p in s.pages" :key="p.path">
            <span class="rank-bar" :style="{ width: `${(p.visitors / maxOf(s.pages)) * 100}%` }" />
            <a :href="p.path" target="_blank" class="path">{{ p.path }}</a>
            <span class="n">{{ fmt(p.visitors) }}</span>
          </li>
          <li v-if="!s.pages.length" class="muted small">Todavía no hay visitas registradas.</li>
        </ul>
      </section>

      <section class="card">
        <h2>De dónde llegan</h2>
        <ul class="rank">
          <li v-for="r in s.referrers" :key="r.source">
            <span class="rank-bar" :style="{ width: `${(r.visitors / maxOf(s.referrers)) * 100}%` }" />
            <span class="path">{{ r.source }}</span>
            <span class="n">{{ fmt(r.visitors) }}</span>
          </li>
          <li v-if="!s.referrers.length" class="muted small">Sin datos todavía.</li>
        </ul>

        <h2 class="mt">Campañas (utm)</h2>
        <ul class="rank">
          <li v-for="c in s.campaigns" :key="c.campaign">
            <span class="rank-bar" :style="{ width: `${(c.visitors / maxOf(s.campaigns)) * 100}%` }" />
            <span class="path">{{ c.campaign }}</span>
            <span class="n">{{ fmt(c.visitors) }}</span>
          </li>
          <li v-if="!s.campaigns.length" class="muted small">Añade ?utm_source=…&amp;utm_campaign=… a los enlaces que compartas para verlos aquí.</li>
        </ul>

        <h2 class="mt">Dispositivos</h2>
        <ul class="rank">
          <li v-for="d in s.devices" :key="d.device">
            <span class="rank-bar" :style="{ width: `${(d.visitors / maxOf(s.devices)) * 100}%` }" />
            <span class="path">{{ d.device }}</span>
            <span class="n">{{ fmt(d.visitors) }}</span>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<style scoped>
.head { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; flex-wrap: wrap; margin-bottom: 20px; }
h1 { font-size: 2.2rem; margin-bottom: 4px; }
.head p { margin: 0; }
.tabs { display: inline-flex; gap: 4px; padding: 4px; background: #fff; border: 1px solid var(--line); border-radius: 999px; }
.tabs button { font: inherit; font-size: 0.9rem; border: 0; background: transparent; border-radius: 999px; padding: 7px 14px; cursor: pointer; color: var(--muted); }
.tabs button.on { background: var(--ink); color: #fff; }
.label { font-size: 0.8rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: var(--muted); display: inline-flex; align-items: center; gap: 6px; }
.top { display: grid; gap: 14px; margin-bottom: 14px; }
@media (min-width: 900px) { .top { grid-template-columns: 1.4fr 1fr; } }
.big { display: block; font-size: 3rem; font-weight: 600; letter-spacing: -0.03em; line-height: 1.1; margin: 6px 0 10px; }
.big small { font-size: 1rem; font-weight: 400; color: var(--muted); }
.goal-bar { height: 10px; background: var(--grey-01); border-radius: 99px; overflow: hidden; margin-bottom: 10px; }
.goal-bar span { display: block; height: 100%; background: var(--lime); border-radius: 99px; transition: width 0.4s; }
.goal p, .live p { margin: 0; }
.dot { width: 8px; height: 8px; border-radius: 50%; background: #2db84d; box-shadow: 0 0 0 0 rgba(45, 184, 77, 0.6); animation: pulse 2s infinite; }
@keyframes pulse { 70% { box-shadow: 0 0 0 8px rgba(45, 184, 77, 0); } 100% { box-shadow: 0 0 0 0 rgba(45, 184, 77, 0); } }
@media (prefers-reduced-motion: reduce) { .dot { animation: none; } }
.mini { list-style: none; padding: 0; margin: 0; display: grid; gap: 4px; font-size: 0.88rem; }
.mini li { display: flex; justify-content: space-between; gap: 10px; }
.kpis { display: grid; gap: 14px; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); margin-bottom: 14px; }
.kpi { background: #fff; border: 1px solid var(--line); border-radius: 16px; padding: 16px; display: grid; gap: 4px; }
.kpi strong { font-size: 1.8rem; font-weight: 600; letter-spacing: -0.02em; }
.kpi .sub { font-size: 0.82rem; color: var(--muted); }
.chart-card { margin-bottom: 14px; }
.chart-card h2, .lists h2 { font-size: 1.05rem; margin: 0 0 12px; }
.chart { display: flex; align-items: flex-end; gap: 2px; height: 200px; border-bottom: 1px solid var(--line); }
.col { flex: 1; height: 100%; display: flex; align-items: flex-end; position: relative; cursor: default; }
.bar { width: 100%; min-height: 2px; background: var(--ink); border-radius: 4px 4px 0 0; transition: height 0.3s; }
.col:hover .bar { background: #444; }
.tip { position: absolute; bottom: calc(100% + 6px); left: 50%; transform: translateX(-50%); background: var(--ink); color: #fff; font-size: 0.78rem; padding: 6px 10px; border-radius: 8px; white-space: nowrap; z-index: 2; pointer-events: none; display: grid; }
.tip.left { left: auto; right: 0; transform: none; }
.axis { display: flex; justify-content: space-between; margin-top: 6px; }
.table-view { margin-top: 12px; font-size: 0.9rem; }
.table-view summary { cursor: pointer; color: var(--muted); }
.lists { display: grid; gap: 14px; }
@media (min-width: 900px) { .lists { grid-template-columns: 1.3fr 1fr; } }
.mt { margin-top: 20px !important; }
.rank { list-style: none; padding: 0; margin: 0; display: grid; gap: 4px; }
.rank li { position: relative; display: flex; justify-content: space-between; gap: 10px; padding: 6px 8px; font-size: 0.9rem; border-radius: 6px; overflow: hidden; }
.rank-bar { position: absolute; inset: 0 auto 0 0; background: var(--lime-soft); z-index: 0; border-radius: 6px; }
.rank .path, .rank .n { position: relative; z-index: 1; }
.rank .path { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: var(--ink); text-decoration: none; }
.rank a.path:hover { text-decoration: underline; }
.rank .n { font-weight: 600; font-variant-numeric: tabular-nums; }
</style>
