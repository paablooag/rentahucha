<script setup lang="ts">
const props = withDefaults(defineProps<{ initialRent?: number; compact?: boolean }>(), { initialRent: 850, compact: false })

const rent = ref(props.initialRent)
const pct = ref<number>(HUCHA.defaultPct)
const months = ref(36)

const safeRent = computed(() => Math.min(Math.max(Number(rent.value) || 0, 0), 5000))
const result = computed(() => calcHucha(safeRent.value, pct.value, months.value))

// Barras cada 6 meses (o 12 si el plazo es largo) y una final con el bonus.
const bars = computed(() => {
  const step = months.value > 36 ? 12 : 6
  const points: { label: string; value: number; bonus?: boolean }[] = []
  for (let m = step; m <= months.value; m += step) {
    points.push({ label: `Mes ${m}`, value: huchaBalanceAt(safeRent.value, pct.value, m) })
  }
  if (points.at(-1)?.label !== `Mes ${months.value}`) {
    points.push({ label: `Mes ${months.value}`, value: result.value.balance })
  }
  points.push({ label: 'Al salir + bonus', value: result.value.payout, bonus: true })
  return points
})
const maxBar = computed(() => Math.max(...bars.value.map(b => b.value), 1))
</script>

<template>
  <div class="sim card card-shadow" :class="{ compact }">
    <div class="controls">
      <div class="field">
        <label for="sim-rent">Renta mensual</label>
        <div class="input-group">
          <input id="sim-rent" v-model.number="rent" class="input" type="number" min="200" max="5000" step="10" inputmode="numeric">
          <span class="suffix">€/mes</span>
        </div>
      </div>
      <div class="field">
        <label for="sim-pct">Aportación mensual a la hucha: <strong>{{ formatPercent(pct) }}</strong></label>
        <input id="sim-pct" v-model.number="pct" class="range" type="range" :min="HUCHA.minPct" :max="HUCHA.maxPct" step="0.5">
        <span class="hint">{{ formatEuro(result.monthly, true) }} al mes</span>
      </div>
      <div class="field">
        <label for="sim-months">Tiempo en el piso: <strong>{{ months }} meses</strong></label>
        <input id="sim-months" v-model.number="months" class="range" type="range" min="6" max="60" step="6">
        <span class="hint">Tope de la hucha: {{ formatEuro(result.cap) }} (dos mensualidades), alcanzado en el mes {{ result.monthsToCap }}</span>
      </div>
    </div>

    <div class="output">
      <div class="totals">
        <div>
          <div class="stat-label">Ahorrado en la hucha</div>
          <div class="stat-value">{{ formatEuro(result.balance) }}</div>
        </div>
        <div>
          <div class="stat-label">Bonus buen pagador ({{ HUCHA.bonusPct }} %)</div>
          <div class="stat-value amber">+{{ formatEuro(result.bonus) }}</div>
        </div>
        <div class="payout">
          <div class="stat-label">Recuperas al salir</div>
          <div class="stat-value green">{{ formatEuro(result.payout) }}</div>
        </div>
      </div>

      <div class="chart" role="img" :aria-label="`La hucha llega a ${formatEuro(result.balance)} en ${months} meses y a ${formatEuro(result.payout)} con el bonus`">
        <div v-for="b in bars" :key="b.label" class="bar-col">
          <span class="bar-val">{{ formatEuro(b.value) }}</span>
          <div class="bar" :class="{ bonus: b.bonus }" :style="{ height: `${Math.max((b.value / maxBar) * 100, 3)}%` }" />
          <span class="bar-label">{{ b.label }}</span>
        </div>
      </div>

      <p v-if="!compact" class="small muted disclaimer">
        Simulación orientativa. La hucha está a tu nombre en una entidad regulada y se devuelve al terminar el contrato sin deudas ni desperfectos.
        Porcentaje de aportación y bonus en validación.
      </p>
    </div>
  </div>
</template>

<style scoped>
.sim { display: grid; gap: 28px; padding: 12px; }
@media (min-width: 900px) { .sim { grid-template-columns: 1fr 1.45fr; gap: 24px; } }
.controls { display: grid; gap: 24px; align-content: start; padding: 20px; }
.output { background: var(--black); color: #cfcfcf; border-radius: 16px; padding: 28px; }
.output .stat-label { color: #a8a8a8; }
.output .stat-value { color: #fff; }
.totals { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 28px; }
.totals .stat-value { font-size: 1.6rem; }
.payout { background: var(--lime); border-radius: 12px; padding: 10px 14px; margin: -10px -6px; }
.payout .stat-label { color: #2f2f2f; }
.output .payout .stat-value { color: var(--ink); }
.amber { color: #fff; }
.green { color: var(--ink); }
.chart { display: flex; align-items: flex-end; gap: 8px; height: 220px; border-bottom: 1px solid #2a2a2a; padding-top: 24px; }
.bar-col { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; height: 100%; min-width: 0; position: relative; }
.bar { width: 100%; max-width: 56px; background: #3a3a3a; border-radius: 8px 8px 0 0; transition: height 0.3s ease; }
.bar.bonus { background: var(--lime); }
.bar-val { font-size: 0.72rem; font-weight: 600; color: #fff; margin-bottom: 4px; white-space: nowrap; }
.bar-label { position: absolute; bottom: -22px; font-size: 0.7rem; color: #8d8a8a; white-space: nowrap; }
.output .disclaimer { margin: 40px 0 0; color: #8d8a8a; }
.compact .chart { height: 180px; margin-bottom: 24px; }
@media (max-width: 520px) {
  .totals { grid-template-columns: 1fr 1fr; }
  .payout { grid-column: span 2; margin: 0; }
  .bar-val,
  .bar-label { font-size: 0.6rem; }
}
</style>
