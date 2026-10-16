<script setup lang="ts">
useSeoMeta({
  title: 'Para inmobiliarias: sube tus pisos en alquiler',
  description: 'Inquilinos verificados para los pisos que gestionas y una hucha anti-impago que ofrecer a tus propietarios, sin vender seguros. Cobros, avisos e incidencias en un panel.',
})

const benefits = [
  { icon: 'id', tone: 'green', title: 'Inquilinos verificados', text: 'Candidatos con ingresos comprobados y un historial de pagos portable. Menos visitas que no llevan a nada y menos sustos después de firmar.' },
  { icon: 'piggy', tone: 'amber', title: 'Un argumento para captar propietarios', text: 'Tus propietarios alquilan con una hucha que el inquilino llena cada mes y que pasa a ellos si hay un impago. Sin que tengas que vender ni intermediar seguros.' },
  { icon: 'bell', tone: 'green', title: 'Cobros y avisos sin perseguir a nadie', text: 'Aviso de cada pago, alerta el día 1 si falla y el expediente preparado si hay que reclamar.' },
  { icon: 'wrench', tone: 'violet', title: 'Incidencias en un panel', text: 'Averías con fotos, histórico de cada piso y toda la documentación del contrato en un mismo sitio.' },
]

const steps = [
  { title: 'Te apuntas', text: 'Nos cuentas cuántos pisos en alquiler gestionáis y en qué zona.' },
  { title: 'Subes tus pisos', text: 'Renta, condiciones y fotos. Tus pisos siguen siendo tuyos y tu propietario, tu cliente.' },
  { title: 'Recibes candidatos verificados', text: 'Solo perfiles que encajan con cada piso, con un resumen claro.' },
  { title: 'Firmas y gestionas', text: 'Contrato conforme a la LAU, hucha vinculada y cobros e incidencias en el panel.' },
]

const faqs = [
  { q: '¿Cuánto cuesta para una inmobiliaria?', a: 'Estamos cerrando las condiciones para agencias antes del lanzamiento. Las primeras inmobiliarias de la lista entran con condiciones de lanzamiento y os las enseñamos antes de que decidáis nada.' },
  { q: '¿Tenemos que vender seguros?', a: 'No. RentaHucha no es una aseguradora ni vende, gestiona o intermedia seguros. La protección es la selección del inquilino y su hucha, que pasa al propietario si hay un impago. Si un propietario quiere además un seguro de impago, lo contrata con la compañía que elija.' },
  { q: '¿El propietario deja de ser nuestro cliente?', a: 'No. Está pensado para trabajar con vosotros, no para sustituiros: la relación con el propietario es vuestra.' },
  { q: '¿Podemos seguir anunciando en portales?', a: 'Sí. Puedes seguir usando tus canales habituales y usar RentaHucha para encontrar candidatos verificados y gestionar el alquiler después de firmar.' },
  { q: '¿Quién paga los honorarios de la agencia?', a: 'Según la Ley 12/2023, los gastos de gestión inmobiliaria y de formalización del contrato corren a cargo del arrendador. Al inquilino no se le cobra nada, tampoco en RentaHucha.' },
  { q: '¿Funciona con pisos de temporada?', a: 'Sí, para necesidades temporales reales (estudios, trabajo, tratamientos) y con el contrato y la fianza que corresponden a la temporada.' },
]
</script>

<template>
  <div>
    <section class="hero">
      <div class="container head">
        <span class="eyebrow">Para inmobiliarias</span>
        <h1>Sube tus pisos en alquiler y alquílalos a inquilinos que pagan.</h1>
        <p class="lead">
          Inquilinos verificados para los pisos que gestionas y una hucha anti-impago que ofrecer a tus propietarios.
          Más argumentos para captar, menos tiempo persiguiendo cobros.
        </p>
        <ul class="pills">
          <li><AppIcon name="id" :size="16" /> Inquilinos verificados</li>
          <li><AppIcon name="piggy" :size="16" /> Hucha anti-impago</li>
          <li><AppIcon name="shield" :size="16" /> Sin vender seguros</li>
          <li><AppIcon name="users" :size="16" /> Tu cliente sigue siendo tuyo</li>
        </ul>
        <div class="actions">
          <a href="#formulario" class="btn btn-primary">Quiero subir nuestros pisos <AppIcon name="arrow" :size="18" /></a>
          <NuxtLink to="/blog?para=inmobiliarias" class="btn btn-ghost">Guías para inmobiliarias</NuxtLink>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">Qué ganas</span>
          <h2>Lo que tu agencia gana con RentaHucha</h2>
        </div>
        <div class="grid grid-2">
          <div v-for="b in benefits" :key="b.title" class="card">
            <span class="icon-chip" :class="`chip-${b.tone}`"><AppIcon :name="b.icon" /></span>
            <h3>{{ b.title }}</h3>
            <p class="muted">{{ b.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">Cómo funciona</span>
          <h2>De tu cartera a un alquiler bien atado</h2>
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

    <section class="section section-dark">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">Protección</span>
          <h2>Cinco capas para que el impago sea raro</h2>
          <p class="lead">Lo que puedes contar a tus propietarios, sin letra pequeña.</p>
        </div>
        <AntiImpagoLayers />
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head center">
          <span class="eyebrow">Preguntas frecuentes</span>
          <h2>Dudas de inmobiliarias</h2>
        </div>
        <FaqList :items="faqs" />
      </div>
    </section>

    <section class="section section-alt">
      <div id="formulario" class="container signup">
        <div>
          <span class="eyebrow">Lista de espera</span>
          <h2>Apunta a tu inmobiliaria</h2>
          <p class="lead">Las primeras agencias de la lista entran con condiciones de lanzamiento y prioridad en su zona.</p>
          <ul class="check-list">
            <li><AppIcon name="check" :size="18" /> Sin compromiso ni coste por apuntaros</li>
            <li><AppIcon name="check" :size="18" /> Os contamos las condiciones antes de nada</li>
            <li><AppIcon name="check" :size="18" /> Sin vender ni intermediar seguros</li>
          </ul>
        </div>
        <AgencyLeadForm />
      </div>
    </section>
  </div>
</template>

<style scoped>
.head { max-width: 860px; }
.pills { list-style: none; padding: 0; margin: 28px 0; display: flex; flex-wrap: wrap; gap: 8px; }
.pills li {
  display: inline-flex; gap: 6px; align-items: center; font-size: 0.875rem; color: #e8e8e8;
  background: rgba(255, 255, 255, 0.06); border: 1px solid rgba(255, 255, 255, 0.14); border-radius: 999px; padding: 7px 14px;
}
.pills svg { color: var(--lime); }
.actions { display: flex; gap: 12px; flex-wrap: wrap; }
.card h3 { margin: 16px 0 6px; }
.card p { margin: 0; }
.steps { list-style: none; padding: 0; margin: 0; display: grid; gap: 16px; }
@media (min-width: 720px) { .steps { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1080px) { .steps { grid-template-columns: repeat(4, 1fr); } }
.steps li { background: #fff; border-radius: 16px; padding: 24px; display: flex; flex-direction: column; gap: 20px; }
.n { width: 44px; height: 44px; border-radius: 50%; background: var(--lime); color: var(--ink); display: grid; place-items: center; font-weight: 600; font-size: 1.05rem; }
.steps h3 { font-size: 1.1rem; margin-bottom: 6px; }
.steps p { font-size: 0.92rem; margin: 0; }
.signup { display: grid; gap: 48px; align-items: start; scroll-margin-top: 8px; }
@media (min-width: 900px) { .signup { grid-template-columns: 1fr 1.2fr; } }
.signup .check-list { margin-top: 20px; }
</style>
