<script setup lang="ts">
const facts = [
  'Entra pagando la mitad',
  '0 € para el inquilino',
  'Renta garantizada con aseguradora',
  'Hucha + bonus por buen pagador',
  'Proceso legal desde el día 1',
  'Sin aval si tu perfil lo permite',
  'Pasaporte de inquilino portable',
]
</script>

<template>
  <div class="marquee" aria-label="Ventajas">
    <div class="track">
      <ul v-for="n in 2" :key="n" :aria-hidden="n === 2">
        <li v-for="f in facts" :key="f"><span class="dot" />{{ f }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.marquee { overflow: hidden; padding: 28px 0; border-bottom: 1px solid var(--line); mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent); }
.track { display: flex; width: max-content; animation: scroll 40s linear infinite; }
.marquee:hover .track { animation-play-state: paused; }
ul { list-style: none; display: flex; gap: 48px; margin: 0; padding: 0 24px; }
li { display: flex; align-items: center; gap: 14px; white-space: nowrap; font-size: 1.15rem; font-weight: 500; letter-spacing: -0.02em; color: var(--ink); }
.dot { width: 10px; height: 10px; border-radius: 50%; background: var(--lime); box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.2); }
@keyframes scroll { to { transform: translateX(-50%); } }
</style>
