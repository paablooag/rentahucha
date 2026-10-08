<script setup lang="ts">
const rent = ref(850)
const units = ref(1)
const fees = computed(() => calcFees(Math.max(Number(rent.value) || 0, 0), Math.max(Number(units.value) || 1, 1)))
</script>

<template>
  <div class="fee card card-shadow">
    <div class="inputs">
      <div class="field">
        <label for="fee-rent">Renta de cada piso</label>
        <div class="input-group">
          <input id="fee-rent" v-model.number="rent" class="input" type="number" min="200" step="10" inputmode="numeric">
          <span class="suffix">€/mes</span>
        </div>
      </div>
      <div class="field">
        <label for="fee-units">Número de pisos</label>
        <input id="fee-units" v-model.number="units" class="input" type="number" min="1" max="200" inputmode="numeric">
      </div>
    </div>

    <div class="tiers" role="list">
      <div v-for="t in FEE_TIERS" :key="t.label" class="tier" :class="{ active: t.rate === fees.rate }" role="listitem">
        <span class="tier-rate">{{ formatPercent(t.rate) }}</span>
        <span class="tier-label">{{ t.label }}</span>
      </div>
    </div>

    <div class="result">
      <div>
        <div class="stat-label">Cuota por piso</div>
        <div class="stat-value">{{ formatEuro(fees.perUnit, true) }}<small>/mes</small></div>
      </div>
      <div>
        <div class="stat-label">Recibes por piso</div>
        <div class="stat-value green">{{ formatEuro(fees.netPerUnit, true) }}<small>/mes</small></div>
      </div>
    </div>
    <p class="small muted">
      Incluye selección de inquilino, contrato, cobros, avisos, incidencias, protocolo de impago y coordinación del seguro.
      Sin coste de entrada. Precios orientativos de lanzamiento.
    </p>
  </div>
</template>

<style scoped>
.fee { display: grid; gap: 24px; }
.inputs { display: grid; gap: 16px; grid-template-columns: 1fr; }
@media (min-width: 560px) { .inputs { grid-template-columns: 2fr 1fr; } }
.tiers { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
.tier { border: 1px solid var(--line); border-radius: 999px; padding: 8px 4px; text-align: center; display: grid; gap: 0; transition: all 0.2s; }
.tier.active { border-color: var(--ink); background: var(--lime); }
.tier-rate { font-weight: 600; color: var(--ink); }
.tier-label { font-size: 0.7rem; color: var(--muted); }
.tier.active .tier-label { color: #2f2f2f; }
.result { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; padding: 20px; background: var(--black); border-radius: 16px; }
.result .stat-label { color: #a8a8a8; }
.result .stat-value { color: #fff; }
.stat-value small { font-size: 0.9rem; font-weight: 400; color: #a8a8a8; }
.result .green { color: var(--lime); }
p { margin: 0; }
</style>
