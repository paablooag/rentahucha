<script setup lang="ts">
defineProps<{ audience: string; title: string; highlight: string; lead: string; stats: { value: string; label: string }[] }>()
const { brand } = useAppConfig()
const month = new Intl.DateTimeFormat('es-ES', { month: 'long', year: 'numeric' }).format(new Date())
</script>

<template>
  <section class="d-page dark">
    <div class="d-cover-top">
      <AppLogo light />
      <span class="d-cover-tag">Dossier · {{ audience }}</span>
    </div>

    <div class="d-cover-main">
      <span class="eyebrow">Próximamente en {{ brand.area }}</span>
      <h1>{{ title }} <span class="hl">{{ highlight }}</span></h1>
      <p class="d-lead">{{ lead }}</p>

      <div class="d-grid d-3 d-cover-stats">
        <div v-for="s in stats" :key="s.label" class="d-card glass">
          <div class="d-num">{{ s.value }}</div>
          <div class="d-label">{{ s.label }}</div>
        </div>
      </div>
    </div>

    <div class="d-wordmark" aria-hidden="true">{{ brand.name }}</div>
    <div class="d-cover-foot">
      <span>{{ brand.domain }}</span>
      <span class="cap">España · {{ month }}</span>
    </div>
  </section>
</template>

<style scoped>
.cap { display: inline-block; }
.cap::first-letter { text-transform: uppercase; }
</style>
