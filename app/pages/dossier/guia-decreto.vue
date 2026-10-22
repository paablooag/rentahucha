<script setup lang="ts">
// Guía del Real Decreto-ley 29/2026 para propietarios (PDF a cambio del correo, ver GuiaDecretoDownload).
// Texto comprobado en el BOE el 22-10-2026. Tras la votación del 12-N: actualizar y regenerar con `npm run pdf`.
definePageMeta({ layout: 'print' })
useSeoMeta({ title: 'Decreto de vivienda 2026: guía para propietarios', robots: 'noindex' })
const label = 'Decreto de vivienda 2026 · guía para propietarios'
</script>

<template>
  <div>
    <DossierCover
      tag="Guía"
      audience="Propietarios"
      title="Decreto de vivienda 2026:"
      highlight="lo que cambia si alquilas tu piso."
      lead="Subidas, prórrogas, temporada, habitaciones, anuncios, garantías, IRPF, IVA, IBI y desahucios: el Real Decreto-ley 29/2026 explicado con el texto del BOE. Actualizado a 22 de octubre de 2026."
      :stats="[
        { value: '2 %', label: 'subida máxima sin nuevo acuerdo hasta el 31-12-2027.' },
        { value: '100 %', label: 'reducción del IRPF posible en contratos posteriores al 1-12-2026.' },
        { value: '12-N', label: 'votación prevista de la convalidación (según la prensa).' },
      ]"
    />

    <DossierPage :label="label" :n="2">
      <div class="d-note warn">
        <strong>Pendiente de convalidación</strong>
        <p>El decreto está en vigor desde el 8 de octubre de 2026, pero tiene que convalidarlo el Congreso (la Diputación Permanente). Si no se convalida, decae. Comprueba siempre la situación en el BOE antes de decidir.</p>
      </div>
      <div class="d-section">
        <span class="eyebrow">El contrato</span>
        <h2>Lo que cambia en el alquiler</h2>
        <table class="d-table topics">
          <thead><tr><th>Tema</th><th>Qué dice el decreto</th></tr></thead>
          <tbody>
            <tr><td><strong>Subida de la renta</strong></td><td>Actualizaciones entre el 8-10-2026 y el 31-12-2027: sin nuevo acuerdo, como máximo un 2 %; y ninguna si la renta supera el límite del índice de referencia. Si el contrato no prevé actualizar, no se actualiza.</td></tr>
            <tr><td><strong>Prórroga extraordinaria</strong></td><td>Hasta dos años más si el periodo obligatorio (5 o 7 años) o la prórroga tácita termina antes del 31-12-2028 y el inquilino lleva ocho meses al día. No procede si renováis con una renta al menos un 5 % más baja o si necesitas la vivienda para ti o un familiar.</td></tr>
            <tr><td><strong>Temporada</strong></td><td>Pasa a ser «vivienda temporal»: causa real escrita en el contrato (la prueba es tuya), más de 31 días y en general hasta 12 meses. Sin causa, es vivienda habitual desde la firma. El inquilino puede irse tras un mes avisando con 10 días.</td></tr>
            <tr><td><strong>Habitaciones</strong></td><td>Alquilar una habitación es alquiler de vivienda (habitual o temporal). La suma de las habitaciones no puede superar la renta del piso completo.</td></tr>
            <tr><td><strong>Garantías</strong></td><td>Garantía adicional: máximo dos mensualidades (una en temporada). No se puede exigir al inquilino un seguro de impago.</td></tr>
            <tr><td><strong>Gastos de gestión</strong></td><td>No se pueden repercutir al inquilino, ni directa ni indirectamente.</td></tr>
            <tr><td><strong>Anuncios</strong></td><td>Veraces y, cuando proceda, con índice de referencia, límite de renta, número de registro y condición de gran tenedor.</td></tr>
            <tr><td><strong>Fin del contrato</strong></td><td>Documento de finalización firmado por ambos con el estado de la vivienda. Si no se firma o no recoge desperfectos, se presume que se entregó bien.</td></tr>
          </tbody>
        </table>
      </div>
    </DossierPage>

    <DossierPage :label="label" :n="3">
      <div class="d-section">
        <span class="eyebrow">Impuestos</span>
        <h2>IRPF: contratos posteriores al 1-12-2026</h2>
        <p class="d-small">Reducción del rendimiento neto del alquiler de vivienda habitual si no eres gran tenedor. Los contratos anteriores mantienen su régimen (60 % antes del 26-5-2023; del 50 % al 90 % hasta el 1-12-2026).</p>
        <table class="d-table">
          <thead><tr><th>Contrato nuevo respecto al anterior</th><th class="num">Reducción</th></tr></thead>
          <tbody>
            <tr><td>Bajas la renta más de un 5 % y renuevas con el mismo inquilino al acabar los 5 años, o quedas por debajo del índice</td><td class="num">100 %</td></tr>
            <tr><td>Bajas más de un 5 %, zona tensionada e inquilino de 18 a 35 años</td><td class="num">95 %</td></tr>
            <tr><td>Bajas más de un 5 % en zona tensionada</td><td class="num">90 %</td></tr>
            <tr><td>Bajas más de un 5 % e inquilino de 18 a 35 años</td><td class="num">85 %</td></tr>
            <tr><td>Bajas más de un 5 % (resto)</td><td class="num">70 %</td></tr>
            <tr><td>Mantienes la renta</td><td class="num">50 %</td></tr>
            <tr><td>La subes: hasta un 5 % / 10 % / 15 % / 20 % / más</td><td class="num">40 / 30 / 25 / 20 / 15 %</td></tr>
          </tbody>
        </table>
        <p class="d-small">Primer alquiler de la vivienda: 100 % si la renta queda por debajo del índice; 95 %, 90 % u 85 % según zona y edad; 50 % si la iguala o supera.</p>
      </div>
      <div class="d-grid d-3">
        <div class="d-card soft"><h3>IVA de reformas</h3><p>Desde el 1-12-2026, 10 % en obras de renovación y reparación de pisos alquilados como vivienda habitual (pago por banco, edificio de más de 2 años, materiales hasta el 40 %).</p></div>
        <div class="d-card soft"><h3>IBI</h3><p>Los ayuntamientos pueden recargar el IBI de pisos vacíos más de 2 años sin causa (en zona tensionada, también a quien tiene uno solo) y de pisos turísticos en zona tensionada.</p></div>
        <div class="d-card soft"><h3>Inquilinos</h3><p>Deducción del 10 % del alquiler, hasta 1.163 € al año, con base imponible inferior a 33.007,20 €.</p></div>
      </div>
    </DossierPage>

    <DossierPage :label="label" :n="4">
      <div class="d-section">
        <span class="eyebrow">Impagos</span>
        <h2>Si el inquilino es vulnerable</h2>
        <ul class="d-list">
          <li><span>En un desahucio por impago, si el inquilino es económicamente vulnerable, la Administración tiene <strong>dos meses</strong> para darle otra vivienda o <strong>pagarte todo lo debido y las costas</strong>. Si no lo hace, pasa a ser ella la deudora y el contrato sigue.</span></li>
          <li><span>En otros procesos, el juez puede suspender hasta que haya alternativa habitacional (revisión cada 12 meses, máximo tres años), con compensación al propietario persona física: rentas, suministros y costas.</span></li>
          <li><span>La vulnerabilidad económica del inquilino no prevalece si eres persona física con dos viviendas o menos.</span></li>
        </ul>
      </div>
      <div class="d-section">
        <span class="eyebrow">Calendario</span>
        <h2>Fechas clave</h2>
        <table class="d-table">
          <tbody>
            <tr><td><strong>8-10-2026</strong></td><td>Entra en vigor el Real Decreto-ley 29/2026</td></tr>
            <tr><td><strong>12-11-2026</strong></td><td>Votación prevista de la convalidación (según la prensa)</td></tr>
            <tr><td><strong>29-11-2026</strong></td><td>Elecciones generales</td></tr>
            <tr><td><strong>1-12-2026</strong></td><td>Nuevo IRPF del alquiler y cambios de IVA</td></tr>
            <tr><td><strong>31-12-2027</strong></td><td>Fin del límite extraordinario de las subidas</td></tr>
            <tr><td><strong>31-12-2030</strong></td><td>Fin de las suspensiones de desahucios del decreto</td></tr>
          </tbody>
        </table>
      </div>
    </DossierPage>

    <DossierPage :label="label" :n="5" dark>
      <div class="d-section">
        <span class="eyebrow">Herramientas gratis en rentahucha.es</span>
        <h2>Calcula tu caso</h2>
        <div class="d-grid d-2">
          <div class="d-card glass"><h3>IRAV y subida del alquiler</h3><p>El último IRAV del INE y cuánto puedes subir la renta este año. <strong>rentahucha.es/herramientas/subida-alquiler-irav</strong></p></div>
          <div class="d-card glass"><h3>Reducción del IRPF</h3><p>Compara firmar antes o después del 1 de diciembre. <strong>rentahucha.es/herramientas/reduccion-irpf-alquiler</strong></p></div>
          <div class="d-card glass"><h3>Valoración gratis</h3><p>Cuánto pedir por tu piso, con comparables y el índice oficial. <strong>rentahucha.es/valoracion-alquiler</strong></p></div>
          <div class="d-card glass"><h3>Guía completa</h3><p>Cada medida, explicada. <strong>rentahucha.es/blog/decretos-de-vivienda-octubre-2026-explicados</strong></p></div>
        </div>
      </div>
      <div class="d-section">
        <div class="d-card lime cta">
          <h3>Alquila con RentaHucha</h3>
          <p>Estamos en beta: publica tu piso gratis, lo revisamos y los interesados te escriben por chat. Desde el lanzamiento, inquilinos verificados, contrato conforme a la LAU y una hucha del inquilino, custodiada por una entidad financiera autorizada, que responde si hay un impago comprobado. <strong>rentahucha.es/propietarios</strong></p>
        </div>
        <p class="fine">Guía informativa sobre el Real Decreto-ley 29/2026 (BOE de 7 de octubre de 2026), comprobada con el texto consolidado el 22 de octubre de 2026 y pendiente de convalidación. No sustituye el asesoramiento de un profesional. RentaHucha no es una aseguradora; el seguro de impago, si lo quieres, lo contratas tú.</p>
      </div>
    </DossierPage>
  </div>
</template>

<style scoped>
.warn { margin-bottom: 7mm; }
.d-table td { vertical-align: top; }
.topics td:first-child { width: 36mm; }
.d-small { margin: 0 0 3mm; }
.cta h3 { margin-bottom: 2mm; color: #141414 !important; }
.cta p, .cta strong { color: #141414; }
.fine { margin-top: 6mm; font-size: 8pt; line-height: 1.45; color: #a8a8a8; }
</style>
