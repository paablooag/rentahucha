<script setup lang="ts">
definePageMeta({ layout: 'print' })
useSeoMeta({ title: 'Dossier para propietarios', robots: 'noindex' })

const { brand } = useAppConfig()
const label = 'Dossier para propietarios'
const RENT = 850

const fee = calcFees(RENT, 1)
const huchaMonthly = (RENT * HUCHA.defaultPct) / 100

const steps = [
  { title: 'Das de alta tu piso', text: 'Renta, fecha de entrada y tus condiciones.' },
  { title: 'Recibes candidatos verificados', text: 'Solo perfiles que encajan económicamente, con nuestra recomendación.' },
  { title: 'Firmas online', text: 'Contrato conforme a la LAU, firma electrónica y renta garantizada incluida.' },
  { title: 'Cobras cada mes', text: 'Aviso de cada pago. Incidencias con fotos en tu panel.' },
  { title: 'Si algo falla, cobras igual', text: 'Hucha primero, aseguradora después y proceso legal ese mismo día.' },
]

const layers = [
  { title: 'Filtro exigente', text: 'Ingresos verificados por open banking, contrato, vida laboral y ahorros. Ratio renta/ingresos prudente y revisión humana en casos límite.' },
  { title: 'Incentivo a pagar', text: 'El inquilino tiene algo que ganar y algo que perder: su hucha, su bonus y su historial.' },
  { title: 'Aviso el día 1', text: 'Recordatorio antes del cobro y alerta inmediata si falla. Plan de pago corto si es un bache puntual.' },
  { title: 'La hucha cubre', text: 'La hucha del inquilino cubre el primer impago mientras se resuelve.' },
  { title: 'Seguro y abogado', text: 'Si persiste, la aseguradora paga la renta según la póliza y el protocolo legal arranca ese mismo día.' },
]

// Ejemplo de impago sin protección, con los mismos valores por defecto que la calculadora de la web.
const impago = [
  { label: '10 meses de renta sin cobrar', value: RENT * 10 },
  { label: 'Abogado, procurador y burofax', value: 1500 },
  { label: 'Reparaciones al recuperar el piso', value: 800 },
  { label: '1 mes vacío hasta el siguiente inquilino', value: RENT },
]
const impagoTotal = impago.reduce((s, i) => s + i.value, 0)
</script>

<template>
  <div>
    <DossierCover
      audience="Propietarios"
      title="Alquila tu piso y cobra cada mes,"
      highlight="pase lo que pase."
      lead="Inquilinos verificados a fondo que además tienen un incentivo real para pagar a tiempo. Si algo falla, tú cobras y activamos el proceso legal el primer día."
      :stats="[
        { value: formatPercent(fee.rate), label: 'de la renta, todo incluido. Menos con varios pisos.' },
        { value: 'Día 1', label: 'en que arranca el protocolo legal si hay impago.' },
        { value: '0 €', label: 'de coste de entrada. Pagas solo cuando cobras.' },
      ]"
    />

    <!-- 02 · Problema y cómo funciona -->
    <DossierPage :label="label" :n="2">
      <div class="d-section">
        <span class="eyebrow">El problema</span>
        <h2>Alquilar no debería darte miedo</h2>
        <div class="d-grid d-2 problem">
          <div class="d-card soft">
            <h3>Lo que hoy te preocupa</h3>
            <ul class="d-list">
              <li>Un inquilino que deja de pagar y se queda meses mientras dura el juicio.</li>
              <li>Tener que exigir avales y contratos indefinidos, o dejar el piso vacío.</li>
              <li>Comprobar pagos, reclamar y resolver averías por WhatsApp.</li>
            </ul>
          </div>
          <div class="d-card ink">
            <h3>Lo que hacemos por ti</h3>
            <ul class="d-list">
              <li>Te presentamos solo inquilinos verificados.</li>
              <li>Cobras cada mes, también si el inquilino falla, según la póliza.</li>
              <li>Pagos, avisos e incidencias en un solo panel.</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="d-section">
        <span class="eyebrow">Cómo funciona</span>
        <h2>De piso vacío a renta cobrada</h2>
        <div class="d-grid d-5 steps">
          <div v-for="(s, i) in steps" :key="s.title" class="d-card soft">
            <div class="d-chip" :class="{ ink: i === steps.length - 1 }">{{ i + 1 }}</div>
            <h3>{{ s.title }}</h3>
            <p class="d-small">{{ s.text }}</p>
          </div>
        </div>
      </div>

      <div class="d-section">
        <span class="eyebrow">Cómo circula el dinero</span>
        <h2>Un inquilino con algo que perder</h2>
        <p class="d-lead">
          Su hucha crece cada mes y la pierde si deja de pagar. Ejemplo con un piso de {{ formatEuro(RENT) }}:
        </p>
        <div class="d-flow flow">
          <div class="d-node lime">
            <div class="who">Inquilino</div>
            <strong>{{ formatEuro(RENT + huchaMonthly) }}</strong>
            <div class="what">Renta + aportación a su hucha</div>
          </div>
          <div class="arrow">→</div>
          <div class="d-node ink">
            <div class="who">Entidad de pago autorizada</div>
            <div class="what">Cobra y reparte en cuentas segregadas. El dinero nunca pasa por nuestras cuentas.</div>
          </div>
          <div class="arrow">→</div>
          <div class="d-outs">
            <div class="d-node">
              <div class="who">Tú recibes</div>
              <strong>{{ formatEuro(fee.netPerUnit, true) }}</strong>
            </div>
            <div class="d-node burdeos">
              <div class="who">Hucha del inquilino</div>
              <strong>{{ formatEuro(huchaMonthly, true) }}</strong>
            </div>
            <div class="d-node sky">
              <div class="who">Gestión ({{ formatPercent(fee.rate) }})</div>
              <strong>{{ formatEuro(fee.perUnit, true) }}</strong>
            </div>
          </div>
        </div>
      </div>
    </DossierPage>

    <!-- 03 · Protección -->
    <DossierPage :label="label" :n="3">
      <div class="d-section">
        <span class="eyebrow">Protección</span>
        <h2>Cinco capas de protección</h2>
        <p class="d-lead">Cada capa hace menos probable que se llegue a la siguiente.</p>
        <div class="layers">
          <div v-for="(l, i) in layers" :key="l.title" class="layer">
            <div class="d-chip" :class="{ ink: i === layers.length - 1 }">{{ i + 1 }}</div>
            <div>
              <h3>{{ l.title }}</h3>
              <p class="d-small">{{ l.text }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="d-section">
        <div class="d-note">
          <strong>Nuestra promesa, sin letra pequeña</strong>
          <p>«Si tu inquilino no paga, tú cobras igualmente y el proceso legal empieza el primer día.» Nunca te diremos «estará en la calle mañana»: eso lo decide un juez.</p>
        </div>
      </div>

      <div class="d-section">
        <span class="eyebrow">Haz números</span>
        <h2>Lo que puede costar un impago sin protección</h2>
        <div class="d-grid d-2 cost">
          <table class="d-table">
            <thead><tr><th>Concepto (piso de {{ formatEuro(RENT) }})</th><th class="num">Importe</th></tr></thead>
            <tbody>
              <tr v-for="i in impago" :key="i.label"><td>{{ i.label }}</td><td class="num">{{ formatEuro(i.value) }}</td></tr>
              <tr class="total"><td>Total</td><td class="num">{{ formatEuro(impagoTotal) }}</td></tr>
            </tbody>
          </table>
          <div class="d-card ink">
            <div class="d-num">{{ formatEuro(fee.yearlyTotal) }}</div>
            <div class="d-label">al año cuesta nuestro servicio para ese mismo piso, con renta garantizada incluida.</div>
            <p class="d-small vs">Estimación orientativa. Los plazos judiciales varían mucho entre juzgados.</p>
          </div>
        </div>
      </div>
    </DossierPage>

    <!-- 04 · Condiciones: duración y garantías -->
    <DossierPage :label="label" :n="4">
      <div class="d-section">
        <span class="eyebrow">Duración del alquiler</span>
        <h2>Alquila el tiempo que te encaje</h2>
        <p class="d-lead">¿Solo quieres alquilar un año? ¿Vas a necesitar el piso más adelante? Hay una fórmula legal para cada caso.</p>
        <div class="d-grid d-3 options">
          <div v-for="(o, i) in DURATION_OPTIONS" :key="o.title" class="d-card soft">
            <div class="d-chip" :class="{ ink: i === DURATION_OPTIONS.length - 1 }">{{ i + 1 }}</div>
            <h3>{{ o.title }}</h3>
            <p class="d-small">{{ o.text }}</p>
          </div>
        </div>
      </div>

      <div class="d-section">
        <span class="eyebrow">Garantías</span>
        <h2>{{ GUARANTEE_HEAD.title }}</h2>
        <p class="d-lead">{{ GUARANTEE_HEAD.lead }}</p>
        <div class="d-grid d-3 options">
          <div v-for="(o, i) in GUARANTEE_OPTIONS" :key="o.title" class="d-card soft">
            <div class="opt-top">
              <div class="d-chip" :class="{ ink: i === GUARANTEE_OPTIONS.length - 1 }">{{ i + 1 }}</div>
              <span v-if="o.tag" class="badge">{{ o.tag }}</span>
            </div>
            <h3>{{ o.title }}</h3>
            <p class="d-small">{{ o.text }}</p>
          </div>
        </div>
      </div>

      <div class="d-note">
        <strong>Siempre en la hucha del inquilino</strong>
        <p>{{ GUARANTEE_NOTE }} Te recomendamos el contrato y la garantía que encajan con lo que quieres, y lo dejamos bien redactado desde el primer día.</p>
      </div>
    </DossierPage>

    <!-- 05 · Precios y siguiente paso -->
    <DossierPage :label="label" :n="5">
      <div class="d-section">
        <span class="eyebrow">Precios</span>
        <h2>Pagas un porcentaje de lo que cobras</h2>
        <table class="d-table">
          <thead>
            <tr><th>Pisos con nosotros</th><th class="num">Cuota sobre la renta</th><th class="num">Cuota con {{ formatEuro(RENT) }}</th><th class="num">Recibes cada mes</th></tr>
          </thead>
          <tbody>
            <tr v-for="t in FEE_TIERS" :key="t.label">
              <td>{{ t.label }}</td>
              <td class="num">{{ formatPercent(t.rate) }}</td>
              <td class="num">{{ formatEuro((RENT * t.rate) / 100, true) }}</td>
              <td class="num">{{ formatEuro(RENT - (RENT * t.rate) / 100, true) }}</td>
            </tr>
          </tbody>
        </table>
        <p class="d-small note-after">Precios orientativos de lanzamiento. Sin coste de entrada ni permanencia.</p>
      </div>

      <div class="d-section d-grid d-2">
        <div class="d-card soft">
          <h3>Qué incluye</h3>
          <ul class="d-list">
            <li>Selección y verificación del inquilino</li>
            <li>Contrato conforme a la LAU con firma electrónica</li>
            <li>Cobro mensual y aviso de cada pago</li>
            <li>Gestión de incidencias del piso</li>
            <li>Protocolo de impago y coordinación del seguro</li>
          </ul>
        </div>
        <div class="d-card soft">
          <h3>Lo que nunca hacemos</h3>
          <ul class="d-list no">
            <li>Prometer desalojos sin juez ni presionar al inquilino</li>
            <li>Cobrar gastos de gestión al inquilino</li>
            <li>Custodiar rentas en nuestras cuentas</li>
          </ul>
        </div>
      </div>

      <div class="d-spacer" />

      <div class="d-card lime cta">
        <div>
          <h2>Da de alta tu piso con prioridad</h2>
          <p>Los primeros pisos de la lista entran con condiciones de lanzamiento. Te enseñamos la póliza antes de nada.</p>
        </div>
        <div class="cta-links">
          <strong>{{ brand.domain }}/propietarios</strong>
          <span>{{ brand.email }}</span>
        </div>
      </div>
      <p class="d-small legal">
        Desde el lanzamiento, la renta garantizada se prestará a través de una aseguradora autorizada y según las condiciones de su póliza, y los cobros los gestionará una entidad de pago autorizada.
        Documento informativo; no constituye una oferta vinculante.
      </p>
    </DossierPage>
  </div>
</template>

<style scoped>
.layers { display: grid; gap: 2.2mm; }
.layer { display: grid; grid-template-columns: 10mm 1fr; align-items: center; padding: 2.6mm 4mm; border-radius: 3.5mm; background: var(--off); }
.layer h3 { font-size: 10.5pt; margin-bottom: 0.5mm; }
.steps .d-card { padding: 4mm; }
.steps h3 { font-size: 10pt; }
.steps .d-small { font-size: 8pt; line-height: 1.4; }
.steps .d-chip { width: 7mm; height: 7mm; font-size: 8.5pt; margin-bottom: 2.5mm; }
.problem .d-card { padding: 4.5mm; }
.problem .d-list { font-size: 9.5pt; }
.flow .d-node { padding: 2.6mm 3.5mm; }
.flow .d-node strong { font-size: 13pt; }
.flow .d-outs { gap: 1.6mm; }
.layer .d-chip { margin: 0; }
.layer p { margin: 0; }
.cost { grid-template-columns: 1.4fr 1fr; align-items: stretch; }
.vs { margin-top: 4mm; }
.note-after { margin-top: 2.5mm; }
.options .d-card { padding: 5mm; }
.options h3 { font-size: 11pt; }
.options .d-small { margin: 0; font-size: 9pt; line-height: 1.5; }
.opt-top { display: flex; justify-content: space-between; align-items: flex-start; }
.opt-top .badge { font-size: 7pt; }
.cta { display: grid; grid-template-columns: 1.5fr 1fr; gap: 6mm; align-items: end; padding: 8mm; }
.cta h2 { margin-bottom: 2mm; }
.cta p { margin: 0; color: #2f2f2f; }
.cta-links { display: grid; gap: 1mm; text-align: right; }
.cta-links strong { font-size: 12pt; font-weight: 600; }
.legal { margin: 4mm 0 0; }
</style>
