<script setup lang="ts">
import type { Audience } from '#shared/utils/blog'

// Llamada a la acción dentro del artículo (antes del segundo apartado): la mayoría de lectores no llega al final.
// En los artículos del decreto de vivienda (guia), el enlace secundario lleva a la guía en PDF del final del artículo.
const props = defineProps<{ audience: Audience; slug: string; guia?: boolean }>()
const utm = computed(() => `utm_source=blog&utm_medium=inline&utm_campaign=${props.slug.slice(0, 60)}`)
const copy = computed(() => (props.audience === 'propietarios'
  ? { eyebrow: 'Para propietarios', title: '¿Vas a alquilar tu piso? Te decimos cuánto puedes pedir', text: 'Valoración gratis con pisos comparables de tu zona y el índice oficial, en menos de 48 horas laborables.', cta: 'Pedir mi valoración gratis', to: `/valoracion-alquiler?${utm.value}`, alt: props.guia ? { label: 'Guía del decreto en PDF', to: '#guia-decreto' } : { label: 'Checklist para alquilar', to: '/herramientas/checklist-alquilar-piso' } }
  : props.audience === 'inmobiliarias'
    ? { eyebrow: 'Para inmobiliarias', title: 'Inquilinos verificados para tus pisos', text: 'Y una hucha anti-impago que ofrecer a tus propietarios, sin vender seguros. Sube tus pisos gratis en la beta.', cta: 'Ver RentaHucha para inmobiliarias', to: `/inmobiliarias?${utm.value}#formulario`, alt: null }
    : { eyebrow: 'Si buscas piso', title: 'Te avisamos cuando haya pisos en tu ciudad', text: 'Pisos revisados antes de publicarse, sin dar tu teléfono y sin aval: una hucha a tu nombre que recuperas con premio.', cta: 'Avisadme de pisos', to: `/alquiler?${utm.value}`, alt: { label: '¿Cuánto alquiler puedo pagar?', to: '/herramientas/cuanto-alquiler-puedo-pagar' } }))
</script>

<template>
  <aside class="inline-cta" aria-label="RentaHucha">
    <div>
      <span class="eyebrow">{{ copy.eyebrow }}</span>
      <strong>{{ copy.title }}</strong>
      <p>{{ copy.text }}</p>
    </div>
    <div class="actions">
      <NuxtLink :to="copy.to" class="btn btn-dark btn-sm" @click="trackEvent('cta')">{{ copy.cta }} →</NuxtLink>
      <NuxtLink v-if="copy.alt" :to="copy.alt.to" class="alt">{{ copy.alt.label }}</NuxtLink>
    </div>
  </aside>
</template>

<style scoped>
.inline-cta { margin: 28px 0; padding: 20px 22px; border-radius: 18px; background: var(--lime-soft); border: 1px solid #e3f39a; display: grid; gap: 14px; }
@media (min-width: 760px) { .inline-cta { grid-template-columns: 1fr auto; align-items: center; } }
.inline-cta strong { display: block; font-size: 1.15rem; line-height: 1.3; margin: 6px 0 4px; letter-spacing: -0.01em; }
.inline-cta p { margin: 0; font-size: 0.95rem; color: #3a3a3a; }
.eyebrow { background: rgba(0, 0, 0, 0.06); }
.actions { display: grid; gap: 8px; justify-items: center; }
.alt { font-size: 0.85rem; color: var(--ink); }
</style>
