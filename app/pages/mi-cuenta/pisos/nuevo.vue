<script setup lang="ts">
definePageMeta({ middleware: 'cuenta' })
useSeoMeta({ title: 'Nuevo anuncio', robots: 'noindex' })
const { user } = useAccount()
if (user.value?.role !== 'propietario') await navigateTo('/mi-cuenta')

// Tras guardar los datos, se pasa a la edición para subir fotos y enviarlo a revisión.
const onSaved = (p: Property) => navigateTo(`/mi-cuenta/pisos/${p.id}?nuevo=1`)
</script>

<template>
  <section class="section">
    <div class="container narrow">
      <AccountNav />
      <NuxtLink to="/mi-cuenta/pisos" class="back small">← Mis pisos</NuxtLink>
      <h1>Nuevo anuncio</h1>
      <ol class="steps small">
        <li class="on">1. Datos del piso</li>
        <li>2. Fotos</li>
        <li>3. Enviar a revisión</li>
      </ol>
      <PropertyForm submit-label="Guardar y subir fotos →" @saved="onSaved" />
    </div>
  </section>
</template>

<style scoped>
.narrow { max-width: 860px; }
.back { display: inline-block; margin-bottom: 8px; color: var(--muted); }
h1 { font-size: 2.2rem; margin: 0 0 10px; }
.steps { list-style: none; padding: 0; margin: 0 0 20px; display: flex; gap: 16px; flex-wrap: wrap; color: var(--muted); }
.steps .on { color: var(--ink); font-weight: 600; }
</style>
