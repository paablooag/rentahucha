<script setup lang="ts">
import type { IrpfInput, IrpfRegime } from '#shared/utils/irpf'
// Calculadora de la reducción del IRPF por alquiler de vivienda (lógica en shared/utils/irpf.ts).
// «Aún no lo he firmado» compara firmar hasta el 1-12-2026 (Ley 12/2023) con hacerlo después (RDL 29/2026).
type When = IrpfRegime | 'pendiente'
const when = ref<When>('pendiente')
const firstRental = ref(false)
const previousRent = ref<number | null>(900)
const newRent = ref<number | null>(850)
const indexLimit = ref<number | null>(null)
const tensionZone = ref(false)
const youngTenant = ref(false)
const sameTenantAfterTerm = ref(false)
const bigHolder = ref(false)
const socialRental = ref(false)
const rehabilitated = ref(false)
const netIncome = ref<number | null>(7000)

const num = (v: number | null) => (v && v > 0 ? v : null)
const input = (regime: IrpfRegime): IrpfInput => ({
  regime, bigHolder: bigHolder.value, firstRental: firstRental.value, previousRent: num(previousRent.value), newRent: num(newRent.value),
  indexLimit: num(indexLimit.value), tensionZone: tensionZone.value, youngTenant: youngTenant.value,
  sameTenantAfterTerm: sameTenantAfterTerm.value, socialRental: socialRental.value, rehabilitated: rehabilitated.value,
})
const main = computed(() => irpfReduction(input(when.value === 'pendiente' ? 'nuevo' : when.value)))
const before = computed(() => irpfReduction(input('ley2023')))
const taxed = (pct: number) => Math.max(0, (num(netIncome.value) ?? 0) * (1 - pct / 100))
const showNewFields = computed(() => when.value === 'nuevo' || when.value === 'pendiente')

watch([previousRent, newRent, when, firstRental], () => trackEvent('calculadora_irpf'), { once: true })
</script>

<template>
  <div class="calc card card-shadow">
    <div class="inputs">
      <fieldset class="field wide group">
        <legend>¿Cuándo se firma el contrato?</legend>
        <label><input v-model="when" type="radio" value="pendiente"> Aún no lo he firmado (comparar)</label>
        <label><input v-model="when" type="radio" value="nuevo"> Después del 1-12-2026</label>
        <label><input v-model="when" type="radio" value="ley2023"> Del 26-5-2023 al 1-12-2026</label>
        <label><input v-model="when" type="radio" value="antiguo"> Antes del 26-5-2023</label>
      </fieldset>

      <template v-if="when !== 'antiguo'">
        <label class="check wide"><input v-model="firstRental" type="checkbox"> Es la primera vez que alquilo esta vivienda</label>
        <div v-if="!firstRental" class="field">
          <label for="ir-prev">Renta del contrato anterior</label>
          <div class="input-group"><input id="ir-prev" v-model.number="previousRent" class="input" type="number" min="0" step="10" inputmode="numeric"><span class="suffix">€/mes</span></div>
          <span class="hint">Con la última actualización aplicada.</span>
        </div>
        <div class="field">
          <label for="ir-new">Renta del contrato nuevo</label>
          <div class="input-group"><input id="ir-new" v-model.number="newRent" class="input" type="number" min="0" step="10" inputmode="numeric"><span class="suffix">€/mes</span></div>
        </div>
        <div v-if="showNewFields" class="field wide">
          <label for="ir-index">Límite máximo del índice de referencia <span class="muted small">(opcional)</span></label>
          <div class="input-group"><input id="ir-index" v-model.number="indexLimit" class="input" type="number" min="0" step="10" inputmode="numeric" placeholder="No lo sé"><span class="suffix">€/mes</span></div>
          <span class="hint">Se consulta en <a href="https://serpavi.mivau.gob.es/" target="_blank" rel="noopener">serpavi.mivau.gob.es</a> con la referencia catastral, o <NuxtLink to="/valoracion-alquiler">te lo calculamos gratis</NuxtLink>.</span>
        </div>
        <div class="checks wide">
          <label class="check"><input v-model="tensionZone" type="checkbox"> Está en zona tensionada <NuxtLink to="/alquilar-mi-piso" class="small">(ver ciudades)</NuxtLink></label>
          <label class="check"><input v-model="youngTenant" type="checkbox"> El inquilino tiene de 18 a 35 años</label>
          <label v-if="showNewFields && !firstRental" class="check"><input v-model="sameTenantAfterTerm" type="checkbox"> Renuevo con el mismo inquilino al acabar los 5 años o las prórrogas</label>
          <label class="check"><input v-model="rehabilitated" type="checkbox"> Rehabilité la vivienda en los dos años anteriores</label>
          <label class="check"><input v-model="socialRental" type="checkbox"> Alquiler social o programa público con renta limitada</label>
          <label v-if="showNewFields" class="check"><input v-model="bigHolder" type="checkbox"> Soy gran tenedor</label>
        </div>
      </template>

      <div class="field wide">
        <label for="ir-net">Rendimiento neto anual <span class="muted small">(rentas menos gastos deducibles)</span></label>
        <div class="input-group"><input id="ir-net" v-model.number="netIncome" class="input" type="number" min="0" step="100" inputmode="numeric"><span class="suffix">€/año</span></div>
      </div>
    </div>

    <div class="output" aria-live="polite">
      <template v-if="when === 'pendiente'">
        <div class="stat-label">Si firmas después del 1 de diciembre de 2026</div>
        <div class="big">{{ main.pct }} %</div>
        <p class="sub">{{ main.reason }}</p>
        <p v-if="main.caveat" class="caveat small">{{ main.caveat }}</p>
        <div class="compare">
          <div :class="{ hl: before.pct > main.pct }">
            <span class="small muted">Firmando hasta el 1-12-2026</span>
            <strong>{{ before.pct }} %</strong>
            <span class="small">Tributan {{ formatEuro(taxed(before.pct)) }}</span>
          </div>
          <div :class="{ hl: main.pct > before.pct }">
            <span class="small muted">Firmando después</span>
            <strong>{{ main.pct }} %</strong>
            <span class="small">Tributan {{ formatEuro(taxed(main.pct)) }}</span>
          </div>
        </div>
        <p v-if="main.pct !== before.pct" class="verdict">
          {{ main.pct > before.pct ? 'Con estos datos, firmar después del 1 de diciembre reduce' : 'Con estos datos, firmar hasta el 1 de diciembre reduce' }}
          la base del IRPF en <strong>{{ formatEuro(Math.abs(taxed(before.pct) - taxed(main.pct))) }} al año</strong>.
        </p>
        <p v-else class="verdict">Con estos datos, la reducción es la misma en los dos casos.</p>
      </template>
      <template v-else>
        <div class="stat-label">Reducción del rendimiento neto</div>
        <div class="big">{{ main.pct }} %</div>
        <p class="sub">{{ main.reason }}</p>
        <p v-if="main.caveat" class="caveat small">{{ main.caveat }}</p>
        <ul>
          <li><span>Rendimiento neto</span><span>{{ formatEuro(num(netIncome) ?? 0) }}</span></li>
          <li class="cost"><span>Reducción ({{ main.pct }} %)</span><span>−{{ formatEuro((num(netIncome) ?? 0) - taxed(main.pct)) }}</span></li>
          <li class="total"><span>Rendimiento que tributa</span><span>{{ formatEuro(taxed(main.pct)) }}</span></li>
        </ul>
      </template>

      <div class="note note-green">
        <strong>¿No sabes tu índice de referencia ni cuánto pedir?</strong>
        <p>Pide una valoración gratis: te enviamos una horquilla con pisos comparables de tu zona y el índice oficial, en menos de 48 horas laborables.</p>
        <NuxtLink to="/valoracion-alquiler" class="btn btn-dark btn-sm">Pedir mi valoración gratis</NuxtLink>
      </div>
      <p class="small muted">Orientativo, según el artículo 23.2 de la Ley del IRPF y su régimen transitorio tras el Real Decreto-ley 29/2026, <strong>pendiente de convalidación</strong>. Solo para vivienda habitual del inquilino y rendimientos declarados. No sustituye el asesoramiento fiscal.</p>
    </div>
  </div>
</template>

<style scoped>
.calc { display: grid; gap: 32px; }
@media (min-width: 900px) { .calc { grid-template-columns: 1fr 1fr; } }
.inputs { display: grid; gap: 16px; grid-template-columns: 1fr 1fr; align-content: start; }
.inputs > * { min-width: 0; }
.wide { grid-column: 1 / -1; }
@media (max-width: 520px) { .inputs { grid-template-columns: 1fr; } }
.group { border: 0; padding: 0; margin: 0; display: grid; gap: 8px; }
.group legend { font-size: 0.875rem; font-weight: 500; margin-bottom: 6px; padding: 0; }
.group label, .check { display: flex; gap: 8px; align-items: center; font-size: 0.95rem; font-weight: 400; }
.group input, .check input { accent-color: var(--green); flex: none; }
.checks { display: grid; gap: 8px; }
.hint a { color: inherit; }
.big { font-size: clamp(2.4rem, 6vw, 3.4rem); font-weight: 800; color: var(--green); line-height: 1.1; margin: 4px 0 6px; font-variant-numeric: tabular-nums; }
.sub { margin: 0 0 8px; }
.caveat { margin: 0 0 12px; color: var(--muted); }
.compare { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 14px 0; }
.compare > div { border: 1px solid var(--line); border-radius: 14px; padding: 12px 14px; display: grid; gap: 2px; }
.compare > div.hl { border-color: var(--green); background: var(--lime-soft); }
.compare strong { font-size: 1.6rem; font-variant-numeric: tabular-nums; }
.verdict { margin: 0 0 18px; }
ul { list-style: none; padding: 0; margin: 12px 0 20px; display: grid; gap: 8px; }
li { display: flex; justify-content: space-between; gap: 12px; border-bottom: 1px dashed var(--line); padding-bottom: 6px; font-size: 0.95rem; }
li span:last-child { font-variant-numeric: tabular-nums; font-weight: 600; white-space: nowrap; }
li.cost span:last-child { color: var(--muted); font-weight: 500; }
li.total { border-bottom: 0; font-weight: 700; }
.note .btn { margin-top: 10px; }
.output > p.small { margin: 12px 0 0; }
</style>
