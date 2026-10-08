<script setup lang="ts">
defineProps<{ light?: boolean }>()
const { brand } = useAppConfig()
</script>

<template>
  <span class="logo" :class="{ light }">
    <svg width="30" height="30" viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="16" :fill="light ? '#e0fb00' : '#111111'" />
      <path d="M8.5 15 16 8.5l7.5 6.5v8.5h-15z" fill="none" :stroke="light ? '#111111' : '#e0fb00'" stroke-width="2.4" stroke-linejoin="round" />
      <rect x="13" y="16" width="6" height="2.4" rx="1.2" :fill="light ? '#111111' : '#e0fb00'" />
    </svg>
    <span class="word">{{ brand.name }}</span>
  </span>
</template>

<style scoped>
.logo { display: inline-flex; align-items: center; gap: 10px; font-weight: 600; font-size: 1.15rem; letter-spacing: -0.03em; color: var(--ink); }
.logo.light { color: #fff; }
</style>
