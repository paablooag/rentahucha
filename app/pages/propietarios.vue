<script setup lang="ts">
useSeoMeta({
  title: 'Renta garantizada para propietarios',
  description: 'Alquila tu piso y cobra cada mes, pase lo que pase. Inquilinos verificados con incentivo real para pagar, seguro de impago y proceso legal desde el primer día. Desde el 3,5 %.',
})

const steps = [
  { title: 'Das de alta tu piso', text: 'Renta, fecha de entrada y tus condiciones: si aceptas estudiantes, autónomos, mascotas…' },
  { title: 'Recibes candidatos verificados', text: 'Solo perfiles que encajan con tus condiciones económicas, con un resumen claro y nuestra recomendación.' },
  { title: 'Firmas online', text: 'Contrato conforme a la LAU, con firma electrónica y la renta garantizada incluida.' },
  { title: 'Cobras cada mes', text: 'Te avisamos de cada pago. Las incidencias del piso llegan con fotos a tu panel, no a tu WhatsApp.' },
  { title: 'Si algo falla, cobras igual', text: 'La hucha cubre primero, la aseguradora después, y el proceso legal arranca ese mismo día.' },
]

const faqs = [
  { q: '¿Quién paga la renta si el inquilino no paga?', a: 'Primero se usa la hucha de garantía del inquilino. Si el impago continúa, la aseguradora socia te paga la renta según las condiciones de la póliza (meses cubiertos, carencia y límites te los enseñamos antes de firmar).' },
  { q: '¿Puedo elegir al inquilino?', a: 'Sí. Te presentamos candidatos verificados y tú decides.' },
  DURATION_FAQ.owner,
  { q: '¿Qué incluye el 5 %?', a: 'Selección del inquilino, contrato, cobros, avisos, gestión de incidencias, protocolo de impago y coordinación con la aseguradora. Con varios pisos, la cuota baja hasta el 3,5 %.' },
  { q: '¿Tengo que cambiar de inquilino si ya tengo uno?', a: 'No necesariamente. Podemos estudiar incorporar contratos en vigor; la cobertura del seguro dependerá de la verificación del inquilino actual.' },
  { q: '¿El inquilino tiene que pagar algo a la plataforma?', a: 'No. La ley atribuye los gastos de gestión al arrendador y nosotros no cobramos nada al inquilino. Eso también hace que lleguen más y mejores candidatos.' },
]
</script>

<template>
  <div>
    <section class="hero">
      <div class="container hero-grid">
        <div>
          <span class="eyebrow">Para propietarios</span>
          <h1>Alquila tu piso y cobra cada mes, pase lo que pase.</h1>
          <p class="lead">
            Inquilinos verificados a fondo que además tienen un incentivo real para pagar a tiempo.
            Si algo falla, tú cobras y nosotros activamos el proceso legal el primer día.
          </p>
          <ul class="pills">
            <li><AppIcon name="shield" :size="16" /> Renta garantizada</li>
            <li><AppIcon name="id" :size="16" /> Inquilinos con historial demostrado</li>
            <li><AppIcon name="bell" :size="16" /> Aviso de cada pago</li>
            <li><AppIcon name="wrench" :size="16" /> Incidencias en una app</li>
          </ul>
          <div class="actions">
            <a href="#alta" class="btn btn-primary">Da de alta tu piso <AppIcon name="arrow" :size="18" /></a>
            <NuxtLink to="/panel/propietario" class="btn btn-ghost">Ver demo del panel</NuxtLink>
          </div>
        </div>
        <FeeCalculator />
      </div>
    </section>

    <section class="section section-alt">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">Cómo funciona</span>
          <h2>De piso vacío a renta cobrada, sin perseguir a nadie</h2>
        </div>
        <ol class="steps">
          <li v-for="(s, i) in steps" :key="s.title">
            <span class="n">{{ i + 1 }}</span>
            <div>
              <h3>{{ s.title }}</h3>
              <p class="muted">{{ s.text }}</p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">Por qué tu inquilino paga mejor</span>
          <h2>Un inquilino con algo que perder</h2>
          <p class="lead">
            Cada mes, tu inquilino aporta a una hucha a su nombre que recupera con premio si cumple. Si deja de pagar, la pierde y su historial lo refleja.
            Es un colchón para ti y un incentivo para él.
          </p>
        </div>
        <MoneyFlow />
      </div>
    </section>

    <section class="section section-alt">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">Duración del alquiler</span>
          <h2>Alquila el tiempo que te encaje</h2>
          <p class="lead">¿Solo quieres alquilar un año? ¿Vas a necesitar el piso más adelante? Hay una fórmula legal para cada caso.</p>
        </div>
        <ContractDuration />
      </div>
    </section>

    <section class="section section-dark">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">Protección</span>
          <h2>Cinco capas antes de que notes nada</h2>
        </div>
        <AntiImpagoLayers />
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">Calculadora</span>
          <h2>¿Cuánto te costaría un impago sin protección?</h2>
          <p class="lead">Rentas perdidas, abogado, reparaciones y meses vacío. Ajusta los valores a tu caso.</p>
        </div>
        <ImpagoCalculator />
      </div>
    </section>

    <section class="section section-alt">
      <div class="container">
        <div class="section-head center">
          <span class="eyebrow">Preguntas frecuentes</span>
          <h2>Dudas de propietarios</h2>
        </div>
        <FaqList :items="faqs" />
      </div>
    </section>

    <section id="alta" class="section">
      <div class="container signup">
        <div>
          <span class="eyebrow">Lista de espera</span>
          <h2>Da de alta tu piso con prioridad</h2>
          <p class="lead">Estamos cerrando los acuerdos con la aseguradora y la entidad de pago. Los primeros pisos de la lista entran con condiciones de lanzamiento.</p>
          <ul class="check-list">
            <li><AppIcon name="check" :size="18" /> Sin compromiso ni coste hasta que firmes</li>
            <li><AppIcon name="check" :size="18" /> Te enseñamos la póliza antes de nada</li>
            <li><AppIcon name="check" :size="18" /> Bolsa de inquilinos verificados en tu zona</li>
          </ul>
        </div>
        <WaitlistForm role="propietario" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero-grid { display: grid; gap: 48px; align-items: center; }
@media (min-width: 980px) { .hero-grid { grid-template-columns: 1.1fr 0.9fr; } }
.pills { list-style: none; padding: 0; margin: 28px 0; display: flex; flex-wrap: wrap; gap: 8px; }
.pills li {
  display: inline-flex; gap: 6px; align-items: center; font-size: 0.875rem; color: #e8e8e8;
  background: rgba(255, 255, 255, 0.06); border: 1px solid rgba(255, 255, 255, 0.14); border-radius: 999px; padding: 7px 14px;
}
.pills svg { color: var(--lime); }
.actions { display: flex; gap: 12px; flex-wrap: wrap; }
.steps { list-style: none; padding: 0; margin: 0; display: grid; gap: 16px; }
@media (min-width: 720px) { .steps { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1080px) { .steps { grid-template-columns: repeat(5, 1fr); } }
.steps li { background: #fff; border-radius: 16px; padding: 24px; display: flex; flex-direction: column; gap: 20px; }
.n { width: 44px; height: 44px; border-radius: 50%; background: var(--lime); color: var(--ink); display: grid; place-items: center; font-weight: 600; font-size: 1.05rem; }
.steps li:last-child .n { background: var(--ink); color: var(--lime); }
.steps h3 { font-size: 1.1rem; margin-bottom: 6px; }
.steps p { font-size: 0.92rem; margin: 0; }
.signup { display: grid; gap: 48px; align-items: start; }
@media (min-width: 900px) { .signup { grid-template-columns: 1fr 1fr; } }
</style>
