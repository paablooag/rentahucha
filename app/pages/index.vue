<script setup lang="ts">
const { brand } = useAppConfig()

useSeoMeta({
  title: 'Alquiler con renta garantizada y hucha de ahorro',
  description: 'El propietario cobra siempre y el inquilino ahorra para su casa. Renta garantizada, inquilinos verificados y una hucha de garantía que se devuelve con premio.',
})

const faqs = [
  { q: '¿Qué es la hucha de garantía-ahorro?', a: 'Es donde va la garantía adicional del alquiler: una cuenta a nombre del inquilino, bloqueada a favor del contrato. Normalmente se llena poco a poco (por ejemplo, con el 4 % de la renta cada mes) y, si el propietario lo prefiere, se ingresa al firmar. Protege al propietario y, si el inquilino termina el contrato sin deudas, la recupera entera con un bonus por buen pagador.' },
  { q: '¿El dinero de la hucha lo tenéis vosotros?', a: 'No. La hucha está en una cuenta a nombre del inquilino en una entidad regulada, bloqueada a favor del contrato. Nunca pasa por nuestras cuentas.' },
  { q: '¿Qué pasa si el inquilino deja de pagar?', a: 'Le avisamos el mismo día y, si es un bache puntual, proponemos un plan corto. Si no se resuelve, la hucha cubre primero y la aseguradora socia paga la renta según la póliza. El proceso legal arranca ese mismo día con el expediente preparado.' },
  { q: '¿Garantizáis que el inquilino saldrá en pocos días?', a: 'No, y desconfía de quien lo prometa. Los plazos de desahucio los decide un juzgado. Lo que sí garantizamos es que tú sigues cobrando según la póliza y que no se pierde ni un día en arrancar el proceso.' },
  { q: '¿Cuánto cuesta?', a: 'Para el propietario, un 5 % de la renta mensual (menos si tiene varios pisos). Para el inquilino es gratis: no le cobramos gastos de gestión y su hucha es suya.' },
  { q: '¿Dónde funciona?', a: 'En toda España. Todo se hace online (verificación, contrato, cobros e incidencias), así que da igual en qué ciudad esté el piso. Nos encargamos de depositar la fianza en el organismo de cada comunidad autónoma.' },
]
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="hero">
      <div class="container">
        <span class="eyebrow">Próximamente en {{ brand.area }}</span>
        <h1>El alquiler donde pagar a tiempo te hace ahorrar y el propietario <span class="hl">cobra siempre</span>.</h1>
        <p class="lead">
          Renta garantizada para el propietario. Una hucha que se convierte en la entrada de tu casa para el inquilino.
          Por primera vez, los dos ganan con lo mismo: que el alquiler se pague a tiempo.
        </p>
        <div class="doors">
          <NuxtLink to="/propietarios" class="door owner">
            <span class="icon-chip chip-green"><AppIcon name="key" /></span>
            <span>
              <strong>Soy propietario</strong>
              <span>Cobra cada mes, pase lo que pase</span>
            </span>
            <AppIcon name="arrow" class="go" />
          </NuxtLink>
          <NuxtLink to="/inquilinos" class="door tenant">
            <span class="icon-chip chip-white"><AppIcon name="piggy" /></span>
            <span>
              <strong>Busco piso</strong>
              <span>Entra sin aval y ahorra para tu casa</span>
            </span>
            <AppIcon name="arrow" class="go" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <FactsMarquee />

    <!-- Problema -->
    <section class="section">
      <div class="container">
        <div class="section-head center">
          <span class="eyebrow">El problema</span>
          <h2>Hoy el alquiler solo castiga. Nadie premia al que cumple.</h2>
        </div>
        <div class="grid grid-2">
          <div class="card">
            <span class="icon-chip chip-navy"><AppIcon name="home" /></span>
            <h3>El propietario</h3>
            <ul class="check-list muted">
              <li>Miedo a un inquilino que deja de pagar y se queda meses mientras dura el juicio.</li>
              <li>Ese miedo le lleva a exigir avales y contratos indefinidos, o a dejar el piso vacío.</li>
              <li>Gestión manual: comprobar pagos, reclamar, resolver averías por WhatsApp.</li>
            </ul>
          </div>
          <div class="card">
            <span class="icon-chip chip-navy"><AppIcon name="users" /></span>
            <h3>El inquilino joven</h3>
            <ul class="check-list muted">
              <li>Para entrar le piden hasta cuatro meses de dinero: primer mes, fianza y dos meses de garantía extra.</li>
              <li>Le exigen aval de sus padres aunque siempre haya pagado bien.</li>
              <li>Años pagando religiosamente que no le sirven ni para el siguiente piso ni para la hipoteca.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Las tres piezas -->
    <section class="section section-dark">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">La solución</span>
          <h2>Tres piezas que nadie más junta en pisos de cualquier propietario</h2>
          <p class="lead">Las empresas de renta garantizada protegen al propietario del inquilino. Nosotros alineamos a los dos.</p>
        </div>
        <div class="grid grid-3">
          <div class="card">
            <span class="icon-chip chip-amber"><AppIcon name="piggy" /></span>
            <h3>Hucha de garantía-ahorro</h3>
            <p class="muted">La garantía adicional deja de ser dinero muerto: va a una cuenta a nombre del inquilino, normalmente mes a mes, y se le devuelve con premio.</p>
          </div>
          <div class="card">
            <span class="icon-chip chip-green"><AppIcon name="id" /></span>
            <h3>Pasaporte del buen inquilino</h3>
            <p class="muted">Cada pago puntual queda en un historial verificado y portable. Sirve para el siguiente alquiler, para no necesitar aval y ante el banco.</p>
          </div>
          <div class="card">
            <span class="icon-chip chip-violet"><AppIcon name="shield" /></span>
            <h3>Renta garantizada</h3>
            <p class="muted">Si algo falla, el propietario cobra igualmente a través de una aseguradora socia y el proceso legal arranca el primer día.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Simulador -->
    <section class="section section-alt">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">Haz la prueba</span>
          <h2>Tu garantía, convertida en ahorro</h2>
          <p class="lead">Mueve los valores y mira cuánto recuperarías al salir del piso si pagas a tiempo.</p>
        </div>
        <HuchaSimulator compact />
        <p class="more"><NuxtLink to="/inquilinos">Ver cómo funciona para inquilinos <AppIcon name="arrow" :size="16" /></NuxtLink></p>
      </div>
    </section>

    <!-- Capas -->
    <section class="section">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">Para que el impago sea raro</span>
          <h2>Cinco capas antiimpago</h2>
          <p class="lead">Cada una hace menos probable que se llegue a la siguiente.</p>
        </div>
        <AntiImpagoLayers />
        <div class="note note-green promise">
          <strong>Nuestra promesa, sin letra pequeña</strong>
          <p>«Si tu inquilino no paga, tú cobras igualmente y el proceso legal empieza el primer día.» Nunca te diremos «estará en la calle mañana»: eso lo decide un juez.</p>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="section section-alt">
      <div class="container">
        <div class="section-head center">
          <span class="eyebrow">Preguntas frecuentes</span>
          <h2>Lo que nos suelen preguntar</h2>
        </div>
        <FaqList :items="faqs" />
      </div>
    </section>

    <CtaBand />
  </div>
</template>

<style scoped>
.hero { min-height: min(100svh, 820px); display: flex; align-items: center; }
.hero h1 { max-width: 18ch; }
.hero .lead { max-width: 56ch; }
.hl { color: var(--lime); }
.doors { display: grid; gap: 12px; margin-top: 40px; max-width: 640px; }
@media (min-width: 560px) { .doors { grid-template-columns: 1fr 1fr; } }
.door {
  display: flex; align-items: center; gap: 12px; padding: 14px 16px; border-radius: 20px; text-decoration: none;
  background: rgba(255, 255, 255, 0.06); border: 1px solid rgba(255, 255, 255, 0.14); color: #fff;
  -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px); transition: all 0.2s;
}
.door .icon-chip { margin: 0; flex: none; }
.chip-white { background: #fff; color: var(--ink); }
.door > span:nth-child(2) { display: grid; flex: 1; }
.door strong { color: #fff; font-weight: 500; font-size: 1.05rem; }
.door > span:nth-child(2) span { font-size: 0.85rem; color: #a8a8a8; }
.door .go { color: #a8a8a8; transition: transform 0.2s, color 0.2s; }
.door:hover { background: rgba(255, 255, 255, 0.1); border-color: rgba(255, 255, 255, 0.35); transform: translateY(-2px); }
.door:hover .go { transform: translateX(3px); color: var(--lime); }
.check-list li::before { content: '—'; color: var(--muted); }
.more { margin: 28px 0 0; }
.more a { display: inline-flex; gap: 6px; align-items: center; font-weight: 500; }
.promise { margin-top: 28px; }
</style>
