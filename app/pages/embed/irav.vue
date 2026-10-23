<script setup lang="ts">
// Calculadora del IRAV para insertar en otras webs (código en /herramientas/subida-alquiler-irav).
// Nginx no manda X-Frame-Options en /embed/ para que se pueda mostrar en un iframe.
definePageMeta({ layout: 'embed' })
useSeoMeta({ title: 'Calculadora de la subida del alquiler (IRAV)', robots: 'noindex, follow' })
useHead({ link: [{ rel: 'canonical', href: 'https://rentahucha.es/herramientas/subida-alquiler-irav' }] })

const { data } = await useFetch<{ months: { year: number; month: number; value: number }[] }>('/api/irav')
const MONTHS = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
const latest = computed(() => data.value?.months[0] ?? { year: 2026, month: 9, value: 2.54 })
</script>

<template>
  <div>
    <h1 class="title">¿Cuánto puedes subir el alquiler? IRAV de {{ MONTHS[latest.month - 1] }} de {{ latest.year }}: {{ latest.value.toFixed(2).replace('.', ',') }} %</h1>
    <IravCalculator :irav="latest.value" embed />
    <p class="credit small muted">
      Dato del INE, actualizado cada mes. Calculadora de
      <a href="https://rentahucha.es/herramientas/subida-alquiler-irav" target="_blank" rel="noopener">RentaHucha</a>,
      la plataforma de alquiler con inquilinos verificados.
    </p>
  </div>
</template>

<style scoped>
.title { font-size: 1.15rem; margin: 0 0 16px; line-height: 1.3; }
.credit { margin: 16px 0 0; border-top: 1px solid var(--line); padding-top: 10px; }
.credit a { color: var(--green); font-weight: 600; }
</style>
