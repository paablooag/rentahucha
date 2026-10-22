<script setup lang="ts">
const title = 'Calculadora de rentabilidad del alquiler 2026: bruta, neta y con el nuevo IRPF'
const description = 'Calcula cuánto te deja de verdad alquilar tu piso: rentabilidad bruta y neta, con IBI, comunidad, seguro, mantenimiento, meses vacíos y gestión. Gratis y sin registro.'
useSeoMeta({ title, description, ogTitle: title, ogDescription: description })

const faqs = [
  { q: '¿Cómo se calcula la rentabilidad bruta de un alquiler?', a: 'Se divide la renta anual (renta mensual × 12) entre el valor del piso y se multiplica por 100. Con 850 € al mes y un piso de 180.000 €, la rentabilidad bruta es del 5,67 %.' },
  { q: '¿Y la rentabilidad neta?', a: 'Es lo que queda después de gastos: a las rentas realmente cobradas (descontando los meses vacíos) se le restan IBI, comunidad, seguro, mantenimiento, intereses de la hipoteca y gestión, y el resultado se divide entre el valor del piso.' },
  { q: '¿La calculadora incluye impuestos?', a: 'No: el resultado es antes del IRPF. En contratos de vivienda habitual, el rendimiento neto tiene una reducción que depende de la fecha del contrato: del 50 % al 90 % en los firmados entre mayo de 2023 y el 1 de diciembre de 2026, y hasta el 100 % en los posteriores si se convalida el decreto de octubre. Puedes calcularla con la calculadora de la reducción del IRPF. Además puedes deducir la amortización del inmueble. Para tu caso concreto, consulta a un asesor.' },
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

    <section class="section">
      <div class="container prose-block">
        <h2>Un ejemplo completo</h2>
        <p>Piso valorado en 180.000 €, alquilado a 850 € al mes, con IBI de 400 € al año, comunidad de 60 € al mes, seguro de 250 €, medio mes vacío al año y gestionándolo tú:</p>
        <div class="table-wrap">
          <table class="table">
            <tbody>
              <tr><td>Rentas cobradas (11,5 meses)</td><td class="num">9.775 €</td></tr>
              <tr><td>IBI, comunidad y seguro</td><td class="num">−1.370 €</td></tr>
              <tr><td>Mantenimiento (5 % de lo cobrado)</td><td class="num">−489 €</td></tr>
              <tr><td><strong>Rendimiento neto antes de impuestos</strong></td><td class="num"><strong>7.916 €</strong></td></tr>
              <tr><td>Rentabilidad bruta (10.200 € / 180.000 €)</td><td class="num">5,67 %</td></tr>
              <tr><td>Rentabilidad neta (7.916 € / 180.000 €)</td><td class="num">4,40 %</td></tr>
            </tbody>
          </table>
        </div>
        <h2>Lo que cambia con el decreto de octubre de 2026</h2>
        <ul>
          <li><strong>Subidas limitadas:</strong> hasta el 31-12-2027, sin nuevo acuerdo, la renta no puede subir más de un 2 % al año. Ten en cuenta ese tope al proyectar ingresos: <NuxtLink to="/herramientas/subida-alquiler-irav">IRAV y subida del alquiler</NuxtLink>.</li>
          <li><strong>IRPF:</strong> en los contratos posteriores al 1-12-2026, la reducción del rendimiento va del 15 % al 100 % según bajes, mantengas o subas la renta. Puede pesar más que muchos gastos: <NuxtLink to="/herramientas/reduccion-irpf-alquiler">calcula tu reducción</NuxtLink>.</li>
          <li><strong>Reformas:</strong> desde el 1-12-2026, las obras en pisos alquilados como vivienda habitual pueden tributar al IVA del 10 %: <NuxtLink to="/blog/iva-10-reformas-piso-alquilado-diciembre-2026">requisitos</NuxtLink>.</li>
        </ul>
        <p class="small muted">El decreto está pendiente de convalidación. Todas las medidas en la <NuxtLink to="/blog/decretos-de-vivienda-octubre-2026-explicados">guía del decreto</NuxtLink>.</p>
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
.prose-block { max-width: 820px; }
.prose-block h2 { margin: 0 0 12px; }
.prose-block h2:not(:first-child) { margin-top: 36px; }
.prose-block ul { display: grid; gap: 10px; padding-left: 20px; }
.table-wrap { max-width: 520px; }
.cta { margin-top: 32px; display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; }
</style>
