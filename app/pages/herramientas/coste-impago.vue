<script setup lang="ts">
useSeoMeta({
  title: 'Calculadora: cuánto cuesta un impago de alquiler',
  description: 'Calcula cuánto te puede costar que tu inquilino deje de pagar: rentas perdidas, abogado y procurador, reparaciones y meses con el piso vacío.',
})
</script>

<template>
  <div>
    <section class="section">
      <div class="container">
        <div class="section-head">
          <NuxtLink to="/herramientas" class="back">← Herramientas</NuxtLink>
          <span class="eyebrow">Calculadora para propietarios</span>
          <h1>¿Cuánto cuesta que tu inquilino deje de pagar?</h1>
          <p class="lead">Un impago no son solo las rentas que no cobras. Suma abogado, procurador, reparaciones y el tiempo que el piso queda vacío.</p>
        </div>
        <ImpagoCalculator />
      </div>
    </section>

    <section class="section section-alt">
      <div class="container prose">
        <h2>Qué hacer si tu inquilino no paga</h2>
        <ol class="steps">
          <li><strong>Habla con él cuanto antes.</strong> Muchos impagos son baches puntuales que se resuelven con un plan de pago corto.</li>
          <li><strong>Requiérele el pago de forma fehaciente</strong> (burofax con certificación de contenido). Deja constancia de la deuda.</li>
          <li><strong>Intenta el acuerdo previo</strong> que exige la ley antes de demandar.</li>
          <li><strong>Presenta la demanda de desahucio</strong> por falta de pago con un abogado y procurador.</li>
          <li><strong>Nunca cambies la cerradura ni cortes suministros.</strong> Puede ser delito de coacciones, aunque el inquilino te deba dinero.</li>
        </ol>
        <div class="note note-green">
          <strong>Con nosotros, todo esto arranca solo</strong>
          <p>Avisamos el día 1, la hucha cubre el primer mes, la aseguradora paga la renta según la póliza y el abogado tiene el expediente listo.</p>
        </div>
        <div class="cta">
          <NuxtLink to="/propietarios#alta" class="btn btn-primary">Protege tu alquiler</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.back { display: inline-block; margin-bottom: 16px; font-size: 0.9rem; text-decoration: none; }
.prose { max-width: 820px; }
.steps { padding-left: 20px; display: grid; gap: 12px; margin-bottom: 28px; }
.steps li::marker { color: var(--green); font-weight: 700; }
.cta { margin-top: 28px; }
</style>
