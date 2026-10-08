<script setup lang="ts">
import { passportDemo } from '~/data/demo'

useSeoMeta({
  title: 'Alquilar piso sin aval y ahorrar para tu casa',
  description: 'Entra en tu piso sin aval y ahorra cada mes en una hucha a tu nombre que te devolvemos con premio y tu historial de pagos te acompaña al siguiente piso.',
})

const faqs = [
  { q: '¿De verdad no necesito aval?', a: 'Si tus ingresos verificados encajan con la renta del piso, no. Si estás en el límite, un aval puede ayudar, pero no es obligatorio por defecto.' },
  { q: '¿Cuánto aporto a la hucha?', a: 'Un porcentaje pequeño de la renta, en torno al 4 %. Con un piso de 850 € son 34 € al mes. La hucha tiene un tope de dos mensualidades: al llegar, dejas de aportar.' },
  { q: '¿Cuándo recupero la hucha?', a: 'Al terminar el contrato sin deudas ni desperfectos, te la devolvemos entera más un bonus por buen pagador. Si te mudas a otro piso de la red, puedes trasladarla y seguir ahorrando.' },
  GUARANTEE_FAQ.tenant,
  DURATION_FAQ.tenant,
  { q: '¿Qué pasa si un mes me retraso?', a: 'Te avisamos antes del cobro y, si falla, te contactamos el mismo día para buscar una solución. Si es un bache puntual, se puede pactar un plan de pago corto.' },
  { q: '¿Quién ve mis nóminas y extractos?', a: 'Nadie más que el sistema de verificación. Al propietario solo le mostramos un resumen («ingresos suficientes para X €/mes») y solo si tú decides compartir tu pasaporte.' },
  { q: '¿Me cobráis algo?', a: 'No. Para el inquilino es gratis. Los gastos de gestión los paga el propietario, como marca la ley.' },
]
</script>

<template>
  <div>
    <section class="hero">
      <div class="container hero-grid">
        <div>
          <span class="eyebrow">Para inquilinos</span>
          <h1>Paga tu alquiler a tiempo y ahorra para tu casa.</h1>
          <p class="lead">Entra en tu piso sin aval y ahorra cada mes en una hucha a tu nombre que te devolvemos con premio.</p>
          <ul class="check-list">
            <li><AppIcon name="check" :size="18" /> Sin aval si tu perfil lo permite</li>
            <li><AppIcon name="check" :size="18" /> Si no te piden garantía extra, entras con el primer mes y la fianza</li>
            <li><AppIcon name="check" :size="18" /> Hucha + bonus por buen pagador</li>
            <li><AppIcon name="check" :size="18" /> Tu historial te acompaña al siguiente piso</li>
          </ul>
          <div class="actions">
            <a href="#pasaporte" class="btn btn-primary">Crea tu pasaporte de inquilino <AppIcon name="arrow" :size="18" /></a>
            <NuxtLink to="/panel/inquilino" class="btn btn-ghost">Ver demo de la app</NuxtLink>
          </div>
        </div>
        <div class="hero-card card card-shadow">
          <div class="stat-label">Tu hucha tras 3 años en un piso de 850 €</div>
          <div class="hero-num">{{ formatEuro(calcHucha(850, HUCHA.defaultPct, 36).payout) }}</div>
          <p class="muted small">{{ formatEuro(calcHucha(850, HUCHA.defaultPct, 36).balance) }} ahorrados + {{ formatEuro(calcHucha(850, HUCHA.defaultPct, 36).bonus) }} de bonus. Para la entrada de tu casa.</p>
          <span class="badge badge-amber">Gratis para inquilinos</span>
        </div>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">Sin garantía extra al firmar</span>
          <h2>Deja de adelantar dos meses de garantía extra</h2>
          <p class="lead">Las garantías adicionales que te piden al entrar son dinero que no trabaja. Si el propietario no te las pide, entras con mucho menos y vas ahorrando poco a poco en tu propia hucha.</p>
        </div>
        <EntryCostComparison />
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">Simulador</span>
          <h2>¿Cuánto tendrás en tu hucha?</h2>
        </div>
        <HuchaSimulator />
      </div>
    </section>

    <section class="section section-dark">
      <div class="container passport-grid">
        <div>
          <span class="eyebrow">Pasaporte del buen inquilino</span>
          <h2>Que pagar bien por fin te sirva de algo</h2>
          <p class="lead">Cada mes pagado a tiempo queda registrado en un historial verificado que es tuyo. Tú decides con quién lo compartes.</p>
          <ul class="dark-list">
            <li><AppIcon name="id" :size="18" /> Muestra solo lo necesario: «ingresos suficientes para 950 €/mes», «36 de 36 pagos puntuales». Sin nóminas ni extractos.</li>
            <li><AppIcon name="key" :size="18" /> Con buen historial, alquilas sin aval y con menos requisitos en cualquier piso de la red.</li>
            <li><AppIcon name="chart" :size="18" /> Junto a tu hucha, sirve como apoyo ante el banco cuando pidas tu hipoteca.</li>
          </ul>
          <NuxtLink to="/pasaporte/demo" class="btn btn-ghost">Ver un pasaporte de ejemplo</NuxtLink>
        </div>
        <div class="passport-wrap">
          <PassportCard :passport="passportDemo" />
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">Transparencia</span>
          <h2>Qué te pedimos y para qué</h2>
        </div>
        <div class="grid grid-3">
          <div class="card">
            <span class="icon-chip chip-green"><AppIcon name="id" /></span>
            <h3>Identidad</h3>
            <p class="muted small">Verificación de tu documento para que nadie pueda usar tu pasaporte.</p>
          </div>
          <div class="card">
            <span class="icon-chip chip-green"><AppIcon name="euro" /></span>
            <h3>Ingresos</h3>
            <p class="muted small">Conectas tu banco de forma segura (open banking) o subes tus últimas nóminas. Calculamos la renta que te puedes permitir con margen.</p>
          </div>
          <div class="card">
            <span class="icon-chip chip-green"><AppIcon name="file" /></span>
            <h3>Estabilidad</h3>
            <p class="muted small">Contrato o actividad y vida laboral. Valoramos autónomos, temporales y estudiantes con ingresos: no solo contratos indefinidos.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container">
        <div class="section-head center">
          <span class="eyebrow">Preguntas frecuentes</span>
          <h2>Dudas de inquilinos</h2>
        </div>
        <FaqList :items="faqs" />
      </div>
    </section>

    <section id="pasaporte" class="section">
      <div class="container signup">
        <div>
          <span class="eyebrow">Lista de espera</span>
          <h2>Crea tu pasaporte de inquilino</h2>
          <p class="lead">Apúntate y serás de los primeros candidatos verificados cuando abramos. Los propietarios verán que estás listo para entrar.</p>
        </div>
        <WaitlistForm role="inquilino" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero-grid { display: grid; gap: 48px; align-items: center; }
@media (min-width: 980px) { .hero-grid { grid-template-columns: 1.2fr 0.8fr; } }
.hero .check-list { margin: 28px 0 32px; color: #e8e8e8; }
.actions { display: flex; gap: 12px; flex-wrap: wrap; }
.hero-card { text-align: center; padding: 40px 32px; background: var(--lime); border: 0; border-radius: 24px; }
.hero-card .stat-label { color: #2f2f2f; font-size: 0.95rem; }
.hero-card .muted { color: #2f2f2f; }
.hero-num { font-size: clamp(3.2rem, 8vw, 5rem); font-weight: 500; letter-spacing: -0.05em; color: var(--ink); line-height: 1; margin: 16px 0; }
.hero-card .badge { background: var(--ink); color: var(--lime); }
.passport-grid { display: grid; gap: 48px; align-items: center; }
@media (min-width: 900px) { .passport-grid { grid-template-columns: 1fr 1fr; } }
.passport-wrap { display: flex; justify-content: center; }
.dark-list { list-style: none; padding: 0; margin: 28px 0 32px; display: grid; gap: 16px; }
.dark-list li { display: flex; gap: 12px; }
.dark-list svg { flex: none; color: var(--lime); margin-top: 3px; }
.fair { margin-top: 24px; }
.signup { display: grid; gap: 48px; align-items: start; }
@media (min-width: 900px) { .signup { grid-template-columns: 1fr 1fr; } }
</style>
