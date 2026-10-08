<script setup lang="ts">
import type { Passport } from '~/data/demo'

const props = defineProps<{ passport: Passport }>()
const { brand } = useAppConfig()
const onTimePct = computed(() => (props.passport.payments.total ? Math.round((props.passport.payments.onTime / props.passport.payments.total) * 100) : 0))
const huchaPct = computed(() => Math.min(100, Math.round((props.passport.hucha.balance / props.passport.hucha.cap) * 100)))
</script>

<template>
  <article class="passport" aria-label="Pasaporte del buen inquilino">
    <header class="head">
      <div class="who">
        <span class="avatar">{{ passport.initials }}</span>
        <div>
          <div class="name">{{ passport.holder }}</div>
          <div class="since">Miembro desde {{ passport.memberSince }}</div>
        </div>
      </div>
      <div class="brand">
        <span>{{ brand.name }}</span>
        <small>Pasaporte de inquilino</small>
      </div>
    </header>

    <ul class="verified">
      <li :class="{ ok: passport.verified.identity }"><AppIcon name="check" :size="14" /> Identidad</li>
      <li :class="{ ok: passport.verified.income }"><AppIcon name="check" :size="14" /> Ingresos</li>
      <li :class="{ ok: passport.verified.employment }"><AppIcon name="check" :size="14" /> Situación laboral</li>
    </ul>

    <div class="facts">
      <div class="fact">
        <span class="label">Ingresos verificados suficientes para</span>
        <span class="value">hasta {{ formatEuro(passport.affordableRent) }}/mes</span>
      </div>
      <div class="fact">
        <span class="label">Pagos puntuales</span>
        <span class="value">{{ passport.payments.onTime }} de {{ passport.payments.total }} <small>({{ onTimePct }} %)</small></span>
      </div>
      <div class="fact">
        <span class="label">Hucha de garantía</span>
        <span class="value">{{ formatEuro(passport.hucha.balance) }} <small>de {{ formatEuro(passport.hucha.cap) }}</small></span>
        <span class="meter" :aria-label="`${huchaPct} % completada`"><span :style="{ width: `${huchaPct}%` }" /></span>
      </div>
      <div class="fact">
        <span class="label">Incidencias al salir de pisos anteriores</span>
        <span class="value">{{ passport.exitReports === 0 ? 'Ninguna' : passport.exitReports }}</span>
      </div>
    </div>

    <footer class="foot">
      <span class="code"><AppIcon name="lock" :size="14" /> {{ passport.code }}</span>
      <span class="small">Compartido por su titular. Sin nóminas ni extractos.</span>
    </footer>
  </article>
</template>

<style scoped>
.passport {
  background: #fff; color: var(--ink); border-radius: 24px; padding: 24px;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.35);
  display: grid; gap: 20px; max-width: 440px; width: 100%;
}
.head { display: flex; justify-content: space-between; gap: 12px; align-items: flex-start; }
.who { display: flex; gap: 12px; align-items: center; }
.avatar { width: 52px; height: 52px; border-radius: 50%; background: var(--lime); color: var(--ink); display: grid; place-items: center; font-weight: 600; }
.name { font-weight: 600; font-size: 1.15rem; letter-spacing: -0.02em; }
.since { font-size: 0.8rem; color: var(--muted); }
.brand { text-align: right; display: grid; font-weight: 600; font-size: 0.9rem; letter-spacing: -0.02em; }
.brand small { color: var(--muted); font-weight: 400; font-size: 0.72rem; letter-spacing: 0; }
.verified { list-style: none; padding: 0; margin: 0; display: flex; flex-wrap: wrap; gap: 6px; }
.verified li { display: inline-flex; gap: 4px; align-items: center; font-size: 0.75rem; padding: 5px 10px; border-radius: 999px; background: var(--grey-01); color: var(--muted); }
.verified li.ok { background: var(--ink); color: var(--lime); }
.facts { display: grid; gap: 2px; background: var(--off); border-radius: 16px; padding: 6px 16px; }
.fact { display: grid; gap: 2px; padding: 10px 0; border-bottom: 1px solid var(--line); }
.fact:last-child { border-bottom: 0; }
.label { font-size: 0.78rem; color: var(--muted); }
.value { font-weight: 500; font-size: 1.15rem; letter-spacing: -0.02em; }
.value small { color: var(--muted); font-weight: 400; font-size: 0.8rem; }
.meter { height: 8px; background: var(--grey-02); border-radius: 99px; overflow: hidden; margin-top: 6px; }
.meter span { display: block; height: 100%; background: var(--ink); border-radius: 99px; }
.foot { display: flex; justify-content: space-between; align-items: center; gap: 12px; color: var(--muted); flex-wrap: wrap; }
.code { display: inline-flex; gap: 6px; align-items: center; font-family: ui-monospace, monospace; font-size: 0.85rem; background: var(--lime); color: var(--ink); padding: 4px 10px; border-radius: 999px; }
</style>
