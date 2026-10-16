<script setup lang="ts">
const { brand } = useAppConfig()

useSeoMeta({
  title: 'Cómo funciona',
  description: 'Cómo circula el dinero, qué pasa con la hucha si hay un impago y qué dice la ley. Todo lo que hay detrás de RentaHucha.',
})

const legal = [
  { topic: 'Impago', yes: 'Requerir el pago, intentar el acuerdo y demandar con el expediente preparado.', no: 'Cambiar cerraduras, cortar suministros o presionar. Solo un juez decide un desalojo.' },
  { topic: 'Seguros', yes: 'Explicarte que puedes contratar un seguro de impago por tu cuenta, con la compañía que elijas.', no: 'Vender, gestionar ni intermediar seguros. No somos una aseguradora ni pagamos rentas con nuestro dinero.' },
  { topic: 'Garantías', yes: 'En vivienda habitual, fianza legal de un mes y hasta dos mensualidades de garantía adicional (tres en total). En alquiler de temporada, fianza de dos mensualidades.', no: 'Pedir más de lo que permite la ley o exigir más de un mes de renta por adelantado.' },
  { topic: 'Gastos de gestión', yes: 'Los paga el propietario.', no: 'Repercutirlos al inquilino.' },
  { topic: 'Dinero de terceros', yes: 'Lo custodia una entidad financiera autorizada, en una cuenta a nombre de cada inquilino.', no: 'Que pase por cuentas de la plataforma.' },
  { topic: 'Hucha', yes: 'Moverla solo con las condiciones firmadas al inicio: impago de renta comprobado, o acuerdo de ambas partes o resolución si hay desperfectos.', no: 'Decidir por nuestra cuenta qué hacer con ella.' },
]
</script>

<template>
  <div>
    <section class="section">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">Cómo funciona</span>
          <h1>Sin trucos: así funciona {{ brand.name }} por dentro</h1>
          <p class="lead">Un modelo en el que el propietario alquila con más tranquilidad y el inquilino gana por pagar bien. Esto es lo que hay detrás.</p>
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
            <p>Se envía requerimiento fehaciente de pago. Si el impago se comprueba y no se regulariza, se paga al propietario la cantidad pendiente con el saldo de la hucha, sin esperar a un juicio.</p>
          </li>
          <li>
            <span class="when">Si el impago persiste</span>
            <p>Entregamos al propietario el expediente completo (contrato, pagos y comunicaciones) para que su abogado reclame sin perder tiempo. Si tiene un seguro de impago propio, le sirve también para su aseguradora.</p>
          </li>
          <li>
            <span class="when">Resolución</span>
            <p>Los plazos dependen del juzgado. Nunca prometemos desalojos rápidos: eso lo decide un juez.</p>
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
          <table class="table stack-table">
            <thead>
              <tr><th>Tema</th><th>Lo que hacemos</th><th>Lo que nunca hacemos</th></tr>
            </thead>
            <tbody>
              <tr v-for="row in legal" :key="row.topic">
                <td><strong>{{ row.topic }}</strong></td>
                <td data-label="Lo que hacemos">{{ row.yes }}</td>
                <td data-label="Lo que nunca hacemos">{{ row.no }}</td>
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

@media (max-width: 640px) {
  .stack-table thead { display: none; }
  .stack-table,
  .stack-table tbody,
  .stack-table tr,
  .stack-table td { display: block; width: 100%; }
  .stack-table tr { border-bottom: 1px solid var(--line); }
  .stack-table tr:last-child { border-bottom: 0; }
  .stack-table td { border: 0; padding: 6px 16px; }
  .stack-table td:first-child { padding-top: 16px; font-size: 1.05rem; }
  .stack-table td:last-child { padding-bottom: 16px; }
  .stack-table td[data-label]::before { content: attr(data-label); display: block; font-size: 0.78rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; color: var(--muted); margin-bottom: 2px; }
}
</style>
