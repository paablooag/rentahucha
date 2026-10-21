<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })
useHead({ title: 'Pisos' })

interface AdminPiso {
  id: string; status: PropertyStatus; reviewNote: string; title: string; city: string; district: string; address: string; rent: number
  bedrooms: number; bathrooms: number; sizeM2: number | null; energyRating: string; stayType: string; description: string
  regCode: string; referenceIndex: string; rentLimit: string; bigHolder: boolean
  createdAt: string; updatedAt: string; publishedAt: string | null; ownerName: string; ownerEmail: string; ownerPhone: string
  photos: string[]; conversations: number
}
interface Denuncia { id: string; reason: string; details: string; createdAt: string; resolvedAt: string | null; reporterName: string; reporterEmail: string; propertyTitle: string; ownerEmail: string; tenantEmail: string; messages: { from: string; body: string; at: string }[] }
const { data, refresh } = await useFetch<{ pisos: AdminPiso[]; usuarios: Record<string, number>; mensajes30: number; denuncias: Denuncia[] }>('/api/admin/pisos', {
  default: () => ({ pisos: [], usuarios: {}, mensajes30: 0, denuncias: [] }),
})
const filter = ref<PropertyStatus | 'todos'>('revision')
const list = computed(() => data.value.pisos.filter(p => filter.value === 'todos' || p.status === filter.value))
const count = (s: PropertyStatus) => data.value.pisos.filter(p => p.status === s).length
const openId = ref<string | null>(null)
const notes = reactive<Record<string, string>>({})
const date = (d: string) => new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }).format(new Date(d))

const openReports = computed(() => data.value.denuncias.filter(d => !d.resolvedAt))
async function resolveReport(d: Denuncia, action: 'resolver' | 'desbloquear') {
  await $fetch(`/api/admin/denuncias/${d.id}`, { method: 'POST', body: { action } })
  await refresh()
}
async function act(p: AdminPiso, action: 'aprobar' | 'rechazar') {
  try {
    await $fetch(`/api/admin/pisos/${p.id}`, { method: 'POST', body: { action, note: notes[p.id] } })
    await refresh()
  }
  catch (e) { alert(apiError(e).message) }
}
</script>

<template>
  <div>
    <div class="head">
      <div>
        <h1>Pisos</h1>
        <p class="muted">{{ data.usuarios.propietario ?? 0 }} cuentas de propietario · {{ data.usuarios.inquilino ?? 0 }} de inquilino · {{ data.mensajes30 }} mensajes en 30 días</p>
      </div>
    </div>

    <section v-if="openReports.length" class="reports">
      <h2>Denuncias pendientes ({{ openReports.length }})</h2>
      <article v-for="d in openReports" :key="d.id" class="card report">
        <p><strong>{{ d.reason }}</strong> · {{ date(d.createdAt) }} · denuncia {{ d.reporterName }} ({{ d.reporterEmail }})</p>
        <p class="small muted">Piso: {{ d.propertyTitle }} · propietario {{ d.ownerEmail }} · inquilino {{ d.tenantEmail }}</p>
        <p v-if="d.details" class="small">«{{ d.details }}»</p>
        <details class="small"><summary>Últimos mensajes</summary>
          <p v-for="(m, i) in d.messages" :key="i"><strong>{{ m.from }}:</strong> {{ m.body }}</p>
        </details>
        <div class="btns">
          <button type="button" class="btn btn-dark btn-sm" @click="resolveReport(d, 'resolver')">Resuelta (sigue bloqueada)</button>
          <button type="button" class="btn btn-ghost btn-sm" @click="resolveReport(d, 'desbloquear')">Resuelta y desbloquear</button>
        </div>
        <p class="tiny muted">Solo se leen mensajes para atender la denuncia. Si hay una cuenta que abusa, bórrala o escríbele.</p>
      </article>
    </section>

    <div class="tabs" role="tablist">
      <button v-for="s in (['revision', 'publicado', 'rechazado', 'borrador', 'pausado', 'alquilado'] as const)" :key="s" type="button" role="tab" :aria-selected="filter === s" :class="{ on: filter === s }" @click="filter = s">
        {{ PROPERTY_STATUS[s] }} <span>{{ count(s) }}</span>
      </button>
      <button type="button" role="tab" :aria-selected="filter === 'todos'" :class="{ on: filter === 'todos' }" @click="filter = 'todos'">Todos <span>{{ data.pisos.length }}</span></button>
    </div>

    <p v-if="!list.length" class="muted">No hay pisos en este estado.</p>
    <div class="list">
      <article v-for="p in list" :key="p.id" class="card item">
        <div class="row-top" @click="openId = openId === p.id ? null : p.id">
          <img v-if="p.photos[0]" :src="`/api/fotos/${p.photos[0]}`" alt="" class="thumb">
          <div class="info">
            <strong>{{ p.title }}</strong>
            <span class="small muted">{{ p.district ? `${p.district}, ` : '' }}{{ p.city }} · {{ formatEuro(p.rent) }} · {{ p.bedrooms }} hab. · {{ p.photos.length }} fotos · CEE {{ p.energyRating || '—' }}</span>
            <span class="small muted">{{ p.ownerName }} · {{ p.ownerEmail }}{{ p.ownerPhone ? ` · ${p.ownerPhone}` : '' }} · actualizado {{ date(p.updatedAt) }} · {{ p.conversations }} conversaciones</span>
          </div>
          <span class="st">{{ PROPERTY_STATUS[p.status] }}</span>
        </div>
        <div v-if="openId === p.id || p.status === 'revision'" class="detail">
          <div class="photos"><img v-for="f in p.photos" :key="f" :src="`/api/fotos/${f}`" alt="" loading="lazy"></div>
          <p class="desc small">{{ p.description }}</p>
          <p class="small"><strong>Dirección (privada):</strong> {{ p.address || '—' }} · <strong>Tipo:</strong> {{ p.stayType }}</p>
          <p class="small"><strong>Datos legales:</strong> índice {{ p.referenceIndex || '—' }} · límite {{ p.rentLimit || '—' }} · registro {{ p.regCode || '—' }} · {{ p.bigHolder ? 'gran tenedor' : 'no gran tenedor' }}</p>
          <p v-if="p.reviewNote" class="small"><strong>Última nota:</strong> {{ p.reviewNote }}</p>
          <div class="review">
            <textarea v-model="notes[p.id]" class="input" rows="2" placeholder="Si pides cambios: qué tiene que corregir (lo verá el propietario)" />
            <div class="btns">
              <button v-if="p.status !== 'publicado'" type="button" class="btn btn-primary btn-sm" @click="act(p, 'aprobar')">Aprobar y publicar</button>
              <button type="button" class="btn btn-ghost btn-sm" @click="act(p, 'rechazar')">{{ p.status === 'publicado' ? 'Retirar con nota' : 'Pedir cambios' }}</button>
              <NuxtLink v-if="p.status === 'publicado'" :to="`/pisos/${p.id}`" target="_blank" class="small">Ver anuncio</NuxtLink>
            </div>
          </div>
          <p class="tiny muted">Revisa: fotos reales del piso, renta coherente, sin teléfonos ni correos en el texto, sin criterios discriminatorios y con calificación energética.</p>
        </div>
      </article>
    </div>
  </div>
</template>

<style scoped>
.head { margin-bottom: 16px; }
h1 { font-size: 2.2rem; margin: 0 0 4px; }
.head p { margin: 0; }
.tabs { display: inline-flex; flex-wrap: wrap; gap: 4px; padding: 4px; background: #fff; border: 1px solid var(--line); border-radius: 999px; margin-bottom: 16px; }
.tabs button { font: inherit; font-size: 0.88rem; border: 0; background: transparent; border-radius: 999px; padding: 7px 12px; cursor: pointer; color: var(--muted); }
.tabs button span { font-weight: 600; margin-left: 4px; }
.tabs button.on { background: var(--ink); color: #fff; }
.list { display: grid; gap: 12px; }
.reports { margin-bottom: 24px; display: grid; gap: 10px; }
.reports h2 { font-size: 1.2rem; margin: 0; color: var(--danger); }
.report { border-color: var(--danger-soft); display: grid; gap: 6px; }
.report p { margin: 0; }
.item { padding: 14px; }
.row-top { display: flex; gap: 14px; align-items: center; cursor: pointer; }
.thumb { width: 96px; aspect-ratio: 4 / 3; object-fit: cover; border-radius: 10px; flex: none; }
.info { display: grid; gap: 2px; flex: 1; min-width: 0; }
.st { font-size: 0.78rem; font-weight: 600; padding: 3px 10px; border-radius: 999px; background: var(--grey-01); white-space: nowrap; }
.detail { margin-top: 14px; display: grid; gap: 10px; }
.photos { display: flex; gap: 8px; overflow-x: auto; }
.photos img { height: 120px; border-radius: 8px; flex: none; }
.desc { white-space: pre-line; margin: 0; max-width: 760px; }
.detail p { margin: 0; }
.review { display: grid; gap: 8px; max-width: 760px; }
.btns { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
.tiny { font-size: 0.78rem; }
</style>
