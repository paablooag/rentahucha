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
useSeoMeta({ title, description, ogTitle: title, ogDescription: description, ogImage: 'https://rentahucha.es/og/propietarios.png' })

// Calculadora
const rent = ref<number | null>(900)
const hasClause = ref(true)
const newPact = ref(false)
const aboveIndex = ref<'no' | 'si' | 'nose'>('nose')
const r = computed(() => {
  const base = rent.value && rent.value > 0 ? rent.value : 0
  const irav = latest.value.value
  if (!hasClause.value) return { pct: 0, why: 'Si el contrato no prevé la actualización de la renta, no se actualiza (art. 18.1 de la LAU).' }
  if (aboveIndex.value === 'si') return { pct: 0, why: 'Si la renta supera el límite máximo del índice de referencia, hasta el 31-12-2027 no se aplica ninguna subida (Real Decreto-ley 29/2026).' }
  if (newPact.value) return { pct: irav, why: `Con un nuevo acuerdo entre las partes, la subida es la pactada, con el tope de la variación del IRAV (${pct(irav)}).` }
  const cap = Math.min(irav, 2)
  return { pct: cap, why: cap < irav ? `Sin nuevo acuerdo, hasta el 31-12-2027 la subida no puede pasar del 2 %, aunque el IRAV sea del ${pct(irav)}.` : `La subida máxima es la variación del IRAV (${pct(irav)}), por debajo del 2 %.` }
})
const newRent = computed(() => (rent.value ?? 0) * (1 + r.value.pct / 100))
watch([rent, hasClause, newPact, aboveIndex], () => trackEvent('calculadora_irav'), { once: true })

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

        <div class="calc card card-shadow">
          <div class="inputs">
            <div class="field">
              <label for="iv-rent">Renta actual</label>
              <div class="input-group"><input id="iv-rent" v-model.number="rent" class="input" type="number" min="0" step="10" inputmode="numeric"><span class="suffix">€/mes</span></div>
            </div>
            <label class="check"><input v-model="hasClause" type="checkbox"> El contrato prevé actualizar la renta</label>
            <label class="check"><input v-model="newPact" type="checkbox"> Hemos pactado ahora una nueva actualización</label>
            <fieldset class="group">
              <legend>¿La renta supera el límite máximo del índice de referencia?</legend>
              <label><input v-model="aboveIndex" type="radio" value="no"> No</label>
              <label><input v-model="aboveIndex" type="radio" value="si"> Sí</label>
              <label><input v-model="aboveIndex" type="radio" value="nose"> No lo sé</label>
              <span class="hint">Se consulta en <a href="https://serpavi.mivau.gob.es/" target="_blank" rel="noopener">serpavi.mivau.gob.es</a>, o <NuxtLink to="/valoracion-alquiler">te lo calculamos gratis</NuxtLink>.</span>
            </fieldset>
          </div>
          <div class="output" aria-live="polite">
            <div class="stat-label">Subida máxima en la actualización de este mes</div>
            <div class="big">{{ pct(r.pct) }}</div>
            <p class="sub">Nueva renta como máximo: <strong>{{ formatEuro(newRent) }}</strong> al mes (+{{ formatEuro(newRent - (rent ?? 0)) }})</p>
            <p>{{ r.why }}</p>
            <p v-if="aboveIndex === 'nose' && hasClause" class="small muted">Si la renta supera el límite del índice de referencia, la subida sería 0. Compruébalo antes de comunicarla.</p>
            <p class="small muted">Para actualizaciones entre el 8-10-2026 y el 31-12-2027. Real Decreto-ley 29/2026, pendiente de convalidación. Comunica la actualización por escrito y con el cálculo.</p>
          </div>
        </div>

        <h2 class="h-table">El IRAV, mes a mes</h2>
        <div class="table-wrap">
          <table class="table">
            <thead><tr><th>Mes</th><th class="num">Variación anual</th></tr></thead>
            <tbody><tr v-for="m in data?.months ?? []" :key="`${m.year}-${m.month}`"><td>{{ label(m) }}</td><td class="num">{{ pct(m.value) }}</td></tr></tbody>
          </table>
        </div>
        <p class="small muted">Fuente: Instituto Nacional de Estadística (INE), Índice de Referencia de Arrendamientos de Vivienda, variación anual, total nacional.</p>
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
.calc { display: grid; gap: 32px; }
@media (min-width: 900px) { .calc { grid-template-columns: 1fr 1fr; } }
.inputs { display: grid; gap: 16px; align-content: start; }
.check, .group label { display: flex; gap: 8px; align-items: center; font-size: 0.95rem; font-weight: 400; }
.check input, .group input { accent-color: var(--green); }
.group { border: 0; padding: 0; margin: 0; display: grid; gap: 8px; }
.group legend { font-size: 0.875rem; font-weight: 500; margin-bottom: 6px; padding: 0; }
.hint a { color: inherit; }
.big { font-size: clamp(2.4rem, 6vw, 3.4rem); font-weight: 800; color: var(--green); line-height: 1.1; margin: 4px 0 6px; font-variant-numeric: tabular-nums; }
.sub { margin: 0 0 10px; }
.output p { margin: 0 0 10px; }
.h-table { font-size: 1.4rem; margin: 48px 0 14px; }
.table-wrap { max-width: 480px; margin-bottom: 8px; }
.cta { margin-top: 32px; display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; }
</style>
