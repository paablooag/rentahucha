<script setup lang="ts">
definePageMeta({ middleware: 'cuenta' })
useSeoMeta({ title: 'Guardados', robots: 'noindex' })
const { data: pisos } = await useFetch<PublicProperty[]>('/api/favoritos', { default: () => [] })
</script>

<template>
  <section class="section">
    <div class="container">
      <AccountNav />
      <h1>Pisos guardados</h1>
      <div v-if="!pisos.length" class="card empty">
        <p>Aún no has guardado ningún piso. En cada anuncio, pulsa «♡ Guardar» para tenerlo a mano aquí.</p>
        <NuxtLink to="/pisos" class="btn btn-primary btn-sm">Buscar pisos</NuxtLink>
      </div>
      <div v-else class="grid grid-3">
        <PropertyCard v-for="p in pisos" :key="p.id" :p="p" />
      </div>
    </div>
  </section>
</template>

<style scoped>
h1 { font-size: 2.2rem; margin: 0 0 16px; }
.empty { display: grid; gap: 10px; justify-items: start; }
.empty p { margin: 0; }
</style>
