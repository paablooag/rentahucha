<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })
useHead({ title: 'Google' })

interface Agg { clicks: number; impressions: number; position: number }
interface Google {
  configured: boolean
  syncedAt: string | null
  lastDay: string | null
  days: number
  series: ({ day: string } & Agg)[]
  totals: Agg | null
  previous: Agg | null
  queries: ({ query: string; page: string } & Agg)[]
  pages: ({ page: string } & Agg)[]
  opportunities: ({ query: string; page: string } & Agg)[]
  unclicked: ({ page: string } & Agg)[]
}

const days = ref(28)
const { data: g, refresh } = await useFetch<Google>('/api/admin/google', { query: { dias: days } })

const fmt = (n: number) => new Intl.NumberFormat('es-ES').format(n)
const dec = (n: number) => String(n).replace('.', ',')
const ctr = (a: Agg | null) => (a?.impressions ? `${((a.clicks / a.impressions) * 100).toFixed(1).replace('.', ',')} %` : '—')
const dayLabel = (d: string) => new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'short' }).format(new Date(`${d}T12:00:00`))
const when = (iso: string) => new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }).format(new Date(iso))
// Variación frente al periodo anterior; en la posición, bajar es mejorar.
function change(key: keyof Agg) {
  const a = g.value?.totals?.[key] ?? 0
  const b = g.value?.previous?.[key] ?? 0
  if (!b) return null
  if (key === 'position') return { text: `${a <= b ? '▲' : '▼'} ${dec(Math.abs(a - b).toFixed(1))} puestos`, good: a <= b }
  const pct = Math.round(((a - b) / b) * 100)
  return { text: `${pct >= 0 ? '▲' : '▼'} ${Math.abs(pct)} %`, good: pct >= 0 }
}

const maxDay = computed(() => Math.max(1, ...(g.value?.series.map(d => d.impressions) ?? [1])))
const hover = ref<number | null>(null)

const syncing = ref(false)
const syncMsg = ref('')
async function sync() {
  syncing.value = true
  syncMsg.value = ''
  try {
    const r = await $fetch<{ ok: boolean; days?: number; queries?: number; reason?: string }>('/api/admin/google/sync', { method: 'POST' })
    syncMsg.value = r.ok ? `Actualizado: ${r.days} días y ${fmt(r.queries ?? 0)} filas de búsquedas.` : (r.reason ?? 'No se pudo actualizar.')
    await refresh()
  }
  catch (e) { syncMsg.value = apiError(e).message }
  finally { syncing.value = false }
}
</script>

<template>
  <div v-if="g">
    <div class="head">
      <div>
        <h1>Google</h1>
        <p class="muted">Cómo nos encuentran en el buscador, según Google Search Console. Google publica los datos con 2-3 días de retraso.</p>
      </div>
      <div class="tabs" role="tablist" aria-label="Periodo">
        <button v-for="d in [7, 28, 90]" :key="d" type="button" role="tab" :aria-selected="days === d" :class="{ on: days === d }" @click="days = d">{{ d }} días</button>
      </div>
    </div>

    <p v-if="!g.configured" class="note small">Search Console no está configurado en este servidor (falta <code>NUXT_GSC_KEY_FILE</code>).</p>
    <p class="small muted sync">
      <template v-if="g.lastDay">Datos hasta el {{ dayLabel(g.lastDay) }}</template><template v-if="g.syncedAt"> · actualizado el {{ when(g.syncedAt) }} (se actualiza solo cada 6 horas)</template>
      <button v-if="g.configured" type="button" class="btn btn-ghost btn-sm" :disabled="syncing" @click="sync">{{ syncing ? 'Actualizando…' : 'Actualizar ahora' }}</button>
      <span v-if="syncMsg" role="status">{{ syncMsg }}</span>
    </p>

    <template v-if="g.totals">
      <div class="kpis">
        <div v-for="k in (['clicks', 'impressions'] as const)" :key="k" class="kpi">
          <span class="label">{{ k === 'clicks' ? 'Clics' : 'Impresiones' }}</span>
          <strong>{{ fmt(g.totals[k]) }}</strong>
          <span v-if="change(k)" class="sub" :class="change(k)!.good ? 'up' : 'down'">{{ change(k)!.text }} frente a los {{ g.days }} días anteriores</span>
          <span v-else class="sub">{{ k === 'clicks' ? 'visitas desde Google' : 'veces que aparecemos' }}</span>
        </div>
        <div class="kpi">
          <span class="label">CTR</span>
          <strong>{{ ctr(g.totals) }}</strong>
          <span class="sub">de cada 100 que nos ven, cuántos entran</span>
        </div>
        <div class="kpi">
          <span class="label">Posición media</span>
          <strong>{{ dec(g.totals.position) }}</strong>
          <span v-if="change('position')" class="sub" :class="change('position')!.good ? 'up' : 'down'">{{ change('position')!.text }}</span>
          <span v-else class="sub">1-10 es la primera página</span>
        </div>
      </div>

      <section class="card chart-card">
        <h2>Impresiones por día</h2>
        <div class="chart" role="img" :aria-label="`Impresiones en Google por día en los últimos ${g.days} días`" @mouseleave="hover = null">
          <div v-for="(d, i) in g.series" :key="d.day" class="col" @mouseenter="hover = i">
            <span class="bar" :style="{ height: `${(d.impressions / maxDay) * 100}%` }" />
            <span v-if="hover === i" class="tip" :class="{ left: i > g.series.length * 0.7 }">
              <strong>{{ dayLabel(d.day) }}</strong>
              {{ fmt(d.impressions) }} impresiones · {{ fmt(d.clicks) }} {{ d.clicks === 1 ? 'clic' : 'clics' }}<template v-if="d.position"> · posición {{ dec(d.position) }}</template>
            </span>
          </div>
        </div>
        <div class="axis small muted">
          <span>{{ dayLabel(g.series[0]?.day ?? '') }}</span>
          <span>máx. {{ fmt(maxDay) }}</span>
          <span>{{ dayLabel(g.series.at(-1)?.day ?? '') }}</span>
        </div>
        <details class="table-view">
          <summary>Ver como tabla</summary>
          <table class="table">
            <thead><tr><th>Día</th><th class="num">Impresiones</th><th class="num">Clics</th><th class="num">Posición</th></tr></thead>
            <tbody><tr v-for="d in [...g.series].reverse()" :key="d.day"><td>{{ dayLabel(d.day) }}</td><td class="num">{{ fmt(d.impressions) }}</td><td class="num">{{ fmt(d.clicks) }}</td><td class="num">{{ d.position ? dec(d.position) : '—' }}</td></tr></tbody>
          </table>
        </details>
      </section>

      <div class="grid2">
        <section class="card">
          <h2>Oportunidades</h2>
          <p class="small muted">Búsquedas en las que salimos entre el puesto 4 y el 20. Mejorando esa página (más completa, mejor título) es fácil subir.</p>
          <div class="table-wrap">
            <table class="table">
              <thead><tr><th>Búsqueda</th><th class="num">Impr.</th><th class="num">Pos.</th></tr></thead>
              <tbody>
                <tr v-for="o in g.opportunities" :key="o.query">
                  <td><span class="q">{{ o.query }}</span><a :href="o.page" target="_blank" class="pg small">{{ o.page }}</a></td>
                  <td class="num">{{ fmt(o.impressions) }}</td><td class="num">{{ dec(o.position) }}</td>
                </tr>
                <tr v-if="!g.opportunities.length"><td colspan="3" class="muted small">Ninguna todavía.</td></tr>
              </tbody>
            </table>
          </div>
        </section>
        <section class="card">
          <h2>Se ven pero nadie entra</h2>
          <p class="small muted">Páginas con 10 o más impresiones y ningún clic: conviene mejorar el título y la descripción.</p>
          <div class="table-wrap">
            <table class="table">
              <thead><tr><th>Página</th><th class="num">Impr.</th><th class="num">Pos.</th></tr></thead>
              <tbody>
                <tr v-for="p in g.unclicked" :key="p.page"><td><a :href="p.page" target="_blank" class="pg">{{ p.page }}</a></td><td class="num">{{ fmt(p.impressions) }}</td><td class="num">{{ dec(p.position) }}</td></tr>
                <tr v-if="!g.unclicked.length"><td colspan="3" class="muted small">Ninguna.</td></tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <div class="grid2">
        <section class="card">
          <h2>Búsquedas</h2>
          <p class="small muted">Google no muestra las búsquedas muy poco frecuentes, así que la suma es menor que el total.</p>
          <div class="table-wrap">
            <table class="table">
              <thead><tr><th>Búsqueda</th><th class="num">Clics</th><th class="num">Impr.</th><th class="num">Pos.</th></tr></thead>
              <tbody>
                <tr v-for="r in g.queries" :key="r.query"><td><span class="q">{{ r.query }}</span><a :href="r.page" target="_blank" class="pg small">{{ r.page }}</a></td><td class="num">{{ fmt(r.clicks) }}</td><td class="num">{{ fmt(r.impressions) }}</td><td class="num">{{ dec(r.position) }}</td></tr>
                <tr v-if="!g.queries.length"><td colspan="4" class="muted small">Sin datos.</td></tr>
              </tbody>
            </table>
          </div>
        </section>
        <section class="card">
          <h2>Páginas</h2>
          <div class="table-wrap">
            <table class="table">
              <thead><tr><th>Página</th><th class="num">Clics</th><th class="num">Impr.</th><th class="num">Pos.</th></tr></thead>
              <tbody>
                <tr v-for="p in g.pages" :key="p.page"><td><a :href="p.page" target="_blank" class="pg">{{ p.page }}</a></td><td class="num">{{ fmt(p.clicks) }}</td><td class="num">{{ fmt(p.impressions) }}</td><td class="num">{{ dec(p.position) }}</td></tr>
                <tr v-if="!g.pages.length"><td colspan="4" class="muted small">Sin datos.</td></tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </template>
    <p v-else-if="g.configured" class="muted">Todavía no hay datos guardados. Pulsa «Actualizar ahora».</p>
  </div>
</template>

<style scoped>
.head { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; flex-wrap: wrap; margin-bottom: 12px; }
h1 { font-size: 2.2rem; margin-bottom: 4px; }
.head p { margin: 0; }
.tabs { display: inline-flex; gap: 4px; padding: 4px; background: #fff; border: 1px solid var(--line); border-radius: 999px; }
.tabs button { font: inherit; font-size: 0.9rem; border: 0; background: transparent; border-radius: 999px; padding: 7px 14px; cursor: pointer; color: var(--muted); }
.tabs button.on { background: var(--ink); color: #fff; }
.sync { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; margin: 0 0 16px; }
.label { font-size: 0.8rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: var(--muted); }
.kpis { display: grid; gap: 14px; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); margin-bottom: 14px; }
.kpi { background: #fff; border: 1px solid var(--line); border-radius: 16px; padding: 16px; display: grid; gap: 4px; }
.kpi strong { font-size: 1.8rem; font-weight: 600; letter-spacing: -0.02em; }
.kpi .sub { font-size: 0.82rem; color: var(--muted); }
.kpi .sub.up { color: var(--green); }
.kpi .sub.down { color: var(--danger); }
.chart-card { margin-bottom: 14px; }
h2 { font-size: 1.05rem; margin: 0 0 8px; }
.chart { display: flex; align-items: flex-end; gap: 2px; height: 180px; border-bottom: 1px solid var(--line); }
.col { flex: 1; height: 100%; display: flex; align-items: flex-end; position: relative; }
.bar { width: 100%; min-height: 2px; background: var(--ink); border-radius: 4px 4px 0 0; transition: height 0.3s; }
.col:hover .bar { background: #444; }
.tip { position: absolute; bottom: calc(100% + 6px); left: 50%; transform: translateX(-50%); background: var(--ink); color: #fff; font-size: 0.78rem; padding: 6px 10px; border-radius: 8px; white-space: nowrap; z-index: 2; pointer-events: none; display: grid; }
.tip.left { left: auto; right: 0; transform: none; }
.axis { display: flex; justify-content: space-between; margin-top: 6px; }
.table-view { margin-top: 12px; font-size: 0.9rem; }
.table-view summary { cursor: pointer; color: var(--muted); }
.grid2 { display: grid; gap: 14px; margin-bottom: 14px; }
@media (min-width: 1000px) { .grid2 { grid-template-columns: 1fr 1fr; } }
.grid2 .card > p { margin: 0 0 10px; }
.table td { vertical-align: top; }
.q { display: block; font-weight: 500; }
.pg { display: block; max-width: 360px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: var(--muted); }
.note { background: var(--lime-soft); padding: 10px 14px; border-radius: 12px; }
</style>
