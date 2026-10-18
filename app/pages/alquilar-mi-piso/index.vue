<script setup lang="ts">
useSeoMeta({
  ogImage: 'https://rentahucha.es/og/ciudades.png',
  title: 'Alquilar mi piso: guías por ciudad para propietarios',
  description: 'Cómo alquilar tu piso en Madrid, Barcelona, Valencia, Sevilla, Málaga, Bilbao y más ciudades: zonas tensionadas, dónde se deposita la fianza y cómo elegir inquilino.',
})
const tensioned = CITIES.filter(c => c.tension)
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">Guías locales para propietarios</span>
        <h1>Alquilar mi piso en tu ciudad</h1>
        <p class="lead">Lo general es igual en toda España (contrato LAU, fianza de una mensualidad), pero la zona tensionada y el depósito de la fianza cambian según dónde esté tu piso. Elige tu ciudad.</p>
      </div>
      <div class="grid grid-3">
        <NuxtLink v-for="c in CITIES" :key="c.slug" :to="`/alquilar-mi-piso/${c.slug}`" class="card city">
          <span class="badge" :class="c.tension ? '' : 'badge-muted'">{{ c.tension ? 'Zona tensionada' : 'Sin zona tensionada' }}</span>
          <h2>{{ c.name }}</h2>
          <p class="muted small">{{ REGIONS[c.region].name }} · fianza {{ REGIONS[c.region].deposit ? 'con depósito obligatorio' : 'sin depósito obligatorio ahora' }}</p>
          <span class="go">Ver guía <AppIcon name="arrow" :size="16" /></span>
        </NuxtLink>
      </div>
      <p class="small muted note-src">De estas ciudades, {{ tensioned.length }} tienen zona tensionada declarada según el Ministerio de Vivienda ({{ CITIES_CHECKED }}). ¿Tu ciudad no está? Lo general te sirve igual: empieza por la <NuxtLink to="/herramientas/checklist-alquilar-piso">checklist para alquilar tu piso</NuxtLink>.</p>
    </div>
  </section>
</template>

<style scoped>
.city { text-decoration: none; color: inherit; display: flex; flex-direction: column; align-items: flex-start; gap: 6px; transition: all 0.15s; }
.city:hover { border-color: var(--green); transform: translateY(-2px); box-shadow: var(--shadow); }
.city h2 { font-size: 1.35rem; margin: 8px 0 0; }
.city p { margin: 0 0 8px; }
.go { margin-top: auto; display: inline-flex; gap: 6px; align-items: center; font-weight: 600; color: var(--green); }
.note-src { margin-top: 24px; }
</style>
