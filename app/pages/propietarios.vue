<script setup lang="ts">
useSeoMeta({
  ogImage: 'https://rentahucha.es/og/propietarios.png',
  title: 'Alquila tu piso a inquilinos verificados',
  description: 'Inquilinos verificados con un incentivo real para pagar y una hucha que, si hay impago, pasa a ti. Contrato, cobros e incidencias en un panel. Desde el 3,5 %.',
})

const steps = [
  { title: 'Das de alta tu piso', text: 'Renta, fecha de entrada y tus condiciones: si aceptas estudiantes, autónomos, mascotas…' },
  { title: 'Recibes candidatos verificados', text: 'Solo perfiles que encajan con tus condiciones económicas, con un resumen claro y nuestra recomendación.' },
  { title: 'Firmas online', text: 'Contrato conforme a la LAU, con firma electrónica y la hucha del inquilino vinculada al contrato.' },
  { title: 'Controlas cada pago', text: 'Te avisamos de cada pago. Las incidencias del piso llegan con fotos a tu panel, no a tu WhatsApp.' },
  { title: 'Si algo falla, la hucha responde', text: 'El saldo de la hucha del inquilino pasa a ti y te damos el expediente listo para reclamar.' },
]

const faqs = [
  { q: '¿Qué pasa si el inquilino no paga?', a: 'Le avisamos el mismo día y buscamos una solución si es un bache puntual. Si el impago se comprueba, se te paga la cantidad pendiente con el saldo de la hucha del inquilino, sin esperar a un juicio, y te entregamos el expediente completo para reclamar el resto. No pagamos rentas de nuestro bolsillo: la hucha cubre hasta lo que haya ahorrado el inquilino, y crece cada mes de contrato.' },
  { q: '¿Tenéis un seguro de impago?', a: 'No. RentaHucha no es una aseguradora ni vende seguros. Nuestra protección es la selección del inquilino y su hucha, que pasa a ti si hay un impago. Si quieres un seguro de impago, puedes contratarlo con la compañía que elijas y combinarlo con nosotros.' },
  { q: '¿Puedo elegir al inquilino?', a: 'Sí. Te presentamos candidatos verificados y tú decides.' },
  DURATION_FAQ.owner,
  GUARANTEE_FAQ.owner,
  { q: '¿Qué incluye el 5 %?', a: 'Selección y verificación del inquilino, contrato, cobros, avisos, gestión de incidencias, la hucha y el protocolo de impago. No incluye ningún seguro. Con varios pisos, la cuota baja hasta el 3,5 %.' },
  { q: '¿Tengo que cambiar de inquilino si ya tengo uno?', a: 'No necesariamente. Podemos estudiar incorporar contratos en vigor, verificando antes al inquilino actual.' },
  { q: '¿El inquilino tiene que pagar algo a la plataforma?', a: 'No. La ley atribuye los gastos de gestión al arrendador y nosotros no cobramos nada al inquilino. Eso también hace que lleguen más y mejores candidatos.' },
]
</script>

<template>
  <div>
    <section class="hero">
      <div class="container hero-grid">
        <div>
          <span class="eyebrow">Para propietarios</span>
          <h1>Alquila tu piso a inquilinos que pagan.</h1>
          <p class="lead">
            Inquilinos verificados a fondo que además tienen un incentivo real para pagar a tiempo: su hucha.
            Si algo falla, su saldo pasa a ti y tienes el expediente listo para reclamar desde el primer día.
          </p>
          <ul class="pills">
            <li><AppIcon name="piggy" :size="16" /> Hucha anti-impago</li>
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
        <OptionCards
          :items="DURATION_OPTIONS"
          note-title="Tú nos dices cuánto tiempo quieres alquilar"
          note-text="Te recomendamos el contrato que encaja y lo dejamos bien redactado desde el primer día, para que no haya sorpresas al final."
        />

        <div class="section-head second">
          <span class="eyebrow">Garantías</span>
          <h2>{{ GUARANTEE_HEAD.title }}</h2>
          <p class="lead">{{ GUARANTEE_HEAD.lead }}</p>
        </div>
        <OptionCards :items="GUARANTEE_OPTIONS" :note-title="GUARANTEE_NOTE_TITLE" :note-text="GUARANTEE_NOTE" />
      </div>
    </section>

    <section class="section section-dark">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">Protección</span>
          <h2>Cinco capas de protección</h2>
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
        <NuxtLink to="/herramientas/checklist-alquilar-piso" class="checklist-banner">
          <span class="icon-chip chip-green"><AppIcon name="file" /></span>
          <span><strong>¿Vas a alquilar? Descarga gratis la checklist 2027</strong><span class="muted small">{{ CHECKLIST_TOTAL }} comprobaciones: certificado energético, fianza, contrato, IRPF y fin del contrato.</span></span>
          <AppIcon name="arrow" :size="18" />
        </NuxtLink>
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
          <p class="lead">Estamos cerrando el acuerdo con la entidad financiera que custodiará las huchas y gestionará los cobros. Los primeros pisos de la lista entran con condiciones de lanzamiento.</p>
          <ul class="check-list">
            <li><AppIcon name="check" :size="18" /> Sin compromiso ni coste hasta que firmes</li>
            <li><AppIcon name="check" :size="18" /> Te explicamos cómo funciona la hucha antes de nada</li>
            <li><AppIcon name="check" :size="18" /> Bolsa de inquilinos verificados en tu zona</li>
          </ul>
        </div>
        <LeadForm role="propietario" />
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
.second { margin-top: 88px; }
.signup { display: grid; gap: 48px; align-items: start; }
@media (min-width: 900px) { .signup { grid-template-columns: 1fr 1fr; } }
.checklist-banner { margin-top: 24px; display: flex; gap: 16px; align-items: center; padding: 18px 20px; border-radius: 16px; background: var(--lime-soft); color: var(--ink); text-decoration: none; transition: transform 0.15s; }
.checklist-banner:hover { transform: translateY(-2px); }
.checklist-banner > span:nth-child(2) { flex: 1; display: grid; gap: 2px; }
</style>
