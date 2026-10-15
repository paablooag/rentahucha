<script setup lang="ts">
import type { Audience } from '#shared/utils/blog'

const props = withDefaults(defineProps<{ audience: Audience; compact?: boolean }>(), { compact: false })

const copy = computed(() => (props.audience === 'propietarios'
  ? {
      title: 'Alquila tu piso y cobra cada mes, pase lo que pase',
      text: 'Inquilinos verificados, renta garantizada con aseguradora y proceso legal desde el día 1. Apúntate y te avisamos antes del lanzamiento.',
      button: 'Apuntarme como propietario',
      to: '/apuntate?tipo=propietario#formulario',
    }
  : {
      title: 'Alquila sin aval y ahorra para tu casa',
      text: 'Una hucha a tu nombre que crece cada mes y te devolvemos con premio. Apúntate y crea tu pasaporte de inquilino antes que nadie.',
      button: 'Apuntarme como inquilino',
      to: '/apuntate?tipo=inquilino#formulario',
    }))
</script>

<template>
  <aside class="blog-cta" :class="{ compact }">
    <div>
      <span class="eyebrow">Lista de espera · Sin compromiso</span>
      <h3>{{ copy.title }}</h3>
      <p>{{ copy.text }}</p>
    </div>
    <NuxtLink :to="copy.to" class="btn btn-dark">{{ copy.button }} <AppIcon name="arrow" :size="18" /></NuxtLink>
  </aside>
</template>

<style scoped>
.blog-cta { background: var(--lime); border-radius: 20px; padding: 28px; display: grid; gap: 20px; align-items: end; }
@media (min-width: 760px) { .blog-cta:not(.compact) { grid-template-columns: 1fr auto; padding: 36px; } }
.eyebrow { background: rgba(0, 0, 0, 0.08); }
.eyebrow::before { background: var(--ink); box-shadow: none; }
h3 { font-size: 1.6rem; font-weight: 500; letter-spacing: -0.03em; margin-bottom: 8px; }
p { margin: 0; color: #2f2f2f; }
.compact h3 { font-size: 1.25rem; }
.compact .btn { width: 100%; }
</style>
