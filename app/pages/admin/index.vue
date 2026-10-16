<script setup lang="ts">
import type { LeadData } from '#shared/utils/leads'
import type { BlogPostSummary } from '#shared/utils/blog'

definePageMeta({ layout: 'admin', middleware: 'admin' })

type Lead = LeadData & { id: string; createdAt: string }
const { data } = await useFetch<{ leads: Lead[] }>('/api/admin/leads', { default: () => ({ leads: [] }) })
const { data: newsletter } = await useFetch<unknown[]>('/api/admin/newsletter', { default: () => [] })
const { data: posts } = await useFetch<BlogPostSummary[]>('/api/admin/blog', { default: () => [] })

const leads = computed(() => data.value.leads)
const owners = computed(() => leads.value.filter(l => l.role === 'propietario'))
const tenants = computed(() => leads.value.filter(l => l.role === 'inquilino'))
const agencies = computed(() => leads.value.filter(l => l.role === 'inmobiliaria'))
const agencyFlats = computed(() => agencies.value.filter(l => l.managedUnits === '50–150' || l.managedUnits === 'Más de 150').length)
const last7 = computed(() => leads.value.filter(l => Date.now() - new Date(l.createdAt).getTime() < 7 * 864e5).length)
const ownersSoon = computed(() => owners.value.filter(l => l.timing === 'Cuanto antes' || l.timing === 'En los próximos 3 meses').length)
const tenantsSoon = computed(() => tenants.value.filter(l => l.timing === 'Este mes' || l.timing === 'En 1–3 meses').length)
const ratio = computed(() => (owners.value.length ? (tenants.value.length / owners.value.length).toFixed(1) : '—'))

const pct = (n: number, total: number) => (total ? Math.round((n / total) * 100) : 0)
function countBy(list: Lead[], key: (l: Lead) => string | string[] | undefined) {
  const map = new Map<string, number>()
  for (const l of list) for (const k of [key(l)].flat()) if (k) map.set(k, (map.get(k) ?? 0) + 1)
  return map
}
const sorted = (m: Map<string, number>) => [...m.entries()].sort((a, b) => b[1] - a[1])

// Oferta y demanda en los mismos tramos para poder compararlas.
const ROOMS = ['Estudio', '1', '2', '3', '4 o más']
const roomOf = (v?: string) => (v === '4' || v === '5 o más' ? '4 o más' : v)
const RENTS = LEAD_OPTIONS.ownerRent
const rentBucket = (n?: number) => (!n ? undefined : n < 600 ? RENTS[0] : n <= 900 ? RENTS[1] : n <= 1200 ? RENTS[2] : RENTS[3])

const compare = computed(() => {
  const supplyRooms = countBy(owners.value, l => roomOf(l.bedrooms))
  const demandRooms = countBy(tenants.value, l => roomOf(l.wantedBedrooms))
  const supplyRent = countBy(owners.value, l => l.rentRange)
  const demandRent = countBy(tenants.value, l => rentBucket(l.maxRent))
  const rows = (keys: readonly string[], s: Map<string, number>, d: Map<string, number>) => keys.map(k => ({ k, s: s.get(k) ?? 0, d: d.get(k) ?? 0 }))
  return { rooms: rows(ROOMS, supplyRooms, demandRooms), rent: rows(RENTS, supplyRent, demandRent) }
})
const maxOf = (rows: { s: number; d: number }[]) => Math.max(1, ...rows.flatMap(r => [r.s, r.d]))

const tenantPets = computed(() => tenants.value.filter(l => l.pets && l.pets !== 'No').length)
const ownerPets = computed(() => owners.value.filter(l => l.features?.includes('Admite mascotas')).length)
const tenantSeasonal = computed(() => tenants.value.filter(l => l.stayType?.startsWith('Temporada')).length)
const ownerSeasonal = computed(() => owners.value.filter(l => l.stayPref?.startsWith('Temporada') || l.stayPref === 'Me da igual').length)
const avgPeople = computed(() => {
  const n = tenants.value.map(l => (l.people === '5 o más' ? 5 : Number(l.people))).filter(Boolean)
  return n.length ? (n.reduce((a, b) => a + b, 0) / n.length).toFixed(1) : '—'
})
const avgMaxRent = computed(() => {
  const r = tenants.value.map(l => l.maxRent ?? 0).filter(Boolean)
  return r.length ? Math.round(r.reduce((a, b) => a + b, 0) / r.length) : 0
})

const ages = computed(() => LEAD_OPTIONS.ageRange.map(a => [a, countBy(tenants.value, l => l.ageRange).get(a) ?? 0] as const))
const conditions = computed(() => LEAD_OPTIONS.condition.map(c => [c, countBy(owners.value, l => l.condition).get(c) ?? 0] as const))
const normCity = (c: string) => c.trim().toLowerCase().replace(/^./, m => m.toUpperCase())
const cities = computed(() => sorted(countBy(leads.value, l => normCity(l.city))).slice(0, 8))
const ownerInterests = computed(() => sorted(countBy(owners.value, l => l.interests)))
const tenantInterests = computed(() => sorted(countBy(tenants.value, l => l.interests)))
const published = computed(() => posts.value.filter(p => p.published).length)
</script>

<template>
  <div class="dash">
    <h1>Resumen</h1>
    <p class="muted intro">Lo que te dice la lista de espera sobre la demanda real: cuánta hay, dónde y si encaja oferta con demanda.</p>

    <div class="kpis">
      <div class="kpi dark">
        <span class="label">Interesados</span>
        <strong>{{ leads.length }}</strong>
        <span class="sub">{{ last7 }} en los últimos 7 días</span>
      </div>
      <div class="kpi">
        <span class="label">Propietarios</span>
        <strong>{{ owners.length }}</strong>
        <span class="sub">{{ ownersSoon }} quieren empezar en ≤ 3 meses</span>
      </div>
      <div class="kpi">
        <span class="label">Inquilinos</span>
        <strong>{{ tenants.length }}</strong>
        <span class="sub">{{ tenantsSoon }} se mudarían en ≤ 3 meses</span>
      </div>
      <div class="kpi">
        <span class="label">Inmobiliarias</span>
        <strong>{{ agencies.length }}</strong>
        <span class="sub">{{ agencyFlats }} gestionan 50 pisos o más</span>
      </div>
      <div class="kpi">
        <span class="label">Inquilinos por propietario</span>
        <strong>{{ ratio }}</strong>
        <span class="sub">objetivo del plan: 3–5 por piso</span>
      </div>
      <div class="kpi">
        <span class="label">Newsletter</span>
        <strong>{{ newsletter.length }}</strong>
        <NuxtLink to="/admin/newsletter" class="sub">ver correos →</NuxtLink>
      </div>
    </div>

    <h2 class="group">Oferta y demanda</h2>
    <div class="panels">
      <section class="card">
        <h3>Por habitaciones</h3>
        <p class="legend small"><span class="dot s" /> Pisos ofrecidos <span class="dot d" /> Inquilinos que lo buscan</p>
        <ul class="pairs">
          <li v-for="r in compare.rooms" :key="r.k">
            <span class="name">{{ r.k === 'Estudio' ? 'Estudio' : `${r.k} hab.` }}</span>
            <span class="bars2">
              <span class="b s" :style="{ width: `${pct(r.s, maxOf(compare.rooms))}%` }" />
              <span class="b d" :style="{ width: `${pct(r.d, maxOf(compare.rooms))}%` }" />
            </span>
            <span class="n">{{ r.s }} / {{ r.d }}</span>
          </li>
        </ul>
      </section>

      <section class="card">
        <h3>Por precio</h3>
        <p class="legend small"><span class="dot s" /> Renta de los pisos <span class="dot d" /> Renta máxima de inquilinos</p>
        <ul class="pairs">
          <li v-for="r in compare.rent" :key="r.k">
            <span class="name">{{ r.k }}</span>
            <span class="bars2">
              <span class="b s" :style="{ width: `${pct(r.s, maxOf(compare.rent))}%` }" />
              <span class="b d" :style="{ width: `${pct(r.d, maxOf(compare.rent))}%` }" />
            </span>
            <span class="n">{{ r.s }} / {{ r.d }}</span>
          </li>
        </ul>
        <p v-if="avgMaxRent" class="small muted foot">Renta máxima media de los inquilinos: <strong>{{ formatEuro(avgMaxRent) }}</strong></p>
      </section>

      <section class="card facts">
        <h3>Encaje de condiciones</h3>
        <div class="fact"><strong>{{ tenantPets }}</strong><span>inquilinos con mascota</span><strong>{{ ownerPets }}</strong><span>propietarios que las admiten</span></div>
        <div class="fact"><strong>{{ tenantSeasonal }}</strong><span>buscan temporada</span><strong>{{ ownerSeasonal }}</strong><span>propietarios abiertos a temporada</span></div>
        <div class="fact"><strong>{{ avgPeople }}</strong><span>personas de media por hogar inquilino</span></div>
      </section>
    </div>

    <h2 class="group">Perfiles</h2>
    <div class="panels">
      <section class="card">
        <h3>Edad de los inquilinos</h3>
        <ul class="bars">
          <li v-for="[a, n] in ages" :key="a">
            <span class="name">{{ a }}</span>
            <span class="bar"><span :style="{ width: `${pct(n, tenants.length)}%` }" /></span>
            <span class="n">{{ pct(n, tenants.length) }} %</span>
          </li>
        </ul>
      </section>

      <section class="card">
        <h3>Estado de los pisos</h3>
        <ul class="bars">
          <li v-for="[c, n] in conditions" :key="c">
            <span class="name">{{ c }}</span>
            <span class="bar"><span :style="{ width: `${pct(n, owners.length)}%` }" /></span>
            <span class="n">{{ pct(n, owners.length) }} %</span>
          </li>
        </ul>
      </section>

      <section class="card">
        <h3>Ciudades con más interés</h3>
        <p v-if="!cities.length" class="muted small">Todavía no hay datos.</p>
        <ul class="bars">
          <li v-for="[city, n] in cities" :key="city">
            <span class="name">{{ city }}</span>
            <span class="bar"><span :style="{ width: `${pct(n, cities[0]?.[1] ?? 1)}%` }" /></span>
            <span class="n">{{ n }}</span>
          </li>
        </ul>
      </section>

      <section class="card">
        <h3>Qué valoran los propietarios</h3>
        <p v-if="!ownerInterests.length" class="muted small">Todavía no hay datos.</p>
        <ul class="bars">
          <li v-for="[k, n] in ownerInterests" :key="k">
            <span class="name">{{ k }}</span>
            <span class="bar"><span :style="{ width: `${pct(n, owners.length)}%` }" /></span>
            <span class="n">{{ pct(n, owners.length) }} %</span>
          </li>
        </ul>
      </section>

      <section class="card">
        <h3>Qué valoran los inquilinos</h3>
        <p v-if="!tenantInterests.length" class="muted small">Todavía no hay datos.</p>
        <ul class="bars">
          <li v-for="[k, n] in tenantInterests" :key="k">
            <span class="name">{{ k }}</span>
            <span class="bar"><span :style="{ width: `${pct(n, tenants.length)}%` }" /></span>
            <span class="n">{{ pct(n, tenants.length) }} %</span>
          </li>
        </ul>
      </section>

      <section class="card">
        <h3>Blog</h3>
        <p class="big">{{ published }} <span class="muted">publicados de {{ posts.length }}</span></p>
        <div class="actions">
          <NuxtLink to="/admin/blog/nuevo" class="btn btn-primary btn-sm">Nuevo artículo</NuxtLink>
          <NuxtLink to="/admin/blog" class="btn btn-ghost btn-sm">Gestionar</NuxtLink>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
h1 { font-size: 2.2rem; margin-bottom: 4px; }
.intro { margin-bottom: 24px; }
.group { font-size: 1.3rem; font-weight: 600; letter-spacing: -0.02em; margin: 32px 0 12px; }
.kpis { display: grid; gap: 14px; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); }
.kpi { background: #fff; border: 1px solid var(--line); border-radius: 16px; padding: 18px 20px; display: grid; gap: 4px; align-content: start; }
.kpi.dark { background: var(--black); border-color: var(--black); color: #cfcfcf; }
.kpi .label { font-size: 0.82rem; color: var(--muted); }
.kpi.dark .label,
.kpi.dark .sub { color: #a8a8a8; }
.kpi strong { font-size: 2.4rem; font-weight: 500; letter-spacing: -0.03em; line-height: 1.1; }
.kpi.dark strong { color: var(--lime); }
.kpi .sub { font-size: 0.82rem; color: var(--muted); }
.panels { display: grid; gap: 14px; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); }
.card h3 { font-size: 1.05rem; font-weight: 600; letter-spacing: -0.01em; margin-bottom: 14px; }
.bars,
.pairs { list-style: none; padding: 0; margin: 0; display: grid; gap: 10px; }
.bars li,
.pairs li { display: grid; grid-template-columns: minmax(90px, 1.2fr) 2fr auto; gap: 10px; align-items: center; font-size: 0.9rem; }
.bar { height: 8px; background: var(--grey-01); border-radius: 99px; overflow: hidden; }
.bar span { display: block; height: 100%; background: var(--ink); border-radius: 99px; }
.bars2 { display: grid; gap: 3px; }
.b { display: block; height: 7px; border-radius: 99px; min-width: 2px; }
.b.s,
.dot.s { background: var(--ink); }
.b.d,
.dot.d { background: var(--lime); box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.25); }
.legend { display: flex; align-items: center; gap: 6px; color: var(--muted); margin: -6px 0 12px; flex-wrap: wrap; }
.dot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; margin-left: 6px; }
.dot:first-child { margin-left: 0; }
.n { font-variant-numeric: tabular-nums; color: var(--muted); min-width: 3ch; text-align: right; white-space: nowrap; }
.facts { display: grid; gap: 12px; align-content: start; }
.fact { display: grid; grid-template-columns: auto 1fr; gap: 2px 10px; align-items: baseline; padding-bottom: 10px; border-bottom: 1px solid var(--line); font-size: 0.9rem; }
.fact:last-child { border-bottom: 0; }
.fact strong { font-size: 1.5rem; font-weight: 500; letter-spacing: -0.02em; }
.foot { margin: 14px 0 0; }
.big { font-size: 2rem; font-weight: 500; letter-spacing: -0.03em; margin-bottom: 14px; }
.big .muted { font-size: 1rem; letter-spacing: 0; }
.actions { display: flex; gap: 8px; flex-wrap: wrap; }
</style>
