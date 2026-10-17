<script setup lang="ts">
// Cuánto alquiler encaja con unos ingresos. Referencia habitual en España: que la renta no pase del 30–35 % de los
// ingresos netos del hogar; a partir del 40 % se considera al límite. Es orientativo: cada propietario decide.
const TIERS = [
  { key: 'comodo', pct: 30, label: 'Cómodo', text: 'Más opciones: la mayoría de propietarios te verá con buenos ojos.' },
  { key: 'razonable', pct: 35, label: 'Razonable', text: 'Encaja con lo que piden muchos propietarios.' },
  { key: 'limite', pct: 40, label: 'Al límite', text: 'Algunos propietarios pedirán más garantías o un aval.' },
] as const

const salary = ref(1600)
const pays = ref<12 | 14>(14)
const partner = ref(0)
const partnerPays = ref<12 | 14>(14)
const debts = ref(0)
const target = ref<number | null>(null)

const n = (v: unknown) => Math.max(Number(v) || 0, 0)
// Redondeo a decenas hacia abajo, sin que los decimales de coma flotante resten 10 € (969,99… → 970).
const round10 = (v: number) => Math.floor(Math.round(v * 100) / 1000) * 10

// Ingresos netos mensuales equivalentes (con 14 pagas, las extras se reparten en 12 meses), menos préstamos.
const income = computed(() => n(salary.value) * pays.value / 12 + n(partner.value) * partnerPays.value / 12)
const available = computed(() => Math.max(income.value - n(debts.value), 0))
const max = computed(() => TIERS.map(t => ({ ...t, rent: round10(available.value * t.pct / 100) })))
const recommended = computed(() => max.value[0]!.rent)

// Dinero para entrar con la renta recomendada: primer mes y fianza legal (un mes). La garantía adicional depende del piso.
const entry = computed(() => recommended.value * 2)

// Comprobar un piso concreto
const check = computed(() => {
  const rent = n(target.value)
  if (!rent || !available.value) return null
  const pct = Math.round((rent / available.value) * 100)
  const tier = pct <= 30 ? TIERS[0] : pct <= 35 ? TIERS[1] : pct <= 40 ? TIERS[2] : null
  return { pct, tier, needed: Math.ceil(rent / 0.35 / 10) * 10 }
})
</script>

<template>
  <div class="calc card card-shadow">
    <div class="inputs">
      <div class="field">
        <label for="ra-salary">Tu sueldo neto al mes</label>
        <div class="input-group">
          <input id="ra-salary" v-model.number="salary" class="input" type="number" min="0" step="50" inputmode="numeric">
          <span class="suffix">€/mes</span>
        </div>
        <div class="pays" role="radiogroup" aria-label="Número de pagas">
          <button v-for="p in [12, 14] as const" :key="p" type="button" role="radio" :aria-checked="pays === p" :class="{ on: pays === p }" @click="pays = p">{{ p }} pagas</button>
        </div>
      </div>

      <div class="field">
        <label for="ra-partner">¿Alquiláis entre dos? Sueldo neto de la otra persona <span class="opt">(opcional)</span></label>
        <div class="input-group">
          <input id="ra-partner" v-model.number="partner" class="input" type="number" min="0" step="50" inputmode="numeric">
          <span class="suffix">€/mes</span>
        </div>
        <div v-if="n(partner) > 0" class="pays" role="radiogroup" aria-label="Pagas de la otra persona">
          <button v-for="p in [12, 14] as const" :key="p" type="button" role="radio" :aria-checked="partnerPays === p" :class="{ on: partnerPays === p }" @click="partnerPays = p">{{ p }} pagas</button>
        </div>
      </div>

      <div class="field">
        <label for="ra-debts">Préstamos o cuotas que ya pagas <span class="opt">(coche, tarjeta…)</span></label>
        <div class="input-group">
          <input id="ra-debts" v-model.number="debts" class="input" type="number" min="0" step="10" inputmode="numeric">
          <span class="suffix">€/mes</span>
        </div>
      </div>

      <p class="small muted note-income">Ingresos considerados: <strong>{{ formatEuro(Math.round(available)) }}/mes</strong>{{ pays === 14 || partnerPays === 14 ? ' (con las pagas extra repartidas en 12 meses)' : '' }}.</p>
    </div>

    <div class="output">
      <div class="stat-label">Alquiler máximo recomendado</div>
      <div class="big">{{ formatEuro(recommended) }}<small>/mes</small></div>
      <p class="sub">Hasta este importe tienes más oportunidades de que te elijan.</p>

      <ul class="tiers">
        <li v-for="t in max" :key="t.key" :class="t.key">
          <span class="dot" />
          <div>
            <strong>{{ t.label }} · hasta {{ formatEuro(t.rent) }}</strong>
            <span>{{ t.pct }} % de tus ingresos. {{ t.text }}</span>
          </div>
        </li>
      </ul>

      <div class="entry">
        <span>Para entrar en un piso de {{ formatEuro(recommended) }} necesitarás, como mínimo, unos <strong>{{ formatEuro(entry) }}</strong> (primer mes y fianza legal).</span>
        <span class="small">Algunos propietarios piden además hasta dos mensualidades de garantía adicional. Con RentaHucha, tu hucha se llena mes a mes y la recuperas con bonus.</span>
      </div>

      <div class="check">
        <label for="ra-target">¿Has visto un piso? Comprueba si encaja</label>
        <div class="input-group">
          <input id="ra-target" v-model.number="target" class="input" type="number" min="0" step="10" inputmode="numeric" placeholder="Renta del piso">
          <span class="suffix">€/mes</span>
        </div>
        <p v-if="check" class="verdict" :class="check.tier?.key ?? 'fuera'">
          Supone el <strong>{{ check.pct }} %</strong> de tus ingresos:
          <template v-if="check.tier"> {{ check.tier.label.toLowerCase() }}.</template>
          <template v-else> por encima de lo que suelen aceptar los propietarios. Para ese piso, lo habitual sería ingresar unos {{ formatEuro(check.needed) }} netos al mes entre todos.</template>
        </p>
      </div>

      <p class="small disclaimer">Estimación orientativa con los datos que introduces. Cada propietario fija sus criterios; también valoran la estabilidad del empleo y el historial de pagos.</p>
    </div>
  </div>
</template>

<style scoped>
.calc { display: grid; gap: 32px; }
@media (min-width: 900px) { .calc { grid-template-columns: 1fr 1fr; } }
.inputs { display: grid; gap: 20px; align-content: start; }
.opt { font-weight: 400; color: var(--muted); font-size: 0.85em; }
.pays { display: inline-flex; gap: 4px; padding: 4px; background: var(--grey-01); border-radius: 999px; margin-top: 8px; }
.pays button { font: inherit; font-size: 0.88rem; border: 0; background: transparent; border-radius: 999px; padding: 6px 14px; cursor: pointer; color: var(--muted); }
.pays button.on { background: var(--ink); color: #fff; }
.note-income { margin: 0; }
.output { background: var(--black); color: #cfcfcf; border-radius: 16px; padding: 24px; display: grid; gap: 18px; align-content: start; }
.output .stat-label { color: #a8a8a8; }
.big { font-size: clamp(2.4rem, 6vw, 3.2rem); font-weight: 600; color: var(--lime); letter-spacing: -0.03em; line-height: 1; }
.big small { font-size: 1rem; font-weight: 400; color: #a8a8a8; margin-left: 4px; }
.sub { margin: -8px 0 0; color: #bdbdbd; }
.tiers { list-style: none; padding: 0; margin: 0; display: grid; gap: 10px; }
.tiers li { display: flex; gap: 10px; align-items: flex-start; }
.tiers li div { display: grid; gap: 2px; }
.tiers strong { color: #fff; font-weight: 500; }
.tiers span:not(.dot) { font-size: 0.85rem; color: #a8a8a8; }
.dot { flex: none; width: 10px; height: 10px; border-radius: 50%; margin-top: 6px; }
.comodo .dot { background: var(--lime); }
.razonable .dot { background: #f5c451; }
.limite .dot { background: #f08a6c; }
.entry { background: #1a1a1a; border-radius: 12px; padding: 14px 16px; display: grid; gap: 6px; font-size: 0.92rem; }
.entry strong { color: #fff; }
.entry .small { color: #a8a8a8; }
.check { display: grid; gap: 8px; }
.check label { color: #fff; font-weight: 500; font-size: 0.95rem; }
.verdict { margin: 0; padding: 10px 14px; border-radius: 12px; font-size: 0.92rem; }
.verdict.comodo { background: rgba(224, 251, 0, 0.14); color: #e9ff7a; }
.verdict.razonable { background: rgba(245, 196, 81, 0.15); color: #ffd98a; }
.verdict.limite,
.verdict.fuera { background: rgba(240, 138, 108, 0.15); color: #ffb4a0; }
.verdict strong { color: inherit; }
.disclaimer { margin: 0; color: #8d8a8a; }
</style>
