<script setup lang="ts">
const route = useRoute()
const isOwner = computed(() => route.path.startsWith('/panel/propietario'))
</script>

<template>
  <div class="panel">
    <div class="demo-bar">
      Demo con datos ficticios ·
      <NuxtLink :to="isOwner ? '/panel/inquilino' : '/panel/propietario'">Ver panel de {{ isOwner ? 'inquilino' : 'propietario' }}</NuxtLink> ·
      <NuxtLink to="/">Volver a la web</NuxtLink>
    </div>
    <header class="top">
      <div class="container bar">
        <NuxtLink to="/" aria-label="Inicio"><AppLogo /></NuxtLink>
        <span class="badge" :class="isOwner ? '' : 'badge-amber'">{{ isOwner ? 'Propietario' : 'Inquilino' }}</span>
      </div>
    </header>
    <main class="container body">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.panel { min-height: 100vh; background: var(--off); }
.demo-bar { background: var(--black); color: #a8a8a8; font-size: 0.82rem; text-align: center; padding: 8px 16px; }
.demo-bar a { color: var(--amber-bright); }
.top { background: var(--surface); border-bottom: 1px solid var(--line); }
.bar { display: flex; justify-content: space-between; align-items: center; height: 60px; }
.top a { text-decoration: none; }
.body { padding-top: 28px; padding-bottom: 56px; }
</style>
