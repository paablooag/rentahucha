<script setup lang="ts">
import { passportDemo } from '~/data/demo'

useSeoMeta({
  title: 'Pasaporte del buen inquilino (ejemplo)',
  description: 'Así ve un propietario el pasaporte de un inquilino: ingresos verificados, pagos puntuales y hucha, sin nóminas ni extractos.',
  robots: 'noindex',
})
</script>

<template>
  <section class="section">
    <div class="container grid-wrap">
      <div>
        <span class="badge badge-amber">Ejemplo con datos ficticios</span>
        <h1>Así ve un propietario tu pasaporte</h1>
        <p class="lead">Cuando compartes tu pasaporte con un enlace o un código, el propietario ve solo esto. Nada de nóminas, extractos ni datos que no necesita.</p>

        <div class="grid grid-2 explain">
          <div class="card">
            <h3>Lo que ve</h3>
            <ul class="check-list small">
              <li><AppIcon name="check" :size="16" /> Que tu identidad, ingresos y situación laboral están verificados</li>
              <li><AppIcon name="check" :size="16" /> Hasta qué renta te puedes permitir con margen</li>
              <li><AppIcon name="check" :size="16" /> Cuántos pagos has hecho a tiempo</li>
              <li><AppIcon name="check" :size="16" /> Cuánto llevas en tu hucha</li>
            </ul>
          </div>
          <div class="card">
            <h3>Lo que no ve</h3>
            <ul class="check-list small no">
              <li><AppIcon name="close" :size="16" /> Tus nóminas o extractos bancarios</li>
              <li><AppIcon name="close" :size="16" /> Tu salario exacto</li>
              <li><AppIcon name="close" :size="16" /> Tu empresa o tus movimientos</li>
              <li><AppIcon name="close" :size="16" /> Nada que no hayas decidido compartir</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="card-col">
        <PassportCard :passport="passportDemo" />
        <p class="small muted center">Puedes revocar el acceso cuando quieras.</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.grid-wrap { display: grid; gap: 40px; align-items: start; }
@media (min-width: 960px) { .grid-wrap { grid-template-columns: 1.2fr 0.8fr; } }
h1 { margin-top: 16px; }
.explain { margin-top: 24px; }
.no svg { color: var(--danger) !important; }
.card-col { display: grid; justify-items: center; gap: 8px; }
</style>
