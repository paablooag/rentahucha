<script setup lang="ts">
useSeoMeta({
  title: 'Calculadora: cuánto alquiler puedo pagar según mi sueldo',
  description: 'Introduce tu sueldo neto y descubre el alquiler máximo con el que tienes más opciones de conseguir piso, cuánto necesitas para entrar y si un piso concreto encaja con tus ingresos.',
})

const faqs = [
  { q: '¿Qué porcentaje del sueldo se recomienda destinar al alquiler?', a: 'Como referencia, que la renta no supere el 30–35 % de los ingresos netos del hogar. Por encima del 40 % se considera al límite y muchos propietarios piden garantías extra o un aval.' },
  { q: '¿Cuentan las pagas extra?', a: 'Sí. Si cobras 14 pagas, la calculadora reparte las dos extras entre los 12 meses para obtener tus ingresos mensuales equivalentes.' },
  { q: '¿Y si alquilo con mi pareja o con compañeros?', a: 'Se suman los ingresos de quienes vayáis a firmar el contrato. Lo más seguro es que firméis todos, para que los ingresos cuenten y todos tengáis los mismos derechos.' },
  { q: '¿Cuánto dinero necesito para entrar?', a: 'Como mínimo, el primer mes y la fianza legal (un mes en vivienda habitual). Algunos propietarios piden además hasta dos mensualidades de garantía adicional. Desde 2023 los gastos de agencia los paga el propietario.' },
  { q: '¿Qué más miran los propietarios?', a: 'La estabilidad de los ingresos (tipo de contrato y antigüedad) y el historial de pagos. Con el pasaporte de inquilino de RentaHucha puedes demostrar que siempre has pagado a tiempo.' },
]
</script>

<template>
  <div>
    <section class="section">
      <div class="container">
        <div class="section-head">
          <NuxtLink to="/herramientas" class="back">← Herramientas</NuxtLink>
          <span class="eyebrow">Calculadora para inquilinos</span>
          <h1>¿Cuánto alquiler puedes pagar con tu sueldo?</h1>
          <p class="lead">Mete tu sueldo neto y te decimos hasta qué renta tienes más oportunidades de conseguir piso, cuánto necesitas para entrar y si el piso que te gusta encaja.</p>
        </div>
        <RentAffordability />
      </div>
    </section>

    <section class="section section-alt">
      <div class="container prose">
        <h2>La regla del 30–35 %</h2>
        <p>La mayoría de propietarios y agencias comparan la renta con los ingresos netos del hogar. Si el alquiler se queda por debajo del 30–35 %, lo normal es que te consideren solvente; por encima del 40 %, empiezan a pedir avales o más garantías.</p>
        <p>Es una referencia, no una ley: también cuentan la estabilidad de tu trabajo y cómo has pagado antes. Lee más en <NuxtLink to="/blog/cuanto-alquiler-te-puedes-permitir">cuánto alquiler te puedes permitir según tu sueldo</NuxtLink>.</p>
        <div class="cta">
          <NuxtLink to="/apuntate?tipo=inquilino#formulario" class="btn btn-primary">Quiero alquilar sin aval</NuxtLink>
          <NuxtLink to="/herramientas/simulador-hucha" class="btn btn-ghost">Simular mi hucha</NuxtLink>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head center">
          <span class="eyebrow">Preguntas frecuentes</span>
          <h2>Dudas sobre alquiler y sueldo</h2>
        </div>
        <FaqList :items="faqs" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.back { display: inline-block; margin-bottom: 16px; color: var(--muted); text-decoration: none; }
.back:hover { color: var(--ink); }
.prose { max-width: 760px; }
.prose p { color: var(--muted); }
.cta { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 20px; }
</style>
