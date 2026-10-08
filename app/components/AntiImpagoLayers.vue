<script setup lang="ts">
const layers = [
  { icon: 'filter', tone: 'green', title: 'Filtro exigente', text: 'Ingresos verificados por open banking, contrato, vida laboral y ahorros. Ratio renta/ingresos prudente y revisión humana en casos límite.' },
  { icon: 'gift', tone: 'amber', title: 'Incentivo a pagar', text: 'El inquilino tiene algo que ganar y algo que perder: su hucha, su bonus y su historial.' },
  { icon: 'bell', tone: 'green', title: 'Aviso el día 1', text: 'Recordatorio antes del cobro y alerta inmediata si falla. Plan de pago corto si es un bache puntual.' },
  { icon: 'piggy', tone: 'amber', title: 'La hucha cubre', text: 'La hucha del inquilino cubre el primer impago mientras se resuelve.' },
  { icon: 'shield', tone: 'violet', title: 'Seguro y abogado', text: 'Si persiste, la aseguradora paga la renta según la póliza y el protocolo legal arranca ese mismo día.' },
]
</script>

<template>
  <ol class="layers">
    <li v-for="(l, i) in layers" :key="l.title" class="layer card">
      <div class="top">
        <span class="icon-chip" :class="`chip-${l.tone}`"><AppIcon :name="l.icon" /></span>
        <span class="num">{{ i + 1 }}</span>
      </div>
      <h3>{{ l.title }}</h3>
      <p class="small muted">{{ l.text }}</p>
    </li>
  </ol>
</template>

<style scoped>
.layers { list-style: none; padding: 0; margin: 0; display: grid; gap: 14px; }
@media (min-width: 720px) { .layers { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1080px) { .layers { grid-template-columns: repeat(5, 1fr); } }
.layer { padding: 20px; position: relative; }
.top { display: flex; justify-content: space-between; align-items: flex-start; }
.layer { transition: transform 0.2s, box-shadow 0.2s; }
.layer:hover { transform: translateY(-3px); box-shadow: var(--shadow-lg); }
.num { font-size: 2.6rem; font-weight: 500; letter-spacing: -0.04em; color: var(--grey-02); line-height: 1; }
h3 { font-size: 1.08rem; }
p { margin: 0; }
</style>
