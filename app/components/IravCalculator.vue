<script setup lang="ts">
// Calculadora de la actualización anual de la renta con el último IRAV y el límite extraordinario
// del Real Decreto-ley 29/2026 (disp. final 6.ª) y el art. 18.1 de la LAU.
// Se usa en /herramientas/subida-alquiler-irav y, insertada en otras webs, en /embed/irav.
const props = defineProps<{ irav: number; embed?: boolean }>()
const pct = (v: number) => `${v.toFixed(2).replace('.', ',')} %`
const target = computed(() => (props.embed ? '_blank' : undefined))

const rent = ref<number | null>(900)
const hasClause = ref(true)
const newPact = ref(false)
const aboveIndex = ref<'no' | 'si' | 'nose'>('nose')
const r = computed(() => {
  const irav = props.irav
  if (!hasClause.value) return { pct: 0, why: 'Si el contrato no prevé la actualización de la renta, no se actualiza (art. 18.1 de la LAU).' }
  if (aboveIndex.value === 'si') return { pct: 0, why: 'Si la renta supera el límite máximo del índice de referencia, hasta el 31-12-2027 no se aplica ninguna subida (Real Decreto-ley 29/2026).' }
  if (newPact.value) return { pct: irav, why: `Con un nuevo acuerdo entre las partes, la subida es la pactada, con el tope de la variación del IRAV (${pct(irav)}).` }
  const cap = Math.min(irav, 2)
  return { pct: cap, why: cap < irav ? `Sin nuevo acuerdo, hasta el 31-12-2027 la subida no puede pasar del 2 %, aunque el IRAV sea del ${pct(irav)}.` : `La subida máxima es la variación del IRAV (${pct(irav)}), por debajo del 2 %.` }
})
const newRent = computed(() => (rent.value ?? 0) * (1 + r.value.pct / 100))
watch([rent, hasClause, newPact, aboveIndex], () => trackEvent(props.embed ? 'calculadora_irav_web' : 'calculadora_irav'), { once: true })
</script>

<template>
  <div class="calc" :class="{ 'card card-shadow': !embed, embed }">
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
        <span class="hint">Se consulta en <a href="https://serpavi.mivau.gob.es/" target="_blank" rel="noopener">serpavi.mivau.gob.es</a>, o <NuxtLink to="/valoracion-alquiler" :target="target">te lo calculamos gratis</NuxtLink>.</span>
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
</template>

<style scoped>
.calc { display: grid; gap: 32px; }
@media (min-width: 900px) { .calc { grid-template-columns: 1fr 1fr; } }
.calc.embed { gap: 20px; }
@media (min-width: 560px) { .calc.embed { grid-template-columns: 1fr 1fr; } }
.inputs { display: grid; gap: 16px; align-content: start; }
.check, .group label { display: flex; gap: 8px; align-items: center; font-size: 0.95rem; font-weight: 400; }
.check input, .group input { accent-color: var(--green); }
.group { border: 0; padding: 0; margin: 0; display: grid; gap: 8px; }
.group legend { font-size: 0.875rem; font-weight: 500; margin-bottom: 6px; padding: 0; }
.hint a { color: inherit; }
.big { font-size: clamp(2.4rem, 6vw, 3.4rem); font-weight: 800; color: var(--green); line-height: 1.1; margin: 4px 0 6px; font-variant-numeric: tabular-nums; }
.sub { margin: 0 0 10px; }
.output p { margin: 0 0 10px; }
</style>
