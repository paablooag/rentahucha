<script setup lang="ts">
const title = 'Alquiler de pisos por ciudad: guías y alertas en toda España'
const description = 'Alquiler de pisos de particulares en Madrid, Barcelona, Valencia, Sevilla, Málaga, Bilbao y más de 60 ciudades: zona tensionada, fianza, requisitos y alertas de pisos nuevos.'
useSeoMeta({ title, description, ogTitle: title, ogDescription: description, ogImage: 'https://rentahucha.es/og/ciudades.png' })

const q = ref('')
const groups = computed(() => {
  const term = q.value.trim().toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '')
  const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '')
  const list = CITIES.filter(c => !term || norm(c.name).includes(term))
  const by = new Map<string, City[]>()
  for (const c of list) by.set(c.region, [...(by.get(c.region) ?? []), c])
  return [...by.entries()]
    .map(([r, cities]) => ({ region: (REGIONS as Record<string, Region>)[r]!.name, cities: cities.sort((a, b) => a.name.localeCompare(b.name, 'es')) }))
    .sort((a, b) => a.region.localeCompare(b.region, 'es'))
})
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">Portal de alquiler · {{ CITIES.length }} ciudades</span>
        <h1>Alquiler de pisos por ciudad</h1>
        <p class="lead">Elige tu ciudad: verás los pisos publicados por sus propietarios, lo que tienes que saber para alquilar allí (fianza, zona tensionada, requisitos) y podrás pedir que te avisemos de los nuevos.</p>
      </div>
      <div class="find">
        <label for="find-city" class="sr-only">Buscar ciudad</label>
        <input id="find-city" v-model="q" class="input" placeholder="Busca tu ciudad…" autocomplete="address-level2">
        <NuxtLink to="/pisos" class="btn btn-ghost">Ver todos los pisos</NuxtLink>
      </div>
      <div class="regions">
        <section v-for="g in groups" :key="g.region" class="region">
          <h2>{{ g.region }}</h2>
          <ul>
            <li v-for="c in g.cities" :key="c.slug">
              <NuxtLink :to="`/alquiler/${c.slug}`">{{ c.name }}</NuxtLink>
              <span v-if="c.tension" class="tag" title="Zona de mercado residencial tensionado">tensionada</span>
            </li>
          </ul>
        </section>
      </div>
      <p v-if="!groups.length" class="muted">No tenemos guía de esa ciudad todavía. <NuxtLink to="/apuntate?tipo=inquilino#formulario">Apúntate</NuxtLink> y te avisamos cuando haya pisos.</p>
      <div class="note note-green owners">
        <strong>¿Tienes un piso?</strong>
        <p>Publícalo gratis en la beta, o pide una valoración del alquiler hecha por una persona con pisos comparables de tu zona.</p>
        <div class="row">
          <NuxtLink to="/cuenta/registro?tipo=propietario" class="btn btn-dark btn-sm">Publicar mi piso</NuxtLink>
          <NuxtLink to="/valoracion-alquiler" class="btn btn-ghost btn-sm">Valoración gratis</NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.find { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 28px; }
.find .input { flex: 1 1 260px; max-width: 420px; }
.regions { columns: 3 260px; column-gap: 32px; }
.region { break-inside: avoid; margin-bottom: 24px; }
.region h2 { font-size: 1.05rem; margin: 0 0 8px; color: var(--muted); font-weight: 600; }
.region ul { list-style: none; padding: 0; margin: 0; display: grid; gap: 6px; }
.region a { color: var(--ink); font-weight: 500; }
.tag { margin-left: 6px; font-size: 0.72rem; padding: 2px 8px; border-radius: 999px; background: var(--lime-soft); color: var(--green); }
.owners { margin-top: 12px; display: grid; gap: 8px; }
.owners p { margin: 0; }
.row { display: flex; gap: 8px; flex-wrap: wrap; }
</style>
