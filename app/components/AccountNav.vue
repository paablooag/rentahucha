<script setup lang="ts">
const { user, unread } = useAccount()
const links = computed(() => [
  { to: '/mi-cuenta', label: 'Inicio', exact: true },
  ...(user.value?.role === 'propietario' ? [{ to: '/mi-cuenta/pisos', label: 'Mis pisos', exact: false }] : [{ to: '/pisos', label: 'Buscar pisos', exact: false }]),
  { to: '/mi-cuenta/mensajes', label: 'Mensajes', exact: false },
])
const route = useRoute()
const active = (l: { to: string; exact: boolean }) => (l.exact ? route.path === l.to : route.path.startsWith(l.to))
</script>

<template>
  <nav class="acc-nav" aria-label="Mi cuenta">
    <NuxtLink v-for="l in links" :key="l.to" :to="l.to" :class="{ on: active(l) }">
      {{ l.label }}<span v-if="l.label === 'Mensajes' && unread" class="dot">{{ unread }}</span>
    </NuxtLink>
  </nav>
</template>

<style scoped>
.acc-nav { display: flex; gap: 4px; padding: 4px; background: #fff; border: 1px solid var(--line); border-radius: 999px; width: fit-content; max-width: 100%; overflow-x: auto; margin-bottom: 24px; }
.acc-nav a { padding: 8px 16px; border-radius: 999px; color: var(--muted); text-decoration: none; font-size: 0.92rem; white-space: nowrap; display: inline-flex; gap: 6px; align-items: center; }
.acc-nav a.on { background: var(--ink); color: #fff; }
.dot { background: var(--lime); color: var(--ink); border-radius: 999px; font-size: 0.72rem; font-weight: 700; min-width: 18px; height: 18px; padding: 0 5px; display: inline-grid; place-items: center; }
</style>
