<script setup lang="ts">
import type { LeadData } from '#shared/utils/leads'
import { LEAD_STAGES, STAGE_LABELS, type LeadStage } from '#shared/utils/stages'

definePageMeta({ layout: 'admin', middleware: 'admin' })

type Lead = LeadData & { id: string; createdAt: string; consentAt: string; stage: LeadStage; notes: string; contactedAt?: string }
type Subscriber = { id: string; email: string; createdAt: string }
const { data, refresh } = await useFetch<{ leads: Lead[]; subscribers: Subscriber[] }>('/api/admin/leads', { default: () => ({ leads: [], subscribers: [] }) })

const tab = ref<'todos' | 'propietario' | 'inquilino' | 'inmobiliaria'>('todos')
const q = ref('')
const stageFilter = ref<LeadStage | 'todas'>('todas')
const openId = ref<string | null>(null)

const filtered = computed(() => {
  const term = q.value.trim().toLowerCase()
  return data.value.leads.filter(l =>
    (tab.value === 'todos' || l.role === tab.value)
    && (stageFilter.value === 'todas' || l.stage === stageFilter.value)
    && (!term || [l.name, l.email, l.city, l.phone].some(v => v?.toLowerCase().includes(term))))
})

const date = (d: string) => new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(d))

// Embudo de propietarios: el objetivo del mes son los «dispuestos a publicar».
const owners = computed(() => data.value.leads.filter(l => l.role === 'propietario'))
const stageCount = (s: LeadStage) => owners.value.filter(l => l.stage === s).length

const saving = ref<string | null>(null)
async function save(l: Lead, patch: { stage?: LeadStage; notes?: string }) {
  saving.value = l.id
  try {
    const r = await $fetch<{ stage: LeadStage; notes: string; contactedAt: string | null }>(`/api/admin/leads/${l.id}`, { method: 'PUT', body: patch })
    Object.assign(l, { stage: r.stage, notes: r.notes, contactedAt: r.contactedAt ?? undefined })
  }
  finally { saving.value = null }
}
// Al abrir el correo o WhatsApp, un interesado nuevo pasa a «Contactado».
function contacted(l: Lead) {
  if (l.stage === 'nuevo') save(l, { stage: 'contactado' })
}

async function remove(id: string, kind: 'leads' | 'newsletter', label: string) {
  if (!confirm(`¿Borrar definitivamente a ${label}? Úsalo cuando alguien pida que eliminemos sus datos.`)) return
  await $fetch(`/api/admin/leads/${id}`, { method: 'DELETE', query: { kind } })
  await refresh()
}
</script>

<template>
  <div>
    <div class="head">
      <div>
        <h1>Interesados</h1>
        <p class="muted">{{ data.leads.length }} en la lista de espera · <NuxtLink to="/admin/newsletter">ver suscriptores de la newsletter</NuxtLink></p>
      </div>
      <a :href="withBase('/api/admin/leads/export')" class="btn btn-dark btn-sm" download><AppIcon name="file" :size="16" /> Exportar CSV</a>
    </div>

    <div class="funnel" aria-label="Embudo de propietarios">
      <button v-for="st in LEAD_STAGES" :key="st" type="button" class="stage" :class="[`st-${st}`, { on: stageFilter === st }]" @click="stageFilter = stageFilter === st ? 'todas' : st; tab = 'propietario'">
        <strong>{{ stageCount(st) }}</strong>
        <span>{{ STAGE_LABELS[st] }}</span>
      </button>
    </div>

    <div class="toolbar">
      <div class="tabs" role="tablist">
        <button v-for="t in (['todos', 'propietario', 'inquilino', 'inmobiliaria'] as const)" :key="t" type="button" role="tab" :aria-selected="tab === t" :class="{ on: tab === t }" @click="tab = t">
          {{ { todos: 'Todos', propietario: 'Propietarios', inquilino: 'Inquilinos', inmobiliaria: 'Inmobiliarias' }[t] }}
        </button>
      </div>
      <input v-model="q" class="input search" type="search" placeholder="Buscar por nombre, email, ciudad…" aria-label="Buscar">
    </div>

    <div class="table-wrap">
      <table class="table">
        <thead>
          <tr><th>Fecha</th><th>Tipo</th><th>Nombre</th><th>Email</th><th>Ciudad</th><th>Fase</th><th>Clave</th><th /></tr>
        </thead>
        <tbody>
          <tr v-if="!filtered.length"><td colspan="8" class="muted">No hay interesados con este filtro.</td></tr>
          <template v-for="l in filtered" :key="l.id">
            <tr class="row" @click="openId = openId === l.id ? null : l.id">
              <td class="nowrap">{{ date(l.createdAt) }}</td>
              <td><span class="badge" :class="`b-${l.role}`">{{ l.role }}</span></td>
              <td>{{ l.name }}</td>
              <td>{{ l.email }}</td>
              <td>{{ l.city }}</td>
              <td><span class="pill" :class="`st-${l.stage}`">{{ STAGE_LABELS[l.stage] }}</span></td>
              <td class="small">{{ l.role === 'inmobiliaria' ? `${l.company} · ${l.managedUnits} pisos` : l.role === 'propietario' ? `${l.propertyType ?? 'Piso'} · ${l.bedrooms ?? '?'} hab. · ${l.rentRange}` : `${l.wantedBedrooms ?? '?'} hab. · ${l.people ?? '?'} pers. · hasta ${formatEuro(l.maxRent ?? 0)}` }} · {{ l.timing }}</td>
              <td class="num"><button type="button" class="link" :aria-expanded="openId === l.id">{{ openId === l.id ? 'Cerrar' : 'Ver' }}</button></td>
            </tr>
            <tr v-if="openId === l.id" class="detail">
              <td colspan="8">
                <div class="crm" @click.stop>
                  <div class="crm-actions">
                    <a :href="mailtoLink(l)" class="btn btn-dark btn-sm" @click="contacted(l)"><AppIcon name="bell" :size="16" /> Escribir correo</a>
                    <a v-if="whatsappLink(l)" :href="whatsappLink(l)!" target="_blank" rel="noopener" class="btn btn-ghost btn-sm" @click="contacted(l)">WhatsApp</a>
                    <a v-if="l.phone" :href="`tel:${l.phone}`" class="btn btn-ghost btn-sm">Llamar</a>
                    <label class="stage-select">Fase
                      <select class="select" :value="l.stage" :disabled="saving === l.id" @change="save(l, { stage: ($event.target as HTMLSelectElement).value as LeadStage })">
                        <option v-for="st in LEAD_STAGES" :key="st" :value="st">{{ STAGE_LABELS[st] }}</option>
                      </select>
                    </label>
                    <span v-if="l.contactedAt" class="small muted">Contactado el {{ date(l.contactedAt) }}</span>
                  </div>
                  <label class="notes">Notas internas
                    <textarea class="input" rows="3" :value="l.notes" placeholder="Qué le preocupa, cuándo llamarle, cómo es el piso…" @change="save(l, { notes: ($event.target as HTMLTextAreaElement).value })" />
                  </label>
                </div>
                <dl>
                  <dt>Teléfono</dt><dd>{{ l.phone || '—' }}</dd>
                  <template v-if="l.role === 'inmobiliaria'">
                    <dt>Inmobiliaria</dt><dd>{{ l.company }}</dd>
                    <dt>Pisos gestionados</dt><dd>{{ l.managedUnits }}</dd>
                  </template>
                  <template v-else-if="l.role === 'propietario'">
                    <dt>Pisos</dt><dd>{{ l.units }}</dd>
                    <dt>Renta</dt><dd>{{ l.rentRange }}</dd>
                    <dt>Situación</dt><dd>{{ l.flatStatus }}</dd>
                    <dt>Vivienda</dt><dd>{{ l.propertyType || '—' }} · {{ l.bedrooms || '?' }} habitaciones · {{ l.bathrooms || '?' }} baños{{ l.sizeM2 ? ` · ${l.sizeM2} m²` : '' }}</dd>
                    <dt>Estado</dt><dd>{{ l.condition || '—' }}</dd>
                    <dt>Mobiliario</dt><dd>{{ l.furnished || '—' }}</dd>
                    <dt>Extras</dt><dd>{{ l.features?.join(', ') || '—' }}</dd>
                    <dt>Prefiere</dt><dd>{{ l.stayPref || '—' }}</dd>
                  </template>
                  <template v-else>
                    <dt>Renta máxima</dt><dd>{{ formatEuro(l.maxRent ?? 0) }}</dd>
                    <dt>Busca</dt><dd>{{ l.wantedBedrooms || '?' }} habitaciones · {{ l.wantedBathrooms || '?' }} baños</dd>
                    <dt>Estancia</dt><dd>{{ l.stayType || '—' }}</dd>
                    <dt>Imprescindibles</dt><dd>{{ l.mustHaves?.join(', ') || '—' }}</dd>
                    <dt>Edad</dt><dd>{{ l.ageRange ? `${l.ageRange} años` : '—' }}</dd>
                    <dt>Personas</dt><dd>{{ l.people || '—' }}{{ l.household ? ` · ${l.household}` : '' }}</dd>
                    <dt>Situación laboral</dt><dd>{{ l.employment || '—' }}</dd>
                    <dt>Mascotas</dt><dd>{{ l.pets || '—' }}</dd>
                  </template>
                  <dt>Cuándo</dt><dd>{{ l.timing }}</dd>
                  <dt>Intereses</dt><dd>{{ l.interests.join(', ') || '—' }}</dd>
                  <dt>Comentarios</dt><dd>{{ l.comments || '—' }}</dd>
                  <dt>Newsletter</dt><dd>{{ l.consentNews ? 'Sí' : 'No' }}</dd>
                  <dt>Consentimiento</dt><dd>{{ date(l.consentAt) }}</dd>
                </dl>
                <button type="button" class="btn btn-ghost btn-sm danger-btn" @click.stop="remove(l.id, 'leads', l.email)">Borrar sus datos</button>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.head { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; flex-wrap: wrap; margin-bottom: 20px; }
h1 { font-size: 2.2rem; margin-bottom: 4px; }
.head p { margin: 0; }
.toolbar { display: flex; gap: 12px; flex-wrap: wrap; align-items: center; margin-bottom: 16px; }
.tabs { display: inline-flex; gap: 4px; padding: 4px; background: #fff; border: 1px solid var(--line); border-radius: 999px; flex-wrap: wrap; }
.tabs button { font: inherit; font-size: 0.9rem; border: 0; background: transparent; border-radius: 999px; padding: 8px 14px; cursor: pointer; color: var(--muted); }
.tabs button.on { background: var(--ink); color: #fff; }
.search { max-width: 320px; }
.nowrap { white-space: nowrap; }
.row { cursor: pointer; }
.row:hover td { background: #f6f6f6 !important; }
.b-propietario { background: var(--ink); color: var(--lime); }
.b-inquilino { background: var(--lime); color: var(--ink); }
.b-inmobiliaria { background: #dfe5ff; color: var(--ink); }
.link { font: inherit; background: none; border: 0; color: var(--ink); text-decoration: underline; cursor: pointer; padding: 0; }
.danger { color: var(--danger); }
.detail td { background: #fafafa !important; }
.detail dl { display: grid; grid-template-columns: max-content 1fr; gap: 6px 18px; margin: 4px 0 14px; font-size: 0.9rem; }
.detail dt { font-weight: 600; }
.detail dd { margin: 0; }
.funnel { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 8px; margin-bottom: 16px; }
.stage { font: inherit; text-align: left; border: 1px solid var(--line); background: #fff; border-radius: 14px; padding: 12px 14px; cursor: pointer; display: grid; gap: 2px; }
.stage strong { font-size: 1.5rem; font-weight: 600; }
.stage span { font-size: 0.82rem; color: var(--muted); }
.stage.on { border-color: var(--ink); box-shadow: inset 0 0 0 1px var(--ink); }
.stage.st-listo { background: var(--lime-soft); }
.pill { display: inline-block; font-size: 0.78rem; padding: 3px 9px; border-radius: 999px; background: var(--grey-01); white-space: nowrap; }
.pill.st-nuevo { background: #fff3cd; }
.pill.st-conversacion { background: #dfe5ff; }
.pill.st-listo { background: var(--lime); }
.pill.st-descartado { color: var(--muted); text-decoration: line-through; }
.crm { display: grid; gap: 12px; padding: 4px 0 16px; margin-bottom: 14px; border-bottom: 1px solid var(--line); cursor: default; }
.crm-actions { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
.stage-select { display: inline-flex; gap: 8px; align-items: center; font-size: 0.85rem; font-weight: 600; }
.stage-select .select { width: auto; }
.notes { display: grid; gap: 6px; font-size: 0.85rem; font-weight: 600; max-width: 720px; }
.notes textarea { font-weight: 400; }
.danger-btn { color: var(--danger); border-color: var(--danger-soft); }
</style>
