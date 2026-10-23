<script setup lang="ts">
// Calculadora del IRAV con el último dato del INE, para insertar dentro de los artículos del blog sobre la subida.
const { data } = await useFetch<{ months: { year: number; month: number; value: number }[] }>('/api/irav', { key: 'irav' })
const MONTHS = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
const latest = computed(() => data.value?.months[0] ?? { year: 2026, month: 9, value: 2.54 })
</script>

<template>
  <div class="live">
    <h2>Calcula la subida: IRAV de {{ MONTHS[latest.month - 1] }} de {{ latest.year }}, {{ latest.value.toFixed(2).replace('.', ',') }} %</h2>
    <IravCalculator :irav="latest.value" />
  </div>
</template>

<style scoped>
.live { margin: 32px 0; }
.live h2 { font-size: 1.35rem; margin: 0 0 14px; }
</style>
