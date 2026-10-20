<script setup lang="ts">
// Bloque de comportamiento del panel de estadísticas: tiempo, páginas por visita, rebote, entradas y salidas,
// recorridos frecuentes y, por página, tiempo y scroll. Incluye el interruptor «no contar este dispositivo».
const props = defineProps<{ days: number }>()

interface Behavior {
  summary: { visits: number; pagesPerVisit: number; avgVisitMs: number; bounce: number; avgPageMs: number } | null
  entries: { path: string; visits: number }[]
  exits: { path: string; visits: number }[]
  flows: { fromPath: string; toPath: string; n: number }[]
  pages: { path: string; views: number; avgMs: number; avgScroll: number }[]
}
const { data: b, refresh } = await useFetch<Behavior>('/api/admin/comportamiento', { query: computed(() => ({ dias: props.days })) })
defineExpose({ refresh })

const dur = (ms: number) => {
  if (!ms) return '—'
  const s = Math.round(ms / 1000)
  return s < 60 ? `${s} s` : `${Math.floor(s / 60)} min ${String(s % 60).padStart(2, '0')} s`
}
const maxOf = (l: { visits: number }[]) => Math.max(1, ...l.map(i => i.visits))

// Excluir este dispositivo (p. ej. el móvil de Pablo) aunque no tenga la sesión del panel abierta.
const excluded = ref(false)
onMounted(() => { try { excluded.value = localStorage.getItem('rh-notrack') === '1' } catch {} })
function toggleExclude() {
  try {
    if (excluded.value) localStorage.removeItem('rh-notrack')
    else localStorage.setItem('rh-notrack', '1')
    excluded.value = !excluded.value
  }
  catch {}
}
</script>

<template>
  <section v-if="b" class="behavior">
    <div class="b-head">
      <h2>Comportamiento</h2>
      <label class="excl"><input type="checkbox" :checked="excluded" @change="toggleExclude"> No contar mis visitas desde este dispositivo</label>
    </div>
    <p class="small muted note">Tus visitas con la sesión del panel abierta ya no cuentan. Marca la casilla en cada dispositivo desde el que mires la web sin entrar al panel (por ejemplo, el móvil).</p>

    <div class="kpis">
      <div class="kpi"><span class="label">Tiempo medio en página</span><strong>{{ dur(b.summary?.avgPageMs ?? 0) }}</strong><span class="sub">tiempo con la página visible</span></div>
      <div class="kpi"><span class="label">Duración media de la visita</span><strong>{{ dur(b.summary?.avgVisitMs ?? 0) }}</strong><span class="sub">{{ b.summary?.visits ?? 0 }} visitas</span></div>
      <div class="kpi"><span class="label">Páginas por visita</span><strong>{{ String(b.summary?.pagesPerVisit ?? 0).replace('.', ',') }}</strong><span class="sub">media</span></div>
      <div class="kpi"><span class="label">Rebote</span><strong>{{ b.summary?.bounce ?? 0 }} %</strong><span class="sub">visitas de una sola página</span></div>
    </div>

    <div class="grid3">
      <div class="card">
        <h3>Por dónde entran</h3>
        <ul class="rank">
          <li v-for="e in b.entries" :key="e.path"><span class="rank-bar" :style="{ width: `${(e.visits / maxOf(b.entries)) * 100}%` }" /><span class="path">{{ e.path }}</span><span class="n">{{ e.visits }}</span></li>
          <li v-if="!b.entries.length" class="muted small">Sin datos todavía.</li>
        </ul>
      </div>
      <div class="card">
        <h3>Por dónde se van</h3>
        <ul class="rank">
          <li v-for="e in b.exits" :key="e.path"><span class="rank-bar exit" :style="{ width: `${(e.visits / maxOf(b.exits)) * 100}%` }" /><span class="path">{{ e.path }}</span><span class="n">{{ e.visits }}</span></li>
          <li v-if="!b.exits.length" class="muted small">Sin datos todavía.</li>
        </ul>
      </div>
      <div class="card">
        <h3>Recorridos más frecuentes</h3>
        <ul class="flows">
          <li v-for="f in b.flows" :key="f.fromPath + f.toPath"><span class="path">{{ f.fromPath }}</span><span class="arrow">→</span><span class="path">{{ f.toPath }}</span><span class="n">{{ f.n }}</span></li>
          <li v-if="!b.flows.length" class="muted small">Cuando la gente pase de una página a otra, aparecerá aquí.</li>
        </ul>
      </div>
    </div>

    <div class="card">
      <h3>Por página</h3>
      <div class="table-wrap">
        <table class="table">
          <thead><tr><th>Página</th><th class="num">Vistas</th><th class="num">Tiempo medio</th><th class="num">Scroll medio</th><th /></tr></thead>
          <tbody>
            <tr v-for="p in b.pages" :key="p.path">
              <td class="path-cell">{{ p.path }}</td>
              <td class="num">{{ p.views }}</td>
              <td class="num">{{ dur(p.avgMs) }}</td>
              <td class="num"><span class="scroll"><span :style="{ width: `${p.avgScroll}%` }" /></span> {{ p.avgScroll }} %</td>
              <td class="num"><NuxtLink :to="{ path: '/admin/mapa-calor', query: { ruta: p.path } }" class="small">Mapa de calor</NuxtLink></td>
            </tr>
            <tr v-if="!b.pages.length"><td colspan="5" class="muted">Sin datos todavía.</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<style scoped>
.behavior { display: grid; gap: 14px; margin-top: 28px; }
.b-head { display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap; }
.b-head h2 { font-size: 1.5rem; margin: 0; }
.excl { display: inline-flex; gap: 8px; align-items: center; font-size: 0.9rem; background: #fff; border: 1px solid var(--line); border-radius: 999px; padding: 6px 12px; }
.excl input { accent-color: var(--green); }
.note { margin: -6px 0 0; }
.kpis { display: grid; gap: 14px; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); }
.kpi { background: #fff; border: 1px solid var(--line); border-radius: 16px; padding: 16px; display: grid; gap: 4px; }
.kpi .label { font-size: 0.78rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: var(--muted); }
.kpi strong { font-size: 1.7rem; font-weight: 600; letter-spacing: -0.02em; }
.kpi .sub { font-size: 0.82rem; color: var(--muted); }
.grid3 { display: grid; gap: 14px; }
@media (min-width: 1000px) { .grid3 { grid-template-columns: 1fr 1fr 1.3fr; } }
h3 { font-size: 1.02rem; margin: 0 0 10px; }
.rank, .flows { list-style: none; padding: 0; margin: 0; display: grid; gap: 4px; }
.rank li { position: relative; display: flex; justify-content: space-between; gap: 10px; padding: 6px 8px; font-size: 0.88rem; border-radius: 6px; overflow: hidden; }
.rank-bar { position: absolute; inset: 0 auto 0 0; background: var(--lime-soft); border-radius: 6px; z-index: 0; }
.rank-bar.exit { background: #ffe8e4; }
.rank .path, .rank .n { position: relative; z-index: 1; }
.path { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; min-width: 0; }
.n { font-weight: 600; font-variant-numeric: tabular-nums; }
.flows li { display: grid; grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr) auto; gap: 8px; align-items: center; font-size: 0.86rem; padding: 6px 0; border-bottom: 1px solid var(--line); }
.arrow { color: var(--muted); }
.path-cell { max-width: 360px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.scroll { display: inline-block; width: 60px; height: 6px; background: var(--grey-02); border-radius: 99px; overflow: hidden; vertical-align: middle; margin-right: 6px; }
.scroll span { display: block; height: 100%; background: var(--green); }
</style>
