<script setup lang="ts">
const rent = ref(850)
const monthsUnpaid = ref(10)
const legal = ref(1500)
const repairs = ref(800)
const monthsEmpty = ref(1)

const n = (v: unknown) => Math.max(Number(v) || 0, 0)

const breakdown = computed(() => {
  const unpaid = n(rent.value) * n(monthsUnpaid.value)
  const empty = n(rent.value) * n(monthsEmpty.value)
  const items = [
    { label: 'Rentas sin cobrar', value: unpaid },
    { label: 'Abogado, procurador y burofax', value: n(legal.value) },
    { label: 'Reparaciones al recuperar el piso', value: n(repairs.value) },
    { label: 'Meses vacío hasta el siguiente inquilino', value: empty },
  ]
  return { items, total: items.reduce((s, i) => s + i.value, 0) }
})

const serviceYear = computed(() => calcFees(n(rent.value), 1).yearlyTotal)
</script>

<template>
  <div class="calc card card-shadow">
    <div class="inputs">
      <div class="field">
        <label for="imp-rent">Renta mensual</label>
        <div class="input-group">
          <input id="imp-rent" v-model.number="rent" class="input" type="number" min="0" step="10" inputmode="numeric">
          <span class="suffix">€</span>
        </div>
      </div>
      <div class="field">
        <label for="imp-months">Meses hasta recuperar el piso: <strong>{{ monthsUnpaid }}</strong></label>
        <input id="imp-months" v-model.number="monthsUnpaid" class="range" type="range" min="2" max="24">
        <span class="hint">Depende del juzgado y de si hay oposición. Varía mucho entre partidos judiciales.</span>
      </div>
      <div class="field">
        <label for="imp-legal">Costes legales</label>
        <div class="input-group">
          <input id="imp-legal" v-model.number="legal" class="input" type="number" min="0" step="100" inputmode="numeric">
          <span class="suffix">€</span>
        </div>
      </div>
      <div class="field">
        <label for="imp-repairs">Reparaciones</label>
        <div class="input-group">
          <input id="imp-repairs" v-model.number="repairs" class="input" type="number" min="0" step="100" inputmode="numeric">
          <span class="suffix">€</span>
        </div>
      </div>
      <div class="field">
        <label for="imp-empty">Meses vacío después</label>
        <input id="imp-empty" v-model.number="monthsEmpty" class="input" type="number" min="0" max="12" inputmode="numeric">
      </div>
    </div>

    <div class="output">
      <div class="stat-label">Lo que te puede costar un impago</div>
      <div class="big">{{ formatEuro(breakdown.total) }}</div>
      <ul>
        <li v-for="i in breakdown.items" :key="i.label">
          <span>{{ i.label }}</span><span>{{ formatEuro(i.value) }}</span>
        </li>
      </ul>
      <div class="note note-green">
        <strong>Con renta garantizada</strong>
        <p>
          Nuestro servicio con un piso de {{ formatEuro(n(rent)) }} cuesta {{ formatEuro(serviceYear) }} al año.
          Si el inquilino deja de pagar, sigues cobrando según la póliza y el proceso legal arranca el primer día.
        </p>
      </div>
      <p class="small muted">Estimación orientativa con los valores que introduces. No es asesoramiento jurídico.</p>
    </div>
  </div>
</template>

<style scoped>
.calc { display: grid; gap: 32px; }
@media (min-width: 900px) { .calc { grid-template-columns: 1fr 1fr; } }
.inputs { display: grid; gap: 18px; grid-template-columns: 1fr 1fr; align-content: start; }
.inputs .field:nth-child(1),
.inputs .field:nth-child(2) { grid-column: span 2; }
.big { font-size: clamp(2.2rem, 5vw, 3rem); font-weight: 800; color: var(--danger); line-height: 1.1; margin: 4px 0 16px; font-variant-numeric: tabular-nums; }
ul { list-style: none; padding: 0; margin: 0 0 20px; display: grid; gap: 8px; }
li { display: flex; justify-content: space-between; gap: 12px; border-bottom: 1px dashed var(--line); padding-bottom: 6px; font-size: 0.95rem; }
li span:last-child { font-variant-numeric: tabular-nums; font-weight: 600; }
.output > p { margin: 12px 0 0; }
</style>
