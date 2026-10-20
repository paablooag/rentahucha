<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const f = reactive({
  ciudad: typeof route.query.ciudad === 'string' ? route.query.ciudad : '',
  max: typeof route.query.max === 'string' ? route.query.max : '',
  hab: typeof route.query.hab === 'string' ? route.query.hab : '',
  tipo: typeof route.query.tipo === 'string' ? route.query.tipo : '',
})
const page = ref(1)
const query = computed(() => ({ ...Object.fromEntries(Object.entries(f).filter(([, v]) => v)), pagina: page.value }))
const { data, pending } = await useFetch<{ items: PublicProperty[]; hasMore: boolean }>('/api/pisos', { query, default: () => ({ items: [], hasMore: false }) })

// Los filtros se reflejan en la URL para poder compartir la búsqueda.
watch(() => ({ ...f }), (v) => {
  page.value = 1
  router.replace({ query: Object.fromEntries(Object.entries(v).filter(([, x]) => x)) })
})

const title = computed(() => (f.ciudad ? `Pisos en alquiler en ${f.ciudad}` : 'Pisos en alquiler'))
useSeoMeta({
  title: () => title.value,
  description: () => `${title.value} publicados directamente por sus propietarios y revisados por RentaHucha. Escribe al propietario sin dar tu teléfono.`,
})
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">Beta · Pisos de particulares revisados</span>
        <h1>{{ title }}</h1>
        <p class="lead">Anuncios publicados por sus propietarios y revisados por nosotros. Escríbeles desde aquí, sin dar tu teléfono. <NuxtLink to="/alquiler">Guías de alquiler por ciudad</NuxtLink>.</p>
      </div>

      <form class="filters" role="search" @submit.prevent>
        <div class="field">
          <label for="f-city">Ciudad o barrio</label>
          <input id="f-city" v-model.lazy="f.ciudad" class="input" placeholder="Madrid, Valencia…" autocomplete="address-level2">
        </div>
        <div class="field">
          <label for="f-max">Renta máxima</label>
          <select id="f-max" v-model="f.max" class="select">
            <option value="">Cualquiera</option>
            <option v-for="v in [500, 700, 900, 1100, 1300, 1600, 2000]" :key="v" :value="String(v)">{{ formatEuro(v) }}</option>
          </select>
        </div>
        <div class="field">
          <label for="f-hab">Habitaciones</label>
          <select id="f-hab" v-model="f.hab" class="select">
            <option value="">Cualquiera</option>
            <option v-for="v in [1, 2, 3, 4]" :key="v" :value="String(v)">{{ v }} o más</option>
          </select>
        </div>
        <div class="field">
          <label for="f-tipo">Tipo</label>
          <select id="f-tipo" v-model="f.tipo" class="select">
            <option value="">Todos</option>
            <option v-for="o in PROPERTY_OPTIONS.stayType" :key="o" :value="o">{{ o }}</option>
          </select>
        </div>
      </form>

      <div v-if="data.items.length" class="grid grid-3 results" :class="{ loading: pending }">
        <PropertyCard v-for="p in data.items" :key="p.id" :p="p" />
      </div>
      <div v-else-if="!pending" class="empty card">
        <h2>Todavía no hay pisos publicados{{ f.ciudad ? ` en ${f.ciudad}` : '' }}</h2>
        <p class="muted">Estamos empezando a abrir la plataforma ciudad a ciudad. Crea una alerta y te escribimos en cuanto se publique un piso que encaje contigo.</p>
        <AlertForm :city="f.ciudad" :max-rent="f.max" :min-bedrooms="f.hab" />
        <NuxtLink to="/cuenta/registro?tipo=propietario" class="small">¿Tienes un piso? Publícalo gratis</NuxtLink>
      </div>
      <div v-if="data.items.length" class="card alert-box">
        <strong>¿No ves el tuyo? Te avisamos de los nuevos</strong>
        <AlertForm :city="f.ciudad" :max-rent="f.max" :min-bedrooms="f.hab" />
      </div>
      <div v-if="data.hasMore || page > 1" class="pager">
        <button type="button" class="btn btn-ghost btn-sm" :disabled="page === 1" @click="page--">← Anteriores</button>
        <button type="button" class="btn btn-ghost btn-sm" :disabled="!data.hasMore" @click="page++">Siguientes →</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.filters { display: grid; gap: 12px; grid-template-columns: 2fr 1fr 1fr 1.4fr; margin-bottom: 24px; padding: 16px; border: 1px solid var(--line); border-radius: 18px; background: #fff; }
.filters > * { min-width: 0; }
@media (max-width: 800px) { .filters { grid-template-columns: 1fr 1fr; } .filters .field:first-child { grid-column: 1 / -1; } }
.results.loading { opacity: 0.6; }
.empty { display: grid; gap: 8px; justify-items: start; }
.empty h2 { font-size: 1.4rem; margin: 0; }
.empty p { margin: 0 0 6px; }
.row { display: flex; gap: 10px; flex-wrap: wrap; }
.pager { display: flex; gap: 10px; justify-content: center; margin-top: 24px; }
.alert-box { margin-top: 24px; display: grid; gap: 10px; }
</style>
