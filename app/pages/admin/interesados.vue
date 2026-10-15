<script setup lang="ts">
import type { LeadData } from '#shared/utils/leads'

definePageMeta({ layout: 'admin', middleware: 'admin' })

type Lead = LeadData & { id: string; createdAt: string; consentAt: string }
type Subscriber = { id: string; email: string; createdAt: string }
const { data, refresh } = await useFetch<{ leads: Lead[]; subscribers: Subscriber[] }>('/api/admin/leads', { default: () => ({ leads: [], subscribers: [] }) })

const tab = ref<'todos' | 'propietario' | 'inquilino'>('todos')
const q = ref('')
const openId = ref<string | null>(null)

const filtered = computed(() => {
  const term = q.value.trim().toLowerCase()
  return data.value.leads.filter(l =>
    (tab.value === 'todos' || l.role === tab.value)
    && (!term || [l.name, l.email, l.city, l.phone].some(v => v?.toLowerCase().includes(term))))
})

const date = (d: string) => new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(d))

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

    <div class="toolbar">
      <div class="tabs" role="tablist">
        <button v-for="t in (['todos', 'propietario', 'inquilino'] as const)" :key="t" type="button" role="tab" :aria-selected="tab === t" :class="{ on: tab === t }" @click="tab = t">
          {{ { todos: 'Todos', propietario: 'Propietarios', inquilino: 'Inquilinos' }[t] }}
        </button>
      </div>
      <input v-model="q" class="input search" type="search" placeholder="Buscar por nombre, email, ciudad…" aria-label="Buscar">
    </div>

    <div class="table-wrap">
      <table class="table">
        <thead>
          <tr><th>Fecha</th><th>Tipo</th><th>Nombre</th><th>Email</th><th>Ciudad</th><th>Clave</th><th /></tr>
        </thead>
        <tbody>
          <tr v-if="!filtered.length"><td colspan="7" class="muted">No hay interesados con este filtro.</td></tr>
          <template v-for="l in filtered" :key="l.id">
            <tr class="row" @click="openId = openId === l.id ? null : l.id">
              <td class="nowrap">{{ date(l.createdAt) }}</td>
              <td><span class="badge" :class="l.role === 'propietario' ? 'b-owner' : 'b-tenant'">{{ l.role }}</span></td>
              <td>{{ l.name }}</td>
              <td>{{ l.email }}</td>
              <td>{{ l.city }}</td>
              <td class="small">{{ l.role === 'propietario' ? `${l.propertyType ?? 'Piso'} · ${l.bedrooms ?? '?'} hab. · ${l.rentRange}` : `${l.wantedBedrooms ?? '?'} hab. · ${l.people ?? '?'} pers. · hasta ${formatEuro(l.maxRent ?? 0)}` }} · {{ l.timing }}</td>
              <td class="num"><button type="button" class="link" :aria-expanded="openId === l.id">{{ openId === l.id ? 'Cerrar' : 'Ver' }}</button></td>
            </tr>
            <tr v-if="openId === l.id" class="detail">
              <td colspan="7">
                <dl>
                  <dt>Teléfono</dt><dd>{{ l.phone || '—' }}</dd>
                  <template v-if="l.role === 'propietario'">
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
.b-owner { background: var(--ink); color: var(--lime); }
.b-tenant { background: var(--lime); color: var(--ink); }
.link { font: inherit; background: none; border: 0; color: var(--ink); text-decoration: underline; cursor: pointer; padding: 0; }
.danger { color: var(--danger); }
.detail td { background: #fafafa !important; }
.detail dl { display: grid; grid-template-columns: max-content 1fr; gap: 6px 18px; margin: 4px 0 14px; font-size: 0.9rem; }
.detail dt { font-weight: 600; }
.detail dd { margin: 0; }
.danger-btn { color: var(--danger); border-color: var(--danger-soft); }
</style>
