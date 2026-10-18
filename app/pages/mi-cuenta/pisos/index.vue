<script setup lang="ts">
definePageMeta({ middleware: 'cuenta' })
useSeoMeta({ title: 'Mis pisos', robots: 'noindex' })
const { user } = useAccount()
if (user.value?.role !== 'propietario') await navigateTo('/mi-cuenta')

const { data: pisos } = await useFetch<Property[]>('/api/mis-pisos', { default: () => [] })
</script>

<template>
  <section class="section">
    <div class="container">
      <AccountNav />
      <div class="head">
        <h1>Mis pisos</h1>
        <NuxtLink to="/mi-cuenta/pisos/nuevo" class="btn btn-primary">+ Nuevo anuncio</NuxtLink>
      </div>

      <div v-if="!pisos.length" class="empty card">
        <h2>Publica tu primer piso</h2>
        <p class="muted">Rellena los datos, sube al menos 3 fotos y envíalo a revisión. Lo revisamos y lo publicamos, normalmente en menos de 24 horas.</p>
        <NuxtLink to="/mi-cuenta/pisos/nuevo" class="btn btn-dark">Empezar</NuxtLink>
      </div>

      <div v-else class="list">
        <NuxtLink v-for="p in pisos" :key="p.id" :to="`/mi-cuenta/pisos/${p.id}`" class="item card">
          <div class="thumb">
            <img v-if="p.photos[0]" :src="`/api/fotos/${p.photos[0].id}`" alt="" loading="lazy">
            <span v-else class="muted small">Sin fotos</span>
          </div>
          <div class="info">
            <span class="status" :class="`s-${p.status}`">{{ PROPERTY_STATUS[p.status] }}</span>
            <strong>{{ p.title }}</strong>
            <span class="muted small">{{ p.district ? `${p.district}, ` : '' }}{{ p.city }} · {{ formatEuro(p.rent) }}/mes · {{ p.bedrooms }} hab.</span>
            <span v-if="p.status === 'publicado' || p.status === 'alquilado'" class="small stats">{{ p.views30 ?? 0 }} visitas en 30 días · {{ p.conversations ?? 0 }} interesados · {{ p.favorites ?? 0 }} guardados</span>
            <span v-if="p.status === 'rechazado' && p.reviewNote" class="note-small">Cambios pedidos: {{ p.reviewNote }}</span>
          </div>
          <span class="go">Editar →</span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.head { display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap; margin-bottom: 20px; }
h1 { font-size: 2.2rem; margin: 0; }
.empty { display: grid; gap: 8px; justify-items: start; }
.empty h2 { font-size: 1.4rem; margin: 0; }
.list { display: grid; gap: 12px; }
.item { display: flex; gap: 16px; align-items: center; color: var(--ink); text-decoration: none; padding: 14px; transition: border-color 0.15s; }
.item:hover { border-color: var(--green); }
.thumb { width: 120px; aspect-ratio: 4 / 3; border-radius: 12px; overflow: hidden; background: var(--grey-01); display: grid; place-items: center; flex: none; }
.thumb img { width: 100%; height: 100%; object-fit: cover; }
.info { display: grid; gap: 4px; flex: 1; min-width: 0; }
.info strong { overflow: hidden; text-overflow: ellipsis; }
.status { justify-self: start; font-size: 0.75rem; font-weight: 600; padding: 3px 10px; border-radius: 999px; background: var(--grey-01); }
.s-publicado { background: var(--lime); }
.s-revision { background: #fff3cd; }
.s-rechazado { background: var(--danger-soft); color: var(--danger); }
.s-alquilado { background: #dfe5ff; }
.stats { color: var(--green); font-weight: 500; }
.note-small { font-size: 0.85rem; color: var(--danger); }
.go { font-weight: 600; color: var(--green); white-space: nowrap; }
@media (max-width: 560px) { .item { flex-wrap: wrap; } .thumb { width: 100%; } .go { display: none; } }
</style>
