<script setup lang="ts">
useSeoMeta({
  title: 'Herramientas gratuitas para propietarios e inquilinos',
  description: 'Calculadoras gratuitas: cuánto cuesta un impago de alquiler y cuánto puedes ahorrar con una hucha de garantía.',
})

const tools = [
  { to: '/herramientas/coste-impago', icon: 'calc', tone: 'green', who: 'Propietarios', title: 'Calculadora del coste de un impago', text: 'Rentas perdidas, abogado, reparaciones y meses vacío: cuánto te puede costar un inquilino que deja de pagar.' },
  { to: '/herramientas/simulador-hucha', icon: 'piggy', tone: 'amber', who: 'Inquilinos', title: 'Simulador de la hucha', text: 'Cuánto ahorrarías para la entrada de tu casa pagando el alquiler a tiempo.' },
  { to: '/inquilinos', icon: 'euro', tone: 'amber', who: 'Inquilinos', title: 'Cuánto cuesta entrar en un piso', text: 'Compara lo que te piden al firmar en un alquiler tradicional frente a nuestro modelo.' },
]
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">Herramientas gratuitas</span>
        <h1>Calcula antes de decidir</h1>
        <p class="lead">Herramientas sencillas, sin registro, para propietarios e inquilinos.</p>
      </div>
      <div class="grid grid-3">
        <NuxtLink v-for="t in tools" :key="t.to + t.title" :to="t.to" class="card tool">
          <span class="icon-chip" :class="`chip-${t.tone}`"><AppIcon :name="t.icon" /></span>
          <span class="badge badge-muted">{{ t.who }}</span>
          <h3>{{ t.title }}</h3>
          <p class="muted small">{{ t.text }}</p>
          <span class="go">Abrir <AppIcon name="arrow" :size="16" /></span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tool { text-decoration: none; color: inherit; display: flex; flex-direction: column; align-items: flex-start; transition: all 0.15s; }
.tool:hover { border-color: var(--green); transform: translateY(-2px); box-shadow: var(--shadow); }
.tool h3 { margin-top: 12px; }
.go { margin-top: auto; display: inline-flex; gap: 6px; align-items: center; font-weight: 600; color: var(--green); }
</style>
