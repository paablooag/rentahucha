<script setup lang="ts">
// IRAV del último mes publicado por el INE y calculadora de la actualización anual de la renta,
// con el límite extraordinario del Real Decreto-ley 29/2026 (disp. final 6.ª) y el art. 18.1 de la LAU.
const { data } = await useFetch<{ months: { year: number; month: number; value: number }[]; source: 'ine' | 'copia' }>('/api/irav')
const MONTHS = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
const latest = computed(() => data.value?.months[0] ?? { year: 2026, month: 9, value: 2.54 })
const label = (m: { year: number; month: number }) => `${MONTHS[m.month - 1]} de ${m.year}`
const pct = (v: number) => `${v.toFixed(2).replace('.', ',')} %`

const title = computed(() => `IRAV de ${label(latest.value)}: ${pct(latest.value.value)}. ¿Cuánto puedes subir el alquiler?`)
const description = computed(() => `El IRAV de ${label(latest.value)} es del ${pct(latest.value.value)} (INE). Calcula la subida máxima de tu alquiler: con el decreto de octubre de 2026, sin nuevo acuerdo, no puede pasar del 2 % hasta finales de 2027.`)
useSeoMeta({ title, description, ogTitle: title, ogDescription: description, ogImage: 'https://rentahucha.es/og/irav.png' })

// Código para insertar la calculadora en otras webs (página /embed/irav).
// Oculto hasta que nginx deje de mandar X-Frame-Options en /embed/ (si no, el iframe no carga en otras webs).
const embedReady = false
const embedCode = '<iframe src="https://rentahucha.es/embed/irav" title="Calculadora de la subida del alquiler (IRAV)" width="100%" height="560" style="border:0;max-width:760px" loading="lazy"></iframe>'
const copied = ref(false)
async function copyEmbed() {
  try { await navigator.clipboard.writeText(embedCode); copied.value = true; trackEvent('copiar_insertable_irav') }
  catch { copied.value = false }
}

const faqs = computed(() => [
  { q: '¿Qué es el IRAV?', a: 'El Índice de Referencia para la Actualización Anual de los Contratos de Arrendamiento de Vivienda. Lo publica el INE cada mes y sirve de tope para actualizar la renta de los alquileres de vivienda.' },
  { q: `¿Cuál es el último IRAV?`, a: `El de ${label(latest.value)}: ${pct(latest.value.value)} de variación anual, según el INE. Se usa el último publicado en la fecha en que el contrato cumple año.` },
  { q: '¿Puedo subir el alquiler lo que marque el IRAV?', a: 'Si la actualización cae entre el 8 de octubre de 2026 y el 31 de diciembre de 2027 y no hay un nuevo acuerdo con el inquilino, la subida no puede superar el 2 % aunque el IRAV sea mayor; y si la renta supera el límite del índice de referencia, no hay subida. Lo establece la disposición final sexta del Real Decreto-ley 29/2026, pendiente de convalidación.' },
  { q: '¿Y si mi contrato no dice nada de actualizar la renta?', a: 'Entonces no se actualiza: según el artículo 18.1 de la LAU, en defecto de pacto expreso no se aplica actualización.' },
  { q: '¿Cuándo se publica el IRAV?', a: 'El INE lo publica cada mes, hacia mediados de mes, con el dato del mes anterior. Esta página se actualiza sola con el último dato.' },
])
useHead(() => ({ script: [{ type: 'application/ld+json', innerHTML: JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.value.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }) }] }))
</script>

<template>
  <div>
    <section class="section">
      <div class="container">
        <div class="section-head">
          <NuxtLink to="/herramientas" class="back">← Herramientas</NuxtLink>
          <span class="eyebrow">Dato oficial del INE · se actualiza cada mes</span>
          <h1>IRAV de {{ label(latest) }}: {{ pct(latest.value) }}</h1>
          <p class="lead">Es el índice que marca cuánto puede subir el alquiler en la actualización anual. Pero ojo: con el decreto de octubre de 2026, sin un nuevo acuerdo, la subida no puede pasar del <strong>2 %</strong> hasta finales de 2027.</p>
        </div>

        <IravCalculator :irav="latest.value" />

        <h2 class="h-table">El IRAV, mes a mes</h2>
        <div class="table-wrap">
          <table class="table">
            <thead><tr><th>Mes</th><th class="num">Variación anual</th></tr></thead>
            <tbody><tr v-for="m in data?.months ?? []" :key="`${m.year}-${m.month}`"><td>{{ label(m) }}</td><td class="num">{{ pct(m.value) }}</td></tr></tbody>
          </table>
        </div>
        <p class="small muted">Fuente: Instituto Nacional de Estadística (INE), Índice de Referencia de Arrendamientos de Vivienda, variación anual, total nacional.</p>

        <div v-if="embedReady" class="embed card">
          <h2>Ponla en tu web</h2>
          <p>¿Tienes una inmobiliaria, una gestoría o un blog? Inserta esta calculadora gratis: se actualiza sola con cada IRAV que publica el INE y con los cambios de la normativa.</p>
          <textarea class="input code" readonly rows="3" :value="embedCode" aria-label="Código para insertar la calculadora" @focus="($event.target as HTMLTextAreaElement).select()" />
          <div class="embed-actions">
            <button type="button" class="btn btn-primary btn-sm" @click="copyEmbed">{{ copied ? 'Copiado' : 'Copiar el código' }}</button>
            <a href="/embed/irav" target="_blank" rel="noopener" class="small">Ver cómo queda →</a>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container">
        <div class="section-head center">
          <span class="eyebrow">Preguntas frecuentes</span>
          <h2>Actualizar el alquiler con el IRAV</h2>
        </div>
        <FaqList :items="faqs" />
        <div class="cta">
          <NuxtLink to="/blog/limite-2-por-ciento-subida-alquiler-hasta-2027" class="btn btn-ghost">El límite del 2 %, explicado</NuxtLink>
          <NuxtLink to="/valoracion-alquiler" class="btn btn-primary">¿Tu renta está bien? Valoración gratis</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.back { display: inline-block; margin-bottom: 16px; font-size: 0.9rem; text-decoration: none; }
.h-table { font-size: 1.4rem; margin: 48px 0 14px; }
.table-wrap { max-width: 480px; margin-bottom: 8px; }
.embed { margin-top: 40px; max-width: 760px; }
.embed h2 { font-size: 1.3rem; margin: 0 0 6px; }
.code { width: 100%; font-family: ui-monospace, Consolas, monospace; font-size: 0.8rem; resize: none; margin: 8px 0 10px; }
.embed-actions { display: flex; gap: 14px; align-items: center; flex-wrap: wrap; }
.cta { margin-top: 32px; display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; }
</style>
