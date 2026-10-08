<script setup lang="ts">
const props = withDefaults(defineProps<{ rent?: number }>(), { rent: 850 })
const hucha = computed(() => (props.rent * HUCHA.defaultPct) / 100)
const fee = computed(() => calcFees(props.rent, 1).perUnit)
</script>

<template>
  <div class="flow">
    <div class="node tenant">
      <span class="who">Inquilino</span>
      <strong>{{ formatEuro(rent + hucha) }}</strong>
      <span class="what">Renta + aportación a su hucha, por domiciliación</span>
    </div>

    <div class="arrow" aria-hidden="true"><AppIcon name="arrow" :size="22" /></div>

    <div class="node hub">
      <span class="who">Entidad de pago autorizada</span>
      <span class="what">Cobra, separa y reparte en cuentas segregadas. El dinero nunca pasa por nuestras cuentas.</span>
    </div>

    <div class="arrow" aria-hidden="true"><AppIcon name="arrow" :size="22" /></div>

    <div class="outs">
      <div class="node owner">
        <span class="who">Propietario</span>
        <strong>{{ formatEuro(rent - fee, true) }}</strong>
        <span class="what">Renta neta, cada mes</span>
      </div>
      <div class="node piggy">
        <span class="who">Hucha del inquilino</span>
        <strong>{{ formatEuro(hucha, true) }}</strong>
        <span class="what">A su nombre, bloqueada a favor del contrato</span>
      </div>
      <div class="node platform">
        <span class="who">Gestión</span>
        <strong>{{ formatEuro(fee, true) }}</strong>
        <span class="what">5 % de la renta, lo paga el propietario</span>
      </div>
    </div>

    <div class="insurer">
      <AppIcon name="shield" :size="18" />
      <span><strong>Si hay impago:</strong> la hucha cubre primero y la aseguradora socia paga el resto según la póliza.</span>
    </div>
  </div>
</template>

<style scoped>
.flow { display: grid; gap: 12px; align-items: center; }
@media (min-width: 960px) { .flow { grid-template-columns: 1fr auto 1fr auto 1.2fr; } }
.node { background: var(--surface); border: 1px solid var(--line); border-radius: 16px; padding: 16px 18px; display: grid; gap: 2px; }
.who { font-size: 0.72rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: var(--muted); }
.node strong { font-size: 1.5rem; font-weight: 500; letter-spacing: -0.03em; color: var(--ink); font-variant-numeric: tabular-nums; }
.what { font-size: 0.85rem; color: var(--muted); }
.tenant { background: var(--lime); border-color: var(--lime); }
.tenant .who,
.tenant .what { color: #2f2f2f; }
.hub { background: var(--black); border-color: var(--black); }
.hub .who { color: #fff; }
.hub .what { color: #a8a8a8; }
.owner { background: #fff; }
.piggy { border-color: transparent; background: var(--amber-soft); }
.platform { border-color: transparent; background: var(--violet-soft); }
.outs { display: grid; gap: 10px; }
.arrow { color: var(--muted); display: grid; place-items: center; }
@media (max-width: 959px) { .arrow { transform: rotate(90deg); } }
.insurer { grid-column: 1 / -1; display: flex; gap: 10px; align-items: flex-start; font-size: 0.9rem; color: var(--violet); background: var(--violet-soft); border-radius: 10px; padding: 12px 16px; }
.insurer svg { flex: none; margin-top: 2px; }
</style>
