<script setup lang="ts">
const props = withDefaults(defineProps<{ initialRent?: number }>(), { initialRent: 850 })
const rent = ref(props.initialRent)
const cost = computed(() => entryCost(Math.max(Number(rent.value) || 0, 0)))
const saved = computed(() => cost.value.traditional.total - cost.value.ours.total)
</script>

<template>
  <div class="entry">
    <div class="field rent">
      <label for="entry-rent">¿Cuánto cuesta el piso que buscas?</label>
      <div class="input-group">
        <input id="entry-rent" v-model.number="rent" class="input" type="number" min="200" step="10" inputmode="numeric">
        <span class="suffix">€/mes</span>
      </div>
    </div>

    <div class="cols">
      <div class="card col">
        <span class="badge badge-muted">Alquiler tradicional (máximo legal)</span>
        <ul>
          <li><span>Primer mes</span><span>{{ formatEuro(cost.traditional.firstMonth) }}</span></li>
          <li><span>Fianza legal</span><span>{{ formatEuro(cost.traditional.deposit) }}</span></li>
          <li><span>Garantía adicional (2 meses)</span><span>{{ formatEuro(cost.traditional.extraGuarantee) }}</span></li>
          <li><span>Aval de padres o bancario</span><span class="muted">A menudo</span></li>
        </ul>
        <div class="total"><span>Al entrar</span><strong>{{ formatEuro(cost.traditional.total) }}</strong></div>
      </div>
      <div class="card col ours">
        <span class="badge">Sin garantía extra al firmar</span>
        <ul>
          <li><span>Primer mes</span><span>{{ formatEuro(cost.ours.firstMonth) }}</span></li>
          <li><span>Fianza legal</span><span>{{ formatEuro(cost.ours.deposit) }}</span></li>
          <li><span>Garantía adicional</span><span class="green">0 € (ahorras en tu hucha)</span></li>
          <li><span>Aval</span><span class="green">No, si tu perfil lo permite</span></li>
        </ul>
        <div class="total"><span>Al entrar</span><strong class="green">{{ formatEuro(cost.ours.total) }}</strong></div>
      </div>
    </div>

    <p class="saving">
      Si el propietario no pide garantía extra al firmar, entras con <strong>{{ formatEuro(saved) }}</strong> menos, y lo que aportas cada mes a tu hucha es tuyo: te lo devolvemos con premio.
      <span class="who-decides">Algunos propietarios piden una garantía adicional al firmar, como en cualquier alquiler; lo verás indicado en cada piso. Tu hucha se llena igualmente mes a mes.</span>
    </p>
  </div>
</template>

<style scoped>
.rent { max-width: 320px; margin-bottom: 24px; }
.cols { display: grid; gap: 16px; }
@media (min-width: 720px) { .cols { grid-template-columns: 1fr 1fr; } }
.col ul { list-style: none; padding: 0; margin: 20px 0; display: grid; gap: 12px; }
.col li { display: flex; justify-content: space-between; gap: 12px; font-size: 0.95rem; border-bottom: 1px solid var(--line); padding-bottom: 10px; }
.col li span:last-child { text-align: right; font-variant-numeric: tabular-nums; }
.total { display: flex; justify-content: space-between; align-items: baseline; }
.total strong { font-size: 2.4rem; font-weight: 500; letter-spacing: -0.03em; color: var(--ink); }
.ours { background: var(--black); color: #cfcfcf; border-color: var(--black); }
.ours li { border-color: #2a2a2a; }
.ours .badge { background: var(--lime); color: var(--ink); }
.ours .green,
.ours .total strong { color: var(--lime); }
.saving { margin-top: 24px; font-size: 1.15rem; }
.who-decides { display: block; margin-top: 6px; font-size: 0.9rem; color: var(--muted); }
</style>
