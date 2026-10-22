<script setup lang="ts">
// Rentabilidad de alquilar un piso: bruta y neta antes de impuestos, con los gastos que introduce el propietario.
const value = ref(180000)
const rent = ref(850)
const ibi = ref(400)
const community = ref(60)
const insurance = ref(250)
const upkeepPct = ref(5)
const interest = ref(0)
const emptyMonths = ref(0.5)
const mgmt = ref<'none' | 'rentahucha' | 'custom'>('rentahucha')
const customPct = ref(8)

const n = (v: unknown) => Math.max(Number(v) || 0, 0)

const r = computed(() => {
  const months = Math.max(0, 12 - n(emptyMonths.value))
  const income = n(rent.value) * months
  const mgmtPct = mgmt.value === 'rentahucha' ? calcFees(n(rent.value), 1).rate : mgmt.value === 'custom' ? n(customPct.value) : 0
  const costs = [
    { label: 'IBI', value: n(ibi.value) },
    { label: 'Comunidad', value: n(community.value) * 12 },
    { label: 'Seguro de hogar', value: n(insurance.value) },
    { label: `Mantenimiento (${n(upkeepPct.value)} % de la renta)`, value: (income * n(upkeepPct.value)) / 100 },
    ...(n(interest.value) ? [{ label: 'Intereses de la hipoteca', value: n(interest.value) }] : []),
    ...(mgmtPct ? [{ label: `Gestión (${String(mgmtPct).replace('.', ',')} % de lo cobrado)`, value: (income * mgmtPct) / 100 }] : []),
  ]
  const total = costs.reduce((s, c) => s + c.value, 0)
  const net = income - total
  const v = n(value.value)
  return {
    income, costs, total, net,
    gross: v ? ((n(rent.value) * 12) / v) * 100 : 0,
    netPct: v ? (net / v) * 100 : 0,
    monthly: net / 12,
  }
})
const pct = (x: number) => `${x.toFixed(2).replace('.', ',')} %`
</script>

<template>
  <div class="calc card card-shadow">
    <div class="inputs">
      <div class="field wide">
        <label for="ry-value">Valor del piso (precio de compra o de mercado)</label>
        <div class="input-group"><input id="ry-value" v-model.number="value" class="input" type="number" min="0" step="1000" inputmode="numeric"><span class="suffix">€</span></div>
      </div>
      <div class="field wide">
        <label for="ry-rent">Renta mensual</label>
        <div class="input-group"><input id="ry-rent" v-model.number="rent" class="input" type="number" min="0" step="10" inputmode="numeric"><span class="suffix">€</span></div>
      </div>
      <div class="field">
        <label for="ry-ibi">IBI al año</label>
        <div class="input-group"><input id="ry-ibi" v-model.number="ibi" class="input" type="number" min="0" step="10" inputmode="numeric"><span class="suffix">€</span></div>
      </div>
      <div class="field">
        <label for="ry-com">Comunidad al mes</label>
        <div class="input-group"><input id="ry-com" v-model.number="community" class="input" type="number" min="0" step="5" inputmode="numeric"><span class="suffix">€</span></div>
      </div>
      <div class="field">
        <label for="ry-ins">Seguro al año</label>
        <div class="input-group"><input id="ry-ins" v-model.number="insurance" class="input" type="number" min="0" step="10" inputmode="numeric"><span class="suffix">€</span></div>
      </div>
      <div class="field">
        <label for="ry-int">Intereses hipoteca al año</label>
        <div class="input-group"><input id="ry-int" v-model.number="interest" class="input" type="number" min="0" step="50" inputmode="numeric"><span class="suffix">€</span></div>
      </div>
      <div class="field">
        <label for="ry-upkeep">Mantenimiento: <strong>{{ upkeepPct }} %</strong> de la renta</label>
        <input id="ry-upkeep" v-model.number="upkeepPct" class="range" type="range" min="0" max="15">
      </div>
      <div class="field">
        <label for="ry-empty">Meses vacío al año: <strong>{{ String(emptyMonths).replace('.', ',') }}</strong></label>
        <input id="ry-empty" v-model.number="emptyMonths" class="range" type="range" min="0" max="4" step="0.5">
      </div>
      <fieldset class="field wide mgmt">
        <legend>Gestión del alquiler</legend>
        <label><input v-model="mgmt" type="radio" value="none"> La llevo yo</label>
        <label><input v-model="mgmt" type="radio" value="rentahucha"> RentaHucha (5 %)</label>
        <label><input v-model="mgmt" type="radio" value="custom"> Otra:
          <input v-model.number="customPct" class="input mini" type="number" min="0" max="30" step="0.5" aria-label="Porcentaje de gestión" @focus="mgmt = 'custom'"> %</label>
      </fieldset>
    </div>

    <div class="output">
      <div class="stat-label">Rentabilidad neta (antes de impuestos)</div>
      <div class="big">{{ pct(r.netPct) }}</div>
      <p class="sub">Bruta: <strong>{{ pct(r.gross) }}</strong> · Te quedan <strong>{{ formatEuro(r.monthly) }}</strong> al mes de media</p>
      <ul>
        <li><span>Rentas cobradas en el año</span><span>{{ formatEuro(r.income) }}</span></li>
        <li v-for="c in r.costs" :key="c.label" class="cost"><span>{{ c.label }}</span><span>−{{ formatEuro(c.value) }}</span></li>
        <li class="total"><span>Rendimiento neto anual</span><span>{{ formatEuro(r.net) }}</span></li>
      </ul>
      <div class="note note-green">
        <strong>Lo que más se come la rentabilidad: meses vacíos e impagos</strong>
        <p>Cada mes vacío o sin cobrar resta una mensualidad entera. Con RentaHucha eliges entre inquilinos verificados y, si hay un impago comprobado, el saldo de su hucha pasa a ti.</p>
      </div>
      <p class="small muted">Estimación orientativa con tus datos, antes del IRPF. El rendimiento neto tiene además una reducción en el IRPF de hasta el 100 % según el contrato: <NuxtLink to="/herramientas/reduccion-irpf-alquiler">calcúlala aquí</NuxtLink>. No incluye amortización ni otros gastos deducibles.</p>
    </div>
  </div>
</template>

<style scoped>
.calc { display: grid; gap: 32px; }
@media (min-width: 900px) { .calc { grid-template-columns: 1fr 1fr; } }
.inputs { display: grid; gap: 18px; grid-template-columns: 1fr 1fr; align-content: start; }
.inputs > * { min-width: 0; }
.wide { grid-column: span 2; }
.mgmt { border: 0; padding: 0; margin: 0; display: flex; flex-wrap: wrap; gap: 8px 18px; align-items: center; }
.mgmt legend { font-size: 0.875rem; font-weight: 500; margin-bottom: 6px; padding: 0; }
.mgmt label { display: inline-flex; gap: 6px; align-items: center; font-size: 0.95rem; }
.mgmt input[type=radio] { accent-color: var(--green); }
.mini { width: 72px; padding: 6px 10px; }
.big { font-size: clamp(2.2rem, 5vw, 3rem); font-weight: 800; color: var(--green); line-height: 1.1; margin: 4px 0 6px; font-variant-numeric: tabular-nums; }
.sub { margin: 0 0 16px; color: var(--muted); }
ul { list-style: none; padding: 0; margin: 0 0 20px; display: grid; gap: 8px; }
li { display: flex; justify-content: space-between; gap: 12px; border-bottom: 1px dashed var(--line); padding-bottom: 6px; font-size: 0.95rem; }
li span:last-child { font-variant-numeric: tabular-nums; font-weight: 600; white-space: nowrap; }
li.cost span:last-child { color: var(--muted); font-weight: 500; }
li.total { border-bottom: 0; font-weight: 700; }
.output > p.small { margin: 12px 0 0; }
</style>
