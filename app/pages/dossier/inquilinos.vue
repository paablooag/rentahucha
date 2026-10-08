<script setup lang="ts">
definePageMeta({ layout: 'print' })
useSeoMeta({ title: 'Dossier para inquilinos', robots: 'noindex' })

const { brand } = useAppConfig()
const label = 'Dossier para inquilinos'
const RENT = 850
const MONTHS = 36

const entry = entryCost(RENT)
const hucha = calcHucha(RENT, HUCHA.defaultPct, MONTHS)

const bars = [6, 12, 18, 24, 30, 36].map(m => ({ label: `Mes ${m}`, value: huchaBalanceAt(RENT, HUCHA.defaultPct, m), bonus: false }))
bars.push({ label: 'Al salir + bonus', value: hucha.payout, bonus: true })
const maxBar = Math.max(...bars.map(b => b.value))

const byRent = [600, 750, 850, 1000].map(rent => ({ rent, ...calcHucha(rent, HUCHA.defaultPct, MONTHS) }))

const faqs = [
  { q: '¿Qué pasa si un mes me retraso?', a: 'Te avisamos antes del cobro y, si falla, te contactamos el mismo día. Si es un bache puntual, se puede pactar un plan de pago corto.' },
  { q: '¿Quién ve mis nóminas y extractos?', a: 'Nadie más que el sistema de verificación. Al propietario solo le llega un resumen, y solo si tú compartes tu pasaporte.' },
  { q: '¿Puedo llevarme la hucha a otro piso?', a: 'Sí. Si te mudas a otro piso de la red, la trasladas y sigues ahorrando.' },
  { q: '¿Me cobráis algo?', a: 'No. Los gastos de gestión los paga el propietario, como marca la ley.' },
  GUARANTEE_FAQ.tenant,
  DURATION_FAQ.tenant,
]
</script>

<template>
  <div>
    <DossierCover
      audience="Inquilinos"
      title="Paga tu alquiler a tiempo y"
      highlight="ahorra para tu casa."
      lead="Entra en tu piso sin aval y, en los pisos con hucha, con mucho menos dinero. Tu garantía se convierte en una hucha que te devolvemos con premio."
      :stats="[
        { value: formatEuro(entry.traditional.total - entry.ours.total), label: `menos al entrar en un piso con hucha de ${formatEuro(RENT)}.` },
        { value: formatEuro(hucha.payout), label: 'de vuelta tras 3 años pagando a tiempo.' },
        { value: '0 €', label: 'de comisión para ti. Nunca.' },
      ]"
    />

    <!-- 02 · Entrar con menos dinero -->
    <DossierPage :label="label" :n="2">
      <div class="d-section">
        <span class="eyebrow">En los pisos con hucha</span>
        <h2>Deja de inmovilizar cuatro meses de renta</h2>
        <p class="d-lead">Las garantías adicionales que te piden al entrar son dinero que no trabaja. Con nosotros, esa garantía se forma poco a poco y es tuya.</p>
        <div class="d-grid d-2">
          <div class="d-card">
            <span class="badge badge-muted">Alquiler tradicional (caso exigente)</span>
            <ul class="rows">
              <li><span>Primer mes</span><span>{{ formatEuro(entry.traditional.firstMonth) }}</span></li>
              <li><span>Fianza legal</span><span>{{ formatEuro(entry.traditional.deposit) }}</span></li>
              <li><span>Garantía adicional (2 meses)</span><span>{{ formatEuro(entry.traditional.extraGuarantee) }}</span></li>
              <li><span>Aval de padres o bancario</span><span>A menudo</span></li>
            </ul>
            <div class="total"><span>Al entrar</span><strong>{{ formatEuro(entry.traditional.total) }}</strong></div>
          </div>
          <div class="d-card ink">
            <span class="badge lime-badge">Piso con hucha</span>
            <ul class="rows">
              <li><span>Primer mes</span><span>{{ formatEuro(entry.ours.firstMonth) }}</span></li>
              <li><span>Fianza legal</span><span>{{ formatEuro(entry.ours.deposit) }}</span></li>
              <li><span>Garantía adicional</span><span class="hl">0 € (se forma en tu hucha)</span></li>
              <li><span>Aval</span><span class="hl">No, si tu perfil lo permite</span></li>
            </ul>
            <div class="total"><span>Al entrar</span><strong class="hl">{{ formatEuro(entry.ours.total) }}</strong></div>
          </div>
        </div>
      </div>

      <div class="d-section">
        <span class="eyebrow">La hucha de garantía-ahorro</span>
        <h2>Tu garantía, convertida en ahorro</h2>
        <div class="d-grid d-2">
          <ul class="d-list">
            <li>Aportas un {{ formatPercent(HUCHA.defaultPct) }} de la renta cada mes, junto con el pago del alquiler: {{ formatEuro(hucha.monthly) }} en un piso de {{ formatEuro(RENT) }}.</li>
            <li>El dinero está en una cuenta a tu nombre en una entidad regulada, bloqueada a favor del contrato. No es nuestro.</li>
            <li>Tiene un tope de dos mensualidades, el máximo de garantía adicional que permite la ley.</li>
          </ul>
          <ul class="d-list">
            <li>Si terminas sin deudas ni desperfectos, te la devolvemos entera con un bonus del {{ HUCHA.bonusPct }} % por buen pagador.</li>
            <li>Si te mudas a otro piso de la red, te la llevas y sigues ahorrando.</li>
            <li>Si hay un impago, la hucha cubre primero. Por eso los propietarios confían en ti.</li>
          </ul>
        </div>
      </div>
    </DossierPage>

    <!-- 03 · La hucha en números y el pasaporte -->
    <DossierPage :label="label" :n="3">
      <div class="d-section">
        <span class="eyebrow">En números</span>
        <h2>Tu hucha, mes a mes</h2>
        <div class="d-card ink chart-card">
          <div class="d-grid d-3 totals">
            <div><div class="d-label">Ahorrado en {{ MONTHS }} meses</div><div class="d-num white">{{ formatEuro(hucha.balance) }}</div></div>
            <div><div class="d-label">Bonus buen pagador ({{ HUCHA.bonusPct }} %)</div><div class="d-num white">+{{ formatEuro(hucha.bonus) }}</div></div>
            <div class="payout"><div class="d-label dark-label">Recuperas al salir</div><div class="d-num dark-num">{{ formatEuro(hucha.payout) }}</div></div>
          </div>
          <div class="d-chart">
            <div v-for="b in bars" :key="b.label" class="d-bar-col">
              <span class="d-bar-val">{{ formatEuro(b.value) }}</span>
              <div class="d-bar" :class="{ bonus: b.bonus }" :style="{ height: `${(b.value / maxBar) * 100}%` }" />
              <span class="d-bar-label">{{ b.label }}</span>
            </div>
          </div>
          <p class="d-small">Piso de {{ formatEuro(RENT) }} y aportación del {{ formatPercent(HUCHA.defaultPct) }}. Simulación orientativa.</p>
        </div>
      </div>

      <div class="d-section">
        <table class="d-table">
          <thead>
            <tr><th>Renta mensual</th><th class="num">Aportas al mes</th><th class="num">En 3 años</th><th class="num">Con el bonus</th></tr>
          </thead>
          <tbody>
            <tr v-for="r in byRent" :key="r.rent">
              <td>{{ formatEuro(r.rent) }}</td>
              <td class="num">{{ formatEuro(r.monthly, true) }}</td>
              <td class="num">{{ formatEuro(r.balance) }}</td>
              <td class="num"><strong>{{ formatEuro(r.payout) }}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="d-section">
        <span class="eyebrow">Pasaporte del buen inquilino</span>
        <h2>Que pagar bien por fin te sirva de algo</h2>
        <p class="d-lead">Un historial verificado y tuyo. Tú decides con quién lo compartes.</p>
        <div class="d-grid d-2 passport">
          <div class="d-card soft">
            <h3>Lo que ve el propietario</h3>
            <ul class="d-list">
              <li>Identidad, ingresos y situación laboral verificados</li>
              <li>Hasta qué renta te puedes permitir con margen</li>
              <li>Cuántos pagos has hecho a tiempo y tu hucha</li>
            </ul>
          </div>
          <div class="d-card soft">
            <h3>Lo que no ve</h3>
            <ul class="d-list no">
              <li>Tus nóminas ni tus extractos</li>
              <li>Tu salario exacto ni tus movimientos</li>
              <li>Nada que no hayas decidido compartir</li>
            </ul>
          </div>
        </div>
      </div>
    </DossierPage>

    <!-- 04 · Qué te pedimos y siguiente paso -->
    <DossierPage :label="label" :n="4">
      <div class="d-section">
        <span class="eyebrow">Transparencia</span>
        <h2>Qué te pedimos y para qué</h2>
        <div class="d-grid d-3">
          <div class="d-card soft">
            <div class="d-chip">1</div>
            <h3>Identidad</h3>
            <p class="d-small">Verificamos tu documento para que nadie pueda usar tu pasaporte.</p>
          </div>
          <div class="d-card soft">
            <div class="d-chip">2</div>
            <h3>Ingresos</h3>
            <p class="d-small">Conectas tu banco de forma segura o subes tus nóminas. Calculamos la renta que te puedes permitir con margen.</p>
          </div>
          <div class="d-card soft">
            <div class="d-chip">3</div>
            <h3>Estabilidad</h3>
            <p class="d-small">Contrato o actividad y vida laboral. Valoramos autónomos, temporales y estudiantes con ingresos.</p>
          </div>
        </div>
      </div>

      <div class="d-section">
        <span class="eyebrow">Preguntas frecuentes</span>
        <div class="d-grid d-2 faq-grid">
          <div v-for="f in faqs" :key="f.q" class="d-card">
            <h3>{{ f.q }}</h3>
            <p class="d-small">{{ f.a }}</p>
          </div>
        </div>
      </div>

      <div class="d-spacer" />

      <div class="d-card lime cta">
        <div>
          <h2>Crea tu pasaporte de inquilino</h2>
          <p>Apúntate y serás de los primeros candidatos verificados cuando lancemos, estés donde estés.</p>
        </div>
        <div class="cta-links">
          <strong>{{ brand.domain }}/inquilinos</strong>
          <span>{{ brand.email }}</span>
        </div>
      </div>
      <p class="d-small legal">
        Porcentaje de aportación y bonus en validación. La hucha la gestiona una entidad regulada a tu nombre. Documento informativo; no constituye una oferta vinculante.
      </p>
    </DossierPage>
  </div>
</template>

<style scoped>
.rows { list-style: none; padding: 0; margin: 4mm 0; display: grid; gap: 2.2mm; }
.rows li { display: flex; justify-content: space-between; gap: 3mm; font-size: 9.5pt; border-bottom: 1px solid var(--line); padding-bottom: 2mm; }
.d-card.ink .rows li { border-color: #2a2a2a; }
.total { display: flex; justify-content: space-between; align-items: baseline; }
.total strong { font-size: 24pt; font-weight: 500; letter-spacing: -0.03em; color: var(--ink); }
.lime-badge { background: var(--lime); color: var(--ink); }
.d-card.ink .total strong.hl,
.d-card.ink .hl { color: var(--lime); }
.totals { margin-bottom: 2mm; }
.white { color: #fff !important; font-size: 18pt; }
.payout { background: var(--lime); border-radius: 3mm; padding: 2.5mm 3.5mm; }
.dark-label { color: #2f2f2f !important; margin: 0 0 1mm; }
.dark-num { color: var(--ink) !important; font-size: 18pt; }
.chart-card .d-small { margin: 0; }
.fair { margin-top: 4mm; }
.passport .d-card { padding: 4.5mm; }
.passport .d-list { font-size: 9.5pt; gap: 1.6mm; }
.chart-card { padding: 5mm 6mm; }
.cta { display: grid; grid-template-columns: 1.5fr 1fr; gap: 6mm; align-items: end; padding: 8mm; }
.cta h2 { margin-bottom: 2mm; }
.cta p { margin: 0; color: #2f2f2f; }
.cta-links { display: grid; gap: 1mm; text-align: right; }
.cta-links strong { font-size: 12pt; font-weight: 600; }
.legal { margin: 4mm 0 0; }
.faq-grid .d-card:last-child:nth-child(odd) { grid-column: span 2; }
</style>
