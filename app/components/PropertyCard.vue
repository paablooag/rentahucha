<script setup lang="ts">
defineProps<{ p: PublicProperty }>()
</script>

<template>
  <NuxtLink :to="`/pisos/${p.id}`" class="pc">
    <div class="img">
      <img v-if="p.photos[0]" :src="`/api/fotos/${p.photos[0].id}`" :alt="p.title" loading="lazy" :width="p.photos[0].width ?? undefined" :height="p.photos[0].height ?? undefined">
      <span v-if="p.status === 'alquilado'" class="tag">Alquilado</span>
      <span v-else-if="p.stayType.startsWith('Temporada')" class="tag light">Temporada</span>
    </div>
    <div class="body">
      <div class="price">{{ formatEuro(p.rent) }}<span>/mes</span></div>
      <h3>{{ p.title }}</h3>
      <p class="muted small">{{ p.district ? `${p.district}, ` : '' }}{{ p.city }}<template v-if="p.ownerIsAgency"> · {{ p.ownerName }}</template></p>
      <p class="facts small">{{ p.bedrooms === 0 ? 'Estudio' : `${p.bedrooms} hab.` }} · {{ p.bathrooms }} {{ p.bathrooms === 1 ? 'baño' : 'baños' }}<template v-if="p.sizeM2"> · {{ p.sizeM2 }} m²</template> · {{ p.furnished }}</p>
    </div>
  </NuxtLink>
</template>

<style scoped>
.pc { display: flex; flex-direction: column; border: 1px solid var(--line); border-radius: 18px; overflow: hidden; background: #fff; color: var(--ink); text-decoration: none; transition: transform 0.15s, box-shadow 0.15s; }
.pc:hover { transform: translateY(-2px); box-shadow: var(--shadow); }
.img { position: relative; aspect-ratio: 4 / 3; background: var(--grey-01); }
.img img { width: 100%; height: 100%; object-fit: cover; display: block; }
.tag { position: absolute; top: 10px; left: 10px; background: var(--ink); color: #fff; font-size: 0.75rem; font-weight: 600; padding: 4px 10px; border-radius: 999px; }
.tag.light { background: #fff; color: var(--ink); }
.body { padding: 14px 16px 16px; display: grid; gap: 4px; }
.price { font-size: 1.35rem; font-weight: 700; letter-spacing: -0.02em; }
.price span { font-size: 0.85rem; font-weight: 400; color: var(--muted); }
h3 { font-size: 1rem; font-weight: 500; margin: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.body p { margin: 0; }
.facts { color: var(--ink); }
</style>
