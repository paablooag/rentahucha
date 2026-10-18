<script setup lang="ts">
const title = 'Calculadora de rentabilidad del alquiler: bruta y neta'
const description = 'Calcula cuánto te deja de verdad alquilar tu piso: rentabilidad bruta y neta, con IBI, comunidad, seguro, mantenimiento, meses vacíos y gestión. Gratis y sin registro.'
useSeoMeta({ title, description, ogTitle: title, ogDescription: description })

const faqs = [
  { q: '¿Cómo se calcula la rentabilidad bruta de un alquiler?', a: 'Se divide la renta anual (renta mensual × 12) entre el valor del piso y se multiplica por 100. Con 850 € al mes y un piso de 180.000 €, la rentabilidad bruta es del 5,67 %.' },
  { q: '¿Y la rentabilidad neta?', a: 'Es lo que queda después de gastos: a las rentas realmente cobradas (descontando los meses vacíos) se le restan IBI, comunidad, seguro, mantenimiento, intereses de la hipoteca y gestión, y el resultado se divide entre el valor del piso.' },
  { q: '¿La calculadora incluye impuestos?', a: 'No: el resultado es antes del IRPF. En contratos de vivienda habitual firmados desde mayo de 2023, el rendimiento neto puede reducirse entre un 50 % y un 90 % según el caso, y además puedes deducir la amortización del inmueble. Para tu caso concreto, consulta a un asesor.' },
  { q: '¿Qué gastos son deducibles al alquilar?', a: 'Entre otros, el IBI, la comunidad, el seguro, los intereses de la hipoteca, las reparaciones y conservación, los suministros que pagues tú y la amortización (en general, el 3 % del valor de construcción).' },
  { q: '¿Qué baja más la rentabilidad?', a: 'Los meses sin cobrar. Un mes vacío o un impago restan una mensualidad entera, más que cualquier otro gasto. Por eso elegir bien al inquilino es lo que más protege lo que ganas.' },
]
useHead({
  script: [{ type: 'application/ld+json', innerHTML: JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }) }],
})
</script>

<template>
  <div>
    <section class="section">
      <div class="container">
        <div class="section-head">
          <NuxtLink to="/herramientas" class="back">← Herramientas</NuxtLink>
          <span class="eyebrow">Calculadora para propietarios</span>
          <h1>¿Cuánto te deja de verdad alquilar tu piso?</h1>
          <p class="lead">La renta no es lo que ganas. Resta gastos, meses vacíos y gestión, y mira tu rentabilidad bruta y neta.</p>
        </div>
        <RentalYieldCalculator />
      </div>
    </section>

    <section class="section section-alt">
      <div class="container">
        <div class="section-head center">
          <span class="eyebrow">Preguntas frecuentes</span>
          <h2>Rentabilidad del alquiler, explicada</h2>
        </div>
        <FaqList :items="faqs" />
        <div class="cta">
          <NuxtLink to="/propietarios#formulario" class="btn btn-primary">Alquila a inquilinos verificados</NuxtLink>
          <NuxtLink to="/herramientas/checklist-alquilar-piso" class="btn btn-ghost">Checklist para alquilar tu piso</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.back { display: inline-block; margin-bottom: 16px; font-size: 0.9rem; text-decoration: none; }
.cta { margin-top: 32px; display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; }
</style>
