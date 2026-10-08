<script setup lang="ts">
// Trazos de 24×24 estilo línea.
const paths: Record<string, string> = {
  check: 'M20 6 9 17l-5-5',
  arrow: 'M5 12h14M12 5l7 7-7 7',
  shield: 'M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z M9 12l2 2 4-4',
  bell: 'M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9 M10.3 21a1.94 1.94 0 0 0 3.4 0',
  piggy: 'M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2z M2 9v1c0 1.1.9 2 2 2h1 M16 11h.01',
  id: 'M2 7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z M16 10h2 M16 14h2 M6.17 15a3 3 0 0 1 5.66 0 M7 11a2 2 0 1 0 4 0a2 2 0 1 0-4 0',
  home: 'M3 10 12 3l9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z',
  filter: 'M22 3H2l8 9.46V19l4 2v-8.54z',
  scale: 'M12 3v18 M5 7h14 M7 7l-3 7a3 3 0 0 0 6 0z M17 7l-3 7a3 3 0 0 0 6 0z M8 21h8',
  wrench: 'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94z',
  gift: 'M3 8h18v4H3z M12 8v13 M19 12v9H5v-9 M7.5 8a2.5 2.5 0 0 1 0-5C10 3 12 8 12 8s2-5 4.5-5a2.5 2.5 0 0 1 0 5',
  key: 'M2.6 18.4 2 22h4v-2h2v-2h2l1.4-1.4a6.5 6.5 0 1 0-4-4z M16.5 7.5h.01',
  users: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8a4 4 0 0 0 0 8 M22 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75',
  file: 'M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z M14 2v5h6 M9 13h6 M9 17h6',
  euro: 'M4 10h12 M4 14h9 M19 6a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12c0 4.4 3.5 8 7.8 8 2 0 3.8-.8 5.2-2',
  calc: 'M4 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z M8 6h8 M8 11h.01 M12 11h.01 M16 11h.01 M8 15h.01 M12 15h.01 M16 15h.01 M8 19h8',
  chart: 'M3 3v18h18 M7 16v-4 M12 16V8 M17 16v-7',
  share: 'M18 8a3 3 0 1 0 0-6a3 3 0 0 0 0 6 M6 15a3 3 0 1 0 0-6a3 3 0 0 0 0 6 M18 22a3 3 0 1 0 0-6a3 3 0 0 0 0 6 M8.59 13.51l6.83 3.98 M15.41 6.51l-6.82 3.98',
  menu: 'M4 6h16 M4 12h16 M4 18h16',
  close: 'M18 6 6 18 M6 6l12 12',
  alert: 'M12 9v4 M12 17h.01 M10.3 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.7 3.86a2 2 0 0 0-3.4 0z',
  lock: 'M5 11h14v10H5z M8 11V7a4 4 0 0 1 8 0v4',
}

const props = withDefaults(defineProps<{ name: string; size?: number }>(), { size: 20 })
</script>

<template>
  <svg
    :width="props.size"
    :height="props.size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path :d="paths[props.name] ?? ''" />
  </svg>
</template>
