<script setup lang="ts">
const { brand } = useAppConfig()

useSeoMeta({
  title: 'Cómo funciona',
  description: 'Cómo circula el dinero, qué cubre la hucha, qué cubre el seguro y qué dice la ley. Todo lo que hay detrás de la renta garantizada con hucha de ahorro.',
})

const legal = [
  { topic: 'Impago', yes: 'Requerir el pago, intentar el acuerdo y demandar con el expediente preparado.', no: 'Cambiar cerraduras, cortar suministros o presionar. Solo un juez decide un desalojo.' },
  { topic: 'Renta garantizada', yes: 'A través de una aseguradora autorizada y según su póliza.', no: 'Que la plataforma garantice rentas con su propio dinero.' },
  { topic: 'Garantías', yes: 'En vivienda habitual, fianza legal de un mes y hasta dos mensualidades de garantía adicional (tres en total). En alquiler de temporada, fianza de dos mensualidades.', no: 'Pedir más de lo que permite la ley o exigir más de un mes de renta por adelantado.' },
  { topic: 'Gastos de gestión', yes: 'Los paga el propietario.', no: 'Repercutirlos al inquilino.' },
  { topic: 'Dinero de terceros', yes: 'Lo gestiona una entidad de pago autorizada en cuentas segregadas.', no: 'Que pase por cuentas de la plataforma.' },
]
</script>

<template>
  <div>
    <section class="section">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">Cómo funciona</span>
          <h1>Sin trucos: así funciona {{ brand.name }} por dentro</h1>
          <p class="lead">Un modelo en el que el propietario cobra siempre y el inquilino gana por pagar bien. Esto es lo que hay detrás.</p>
        </div>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container">
        <div class="section-head">
          <h2>Cómo circula el dinero cada mes</h2>
          <p class="lead">Ejemplo con un piso de 850 € y una aportación a la hucha del 4 %.</p>
        </div>
        <MoneyFlow :rent="850" />
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head">
          <h2>Qué pasa si hay un impago</h2>
        </div>
        <ol class="timeline">
          <li>
            <span class="when">Antes del día de cobro</span>
            <p>Recordatorio al inquilino con el importe y la fecha.</p>
          </li>
          <li>
            <span class="when">Día 1 · el cobro falla</span>
            <p>Alerta inmediata a inquilino y propietario. Contactamos al inquilino para entender qué ha pasado y, si es un bache puntual, proponemos un plan de pago corto.</p>
          </li>
          <li>
            <span class="when">Primer mes impagado</span>
            <p>La hucha del inquilino cubre la renta. El propietario cobra con normalidad. Se envía requerimiento fehaciente.</p>
          </li>
          <li>
            <span class="when">Si el impago persiste</span>
            <p>Se comunica el siniestro a la aseguradora, que paga la renta según la póliza. El abogado presenta la demanda con el expediente ya preparado.</p>
          </li>
          <li>
            <span class="when">Resolución</span>
            <p>Los plazos dependen del juzgado. El propietario sigue cobrando según la póliza mientras tanto.</p>
          </li>
        </ol>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container">
        <div class="section-head">
          <h2>Lo que la ley permite (y lo que no)</h2>
          <p class="lead">Preferimos decirte lo que no hacemos antes que prometerte lo que no se puede cumplir.</p>
        </div>
        <div class="table-wrap">
          <table class="table">
            <thead>
              <tr><th>Tema</th><th>Lo que hacemos</th><th>Lo que nunca hacemos</th></tr>
            </thead>
            <tbody>
              <tr v-for="row in legal" :key="row.topic">
                <td><strong>{{ row.topic }}</strong></td>
                <td>{{ row.yes }}</td>
                <td>{{ row.no }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <CtaBand />
  </div>
</template>

<style scoped>
.timeline { list-style: none; padding: 0; margin: 0; max-width: 760px; border-left: 2px solid var(--line); }
.timeline li { position: relative; padding: 0 0 28px 28px; }
.timeline li::before { content: ''; position: absolute; left: -7px; top: 6px; width: 12px; height: 12px; border-radius: 50%; background: var(--green); box-shadow: 0 0 0 4px var(--bg); }
.timeline li:nth-child(n + 4)::before { background: var(--violet); }
.when { font-weight: 700; color: var(--navy); }
.timeline p { margin: 4px 0 0; color: var(--muted); }
</style>
