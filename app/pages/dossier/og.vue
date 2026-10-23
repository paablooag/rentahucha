<script setup lang="ts">
// Plantilla de las imágenes para redes (1200×630). Se capturan con Playwright y se guardan en public/og/.
// /dossier/og?v=default | propietarios | checklist | ciudades | irpf | irav | decreto | ranking
definePageMeta({ layout: false })
useSeoMeta({ title: 'Imagen para redes', robots: 'noindex' })

const VARIANTS = {
  default: { tag: 'Alquiler en toda España', title: 'Alquila con inquilinos verificados', hl: 'y una hucha que responde.', sub: 'El inquilino llena cada mes una hucha a su nombre. Si cumple, la recupera con un 10 % extra. Si hay impago, pasa al propietario.' },
  propietarios: { tag: 'Para propietarios', title: 'Alquila tu piso a inquilinos', hl: 'que pagan.', sub: 'Inquilinos verificados, contrato LAU, aviso de cada pago y la hucha del inquilino, que pasa a ti si hay un impago comprobado.' },
  checklist: { tag: 'Guía gratuita · PDF', title: 'Checklist 2027 para', hl: 'alquilar tu piso.', sub: `${CHECKLIST_TOTAL} comprobaciones: certificado energético, fianza, contrato, elección del inquilino, IRPF y fin del contrato.` },
  irpf: { tag: 'Calculadora gratis · Decreto de octubre de 2026', title: '¿Cuánto IRPF pagas', hl: 'por alquilar tu piso?', sub: 'Desde diciembre, la reducción va del 15 % al 100 % según bajes, mantengas o subas la renta. Compara firmar antes o después del 1 de diciembre.' },
  irav: { tag: 'Dato oficial del INE · se actualiza cada mes', title: '¿Cuánto puedes subir', hl: 'el alquiler este año?', sub: 'El último IRAV y la subida máxima con el tope del 2 % del decreto de octubre de 2026, hasta finales de 2027.' },
  decreto: { tag: 'Comprobador gratis · Real Decreto-ley 29/2026', title: '¿Qué cambia en tu contrato', hl: 'con el decreto de vivienda?', sub: 'Subida, prórroga extraordinaria, IRPF, IBI, desistimiento, temporada y reparaciones: responde 6 preguntas y míralo.' },
  ranking: { tag: 'Datos del INE · 57 ciudades', title: '¿Cuánto ha subido el alquiler', hl: 'en tu ciudad?', sub: 'Un 3,5 % de media en 2024, pero un 5,9 % en Valencia y un 5,2 % en Málaga. Los contratos nuevos, un 8,8 %. Ranking completo.' },
  ciudades: { tag: 'Guías por ciudad', title: 'Alquilar mi piso', hl: 'en tu ciudad.', sub: 'Zona tensionada, depósito de la fianza y cómo elegir inquilino en Madrid, Barcelona, Valencia, Sevilla, Bilbao y más.' },
} as const
const v = computed(() => VARIANTS[(useRoute().query.v as keyof typeof VARIANTS)] ?? VARIANTS.default)
</script>

<template>
  <div class="og">
    <div class="top"><AppLogo light /><span class="tag">{{ v.tag }}</span></div>
    <div>
      <h1>{{ v.title }} <span class="hl">{{ v.hl }}</span></h1>
      <p>{{ v.sub }}</p>
    </div>
    <div class="foot">rentahucha.es</div>
  </div>
</template>

<style scoped>
.og { width: 1200px; height: 630px; box-sizing: border-box; padding: 64px 72px; display: flex; flex-direction: column; justify-content: space-between; color: #fff;
  background: radial-gradient(circle at 85% 10%, rgba(224, 251, 0, 0.22), transparent 45%), #0b0b0b; font-family: 'Inter Tight Variable', 'Inter Tight', system-ui, sans-serif; }
.top { display: flex; justify-content: space-between; align-items: center; }
.top :deep(.logo) { font-size: 1.9rem; }
.top :deep(svg) { width: 48px; height: 48px; }
.tag { font-size: 1.1rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #a8a8a8; }
h1 { color: #fff; font-size: 76px; line-height: 1.02; letter-spacing: -0.045em; font-weight: 500; margin: 0 0 24px; max-width: 1000px; }
.hl { color: #e0fb00; }
p { font-size: 27px; line-height: 1.4; color: #cfcfcf; margin: 0; max-width: 960px; }
.foot { font-size: 1.3rem; color: #8d8a8a; }
</style>
